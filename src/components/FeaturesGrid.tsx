"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Clock, FileText, PenLine, Plug } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { Kenteken } from "@/components/Kenteken";
import { LiveTimer } from "@/components/LiveTimer";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HomeCta } from "@/components/home/HomeCta";
import { siteConfig } from "@/lib/site";

const PLATE = "H-842-XN";

const beats = [
  {
    n: "01",
    title: "beat1Title",
    body: "beat1Body",
    status: "beat1Status",
    kind: "inspect" as const,
  },
  {
    n: "02",
    title: "beat2Title",
    body: "beat2Body",
    status: "beat2Status",
    kind: "plan" as const,
  },
  {
    n: "03",
    title: "beat3Title",
    body: "beat3Body",
    status: "beat3Status",
    kind: "timer" as const,
  },
  {
    n: "04",
    title: "beat4Title",
    body: "beat4Body",
    status: "beat4Status",
    kind: "image" as const,
    image: siteConfig.images.floor,
  },
] as const;

const officeItems = [
  "officeItem1",
  "officeItem2",
  "officeItem3",
  "officeItem4",
  "officeItem5",
  "officeItem6",
  "officeItem7",
  "officeItem8",
] as const;

const techItems = [
  "techItem1",
  "techItem2",
  "techItem3",
  "techItem4",
  "techItem5",
  "techItem6",
] as const;

const custItems = [
  "custItem1",
  "custItem2",
  "custItem3",
  "custItem4",
  "custItem5",
  "custItem6",
] as const;

export function FeaturesGrid() {
  const t = useTranslations("Features");

  return (
    <>
      <section className="hero-media overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteConfig.images.featuresHero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="hero-media__shade" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-24">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
            {t("storyTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {t("storyIntro")}
          </p>

          <div className="mt-10 flex flex-wrap items-end gap-5">
            <Kenteken code={PLATE} />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                {t("storyVehicle")}
              </p>
              <p className="text-sm text-muted">{t("storyJob")}</p>
            </div>
          </div>
        </div>
      </section>

      {beats.map((beat, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={beat.n}
            className={`border-b border-border ${flip ? "bg-surface" : ""}`}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:gap-10">
              <FadeUp className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                <p className="font-display text-6xl font-bold leading-none text-subtle sm:text-7xl">
                  {beat.n}
                </p>
                <h2 className="mt-8 font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
                  {t(beat.title)}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                  {t(beat.body)}
                </p>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {t(beat.status)}
                </p>
              </FadeUp>

              <FadeUp
                delay={0.05}
                className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
              >
                {beat.kind === "inspect" ? (
                  <div className="card-surface relative overflow-hidden rounded-xl p-8 sm:p-10">
                    <div
                      className="pointer-events-none absolute inset-0 garage-texture"
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <Kenteken code={PLATE} />
                        <span className="bay-chip">{t("draftChip")}</span>
                      </div>
                      <p className="mt-8 font-display text-2xl font-semibold text-foreground">
                        {t("inspectCardTitle")}
                      </p>
                      <ul className="mt-5 space-y-3 text-sm">
                        {(
                          [
                            ["inspectLine1", "inspectStatus1", "text-accent"],
                            ["inspectLine2", "inspectStatus2", "text-success"],
                            ["inspectLine3", "inspectStatus3", "text-success"],
                          ] as const
                        ).map(([line, status, tone]) => (
                          <li
                            key={line}
                            className="flex items-baseline justify-between gap-4 border-b border-border pb-2 text-muted last:border-0"
                          >
                            <span>{t(line)}</span>
                            <span
                              className={`text-xs font-semibold uppercase tracking-[0.12em] ${tone}`}
                            >
                              {t(status)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {t(beat.status)}
                      </p>
                    </div>
                  </div>
                ) : beat.kind === "plan" ? (
                  <div className="card-surface relative overflow-hidden rounded-xl p-8 sm:p-10">
                    <div
                      className="pointer-events-none absolute inset-0 garage-texture"
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <Kenteken code={PLATE} />
                        <span className="icon-bay">
                          <PenLine size={18} aria-hidden />
                        </span>
                      </div>
                      <p className="mt-8 font-display text-2xl font-semibold text-foreground">
                        {t("planCardTitle")}
                      </p>
                      <ul className="mt-5 space-y-2 text-sm text-muted">
                        <li>— {t("planLine1")}</li>
                        <li>— {t("planLine2")}</li>
                        <li>— {t("planLine3")}</li>
                      </ul>
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <span className="icon-bay">
                          <FileText size={18} aria-hidden />
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                          {t(beat.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : beat.kind === "timer" ? (
                  <div className="card-surface relative overflow-hidden rounded-xl p-8 sm:p-10">
                    <div
                      className="pointer-events-none absolute inset-0 garage-texture"
                      aria-hidden
                    />
                    <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <Kenteken code={PLATE} />
                        <p className="mt-6 font-display text-2xl font-semibold text-foreground">
                          {t("storyVehicle")}
                        </p>
                        <p className="mt-1 text-muted">{t("storyJob")}</p>
                        <p className="mt-4 text-sm text-muted">{t("techAssigned")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="icon-bay">
                          <Clock size={18} aria-hidden />
                        </span>
                        <LiveTimer className="font-display text-4xl font-bold tabular-nums text-foreground sm:text-5xl" />
                      </div>
                    </div>
                    <p className="relative mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-success">
                      {t(beat.status)}
                    </p>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                    <Image
                      src={beat.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-5">
                      <Kenteken code={PLATE} />
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                        {t(beat.status)}
                      </span>
                    </div>
                  </div>
                )}
              </FadeUp>
            </div>
          </section>
        );
      })}

      <FeatureGrid eyebrow={t("gridEyebrow")} title={t("gridTitle")} />

      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <p className="eyebrow">{t("audienceEyebrow")}</p>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              {t("audienceTitle")}
            </h2>
          </FadeUp>
          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {(
              [
                ["officeTitle", officeItems],
                ["techTitle", techItems],
                ["custTitle", custItems],
              ] as const
            ).map(([titleKey, keys], i) => (
              <FadeUp key={titleKey} delay={i * 0.05}>
                <article className="rule pt-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {t(titleKey)}
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                    {keys.map((key) => (
                      <li key={key} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                  {titleKey === "custTitle" ? (
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {t("journeyLabel")}: {t("journey")}
                    </p>
                  ) : null}
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 garage-texture"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <p className="eyebrow">{t("integrationsEyebrow")}</p>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                {t("integrationsTitle")}
              </h2>
              <span className="icon-bay shrink-0">
                <Plug size={18} aria-hidden />
              </span>
            </div>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {t("integrationsBody")}
            </p>
          </FadeUp>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
