import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        nl: `${siteConfig.url}/nl`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: `${siteConfig.url}/${locale}`,
      siteName: "GarageApp",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      <section className="relative min-h-[min(92vh,880px)] overflow-hidden">
        <Image
          src={siteConfig.heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/35" />
        <div className="relative mx-auto flex min-h-[min(92vh,880px)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <FadeUp>
            <p className="font-display text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
              {t("brand")}
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white/95 sm:text-4xl">
              {t("headline")}
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t("subhead")}
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-sm bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/features"
              className="rounded-sm border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {t("howTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-body">{t("howSub")}</p>
        </FadeUp>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            ["step1Title", "step1Body"],
            ["step2Title", "step2Body"],
            ["step3Title", "step3Body"],
          ].map(([titleKey, bodyKey], i) => (
            <FadeUp key={titleKey} delay={i * 0.06}>
              <li className="border-t border-hairline pt-6">
                <span className="font-mono text-xs text-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  {t(titleKey as "step1Title")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {t(bodyKey as "step1Body")}
                </p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <FadeUp>
            <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
              {t("portalTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
              {t("portalBody")}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {t("finalCtaTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-body">{t("finalCtaBody")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-active"
          >
            {t("finalCtaButton")}
          </Link>
        </FadeUp>
      </section>
    </>
  );
}
