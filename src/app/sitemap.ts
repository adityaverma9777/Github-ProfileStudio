// sitemap generator

import { MetadataRoute } from "next";
import { TEMPLATE_REGISTRY } from "@/data/templates";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    // main pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/templates`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },

        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        // legal
        {
            url: `${SITE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.1,
        },
        {
            url: `${SITE_URL}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.1,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // template pages
    const templatePages: MetadataRoute.Sitemap = TEMPLATE_REGISTRY.map((template) => ({
        url: `${SITE_URL}/templates/${template.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...templatePages];
}

