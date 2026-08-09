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
    "/contact": "/contact",
    "/privacy": "/privacy",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
