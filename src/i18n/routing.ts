import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/features": {
      nl: "/functies",
      en: "/features",
    },
    "/pricing": {
      nl: "/prijzen",
      en: "/pricing",
    },
    "/about": {
      nl: "/over-ons",
      en: "/about",
    },
    "/garage-software": "/garage-software",
    "/werkplaats-software": {
      nl: "/werkplaats-software",
      en: "/workshop-software",
    },
    "/garage-software-zzp": {
      nl: "/garage-software-zzp",
      en: "/solo-garage-software",
    },
    "/werkorder-software": {
      nl: "/werkorder-software",
      en: "/work-order-software",
    },
    "/contact": "/contact",
    "/privacy": "/privacy",
    "/terms": "/terms",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
