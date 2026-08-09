export const siteConfig = {
  name: "GarageApp",
  company: "Innovolabs",
  descriptionNl:
    "Garage software voor Nederlandse werkplaatsen — keuring, werkorders, uren en facturen in één systeem.",
  descriptionEn:
    "Garage software for repair shops — inspections, work orders, time tracking, and invoicing in one system.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://garageapp.nl",
  contactEmail: process.env.CONTACT_TO_EMAIL ?? "hello@innovolabs.nl",
  heroImage:
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=2400&q=80",
} as const;
