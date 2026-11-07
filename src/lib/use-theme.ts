"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * Reads the theme from <html data-theme>, which the inline script sets before
 * first paint. Subscribing to the attribute means canvas-based components can
 * re-resolve their colour when the theme flips, without copying state.
 */
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme | null {
  return null;
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
