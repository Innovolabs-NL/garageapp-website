import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Car,
  ClipboardCheck,
  FileSignature,
  Receipt,
  Wrench,
} from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeBayBoard } from "@/components/home/HomeBayBoard";
import { HomeCta } from "@/components/home/HomeCta";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    locale,
    title: t("homeTitle"),
    description: t("homeDescription"),
    href: "/",
  });
}

const stepIcons = [Wrench, FileSignature, Receipt] as const;
const roleIcons = [Car, Wrench, ClipboardCheck] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const roles = [
    { title: t("roleBackTitle"), body: t("roleBackBody"), Icon: roleIcons[0] },
    { title: t("roleTechTitle"), body: t("roleTechBody"), Icon: roleIcons[1] },
    { title: t("roleCustTitle"), body: t("roleCustBody"), Icon: roleIcons[2] },
  ] as const;

  return (
    <>
      <HomeHero />
      <HomeBayBoard />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <p className="eyebrow">{t("howTitle")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
              {t("howSub")}
            </h2>
          </FadeUp>

          <ol className="mt-14">
            {(
              [
                ["step1Title", "step1Body"],
                ["step2Title", "step2Body"],
                ["step3Title", "step3Body"],
              ] as const
            ).map(([titleKey, bodyKey], i) => {
              const Icon = stepIcons[i];
              return (
                <FadeUp key={titleKey} delay={i * 0.05}>
                  <li className="rule grid gap-4 py-9 md:grid-cols-[7rem_18rem_1fr] md:gap-8">
                    <div className="flex items-center gap-3 md:block">
                      <p className="font-display text-4xl font-bold leading-none text-subtle sm:text-5xl">
                        0{i + 1}
                      </p>
                      <span className="icon-bay md:mt-4">
                        <Icon size={18} aria-hidden />
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {t(titleKey)}
                    </h3>
                    <p className="max-w-xl text-base leading-relaxed">{t(bodyKey)}</p>
                  </li>
                </FadeUp>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <p className="eyebrow">{t("rolesEyebrow")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
              {t("rolesFocus")}
            </h2>
            <p className="mt-5 max-w-xl text-lg">{t("rolesSub")}</p>
          </FadeUp>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {roles.map((role, i) => (
              <FadeUp key={role.title} delay={i * 0.05}>
                <article className="rule pt-6">
                  <span className="icon-bay">
                    <role.Icon size={18} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed">{role.body}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <p className="eyebrow">{t("portalEyebrow")}</p>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
              {t("portalTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed">{t("portalBody")}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src={siteConfig.images.floor}
              alt={t("portalImageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </FadeUp>
        </div>
      </section>

      <HomeCta />
    </>
  );
}
