/**
 * Custom Builder - Canvas Item Renderer
 * 
 * Renders individual canvas items with action buttons.
 */

"use client";

import React from "react";
import type { CanvasItem } from "@/lib/canvas-lib/types";
import { useCanvasStore } from "@/app/builder/state/canvasStore";
import {
    generateTypingSvgUrl,
    generateGitHubStatsUrl,
    generateTopLangsUrl,
    generateStreakStatsUrl,
    generateTrophyUrl,
    generateContributionSnakeUrl,
    generateBadgeUrl,
} from "@/lib/canvas-lib/config";

interface CanvasItemRendererProps {
    item: CanvasItem;
    isSelected: boolean;
    isFirst: boolean;
    isLast: boolean;
}

export const CanvasItemRenderer: React.FC<CanvasItemRendererProps> = ({
    item,
    isSelected,
    isFirst,
    isLast,
}) => {
    const { selectItem, removeItem, moveUp, moveDown, duplicateItem } = useCanvasStore();

    return (
        <div
            className={`
                relative group rounded-lg border-2 transition-all duration-200
                ${isSelected
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }
            `}
            onClick={() => selectItem(item.id)}
        >
            {/* Action buttons - visible on hover or when selected */}
            <div className={`
                absolute top-2 right-2 flex items-center gap-1
                ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                transition-opacity duration-200
            `}>
                <button
                    onClick={(e) => { e.stopPropagation(); moveUp(item.id); }}
                    disabled={isFirst}
                    className="p-1.5 rounded bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); moveDown(item.id); }}
                    disabled={isLast}
                    className="p-1.5 rounded bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); duplicateItem(item.id); }}
                    className="p-1.5 rounded bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    title="Duplicate"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                    className="p-1.5 rounded bg-white dark:bg-gray-800 shadow border border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                    title="Delete"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Type badge */}
            <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                {item.type.replace("-", " ")}
            </div>

            {/* Content preview */}
            <div className="pt-10 pb-4 px-4">
                <ItemPreview item={item} />
            </div>
        </div>
    );
};

/** Image preview component with error handling */
const ImagePreview: React.FC<{ item: { props: { src: string; alt: string; width?: number; align: string } } }> = ({ item }) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

    const handleLoad = () => setStatus("loaded");
    const handleError = () => setStatus("error");

    // Check if URL looks like a direct image URL
    const isDirectImageUrl = (url: string): boolean => {
        const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico"];
        const lowerUrl = url.toLowerCase();
        return imageExtensions.some((ext) => lowerUrl.includes(ext)) ||
            url.includes("githubusercontent.com") ||
            url.includes("img.shields.io") ||
            url.includes("readme-typing-svg") ||
            url.includes("github-readme-stats");
    };

    const isLikelyWebpage = !isDirectImageUrl(item.props.src) &&
        !item.props.src.startsWith("data:") &&
        item.props.src.length > 0;

    const imageAlignClasses: Record<string, string> = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    return (
        <div className={imageAlignClasses[item.props.align] || "text-left"}>
            {status === "error" || isLikelyWebpage ? (
                <div className="inline-block p-4 rounded-lg border-2 border-dashed border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                                {isLikelyWebpage ? "Use a direct image URL" : "Image failed to load"}
                            </p>
                            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                                {item.props.alt}
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                                <p>💡 Tips:</p>
                                <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                                    <li>Use URLs ending in .png, .jpg, .gif, .svg</li>
                                    <li>Right-click image → "Copy image address"</li>
                                    <li>Use raw.githubusercontent.com for GitHub images</li>
                                </ul>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 truncate max-w-xs" title={item.props.src}>
                                Current: {item.props.src.slice(0, 50)}...
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {status === "loading" && (
                        <div className="inline-flex items-center gap-2 p-4 text-gray-400">
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Loading image...
                        </div>
                    )}
                    <img
                        src={item.props.src}
                        alt={item.props.alt}
                        width={item.props.width}
                        onLoad={handleLoad}
                        onError={handleError}
                        className={`inline-block max-w-full rounded ${status === "loading" ? "hidden" : ""}`}
                    />
                </>
            )}
        </div>
    );
};

/** Stat image component with error handling for external services */
const StatImage: React.FC<{ src: string; alt: string; serviceName: string }> = ({ src, alt, serviceName }) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

    return (
        <div className="relative">
            {status === "loading" && (
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-500">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading {alt}...
                </div>
            )}
            {status === "error" && (
                <div className="p-3 rounded border border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20">
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                                {alt} temporarily unavailable
                            </p>
                            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                                ⚠️ This is an external service issue, not a GitHub Profile Studio error.
                            </p>
                            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
                                {serviceName} may be rate-limited by GitHub. Your exported README will still work perfectly!
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setStatus("loaded")}
                onError={() => setStatus("error")}
                className={`max-w-xs ${status === "loading" || status === "error" ? "hidden" : ""}`}
            />
        </div>
    );
};

/** Preview renderer for each item type */
const ItemPreview: React.FC<{ item: CanvasItem }> = ({ item }) => {
    const settings = useCanvasStore((state) => state.canvas.settings);
    const username = settings.defaultUsername || "your-github-username";

    switch (item.type) {
        case "typing-hero":
            const typingUrl = generateTypingSvgUrl(item.props.lines, {
                center: item.props.center,
                color: item.props.color,
                size: item.props.size,
                pause: item.props.pause,
            });
            return (
                <div className={`text-${item.props.center ? "center" : "left"}`}>
                    <img
                        src={typingUrl}
                        alt="Typing animation"
                        className="inline-block max-w-full"
                    />
                </div>
            );

        case "static-hero":
            const heroAlignClasses: Record<string, string> = {
                left: "text-left",
                center: "text-center",
                right: "text-right",
            };
            return (
                <div className={heroAlignClasses[item.props.align] || "text-left"}>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.props.headline}
                    </h1>
                    {item.props.subheadline && (
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                            {item.props.subheadline}
                        </p>
                    )}
                </div>
            );

        case "text-block":
            const textAlignClasses: Record<string, string> = {
                left: "text-left",
                center: "text-center",
                right: "text-right",
            };
            return (
                <p className={`text-gray-700 dark:text-gray-300 ${textAlignClasses[item.props.align] || "text-left"}`}>
                    {item.props.content}
                </p>
            );

        case "heading":
            const sizeClasses: Record<number, string> = {
                1: "text-3xl",
                2: "text-2xl",
                3: "text-xl",
                4: "text-lg",
                5: "text-base",
                6: "text-sm",
            };
            const headingAlignClasses: Record<string, string> = {
                left: "text-left",
                center: "text-center",
                right: "text-right",
            };
            const headingClassName = `font-bold text-gray-900 dark:text-white ${sizeClasses[item.props.level]} ${headingAlignClasses[item.props.align] || "text-left"}`;
            return React.createElement(
                `h${item.props.level}`,
                { className: headingClassName },
                item.props.text
            );

        case "image":
        case "gif":
            return <ImagePreview item={item} />;

        case "badge-group":
            const badgeJustifyClasses: Record<string, string> = {
                left: "justify-start",
                center: "justify-center",
                right: "justify-end",
            };
            return (
                <div className={`flex flex-wrap gap-2 ${badgeJustifyClasses[item.props.align] || "justify-start"}`}>
                    {item.props.badges.map((badge, i) => (
                        <img
                            key={i}
                            src={generateBadgeUrl(badge.label, badge.message, badge.color, {
                                style: badge.style,
                                logo: badge.logo,
                            })}
                            alt={badge.label}
                            className="h-7"
                        />
                    ))}
                </div>
            );

        case "tech-stack":
            return (
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {item.props.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {item.props.items.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            );

        case "projects-list":
            return (
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {item.props.title}
                    </h3>
                    <div className="space-y-2">
                        {item.props.projects.map((project, i) => (
                            <div key={i} className="p-2 rounded bg-gray-50 dark:bg-gray-800/50">
                                <div className="font-medium text-sm">{project.name}</div>
                                <div className="text-xs text-gray-500 truncate">{project.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case "github-stats":
            const statsUsername = item.props.username || username;
            return (
                <div className={`flex flex-wrap gap-4 justify-${item.props.layout === "row" ? "center" : "start"} ${item.props.layout === "column" ? "flex-col items-center" : ""}`}>
                    {item.props.showStats && (
                        <StatImage
                            src={generateGitHubStatsUrl(statsUsername, { theme: item.props.theme })}
                            alt="GitHub Stats"
                            serviceName="GitHub Readme Stats"
                        />
                    )}
                    {item.props.showTopLangs && (
                        <StatImage
                            src={generateTopLangsUrl(statsUsername, { theme: item.props.theme })}
                            alt="Top Languages"
                            serviceName="GitHub Readme Stats"
                        />
                    )}
                    {item.props.showStreak && (
                        <StatImage
                            src={generateStreakStatsUrl(statsUsername, { theme: item.props.theme })}
                            alt="Streak Stats"
                            serviceName="GitHub Streak Stats"
                        />
                    )}
                </div>
            );

        case "contribution-snake":
            return (
                <div className="text-center">
                    <img
                        src={generateContributionSnakeUrl(item.props.username || username, { variant: item.props.variant })}
                        alt="Contribution Snake"
                        className="max-w-full inline-block rounded"
                    />
                </div>
            );

        case "social-links":
            return (
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {item.props.title}
                    </h3>
                    <div className={`flex flex-wrap gap-2 ${item.props.align === "center" ? "justify-center" :
                        item.props.align === "right" ? "justify-end" : "justify-start"
                        }`}>
                        {item.props.links.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {link.label || link.platform}
                            </a>
                        ))}
                    </div>
                </div>
            );

        case "spacer":
            const spacerHeights = { xs: "h-4", sm: "h-8", md: "h-12", lg: "h-16", xl: "h-24" };
            return (
                <div className={`${spacerHeights[item.props.height]} flex items-center justify-center`}>
                    <span className="text-xs text-gray-400">Spacer ({item.props.height})</span>
                </div>
            );

        case "divider":
            const dividerWidths = { full: "w-full", half: "w-1/2", third: "w-1/3" };
            const dividerStyles = {
                line: "border-gray-300 dark:border-gray-600",
                dashed: "border-dashed border-gray-300 dark:border-gray-600",
                dotted: "border-dotted border-gray-300 dark:border-gray-600",
                gradient: "bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent h-px border-0",
            };
            return (
                <div className="py-2 flex justify-center">
                    <hr className={`${dividerWidths[item.props.width]} ${dividerStyles[item.props.style]}`} />
                </div>
            );

        default:
            return <div className="text-gray-500">Unknown component</div>;
    }
};

export default CanvasItemRenderer;
