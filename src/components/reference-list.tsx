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
    <ul className="border-t border-line-strong">
      {references.map((ref, i) => {
        const Icon = ICONS[ref.kind] ?? Globe;
        const href =
          ref.url && ref.startSec !== undefined && ref.url.includes("you")
            ? `${ref.url}${ref.url.includes("?") ? "&" : "?"}t=${Math.floor(ref.startSec)}`
            : ref.url;

        const body = (
          <>
            <Icon size={16} className="mt-1 shrink-0 text-gold" strokeWidth={1.5} />
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[1.05rem] text-ink group-hover:text-sindura">{ref.title}</span>
                {href && <ExternalLink size={11} className="shrink-0 text-ink-faint" />}
              </span>
              {ref.author && <span className="block text-[15px] italic text-ink-muted">{ref.author}</span>}
              {ref.note && <span className="mt-1 block text-[15px] leading-snug text-ink-faint">{ref.note}</span>}
            </span>
          </>
        );

        return (
          <li key={i} className="border-b border-line">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-3 px-2 py-3.5 transition-colors hover:bg-surface-1/70"
              >
                {body}
              </a>
            ) : (
              <div className="flex gap-3 px-2 py-3.5">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
