/**
 * Asset Engine - Error Definitions
 *
 * Typed, descriptive errors for asset generation.
 * All errors include context for debugging.
 */

import type { AssetCategory } from "./types";

// ============================================================================
// ERROR CODES
// ============================================================================

/** All possible asset error codes */
export type AssetErrorCode =
    // Parameter errors
    | "MISSING_REQUIRED_PARAM"
    | "INVALID_PARAM_TYPE"
    | "INVALID_PARAM_VALUE"
    | "PARAM_OUT_OF_RANGE"
    // Category errors
    | "UNSUPPORTED_CATEGORY"
    | "CATEGORY_DISABLED"
    // URL errors
    | "URL_GENERATION_FAILED"
    | "INVALID_URL_TEMPLATE"
    // Provider errors
    | "PROVIDER_UNAVAILABLE"
    | "PROVIDER_RATE_LIMITED"
    // General errors
    | "VALIDATION_FAILED"
    | "UNKNOWN_ERROR";

// ============================================================================
// ERROR BASE
// ============================================================================

/** Base asset error */
export interface AssetErrorBase {
    readonly code: AssetErrorCode;
    readonly message: string;
    readonly recoverable: boolean;
    readonly timestamp: string;
}

// ============================================================================
// PARAMETER ERRORS
// ============================================================================

/** Missing required parameter */
export interface MissingRequiredParamError extends AssetErrorBase {
    readonly code: "MISSING_REQUIRED_PARAM";
    readonly paramName: string;
    readonly category: AssetCategory;
}

/** Invalid parameter type */
export interface InvalidParamTypeError extends AssetErrorBase {
    readonly code: "INVALID_PARAM_TYPE";
    readonly paramName: string;
    readonly expectedType: string;
    readonly receivedType: string;
}

/** Invalid parameter value */
export interface InvalidParamValueError extends AssetErrorBase {
    readonly code: "INVALID_PARAM_VALUE";
    readonly paramName: string;
    readonly value: unknown;
    readonly allowedValues?: readonly string[];
    readonly reason?: string;
}

/** Parameter out of range */
export interface ParamOutOfRangeError extends AssetErrorBase {
    readonly code: "PARAM_OUT_OF_RANGE";
    readonly paramName: string;
    readonly value: number;
    readonly min?: number;
    readonly max?: number;
}

// ============================================================================
// CATEGORY ERRORS
// ============================================================================

/** Unsupported category */
export interface UnsupportedCategoryError extends AssetErrorBase {
    readonly code: "UNSUPPORTED_CATEGORY";
    readonly category: string;
    readonly supportedCategories: readonly AssetCategory[];
}

// ============================================================================
// URL ERRORS
// ============================================================================

/** URL generation failed */
export interface UrlGenerationFailedError extends AssetErrorBase {
    readonly code: "URL_GENERATION_FAILED";
    readonly category: AssetCategory;
    readonly reason: string;
}

// ============================================================================
// PROVIDER ERRORS
// ============================================================================

/** Provider unavailable */
export interface ProviderUnavailableError extends AssetErrorBase {
    readonly code: "PROVIDER_UNAVAILABLE";
    readonly provider: string;
    readonly category: AssetCategory;
}

/** Provider rate limited */
export interface ProviderRateLimitedError extends AssetErrorBase {
    readonly code: "PROVIDER_RATE_LIMITED";
    readonly provider: string;
    readonly retryAfter?: number;
}

// ============================================================================
// GENERAL ERRORS
// ============================================================================

/** Validation failed with multiple issues */
export interface ValidationFailedError extends AssetErrorBase {
    readonly code: "VALIDATION_FAILED";
    readonly issues: readonly ValidationIssue[];
}

/** Single validation issue */
export interface ValidationIssue {
    readonly param: string;
    readonly message: string;
    readonly value?: unknown;
}

/** Unknown error wrapper */
export interface UnknownAssetError extends AssetErrorBase {
    readonly code: "UNKNOWN_ERROR";
    readonly originalError?: unknown;
}

// ============================================================================
// ERROR UNION
// ============================================================================

/** Discriminated union of all asset errors */
export type AssetError =
    | MissingRequiredParamError
    | InvalidParamTypeError
    | InvalidParamValueError
    | ParamOutOfRangeError
    | UnsupportedCategoryError
    | UrlGenerationFailedError
    | ProviderUnavailableError
    | ProviderRateLimitedError
    | ValidationFailedError
    | UnknownAssetError;

// ============================================================================
// ERROR FACTORIES
// ============================================================================

const createTimestamp = (): string => new Date().toISOString();

/** Create missing required param error */
export const missingRequiredParam = (
    paramName: string,
    category: AssetCategory
): MissingRequiredParamError => ({
    code: "MISSING_REQUIRED_PARAM",
    message: `Missing required parameter "${paramName}" for asset category "${category}"`,
    paramName,
    category,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create invalid param type error */
export const invalidParamType = (
    paramName: string,
    expectedType: string,
    receivedType: string
): InvalidParamTypeError => ({
    code: "INVALID_PARAM_TYPE",
    message: `Invalid type for parameter "${paramName}": expected ${expectedType}, received ${receivedType}`,
    paramName,
    expectedType,
    receivedType,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create invalid param value error */
export const invalidParamValue = (
    paramName: string,
    value: unknown,
    options?: { allowedValues?: readonly string[]; reason?: string }
): InvalidParamValueError => ({
    code: "INVALID_PARAM_VALUE",
    message: options?.reason
        ? `Invalid value for parameter "${paramName}": ${options.reason}`
        : options?.allowedValues
            ? `Invalid value for parameter "${paramName}": must be one of [${options.allowedValues.join(", ")}]`
            : `Invalid value for parameter "${paramName}"`,
    paramName,
    value,
    allowedValues: options?.allowedValues,
    reason: options?.reason,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create param out of range error */
export const paramOutOfRange = (
    paramName: string,
    value: number,
    range: { min?: number; max?: number }
): ParamOutOfRangeError => ({
    code: "PARAM_OUT_OF_RANGE",
    message: range.min !== undefined && range.max !== undefined
        ? `Parameter "${paramName}" value ${value} is out of range [${range.min}, ${range.max}]`
        : range.min !== undefined
            ? `Parameter "${paramName}" value ${value} must be >= ${range.min}`
            : `Parameter "${paramName}" value ${value} must be <= ${range.max}`,
    paramName,
    value,
    min: range.min,
    max: range.max,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create unsupported category error */
export const unsupportedCategory = (
    category: string,
    supportedCategories: readonly AssetCategory[]
): UnsupportedCategoryError => ({
    code: "UNSUPPORTED_CATEGORY",
    message: `Unsupported asset category "${category}". Supported: ${supportedCategories.join(", ")}`,
    category,
    supportedCategories,
    recoverable: false,
    timestamp: createTimestamp(),
});

/** Create URL generation failed error */
export const urlGenerationFailed = (
    category: AssetCategory,
    reason: string
): UrlGenerationFailedError => ({
    code: "URL_GENERATION_FAILED",
    message: `Failed to generate URL for asset category "${category}": ${reason}`,
    category,
    reason,
    recoverable: false,
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
export const unknownError = (originalError?: unknown): UnknownAssetError => ({
    code: "UNKNOWN_ERROR",
    message: originalError instanceof Error
        ? originalError.message
        : "An unknown error occurred during asset generation",
    originalError,
    recoverable: false,
    timestamp: createTimestamp(),
});

// ============================================================================
// TYPE GUARDS
// ============================================================================

export const isAssetError = (value: unknown): value is AssetError =>
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    "timestamp" in value;

export const isParameterError = (
    error: AssetError
): error is MissingRequiredParamError | InvalidParamTypeError | InvalidParamValueError | ParamOutOfRangeError =>
    error.code === "MISSING_REQUIRED_PARAM" ||
    error.code === "INVALID_PARAM_TYPE" ||
    error.code === "INVALID_PARAM_VALUE" ||
    error.code === "PARAM_OUT_OF_RANGE";

export const isRecoverable = (error: AssetError): boolean => error.recoverable;
