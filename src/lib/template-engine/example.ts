/**
 * Template Engine - Usage Example
 *
 * Demonstrates how to use the template engine to render
 * a TemplateSchema + UserProfile into IR output.
 *
 * This file is for documentation purposes only.
 */

import type { Template, UserProfile, Section } from "@/types";
import { createGitHubUsername, createISODateString } from "@/types";

import {
    render,
    type RenderOutput,
    type Block,
    type RenderedSection,
} from "./index";

// ============================================================================
// EXAMPLE: Basic Rendering
// ============================================================================

/**
 * Example: Render a template with user profile
 */
export const exampleBasicRender = (
    template: Template,
    profile: UserProfile
): void => {
    const result = render(template, profile);

    if (result.success) {
        console.log("Render successful!");
        console.log(`Sections rendered: ${result.output.metadata.sectionsRendered}`);
        console.log(`Render time: ${result.output.metadata.renderTime}ms`);

        // Process the IR output
        for (const section of result.output.sections) {
            console.log(`Section: ${section.type} (${section.id})`);
            console.log(`  Blocks: ${section.blocks.length}`);
        }
    } else {
        console.error("Render failed:");
        for (const error of result.errors) {
            console.error(`  [${error.code}] ${error.message}`);
        }
    }
};

// ============================================================================
// EXAMPLE: With Hooks
// ============================================================================

/**
 * Example: Render with lifecycle hooks
 */
export const exampleWithHooks = (
    template: Template,
    profile: UserProfile
): void => {
    const result = render(template, profile, {
        theme: "dark",
        locale: "en",

        onBeforeRender: (context) => {
            console.log(`Starting render at ${context.timestamp}`);
        },

        onSectionRendered: (section) => {
            console.log(`Rendered: ${section.type}`);
        },

        onAfterRender: (output) => {
            console.log(`Completed in ${output.metadata.renderTime}ms`);
        },

        onError: (error) => {
            console.warn(`Error: ${error.message}`);
        },
    });

    if (result.success) {
        processOutput(result.output);
    }
};

// ============================================================================
// EXAMPLE: Processing IR Output
// ============================================================================

/**
 * Example: Walk the IR tree and process blocks
 */
const processOutput = (output: RenderOutput): void => {
    for (const section of output.sections) {
        processSection(section);
    }
};

const processSection = (section: RenderedSection): void => {
    console.log(`Processing section: ${section.type}`);

    for (const block of section.blocks) {
        processBlock(block);
    }
};

const processBlock = (block: Block): void => {
    // Exhaustive switch on block kind
    switch (block.kind) {
        case "text":
            console.log(`  Text: ${block.value}`);
            break;

        case "heading":
            console.log(`  H${block.level}: ${block.value}`);
            break;

        case "image":
            console.log(`  Image: ${block.alt} (${block.src})`);
            break;

        case "badge":
            console.log(`  Badge: ${block.label}`);
            break;

        case "badge-group":
            console.log(`  Badge Group: ${block.badges.length} badges`);
            break;

        case "github-stats-card":
            console.log(`  GitHub Stats: ${block.cardType} for ${block.username}`);
            break;

        case "project-card":
            console.log(`  Project: ${block.name}`);
            break;

        case "row":
        case "column":
        case "grid":
            // Recursively process children
            for (const child of block.children) {
                processBlock(child);
            }
            break;

        case "social-group":
            console.log(`  Social Links: ${block.links.length}`);
            break;

        case "typing-animation":
            console.log(`  Typing: ${block.texts.join(" | ")}`);
            break;

        // Handle all other block types
        case "paragraph":
        case "code":
        case "quote":
        case "link":
        case "list":
        case "spacer":
        case "divider":
        case "stat":
        case "stat-group":
        case "social-link":
        case "contribution-graph":
        case "card":
        case "experience-item":
        case "education-item":
        case "achievement-item":
        case "custom":
            console.log(`  ${block.kind}`);
            break;

        default:
            // Exhaustive check - TypeScript will error if we miss a case
            const _exhaustive: never = block;
            console.log(`  Unknown block: ${(_exhaustive as Block).kind}`);
    }
};

// ============================================================================
// EXAMPLE: Minimal Input Data
// ============================================================================

/**
 * Example minimal profile for testing
 */
export const createMinimalProfile = (): UserProfile => ({
    id: "test-user-1",
    githubUsername: createGitHubUsername("testuser"),
    personal: {
        displayName: {
            useName: true,
            useLogin: false,
            customName: "Test User",
            showPronouns: false,
        },
        avatar: {
            useGitHubAvatar: true,
            showBorder: false,
            shape: "circle",
        },
        isAvailableForHire: true,
        isOpenToCollaboration: true,
    },
    professional: {
        experience: [],
        education: [],
        certifications: [],
        specializations: [],
    },
    techStack: {
        items: [],
        featured: [],
        showProficiency: false,
        groupByCategory: false,
    },
    socialLinks: {
        links: [],
        showFollowerCount: false,
    },
    projects: {
        items: [],
        showFeaturedOnly: false,
        maxDisplay: 6,
    },
    customFields: {
        fields: [],
    },
    integrations: {
        blog: {
            enabled: false,
            maxPosts: 5,
            showExcerpts: true,
        },
        spotify: {
            enabled: false,
            showNowPlaying: true,
            showTopTracks: false,
            showRecentlyPlayed: false,
        },
        wakatime: {
            enabled: false,
            range: "last_7_days",
            showLanguages: true,
            showEditors: false,
        },
    },
    timestamps: {
        createdAt: createISODateString(new Date().toISOString()),
        updatedAt: createISODateString(new Date().toISOString()),
    },
});

// ============================================================================
// EXAMPLE: Output Structure
// ============================================================================

/**
 * Example of what the RenderOutput looks like:
 *
 * {
 *   context: {
 *     templateId: "developer-pro-v1",
 *     theme: "dark",
 *     locale: "en",
 *     timestamp: "2025-01-01T00:00:00Z"
 *   },
 *   sections: [
 *     {
 *       id: "hero-001",
 *       type: "hero",
 *       title: undefined,
 *       visible: true,
 *       order: 0,
 *       blocks: [
 *         {
 *           id: "heading_1_abc123",
 *           kind: "heading",
 *           value: "Hi there! 👋 I'm Test User",
 *           level: 1,
 *           align: "center",
 *           visible: true
 *         },
 *         {
 *           id: "typing_2_def456",
 *           kind: "typing-animation",
 *           texts: ["Full Stack Developer", "Open Source Contributor"],
 *           speed: 100,
 *           deleteSpeed: 50,
 *           pauseTime: 2000,
 *           loop: true,
 *           visible: true
 *         }
 *       ]
 *     },
 *     {
 *       id: "github-stats-001",
 *       type: "github-stats",
 *       title: "GitHub Stats",
 *       visible: true,
 *       order: 3,
 *       blocks: [
 *         {
 *           id: "row_3_ghi789",
 *           kind: "row",
 *           children: [
 *             {
 *               id: "gh-stats_4_jkl012",
 *               kind: "github-stats-card",
 *               username: "testuser",
 *               cardType: "stats",
 *               theme: "github",
 *               showIcons: true,
 *               hideBorder: false,
 *               includeAllCommits: true,
 *               countPrivate: true,
 *               visible: true
 *             }
 *           ],
 *           align: "center",
 *           justify: "center",
 *           gap: "md",
 *           wrap: true,
 *           visible: true
 *         }
 *       ]
 *     }
 *   ],
 *   metadata: {
 *     templateId: "developer-pro-v1",
 *     templateName: "Developer Pro",
 *     templateVersion: "1.2.0",
 *     sectionsRendered: 6,
 *     sectionsSkipped: 0,
 *     warnings: [],
 *     renderTime: 12.5
 *   }
 * }
 */
