// ad unit component - lazy loads when visible

"use client";

import { useEffect, useRef, useState } from "react";

export interface AdUnitProps {
    slotId: string;
    format?: "horizontal" | "rectangle" | "auto";
    className?: string;
}

// dimensions to prevent layout shift
const FORMAT_DIMENSIONS = {
    horizontal: { minHeight: 90, aspectRatio: "728/90" },
    rectangle: { minHeight: 250, aspectRatio: "300/250" },
    auto: { minHeight: 100, aspectRatio: "auto" },
} as const;

export function AdUnit({ slotId, format = "auto", className = "" }: AdUnitProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [adLoaded, setAdLoaded] = useState(false);

    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const dimensions = FORMAT_DIMENSIONS[format];

    // lazy load observer
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: "100px" }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    // push ad when visible
    useEffect(() => {
        if (!isVisible || !clientId || adLoaded) return;

        try {
            // push to adsense
            const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
            if (adsbygoogle) {
                adsbygoogle.push({});
                setAdLoaded(true);
            }
        } catch {
            // adsense not loaded
            console.warn("AdSense not available");
        }
    }, [isVisible, clientId, adLoaded]);

    // skip if not configured
    if (!clientId) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={`ad-container flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 rounded-lg overflow-hidden ${className}`}
            style={{
                minHeight: dimensions.minHeight,
            }}
            aria-label="Advertisement"
        >
            {isVisible ? (
                <ins
                    className="adsbygoogle"
                    style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                    }}
                    data-ad-client={clientId}
                    data-ad-slot={slotId}
                    data-ad-format={format === "auto" ? "auto" : undefined}
                    data-full-width-responsive={format === "auto" ? "true" : undefined}
                />
            ) : (
                <div className="text-xs text-gray-400 dark:text-gray-500">
                    Loading...
                </div>
            )}
        </div>
    );
}
