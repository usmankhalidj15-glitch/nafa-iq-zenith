import { useSyncExternalStore, useCallback } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "nafaiq-app-theme";
const listeners = new Set<() => void>();
let current: Theme = readStored();

function readStored(): Theme {
  if (typeof window === "undefined") return "dark";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" ? "light" : "dark";
}

function setStore(theme: Theme) {
  current = theme;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * App theme (dark/light) shared across components and persisted to localStorage.
 * Scoped to the authenticated app — the landing page stays dark.
 */
export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => "dark" as Theme,
  );

  const setTheme = useCallback((t: Theme) => setStore(t), []);
  const toggleTheme = useCallback(
    () => setStore(current === "dark" ? "light" : "dark"),
    [],
  );

  return { theme, setTheme, toggleTheme };
}
