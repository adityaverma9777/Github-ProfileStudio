// terms of service page

import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, SITE_URL } from "@/lib/seo";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: `Terms of Service for ${SITE_CONFIG.name}. Read our terms and conditions for using the GitHub profile README builder.`,
    alternates: {
        canonical: `${SITE_URL}/terms-of-service`,
    },
};

export default function TermsOfServicePage() {
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
                    <h1>Terms of Service</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {lastUpdated}
                    </p>

                    <section>
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing or using {SITE_CONFIG.name} (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2>Description of Service</h2>
                        <p>
                            {SITE_CONFIG.name} is a free online tool that helps users create GitHub profile README files.
                            The Service provides templates, a visual editor, and export functionality to generate markdown content
                            for GitHub profiles.
                        </p>
                    </section>

                    <section>
                        <h2>Use of the Service</h2>
                        <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                        <ul>
                            <li>Use the Service in any way that violates any applicable law or regulation</li>
                            <li>Attempt to interfere with or disrupt the Service or its servers</li>
                            <li>Use the Service to generate content that is illegal, harmful, or offensive</li>
                            <li>Attempt to gain unauthorized access to any part of the Service</li>
                            <li>Use automated systems to access the Service without our permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2>User Content</h2>
                        <p>
                            You retain ownership of any content you create using the Service. By using the Service, you grant us
                            a limited license to process your content solely for the purpose of providing the Service.
                        </p>
                        <p>
                            You are solely responsible for the content you create and must ensure it does not infringe on
                            any third-party rights or violate any laws.
                        </p>
                    </section>

                    <section>
                        <h2>Intellectual Property</h2>
                        <p>
                            The Service, including its design, features, and content (excluding user-generated content), is owned by us
                            and protected by intellectual property laws. You may not copy, modify, or distribute any part of the Service
                            without our written permission.
                        </p>
                        <p>
                            Templates and generated README content are provided for your personal use. You may use the generated markdown
                            freely on your GitHub profile.
                        </p>
                    </section>

                    <section>
                        <h2>Third-Party Services</h2>
                        <p>
                            The Service may integrate with or link to third-party services, including but not limited to:
                        </p>
                        <ul>
                            <li>GitHub (for profile data and stats)</li>
                            <li>Google AdSense (for advertisements)</li>
                            <li>Various badge and image services</li>
                        </ul>
                        <p>
                            We are not responsible for the content, privacy practices, or terms of these third-party services.
                        </p>
                    </section>

                    <section>
                        <h2>Disclaimer of Warranties</h2>
                        <p>
                            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                        </p>
                        <p>
                            We make no guarantees regarding the accuracy, reliability, or availability of the Service. Generated content
                            may contain errors or produce unexpected results.
                        </p>
                    </section>

                    <section>
                        <h2>Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING FROM YOUR USE OF THE SERVICE.
                        </p>
                        <p>
                            Our total liability for any claims arising from the use of the Service shall not exceed the amount you paid
                            to use the Service (if any).
                        </p>
                    </section>

                    <section>
                        <h2>Indemnification</h2>
                        <p>
                            You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use
                            of the Service or violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2>Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. We will notify users of material changes by updating
                            the &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2>Termination</h2>
                        <p>
                            We may terminate or suspend your access to the Service at any time, without prior notice, for any reason,
                            including violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2>Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with applicable laws, without regard to
                            conflict of law principles.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at:{" "}
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
