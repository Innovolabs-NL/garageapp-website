import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { AppLink } from "@/components/AppLink";
import { FadeUp } from "@/components/FadeUp";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { PageHero, PageWrap } from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
import { landingPages, type LandingKey } from "@/lib/landing";
import { absoluteUrl, buildPageMetadata, localePath } from "@/lib/seo";

type Section = { title: string; body: string };
type Faq = { q: string; a: string };

const hrefOf = (key: LandingKey) =>
  landingPages.find((p) => p.key === key)!.href;

export async function landingMetadata(
  locale: string,
  key: LandingKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Landing.pages" });
  return buildPageMetadata({
    locale,
    title: t(`${key}.metaTitle`),
    description: t(`${key}.metaDescription`),
    href: hrefOf(key),
    keywords: t.raw(`${key}.keywords`) as string[],
  });
}

export async function LandingPage({
  locale,
  pageKey,
}: {
  locale: string;
  pageKey: LandingKey;
}) {
  setRequestLocale(locale);
  const t = await getTranslations("Landing.pages");
  const c = await getTranslations("Landing.common");

  const sections = t.raw(`${pageKey}.sections`) as Section[];
  const faqs = t.raw(`${pageKey}.faq`) as Faq[];
  const homeLabel = locale === "nl" ? "Start" : "Home";
  const others = landingPages.filter((p) => p.key !== pageKey);

  return (
    <PageWrap>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel, url: absoluteUrl(`/${locale}`) },
          {
            name: t(`${pageKey}.navLabel`),
            url: absoluteUrl(localePath(locale, hrefOf(pageKey))),
          },
        ]}
      />
      <FaqJsonLd items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <FadeUp>
        <PageHero
          eyebrow={t(`${pageKey}.eyebrow`)}
          title={t(`${pageKey}.title`)}
          intro={t(`${pageKey}.intro`)}
        />
        <div className="-mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <AppLink
            href="register"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-white transition-[filter] hover:brightness-110"
          >
            {c("ctaPrimary")}
          </AppLink>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-7 text-base font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {c("ctaSecondary")}
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted">{c("trialNote")}</p>
      </FadeUp>

      <div className="mt-14 grid gap-x-10 gap-y-10 sm:mt-20 md:grid-cols-2">
        {sections.map((section, i) => (
          <FadeUp key={section.title} delay={i * 0.04}>
            <section>
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-foreground sm:text-3xl">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {section.body}
              </p>
            </section>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <section className="mt-16 rounded-2xl border border-border bg-surface p-6 sm:mt-24 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {c("priceTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {c("priceBody")}
          </p>
          <Link
            href="/pricing"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary"
          >
            {c("relatedPricing")} →
          </Link>
        </section>
      </FadeUp>

      <section className="mt-16 max-w-3xl sm:mt-24">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {c("faqTitle")}
        </h2>
        <dl className="mt-6 divide-y divide-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-semibold text-foreground">{f.q}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav
        aria-label={c("relatedTitle")}
        className="mt-16 border-t border-border pt-8 sm:mt-24"
      >
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
          {c("relatedTitle")}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-primary">
          {others.map((p) => (
            <li key={p.key}>
              <Link href={p.href} className="inline-flex min-h-11 items-center">
                {t(`${p.key}.navLabel`)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/features" className="inline-flex min-h-11 items-center">
              {c("relatedFeatures")}
            </Link>
          </li>
          <li>
            <Link href="/blog" className="inline-flex min-h-11 items-center">
              {c("relatedBlog")}
            </Link>
          </li>
        </ul>
      </nav>

      <FadeUp>
        <section className="mt-16 rounded-2xl bg-[#0c1220] p-8 text-white sm:mt-24 sm:p-12">
          <h2 className="max-w-2xl font-display text-2xl font-bold sm:text-4xl">
            {c("finalTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-white/70">{c("finalBody")}</p>
          <AppLink
            href="register"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-white transition-[filter] hover:brightness-110 sm:w-auto"
          >
            {c("ctaPrimary")}
          </AppLink>
        </section>
      </FadeUp>
    </PageWrap>
  );
}
