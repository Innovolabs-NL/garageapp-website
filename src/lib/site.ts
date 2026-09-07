/** Env may be set but empty on Vercel — treat blank as missing. */
function envUrl(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return (trimmed || fallback).replace(/\/$/, "");
}

const appUrl = envUrl(
  process.env.NEXT_PUBLIC_APP_URL,
  "https://app.garageapp.nl",
);

export const siteConfig = {
  name: "GarageApp",
  company: "Innovolabs",
  descriptionNl:
    "Eén systeem voor de hele job — intake, keuring, goedkeuring, werk op de vloer, uren, onderdelen en factuur — zonder iets over te typen.",
  descriptionEn:
    "One system for the whole job — intake, inspection, approval, work on the floor, hours, parts, and invoice — without retyping anything.",
  url: envUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://garageapp.nl"),
  appUrl,
  registerUrl: `${appUrl}/Identity/Account/Register?utm_source=website`,
  loginUrl: `${appUrl}/Identity/Account/Login`,
  contactEmail:
    process.env.CONTACT_TO_EMAIL?.trim() || "hello@innovolabs.nl",
  /** Workshop photography — replace with owned shots when available */
  images: {
    hero: "https://images.unsplash.com/photo-1727893119356-1702fe921cf9?auto=format&fit=crop&w=2400&q=80",
    /** Bright shop floor — same series as `hero`, distinct angle for Functies */
    featuresHero:
      "https://images.unsplash.com/photo-1727893141025-35d62b3f4a03?auto=format&fit=crop&w=2400&q=80",
    floor:
      "https://images.unsplash.com/photo-1727893294198-e85137574f5b?auto=format&fit=crop&w=1600&q=80",
    tools:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=80",
  },
} as const;
