/**
 * useGitHubProfile Hook
 *
 * Fetches and manages GitHub profile data.
 * Integrates with the builder store to update profile and template sections.
 */

"use client";

import { useState, useCallback } from "react";
import { useBuilderStore } from "@/app/builder/state";
import { fetchGitHubUser, fetchUserRepositories, type GitHubApiUser, type GitHubApiRepository } from "@/services/github";
import type { GitHubUsername, UrlString, SocialLink, ProjectItem, AboutSectionData, SocialsSectionData, ProjectsSectionData, Section } from "@/types";
import { createUrlString, createGitHubUsername } from "@/types";

export interface GitHubFetchResult {
    user: GitHubApiUser | null;
    repos: GitHubApiRepository[] | null;
    loading: boolean;
    error: string | null;
}

/**
 * Hook for fetching GitHub profile data and syncing with builder state
 */
export function useGitHubProfile() {
    const { profile, updateProfile, template, setTemplate } = useBuilderStore();
    const [state, setState] = useState<GitHubFetchResult>({
        user: null,
        repos: null,
        loading: false,
        error: null,
    });

    /**
     * Fetch GitHub data for a username and update the builder state
     */
    const fetchProfile = useCallback(async (username?: string) => {
        const targetUsername = username || profile?.githubUsername;

        if (!targetUsername || targetUsername === "your-github-username") {
            setState({ user: null, repos: null, loading: false, error: "Please enter a valid GitHub username" });
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            // Fetch user data and repos in parallel
            const [userResult, reposResult] = await Promise.all([
                fetchGitHubUser(targetUsername),
                fetchUserRepositories(targetUsername, { perPage: 6, sort: "pushed" }),
            ]);

            if (!userResult.success) {
                setState({ user: null, repos: null, loading: false, error: userResult.error });
                return;
            }

            const user = userResult.data;
            const repos = reposResult.success ? reposResult.data : [];

            setState({ user, repos, loading: false, error: null });

            // Update profile with GitHub data
            if (profile) {
                updateProfile({
                    githubUsername: user.login as GitHubUsername,
                    personal: {
                        ...profile.personal,
                        displayName: {
                            ...profile.personal.displayName,
                            customName: user.name || profile.personal.displayName.customName,
                        },
                        headline: user.bio || profile.personal.headline,
                    },
                });
            }

            // Update template sections with real data if template exists
            if (template) {
                updateTemplateWithGitHubData(user, repos);
            }
        } catch (error) {
            setState({
                user: null,
                repos: null,
                loading: false,
                error: error instanceof Error ? error.message : "Failed to fetch GitHub data",
            });
        }
    }, [profile, template, updateProfile]);

    /**
     * Update template sections with fetched GitHub data
     */
    const updateTemplateWithGitHubData = useCallback((user: GitHubApiUser, repos: GitHubApiRepository[]) => {
        if (!template) return;

        const updatedSections = template.sections.map((section: Section) => {
            // Update About section with bio
            if (section.type === "about" && user.bio) {
                const aboutData = section.data as AboutSectionData;
                return {
                    ...section,
                    data: {
                        ...aboutData,
                        content: user.bio,
                        location: user.location || aboutData.location,
                    },
                };
            }

            // Update Socials section with real links
            if (section.type === "socials") {
                const socialsData = section.data as SocialsSectionData;
                const newLinks: SocialLink[] = [
                    {
                        platform: "github" as const,
                        url: createUrlString(user.htmlUrl),
                        username: user.login,
                    },
                ];

                // Add LinkedIn if exists
                if (user.blog && user.blog.includes("linkedin")) {
                    newLinks.push({
                        platform: "linkedin" as const,
                        url: createUrlString(user.blog),
                    });
                }

                // Add Twitter/X if exists
                if (user.twitterUsername) {
                    newLinks.push({
                        platform: "twitter" as const,
                        url: createUrlString(`https://twitter.com/${user.twitterUsername}`),
                        username: user.twitterUsername,
                    });
                }

                // Add email
                if (user.email) {
                    newLinks.push({
                        platform: "email" as const,
                        url: createUrlString(`mailto:${user.email}`),
                    });
                }

                // Add blog/website if not LinkedIn
                if (user.blog && !user.blog.includes("linkedin")) {
                    newLinks.push({
                        platform: "website" as const,
                        url: createUrlString(user.blog.startsWith("http") ? user.blog : `https://${user.blog}`),
                    });
                }

                // Preserve any existing links not covered
                const coveredPlatforms = new Set(newLinks.map(l => l.platform));
                const existingLinks = (socialsData.links || []).filter(l => !coveredPlatforms.has(l.platform));

                return {
                    ...section,
                    data: {
                        ...socialsData,
                        links: [...newLinks, ...existingLinks],
                    },
                };
            }

            // Update Projects section with real repos
            if (section.type === "projects" && repos.length > 0) {
                const projectsData = section.data as ProjectsSectionData;
                const projectItems: ProjectItem[] = repos.slice(0, 3).map((repo) => ({
                    name: repo.name,
                    description: repo.description || "No description available",
                    url: createUrlString(repo.htmlUrl),
                    repoUrl: createUrlString(repo.htmlUrl),
                    techStack: [repo.language, ...(repo.topics || []).slice(0, 3)].filter(Boolean) as string[],
                    status: "active" as const,
                    featured: true,
                    stars: repo.stargazersCount,
                    forks: repo.forksCount,
                }));

                return {
                    ...section,
                    data: {
                        ...projectsData,
                        items: projectItems,
                    },
                };
            }

            // Update GitHub Stats section with real username
            if (section.type === "github-stats") {
                return {
                    ...section,
                    data: {
                        ...section.data,
                        username: createGitHubUsername(user.login),
                    },
                };
            }

            // Update Hero section with real name
            if (section.type === "hero" && user.name) {
                const heroData = section.data;
                return {
                    ...section,
                    data: {
                        ...heroData,
                        headline: heroData.headline.includes("Hi")
                            ? `Hi there! 👋 I'm ${user.name}`
                            : heroData.headline,
                    },
                };
            }

            return section;
        });

        setTemplate({
            ...template,
            sections: updatedSections,
        });
    }, [template, setTemplate]);

    return {
        ...state,
        fetchProfile,
        isReady: !!profile?.githubUsername && profile.githubUsername !== "your-github-username",
    };
}
