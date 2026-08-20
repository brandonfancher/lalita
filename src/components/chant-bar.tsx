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
/** Preroll before startSec so the attack of the first syllable isn't dropped. */
const PREROLL_SEC = 0.2;
/** Poll interval for progress — YT's clock doesn't advance usefully every frame. */
const TICK_MS = 100;

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
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
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
    if (existing) {
      // Script already injected; if YT appeared between the check and now, resolve.
      if (window.YT?.Player) resolve();
      return;
    }
    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
}

function startOf(timing: ChantTiming) {
  return Math.max(0, timing.startSec - PREROLL_SEC);
}

export function ChantBar({
  timing,
  label,
  defaultLoop = false,
}: {
  timing?: ChantTiming;
  label: string;
  /** When true, loop starts on (used by the practice range page). */
  defaultLoop?: boolean;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyPromiseRef = useRef<Promise<YTPlayer | null> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopRef = useRef(defaultLoop);
  const timingRef = useRef(timing);
  const durationRef = useRef(0);
  /** True when the user asked to play before the iframe finished loading. */
  const pendingPlayRef = useRef(false);
  /** Mirrors intent so brief PAUSED events during seek don't kill the ticker. */
  const wantPlayingRef = useRef(false);
  /**
   * After a seek-to-start, YouTube's getCurrentTime() can lag on the old
   * position for a few hundred ms. Ignore end-of-verse stops until then.
   */
  const ignoreEndUntilRef = useRef(0);

  const [state, setState] = useState<PlayerState>("idle");
  const [loop, setLoop] = useState(defaultLoop);
  const [rate, setRate] = useState(1);
  const [elapsed, setElapsed] = useState(0);

  const duration = timing ? Math.max(0.1, timing.endSec - timing.startSec) : 0;

  loopRef.current = loop;
  timingRef.current = timing;
  durationRef.current = duration;

  const stopTicking = useCallback(() => {
    if (tickRef.current !== null) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  /** Watch playback position so we can stop at the end of this verse. */
  const tickOnce = useCallback(() => {
    const p = playerRef.current;
    const tmg = timingRef.current;
    if (!p || !tmg) return;

    let t: number;
    try {
      t = p.getCurrentTime();
    } catch {
      return;
    }

    const dur = durationRef.current;
    // Preroll (seek before startSec) doesn't count toward elapsed.
    const nextElapsed = Math.min(dur, Math.max(0, t - tmg.startSec));
    setElapsed(nextElapsed);

    if (t < tmg.startSec) return;

    if (t >= tmg.endSec) {
      // Seek-to-start often leaves getCurrentTime() at the old end briefly —
      // without this guard, restart/play-from-end immediately re-pauses.
      if (performance.now() < ignoreEndUntilRef.current) {
        p.seekTo(tmg.startSec, true);
        setElapsed(0);
        return;
      }
      if (loopRef.current) {
        ignoreEndUntilRef.current = performance.now() + 750;
        p.seekTo(tmg.startSec, true);
        setElapsed(0);
        return;
      }
      // Pause and pin to the boundary so YouTube's lagged clock can't keep
      // audibly rolling into the next verse after we've decided to stop.
      wantPlayingRef.current = false;
      p.pauseVideo();
      p.seekTo(tmg.endSec, true);
      setState("paused");
      setElapsed(dur);
      stopTicking();
    }
  }, [stopTicking]);

  const startTicking = useCallback(() => {
    stopTicking();
    tickOnce();
    tickRef.current = setInterval(tickOnce, TICK_MS);
  }, [stopTicking, tickOnce]);

  useEffect(() => () => stopTicking(), [stopTicking]);

  // Reset when navigating between shlokas.
  useEffect(() => {
    pendingPlayRef.current = false;
    wantPlayingRef.current = false;
    setState(playerRef.current ? "paused" : "idle");
    setElapsed(0);
    stopTicking();
    playerRef.current?.pauseVideo();
  }, [timing?.startSec, timing?.endSec, stopTicking]);

  const ensurePlayer = useCallback(async (): Promise<YTPlayer | null> => {
    if (playerRef.current) return playerRef.current;
    if (readyPromiseRef.current) return readyPromiseRef.current;
    if (!holderRef.current) return null;

    setState((s) => (s === "playing" ? s : "loading"));

    readyPromiseRef.current = (async () => {
      await loadYouTubeApi();
      if (!window.YT?.Player || !holderRef.current) return null;

      return new Promise<YTPlayer | null>((resolve) => {
        const player = new window.YT!.Player(holderRef.current!, {
          videoId: YT_ID,
          width: 320,
          height: 180,
          playerVars: {
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            fs: 0,
            // Origin helps some mobile browsers keep the iframe in a playable state.
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: () => {
              playerRef.current = player;
              resolve(player);
            },
            onError: () => {
              resolve(null);
            },
            onStateChange: (e: { data: number }) => {
              const YT = window.YT;
              if (!YT) return;
              // Seek/buffer often emits a brief PAUSED — only trust PLAYING from YT,
              // and ignore PAUSED unless we actually intended to stop.
              if (e.data === YT.PlayerState.PLAYING) {
                setState("playing");
                if (wantPlayingRef.current) startTicking();
              } else if (
                e.data === YT.PlayerState.PAUSED &&
                !wantPlayingRef.current
              ) {
                setState((s) => (s === "loading" ? s : "paused"));
                stopTicking();
                tickOnce();
              }
            },
          },
        });
      });
    })();

    const player = await readyPromiseRef.current;
    if (!player) {
      readyPromiseRef.current = null;
      setState("idle");
    }
    return player;
  }, [startTicking, stopTicking, tickOnce]);

  // Warm the iframe as soon as the bar mounts so the first play click stays
  // inside a user gesture (critical on iOS) and getCurrentTime stays live.
  useEffect(() => {
    if (!timing) return;
    void ensurePlayer().then((p) => {
      if (!p || !timing) return;
      try {
        p.seekTo(startOf(timing), true);
        p.pauseVideo();
      } catch {
        /* player may not accept seeks until fully cued */
      }
      setState((s) => (s === "loading" ? "paused" : s));
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        wantPlayingRef.current = true;
        p.setPlaybackRate(rate);
        p.playVideo();
        setState("playing");
        startTicking();
      }
    });
    // Only warm once per mount / timing identity; rate is read from closure on pending play.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional warm-on-mount
  }, [timing?.startSec, timing?.endSec]);

  useEffect(() => {
    return () => {
      stopTicking();
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      readyPromiseRef.current = null;
    };
  }, [stopTicking]);

  const playFromStart = (p: YTPlayer, tmg: ChantTiming) => {
    wantPlayingRef.current = true;
    ignoreEndUntilRef.current = performance.now() + 750;
    p.seekTo(startOf(tmg), true);
    p.setPlaybackRate(rate);
    p.playVideo();
    setElapsed(0);
    setState("playing");
    startTicking();
  };

  const play = async () => {
    if (!timing) return;

    const existing = playerRef.current;
    if (!existing) {
      // First tap while the iframe is still booting: remember intent so onReady
      // can start playback without requiring another press (mobile).
      pendingPlayRef.current = true;
      wantPlayingRef.current = true;
      setState("loading");
      const p = await ensurePlayer();
      if (!p || !timing) {
        pendingPlayRef.current = false;
        wantPlayingRef.current = false;
        setState("idle");
        return;
      }
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        playFromStart(p, timing);
      }
      return;
    }

    pendingPlayRef.current = false;
    let t = 0;
    try {
      t = existing.getCurrentTime();
    } catch {
      t = 0;
    }
    const outside = t < timing.startSec || t >= timing.endSec;
    const atEnd = elapsed >= duration - 0.05;
    if (outside || atEnd) {
      playFromStart(existing, timing);
      return;
    }

    wantPlayingRef.current = true;
    existing.setPlaybackRate(rate);
    existing.playVideo();
    setState("playing");
    startTicking();
  };

  const pause = () => {
    pendingPlayRef.current = false;
    wantPlayingRef.current = false;
    playerRef.current?.pauseVideo();
    setState("paused");
    stopTicking();
    tickOnce();
  };

  const restart = async () => {
    if (!timing) return;

    // Ensure the player exists even if the user never hit play (restart used to
    // no-op when playerRef was null).
    const p = playerRef.current ?? (await ensurePlayer());
    if (!p) return;

    ignoreEndUntilRef.current = performance.now() + 750;
    p.seekTo(startOf(timing), true);
    setElapsed(0);

    if (wantPlayingRef.current || state === "playing") {
      // Already playing — seek is enough; keep the tick alive.
      wantPlayingRef.current = true;
      startTicking();
      return;
    }

    // When stopped/paused, begin from the top so restart isn't a silent no-op
    // (seek alone often does nothing on a suspended mobile player).
    wantPlayingRef.current = true;
    p.setPlaybackRate(rate);
    p.playVideo();
    setState("playing");
    startTicking();
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
    <div className="relative rounded-2xl border border-line bg-surface-1/70 p-3">
      {/*
        Keep a real-sized iframe off-screen. A 0×0 / display:none host makes
        mobile browsers suspend the player (multi-tap to play, frozen progress,
        dead seeks when paused).
      */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-10 h-[180px] w-[320px] opacity-[0.01]"
        style={{ transform: "translate(-100%, -100%)" }}
      >
        <div ref={holderRef} className="h-full w-full" />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={state === "playing" ? pause : () => void play()}
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
              className="h-full rounded-full bg-gradient-to-r from-sindura to-gold"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => void restart()}
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
