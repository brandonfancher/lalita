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
    <section className="mb-14">
      <h2 className="display mb-2 text-[2rem] text-ink">The sounds</h2>
      <p className="mb-6 max-w-2xl text-[1.075rem] leading-relaxed text-ink-muted">
        Sanskrit orders its alphabet by where in the mouth each sound is made, moving from the back
        of the throat forward to the lips. Tap any letter to hear it — clips from{" "}
        <a
          href="https://learnsanskrit.org/sounds/"
          target="_blank"
          rel="noreferrer"
          className="text-sindura underline decoration-sindura/40 underline-offset-4 hover:decoration-sindura"
        >
          learnsanskrit.org
        </a>
        .
      </p>

      <h3 className="eyebrow mb-3 text-ink-faint">Vowels</h3>
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

      <h3 className="eyebrow mb-3 text-ink-faint">Consonants, by place of articulation</h3>
      <div className="divide-y divide-line border-y border-line-strong">
        {ORDER.map((place) => {
          const row = consonants.filter(
            ([, i]) => i.articulation === place && i.class !== "semivowel",
          );
          if (!row.length) return null;
          return (
            <div
              key={place}
              className="flex flex-wrap items-center gap-2 py-3"
            >
              <span className="w-full sm:w-36 sm:shrink-0">
                <span className="iast block text-[1.05rem] text-sindura">{ARTICULATION_LABELS[place].sa}</span>
                <span className="block text-[15px] text-ink-faint">{ARTICULATION_LABELS[place].en}</span>
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

      <h3 className="eyebrow mb-3 mt-8 text-ink-faint">Semivowels &amp; sibilants</h3>
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
        "flex min-w-[3.5rem] flex-col items-center rounded-sm border px-2.5 pb-1.5 pt-2.5 transition-colors",
        playable
          ? "border-line bg-surface-0/60 hover:border-sindura/40 hover:bg-sindura/[0.06]"
          : "cursor-default border-line bg-surface-0/40 opacity-60",
      )}
    >
      <span className="deva text-2xl leading-none text-ink">{deva}</span>
      <span className="iast mt-1 text-sm text-gold-soft">{iast}</span>
      {caption && (
        <span className="mt-0.5 font-sans text-[9px] uppercase tracking-wide text-ink-faint">{caption}</span>
      )}
    </button>
  );
}
