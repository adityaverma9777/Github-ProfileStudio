/**
 * Editor / Builder State Type Definitions
 *
 * Defines the complete state management types for the visual editor
 * Including selection, history, validation, and sync states
 */

import type {
    TemplateId,
    SectionId,
    HexColor,
    ColorScheme,
    ISODateString,
} from "./common";

import type { Template, TemplateStyles } from "./template";
import type { Section, SectionType, SectionBaseConfig } from "./section";
import type { UserProfile } from "./profile";

// ============================================================================
// EDITOR MODES
// ============================================================================

/** Primary editor view mode */
export type EditorMode = "visual" | "code" | "split" | "preview";

/** Preview display mode within editor */
export type PreviewMode = "desktop" | "tablet" | "mobile";

/** Preview theme for light/dark preview */
export type PreviewTheme = ColorScheme;

/** Sidebar panel visibility */
export type SidebarPanel =
    | "sections"
    | "templates"
    | "assets"
    | "settings"
    | "styles"
    | "export"
    | "help";

// ============================================================================
// SELECTION STATE
// ============================================================================

/** Currently active selection in the editor */
export interface EditorSelection {
    readonly selectedSectionId: SectionId | null;
    readonly selectedElementPath: readonly string[]; // Path within section
    readonly multiSelect: readonly SectionId[];
    readonly hoveredSectionId: SectionId | null;
}

/** Selection action types */
export type SelectionAction =
    | { readonly type: "SELECT_SECTION"; readonly sectionId: SectionId }
    | { readonly type: "DESELECT_ALL" }
    | { readonly type: "MULTI_SELECT"; readonly sectionIds: readonly SectionId[] }
    | { readonly type: "HOVER_SECTION"; readonly sectionId: SectionId | null };

// ============================================================================
// EDIT OPERATIONS
// ============================================================================

/** Edit operation types for undo/redo */
export type EditOperationType =
    | "ADD_SECTION"
    | "REMOVE_SECTION"
    | "REORDER_SECTIONS"
    | "UPDATE_SECTION_DATA"
    | "UPDATE_SECTION_CONFIG"
    | "UPDATE_STYLES"
    | "UPDATE_PROFILE"
    | "CHANGE_TEMPLATE"
    | "BATCH_UPDATE";

/** Single edit operation record */
export interface EditOperation {
    readonly id: string;
    readonly type: EditOperationType;
    readonly timestamp: ISODateString;
    readonly description: string;
    readonly previousState: unknown;
    readonly newState: unknown;
    readonly sectionId?: SectionId;
}

/** Edit history for undo/redo */
export interface EditHistory {
    readonly operations: readonly EditOperation[];
    readonly currentIndex: number; // -1 = no operations, can undo up to 0
    readonly maxHistorySize: number;
}

/** History state predicates */
export const canUndo = (history: EditHistory): boolean =>
    history.currentIndex >= 0;

export const canRedo = (history: EditHistory): boolean =>
    history.currentIndex < history.operations.length - 1;

// ============================================================================
// VALIDATION
// ============================================================================

/** Validation severity levels */
export type ValidationSeverity = "error" | "warning" | "info";

/** Validation issue */
export interface ValidationIssue {
    readonly id: string;
    readonly severity: ValidationSeverity;
    readonly message: string;
    readonly path: readonly string[]; // Path to the problematic field
    readonly sectionId?: SectionId;
    readonly suggestion?: string;
    readonly autoFixable: boolean;
}

/** Validation state */
export interface ValidationState {
    readonly isValid: boolean;
    readonly issues: readonly ValidationIssue[];
    readonly lastValidated: ISODateString | null;
    readonly isValidating: boolean;
}

// ============================================================================
// SYNC STATE
// ============================================================================

/** Sync status with backend */
export type SyncStatus =
    | "synced"
    | "syncing"
    | "pending"
    | "error"
    | "offline";

/** Sync state */
export interface SyncState {
    readonly status: SyncStatus;
    readonly lastSyncedAt: ISODateString | null;
    readonly pendingChanges: number;
    readonly error: string | null;
    readonly retryCount: number;
}

// ============================================================================
// DIRTY TRACKING
// ============================================================================

/** Track which parts of the editor have unsaved changes */
export interface DirtyState {
    readonly isDirty: boolean;
    readonly dirtySections: readonly SectionId[];
    readonly dirtyPaths: readonly string[];
    readonly lastModified: ISODateString | null;
    readonly lastSaved: ISODateString | null;
}

// ============================================================================
// PANEL CONFIGURATION
// ============================================================================

/** Panel visibility and sizing */
export interface PanelConfig {
    readonly leftSidebar: {
        readonly visible: boolean;
        readonly width: number;
        readonly activePanel: SidebarPanel;
        readonly collapsedPanels: readonly SidebarPanel[];
    };
    readonly rightSidebar: {
        readonly visible: boolean;
        readonly width: number;
        readonly activePanel: "properties" | "inspector" | "layers";
    };
    readonly bottomPanel: {
        readonly visible: boolean;
        readonly height: number;
        readonly activeTab: "console" | "output" | "validation";
    };
    readonly preview: {
        readonly visible: boolean;
        readonly mode: PreviewMode;
        readonly theme: PreviewTheme;
        readonly zoom: number;
    };
}

/** Default panel configuration */
export const DEFAULT_PANEL_CONFIG: PanelConfig = {
    leftSidebar: {
        visible: true,
        width: 280,
        activePanel: "sections",
        collapsedPanels: [],
    },
    rightSidebar: {
        visible: true,
        width: 320,
        activePanel: "properties",
    },
    bottomPanel: {
        visible: false,
        height: 200,
        activeTab: "output",
    },
    preview: {
        visible: true,
        mode: "desktop",
        theme: "system",
        zoom: 100,
    },
} as const;

// ============================================================================
// EDITOR PREFERENCES
// ============================================================================

/** User preferences for the editor */
export interface EditorPreferences {
    readonly theme: ColorScheme;
    readonly fontSize: number;
    readonly fontFamily: string;
    readonly showLineNumbers: boolean;
    readonly wordWrap: boolean;
    readonly autoSave: boolean;
    readonly autoSaveInterval: number; // milliseconds
    readonly autoValidate: boolean;
    readonly showHints: boolean;
    readonly showGuidelines: boolean;
    readonly snapToGrid: boolean;
    readonly gridSize: number;
    readonly confirmOnDelete: boolean;
    readonly keyboardShortcutsEnabled: boolean;
}

/** Default editor preferences */
export const DEFAULT_EDITOR_PREFERENCES: EditorPreferences = {
    theme: "system",
    fontSize: 14,
    fontFamily: "JetBrains Mono",
    showLineNumbers: true,
    wordWrap: true,
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    autoValidate: true,
    showHints: true,
    showGuidelines: true,
    snapToGrid: true,
    gridSize: 8,
    confirmOnDelete: true,
    keyboardShortcutsEnabled: true,
} as const;

// ============================================================================
// DRAG AND DROP
// ============================================================================

/** Drag source types */
export type DragSourceType =
    | "section"
    | "section-template"
    | "asset"
    | "external";

/** Drag state */
export interface DragState {
    readonly isDragging: boolean;
    readonly sourceType: DragSourceType | null;
    readonly sourceId: string | null;
    readonly dropTargetId: string | null;
    readonly dropPosition: "before" | "after" | "inside" | null;
}

// ============================================================================
// CLIPBOARD
// ============================================================================

/** Clipboard content types */
export type ClipboardContentType = "section" | "sections" | "style" | "text";

/** Clipboard state */
export interface ClipboardState {
    readonly contentType: ClipboardContentType | null;
    readonly content: unknown | null;
    readonly sourceId: string | null;
    readonly copiedAt: ISODateString | null;
}

// ============================================================================
// DOCUMENT STATE
// ============================================================================

/** The document being edited */
export interface EditorDocument {
    readonly id: string;
    readonly name: string;
    readonly template: Template;
    readonly sections: readonly Section[];
    readonly styles: TemplateStyles;
    readonly profile: UserProfile;
    readonly createdAt: ISODateString;
    readonly updatedAt: ISODateString;
}

// ============================================================================
// ACTIONS
// ============================================================================

/** Section action types */
export type SectionAction =
    | { readonly type: "ADD"; readonly sectionType: SectionType; readonly position?: number }
    | { readonly type: "REMOVE"; readonly sectionId: SectionId }
    | { readonly type: "DUPLICATE"; readonly sectionId: SectionId }
    | { readonly type: "MOVE"; readonly sectionId: SectionId; readonly toPosition: number }
    | { readonly type: "TOGGLE_ENABLED"; readonly sectionId: SectionId }
    | { readonly type: "UPDATE_DATA"; readonly sectionId: SectionId; readonly data: Partial<unknown> }
    | { readonly type: "UPDATE_CONFIG"; readonly sectionId: SectionId; readonly config: Partial<SectionBaseConfig> };

/** Style action types */
export type StyleAction =
    | { readonly type: "UPDATE_COLORS"; readonly colors: Partial<Record<string, HexColor>> }
    | { readonly type: "UPDATE_FONTS"; readonly fonts: Partial<TemplateStyles["fonts"]> }
    | { readonly type: "SET_THEME"; readonly theme: ColorScheme }
    | { readonly type: "RESET_STYLES" };

// ============================================================================
// COMPLETE EDITOR STATE
// ============================================================================

/** Complete editor state */
export interface EditorState {
    // Core document
    readonly document: EditorDocument;

    // View state
    readonly mode: EditorMode;
    readonly panels: PanelConfig;
    readonly preferences: EditorPreferences;

    // Interaction state
    readonly selection: EditorSelection;
    readonly drag: DragState;
    readonly clipboard: ClipboardState;

    // Change tracking
    readonly dirty: DirtyState;
    readonly history: EditHistory;

    // Status
    readonly validation: ValidationState;
    readonly sync: SyncState;

    // UI state
    readonly isLoading: boolean;
    readonly isSaving: boolean;
    readonly isExporting: boolean;
    readonly activeModal: string | null;
    readonly toasts: readonly {
        readonly id: string;
        readonly type: "success" | "error" | "warning" | "info";
        readonly message: string;
        readonly duration?: number;
    }[];
}

/** Editor state for initialization */
export interface EditorStateInput {
    readonly document: EditorDocument;
    readonly preferences?: Partial<EditorPreferences>;
    readonly panels?: Partial<PanelConfig>;
}

// ============================================================================
// EXPORT OPTIONS
// ============================================================================

/** Markdown export configuration */
export interface MarkdownExportOptions {
    readonly includeHtmlComments: boolean;
    readonly includeMetadata: boolean;
    readonly minify: boolean;
    readonly lineEnding: "lf" | "crlf";
    readonly imageHosting: "github" | "cdn" | "relative";
}

/** HTML export configuration */
export interface HtmlExportOptions {
    readonly includeStyles: boolean;
    readonly inlineStyles: boolean;
    readonly includeScripts: boolean;
    readonly minify: boolean;
    readonly doctype: boolean;
}

/** Image export configuration */
export interface ImageExportOptions {
    readonly format: "png" | "jpg" | "webp" | "svg";
    readonly width: number;
    readonly height: number;
    readonly scale: number;
    readonly quality: number; // 0-100 for jpg/webp
    readonly transparent: boolean;
}

/** All export options */
export interface ExportOptions {
    readonly markdown: MarkdownExportOptions;
    readonly html: HtmlExportOptions;
    readonly image: ImageExportOptions;
}

/** Default export options */
export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
    markdown: {
        includeHtmlComments: false,
        includeMetadata: false,
        minify: false,
        lineEnding: "lf",
        imageHosting: "github",
    },
    html: {
        includeStyles: true,
        inlineStyles: true,
        includeScripts: false,
        minify: false,
        doctype: true,
    },
    image: {
        format: "png",
        width: 1200,
        height: 630,
        scale: 2,
        quality: 90,
        transparent: false,
    },
} as const;

// ============================================================================
// TYPE GUARDS
// ============================================================================

export const isDirty = (state: EditorState): boolean => state.dirty.isDirty;

export const hasSelection = (state: EditorState): boolean =>
    state.selection.selectedSectionId !== null;

export const hasMultiSelection = (state: EditorState): boolean =>
    state.selection.multiSelect.length > 1;

export const isValidDocument = (state: EditorState): boolean =>
    state.validation.isValid;

export const isSynced = (state: EditorState): boolean =>
    state.sync.status === "synced";

export const hasUnsavedChanges = (state: EditorState): boolean =>
    state.dirty.isDirty || state.sync.status === "pending";
