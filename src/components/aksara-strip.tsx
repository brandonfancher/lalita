"use client";

import { useState } from "react";

import { SoundButton } from "@/components/sound-button";
import { ARTICULATION_LABELS } from "@/lib/aksara";
import {
  hasSound,
  playAksara,
  playPart,
  soundKeyForPart,
} from "@/lib/sound-audio";
import type { Aksara } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROLE_LABEL: Record<string, string> = {
  consonant: "consonant",
  vowel: "vowel",
  "vowel-sign": "vowel sign",
  virama: "virāma",
  anusvara: "anusvāra",
  visarga: "visarga",
  candrabindu: "candrabindu",
  avagraha: "avagraha",
  nukta: "nukta",
  other: "mark",
};

/**
 * Shows a word as its written syllables, each of which can be opened to reveal
 * the letters and vowel signs it is built from. Tapping a syllable or letter
 * also plays the corresponding learnsanskrit.org phoneme clip(s).
 */
export function AksaraStrip({ aksaras }: { aksaras: Aksara[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!aksaras.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-1.5">
        {aksaras.map((a, i) => {
          const active = open === i;
          return (
            <button
              key={`${a.text}-${i}`}
              type="button"
              onClick={() => {
                setOpen(active ? null : i);
                playAksara(a);
              }}
              className={cn(
                "group flex flex-col items-center gap-0.5 rounded-lg border px-2.5 py-1.5 transition-colors",
                active
                  ? "border-sindura/60 bg-sindura/15"
                  : "border-line bg-surface-2/60 hover:border-line-strong hover:bg-surface-3/60",
              )}
            >
              <span className="deva text-2xl leading-none text-ink">{a.text}</span>
              <span className="iast text-[11px] leading-none text-ink-muted">{a.iast}</span>
              {a.isConjunct && (
                <span className="text-[9px] uppercase tracking-wider text-gold">joined</span>
              )}
            </button>
          );
        })}
      </div>

      {open !== null && aksaras[open] && (
        <div className="rounded-xl border border-line bg-surface-1/80 p-3">
          <div className="mb-2 flex items-baseline gap-2">
            <span className="deva text-3xl text-ink">{aksaras[open].text}</span>
            <span className="iast text-sm text-ink-muted">= {aksaras[open].iast}</span>
            <SoundButton
              size="sm"
              className="ml-1"
              label={`Play ${aksaras[open].iast}`}
              onPlay={() => playAksara(aksaras[open])}
            />
            {aksaras[open].isConjunct && (
              <span className="ml-auto rounded-full bg-gold/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                conjunct
              </span>
            )}
          </div>

          <ul className="divide-y divide-line/60">
            {aksaras[open].parts.map((p, k) => {
              const key = soundKeyForPart(p);
              const canPlay = Boolean(key && hasSound(key));
              return (
                <li
                  key={`${p.char}-${k}`}
                  className={cn(
                    "flex items-center gap-3 py-2",
                    canPlay && "cursor-pointer rounded-lg hover:bg-surface-2/80",
                  )}
                  onClick={canPlay ? () => playPart(p) : undefined}
                  onKeyDown={
                    canPlay
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            playPart(p);
                          }
                        }
                      : undefined
                  }
                  role={canPlay ? "button" : undefined}
                  tabIndex={canPlay ? 0 : undefined}
                >
                  <span className="deva w-9 shrink-0 text-center text-2xl text-gold-soft">
                    {p.role === "vowel-sign" || p.role === "virama" ? `\u25CC${p.char}` : p.char}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="iast text-sm text-ink">{p.name}</span>
                      <span className="text-[11px] text-ink-faint">
                        {ROLE_LABEL[p.role] ?? p.role}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-ink-muted">
                      {p.articulation && (
                        <span>
                          {ARTICULATION_LABELS[p.articulation].sa} &middot;{" "}
                          {ARTICULATION_LABELS[p.articulation].en}
                        </span>
                      )}
                      {p.voicing && <span>{p.voicing}</span>}
                      {p.aspirated && <span>aspirated</span>}
                      {p.inherentVowel && (
                        <span className="text-gold">carries inherent “a”</span>
                      )}
                    </div>
                  </div>
                  {canPlay && (
                    <SoundButton size="sm" onPlay={() => playPart(p)} label={`Play ${p.name}`} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
