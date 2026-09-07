"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { AppLink } from "./AppLink";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/features" as const, key: "features" as const },
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/blog" as const, key: "blog" as const },
  { href: "/contact" as const, key: "contact" as const },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overMedia, setOverMedia] = useState(pathname === "/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    function update() {
      const hero = document.querySelector(".hero-media");
      if (!hero) {
        setOverMedia(false);
        return;
      }
      setOverMedia(hero.getBoundingClientRect().bottom > 72);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header
      data-over-media={overMedia && !open ? "true" : "false"}
      data-menu-open={open ? "true" : "false"}
      className="site-header fixed top-0 right-0 left-0 z-50 border-b border-border bg-navbar backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
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
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <AppLink
            href="login"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground md:inline"
          >
            {t("login")}
          </AppLink>
          <AppLink
            href="register"
            className="hidden h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-[#1a1204] transition-[filter] hover:brightness-105 md:inline-flex"
          >
            {t("cta")}
          </AppLink>
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
        <div className="site-header__menu border-t border-border bg-surface md:hidden">
          <nav
            className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col px-4 pb-8 pt-3 sm:px-6"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 border-b border-border py-4 font-display text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors ${
                        active
                          ? "text-foreground"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`h-5 w-1 shrink-0 rounded-full ${
                          active ? "bg-accent" : "bg-transparent"
                        }`}
                        aria-hidden
                      />
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-col gap-4 pt-8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {t("language")}
                </p>
                <LanguageToggle />
              </div>
              <AppLink
                href="login"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-border-strong text-base font-semibold text-foreground"
              >
                {t("login")}
              </AppLink>
              <AppLink
                href="register"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-[#1a1204] transition-[filter] hover:brightness-105"
              >
                {t("cta")}
              </AppLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
