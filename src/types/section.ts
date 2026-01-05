/**
 * Section System Type Definitions
 *
 * Defines all section types using discriminated unions
 * Each section has required data, optional configuration, and render intent
 */

import type {
    SectionId,
    HexColor,
    UrlString,
    GitHubUsername,
    TextAlign,
    SpacingToken,
    BorderRadiusToken,
    FlexAlign,
    FlexJustify,
    VisibilityCondition,
    GridSpan,
    ColorScheme,
} from "./common";

import type { Asset, AssetTemplate, GitHubStatsCardTemplate } from "./asset";

// ============================================================================
// SECTION BASE
// ============================================================================

/** Section type discriminator */
export type SectionType =
    | "hero"
    | "about"
    | "tech-stack"
    | "github-stats"
    | "projects"
    | "experience"
    | "education"
    | "achievements"
    | "blog-posts"
    | "contact"
    | "socials"
    | "custom-markdown"
    | "custom-html"
    | "divider"
    | "spacer"
    | "quote"
    | "spotify"
    | "wakatime"
    | "contributions"
    | "pinned-repos";

/** Base configuration shared by all sections */
export interface SectionBaseConfig {
    readonly visibility: VisibilityCondition;
    readonly spacing: {
        readonly top: SpacingToken;
        readonly bottom: SpacingToken;
    };
    readonly alignment: TextAlign;
    readonly maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

/** Default section configuration */
export const DEFAULT_SECTION_CONFIG: SectionBaseConfig = {
    visibility: {
        showOnMobile: true,
        showOnTablet: true,
        showOnDesktop: true,
    },
    spacing: {
        top: "4",
        bottom: "4",
    },
    alignment: "center",
    maxWidth: "lg",
} as const;

/** Base interface for all sections */
interface SectionBase {
    readonly id: SectionId;
    readonly type: SectionType;
    readonly enabled: boolean;
    readonly order: number;
    readonly title?: string;
    readonly config: SectionBaseConfig;
}

// ============================================================================
// HERO SECTION
// ============================================================================

/** Hero layout variants */
export type HeroLayout =
    | "centered"
    | "left-aligned"
    | "right-aligned"
    | "split"
    | "minimal"
    | "animated";

/** Hero section data */
export interface HeroSectionData {
    readonly headline: string;
    readonly subheadline?: string;
    readonly tagline?: string;
    readonly typingTexts?: readonly string[]; // For typing animation effect
    readonly asset?: Asset | AssetTemplate;
    readonly backgroundAsset?: Asset;
    readonly showWaveAnimation?: boolean;
    readonly showParticles?: boolean;
}

/** Hero section configuration */
export interface HeroSectionConfig extends SectionBaseConfig {
    readonly layout: HeroLayout;
    readonly headlineSize: "sm" | "md" | "lg" | "xl" | "2xl";
    readonly animateOnLoad: boolean;
    readonly typingSpeed?: number; // ms per character
    readonly typingDeleteSpeed?: number;
    readonly typingPauseTime?: number;
}

/** Hero section definition */
export interface HeroSection extends SectionBase {
    readonly type: "hero";
    readonly data: HeroSectionData;
    readonly config: HeroSectionConfig;
}

// ============================================================================
// ABOUT SECTION
// ============================================================================

/** About section data */
export interface AboutSectionData {
    readonly content: string; // Main about text
    readonly highlights?: readonly string[]; // Key points/bullets
    readonly currentFocus?: string;
    readonly funFact?: string;
    readonly location?: string;
    readonly pronouns?: string;
    readonly avatar?: Asset;
}

/** About section configuration */
export interface AboutSectionConfig extends SectionBaseConfig {
    readonly showAvatar: boolean;
    readonly avatarPosition: "left" | "right" | "top";
    readonly avatarSize: "sm" | "md" | "lg";
    readonly showHighlightsAsBullets: boolean;
    readonly highlightIcon?: string;
}

/** About section definition */
export interface AboutSection extends SectionBase {
    readonly type: "about";
    readonly data: AboutSectionData;
    readonly config: AboutSectionConfig;
}

// ============================================================================
// TECH STACK SECTION
// ============================================================================

/** Technology category */
export type TechCategory =
    | "language"
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "cloud"
    | "mobile"
    | "testing"
    | "tools"
    | "other";

/** Individual technology item */
export interface TechStackItem {
    readonly name: string;
    readonly category: TechCategory;
    readonly icon?: Asset | string; // Asset or icon name
    readonly proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
    readonly yearsOfExperience?: number;
    readonly url?: UrlString;
    readonly featured?: boolean;
}

/** Tech stack section data */
export interface TechStackSectionData {
    readonly items: readonly TechStackItem[];
    readonly groupByCategory: boolean;
}

/** Tech stack display style */
export type TechStackDisplayStyle =
    | "badges" // Shield.io style badges
    | "icons" // Icon grid
    | "cards" // Card with icon and name
    | "list" // Simple list
    | "table"; // Table with details

/** Tech stack section configuration */
export interface TechStackSectionConfig extends SectionBaseConfig {
    readonly displayStyle: TechStackDisplayStyle;
    readonly columns: 2 | 3 | 4 | 5 | 6;
    readonly showProficiency: boolean;
    readonly showCategoryHeaders: boolean;
    readonly iconSize: "sm" | "md" | "lg";
    readonly badgeStyle?: "flat" | "flat-square" | "for-the-badge" | "plastic";
    readonly animateOnHover: boolean;
}

/** Tech stack section definition */
export interface TechStackSection extends SectionBase {
    readonly type: "tech-stack";
    readonly data: TechStackSectionData;
    readonly config: TechStackSectionConfig;
}

// ============================================================================
// GITHUB STATS SECTION
// ============================================================================

/** GitHub stats card types */
export type GitHubStatsCardType =
    | "stats" // General stats card
    | "top-langs" // Most used languages
    | "streak" // Contribution streak
    | "trophies" // GitHub trophies
    | "activity-graph" // Contribution activity graph
    | "profile-summary"; // Profile summary cards

/** GitHub stats section data */
export interface GitHubStatsSectionData {
    readonly username: GitHubUsername;
    readonly cards: readonly GitHubStatsCardType[];
    readonly customStats?: readonly GitHubStatsCardTemplate[];
}

/** GitHub stats section configuration */
export interface GitHubStatsSectionConfig extends SectionBaseConfig {
    readonly theme: ColorScheme | "github" | "github-dark" | "radical" | "tokyonight";
    readonly showIcons: boolean;
    readonly includeAllCommits: boolean;
    readonly countPrivateContributions: boolean;
    readonly hideBorder: boolean;
    readonly cardLayout: "row" | "column" | "grid";
    readonly cardSize: "sm" | "md" | "lg";
}

/** GitHub stats section definition */
export interface GitHubStatsSection extends SectionBase {
    readonly type: "github-stats";
    readonly data: GitHubStatsSectionData;
    readonly config: GitHubStatsSectionConfig;
}

// ============================================================================
// PROJECTS SECTION
// ============================================================================

/** Project status */
export type ProjectStatus =
    | "active"
    | "completed"
    | "archived"
    | "on-hold"
    | "coming-soon";

/** Individual project item */
export interface ProjectItem {
    readonly name: string;
    readonly description: string;
    readonly url?: UrlString;
    readonly repoUrl?: UrlString;
    readonly demoUrl?: UrlString;
    readonly image?: Asset;
    readonly techStack: readonly string[];
    readonly status: ProjectStatus;
    readonly featured: boolean;
    readonly stars?: number;
    readonly forks?: number;
}

/** Projects section data */
export interface ProjectsSectionData {
    readonly items: readonly ProjectItem[];
    readonly showFeaturedOnly: boolean;
}

/** Projects display style */
export type ProjectsDisplayStyle =
    | "cards"
    | "list"
    | "grid"
    | "compact"
    | "showcase";

/** Projects section configuration */
export interface ProjectsSectionConfig extends SectionBaseConfig {
    readonly displayStyle: ProjectsDisplayStyle;
    readonly columns: 1 | 2 | 3;
    readonly showTechStack: boolean;
    readonly showStatus: boolean;
    readonly showStats: boolean;
    readonly showImage: boolean;
    readonly imagePosition: "top" | "left" | "right" | "background";
    readonly maxProjects?: number;
}

/** Projects section definition */
export interface ProjectsSection extends SectionBase {
    readonly type: "projects";
    readonly data: ProjectsSectionData;
    readonly config: ProjectsSectionConfig;
}

// ============================================================================
// EXPERIENCE SECTION
// ============================================================================

/** Experience item */
export interface ExperienceItem {
    readonly company: string;
    readonly role: string;
    readonly location?: string;
    readonly startDate: string;
    readonly endDate?: string; // undefined = current
    readonly description: string;
    readonly highlights?: readonly string[];
    readonly companyLogo?: Asset;
    readonly companyUrl?: UrlString;
    readonly technologies?: readonly string[];
}

/** Experience section data */
export interface ExperienceSectionData {
    readonly items: readonly ExperienceItem[];
}

/** Experience section configuration */
export interface ExperienceSectionConfig extends SectionBaseConfig {
    readonly displayStyle: "timeline" | "cards" | "list";
    readonly showCompanyLogo: boolean;
    readonly showTechnologies: boolean;
    readonly dateFormat: "short" | "long" | "relative";
}

/** Experience section definition */
export interface ExperienceSection extends SectionBase {
    readonly type: "experience";
    readonly data: ExperienceSectionData;
    readonly config: ExperienceSectionConfig;
}

// ============================================================================
// EDUCATION SECTION
// ============================================================================

/** Education item */
export interface EducationItem {
    readonly institution: string;
    readonly degree: string;
    readonly field?: string;
    readonly startDate: string;
    readonly endDate?: string;
    readonly gpa?: string;
    readonly honors?: readonly string[];
    readonly logo?: Asset;
    readonly url?: UrlString;
}

/** Education section data */
export interface EducationSectionData {
    readonly items: readonly EducationItem[];
}

/** Education section configuration */
export interface EducationSectionConfig extends SectionBaseConfig {
    readonly displayStyle: "timeline" | "cards" | "list";
    readonly showLogo: boolean;
    readonly showGpa: boolean;
}

/** Education section definition */
export interface EducationSection extends SectionBase {
    readonly type: "education";
    readonly data: EducationSectionData;
    readonly config: EducationSectionConfig;
}

// ============================================================================
// ACHIEVEMENTS SECTION
// ============================================================================

/** Achievement item */
export interface AchievementItem {
    readonly title: string;
    readonly description?: string;
    readonly date?: string;
    readonly issuer?: string;
    readonly icon?: Asset | string;
    readonly url?: UrlString;
    readonly featured?: boolean;
}

/** Achievements section data */
export interface AchievementsSectionData {
    readonly items: readonly AchievementItem[];
}

/** Achievements section configuration */
export interface AchievementsSectionConfig extends SectionBaseConfig {
    readonly displayStyle: "grid" | "list" | "badges";
    readonly columns: 2 | 3 | 4;
    readonly showDate: boolean;
    readonly showIssuer: boolean;
}

/** Achievements section definition */
export interface AchievementsSection extends SectionBase {
    readonly type: "achievements";
    readonly data: AchievementsSectionData;
    readonly config: AchievementsSectionConfig;
}

// ============================================================================
// BLOG POSTS SECTION
// ============================================================================

/** Blog post item */
export interface BlogPostItem {
    readonly title: string;
    readonly url: UrlString;
    readonly date?: string;
    readonly excerpt?: string;
    readonly image?: Asset;
    readonly platform?: "dev.to" | "medium" | "hashnode" | "personal" | "other";
    readonly readTime?: number; // minutes
    readonly likes?: number;
}

/** Blog posts section data */
export interface BlogPostsSectionData {
    readonly items: readonly BlogPostItem[];
    readonly feedUrl?: UrlString; // RSS feed for auto-update
    readonly maxPosts?: number;
}

/** Blog posts section configuration */
export interface BlogPostsSectionConfig extends SectionBaseConfig {
    readonly displayStyle: "cards" | "list" | "compact";
    readonly showExcerpt: boolean;
    readonly showDate: boolean;
    readonly showImage: boolean;
    readonly showReadTime: boolean;
    readonly showPlatformIcon: boolean;
}

/** Blog posts section definition */
export interface BlogPostsSection extends SectionBase {
    readonly type: "blog-posts";
    readonly data: BlogPostsSectionData;
    readonly config: BlogPostsSectionConfig;
}

// ============================================================================
// CONTACT SECTION
// ============================================================================

/** Contact method */
export interface ContactMethod {
    readonly type: "email" | "phone" | "form" | "calendly" | "other";
    readonly value: string;
    readonly label?: string;
    readonly primary?: boolean;
}

/** Contact section data */
export interface ContactSectionData {
    readonly headline?: string;
    readonly description?: string;
    readonly methods: readonly ContactMethod[];
    readonly formEndpoint?: UrlString;
    readonly calendlyUrl?: UrlString;
}

/** Contact section configuration */
export interface ContactSectionConfig extends SectionBaseConfig {
    readonly displayStyle: "card" | "minimal" | "split";
    readonly showForm: boolean;
    readonly showCalendly: boolean;
    readonly buttonText: string;
    readonly buttonStyle: "primary" | "secondary" | "outline";
}

/** Contact section definition */
export interface ContactSection extends SectionBase {
    readonly type: "contact";
    readonly data: ContactSectionData;
    readonly config: ContactSectionConfig;
}

// ============================================================================
// SOCIALS SECTION
// ============================================================================

/** Social platform types */
export type SocialPlatform =
    | "github"
    | "twitter"
    | "linkedin"
    | "instagram"
    | "youtube"
    | "twitch"
    | "discord"
    | "mastodon"
    | "reddit"
    | "stackoverflow"
    | "codepen"
    | "dribbble"
    | "behance"
    | "figma"
    | "medium"
    | "dev.to"
    | "hashnode"
    | "kaggle"
    | "leetcode"
    | "hackerrank"
    | "email"
    | "website"
    | "other";

/** Social link item */
export interface SocialLink {
    readonly platform: SocialPlatform;
    readonly url: UrlString;
    readonly username?: string;
    readonly label?: string;
    readonly icon?: Asset | string;
}

/** Socials section data */
export interface SocialsSectionData {
    readonly links: readonly SocialLink[];
}

/** Socials display style */
export type SocialsDisplayStyle =
    | "icons"
    | "badges"
    | "buttons"
    | "pills"
    | "minimal";

/** Socials section configuration */
export interface SocialsSectionConfig extends SectionBaseConfig {
    readonly displayStyle: SocialsDisplayStyle;
    readonly iconSize: "sm" | "md" | "lg";
    readonly showLabels: boolean;
    readonly colorMode: "brand" | "monochrome" | "custom";
    readonly customColor?: HexColor;
    readonly hoverEffect: "scale" | "lift" | "glow" | "none";
}

/** Socials section definition */
export interface SocialsSection extends SectionBase {
    readonly type: "socials";
    readonly data: SocialsSectionData;
    readonly config: SocialsSectionConfig;
}

// ============================================================================
// UTILITY SECTIONS
// ============================================================================

/** Quote section data */
export interface QuoteSectionData {
    readonly quote: string;
    readonly author?: string;
    readonly source?: string;
}

/** Quote section configuration */
export interface QuoteSectionConfig extends SectionBaseConfig {
    readonly style: "simple" | "boxed" | "decorated" | "minimal";
    readonly showQuotationMarks: boolean;
    readonly fontSize: "sm" | "md" | "lg" | "xl";
    readonly italic: boolean;
}

/** Quote section definition */
export interface QuoteSection extends SectionBase {
    readonly type: "quote";
    readonly data: QuoteSectionData;
    readonly config: QuoteSectionConfig;
}

/** Divider section data */
export interface DividerSectionData {
    readonly style: "line" | "dashed" | "dotted" | "gradient" | "wave" | "none";
}

/** Divider section configuration */
export interface DividerSectionConfig extends SectionBaseConfig {
    readonly color?: HexColor;
    readonly thickness: 1 | 2 | 3 | 4;
    readonly width: "25%" | "50%" | "75%" | "100%";
}

/** Divider section definition */
export interface DividerSection extends SectionBase {
    readonly type: "divider";
    readonly data: DividerSectionData;
    readonly config: DividerSectionConfig;
}

/** Spacer section data */
export interface SpacerSectionData {
    readonly height: SpacingToken;
}

/** Spacer section definition */
export interface SpacerSection extends SectionBase {
    readonly type: "spacer";
    readonly data: SpacerSectionData;
    readonly config: SectionBaseConfig;
}

// ============================================================================
// CUSTOM SECTIONS
// ============================================================================

/** Custom markdown section data */
export interface CustomMarkdownSectionData {
    readonly markdown: string;
    readonly sanitize: boolean;
}

/** Custom markdown section definition */
export interface CustomMarkdownSection extends SectionBase {
    readonly type: "custom-markdown";
    readonly data: CustomMarkdownSectionData;
    readonly config: SectionBaseConfig;
}

/** Custom HTML section data (for advanced users) */
export interface CustomHtmlSectionData {
    readonly html: string;
    readonly sanitize: boolean;
    readonly allowScripts: false; // Always false for security
}

/** Custom HTML section definition */
export interface CustomHtmlSection extends SectionBase {
    readonly type: "custom-html";
    readonly data: CustomHtmlSectionData;
    readonly config: SectionBaseConfig;
}

// ============================================================================
// INTEGRATION SECTIONS
// ============================================================================

/** Spotify section data */
export interface SpotifySectionData {
    readonly type: "now-playing" | "top-tracks" | "recently-played";
    readonly embedUrl?: UrlString;
}

/** Spotify section configuration */
export interface SpotifySectionConfig extends SectionBaseConfig {
    readonly theme: ColorScheme;
    readonly showAlbumArt: boolean;
    readonly compact: boolean;
}

/** Spotify section definition */
export interface SpotifySection extends SectionBase {
    readonly type: "spotify";
    readonly data: SpotifySectionData;
    readonly config: SpotifySectionConfig;
}

/** Wakatime section data */
export interface WakatimeSectionData {
    readonly username: string;
    readonly range:
    | "last_7_days"
    | "last_30_days"
    | "last_6_months"
    | "last_year"
    | "all_time";
}

/** Wakatime section configuration */
export interface WakatimeSectionConfig extends SectionBaseConfig {
    readonly layout: "compact" | "default";
    readonly hideTitle: boolean;
    readonly hideProgress: boolean;
    readonly showLanguages: boolean;
    readonly showEditors: boolean;
    readonly showOs: boolean;
}

/** Wakatime section definition */
export interface WakatimeSection extends SectionBase {
    readonly type: "wakatime";
    readonly data: WakatimeSectionData;
    readonly config: WakatimeSectionConfig;
}

/** Contributions graph section data */
export interface ContributionsSectionData {
    readonly username: GitHubUsername;
    readonly showLegend: boolean;
}

/** Contributions section configuration */
export interface ContributionsSectionConfig extends SectionBaseConfig {
    readonly theme: ColorScheme | "github" | "github-dark";
    readonly showTotal: boolean;
    readonly showStreak: boolean;
}

/** Contributions section definition */
export interface ContributionsSection extends SectionBase {
    readonly type: "contributions";
    readonly data: ContributionsSectionData;
    readonly config: ContributionsSectionConfig;
}

/** Pinned repos section data */
export interface PinnedReposSectionData {
    readonly username: GitHubUsername;
    readonly repos?: readonly string[]; // Specific repos to show (optional)
    readonly maxRepos: number;
}

/** Pinned repos section configuration */
export interface PinnedReposSectionConfig extends SectionBaseConfig {
    readonly theme: ColorScheme | "github" | "github-dark";
    readonly showOwner: boolean;
    readonly showDescription: boolean;
    readonly showLanguage: boolean;
    readonly showStars: boolean;
    readonly showForks: boolean;
}

/** Pinned repos section definition */
export interface PinnedReposSection extends SectionBase {
    readonly type: "pinned-repos";
    readonly data: PinnedReposSectionData;
    readonly config: PinnedReposSectionConfig;
}

// ============================================================================
// SECTION UNION TYPE
// ============================================================================

/** Discriminated union of all section types */
export type Section =
    | HeroSection
    | AboutSection
    | TechStackSection
    | GitHubStatsSection
    | ProjectsSection
    | ExperienceSection
    | EducationSection
    | AchievementsSection
    | BlogPostsSection
    | ContactSection
    | SocialsSection
    | QuoteSection
    | DividerSection
    | SpacerSection
    | CustomMarkdownSection
    | CustomHtmlSection
    | SpotifySection
    | WakatimeSection
    | ContributionsSection
    | PinnedReposSection;

// ============================================================================
// TYPE GUARDS
// ============================================================================

export const isHeroSection = (section: Section): section is HeroSection =>
    section.type === "hero";

export const isAboutSection = (section: Section): section is AboutSection =>
    section.type === "about";

export const isTechStackSection = (
    section: Section
): section is TechStackSection => section.type === "tech-stack";

export const isGitHubStatsSection = (
    section: Section
): section is GitHubStatsSection => section.type === "github-stats";

export const isProjectsSection = (
    section: Section
): section is ProjectsSection => section.type === "projects";

export const isSocialsSection = (section: Section): section is SocialsSection =>
    section.type === "socials";

export const isContactSection = (section: Section): section is ContactSection =>
    section.type === "contact";

export const isCustomSection = (
    section: Section
): section is CustomMarkdownSection | CustomHtmlSection =>
    section.type === "custom-markdown" || section.type === "custom-html";

/** Check if section is a utility section (divider, spacer) */
export const isUtilitySection = (
    section: Section
): section is DividerSection | SpacerSection =>
    section.type === "divider" || section.type === "spacer";

/** Check if section requires GitHub username */
export const requiresGitHubUsername = (section: Section): boolean =>
    section.type === "github-stats" ||
    section.type === "contributions" ||
    section.type === "pinned-repos";
