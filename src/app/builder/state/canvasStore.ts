// canvas store - custom builder state

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Canvas, CanvasItem, CanvasSettings, CanvasStore, CanvasState } from "@/lib/canvas-lib/types";

// initial state

const createInitialCanvas = (): Canvas => ({
    id: `canvas-${Date.now()}`,
    metadata: {
        name: "My Custom README",
        description: "Custom README built with GitHub Profile Studio",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
    },
    items: [],
    settings: {
        defaultUsername: "your-github-username",
        theme: "radical",
        showPoweredBy: true,
    },
});

const INITIAL_STATE: CanvasState = {
    canvas: createInitialCanvas(),
    selectedItemId: null,
    isDirty: false,
    lastSavedAt: null,
};

// store

export const useCanvasStore = create<CanvasStore>()(
    persist(
        (set, get) => ({
            ...INITIAL_STATE,

            // item management

            addItem: (item: CanvasItem, index?: number) => {
                set((state) => {
                    const items = [...state.canvas.items];
                    if (index !== undefined && index >= 0 && index <= items.length) {
                        items.splice(index, 0, item);
                    } else {
                        items.push(item);
                    }

                    return {
                        canvas: {
                            ...state.canvas,
                            items,
                            metadata: {
                                ...state.canvas.metadata,
                                updatedAt: new Date().toISOString(),
                            },
                        },
                        selectedItemId: item.id,
                        isDirty: true,
                    };
                });
            },

            removeItem: (id: string) => {
                set((state) => {
                    const items = state.canvas.items.filter((item) => item.id !== id);
                    return {
                        canvas: {
                            ...state.canvas,
                            items,
                            metadata: {
                                ...state.canvas.metadata,
                                updatedAt: new Date().toISOString(),
                            },
                        },
                        selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
                        isDirty: true,
                    };
                });
            },

            moveUp: (id: string) => {
                set((state) => {
                    const items = [...state.canvas.items];
                    const index = items.findIndex((item) => item.id === id);
                    if (index <= 0) return state;

                    // swap
                    [items[index - 1], items[index]] = [items[index]!, items[index - 1]!];

                    return {
                        canvas: {
                            ...state.canvas,
                            items,
                            metadata: {
                                ...state.canvas.metadata,
                                updatedAt: new Date().toISOString(),
                            },
                        },
                        isDirty: true,
                    };
                });
            },

            moveDown: (id: string) => {
                set((state) => {
                    const items = [...state.canvas.items];
                    const index = items.findIndex((item) => item.id === id);
                    if (index === -1 || index >= items.length - 1) return state;

                    // swap
                    [items[index], items[index + 1]] = [items[index + 1]!, items[index]!];

                    return {
                        canvas: {
                            ...state.canvas,
                            items,
                            metadata: {
                                ...state.canvas.metadata,
                                updatedAt: new Date().toISOString(),
                            },
                        },
                        isDirty: true,
                    };
                });
            },

            updateItemProps: <T extends CanvasItem>(id: string, props: Partial<T["props"]>) => {
                set((state) => {
                    const items = state.canvas.items.map((item) => {
                        if (item.id !== id) return item;
                        return {
                            ...item,
                            props: { ...item.props, ...props },
                        } as CanvasItem;
                    });

                    return {
                        canvas: {
                            ...state.canvas,
                            items,
                            metadata: {
                                ...state.canvas.metadata,
                                updatedAt: new Date().toISOString(),
                            },
                        },
                        isDirty: true,
                    };
                });
            },

            duplicateItem: (id: string) => {
                const state = get();
                const item = state.canvas.items.find((i) => i.id === id);
                if (!item) return;

                const newId = `${item.type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                const index = state.canvas.items.findIndex((i) => i.id === id);

                const duplicated = {
                    ...item,
                    id: newId,
                    props: { ...item.props },
                } as CanvasItem;

                get().addItem(duplicated, index + 1);
            },

            // selection

            selectItem: (id: string | null) => {
                set({ selectedItemId: id });
            },

            // canvas ops

            updateSettings: (settings: Partial<CanvasSettings>) => {
                set((state) => ({
                    canvas: {
                        ...state.canvas,
                        settings: { ...state.canvas.settings, ...settings },
                        metadata: {
                            ...state.canvas.metadata,
                            updatedAt: new Date().toISOString(),
                        },
                    },
                    isDirty: true,
                }));
            },

            updateMetadata: (metadata: Partial<Canvas["metadata"]>) => {
                set((state) => ({
                    canvas: {
                        ...state.canvas,
                        metadata: {
                            ...state.canvas.metadata,
                            ...metadata,
                            updatedAt: new Date().toISOString(),
                        },
                    },
                    isDirty: true,
                }));
            },

            clearCanvas: () => {
                set({
                    canvas: createInitialCanvas(),
                    selectedItemId: null,
                    isDirty: true,
                });
            },

            loadCanvas: (canvas: Canvas) => {
                set({
                    canvas,
                    selectedItemId: null,
                    isDirty: false,
                    lastSavedAt: new Date().toISOString(),
                });
            },

            // persistence

            saveToLocal: () => {
                const now = new Date().toISOString();
                set({ isDirty: false, lastSavedAt: now });
            },

            loadFromLocal: (): boolean => {
                // persist middleware handles this
                return true;
            },

            exportToJson: (): string => {
                const { canvas } = get();
                return JSON.stringify(canvas, null, 2);
            },

            importFromJson: (json: string): boolean => {
                try {
                    const parsed = JSON.parse(json) as Canvas;
                    if (!parsed.id || !parsed.items || !parsed.settings) {
                        return false;
                    }
                    get().loadCanvas(parsed);
                    return true;
                } catch {
                    return false;
                }
            },
        }),
        {
            name: "canvas-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                canvas: state.canvas,
                lastSavedAt: state.lastSavedAt,
            }),
        }
    )
);

// selectors

// get selected item
export const useSelectedItem = () => {
    return useCanvasStore((state) => {
        if (!state.selectedItemId) return null;
        return state.canvas.items.find((item) => item.id === state.selectedItemId) ?? null;
    });
};

// get item by id
export const useCanvasItem = (id: string) => {
    return useCanvasStore((state) =>
        state.canvas.items.find((item) => item.id === id)
    );
};

// item count
export const useItemCount = () => {
    return useCanvasStore((state) => state.canvas.items.length);
};
