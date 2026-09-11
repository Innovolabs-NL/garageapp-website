"use client";

import { useTranslations } from "next-intl";
import { ClipboardCheck, Timer, Wrench } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { Kenteken } from "@/components/Kenteken";

const jobs = [
  {
    plate: "H-842-XN",
    vehicleKey: "bayJob1Vehicle" as const,
    workKey: "bayJob1Work" as const,
    labelKey: "bayJob1Label" as const,
    statusKey: "bayJob1Status" as const,
    statusTone: "warn" as const,
  },
  {
    plate: "K-193-BG",
    vehicleKey: "bayJob2Vehicle" as const,
    workKey: "bayJob2Work" as const,
    labelKey: "bayJob2Label" as const,
    statusKey: "bayJob2Status" as const,
    statusTone: "go" as const,
  },
  {
    plate: "P-557-TZ",
    vehicleKey: "bayJob3Vehicle" as const,
    workKey: "bayJob3Work" as const,
    labelKey: "bayJob3Label" as const,
    statusKey: "bayJob3Status" as const,
    statusTone: "idle" as const,
  },
];

export function HomeBayBoard() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface py-12 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 garage-texture"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeUp>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="eyebrow">{t("bayEyebrow")}</p>
              <h2 className="mt-4 max-w-xl font-display text-[clamp(1.75rem,6vw,2.25rem)] font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                {t("bayTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {t("baySub")}
            </p>
          </div>
        </FadeUp>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <FadeUp key={job.plate} delay={i * 0.06}>
              <li className="card-surface rounded-xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <Kenteken code={job.plate} />
                  <span className="bay-chip">{t(job.labelKey)}</span>
                </div>
                <p className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                  {t(job.vehicleKey)}
                </p>
                <p className="mt-1 text-sm text-muted">{t(job.workKey)}</p>
                <p
                  className={`mt-4 text-xs font-semibold uppercase tracking-[0.12em] ${
                    job.statusTone === "warn"
                      ? "text-accent"
                      : job.statusTone === "go"
                        ? "text-success"
                        : "text-muted"
                  }`}
                >
                  {t(job.statusKey)}
                </p>
              </li>
            </FadeUp>
          ))}
        </ul>

        <FadeUp className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <ClipboardCheck size={16} className="text-accent" aria-hidden />
            {t("bayCueInspect")}
          </span>
          <span className="inline-flex items-center gap-2">
            <Wrench size={16} className="text-accent" aria-hidden />
            {t("bayCueFloor")}
          </span>
          <span className="inline-flex items-center gap-2">
            <Timer size={16} className="text-accent" aria-hidden />
            {t("bayCueHours")}
          </span>
        </FadeUp>
      </div>
    </section>
  );
}
