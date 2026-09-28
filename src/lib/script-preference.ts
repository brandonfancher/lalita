"use client";

import { useSyncExternalStore } from "react";

import { refitAll } from "@/lib/use-fit-text";

/**
 * Which script(s) the verse is shown in, remembered across the whole site.
 *
 * Like the theme, the choice lives on `<html data-script>`: the pre-paint
 * script in the root layout restores it before the page is drawn, and CSS
 * (the `script-*` variants) shows or hides each row from that attribute, so a
 * freshly loaded page never flashes the wrong script. No attribute means both.
 */
export type ScriptMode = "both" | "deva" | "iast";

export const SCRIPT_STORAGE_KEY = "script";

const listeners = new Set<() => void>();

function parse(value: string | null | undefined): ScriptMode {
  return value === "deva" || value === "iast" ? value : "both";
}

function getScript(): ScriptMode {
  return parse(document.documentElement.dataset.script);
}

function apply(next: ScriptMode) {
  document.documentElement.dataset.script = next;
  // Rows that change size or reappear need their words refitted.
  refitAll();
  for (const listener of listeners) listener();
}

export function setScript(next: ScriptMode) {
  apply(next);
  try {
    localStorage.setItem(SCRIPT_STORAGE_KEY, next);
  } catch {}
}

// Keeps other open tabs in step, e.g. shlokas opened from the practice page.
function onStorage(e: StorageEvent) {
  if (e.key === SCRIPT_STORAGE_KEY) apply(parse(e.newValue));
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function useScript(): ScriptMode {
  return useSyncExternalStore(subscribe, getScript, () => "both");
}
