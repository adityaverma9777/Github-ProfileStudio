/**
 * Asset Engine - Main Generator
 *
 * High-level API for generating resolved assets.
 * Combines validation, URL building, and metadata.
 */

import type { UrlString } from "@/types";

import type {
    AssetParameters,
    AssetCategory,
    ResolvedAsset,
    AssetMetadata,
    AssetGeneratorOptions,
    DEFAULT_GENERATOR_OPTIONS,
} from "./types";

import type { AssetError } from "./errors";
import { unknownError } from "./errors";

import { validateParams, type ValidationResult } from "./validators";
import {
    buildAssetUrl,
    toMarkdown,
    toHtml,
    generateParamsHash,
} from "./url-builder";

// ============================================================================
// RESULT TYPE
// ============================================================================

/** Result of asset generation */
export type GenerateResult =
    | { readonly success: true; readonly asset: ResolvedAsset }
    | { readonly success: false; readonly error: AssetError };

// ============================================================================
// METADATA BUILDERS
// ============================================================================

/** Get format for asset category */
const getAssetFormat = (category: AssetCategory): "svg" | "png" | "gif" => {
    switch (category) {
        case "contribution-snake":
        case "typing-text":
        case "gradient-header":
        case "wave-svg":
            return "svg";
        case "github-stats":
        case "streak-stats":
        case "activity-graph":
        case "trophy":
        case "custom-badge":
        case "profile-views":
            return "svg"; // Most providers return SVG
        default:
            return "svg";
    }
};

/** Check if asset is animated */
const isAssetAnimated = (params: AssetParameters): boolean => {
    switch (params.category) {
        case "contribution-snake":
            return true;
        case "typing-text":
            return true;
        case "gradient-header":
            return params.animated ?? false;
        case "wave-svg":
            return params.animated ?? false;
        default:
            return false;
    }
};

/** Get cache TTL for asset category */
const getCacheTTL = (category: AssetCategory): number => {
    switch (category) {
        // Dynamic data - shorter cache
        case "github-stats":
        case "streak-stats":
        case "activity-graph":
        case "profile-views":
            return 3600; // 1 hour

        // Contribution snake - updates daily
        case "contribution-snake":
            return 86400; // 24 hours

        // Static content - longer cache
        case "typing-text":
        case "gradient-header":
        case "custom-badge":
        case "wave-svg":
            return 604800; // 1 week

        case "trophy":
            return 43200; // 12 hours

        default:
            return 3600;
    }
};

/** Get provider name for category */
const getProviderName = (category: AssetCategory): string => {
    switch (category) {
        case "contribution-snake":
            return "platane/snk";
        case "typing-text":
            return "readme-typing-svg";
        case "gradient-header":
        case "wave-svg":
            return "capsule-render";
        case "github-stats":
            return "github-readme-stats";
        case "streak-stats":
            return "github-readme-streak-stats";
        case "activity-graph":
            return "github-readme-activity-graph";
        case "trophy":
            return "github-profile-trophy";
        case "custom-badge":
            return "shields.io";
        case "profile-views":
            return "komarev";
        default:
            return "unknown";
    }
};

/** Build asset metadata */
const buildMetadata = (params: AssetParameters): AssetMetadata => ({
    category: params.category,
    paramsHash: generateParamsHash(params),
    isAnimated: isAssetAnimated(params),
    format: getAssetFormat(params.category),
    cacheTTL: getCacheTTL(params.category),
    provider: getProviderName(params.category),
});

// ============================================================================
// MAIN GENERATOR
// ============================================================================

/**
 * Generate a resolved asset from parameters
 *
 * @param params - Asset parameters (discriminated by category)
 * @param options - Generator options
 * @returns GenerateResult with either resolved asset or error
 */
export const generate = (
    params: AssetParameters,
    options: AssetGeneratorOptions = {}
): GenerateResult => {
    try {
        // Validate parameters
        const validation = validateParams(params);
        if (!validation.valid) {
            return { success: false, error: validation.error };
        }

        // Build URL
        const url = buildAssetUrl(params);

        // Build metadata
        const metadata = buildMetadata(params);

        // Generate alt text
        const alt = generateAltText(params);

        // Build resolved asset
        const asset: ResolvedAsset = {
            url,
            markdown: toMarkdown(url, alt, { align: "center" }),
            html: toHtml(url, alt, { align: "center" }),
            metadata,
        };

        return { success: true, asset };
    } catch (e) {
        return { success: false, error: unknownError(e) };
    }
};

/**
 * Generate multiple assets in batch
 */
export const generateBatch = (
    paramsList: readonly AssetParameters[],
    options: AssetGeneratorOptions = {}
): readonly GenerateResult[] => {
    return paramsList.map((params) => generate(params, options));
};

/**
 * Validate parameters without generating
 */
export const validate = (params: AssetParameters): ValidationResult => {
    return validateParams(params);
};

// ============================================================================
// ALT TEXT GENERATION
// ============================================================================

/** Generate accessible alt text for asset */
const generateAltText = (params: AssetParameters): string => {
    switch (params.category) {
        case "contribution-snake":
            return `${params.githubUsername}'s GitHub contribution graph snake animation`;

        case "typing-text":
            return `Typing animation: ${params.lines.slice(0, 2).join(", ")}${params.lines.length > 2 ? "..." : ""}`;

        case "gradient-header":
            return params.text;

        case "github-stats":
            return `${params.githubUsername}'s GitHub ${params.cardType} statistics`;

        case "streak-stats":
            return `${params.githubUsername}'s GitHub contribution streak`;

        case "activity-graph":
            return `${params.githubUsername}'s GitHub activity graph`;

        case "trophy":
            return `${params.githubUsername}'s GitHub trophies`;

        case "custom-badge":
            return `${params.label}: ${params.message}`;

        case "wave-svg":
            return "Decorative wave";

        case "profile-views":
            return `${params.githubUsername}'s profile views`;

        default:
            return "GitHub profile asset";
    }
};

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Quick generate contribution snake
 */
export const generateSnake = (
    githubUsername: string,
    theme?: "light" | "dark"
): GenerateResult => {
    return generate({
        category: "contribution-snake",
        githubUsername,
        theme: theme ?? "system",
        style: theme === "dark" ? "github-dark" : "default",
    });
};

/**
 * Quick generate typing animation
 */
export const generateTyping = (
    lines: readonly string[],
    options?: { color?: string; loop?: boolean }
): GenerateResult => {
    return generate({
        category: "typing-text",
        lines,
        loop: options?.loop ?? true,
        color: options?.color as never,
    });
};

/**
 * Quick generate gradient header
 */
export const generateHeader = (
    text: string,
    colors: readonly string[],
    options?: { animated?: boolean }
): GenerateResult => {
    return generate({
        category: "gradient-header",
        text,
        gradientColors: colors as never,
        animated: options?.animated,
    });
};

/**
 * Quick generate GitHub stats card
 */
export const generateStats = (
    githubUsername: string,
    cardType: "stats" | "top-langs" | "streak" | "trophies" | "activity-graph" = "stats",
    theme?: string
): GenerateResult => {
    return generate({
        category: "github-stats",
        githubUsername,
        cardType,
        statsTheme: theme as never,
    });
};

// ============================================================================
// EXPORTS
// ============================================================================

export { generate as generateAsset };
