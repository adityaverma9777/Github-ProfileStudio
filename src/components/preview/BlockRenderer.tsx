// block renderer - IR blocks to react

"use client";

import React, { useState } from "react";
import type { Block, TextBlock, LinkBlock, ParagraphBlock } from "@/lib/template-engine";
import type { PreviewContext } from "./types";

// stat card with fallback

// shows github stats with error handling
const StatCardImage: React.FC<{ src: string; alt: string; cardType: string }> = ({ src, alt, cardType }) => {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

    // timeout - 3s max
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (status === "loading") {
                setStatus("error");
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [status]);

    const cardLabels: Record<string, { title: string; icon: string }> = {
        stats: { title: "GitHub Stats", icon: "📊" },
        "top-langs": { title: "Top Languages", icon: "💻" },
        streak: { title: "Streak Stats", icon: "🔥" },
        trophies: { title: "Trophies", icon: "🏆" },
        "activity-graph": { title: "Activity Graph", icon: "📈" },
    };

    const cardInfo = cardLabels[cardType] || { title: "GitHub Stats", icon: "📊" };

    // show skeleton for loading/error
    if (status === "error" || status === "loading") {
        return (
            <div className="inline-block min-w-[300px] h-32 rounded-lg bg-gray-700 animate-pulse" />
        );
    }

    // loaded ok
    return (
        <img
            src={src}
            alt={alt}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
        />
    );
};

// block to markdown conversion

// convert IR block to markdown
export const blockToMarkdown = (block: Block, context: PreviewContext): string => {
    if (!block.visible) return "";

    switch (block.kind) {
        case "text":
            return applyEmphasis(block.value, block.emphasis);

        case "heading":
            return `${"#".repeat(block.level)} ${block.value}`;

        case "paragraph":
            // paragraph has content as array
            return block.content.map((child) => blockToMarkdown(child, context)).join("");

        case "code":
            return block.inline
                ? `\`${block.value}\``
                : `\`\`\`${block.language ?? ""}\n${block.value}\n\`\`\``;

        case "quote":
            // quote block uses value
            let quote = `> ${block.value}`;
            if (block.author) {
                quote += `\n> — ${block.author}`;
            }
            return quote;

        case "image":
            const align = block.align ? ` align="${block.align}"` : "";
            if (align) {
                return `<p${align}><img src="${block.src}" alt="${block.alt}"${block.width ? ` width="${block.width}"` : ""}${block.height ? ` height="${block.height}"` : ""} /></p>`;
            }
            return `![${block.alt}](${block.src})`;

        case "link":
            return `[${block.text}](${block.href})`;

        case "badge":
            const badgeUrl = generateBadgeUrl(block);
            return block.link
                ? `[![${block.label}](${badgeUrl})](${block.link})`
                : `![${block.label}](${badgeUrl})`;

        case "badge-group":
            return block.badges.map((b) => blockToMarkdown(b, context)).join(" ");

        case "list":
            return block.items
                .map((item, i) => {
                    const prefix = block.listType === "ordered" ? `${i + 1}.` : "-";
                    const content = typeof item.content === "string" ? item.content : blockToMarkdown(item.content, context);
                    return `${prefix} ${content}`;
                })
                .join("\n");

        case "spacer":
            return "\n";

        case "divider":
            return "---";

        case "row":
        case "column":
        case "grid":
            return block.children.map((child) => blockToMarkdown(child, context)).join("\n\n");

        case "stat":
            return `**${block.label}:** ${block.value}`;

        case "stat-group":
            return block.stats.map((s) => blockToMarkdown(s, context)).join(" | ");

        case "social-link":
            return `[${block.label ?? block.platform}](${block.url})`;

        case "social-group":
            return block.links.map((l) => blockToMarkdown(l, context)).join(" ");

        case "typing-animation":
            // static for markdown
            return `**${block.texts[0] ?? ""}**`;

        case "github-stats-card":
            return `![${block.username}'s GitHub stats](${generateStatsCardUrl(block)})`;

        case "contribution-graph":
            return `![${block.username}'s contribution graph](${generateContributionUrl(block)})`;

        case "card":
            return `### ${block.title}\n\n${block.description ?? ""}`;

        case "project-card":
            let projectMd = `### ${block.name}\n\n${block.description}`;
            if (block.techStack && block.techStack.length > 0) {
                projectMd += `\n\n**Tech:** ${block.techStack.join(", ")}`;
            }
            if (block.repoUrl) {
                projectMd += `\n\n[📁 Repository](${block.repoUrl})`;
            }
            return projectMd;

        case "experience-item":
            return `#### ${block.role} @ ${block.company}\n*${block.startDate} – ${block.endDate ?? "Present"}*\n\n${block.description ?? ""}`;

        case "education-item":
            return `#### ${block.degree}\n*${block.institution}*\n*${block.startDate} – ${block.endDate ?? "Present"}*`;

        case "achievement-item":
            return `🏆 **${block.title}**${block.description ? ` — ${block.description}` : ""}`;

        case "custom":
            return (block.data as { content?: string })?.content ?? "";

        default:
            // exhaustive switch
            const _exhaustive: never = block;
            return "";
    }
};

// block to react conversion

// convert block to react element
export const BlockRenderer: React.FC<{ block: Block; context: PreviewContext }> = ({
    block,
    context,
}) => {
    if (!block.visible) return null;

    switch (block.kind) {
        case "text":
            return (
                <span
                    className={getTextClass(block.emphasis, block.align)}
                    dangerouslySetInnerHTML={{ __html: formatText(block.value, block.emphasis) }}
                />
            );

        case "heading": {
            const level = block.level;
            const className = block.align ? `text-${block.align}` : undefined;
            switch (level) {
                case 1: return <h1 className={className}>{block.value}</h1>;
                case 2: return <h2 className={className}>{block.value}</h2>;
                case 3: return <h3 className={className}>{block.value}</h3>;
                case 4: return <h4 className={className}>{block.value}</h4>;
                case 5: return <h5 className={className}>{block.value}</h5>;
                case 6: return <h6 className={className}>{block.value}</h6>;
                default: return <h2 className={className}>{block.value}</h2>;
            }
        }

        case "paragraph":
            return (
                <p className={block.align ? `text-${block.align}` : undefined}>
                    {block.content.map((child, i) => (
                        <BlockRenderer key={`${block.id}-${i}`} block={child} context={context} />
                    ))}
                </p>
            );

        case "code":
            if (block.inline) {
                return <code>{block.value}</code>;
            }
            return (
                <pre>
                    <code className={block.language ? `language-${block.language}` : undefined}>
                        {block.value}
                    </code>
                </pre>
            );

        case "quote":
            return (
                <blockquote>
                    <p>{block.value}</p>
                    {block.author && (
                        <footer>
                            — {block.author}
                            {block.source && <cite>, {block.source}</cite>}
                        </footer>
                    )}
                </blockquote>
            );

        case "image":
            return (
                <p className={block.align ? `text-${block.align}` : "text-center"}>
                    <img
                        src={block.src}
                        alt={block.alt}
                        width={block.width}
                        height={block.height}
                        loading="lazy"
                    />
                </p>
            );

        case "link":
            return (
                <a
                    href={block.href}
                    target={block.external ? "_blank" : undefined}
                    rel={block.external ? "noopener noreferrer" : undefined}
                >
                    {block.text}
                </a>
            );

        case "badge": {
            const badgeUrl = generateBadgeUrl(block);
            const badgeImg = <img src={badgeUrl} alt={block.label} />;
            return block.link ? (
                <a href={block.link} target="_blank" rel="noopener noreferrer">
                    {badgeImg}
                </a>
            ) : (
                badgeImg
            );
        }

        case "badge-group":
            return (
                <div className={`badge-container ${block.align ? `text-${block.align}` : ""}`}>
                    {block.badges.map((b) => (
                        <BlockRenderer key={b.id} block={b} context={context} />
                    ))}
                </div>
            );

        case "list": {
            const ListTag = block.listType === "ordered" ? "ol" : "ul";
            return (
                <ListTag>
                    {block.items.map((item, i) => (
                        <li key={i}>
                            {item.icon && <span>{item.icon} </span>}
                            {typeof item.content === "string"
                                ? item.content
                                : <BlockRenderer block={item.content} context={context} />}
                        </li>
                    ))}
                </ListTag>
            );
        }

        case "spacer":
            return <div className={`spacer-${block.height}`} />;

        case "divider":
            return <hr />;

        case "row":
            return (
                <div
                    className={`flex-row ${block.wrap ? "flex-wrap" : ""}`}
                    style={{ gap: getGapSize(block.gap), justifyContent: block.justify, alignItems: block.align }}
                >
                    {block.children.map((child) => (
                        <BlockRenderer key={child.id} block={child} context={context} />
                    ))}
                </div>
            );

        case "column":
            return (
                <div className="flex flex-col" style={{ gap: "8px" }}>
                    {block.children.map((child) => (
                        <BlockRenderer key={child.id} block={child} context={context} />
                    ))}
                </div>
            );

        case "grid":
            return (
                <div className={`grid grid-${block.columns}`} style={{ gap: getGapSize(block.gap) }}>
                    {block.children.map((child) => (
                        <BlockRenderer key={child.id} block={child} context={context} />
                    ))}
                </div>
            );

        case "stat":
            return (
                <div className="stat">
                    <span className="stat-value">{block.value}</span>
                    <span className="stat-label">{block.label}</span>
                </div>
            );

        case "stat-group":
            return (
                <div className="stats-container">
                    {block.stats.map((s) => (
                        <BlockRenderer key={s.id} block={s} context={context} />
                    ))}
                </div>
            );

        case "social-link":
            const platformBadges: Record<string, { logo: string; color: string }> = {
                github: { logo: "github", color: "181717" },
                linkedin: { logo: "linkedin", color: "0A66C2" },
                twitter: { logo: "twitter", color: "1DA1F2" },
                instagram: { logo: "instagram", color: "E4405F" },
                youtube: { logo: "youtube", color: "FF0000" },
                twitch: { logo: "twitch", color: "9146FF" },
                discord: { logo: "discord", color: "5865F2" },
                email: { logo: "gmail", color: "EA4335" },
                website: { logo: "googlechrome", color: "4285F4" },
            };
            const badge = platformBadges[block.platform] || { logo: "link", color: "gray" };
            const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(block.label ?? block.platform)}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=white`;
            return (
                <a href={block.url} target="_blank" rel="noopener noreferrer" className="inline-block mr-2">
                    <img src={badgeUrl} alt={block.platform} className="h-7" />
                </a>
            );

        case "social-group":
            return (
                <div className="social-links">
                    {block.links.map((l) => (
                        <BlockRenderer key={l.id} block={l} context={context} />
                    ))}
                </div>
            );

        case "typing-animation":
            // static preview - show first text
            return (
                <span className="typing-placeholder">
                    {block.texts[0] ?? ""}
                </span>
            );

        case "github-stats-card":
            return (
                <StatCardImage
                    src={generateStatsCardUrl(block)}
                    alt={`${block.username}'s GitHub ${block.cardType} stats`}
                    cardType={block.cardType}
                />
            );

        case "contribution-graph":
            return (
                <StatCardImage
                    src={generateContributionUrl(block)}
                    alt={`${block.username}'s contribution graph`}
                    cardType="activity-graph"
                />
            );

        case "card":
            return (
                <div className="card">
                    <h4 className="card-title">{block.title}</h4>
                    {block.description && <p className="card-description">{block.description}</p>}
                </div>
            );

        case "project-card":
            return (
                <div className="card">
                    <h4 className="card-title">{block.name}</h4>
                    <p className="card-description">{block.description}</p>
                    <div className="card-footer">
                        {block.techStack && block.techStack.length > 0 && (
                            <span>{block.techStack.slice(0, 3).join(", ")}</span>
                        )}
                        {block.stats.stars !== undefined && <span>⭐ {block.stats.stars}</span>}
                        {block.stats.forks !== undefined && <span>🍴 {block.stats.forks}</span>}
                    </div>
                </div>
            );

        case "experience-item":
            return (
                <div className="timeline-item">
                    <h4 className="timeline-title">{block.role}</h4>
                    <p className="timeline-subtitle">{block.company}</p>
                    <p className="timeline-date">
                        {block.startDate} – {block.endDate ?? "Present"}
                    </p>
                    {block.description && <p>{block.description}</p>}
                </div>
            );

        case "education-item":
            return (
                <div className="timeline-item">
                    <h4 className="timeline-title">{block.degree}</h4>
                    <p className="timeline-subtitle">{block.institution}</p>
                    <p className="timeline-date">
                        {block.startDate} – {block.endDate ?? "Present"}
                    </p>
                </div>
            );

        case "achievement-item":
            return (
                <div className="achievement">
                    <span className="achievement-icon">{block.icon ?? "🏆"}</span>
                    <div className="achievement-content">
                        <h4 className="achievement-title">{block.title}</h4>
                        {block.description && <p className="achievement-description">{block.description}</p>}
                    </div>
                </div>
            );

        case "custom": {
            const content = (block.data as { content?: string })?.content;
            if (block.customType === "markdown" && content) {
                return <div dangerouslySetInnerHTML={{ __html: content }} />;
            }
            return <div>{content}</div>;
        }

        default:
            // exhaustive switch
            const _exhaustive: never = block;
            return null;
    }
};

// helpers

const applyEmphasis = (text: string, emphasis?: string): string => {
    switch (emphasis) {
        case "bold":
            return `**${text}**`;
        case "italic":
            return `*${text}*`;
        case "code":
            return `\`${text}\``;
        case "strikethrough":
            return `~~${text}~~`;
        default:
            return text;
    }
};

const formatText = (text: string, emphasis?: string): string => {
    // convert markdown emphasis to html
    let formatted = text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>")
        .replace(/~~(.+?)~~/g, "<del>$1</del>");

    // apply block emphasis
    switch (emphasis) {
        case "bold":
            formatted = `<strong>${formatted}</strong>`;
            break;
        case "italic":
            formatted = `<em>${formatted}</em>`;
            break;
    }

    return formatted;
};

const getTextClass = (emphasis?: string, align?: string): string => {
    const classes: string[] = [];
    if (emphasis === "bold") classes.push("font-bold");
    if (emphasis === "italic") classes.push("italic");
    if (align) classes.push(`text-${align}`);
    return classes.join(" ");
};

const getGapSize = (gap?: string): string => {
    switch (gap) {
        case "sm":
            return "8px";
        case "md":
            return "16px";
        case "lg":
            return "24px";
        default:
            return "8px";
    }
};

const generateBadgeUrl = (block: { label: string; message?: string; color?: string; logo?: string; style?: string }): string => {
    const label = encodeURIComponent(block.label.replace(/-/g, "--"));
    const message = encodeURIComponent((block.message ?? "").replace(/-/g, "--"));
    const color = (block.color ?? "blue").replace("#", "");
    const style = block.style ?? "for-the-badge";

    let url = `https://img.shields.io/badge/${label}-${message}-${color}?style=${style}`;
    if (block.logo) {
        url += `&logo=${encodeURIComponent(block.logo)}`;
    }
    return url;
};

const generateStatsCardUrl = (block: { username: string; cardType: string; theme?: string; showIcons?: boolean }): string => {
    const username = block.username;
    const theme = block.theme ?? "default";

    switch (block.cardType) {
        case "top-langs":
            return `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&layout=compact`;

        case "streak":
            return `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}`;

        case "trophies":
            return `https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&row=1&column=6`;

        case "activity-graph":
            return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme === "default" ? "github-compact" : theme}`;

        case "stats":
        default:
            const params = new URLSearchParams({
                username: username,
                theme: theme,
                show_icons: String(block.showIcons ?? true),
            });
            return `https://github-readme-stats.vercel.app/api?${params}`;
    }
};

const generateContributionUrl = (block: { username: string; theme?: string }): string => {
    return `https://github-readme-activity-graph.vercel.app/graph?username=${block.username}&theme=${block.theme ?? "github-compact"}`;
};

const getPlatformEmoji = (platform: string): string => {
    const emojis: Record<string, string> = {
        github: "🐙",
        twitter: "🐦",
        linkedin: "💼",
        instagram: "📷",
        youtube: "📺",
        twitch: "🎮",
        discord: "💬",
        email: "📧",
        website: "🌐",
        other: "🔗",
    };
    return emojis[platform] ?? "🔗";
};

export default BlockRenderer;
