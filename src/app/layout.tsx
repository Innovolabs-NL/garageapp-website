import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/site";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f16" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Garage software`,
    template: `%s`,
  },
  description: siteConfig.descriptionNl,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.company }],
  creator: siteConfig.company,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "7PB5ANFZgJOfP0cBg3eWXAVYIbHoOHYkHekRTu6RGAU",
  },
};

/** Root shell — html/body live in [locale]/layout for correct lang. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Root-only so locale switches don't re-render a <script> on the client. */}
      <Script
        id="theme-boot"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
      />
      {children}
    </>
  );
}
