import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { PricingContent } from "@/components/PricingContent";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    href: "/pricing",
    keywords: t.raw("pricingKeywords") as string[],
  });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pricing");
  const tNav = await getTranslations("Nav");
  const homeLabel = locale === "nl" ? "Start" : "Home";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel, url: absoluteUrl(`/${locale}`) },
          {
            name: tNav("pricing"),
            url: absoluteUrl(locale === "nl" ? "/nl/prijzen" : "/en/pricing"),
          },
        ]}
      />
      <FaqJsonLd
        items={[
          { question: t("faq1Q"), answer: t("faq1A") },
          { question: t("faq2Q"), answer: t("faq2A") },
          { question: t("faq3Q"), answer: t("faq3A") },
          { question: t("faq4Q"), answer: t("faq4A") },
        ]}
      />
      <PricingContent />
    </>
  );
}
