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
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>

      <div className="mt-6 space-y-0 border-t border-hairline">
        {packages.map(([title, body], i) => (
          <FadeUp key={title} delay={i * 0.05}>
            <div className="grid gap-3 border-b border-hairline py-10 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12">
              <h2 className="font-display text-2xl font-bold">{t(title)}</h2>
              <p className="max-w-2xl text-base leading-relaxed text-body sm:text-lg">
                {t(body)}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          {t("faqTitle")}
        </h2>
        <dl className="mt-8 space-y-0 border-t border-hairline">
          {faqs.map(([q, a]) => (
            <div key={q} className="border-b border-hairline py-7">
              <dt className="font-display text-xl font-bold text-ink">{t(q)}</dt>
              <dd className="mt-2 max-w-2xl text-base leading-relaxed text-body">
                {t(a)}
              </dd>
            </div>
          ))}
        </dl>
      </FadeUp>

      <FadeUp className="mt-14">
        <Link href="/contact" className="btn-accent">
          {t("cta")}
        </Link>
      </FadeUp>
    </PageWrap>
  );
}
