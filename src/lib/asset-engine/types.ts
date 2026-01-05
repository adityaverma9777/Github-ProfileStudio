/**
 * Asset Engine - Type Definitions
 *
 * Defines asset descriptors, parameters, and resolved URLs
 * for GitHub-embeddable animated assets.
 *
 * Design Principles:
 * - Deterministic URL generation
 * - Strong parameter typing
 * - Cacheable outputs
 * - GitHub README compatible
 */

import type { HexColor, UrlString, ColorScheme } from "@/types";

// ============================================================================
// ASSET CATEGORIES
// ============================================================================

/** Categories of animated/parameterized assets */
export type AssetCategory =
    | "contribution-snake"
    | "typing-text"
    | "gradient-header"
    | "github-stats"
    | "streak-stats"
    | "top-languages"
    | "trophy"
    | "activity-graph"
    | "profile-views"
    | "wave-svg"
    | "custom-badge";

// ============================================================================
// BASE ASSET PARAMETERS
// ============================================================================

/** Base parameters shared by most assets */
export interface BaseAssetParameters {
    /** Color scheme preference */
    readonly theme?: ColorScheme;
    /** Cache bust key (optional, for forcing refresh) */
    readonly cacheBust?: string;
}

// ============================================================================
// CONTRIBUTION SNAKE PARAMETERS
// ============================================================================

/** Animation speed presets */
export type AnimationSpeed = "slow" | "normal" | "fast";

/** Contribution snake animation parameters */
export interface ContributionSnakeParams extends BaseAssetParameters {
    readonly category: "contribution-snake";
    readonly githubUsername: string;
    /** Primary snake color */
    readonly primaryColor?: HexColor;
    /** Background color (transparent if not set) */
    readonly backgroundColor?: HexColor | "transparent";
    /** Animation speed */
    readonly speed?: AnimationSpeed;
    /** Grid dot color for days with no contributions */
    readonly emptyColor?: HexColor;
    /** Animation style */
    readonly style?: "default" | "github-light" | "github-dark";
}

// ============================================================================
// TYPING TEXT PARAMETERS
// ============================================================================

/** Font style for typing animation */
export type TypingFontStyle = "monospace" | "sans-serif" | "serif";

/** Cursor style */
export type CursorStyle = "bar" | "block" | "underscore" | "none";

/** Typing text animation parameters */
export interface TypingTextParams extends BaseAssetParameters {
    readonly category: "typing-text";
    /** Lines of text to type */
    readonly lines: readonly string[];
    /** Typing speed in ms per character */
    readonly typingSpeed?: number;
    /** Delete speed in ms per character */
    readonly deleteSpeed?: number;
    /** Pause between lines in ms */
    readonly pauseTime?: number;
    /** Whether to loop the animation */
    readonly loop?: boolean;
    /** Font style */
    readonly fontStyle?: TypingFontStyle;
    /** Text color */
    readonly color?: HexColor;
    /** Font size in pixels */
    readonly fontSize?: number;
    /** Cursor style */
    readonly cursorStyle?: CursorStyle;
    /** Cursor color */
    readonly cursorColor?: HexColor;
    /** Text alignment */
    readonly align?: "left" | "center" | "right";
}

// ============================================================================
// GRADIENT HEADER PARAMETERS
// ============================================================================

/** Gradient direction */
export type GradientDirection =
    | "to-right"
    | "to-left"
    | "to-bottom"
    | "to-top"
    | "to-bottom-right"
    | "to-bottom-left"
    | "to-top-right"
    | "to-top-left";

/** Gradient header banner parameters */
export interface GradientHeaderParams extends BaseAssetParameters {
    readonly category: "gradient-header";
    /** Header text */
    readonly text: string;
    /** Gradient colors (2-4 colors) */
    readonly gradientColors: readonly HexColor[];
    /** Gradient direction */
    readonly gradientDirection?: GradientDirection;
    /** Font size in pixels */
    readonly fontSize?: number;
    /** Font weight */
    readonly fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
    /** Text alignment */
    readonly align?: "left" | "center" | "right";
    /** Banner height in pixels */
    readonly height?: number;
    /** Banner width (full or specific px) */
    readonly width?: number | "full";
    /** Add animation effect */
    readonly animated?: boolean;
    /** Animation type if animated */
    readonly animationType?: "shimmer" | "pulse" | "wave";
}

// ============================================================================
// GITHUB STATS CARD PARAMETERS
// ============================================================================

/** Available GitHub stats themes */
export type GitHubStatsTheme =
    | "default"
    | "dark"
    | "radical"
    | "merko"
    | "gruvbox"
    | "tokyonight"
    | "onedark"
    | "cobalt"
    | "synthwave"
    | "highcontrast"
    | "dracula"
    | "prussian"
    | "monokai"
    | "vue"
    | "vue-dark"
    | "shades-of-purple"
    | "nightowl"
    | "buefy"
    | "blue-green"
    | "algolia"
    | "great-gatsby"
    | "darcula"
    | "bear"
    | "solarized-dark"
    | "solarized-light"
    | "chartreuse-dark"
    | "nord"
    | "gotham"
    | "material-palenight"
    | "graywhite"
    | "vision-friendly-dark"
    | "ayu-mirage"
    | "midnight-purple"
    | "calm"
    | "flag-india"
    | "omni"
    | "react"
    | "jolly"
    | "maroongold"
    | "yeblu"
    | "blueberry"
    | "slateorange"
    | "kacho_ga"
    | "outrun"
    | "ocean_dark"
    | "city_lights"
    | "github_dark"
    | "github_dark_dimmed"
    | "discord_old_blurple"
    | "aura_dark"
    | "panda"
    | "noctis_minimus"
    | "cobalt2"
    | "swift"
    | "aura"
    | "apprentice"
    | "moltack"
    | "codeSTACKr"
    | "rose_pine"
    | "catppuccin_latte"
    | "catppuccin_mocha"
    | "date_night"
    | "one_dark_pro"
    | "rose"
    | "holi"
    | "neon"
    | "blue_navy"
    | "calm_pink"
    | "ambient_gradient";

/** GitHub stats card type */
export type GitHubStatsCardType =
    | "stats"
    | "top-langs"
    | "streak"
    | "trophies"
    | "activity-graph"
    | "profile-summary";

/** Layout for language stats */
export type LanguageLayout = "compact" | "default" | "donut" | "donut-vertical" | "pie";

/** GitHub stats card parameters */
export interface GitHubStatsParams extends BaseAssetParameters {
    readonly category: "github-stats";
    readonly githubUsername: string;
    /** Card type */
    readonly cardType: GitHubStatsCardType;
    /** Theme name */
    readonly statsTheme?: GitHubStatsTheme;
    /** Show icons */
    readonly showIcons?: boolean;
    /** Include all commits (not just current year) */
    readonly includeAllCommits?: boolean;
    /** Count private contributions */
    readonly countPrivate?: boolean;
    /** Hide border */
    readonly hideBorder?: boolean;
    /** Hide title */
    readonly hideTitle?: boolean;
    /** Hide rank */
    readonly hideRank?: boolean;
    /** Custom title */
    readonly customTitle?: string;
    /** Line height */
    readonly lineHeight?: number;
    /** Card width */
    readonly cardWidth?: number;
    /** Language layout (for top-langs) */
    readonly langLayout?: LanguageLayout;
    /** Languages to hide */
    readonly hideLanguages?: readonly string[];
    /** Languages count (for top-langs) */
    readonly langsCount?: number;
    /** Ring color override */
    readonly ringColor?: HexColor;
    /** Title color override */
    readonly titleColor?: HexColor;
    /** Text color override */
    readonly textColor?: HexColor;
    /** Icon color override */
    readonly iconColor?: HexColor;
    /** Background color override */
    readonly bgColor?: HexColor;
    /** Border color override */
    readonly borderColor?: HexColor;
}

// ============================================================================
// STREAK STATS PARAMETERS
// ============================================================================

/** GitHub streak stats parameters */
export interface StreakStatsParams extends BaseAssetParameters {
    readonly category: "streak-stats";
    readonly githubUsername: string;
    /** Theme name */
    readonly statsTheme?: GitHubStatsTheme;
    /** Hide border */
    readonly hideBorder?: boolean;
    /** Border radius */
    readonly borderRadius?: number;
    /** Date format */
    readonly dateFormat?: string;
    /** Stroke color */
    readonly strokeColor?: HexColor;
    /** Ring color */
    readonly ringColor?: HexColor;
    /** Fire color */
    readonly fireColor?: HexColor;
    /** Current streak number color */
    readonly currStreakNum?: HexColor;
    /** Sidebar number color */
    readonly sideNums?: HexColor;
    /** Current streak label color */
    readonly currStreakLabel?: HexColor;
    /** Sidebar labels color */
    readonly sideLabels?: HexColor;
    /** Date range text color */
    readonly dates?: HexColor;
    /** Background color */
    readonly background?: HexColor;
}

// ============================================================================
// ACTIVITY GRAPH PARAMETERS
// ============================================================================

/** Activity graph parameters */
export interface ActivityGraphParams extends BaseAssetParameters {
    readonly category: "activity-graph";
    readonly githubUsername: string;
    /** Theme name */
    readonly graphTheme?: GitHubStatsTheme;
    /** Hide border */
    readonly hideBorder?: boolean;
    /** Custom title */
    readonly customTitle?: string;
    /** Area fill */
    readonly area?: boolean;
    /** Area color */
    readonly areaColor?: HexColor;
    /** Line color */
    readonly lineColor?: HexColor;
    /** Point color */
    readonly pointColor?: HexColor;
    /** Background color */
    readonly bgColor?: HexColor;
    /** Grid color */
    readonly gridColor?: HexColor;
}

// ============================================================================
// TROPHY PARAMETERS
// ============================================================================

/** Trophy row configuration */
export type TrophyRow = 1 | 2 | 3;
export type TrophyColumn = 3 | 4 | 5 | 6 | 7 | 8;

/** Trophy theme */
export type TrophyTheme =
    | "flat"
    | "onedark"
    | "gruvbox"
    | "dracula"
    | "monokai"
    | "chalk"
    | "nord"
    | "alduin"
    | "darkhub"
    | "juicyfresh"
    | "buddhism"
    | "oldie"
    | "radical"
    | "onestar"
    | "discord"
    | "algolia"
    | "gitdimmed"
    | "tokyonight"
    | "matrix"
    | "apprentice"
    | "dark_dimmed"
    | "dark_lover";

/** Trophy parameters */
export interface TrophyParams extends BaseAssetParameters {
    readonly category: "trophy";
    readonly githubUsername: string;
    /** Theme */
    readonly trophyTheme?: TrophyTheme;
    /** Number of rows */
    readonly row?: TrophyRow;
    /** Number of columns */
    readonly column?: TrophyColumn;
    /** No frame */
    readonly noFrame?: boolean;
    /** No background */
    readonly noBg?: boolean;
    /** Margin width */
    readonly marginW?: number;
    /** Margin height */
    readonly marginH?: number;
    /** Trophies to hide */
    readonly hideTrophies?: readonly string[];
    /** Rank filter (only show certain ranks) */
    readonly rankFilter?: readonly ("SSS" | "SS" | "S" | "AAA" | "AA" | "A" | "B" | "C" | "SECRET")[];
}

// ============================================================================
// CUSTOM BADGE PARAMETERS
// ============================================================================

/** Badge style */
export type BadgeStyle = "flat" | "flat-square" | "plastic" | "for-the-badge" | "social";

/** Custom badge parameters (shields.io compatible) */
export interface CustomBadgeParams extends BaseAssetParameters {
    readonly category: "custom-badge";
    /** Badge label (left side) */
    readonly label: string;
    /** Badge message (right side) */
    readonly message: string;
    /** Badge color */
    readonly color: HexColor;
    /** Label color */
    readonly labelColor?: HexColor;
    /** Badge style */
    readonly style?: BadgeStyle;
    /** Logo name (Simple Icons) */
    readonly logo?: string;
    /** Logo color */
    readonly logoColor?: HexColor;
    /** Logo width */
    readonly logoWidth?: number;
    /** Link URL */
    readonly link?: UrlString;
}

// ============================================================================
// WAVE SVG PARAMETERS
// ============================================================================

/** Wave SVG parameters */
export interface WaveSvgParams extends BaseAssetParameters {
    readonly category: "wave-svg";
    /** Wave height */
    readonly height?: number;
    /** Wave color */
    readonly color?: HexColor;
    /** Wave style */
    readonly style?: "default" | "smooth" | "sharp";
    /** Flip vertically */
    readonly flip?: boolean;
    /** Animate */
    readonly animated?: boolean;
}

// ============================================================================
// PROFILE VIEWS PARAMETERS
// ============================================================================

/** Profile views counter parameters */
export interface ProfileViewsParams extends BaseAssetParameters {
    readonly category: "profile-views";
    readonly githubUsername: string;
    /** Counter color */
    readonly color?: HexColor;
    /** Style */
    readonly style?: "flat" | "flat-square" | "plastic" | "for-the-badge";
    /** Label text */
    readonly label?: string;
    /** Label color */
    readonly labelColor?: HexColor;
}

// ============================================================================
// UNION TYPE
// ============================================================================

/** Discriminated union of all asset parameters */
export type AssetParameters =
    | ContributionSnakeParams
    | TypingTextParams
    | GradientHeaderParams
    | GitHubStatsParams
    | StreakStatsParams
    | ActivityGraphParams
    | TrophyParams
    | CustomBadgeParams
    | WaveSvgParams
    | ProfileViewsParams;

// ============================================================================
// RESOLVED ASSET
// ============================================================================

/** Metadata about the resolved asset */
export interface AssetMetadata {
    /** Asset category */
    readonly category: AssetCategory;
    /** Original parameters hash (for caching) */
    readonly paramsHash: string;
    /** Whether asset is animated */
    readonly isAnimated: boolean;
    /** Asset format */
    readonly format: "svg" | "png" | "gif";
    /** Expected dimensions if known */
    readonly dimensions?: {
        readonly width: number;
        readonly height: number;
    };
    /** Cache TTL in seconds */
    readonly cacheTTL: number;
    /** Provider name */
    readonly provider: string;
}

/** Resolved asset with URL and metadata */
export interface ResolvedAsset {
    /** The resolved URL */
    readonly url: UrlString;
    /** Markdown embed code */
    readonly markdown: string;
    /** HTML embed code */
    readonly html: string;
    /** Asset metadata */
    readonly metadata: AssetMetadata;
}

// ============================================================================
// GENERATOR OPTIONS
// ============================================================================

/** Options for asset generation */
export interface AssetGeneratorOptions {
    /** Base URL for self-hosted assets */
    readonly baseUrl?: string;
    /** Whether to use proxied URLs */
    readonly useProxy?: boolean;
    /** Proxy base URL */
    readonly proxyUrl?: string;
    /** Default cache TTL */
    readonly defaultCacheTTL?: number;
}

/** Default generator options */
export const DEFAULT_GENERATOR_OPTIONS: AssetGeneratorOptions = {
    baseUrl: "https://raw.githubusercontent.com",
    useProxy: false,
    defaultCacheTTL: 3600, // 1 hour
};

// ============================================================================
// DEFAULT PARAMETER VALUES
// ============================================================================

export const DEFAULT_TYPING_PARAMS: Partial<TypingTextParams> = {
    typingSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000,
    loop: true,
    fontStyle: "monospace",
    fontSize: 24,
    cursorStyle: "bar",
    align: "center",
};

export const DEFAULT_SNAKE_PARAMS: Partial<ContributionSnakeParams> = {
    speed: "normal",
    backgroundColor: "transparent",
    style: "default",
};

export const DEFAULT_HEADER_PARAMS: Partial<GradientHeaderParams> = {
    gradientDirection: "to-right",
    fontSize: 48,
    fontWeight: 700,
    align: "center",
    height: 200,
    animated: false,
};

export const DEFAULT_STATS_PARAMS: Partial<GitHubStatsParams> = {
    showIcons: true,
    includeAllCommits: true,
    countPrivate: true,
    hideBorder: false,
};
