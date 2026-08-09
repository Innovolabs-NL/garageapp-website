"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";

export function HomeCta() {
  const t = useTranslations("Home");

  return (
    <section className="cta-band">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <FadeUp>
          <p className="eyebrow !text-white/60">GarageApp</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
            {t("finalCtaTitle")}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {t("finalCtaBody")}
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-[#1a1204] transition-[filter] hover:brightness-105"
          >
            {t("finalCtaButton")}
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
