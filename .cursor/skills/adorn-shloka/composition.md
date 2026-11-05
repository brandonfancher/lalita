# Composition reference

Measured from the live page (Shloka 1). All coordinates are in artwork units: the viewBox is
`0 0 640 830`, and on desktop one unit is one CSS pixel.

## Where the artwork sits

| Width | Artwork size | Placement |
|---|---|---|
| ≥ 1024px (lg) | 640 units → 640px | Top right, centred on the verse sidebar (bleeds 7.5rem past the content edge) |
| 640–1023px | 304px wide (scale ≈ 0.48) | Top right corner of the header |
| < 640px | 272px wide (scale ≈ 0.43) | Top right corner of the header, partly off-screen |

The placement is shared by every artwork (in `shloka-art/index.tsx`). Don't change it per shloka;
compose within it.

## Desktop zones (the one that matters most)

```
 y 0 ┌──────────────────────────────────────────┐
     │            CROWN ZONE  (y 0–184)         │  fully visible above the card; the
     │     a finial, canopy, crown, sun, moon   │  first thing the eye meets
 184 │      ┌────────────────────────────┐      │
     │      │   CARD WINDOW              │      │  x 144–496, y 184–396
     │ side │   The "Tap any word" card  │ side │  sits here, frosted. Keep it
     │      │   covers this. Glow, rays, │      │  calm: glow, rays, sky, a
     │      │   soft texture only.       │      │  flame's upper tongues
 396 │      └────────────────────────────┘      │
     │           FOCAL ZONE  (y 400–600)        │  the heart of the piece: the
     │   the bindu, the jewel, the face of the  │  one point the eye should rest on
     │   central image. Visible below the card  │
 564 │  ─ ─ ─ ─ fade begins ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
     │           GROUND ZONE  (y 600–797)       │  throne, pedestal, water, earth;
     │   dissolves to nothing by y ≈ 797        │  grounding, never essential
 830 └──────────────────────────────────────────┘
```

- **Fade mask** (in `.shloka-art`): fully opaque down to y = 564, fully transparent at y ≈ 797.
  Horizontally, transparent at x = 0 and fully opaque from x ≈ 154.
- **Left edge:** the verse panel overlaps x < 104 between y 372 and 664. It is semi-transparent,
  so anything there shows faintly through the verse. Keep x < 110 to low-contrast ornament.
- **Right edge:** on laptop-width screens the viewport cuts off x > 520 (at 1100px) or x > 584
  (at 1280px). Keep essential elements within x 110–520. Symmetric compositions tolerate the clip.
- **Title:** its length varies by shloka. A short one (Shloka 1) stays left of the artwork, but a
  long one (Shloka 2, "Four arms, and the noose of desire") reaches x ≈ 140 of the artwork at
  y ≈ 105–150 on screens 1280–1440px wide. Shloka 6's ("Love's archway and the darting fish")
  reaches x ≈ 175 at y ≈ 85–140. Shloka 7's ("A campaka bud, and a jewel that shames the stars")
  reaches x ≈ 360 at y ≈ 110–150 at 1440px. Shloka 11's ("The lute silenced, and a mind gone under")
  reaches x ≈ 324 at y ≈ 74–141, and x ≈ 376 at 1100px. Check the subtitle's length and keep crown-zone
  elements on the left clear of it. A title that wraps to two lines moves the whole card down
  instead: Shloka 8's ("Kadamba flowers, and the sun and moon for earrings") wraps at every desktop
  width, stays left of the artwork, and pushes the card window to y ≈ 225–438, which leaves only
  y ≈ 440–564 clear above the fade. Shloka 12's ("The chin no one has matched, and a knotted
  thread") wraps the same way. Shloka 13's ("Gold on the arms, pearls at the throat") stays on one
  line and reaches x ≈ 244 (x ≈ 296 at 1100px) at y ≈ 73–140. Shloka 14's ("A stake laid down, and
  a creeper in the garden") stays on one line but reaches x ≈ 418 at y ≈ 73–142, and x ≈ 470 at
  1100px, which leaves only the band y ≈ 142–184 above the card. Shloka 15's ("A waist arrived at
  by argument") stays on one line and reaches only x ≈ 143 at y ≈ 81–137. Shloka 16's stays on one
  line at 1280–1440px, reaching x ≈ 461 at y ≈ 74–141, but wraps at 1100px; Shloka 19's stays on one
  line and reaches x ≈ 382 (434 at 1100px). The titles of Shlokas 17, 18 and 20–25 wrap at every
  desktop width, with second lines that reach anywhere from x ≈ −4 (Shloka 24) to x ≈ 191 (Shloka
  22, 243 at 1100px). Of Shlokas 26–52, only 39's and 40's wrap. Shloka 53's wraps to two lines at y ≈ 40–137, its second line reaching x ≈ 332 (about 384 at 1100px). Shloka 54's wraps too, but its second line reaches only x ≈ 104 (156 at 1100px). Shloka 55's wraps, its second line reaching x ≈ 187 (239 at 1100px) at y ≈ 122–189. Shloka 56's wraps, its second line reaching only x ≈ 65 (117 at 1100px). Shloka 57's stays on one line and reaches x ≈ 374 (426 at 1100px) at y ≈ 74–141. The rest stay on one line, at
  y ≈ 84–147, and reach x ≈ 24 to 480. Shlokas 26–28, 44, 51 and 52 stay left of the artwork. Shloka 47
  reaches only x ≈ 24 (76 at 1100px), 42 reaches x ≈ 58, 49 reaches 78 (130 at 1100px), 37 reaches 150, 33 reaches 160, 34
  reaches 170, 30 reaches 176, 32 reaches 180, 35 reaches 190, 46 and 48 reach 198 (250 at
  1100px), 41 reaches 238 and 50 reaches 240 (292 at 1100px). The long ones are 29 (292), 45 (311), 36 (370), 38 (472),
  31 (474) and 43 (480). Past about x ≈ 450, the crown has to go above the title (y < 84), into
  the band under it (y ≈ 147–184), or to its right. Look at the first render to see where the
  card really sits.
- **Commentary:** from y ≈ 720 the Meaning paragraph reaches x ≈ 160 (1440px) to 212 (1100px).
  Another reason the lower left stays quiet.
- **Plate caption:** a button centred beneath the artwork at y ≈ 824 on screens ≥ 1280px.
- **Backdrop opacity:** 0.6 by day, 0.62 by lamplight (0.85 while a trigger is hovered).
- **When a word is tapped**, the inspector panel (mostly opaque) covers roughly x 144–496 from
  y 184 down. The garland of the side zones should still read around it.

## Phone and tablet

- The whole artwork is about 272–304px wide, so **1 unit ≈ 0.43–0.48px**. Strokes under ~1.5 units
  and details under ~15 units vanish. The piece must read from its big masses: silhouette, focal
  glow, crown.
- The title's text runs across the artwork's upper half (y ≈ 105–275). The chant bar sits over
  the middle. The verse panel begins at y ≈ 757–792, below the faded ground zone.
- The "About the artwork" badge sits in the top-right corner of the page, beside the crown zone.

## The plate

The plate shows the same component at full strength (opacity 0.9 by day, 1 by lamplight) with no
fade mask. Everything the fade hides on the page, including the ground zone, is seen in full here,
so it must be finished work, not filler. Each part is spotlit in turn: the others fall to
opacity 0.1.

## The chant miniature

Each verse card on the chant page carries the artwork as a miniature (`ShlokaMiniature` in
`shloka-art/index.tsx`), a reminder of what is being chanted. It shows only x 70–570, y 30–780,
with the edges feathered, so keep every element inside that region. Beside the verse on wider
screens it is 60–120px wide (1 unit ≈ 0.12–0.24px). On phones it stands behind the verse at the
card's full height (about 130px wide) and at 55% opacity, so the verse is read over it. At that
size only the silhouette and the focal glow survive, so the big masses should say what the shloka
is on their own.

## Palette

Use CSS variables only, never literal colours in the component.

| Variable | Use |
|---|---|
| `--sindura`, `--sindura-soft` | The site's vermilion (buttons, numerals) |
| `--gold`, `--gold-soft` | Hairlines, metal, ornament |
| `--lotus` | Pink-magenta: lotuses, dawn, the heart |
| `--leaf` | Muted green: leaves, parrots, emerald |
| `--ink`, `--ink-muted` | Dark line and shadow (light by lamplight, so use sparingly) |
| `--surface-0` … `--surface-3` | The paper; use for knock-outs and fills that should read as blank |
| `--art-vermilion` | Orange-leaning red that stays red when diluted on paper (pure red turns pink) |
| `--art-saffron` | Flame orange, marigold |
| `--art-glow` | Large soft radial glows |
| `--art-core` | The hottest, brightest point: white-hot by night, saffron-gold by day |
| `--art-ember` | Small bright sparks |
| `--art-stone` | Fills for stone, pedestals, steps (surface-coloured) |
| `--art-carve` | Carved lines cut into a filled shape |

To add a colour (moonlight, blue-black hair, emerald, camphor white), add an `--art-*` variable in
the `.adornment` block of `src/app/globals.css` with **both** a day value and a
`[data-theme="dark"]` value, then record it in the ledger's palette section.

## Motion vocabulary

Classes live in `globals.css`. Put them on elements *inside* a part, never on a part's own group.

| Class | Movement | Suited to |
|---|---|---|
| `m-breathe` | Swells from its base | Flames, buds, rising forms |
| `m-sway` | Swings from its top | Garlands, bells, tassels, pendants |
| `m-flicker` | Quick soft brightening | A flame's core |
| `m-lick` | Fades in and out | Detached flame licks, passing glints |
| `m-twinkle` | Slow pulse | Jewels, stars, moonlight |
| `m-shimmer` | Very slow swell | Rays, halos, glows |
| `m-ember` | Rises and fades | Sparks, pollen, petals (use the `Embers` primitive) |
| `m-late`, `m-later` | Offset any of the above | Neighbours that shouldn't move in lockstep |

Two or three kinds per artwork at most. If a composition truly needs a new movement, add it to
the vocabulary with a comment, not as a one-off.
