/**
 * Canvas Exporter
 * 
 * Exports canvas to markdown.
 */

import type { Canvas } from "@/lib/canvas-lib/types";
import { serializeCanvasToMarkdown, validateCanvas } from "@/lib/canvas-lib/serializer";

// ============================================================================
// EXPORT RESULT TYPES
// ============================================================================

export interface ExportResult {
    readonly success: boolean;
    readonly markdown: string;
    readonly errors: readonly string[];
    readonly metadata: {
        readonly generatedAt: string;
        readonly version: string;
        readonly itemCount: number;
    };
}

// ============================================================================
// MAIN EXPORT FUNCTION
// ============================================================================

/**
 * Export canvas to markdown
 */
export function exportCanvasToMarkdown(canvas: Canvas): ExportResult {
    const generatedAt = new Date().toISOString();

    // Validate canvas
    const validation = validateCanvas(canvas);
    if (!validation.valid) {
        return {
            success: false,
            markdown: "",
            errors: validation.errors,
            metadata: {
                generatedAt,
                version: "1.0.0",
                itemCount: canvas.items.length,
            },
        };
    }

    try {
        // Convert canvas to markdown directly
        const markdown = serializeCanvasToMarkdown(canvas);

        return {
            success: true,
            markdown,
            errors: [],
            metadata: {
                generatedAt,
                version: "1.0.0",
                itemCount: canvas.items.length,
            },
        };
    } catch (error) {
        return {
            success: false,
            markdown: "",
            errors: [error instanceof Error ? error.message : "Unknown export error"],
            metadata: {
                generatedAt,
                version: "1.0.0",
                itemCount: canvas.items.length,
            },
        };
    }
}

/**
 * Trigger download of markdown file
 */
export function downloadMarkdown(markdown: string, filename: string = "README.md"): void {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Trigger download of canvas JSON
 */
export function downloadCanvasJson(canvas: Canvas, filename: string = "canvas.json"): void {
    const json = JSON.stringify(canvas, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
