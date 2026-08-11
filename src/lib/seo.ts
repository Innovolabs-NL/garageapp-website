import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale, type Pathnames } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export type AppHref =
  | Pathnames
  | { pathname: "/blog/[slug]"; params: { slug: string } };

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localePath(locale: string, href: AppHref): string {
  return getPathname({ locale: locale as Locale, href: href as never });
}

/** hreflang map including x-default → Dutch. */
export function languageAlternates(href: AppHref): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localePath(locale, href));
  }
  languages["x-default"] = absoluteUrl(
    localePath(routing.defaultLocale, href),
  );
  return languages;
}

export function buildPageMetadata(opts: {
  locale: string;
  title: string;
  description: string;
  href: Pathnames;
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(localePath(opts.locale, opts.href));
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: {
      canonical,
      languages: languageAlternates(opts.href),
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: opts.locale === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export function buildBlogPostMetadata(opts: {
  locale: string;
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  publishedTime?: string;
  alternateSlug?: string | null;
}): Metadata {
  const href = {
    pathname: "/blog/[slug]" as const,
    params: { slug: opts.slug },
  };
  const canonical = absoluteUrl(localePath(opts.locale, href));

  const languages: Record<string, string> = {
    [opts.locale]: canonical,
  };

  if (opts.alternateSlug) {
    const otherLocale = opts.locale === "nl" ? "en" : "nl";
    languages[otherLocale] = absoluteUrl(
      localePath(otherLocale, {
        pathname: "/blog/[slug]",
        params: { slug: opts.alternateSlug },
      }),
    );
  }

  languages["x-default"] =
    opts.locale === "nl"
      ? canonical
      : opts.alternateSlug
        ? absoluteUrl(
            localePath("nl", {
              pathname: "/blog/[slug]",
              params: { slug: opts.alternateSlug },
            }),
          )
        : canonical;

  return {
    title: `${opts.title} — ${siteConfig.name}`,
    description: opts.description,
    keywords: opts.keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: opts.locale === "nl" ? "nl_NL" : "en_US",
      type: "article",
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
