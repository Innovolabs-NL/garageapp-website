import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type LegalDoc = {
  slug: "privacy" | "terms";
  title: string;
  updated: string;
  locale: string;
  content: string;
};

const contentRoot = path.join(process.cwd(), "content", "legal");

export function getLegalDoc(
  locale: string,
  slug: "privacy" | "terms",
): LegalDoc | null {
  const file = path.join(contentRoot, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    updated: String(data.updated ?? ""),
    locale,
    content,
  };
}
