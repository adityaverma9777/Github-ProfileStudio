// section settings panel

"use client";

import React from "react";
import { useBuilderStore } from "../state";
import type { Section, SectionType } from "@/types";

interface SectionSettingsProps {
    section: Section;
}

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

export const SectionSettings: React.FC<SectionSettingsProps> = ({ section }) => {
    const { updateSectionConfig, template } = useBuilderStore();

    const handleConfigChange = (key: string, value: unknown) => {
        updateSectionConfig(section.id, { [key]: value });
    };

    const handleTitleChange = (title: string) => {
        // update title
        if (!template) return;
        const updatedSections = template.sections.map((s: Section) =>
            s.id === section.id ? { ...s, title: title || undefined } : s
        );
        // store update
        useBuilderStore.setState({
            template: { ...template, sections: updatedSections },
            isDirty: true,
        });
        useBuilderStore.getState().triggerRender();
    };

    return (
        <div className="p-4 space-y-6">
            {/* section header */}
            <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {SECTION_LABELS[section.type] || section.type}
                </p>
                <input
                    type="text"
                    value={section.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="
            w-full px-3 py-2 text-sm rounded-lg border
            border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          "
                    placeholder="Section Title (optional)"
                />
            </div>

            {/* settings based on type */}
            {renderSectionSettings(section, handleConfigChange)}
        </div>
    );
};

// render settings based on section type
const renderSectionSettings = (
    section: Section,
    onChange: (key: string, value: unknown) => void
): React.ReactNode => {
    const config = section.config as unknown as Record<string, unknown>;
    const data = section.data as unknown as Record<string, unknown>;

    switch (section.type) {
        case "hero":
            return (
                <div className="space-y-4">
                    <Toggle
                        label="Show typing animation"
                        checked={Boolean(data?.showTypingAnimation)}
                        onChange={() => {
                            // hero animation toggle
                        }}
                        description="Animated text effect in hero"
                    />
                </div>
            );

        case "github-stats":
            return (
                <div className="space-y-4">
                    <Toggle
                        label="Show stats card"
                        checked={config.showStats !== false}
                        onChange={(v) => onChange("showStats", v)}
                    />
                    <Toggle
                        label="Show top languages"
                        checked={config.showTopLanguages !== false}
                        onChange={(v) => onChange("showTopLanguages", v)}
                    />
                    <Toggle
                        label="Show streak stats"
                        checked={config.showStreak !== false}
                        onChange={(v) => onChange("showStreak", v)}
                    />
                    <Toggle
                        label="Show contributions"
                        checked={Boolean(config.showContributions)}
                        onChange={(v) => onChange("showContributions", v)}
                    />
                    <Select
                        label="Theme"
                        value={String(config.theme || "default")}
                        options={[
                            { value: "default", label: "Default" },
                            { value: "dark", label: "Dark" },
                            { value: "radical", label: "Radical" },
                            { value: "tokyonight", label: "Tokyo Night" },
                            { value: "dracula", label: "Dracula" },
                        ]}
                        onChange={(v) => onChange("theme", v)}
                    />
                </div>
            );

        case "tech-stack":
            return (
                <div className="space-y-4">
                    <Select
                        label="Display style"
                        value={String(config.displayStyle || "badges")}
                        options={[
                            { value: "badges", label: "Badges" },
                            { value: "icons", label: "Icons" },
                            { value: "list", label: "List" },
                        ]}
                        onChange={(v) => onChange("displayStyle", v)}
                    />
                    <Toggle
                        label="Show proficiency levels"
                        checked={Boolean(config.showProficiency)}
                        onChange={(v) => onChange("showProficiency", v)}
                    />
                    <Toggle
                        label="Show category headers"
                        checked={config.showCategoryHeaders !== false}
                        onChange={(v) => onChange("showCategoryHeaders", v)}
                    />
                </div>
            );

        case "projects":
            return (
                <div className="space-y-4">
                    <NumberInput
                        label="Max projects"
                        value={Number(config.maxProjects) || 6}
                        min={1}
                        max={12}
                        onChange={(v) => onChange("maxProjects", v)}
                    />
                    <Toggle
                        label="Show description"
                        checked={config.showDescription !== false}
                        onChange={(v) => onChange("showDescription", v)}
                    />
                    <Toggle
                        label="Show stats"
                        checked={Boolean(config.showStats)}
                        onChange={(v) => onChange("showStats", v)}
                    />
                </div>
            );

        case "socials":
            return (
                <div className="space-y-4">
                    <Select
                        label="Display style"
                        value={String(config.displayStyle || "badges")}
                        options={[
                            { value: "badges", label: "Badges" },
                            { value: "icons", label: "Icons only" },
                            { value: "buttons", label: "Buttons" },
                        ]}
                        onChange={(v) => onChange("displayStyle", v)}
                    />
                </div>
            );

        case "divider":
            return (
                <div className="space-y-4">
                    <Select
                        label="Style"
                        value={String(config.style || "solid")}
                        options={[
                            { value: "solid", label: "Solid line" },
                            { value: "dashed", label: "Dashed" },
                            { value: "dotted", label: "Dotted" },
                            { value: "wave", label: "Wave" },
                        ]}
                        onChange={(v) => onChange("style", v)}
                    />
                </div>
            );

        case "spacer":
            return (
                <div className="space-y-4">
                    <Select
                        label="Height"
                        value={String(config.height || "md")}
                        options={[
                            { value: "xs", label: "Extra small" },
                            { value: "sm", label: "Small" },
                            { value: "md", label: "Medium" },
                            { value: "lg", label: "Large" },
                            { value: "xl", label: "Extra large" },
                        ]}
                        onChange={(v) => onChange("height", v)}
                    />
                </div>
            );

        default:
            return (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    No additional settings for this section
                </p>
            );
    }
};

// control components

interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, description }) => (
    <label className="flex items-start gap-3 cursor-pointer">
        <div className="pt-0.5">
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`
          relative inline-flex h-5 w-9 items-center rounded-full transition-colors
          ${checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}
        `}
            >
                <span
                    className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? "translate-x-4" : "translate-x-0.5"}
          `}
                />
            </button>
        </div>
        <div className="flex-1">
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
            )}
        </div>
    </label>
);

interface SelectProps {
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, value, options, onChange }) => (
    <div className="space-y-1">
        <label className="block text-sm text-gray-700 dark:text-gray-300">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
        w-full px-3 py-2 text-sm rounded-lg border
        border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      "
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

interface NumberInputProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, min, max, onChange }) => (
    <div className="space-y-1">
        <label className="block text-sm text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(Number(e.target.value))}
            className="
        w-full px-3 py-2 text-sm rounded-lg border
        border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      "
        />
    </div>
);
