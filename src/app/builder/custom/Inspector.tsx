// inspector - property editor

"use client";

import React from "react";
import { useCanvasStore, useSelectedItem } from "@/app/builder/state/canvasStore";
import type { CanvasItem, BadgeDef, TechItem, ProjectDef, SocialLinkDef } from "@/lib/canvas-lib/types";
import { CANVAS_CONFIG, type Theme, type BadgeStyle } from "@/lib/canvas-lib/config";
import { TECH_CATALOG, TECH_CATEGORIES, type TechCategory, type TechCatalogItem } from "@/lib/canvas-lib/tech-catalog";
import { TECH_CATEGORY_ICONS } from "@/lib/canvas-lib/tech-catalog";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    Gamepad2,
    Send,
    Mail,
    Globe,
    FileText,
    PenLine,
    Bot,
    Tv,
    BookOpen,
    Facebook,
    type LucideIcon,
} from "lucide-react";

// platform icons for UI
const SOCIAL_PLATFORM_ICONS: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    discord: Gamepad2,
    telegram: Send,
    email: Mail,
    website: Globe,
    dev: FileText,
    medium: PenLine,
    reddit: Bot,
    twitch: Tv,
    stackoverflow: BookOpen,
    facebook: Facebook,
};

interface InspectorProps {
    className?: string;
}

export const Inspector: React.FC<InspectorProps> = ({ className = "" }) => {
    const selectedItem = useSelectedItem();
    const { updateItemProps, canvas, updateSettings } = useCanvasStore();

    if (!selectedItem) {
        return (
            <div className={`h-full flex flex-col bg-white dark:bg-gray-900 ${className}`}>
                {/* header */}
                <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Inspector
                    </h2>
                </div>

                {/* empty state */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        No Selection
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Click on a component in the canvas to edit its properties
                    </p>
                </div>

                {/* global settings */}
                <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Global Settings
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Default Username
                            </label>
                            <input
                                type="text"
                                value={canvas.settings.defaultUsername}
                                onChange={(e) => updateSettings({ defaultUsername: e.target.value })}
                                placeholder="your-github-username"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Theme
                            </label>
                            <select
                                value={canvas.settings.theme}
                                onChange={(e) => updateSettings({ theme: e.target.value as Theme })}
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                {CANVAS_CONFIG.themes.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={canvas.settings.showPoweredBy}
                                onChange={(e) => updateSettings({ showPoweredBy: e.target.checked })}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Show &quot;Powered by&quot; footer
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full overflow-y-auto bg-white dark:bg-gray-900 ${className}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Inspector
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedItem.type.replace("-", " ")}
                </p>
            </div>

            <div className="p-4 space-y-4">
                <ItemPropsEditor
                    item={selectedItem}
                    onUpdate={(props) => updateItemProps(selectedItem.id, props)}
                />
            </div>
        </div>
    );
};

interface ItemPropsEditorProps {
    item: CanvasItem;
    onUpdate: (props: Partial<CanvasItem["props"]>) => void;
}

const ItemPropsEditor: React.FC<ItemPropsEditorProps> = ({ item, onUpdate }) => {
    switch (item.type) {
        case "typing-hero":
            return (
                <div className="space-y-4">
                    <ArrayInput
                        label="Typing Lines"
                        value={[...item.props.lines]}
                        onChange={(lines) => onUpdate({ lines })}
                        placeholder="Add a line..."
                    />
                    <CheckboxInput
                        label="Center Aligned"
                        checked={item.props.center}
                        onChange={(center) => onUpdate({ center })}
                    />
                    <TextInput
                        label="Color (hex without #)"
                        value={item.props.color}
                        onChange={(color) => onUpdate({ color })}
                    />
                    <NumberInput
                        label="Font Size"
                        value={item.props.size}
                        onChange={(size) => onUpdate({ size })}
                        min={12}
                        max={48}
                    />
                    <NumberInput
                        label="Pause (ms)"
                        value={item.props.pause}
                        onChange={(pause) => onUpdate({ pause })}
                        min={500}
                        max={5000}
                        step={100}
                    />
                </div>
            );

        case "static-hero":
            return (
                <div className="space-y-4">
                    <TextInput
                        label="Headline"
                        value={item.props.headline}
                        onChange={(headline) => onUpdate({ headline })}
                    />
                    <TextInput
                        label="Subheadline"
                        value={item.props.subheadline}
                        onChange={(subheadline) => onUpdate({ subheadline })}
                    />
                    <SelectInput
                        label="Alignment"
                        value={item.props.align}
                        options={[
                            { value: "left", label: "Left" },
                            { value: "center", label: "Center" },
                            { value: "right", label: "Right" },
                        ]}
                        onChange={(align) => onUpdate({ align: align as "left" | "center" | "right" })}
                    />
                </div>
            );

        case "text-block":
            return (
                <div className="space-y-4">
                    <TextareaInput
                        label="Content"
                        value={item.props.content}
                        onChange={(content) => onUpdate({ content })}
                        rows={4}
                    />
                    <SelectInput
                        label="Alignment"
                        value={item.props.align}
                        options={[
                            { value: "left", label: "Left" },
                            { value: "center", label: "Center" },
                            { value: "right", label: "Right" },
                        ]}
                        onChange={(align) => onUpdate({ align: align as "left" | "center" | "right" })}
                    />
                </div>
            );

        case "heading":
            return (
                <div className="space-y-4">
                    <TextInput
                        label="Text"
                        value={item.props.text}
                        onChange={(text) => onUpdate({ text })}
                    />
                    <SelectInput
                        label="Level"
                        value={String(item.props.level)}
                        options={[
                            { value: "1", label: "H1 - Largest" },
                            { value: "2", label: "H2" },
                            { value: "3", label: "H3" },
                            { value: "4", label: "H4" },
                            { value: "5", label: "H5" },
                            { value: "6", label: "H6 - Smallest" },
                        ]}
                        onChange={(level) => onUpdate({ level: Number(level) as 1 | 2 | 3 | 4 | 5 | 6 })}
                    />
                    <SelectInput
                        label="Alignment"
                        value={item.props.align}
                        options={[
                            { value: "left", label: "Left" },
                            { value: "center", label: "Center" },
                            { value: "right", label: "Right" },
                        ]}
                        onChange={(align) => onUpdate({ align: align as "left" | "center" | "right" })}
                    />
                </div>
            );

        case "image":
        case "gif":
            return (
                <div className="space-y-4">
                    <TextInput
                        label="Image URL"
                        value={item.props.src}
                        onChange={(src) => onUpdate({ src })}
                        placeholder="https://..."
                    />
                    <TextInput
                        label="Alt Text"
                        value={item.props.alt}
                        onChange={(alt) => onUpdate({ alt })}
                    />
                    <NumberInput
                        label="Width (px)"
                        value={item.props.width || 400}
                        onChange={(width) => onUpdate({ width })}
                        min={50}
                        max={1200}
                    />
                    <SelectInput
                        label="Alignment"
                        value={item.props.align}
                        options={[
                            { value: "left", label: "Left" },
                            { value: "center", label: "Center" },
                            { value: "right", label: "Right" },
                        ]}
                        onChange={(align) => onUpdate({ align: align as "left" | "center" | "right" })}
                    />
                </div>
            );

        case "badge-group":
            return (
                <BadgeGroupEditor
                    badges={item.props.badges}
                    align={item.props.align}
                    onUpdate={(props) => onUpdate(props as Partial<CanvasItem["props"]>)}
                />
            );

        case "tech-stack":
            return (
                <TechStackEditor
                    title={item.props.title}
                    items={item.props.items}
                    onUpdate={(props) => onUpdate(props as Partial<CanvasItem["props"]>)}
                />
            );

        case "github-stats":
            return (
                <div className="space-y-4">
                    <TextInput
                        label="GitHub Username"
                        value={item.props.username}
                        onChange={(username) => onUpdate({ username })}
                        placeholder="octocat"
                    />
                    <SelectInput
                        label="Theme"
                        value={item.props.theme}
                        options={CANVAS_CONFIG.themes.map((t) => ({ value: t, label: t }))}
                        onChange={(theme) => onUpdate({ theme: theme as Theme })}
                    />
                    <CheckboxInput
                        label="Show Stats Card"
                        checked={item.props.showStats}
                        onChange={(showStats) => onUpdate({ showStats })}
                    />
                    <CheckboxInput
                        label="Show Top Languages"
                        checked={item.props.showTopLangs}
                        onChange={(showTopLangs) => onUpdate({ showTopLangs })}
                    />
                    <CheckboxInput
                        label="Show Streak"
                        checked={item.props.showStreak}
                        onChange={(showStreak) => onUpdate({ showStreak })}
                    />
                    <CheckboxInput
                        label="Show Trophies"
                        checked={item.props.showTrophies}
                        onChange={(showTrophies) => onUpdate({ showTrophies })}
                    />
                    <SelectInput
                        label="Layout"
                        value={item.props.layout}
                        options={[
                            { value: "row", label: "Horizontal" },
                            { value: "column", label: "Vertical" },
                        ]}
                        onChange={(layout) => onUpdate({ layout: layout as "row" | "column" })}
                    />
                </div>
            );

        case "contribution-snake":
            return (
                <div className="space-y-4">
                    <TextInput
                        label="GitHub Username"
                        value={item.props.username}
                        onChange={(username) => onUpdate({ username })}
                        placeholder="octocat"
                    />
                    <SelectInput
                        label="Variant"
                        value={item.props.variant}
                        options={[
                            { value: "dark", label: "Dark" },
                            { value: "light", label: "Light" },
                        ]}
                        onChange={(variant) => onUpdate({ variant: variant as "dark" | "light" })}
                    />
                </div>
            );

        case "spacer":
            return (
                <div className="space-y-4">
                    <SelectInput
                        label="Height"
                        value={item.props.height}
                        options={[
                            { value: "xs", label: "Extra Small" },
                            { value: "sm", label: "Small" },
                            { value: "md", label: "Medium" },
                            { value: "lg", label: "Large" },
                            { value: "xl", label: "Extra Large" },
                        ]}
                        onChange={(height) => onUpdate({ height: height as "xs" | "sm" | "md" | "lg" | "xl" })}
                    />
                </div>
            );

        case "divider":
            return (
                <div className="space-y-4">
                    <SelectInput
                        label="Style"
                        value={item.props.style}
                        options={[
                            { value: "line", label: "Solid Line" },
                            { value: "dashed", label: "Dashed" },
                            { value: "dotted", label: "Dotted" },
                            { value: "gradient", label: "Gradient" },
                        ]}
                        onChange={(style) => onUpdate({ style: style as "line" | "dashed" | "dotted" | "gradient" })}
                    />
                    <SelectInput
                        label="Width"
                        value={item.props.width}
                        options={[
                            { value: "full", label: "Full Width" },
                            { value: "half", label: "Half Width" },
                            { value: "third", label: "Third Width" },
                        ]}
                        onChange={(width) => onUpdate({ width: width as "full" | "half" | "third" })}
                    />
                </div>
            );

        case "projects-list":
            return (
                <ProjectsEditor
                    title={item.props.title}
                    projects={item.props.projects}
                    onUpdate={(props) => onUpdate(props as Partial<CanvasItem["props"]>)}
                />
            );

        case "social-links":
            return (
                <SocialLinksEditor
                    title={item.props.title}
                    links={item.props.links}
                    align={item.props.align}
                    onUpdate={(props) => onUpdate(props as Partial<CanvasItem["props"]>)}
                />
            );

        default:
            return (
                <p className="text-sm text-gray-500">
                    Editor not yet implemented for this component type.
                </p>
            );
    }
};

// badge group editor

interface BadgeGroupEditorProps {
    badges: readonly BadgeDef[];
    align: "left" | "center" | "right";
    onUpdate: (props: Partial<{ badges: BadgeDef[]; align: string }>) => void;
}

const BadgeGroupEditor: React.FC<BadgeGroupEditorProps> = ({ badges, align, onUpdate }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeCategory, setActiveCategory] = React.useState<TechCategory | "all">("all");
    const [showCatalog, setShowCatalog] = React.useState(false);

    const badgeNames = React.useMemo(() => new Set(badges.map((b) => b.label)), [badges]);

    const filteredTech = React.useMemo(() => {
        let filtered = [...TECH_CATALOG];

        if (activeCategory !== "all") {
            filtered = filtered.filter((t) => t.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((t) => t.name.toLowerCase().includes(query));
        }

        return filtered.slice(0, 50); // Limit for performance
    }, [activeCategory, searchQuery]);

    const addTech = (tech: TechCatalogItem) => {
        if (badgeNames.has(tech.name)) return;

        const newBadge: BadgeDef = {
            label: tech.name,
            message: "",
            color: tech.color,
            style: "for-the-badge",
            logo: tech.logo,
        };

        onUpdate({ badges: [...badges, newBadge] });
    };

    const removeBadge = (label: string) => {
        onUpdate({ badges: badges.filter((b) => b.label !== label) });
    };

    const categories = Object.entries(TECH_CATEGORIES) as [TechCategory, { name: string; icon: string }][];

    return (
        <div className="space-y-4">
            {/* alignment */}
            <SelectInput
                label="Alignment"
                value={align}
                options={[
                    { value: "left", label: "Left" },
                    { value: "center", label: "Center" },
                    { value: "right", label: "Right" },
                ]}
                onChange={(value) => onUpdate({ align: value as "left" | "center" | "right" })}
            />

            {/* selected badges */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Selected Technologies ({badges.length})
                </label>
                <div className="flex flex-wrap gap-1.5 min-h-[60px] p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    {badges.length === 0 ? (
                        <span className="text-xs text-gray-400 self-center">No technologies selected. Add some below.</span>
                    ) : (
                        badges.map((badge) => (
                            <span
                                key={badge.label}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            >
                                {badge.label}
                                <button
                                    onClick={() => removeBadge(badge.label)}
                                    className="text-blue-500 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </span>
                        ))
                    )}
                </div>
            </div>

            {/* add catalog */}
            <div>
                <button
                    onClick={() => setShowCatalog(!showCatalog)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                    <span>{showCatalog ? "Hide" : "Add"} Technologies</span>
                    <svg className={`w-4 h-4 transition-transform ${showCatalog ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {showCatalog && (
                <div className="space-y-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    {/* search */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search technologies..."
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />

                    {/* categories */}
                    <div className="flex flex-wrap gap-1">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-2 py-1 text-xs rounded ${activeCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                        >
                            All
                        </button>
                        {categories.map(([key, { name, icon }]) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-2 py-1 text-xs rounded ${activeCategory === key ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                            >
                                {icon} {name}
                            </button>
                        ))}
                    </div>

                    {/* tech list */}
                    <div className="max-h-48 overflow-y-auto space-y-1">
                        {filteredTech.length === 0 ? (
                            <p className="text-xs text-gray-400 text-center py-4">No matching technologies found</p>
                        ) : (
                            filteredTech.map((tech) => (
                                <button
                                    key={tech.name}
                                    onClick={() => addTech(tech)}
                                    disabled={badgeNames.has(tech.name)}
                                    className={`w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm rounded ${badgeNames.has(tech.name)
                                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-default"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <span
                                        className="w-3 h-3 rounded-sm flex-shrink-0"
                                        style={{ backgroundColor: `#${tech.color}` }}
                                    />
                                    <span className="flex-1">{tech.name}</span>
                                    {badgeNames.has(tech.name) ? (
                                        <span className="text-xs">✓</span>
                                    ) : (
                                        <span className="text-xs text-gray-400">+</span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// tech stack editor

interface TechStackEditorProps {
    title: string;
    items: readonly TechItem[];
    onUpdate: (props: Partial<{ title: string; items: TechItem[] }>) => void;
}

const TechStackEditor: React.FC<TechStackEditorProps> = ({ title, items, onUpdate }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [activeCategory, setActiveCategory] = React.useState<TechCategory | "all">("all");
    const [showCatalog, setShowCatalog] = React.useState(false);

    const itemNames = React.useMemo(() => new Set(items.map((t) => t.name)), [items]);

    const filteredTech = React.useMemo(() => {
        let filtered = [...TECH_CATALOG];

        if (activeCategory !== "all") {
            filtered = filtered.filter((t) => t.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((t) => t.name.toLowerCase().includes(query));
        }

        return filtered.slice(0, 50);
    }, [activeCategory, searchQuery]);

    const addTech = (tech: TechCatalogItem) => {
        if (itemNames.has(tech.name)) return;

        const newItem: TechItem = {
            name: tech.name,
            category: tech.category,
            icon: tech.logo,
        };

        onUpdate({ items: [...items, newItem] });
    };

    const removeTech = (name: string) => {
        onUpdate({ items: items.filter((t) => t.name !== name) });
    };

    const categories = Object.entries(TECH_CATEGORIES) as [TechCategory, { name: string; icon: string }][];

    return (
        <div className="space-y-4">
            {/* title */}
            <TextInput
                label="Section Title"
                value={title}
                onChange={(value) => onUpdate({ title: value })}
            />

            {/* selected */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Selected Technologies ({items.length})
                </label>
                <div className="flex flex-wrap gap-1.5 min-h-[60px] p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    {items.length === 0 ? (
                        <span className="text-xs text-gray-400 self-center">No technologies selected. Add some below.</span>
                    ) : (
                        items.map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            >
                                {tech.name}
                                <button
                                    onClick={() => removeTech(tech.name)}
                                    className="text-purple-500 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </span>
                        ))
                    )}
                </div>
            </div>

            {/* add catalog */}
            <div>
                <button
                    onClick={() => setShowCatalog(!showCatalog)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30"
                >
                    <span>{showCatalog ? "Hide" : "Add"} Technologies</span>
                    <svg className={`w-4 h-4 transition-transform ${showCatalog ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {showCatalog && (
                <div className="space-y-3 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    {/* search */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search technologies..."
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />

                    {/* categories */}
                    <div className="flex flex-wrap gap-1">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-2 py-1 text-xs rounded ${activeCategory === "all" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                        >
                            All
                        </button>
                        {categories.map(([key, { name }]) => {
                            const IconComponent = TECH_CATEGORY_ICONS[key];
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${activeCategory === key ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                                >
                                    {IconComponent && <IconComponent className="w-3 h-3" />}
                                    {name}
                                </button>
                            );
                        })}
                    </div>

                    {/* tech list */}
                    <div className="max-h-48 overflow-y-auto space-y-1">
                        {filteredTech.length === 0 ? (
                            <p className="text-xs text-gray-400 text-center py-4">No matching technologies found</p>
                        ) : (
                            filteredTech.map((tech) => (
                                <button
                                    key={tech.name}
                                    onClick={() => addTech(tech)}
                                    disabled={itemNames.has(tech.name)}
                                    className={`w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm rounded ${itemNames.has(tech.name)
                                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-default"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <span
                                        className="w-3 h-3 rounded-sm flex-shrink-0"
                                        style={{ backgroundColor: `#${tech.color}` }}
                                    />
                                    <span className="flex-1">{tech.name}</span>
                                    {itemNames.has(tech.name) ? (
                                        <span className="text-xs">✓</span>
                                    ) : (
                                        <span className="text-xs text-gray-400">+</span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================================
// PROJECTS EDITOR
// ============================================================================

interface GitHubRepoResult {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    htmlUrl: string;
    language: string | null;
    stargazersCount: number;
    forksCount: number;
    topics: string[];
}

interface ProjectsEditorProps {
    title: string;
    projects: readonly ProjectDef[];
    onUpdate: (props: Partial<{ title: string; projects: ProjectDef[] }>) => void;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ title, projects, onUpdate }) => {
    const { canvas } = useCanvasStore();
    const [githubUsername, setGithubUsername] = React.useState(canvas.settings.defaultUsername || "");
    const [fetchedRepos, setFetchedRepos] = React.useState<GitHubRepoResult[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [showRepoList, setShowRepoList] = React.useState(false);

    // Track which repos are already added
    const addedRepoUrls = React.useMemo(
        () => new Set(projects.map((p) => p.repoUrl)),
        [projects]
    );

    const fetchRepos = async () => {
        if (!githubUsername.trim()) {
            setError("Please enter a GitHub username");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.github.com/users/${githubUsername.trim()}/repos?sort=updated&direction=desc&per_page=30`,
                {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`User "${githubUsername}" not found`);
                }
                throw new Error("Failed to fetch repositories");
            }

            const data = await response.json();

            // Transform and filter out forks
            const repos: GitHubRepoResult[] = data
                .filter((repo: { fork: boolean }) => !repo.fork)
                .map((repo: Record<string, unknown>) => ({
                    id: repo.id,
                    name: repo.name,
                    fullName: repo.full_name,
                    description: repo.description,
                    htmlUrl: repo.html_url,
                    language: repo.language,
                    stargazersCount: repo.stargazers_count,
                    forksCount: repo.forks_count,
                    topics: repo.topics || [],
                }));

            setFetchedRepos(repos);
            setShowRepoList(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setFetchedRepos([]);
        } finally {
            setIsLoading(false);
        }
    };

    const addProject = (repo: GitHubRepoResult) => {
        if (addedRepoUrls.has(repo.htmlUrl)) return;

        const newProject: ProjectDef = {
            name: repo.name,
            description: repo.description || "No description provided",
            repoUrl: repo.htmlUrl,
            techStack: repo.language ? [repo.language, ...repo.topics.slice(0, 3)] : repo.topics.slice(0, 4),
            stars: repo.stargazersCount,
            forks: repo.forksCount,
        };

        onUpdate({ projects: [...projects, newProject] });
    };

    const removeProject = (repoUrl: string) => {
        onUpdate({ projects: projects.filter((p) => p.repoUrl !== repoUrl) });
    };

    return (
        <div className="space-y-4">
            {/* Section Title */}
            <TextInput
                label="Section Title"
                value={title}
                onChange={(value) => onUpdate({ title: value })}
            />

            {/* GitHub Username Input */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    GitHub Username
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchRepos()}
                        placeholder="octocat"
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                        onClick={fetchRepos}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading
                            </>
                        ) : (
                            "Fetch Repos"
                        )}
                    </button>
                </div>
                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>

            {/* Selected Projects */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Selected Projects ({projects.length})
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {projects.length === 0 ? (
                        <div className="p-3 text-center text-xs text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                            No projects added yet. Fetch repos above to select.
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.repoUrl}
                                className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {project.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                        {project.stars !== undefined && (
                                            <span>⭐ {project.stars}</span>
                                        )}
                                        {project.techStack.length > 0 && (
                                            <span>{project.techStack[0]}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeProject(project.repoUrl)}
                                    className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Available Repos from GitHub */}
            {showRepoList && fetchedRepos.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                            Available Repositories ({fetchedRepos.length})
                        </label>
                        <button
                            onClick={() => setShowRepoList(false)}
                            className="text-xs text-gray-400 hover:text-gray-600"
                        >
                            Hide
                        </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-1 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        {fetchedRepos.map((repo) => {
                            const isAdded = addedRepoUrls.has(repo.htmlUrl);
                            return (
                                <button
                                    key={repo.id}
                                    onClick={() => !isAdded && addProject(repo)}
                                    disabled={isAdded}
                                    className={`w-full text-left p-2 rounded-lg transition-colors ${isAdded
                                        ? "bg-green-50 dark:bg-green-900/20 cursor-default"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {repo.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {repo.description || "No description"}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                                {repo.language && (
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                                                        {repo.language}
                                                    </span>
                                                )}
                                                <span>⭐ {repo.stargazersCount}</span>
                                                <span>🍴 {repo.forksCount}</span>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${isAdded
                                            ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300"
                                            : "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
                                            }`}>
                                            {isAdded ? "Added" : "Add"}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {showRepoList && fetchedRepos.length === 0 && !isLoading && !error && (
                <p className="text-xs text-gray-400 text-center py-2">
                    No public repositories found for this user.
                </p>
            )}
        </div>
    );
};

// ============================================================================
// SOCIAL LINKS EDITOR
// ============================================================================

// Predefined social platforms with icons and URL patterns
const SOCIAL_PLATFORMS = [
    { id: "github", name: "GitHub", icon: "💻", urlPattern: "https://github.com/" },
    { id: "linkedin", name: "LinkedIn", icon: "💼", urlPattern: "https://linkedin.com/in/" },
    { id: "twitter", name: "Twitter/X", icon: "🐦", urlPattern: "https://twitter.com/" },
    { id: "instagram", name: "Instagram", icon: "📸", urlPattern: "https://instagram.com/" },
    { id: "youtube", name: "YouTube", icon: "📺", urlPattern: "https://youtube.com/@" },
    { id: "discord", name: "Discord", icon: "🎮", urlPattern: "" },
    { id: "telegram", name: "Telegram", icon: "✈️", urlPattern: "https://t.me/" },
    { id: "email", name: "Email", icon: "📧", urlPattern: "mailto:" },
    { id: "website", name: "Website", icon: "🌐", urlPattern: "https://" },
    { id: "dev", name: "Dev.to", icon: "📝", urlPattern: "https://dev.to/" },
    { id: "medium", name: "Medium", icon: "✍️", urlPattern: "https://medium.com/@" },
    { id: "reddit", name: "Reddit", icon: "🤖", urlPattern: "https://reddit.com/u/" },
    { id: "twitch", name: "Twitch", icon: "🎬", urlPattern: "https://twitch.tv/" },
    { id: "stackoverflow", name: "Stack Overflow", icon: "📚", urlPattern: "https://stackoverflow.com/users/" },
    { id: "facebook", name: "Facebook", icon: "📘", urlPattern: "https://facebook.com/" },
] as const;

interface SocialLinksEditorProps {
    title: string;
    links: readonly SocialLinkDef[];
    align: "left" | "center" | "right";
    onUpdate: (props: Partial<{ title: string; links: SocialLinkDef[]; align: string }>) => void;
}

const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({ title, links, align, onUpdate }) => {
    const [showPlatformPicker, setShowPlatformPicker] = React.useState(false);

    // Track which platforms are already added
    const addedPlatforms = React.useMemo(
        () => new Set(links.map((l) => l.platform.toLowerCase())),
        [links]
    );

    const addSocialLink = (platform: typeof SOCIAL_PLATFORMS[number]) => {
        const newLink: SocialLinkDef = {
            platform: platform.name,
            url: platform.urlPattern,
            label: platform.name,
        };
        onUpdate({ links: [...links, newLink] });
    };

    const updateLink = (index: number, field: keyof SocialLinkDef, value: string) => {
        const newLinks = links.map((link, i) => {
            if (i === index) {
                return { ...link, [field]: value } as SocialLinkDef;
            }
            return link;
        });
        onUpdate({ links: newLinks as SocialLinkDef[] });
    };

    const removeLink = (index: number) => {
        onUpdate({ links: links.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-4">
            {/* Section Title */}
            <TextInput
                label="Section Title"
                value={title}
                onChange={(value) => onUpdate({ title: value })}
            />

            {/* Alignment */}
            <SelectInput
                label="Alignment"
                value={align}
                options={[
                    { value: "left", label: "Left" },
                    { value: "center", label: "Center" },
                    { value: "right", label: "Right" },
                ]}
                onChange={(value) => onUpdate({ align: value as "left" | "center" | "right" })}
            />

            {/* Current Links */}
            <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Social Links ({links.length})
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {links.length === 0 ? (
                        <div className="p-3 text-center text-xs text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                            No social links added yet. Add some below.
                        </div>
                    ) : (
                        links.map((link, index) => (
                            <div
                                key={index}
                                className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {link.platform}
                                    </span>
                                    <button
                                        onClick={() => removeLink(index)}
                                        className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateLink(index, "url", e.target.value)}
                                    placeholder="Enter URL..."
                                    className="w-full px-2 py-1.5 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Platform Button */}
            <div>
                <button
                    onClick={() => setShowPlatformPicker(!showPlatformPicker)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30"
                >
                    <span>{showPlatformPicker ? "Hide" : "Add"} Social Links</span>
                    <svg className={`w-4 h-4 transition-transform ${showPlatformPicker ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Platform Picker */}
            {showPlatformPicker && (
                <div className="grid grid-cols-2 gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    {SOCIAL_PLATFORMS.map((platform) => {
                        const isAdded = addedPlatforms.has(platform.name.toLowerCase());
                        return (
                            <button
                                key={platform.id}
                                onClick={() => !isAdded && addSocialLink(platform)}
                                disabled={isAdded}
                                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isAdded
                                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-default"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {(() => {
                                    const IconComponent = SOCIAL_PLATFORM_ICONS[platform.id];
                                    return IconComponent ? (
                                        <span className="text-gray-600 dark:text-gray-400">
                                            <IconComponent className="w-4 h-4" />
                                        </span>
                                    ) : null;
                                })()}
                                <span className="truncate">{platform.name}</span>
                                {isAdded && <span className="text-xs ml-auto">✓</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// ============================================================================
// INPUT COMPONENTS
// ============================================================================

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {label}
        </label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
    </div>
);

interface TextareaInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

const TextareaInput: React.FC<TextareaInputProps> = ({ label, value, onChange, rows = 3 }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
        />
    </div>
);

interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, min, max, step = 1 }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {label}
        </label>
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
    </div>
);

interface CheckboxInputProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
);

interface SelectInputProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, value, options, onChange }) => (
    <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {label}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

interface ArrayInputProps {
    label: string;
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

const ArrayInput: React.FC<ArrayInputProps> = ({ label, value, onChange, placeholder }) => {
    const [newItem, setNewItem] = React.useState("");

    const addItem = () => {
        if (newItem.trim()) {
            onChange([...value, newItem.trim()]);
            setNewItem("");
        }
    };

    const removeItem = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                {label}
            </label>
            <div className="space-y-2">
                {value.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newValue = [...value];
                                newValue[index] = e.target.value;
                                onChange(newValue);
                            }}
                            className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />
                        <button
                            onClick={() => removeItem(index)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                        placeholder={placeholder}
                        className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <button
                        onClick={addItem}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Inspector;
