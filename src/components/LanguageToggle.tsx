"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const next: Locale = locale === "nl" ? "en" : "nl";

  return (
    <button
      type="button"
      className="min-h-11 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:border-border-strong hover:text-foreground sm:min-h-0 sm:px-2.5 sm:py-1.5"
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
