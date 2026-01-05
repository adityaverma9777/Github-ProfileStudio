// left panel - templates

"use client";

import React from "react";
import Link from "next/link";
import { TemplateSelector } from "../controls/TemplateSelector";

export const LeftPanel: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            {/* header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="p-1 -ml-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Back to Home"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Templates
                    </h2>
                </div>
            </div>

            {/* content */}
            <div className="flex-1 overflow-y-auto">
                <TemplateSelector />
            </div>
        </div>
    );
};
