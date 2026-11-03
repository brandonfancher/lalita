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
| Rays of radiance | 108 gold hairlines from the source, alternating long and short, fading outward | `radiance` in `primitives.tsx` (promoted at Shloka 12, used by Shlokas 8, 9, 12 and 13); Shloka 1's, built differently, stays inline | Shloka 1 |
| Royal parasol (chattra) | Vermilion dome with gold ribs, scalloped fringe, beaded tassels, bud finial | Inline | Shloka 1 |
| Lotus pedestal | `lotusPetals`: a row of pointed, upturned gold petals. A lotus seat stacks a taller back row (`--art-saffron`), a front row (`--art-core`, so it reads as gold by day, not khaki), a beaded band, and a row turned down (negative `height`) | `primitives.tsx` | Shloka 1 |
| Round arch | `archPath` and `alongArch` | `primitives.tsx` | Shloka 1 |
| Her noose (pāśa) | `Noose`: a loop of twisted `--art-vermilion` cord (red because *rāga* is colouring), gold binding where it closes, four gold beads, a tail ending in a gold tassel. Held at the origin, loop up | `primitives.tsx` | Shloka 2 |
| Her goad (aṅkuśa) | `Goad`: a banded gold shaft with a bud-shaped butt, a lotus collar, a leaf-shaped spear point, and a hook curving out to the right. Held at the origin, pointing up | `primitives.tsx` | Shloka 2 |
| Glint | `glint(s)`: a four-pointed flash of `--art-core`, for blazing metal and jewels | `primitives.tsx` | Shloka 2 |
| Her arms | Beams of light from her source, drawn as three nested tapering layers that fade in from the source, never as limbs: `armBeam` (and `wrist` for where the bangle sits), painted with `ArmLight` and a gradient from `--art-saffron` to `--art-core`. Empty-handed (Shloka 13) they leave her light in an X, like the points of a flash, and fade out at their tips; the wrists stay bare, as the bangle marks where a weapon is held | `primitives.tsx` | Shloka 2 |
| Bangle (kaṅkaṇa) | `Bangle`: a gold ellipse across the arm, a paper-coloured inner line, three vermilion jewels on the front | `primitives.tsx` | Shloka 2 |
| The rising sun | Half a disc on the horizon (saffron centre, vermilion rim, gold rim line), sixteen alternating vermilion and saffron rays | `sunRays` in `primitives.tsx` (promoted at Shloka 8); the disc inline | Shloka 2 |
| The sun's full disc | A radial gradient from `--art-saffron` (a quarter out) to `--art-vermilion` at the rim, a 1.3-unit `--gold` rim line and a fainter gold ring 9 units inside, and 32 rays, at the half-risen sun's spacing, alternating vermilion (long) and saffron. As a jewel it adds a ring of small `--gold-soft` beads just outside the rim, and its rays stop short of the fittings above and below. Its radiance is the 108 gold hairlines of Shloka 1, starting at the disc | `sunRays` in `primitives.tsx`; the disc inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| The sea | Rows of shallow gold ripple arcs, closer near the horizon, faded at the sides; the light on it as a column of saffron lozenges | Inline | Shloka 2 |
| Her sugarcane bow (ikṣu-kodaṇḍa) | `SugarcaneBow` with a `BowShape` (`half`, `grip`, `bend`): a thick gold cane stave with a paler edge, jointed every 25 units, bound at the grip, a tuft of three `--leaf` leaves at each tip. Drawn in a frame where it is aimed up; `bowTips` gives where the string is tied. Drawn, the string runs from each tip to the origin; braced, tip to tip | `primitives.tsx` | Shloka 3 |
| Bowstring of bees | `BeeString`: a gold hairline with a line of tiny bees along it, heads toward `to` | `primitives.tsx` | Shloka 3 |
| Her flower arrows (puṣpa-bāṇa) | `FlowerArrow`: a gold shaft, saffron fletching, a gold calyx, and a budding flower (vermilion centre petal between two saffron ones). Nock at the origin, pointing up | `primitives.tsx` | Shloka 3 |
| The five elements' signs | Inside `FlowerArrow` via `sign`: a ring for space (sound), a six-pointed star for air (touch), an upward triangle for fire (form), a crescent with its horns up for water (taste), a square for earth (smell). Filled with `--art-core` on the vermilion petal. When the five arrows appear together, set them left to right in that order | `primitives.tsx` | Shloka 3 |
| A world-egg (brahmāṇḍa) | An egg, broad end down, in `--art-stone` with a gold rim and a saffron `glint` inside. Afloat in her light, it sits half-sunk: the part below the surface tinted vermilion, a flat gold ring where the surface meets it | Inline | Shloka 3 |
| Her ruby crown (koṭīra) | A gold dome that swells from the finial to a broad diadem: four tiers, each a band of rubies edged with a line of gold beads, the bands dipping slightly at the front. The diadem carries a row of larger rubies, a large front ruby in a ring of ten gold petals, a crest of gold petals each with a red dot, and a beaded lower rim. A small petal crest, a gold dome, and a bud holding one ruby make the finial. No side wings (they read as horns). Short rays spring from it, gold alternating with red | `RubyCrown` in `primitives.tsx` (drawn at Shloka 4's size; scale it with a transform, and pick its rays with `rays`) | Shloka 4 |
| Ruby | An `--art-vermilion` oval (a little taller than wide) in a thin `--art-carve` setting ring, with a short `--art-core` highlight arc at the upper left. A flashing ruby adds a `Flash` (a `glint` with `m-lick`) | `Ruby`, `Flash` in `primitives.tsx` | Shloka 4 |
| Her hair | Never drawn as a mass or a head. It shows as flowers and ornament, with `--art-hair` glimpsed between them: a plait of rounded lobes laid alternately from each side, each lobe with a gold sheen line and a flower on it, ending in a gold binding and a small tuft. Loose strands read as a broom or cords; don't draw them | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Campaka | Nine slender, pointed, slightly twisted petals (`campakaPetal`) of `--art-core` edged in `--art-saffron`, a saffron centre. Seen from the side, see "Campaka, newly opened" | `campakaPetal` in `primitives.tsx`; the face-on flower inline (`flowering-hair.tsx`) | Shloka 4 |
| Aśoka | A round cluster of seven small four-petalled florets, mostly `--art-vermilion`, a few `--art-saffron`, with eleven long curved stamens tipped in `--art-core` fanning from the top | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Punnāga | Four rounded `--art-ivory` petals outlined in gold, round an `--art-core` boss ringed with gold stamen dots and a vermilion pistil | Inline (`flowering-hair.tsx`) | Shloka 4 |
| Saugandhika (white water-lily) | Two rings of eight pointed `--art-ivory` petals outlined in gold, a small `--art-core` centre. Told from punnāga by its star of points | Inline (`flowering-hair.tsx`) | Shloka 4 |
| The moon | An `--art-moon` disc with a 1.6-unit `--gold` rim, faintly shaded toward the limb with `--gold-soft`, and a soft `--art-moon` glow just beyond. Any unlit part is `--art-hair` at about 0.16 opacity with a faint gold outline, so a part-lit moon still shows its whole disc. Never rays: rays make it the sun. Show the ashen half of a half moon, or it reads as Shloka 2's half-risen sun | Inline (`eighth-night-moon.tsx`) | Shloka 5 |
| The moon's halo (pariveṣa) | Rings, never rays. Like a real lunar halo, red on the inner edge: a 2-unit `--sindura` ring 10 units out, then `--art-saffron`, then `--gold`, a ring of alternately large and small gold pearls 28 units out (`m-twinkle`, three groups), and a faint outer ring 40 units out. `--art-vermilion` as a thin ring turned pink by day | `MoonHalo` in `primitives.tsx` (promoted at Shloka 8) | Shloka 5 |
| Moonlight | Fine `--gold-soft` rings round the moon, about 0.6 units wide, 22–26 units apart, fading outward from about 0.45 opacity. Where a second light shares the sky, they cross (two moons) or fade out against it (the sun's radiance) | Inline (`eighth-night-moon.tsx`, `sun-moon-earrings.tsx`) | Shloka 5 |
| The moon's phases | `litPart(night, r)`: the lit part of a waxing moon, lit from above, for nights 1–15 of the bright fortnight. The eighth is exactly half, flat edge down | `primitives.tsx` | Shloka 5 |
| The deer in the moon (mṛgāṅka) | A small leaping blackbuck facing right, in `--art-musk`, with short spiralled horns, a flicked tail, legs out fore and aft, and a pale eye. Soft musk smudge behind it. About 50 units long, so it reads as a dab from afar; on a smaller moon, scale it with the disc (0.66 on a moon of radius 56) | `MoonDeer` in `primitives.tsx` (promoted at Shloka 8) | Shloka 5 |
| Her crescent crest (śekhara) | The fourth night's `litPart` turned over, horns up, radius 22, cradled on the crown's finial: an `--art-moon` fill with a 1.3-unit `--gold` edge, and its glow drawn as two soft `--art-moon` strokes round the crescent itself. Unlike a half moon, a crescent shows only its lit part: with its ashen disc, and with a round glow, it read as a ball in a cup. Clear the crown's rays from under it | Inline (`whole-image.tsx`) | Dhyāna |
| Hibiscus (japā) | Face-on: five broad, slightly ruffled petals (radius 64) turned in a pinwheel, `--art-vermilion` round an `--art-crimson` eye, `--art-crimson` veins and edges, and an `--art-saffron` sheen down each petal. The staminal column is what makes it a hibiscus: a `--gold-soft` stalk from the centre leaning up and out past the petals, pollen dots of `--art-core` on its outer third, five `--art-crimson` stigma pads at the tip. The bindu sits in the eye. Darkening the petals' rim by day made it a brick-red blob | Inline (`whole-image.tsx`) | Dhyāna |
| Her footprints (śrīpāda) | A pair of `--art-vermilion` footprints, toes up, big toes inward, laid on a surface and foreshortened to about 0.7 of their height: a sole with a narrow inner arch and five separate toes. Without the arch and the gap before the toes they read as mittens | `Footprint` and `FOOTPRINT_TOES` in `primitives.tsx` (promoted at Shloka 19); `edge` adds a hair-fine gold rim that keeps its width under scaling | Dhyāna |
| Jewelled vessel (ratna-ghaṭa) | A round-bellied `--gold` pot: a tilted `--gold-soft` lid, a collar line at the neck, a belt of rubies and `--leaf` emeralds by turns between two rows of pearls, a soft `--art-core` sheen on the left of the belly, and upturned petals round the foot. Downturned petals at the shoulder read as fangs | Inline (`whole-image.tsx`) | Dhyāna |
| The eight powers (aṇimādi siddhis) | Eight short `--art-saffron` rays round her source, 76–92 units out, each tipped with an `--art-core` `glint` and a gold dot (`m-twinkle`, three groups). Set them at 0°, 45°, … so her four arms pass between them | Inline (`whole-image.tsx`) | Dhyāna |
| The innermost triangle (trikoṇa) | A hair-fine `--gold-soft` downward triangle round the bindu, circumradius 22 so the bindu's ring sits inside it. Kept faint: bright, with the bindu's glow inside it, it read as an eye in a triangle | Inline (`whole-image.tsx`) | Dhyāna |
| Her brows as the toraṇa | Two gold arches standing on a straight gold beam, each shaped as a brow: a blunt head by the centre, thickest just after it, tapering to a tail that stands on the beam on a small gold knob with a vermilion dot. A vermilion line runs inside each arch, an `--art-core` sheen along its top, and gold beads under it. Keep them low and long (about 2.5 : 1): taller, they read as two horseshoe arches. The gap between the heads is the ājñā point | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Festoon (vandanavāra) | A row of mango leaves hanging tip down from a beam, `--leaf` with a `--gold-soft` midrib, lengths alternating, a jasmine bud between each pair; `m-sway` in three groups | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Jasmine (mallikā) | Small `--art-ivory` buds outlined in hair-fine gold, strung close on a gold thread; a string ends in a small gold bell. Chosen over marigold, which reached India only after 1500 | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Plantain post | A tall, faintly tapering `--leaf` stem with slanting sheath lines, tied with a vermilion and a gold thread, two plantain leaves arching out and down from its top (keep the left ones below the title) | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Fish (mīna) | Seen from above, as fish are seen in shallow water: a slim body about 70 units long, bent a little as if turning, with a forked tail, two pairs of side fins in `--art-saffron`, a gold spine line, gold scale arcs, and two small eyes (`--art-musk` in an `--art-core` ring). The body is vermilion down the spine, shading to saffron at the sides. A faint `--art-crimson` shadow falls on the bed beneath. A pair circles one centre, one turned 180° from the other. `m-dart` | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Star | `Star`: a four-pointed `glint` in `--gold-soft` (`m-twinkle`, three groups). A bright star adds a faint `--gold-soft` disc behind it. A star put out by a greater light is a still `--gold-soft` dot, or at most a hair-fine ring | `primitives.tsx` | Shloka 4 (promoted at Shloka 7) |
| Campaka, newly opened | Seen from the side as a slim torch: eleven `campakaPetal`s from one calyx, most nearly closed (within 9° of upright), only the outer pair parting, tips curling a little outward. Filled with a gradient from `--art-saffron` at the base through `--art-core` to `--art-ivory` at the tips (the palest, first-day flower), edged in `--art-saffron`. A small three-sepal `--leaf` calyx; a straight `--leaf` stem with a `--gold-soft` line; lance-shaped `--leaf` leaves with a gold midrib. Splayed wider, it read as a daisy or an agave | `campakaPetal` in `primitives.tsx`; the flower inline (`campaka-jewel.tsx`) | Shloka 7 |
| Diamond (vajra) | Face-on: an eight-sided `--art-moon` girdle with a `--gold` edge, the table an octagon half its size, `--gold-soft` facet lines from the table's corners to the girdle's, a small `--art-core` `glint` at the upper left, in a gold cup. The facets keep it from reading as a pearl | `diamond` in `primitives.tsx` (promoted at Shloka 14) | Shloka 7 |
| Her nose stud (mūkkutti) | Seven diamonds in a gold rosette (one in the middle, six round it, one straight up), beaded at the rim, outlined in `--art-carve`. A small `--art-moon` glow just round it makes it white-hot against gold by day; behind that a larger `--art-core` glow, a four- and an eight-pointed `glint`, and sixteen hair-fine rays, the upward one longest. Flashes on three stones | Inline (`campaka-jewel.tsx`) | Shloka 7 |
| Pearl (muktā) | An `--art-moon` disc with a hair-fine gold edge, a `--gold-soft` shading arc on the lower right, an `--art-core` highlight at the upper left; hung from a small gold ring under a gold cap. Too heavy below a radius of about 4: see "Strings of pearls" for small ones | `Pearl` in `primitives.tsx` (promoted at Shloka 13) | Shloka 7 |
| Kadamba | A head is a ball of radius 9–14: a radial gradient from `--art-core` (upper left) through `--art-saffron` to `--art-vermilion`, stippled with tiny `--art-ivory` florets in a sunflower spiral, and ringed by short `--art-saffron` hairline styles that stand out to about 1.3 times its radius, each tipped with an `--art-ivory` dot edged in gold (`m-twinkle`, three groups). The pale tips make it a kadamba and not an orange or a berry. Heads come in sprays (mañjarī) of four or five on short `--leaf` stalks, among broad, pointed, glossy `--leaf` leaves with a `--gold-soft` midrib and curved veins, long enough to show beyond the heads | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| Ear pendant (tāṭaṅka) | Hung from a gold stud in the lobe (a ruby in it on the sun's side, a pearl on the moon's), a short gold link with gold beads, a bail, the disc, and a drop beneath (a `Ruby` under the sun, a pearl under the moon). Viewer's left is her right ear: the sun there, the moon on the other side. Each pendant swings from its lobe (`m-sway`, see Motion additions) | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| The moon as a little boat (uḍupa) | A small gold crescent, horns up, radius 13, riding the top of the moon's disc as its bail, with three `--art-vermilion` beads along the hull and the ring for the link between its horns | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| Balance (tulā) | A gold beam, thickest at the middle and tapering to bud finials, with four `--gold-soft` bands, a carved centre line, and a boss at the pivot. It hangs in a fork (two gold cheeks under a crossbar with a red mark at its centre) from a ring and a short chain. A tongue stands at right angles to the beam, so when the beam tips, the tongue leans out from under the red mark toward the heavier pan. Each pan is a shallow gold bowl on three cords (one behind) from a ring under a hook at the beam's end: a `--gold-soft` inside, a beaded front rim, a carved band, a saffron sheen, and a bud drop beneath. The pans swing from their hooks (`m-sway`) | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Her light in a vessel | A pool of light filling the vessel (a radial gradient from `--art-core` through `--art-saffron` to `--art-vermilion`), a soft tall glow rising from it, and the bindu hanging in the glow just above the surface, not on it: a bright dot on a red ellipse reads as an eye. Her radiance (the 108 hairlines) starts at the bindu and fades in from nothing | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Ruby mirror (ādarśa) | A round hand mirror: a flat `--art-vermilion` face with a soft `--art-crimson` bevel at its edge and two diagonal `--art-core` sheen streaks, in an `--art-carve` setting, a beaded gold frame, and a gold handle with a collar and a bud foot. A shaded, domed face, or a crest of petals on the frame, made it a pomegranate | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Coral (vidruma) | A branching sprig of round-capped `--art-vermilion` strokes over slightly wider `--art-crimson` ones, knobbed tips, a few tiny `--art-ivory` polyps (fresh coral is alive; `m-twinkle`), in a small gold mount | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Bimba (ivy gourd) | A `--leaf` creeper with five-lobed, heart-based leaves veined in `--gold-soft`, coiling tendrils, and small oval gourds on short stalks. Each gourd is scarlet only on the side facing her light and `--leaf` on the far side, with pale stripes there and a core sheen on the red side: Śaṅkara's bimba is red only by reflecting her | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Water in a channel | Filled with the miniature painters' pattern of small arcs, each row set half an arc along (a `<pattern>`, `--gold-soft`), over a soft saffron glow, between gold banks with a fainter outer kerb. Rounded, organic banks: straight banks and square corners read as a pipe, a band of constant width as a snake. Dashed flow lines read as road markings by lamplight | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Sprout (aṅkura) | One seedling: a short tapered `--art-core` stem with gold edges rising from the split seed to two broad, pointed seed-leaves opened in an upright V (about 50 units wide at the widest, the left a little taller). Each leaf is filled with a faint `--art-core` to `--art-saffron` gradient under a 1-unit `--gold` edge, with a hair-fine gold midrib. Opened wide and near level, the leaves read as wings or a moustache; upright, as a seedling | Inline (`sprouting-seed.tsx`) | Shloka 10 |
| The rows of light (dvija-paṅkti) | Sixteen beads along each seed-leaf's midrib, base to tip, shrinking from r 3.7 to 1.7: `--art-ivory` with a fine gold edge and an `--art-core` glint (`m-twinkle`, three groups). A row of light, never a row of shapes: drawn as teeth or as sprouts in earth they read as a mouth (see Shloka 10's notes) | Inline (`sprouting-seed.tsx`) | Shloka 10 |
| Seed (bīja) | A `--gold` husk split open at the top like a pistachio shell, its two lips parting round her bindu and whole below, with an `--art-carve` edge, an `--art-core` sheen on each lip, and a hair-fine gold root curling down from its foot. Her light sits in the split; the whole lower part carries ह्रीं | Inline (`sprouting-seed.tsx`) | Shloka 10 |
| The eight quarters (diś) | A 1.1-unit `--gold` horizon ring with a four-pointed gold `glint` at each of the eight quarters (every 45°, north at the top). Where the quarters are drawn toward her, the ring dips between the pinned points, about a tenth of its radius, into an eight-cusped shape. Shloka 10's is egg-shaped, taller above her than below, so its north quarter clears the card | Inline (`sprouting-seed.tsx`) | Shloka 10 |
| Fragrance (āmoda) | Never smoke or wisps: only what it does. Copies of the horizon ring travel in toward her (`m-gather`), gold far off and `--art-moon` (camphor-white) near her, by drawing every ring twice under two radial masks | Inline (`sprouting-seed.tsx`) | Shloka 10 |
| The seed-syllable ह्रीं | ह्रीं in Tiro Devanagari, 17 units, `--art-carve`, engraved centred on the whole lower part of the husk, directly under her light. `--art-carve` (paper by day, dark by lamplight) is the strongest contrast on gold in both themes; `--art-crimson` was too faint by day. It closes each of the three parts of the Śuddhavidyā mantra; the mantra itself is not written out | Inline (`sprouting-seed.tsx`) | Shloka 10 |
| Sarasvatī's lute (kacchapī) | Lying on its back, seen from the side, bowl on the right: a `--gold` bowl hanging below a `--gold-soft` soundboard ellipse, its bare part tiled with hexagonal tortoise plates in `--art-carve` (the plates are what make it a kacchapī, not any vīṇā); a long gold neck with sixteen gold frets on a dark ridge, closing up toward the bowl; a pegbox with four pegs, alternately up and down; a gold scroll curling down at the end; a small gold gourd hanging under the neck near the pegs; two hair-fine `--gold-soft` strings, straight and still. About 370 units long | Inline (`silenced-lute.tsx`) | Shloka 11 |
| Its cloth cover (cola) | An `--art-vermilion` cloth thrown over the bowl from the bridge end: it falls past the bowl in parallel `--art-crimson` pleats with a scalloped, fringed lower edge, and its hem slants back across the shell. A woven border inside the hem and lower edge (a `--gold-soft` band, a vermilion line, a dashed gold line, a solid gold edge), scattered `--gold-soft` dots, and a gold tassel at the corner. Pleats fanning from one point made it a red fan | Inline (`silenced-lute.tsx`) | Shloka 11 |
| The flood of her light (prabhāpūra), seen from the side | A level surface: a 1.3-unit `--gold` line with a 3-unit `--art-core` line just under it, a flat `--art-core` glow where her light meets it. Below, a vertical gradient from `--art-core` through `--art-saffron` to `--art-glow` (never `--art-vermilion` in the depths: diluted, it went pink by day), faded at the sides; wavering dashed gold currents, fainter with depth; and nine shafts of her light fanning down from under her, each a tapered wedge drawn twice, in `--art-core` and `--art-ivory` (the ivory is what shows them by day). A swelling, convex surface read as a sand dune. Shloka 3's flood is the same light seen at a slant | Inline (`silenced-lute.tsx`) | Shloka 11 |
| Kāmeśa's mind | His crescent, drawn as her crest is (Dhyāna), radius 32, sunk deep in the flood and turned well onto its side (244°): turned nearly horns up and set under her bindu, it would make a face. A faint saffron tint over it puts it under the light; `m-sink`; small `--art-moon` pearls of light rise from it on `m-ember` and break at the surface (clipped to the flood) | Inline (`silenced-lute.tsx`) | Shloka 11 |
| Kailāsa | A small broad dome with steep faces, on the far shore of the flood with low gold ridges either side: snow (`--art-moon`) on its upper part, a snow-filled gully down the south face, short gold strokes for the bands of rock that cross it, the rest `--gold-soft` at low opacity. Clipped to above the surface. A pointed white cap read as Mount Fuji, and a big white triangle as a tent | Inline (`silenced-lute.tsx`) | Shloka 11 |
| Haṃsas in flight | Wild geese, about 20 units long: an `--art-moon` body, neck and head outlined in hair-fine gold, a saffron beak, wings by turns raised and lowered with a `--gold-soft` far wing. Flown as a small skein, heading down to water. Never a single bird by Sarasvatī's lute, where it would read as her mount | Inline (`silenced-lute.tsx`) | Shloka 11 |
| Her face as a mirror (mukha-mukura) | A hand mirror of polished metal, upright, face radius 76: an `--art-ivory` face under a faint `--gold-soft` diagonal shading and a soft bevel, two diagonal `--art-moon` sheen streaks (one broad, one thin, lower left to upper right), an `--art-carve` setting line, a 10-unit gold frame with 44 `--gold-soft` beads. It rests in a small lotus cup (the lotus seat's rows, at about a quarter of the size) on a gold stem, her chin, with a pale sheen line, two banded rings, and a collar, knob and bud at the foot. Nothing is reflected in it but her light. Kept distinct from Shloka 9's ruby mirror, which is a red standard she outdoes. Wherever it returns, her face is this mirror, and the marriage thread stays tied on its stem | `handMirror`, `HandMirror` (with `MirrorShading` and `MirrorFaceClip` in the defs) in `primitives.tsx` (promoted at Shloka 13) | Shloka 12 |
| The marriage thread (māṅgalyasūtra) | A 5-unit `--art-turmeric` cord edged in `--gold`, its twist a dashed `--art-saffron` hairline. Wound once round what it is tied to (the back arc hidden behind it) and closed with three knots across the front, each a turmeric oval with a saffron crease. Both loose ends hang together to one side, ending in gold beads and turmeric tassels; ends spread to both sides of a stem read as a trident | `marriageThread`, `MarriageThread` (with `ThreadMask` in the defs) in `primitives.tsx` (promoted at Shloka 13) | Shloka 12 |
| The tāli | A gold pīpal leaf hung from the middle knot on a small gold bail: broad base up, long drip tip down, about 48 by 81 units, with an `--art-carve` midrib, four pairs of carved veins, an `--art-core` sheen on the left shoulder, and a `--sindura` kumkum dot near the top. Kept generic, without any one community's emblem. With a short tip and no veins it read as a heart pendant. A tāli once tied is never left off | Part of `MarriageThread` in `primitives.tsx` | Shloka 12 |
| The three lines of her throat (Saundaryalaharī 69) | Three hair-fine (0.75) `--gold-soft` arcs 13 units apart, sagging gently across the plate from x 130 to 510 under the knot, faded out at both ends. Never darker: stronger, with the stem through them, they would turn the mirror into a head on a neck | Inline (`mirror-and-knot.tsx`) | Shloka 12 |
| Armlet (keyūra) | Worn high on the arm, nearer her light. A broad gold band across the beam (an ellipse, rx 15 and ry 5, stroked 6 wide over an `--art-carve` edge, with an `--art-core` line along its front) and a pointed gold crest standing up from it toward her light, as on Chola bronzes: two `--leaf` emeralds and a `Ruby` on the crest, a gold bead at its point. Drawn at 1.25× on Shloka 13's arms | Inline (`gold-and-pearls.tsx`) | Shloka 13 |
| Arm band (aṅgada) | Worn further out on the arm than the keyūra: two thin gold rings (rx 13, ry 4.2, stroked 1.8) close together, with seven `--gold-soft` beads between them along the front. Drawn at 1.2×. Kept plainer than the keyūra so the pair reads as two different ornaments | Inline (`gold-and-pearls.tsx`) | Shloka 13 |
| Jewelled collar (ratna-graiveya) | A 14-unit `--gold` band over an `--art-carve` edge, its plaques parted by carved joints, set with sixteen stones, rubies (`Ruby`) and `--leaf` emeralds by turns (the Dhyāna vessel's belt), between an outer row of `--art-moon` pearls and a smaller inner row. On the mirror's stem it hangs from just under the lotus cup as a broad U, about 150 units wide, outside the marriage thread. Narrower, its ends closed up under the cup and it read as a ring round the stem | Inline (`gold-and-pearls.tsx`) | Shloka 13 |
| Its pendant (cintāka) | A round gold medallion (radius 14) on a small bail at the collar's lowest point: an `--art-carve` rim, an `--art-core` sheen arc, twelve small pearls in a ring round a central `Ruby`, a `Flash`, and a `Pearl` drop beneath. Kept round: an almond shape with a bright stone would read as an eye | Inline (`gold-and-pearls.tsx`) | Shloka 13 |
| Strings of pearls (lola-muktāphala) | Loose strings hung straight down from the collar's outer edge, a hair-fine gold thread through pearls of radius 2.5 spaced 5.7 apart (each `--art-moon` with a 0.5 gold edge and a tiny `--art-core` highlight), ending in a gold bead. Of unequal lengths and placed unevenly, so they never make a fringe or a beard. Each swings from its own top (`m-sway`, three groups). The pearls nearest her light blush with a faint `--sindura` arc on top (Saundaryalaharī 74) | Inline (`gold-and-pearls.tsx`) | Shloka 13 |
| Gaming board (aṣṭāpada) | Eight squares by eight, seen at a slant from the front: a `--gold` frame with a 7-unit gold front edge (a dashed `--art-carve` line along it) on two small gold feet, a field of `--art-stone` tinted with saffron inside a thin `--art-vermilion` line, a gold grid, and the old board's marked squares (the four corners and the four at the centre) crossed in vermilion. A vermilion border band went salmon-pink by day | Inline (`grown-stake.tsx`) | Shloka 14 |
| Dice (pāśaka) | Oblong four-sided dice, about 22 by 7.6 units, foreshortened to 0.72 of their height: `--art-ivory` with a fine gold edge and a row of `--art-crimson` pips, thrown at slight angles | Inline (`grown-stake.tsx`) | Shloka 14 |
| His jewel (Kāmeśvara's love) | A face-on `diamond` (radius 17), white for Śiva, held upright in his crescent (the fourth night's `litPart`, radius 25, turned horns up, drawn as her crest is in the Dhyāna, with its two soft `--art-moon` strokes), the crescent's foot resting on the board with a faint `--art-crimson` shadow. A `Flash` passes over it. On a gold stand, it read as a little globe | Inline (`grown-stake.tsx`) | Shloka 14 |
| The watering basin (ālavāla) | A low ring of raked earth seen at a slant (radius 124 by 33): `--art-stone` tinted with saffron and a little `--art-musk`, a gold rim, crumbs of musk earth along its top, and a soft musk shade at its foot instead of an outlined base. Inside, a pool of her light (a radial gradient from `--art-core` to `--art-saffron`) with hair-fine `--art-ivory` ripple rings round the point where the creeper leaves the water. It lies in a bed of shallow furrows running across, closer toward the far side, with clods along the near ones. The painters' scale pattern of water, inside a rim, made a lattice pie; a pale water fill and an outlined base made a dish; a runnel joined to it made a ladle; rings round it read as a pond | Inline (`grown-stake.tsx`) | Shloka 14 |
| The creeper of down (romāli-latā) | A single dark stem in `--art-hair`, filled with `taper` from 6.2 units at the root to 2.6 at the tip, with a hair-fine `--gold-soft` sheen along it. Heart-based pointed `--leaf` leaves on short stalks every 23 units, alternately each side, with a `--gold-soft` midrib and four veins, smaller toward the tip, and tendrils in `--art-hair` coiling off it. It springs from her light and never rises straight up from it: a straight line with a pair above and a point below would draw the body the series never draws. At Shloka 15 it climbs her unseen waist in a spiral (see "The unseen upright"), with a leaf or a tendril at the side of each half-turn, and leaves it at the top to bow over under the fruit | `CreeperLeaf`, `creeperTendril`, `taper`, `through`, and `along` in `primitives.tsx` (promoted at Shloka 15); the stem inline | Shloka 14 |
| The pair of fruit (phala-kuca-dvayī) | Two round fruit (radius 15, slightly squat) on one forked `--art-hair` stalk with a leaf at the fork and one on each stalk: a radial gradient from `--art-core` through `--art-turmeric` to `--art-saffron` and a vermilion rim, a vermilion blush on the lower right, an `--art-ivory` sheen arc, a small saffron dimple where the stalk goes in. Orange, with a star-shaped calyx, they read as tomatoes; without leaves, as marbles. Hanging (Shloka 15), they are scaled 1.3 about the fork and swing from it (`m-sway`) | `Fruit`, `FruitGradients`, `FRUIT_R` in `primitives.tsx` (promoted at Shloka 15) | Shloka 14 |
| The unseen upright (her waist, inferred) | Never drawn: shown only by what wraps round it. A slender upright (half-width 33, narrowing to 25 at the middle) leaning slightly right as it rises, whose outline is used only as a mask: everything that passes behind it (the back turns of the creeper, the back of each band, tendrils gripping it) is drawn under that mask and vanishes there, while the front halves are drawn over it. Seen a little from above, so a ring round it is an ellipse 0.32 as tall as wide. Inside it, only a soft column of her light. With wide-spaced turns the creeper read as scattered strokes; a pitch of 60 (44 at the middle) and a coil just outside the outline made it read as a coil round a pole | Inline (`what-it-holds-up.tsx`) | Shloka 15 |
| Silk band (paṭṭa) | A 12-unit band of `--art-vermilion` silk tied round something: its front a strip between two front half-ellipses, its back (in `--art-crimson` over vermilion) hidden where it passes behind; slanting `--art-crimson` pleats, a dashed `--gold-soft` weave line inside each edge, and a `--gold` line on each edge, the border of a royal band. Knotted at the front with a small vermilion knot and a crimson crease. Loose ends are tapered ribbons edged in gold, with two gold stripes and a gold fringe at the tip; both hang to one side, as two ends spread either side of an upright read as a pair of legs | Inline (`what-it-holds-up.tsx`) | Shloka 15 |
| The thread of sky (Saundaryalaharī 77) | A hair-fine (0.9) wavy line of `--art-hair` down the middle of her unseen waist, faded out at both ends: the sky squeezed to "the very thinnest ripple on the Yamunā". Kept faint, so the hollow still reads as empty | Inline (`what-it-holds-up.tsx`) | Shloka 15 |
| Bud (mukula) | A closed bud on a short `--art-hair` stalk: an `--art-turmeric` teardrop edged in gold, a saffron seam, a small `--leaf` cap, swinging from its stalk (`m-sway`) | Inline (`grown-stake.tsx`) | Shloka 14 |
| The mountain (Himavat) | One skyline drawn with `through`, rising from the lower left to a single peak at the upper right and falling off the right edge. An `--art-stone` face tinted with `--art-saffron` toward the dawn, bands of strata across its upper face in hair-fine `--art-carve` (short separate marks read as scratches), and a snow cap in `--art-moon` blushing to `--art-saffron` at the tip, the first light on the peak. A vermilion blush on the snow turned pink | Inline (`safflower-slope.tsx`) | Shloka 16 |
| Bell (kiṅkiṇī) | A gold ball (radius 9.2) with an `--art-carve` edge, a carve slit and clapper below, a ruby or emerald (`--art-vermilion` or `--leaf`) set in its shoulder, and an `--art-core` highlight, hung from a short gold cord and ring. Bells on one cord swing (`m-sway`) in three groups | `Bell` in `primitives.tsx` (promoted at Shloka 20) | Shloka 16 |
| Girdle (raśanā) | A 6-unit `--gold` cord with a dashed `--art-carve` weave and an `--art-core` sheen, bells every 28 units, and a front knot (a gold oval set with a ruby) from which two larger bells hang on cords and swing together from the knot (`swingFrom`) | Inline (`safflower-slope.tsx`) | Shloka 16 |
| The sound of bells | Never waves or notes: broken `--gold` arcs, dashed like a chime, rising from the source in widening rings that fade as they go (`m-shimmer`) | Inline (`safflower-slope.tsx`) | Shloka 16 |
| Safflower cloth (kausumbha-vastra) | Hangs from a girdle in vertical folds 26 units apart to a hem of soft lobes, one per fold: an `--art-vermilion` to `--art-saffron` field, `--art-crimson` shade beside each fold, `--art-core` sheen along the crests, a woven border and a fringe at the hem, and a fan of seven pleats falling from the knot (narrower pleats read as a necktie) | Inline (`safflower-slope.tsx`) | Shloka 16 |
| Safflower (kusumbha) | A thistle head on a `--leaf` stem with spiny leaves: a cup of pointed bracts with a bristle of `--art-saffron` and `--art-vermilion` florets out of its top | Inline (`safflower-slope.tsx`) | Shloka 16 |
| Curtain (javanikā) | Two `--art-ivory` panels at 0.5 opacity, gathered in scallops under gold rings on a gold rod with bud finials, gold fold lines from each ring to a hem that dips a little where the panels meet. Light behind it shows through as a glow. A gold tie-cord runs down the seam to a tassel below the hem, swinging from the rod. Hung from Kāmeśa's crescent (the fourth night's `litPart`, horns up) at the top centre of the rod | Inline (`drawn-curtain.tsx`) | Shloka 17 |
| Elephant-trunk and plantain border | A woven band along a hem: curled elephants' trunks in `--art-vermilion` alternating with `--leaf` plantain stems, each with its long leaf, about 20 units apart. The two stock similes for a tapering thigh (Saundaryalaharī 82) | Inline (`drawn-curtain.tsx`) | Shloka 17 |
| Quiver (tūṇa) | A tapering body, half-width 19 at the mouth and 7 at the foot, filled across its width from `--gold` through `--art-turmeric` to gold, with an `--art-carve` outline, an `--art-core` sheen, three `--art-vermilion` bands with `--gold-soft` edges, a gold rim at the mouth, and a vermilion strap with dashed gold-soft stitching. Five arrows stand out of the mouth, fanned 8° apart, with `--art-saffron` fletching barred in carve. Without the strap two crossed quivers read as batons. A pair is crossed as weapons are hung | Inline (`first-rain-quivers.tsx`) | Shloka 18 |
| Velvet mites (indragopa) | The scarlet insects of the first rain: tiny `--art-vermilion` ovals (radius about 2) with an `--art-crimson` edge and an `--art-core` highlight, strewn at random angles; one in five twinkles | Inline (`first-rain-quivers.tsx`) | Shloka 18 |
| Rain | About 150 hairlines (0.7) of `--gold-soft`, slanting slightly, faded at top and bottom, spread evenly enough not to clump into hatching, in three groups with one shimmering | Inline (`first-rain-quivers.tsx`) | Shloka 18 |
| New grass | Tufts of tapered `--leaf` blades in two shades, fanned from a point | Inline (`first-rain-quivers.tsx`) | Shloka 18 |
| Tortoise (kūrma) | From the side, about 90 units long: a domed `--art-stone` shell with a gold outline, a saffron tint, gold plates and a gold rim, over a `--gold-soft` head, legs and tail, a small carve eye, and a faint `--art-musk` shadow | Inline (`first-rain-quivers.tsx`) | Shloka 18 |
| Her toenails as moons | On each toe of her footprints, a full moon 0.78 the toe's radius: a radial gradient from `--art-core` to `--art-moon`, a hair-fine gold rim, a moon glow 3.2 times its radius, `m-twinkle` in three groups, and a glint on each big toe. Ten pale discs without the feet read as a string of pearls | Inline (`nail-moons.tsx`) | Shloka 19 |
| The net of her light (prabhā-jāla) | From each foot, 23 rays of light across the floor (foreshortened to 0.7), ten degrees apart through the lower half, starting just outside the foot; where a ray of one foot crosses a ray of the other, a small knot. All in a `--gold` radial gradient that fades out. One centre with spokes and rings read as a cobweb | Inline (`nail-moons.tsx`) | Shloka 19 |
| Darkness covered (tamas) | A soft pool of `--art-hair` (a radial gradient, never a hard edge) with a veil of her light (`--art-core` to `--art-moon`) laid over all but its fringe. With hard edges the two read as a dish | Inline (`nail-moons.tsx`) | Shloka 19 |
| Open lotus (padma) | Seen at a slant: five back and six front pointed `--lotus` petals edged in gold, an `--art-turmeric` seed head, and a `--leaf` pad beneath (`pad={false}` leaves it out; `shade` veins the front petals) | `OpenLotus` in `primitives.tsx` (promoted at Shloka 20) | Shloka 19 |
| Folded hands as lotus buds (añjali) | Closed buds about 44 tall, `--art-core` to `--art-saffron` to `--art-vermilion` and edged in gold, with an `--art-crimson` shade on one side, a seam, `--leaf` sepals and a short stalk, standing in ranks | Inline (`nail-moons.tsx`) | Shloka 19 |
| Her feet as lotuses (śrīpadāmbuja) | Two `OpenLotus`es in `--art-vermilion` with `--art-crimson` veins and no pad, standing on still water a step apart, the nearer a little larger. With the pad, the anklet round them read as a saucer | `OpenLotus` in `primitives.tsx` | Shloka 20 |
| Anklet (mañjīra) | A ring round the lotus's base, 72 by 20, seen from a little above: its far half drawn behind the petals and its near half in front, a 5-unit `--gold` band with an `--art-core` sheen, five `Bell`s at 0.62 hanging from the near half and swinging in two groups, and small ruby and pearl studs between them. Its ringing is broken `--gold` rings spreading flat across the water, as the girdle's sound is broken rings | Inline (`still-water-steps.tsx`) | Shloka 20 |
| Still water | Long level `--gold-soft` hairlines, closer together toward the far edge and broken where light lies on them, faded at both sides; a firmer line for the far edge. Calmer than the sea's ripple arcs | Inline (`still-water-steps.tsx`) | Shloka 20 |
| Swan on the water (marālī) | Seen from the side, about 100 long: an `--art-moon` body with a full breast low on the water and a raised tail, the wing arched up off the back with three gold feather lines, an S-curved neck (a 7-unit moon stroke over a 9-unit gold one), a small head with an `--art-saffron` beak and a carve eye, and a faint reflection. A flat back and a lowered wing read as a gravy boat. Her wake is a few flat arcs trailing close behind, far apart, because she is slow; two long parting lines read as a pole | Inline (`still-water-steps.tsx`) | Shloka 20 |
| Treasury (śevadhi) | An open gold casket seen from the front: a box with a vermilion band set with pearl and emerald studs, small feet, a lid raised behind with a lit inner face, a heap of rubies, pearls, emeralds and gold above the rim with passing glints, two pearl strings spilling over the front, an `--art-core` glow over the hoard, and a soft column of her light pouring down from it with falling points of light. A hard-edged beam read as a spotlight | Inline (`still-water-steps.tsx`) | Shloka 20 |
| Salt (lavaṇa) | A little heap of `--art-ivory` crystals edged in gold, each a small rhomb with one facet line | Inline (`still-water-steps.tsx`) | Shloka 20 |
| Her light as a flame (sarvāruṇā) | A tall flame-shaped aureole, symmetrical, its sides drawn in near the tip so it reads as a flame and not a drop: one flat `--art-vermilion` fill at 0.92 with no shading, over a soft `--art-glow`. Its outline is one closed `--gold` line (1.6) over a wider faint `--art-core` one | Inline (`on-his-lap.tsx`) | Shloka 21 |
| The nine gems (navaratna) | Eight gems round her on a beaded gold chain, each 10.5 in a gold collet: pearl (`Pearl`), coral (`--sindura`), emerald (`--leaf`), topaz (`--art-turmeric`), diamond (`diamond`), sapphire (`--art-hair`), hessonite (`--art-ember`), and cat's-eye (`--gold-soft` with an `--art-core` slit), each with an `--art-core` highlight. The ruby's place at the centre is hers | Inline (`on-his-lap.tsx`) | Shloka 21 |
| Kāmeśa's crescent as a lap | The fourth night's `litPart`, radius 124, turned horns up: `--art-moon` with a 1.6 `--gold` rim and an inner `--gold-soft` line, and a low moon glow beneath. She sits on it to the viewer's right, his left | Inline (`on-his-lap.tsx`) | Shloka 21 |
| Red and white bindu | A bindu (radius 8) half `--art-moon` and half `--art-vermilion`, his side and hers, with a gold rim and an `--art-core` glow, where she rests on him | Inline (`on-his-lap.tsx`) | Shloka 21 |
| Lotus fibre (bisa-tantu) | A single `--art-ivory` thread (1.4) over a faint gold one, looped round his horn and tied at her side, slack | Inline (`on-his-lap.tsx`) | Shloka 21 |

When all four weapons appear together, the upper hands hold the noose (left) and the goad
(right), as in Shloka 2, and the lower hands hold the bow (left) and the arrows (right).

### Anticipated

Not yet drawn. Whoever draws one first sets its canon here.

- **The Śrīcakra entire.** The Dhyāna draws only its innermost triangle round the bindu. The site's
  own `YantraMark` in `src/components/ornament.tsx` is that enclosure in a circle. When the names
  reach the cakra and its nine enclosures, build the whole yantra from that triangle outward.
- **Kāma's fish banner (mīna-ketana).** Shloka 6's commentary gives Kāma both the archway and the
  fish flag; the artwork draws only the fish. If his banner is drawn, fly the Shloka 6 fish on it.
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
- **`--art-turmeric`** (Shloka 12): day `#d99a06`, lamplight `#f0bf3f`. Turmeric-dyed cord. It
  is yellower than `--art-saffron`, and it stays yellow by lamplight, where `--art-core` turns
  cream. A lighter day value (`#e0a516`) washed out to pale khaki on the paper. Edge it in `--gold`
  so it holds its line by day.

## Motion additions

Classes added to the motion vocabulary beyond the starting set: `m-breathe`, `m-sway`,
`m-flicker`, `m-lick`, `m-twinkle`, `m-shimmer`, `m-ember`, `m-late`, `m-later`.

- **`m-sink`** (Shloka 3): surfaces, sinks 15 units while fading out, and surfaces again, over
  `--dur` (default 28s) from `--delay`. For worlds going under in her flood. Give every piece of
  one sinking thing the same `--dur` and `--delay`, and keep anything that marks the fixed
  surface (a clip, a waterline) outside the moving group. Use it on a few elements, never all.
- **`m-dart`** (Shloka 6): holds still, then darts 9 units forward with a 5° turn and drifts back,
  over 9s. For fish, which in shallow water are seen chiefly as a movement. Put it on a group drawn
  heading +x, inside the group that places and turns it, so the dart follows the heading; a shadow
  that should move with its fish gets the same class and offset.

No new class at Shloka 8, but one technique: `m-sway` swings a group from the top centre of its own
bounding box, so two parts that must swing together (a pendant and its bail, spotlit separately)
would pivot at different points. Give each group the same classes and an inline
`style={{ transformBox: "view-box", transformOrigin: "<x>px <y>px" }}` naming the one point they
hang from (in artwork units), and they move as one.

- **`m-gather`** (Shloka 10): shrinks to an eighth of its size toward a point while fading in and
  out, over `--dur` (24s by default), accelerating as it nears, then starts again from full size.
  For things drawn in: the horizon pulled toward her. Set `transform-origin` to the point (in
  artwork units, px), stagger copies with negative `--delay`s so the flow is already under way, and
  give each an inline `transform: scale()` for where it rests when motion is reduced (animations
  override inline styles). Strokes thin as they shrink, which suits a flow that vanishes into her.

## Composition log

One entry per finished artwork, in the order they were made.

### Shloka 1: Risen from the fire of awareness

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

### Shloka 6: The wedding doorway

- **Component:** `wedding-doorway.tsx` (defs prefix `sa6`)
- **Composition:** a doorway, and water leaving it. Her face is Love's wedding house, seen only as
  the light that fills its door. A toraṇa stands over the door: two gold brow-shaped arches on a
  beam hung with mango leaves and jasmine, on plantain stems for posts, with a point of light in
  the gap between the brows. The card sits in the doorway. Below it the light brims over the
  threshold and falls into the head of a channel, where two fish circle. The channel runs right,
  narrows, turns down, and opens into broad water across the foot. The first architecture, the
  first moving water, and the first living creatures in motion. The gateway is symmetric; the
  water breaks the symmetry and carries the eye down to the right.
- **Name → part:**
  - Vadanasmaramāṅgalyagṛhatoraṇacillikā → `torana`: the brow-shaped arches, the beam, the festoon
    of mango leaves and jasmine, the jasmine strings and bells, and the plantain posts
  - Vaktralakṣmīparīvāhacalanmīnābhalocanā → `stream`: the brim and fall over the threshold, the
    channel and the broad water, and the two fish
  - Intro, *its doorway* → `doorway`: the glow within the door and the threshold, marked with
    vermilion and turmeric
  - Detail → `ajna`: the point of light between the brows, where the ājñā cakra is placed
- **Palette:** vermilion, saffron, and gold; `--leaf` as a major colour for the first time (mango
  leaves, plantains), `--art-ivory` for jasmine, `--art-musk` for the fishes' eyes, and
  `--art-crimson` for their shadows. No additions.
- **Motion:** `m-sway` (the festoon's leaves, the jasmine strings), `m-shimmer` (the glows and the
  ripples under the fall), and the new `m-dart` (the fish).
- **Notes:** This subtitle reaches x ≈ 175 of the artwork at y ≈ 85–140 on screens 1280–1440px
  wide, so the arches stand on the beam at x ≈ 180, and the left plantain leaves stay below
  y ≈ 145. The first arches, tall and wiry with volutes, crossed the title and read as horns;
  lower, heavier brows fixed both. The festoon first hung behind the card and frosted into streaks;
  raising the beam to y ≈ 150 cleared it. A flat doorway fill read as a red box by lamplight; a
  radial glow brightest at the threshold replaced it. The water went through four shapes: a
  tongue-like blob, a fishbowl basin with a snake-like channel, an L-shaped pipe, and finally an
  organic runnel filled with the miniature painters' wave pattern. Top-view fish, one turned 180°
  from the other, avoid the pair reading as two eyes under the brows.

### Shloka 7: A campaka bud, and a jewel that shames the stars

- **Component:** `campaka-jewel.tsx` (defs prefix `sa7`)
- **Composition:** one plant and one point of fire. A single campaka, newly opened, stands straight
  up on its stem, its tips just under the card and its calyx at the top of the ground zone. On its
  right flank is a seven-diamond nose stud, white-hot, throwing hair-fine rays, its longest ray
  climbing past the card. Stars fill the rest of the sky, and their dimming is laid out by distance
  from the stud: far off, in the crown zone and the lower corners, they twinkle; nearer they are
  still dots, then faint rings, and within 200 units there are none. The first composition built
  on one straight vertical line, the first starry sky, and the first whose focus is a hard,
  faceted point rather than a glow or a disc. No frame, architecture, or water.
- **Name → part:**
  - Navacampakapuṣpābhanāsādaṇḍavirājitā → `campaka`: the flower, its calyx, its straight stem, two
    leaves, and a soft aura
  - Tārākāntitiraskārināsābharaṇabhāsurā → `nose-jewel`: the stud, its glows, glints, rays, and
    flashes
  - Intro, *the stars* → `stars`: the sky, from twinkling stars to the ring of faint ones round the
    stud
  - Detail → `pearl`: a pearl hanging from the stud (Saundaryalaharī 61: her cool breath condenses
    pearls in her nose, and she wears one of the surplus)
- **Palette:** `--art-core`, `--art-saffron`, and `--art-ivory` for the flower; `--leaf`; `--art-moon`
  and gold for the diamonds and the pearl; `--gold-soft` stars. Vermilion appears nowhere; this is
  the palest piece so far, as the verse's colour is the campaka's pale gold. No additions.
- **Motion:** `m-twinkle` (the far stars, in three groups), `m-shimmer` (the stud's glow and rays),
  and `m-lick` (flashes on three diamonds). The flower is still.
- **Notes:** This subtitle is long and runs to x ≈ 360 of the artwork at y ≈ 110–150 on 1440px
  screens; only faint stars sit there. Shloka 4's campaka petal and stars moved into
  `primitives.tsx` (`campakaPetal`, `Star`); Shloka 4 renders byte-for-byte as before. The first
  flower splayed its petals to ±40° and read as a daisy; narrowed to a torch, with more petals
  overlapping, it read as a paintbrush until its tips were paled toward ivory and given uneven
  lengths and a slight outward curl. The stud, set on the petals, vanished gold-on-gold by day; moved
  to the flower's edge and given a small `--art-moon` glow, it reads as white fire. The long
  horizontal rays read as a crosshair and were shortened. Stars first stopped at the focal zone,
  leaving the plate's lower half empty; carried down the sides, they close the dark ring round the
  stud. On phones by lamplight the stud's glow sits under the last syllables of the second line;
  its white glow was trimmed to keep them legible.

### Shloka 8: Kadamba flowers, and the sun and moon for earrings

- **Component:** `sun-moon-earrings.tsx` (defs prefix `sa8`)
- **Composition:** a pair, side by side and unreconciled, as the commentary reads the verse. Her
  face is only a tall soft light, and at its two sides, just below the card, hang her earrings: the
  sun on her right (the viewer's left), the full moon on her left, each on a gold stud and link,
  swinging a little. Over each ear a spray of kadamba fans out sideways, small orange balls
  bristling with pale styles, so the little globes rhyme with the great discs. The sun's radiance of
  gold hairlines fills the left half of the plate and the moon's rings the right, fading out against
  each other at her face: day and night at once, without mixing. The first composition built on a
  contrasting pair, the first to hold the sun and the moon together, and the first whose main
  elements swing.
- **Name → part:**
  - Kadambamañjarīkḷptakarṇapūramanoharā → `kadamba`: the two sprays, their heads, stalks, and
    leaves
  - Tāṭaṅkayugalībhūtatapanoḍupamaṇḍalā → `earrings`: the two pendants with their studs, links,
    and drops, the sun's rays and radiance, the moon's halo, deer, and rings of moonlight
  - Intro, *her face* → `face-light`: the tall glow between her ears
  - Detail → `boat`: the moon's bail, a little gold crescent boat (*uḍupa*, a raft, hidden in the
    sandhi of *tapanoḍupa*)
- **Palette:** vermilion, saffron, and gold for the sun and the kadamba; `--art-moon`, `--sindura`,
  and `--art-musk` for the moon; `--leaf`; `--art-ivory` for the styles. No additions.
- **Motion:** `m-sway` (the two pendants, from their lobes, a beat apart), `m-shimmer` (the face's
  light, the sun's rays, radiance, and glow, the moonlight, and the moon's halo), and `m-twinkle`
  (the kadamba's style tips and the halo pearls, in three groups).
- **Notes:** This title wraps to two lines at every desktop width, which pushes the card down to
  y ≈ 225–438 (see `composition.md`). The first render, laid out for the usual card, had the sprays
  frosted behind it; the pendants moved down to hang from y ≈ 466 and the sprays turned to fan out
  sideways. The same render left the plate empty above and below the pendants; the sun's radiance
  and the moon's rings, each confined to its own half, fill it. The radiance first started 32 units
  out, which left a dark ring round the sun by lamplight; it now starts at the disc. The crown zone is
  kept quiet on purpose: only the upper part of her face's light and the faint far rays and rings
  reach it. This was the second use of the sun's rays, the moon's halo, and the deer, so `sunRays`,
  `MoonHalo`, and `MoonDeer` moved into `primitives.tsx`; Shlokas 2 and 5 render byte-for-byte as
  before. On phones the pendants sit behind the chant bar, and in the chant miniature on phones
  the sun lies under the last syllables of the second line, which stay legible in both themes.

### Shloka 9: The tipped scales

- **Component:** `tipped-scales.tsx` (defs prefix `sa9`)
- **Composition:** a weighing, as Saundaryalaharī 62 stages the verse. A gold balance hangs from a
  chain in the crown zone, its beam over the card and tipped 10° to the left. The tongue leans out
  from under the fork's red mark. On the left, the sunk pan holds her light: a pool of light, a
  rising glow, and the bindu, with the 108 hairlines of her radiance spreading across the plate.
  On the right, the lifted pan holds the standards of red, outweighed: a ruby hand mirror leaning
  toward her, and a sprig of coral. The bimba creeper trails along the ground under both pans
  without climbing on. Its fruits are red only on the side that faces her, so the fruits left of
  her pan are red on their right. The first composition built on an imbalance, the first to draw
  what she outdoes rather than what adorns her, and the first with its focus off-centre (low on
  the left, answered by a raised mass on the right).
- **Name → part:**
  - Padmarāgaśilādarśaparibhāvikapolabhūḥ → `mirror`: the ruby mirror on the lifted pan, with a
    dull copy of her light in its face
  - Navavidrumabimbaśrīnyakkāriradanacchadā → `coral-bimba`: the coral on the lifted pan, and the
    bimba creeper on the ground, its tendrils curling away (one reaches up toward the pan and
    coils back short of it)
  - Intro, *the balance* → `scales`: chain, fork, tongue, beam, cords, and both pans
  - Intro, *her light* → `light`: the pool, the rising glow, the bindu, and the radiance. The
    first intro to point at two parts
  - Detail → `reflections`: a tiny sun and moon on the pool, Shloka 8's earrings reflected in
    her cheek (Saundaryalaharī 59)
- **Palette:** vermilion, saffron, and gold; `--art-crimson` for the mirror's bevel and the coral's
  shading, `--art-ivory` for the polyps, `--leaf` for the creeper, `--art-moon` for the tiny moon.
  No additions.
- **Motion:** `m-sway` (each pan with everything in it, from its hook, a beat apart),
  `m-shimmer` (her glow and radiance, the mirror's dull reflection), and `m-twinkle` (the polyps
  and the reflections).
- **Notes:** The title stays on one line and left of the artwork, so the card sits in its usual
  window. The beam lies above it, and both pans hang below it within x 112–528. The first render
  was too thin to be striking: the beam, fork, and pans were thickened, and the tongue lengthened
  until its lean reads. The first mirror, with a domed, shaded face and a crest of petals, read as
  a pomegranate. Her light was first a solid red dome in the pan, which read as a mushroom cap.
  A pool with a rising glow made it light, but the glow first had a visible edge (a second sun) and
  was softened. The radiance first started 30 units out, which left a dark disc round the bindu by
  lamplight; it now fades in from the bindu. On phones by lamplight the bindu's glow sits under
  the last syllables of the second line in the chant miniature; they stay legible.

### Shloka 10: One seed, sprouting

- **Component:** `sprouting-seed.tsx` (defs prefix `sa10`)
- **Composition:** a convergence on a seed. Her light is a bindu in a gold seed split open low in
  the focal zone, and from it one seedling rises, two seed-leaves in an upright V, each a row of
  sixteen beads of light. Around it, a horizon pinned at the eight quarters is drawn in toward her
  ring after ring, turning camphor-white as it nears. Neither mouth nor teeth is drawn: the names
  describe her mouth, and the artwork draws only their images, abstracted. The first composition
  whose force runs inward (Shloka 1's rays and Shloka 3's aim run outward), the first fragrance,
  and the first thing growing.
- **Name → part:**
  - Śuddhavidyāṅkurākāradvijapaṅktidvayojjvalā → `sprout`: the split husk, the root, the stem, and
    the two seed-leaves with their rows of sixteen beads
  - Karpūravīṭikāmodasamākarṣidigantarā → `fragrance`: the horizon with its eight quarters and the
    rings drawn in from it
  - Intro, *light* → `light`: the glow and the bindu in the split seed
  - Detail → `seed`: ह्रीं engraved on the husk, the syllable that closes each of the mantra's three
    parts (a mantra's syllables are *bīja*, seeds)
- **Palette:** gold for the horizon, the rings, and the husk; `--art-moon` for the rings near her;
  `--art-ivory` for the beads; saffron and `--art-core` for the leaves and her glow. No additions.
- **Motion:** the new `m-gather` (seven rings drawn in, staggered over 24s), `m-twinkle` (the beads,
  in three groups), and `m-shimmer` (her glow).
- **Notes:** The first version was literal: two staggered rows of sixteen white sprouts in a seed
  bed curved like a smile, a betel roll pinned with a clove on a betel leaf in her light, camphor
  flakes, and eight braided wisps of fragrance spiralling in. Its sprouts rising out of a curved red
  bed read as teeth coming up through gums, and it was set aside for this one (it stays in git
  history). In this version the seed-leaves first opened wide and near level, and read as wings or a
  moustache; stood upright in a V, they read as a seedling. The ring is egg-shaped (1.28 times taller
  above her than wide, 0.88 below) so its north quarter shows above the card and its south quarter
  stays on the plate. ह्रीं first sat small on one tilted half of a husk split in two, and could
  hardly be seen; the husk was made whole below, like a pistachio shell, so the syllable could sit
  centred and larger. On phones the artwork sits behind the chant bar.

### Shloka 11: The lute silenced, and a mind gone under

- **Component:** `silenced-lute.tsx` (defs prefix `sa11`)
- **Composition:** an aftermath, the verse's two casualties set one above the other with her light
  between. Above the card, Sarasvatī's kacchapī lies put away under its cloth cover (Saundaryalaharī
  66). Below it, her faint light hangs a little above a flood that fills the lower plate, seen from
  the side: a level surface, shafts of her light going down into the depth, and Kāmeśa's crescent
  sinking through it on its side, pearls of light rising from it. On the far shore stand Kailāsa and
  its ridges, and a skein of haṃsas comes down to the water. The first still life (a thing put away,
  not held or worn), the first water seen in section, the first thing to go fully under, and the
  first appearance of her consort, as an emblem. The flood deliberately answers Shloka 3's, as nāma 28
  repeats nāma 12's words: one mind instead of sixteen world-eggs.
- **Name → part:**
  - Nijasallāpamādhuryavinirbhartsitakacchapī → `lute`: the kacchapī, its tortoise-plated bowl, neck,
    frets, pegs, scroll and gourd, its still strings, and its cloth cover
  - Mandasmitaprabhāpūramajjatkāmeśamānasā → `flood`: the surface, the depth and its currents, the
    shafts of light, the sinking crescent, and the rising pearls of light
  - Intro, *her light* → `light`: the bindu, small and soft (*manda*), its glow, and the glow where it
    meets the flood
  - Detail → `manasa`: Kailāsa and the haṃsas, so the flood is also Lake Mānasa (*mānasa*, the mind,
    is also the lake at Kailāsa's foot that the haṃsas fly to)
- **Palette:** gold, `--art-vermilion` and `--art-crimson` for the lute and its cover; `--art-core`,
  `--art-saffron`, `--art-glow` and `--art-ivory` for the flood and its shafts; `--art-moon` for the
  crescent, the pearls of light, Kailāsa's snow and the haṃsas. No additions.
- **Motion:** `m-sink` (the crescent, 32s), `m-ember` (the pearls of light, clipped at the surface),
  and `m-shimmer` (her glows, the shafts, the currents). The lute is still: the silence is the point.
- **Notes:** This title stays on one line at every desktop width but reaches x ≈ 324 of the artwork
  (x ≈ 376 at 1100px) at y ≈ 74–141, so the lute lies almost level in the band between the title and
  the card (y ≈ 141–184), its bowl on the right where the title doesn't reach. Tilted more, its neck
  ran into the title's last word. The first flood had a swelling surface (meant as *pūra*, a swelling
  stream) and read as a sand dune, brown by lamplight; a level surface, currents, and shafts of light
  made it water. Its depths were first vermilion and went pink by day. The first crescent sat nearly
  horns up under the bindu, which made a face; it was moved aside, sunk deeper, and turned on its side.
  The first cloth cover was a teardrop and read as a red leaf, then, with pleats fanning from one
  point, as a fan. A haṃsa was first set aside as Kāmeśa's mind because beside Sarasvatī's lute it
  would read as her mount; a skein in flight on the far shore reads as wild geese. In the chant
  miniature beside the verse the lute is only a thin line with its red cover; the lit horizon carries
  it. On phones the text stays legible over it in both themes.

### Shloka 12: The mirror's stem, and the knot

- **Component:** `mirror-and-knot.tsx` (defs prefix `sa12`)
- **Composition:** one object, dressed for a rite. Her face is a polished metal hand mirror
  (Saundaryalaharī 67: her chin is the stem of the mirror that is her face, which Śambhu takes in
  his hand). Its upper part stands behind the card, and its lower half shows below it with her
  point of light in the face. Nothing else is reflected there. The mirror rests in a small lotus
  cup on a long gold stem, her chin. Just under the cup, where the neck would be, the turmeric
  marriage cord is wound round the stem and knotted three times. The gold tāli hangs from the
  middle knot, and both loose ends hang to the right in tassels. Her radiance fills the plate. The
  first ornament that is neither a jewel nor a flower, the first knot, the first object dressed for
  a rite, and the first image of her as something another person holds. It answers Shloka 9 on
  purpose: that verse brought a ruby mirror to be outdone, and this one brings no comparison at all.
- **Name → part:**
  - Anākalitasādṛśyacibukaśrīvirājitā → `mirror`: the frame, the face and its sheen, the flashes,
    the lotus cup, and the stem with its foot
  - Kāmeśabaddhamāṅgalyasūtraśobhitakandharā → `thread`: the cord's loop, the three knots, the
    tāli, and the two tasselled ends
  - Intro, *her light* → `light`: the point of light in the face, the light reflected round it,
    the glow beyond the frame, and the radiance
  - Detail → `three-lines`: three hair-fine lines under the knot, Śaṅkara's three lines on her
    throat (Saundaryalaharī 69), sureties for the wedding strands and the bounds of the three
    musical scales
- **Palette:** gold; `--art-ivory` and `--art-moon` for the mirror's face and sheen; `--art-core`
  and `--art-saffron` for her light and the lotus cup; `--sindura` for the kumkum; the new
  `--art-turmeric` for the cord.
- **Motion:** `m-sway` (the tāli and the cord's ends, from the middle knot, a beat apart), `m-shimmer`
  (her glows and radiance), and `m-lick` (two flashes on the face, for *virājitā*).
- **Notes:** This title wraps to two lines at desktop widths, as Shloka 8's does, so the card sits at
  about y 225–438. The mirror was first centred at y 430, which hid her light behind the card; it
  was lowered to y 472 and made smaller so the light sits about 34 units under the card's edge.
  The cord's two ends first curled out on both sides of the stem and made a trident; both now
  hang to the right. The first tāli, a short heart-shaped leaf with a central red dot, read as a
  heart pendant; a long drip tip, a midrib and veins, and the dot moved up made it a pīpal leaf.
  The face was first `--art-moon` and went cold grey by lamplight, then khaki under heavier gold
  shading; `--art-ivory` with light shading and a saffron ring of reflected light warms it. The
  crown zone holds only the radiance, to keep clear of the title. The radiance was the fourth
  inline copy, so `radiance()` moved into `primitives.tsx`; Shlokas 8 and 9 use it and render
  byte-for-byte as before. In the chant miniature the mirror's disc and glow carry it, and the
  text stays legible over it on phones in both themes.

### Shloka 13: Gold on the flash, pearls on the stem

- **Component:** `gold-and-pearls.tsx` (defs prefix `sa13`)
- **Composition:** a continuation, the same object dressed further, as the commentary puts it ("the
  throat again, one layer out from the thread that was tied there in the previous verse"). Shloka
  12's mirror returns unchanged, centred at y 431, its light about 35 units under the card. Her four
  arms leave that light as beams in an X, like the points of a flash on polished metal: the upper
  pair climbs behind the card and out above it, the lower pair reaches down and out. Each wears a
  crested keyūra nearer her light and a beaded aṅgada further out, eight bands of gold. The
  marriage thread is still tied on the stem, and one layer outside it a jewelled collar hangs from
  under the lotus cup in a broad U, its round pendant at the bottom, five loose strings of pearls
  swinging beneath. A faint radiance fills the plate. It is the first plate to carry on from the one
  before, the first where gold is the subject (*kanaka* is the first metal named in the
  description), the first verse drawn with no comparison in it, the first necklace and strings of
  pearls, and the first time her arms are drawn empty-handed, for their own sake.
- **Name → part:**
  - Kanakāṅgadakeyūrakamanīyabhujānvitā → `arms`: the four beams of light, the four keyūras with
    their flashes, and the four aṅgadas
  - Ratnagraiveyacintākalolamuktāphalānvitā → `necklace`: the collar and its sixteen stones (one
    for each syllable of the name), the pendant, and the strings of pearls, the nearest blushing red
    (Saundaryalaharī 74)
  - Intro, *the mirror of the last verse* → `mirror`: the mirror, cup, and stem, her point of light,
    its glow, and the radiance
  - Detail → `thread`: Shloka 12's cord, knots, and tāli, still tied inside the collar, because a
    tāli once tied is not taken off
- **Palette:** gold; `--art-ivory` and `--art-moon` for the mirror; `--art-saffron` and
  `--art-core` for her light and the arms; `--art-vermilion` rubies and `--leaf` emeralds;
  `--art-moon` pearls; `--art-turmeric` for the thread; a faint `--sindura` blush. No additions.
- **Motion:** `m-sway` (each pearl string from its own top, in three groups, and the thread's tāli
  and ends as in Shloka 12), `m-lick` (flashes on the keyūras, the pendant, and the mirror), and
  `m-shimmer` (the glow, the radiance, and the arms' light).
- **Notes:** This title stays on one line at every desktop width, reaching x ≈ 244 of the artwork
  (x ≈ 296 at 1100px) at y ≈ 73–140, so the card is in its usual window, 41 units higher than on
  Shloka 12's page, and the mirror moved up by as much. The upper-left aṅgada sits just under the
  title's last word. The first collar, about 110 units wide with its ends closed up under the cup,
  read as a ring round the stem; widened into a U it reads as a necklace. The first arms were short
  and the plate was a thin column; lengthened, they reached the plate's sides but on their own
  looked like crossed staves. The brief had rested the radiance, but a faint one (about 60% of Shloka
  12's) makes the arms read as the four strongest rays of her light and fills the plate. The detail was
  first planned as the tāli's tip showing under the pendant; once the collar was in place, the
  tāli's top and kumkum showed inside it, which says the same more plainly. The mirror, the thread,
  and the pearl each became a second use here, so they moved into `primitives.tsx`
  (`HandMirror`, `MarriageThread`, `Pearl`); Shlokas 7 and 12 render byte-for-byte as before. In
  the chant miniature the X of arms tells it apart from Shloka 12 at a glance, and on phones the
  verse stays legible over it in both themes.

### Shloka 14: What grew is what she stakes

- **Component:** `grown-stake.tsx` (defs prefix `sa14`)
- **Composition:** one thing looked at twice, as the verse does, with the two looks joined by a
  single growing line. Below the card, her light lies in the water of a gardener's basin dug in a
  raked bed. From it a slender dark creeper, the line of down, sweeps left under the card, climbs
  its left side, and runs over onto a gaming board that lies in the band between the title and the
  card. There it lays its two fruit on her side as the counter-stake. On his side, level with them
  and lit the same, the jewel of his love rests in his crescent, with two dice thrown between. The
  first wager, the first exchange between equals (it answers Shloka 9, where a balance tipped: here
  there are no scales, and parity shows only in matched placement and matched light), the first
  cultivated ground, the first fruit, and the first composition whose two halves are joined by
  something growing from one to the other. The commentary advises against reconciling the two
  names; the artwork joins them anyway, because both names describe the same pair.
- **Name → part:**
  - Kāmeśvarapremaratnamaṇipratipaṇastanī → `stake`: the board, its marked squares, the dice, and his
    jewel in its crescent with its flash and glow
  - Nābhyālavālaromālilatāphalakucadvayī → `creeper`: her light in the basin, the water and its
    ripples, the bank, the raked bed, and the creeper with its leaves and tendrils
  - Intro, *a single pair* → `fruit`: the two fruit on the board, their stalks and leaves, their
    flash and glow
  - Detail → `bud`: one bud on the creeper below the card, Saundaryalaharī 78's *mukula* where this
    hymn says *phala*, the same plant a season apart
- **Palette:** gold for the board and its frame; `--art-moon` for the jewel and the crescent;
  `--art-core`, `--art-turmeric`, and `--art-saffron` for the fruit and her light; `--art-hair` and
  `--leaf` for the creeper; `--art-musk` (faint) for the earth; `--art-ivory` for the dice and the
  ripples; `--art-crimson` for the pips and shadows. No additions.
- **Motion:** `m-shimmer` (her glow, the ripples, and the stakes' glows), `m-lick` (a flash on the
  jewel and one on the fruit, a beat apart, so neither outshines the other), and `m-sway` (the bud).
- **Notes:** The brief first kept the two names apart (two rubies against his diamond on the board,
  the fruit left on the vine in the garden); the user chose to join them, since the two names
  describe the same pair. This title stays on one line at every desktop width and reaches x ≈ 418
  of the artwork at y ≈ 73–142 at 1280–1440px, and x ≈ 470 at 1100px, so the board lies in the
  band above the card, its near edge just behind the card's top, and the creeper reaches it from
  the left, under the title's last word. The first board, a thin sliver, and a thin vine left the
  plate nearly empty; both were enlarged, and the bed of furrows grounds the lower plate. The
  basin went through four looks before it read as watered earth (see its canon entry). The plate's
  upper left stays empty, as the title covers it on the page. Shloka 10's `taper` and Shloka 7's
  `diamond` moved into `primitives.tsx`; Shlokas 7 and 10 render byte-for-byte as before. In the
  chant miniature the creeper's curve and the glowing basin carry it, and on phones the verse stays
  legible over it in both themes.

### Shloka 15: What it holds up

- **Component:** `what-it-holds-up.tsx` (defs prefix `sa15`)
- **Composition:** a picture of an inference. The subject, her waist, is never drawn. Shloka 14's
  creeper rises from a pool of her light on raked ground and climbs in a tight spiral round an
  upright that isn't there, from below the card to above it; three bands of red silk are tied round
  the same emptiness below the card, the middle one knotted with both its ends hanging to the right.
  Wherever the creeper or a band passes behind the upright it vanishes, so the eye works out the
  slender shape that must stand there, narrowest at the middle. Between the ties the turns crowd
  together. Above the card the creeper leaves the upright and bows over to the right under its pair
  of fruit, hanging heavy. Nothing is in the hollow but a column of her light and a faint radiance
  whose source is never drawn. The first composition whose subject is an absence, shown only by
  what wraps round it and what it hides; the first with no point of light for her; the first binding
  of something in danger; and the first where weight is the subject (the bowed crook, the crowded
  turns, the ties). It carries on from Shloka 14, as Shloka 13 did from 12, but changes the view: one
  plant, close up and upright, instead of a garden laid out across the plate.
- **Name → part:**
  - Lakṣyaromalatādhāratāsamunneyamadhyamā → `creeper`: the spiral of the creeper, its leaves and
    tendrils, the tendrils gripping nothing, and the ground it roots in
  - Stanabhāradalanmadhyapaṭṭabandhavalitrayā → `splint`: the three silk bands, their knots, and the
    middle band's hanging ends
  - Intro, *her light* → `support`: the column of light in the hollow, the radiance, and the pool at
    the root
  - Intro, *the weight it carries* → `weight`: the bowed crook, its leaves, and the pair of fruit
  - Detail → `sky-thread`: Śaṅkara's thread of sky down the middle of the hollow (Saundaryalaharī 77)
- **Palette:** `--art-hair` and `--leaf` for the creeper; `--art-vermilion`, `--art-crimson`, `--gold`,
  and `--gold-soft` for the silk; `--art-core`, `--art-turmeric`, and `--art-saffron` for the fruit and
  her light; `--art-hair` for the thread of sky. No additions.
- **Motion:** `m-sway` (the fruit from the fork, and the band's ends from the knot), `m-shimmer` (her
  light, the radiance, and the fruit's glow), and `m-lick` (one passing flash on the fruit).
- **Notes:** This title stays on one line at every desktop width and reaches only x ≈ 143 of the
  artwork at y ≈ 81–137 at 1440px, so the crown zone is clear on the right for the crook and the fruit.
  The first render was a thin column about 40 units wide, and the middle band's two ends splayed into
  an inverted V that read as a pair of legs; the upright was widened to about 66 units and both ends
  now hang to the right. With the turns wide apart (a pitch of 92), and their backs hidden, the
  creeper read as scattered dark strokes; a pitch of 60, tightening to 44 between the ties, made the
  front arcs stack into a coil round a pole. The creeper's leaf, tendril and curve helpers and the pair
  of fruit moved into `primitives.tsx`; Shloka 14 renders byte-for-byte as before. In the chant
  miniature the coil, the red bands and the column of light carry it, and on phones the verse stays
  legible over it in both themes. The share card shows the whole climb clearly.

### Shloka 16: Safflower on the slope, and a belt that speaks first

- **Component:** `safflower-slope.tsx` (defs prefix `sa16`)
- **Composition:** the verse's *taṭī*, a mountainside, taken at its word, as Śaṅkara does: the lord
  of mountains gave her his own slope. A mountain fills the plate, rising from the lower left to a
  snow peak at the upper right that has just caught the dawn. Round its middle slopes, which Sanskrit
  already calls a mountain's girdle (*mekhalā*), runs a gold cord hung with jewelled bells, knotted
  at the front with two larger bells swinging from the knot, and above the knot broken rings of their
  sound spread up the face. Below the girdle the safflower cloth hangs in folds to a lobed hem, with
  a fan of pleats under the knot, its crests catching the dawn glow from the lower left. Three
  safflower plants grow below the hem. The first landscape that is also worn, and the first sound
  drawn.
- **Name → part:**
  - Aruṇāruṇakausumbhavastrabhāsvatkaṭītaṭī → `cloth`: the cloth from the girdle to the hem, its
    folds, pleats, border and fringe
  - Ratnakiṅkiṇikāramyaraśanādāmabhūṣitā → `girdle`: the cord, its bells, the knot and its two
    bells, and the rings of sound
  - Intro, *a hillside at dawn* → `slope`: the mountain, its snow, and the dawn glow
  - Detail → `safflower`: the three plants the dye is made from
- **Palette:** `--art-vermilion`, `--art-saffron`, and `--art-crimson` for the cloth; `--art-stone`
  with saffron for the mountain and `--art-moon` for its snow; `--gold`, with `--art-vermilion` and
  `--leaf` gems, for the girdle. No additions.
- **Motion:** `m-sway` (the bells in three groups, and the knot's two bells together from the knot),
  `m-lick` (passing glints on the bells), and `m-shimmer` (the rings of sound and the dawn glow).
- **Notes:** This title stays on one line at 1280–1440px and reaches x ≈ 461 at y ≈ 74–141; at
  1100px it wraps and the card moves down to y ≈ 225–437. The first render, a red band arched over a
  dome, read as a rainbow; it became a mountain with the girdle round its middle and the cloth falling
  from it. The front pleats were first a narrow pair that read as a necktie and are now a fan.
  Scattered rock marks read as scratches and became strata; the snow's vermilion blush turned pink and
  is saffron now; and the dawn glow's core dropped to saffron at 0.5, because by lamplight it read as
  a sun. In the chant miniature the red cloth on the slope and its row of bells carry it, and the
  share card shows the peak, the girdle and the pleats.

### Shloka 17: What only her husband knows, and two crowns of ruby

- **Component:** `drawn-curtain.tsx` (defs prefix `sa17`)
- **Composition:** the plate is divided at a hem, as the verse is divided between a name that
  withholds and one that displays. Above, a curtain of two pale panels hangs closed from a gold rod
  over the card window, and only her light shows through it, as a glow. Kāmeśa's crescent is the
  ornament at the top of the rod, so the curtain names the one person it is not closed to, and a
  tie-cord with a tassel runs down the seam. The hem is a woven border of elephants' trunks and
  plantain stems. Below it the reticence stops: two ruby crowns (the Shloka 4 crown, scaled to 0.8)
  sit side by side in full colour, flashing. The first composition built on concealment, and the
  first to set its names against each other as hidden and shown.
- **Name → part:**
  - Kāmeśajñātasaubhāgyamārdavorudvayānvitā → `curtain`: the two panels, the rod and its rings,
    his crescent, and the tie-cord
  - Māṇikyamukuṭākārajānudvayavirājitā → `crowns`: the two crowns, their glows and flashes
  - Intro, *her light* → `light`: the glow behind the curtain
  - Detail → `border`: the trunks and plantains of the hem (Saundaryalaharī 82)
- **Palette:** `--art-ivory` and `--gold` for the curtain, `--art-moon` for the crescent,
  `--art-vermilion` and `--leaf` for the border, and the crown's own colours. No additions.
- **Motion:** `m-shimmer` (her light through the cloth and the crowns' glows) and `m-sway` (the
  tie-cord and tassel, from the rod).
- **Notes:** This title wraps at every desktop width, its second line reaching x ≈ 120 at 1280px
  (172 at 1100px), and the card sits at y ≈ 225–437. The rod was narrowed to x 142–498 and raised to
  y 112 so its ends stay clear of the title. At 0.42 and then 0.62 the crowns read as beehives; at
  0.8 their tiers and stones show. Each crown keeps only its outward rays, so the two sets don't cross
  between them. In the chant miniature the pale curtain and the two red-gold crowns carry it.

### Shloka 18: Quivers strewn with rain-insects, and the arch of the foot

- **Component:** `first-rain-quivers.tsx` (defs prefix `sa18`)
- **Composition:** Kāma's two quivers, crossed as weapons are hung, their mouths at the upper corners
  of the card and their feet below it in a tuft of new grass. Each is gold and turmeric, banded and
  strapped in vermilion, with five fletched arrows standing out of its mouth, and strewn with the
  scarlet velvet mites that come up out of the ground with the first rain. The rain falls over all of
  it. Ten arrowheads glint in the grass at the feet. At either side of the ground a tortoise has come
  out in the rain, and over each shell runs a single arc of light, higher and smoother than the shell.
  The first weather in the series, and the first animal drawn as a foil that is outdone rather than as
  an emblem.
- **Name → part:**
  - Indragopaparikṣiptasmaratūṇābhajaṅghikā → `quivers`: the two quivers, their arrows and straps,
    and the mites
  - Gūḍhagulphā → `grass`: the tufts that hide the quivers' feet
  - Kūrmapṛṣṭhajayiṣṇuprapadānvitā → `tortoises`: the two tortoises and the arcs of light over them
  - Intro, *the first rain* → `rain`: the rain, the glow, and the wet ground
  - Detail → `arrowheads`: the ten points at the feet, her nails (Saundaryalaharī 83)
- **Palette:** `--gold` and `--art-turmeric` for the quivers, `--art-vermilion` and `--art-crimson`
  for the mites, `--gold-soft` for the rain, `--leaf` for the grass, `--art-stone`, `--gold-soft` and
  `--art-musk` for the tortoises, and `--art-core` for the arcs. No additions.
- **Motion:** `m-twinkle` (one mite in five, in three groups), `m-lick` (the arrowheads), and
  `m-shimmer` (the rain, the glow, and the light over the shells).
- **Notes:** This title wraps at every desktop width (second line to x ≈ 103 at 1280px), and the card
  sits at y ≈ 225–437. The arrows first converged into a cone, from a sign error in their fan; they
  now splay out from each mouth. The rain first clumped into hatching and was spread more evenly.
  Without straps the quivers read as crossed batons. The tortoises first sat under the verse panel and
  moved out to x ≈ 172 and 478. In the chant miniature the gold cross and its green tufts carry it.

### Shloka 19: Light off the toenails, and the lotus sent away

- **Component:** `nail-moons.tsx` (defs prefix `sa19`)
- **Composition:** the verse looks no higher than her feet, where the eyes of someone bowing are, so
  nothing of her is shown but her two footprints (the Dhyāna's śrīpāda, scaled to 3.7 and laid on the
  floor) just below the card. On each toe the nail is a small full moon with its own glow. Rays of
  light run out across the floor from each foot, and where one foot's rays cross the other's they
  knot into a net. Before her feet lies a pool of dark, and a veil of her light is laid over it, so it
  shows only at the fringe. Two ranks of closed buds stand in it, the folded hands of those bowing. At
  the lower right, outside the net, an open lotus is left unregarded. The first return of her
  footprints since the Dhyāna, and the first composition about what her light does to a person.
- **Name → part:**
  - Nakhadīdhitisañchannanamajjanatamoguṇā → `nail-light`: the footprints and their ten moons, the
    glow and fall of their light, and the dark it covers
  - Padadvayaprabhājālaparākṛtasaroruhā → `net`: the rays and knots of the net, and the lotus left
    outside it
  - Detail → `hands`: the folded hands, closed like lotus buds under the moons (Saundaryalaharī 89)
- **Palette:** `--art-vermilion` to `--sindura` for the soles, `--art-core` and `--art-moon` for the
  nails and the veil, `--art-hair` for the dark, `--gold` for the net, `--lotus`, `--leaf` and
  `--art-turmeric` for the lotus, and the buds in `--art-core`, `--art-saffron` and `--art-vermilion`.
  No additions.
- **Motion:** `m-twinkle` (the nails, in three groups), `m-lick` (the big toes), `m-shimmer` (the
  glow, the fall of light and the net), and `m-breathe` (the veil).
- **Notes:** This title stays on one line and reaches x ≈ 382 at y ≈ 74–141 (434 at 1100px), so the
  card sits at y ≈ 184–396. The first version drew no feet: ten pale discs in an arc read as a string
  of pearls, a net of spokes and sagging rings round one centre read as a cobweb, and a hard-edged
  veil with a row of buds on it read as a cake with candles. The footprints made the nails read at
  once, two crossing fans of rays read as a net, and the dark and its veil became soft gradients. The
  footprint moved into `primitives.tsx`; the Dhyāna renders byte-for-byte as before. In the chant
  miniature the red feet over the lit pool carry it, and the share card shows the whole.

### Shloka 20: The portrait reaches the feet, and beauty is named at its source

- **Component:** `still-water-steps.tsx` (defs prefix `sa20`)
- **Composition:** still water fills the plate below the card. On it stand her feet as two red
  lotuses a step apart, each ringed by a jewelled anklet whose bells sound in broken rings across the
  surface. A female swan keeps pace below them at the right, her wake a few flat arcs that hardly
  open. Above the card, in the crown zone, the treasury the third name calls her stands open, heaped
  with gems, and a soft column of light pours down from it over the water with points of light
  falling through it. The first composition that ends the portrait: its source is shown above and its
  last step below.
- **Name → part:**
  - Śiñjānamaṇimañjīramaṇḍitaśrīpadāmbujā → `anklets`: the two lotuses, their anklets and bells, and
    the rings of their ringing
  - Marālīmandagamanā → `swan`: the swan, her reflection and her wake
  - Mahālāvaṇyaśevadhiḥ → `treasury`: the casket, its hoard and glow, and the light pouring from it
  - Intro, *still water* → `water`: the level lines of the surface and the glow on it
  - Detail → `salt`: the heap of salt on the rim, because *lāvaṇya* is made from *lavaṇa*
- **Palette:** `--art-vermilion` and `--art-crimson` for the lotuses, `--gold` for the anklets and
  casket, `--art-moon` and `--art-saffron` for the swan, `--gold-soft` for the water, and
  `--art-ivory` for the salt. No additions.
- **Motion:** `m-sway` (the anklet bells, in two groups), `m-shimmer` (the water's glow, the column
  of light, and the ringing), `m-twinkle` (the falling points), `m-lick` (the hoard), and `m-breathe`
  (the hoard's glow).
- **Notes:** This title wraps at every desktop width, its second line reaching x ≈ 78 at 1280px, and
  the card sits at y ≈ 225–437, which leaves the crown zone clear for the casket. The first swan, with
  a flat back and a lowered grey wing, read as a gravy boat; an arched wing, a full breast and a raised
  tail made it a swan. Its first wake, two long parting lines, read as a pole and then, as chevrons,
  as stray brackets; flat arcs trailing close behind match the rings on the water. The lotuses first
  kept their leaf pads, and the anklets round them read as saucers. A hard-edged beam from the casket
  read as a spotlight and became a soft column. The bell (Shloka 16) and the open lotus (Shloka 19)
  moved into `primitives.tsx`; both render byte-for-byte as before. In the chant miniature the gold
  casket and the two red lotuses carry it.

### Shloka 21: The body totalled up, and the consort finally named

- **Component:** `on-his-lap.tsx` (defs prefix `sa21`)
- **Composition:** the portrait summed up and its subject joined to her consort. She is a tall flame
  of light in one flat red, rising from the focal zone through the card to a tip above it, closed in
  one gold line. Round her, on a beaded chain, are eight of the nine gems of a navaratna, set as that
  jewel is set, with the ruby's place at the centre hers. Kāmeśa is named at last and appears as his
  crescent, laid horns up as a lap, and she sits in it to the viewer's right, his left. Where she
  rests on him is one bindu, half white and half red, and a single lotus fibre is looped round his
  horn and tied at her side. The first composition in which he and she are both present, and the
  first to show her as one flat colour.
- **Name → part:**
  - Sarvāruṇā → `red`: the flat red of the flame and its glow
  - Anavadyāṅgī → `outline`: the one unbroken line round it
  - Sarvābharaṇabhūṣitā → `gems`: the eight gems and their chain
  - Śivakāmeśvarāṅkasthā → `lap`: his crescent and its glow
  - Śivā → `bindu`: the red and white point where they meet
  - Svādhīnavallabhā → `thread`: the lotus fibre that ties them
- **Palette:** `--art-vermilion` for her, `--art-moon` and `--gold` for him, and the gems in
  `--sindura`, `--leaf`, `--art-turmeric`, `--art-hair`, `--art-ember`, `--gold-soft` and
  `--art-moon`. `--art-ivory` for the fibre. No additions.
- **Motion:** `m-shimmer` (her glow and his), `m-twinkle` (passing glints on four gems), and
  `m-breathe` (the bindu's glow).
- **Notes:** This title wraps at every desktop width, its second line reaching only x ≈ 23 at
  1280px, and the card sits at y ≈ 225–437. The gems sit where the card leaves them visible: four
  above it, one at each side, two below. The first flame, its sides convex to the tip, read as a
  drop; drawing the sides in near the tip made it a flame. His moon glow first lay over her lower half
  and washed the red out, so his crescent is now drawn behind her, and the glow, which by lamplight
  read as a grey platter, is smaller. Kāmeśa's crescent, first drawn small at Shloka 11, is the fourth
  night's `litPart` already in `primitives.tsx`. In the chant miniature the red flame on the white
  crescent carries it.

## Open questions

- Name 559, *tāmbūlapūritamukhī* ("her mouth full of betel"), returns to the betel, which Shloka 10
  now draws only as fragrance. The betel leaf, roll, clove, and camphor of Shloka 10's first version
  (in git history) are a starting point, kept away from anything that reads as a mouth.
