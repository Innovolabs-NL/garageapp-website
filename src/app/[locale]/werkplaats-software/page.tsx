import type { Metadata } from "next";
import { LandingPage, landingMetadata } from "@/components/LandingPage";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return landingMetadata(locale, "workshopSoftware");
}

export default async function WorkshopSoftwarePage({ params }: Props) {
  const { locale } = await params;
  return <LandingPage locale={locale} pageKey="workshopSoftware" />;
}
