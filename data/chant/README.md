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
sources/.venv/bin/python scripts/build-chant-timings.py          # calibrated (default)
# sources/.venv/bin/python scripts/build-chant-timings.py --no-calibrate
```

Then patch module JSON (or re-run the full module build):

```sh
# quick: rewrite only the chant fields on data/modules/*.json from timings.json
python3 -c "
import json
from pathlib import Path
t=json.loads(Path('data/chant/timings.json').read_text())
by={v['number']:v for v in t['verses']}
for p in Path('data/modules').glob('*.json'):
    m=json.loads(p.read_text())
    if p.stem=='000':
        m['chant']={**t['sections']['dhyana'], 'confidence':'detected'}
    else:
        v=by[int(p.stem)]; m['chant']={'startSec':v['startSec'],'endSec':v['endSec'],'confidence':v['confidence']}
    p.write_text(json.dumps(m, ensure_ascii=False, indent=2)+'\n')
"
```

The script downloads the audio if it is missing (`--force-download` refetches)
and validates its output before writing: 182 verses, contiguous, strictly
increasing, exactly spanning the stotra section.

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

## Calibration (current)

Timings come from **forced alignment** (`stable-ts`) of the known verse text
to `sources/audio/mono16k.wav`. Each verse’s `startSec` is the onset of its
first name; `endSec` is the next verse’s start (contiguous). The chant player
stops ~120 ms early to absorb YouTube API lag without cutting the last name.

Do not snap boundaries to pauseness peaks — the strongest pause inside a verse
is usually the mid-verse (line 1 → line 2) break.

Regenerate:

```sh
sources/.venv/bin/pip install stable-ts
# see scripts/build-chant-timings.py --calibrate for the landmark fallback;
# full forced-alignment rebuild is currently run ad hoc from the agent session.
```

## Caveats worth checking by ear

1. **Landmarks are good; in-between verses are interpolated.** Spot-check a
   mid-range verse (e.g. 30, 90, 150) if a specific module still feels early or
   late, then nudge `ASR_LANDMARKS` in the script and re-run with `--calibrate`.
2. **Numbering assumes 182 verses with a half-verse last.**
3. **`phalashruti` is a ~35 s closing passage**, roughly 3–4 verses. It is far
   too short to be the full phalashruti; it is labelled that way only because
   the schema has no other slot for a closing section.
4. **`dhyanaVerses` is a hint, not a measurement.** The dhyana verses are not
   all in one metre and their boundaries were not reliably separable, so every
   entry is marked `interpolated`. The section span itself is solid.
5. **The dhyana start (0.3 s)** is where audio begins; the opening seconds may
   be instrumental rather than chant.
