// template preview renderer

"use client";

import React, { useMemo, useState } from "react";
import type { Template } from "@/types";
import type { UserProfile } from "@/types";
import { render, type RenderResult } from "@/lib/template-engine";
import { PreviewRenderer } from "@/components/preview";
import { createGitHubUsername, createUrlString, createISODateString, createHexColor } from "@/types";

// demo profile

// create demo profile for template preview
function createDemoProfile(templateName: string = "Developer"): UserProfile {
    const now = new Date().toISOString();

    return {
        id: "demo-profile",
        githubUsername: createGitHubUsername("demo-user"),
        github: undefined, // No real GitHub data for demo
        personal: {
            displayName: {
                useName: true,
                useLogin: false,
                customName: templateName,
                showPronouns: false,
            },
            avatar: {
                useGitHubAvatar: true,
                showBorder: false,
                shape: "circle",
            },
            headline: "Software Developer",
            bio: "Passionate developer building amazing things",
            location: "San Francisco, CA",
            timezone: "America/Los_Angeles",
            currentRole: "Senior Developer",
            company: "Tech Company",
            website: createUrlString("https://example.com"),
            isAvailableForHire: true,
            isOpenToCollaboration: true,
        },
        professional: {
            experience: [],
            education: [],
            certifications: [],
            yearsOfExperience: 5,
            specializations: ["Web Development", "Cloud Architecture"],
        },
        techStack: {
            items: [],
            featured: [],
            showProficiency: false,
            groupByCategory: false,
        },
        socialLinks: {
            links: [],
            showFollowerCount: false,
        },
        projects: {
            items: [],
            showFeaturedOnly: false,
            maxDisplay: 4,
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
                showNowPlaying: false,
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
            createdAt: createISODateString(now),
            updatedAt: createISODateString(now),
        },
    };
}

// template preview renderer

interface TemplatePreviewRendererProps {
    template: Template;
    className?: string;
}

export const TemplatePreviewRenderer: React.FC<TemplatePreviewRendererProps> = ({
    template,
    className = "",
}) => {
    const [error, setError] = useState<string | null>(null);

    // demo profile for render
    const demoProfile = useMemo(
        () => createDemoProfile(template.metadata.name),
        [template.metadata.name]
    );

    // render to IR
    const renderResult: RenderResult = useMemo(() => {
        try {
            return render(template, demoProfile, {
                continueOnError: true,
                skipValidation: true, // Skip validation for demo data
            });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to render template");
            return { success: false, errors: [] };
        }
    }, [template, demoProfile]);

    // error handling
    if (!renderResult.success) {
        return (
            <div className={`p-6 bg-red-50 dark:bg-red-900/20 rounded-lg ${className}`}>
                <h3 className="text-red-600 dark:text-red-400 font-medium mb-2">
                    Preview Error
                </h3>
                <p className="text-sm text-red-500 dark:text-red-300">
                    {error || "Failed to render template preview"}
                </p>
                {renderResult.errors.length > 0 && (
                    <ul className="mt-2 text-xs text-red-400">
                        {renderResult.errors.map((err, i) => (
                            <li key={i}>• {err.message}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden ${className}`}>
            <PreviewRenderer
                output={renderResult.output}
                theme="system"
                className="p-6"
            />
        </div>
    );
};

export default TemplatePreviewRenderer;
