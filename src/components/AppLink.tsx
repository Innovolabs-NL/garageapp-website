import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

type AppHref = "register" | "login" | "portal";

const appHrefs: Record<AppHref, string> = {
  register: siteConfig.registerUrl,
  login: siteConfig.loginUrl,
  portal: siteConfig.customerPortalUrl,
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
  return (
    <a href={appHrefs[href]} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
