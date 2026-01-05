// profile editor with github fetch

"use client";

import React from "react";
import { useBuilderStore } from "../state";
import { useGitHubProfile } from "@/hooks";
import type { GitHubUsername } from "@/types";

export const ProfileEditor: React.FC = () => {
    const { profile, updateProfile } = useBuilderStore();
    const { fetchProfile, loading, error, user, isReady } = useGitHubProfile();

    if (!profile) {
        return (
            <div className="p-4 text-center text-gray-500">
                <p className="text-sm">Loading profile...</p>
            </div>
        );
    }

    const handleUsernameChange = (value: string) => {
        updateProfile({ githubUsername: value as GitHubUsername });
    };

    const handleDisplayNameChange = (value: string) => {
        updateProfile({
            personal: {
                ...profile.personal,
                displayName: {
                    ...profile.personal.displayName,
                    customName: value,
                },
            },
        });
    };

    const handleFetchProfile = async () => {
        await fetchProfile();
    };

    return (
        <div className="p-4 space-y-6">
            {/* username input */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub Username
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 dark:text-gray-500">@</span>
                    <input
                        type="text"
                        value={profile.githubUsername}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        className="
                            flex-1 px-3 py-2 text-sm rounded-lg border
                            border-gray-200 dark:border-gray-700
                            bg-white dark:bg-gray-800
                            text-gray-900 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-500
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        "
                        placeholder="octocat"
                    />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Used for GitHub stats and contribution graphs
                </p>
            </div>

            {/* fetch button */}
            <button
                onClick={handleFetchProfile}
                disabled={loading || !isReady}
                className={`
                    w-full px-4 py-2.5 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${loading
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-wait"
                        : isReady
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    }
                `}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Fetching...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Fetch GitHub Profile
                    </span>
                )}
            </button>

            {/* error msg */}
            {error && (
                <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    {error}
                </div>
            )}

            {/* success msg */}
            {user && !loading && (
                <div className="p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    ✓ Loaded data for <strong>{user.name || user.login}</strong>
                    <br />
                    <span className="text-xs opacity-75">
                        {user.publicRepos} repos • {user.followers} followers
                    </span>
                </div>
            )}

            {/* display name */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Display Name
                </label>
                <input
                    type="text"
                    value={profile.personal.displayName.customName || ""}
                    onChange={(e) => handleDisplayNameChange(e.target.value)}
                    className="
                        w-full px-3 py-2 text-sm rounded-lg border
                        border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    "
                    placeholder="Your Name"
                />
            </div>

            {/* toggles */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                </h3>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={profile.personal.isAvailableForHire}
                        onChange={(e) =>
                            updateProfile({
                                personal: { ...profile.personal, isAvailableForHire: e.target.checked },
                            })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Available for hire
                    </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={profile.personal.isOpenToCollaboration}
                        onChange={(e) =>
                            updateProfile({
                                personal: { ...profile.personal, isOpenToCollaboration: e.target.checked },
                            })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Open to collaboration
                    </span>
                </label>
            </div>

            {/* divider */}
            <hr className="border-gray-200 dark:border-gray-700" />

            {/* tech stack options */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quick Settings
                </h3>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={profile.techStack.groupByCategory}
                        onChange={(e) =>
                            updateProfile({
                                techStack: { ...profile.techStack, groupByCategory: e.target.checked },
                            })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Group tech stack by category
                    </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={profile.techStack.showProficiency}
                        onChange={(e) =>
                            updateProfile({
                                techStack: { ...profile.techStack, showProficiency: e.target.checked },
                            })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Show proficiency levels
                    </span>
                </label>
            </div>
        </div>
    );
};
