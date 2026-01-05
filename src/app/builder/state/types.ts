/**
 * Builder State Types
 *
 * Types for the visual builder state management.
 */

import type { Template, UserProfile, Section, SectionType } from "@/types";
import type { RenderOutput } from "@/lib/template-engine";

// ============================================================================
// VIEW STATE
// ============================================================================

/** Current view/tab in left panel */
export type LeftPanelView = "templates" | "sections";

/** Current view/tab in right panel */
export type RightPanelView = "profile" | "section-settings";

/** Panel collapse state */
export interface PanelState {
    readonly leftCollapsed: boolean;
    readonly rightCollapsed: boolean;
}

// ============================================================================
// SELECTION STATE
// ============================================================================

/** Currently selected section (if any) */
export interface SectionSelection {
    readonly sectionId: string;
    readonly sectionType: SectionType;
}

// ============================================================================
// BUILDER STATE
// ============================================================================

/** Main builder state */
export interface BuilderState {
    // Data
    readonly template: Template | null;
    readonly profile: UserProfile | null;
    readonly renderOutput: RenderOutput | null;

    // UI State
    readonly leftPanelView: LeftPanelView;
    readonly rightPanelView: RightPanelView;
    readonly panels: PanelState;
    readonly selectedSection: SectionSelection | null;
    readonly previewTheme: "light" | "dark";

    // Status
    readonly isDirty: boolean;
    readonly isRendering: boolean;
    readonly lastRenderTime: number | null;
}

// ============================================================================
// BUILDER ACTIONS
// ============================================================================

/** Builder store actions */
export interface BuilderActions {
    // Template actions
    setTemplate: (template: Template) => void;
    clearTemplate: () => void;

    // Profile actions
    setProfile: (profile: UserProfile) => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
    updateProfileField: <K extends keyof UserProfile>(
        field: K,
        value: UserProfile[K]
    ) => void;

    // Section actions
    toggleSection: (sectionId: string) => void;
    moveSectionUp: (sectionId: string) => void;
    moveSectionDown: (sectionId: string) => void;
    updateSectionConfig: (sectionId: string, config: Partial<Section["config"]>) => void;
    selectSection: (sectionId: string, sectionType: SectionType) => void;
    clearSectionSelection: () => void;

    // Render actions
    triggerRender: () => void;
    setRenderOutput: (output: RenderOutput | null) => void;

    // UI actions
    setLeftPanelView: (view: LeftPanelView) => void;
    setRightPanelView: (view: RightPanelView) => void;
    toggleLeftPanel: () => void;
    toggleRightPanel: () => void;
    setPreviewTheme: (theme: "light" | "dark") => void;

    // Status actions
    markDirty: () => void;
    markClean: () => void;
    reset: () => void;
}

/** Complete builder store type */
export type BuilderStore = BuilderState & BuilderActions;

// ============================================================================
// INITIAL STATE
// ============================================================================

export const INITIAL_BUILDER_STATE: BuilderState = {
    template: null,
    profile: null,
    renderOutput: null,
    leftPanelView: "templates",
    rightPanelView: "profile",
    panels: {
        leftCollapsed: false,
        rightCollapsed: false,
    },
    selectedSection: null,
    previewTheme: "light",
    isDirty: false,
    isRendering: false,
    lastRenderTime: null,
};
