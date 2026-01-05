// main custom builder component

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Toolbox } from "./Toolbox";
import { Canvas } from "./Canvas";
import { Inspector } from "./Inspector";
import { useCanvasStore } from "@/app/builder/state/canvasStore";
import { exportCanvasToMarkdown, downloadMarkdown, downloadCanvasJson } from "@/lib/exporter";
import { templateToCanvas } from "@/lib/canvas-lib";
import { getTemplateBySlug } from "@/data/templates";

export const CustomBuilder: React.FC = () => {
    const { canvas, clearCanvas, loadCanvas, isDirty } = useCanvasStore();
    const [showPreview, setShowPreview] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);
    const [previewMarkdown, setPreviewMarkdown] = useState<string>("");
    const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
    const [loadedTemplateName, setLoadedTemplateName] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const templateSlug = searchParams.get("template");

    // load template if url has ?template=slug
    useEffect(() => {
        if (!templateSlug) {
            return;
        }

        setIsLoadingTemplate(true);

        // small delay for smooth transition
        const timer = setTimeout(() => {
            const templateData = getTemplateBySlug(templateSlug);

            if (templateData) {
                // convert and load
                const convertedCanvas = templateToCanvas(
                    templateData.template,
                    templateData.name
                );

                // put in store
                loadCanvas(convertedCanvas);
                setLoadedTemplateName(templateData.name);
            }

            setIsLoadingTemplate(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [templateSlug, loadCanvas]);

    const handleExportReadme = () => {
        setExportError(null);
        const result = exportCanvasToMarkdown(canvas);

        if (!result.success) {
            setExportError(result.errors.join(", "));
            return;
        }

        downloadMarkdown(result.markdown, "README.md");
    };

    const handleExportJson = () => {
        downloadCanvasJson(canvas, `${canvas.metadata.name.toLowerCase().replace(/\s+/g, "-")}.json`);
    };

    const handlePreview = () => {
        setExportError(null);
        const result = exportCanvasToMarkdown(canvas);

        if (!result.success) {
            setExportError(result.errors.join(", "));
            return;
        }

        setPreviewMarkdown(result.markdown);
        setShowPreview(true);
    };

    const handleClearCanvas = () => {
        if (canvas.items.length === 0) return;
        if (window.confirm("Are you sure you want to clear all components? This cannot be undone.")) {
            clearCanvas();
            setLoadedTemplateName(null);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-gray-100 dark:bg-gray-950">
            {/* toolbar */}
            <header className="flex-none h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/builder"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-medium">Browse Templates</span>
                    </Link>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {loadedTemplateName ? `Editing: ${loadedTemplateName}` : "Custom Builder"}
                    </h1>
                    {isDirty && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                            Unsaved changes
                        </span>
                    )}
                    {loadedTemplateName && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                            From template
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleClearCanvas}
                        disabled={canvas.items.length === 0}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handlePreview}
                        disabled={canvas.items.length === 0}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Preview
                    </button>
                    <button
                        onClick={handleExportJson}
                        disabled={canvas.items.length === 0}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Export JSON
                    </button>
                    <button
                        onClick={handleExportReadme}
                        disabled={canvas.items.length === 0}
                        className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Export README
                    </button>
                </div>
            </header>

            {/* loading banner */}
            {isLoadingTemplate && (
                <div className="flex-none px-4 py-3 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Loading template...
                        </p>
                    </div>
                </div>
            )}

            {/* error */}
            {exportError && (
                <div className="flex-none px-4 py-2 bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-red-700 dark:text-red-400">
                            <strong>Export Error:</strong> {exportError}
                        </p>
                        <button
                            onClick={() => setExportError(null)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* main area */}
            <div className="flex-1 flex overflow-hidden">
                {/* toolbox */}
                <aside className="w-72 flex-none h-full overflow-hidden border-r border-gray-200 dark:border-gray-800">
                    <Toolbox />
                </aside>

                {/* canvas */}
                <main className="flex-1 min-w-0 h-full overflow-hidden">
                    <Canvas />
                </main>

                {/* inspector */}
                <aside className="w-80 flex-none h-full overflow-hidden border-l border-gray-200 dark:border-gray-800">
                    <Inspector />
                </aside>
            </div>

            {/* preview modal */}
            {showPreview && (
                <PreviewModal
                    markdown={previewMarkdown}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
};


interface PreviewModalProps {
    markdown: string;
    onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ markdown, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        README Preview
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* content */}
                <div className="flex-1 overflow-auto p-6">
                    <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        {markdown}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CustomBuilder;
