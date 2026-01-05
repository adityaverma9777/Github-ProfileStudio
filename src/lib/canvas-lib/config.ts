/**
 * Canvas Library - Configuration
 * 
 * Configurable provider URLs for external services.
 * Users can swap to self-hosted endpoints.
 */

export const CANVAS_CONFIG = {
    providers: {
        /** Typing SVG animation service */
        typingSvg: {
            baseUrl: "https://readme-typing-svg.herokuapp.com",
            demoUrl: "https://readme-typing-svg.herokuapp.com/demo/",
        },

        /** GitHub Readme Stats service */
        githubStats: {
            baseUrl: "https://github-readme-stats.vercel.app/api",
            topLangsUrl: "https://github-readme-stats.vercel.app/api/top-langs",
        },

        /** GitHub Streak Stats service */
        streakStats: {
            baseUrl: "https://github-readme-streak-stats.herokuapp.com",
        },

        /** GitHub Profile Trophy service */
        trophies: {
            baseUrl: "https://github-profile-trophy.vercel.app",
        },

        /** GitHub Activity Graph service */
        activityGraph: {
            baseUrl: "https://github-readme-activity-graph.vercel.app/graph",
        },

        /** Contribution Snake (Platane/snk) - pattern for self-hosted */
        contributionSnake: {
            pattern: "https://raw.githubusercontent.com/{username}/{username}/output/github-contribution-grid-snake-dark.svg",
            fallback: "https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake-dark.svg",
        },

        /** Shields.io badges */
        shields: {
            baseUrl: "https://img.shields.io/badge",
        },
    },

    /** Default themes available */
    themes: [
        "default",
        "radical",
        "dark",
        "tokyonight",
        "onedark",
        "cobalt",
        "synthwave",
        "highcontrast",
        "dracula",
    ] as const,

    /** Default badge styles */
    badgeStyles: [
        "flat",
        "flat-square",
        "plastic",
        "for-the-badge",
        "social",
    ] as const,
} as const;

export type Theme = (typeof CANVAS_CONFIG.themes)[number];
export type BadgeStyle = (typeof CANVAS_CONFIG.badgeStyles)[number];

/**
 * Generate typing SVG URL
 */
export function generateTypingSvgUrl(
    lines: readonly string[],
    options?: {
        center?: boolean;
        color?: string;
        size?: number;
        pause?: number;
        duration?: number;
        width?: number;
    }
): string {
    // Manually encode each line and join with semicolons
    // The readme-typing-svg service expects lines separated by semicolons
    // with each line individually URL-encoded
    const encodedLines = lines.map(line => encodeURIComponent(line)).join(";");

    // Calculate width based on the longest line and font size
    // Default width of 400px from the service is too narrow for most text
    const fontSize = options?.size ?? 24;
    const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b, "");
    // Estimate: each character ~0.6 * fontSize, plus padding for emojis
    const estimatedWidth = Math.max(500, Math.ceil(longestLine.length * fontSize * 0.6) + 100);
    const width = options?.width ?? estimatedWidth;

    const params: string[] = [`lines=${encodedLines}`];
    params.push(`width=${width}`);
    if (options?.center) params.push("center=true");
    if (options?.color) params.push(`color=${options.color.replace("#", "")}`);
    if (options?.size) params.push(`size=${options.size}`);
    if (options?.pause) params.push(`pause=${options.pause}`);
    if (options?.duration) params.push(`duration=${options.duration}`);

    return `${CANVAS_CONFIG.providers.typingSvg.baseUrl}?${params.join("&")}`;
}

/**
 * Generate GitHub Stats card URL
 */
export function generateGitHubStatsUrl(
    username: string,
    options?: {
        theme?: Theme;
        showIcons?: boolean;
        includeAllCommits?: boolean;
        countPrivate?: boolean;
        hideBorder?: boolean;
    }
): string {
    const params = new URLSearchParams({
        username,
        theme: options?.theme ?? "default",
        show_icons: String(options?.showIcons ?? true),
    });

    if (options?.includeAllCommits) params.set("include_all_commits", "true");
    if (options?.countPrivate) params.set("count_private", "true");
    if (options?.hideBorder) params.set("hide_border", "true");

    return `${CANVAS_CONFIG.providers.githubStats.baseUrl}?${params}`;
}

/**
 * Generate Top Languages card URL
 */
export function generateTopLangsUrl(
    username: string,
    options?: {
        theme?: Theme;
        layout?: "compact" | "donut" | "donut-vertical" | "pie";
        langs_count?: number;
    }
): string {
    const params = new URLSearchParams({
        username,
        theme: options?.theme ?? "default",
        layout: options?.layout ?? "compact",
    });

    if (options?.langs_count) params.set("langs_count", String(options.langs_count));

    return `${CANVAS_CONFIG.providers.githubStats.topLangsUrl}?${params}`;
}

/**
 * Generate Streak Stats URL
 */
export function generateStreakStatsUrl(
    username: string,
    options?: { theme?: Theme }
): string {
    const params = new URLSearchParams({
        user: username,
        theme: options?.theme ?? "default",
    });

    return `${CANVAS_CONFIG.providers.streakStats.baseUrl}?${params}`;
}

/**
 * Generate Trophy URL
 */
export function generateTrophyUrl(
    username: string,
    options?: { theme?: Theme; row?: number; column?: number }
): string {
    const params = new URLSearchParams({
        username,
        theme: options?.theme ?? "default",
        row: String(options?.row ?? 1),
        column: String(options?.column ?? 6),
    });

    return `${CANVAS_CONFIG.providers.trophies.baseUrl}?${params}`;
}

/**
 * Generate Contribution Snake URL
 * Note: This requires the user to have the Platane/snk GitHub Action set up.
 * For users without the action, we use platane's demo as a fallback.
 */
export function generateContributionSnakeUrl(
    username: string,
    options?: { variant?: "dark" | "light" }
): string {
    const variant = options?.variant ?? "dark";
    // Use platane's demo snake - works for everyone
    // The actual snake for the user would require them to set up the GitHub Action
    const snakeFile = variant === "dark"
        ? "github-contribution-grid-snake-dark.svg"
        : "github-contribution-grid-snake.svg";

    // Try user's repo first, but for preview we'll show platane's demo
    // In the exported markdown, users need to set up the GitHub Action themselves
    return `https://raw.githubusercontent.com/platane/platane/output/${snakeFile}`;
}

/**
 * Generate Shields.io badge URL
 */
export function generateBadgeUrl(
    label: string,
    message: string,
    color: string,
    options?: {
        style?: BadgeStyle;
        logo?: string;
        logoColor?: string;
    }
): string {
    const encodedLabel = encodeURIComponent(label.replace(/-/g, "--"));
    const encodedMessage = encodeURIComponent(message.replace(/-/g, "--"));
    const encodedColor = color.replace("#", "");

    let url = `${CANVAS_CONFIG.providers.shields.baseUrl}/${encodedLabel}-${encodedMessage}-${encodedColor}`;

    const params = new URLSearchParams();
    if (options?.style) params.set("style", options.style);
    if (options?.logo) params.set("logo", options.logo);
    if (options?.logoColor) params.set("logoColor", options.logoColor.replace("#", ""));

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
}
