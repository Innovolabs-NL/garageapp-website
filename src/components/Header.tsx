"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "./LanguageToggle";

const navItems = [
  { href: "/features" as const, key: "features" as const },
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/blog" as const, key: "blog" as const },
  { href: "/contact" as const, key: "contact" as const },
];

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = isHome && !scrolled && !open;
  const barClass = overHero
    ? "absolute inset-x-0 top-0 z-50 border-transparent bg-transparent"
    : "sticky top-0 z-50 border-b border-hairline bg-white/80 backdrop-blur-xl";

  const ink = overHero ? "text-white" : "text-ink";
  const muted = overHero ? "text-white/75 hover:text-white" : "text-body hover:text-ink";

  return (
    <header className={barClass}>
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className={`font-display text-[1.65rem] font-extrabold tracking-tight ${ink}`}
        >
          GarageApp
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.92rem] font-semibold ${muted}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle light={overHero} />
          <Link href="/contact" className="btn-accent hidden sm:inline-flex !py-2.5 !px-4 text-sm">
            {t("cta")}
          </Link>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg p-2 md:hidden ${ink}`}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-hairline bg-surface md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-2 py-2.5 text-base font-semibold text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link href="/contact" className="btn-accent mt-2 text-center">
              {t("cta")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
