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
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-night">
        <div className="absolute inset-0">
          <Image
            src={siteConfig.heroImage}
            alt=""
            fill
            priority
            className="hero-media object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-night/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(240,161,26,0.18),transparent_42%)]" />
        <div className="noise-overlay" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <FadeUp>
            <p className="font-display text-[clamp(3.4rem,11vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
              {t("brand")}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 max-w-2xl font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-semibold leading-[1.15] text-white/95">
              {t("headline")}
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("subhead")}
            </p>
          </FadeUp>
          <FadeUp delay={0.22} className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-accent">
              {t("ctaPrimary")}
            </Link>
            <Link href="/features" className="btn-ghost">
              {t("ctaSecondary")}
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <FadeUp>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {t("howTitle")}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
            {t("howSub")}
          </h2>
        </FadeUp>

        <ol className="mt-16 space-y-0 border-t border-hairline">
          {[
            ["step1Title", "step1Body"],
            ["step2Title", "step2Body"],
            ["step3Title", "step3Body"],
          ].map(([titleKey, bodyKey], i) => (
            <FadeUp key={titleKey} delay={i * 0.07}>
              <li className="grid gap-4 border-b border-hairline py-10 md:grid-cols-[7rem_1fr] md:gap-10">
                <p className="font-display text-5xl font-extrabold leading-none text-primary/25 md:text-6xl">
                  0{i + 1}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-bold sm:text-3xl">
                    {t(titleKey as "step1Title")}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
                    {t(bodyKey as "step1Body")}
                  </p>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </section>

      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(31,79,216,0.35),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(240,161,26,0.2),transparent_35%)]" />
        <div className="noise-overlay opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
          <FadeUp>
            <h2 className="max-w-3xl font-display text-4xl font-extrabold text-white sm:text-5xl">
              {t("portalTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              {t("portalBody")}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl bg-night px-8 py-14 text-white sm:px-14 sm:py-16">
            <div className="absolute inset-0 bg-primary/40" />
            <div className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
            <div className="relative">
              <h2 className="max-w-2xl font-display text-3xl font-extrabold text-white sm:text-5xl">
                {t("finalCtaTitle")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {t("finalCtaBody")}
              </p>
              <Link href="/contact" className="btn-accent mt-8">
                {t("finalCtaButton")}
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
