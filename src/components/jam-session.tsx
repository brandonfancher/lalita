"use client";

import { useRef, useState, type ReactNode } from "react";
import { ExternalLink, Play, X } from "lucide-react";

import { FitText } from "@/components/fit-text";
import { HyphenatedText } from "@/components/hyphenated-text";
import { ScriptToggle } from "@/components/script-toggle";
import { WordBreakToggle } from "@/components/word-break-toggle";
import type { Hyphenated } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

export type JamNama = { index: number; deva: string; iast: string; gloss: string; moduleId: string };

export type JamToken = {
  /** Unique on the page. */
  id: string;
  deva: string;
  iast: string;
  hyphenated?: Hyphenated;
  /** The names this written word carries; empty for a word that is not one of them. */
  namas: JamNama[];
  /** The meaning of a word that is not one of the names. */
  gloss?: string;
};

export type JamStanza = {
  key: string;
  moduleId: string;
  number: number;
  subtitle?: string;
  /** The names actually sung, which can be fewer than the shloka holds. */
  namaRange: [number, number];
  lines: { tokens: JamToken[] }[];
};

/** `startSec` is where the section begins in the video. */
export type JamSection =
  | { kind: "verse"; label: string; startSec: number; stanzas: JamStanza[] }
  | { kind: "chorus" | "tag"; label: string; startSec: number; words: JamToken[] };

export type JamVideo = {
  youtubeId: string;
  title: string;
  artist: string;
  artistUrl: string;
  occasion: string;
};

type Align = "start" | "center" | "end";
type Seek = (sec: number) => void;

const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";

const namaHref = (n: JamNama) => `/shloka/${n.moduleId}#nama-${n.index}`;

const glossesOf = (t: JamToken): string[] =>
  t.namas.length > 0 ? t.namas.map((n) => n.gloss) : t.gloss ? [t.gloss] : [];

const findToken = (tokens: JamToken[], id: string | null) =>
  id ? (tokens.find((t) => t.id === id) ?? null) : null;

const VERSE_DEVA = "deva text-[1.4rem] leading-[1.75] text-ink script-iast:hidden sm:text-[1.65rem]";
const VERSE_IAST = cn(
  "iast leading-snug script-deva:hidden",
  "script-both:text-[1rem] script-both:text-ink-muted sm:script-both:text-[1.05rem]",
  "script-iast:text-lg script-iast:text-ink sm:script-iast:text-xl",
);

export function JamSession({ video, sections }: { video: JamVideo; sections: JamSection[] }) {
  /** Token whose gloss is pinned open by a tap. */
  const [activeId, setActiveId] = useState<string | null>(null);
  const [meanings, setMeanings] = useState(true);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // The embed's own message protocol (enabled by `enablejsapi=1`), which spares
  // loading YouTube's iframe API script.
  const seek: Seek = (sec) => {
    const player = playerRef.current?.contentWindow;
    const send = (func: string, args: unknown[] = []) =>
      player?.postMessage(JSON.stringify({ event: "command", func, args }), PLAYER_ORIGIN);
    send("seekTo", [sec, true]);
    send("playVideo");
  };

  return (
    <div>
      <figure className="mb-10">
        <div className="folio rounded-sm p-2 sm:p-2.5">
          <div className="relative aspect-video overflow-hidden rounded-[1px] bg-surface-3">
            <iframe
              ref={playerRef}
              src={`${PLAYER_ORIGIN}/embed/${video.youtubeId}?rel=0&enablejsapi=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 text-[15px] italic text-ink-faint">
          <span>
            Sung by{" "}
            <a
              href={video.artistUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-sindura"
            >
              {video.artist}
            </a>{" "}
            on {video.occasion}.
          </span>
          <a
            href={`https://youtu.be/${video.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 not-italic text-sindura transition-colors hover:text-sindura-soft"
          >
            <span className="eyebrow text-inherit">Watch on YouTube</span>
            <ExternalLink size={12} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>

      <div className="z-30 -mx-4 mb-6 border-b border-line bg-surface-0/85 px-4 py-3 backdrop-blur-xl sm:sticky sm:top-0 sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <ScriptToggle />
            <WordBreakToggle />
            <MeaningsToggle on={meanings} onChange={setMeanings} />
          </div>
          <span className="ml-auto text-[15px] italic text-ink-faint">
            Hover or tap a name for its meaning
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {sections.map((section) =>
          section.kind === "verse" ? (
            <section
              key={section.label}
              aria-label={section.label}
              className="folio rounded-sm px-5 py-4 sm:px-7 sm:py-5"
            >
              <SectionHeader section={section} youtubeId={video.youtubeId} seek={seek} />
              <div className="divide-y divide-line">
                {section.stanzas.map((stanza) => (
                  <Stanza
                    key={stanza.key}
                    stanza={stanza}
                    meanings={meanings}
                    activeId={activeId}
                    onToggle={setActiveId}
                  />
                ))}
              </div>
            </section>
          ) : (
            <Refrain
              key={section.label}
              section={section}
              header={
                <SectionHeader section={section} youtubeId={video.youtubeId} seek={seek} centered />
              }
              meanings={meanings}
              activeId={activeId}
              onToggle={setActiveId}
            />
          ),
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  section,
  youtubeId,
  seek,
  centered = false,
}: {
  section: JamSection;
  youtubeId: string;
  seek: Seek;
  centered?: boolean;
}) {
  const time = formatTime(section.startSec);
  const pill =
    "inline-flex shrink-0 items-center gap-1.5 rounded-full border py-1 pl-2 pr-2.5 font-sans text-xs tabular-nums";

  return (
    <div className="mb-3 flex items-center gap-3">
      {centered && (
        <>
          {/* Balances the play button so the label stays centred. */}
          <span aria-hidden className={cn(pill, "invisible")}>
            <Play size={10} />
            {time}
          </span>
          <span aria-hidden className="h-px flex-1 bg-gold/40" />
        </>
      )}
      <h2 className="display text-[1.35rem] italic leading-none text-ink">{section.label}</h2>
      <span aria-hidden className="h-px flex-1 bg-gold/40" />
      <a
        href={`https://youtu.be/${youtubeId}?t=${section.startSec}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          seek(section.startSec);
        }}
        aria-label={`Play the ${section.label.toLowerCase()} from ${time}`}
        title={`Play from ${time} in the video`}
        className={cn(
          pill,
          "border-line-strong bg-surface-0/70 text-ink-muted transition-colors hover:border-sindura/50 hover:text-sindura",
        )}
      >
        <Play size={10} className="fill-current" aria-hidden />
        {time}
      </a>
    </div>
  );
}

function Stanza({
  stanza,
  meanings,
  activeId,
  onToggle,
}: {
  stanza: JamStanza;
  meanings: boolean;
  activeId: string | null;
  onToggle: (id: string | null) => void;
}) {
  const [first, last] = stanza.namaRange;
  const active = findToken(
    stanza.lines.flatMap((l) => l.tokens),
    activeId,
  );

  return (
    <div className="py-4 first:pt-1 last:pb-1">
      <p className="mb-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <a
          href={`/shloka/${stanza.moduleId}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-sindura transition-colors hover:text-sindura-soft"
        >
          <span className="eyebrow text-inherit">
            Shloka {stanza.number} &middot; Names {first}&ndash;{last}
          </span>
          <ExternalLink
            size={13}
            className="shrink-0 text-ink-faint opacity-60 group-hover:opacity-100"
            aria-hidden
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {stanza.subtitle && (
          <span className="text-[15px] italic leading-snug text-ink-faint">{stanza.subtitle}</span>
        )}
      </p>

      <div className="space-y-2">
        {stanza.lines.map((line, li) => {
          const fitKey = line.tokens.map((t) => t.id).join();
          const align = (i: number): Align =>
            i === 0 ? "start" : i === line.tokens.length - 1 ? "end" : "center";
          return (
            <div key={li}>
              <FitText as="p" mode="words" fitKey={fitKey} className={VERSE_DEVA}>
                {line.tokens.map((token, i) => (
                  <WordToken
                    key={`d-${token.id}`}
                    token={token}
                    kind="deva"
                    align={align(i)}
                    active={activeId === token.id}
                    onToggle={onToggle}
                  />
                ))}
              </FitText>
              <FitText as="p" mode="words" fitKey={fitKey} className={VERSE_IAST}>
                {line.tokens.map((token, i) => (
                  <WordToken
                    key={`i-${token.id}`}
                    token={token}
                    kind="iast"
                    align={align(i)}
                    active={activeId === token.id}
                    onToggle={onToggle}
                  />
                ))}
              </FitText>
              {meanings && (
                <p className="mt-0.5 text-[15px] italic leading-snug text-gold-soft">
                  {line.tokens.flatMap(glossesOf).join(" · ")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {active && <PinnedGloss token={active} onClose={() => onToggle(null)} />}
    </div>
  );
}

function Refrain({
  section,
  header,
  meanings,
  activeId,
  onToggle,
}: {
  section: Extract<JamSection, { kind: "chorus" | "tag" }>;
  header: ReactNode;
  meanings: boolean;
  activeId: string | null;
  onToggle: (id: string | null) => void;
}) {
  const active = findToken(section.words, activeId);

  return (
    <section
      aria-label={section.label}
      className={cn(
        "rounded-sm border px-5 py-4 text-center sm:px-7 sm:py-5",
        section.kind === "chorus"
          ? "border-sindura/30 bg-sindura/[0.045]"
          : "border-gold/35 bg-gold/[0.05]",
      )}
    >
      {header}

      <div className="space-y-3">
        {section.words.map((word) => {
          const nama = word.namas[0];
          return (
            <div key={word.id}>
              <FitText
                as="p"
                mode="words"
                fitKey={word.id}
                className="deva text-[1.6rem] leading-[1.6] text-ink script-iast:hidden sm:text-[1.9rem]"
              >
                <WordToken
                  token={word}
                  kind="deva"
                  align="center"
                  active={activeId === word.id}
                  onToggle={onToggle}
                />
              </FitText>
              <FitText
                as="p"
                mode="words"
                fitKey={word.id}
                className={cn(
                  "iast leading-snug script-deva:hidden",
                  "script-both:text-[1.1rem] script-both:text-ink-muted",
                  "script-iast:text-[1.5rem] script-iast:text-ink sm:script-iast:text-[1.7rem]",
                )}
              >
                <WordToken
                  token={word}
                  kind="iast"
                  align="center"
                  active={activeId === word.id}
                  onToggle={onToggle}
                />
              </FitText>
              {(meanings || nama) && (
                <p className="mt-0.5 flex flex-wrap items-baseline justify-center gap-x-2.5 text-[15px] leading-snug">
                  {meanings && (
                    <span className="italic text-gold-soft">{glossesOf(word).join(" · ")}</span>
                  )}
                  {nama && (
                    <a
                      href={namaHref(nama)}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sindura transition-colors hover:text-sindura-soft"
                    >
                      <span className="eyebrow text-inherit">
                        Name {nama.index} &middot; Shloka {Number(nama.moduleId)}
                      </span>
                      <ExternalLink
                        size={12}
                        className="shrink-0 text-ink-faint opacity-60 group-hover:opacity-100"
                        aria-hidden
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {active && <PinnedGloss token={active} onClose={() => onToggle(null)} />}
    </section>
  );
}

/**
 * One sung word. A name links to its analysis on its shloka's page, in a new
 * tab so the song keeps playing. Where there is no hover, the first tap pins
 * the gloss instead, with the links beside it.
 */
function WordToken({
  token,
  kind,
  align,
  active,
  onToggle,
}: {
  token: JamToken;
  kind: "deva" | "iast";
  align: Align;
  active: boolean;
  onToggle: (id: string | null) => void;
}) {
  const glosses = glossesOf(token);
  const text = token[kind];
  const shown = <HyphenatedText text={text} hyphenated={token.hyphenated?.[kind]} />;

  if (glosses.length === 0) {
    return (
      <>
        <span data-fit-word className="whitespace-nowrap">
          {shown}
        </span>{" "}
      </>
    );
  }

  const toggle = () => onToggle(active ? null : token.id);
  const first = token.namas[0];

  return (
    <>
      <span data-fit-word className="group/tok relative inline-block whitespace-nowrap">
        {first ? (
          <a
            href={namaHref(first)}
            target="_blank"
            rel="noreferrer"
            className="tappable"
            data-active={active}
            aria-label={`${text}: ${token.namas.map((n) => `name ${n.index}, ${n.gloss}`).join("; ")} (opens in a new tab)`}
            onClick={(e) => {
              if (window.matchMedia("(hover: none)").matches) {
                e.preventDefault();
                toggle();
              }
            }}
          >
            {shown}
          </a>
        ) : (
          <span
            role="button"
            tabIndex={0}
            className="tappable"
            data-active={active}
            aria-label={`${text}: ${glosses.join(" · ")}`}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
          >
            {shown}
          </span>
        )}
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute bottom-full z-20 mb-1.5 w-max max-w-[16rem] rounded-sm border border-line-strong bg-surface-0 px-2.5 py-1.5 text-left font-sans text-[12px] font-normal not-italic normal-case leading-snug tracking-normal text-ink shadow-lg",
            align === "start" && "left-0",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "end" && "right-0",
            // Touch screens pin the gloss under the verse instead.
            "hidden opacity-0 transition-opacity [@media(hover:hover)]:block",
            "group-hover/tok:opacity-100 group-has-[:focus-visible]/tok:opacity-100",
          )}
        >
          {first
            ? token.namas.map((n) => (
                <span key={n.index} className="block">
                  <span className="numerals mr-1.5 text-sindura">{n.index}</span>
                  {n.gloss}
                </span>
              ))
            : glosses.join(" · ")}
        </span>
      </span>{" "}
    </>
  );
}

function PinnedGloss({ token, onClose }: { token: JamToken; onClose: () => void }) {
  return (
    <div className="mt-3 flex items-start gap-3 border-t border-line pt-2.5 text-left">
      <ul className="min-w-0 flex-1 space-y-1.5">
        {token.namas.length > 0 ? (
          token.namas.map((n) => (
            <li key={n.index}>
              <a
                href={namaHref(n)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-wrap items-baseline gap-x-2 leading-snug"
              >
                <span className="numerals text-lg text-sindura">{n.index}</span>
                <span className="deva text-[1.1rem] leading-snug text-ink script-iast:hidden">
                  {n.deva}
                </span>
                <span className="iast text-[1.05rem] text-ink script-deva:hidden">{n.iast}</span>
                <span className="text-[15px] italic text-ink-muted">{n.gloss}</span>
                <ExternalLink
                  size={12}
                  className="shrink-0 self-center text-ink-faint opacity-70 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))
        ) : (
          <li className="text-[15px] italic leading-snug text-ink-muted">{token.gloss}</li>
        )}
      </ul>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <X size={14} />
      </button>
    </div>
  );
}

function MeaningsToggle({ on, onChange }: { on: boolean; onChange: (on: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      title="Show the meaning of each line beneath it"
      className={cn(
        "inline-flex rounded-md border border-line bg-surface-1/60 p-0.5 font-sans text-xs transition-colors hover:text-ink",
        on ? "text-ink" : "text-ink-muted",
      )}
    >
      <span className="flex items-center gap-2 rounded py-1 pl-2 pr-3">
        <span
          aria-hidden
          className={cn(
            "relative h-3.5 w-6 shrink-0 rounded-full transition-colors",
            on ? "bg-sindura" : "bg-line-strong",
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-surface-0 shadow-sm transition-transform",
              on && "translate-x-2.5",
            )}
          />
        </span>
        Meanings
      </span>
    </button>
  );
}
