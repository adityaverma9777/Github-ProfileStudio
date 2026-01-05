/**
 * Template Engine - Block Builders
 *
 * Factory functions for creating IR blocks with proper defaults.
 * These provide type-safe, consistent block creation.
 */

import type {
    Block,
    TextBlock,
    HeadingBlock,
    ParagraphBlock,
    ImageBlock,
    LinkBlock,
    BadgeBlock,
    BadgeGroupBlock,
    ListBlock,
    ListItem,
    SpacerBlock,
    DividerBlock,
    RowBlock,
    ColumnBlock,
    GridBlock,
    StatBlock,
    StatGroupBlock,
    SocialLinkBlock,
    SocialGroupBlock,
    TypingAnimationBlock,
    GitHubStatsCardBlock,
    ContributionGraphBlock,
    ProjectCardBlock,
    ExperienceItemBlock,
    EducationItemBlock,
    AchievementItemBlock,
    QuoteBlock,
    CodeBlock,
    HeadingLevel,
    TextEmphasis,
    BadgeStyle,
    SocialPlatformId,
    GitHubCardType,
    ImageSize,
    ListType,
} from "./types";

import type { HexColor, UrlString, TextAlign } from "@/types";

// ============================================================================
// ID GENERATION
// ============================================================================

let blockIdCounter = 0;

/** Generate unique block ID */
export const generateBlockId = (prefix = "block"): string => {
    blockIdCounter += 1;
    return `${prefix}_${blockIdCounter}_${Date.now().toString(36)}`;
};

/** Reset block ID counter (for testing) */
export const resetBlockIdCounter = (): void => {
    blockIdCounter = 0;
};

// ============================================================================
// TEXT BLOCKS
// ============================================================================

/** Create a text block */
export const text = (
    value: string,
    options: {
        emphasis?: TextEmphasis;
        align?: TextAlign;
        visible?: boolean;
    } = {}
): TextBlock => ({
    id: generateBlockId("text"),
    kind: "text",
    value,
    emphasis: options.emphasis ?? "normal",
    align: options.align,
    visible: options.visible ?? true,
});

/** Create a heading block */
export const heading = (
    value: string,
    level: HeadingLevel = 2,
    options: {
        align?: TextAlign;
        visible?: boolean;
    } = {}
): HeadingBlock => ({
    id: generateBlockId("heading"),
    kind: "heading",
    value,
    level,
    align: options.align,
    visible: options.visible ?? true,
});

/** Create a paragraph block */
export const paragraph = (
    content: ReadonlyArray<TextBlock | LinkBlock>,
    options: {
        align?: TextAlign;
        visible?: boolean;
    } = {}
): ParagraphBlock => ({
    id: generateBlockId("para"),
    kind: "paragraph",
    content,
    align: options.align,
    visible: options.visible ?? true,
});

/** Create a code block */
export const code = (
    value: string,
    options: {
        language?: string;
        inline?: boolean;
        visible?: boolean;
    } = {}
): CodeBlock => ({
    id: generateBlockId("code"),
    kind: "code",
    value,
    language: options.language,
    inline: options.inline ?? false,
    visible: options.visible ?? true,
});

/** Create a quote block */
export const quote = (
    value: string,
    options: {
        author?: string;
        source?: string;
        visible?: boolean;
    } = {}
): QuoteBlock => ({
    id: generateBlockId("quote"),
    kind: "quote",
    value,
    author: options.author,
    source: options.source,
    visible: options.visible ?? true,
});

// ============================================================================
// MEDIA BLOCKS
// ============================================================================

/** Create an image block */
export const image = (
    src: UrlString,
    alt: string,
    options: {
        width?: number;
        height?: number;
        size?: ImageSize;
        align?: TextAlign;
        isAnimated?: boolean;
        visible?: boolean;
    } = {}
): ImageBlock => ({
    id: generateBlockId("img"),
    kind: "image",
    src,
    alt,
    width: options.width,
    height: options.height,
    size: options.size,
    align: options.align,
    isAnimated: options.isAnimated,
    visible: options.visible ?? true,
});

/** Create a link block */
export const link = (
    href: UrlString,
    linkText: string,
    options: {
        title?: string;
        external?: boolean;
        visible?: boolean;
    } = {}
): LinkBlock => ({
    id: generateBlockId("link"),
    kind: "link",
    href,
    text: linkText,
    title: options.title,
    external: options.external ?? true,
    visible: options.visible ?? true,
});

// ============================================================================
// BADGE BLOCKS
// ============================================================================

/** Create a badge block */
export const badge = (
    label: string,
    options: {
        message?: string;
        color?: HexColor;
        labelColor?: HexColor;
        logo?: string;
        logoColor?: HexColor;
        style?: BadgeStyle;
        link?: UrlString;
        visible?: boolean;
    } = {}
): BadgeBlock => ({
    id: generateBlockId("badge"),
    kind: "badge",
    label,
    message: options.message,
    color: options.color ?? ("#0969da" as HexColor),
    labelColor: options.labelColor,
    logo: options.logo,
    logoColor: options.logoColor,
    style: options.style ?? "for-the-badge",
    link: options.link,
    visible: options.visible ?? true,
});

/** Create a badge group */
export const badgeGroup = (
    badges: readonly BadgeBlock[],
    options: {
        align?: TextAlign;
        gap?: "sm" | "md" | "lg";
        visible?: boolean;
    } = {}
): BadgeGroupBlock => ({
    id: generateBlockId("badge-group"),
    kind: "badge-group",
    badges,
    align: options.align ?? "center",
    gap: options.gap ?? "md",
    visible: options.visible ?? true,
});

// ============================================================================
// LIST BLOCKS
// ============================================================================

/** Create a list item */
export const listItem = (
    content: string | Block,
    options: {
        icon?: string;
        nested?: readonly ListItem[];
    } = {}
): ListItem => ({
    content,
    icon: options.icon,
    nested: options.nested,
});

/** Create a list block */
export const list = (
    items: readonly ListItem[],
    options: {
        listType?: ListType;
        visible?: boolean;
    } = {}
): ListBlock => ({
    id: generateBlockId("list"),
    kind: "list",
    items,
    listType: options.listType ?? "unordered",
    visible: options.visible ?? true,
});

// ============================================================================
// LAYOUT BLOCKS
// ============================================================================

/** Create a spacer block */
export const spacer = (
    height: "xs" | "sm" | "md" | "lg" | "xl" = "md",
    options: { visible?: boolean } = {}
): SpacerBlock => ({
    id: generateBlockId("spacer"),
    kind: "spacer",
    height,
    visible: options.visible ?? true,
});

/** Create a divider block */
export const divider = (
    options: {
        style?: "solid" | "dashed" | "dotted" | "gradient" | "wave";
        width?: "25%" | "50%" | "75%" | "100%";
        visible?: boolean;
    } = {}
): DividerBlock => ({
    id: generateBlockId("divider"),
    kind: "divider",
    style: options.style ?? "solid",
    width: options.width ?? "100%",
    visible: options.visible ?? true,
});

/** Create a row block (horizontal layout) */
export const row = (
    children: readonly Block[],
    options: {
        align?: "start" | "center" | "end" | "stretch";
        justify?: "start" | "center" | "end" | "between" | "around";
        gap?: "sm" | "md" | "lg";
        wrap?: boolean;
        visible?: boolean;
    } = {}
): RowBlock => ({
    id: generateBlockId("row"),
    kind: "row",
    children,
    align: options.align ?? "center",
    justify: options.justify ?? "center",
    gap: options.gap ?? "md",
    wrap: options.wrap ?? true,
    visible: options.visible ?? true,
});

/** Create a column block */
export const column = (
    children: readonly Block[],
    options: {
        span?: number;
        visible?: boolean;
    } = {}
): ColumnBlock => ({
    id: generateBlockId("col"),
    kind: "column",
    children,
    span: options.span,
    visible: options.visible ?? true,
});

/** Create a grid block */
export const grid = (
    children: readonly Block[],
    options: {
        columns?: number;
        gap?: "sm" | "md" | "lg";
        visible?: boolean;
    } = {}
): GridBlock => ({
    id: generateBlockId("grid"),
    kind: "grid",
    children,
    columns: options.columns ?? 3,
    gap: options.gap ?? "md",
    visible: options.visible ?? true,
});

// ============================================================================
// STAT BLOCKS
// ============================================================================

/** Create a stat block */
export const stat = (
    label: string,
    value: string | number,
    options: {
        icon?: string;
        color?: HexColor;
        format?: "number" | "percentage" | "currency";
        visible?: boolean;
    } = {}
): StatBlock => ({
    id: generateBlockId("stat"),
    kind: "stat",
    label,
    value,
    icon: options.icon,
    color: options.color,
    format: options.format,
    visible: options.visible ?? true,
});

/** Create a stat group */
export const statGroup = (
    stats: readonly StatBlock[],
    options: {
        layout?: "row" | "grid";
        visible?: boolean;
    } = {}
): StatGroupBlock => ({
    id: generateBlockId("stat-group"),
    kind: "stat-group",
    stats,
    layout: options.layout ?? "row",
    visible: options.visible ?? true,
});

// ============================================================================
// SOCIAL BLOCKS
// ============================================================================

/** Create a social link block */
export const socialLink = (
    platform: SocialPlatformId,
    url: UrlString,
    options: {
        username?: string;
        label?: string;
        showIcon?: boolean;
        showLabel?: boolean;
        visible?: boolean;
    } = {}
): SocialLinkBlock => ({
    id: generateBlockId("social"),
    kind: "social-link",
    platform,
    url,
    username: options.username,
    label: options.label,
    showIcon: options.showIcon ?? true,
    showLabel: options.showLabel ?? true,
    visible: options.visible ?? true,
});

/** Create a social group */
export const socialGroup = (
    links: readonly SocialLinkBlock[],
    options: {
        style?: "icons" | "badges" | "buttons" | "pills";
        align?: TextAlign;
        visible?: boolean;
    } = {}
): SocialGroupBlock => ({
    id: generateBlockId("social-group"),
    kind: "social-group",
    links,
    style: options.style ?? "badges",
    align: options.align ?? "center",
    visible: options.visible ?? true,
});

// ============================================================================
// ANIMATION BLOCKS
// ============================================================================

/** Create a typing animation block */
export const typingAnimation = (
    texts: readonly string[],
    options: {
        speed?: number;
        deleteSpeed?: number;
        pauseTime?: number;
        loop?: boolean;
        visible?: boolean;
    } = {}
): TypingAnimationBlock => ({
    id: generateBlockId("typing"),
    kind: "typing-animation",
    texts,
    speed: options.speed ?? 100,
    deleteSpeed: options.deleteSpeed ?? 50,
    pauseTime: options.pauseTime ?? 2000,
    loop: options.loop ?? true,
    visible: options.visible ?? true,
});

// ============================================================================
// GITHUB BLOCKS
// ============================================================================

/** Create a GitHub stats card block */
export const githubStatsCard = (
    username: string,
    cardType: GitHubCardType,
    options: {
        theme?: string;
        showIcons?: boolean;
        hideBorder?: boolean;
        includeAllCommits?: boolean;
        countPrivate?: boolean;
        visible?: boolean;
    } = {}
): GitHubStatsCardBlock => ({
    id: generateBlockId("gh-stats"),
    kind: "github-stats-card",
    username,
    cardType,
    theme: options.theme ?? "github",
    showIcons: options.showIcons ?? true,
    hideBorder: options.hideBorder ?? false,
    includeAllCommits: options.includeAllCommits ?? true,
    countPrivate: options.countPrivate ?? true,
    visible: options.visible ?? true,
});

/** Create a contribution graph block */
export const contributionGraph = (
    username: string,
    options: {
        theme?: string;
        showLegend?: boolean;
        visible?: boolean;
    } = {}
): ContributionGraphBlock => ({
    id: generateBlockId("contrib"),
    kind: "contribution-graph",
    username,
    theme: options.theme ?? "github",
    showLegend: options.showLegend ?? true,
    visible: options.visible ?? true,
});

// ============================================================================
// CARD BLOCKS
// ============================================================================

/** Create a project card block */
export const projectCard = (
    name: string,
    description: string,
    options: {
        repoUrl?: UrlString;
        demoUrl?: UrlString;
        image?: ImageBlock;
        techStack?: readonly string[];
        stars?: number;
        forks?: number;
        featured?: boolean;
        visible?: boolean;
    } = {}
): ProjectCardBlock => ({
    id: generateBlockId("project"),
    kind: "project-card",
    name,
    description,
    repoUrl: options.repoUrl,
    demoUrl: options.demoUrl,
    image: options.image,
    techStack: options.techStack ?? [],
    stats: {
        stars: options.stars,
        forks: options.forks,
    },
    featured: options.featured ?? false,
    visible: options.visible ?? true,
});

/** Create an experience item block */
export const experienceItem = (
    company: string,
    role: string,
    startDate: string,
    options: {
        endDate?: string;
        location?: string;
        description?: string;
        highlights?: readonly string[];
        technologies?: readonly string[];
        companyLogo?: ImageBlock;
        visible?: boolean;
    } = {}
): ExperienceItemBlock => ({
    id: generateBlockId("exp"),
    kind: "experience-item",
    company,
    role,
    startDate,
    endDate: options.endDate,
    current: options.endDate === undefined,
    location: options.location,
    description: options.description ?? "",
    highlights: options.highlights ?? [],
    technologies: options.technologies ?? [],
    companyLogo: options.companyLogo,
    visible: options.visible ?? true,
});

/** Create an education item block */
export const educationItem = (
    institution: string,
    degree: string,
    startDate: string,
    options: {
        endDate?: string;
        field?: string;
        gpa?: string;
        honors?: readonly string[];
        logo?: ImageBlock;
        visible?: boolean;
    } = {}
): EducationItemBlock => ({
    id: generateBlockId("edu"),
    kind: "education-item",
    institution,
    degree,
    startDate,
    endDate: options.endDate,
    field: options.field,
    gpa: options.gpa,
    honors: options.honors ?? [],
    logo: options.logo,
    visible: options.visible ?? true,
});

/** Create an achievement item block */
export const achievementItem = (
    title: string,
    options: {
        description?: string;
        date?: string;
        issuer?: string;
        icon?: string;
        url?: UrlString;
        visible?: boolean;
    } = {}
): AchievementItemBlock => ({
    id: generateBlockId("achievement"),
    kind: "achievement-item",
    title,
    description: options.description,
    date: options.date,
    issuer: options.issuer,
    icon: options.icon,
    url: options.url,
    visible: options.visible ?? true,
});
