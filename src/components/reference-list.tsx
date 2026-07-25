import { BookMarked, ExternalLink, Film, Globe, Headphones, Library, ScrollText } from "lucide-react";

import type { Reference, ReferenceKind } from "@/lib/types";

const ICONS: Record<ReferenceKind, typeof Globe> = {
  text: ScrollText,
  book: BookMarked,
  article: Library,
  video: Film,
  audio: Headphones,
  website: Globe,
  dictionary: Library,
};

export function ReferenceList({ references }: { references: Reference[] }) {
  return (
    <ul className="space-y-2">
      {references.map((ref, i) => {
        const Icon = ICONS[ref.kind] ?? Globe;
        const href =
          ref.url && ref.startSec !== undefined && ref.url.includes("you")
            ? `${ref.url}${ref.url.includes("?") ? "&" : "?"}t=${Math.floor(ref.startSec)}`
            : ref.url;

        const body = (
          <>
            <Icon size={15} className="mt-0.5 shrink-0 text-gold" />
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[15px] text-ink">{ref.title}</span>
                {href && <ExternalLink size={11} className="shrink-0 text-ink-faint" />}
              </span>
              {ref.author && <span className="block text-[13px] text-ink-muted">{ref.author}</span>}
              {ref.note && <span className="mt-0.5 block text-[13px] text-ink-faint">{ref.note}</span>}
            </span>
          </>
        );

        return (
          <li key={i}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 rounded-xl border border-line bg-surface-1/50 px-4 py-3 transition-colors hover:border-line-strong hover:bg-surface-2/60"
              >
                {body}
              </a>
            ) : (
              <div className="flex gap-3 rounded-xl border border-line bg-surface-1/50 px-4 py-3">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
