import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { baseMetadata, defaultViewport, softwareApplicationSchema, websiteSchema, generateJsonLd } from "@/lib/seo";
import { AdSenseScript } from "@/components/ads";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = defaultViewport;

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* seo ke liye json-ld */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd(softwareApplicationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AdSenseScript />
      </body>
    </html>
  );
}
