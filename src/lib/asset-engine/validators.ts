/**
 * Asset Engine - Parameter Validators
 *
 * Strong validation for all asset parameters.
 * Returns typed errors for invalid params.
 */

import type {
    AssetParameters,
    AssetCategory,
    ContributionSnakeParams,
    TypingTextParams,
    GradientHeaderParams,
    GitHubStatsParams,
    StreakStatsParams,
    ActivityGraphParams,
    TrophyParams,
    CustomBadgeParams,
    WaveSvgParams,
    ProfileViewsParams,
    AnimationSpeed,
    TypingFontStyle,
    CursorStyle,
    GradientDirection,
    GitHubStatsTheme,
    GitHubStatsCardType,
    LanguageLayout,
    TrophyTheme,
    BadgeStyle,
} from "./types";

import type { AssetError, ValidationIssue } from "./errors";
import {
    missingRequiredParam,
    invalidParamValue,
    paramOutOfRange,
    validationFailed,
} from "./errors";

// ============================================================================
// VALIDATION RESULT TYPE
// ============================================================================

/** Result of parameter validation */
export type ValidationResult =
    | { readonly valid: true }
    | { readonly valid: false; readonly error: AssetError };

// ============================================================================
// ALLOWED VALUES
// ============================================================================

const ANIMATION_SPEEDS: readonly AnimationSpeed[] = ["slow", "normal", "fast"];
const FONT_STYLES: readonly TypingFontStyle[] = ["monospace", "sans-serif", "serif"];
const CURSOR_STYLES: readonly CursorStyle[] = ["bar", "block", "underscore", "none"];
const GRADIENT_DIRECTIONS: readonly GradientDirection[] = [
    "to-right", "to-left", "to-bottom", "to-top",
    "to-bottom-right", "to-bottom-left", "to-top-right", "to-top-left",
];
const CARD_TYPES: readonly GitHubStatsCardType[] = [
    "stats", "top-langs", "streak", "trophies", "activity-graph", "profile-summary",
];
const LANG_LAYOUTS: readonly LanguageLayout[] = [
    "compact", "default", "donut", "donut-vertical", "pie",
];
const BADGE_STYLES: readonly BadgeStyle[] = [
    "flat", "flat-square", "plastic", "for-the-badge", "social",
];

const SUPPORTED_CATEGORIES: readonly AssetCategory[] = [
    "contribution-snake",
    "typing-text",
    "gradient-header",
    "github-stats",
    "streak-stats",
    "activity-graph",
    "trophy",
    "custom-badge",
    "wave-svg",
    "profile-views",
];

// ============================================================================
// BASE VALIDATORS
// ============================================================================

/** Validate required string parameter */
const validateRequiredString = (
    value: unknown,
    paramName: string,
    category: AssetCategory
): ValidationIssue | null => {
    if (value === undefined || value === null || value === "") {
        return {
            param: paramName,
            message: `Missing required parameter: ${paramName}`,
            value,
        };
    }
    if (typeof value !== "string") {
        return {
            param: paramName,
            message: `Parameter ${paramName} must be a string`,
            value,
        };
    }
    return null;
};

/** Validate GitHub username format */
const validateGitHubUsername = (username: string): ValidationIssue | null => {
    // GitHub username rules: alphanumeric, hyphens, max 39 chars, no consecutive hyphens
    const validPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

    if (!validPattern.test(username)) {
        return {
            param: "githubUsername",
            message: "Invalid GitHub username format",
            value: username,
        };
    }
    return null;
};

/** Validate hex color */
const validateHexColor = (
    color: unknown,
    paramName: string
): ValidationIssue | null => {
    if (color === undefined) return null;

    if (typeof color !== "string") {
        return {
            param: paramName,
            message: `${paramName} must be a hex color string`,
            value: color,
        };
    }

    // Allow "transparent" or valid hex
    if (color === "transparent") return null;

    const hexPattern = /^#?[0-9a-fA-F]{3,8}$/;
    if (!hexPattern.test(color)) {
        return {
            param: paramName,
            message: `${paramName} must be a valid hex color (e.g., #ff0000)`,
            value: color,
        };
    }

    return null;
};

/** Validate number in range */
const validateNumberInRange = (
    value: unknown,
    paramName: string,
    min: number,
    max: number
): ValidationIssue | null => {
    if (value === undefined) return null;

    if (typeof value !== "number" || isNaN(value)) {
        return {
            param: paramName,
            message: `${paramName} must be a number`,
            value,
        };
    }

    if (value < min || value > max) {
        return {
            param: paramName,
            message: `${paramName} must be between ${min} and ${max}`,
            value,
        };
    }

    return null;
};

/** Validate enum value */
const validateEnum = <T extends string>(
    value: unknown,
    paramName: string,
    allowedValues: readonly T[]
): ValidationIssue | null => {
    if (value === undefined) return null;

    if (!allowedValues.includes(value as T)) {
        return {
            param: paramName,
            message: `${paramName} must be one of: ${allowedValues.join(", ")}`,
            value,
        };
    }

    return null;
};

/** Validate non-empty array */
const validateNonEmptyArray = (
    value: unknown,
    paramName: string
): ValidationIssue | null => {
    if (!Array.isArray(value) || value.length === 0) {
        return {
            param: paramName,
            message: `${paramName} must be a non-empty array`,
            value,
        };
    }
    return null;
};

// ============================================================================
// CATEGORY-SPECIFIC VALIDATORS
// ============================================================================

/** Validate contribution snake parameters */
const validateContributionSnake = (
    params: ContributionSnakeParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const usernameIssue = validateRequiredString(
        params.githubUsername,
        "githubUsername",
        "contribution-snake"
    );
    if (usernameIssue) issues.push(usernameIssue);
    else {
        const formatIssue = validateGitHubUsername(params.githubUsername);
        if (formatIssue) issues.push(formatIssue);
    }

    const colorIssue = validateHexColor(params.primaryColor, "primaryColor");
    if (colorIssue) issues.push(colorIssue);

    const bgIssue = validateHexColor(params.backgroundColor, "backgroundColor");
    if (bgIssue) issues.push(bgIssue);

    const speedIssue = validateEnum(params.speed, "speed", ANIMATION_SPEEDS);
    if (speedIssue) issues.push(speedIssue);

    return issues;
};

/** Validate typing text parameters */
const validateTypingText = (
    params: TypingTextParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const linesIssue = validateNonEmptyArray(params.lines, "lines");
    if (linesIssue) issues.push(linesIssue);

    const speedIssue = validateNumberInRange(params.typingSpeed, "typingSpeed", 10, 500);
    if (speedIssue) issues.push(speedIssue);

    const deleteSpeedIssue = validateNumberInRange(params.deleteSpeed, "deleteSpeed", 10, 500);
    if (deleteSpeedIssue) issues.push(deleteSpeedIssue);

    const pauseIssue = validateNumberInRange(params.pauseTime, "pauseTime", 100, 10000);
    if (pauseIssue) issues.push(pauseIssue);

    const fontIssue = validateEnum(params.fontStyle, "fontStyle", FONT_STYLES);
    if (fontIssue) issues.push(fontIssue);

    const cursorIssue = validateEnum(params.cursorStyle, "cursorStyle", CURSOR_STYLES);
    if (cursorIssue) issues.push(cursorIssue);

    const colorIssue = validateHexColor(params.color, "color");
    if (colorIssue) issues.push(colorIssue);

    const fontSizeIssue = validateNumberInRange(params.fontSize, "fontSize", 8, 120);
    if (fontSizeIssue) issues.push(fontSizeIssue);

    return issues;
};

/** Validate gradient header parameters */
const validateGradientHeader = (
    params: GradientHeaderParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const textIssue = validateRequiredString(params.text, "text", "gradient-header");
    if (textIssue) issues.push(textIssue);

    // Gradient colors: must have 2-4 colors
    if (!params.gradientColors || params.gradientColors.length < 2) {
        issues.push({
            param: "gradientColors",
            message: "gradientColors must have at least 2 colors",
            value: params.gradientColors,
        });
    } else if (params.gradientColors.length > 4) {
        issues.push({
            param: "gradientColors",
            message: "gradientColors can have at most 4 colors",
            value: params.gradientColors,
        });
    } else {
        // Validate each color
        for (let i = 0; i < params.gradientColors.length; i++) {
            const colorIssue = validateHexColor(params.gradientColors[i], `gradientColors[${i}]`);
            if (colorIssue) issues.push(colorIssue);
        }
    }

    const directionIssue = validateEnum(params.gradientDirection, "gradientDirection", GRADIENT_DIRECTIONS);
    if (directionIssue) issues.push(directionIssue);

    const fontSizeIssue = validateNumberInRange(params.fontSize, "fontSize", 12, 200);
    if (fontSizeIssue) issues.push(fontSizeIssue);

    const heightIssue = validateNumberInRange(params.height, "height", 50, 500);
    if (heightIssue) issues.push(heightIssue);

    return issues;
};

/** Validate GitHub stats parameters */
const validateGitHubStats = (
    params: GitHubStatsParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const usernameIssue = validateRequiredString(
        params.githubUsername,
        "githubUsername",
        "github-stats"
    );
    if (usernameIssue) issues.push(usernameIssue);
    else {
        const formatIssue = validateGitHubUsername(params.githubUsername);
        if (formatIssue) issues.push(formatIssue);
    }

    const cardTypeIssue = validateEnum(params.cardType, "cardType", CARD_TYPES);
    if (cardTypeIssue) issues.push(cardTypeIssue);

    const layoutIssue = validateEnum(params.langLayout, "langLayout", LANG_LAYOUTS);
    if (layoutIssue) issues.push(layoutIssue);

    const langsCountIssue = validateNumberInRange(params.langsCount, "langsCount", 1, 20);
    if (langsCountIssue) issues.push(langsCountIssue);

    // Validate color overrides
    const colorParams = [
        "ringColor", "titleColor", "textColor", "iconColor", "bgColor", "borderColor"
    ] as const;

    for (const colorParam of colorParams) {
        const issue = validateHexColor(params[colorParam], colorParam);
        if (issue) issues.push(issue);
    }

    return issues;
};

/** Validate streak stats parameters */
const validateStreakStats = (
    params: StreakStatsParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const usernameIssue = validateRequiredString(
        params.githubUsername,
        "githubUsername",
        "streak-stats"
    );
    if (usernameIssue) issues.push(usernameIssue);
    else {
        const formatIssue = validateGitHubUsername(params.githubUsername);
        if (formatIssue) issues.push(formatIssue);
    }

    const radiusIssue = validateNumberInRange(params.borderRadius, "borderRadius", 0, 50);
    if (radiusIssue) issues.push(radiusIssue);

    return issues;
};

/** Validate activity graph parameters */
const validateActivityGraph = (
    params: ActivityGraphParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const usernameIssue = validateRequiredString(
        params.githubUsername,
        "githubUsername",
        "activity-graph"
    );
    if (usernameIssue) issues.push(usernameIssue);
    else {
        const formatIssue = validateGitHubUsername(params.githubUsername);
        if (formatIssue) issues.push(formatIssue);
    }

    return issues;
};

/** Validate trophy parameters */
const validateTrophy = (
    params: TrophyParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const usernameIssue = validateRequiredString(
        params.githubUsername,
        "githubUsername",
        "trophy"
    );
    if (usernameIssue) issues.push(usernameIssue);
    else {
        const formatIssue = validateGitHubUsername(params.githubUsername);
        if (formatIssue) issues.push(formatIssue);
    }

    const rowIssue = validateNumberInRange(params.row, "row", 1, 3);
    if (rowIssue) issues.push(rowIssue);

    const colIssue = validateNumberInRange(params.column, "column", 3, 8);
    if (colIssue) issues.push(colIssue);

    return issues;
};

/** Validate custom badge parameters */
const validateCustomBadge = (
    params: CustomBadgeParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const labelIssue = validateRequiredString(params.label, "label", "custom-badge");
    if (labelIssue) issues.push(labelIssue);

    const messageIssue = validateRequiredString(params.message, "message", "custom-badge");
    if (messageIssue) issues.push(messageIssue);

    const colorIssue = validateHexColor(params.color, "color");
    if (colorIssue) issues.push(colorIssue);
    else if (!params.color) {
        issues.push({
            param: "color",
            message: "color is required",
            value: params.color,
        });
    }

    const styleIssue = validateEnum(params.style, "style", BADGE_STYLES);
    if (styleIssue) issues.push(styleIssue);

    return issues;
};

/** Validate wave SVG parameters */
const validateWaveSvg = (
    params: WaveSvgParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const heightIssue = validateNumberInRange(params.height, "height", 20, 300);
    if (heightIssue) issues.push(heightIssue);

    const colorIssue = validateHexColor(params.color, "color");
    if (colorIssue) issues.push(colorIssue);

    return issues;
};

/** Validate profile views parameters */
const validateProfileViews = (
    params: ProfileViewsParams
): readonly ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    const usernameIssue = validateRequiredString(
        params.githubUsername,
        "githubUsername",
        "profile-views"
    );
    if (usernameIssue) issues.push(usernameIssue);
    else {
        const formatIssue = validateGitHubUsername(params.githubUsername);
        if (formatIssue) issues.push(formatIssue);
    }

    return issues;
};

// ============================================================================
// MAIN VALIDATOR
// ============================================================================

/**
 * Validate asset parameters
 * Routes to category-specific validator
 */
export const validateParams = (params: AssetParameters): ValidationResult => {
    let issues: readonly ValidationIssue[];

    switch (params.category) {
        case "contribution-snake":
            issues = validateContributionSnake(params);
            break;
        case "typing-text":
            issues = validateTypingText(params);
            break;
        case "gradient-header":
            issues = validateGradientHeader(params);
            break;
        case "github-stats":
            issues = validateGitHubStats(params);
            break;
        case "streak-stats":
            issues = validateStreakStats(params);
            break;
        case "activity-graph":
            issues = validateActivityGraph(params);
            break;
        case "trophy":
            issues = validateTrophy(params);
            break;
        case "custom-badge":
            issues = validateCustomBadge(params);
            break;
        case "wave-svg":
            issues = validateWaveSvg(params);
            break;
        case "profile-views":
            issues = validateProfileViews(params);
            break;
        default:
            // Exhaustive check
            const _exhaustive: never = params;
            issues = [{
                param: "category",
                message: `Unknown category: ${(_exhaustive as AssetParameters).category}`,
                value: (_exhaustive as AssetParameters).category,
            }];
    }

    if (issues.length > 0) {
        return { valid: false, error: validationFailed(issues) };
    }

    return { valid: true };
};

// ============================================================================
// EXPORTS
// ============================================================================

export { SUPPORTED_CATEGORIES };
