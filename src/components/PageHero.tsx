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
    <header className="max-w-3xl pb-12 pt-14 sm:pb-16 sm:pt-20">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-5 font-display text-4xl font-bold tracking-[-0.02em] text-foreground sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
    </header>
  );
}

export function PageWrap({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
  );
}
