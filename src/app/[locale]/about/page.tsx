import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeUp } from "@/components/FadeUp";
import { AppLink } from "@/components/AppLink";
import { PageHero, PageWrap } from "@/components/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    href: "/about",
  });
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

      <FadeUp className="mx-auto mt-2 max-w-3xl text-center">
        <a
          href={siteConfig.companyUrl}
          className="text-sm font-medium text-accent transition-colors hover:text-foreground"
        >
          {t("companyLink")}
        </a>
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
        <AppLink href="register" className="btn-primary">
          {t("cta")}
        </AppLink>
      </FadeUp>
    </PageWrap>
  );
}
