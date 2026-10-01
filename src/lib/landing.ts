import type { Pathnames } from "@/i18n/routing";

/** Keyword landing pages. Copy lives in messages under `Landing.pages.<key>`. */
export const landingPages = [
  { key: "garageSoftware", href: "/garage-software" },
  { key: "workshopSoftware", href: "/werkplaats-software" },
  { key: "soloGarage", href: "/garage-software-zzp" },
  { key: "workOrders", href: "/werkorder-software" },
] as const satisfies ReadonlyArray<{ key: string; href: Pathnames }>;

export type LandingKey = (typeof landingPages)[number]["key"];
