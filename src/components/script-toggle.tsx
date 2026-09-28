"use client";

import { setScript, useScript, type ScriptMode } from "@/lib/script-preference";
import { cn } from "@/lib/utils";

// The highlight follows `<html data-script>` through CSS rather than React
// state, so it is right on first paint, before hydration.
const OPTIONS: { value: ScriptMode; label: string; className: string }[] = [
  {
    value: "both",
    label: "Both",
    className:
      "script-both:bg-surface-0 script-both:text-ink script-both:shadow-sm script-both:ring-1 script-both:ring-line",
  },
  {
    value: "deva",
    label: "देवनागरी",
    className:
      "deva py-0 text-[13px] script-deva:bg-surface-0 script-deva:text-ink script-deva:shadow-sm script-deva:ring-1 script-deva:ring-line",
  },
  {
    value: "iast",
    label: "Romanized",
    className:
      "script-iast:bg-surface-0 script-iast:text-ink script-iast:shadow-sm script-iast:ring-1 script-iast:ring-line",
  },
];

/** Chooses the script the verse is shown in, everywhere on the site. */
export function ScriptToggle() {
  const script = useScript();

  return (
    <div
      role="radiogroup"
      aria-label="Script"
      className="inline-flex rounded-md border border-line bg-surface-1/60 p-0.5 font-sans text-xs"
    >
      {OPTIONS.map(({ value, label, className }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={script === value}
          onClick={() => setScript(value)}
          className={cn(
            "rounded px-3 py-1 text-ink-muted transition-colors hover:text-ink",
            className,
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
