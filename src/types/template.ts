/**
 * Template System Type Definitions
 *
 * Defines template metadata, layout, styles, and capability flags
 * Templates are JSON-driven with no hardcoded markdown
 */

import type {
    TemplateId,
    HexColor,
    UrlString,
    SemanticVersion,
    AuthorInfo,
    AuditTimestamps,
    LocalizedString,
    ColorScheme,
    FontWeight,
    BorderRadiusToken,
    SpacingToken,
    ISODateString,
    createTemplateId,
} from "./common";

import type { Section, SectionType } from "./section";

// ============================================================================
// TEMPLATE CATEGORIES
// ============================================================================

/** High-level template category */
export type TemplateCategory =
    | "minimal" // Clean, simple designs
    | "professional" // Business/corporate focused
    | "creative" // Artistic and unique layouts
    | "developer" // Code-focused with stats/graphs
    | "animated" // Heavy use of animations
    | "data-driven" // Stats and metrics focused
    | "portfolio" // Project showcase focused
    | "academic"; // Research/education focused

/** Template difficulty/complexity level */
export type TemplateComplexity = "beginner" | "intermediate" | "advanced";

/** Template content density */
export type TemplateDensity = "compact" | "balanced" | "spacious";

// ============================================================================
// TEMPLATE METADATA
// ============================================================================

/** Template metadata for discovery and display */
export interface TemplateMetadata {
    readonly id: TemplateId;
    readonly name: string;
    readonly description: string;
    readonly longDescription?: string;
    readonly category: TemplateCategory;
    readonly tags: readonly string[];
    readonly author: AuthorInfo;
    readonly version: SemanticVersion;
    readonly license?: "MIT" | "CC0" | "CC-BY" | "proprietary";
    readonly thumbnail: UrlString;
    readonly previewImages?: readonly UrlString[];
    readonly featured: boolean;
    readonly premium: boolean;
    readonly complexity: TemplateComplexity;
    readonly estimatedSetupTime: number; // minutes
    readonly timestamps: AuditTimestamps;
    readonly localization?: {
        readonly name: LocalizedString;
        readonly description: LocalizedString;
    };
}

// ============================================================================
// TEMPLATE STYLE SYSTEM
// ============================================================================

/** Font configuration */
export interface FontConfig {
    readonly family: string;
    readonly fallback: string;
    readonly googleFontUrl?: UrlString;
    readonly weights: readonly FontWeight[];
}

/** Color palette for template theming */
export interface ColorPalette {
    readonly primary: HexColor;
    readonly secondary: HexColor;
    readonly accent: HexColor;
    readonly background: HexColor;
    readonly surface: HexColor;
    readonly text: HexColor;
    readonly textMuted: HexColor;
    readonly border: HexColor;
    readonly success: HexColor;
    readonly warning: HexColor;
    readonly error: HexColor;
}

/** Theme variant with light/dark mode support */
export interface ThemeVariant {
    readonly mode: ColorScheme;
    readonly colors: ColorPalette;
}

/** Complete template style configuration */
export interface TemplateStyles {
    readonly fonts: {
        readonly heading: FontConfig;
        readonly body: FontConfig;
        readonly mono: FontConfig;
    };
    readonly themes: {
        readonly light: ThemeVariant;
        readonly dark: ThemeVariant;
    };
    readonly defaultTheme: ColorScheme;
    readonly spacing: {
        readonly sectionGap: SpacingToken;
        readonly contentPadding: SpacingToken;
    };
    readonly borders: {
        readonly radius: BorderRadiusToken;
        readonly width: 0 | 1 | 2;
        readonly style: "solid" | "dashed" | "dotted" | "none";
    };
    readonly shadows: {
        readonly enabled: boolean;
        readonly intensity: "subtle" | "medium" | "strong";
    };
    readonly animations: {
        readonly enabled: boolean;
        readonly reducedMotion: boolean;
        readonly defaultDuration: number;
    };
}

/** Default style configuration */
export const DEFAULT_TEMPLATE_STYLES: TemplateStyles = {
    fonts: {
        heading: {
            family: "Inter",
            fallback: "system-ui, sans-serif",
            googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as UrlString,
            weights: [400, 500, 600, 700],
        },
        body: {
            family: "Inter",
            fallback: "system-ui, sans-serif",
            googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" as UrlString,
            weights: [400, 500],
        },
        mono: {
            family: "JetBrains Mono",
            fallback: "monospace",
            googleFontUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" as UrlString,
            weights: [400, 500],
        },
    },
    themes: {
        light: {
            mode: "light",
            colors: {
                primary: "#0969da" as HexColor,
                secondary: "#6e7781" as HexColor,
                accent: "#8250df" as HexColor,
                background: "#ffffff" as HexColor,
                surface: "#f6f8fa" as HexColor,
                text: "#1f2328" as HexColor,
                textMuted: "#656d76" as HexColor,
                border: "#d0d7de" as HexColor,
                success: "#1a7f37" as HexColor,
                warning: "#9a6700" as HexColor,
                error: "#cf222e" as HexColor,
            },
        },
        dark: {
            mode: "dark",
            colors: {
                primary: "#2f81f7" as HexColor,
                secondary: "#8b949e" as HexColor,
                accent: "#a371f7" as HexColor,
                background: "#0d1117" as HexColor,
                surface: "#161b22" as HexColor,
                text: "#e6edf3" as HexColor,
                textMuted: "#8b949e" as HexColor,
                border: "#30363d" as HexColor,
                success: "#3fb950" as HexColor,
                warning: "#d29922" as HexColor,
                error: "#f85149" as HexColor,
            },
        },
    },
    defaultTheme: "system",
    spacing: {
        sectionGap: "6",
        contentPadding: "4",
    },
    borders: {
        radius: "md",
        width: 1,
        style: "solid",
    },
    shadows: {
        enabled: true,
        intensity: "subtle",
    },
    animations: {
        enabled: true,
        reducedMotion: true,
        defaultDuration: 300,
    },
} as const;

// ============================================================================
// TEMPLATE LAYOUT
// ============================================================================

/** Layout direction */
export type LayoutDirection = "vertical" | "horizontal";

/** Section slot in layout */
export interface LayoutSlot {
    readonly sectionId: string; // Reference to section by type or custom id
    readonly required: boolean;
    readonly order: number;
    readonly gridColumn?: number; // For grid layouts
    readonly gridRow?: number;
}

/** Template layout configuration */
export interface TemplateLayout {
    readonly direction: LayoutDirection;
    readonly slots: readonly LayoutSlot[];
    readonly maxWidth: "sm" | "md" | "lg" | "xl" | "full";
    readonly containerStyle: "centered" | "full-width" | "sidebar";
    readonly headerPosition: "top" | "side" | "floating" | "none";
    readonly footerEnabled: boolean;
}

// ============================================================================
// TEMPLATE CAPABILITIES
// ============================================================================

/** Feature flags indicating what a template supports */
export interface TemplateCapabilities {
    // Content capabilities
    readonly supportsAnimations: boolean;
    readonly supportsGifs: boolean;
    readonly supportsCustomFonts: boolean;
    readonly supportsCustomColors: boolean;
    readonly supportsBackgroundImage: boolean;
    readonly supportsBackgroundGradient: boolean;

    // Section capabilities
    readonly supportedSections: readonly SectionType[];
    readonly maxSections: number;
    readonly allowCustomSections: boolean;
    readonly allowSectionReordering: boolean;

    // Integration capabilities
    readonly supportsGitHubStats: boolean;
    readonly supportsSpotify: boolean;
    readonly supportsWakatime: boolean;
    readonly supportsBlogFeed: boolean;

    // Export capabilities
    readonly supportsMarkdownExport: boolean;
    readonly supportsHtmlExport: boolean;
    readonly supportsPdfExport: boolean;
    readonly supportsImageExport: boolean;

    // Advanced features
    readonly supportsDarkMode: boolean;
    readonly supportsResponsiveDesign: boolean;
    readonly supportsA11y: boolean; // Accessibility features
    readonly supportsLocalization: boolean;
}

/** Default capabilities for new templates */
export const DEFAULT_TEMPLATE_CAPABILITIES: TemplateCapabilities = {
    supportsAnimations: true,
    supportsGifs: true,
    supportsCustomFonts: false,
    supportsCustomColors: true,
    supportsBackgroundImage: false,
    supportsBackgroundGradient: false,
    supportedSections: [
        "hero",
        "about",
        "tech-stack",
        "github-stats",
        "projects",
        "socials",
        "contact",
        "divider",
        "spacer",
    ],
    maxSections: 20,
    allowCustomSections: false,
    allowSectionReordering: true,
    supportsGitHubStats: true,
    supportsSpotify: false,
    supportsWakatime: false,
    supportsBlogFeed: false,
    supportsMarkdownExport: true,
    supportsHtmlExport: true,
    supportsPdfExport: false,
    supportsImageExport: false,
    supportsDarkMode: true,
    supportsResponsiveDesign: true,
    supportsA11y: true,
    supportsLocalization: false,
} as const;

// ============================================================================
// TEMPLATE DEFAULTS
// ============================================================================

/** Default values for template sections */
export interface TemplateDefaults {
    readonly sectionOrder: readonly SectionType[];
    readonly defaultEnabledSections: readonly SectionType[];
    readonly sectionConfigs: Partial<Record<SectionType, object>>;
}

// ============================================================================
// COMPLETE TEMPLATE TYPE
// ============================================================================

/** Complete template definition */
export interface Template {
    readonly metadata: TemplateMetadata;
    readonly layout: TemplateLayout;
    readonly styles: TemplateStyles;
    readonly capabilities: TemplateCapabilities;
    readonly defaults: TemplateDefaults;
    readonly sections: readonly Section[];
}

/** Template for creation (without generated fields) */
export interface TemplateInput {
    readonly metadata: Omit<TemplateMetadata, "id" | "timestamps">;
    readonly layout: TemplateLayout;
    readonly styles?: Partial<TemplateStyles>;
    readonly capabilities?: Partial<TemplateCapabilities>;
    readonly defaults: TemplateDefaults;
    readonly sections: readonly Section[];
}

/** Template summary for listing */
export interface TemplateSummary {
    readonly id: TemplateId;
    readonly name: string;
    readonly description: string;
    readonly category: TemplateCategory;
    readonly thumbnail: UrlString;
    readonly featured: boolean;
    readonly premium: boolean;
    readonly complexity: TemplateComplexity;
}

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

/** Template collection */
export interface TemplateCollection {
    readonly name: string;
    readonly description: string;
    readonly templates: readonly TemplateSummary[];
}

/** Full template registry */
export interface TemplateRegistry {
    readonly version: string;
    readonly lastUpdated: ISODateString;
    readonly categories: readonly TemplateCategory[];
    readonly featured: readonly TemplateId[];
    readonly collections: readonly TemplateCollection[];
    readonly templates: readonly TemplateSummary[];
}

// ============================================================================
// TYPE GUARDS & UTILITIES
// ============================================================================

export const isTemplateCategory = (value: string): value is TemplateCategory =>
    [
        "minimal",
        "professional",
        "creative",
        "developer",
        "animated",
        "data-driven",
        "portfolio",
        "academic",
    ].includes(value);

export const isPremiumTemplate = (template: Template | TemplateSummary): boolean =>
    "metadata" in template ? template.metadata.premium : template.premium;

export const isFeaturedTemplate = (template: Template | TemplateSummary): boolean =>
    "metadata" in template ? template.metadata.featured : template.featured;

/** Extract template summary from full template */
export const toTemplateSummary = (template: Template): TemplateSummary => ({
    id: template.metadata.id,
    name: template.metadata.name,
    description: template.metadata.description,
    category: template.metadata.category,
    thumbnail: template.metadata.thumbnail,
    featured: template.metadata.featured,
    premium: template.metadata.premium,
    complexity: template.metadata.complexity,
});
