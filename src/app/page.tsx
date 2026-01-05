// homepage

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createPageMeta, PRIMARY_KEYWORDS, LONGTAIL_KEYWORDS, SITE_CONFIG } from "@/lib/seo";
import { Footer } from "@/components/layout";
import { AdUnit } from "@/components/ads";
import { Palette, Sparkles, BarChart3, Shield, Eye, ClipboardCopy } from "lucide-react";

export const metadata: Metadata = createPageMeta({
  title: "Create Stunning GitHub Profile READMEs - Free Builder",
  description:
    "Build professional GitHub profile READMEs with animated stats, typing effects, and beautiful templates. No coding required. Start free in seconds.",
  path: "/",
  keywords: [...PRIMARY_KEYWORDS, ...LONGTAIL_KEYWORDS],
});

export default function HomePage() {
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

      {/* hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Create a Stunning{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              GitHub Profile
            </span>{" "}
            in Minutes
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build professional README profiles with animated stats, typing effects, contribution snakes, and beautiful templates. No coding required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/builder"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Start Building — It's Free
            </Link>
            <Link
              href="/templates"
              className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-lg transition-all"
            >
              Browse Templates
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            ✓ No sign-up required &nbsp; ✓ Export to markdown &nbsp; ✓ Works with any theme
          </p>
        </div>
      </section>

      {/* features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need for a Perfect GitHub Profile
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Palette className="w-8 h-8 text-blue-500" />}
              title="Beautiful Templates"
              description="Start with professionally designed templates for developers, students, and security professionals."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-yellow-500" />}
              title="Animated Elements"
              description="Add typing animations, contribution snakes, dynamic stats, and GIF support to stand out."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-green-500" />}
              title="GitHub Stats"
              description="Auto-generate stats cards, top languages, streak counters, and contribution graphs."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-purple-500" />}
              title="Tech Stack Badges"
              description="Showcase your skills with customizable technology badges and icons."
            />
            <FeatureCard
              icon={<Eye className="w-8 h-8 text-cyan-500" />}
              title="Live Preview"
              description="See changes in real-time as you build. What you see is what you get."
            />
            <FeatureCard
              icon={<ClipboardCopy className="w-8 h-8 text-orange-500" />}
              title="One-Click Export"
              description="Export your profile as markdown ready to copy-paste into your GitHub README."
            />
          </div>
        </div>
      </section>

      {/* ad yaha aayega */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AdUnit slotId="homepage-after-features" format="horizontal" />
        </div>
      </section>

      {/* templates preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Templates for Every Developer
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            From minimal and clean to animated and creative. Find the perfect starting point.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <TemplateCard
              slug="student-beginner"
              name="Student Starter"
              description="Perfect for CS students and bootcamp grads"
            />
            <TemplateCard
              slug="fullstack-developer"
              name="Fullstack Dev"
              description="Showcase both frontend and backend skills"
            />
            <TemplateCard
              slug="frontend-developer"
              name="Frontend Pro"
              description="Modern UI-focused with animations"
            />
          </div>
          <div className="text-center mt-10">
            <Link
              href="/builder"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View All Templates →
            </Link>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Stand Out on GitHub?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of developers who've leveled up their GitHub profiles.
          </p>
          <Link
            href="/builder/custom"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Create Your Profile Now
          </Link>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}

// helper components

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}

function TemplateCard({ slug, name, description }: { slug: string; name: string; description: string }) {
  // Mini preview content based on template
  const previewContent: Record<string, { headline: string; badges: string[] }> = {
    "student-beginner": {
      headline: "Hi there! 👋 I'm a CS Student",
      badges: ["JavaScript", "Python", "React", "Node.js"],
    },
    "fullstack-developer": {
      headline: "Fullstack Developer",
      badges: ["TypeScript", "Go", "React", "Next.js", "AWS"],
    },
    "frontend-developer": {
      headline: "Frontend Developer",
      badges: ["TypeScript", "React", "Vue", "Tailwind CSS"],
    },
  };

  const content = previewContent[slug] || { headline: name, badges: ["GitHub", "Profile"] };

  return (
    <Link
      href={`/builder?template=${slug}`}
      className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
    >
      <div className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-4 p-4 overflow-hidden">
        <p className="text-white text-sm font-medium truncate mb-2">{content.headline}</p>
        <div className="flex flex-wrap gap-1">
          {content.badges.slice(0, 4).map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-1">
          <div className="w-16 h-8 bg-gray-700 rounded animate-pulse" />
          <div className="w-16 h-8 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </Link>
  );
}
