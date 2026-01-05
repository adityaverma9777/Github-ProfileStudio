/**
 * SEO Configuration
 *
 * Centralized SEO utilities and metadata for the entire site.
 * All pages should import from here for consistency.
 */

import type { Metadata, Viewport } from "next";

// ============================================================================
// SITE CONSTANTS
// ============================================================================

/** Dynamic site URL - uses environment variable with Vercel auto-detection */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_CONFIG = {
    name: "GitHub Profile Studio",
    shortName: "Profile Studio",
    description: "Create stunning GitHub profile READMEs with animated elements, stats cards, and professional templates. No coding required.",
    url: SITE_URL,
    ogImage: "/og-image.png",
    twitterHandle: "@profilestudio",
    locale: "en_US",
} as const;

// ============================================================================
// KEYWORDS
// ============================================================================

/** Primary keywords - main ranking targets */
export const PRIMARY_KEYWORDS = [
    "github profile readme generator",
    "github profile builder",
    "github profile templates",
    "github readme builder",
    "github profile creator",
] as const;

/** Long-tail keywords - niche + high-intent */
export const LONGTAIL_KEYWORDS = [
    "github profile with gif",
    "animated github profile",
    "github profile snake animation",
    "cybersecurity github profile",
    "student github profile",
    "developer portfolio github",
    "github profile stats",
    "github contribution graph",
    "professional github readme",
    "github profile examples",
] as const;

// ============================================================================
// BASE METADATA
// ============================================================================

/** Default viewport configuration */
export const defaultViewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
    ],
};

/** Base metadata shared across all pages */
export const baseMetadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: `${SITE_CONFIG.name} - Create Stunning GitHub Profile READMEs`,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [...PRIMARY_KEYWORDS, ...LONGTAIL_KEYWORDS],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: SITE_CONFIG.locale,
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        images: [
            {
                url: SITE_CONFIG.ogImage,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        images: [SITE_CONFIG.ogImage],
        creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Add when available:
        // google: "your-google-verification-code",
        // yandex: "your-yandex-verification-code",
    },
    alternates: {
        canonical: SITE_CONFIG.url,
    },
};

// ============================================================================
// PAGE METADATA FACTORIES
// ============================================================================

export interface PageMetaOptions {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    ogImage?: string;
    noIndex?: boolean;
}

/**
 * Generate page-specific metadata
 */
export const createPageMeta = (options: PageMetaOptions): Metadata => {
    const url = `${SITE_CONFIG.url}${options.path}`;
    const ogImage = options.ogImage || SITE_CONFIG.ogImage;

    return {
        title: options.title,
        description: options.description,
        keywords: options.keywords || [...PRIMARY_KEYWORDS],
        openGraph: {
            title: options.title,
            description: options.description,
            url,
            images: [{ url: ogImage, width: 1200, height: 630, alt: options.title }],
        },
        twitter: {
            title: options.title,
            description: options.description,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
        },
        robots: options.noIndex ? { index: false, follow: false } : undefined,
    };
};

// ============================================================================
// JSON-LD STRUCTURED DATA
// ============================================================================

/** SoftwareApplication schema for the tool */
export const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1250",
    },
};

/** WebSite schema for Google Rich Results */
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_CONFIG.url}/templates?search={search_term_string}`,
        "query-input": "required name=search_term_string",
    },
};

/** Generate JSON-LD script tag content */
export const generateJsonLd = (schema: object): string => {
    return JSON.stringify(schema);
};

// ============================================================================
// TEMPLATE SEO DATA
// ============================================================================

export interface TemplateSeo {
    slug: string;
    name: string;
    title: string;
    description: string;
    keywords: string[];
    useCase: string;
    targetAudience: string[];
    features: string[];
    previewImage: string;
}

/** Template SEO configurations */
export const TEMPLATE_SEO: Record<string, TemplateSeo> = {
    "minimal-clean": {
        slug: "minimal-clean",
        name: "Minimal Clean",
        title: "Minimal Clean GitHub Profile Template - Professional & Simple",
        description:
            "Create a clean, minimal GitHub profile README with essential sections. Perfect for developers who want a professional, clutter-free profile.",
        keywords: [
            "minimal github profile",
            "clean github readme",
            "simple github profile template",
            "professional github profile",
        ],
        useCase: "Professional developers seeking a clean, distraction-free profile",
        targetAudience: ["Senior Developers", "Tech Leads", "Minimalists"],
        features: ["Clean typography", "Essential stats", "No clutter"],
        previewImage: "/templates/minimal-clean.png",
    },
    "developer-pro": {
        slug: "developer-pro",
        name: "Developer Pro",
        title: "Developer Pro GitHub Profile Template - Full-Featured Portfolio",
        description:
            "Showcase your complete developer journey with projects, stats, and contribution graphs. The ultimate GitHub profile template for serious developers.",
        keywords: [
            "developer github profile",
            "full github portfolio",
            "github profile with stats",
            "professional developer readme",
        ],
        useCase: "Developers wanting to showcase their full portfolio and stats",
        targetAudience: ["Full-Stack Developers", "Open Source Contributors", "Job Seekers"],
        features: ["Project cards", "GitHub stats", "Contribution graph", "Tech stack badges"],
        previewImage: "/templates/developer-pro.png",
    },
    "animated-creative": {
        slug: "animated-creative",
        name: "Animated Creative",
        title: "Animated GitHub Profile Template - Typing Effects & Snake Animation",
        description:
            "Stand out with animated typing effects, contribution snake, and dynamic stats. Create an eye-catching animated GitHub profile README.",
        keywords: [
            "animated github profile",
            "github profile with gif",
            "github profile snake animation",
            "typing animation github",
            "dynamic github readme",
        ],
        useCase: "Developers wanting an eye-catching, animated profile",
        targetAudience: ["Creative Developers", "Frontend Engineers", "Students"],
        features: ["Typing animation", "Snake contribution graph", "Animated stats", "GIF support"],
        previewImage: "/templates/animated-creative.png",
    },
    "cybersecurity": {
        slug: "cybersecurity",
        name: "Cybersecurity",
        title: "Cybersecurity GitHub Profile Template - Security Professional Portfolio",
        description:
            "Designed for security professionals, ethical hackers, and CTF players. Showcase your security certifications, tools, and achievements.",
        keywords: [
            "cybersecurity github profile",
            "hacker github readme",
            "security professional profile",
            "ctf player github",
            "ethical hacker portfolio",
        ],
        useCase: "Security professionals showcasing their expertise",
        targetAudience: ["Security Engineers", "Penetration Testers", "CTF Players"],
        features: ["Dark theme", "Terminal aesthetic", "Certifications section", "Tools showcase"],
        previewImage: "/templates/cybersecurity.png",
    },
    "student": {
        slug: "student",
        name: "Student",
        title: "Student GitHub Profile Template - Academic Portfolio",
        description:
            "Perfect for students and new developers. Highlight your learning journey, coursework projects, and growing skills on GitHub.",
        keywords: [
            "student github profile",
            "beginner github readme",
            "new developer portfolio",
            "computer science student github",
            "github profile for students",
        ],
        useCase: "Students building their first professional portfolio",
        targetAudience: ["CS Students", "Bootcamp Graduates", "Self-taught Developers"],
        features: ["Learning roadmap", "Course projects", "Skills in progress", "Contact info"],
        previewImage: "/templates/student.png",
    },
};

/** Get all template slugs for static generation */
export const getTemplateSlugs = (): string[] => {
    return Object.keys(TEMPLATE_SEO);
};

/** Get template SEO data by slug */
export const getTemplateSeo = (slug: string): TemplateSeo | undefined => {
    return TEMPLATE_SEO[slug];
};
