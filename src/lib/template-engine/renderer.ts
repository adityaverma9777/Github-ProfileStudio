/**
 * Template Engine - Main Renderer
 *
 * The core rendering pipeline that converts:
 * TemplateSchema + UserProfile → RenderOutput (IR)
 *
 * Design Principles:
 * - Pure functions, no side effects
 * - Deterministic output for same input
 * - No hardcoded markdown/HTML
 * - No API calls
 * - Extensible via hooks
 */

import type {
    Template,
    Section,
    UserProfile,
    TemplateId,
    ColorScheme,
} from "@/types";

import type {
    RenderContext,
    RenderOutput,
    RenderMetadata,
    RenderedSection,
    RenderWarning,
} from "./types";

import type { RenderError } from "./errors";
import { unknownError, isRecoverable } from "./errors";

import { renderSection, toRenderedSection } from "./section-renderers";
import { validateAll, type ValidationResult } from "./validation";

// ============================================================================
// RENDER OPTIONS
// ============================================================================

/** Options for the render function */
export interface RenderOptions {
    /** Theme to use for rendering */
    readonly theme?: ColorScheme;
    /** Locale for localization */
    readonly locale?: string;
    /** Skip validation (not recommended) */
    readonly skipValidation?: boolean;
    /** Continue on recoverable errors */
    readonly continueOnError?: boolean;
    /** Pre-render hook */
    readonly onBeforeRender?: (context: RenderContext) => void;
    /** Post-render hook */
    readonly onAfterRender?: (output: RenderOutput) => void;
    /** Section render hook */
    readonly onSectionRendered?: (section: RenderedSection) => void;
    /** Error hook */
    readonly onError?: (error: RenderError) => void;
}

/** Default render options */
const DEFAULT_OPTIONS: RenderOptions = {
    theme: "system",
    locale: "en",
    skipValidation: false,
    continueOnError: true,
};

// ============================================================================
// RENDER RESULT
// ============================================================================

/** Result of the render operation */
export type RenderResult =
    | { readonly success: true; readonly output: RenderOutput }
    | { readonly success: false; readonly errors: readonly RenderError[] };

// ============================================================================
// MAIN RENDER FUNCTION
// ============================================================================

/**
 * Main template rendering function
 *
 * Converts TemplateSchema + UserProfile into structured IR output.
 * This is the primary entry point for the template engine.
 *
 * @param template - The template definition
 * @param profile - User profile data
 * @param options - Render options
 * @returns RenderResult with either output or errors
 */
export const render = (
    template: Template,
    profile: UserProfile,
    options: RenderOptions = {}
): RenderResult => {
    const startTime = performance.now();
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const errors: RenderError[] = [];
    const warnings: RenderWarning[] = [];

    // Create render context
    const context: RenderContext = {
        templateId: template.metadata.id,
        theme: opts.theme ?? template.styles.defaultTheme,
        locale: opts.locale ?? "en",
        timestamp: new Date().toISOString(),
    };

    // Pre-render hook
    opts.onBeforeRender?.(context);

    try {
        // Validation phase
        if (!opts.skipValidation) {
            const validationResult = validateAll(template, template.sections, profile);
            if (!validationResult.valid) {
                return { success: false, errors: validationResult.errors };
            }
        }

        // Get sections to render (enabled and in order)
        const sectionsToRender = getSectionsInOrder(template);

        // Render each section
        const renderedSections: RenderedSection[] = [];
        let sectionsSkipped = 0;

        for (let i = 0; i < sectionsToRender.length; i++) {
            const section = sectionsToRender[i];

            if (!section) continue;

            // Skip disabled sections
            if (!section.enabled) {
                sectionsSkipped++;
                continue;
            }

            // Render the section
            const result = renderSection(section, profile, context);

            if (result.success) {
                const rendered = toRenderedSection(section, result, i);
                if (rendered) {
                    renderedSections.push(rendered);
                    opts.onSectionRendered?.(rendered);
                }
            } else {
                // Handle render error
                const error = result.error;
                opts.onError?.(error);

                if (isRecoverable(error) && opts.continueOnError) {
                    // Add warning and continue
                    warnings.push({
                        code: error.code,
                        message: error.message,
                        sectionId: section.id,
                    });
                    sectionsSkipped++;
                } else {
                    // Non-recoverable error
                    errors.push(error);
                }
            }
        }

        // Check for non-recoverable errors
        if (errors.length > 0 && !opts.continueOnError) {
            return { success: false, errors };
        }

        // Build metadata
        const renderTime = performance.now() - startTime;
        const metadata: RenderMetadata = {
            templateId: template.metadata.id,
            templateName: template.metadata.name,
            templateVersion: `${template.metadata.version.major}.${template.metadata.version.minor}.${template.metadata.version.patch}`,
            sectionsRendered: renderedSections.length,
            sectionsSkipped,
            warnings,
            renderTime,
        };

        // Build output
        const output: RenderOutput = {
            context,
            sections: renderedSections,
            metadata,
        };

        // Post-render hook
        opts.onAfterRender?.(output);

        return { success: true, output };
    } catch (e) {
        return {
            success: false,
            errors: [unknownError(e)],
        };
    }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get sections in layout order
 */
const getSectionsInOrder = (template: Template): readonly Section[] => {
    const { sections, layout } = template;

    // Create a map of section type/id to order from layout slots
    const orderMap = new Map<string, number>();
    for (const slot of layout.slots) {
        orderMap.set(slot.sectionId, slot.order);
    }

    // Sort sections by layout order, then by their own order property
    return [...sections].sort((a, b) => {
        const orderA = orderMap.get(a.type) ?? orderMap.get(a.id) ?? a.order;
        const orderB = orderMap.get(b.type) ?? orderMap.get(b.id) ?? b.order;
        return orderA - orderB;
    });
};

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Render with validation only (no actual rendering)
 */
export const validate = (
    template: Template,
    profile: UserProfile
): ValidationResult => {
    return validateAll(template, template.sections, profile);
};

/**
 * Render a single section (for preview/testing)
 */
export const renderSingleSection = (
    section: Section,
    profile: UserProfile,
    template: Template,
    options: RenderOptions = {}
): RenderResult => {
    const singleSectionTemplate: Template = {
        ...template,
        sections: [section],
    };

    return render(singleSectionTemplate, profile, options);
};

/**
 * Get render statistics without full render
 */
export const analyzeTemplate = (
    template: Template
): {
    totalSections: number;
    enabledSections: number;
    sectionTypes: readonly string[];
    estimatedComplexity: "low" | "medium" | "high";
} => {
    const enabledSections = template.sections.filter((s) => s.enabled);
    const sectionTypes = [...new Set(template.sections.map((s) => s.type))];

    let complexity: "low" | "medium" | "high" = "low";
    if (enabledSections.length > 10) complexity = "high";
    else if (enabledSections.length > 5) complexity = "medium";

    return {
        totalSections: template.sections.length,
        enabledSections: enabledSections.length,
        sectionTypes,
        estimatedComplexity: complexity,
    };
};

// ============================================================================
// EXPORTS
// ============================================================================

export { render as renderTemplate };
