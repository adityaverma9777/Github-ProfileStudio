// builder store - zustand state management

"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { Template, UserProfile, Section, SectionType } from "@/types";
import type { RenderOutput } from "@/lib/template-engine";
import { render } from "@/lib/template-engine";
import type { BuilderStore, BuilderState, SectionSelection } from "./types";
import { INITIAL_BUILDER_STATE } from "./types";

// store

export const useBuilderStore = create<BuilderStore>((set, get) => ({
    // Initial state
    ...INITIAL_BUILDER_STATE,

    // template

    setTemplate: (template: Template) => {
        set({ template, isDirty: true, leftPanelView: "sections" });
        // Defer render to avoid state update during render
        queueMicrotask(() => get().triggerRender());
    },

    clearTemplate: () => {
        set({
            template: null,
            renderOutput: null,
            selectedSection: null,
            leftPanelView: "templates",
        });
    },

    // profile

    setProfile: (profile: UserProfile) => {
        set({ profile, isDirty: true });
        queueMicrotask(() => get().triggerRender());
    },

    updateProfile: (updates: Partial<UserProfile>) => {
        const { profile } = get();
        if (!profile) return;

        set({
            profile: { ...profile, ...updates },
            isDirty: true,
        });
        queueMicrotask(() => get().triggerRender());
    },

    updateProfileField: <K extends keyof UserProfile>(
        field: K,
        value: UserProfile[K]
    ) => {
        const { profile } = get();
        if (!profile) return;

        set({
            profile: { ...profile, [field]: value },
            isDirty: true,
        });
        queueMicrotask(() => get().triggerRender());
    },

    // sections

    toggleSection: (sectionId: string) => {
        const { template } = get();
        if (!template) return;

        const updatedSections = template.sections.map((section: Section) =>
            section.id === sectionId
                ? { ...section, enabled: !section.enabled } as Section
                : section
        );

        set({
            template: { ...template, sections: updatedSections },
            isDirty: true,
        });
        queueMicrotask(() => get().triggerRender());
    },

    moveSectionUp: (sectionId: string) => {
        const { template } = get();
        if (!template) return;

        const sections = [...template.sections] as Section[];
        const index = sections.findIndex((s) => s.id === sectionId);
        if (index <= 0) return;

        // swap
        const prev = sections[index - 1];
        const curr = sections[index];
        if (prev && curr) {
            sections[index - 1] = curr;
            sections[index] = prev;
        }

        // update order
        const updatedSections = sections.map((s, i) => ({ ...s, order: i } as Section));

        set({
            template: { ...template, sections: updatedSections } as Template,
            isDirty: true,
        });
        queueMicrotask(() => get().triggerRender());
    },

    moveSectionDown: (sectionId: string) => {
        const { template } = get();
        if (!template) return;

        const sections = [...template.sections] as Section[];
        const index = sections.findIndex((s) => s.id === sectionId);
        if (index === -1 || index >= sections.length - 1) return;

        // swap
        const curr = sections[index];
        const next = sections[index + 1];
        if (curr && next) {
            sections[index] = next;
            sections[index + 1] = curr;
        }

        // update order
        const updatedSections = sections.map((s, i) => ({ ...s, order: i } as Section));

        set({
            template: { ...template, sections: updatedSections } as Template,
            isDirty: true,
        });
        queueMicrotask(() => get().triggerRender());
    },

    updateSectionConfig: (sectionId: string, config: Partial<Section["config"]>) => {
        const { template } = get();
        if (!template) return;

        const updatedSections = template.sections.map((section: Section) =>
            section.id === sectionId
                ? ({ ...section, config: { ...section.config, ...config } } as Section)
                : section
        );

        set({
            template: { ...template, sections: updatedSections } as Template,
            isDirty: true,
        });
        queueMicrotask(() => get().triggerRender());
    },

    selectSection: (sectionId: string, sectionType: SectionType) => {
        set({
            selectedSection: { sectionId, sectionType },
            rightPanelView: "section-settings",
        });
    },

    clearSectionSelection: () => {
        set({
            selectedSection: null,
            rightPanelView: "profile",
        });
    },

    // render

    triggerRender: () => {
        const { template, profile, previewTheme } = get();
        if (!template || !profile) {
            set({ renderOutput: null, isRendering: false });
            return;
        }

        set({ isRendering: true });
        const startTime = performance.now();

        try {
            const result = render(template, profile, {
                theme: previewTheme === "dark" ? "dark" : "light",
                skipValidation: true, // Skip strict validation for builder preview
                continueOnError: true, // Continue rendering even if some sections fail
            });

            if (result.success) {
                set({
                    renderOutput: result.output,
                    lastRenderTime: performance.now() - startTime,
                    isRendering: false,
                });
            } else {
                // Handle errors gracefully
                console.error("Render failed:", result.errors);
                set({ renderOutput: null, isRendering: false });
            }
        } catch (error) {
            console.error("Render error:", error);
            set({ isRendering: false });
        }
    },

    setRenderOutput: (output: RenderOutput | null) => {
        set({ renderOutput: output });
    },

    // ui

    setLeftPanelView: (view) => set({ leftPanelView: view }),
    setRightPanelView: (view) => set({ rightPanelView: view }),

    toggleLeftPanel: () => {
        set((state) => ({
            panels: {
                ...state.panels,
                leftCollapsed: !state.panels.leftCollapsed,
            },
        }));
    },

    toggleRightPanel: () => {
        set((state) => ({
            panels: {
                ...state.panels,
                rightCollapsed: !state.panels.rightCollapsed,
            },
        }));
    },

    setPreviewTheme: (theme) => {
        set({ previewTheme: theme });
        queueMicrotask(() => get().triggerRender());
    },

    // status

    markDirty: () => set({ isDirty: true }),
    markClean: () => set({ isDirty: false }),

    reset: () => set(INITIAL_BUILDER_STATE),
}));

// selectors

// sorted sections
export const useSortedSections = () => {
    return useBuilderStore(
        useShallow((state) => {
            if (!state.template) return [];
            // Return sorted array - useShallow will shallow compare
            return [...state.template.sections].sort((a, b) => a.order - b.order);
        })
    );
};

// selected section id
export const useSelectedSectionId = () => {
    return useBuilderStore((state) => state.selectedSection?.sectionId ?? null);
};

// section by id
export const useSectionById = (sectionId: string | null) => {
    return useBuilderStore((state) => {
        if (!state.template || !sectionId) return undefined;
        return state.template.sections.find((s: Section) => s.id === sectionId);
    });
};

// selected section data
export const useSelectedSectionData = () => {
    const sectionId = useSelectedSectionId();
    return useSectionById(sectionId);
};

// section support check
export const useSectionSupport = (sectionType: SectionType) => {
    return useBuilderStore((state) => {
        if (!state.template) return false;
        return state.template.capabilities.supportedSections.includes(sectionType);
    });
};
