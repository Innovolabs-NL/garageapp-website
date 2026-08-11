export const siteConfig = {
  name: "GarageApp",
  company: "Innovolabs",
  descriptionNl:
    "Garage software voor Nederlandse werkplaatsen — keuring, werkorders, uren en facturen in één systeem.",
  descriptionEn:
    "Garage software for repair shops — inspections, work orders, time tracking, and invoicing in one system.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://garageapp.nl",
  contactEmail: process.env.CONTACT_TO_EMAIL ?? "hello@innovolabs.nl",
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
