import { cookies } from "next/headers";

import { ChantSession, type ChantVerse } from "@/components/chant-session";
import { hasArtwork, ShlokaMiniature } from "@/components/shloka-art";
import { getModulesInRange } from "@/lib/content";
import { CHANT_RANGE_COOKIE, parseChantRange } from "@/lib/chant-range";
import type { ChantTiming, StudyModule } from "@/lib/types";
import { chantLabel } from "@/lib/utils";

export const metadata = {
  title: "Chant",
  description: "Chant a contiguous range of shlokas, including the dhyāna as Shloka 0.",
};

const MIN = 0;
const MAX = 182;
const DEFAULT_FROM = 1;
const DEFAULT_TO = 3;

function parseBound(raw: string | string[] | undefined, fallback: number): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const n = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(MAX, Math.max(MIN, n));
}

function rangeTiming(modules: StudyModule[]): ChantTiming | undefined {
  const first = modules[0]?.chant;
  const last = modules[modules.length - 1]?.chant;
  if (!first || !last) return undefined;
  return { startSec: first.startSec, endSec: last.endSec };
}

function toChantVerse(mod: StudyModule): ChantVerse {
  const namasByIndex = new Map(mod.namas.map((n) => [n.index, n.gloss]));

  return {
    id: mod.id,
    number: Number(mod.id),
    ...(hasArtwork(mod.id) ? { art: <ShlokaMiniature id={mod.id} className="w-full" /> } : {}),
    lines: mod.lines.map((line) => ({
      tokens: line.tokens.map((token) => {
        const glosses: string[] = [];
        if (token.namaIndices?.length) {
          for (const i of token.namaIndices) {
            const gloss = namasByIndex.get(i);
            if (gloss) glosses.push(gloss);
          }
        } else if (token.word?.gloss) {
          glosses.push(token.word.gloss);
        }
        return {
          id: token.id,
          deva: token.deva,
          iast: token.iast,
          ...(token.hyphenated ? { hyphenated: token.hyphenated } : {}),
          ...(glosses.length > 0 ? { glosses } : {}),
        };
      }),
    })),
  };
}

export default async function ChantPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[]; to?: string | string[] }>;
}) {
  const params = await searchParams;
  const remembered =
    params.from === undefined && params.to === undefined
      ? parseChantRange((await cookies()).get(CHANT_RANGE_COOKIE)?.value)
      : null;
  const fromRaw = parseBound(remembered?.from ?? params.from, DEFAULT_FROM);
  const toRaw = parseBound(remembered?.to ?? params.to, DEFAULT_TO);
  const from = Math.min(fromRaw, toRaw);
  const to = Math.max(fromRaw, toRaw);

  const modules = getModulesInRange(from, to);
  const timing = rangeTiming(modules);
  const verses = modules.map(toChantVerse);
  const playerLabel =
    from === to ? chantLabel(from) : `${chantLabel(from)} – ${chantLabel(to)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-8">
        <p className="eyebrow text-sindura">Pārāyaṇa</p>
        <h1 className="display mt-2 text-[2.6rem] leading-tight text-ink sm:text-[3.25rem]">
          Chant
        </h1>
        <p className="mt-3 max-w-2xl text-[1.1rem] leading-relaxed text-ink-muted">
          Choose an inclusive range, play the chant on loop, and keep the text in view. Open any
          shloka in a new tab when you want the full study page.
        </p>
      </header>

      <ChantSession
        from={from}
        to={to}
        verses={verses}
        timing={timing}
        playerLabel={playerLabel}
      />
    </div>
  );
}
