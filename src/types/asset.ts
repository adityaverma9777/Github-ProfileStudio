/**
 * Asset System Type Definitions
 *
 * Handles all hosted animated assets (SVG, GIF, static images)
 * with support for parameterized generation and deterministic URLs
 */

import type {
    AssetId,
    HexColor,
    UrlString,
    AnimationTiming,
    ColorScheme,
    ISODateString,
} from "./common";

// ============================================================================
// ASSET KINDS
// ============================================================================

/** Discriminator for asset types */
export type AssetKind =
    | "svg-static"
    | "svg-animated"
    | "gif"
    | "png"
    | "jpg"
    | "webp";

/** Asset source origin */
export type AssetSource =
    | "hosted" // Assets hosted on our CDN
    | "github" // GitHub-provided assets (avatars, stats)
    | "shields" // Shields.io badges
    | "custom"; // User-provided URLs

// ============================================================================
// ASSET PARAMETER SYSTEM
// ============================================================================

/**
 * Base interface for asset parameters
 * Parameters that can be injected into asset URLs or SVG content
 */
export interface BaseAssetParams {
    readonly username?: string;
    readonly theme?: ColorScheme;
}

/** Color parameters for customizable assets */
export interface ColorAssetParams extends BaseAssetParams {
    readonly primaryColor?: HexColor;
    readonly secondaryColor?: HexColor;
    readonly backgroundColor?: HexColor;
    readonly textColor?: HexColor;
    readonly accentColor?: HexColor;
}

/** Animation parameters for animated assets */
export interface AnimatedAssetParams extends ColorAssetParams {
    readonly animation?: Partial<AnimationTiming>;
    readonly autoplay?: boolean;
    readonly loop?: boolean;
}

/** GitHub-specific asset parameters */
export interface GitHubAssetParams extends ColorAssetParams {
    readonly username: string;
    readonly showIcons?: boolean;
    readonly includeAllCommits?: boolean;
    readonly countPrivate?: boolean;
    readonly hideBorder?: boolean;
    readonly hideRank?: boolean;
    readonly hideTitle?: boolean;
    readonly lineHeight?: number;
    readonly cardWidth?: number;
}

/** Shields.io badge parameters */
export interface ShieldsBadgeParams extends ColorAssetParams {
    readonly label: string;
    readonly message: string;
    readonly style?: "flat" | "flat-square" | "plastic" | "for-the-badge" | "social";
    readonly logo?: string;
    readonly logoColor?: HexColor;
    readonly labelColor?: HexColor;
    readonly color?: HexColor;
}

/** Wakatime stats parameters */
export interface WakatimeAssetParams extends ColorAssetParams {
    readonly username: string;
    readonly layout?: "compact" | "default";
    readonly hideTitle?: boolean;
    readonly hideProgress?: boolean;
    readonly hideBorder?: boolean;
    readonly lineCount?: number;
}

/** Union of all parameter types */
export type AssetParams =
    | BaseAssetParams
    | ColorAssetParams
    | AnimatedAssetParams
    | GitHubAssetParams
    | ShieldsBadgeParams
    | WakatimeAssetParams;

// ============================================================================
// ASSET DEFINITIONS
// ============================================================================

/** Base asset interface shared by all asset types */
interface AssetBase {
    readonly id: AssetId;
    readonly name: string;
    readonly description?: string;
    readonly kind: AssetKind;
    readonly source: AssetSource;
    readonly tags: readonly string[];
    readonly createdAt?: ISODateString;
    readonly updatedAt?: ISODateString;
}

/** Static SVG asset */
export interface StaticSvgAsset extends AssetBase {
    readonly kind: "svg-static";
    readonly url: UrlString;
    readonly width?: number;
    readonly height?: number;
    readonly viewBox?: string;
    readonly params?: ColorAssetParams;
}

/** Animated SVG asset */
export interface AnimatedSvgAsset extends AssetBase {
    readonly kind: "svg-animated";
    readonly url: UrlString;
    readonly width?: number;
    readonly height?: number;
    readonly viewBox?: string;
    readonly animation: AnimationTiming;
    readonly params?: AnimatedAssetParams;
}

/** GIF asset */
export interface GifAsset extends AssetBase {
    readonly kind: "gif";
    readonly url: UrlString;
    readonly width: number;
    readonly height: number;
    readonly duration?: number; // Total animation duration in ms
    readonly frameCount?: number;
}

/** Static image asset (PNG, JPG, WebP) */
export interface StaticImageAsset extends AssetBase {
    readonly kind: "png" | "jpg" | "webp";
    readonly url: UrlString;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
}


/** Discriminated union of all asset types */
export type Asset =
    | StaticSvgAsset
    | AnimatedSvgAsset
    | GifAsset
    | StaticImageAsset;

// ============================================================================
// PARAMETERIZED ASSET TEMPLATES
// ============================================================================

/**
 * Asset template for generating parameterized assets
 * These templates produce deterministic URLs based on params
 */
export interface AssetTemplate<P extends AssetParams = AssetParams> {
    readonly id: AssetId;
    readonly name: string;
    readonly description: string;
    readonly source: AssetSource;
    readonly kind: AssetKind;
    readonly urlTemplate: string; // Template string with {param} placeholders
    readonly defaultParams: P;
    readonly requiredParams: ReadonlyArray<keyof P>;
}

/** GitHub Stats Card template */
export interface GitHubStatsCardTemplate
    extends AssetTemplate<GitHubAssetParams> {
    readonly source: "github";
    readonly cardType:
    | "stats"
    | "top-langs"
    | "streak"
    | "trophies"
    | "activity-graph"
    | "profile-summary";
}

/** Shields.io Badge template */
export interface ShieldsBadgeTemplate extends AssetTemplate<ShieldsBadgeParams> {
    readonly source: "shields";
}

/** Union of specialized templates */
export type SpecializedAssetTemplate =
    | GitHubStatsCardTemplate
    | ShieldsBadgeTemplate;

// ============================================================================
// ASSET REGISTRY
// ============================================================================

/** Category for organizing assets */
export interface AssetCategory {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly icon?: string;
}

/** Asset collection with category */
export interface AssetCollection {
    readonly category: AssetCategory;
    readonly assets: readonly Asset[];
    readonly templates: readonly AssetTemplate[];
}

/** Full asset registry */
export interface AssetRegistry {
    readonly version: string;
    readonly categories: readonly AssetCategory[];
    readonly collections: readonly AssetCollection[];
}

// ============================================================================
// URL GENERATION
// ============================================================================

/** Parameters for URL generation */
export interface UrlGenerationContext {
    readonly baseUrl: string;
    readonly params: AssetParams;
    readonly theme: ColorScheme;
}

/** Generated asset URL with metadata */
export interface GeneratedAssetUrl {
    readonly url: UrlString;
    readonly params: AssetParams;
    readonly cacheKey: string;
    readonly expiresAt?: ISODateString;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export const isAnimatedSvgAsset = (asset: Asset): asset is AnimatedSvgAsset =>
    asset.kind === "svg-animated";

export const isStaticSvgAsset = (asset: Asset): asset is StaticSvgAsset =>
    asset.kind === "svg-static";

export const isGifAsset = (asset: Asset): asset is GifAsset =>
    asset.kind === "gif";

export const isStaticImageAsset = (asset: Asset): asset is StaticImageAsset =>
    asset.kind === "png" || asset.kind === "jpg" || asset.kind === "webp";

export const isAnimatedAsset = (asset: Asset): boolean =>
    isAnimatedSvgAsset(asset) || isGifAsset(asset);
