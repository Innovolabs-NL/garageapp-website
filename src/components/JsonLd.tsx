import { siteConfig } from "@/lib/site";

export function JsonLd({ locale }: { locale: string }) {
  const description =
    locale === "nl" ? siteConfig.descriptionNl : siteConfig.descriptionEn;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.company,
        url: siteConfig.url,
        email: siteConfig.contactEmail,
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description,
        url: siteConfig.url,
        provider: {
          "@type": "Organization",
          name: siteConfig.company,
        },
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
