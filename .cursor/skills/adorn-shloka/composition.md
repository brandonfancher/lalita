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
- **Title:** sits at y 80–136 but only reaches x ≈ 86–138 of the artwork, so the crown zone is clear.
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
