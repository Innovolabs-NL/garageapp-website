"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";

const featureKeys = [
  ["inspectionTitle", "inspectionBody"],
  ["planTitle", "planBody"],
  ["woTitle", "woBody"],
  ["timeTitle", "timeBody"],
  ["invoiceTitle", "invoiceBody"],
  ["portalTitle", "portalBody"],
] as const;

export function FeaturesGrid() {
  const t = useTranslations("Features");

  return (
    <>
      <ol className="mt-2">
        {featureKeys.map(([title, body], i) => (
          <FadeUp key={title} delay={(i % 3) * 0.04}>
            <li className="rule grid gap-2 py-8 md:grid-cols-[6rem_20rem_1fr] md:gap-8">
              <p className="font-display text-3xl font-bold leading-none text-subtle sm:text-4xl">
                0{i + 1}
              </p>
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {t(title)}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                {t(body)}
              </p>
            </li>
          </FadeUp>
        ))}
      </ol>

      <FadeUp className="rule mt-0 pt-10 pb-16">
        <Link href="/contact" className="btn-primary">
          {t("cta")}
        </Link>
      </FadeUp>
    </>
  );
}
