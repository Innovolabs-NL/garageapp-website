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
    title: t("pricingTitle"),
    description: t("pricingDescription"),
    alternates: {
      languages: {
        nl: `${siteConfig.url}/nl/prijzen`,
        en: `${siteConfig.url}/en/pricing`,
      },
    },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pricing");

  const packages = [
    ["demoTitle", "demoBody"],
    ["pilotTitle", "pilotBody"],
    ["scaleTitle", "scaleBody"],
  ] as const;

  const faqs = [
    ["faq1Q", "faq1A"],
    ["faq2Q", "faq2A"],
    ["faq3Q", "faq3A"],
  ] as const;

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

      <div className="mt-14 grid gap-8 border-t border-hairline pt-10 md:grid-cols-3">
        {packages.map(([title, body], i) => (
          <FadeUp key={title} delay={i * 0.06}>
            <h2 className="font-display text-2xl font-semibold">{t(title)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">{t(body)}</p>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16">
        <h2 className="font-display text-3xl font-semibold">{t("faqTitle")}</h2>
        <dl className="mt-8 space-y-6 border-t border-hairline pt-8">
          {faqs.map(([q, a]) => (
            <div key={q}>
              <dt className="font-medium text-ink">{t(q)}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-body">{t(a)}</dd>
            </div>
          ))}
        </dl>
      </FadeUp>

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
