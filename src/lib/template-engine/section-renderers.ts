/**
 * Template Engine - Section Renderers
 *
 * Pure functions that convert Section data + UserProfile
 * into IR blocks. Each renderer is isolated and testable.
 *
 * Design:
 * - No side effects
 * - No API calls
 * - Deterministic output
 * - Exhaustive switch handling
 */

import type {
    Section,
    SectionType,
    HeroSection,
    AboutSection,
    TechStackSection,
    GitHubStatsSection,
    ProjectsSection,
    ExperienceSection,
    EducationSection,
    AchievementsSection,
    BlogPostsSection,
    ContactSection,
    SocialsSection,
    QuoteSection,
    DividerSection,
    SpacerSection,
    CustomMarkdownSection,
    CustomHtmlSection,
    SpotifySection,
    WakatimeSection,
    ContributionsSection,
    PinnedReposSection,
    HexColor,
    UrlString,
} from "@/types";

import type { UserProfile } from "@/types";

import type {
    Block,
    RenderedSection,
    RenderContext,
    SocialPlatformId,
} from "./types";

import * as B from "./builders";

import type { RenderError } from "./errors";
import { githubUsernameRequired, sectionRenderFailed } from "./errors";

// ============================================================================
// SECTION RENDERER TYPE
// ============================================================================

/** Result of rendering a section */
export type SectionRenderResult =
    | { readonly success: true; readonly blocks: readonly Block[] }
    | { readonly success: false; readonly error: RenderError };

/** Section renderer function signature */
export type SectionRenderer<T extends Section = Section> = (
    section: T,
    profile: UserProfile,
    context: RenderContext
) => SectionRenderResult;

// ============================================================================
// HERO SECTION RENDERER
// ============================================================================

const renderHeroSection: SectionRenderer<HeroSection> = (section, profile) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Resolve headline with profile data
        const headline = data.headline
            .replace("{name}", profile.personal.displayName.customName ?? profile.githubUsername)
            .replace("{username}", profile.githubUsername);

        // Add wave image if configured
        if (data.showWaveAnimation) {
            blocks.push(
                B.image(
                    // Using a reliable wave animation from the GitHub user-attachments CDN
                    "https://user-images.githubusercontent.com/18350557/176309783-0785949b-9127-417c-8b55-ab5a4333674e.gif" as UrlString,
                    "Wave",
                    { align: "center", isAnimated: true }
                )
            );
        }

        // Main headline
        blocks.push(B.heading(headline, 1, { align: "center" }));

        // Subheadline if present
        if (data.subheadline) {
            blocks.push(B.heading(data.subheadline, 3, { align: "center" }));
        }

        // Typing animation if configured
        if (data.typingTexts && data.typingTexts.length > 0) {
            blocks.push(
                B.typingAnimation(data.typingTexts, {
                    speed: config.typingSpeed,
                    deleteSpeed: config.typingDeleteSpeed,
                    pauseTime: config.typingPauseTime,
                })
            );
        }

        // Tagline if present
        if (data.tagline) {
            blocks.push(B.text(data.tagline, { emphasis: "italic", align: "center" }));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "hero", String(e)),
        };
    }
};

// ============================================================================
// ABOUT SECTION RENDERER
// ============================================================================

const renderAboutSection: SectionRenderer<AboutSection> = (section, profile) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Avatar if configured
        if (config.showAvatar && profile.github?.user.avatarUrl) {
            blocks.push(
                B.image(profile.github.user.avatarUrl, `${profile.githubUsername}'s avatar`, {
                    size: config.avatarSize as "sm" | "md" | "lg",
                    align: config.avatarPosition === "left" ? "left" : "center",
                })
            );
        }

        // Main content
        const content = data.content
            .replace("{years}", String(profile.professional.yearsOfExperience ?? "X"));

        blocks.push(B.text(content, { emphasis: "normal" }));

        // Highlights as list
        if (data.highlights && data.highlights.length > 0) {
            blocks.push(B.spacer("sm"));
            blocks.push(
                B.list(
                    data.highlights.map((h) => B.listItem(h, { icon: config.highlightIcon })),
                    { listType: config.showHighlightsAsBullets ? "unordered" : "none" }
                )
            );
        }

        // Current focus
        if (data.currentFocus) {
            blocks.push(B.spacer("sm"));
            blocks.push(B.text(`🔭 **Currently:** ${data.currentFocus}`, { emphasis: "normal" }));
        }

        // Location
        if (data.location || profile.personal.location) {
            blocks.push(
                B.text(`📍 ${data.location ?? profile.personal.location}`, { emphasis: "normal" })
            );
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "about", String(e)),
        };
    }
};

// ============================================================================
// TECH STACK SECTION RENDERER
// ============================================================================

const renderTechStackSection: SectionRenderer<TechStackSection> = (section, profile) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Use section data or fall back to profile tech stack
        const items = data.items.length > 0 ? data.items : profile.techStack.items;

        if (config.displayStyle === "badges") {
            // Group by category if configured
            if (data.groupByCategory && config.showCategoryHeaders) {
                // Use mutable array type for grouping
                type TechItem = (typeof items)[number];
                const categories = new Map<string, TechItem[]>();

                for (const item of items) {
                    const category = item.category;
                    if (!categories.has(category)) {
                        categories.set(category, []);
                    }
                    categories.get(category)!.push(item);
                }

                for (const [category, categoryItems] of categories) {
                    // Category heading
                    blocks.push(B.heading(formatCategoryName(category), 4, { align: "left" }));

                    // Badges for this category
                    const badges = categoryItems.map((item) =>
                        B.badge(item.name, {
                            logo: item.name.toLowerCase().replace(/\s+/g, ""),
                            style: config.badgeStyle as "flat" | "flat-square" | "for-the-badge",
                            color: "#0969da" as HexColor,
                        })
                    );

                    blocks.push(B.badgeGroup(badges, { align: "left", gap: "sm" }));
                    blocks.push(B.spacer("sm"));
                }
            } else {
                // Flat list of badges
                const badges = items.map((item) =>
                    B.badge(item.name, {
                        logo: item.name.toLowerCase().replace(/\s+/g, ""),
                        style: config.badgeStyle as "flat" | "flat-square" | "for-the-badge",
                    })
                );

                blocks.push(B.badgeGroup(badges, { align: "center" }));
            }
        } else {
            // Grid layout
            const gridItems = items.map((item) =>
                B.text(item.name, { emphasis: "normal" })
            );

            blocks.push(B.grid(gridItems, { columns: config.columns }));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "tech-stack", String(e)),
        };
    }
};

/** Format category name for display */
const formatCategoryName = (category: string): string => {
    return category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

// ============================================================================
// GITHUB STATS SECTION RENDERER
// ============================================================================

const renderGitHubStatsSection: SectionRenderer<GitHubStatsSection> = (
    section,
    profile
) => {
    try {
        const username = profile.githubUsername;

        if (!username) {
            return {
                success: false,
                error: githubUsernameRequired(section.id, "github-stats"),
            };
        }

        const blocks: Block[] = [];
        const { data, config } = section;

        const cards = data.cards.map((cardType) =>
            B.githubStatsCard(username, cardType, {
                theme: String(config.theme),
                showIcons: config.showIcons,
                hideBorder: config.hideBorder,
                includeAllCommits: config.includeAllCommits,
                countPrivate: config.countPrivateContributions,
            })
        );

        if (config.cardLayout === "row") {
            blocks.push(B.row(cards, { gap: "md", wrap: true }));
        } else {
            blocks.push(B.grid(cards, { columns: 2 }));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "github-stats", String(e)),
        };
    }
};

// ============================================================================
// PROJECTS SECTION RENDERER
// ============================================================================

const renderProjectsSection: SectionRenderer<ProjectsSection> = (section, profile) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Use section data directly
        let projects = [...data.items];

        // Filter featured only if configured
        if (data.showFeaturedOnly) {
            projects = projects.filter((p) => p.featured);
        }

        // Limit to max projects
        if (config.maxProjects) {
            projects = projects.slice(0, config.maxProjects);
        }

        const projectCards = projects.map((project) =>
            B.projectCard(project.name, project.description, {
                repoUrl: project.repoUrl,
                demoUrl: project.demoUrl,
                techStack: project.techStack,
                stars: project.stars,
                forks: project.forks,
                featured: project.featured,
            })
        );

        if (config.displayStyle === "cards" || config.displayStyle === "grid") {
            blocks.push(B.grid(projectCards, { columns: config.columns }));
        } else {
            blocks.push(...projectCards);
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "projects", String(e)),
        };
    }
};

// ============================================================================
// EXPERIENCE SECTION RENDERER
// ============================================================================

const renderExperienceSection: SectionRenderer<ExperienceSection> = (
    section,
    profile
) => {
    try {
        const blocks: Block[] = [];
        const { data } = section;

        // Use section data or profile experience
        const experiences = data.items.length > 0
            ? data.items
            : profile.professional.experience;

        for (const exp of experiences) {
            blocks.push(
                B.experienceItem(exp.company, exp.role, exp.startDate, {
                    endDate: exp.endDate,
                    location: exp.location,
                    description: exp.description,
                    highlights: exp.highlights,
                    technologies: exp.technologies,
                })
            );
            blocks.push(B.spacer("sm"));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "experience", String(e)),
        };
    }
};

// ============================================================================
// EDUCATION SECTION RENDERER
// ============================================================================

const renderEducationSection: SectionRenderer<EducationSection> = (
    section,
    profile
) => {
    try {
        const blocks: Block[] = [];
        const { data } = section;

        // Use section data or profile education
        const educations = data.items.length > 0
            ? data.items
            : profile.professional.education;

        for (const edu of educations) {
            blocks.push(
                B.educationItem(edu.institution, edu.degree, edu.startDate, {
                    endDate: edu.endDate,
                    field: edu.field,
                    gpa: edu.gpa,
                    honors: edu.honors,
                })
            );
            blocks.push(B.spacer("sm"));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "education", String(e)),
        };
    }
};

// ============================================================================
// ACHIEVEMENTS SECTION RENDERER
// ============================================================================

const renderAchievementsSection: SectionRenderer<AchievementsSection> = (section) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        const achievementItems = data.items.map((item) => {
            // Handle icon which can be Asset | string | undefined
            const iconString = typeof item.icon === "string" ? item.icon : undefined;

            return B.achievementItem(item.title, {
                description: item.description,
                date: item.date,
                issuer: item.issuer,
                icon: iconString,
                url: item.url,
            });
        });

        if (config.displayStyle === "grid") {
            blocks.push(B.grid(achievementItems, { columns: config.columns }));
        } else {
            blocks.push(...achievementItems);
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "achievements", String(e)),
        };
    }
};

// ============================================================================
// BLOG POSTS SECTION RENDERER
// ============================================================================

const renderBlogPostsSection: SectionRenderer<BlogPostsSection> = (section) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Use maxPosts from data or default
        const maxPosts = data.maxPosts ?? 5;
        const posts = data.items.slice(0, maxPosts);

        for (const post of posts) {
            const postBlocks: Block[] = [
                B.link(post.url, post.title, { external: true }),
            ];

            if (config.showExcerpt && post.excerpt) {
                postBlocks.push(B.text(post.excerpt, { emphasis: "normal" }));
            }

            if (config.showDate && post.date) {
                postBlocks.push(B.text(post.date, { emphasis: "italic" }));
            }

            blocks.push(B.column(postBlocks));
            blocks.push(B.spacer("sm"));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "blog-posts", String(e)),
        };
    }
};

// ============================================================================
// CONTACT SECTION RENDERER
// ============================================================================

const renderContactSection: SectionRenderer<ContactSection> = (section) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Headline
        if (data.headline) {
            blocks.push(B.heading(data.headline, 3, { align: "center" }));
        }

        // Description (not message)
        if (data.description) {
            blocks.push(B.text(data.description, { align: "center" }));
        }

        // Contact methods
        const methods = data.methods;

        // Display based on style
        const links = methods.map((m) =>
            B.link(m.value as UrlString, m.label ?? m.type, { external: true })
        );

        if (config.displayStyle === "minimal") {
            blocks.push(B.row(links, { gap: "md" }));
        } else {
            const listItems = methods.map((m) =>
                B.listItem(`**${m.type}:** ${m.value}`)
            );
            blocks.push(B.list(listItems));
        }

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "contact", String(e)),
        };
    }
};

// ============================================================================
// SOCIALS SECTION RENDERER
// ============================================================================

const mapToPlatformId = (platform: string): SocialPlatformId => {
    const mapping: Record<string, SocialPlatformId> = {
        github: "github",
        twitter: "twitter",
        linkedin: "linkedin",
        instagram: "instagram",
        youtube: "youtube",
        twitch: "twitch",
        discord: "discord",
        email: "email",
        website: "website",
        "dev.to": "other",
        medium: "other",
        hashnode: "other",
    };
    return mapping[platform.toLowerCase()] ?? "other";
};

const renderSocialsSection: SectionRenderer<SocialsSection> = (section, profile) => {
    try {
        const blocks: Block[] = [];
        const { data, config } = section;

        // Use section data or profile social links
        const links = data.links.length > 0 ? data.links : profile.socialLinks.links;

        const socialLinks = links.map((link) =>
            B.socialLink(mapToPlatformId(link.platform), link.url, {
                username: link.username,
                label: link.label,
                showIcon: true,
                showLabel: config.showLabels,
            })
        );

        // Map displayStyle, handling "pills" and "minimal" as "badges"
        let style: "icons" | "badges" | "buttons" = "badges";
        if (config.displayStyle === "icons") style = "icons";
        else if (config.displayStyle === "buttons") style = "buttons";

        blocks.push(
            B.socialGroup(socialLinks, {
                style,
                align: "center",
            })
        );

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "socials", String(e)),
        };
    }
};

// ============================================================================
// UTILITY SECTION RENDERERS
// ============================================================================

const renderQuoteSection: SectionRenderer<QuoteSection> = (section) => {
    try {
        const { data } = section;
        // QuoteSectionData has `quote`, not `text`
        return {
            success: true,
            blocks: [
                B.quote(data.quote, {
                    author: data.author,
                    source: data.source,
                }),
            ],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "quote", String(e)),
        };
    }
};

const renderDividerSection: SectionRenderer<DividerSection> = (section) => {
    try {
        const { data, config } = section;
        // DividerSectionData has `style`, DividerSectionConfig has `width`
        const styleMap: Record<string, "solid" | "dashed" | "dotted" | "gradient" | "wave"> = {
            line: "solid",
            dashed: "dashed",
            dotted: "dotted",
            gradient: "gradient",
            wave: "wave",
            none: "solid",
        };

        return {
            success: true,
            blocks: [
                B.divider({
                    style: styleMap[data.style] ?? "solid",
                    width: config.width,
                }),
            ],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "divider", String(e)),
        };
    }
};

const renderSpacerSection: SectionRenderer<SpacerSection> = (section) => {
    try {
        const { data } = section;
        // SpacerSectionData has height as SpacingToken
        const heightMap: Record<string, "xs" | "sm" | "md" | "lg" | "xl"> = {
            "0": "xs",
            "1": "xs",
            "2": "sm",
            "3": "sm",
            "4": "md",
            "5": "md",
            "6": "lg",
            "8": "lg",
            "10": "xl",
            "12": "xl",
            "16": "xl",
        };

        return {
            success: true,
            blocks: [B.spacer(heightMap[data.height] ?? "md")],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "spacer", String(e)),
        };
    }
};

// ============================================================================
// CUSTOM SECTION RENDERERS
// ============================================================================

const renderCustomMarkdownSection: SectionRenderer<CustomMarkdownSection> = (section) => {
    try {
        const { data } = section;
        // Store raw markdown in a custom block for later processing
        return {
            success: true,
            blocks: [
                {
                    id: B.generateBlockId("custom-md"),
                    kind: "custom" as const,
                    customType: "markdown",
                    data: { content: data.markdown },
                    visible: true,
                },
            ],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "custom-markdown", String(e)),
        };
    }
};

const renderCustomHtmlSection: SectionRenderer<CustomHtmlSection> = (section) => {
    try {
        const { data } = section;
        return {
            success: true,
            blocks: [
                {
                    id: B.generateBlockId("custom-html"),
                    kind: "custom" as const,
                    customType: "html",
                    data: { content: data.html, sanitize: data.sanitize },
                    visible: true,
                },
            ],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "custom-html", String(e)),
        };
    }
};

// ============================================================================
// INTEGRATION SECTION RENDERERS
// ============================================================================

const renderSpotifySection: SectionRenderer<SpotifySection> = (section) => {
    try {
        const { data, config } = section;
        const blocks: Block[] = [];

        // SpotifySectionData has `type` (now-playing | top-tracks | recently-played)
        blocks.push({
            id: B.generateBlockId("spotify"),
            kind: "custom" as const,
            customType: `spotify-${data.type}`,
            data: {
                embedUrl: data.embedUrl,
                theme: config.theme,
                showAlbumArt: config.showAlbumArt,
                compact: config.compact,
            },
            visible: true,
        });

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "spotify", String(e)),
        };
    }
};

const renderWakatimeSection: SectionRenderer<WakatimeSection> = (section, profile) => {
    try {
        const { data, config } = section;

        const username = data.username || profile.integrations.wakatime.username;
        if (!username) {
            return {
                success: false,
                error: sectionRenderFailed(section.id, "wakatime", "Wakatime username required"),
            };
        }

        return {
            success: true,
            blocks: [
                {
                    id: B.generateBlockId("wakatime"),
                    kind: "custom" as const,
                    customType: "wakatime-stats",
                    data: {
                        username,
                        range: data.range,
                        showLanguages: config.showLanguages,
                        showEditors: config.showEditors,
                        layout: config.layout,
                    },
                    visible: true,
                },
            ],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "wakatime", String(e)),
        };
    }
};

const renderContributionsSection: SectionRenderer<ContributionsSection> = (
    section,
    profile
) => {
    try {
        const username = profile.githubUsername;

        if (!username) {
            return {
                success: false,
                error: githubUsernameRequired(section.id, "contributions"),
            };
        }

        const { data, config } = section;

        return {
            success: true,
            blocks: [
                B.contributionGraph(username, {
                    theme: String(config.theme),
                    showLegend: data.showLegend,
                }),
            ],
        };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "contributions", String(e)),
        };
    }
};

const renderPinnedReposSection: SectionRenderer<PinnedReposSection> = (
    section,
    profile
) => {
    try {
        const username = profile.githubUsername;

        if (!username) {
            return {
                success: false,
                error: githubUsernameRequired(section.id, "pinned-repos"),
            };
        }

        const blocks: Block[] = [];
        const { data } = section;

        // PinnedReposSectionData has repos as string[] and maxRepos
        const maxRepos = data.maxRepos;
        const repoNames = data.repos?.slice(0, maxRepos) ?? [];

        // For now, just create placeholder cards for repo names
        // In production, this would be populated from GitHub API data stored in profile
        const repoCards = repoNames.map((repoName) =>
            B.projectCard(repoName, "", {
                repoUrl: `https://github.com/${username}/${repoName}` as UrlString,
            })
        );

        // If no specific repos listed, use pinned repos from profile
        if (repoCards.length === 0 && profile.github?.stats.pinnedRepos) {
            const pinnedRepos = profile.github.stats.pinnedRepos.slice(0, maxRepos);
            for (const repo of pinnedRepos) {
                repoCards.push(
                    B.projectCard(repo.name, repo.description ?? "", {
                        repoUrl: repo.htmlUrl,
                        techStack: repo.language ? [repo.language] : [],
                        stars: repo.stargazersCount,
                        forks: repo.forksCount,
                    })
                );
            }
        }

        blocks.push(B.grid(repoCards, { columns: 2 }));

        return { success: true, blocks };
    } catch (e) {
        return {
            success: false,
            error: sectionRenderFailed(section.id, "pinned-repos", String(e)),
        };
    }
};

// ============================================================================
// SECTION RENDERER REGISTRY
// ============================================================================

/** Registry mapping section types to their renderers */
const sectionRenderers: Record<SectionType, SectionRenderer<never>> = {
    hero: renderHeroSection as SectionRenderer<never>,
    about: renderAboutSection as SectionRenderer<never>,
    "tech-stack": renderTechStackSection as SectionRenderer<never>,
    "github-stats": renderGitHubStatsSection as SectionRenderer<never>,
    projects: renderProjectsSection as SectionRenderer<never>,
    experience: renderExperienceSection as SectionRenderer<never>,
    education: renderEducationSection as SectionRenderer<never>,
    achievements: renderAchievementsSection as SectionRenderer<never>,
    "blog-posts": renderBlogPostsSection as SectionRenderer<never>,
    contact: renderContactSection as SectionRenderer<never>,
    socials: renderSocialsSection as SectionRenderer<never>,
    quote: renderQuoteSection as SectionRenderer<never>,
    divider: renderDividerSection as SectionRenderer<never>,
    spacer: renderSpacerSection as SectionRenderer<never>,
    "custom-markdown": renderCustomMarkdownSection as SectionRenderer<never>,
    "custom-html": renderCustomHtmlSection as SectionRenderer<never>,
    spotify: renderSpotifySection as SectionRenderer<never>,
    wakatime: renderWakatimeSection as SectionRenderer<never>,
    contributions: renderContributionsSection as SectionRenderer<never>,
    "pinned-repos": renderPinnedReposSection as SectionRenderer<never>,
};

// ============================================================================
// MAIN SECTION RENDER FUNCTION
// ============================================================================

/**
 * Render a section to IR blocks
 * Uses exhaustive switch for compile-time safety
 */
export const renderSection = (
    section: Section,
    profile: UserProfile,
    context: RenderContext
): SectionRenderResult => {
    const renderer = sectionRenderers[section.type];

    if (!renderer) {
        // This should never happen due to exhaustive registry
        return {
            success: false,
            error: sectionRenderFailed(
                section.id,
                section.type,
                `No renderer found for section type: ${section.type}`
            ),
        };
    }

    return renderer(section as never, profile, context);
};

/**
 * Convert section render result to RenderedSection
 */
export const toRenderedSection = (
    section: Section,
    result: SectionRenderResult,
    order: number
): RenderedSection | null => {
    if (!result.success) {
        return null;
    }

    return {
        id: section.id,
        type: section.type,
        title: section.title,
        blocks: result.blocks,
        visible: section.enabled,
        order,
    };
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
    renderHeroSection,
    renderAboutSection,
    renderTechStackSection,
    renderGitHubStatsSection,
    renderProjectsSection,
    renderExperienceSection,
    renderEducationSection,
    renderAchievementsSection,
    renderBlogPostsSection,
    renderContactSection,
    renderSocialsSection,
    renderQuoteSection,
    renderDividerSection,
    renderSpacerSection,
    renderCustomMarkdownSection,
    renderCustomHtmlSection,
    renderSpotifySection,
    renderWakatimeSection,
    renderContributionsSection,
    renderPinnedReposSection,
};
