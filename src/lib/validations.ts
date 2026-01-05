/**
 * Validation utilities and schemas
 */

/** GitHub username validation regex */
const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

/**
 * Validates a GitHub username
 * @param username - Username to validate
 * @returns Validation result
 */
export function validateGitHubUsername(username: string): {
    isValid: boolean;
    error?: string;
} {
    if (!username || username.trim().length === 0) {
        return { isValid: false, error: "Username is required" };
    }

    if (username.length > 39) {
        return { isValid: false, error: "Username must be 39 characters or less" };
    }

    if (!GITHUB_USERNAME_REGEX.test(username)) {
        return {
            isValid: false,
            error:
                "Username can only contain alphanumeric characters and hyphens, and cannot start or end with a hyphen",
        };
    }

    return { isValid: true };
}

/**
 * Validates a URL
 * @param url - URL to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validates a hex color code
 * @param color - Color string to validate
 * @returns Boolean indicating if color is valid
 */
export function isValidHexColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Sanitizes user input for markdown
 * @param input - Raw user input
 * @returns Sanitized string
 */
export function sanitizeForMarkdown(input: string): string {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]");
}
