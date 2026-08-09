import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="brand-mark h-8 w-8 text-sm" aria-hidden>
              G
            </span>
            <p className="font-display text-[1.05rem] font-semibold tracking-tight text-foreground">
              GarageApp
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {t("tagline")}
          </p>
          <p className="mt-6 text-xs text-subtle">
            © {year} Innovolabs. {t("rights")}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
            {t("product")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/features" className="transition-colors hover:text-foreground">
                {nav("features")}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition-colors hover:text-foreground">
                {nav("pricing")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-foreground">
                {nav("blog")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
            {t("company")}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/about" className="transition-colors hover:text-foreground">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-foreground">
                {nav("contact")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition-colors hover:text-foreground">
                {nav("privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
