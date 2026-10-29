"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import { AksaraStrip } from "@/components/aksara-strip";
import { CompoundTree } from "@/components/compound-tree";
import { FitText } from "@/components/fit-text";
import { HyphenatedText } from "@/components/hyphenated-text";
import { namaPath } from "@/lib/site";
import type { Nama } from "@/lib/types";
import { caseInfo, cn } from "@/lib/utils";

/**
 * The names contained in a shloka, each expandable into its full analysis.
 * Collapsed by default so the shloka page stays readable when a verse carries
 * ten or eleven names.
 */
export function NamaList({ namas }: { namas: Nama[] }) {
  const [open, setOpen] = useState<number | null>(null);

  // A link to `#nama-457` opens that name's analysis.
  useEffect(() => {
    const openFromHash = () => {
      const index = Number(/^#nama-(\d+)$/.exec(window.location.hash)?.[1]);
      if (!namas.some((n) => n.index === index)) return;
      setOpen(index);
      requestAnimationFrame(() =>
        document.getElementById(`nama-${index}`)?.scrollIntoView({ block: "start" }),
      );
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [namas]);

  return (
    <ul className="border-t border-line-strong">
      {namas.map((nama) => {
        const expanded = open === nama.index;
        const m = nama.morphology;
        const ci = caseInfo(m?.case);

        return (
          <li
            key={nama.index}
            id={`nama-${nama.index}`}
            className={cn(
              "scroll-mt-20 border-b border-line transition-colors",
              expanded && "bg-surface-1/70",
            )}
          >
            <div className="group relative flex w-full items-start gap-4 px-2 py-4 transition-colors hover:bg-surface-1/60 sm:px-3">
              <Link
                href={namaPath(nama.index)}
                aria-label={`Name ${nama.index}, ${nama.iast}: its own page`}
                className="numerals relative z-10 w-10 shrink-0 pt-1.5 text-right font-serif text-lg text-sindura underline decoration-transparent underline-offset-4 transition-colors hover:decoration-sindura/60"
              >
                {nama.index}
              </Link>
              <span className="min-w-0 flex-1">
                <span
                  data-fit-container
                  className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : nama.index)}
                    aria-expanded={expanded}
                    aria-label={nama.gloss ? `${nama.iast}: ${nama.gloss}` : nama.iast}
                    className="deva text-left text-[1.45rem] leading-snug text-ink outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-sindura/50"
                  >
                    <FitText container="marker" fitKey={nama.deva}>
                      <HyphenatedText text={nama.deva} hyphenated={nama.hyphenated?.deva} />
                    </FitText>
                  </button>
                  <FitText container="marker" fitKey={nama.iast} className="iast text-[1.05rem] text-gold-soft">
                    <HyphenatedText text={nama.iast} hyphenated={nama.hyphenated?.iast} />
                  </FitText>
                </span>
                {nama.gloss && (
                  <span className="mt-0.5 block text-[1.02rem] text-ink-muted">{nama.gloss}</span>
                )}
              </span>
              <ChevronDown
                aria-hidden
                size={16}
                className={cn(
                  "mt-2.5 shrink-0 text-ink-faint transition-transform group-hover:text-ink",
                  expanded && "rotate-180",
                )}
              />
            </div>

            {expanded && (
              <div className="space-y-5 px-2 pb-6 pl-16 pr-3 sm:pl-[4.25rem]">
                {nama.translation && (
                  <p className="display text-[1.15rem] leading-relaxed text-ink">{nama.translation}</p>
                )}

                {nama.commentary && (
                  <p className="text-[1rem] leading-relaxed text-ink-muted">{nama.commentary}</p>
                )}

                {m && (
                  <div data-fit-container className="flex flex-wrap gap-1.5 font-sans text-[11px]">
                    <Chip>{m.pos}</Chip>
                    {m.gender && <Chip>{m.gender}</Chip>}
                    {ci && <Chip title={ci.sense}>{`${m.case} (${ci.sanskrit})`}</Chip>}
                    {m.number && <Chip>{m.number}</Chip>}
                    {m.declension && <Chip>{m.declension}</Chip>}
                    {m.stemIast && <Chip fit>{`stem: ${m.stemIast}`}</Chip>}
                  </div>
                )}

                {m?.note && <p className="text-[15px] italic text-ink-faint">{m.note}</p>}

                {nama.compound && (
                  <div>
                    <h4 className="eyebrow mb-2 text-ink-faint">How the compound is built</h4>
                    <CompoundTree node={nama.compound} />
                  </div>
                )}

                <div>
                  <h4 className="eyebrow mb-2 text-ink-faint">Syllables</h4>
                  <AksaraStrip aksaras={nama.aksaras} />
                </div>

                <Link
                  href={namaPath(nama.index)}
                  className="group/link inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide text-sindura hover:text-sindura-soft"
                >
                  The page for {nama.iast}, to study or share
                  <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                </Link>

                {nama.namavaliIast && (
                  <p className="border-t border-line pt-3 text-[15px] text-ink-faint">
                    <span className="eyebrow mr-2">In recitation</span>
                    <span className="deva text-lg text-sindura">
                      <HyphenatedText
                        text={nama.namavaliDeva ?? ""}
                        hyphenated={nama.namavaliHyphenated?.deva}
                      />{" "}
                      नमः
                    </span>{" "}
                    <span className="iast">
                      (
                      <HyphenatedText
                        text={nama.namavaliIast}
                        hyphenated={nama.namavaliHyphenated?.iast}
                      />{" "}
                      namaḥ)
                    </span>
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

function Chip({
  children,
  title,
  fit = false,
}: {
  children: React.ReactNode;
  title?: string;
  /** Scale down to stay on one line, for chips holding a long Sanskrit word. */
  fit?: boolean;
}) {
  const className = "rounded-sm border border-line bg-surface-0/70 px-2 py-0.5 text-ink-muted";
  if (fit) {
    return (
      <FitText container="marker" title={title} className={className}>
        {children}
      </FitText>
    );
  }
  return (
    <span title={title} className={className}>
      {children}
    </span>
  );
}
