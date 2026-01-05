// section renderer - renders a section with blocks

"use client";

import React from "react";
import type { RenderedSection } from "@/lib/template-engine";
import { BlockRenderer, blockToMarkdown } from "./BlockRenderer";
import type { PreviewContext, SectionRendererProps } from "./types";

// section to markdown

// convert section to md
export const sectionToMarkdown = (
    section: RenderedSection,
    context: PreviewContext,
    options?: { includeSectionComment?: boolean }
): string => {
    const lines: string[] = [];

    // section comment optional
    if (options?.includeSectionComment) {
        lines.push(`<!-- Section: ${section.type} -->`);
    }

    // section title
    if (section.title) {
        lines.push(`## ${section.title}`);
        lines.push("");
    }

    // blocks
    for (const block of section.blocks) {
        const blockMd = blockToMarkdown(block, context);
        if (blockMd) {
            lines.push(blockMd);
            lines.push("");
        }
    }

    return lines.join("\n");
};

// section renderer component

// render section with blocks
export const SectionRenderer: React.FC<SectionRendererProps> = ({ section, context }) => {
    if (!section.visible) return null;

    return (
        <section className="section" data-section-type={section.type} data-section-id={section.id}>
            {section.title && <h2>{section.title}</h2>}

            {section.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} context={context} />
            ))}
        </section>
    );
};

export default SectionRenderer;
