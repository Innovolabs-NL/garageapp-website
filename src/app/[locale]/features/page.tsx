import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("featuresTitle"),
    description: t("featuresDescription"),
    alternates: {
      languages: {
        nl: `${siteConfig.url}/nl/functies`,
        en: `${siteConfig.url}/en/features`,
      },
    },
  };
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Features");

  return (
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>
      <FeaturesGrid />
    </PageWrap>
  );
}
