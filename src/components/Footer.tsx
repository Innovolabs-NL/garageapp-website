import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-semibold text-ink">
            GarageApp
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-body">
            {t("tagline")}
          </p>
          <p className="mt-4 text-xs text-muted">
            © {year} Innovolabs. {t("rights")}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t("product")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/features" className="hover:text-ink">
                {nav("features")}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-ink">
                {nav("pricing")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-ink">
                {nav("blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t("company")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-ink">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-ink">
                {nav("contact")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-ink">
                {nav("privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
