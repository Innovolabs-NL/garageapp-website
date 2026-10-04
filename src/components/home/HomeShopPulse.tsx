"use client";

import { useTranslations } from "next-intl";
import { CalendarClock, LayoutDashboard } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { Kenteken } from "@/components/Kenteken";

const arrivals = [
  { plate: "H-842-XN", labelKey: "liveRow1" as const },
  { plate: "K-193-BG", labelKey: "liveRow2" as const },
  { plate: "P-557-TZ", labelKey: "liveRow3" as const },
];

const workload = [
  { nameKey: "pulseTech1" as const, pct: 80 },
  { nameKey: "pulseTech2" as const, pct: 55 },
  { nameKey: "pulseTech3" as const, pct: 30 },
];

export function HomeShopPulse() {
  const t = useTranslations("Home");

  return (
    <section className="border-b border-border py-14 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          <p className="eyebrow">{t("pulseEyebrow")}</p>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,6vw,2.5rem)] font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            {t("pulseTitle")}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {t("pulseBody")}
          </p>

          <div className="card-surface mt-8 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="icon-bay">
                <LayoutDashboard size={18} aria-hidden />
              </span>
              <p className="font-display text-base font-semibold text-foreground">
                {t("pulseTile1Title")}
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="text-accent">, {t("pulseTile1Line1")}</li>
              <li>, {t("pulseTile1Line2")}</li>
            </ul>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="card-surface rounded-xl p-5">
              <p className="font-display text-base font-semibold text-foreground">
                {t("pulseTile2Title")}
              </p>
              <p className="mt-3 text-sm text-muted">{t("pulseTile2Item")}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {t("pulseTile2Level")}
              </p>
            </div>
            <div className="card-surface rounded-xl p-5">
              <p className="font-display text-base font-semibold text-foreground">
                {t("pulseTile3Title")}
              </p>
              <ul className="mt-3 space-y-2.5">
                {workload.map((w) => (
                  <li key={w.nameKey} className="text-xs text-muted">
                    <div className="flex justify-between">
                      <span>{t(w.nameKey)}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-border" aria-hidden>
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${w.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{t("liveEyebrow")}</p>
            <span className="bay-chip">{t("liveBadge")}</span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,6vw,2.5rem)] font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            {t("liveTitle")}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {t("liveBody")}
          </p>

          <div className="card-surface mt-8 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="icon-bay">
                <CalendarClock size={18} aria-hidden />
              </span>
              <p className="font-display text-base font-semibold text-foreground">
                {t("liveCapacity")}
              </p>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {arrivals.map((row) => (
                <li
                  key={row.plate}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <Kenteken code={row.plate} />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {t(row.labelKey)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
