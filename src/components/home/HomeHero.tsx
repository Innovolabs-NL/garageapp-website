"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AppLink } from "@/components/AppLink";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig } from "@/lib/site";

export function HomeHero() {
  const t = useTranslations("Home");
  const flow = [t("flow1"), t("flow2"), t("flow3"), t("flow4"), t("flow5")];

  return (
    <section className="hero-media">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="hero-media__shade" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-36 sm:pb-16">
        <BrandLogo className="h-24 w-auto sm:h-32" priority />

        <p className="eyebrow mt-8">{t("badge")}</p>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7.5vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
          {t("headlineStart")}{" "}
          <span className="marker">{t("headlineMark")}</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {t("subhead")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <AppLink
            href="register"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-white transition-[filter] hover:brightness-110"
          >
            {t("ctaPrimary")}
          </AppLink>
          <Link href="/features" className="btn-on-media">
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      <div className="hero-media__flow relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 py-5 sm:gap-x-4">
            {flow.map((stage, i) => (
              <li key={stage} className="flex items-center gap-3 sm:gap-4">
                <span className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  <span className="mr-2 text-subtle">0{i + 1}</span>
                  {stage}
                </span>
                {i < flow.length - 1 ? (
                  <ArrowRight size={14} className="text-accent" aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
