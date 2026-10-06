"use client";

import { useSyncExternalStore } from "react";

import { refitAll } from "@/lib/use-fit-text";

/**
 * How the verse is shown, remembered across the whole site: which script(s),
 * and whether the long compounds are broken into their words with hyphens.
 *
 * Like the theme, each choice lives on `<html>` (`data-script`,
 * `data-word-breaks`): the pre-paint script in the root layout restores it
 * before the page is drawn, and CSS shows or hides each form from that
 * attribute, so a freshly loaded page never flashes the wrong one. No script
 * attribute means both; no word-breaks attribute means unbroken.
 */
export type ScriptMode = "both" | "deva" | "iast";

export const SCRIPT_STORAGE_KEY = "script";
export const WORD_BREAKS_STORAGE_KEY = "word-breaks";

const listeners = new Set<() => void>();

function parse(value: string | null | undefined): ScriptMode {
  return value === "deva" || value === "iast" ? value : "both";
}

function getScript(): ScriptMode {
  return parse(document.documentElement.dataset.script);
}

function getWordBreaks(): boolean {
  return document.documentElement.dataset.wordBreaks === "on";
}

function applyScript(next: ScriptMode) {
  document.documentElement.dataset.script = next;
  changed();
}

function applyWordBreaks(on: boolean) {
  if (on) document.documentElement.dataset.wordBreaks = "on";
  else delete document.documentElement.dataset.wordBreaks;
  changed();
}

function changed() {
  // Rows that change size or reappear need their words refitted.
  refitAll();
  for (const listener of listeners) listener();
}

function remember(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function setScript(next: ScriptMode) {
  applyScript(next);
  remember(SCRIPT_STORAGE_KEY, next);
}

export function setWordBreaks(on: boolean) {
  applyWordBreaks(on);
  remember(WORD_BREAKS_STORAGE_KEY, on ? "on" : "off");
}

// Keeps other open tabs in step, e.g. shlokas opened from the chant page.
function onStorage(e: StorageEvent) {
  if (e.key === SCRIPT_STORAGE_KEY) applyScript(parse(e.newValue));
  if (e.key === WORD_BREAKS_STORAGE_KEY) applyWordBreaks(e.newValue === "on");
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

export function useWordBreaks(): boolean {
  return useSyncExternalStore(subscribe, getWordBreaks, () => false);
}
