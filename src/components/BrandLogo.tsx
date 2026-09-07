"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { currentTheme, subscribeTheme, type ColorTheme } from "@/lib/theme";
import { siteConfig } from "@/lib/site";

type LogoTone = "on-light" | "on-dark";

/**
 * MotivoX wordmark lockup.
 * `on-light` = navy ink (for light surfaces), `on-dark` = white (for dark / media).
 */
export function BrandLogo({
  className = "h-9 w-auto",
  tone = "auto",
  priority = false,
}: {
  className?: string;
  tone?: LogoTone | "auto";
  priority?: boolean;
}) {
  const theme = useSyncExternalStore<ColorTheme>(
    subscribeTheme,
    currentTheme,
    () => "light",
  );

  const resolved: LogoTone =
    tone === "auto" ? (theme === "dark" ? "on-dark" : "on-light") : tone;

  const src =
    resolved === "on-dark"
      ? "/brand/motivox-dark.png"
      : "/brand/motivox-light.png";

  return (
    <Image
      key={src}
      src={src}
      alt={siteConfig.name}
      width={556}
      height={321}
      priority={priority}
      className={className}
    />
  );
}
