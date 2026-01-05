// toolbox - component library

"use client";

import React from "react";
import { useCanvasStore } from "@/app/builder/state/canvasStore";
import { COMPONENT_LIBRARY, createDefaultItem, type ComponentMeta, COMPONENT_ICONS } from "@/lib/canvas-lib/components/defaults";
import type { CanvasItemType } from "@/lib/canvas-lib/types";
import {
    Target,
    FileText,
    BarChart2,
    Link,
    Layout,
    type LucideIcon,
} from "lucide-react";

interface ToolboxProps {
    className?: string;
}

interface CategoryDef {
    id: "hero" | "content" | "data" | "social" | "layout";
    name: string;
    Icon: LucideIcon;
}

export const Toolbox: React.FC<ToolboxProps> = ({ className = "" }) => {
    const addItem = useCanvasStore((state) => state.addItem);

    const handleAddComponent = (type: CanvasItemType) => {
        const item = createDefaultItem(type);
        addItem(item);
    };

    const categories: CategoryDef[] = [
        { id: "hero", name: "Hero", Icon: Target },
        { id: "content", name: "Content", Icon: FileText },
        { id: "data", name: "Data", Icon: BarChart2 },
        { id: "social", name: "Social", Icon: Link },
        { id: "layout", name: "Layout", Icon: Layout },
    ];

    return (
        <div className={`h-full overflow-y-auto bg-white dark:bg-gray-900 ${className}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Components
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Click to add to canvas
                </p>
            </div>

            <div className="p-3 space-y-4">
                {categories.map((category) => (
                    <div key={category.id}>
                        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <category.Icon className="w-4 h-4" />
                            {category.name}
                        </h3>
                        <div className="space-y-1">
                            {COMPONENT_LIBRARY
                                .filter((c) => c.category === category.id)
                                .map((component) => (
                                    <ComponentButton
                                        key={component.type}
                                        component={component}
                                        onClick={() => handleAddComponent(component.type)}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface ComponentButtonProps {
    component: ComponentMeta;
    onClick: () => void;
}

const ComponentButton: React.FC<ComponentButtonProps> = ({ component, onClick }) => {
    const IconComponent = COMPONENT_ICONS[component.type];

    return (
        <button
            onClick={onClick}
            className="
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                bg-gray-50 dark:bg-gray-800
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
                dark:hover:from-blue-900/30 dark:hover:to-purple-900/30
                border border-transparent hover:border-blue-200 dark:hover:border-blue-700
                transition-all duration-200
                group
            "
        >
            <span className="text-xl group-hover:scale-110 transition-transform text-gray-600 dark:text-gray-400">
                {IconComponent && <IconComponent className="w-5 h-5" />}
            </span>
            <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {component.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {component.description}
                </div>
            </div>
            <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                +
            </span>
        </button>
    );
};

export default Toolbox;

