/**
 * GitHub API Service
 * Handles all interactions with the GitHub API
 * 
 * Note: This service uses its own simplified types for API responses.
 * For the comprehensive GitHub data types, see @/types/profile.ts
 */

import { API } from "@/lib/constants";

/** Error response from GitHub API */
interface GitHubApiError {
    message: string;
    documentation_url?: string;
}

/** Result type for API calls */
type ApiResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };

/**
 * Simplified GitHub user from API
 * This is the raw API response shape, not the full profile type
 */
export interface GitHubApiUser {
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

/**
 * Simplified GitHub repository from API
 */
export interface GitHubApiRepository {
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

/**
 * Fetches a GitHub user's profile
 * @param username - GitHub username
 * @returns User profile data or error
 */
export async function fetchGitHubUser(
    username: string
): Promise<ApiResult<GitHubApiUser>> {
    try {
        const response = await fetch(
            `${API.github.baseUrl}${API.github.userEndpoint}/${username}`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!response.ok) {
            const error = (await response.json()) as GitHubApiError;
            return { success: false, error: error.message };
        }

        const data = await response.json();

        // Transform snake_case to camelCase
        const user: GitHubApiUser = {
            login: data.login,
            id: data.id,
            avatarUrl: data.avatar_url,
            htmlUrl: data.html_url,
            name: data.name,
            company: data.company,
            blog: data.blog,
            location: data.location,
            email: data.email,
            bio: data.bio,
            twitterUsername: data.twitter_username,
            publicRepos: data.public_repos,
            publicGists: data.public_gists,
            followers: data.followers,
            following: data.following,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        return { success: true, data: user };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}

/**
 * Fetches a user's repositories
 * @param username - GitHub username
 * @param options - Fetch options
 * @returns Array of repositories or error
 */
export async function fetchUserRepositories(
    username: string,
    options: {
        sort?: "created" | "updated" | "pushed" | "full_name";
        direction?: "asc" | "desc";
        perPage?: number;
    } = {}
): Promise<ApiResult<GitHubApiRepository[]>> {
    const { sort = "updated", direction = "desc", perPage = 10 } = options;

    try {
        const response = await fetch(
            `${API.github.baseUrl}${API.github.userEndpoint}/${username}/repos?sort=${sort}&direction=${direction}&per_page=${perPage}`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            const error = (await response.json()) as GitHubApiError;
            return { success: false, error: error.message };
        }

        const data = await response.json();

        // Transform to typed array
        const repos: GitHubApiRepository[] = data.map(
            (repo: Record<string, unknown>) => ({
                id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                description: repo.description,
                htmlUrl: repo.html_url,
                language: repo.language,
                stargazersCount: repo.stargazers_count,
                forksCount: repo.forks_count,
                watchersCount: repo.watchers_count,
                topics: repo.topics,
                isPrivate: repo.private,
                isFork: repo.fork,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at,
                pushedAt: repo.pushed_at,
            })
        );

        return { success: true, data: repos };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}
