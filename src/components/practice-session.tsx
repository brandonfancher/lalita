"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import { ChantBar } from "@/components/chant-bar";
import { FitText } from "@/components/fit-text";
import { ScriptToggle } from "@/components/script-toggle";
import type { ChantTiming } from "@/lib/types";
import { cn, practiceLabel } from "@/lib/utils";

const MIN = 0;
const MAX = 182;

export type PracticeToken = {
  id: string;
  deva: string;
  iast: string;
  /** Nama (or dhyāna word) glosses for this written form. */
  glosses?: string[];
};

export type PracticeVerse = {
  id: string;
  number: number;
  /** A miniature of the shloka's artwork, when it has one. */
  art?: ReactNode;
  lines: { tokens: PracticeToken[] }[];
};

/**
 * Sized so the art never makes a card taller. On phones the verse fills the
 * width, so the art stands softened behind it at the card's full height; wider,
 * it floats beside a two-line verse in each script.
 */
const ART_WIDTH =
  "sm:script-both:w-[5.5rem] md:script-both:w-[7.5rem] sm:script-deva:w-[5.375rem] sm:script-iast:w-[3.75rem]";

export function PracticeSession({
  from,
  to,
  verses,
  timing,
  playerLabel,
}: {
  from: number;
  to: number;
  verses: PracticeVerse[];
  timing?: ChantTiming;
  playerLabel: string;
}) {
  const router = useRouter();
  const [fromInput, setFromInput] = useState(String(from));
  const [toInput, setToInput] = useState(String(to));
  /** Token whose gloss is pinned open (tap / keyboard). Token ids are only unique within a verse. */
  const [activeToken, setActiveToken] = useState<{ verseId: string; tokenId: string } | null>(null);

  useEffect(() => {
    setFromInput(String(from));
    setToInput(String(to));
  }, [from, to]);

  useEffect(() => {
    setActiveToken(null);
  }, [from, to]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const nextFrom = clampNumber(fromInput, MIN, MAX, from);
    const nextTo = clampNumber(toInput, MIN, MAX, to);
    const start = Math.min(nextFrom, nextTo);
    const end = Math.max(nextFrom, nextTo);
    setFromInput(String(start));
    setToInput(String(end));
    router.push(`/practice?from=${start}&to=${end}`);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={submit}
        className="flex flex-wrap items-end gap-3 rounded-sm border border-line bg-surface-1/60 p-4 font-sans"
      >
        <label className="eyebrow flex flex-col gap-1.5 text-ink-faint">
          From
          <input
            type="number"
            min={MIN}
            max={MAX}
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            className="w-24 rounded-sm border border-line-strong bg-surface-0 px-3 py-2 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-sindura/60"
          />
        </label>
        <label className="eyebrow flex flex-col gap-1.5 text-ink-faint">
          To
          <input
            type="number"
            min={MIN}
            max={MAX}
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            className="w-24 rounded-sm border border-line-strong bg-surface-0 px-3 py-2 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-sindura/60"
          />
        </label>
        <button
          type="submit"
          className="rounded-sm bg-sindura px-4 py-2 text-sm font-medium tracking-wide text-on-sindura shadow-sm transition-transform active:scale-95"
        >
          Practice
        </button>
        <p className="w-full font-serif text-[15px] italic text-ink-faint sm:ml-auto sm:w-auto sm:self-center">
          0 is the dhyāna (Shloka 0). Range is inclusive, up to 182.
        </p>
      </form>

      <ChantBar timing={timing} label={playerLabel} defaultLoop />

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <ScriptToggle />
          <span className="ml-auto text-[15px] italic text-ink-faint">
            Hover or tap a name for its gloss
          </span>
        </div>

        <div className="space-y-3">
          {verses.map((verse) => (
            <PracticeVerseCard
              key={verse.id}
              verse={verse}
              activeTokenId={activeToken?.verseId === verse.id ? activeToken.tokenId : null}
              onToggleToken={(tokenId) => setActiveToken(tokenId ? { verseId: verse.id, tokenId } : null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PracticeVerseCard({
  verse,
  activeTokenId,
  onToggleToken,
}: {
  verse: PracticeVerse;
  activeTokenId: string | null;
  onToggleToken: (id: string | null) => void;
}) {
  const title = practiceLabel(verse.number);
  const activeGlosses = useMemo(() => {
    if (!activeTokenId) return null;
    for (const line of verse.lines) {
      const token = line.tokens.find((t) => t.id === activeTokenId);
      if (token?.glosses?.length) return token.glosses;
    }
    return null;
  }, [activeTokenId, verse.lines]);

  return (
    <article className="folio isolate flow-root rounded-sm px-5 py-4 sm:px-7 sm:py-5">
      {verse.art && (
        <div
          className={cn(
            "pointer-events-none absolute right-2 top-2 -z-10 aspect-[2/3] h-[calc(100%-1rem)] max-h-[18rem] opacity-55",
            "sm:pointer-events-auto sm:static sm:float-right sm:mb-1 sm:ml-4 sm:aspect-auto sm:h-auto sm:max-h-none sm:opacity-100 md:ml-5",
            ART_WIDTH,
          )}
        >
          {verse.art}
        </div>
      )}
      <div className="mb-1.5">
        <a
          href={`/shloka/${verse.id}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-sindura transition-colors hover:text-sindura-soft"
        >
          <span className="eyebrow text-inherit">{title}</span>
          <ExternalLink
            size={13}
            className="shrink-0 text-ink-faint opacity-60 group-hover:opacity-100"
            aria-hidden
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <div className="space-y-1.5">
        {verse.lines.map((line, li) => (
          <div key={li} className="space-y-0.5">
            <FitText
              as="p"
              mode="words"
              fitKey={line.tokens.map((t) => t.id).join()}
              className="deva text-[1.4rem] leading-[1.75] text-ink script-iast:hidden sm:text-[1.65rem]"
            >
              {line.tokens.map((token) => (
                <GlossToken
                  key={`d-${token.id}`}
                  token={token}
                  text={token.deva}
                  active={activeTokenId === token.id}
                  onToggle={onToggleToken}
                />
              ))}
            </FitText>
            <FitText
              as="p"
              mode="words"
              fitKey={line.tokens.map((t) => t.id).join()}
              className={cn(
                "iast leading-snug script-deva:hidden",
                "script-both:text-[1rem] script-both:text-ink-muted sm:script-both:text-[1.05rem]",
                "script-iast:text-lg script-iast:text-ink sm:script-iast:text-xl",
              )}
            >
              {line.tokens.map((token) => (
                <GlossToken
                  key={`i-${token.id}`}
                  token={token}
                  text={token.iast}
                  active={activeTokenId === token.id}
                  onToggle={onToggleToken}
                />
              ))}
            </FitText>
          </div>
        ))}
      </div>

      {activeGlosses && (
        <p className="clear-both mt-2 border-t border-line pt-2 text-[15px] italic leading-snug text-ink-muted">
          {activeGlosses.join(" · ")}
        </p>
      )}
    </article>
  );
}

function GlossToken({
  token,
  text,
  active,
  onToggle,
}: {
  token: PracticeToken;
  text: string;
  active: boolean;
  onToggle: (id: string | null) => void;
}) {
  const glosses = token.glosses;
  const interactive = Boolean(glosses?.length);
  const label = glosses?.join(" · ");

  if (!interactive) {
    return (
      <>
        <span data-fit-word className="whitespace-nowrap">
          {text}
        </span>{" "}
      </>
    );
  }

  return (
    <>
      <span data-fit-word className="group/tok relative inline-block whitespace-nowrap">
        <span
          role="button"
          tabIndex={0}
          className="tappable"
          data-active={active}
          aria-label={`${text}: ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(active ? null : token.id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle(active ? null : token.id);
            }
          }}
        >
          {text}
        </span>
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-max max-w-[16rem] -translate-x-1/2 rounded-sm border border-line-strong bg-surface-0 px-2.5 py-1.5 text-left font-sans text-[12px] font-normal not-italic normal-case leading-snug tracking-normal text-ink shadow-lg",
            // Desktop: hover tip. Mobile: gloss pins under the verse instead.
            "hidden opacity-0 transition-opacity lg:block lg:group-hover/tok:opacity-100",
          )}
        >
          {label}
        </span>
      </span>{" "}
    </>
  );
}

function clampNumber(raw: string, min: number, max: number, fallback: number): number {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
