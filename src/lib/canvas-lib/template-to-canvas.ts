/**
 * Template to Canvas Converter
 * 
 * Converts Template sections to Canvas items for use in the custom builder.
 * This enables the "Use this Template" feature, allowing users to edit
 * pre-made templates in the canvas-based editor.
 */

import type { Template, Section } from "@/types";
import type {
    Canvas,
    CanvasItem,
    TypingHeroItem,
    StaticHeroItem,
    TextBlockItem,
    TechStackItem,
    TechItem,
    ProjectsListItem,
    ProjectDef,
    GitHubStatsItem,
    ContributionSnakeItem,
    SocialLinksItem,
    SocialLinkDef,
    BadgeGroupItem,
    BadgeDef,
    DividerItem,
    SpacerItem,
} from "./types";
import { generateItemId } from "./types";
import type { Theme, BadgeStyle } from "./config";
import { TECH_CATALOG, type TechCatalogItem } from "./tech-catalog";

// ============================================================================
// SECTION CONVERTERS
// ============================================================================

/**
 * Convert hero section to canvas item
 */
function convertHeroSection(section: Section): CanvasItem | null {
    if (section.type !== "hero" || !section.enabled) return null;

    const data = section.data as {
        headline?: string;
        subheadline?: string;
        typingTexts?: readonly string[];
    };

    // If has typing texts, create typing hero
    if (data.typingTexts && data.typingTexts.length > 0) {
        const item: TypingHeroItem = {
            type: "typing-hero",
            id: generateItemId("typing-hero"),
            props: {
                lines: [...data.typingTexts],
                center: true,
                color: "36BCF7",
                size: 24,
                pause: 1000,
            },
        };
        return item;
    }

    // Otherwise create static hero
    const item: StaticHeroItem = {
        type: "static-hero",
        id: generateItemId("static-hero"),
        props: {
            headline: data.headline ?? "Welcome to my Profile",
            subheadline: data.subheadline ?? "",
            align: "center",
        },
    };
    return item;
}

/**
 * Convert about section to text block
 */
function convertAboutSection(section: Section): CanvasItem[] {
    if (section.type !== "about" || !section.enabled) return [];

    const data = section.data as {
        content?: string;
        highlights?: readonly string[];
        currentFocus?: string;
    };

    const items: CanvasItem[] = [];

    // Main content as text block
    if (data.content) {
        const textBlock: TextBlockItem = {
            type: "text-block",
            id: generateItemId("text-block"),
            props: {
                content: data.content,
                align: "left",
            },
        };
        items.push(textBlock);
    }

    // Highlights as another text block
    if (data.highlights && data.highlights.length > 0) {
        const highlightsContent = data.highlights.map(h => `• ${h}`).join("\n\n");
        const highlightsBlock: TextBlockItem = {
            type: "text-block",
            id: generateItemId("text-block"),
            props: {
                content: highlightsContent,
                align: "left",
            },
        };
        items.push(highlightsBlock);
    }

    // Current focus
    if (data.currentFocus) {
        const focusBlock: TextBlockItem = {
            type: "text-block",
            id: generateItemId("text-block"),
            props: {
                content: `🔭 **Currently:** ${data.currentFocus}`,
                align: "left",
            },
        };
        items.push(focusBlock);
    }

    return items;
}

/**
 * Convert tech stack section to tech-stack canvas item
 */
function convertTechStackSection(section: Section): CanvasItem | null {
    if (section.type !== "tech-stack" || !section.enabled) return null;

    const data = section.data as {
        items?: readonly { name: string; category: string; proficiency?: string }[];
        groupByCategory?: boolean;
    };

    const config = section.config as {
        displayStyle?: string;
        badgeStyle?: string;
    };

    const techItems: TechItem[] = (data.items ?? []).map(item => ({
        name: item.name,
        category: item.category,
        icon: getTechIcon(item.name),
    }));

    const techStackItem: TechStackItem = {
        type: "tech-stack",
        id: generateItemId("tech-stack"),
        props: {
            title: section.title ?? "Tech Stack",
            items: techItems,
            displayStyle: (config.displayStyle as "badges" | "icons" | "list") ?? "badges",
            badgeStyle: (config.badgeStyle as BadgeStyle) ?? "for-the-badge",
            groupByCategory: data.groupByCategory ?? false,
        },
    };

    return techStackItem;
}

/**
 * Get tech icon from catalog
 */
function getTechIcon(name: string): string | undefined {
    const normalizedName = name.toLowerCase().replace(/\s+/g, "");
    const tech = TECH_CATALOG.find(
        t => t.name.toLowerCase().replace(/\s+/g, "") === normalizedName
    );
    return tech?.logo;
}

/**
 * Convert GitHub stats section to github-stats canvas item
 */
function convertGitHubStatsSection(section: Section): CanvasItem | null {
    if (section.type !== "github-stats" || !section.enabled) return null;

    const data = section.data as {
        username?: string;
        cards?: readonly string[];
    };

    const config = section.config as {
        theme?: string;
        cardLayout?: string;
    };

    const cards = data.cards ?? ["stats"];

    const statsItem: GitHubStatsItem = {
        type: "github-stats",
        id: generateItemId("github-stats"),
        props: {
            username: data.username ?? "your-github-username",
            showStats: cards.includes("stats"),
            showTopLangs: cards.includes("top-langs"),
            showStreak: cards.includes("streak"),
            showTrophies: cards.includes("trophies"),
            theme: (config.theme as Theme) ?? "default",
            layout: (config.cardLayout as "row" | "column") ?? "row",
        },
    };

    return statsItem;
}

/**
 * Convert projects section to projects-list canvas item
 */
function convertProjectsSection(section: Section): CanvasItem | null {
    if (section.type !== "projects" || !section.enabled) return null;

    const data = section.data as {
        items?: readonly {
            name: string;
            description: string;
            repoUrl?: string;
            demoUrl?: string;
            techStack?: readonly string[];
            stars?: number;
            forks?: number;
        }[];
    };

    const config = section.config as {
        displayStyle?: string;
        maxProjects?: number;
    };

    const projects: ProjectDef[] = (data.items ?? []).map(item => ({
        name: item.name,
        description: item.description,
        repoUrl: item.repoUrl ?? `https://github.com/username/${item.name.toLowerCase().replace(/\s+/g, "-")}`,
        demoUrl: item.demoUrl,
        techStack: item.techStack ?? [],
        stars: item.stars,
        forks: item.forks,
    }));

    const projectsItem: ProjectsListItem = {
        type: "projects-list",
        id: generateItemId("projects-list"),
        props: {
            title: section.title ?? "Featured Projects",
            projects,
            displayStyle: (config.displayStyle as "cards" | "list" | "table") ?? "cards",
            maxProjects: config.maxProjects ?? 4,
        },
    };

    return projectsItem;
}

/**
 * Convert socials section to social-links canvas item
 */
function convertSocialsSection(section: Section): CanvasItem | null {
    if (section.type !== "socials" || !section.enabled) return null;

    const data = section.data as {
        links?: readonly {
            platform: string;
            url: string;
            username?: string;
            label?: string;
        }[];
    };

    const config = section.config as {
        displayStyle?: string;
    };

    const links: SocialLinkDef[] = (data.links ?? []).map(link => ({
        platform: link.platform,
        url: link.url,
        label: link.label ?? link.platform,
    }));

    const socialsItem: SocialLinksItem = {
        type: "social-links",
        id: generateItemId("social-links"),
        props: {
            title: section.title ?? "Connect With Me",
            links,
            displayStyle: (config.displayStyle as "badges" | "icons" | "text") ?? "badges",
            align: "center",
        },
    };

    return socialsItem;
}

/**
 * Convert contributions section to contribution-snake canvas item
 */
function convertContributionsSection(section: Section): CanvasItem | null {
    if (section.type !== "contributions" || !section.enabled) return null;

    const snakeItem: ContributionSnakeItem = {
        type: "contribution-snake",
        id: generateItemId("contribution-snake"),
        props: {
            username: "your-github-username",
            variant: "dark",
        },
    };

    return snakeItem;
}

/**
 * Convert divider section to divider canvas item
 */
function convertDividerSection(section: Section): CanvasItem | null {
    if (section.type !== "divider" || !section.enabled) return null;

    const data = section.data as {
        style?: string;
    };

    const dividerItem: DividerItem = {
        type: "divider",
        id: generateItemId("divider"),
        props: {
            style: (data.style as "line" | "dashed" | "dotted" | "gradient") ?? "line",
            width: "full",
        },
    };

    return dividerItem;
}

/**
 * Convert spacer section to spacer canvas item
 */
function convertSpacerSection(section: Section): CanvasItem | null {
    if (section.type !== "spacer" || !section.enabled) return null;

    const spacerItem: SpacerItem = {
        type: "spacer",
        id: generateItemId("spacer"),
        props: {
            height: "md",
        },
    };

    return spacerItem;
}

// ============================================================================
// MAIN CONVERTER
// ============================================================================

/**
 * Convert a section to canvas items
 */
function convertSection(section: Section): CanvasItem[] {
    switch (section.type) {
        case "hero":
            const heroItem = convertHeroSection(section);
            return heroItem ? [heroItem] : [];

        case "about":
            return convertAboutSection(section);

        case "tech-stack":
            const techItem = convertTechStackSection(section);
            return techItem ? [techItem] : [];

        case "github-stats":
            const statsItem = convertGitHubStatsSection(section);
            return statsItem ? [statsItem] : [];

        case "projects":
            const projectsItem = convertProjectsSection(section);
            return projectsItem ? [projectsItem] : [];

        case "socials":
            const socialsItem = convertSocialsSection(section);
            return socialsItem ? [socialsItem] : [];

        case "contributions":
            const contribItem = convertContributionsSection(section);
            return contribItem ? [contribItem] : [];

        case "divider":
            const divItem = convertDividerSection(section);
            return divItem ? [divItem] : [];

        case "spacer":
            const spacerItem = convertSpacerSection(section);
            return spacerItem ? [spacerItem] : [];

        default:
            // For unsupported section types, skip
            return [];
    }
}

/**
 * Convert a full template to a canvas
 */
export function templateToCanvas(template: Template, templateName: string): Canvas {
    // Sort sections by order
    const sortedSections = [...template.sections].sort((a, b) => a.order - b.order);

    // Convert all sections to canvas items
    const items: CanvasItem[] = [];
    for (const section of sortedSections) {
        const converted = convertSection(section);
        items.push(...converted);
    }

    // Create canvas with template metadata
    const canvas: Canvas = {
        id: `canvas-${template.metadata.id}-${Date.now()}`,
        metadata: {
            name: templateName,
            description: `Created from ${template.metadata.name} template`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
        },
        items,
        settings: {
            defaultUsername: "your-github-username",
            theme: "default",
            showPoweredBy: true,
        },
    };

    return canvas;
}

/**
 * Check if a template can be converted
 */
export function canConvertTemplate(template: Template): boolean {
    return template.sections.length > 0;
}
