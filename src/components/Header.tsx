"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/features" as const, key: "features" as const },
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/blog" as const, key: "blog" as const },
  { href: "/contact" as const, key: "contact" as const },
];

export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-navbar backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="brand-mark h-8 w-8 text-sm" aria-hidden>
            G
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            GarageApp
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <Link href="/contact" className="btn-primary hidden !h-9 !px-4 !text-sm sm:inline-flex">
            {t("cta")}
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted transition-colors hover:text-foreground md:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-base font-medium text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-2 py-2">
              <LanguageToggle />
            </div>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-1">
              {t("cta")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
