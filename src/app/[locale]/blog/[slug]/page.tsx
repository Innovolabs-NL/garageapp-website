import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { BlogPostingJsonLd } from "@/components/JsonLd";
import { getAlternateBlogSlug } from "@/lib/blog-translations";
import { getPost, getPostSlugs } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { buildBlogPostMetadata } from "@/lib/seo";

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
  return buildBlogPostMetadata({
    locale,
    slug,
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    publishedTime: post.date,
    alternateSlug: getAlternateBlogSlug(locale, slug),
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const alternateSlug = getAlternateBlogSlug(locale, slug);
  const otherLocale = locale === "nl" ? "en" : "nl";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <BlogPostingJsonLd
        locale={locale}
        title={post.title}
        description={post.description}
        slug={slug}
        datePublished={post.date}
      />
      <Link href="/blog" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        ← {t("back")}
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:mt-10">
        {post.date} · {post.readingMinutes} {t("minRead")}
      </p>
      <h1 className="mt-4 font-display text-[clamp(1.85rem,7vw,3rem)] font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">{post.description}</p>
      <div className="prose-blog mt-8 border-t border-border pt-8 sm:mt-10 sm:pt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
      {alternateSlug ? (
        <p className="mt-12 border-t border-border pt-8 text-sm text-muted">
          <Link
            href={{ pathname: "/blog/[slug]", params: { slug: alternateSlug } }}
            locale={otherLocale}
            className="font-semibold text-primary"
          >
            {locale === "nl"
              ? "Read this article in English"
              : "Lees dit artikel in het Nederlands"}
          </Link>
        </p>
      ) : null}
    </article>
  );
}
