import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-extrabold tracking-tight text-white">
            GarageApp
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {t("tagline")}
          </p>
          <p className="mt-6 text-xs text-white/40">
            © {year} Innovolabs. {t("rights")}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {t("product")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/features" className="hover:text-white">
                {nav("features")}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                {nav("pricing")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                {nav("blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {t("company")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/about" className="hover:text-white">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                {nav("contact")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                {nav("privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
