// custom builder page

import { Metadata } from "next";
import { Suspense } from "react";
import { CustomBuilder } from "./CustomBuilder";

export const metadata: Metadata = {
    title: "Custom Builder | GitHub Profile Studio",
    description: "Build your custom GitHub README from scratch with drag-and-drop components",
};

// loading state
function BuilderLoading() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="text-center">
                <svg className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">Loading builder...</p>
            </div>
        </div>
    );
}

export default function CustomBuilderPage() {
    return (
        <Suspense fallback={<BuilderLoading />}>
            <CustomBuilder />
        </Suspense>
    );
}
