// template browser page

"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBuilderStore } from "./state";
import { LeftPanel } from "./panels/LeftPanel";
import { PreviewPanel } from "./panels/PreviewPanel";
import { createDefaultProfile } from "./utils/defaults";
import { TEMPLATE_REGISTRY } from "@/data/templates";

// reads template from url
function TemplateURLReader() {
    const searchParams = useSearchParams();
    const { setTemplate, template } = useBuilderStore();

    useEffect(() => {
        const templateSlug = searchParams.get("template");
        if (templateSlug && !template) {
            const registryItem = TEMPLATE_REGISTRY.find((t) => t.slug === templateSlug);
            if (registryItem) {
                setTemplate(registryItem.template);
            }
        }
    }, [searchParams, template, setTemplate]);

    return null;
}

export default function BuilderPage() {
    const { profile, setProfile, panels } = useBuilderStore();

    // init default profile
    useEffect(() => {
        if (!profile) {
            setProfile(createDefaultProfile());
        }
    }, [profile, setProfile]);

    return (
        <div className="flex h-full w-full">
            {/* suspense for url params */}
            <Suspense fallback={null}>
                <TemplateURLReader />
            </Suspense>

            {/* left - templates */}
            <aside
                className={`
          flex-shrink-0 border-r border-gray-200 dark:border-gray-800
          bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out
          ${panels.leftCollapsed ? "w-0 overflow-hidden" : "w-80"}
        `}
            >
                <LeftPanel />
            </aside>

            {/* center - preview */}
            <main className="flex-1 min-w-0 flex flex-col bg-gray-100 dark:bg-gray-950">
                <PreviewPanel />
            </main>
        </div>
    );
}


