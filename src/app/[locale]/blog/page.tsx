import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
import { getAllPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("blogTitle"),
    description: t("blogDescription"),
    href: "/blog",
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = getAllPosts(locale);

  return (
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>

      {posts.length === 0 ? (
        <p className="mt-8 text-center text-muted">{t("empty")}</p>
      ) : (
        <ul className="mx-auto mt-4 grid max-w-4xl gap-4">
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.04}>
              <li className="card-surface rounded-xl p-6 transition-colors hover:bg-surface-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                  {post.date} · {post.readingMinutes} {t("minRead")}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {post.description}
                </p>
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                  className="mt-4 inline-block text-sm font-semibold text-primary"
                >
                  {t("readMore")} →
                </Link>
              </li>
            </FadeUp>
          ))}
        </ul>
      )}
    </PageWrap>
  );
}
