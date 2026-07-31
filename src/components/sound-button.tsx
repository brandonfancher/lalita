"use client";

import { Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

/** Compact speaker control used next to words and letters. */
export function SoundButton({
  onPlay,
  label = "Play pronunciation",
  className,
  size = "md",
}: {
  onPlay: () => void;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onPlay();
      }}
      aria-label={label}
      title={label}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full text-gold-soft transition-colors hover:bg-gold/15 hover:text-gold",
        size === "sm" ? "h-6 w-6" : "h-8 w-8",
        className,
      )}
    >
      <Volume2 size={size === "sm" ? 13 : 15} strokeWidth={1.75} />
    </button>
  );
}
