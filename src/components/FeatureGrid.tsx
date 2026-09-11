"use client";

import { useTranslations } from "next-intl";
import {
  Bell,
  CalendarClock,
  CheckCircle2,
  FileSignature,
  Files,
  Package,
  Plug,
  Receipt,
  Timer,
  UserRound,
} from "lucide-react";
import { FadeUp } from "@/components/FadeUp";

const items = [
  { key: "grid1" as const, Icon: Files },
  { key: "grid2" as const, Icon: FileSignature },
  { key: "grid3" as const, Icon: Timer },
  { key: "grid4" as const, Icon: UserRound },
  { key: "grid5" as const, Icon: CheckCircle2 },
  { key: "grid6" as const, Icon: Package },
  { key: "grid7" as const, Icon: CalendarClock },
  { key: "grid8" as const, Icon: Receipt },
  { key: "grid9" as const, Icon: Bell },
  { key: "grid10" as const, Icon: Plug },
];

export function FeatureGrid({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const t = useTranslations("Features");

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface py-14 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 garage-texture opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeUp>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.75rem,6vw,2.5rem)] font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            {title}
          </h2>
        </FadeUp>

        <FadeUp delay={0.06}>
          <ul className="mt-10 divide-y divide-border border-y border-border sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0 sm:border-0 lg:grid-cols-2">
            {items.map((item, i) => (
              <li
                key={item.key}
                className="flex items-start gap-3.5 py-4 sm:border-t sm:border-border sm:py-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
                  <item.Icon size={16} strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-display text-[0.7rem] font-semibold tabular-nums tracking-[0.14em] text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-display text-[0.98rem] font-semibold leading-snug tracking-tight text-foreground sm:text-base">
                    {t(item.key)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
