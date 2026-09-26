"use client";

import { createContext, useContext, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Lotus } from "@/components/ornament";
import { cn } from "@/lib/utils";
import { ARTWORK } from "./registry";
import type { ArtPart, Artwork } from "./types";

export type NoteNama = { index: number; deva: string; iast: string; gloss: string };

/**
 * The way into an artwork's story: a plate caption beneath it on wide
 * screens, a small badge in the header corner elsewhere. Either opens a plate
 * that shows the artwork at full strength beside what each part of it means.
 */
export function ArtNote({ id, namas }: { id: string; namas: NoteNama[] }) {
  const [open, setOpen] = useState(false);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const artwork = ARTWORK[id];
  if (!artwork) return null;

  const openFrom = (el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setOpen(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div className="relative mx-auto max-w-6xl">
          <button
            type="button"
            data-art-trigger
            aria-haspopup="dialog"
            aria-label="About the artwork on this page"
            onClick={(e) => openFrom(e.currentTarget)}
            className="pointer-events-auto absolute right-3 top-3 flex items-center gap-2 rounded-full bg-surface-0/70 p-1 text-ink-muted shadow-[inset_0_0_0_1px_var(--border-strong),0_6px_18px_-12px_rgba(40,20,10,0.5)] backdrop-blur-sm transition-[color,box-shadow] hover:text-ink hover:shadow-[inset_0_0_0_1px_var(--gold),0_6px_18px_-12px_rgba(40,20,10,0.5)] sm:right-6 sm:pr-3.5 xl:hidden"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-1 text-sindura">
              <ArchGlyph />
            </span>
            <span className="eyebrow hidden sm:inline">The artwork</span>
          </button>

          {/* Centred beneath the throne of the backdrop, which sits 12.5rem in from the right. */}
          <button
            type="button"
            data-art-trigger
            aria-haspopup="dialog"
            onClick={(e) => openFrom(e.currentTarget)}
            className="group pointer-events-auto absolute right-[4.5rem] top-[51.5rem] hidden w-64 flex-col items-center gap-1.5 rounded-sm py-1 text-center xl:flex"
          >
            <span className="eyebrow flex items-center gap-2 text-gold">
              <span aria-hidden className="h-px w-6 bg-gold/50" />
              Alaṅkāra
              <span aria-hidden className="h-px w-6 bg-gold/50" />
            </span>
            <span className="display text-[1.05rem] italic text-ink-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors group-hover:text-ink group-hover:decoration-sindura">
              What the artwork depicts
            </span>
          </button>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="art-overlay fixed inset-0 z-50 bg-[rgb(20_12_7/0.5)] backdrop-blur-[2px]" />
        <Dialog.Content
          ref={contentRef}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            contentRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            lastTrigger.current?.focus();
          }}
          className="art-dialog fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-xl border-t bg-surface-0 shadow-[0_-20px_60px_-20px_rgba(40,20,10,0.5)] outline-none md:inset-auto md:left-1/2 md:top-1/2 md:grid md:h-[min(88dvh,44rem)] md:max-h-none md:w-[min(94vw,60rem)] md:-translate-x-1/2 md:-translate-y-1/2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:rounded-sm md:border md:shadow-[0_30px_80px_-30px_rgba(40,20,10,0.6)]"
        >
          <Plate id={id} artwork={artwork} namas={namas} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type Aim = (part: ArtPart) => {
  "data-aim": ArtPart;
  "aria-pressed": boolean;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
  onFocus: (e: React.FocusEvent<HTMLElement>) => void;
  onClick: () => void;
};

const AimContext = createContext<{ aim: Aim; active: ArtPart | null } | null>(null);

/** A phrase in the note that points at part of the artwork. */
function Spot({ part, children }: { part: ArtPart; children: ReactNode }) {
  const ctx = useContext(AimContext);
  if (!ctx) return <>{children}</>;
  return (
    <button
      type="button"
      {...ctx.aim(part)}
      className={cn(
        "rounded-[0.2em] text-ink underline decoration-gold/70 decoration-dotted decoration-1 underline-offset-4 transition-colors",
        ctx.active === part && "bg-gold/15 decoration-sindura",
      )}
    >
      {children}
    </button>
  );
}

function Plate({ id, artwork, namas }: { id: string; artwork: Artwork; namas: NoteNama[] }) {
  // Hover previews a part; a click, tap, or keyboard focus holds it.
  const [hover, setHover] = useState<ArtPart | null>(null);
  const [held, setHeld] = useState<ArtPart | null>(null);
  const active = hover ?? held;
  const listRef = useRef<HTMLDivElement>(null);
  const { Art } = artwork;

  const aim: Aim = (part) => ({
    "data-aim": part,
    "aria-pressed": held === part,
    onPointerEnter: (e) => e.pointerType === "mouse" && setHover(part),
    onPointerLeave: (e) => e.pointerType === "mouse" && setHover(null),
    onFocus: (e) => e.currentTarget.matches(":focus-visible") && setHeld(part),
    onClick: () => setHeld((h) => (h === part ? null : part)),
  });

  const order: ArtPart[] = [
    ...artwork.names.map((n) => n.part),
    ...(artwork.detail ? [artwork.detail.part] : []),
  ];

  // ← and → walk the names. Handling them here also keeps them from turning the page.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const from = active ? order.indexOf(active) : -1;
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = order[(from + step + order.length) % order.length] ?? order[0];
    setHeld(next);
    listRef.current?.querySelector<HTMLElement>(`[data-aim="${next}"]`)?.focus();
  };

  return (
    <AimContext.Provider value={{ aim, active }}>
      <div className="contents" onKeyDown={onKeyDown}>
        <div className="relative flex h-[36dvh] shrink-0 items-center justify-center border-b border-line bg-surface-1 p-4 shadow-[inset_0_0_0_6px_var(--surface-0),inset_0_0_0_7px_var(--border)] md:h-auto md:border-b-0 md:border-r md:p-10">
          <div aria-hidden className="adornment art-plate aspect-[640/830] h-full max-w-full md:h-auto md:w-full md:max-w-[24rem]">
            <Art idPrefix={`plate-${id}`} active={active} />
          </div>
        </div>

        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-8 md:px-10 md:py-10">
          <p className="eyebrow mb-2 flex items-center gap-2 text-sindura">
            <span aria-hidden className="h-px w-6 bg-sindura/60" />
            Alaṅkāra
          </p>
          <Dialog.Title className="display pr-10 text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
            The artwork on this page
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-[1.075rem] leading-[1.7] text-ink-muted">
            {artwork.intro(Spot)}
          </Dialog.Description>

          <p className="mt-5 text-sm italic text-ink-faint">
            <span className="hidden [@media(hover:hover)]:inline">Hover over a name to find it in the artwork.</span>
            <span className="[@media(hover:hover)]:hidden">Tap a name to find it in the artwork.</span>
          </p>

          <ol className="mt-3 border-t border-line">
            {artwork.names.map(({ nama, part, depicts }) => {
              const n = namas.find((x) => x.index === nama);
              if (!n) return null;
              return (
                <li key={nama} className="border-b border-line">
                  <button
                    type="button"
                    {...aim(part)}
                    className={cn(
                      "block w-full py-4 pl-4 pr-2 text-left transition-[background-color,box-shadow] focus-visible:bg-surface-1 focus-visible:outline-none",
                      active === part
                        ? "bg-surface-1 shadow-[inset_2px_0_0_var(--sindura)]"
                        : "hover:bg-surface-1/60",
                    )}
                  >
                    <span className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="eyebrow text-sindura">Nāma {n.index}</span>
                      <span className="deva text-[1.3rem] leading-snug text-ink">{n.deva}</span>
                      <span className="iast text-[1rem] italic text-gold-soft">{n.iast}</span>
                    </span>
                    <span className="mt-0.5 block text-[0.95rem] italic text-ink-faint">{n.gloss}</span>
                    <span className="mt-1.5 block text-[1.02rem] leading-relaxed text-ink-muted">{depicts}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          {artwork.detail && (
            <button
              type="button"
              {...aim(artwork.detail.part)}
              className={cn(
                "mt-6 flex w-full items-start gap-3 rounded-sm px-4 py-3.5 text-left text-[1.02rem] italic leading-relaxed text-ink-muted transition-[background-color,box-shadow] focus-visible:bg-surface-1 focus-visible:outline-none",
                active === artwork.detail.part
                  ? "bg-surface-1 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--sindura)_55%,transparent)]"
                  : "bg-surface-1/40 shadow-[inset_0_0_0_1px_var(--border)] hover:bg-surface-1",
              )}
            >
              <Lotus size={18} className="mt-1.5 shrink-0 text-gold" />
              <span>{artwork.detail.body}</span>
            </button>
          )}
        </div>

        <Dialog.Close
          aria-label="Close"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-0/80 text-ink-faint backdrop-blur-sm transition-colors hover:bg-surface-1 hover:text-ink"
        >
          <X size={16} />
        </Dialog.Close>
      </div>
    </AimContext.Provider>
  );
}

/** A tiny flaming arch, the shape of the artwork itself. */
function ArchGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.3}>
      <path d="M4 17V9a6 6 0 0 1 12 0v8" strokeLinecap="round" />
      <path d="M2.5 17h15" strokeLinecap="round" />
      <path
        d="M10 15.5c-1.9 0-2.6-1.4-2.2-2.8.4-1.3 1.7-2 1.9-3.9.9 1 2.8 2.4 2.5 4.4-.2 1.4-1 2.3-2.2 2.3Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
