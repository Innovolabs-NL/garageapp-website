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
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
        <FadeUp>
          <BrandLogo tone="on-dark" className="h-10 w-auto sm:h-12" />
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.85rem,7vw,3rem)] font-bold tracking-[-0.02em] text-white sm:mt-8 sm:text-5xl">
            {t("finalCtaTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
            {t("finalCtaBody")}
          </p>
          <AppLink
            href="register"
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-white transition-[filter] hover:brightness-110 sm:mt-9 sm:w-auto"
          >
            {t("finalCtaButton")}
          </AppLink>
        </FadeUp>
      </div>
    </section>
  );
}
