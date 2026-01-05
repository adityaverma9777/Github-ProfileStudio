/**
 * GitHub Profile Studio - Type Definitions
 *
 * Central barrel export for all type definitions.
 * Import from '@/types' for clean, organized access.
 *
 * @example
 * import type { Template, Section, UserProfile, EditorState } from '@/types';
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export type {
    // Branded types
    TemplateId,
    SectionId,
    AssetId,
    GitHubUsername,
    HexColor,
    UrlString,
    ISODateString,
    // Semantic version
    SemanticVersion,
    // Styling primitives
    ColorScheme,
    FontWeight,
    FontStyle,
    TextAlign,
    BorderRadiusToken,
    SpacingToken,
    // Animation primitives
    EasingFunction,
    AnimationDirection,
    AnimationFillMode,
    AnimationTiming,
    // Layout primitives
    FlexAlign,
    FlexJustify,
    FlexDirection,
    GridSpan,
    // Visibility
    VisibilityCondition,
    // Results
    Result,
    AsyncResult,
    // Metadata
    AuditTimestamps,
    AuthorInfo,
    LocaleCode,
    LocalizedString,
} from "./common";

export {
    // Brand constructors
    createTemplateId,
    createSectionId,
    createAssetId,
    createGitHubUsername,
    createHexColor,
    createUrlString,
    createISODateString,
    // Utilities
    parseVersion,
    // Defaults
    DEFAULT_ANIMATION_TIMING,
    DEFAULT_VISIBILITY,
} from "./common";

// ============================================================================
// ASSET TYPES
// ============================================================================

export type {
    // Asset kinds
    AssetKind,
    AssetSource,
    // Asset parameters
    BaseAssetParams,
    ColorAssetParams,
    AnimatedAssetParams,
    GitHubAssetParams,
    ShieldsBadgeParams,
    WakatimeAssetParams,
    AssetParams,
    // Asset definitions
    StaticSvgAsset,
    AnimatedSvgAsset,
    GifAsset,
    StaticImageAsset,
    Asset,
    // Asset templates
    AssetTemplate,
    GitHubStatsCardTemplate,
    ShieldsBadgeTemplate,
    SpecializedAssetTemplate,
    // Registry
    AssetCategory,
    AssetCollection,
    AssetRegistry,
    // URL generation
    UrlGenerationContext,
    GeneratedAssetUrl,
} from "./asset";

export {
    // Type guards
    isAnimatedSvgAsset,
    isStaticSvgAsset,
    isGifAsset,
    isStaticImageAsset,
    isAnimatedAsset,
} from "./asset";

// ============================================================================
// SECTION TYPES
// ============================================================================

export type {
    // Section base
    SectionType,
    SectionBaseConfig,
    // Hero section
    HeroLayout,
    HeroSectionData,
    HeroSectionConfig,
    HeroSection,
    // About section
    AboutSectionData,
    AboutSectionConfig,
    AboutSection,
    // Tech stack section
    TechCategory,
    TechStackItem,
    TechStackSectionData,
    TechStackDisplayStyle,
    TechStackSectionConfig,
    TechStackSection,
    // GitHub stats section
    GitHubStatsCardType,
    GitHubStatsSectionData,
    GitHubStatsSectionConfig,
    GitHubStatsSection,
    // Projects section
    ProjectStatus,
    ProjectItem,
    ProjectsSectionData,
    ProjectsDisplayStyle,
    ProjectsSectionConfig,
    ProjectsSection,
    // Experience section
    ExperienceItem,
    ExperienceSectionData,
    ExperienceSectionConfig,
    ExperienceSection,
    // Education section
    EducationItem,
    EducationSectionData,
    EducationSectionConfig,
    EducationSection,
    // Achievements section
    AchievementItem,
    AchievementsSectionData,
    AchievementsSectionConfig,
    AchievementsSection,
    // Blog section
    BlogPostItem,
    BlogPostsSectionData,
    BlogPostsSectionConfig,
    BlogPostsSection,
    // Contact section
    ContactMethod,
    ContactSectionData,
    ContactSectionConfig,
    ContactSection,
    // Socials section
    SocialPlatform,
    SocialLink,
    SocialsSectionData,
    SocialsDisplayStyle,
    SocialsSectionConfig,
    SocialsSection,
    // Utility sections
    QuoteSectionData,
    QuoteSectionConfig,
    QuoteSection,
    DividerSectionData,
    DividerSectionConfig,
    DividerSection,
    SpacerSectionData,
    SpacerSection,
    // Custom sections
    CustomMarkdownSectionData,
    CustomMarkdownSection,
    CustomHtmlSectionData,
    CustomHtmlSection,
    // Integration sections
    SpotifySectionData,
    SpotifySectionConfig,
    SpotifySection,
    WakatimeSectionData,
    WakatimeSectionConfig,
    WakatimeSection,
    ContributionsSectionData,
    ContributionsSectionConfig,
    ContributionsSection,
    PinnedReposSectionData,
    PinnedReposSectionConfig,
    PinnedReposSection,
    // Union type
    Section,
} from "./section";

export {
    // Defaults
    DEFAULT_SECTION_CONFIG,
    // Type guards
    isHeroSection,
    isAboutSection,
    isTechStackSection,
    isGitHubStatsSection,
    isProjectsSection,
    isSocialsSection,
    isContactSection,
    isCustomSection,
    isUtilitySection,
    requiresGitHubUsername,
} from "./section";

// ============================================================================
// TEMPLATE TYPES
// ============================================================================

export type {
    // Categories
    TemplateCategory,
    TemplateComplexity,
    TemplateDensity,
    // Metadata
    TemplateMetadata,
    // Styles
    FontConfig,
    ColorPalette,
    ThemeVariant,
    TemplateStyles,
    // Layout
    LayoutDirection,
    LayoutSlot,
    TemplateLayout,
    // Capabilities
    TemplateCapabilities,
    // Defaults
    TemplateDefaults,
    // Complete template
    Template,
    TemplateInput,
    TemplateSummary,
    // Registry
    TemplateCollection,
    TemplateRegistry,
} from "./template";

export {
    // Defaults
    DEFAULT_TEMPLATE_STYLES,
    DEFAULT_TEMPLATE_CAPABILITIES,
    // Utilities
    isTemplateCategory,
    isPremiumTemplate,
    isFeaturedTemplate,
    toTemplateSummary,
} from "./template";

// ============================================================================
// PROFILE TYPES
// ============================================================================

export type {
    // GitHub data
    GitHubUserData,
    GitHubRepositoryData,
    GitHubLanguageStats,
    GitHubContribution,
    GitHubContributionCalendar,
    GitHubStatsSummary,
    GitHubProfile,
    // Display preferences
    DisplayNameConfig,
    AvatarConfig,
    // Personal info
    PersonalInfo,
    // Professional info
    WorkExperience,
    Education,
    Certification,
    ProfessionalInfo,
    // Tech stack
    UserTechStack,
    // Social links
    UserSocialLinks,
    // Projects
    UserProject,
    UserProjects,
    // Custom fields
    CustomFieldType,
    CustomField,
    CustomFields,
    // Integrations
    BlogConfig,
    SpotifyConfig,
    WakatimeConfig,
    IntegrationConfigs,
    // Complete profile
    UserProfile,
    UserProfileInput,
    UserProfileSummary,
} from "./profile";

export {
    // Type guards
    hasGitHubProfile,
    isAvailableForHire,
    hasWorkExperience,
    hasFeaturedProjects,
} from "./profile";

// ============================================================================
// EDITOR TYPES
// ============================================================================

export type {
    // Modes
    EditorMode,
    PreviewMode,
    PreviewTheme,
    SidebarPanel,
    // Selection
    EditorSelection,
    SelectionAction,
    // Edit operations
    EditOperationType,
    EditOperation,
    EditHistory,
    // Validation
    ValidationSeverity,
    ValidationIssue,
    ValidationState,
    // Sync
    SyncStatus,
    SyncState,
    // Dirty tracking
    DirtyState,
    // Panel config
    PanelConfig,
    // Preferences
    EditorPreferences,
    // Drag and drop
    DragSourceType,
    DragState,
    // Clipboard
    ClipboardContentType,
    ClipboardState,
    // Document
    EditorDocument,
    // Actions
    SectionAction,
    StyleAction,
    // Complete state
    EditorState,
    EditorStateInput,
    // Export options
    MarkdownExportOptions,
    HtmlExportOptions,
    ImageExportOptions,
    ExportOptions,
} from "./editor";

export {
    // History utilities
    canUndo,
    canRedo,
    // Defaults
    DEFAULT_PANEL_CONFIG,
    DEFAULT_EDITOR_PREFERENCES,
    DEFAULT_EXPORT_OPTIONS,
    // State predicates
    isDirty,
    hasSelection,
    hasMultiSelection,
    isValidDocument,
    isSynced,
    hasUnsavedChanges,
} from "./editor";
