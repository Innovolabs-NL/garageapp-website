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

      <FadeUp className="mt-8 border-t border-hairline pt-12">
        <h2 className="font-display text-3xl font-extrabold">{t("storyTitle")}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body">
          {t("storyBody")}
        </p>
      </FadeUp>

      <FadeUp className="mt-14">
        <h2 className="font-display text-3xl font-extrabold">{t("valuesTitle")}</h2>
        <ul className="mt-6 space-y-4">
          {[t("value1"), t("value2"), t("value3")].map((item) => (
            <li
              key={item}
              className="border-l-4 border-accent pl-5 text-base leading-relaxed text-body sm:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      </FadeUp>

      <FadeUp className="mt-14">
        <Link href="/contact" className="btn-accent">
          {t("cta")}
        </Link>
      </FadeUp>
    </PageWrap>
  );
}
