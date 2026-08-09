"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import {
  applyTheme,
  currentTheme,
  subscribeTheme,
  type ColorTheme,
} from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore<ColorTheme>(
    subscribeTheme,
    currentTheme,
    () => "light",
  );

  function toggle() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
