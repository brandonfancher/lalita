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
| Her footprints (śrīpāda) | A pair of `--art-vermilion` footprints, toes up, big toes inward, laid on a surface and foreshortened to about 0.7 of their height: a sole with a narrow inner arch and five separate toes. Without the arch and the gap before the toes they read as mittens | Inline (`whole-image.tsx`) | Dhyāna |
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
| Diamond (vajra) | Face-on: an eight-sided `--art-moon` girdle with a `--gold` edge, the table an octagon half its size, `--gold-soft` facet lines from the table's corners to the girdle's, a small `--art-core` `glint` at the upper left, in a gold cup. The facets keep it from reading as a pearl | Inline (`campaka-jewel.tsx`) | Shloka 7 |
| Her nose stud (mūkkutti) | Seven diamonds in a gold rosette (one in the middle, six round it, one straight up), beaded at the rim, outlined in `--art-carve`. A small `--art-moon` glow just round it makes it white-hot against gold by day; behind that a larger `--art-core` glow, a four- and an eight-pointed `glint`, and sixteen hair-fine rays, the upward one longest. Flashes on three stones | Inline (`campaka-jewel.tsx`) | Shloka 7 |
| Pearl (muktā) | An `--art-moon` disc with a hair-fine gold edge, a `--gold-soft` shading arc on the lower right, an `--art-core` highlight at the upper left; hung from a small gold ring under a gold cap | Inline (`campaka-jewel.tsx`) | Shloka 7 |
| Kadamba | A head is a ball of radius 9–14: a radial gradient from `--art-core` (upper left) through `--art-saffron` to `--art-vermilion`, stippled with tiny `--art-ivory` florets in a sunflower spiral, and ringed by short `--art-saffron` hairline styles that stand out to about 1.3 times its radius, each tipped with an `--art-ivory` dot edged in gold (`m-twinkle`, three groups). The pale tips make it a kadamba and not an orange or a berry. Heads come in sprays (mañjarī) of four or five on short `--leaf` stalks, among broad, pointed, glossy `--leaf` leaves with a `--gold-soft` midrib and curved veins, long enough to show beyond the heads | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| Ear pendant (tāṭaṅka) | Hung from a gold stud in the lobe (a ruby in it on the sun's side, a pearl on the moon's), a short gold link with gold beads, a bail, the disc, and a drop beneath (a `Ruby` under the sun, a pearl under the moon). Viewer's left is her right ear: the sun there, the moon on the other side. Each pendant swings from its lobe (`m-sway`, see Motion additions) | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| The moon as a little boat (uḍupa) | A small gold crescent, horns up, radius 13, riding the top of the moon's disc as its bail, with three `--art-vermilion` beads along the hull and the ring for the link between its horns | Inline (`sun-moon-earrings.tsx`) | Shloka 8 |
| Balance (tulā) | A gold beam, thickest at the middle and tapering to bud finials, with four `--gold-soft` bands, a carved centre line, and a boss at the pivot. It hangs in a fork (two gold cheeks under a crossbar with a red mark at its centre) from a ring and a short chain. A tongue stands at right angles to the beam, so when the beam tips, the tongue leans out from under the red mark toward the heavier pan. Each pan is a shallow gold bowl on three cords (one behind) from a ring under a hook at the beam's end: a `--gold-soft` inside, a beaded front rim, a carved band, a saffron sheen, and a bud drop beneath. The pans swing from their hooks (`m-sway`) | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Her light in a vessel | A pool of light filling the vessel (a radial gradient from `--art-core` through `--art-saffron` to `--art-vermilion`), a soft tall glow rising from it, and the bindu hanging in the glow just above the surface, not on it: a bright dot on a red ellipse reads as an eye. Her radiance (the 108 hairlines) starts at the bindu and fades in from nothing | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Ruby mirror (ādarśa) | A round hand mirror: a flat `--art-vermilion` face with a soft `--art-crimson` bevel at its edge and two diagonal `--art-core` sheen streaks, in an `--art-carve` setting, a beaded gold frame, and a gold handle with a collar and a bud foot. A shaded, domed face, or a crest of petals on the frame, made it a pomegranate | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Coral (vidruma) | A branching sprig of round-capped `--art-vermilion` strokes over slightly wider `--art-crimson` ones, knobbed tips, a few tiny `--art-ivory` polyps (fresh coral is alive; `m-twinkle`), in a small gold mount | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Bimba (ivy gourd) | A `--leaf` creeper with five-lobed, heart-based leaves veined in `--gold-soft`, coiling tendrils, and small oval gourds on short stalks. Each gourd is scarlet only on the side facing her light and `--leaf` on the far side, with pale stripes there and a core sheen on the red side: Śaṅkara's bimba is red only by reflecting her | Inline (`tipped-scales.tsx`) | Shloka 9 |
| Water in a channel | Filled with the miniature painters' pattern of small arcs, each row set half an arc along (a `<pattern>`, `--gold-soft`), over a soft saffron glow, between gold banks with a fainter outer kerb. Rounded, organic banks: straight banks and square corners read as a pipe, a band of constant width as a snake. Dashed flow lines read as road markings by lamplight | Inline (`wedding-doorway.tsx`) | Shloka 6 |
| Sprout (aṅkura) | A slim `--art-ivory` stem outlined in hair-fine gold, tapering and bending a little toward her light, with two small pointed seed-leaves opened at the top (ivory with a faint `--leaf` tint, gold edges) and a split `--gold-soft` seed husk at its foot. A few are still hooked: the stem arches over and the closed seed-leaves hang from the crook. Glints of `--art-core` on some tips (`m-twinkle`, three groups). Drawn as filled outlines, the stems read as candles; tapered, with open seed-leaves, as seedlings | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| Seed bed | A mound of earth curving like a smile, its crest slightly uneven: a gradient from `--art-saffron` at the crest through faint `--art-crimson` to nothing below, a thin vermilion crest line, `--art-crimson` clods, and `--gold-soft` furrow lines under each row. Vermilion or crimson alone at the crest turned it pink by day | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| Betel leaf (tāmbūla) | Heart-shaped, tip down, in `--leaf` with a hair-fine gold edge, five `--gold-soft` veins arching from the notch to the drawn-out tip, and a short stalk curving aside (pointed at the bindu, it made the leaf a fruit on a stem). Set at an angle beside the roll, a leaf read as a second, olive roll; centred behind it, tip down, it frames the roll and says "betel" | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| Betel roll (vīṭikā) | A triangle of folded leaf, apex down, its top flap folded over: `--leaf` washed with `--art-ivory` (the flap paler, as the leaf's underside), gold edges and fold lines, `--leaf` veins on the flap, pinned through the flap with an `--art-crimson` clove (a round head with four sepals). Camphor flakes in the fold and fallen beside it | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| Camphor (karpūra) | Small six-sided `--art-moon` flakes with a hair-fine gold edge, each with a small `--art-core` `glint` (`m-twinkle`). Camphor shares the moon's names (śaśāṅka, mṛgāṅka), so it takes the moon's colour | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| Fragrance | Wisps, never ribbons: three tapering `--gold` wisps per stream, waving and braided round a spiral, the main one widest and carrying a line of `--art-core` motes (`m-flow`). Each ends at its outer end in a small curl turned outward, as smoke curls, over a faint `--art-saffron` haze that fades out before her light. As flat filled ribbons they read as paper strips; a haze in `--art-moon` turned grey by lamplight | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| The eight quarters (diś) | A faint 0.9-unit `--gold` horizon ring with a four-pointed gold `glint` at each of the eight quarters (every 45°, north at the top). Where the quarters are drawn toward her, the ring dips between the pinned points, about a tenth of its radius, into an eight-cusped shape | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |
| The seed-syllable ह्रीं | Tiny ह्रीं in Tiro Devanagari, `--art-core`, sown in the earth. It closes each of the three parts of the Śuddhavidyā mantra; the mantra itself is not written out | Inline (`sprouts-and-scent.tsx`) | Shloka 10 |

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

- **`m-flow`** (Shloka 10): motes travelling along a stroke toward the end of its path, by
  animating `stroke-dashoffset` over 3.6s. For fragrance drawn in, and anything that should be
  seen to travel along a line. Give the path round caps and `stroke-dasharray: 0 <gap>`, set
  `--period` to the gap, and draw it in the direction of travel. Use dots, never dashes (dashes
  read as road markings, see Shloka 6).

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
  before. On phones the pendants sit behind the chant bar, and in the practice miniature on phones
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
  the last syllables of the second line in the practice miniature; they stay legible.

### Shloka 10: Sprouts of the mantra, and a scent that gathers the quarters

- **Component:** `sprouts-and-scent.tsx` (defs prefix `sa10`)
- **Composition:** a convergence. Her mouth is only her light, a bindu just below the card. Eight
  streams of fragrance spiral in to it clockwise, as one walks round a shrine, from the eight
  quarters of a faint horizon ring. The ring is pinned at the quarters and dips inward between
  them, drawn toward her. In her light, a betel roll pinned with a clove lies on a heart-shaped
  betel leaf, with flakes of camphor. Beneath it, a seed bed curved like a smile holds two
  staggered rows of sixteen white sprouts, leaning toward her. The first composition whose force
  runs inward (Shloka 1's rays and Shloka 3's aim run outward), the first fragrance, and the first
  thing growing from the ground.
- **Name → part:**
  - Śuddhavidyāṅkurākāradvijapaṅktidvayojjvalā → `sprouts`: the seed bed, its furrows, and the two
    rows of sprouts, with glints on some tips
  - Karpūravīṭikāmodasamākarṣidigantarā → `betel`: the betel leaf, the roll, the clove and the
    camphor, the wisps of fragrance and their motes, and the gathered horizon with its eight
    quarters
  - Intro, *light* → `light`: the glow and the bindu where the streams meet
  - Detail → `seeds`: three tiny ह्रीं sown in the earth, the syllable that closes each of the
    mantra's three parts (a mantra's syllables are *bīja*, seeds)
- **Palette:** gold for the fragrance and the horizon, `--art-ivory` for the sprouts, `--leaf` for
  the betel, `--art-moon` for the camphor, `--art-crimson` for the clove and the earth's shading,
  and saffron for the earth and her glow. Vermilion only in the bed's crest line. No additions.
- **Motion:** the new `m-flow` (motes travelling in along the main wisps), `m-twinkle` (the glints
  on the sprouts and the camphor, in three groups), and `m-shimmer` (her glow).
- **Notes:** The title stays on one line and reaches x ≈ 214 of the artwork at y ≈ 90–130 on
  1440px screens, well clear of the north quarter at the top of the ring (x 320, y 144). The
  fragrance first had eight flat filled ribbons, which read as paper strips or pipes. Thin braided
  wisps with outward curls made them smoke, and a gradient that dies out before her light kept the
  haze from turning into grey bands round the bindu by lamplight. The horizon first dipped with
  the wrong period, so only four quarters were pinned and it read as a diamond. The betel leaf
  first lay at an angle beside the roll and read as a second roll; centred behind it, tip down, it
  frames the roll. The first sprouts were filled outlines and read as candles or a comb. Day
  renders were faint until the wisps were widened and her glow raised. In the practice miniature on
  phones, the sprouts sit under the last syllables of the second line, which stay legible in both
  themes.

## Open questions

- The radiance of 108 hairlines is now drawn inline three times (Shlokas 1, 8, and 9), each a
  little differently (start, lengths, fade). If a fourth artwork needs it, consider a `radiance()`
  helper in `primitives.tsx`, kept byte-for-byte for the existing three.
- Shloka 10 has a local `taper(points, width)` that fills a centre line of varying width, for
  wisps and stems that thin out. If a second artwork needs tapering strokes (tendrils, smoke,
  hair-fine flames), promote it to `primitives.tsx`.
- Name 559, *tāmbūlapūritamukhī* ("her mouth full of betel"), returns to the betel. Draw it with
  Shloka 10's canon.
