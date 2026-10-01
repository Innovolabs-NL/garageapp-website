"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { useSignedIn } from "@/lib/useSignedIn";

type AppHref = "register" | "login" | "portal" | "app";

const appHrefs: Record<AppHref, string> = {
  register: siteConfig.registerUrl,
  login: siteConfig.loginUrl,
  portal: siteConfig.customerPortalUrl,
  app: siteConfig.openAppUrl,
};

export function AppLink({
  href,
  className,
  children,
  onClick,
}: {
  href: AppHref;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const t = useTranslations("Nav");
  const signedIn = useSignedIn();
  // Signed-in staff don't need to start a trial: sign-up CTAs become "Open app".
  const openApp = href === "register" && signedIn;

  return (
    <a
      href={openApp ? appHrefs.app : appHrefs[href]}
      className={className}
      onClick={onClick}
    >
      {openApp ? t("openApp") : children}
    </a>
  );
}
