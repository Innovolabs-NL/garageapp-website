import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppLink } from "@/components/AppLink";
import { ContactForm } from "@/components/ContactForm";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("contactTitle"),
    description: t("contactDescription"),
    href: "/contact",
  });
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
          <p className="mt-6 text-sm text-muted">
            {t("trialHint")}{" "}
            <AppLink
              href="register"
              className="font-semibold text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-accent"
            >
              {t("trialCta")}
            </AppLink>
          </p>
        </FadeUp>
        <FadeUp delay={0.08} className="card-surface rounded-xl p-6 sm:p-8">
          <ContactForm />
        </FadeUp>
      </div>
    </PageWrap>
  );
}
