import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
import { getLegalDoc } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("termsTitle"),
    description: t("termsDescription"),
    href: "/terms",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");
  const doc = getLegalDoc(locale, "terms");
  if (!doc) notFound();

  return (
    <PageWrap>
      <FadeUp>
        <PageHero title={doc.title || t("title")} intro={doc.updated} />
        <div className="prose-blog mx-auto mt-2 max-w-3xl text-base text-muted sm:text-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
        </div>
      </FadeUp>
    </PageWrap>
  );
}
