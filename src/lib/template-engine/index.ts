/**
 * Template Engine - Public API
 *
 * Central barrel export for the template engine.
 * Import from '@/lib/template-engine' for clean access.
 *
 * @example
 * import { render, RenderOutput, Block } from '@/lib/template-engine';
 *
 * const result = render(template, profile);
 * if (result.success) {
 *   console.log(result.output.sections);
 * }
 */

// ============================================================================
// CORE RENDERER
// ============================================================================

export {
    render,
    renderTemplate,
    renderSingleSection,
    validate,
    analyzeTemplate,
    type RenderOptions,
    type RenderResult,
} from "./renderer";

// ============================================================================
// TYPES (Intermediate Representation)
// ============================================================================

export type {
    // Context
    RenderContext,
    // Block kinds
    BlockKind,
    // Base types
    Block,
    TextEmphasis,
    HeadingLevel,
    ImageSize,
    BadgeStyle,
    ListType,
    SocialPlatformId,
    GitHubCardType,
    // Text blocks
    TextBlock,
    HeadingBlock,
    ParagraphBlock,
    CodeBlock,
    QuoteBlock,
    // Media blocks
    ImageBlock,
    LinkBlock,
    // Badge blocks
    BadgeBlock,
    BadgeGroupBlock,
    // List blocks
    ListBlock,
    ListItem,
    // Layout blocks
    SpacerBlock,
    DividerBlock,
    RowBlock,
    ColumnBlock,
    GridBlock,
    // Stat blocks
    StatBlock,
    StatGroupBlock,
    // Social blocks
    SocialLinkBlock,
    SocialGroupBlock,
    // Animation blocks
    TypingAnimationBlock,
    // GitHub blocks
    GitHubStatsCardBlock,
    ContributionGraphBlock,
    // Card blocks
    CardBlock,
    ProjectCardBlock,
    ExperienceItemBlock,
    EducationItemBlock,
    AchievementItemBlock,
    // Custom blocks
    CustomBlock,
    // Section and output
    RenderedSection,
    RenderOutput,
    RenderMetadata,
    RenderWarning,
    // Input types
    BlockInput,
} from "./types";

// ============================================================================
// BLOCK BUILDERS
// ============================================================================

export {
    // ID generation
    generateBlockId,
    resetBlockIdCounter,
    // Text blocks
    text,
    heading,
    paragraph,
    code,
    quote,
    // Media blocks
    image,
    link,
    // Badge blocks
    badge,
    badgeGroup,
    // List blocks
    listItem,
    list,
    // Layout blocks
    spacer,
    divider,
    row,
    column,
    grid,
    // Stat blocks
    stat,
    statGroup,
    // Social blocks
    socialLink,
    socialGroup,
    // Animation blocks
    typingAnimation,
    // GitHub blocks
    githubStatsCard,
    contributionGraph,
    // Card blocks
    projectCard,
    experienceItem,
    educationItem,
    achievementItem,
} from "./builders";

// ============================================================================
// ERRORS
// ============================================================================

export type {
    RenderErrorCode,
    RenderError,
    // Specific error types
    TemplateNotFoundError,
    TemplateInvalidError,
    SectionUnsupportedError,
    SectionRenderError,
    SectionDataInvalidError,
    ProfileMissingError,
    ProfileIncompleteError,
    GitHubUsernameRequiredError,
    AssetNotFoundError,
    AssetParamsMissingError,
    CapabilityNotSupportedError,
    SectionLimitExceededError,
    ValidationFailedError,
    UnknownError,
    ValidationIssue,
} from "./errors";

export {
    // Error factories
    templateNotFound,
    sectionUnsupported,
    sectionRenderFailed,
    profileIncomplete,
    githubUsernameRequired,
    capabilityNotSupported,
    sectionLimitExceeded,
    validationFailed,
    unknownError,
    // Type guards
    isRenderError,
    isRecoverable,
    isSectionError,
    isProfileError,
} from "./errors";

// ============================================================================
// VALIDATION
// ============================================================================

export {
    validateTemplate,
    validateSections,
    validateProfile,
    validateAll,
    isSectionSupported,
    supportsAnimations,
    supportsGitHubStats,
    supportsDarkMode,
    supportsCustomSections,
    type ValidationResult,
} from "./validation";

// ============================================================================
// SECTION RENDERERS (Advanced usage)
// ============================================================================

export {
    renderSection,
    toRenderedSection,
    type SectionRenderResult,
    type SectionRenderer,
    // Individual renderers for testing/extension
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
} from "./section-renderers";
