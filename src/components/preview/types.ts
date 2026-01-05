// preview types

import type { RenderOutput, Block, RenderedSection } from "@/lib/template-engine";

// theme

// preview color scheme
export type PreviewTheme = "light" | "dark" | "system";

// resolved theme (no system)
export type ResolvedTheme = "light" | "dark";

// preview context

// context for block renderers
export interface PreviewContext {
    // current resolved theme
    readonly theme: ResolvedTheme;
    // render as markdown? (for export)
    readonly asMarkdown?: boolean;
    // base URL for relative links
    readonly baseUrl?: string;
}

// block renderer props

// props for block renderer
export interface BlockRendererProps {
    readonly block: Block;
    readonly context: PreviewContext;
}

// props for section renderer
export interface SectionRendererProps {
    readonly section: RenderedSection;
    readonly context: PreviewContext;
}

// props for main preview renderer
export interface PreviewRendererProps {
    // IR output from template engine
    readonly output: RenderOutput;
    // theme pref
    readonly theme?: PreviewTheme;
    // optional class
    readonly className?: string;
    // theme change callback
    readonly onThemeChange?: (theme: ResolvedTheme) => void;
}

// markdown gen

// result of converting block to md
export interface MarkdownResult {
    readonly markdown: string;
    readonly hasHtml: boolean;
}

// export options

// options for md export
export interface ExportOptions {
    // include section comments
    readonly includeSectionComments?: boolean;
    // include metadata header
    readonly includeMetadataHeader?: boolean;
    // line ending style
    readonly lineEnding?: "lf" | "crlf";
}
