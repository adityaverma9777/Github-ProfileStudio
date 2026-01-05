/**
 * Template Engine - Type Definitions
 *
 * Defines the Intermediate Representation (IR) that the template engine
 * produces. This IR is a structured, typed output that can be consumed
 * by any renderer (markdown, HTML, PDF, etc).
 *
 * Design Principles:
 * - No hardcoded markdown/HTML strings
 * - Deterministic output for same input
 * - Type-safe and exhaustive
 * - Extensible for future block types
 */

import type {
    TemplateId,
    SectionId,
    AssetId,
    HexColor,
    UrlString,
    ColorScheme,
    TextAlign,
    SectionType,
} from "@/types";

// ============================================================================
// RENDER CONTEXT
// ============================================================================

/** Context passed through the rendering pipeline */
export interface RenderContext {
    readonly templateId: TemplateId;
    readonly theme: ColorScheme;
    readonly locale: string;
    readonly timestamp: string;
}

// ============================================================================
// BLOCK KINDS
// ============================================================================

/** All possible block kinds in the IR */
export type BlockKind =
    | "text"
    | "heading"
    | "paragraph"
    | "image"
    | "badge"
    | "badge-group"
    | "link"
    | "list"
    | "grid"
    | "row"
    | "column"
    | "spacer"
    | "divider"
    | "code"
    | "quote"
    | "card"
    | "stat"
    | "stat-group"
    | "social-link"
    | "social-group"
    | "typing-animation"
    | "github-stats-card"
    | "contribution-graph"
    | "project-card"
    | "experience-item"
    | "education-item"
    | "achievement-item"
    | "custom";

// ============================================================================
// BASE BLOCK
// ============================================================================

/** Base interface for all blocks */
interface BlockBase {
    readonly id: string;
    readonly kind: BlockKind;
    readonly visible: boolean;
    readonly metadata?: Record<string, unknown>;
}

// ============================================================================
// TEXT BLOCKS
// ============================================================================

/** Text emphasis/styling */
export type TextEmphasis = "normal" | "bold" | "italic" | "code" | "strikethrough";

/** Heading level */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Plain text block */
export interface TextBlock extends BlockBase {
    readonly kind: "text";
    readonly value: string;
    readonly emphasis: TextEmphasis;
    readonly align?: TextAlign;
}

/** Heading block */
export interface HeadingBlock extends BlockBase {
    readonly kind: "heading";
    readonly value: string;
    readonly level: HeadingLevel;
    readonly align?: TextAlign;
}

/** Paragraph block */
export interface ParagraphBlock extends BlockBase {
    readonly kind: "paragraph";
    readonly content: ReadonlyArray<TextBlock | LinkBlock>;
    readonly align?: TextAlign;
}

/** Code block */
export interface CodeBlock extends BlockBase {
    readonly kind: "code";
    readonly value: string;
    readonly language?: string;
    readonly inline: boolean;
}

/** Quote block */
export interface QuoteBlock extends BlockBase {
    readonly kind: "quote";
    readonly value: string;
    readonly author?: string;
    readonly source?: string;
}

// ============================================================================
// MEDIA BLOCKS
// ============================================================================

/** Image sizing */
export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";

/** Image block */
export interface ImageBlock extends BlockBase {
    readonly kind: "image";
    readonly src: UrlString;
    readonly alt: string;
    readonly width?: number;
    readonly height?: number;
    readonly size?: ImageSize;
    readonly align?: TextAlign;
    readonly isAnimated?: boolean;
    readonly assetId?: AssetId;
}

// ============================================================================
// LINK BLOCKS
// ============================================================================

/** Link block */
export interface LinkBlock extends BlockBase {
    readonly kind: "link";
    readonly href: UrlString;
    readonly text: string;
    readonly title?: string;
    readonly external?: boolean;
}

// ============================================================================
// BADGE BLOCKS
// ============================================================================

/** Badge style */
export type BadgeStyle = "flat" | "flat-square" | "plastic" | "for-the-badge" | "social";

/** Single badge */
export interface BadgeBlock extends BlockBase {
    readonly kind: "badge";
    readonly label: string;
    readonly message?: string;
    readonly color: HexColor;
    readonly labelColor?: HexColor;
    readonly logoColor?: HexColor;
    readonly logo?: string;
    readonly style: BadgeStyle;
    readonly link?: UrlString;
}

/** Group of badges */
export interface BadgeGroupBlock extends BlockBase {
    readonly kind: "badge-group";
    readonly badges: readonly BadgeBlock[];
    readonly align?: TextAlign;
    readonly gap?: "sm" | "md" | "lg";
}

// ============================================================================
// LIST BLOCKS
// ============================================================================

/** List type */
export type ListType = "unordered" | "ordered" | "none";

/** List item */
export interface ListItem {
    readonly content: string | Block;
    readonly icon?: string;
    readonly nested?: readonly ListItem[];
}

/** List block */
export interface ListBlock extends BlockBase {
    readonly kind: "list";
    readonly items: readonly ListItem[];
    readonly listType: ListType;
}

// ============================================================================
// LAYOUT BLOCKS
// ============================================================================

/** Spacer block */
export interface SpacerBlock extends BlockBase {
    readonly kind: "spacer";
    readonly height: "xs" | "sm" | "md" | "lg" | "xl";
}

/** Divider block */
export interface DividerBlock extends BlockBase {
    readonly kind: "divider";
    readonly style: "solid" | "dashed" | "dotted" | "gradient" | "wave";
    readonly width: "25%" | "50%" | "75%" | "100%";
}

/** Row container (horizontal layout) */
export interface RowBlock extends BlockBase {
    readonly kind: "row";
    readonly children: readonly Block[];
    readonly align?: "start" | "center" | "end" | "stretch";
    readonly justify?: "start" | "center" | "end" | "between" | "around";
    readonly gap?: "sm" | "md" | "lg";
    readonly wrap?: boolean;
}

/** Column container */
export interface ColumnBlock extends BlockBase {
    readonly kind: "column";
    readonly children: readonly Block[];
    readonly span?: number;
}

/** Grid container */
export interface GridBlock extends BlockBase {
    readonly kind: "grid";
    readonly children: readonly Block[];
    readonly columns: number;
    readonly gap?: "sm" | "md" | "lg";
}

// ============================================================================
// STAT BLOCKS
// ============================================================================

/** Single statistic */
export interface StatBlock extends BlockBase {
    readonly kind: "stat";
    readonly label: string;
    readonly value: string | number;
    readonly icon?: string;
    readonly color?: HexColor;
    readonly format?: "number" | "percentage" | "currency";
}

/** Group of statistics */
export interface StatGroupBlock extends BlockBase {
    readonly kind: "stat-group";
    readonly stats: readonly StatBlock[];
    readonly layout: "row" | "grid";
}

// ============================================================================
// SOCIAL BLOCKS
// ============================================================================

/** Platform identifier */
export type SocialPlatformId =
    | "github"
    | "twitter"
    | "linkedin"
    | "instagram"
    | "youtube"
    | "twitch"
    | "discord"
    | "email"
    | "website"
    | "other";

/** Social link */
export interface SocialLinkBlock extends BlockBase {
    readonly kind: "social-link";
    readonly platform: SocialPlatformId;
    readonly url: UrlString;
    readonly username?: string;
    readonly label?: string;
    readonly showIcon: boolean;
    readonly showLabel: boolean;
}

/** Group of social links */
export interface SocialGroupBlock extends BlockBase {
    readonly kind: "social-group";
    readonly links: readonly SocialLinkBlock[];
    readonly style: "icons" | "badges" | "buttons" | "pills";
    readonly align?: TextAlign;
}

// ============================================================================
// ANIMATION BLOCKS
// ============================================================================

/** Typing animation effect */
export interface TypingAnimationBlock extends BlockBase {
    readonly kind: "typing-animation";
    readonly texts: readonly string[];
    readonly speed: number;
    readonly deleteSpeed: number;
    readonly pauseTime: number;
    readonly loop: boolean;
}

// ============================================================================
// GITHUB INTEGRATION BLOCKS
// ============================================================================

/** GitHub stats card type */
export type GitHubCardType =
    | "stats"
    | "top-langs"
    | "streak"
    | "trophies"
    | "activity-graph"
    | "profile-summary";

/** GitHub stats card */
export interface GitHubStatsCardBlock extends BlockBase {
    readonly kind: "github-stats-card";
    readonly username: string;
    readonly cardType: GitHubCardType;
    readonly theme: string;
    readonly showIcons: boolean;
    readonly hideBorder: boolean;
    readonly includeAllCommits: boolean;
    readonly countPrivate: boolean;
}

/** Contribution graph */
export interface ContributionGraphBlock extends BlockBase {
    readonly kind: "contribution-graph";
    readonly username: string;
    readonly theme: string;
    readonly showLegend: boolean;
}

// ============================================================================
// CARD BLOCKS
// ============================================================================

/** Generic card block */
export interface CardBlock extends BlockBase {
    readonly kind: "card";
    readonly title: string;
    readonly subtitle?: string;
    readonly description?: string;
    readonly image?: ImageBlock;
    readonly badges?: readonly BadgeBlock[];
    readonly links?: readonly LinkBlock[];
    readonly footer?: readonly Block[];
}

/** Project card */
export interface ProjectCardBlock extends BlockBase {
    readonly kind: "project-card";
    readonly name: string;
    readonly description: string;
    readonly repoUrl?: UrlString;
    readonly demoUrl?: UrlString;
    readonly image?: ImageBlock;
    readonly techStack: readonly string[];
    readonly stats: {
        readonly stars?: number;
        readonly forks?: number;
    };
    readonly featured: boolean;
}

/** Experience item */
export interface ExperienceItemBlock extends BlockBase {
    readonly kind: "experience-item";
    readonly company: string;
    readonly role: string;
    readonly location?: string;
    readonly startDate: string;
    readonly endDate?: string;
    readonly current: boolean;
    readonly description: string;
    readonly highlights: readonly string[];
    readonly technologies: readonly string[];
    readonly companyLogo?: ImageBlock;
}

/** Education item */
export interface EducationItemBlock extends BlockBase {
    readonly kind: "education-item";
    readonly institution: string;
    readonly degree: string;
    readonly field?: string;
    readonly startDate: string;
    readonly endDate?: string;
    readonly gpa?: string;
    readonly honors: readonly string[];
    readonly logo?: ImageBlock;
}

/** Achievement item */
export interface AchievementItemBlock extends BlockBase {
    readonly kind: "achievement-item";
    readonly title: string;
    readonly description?: string;
    readonly date?: string;
    readonly issuer?: string;
    readonly icon?: string;
    readonly url?: UrlString;
}

// ============================================================================
// CUSTOM BLOCK
// ============================================================================

/** Custom/escape hatch block */
export interface CustomBlock extends BlockBase {
    readonly kind: "custom";
    readonly customType: string;
    readonly data: Record<string, unknown>;
}

// ============================================================================
// BLOCK UNION TYPE
// ============================================================================

/** Discriminated union of all block types */
export type Block =
    | TextBlock
    | HeadingBlock
    | ParagraphBlock
    | CodeBlock
    | QuoteBlock
    | ImageBlock
    | LinkBlock
    | BadgeBlock
    | BadgeGroupBlock
    | ListBlock
    | SpacerBlock
    | DividerBlock
    | RowBlock
    | ColumnBlock
    | GridBlock
    | StatBlock
    | StatGroupBlock
    | SocialLinkBlock
    | SocialGroupBlock
    | TypingAnimationBlock
    | GitHubStatsCardBlock
    | ContributionGraphBlock
    | CardBlock
    | ProjectCardBlock
    | ExperienceItemBlock
    | EducationItemBlock
    | AchievementItemBlock
    | CustomBlock;

// ============================================================================
// SECTION IR
// ============================================================================

/** Rendered section in IR form */
export interface RenderedSection {
    readonly id: SectionId;
    readonly type: SectionType;
    readonly title?: string;
    readonly blocks: readonly Block[];
    readonly visible: boolean;
    readonly order: number;
}

// ============================================================================
// RENDER OUTPUT
// ============================================================================

/** Complete render output from the template engine */
export interface RenderOutput {
    readonly context: RenderContext;
    readonly sections: readonly RenderedSection[];
    readonly metadata: RenderMetadata;
}

/** Metadata about the render process */
export interface RenderMetadata {
    readonly templateId: TemplateId;
    readonly templateName: string;
    readonly templateVersion: string;
    readonly sectionsRendered: number;
    readonly sectionsSkipped: number;
    readonly warnings: readonly RenderWarning[];
    readonly renderTime: number; // milliseconds
}

/** Non-fatal warning during render */
export interface RenderWarning {
    readonly code: string;
    readonly message: string;
    readonly sectionId?: SectionId;
    readonly details?: Record<string, unknown>;
}

// ============================================================================
// BLOCK BUILDERS (Utility types for creating blocks)
// ============================================================================

/** Input for creating a text block */
export type TextBlockInput = Omit<TextBlock, "id" | "kind" | "visible">;

/** Input for creating a heading block */
export type HeadingBlockInput = Omit<HeadingBlock, "id" | "kind" | "visible">;

/** Input for creating an image block */
export type ImageBlockInput = Omit<ImageBlock, "id" | "kind" | "visible">;

/** Generic block input type */
export type BlockInput<T extends Block> = Omit<T, "id" | "kind" | "visible">;
