import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqJsonLd } from "@/components/JsonLd";
import { PricingContent } from "@/components/PricingContent";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    href: "/pricing",
  });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pricing");

  return (
    <>
      <FaqJsonLd
        items={[
          { question: t("faq1Q"), answer: t("faq1A") },
          { question: t("faq2Q"), answer: t("faq2A") },
          { question: t("faq3Q"), answer: t("faq3A") },
        ]}
      />
      <PricingContent />
    </>
  );
}
