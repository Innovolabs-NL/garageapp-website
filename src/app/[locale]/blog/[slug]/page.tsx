import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { getPost, getPostSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} — GarageApp`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link href="/blog" className="text-sm font-semibold text-primary">
        ← {t("back")}
      </Link>
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {post.date} · {post.readingMinutes} {t("minRead")}
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
      <div className="prose-blog mt-10 border-t border-border pt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
