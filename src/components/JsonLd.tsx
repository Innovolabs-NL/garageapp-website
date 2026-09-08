import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export function JsonLd({ locale }: { locale: string }) {
  const description =
    locale === "nl" ? siteConfig.descriptionNl : siteConfig.descriptionEn;
  const homeUrl = absoluteUrl(`/${locale}`);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.company,
        url: siteConfig.companyUrl,
        email: siteConfig.contactEmail,
        logo: absoluteUrl("/icon"),
        sameAs: [siteConfig.companyUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: locale === "nl" ? "nl-NL" : "en",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description,
        url: homeUrl,
        provider: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: locale === "nl" ? "nl-NL" : "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostingJsonLd({
  locale,
  title,
  description,
  slug,
  datePublished,
}: {
  locale: string;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  const url = absoluteUrl(`/${locale}/blog/${slug}`);
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    inLanguage: locale === "nl" ? "nl-NL" : "en",
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.companyUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl(`/${locale}/blog`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export function FaqJsonLd({
  items,
}: {
  items: ReadonlyArray<{ question: string; answer: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
