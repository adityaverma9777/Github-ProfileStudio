// template selector

"use client";

import React from "react";
import Link from "next/link";
import { useBuilderStore } from "../state";
import { TEMPLATE_REGISTRY } from "@/data/templates";

export const TemplateSelector: React.FC = () => {
    const { template, setTemplate } = useBuilderStore();

    // check which one is selected
    const currentId = template
        ? String((template as unknown as { metadata?: { id?: unknown } }).metadata?.id ?? "")
        : null;

    const handleSelect = (registryItem: (typeof TEMPLATE_REGISTRY)[number]) => {
        setTemplate(registryItem.template);
    };

    return (
        <div className="p-4 space-y-3">
            {/* blank slate option */}
            <Link
                href="/builder/custom"
                className="
                    w-full flex items-center justify-center gap-2 p-4 rounded-lg
                    bg-gradient-to-r from-purple-600 to-blue-600
                    hover:from-purple-700 hover:to-blue-700
                    text-white font-medium text-sm
                    shadow-lg hover:shadow-xl
                    transition-all duration-200
                "
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start From Scratch
            </Link>

            <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400 dark:text-gray-500">or choose a template</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Choose a template to get started
            </p>

            {TEMPLATE_REGISTRY.map((t) => (
                <button
                    key={t.id}
                    onClick={() => handleSelect(t)}
                    className={`
                        w-full text-left p-4 rounded-lg border transition-all
                        ${currentId === t.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }
                    `}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {t.name}
                                </h3>
                                {t.featured && (
                                    <span className="text-xs px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">
                                        ★
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {t.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="text-xs text-gray-400">
                                    {t.template.sections.length} sections
                                </span>
                                <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                <span className="text-xs text-gray-400 capitalize">
                                    {t.category}
                                </span>
                                {t.animationLevel !== "none" && (
                                    <>
                                        <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                                        <span className="text-xs text-purple-500 dark:text-purple-400">
                                            {t.animationLevel === "animated" ? "✨ Animated" : "⚡ Subtle"}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        {currentId === t.id && (
                            <div className="flex-shrink-0 ml-3">
                                <svg
                                    className="w-5 h-5 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                </button>
            ))}
        </div>
    );
};
