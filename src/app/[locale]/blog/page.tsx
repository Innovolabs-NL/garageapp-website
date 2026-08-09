import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
    alternates: {
      languages: {
        nl: `${siteConfig.url}/nl/blog`,
        en: `${siteConfig.url}/en/blog`,
      },
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = getAllPosts(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <FadeUp>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-body">{t("intro")}</p>
      </FadeUp>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">{t("empty")}</p>
      ) : (
        <ul className="mt-12 space-y-0 border-t border-hairline">
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.04}>
              <li className="border-b border-hairline py-8">
                <p className="font-mono text-xs text-muted">
                  {post.date} · {post.readingMinutes} {t("minRead")}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {post.description}
                </p>
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                  className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-2"
                >
                  {t("readMore")}
                </Link>
              </li>
            </FadeUp>
          ))}
        </ul>
      )}
    </div>
  );
}
