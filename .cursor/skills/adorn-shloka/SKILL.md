---
name: adorn-shloka
description: Creates the original devotional SVG artwork that adorns one Lalitā Sahasranāma shloka page (or the Dhyāna page), drawn from the names in that verse, together with its explorable "about the artwork" note. Use when the user asks to adorn, illustrate, decorate, or make the artwork for a shloka or the Dhyāna, e.g. "adorn shloka 12" or "do the artwork for the Dhyāna".
---

# Adorning a shloka

Each shloka page carries an original artwork, as if adorning the divine mother herself. It is
drawn from the names in that verse: every element answers to a specific name, and a note on the
page tells the reader which. The artwork should be striking yet subtle. It warms and deepens the
reader's practice and study, and never competes with the verse.

Every composition is **fully original**. What stays constant across the series is the craft: the
layout, the palette, the motion vocabulary, the note format, and the canon of recurring motifs
recorded in the ledger.

Shloka 1 is the reference implementation: `src/components/shloka-art/fire-of-awareness.tsx` and
its entry in `registry.tsx`.

## Workflow

Copy this checklist and keep it updated as you go:

```
- [ ] 1. Set up: branch, dev server, read the ledger
- [ ] 2. Study the verse
- [ ] 3. Write the design brief
- [ ] 4. Draw the artwork
- [ ] 5. Write the note and register it
- [ ] 6. Preview, review, iterate (at least twice)
- [ ] 7. Check the miniature on the practice page
- [ ] 8. Verify: types, lint, preview script passes
- [ ] 9. Update the ledger
- [ ] 10. Commit
```

### 1. Set up

- One shloka per session (two or three short, related ones at most).
- `git checkout main && git pull`, then `git checkout -b cursor/shloka-<n>-artwork`. Use
  `cursor/dhyana-artwork` for the Dhyāna.
- Check for a dev server with `lsof -iTCP:3000 -sTCP:LISTEN`. If there isn't one, start
  `pnpm dev` in the background (in tmux if it's available).
- Read **all of** `docs/artwork-ledger.md`: the series principles, the motif canon, the palette
  additions, and the composition log. Then read [composition.md](composition.md).
- Skim `fire-of-awareness.tsx` and `primitives.tsx` for how an artwork is put together.

### 2. Study the verse

Module ids are zero-padded: shloka 12 is `data/modules/012.json`, the Dhyāna is `000.json`.

- For each name in `namas`: `deva`, `iast`, `gloss`, `translation`, `compound`, and `commentary`.
- The shloka's `commentary`: `meaning`, `history`, `practice`.
- For the Dhyāna, which has no names: `lines[].tokens[].word` (gloss and translation).

Meditate on the words. Look for what can be *seen*: colours, ornaments, objects, gestures,
creatures, light, places, and the myth behind a name. Some names are abstract (a quality, a
philosophical claim); find the traditional image that carries them rather than illustrating the
abstraction literally.

### 3. Write the design brief

Before drawing, write a short brief in the chat:

- **Concept:** one or two sentences on the whole composition.
- **Name → element:** for every name, the element it becomes and where it sits in the zones.
- **What's new:** how the composition differs from those in the ledger's composition log.
- **Canon:** any recurring motif it reuses (from `primitives.tsx`) or introduces.
- **Palette and motion:** which variables, and which two or three motion classes.

Then proceed, unless the user has asked to approve briefs first.

### 4. Draw the artwork

Create `src/components/shloka-art/<slug>.tsx`, where the slug comes from the concept
(e.g. `fire-of-awareness`). Hard rules:

- Export `function <Name>({ idPrefix = "sa<n>", active = null }: ArtProps)`.
- Draw `<svg viewBox="0 0 640 830" fill="none" className="block h-full w-full overflow-visible">`.
- **Parts.** Wrap each depicted element in one top-level group spread with `part("<name>")` from
  `partProps(active)`. Name parts in kebab-case for what they depict (`lion-throne`, not `part3`).
  Every drawn group belongs to exactly one part, and every part is pointed at by the note.
- **Motion** classes go on elements *inside* a part, never on the part's group (an opacity
  animation there overrides the spotlight dimming).
- **Ids.** Build every `<defs>` id and `url(#…)` with `artIds(idPrefix)`.
- **Colours** only as CSS variables (see the palette in [composition.md](composition.md)).
  Never literal hex values in the component.
- **Deterministic.** No `Math.random`, `Date`, or anything that differs between renders: the
  same component renders on the server (backdrop) and on the client (plate).
- **Server-safe.** No hooks, no `"use client"`.
- Devanagari inside the SVG: `style={{ fontFamily: "var(--font-tiro), serif" }}`.
- Reuse motifs from `primitives.tsx` when the subject recurs. When this artwork is the *second*
  to need a motif, move it into `primitives.tsx` and update the ledger's canon.
- Precompute geometry at module level and round coordinates with `round`, as in the reference.

Hand-drawn SVG is the medium: hairlines, flat fills, soft gradients, ornament built from simple
curves and repetition. Prefer a few strong, well-drawn shapes to many fussy ones.

### 5. Write the note and register it

Add an entry to `ARTWORK` in `src/components/shloka-art/registry.tsx`, keyed by module id:

```tsx
"012": {
  Art: MyArtwork,
  intro: (Spot) => (
    <>
      It is a <Spot part="frame"><i>term</i></Spot>, what that is in plain words. Every element comes
      from one of the four names.
    </>
  ),
  entries: [
    { nama: 45, part: "crown", depicts: "One concrete sentence: what the reader sees, and where." },
    // …one per name, in verse order
  ],
  detail: { part: "hidden-thing", body: <>An optional small detail for the attentive.</> },
},
```

- The Dhyāna uses phrases instead of names:
  `{ phrase: { label: "Line 1", deva, iast, gloss }, part, depicts }`.
- Voice: plain, warm, precise. One sentence per entry, two at most. Describe what is visible and
  why it answers to the name, without repeating the gloss (the plate already shows it). No
  exclamations, no superlatives.
- `intro` may point at the overall frame or setting with `<Spot>`. `detail` is optional; use it
  only for a genuine hidden delight.

### 6. Preview, review, iterate

Run `pnpm art:preview <n>`. It writes screenshots to `output/art-preview/<id>/`: every width in
both themes, a 2× zoom of the artwork, the plate, one spotlight per part, the phone plate, and a
reduced-motion still. It also checks the page for problems.

Look at the images and hold them to this bar:

- **Desktop, both themes:** striking at first glance, yet secondary to the verse. The card sits
  in a calm window; the focal point is clearly visible below it; nothing essential is in the
  faded ground zone or behind the verse panel.
- **By day** it reads as vermilion, saffron, and gold pigment on paper, not pink, not muddy.
  **By lamplight** it glows.
- **Phone and tablet:** reads as a clear, recognisable emblem from its big shapes; the verse
  panel is untouched.
- **Plate:** finished work edge to edge, including the ground zone the page fades out.
- **Spotlights:** each one isolates a recognisable element that plainly matches its entry.
- **Reduced motion:** the still frame looks complete.

The first render always reveals something. Iterate at least twice. Lessons from the pilot:

- Pure vermilion diluted on paper turns pink. Use `--art-vermilion` and `--art-saffron`.
- A pale "white-hot" core reads as a hole by day; that's why `--art-core` differs by theme.
- Whatever sits behind the card window gets frosted away. Put the focal point below it.
- A big, simple central shape can read as the wrong thing (the first flame looked like a tulip).
  Small, characteristic details make the subject unmistakable.
- Low-opacity `--gold` fills turn khaki by lamplight. Prefer `--gold-soft` or `--art-saffron` for
  small fills.
- In this repo, Tailwind border-colour utilities have no effect: a global rule in `globals.css`
  outranks them. Use inset `box-shadow` for coloured edges.

### 7. Check the miniature on the practice page

On the practice page, each verse card shows its shloka's artwork as a small miniature, a
reminder while chanting of what the verse depicts. Registering the artwork in step 5 is what puts
it there: `ShlokaMiniature` in `shloka-art/index.tsx` renders any shloka in `ARTWORK`, so there
is no other code to add. Don't change the miniature's size or placement for one shloka; they are
set so a card never grows taller.

Open `/practice?from=<n-1>&to=<n+1>` and look at the new card beside its neighbours, in both
themes, at desktop width and at phone width (390px), and in each script mode (Both, देवनागरी,
Romanized). Hold it to this bar:

- **Beside the verse** (tablet and desktop): recognisable at a glance from its silhouette and
  focal glow, and nothing important is cut off by the crop or lost in its feathered edge (see
  [composition.md](composition.md#the-practice-miniature)).
- **Behind the verse** (phones): recognisable through the text, and every word over it stays
  easy to read in both themes. Watch for bright glows under light text by lamplight, and dark
  detail under dark text by day.
- **The card:** the verse is untouched and the card is no taller than its neighbours.

If the miniature doesn't read, strengthen the big masses of the artwork itself (in step 6's
loop) rather than adding detail that only shows at full size.

### 8. Verify

- `npx tsc --noEmit -p .`
- `npx eslint src/components/shloka-art src/app/shloka` (the wider project has unrelated
  pre-existing lint errors; don't fix those as part of this work)
- `pnpm art:preview <n>` must end with "No problems found."

### 9. Update the ledger

In `docs/artwork-ledger.md`, add the shloka to the composition log, and record any new canon
motif, palette variable, or motion class. Future sessions depend on this; do it in the same
commit.

### 10. Commit

Commit the artwork, the registry entry, any primitives or CSS additions, and the ledger update
together, e.g. `Adorn Shloka 12 with <concept>`. Push and open a pull request when the user asks.

## Additional resources

- [composition.md](composition.md): measured zones, the practice miniature's crop, palette
  variables, motion vocabulary
- `docs/artwork-ledger.md`: series principles, motif canon, composition log
- `src/components/shloka-art/`: `types.ts`, `primitives.tsx`, `registry.tsx`, the plate in
  `art-note.tsx`, and the backdrop and the practice miniature in `index.tsx`
