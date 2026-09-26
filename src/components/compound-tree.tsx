"use client";

import { FitText } from "@/components/fit-text";
import type { CompoundNode } from "@/lib/types";
import { COMPOUND_LABELS, cn } from "@/lib/utils";

/**
 * Diagrams a compound (samāsa) as a tree.
 *
 * Nearly every name in this text is a compound in the feminine nominative
 * singular, so the interesting grammar is not inflection but how the pieces
 * bind together. Each internal node names the compound type and gives the
 * vigraha, the traditional paraphrase that unpacks it into separate words.
 */
export function CompoundTree({ node, depth = 0 }: { node: CompoundNode; depth?: number }) {
  const label = node.type ? COMPOUND_LABELS[node.type] : undefined;
  const isLeaf = !node.children?.length;

  return (
    <div className={cn(depth > 0 && "border-l border-line pl-4")}>
      <div
        className={cn(
          "relative rounded-sm border px-3 py-2",
          depth === 0
            ? "border-sindura/35 bg-sindura/[0.06]"
            : isLeaf
              ? "border-line bg-surface-0/60"
              : "border-line-strong bg-surface-1/80",
        )}
      >
        {depth > 0 && (
          <span
            aria-hidden
            className="absolute -left-4 top-1/2 h-px w-4 bg-line"
          />
        )}
        <div data-fit-container className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <FitText container="marker" className="deva text-xl text-ink">
            {node.text}
          </FitText>
          <FitText container="marker" className="iast text-[15px] text-gold-soft">
            {node.iast}
          </FitText>
          {label && (
            <span
              title={label.sense}
              className="eyebrow rounded-sm bg-lotus/10 px-2 py-0.5 text-[10px] text-lotus"
            >
              {label.name}
            </span>
          )}
        </div>

        {node.gloss && <p className="mt-1 text-[15px] text-ink-muted">{node.gloss}</p>}

        {node.vigraha && (
          <p className="mt-1.5 border-l-2 border-gold/40 pl-2 text-[15px] text-ink-faint">
            <span className="font-sans text-[11px] uppercase tracking-wider text-gold">vigraha </span>
            <span className="iast">{node.vigraha}</span>
          </p>
        )}

        {label && depth === 0 && (
          <p className="mt-2 text-[13px] italic leading-relaxed text-ink-faint">{label.sense}</p>
        )}
      </div>

      {node.children?.length ? (
        <div className="mt-2 space-y-2">
          {node.children.map((child, i) => (
            <CompoundTree key={`${child.iast}-${i}`} node={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
