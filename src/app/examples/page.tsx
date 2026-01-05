/**
 * Examples Page
 *
 * Showcase real GitHub profiles built with the tool.
 * Great for social proof and long-tail SEO.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { createPageMeta, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = createPageMeta({
    title: "GitHub Profile Examples - Inspiration Gallery",
    description:
        "Get inspired by stunning GitHub profile READMEs created with our builder. See real examples from developers, students, and security professionals.",
    path: "/examples",
    keywords: [
        "github profile examples",
        "github readme examples",
        "best github profiles",
        "github profile inspiration",
        "awesome github profiles",
    ],
});

// Example profiles data
const EXAMPLES = [
    {
        username: "octocat",
        name: "The Octocat",
        role: "Developer Mascot",
        description: "A minimal and clean profile with essential stats and social links.",
        template: "minimal-clean",
        features: ["GitHub Stats", "Top Languages", "Social Badges"],
    },
    {
        username: "developer",
        name: "Jane Developer",
        role: "Full-Stack Engineer",
        description: "Comprehensive developer profile with projects, experience, and tech stack.",
        template: "developer-pro",
        features: ["Project Cards", "Contribution Graph", "Tech Badges"],
    },
    {
        username: "creative",
        name: "Alex Creative",
        role: "Frontend Developer",
        description: "Eye-catching animated profile with typing effects and snake animation.",
        template: "animated-creative",
        features: ["Typing Animation", "Snake Graph", "Animated Stats"],
    },
    {
        username: "security",
        name: "Sam Security",
        role: "Penetration Tester",
        description: "Dark-themed profile for cybersecurity professionals and CTF players.",
        template: "cybersecurity",
        features: ["Terminal Aesthetic", "Certifications", "Tools Section"],
    },
    {
        username: "student",
        name: "Chris Student",
        role: "CS Student",
        description: "Perfect for students showcasing their learning journey and projects.",
        template: "student",
        features: ["Learning Roadmap", "Course Projects", "Contact Info"],
    },
];

export default function ExamplesPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
                            {SITE_CONFIG.shortName}
                        </Link>
                        <Link
                            href="/builder"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Open Builder
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        GitHub Profile Examples
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get inspired by these amazing GitHub profiles. See what's possible and find the perfect starting point for your own profile.
                    </p>
                </div>

                {/* Examples Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {EXAMPLES.map((example) => (
                        <div
                            key={example.username}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
                        >
                            {/* Preview */}
                            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {example.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {example.role}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/templates/${example.template}`}
                                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                                    >
                                        {example.template}
                                    </Link>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {example.description}
                                </p>

                                <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    {example.features.map((feature) => (
                                        <span key={feature} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        href={`/builder?template=${example.template}`}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        Create Similar Profile →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to Create Your Own?
                    </h2>
                    <p className="text-blue-100 mb-6">
                        Start building your GitHub profile in minutes with our visual builder.
                    </p>
                    <Link
                        href="/builder"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Start Building — It's Free
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
