// preview panel

"use client";

import React from "react";
import Link from "next/link";
import { useBuilderStore } from "../state";
import { PreviewRenderer } from "@/components/preview";
import { TEMPLATE_REGISTRY } from "@/data/templates";

export const PreviewPanel: React.FC = () => {
    const {
        renderOutput,
        isRendering,
        lastRenderTime,
        previewTheme,
        setPreviewTheme,
        toggleLeftPanel,
        panels,
        template,
    } = useBuilderStore();

    // find template slug for edit link
    const templateSlug = template
        ? TEMPLATE_REGISTRY.find(
            (t) => t.template.metadata.id === (template as unknown as { metadata?: { id?: string } }).metadata?.id
        )?.slug
        : null;

    return (
        <div className="flex flex-col h-full">
            {/* toolbar */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2">
                    {/* toggle */}
                    <button
                        onClick={toggleLeftPanel}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title={panels.leftCollapsed ? "Show left panel" : "Hide left panel"}
                    >
                        <svg
                            className="w-4 h-4 text-gray-600 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {panels.leftCollapsed ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            )}
                        </svg>
                    </button>

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {template ? (template as unknown as { metadata?: { name?: string } }).metadata?.name ?? "Template" : "No template selected"}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* render time */}
                    {lastRenderTime !== null && (
                        <span className="text-xs text-gray-500">
                            {lastRenderTime.toFixed(1)}ms
                        </span>
                    )}

                    {/* theme toggle */}
                    <div className="flex items-center gap-1 group relative">
                        <button
                            onClick={() => setPreviewTheme(previewTheme === "light" ? "dark" : "light")}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="Preview only - GitHub adapts to viewer's theme"
                        >
                            {previewTheme === "light" ? (
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>
                        <span className="text-xs text-gray-400 hidden sm:inline">Preview only</span>
                        {/* tooltip */}
                        <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            GitHub will display your README in the viewer's preferred theme automatically.
                        </div>
                    </div>

                    {/* use template btn */}
                    {templateSlug && (
                        <Link
                            href={`/builder/custom?template=${templateSlug}`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Use This Template
                        </Link>
                    )}
                </div>
            </div>

            {/* preview */}
            <div className="flex-1 overflow-auto p-6">
                <div
                    className={`
            max-w-4xl mx-auto rounded-lg shadow-sm border
            ${previewTheme === "dark"
                            ? "bg-gray-900 border-gray-700"
                            : "bg-white border-gray-200"
                        }
          `}
                >
                    {isRendering && (
                        <div className="p-8 text-center text-gray-500">
                            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                            <p className="text-sm">Rendering...</p>
                        </div>
                    )}

                    {!isRendering && !renderOutput && (
                        <div className="p-16 text-center">
                            <p className="text-xl font-medium text-gray-400 dark:text-gray-500">
                                Select a template to preview
                            </p>
                        </div>
                    )}

                    {!isRendering && renderOutput && (
                        <div className="p-6">
                            <PreviewRenderer output={renderOutput} theme={previewTheme} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

