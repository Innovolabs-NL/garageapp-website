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
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: {
      languages: {
        nl: `${siteConfig.url}/nl/over-ons`,
        en: `${siteConfig.url}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>

      <FadeUp className="mx-auto mt-4 max-w-3xl">
        <div className="card-surface rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-foreground">{t("storyTitle")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {t("storyBody")}
          </p>
        </div>
      </FadeUp>

      <FadeUp className="mx-auto mt-8 max-w-3xl">
        <h2 className="text-center text-2xl font-semibold text-foreground">
          {t("valuesTitle")}
        </h2>
        <ul className="mt-6 space-y-3">
          {[t("value1"), t("value2"), t("value3")].map((item) => (
            <li
              key={item}
              className="card-surface rounded-xl px-5 py-4 text-base leading-relaxed text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </FadeUp>

      <FadeUp className="mt-12 text-center">
        <Link href="/contact" className="btn-primary">
          {t("cta")}
        </Link>
      </FadeUp>
    </PageWrap>
  );
}
