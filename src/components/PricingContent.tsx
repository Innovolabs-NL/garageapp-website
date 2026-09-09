"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { AppLink } from "@/components/AppLink";
import { HomeCta } from "@/components/home/HomeCta";
import { siteConfig } from "@/lib/site";

/** Matches Motivox Stripe plans (excl. VAT). */
const plans = [
  {
    id: "zzp" as const,
    price: siteConfig.pricing.zzpMonthly,
    featured: false,
    features: [
      "zzpFeatSeats",
      "featExtraSeats",
      "featWorkorders",
      "featInvoices",
      "featPortal",
    ] as const,
  },
  {
    id: "garage" as const,
    price: siteConfig.pricing.garageMonthly,
    featured: true,
    features: [
      "garageFeatSeats",
      "featExtraSeats",
      "featWorkorders",
      "featInvoices",
      "featPortal",
      "featTeam",
    ] as const,
  },
] as const;

const faqs = [
  ["faq1Q", "faq1A"],
  ["faq2Q", "faq2A"],
  ["faq3Q", "faq3A"],
  ["faq4Q", "faq4A"],
] as const;

const trust = ["trustCancel", "trustPay", "trustInvoice"] as const;

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingContent() {
  const t = useTranslations("Pricing");

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-36">
          <p className="eyebrow mx-auto justify-center">{t("eyebrow")}</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {t("intro")}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">{t("trialNote")}</p>
        </div>
      </section>

      <section className="border-b border-border bg-surface-2/40">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {plans.map((plan, i) => (
              <FadeUp key={plan.id} delay={i * 0.05}>
                <article
                  className={`relative flex h-full flex-col rounded-xl border bg-surface p-6 sm:p-8 ${
                    plan.featured
                      ? "border-accent shadow-[0_0_0_1px_color-mix(in_srgb,#0165fd_35%,transparent)]"
                      : "border-border"
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-6 rounded bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      {t("recommended")}
                    </span>
                  ) : null}

                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {t(`${plan.id}Title`)}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t(`${plan.id}Tagline`)}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border pt-6">
                    <div className="flex items-end gap-1.5">
                      <p className="font-display text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
                        {formatEuro(plan.price)}
                      </p>
                      <p className="mb-1.5 text-sm text-muted">{t("perMonthExVat")}</p>
                    </div>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((key) => (
                      <li
                        key={key}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-container text-primary">
                          <Check size={12} strokeWidth={2.75} aria-hidden />
                        </span>
                        {t(key)}
                      </li>
                    ))}
                  </ul>

                  <AppLink
                    href="register"
                    className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold transition-[filter] hover:brightness-105 ${
                      plan.featured
                        ? "bg-accent text-white"
                        : "border border-border-strong bg-surface text-foreground"
                    }`}
                  >
                    {t("planCta")}
                  </AppLink>
                </article>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-10 text-center">
            <p className="text-sm text-muted">{t("extraSeats")}</p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              {trust.map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {t(key)}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{t("finePrint")}</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-sm font-semibold text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-accent"
            >
              {t("enterpriseLink")}
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <FadeUp>
            <p className="eyebrow">{t("includedEyebrow")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
              {t("includedTitle")}
            </h2>
          </FadeUp>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              ["included1", "included2", "included3", "included4"] as const
            ).map((key, i) => (
              <FadeUp key={key} delay={i * 0.04}>
                <li className="rounded-xl border border-border bg-surface px-5 py-5">
                  <p className="font-display text-base font-semibold text-foreground">
                    {t(key)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`${key}Body`)}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0 garage-texture opacity-40"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <FadeUp>
            <p className="eyebrow">{t("faqEyebrow")}</p>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
              {t("faqTitle")}
            </h2>
          </FadeUp>
          <dl className="relative mt-10">
            {faqs.map(([q, a], i) => (
              <FadeUp key={q} delay={i * 0.03}>
                <div className="rule py-6">
                  <dt className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {t(q)}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
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
