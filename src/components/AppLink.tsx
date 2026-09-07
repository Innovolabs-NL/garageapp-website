import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

type AppHref = "register" | "login";

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
  const url = href === "register" ? siteConfig.registerUrl : siteConfig.loginUrl;
  return (
    <a href={url} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
