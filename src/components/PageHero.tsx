import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="max-w-3xl pb-10 pt-10 sm:pb-16 sm:pt-20">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-5 font-display text-[clamp(2rem,8vw,3.75rem)] font-bold tracking-[-0.02em] text-foreground sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">{intro}</p>
    </header>
  );
}

export function PageWrap({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
  );
}
