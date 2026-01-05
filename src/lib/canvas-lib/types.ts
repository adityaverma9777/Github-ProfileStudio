/**
 * Canvas Library - Types
 * 
 * Type definitions for the canvas-based README builder.
 * Uses discriminated unions for type-safe item handling.
 */

import type { Theme, BadgeStyle } from "./config";

// ============================================================================
// CANVAS ITEM TYPES (Discriminated Union)
// ============================================================================

/** Typing Hero component - animated typing text */
export interface TypingHeroItem {
    readonly type: "typing-hero";
    readonly id: string;
    readonly props: {
        readonly lines: readonly string[];
        readonly center: boolean;
        readonly color: string;
        readonly size: number;
        readonly pause: number;
    };
}

/** Static Hero component - headline and subheading */
export interface StaticHeroItem {
    readonly type: "static-hero";
    readonly id: string;
    readonly props: {
        readonly headline: string;
        readonly subheadline: string;
        readonly align: "left" | "center" | "right";
    };
}

/** Text Block component - rich text paragraph */
export interface TextBlockItem {
    readonly type: "text-block";
    readonly id: string;
    readonly props: {
        readonly content: string;
        readonly align: "left" | "center" | "right";
    };
}

/** Heading component */
export interface HeadingItem {
    readonly type: "heading";
    readonly id: string;
    readonly props: {
        readonly text: string;
        readonly level: 1 | 2 | 3 | 4 | 5 | 6;
        readonly align: "left" | "center" | "right";
    };
}

/** Image component */
export interface ImageItem {
    readonly type: "image";
    readonly id: string;
    readonly props: {
        readonly src: string;
        readonly alt: string;
        readonly width?: number;
        readonly height?: number;
        readonly align: "left" | "center" | "right";
    };
}

/** GIF component */
export interface GifItem {
    readonly type: "gif";
    readonly id: string;
    readonly props: {
        readonly src: string;
        readonly alt: string;
        readonly width?: number;
        readonly align: "left" | "center" | "right";
    };
}

/** Badge definition */
export interface BadgeDef {
    readonly label: string;
    readonly message: string;
    readonly color: string;
    readonly logo?: string;
    readonly style: BadgeStyle;
}

/** Badge Group component */
export interface BadgeGroupItem {
    readonly type: "badge-group";
    readonly id: string;
    readonly props: {
        readonly badges: readonly BadgeDef[];
        readonly align: "left" | "center" | "right";
    };
}

/** Tech Stack item */
export interface TechItem {
    readonly name: string;
    readonly category: string;
    readonly icon?: string;
}

/** Tech Stack component */
export interface TechStackItem {
    readonly type: "tech-stack";
    readonly id: string;
    readonly props: {
        readonly title: string;
        readonly items: readonly TechItem[];
        readonly displayStyle: "badges" | "icons" | "list";
        readonly badgeStyle: BadgeStyle;
        readonly groupByCategory: boolean;
    };
}

/** Project definition */
export interface ProjectDef {
    readonly name: string;
    readonly description: string;
    readonly repoUrl: string;
    readonly demoUrl?: string;
    readonly techStack: readonly string[];
    readonly stars?: number;
    readonly forks?: number;
}

/** Projects List component */
export interface ProjectsListItem {
    readonly type: "projects-list";
    readonly id: string;
    readonly props: {
        readonly title: string;
        readonly projects: readonly ProjectDef[];
        readonly displayStyle: "cards" | "list" | "table";
        readonly maxProjects: number;
    };
}

/** GitHub Stats component */
export interface GitHubStatsItem {
    readonly type: "github-stats";
    readonly id: string;
    readonly props: {
        readonly username: string;
        readonly showStats: boolean;
        readonly showTopLangs: boolean;
        readonly showStreak: boolean;
        readonly showTrophies: boolean;
        readonly theme: Theme;
        readonly layout: "row" | "column";
    };
}

/** Contribution Snake component */
export interface ContributionSnakeItem {
    readonly type: "contribution-snake";
    readonly id: string;
    readonly props: {
        readonly username: string;
        readonly variant: "dark" | "light";
    };
}

/** Social link definition */
export interface SocialLinkDef {
    readonly platform: string;
    readonly url: string;
    readonly label?: string;
}

/** Social Links component */
export interface SocialLinksItem {
    readonly type: "social-links";
    readonly id: string;
    readonly props: {
        readonly title: string;
        readonly links: readonly SocialLinkDef[];
        readonly displayStyle: "badges" | "icons" | "text";
        readonly align: "left" | "center" | "right";
    };
}

/** Spacer component */
export interface SpacerItem {
    readonly type: "spacer";
    readonly id: string;
    readonly props: {
        readonly height: "xs" | "sm" | "md" | "lg" | "xl";
    };
}

/** Divider component */
export interface DividerItem {
    readonly type: "divider";
    readonly id: string;
    readonly props: {
        readonly style: "line" | "dashed" | "dotted" | "gradient";
        readonly width: "full" | "half" | "third";
    };
}

// ============================================================================
// CANVAS ITEM UNION
// ============================================================================

/** Discriminated union of all canvas item types */
export type CanvasItem =
    | TypingHeroItem
    | StaticHeroItem
    | TextBlockItem
    | HeadingItem
    | ImageItem
    | GifItem
    | BadgeGroupItem
    | TechStackItem
    | ProjectsListItem
    | GitHubStatsItem
    | ContributionSnakeItem
    | SocialLinksItem
    | SpacerItem
    | DividerItem;

/** Extract item type string */
export type CanvasItemType = CanvasItem["type"];

// ============================================================================
// CANVAS STRUCTURE
// ============================================================================

/** Canvas metadata */
export interface CanvasMetadata {
    readonly name: string;
    readonly description: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly version: number;
}

/** Complete canvas state */
export interface Canvas {
    readonly id: string;
    readonly metadata: CanvasMetadata;
    readonly items: readonly CanvasItem[];
    readonly settings: CanvasSettings;
}

/** Canvas-level settings */
export interface CanvasSettings {
    readonly defaultUsername: string;
    readonly theme: Theme;
    readonly showPoweredBy: boolean;
}

// ============================================================================
// CANVAS STORE STATE
// ============================================================================

/** Canvas store state */
export interface CanvasState {
    readonly canvas: Canvas;
    readonly selectedItemId: string | null;
    readonly isDirty: boolean;
    readonly lastSavedAt: string | null;
}

/** Canvas store actions */
export interface CanvasActions {
    // Item management
    addItem: (item: CanvasItem, index?: number) => void;
    removeItem: (id: string) => void;
    moveUp: (id: string) => void;
    moveDown: (id: string) => void;
    updateItemProps: <T extends CanvasItem>(id: string, props: Partial<T["props"]>) => void;
    duplicateItem: (id: string) => void;

    // Selection
    selectItem: (id: string | null) => void;

    // Canvas operations
    updateSettings: (settings: Partial<CanvasSettings>) => void;
    updateMetadata: (metadata: Partial<CanvasMetadata>) => void;
    clearCanvas: () => void;
    loadCanvas: (canvas: Canvas) => void;

    // Persistence
    saveToLocal: () => void;
    loadFromLocal: () => boolean;
    exportToJson: () => string;
    importFromJson: (json: string) => boolean;
}

/** Complete canvas store type */
export type CanvasStore = CanvasState & CanvasActions;

// ============================================================================
// HELPER TYPES
// ============================================================================

/** Generate unique ID */
export function generateItemId(type: CanvasItemType): string {
    return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Type guard for canvas item types */
export function isCanvasItemType(type: string): type is CanvasItemType {
    const validTypes: CanvasItemType[] = [
        "typing-hero",
        "static-hero",
        "text-block",
        "heading",
        "image",
        "gif",
        "badge-group",
        "tech-stack",
        "projects-list",
        "github-stats",
        "contribution-snake",
        "social-links",
        "spacer",
        "divider",
    ];
    return validTypes.includes(type as CanvasItemType);
}
