"use client";

import { useCallback } from "react";

/**
 * Shrinks text so it never has to break inside a word.
 *
 * Sanskrit names are long single words, and on a phone they are often wider
 * than the screen. Rather than letting them wrap mid-word, fitted elements keep
 * their designed size where there is room and scale down just enough where
 * there isn't.
 *
 * - `line`: the whole element stays on one line.
 * - `words`: lines may still wrap between words, but the widest word (any
 *   descendant marked `data-fit-word`) must fit on a line by itself.
 *
 * Width is measured against the element itself, or with `container: "marker"`
 * against its closest `[data-fit-container]` ancestor, for inline items that
 * share a wrapping row with other things.
 */

type Mode = "line" | "words";
type ContainerMode = "self" | "marker";

const MIN_SCALE = 0.5;

const fitted = new Map<HTMLElement, { mode: Mode; container: HTMLElement }>();
const byContainer = new Map<HTMLElement, Set<HTMLElement>>();
const lastWidth = new WeakMap<HTMLElement, number>();
const queue = new Set<HTMLElement>();
let observer: ResizeObserver | null = null;
let frame = 0;
let fontsHooked = false;

function contentWidth(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
}

// Measured from the rendered text rather than `scrollWidth`, which is 0 for
// inline elements. An element fitted against a separate container also brings
// its own padding and border, as a chip or pill does.
function naturalWidth(el: HTMLElement, mode: Mode, container: HTMLElement): number {
  if (mode === "line") {
    const range = document.createRange();
    range.selectNodeContents(el);
    let width = range.getBoundingClientRect().width;
    if (container !== el) {
      const cs = getComputedStyle(el);
      if (cs.display !== "inline") {
        width +=
          parseFloat(cs.paddingLeft) +
          parseFloat(cs.paddingRight) +
          parseFloat(cs.borderLeftWidth) +
          parseFloat(cs.borderRightWidth);
      }
    }
    return width;
  }
  let widest = 0;
  for (const word of el.querySelectorAll<HTMLElement>("[data-fit-word]")) {
    widest = Math.max(widest, word.getBoundingClientRect().width);
  }
  return widest;
}

// Reads and writes are batched across every fitted element so a page with a
// thousand names costs a couple of layouts, not a thousand.
function flush() {
  frame = 0;
  const els = [...queue].filter((el) => el.isConnected && fitted.has(el));
  queue.clear();

  for (const el of els) el.style.fontSize = "";

  const sizes = els.map((el) => {
    const { mode, container } = fitted.get(el)!;
    const natural = naturalWidth(el, mode, container);
    const available = contentWidth(container);
    if (!natural || !available || natural <= available) return null;
    const base = parseFloat(getComputedStyle(el).fontSize);
    const scale = Math.max(MIN_SCALE, (available / natural) * 0.98);
    return `${Math.floor(base * scale * 10) / 10}px`;
  });

  els.forEach((el, i) => {
    const size = sizes[i];
    if (size) el.style.fontSize = size;
  });
}

function schedule(els: Iterable<HTMLElement>) {
  for (const el of els) queue.add(el);
  if (!frame) frame = requestAnimationFrame(flush);
}

/** Refit everything, for changes made outside React such as a page-wide class or attribute. */
export function refitAll() {
  schedule(fitted.keys());
}

function getObserver(): ResizeObserver {
  if (!observer) {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const container = entry.target as HTMLElement;
        const width = entry.contentRect.width;
        if (lastWidth.get(container) === width) continue;
        lastWidth.set(container, width);
        const els = byContainer.get(container);
        if (els) schedule(els);
      }
    });
  }
  if (!fontsHooked && document.fonts) {
    fontsHooked = true;
    void document.fonts.ready.then(refitAll);
    document.fonts.addEventListener("loadingdone", refitAll);
  }
  return observer;
}

function register(el: HTMLElement, mode: Mode, containerMode: ContainerMode) {
  const container =
    containerMode === "marker"
      ? (el.parentElement?.closest<HTMLElement>("[data-fit-container]") ?? el)
      : el;

  fitted.set(el, { mode, container });
  let set = byContainer.get(container);
  if (!set) {
    set = new Set();
    byContainer.set(container, set);
    getObserver().observe(container);
  }
  set.add(el);
  schedule([el]);
}

function unregister(el: HTMLElement) {
  const entry = fitted.get(el);
  if (!entry) return;
  fitted.delete(el);
  queue.delete(el);
  const set = byContainer.get(entry.container);
  set?.delete(el);
  if (set && set.size === 0) {
    byContainer.delete(entry.container);
    observer?.unobserve(entry.container);
  }
}

/**
 * Returns a ref that keeps the element's text within its width. Pass the
 * displayed text as `content` so the fit is redone when it changes.
 */
export function useFitText({
  mode = "line",
  container = "self",
  content,
}: {
  mode?: Mode;
  container?: ContainerMode;
  content?: unknown;
} = {}) {
  return useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      register(el, mode, container);
      return () => unregister(el);
    },
    // `content` is a trigger only: a new ref callback re-registers the element.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, container, content],
  );
}
