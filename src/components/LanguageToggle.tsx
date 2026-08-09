"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const next: Locale = locale === "nl" ? "en" : "nl";

  return (
    <button
      type="button"
      className={
        light
          ? "rounded-lg border border-white/30 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/10"
          : "rounded-lg border border-hairline bg-surface px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-ink hover:bg-canvas"
      }
      onClick={() => {
        router.replace(
          { pathname, params } as Parameters<typeof router.replace>[0],
          { locale: next },
        );
      }}
      aria-label={next === "en" ? "Switch to English" : "Schakel naar Nederlands"}
    >
      {next}
    </button>
  );
}
