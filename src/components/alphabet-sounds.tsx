"use client";

import { CONSONANTS, INDEPENDENT_VOWELS, ARTICULATION_LABELS } from "@/lib/aksara";
import { hasSound, playSounds } from "@/lib/sound-audio";
import type { Articulation } from "@/lib/types";
import { cn } from "@/lib/utils";

const ORDER: Articulation[] = ["guttural", "palatal", "retroflex", "dental", "labial"];

/** Interactive alphabet grid — tap a letter to hear its learnsanskrit.org clip. */
export function AlphabetSounds() {
  const vowels = Object.entries(INDEPENDENT_VOWELS);
  const consonants = Object.entries(CONSONANTS);

  return (
    <section className="mb-12">
      <h2 className="display mb-2 text-2xl text-ink">The sounds</h2>
      <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
        Sanskrit orders its alphabet by where in the mouth each sound is made, moving from the back
        of the throat forward to the lips. Tap any letter to hear it — clips from{" "}
        <a
          href="https://learnsanskrit.org/sounds/"
          target="_blank"
          rel="noreferrer"
          className="text-gold-soft underline-offset-2 hover:underline"
        >
          learnsanskrit.org
        </a>
        .
      </p>

      <h3 className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">Vowels</h3>
      <div className="mb-6 flex flex-wrap gap-2">
        {vowels.map(([char, info]) => (
          <LetterTile
            key={char}
            deva={char}
            iast={info.iast}
            soundKey={info.iast}
            caption={info.long ? "long" : "short"}
          />
        ))}
      </div>

      <h3 className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">
        Consonants, by place of articulation
      </h3>
      <div className="space-y-2">
        {ORDER.map((place) => {
          const row = consonants.filter(
            ([, i]) => i.articulation === place && i.class !== "semivowel",
          );
          if (!row.length) return null;
          return (
            <div
              key={place}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface-1/50 p-3"
            >
              <span className="w-full text-[11px] text-gold sm:w-32 sm:shrink-0">
                {ARTICULATION_LABELS[place].sa}
                <span className="ml-1 text-ink-faint">{ARTICULATION_LABELS[place].en}</span>
              </span>
              {row.map(([char, info]) => (
                <LetterTile
                  key={char}
                  deva={char}
                  iast={`${info.iast}a`}
                  soundKey={`${info.iast}a`}
                  title={`${info.voicing}${info.aspirated ? ", aspirated" : ""}`}
                />
              ))}
            </div>
          );
        })}
      </div>

      <h3 className="mb-2 mt-6 text-[11px] uppercase tracking-wider text-ink-faint">
        Semivowels &amp; sibilants
      </h3>
      <div className="flex flex-wrap gap-2">
        {consonants
          .filter(([, i]) => i.class === "semivowel" || i.class === "sibilant" || i.class === "aspirate" || i.class === "lateral")
          .map(([char, info]) => (
            <LetterTile
              key={char}
              deva={char}
              iast={`${info.iast}a`}
              soundKey={`${info.iast}a`}
              caption={info.class}
            />
          ))}
      </div>
    </section>
  );
}

function LetterTile({
  deva,
  iast,
  soundKey,
  caption,
  title,
}: {
  deva: string;
  iast: string;
  soundKey: string;
  caption?: string;
  title?: string;
}) {
  const playable = hasSound(soundKey);
  return (
    <button
      type="button"
      disabled={!playable}
      title={title ?? (playable ? `Play ${iast}` : undefined)}
      onClick={() => playSounds([soundKey])}
      className={cn(
        "flex min-w-[3.5rem] flex-col items-center rounded-lg border px-2.5 py-2 transition-colors",
        playable
          ? "border-line bg-surface-1/60 hover:border-gold/50 hover:bg-gold/10"
          : "cursor-default border-line bg-surface-1/40 opacity-60",
      )}
    >
      <span className="deva text-2xl leading-none text-ink">{deva}</span>
      <span className="iast mt-1 text-xs text-gold-soft">{iast}</span>
      {caption && (
        <span className="mt-0.5 text-[9px] uppercase tracking-wide text-ink-faint">{caption}</span>
      )}
    </button>
  );
}
