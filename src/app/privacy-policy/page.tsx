// privacy policy page

import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, SITE_URL } from "@/lib/seo";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `Privacy Policy for ${SITE_CONFIG.name}. Learn how we handle your data, cookies, and third-party services like Google AdSense.`,
    alternates: {
        canonical: `${SITE_URL}/privacy-policy`,
    },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "January 5, 2026";
    const contactEmail = "contact.weareinventors@gmail.com";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
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

            {/* content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
                    <h1>Privacy Policy</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {lastUpdated}
                    </p>

                    <section>
                        <h2>Introduction</h2>
                        <p>
                            Welcome to {SITE_CONFIG.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                        </p>
                    </section>

                    <section>
                        <h2>Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li>
                                <strong>Usage Data:</strong> Information about how you interact with our website, including pages visited,
                                time spent, and actions taken.
                            </li>
                            <li>
                                <strong>Device Information:</strong> Browser type, operating system, and device identifiers.
                            </li>
                            <li>
                                <strong>GitHub Data:</strong> If you use our builder, we may temporarily process your GitHub username
                                to generate profile previews. This data is not stored on our servers.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies to enhance your experience. These include:
                        </p>
                        <ul>
                            <li>
                                <strong>Essential Cookies:</strong> Required for the website to function properly.
                            </li>
                            <li>
                                <strong>Analytics Cookies:</strong> Help us understand how visitors use our website.
                            </li>
                            <li>
                                <strong>Advertising Cookies:</strong> Used by our advertising partners to deliver relevant ads.
                            </li>
                        </ul>
                        <p>
                            You can control cookie preferences through your browser settings. Disabling certain cookies may affect
                            website functionality.
                        </p>
                    </section>

                    <section>
                        <h2>Google AdSense</h2>
                        <p>
                            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads
                            based on your prior visits to our website and other websites on the Internet.
                        </p>
                        <p>
                            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our
                            site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Ads Settings
                            </a>.
                        </p>
                        <p>
                            For more information about how Google uses data, please visit{" "}
                            <a
                                href="https://policies.google.com/technologies/partner-sites"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google&apos;s Privacy & Terms
                            </a>.
                        </p>
                    </section>

                    <section>
                        <h2>Third-Party Services</h2>
                        <p>We may use third-party services that collect information, including:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring.</li>
                            <li><strong>Google AdSense:</strong> For serving advertisements.</li>
                            <li><strong>Vercel:</strong> For website hosting and performance analytics.</li>
                        </ul>
                        <p>
                            Each of these services has its own privacy policy governing their use of your data.
                        </p>
                    </section>

                    <section>
                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your information.
                            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    <section>
                        <h2>Your Rights</h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul>
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt out of certain data processing activities</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Children&apos;s Privacy</h2>
                        <p>
                            Our website is not intended for children under 13 years of age. We do not knowingly collect
                            personal information from children under 13.
                        </p>
                    </section>

                    <section>
                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                            the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:{" "}
                            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                        </p>
                    </section>
                </article>
            </main>

            {/* footer */}
            <Footer />
        </div>
    );
}
