"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { AksaraStrip } from "@/components/aksara-strip";
import { CompoundTree } from "@/components/compound-tree";
import { SoundButton } from "@/components/sound-button";
import { playAksaras } from "@/lib/sound-audio";
import type { Morphology, Nama, StudyModule, Token, WordGloss } from "@/lib/types";
import { caseInfo, cn } from "@/lib/utils";

type ScriptMode = "both" | "deva" | "iast";

/**
 * The dual-script reading pane.
 *
 * Devanagari and romanization are rendered from the same tokenization, so a
 * word in one script can be highlighted alongside its counterpart in the other.
 * Tapping any word opens the inspector; the script toggle lets you progressively
 * hide the romanization as the script becomes readable.
 */
export function VerseReader({ module: mod }: { module: StudyModule }) {
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

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
      <div>
        <div className="mb-4 flex items-center gap-1 text-xs">
          <span className="mr-1 text-ink-faint">Show</span>
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
              onClick={() => setScript(value)}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                script === value
                  ? "bg-surface-3 text-ink"
                  : "text-ink-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-5 rounded-2xl border border-line bg-surface-1/60 p-4 sm:p-6">
          {mod.lines.map((line, li) => (
            <div key={li} className="space-y-1.5">
              {script !== "iast" && (
                <p className="deva text-[1.6rem] leading-[1.85] text-ink sm:text-3xl">
                  {line.tokens.map((t) => (
                    <TokenSpan
                      key={`d-${t.id}`}
                      token={t}
                      text={t.deva}
                      activeId={activeId}
                      hoverId={hoverId}
                      linked={linkedIds.has(t.id)}
                      onSelect={setActiveId}
                      onHover={setHoverId}
                    />
                  ))}
                </p>
              )}
              {script !== "deva" && (
                <p
                  className={cn(
                    "iast leading-relaxed",
                    script === "iast"
                      ? "text-xl text-ink sm:text-2xl"
                      : "text-[15px] text-ink-muted sm:text-base",
                  )}
                >
                  {line.tokens.map((t) => (
                    <TokenSpan
                      key={`i-${t.id}`}
                      token={t}
                      text={t.iast}
                      activeId={activeId}
                      hoverId={hoverId}
                      linked={linkedIds.has(t.id)}
                      onSelect={setActiveId}
                      onHover={setHoverId}
                    />
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-ink-faint">
          Tap any word to inspect its meaning, grammar, and syllables.
        </p>
      </div>

      {/* Desktop: a sticky column. Mobile: a bottom sheet. */}
      {active && (
        <>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Inspector
                token={active}
                namas={activeNamas}
                onClose={() => setActiveId(null)}
              />
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 z-40 max-h-[70dvh] overflow-y-auto rounded-t-2xl border-t border-line-strong bg-surface-1 p-4 shadow-2xl lg:hidden">
            <Inspector token={active} namas={activeNamas} onClose={() => setActiveId(null)} />
          </div>
        </>
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
        className="tappable"
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
}: {
  token: Token;
  namas: Nama[];
  onClose: () => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-1 p-4">
      <div className="mb-3 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="deva text-2xl leading-snug text-ink">{token.deva}</p>
          <p className="iast text-sm text-gold-soft">{token.iast}</p>
        </div>
        {token.aksaras.length > 0 && (
          <SoundButton
            label={`Play ${token.iast}`}
            onPlay={() => playAksaras(token.aksaras)}
          />
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <X size={15} />
        </button>
      </div>

      {namas.length > 0 ? (
        <div className="space-y-5">
          {namas.length > 1 && (
            <p className="rounded-lg bg-surface-2/60 px-2.5 py-1.5 text-[13px] leading-relaxed text-ink-muted">
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
        <p className="mb-4 text-sm text-ink-faint">
          This word is part of the verse frame rather than one of the thousand names.
        </p>
      )}

      <section className="mt-4">
        <h4 className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">Syllables</h4>
        <AksaraStrip aksaras={token.aksaras} />
      </section>
    </div>
  );
}

/** One of the thousand names, as reached by tapping a word of the verse. */
function NamaPanel({ nama }: { nama: Nama }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="rounded-full bg-sindura/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sindura-soft">
            nāma {nama.index}
          </span>
          <span className="deva text-base text-ink">{nama.deva}</span>
          <span className="iast text-[13px] text-ink-muted">{nama.iast}</span>
          {nama.aksaras.length > 0 && (
            <SoundButton
              size="sm"
              label={`Play ${nama.iast}`}
              onPlay={() => playAksaras(nama.aksaras)}
            />
          )}
        </div>
        {nama.gloss && <p className="text-[15px] font-medium text-ink">{nama.gloss}</p>}
        {nama.translation && (
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{nama.translation}</p>
        )}
        {!nama.gloss && !nama.translation && (
          <p className="text-sm text-ink-faint">Meaning not yet written for this name.</p>
        )}
      </div>

      <Grammar m={nama.morphology} />

      {nama.compound && (
        <section>
          <h4 className="mb-1.5 text-[11px] uppercase tracking-wider text-ink-faint">Compound</h4>
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
      <h4 className="mb-1.5 text-[11px] uppercase tracking-wider text-ink-faint">Grammar</h4>
      <dl className="space-y-1 text-[13px]">
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
    <div className="space-y-4">
      <div>
        <p className="text-[15px] font-medium text-ink">{word.gloss}</p>
        {word.translation && (
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{word.translation}</p>
        )}
        {word.partOf && (
          <p className="mt-2 rounded-lg bg-surface-2/60 px-2.5 py-1.5 text-[13px] text-ink-muted">
            Printed apart, but part of{" "}
            <span className="iast text-ink">{word.partOf}</span>.
          </p>
        )}
      </div>

      {word.lemma && (
        <section>
          <h4 className="mb-1.5 text-[11px] uppercase tracking-wider text-ink-faint">
            Dictionary form
          </h4>
          <p className="text-[13px]">
            {word.lemmaDeva && <span className="deva mr-1.5 text-ink">{word.lemmaDeva}</span>}
            <span className="iast text-ink-muted">{word.lemma}</span>
          </p>
        </section>
      )}

      <Grammar m={word.morphology} />

      {word.compound && (
        <section>
          <h4 className="mb-1.5 text-[11px] uppercase tracking-wider text-ink-faint">Compound</h4>
          <CompoundTree node={word.compound} />
        </section>
      )}

      {word.note && <p className="text-[13px] leading-relaxed text-ink-faint">{word.note}</p>}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 text-ink-faint">{label}</dt>
      <dd className="min-w-0 flex-1 text-ink">{children}</dd>
    </div>
  );
}
