/**
 * Preview Components - Public API
 *
 * Central barrel export for preview components.
 */

// ============================================================================
// MAIN COMPONENTS
// ============================================================================

export {
    PreviewRenderer,
    PreviewContainer,
    ThemeToggle,
    exportToMarkdown,
    type ThemeToggleProps,
    type PreviewContainerProps,
} from "./PreviewRenderer";

export { SectionRenderer, sectionToMarkdown } from "./SectionRenderer";

export { BlockRenderer, blockToMarkdown } from "./BlockRenderer";

// ============================================================================
// TYPES
// ============================================================================

export type {
    PreviewTheme,
    ResolvedTheme,
    PreviewContext,
    BlockRendererProps,
    SectionRendererProps,
    PreviewRendererProps,
    MarkdownResult,
    ExportOptions,
} from "./types";

// ============================================================================
// CSS IMPORT HELPER
// ============================================================================
// Note: Import './preview-theme.css' in your app to apply GitHub styling
