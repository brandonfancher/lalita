#!/usr/bin/env python3
"""Force-align known verse text to the chant WAV with stable-ts.

Produces data/chant/timings.json where each verse start is the onset of its
first name. Requires:

    sources/.venv/bin/pip install stable-ts
    sources/audio/mono16k.wav   # from build-chant-timings.py

Then patch modules (or re-run the module build) so ChantBar sees the new offsets.
"""

from __future__ import annotations

import datetime as dt
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WAV = ROOT / "sources" / "audio" / "mono16k.wav"
OUT = ROOT / "data" / "chant" / "timings.json"
MODULES = ROOT / "data" / "modules"

# Opening verses locked from a clean single-window alignment (do not overwrite).
GOLD_STARTS = {1: 137.50, 2: 152.20, 3: 162.98}
# Shloka 1 has an audible breath after its last name; stop there in the module.
PLAYABLE_END_OVERRIDES = {1: 151.60}


def to_align_text(iast: str) -> str:
    s = iast.lower()
    for a, b in [
        ("ā", "a"), ("ī", "i"), ("ū", "u"), ("ṛ", "ri"), ("ṝ", "ri"), ("ḷ", "li"),
        ("ṃ", "m"), ("ḥ", "h"), ("ṅ", "n"), ("ñ", "n"), ("ṭ", "t"), ("ḍ", "d"),
        ("ṇ", "n"), ("ś", "sh"), ("ṣ", "sh"),
    ]:
        s = s.replace(a, b)
    s = re.sub(r"[^a-z\s]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def load_modules() -> dict[int, str]:
    out: dict[int, str] = {}
    for p in sorted(MODULES.glob("*.json")):
        if p.stem == "000":
            continue
        m = json.loads(p.read_text())
        out[int(p.stem)] = " ".join(line["iast"] for line in m["lines"])
    return out


def main() -> None:
    try:
        import stable_whisper
    except ImportError:
        sys.exit("stable-ts not installed; run: sources/.venv/bin/pip install stable-ts")

    if not WAV.exists():
        sys.exit(f"missing {WAV}; run scripts/build-chant-timings.py first")

    modules = load_modules()
    expected_counts = {n: len(to_align_text(t).split()) for n, t in modules.items()}
    model = stable_whisper.load_model("base")
    best: dict[int, tuple[int, float, float]] = {}

    chunk = 12
    for chunk_start in range(1, 183, chunk - 3):
        chunk_end = min(182, chunk_start + chunk - 1)
        verses = list(range(chunk_start, chunk_end + 1))
        text = " ".join(to_align_text(modules[n]) for n in verses)
        rough_start = max(130.0, 137.5 + (chunk_start - 1) * 9.85 - 10)
        rough_end = min(1975.0, rough_start + (chunk_end - chunk_start + 1) * 11 + 20)
        clip = Path(tempfile.mkdtemp()) / f"c{chunk_start}.wav"
        subprocess.run(
            ["ffmpeg", "-y", "-ss", str(rough_start), "-t", str(rough_end - rough_start),
             "-i", str(WAV), "-ac", "1", "-ar", "16000", str(clip)],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        print(f"aligning {chunk_start}-{chunk_end}...", flush=True)
        result = model.align(str(clip), text, language="en")
        words = []
        for seg in result.segments:
            for w in getattr(seg, "words", []) or []:
                tok = w.word.strip().lower()
                if tok:
                    words.append((float(w.start) + rough_start, float(w.end) + rough_start, tok))

        expected: list[tuple[int, str]] = []
        for n in verses:
            for tok in to_align_text(modules[n]).split():
                expected.append((n, tok))

        ei = 0
        spans: dict[int, list[tuple[float, float]]] = {n: [] for n in verses}
        for t0, t1, w in words:
            if ei >= len(expected):
                break
            n, tok = expected[ei]
            if tok in w or w in tok or (len(w) > 3 and (tok.startswith(w[:4]) or w.startswith(tok[:4]))):
                spans[n].append((t0, t1))
                ei += 1

        for n, sp in spans.items():
            if not sp:
                continue
            score = len(sp) + (10 if len(sp) == expected_counts[n] else 0)
            cand = (score, sp[0][0], sp[-1][1])
            if n not in best or cand[0] > best[n][0]:
                best[n] = cand

    raw_start: dict[int, float] = {}
    for n, (score, s, e) in best.items():
        dur = e - s
        ok = (n == 182 and 4 < dur < 40) or (n == 1 and 10 < dur < 18) or (
            n not in (1, 182) and 6.5 < dur < 16
        )
        if ok and score >= max(2, expected_counts[n] // 2):
            raw_start[n] = GOLD_STARTS.get(n, s)

    for n, t in GOLD_STARTS.items():
        raw_start[n] = t

    known = sorted(raw_start)
    starts: list[float] = []
    for n in range(1, 183):
        if n in raw_start:
            starts.append(raw_start[n])
            continue
        prev = max((k for k in known if k < n), default=None)
        nxt = min((k for k in known if k > n), default=None)
        if prev is not None and nxt is not None:
            frac = (n - prev) / (nxt - prev)
            starts.append(raw_start[prev] + frac * (raw_start[nxt] - raw_start[prev]))
        elif prev is not None:
            starts.append(raw_start[prev] + (n - prev) * 9.85)
        else:
            starts.append(137.5 + (n - 1) * 9.85)

    for i in range(1, len(starts)):
        if starts[i] <= starts[i - 1] + 5.0:
            starts[i] = starts[i - 1] + 8.5

    verses_out = []
    for n in range(1, 183):
        s = starts[n - 1]
        e = starts[n] if n < 182 else min(s + 12.0, starts[n - 1] + 12.0)
        if n == 182:
            e = s + 12.0
        verses_out.append({
            "number": n,
            "startSec": round(float(s), 2),
            "endSec": round(float(e if n < 182 else e), 2),
            "confidence": "detected" if n in raw_start else "interpolated",
        })
    for i in range(len(verses_out) - 1):
        verses_out[i]["endSec"] = verses_out[i + 1]["startSec"]

    # Import section helpers from the pause-based script.
    import importlib.util
    spec = importlib.util.spec_from_file_location("bct", ROOT / "scripts" / "build-chant-timings.py")
    bct = importlib.util.module_from_spec(spec)
    assert spec.loader
    spec.loader.exec_module(bct)

    mono = bct.read_mono(WAV)
    p, voice_db = bct.pauseness(mono)
    stotra_start = verses_out[0]["startSec"]
    stotra_end = verses_out[-1]["endSec"]
    payload = {
        "source": {
            "youtubeId": bct.YOUTUBE_ID,
            "title": bct.TITLE,
            "performers": bct.PERFORMERS,
            "url": bct.URL,
            "durationSec": round(len(mono) / bct.SR, 2),
            "analyzedAt": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat(),
            "calibration": {
                "method": "stable-ts-forced-alignment",
                "goldStarts": GOLD_STARTS,
                "playableEndOverrides": PLAYABLE_END_OVERRIDES,
            },
        },
        "sections": {
            "dhyana": {"startSec": round(bct.first_audio(mono), 2), "endSec": stotra_start},
            "stotra": {"startSec": stotra_start, "endSec": stotra_end},
            "phalashruti": {
                "startSec": stotra_end,
                "endSec": round(float(bct.last_chanting(voice_db, stotra_end)), 2),
            },
        },
        "dhyanaVerses": bct.dhyana_verses(p, bct.first_audio(mono), stotra_start),
        "verses": verses_out,
    }
    bct.validate(payload)
    OUT.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"wrote {OUT.relative_to(ROOT)}")
    print("v1", verses_out[0], "playable end", PLAYABLE_END_OVERRIDES.get(1))
    print("v2", verses_out[1])


if __name__ == "__main__":
    main()
