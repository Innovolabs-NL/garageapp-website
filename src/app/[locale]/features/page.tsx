import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
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
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>

      <div className="mt-4 space-y-0">
        {features.map(([title, body], i) => (
          <FadeUp key={title} delay={(i % 3) * 0.04}>
            <article className="grid gap-3 border-b border-hairline py-10 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                {t(title)}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-body sm:text-lg">
                {t(body)}
              </p>
            </article>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-14">
        <Link href="/contact" className="btn-accent">
          {t("cta")}
        </Link>
      </FadeUp>
    </PageWrap>
  );
}
