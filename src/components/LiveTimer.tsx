"use client";

import { useEffect, useRef, useState } from "react";

/** Start offset: 1h 42m 8s — looks like a job already in progress. */
const START_SECONDS = 1 * 3600 + 42 * 60 + 8;

function formatElapsed(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function LiveTimer({
  className,
  startSeconds = START_SECONDS,
}: {
  className?: string;
  startSeconds?: number;
}) {
  const [seconds, setSeconds] = useState(startSeconds);
  const ref = useRef<HTMLParagraphElement>(null);
  const running = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        running.current = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    const id = window.setInterval(() => {
      if (!running.current) return;
      setSeconds((n) => n + 1);
    }, 1000);

    return () => {
      observer.disconnect();
      window.clearInterval(id);
    };
  }, []);

  return (
    <p
      ref={ref}
      className={className}
      aria-live="off"
      aria-label={`Timer ${formatElapsed(seconds)}`}
    >
      {formatElapsed(seconds)}
    </p>
  );
}
