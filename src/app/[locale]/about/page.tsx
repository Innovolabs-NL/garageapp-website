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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <FadeUp>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-body">{t("intro")}</p>
      </FadeUp>

      <FadeUp className="mt-12 border-t border-hairline pt-10">
        <h2 className="font-display text-2xl font-semibold">{t("storyTitle")}</h2>
        <p className="mt-4 leading-relaxed text-body">{t("storyBody")}</p>
      </FadeUp>

      <FadeUp className="mt-12">
        <h2 className="font-display text-2xl font-semibold">{t("valuesTitle")}</h2>
        <ul className="mt-4 space-y-3 text-body">
          <li className="border-l-2 border-primary pl-4">{t("value1")}</li>
          <li className="border-l-2 border-primary pl-4">{t("value2")}</li>
          <li className="border-l-2 border-primary pl-4">{t("value3")}</li>
        </ul>
      </FadeUp>

      <FadeUp className="mt-12">
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
