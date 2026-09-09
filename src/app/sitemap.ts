import type { MetadataRoute } from "next";
import { getAlternateBlogSlug } from "@/lib/blog-translations";
import { getPost, getPostSlugs } from "@/lib/blog";
import { absoluteUrl, languageAlternates, localePath } from "@/lib/seo";
import { routing, type Pathnames } from "@/i18n/routing";

const staticPaths = [
  "/",
  "/features",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
] as const satisfies readonly Pathnames[];

const staticPriority: Record<(typeof staticPaths)[number], number> = {
  "/": 1,
  "/features": 0.9,
  "/pricing": 0.8,
  "/about": 0.6,
  "/contact": 0.7,
  "/privacy": 0.3,
  "/terms": 0.3,
  "/blog": 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const href of staticPaths) {
      entries.push({
        url: absoluteUrl(localePath(locale, href)),
        lastModified: new Date(),
        changeFrequency: href === "/" || href === "/blog" ? "weekly" : "monthly",
        priority: staticPriority[href],
        alternates: {
          languages: languageAlternates(href),
        },
      });
    }

    for (const slug of getPostSlugs(locale)) {
      const post = getPost(locale, slug);
      const href = {
        pathname: "/blog/[slug]" as const,
        params: { slug },
      };
      const alternateSlug = getAlternateBlogSlug(locale, slug);
      const languages: Record<string, string> = {
        [locale]: absoluteUrl(localePath(locale, href)),
      };
      if (alternateSlug) {
        const other = locale === "nl" ? "en" : "nl";
        languages[other] = absoluteUrl(
          localePath(other, {
            pathname: "/blog/[slug]",
            params: { slug: alternateSlug },
          }),
        );
      }
      languages["x-default"] =
        locale === "nl"
          ? languages.nl
          : (languages.nl ?? languages[locale]);

      entries.push({
        url: absoluteUrl(localePath(locale, href)),
        lastModified: post?.date ? new Date(post.date) : new Date("2026-08-10"),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
