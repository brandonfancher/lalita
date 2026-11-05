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
| Her goad (aṅkuśa) | `Goad`: a banded gold shaft with a bud-shaped butt, a lotus collar, a leaf-shaped spear point, and a hook curving out to the right. Held at the origin, pointing up. Shloka 48 turns it point down, cooling in a basin | `primitives.tsx` | Shloka 2 |
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
| The moon | An `--art-moon` disc with a 1.6-unit `--gold` rim, faintly shaded toward the limb with `--gold-soft`, and a soft `--art-moon` glow just beyond. Any unlit part is `--art-hair` at about 0.16 opacity with a faint gold outline, so a part-lit moon still shows its whole disc. Never rays: rays make it the sun. Show the ashen half of a half moon, or it reads as Shloka 2's half-risen sun | Inline (`eighth-night-moon.tsx`, `autumn-moon-turn.tsx`, `ten-taken-away.tsx`, `other-end-of-the-rope.tsx`) | Shloka 5 |
| The moon's halo (pariveṣa) | Rings, never rays. Like a real lunar halo, red on the inner edge: a 2-unit `--sindura` ring 10 units out, then `--art-saffron`, then `--gold`, a ring of alternately large and small gold pearls 28 units out (`m-twinkle`, three groups), and a faint outer ring 40 units out. `--art-vermilion` as a thin ring turned pink by day | `MoonHalo` in `primitives.tsx` (promoted at Shloka 8) | Shloka 5 |
| Moonlight | Fine `--gold-soft` rings round the moon, about 0.6 units wide, 22–26 units apart, fading outward from about 0.45 opacity. Where a second light shares the sky, they cross (two moons) or fade out against it (the sun's radiance) | Inline (`eighth-night-moon.tsx`, `sun-moon-earrings.tsx`) | Shloka 5 |
| The moon's phases | `litPart(night, r)`: the lit part of a waxing moon, lit from above, for nights 1–15 of the bright fortnight. The eighth is exactly half, flat edge down | `primitives.tsx` | Shloka 5 |
| The deer in the moon (mṛgāṅka) | A small leaping blackbuck facing right, in `--art-musk`, with short spiralled horns, a flicked tail, legs out fore and aft, and a pale eye. Soft musk smudge behind it. About 50 units long, so it reads as a dab from afar; on a smaller moon, scale it with the disc (0.66 on a moon of radius 56) | `MoonDeer` in `primitives.tsx` (promoted at Shloka 8) | Shloka 5 |
| Her crescent crest (śekhara) | The fourth night's `litPart` turned over, horns up, radius 22, cradled on the crown's finial: an `--art-moon` fill with a 1.3-unit `--gold` edge, and its glow drawn as two soft `--art-moon` strokes round the crescent itself. Unlike a half moon, a crescent shows only its lit part: with its ashen disc, and with a round glow, it read as a ball in a cup. Clear the crown's rays from under it | Inline (`whole-image.tsx`) | Dhyāna |
| Hibiscus (japā) | Face-on: five broad, slightly ruffled petals (radius 64) turned in a pinwheel, `--art-vermilion` round an `--art-crimson` eye, `--art-crimson` veins and edges, and an `--art-saffron` sheen down each petal. The staminal column is what makes it a hibiscus: a `--gold-soft` stalk from the centre leaning up and out past the petals, pollen dots of `--art-core` on its outer third, five `--art-crimson` stigma pads at the tip. The bindu sits in the eye. Darkening the petals' rim by day made it a brick-red blob | `Hibiscus`, `HibiscusGradient` and `hibiscus()` in `primitives.tsx` (promoted at Shloka 46, used by the Dhyāna and Shloka 46) | Dhyāna |
| Her footprints (śrīpāda) | A pair of `--art-vermilion` footprints, toes up, big toes inward, laid on a surface and foreshortened to about 0.7 of their height: a sole with a narrow inner arch and five separate toes. Without the arch and the gap before the toes they read as mittens | `Footprint` and `FOOTPRINT_TOES` in `primitives.tsx` (promoted at Shloka 19); `edge` adds a hair-fine gold rim that keeps its width under scaling | Dhyāna |
| Jewelled vessel (ratna-ghaṭa) | A round-bellied `--gold` pot: a tilted `--gold-soft` lid, a collar line at the neck, a belt of rubies and `--leaf` emeralds by turns between two rows of pearls, a soft `--art-core` sheen on the left of the belly, and upturned petals round the foot. Downturned petals at the shoulder read as fangs | Inline (`whole-image.tsx`) | Dhyāna |
| The eight powers (aṇimādi siddhis) | Eight short `--art-saffron` rays round her source, 76–92 units out, each tipped with an `--art-core` `glint` and a gold dot (`m-twinkle`, three groups). Set them at 0°, 45°, … so her four arms pass between them | Inline (`whole-image.tsx`) | Dhyāna |
| The innermost triangle (trikoṇa) | A hair-fine `--gold-soft` downward triangle round the bindu, circumradius 22 so the bindu's ring sits inside it. Kept faint: bright, with the bindu's glow inside it, it read as an eye in a triangle | Inline (`whole-image.tsx`) | Dhyāna |
| Her brows as the toraṇa | Two gold arches standing on a straight gold beam, each shaped as a brow: a blunt head by the centre, thickest just after it, tapering to a tail that stands on the beam on a small gold knob with a vermilion dot. A vermilion line runs inside each arch, an `--art-core` sheen along its top, and gold beads under it. Keep them low and long (about 2.5 : 1): taller, they read as two horseshoe arches. The gap between the heads is the ājñā point | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Festoon (vandanavāra) | A row of mango leaves hanging tip down from a beam, `--leaf` with a `--gold-soft` midrib, lengths alternating, a jasmine bud between each pair; `m-sway` in three groups | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Jasmine (mallikā) | Small `--art-ivory` buds outlined in hair-fine gold, strung close on a gold thread; a string ends in a small gold bell. Chosen over marigold, which reached India only after 1500 | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Plantain post | A tall, faintly tapering `--leaf` stem with slanting sheath lines, tied with a vermilion and a gold thread, two plantain leaves arching out and down from its top (keep the left ones below the title) | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Fish (mīna) | Seen from above, as fish are seen in shallow water: a slim body about 70 units long, bent a little as if turning, with a forked tail, two pairs of side fins in `--art-saffron`, a gold spine line, gold scale arcs, and two small eyes (`--art-musk` in an `--art-core` ring). The body is vermilion down the spine, shading to saffron at the sides. A faint `--art-crimson` shadow falls on the bed beneath. A pair circles one centre, one turned 180° from the other. `m-dart` | `FishDefs`, `Fish` and `FISH_BODY` in `primitives.tsx` (promoted at Shloka 23) | Shloka 6 |
| Star | `Star`: a four-pointed `glint` in `--gold-soft` (`m-twinkle`, three groups). A bright star adds a faint `--gold-soft` disc behind it. A star put out by a greater light is a still `--gold-soft` dot, or at most a hair-fine ring | `primitives.tsx` | Shloka 4 (promoted at Shloka 7) |
| Campaka, newly opened | Seen from the side as a slim torch: eleven `campakaPetal`s from one calyx, most nearly closed (within 9° of upright), only the outer pair parting, tips curling a little outward. Filled with a gradient from `--art-saffron` at the base through `--art-core` to `--art-ivory` at the tips (the palest, first-day flower), edged in `--art-saffron`. A small three-sepal `--leaf` calyx; a straight `--leaf` stem with a `--gold-soft` line; lance-shaped `--leaf` leaves with a gold midrib. Splayed wider, it read as a daisy or an agave | `campakaPetal` in `primitives.tsx`; the flower inline (`campaka-jewel.tsx`) | Shloka 7 |
| Diamond (vajra) | Face-on: an eight-sided `--art-moon` girdle with a `--gold` edge, the table an octagon half its size, `--gold-soft` facet lines from the table's corners to the girdle's, a small `--art-core` `glint` at the upper left, in a gold cup. The facets keep it from reading as a pearl | `diamond` in `primitives.tsx` (promoted at Shloka 14) | Shloka 7 |
| Her nose stud (mūkkutti) | Seven diamonds in a gold rosette (one in the middle, six round it, one straight up), beaded at the rim, outlined in `--art-carve`. A small `--art-moon` glow just round it makes it white-hot against gold by day; behind that a larger `--art-core` glow, a four- and an eight-pointed `glint`, and sixteen hair-fine rays, the upward one longest. Flashes on three stones | Inline (`campaka-jewel.tsx`) | Shloka 7 |
| Pearl (muktā) | An `--art-moon` disc with a hair-fine gold edge, a `--gold-soft` shading arc on the lower right, an `--art-core` highlight at the upper left; hung from a small gold ring under a gold cap. Too heavy below a radius of about 4: see "Strings of pearls" for small ones | `Pearl` in `primitives.tsx` (promoted at Shloka 13) | Shloka 7 |
| Kadamba | A head is a ball of radius 9–14: a radial gradient from `--art-core` (upper left) through `--art-saffron` to `--art-vermilion`, stippled with tiny `--art-ivory` florets in a sunflower spiral, and ringed by short `--art-saffron` hairline styles that stand out to about 1.3 times its radius, each tipped with an `--art-ivory` dot edged in gold (`m-twinkle`, three groups). The pale tips make it a kadamba and not an orange or a berry. Heads come in sprays (mañjarī) of four or five on short `--leaf` stalks, among broad, pointed, glossy `--leaf` leaves with a `--gold-soft` midrib and curved veins, long enough to show beyond the heads | `kadambaLeaf`, `kadambaHead`, `KadambaLeaf` and `KadambaHead` in `primitives.tsx` (promoted at Shloka 23) | Shloka 8 |
| Ear pendant (tāṭaṅka) | Hung from a gold stud in the lobe (a ruby in it on the sun's side, a pearl on the moon's), a short gold link with gold beads, a bail, the disc, and a drop beneath (a `Ruby` under the sun, a pearl under the moon). Viewer's left is her right ear: the sun there, the moon on the other side. Each pendant swings from its lobe (`m-sway`, see Motion additions) | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| The moon as a little boat (uḍupa) | A small gold crescent, horns up, radius 13, riding the top of the moon's disc as its bail, with three `--art-vermilion` beads along the hull and the ring for the link between its horns | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| Balance (tulā) | A gold beam, thickest at the middle and tapering to bud finials, with four `--gold-soft` bands, a carved centre line, and a boss at the pivot. It hangs in a fork (two gold cheeks under a crossbar with a red mark at its centre) from a ring and a short chain. A tongue stands at right angles to the beam, so when the beam tips, the tongue leans out from under the red mark toward the heavier pan. Each pan is a shallow gold bowl on three cords (one behind) from a ring under a hook at the beam's end: a `--gold-soft` inside, a beaded front rim, a carved band, a saffron sheen, and a bud drop beneath. The pans swing from their hooks (`m-sway`) | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Her light in a vessel | A pool of light filling the vessel (a radial gradient from `--art-core` through `--art-saffron` to `--art-vermilion`), a soft tall glow rising from it, and the bindu hanging in the glow just above the surface, not on it: a bright dot on a red ellipse reads as an eye. Her radiance (the 108 hairlines) starts at the bindu and fades in from nothing | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Ruby mirror (ādarśa) | A round hand mirror: a flat `--art-vermilion` face with a soft `--art-crimson` bevel at its edge and two diagonal `--art-core` sheen streaks, in an `--art-carve` setting, a beaded gold frame, and a gold handle with a collar and a bud foot. A shaded, domed face, or a crest of petals on the frame, made it a pomegranate | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Coral (vidruma) | A branching sprig of round-capped `--art-vermilion` strokes over slightly wider `--art-crimson` ones, knobbed tips, a few tiny `--art-ivory` polyps (fresh coral is alive; `m-twinkle`), in a small gold mount | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Bimba (ivy gourd) | A `--leaf` creeper with five-lobed, heart-based leaves veined in `--gold-soft`, coiling tendrils, and small oval gourds on short stalks. Each gourd is scarlet only on the side facing her light and `--leaf` on the far side, with pale stripes there and a core sheen on the red side: Śaṅkara's bimba is red only by reflecting her | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Water in a channel | Filled with the miniature painters' pattern of small arcs, each row set half an arc along (a `<pattern>`, `--gold-soft`), over a soft saffron glow, between gold banks with a fainter outer kerb. Rounded, organic banks: straight banks and square corners read as a pipe, a band of constant width as a snake. Dashed flow lines read as road markings by lamplight | The pattern is `WavePattern` in `primitives.tsx` (promoted at Shloka 23); the channel is inline (`wedding-doorway.tsx`) | Shloka 6 |
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
| Tortoise (kūrma) | From the side, about 90 units long: a domed `--art-stone` shell with a gold outline, a saffron tint, gold plates and a gold rim, over a `--gold-soft` head, legs and tail, a small carve eye, and a faint `--art-musk` shadow | `Tortoise` in `primitives.tsx` (promoted at Shloka 32, used by Shlokas 18 and 32) | Shloka 18 |
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
| Meru, the world-mountain | Golden: an `--art-turmeric` to `--gold` to faded `--gold-soft` gradient with a `--gold` skyline and hair-fine `--art-carve` ridges running down from each summit. Three summits, the middle one a broad flat top that carries what stands on it, the two outer ones pointed and lower, with deep saddles between (shallow saddles read as one hill with two bumps) | Inline (`meru-inward.tsx`) | Shloka 22 |
| City walls (prākāra) | Seen from the front as terraces, each wall inside and above the last: a band 14 tall in its own metal or gem (`--art-hair` iron, `--sindura` copper, `--art-moon` silver, `--gold`, `--art-vermilion` ruby, `--leaf` emerald) edged in gold, with 5-unit merlons along the top, a pointed tower at each end, and an `--art-core` sheen. One arched gate between two towers in the outermost wall. Without the end towers the walls read as steps | Inline (`meru-inward.tsx`) | Shloka 22 |
| Pavilion of the wish-gem (cintāmaṇi-gṛha) | Four `--art-moon` pillars with gold capitals and bases on a gold floor, a gold lintel, and a roof that is the gem itself: a faceted outline filled across with `--art-saffron`, `--art-core`, `--art-moon` and `--lotus`, gold facet lines, two passing glints, and a gold pot finial. A pale roof read as a house's | Inline (`meru-inward.tsx`) | Shloka 22 |
| Couch of the five Brahmās (pañcabrahmāsana) | A white plank (Sadāśiva) on four gold legs, each leg with a medallion in its god's colour bearing his work: Brahmā's lotus rosette on `--art-vermilion`, Viṣṇu's discus on `--art-hair`, Rudra's trident on `--art-moon`, Īśvara's veil on `--gold`. Her bindu sits just above the plank | `BrahmaCouch` in `primitives.tsx` (promoted at Shloka 46, used by Shlokas 22 and 46) | Shloka 22 |
| Kadamba tree | A grove tree built from the kadamba spray's parts: a forked `--art-musk` trunk with two boughs, a canopy of five overlapping `--leaf` circles at 0.62 opacity (as one mass), nine `KadambaLeaf`s round its rim, and four to six `KadambaHead`s of radius 3–4 on it. Smallest at the back of a ring, largest at its front corners. `--art-carve` trunks vanish in light mode | Inline (`nectar-island.tsx`) | Shloka 23 |
| Lotus forest (padmāṭavī) | `OpenLotus`es without pads in `--lotus` with `--art-crimson` veins, at scales 0.48 to 0.82, on tall `--leaf` stalks from one pool, so that the blooms stand as high as the trees round them, with leaves held up on their own stalks (tilted `--leaf` ellipses with radiating `--gold-soft` veins) and closed `--lotus` buds. Five blooms read as a bouquet; seven, with buds and raised leaves behind, as a forest | Inline (`nectar-island.tsx`) | Shloka 23 |
| Sea of nectar (sudhāsāgara) | Milk-white water filling the plate below the card: an `--art-moon` to `--gold-soft` gradient fading in at the top, with `WavePattern` over it at 0.7, faded in by a mask so it has no hard horizon. The island in it is a flat ellipse, `--art-turmeric` to `--gold`, with a faint `--art-musk` bank beneath, an `--art-moon` surf line, and a dashed `--gold-soft` ring of swell | Inline (`nectar-island.tsx`) | Shloka 23 |
| Her glance (kaṭākṣa) on water | A widening band of `--art-core` light running from her eyes toward the viewer like the moon's path on the sea, fading out, scattered with small twinkling glints, carrying an `OpenLotus` on its pad as what is given | Inline (`nectar-island.tsx`) | Shloka 23 |
| Lamp (dīpa) | A small `--gold` bowl edged faintly in `--art-musk`, with a flame drawn as a pointed drop and a smaller core inside it, `m-flicker` in three groups: `--art-saffron` round `--art-core` for the gods, `--art-moon` round `--art-ivory` for the seers. Many held up in arcs round her light, in companies of five with a gap between, read as an assembly at worship | Inline (`court-and-army.tsx`) | Shloka 24 |
| Spear (śakti) | A shaft fading out downward from `--gold`, gold lugs at its head, a long leaf-shaped `--art-moon` blade edged in gold with a gold midrib, and a swallow-tailed pennant just below the head streaming back (`--art-vermilion`, `--art-saffron` or `--lotus`, `m-flicker`). Leaning 16° forward, in ranks that grow nearer and larger toward the lower right, it reads as an army marching. A rounded blade read as a candle flame | `Spear`, `SpearDefs` and `SPEAR_LEAN` in `primitives.tsx` (promoted at Shloka 28, used by Shlokas 24 and 28) | Shloka 24 |
| Ash (Bhaṇḍa's substance) | Overlapping soft clouds, each an `--art-musk` radial gradient with an `--art-moon` one over it so it reads grey by day and by lamplight, with drifting flecks of both (`m-ember`). Musk alone vanishes by lamplight | `Ash` and `AshDefs` in `primitives.tsx` (promoted at Shloka 28, used by Shlokas 24 and 28) | Shloka 24 |
| Elephant (gaja) | In profile, about 110 long and 88 to the top of its back: a slate-grey body in `--art-hair` (a gradient from 0.78 to 0.95), edged in `--gold`, on four straight legs (the far pair paler) with `--art-ivory` toenails, a darker ear, an `--art-ivory` tusk, a dotted gold chain across the brow, and a `--art-vermilion` caparison with a gold border and fringe. Lead elephants raise the trunk in a curl holding a gold pot; the herd's trunks hang. Raised trunks behind a lead read as poles | `Elephant`, `ElephantDefs` and `ELEPHANT_TRUNK` in `primitives.tsx` (promoted at Shloka 46, used by Shlokas 25 and 46); what the trunk holds is passed in | Shloka 25 |
| Water poured (abhiṣeka) | From each tipped pot, three dashed `--art-moon` strands falling in a curve onto her light (`m-shimmer`), with a few droplets edged in `--gold-soft` round it (`m-twinkle`). Solid strands read as a second pair of tusks, and a splash ring under the light read as a saucer | Inline (`elephants-and-horses.tsx`) | Shloka 25 |
| Horse (aśva) | In the flying gallop, about 66 long: one silhouette for body, neck and head, forelegs stretched forward and hind legs back as round-capped strokes, a streaming tail, an `--art-vermilion` mane and saddle cloth. `--gold`, or `--art-turmeric` for a nearer circuit. Upright whichever way it runs, rocking with `m-sway` in three groups | `Horse` in `primitives.tsx` (promoted at Shloka 32, used by Shlokas 25 and 32) | Shloka 25 |
| The Śrīcakra in tiers (meru-prastāra), her chariot Cakrarāja | The yantra raised as a stepped meru and seen from in front and above (top faces foreshortened to 0.5, 3.2 plate units to a yantra unit): a square plinth of gates (bhūpura, three nested gate-square lines, gold over vermilion over gold, on an `--art-stone` face), then four round drums, each with a gold-to-`--art-turmeric` riser carved with upright pilasters and a line under its rim: the three circles, the sixteen petals (`--art-core`), the eight petals (`--art-saffron`), and the nine triangles on the top face. Smooth risers made it a tiered cake | `sriCakraRatha(cx, cy, s)` (the geometry, at any scale) with `RathaDefs`, `RathaTiers`, `RathaTriangles` and `RathaWeapons` in `primitives.tsx` (promoted at Shloka 27, used by Shlokas 26 and 27) | Shloka 26 |
| The nine triangles (the Śrīcakra's centre) | From the traditional construction: nine horizontal base lines 6, 12, 17, 20, 23, 27, 30, 36 and 42 units down a 48-unit diameter, half-widths 12.87, 15.78, 22.96, 7.66, 5.98, 7.81, 23.24, 16.78 and 12.87, each joined to an apex on the axis (27, 42, 48, 36, 30, 12, 0, 6, 17), five pointing toward the viewer and four away. Gold hairlines over a field of her light (`--art-core` to `--art-saffron` to `--art-vermilion`), each triangle tinted faintly so the overlaps build up; her bindu sits just over the innermost | `SRI_TRIANGLES` and `RathaTriangles` in `primitives.tsx` | Shloka 26 |
| Chariot wheel (cakra) | Face-on: a thick `--gold` rim between two `--art-carve` lines, sixteen gold spokes, a gold hub with a small `--art-vermilion` boss. Drawn under a chariot's front corners, as the miniature painters show a chariot's wheels | `ChariotWheel` in `primitives.tsx` | Shloka 26 |
| Weapons on a tier (sarvāyudha) | Small gold weapons about 22 tall standing round a tier's rim, by turns a spear with an `--art-moon` blade, a trident, an arrow, and a goad, one in five tipped with a twinkling point of light. On a stepped form only the front of each lower rim shows | `RathaWeapons` in `primitives.tsx` | Shloka 26 |
| Mantriṇī (Śyāmalā) | Never a figure: a sapphire light, an `--art-hair` disc with a gold ring, an `--art-moon` highlight and a soft `--art-hair` glow, over her ruby-set vīṇā: a straight gold neck with four rubies, a curled end, and two gold gourds hung beneath. Song rises from it as broken `--gold` arcs, as the girdle's sound does (Shloka 16) | `Sapphire`, `SapphireDefs` and `Vina` in `primitives.tsx` (promoted at Shloka 29, used by Shlokas 26 and 29; `Vina` alone also by Shloka 42, for Śāradā) | Shloka 26 |
| The Geyacakra | Mantriṇī's chariot: seven square steps of `--art-hair` edged in gold, in the Cakrarāja's projection, on two wheels | Inline (`king-of-wheels.tsx`) | Shloka 26 |
| The Kiricakra | Daṇḍanāthā's chariot: five square steps of `--art-crimson` with `--art-vermilion` tops, edged in gold, in the Cakrarāja's projection, on two wheels, her rod for a flagstaff, the boar banner on it | Inline (`wall-of-fire.tsx`) | Shloka 27 |
| Daṇḍanāthā's rod (daṇḍa) | A straight gold staff with three `--gold-soft` bands and a gold knob | Inline (`wall-of-fire.tsx`) | Shloka 27 |
| Boar (kiri, varāha) | In profile facing right, about 76 long: a high bristled shoulder hump sloping to the rump, a long snout with a flat nose, an `--art-ivory` tusk curving up, a pointed ear, short legs as round-capped strokes, a curled tail. `--gold`, on a vermilion banner | `Boar` in `primitives.tsx` (promoted at Shloka 32, used by Shlokas 27 and 32) | Shloka 27 |
| Rampart of fire (vahni-prākāra) | A ring of flame seen from outside and low: an ellipse (330 by 240) of `tongue` flames, each a gradient from `--art-vermilion` to `--art-saffron` to `--art-core` with a smaller `--art-core` tongue inside, taller, wider and more opaque toward the front, breathing in three groups, on a faint saffron band, with faint firelight on the ground inside. Open at one place only, the south | Inline (`wall-of-fire.tsx`) | Shloka 27 |
| The Nityās (the fifteen nights) | The fifteen nights of the bright fortnight drawn as in Shloka 5 (an `--art-hair` disc at 0.2, the `litPart` in `--art-moon`, a gold rim, `m-twinkle` in three groups), here growing from radius 6 to 16.5 as they wax, each with a faint tapering `--gold-soft` trail behind it. Jvālāmālinī, the fourteenth, wears a ring of twelve small `--art-saffron` tongues and a vermilion rim. She is the sixteenth, the full moon | Inline (`nityas-onslaught.tsx`) | Shloka 28 |
| Her gaze | Gold hairlines from her bindu in a fan toward what she watches, alternating long and short, fading out, over a glow of `--art-glow` stretched forward of her light | Inline (`nityas-onslaught.tsx`) | Shloka 28 |
| Bālā | Never a figure: a small light the colour of the rising sun (an `--art-vermilion` disc with an `--art-saffron` highlight, a thin gold ring, a soft saffron-to-vermilion glow), ringed by fourteen gold scales, the armour her mother put on her. Joined to her mother's bindu by a dotted `--art-core` thread of breath. Her syllables ऐं क्लीं सौः in `--sindura` beneath | Inline (`balas-arrows.tsx`) | Shloka 29 |
| Crescent-headed arrow (ardhacandra) | A gold shaft with `--art-vermilion` fletching and an `--art-moon` crescent head edged in gold, its horns forward | Inline (`balas-arrows.tsx`) | Shloka 29 |
| Bhaṇḍa's sons, his brothers | His sons are small puffs of his ash (as in Shloka 24), each with a small `--gold-soft` coronet knocked off and tumbling; his brothers are larger banks of the same ash | Inline (`balas-arrows.tsx`) | Shloka 29 |
| Vārāhī (Daṇḍanāthā) | Never a figure: an `--art-crimson` light with a `--art-vermilion` highlight and a gold ring, in a soft crimson glow, over her crossed plough (a curved gold beam with an `--art-moon` share) and pestle (a banded gold club). Her chariot is the Kiricakra | Inline (`glance-and-a-son.tsx`) | Shloka 30 |
| Breath drawn out (prāṇa-haraṇa) | Three dashed `--art-moon` strands drawn out of the one who dies and curving back to the one who takes it, twinkling in three groups | Inline (`glance-and-a-son.tsx`) | Shloka 30 |
| The look between them | Her bindu and his crescent (the fourth night's `litPart`, radius 30, horns up, over a faint saffron tint so it shows by day) on one level, with three gold hairlines each way between them, a little spread, and a `glint` where they meet. A wedge of light hanging from the meeting point made the look and what came of it a necklace and pendant | Inline (`glance-and-a-son.tsx`) | Shloka 30 |
| Mahāgaṇapati | Never a figure: a light ruddy as the dawn (an `--art-vermilion` disc with a saffron highlight and gold ring, in a saffron-to-vermilion glow, Bālā's light grown larger), ringed on a dotted gold circle by the ten things his hands hold, upright, open at the top: jewelled pot, ear of rice, discus (a small `ChariotWheel` in saffron tongues), sugarcane bow (`SugarcaneBow`), citron, tusk, lotus, conch, trident, mace. A crescent on his light made it a horned face | `Mahaganapati`, `GanesaEmblem`, `ganesaPlaces` and `DawnDefs` in `primitives.tsx` (promoted at Shloka 31, used by Shlokas 30 and 31; pass `skip` to draw one emblem as a part of its own) | Shloka 30 |
| Missile and counter-missile (astra, pratyastra) | Hers: a gold shaft with a head of flame (an `--art-saffron` `tongue`), its trail a gold gradient back toward her light. Bhaṇḍa's: a dark barbed `--art-hair` head on an `--art-musk` shaft, with a hair-fine `--art-moon` line along it so it shows by lamplight, its trail coming from off the upper right. Where they meet, a soft `--art-core` burst, eight short rays and a `glint` (`m-lick`) | Inline (`answering-rain.tsx`) | Shloka 31 |
| The obstruction-engine (vighna-yantra, Jayavighna) | A square stone slab seen from above at a slant (half 64 by 26, 7 deep), `--art-stone` with `--art-carve` sides and a `--gold-soft` edge, cut with an eight-angled figure (two squares, one turned 45°) and a trident at each point in `--art-crimson`. Broken, it is five wedge pieces from the centre, pushed apart and turned a little, the figure clipped to each, with powder blowing off on `m-ember` | Inline (`answering-rain.tsx`) | Shloka 31 |
| Her fingernails | Never a hand: at the tip of an arm-beam, five small moons fanned on round its end (the toenail moons of Shloka 19: `--art-core` to `--art-moon`, a gold rim, a moon glow 3.2 times the radius, `m-twinkle`), each with a gold hairline of light running on out. With both hands at one height over a band of fire, the two clusters and the fire made a face; the arms reach to different heights | Inline (`ten-descents.tsx`) | Shloka 32 |
| The ten descents (daśākṛti) | Each form as its emblem in a small soft glow, never a figure: the fish (`Fish`), the tortoise (`Tortoise`), the boar (`Boar`), the man-lion (`Lion` with `--art-ivory` claws), the dwarf's `--art-turmeric` umbrella and gold water pot, Paraśurāma's axe (a turmeric haft with a broad `--art-moon` crescent blade), Rāma's bow (a turmeric recurve with an arrow on the string), the fourfold Vāsudeva as four small lights (`--art-hair`, `--art-moon`, `--art-vermilion`, `--art-saffron`) on a gold ring, and Kalki's horse (`Horse` in `--art-moon`) under a raised sword | Inline (`ten-descents.tsx`); the axe is `Axe` in `primitives.tsx` (promoted at Shloka 41, used by Shlokas 32 and 41) | Shloka 32 |
| The Pāśupata | A gold trident-headed shaft with an `--art-saffron` flame at its point and a glint, flying low, a trail of light behind it; behind that, the host burnt out: a field of `tongue` flames (vermilion to saffron to core) dwindling back toward where it came from, with rising `--art-ember` sparks and a low saffron glow, and only a little ash left ahead of it | Inline (`ten-descents.tsx`) | Shloka 32 |
| Kāmeśvara's weapon (kāmeśvarāstra) | A long shaft of pale light, tapering from nothing at her light to 3 units wide, a gradient from transparent `--art-moon` to `--art-ivory`, bowed up between her and its mark, with his crescent (the fourth night's `litPart`, radius 11, `--art-moon` edged in gold) for its head, horns forward. Where it strikes, an `--art-ivory`-to-moon glow and twelve short ivory rays (`m-lick`) | Inline (`empty-city.tsx`) | Shloka 33 |
| Śūnyaka burnt (the Empty Place) | Never ruins or rubble: only the city's skyline, a crenellated wall between three towers, two domed and the middle one spired over an arched gate, drawn as a dashed outline in `--art-musk` with an `--art-moon` line over it, round nothing, in a faint musk hollow. A few small dying `tongue` flames (vermilion to saffron) at its foot and drifting flecks of smoke (`m-ember`) | Inline (`empty-city.tsx`) | Shloka 33 |
| Indra's thunderbolt (vajra) | Upright, turned a little: a banded `--gold` grip with an `--art-vermilion` stud at its middle, and at each end a cage of five gold prongs closing to a point | Inline (`empty-city.tsx`) | Shloka 33 |
| The high gods, praising | Never figures: each is his emblem in a soft `--art-core`-to-saffron glow above her, in order of precedence from the left: Brahmā's lotus (`OpenLotus` in `--art-vermilion`), Viṣṇu's discus and conch (`GanesaEmblem`), Indra's thunderbolt. The gods behind them are their lamps (`Lamp`), in two arcs round her light | Inline (`empty-city.tsx`) | Shloka 33 |
| The herb that revives (sañjīvanī) | A slender `--leaf` stem with a fine `--art-core` line, five pairs of `--leaf` leaves edged and veined in `--art-core`, shrinking upward, and three small five-petalled `--art-ivory` blossoms at the top (`m-twinkle`) with a `glint` over them, in a breathing core-to-saffron glow: alight, as the herbs on Hanumān's mountain were. It grows out of ash (`Ash`) | Inline (`sanjivani.tsx`) | Shloka 34 |
| Kāma, reborn | Never a figure: a small `--lotus` light with a gold ring in a rosy glow, his bow of flowers upright beside it (a `--leaf` recurve stave with small five-petalled blossoms all along it, `--lotus` and `--art-saffron` by turns, and a `BeeString`), and his five flower arrows (`FlowerArrow`) in a narrow fan behind the light. Rati is a smaller `--art-moon` light with an ivory heart; the two look at each other as her light and Kāmeśvara's did (Shloka 30), three gold hairlines each way and a `glint` where they meet | Inline (`sanjivani.tsx`) | Shloka 34 |
| A cluster of the mantra (kūṭa) | A summit, as the word says: a dotted gold peak whose flanks carry its syllables as small `--art-core` lights with gold rims in their own glows (`m-twinkle`), shared out between the two flanks, and at the top a gold disc engraved in `--art-carve` with ह्रीं (Tiro Devanagari), the hṛllekhā that closes every cluster. The other syllables are given at initiation and are never written. The speech cluster (vāgbhava) has five syllables in all, the middle (kāmarāja) six, the śakti cluster four | `summit` and `Summit` in `primitives.tsx` (promoted at Shloka 35, used by Shlokas 34 and 35) | Shloka 34 |
| Her face (mukha-paṅkaja) | A lotus (`OpenLotus`, 1.45 times), in her glow, with the speech cluster rising over it | Inline (`sanjivani.tsx`) | Shloka 34 |
| Her mantra-body | Never a figure: her light as a tall column (an elliptical `--art-glow` glow, 320 by 640), crossed by two seams at the throat and the waist, each a gold line with slanting gold stitches and a gold knot at each end. Above the throat, her face as in Shloka 34 (a lotus and the speech cluster, its lights in `--art-core` glows); between the seams the middle cluster in `--lotus` glows over a faint rosy region; below the waist the śakti cluster in `--art-vermilion` glows, standing on a lotus | Inline (`mantra-body.tsx`) | Shloka 35 |
| The root mantra whole (mūlamantra) | Fifteen syllables on a dotted gold ring round her bindu, clockwise from the top, each in its cluster's colour (`--art-core`, `--lotus`, `--art-vermilion` glows, as in Shloka 35), the 5th, 11th and 15th the three ह्रीं on small gold discs. The three clusters standing side by side on one gold ground line, the middle highest, are her frame (kalevara) | Inline (`root-mantra.tsx`) | Shloka 36 |
| Nectar (amṛta) of the kula | A thin fall, a gradient from transparent `--art-moon` to `--art-ivory`, with three `--art-ivory` drops (`m-twinkle`), into a small footed gold cup brimming with an ivory surface, in a moon glow. Falling from the crown or poured in the rite: the picture keeps both readings | `NectarCup` in `primitives.tsx` (promoted at Shloka 37, used by Shlokas 36 and 37); the fall inline (`root-mantra.tsx`) | Shloka 36 |
| The kula's compact (saṅketa) | A palm-leaf book (pothi), `--art-turmeric` leaves between gold boards, bound shut with an `--art-vermilion` cord through two holes, knotted at an `--art-vermilion` seal with a gold rim engraved with a small downward triangle. Nothing inside it is drawn | Inline (`root-mantra.tsx`) | Shloka 36 |
| The kula as a household | A round-topped doorway (`archPath`), a 2.4-unit gold line with a `--gold-soft` line inside, on a gold threshold step, hung along the arch with nine `--leaf` mango leaves (toraṇa) swaying in two groups; a kolam before it (a row of `--art-ivory` rice-flour dots inside an ivory loop, over a faint musk line so it shows by day). Before the door, the outward rite: a `Lamp` and a `NectarCup` | Inline (`kula-and-samaya.tsx`) | Shloka 37 |
| The kula as the assembly of powers | Eight small `--art-vermilion` lights with gold rims in vermilion glows, on a ring round her light, each joined to the next by a gold hairline bowed a little inward. Spokes from her to each made a wheel | Inline (`kula-and-samaya.tsx`) | Shloka 37 |
| The centres of the body (inward worship) | A slender gold column (a gradient fading at both ends) through six small `OpenLotus`es without pads, the fourth, the heart, larger, with her light in it | Inline (`kula-and-samaya.tsx`) | Shloka 37 |
| Akula, beyond the kula | A pale still light with nothing round it and no motion: an `--art-moon` disc with a gold rim and an ivory heart, one faint gold ring, a wide moon glow and a faint saffron tint so it shows by day. Joined to nothing | Inline (`kula-and-samaya.tsx`) | Shloka 37 |
| A centre of the subtle body (cakra) | A small lotus seen face on (`yantraPetals`), its petals filled in the centre's colour (75% lit, 18% unlit) with a gold outline (35% unlit), round a gold circle holding its element's sign (`tattvaSign`): the root centre four `--art-crimson` petals round the `--art-turmeric` square of earth; the svādhiṣṭhāna six `--art-vermilion`; the navel wheel ten `--art-hair` (the traditional dark blue) round the downward `--art-vermilion` triangle of fire; the heart twelve `--art-vermilion`; the throat sixteen `--lotus`; the brow two `--art-ivory` petals as wings. Lit, it has a glow in its own colour. The thousand-petalled lotus is three rings of 40, 52 and 64 fine petals | `CakraLotus` and `Cakra` in `primitives.tsx` (promoted at Shloka 39, used by Shlokas 38 and 39); the signs are `tattvaSign` | Shloka 38 |
| The channel (suṣumnā) | A vertical line on the axis: lit, a 2.2-unit gradient from `--art-core` at the root to gold, fading out above the highest centre reached, in a tall soft `--art-glow` glow; unlit, a dotted gold hairline at 35% | Inline (`first-two-knots.tsx`) | Shloka 38 |
| A knot (granthi), split | A cord wound round the channel, seen a little from above (an ellipse 52 by 14), `--art-musk` 2.4 wide with an `--art-moon` hairline, cut through at the front, its two halves pushed 6 apart with a few frayed strands at each cut end, a soft core glow and a `glint` between them. Drawn as loops with trailing ends, a split knot over a lotus made a moustache over a face | `SplitKnot` in `primitives.tsx` (promoted at Shloka 39, used by Shlokas 38 and 39) | Shloka 38 |
| The thousand-petalled lotus, lit (sahasrāra) | Four rings of 40, 56, 72 and 90 fine petals (`yantraPetals`), `--art-ivory` and `--lotus` by turns, fading outward, with gold hairline edges, in a wide `--art-glow` glow, her light mounted at its heart | Inline (`summit-and-rain.tsx`) | Shloka 39 |
| The rain of nectar (sudhā-sāra) | From the crown's rim, two dotted `--art-moon` falls curving out and down past the body to the root, each with fourteen `--art-ivory` drops edged in gold in small moon glows (`m-twinkle` in three groups), and a fine rain of smaller drops under the lotus. The signs of water, air and space inside a centre's circle made faces (a smile, an eye), so only earth and fire are drawn | Inline (`summit-and-rain.tsx`) | Shloka 39 |
| Lightning drawn out like a vine (taḍil-latā) | A sharp zigzag up the axis, meeting it at the centre of each wheel and swinging 11 units out between them, three strokes deep: a soft `--art-core` glow 7 wide, a 2.6 gold line and a 1.1 `--art-ivory` core (`m-flicker`). Gold `creeperTendril`s curl off alternate corners (`m-sway`): the clinging | Inline (`lightning-vine.tsx`) | Shloka 40 |
| Kuṇḍalinī, coiled | Three and a half turns round the root centre, seen a little from above (radius 48 narrowing to 36, 0.3 as tall as wide, rising 12), drawn as an `--art-vermilion` stroke with an `--art-saffron` one and an `--art-core` hairline inside, in a breathing saffron glow, its upper end straightening into the lightning. Taller and thicker, it read as a spring | Inline (`lightning-vine.tsx`) | Shloka 40 |
| Lotus fibre (bisa-tantu) | A `--leaf` lotus stalk broken in two, a pad at one end and a small bud at the other, the broken ends `--art-ivory`, and five hair-fine ivory and gold fibres sagging between them | Inline (`lightning-vine.tsx`) | Shloka 40 |
| The forest of becoming (bhavāraṇya) | Twelve trees in two rows along a ground line, the back row at 55%: a tapering `--art-musk` trunk under a crown of four overlapping discs, three `--leaf` and one musk shadow, edged faintly in musk, swaying in groups, over a faint musk shade. Cleared, it has a gap through the middle with two `--art-turmeric` stumps and two felled musk trunks, and the `Axe` in a stump, blade down, chips of turmeric still flying | Inline (`forest-of-becoming.tsx`) | Shloka 41 |
| Full pot (pūrṇa-kumbha) | A round gold pot with a narrow neck and rim, a vermilion band and dot, five `--leaf` mango leaves fanned from its mouth and an `--art-turmeric` coconut on top | Inline (`forest-of-becoming.tsx`) | Shloka 41 |
| Good fortune (saubhāgya) | A small gold tray holding a mound of `--art-vermilion` kumkum, one of `--art-turmeric` and a pair of bangles (`--leaf` and vermilion), gold motes twinkling down onto it in a saffron glow | Inline (`forest-of-becoming.tsx`) | Shloka 41 |
| A still lamp (contemplation) | The `Lamp`'s bowl with a narrower flame and no flicker, its one straight dotted gold line of light running to her | `StillLamp` in `primitives.tsx` (promoted at Shloka 44, used by Shlokas 41 and 44) | Shloka 41 |
| Devotee's offering (patraṁ puṣpaṁ phalaṁ toyam) | A `--leaf` leaf plate holding a leaf, a five-petalled `--art-vermilion` blossom, an `--art-turmeric` fruit and a small gold bowl of water, in a saffron glow | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Garland that binds her (bhakti-vaśyā) | A hair-fine gold thread climbing from the offering's flower to her light, swaying a little at the bottom and straightening as it rises, strung with small blossoms alternately `--art-vermilion` and `--art-ivory` (`m-twinkle`), closing at the top in a ring of sixteen blossoms round her light | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Roads that stop short | A palm-leaf book (`--art-turmeric` leaves between gold boards) and a stepped gold fire altar with a flickering flame, each sending a dotted `--gold-soft` road up that curls in and stops well below her | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Shelter (śarman) | A half-dome of her light over the lower scene: a gold hairline arc with a soft gold-soft echo, a ground line, and an `--art-glow` fill brightest at the base (`m-shimmer`). The shadows of fear (`--art-musk` glows, `m-sink`) lie outside it | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Śambhu and Śarva | Never a figure: Śambhu as a small `--art-moon` crescent in a moon glow; Śarva as a gold recurve bow upright with an `--art-vermilion`-tipped arrow on the string | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Śāradā | Never a figure: an `--art-ivory` light in a soft moon glow over the `Vina`, shown smaller | Inline (`devotion-governs.tsx`, using `Vina`) | Shloka 42 |
| The autumn moon (śarac-candra) | The full moon as in Shloka 5, with its deer, but without a halo: a halo means haze, and the autumn sky is washed. Fine `--gold-soft` moonlight rings and a moon glow only. Off at the edges of the crown, the last clouds of the rains: three overlapping soft puffs each, a radial gradient from faint `--art-musk` to `--art-moon`, swaying | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| Śaṅkara's trident and drum (triśūla, ḍamaru) | A gold three-pronged head with `--art-moon` tips on an `--art-turmeric` shaft. From a `--art-vermilion` cord tied under the prongs hangs the drum, upright: two `--art-turmeric` cones meeting at a narrow waist bound in vermilion, `--art-ivory` heads, a bead on a cord. Lying on its side it read as a bow tie | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| Plumb line (sādhvī) | A gold peg, a hair-fine gold thread hanging dead straight, and a gold teardrop bob with an `--art-moon` sheen. Still on purpose | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| The moon in still water | Level `--gold-soft` hairlines, closer toward the far edge, broken round an `--art-moon` ellipse of the moon (with its deer, flattened) in a soft moon glow | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| Lotus leaf that water does not wet (padmapatram ivāmbhasā) | A flat `--leaf` pad seen at a slant, notched to its centre, with radiating `--gold-soft` veins, and beads of water standing on it, `--art-ivory` with a gold rim and an `--art-moon` highlight, one at the very edge about to roll off. Pigment flung at her light, stopping at its edge, read as wings | `LotusLeaf` in `primitives.tsx` (promoted at Shloka 44, used by Shlokas 43, 44 and 47) | Shloka 43 |
| The empty seat (nirādhāra) | A lotus pedestal drawn only in dotted gold, six petals over two base lines, with her light hanging well above it and nothing between | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| Rāhu's shadow (upaplava) | Never a figure: a soft dark disc, a radial gradient from `--art-hair` to `--art-musk`, with a faint musk rim, sinking (`m-sink`), and its way past the moon as a dotted musk arc that goes over the moon and never across it | Inline (`ten-taken-away.tsx`) | Shloka 44 |
| Her light without outline (nirākāra) | Only a glow: a radial gradient from `--art-core` through `--art-glow` to nothing, no disc and no rim (`m-breathe`), with one unbroken gold ring and a `--gold-soft` echo round it (`m-shimmer`) for nityā | Inline (`ten-taken-away.tsx`) | Shloka 44 |
| A lamp in a windless niche (nivātastha dīpa) | The `StillLamp` at 2.2 in a round-topped gold niche (`archPath`) shaded faintly in `--art-musk` on a gold sill, in a small glow | Inline (`ten-taken-away.tsx`, using `StillLamp`) | Shloka 44 |
| Crystal (sphaṭika) | An upright hexagonal prism with pointed ends, a gradient of `--art-ivory` and `--art-moon`, gold edges, `--gold-soft` facet lines and a twinkling ivory glint, in a soft moon glow | `Crystal` and `CrystalDefs` in `primitives.tsx` (promoted at Shloka 46, used by Shlokas 44 and 46) | Shloka 44 |
| The three strands (guṇa) | Three 2.2 strands, `--art-ivory` (edged in gold so it shows by day), `--art-vermilion` and `--art-musk`, twisted into one rope that comes in from the edge and comes undone, the strands curling apart, short of her | Inline (`ten-taken-away.tsx`) | Shloka 44 |
| A fire burnt down (śānta) | A low mound of ash (`--art-moon` to `--art-musk`) with five `--art-saffron` and `--art-vermilion` embers breathing slowly, in a faint saffron glow, and one thin musk thread of smoke going straight up | Inline (`ten-taken-away.tsx`) | Shloka 44 |
| Desire's arrow, fallen | Kāma's `FlowerArrow` at 0.8 lying on the ground, head to the right and a little askew, over a soft musk shadow; without the shadow it reads as flying | Inline (`ten-taken-away.tsx`, using `FlowerArrow`) | Shloka 44 |
| The pole star and the wheeling stars (dhruva) | Her light as the pole star: an `--art-ivory` four-pointed `Star` (s 12) on an `--art-core` dot in a breathing glow. Round it seven `--gold-soft` star trails, arcs of 70–120° on circles 26–68 out, each with a small twinkling `Star` at its leading end | Inline (`pot-and-space.tsx`) | Shloka 45 |
| Pot and space (ghaṭākāśa) | Earthen pots of different shapes standing on a ground line, drawn as `--art-turmeric` outlines over a faint turmeric fill with a musk hairline, an oval mouth and an `--art-vermilion` belly band, so that one soft band of her light (`--art-core` to `--art-glow`, `m-shimmer`) shows through them and between them alike. A broken pot is four `--art-turmeric` shards on the ground where it stood, the light there unchanged | Inline (`pot-and-space.tsx`) | Shloka 45 |
| Lump of clay | A soft irregular lump in `--art-vermilion` at 0.55 with a musk edge and one thumb crease, on a faint musk shadow. On a potter's wheel it read as a hat, and with turmeric and two scores as a loaf | Inline (`pot-and-space.tsx`) | Shloka 45 |
| A blank palm leaf | One `--art-turmeric` leaf edged in gold with its two binding holes and nothing written on it, the gold stylus laid above it | Inline (`pot-and-space.tsx`) | Shloka 45 |
| Smoke that does not soil space | A wavering ribbon of `--art-musk` drifting in from the edge, a broad faint stroke with a fine one inside, fading to nothing before the middle (`m-sway`) | Inline (`pot-and-space.tsx`) | Shloka 45 |
| Her noose from the other end (rāga) | Shloka 2's loop of twisted cord, its `--art-vermilion` loop held in an elephant's trunk, the cord a 5-unit stroke over a 6.4 `--gold` under-stroke with a dotted `--art-carve` twist, a gold binding at the loop and four gold beads. Along its length a gradient from `--art-vermilion` through `--art-saffron` to `--art-ivory`, the red wearing off toward her, with vermilion flecks falling from the red half (`m-ember`). Her end is undyed: ivory with a `--gold-soft` twist and a gold tassel | Inline (`other-end-of-the-rope.tsx`) | Shloka 46 |
| Bees in free flight | Single bees drawn as `BeeString`'s are (an `--gold-soft` body with two `--art-carve` stripes and two carve wings), at 1.5, each turned along a dotted `--gold-soft` path, further apart as they go (`m-twinkle`, three groups) | Inline (`other-end-of-the-rope.tsx`) | Shloka 46 |
| The moon without its mark (niṣkalaṅka) | Shloka 5's moon with fine `--gold-soft` moonlight rings and no deer on its face; the `MoonDeer` (0.6, turned −18°) leaping clear above it at the right | Inline (`other-end-of-the-rope.tsx`) | Shloka 46 |
| Lamps lit one from another | `Lamp`s in a line running out toward the viewer, larger as they come (2.2 to 4.2), each joined to the flame before by a dotted `--art-core` thread (`m-twinkle`), the first thread from her light | Inline (`other-end-of-the-rope.tsx`) | Shloka 46 |
| A stone dais | Two `--art-stone` steps edged in `--gold`, the upper with a row of small `--sindura` triangles at 0.55, and a faint musk floor shadow | Inline (`other-end-of-the-rope.tsx`) | Shloka 46 |
| Rut, dried (mada) | On the elephant's temple, a short `--art-musk` streak at half opacity, drawn as a child of `Elephant` | Inline (`other-end-of-the-rope.tsx`) | Shloka 46 |
| Pippala (aśvattha) | A great tree: a tapering trunk and boughs (`taper`) in `--art-hair` at 0.55 edged in `--gold`, read as grey bark in both themes (musk vanished by lamplight). Leaves on long stalks, heart-based with a long drawn-out tip, `--leaf` with a faint gold edge and `--gold-soft` midrib and veins, hung in drooping sprays of three or four at the ends of short twigs on alternate sides, over soft `--leaf` canopy masses. Leaves strung along the boughs read as spiky caterpillars. Every leaf trembles (`m-sway`, three groups), as a pippala's do | Inline (`two-birds.tsx`) | Shloka 47 |
| Pippala figs | Small round figs (radius 4–5.6) in pairs under the leaf joints, a radial gradient from `--lotus` to `--art-crimson`, gold rim, an ivory highlight | Inline (`two-birds.tsx`) | Shloka 47 |
| A perched bird | In profile facing left, about 50 long at 1.8: `--art-hair` body, wing and wedge tail edged in `--gold`, `--gold-soft` feather lines, an `--art-saffron` breast and beak, an ivory eye ring; the head can turn so the beak points anywhere | Inline (`two-birds.tsx`) | Shloka 47 |
| Mist (moha) | Overlapping flat ellipses, a radial gradient from `--art-musk` at 0.2 through `--art-moon` at 0.24 to nothing (`m-shimmer`), with long `--gold-soft` wisps so it shows by day | Inline (`two-birds.tsx`) | Shloka 47 |
| A lane of clear air | A tapered band from her light to what it reaches, a linear gradient of `--art-core` from 0.55 to almost nothing (`m-shimmer`), with the mist left open round it | Inline (`two-birds.tsx`) | Shloka 47 |
| Temple tank | An `--art-stone` kerb edged in `--gold` above a band of water (`--art-hair` from 0.2 to 0.04) with dashed `--gold-soft` lines, both faded out at the ends with a mask so it isn't a box | Inline (`two-birds.tsx`) | Shloka 47 |
| White lotus standing clear | `OpenLotus` in `--art-ivory` with `--gold-soft` veins and no pad, on a `--leaf` stalk standing above the water, a `LotusLeaf` beside it | Inline (`two-birds.tsx`) | Shloka 47 |
| Dark motes, shaken off | Small `--art-hair` motes (radius 1.2–2.4) with a `--gold-soft` rim, each sinking and fading (`m-sink`) on its own `--dur` and negative `--delay`. Musk vanished by lamplight | Inline (`two-birds.tsx`) | Shloka 47 |
| The wheel of becoming (saṃsāra-cakra) | Her light at the hub. A gold hub ring with carve hairlines, fourteen tapered gold spokes, and a rim of three 6-unit bands, `--art-ivory` outside, `--art-vermilion`, then `--art-hair` (the three guṇas), between gold hairlines. Broken at the foot: the rim is cut through, its ends splintered in carve, and the two spokes there lie on the floor | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| The sword of knowledge (jñāna-khaḍga) | Straight and double-edged, point down: a blade with a linear gradient from `--art-moon` through `--art-ivory` and a hard step to `--gold-soft` (a ridge), gold edge and `--gold-soft` fuller; a gold crossguard with curled quillons, an `--art-vermilion` grip with gold binding, a gold pommel with a vermilion centre, and a glint on the edge (`m-lick`) | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| The knot of the heart, cut (hṛdaya-granthi) | Two halves of a loop of cord, mirrored about the blade, each with a looped end and a tail falling outward: `--art-ivory` at 3.6 over a 6.2 `--gold` under-stroke with a dotted gold twist and frayed gold ends (`m-sway`). In gold alone it read as scrollwork | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| The goad, cooled | Shloka 2's `Goad` at 0.86, turned 165° so it leans point down into a basin with its butt up and to the left. Straight down it read as a candlestick. A gradient from `--art-vermilion` to clear saffron over the point, fading upward | Inline (`wheel-stopped.tsx`, using `Goad`) | Shloka 48 |
| A basin of water, steaming | A shallow gold bowl on a foot, its water an ellipse from `--art-moon` to `--art-hair`, a faint `--art-ember` glow under it (`m-breathe`), and three wisps of steam, `--art-moon` at 0.55 with a `--gold-soft` line inside (`m-sway`) | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| A full pot brimming over | A round-bellied gold water pot with a neck, a lip, a double `--art-vermilion` belly band and a moon-coloured brim. Water runs over as one broad sheet down the front of the belly (`m-shimmer`) with a fine ivory highlight, and one thin stream at the back, to a puddle with ivory drops (`m-twinkle`). Thin streams alone read as wires | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| An iron strongbox, burst | A box of `--art-hair` at 0.7 with gold straps and edge, its lid thrown back at 0.45, gold coins on the rim, the lock hanging open and askew. Coins carried off along the floor (`m-twinkle`) | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| Water running along the floor | A filled, tapering rivulet in the water gradient with a `--gold-soft` edge (`m-shimmer`). A stroked line read as a stick | Inline (`wheel-stopped.tsx`) | Shloka 48 |

When all four weapons appear together, the upper hands hold the noose (left) and the goad
(right), as in Shloka 2, and the lower hands hold the bow (left) and the arrows (right).

### Anticipated

Not yet drawn. Whoever draws one first sets its canon here.

- **The Śrīcakra laid flat.** Shloka 26 draws the whole yantra as a chariot in tiers, seen at a
  slant. When it is needed flat and face-on, draw it with the same nine triangles, the eight and
  sixteen petals, three circles and the square of gates, and keep the Dhyāna's faint trikoṇa canon
  for the innermost triangle alone.
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

### Shloka 22: From the world-mountain inward to the couch of the five gods

- **Component:** `meru-inward.tsx` (defs prefix `sa22`)
- **Composition:** one elevation that climbs as the verse moves inward. Meru, golden, fills the
  ground with its three summits. On the broad middle one the city rises in six walls of different
  metals and gems, each inside and above the last, entered by one gate. On the innermost terrace
  stands an open pavilion roofed with the wish-granting gem, and inside it, just below the card, the
  couch of the five Brahmās with her bindu seated on its plank. Her radiance spreads from the bindu
  over everything, up past the card. The first architecture in the series, and the first composition
  built as a nest of enclosures, each inside the last.
- **Name → part:**
  - Sumerumadhyaśṛṅgasthā → `meru`: the mountain and its three summits
  - Śrīmannagaranāyikā → `city`: the six walls, their towers, and the gate
  - Cintāmaṇigṛhāntasthā → `house`: the pavilion, its pillars, and its gem roof
  - Pañcabrahmāsanasthitā → `couch`: the plank, the four legs and their emblems, and her bindu
  - Intro, *her presence* → `light`: her glow and radiance
- **Palette:** `--art-turmeric` and `--gold` for Meru; `--art-hair`, `--sindura`, `--art-moon`,
  `--gold`, `--art-vermilion` and `--leaf` for the walls; `--art-saffron`, `--art-core`,
  `--art-moon` and `--lotus` for the gem roof. No additions.
- **Motion:** `m-shimmer` (her glow, radiance, and the gem roof), `m-lick` (glints on the roof and
  the two outer summits), and `m-breathe` (the bindu's glow).
- **Notes:** This title wraps at every desktop width, its second line reaching x ≈ 191 at 1280px
  (243 at 1100px), and the card sits at y ≈ 225–437, so the gem roof is mostly behind the card and
  the couch sits just below it, where the eye lands. The first Meru had shallow saddles and read as
  one hill with two bumps; deeper saddles and pointed outer summits made three. The walls first read
  as a stepped platform, and towers at their ends and taller merlons made them walls. The first roof,
  pale, read as a house roof; filled with the gem's colours and glints it reads as a gem. In the chant
  miniature the pavilion on its coloured terraces and the gold mountain carry it.

### Shloka 23: Lotus forest, kadamba grove, sea of nectar — and then her eyes

- **Component:** `nectar-island.tsx` (defs prefix `sa23`)
- **Composition:** the verse pulls back out, each name a wider frame than the last, and the artwork
  draws the frames as rings round one centre, laid flat in perspective below the card. At the
  centre a pool on an island, and from it a forest of lotuses as tall as the trees, her light seated
  in the tallest. Round them a ring of kadamba trees, open at the front. Round the island a sea of
  nectar to the edges of the plate. Then, as the verse turns abruptly from place to face, the
  artwork turns to the near water: two fish, her eyes, circle one centre in their own rings, and the
  path of her glance runs from them to the viewer, carrying a lotus. Her radiance fills the sky
  above, past the card.
- **Name → part:**
  - Mahāpadmāṭavīsaṃsthā → `lotuses`: the blooms, buds, raised leaves and stalks, and her bindu in
    the tallest bloom
  - Kadambavanavāsinī → `grove`: the six kadamba trees
  - Sudhāsāgaramadhyasthā → `sea`: the sea, its surf and swell, and the island with its pool
  - Kāmākṣī → `eyes`: the two fish and their rings
  - Kāmadāyinī → `gift`: the path of light, its glints, and the floating lotus
  - Intro, *her light* → `light`: her glow and radiance
- **Palette:** `--art-moon` and `--gold-soft` for the sea; `--art-turmeric` and `--gold` for the
  island; `--leaf` and `--art-musk` for the trees, with the kadamba's `--art-core`, `--art-saffron`
  and `--art-vermilion`; `--lotus` and `--art-crimson` for the lotuses. No additions.
- **Motion:** `m-shimmer` (her glow and radiance, the swell, the fish's rings, the glance),
  `m-twinkle` (the kadamba tips and the glints on the glance), `m-dart` (the fish), `m-breathe` (the
  bindu's glow), and `m-sway` (the floating lotus).
- **Promoted:** the fish (`FishDefs`, `Fish`, `FISH_BODY`), the kadamba (`kadambaLeaf`,
  `kadambaHead`, `KadambaLeaf`, `KadambaHead`) and the wave pattern (`WavePattern`) moved into
  `primitives.tsx`, each the second time it was needed. Shlokas 6 and 8 render byte-for-byte as
  before.
- **Notes:** This title wraps at every desktop width, its second line reaching x ≈ 98 at 1280px, and
  the card sits at y ≈ 225–437, so the island is drawn low, its back rim at y ≈ 502 with the farthest
  trees and the tallest bloom just clearing the card. The lotuses first stood shorter than the
  trees and read as a flower bed; enlarged, with the trees made smaller toward the back and a back
  rank of blooms, buds and raised leaves added, they read as a forest. The fish first lay one above
  the other, both level, and read as two fish passing; set on a circle laid flat on the water, each
  turned along it, they read as a pair circling. The trees' first `--art-carve` trunks vanished in
  light mode, as did their shadows; `--art-musk` holds in both. In the chant miniature the gold
  island with its ring of trees carries it.

### Shloka 24: The court assembles in praise, and the army moves out

- **Component:** `court-and-army.tsx` (defs prefix `sa24`)
- **Composition:** the hymn turns from description to story, and the artwork splits above and below
  her light, set just below the card. Above, in the crown and round the sides of the card, the
  assembled gods and seers hold up lamps in four arcs round her, broken into companies, gold flames
  for the gods in the two inner rows and white for the seers behind; her radiance reaches up to the
  first row. Below, the army of her powers issues from her light and moves out to the lower right:
  six ranks of spears under pennants, each nearer and wider than the last, leaning forward toward a
  bank of ash at the right edge, the ash of burnt Kāma that Bhaṇḍa was shaped from. The first
  composition in the series with a direction of travel.
- **Name → part:**
  - Devarṣigaṇasaṅghātastūyamānātmavaibhavā → `court`: the four arcs of lamps
  - Bhaṇḍāsuravadhodyuktaśaktisenāsamanvitā → `army`: the spears, their pennants, and the ash they
    are levelled at
  - Intro, *her glory* → `light`: her bindu, glow and radiance
- **Palette:** `--gold`, `--art-saffron`, `--art-core`, `--art-moon` and `--art-ivory` for the
  lamps; `--art-moon` and `--gold` for the spears, with `--art-vermilion`, `--art-saffron` and
  `--lotus` pennants; `--art-musk` and `--art-moon` for the ash. No additions.
- **Motion:** `m-flicker` (the lamp flames and the pennants), `m-shimmer` (her glow and radiance),
  `m-breathe` (the bindu's glow), `m-lick` (glints on a third of the spear points), and `m-ember`
  (the ash flecks).
- **Notes:** This title wraps at every desktop width and stays left of the artwork (its second line
  reaches only x ≈ −4), so the card sits at y ≈ 225–437 and the whole crown above it is free for the
  court. The spear blades were first rounded and read as candle flames beside the lamps; a long
  pointed blade with a midrib and lugs made them spears. The ash, in `--art-musk` alone, vanished by
  lamplight; a faint `--art-moon` cloud over each musk one holds it in both themes. The lower left
  of the plate is left empty on purpose, so the army has somewhere to have come from. In the chant
  miniature her glow, the arcs of lamps, and the pennants carry it, faintly by day.

### Shloka 25: Elephants that attend her, cavalry that encircles her

- **Component:** `elephants-and-horses.tsx` (defs prefix `sa25`)
- **Composition:** two matched names that part in their last words, the elephants attending her and
  the horses enclosing her, drawn as a retinue and a ring. Just below the card her light sits
  between two lead elephants facing in, their herds behind them, trunks raised to pour water over
  her from gold pots, as Śrī's elephants do (Sampatkarī's name is the maker of prosperity). Round
  everything, two circuits of galloping horses run clockwise, one inside the other, their tops in
  the crown above the card, their sides beside it, and their lower arcs in the ground zone, so that
  on the page they close round her and in the plate they are whole.
- **Name → part:**
  - Sampatkarīsamārūḍhasindhuravrajasevitā → `elephants`: the two lead elephants and their herds,
    the pots, and the water poured
  - Aśvārūḍhādhiṣṭhitāśvakoṭikoṭibhirāvṛtā → `cavalry`: the two circuits of horses
  - Intro, *her light* → `light`: her bindu, glow and radiance
- **Palette:** `--art-hair`, `--gold`, `--art-ivory` and `--art-vermilion` for the elephants;
  `--art-moon` and `--gold-soft` for the water; `--gold`, `--art-turmeric` and `--art-vermilion`
  for the horses. No additions.
- **Motion:** `m-sway` (each horse rocking in its gallop, three groups), `m-shimmer` (her glow,
  radiance and the pouring water), `m-twinkle` (the droplets), and `m-breathe` (the bindu's glow).
- **Notes:** This title wraps at every desktop width, its second line reaching x ≈ 13, and the card
  sits at y ≈ 225–437. The riders, Sampatkarī and Aśvārūḍhā, are left undrawn, as the goddess
  herself has been throughout; the corps they lead carry the names. The water first fell in solid
  white strands and read as a second pair of tusks; dashed, with droplets, it reads as water. The
  herd behind each lead first raised its trunks too, and they read as poles; hung, they let the
  leads' raised trunks carry the pour. In the chant miniature the two slate elephants and the gold
  ring carry it.

### Shloka 26: The chariot called King of Wheels

- **Component:** `king-of-wheels.tsx` (defs prefix `sa26`)
- **Composition:** the war begins with its vehicles. Her chariot, the Cakrarāja, is the Śrīcakra
  raised in tiers and seen from in front and a little above: the square plinth of gates, the three
  circles, the sixteen and the eight petals, each a carved drum, and on the top face the nine
  triangles with her bindu over the innermost. It stands on two great wheels, with wheel tracks
  behind it, and a flagstaff rises from behind her light to a vermilion pennant with a wheel on it,
  streaming the way the march is going. Weapons stand round every rim. Beside it, a little behind,
  Mantriṇī's Geyacakra rides on its own wheels: seven dark steps, her vīṇā on top, her sapphire light
  over it, and rings of song. The first vehicles in the series, and the first full Śrīcakra.
- **Name → part:**
  - Cakrarājarathārūḍhasarvāyudhapariṣkṛtā → `weapons`: the spears, tridents, arrows and goads
    round every tier
  - Geyacakrarathārūḍhamantriṇīparisevitā → `geyacakra`: the seven-step chariot, the vīṇā, her
    sapphire light, and the song
  - Intro, *her chariot* → `chariot`: the tiers, the wheels, the tracks, the staff and pennant
  - Intro, *her light* → `light`: the bindu, its glow and radiance
  - Detail → `triangles`: the nine triangles of the top tier, by the traditional 48-unit
    construction (Saundaryalaharī 11)
- **Palette:** `--gold` and `--art-turmeric` for the tiers, `--art-stone` faces, `--art-core` and
  `--art-saffron` petals, the triangles over her light, `--art-hair` for the Geyacakra and
  Mantriṇī. No additions.
- **Motion:** `m-shimmer` (her glow and radiance, the song), `m-breathe` (the bindu's glow), and
  `m-twinkle` (points of light on the weapons).
- **Notes:** This title stays on one line and left of the artwork, so the card is in its usual
  window and the crown zone is free for the pennant. Her glow and radiance are drawn last and masked
  off the two chariots, so her light can be one part over the tiers without washing them. The first
  tiers were shallow, and the square plinth read as a box; with taller drums and a lower view they
  step up, but smooth gold risers made it a tiered cake with a candle, and carved pilasters made it
  architecture. The sixteen and eight petals were diluted saffron and vermilion at first and went pink
  by day; they are now nearly solid. In the chant miniature the stepped gold mass on its wheels
  carries it.

### Shloka 27: The boar-wheel chariot and the wall of fire

- **Component:** `wall-of-fire.tsx` (defs prefix `sa27`)
- **Composition:** the verse pulls back to the shape of the field, so the camp is seen from outside
  and low. Jvālāmālinī's rampart of fire rings it, the far side a horizon of flame above the card and
  the near side across the foot, open at one place only, the south gap facing Śūnyaka. Through the
  gap Daṇḍanāthā's Kiricakra goes out first: five crimson steps on two wheels, her rod for a
  flagstaff, a gold boar on the banner, the road ahead of it clear, and the lion Caṇḍocchaṇḍa before
  it. Behind, inside the ring, her own chariot of the last verse, at half size, is moving, its
  tracks behind it.
- **Name → part:**
  - Kiricakrarathārūḍhadaṇḍanāthāpuraskṛtā → `kiricakra`: the five-step chariot, the rod, the boar
    banner, and the road
  - Jvālāmālinikākṣiptavahniprākāramadhyagā → `rampart`: the ring of flame, its band, the gap, and
    the firelight inside
  - Intro, *her own chariot* → `chariot`: the Cakrarāja, its tracks, and her light on it
  - Detail → `lion`: Caṇḍocchaṇḍa, before the chariot (the `Lion` of Shloka 1, small)
- **Palette:** `--art-vermilion`, `--art-saffron` and `--art-core` for the fire, `--art-crimson`
  and `--art-vermilion` for the Kiricakra. No additions.
- **Motion:** `m-breathe` (the flames, in three groups, and her bindu's glow).
- **Notes:** This title stays on one line, so the card is in its usual window and the far wall's
  flames show above it and at its sides. The Cakrarāja was promoted into `primitives.tsx` as
  `sriCakraRatha` with its pieces, which Shloka 26 now uses with byte-identical markup. The flames
  are one part drawn first, so the near wall is kept low enough not to reach her chariot's wheels.
  The firelight inside the ring was a heavy maroon by night at first and is now faint. In the chant
  miniature the ring of fire with the two chariots inside carries it.

### Shloka 28: Watching her own powers fight

- **Component:** `nityas-onslaught.tsx` (defs prefix `sa28`)
- **Composition:** both names are about her face while she watches, so she stays out of the fight.
  Her chariot of Shloka 26, at half size, stands at the left with her light on it, its glow and a fan
  of gaze-rays thrown forward over the field. Before her the spears of Shloka 24 press rank on rank
  into the ash of Bhaṇḍa's host at the right. Over them the fifteen Nityās come down out of the sky as
  the bright fortnight's moons, in an arc from the upper left over the crown and down the right side,
  swelling as they wax, and the fullest strikes the ash in a small burst. She is the sixteenth, the
  full moon, watching.
- **Name → part:**
  - Bhaṇḍasainyavadhodyuktaśaktivikramaharṣitā → `army`: the spears and the ash they press into
  - Nityāparākramāṭopanirīkṣaṇasamutsukā → `nityas`: the fifteen waxing moons, their trails, and
    the strike
  - Intro, *her chariot* → `chariot`: the Cakrarāja and her bindu
  - Intro, *her light leans toward it* → `gaze`: the forward glow and the fan of rays
  - Detail → `jvalamalini`: the fourteenth moon's ring of flames
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the moons), `m-shimmer` (the gaze), `m-breathe` (her bindu's glow and
  Jvālāmālinī's flames), `m-lick` (the strike), and the spears' and ash's own `m-flicker` and
  `m-ember`.
- **Notes:** This title stays on one line, so the card is in its usual window; the moons' arc runs
  over it in the crown and down the right margin beside it. The śakti spear and Bhaṇḍa's ash were
  promoted into `primitives.tsx` (`Spear`, `Ash`), and Shloka 24 renders byte-for-byte as before. The
  moons' trails were wide cones at first and read as ice-cream cones; they are now thin and faint. In
  the chant miniature the chariot and the spears carry it, and the moons are faint.

### Shloka 29: The nine-year-old and the thirty princes

- **Component:** `balas-arrows.tsx` (defs prefix `sa29`)
- **Composition:** two more names of a mother's pleasure, with the sovereign not lifting a hand. Her
  chariot stands at the left as in Shloka 28, her light on it. Out in front, joined to her by a
  dotted thread of breath (the purāṇa calls Bālā her breath walking about outside her), Bālā is a
  small light the colour of the rising sun, in a ring of gold scales, her mother's armour, with her
  three syllables under her. Thirty crescent-headed arrows fan out from her into thirty puffs of ash
  at the right, Bhaṇḍa's thirty sons, each with its coronet knocked off. Across the crown,
  Mantriṇī's sapphire light over her vīṇā throws a shaft into the bank of ash that is Viṣaṅga,
  which breaks and falls.
- **Name → part:**
  - Bhaṇḍaputravadhodyuktabālāvikramananditā → `bala`: Bālā, her armour, the thread of breath, the
    thirty arrows and the thirty sons
  - Mantriṇyambāviracitaviṣaṅgavadhatoṣitā → `mantrini`: Mantriṇī, her vīṇā, the shaft, and
    Viṣaṅga's ash breaking and falling
  - Intro, *her chariot* → `chariot`: the Cakrarāja, her light and its glow
  - Detail → `syllables`: aiṃ klīṃ sauḥ, under Bālā
- **Palette:** no additions.
- **Motion:** `m-breathe` (both lights), `m-shimmer` (her glow and Mantriṇī's), `m-lick` (the
  break), `m-sink` (Viṣaṅga's ash falling), `m-twinkle` (glints in the sons' ash).
- **Notes:** This title stays on one line but reaches x ≈ 292 at y ≈ 84–147, and Mantriṇī was first
  drawn at the upper left, under it; she now sits at the top right of the crown, with Viṣaṅga in the
  right margin beside the card. Bālā and the sons sit below the card. Mantriṇī was promoted into
  `primitives.tsx` (`Sapphire`, `Vina`), and Shloka 26 renders byte-for-byte as before. Plain puffs
  of ash didn't read as thirty princes; the tumbling coronets do. In the chant miniature the chariot
  and the fan of arrows carry it.

### Shloka 30: A glance between them, and a son

- **Component:** `glance-and-a-son.tsx` (defs prefix `sa30`)
- **Composition:** the verse breaks in two, and so does the plate. Across the crown, the last name of
  watching: Vārāhī, a crimson light over her crossed plough and pestle, draws the breath out of
  Viśukra, a bank of Bhaṇḍa's ash, in pale strands that curve back to her. Below the card, the war
  stops for a look: her light at the left and Kāmeśvara's crescent at the right, three hairlines
  each way between them, and where they meet, Mahāgaṇapati arises beneath, a dawn-red light ringed by
  the ten things his ten hands hold. Nobody is drawn.
- **Name → part:**
  - Viśukraprāṇaharaṇavārāhīvīryananditā → `varahi`: Vārāhī, her plough and pestle, Viśukra's ash,
    and his breath drawn out
  - Kāmeśvaramukhālokakalpitaśrīgaṇeśvarā → `ganesa`: his light, the glint where the look meets,
    and nine of the ten things he holds
  - Intro, *the look that passes between them* → `glance`: her light, his crescent, and the
    hairlines between them
  - Detail → `bow`: the sugarcane bow among his ten, his mother's own
- **Palette:** `--art-crimson` for Vārāhī. No additions.
- **Motion:** `m-shimmer` (the glows and the look), `m-breathe` (her bindu and his light),
  `m-twinkle` (the breath, two of his emblems), `m-lick` (the meeting), `m-flicker` (the discus).
- **Notes:** This title stays on one line but reaches x ≈ 176 at y ≈ 84–147, so Vārāhī sits to the
  right of it, at x ≈ 296, and Viśukra in the crown's right corner. The first version hung a wedge of light from the meeting point down to his light, and with the
  level look above it the two read as a necklace and pendant; the wedge is gone, and the ring opens
  at the top toward the look. A crescent on his light (his crown's) made a horned face and was
  dropped. His crescent vanished by day until it got a faint saffron tint behind it. In the chant
  miniature the two glows and the ring of emblems carry it.

### Shloka 31: The engine of obstruction, and the answering rain

- **Component:** `answering-rain.tsx` (defs prefix `sa31`)
- **Composition:** the first name ends the Gaṇeśa episode and the second is where she starts to
  fight. Below the card, Mahāgaṇapati (the ring of Shloka 30, at 0.62) has found Viśukra's slab
  inside the wall and split it with his tusk: five stone pieces fly apart, the eight-angled figure
  and its tridents broken with them, and the powder blows off to the right on the wind. Above the
  card, from her light at the left, her answering missiles go up in a rain, and each meets one of
  Bhaṇḍa's dark weapons coming in from the upper right; the two go out together in a burst.
- **Name → part:**
  - Mahāgaṇeśanirbhinnavighnayantrapraharṣitā → `yantra`: Gaṇeśa, his tusk, the broken slab, and
    the dust
  - Bhaṇḍāsurendranirmuktaśastrapratyastravarṣiṇī → `rain`: her missiles, his, and the bursts where
    they meet
  - Intro, *her light* → `light`: her bindu and its glow
  - Detail → `figure`: the eight-angled figure and eight tridents on the pieces
- **Palette:** `--art-crimson` for the figure on the slab. No additions.
- **Motion:** `m-twinkle` and `m-lick` (the bursts), `m-ember` (the dust), and Gaṇeśa's own
  `m-breathe` and `m-flicker`.
- **Notes:** This title stays on one line at 1280–1440px and runs across the crown, reaching
  x ≈ 474 at y ≈ 84–147, so the meetings sit in the band under it and down the right margin; at
  first they were spread through the crown and the bursts sat on the words. Bhaṇḍa's weapons, musk
  and hair, vanished by lamplight until each got a fine moon-coloured line. Gaṇeśa was promoted into
  `primitives.tsx` (`Mahaganapati`), and Shloka 30 renders byte-for-byte as before. In the chant
  miniature her glow, the ring and the broken slab carry it.

### Shloka 32: Ten descents out of her fingernails

- **Component:** `ten-descents.tsx` (defs prefix `sa32`)
- **Composition:** the exchange of missiles at its height, then the field cleared. Her two arms rise
  from her light as beams (`armBeam`), empty, to different heights, and the hands are only their
  nails: five small moons fanned at the end of each, as her toenails were in Shloka 19, with light
  running off them. Round the card the forms of the purāṇa's table issue from it, each a small emblem
  in its own glow, in order from the fish at the left, up over the crown, to Kalki at the right.
  Below, the Pāśupata flies low across the plate to the right, the host behind it all fire and
  embers, a little of its ash ahead.
- **Name → part:**
  - Karāṅgulinakhotpannanārāyaṇadaśākṛtiḥ → `forms`: the fish, tortoise, boar, dwarf, axe, bow,
    fourfold Vāsudeva and Kalki, and their glows
  - Mahāpāśupatāstrāgninirdagdhāsurasainikā → `pasupata`: the trident-headed missile, the burnt-out
    host, the embers and the last ash
  - Intro, *her light* → `light`: her bindu, its glow, and the two arm-beams
  - Intro, *their nails* → `nails`: the ten nail moons and their light
  - Detail → `narasimha`: the man-lion with his claws showing
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the nails and their light), `m-shimmer` (the glows), `m-breathe` (the
  fire), `m-ember` (the sparks), `m-flicker` and `m-lick` (the missile's point).
- **Notes:** This title stays on one line, reaching x ≈ 180 at y ≈ 84–147, so the forms start right
  of it and below it. The first version had both hands at one height above a central band of fire,
  and the two clusters of nails and the fire made a face; the hands now reach to different heights
  and the fire runs off to the lower right. The tortoise, horse and boar were promoted into
  `primitives.tsx`, and Shlokas 18, 25 and 27 render byte-for-byte as before. In the chant miniature
  the glow, the arms and the band of fire carry it.

### Shloka 33: The empty city burned to nothing

- **Component:** `empty-city.tsx` (defs prefix `sa33`)
- **Composition:** the war ends and the praise begins. Her light at the left is all radiance now,
  as it was before the war (Shloka 1's 108 hairlines). From it the weapon named for her consort, a
  long bowed shaft of pale light with his crescent for a head, has come to rest at the heart of
  Śūnyaka at the lower right, and of the city with Bhaṇḍa in it only an outline in ash is left round
  nothing, the last flames going out at its foot. Above, in the crown, the high gods praise her in
  order of precedence, as their emblems, and the gods behind them hold up their lamps in two arcs
  round her light, as the court did in Shloka 24. In the ash, one green shoot.
- **Name → part:**
  - Kāmeśvarāstranirdagdhasabhaṇḍāsuraśūnyakā → `city`: the weapon, the burnt outline, its dying
    flames and smoke
  - Brahmopendramahendrādidevasaṃstutavaibhavā → `praise`: the lotus, discus and conch,
    thunderbolt, their glows, and the lamps
  - Intro, *her light* → `light`: her bindu, its glow and the radiance
  - Detail → `shoot`: the green shoot in the ash, for Kāma, whose ash Bhaṇḍa was made from and who
    is brought back in the next verse
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the radiance and the gods' glows), `m-breathe` (her bindu, the strike),
  `m-lick` (the strike's rays), `m-flicker` (the lamps, the dying flames), `m-ember` (the smoke).
- **Notes:** This title stays on one line, reaching x ≈ 160 at y ≈ 84–147, so the gods sit right of
  it. The city is left as an outline because the name says what was burnt was already empty; ruins
  or rubble would have said something was left. The lamp was promoted into `primitives.tsx`
  (`Lamp`), and Shloka 24 renders byte-for-byte as before. In the chant miniature her radiance, the
  shaft and the strike carry it.

### Shloka 34: The herb that brought desire back

- **Component:** `sanjivani.tsx` (defs prefix `sa34`)
- **Composition:** the war's last act and the mantra's first, one above the other. Below the card,
  the ash of Kāma (`Ash`), and out of it the herb that brings the dead back, alight; beside it Kāma
  is back as a rosy light with his bow and arrows of flowers, and he and Rati look at each other.
  In the crown her face is a lotus, and over it rises the first summit of her mantra, the cluster
  of speech: four lights up the flanks of a dotted peak and ह्रीं at the top. Her sidelong look falls
  from the lotus onto the herb.
- **Name → part:**
  - Haranetrāgnisandagdhakāmasañjīvanauṣadhiḥ → `herb`: the ash, the herb and its glow
  - Śrīmadvāgbhavakūṭaikasvarūpamukhapaṅkajā → `face`: the lotus, its glow and the speech cluster
  - Intro, *sidelong look* → `glance`: the three hairlines from the lotus to the herb
  - Detail → `kama`: Kāma's light, bow and arrows, Rati, and the look between them
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the syllables, the herb's blossoms, the arrows' flowers), `m-breathe`
  (the herb's glow, the top syllable), `m-shimmer` (the glows and looks), `m-lick` (the glints),
  `m-ember` (the ash).
- **Notes:** This title stays on one line, reaching x ≈ 170 at y ≈ 84–147, so the lotus sits right
  of it at x ≈ 372. On a smooth arch the syllables nearest the top hid behind its disc; the peak's
  straight flanks space them evenly and say kūṭa. The five arrows fanned wide read as a crest on
  the bow; a narrow fan behind his light reads as a sheaf. Shlokas 35 and 36 carry the clusters on
  down her body. In the chant miniature the lotus, the herb's glow and the two lights carry it.

### Shloka 35: A body divided into three mantras

- **Component:** `mantra-body.tsx` (defs prefix `sa35`)
- **Composition:** the same body a second time, spelled instead of painted. Her light stands as a
  tall column down the middle of the plate, crossed by two seams, at the throat and the waist, as
  the seams of a garment of syllables. Above the throat her face from Shloka 34, smaller: the lotus
  and the speech cluster. Between the seams the middle cluster, the sovereignty of desire: six
  syllables, five lights up a wide low peak and ह्रीं at its top, in rosy light. Below the waist the
  śakti cluster, four syllables in vermilion light, standing on a lotus.
- **Name → part:**
  - Kaṇṭhādhaḥkaṭiparyantamadhyakūṭasvarūpiṇī → `middle`: the middle cluster and its rosy region
  - Śaktikūṭaikatāpannakaṭyadhobhāgadhāriṇī → `sakti`: the śakti cluster, its region and the
    lotus under it
  - Intro, *her face* → `face`: the column of her light, the upper lotus and the speech cluster
  - Detail → `seams`: the two seams
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the column and the regions), and the summit's own `m-twinkle` and
  `m-breathe`.
- **Notes:** This title stays on one line, reaching x ≈ 190 at y ≈ 84–147, clear of the face at
  the axis. The trunk between the seams is mostly behind the card, so the middle cluster is a wide,
  low peak whose top sits just under the card's edge (y ≈ 406), and the waist and the śakti cluster
  are in the band above the fade. At its first heights the peaks stood close and tall, like three
  trees. The summit was promoted into `primitives.tsx` (`summit`, `Summit`), and Shloka 34 renders
  byte-for-byte as before. In the chant miniature the column and the three clusters carry it.

### Shloka 36: Made of the root mantra, sworn to the kula

- **Component:** `root-mantra.tsx` (defs prefix `sa36`)
- **Composition:** the last two verses' argument stated flatly, and then the kula. In the crown at
  the right her light is ringed by the whole root mantra, fifteen syllables with the three ह्रीं in
  the ring. Below the card the three clusters stand together on one ground line as a range of three
  peaks, her frame. From the ring a thin fall of nectar comes down the right margin into a brimming
  cup. Under the range lies the kula's compact, a palm-leaf book bound and sealed.
- **Name → part:**
  - Mūlamantrātmikā → `mantra`: the ring of fifteen syllables
  - Mūlakūṭatrayakalevarā → `range`: the three peaks, their ground line and glow
  - Kulāmṛtaikarasikā → `nectar`: the fall, the drops and the cup
  - Kulasaṅketapālinī → `compact`: the bound book and its cord
  - Intro, *her light* → `light`: her bindu and its glow
  - Detail → `seal`: the seal and its triangle
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the syllables, the drops), `m-breathe` (her bindu, the ह्रीं),
  `m-shimmer` (the glows), and the summits' own.
- **Notes:** This title stays on one line at 1280–1440px and reaches x ≈ 370 at y ≈ 84–147, so the
  ring sits at the right, its left edge at x ≈ 416; at 58 units' radius beside the title the gap
  was too small for 1100px. The range's glow first had a hard edge where its ellipse cut the
  gradient. In the chant miniature the ring, the range and the cup carry it.

### Shloka 37: Kula, and what lies outside it

- **Component:** `kula-and-samaya.tsx` (defs prefix `sa37`)
- **Composition:** both of the tradition's ways, side by side below the card, and between them in
  the crown a name that belongs to neither. At the left the kula: a household doorway hung with
  mango leaves, a kolam on the threshold, and inside it her light ringed by the assembly of powers,
  the outward rite's lamp and cup before the door. At the right the samaya: a slender column
  through six small lotuses, her light in the heart. Above, at the middle, a pale still light joined
  to nothing.
- **Name → part:**
  - Kulāṅganā → `household`: the doorway, its leaves and threshold, and the glow inside it
  - Kulāntasthā → `within`: her light inside the doorway
  - Kaulinī → `kaula`: the lamp and the cup before the door
  - Kulayoginī → `yogini`: the eight powers and the hairlines joining them
  - Akulā → `akula`: the still light in the crown
  - Samayāntasthā → `samaya`: her light in the heart, and its glow
  - Samayācāratatparā → `practice`: the column and the six lotuses
  - Intro, *once in the kula*, *once in the samaya* → `within`, `samaya`
  - Detail → `threshold`: the kolam
- **Palette:** no additions.
- **Motion:** `m-sway` (the mango leaves), `m-twinkle` (the powers), `m-breathe` (her two lights),
  `m-shimmer` (the glows and the joins), and the lamp's `m-flicker`. The still light has none.
- **Notes:** This title stays on one line, reaching x ≈ 150 at y ≈ 84–147, so the still light sits
  at the middle of the crown. Lines from it to either side would have put it inside something, so
  there are none. The doorway first stood with its top behind the card's lower edge. The cup was
  promoted into `primitives.tsx` (`NectarCup`), and Shloka 36 renders byte-for-byte as before. In
  the chant miniature the doorway, the column and the two lights carry it.

### Shloka 38: The root centre, the navel, and the first two knots

- **Component:** `first-two-knots.tsx` (defs prefix `sa38`)
- **Composition:** the hymn turns inward. A channel of light runs up the middle of the plate
  through the six centres. At the foot the root centre, with her light seated in its square of
  earth; above it the knot of Brahmā, split; then the navel wheel with her light coming up inside
  it like the sun over the horizon (`sunRays`, half-risen); above that the knot of Viṣṇu, split.
  The channel is lit that far. Above, behind the card, the centres the verse passes over are faint
  and unlit, and so is the thousand-petalled lotus under the title.
- **Name → part:**
  - Mūlādhāraikanilayā → `root`: the root centre, its glow, the square of earth and her light in it
  - Brahmagranthivibhedinī → `brahma`: the first knot, split
  - Maṇipūrāntaruditā → `manipura`: the navel wheel, the triangle and her light rising in it
  - Viṣṇugranthivibhedinī → `visnu`: the second knot, split
  - Intro, *a channel of light* → `channel`: the channel, lit and unlit, and its glow
  - Detail → `silent`: the svādhiṣṭhāna, heart, throat and brow centres, and the unlit
    thousand-petalled lotus
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the channel's glow, the sun's rays), `m-breathe` (her two lights, the
  cuts), `m-lick` (the glints).
- **Notes:** This title stays on one line at 1280px and reaches x ≈ 472 at y ≈ 84–147, so the
  thousand-petalled lotus sits under it (y ≈ 126–198), and nothing else is in the crown. At their
  first size the centres were too small to read and the channel's glow was a capsule with hard
  ends. In the chant miniature the lit channel and the two lit centres carry it.

### Shloka 39: The last knot, the summit, and the rain that comes back down

- **Component:** `summit-and-rain.tsx` (defs prefix `sa39`)
- **Composition:** Shloka 38's climb finished. The channel is lit from the root to the crown, and
  the centres below glow quietly with the two split knots between them. At the brow the wheel of
  command, two white petals, with her light inside it; just above, the knot of Rudra, split. At the
  top the thousand-petalled lotus is lit and her light is mounted on it, and from its rim the
  nectar comes back down over the whole body in two falls of drops, with a fine rain under it.
- **Name → part:**
  - Ājñācakrāntarālasthā → `ajna`: the brow wheel, its glow and her light inside it
  - Rudragranthivibhedinī → `rudra`: the third knot, split
  - Sahasrārāmbujārūḍhā → `summit`: the thousand-petalled lotus, its glow and her light on it
  - Sudhāsārābhivarṣiṇī → `rain`: the two falls and the fine rain
  - Intro, *the channel* → `channel`: the channel, lit, and its glow
  - Detail → `passed`: the five lower centres and the knots of Brahmā and Viṣṇu
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the drops), `m-breathe` (her lights, the cut), `m-shimmer` (the
  glows), `m-lick` (the glint).
- **Notes:** This title wraps at every desktop width, so the card comes down to y ≈ 225 and the
  crown is clear for the lotus. The brow wheel sits right at the card's upper edge. In the chant
  miniature the lit lotus, the column and the oval of falling drops carry it.

### Shloka 40: Lightning above the six wheels, and the name at last

- **Component:** `lightning-vine.tsx` (defs prefix `sa40`)
- **Composition:** what has been climbing for two verses, named. Up the middle runs a streak of
  lightning drawn out like a vine, through the six wheels (`CakraLotus`, all lit), its tendrils
  curling and gripping off its corners. At its foot it is still coiled three and a half times round
  the root centre. Above the six wheels it ends in her light, with no lotus under it. At the right a
  broken lotus stalk with its fibres drawn out.
- **Name → part:**
  - Taḍillatāsamaruciḥ → `lightning`: the bolt
  - Ṣaṭcakroparisaṃsthitā → `above`: her light above the wheels
  - Mahāsaktiḥ → `clinging`: the tendrils
  - Kuṇḍalinī → `kundalini`: the coil and its glow
  - Bisatantutanīyasī → `fibre`: the broken stalk and its fibres
  - Intro, *the coiled one* → `kundalini`
  - Detail → `wheels`: the six wheels and the column's glow
- **Palette:** no additions.
- **Motion:** `m-flicker` (the bolt's core), `m-shimmer` (its glow), `m-sway` (the tendrils),
  `m-breathe` (the coil's glow, her light), `m-lick` (the glint).
- **Notes:** This title wraps at every desktop width, so the card comes down and her light sits in
  the clear crown. The verse counts six wheels and puts her past them, so the top has no
  thousand-petalled lotus this time. The stalk first reached x ≈ 537 and was cut off at 1100px. In
  the chant miniature the bolt, its light and the coil carry it.

### Shloka 41: The axe laid to the forest of becoming

- **Component:** `forest-of-becoming.tsx` (defs prefix `sa41`)
- **Composition:** one syllable turned three ways, then the good twice. In the crown, right of the
  title, her light beside Bhava's crescent. Below the card the forest of becoming, two rows of
  trees, with a clearing cut through the middle by a small axe (Paraśurāma's, from Shloka 32), its
  felled trunks and stumps, chips flying. Through the clearing one straight line of light rises
  from a lamp that does not flicker to her. In front, at the left, a full pot; at the right, a tray
  of good fortune.
- **Name → part:**
  - Bhavānī → `bhava`: Bhava's crescent and its glow
  - Bhāvanāgamyā → `contemplation`: the still lamp and its line of light
  - Bhavāraṇyakuṭhārikā → `axe`: the forest, the clearing, the stumps, the felled trunks and the axe
  - Bhadrapriyā → `auspicious`: the full pot
  - Bhadramūrtiḥ → `form`: her light
  - Bhaktasaubhāgyadāyinī → `fortune`: the tray, its glow and the motes
  - Intro, *her light* → `form`
  - Detail → `chips`: the chips flying from the stump
- **Palette:** no additions.
- **Motion:** `m-sway` (the trees), `m-twinkle` (the chips, the motes), `m-breathe` (her light,
  the clearing), `m-shimmer` (the glows). The lamp is still on purpose.
- **Notes:** This title stays on one line, reaching x ≈ 238 at y ≈ 84–147, so her light and Bhava's
  crescent sit at x ≈ 392 and 478. The axe first lay at a slant across the clearing with its blade
  up, where the blade read as a white bird; it now stands in the stump, blade down. The axe was
  promoted into `primitives.tsx` (`Axe`), and Shloka 32 renders byte-for-byte as before. In the
  chant miniature the forest, the clearing and her light carry it.

### Shloka 42: Devotion has power over her

- **Component:** `devotion-governs.tsx` (defs prefix `sa42`)
- **Composition:** a ladder of three, then the husband's names. In the crown, right of the title,
  her light with Śambhu's crescent on one side and Śarva's bow on the other. Below the card a
  devotee's offering lies on a leaf (the leaf, flower, fruit and water of Gītā 9.26), and from its
  flower a garland of blossoms climbs all the way up to her light and closes in a ring round it.
  Beside it a palm-leaf book and a fire altar send roads up that stop short. A half-dome of her
  light covers the whole lower scene, and the shadows of fear lie outside it, going under. At the
  right, inside the dome, Śāradā's white light over her vīṇā.
- **Name → part:**
  - Bhaktipriyā → `offering`: the leaf plate and what is on it
  - Bhaktigamyā → `road`: the garland, as far as her light
  - Bhaktivaśyā → `bound`: the ring of blossoms round her light
  - Bhayāpahā → `fear`: the shadows outside the dome
  - Śāmbhavī → `sambhu`: the crescent and its glow
  - Śāradārādhyā → `sarada`: Śāradā's light and vīṇā
  - Śarvāṇī → `sarva`: the bow and arrow
  - Śarmadāyinī → `shelter`: the dome, its glow and the ground line
  - Intro, *her light* → `light`
  - Detail → `short`: the book, the altar and their roads
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the blossoms), `m-breathe` (her light), `m-flicker` (the altar flame),
  `m-shimmer` (the glows, the dome), `m-sink` (the fears).
- **Notes:** This title stays on one line, reaching only x ≈ 58. The shelter was first
  a straight scalloped awning with tassels across the scene, but with the garland running through it
  the whole picture read as a hanging lamp or a balance; it is now a dome of light. `Vina` is
  reused from `primitives.tsx` for Śāradā. In the chant miniature the garland and the dome carry it.

### Shloka 43: The autumn moon, and then the turn to nothing

- **Component:** `autumn-moon-turn.tsx` (defs prefix `sa43`)
- **Composition:** six names of praise, then two that take it back. The crown sits high, above the
  title: the full autumn moon with its deer and no halo, Śaṅkara's trident with his slender-waisted
  drum on the left, Śrī's lotus with gold falling from it on the right, and the last rain clouds
  going off at the edges. Below the card a still pool with the moon lying whole in it, a lotus leaf
  on the pool with water standing on it in beads, a plumb line hanging straight in the middle, and
  at the right her light over an empty dotted seat, with nothing under it.
- **Name → part:**
  - Śāṅkarī → `sankara`: the trident
  - Śrīkarī → `sri`: the lotus, its glow and the falling gold
  - Sādhvī → `true`: the plumb line
  - Śaraccandranibhānanā → `face`: the moon, its glow, its rings and the deer
  - Śātodarī → `waist`: the drum and its cords
  - Śāntimatī → `peace`: the pool and the moon in it
  - Nirādhārā → `unsupported`: her light and the empty seat
  - Nirañjanā → `unstained`: the lotus leaf and its beads
  - Intro, *the moon* → `face`; *at the lower right* → `unsupported`
  - Detail → `clouds`: the last clouds of the rains
- **Palette:** no additions.
- **Motion:** `m-sway` (the clouds), `m-shimmer` (the moonlight, the glows, the reflection),
  `m-twinkle` (the falling gold, the beads), `m-breathe` (her light). The plumb line is still.
- **Notes:** This title stays on one line at 1280–1440px and reaches x ≈ 480 at y ≈ 84–147, so the
  whole crown sits in y ≈ 4–90 above it. Nirañjanā was first pigment flung at her light from both
  sides and stopping at its edge; as thin strokes it read as rays, and as brush strokes as wings.
  The lotus leaf is the Gītā's own image (5.10) for the same thing, and it reads at once. The drum
  first lay on its side and read as a bow tie. In the chant miniature the moon and her light carry it.

### Shloka 44: Ten things taken away

- **Component:** `ten-taken-away.tsx` (defs prefix `sa44`)
- **Composition:** ten names, eight of them removals. In the crown the moon, whole, with its deer,
  and Rāhu's shadow gone past it over the top and going off. Below the card her light as a glow
  with no outline, and one unbroken ring round it. At the left, the things that cannot touch her
  or move her: a lamp in a windless niche, a clear crystal, a lotus leaf with the water running off
  it. At the right a rope of three strands coming undone short of her, a fire burnt down to embers,
  and Kāma's flower arrow lying where it fell.
- **Name → part:**
  - Nirlepā → `untainted`: the lotus leaf and the water running off it
  - Nirmalā → `stainless`: the crystal and its glow
  - Nityā → `eternal`: the ring and its echo
  - Nirākārā → `formless`: her light
  - Nirākulā → `unperturbed`: the lamp, the niche and its glow
  - Nirguṇā → `strands`: the rope of three strands
  - Niṣkalā → `partless`: the moon, its glow and the deer
  - Śāntā → `tranquil`: the ash, the embers, the glow and the smoke
  - Niṣkāmā → `desireless`: the fallen arrow and its shadow
  - Nirupaplavā → `calamity`: Rāhu's shadow and its way past
  - Intro, *her light* → `formless`
  - Detail → `strands`: what a guṇa is, and the three colours
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light, the embers), `m-shimmer` (the ring, the crystal's glow),
  `m-twinkle` (the beads, the run-off, the glint), `m-sink` (Rāhu). The lamp is still on purpose.
- **Notes:** This title stays left of the artwork. The still lamp of Shloka 41 and the lotus leaf of
  Shloka 43 were promoted into `primitives.tsx` (`StillLamp`, `LotusLeaf`), and both shlokas render
  byte-for-byte as before. Niṣkalā is drawn as the whole moon because kalā is a digit of the moon,
  and it lets nirupaplavā be Rāhu, the eclipse that never reaches it. The arrow first lay in the air
  and read as flying; it now has a shadow on the ground. In the chant miniature her light and the
  moon carry it.

### Shloka 45: Forever pure, forever awake, forever free

- **Component:** `pot-and-space.tsx` (defs prefix `sa45`)
- **Composition:** eight names saying that nothing about her ever happened. In the crown, right of
  the title, her light as the pole star with the other stars wheeling round it on their trails.
  Below the card the Vedāntins' pot and space: a row of earthen pots of different shapes on a
  ground line with one band of her light running through and between them, the shards of a broken
  pot where the light is just as it was, the lump of clay at the left, a blank palm leaf and stylus
  at the right, and smoke drifting in that thins away before the middle.
- **Name → part:**
  - Nityamuktā → `free`: the shards of the broken pot
  - Nirvikārā → `clay`: the lump of clay and its shadow
  - Niṣprapañcā → `pots`: the three whole pots
  - Nirāśrayā → `held`: the star trails and their stars
  - Nityaśuddhā → `pure`: the smoke
  - Nityabuddhā → `awake`: the pole star and its glow
  - Niravadyā → `blameless`: the blank palm leaf and the stylus
  - Nirantarā → `space`: the band of light and the ground line
  - Intro, *the pole star* → `awake`; *the one space* → `space`
  - Detail → `free`: the pot and space, and why nothing was freed
- **Palette:** no additions.
- **Motion:** `m-breathe` (the pole star), `m-twinkle` (the wheeling stars), `m-shimmer` (the band of
  light), `m-sway` (the smoke).
- **Notes:** This title stays on one line and reaches x ≈ 311 at y ≈ 84–147, so the pole star sits at
  x ≈ 384, high, with its trails clear of the title. The pots are drawn as outlines on purpose, so
  the one light can be seen inside and outside them. In the chant miniature the band of light and the pots carry it.

### Shloka 46: Without a cause, without a master

- **Component:** `other-end-of-the-rope.tsx` (defs prefix `sa46`)
- **Composition:** four removals, then two pairs that turn outward: what she is free of, she takes
  away from others. Below the card, left of centre, her light seated on Shloka 22's couch of the
  five Brahmās, brought up to twice its size on a stone dais, with Īśvara as its right front leg.
  On the plank beside her a clear crystal with a red hibiscus held up to it. In front of the dais a
  line of lamps runs out toward us down the lower left, each lit from the one before, the first from
  her. At the right an elephant faces her and holds the far end of her noose in its raised trunk:
  red at its end, the dye wearing off along the cord, undyed where it reaches her. The rut on its
  temple has dried, and the bees that drank it are leaving up the right margin. In the crown, right
  of the title, the full moon with no mark on it, its deer leaping clear.
- **Name → part:**
  - Niṣkāraṇā → `lamps`: the lamps and the threads of flame between them
  - Niṣkalaṅkā → `moon`: the moon, its rings and glow
  - Nirupādhi → `crystal`: the crystal, the hibiscus and its stalk
  - Nirīśvarā → `couch`: the dais, the couch and her seat's glow
  - Nīrāgā → `undyed`: her end of the cord and its tassel
  - Rāgamathanī → `noose`: the red loop, the red half of the cord and its flecks
  - Nirmadā → `bees`: the bees and their path
  - Madanāśinī → `elephant`: the elephant and its dried rut
  - Intro, *her light* → `light`
  - Detail → `deer`: the moon's deer leapt clear, and why kalaṅka is not Shloka 44's kalā
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her radiance, the moon's rings), `m-breathe` (her seat's glow),
  `m-twinkle` (the threads of flame, the bees, the crystal's glint), `m-flicker` (the lamps),
  `m-ember` (the flecks of red), `m-lick` (the glint at the tassel).
- **Notes:** This title stays on one line and reaches x ≈ 198 (250 at 1100px) at y ≈ 74–141, so the
  moon sits well to its right. The hibiscus, the crystal, the couch of the five Brahmās and the
  elephant were promoted into `primitives.tsx`, and the Dhyāna and Shlokas 22, 25 and 44 render
  byte-for-byte as before. The first version kept everything in a strip under the card at Shloka
  22's size and read as sparse; the couch went up to twice its size on a dais. The elephant's trunk
  first crowded Īśvara's leg and its head hid the end of the dais; it moved right and the couch
  left. The first lamp stood behind the dais; the lamps are now drawn in front of it. In the chant
  miniature the glowing couch, the cord and the elephant's red caparison carry it.

### Shloka 47: Without I, without mine

- **Component:** `two-birds.tsx` (defs prefix `sa47`)
- **Composition:** two solitary names and three pairs, each said once of her and once of what she
  does to others, drawn as the Muṇḍaka Upaniṣad's two birds on one tree (3.1.1–3). A great pippala
  fills the plate, rising from the kerb of a temple tank at the lower left, its trunk passing behind
  the card and its crown spreading across the crown zone. On a bough just below the card, where the
  second bird should sit, is only her light, with still leaves round it and ripe figs along it.
  Mist lies over the lower tree. In it, on a low bough at the right, the other bird has turned its
  head up to her through a lane of clear air, the fig falling from its beak toward the water, dark
  motes shaken from its wings. In the tank a white lotus stands clear of the water.
- **Name → part:**
  - Niścintā → `still-leaves`: the twigs and leaves on her bough, which do not tremble
  - Nirahaṅkārā → `light`: her light, its glow, radiance and ring
  - Nirmohā → `mist`: the mist and its wisps
  - Mohanāśinī → `bird`: the bird and the lane of clear air
  - Nirmamā → `figs`: the figs along her bough
  - Mamatāhantrī → `dropped`: the falling fig, its path and the ripple below
  - Niṣpāpā → `lotus`: the white lotus, its stalk and the lotus leaf
  - Pāpanāśinī → `shaken`: the dark motes
  - Intro, *tree* → `tree`; *temple tank* → `tank`
  - Detail → `seedling`: the pippala seedling in the kerb, sown as birds sow them
- **Palette:** no additions.
- **Motion:** `m-sway` (every leaf but hers, three groups), `m-shimmer` (her glow and radiance, the
  mist, the lane), `m-breathe` (her light), `m-twinkle` (the ripple, the beads on the lotus leaf),
  `m-sink` (the motes).
- **Notes:** This title stays on one line and reaches x ≈ 24 (76 at 1100px) at y ≈ 74–141, so the
  crown spreads freely from x ≈ 190. The Muṇḍaka passage names grief, delusion, the Lord and the
  shaking off of good and evil, so one image carries all three pairs. The leaves were first strung
  two to a point along the boughs and read as spiky green caterpillars; hung in sprays at twig ends
  over soft canopy masses they read as a tree. The bark was musk and vanished by lamplight. The motes
  were musk too and couldn't be seen; they are slate now. In the chant miniature the tree's
  silhouette, her glow and the bird carry it.

### Shloka 48: Anger, greed, doubt, and becoming

- **Component:** `wheel-stopped.tsx` (defs prefix `sa48`)
- **Composition:** four pairs, each a thing she is free of and then the same thing she destroys,
  drawn symmetrical about her light, after the Muṇḍaka Upaniṣad (2.2.8: the knot of the heart split,
  doubts cut, works used up). Below the card, centred, the wheel of becoming with her light at the
  hub, its rim in three bands. From just below her hangs the sword of knowledge, point down; on its
  blade the knot of the heart lies cut, its halves falling to either side, and where it passed the
  rim is split at the foot and two spokes have dropped to the floor. At the left Shloka 2's goad
  leans point down into a steaming basin. At the right a full pot brims over, and the water from it
  has burst a strongbox and carries its coins away along the floor.
- **Name → part:**
  - Niṣkrodhā → `goad`: the goad
  - Krodhaśamanī → `steam`: the basin, its water, the heat leaving the point and the steam
  - Nirlobhā → `pot`: the pot, its overflow and the puddle
  - Lobhanāśinī → `box`: the strongbox, the coins and the water running along the floor
  - Niḥsaṃśayā → `sword`: the sword and its glint
  - Saṃśayaghnī → `knot`: the two halves of the cut knot
  - Nirbhavā → `light`: her light at the hub, its glow and radiance
  - Bhavanāśinī → `wheel`: the hub, spokes, rim lines, the split, the fallen spokes and the floor
  - Intro, *sword* → `sword`; *wheel* → `wheel`
  - Detail → `strands`: the rim's three bands are the three guṇas, Shloka 44's three strands, and
    the Śvetāśvatara's wheel with its threefold tire (1.4)
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow and radiance, the overflow, the run of water), `m-breathe` (her
  light, the ember glow under the basin), `m-sway` (the knot's halves, the steam), `m-twinkle` (the
  drops and coins), `m-lick` (the glint on the blade).
- **Notes:** This title stays on one line and reaches x ≈ 198 (250 at 1100px) at y ≈ 74–141. The
  crown is left almost empty and the upper wheel lies behind the card: the wheel is centred on her
  and the verse has nothing that belongs above. `polar` was first misread as clockwise, and the
  rim drew as a rainbow arching over the card; the split belongs at 270°, the foot. The knot was
  gold and read as scrollwork; it is an ivory cord now. The goad stood straight down and read as a
  candlestick; it leans. The overflow was three thin streams that read as wires, and the run along
  the floor a stroked line that read as a stick; both are filled shapes now. The box first stood in
  front of the pot and was moved left. In the chant miniature the wheel and the sword carry it.

## Open questions

- Name 559, *tāmbūlapūritamukhī* ("her mouth full of betel"), returns to the betel, which Shloka 10
  now draws only as fragrance. The betel leaf, roll, clove, and camphor of Shloka 10's first version
  (in git history) are a starting point, kept away from anything that reads as a mouth.
