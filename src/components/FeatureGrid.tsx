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
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeUp>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            {title}
          </h2>
        </FadeUp>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => (
            <FadeUp key={item.key} delay={i * 0.03}>
              <li className="card-surface flex h-full flex-col gap-4 rounded-xl p-5">
                <span className="icon-bay">
                  <item.Icon size={18} aria-hidden />
                </span>
                <p className="font-display text-base font-semibold leading-snug tracking-tight text-foreground">
                  {t(item.key)}
                </p>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
