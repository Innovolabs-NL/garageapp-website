/**
 * NL ↔ EN blog slug pairs for hreflang / sitemap alternates.
 * Keep in sync when adding bilingual posts.
 */
const pairs: ReadonlyArray<readonly [nl: string, en: string]> = [
  ["garage-software-nederland-excel", "garage-software-from-excel"],
  ["checklist-digitalisering-garage", "checklist-digitizing-garage"],
  ["digitaal-keuringsrapport", "digital-inspection-reports"],
  ["facturatie-garage-uren-pdf", "garage-invoicing-hours-pdf"],
  ["klantportaal-status-facturen", "customer-portal-status-invoices"],
  ["werkorders-urenregistratie", "work-orders-time-tracking"],
  ["wat-kost-garage-software", "what-does-garage-software-cost"],
  ["werkplaats-software-kiezen", "choosing-workshop-software"],
];

/** Slug of the same article in the other locale, or null if unpaired. */
export function getAlternateBlogSlug(
  locale: string,
  slug: string,
): string | null {
  for (const [nl, en] of pairs) {
    if (locale === "nl" && slug === nl) return en;
    if (locale === "en" && slug === en) return nl;
  }
  return null;
}

export function getBlogSlugForLocale(
  fromLocale: string,
  slug: string,
  toLocale: string,
): string | null {
  if (fromLocale === toLocale) return slug;
  return getAlternateBlogSlug(fromLocale, slug);
}
