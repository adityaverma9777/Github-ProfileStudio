// templates listing page

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_REGISTRY } from "@/data/templates";
import { createPageMeta, PRIMARY_KEYWORDS, LONGTAIL_KEYWORDS, SITE_CONFIG, generateJsonLd, websiteSchema, softwareApplicationSchema } from "@/lib/seo";
import { Footer } from "@/components/layout";
import { AdUnit } from "@/components/ads";

export const metadata: Metadata = createPageMeta({
    title: "GitHub Profile Templates - Free README Generators for Developers",
    description:
        "Browse 15+ professional GitHub profile README templates. Find the perfect template for students, developers, designers, and security professionals. Free and customizable.",
    path: "/templates",
    keywords: [...PRIMARY_KEYWORDS, ...LONGTAIL_KEYWORDS, "github profile templates free", "readme template collection"],
});

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* seo json-ld */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateJsonLd(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateJsonLd(softwareApplicationSchema) }}
            />

            {/* navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="w-full px-6 sm:px-8 lg:px-12">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub Profile Studio
                        </Link>
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/templates" className="text-blue-600 dark:text-blue-400 font-medium">
                                Templates
                            </Link>

                            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                About
                            </Link>
                            <Link
                                href="/builder/custom"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Start Building
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* hero */}
            <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        GitHub Profile Templates
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Choose from 15+ professionally designed templates for your GitHub profile README.
                        From minimalist to animated, find the perfect starting point for developers,
                        students, security professionals, and more.
                    </p>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        All Templates ({TEMPLATE_REGISTRY.length})
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEMPLATE_REGISTRY.map((template) => (
                            <Link
                                key={template.id}
                                href={`/templates/${template.slug}`}
                                className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
                            >
                                <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-4 p-4 overflow-hidden">
                                    <p className="text-white text-sm font-medium truncate mb-2">
                                        {template.name}
                                    </p>
                                    <span className="inline-block px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                                        {template.category}
                                    </span>
                                    {template.animationLevel === "animated" && (
                                        <span className="inline-block ml-1 px-2 py-0.5 text-xs bg-purple-600 text-white rounded-full">
                                            Animated
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                    {template.description}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                    {template.persona}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ad placement */}
            <section className="pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <AdUnit slotId="templates-after-grid" format="horizontal" />
                </div>
            </section>

            {/* cta */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                        Start from scratch with our visual builder and create your own custom GitHub profile README.
                    </p>
                    <Link
                        href="/builder/custom"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                    >
                        Build Custom Profile
                    </Link>
                </div>
            </section>

            {/* footer */}
            <Footer />
        </div>
    );
}
