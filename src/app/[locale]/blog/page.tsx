import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeUp } from "@/components/FadeUp";
import { PageHero, PageWrap } from "@/components/PageHero";
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
    <PageWrap>
      <FadeUp>
        <PageHero title={t("title")} intro={t("intro")} />
      </FadeUp>

      {posts.length === 0 ? (
        <p className="mt-8 text-muted">{t("empty")}</p>
      ) : (
        <ul className="mt-4 space-y-0 border-t border-hairline">
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.04}>
              <li className="border-b border-hairline py-9">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {post.date} · {post.readingMinutes} {t("minRead")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-body">
                  {post.description}
                </p>
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                  className="mt-4 inline-block text-sm font-bold text-primary"
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
