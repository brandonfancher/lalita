"use client";

import { useMemo, useState } from "react";
import { MousePointerClick, X } from "lucide-react";

import { AksaraStrip } from "@/components/aksara-strip";
import { CompoundTree } from "@/components/compound-tree";
import { FitText } from "@/components/fit-text";
import { Lotus } from "@/components/ornament";
import type { Morphology, Nama, StudyModule, Token, WordGloss } from "@/lib/types";
import { caseInfo, cn, toDevanagariDigits } from "@/lib/utils";

type ScriptMode = "both" | "deva" | "iast";

/**
 * The dual-script reading pane.
 *
 * Devanagari and romanization are rendered from the same tokenization, so a
 * word in one script can be highlighted alongside its counterpart in the other.
 * Tapping any word opens the inspector; the script toggle lets you progressively
 * hide the romanization as the script becomes readable.
 */
export function VerseReader({
  module: mod,
  chant,
}: {
  module: StudyModule;
  /** Rendered at the top of the reading column, above the verse. */
  chant?: React.ReactNode;
}) {
  const [script, setScript] = useState<ScriptMode>("both");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const tokensById = useMemo(() => {
    const map = new Map<string, Token>();
    for (const line of mod.lines) for (const t of line.tokens) map.set(t.id, t);
    return map;
  }, [mod.lines]);

  const namasByIndex = useMemo(() => {
    const map = new Map<number, Nama>();
    for (const n of mod.namas) map.set(n.index, n);
    return map;
  }, [mod.namas]);

  const active = activeId ? tokensById.get(activeId) : undefined;
  const activeNamas = (active?.namaIndices ?? [])
    .map((i) => namasByIndex.get(i))
    .filter((n): n is Nama => Boolean(n));

  // A name printed as two words should light up both when either is touched.
  const linkedIds = useMemo(() => {
    const source = hoverId ?? activeId;
    const token = source ? tokensById.get(source) : undefined;
    if (!token?.namaIndices?.length) return new Set<string>();
    const shared = new Set(token.namaIndices);
    const ids = new Set<string>();
    for (const line of mod.lines) {
      for (const t of line.tokens) {
        if (t.id !== source && t.namaIndices?.some((i) => shared.has(i))) ids.add(t.id);
      }
    }
    return ids;
  }, [hoverId, activeId, tokensById, mod.lines]);

  /** Printed editions close each half-verse with a daṇḍa and number the verse. */
  const markerFor = (li: number, kind: "deva" | "iast") => {
    if (mod.kind !== "shloka" || mod.number === null) return null;
    const last = li === mod.lines.length - 1;
    if (kind === "deva") return last ? `॥ ${toDevanagariDigits(mod.number)} ॥` : "।";
    return last ? `‖ ${mod.number} ‖` : "|";
  };

  const renderToken = (t: Token, kind: "deva" | "iast") => (
    <TokenSpan
      key={`${kind}-${t.id}`}
      token={t}
      text={t[kind]}
      activeId={activeId}
      hoverId={hoverId}
      linked={linkedIds.has(t.id)}
      onSelect={setActiveId}
      onHover={setHoverId}
    />
  );

  // The closing daṇḍa travels with the last word so it never wraps alone.
  const renderTokens = (tokens: Token[], kind: "deva" | "iast", marker: string | null) => {
    if (!marker || tokens.length === 0) return tokens.map((t) => renderToken(t, kind));
    const last = tokens[tokens.length - 1];
    return (
      <>
        {tokens.slice(0, -1).map((t) => renderToken(t, kind))}
        <span data-fit-word className="whitespace-nowrap">
          {renderToken(last, kind)}
          <span aria-hidden className="text-sindura">
            {marker}
          </span>
        </span>
      </>
    );
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
      <div className="min-w-0">
        {chant && <div className="mb-6">{chant}</div>}

        <div className="mb-3 flex items-center justify-between gap-3">
          <div
            role="radiogroup"
            aria-label="Script"
            className="inline-flex rounded-md border border-line bg-surface-1/60 p-0.5 font-sans text-xs"
          >
            {(
              [
                ["both", "Both"],
                ["deva", "देवनागरी"],
                ["iast", "Romanized"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={script === value}
                onClick={() => setScript(value)}
                className={cn(
                  "rounded px-3 py-1 transition-colors",
                  value === "deva" && "deva py-0 text-[13px]",
                  script === value
                    ? "bg-surface-0 text-ink shadow-sm ring-1 ring-line"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="hidden text-sm italic text-ink-faint sm:block lg:hidden">
            Tap any word to inspect it.
          </p>
        </div>

        <div className="folio rounded-sm px-5 py-7 sm:px-10 sm:py-10">
          <div className="space-y-6">
            {mod.lines.map((line, li) => (
              <div key={li} className="space-y-1">
                {script !== "iast" && (
                  <FitText
                    as="p"
                    mode="words"
                    fitKey={line.deva}
                    className="deva text-[1.65rem] leading-[1.8] text-ink sm:text-[2.05rem]"
                  >
                    {renderTokens(line.tokens, "deva", markerFor(li, "deva"))}
                  </FitText>
                )}
                {script !== "deva" && (
                  <FitText
                    as="p"
                    mode="words"
                    fitKey={`${script}:${line.iast}`}
                    className={cn(
                      "iast leading-relaxed",
                      script === "iast"
                        ? "text-[1.45rem] text-ink sm:text-[1.7rem]"
                        : "text-[1.05rem] text-ink-muted sm:text-[1.2rem]",
                    )}
                  >
                    {renderTokens(
                      line.tokens,
                      "iast",
                      script === "iast" ? markerFor(li, "iast") : null,
                    )}
                  </FitText>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-sm italic text-ink-faint sm:hidden">
          Tap any word to inspect its meaning, grammar, and syllables.
        </p>
      </div>

      {/* Desktop: a sticky column. Mobile: a bottom sheet. */}
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          {active ? (
            <Inspector token={active} namas={activeNamas} onClose={() => setActiveId(null)} />
          ) : (
            <IdleCard namaCount={mod.namas.length} />
          )}
        </div>
      </aside>
      {active && (
        <div className="fixed inset-x-0 bottom-0 z-40 max-h-[72dvh] overflow-y-auto rounded-t-xl border-t border-line-strong bg-surface-0 px-4 pb-6 pt-2 shadow-[0_-20px_50px_-20px_rgba(40,20,10,0.4)] lg:hidden">
          <div aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-line-strong" />
          <Inspector
            token={active}
            namas={activeNamas}
            onClose={() => setActiveId(null)}
            bare
          />
        </div>
      )}
    </div>
  );
}

function IdleCard({ namaCount }: { namaCount: number }) {
  return (
    <div className="rounded-sm border border-dashed border-line-strong/70 px-5 py-6 text-center">
      <MousePointerClick size={18} className="mx-auto mb-3 text-gold" strokeWidth={1.5} />
      <p className="display text-lg text-ink">Tap any word of the verse</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
        to see its meaning, its grammar, how its compound is built, and the syllables it is
        written with.
      </p>
      {namaCount > 0 && (
        <p className="mt-4 border-t border-line pt-3 text-sm italic text-ink-faint">
          This shloka carries {namaCount} of the thousand names.
        </p>
      )}
    </div>
  );
}

function TokenSpan({
  token,
  text,
  activeId,
  hoverId,
  linked,
  onSelect,
  onHover,
}: {
  token: Token;
  text: string;
  activeId: string | null;
  hoverId: string | null;
  linked: boolean;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <>
      <span
        role="button"
        tabIndex={0}
        data-fit-word
        className="tappable whitespace-nowrap"
        data-active={activeId === token.id}
        data-linked={linked || (hoverId === token.id && activeId !== token.id)}
        onClick={() => onSelect(activeId === token.id ? null : token.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(activeId === token.id ? null : token.id);
          }
        }}
        onMouseEnter={() => onHover(token.id)}
        onMouseLeave={() => onHover(null)}
      >
        {text}
      </span>{" "}
    </>
  );
}

function Inspector({
  token,
  namas,
  onClose,
  bare = false,
}: {
  token: Token;
  namas: Nama[];
  onClose: () => void;
  /** Drop the card chrome when already inside a sheet. */
  bare?: boolean;
}) {
  return (
    <div
      className={cn(
        !bare &&
          "max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-sm border border-line-strong bg-surface-0/90 p-5 shadow-[0_18px_40px_-28px_rgba(40,20,10,0.5)]",
      )}
    >
      <div className="mb-4 flex items-start gap-2 border-b border-line pb-4">
        <div className="min-w-0 flex-1">
          <FitText as="p" className="deva text-[1.75rem] leading-snug text-ink">
            {token.deva}
          </FitText>
          <FitText as="p" className="iast text-[1.05rem] text-gold-soft">
            {token.iast}
          </FitText>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <X size={16} />
        </button>
      </div>

      {namas.length > 0 ? (
        <div className="space-y-6">
          {namas.length > 1 && (
            <p className="flex items-start gap-2 rounded-sm bg-surface-2/60 px-3 py-2 text-[15px] leading-snug text-ink-muted">
              <Lotus size={16} className="mt-1 shrink-0 text-gold" />
              Sandhi has joined {namas.length === 2 ? "two names" : `${namas.length} names`} into
              this one written word.
            </p>
          )}
          {namas.map((nama) => (
            <NamaPanel key={nama.index} nama={nama} />
          ))}
        </div>
      ) : token.word ? (
        <WordPanel word={token.word} />
      ) : (
        <p className="mb-4 text-[15px] italic text-ink-faint">
          This word is part of the verse frame rather than one of the thousand names.
        </p>
      )}

      <section className="mt-5">
        <h4 className="eyebrow mb-2 text-ink-faint">Syllables</h4>
        <AksaraStrip aksaras={token.aksaras} />
      </section>
    </div>
  );
}

/** One of the thousand names, as reached by tapping a word of the verse. */
function NamaPanel({ nama }: { nama: Nama }) {
  return (
    <div className="space-y-5">
      <div>
        <div data-fit-container className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="eyebrow text-sindura">Nāma {nama.index}</span>
          <FitText container="marker" className="deva text-lg text-ink">
            {nama.deva}
          </FitText>
          <FitText container="marker" className="iast text-[15px] text-ink-muted">
            {nama.iast}
          </FitText>
        </div>
        {nama.gloss && <p className="display text-xl leading-snug text-ink">{nama.gloss}</p>}
        {nama.translation && (
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{nama.translation}</p>
        )}
        {!nama.gloss && !nama.translation && (
          <p className="text-[15px] italic text-ink-faint">Meaning not yet written for this name.</p>
        )}
      </div>

      <Grammar m={nama.morphology} />

      {nama.compound && (
        <section>
          <h4 className="eyebrow mb-2 text-ink-faint">Compound</h4>
          <CompoundTree node={nama.compound} />
        </section>
      )}
    </div>
  );
}

function Grammar({ m }: { m?: Morphology }) {
  const ci = caseInfo(m?.case);
  if (!m) return null;

  return (
    <section>
      <h4 className="eyebrow mb-2 text-ink-faint">Grammar</h4>
      <dl className="divide-y divide-line/70 border-y border-line/70 text-[15px]">
        <Row label="stem">
          <span className="deva mr-1.5">{m.stem}</span>
          <span className="iast text-ink-muted">{m.stemIast}</span>
        </Row>
        <Row label="part of speech">{m.pos}</Row>
        {m.gender && <Row label="gender">{m.gender}</Row>}
        {ci && (
          <Row label="case">
            {m.case} ({ci.sanskrit}
            {m.caseNumber ? `, ${m.caseNumber}` : ""}) &middot;{" "}
            <span className="text-ink-faint">{ci.sense}</span>
          </Row>
        )}
        {m.number && <Row label="number">{m.number}</Row>}
        {m.declension && <Row label="declension">{m.declension}</Row>}
        {m.tense && <Row label="tense">{m.tense}</Row>}
        {m.person && <Row label="person">{m.person}</Row>}
        {m.voice && <Row label="voice">{m.voice}</Row>}
        {m.root && (
          <Row label="root">
            <span className="iast">{m.root}</span>
            {m.rootMeaning ? ` — ${m.rootMeaning}` : ""}
          </Row>
        )}
        {m.note && <Row label="note">{m.note}</Row>}
      </dl>
    </section>
  );
}

/** A word of the dhyāna, which carries its own meaning rather than a nāma's. */
function WordPanel({ word }: { word: WordGloss }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="display text-xl leading-snug text-ink">{word.gloss}</p>
        {word.translation && (
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{word.translation}</p>
        )}
        {word.partOf && (
          <p className="mt-2 rounded-sm bg-surface-2/60 px-3 py-2 text-[15px] text-ink-muted">
            Printed apart, but part of <span className="iast text-ink">{word.partOf}</span>.
          </p>
        )}
      </div>

      {word.lemma && (
        <section>
          <h4 className="eyebrow mb-2 text-ink-faint">Dictionary form</h4>
          <p className="text-[15px]">
            {word.lemmaDeva && <span className="deva mr-1.5 text-ink">{word.lemmaDeva}</span>}
            <span className="iast text-ink-muted">{word.lemma}</span>
          </p>
        </section>
      )}

      <Grammar m={word.morphology} />

      {word.compound && (
        <section>
          <h4 className="eyebrow mb-2 text-ink-faint">Compound</h4>
          <CompoundTree node={word.compound} />
        </section>
      )}

      {word.note && <p className="text-[15px] italic leading-relaxed text-ink-faint">{word.note}</p>}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-1.5">
      <dt className="w-[6.5rem] shrink-0 text-[14px] italic leading-6 text-ink-faint">{label}</dt>
      <dd className="min-w-0 flex-1 text-ink [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}
