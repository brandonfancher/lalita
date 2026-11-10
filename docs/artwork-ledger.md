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
| Lion (siṃha) | `Lion`: seated, gold, flame-tongue mane; paired lions face inward toward the centre. Shloka 50 seats one alone and small at a gate, facing it | `primitives.tsx` | Shloka 1 |
| Rising sparks | `Embers`, filled with `--art-ember` | `primitives.tsx` | Shloka 1 |
| The syllable śrī | श्री in Tiro Devanagari, `--sindura` | Inline | Shloka 1 |
| Rays of radiance | 108 gold hairlines from the source, alternating long and short, fading outward | `radiance` in `primitives.tsx` (promoted at Shloka 12, used by Shlokas 8, 9, 12 and 13); Shloka 1's, built differently, stays inline | Shloka 1 |
| Royal parasol (chattra) | Vermilion dome with gold ribs, scalloped fringe, beaded tassels, bud finial, 124 wide at full size; its staff is drawn separately | `Parasol` in `primitives.tsx` (promoted at Shloka 58, used by Shloka 1) | Shloka 1 |
| Lotus pedestal | `lotusPetals`: a row of pointed, upturned gold petals. A lotus seat stacks a taller back row (`--art-saffron`), a front row (`--art-core`, so it reads as gold by day, not khaki), a beaded band, and a row turned down (negative `height`) | `primitives.tsx` | Shloka 1 |
| Round arch | `archPath` and `alongArch` | `primitives.tsx` | Shloka 1 |
| Her noose (pāśa) | `Noose`: a loop of twisted `--art-vermilion` cord (red because *rāga* is colouring), gold binding where it closes, four gold beads, a tail ending in a gold tassel. Held at the origin, loop up | `primitives.tsx` | Shloka 2 |
| Her goad (aṅkuśa) | `Goad`: a banded gold shaft with a bud-shaped butt, a lotus collar, a leaf-shaped spear point, and a hook curving out to the right. Held at the origin, pointing up. Shloka 48 turns it point down, cooling in a basin | `primitives.tsx` | Shloka 2 |
| Glint | `glint(s)`: a four-pointed flash of `--art-core`, for blazing metal and jewels | `primitives.tsx` | Shloka 2 |
| Her arms | Beams of light from her source, drawn as three nested tapering layers that fade in from the source, never as limbs: `armBeam` (and `wrist` for where the bangle sits), painted with `ArmLight` and a gradient from `--art-saffron` to `--art-core`. Empty-handed (Shloka 13) they leave her light in an X, like the points of a flash, and fade out at their tips; the wrists stay bare, as the bangle marks where a weapon is held | `primitives.tsx` | Shloka 2 |
| Bangle (kaṅkaṇa) | `Bangle`: a gold ellipse across the arm, a paper-coloured inner line, three vermilion jewels on the front | `primitives.tsx` | Shloka 2 |
| The rising sun | Half a disc on the horizon (saffron centre, vermilion rim, gold rim line), sixteen alternating vermilion and saffron rays | `sunRays` in `primitives.tsx` (promoted at Shloka 8); the disc inline | Shloka 2 |
| The sun's full disc | A radial gradient from `--art-saffron` (a quarter out) to `--art-vermilion` at the rim, a 1.3-unit `--gold` rim line and a fainter gold ring 9 units inside, and 32 rays, at the half-risen sun's spacing, alternating vermilion (long) and saffron. As a jewel it adds a ring of small `--gold-soft` beads just outside the rim, and its rays stop short of the fittings above and below. Its radiance is the 108 gold hairlines of Shloka 1, starting at the disc | `sunRays` in `primitives.tsx`; the disc inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| The sea | Rows of shallow gold ripple arcs, closer near the horizon, faded at the sides; the light on it as a column of saffron lozenges | `seaSurface` (and `hash`) in `primitives.tsx` (promoted at Shloka 49, used by Shloka 2) | Shloka 2 |
| Her sugarcane bow (ikṣu-kodaṇḍa) | `SugarcaneBow` with a `BowShape` (`half`, `grip`, `bend`): a thick gold cane stave with a paler edge, jointed every 25 units, bound at the grip, a tuft of three `--leaf` leaves at each tip. Drawn in a frame where it is aimed up; `bowTips` gives where the string is tied. Drawn, the string runs from each tip to the origin; braced, tip to tip | `primitives.tsx` | Shloka 3 |
| Bowstring of bees | `BeeString`: a gold hairline with a line of tiny bees along it, heads toward `to` | `primitives.tsx` | Shloka 3 |
| Her flower arrows (puṣpa-bāṇa) | `FlowerArrow`: a gold shaft, saffron fletching, a gold calyx, and a budding flower (vermilion centre petal between two saffron ones). Nock at the origin, pointing up | `primitives.tsx` | Shloka 3 |
| The five elements' signs | Inside `FlowerArrow` via `sign`: a ring for space (sound), a six-pointed star for air (touch), an upward triangle for fire (form), a crescent with its horns up for water (taste), a square for earth (smell). Filled with `--art-core` on the vermilion petal. When the five arrows appear together, set them left to right in that order | `primitives.tsx` | Shloka 3 |
| A world-egg (brahmāṇḍa) | An egg, broad end down, in `--art-stone` with a gold rim and a saffron `glint` inside. Afloat in her light, it sits half-sunk: the part below the surface tinted vermilion, a flat gold ring where the surface meets it | `eggPath` in `primitives.tsx` (promoted at Shloka 57, used by Shloka 3) | Shloka 3 |
| Her ruby crown (koṭīra) | A gold dome that swells from the finial to a broad diadem: four tiers, each a band of rubies edged with a line of gold beads, the bands dipping slightly at the front. The diadem carries a row of larger rubies, a large front ruby in a ring of ten gold petals, a crest of gold petals each with a red dot, and a beaded lower rim. A small petal crest, a gold dome, and a bud holding one ruby make the finial. No side wings (they read as horns). Short rays spring from it, gold alternating with red | `RubyCrown` in `primitives.tsx` (drawn at Shloka 4's size; scale it with a transform, and pick its rays with `rays`) | Shloka 4 |
| Ruby | An `--art-vermilion` oval (a little taller than wide) in a thin `--art-carve` setting ring, with a short `--art-core` highlight arc at the upper left. A flashing ruby adds a `Flash` (a `glint` with `m-lick`) | `Ruby`, `Flash` in `primitives.tsx` | Shloka 4 |
| Her hair | Never drawn as a mass or a head. It shows as flowers and ornament, with `--art-hair` glimpsed between them: a plait of rounded lobes laid alternately from each side, each lobe with a gold sheen line and a flower on it, ending in a gold binding and a small tuft. Loose strands read as a broom or cords; don't draw them | `plait`, `PlaitLobes` and `PlaitTip` in `primitives.tsx` (promoted at Shloka 68): the artwork gives the centreline and width and works its own flowers into the lobes | Shloka 4, 68 |
| Campaka | Nine slender, pointed, slightly twisted petals (`campakaPetal`) of `--art-core` edged in `--art-saffron`, a saffron centre. Seen from the side, see "Campaka, newly opened" | `campakaPetal` and the face-on `Campaka` in `primitives.tsx` (`Campaka` promoted at Shloka 92, used by Shloka 4) | Shloka 4 |
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
| Pearl (muktā) | An `--art-moon` disc with a hair-fine gold edge, a `--gold-soft` shading arc on the lower right, an `--art-core` highlight at the upper left; hung from a small gold ring under a gold cap. Too heavy below a radius of about 4: see "Strings of pearls" for small ones | `Pearl` in `primitives.tsx` (promoted at Shloka 13) | Shloka 7, 68 |
| Kadamba | A head is a ball of radius 9–14: a radial gradient from `--art-core` (upper left) through `--art-saffron` to `--art-vermilion`, stippled with tiny `--art-ivory` florets in a sunflower spiral, and ringed by short `--art-saffron` hairline styles that stand out to about 1.3 times its radius, each tipped with an `--art-ivory` dot edged in gold (`m-twinkle`, three groups). The pale tips make it a kadamba and not an orange or a berry. Heads come in sprays (mañjarī) of four or five on short `--leaf` stalks, among broad, pointed, glossy `--leaf` leaves with a `--gold-soft` midrib and curved veins, long enough to show beyond the heads | `kadambaLeaf`, `kadambaHead`, `KadambaLeaf` and `KadambaHead` in `primitives.tsx` (promoted at Shloka 23) | Shloka 8 |
| Ear pendant (tāṭaṅka) | Hung from a gold stud in the lobe (a ruby in it on the sun's side, a pearl on the moon's), a short gold link with gold beads, a bail, the disc, and a drop beneath (a `Ruby` under the sun, a pearl under the moon). Viewer's left is her right ear: the sun there, the moon on the other side. Each pendant swings from its lobe (`m-sway`, see Motion additions) | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| The moon as a little boat (uḍupa) | A small gold crescent, horns up, radius 13, riding the top of the moon's disc as its bail, with three `--art-vermilion` beads along the hull and the ring for the link between its horns | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| Balance (tulā) | A gold beam, thickest at the middle and tapering to bud finials, with four `--gold-soft` bands, a carved centre line, and a boss at the pivot. It hangs in a fork (two gold cheeks under a crossbar with a red mark at its centre) from a ring and a short chain. A tongue stands at right angles to the beam, so when the beam tips, the tongue leans out from under the red mark toward the heavier pan. Each pan is a shallow gold bowl on three cords (one behind) from a ring under a hook at the beam's end: a `--gold-soft` inside, a beaded front rim, a carved band, a saffron sheen, and a bud drop beneath. The pans swing from their hooks (`m-sway`) | `balance(tilt, cord)` and `Balance` in `primitives.tsx` (promoted at Shloka 50, used by Shloka 9); `balanceSwing` swings a pan's contents with it | Shloka 9 |
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
| Haṃsas in flight | Wild geese, about 20 units long: an `--art-moon` body, neck and head outlined in hair-fine gold, a saffron beak, wings by turns raised and lowered with a `--gold-soft` far wing. Flown as a small skein, heading down to water. Never a single bird by Sarasvatī's lute, where it would read as her mount. Alone and flying home (Shloka 52), it is one bird at 3.4, wing raised, with gold feather lines and a short tail, its course dotted behind it | `Goose` in `primitives.tsx` (promoted at Shloka 52, used by Shlokas 11, 52 and 60) | Shloka 11 |
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
| Rain | About 150 hairlines (0.7) of `--gold-soft`, slanting slightly, faded at top and bottom, spread evenly enough not to clump into hatching, in three groups with one shimmering | `rainGroups` in `primitives.tsx` (promoted at Shloka 49, used by Shloka 18) | Shloka 18 |
| New grass | Tufts of tapered `--leaf` blades in two shades, fanned from a point | Inline (`first-rain-quivers.tsx`) | Shloka 18 |
| Tortoise (kūrma) | From the side, about 90 units long: a domed `--art-stone` shell with a gold outline, a saffron tint, gold plates and a gold rim, over a `--gold-soft` head, legs and tail, a small carve eye, and a faint `--art-musk` shadow | `Tortoise` in `primitives.tsx` (promoted at Shloka 32, used by Shlokas 18 and 32) | Shloka 18 |
| Her toenails as moons | On each toe of her footprints, a full moon 0.78 the toe's radius: a radial gradient from `--art-core` to `--art-moon`, a hair-fine gold rim, a moon glow 3.2 times its radius, `m-twinkle` in three groups, and a glint on each big toe. Ten pale discs without the feet read as a string of pearls | Inline (`nail-moons.tsx`) | Shloka 19 |
| The net of her light (prabhā-jāla) | From each foot, 23 rays of light across the floor (foreshortened to 0.7), ten degrees apart through the lower half, starting just outside the foot; where a ray of one foot crosses a ray of the other, a small knot. All in a `--gold` radial gradient that fades out. One centre with spokes and rings read as a cobweb | Inline (`nail-moons.tsx`) | Shloka 19 |
| Darkness covered (tamas) | A soft pool of `--art-hair` (a radial gradient, never a hard edge) with a veil of her light (`--art-core` to `--art-moon`) laid over all but its fringe. With hard edges the two read as a dish | Inline (`nail-moons.tsx`) | Shloka 19 |
| Open lotus (padma) | Seen at a slant: five back and six front pointed `--lotus` petals edged in gold, an `--art-turmeric` seed head, and a `--leaf` pad beneath (`pad={false}` leaves it out; `shade` veins the front petals) | `OpenLotus` in `primitives.tsx` (promoted at Shloka 20) | Shloka 19 |
| Folded hands as lotus buds (añjali) | Closed buds about 44 tall, `--art-core` to `--art-saffron` to `--art-vermilion` and edged in gold, with an `--art-crimson` shade on one side, a seam, `--leaf` sepals and a short stalk, standing in ranks | Inline (`nail-moons.tsx`) | Shloka 19 |
| Her feet as lotuses (śrīpadāmbuja) | Two `OpenLotus`es in `--art-vermilion` with `--art-crimson` veins and no pad, standing on still water a step apart, the nearer a little larger. With the pad, the anklet round them read as a saucer. In a crown, without the water, give each a saffron-to-vermilion glow (`m-shimmer`) | `OpenLotus` in `primitives.tsx` | Shloka 20, 68 |
| Anklet (mañjīra) | A ring round the lotus's base, 72 by 20, seen from a little above: its far half drawn behind the petals and its near half in front, a 5-unit `--gold` band with an `--art-core` sheen, five `Bell`s at 0.62 hanging from the near half and swinging in two groups, and small ruby and pearl studs between them. Its ringing is broken `--gold` rings spreading flat across the water, as the girdle's sound is broken rings | Inline (`still-water-steps.tsx`) | Shloka 20 |
| Still water | Long level `--gold-soft` hairlines, closer together toward the far edge and broken where light lies on them, faded at both sides; a firmer line for the far edge. Calmer than the sea's ripple arcs | Inline (`still-water-steps.tsx`) | Shloka 20, 68 |
| Swan on the water (marālī) | Seen from the side, about 100 long: an `--art-moon` body with a full breast low on the water and a raised tail, the wing arched up off the back with three gold feather lines, an S-curved neck (a 7-unit moon stroke over a 9-unit gold one), a small head with an `--art-saffron` beak and a carve eye, and a faint reflection. A flat back and a lowered wing read as a gravy boat. Her wake is a few flat arcs trailing close behind, far apart, because she is slow; two long parting lines read as a pole | `Swan` in `primitives.tsx` (promoted at Shloka 81, used by Shloka 81), its wake inline in `still-water-steps.tsx` | Shloka 20 |
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
| Couch of the five Brahmās (pañcabrahmāsana) | A white plank (Sadāśiva) on four gold legs, each leg with a medallion in its god's colour bearing his work: Brahmā's lotus rosette on `--art-vermilion`, Viṣṇu's discus on `--art-hair`, Rudra's trident on `--art-moon`, Īśvara's veil on `--gold`. Her bindu sits just above the plank. Rudra's trident is drawn in `--art-hair`: in `--art-carve` (paper by day) it all but vanished on the white medallion by day, so changing it at Shloka 64 darkened it slightly in Shlokas 22, 46 and 61 | `BrahmaCouch` in `primitives.tsx` (promoted at Shloka 46, used by Shlokas 22, 46 and 61) | Shloka 22 |
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
| The obstruction-engine (vighna-yantra, Jayavighna) | A square stone slab seen from above at a slant (half 64 by 26, 7 deep), `--art-stone` with `--art-carve` sides and a `--gold-soft` edge, cut with an eight-angled figure (two squares, one turned 45°) and a trident at each point in `--art-crimson`. Broken, it is five wedge pieces from the centre, pushed apart and turned a little, the figure clipped to each, with powder blowing off on `m-ember` | `BrokenSlab` in `primitives.tsx` (promoted at Shloka 94, used by Shloka 31; its `layer` draws the stone or the figure, so each can be a part); the dust inline (`answering-rain.tsx`) | Shloka 31 |
| Her fingernails | Never a hand: at the tip of an arm-beam, five small moons fanned on round its end (the toenail moons of Shloka 19: `--art-core` to `--art-moon`, a gold rim, a moon glow 3.2 times the radius, `m-twinkle`), each with a gold hairline of light running on out. With both hands at one height over a band of fire, the two clusters and the fire made a face; the arms reach to different heights | Inline (`ten-descents.tsx`) | Shloka 32 |
| The ten descents (daśākṛti) | Each form as its emblem in a small soft glow, never a figure: the fish (`Fish`), the tortoise (`Tortoise`), the boar (`Boar`), the man-lion (`Lion` with `--art-ivory` claws), the dwarf's `--art-turmeric` umbrella and gold water pot, Paraśurāma's axe (a turmeric haft with a broad `--art-moon` crescent blade), Rāma's bow (a turmeric recurve with an arrow on the string), the fourfold Vāsudeva as four small lights (`--art-hair`, `--art-moon`, `--art-vermilion`, `--art-saffron`) on a gold ring, and Kalki's horse (`Horse` in `--art-moon`) under a raised sword | Inline (`ten-descents.tsx`); the axe is `Axe` in `primitives.tsx` (promoted at Shloka 41, used by Shlokas 32 and 41) | Shloka 32 |
| The Pāśupata | A gold trident-headed shaft with an `--art-saffron` flame at its point and a glint, flying low, a trail of light behind it; behind that, the host burnt out: a field of `tongue` flames (vermilion to saffron to core) dwindling back toward where it came from, with rising `--art-ember` sparks and a low saffron glow, and only a little ash left ahead of it | Inline (`ten-descents.tsx`) | Shloka 32 |
| Kāmeśvara's weapon (kāmeśvarāstra) | A long shaft of pale light, tapering from nothing at her light to 3 units wide, a gradient from transparent `--art-moon` to `--art-ivory`, bowed up between her and its mark, with his crescent (the fourth night's `litPart`, radius 11, `--art-moon` edged in gold) for its head, horns forward. Where it strikes, an `--art-ivory`-to-moon glow and twelve short ivory rays (`m-lick`) | Inline (`empty-city.tsx`) | Shloka 33 |
| Śūnyaka burnt (the Empty Place) | Never ruins or rubble: only the city's skyline, a crenellated wall between three towers, two domed and the middle one spired over an arched gate, drawn as a dashed outline in `--art-musk` with an `--art-moon` line over it, round nothing, in a faint musk hollow. A few small dying `tongue` flames (vermilion to saffron) at its foot and drifting flecks of smoke (`m-ember`) | Inline (`empty-city.tsx`) | Shloka 33 |
| Indra's thunderbolt (vajra) | Upright, turned a little: a banded `--gold` grip with an `--art-vermilion` stud at its middle, and at each end a cage of five gold prongs closing to a point | `Vajra` in `primitives.tsx` (promoted at Shloka 57, used by Shloka 33) | Shloka 33 |
| The high gods, praising | Never figures: each is his emblem in a soft `--art-core`-to-saffron glow above her, in order of precedence from the left: Brahmā's lotus (`OpenLotus` in `--art-vermilion`), Viṣṇu's discus and conch (`GanesaEmblem`), Indra's thunderbolt. The gods behind them are their lamps (`Lamp`), in two arcs round her light | Inline (`empty-city.tsx`) | Shloka 33 |
| The herb that revives (sañjīvanī) | A slender `--leaf` stem with a fine `--art-core` line, five pairs of `--leaf` leaves edged and veined in `--art-core`, shrinking upward, and three small five-petalled `--art-ivory` blossoms at the top (`m-twinkle`) with a `glint` over them, in a breathing core-to-saffron glow: alight, as the herbs on Hanumān's mountain were. It grows out of ash (`Ash`) | Inline (`sanjivani.tsx`) | Shloka 34 |
| Kāma, reborn | Never a figure: a small `--lotus` light with a gold ring in a rosy glow, his bow of flowers upright beside it (a `--leaf` recurve stave with small five-petalled blossoms all along it, `--lotus` and `--art-saffron` by turns, and a `BeeString`), and his five flower arrows (`FlowerArrow`) in a narrow fan behind the light. Rati is a smaller `--art-moon` light with an ivory heart; the two look at each other as her light and Kāmeśvara's did (Shloka 30), three gold hairlines each way and a `glint` where they meet | Inline (`sanjivani.tsx`); the bow is `FlowerBow` in `primitives.tsx` (promoted at Shloka 82, used by Shloka 82) | Shloka 34 |
| A cluster of the mantra (kūṭa) | A summit, as the word says: a dotted gold peak whose flanks carry its syllables as small `--art-core` lights with gold rims in their own glows (`m-twinkle`), shared out between the two flanks, and at the top a gold disc engraved in `--art-carve` with ह्रीं (Tiro Devanagari), the hṛllekhā that closes every cluster. The other syllables are given at initiation and are never written. The speech cluster (vāgbhava) has five syllables in all, the middle (kāmarāja) six, the śakti cluster four | `summit` and `Summit` in `primitives.tsx` (promoted at Shloka 35, used by Shlokas 34 and 35) | Shloka 34 |
| Her face (mukha-paṅkaja) | A lotus (`OpenLotus`, 1.45 times), in her glow, with the speech cluster rising over it | Inline (`sanjivani.tsx`) | Shloka 34 |
| Her mantra-body | Never a figure: her light as a tall column (an elliptical `--art-glow` glow, 320 by 640), crossed by two seams at the throat and the waist, each a gold line with slanting gold stitches and a gold knot at each end. Above the throat, her face as in Shloka 34 (a lotus and the speech cluster, its lights in `--art-core` glows); between the seams the middle cluster in `--lotus` glows over a faint rosy region; below the waist the śakti cluster in `--art-vermilion` glows, standing on a lotus | Inline (`mantra-body.tsx`) | Shloka 35 |
| The root mantra whole (mūlamantra) | Fifteen syllables on a dotted gold ring round her bindu, clockwise from the top, each in its cluster's colour (`--art-core`, `--lotus`, `--art-vermilion` glows, as in Shloka 35), the 5th, 11th and 15th the three ह्रीं on small gold discs. The three clusters standing side by side on one gold ground line, the middle highest, are her frame (kalevara) | Inline (`root-mantra.tsx`) | Shloka 36 |
| Nectar (amṛta) of the kula | A thin fall, a gradient from transparent `--art-moon` to `--art-ivory`, with three `--art-ivory` drops (`m-twinkle`), into a small footed gold cup brimming with an ivory surface, in a moon glow. Falling from the crown or poured in the rite: the picture keeps both readings | `NectarCup` in `primitives.tsx` (promoted at Shloka 37, used by Shlokas 36 and 37); the fall inline (`root-mantra.tsx`) | Shloka 36 |
| The kula's compact (saṅketa) | A palm-leaf book (pothi), `--art-turmeric` leaves between gold boards, bound shut with an `--art-vermilion` cord through two holes, knotted at an `--art-vermilion` seal with a gold rim engraved with a small downward triangle. Nothing inside it is drawn | Inline (`root-mantra.tsx`) | Shloka 36 |
| The kula as a household | A round-topped doorway (`archPath`), a 2.4-unit gold line with a `--gold-soft` line inside, on a gold threshold step, hung along the arch with nine `--leaf` mango leaves (toraṇa) swaying in two groups; a kolam before it (a row of `--art-ivory` rice-flour dots inside an ivory loop, over a faint musk line so it shows by day). Before the door, the outward rite: a `Lamp` and a `NectarCup` | Inline (`kula-and-samaya.tsx`); its kolam is `Kolam` in `primitives.tsx` (promoted at Shloka 67: the artwork gives the line and the dots, the primitive the rice flour, musk shadow and gold-touched dots) | Shloka 37, 67 |
| The kula as the assembly of powers | Eight small `--art-vermilion` lights with gold rims in vermilion glows, on a ring round her light (flattened, it lies on the ground), each joined to the next by a gold hairline bowed a little inward. Spokes from her to each made a wheel | `KulaAssembly` in `primitives.tsx` (promoted at Shloka 93, used by Shloka 37) | Shloka 37 |
| The centres of the body (inward worship) | A slender gold column (a gradient fading at both ends) through six small `OpenLotus`es without pads, the fourth, the heart, larger, with her light in it | Inline (`kula-and-samaya.tsx`) | Shloka 37 |
| Akula, beyond the kula | A pale still light with nothing round it and no motion: an `--art-moon` disc with a gold rim and an ivory heart, one faint gold ring, a wide moon glow and a faint saffron tint so it shows by day. Joined to nothing | Inline (`kula-and-samaya.tsx`) | Shloka 37 |
| A centre of the subtle body (cakra) | A small lotus seen face on (`yantraPetals`), its petals filled in the centre's colour (75% lit, 18% unlit) with a gold outline (35% unlit), round a gold circle holding its element's sign (`tattvaSign`): the root centre four `--art-crimson` petals round the `--art-turmeric` square of earth; the svādhiṣṭhāna six `--art-vermilion`; the navel wheel ten `--art-hair` (the traditional dark blue) round the downward `--art-vermilion` triangle of fire; the heart twelve `--art-vermilion`; the throat sixteen `--lotus`; the brow two `--art-ivory` petals as wings. Lit, it has a glow in its own colour. The thousand-petalled lotus is three rings of 40, 52 and 64 fine petals | `CakraLotus` and `Cakra` in `primitives.tsx` (promoted at Shloka 39, used by Shlokas 38 and 39); the signs are `tattvaSign` | Shloka 38 |
| The channel (suṣumnā) | A vertical line on the axis: lit, a 2.2-unit gradient from `--art-core` at the root to gold, fading out above the highest centre reached, in a tall soft `--art-glow` glow; unlit, a dotted gold hairline at 35% | Inline (`first-two-knots.tsx`) | Shloka 38 |
| A knot (granthi), split | A cord wound round the channel, seen a little from above (an ellipse 52 by 14), `--art-musk` 2.4 wide with an `--art-moon` hairline, cut through at the front, its two halves pushed 6 apart with a few frayed strands at each cut end, a soft core glow and a `glint` between them. Drawn as loops with trailing ends, a split knot over a lotus made a moustache over a face | `SplitKnot` in `primitives.tsx` (promoted at Shloka 39, used by Shlokas 38 and 39) | Shloka 38 |
| The thousand-petalled lotus, lit (sahasrāra) | Four rings of 40, 56, 72 and 90 fine petals (`yantraPetals`), `--art-ivory` and `--lotus` by turns, fading outward, with gold hairline edges, in a wide `--art-glow` glow, her light mounted at its heart | Inline (`summit-and-rain.tsx`) | Shloka 39 |
| The rain of nectar (sudhā-sāra) | From the crown's rim, two dotted `--art-moon` falls curving out and down past the body to the root, each with fourteen `--art-ivory` drops edged in gold in small moon glows (`m-twinkle` in three groups), and a fine rain of smaller drops under the lotus. The signs of water, air and space inside a centre's circle made faces (a smile, an eye), so only earth and fire are drawn | Inline (`summit-and-rain.tsx`) | Shloka 39 |
| Lightning drawn out like a vine (taḍil-latā) | A sharp zigzag up the axis, meeting it at the centre of each wheel and swinging 11 units out between them, three strokes deep: a soft `--art-core` glow 7 wide, a 2.6 gold line and a 1.1 `--art-ivory` core (`m-flicker`). Gold `creeperTendril`s curl off alternate corners (`m-sway`): the clinging | Inline (`lightning-vine.tsx`) | Shloka 40 |
| Kuṇḍalinī, coiled | Three and a half turns round the root centre, seen a little from above (radius 48 narrowing to 36, 0.3 as tall as wide, rising 12), drawn as an `--art-vermilion` stroke with an `--art-saffron` one and an `--art-core` hairline inside, in a breathing saffron glow, its upper end straightening into the lightning. Taller and thicker, it read as a spring | `coilPath` and `Coil` in `primitives.tsx` (promoted at Shloka 93, used by Shloka 40) | Shloka 40 |
| Lotus fibre (bisa-tantu) | A `--leaf` lotus stalk broken in two, a pad at one end and a small bud at the other, the broken ends `--art-ivory`, and five hair-fine ivory and gold fibres sagging between them | Inline (`lightning-vine.tsx`) | Shloka 40 |
| The forest of becoming (bhavāraṇya) | Twelve trees in two rows along a ground line, the back row at 55%: a tapering `--art-musk` trunk under a crown of four overlapping discs, three `--leaf` and one musk shadow, edged faintly in musk, swaying in groups, over a faint musk shade. Cleared, it has a gap through the middle with two `--art-turmeric` stumps and two felled musk trunks, and the `Axe` in a stump, blade down, chips of turmeric still flying | Inline (`forest-of-becoming.tsx`) | Shloka 41 |
| Full pot (pūrṇa-kumbha) | A round gold pot with a narrow neck and rim, a vermilion band and dot, five `--leaf` mango leaves fanned from its mouth and an `--art-turmeric` coconut on top | `FullPot` in `primitives.tsx` (promoted at Shloka 88, used by Shloka 41) | Shloka 41 |
| Good fortune (saubhāgya) | A small gold tray holding a mound of `--art-vermilion` kumkum, one of `--art-turmeric` and a pair of bangles (`--leaf` and vermilion), gold motes twinkling down onto it in a saffron glow | Inline (`forest-of-becoming.tsx`) | Shloka 41 |
| A still lamp (contemplation) | The `Lamp`'s bowl with a narrower flame and no flicker, its one straight dotted gold line of light running to her | `StillLamp` in `primitives.tsx` (promoted at Shloka 44, used by Shlokas 41, 44 and 62) | Shloka 41 |
| Devotee's offering (patraṁ puṣpaṁ phalaṁ toyam) | A `--leaf` leaf plate holding a leaf, a five-petalled `--art-vermilion` blossom, an `--art-turmeric` fruit and a small gold bowl of water, in a saffron glow | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Garland that binds her (bhakti-vaśyā) | A hair-fine gold thread climbing from the offering's flower to her light, swaying a little at the bottom and straightening as it rises, strung with small blossoms alternately `--art-vermilion` and `--art-ivory` (`m-twinkle`), closing at the top in a ring of sixteen blossoms round her light | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Roads that stop short | A palm-leaf book (`--art-turmeric` leaves between gold boards) and a stepped gold fire altar with a flickering flame, each sending a dotted `--gold-soft` road up that curls in and stops well below her | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Shelter (śarman) | A half-dome of her light over the lower scene: a gold hairline arc with a soft gold-soft echo, a ground line, and an `--art-glow` fill brightest at the base (`m-shimmer`). The shadows of fear (`--art-musk` glows, `m-sink`) lie outside it | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Śambhu and Śarva | Never a figure: Śambhu as a small `--art-moon` crescent in a moon glow; Śarva as a gold recurve bow upright with an `--art-vermilion`-tipped arrow on the string | Inline (`devotion-governs.tsx`) | Shloka 42 |
| Śāradā | Never a figure: an `--art-ivory` light in a soft moon glow over the `Vina`, shown smaller | Inline (`devotion-governs.tsx`, using `Vina`) | Shloka 42 |
| The autumn moon (śarac-candra) | The full moon as in Shloka 5, with its deer, but without a halo: a halo means haze, and the autumn sky is washed. Fine `--gold-soft` moonlight rings and a moon glow only. Off at the edges of the crown, the last clouds of the rains: three overlapping soft puffs each, a radial gradient from faint `--art-musk` to `--art-moon`, swaying | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| Śaṅkara's trident and drum (triśūla, ḍamaru) | A gold three-pronged head with `--art-moon` tips on an `--art-turmeric` shaft. From a `--art-vermilion` cord tied under the prongs hangs the drum, upright: two `--art-turmeric` cones meeting at a narrow waist bound in vermilion, `--art-ivory` heads, a bead on a cord. Lying on its side it read as a bow tie. Being shaken (Shloka 57) it comes off its cord (`hung={false}`), tilted about 24°, with two bead cords flung out to strike the heads and broken dashed gold arcs of sound from each head | `trident(x, top, foot, s)` with `Trident` and `Damaru` in `primitives.tsx` (promoted at Shloka 56, used by Shlokas 43 and 56) | Shloka 43 |
| Plumb line (sādhvī) | A gold peg, a hair-fine gold thread hanging dead straight, and a gold teardrop bob with an `--art-moon` sheen. Still on purpose | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| The moon in still water | Level `--gold-soft` hairlines, closer toward the far edge, broken round an `--art-moon` ellipse of the moon (with its deer, flattened) in a soft moon glow | Inline (`autumn-moon-turn.tsx`) | Shloka 43 |
| Lotus leaf that water does not wet (padmapatram ivāmbhasā) | A flat `--leaf` pad seen at a slant, notched to its centre, with radiating `--gold-soft` veins, and beads of water standing on it, `--art-ivory` with a gold rim and an `--art-moon` highlight, one at the very edge about to roll off. Pigment flung at her light, stopping at its edge, read as wings | `LotusLeaf` in `primitives.tsx` (promoted at Shloka 44, used by Shlokas 43, 44, 47 and 62) | Shloka 43 |
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
| A full pot brimming over | A round-bellied gold water pot with a neck, a lip, a double `--art-vermilion` belly band and a moon-coloured brim. Water runs over as one broad sheet down the front of the belly (`m-shimmer`) with a fine ivory highlight, and one thin stream at the back, to a puddle with ivory drops (`m-twinkle`). Thin streams alone read as wires | `BrimmingPot` in `primitives.tsx` (promoted at Shloka 69, used by Shloka 48); `spill={false}` leaves it full to the brim with nothing running over | Shloka 48 |
| An iron strongbox, burst | A box of `--art-hair` at 0.7 with gold straps and edge, its lid thrown back at 0.45, gold coins on the rim, the lock hanging open and askew. Coins carried off along the floor (`m-twinkle`) | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| Water running along the floor | A filled, tapering rivulet in the water gradient with a `--gold-soft` edge (`m-shimmer`). A stroked line read as a stick | Inline (`wheel-stopped.tsx`) | Shloka 48 |
| A peak in the rain | A broad skyline through one summit, `--art-stone` with a faint `--art-saffron` tint, its far face shaded in `--art-hair` at 0.1, a 1.5 `--gold` skyline and three short `--art-carve` bands of rock, faded out below. Rills run off the summit every way, `--art-moon` over a `--gold` edge, fading as they go | Inline (`rivers-to-the-sea.tsx`) | Shloka 49 |
| Rain cloud (megha) | Seven lobes as overlapping circles, `--art-moon` over a 2.4 `--gold` stroke so only the union's outline shows, `--gold-soft` arcs for the inner lobes, its foot cut flat on a gold line and darkened with `--art-hair`. Its rain is `rainGroups` under it, faded before it reaches the ground | `CloudLobes`, `cloudArc` and `Lobe` in `primitives.tsx` (promoted at Shloka 51, used by Shlokas 49 and 51); the clip, the foot and the rain inline. Heaped over the whole sky (Shloka 51), it is about thirty lobes round a broad body behind the card, highest left of centre, with greyer lobes behind the crest; an `--art-carve` wash at 0.3 over it keeps it a storm grey by lamplight | Shloka 49 |
| A river (nadī) | A meandering band from a rill to the full stream, its width swelling and narrowing a little (constant width reads as a snake), filled with its own colour under `WavePattern`, between 1.1 `--gold` banks with a fainter outer bank. White: `--art-moon`. Dark: `--art-hair` at 0.6. As a smooth band without the pattern it read as a tusk | Inline (`rivers-to-the-sea.tsx`) | Shloka 49 |
| A river's name, lost at the sea | Its name in Tiro Devanagari (12), turned along its course, three times toward the mouth at 0.95, 0.7 and 0.3; the river itself masked out over its last stretch, and its colour spread in the sea as a soft radial fan | Inline (`rivers-to-the-sea.tsx`) | Shloka 49 |
| The far sea, still | Round her reflection near the horizon, the sea's ripples masked out under a soft oval, and in their place four long level `--gold` lines over a faint `--art-core` sheen | Inline (`rivers-to-the-sea.tsx`, over `seaSurface`) | Shloka 49 |
| Offering lamps on leaf boats (dīpa-dāna) | A small `--leaf` hull edged in gold carrying an `--art-vermilion` flower and a `Lamp`, a saffron glint on the water under it (`m-twinkle`), set afloat in a line that grows as it comes toward us | Inline (`rivers-to-the-sea.tsx`, using `Lamp`) | Shloka 49 |
| Cucumber vine (urvāruka) | A `--leaf` runner with angular five-lobed, heart-based leaves on long stalks, gold-edged with `--gold-soft` veins, coiled tendrils, an `--art-turmeric` flower and a young green fruit. The ripe one is long (44 by 13), a gradient from `--art-turmeric` to `--art-saffron` with fine `--art-carve` lengthwise lines, lying on the bank below an empty stalk. Cross-ticks on it read as a corn cob | Inline (`rivers-to-the-sea.tsx`) | Shloka 49 |
| The sky-flower (khapuṣpa) | Five petals and a centre drawn only in dots (gold, a `--sindura` centre), with no stalk, beside a cloud | Inline (`rivers-to-the-sea.tsx`) | Shloka 49 |
| A hill fort (giri-durga) | Seen from the front on the rim of its rock: a curtain wall of `--art-stone` under an `--art-turmeric`-to-`--art-saffron` wash, laid in ashlar courses whose joints are broken by the course above (`--gold-soft`), edged in `--gold` with a gold coping. Bud-shaped merlons (kaṅgūra) along every top, each with an `--art-hair` slit. A round bastion at each end, wider at the foot, its courses drawn as arcs and shaded at both flanks, carrying a domed kiosk (chatrī) on four gold posts. Two gate towers and a taller gatehouse with a pointed arch in a double gold frame, three vermilion bosses over it | Inline (`hill-fort.tsx`) | Shloka 50 |
| An open gate | Two `--art-crimson` door leaves folded flat back against the wall either side of the opening, so their arched heads turn outward, with gold straps and rows of `--gold-soft` spikes (the gate-spikes set against elephants); two stone threshold steps, and the bar laid on the ground beside it | Inline (`hill-fort.tsx`) | Shloka 50 |
| A crag (sheer scarp over a talus slope) | A sheer upper face, its sides stepped out and in like buttresses, broken by jagged `--art-hair` cracks each with a narrowing facet of shade along its right and a few broken `--gold-soft` bedding lines; below it a talus flaring to the ground with level bands and lit stones. Evenly spaced columns read as a colonnade or organ pipes, and a flat trapezoid as a table | Inline (`hill-fort.tsx`) | Shloka 50 |
| A path up a cliff (durgama) | Switchbacks across the talus, an `--art-carve` tread between `--gold` edges with `--gold-soft` step ticks and a faint shadow, narrowing from 6.4 to 4 as it climbs; then a stair cut slantwise up the sheer face, treads across a carve band. Eight even legs across the whole face read as a zigzag ribbon | Inline (`hill-fort.tsx`) | Shloka 50 |
| Blue lotus (nīlotpala, indīvara) | Face on: eight narrow pointed `--art-hair` petals edged in `--gold` over eight more edged in `--gold-soft`, a gold heart. Strung on a gold cord as a garland, between white flowers | Inline (`hill-fort.tsx`) | Shloka 50 |
| Night jasmine (pārijāta) | Six `--art-ivory` petals edged in gold, turned like a pinwheel, round an `--art-saffron` tube ringed in vermilion. Grows on a bough of Indra's garden: an `--art-hair` stem with a gold line, twigs, and pointed `--leaf` leaves with a gold-soft midrib; the fallen flowers drift down from it (`m-sway`) | Inline (`hill-fort.tsx`) | Shloka 50 |
| Her spear struck home | Shloka 24's `Spear` at 2.2, its blade buried in a dark cleft and its shaft fading back toward her. The cleft is a jagged `--art-hair` gash with cracks running off it and a faint `--art-core` glow where it was struck; the dark breaks off it as angular `--art-hair` shards with a `--gold-soft` edge, falling (`m-sink`) | Inline (`hill-fort.tsx`, using `Spear`) | Shloka 50 |
| A spring and its pool | Three jets from the rock, each a `taper` widening as it falls, `--art-moon` with a gold edge and an ivory line (`m-shimmer`), ivory spray; a pool with an uneven rim, `--art-moon` shading to `--art-hair` at its edge, level gold-soft lines, ripple rings where the jets land, lit stones round it, and a runnel running on down the slope. One broad sheet read as a tap, and the wave pattern on falling water as scales | Inline (`hill-fort.tsx`) | Shloka 50 |
| Loose stones | Ellipses of `--art-stone` under a faint saffron wash, gold-edged, with a `--gold-soft` arc lit on top. Plain stone-filled stones read as holes by lamplight | `Stones` inline (`hill-fort.tsx`) | Shloka 50 |
| A tiger (vyāghra) | In profile facing right, head down to drink, about 200 long at 1.04: a gradient from `--art-saffron` to `--art-turmeric`, gold edge, an ivory belly, muzzle and ruff, tapered `--art-hair` stripes clipped to the body (closer and shorter toward the shoulder, curving round the haunch), far legs shaded, a ringed tail (`--art-hair` dashes over saffron), a crimson nose. Too much turmeric reads as a lioness | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| A spotted deer (chital) | A stag in profile, head down to drink, about 130 long: a gradient from `--art-crimson` to `--sindura`, ivory belly and throat, rows of ivory spots and a crimson dorsal line clipped to the body, crimson far legs, lyre-shaped gold antlers with a brow tine (a fainter far antler behind), an ivory tail flash | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| An owl (ulūka), eyes shut | Upright on a bough, about 60 tall: ear tufts, a gradient from `--art-turmeric` to `--gold`, `--art-carve` wing lines and breast chevrons, two ivory facial discs with closed `--art-hair` arcs for eyes, a dark beak and talons. The bough is a `taper` of `--art-hair` at 0.55 with a gold edge and twigs | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| The cātaka (pied cuckoo) | Perched on a reed tip, its head thrown back and its beak open to the sky: an ivory breast edged in gold, an `--art-hair` back, head, crest and long tail, an ivory wing patch and eye; one `--art-core` raindrop falling into its beak (`m-twinkle`). It drinks only rain | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| A pearl in its shell | Two ivory valves, gold-edged with `--gold-soft` ribs, open in the shallows, `Pearl` at radius 4.8 between them and a glint (`m-twinkle`), all at 1.4 | Inline (`monsoon-pool.tsx`, using `Pearl`) | Shloka 51 |
| Lightning in a cloud | Shloka 40's three strokes (`--art-core` glow 7, 2.6 gold, 1.1 ivory, `m-flicker`) as a zigzag with a short fork down the cloud's flank, faded in at the top under a mask | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| The sun and the moon behind the cloud | The sun as a soft `--art-saffron` glow with the full disc's two gold rings and no rays; the moon as an `--art-moon` disc with a gold rim, a `--gold-soft` shade at the lower right, one moonlight ring and `MoonDeer` at 0.42 and 0.4 opacity. Small brighter cloud lobes roll across the lower half of each, so both are behind the cloud | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| A forest pool | An uneven ellipse, `--art-core` at its centre shading to `--art-hair` at its edge, a gold rim, level `--gold-soft` lines closer toward the far bank, rain rings (`m-twinkle`), her light as a column of saffron and core lozenges, a saffron bank behind, `--leaf` reeds at its ends | Inline (`monsoon-pool.tsx`) | Shloka 51 |
| The rosary of letters (akṣamālā, varṇamālā) | Fifty `--art-moon` beads (radius 10.5, a `--gold-soft` rim shade, a 0.9 gold edge) on a 1.2 gold thread, each with one letter in Tiro Devanagari, `--sindura`, 12.5 (10.5 for the two-part vowels), upright: अ to अः, क to ह and क्ष, clockwise from the meru. Strung round the whole picture, over the crown and down both sides clear of the card, closing at a gold meru bead (radius 12.5) with a vermilion tassel | Inline (`letter-rosary.tsx`) | Shloka 52 |
| Sparks of her own form (visphuliṅga) | Small bindus: a soft `--art-core` glow, a fine core ring, a saffron disc and a core dot, thrown up and out from her light along seven arcs, smaller as they fly (`m-twinkle`, three groups). With trails they read as tadpoles | Inline (`letter-rosary.tsx`) | Shloka 52 |
| A conch sounding (śaṅkha) | Lying on its side, about 66 long: an `--art-ivory` body with a gold edge, gold whorl lines on the stepped spire, `--gold-soft` ridges, a `--lotus` mouth along the underside, a core sheen on the shoulder; three `--gold-soft` sound arcs from its canal (`m-twinkle`). Mahāgaṇapati's 24-unit emblem scaled up read as a lemon | Inline (`letter-rosary.tsx`) | Shloka 52 |
| The gods' crowns, bowed (Saundaryalaharī 29) | Three crowns in a gradient from `--art-turmeric` to `--gold` with `--art-carve` lines, at 1.18, on the floor before her footstool, the outer two tipped toward her: Brahmā's karaṇḍa-mukuṭa (three tiers and a bud, a vermilion lotus on the front), Viṣṇu's tall kirīṭa (bands, a vermilion jewel, leaf gems, a pearl rim and a vermilion finial), Indra's makuṭa (five pointed leaves on a band, `--art-hair` gems, vermilion beads) | Inline (`letter-rosary.tsx`) | Shloka 52 |
| Her footstool | A low `--art-crimson` slab at 0.8, gold-edged, under a broad gold top line, with gold-soft studs and two short gold feet, just under her light | Inline (`letter-rosary.tsx`) | Shloka 52 |
| Gold and the things made of it | A faceted gold nugget with a glint (`m-twinkle`) among a `Bangle`, a ring with a vermilion stone, an earring with a drop, and a beaded gold necklace laid in a loop with a pendant, in a faint core glow | Inline (`letter-rosary.tsx`, using `Bangle`) | Shloka 52 |
| ॐ and the stages of its sound (nāda) | ॐ in Tiro Devanagari, 46, `--gold` over a thin `--art-carve` outline, just above the card; from its top one straight gold thread rises, tapering from 2 to 0.3 and fading out under a mask, with six stages marked on it as `--art-core` points in small glows, each smaller and fainter, and then nothing. In a soft core glow, with a few gold-soft stars. A wavering thread over a crescent read as incense smoke | Inline (`gracious-one.tsx`) | Shloka 53 |
| A yantra drawn on the floor | A face-on yantra (a double square of gates, three circles, eight petals, a `--sindura` hexagram) laid flat by squashing it to 0.34, its lines `--art-ivory` 1.4 over a `--art-musk` 3 underline at 0.35 (`vector-effect: non-scaling-stroke`), with ivory dots at the gates. Her light stands over its bindu on a fine core thread | Inline (`gracious-one.tsx`) | Shloka 53 |
| Nandī (Śiva's bull), couchant | In profile facing her, about 145 long at 1.16: an `--art-moon`-to-`--art-ivory` body with a gold edge, a steep hump over the shoulders, the head raised, short gold-and-turmeric horns, an ear laid back, a vermilion caparison with a dotted gold hem and ivory beads, a crimson neck cord with a gold bell, the forelegs folded, the tail curled on the ground. With tall horns and a low hump it read as a goat; seen from behind, as a person in a shawl | Inline (`gracious-one.tsx`) | Shloka 53 |
| A palm-leaf book on its stand (tantra) | On a folding X-stand of `--art-musk` edged in gold, over a crimson shelf: a bundle of `--art-ivory` leaves with `--art-turmeric` edges between two musk boards, two vermilion cords through it, and the top leaf laid open on it with `--art-carve` writing and its two holes; the cord trails off to a gold bead. Filled in turmeric it read as gold bars | `BookOnStand` in `primitives.tsx` (promoted at Shloka 94, used by Shloka 53) | Shloka 53 |
| Rudra's bow, unstrung (Mṛḍa) | Lying belly up on the floor, about 160 long: a musk stave tapering from 7.6 to 3 with a gold-soft highlight, gold horn tips, a vermilion-bound grip, its ivory string slipped from one tip and lying slack in a coil; a jasmine garland of ivory buds on a leaf cord laid over the grip, a vermilion knot. Short and turmeric it read as a banana | Inline (`gracious-one.tsx`) | Shloka 53 |
| Bilva bough (śrīphala) | A tapering `--art-musk` bough from the top corner with trifoliate `--leaf` leaves (a long middle leaflet and two shorter, gold-edged, gold-soft veins) and round fruit in a gradient from `--art-turmeric` to `--leaf` with a core highlight, each on its stalk | Inline (`gracious-one.tsx`) | Shloka 53 |
| The Milky Way (ākāśagaṅgā) | A band rising from the far shore at the right and arching up through the crown and out of the top, broadening as it climbs: ten `taper`ed widths of `--gold-soft` laid one over another (a gradient from 0.01 at the horizon to 0.06, then to nothing at its end, so it has no edge), knots of `--art-core` star cloud with the brightest, the galaxy's centre, over the crown (`m-shimmer`), a dark rift down one side in three broken `--art-carve` wisps, and some 360 `--gold-soft` stars scattered across it, the bright ones with core centres (`m-twinkle`). Five widths stepped like a rainbow, and a solid rift made it a quill | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| Rings spreading from her (on still water) | Seven `--gold` ellipses (ry 0.17 of rx) round the point under her light, out to both banks, fainter as they go, every other one `m-shimmer`, clipped to the water | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| White lotus afloat | `OpenLotus` in `--art-ivory` with `--gold-soft` veins and its pad, at 0.8 on the water, her light just over its seed head, among plain lotus pads (a `--leaf` ellipse at a slant with a gold edge and an `--art-carve` notch to the centre). Compare Shloka 47's, standing clear on its stalk | `OpenLotus` in `primitives.tsx` | Shloka 54 |
| Offerings drifting on water | Small flowers at 0.8 to 1.25, larger toward the near bank, each on a faint core shadow: a marigold (ten saffron beads round a turmeric eye), a jasmine (three ivory petals), four `--lotus` petals; and leaf-cup lamps (a `--leaf` cup, a saffron `tongue` with a core one inside, a core glint on the water). In four lines from the corners of the lake, converging on her (`m-twinkle`, `m-flicker`) | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| A reed tuft burning (iṣīkātūla, Chāndogya 5.24.3) | Seven `--leaf` reeds from one root with four blades, three seed heads of `--gold-soft` hairlines, and the tallest's plume half `--art-ivory`, half `--art-ember` wisps, alight at the top: three `tongue` flames (vermilion, saffron `m-flicker`, a core heart) in a saffron glow, and `--art-ember` ash above it (`m-twinkle`) | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| Cakravākas, the pair (ruddy shelducks) | Two on the water facing each other, about 48 long at 1.1: a saffron body under vermilion at 0.4 with a gold edge, an `--art-ivory` head with a dark `--art-hair` collar, bill and eye, an ivory wing patch, a dark wing tip; a small `--art-vermilion` heart between them (`m-breathe`). With a small head on a flat body they read as slippers | `Cakravaka` in `primitives.tsx` (promoted at Shloka 72, used by Shloka 54): one bird facing right, placed and flipped by the caller | Shloka 54 |
| Vessels holding her reflection | Clay pots (`--art-vermilion` to saffron to crimson, ivory bands, a core sheen, a vermilion rim) and brass lotas (a round belly in a `--gold` to `--art-turmeric` gradient edged in `--art-ember`, a short neck and a flared turmeric lip, an ivory highlight), each with dark water in its mouth and her light in it as a core point in a breathing glow (`m-breathe`). Drawn as one piece, the lota read as a sack | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| Ghat steps | Below the water's gold edge, two treads in a saffron wash fading downward, each lip a gold line over an `--art-carve` riser at 0.3 with `--gold-soft` stone joints, faded at both sides | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| शिव with its i lit | श and व in Tiro Devanagari, 15, `--art-hair`, painted on a pot, with the ि drawn by hand (a stem and its hook over श) in `--art-core` over a wider core stroke at 0.35, in a small breathing glow. In ivory the lit i was lost among the letters, and saffron vanished on the clay | Inline (`one-in-many-pots.tsx`) | Shloka 54 |
| Royal fly-whisks (cāmara), crossed | Two whisks crossed at ±34° in the crown, bound where they cross by an `--art-vermilion` clasp ringed with eight `--art-moon` pearls (`m-twinkle`): each a gold-to-turmeric handle with turmeric rings and a gold knob, a flared gold collar set with a vermilion jewel and a row of pearls, and a plume of `--art-ivory` yak hair, widest a third of the way and tapering to a soft drooping point, with `--gold-soft` strands down it and ivory wisps past its tip. Blunt-ended plumes read as racquets and then as brooms; a strong droop made them wings | Inline (`stair-of-attainment.tsx`) | Shloka 55 |
| A temple stair, from the front | A landing and eight steps narrowing toward her, each a lit tread (`--art-stone` under a gradient from `--art-core` at the top to faint saffron) with a gold front edge over a riser darkened with `--art-carve`; sloping `--art-stone` parapets with a 2.2 gold coping, a `StillLamp` beside each step on both sides; square plinths at its foot with a scalloped `--gold-soft` moulding; behind the landing, a sanctum door (two stone jambs with inset panels and a lintel with a scalloped band) round a carve-dark doorway | Inline (`stair-of-attainment.tsx`, using `StillLamp`) | Shloka 55 |
| A lion and an elephant at a stair's foot | `Lion` at 0.76 in gold, facing in, on the left plinth; `Elephant` at 0.74 with its trunk down, facing in, on the right, the larger of the two | `Lion`, `Elephant` in `primitives.tsx` | Shloka 55 |
| A clear crystal (sphaṭika) | A quartz point about 38 tall: a six-sided prism seen across two faces in `--art-moon` at 0.45 with `--art-ivory` edges and facet lines, a core glint and a breathing core glow inside, on a small gold base, throwing a short fan of six coloured strokes (vermilion, saffron, turmeric, leaf, hair, lotus) across the floor beside it | Inline (`stair-of-attainment.tsx`) | Shloka 55 |
| A banana-leaf feast (bhoga) | A `--leaf` banana leaf laid flat at a slant, about 74 long, with a `--gold-soft` midrib and veins, spread with an ivory mound of rice with ghee, three saffron laddus, a white modaka, a turmeric banana, a gold cup of payasam, and a betel leaf with its areca nut | Inline (`stair-of-attainment.tsx`) | Shloka 55 |
| Sandals left at the door (pādukā) | Pairs of toe-knob sandals seen from above at a slant, each pair about 36 across at 1.55, toes in a little: a sole with a thickness under it, an instep line, a peg and knob; gold with a vermilion knob, `--art-moon` silver with gold, `--art-musk` wood with turmeric, side by side on the ground at the stair's foot | Inline (`stair-of-attainment.tsx`) | Shloka 55 |
| Gaṇeśa's mouse (mūṣaka) | About 26 long at 1.15, in profile: an `--art-musk` body with a gold edge, a round `--lotus` ear, an ivory eye, a curled tail, a white modaka in its mouth | `Mouse` and `MODAKA` in `primitives.tsx` (promoted at Shloka 94, used by Shloka 55) | Shloka 55 |
| A canopy stretched on posts (vitāna) | A cloth seen from below, its far edge higher and narrower, sagging a little between four posts: `--art-vermilion` at 0.78 to 0.95 over `--art-stone`, lit from below by a shimmering core glow; `--art-saffron` borders at both edges, a woven temple border of vermilion triangles along the near one, two pairs of `--gold-soft` stripes and rows of gold-soft buta, and the warp, 64 `--gold-soft` hairlines, running front to back through all of it. At the near edge a turmeric rod with gold knobs, and below it the warp's ends hanging free, knotted four by four in gold. Turned `--art-turmeric` posts with gold bands, bud finials and gold foot blocks, the far pair fainter. Hung from cords with no posts, steep, it read as a lampshade; in turmeric at low opacity it went khaki by lamplight | Inline (`great-yantra.tsx`) | Shloka 56 |
| The mantra in festoons | Three `--gold` swags from the canopy's rod, their widths in proportion to their syllables (five, six, four), each carrying its syllables but the last as `--art-core` lights in gold rings with saffron glows (`m-twinkle`, `m-shimmer`), and ending at a gold disc engraved ह्रीं in `--art-carve`, hung on a short gold cord. A different hanging of the kūṭas from Shloka 34's summits | Inline (`great-yantra.tsx`) | Shloka 56 |
| The Śrīcakra face-on, in a plate | The anticipated flat yantra, at 2.2 plate units to a yantra unit: a square plate (`--art-stone` under a `--gold-soft` wash, a 2.2 gold edge and an inner hairline, a carve shadow), and on it with non-scaling strokes the square of gates (`gateSquare(48, 8, 5)` gold over `(45.6, 6.4, 5)` vermilion over `(43.2, 4.8, 5)` gold, as on the chariot), three gold circles (41.6, 40.2, 38.8), the sixteen petals in `--art-core` and the eight in `--art-saffron` (each ring on a stone disc so the plate doesn't show through), and the nine triangles over the field of her light, tinted as in `RathaTriangles`. Her bindu sits at `SRI_BINDU_V`. The innermost triangle drawn alone keeps the Dhyāna's faint trikoṇa canon | `SriCakraFace` in `primitives.tsx` (promoted at Shloka 60, used by Shlokas 56 and 60; needs `RathaDefs`), with the plate inline (`great-yantra.tsx`) | Shloka 56 |
| The order of the rite (krama) through the yantra | Eight small five-petalled `--art-crimson` flowers with core centres, from the front gate inward, one to each enclosure, on a spiral round the bindu that turns clockwise (radii 50.5 down to 3.4 yantra units), each on a faint stone disc; a dotted gold thread over a faint core stroke joins them and ends at the bindu, the ninth | Inline (`great-yantra.tsx`) | Shloka 56 |
| A throne with lions, and its arch | Under the plate a turmeric-and-gold slab (`RathaDefs`' riser) with a row of down-turned saffron lotus petals, a stone face with an inset panel, two `Lion`s at 0.25 facing a vermilion rosette, and a gold foot. Behind the plate, a jewelled ogee arch rising to a point (a 9-wide riser band with gold edges, core pearls along it, a faint panel inside), crowned by a gold pot with a saffron bud and two leaf sprays. The whole on a stone dais with a gold front | Inline (`great-yantra.tsx`, using `Lion`) | Shloka 56 |
| The five offerings (pañcopacāra), in order | Small gold vessels on the ground in a row, left to right as they are offered: sandal paste (a footed bowl with a turmeric mound and a musk stick), flowers (a tray of crimson flowers and jasmine), incense (a bowl with two sticks, ember tips `m-breathe`, two curls of gold-soft smoke), the lamp (a `StillLamp` at 2 on a foot in a shimmering glow), food (a bowl of ivory rice with a turmeric drop of ghee on a leaf) | Inline (`great-yantra.tsx`, using `StillLamp`) | Shloka 56 |
| Bhairava's skull-bowl (kapāla) | An `--art-ivory` cranium-cup about 44 across, gold-edged, a zigzag `--art-carve` suture across it, on a three-legged gold stand, heaped with crimson and vermilion hibiscus, jasmine buds and three `--leaf` leaves, two flowers fallen beside it. With the planted trident and drum it stands for Bhairava, who is never drawn | Inline (`great-yantra.tsx`, with `Trident` and `Damaru` at 1.2) | Shloka 56 |
| Bhairava's dog | About 100 long, lying in profile facing right with its head on its forepaws, asleep: `--art-hair` with a `--gold-soft` edge, the whole at 0.8 so it stays a detail; a short ear, a closed eye, a tail curled round its haunch. A tall straight ear read as a horn | Inline (`great-yantra.tsx`) | Shloka 56 |
| The ring of fire of the dance (prabhāmaṇḍala), wheeling | A tilted ellipse (238 by 208, turned −6°) of fire drawn as three closed bands, `--art-vermilion`, `--art-saffron` and `--art-core`, one inside the other, each with ninety crests on its outer edge whose tips are thrown back against the turn. The crests run tall, short, middling, so the edge flickers; evenly spaced separate tongues read as a laurel wreath, and a single long crest shape as saw teeth or feathers. A gold hoop and hairline on the inner edge, `m-lick` licks off every sixth crest, `m-ember` sparks at both sides, a soft saffron glow inside. Crests drop to about half height under the title and to 0.72 at the ground | Inline (`witness-of-the-dance.tsx`) | Shloka 57 |
| The worlds going into the fire | Nine things caught along the band, each on a small `--art-core`-to-vermilion burn glow: world-eggs (`eggPath`, stone with a vermilion scorch from below, an `--art-crimson` crack and a saffron tongue coming out of it) and the high gods' emblems as in Shloka 33, Brahmā's lotus, Viṣṇu's discus and Indra's `Vajra`, all turned along the ring. Keep them out of the card window and from behind the verse panel, or they are lost | Inline (`witness-of-the-dance.tsx`) | Shloka 57 |
| A field of ash (after the fire) | A broad flat ellipse of ash under the scene (236 by 62), an `--art-musk` gradient with an `--art-moon` one over it as `Ash` does, a low saffron firelight where it meets the fire, five long faint drift lines, six low heaps, and cinders: musk flecks, and one in three `--art-ember` with a small glow. The `Ash` clouds alone, spread as a ground, read as grey smudges | Inline (`witness-of-the-dance.tsx`) | Shloka 57 |
| A throne for two (his seat and hers) | One broad seat: a stone back with a scalloped top and two inset panels (his `--gold-soft`, hers `--art-saffron`), a scroll rolled out at each top corner, a gold centre post with a bud finial between the seats, turmeric-and-gold armrests rolled into volutes, two vermilion cushions, a riser slab, a stone base with vermilion lozenges and gold feet. His seat is marked by his crescent (the fourth night's `litPart`, horns up) on a stalk above his panel. Two separate arched backs read as doorways, or as a sun and moon | Inline (`witness-of-the-dance.tsx`) | Shloka 57 |
| The three cities (tripura) | Three small walled towns seen from the front, 68 wide: four domed towers behind a wall with merlons and an arched gate lit from within. Gold (`--art-turmeric` wall, gold towers), silver (`--art-moon`) and iron (`--art-hair`), joined by a dotted gold triangle | Inline (`witness-of-the-dance.tsx`) | Shloka 57 |
| A round yoginī temple (catuḥṣaṣṭi-yoginī mandira), roofless | Seen from in front and a little above, below the card: a stone floor ellipse (206 by 92) under a saffron court glow, a wall 46 high whose far half shows its inside face lined with round-headed `--art-carve` niches (one per sixty-fourth of the ring, narrowed as the wall turns away), a rim drawn as one evenodd ring, and a near outer face with a `--gold-soft` plinth and coping and a blind niche in every other bay. One gabled porch at the front with an arched door lit from within, three steps. A low wall with no thickness read as a tray, and pilasters on the outer face as a fence | Inline (`yogini-temple.tsx`) | Shloka 58 |
| A yoginī as a flame in her niche | A `tongue(13, 5.6, 0.6)` on a vermilion-to-core gradient at the foot of each far niche, facing the centre, scaled with the niche, on a small core glow (`m-breathe`, staggered) | Inline (`yogini-temple.tsx`) | Shloka 58 |
| A flock of lights (gaṇa) | Eight `--art-core` points in rings of glow, flying as a wide V (each arm about 58° off the heading, four lights to an arm, the arms bowed a little) with its point leading (`m-twinkle`, staggered). Acute V's read as the letter V, and a trail behind each light as tadpoles. Six wheel on a faint dashed gold ellipse in the sky, the near ones larger, and two peel off down dashed paths for the open roof | Inline (`yogini-temple.tsx`) | Shloka 58 |
| A palm-leaf fan and a service mirror (vyajana, darpaṇa), offered | Crossed behind her parasol's staff on long handles. The fan: eleven pleats fanned round a disc, `--art-turmeric` and `--gold-soft` by turns, a `--art-vermilion` binding at the edge, on a turmeric handle; a round head with no pleats read as a paddle. The mirror: a small gold disc with an `--art-moon` face and one core sheen stroke on a gold handle, kept plain so it is a thing offered, not her face (Shloka 12) or the ruby standard (Shloka 9) | Inline (`yogini-temple.tsx`, with `Parasol`) | Shloka 58 |
| Emblems of the sixty-four arts | Eight small things laid on a ring round her seat, each about 34 across at 1.15 on a faint shadow: a `Vina` at 0.4, a turmeric drum with vermilion lacing and ivory heads, an anklet ring with seven `Bell`s at 0.3, a brush on an ivory palette with three colours, a garland of ivory and vermilion flowers, a `Ruby` on a dark touchstone with a gold streak, a palm-leaf book between turmeric boards with a vermilion cord, a `--leaf` parrot on a perch | Inline (`yogini-temple.tsx`) | Shloka 58 |
| Young paddy | Rows of three-blade `--leaf` tufts at 0.6, larger and wider apart toward the viewer, kept off the path to the door and clear of the temple's foot | Inline (`yogini-temple.tsx`) | Shloka 58 |
| The moon's orb, upright, being filled (candramaṇḍala) | A full disc of radius 84 just under the card, a radial gradient from `--art-core` at the centre to `--art-moon`, a `--gold-soft` limb shade to 0.55 (weaker, it was lost on paper by day), a 1.6 gold rim, a faint moon glow, and the moon's own moonlight as eight fine `--gold-soft` rings 25 apart spreading over the whole plate. A second ring just inside the rim made it a plate | Inline (`middle-of-the-moon.tsx`) | Shloka 59 |
| The fifteen digits that wax and wane | Fifteen small moons on a ring round the orb (radius 116): full at the foot, thinner up both sides (`litPart` of nights 15, 13 … 1), thinnest at the top under the card, each turned so its lit side faces her at the centre, the unlit part `--art-hair` at 0.16 with a faint gold outline as the moon canon has it (`m-twinkle`, three groups). She is the sixteenth | Inline (`middle-of-the-moon.tsx`) | Shloka 59 |
| Her form of light (rūpa) | A slender shape pointed above and full below, about 85 tall: three nested copies, `--art-saffron` at 0.4 with a gold hairline at 0.5, a core-to-saffron radial at 0.72, and `--art-core` at 0.4 (`m-shimmer`), with a core bindu low in it and her crescent (`litPart(4)` turned horns up, `--art-ivory`, gold edge, a soft moon stroke round it) on its tip. One flat outlined fill with a vermilion foot read as a carrot, then as a seed | Inline (`middle-of-the-moon.tsx`) | Shloka 59 |
| Two jugs pouring (kalaśa) | Round-bellied jugs with a neck and flared lip, about 60 tall at 1.3, tipped 64° toward the orb from either side: gold (a `--gold` to `--art-turmeric` gradient, vermilion bands, a core sheen) and silver (`--art-moon`, gold bands, an ivory crescent engraved). Each stream is a `taper` of `--art-moon` widening as it falls, over a wide soft moon stroke, with a broken ivory line down it (`m-shimmer`) and drops thrown off where it enters (`m-sink`). Thin and outlined, the streams read as wires or hoses | Inline (`middle-of-the-moon.tsx`) | Shloka 59 |
| The net of moonlight of her smile (smita-jyotsnā-jāla) | A cast net fanned out below the orb, between 190° and 350° and from radius 130 to 272: two families of threads spiralling out from her one each way (bases 10° apart, each turning 30° as it goes out), `--art-core` at 0.7, crossing in diamonds that grow outward, with a knot at every crossing (`m-twinkle`), faded out by a radial mask. Straight rays with dotted rings read as a sunburst; if the step does not divide the turn, the knots miss the crossings. Distinct from Shloka 19's net of her light, which is rays from two feet | Inline (`middle-of-the-moon.tsx`) | Shloka 59 |
| Cakora (chukar partridge) | Perched, in profile, about 34 long at 1.5: a round body and head in `--art-moon` under an `--art-hair` wash at 0.16 (grey in both themes; moon alone was a white duck by day), a short raised tail, a `--gold-soft` wing, four `--art-musk` flank bars, an ivory throat ringed by a musk band from the beak through the eye, a vermilion beak, eye ring and legs, on a low stone rock with grass. `--art-carve` marks vanished by day. In flight the same colours with both wings up, the far one `--gold-soft` | Inline (`middle-of-the-moon.tsx`) | Shloka 59 |
| Himavat from the front, three peaks (girirāja) | The whole plate: one `through` skyline with three snow peaks in the crown, the middle one highest, and long flanks down both sides of the card to the plate's foot. An `--art-stone` face under an `--art-saffron` wash fading downward, a `--gold` skyline, `--gold-soft` strata clipped to the rock, and snow in `--art-moon` above an angular, irregular snowline with tongues down three gullies, each peak's far side shaded in `--art-hair` (0.1 under the snow, 0.08 over it), with a gold ridge falling from each peak and a core glint on each summit (`m-twinkle`). A regular zigzag snowline read as teeth, a smoothed one as dripping wax, and loose white tapers below it as icicles; bare crags in the snow read as diamonds. Two nearer foothills either side of his foot, `--art-stone` under a `--leaf` wash fading downward, a gold ridge line fading the same way, and the whole mountain faded out below by a mask so the plate has no hard foot. Compare Shloka 16's, one peak from the side at dawn | Inline (`mountains-daughter.tsx`) | Shloka 60 |
| A cave shrine in the rock | An arched mouth under the card with a gold lip, its inside `--art-musk` at 0.5 under a radial from `--art-vermilion` at her bindu through `--art-crimson` to `--art-musk` at the walls, and on its back wall the `SriCakraFace` at 0.86 without its plate, her light at its bindu (a core-to-vermilion-to-crimson radial over the whole cave and beyond, `m-shimmer`), cast as a red glimmer on the pool at its mouth | Inline (`mountains-daughter.tsx`) | Shloka 60 |
| Deodar | A straight `--art-musk` trunk under six tiers of drooping branches, widest near the foot (`--leaf` at 0.9 with a hair-fine gold edge), 48 to 92 tall, in groves on the foothills, kept clear of the card | Inline (`mountains-daughter.tsx`) | Shloka 60 |
| Yak (camarī) | In profile, about 75 long at 1.1: a great hump, the head carried low, `--art-ivory` horns curving up, a ragged skirt of hair nearly to the ground, short legs with gold hooves; `--art-musk` under a `--gold` wash at 0.14 (musk alone was lost by lamplight) with a 0.8 gold edge, `--gold-soft` hair strands, and its face and chest rimmed in `--art-core` where the shrine's light falls. Its tail is a long `--art-moon` plume thrown up and back like a whisk, swinging from its root (`m-sway`). The plume of the royal fly-whisk is the same hair | Inline (`mountains-daughter.tsx`) | Shloka 60 |
| The five faces of Sadāśiva (pañcabrahma) | Five flames (`tongue(22, 9)` with a core tongue inside, a gold edge, each on a soft glow of its own colour, `m-twinkle`) laid out as the faces turn: Īśāna upward at the centre, larger (1.45), in `--art-ivory`, and on a `--gold-soft` ring of radius 54 round it Vāmadeva north in `--art-vermilion`, Tatpuruṣa east in `--art-turmeric`, Aghora south in `--art-hair`, Sadyojāta west in `--art-moon`. Dashed spokes from the centre made it a crosshair | Inline (`salt-and-the-couch.tsx`) | Shloka 61 |
| Her bliss as a widening lotus (the Taittirīya's ladder of joys) | Six rings of sixteen petals (`yantraPetals`) round her, each ring the last scaled by 1.42 and turned half a petal, from radius 40 to about 460, each a `--art-core` line over a wider faint `--gold` line (core alone was lost by day), fainter outward (`m-shimmer`, three groups), over a breathing `--art-glow` radiance (`m-breathe`, Taittirīya 2.7: who could breathe if this bliss did not fill the sky). Plain rings read as a target; motes of light as a starfield, or confetti by day | Inline (`salt-and-the-couch.tsx`) | Shloka 61 |
| The couch's gods, inert (preta) | `BrahmaCouch` at 2.5 with each leg's shaft, above and below its medallion, under an `--art-hair` wash at 0.42, so the gold goes dull; a vein of her light (`--art-core`, a 3.6 soft stroke under a 1.1 line, `m-shimmer`) runs along the plank and down each leg into its medallion, which keeps its colour inside a core halo (a radial clear to 0.62, `m-twinkle`). A halo filled to the centre washed the emblems out | Inline (`salt-and-the-couch.tsx`) | Shloka 61 |
| Sadāśiva blushing (Saundaryalaharī 92) | Over the white plank, a `--art-vermilion` radial centred under her (0.85 at the centre to nothing at 90), with a short core line along the plank's top, so the plank is red only where she sits | Inline (`salt-and-the-couch.tsx`) | Shloka 61 |
| Rock salt dissolving (saindhava-khilya, Bṛhadāraṇyaka 2.4.12) | A shallow brass bowl (a `--gold`-to-`--art-turmeric` body, turmeric rim and foot, a vermilion band) before the dais, its water `--art-stone` under `--art-hair` at 0.16 and `--art-core` at 0.22 (`m-shimmer`); at the centre a faceted lump of `--art-moon` under `--lotus` at 0.3 with `--gold-soft` facets, curls of `--art-core` spreading from its foot through the water (ivory curls vanished by day), and fourteen small ivory glints all over the water (`m-twinkle`) | Inline (`salt-and-the-couch.tsx`) | Shloka 61 |
| The waking world along a bank (viśva) | A frieze drawn with its bank at y 506 and brought up to 1.25 on the plate's bank at 526: a high far range (`--art-stone` under `--art-hair` at 0.08, a faint gold line) behind nearer hills (hair at 0.14), two banks in `--art-stone` under `--leaf` at 0.22 with gold edges, open water between them; on the left a village of three houses (`--art-ivory` walls, `--art-vermilion` roofs, musk doors, gold lines), two coconut palms (a musk trunk, six `--leaf` fronds) and a pale road down to the water; on the right a small temple (plinth, walls, a curved śikhara banded in `--gold-soft`, a gold āmalaka and finial, a musk door) between a mango and a banyan (round `--leaf` lobes on a musk trunk); and a few musk birds high up. On the left keep it clear of the verse panel (x > 110 on the plate) | Inline (`waking-and-dream.tsx`) | Shloka 62 |
| The dream: the world turned over in the water (svapna, taijasa) | The same frieze mirrored on the bank line, every fill turned to `--art-core` at about twice the opacity, gold outlines at 0.9, doors, windows and the temple's door lit in core (`m-twinkle`), all broken into level bands 3.6 high every 4.6 by a mask that fades with depth (to 0.25); no sun in it. Over it, a wide flat `--art-core` glow from within (`m-breathe`) and a thin gold bank line fading at both ends. The water itself is `--art-hair` at 0.16 fading down | Inline (`waking-and-dream.tsx`) | Shloka 62 |
| The dream's chariot (Bṛhadāraṇyaka 4.3.10) | Only in the reflection, on the road at the water's edge: a small car in core with a gold edge on one wheel, its pole to a `Horse` at 0.36 in `--art-core`, mirrored and banded with the rest. On the road above, nothing | Inline (`waking-and-dream.tsx`) | Shloka 62 |
| A still lamp afloat, with its reflection | `StillLamp` at 4.4 floating on the water before the bank, in a core glow (`m-shimmer`), its reflection turned over on the foot of its bowl (not its rim) at 0.8, banded by the water's mask, in a smaller glow of its own | `StillLamp` in `primitives.tsx` | Shloka 62 |
| The one ocean (ekārṇava) | No shore and no horizon: an `--art-hair` water from y 420 rising to 0.42 and fading again at the foot, faded at both sides by a mask, sixteen `--gold-soft` level lines closer together upward and faded at the ends, a wide flat `--art-core` glow from within (`m-shimmer`), and a faint echo of what floats on it, mirrored and faded out under a mask. A horizon line made it a sea with a shore, and an unmasked rect a grey slab in the plate | Inline (`ocean-of-sleep.tsx`) | Shloka 63 |
| Śeṣa coiled as a bed, his seven hoods spread (ananta-śayana) | One stroked path, three straight runs joined by half turns (tube 22 wide, a 2.6 `--gold` edge under `--art-moon` with `--art-hair` at 0.16), up into a neck; a turmeric belly line and `--gold-soft` scale arcs on each run, an ivory sheen along its top, hair shadow lines between runs, and a `taper` tail curling off the lowest run. Seven cobra hoods fanned 21° apart from the neck and leaned toward the sleeper: broad shoulders narrowing to a small snouted head, `--art-moon` under hair at 0.3 with a gold edge, an ivory inner face, a hair spectacle mark, two hair eyes and a twinkling vermilion jewel, drawn outermost first. Round fan petals with no heads read as a cauliflower | Inline (`ocean-of-sleep.tsx`) | Shloka 63 |
| The veil of sleep over Viṣṇu (yoganidrā) | He is not drawn: a dark `--art-hair` cloth at 0.62 lies over the coils, rising over his head under the hoods, with three folds, small twinkling `--gold-soft` stars in it and a gold hem over a dashed one, and a breathing `--art-hair` glow under it (`m-breathe`). His conch and discus (`GanesaEmblem`) lie at its foot. A dark ball for his head read as a marble | Inline (`ocean-of-sleep.tsx`) | Shloka 63 |
| Brahmā on the navel lotus, his four faces as flames | A tapered `--leaf` stalk from the sleeper's navel (a gold bead) up to an `OpenLotus` at 1.4 without its pad, crimson shade, in a saffron-to-vermilion glow (`m-shimmer`); on it four `tongue(17, 8)` flames in `--art-vermilion` with core hearts, turned to the quarters (the back one smaller and higher, the front one largest). The stalk stays with the artwork; the lotus, faces and glow are `BrahmaLotus` in its own frame (with `BrahmaLotusDefs` for the `brahma` glow), so scale it with a transform | `BrahmaLotus` in `primitives.tsx` (promoted at Shloka 67) | Shloka 63, 67 |
| The fourteen worlds let out | Shloka 3's world-egg, fourteen of them in two chains from the lotus, growing as they go: seven up the left beside the card and seven sinking into the water on the right, those at 0.78 with a hair tint in place of saffron. Two rising arcs either side put the right one under the card's corner, since the hoods fill the space beside it | Inline (`ocean-of-sleep.tsx`, with `eggPath`) | Shloka 63 |
| The three measures and the half-measure (a u m, ardhamātrā) | अ उ म in Tiro Devanagari, 16, `--sindura`, on `--art-moon` discs (13.5, a gold rim and a `--gold-soft` inner ring) strung on a gold string tied off at both ends. Apart from them, her light as the candrabindu: the fourth night's `litPart` turned horns up with a soft moon stroke, her bindu (core in saffron in a core ring) set in its cup, a `--gold-soft` ring and a wide core glow (`m-shimmer`). A bindu above the crescent with rays read as a smiling sun | Inline (`ocean-of-sleep.tsx`) | Shloka 63 |
| The infant on a banyan leaf (vaṭapatraśāyī) | A small `--leaf` leaf with `--gold-soft` veins floating on a core shadow, a speck of `--art-hair` on it in a hair glow (`m-breathe`) | Inline (`ocean-of-sleep.tsx`) | Shloka 63 |
| A sanctum door with its screen half drawn (tirai) | Drawn at 1.1 from its cornice down, below the card: a `--gold-soft` cornice, an `--art-stone` lintel with a row of `--art-vermilion` rosettes, `--gold-soft` scallops and a gold boss, stone jambs with inset panels and a gold creeper, a dark inside (`--art-musk` at 0.82 under a vermilion-to-crimson radial from her light), a threshold and three widening steps with gold nosings. The screen is `--art-vermilion` at 0.9 with `--art-crimson` folds, a `--gold-soft` leading edge, a woven band of gold-soft lozenges between gold lines and a gold fringe: the left half hangs straight, its edge bowed where it was tugged; the right half is swagged from the rod to a gold tie and hangs down by the jamb, a vermilion tassel off the tie. Its rod is gold with rings, a small crowned gold finial at each end, and the gold cord (a dashed vermilion line in it) runs from the tie up inside the jamb, over the finial and up behind the card. Compare Shloka 17's closed ivory curtain and Shloka 55's sanctum door | Inline (`the-drawn-screen.tsx`) | Shloka 64 |
| The couch at work | `BrahmaCouch` at 1.4 inside the door, its gold bright and each medallion in a ring of core light (`m-shimmer`); the plank drawn again over it as Sadāśiva, white as crystal: `--art-moon` with a 1.4 gold edge, slanting `--gold-soft` facets, an ivory sheen, in an `--art-glow` glow (`m-shimmer`). A moon-coloured glow vanished by day. Compare Shloka 61's inert couch | Inline (`the-drawn-screen.tsx`, with `BrahmaCouch`) | Shloka 64 |
| Rudra's trident, from the ground into the crown | `trident` at 1.2, mirrored so the drum hangs toward the card, standing on a stone foot at x 504 right of the door and rising past the card's edge to its head at y 78 in the crown, a `tongue(15, 6.4)` flame with a core heart on each point (`m-flicker`), the middle one larger, in a saffron-to-vermilion glow (`m-shimmer`). At 1100px its right prong is cut by a couple of units | Inline (`the-drawn-screen.tsx`, with `Trident` and `Damaru`) | Shloka 64 |
| The worlds drawn in (saṃhāra) | Fourteen world-eggs (`eggPath`) on a spiral of a turn and a quarter round the trident's middle flame, from 12.5 high at the outside to 4 at the fire, on a dashed `--gold-soft` line, their saffron glints twinkling. Copies drawn in by `m-gather` doubled every egg into clusters like grapes in a still; the spiral alone carries it | Inline (`the-drawn-screen.tsx`) | Shloka 64 |
| The sun's fierce rays (tigmāṃśu) | Thirteen sharp wedge rays out of the full disc between 30° and 150°, alternately short (170, on a vermilion gradient fading outward) and long. The long ones fade out behind the card (a vermilion radial to nothing at 300 from the sun, the gold edge with it) and go on as a dashed `--gold-soft` thread to a `tongue(40, 19)` flame at their ends, standing on an arch in the crown, each with a core heart (`m-lick`) and a soft saffron glow; the cores of all the rays lick too. The whole is dimmed to 0.28 behind the card window by a mask. Long wavy tongues read as tentacles, thin needles with star tips as a dandelion, and solid shafts under the flames as torches | Inline (`middle-of-the-sun.tsx`) | Shloka 65 |
| A garland of the six excellences (bhagamālā) | A gold strand hung round the lower half of the sun's disc (an ellipse 95 by 103 from 158° round to 22°) with small `--leaf` leaves along it, tied at both shoulders with a gold bead and a vermilion tassel, and six eight-petalled blossoms (r 11, on a faint core halo, a turmeric heart) in the six colours: sovereignty `--gold`, power `--art-vermilion`, fame `--art-ivory` (fame is white in the poets), beauty `--lotus`, knowledge `--art-saffron`, detachment `--art-hair` | Inline (`middle-of-the-sun.tsx`) | Shloka 65 |
| Gold apportioned (bhaga) | Twenty-six small `--gold` motes with a saffron edge and a short faint trail, either side of the sun, each falling and fading (`m-sink`) on its own `--dur` and negative `--delay`, with flat `--gold-soft` rings on the water where they land. Long trails read as pins on threads | Inline (`middle-of-the-sun.tsx`) | Shloka 65 |
| Twin lotuses from one root (sahodara) | A red `OpenLotus` (crimson shade) at 0.52 and one in `--art-hair` (gold-soft shade) at 0.48, on two `--leaf` stems curving up from a single turmeric node on the water, a ring round the node and a lotus leaf behind them | Inline (`middle-of-the-sun.tsx`, with `OpenLotus`) | Shloka 65 |
| Aḻagar's golden horse | `Horse` at 0.42 in `--gold`, mirrored to run left, its legs at the waterline in a gold-soft ring, far out on the water with a saffron glint | Inline (`middle-of-the-sun.tsx`, with `Horse`) | Shloka 65 |
| Rows of worlds that open and shut (bhuvanāvalī) | World-eggs (`eggPath`, half-width 7.5 to 11) strung on sagging `--gold` threads, split at a seam just below the middle. How far each is open runs along the row as a wave, so the row reads as a blink: sealed (the cap tinted `--art-hair`), parting, wide open (the cap lifted half the egg's height, an almond of `--art-core` light between the shells pointed at both ends like an opening eye, a core glow, a saffron `glint`), closing again, and, where it is fully shut, only a dashed `--gold-soft` outline: gone. The light and glow lick (`m-lick`, three groups). Two rows in the crown; two smaller, fainter rows behind the card under a window mask | Inline (`worlds-in-a-blink.tsx`) | Shloka 66 |
| Her face in a facing mirror (thousand-faced) | The hand mirror at 0.76 on a long stem, its face holding the whole mirror again seven times, each 0.7 the last and fainter, drifting up and left: a gold stem, a saffron cup, a carve shadow, a beaded gold frame, an ivory face under the mirror's shading. The canon's sheen streaks are drawn again over all of them, and her light sits at the far end. Plain nested rings read as a target; the stems and cups make each one a mirror | Inline (`worlds-in-a-blink.tsx`, with `HandMirror` and `MarriageThread`) | Shloka 66 |
| The stream of her face's beauty, round | The river canon bent into a ring round the mirror (radius 112, 26 wide): `--art-moon` at 0.4 with a faint saffron wash under `WavePattern`, 1.1 gold banks and a fainter outer bank, in a saffron aura. A shoal of sixteen `Fish` at about 0.5 swims round it against the clock, each with its faint crimson shadow (`m-dart`, three groups). Compare Shloka 6's channel and Shloka 23's pair | Inline (`worlds-in-a-blink.tsx`, with `Fish` and `WavePattern`) | Shloka 66 |
| The earth as the purāṇas map it (bhū-maṇḍala) | A flat round disc seen at a slant (150 by 32): a saffron island at the centre, then rings of sea (`--art-hair` at about 0.24) and island (`--leaf` at about 0.35) by turns, each edged in hair-fine gold, over a saffron-to-stone wash, with a 1.2 gold rim | Inline (`worlds-in-a-blink.tsx`) | Shloka 66 |
| Her feet on every side | Twelve pairs of `Footprint`s (with the gold `edge`) on a ring just outside the earth's rim, each pair turned to face outward, laid on the ground at 0.55 and a little larger toward the viewer | Inline (`worlds-in-a-blink.tsx`, with `Footprint`) | Shloka 66 |
| Ten fingers' breadth (daśāṅgula) | Under the mirror's bud foot, a hair-fine gold line down to the earth with eleven ticks 2.4 apart marking off ten fingers (every fifth longer), and a faint crimson shadow on the earth beneath | Inline (`worlds-in-a-blink.tsx`) | Shloka 66 |
| A standing household lamp (kuthuvilakku) | Brass in `--gold` edged in `--art-carve`, at 1.15 about its foot: a domed foot on a round plinth, a slender stem with three knops, a shallow bowl of `--art-turmeric` oil with five beaked spouts (the back two behind the bowl, ivory wick ends in the unlit ones), a short stem and bud finial above. One wick lit, in the front-right spout: a `tongue(38, 10)` flame in saffron edged in vermilion with a core heart (`m-flicker`), in a core glow and a wide saffron room glow (`m-shimmer`) over a lamplit floor. A vermilion kumkum dot on the foot and stem, and a jasmine string swagged under the bowl, its ends falling free. Lighting the front spout hid the finial | Inline (`the-household-lamp.tsx`) | Shloka 67 |
| Smoke as the Vedas breathed out (Bṛhadāraṇyaka 2.4.10) | Four streams from the one flame, each a `taper` ribbon in `--gold-soft` (`m-lick`, three groups) inside a wide faint haze of moon and gold-soft, swelling and thinning along its length, with three small saffron `glint`s along the upper part; they open out behind the card (a window mask at 0.62) and come in to Brahmā's lotus from left, below, right, and over the top. Moon haze at 0.2 read as grey tubes by lamplight, so it is 0.1. Compare Shloka 45's musk smoke, which soils nothing, and Shloka 44's single thread | Inline (`the-household-lamp.tsx`) | Shloka 67 |
| A ring of her light, the same for all | A saffron circle (r 58) inside a dashed `--gold-soft` one, over a faint core halo at the rim (`m-shimmer`), drawn identically round Brahmā's lotus at 0.8 in the crown and round an inchworm on the ground: neither ring the larger | Inline (`the-household-lamp.tsx`) | Shloka 67 |
| An inchworm (kīṭa), by a tuft of grass | A `taper` body in `--leaf` with a gold edge, its middle drawn up in an arch, its tail and front feet down (gold prolegs), `--gold-soft` segment dots, a turmeric head; a seven-bladed `--leaf` grass tuft just ahead of it (the *stamba* of *ābrahmastamba*), on a musk shadow | Inline (`the-household-lamp.tsx`) | Shloka 67 |
| A kolam on two axes (varṇāśrama) | `Kolam` laid on the ground at a slant (0.4) and turned an eighth of a turn: four dots by four, 22 apart, with a long round-ended loop round every row and every column, so each dot sits where its row and its column cross; on a swept patch of `--art-musk` (0.42 fading out) so the rice flour shows by day. Scalloped loops round each dot were chain mail | `Kolam` in `primitives.tsx` | Shloka 67 |
| Sweet and bitter served (phala) | Two plantain leaves on the floor either side of the lamp, at 1.25, `--leaf` at 0.5 with a gold edge, gold-soft midrib and veins: two ripe mangoes (a turmeric-saffron-vermilion gradient, a vermilion blush, an ivory sheen, a hair stalk) on one, two bitter gourds (a pointed spindle knobbled along its edge, `--leaf` under hair at 0.12, two hair grooves, gold-soft warts, an ivory sheen) on the other. Ivory dashes on the gourds read as corncobs | Inline (`the-household-lamp.tsx`) | Shloka 67 |
| Ants carrying off the kolam | Five `--art-hair` ants (three body segments, six hairline legs, antennae), four of them carrying a grain of `--art-ivory` rice flour, in a file from the kolam's right corner, with crumbs where they start | Inline (`the-household-lamp.tsx`) | Shloka 67 |
| The four Vedas bowed, as hair with vermilion in the parting | Four bowed heads of hair and nothing else, in a row under her feet, each leaning a little toward them: an `--art-hair` crown with a small peak at the brow, gold-edged, its hair combed out and down from the parting in six fine `--gold-soft` lines a side; a `--sindura` `taper` streak down the parting, widest at the crown; a spray of five jasmine buds where the plait begins (alternate heads on alternate sides); and a `plait` (24 wide narrowing to 15, lobes every 11, an ivory jasmine bud on each lobe) falling a little inward toward the shell, behind the card under a window mask at 0.62. An ellipse crown with a ring of jasmine round its foot read as jellyfish | Inline (`vermilion-and-pearl.tsx`, using `plait`, `PlaitLobes` and `PlaitTip`) | Shloka 68 |
| Red dust from her feet | Fine `--sindura` motes (r 0.7–1.5) between the lotuses and the partings, each on `m-sink` with its own `--dur` (5–10s) and negative `--delay`, so the dust is always falling | Inline (`vermilion-and-pearl.tsx`) | Shloka 68 |
| The shell of all scripture, shut on its pearl | A scallop shut in still water: a straight hinge with two small ears (gold-soft ear ribs, gold lines from the umbo, a saffron bead at the umbo), an upper valve in moon to ivory to saffron, gold-edged, with eleven gold-soft ribs and a crenellated lip; six growth lines, each the lip it once had, in gold with `--art-musk` ticks under them like a line of written letters; a narrow seam of `--art-core` along the lip, and a `Pearl` (r 9) showing in it; a darker ivory lower valve, a musk shadow, and a core reflection on the water (`m-shimmer`). Ticks in `--art-carve` vanished by day. Compare Shloka 51's open shell in the shallows | Inline (`vermilion-and-pearl.tsx`, using `Pearl`) | Shloka 68 |
| Svāti and its raindrop | One `Star` (s 7, `m-twinkle`) in a faint gold-soft halo high in the crown, and under it a `--art-moon` drop, gold-edged, falling on `m-sink` (9s). The drop is inside a group that places it, so the motion doesn't override the placement | Inline (`vermilion-and-pearl.tsx`) | Shloka 68 |
| A spider on its web (ūrṇanābhi, Muṇḍaka 1.1.7) | In the corner under the lintel's end: five `--gold-soft` spokes over a quarter turn with four rungs, and from the lintel a single thread to a small `--art-hair` spider (two round segments, eight fine legs, a vermilion spot) | Inline (`the-drawn-screen.tsx`) | Shloka 64 |
| A full pot pouring into a full pot (pūrṇamadaḥ pūrṇamidam) | A `BrimmingPot` at 0.78 tipped 70° in the ring of a tall three-legged gold stand, `spill={false}` so its brim still shows full, pouring a moon stream (2.2 over a 4-wide `--art-hair` shadow, `m-shimmer`) into the brim of a second `BrimmingPot` (0.95) below it, which overflows as usual; its overflow runs away as a moon runnel off the foot of the plate. Both still full | Inline (`full-from-full.tsx`, using `BrimmingPot`) | Shloka 69 |
| A kolam in one endless line (anādinidhanā) | One line whose radius about a ring (118, laid at 0.36) waves at a half-integer rate (10.5 waves a turn, amplitude 14), drawn over two turns: the second turn is the first one's mirror and the line closes on itself, crossing between every pair of its 21 dots, so it has no first stroke and no last. Drawn with `Kolam` (line 1.2, dots 1.7) | Inline (`full-from-full.tsx`) | Shloka 69 |
| The four aims of life (puruṣārtha) | Four small things set on a ring round her: dharma a domestic fire (three vermilion `tongue`s with core hearts, `m-lick`) in a square pit seen on the slant (stone, an ember floor, a gold rim), in its own flicker glow; artha a heap of eight gold coins with carve undersides and a glint; kāma two `FlowerArrow`s at 0.62 laid crosswise; mokṣa a gold dome cage on a stone base, its door swung open and its bar gone, and a `Goose` (0.85) flying up from it toward her light | Inline (`full-from-full.tsx`) | Shloka 69 |
| A cobra, coiled and hooded (bhogin) | Three stacked `--art-hair` coil rings (rx 30, 24, 17) with dashed gold scale lines, a neck rising from the top coil, and a broad hood (44 wide) with two gold-soft spectacle marks, the head on top with two core eyes and a forked `--art-vermilion` tongue (`m-flicker`); the hood sways (`m-sway` about its base with `swingFrom`). Over a gold bowl of milk. Compare Śeṣa's hoods (Shloka 63) | Inline (`full-from-full.tsx`) | Shloka 69 |
| A child's steps walking up to her (ambikā) | Three small `Footprint`s (0.74, laid flat at 0.62, left, right, left) in `--art-ivory` rice flour with the gold edge, walking up from the front to her vermilion footprints and over the kolam's line | Inline (`full-from-full.tsx`) | Shloka 69 |
| The sun's twelve digits (kalā), and the hymn's seam | Twelve small `--art-vermilion` `tongue` flames (13–16 tall, core hearts, `m-flicker` by turns) in small gold cups in a row 25 apart along the card's top edge, each in a small core glow; the gap between the fourth and the fifth is wider and sits on the plate's axis, and a gold seam (a gradient, fainter behind the card) runs down from it to the next thing below. The hymn's ten hundreds are named for digits 2–11 | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| Sound before it divides (nāda) | Unbroken rings on still water round its source: `--art-moon` ellipses (0.9 over a 1.8 `--gold-soft` under-stroke) 34 apart, at 0.3 of their width, fading outward, clipped to the pool, `m-shimmer` by turns. The opposite of the sound of bells, whose arcs are broken | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| A river losing its name in the waters (Muṇḍaka 3.2.8) | A winding band widening into the pool, `--art-moon` over an `--art-hair` shade so it shows by day, both fading out across the mouth; two fine ivory currents (`m-shimmer`), and two 2.2 gold banks that fade out before the water. Dashed currents read as a road | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| An empty banyan leaf on the waters (vaṭapatra) | A `--leaf` leaf with a gold edge and gold-soft veins, laid flat on the water at 0.52 with a curled stalk and a faint hair shadow, nothing on it: the bed of the god who rests on the waters | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| The heart's lotus (anāhata) | Twelve `--art-vermilion` petals in two rings (`yantraPetals`, the outer turned half a petal, at 0.55 and 0.85), laid flat on the water at 0.42, round an ivory pericarp with a smoky `--art-hair` six-pointed star (`tattvaSign` air); her light just above it. Compare the cakra canon of Shloka 37 | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| Touch-me-not, its leaves folded (lajjālu, modesty) | A low `--leaf` tuft of six fronds from one point, each a stalk forking into two pinnae with seven pairs of leaflets: four fronds drooped with their leaflets folded flat along the pinnae, two open with their leaflets spread across; two `--lotus` pompom flowers with turmeric tips | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| A winnowing fan laid down (śūrpa) | A `--art-turmeric` basket seen from the front: a floor wide at the open front and narrow at the back, a wall rising round the back and dying away along the sides, a 2.6 gold rim, a carve weave; inside a little heap of ivory rice and ember husks left together | Inline (`seam-of-the-digits.tsx`) | Shloka 70 |
| A seat for one (rājñī) | One narrow seat drawn at 1.2: a tall `--art-stone` back rising to a point, gold-edged, with a saffron inset panel her light shines through, a gold bead and bud finial; one vermilion cushion with a dashed gold-soft border; turmeric armrests rolled into volutes; a turmeric slab with a row of down-turned saffron petals; two gold legs carved as lion's paws with carve claws; a stone base. Nothing beside her. Compare the throne for two (Shloka 57) | Inline (`queen-and-girdle.tsx`) | Shloka 71 |
| The girdle ringing (raṇatkiṅkiṇimekhalā) | The girdle as a ring round her light at the waist, 100 by 24 at 1.2: its far half behind the light at 0.7, its near half a 4.4 gold cord with a dashed carve weave and a core sheen; four `Bell`s at 0.56 swinging in three groups, a gold knot with a `Ruby` and two larger bells swinging together from it (`swingFrom`); three broken dashed gold arcs of ringing rising off each side (`m-shimmer`). Shloka 16's girdle, seen; this one heard | Inline (`queen-and-girdle.tsx`, using `Bell` and `Ruby`) | Shloka 71 |
| Kubera's mongoose spitting jewels (nakula) | Never Kubera himself: his mongoose, about 115 long at 1.2, facing her with its head raised: an arched `--art-stone` body under a moon wash at 0.25 and turmeric at 0.15 (stone alone was a lizard by lamplight), a bushy tapering tail, ivory fur ticks, a round ear, a vermilion eye; from its mouth a spill of `Ruby`s, `Pearl`s and moon glints, two still in the air, heaped on the floor before her seat | Inline (`queen-and-girdle.tsx`) | Shloka 71 |
| Cloth taking the dye (rañjanī) | A length of `--art-ivory` cloth hung over a turmeric pole on a forked hair-coloured post, its front end down into an ember clay pot of crimson dye (a shimmering vermilion surface): a gradient up the cloth from crimson through vermilion and saffron to ivory, the red climbing; carve folds; the short back end white | Inline (`queen-and-girdle.tsx`) | Shloka 71 |
| A mango bough in spring | A bough coming down from the crown's right edge, `--art-hair` at 0.55 with a gold line: dark `--leaf` mango leaves (lanceolate, gold edge and midrib) and at its tip a drooping flush of young leaves in a crimson-to-ember gradient with core midribs (`m-sway`); a ripe mango (a core-turmeric-saffron-vermilion radial gradient, ivory sheen) hanging on its stalk with a turmeric drop falling (`m-twinkle`); a koel (`--art-hair`, gold-edged, an ivory beak, a vermilion eye, long tail) perched on it, two dashed gold song arcs from its beak | Inline (`queen-and-girdle.tsx`) | Shloka 71 |
| Blue lotuses in profile (nīlotpala) | Two flowers on `--leaf` stalks in a gold bowl of moon water, at 1.25: five long narrow pointed `--art-hair` petals fanned from a leaf-green calyx, the middle one edged `--gold`, the rest `--gold-soft`. Compare the face-on nīlotpala of Shloka 50 | Inline (`queen-and-girdle.tsx`) | Shloka 71 |
| The full moon of Rākā's night (rākā) | A full disc at (470, 98) r 40 in a core-moon-gold-soft radial gradient, gold-edged, in a moon glow, with four gold-soft rings of moonlight fading outward; the `MoonDeer` in it at 0.62. Shloka 5's half moon come round to the full | Inline (`fortune-and-the-full-moon.tsx`, using `MoonDeer`) | Shloka 72 |
| The pair parted by the river (cakravāka) | A river under the card across the night (a moon band at 0.32 with a hair shade at 0.1, fading at both ends, ivory currents and shimmering glitter), and on its two banks one `Cakravaka` each at 1.05, the male flipped to face her; her beak open, three broken dashed gold arcs of calling going out across the water (`m-shimmer`) | Inline (`fortune-and-the-full-moon.tsx`, using `Cakravaka`) | Shloka 72 |
| Moths round her light | Four ivory moths, gold-edged, ember eye-spots on the forewings, a hair body and feelers, set round her light at r 26–36 and turned to it, each on its own `m-sway` | Inline (`fortune-and-the-full-moon.tsx`) | Shloka 72 |
| The rain of golden gooseberries (Kanakadhārā) | Golden āmalaka fruits (a core-turmeric-gold radial gradient with two gold-soft segment lines) falling from her light on `m-sink`, heaped in a poor ember alms bowl with a gold rim and a few spilled before it. Fortune shown as the gift to the house that had nothing, not as Gajalakṣmī (Shloka 25 has the elephants pouring) | Inline (`fortune-and-the-full-moon.tsx`) | Shloka 72 |
| A protective thread tied in a ring (rakṣā) | An ellipse 312 by 68 round the floor: a 3.4 turmeric cord with a 4-4 dashed vermilion cord over it, twisted red and yellow; a vermilion knot at the front with turmeric edge, two tassels (one red, one yellow) with beads | Inline (`fortune-and-the-full-moon.tsx`) | Shloka 72 |
| A cane springing from ash (ratipriyā) | The `Ash` heap with a musk mound, and from it one jointed `--leaf` sugarcane with gold nodes and four long leaves, a bee (turmeric, hair-striped, ivory wings) at its top on `m-sway`. Kāma given back, as the stuff of his bow; compare Kāma reborn as a light (Shloka 34) | Inline (`fortune-and-the-full-moon.tsx`, using `Ash`) | Shloka 72 |
| Two parrots touching beaks | Two `--leaf` parrots, gold-edged, facing each other, vermilion hooked beaks touching, hair and lotus neck-rings, under a small vermilion heart (`m-breathe`). Kāma's mount | Inline (`fortune-and-the-full-moon.tsx`) | Shloka 72 |
| A demon's club broken, and her arrow | An `--art-hair` iron club in two pieces with gold edges, banded haft and pommel, the spiked head turned away; her gold arrow with a vermilion head standing in the ground beside it | Inline (`fortune-and-the-full-moon.tsx`) | Shloka 72 |
| The kāmakalā, as points only | Four marks standing in her light with nothing drawn between them, in a tall kite so they do not make a face: a point above (`--art-core`, a saffron ring), two below it 48 apart (`--art-vermilion`; `--art-moon` with a hair edge), and under those a small downward vermilion triangle for the half-digit, each in a fine gold ring on `m-twinkle` by turns. A crescent for the half-digit, with the points closer, read as a smiling face | Inline (`bulb-of-the-world.tsx`) | Shloka 73 |
| Threads from the dear things (kāmyā) | A heap of gold coins (a stack of five turmeric discs with gold sides, two loose) and a child's silver anklet (a moon ring over a hair shadow, a dashed gold weave, five small bells), each with a dotted gold thread curving to her light (`m-shimmer`) | Inline (`bulb-of-the-world.tsx`) | Shloka 73 |
| A kadamba bough, and a spray laid down | A bough from the crown's right edge at 1.35: an `--art-hair` limb at 0.55 with a gold line and a twig, six `KadambaLeaf`s and three `KadambaHead`s; on the ground before her a small spray of two leaves and two heads laid as an offering | `KadambaBough` (and `KADAMBA_BOUGH_HEADS`) in `primitives.tsx` (promoted at Shloka 74, used by Shloka 73); the laid spray inline | Shloka 73 |
| Pots of sprouting grain (pālikā) | Three small ember pots with a turmeric band and vermilion dots, a musk soil top, each with a fan of eight thin `--leaf` sprouts, alternate ones turmeric-tinged. Grain sown at the start of a wedding or a festival | Inline (`bulb-of-the-world.tsx`) | Shloka 73 |
| The bulb under the soil (kanda) | The ground cut away from y ≈ 570: an ember-to-musk soil fading down and in at the left, dashed carve strata, musk pebbles, a gold surface line; in it a bulb about 50 wide (an ivory-turmeric-ember radial gradient, carve skin lines, a core sheen) with ivory roots, and a `--leaf` shoot rising from it above the ground with two leaves, ending just under her light | Inline (`bulb-of-the-world.tsx`) | Shloka 73 |
| A drop falling into the sea (karuṇārasasāgara) | Beyond the bank the sea to the right edge: a moon-to-gold-soft gradient fading down and to the right, rows of short gold ripple arcs; a moon drop falling into it (`m-sink`) and three flat rings where it lands (`m-shimmer`) | Inline (`bulb-of-the-world.tsx`) | Shloka 73 |
| Kādambarī dripping into a cup | The `KadambaBough` at 1.2 in the crown, and from its lowest head four turmeric drops falling down the right column (`m-sink` by turns) into a gold drinking bowl on a short foot, a saffron surface with an ivory glint (`m-shimmer`) | Inline (`kadamba-wine.tsx`, using `KadambaBough`) | Shloka 74 |
| A lotus turned down like a giving hand (varadā) | Under her light on a `--leaf` stem, five `--lotus` petals hanging open downward with ivory midribs and a leaf-green receptacle, two `Pearl`s falling from it (`m-sink`) to a small heap of six pearls on the floor. A hand in varada mudrā without drawing the hand | Inline (`kadamba-wine.tsx`, using `Pearl`) | Shloka 74 |
| Vāruṇī's jar tipped over | An ember jar about 50 tall lying on its side with gold and dashed turmeric bands, a crimson mouth, an ivory sheen; a crimson stream from its lip into a vermilion-crimson pool 116 by 18 with three core rings moving on it (`m-shimmer`), the pool that will not lie still | Inline (`kadamba-wine.tsx`) | Shloka 74 |
| Wagtails (khañjana), the poets' eyes | Two pied wagtails facing each other, about 55 long: an ivory body, an `--art-hair` back and round head with an ivory eyebrow and cheek stripe and an ivory wing bar, a long thin tail, a dark beak, a core eye, carve legs; each on its own `m-dart` inside its placement group. The first ones were long and flat and read as blades | `Wagtail` in `primitives.tsx` (promoted at Shloka 95, used by Shloka 74) | Shloka 74 |
| A hand mirror (darpaṇa) | A round gold-framed mirror with a dashed turmeric rim, a gold handle with a vermilion stud, leaning; the glass a core-saffron-moon-gold-soft gradient with her light in it (`m-breathe`) and an ivory glint | Inline (`kadamba-wine.tsx`) | Shloka 74 |
| A rudra vīṇā, and its ālāpa | A 256-long ember stem with fourteen gold frets closing toward the right, two gold-soft strings, a gold scroll, ivory beads, tilted 5° so it does not read as a bench; two turmeric-gold gourds (r 22 and 20) hung directly under it. Rising from the strings five broken dotted gold phrases and saffron dots, faint and fading (`m-shimmer`). Compare Sarasvatī's kacchapī (Shloka 11) | Inline (`kadamba-wine.tsx`) | Shloka 74 |
| The Vindhyas, a wall of tablelands | Not peaks: one `through` skyline of flat tables with steep scarps between (the highest in the middle at y ≈ 484), across the plate under the card. `--art-stone` at 0.5 under a saffron-to-ember wash fading down, level `--gold-soft` sandstone beds clipped to the rock, a 1.4 gold skyline, a row of round `--leaf` tree crowns along the lower slopes (core sheen), faded out at both sides by a mask. Compare Himavat's snow peaks (Shlokas 16, 60) | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| Her hill shrine (Vindhyavāsinī) | On the highest table: a turmeric plinth, an `--art-ivory` curved spire about 40 tall with gold-soft courses, a gold finial, a core-filled door with a vermilion arch and her light round it (`m-breathe`), a small vermilion pennant on a gold staff (`m-shimmer`) | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| A stair up from the river (vedavedyā) | A straight flight from a ghat at the river up the scarp to the shrine: an ivory trapezoid narrowing upward (36 wide at the foot to 12), thirteen gold treads, two ivory ghat steps at the water. A zigzag path read as a lightning bolt | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| The four Vedas as palm-leaf books | Four bundles floating out from her light, two a side and nearly level: ivory leaves with turmeric edges between two musk boards the full length, two vermilion cords. Drawn short with end boards, or tilted steeply, they read as bones and railings. Compare the open book on its stand (Shloka 53) | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| A balance: the world against one point of her | Hung from a gold cord in the right column: a gold beam tilted 12° with a turmeric pivot and pointer, gold-soft cords to two turmeric pans; in the higher pan the world, a moon-to-hair orb with two gold-soft orbit rings and core stars; in the lower one point of her light | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| The nine planets on their platform (navagraha) | An ivory platform in perspective with a musk front edge, nine small stones in three rows (stone, turmeric, musk / leaf, vermilion, ivory / carve, moon, crimson), each with a musk shadow | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| Kaṃsa's stone, and the girl's light going away | A flat `--art-stone` slab with a moon top edge, a dashed `--art-hair` chain from it ending in an open fetter; from it a soft saffron trail widening as it climbs toward the hills, three core `glint`s along it (`m-twinkle`) and at its top a small light with a glint | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| Fireflies | Twelve small turmeric `glint`s with core halos over the forest, `m-twinkle` in three groups | Inline (`vindhya-shrine.tsx`) | Shloka 75 |
| A field in perspective, every stage at once (kṣetra) | A trapezoid running back from y ≈ 598 (x 112–528) to y ≈ 456 (x 222–418), cut by musk-and-gold-soft bunds into twelve plots whose inner crossings are nudged by `hash` so it is not a chessboard; each plot at a stage: sprouting (`--leaf` at 0.3, short green ticks in rows), ripe (turmeric at 0.4, taller gold ticks), reaped (ember at 0.2, turmeric stubble), flooded (moon at 0.3, ivory shimmer, a core reflection of her light). Faded at the far edge and the foot by a mask. Musk for the reaped plots went black by lamplight, and moon at 0.55 for the flooded ones grey | Inline (`the-field.tsx`) | Shloka 76 |
| A watch platform (machān) and the fence round it all | In a near plot at 1.3: four `--art-hair` poles with cross-bracing, a turmeric deck under a gabled thatch, the watcher's lamp on it (`m-flicker`, a core glow); round the field a fence just outside its edge: a hair rail with a dashed gold weave, a second dashed rail above, gold posts taller toward the viewer | Inline (`the-field.tsx`) | Shloka 76 |
| A boundary stone with her mark | A round-topped `--art-stone` stone at the field's near left corner, gold-edged, carved with a gold downward triangle and a vermilion point, two carve lines below, a moon sheen | Inline (`the-field.tsx`) | Shloka 76 |
| The field-guardian (kṣetrapāla) and his dog | Outside the fence at the near right: a rough stone daubed with sindūra (a vermilion-to-crimson gradient), two ivory eyes and a moon mouth-line, a hair trident with a vermilion band, a small lamp before it; Bhairava's black dog (`--art-hair`, gold-edged, a pricked ear, a curled tail, a core eye) sitting by it, both turned inward toward her | Inline (`the-field.tsx`) | Shloka 76 |
| The fire maṇḍala (vahnimaṇḍala) | An upward triangle 100 wide and 82 tall under the card, a saffron-to-vermilion fill, a 1.4 gold edge and a core inner triangle at 0.76, fringed outward with sixteen small `tongue` flames in a vermilion-saffron-core gradient (`m-flicker` in three groups); her light seated in it. Compare the rampart of fire (Shloka 27) and the wheeling ring of the dance (Shloka 57) | Inline (`ring-of-fire.tsx`) | Shloka 77 |
| The first vowels going out from her (vāgvādinī) | अ आ इ ई उ in Tiro Devanagari at 19, gold with a fine gold stroke, on an arc of radius 76 above her light (`m-twinkle` in three groups). At 15 unstroked they vanished by day | Inline (`ring-of-fire.tsx`) | Shloka 77 |
| A cow licking her calf (vatsalā) | A white zebu about 110 long facing left, head lowered to the calf: an `--art-ivory` body, hump, dewlap and head, all gold-edged, a turmeric belly shade, curved turmeric horns, a vermilion forehead band, a lotus udder, hair hooves and tail tuft; the calf the same drawing flipped at 0.5, facing her | `Cow` in `primitives.tsx` (promoted at Shloka 94, used by Shloka 77) | Shloka 77 |
| A lotus leaf holding a drop (vimalā) | A round `--leaf` pad 68 by 30 on a moon pool, its notch toward the viewer, gold edge and gold-soft veins from the centre; a water drop in a core-moon-gold-soft gradient with a hair shadow and a twinkling core glint. With the notch at the side it read as a fish | Inline (`ring-of-fire.tsx`) | Shloka 77 |
| A victory banner (vijaya-dhvaja) | A turmeric staff with a gold finial and bead, and a swallow-tailed vermilion banner streaming from it with a dashed turmeric inner border (`m-shimmer`) | Inline (`ring-of-fire.tsx`) | Shloka 77 |
| Grass bending toward her (vandyā) | Eight tufts of five `--leaf` blades along the ground on both sides, every blade curving toward her light | Inline (`ring-of-fire.tsx`) | Shloka 77 |
| A plait down the right column (vāmakeśī) | A `plait` from above the crown down the right column to y ≈ 392, 28 wide narrowing to 17, lobes every 13; on its lobes ivory jasmine buds and every third a five-petalled vermilion flower; a `PlaitTip` at the end. Her hair as the canon allows it | Inline (`ring-of-fire.tsx`, using `plait`, `PlaitLobes` and `PlaitTip`) | Shloka 77 |
| The wish-yielding creeper on its post (kalpalatikā) | Up the right column: a slender turmeric post with gold edges, a base block and a capital carrying a small lamp (`m-flicker`, a core glow); round it a `taper` creeper in `--art-hair` winding side to side, `CreeperLeaf`s on alternate sides, three `creeperTendril`s, and at every third mark a jewel hanging on a gold stalk, a `Ruby` and a `Pearl` by turns. A creeper, not a tree: it needs something to climb | Inline (`loosened-tether.tsx`, using `CreeperLeaf`, `creeperTendril`, `Ruby` and `Pearl`) | Shloka 78 |
| The stake with its rope untied (paśupāśa) | At 1.25: an ember sacrificial stake with a turmeric collar and a gold ring, and a turmeric rope with a carve twist hanging from the ring and lying slack in loops on the ground, its end frayed | Inline (`loosened-tether.tsx`) | Shloka 78 |
| A goat walking free | At 1.25, about 70 long facing right toward her: an `--art-ivory` body and head, gold-edged, a hair saddle patch, backswept hair horns, a drooping ear, a beard, a raised tail, legs in stride with hair hooves | `Goat` in `primitives.tsx` (promoted at Shloka 86, used by Shloka 78) | Shloka 78 |
| Wisps drawn into her light (saṃhṛta) | Three pairs of `taper` strands from the edges (upper left, lower left, upper right) to her light, wavering less as they near her and thinning from 4.4 to nothing, in an `--art-hair` gradient fading to 0 at her (`m-shimmer`). A single smooth strand read as a hill's skyline | Inline (`loosened-tether.tsx`) | Shloka 78 |
| A wheel set rolling (pravartikā) | The `ChariotWheel` (r 22, at 1.25) turned 8°, on a faint carve road, a dashed track behind it, three musk dust puffs (`m-breathe`), three gold-soft motion arcs off its trailing rim (`m-shimmer`). Compare the broken wheel of becoming (Shloka 48) | Inline (`loosened-tether.tsx`, using `ChariotWheel`) | Shloka 78 |
| Ground cracked by heat | A broad ember ellipse (rx 238, ry 52, radial ember gradient) under her light, crossed by mud cracks: a jittered net of points, 7 rows by 16 columns with alternate rows offset, joined along each row and every other step between rows by slightly bent edges, clipped to the ellipse. Outside the moonlight the cracks are a wide faint `--art-vermilion` stroke under a fine `--art-saffron` one (`m-ember`); inside it they are `--gold-soft`. Long runs across the ground read as wood grain | Inline (`moonlight-on-scorched-ground.tsx`) | Shloka 79 |
| Moonlight falling from her (candrikā) | A cone from her light to the ground, an `--art-moon` gradient (0.38 to 0.08) with faint `--gold-soft` edges fading downward, nine `--art-core` motes in it (`m-twinkle`), and an ellipse of moonlight where it lands. She is the moon here; no moon is drawn | Inline (`moonlight-on-scorched-ground.tsx`) | Shloka 79 |
| Night lilies open on a pool (kumuda) | A small `--art-moon` pool with a faint hair shade in the moonlit ground, three notched `--leaf` pads, and two white night lilies (at 1.7 and 1.35): nine pointed `--art-ivory` petals fanned upward, gold-edged, round a `--art-turmeric` heart. The flower that opens to the moon | `NightLily` in `primitives.tsx` (promoted at Shloka 87, used by Shloka 79); the pool and pads inline | Shloka 79 |
| An ascetic's empty seat | At 1.6: a kuśa mat (`--leaf` with turmeric stripes and loose blades), a staff leaning on it (turmeric, gold bands), a brass water pot (kamaṇḍalu: round turmeric body, narrow neck, arched gold handle over the top, spout), and a rosary of fourteen ember beads with a vermilion head bead. A first pot with a lid knob read as a teapot | Inline (`moonlight-on-scorched-ground.tsx`) | Shloka 79 |
| The narrow-waisted altar (vedi) | At 1.55, in plan on the ground: broad at both ends and drawn in at the middle, `--art-turmeric` 0.45 with a gold edge and an inner ivory line, three kuśa blades across it and a vermilion dot at the waist | Inline (`moonlight-on-scorched-ground.tsx`) | Shloka 79 |
| Bats flying off | Three `--art-hair` bats with gold-soft edges (wings scalloped, small ears) at 1.5–2.2, tilted outward toward the lower corners (`m-dart`, staggered). A dark wash in the corners read as grey smudges by daylight and was dropped | Inline (`moonlight-on-scorched-ground.tsx`) | Shloka 79 |
| Her light, bare (citi) | A soft `--art-core` to `--art-glow` radial (r 58, `m-breathe`), four thin `--gold-soft` rings at 16, 30, 46 and 64 fading outward, and a core dot: no rays, no flame, nothing lit by it | Inline (`one-savour.tsx`) | Shloka 80 |
| The Great Bear with Arundhatī (arundhatī-darśana) | In the crown at 1.5: the seven sages as `--art-core` stars with gold edges in small core glows (`m-twinkle`), joined by a dotted `--gold-soft` line, bowl at the left; beside Vasiṣṭha (the sixth) the faint Arundhatī, a 1-unit core dot in a `--art-saffron` ring, and a dashed saffron arc to her from the star before Vasiṣṭha: the faint star found by way of the bright | Inline (`one-savour.tsx`) | Shloka 80 |
| A paring of moon (the gods' cup of soma) | A thin crescent (outer arc r 30, inner arc r 31 between the same points) in `--art-moon` with a gold edge, turned −30°, in a small core glow behind its back. A moon-coloured glow read as a grey disc by lamplight | Inline (`one-savour.tsx`) | Shloka 80 |
| Bees bringing from many flowers to one comb (Chāndogya 6.9) | Three flowers at 1.5 on `--leaf` stems with a leaf: a five-petalled `--art-vermilion` hibiscus with a crimson staminal column, a six-petalled ivory jasmine, a turmeric kadamba ball with ivory filaments. From each a dotted path in a gradient from the flower's colour to `--gold` runs to a wild comb at the right, and on each a bee at 2.2 (turmeric body with hair bands, ivory wings, a hair head; `m-dart`, staggered) carrying a dot of its flower's colour. The comb hangs from an ember bough out of the right edge: a shield of saffron to turmeric honey with carve hex cells and one drop at its tip (`m-sink`) | Inline (`one-savour.tsx`) | Shloka 80 |
| A still point with chevrons turned in (parā, pratyakciti) | At the top of the right column: a 3.4 `--art-core` point with a gold edge in a small core glow, sending nothing out, and round it two rings of `--gold` chevrons (8 at r 30, 12 at r 50), every one pointing in at it. Tapered strokes round a point read as a sunburst, outward | Inline (`levels-of-speech.tsx`) | Shloka 81 |
| A peacock's egg (mayūrāṇḍa-rasa, Bhartṛhari) | An `eggPath` (20 by 27) in an ivory-to-moon gradient with a gold edge and a core highlight, and inside it, clipped and at 0.24, soft patches of leaf, hair, turmeric and vermilion: all the bird's colours present and none yet showing. Concentric patches read as a target | Inline (`levels-of-speech.tsx`, using `eggPath`) | Shloka 81 |
| A flute, unplayed (madhyamā) | A bamboo flute about 112 long lying across the right column, tilted −6°: a turmeric-saffron-ember gradient across its width, gold-edged, two carve nodes, a vermilion binding, a mouth hole and six finger holes in a row, a core sheen. Upright in the column it read as a stick | Inline (`levels-of-speech.tsx`) | Shloka 81 |
| A bell ringing (vaikharī) | The `Bell` (vermilion gem) at 2.4 on `m-sway`, and three pairs of `--gold-soft` arcs going out both sides from its ball (`m-shimmer`) | Inline (`levels-of-speech.tsx`, using `Bell`) | Shloka 81 |
| The swan on the lake of the mind (Mānasa) | The `Swan` at 1.22 heading toward her light on a still lake (rx 238, ry 40, an `--art-moon` radial from 0.22 to nothing, a faint gold-soft inner shore), with three slow dashed ripple rings round her | Inline (`levels-of-speech.tsx`, using `Swan`) | Shloka 81 |
| The vein of his life (prāṇanāḍī) | From her light to Kāmeśa's crescent beside her (the fourth night's `litPart`, r 32, horns up, moon with a 1.4 gold rim over a wide faint moon stroke, in a small core glow), a hanging cubic: a 6-wide `--art-vermilion` vessel at 0.35 with a crimson hairline and a dashed `--art-core` 1.4 line along it, and four core beads of breath on it (`m-twinkle`, staggered) | Inline (`life-vein.tsx`) | Shloka 82 |
| A single flower, noticed (kṛtajña) | A `--leaf` leaf with one ivory `BLOSSOM` at 2 laid on it, and a fine ray from her light landing exactly on it, a gold-soft-to-core gradient, with a core `glint` where it lands (`m-lick`) | Inline (`life-vein.tsx`, using `BLOSSOM`) | Shloka 82 |
| Kāma's bow and arrows laid down | Kāma's light as at Shloka 34 (a `--lotus` disc with a gold ring in a rosy glow, `m-shimmer`), and before it on the ground the `FlowerBow` at 0.8 lying back up, and his five `FlowerArrow`s at 0.5 laid side by side pointing toward her, slightly fanned | Inline (`life-vein.tsx`, using `FlowerBow` and `FlowerArrow`) | Shloka 82 |
| A red lotus brimming, a bee asleep in it (śṛṅgāra) | `OpenLotus` at 0.9 with its heart brimming: a saffron ellipse of nectar with a core sheen, and lying in it a bee (turmeric body with hair bands, ivory wing, hair head). Sleep marks over the bee were cartoonish and were dropped | Inline (`life-vein.tsx`, using `OpenLotus`) | Shloka 82 |
| A drum of heaven sounding, and flowers falling (dundubhi, puṣpavṛṣṭi) | In the top of the right column, a barrel drum 72 long tipped −8°: an ember body gold-edged with a turmeric V-lacing and a vermilion band, ivory heads at both ends, two curved turmeric sticks, and two gold-soft sound arcs off each head (`m-shimmer`). Below it sixteen petals (vermilion, saffron, lotus, ivory) scattered down the column on `m-sink` with varied durations and delays. A pair of kettledrums read as bowls of soup with chopsticks | Inline (`life-vein.tsx`) | Shloka 82 |
| A seat of the goddess in the land (pīṭha) | At the end of a road (a turmeric band fading in from the left), a lumpy stone in a stone-to-musk gradient, gold-edged, daubed nearly all over with `--art-vermilion`, a core dot and sheen, four ivory and saffron `BLOSSOM`s at its foot, and a small vermilion pennant on an ember stick (`m-sway`). A symmetric dome read as a helmet | Inline (`life-vein.tsx`, using `BLOSSOM`) | Shloka 82 |
| A valley far in the hills (Oḍyāṇa) | Four pairs of ridges coming down to a river from both sides, far to near, each lower and nearer the water: `--leaf` fills from 0.1 to 0.28 with `--gold-soft` crest lines, the whole faded out at its edges by an elliptical radial mask; a winding river from a point behind her light, widening toward the viewer, an `--art-moon` gradient (0.1 to 0.3) with ivory current strokes (`m-shimmer`). Hills cut off square at the sides and foot read as an open book | Inline (`secret-rite.tsx`) | Shloka 83 |
| A pedestal (pīṭha) | A moulded stone base in three stages, `--art-stone` with gold edges: a broad foot, a narrower waist with a vermilion band, a top slab with a core sheen and a moon-coloured top, on a faint musk shadow. Her light rests on it | Inline (`secret-rite.tsx`) | Shloka 83 |
| The bindu in the nine triangles (bindumaṇḍala) | In the crown at 2.4: `SRI_TRIANGLES`, the downward ones `--art-vermilion` and the upward ones `--gold`, hair-thin at 0.55, inside a faint gold-soft circle, and the bindu at `SRI_BINDU_V`, a core dot with a vermilion edge in a core-to-vermilion glow (`m-breathe`) | Inline (`secret-rite.tsx`, using `SRI_TRIANGLES`) | Shloka 83 |
| A shrine's doors, shut (rahoyāga) | Down the right column: two door leaves in an ember-crimson-ember gradient with gold-soft panel lines and gold studs, a gold bolt, in a stone frame under a turmeric lintel with a small arched crest and a vermilion dot, at the top of three stone steps. Lamplight shows only as a core line at the seam and a saffron-core strip under the sill (`m-flicker`) | Inline (`secret-rite.tsx`) | Shloka 83 |
| A spouted bell-metal vessel pouring (kiṇḍī, tarpaṇa) | A round-bodied vessel on a flared foot with a narrow neck, a lip, and a curved spout from the shoulder, in a gold-turmeric-ember gradient with carve edges, tipped −38°; from the spout's lip a thin moon stream with a dashed core line (`m-shimmer`) falls onto the pedestal's top, a core glint where it lands | Inline (`secret-rite.tsx`) | Shloka 83 |
| A great bell-metal stage lamp (āṭṭavilakku) | Drawn at 1.2 about its foot, under the card: a flared foot on a gold ellipse with a vermilion band, a turmeric stem tapering up through three gold knobs and a collar, and a wide shallow bowl with a vermilion band, gold rim and saffron oil, a thick ivory wick curling up to the flame. The flame is a tall teardrop in a vermilion-saffron-core gradient with a core heart (`m-flicker`) and her glow round it (`m-breathe`). It stands in a pool of glow-to-turmeric light on stage boards drawn as three dashed gold-soft seams | Inline (`the-stage-lamp.tsx`) | Shloka 84 |
| A Kathakali crown (kirīṭam) on a stool | At 1.18 on a low ember stool in the right column: a great round halo of saffron, vermilion and turmeric rings edged with 28 gold-soft beads and set with 16 core mirrors (some `m-twinkle`), a turmeric dome in front with vermilion bands and a core finial, a gold forehead band with vermilion beads, and a vermilion ear-disc with a core boss at each side | Inline (`the-stage-lamp.tsx`) | Shloka 84 |
| Hand cymbals (ilattālam) | A pair of small gold discs at 1.4, lying on the boards, each with a turmeric boss and a core glint, joined by a vermilion cord | Inline (`the-stage-lamp.tsx`) | Shloka 84 |
| Muddy water clearing round a clearing-nut (kataka) | A deep gold bowl at 1.25 with a vermilion band and turmeric rim, musk water with ember swirls, and round an ember nut a clear moon ellipse (`m-breathe`) in two gold-soft rings | Inline (`the-stage-lamp.tsx`) | Shloka 84 |
| The six limbs of a mantra (ṣaḍaṅga) | Six small ivory discs at 1.25 on a dotted gold-soft ellipse round the flame, each in a core glow (`m-twinkle`, staggered), with its sign: a vermilion heart, a saffron head, a saffron flame-shaped crest, turmeric armour, an eye, a hair-dark spearhead | Inline (`the-stage-lamp.tsx`) | Shloka 84 |
| Six full moons | Across the crown in a shallow arc, y ≈ 36–48: moon discs with gold edges, ivory highlights and faint core haloes (`m-twinkle`, staggered) | Inline (`the-stage-lamp.tsx`) | Shloka 84 |
| The Nityās on the triangle (tithi-nityā) | Fifteen moons on the sides of a downward triangle (circumradius 128, a 1.3 `--gold` edge, a faint saffron field and a `--gold-soft` inner line), five to a side at a tenth, three tenths and so on of each side, nights 1–15 clockwise from the top-left corner, growing from radius 7.3 to 11.5, each turned so its lit side faces the centre (the moon canon: `--art-hair` at 0.3, the `litPart` in `--art-moon`, a gold rim, a small moon glow, `m-twinkle` by turns). She is the sixteenth, at the centre. Paper-coloured discs behind the moons turned into dark buttons by lamplight | Inline (`half-of-his-body.tsx`) | Shloka 85 |
| Her light as half his body (ardhanārī) | One flame-shaped light about 120 tall, its sides drawn in near the tip, split by a gold seam: the viewer's left his, an `--art-moon` to `--art-ivory` gradient with a `--gold-soft` line inside its edge, a row of `--art-ember` rudrākṣa beads edged in musk just outside it, and his crescent (the fourth night's `litPart`, horns up) on the tip; the right hers, `--art-saffron` to `--art-vermilion` with a core line inside its edge and a row of `--art-moon` pearls outside it. One gold outline round both, a core point on the seam (`m-flicker`) and an `--art-glow` glow (`m-breathe`). Three ash bars and a kumkum dot on the halves made it a face | Inline (`half-of-his-body.tsx`) | Shloka 85 |
| A water pot that is never dry (prapā) | An unglazed clay pot at 1.32, about 76 wide: a crimson-vermilion-ember-crimson gradient across it, a gold edge, a dashed ivory band, a musk-dark mouth, an ivory sheen; twenty-six `--art-moon` beads of water edged in gold-soft scattered over the belly (some `m-twinkle`) and three tapering drips, on a twisted turmeric straw ring, over a wet `--art-hair` patch on the ground; a small gold cup of water beside it. The pot set out at a roadside shed for anyone who asks | Inline (`half-of-his-body.tsx`) | Shloka 85 |
| A lamp just blown out (nirvāṇa) | A clay lamp at 1.6 (the crimson-ember gradient, a gold edge, musk oil), an ivory wick with an `--art-ember` glow at its end (`m-breathe`), and one thread of smoke from the wick, a `taper` through a smooth curve widening from 1.2 to 7, `--gold-soft` fading out upward (`m-shimmer`). Drawn through a few points without `through`, it read as a crack | Inline (`half-of-his-body.tsx`) | Shloka 85 |
| The poets' standards, kept apart (upamāna) | The full moon (r 28, a gold rim, a gold-soft limb shade, `MoonDeer` at 0.4 and half opacity, a moon glow) and a red `OpenLotus` at 0.86, at the crown's far right, with nothing near her | Inline (`half-of-his-body.tsx`) | Shloka 85 |
| The parasol of many tiers, for the ruler over rulers (chattrāvalī) | Four `Parasol`s on one gold staff at the crown's right, at 0.7, 0.56, 0.44 and 0.34 from the bottom up, each rim just under the one above's fringe, the staff rising above the top finial and ending below in a short vermilion grip | Inline (`root-nature.tsx`, with `Parasol`) | Shloka 86 |
| The eight quarters, her name known in each | A gold ring on the ground (rx 208, ry 42) with a `glint` at each of the eight quarters (`m-twinkle` by turns) and two small dashed gold arcs rising over each (`m-shimmer`) | Inline (`root-nature.tsx`) | Shloka 86 |
| The unborn she-goat of three colours (ajā, Śvetāśvatara 4.5) | `Goat` without its saddle at 1.5, with an `--art-vermilion` patch on the forequarters (`GOAT_FORE`) and an `--art-hair` patch on the haunch (`GOAT_HIND`), the ivory coat between: red, white and black for the three guṇas. Two kids like her at 0.8 and 0.74 beside her | Inline (`root-nature.tsx`, with `Goat`) | Shloka 86 |
| The fig and the seed broken open (Chāndogya 6.12) | Two halves of a banyan fig cut lengthwise, pear-shaped, an ember-crimson skin edged in gold, ivory flesh with a `--lotus` blush and thirty turmeric seed dots, a leaf stalk, tipped apart; beside them one seed in two turmeric D-shaped halves, hollow ivory inside, tipped open on their lower ends with a faint `--art-core` glow between them and nothing else (`m-breathe`). Two whole ellipse halves side by side read as spectacles | Inline (`root-nature.tsx`) | Shloka 86 |
| A lotus, seen above and below the water (vyaktāvyakta) | A red `OpenLotus` at 0.92 and a leaf pad on the surface of a cut-away pool: a gold waterline, a faint `--leaf` water fading down and out at the sides, dashed gold-soft ripple lines, a musk mud bed; under the surface, at 0.6, the stalks in `--leaf` and the rhizome as four ivory segments edged in turmeric with turmeric nodes and rootlets. A grey `--art-moon` water read as a box, and loose ellipses for the root as pebbles | Inline (`root-nature.tsx`) | Shloka 86 |
| Smoke on the hill, the fire unseen (vyāpti, the logicians' inference) | A hill at the crown's right, peak (452, 112), a `--leaf` fill fading downward with a gold ridge line fading out, a lower foothill over it; a faint saffron-ember glow just at the summit (`m-breathe`), and one thread of smoke going up from it, a wide musk `taper` with a `--gold-soft` one inside, both fading upward (`m-sway`). A round glow behind the peak read as the sun setting | Inline (`moonlight-on-the-lilies.tsx`) | Shloka 87 |
| Wave, foam and bubble, all one water | At a pool's edge the water rising in a curling wave, an `--art-moon`-to-`--leaf` gradient edged in gold-soft with a core line inside its face, ivory flecks of foam at the crest (some `m-twinkle`), and three bubbles at its foot, faint moon discs with a gold-soft rim and a core highlight | Inline (`moonlight-on-the-lilies.tsx`) | Shloka 87 |
| The rope taken for a snake (rajju-sarpa) | One rope lying in an S on the ground, a `StillLamp` at 2.4 by its frayed end with a glow: inside the lamp's reach (a radial mask) it is a turmeric rope with a carve twist and a gold line; beyond it the same path is an `--art-hair` band with a dotted moon line and a rounded head, a snake. No eye, no tongue | Inline (`moonlight-on-the-lilies.tsx`) | Shloka 87 |
| Her light as moonlight on the night lilies (kaumudī) | Her light as a moon-white glow (Shloka 79's gradient) above a pool (an `--art-moon` radial fill and a gold-soft inner line), five Moonlight rings round her, a short path of core dashes on the water below her (`m-twinkle`), three notched pads, and two `NightLily`s at 3 and 2.4, one behind the other, never side by side as a pair of eyes | Inline (`moonlight-on-the-lilies.tsx`, with `NightLily`) | Shloka 87 |
| The sun's unbroken stream of rays into the heart (bhānu-santati) | The sun's full disc (r 24, its two gold rings, 32 `sunRays` alternating vermilion and saffron, a glow) at (456, 100), and seven parallel rays 7 apart from it to a lattice in the right wall of a dark chamber: saffron at the sun fading out by y 250, fading in again from y 420 in gold, so the miniature, with no card over the middle, shows light and not a pole. Inside, the rays go on as core lines to the floor and pool there in a core-saffron glow (`m-breathe`); the lattice is a musk slot with core bars where the rays pass | Inline (`sunlit-heart.tsx`) | Shloka 88 |
| The heart as a dark stone chamber | An arched room in section, about 134 wide and 140 tall: `--art-stone` walls edged in gold with gold-soft courses, the inside a musk-to-hair gradient | Inline (`sunlit-heart.tsx`) | Shloka 88 |
| Śiva's envoy (Śivadūtī) | `trident` at 0.9 tipped 14° forward on a road going up to the right toward a small dark fort (a musk wall with merlons at 0.6), and tied under its prongs with a vermilion cord, a sealed palm-leaf letter: an ivory strip edged in turmeric, two vermilion bands and a vermilion seal. The road is a faint turmeric strip with gold-soft edges and a dashed middle line; filled only, it read as a spotlight | Inline (`sunlit-heart.tsx`, with `Trident`) | Shloka 88 |
| Śiva's offering at her feet | Her `Footprint`s at 1.5, and laid beside them, never under them, his crescent (`litPart(5, 13)` in `--art-moon`, gold-edged, tipped on its side) to the left and two trifoliate `--leaf` bilva leaves to the right. A crescent under the feet with a leaf each side read as a smiling face | Inline (`sunlit-heart.tsx`, with `Footprint`) | Shloka 88 |
| Her light as the liṅga (Śivamūrti) | A round-topped column 34 wide and 58 tall filled with a saffron-core-glow gradient, gold-edged, on a stone pīṭha with its spout to the right, a carve-shaded basin and a lower stone drum, all gold-edged, in a glow (`m-breathe`). No marks on the column | Inline (`sunlit-heart.tsx`) | Shloka 88 |
| A threshold made auspicious | A stone sill about 92 wide, a turmeric band along its top and a row of alternating kumkum and turmeric dots on its face, with a `FullPot` standing on it | Inline (`sunlit-heart.tsx`, with `FullPot`) | Shloka 88 |
| Her light as the pillar without end (aprameyā, after the liṅgodbhava) | A column 30 wide from y 24 to 790, a glow-saffron-core-saffron-glow gradient across it with fine gold edges, in a 104-wide breathing glow (`m-breathe`), the whole faded out at both ends by a mask. Brahmā's `Goose` at 2.2 flying up beside it (`m-sway` on an inner group: a motion class on the group that carries the `transform` attribute replaces the placement and the goose vanished); Viṣṇu's `Boar` at 0.9 tipped 30° nose-down at its foot, ember clods thrown up behind it, a musk hollow where it digs | Inline (`pillar-of-light.tsx`, with `Goose` and `Boar`) | Shloka 89 |
| Two lines of regard, his and hers | Śiva's crescent (`litPart(4, 13)` in `--art-moon`, gold-edged, horns up and tipped 20°) and between it and her light two dotted arcs (`strokeDasharray` 1 5, round caps): his in `--gold` going over, hers in `--art-vermilion` coming back under it (`m-shimmer` out of step). The crescent in a pale disc read as a smiling face | Inline (`pillar-of-light.tsx`) | Shloka 89 |
| The sun and moon gone pale (Kaṭha 5.15) | A sun (r 26, with its inner ring) and a moon (r 15) as faint `--art-hair` discs with gold-soft rims, each lit only on the side that faces her by a core gradient, and three pale hair `glint` stars | Inline (`pillar-of-light.tsx`) | Shloka 89 |
| Words turning back with the mind (Taittirīya 2.4.1) | Two hooked lines rising toward her and curling back before her glow: the eleven vowels अ to औ in `--font-tiro`, gold, smaller and fainter as they climb; and above them fifteen small gold-soft rings of thought, shrinking, on a faint tapering thread (some `m-twinkle`) | Inline (`pillar-of-light.tsx`) | Shloka 89 |
| The seers' lamps raised, and a handful of flowers | Three `Lamp`s at 2.2 with the seers' pale flames in a row; at the pillar's foot seven small flowers of five round petals (vermilion, ivory, saffron, lotus) round turmeric hearts. Pointed `BLOSSOM` petals read as stars at this size | Inline (`pillar-of-light.tsx`, with `Lamp`) | Shloka 89 |
| The seam of night and day (sandhyā) | Across the crown a faint `--art-hair` night wash fading down to one gold line at y 120, a saffron day wash below it fading out by y 230, the whole faded out to the left under the title; six `--gold-soft` `glint` stars in the night part (`m-twinkle`). Hair at 0.34 was a grey block by day | Inline (`dawn-ghat.tsx`) | Shloka 90 |
| The Gāyatrī's twenty-four syllables as floating lamps | Twenty-four `Lamp`s with the gods' flames, each on a small `--leaf` leaf-boat, in three rows of eight on the river, nearer rows larger and wider apart (1.15, 1.45, 1.85; 24, 30, 38 apart) | Inline (`dawn-ghat.tsx`, with `Lamp`) | Shloka 90 |
| A river at dawn, the sun half risen | The rising sun's half disc (r 34, its 16 rays, clipped at the horizon) in a wide glow, over a river from the horizon to the near bank: a saffron-to-moon water, `seaSurface` ripples in gold and its saffron and core light column, faded out at the sides | Inline (`dawn-ghat.tsx`, with `sunRays` and `seaSurface`) | Shloka 90 |
| A lodestone and its filings (jaḍaśakti) | A dark `--art-hair` stone with a gold edge and a gold-soft sheen on a stone step, and the filings as dashed hair lines: four arcs over it from end to end, and three open lines fanning from each end. Filings scattered along the field at points read as grass | Inline (`dawn-ghat.tsx`) | Shloka 90 |
| Stone steps of a ghat | Five treads across the ground from the river's edge down, each an `--art-stone` riser a little denser toward the viewer under a gold edge and a gold-soft line, faded out at the sides | Inline (`dawn-ghat.tsx`) | Shloka 90 |
| Copper water vessels, one pouring (arghya) | Round-bellied vessels (lotā) about 24 tall with a neck and a flared turmeric lip, an ember-turmeric-ember copper gradient, a gold edge and a core sheen, four in a row on a step; a fifth tipped 70° at the water's edge toward the sun, a short moon stream from its mouth and two core rings on the water (`m-shimmer`) | Inline (`dawn-ghat.tsx`) | Shloka 90 |
| The three vyāhṛtis on three levels | भूः, भुवः and स्वः in `--sindura` (`--font-tiro`, 20) one above another up the right side: on the steps, over the water, among the stars | Inline (`dawn-ghat.tsx`) | Shloka 90 |
| Birds waking (cetanā) | Five `Goose`s at 1.3–1.7, mirrored to head right toward the sun and tipped up, wings by turns raised and lowered, rising from a clump of eleven `--leaf` reeds on the far bank | Inline (`dawn-ghat.tsx`, with `Goose`) | Shloka 90 |
| A seat of the thirty-six principles (tattvāsana) | Thirty-six thin tiers 1.7 tall stacked under her, from 124 wide at the top to 270 at the foot: the top eleven (the pure and the veiling principles) `--art-core`, the next seven `--gold`, the next eight `--art-turmeric` and the lowest ten `--art-stone`, each edged in a hair of gold-soft, with a gold line along the top | Inline (`five-sheaths.tsx`) | Shloka 91 |
| The five sheaths (pañcakośa) | Five nested `eggPath`s round her light, from bliss inmost to food outermost: `--lotus`, `--art-saffron`, `--gold`, `--gold-soft` and `--leaf` lines 1.6 wide over a faint fill of the same; each cut open at the front right by a wedge (masks), the outer ones widest (88° down to 24°), so every one shows the one within. One wedge through all five read as a pie with a slice gone | Inline (`five-sheaths.tsx`) | Shloka 91 |
| A boundary broken by her rays (niḥsīma) | A dashed gold ellipse round the ground (rx 204, ry 72), and six gold rays from just outside her sheaths across it, fading out beyond; wherever a ray crosses, the line is broken (a mask) and a core `glint` stands in the gap (`m-twinkle`) | Inline (`five-sheaths.tsx`) | Shloka 91 |
| तत् far and त्वम् near, and the call (tat tvam ayī) | तत् small (15) in `--sindura` far off in the crown in a faint glow; त्वम् large (34) at the front; from it three `--sindura` arcs of a call opening toward her, fainter outward (`m-shimmer` by turns) | Inline (`five-sheaths.tsx`) | Shloka 91 |
| A garland that does not wilt (Nala's gods) | Nineteen round flowers, vermilion and ivory by turns with turmeric hearts, on a leaf-green thread swung across the front of her seat, with core dewdrops on every fourth (`m-twinkle`) | Inline (`five-sheaths.tsx`) | Shloka 91 |
| Her jewelled goblet (ratna-caṣaka) | Sets the Dhyāna's goblet: a gold cup about 32 wide at 1, a deep round bowl on a slim stem and a spread foot, edged in carve, with a band of three `Ruby`s round the bowl and one on the stem; filled to the brim with a crimson-to-vermilion wine, a core gleam on its surface, and one crimson drop running down the side (`m-shimmer`) | Inline (`five-sheaths.tsx`, with `Ruby`) | Shloka 91 |
| Red lotuses for eyes reddened with rapture (madaghūrṇita-raktākṣa) | Two `OpenLotus`es without pads in `--art-vermilion` shaded `--art-crimson`, at 0.8 and 0.68, on tall tapering `--leaf` stalks from one faint `--art-moon` pool, leaning opposite ways (−12° and 14°) and of unequal height so they never pair up; each rocks from its stalk's foot on its own `m-sway` | Inline (`sandal-and-campaka.tsx`, with `OpenLotus`) | Shloka 92 |
| A pāṭala bough (the trumpet-flower), for flushed cheeks | A tapering `--art-musk` bough hanging in from the top right of the crown, with lance `--leaf` leaves edged in gold; seven trumpets about 26 long at 1 on short stalks, each a narrow tube flaring to a lipped mouth, filled `--lotus` to `--art-ivory`, edged and veined in `--art-crimson` at low opacity, a `--leaf` calyx, each nodding on `m-sway` by turns | Inline (`sandal-and-campaka.tsx`) | Shloka 92 |
| Sandal ground on its stone (candana-drava) | A round grinding stone seen at a slant (rx 62 at 1), `--art-stone` with a thickness and a gold rim, wet with a pool of paste (`--art-core` to `--art-turmeric`) and a little `--art-moon` water; on it a sandalwood log, `--art-turmeric` to `--art-ember` with musk grain and a pale cut end showing its rings; beside it a footed gold bowl of the paste. Fragrance is not drawn | Inline (`sandal-and-campaka.tsx`) | Shloka 92 |
| Campaka heaped on a leaf | Seven face-on `Campaka`s at 0.8 to 1.05, squashed a little in height to lie on a slant, heaped on a `--leaf` leaf plate with a gold-soft midrib | Inline (`sandal-and-campaka.tsx`, with `Campaka`) | Shloka 92 |
| Kurukullā at the moat of nectar | Never a figure: an `--art-vermilion` light with a core heart and gold ring in a breathing vermilion glow, far off in the crown over the moat round her city (a faint band of `--art-moon` to `--gold-soft` nectar under `WavePattern`, curving, faded out at both ends, with a gold line along its far edge); beside the light her `FlowerBow` stood upright, string toward her, and one `FlowerArrow` nocked on it, aimed away. A fan of arrows behind the light made a bouquet | Inline (`kula-hollow.tsx`, with `FlowerBow` and `FlowerArrow`) | Shloka 93 |
| The kula hollow (kulakuṇḍa) | A round pit seen a little from above (rx 62): an `--art-stone` rim edged in gold round a hollow shaded `--art-musk`; inside, the power coiled asleep (`coilPath`, 44 narrowing to 22, its inner end turning down to the centre, not rising, drawn as a `Coil`) in a saffron glow, and her light at its centre, the opening of the channel, rising out of the pit as a tall soft glow | Inline (`kula-hollow.tsx`, with `coilPath` and `Coil`) | Shloka 93 |
| The Kaula path | A path coming up from the front to the kula, two dashed gold edges widening toward us over a faint gold-soft tread, and on it, one behind the other, four `Lamp`s growing from 1.2 to 2.25: those set on the path | Inline (`kula-hollow.tsx`, with `Lamp`) | Shloka 93 |
| Kuśa cut and tied, and the kuśa ring (pavitra) | Nine blades of kuśa, `--leaf` and `--art-turmeric` by turns, cut square at one end and fanning to their tips at the other, tied with two turns of turmeric, on a faint musk shadow; beside it a small ring of kuśa (a `--leaf` ellipse with a gold hairline) with its two ends standing up | Inline (`kula-hollow.tsx`) | Shloka 93 |
| Śirīṣa, the softest flower | A thin `--art-musk` sprig with three powder-puff flowers, each 23 fine filaments fanned upward from a `--leaf` calyx, `--art-ivory` at the base to `--lotus` tips with a lotus dot at each, swaying by turns, and one feathery leaf of paired `--leaf` leaflets | Inline (`kula-hollow.tsx`) | Shloka 93 |
| Kumāra (Skanda) | Never a figure: a small `--art-saffron` light with a gold ring in a saffron glow, ringed by the six Kṛttikā stars who fostered him (core `glint`s edged in gold, `m-twinkle` by turns), and standing beside it his spear (vel): a gold shaft with a broad leaf-shaped `--art-core` blade edged in gold and a vermilion binding under it | Inline (`mother-of-two-sons.tsx`) | Shloka 94 |
| Gaṇeśa, as her son | His light ruddy as the dawn (`DawnDefs`, a vermilion disc with a saffron highlight and gold ring), without his ring of ten things, and his `Mouse` facing it on the ground at its foot | Inline (`mother-of-two-sons.tsx`, with `DawnDefs` and `Mouse`) | Shloka 94 |
| A mountain, the unmoving (acala) | A peak in the crown, `--gold-soft` fading out downward under a gold edge that fades with it, a lower shoulder each side, faint ridge lines, `--art-ivory` snow on the two summits edged in gold. Steadfastness, and her father's house as Pārvatī | Inline (`mother-of-two-sons.tsx`) | Shloka 94 |
| A ripe sheaf of rice (puṣṭi) | Nine `--art-turmeric` stalks gathered at the foot and fanning out, tied at the waist with a `--leaf` band, each ear bowed over with five turmeric grains edged in gold | Inline (`mother-of-two-sons.tsx`) | Shloka 94 |
| Svastika drawn on the ground (svasti) | A right-turning svastika in `--art-vermilion` 3 wide, flattened to lie on the ground (1.3 by 0.55), with a turmeric dot edged in gold in each quarter | Inline (`mother-of-two-sons.tsx`) | Shloka 94 |
| A still pool (śānti) | A small pool in an `--art-stone` kerb edged in gold-soft, `--art-moon` water, and her light lying in it unbroken: one core streak in a faint core halo, no ripples | Inline (`mother-of-two-sons.tsx`) | Shloka 94 |
| A pot full to the brim (tuṣṭi) | A round `--art-ember` earthen pot edged in gold with a turmeric band, its mouth an `--art-ivory` surface of milk level with the rim and a core sheen, nothing spilling | Inline (`mother-of-two-sons.tsx`) | Shloka 94 |
| Her three eyes: moon, sun, and fire between (trinayanā) | Never as eyes, and never two round things level with a third between or above them: set out on a slant across the crown, falling left to right and each a different size, an `--art-moon` full moon (r 14, gold-edged, an ivory highlight, a moon glow), a tall upright tongue of fire (`tongue(60, 20)`, vermilion to saffron to core, edged in gold, with a core tongue inside, `m-flicker`, in a saffron glow), and a saffron sun (r 22, a core heart, twelve short saffron rays, in a breathing glow) | Inline (`fire-and-the-garland.tsx`) | Shloka 95 |
| Her light, burning (tejas) | Thirteen `tongue`s of flame round the upper part of her light, rising rather than radiating (each turned a quarter of the way out), tallest at the top, on a vermilion-to-saffron-to-core gradient (`m-flicker` by turns). Tongues pointing straight out all round made a second sun | Inline (`fire-and-the-garland.tsx`) | Shloka 95 |
| The garland of letters (Mālinī) | A `--leaf` thread sagging across the middle, with thirteen letters of the Mālinī order (न ऋ ॠ ऌ ॡ थ च ध ई ण उ ऊ ब, the vowels and consonants interwoven) hung on it as beads, each in `--sindura` (Tiro Devanagari, 17) on a faint core disc edged in gold, and between them a `BLOSSOM`, `--lotus` and `--art-saffron` by turns | Inline (`fire-and-the-garland.tsx`, with `BLOSSOM`) | Shloka 95 |
| The plain word: माता | The word alone in `--sindura` (Tiro Devanagari, 40) at the front, with nothing round it | Inline (`fire-and-the-garland.tsx`) | Shloka 95 |
| The hills of Malaya and their sandal trees | Two ranges of low rounded `--leaf` hills at the right, far and near, each fading downward under a faint gold ridge line, with six sandal trees on their slopes: a short `--art-musk` trunk under a crown of three `--leaf` ellipses dotted with two `--art-crimson` berries, swaying | Inline (`fire-and-the-garland.tsx`) | Shloka 95 |

When all four weapons appear together, the upper hands hold the noose (left) and the goad
(right), as in Shloka 2, and the lower hands hold the bow (left) and the arrows (right).

### Anticipated

Not yet drawn. Whoever draws one first sets its canon here.

- **Kāma's fish banner (mīna-ketana).** Shloka 6's commentary gives Kāma both the archway and the
  fish flag; the artwork draws only the fish. If his banner is drawn, fly the Shloka 6 fish on it.
- **Her other hand-held things.** The Dhyāna names, but doesn't draw, the red water-lily of its
  first verse, the golden lotus of its third, and her red garland (its jewelled goblet is drawn
  at Shloka 91, and her three eyes at Shloka 95). Whoever draws one first sets its canon.

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

### Shloka 49: No division, no death, no act

- **Component:** `rivers-to-the-sea.tsx` (defs prefix `sa49`)
- **Composition:** a cycle of water drawn round the card, after the Kaṭha Upaniṣad (4.14–15: rain
  on a peak runs off every way; water poured into water becomes that water) and the Chāndogya
  (6.10: rivers in the sea no longer know which they were). In the crown a rain cloud stands over
  one peak, and the rain runs off it in rills. Two of them become rivers, a white one down the left
  of the card and a dark one down the right, meandering, each with its name written along it.
  Below the card they enter one sea, their names breaking off and their colours lost. Her light
  hangs low over the sea, the far water round it without a ripple and its reflection trembling
  below. Offering lamps on leaf boats ride the dark river out past her; on the bank of the white
  one a ripe cucumber lies below the stalk it came away from. Beside the cloud, the sky-flower.
- **Name → part:**
  - Nirvikalpā → `calm`: the still band of the far sea
  - Nirābādhā → `light`: her light, its glow and rays
  - Nirbhedā → `sea`: the horizon and the ripples
  - Bhedanāśinī → `mouths`: the rivers' names and the spread of their colours in the sea
  - Nirnāśā → `cloud`: the cloud and its rain, the sea's water come back
  - Mṛtyumathanī → `vine`: the cucumber vine and the ripe fruit come away (the *tryambaka* verse,
    Ṛgveda 7.59.12)
  - Niṣkriyā → `reflection`: her reflection in the water
  - Niṣparigrahā → `boats`: the offering lamps going on past her
  - Intro, *peak* → `peak`; *rivers* → `rivers`
  - Detail → `sky-flower`: Patañjali's commentators' example of a *vikalpa*, a word with nothing
    behind it
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow and rays, the rain, the light on the water), `m-breathe` (her
  light), `m-twinkle` (the reflection, the glints under the boats), `m-flicker` (the lamps).
- **Notes:** This title stays on one line and reaches only x ≈ 78 (130 at 1100px) at y ≈ 74–141,
  so the crown is free from x ≈ 140. The sea (`seaSurface`) and the rain (`rainGroups`) were
  promoted into `primitives.tsx`, and Shlokas 2 and 18 render byte-for-byte as before. The rivers
  were first smooth bands of constant width without the wave pattern; with the peak too faint to
  read, the white one looked like a tusk and the pair like a glass bulb. They meander now and carry
  the miniature painters' water. The peak's fill first ended in a hard block at the right; it fades
  out below the card's top now. In the chant miniature the two rivers, the peak and her light on
  the sea carry it.

### Shloka 50: The end of the negations, and Durgā

- **Component:** `hill-fort.tsx` (defs prefix `sa50`)
- **Composition:** a hill fort, the stronghold Manu ranks first of six (7.70–71), drawn whole on
  its rock. The walls run across the picture just below the card, a round bastion with a kiosk at
  each end, and her light is inside the open gate at their centre, its rays rising only above the
  walls. Under them a sheer, cracked scarp stands on a talus slope; the way up crosses the slope in
  switchbacks that narrow as they climb and then takes a stair cut slantwise up the face to the
  gate. To the right her spear has struck into a dark cleft in the scarp, the dark breaking away
  in shards, and three jets of a spring burst from the place it struck into a pool at the foot of
  the face, running on down the slope. Over the gate hangs a garland of blue lotuses, and the
  night jasmine of Indra's garden comes down into it from a bough in the crown (Saundaryalaharī
  43). Beside the fall of flowers a balance hangs level with both pans empty. The first artwork to
  set her in a building, and the first since Shloka 22 to draw walls.
- **Name → part:**
  - Nistulā → `scales`: the balance (`Balance` at 0.4, level, with both insides drawn and no sway)
  - Nīlacikurā → `garland`: the blue-lotus garland and its ends, the bough and its falling flowers
  - Nirapāyā → `walls`: curtain, bastions with their kiosks, towers and gatehouse
  - Niratyayā → `gate`: the folded doors, the threshold and the bar laid down
  - Durlabhā → `light`: her glow, the doorway, the rays above the walls and the light on the
    threshold
  - Durgamā → `path`: the switchbacks and the stair
  - Durgā → `crag`: scarp, talus, cracks and stones
  - Duḥkhahantrī → `spear`: the spear, the cleft and the falling shards
  - Sukhapradā → `spring`: the jets, the pool and the runnel
  - Intro, *walls* → `walls`; *crag* → `crag`
  - Detail → `lion`: the Durgā of the Devī Māhātmya rides a lion; Shloka 1's `Lion` at 0.36,
    mirrored, has sat down beside her gate
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow and rays, the struck place, the jets and spray), `m-breathe`
  (her light in the doorway), `m-sway` (the falling flowers), `m-sink` (the shards), and the
  spear's own `m-flicker` and `m-lick`.
- **Notes:** This title stays on one line and reaches x ≈ 240 (292 at 1100px) at y ≈ 74–141, so
  the bough stays above y ≈ 70 and the flowers fall right of x ≈ 300. The balance was promoted into
  `primitives.tsx` (`balance`, `Balance`, `BALANCE_PAN`, `balanceSwing`), and Shloka 9 renders
  byte-for-byte as before. The first crag was a flat trapezoid with eight even switchbacks across
  it, and read as a table with a zigzag ribbon on it; then its face was even columns, which read as
  organ pipes. It is now a stepped scarp of cracks and facets over a talus, the switchbacks on the
  talus only. The spring was first one sheet under the wave pattern into an oval pool, and read as
  a tap over a sink. The falling flowers first crossed the end of the title. In the chant miniature
  the walls and the lit gate carry it.

### Shloka 51: Thick compassion

- **Component:** `monsoon-pool.tsx` (defs prefix `sa51`)
- **Composition:** a monsoon. One dense rain cloud is heaped over the whole sky, down both flanks
  to a flat foot just under the card, its belly darkening toward the foot and lit gold where her
  light shines up into it, and rain falls in sheets from it to the ground. Her light hangs low
  over a forest pool beneath, and on its far bank a tiger and a spotted deer drink head to head,
  their muzzles either side of her reflection. An owl sits on a bough nearest her with its eyes
  shut, and a pearl lies in an open shell in the shallows. One flash of lightning runs down the
  cloud's right flank, and in the crown the sun and the moon are behind the cloud, small lobes
  rolling across both. The first artwork to make a cloud the whole sky, and the first to draw
  animals of prey and predator side by side.
- **Name → part:**
  - Duṣṭadūrā → `owl`: the owl with its eyes shut, its bough and twigs
  - Durācāraśamanī → `drinking`: the tiger and the deer
  - Doṣavarjitā → `pearl`: the open shell and the pearl
  - Sarvajñā → `lightning`: the bolt and its fork
  - Sāndrakaruṇā → `cloud`: the cloud and its rain
  - Samānādhikavarjitā → `veiled`: the sun, the moon and the lobes in front of them
  - Intro, *pool* → `pool`; *light* → `light`
  - Detail → `cataka`: the cātaka drinks only rain, and is in the same Bhartṛhari verse as the
    owl; a drop is falling straight into its beak
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow, one group of rain), `m-breathe` (her light), `m-flicker`
  (the lightning), `m-twinkle` (the rain rings, her reflection, the pearl's glint and the drop).
- **Notes:** This title stays on one line and stays left of the artwork. The rain cloud was
  promoted into `primitives.tsx` (`CloudLobes`, `cloudArc`, `Lobe`), and Shloka 49 renders
  byte-for-byte as before. The first cloud was a symmetric arch of `--art-moon` that glared white
  by lamplight; it is heaped off-centre now, with an `--art-carve` wash and a belly gradient over
  it. The first tiger was too yellow and read as a lioness. The sun and the moon first had only
  their veiling lobes and read as two little puffs of cloud; they have their rims, the sun's glow,
  the moon's ring and its deer now. The first cātaka was a tilted muddle; it is upright on the reed
  with its head back. The pearl was too small to find and is at 1.4 now. In the chant miniature
  the cloud's arch and the two animals under her light carry it.

### Shloka 52: All powers, all mantras

- **Component:** `letter-rosary.tsx` (defs prefix `sa52`)
- **Composition:** a rosary of the fifty letters, अ to क्ष, strung round the whole picture: up
  the left side, over the crown and down the right, closing at a gold meru bead and its tassel
  below the focal zone. Inside it everything is turned toward her light. Sparks of her own form
  are thrown up out of it in a fountain; a conch at the left sounds toward her; a single haṃsa
  flies in from the right; under her a footstool, and before it on the floor the crowns of Brahmā,
  Viṣṇu and Indra; at the lower left a nugget of gold among the ornaments made of it. The first
  artwork framed whole by one element, and the first to write out the alphabet.
- **Name → part:**
  - Sarvaśaktimayī → `sparks`: the sparks
  - Sarvamaṅgalā → `conch`: the conch and its sound
  - Sadgatipradā → `hamsa`: the haṃsa and its course
  - Sarveśvarī → `crowns`: the three crowns and her footstool
  - Sarvamayī → `gold`: the nugget and the ornaments
  - Sarvamantrasvarūpiṇī → `mantra`: the fifty lettered beads and their thread
  - Intro, *rosary* → `mantra`; *light* → `light`
  - Detail → `meru`: the meru bead sits between अ and क्ष, the first letter and the last, and
    the tradition hears *akṣamālā* as the garland from *a* to *kṣa*
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow), `m-breathe` (her light), `m-twinkle` (the sparks, the sound
  arcs, the nugget's and the meru's glints).
- **Notes:** This title stays on one line and stays left of the artwork. The haṃsa in flight was
  promoted into `primitives.tsx` (`Goose`), and Shloka 11 renders byte-for-byte as before. The
  sparks first had trails and read as tadpoles, and then, scattered at random, bunched at her
  sides; they fly along seven arcs now. Mahāgaṇapati's conch scaled up read as a lemon, so the
  conch is drawn in its own right. The footstool first sat behind the crowns and read as a table
  they stood on; it is under her light now, with feet. The gold first crowded the beads at the
  lower right. In the chant miniature the ring of beads and her light carry it.

### Shloka 53: From all the diagrams and all the scriptures to the beloved of the gracious one

- **Component:** `gracious-one.tsx` (defs prefix `sa53`)
- **Composition:** a sanctum floor, the verse's descent from everything to kindness. Her light
  stands over the bindu of a yantra drawn in rice flour on the floor, its radiance above it and
  flagstone lines going back. Nandī lies at the left in profile, facing her; at the right a
  palm-leaf tantra lies open on its stand; in front, Rudra's bow lies unstrung under a jasmine
  garland. In the crown, right of the title, ॐ stands over the card with the stages of its sound
  rising from it and fading into nothing, and a bilva bough with its fruit comes down from the top
  corner. The first floor drawn in perspective with a yantra laid on it, and the first ॐ.
- **Name → part:**
  - Sarvayantrātmikā → `yantra`: the yantra on the floor and its bindu
  - Sarvatantrarūpā → `tantra`: the palm-leaf book and its stand
  - Manonmanī → `nada`: ॐ, the thread of its sound and its fading stages, the stars
  - Māheśvarī → `nandi`: the bull
  - Mahādevī → `light`: her light, radiance, glow and floor
  - Mahālakṣmīḥ → `bilva`: the bilva bough, its leaves and fruit
  - Mṛḍapriyā → `bow`: the unstrung bow, its string and the garland
  - Intro, *diagram* → `yantra`
  - Detail → `ear`: a jasmine at Nandī's ear and three small arcs going in: people whisper their
    prayers into the bull's ear for him to carry in
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow and radiance, the thread of sound), `m-breathe` (her light),
  `m-twinkle` (the stars and the whisper).
- **Notes:** This title wraps to two lines at y ≈ 40–137, the second reaching x ≈ 332, so the
  ladder of sound stands at x ≈ 430 and the bough is kept to the top right corner. Shloka 25 had
  already drawn Śrī's elephants pouring over her, so Mahālakṣmī is the bilva instead, the tree the
  Śrī Sūkta says was born of her tapas (6) and whose leaves are Śiva's. The ladder was first a
  bindu, a crescent and a wavering thread at x ≈ 320, under the title, and read as incense smoke;
  it is ॐ and a straight thread now. Nandī was first drawn from behind and read as a person in a
  shawl, then in profile with tall horns and read as a goat. The bow was first short and turmeric
  and read as a banana; the book in turmeric read as gold bars. In the chant miniature her light
  over the yantra carries it.

### Shloka 54: Seven great-names, from mortal sin to the great delight

- **Component:** `one-in-many-pots.tsx` (defs prefix `sa54`)
- **Composition:** a lake at night, everything on it moving toward her or out from her. Her light
  stands on a white lotus among its pads in the middle of the still water, just under the card,
  with rings spreading from it to both banks and her light lying on the water in a column to the
  near bank. Flowers and leaf-cup lamps drift to her from every corner of the lake. At the left a
  pair of cakravākas float together, a small red heart between them; at the right a reed tuft
  burns at its plume. On the near bank, ghat steps carry nine vessels, six small clay pots on the
  upper tread and two brass lotas and a large pot on the lower, each holding her whole light. The
  Milky Way rises from the far shore beside the card and arches through the crown, its bright
  centre over the card, and out of the top. The first night sky with the galaxy in it, and the
  first ghat.
- **Name → part:**
  - Mahārūpā → `sky`: the Milky Way, its stars, the open sky's stars and their glints in the water
  - Mahāpūjyā → `offerings`: the drifting flowers and lamps
  - Mahāpātakanāśinī → `reed`: the burning reed tuft, its flames and ash
  - Mahāmāyā → `pots`: the nine vessels and the steps they stand on
  - Mahāsattvā → `lotus`: the white lotus and the pads round it
  - Mahāśaktiḥ → `ripples`: the lake itself, its far shore, level lines, the rings and her light
    on the water
  - Mahāratiḥ → `birds`: the cakravāka pair and the heart
  - Intro, *light* → `light`: her glow and bindu; *vessels* → `pots`
  - Detail → `siva`: on the nearest pot शिव, with its i-sign lit: without the i, which is Śakti,
    śiva is śava, a corpse
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow, the galaxy's centre, every other ring), `m-breathe` (her
  light, the vessels' lights, the heart, the lit i), `m-twinkle` (stars, her light on the water,
  the flowers, the ash), `m-flicker` (the reed's flames, the lamps).
- **Notes:** This title wraps to two lines, like 53's, but its second line reaches only x ≈ 104
  (156 at 1100px), so the galaxy is free to come in from the right; its end fades out by x ≈ 370,
  and the card sits at y ≈ 225–438, leaving only y ≈ 440–564 for the lake. The first draft put the
  lake and pots in a thin band with nothing below and a straight smear of galaxy along the top;
  the steps and the arch fill it now. The galaxy was first five widths and a solid rift and read
  as a rainbow by day and a quill by lamplight. The cakravākas were first flat and small-headed and
  read as slippers. The pads are plain, not `LotusLeaf`, whose standing beads belong to the leaf
  that water does not wet. The still-water lines are drawn inline as in Shlokas 20, 43 and 51. In the chant
  miniature the glow on the lotus and the bright row of pots carry it.

### Shloka 55: Six goods of practice, and the sovereign of those who obtain them

- **Component:** `stair-of-attainment.tsx` (defs prefix `sa55`)
- **Composition:** a temple stair seen from the front, the verse's list of prizes laid out on
  the way up to her. Eight steps, each with a steady lamp on the parapet at its sides, narrow to a
  landing at a sanctum door, and her light stands on the landing with its radiance, a clear
  crystal on her left and a banana leaf of food offered to her on her right. A lion and an
  elephant sit on the plinths at the stair's foot, and on the ground before it three pairs of
  sandals have been left. In the crown, right of the title, two royal fly-whisks cross over the
  door, bound by a clasp of eight pearls. The first stair climbed toward her, and the first
  insignia without a throne.
- **Name → part:**
  - Mahābhogā → `feast`: the banana leaf and what is on it
  - Mahaiśvaryā → `camaras`: the crossed whisks, the clasp and its eight pearls, the glow behind
  - Mahāvīryā → `lion`: the lion
  - Mahābalā → `elephant`: the elephant (Yoga Sūtra 3.24)
  - Mahābuddhiḥ → `crystal`: the crystal and the colours it throws (Yoga Sūtra 1.41)
  - Mahāsiddhiḥ → `stair`: the steps, landing, parapets, lamps, plinths, door and ground
  - Mahāyogeśvareśvarī → `sandals`: the three pairs of sandals of the three lineages of masters
  - Intro, *temple stair* → `stair`; *light* → `light`: her light, its glow and radiance
  - Detail → `mouse`: Gaṇeśa's mouse coming down with a sweet, since Siddhi and Buddhi, side by
    side in this verse, are his two wives
- **Palette:** no additions.
- **Motion:** `m-shimmer` (her glow and radiance, the crown's glow), `m-breathe` (her light, the
  crystal's glow), `m-twinkle` (the pearls and the collars' jewels).
- **Notes:** This title wraps to two lines, the second reaching x ≈ 187 (239 at 1100px) at
  y ≈ 122–189, so the whisks cross at x 320 with their plumes kept above y ≈ 120 on the left. The
  whisks were first blunt ovals and read as racquets, then broad at the end and read as brooms,
  then drooped too far and read as wings (the left one reaching the title at 1100px). The sanctum
  door, under the card on the page, was added so the plate does not fall into two pieces. The lamps
  are `StillLamp`s, so the stair adds no flicker. In the chant miniature the crossed whisks and the
  lit stair carry it.

### Shloka 56: The great tantra, the great mantra, the great diagram

- **Component:** `great-yantra.tsx` (defs prefix `sa56`)
- **Composition:** the apparatus of her worship in the verse's order, every piece of it hers: a
  shrine pavilion seen from the front. In the crown a red canopy is stretched on four posts, its
  warp running through the cloth in plain sight and hanging from the rod as a knotted fringe, and
  three festoons of lights hang from its edge. Below the card the Śrīcakra stands face-on in a gold
  plate on a low lion throne with a jewelled arch behind it, all on a dais, and her light sits in
  its bindu. Red flowers lie one in each enclosure on a thread of light winding in from the front
  gate. At the left Bhairava's trident is planted with his drum hanging from it, his dog asleep at
  its foot; at the right his skull-bowl is heaped with flowers. On the ground before the dais the
  five offerings stand in their order. The first Śrīcakra drawn flat and face-on, the first
  canopy, and the first shrine seen whole.
- **Name → part:**
  - Mahātantrā → `tantra`: the canopy, its warp and fringe, rod and posts (Saundaryalaharī 31)
  - Mahāmantrā → `mantra`: the three festoons, their fifteen lights and the three ह्रीं discs
  - Mahāyantrā → `yantra`: the plate and the Śrīcakra cut in it
  - Mahāsanā → `seat`: the throne, its lions and arch, and the dais
  - Mahāyāgakramārādhyā → `krama`: the flowers in the enclosures, their thread, and the five
    offerings in a row
  - Mahābhairavapūjitā → `bhairava`: the planted trident and drum, the skull-bowl of flowers
  - Intro, *diagram* → `yantra`; *light* → `light`: her bindu, its glow and the great glow
  - Detail → `dog`: Bhairava's dog asleep at the trident's foot, with nothing to guard while its
    master worships
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the glows, the canopy's under-light, the lamp), `m-breathe` (her
  bindu, the incense's embers), `m-twinkle` (the mantra's lights).
- **Notes:** This title wraps to two lines, but its second line reaches only x ≈ 65 (117 at
  1100px), so the canopy takes the whole crown; its left rod knob is kept at x ≈ 132. The yantra is
  drawn at 2.2 so its triangles clear the card's lower edge with the bindu at y ≈ 503; the upper
  plate and the arch are behind the card on the page and are seen on the plate. The canopy was
  first hung on cords alone, steep, and read as a lampshade; it stands on posts now, flatter and
  sagging. Its cloth in turmeric went khaki by lamplight and diluted vermilion went salmon by day.
  Without the arch the plate fell into two pieces, canopy and shrine. Śaṅkara's trident and drum
  were promoted into `primitives.tsx` (`trident`, `Trident`, `Damaru`), and Shloka 43 renders
  byte-for-byte as before. In the chant miniature the red canopy and the lit plate under it carry
  it.

### Shloka 57: Witness of the dance at the end of the world

- **Component:** `witness-of-the-dance.tsx` (defs prefix `sa57`)
- **Composition:** the great dissolution as Śiva's dance, with no dancer drawn. A ring of fire,
  tilted a little, wheels round the card, its crests thrown back against the turn, carrying world-eggs
  and the lotus, discus and thunderbolt of the gods who ran them into the fire. At the upper right,
  clear of the title, the drum of the dance is being shaken, its beads flung against both heads, and
  above it hang the beats it has sounded. Below the card, inside the ring and untouched by it, one
  throne for two: his seat empty under his crescent, because he is the one dancing, and on hers her
  light, perfectly still. Cities of gold and silver stand either side of the throne, and the iron
  city below the ring on a field of ash, all that the fire leaves. The first ring of fire to frame
  the whole card, the first scene with an empty seat, and the first ground of ash.
- **Name → part:**
  - Maheśvaramahākalpamahātāṇḍavasākṣiṇī → `dance`: the ring of fire, its licks and sparks, the
    drum, its bead cords and its sound
  - Mahākāmeśamahiṣī → `throne`: the throne for two, his crescent, the cushions
  - Mahātripurasundarī → `cities`: the cities of gold, silver and iron and the triangle between them
  - Intro, *worlds* → `worlds`: the eggs and emblems in the fire, and the field of ash;
    *light* → `light`: her light on her seat and its glow
  - Detail → `beats`: nine beats and then five, the fourteen strokes of the drum at the end of the
    dance from which the fourteen Māheśvara sūtras that open Pāṇini came (Nandikeśvara's Kāśikā 1)
- **Palette:** no additions.
- **Motion:** `m-lick` (the licks off the crests), `m-twinkle` (the beats and the drum's sound),
  `m-ember` (sparks off the fire). Her light does not move, on purpose: it is the one still thing.
- **Notes:** This title stays on one line, reaching x ≈ 374 (426 at 1100px) at y ≈ 74–141, so the
  drum sits at x ≈ 490, y ≈ 106, and the beats arc above y ≈ 66, right of the title's end; the
  ring's top crests are cut to half height to stay below it. The first fire was 64 separate raked
  tongues with gaps, which read as a laurel wreath; then continuous bands with one long crest shape,
  which read as saw teeth or feathers, until the tall-short-middling rhythm. The throne was first two
  arched panels, which read as doorways. The `Ash` clouds as a ground read as smudges, so the ash is
  a field with drifts, heaps and cinders. The world-egg (`eggPath`) and Indra's thunderbolt (`Vajra`)
  were promoted into `primitives.tsx`, and `Damaru` gained `hung={false}`; Shlokas 3, 33, 43 and 56
  render byte-for-byte as before. In the chant miniature the ring of fire and the lit throne inside
  it carry it.

### Shloka 58: The yoginī temple

- **Component:** `yogini-temple.tsx` (defs prefix `sa58`)
- **Composition:** one number said three times, drawn where the third sixty-four was worshipped. Below
  the card a round yoginī temple, roofless as at Hirapur and Bheraghat, seen from in front and a
  little above, with its one door at the front and young paddy round it. Every niche of its far wall
  holds a yoginī as a small flame facing the centre. In the middle her light stands on a round seat
  under the royal parasol, with the mirror and the fan held up either side, the last of the
  services; round her on the floor lie eight of the sixty-four arts. In the crown, right of the
  title, flocks of lights wheel in a ring in the sky, and two peel off and come down for the open
  roof, while a soft glow rises out of the court to meet them. The first temple seen whole from
  outside, and the first flocks.
- **Name → part:**
  - Catuḥṣaṣṭyupacārāḍhyā → `services`: the parasol and its staff, the mirror, the fan
  - Catuḥṣaṣṭikalāmayī → `arts`: the eight emblems on the floor
  - Mahācatuḥṣaṣṭikoṭiyoginīgaṇasevitā → `yoginis`: the flames in the niches, the flocks, the wheel
    and the ways down
  - Intro, *yoginī temple* → `temple`: the wall, floor, niches, porch, steps and paddy;
    *light* → `light`: her light, its seat and cushion, her glow and the glow rising from the court
  - Detail → `moon`: one thin digit of the moon inside the wheel of flocks, a kalā like the arts of
    the second name
- **Palette:** no additions.
- **Motion:** `m-breathe` (the flames in the niches), `m-twinkle` (the flocks), `m-shimmer` (her
  glow).
- **Notes:** This title stays on one line, reaching x ≈ 162 (214 at 1100px) at y ≈ 74–141, so the
  wheel of flocks sits right of it (x ≈ 238–570, y ≈ 44–148). The temple was first a low wall with
  pilasters and read as a tray behind a fence; it has a thick rim, a plinth and coping and blind
  niches now. The flocks were first acute V's and read as the letter V, then each light had a trail
  and they read as tadpoles. A trapezoid path from the door read as a spotlight beam and went. The
  plate fell into a sky piece and a temple piece until two flocks came down dashed paths and the
  glow rose from the court. The royal parasol was promoted into `primitives.tsx` (`Parasol`), and
  Shloka 1 renders byte-for-byte as before. In the chant miniature the glowing round of the temple
  carries it.

### Shloka 59: The middle of the moon

- **Component:** `middle-of-the-moon.tsx` (defs prefix `sa59`)
- **Composition:** two lines built to one measure, a mantra handed down and then a face, hinged on
  the moon. Below the card the moon's full disc stands upright and is being filled, from the left
  by Manu's gold jug and from the right by Candra's silver one, the one water from either side.
  Round it the moon waxes and wanes in fifteen small moons, full at the foot and thinnest under the
  card, each lit from her side; at its centre stands the sixteenth that never changes, her light as
  a slender form with the crescent she wears on its tip. From her a cast net of moonlight, her
  smile, spreads over the ground, and two cakoras on rocks have come to drink it. The orb's
  moonlight rings out over the whole plate. In the crown the moon in the sky, with its deer, and a
  third cakora flown up to it. The first moon drawn as a vessel being filled, the first garland of
  phases, and the first partridges.
- **Name → part:**
  - Manuvidyā → `manu`: the gold jug, its stream and drops
  - Candravidyā → `candra`: the silver jug with its crescent, its stream and drops
  - Candramaṇḍalamadhyagā → `orb`: the disc, its glow and moonlight rings, the fifteen phases
  - Cārurūpā → `form`: her form of light, its glow and bindu
  - Cāruhāsā → `smile`: the net of moonlight, the two cakoras and their rocks (Saundaryalaharī 63)
  - Cārucandrakalādharā → `crescent`: the crescent on the tip of her form
  - Intro, *moon's full disc* → `orb`
  - Detail → `sour-gruel`: the moon in the sky and the third cakora drinking it, as sour gruel
    to clear a palate numbed by the sweetness of her smile (Saundaryalaharī 63)
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the phases and the net's knots), `m-shimmer` (the glows, the streams,
  the net, her inner light), `m-sink` (drops off the streams).
- **Notes:** This title stays on one line, reaching x ≈ 115 (167 at 1100px) at y ≈ 74–141, so the
  sky moon sits at x ≈ 470, y ≈ 92, with the flying cakora's beak at its lower-left limb. `polar`
  counts 0° east and anticlockwise, so the foot of the ring is 270°; the first ring came out upside
  down. The first net was straight rays with dotted rings and read as a sunburst; it is two families
  of crossing spirals now. Her form was first one flat outlined fill and read as a carrot. The
  cakoras were first long and flat and read as ducks; in `--art-moon` alone they were white by day.
  The first render was a small emblem with an empty middle; the orb, ring, jugs and birds were
  scaled up and the moonlight rings added so the plate holds together. In the chant miniature the
  lit disc between its two jugs carries it.

### Shloka 60: The king of diagrams, and the mountain's daughter

- **Component:** `mountains-daughter.tsx` (defs prefix `sa60`)
- **Composition:** the verse starts very far away and comes close enough to see her eyes, and so
  does the picture. Himavat, seen from the front for the first time, fills the plate: three snow
  peaks in the crown, the middle one highest, and his flanks running down both sides of the card to
  two wooded foothills at his foot. Wild geese cross the sky beside the peaks and deodars stand on
  the foothills, what moves and what does not. Between the foothills, below the card, a cave opens
  in the rock, and on its back wall stands the Śrīcakra, the house she lives in, with her light at
  its bindu, red as a ruby, filling the cave and glimmering on the pool at its mouth, where two
  lotuses have opened. On the right foothill a yak faces the cave with its white tail lifted. The
  first mountain seen whole from the front, the first cave, the first deodars and the first yak.
- **Name → part:**
  - Carācarajagannāthā → `world`: the deodars and the skein of geese
  - Cakrarājaniketanā → `cakra`: the cave and the Śrīcakra on its back wall
  - Pārvatī → `mountain`: Himavat, his snows, strata and foothills (Kumārasambhava 1.26)
  - Padmanayanā → `lotuses`: the pool, its two open lotuses, buds and pads
  - Padmarāgasamaprabhā → `ruby`: her light at the bindu, its glow over the cave and its glimmer
    on the pool
  - Intro, *Himavat* → `mountain`
  - Detail → `yak`: the yak on the right foothill, whose white tail, like the yaks' in
    Kumārasambhava 1.13, fans the mountain as a whisk fans a king and makes his title "king of
    mountains" true; the verse's king of diagrams has its echo in the king of mountains
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the summits' glints), `m-shimmer` (her ruby light and its glimmer on
  the pool), `m-sway` (the yak's tail, from its root via `swingFrom`).
- **Notes:** This title wraps, its second line reaching only x ≈ 9 (61 at 1100px) at y ≈ 123–190,
  so the card sits at y ≈ 225–438 and the skein flies at x ≈ 176–227 in the sky left of the peaks;
  at the upper right it was where the viewport cuts at 1100px. The face-on Śrīcakra is the second
  use of Shloka 56's, so it was promoted into `primitives.tsx` as `SriCakraFace` first, with Shloka
  56 rendering byte-for-byte as before. The snowline went through a regular zigzag (teeth), a
  smoothed curve (dripping wax) and loose white gullies (icicles) before it became angular and
  irregular; the crags in the snow read as diamonds and were dropped. The first yak was a small
  musk body on a pale ledge and read as a boar, and by lamplight was gone; it is larger now, humped,
  head low, skirted, with a gold wash and a core rim where the shrine's light falls, standing on the
  foothill itself. The inner deodars were first behind the card's lower corners. Without its own
  fade the mountain ended in a hard edge on the plate. In the chant miniature the snow peaks over
  the glowing cave carry it in both themes.

### Shloka 61: The couch of five corpses

- **Component:** `salt-and-the-couch.tsx` (defs prefix `sa61`)
- **Composition:** the verse's second line is the reason for its first, and the picture keeps them
  together on one axis. Just below the card her light is seated on the couch of the five Brahmās,
  brought up to 2.5 and centred on a two-step dais; the gold of the four legs has gone dull, and the
  only life in them is a vein of her light running along the plank and down each leg into its
  medallion. The white plank is red only where she sits. Round her, her bliss opens as a lotus of six
  rings of petals, each the last scaled up, that spreads behind the card and out over the whole
  plate. Before the dais a brass bowl of water with a lump of rock salt dissolving in it, the water
  lit and glinting all over. In the crown, the same five shine as Sadāśiva's five faces, five flames
  in their colours, Īśāna at the centre. The first couch whose gods are shown as inert, the first
  ladder of bliss, the first salt.
- **Name → part:**
  - Pañcapretāsanāsīnā → `couch`: the dais, the couch and the dull wash on its legs (Saundaryalaharī 1)
  - Pañcabrahmasvarūpiṇī → `five`: the five faces in the crown and their ring
  - Cinmayī → `light`: her light, its glow and glint, the veins of it in the plank and legs, and the
    medallions' halos
  - Paramānandā → `bliss`: the six rings of petals and the breathing radiance (Taittirīya 2.7, 2.8)
  - Vijñānaghanarūpiṇī → `salt`: the bowl, the water, the lump of salt, its curls and the glints
    (Bṛhadāraṇyaka 2.4.12)
  - Intro, *her light* → `light`
  - Detail → `blush`: Sadāśiva, white as crystal, turned coverlet to her couch, red where her light
    falls on him, like love made flesh to her eyes (Saundaryalaharī 92)
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the petals, the veins, her glow, the water), `m-twinkle` (the five
  faces, the medallions' halos, the glints on the water), `m-breathe` (the radiance of her bliss).
- **Notes:** This title stays on one line and reaches only x ≈ −20 (32 at 1100px), so the five
  faces stand centred in the crown. The first render was a clean diagram and read as one: threads
  arcing from her to the medallions made a basket handle over the plank (they are veins inside
  the legs now), plain rings of bliss read as a target, and the light was a button. Motes of
  bliss through the space read as a starfield by lamplight and confetti by day; the lotus of
  petals replaced them and carries the plate. Halos filled to the centre washed out the gods'
  emblems. In the chant miniature the glowing couch over its bowl carries it by day, the lotus
  by lamplight.

### Shloka 62: Meditation, the meditator, and the thing meditated on

- **Component:** `waking-and-dream.tsx` (defs prefix `sa62`)
- **Composition:** the Māṇḍūkya gives the dreamer the same seven limbs and nineteen mouths as the
  waker, turned inward, and the picture takes it at its word. Below the card the waking world
  stands along a far bank in a long frieze, two ranges of hills, a village with its palms and its
  road on the left, a small temple between two trees on the right, under the sun in the crown with
  birds out. Below the bank the same world lies turned over in the water, banded by the water and
  lit from within, with no sun in it: windows and the temple door alight. On the water between
  them floats a still lamp, its flame rising toward the one world and its reflection going down
  into the other; beside it a lotus leaf with the water standing on it in beads. On the road in
  the water a chariot drives that is not on the road above. The first plate split into a world
  and its reflection, the first village, palms and temple seen as a landscape.
- **Name → part:**
  - Dhyānadhyātṛdhyeyarūpā → `lamp`: the still lamp, its reflection and their glows (Gītā 6.19)
  - Dharmādharmavivarjitā → `leaf`: the lotus leaf and its beads (Gītā 5.10)
  - Viśvarūpā → `world`: the frieze above the bank and the birds
  - Jāgariṇī → `sun`: the sun, its rays and the daylight round it
  - Svapantī → `dream`: the water and the world turned over in it
  - Taijasātmikā → `taijasa`: the glow from within the water and the lit windows and door in it
    (Bṛhadāraṇyaka 4.3.9)
  - Intro, *the dream* → `dream`
  - Detail → `chariot`: the chariot on the road in the water only; "there are no chariots there,
    no teams, no roads; but he makes chariots, teams and roads" (Bṛhadāraṇyaka 4.3.10)
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the daylight, the long rays, the lamp's glows), `m-twinkle` (the lit
  windows and door in the dream, the leaf's beads), `m-breathe` (the glow from within).
- **Notes:** This title wraps, its second line reaching only x ≈ 63 (115 at 1100px), so the card
  sits at y ≈ 225–438, the sun stands at x ≈ 456 right of the title and the bank is at y 526. The
  first frieze, at 1 on a bank at 506, was too thin to hold the plate and its dream too faint; it
  was brought up to 1.25 on a lower bank, the reflection's fills doubled, and the far range added
  behind for depth. Scaling about the centre pushed the village under the verse panel, so it moved
  right. The chariot first stood among the reflected houses and was lost; it is on the open
  stretch of road at the water's edge now. The lamp's reflection is turned over on the foot of its
  bowl, where it meets the water, not on its rim. In the chant miniature the bank, the lamp and the
  glowing water carry it in both themes.

### Shloka 63: The fourth, and then the first of the five acts

- **Component:** `ocean-of-sleep.tsx` (defs prefix `sa63`)
- **Composition:** the verse is a hinge between sleep and making, and the picture draws the scene
  the Purāṇas hang the two on. Below the card, on the one ocean of the night between worlds, with
  no shore and no horizon, Śeṣa lies coiled as a bed with his seven hoods spread toward the right,
  and over the coils lies a dark veil of sleep, starred, drawn up over a head under the hoods:
  Viṣṇu is not drawn, only his sleep and his conch and discus set down at its foot. From his navel
  a lotus rises with Brahmā's four faces lit on it as four flames, and out of it the fourteen
  worlds are let go as eggs, seven rising up the left past the card, seven sinking into the water
  on the right. In the crown, apart from everything, her light is the candrabindu, a bindu in the
  cup of a crescent, and below it hang the three measures अ उ म on a string of their own. The
  first sleeping Viṣṇu, the first Śeṣa, the first ॐ broken into its measures.
- **Name → part:**
  - Suptā → `sleep`: the veil, its stars and hem, and the stars of the night sky (Devī Māhātmya 1, 5)
  - Prājñātmikā → `ocean`: the water, its level lines, the glow within and the echo (Māṇḍūkya 5)
  - Turyā → `fourth`: the crescent, the bindu in it, its ring and glow (Māṇḍūkya 12)
  - Sarvāvasthāvivarjitā → `measures`: अ उ म on their string
  - Sṛṣṭikartrī → `worlds`: the fourteen eggs
  - Brahmarūpā → `brahma`: the stalk, the lotus, its glow and the four flames
  - Goptrī → `guard`: Śeṣa's coils, tail and hoods (√gup, to guard and to hide)
  - Govindarūpiṇī → `govinda`: the breathing dark light under the veil, the conch and the discus
  - Intro, *the one ocean* → `ocean`
  - Detail → `banyan`: a banyan leaf afloat below the serpent's tail with a speck of the same dark
    light on it, the infant who asks who he is and is answered by her, "All this is I alone; there
    is nothing else eternal" (Devī Bhāgavata)
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the glow within the water, Brahmā's glow, her glow), `m-twinkle` (the
  night's stars, the veil's stars, the hoods' jewels, the eggs' glints), `m-breathe` (the sleeper's
  dark light and the infant), with the discus's own `m-flicker`.
- **Notes:** This title stays on one line and reaches x ≈ 365 (417 at 1100px), so her light
  stands at x 482 right of it and the three measures hang in the band between title and card. The
  first render was small and sparse: the hood fan read as a cauliflower, the bindu over the
  crescent with rays as a smiling sun, the veil as a grey cushion, the water as a dull box. The
  couch was brought up and the hoods given heads, the bindu set in the crescent's cup with no rays,
  the sky filled with stars, and the water given depth and an echo. The second had a dark ball for
  the sleeper's head, read as a marble; the veil now rises over his head instead. Its two arcs of
  worlds both passed under the card's lower corners, and the right one had nowhere to go past the
  hoods, so the worlds split into seven above and seven below. The water's rect showed as a grey
  slab in the plate until it was faded at the sides and foot. In the chant miniature the white
  coils and the lotus carry it by day, and the hoods and her light by lamplight.

### Shloka 64: The five acts, and the last of them is grace

- **Component:** `the-drawn-screen.tsx` (defs prefix `sa64`)
- **Composition:** the five acts as a temple keeps them, at the moment of darśana. Below the card
  stands the door of a sanctum, brought up a tenth, with a vermilion screen hung before it: the left
  half still drawn across, the right half swagged aside to a tie, on a rod whose cord runs up the
  doorpost and out of sight behind the card. Inside, her light rests on the couch of the five
  Brahmās, the same five who lay inert under her in Shloka 61, now bright, their medallions lit,
  the plank glowing white as crystal; Brahmā's leg is behind the screen. Through the opening her
  light spills over the threshold and down the steps. At the right, Rudra's trident rises from the
  ground past the card's edge into the crown, fire on its three points and the drum tied under
  them, and in the crown the fourteen worlds are drawn in a spiral into its fire. A spider hangs
  under the lintel's right end. The first screen half drawn, the first spiral, the first plate
  joined from ground to crown by one upright.
- **Name → part:**
  - Saṃhāriṇī → `gather`: the spiral of worlds and its dashed line
  - Rudrarūpā → `rudra`: the trident, its drum, its flames and their glow (Śvetāśvatara 3.2)
  - Tirodhānakarī → `screen`: both halves of the screen, the tie and the tassel
  - Īśvarī → `cord`: the rod, its rings and crowned finials, and the cord
  - Sadāśivā → `sadasiva`: the plank drawn as crystal and its glow
  - Anugrahadā → `grace`: her light, its glow, and the spill over the threshold and steps (Gītā 7.14)
  - Pañcakṛtyaparāyaṇā → `couch`: the couch and the rings of light round its medallions
  - Intro, *the door of a sanctum* → `sanctum`: the door, its inside, the threshold and steps
  - Detail → `spider`: the spider on its thread from its web; "as a spider sends out its thread and
    draws it in again" (Muṇḍaka 1.1.7)
- **Palette:** no additions. `BrahmaCouch`'s Rudra trident changed from `--art-carve` to
  `--art-hair` in its own commit first, since it all but vanished by day (Shlokas 22, 46 and 61
  change slightly).
- **Motion:** `m-flicker` (the trident's flames), `m-shimmer` (her glow, the trident's fire, the
  plank's glow, the medallions' rings), `m-twinkle` (the worlds' glints).
- **Notes:** This title stays on one line and reaches x ≈ 320 (372 at 1100px), so the trident's head
  and the spiral fill the crown right of it. The first render had the trident beside the door and
  fourteen eggs scattered over the plate under `m-gather`, which read as confetti, and a faceted
  full moon in the crown for Sadāśiva, which read as a cracked plate; a ring of worlds round the
  door would have fallen behind the card or in the faded ground. Standing the trident up into the
  crown gave the worlds somewhere to be drawn into, and Sadāśiva went to his own place in the
  couch. Two `m-gather` copies of the spiral then doubled every egg into clusters, so it is still.
  The plank's moon-white glow vanished by day; it glows in `--art-glow` now. In the chant miniature
  the red door and its lit couch carry it in both themes.

### Shloka 65: In the middle of the sun's disc

- **Component:** `middle-of-the-sun.tsx` (defs prefix `sa65`)
- **Composition:** the answer to Shloka 59's moon, laid out differently. Below the card the sun's
  full disc (the canon disc, its 32 rays, r 80) stands over still water with its reflection broken
  into bars, and in its middle her light sits on an open red lotus. A garland of six blossoms, one
  per excellence, hangs round its lower half like the garland on an image. Out of the disc sharp
  rays climb past the card, the long ones fading and going on as threads to flames standing on an
  arch in the crown. Gold falls on either side into the water, ringing where it lands. In the
  water at the left a red lotus and a blue one rise from one root; far out on the right a small
  golden horse wades in. The first sun with her in its centre, the first garland of six, the first
  rays ending in fire.
- **Name → part:**
  - Bhānumaṇḍalamadhyasthā → `sun`: the disc, its canon rays and rims, the dawn glow, the water and
    the reflection (Chāndogya 1.6.6)
  - Bhairavī → `blaze`: the sharp rays, their threads and the flames in the crown
  - Bhagamālinī → `garland`: the strand, its leaves and ties, and the six blossoms (Viṣṇu Purāṇa
    6.5.74)
  - Padmāsanā → `lotus`: the red lotus in the disc
  - Bhagavatī → `shares`: the falling gold and the rings where it lands
  - Padmanābhasahodarī → `twins`: the red and blue lotuses on their one root, and the leaf
  - Intro, *the middle of the sun* → `light`: her light on the lotus and its glow
  - Detail → `horse`: Aḻagar riding his golden horse into the Vaigai to give Mīnākṣī away, and
    arriving too late for the wedding
- **Palette:** no additions.
- **Motion:** `m-lick` (the rays' cores and the flames' hearts), `m-sink` (the gold), `m-shimmer`
  (the dawn glow, the reflection, her glow).
- **Notes:** This title stays on one line and reaches only x ≈ 96 (148 at 1100px), so the crown is
  open and the arch of flames fills it. The blaze took four tries: thin rays with star tips read
  as a dandelion and streaked pink through the card (now dimmed behind the card window by a
  mask); long wavy tongues read as tentacles; sharp rays alone left the crown empty; flames on solid
  shafts read as torches, until the shafts faded out and became threads. Her light was first
  under the lotus; it is its own part above it. In the chant miniature the disc and its rays
  carry it by day and glow by lamplight without washing out the verse.

### Shloka 66: Rows of worlds, made and unmade in a blink

- **Component:** `worlds-in-a-blink.tsx` (defs prefix `sa66`)
- **Composition:** the hymn's cosmic person with no figure, built from the series' own images of
  her. Below the card her face, the hand mirror, stands on a long stem, turned to a second mirror
  so that it holds itself again and again down to her light; round it runs the stream of its
  beauty as a ring, with a shoal of fish, her eyes, swimming round. Its foot hangs ten fingers
  above the earth, a round disc of sea and island rings, and pairs of her footprints stand all
  round the earth facing outward. Across the whole sky hang rows of world-eggs that open and shut
  along their length like eyes: two in the crown, two smaller and fainter behind the card. The
  first mirror in a mirror, the first earth mapped as the purāṇas map it, the first composition
  in horizontal rows.
- **Name → part:**
  - Unmeṣanimiṣotpannavipannabhuvanāvalī → `worlds`: the four rows of world-eggs and their threads
  - Sahasraśīrṣavadanā → `faces`: the mirror, its reflections and the marriage thread on its stem
  - Sahasrākṣī → `eyes`: the ring of the stream, its aura and the shoal of fish
  - Sahasrapāt → `feet`: the earth disc and the footprints round it
  - Intro, *her light* → `light`: her light at the far end of the reflections
  - Detail → `fingers`: the measure of ten ticks between the mirror's foot and the earth, and its
    shadow (Ṛgveda 10.90.1, *atyatiṣṭhad daśāṅgulam*)
- **Palette:** no additions.
- **Motion:** `m-lick` (the light in the worlds), `m-dart` (the fish), `m-twinkle` (her glow); the
  mirror and thread keep their own `m-lick` and `m-sway`.
- **Notes:** This title stays on one line and reaches x ≈ 411 (463 at 1100px), so the crown's rows
  hang above it and to its right. The first reflections were plain rings shrinking almost in
  place and read as a target; drifting them further and giving each its cup and stem made them
  mirrors. At 0.8 on its canon stem the mirror's tāli hid the bud and the ten-finger gap, so the
  stem is longer and the mirror 0.76. With only the crown rows the plate was empty from the title
  to the mirror; the two far rows behind the card fill it and dress both sides of the card. The
  stream was a bright grey ring by lamplight at 0.7; it is 0.4 with a saffron wash. In the chant
  miniature the mirror in its ring of fish reads as one bright emblem in both themes.

### Shloka 67: A house at lamp-lighting, and the smoke that carries the Vedas

- **Component:** `the-household-lamp.tsx` (defs prefix `sa67`)
- **Composition:** four names of relation, none of form, drawn as a mother's house at
  lamp-lighting. Below the card a standing brass lamp with one wick lit, her light, on a lamplit
  floor. Its smoke rises in four streams that open out behind the card and come in to Brahmā's
  four faces on his lotus in the crown. On the ground at the left an inchworm by a tuft of grass,
  in the same ring of light as Brahmā, so the diagonal from the crown's right to the ground's left
  is the span. Before the lamp a kolam of four dots by four on a swept patch, either side of it a
  plantain leaf served with mangoes or bitter gourds, and ants carrying the kolam away. The first
  household scene since Shloka 37's doorway, the first standing lamp, and the first composition
  on a diagonal between two matched rings.
- **Name → part:**
  - Ābrahmakīṭajananī → `span`: the two rings, Brahmā's lotus, and the inchworm with its grass
  - Varṇāśramavidhāyinī → `order`: the kolam and its swept patch
  - Nijājñārūpanigamā → `vedas`: the four streams of smoke and their sparks (Bṛhadāraṇyaka 2.4.10,
    Śvetāśvatara 6.18)
  - Puṇyāpuṇyaphalapradā → `fruits`: the two leaves, the mangoes and the bitter gourds
  - Intro, *the lamp's one lit wick* → `light`: the lamp, its flame, its glows and the lamplit
    floor
  - Detail → `ants`: the file of ants and the crumbs (a kolam is drawn in rice flour to feed them)
- **Palette:** no additions.
- **Motion:** `m-flicker` (the flame's heart), `m-shimmer` (the lamp's glows and the two rings),
  `m-lick` (the smoke and its sparks); `BrahmaLotus` keeps its own `m-shimmer`.
- **Notes:** Brahmā's lotus and faces were promoted into `BrahmaLotus` and the kolam into `Kolam`
  (two commits before this one), and Shlokas 63 and 37 render pixel for pixel as before. This
  title stays on one line and reaches x ≈ 326 (378 at 1100px), so Brahmā's ring sits at x ≈
  394–510 beside its end. The first render was small and sparse: the lamp is now 1.15 about its
  foot, with jasmine, kumkum and a lamplit floor, and the worm has its grass. The first smoke was
  moon tubes with a gold centre line and vanished by day; it is now gold-soft ribbons in a faint
  haze, and the stream for the back face goes over the top from the left rather than up behind
  the lotus, where it showed through the petals. The first kolam, scalloped round every dot,
  was chain mail by lamplight and invisible by day; long loops on a swept musk patch read in both.
  In the chant miniature the lit lamp and its rising smoke carry it, and the verse stays clear on
  phones.

### Shloka 68: Vermilion in the parting of the Vedas, and the pearl in the shell of scripture

- **Component:** `vermilion-and-pearl.tsx` (defs prefix `sa68`)
- **Composition:** two names, each one picture, set one above the other. In the crown at the
  right her feet as two red lotuses, and in a row under them the four Vedas bowed so low that
  only their hair shows, the red dust of the lotuses falling into their partings as vermilion;
  their plaits fall behind the card and lean in toward the shell. Below the card all of
  scripture as one shut scallop on still water, its growth lines written over like manuscript
  lines, the pearl that is her light showing only in the seam. High in the crown, alone, Svāti
  and a falling drop. The first bowed figures drawn as hair alone, and the first shut shell.
- **Name → part:**
  - Śrutisīmantasindūrīkṛtapādābjadhūlikā → `partings`: the four heads of hair, their
    vermilion streaks, jasmine and plaits, and the falling red dust
  - Sakalāgamasandohaśuktisampuṭamauktikā → `shell`: the shell, its ribs, ears and written
    growth lines, its shadow and the still water
  - Intro, *her feet* → `feet`: the two lotuses and their glows
  - Intro, *her light* → `light`: the pearl, the lit seam, its glow and its reflection on the water
  - Detail → `svati`: the star and its raindrop (rain falling into an open oyster while the moon
    is in Svāti becomes a pearl)
- **Palette:** no additions.
- **Motion:** `m-sink` (the red dust and the raindrop), `m-shimmer` (the feet's glows, the
  pearl's glow and its reflection), `m-twinkle` (Svāti).
- **Notes:** the plait was promoted into `plait`, `PlaitLobes` and `PlaitTip` (the commit before
  this one), and Shloka 4 renders pixel for pixel as before. This title stays on one line and
  reaches x ≈ 244 (296 at 1100px), so the feet and heads sit at x ≈ 330–508. The first render
  had small feet, the heads as ellipses ringed with jasmine (jellyfish), the right plait out past
  the card, and a hinge with ears pointing up like a bow tie. The heads are now a crown of
  combed hair with a peak at the brow, leaning toward her feet, with a spray of jasmine; the
  plaits lean inward; the hinge is straight with ears sloping into the shell. The script ticks
  were `--art-carve` and vanished by day; they are `--art-musk`. In the chant miniature the
  glowing shell carries it by day and by lamplight, and the plaits read as a small fringe.

### Shloka 69: Fullness, and the plainest of her names

- **Component:** `full-from-full.tsx` (defs prefix `sa69`)
- **Composition:** seven names round one floor. At the middle her footprints in vermilion, her
  light just above them, and a child's small steps in rice flour walking up to them. Round them
  a kolam in one endless line, round twice and closed on itself, and on its ring the four aims: a
  fire in its square pit, a heap of coins, two flower arrows, and an open cage with its bird
  flying up toward her. At the right a full pot, tipped on a tall stand, pours into a full pot
  and both are still brimming; the overflow runs off the foot of the plate. At the left a cobra
  risen over a bowl of milk, tongue out. Her parasol in the crown, its staff fading behind the
  card, and at the card's door the gods' emblems in their glows: Brahmā's lotus at the left,
  Viṣṇu's discus and conch and Indra's thunderbolt at the right, like attendants at either side
  of a door. The first endless one-line kolam, the first pot pouring into a pot, and the first
  snake drawn as itself.
- **Name → part:**
  - Puruṣārthapradā → `aims`: the fire and its pit, the coins, the arrows, the cage and the goose
  - Pūrṇā → `pots`: both pots, the stand, the pouring stream and the runnel
  - Bhoginī → `cobra`: the cobra and its bowl of milk
  - Bhuvaneśvarī → `parasol`: the parasol and its staff
  - Ambikā → `steps`: the child's three steps
  - Anādinidhanā → `kolam`: the endless line and its dots
  - Haribrahmendrasevitā → `gods`: the lotus, the discus and conch, the thunderbolt and their
    glows
  - Intro, *her footprints* → `footprints`; *her light* → `her-light`
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the water, the gods' glows), `m-lick` and `m-flicker` (the fire, the
  cobra's tongue), `m-sway` (the hood and the goose), `m-breathe` (her light); the overflow's drops
  keep `BrimmingPot`'s `m-twinkle`.
- **Notes:** Shloka 48's brimming pot was promoted into `BrimmingPot` (the commit before this
  one) and Shloka 48 renders exactly as before. This title stays on one line and reaches x ≈ 263
  (315 at 1100px) at y ≈ 74–141, so the parasol sits at x ≈ 254–366 with its rim at 166, under
  and beside the title's end. In the first render the tipped pot hung in the air and read as a
  blob; it now sits in the ring of a tall stand whose legs stand behind the lower pot. The goose
  was on `m-sway` in the same element as its placement, which threw it into the cage; it is now
  placed by an outer group. The first hood was too narrow beside the coils, and the child's steps
  at 0.62 vanished by day. In the chant miniature the parasol, the ring and the gold pots carry
  it; the verse stays clear on phones.

### Shloka 70: Where the fourth digit ends and the fifth begins

- **Component:** `seam-of-the-digits.tsx` (defs prefix `sa70`)
- **Composition:** the plate is split by a seam. The sun's twelve digits, for which the hymn's
  divisions are named, burn as a row of small flames along the card's top edge, and the gap
  between the fourth and the fifth is the plate's axis: a gold seam runs down from it behind the
  card to ह्रीं on a gold disc, and on to her light in the heart's twelve-petalled lotus,
  floating on still water, from which unbroken rings spread. Left of the seam (the first line's
  names) a river comes down into the pool and its banks end there, and an empty banyan leaf
  floats; right of it (the second line's) a touch-me-not with its leaves folded on the bank, and
  a winnowing fan lying idle with its rice and husk together. The first plate split by a seam,
  and the first river.
- **Name → part:**
  - Nārāyaṇī → `waters`: the pool, its ripples and the banyan leaf
  - Nādarūpā → `nada`: the rings
  - Nāmarūpavivarjitā → `river`: the river, its currents and its banks
  - Hrīṅkārī → `hrim`: the disc, its glow and ह्रीं
  - Hrīmatī → `mimosa`: the touch-me-not and its flowers
  - Hṛdyā → `heart`: the lotus and her light
  - Heyopādeyavarjitā → `winnow`: the fan and its rice
  - Intro, *the sun's twelve digits* → `digits`; *the seam* → `seam`
- **Palette:** no additions.
- **Motion:** `m-flicker` (the digits), `m-shimmer` (the rings and the currents), `m-breathe`
  (her light and the syllable's glow).
- **Notes:** this title stays on one line and reaches x ≈ 457 (about 509 at 1100px) at y ≈
  74–141, so the row of digits sits in the band under it at y ≈ 160–184, x ≈ 224–520. The first
  pool was a hard grey disc with a rim and read as a record; it is now a radial moon gradient
  fading at the edge. The first river came out of the card's foot as a grey strip ending in a
  hard edge, and dashed currents made it a road; it now comes in from the left under the verse
  panel, fades into the pool and carries two solid currents. The first winnowing fan was a
  trapezoid and read as a box; it has a floor and a back wall now. On phones the row of digits
  shows faintly behind the title. In the chant miniature the row, the seam and the rings carry
  it. ह्रीं is omitted from the share card, as text is.

### Shloka 71: A queen in her own right, and bells at the waist

- **Component:** `queen-and-girdle.tsx` (defs prefix `sa71`)
- **Composition:** her light alone on a seat made for one, wearing a girdle of bells that rings
  because she has just moved. At the foot of the seat Kubera's mongoose, the treasurer of the
  gods, spits out its jewels for her. At the left a white cloth hung into red dye, the red
  climbing it. From the crown's right edge a mango bough comes down with a koel singing on it, a
  ripe mango dripping, and a flush of young copper leaves at its tip. In a bowl before the seat
  two blue lotuses. The first seat for one, the first animal of Kubera's, and the first dyeing.
- **Name → part:**
  - Rājarājārcitā → `mongoose`: the mongoose and its jewels
  - Rājñī → `seat`: the seat for one
  - Ramyā → `koel`: the koel and its song
  - Rājīvalocanā → `lotuses`: the two blue lotuses and their bowl
  - Rañjanī → `dye`: the cloth, the pole and post, and the dye pot
  - Ramaṇī → `bough`: the bough, its leaves and the young copper flush
  - Rasyā → `mango`: the mango and its drop
  - Raṇatkiṅkiṇimekhalā → `bells`: the girdle's near half, its bells, knot and ringing
  - Intro, *her light* → `her-light`: her light and the girdle's far half behind it
- **Palette:** no additions.
- **Motion:** `m-sway` (the bells, the young leaves, the mango), `m-shimmer` (the ringing, the
  koel's song, the dye), `m-breathe` (her light); the drop keeps `m-twinkle`.
- **Notes:** this title stays on one line and reaches x ≈ 433 (485 at 1100px) at y ≈ 74–141, so
  the crown is left to the bough at x > 480. The first render was small: everything in y ≈
  400–640 and the crown empty. The seat, her light and the girdle are now drawn at 1.2 with their
  base on the floor, the bough comes in from the crown, and the bowl is at 1.25. The first
  mongoose was long and low with its head level, in plain stone, and read as a lizard by
  lamplight; it has an arched back, a raised head, a round ear and a bushy tail, with a moon
  wash. In the chant miniature the seat, the red cloth and the bough carry it.

### Shloka 72: Fortune, the full moon, and a goddess greedy for her lover

- **Component:** `fortune-and-the-full-moon.tsx` (defs prefix `sa72`)
- **Composition:** the full moon stands in the crown. Under the card a river runs across the night,
  and on its two banks a pair of cakravākas, parted till morning, she calling across the water.
  Below it her light with moths round it, and from it golden gooseberries rain into a poor alms
  bowl. Round the floor a protective thread of red and turmeric is tied in a ring; inside it a
  green cane springs from ash on one side and two parrots touch beaks on the other. Outside it, at
  the knot, a demon's iron club lies broken with her arrow standing beside it.
- **Name → part:**
  - Ramā → `gold`: the falling gooseberries, the alms bowl and its heap
  - Rākenduvadanā → `moon`: the full moon, its deer and its rings
  - Ratirūpā → `parrots`: the parrots and the heart
  - Ratipriyā → `cane`: the ash, the cane and the bee
  - Rakṣākarī → `thread`: the ring of thread, its knot and tassels
  - Rākṣasaghnī → `club`: the broken club and the arrow
  - Rāmā → `moths`: the four moths
  - Ramaṇalampaṭā → `cakravakas`: the two birds and her call
  - Intro, *her light* → `her-light`; *a river* → `river`
- **Palette:** no additions.
- **Motion:** `m-sink` (the gooseberries), `m-sway` (the moths, the bee), `m-shimmer` (the call,
  the glitter), `m-breathe` (her light, the heart).
- **Notes:** the cakravāka is promoted to `Cakravaka` in `primitives.tsx` from Shloka 54. This
  title wraps, its second line reaching only x ≈ 102 (154 at 1100px), so the card sits at y ≈
  225–438 and the first render's river was under it; everything below the crown moved down about
  24, the river to y ≈ 446–470. The first river was a grey slab by lamplight; its moon and shade
  are thinner and it carries ivory currents. In the chant miniature the moon, the river and the
  ring carry it.

### Shloka 73: Desire drawn as a diagram, and a bulb under the soil

- **Component:** `bulb-of-the-world.tsx` (defs prefix `sa73`)
- **Composition:** her light under the card holds four points and nothing else, the kāmakalā given
  as points only. From a heap of coins at the left and a child's anklet at the right, dotted
  threads run to her. Below, the ground is cut away to show a bulb and its roots, and the shoot
  it puts up into the world. On the ground at the left three pots of sprouting grain and a spray
  of kadamba laid before her; the bough it came from leans into the crown. At the right the
  ground gives way to a sea, and a drop from her light falls into it.
- **Name → part:**
  - Kāmyā → `dear`: the coins, the anklet and the threads
  - Kāmakalārūpā → `points`: the four points
  - Kadambakusumapriyā → `kadamba`: the bough and the laid spray
  - Kalyāṇī → `sprouts`: the three pots of sprouts
  - Jagatīkandā → `bulb`: the soil cut away, the bulb and its roots
  - Karuṇārasasāgarā → `sea`: the sea, the drop and its rings
  - Intro, *her light* → `her-light`; *a shoot* → `shoot`
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the points), `m-shimmer` (the threads, the rings), `m-sink` (the
  drop), `m-breathe` (her light).
- **Notes:** this title wraps, its second line reaching only x ≈ 20 (72 at 1100px), so the card
  sits at y ≈ 225–438; everything under it is drawn 30 lower, and the crown is free for the bough
  at 1.35. The first points (a crescent under three dots, close together) made a smiling face;
  they are spread into a tall kite with a small triangle. The soil and the sea first ended in hard
  bottom edges; both fills now fade out downward. In the chant miniature the bulb and the soil
  carry it.

### Shloka 74: Wine made from the flower of the previous verse

- **Component:** `kadamba-wine.tsx` (defs prefix `sa74`)
- **Composition:** the kadamba bough of Shloka 73 leans into the crown again, and from its heads
  the liquor drips down the right column into a gold cup. Under the card her light, and under it
  a lotus turned down like a giving hand, letting fall pearls. At the right vāruṇī's jar lies
  tipped over, its red wine spilled in a pool that will not lie still. At the left two wagtails
  and a hand mirror with her light in it. Along the foot a rudra vīṇā, and faint phrases of an
  ālāpa rising from its strings.
- **Name → part:**
  - Kalāvatī → `vina`: the vīṇā
  - Kalālāpā → `alapa`: the phrases rising from it
  - Kāntā → `mirror`: the hand mirror
  - Kādambarīpriyā → `kadamba`: the bough, the drops and the cup
  - Varadā → `giving`: the down-turned lotus and its pearls
  - Vāmanayanā → `wagtails`: the two wagtails
  - Vāruṇīmadavihvalā → `wine`: the tipped jar and the spilled pool
  - Intro, *her light* → `her-light`
- **Palette:** no additions.
- **Motion:** `m-sink` (the drops, the pearls), `m-dart` (the wagtails), `m-shimmer` (the pool,
  the ālāpa, the cup), `m-breathe` (her light and its reflection).
- **Notes:** the kadamba bough is promoted to `KadambaBough` in `primitives.tsx` from Shloka 73,
  with `KADAMBA_BOUGH_HEADS` so the drops can start from a head. This title stays on one line and
  reaches x ≈ 464 (516 at 1100px) at y ≈ 74–141, so the bough stays at x > 500. Everything under
  the card is drawn at 1.15 about (320, 470). The first vīṇā, its gourds on struts under a level
  stem, read as a bench on wheels; the gourds hang straight from the stem and it is tilted. In
  the chant miniature the vīṇā, the jar and her light carry it.

### Shloka 75: Greater than everything, and living in a particular range of hills

- **Component:** `vindhya-shrine.tsx` (defs prefix `sa75`)
- **Composition:** under the card the Vindhyas run across the plate, a long wall of flat-topped
  sandstone tables, forest on the slopes and fireflies over it. On the highest table her shrine,
  her light in its door; four palm-leaf Vedas float out from her light, and a stair climbs to her
  from the river at the foot. In the right column a balance weighs the world against one point of
  her light, and her pan is the lower. On the near bank the nine planets on their platform; at
  the right Kaṃsa's stone with its fetter open, and the light of the girl who slipped from his
  hands going away to the hills.
- **Name → part:**
  - Viśvādhikā → `balance`: the balance
  - Vedavedyā → `stair`: the stair and the ghat
  - Vindhyācalanivāsinī → `vindhyas`: the range and its forest
  - Vidhātrī → `grahas`: the nine planets and their platform
  - Vedajananī → `vedas`: the four palm-leaf books
  - Viṣṇumāyā → `escape`: the stone, the fetter and the rising light
  - Vilāsinī → `fireflies`: the fireflies
  - Intro, *her light* → `her-light`; *her shrine* → `shrine`; *river* → `river`
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the fireflies, the escaping light), `m-shimmer` (the pennant, the
  river), `m-breathe` (her light).
- **Notes:** this title wraps, its second line reaching x ≈ 213 (265 at 1100px), so the card sits
  at y ≈ 225–438 and the whole scene lives in y ≈ 440–600, with the balance in the right column.
  The first range was rounded bumps and read as a low mound; it has flat tables and scarps. The
  first balance tipped the wrong way (`polar` measures up), the stair zigzagged like lightning,
  the Vedas were short and steep and read as bones, and the escaping light was a hard line like a
  wand. In the chant miniature the range and the shrine carry it.

### Shloka 76: The field, the knower of the field, and the one who guards both

- **Component:** `the-field.tsx` (defs prefix `sa76`)
- **Composition:** under the card a field runs back in perspective, its plots sprouting, ripe,
  reaped and flooded all at once, her light standing over it. In a near plot a watch platform
  with the watcher's lamp, and round the field and the platform a fence of woven thorn. At the
  near left a boundary stone carved with her mark; at the near right, outside the fence, a
  vermilion field-guardian stone with a trident and a lamp, and Bhairava's black dog, both turned
  inward toward her.
- **Name → part:**
  - Kṣetrasvarūpā → `field`: the plots and bunds
  - Kṣetreśī → `boundary`: the boundary stone
  - Kṣetrakṣetrajñapālinī → `fence`: the fence and the watch platform
  - Kṣayavṛddhivinirmuktā → `her-light`: her light
  - Kṣetrapālasamarcitā → `guardian`: the guardian stone, trident, lamp and dog
  - Intro, *the field* → `field`
- **Palette:** no additions.
- **Motion:** `m-flicker` (the two lamps), `m-shimmer` (the flooded plots), `m-breathe` (her
  light, the lamps' glow).
- **Notes:** this title wraps, its second line reaching only x ≈ 88 (140 at 1100px), so the card
  sits at y ≈ 225–438 and the field starts at y ≈ 456. The first field was a regular grid and
  read as a tiled floor; the inner crossings are nudged, the edges faded, and the stage colours
  retuned for lamplight. The platform was first at the far edge and lost; it is in a near plot at
  1.3. In the chant miniature the field carries it.

### Shloka 77: Tender to whoever bows, and seated in the ring of fire

- **Component:** `ring-of-fire.tsx` (defs prefix `sa77`)
- **Composition:** under the card her light sits low in the fire maṇḍala, an upward red triangle
  fringed with flame, and the first vowels go out from her in an arc. The grass on either side
  bends toward her. At the right a cow lowers her head to lick her calf; at the left a lotus leaf
  on its pool holds a drop it cannot be wetted by, and a victory banner streams behind it. Down
  the right column from the crown falls a plait of her hair with jasmine and red flowers.
- **Name → part:**
  - Vijayā → `banner`: the banner and its staff
  - Vimalā → `leaf`: the lotus leaf, its drop and pool
  - Vandyā → `grass`: the bending grass
  - Vandārujanavatsalā → `cow`: the cow and calf
  - Vāgvādinī → `letters`: the five vowels
  - Vāmakeśī → `hair`: the plait
  - Vahnimaṇḍalavāsinī → `fire`: the triangle and its flames
  - Intro, *her light* → `her-light`
- **Palette:** no additions.
- **Motion:** `m-flicker` (the flames), `m-twinkle` (the letters, the drop), `m-shimmer` (the
  banner, the pool), `m-breathe` (her light).
- **Notes:** this title wraps, its second line reaching only x ≈ 95 (147 at 1100px), so the card
  sits at y ≈ 225–438 and the scene is a band at y ≈ 450–580; the plait takes the right column.
  The first lotus leaf had its notch at the side and read as a fish; the letters were too small
  and pale by day. The share card leaves out the letters, being text. In the chant miniature the
  fire triangle and the cow carry it.

### Shloka 78: The wish-yielding creeper, the loosened tether, and the rule of good conduct

- **Component:** `loosened-tether.tsx` (defs prefix `sa78`)
- **Composition:** up the right column a slender post rises to a lamp and the wish-yielding
  creeper climbs it, hung with rubies and pearls. Under the card her light, and three dark wisps
  from the edges drawn into it and thinning out there. At the left a stake with its rope untied
  and slack, and the goat that was tied to it walking free toward her. Along the road at the foot
  a wheel set rolling, its track behind it.
- **Name → part:**
  - Bhaktimatkalpalatikā → `creeper`: the post, its lamp and the creeper
  - Paśupāśavimocinī → `tether`: the stake and the slack rope
  - Saṃhṛtāśeṣapāṣaṇḍā → `wisps`: the wisps
  - Sadācārapravartikā → `wheel`: the wheel, its road and track
  - Intro, *her light* → `her-light`; detail → `goat`
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the wisps, the wheel's motion arcs), `m-breathe` (her light, the
  dust), `m-flicker` (the lamp).
- **Notes:** this title wraps, its second line reaching x ≈ 209 (261 at 1100px), so the card sits
  at y ≈ 225–438; the creeper takes the right column. The first wisps were single smooth strands
  and read as the skyline of a hill; they are paired and wavering. The stake, the goat and the
  wheel are drawn at 1.25 about (320, 588). In the chant miniature the creeper and the goat carry
  it.

### Shloka 79: Moonlight on scorched ground, and the dark driven off

- **Component:** `moonlight-on-scorched-ground.tsx` (defs prefix `sa79`)
- **Composition:** under the card her light, and from it a cone of moonlight falling on a broad
  stretch of ground cracked by heat. Outside the light the cracks glow like embers; where it lands
  they are pale and cool. In the moonlit middle a small pool with two white night lilies open. At
  the left an ascetic's empty seat on its kuśa mat, with his staff, water pot and rosary, facing
  her. At the right a narrow-waisted altar marked out on the ground. Three bats fly off toward the
  lower corners.
- **Name → part:**
  - Tāpatrayāgnisantaptasamāhlādanacandrikā → `moonlight`: the cone, its motes and the cooled cracks
  - Taruṇī → `lilies`: the pool and the night lilies
  - Tāpasārādhyā → `ascetic`: the seat, staff, pot and rosary
  - Tanumadhyā → `altar`: the vedi
  - Tamopahā → `bats`: the bats
  - Intro, *her light* → `her-light`; *cracked with heat* → `ground`
- **Palette:** no additions.
- **Motion:** `m-ember` (the hot cracks), `m-twinkle` (the motes, a glint on the pool),
  `m-breathe` (her light), `m-dart` (the bats).
- **Notes:** this title wraps, but its second line ends at x ≈ −4 (48 at 1100px), clear of the
  artwork; the card sits at y ≈ 225–438. The scene lives in one band, y ≈ 440–630, under the card.
  The cracks were first drawn as long runs across the ground and read as wood grain; they are a
  net of short edges now. The crown and right column are left empty, as night.

### Shloka 80: Consciousness, and what the word 'that' was pointing at

- **Component:** `one-savour.tsx` (defs prefix `sa80`)
- **Composition:** under the card her light, bare: a point and four faint rings, nothing in it to
  be lit. In the crown the Great Bear with the faint star Arundhatī beside Vasiṣṭha, ringed and
  pointed to by a dashed arc, and at the right a thin paring of moon. Below, three different
  flowers at the left, and bees carrying from each along its own path, under her light, to one
  comb hanging from a bough at the right.
- **Name → part:**
  - Citiḥ → `her-light`: the bare light and its rings
  - Tatpadalakṣyārthā → `arundhati`: the Great Bear, Arundhatī and the pointing arc
  - Cidekarasarūpiṇī → `honey`: the comb, its bough and its drop
  - Svātmānandalavībhūtabrahmādyānandasantatiḥ → `paring`: the crescent
  - Intro, *different flowers* → `flowers`; detail → `bees`
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light), `m-twinkle` (the stars), `m-dart` (the bees), `m-sink`
  (the honey drop).
- **Notes:** this title wraps, its second line reaching x ≈ 47 (99 at 1100px), so the card sits
  at y ≈ 225–438 and the crown carries the sky. The verse's own figures were mostly drawn
  already: rock salt dissolving and the Taittirīya's ladder of joys at Shloka 61, pot and space at
  Shloka 45, and a village on a bank (close to the hamlet on the Ganges) at Shloka 62. So 'that' is
  shown by Arundhatī, the other standard figure of indirect pointing, one savour by honey (the
  Chāndogya's figure next to the salt), and the gods' bliss by the moon they drink.

### Shloka 81: The four levels of speech, and the swan on the mind

- **Component:** `levels-of-speech.tsx` (defs prefix `sa81`)
- **Composition:** the verse descends, and the picture does too, down a dotted thread in the right
  column: at the top a still point with chevrons all pointing in at it, then a peacock's egg, then
  a flute lying across the thread, unplayed, then a bell ringing. Under the card her light, and
  below it a still lake with a swan on it, its ripples spreading slowly.
- **Name → part:**
  - Parā → `para`: the still point
  - Pratyakcitīrūpā → `inward`: the chevrons
  - Paśyantī → `egg`: the peacock's egg
  - Paradevatā → `her-light`: her light
  - Madhyamā → `flute`: the flute
  - Vaikharīrūpā → `bell`: the bell and its sound
  - Bhaktamānasahaṃsikā → `swan`: the lake and the swan
  - Intro, *dotted thread* → `thread`
- **Palette:** no additions.
- **Motion:** `m-sway` (the bell), `m-shimmer` (its sound), `m-breathe` (her light).
- **Primitives:** Shloka 20's swan promoted to `Swan` (its wake stays with Shloka 20).
- **Notes:** this title stays on one line at 1440 and reaches x ≈ 488, so the crown is mostly
  behind it; the first layout put the still point in the middle of the crown, under the title,
  and the whole descent moved into the right column. At 1100px the title wraps (x ≈ 79). The
  card sits at y ≈ 184–396. The four stages are sometimes placed in the body (navel, heart,
  throat), but no figure is drawn here.

### Shloka 82: The vein that carries her consort's life, and a seat in the Punjab

- **Component:** `life-vein.tsx` (defs prefix `sa82`)
- **Composition:** under the card her light, and a vein hanging from it to Kāmeśa's crescent
  beside her, beads of breath travelling along it. Below, left to right: a stone seat daubed with
  vermilion at the end of a road, with flowers and a small red flag; a single jasmine on a leaf,
  a fine ray from her light landing on it; a red lotus brimming with nectar, a bee asleep in it;
  Kāma's rosy light, his bow of flowers and five arrows laid down before her. At the top of the
  right column a drum of heaven sounds and flowers fall down the column.
- **Name → part:**
  - Kāmeśvaraprāṇanāḍī → `vein`: the vein, its beads and his crescent
  - Kṛtajñā → `gift`: the flower on its leaf and the ray
  - Kāmapūjitā → `kama`: Kāma's light, bow and arrows
  - Śṛṅgārarasasampūrṇā → `lotus`: the brimming lotus and the bee
  - Jayā → `drums`: the drum and the falling flowers
  - Jālandharasthitā → `seat`: the stone, its road, flowers and flag
  - Intro, *her light* → `her-light`
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the breath), `m-lick` (the glint on the flower), `m-shimmer` (Kāma's
  glow, the drum's sound), `m-sink` (the petals), `m-sway` (the pennant), `m-breathe` (her light).
- **Primitives:** Shloka 34's bow of flowers promoted to `FlowerBow`, and its blossom to `BLOSSOM`.
- **Notes:** this title wraps, its second line reaching x ≈ 87 (139 at 1100px), so the card sits
  at y ≈ 225–438. Victory could not be a banner again (Shloka 77) or a garland (Shlokas 42 and
  65), so it is the drum and the rain of flowers that greet a victory. Kāma stays a light, never a
  figure, as at Shloka 34.

### Shloka 83: From a seat on the map to the point at the centre, and what is done there in private

- **Component:** `secret-rite.tsx` (defs prefix `sa83`)
- **Composition:** under the card a green valley far in the hills, ridges coming down to a river
  from both sides, and on a terrace by the river her light resting on a moulded stone pedestal,
  a spouted bell-metal vessel beside it pouring a thin stream onto the seat. In the crown at the
  right the nine triangles of the Śrīcakra's centre, faint, and the bindu bright in them. Down the
  right column a shrine's doors shut at the top of a short stair, lamplight at the seam and under
  the sill.
- **Name → part:**
  - Oḍyāṇapīṭhanilayā → `seat`: the pedestal
  - Bindumaṇḍalavāsinī → `bindu`: the nine triangles and the bindu
  - Rahoyāgakramārādhyā → `doors`: the doors, their frame and stair
  - Rahastarpaṇatarpitā → `libation`: the vessel and its stream
  - Intro, *valley far in the hills* → `valley`; *her light* → `her-light`
- **Palette:** no additions.
- **Motion:** `m-shimmer` (the river, the stream), `m-breathe` (her light, the bindu),
  `m-flicker` (the lamplight at the doors), `m-twinkle` (the glint on the seat).
- **Notes:** this title wraps, its second line reaching x ≈ 297 (349 at 1100px), so the card sits
  at y ≈ 225–438. Shloka 82's seat was a vermilion-daubed stone at a road's end; this one is the
  literal pedestal, so the two seats in consecutive verses do not repeat. The valley is green
  rather than snowy to keep clear of the Himavat. The private rite is shown by what cannot be
  seen: the doors are shut.

### Shloka 84: Witness of everything, witnessed by nothing

- **Component:** `the-stage-lamp.tsx` (defs prefix `sa84`)
- **Composition:** the stage of a Kathakali night in the hour after the play, drawn after the
  Pañcadaśī's lamp of the theatre (10.11), which lights the patron, the audience and the dancer
  alike and burns on when they have gone. Under the card the great bell-metal stage lamp, its flame
  her light, in a pool of light on the boards; round the flame six small lights with the signs of
  her mantra's limbs. In the right column the actor's crown set down on a stool, and on the boards
  the cymbals; at the lower left a bowl of muddy water clearing at once round a nut dropped in it.
  Everything throws its shadow away from the flame. Across the crown six full moons.
- **Name → part:**
  - Sadyaḥprasādinī → `bowl`: the bowl, the muddy water and the clear water round the nut
  - Viśvasākṣiṇī → `lit`: the crown, its stool and the cymbals
  - Sākṣivarjitā → `shadows`: the shadows, thrown away from the flame, which throws none
  - Ṣaḍaṅgadevatāyuktā → `limbs`: the six lights and their ring
  - Ṣāḍguṇyaparipūritā → `moons`: the six full moons
  - Intro, *stage* → `stage`: the pool of light and the boards; *great bell-metal lamp* → `lamp`;
    *her light* → `her-light`: the flame and its glow
- **Palette:** no additions.
- **Motion:** `m-flicker` (the flame), `m-breathe` (her glow, the clear water), `m-twinkle` (the
  limb lights, the moons, the crown's mirrors, the glint in the bowl).
- **Notes:** this title stays on one line, reaching x ≈ 360 (412 at 1100px), so the card sits at
  y ≈ 184–396. The first design was the Muṇḍaka's two birds on one tree, which Shloka 47 already
  draws; Shloka 57 has the witness of the dance and an empty seat, and Shlokas 17 and 64 have
  curtains, so the stage here has no dancer, seat or curtain, only what was left on it. Everything
  first read too small; the lamp, crown, cymbals and bowl were scaled up, and the bowl deepened
  when it read as a plate. In the chant miniature the lamp and its glow carry it.

### Shloka 85: The ever-moist Nityā, and half of Śiva's body

- **Component:** `half-of-his-body.tsx` (defs prefix `sa85`)
- **Composition:** under the card the innermost triangle, fifteen moons waxing round its sides,
  and at its heart one flame split down a gold seam: his half white with rudrākṣa beads and his
  crescent on the tip, hers vermilion with pearls. At the lower left an unglazed water pot beaded
  and dripping, a cup beside it; at the lower right a clay lamp just blown out, one thread of smoke
  going up. The moon and a red lotus keep to the crown's far right.
- **Name → part:**
  - Nityaklinnā → `pot`: the pot, its ring, the wet ground and the cup
  - Nirupamā → `similes`: the moon and the lotus
  - Nirvāṇasukhadāyinī → `blown-out`: the lamp and its smoke
  - Nityāṣoḍaśikārūpā → `nityas`: the triangle and its fifteen moons
  - Śrīkaṇṭhārdhaśarīriṇī → `one-body`: the split flame, its beads, crescent and glow
  - Intro, *one flame* → `one-body`
- **Palette:** no additions.
- **Motion:** `m-twinkle` (the moons, the beads of water), `m-breathe` (the glow, the ember),
  `m-flicker` (the point on the seam), `m-shimmer` (the smoke).
- **Notes:** this title stays on one line, reaching x ≈ 397 (449 at 1100px), so the card sits at
  y ≈ 184–396 and the crown is only free to the right. Shloka 21 already has a red and white
  bindu; here the two halves are a whole flame. The first flame was too small and looked like a
  face, with ash bars, a kumkum dot and the crescent on its side; the beads along the edges carry
  the two halves instead, and the crescent moved to the tip.

### Shloka 86: From radiance to root-nature

- **Component:** `root-nature.tsx` (defs prefix `sa86`)
- **Composition:** under the card her light as glow alone, its 108 rays fading outward, over a
  ring of the eight quarters with a light at each. At the crown's right a parasol of four tiers on
  one staff. On the ground three Upaniṣadic pictures of root-nature: at the left the unborn
  she-goat of three colours with two kids; in the front a fig broken open and a seed broken open,
  nothing in it but a faint light; at the right a lotus in clear water, its root dim below.
- **Name → part:**
  - Prabhāvatī → `radiance`: the 108 rays
  - Prabhārūpā → `her-light`: the glow
  - Prasiddhā → `quarters`: the ring, its eight lights and their arcs
  - Parameśvarī → `parasols`: the tiered parasol and its staff
  - Mūlaprakṛti → `goat`: the she-goat and her kids
  - Avyaktā → `seed`: the fig, the seed and the glow between its halves
  - Vyaktāvyaktasvarūpiṇī → `lotus`: the lotus, pad, pool, stalks and rhizome
  - Intro, *her light* → `her-light`
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light, the seed's glow), `m-shimmer` (the rays, the quarters' arcs),
  `m-twinkle` (the quarters' lights).
- **Notes:** this title wraps, its first line reaching x ≈ 101 (153 at 1100px), so the card sits
  at y ≈ 225–438 and the crown is free. Shloka 78's goat was promoted to `Goat` here, with
  `GOAT_FORE` and `GOAT_HIND` for markings over its coat. The tiered parasol first stood at
  x 540, where 1100px crops it; at x 452 it stays in. The quarters' ring was narrowed to clear the
  verse panel, the first seed's halves read as spectacles, and the first pool as a grey box.

### Shloka 87: Knowledge and ignorance, and the moonlight in Kāmeśa's eyes

- **Component:** `moonlight-on-the-lilies.tsx` (defs prefix `sa87`)
- **Composition:** under the card her light as moonlight, ringed, over a pool where two white
  night lilies stand open. At the pool's left the water rises as a wave, foam and bubbles. At the
  crown's right the logicians' hill with smoke going up and only a glow of the fire at its summit.
  On the near bank a rope by a lamp, a rope in its light and a snake beyond it.
- **Name → part:**
  - Vyāpinī → `hill`: the hill, its smoke and the hidden fire
  - Vividhākārā → `water`: the wave, its foam and the bubbles
  - Vidyāvidyāsvarūpiṇī → `rope`: the rope, its two halves, the lamp and its glow
  - Mahākāmeśanayanakumudāhlādakaumudī → `moonlight`: her light, its rings, the pool, the path
    of light, the pads and the lilies
  - Intro, *her light as moonlight* → `moonlight`
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light, the hidden fire, the lamp's glow), `m-shimmer` (the rings),
  `m-twinkle` (the path of light, the foam), `m-sway` (the smoke).
- **Notes:** this title wraps, its first line reaching x ≈ 138 (190 at 1100px), so the card sits
  at y ≈ 225–438. Shloka 79's night lily was promoted here to `NightLily`. Shloka 79 lit its
  lilies with a cone; here the moonlight is rings and a path on the water, and the lilies are
  larger and staggered so they never pair up as eyes. The first rope was too small to tell a rope
  from a snake, and the first smoke was lost in dark mode until a gold-soft line went inside it.

### Shloka 88: Sunlight into the heart, and four ways of standing next to Śiva

- **Component:** `sunlit-heart.tsx` (defs prefix `sa88`)
- **Composition:** the sun at the crown's right sends seven parallel rays down behind the card
  and through the lattice of a dark stone chamber at the lower left, where they lie across its
  floor. Under the card her light stands as the liṅga on its seat. To the right his trident goes
  up a road toward a dark fort with her sealed letter tied to it; in front, his crescent and bilva
  leaves lie beside her footprints, and a full pot stands on a threshold marked with turmeric and
  kumkum.
- **Name → part:**
  - Bhaktahārdatamobhedabhānumadbhānusantatiḥ → `sunbeams`: the sun, the rays, the chamber,
    its lattice and the light on its floor
  - Śivadūtī → `envoy`: the road, the fort, the trident and the letter
  - Śivārādhyā → `worship`: the footprints, the crescent and the bilva leaves
  - Śivamūrtiḥ → `form`: the liṅga of her light, its seat and its glow
  - Śivaṅkarī → `auspicious`: the threshold, its marks and the full pot
  - Intro, *her light as the liṅga* → `form`
- **Palette:** no additions.
- **Motion:** `m-breathe` (the sun's glow, the light on the floor, the liṅga's glow), `m-shimmer`
  (the rays).
- **Notes:** this title wraps, its first line reaching x ≈ 152 (204 at 1100px), so the card sits
  at y ≈ 225–438. Shloka 41's full pot was promoted to `FullPot` here. The sun first stood at
  x 478, where 1100px cut its rays. The rays were first a thin bundle that in the miniature read
  as a pole; they are wider apart now and leave out the stretch the card covers.

### Shloka 89: Approved by the learned, and out of reach of speech

- **Component:** `pillar-of-light.tsx` (defs prefix `sa89`)
- **Composition:** her light as a pillar through the whole picture, fading out above and below;
  the goose flies up beside it under the card and the boar digs at its foot. At the right under
  the card Śiva's crescent and two dotted lines of regard, his and hers. At the left a pale sun and
  moon lit only on her side; at the right letters and thought rising and curling back. In front the
  seers' lamps and a handful of flowers at the pillar's foot.
- **Name → part:**
  - Śivapriyā → `dear`: the crescent and the gold line
  - Śivaparā → `intent`: the vermilion line
  - Śiṣṭeṣṭā → `learned`: the three lamps
  - Śiṣṭapūjitā → `worship`: the flowers
  - Aprameyā → `pillar`: the pillar, its glow, the goose, the boar, its hollow and clods
  - Svaprakāśā → `self-lit`: the sun, the moon and the stars
  - Manovācāmagocarā → `beyond-words`: the letters, the rings of thought and their thread
  - Intro, *a pillar* → `pillar`
- **Palette:** no additions.
- **Motion:** `m-breathe` (the pillar's glow), `m-sway` (the goose), `m-shimmer` (the lines of
  regard), `m-twinkle` (the rings of thought).
- **Notes:** this title stays on one line at 1440 and reaches x ≈ 490, so the card sits at
  y ≈ 184–396 and the crown is all but closed; the goose and the crescent, first drawn in the
  crown, came down under the card. The liṅgodbhava story is told of Śiva's pillar; here, for
  aprameyā, the pillar is her light.

### Shloka 90: Consciousness and dead matter, and the brahmin's daily prayer

- **Component:** `dawn-ghat.tsx` (defs prefix `sa90`)
- **Composition:** dawn at a river ghat. In the crown the seam of night and day with the last
  stars. Under the card the sun half risen over the river, and on the water twenty-four floating
  lamps in three rows of eight. Birds rise from reeds on the far bank. On the stone steps a
  lodestone with its filings and a row of copper vessels, one tipped to pour toward the sun. Up the
  right side भूः, भुवः, स्वः on three levels.
- **Name → part:**
  - Cicchaktiḥ → `cit`: the sun, its glow and the river with its light
  - Cetanārūpā → `sentience`: the birds and the reeds
  - Jaḍaśaktiḥ → `matter-power`: the lodestone and its filings
  - Jaḍātmikā → `inert`: the steps
  - Gāyatrī → `gayatri`: the twenty-four lamps
  - Vyāhṛtiḥ → `vyahrti`: the three words
  - Sandhyā → `sandhya`: the night, the day and the seam, and the stars
  - Dvijavṛndaniṣevitā → `twice-born`: the vessels, the pouring and its rings
  - Intro, *the sun* → `cit`
- **Palette:** no additions.
- **Motion:** `m-breathe` (the sun's glow), `m-twinkle` (the river's light, the stars),
  `m-flicker` (the lamps, through `Lamp`), `m-shimmer` (the pouring).
- **Notes:** this title wraps, its first line reaching x ≈ 134 (186 at 1100px), so the card sits
  at y ≈ 225–438. Here the sun is cit, the light by which things are known, as the Gāyatrī asks of
  it, rather than her own light. The night wash was halved and the filings redrawn as field lines.

### Shloka 91: Seated on the principles, hidden in the sheaths, flushed with wine

- **Component:** `five-sheaths.tsx` (defs prefix `sa91`)
- **Composition:** under the card her light within five sheaths, each opened at the front so the
  next shows, on a seat of thirty-six thin tiers with a fresh garland across it. Round the ground a
  boundary broken wherever her rays cross it. तत् far off in the crown, त्वम् near at the front with
  the rings of a call going out to her, and at the right her jewelled goblet, brimming.
- **Name → part:**
  - Tattvāsanā → `tattvas`: the seat
  - Tat → `tat`: तत् and its glow
  - Tvam → `tvam`: त्वम्
  - Ayī → `ayi`: the call
  - Pañcakośāntarasthitā → `sheaths`: the five sheaths and her light
  - Niḥsīmamahimā → `boundless`: the boundary, the rays and the gaps
  - Nityayauvanā → `young`: the garland and its dew
  - Madaśālinī → `mada`: the goblet
  - Intro, *her light within five sheaths* → `sheaths`
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light), `m-shimmer` (the rays, the call, the drop), `m-twinkle`
  (the gaps, the dew).
- **Notes:** this title wraps, its first line reaching x ≈ 124 (176 at 1100px), so the card sits
  at y ≈ 225–438. This sets the canon for the Dhyāna's jewelled goblet, and moves it out of the
  anticipated list. One wedge cut through all five sheaths read as a pie; the cuts now step.

### Shloka 92: Rolling eyes, flushed cheeks, sandal paste and campaka

- **Component:** `sandal-and-campaka.tsx` (defs prefix `sa92`)
- **Composition:** the verse looks at her face, so the picture keeps to what the poets set beside
  one, and nothing is drawn that could read as a face. Under the card her light. At the left two
  red lotuses on tall stalks rock unsteadily, each its own way; from the crown's top right a pāṭala
  bough hangs its pale rose trumpets. In front, left to right as they are offered, a sandal log on
  its wet grinding stone with a bowl of the paste, and campakas heaped on a leaf.
- **Name → part:**
  - Madaghūrṇitaraktākṣī → `eyes`: the two red lotuses and their pool
  - Madapāṭalagaṇḍabhūḥ → `cheeks`: the pāṭala bough
  - Candanadravadigdhāṅgī → `sandal`: the stone, the log, the paste and the bowl
  - Cāmpeyakusumapriyā → `campaka`: the campakas on their leaf
  - Intro, *red lotuses*, *pāṭala flowers*, *sandal paste* and *flowers* → each part
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light), `m-sway` (the lotuses, the trumpets, by turns).
- **Notes:** this title wraps, its first line reaching x ≈ 46 (98 at 1100px), so the card sits at
  y ≈ 225–438. The face-on campaka of Shloka 4 is promoted to `Campaka` for its second use. Scent
  wisps rising from the paste and the flowers were dropped: fragrance is never drawn as wisps
  (Shloka 10). The sandal bowl and the order, sandal then flowers, agree with Shloka 56's five
  offerings. The bough first ran out past x 520 and dipped into the card; it was drawn in.

### Shloka 93: Six names on one syllable, and the hymn names its own tradition

- **Component:** `kula-hollow.tsx` (defs prefix `sa93`)
- **Composition:** the verse goes from what she is like to the school that claims her, and the
  picture goes from the far edge of her island in to the hollow at its root. In the crown the moat
  of nectar round her city, with Kurukullā over it as a red light, her flower bow and arrow beside
  her. Under the card the kula hollow, the coiled power asleep in it and her light rising out of
  it; round it on the ground the assembly of powers; up to it from the front the Kaula path, its
  lamps the people on it. At the left kuśa cut and tied with a kuśa ring, at the right śirīṣa.
- **Name → part:**
  - Kuśalā → `skilful`: the kuśa bundle and ring
  - Komalākārā → `tender`: the śirīṣa
  - Kurukullā → `kurukulla`: the moat, her light, the bow and arrow
  - Kuleśvarī → `kula`: the assembly of powers
  - Kulakuṇḍālayā → `hollow`: the pit, the coil and her light
  - Kaulamārgatatparasevitā → `kaula`: the path and its lamps
  - Intro, *moat of nectar* → `kurukulla`; *hollow at its root* → `hollow`; *kula* → `kula`;
    *Kaula path* → `kaula`
- **Palette:** no additions.
- **Motion:** `m-breathe` (her light, Kurukullā, the coil's glow), `m-shimmer` (the powers' joins),
  `m-twinkle` (the powers, the arrow's head), `m-flicker` (the lamps), `m-sway` (the śirīṣa).
- **Notes:** this title wraps, its first line reaching x ≈ 110 and its second, longer, x ≈ 171
  (223 at 1100px), so the card sits at y ≈ 225–438 and the moat starts right of x 196. Shloka 37's
  assembly of powers is promoted to `KulaAssembly`, which can now lie flat on the ground, and
  Shloka 40's coil to `coilPath` and `Coil`. A fan of three arrows behind Kurukullā read as a
  bouquet; one arrow nocked on the bow replaced it.

### Shloka 94: Mother of two sons, and then nine words for what people want

- **Component:** `mother-of-two-sons.tsx` (defs prefix `sa94`)
- **Composition:** the verse stops describing a goddess and lists goods, so the picture is a list
  too, each good one plain thing. Under the card her light, its rays all round; at the left Kumāra
  among the six Kṛttikās with his spear, at the right Gaṇeśa's dawn-red light with his mouse. In
  the crown the mountain. On the ground the sheaf, the svastika, and Nandinī with her calf; in
  front the still pool, the full pot, the book on its stand, and the engine of obstacles broken.
- **Name → part:**
  - Kumāragaṇanāthāmbā → `sons`: Kumāra, his stars and spear, Gaṇeśa's light and mouse
  - Tuṣṭi → `contentment`: the full pot
  - Puṣṭi → `nourishment`: the sheaf
  - Mati → `understanding`: the book on its stand
  - Dhṛti → `steadfast`: the mountain
  - Śānti → `peace`: the still pool
  - Svastimatī → `wellbeing`: the svastika
  - Kānti → `radiance`: her light and its rays
  - Nandinī → `nandini`: the cow and her calf
  - Vighnanāśinī → `obstacles`: the broken engine, its glow and gleam
  - Intro, *two sons* → `sons`; *her light* → `radiance`; *obstacles broken* → `obstacles`
- **Palette:** no additions.
- **Motion:** `m-breathe` (the lights), `m-shimmer` (her rays), `m-twinkle` (the Kṛttikās),
  `m-lick` (the gleam at the break).
- **Notes:** this title wraps, its first line reaching x ≈ 77 and its second x ≈ 146 (198 at
  1100px), so the card sits at y ≈ 225–438. Four inline drawings get their second use here and are
  promoted: Shloka 31's broken engine (`BrokenSlab`), Shloka 77's cow (`Cow`), Shloka 55's mouse
  (`Mouse`) and Shloka 53's book on its stand (`BookOnStand`). The spear first stood down into the
  sheaf, and the mouse floated with no ground under it.

### Shloka 95: Fire, a third eye, the garland of letters, the swan, and one plain word

- **Component:** `fire-and-the-garland.tsx` (defs prefix `sa95`)
- **Composition:** the verse opens hot and ends fragrant, and the picture runs from the crown
  down. In the crown her three eyes on a slant: the moon, the fire, the sun. Under the card her
  light burning. At the left a wagtail on its stone; across the middle the garland of letters in
  the Mālinī order. In front a swan on still water, the word माता, and at the right the hills of
  Malaya with their sandal trees.
- **Name → part:**
  - Tejovatī → `tejas`: her light and its flames
  - Trinayanā → `three-eyes`: the moon, the fire and the sun
  - Lolākṣīkāmarūpiṇī → `lolaksi`: the wagtail and its stone
  - Mālinī → `malini`: the garland of letters
  - Haṃsinī → `hamsini`: the swan and its water
  - Mātā → `mata`: the word
  - Malayācalavāsinī → `malaya`: the hills and the sandal trees
  - Intro, *her three eyes* → `three-eyes`; *her light edged with flame* → `tejas`; *swan on still
    water* → `hamsini`; *one plain word* → `mata`; *sandal hills* → `malaya`
- **Palette:** no additions.
- **Motion:** `m-flicker` (the fire, her flames), `m-breathe` (the fire's and sun's glows, her
  light), `m-dart` (the wagtail), `m-sway` (the sandal trees).
- **Notes:** this title wraps, its first line reaching x ≈ 126 and its second x ≈ 181 (233 at
  1100px), so the card sits at y ≈ 225–438. This sets the canon for her three eyes, and moves them
  out of the anticipated list: never drawn as eyes, and never level pairs. Shloka 74's wagtail is
  promoted to `Wagtail`. Flames pointing straight out from her light made a second sun.

## Open questions

- Name 559, *tāmbūlapūritamukhī* ("her mouth full of betel"), returns to the betel, which Shloka 10
  now draws only as fragrance. The betel leaf, roll, clove, and camphor of Shloka 10's first version
  (in git history) are a starting point, kept away from anything that reads as a mouth.
