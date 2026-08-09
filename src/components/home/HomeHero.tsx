"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HomeHero() {
  const t = useTranslations("Home");
  const flow = [t("flow1"), t("flow2"), t("flow3"), t("flow4"), t("flow5")];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-14 sm:px-6 sm:pt-32 sm:pb-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.p variants={fadeUp} className="eyebrow">
            {t("badge")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-8 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground"
          >
            {t("headlineStart")}{" "}
            <span className="marker">{t("headlineMark")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed sm:text-xl"
          >
            {t("subhead")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              {t("ctaPrimary")}
            </Link>
            <Link href="/features" className="btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rule border-b border-border"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 py-5 sm:gap-x-4">
            {flow.map((stage, i) => (
              <li key={stage} className="flex items-center gap-3 sm:gap-4">
                <span className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  <span className="mr-2 text-subtle">0{i + 1}</span>
                  {stage}
                </span>
                {i < flow.length - 1 ? (
                  <ArrowRight size={14} className="text-accent" aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
