import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("featuresTitle"),
    description: t("featuresDescription"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/functies`,
      languages: {
        nl: `${siteConfig.url}/nl/functies`,
        en: `${siteConfig.url}/en/features`,
      },
    },
  };
}

const features = [
  ["inspectionTitle", "inspectionBody"],
  ["planTitle", "planBody"],
  ["woTitle", "woBody"],
  ["timeTitle", "timeBody"],
  ["invoiceTitle", "invoiceBody"],
  ["portalTitle", "portalBody"],
] as const;

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Features");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <FadeUp>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
          {t("intro")}
        </p>
      </FadeUp>

      <div className="mt-14 grid gap-0 border-t border-hairline md:grid-cols-2">
        {features.map(([title, body], i) => (
          <FadeUp
            key={title}
            delay={(i % 2) * 0.05}
            className="border-b border-hairline py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10"
          >
            <h2 className="font-display text-2xl font-semibold">{t(title)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">{t(body)}</p>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-14">
        <Link
          href="/contact"
          className="inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-on-primary hover:bg-primary-active"
        >
          {t("cta")}
        </Link>
      </FadeUp>
    </div>
  );
}
