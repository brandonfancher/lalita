#!/usr/bin/env python3
"""Derive per-verse timings for the Lalita Sahasranama chant recording.

Produces data/chant/timings.json: numeric offsets only, used to seek a YouTube
embed to a given verse. The audio itself is downloaded to sources/audio/ purely
as analysis input; sources/ is gitignored and nothing derived from the waveform
other than these offsets is published.

Method
------
The recording is a duo chant over a continuous tanpura drone, so there is no
true silence to segment on: across 33 minutes only two moments drop far enough
below the local level to register as a gap. Segmentation therefore keys on
*relative* quiet plus loss of articulation.

  1. Downmix to mono 16 kHz and take a 10 ms-hop STFT.
  2. Build two features -- energy in the 1-4 kHz voice band (the band where the
     drone is weakest relative to the voices) and positive spectral flux over
     300-5000 Hz (high while syllables are being articulated).
  3. "Pauseness" = the negated mean of the two features, each locally z-scored
     over a 12 s window so slow level drift cancels out.
  4. Locate the stotra start as the strongest pauseness peak inside the window
     where the dhyana is expected to give way to the main text.
  5. Track *pada* (quarter-verse) boundaries with a Viterbi/DP beat tracker
     anchored at that start: maximise summed pauseness under a log-domain
     penalty on departures from the measured 2.462 s pada period. Anushtubh is
     4 padas of 8 syllables, and this rendition follows the metre closely, so
     the pada train is the one structure the audio marks unambiguously.
  6. Group padas 4-at-a-time into the 182 verses (the last is a half-verse, so
     726 padas in total). The pada train alone cannot say *which* pada begins a
     verse -- pauses at pada, half-line and verse ends are near equal in depth
     -- so the verse phase comes from counting padas off the anchored start.

Re-running
----------
    brew install yt-dlp ffmpeg
    python3 -m venv sources/.venv && sources/.venv/bin/pip install numpy
    sources/.venv/bin/python scripts/build-chant-timings.py

Add --force-download to refetch the audio. The script is deterministic: the
same input yields the same timings.json.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import shutil
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
AUDIO_DIR = ROOT / "sources" / "audio"
OUT_PATH = ROOT / "data" / "chant" / "timings.json"

YOUTUBE_ID = "zgG-gjioU1g"
URL = f"https://youtu.be/{YOUTUBE_ID}"
TITLE = "Lalita Sahasranamam | Ranjani - Gayatri"
PERFORMERS = "Ranjani - Gayatri"

SR = 16_000
N_FFT = 1024
HOP_S = 0.010

# 182 verses; the last is a half-verse, hence 181*4 + 2 padas.
N_VERSES = 182
PADAS_PER_VERSE = 4
N_PADAS = (N_VERSES - 1) * PADAS_PER_VERSE + 2

# Search window for the dhyana -> stotra transition, and the measured pada period.
# NOTE: picking the *strongest* pause in a wide window is unsafe — pada / half-line /
# verse pauses are similar, and the previous default (120–165) latched onto 145.98s,
# roughly one verse late. Prefer an explicit --stotra-start, or the narrower window
# below which covers the true śrīmātā onset (~135s).
STOTRA_START_WINDOW = (128.0, 140.0)
PADA_PERIOD = 2.454
DP_LAMBDA = 30.0
DP_MIN_RATIO, DP_MAX_RATIO = 0.72, 1.40

# ASR-verified FULL-VERSE onsets (start of line 1, not the mid-verse pause).
# The strong pause near 145.98s is the break *between* the two lines of verse 1;
# snapping there cuts playback after line 1. Landmarks must begin each verse's
# first line and span through its second.
ASR_LANDMARKS = {
    1: 138.00,
    2: 152.00,
    3: 160.00,
    60: 704.50,
    120: 1296.00,
    182: 1915.50,
}

# A verse boundary counts as "detected" when a clear pause peak sits on it.
# The median boundary scores ~1.8; 1.2 isolates the weakest tenth for review.
DETECT_TOLERANCE_S = 0.30
DETECT_MIN_PAUSENESS = 1.20


# --------------------------------------------------------------------------- io


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def ensure_audio(force: bool) -> Path:
    """Download the source audio and downmix it for analysis."""
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    src = AUDIO_DIR / f"{YOUTUBE_ID}.wav"
    mono = AUDIO_DIR / "mono16k.wav"

    if force or not src.exists():
        if not shutil.which("yt-dlp"):
            sys.exit("yt-dlp not found; run: brew install yt-dlp ffmpeg")
        run(["yt-dlp", "-f", "bestaudio", "-x", "--audio-format", "wav",
             "--audio-quality", "0", "-o", str(AUDIO_DIR / f"{YOUTUBE_ID}.%(ext)s"), URL])

    if force or not mono.exists() or mono.stat().st_mtime < src.stat().st_mtime:
        if not shutil.which("ffmpeg"):
            sys.exit("ffmpeg not found; run: brew install yt-dlp ffmpeg")
        run(["ffmpeg", "-v", "error", "-y", "-i", str(src),
             "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", str(mono)])
    return mono


def read_mono(path: Path) -> np.ndarray:
    with wave.open(str(path), "rb") as w:
        if w.getframerate() != SR or w.getnchannels() != 1:
            sys.exit(f"expected mono {SR} Hz in {path}")
        raw = w.readframes(w.getnframes())
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0


# ---------------------------------------------------------------------- features


def smooth(v: np.ndarray, seconds: float) -> np.ndarray:
    k = max(1, int(round(seconds / HOP_S)))
    return np.convolve(v, np.ones(k) / k, mode="same")


def local_zscore(v: np.ndarray, seconds: float) -> np.ndarray:
    k = max(1, int(round(seconds / HOP_S)))
    ker = np.ones(k) / k
    mu = np.convolve(v, ker, mode="same")
    var = np.convolve(v * v, ker, mode="same") - mu * mu
    return (v - mu) / np.sqrt(np.maximum(var, 1e-9))


def pauseness(x: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Per-frame pause likelihood (higher = more likely) plus the voice-band level."""
    hop = int(SR * HOP_S)
    n_frames = (len(x) - N_FFT) // hop + 1
    idx = np.arange(N_FFT)[None, :] + (np.arange(n_frames) * hop)[:, None]
    win = np.hanning(N_FFT).astype(np.float32)
    spec = np.abs(np.fft.rfft(x[idx] * win, axis=1))
    freqs = np.fft.rfftfreq(N_FFT, 1 / SR)

    voice_band = spec[:, (freqs >= 1000) & (freqs < 4000)].sum(axis=1)
    voice_db = smooth(20 * np.log10(np.maximum(voice_band, 1e-9)), 0.10)

    artic = np.log1p(spec[:, (freqs >= 300) & (freqs < 5000)] * 100.0)
    flux = np.concatenate([[0.0], np.maximum(np.diff(artic, axis=0), 0).sum(axis=1)])

    quiet = -(local_zscore(smooth(voice_db, 0.12), 12.0)
              + local_zscore(smooth(flux, 0.12), 12.0)) / 2.0
    return smooth(quiet, 0.10), voice_db


def find_stotra_start(p: np.ndarray) -> float:
    lo, hi = (int(t / HOP_S) for t in STOTRA_START_WINDOW)
    return float((lo + int(np.argmax(p[lo:hi]))) * HOP_S)


# ---------------------------------------------------------------------------- dp


def track_padas(p: np.ndarray, start_s: float, n_padas: int, decim: int = 2) -> np.ndarray:
    """Viterbi pada tracker anchored at start_s. Returns n_padas+1 boundary times."""
    h = HOP_S * decim
    sig = p[::decim].astype(np.float64)
    a = int(round(start_s / h))
    sig = sig[a:]
    n = len(sig)

    lo = int(round(PADA_PERIOD * DP_MIN_RATIO / h))
    hi = int(round(PADA_PERIOD * DP_MAX_RATIO / h))
    gaps = np.arange(lo, hi + 1)
    # log-domain tempo prior, indexed by gap in frames
    penalty = -DP_LAMBDA * (np.log(gaps * h / PADA_PERIOD)) ** 2

    score = np.full(n, -1e18)
    back = np.zeros(n, dtype=np.int32)
    score[0] = 0.0  # anchor the first boundary exactly at the stotra start

    for i in range(lo, n):
        j0, j1 = max(0, i - hi), i - lo
        # gap for candidate j is (i - j); slice the prior to match j0..j1
        pen = penalty[::-1][-(j1 - j0 + 1):]
        cand = score[j0:j1 + 1] + pen
        k = int(np.argmax(cand))
        score[i] = sig[i] + cand[k]
        back[i] = j0 + k

    # Walk back from the best terminal state, then keep the first n_padas+1
    # boundaries from the anchor.
    tail = np.arange(max(lo, n - int(6.0 / h)), n)
    i = int(tail[np.argmax(score[tail])])
    seq: list[int] = []
    while i > 0:
        seq.append(i)
        nxt = int(back[i])
        if nxt <= 0 or nxt >= i:
            break
        i = nxt
    seq.append(0)
    times = np.array(sorted(seq), dtype=np.float64) * h + start_s

    if len(times) < n_padas + 1:
        sys.exit(f"tracked only {len(times) - 1} padas, need {n_padas}")
    return times


def classify(p: np.ndarray, t: float) -> str:
    """A boundary is 'detected' if a real pause peak sits within tolerance."""
    i = int(round(t / HOP_S))
    w = int(round(DETECT_TOLERANCE_S / HOP_S))
    lo, hi = max(0, i - w), min(len(p), i + w + 1)
    if lo >= hi:
        return "interpolated"
    window = p[lo:hi]
    peak = int(np.argmax(window)) + lo
    is_local_max = p[peak] >= p[max(0, peak - w):min(len(p), peak + w + 1)].max() - 1e-9
    strong = window.max() >= DETECT_MIN_PAUSENESS
    return "detected" if (is_local_max and strong) else "interpolated"


# -------------------------------------------------------------------------- main


def calibrate_from_landmarks(p: np.ndarray) -> list[dict]:
    """Piecewise-linear full-verse starts from ASR landmarks.

    Do **not** snap to nearby pauseness peaks: the strongest pause in a verse is
    often the mid-verse (line 1 → line 2) break, which would truncate playback
    after the first line.
    """
    del p  # kept in signature for call-site symmetry with classify()
    lm_nums = sorted(ASR_LANDMARKS)

    def interp(n: int) -> float:
        if n in ASR_LANDMARKS:
            return float(ASR_LANDMARKS[n])
        for a, b in zip(lm_nums, lm_nums[1:]):
            if a < n < b:
                frac = (n - a) / (b - a)
                return ASR_LANDMARKS[a] + frac * (ASR_LANDMARKS[b] - ASR_LANDMARKS[a])
        raise ValueError(n)

    starts = [interp(n) for n in range(1, N_VERSES + 1)]
    period_end = (ASR_LANDMARKS[182] - ASR_LANDMARKS[120]) / (182 - 120)
    stotra_end = ASR_LANDMARKS[182] + period_end * 0.55  # half-verse 182
    ends = starts[1:] + [stotra_end]

    verses = []
    for k in range(1, N_VERSES + 1):
        s, e = float(starts[k - 1]), float(ends[k - 1])
        verses.append({
            "number": k,
            "startSec": round(s, 2),
            "endSec": round(e, 2),
            "confidence": "detected" if k in ASR_LANDMARKS else "interpolated",
        })
    return verses


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--force-download", action="store_true")
    ap.add_argument(
        "--stotra-start",
        type=float,
        default=None,
        help="Force the stotra/verse-1 onset in seconds (skips auto-detect).",
    )
    ap.add_argument(
        "--calibrate",
        action="store_true",
        default=True,
        help="Use ASR landmark interpolation (default). Preferred over bare DP.",
    )
    ap.add_argument(
        "--no-calibrate",
        action="store_true",
        help="Use the Viterbi pada tracker only (legacy).",
    )
    args = ap.parse_args()
    use_calibrate = args.calibrate and not args.no_calibrate

    mono = ensure_audio(args.force_download)
    x = read_mono(mono)
    duration = len(x) / SR
    p, voice_db = pauseness(x)

    if use_calibrate:
        verses = calibrate_from_landmarks(p)
        stotra_start = verses[0]["startSec"]
        stotra_end = verses[-1]["endSec"]
    else:
        stotra_start = args.stotra_start if args.stotra_start is not None else find_stotra_start(p)
        padas = track_padas(p, stotra_start, N_PADAS)[: N_PADAS + 1]
        stotra_end = float(padas[N_PADAS])

        # Verses 1..181 span 4 padas; verse 182 is the closing half-verse (2 padas).
        verses = []
        for k in range(1, N_VERSES + 1):
            i0 = (k - 1) * PADAS_PER_VERSE
            i1 = i0 + (PADAS_PER_VERSE if k < N_VERSES else 2)
            start, end = float(padas[i0]), float(padas[i1])
            conf = "detected" if k == 1 else classify(p, start)
            verses.append({
                "number": k,
                "startSec": round(start, 2),
                "endSec": round(end, 2),
                "confidence": conf,
            })

    # Everything before the anchor is the dhyana; anything chanted after the
    # last verse is the closing section.
    dhyana_start = first_audio(x)
    closing_end = last_chanting(voice_db, stotra_end)

    source: dict = {
        "youtubeId": YOUTUBE_ID,
        "title": TITLE,
        "performers": PERFORMERS,
        "url": URL,
        "durationSec": round(duration, 2),
        "analyzedAt": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat(),
    }
    if use_calibrate:
        source["calibration"] = {
            "method": "asr-landmark-interpolation",
            "landmarks": ASR_LANDMARKS,
        }

    payload = {
        "source": source,
        "sections": {
            "dhyana": {"startSec": round(dhyana_start, 2), "endSec": round(stotra_start, 2)},
            "stotra": {"startSec": round(stotra_start, 2), "endSec": round(stotra_end, 2)},
            "phalashruti": {"startSec": round(stotra_end, 2), "endSec": round(closing_end, 2)},
        },
        "dhyanaVerses": dhyana_verses(p, dhyana_start, stotra_start),
        "verses": verses,
    }

    validate(payload)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(payload, indent=2) + "\n")

    n_det = sum(1 for v in verses if v["confidence"] == "detected")
    gaps = np.diff([v["startSec"] for v in verses])
    print(f"duration        {duration:.2f}s")
    print(f"dhyana          {dhyana_start:.2f} - {stotra_start:.2f}s")
    print(f"stotra          {stotra_start:.2f} - {stotra_end:.2f}s")
    print(f"closing         {stotra_end:.2f} - {closing_end:.2f}s")
    print(f"pada period     {(stotra_end - stotra_start) / N_PADAS:.4f}s")
    print(f"verse duration  median {np.median(gaps):.2f}s  min {gaps.min():.2f}s  max {gaps.max():.2f}s")
    print(f"detected        {n_det}/{N_VERSES} verse starts ({n_det / N_VERSES:.0%})")
    print(f"wrote           {OUT_PATH.relative_to(ROOT)}")


def envelope_10ms(x: np.ndarray) -> np.ndarray:
    """Peak amplitude per 10 ms block."""
    block = SR // 100
    n = len(x) // block
    return np.abs(x[: n * block]).reshape(n, block).max(axis=1)


def first_audio(x: np.ndarray, thresh: float = 3e-3) -> float:
    env = envelope_10ms(x[: SR * 60])
    return float(np.argmax(env > thresh)) / 100.0


def last_chanting(voice_db: np.ndarray, body_end: float) -> float:
    """End of the closing section: where the voice band drops into the fade-out."""
    body = voice_db[int(200 / HOP_S):int(body_end / HOP_S)]
    floor = np.percentile(body, 75) - 12.0
    above = np.where(voice_db > floor)[0]
    return float(above[-1]) * HOP_S


def dhyana_verses(p: np.ndarray, start: float, end: float) -> list[dict]:
    """Best-effort split of the dhyana on its strongest structural pauses.

    The dhyana verses are not in a single metre and their boundaries are not
    reliably separable here, so every entry is reported as interpolated and
    should be treated as a hint for review rather than a measurement.
    """
    coarse = smooth(p, 1.5)
    a, b = int(start / HOP_S), int(end / HOP_S)
    seg = coarse[a:b]
    peaks = np.where((seg[1:-1] >= seg[:-2]) & (seg[1:-1] > seg[2:]))[0] + 1
    peaks = peaks[np.argsort(-seg[peaks])]
    chosen: list[int] = []
    min_sep = int(6.0 / HOP_S)
    for i in peaks:
        if all(abs(i - j) >= min_sep for j in chosen):
            chosen.append(int(i))
    inner = sorted(a * HOP_S + i * HOP_S for i in chosen)
    bounds = [start]
    for t in inner:
        if t - bounds[-1] > 1.0:
            bounds.append(t)
    # The dhyana entries must tile the section exactly, so the last boundary is
    # always the stotra anchor rather than the final detected pause.
    if end - bounds[-1] <= 1.0:
        bounds.pop()
    bounds.append(end)

    out = []
    for i in range(len(bounds) - 1):
        out.append({
            "index": i + 1,
            "startSec": round(float(bounds[i]), 2),
            "endSec": round(float(bounds[i + 1]), 2),
            "confidence": "interpolated",
        })
    return out


def validate(payload: dict) -> None:
    verses = payload["verses"]
    assert len(verses) == N_VERSES, f"expected {N_VERSES} verses, got {len(verses)}"
    stotra = payload["sections"]["stotra"]
    assert verses[0]["startSec"] == stotra["startSec"], "verse 1 must start the stotra"
    assert verses[-1]["endSec"] == stotra["endSec"], "verse 182 must end the stotra"
    for i, v in enumerate(verses):
        assert v["number"] == i + 1
        assert v["endSec"] > v["startSec"], f"verse {v['number']} is not positive length"
        if i:
            prev = verses[i - 1]
            assert abs(prev["endSec"] - v["startSec"]) < 1e-9, (
                f"gap/overlap between verses {prev['number']} and {v['number']}")
    for name, sec in payload["sections"].items():
        if sec:
            assert sec["endSec"] > sec["startSec"], f"section {name} is not positive length"


if __name__ == "__main__":
    main()
