/**
 * Asset Engine - URL Builder
 *
 * Deterministic URL generation for all asset types.
 * URLs are cacheable and reproducible.
 */

import type { UrlString, HexColor } from "@/types";

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
    AssetGeneratorOptions,
    DEFAULT_GENERATOR_OPTIONS,
} from "./types";

// ============================================================================
// PROVIDER URLS
// ============================================================================

/** External provider base URLs */
export const PROVIDER_URLS = {
    // GitHub readme stats
    githubStats: "https://github-readme-stats.vercel.app/api",
    topLangs: "https://github-readme-stats.vercel.app/api/top-langs",

    // Streak stats
    streak: "https://github-readme-streak-stats.herokuapp.com",

    // Activity graph
    activityGraph: "https://github-readme-activity-graph.vercel.app/graph",

    // Trophy
    trophy: "https://github-profile-trophy.vercel.app",

    // Contribution snake
    snakeDefault: "https://raw.githubusercontent.com/platane/snk/output",

    // Typing SVG
    typingSvg: "https://readme-typing-svg.herokuapp.com",

    // Shields.io
    shields: "https://img.shields.io",

    // Profile views
    profileViews: "https://komarev.com/ghpvc",

    // Capsule render (for gradient headers)
    capsuleRender: "https://capsule-render.vercel.app/api",
} as const;

// ============================================================================
// URL ENCODING UTILITIES
// ============================================================================

/** Encode color (remove # prefix if present) */
export const encodeColor = (color: HexColor | string): string => {
    return color.replace(/^#/, "");
};

/** Encode array as comma-separated string */
export const encodeArray = (arr: readonly string[]): string => {
    return arr.join(",");
};

/** Build query string from params object */
export const buildQueryString = (
    params: Record<string, string | number | boolean | undefined>
): string => {
    const entries = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => {
            const encodedValue = encodeURIComponent(String(value));
            return `${encodeURIComponent(key)}=${encodedValue}`;
        });

    return entries.length > 0 ? `?${entries.join("&")}` : "";
};

/** Generate deterministic hash from parameters */
export const generateParamsHash = (params: AssetParameters): string => {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort());
    let hash = 0;
    for (let i = 0; i < sortedParams.length; i++) {
        const char = sortedParams.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
};

// ============================================================================
// CONTRIBUTION SNAKE URL BUILDER
// ============================================================================

export const buildContributionSnakeUrl = (
    params: ContributionSnakeParams
): UrlString => {
    const { githubUsername, style, theme } = params;

    // Use platane/snk output format
    let filename = "github-contribution-grid-snake";

    if (theme === "dark" || style === "github-dark") {
        filename += "-dark";
    }

    filename += ".svg";

    // For self-hosted or custom deployments, the URL would be:
    // https://raw.githubusercontent.com/{username}/{username}/output/{filename}
    // For now, use the community version
    const url = `${PROVIDER_URLS.snakeDefault}/${filename}`;

    return url as UrlString;
};

// ============================================================================
// TYPING TEXT URL BUILDER
// ============================================================================

export const buildTypingTextUrl = (
    params: TypingTextParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        lines: encodeArray(params.lines),
        center: params.align === "center",
        vCenter: true,
        width: 500,
        height: params.fontSize ? params.fontSize + 20 : 44,
        font: params.fontStyle,
        size: params.fontSize,
        duration: params.typingSpeed ? 1000 / (params.typingSpeed / 100) : undefined,
        pause: params.pauseTime,
        color: params.color ? encodeColor(params.color) : undefined,
        background: params.theme === "dark" ? "00000000" : undefined,
        multiline: params.lines.length > 1,
        repeat: params.loop ?? true,
    };

    const url = `${PROVIDER_URLS.typingSvg}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// GRADIENT HEADER URL BUILDER
// ============================================================================

export const buildGradientHeaderUrl = (
    params: GradientHeaderParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        type: params.animated ? "waving" : "rect",
        color: encodeArray(params.gradientColors.map(encodeColor)),
        height: params.height ?? 200,
        section: "header",
        text: params.text,
        fontSize: params.fontSize ?? 48,
        fontAlign: params.align === "left" ? 20 : params.align === "right" ? 80 : 50,
        fontAlignY: 50,
        animation: params.animated ? (params.animationType ?? "fadeIn") : undefined,
        fontColor: "ffffff", // Default white text
    };

    const url = `${PROVIDER_URLS.capsuleRender}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// GITHUB STATS URL BUILDER
// ============================================================================

export const buildGitHubStatsUrl = (
    params: GitHubStatsParams
): UrlString => {
    const { cardType, githubUsername } = params;

    // Base URL depends on card type
    let baseUrl: string;

    switch (cardType) {
        case "stats":
            baseUrl = PROVIDER_URLS.githubStats;
            break;
        case "top-langs":
            baseUrl = PROVIDER_URLS.topLangs;
            break;
        case "streak":
            return buildStreakStatsUrl({
                category: "streak-stats",
                githubUsername,
                statsTheme: params.statsTheme,
                hideBorder: params.hideBorder,
            });
        case "trophies":
            return buildTrophyUrl({
                category: "trophy",
                githubUsername,
                trophyTheme: params.statsTheme as never,
            });
        case "activity-graph":
            return buildActivityGraphUrl({
                category: "activity-graph",
                githubUsername,
                graphTheme: params.statsTheme,
                hideBorder: params.hideBorder,
            });
        default:
            baseUrl = PROVIDER_URLS.githubStats;
    }

    const queryParams: Record<string, string | number | boolean | undefined> = {
        username: githubUsername,
        theme: params.statsTheme ?? "default",
        show_icons: params.showIcons,
        include_all_commits: params.includeAllCommits,
        count_private: params.countPrivate,
        hide_border: params.hideBorder,
        hide_title: params.hideTitle,
        hide_rank: params.hideRank,
        custom_title: params.customTitle,
        line_height: params.lineHeight,
        card_width: params.cardWidth,
        layout: params.langLayout,
        hide: params.hideLanguages ? encodeArray([...params.hideLanguages]) : undefined,
        langs_count: params.langsCount,
        ring_color: params.ringColor ? encodeColor(params.ringColor) : undefined,
        title_color: params.titleColor ? encodeColor(params.titleColor) : undefined,
        text_color: params.textColor ? encodeColor(params.textColor) : undefined,
        icon_color: params.iconColor ? encodeColor(params.iconColor) : undefined,
        bg_color: params.bgColor ? encodeColor(params.bgColor) : undefined,
        border_color: params.borderColor ? encodeColor(params.borderColor) : undefined,
    };

    const url = `${baseUrl}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// STREAK STATS URL BUILDER
// ============================================================================

export const buildStreakStatsUrl = (
    params: StreakStatsParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        user: params.githubUsername,
        theme: params.statsTheme ?? "default",
        hide_border: params.hideBorder,
        border_radius: params.borderRadius,
        date_format: params.dateFormat,
        stroke: params.strokeColor ? encodeColor(params.strokeColor) : undefined,
        ring: params.ringColor ? encodeColor(params.ringColor) : undefined,
        fire: params.fireColor ? encodeColor(params.fireColor) : undefined,
        currStreakNum: params.currStreakNum ? encodeColor(params.currStreakNum) : undefined,
        sideNums: params.sideNums ? encodeColor(params.sideNums) : undefined,
        currStreakLabel: params.currStreakLabel ? encodeColor(params.currStreakLabel) : undefined,
        sideLabels: params.sideLabels ? encodeColor(params.sideLabels) : undefined,
        dates: params.dates ? encodeColor(params.dates) : undefined,
        background: params.background ? encodeColor(params.background) : undefined,
    };

    const url = `${PROVIDER_URLS.streak}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// ACTIVITY GRAPH URL BUILDER
// ============================================================================

export const buildActivityGraphUrl = (
    params: ActivityGraphParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        username: params.githubUsername,
        theme: params.graphTheme ?? "github-compact",
        hide_border: params.hideBorder,
        custom_title: params.customTitle,
        area: params.area,
        area_color: params.areaColor ? encodeColor(params.areaColor) : undefined,
        line: params.lineColor ? encodeColor(params.lineColor) : undefined,
        point: params.pointColor ? encodeColor(params.pointColor) : undefined,
        bg_color: params.bgColor ? encodeColor(params.bgColor) : undefined,
        grid: params.gridColor ? encodeColor(params.gridColor) : undefined,
    };

    const url = `${PROVIDER_URLS.activityGraph}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// TROPHY URL BUILDER
// ============================================================================

export const buildTrophyUrl = (
    params: TrophyParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        username: params.githubUsername,
        theme: params.trophyTheme ?? "flat",
        row: params.row,
        column: params.column,
        no_frame: params.noFrame,
        no_bg: params.noBg,
        margin_w: params.marginW,
        margin_h: params.marginH,
        // Note: rank filter uses a different format
    };

    const url = `${PROVIDER_URLS.trophy}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// CUSTOM BADGE URL BUILDER (Shields.io)
// ============================================================================

export const buildCustomBadgeUrl = (
    params: CustomBadgeParams
): UrlString => {
    const { label, message, color, style } = params;

    // Shields.io path format: /badge/{label}-{message}-{color}
    const encodedLabel = encodeURIComponent(label.replace(/-/g, "--").replace(/_/g, "__"));
    const encodedMessage = encodeURIComponent(message.replace(/-/g, "--").replace(/_/g, "__"));
    const colorHex = encodeColor(color);

    const queryParams: Record<string, string | number | boolean | undefined> = {
        style: style ?? "for-the-badge",
        labelColor: params.labelColor ? encodeColor(params.labelColor) : undefined,
        logo: params.logo,
        logoColor: params.logoColor ? encodeColor(params.logoColor) : undefined,
        logoWidth: params.logoWidth,
    };

    const url = `${PROVIDER_URLS.shields}/badge/${encodedLabel}-${encodedMessage}-${colorHex}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// WAVE SVG URL BUILDER
// ============================================================================

export const buildWaveSvgUrl = (
    params: WaveSvgParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        type: "wave",
        color: params.color ? encodeColor(params.color) : "0:00c6ff,100:0072ff",
        height: params.height ?? 120,
        section: params.flip ? "footer" : "header",
        animation: params.animated,
    };

    const url = `${PROVIDER_URLS.capsuleRender}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// PROFILE VIEWS URL BUILDER
// ============================================================================

export const buildProfileViewsUrl = (
    params: ProfileViewsParams
): UrlString => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
        username: params.githubUsername,
        color: params.color ? encodeColor(params.color) : undefined,
        style: params.style ?? "flat",
        label: params.label,
        labelColor: params.labelColor ? encodeColor(params.labelColor) : undefined,
    };

    const url = `${PROVIDER_URLS.profileViews}${buildQueryString(queryParams)}`;
    return url as UrlString;
};

// ============================================================================
// MAIN URL BUILDER
// ============================================================================

/**
 * Build URL for any asset type
 * Uses category discriminator for type-safe routing
 */
export const buildAssetUrl = (params: AssetParameters): UrlString => {
    switch (params.category) {
        case "contribution-snake":
            return buildContributionSnakeUrl(params);
        case "typing-text":
            return buildTypingTextUrl(params);
        case "gradient-header":
            return buildGradientHeaderUrl(params);
        case "github-stats":
            return buildGitHubStatsUrl(params);
        case "streak-stats":
            return buildStreakStatsUrl(params);
        case "activity-graph":
            return buildActivityGraphUrl(params);
        case "trophy":
            return buildTrophyUrl(params);
        case "custom-badge":
            return buildCustomBadgeUrl(params);
        case "wave-svg":
            return buildWaveSvgUrl(params);
        case "profile-views":
            return buildProfileViewsUrl(params);
        default:
            // Exhaustive check
            const _exhaustive: never = params;
            throw new Error(`Unknown asset category: ${(_exhaustive as AssetParameters).category}`);
    }
};

// ============================================================================
// MARKDOWN/HTML GENERATORS
// ============================================================================

/** Generate markdown embed for asset */
export const toMarkdown = (
    url: UrlString,
    alt: string,
    options?: { align?: "left" | "center" | "right"; link?: UrlString }
): string => {
    const img = `![${alt}](${url})`;

    if (options?.link) {
        return `[![${alt}](${url})](${options.link})`;
    }

    if (options?.align === "center") {
        return `<p align="center">${img}</p>`;
    }

    if (options?.align) {
        return `<p align="${options.align}">${img}</p>`;
    }

    return img;
};

/** Generate HTML embed for asset */
export const toHtml = (
    url: UrlString,
    alt: string,
    options?: { align?: "left" | "center" | "right"; link?: UrlString; width?: number; height?: number }
): string => {
    const attrs = [
        `src="${url}"`,
        `alt="${alt}"`,
        options?.width ? `width="${options.width}"` : "",
        options?.height ? `height="${options.height}"` : "",
    ].filter(Boolean).join(" ");

    const img = `<img ${attrs} />`;

    if (options?.link) {
        return `<a href="${options.link}">${img}</a>`;
    }

    if (options?.align) {
        return `<div align="${options.align}">${img}</div>`;
    }

    return img;
};
