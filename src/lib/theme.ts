export type ColorTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "motivox.website.theme";

/** Runs before paint to avoid a theme flash. */
export const THEME_BOOT_SCRIPT = `(function(){var t="light";try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(s==="light"||s==="dark")t=s;else if(window.matchMedia("(prefers-color-scheme: dark)").matches)t="dark";}catch(e){}document.documentElement.dataset.theme=t;})();`;

const listeners = new Set<() => void>();

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function applyTheme(theme: ColorTheme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* blocked storage */
  }
  listeners.forEach((listener) => listener());
}

export function currentTheme(): ColorTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
