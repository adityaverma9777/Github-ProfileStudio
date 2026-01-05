// default profile data

import type { UserProfile, GitHubUsername, ISODateString } from "@/types";

// create default profile
export const createDefaultProfile = (): UserProfile => ({
    id: `profile-${Date.now()}`,
    githubUsername: "octocat" as GitHubUsername,
    personal: {
        displayName: {
            useName: true,
            useLogin: false,
            customName: "Your Name",
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
        groupByCategory: true,
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
        createdAt: new Date().toISOString() as ISODateString,
        updatedAt: new Date().toISOString() as ISODateString,
    },
});
