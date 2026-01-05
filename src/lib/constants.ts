/**
 * Application-wide constants
 */

/** Application metadata */
export const APP_NAME = "GitHub Profile Studio";
export const APP_DESCRIPTION =
    "Create stunning GitHub profile READMEs with our visual builder";
export const APP_VERSION = "1.0.0";

/** SEO constants */
export const SEO = {
    defaultTitle: `${APP_NAME} - Visual GitHub Profile README Builder`,
    titleTemplate: `%s | ${APP_NAME}`,
    defaultDescription: APP_DESCRIPTION,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github-profile-studio.com",
    twitterHandle: "@githubstudio",
    ogImage: "/og-image.png",
} as const;

/** API endpoints */
export const API = {
    github: {
        baseUrl: "https://api.github.com",
        userEndpoint: "/users",
        reposEndpoint: "/repos",
    },
} as const;

/** Editor defaults */
export const EDITOR_DEFAULTS = {
    autoSaveInterval: 30000, // 30 seconds
    fontSize: 14,
    theme: "system" as const,
} as const;

/** Template categories mapping */
export const TEMPLATE_CATEGORIES = {
    minimal: {
        label: "Minimal",
        description: "Clean and simple designs",
    },
    professional: {
        label: "Professional",
        description: "Corporate and business-focused",
    },
    creative: {
        label: "Creative",
        description: "Unique and artistic layouts",
    },
    developer: {
        label: "Developer",
        description: "Code-focused with stats and graphs",
    },
    animated: {
        label: "Animated",
        description: "Dynamic SVGs and GIFs",
    },
} as const;
