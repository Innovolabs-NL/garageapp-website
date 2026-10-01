import { useSyncExternalStore } from "react";

const HINT_COOKIE = "gm_signed_in";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return document.cookie.split("; ").some((c) => c.startsWith(`${HINT_COOKIE}=`));
}

/**
 * True when the Motivox app has set its non-sensitive "signed in" flag cookie.
 * Always false on the server and during hydration, so SSR markup stays stable.
 */
export function useSignedIn() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
