# Chant timings

`timings.json` maps each verse of the Lalita Sahasranama to an offset in the
Ranjani–Gayatri recording on YouTube (`zgG-gjioU1g`), so the site can seek an
embed to a given verse.

Only these numeric offsets are published. The recording is a commercial
performance: it is downloaded to `sources/audio/` purely as analysis input,
`sources/` is gitignored, and playback always comes from the YouTube embed.

## Re-running

```sh
brew install yt-dlp ffmpeg
python3 -m venv sources/.venv && sources/.venv/bin/pip install numpy
sources/.venv/bin/python scripts/build-chant-timings.py
```

The script downloads the audio if it is missing (`--force-download` refetches)
and is deterministic — the same input reproduces the same file. It takes a few
seconds and validates its own output before writing: 182 verses, contiguous,
strictly increasing, exactly spanning the stotra section.

## Shape

- `sections.dhyana` / `sections.stotra` / `sections.phalashruti` — top-level spans.
- `dhyanaVerses[]` — `index`, `startSec`, `endSec`, `confidence`.
- `verses[]` — `number` (1–182), `startSec`, `endSec`, `confidence`.

`confidence` is `"detected"` when a clear pause sits on the boundary and
`"interpolated"` when the metrical grid carried through a spot where the audio
gave no clear pause. It rates *individual* boundaries, not the numbering as a
whole — see the caveats below.

## How it works

The duo chants over a continuous tanpura drone, so there is no true silence to
cut on: in 33 minutes only two moments fall far enough below the local level to
register as a gap. Segmentation therefore keys on *relative* quiet plus loss of
articulation — 1–4 kHz voice-band energy and 300–5000 Hz spectral flux, each
locally z-scored — combined into a per-frame "pauseness" signal.

Anushtubh is four 8-syllable padas per verse, and this rendition follows the
metre closely, so the pada train is the one structure the audio marks
unambiguously (measured period 2.462 s, stable across a wide range of analysis
settings). A Viterbi tracker follows that train from the stotra anchor, and
verses are formed by grouping padas four at a time — 726 padas for 181 full
verses plus the closing half-verse.

## Caveats worth checking by ear

1. **Verse phase is counted, not heard.** Pauses at pada, half-line and verse
   ends are near equal in depth, so the audio does not say which pause ends a
   verse. That comes from counting padas off the stotra anchor at 145.98 s. A
   listener should confirm that verse 1 really begins there; if the anchor is
   off by one pada, every verse shifts by ~2.5 s.
2. **Numbering assumes 182 verses with a half-verse last**, and that nothing
   between the anchor and the 726th pada departs from the metre. A single
   inserted or dropped pada would shift everything after it by a quarter verse.
   Spot-checking verses 1, 60, 120 and 182 would catch this.
3. **`phalashruti` is a ~35 s closing passage**, roughly 3–4 verses. It is far
   too short to be the full phalashruti; it is labelled that way only because
   the schema has no other slot for a closing section.
4. **`dhyanaVerses` is a hint, not a measurement.** The dhyana verses are not
   all in one metre and their boundaries were not reliably separable, so every
   entry is marked `interpolated`. The section span itself is solid.
5. **The dhyana start (0.3 s)** is where audio begins; the opening seconds may
   be instrumental rather than chant.
