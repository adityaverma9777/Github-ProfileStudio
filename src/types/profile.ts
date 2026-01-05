/**
 * User Profile Type Definitions
 *
 * Defines the user's profile data that populates templates
 * Includes GitHub data, personal info, and custom fields
 */

import type {
    GitHubUsername,
    HexColor,
    UrlString,
    ISODateString,
    AuditTimestamps,
} from "./common";

import type { TechStackItem, SocialLink, SocialPlatform } from "./section";

// ============================================================================
// GITHUB USER DATA
// ============================================================================

/** GitHub user profile from API */
export interface GitHubUserData {
    readonly login: GitHubUsername;
    readonly id: number;
    readonly nodeId: string;
    readonly avatarUrl: UrlString;
    readonly gravatarId: string;
    readonly url: UrlString;
    readonly htmlUrl: UrlString;
    readonly type: "User" | "Organization";
    readonly siteAdmin: boolean;
    readonly name: string | null;
    readonly company: string | null;
    readonly blog: string;
    readonly location: string | null;
    readonly email: string | null;
    readonly hireable: boolean | null;
    readonly bio: string | null;
    readonly twitterUsername: string | null;
    readonly publicRepos: number;
    readonly publicGists: number;
    readonly followers: number;
    readonly following: number;
    readonly createdAt: ISODateString;
    readonly updatedAt: ISODateString;
}

/** GitHub repository data */
export interface GitHubRepositoryData {
    readonly id: number;
    readonly nodeId: string;
    readonly name: string;
    readonly fullName: string;
    readonly private: boolean;
    readonly owner: {
        readonly login: GitHubUsername;
        readonly avatarUrl: UrlString;
    };
    readonly htmlUrl: UrlString;
    readonly description: string | null;
    readonly fork: boolean;
    readonly url: UrlString;
    readonly createdAt: ISODateString;
    readonly updatedAt: ISODateString;
    readonly pushedAt: ISODateString;
    readonly homepage: string | null;
    readonly size: number;
    readonly stargazersCount: number;
    readonly watchersCount: number;
    readonly language: string | null;
    readonly forksCount: number;
    readonly archived: boolean;
    readonly disabled: boolean;
    readonly openIssuesCount: number;
    readonly license: {
        readonly key: string;
        readonly name: string;
        readonly spdxId: string;
        readonly url: UrlString;
    } | null;
    readonly allowForking: boolean;
    readonly isTemplate: boolean;
    readonly topics: readonly string[];
    readonly visibility: "public" | "private" | "internal";
    readonly defaultBranch: string;
}

/** GitHub language statistics */
export interface GitHubLanguageStats {
    readonly [language: string]: {
        readonly bytes: number;
        readonly percentage: number;
        readonly color: HexColor;
    };
}

/** GitHub contribution data point */
export interface GitHubContribution {
    readonly date: string; // YYYY-MM-DD format
    readonly count: number;
    readonly level: 0 | 1 | 2 | 3 | 4;
}

/** GitHub contribution calendar */
export interface GitHubContributionCalendar {
    readonly totalContributions: number;
    readonly weeks: readonly {
        readonly contributionDays: readonly GitHubContribution[];
    }[];
}

/** GitHub stats summary */
export interface GitHubStatsSummary {
    readonly totalStars: number;
    readonly totalForks: number;
    readonly totalCommits: number;
    readonly totalPRs: number;
    readonly totalIssues: number;
    readonly totalContributions: number;
    readonly currentStreak: number;
    readonly longestStreak: number;
    readonly contributionCalendar: GitHubContributionCalendar;
    readonly topLanguages: GitHubLanguageStats;
    readonly pinnedRepos: readonly GitHubRepositoryData[];
}

/** Complete GitHub data for a user */
export interface GitHubProfile {
    readonly user: GitHubUserData;
    readonly stats: GitHubStatsSummary;
    readonly repositories: readonly GitHubRepositoryData[];
    readonly lastFetched: ISODateString;
}

// ============================================================================
// DISPLAY PREFERENCES
// ============================================================================

/** User display name preferences */
export interface DisplayNameConfig {
    readonly useName: boolean; // Use GitHub name
    readonly useLogin: boolean; // Use GitHub username
    readonly customName?: string; // Custom display name
    readonly showPronouns: boolean;
    readonly pronouns?: string;
}

/** Avatar configuration */
export interface AvatarConfig {
    readonly useGitHubAvatar: boolean;
    readonly customAvatarUrl?: UrlString;
    readonly showBorder: boolean;
    readonly borderColor?: HexColor;
    readonly shape: "circle" | "square" | "rounded";
}

// ============================================================================
// PERSONAL INFO
// ============================================================================

/** User's personal information */
export interface PersonalInfo {
    readonly displayName: DisplayNameConfig;
    readonly avatar: AvatarConfig;
    readonly headline?: string;
    readonly bio?: string;
    readonly location?: string;
    readonly timezone?: string;
    readonly currentRole?: string;
    readonly company?: string;
    readonly website?: UrlString;
    readonly email?: string;
    readonly isAvailableForHire: boolean;
    readonly isOpenToCollaboration: boolean;
}

// ============================================================================
// PROFESSIONAL INFO
// ============================================================================

/** Work experience item */
export interface WorkExperience {
    readonly id: string;
    readonly company: string;
    readonly role: string;
    readonly type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
    readonly location?: string;
    readonly remote: boolean;
    readonly startDate: string; // YYYY-MM format
    readonly endDate?: string; // undefined = current
    readonly description?: string;
    readonly highlights: readonly string[];
    readonly technologies: readonly string[];
    readonly companyUrl?: UrlString;
    readonly companyLogo?: UrlString;
}

/** Education item */
export interface Education {
    readonly id: string;
    readonly institution: string;
    readonly degree: string;
    readonly field: string;
    readonly startDate: string; // YYYY format
    readonly endDate?: string;
    readonly gpa?: string;
    readonly honors: readonly string[];
    readonly coursework: readonly string[];
    readonly institutionUrl?: UrlString;
    readonly institutionLogo?: UrlString;
}

/** Certification */
export interface Certification {
    readonly id: string;
    readonly name: string;
    readonly issuer: string;
    readonly issueDate: string;
    readonly expiryDate?: string;
    readonly credentialId?: string;
    readonly credentialUrl?: UrlString;
    readonly skills: readonly string[];
}

/** Professional information */
export interface ProfessionalInfo {
    readonly experience: readonly WorkExperience[];
    readonly education: readonly Education[];
    readonly certifications: readonly Certification[];
    readonly yearsOfExperience?: number;
    readonly specializations: readonly string[];
}

// ============================================================================
// TECH STACK
// ============================================================================

/** User's tech stack configuration */
export interface UserTechStack {
    readonly items: readonly TechStackItem[];
    readonly featured: readonly string[]; // IDs of featured items
    readonly showProficiency: boolean;
    readonly groupByCategory: boolean;
}

// ============================================================================
// SOCIAL LINKS
// ============================================================================

/** User's social links configuration */
export interface UserSocialLinks {
    readonly links: readonly SocialLink[];
    readonly primaryPlatform?: SocialPlatform;
    readonly showFollowerCount: boolean;
}

// ============================================================================
// PROJECTS
// ============================================================================

/** User project */
export interface UserProject {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly longDescription?: string;
    readonly status: "active" | "completed" | "archived" | "on-hold";
    readonly visibility: "public" | "private";
    readonly featured: boolean;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly repoUrl?: UrlString;
    readonly demoUrl?: UrlString;
    readonly docsUrl?: UrlString;
    readonly image?: UrlString;
    readonly screenshots?: readonly UrlString[];
    readonly technologies: readonly string[];
    readonly categories: readonly string[];
    readonly highlights: readonly string[];
    readonly metrics?: {
        readonly stars?: number;
        readonly forks?: number;
        readonly downloads?: number;
        readonly users?: number;
    };
}

/** User's projects configuration */
export interface UserProjects {
    readonly items: readonly UserProject[];
    readonly showFeaturedOnly: boolean;
    readonly maxDisplay: number;
}

// ============================================================================
// CUSTOM FIELDS
// ============================================================================

/** Custom field types */
export type CustomFieldType =
    | "text"
    | "url"
    | "email"
    | "date"
    | "number"
    | "boolean"
    | "list"
    | "richtext";

/** Custom field definition */
export interface CustomField {
    readonly id: string;
    readonly label: string;
    readonly type: CustomFieldType;
    readonly value: string | number | boolean | readonly string[];
    readonly visible: boolean;
    readonly order: number;
    readonly icon?: string;
    readonly section?: string; // Which section to display in
}

/** Custom fields collection */
export interface CustomFields {
    readonly fields: readonly CustomField[];
}

// ============================================================================
// CONTENT PREFERENCES
// ============================================================================

/** Blog/writing configuration */
export interface BlogConfig {
    readonly enabled: boolean;
    readonly platform?: "dev.to" | "medium" | "hashnode" | "personal" | "other";
    readonly feedUrl?: UrlString;
    readonly profileUrl?: UrlString;
    readonly maxPosts: number;
    readonly showExcerpts: boolean;
}

/** Spotify integration */
export interface SpotifyConfig {
    readonly enabled: boolean;
    readonly showNowPlaying: boolean;
    readonly showTopTracks: boolean;
    readonly showRecentlyPlayed: boolean;
}

/** Wakatime integration */
export interface WakatimeConfig {
    readonly enabled: boolean;
    readonly username?: string;
    readonly range: "last_7_days" | "last_30_days" | "last_6_months" | "last_year";
    readonly showLanguages: boolean;
    readonly showEditors: boolean;
}

/** Integration configurations */
export interface IntegrationConfigs {
    readonly blog: BlogConfig;
    readonly spotify: SpotifyConfig;
    readonly wakatime: WakatimeConfig;
}

// ============================================================================
// COMPLETE USER PROFILE
// ============================================================================

/** Complete user profile */
export interface UserProfile {
    readonly id: string;
    readonly githubUsername: GitHubUsername;
    readonly github?: GitHubProfile;
    readonly personal: PersonalInfo;
    readonly professional: ProfessionalInfo;
    readonly techStack: UserTechStack;
    readonly socialLinks: UserSocialLinks;
    readonly projects: UserProjects;
    readonly customFields: CustomFields;
    readonly integrations: IntegrationConfigs;
    readonly timestamps: AuditTimestamps;
}

/** User profile for creation */
export interface UserProfileInput {
    readonly githubUsername: GitHubUsername;
    readonly personal?: Partial<PersonalInfo>;
    readonly professional?: Partial<ProfessionalInfo>;
    readonly techStack?: Partial<UserTechStack>;
    readonly socialLinks?: Partial<UserSocialLinks>;
    readonly projects?: Partial<UserProjects>;
    readonly customFields?: Partial<CustomFields>;
    readonly integrations?: Partial<IntegrationConfigs>;
}

/** Minimal user profile summary */
export interface UserProfileSummary {
    readonly id: string;
    readonly githubUsername: GitHubUsername;
    readonly displayName: string;
    readonly avatarUrl: UrlString;
    readonly headline?: string;
    readonly updatedAt: ISODateString;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export const hasGitHubProfile = (
    profile: UserProfile
): profile is UserProfile & { github: GitHubProfile } =>
    profile.github !== undefined;

export const isAvailableForHire = (profile: UserProfile): boolean =>
    profile.personal.isAvailableForHire;

export const hasWorkExperience = (profile: UserProfile): boolean =>
    profile.professional.experience.length > 0;

export const hasFeaturedProjects = (profile: UserProfile): boolean =>
    profile.projects.items.some((p) => p.featured);
