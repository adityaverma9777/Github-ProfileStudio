// footer - not used in builder

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/seo";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto">
                {/* links */}
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <Link
                        href="/about"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/templates"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Templates
                    </Link>
                    <Link
                        href="/privacy-policy"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms-of-service"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Contact
                    </Link>
                </div>

                {/* copyright */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
