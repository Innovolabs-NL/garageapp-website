import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

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
};

/** Root shell — html/body live in [locale]/layout for correct lang. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
