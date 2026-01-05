/**
 * Common type definitions shared across the application
 * These are foundational types used by multiple domains
 */

// ============================================================================
// BRANDED TYPES
// ============================================================================

/**
 * Branded type helper for nominal typing
 * Prevents accidental assignment of incompatible string types
 */
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

/** Unique identifier for templates */
export type TemplateId = Brand<string, "TemplateId">;

/** Unique identifier for sections */
export type SectionId = Brand<string, "SectionId">;

/** Unique identifier for assets */
export type AssetId = Brand<string, "AssetId">;

/** GitHub username (validated format) */
export type GitHubUsername = Brand<string, "GitHubUsername">;

/** Hex color code (e.g., #FF5733) */
export type HexColor = Brand<string, "HexColor">;

/** URL string (validated format) */
export type UrlString = Brand<string, "UrlString">;

/** ISO 8601 date string */
export type ISODateString = Brand<string, "ISODateString">;

// ============================================================================
// HELPER TYPE CONSTRUCTORS
// ============================================================================

/**
 * Creates a branded type constructor
 * Usage: const templateId = createTemplateId("my-template");
 */
export const createTemplateId = (id: string): TemplateId => id as TemplateId;
export const createSectionId = (id: string): SectionId => id as SectionId;
export const createAssetId = (id: string): AssetId => id as AssetId;
export const createGitHubUsername = (username: string): GitHubUsername =>
    username as GitHubUsername;
export const createHexColor = (color: string): HexColor => color as HexColor;
export const createUrlString = (url: string): UrlString => url as UrlString;
export const createISODateString = (date: string): ISODateString =>
    date as ISODateString;

// ============================================================================
// SEMANTIC VERSION
// ============================================================================

/** Semantic version following semver spec */
export interface SemanticVersion {
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
}

/** Parse version string to SemanticVersion */
export const parseVersion = (version: string): SemanticVersion => {
    const [major = 0, minor = 0, patch = 0] = version.split(".").map(Number);
    return { major, minor, patch };
};

// ============================================================================
// THEME & STYLING PRIMITIVES
// ============================================================================

/** Color scheme preference */
export type ColorScheme = "light" | "dark" | "system";

/** Font weight values following CSS spec */
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/** Font style variants */
export type FontStyle = "normal" | "italic";

/** Text alignment options */
export type TextAlign = "left" | "center" | "right";

/** Border radius size tokens */
export type BorderRadiusToken = "none" | "sm" | "md" | "lg" | "xl" | "full";

/** Spacing scale tokens (in rem units conceptually) */
export type SpacingToken =
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "8"
    | "10"
    | "12"
    | "16"
    | "20"
    | "24";

// ============================================================================
// ANIMATION PRIMITIVES
// ============================================================================

/** Animation easing functions */
export type EasingFunction =
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "cubic-bezier";

/** Animation direction */
export type AnimationDirection =
    | "normal"
    | "reverse"
    | "alternate"
    | "alternate-reverse";

/** Animation fill mode */
export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

/** Animation timing configuration */
export interface AnimationTiming {
    readonly duration: number; // milliseconds
    readonly delay: number; // milliseconds
    readonly iterations: number | "infinite";
    readonly easing: EasingFunction;
    readonly direction: AnimationDirection;
    readonly fillMode: AnimationFillMode;
}

/** Default animation timing */
export const DEFAULT_ANIMATION_TIMING: AnimationTiming = {
    duration: 1000,
    delay: 0,
    iterations: 1,
    easing: "ease",
    direction: "normal",
    fillMode: "none",
} as const;

// ============================================================================
// LAYOUT PRIMITIVES
// ============================================================================

/** Flexbox alignment values */
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

/** Flexbox justify values */
export type FlexJustify =
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly";

/** Flexbox direction */
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

/** Grid column span */
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";

// ============================================================================
// VISIBILITY & DISPLAY
// ============================================================================

/** Visibility conditions for responsive design */
export interface VisibilityCondition {
    readonly showOnMobile: boolean;
    readonly showOnTablet: boolean;
    readonly showOnDesktop: boolean;
}

/** Default visibility (shown on all devices) */
export const DEFAULT_VISIBILITY: VisibilityCondition = {
    showOnMobile: true,
    showOnTablet: true,
    showOnDesktop: true,
} as const;

// ============================================================================
// RESULT TYPES
// ============================================================================

/** Generic result type for operations that can fail */
export type Result<T, E = Error> =
    | { readonly success: true; readonly data: T }
    | { readonly success: false; readonly error: E };

/** Async result helper */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

// ============================================================================
// METADATA
// ============================================================================

/** Audit timestamp fields */
export interface AuditTimestamps {
    readonly createdAt: ISODateString;
    readonly updatedAt: ISODateString;
}

/** Author information */
export interface AuthorInfo {
    readonly name: string;
    readonly username?: GitHubUsername;
    readonly url?: UrlString;
}

/** Localization support */
export type LocaleCode = "en" | "es" | "fr" | "de" | "ja" | "zh" | "ko" | "pt";

/** Localized string map */
export type LocalizedString = Readonly<Record<LocaleCode, string>> & {
    readonly en: string; // English is required as fallback
};
