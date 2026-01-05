// builder layout

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Builder | GitHub Profile Studio",
    description: "Create your perfect GitHub profile README",
};

export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
            {children}
        </div>
    );
}
