import type { ReactNode } from "react";

/** Root shell — html/body live in [locale]/layout for correct lang. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
