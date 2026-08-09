import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
import { PricingContent } from "@/components/PricingContent";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    alternates: {
      languages: {
        nl: `${siteConfig.url}/nl/prijzen`,
        en: `${siteConfig.url}/en/pricing`,
      },
    },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pricing");

  return (
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>
      <PricingContent />
    </PageWrap>
  );
}
