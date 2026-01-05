// canvas - main work area

"use client";

import React, { useState, useEffect } from "react";
import { useCanvasStore } from "@/app/builder/state/canvasStore";
import { CanvasItemRenderer } from "./CanvasRenderer";

interface CanvasProps {
    className?: string;
}

export const Canvas: React.FC<CanvasProps> = ({ className = "" }) => {
    const { canvas, selectedItemId, selectItem } = useCanvasStore();

    // client-side time only to avoid hydration issues
    const [displayTime, setDisplayTime] = useState<string>("");

    useEffect(() => {
        // update time client-side only
        const updateTime = () => {
            setDisplayTime(new Date(canvas.metadata.updatedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        };
        updateTime();
    }, [canvas.metadata.updatedAt]);

    return (
        <div className={`h-full overflow-y-auto bg-gray-50 dark:bg-gray-950 ${className}`}>
            {/* header */}
            <div className="sticky top-0 z-10 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {canvas.metadata.name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {canvas.items.length} component{canvas.items.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                        {displayTime && `Last updated: ${displayTime}`}
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="p-6">
                {canvas.items.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {canvas.items.map((item, index) => (
                            <CanvasItemRenderer
                                key={item.id}
                                item={item}
                                isSelected={item.id === selectedItemId}
                                isFirst={index === 0}
                                isLast={index === canvas.items.length - 1}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* click outside to deselect */}
            {selectedItemId && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => selectItem(null)}
                    onKeyDown={(e) => e.key === "Escape" && selectItem(null)}
                    tabIndex={-1}
                    role="button"
                    aria-label="Deselect"
                    style={{ pointerEvents: "none" }}
                />
            )}
        </div>
    );
};

const EmptyState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-6">
                <svg
                    className="w-12 h-12 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Start Building Your README
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                Click on components in the Toolbox to add them to your canvas.
                Arrange them in any order and customize their properties.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                <span>←</span>
                <span>Select components from the left panel</span>
            </div>
        </div>
    );
};

export default Canvas;
