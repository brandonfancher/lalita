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
| Lotus pedestal | `lotusPetals`: a row of pointed, upturned gold petals. A lotus seat stacks a taller back row (`--art-saffron`), a front row (`--art-core`, so it reads as gold by day, not khaki), a beaded band, and a row turned down (negative `height`) | `primitives.tsx` | Shloka 1 |
| Round arch | `archPath` and `alongArch` | `primitives.tsx` | Shloka 1 |
| Her noose (pāśa) | `Noose`: a loop of twisted `--art-vermilion` cord (red because *rāga* is colouring), gold binding where it closes, four gold beads, a tail ending in a gold tassel. Held at the origin, loop up | `primitives.tsx` | Shloka 2 |
| Her goad (aṅkuśa) | `Goad`: a banded gold shaft with a bud-shaped butt, a lotus collar, a leaf-shaped spear point, and a hook curving out to the right. Held at the origin, pointing up | `primitives.tsx` | Shloka 2 |
| Glint | `glint(s)`: a four-pointed flash of `--art-core`, for blazing metal and jewels | `primitives.tsx` | Shloka 2 |
| Her arms | Beams of light from her source, drawn as three nested tapering layers that fade in from the source, never as limbs: `armBeam` (and `wrist` for where the bangle sits), painted with `ArmLight` and a gradient from `--art-saffron` to `--art-core` | `primitives.tsx` | Shloka 2 |
| Bangle (kaṅkaṇa) | `Bangle`: a gold ellipse across the arm, a paper-coloured inner line, three vermilion jewels on the front | `primitives.tsx` | Shloka 2 |
| The rising sun | Half a disc on the horizon (saffron centre, vermilion rim, gold rim line), sixteen alternating vermilion and saffron rays | Inline | Shloka 2 |
| The sea | Rows of shallow gold ripple arcs, closer near the horizon, faded at the sides; the light on it as a column of saffron lozenges | Inline | Shloka 2 |
| Her sugarcane bow (ikṣu-kodaṇḍa) | `SugarcaneBow` with a `BowShape` (`half`, `grip`, `bend`): a thick gold cane stave with a paler edge, jointed every 25 units, bound at the grip, a tuft of three `--leaf` leaves at each tip. Drawn in a frame where it is aimed up; `bowTips` gives where the string is tied. Drawn, the string runs from each tip to the origin; braced, tip to tip | `primitives.tsx` | Shloka 3 |
| Bowstring of bees | `BeeString`: a gold hairline with a line of tiny bees along it, heads toward `to` | `primitives.tsx` | Shloka 3 |
| Her flower arrows (puṣpa-bāṇa) | `FlowerArrow`: a gold shaft, saffron fletching, a gold calyx, and a budding flower (vermilion centre petal between two saffron ones). Nock at the origin, pointing up | `primitives.tsx` | Shloka 3 |
| The five elements' signs | Inside `FlowerArrow` via `sign`: a ring for space (sound), a six-pointed star for air (touch), an upward triangle for fire (form), a crescent with its horns up for water (taste), a square for earth (smell). Filled with `--art-core` on the vermilion petal. When the five arrows appear together, set them left to right in that order | `primitives.tsx` | Shloka 3 |
| A world-egg (brahmāṇḍa) | An egg, broad end down, in `--art-stone` with a gold rim and a saffron `glint` inside. Afloat in her light, it sits half-sunk: the part below the surface tinted vermilion, a flat gold ring where the surface meets it | Inline | Shloka 3 |
| Her ruby crown (koṭīra) | A gold dome that swells from the finial to a broad diadem: four tiers, each a band of rubies edged with a line of gold beads, the bands dipping slightly at the front. The diadem carries a row of larger rubies, a large front ruby in a ring of ten gold petals, a crest of gold petals each with a red dot, and a beaded lower rim. A small petal crest, a gold dome, and a bud holding one ruby make the finial. No side wings (they read as horns). Short rays spring from it, gold alternating with red | `RubyCrown` in `primitives.tsx` (drawn at Shloka 4's size; scale it with a transform, and pick its rays with `rays`) | Shloka 4 |
| Ruby | An `--art-vermilion` oval (a little taller than wide) in a thin `--art-carve` setting ring, with a short `--art-core` highlight arc at the upper left. A flashing ruby adds a `Flash` (a `glint` with `m-lick`) | `Ruby`, `Flash` in `primitives.tsx` | Shloka 4 |
| Her hair | Never drawn as a mass or a head. It shows as flowers and ornament, with `--art-hair` glimpsed between them: a plait of rounded lobes laid alternately from each side, each lobe with a gold sheen line and a flower on it, ending in a gold binding and a small tuft. Loose strands read as a broom or cords; don't draw them | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Campaka | Nine slender, pointed, slightly twisted petals of `--art-core` edged in `--art-saffron`, a saffron centre | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Aśoka | A round cluster of seven small four-petalled florets, mostly `--art-vermilion`, a few `--art-saffron`, with eleven long curved stamens tipped in `--art-core` fanning from the top | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Punnāga | Four rounded `--art-ivory` petals outlined in gold, round an `--art-core` boss ringed with gold stamen dots and a vermilion pistil | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Saugandhika (white water-lily) | Two rings of eight pointed `--art-ivory` petals outlined in gold, a small `--art-core` centre. Told from punnāga by its star of points | Inline (`flowering-hair.tsx`) | Shloka 4 |
| The moon | An `--art-moon` disc with a 1.6-unit `--gold` rim, faintly shaded toward the limb with `--gold-soft`, and a soft `--art-moon` glow just beyond. Any unlit part is `--art-hair` at about 0.16 opacity with a faint gold outline, so a part-lit moon still shows its whole disc. Never rays: rays make it the sun. Show the ashen half of a half moon, or it reads as Shloka 2's half-risen sun | Inline (`eighth-night-moon.tsx`) | Shloka 5 |
| The moon's halo (pariveṣa) | Rings, never rays. Like a real lunar halo, red on the inner edge: a 2-unit `--sindura` ring 10 units out, then `--art-saffron`, then `--gold`, a ring of alternately large and small gold pearls 28 units out (`m-twinkle`, three groups), and a faint outer ring 40 units out. `--art-vermilion` as a thin ring turned pink by day | Inline (`eighth-night-moon.tsx`) | Shloka 5 |
| The moon's phases | `litPart(night, r)`: the lit part of a waxing moon, lit from above, for nights 1–15 of the bright fortnight. The eighth is exactly half, flat edge down | `primitives.tsx` | Shloka 5 |
| The deer in the moon (mṛgāṅka) | A small leaping blackbuck facing right, in `--art-musk`, with short spiralled horns, a flicked tail, legs out fore and aft, and a pale eye. Soft musk smudge behind it. About 50 units long, so it reads as a dab from afar | Inline (`eighth-night-moon.tsx`) | Shloka 5 |
| Her crescent crest (śekhara) | The fourth night's `litPart` turned over, horns up, radius 22, cradled on the crown's finial: an `--art-moon` fill with a 1.3-unit `--gold` edge, and its glow drawn as two soft `--art-moon` strokes round the crescent itself. Unlike a half moon, a crescent shows only its lit part: with its ashen disc, and with a round glow, it read as a ball in a cup. Clear the crown's rays from under it | Inline (`whole-image.tsx`) | Dhyāna |
| Hibiscus (japā) | Face-on: five broad, slightly ruffled petals (radius 64) turned in a pinwheel, `--art-vermilion` round an `--art-crimson` eye, `--art-crimson` veins and edges, and an `--art-saffron` sheen down each petal. The staminal column is what makes it a hibiscus: a `--gold-soft` stalk from the centre leaning up and out past the petals, pollen dots of `--art-core` on its outer third, five `--art-crimson` stigma pads at the tip. The bindu sits in the eye. Darkening the petals' rim by day made it a brick-red blob | Inline (`whole-image.tsx`) | Dhyāna |
| Her footprints (śrīpāda) | A pair of `--art-vermilion` footprints, toes up, big toes inward, laid on a surface and foreshortened to about 0.7 of their height: a sole with a narrow inner arch and five separate toes. Without the arch and the gap before the toes they read as mittens | Inline (`whole-image.tsx`) | Dhyāna |
| Jewelled vessel (ratna-ghaṭa) | A round-bellied `--gold` pot: a tilted `--gold-soft` lid, a collar line at the neck, a belt of rubies and `--leaf` emeralds by turns between two rows of pearls, a soft `--art-core` sheen on the left of the belly, and upturned petals round the foot. Downturned petals at the shoulder read as fangs | Inline (`whole-image.tsx`) | Dhyāna |
| The eight powers (aṇimādi siddhis) | Eight short `--art-saffron` rays round her source, 76–92 units out, each tipped with an `--art-core` `glint` and a gold dot (`m-twinkle`, three groups). Set them at 0°, 45°, … so her four arms pass between them | Inline (`whole-image.tsx`) | Dhyāna |
| The innermost triangle (trikoṇa) | A hair-fine `--gold-soft` downward triangle round the bindu, circumradius 22 so the bindu's ring sits inside it. Kept faint: bright, with the bindu's glow inside it, it read as an eye in a triangle | Inline (`whole-image.tsx`) | Dhyāna |

When all four weapons appear together, the upper hands hold the noose (left) and the goad
(right), as in Shloka 2, and the lower hands hold the bow (left) and the arrows (right).

### Anticipated

Not yet drawn. Whoever draws one first sets its canon here.

- **The Śrīcakra entire.** The Dhyāna draws only its innermost triangle round the bindu. The site's
  own `YantraMark` in `src/components/ornament.tsx` is that enclosure in a circle. When the names
  reach the cakra and its nine enclosures, build the whole yantra from that triangle outward.
- **Her other hand-held things.** The Dhyāna names, but doesn't draw, the jewelled goblet and red
  water-lily of its first verse, the golden lotus of its third, her three eyes (sun, moon, and fire
  between them, Saundaryalaharī 48), and her red garland. Whoever draws one first sets its canon.

## Palette additions

Colours added to `.adornment` in `src/app/globals.css` beyond the starting set. Record the day
and lamplight values and what the colour is for.

The starting set is `--art-glow`, `--art-vermilion`, `--art-saffron`, `--art-core`, `--art-ember`,
`--art-stone`, and `--art-carve`.

- **`--art-ivory`** (Shloka 4): day `#fffaf0`, lamplight `#f1e8d6`. White petals. The paper colours
  can't serve, because they turn dark by lamplight. Outline ivory shapes in `--gold` so they read
  on paper by day.
- **`--art-hair`** (Shloka 4): day `#1f2a55`, lamplight `#5d6788`. The blue-black gloss of her
  hair, only in glimpses and thin lines. The day value leans indigo so it dilutes to slate blue on
  the paper; a neutral blue-black turned grey.
- **`--art-moon`** (Shloka 5): day `#fdfcf8`, lamplight `#e9edf3`. The moon's pearl face and its
  glow. Cooler than `--art-ivory`, silver by lamplight. By day it barely separates from the paper,
  so a moon depends on its gold rim and its halo.
- **`--art-musk`** (Shloka 5): day `#3b2518`, lamplight `#34221a`. Musk, dark brown. It is only
  ever laid on the pale moon, so it stays dark in both themes.
- **`--art-crimson`** (Dhyāna): day `#7e1d14`, lamplight `#9c3024`. The dark eye of a red flower,
  and its veins. By lamplight `--art-vermilion` and `--sindura` are the same colour, so neither can
  darken a red flower's centre.

## Motion additions

Classes added to the motion vocabulary beyond the starting set: `m-breathe`, `m-sway`,
`m-flicker`, `m-lick`, `m-twinkle`, `m-shimmer`, `m-ember`, `m-late`, `m-later`.

- **`m-sink`** (Shloka 3): surfaces, sinks 15 units while fading out, and surfaces again, over
  `--dur` (default 28s) from `--delay`. For worlds going under in her flood. Give every piece of
  one sinking thing the same `--dur` and `--delay`, and keep anything that marks the fixed
  surface (a clip, a waterline) outside the moving group. Use it on a few elements, never all.

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

### Shloka 3: The drawn bow

- **Component:** `drawn-bow.tsx` (defs prefix `sa3`)
- **Composition:** tension and aim. The sugarcane bow is drawn to full, tilted 12° and aimed at
  the sky, its stave arched over the card and its string a V down to the bindu, the hand that
  draws it. Five flower arrows fan up from the nock to bloom above the grip. Below, her red light
  pours into a pool seen at a slant, with ripple rings and a foreshortened ring of sixteen
  world-eggs floating half-sunk; fainter eggs lie deeper. The first composition with a direction
  of force, and the first with depth.
- **Name → part:**
  - Manorūpekṣukodaṇḍā → `bow`: the jointed sugarcane stave, its grip, and its leaf tufts
  - Pañcatanmātrasāyakā → `arrows`: five flower arrows, each flower bearing one element's sign
  - Nijāruṇaprabhāpūramajjadbrahmāṇḍamaṇḍalā → `flood`: the glow, the pool and its ripples, the
    ring of world-eggs (four of them sinking), and the sunk eggs below
  - Intro, *the bindu* → `bindu`: the point of light where the string is drawn
  - Detail → `bees`: the bowstring, a line of honeybees
- **Palette:** vermilion, saffron, and gold, and `--leaf` for the first time (the cane's leaves);
  no additions.
- **Motion:** `m-breathe` (the flowers), `m-twinkle` (the spark in each egg, in three offset
  groups), `m-shimmer` (the glow and ripples), and the new `m-sink` on four of the sixteen eggs.
- **Notes:** This subtitle reaches x ≈ 228 of the artwork at y ≈ 82–138 on desktop, so the aim
  leans right and the left tip's leaves turn away from the title. A first tapered "pour" of
  light from the bindu to the pool read as a spotlight cone; a soft radial glow replaced it. A
  tiny ring around each egg's spark read as an eye; a plain glint replaced it. On tablet the
  flower heads fall under the "The artwork" badge, as Shloka 2's goad tip does; the bow still
  reads there.

### Shloka 4: Flowering hair, a crown of rubies

- **Component:** `flowering-hair.tsx` (defs prefix `sa4`)
- **Composition:** a hanging ornament in open space that reads from the top down, as the
  stotra's head-to-foot description begins here. A domed ruby crown fills the crown zone, sitting
  on the card, with short rays of gold and red. Her light glows beneath it through the card
  window. Just below the card, a rosette of the four flowers rings the bindu, and a plait woven
  with them hangs from it in a gentle S into the ground zone. The first vertical composition,
  with no frame or ground.
- **Name → part:**
  - Campakāśokapunnāgasaugandhikalasatkacā → `flower-plait`: the rosette and the plait, the
    four flowers in verse order
  - Kuruvindamaṇiśreṇīkanatkoṭīramaṇḍitā → `crown`: the crown, its rubies and flashes, its rays,
    and the glow beneath it
  - Intro, *the point of light* → `light`: the bindu in the rosette, set in saffron light
  - Detail → `stars`: stars above the crown turning red, the nearest already rubies
    (Saundaryalaharī 42)
- **Palette:** vermilion, saffron, and gold, with the new `--art-ivory` and `--art-hair`.
- **Motion:** `m-lick` (ruby flashes, in three offset groups), `m-sway` (the whole plait, from
  its head), and `m-twinkle` (the stars).
- **Notes:** The first crown, a straight tapered stack, read as a pyramid; a swelling dome with a
  broad diadem made it a crown. Side wings on the diadem read as horns and were dropped. A petal
  crest on every tier made a fish-scale texture; bead lines between the tiers show the rows of
  rubies instead. Strands of hair from the crown down to the plait read first as a broom and then
  as parachute cords, so the crown and the plait are joined only by her light. Pointed plait lobes
  read as leaves on a vine; rounded lobes read as a braid. A plait that left the rosette sideways
  made a question mark, so it now falls downward first. The bindu's pale glow on the navy of the
  rosette turned grey, so it sits in a saffron disc. On tablet the crown falls partly under the
  "The artwork" badge, as Shloka 2's goad tip does.

### Shloka 5: The eighth-night moon on her brow

- **Component:** `eighth-night-moon.tsx` (defs prefix `sa5`)
- **Composition:** a nocturne built on a rhyme. The eighth-night moon stands above the card at
  exactly half, flat edge down like a brow, its ashen half falling behind the card. Below it, the
  full moon is her face, with one dab of musk on it that is, up close, a leaping deer. Each moon
  wears a halo of red, saffron, and gold rings and pearls, and fine rings of moonlight spread
  from both and cross between them. A garland of the fifteen nights of the bright fortnight hangs
  at the foot. The first night piece, the stillest, and the first with a dark point at its focus.
  There is no separate bindu: the full moon is her.
- **Name → part:**
  - Aṣṭamīcandravibhrājadalikasthalaśobhitā → `half-moon`: the half-lit moon, its ashen half, its
    glow and halo
  - Mukhacandrakalaṅkābhamṛganābhiviśeṣakā → `face-moon`: the full moon, its glow and halo, and
    the musk mark as a deer (*mṛganābhi*, "deer's navel", on the *mṛgāṅka*, the "deer-marked")
  - Intro, *their light* → `moonlight`: the soft glow and the crossing rings between the moons
  - Detail → `fortnight`: fifteen waxing moons on a gold thread, the eighth ringed in red and
    gold beneath her face, the same half as her brow
- **Palette:** `--art-moon` and `--art-musk` are new; vermilion, saffron, and gold only in the
  halos and the fortnight's beads.
- **Motion:** `m-shimmer` (the glow, the halo rings, and the moonlight rings) and `m-twinkle` (the
  halo pearls and the fifteen nights, in three offset groups). The moons themselves are still.
- **Notes:** The first render was two white discs on the paper that read as buttons, and fogged by
  lamplight; the halos brought the series' pigment in, and the glows were halved. A thin inner
  gold ring on each moon made it a plate and was dropped. The crossing moonlight rings fill the
  plate's width, which two stacked moons alone left empty. On tablet the half moon falls partly
  under the "The artwork" badge, as in earlier shlokas.

### Dhyāna: The whole image

- **Component:** `whole-image.tsx` (defs prefix `sa0`)
- **Composition:** her whole form, gathered from four separate meditation verses and laid out from
  crest to foot as a temple image is, with nothing where she is but light. The crescent rests on
  the ruby crown in the crown zone, between the noose (left) and the goad (right). Her vermilion
  body is a tall glow behind the card. Below it a scarlet hibiscus opens at her heart, ringed by
  eight short rays, and her lower arms reach out to the bow (left) and the five arrows (right). She
  sits on a gold lotus, and beneath it her red footprints rest on a jewelled vessel. The first
  composition of her entire image rather than one or two of her attributes, and the first with all
  four hands full (Shloka 2's lower arms were empty).
- **Phrase → part:**
  - Line 1, *sindūrāruṇa vigrahāṃ* → `light`: the tall vermilion glow of her body
  - Line 1, *māṇikyamauli sphurat* → `crown`: the ruby crown, flashing
  - Line 2, *tārā nāyaka śekharāṃ* → `moon`: the crescent crest on the finial
  - Line 4, *ratna ghaṭastha raktacaraṇāṃ* → `vessel`: the jewelled pot and the red footprints on it
  - Line 5, *dhṛtapāśāṅkuśapuṣpabāṇacāpām* → `weapons`: four arms of light with bangles, the noose,
    the goad, the bow strung with bees, and the five arrows in the elements' order
  - Line 6, *aṇimādibhirāvṛtāṃ mayūkhaiḥ* → `siddhis`: eight short rays tipped with points of light
  - Line 7, *padmāsanasthāṃ* → `lotus-seat`: the gold lotus seat
  - Line 14, *japākusumabhāsurāṃ* → `hibiscus`: the hibiscus at her heart
  - Intro, *a point of light* → `bindu`: the bindu in the hibiscus's eye, which the second verse
    calls "I"
  - Detail → `yantra`: the Śrīcakra's innermost triangle round the bindu (Line 10, *śrīvidyāṃ*)
- **Palette:** vermilion, saffron, and gold; `--art-moon` for the crescent, `--leaf` for the bow's
  tufts and the emeralds, and the new `--art-crimson` for the hibiscus's eye.
- **Motion:** `m-shimmer` (her body's glow), `m-twinkle` (the eight points of light, in three
  groups), and `m-lick` (the crown's ruby flashes, from `RubyCrown`).
- **Notes:** The four verses give her different hands; the artwork draws the four weapons (verses
  2 and 4) and leaves the others to the Anticipated list above. This was the second use of the
  ruby crown, the arms and bangles, the lotus pedestal, and the moon's phases, so all four moved
  into `primitives.tsx`; Shlokas 1, 2, 4, and 5 render byte-for-byte as before. At Shloka 4's
  scale × 0.72 the crown read as a beehive; at 0.84, its diadem resting on the card, it reads as a
  crown. The crescent first read as a pearl, then as a bowl: dropping its ashen disc and its round
  glow, and slimming it to the fourth night, made it a moon. On tablet the goad falls partly under
  the "The artwork" badge, as in earlier shlokas.

## Open questions

- None at present. Record here anything a future artwork should settle.
