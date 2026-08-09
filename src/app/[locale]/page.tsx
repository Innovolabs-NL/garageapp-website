import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeUp } from "@/components/FadeUp";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeCta } from "@/components/home/HomeCta";
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

  const roles = [
    { title: t("roleBackTitle"), body: t("roleBackBody") },
    { title: t("roleTechTitle"), body: t("roleTechBody") },
    { title: t("roleCustTitle"), body: t("roleCustBody") },
  ] as const;

  return (
    <>
      <HomeHero />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <p className="eyebrow">{t("howTitle")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
              {t("howSub")}
            </h2>
          </FadeUp>

          <ol className="mt-14">
            {(
              [
                ["step1Title", "step1Body"],
                ["step2Title", "step2Body"],
                ["step3Title", "step3Body"],
              ] as const
            ).map(([titleKey, bodyKey], i) => (
              <FadeUp key={titleKey} delay={i * 0.05}>
                <li className="rule grid gap-3 py-9 md:grid-cols-[7rem_18rem_1fr] md:gap-8">
                  <p className="font-display text-4xl font-bold leading-none text-subtle sm:text-5xl">
                    0{i + 1}
                  </p>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {t(titleKey)}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed">{t(bodyKey)}</p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <p className="eyebrow">{t("rolesEyebrow")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
              {t("rolesFocus")}
            </h2>
            <p className="mt-5 max-w-xl text-lg">{t("rolesSub")}</p>
          </FadeUp>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {roles.map((role, i) => (
              <FadeUp key={role.title} delay={i * 0.05}>
                <article className="rule pt-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed">{role.body}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
              {t("portalTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed">{t("portalBody")}</p>
          </FadeUp>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
