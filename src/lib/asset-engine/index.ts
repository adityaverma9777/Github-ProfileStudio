/**
 * Asset Engine - Public API
 *
 * Central barrel export for the asset engine.
 * Import from '@/lib/asset-engine' for clean access.
 *
 * @example
 * import { generate, generateSnake, generateStats } from '@/lib/asset-engine';
 *
 * const result = generate({
 *   category: 'contribution-snake',
 *   githubUsername: 'octocat',
 * });
 *
 * if (result.success) {
 *   console.log(result.asset.url);
 * }
 */

// ============================================================================
// CORE GENERATOR
// ============================================================================

export {
    generate,
    generateAsset,
    generateBatch,
    validate,
    // Convenience functions
    generateSnake,
    generateTyping,
    generateHeader,
    generateStats,
    // Types
    type GenerateResult,
} from "./generator";

// ============================================================================
// TYPES
// ============================================================================

export type {
    // Categories
    AssetCategory,
    // Base types
    BaseAssetParameters,
    AnimationSpeed,
    // Parameter types
    ContributionSnakeParams,
    TypingTextParams,
    TypingFontStyle,
    CursorStyle,
    GradientHeaderParams,
    GradientDirection,
    GitHubStatsParams,
    GitHubStatsTheme,
    GitHubStatsCardType,
    LanguageLayout,
    StreakStatsParams,
    ActivityGraphParams,
    TrophyParams,
    TrophyTheme,
    TrophyRow,
    TrophyColumn,
    CustomBadgeParams,
    BadgeStyle,
    WaveSvgParams,
    ProfileViewsParams,
    // Union type
    AssetParameters,
    // Resolved asset
    ResolvedAsset,
    AssetMetadata,
    // Generator options
    AssetGeneratorOptions,
} from "./types";

export {
    DEFAULT_GENERATOR_OPTIONS,
    DEFAULT_TYPING_PARAMS,
    DEFAULT_SNAKE_PARAMS,
    DEFAULT_HEADER_PARAMS,
    DEFAULT_STATS_PARAMS,
} from "./types";

// ============================================================================
// URL BUILDER
// ============================================================================

export {
    buildAssetUrl,
    buildContributionSnakeUrl,
    buildTypingTextUrl,
    buildGradientHeaderUrl,
    buildGitHubStatsUrl,
    buildStreakStatsUrl,
    buildActivityGraphUrl,
    buildTrophyUrl,
    buildCustomBadgeUrl,
    buildWaveSvgUrl,
    buildProfileViewsUrl,
    // Utilities
    toMarkdown,
    toHtml,
    generateParamsHash,
    encodeColor,
    buildQueryString,
    // Provider URLs
    PROVIDER_URLS,
} from "./url-builder";

// ============================================================================
// VALIDATORS
// ============================================================================

export {
    validateParams,
    SUPPORTED_CATEGORIES,
    type ValidationResult,
} from "./validators";

// ============================================================================
// ERRORS
// ============================================================================

export type {
    AssetErrorCode,
    AssetError,
    AssetErrorBase,
    MissingRequiredParamError,
    InvalidParamTypeError,
    InvalidParamValueError,
    ParamOutOfRangeError,
    UnsupportedCategoryError,
    UrlGenerationFailedError,
    ProviderUnavailableError,
    ProviderRateLimitedError,
    ValidationFailedError,
    ValidationIssue,
    UnknownAssetError,
} from "./errors";

export {
    // Error factories
    missingRequiredParam,
    invalidParamType,
    invalidParamValue,
    paramOutOfRange,
    unsupportedCategory,
    urlGenerationFailed,
    validationFailed,
    unknownError,
    // Type guards
    isAssetError,
    isParameterError,
    isRecoverable,
} from "./errors";
