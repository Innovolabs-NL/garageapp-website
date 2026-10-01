import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export function JsonLd({ locale }: { locale: string }) {
  const description =
    locale === "nl" ? siteConfig.descriptionNl : siteConfig.descriptionEn;
  const homeUrl = absoluteUrl(`/${locale}`);
  const pricingPath = locale === "nl" ? "/nl/prijzen" : "/en/pricing";
  const { pricing } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.company,
        legalName: siteConfig.company,
        brand: { "@type": "Brand", name: siteConfig.name, url: siteConfig.url },
        url: siteConfig.companyUrl,
        email: siteConfig.contactEmail,
        vatID: siteConfig.vatId,
        address: { "@type": "PostalAddress", ...siteConfig.address },
        logo: absoluteUrl("/icon"),
        identifier: {
          "@type": "PropertyValue",
          name: "KvK",
          value: siteConfig.kvk,
        },
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
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.name,
        alternateName: "Motivox garage software",
        isAccessibleForFree: false,
        softwareHelp: { "@type": "CreativeWork", url: absoluteUrl(`/${locale}`) },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Garage workshop software",
        operatingSystem: "Web",
        featureList:
          locale === "nl"
            ? [
                "Keuring, offerte en digitale handtekening",
                "Werkbon, urenregistratie en factuur (proforma of definitief)",
                "Live werkplaatsplanning (Garagebedrijf)",
                "Eigen dashboard met blokken en lage-voorraadmelding",
                "Monteurportaal en klantportaal",
                "Koppelingen: Mollie, Tikkie, Exact Online, Moneybird, e-Boekhouden",
              ]
            : [
                "Inspection, quote, and digital signature",
                "Work order, time tracking, and invoice (pro forma or final)",
                "Live shop planning (Garage plan)",
                "Your own dashboard with tiles and low-stock alerts",
                "Technician portal and customer portal",
                "Integrations: Mollie, Tikkie, Exact Online, Moneybird, e-Boekhouden",
              ],
        description,
        url: homeUrl,
        provider: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: locale === "nl" ? "nl-NL" : "en",
        offers: {
          "@type": "AggregateOffer",
          url: absoluteUrl(pricingPath),
          priceCurrency: pricing.currency,
          lowPrice: pricing.zzpMonthly,
          highPrice: pricing.garageMonthly,
          offerCount: 2,
          offers: [
            {
              "@type": "Offer",
              name: locale === "nl" ? "ZZP" : "ZZP",
              price: pricing.zzpMonthly,
              priceCurrency: pricing.currency,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: pricing.zzpMonthly,
                priceCurrency: pricing.currency,
                billingDuration: "P1M",
                valueAddedTaxIncluded: false,
              },
              availability: "https://schema.org/InStock",
              url: absoluteUrl(pricingPath),
            },
            {
              "@type": "Offer",
              name: locale === "nl" ? "Garagebedrijf" : "Garage",
              price: pricing.garageMonthly,
              priceCurrency: pricing.currency,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: pricing.garageMonthly,
                priceCurrency: pricing.currency,
                billingDuration: "P1M",
                valueAddedTaxIncluded: false,
              },
              availability: "https://schema.org/InStock",
              url: absoluteUrl(pricingPath),
            },
          ],
        },
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
  keywords,
}: {
  locale: string;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  keywords?: string[];
}) {
  const url = absoluteUrl(`/${locale}/blog/${slug}`);
  const homeLabel = locale === "nl" ? "Start" : "Home";
  const blogLabel = "Blog";
  const image = absoluteUrl("/opengraph-image");

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#software` },
    description,
    image,
    datePublished,
    dateModified: datePublished,
    inLanguage: locale === "nl" ? "nl-NL" : "en",
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.companyUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.companyUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon"),
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: absoluteUrl(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blogLabel,
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

export function BreadcrumbJsonLd({
  items,
}: {
  items: ReadonlyArray<{ name: string; url: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
