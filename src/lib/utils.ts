/**
 * Utility functions used throughout the application
 */

/**
 * Combines class names, filtering out falsy values
 * @param classes - Class names to combine
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

/**
 * Formats a number with comma separators
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(dateString));
}

/**
 * Generates a random ID
 * @param prefix - Optional prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix = "id"): string {
    return `${prefix}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Debounce function for rate limiting
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Safely parses JSON with error handling
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed value or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json) as T;
    } catch {
        return fallback;
    }
}
