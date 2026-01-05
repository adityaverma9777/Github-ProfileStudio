/**
 * Canvas Library - Serializer
 * 
 * Converts Canvas to Markdown directly without Template Engine.
 * Simpler approach that avoids complex type dependencies.
 */

import type { Canvas, CanvasItem, CanvasSettings } from "./types";
import {
    generateTypingSvgUrl,
    generateGitHubStatsUrl,
    generateTopLangsUrl,
    generateStreakStatsUrl,
    generateTrophyUrl,
    generateContributionSnakeUrl,
    generateBadgeUrl,
} from "./config";

// ============================================================================
// CANVAS -> MARKDOWN CONVERSION
// ============================================================================

/**
 * Convert a Canvas directly to Markdown
 */
export function serializeCanvasToMarkdown(canvas: Canvas): string {
    const lines: string[] = [];
    const username = canvas.settings.defaultUsername || "your-github-username";

    // Add powered by comment if enabled
    if (canvas.settings.showPoweredBy) {
        lines.push("<!-- Created with GitHub Profile Studio -->");
        lines.push("");
    }

    for (const item of canvas.items) {
        const markdown = canvasItemToMarkdown(item, username);
        if (markdown) {
            lines.push(markdown);
            lines.push("");
        }
    }

    // Add footer
    if (canvas.settings.showPoweredBy) {
        lines.push("---");
        lines.push("");
        lines.push("*Made with ❤️ using [GitHub Profile Studio](https://github.com/github-profile-studio)*");
    }

    return lines.join("\n").trim();
}

/**
 * Convert a single CanvasItem to Markdown
 */
function canvasItemToMarkdown(item: CanvasItem, defaultUsername: string): string {
    switch (item.type) {
        case "typing-hero": {
            const url = generateTypingSvgUrl(item.props.lines, {
                center: item.props.center,
                color: item.props.color,
                size: item.props.size,
                pause: item.props.pause,
            });
            return item.props.center
                ? `<p align="center"><img src="${url}" alt="Typing SVG" /></p>`
                : `![Typing SVG](${url})`;
        }

        case "static-hero": {
            const align = item.props.align;
            let md = "";
            if (align === "center" || align === "right") {
                md = `<h1 align="${align}">${item.props.headline}</h1>`;
                if (item.props.subheadline) {
                    md += `\n<h3 align="${align}">${item.props.subheadline}</h3>`;
                }
            } else {
                md = `# ${item.props.headline}`;
                if (item.props.subheadline) {
                    md += `\n### ${item.props.subheadline}`;
                }
            }
            return md;
        }

        case "text-block": {
            if (item.props.align === "center" || item.props.align === "right") {
                return `<p align="${item.props.align}">${item.props.content}</p>`;
            }
            return item.props.content;
        }

        case "heading": {
            const hashes = "#".repeat(item.props.level);
            if (item.props.align === "center" || item.props.align === "right") {
                return `<h${item.props.level} align="${item.props.align}">${item.props.text}</h${item.props.level}>`;
            }
            return `${hashes} ${item.props.text}`;
        }

        case "image":
        case "gif": {
            const widthAttr = item.props.width ? ` width="${item.props.width}"` : "";
            if (item.props.align === "center" || item.props.align === "right") {
                return `<p align="${item.props.align}"><img src="${item.props.src}" alt="${item.props.alt}"${widthAttr} /></p>`;
            }
            return `![${item.props.alt}](${item.props.src})`;
        }

        case "badge-group": {
            const badges = item.props.badges
                .map((b) => {
                    const url = generateBadgeUrl(b.label, b.message, b.color, {
                        style: b.style,
                        logo: b.logo,
                    });
                    return `![${b.label}](${url})`;
                })
                .join(" ");

            if (item.props.align === "center" || item.props.align === "right") {
                return `<p align="${item.props.align}">${badges}</p>`;
            }
            return badges;
        }

        case "tech-stack": {
            const lines: string[] = [`## ${item.props.title}`, ""];

            if (item.props.groupByCategory) {
                const categories = new Map<string, string[]>();
                for (const tech of item.props.items) {
                    const category = tech.category;
                    if (!categories.has(category)) {
                        categories.set(category, []);
                    }
                    categories.get(category)!.push(tech.name);
                }

                for (const [category, techs] of categories) {
                    const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
                    lines.push(`**${displayCategory}:**`);
                    const badges = techs.map((name) => {
                        const url = generateBadgeUrl(name, "", "0969da", {
                            style: item.props.badgeStyle,
                            logo: name.toLowerCase().replace(/\s+/g, ""),
                        });
                        return `![${name}](${url})`;
                    }).join(" ");
                    lines.push(badges);
                    lines.push("");
                }
            } else {
                const badges = item.props.items.map((tech) => {
                    const url = generateBadgeUrl(tech.name, "", "0969da", {
                        style: item.props.badgeStyle,
                        logo: tech.name.toLowerCase().replace(/\s+/g, ""),
                    });
                    return `![${tech.name}](${url})`;
                }).join(" ");
                lines.push(badges);
            }

            return lines.join("\n");
        }

        case "projects-list": {
            const lines: string[] = [`## ${item.props.title}`, ""];

            for (const project of item.props.projects.slice(0, item.props.maxProjects)) {
                lines.push(`### ${project.name}`);
                lines.push(project.description);
                if (project.techStack.length > 0) {
                    lines.push(`\n**Tech:** ${project.techStack.join(", ")}`);
                }
                const links: string[] = [];
                if (project.repoUrl) {
                    links.push(`[📁 Repository](${project.repoUrl})`);
                }
                if (project.demoUrl) {
                    links.push(`[🌐 Demo](${project.demoUrl})`);
                }
                if (links.length > 0) {
                    lines.push(links.join(" | "));
                }
                lines.push("");
            }

            return lines.join("\n");
        }

        case "github-stats": {
            const username = item.props.username || defaultUsername;
            const images: string[] = [];

            if (item.props.showStats) {
                images.push(`![GitHub Stats](${generateGitHubStatsUrl(username, { theme: item.props.theme })})`);
            }
            if (item.props.showTopLangs) {
                images.push(`![Top Langs](${generateTopLangsUrl(username, { theme: item.props.theme })})`);
            }
            if (item.props.showStreak) {
                images.push(`![GitHub Streak](${generateStreakStatsUrl(username, { theme: item.props.theme })})`);
            }
            if (item.props.showTrophies) {
                images.push(`![Trophies](${generateTrophyUrl(username, { theme: item.props.theme })})`);
            }

            if (item.props.layout === "column") {
                return `<p align="center">\n${images.map((img) => `  ${img}`).join("<br>\n")}\n</p>`;
            }
            return `<p align="center">${images.join(" ")}</p>`;
        }

        case "contribution-snake": {
            const username = item.props.username || defaultUsername;
            const url = generateContributionSnakeUrl(username, { variant: item.props.variant });
            return `<p align="center"><img src="${url}" alt="Contribution Snake" /></p>`;
        }

        case "social-links": {
            const lines: string[] = [`## ${item.props.title}`, ""];

            const links = item.props.links.map((link) => {
                return `[${link.label || link.platform}](${link.url})`;
            });

            if (item.props.align === "center" || item.props.align === "right") {
                lines.push(`<p align="${item.props.align}">${links.join(" | ")}</p>`);
            } else {
                lines.push(links.join(" | "));
            }

            return lines.join("\n");
        }

        case "spacer": {
            const heights = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
            return "\n".repeat(heights[item.props.height]);
        }

        case "divider": {
            return "---";
        }

        default:
            return "";
    }
}

// ============================================================================
// CANVAS -> JSON SERIALIZATION
// ============================================================================

/**
 * Serialize canvas to JSON string
 */
export function serializeCanvasToJson(canvas: Canvas): string {
    return JSON.stringify(canvas, null, 2);
}

/**
 * Deserialize canvas from JSON string
 */
export function deserializeCanvasFromJson(json: string): Canvas | null {
    try {
        const parsed = JSON.parse(json) as Canvas;
        if (!parsed.id || !parsed.items || !parsed.settings) {
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate canvas before serialization
 */
export function validateCanvas(canvas: Canvas): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!canvas.id) {
        errors.push("Canvas must have an ID");
    }

    if (!canvas.metadata.name) {
        errors.push("Canvas must have a name");
    }

    if (canvas.items.length === 0) {
        errors.push("Canvas must have at least one item");
    }

    for (const item of canvas.items) {
        if (!item.id) {
            errors.push(`Item of type ${item.type} is missing an ID`);
        }
        if (!item.props) {
            errors.push(`Item ${item.id} is missing props`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
