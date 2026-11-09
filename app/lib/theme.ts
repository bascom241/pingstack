"use client";

import { useSyncExternalStore } from "react";

export type ThemePreference = "system" | "light" | "dark";
const key = "pingstack-theme";
const eventName = "pingstack-theme-change";
const query = "(prefers-color-scheme: dark)";
const validPreference = (value: string | null | undefined): ThemePreference => value === "light" || value === "dark" ? value : "system";

function applyTheme(preference: ThemePreference) {
  const theme = preference === "system" ? (window.matchMedia(query).matches ? "dark" : "light") : preference;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  const onSystemChange = () => {
    const preference = validPreference(document.documentElement.dataset.themePreference);
    if (preference === "system") { applyTheme(preference); callback(); }
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) { applyTheme(validPreference(event.newValue)); callback(); }
  };
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystemChange);
  // Resolve system changes that happened before hydration attached the listener.
  applyTheme(validPreference(document.documentElement.dataset.themePreference));
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystemChange);
  };
}

const snapshot = () => `${validPreference(document.documentElement.dataset.themePreference)}:${document.documentElement.dataset.theme || "light"}`;
const serverSnapshot = () => "system:light";

export function useTheme() {
  const state = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [preference, resolvedTheme] = state.split(":") as [ThemePreference, "light" | "dark"];
  function setPreference(next: ThemePreference) {
    applyTheme(next);
    try { localStorage.setItem(key, next); } catch { /* The current session still works without storage. */ }
    window.dispatchEvent(new Event(eventName));
  }
  return { preference, resolvedTheme, setPreference };
}
