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
      className="rounded-sm border border-hairline px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-surface"
      onClick={() => {
        router.replace(
          // Current route always matches pathname + params together
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
