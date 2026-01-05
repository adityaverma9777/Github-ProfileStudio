/**
 * Template Engine - Error Definitions
 *
 * Typed, descriptive errors for the template engine.
 * All errors include context for debugging.
 */

import type { SectionId, SectionType, TemplateId } from "@/types";

// ============================================================================
// ERROR CODES
// ============================================================================

/** All possible error codes */
export type RenderErrorCode =
    // Template errors
    | "TEMPLATE_NOT_FOUND"
    | "TEMPLATE_INVALID"
    | "TEMPLATE_VERSION_MISMATCH"
    // Section errors
    | "SECTION_UNSUPPORTED"
    | "SECTION_DISABLED"
    | "SECTION_RENDER_FAILED"
    | "SECTION_DATA_INVALID"
    | "SECTION_CONFIG_INVALID"
    // Profile errors
    | "PROFILE_MISSING"
    | "PROFILE_INCOMPLETE"
    | "GITHUB_USERNAME_REQUIRED"
    | "PROFILE_DATA_INVALID"
    // Asset errors
    | "ASSET_NOT_FOUND"
    | "ASSET_INVALID"
    | "ASSET_PARAMS_MISSING"
    | "ASSET_URL_GENERATION_FAILED"
    // Capability errors
    | "CAPABILITY_NOT_SUPPORTED"
    | "SECTION_LIMIT_EXCEEDED"
    // General errors
    | "UNKNOWN_ERROR"
    | "VALIDATION_FAILED";

// ============================================================================
// ERROR BASE
// ============================================================================

/** Base render error */
export interface RenderErrorBase {
    readonly code: RenderErrorCode;
    readonly message: string;
    readonly recoverable: boolean;
    readonly timestamp: string;
}

// ============================================================================
// TEMPLATE ERRORS
// ============================================================================

/** Template not found error */
export interface TemplateNotFoundError extends RenderErrorBase {
    readonly code: "TEMPLATE_NOT_FOUND";
    readonly templateId: TemplateId;
}

/** Template invalid error */
export interface TemplateInvalidError extends RenderErrorBase {
    readonly code: "TEMPLATE_INVALID";
    readonly templateId: TemplateId;
    readonly reason: string;
}

// ============================================================================
// SECTION ERRORS
// ============================================================================

/** Section not supported by template */
export interface SectionUnsupportedError extends RenderErrorBase {
    readonly code: "SECTION_UNSUPPORTED";
    readonly sectionType: SectionType;
    readonly templateId: TemplateId;
    readonly supportedSections: readonly SectionType[];
}

/** Section render failed */
export interface SectionRenderError extends RenderErrorBase {
    readonly code: "SECTION_RENDER_FAILED";
    readonly sectionId: SectionId;
    readonly sectionType: SectionType;
    readonly cause: string;
}

/** Section data invalid */
export interface SectionDataInvalidError extends RenderErrorBase {
    readonly code: "SECTION_DATA_INVALID";
    readonly sectionId: SectionId;
    readonly sectionType: SectionType;
    readonly field: string;
    readonly expected: string;
    readonly received: string;
}

// ============================================================================
// PROFILE ERRORS
// ============================================================================

/** Profile missing error */
export interface ProfileMissingError extends RenderErrorBase {
    readonly code: "PROFILE_MISSING";
}

/** Profile incomplete error */
export interface ProfileIncompleteError extends RenderErrorBase {
    readonly code: "PROFILE_INCOMPLETE";
    readonly missingFields: readonly string[];
    readonly sectionId?: SectionId;
}

/** GitHub username required */
export interface GitHubUsernameRequiredError extends RenderErrorBase {
    readonly code: "GITHUB_USERNAME_REQUIRED";
    readonly sectionId: SectionId;
    readonly sectionType: SectionType;
}

// ============================================================================
// ASSET ERRORS
// ============================================================================

/** Asset not found */
export interface AssetNotFoundError extends RenderErrorBase {
    readonly code: "ASSET_NOT_FOUND";
    readonly assetId: string;
    readonly context?: string;
}

/** Asset params missing */
export interface AssetParamsMissingError extends RenderErrorBase {
    readonly code: "ASSET_PARAMS_MISSING";
    readonly assetId: string;
    readonly missingParams: readonly string[];
}

// ============================================================================
// CAPABILITY ERRORS
// ============================================================================

/** Capability not supported */
export interface CapabilityNotSupportedError extends RenderErrorBase {
    readonly code: "CAPABILITY_NOT_SUPPORTED";
    readonly capability: string;
    readonly templateId: TemplateId;
}

/** Section limit exceeded */
export interface SectionLimitExceededError extends RenderErrorBase {
    readonly code: "SECTION_LIMIT_EXCEEDED";
    readonly maxSections: number;
    readonly actualSections: number;
    readonly templateId: TemplateId;
}

// ============================================================================
// GENERAL ERRORS
// ============================================================================

/** Validation failed error */
export interface ValidationFailedError extends RenderErrorBase {
    readonly code: "VALIDATION_FAILED";
    readonly issues: readonly ValidationIssue[];
}

/** Single validation issue */
export interface ValidationIssue {
    readonly path: readonly string[];
    readonly message: string;
    readonly value?: unknown;
}

/** Unknown error wrapper */
export interface UnknownError extends RenderErrorBase {
    readonly code: "UNKNOWN_ERROR";
    readonly originalError?: unknown;
}

// ============================================================================
// ERROR UNION
// ============================================================================

/** Discriminated union of all render errors */
export type RenderError =
    | TemplateNotFoundError
    | TemplateInvalidError
    | SectionUnsupportedError
    | SectionRenderError
    | SectionDataInvalidError
    | ProfileMissingError
    | ProfileIncompleteError
    | GitHubUsernameRequiredError
    | AssetNotFoundError
    | AssetParamsMissingError
    | CapabilityNotSupportedError
    | SectionLimitExceededError
    | ValidationFailedError
    | UnknownError;

// ============================================================================
// ERROR FACTORIES
// ============================================================================

const createTimestamp = (): string => new Date().toISOString();

/** Create template not found error */
export const templateNotFound = (templateId: TemplateId): TemplateNotFoundError => ({
    code: "TEMPLATE_NOT_FOUND",
    message: `Template with ID "${templateId}" was not found`,
    templateId,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create section unsupported error */
export const sectionUnsupported = (
    sectionType: SectionType,
    templateId: TemplateId,
    supportedSections: readonly SectionType[]
): SectionUnsupportedError => ({
    code: "SECTION_UNSUPPORTED",
    message: `Section type "${sectionType}" is not supported by template "${templateId}". Supported sections: ${supportedSections.join(", ")}`,
    sectionType,
    templateId,
    supportedSections,
    recoverable: true,
    timestamp: createTimestamp(),
});

/** Create section render error */
export const sectionRenderFailed = (
    sectionId: SectionId,
    sectionType: SectionType,
    cause: string
): SectionRenderError => ({
    code: "SECTION_RENDER_FAILED",
    message: `Failed to render section "${sectionId}" of type "${sectionType}": ${cause}`,
    sectionId,
    sectionType,
    cause,
    recoverable: true,
    timestamp: createTimestamp(),
});

/** Create profile incomplete error */
export const profileIncomplete = (
    missingFields: readonly string[],
    sectionId?: SectionId
): ProfileIncompleteError => ({
    code: "PROFILE_INCOMPLETE",
    message: `Profile is missing required fields: ${missingFields.join(", ")}`,
    missingFields,
    sectionId,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create GitHub username required error */
export const githubUsernameRequired = (
    sectionId: SectionId,
    sectionType: SectionType
): GitHubUsernameRequiredError => ({
    code: "GITHUB_USERNAME_REQUIRED",
    message: `GitHub username is required for section "${sectionId}" of type "${sectionType}"`,
    sectionId,
    sectionType,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create capability not supported error */
export const capabilityNotSupported = (
    capability: string,
    templateId: TemplateId
): CapabilityNotSupportedError => ({
    code: "CAPABILITY_NOT_SUPPORTED",
    message: `Capability "${capability}" is not supported by template "${templateId}"`,
    capability,
    templateId,
    recoverable: true,
    timestamp: createTimestamp(),
});

/** Create section limit exceeded error */
export const sectionLimitExceeded = (
    maxSections: number,
    actualSections: number,
    templateId: TemplateId
): SectionLimitExceededError => ({
    code: "SECTION_LIMIT_EXCEEDED",
    message: `Section limit exceeded: template "${templateId}" allows ${maxSections} sections, but ${actualSections} were provided`,
    maxSections,
    actualSections,
    templateId,
    recoverable: true,
    timestamp: createTimestamp(),
});

/** Create validation failed error */
export const validationFailed = (
    issues: readonly ValidationIssue[]
): ValidationFailedError => ({
    code: "VALIDATION_FAILED",
    message: `Validation failed with ${issues.length} issue(s): ${issues.map((i) => i.message).join("; ")}`,
    issues,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create unknown error */
export const unknownError = (originalError?: unknown): UnknownError => ({
    code: "UNKNOWN_ERROR",
    message: originalError instanceof Error ? originalError.message : "An unknown error occurred",
    originalError,
    recoverable: false,
    timestamp: createTimestamp(),
});

// ============================================================================
// ERROR TYPE GUARDS
// ============================================================================

export const isRenderError = (value: unknown): value is RenderError =>
    typeof value === "object" && value !== null && "code" in value && "message" in value;

export const isRecoverable = (error: RenderError): boolean => error.recoverable;

export const isSectionError = (
    error: RenderError
): error is SectionUnsupportedError | SectionRenderError | SectionDataInvalidError =>
    error.code === "SECTION_UNSUPPORTED" ||
    error.code === "SECTION_RENDER_FAILED" ||
    error.code === "SECTION_DATA_INVALID";

export const isProfileError = (
    error: RenderError
): error is ProfileMissingError | ProfileIncompleteError | GitHubUsernameRequiredError =>
    error.code === "PROFILE_MISSING" ||
    error.code === "PROFILE_INCOMPLETE" ||
    error.code === "GITHUB_USERNAME_REQUIRED";
