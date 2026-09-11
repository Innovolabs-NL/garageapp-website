"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { AppLink } from "./AppLink";
import { BrandLogo } from "./BrandLogo";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/features" as const, key: "features" as const },
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/blog" as const, key: "blog" as const },
  { href: "/contact" as const, key: "contact" as const },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
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
      setOverMedia(hero.getBoundingClientRect().bottom > 64);
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
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 items-center"
          onClick={() => setOpen(false)}
          aria-label="Motivox"
        >
          <BrandLogo className="h-8 w-auto sm:h-10" priority />
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

        <div className="flex items-center gap-1.5 sm:gap-2.5">
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
            className="hidden h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-[filter] hover:brightness-110 md:inline-flex"
          >
            {t("cta")}
          </AppLink>
          <button
            type="button"
            className="menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground md:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            data-open={open ? "true" : "false"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__icon" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="site-header__menu border-t border-border bg-surface md:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
          >
            <nav
              className="mx-auto flex min-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] max-w-6xl flex-col px-4 pb-8 pt-3 sm:min-h-[calc(100dvh-4rem)] sm:px-6"
              aria-label="Mobile"
            >
              <ul className="flex flex-col">
                {navItems.map((item, i) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.32,
                        delay: reduceMotion ? 0 : 0.06 + i * 0.045,
                        ease: easeOut,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-3 border-b border-border py-3.5 font-display text-[1.25rem] font-semibold tracking-[-0.02em] transition-colors sm:text-[1.35rem] ${
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
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                className="mt-auto flex flex-col gap-3 pt-8"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.34,
                  delay: reduceMotion ? 0 : 0.28,
                  ease: easeOut,
                }}
              >
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
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-7 text-base font-semibold text-white transition-[filter] hover:brightness-110"
                >
                  {t("cta")}
                </AppLink>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
