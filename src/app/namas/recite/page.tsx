import { ExternalLink } from "lucide-react";

import { FitText } from "@/components/fit-text";
import { HyphenatedText } from "@/components/hyphenated-text";
import { ScriptToggle } from "@/components/script-toggle";
import { WordBreakToggle } from "@/components/word-break-toggle";
import { getNamaIndex, type NamaIndexEntry } from "@/lib/content";
import { chantLabel, cn } from "@/lib/utils";

export const metadata = {
  title: "Recite the thousand names",
  description: "The thousand names as they are offered in worship: oṃ, the name, namaḥ.",
};

function byShloka(namas: NamaIndexEntry[]): { moduleId: string; namas: NamaIndexEntry[] }[] {
  const groups: { moduleId: string; namas: NamaIndexEntry[] }[] = [];
  for (const nama of namas) {
    const last = groups[groups.length - 1];
    if (last?.moduleId === nama.moduleId) last.namas.push(nama);
    else groups.push({ moduleId: nama.moduleId, namas: [nama] });
  }
  return groups;
}

export default function NamaRecitePage() {
  const groups = byShloka(getNamaIndex());

  return (
    <>
      <div className="sticky top-0 z-30 -mx-4 mb-2 flex flex-wrap items-center gap-2 border-b border-line bg-surface-0/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <ScriptToggle />
        <WordBreakToggle />
      </div>

      <div className="max-w-3xl">
        {groups.map(({ moduleId, namas }) => (
          <section key={moduleId} aria-labelledby={`shloka-${moduleId}`} className="pt-6">
            <h2 id={`shloka-${moduleId}`} className="mb-1 pl-14">
              <a
                href={`/shloka/${moduleId}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sindura transition-colors hover:text-sindura-soft"
              >
                <span className="eyebrow text-inherit">{chantLabel(Number(moduleId))}</span>
                <ExternalLink
                  size={13}
                  className="shrink-0 text-ink-faint opacity-60 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </h2>
            <ol className="border-t border-line">
              {namas.map((nama) => (
                <RecitedName key={nama.index} nama={nama} />
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}

function RecitedName({ nama }: { nama: NamaIndexEntry }) {
  const deva = nama.namavaliDeva ?? nama.deva;
  const iast = nama.namavaliIast ?? nama.iast;
  const hyphenated = nama.namavaliIast ? nama.namavaliHyphenated : nama.hyphenated;

  return (
    <li className="flex items-baseline gap-4 border-b border-line py-2.5">
      <span className="numerals w-10 shrink-0 text-right text-lg text-sindura">
        {nama.index}
      </span>
      <span className="min-w-0 flex-1">
        <FitText
          fitKey={deva}
          className="deva block text-[1.4rem] leading-snug text-ink script-iast:hidden sm:text-[1.55rem]"
        >
          <Frame>ॐ</Frame> <HyphenatedText text={deva} hyphenated={hyphenated?.deva} />{" "}
          <Frame>नमः</Frame>
        </FitText>
        <FitText
          fitKey={iast}
          className={cn(
            "iast block leading-snug script-deva:hidden",
            "script-both:text-[1rem] script-both:text-gold-soft sm:script-both:text-[1.05rem]",
            "script-iast:text-[1.2rem] script-iast:text-ink sm:script-iast:text-[1.3rem]",
          )}
        >
          <Frame>oṃ</Frame> <HyphenatedText text={iast} hyphenated={hyphenated?.iast} />{" "}
          <Frame>namaḥ</Frame>
        </FitText>
      </span>
    </li>
  );
}

/** The oṃ and namaḥ that frame every name, set back so the eye finds the name. */
function Frame({ children }: { children: React.ReactNode }) {
  return <span className="opacity-60">{children}</span>;
}
