"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { AksaraStrip } from "@/components/aksara-strip";
import { CompoundTree } from "@/components/compound-tree";
import { SoundButton } from "@/components/sound-button";
import { playAksaras } from "@/lib/sound-audio";
import type { Nama } from "@/lib/types";
import { caseInfo, cn } from "@/lib/utils";

/**
 * The names contained in a shloka, each expandable into its full analysis.
 * Collapsed by default so the shloka page stays readable when a verse carries
 * ten or eleven names.
 */
export function NamaList({ namas }: { namas: Nama[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="space-y-2">
      {namas.map((nama) => {
        const expanded = open === nama.index;
        const m = nama.morphology;
        const ci = caseInfo(m?.case);

        return (
          <li
            key={nama.index}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              expanded ? "border-line-strong bg-surface-1" : "border-line bg-surface-1/50",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : nama.index)}
              aria-expanded={expanded}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <span className="w-10 shrink-0 font-mono text-[11px] text-ink-faint">
                {nama.index}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <span className="deva text-xl text-ink">{nama.deva}</span>
                  <span className="iast text-sm text-gold-soft">{nama.iast}</span>
                  {nama.aksaras.length > 0 && (
                    <SoundButton
                      size="sm"
                      label={`Play ${nama.iast}`}
                      onPlay={() => playAksaras(nama.aksaras)}
                    />
                  )}
                </span>
                {nama.gloss && (
                  <span className="mt-0.5 block text-[13px] text-ink-muted">{nama.gloss}</span>
                )}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 text-ink-faint transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>

            {expanded && (
              <div className="space-y-5 border-t border-line/60 px-4 py-4">
                {nama.translation && (
                  <p className="text-[15px] leading-relaxed text-ink">{nama.translation}</p>
                )}

                {nama.commentary && (
                  <p className="text-sm leading-relaxed text-ink-muted">{nama.commentary}</p>
                )}

                {m && (
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <Chip>{m.pos}</Chip>
                    {m.gender && <Chip>{m.gender}</Chip>}
                    {ci && <Chip title={ci.sense}>{`${m.case} (${ci.sanskrit})`}</Chip>}
                    {m.number && <Chip>{m.number}</Chip>}
                    {m.declension && <Chip>{m.declension}</Chip>}
                    {m.stemIast && <Chip>stem: {m.stemIast}</Chip>}
                  </div>
                )}

                {m?.note && <p className="text-[13px] text-ink-faint">{m.note}</p>}

                {nama.compound && (
                  <div>
                    <h4 className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">
                      How the compound is built
                    </h4>
                    <CompoundTree node={nama.compound} />
                  </div>
                )}

                <div>
                  <h4 className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">
                    Syllables
                  </h4>
                  <AksaraStrip aksaras={nama.aksaras} />
                </div>

                {nama.namavaliIast && (
                  <p className="border-t border-line/60 pt-3 text-[13px] text-ink-faint">
                    In recitation:{" "}
                    <span className="deva text-base text-ink-muted">
                      {nama.namavaliDeva} नमः
                    </span>{" "}
                    <span className="iast">({nama.namavaliIast} namaḥ)</span>
                  </p>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Chip({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className="rounded-full border border-line bg-surface-2/70 px-2 py-0.5 text-ink-muted"
    >
      {children}
    </span>
  );
}
