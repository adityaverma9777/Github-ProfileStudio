// individual template page

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATE_REGISTRY, getTemplateBySlug } from "@/data/templates";
import { SITE_CONFIG, SITE_URL, generateJsonLd } from "@/lib/seo";
import { render } from "@/lib/template-engine";
import { PreviewRenderer } from "@/components/preview";
import { createDefaultProfile } from "@/app/builder/utils/defaults";
import { Footer } from "@/components/layout";
import { AdUnit } from "@/components/ads";

// static params for all templates
export function generateStaticParams() {
    return TEMPLATE_REGISTRY.map((template) => ({
        slug: template.slug,
    }));
}

// metadata per template
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const template = getTemplateBySlug(slug);

    if (!template) {
        return {
            title: "Template Not Found",
        };
    }

    const title = `${template.name} - GitHub Profile Template | Free README Generator`;
    const description = `${template.description} Create your GitHub profile README with the ${template.name} template. Perfect for ${template.persona}.`;
    const url = `${SITE_URL}/templates/${slug}`;

    return {
        title,
        description,
        keywords: [
            `${template.name.toLowerCase()} github profile`,
            `${template.persona.toLowerCase()} github readme`,
            "github profile template",
            "github readme generator",
            template.category,
        ],
        openGraph: {
            title,
            description,
            url,
            type: "website",
            images: [
                {
                    url: template.previewImage || "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: `${template.name} GitHub Profile Template`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function TemplatePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const template = getTemplateBySlug(slug);

    if (!template) {
        notFound();
    }

    // Create default profile for preview rendering
    const defaultProfile = createDefaultProfile();

    // Render template preview using Template Engine
    const renderResult = render(template.template, defaultProfile, {
        theme: "dark",
        skipValidation: true,
        continueOnError: true,
    });

    // Template-specific JSON-LD
    const templateSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `${template.name} - GitHub Profile Template`,
        description: template.description,
        url: `${SITE_URL}/templates/${slug}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };

    // Get related templates (same category, excluding current)
    const relatedTemplates = TEMPLATE_REGISTRY.filter(
        (t) => t.category === template.category && t.slug !== slug
    ).slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateJsonLd(templateSchema) }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
                            {SITE_CONFIG.shortName}
                        </Link>
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/templates" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Templates
                            </Link>
                            <Link
                                href={`/builder/custom?template=${slug}`}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Use This Template
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="pt-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
                        <span>/</span>
                        <Link href="/templates" className="hover:text-gray-700 dark:hover:text-gray-300">Templates</Link>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white">{template.name}</span>
                    </nav>
                </div>
            </div>

            {/* Template Header */}
            <section className="pt-8 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                                {template.name} GitHub Profile Template
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                                {template.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    {template.category}
                                </span>
                                {template.animationLevel === "animated" && (
                                    <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                                        ✨ Animated
                                    </span>
                                )}
                                {template.featured && (
                                    <span className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <Link
                                href={`/builder/custom?template=${slug}`}
                                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-blue-500/25"
                            >
                                Use This Template
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Template Details */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Who is this template for?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            The {template.name} template is designed for <strong>{template.persona}</strong>.
                            Whether you're showcasing your skills, projects, or professional journey,
                            this template provides the perfect foundation for your GitHub profile README.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            This {template.category} template is ideal for developers who want to create
                            a standout GitHub profile without spending hours on design and formatting.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            What's included?
                        </h2>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Pre-designed hero section with professional headline</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>About me section with customizable highlights</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Tech stack badges for your skills</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>GitHub stats cards (commits, stars, contributions)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Featured projects section</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Social links and contact information</span>
                            </li>
                            {template.animationLevel === "animated" && (
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-500">✨</span>
                                    <span>Typing animations and dynamic effects</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Live Preview */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Template Preview
                    </h2>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-900 p-6 overflow-auto">
                        {renderResult.success && renderResult.output ? (
                            <PreviewRenderer output={renderResult.output} theme="dark" />
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                <p>Preview loading...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to Create Your GitHub Profile?
                    </h2>
                    <p className="text-blue-100 mb-6">
                        Use the {template.name} template as your starting point and customize it to match your style.
                    </p>
                    <Link
                        href={`/builder/custom?template=${slug}`}
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                    >
                        Start Customizing Now
                    </Link>
                </div>
            </section>

            {/* Related Templates */}
            {relatedTemplates.length > 0 && (
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            Related Templates
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedTemplates.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/templates/${related.slug}`}
                                    className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                                >
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {related.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {related.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Ad Unit - After Related Templates */}
            <section className="pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <AdUnit slotId="template-slug-bottom" format="horizontal" />
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
