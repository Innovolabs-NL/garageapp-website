import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("featuresTitle"),
    description: t("featuresDescription"),
    href: "/features",
    keywords: t.raw("featuresKeywords") as string[],
  });
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("Nav");
  const homeLabel = locale === "nl" ? "Start" : "Home";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel, url: absoluteUrl(`/${locale}`) },
          {
            name: tNav("features"),
            url: absoluteUrl(locale === "nl" ? "/nl/functies" : "/en/features"),
          },
        ]}
      />
      <FeaturesGrid />
    </>
  );
}
