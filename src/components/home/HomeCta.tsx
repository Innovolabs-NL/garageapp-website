"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FadeUp } from "@/components/FadeUp";
import { AppLink } from "@/components/AppLink";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig } from "@/lib/site";

export function HomeCta() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden bg-[#0c1220] text-[#eef2f8]">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.images.tools}
          alt={t("ctaImageAlt")}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0c1220]/95 via-[#0c1220]/82 to-[#0c1220]/55"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <FadeUp>
          <BrandLogo tone="on-dark" className="h-12 w-auto" />
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
            {t("finalCtaTitle")}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {t("finalCtaBody")}
          </p>
          <AppLink
            href="register"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-white transition-[filter] hover:brightness-110"
          >
            {t("finalCtaButton")}
          </AppLink>
        </FadeUp>
      </div>
    </section>
  );
}
