import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPostSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const staticPaths = [
  "/",
  "/features",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const href of staticPaths) {
      entries.push({
        url: `${siteConfig.url}${getPathname({ locale, href })}`,
        lastModified: new Date(),
        changeFrequency: href === "/" ? "weekly" : "monthly",
        priority: href === "/" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${siteConfig.url}${getPathname({ locale: l, href })}`,
            ]),
          ),
        },
      });
    }

    for (const slug of getPostSlugs(locale)) {
      const href = {
        pathname: "/blog/[slug]" as const,
        params: { slug },
      };
      entries.push({
        url: `${siteConfig.url}${getPathname({ locale, href })}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
