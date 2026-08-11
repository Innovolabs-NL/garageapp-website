"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { HomeCta } from "@/components/home/HomeCta";

const steps = [
  {
    n: "01",
    title: "demoTitle",
    body: "demoBody",
    includes: ["demoInc1", "demoInc2", "demoInc3"] as const,
    cta: "demoCta",
    featured: false,
  },
  {
    n: "02",
    title: "pilotTitle",
    body: "pilotBody",
    includes: ["pilotInc1", "pilotInc2", "pilotInc3"] as const,
    cta: "pilotCta",
    featured: true,
  },
  {
    n: "03",
    title: "scaleTitle",
    body: "scaleBody",
    includes: ["scaleInc1", "scaleInc2", "scaleInc3"] as const,
    cta: "scaleCta",
    featured: false,
  },
] as const;

const faqs = [
  ["faq1Q", "faq1A"],
  ["faq2Q", "faq2A"],
  ["faq3Q", "faq3A"],
] as const;

export function PricingContent() {
  const t = useTranslations("Pricing");

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 garage-texture opacity-40"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {t("intro")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-[#1a1204] transition-[filter] hover:brightness-105"
            >
              {t("cta")}
            </Link>
            <Link
              href="/features"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-border-strong bg-transparent px-6 text-base font-semibold text-foreground transition-colors hover:bg-surface"
            >
              {t("ctaSecondary")}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <FadeUp>
            <p className="eyebrow">{t("pathEyebrow")}</p>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              {t("pathTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              {t("pathIntro")}
            </p>
          </FadeUp>

          <ol className="mt-14">
            {steps.map((step, i) => (
              <li key={step.n} className="border-t border-border">
                <FadeUp delay={i * 0.04}>
                  <article
                    className={`grid gap-8 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16 ${
                      step.featured
                        ? "rounded-xl border border-border bg-surface px-5 sm:px-8 lg:my-2 lg:border-accent/50"
                        : ""
                    }`}
                  >
                    <div className="lg:col-span-4">
                      <p className="font-display text-5xl font-bold leading-none text-subtle sm:text-6xl">
                        {step.n}
                      </p>
                      {step.featured ? (
                        <span className="mt-5 inline-flex rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1204]">
                          {t("popular")}
                        </span>
                      ) : null}
                      <h3 className="mt-5 font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
                        {t(step.title)}
                      </h3>
                      <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
                        {t(step.body)}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between gap-8 lg:col-span-8 lg:pl-6">
                      <ul className="space-y-3">
                        {step.includes.map((key) => (
                          <li
                            key={key}
                            className="flex items-start gap-3 text-base leading-relaxed text-foreground"
                          >
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-container text-primary">
                              <Check size={14} strokeWidth={2.5} aria-hidden />
                            </span>
                            {t(key)}
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href="/contact"
                          className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-[filter,background,color] ${
                            step.featured
                              ? "bg-accent text-[#1a1204] hover:brightness-105"
                              : "border border-border-strong text-foreground hover:bg-surface"
                          }`}
                        >
                          {t(step.cta)}
                          <ArrowRight size={15} aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0 garage-texture opacity-50"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <FadeUp>
            <p className="eyebrow">{t("faqEyebrow")}</p>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              {t("faqTitle")}
            </h2>
          </FadeUp>
          <dl className="relative mt-12">
            {faqs.map(([q, a], i) => (
              <FadeUp key={q} delay={i * 0.03}>
                <div className="rule py-7">
                  <dt className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {t(q)}
                  </dt>
                  <dd className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                    {t(a)}
                  </dd>
                </div>
              </FadeUp>
            ))}
          </dl>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
