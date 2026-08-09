import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: {
      languages: {
        nl: `${siteConfig.url}/nl/contact`,
        en: `${siteConfig.url}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <PageWrap>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <FadeUp>
          <PageHero title={t("title")} intro={t("intro")} />
        </FadeUp>
        <FadeUp delay={0.08} className="rounded-2xl bg-surface p-6 ring-1 ring-hairline sm:p-8">
          <ContactForm />
        </FadeUp>
      </div>
    </PageWrap>
  );
}
