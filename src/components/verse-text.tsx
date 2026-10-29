"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import type { SpelledText } from "@/lib/transliterate";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "verse-spelling";

/**
 * The verse as plain text, to copy, print, or read in another script.
 *
 * Every spelling is in the page from the start, so a search for the verse in
 * any of them finds it; the reader's choice of script is remembered.
 */
export function VerseText({
  spellings,
  source,
  className,
}: {
  spellings: SpelledText[];
  /** Appended to whatever is copied, so a pasted verse can be traced back. */
  source: string;
  className?: string;
}) {
  const [main, others] = [spellings.slice(0, 2), spellings.slice(2)];
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a choice only the browser knows
    if (saved && spellings.some((s) => s.id === saved)) setChosen(saved);
  }, [spellings]);

  const choose = (id: string) => {
    const next = chosen === id ? null : id;
    setChosen(next);
    if (next) localStorage.setItem(STORAGE_KEY, next);
    else localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {main.map((s) => (
        <Block key={s.id} spelling={s} source={source} />
      ))}

      <div>
        <p className="eyebrow mb-2 text-ink-faint">Read it in</p>
        <div role="group" aria-label="Other scripts and spellings" className="flex flex-wrap gap-1.5 font-sans">
          {others.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => choose(s.id)}
              aria-pressed={chosen === s.id}
              aria-controls={`spelling-${s.id}`}
              className={cn(
                "inline-flex items-baseline gap-1.5 rounded-full border px-3 py-1 text-[13px] transition-colors",
                chosen === s.id
                  ? "border-sindura bg-sindura text-on-sindura"
                  : "border-line-strong text-ink-muted hover:bg-surface-1 hover:text-ink",
              )}
            >
              {s.native && (
                <span lang={s.lang} className="text-[14px]">
                  {s.native}
                </span>
              )}
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {others.map((s) => (
        <Block key={s.id} id={`spelling-${s.id}`} spelling={s} source={source} hidden={chosen !== s.id} />
      ))}
    </div>
  );
}

function Block({
  spelling,
  source,
  id,
  hidden,
}: {
  spelling: SpelledText;
  source: string;
  id?: string;
  hidden?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${spelling.text}\n\n${source}`);
      setCopied(true);
    } catch {
      // Clipboard refused; the text is selectable.
    }
  };

  return (
    <figure id={id} hidden={hidden} className="rounded-sm border border-line bg-surface-1/40 px-4 py-3 sm:px-5">
      <figcaption className="mb-1.5 flex items-center justify-between gap-3">
        <span className="eyebrow text-ink-faint">{spelling.label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-sans text-[12px] text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
        >
          {copied ? <Check size={13} aria-hidden className="text-leaf" /> : <Copy size={13} aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <p
        lang={spelling.lang}
        className={cn(
          "whitespace-pre-line leading-relaxed text-ink",
          spelling.id === "deva" ? "deva text-[1.3rem]" : spelling.lang === "sa-Latn" ? "iast text-[1.1rem]" : "text-[1.15rem]",
        )}
      >
        {spelling.text}
      </p>
      {spelling.note && <p className="mt-2 text-[14px] italic leading-snug text-ink-faint">{spelling.note}</p>}
    </figure>
  );
}
