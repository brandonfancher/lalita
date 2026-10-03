"use client";

import { setWordBreaks, useWordBreaks } from "@/lib/script-preference";

/**
 * Breaks the long compounds into their words with hyphens, in both scripts,
 * everywhere on the site. Like the script toggle, its look follows
 * `<html data-word-breaks>` through CSS so it is right before hydration.
 */
export function WordBreakToggle() {
  const on = useWordBreaks();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setWordBreaks(!on)}
      title="Show hyphens between the words of each compound"
      className="inline-flex rounded-md border border-line bg-surface-1/60 p-0.5 font-sans text-xs text-ink-muted transition-colors hover:text-ink word-breaks:text-ink"
    >
      <span className="flex items-center gap-2 rounded py-1 pl-2 pr-3">
        <span
          aria-hidden
          className="relative h-3.5 w-6 shrink-0 rounded-full bg-line-strong transition-colors word-breaks:bg-sindura"
        >
          <span className="absolute left-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-surface-0 shadow-sm transition-transform word-breaks:translate-x-2.5" />
        </span>
        Word breaks
      </span>
    </button>
  );
}
