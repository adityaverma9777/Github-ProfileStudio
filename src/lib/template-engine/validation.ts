/**
 * Template Engine - Validation Layer
 *
 * Validates template, sections, and profile data before rendering.
 * Returns typed validation results.
 */

import type {
    Template,
    Section,
    SectionType,
    UserProfile,
    TemplateCapabilities,
} from "@/types";

import type { RenderError, ValidationIssue } from "./errors";
import {
    sectionUnsupported,
    sectionLimitExceeded,
    profileIncomplete,
    validationFailed,
} from "./errors";

// ============================================================================
// VALIDATION RESULT TYPE
// ============================================================================

/** Result of validation */
export type ValidationResult =
    | { readonly valid: true }
    | { readonly valid: false; readonly errors: readonly RenderError[] };

// ============================================================================
// TEMPLATE VALIDATION
// ============================================================================

/**
 * Validate template structure
 */
export const validateTemplate = (template: Template): ValidationResult => {
    const issues: ValidationIssue[] = [];

    if (!template.metadata) {
        issues.push({
            path: ["template", "metadata"],
            message: "Template metadata is required",
        });
    }

    if (!template.layout) {
        issues.push({
            path: ["template", "layout"],
            message: "Template layout is required",
        });
    }

    if (!template.capabilities) {
        issues.push({
            path: ["template", "capabilities"],
            message: "Template capabilities are required",
        });
    }

    if (issues.length > 0) {
        return { valid: false, errors: [validationFailed(issues)] };
    }

    return { valid: true };
};

// ============================================================================
// SECTION VALIDATION
// ============================================================================

/**
 * Validate sections against template capabilities
 */
export const validateSections = (
    sections: readonly Section[],
    template: Template
): ValidationResult => {
    const errors: RenderError[] = [];
    const { capabilities } = template;

    // Check section count
    if (sections.length > capabilities.maxSections) {
        errors.push(
            sectionLimitExceeded(
                capabilities.maxSections,
                sections.length,
                template.metadata.id
            )
        );
    }

    // Check each section is supported
    for (const section of sections) {
        if (!isSectionSupported(section.type, capabilities)) {
            errors.push(
                sectionUnsupported(
                    section.type,
                    template.metadata.id,
                    capabilities.supportedSections
                )
            );
        }
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true };
};

/**
 * Check if a section type is supported by capabilities
 */
export const isSectionSupported = (
    sectionType: SectionType,
    capabilities: TemplateCapabilities
): boolean => {
    return capabilities.supportedSections.includes(sectionType);
};

// ============================================================================
// PROFILE VALIDATION
// ============================================================================

/** Fields required for specific section types */
const SECTION_REQUIRED_FIELDS: Partial<Record<SectionType, readonly string[]>> = {
    "github-stats": ["githubUsername"],
    contributions: ["githubUsername"],
    "pinned-repos": ["githubUsername"],
};

/**
 * Validate profile has required fields for sections
 */
export const validateProfile = (
    profile: UserProfile,
    sections: readonly Section[]
): ValidationResult => {
    const missingFields: string[] = [];

    // Check required fields for enabled sections
    for (const section of sections) {
        if (!section.enabled) continue;

        const requiredFields = SECTION_REQUIRED_FIELDS[section.type];
        if (!requiredFields) continue;

        for (const field of requiredFields) {
            const value = getNestedValue(profile, field);
            if (value === undefined || value === null || value === "") {
                if (!missingFields.includes(field)) {
                    missingFields.push(field);
                }
            }
        }
    }

    if (missingFields.length > 0) {
        return {
            valid: false,
            errors: [profileIncomplete(missingFields)],
        };
    }

    return { valid: true };
};

/**
 * Get nested property value from object
 */
const getNestedValue = (obj: unknown, path: string): unknown => {
    const parts = path.split(".");
    let current: unknown = obj;

    for (const part of parts) {
        if (current === null || current === undefined) {
            return undefined;
        }
        current = (current as Record<string, unknown>)[part];
    }

    return current;
};

// ============================================================================
// CAPABILITY CHECKS
// ============================================================================

/**
 * Check if template supports animations
 */
export const supportsAnimations = (capabilities: TemplateCapabilities): boolean =>
    capabilities.supportsAnimations;

/**
 * Check if template supports GitHub stats
 */
export const supportsGitHubStats = (capabilities: TemplateCapabilities): boolean =>
    capabilities.supportsGitHubStats;

/**
 * Check if template supports dark mode
 */
export const supportsDarkMode = (capabilities: TemplateCapabilities): boolean =>
    capabilities.supportsDarkMode;

/**
 * Check if template supports custom sections
 */
export const supportsCustomSections = (capabilities: TemplateCapabilities): boolean =>
    capabilities.allowCustomSections;

// ============================================================================
// FULL VALIDATION
// ============================================================================

/**
 * Run all validations
 */
export const validateAll = (
    template: Template,
    sections: readonly Section[],
    profile: UserProfile
): ValidationResult => {
    // Validate template
    const templateResult = validateTemplate(template);
    if (!templateResult.valid) {
        return templateResult;
    }

    // Validate sections
    const sectionsResult = validateSections(sections, template);
    if (!sectionsResult.valid) {
        return sectionsResult;
    }

    // Validate profile
    const profileResult = validateProfile(profile, sections);
    if (!profileResult.valid) {
        return profileResult;
    }

    return { valid: true };
};
