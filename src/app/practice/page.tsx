import { PracticeSession, type PracticeVerse } from "@/components/practice-session";
import { getModulesInRange } from "@/lib/content";
import type { ChantTiming, StudyModule } from "@/lib/types";
import { practiceLabel } from "@/lib/utils";

export const metadata = {
  title: "Practice",
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

function toPracticeVerse(mod: StudyModule): PracticeVerse {
  const namasByIndex = new Map(mod.namas.map((n) => [n.index, n.gloss]));

  return {
    id: mod.id,
    number: Number(mod.id),
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
          ...(glosses.length > 0 ? { glosses } : {}),
        };
      }),
    })),
  };
}

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[]; to?: string | string[] }>;
}) {
  const params = await searchParams;
  const fromRaw = parseBound(params.from, DEFAULT_FROM);
  const toRaw = parseBound(params.to, DEFAULT_TO);
  const from = Math.min(fromRaw, toRaw);
  const to = Math.max(fromRaw, toRaw);

  const modules = getModulesInRange(from, to);
  const timing = rangeTiming(modules);
  const verses = modules.map(toPracticeVerse);
  const playerLabel =
    from === to ? practiceLabel(from) : `${practiceLabel(from)} – ${practiceLabel(to)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
      <header className="mb-8">
        <h1 className="display text-3xl font-medium text-ink sm:text-4xl">Practice</h1>
        <p className="mt-2 max-w-2xl text-[15px] text-ink-muted">
          Choose an inclusive range, play the chant on loop, and keep the text in view. Open any
          shloka in a new tab when you want the full study page.
        </p>
      </header>

      <PracticeSession
        from={from}
        to={to}
        verses={verses}
        timing={timing}
        playerLabel={playerLabel}
      />
    </div>
  );
}
