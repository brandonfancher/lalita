"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play, Repeat, RotateCcw } from "lucide-react";

import type { ChantTiming } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

/**
 * Plays a single shloka from the recording.
 *
 * Playback is driven through YouTube's embed player, seeked to this verse's
 * timestamps and stopped at its end. That keeps the audio coming from the
 * original performance, properly attributed to the artists, rather than
 * rehosting their recording.
 */

const YT_ID = "zgG-gjioU1g";
const PERFORMERS = "Ranjani \u2013 Gayatri";

type PlayerState = "idle" | "loading" | "playing" | "paused";

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  setPlaybackRate(rate: number): void;
  destroy(): void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** Load the IFrame API once per page. */
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const existing = document.getElementById("yt-iframe-api");
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (existing) return;
    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
}

export function ChantBar({ timing, label }: { timing?: ChantTiming; label: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const rafRef = useRef<number | null>(null);

  const [state, setState] = useState<PlayerState>("idle");
  const [loop, setLoop] = useState(false);
  const [rate, setRate] = useState(1);
  const [elapsed, setElapsed] = useState(0);

  const duration = timing ? Math.max(0.1, timing.endSec - timing.startSec) : 0;

  const stopTicking = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  /** Watch playback position so we can stop at the end of this verse. */
  const tick = useCallback(() => {
    const p = playerRef.current;
    if (!p || !timing) return;
    const t = p.getCurrentTime();
    // Preroll (seek before startSec) doesn't count toward elapsed.
    setElapsed(Math.min(duration, Math.max(0, t - timing.startSec)));

    if (t < timing.startSec) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    if (t >= timing.endSec) {
      if (loop) {
        p.seekTo(timing.startSec, true);
      } else {
        // Pause and pin to the boundary so YouTube's lagged clock can't keep
        // audibly rolling into the next verse after we've decided to stop.
        p.pauseVideo();
        p.seekTo(timing.endSec, true);
        setState("paused");
        setElapsed(duration);
        stopTicking();
        return;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [duration, loop, timing]);

  useEffect(() => stopTicking, []);

  // Reset when navigating between shlokas.
  useEffect(() => {
    setState("idle");
    setElapsed(0);
    stopTicking();
    playerRef.current?.pauseVideo();
  }, [timing?.startSec]);

  const ensurePlayer = useCallback(async () => {
    if (playerRef.current || !holderRef.current) return playerRef.current;
    setState("loading");
    await loadYouTubeApi();
    if (!window.YT?.Player || !holderRef.current) return null;

    return new Promise<YTPlayer | null>((resolve) => {
      const player = new window.YT!.Player(holderRef.current!, {
        videoId: YT_ID,
        playerVars: { controls: 0, disablekb: 1, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: () => {
            playerRef.current = player;
            resolve(player);
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === window.YT?.PlayerState.PAUSED) setState("paused");
          },
        },
      });
    });
  }, []);

  const play = async () => {
    if (!timing) return;
    const p = playerRef.current ?? (await ensurePlayer());
    if (!p) {
      setState("idle");
      return;
    }
    const t = p.getCurrentTime();
    const outside = t < timing.startSec || t >= timing.endSec;
    // Seek a brief preroll before the boundary: YouTube often drops the attack
    // of the first syllable when play() follows seekTo(start) immediately.
    const seekTarget =
      outside || elapsed >= duration
        ? Math.max(0, timing.startSec - 0.2)
        : t;
    p.seekTo(seekTarget, true);
    p.setPlaybackRate(rate);
    p.playVideo();
    setState("playing");
    stopTicking();
    rafRef.current = requestAnimationFrame(tick);
  };

  const pause = () => {
    playerRef.current?.pauseVideo();
    setState("paused");
    stopTicking();
  };

  const restart = () => {
    if (!timing || !playerRef.current) return;
    playerRef.current.seekTo(Math.max(0, timing.startSec - 0.2), true);
    setElapsed(0);
    if (state !== "playing") void play();
  };

  const changeRate = (r: number) => {
    setRate(r);
    playerRef.current?.setPlaybackRate(r);
  };

  if (!timing) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface-1/40 px-4 py-3 text-sm text-ink-faint">
        Chant audio for this shloka is not mapped yet.
      </div>
    );
  }

  const pct = duration ? (elapsed / duration) * 100 : 0;

  return (
    <div className="rounded-2xl border border-line bg-surface-1/70 p-3">
      {/* The player is present but visually hidden; only audio is wanted. */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <div ref={holderRef} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={state === "playing" ? pause : play}
          aria-label={state === "playing" ? "Pause" : `Play ${label}`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sindura to-lotus text-white shadow-lg transition-transform active:scale-95"
        >
          {state === "loading" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : state === "playing" ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <span className="truncate text-[13px] text-ink">{label}</span>
            <span className="shrink-0 font-mono text-[11px] text-ink-faint">
              {formatTime(elapsed)} / {formatTime(duration)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sindura to-gold transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={restart}
            aria-label="Restart this shloka"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={() => setLoop((v) => !v)}
            aria-label="Loop this shloka"
            aria-pressed={loop}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full transition-colors",
              loop ? "bg-gold/20 text-gold" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
            )}
          >
            <Repeat size={15} />
          </button>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 border-t border-line/60 pt-2.5">
        <span className="text-[11px] text-ink-faint">Speed</span>
        {[0.5, 0.75, 1].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => changeRate(r)}
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] transition-colors",
              rate === r ? "bg-surface-3 text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {r}&times;
          </button>
        ))}
        <a
          href={`https://youtu.be/${YT_ID}?t=${Math.floor(timing.startSec)}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto truncate text-[11px] text-ink-faint underline-offset-2 hover:text-ink hover:underline"
        >
          {PERFORMERS}
        </a>
      </div>
    </div>
  );
}
