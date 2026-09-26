# Artwork ledger

The running record of the shloka artworks: the principles of the series, the motifs that must
look the same wherever they recur, and what each finished artwork depicts. Read all of it before
designing a new artwork, and update it in the same commit as every artwork. The process lives in
the `adorn-shloka` skill (`.cursor/skills/adorn-shloka/`).

## Series principles

1. **Every composition is original.** No two shlokas share a layout idea. Check the composition
   log below and do something different.
2. **Every element answers to a name.** Nothing is drawn purely as decoration. Each part is named
   in the note, so the reader can find it.
3. **She herself is present as light, never as a drawn figure.** In Shloka 1 she is the bindu, the
   point of light at the heart of the flame. Her person is shown through light, fire, the bindu,
   yantra forms, and the things that adorn and surround her: ornaments, weapons, throne, canopy,
   flowers. The artwork adorns her; it does not portray her.
4. **Names that describe her form are drawn through their images.** From Shloka 4 onward the
   stotra describes her from head to foot. Draw the ornament or the simile the name itself uses,
   not the body part. Examples: her brows are "Love's archway", so draw the toraṇa; her eyes are
   "fish in beauty's stream", so draw the fish; her brow is the eighth-night moon, so draw the
   half moon.
5. **The craft is constant:** the layout zones, the palette variables, the motion vocabulary, and
   the note's voice, as set out in the skill.

## Motif canon

Once a subject has been drawn, it is drawn the same way whenever it returns. Reusable renderings
live in `src/components/shloka-art/primitives.tsx`. Promote an inline motif into that file the
second time it is needed.

| Motif | Rendering | Where | First drawn |
|---|---|---|---|
| Her presence (the bindu) | Small `--art-core` disc, a thin ring, a soft radial glow of `--art-core`. Set it against saffron, not `--art-core`, or it vanishes by day | Inline | Shloka 1 |
| Tongue of flame | `tongue(h, w, lean)`: an S-curved tongue, tip leaning | `primitives.tsx` | Shloka 1 |
| Lion (siṃha) | `Lion`: seated, gold, flame-tongue mane; paired lions face inward toward the centre | `primitives.tsx` | Shloka 1 |
| Rising sparks | `Embers`, filled with `--art-ember` | `primitives.tsx` | Shloka 1 |
| The syllable śrī | श्री in Tiro Devanagari, `--sindura` | Inline | Shloka 1 |
| Rays of radiance | 108 gold hairlines from the source, alternating long and short, fading outward | Inline | Shloka 1 |
| Royal parasol (chattra) | Vermilion dome with gold ribs, scalloped fringe, beaded tassels, bud finial | Inline | Shloka 1 |
| Lotus pedestal | A row of pointed, upturned gold petals | Inline | Shloka 1 |
| Round arch | `archPath` and `alongArch` | `primitives.tsx` | Shloka 1 |
| Her noose (pāśa) | `Noose`: a loop of twisted `--art-vermilion` cord (red because *rāga* is colouring), gold binding where it closes, four gold beads, a tail ending in a gold tassel. Held at the origin, loop up | `primitives.tsx` | Shloka 2 |
| Her goad (aṅkuśa) | `Goad`: a banded gold shaft with a bud-shaped butt, a lotus collar, a leaf-shaped spear point, and a hook curving out to the right. Held at the origin, pointing up | `primitives.tsx` | Shloka 2 |
| Glint | `glint(s)`: a four-pointed flash of `--art-core`, for blazing metal and jewels | `primitives.tsx` | Shloka 2 |
| Her arms | Beams of light from her source, drawn as three nested tapering layers that fade in from the source, never as limbs | Inline | Shloka 2 |
| Bangle (kaṅkaṇa) | A gold ellipse across the arm, a paper-coloured inner line, three vermilion jewels on the front | Inline | Shloka 2 |
| The rising sun | Half a disc on the horizon (saffron centre, vermilion rim, gold rim line), sixteen alternating vermilion and saffron rays | Inline | Shloka 2 |
| The sea | Rows of shallow gold ripple arcs, closer near the horizon, faded at the sides; the light on it as a column of saffron lozenges | Inline | Shloka 2 |

### Anticipated

Not yet drawn. Whoever draws one first sets its canon here.

- **Her bow and arrows** (Shloka 3): the sugarcane bow (ikṣu-kodaṇḍa, the mind) and the five
  flower arrows (the subtle elements). With the noose and goad they recur in the Dhyāna and
  throughout the stotra, so draw each as a self-contained component and promote it to
  `primitives.tsx` at once, as `Noose` and `Goad` were. In Shloka 2 the upper arms hold the noose
  (on the left) and the goad (on the right); keep that order whenever all four appear.
- **The crescent moon** on her crown (Shloka 5, and the Dhyāna's *tārā-nāyaka-śekharām*).
- **Her ruby crown** (Shloka 4, and the Dhyāna's *māṇikya-mauli*).
- **The Śrīcakra and its triangles.** The site's own `YantraMark` in `src/components/ornament.tsx`
  is the innermost enclosure: a downward triangle in a circle, with the bindu.

## Palette additions

Colours added to `.adornment` in `src/app/globals.css` beyond the starting set. Record the day
and lamplight values and what the colour is for.

None yet. The starting set is `--art-glow`, `--art-vermilion`, `--art-saffron`, `--art-core`,
`--art-ember`, `--art-stone`, and `--art-carve`.

## Motion additions

Classes added to the motion vocabulary beyond the starting set: `m-breathe`, `m-sway`,
`m-flicker`, `m-lick`, `m-twinkle`, `m-shimmer`, `m-ember`, `m-late`, `m-later`.

None yet.

## Composition log

One entry per finished artwork, in the order they were made.

### Shloka 1: Born from the fire of awareness

- **Component:** `fire-of-awareness.tsx` (defs prefix `sa1`)
- **Composition:** a shrine. A round-topped prabhāvalī arch, a ring of flame tongues around a band
  of pearls, stands on a lotus-and-jewel throne. At its heart, a three-tongued flame rises from a
  stepped fire-pit, and the bindu glows in the flame's neck. Symmetrical, frontal, centred.
- **Name → part:**
  - Śrīmātā → `rays`: 108 rays of light from the bindu
  - Śrīmahārājñī → `parasol`: the royal parasol above the arch
  - Śrīmatsiṃhāsaneśvarī → `throne`: the lotus-and-jewel throne with two seated lions
  - Cidagnikuṇḍasambhūtā → `flame`: the flame, its fire-pit, and the bindu
  - Devakāryasamudyatā → `embers`: embers drifting upward
  - Intro, *prabhāvalī* → `frame`: the flaming arch and its pearls
  - Detail → `sri`: three tiny श्री in the pearl band, one for each opening *śrī*
- **Palette:** vermilion, saffron, and gold.
- **Motion:** `m-breathe` (flame), `m-flicker` (core), `m-lick` (detached licks), `m-shimmer`
  (rays), `m-ember`.
- **Notes:** This was the pilot, and it established the layout zones: the arch was enlarged so the
  sidebar card sits inside it, and the bindu was moved below the card.

### Shloka 2: A thousand dawns

- **Component:** `thousand-dawns.tsx` (defs prefix `sa2`)
- **Composition:** a landscape. The sun sits half risen on the horizon of the eastern sea, ringed
  by a thousand points of light in a sunflower spiral. Four beams of light reach out from it as
  her arms: the upper two climb past the card to hold the noose (left) and the goad (right) in
  the crown zone, and the lower two lie along the horizon. Open, horizontal, and paired by
  contrast (soft red cord, hard gold hook) rather than mirrored.
- **Name → part:**
  - Udyadbhānusahasrābhā → `sunrise`: the half-risen sun, exactly 1,000 points of light, the
    dawn glow, and the bindu at the sun's heart
  - Caturbāhusamanvitā → `arms`: four beams of light, the upper two with gold bangles
  - Rāgasvarūpapāśāḍhyā → `noose`: the red noose
  - Krodhākārāṅkuśojjvalā → `goad`: the gold goad, with glints and a blaze
  - Intro, *the eastern sea* → `sea`: the horizon, the ripples, and the sun's reflection
  - Detail → `thread`: a hair-fine red thread from the noose's tassel to the bindu
- **Palette:** vermilion, saffron, and gold; no additions.
- **Motion:** `m-breathe` (the sun and its rays), `m-twinkle` (the thousand points and the
  reflection, in three offset groups), `m-lick` (glints on the goad).
- **Notes:** The lower two arms were first meant to carry empty bangles, waiting for the bow and
  arrows of Shloka 3; they were dropped so the arms don't look unfinished. The first beams, as
  single solid wedges, read as wooden poles; nesting three faint layers made them light. This
  shloka's long title reaches much further into the crown zone than Shloka 1's did, so the noose
  was moved right to clear it.

## Open questions

- **The Dhyāna.** Its verses describe her whole form in one continuous meditation. Principle 3
  still applies: she is present as light, not a figure. It is the natural place to gather her
  attributes (weapons, crown, moon, lotus, jewelled vessel), so consider drawing it after
  Shlokas 2–5 have set their canon.
