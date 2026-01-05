// about page

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createPageMeta, SITE_CONFIG } from "@/lib/seo";
import { Footer } from "@/components/layout";

export const metadata: Metadata = createPageMeta({
    title: "About GitHub Profile Studio - Free README Builder",
    description:
        "Learn about GitHub Profile Studio, the free visual builder for creating stunning GitHub profile READMEs. Our mission, features, and commitment to developers.",
    path: "/about",
    keywords: [
        "about github profile studio",
        "github readme builder",
        "free github profile generator",
    ],
});

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
                            <Link href="/templates" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Templates
                            </Link>
                            <Link href="/about" className="text-blue-600 dark:text-blue-400 font-medium">
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

            <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        About {SITE_CONFIG.name}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        The free, visual way to create stunning GitHub profile READMEs.
                    </p>
                </div>

                {/* main content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            We believe every developer deserves a professional GitHub profile. Your profile is often the first thing recruiters, collaborators, and fellow developers see. It should represent you at your best.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            {SITE_CONFIG.name} makes it easy to create a standout profile without writing a single line of markdown. Our visual builder, professional templates, and one-click export let you focus on what matters: showcasing your skills and projects.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Why We Built This
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Developers</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Creating a great README shouldn't require hours of markdown research. We've done the hard work so you don't have to.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Students</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Stand out when applying for jobs or internships with a professional profile that showcases your projects and skills.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Open Source</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Make your contributions visible. Show off your stats, top repositories, and the technologies you work with.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Forever Free</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    All core features are free. No hidden upsells, no premium walls. Create as many profiles as you want.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Features
                        </h2>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong>Visual Builder</strong> — No markdown knowledge required</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong>Professional Templates</strong> — Start fast with pre-designed layouts</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong>Animated Elements</strong> — Typing effects, snakes, and dynamic stats</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong>GitHub Integration</strong> — Auto-generate stats and contribution graphs</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong>One-Click Export</strong> — Copy or download your markdown instantly</span>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/builder"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                    >
                        Start Building Your Profile
                    </Link>
                </div>

                {/* coffee support section */}
                <div className="mt-12 max-w-md mx-auto">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            ☕ Support This Project
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            If you find this tool helpful, consider buying me a coffee! Your support helps keep this project free and continuously improving.
                        </p>
                        <div className="flex justify-center mb-6">
                            <Image
                                src="/bmc_qr.png"
                                alt="Buy Me a Coffee QR Code"
                                width={200}
                                height={200}
                                className="rounded-lg border-4 border-gray-100 dark:border-gray-800"
                            />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Scan with your phone to support development
                        </p>
                    </div>
                </div>
            </main>

            {/* footer */}
            <Footer />
        </div>
    );
}
