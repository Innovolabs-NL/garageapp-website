"use client";

import { useLayoutEffect } from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  type ColorTheme,
} from "@/lib/theme";

/** Re-applies stored theme after [locale] remounts `<html>` on language switch. */
export function ThemeRehydrate() {
  useLayoutEffect(() => {
    let theme: ColorTheme = "light";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        theme = stored;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "dark";
      }
    } catch {
      /* blocked storage */
    }
    applyTheme(theme);
  }, []);

  return null;
}
