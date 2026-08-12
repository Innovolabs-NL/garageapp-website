"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { HomeCta } from "@/components/home/HomeCta";

/** Monthly list prices in EUR — yearly = 10× monthly (2 months free).
 *  Anchored to NL/EU workshop SaaS comps; COGS assume Hetzner Cloud.
 *  See canvases/pricing-research.canvas.tsx */
const PLAN_PRICES = {
  starter: 79,
  pro: 129,
  business: 219,
} as const;

const plans = [
  {
    id: "starter" as const,
    title: "starterTitle",
    body: "starterBody",
    includes: [
      "starterInc1",
      "starterInc2",
      "starterInc3",
      "starterInc4",
      "starterInc5",
    ] as const,
    cta: "starterCta",
    featured: false,
  },
  {
    id: "pro" as const,
    title: "proTitle",
    body: "proBody",
    includes: [
      "proInc1",
      "proInc2",
      "proInc3",
      "proInc4",
      "proInc5",
      "proInc6",
    ] as const,
    cta: "proCta",
    featured: true,
  },
  {
    id: "business" as const,
    title: "businessTitle",
    body: "businessBody",
    includes: [
      "businessInc1",
      "businessInc2",
      "businessInc3",
      "businessInc4",
      "businessInc5",
      "businessInc6",
    ] as const,
    cta: "businessCta",
    featured: false,
  },
] as const;

const faqs = [
  ["faq1Q", "faq1A"],
  ["faq2Q", "faq2A"],
  ["faq3Q", "faq3A"],
  ["faq4Q", "faq4A"],
] as const;

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingContent() {
  const t = useTranslations("Pricing");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

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

          <div
            className="mx-auto mt-10 inline-flex items-center rounded-lg border border-border bg-surface p-1"
            role="group"
            aria-label={t("billingLabel")}
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                billing === "monthly"
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t("billingMonthly")}
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                billing === "yearly"
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t("billingYearly")}
              <span className="ml-2 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1a1204]">
                {t("billingSave")}
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-2/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan, i) => {
              const monthly = PLAN_PRICES[plan.id];
              const display =
                billing === "yearly"
                  ? Math.round((monthly * 10) / 12)
                  : monthly;
              const billedYearly = monthly * 10;

              return (
                <FadeUp key={plan.id} delay={i * 0.05} className="h-full">
                  <article
                    className={`relative flex h-full flex-col rounded-xl border p-6 sm:p-7 ${
                      plan.featured
                        ? "border-accent bg-surface shadow-[0_0_0_1px_color-mix(in_srgb,#f0a11a_35%,transparent)]"
                        : "border-border bg-surface"
                    }`}
                  >
                    {plan.featured ? (
                      <span className="absolute -top-3 left-6 inline-flex rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a1204]">
                        {t("popular")}
                      </span>
                    ) : null}

                    <div>
                      <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {t(plan.title)}
                      </h2>
                      <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-muted">
                        {t(plan.body)}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border pt-6">
                      <div className="flex items-end gap-1.5">
                        <p className="font-display text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
                          {formatEuro(display)}
                        </p>
                        <p className="mb-1.5 text-sm text-muted">
                          {t("perMonth")}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted">
                        {billing === "yearly"
                          ? t("billedYearly", {
                              amount: formatEuro(billedYearly),
                            })
                          : t("billedMonthly")}
                      </p>
                    </div>

                    <ul className="mt-8 flex-1 space-y-3">
                      {plan.includes.map((key) => (
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

                    <Link
                      href="/contact"
                      className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold transition-[filter] ${
                        plan.featured
                          ? "bg-accent text-[#1a1204] hover:brightness-105"
                          : "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] hover:brightness-110"
                      }`}
                    >
                      {t(plan.cta)}
                    </Link>
                  </article>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp className="mt-10 text-center">
            <p className="text-sm text-muted">{t("finePrint")}</p>
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
