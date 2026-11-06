"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  Suspense,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ExternalLink } from "lucide-react";

import { ChantBar } from "@/components/chant-bar";
import { FitText } from "@/components/fit-text";
import { HyphenatedText } from "@/components/hyphenated-text";
import { ScriptToggle } from "@/components/script-toggle";
import { WordBreakToggle } from "@/components/word-break-toggle";
import {
  CHANT_MAX,
  CHANT_MIN,
  clampShloka,
  rememberChantRange,
  resolveChantRange,
  type ChantRange,
} from "@/lib/chant-range";
import type { ChantTiming, Hyphenated } from "@/lib/types";
import { chantLabel, cn } from "@/lib/utils";

/** Miniatures for ranges loaded in the browser. The artwork comes in its own chunk, only when needed. */
const Miniature = dynamic(() => import("@/components/shloka-art").then((m) => m.ShlokaMiniature));

export type ChantToken = {
  id: string;
  deva: string;
  iast: string;
  hyphenated?: Hyphenated;
  /** Nama (or dhyāna word) glosses for this written form. */
  glosses?: string[];
};

export type ChantVerse = {
  id: string;
  number: number;
  /** Whether the shloka has artwork, shown beside it as a miniature. */
  hasArt: boolean;
  /** Where the shloka is in the recording. */
  timing?: ChantTiming;
  lines: { tokens: ChantToken[] }[];
};

type Shown = ChantRange & { verses: ChantVerse[] };

/** Each shloka is a static file, written at build time by `app/chant/verses/[file]/route.ts`. */
async function loadVerses({ from, to }: ChantRange): Promise<ChantVerse[]> {
  const ids = Array.from({ length: to - from + 1 }, (_, i) => String(from + i).padStart(3, "0"));
  return Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`/chant/verses/${id}.json`);
      if (!res.ok) throw new Error(`Shloka ${id} could not be loaded (${res.status}).`);
      return (await res.json()) as ChantVerse;
    }),
  );
}

/**
 * Sized so the art never makes a card taller. On phones the verse fills the
 * width, so the art stands softened behind it at the card's full height; wider,
 * it floats beside a two-line verse in each script.
 */
const ART_WIDTH =
  "sm:script-both:w-[5.5rem] md:script-both:w-[7.5rem] sm:script-deva:w-[5.375rem] sm:script-iast:w-[3.75rem]";

/**
 * The chant page's range, recording, and text. It starts with the range the
 * page was prerendered with, `initial`, whose miniatures come rendered in
 * `art`, then shows the range the URL or the remembered cookie asks for.
 */
export function ChantSession({ initial, art }: { initial: Shown; art: Record<string, ReactNode> }) {
  const router = useRouter();
  const [shown, setShown] = useState(initial);
  const [status, setStatus] = useState<"starting" | "loading" | "ready" | "error">("starting");
  const [fromInput, setFromInput] = useState(String(initial.from));
  const [toInput, setToInput] = useState(String(initial.to));
  /** Token whose gloss is pinned open (tap / keyboard). Token ids are only unique within a verse. */
  const [activeToken, setActiveToken] = useState<{ verseId: string; tokenId: string } | null>(null);
  const latest = useRef(0);

  const show = (range: ChantRange) => {
    setFromInput(String(range.from));
    setToInput(String(range.to));
    const request = ++latest.current;
    if (range.from === shown.from && range.to === shown.to) {
      setStatus("ready");
      return;
    }
    setStatus("loading");
    loadVerses(range).then(
      (verses) => {
        if (request !== latest.current) return;
        setShown({ ...range, verses });
        setActiveToken(null);
        setStatus("ready");
      },
      () => {
        if (request === latest.current) setStatus("error");
      },
    );
  };

  useEffect(() => {
    if (status === "ready") rememberChantRange({ from: shown.from, to: shown.to });
    if (status === "ready" || status === "error") delete document.documentElement.dataset.chantPending;
  }, [status, shown.from, shown.to]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const nextFrom = clampShloka(fromInput, shown.from);
    const nextTo = clampShloka(toInput, shown.to);
    const start = Math.min(nextFrom, nextTo);
    const end = Math.max(nextFrom, nextTo);
    setFromInput(String(start));
    setToInput(String(end));
    router.push(`/chant?from=${start}&to=${end}`);
  };

  const { from, to, verses } = shown;
  const first = verses[0]?.timing;
  const last = verses[verses.length - 1]?.timing;
  const timing = first && last ? { startSec: first.startSec, endSec: last.endSec } : undefined;
  const playerLabel = from === to ? chantLabel(from) : `${chantLabel(from)} – ${chantLabel(to)}`;

  return (
    <div data-chant-session className="space-y-8">
      <Suspense fallback={null}>
        <RangeFromUrl onRange={show} />
      </Suspense>

      <form
        onSubmit={submit}
        className="flex flex-wrap items-end gap-3 rounded-sm border border-line bg-surface-1/60 p-4 font-sans"
      >
        <label className="eyebrow flex flex-col gap-1.5 text-ink-faint">
          From
          <input
            type="number"
            min={CHANT_MIN}
            max={CHANT_MAX}
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            className="w-24 rounded-sm border border-line-strong bg-surface-0 px-3 py-2 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-sindura/60"
          />
        </label>
        <label className="eyebrow flex flex-col gap-1.5 text-ink-faint">
          To
          <input
            type="number"
            min={CHANT_MIN}
            max={CHANT_MAX}
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            className="w-24 rounded-sm border border-line-strong bg-surface-0 px-3 py-2 text-sm font-normal normal-case tracking-normal text-ink outline-none focus:border-sindura/60"
          />
        </label>
        <button
          type="submit"
          className="rounded-sm bg-sindura px-4 py-2 text-sm font-medium tracking-wide text-on-sindura shadow-sm transition-transform active:scale-95"
        >
          Chant
        </button>
        <p className="w-full font-serif text-[15px] italic text-ink-faint sm:ml-auto sm:w-auto sm:self-center">
          0 is the dhyāna (Shloka 0). Range is inclusive, up to 182.
        </p>
      </form>

      {status === "error" && (
        <p role="alert" className="text-[1.05rem] italic text-sindura">
          These shlokas could not be loaded. Please check your connection and try again.
        </p>
      )}

      <div data-loading={status === "loading" || undefined} aria-busy={status === "loading"} className="space-y-8">
        <ChantBar timing={timing} label={playerLabel} defaultLoop />

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <ScriptToggle />
              <WordBreakToggle />
            </div>
            <span className="ml-auto text-[15px] italic text-ink-faint">
              Hover or tap a name for its gloss
            </span>
          </div>

          <div className="space-y-3">
            {verses.map((verse) => (
              <ChantVerseCard
                key={verse.id}
                verse={verse}
                art={art[verse.id] ?? (verse.hasArt && <Miniature id={verse.id} className="w-full" />)}
                activeTokenId={activeToken?.verseId === verse.id ? activeToken.tokenId : null}
                onToggleToken={(tokenId) => setActiveToken(tokenId ? { verseId: verse.id, tokenId } : null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reports the range asked for, from the URL or else the cookie. The URL isn't
 * known while prerendering, so this sits in its own Suspense boundary, and it
 * reports before paint so a page reached by a link never shows the wrong range.
 */
function RangeFromUrl({ onRange }: { onRange: (range: ChantRange) => void }) {
  const params = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const report = useEffectEvent(onRange);

  useLayoutEffect(() => {
    report(resolveChantRange(from, to, document.cookie));
  }, [from, to]);

  return null;
}

function ChantVerseCard({
  verse,
  art,
  activeTokenId,
  onToggleToken,
}: {
  verse: ChantVerse;
  art: ReactNode;
  activeTokenId: string | null;
  onToggleToken: (id: string | null) => void;
}) {
  const title = chantLabel(verse.number);
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
      {art && (
        <div
          className={cn(
            "pointer-events-none absolute right-2 top-2 -z-10 aspect-[2/3] h-[calc(100%-1rem)] max-h-[18rem] opacity-55",
            "sm:pointer-events-auto sm:static sm:float-right sm:mb-1 sm:ml-4 sm:aspect-auto sm:h-auto sm:max-h-none sm:opacity-100 md:ml-5",
            ART_WIDTH,
          )}
        >
          {art}
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
                  kind="deva"
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
                  kind="iast"
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
  kind,
  active,
  onToggle,
}: {
  token: ChantToken;
  kind: "deva" | "iast";
  active: boolean;
  onToggle: (id: string | null) => void;
}) {
  const glosses = token.glosses;
  const interactive = Boolean(glosses?.length);
  const label = glosses?.join(" · ");
  const text = token[kind];
  const shown = <HyphenatedText text={text} hyphenated={token.hyphenated?.[kind]} />;

  if (!interactive) {
    return (
      <>
        <span data-fit-word className="whitespace-nowrap">
          {shown}
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
          {shown}
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
