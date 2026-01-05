/**
 * GitHub API-related type definitions
 */

/** GitHub user profile data */
export interface GitHubUser {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
    name: string | null;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    bio: string | null;
    twitterUsername: string | null;
    publicRepos: number;
    publicGists: number;
    followers: number;
    following: number;
    createdAt: string;
    updatedAt: string;
}

/** GitHub repository data */
export interface GitHubRepository {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    htmlUrl: string;
    language: string | null;
    stargazersCount: number;
    forksCount: number;
    watchersCount: number;
    topics: string[];
    isPrivate: boolean;
    isFork: boolean;
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
}

/** GitHub language statistics */
export interface GitHubLanguageStats {
    [language: string]: number;
}

/** GitHub contribution data */
export interface GitHubContribution {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}
