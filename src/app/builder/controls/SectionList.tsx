// section list with drag controls

"use client";

import React from "react";
import { useBuilderStore, useSortedSections } from "../state";
import type { SectionType } from "@/types";

// labels
const SECTION_LABELS: Record<SectionType, string> = {
    hero: "Hero Banner",
    about: "About Me",
    "tech-stack": "Tech Stack",
    "github-stats": "GitHub Stats",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    achievements: "Achievements",
    "blog-posts": "Blog Posts",
    contact: "Contact",
    socials: "Social Links",
    quote: "Quote",
    divider: "Divider",
    spacer: "Spacer",
    "custom-markdown": "Custom Markdown",
    "custom-html": "Custom HTML",
    spotify: "Spotify",
    wakatime: "WakaTime",
    contributions: "Contributions",
    "pinned-repos": "Pinned Repos",
};

// icons (simple emojis)
const SECTION_ICONS: Record<SectionType, string> = {
    hero: "👋",
    about: "👤",
    "tech-stack": "🛠️",
    "github-stats": "📊",
    projects: "🚀",
    experience: "💼",
    education: "📚",
    achievements: "🏆",
    "blog-posts": "📝",
    contact: "📧",
    socials: "🔗",
    quote: "💬",
    divider: "➖",
    spacer: "⬜",
    "custom-markdown": "📄",
    "custom-html": "🔧",
    spotify: "🎵",
    wakatime: "⏱️",
    contributions: "📈",
    "pinned-repos": "📌",
};

export const SectionList: React.FC = () => {
    const sections = useSortedSections();
    const {
        toggleSection,
        moveSectionUp,
        moveSectionDown,
        selectSection,
        selectedSection,
        template,
    } = useBuilderStore();

    if (!template) {
        return (
            <div className="p-4 text-center text-gray-500">
                <p className="text-sm">Select a template first</p>
            </div>
        );
    }

    return (
        <div className="p-2">
            <p className="px-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                Toggle and reorder sections
            </p>

            <div className="space-y-1">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className={`
              flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer
              ${selectedSection?.sectionId === section.id
                                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
                            }
            `}
                        onClick={() => selectSection(section.id, section.type)}
                    >
                        {/* toggle */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(section.id);
                            }}
                            className={`
                flex-shrink-0 w-5 h-5 rounded border transition-colors
                ${section.enabled
                                    ? "bg-blue-500 border-blue-500"
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                }
              `}
                        >
                            {section.enabled && (
                                <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>

                        {/* label */}
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                            <span className="text-sm">{SECTION_ICONS[section.type] || "📦"}</span>
                            <span
                                className={`
                  text-sm truncate
                  ${section.enabled
                                        ? "text-gray-900 dark:text-gray-100"
                                        : "text-gray-400 dark:text-gray-500"
                                    }
                `}
                            >
                                {section.title || SECTION_LABELS[section.type] || section.type}
                            </span>
                        </div>

                        {/* reorder btns */}
                        <div className="flex-shrink-0 flex items-center gap-0.5">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    moveSectionUp(section.id);
                                }}
                                disabled={index === 0}
                                className={`
                  p-1 rounded transition-colors
                  ${index === 0
                                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }
                `}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    moveSectionDown(section.id);
                                }}
                                disabled={index === sections.length - 1}
                                className={`
                  p-1 rounded transition-colors
                  ${index === sections.length - 1
                                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }
                `}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
