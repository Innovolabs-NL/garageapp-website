"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";

export function PricingContent() {
  const t = useTranslations("Pricing");

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
    <>
      <div className="mt-2 grid gap-4 lg:grid-cols-3">
        {packages.map(([title, body], i) => (
          <FadeUp key={title} delay={i * 0.05}>
            <article
              className={`card-surface relative h-full rounded-xl p-6 ${
                i === 1 ? "border-accent/60" : ""
              }`}
            >
              {i === 1 ? (
                <span className="mb-3 inline-flex rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-[#1a1204]">
                  {t("popular")}
                </span>
              ) : null}
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {t(title)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(body)}</p>
            </article>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-20">
        <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
          {t("faqTitle")}
        </h2>
        <dl className="mt-8">
          {faqs.map(([q, a]) => (
            <div key={q} className="rule py-6">
              <dt className="font-display text-lg font-semibold tracking-tight text-foreground">
                {t(q)}
              </dt>
              <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {t(a)}
              </dd>
            </div>
          ))}
        </dl>
      </FadeUp>

      <FadeUp className="mt-12 pb-4">
        <Link href="/contact" className="btn-primary">
          {t("cta")}
        </Link>
      </FadeUp>
    </>
  );
}
