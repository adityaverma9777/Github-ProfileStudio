/**
 * Canvas Library - Component Defaults
 * 
 * Default props for each canvas component type.
 * Uses realistic content seeded from template personas.
 */

import type {
    CanvasItemType,
    TypingHeroItem,
    StaticHeroItem,
    TextBlockItem,
    HeadingItem,
    ImageItem,
    GifItem,
    BadgeGroupItem,
    TechStackItem,
    ProjectsListItem,
    GitHubStatsItem,
    ContributionSnakeItem,
    SocialLinksItem,
    SpacerItem,
    DividerItem,
    generateItemId,
} from "../types";

import {
    Keyboard,
    FileText,
    Heading,
    AlignLeft,
    Image,
    Film,
    Tags,
    Wrench,
    FolderOpen,
    BarChart2,
    GitGraph,
    Link,
    MoveVertical,
    Minus,
    type LucideIcon,
} from "lucide-react";

// Re-export generateItemId for convenience
export { generateItemId } from "../types";

/** Lucide icon mapping for each component type (used in UI only) */
export const COMPONENT_ICONS: Record<CanvasItemType, LucideIcon> = {
    "typing-hero": Keyboard,
    "static-hero": FileText,
    "heading": Heading,
    "text-block": AlignLeft,
    "image": Image,
    "gif": Film,
    "badge-group": Tags,
    "tech-stack": Wrench,
    "projects-list": FolderOpen,
    "github-stats": BarChart2,
    "contribution-snake": GitGraph,
    "social-links": Link,
    "spacer": MoveVertical,
    "divider": Minus,
};

/** Default typing hero props */
export const DEFAULT_TYPING_HERO: TypingHeroItem["props"] = {
    lines: [
        "Welcome to my GitHub Profile! 👋",
        "I'm a Full Stack Developer",
        "Open Source Enthusiast",
        "Always learning new things",
    ],
    center: true,
    color: "36BCF7",
    size: 24,
    pause: 1000,
};

/** Default static hero props */
export const DEFAULT_STATIC_HERO: StaticHeroItem["props"] = {
    headline: "Hi there! 👋 I'm Your Name",
    subheadline: "Full Stack Developer | Open Source Contributor",
    align: "center",
};

/** Default text block props */
export const DEFAULT_TEXT_BLOCK: TextBlockItem["props"] = {
    content: "Passionate software developer with experience in building scalable web applications. I love contributing to open source and sharing knowledge with the community.",
    align: "left",
};

/** Default heading props */
export const DEFAULT_HEADING: HeadingItem["props"] = {
    text: "About Me",
    level: 2,
    align: "left",
};

/** Default image props */
export const DEFAULT_IMAGE: ImageItem["props"] = {
    src: "https://via.placeholder.com/400x200",
    alt: "Image description",
    width: 400,
    align: "center",
};

/** Default GIF props */
export const DEFAULT_GIF: GifItem["props"] = {
    src: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif",
    alt: "Coding animation",
    width: 300,
    align: "center",
};

/** Default badge group props */
export const DEFAULT_BADGE_GROUP: BadgeGroupItem["props"] = {
    badges: [
        { label: "TypeScript", message: "Expert", color: "3178C6", logo: "typescript", style: "for-the-badge" },
        { label: "React", message: "Advanced", color: "61DAFB", logo: "react", style: "for-the-badge" },
        { label: "Node.js", message: "Advanced", color: "339933", logo: "nodedotjs", style: "for-the-badge" },
    ],
    align: "center",
};

/** Default tech stack props */
export const DEFAULT_TECH_STACK: TechStackItem["props"] = {
    title: "Tech Stack",
    items: [
        { name: "TypeScript", category: "language" },
        { name: "JavaScript", category: "language" },
        { name: "Python", category: "language" },
        { name: "React", category: "frontend" },
        { name: "Next.js", category: "frontend" },
        { name: "Node.js", category: "backend" },
        { name: "PostgreSQL", category: "database" },
        { name: "Docker", category: "devops" },
        { name: "AWS", category: "cloud" },
        { name: "Git", category: "tools" },
    ],
    displayStyle: "badges",
    badgeStyle: "for-the-badge",
    groupByCategory: true,
};

/** Default projects list props */
export const DEFAULT_PROJECTS_LIST: ProjectsListItem["props"] = {
    title: "Featured Projects",
    projects: [
        {
            name: "Awesome Project",
            description: "A full-stack web application built with React and Node.js",
            repoUrl: "https://github.com/username/awesome-project",
            demoUrl: "https://awesome-project.demo.com",
            techStack: ["React", "Node.js", "PostgreSQL"],
            stars: 150,
            forks: 25,
        },
        {
            name: "CLI Tool",
            description: "A command-line interface tool for developers",
            repoUrl: "https://github.com/username/cli-tool",
            techStack: ["TypeScript", "Commander.js"],
            stars: 80,
            forks: 12,
        },
    ],
    displayStyle: "cards",
    maxProjects: 3,
};

/** Default GitHub stats props */
export const DEFAULT_GITHUB_STATS: GitHubStatsItem["props"] = {
    username: "your-github-username",
    showStats: true,
    showTopLangs: true,
    showStreak: true,
    showTrophies: false,
    theme: "radical",
    layout: "row",
};

/** Default contribution snake props */
export const DEFAULT_CONTRIBUTION_SNAKE: ContributionSnakeItem["props"] = {
    username: "your-github-username",
    variant: "dark",
};

/** Default social links props */
export const DEFAULT_SOCIAL_LINKS: SocialLinksItem["props"] = {
    title: "Connect With Me",
    links: [
        { platform: "github", url: "https://github.com/username", label: "GitHub" },
        { platform: "linkedin", url: "https://linkedin.com/in/username", label: "LinkedIn" },
        { platform: "twitter", url: "https://twitter.com/username", label: "Twitter" },
        { platform: "email", url: "mailto:hello@example.com", label: "Email" },
    ],
    displayStyle: "badges",
    align: "center",
};

/** Default spacer props */
export const DEFAULT_SPACER: SpacerItem["props"] = {
    height: "md",
};

/** Default divider props */
export const DEFAULT_DIVIDER: DividerItem["props"] = {
    style: "line",
    width: "full",
};

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/** Create a new canvas item with default props */
export function createDefaultItem<T extends CanvasItemType>(type: T): Extract<
    TypingHeroItem | StaticHeroItem | TextBlockItem | HeadingItem | ImageItem |
    GifItem | BadgeGroupItem | TechStackItem | ProjectsListItem | GitHubStatsItem |
    ContributionSnakeItem | SocialLinksItem | SpacerItem | DividerItem,
    { type: T }
> {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const defaults: Record<CanvasItemType, object> = {
        "typing-hero": DEFAULT_TYPING_HERO,
        "static-hero": DEFAULT_STATIC_HERO,
        "text-block": DEFAULT_TEXT_BLOCK,
        "heading": DEFAULT_HEADING,
        "image": DEFAULT_IMAGE,
        "gif": DEFAULT_GIF,
        "badge-group": DEFAULT_BADGE_GROUP,
        "tech-stack": DEFAULT_TECH_STACK,
        "projects-list": DEFAULT_PROJECTS_LIST,
        "github-stats": DEFAULT_GITHUB_STATS,
        "contribution-snake": DEFAULT_CONTRIBUTION_SNAKE,
        "social-links": DEFAULT_SOCIAL_LINKS,
        "spacer": DEFAULT_SPACER,
        "divider": DEFAULT_DIVIDER,
    };

    return {
        type,
        id,
        props: { ...defaults[type] },
    } as ReturnType<typeof createDefaultItem<T>>;
}

/** Component metadata for Toolbox display */
export interface ComponentMeta {
    readonly type: CanvasItemType;
    readonly name: string;
    readonly description: string;
    readonly icon: string;
    readonly category: "hero" | "content" | "data" | "social" | "layout";
}

/** All component metadata for the toolbox */
export const COMPONENT_LIBRARY: readonly ComponentMeta[] = [
    // Hero components
    { type: "typing-hero", name: "Typing Hero", description: "Animated typing text header", icon: "⌨️", category: "hero" },
    { type: "static-hero", name: "Static Hero", description: "Headline and subheading", icon: "📝", category: "hero" },

    // Content components
    { type: "heading", name: "Heading", description: "Section heading (H1-H6)", icon: "🔤", category: "content" },
    { type: "text-block", name: "Text Block", description: "Paragraph of text", icon: "📄", category: "content" },
    { type: "image", name: "Image", description: "Static image from URL", icon: "🖼️", category: "content" },
    { type: "gif", name: "GIF", description: "Animated GIF from URL", icon: "🎞️", category: "content" },
    { type: "badge-group", name: "Badge Group", description: "Shields.io badges", icon: "🏷️", category: "content" },

    // Data components
    { type: "tech-stack", name: "Tech Stack", description: "Skills and technologies", icon: "🛠️", category: "data" },
    { type: "projects-list", name: "Projects", description: "Featured project cards", icon: "📁", category: "data" },
    { type: "github-stats", name: "GitHub Stats", description: "Stats, langs, streak cards", icon: "📊", category: "data" },
    { type: "contribution-snake", name: "Snake Graph", description: "Contribution snake animation", icon: "🐍", category: "data" },

    // Social components
    { type: "social-links", name: "Social Links", description: "Social media links", icon: "🔗", category: "social" },

    // Layout components
    { type: "spacer", name: "Spacer", description: "Vertical spacing", icon: "↕️", category: "layout" },
    { type: "divider", name: "Divider", description: "Horizontal line", icon: "➖", category: "layout" },
] as const;

/** Get components by category */
export function getComponentsByCategory(category: ComponentMeta["category"]): readonly ComponentMeta[] {
    return COMPONENT_LIBRARY.filter((c) => c.category === category);
}
