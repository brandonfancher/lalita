"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { cn, toDevanagariDigits } from "@/lib/utils";

export type NavEntry = {
  id: string;
  title: string;
  number: number | null;
  namaRange?: [number, number];
};

const hrefFor = (id: string) => `/shloka/${id}`;

/**
 * Reading-order navigation pinned to the top of a shloka page.
 *
 * Previous and next are fixed-width and anchored to the edges, so repeated
 * clicks land on the same spot as the pages change underneath. The centre
 * opens a jump grid for going straight to any shloka, and ← / → step through
 * from the keyboard.
 *
 * Steps are counted from the last shloka *requested*, not the one on screen,
 * so clicking faster than pages arrive still moves one shloka per click.
 */
export function ShlokaNav({ currentId, entries }: { currentId: string; entries: NavEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<{ origin: number; index: number } | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const restoreScrollRef = useRef<number | null>(null);

  const position = entries.findIndex((e) => e.id === currentId);
  // A request is still in flight while the page on screen sits between where
  // the clicking started and where it is headed. Anything else (arrival, the
  // browser's back button) means the page is authoritative again.
  const inFlight =
    pending !== null &&
    pending.index !== position &&
    position >= Math.min(pending.origin, pending.index) &&
    position <= Math.max(pending.origin, pending.index);
  const shown = inFlight ? pending.index : position;

  const current = entries[shown];
  const prev = shown > 0 ? entries[shown - 1] : null;
  const next = shown < entries.length - 1 ? entries[shown + 1] : null;

  const step = (delta: -1 | 1) => {
    const index = shown + delta;
    if (index < 0 || index >= entries.length) return;
    setPending({ origin: inFlight ? pending.origin : position, index });
    // Scroll no further up than where the bar sticks, so it stays at the same
    // spot on screen and the next click lands on the same button.
    const anchor = anchorRef.current;
    const stickAt = anchor ? anchor.getBoundingClientRect().top + window.scrollY : 0;
    restoreScrollRef.current = Math.min(window.scrollY, stickAt);
    router.push(hrefFor(entries[index].id), { scroll: false });
  };

  useLayoutEffect(() => {
    if (restoreScrollRef.current === null) return;
    window.scrollTo(0, restoreScrollRef.current);
    restoreScrollRef.current = null;
  }, [currentId]);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const el = e.target as HTMLElement | null;
    if (el?.closest("input, textarea, select, [contenteditable='true']")) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    step(e.key === "ArrowLeft" ? -1 : 1);
  });

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const progress = entries.length > 1 ? (shown / (entries.length - 1)) * 100 : 0;

  return (
    <>
      <div ref={anchorRef} aria-hidden />
      <nav
        aria-label="Shloka navigation"
        className="sticky top-0 z-40 border-b border-line bg-surface-0/85 backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-6">
          <StepLink direction="prev" target={prev} onStep={() => step(-1)} />

          <div className="flex min-w-0 flex-1 justify-center">
            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Trigger asChild>
                <button
                  type="button"
                  className="group flex h-10 min-w-0 items-center gap-2.5 rounded-md px-3 transition-colors hover:bg-surface-1 data-[state=open]:bg-surface-1"
                  aria-label={`${current.title}. Jump to another shloka`}
                >
                  <span className="deva text-[1.35rem] leading-none text-sindura">
                    {current.number === null ? "ॐ" : toDevanagariDigits(current.number)}
                  </span>
                  <span className="truncate font-sans text-sm font-medium text-ink">
                    {current.title}
                  </span>
                  {current.namaRange && (
                    <span className="numerals hidden truncate text-[15px] italic text-ink-faint md:inline">
                      names {current.namaRange[0]}&ndash;{current.namaRange[1]}
                    </span>
                  )}
                  <ChevronDown
                    size={14}
                    className="shrink-0 text-ink-faint transition-transform group-data-[state=open]:rotate-180"
                  />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  sideOffset={8}
                  align="center"
                  collisionPadding={12}
                  className="z-50 w-[min(94vw,25rem)] rounded-md border border-line-strong bg-surface-0 p-3 shadow-[0_24px_60px_-20px_rgba(40,20,10,0.45)]"
                >
                  <JumpPanel
                    currentId={current.id}
                    entries={entries}
                    onPick={() => {
                      setPending(null);
                      setOpen(false);
                    }}
                    onGo={(id) => {
                      setPending(null);
                      setOpen(false);
                      router.push(hrefFor(id));
                    }}
                  />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <StepLink direction="next" target={next} onStep={() => step(1)} />
        </div>

        <div aria-hidden className="absolute inset-x-0 -bottom-px h-px">
          <div
            className="h-full bg-sindura/70 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </nav>
    </>
  );
}

function StepLink({
  direction,
  target,
  onStep,
}: {
  direction: "prev" | "next";
  target: NavEntry | null;
  onStep: () => void;
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const base =
    "flex h-10 w-11 shrink-0 items-center gap-2 rounded-md border px-2.5 font-sans sm:w-44";

  if (!target) {
    return <span aria-hidden className={cn(base, "invisible border-transparent")} />;
  }

  return (
    <Link
      href={hrefFor(target.id)}
      onNavigate={(e) => {
        e.preventDefault();
        onStep();
      }}
      aria-label={`${isPrev ? "Previous" : "Next"}: ${target.title}`}
      aria-keyshortcuts={isPrev ? "ArrowLeft" : "ArrowRight"}
      title={`${isPrev ? "Previous" : "Next"} (${isPrev ? "←" : "→"})`}
      className={cn(
        base,
        "group border-line bg-surface-1/50 text-ink transition-colors hover:border-line-strong hover:bg-surface-1 active:bg-surface-2",
        isPrev
          ? "justify-center sm:justify-start"
          : "flex-row-reverse justify-center sm:justify-start",
      )}
    >
      <Icon
        size={18}
        className={cn(
          "shrink-0 text-sindura transition-transform",
          isPrev ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
      />
      <span className={cn("hidden min-w-0 flex-col leading-none sm:flex", !isPrev && "items-end")}>
        <span className="eyebrow text-[0.6rem] text-ink-faint">{isPrev ? "Previous" : "Next"}</span>
        <span className="mt-1 truncate text-[13px] font-medium">{target.title}</span>
      </span>
    </Link>
  );
}

function JumpPanel({
  currentId,
  entries,
  onPick,
  onGo,
}: {
  currentId: string;
  entries: NavEntry[];
  onPick: () => void;
  onGo: (id: string) => void;
}) {
  const [value, setValue] = useState("");
  const currentRef = useRef<HTMLAnchorElement>(null);
  const dhyana = entries.filter((e) => e.number === null);
  const shlokas = entries.filter((e) => e.number !== null);
  const max = shlokas.length;

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center" });
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = Number.parseInt(value, 10);
    if (!Number.isFinite(n) || n < 0 || n > max) return;
    onGo(String(n).padStart(3, "0"));
  };

  return (
    <div className="font-sans">
      <form onSubmit={submit} className="mb-3 flex items-center gap-2">
        <label htmlFor="jump-to" className="eyebrow shrink-0 text-ink-faint">
          Go to
        </label>
        <input
          id="jump-to"
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`0–${max}`}
          className="min-w-0 flex-1 rounded-md border border-line bg-surface-1 px-2.5 py-1.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-sindura/60"
        />
        <button
          type="submit"
          className="rounded-md bg-sindura px-3 py-1.5 text-sm font-medium text-on-sindura transition-opacity hover:opacity-90"
        >
          Go
        </button>
      </form>

      <div className="max-h-[min(60vh,26rem)] overflow-y-auto pr-1">
        {dhyana.map((e) => (
          <Link
            key={e.id}
            ref={e.id === currentId ? currentRef : undefined}
            href={hrefFor(e.id)}
            onNavigate={onPick}
            aria-current={e.id === currentId ? "page" : undefined}
            className={cn(
              "mb-1.5 flex h-8 items-center justify-center gap-2 rounded text-sm transition-colors",
              e.id === currentId
                ? "bg-sindura text-on-sindura"
                : "bg-surface-1 text-ink hover:bg-surface-2",
            )}
          >
            <span className="deva leading-none">ॐ</span> {e.title}
          </Link>
        ))}
        <div className="grid grid-cols-10 gap-1">
          {shlokas.map((e) => {
            const active = e.id === currentId;
            return (
              <Link
                key={e.id}
                ref={active ? currentRef : undefined}
                href={hrefFor(e.id)}
                onNavigate={onPick}
                aria-label={e.title}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "grid h-8 place-items-center rounded text-[12px] tabular-nums transition-colors",
                  active
                    ? "bg-sindura font-semibold text-on-sindura"
                    : "text-ink-muted hover:bg-surface-2 hover:text-ink",
                  !active && (e.number ?? 0) % 10 === 0 && "text-ink",
                )}
              >
                {e.number}
              </Link>
            );
          })}
        </div>
      </div>
      <p className="mt-2.5 border-t border-line pt-2 text-[11px] text-ink-faint">
        Tip: use the <kbd className="font-sans">←</kbd> and <kbd className="font-sans">→</kbd> keys
        to step through shlokas.
      </p>
    </div>
  );
}
