import { AutumnMoonTurn } from "./autumn-moon-turn";
import { CampakaJewel } from "./campaka-jewel";
import { CourtAndArmy } from "./court-and-army";
import { DevotionGoverns } from "./devotion-governs";
import { DrawnBow } from "./drawn-bow";
import { DrawnCurtain } from "./drawn-curtain";
import { EighthNightMoon } from "./eighth-night-moon";
import { ElephantsAndHorses } from "./elephants-and-horses";
import { EmptyCity } from "./empty-city";
import { FireOfAwareness } from "./fire-of-awareness";
import { FirstRainQuivers } from "./first-rain-quivers";
import { FirstTwoKnots } from "./first-two-knots";
import { FloweringHair } from "./flowering-hair";
import { ForestOfBecoming } from "./forest-of-becoming";
import { GoldAndPearls } from "./gold-and-pearls";
import { GrownStake } from "./grown-stake";
import { KingOfWheels } from "./king-of-wheels";
import { KulaAndSamaya } from "./kula-and-samaya";
import { LightningVine } from "./lightning-vine";
import { MantraBody } from "./mantra-body";
import { PotAndSpace } from "./pot-and-space";
import { RootMantra } from "./root-mantra";
import { Sanjivani } from "./sanjivani";
import { SummitAndRain } from "./summit-and-rain";
import { TenTakenAway } from "./ten-taken-away";
import { WallOfFire } from "./wall-of-fire";
import { NityasOnslaught } from "./nityas-onslaught";
import { BalasArrows } from "./balas-arrows";
import { GlanceAndASon } from "./glance-and-a-son";
import { AnsweringRain } from "./answering-rain";
import { TenDescents } from "./ten-descents";
import { TheDrawnScreen } from "./the-drawn-screen";
import { MeruInward } from "./meru-inward";
import { MiddleOfTheMoon } from "./middle-of-the-moon";
import { MountainsDaughter } from "./mountains-daughter";
import { SaltAndTheCouch } from "./salt-and-the-couch";
import { WakingAndDream } from "./waking-and-dream";
import { MirrorAndKnot } from "./mirror-and-knot";
import { GraciousOne } from "./gracious-one";
import { GreatYantra } from "./great-yantra";
import { OneInManyPots } from "./one-in-many-pots";
import { StairOfAttainment } from "./stair-of-attainment";
import { LetterRosary } from "./letter-rosary";
import { MonsoonPool } from "./monsoon-pool";
import { NailMoons } from "./nail-moons";
import { NectarIsland } from "./nectar-island";
import { OceanOfSleep } from "./ocean-of-sleep";
import { OnHisLap } from "./on-his-lap";
import { OtherEndOfTheRope } from "./other-end-of-the-rope";
import { RiversToTheSea } from "./rivers-to-the-sea";
import { HillFort } from "./hill-fort";
import { SafflowerSlope } from "./safflower-slope";
import { SilencedLute } from "./silenced-lute";
import { SproutingSeed } from "./sprouting-seed";
import { StillWaterSteps } from "./still-water-steps";
import { SunMoonEarrings } from "./sun-moon-earrings";
import { ThousandDawns } from "./thousand-dawns";
import { TippedScales } from "./tipped-scales";
import { TwoBirds } from "./two-birds";
import type { Artwork } from "./types";
import { WeddingDoorway } from "./wedding-doorway";
import { WhatItHoldsUp } from "./what-it-holds-up";
import { WheelStopped } from "./wheel-stopped";
import { WholeImage } from "./whole-image";
import { WitnessOfTheDance } from "./witness-of-the-dance";
import { YoginiTemple } from "./yogini-temple";

/** Artwork adorning each shloka page, keyed by module id, with its note for readers. */
export const ARTWORK: Record<string, Artwork> = {
  "000": {
    Art: WholeImage,
    intro: (Spot) => (
      <>
        A <i>dhyāna</i> builds an image in the mind, and these four verses build four different ones. The artwork
        gathers them into one, laid out from crest to foot as a temple image is. There is no figure: where she is there
        is only a <Spot part="bindu">point of light</Spot>, and the second verse says what it is: &ldquo;I&rdquo;.
      </>
    ),
    entries: [
      {
        phrase: { label: "Line 1", deva: "सिन्दूरारुण विग्रहां", iast: "sindūrāruṇa vigrahāṃ", gloss: "her body red as vermilion" },
        part: "light",
        depicts: "Her body is drawn only as its colour: a tall glow of vermilion light from the crown down to the seat.",
      },
      {
        phrase: { label: "Line 1", deva: "माणिक्यमौलि स्फुरत्", iast: "māṇikyamauli sphurat", gloss: "a diadem of rubies, flashing" },
        part: "crown",
        depicts: "The domed crown of Shloka 4, tier upon tier of rubies, with flashes passing over its stones.",
      },
      {
        phrase: { label: "Line 2", deva: "तारा नायक शेखरां", iast: "tārā nāyaka śekharāṃ", gloss: "the lord of the stars as her crest" },
        part: "moon",
        depicts: "On the crown's finial rests the moon as a slender crescent, its horns turned up.",
      },
      {
        phrase: { label: "Line 4", deva: "रत्न घटस्थ रक्तचरणां", iast: "ratna ghaṭastha raktacaraṇāṃ", gloss: "her red feet resting on a jewelled vessel" },
        part: "vessel",
        depicts:
          "At the foot, a gold pot set with rubies and emeralds. On its lid are two red footprints, the old way of showing that she stands there.",
      },
      {
        phrase: {
          label: "Line 5",
          deva: "धृतपाशाङ्कुशपुष्पबाणचापाम्",
          iast: "dhṛtapāśāṅkuśapuṣpabāṇacāpām",
          gloss: "holding noose, goad, flower-arrow and bow",
        },
        part: "weapons",
        depicts:
          "Four arms of light, each with a bangle. The upper two raise the noose and the goad beside the crown; the lower two hold the sugarcane bow, strung with bees, and the five flower arrows.",
      },
      {
        phrase: { label: "Line 6", deva: "अणिमादिभिरावृतां मयूखैः", iast: "aṇimādibhirāvṛtāṃ mayūkhaiḥ", gloss: "ringed by aṇimā and the rest, as rays" },
        part: "siddhis",
        depicts: "Eight short rays around her, one for each of the eight powers, each ending in a point of light between her arms.",
      },
      {
        phrase: { label: "Line 7", deva: "पद्मासनस्थां", iast: "padmāsanasthāṃ", gloss: "seated on a lotus" },
        part: "lotus-seat",
        depicts: "A lotus seat of upturned and downturned petals, gold because this verse makes her gold.",
      },
      {
        phrase: { label: "Line 14", deva: "जपाकुसुमभासुरां", iast: "japākusumabhāsurāṃ", gloss: "shining like a hibiscus flower" },
        part: "hibiscus",
        depicts:
          "At her heart a scarlet hibiscus opens: five broad petals round a dark eye, and its column of pollen leaning out.",
      },
    ],
    detail: {
      part: "yantra",
      body: (
        <>
          There is also a small detail for the attentive: a hair-fine downward triangle surrounds the bindu. It is the
          innermost enclosure of the Śrīcakra, the yantra of Śrīvidyā, and the third verse calls her Śrīvidyā outright.
        </>
      ),
    },
  },
  "001": {
    Art: FireOfAwareness,
    intro: (Spot) => (
      <>
        It is a{" "}
        <Spot part="frame">
          <i>prabhāvalī</i>
        </Spot>
        , the ring of fire that frames a temple image of the Goddess. Every element comes from one of
        the five names.
      </>
    ),
    entries: [
      { nama: 1, part: "rays", depicts: "108 fine rays of light shining out from the bindu." },
      { nama: 2, part: "parasol", depicts: "A royal parasol, the emblem of sovereignty, above the arch." },
      {
        nama: 3,
        part: "throne",
        depicts:
          "The whole shrine stands on a lotus-and-jewel throne, flanked by two seated lions facing the flame.",
      },
      {
        nama: 4,
        part: "flame",
        depicts:
          "A flame rising from a stepped fire-pit. At its neck sits a bindu (point) of light: the fire of awareness itself.",
      },
      {
        nama: 5,
        part: "embers",
        depicts: "Embers drifting slowly upward, risen and already moving toward the task.",
      },
    ],
    detail: {
      part: "sri",
      body: (
        <>
          There is also a small detail for the attentive: three tiny <span className="deva not-italic">श्री</span>{" "}
          are set into the arch&rsquo;s band of pearls, one for each <i>śrī</i> that opens the stotra.
        </>
      ),
    },
  },
  "002": {
    Art: ThousandDawns,
    intro: (Spot) => (
      <>
        It is sunrise over the <Spot part="sea">eastern sea</Spot>, in the red light of <i>aruṇa</i> that
        colours the Dhyāna. She is the light itself, and every element comes from one of the four names.
      </>
    ),
    entries: [
      {
        nama: 6,
        part: "sunrise",
        depicts:
          "A sun caught half over the horizon, still rising, ringed by exactly a thousand points of light. The bindu at its heart is her.",
      },
      {
        nama: 7,
        part: "arms",
        depicts:
          "Four long beams of light reach out from the sun as her arms. The upper two, each with a gold bangle, lift the noose and the goad; the lower two lie along the horizon.",
      },
      {
        nama: 8,
        part: "noose",
        depicts:
          "A noose of twisted cord, bound with gold and strung with beads. It is red because rāga first means colouring, the dye that stains.",
      },
      {
        nama: 9,
        part: "goad",
        depicts: "A gold elephant-goad with a spear point and a curved hook, flashing along its edges.",
      },
    ],
    detail: {
      part: "thread",
      body: (
        <>
          There is also a small detail for the attentive: a hair-fine red thread runs from the noose&rsquo;s tail down to
          the bindu. Whoever this cord draws is held at the other end by her.
        </>
      ),
    },
  },
  "003": {
    Art: DrawnBow,
    intro: (Spot) => (
      <>
        Her bow is drawn to full and aimed at the sky, and the hand that draws it is a{" "}
        <Spot part="bindu">point of light</Spot>, the bindu. Every element comes from one of the three names.
      </>
    ),
    entries: [
      {
        nama: 10,
        part: "bow",
        depicts:
          "A bow of sugarcane arched across the top, jointed like the cane and sprouting leaves at both tips, bent as far as it will go.",
      },
      {
        nama: 11,
        part: "arrows",
        depicts:
          "Five flower-tipped arrows on the string. Each flower holds the old sign of an element at its heart: the ring of space for sound, the star of air for touch, the triangle of fire for form, the crescent of water for taste, the square of earth for smell.",
      },
      {
        nama: 12,
        part: "flood",
        depicts:
          "Her red light pours down into a pool where a ring of world-eggs floats half-sunk, each with a spark of its own. A few are going under as you watch, and deeper ones show faintly below.",
      },
    ],
    detail: {
      part: "bees",
      body: (
        <>
          There is also a small detail for the attentive: the bowstring is a line of honeybees, as Kāma&rsquo;s is in the
          old poems.
        </>
      ),
    },
  },
  "004": {
    Art: FloweringHair,
    intro: (Spot) => (
      <>
        Here the stotra begins to describe her from head to foot, so the artwork reads from the top down. She herself is
        only the <Spot part="light">point of light</Spot> where a jewel is worn at the head of a plait. Every element
        comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 13,
        part: "flower-plait",
        depicts:
          "A rosette and a long plait, her hair glimpsed only as a blue-black gloss between the flowers woven through it. The four kinds come in the order the name gives them: gold campaka, red aśoka, white punnāga and the white water-lily.",
      },
      {
        nama: 14,
        part: "crown",
        depicts:
          "A domed crown set tier upon tier with rows of rubies. Short rays of gold and red spring from it, because the name dwells on its glittering.",
      },
    ],
    detail: {
      part: "stars",
      body: (
        <>
          There is also a small detail for the attentive: above the crown, a few stars are turning red and coming down
          to it. Śaṅkara says the rubies in her crown were stars that became rubies to be set there.
        </>
      ),
    },
  },
  "005": {
    Art: EighthNightMoon,
    intro: (Spot) => (
      <>
        Both names are moons, so this is a night lit only by them, with their{" "}
        <Spot part="moonlight">light</Spot> filling the space between. The first name gives her a moon; the second
        makes her one.
      </>
    ),
    entries: [
      {
        nama: 15,
        part: "half-moon",
        depicts:
          "The moon of the eighth night stands above at exactly half, its flat edge down like the line of a brow, its dark half faintly visible. It is ringed with a halo because the name dwells on its shining.",
      },
      {
        nama: 16,
        part: "face-moon",
        depicts:
          "Below, the full moon is her face, and its only mark is a dab of musk where the moon's own spot would be. Up close the mark is a leaping deer: musk is \u201cdeer's navel\u201d, and the moon is \u201cdeer-marked\u201d.",
      },
    ],
    detail: {
      part: "fortnight",
      body: (
        <>
          There is also a small detail for the attentive: along the foot runs a string of the fifteen nights of the
          bright fortnight, waxing from left to right. The eighth, ringed in red and gold beneath her face, is the same half as
          her brow.
        </>
      ),
    },
  },
  "006": {
    Art: WeddingDoorway,
    intro: (Spot) => (
      <>
        Both names make her face a place that belongs to Love. Here it is his wedding house, seen only as the light that
        fills its <Spot part="doorway">doorway</Spot> and brims at the threshold. Every element comes from one of the two
        names.
      </>
    ),
    entries: [
      {
        nama: 17,
        part: "torana",
        depicts:
          "Over the door stands a toraṇa, the gateway put up for a wedding, and its two arches are her brows. Mango leaves, jasmine and bells hang from it, and plantain stems are tied up as its posts.",
      },
      {
        nama: 18,
        part: "stream",
        depicts:
          "Her beauty spills over the threshold and runs off to the side, as a full tank spills into its outlet channel. Two fish circle in it, now and then darting, as her eyes do.",
      },
    ],
    detail: {
      part: "ajna",
      body: (
        <>
          There is also a small detail for the attentive: a point of light in the space between the two brows. The
          tradition places the <i>ājñā</i> cakra there, and it gives the attention somewhere to rest while chanting.
        </>
      ),
    },
  },
  "007": {
    Art: CampakaJewel,
    intro: (Spot) => (
      <>
        The whole verse is about her nose, so the artwork draws what the names liken it to, in a night sky where the{" "}
        <Spot part="stars">stars</Spot> keep their distance. Every element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 19,
        part: "campaka",
        depicts:
          "A single campaka stands straight up on its stem, just opened, its narrow petals still almost closed and at their palest. The name calls her nose a daṇḍa, a stalk that grows straight up.",
      },
      {
        nama: 20,
        part: "nose-jewel",
        depicts:
          "On the flower's flank is a nose stud of seven diamonds in gold, as the goddess wears in the temples of the south. No star shows anywhere near it, and the nearest have faded to faint rings.",
      },
    ],
    detail: {
      part: "pearl",
      body: (
        <>
          There is also a small detail for the attentive: a pearl hangs from the stud. Śaṅkara says her breath is so cool
          that it condenses into pearls inside her nose, and she wears one of the surplus outside.
        </>
      ),
    },
  },
  "008": {
    Art: SunMoonEarrings,
    intro: (Spot) => (
      <>
        The verse turns to her ears and hangs two things of wildly different size on them, side by side and without
        comment. Her <Spot part="face-light">face</Spot> is only the light between them. Every element comes from one of
        the two names.
      </>
    ),
    entries: [
      {
        nama: 21,
        part: "kadamba",
        depicts:
          "Over each ear is tucked a sprig of kadamba, her own tree: small orange balls of blossom bristling with pale styles, among broad glossy leaves.",
      },
      {
        nama: 22,
        part: "earrings",
        depicts:
          "From her ears hang the sun, on her right, and the full moon, on her left, each set in gold and swinging a little. The moon keeps its halo and its deer, and the sun its rays.",
      },
    ],
    detail: {
      part: "boat",
      body: (
        <>
          There is also a small detail for the attentive: the moon hangs from a clasp shaped like a little boat. The
          verse&rsquo;s word for the moon is <i>uḍupa</i>, a raft, for the boat-shaped half moon, and it hides in the{" "}
          <i>o</i> of <i>tapanoḍupa</i>.
        </>
      ),
    },
  },
  "009": {
    Art: TippedScales,
    intro: (Spot) => (
      <>
        Both names are contests that the thing she is compared to loses, so the artwork stages them as Śaṅkara does, as
        a weighing. The <Spot part="scales">balance</Spot> has tipped, and its tongue leans toward the pan that sank,
        where <Spot part="light">her light</Spot> lies, red by its own nature. Every element comes from one of the two
        names.
      </>
    ),
    entries: [
      {
        nama: 23,
        part: "mirror",
        depicts:
          "In the pan that rose stands a round mirror cut from a single ruby, leaning toward her side. Its polished face catches only a dull copy of her light.",
      },
      {
        nama: 24,
        part: "coral-bimba",
        depicts:
          "Beside the mirror stands a sprig of fresh coral. The bimba creeper lies on the ground beneath and won't climb on: its tendrils curl away, and its fruits are red only on the side that faces her.",
      },
    ],
    detail: {
      part: "reflections",
      body: (
        <>
          There is also a small detail for the attentive: on the pool of light that fills her pan float two
          reflections, a sun and a moon. They are the earrings of the verse before, reflected in her cheek, which is how
          Śaṅkara explains why a cheek is compared to a mirror at all.
        </>
      ),
    },
  },
  "010": {
    Art: SproutingSeed,
    intro: (Spot) => (
      <>
        The verse ends the first ten with her mouth, and the artwork draws neither mouth nor teeth. She is the{" "}
        <Spot part="light">light</Spot> in a seed that has split open, and every element around it comes from one of
        the two names.
      </>
    ),
    entries: [
      {
        nama: 25,
        part: "sprout",
        depicts:
          "One sprout rises from the seed of her light and opens two seed-leaves, each a row of sixteen points of white light. They are the two rows of her teeth, and the mantra called Śuddhavidyā, sown in her and come up.",
      },
      {
        nama: 26,
        part: "fragrance",
        depicts:
          "The fragrance of her camphor betel is not drawn as smoke, only as what it does. The horizon, pinned at the eight quarters of the sky, is drawn in toward her ring after ring, and turns camphor-white as it nears her.",
      },
    ],
    detail: {
      part: "seed",
      body: (
        <>
          There is also a small detail for the attentive: the split husk is engraved with the syllable{" "}
          <span className="deva not-italic">ह्रीं</span>, which closes each of the three parts of the mantra. A
          mantra&rsquo;s syllables are called <i>bīja</i>, seeds.
        </>
      ),
    },
  },
  "011": {
    Art: SilencedLute,
    intro: (Spot) => (
      <>
        Here the verse stops describing her and records two casualties: an instrument shamed into silence, and a mind
        under water. Between them is <Spot part="light">her light</Spot>, small and soft, because the smile is only a
        faint one. Every element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 27,
        part: "lute",
        depicts:
          "Above lies the kacchapī, Sarasvatī's own lute, named for the tortoise its bowl is shaped like. As Śaṅkara tells it, she has quietly slipped its cloth cover back on, and its strings are still.",
      },
      {
        nama: 28,
        part: "flood",
        depicts:
          "Below, the light of her smile has become a flood, and in it sinks the crescent Kāmeśa wears, for his mind: the Veda says the moon was born from mind. Pearls of light rise from it, and it does not come back up.",
      },
    ],
    detail: {
      part: "manasa",
      body: (
        <>
          There is also a small detail for the attentive: Kailāsa, Śiva&rsquo;s mountain, stands on the far shore, and
          a flight of haṃsas, the swans of the old poems, is coming down to the water. The word <i>mānasa</i>{" "}
          means &ldquo;the mind&rdquo;, and it is also the name of the lake at Kailāsa&rsquo;s foot that the haṃsas fly to,
          so Kāmeśa&rsquo;s mind can be heard as Kāmeśa&rsquo;s lake.
        </>
      ),
    },
  },
  "012": {
    Art: MirrorAndKnot,
    intro: (Spot) => (
      <>
        After three verses of ruby, coral, and bimba brought in to be outdone, this one brings in nothing: no likeness
        for her chin was ever found. So nothing is compared here, and <Spot part="light">her light</Spot> shines on its
        own. Every element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 29,
        part: "mirror",
        depicts:
          "Śaṅkara calls her chin the stem of the mirror that is her face, the mirror Śambhu takes in his hand. Here it is a mirror of polished metal, and it holds no likeness, only her light.",
      },
      {
        nama: 30,
        part: "thread",
        depicts:
          "Just below, a turmeric cord is wound round the stem and knotted three times, with a gold tāli marked with kumkum hanging from it. It is the one thing she wears that came from someone else.",
      },
    ],
    detail: {
      part: "three-lines",
      body: (
        <>
          There is also a small detail for the attentive: three fine lines run across the plate under the knot.
          Śaṅkara (Saundaryalaharī 69) sees three lines on her throat and calls them sureties for the strands that were
          tied there at her wedding, and then, in the same breath, the boundary stones of music&rsquo;s three scales.
        </>
      ),
    },
  },
  "013": {
    Art: GoldAndPearls,
    intro: (Spot) => (
      <>
        Nothing is outdone in this verse. It simply lists what she wears, and counting is a form of attention. Her face
        is still <Spot part="mirror">the mirror of the last verse</Spot>, holding only her light, and the two names dress
        what lies beside and below it.
      </>
    ),
    entries: [
      {
        nama: 31,
        part: "arms",
        depicts:
          "Her four arms leave her light as four beams, set like the points of a flash on polished metal. Each wears a crested keyūra nearer her light and a beaded aṅgada further out: eight bands of gold to count.",
      },
      {
        nama: 32,
        part: "necklace",
        depicts:
          "A collar of sixteen stones, rubies and emeralds by turns, hangs on the stem with a round pendant at its lowest point, and loose strings of pearls swing beneath it. The pearls nearest her light are faintly red, as Śaṅkara says her lips colour them (Saundaryalaharī 74).",
      },
    ],
    detail: {
      part: "thread",
      body: (
        <>
          There is also a small detail for the attentive: the marriage thread of the last verse is still tied, one layer
          in. Inside the collar you can see the turmeric cord&rsquo;s three knots and the top of the tāli with its
          kumkum, because a tāli, once tied, is not taken off.
        </>
      ),
    },
  },
  "014": {
    Art: GrownStake,
    intro: (Spot) => (
      <>
        The verse looks twice at one thing, first as a market and then as a garden, and the artwork lets the two looks
        meet in <Spot part="fruit">a single pair</Spot>: what grew in the garden is what she lays down. Every element
        comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 33,
        part: "stake",
        depicts:
          "On a gaming board above the card, Kāmeśvara's love lies on his side as a diamond held in his crescent. On her side, level with it and lit the same, lies her counter-stake.",
      },
      {
        nama: 34,
        part: "creeper",
        depicts:
          "Below the card, her light lies in the water of a gardener's basin, dug in a raked bed. From it rises a slender dark creeper, the line of down, which climbs past the card and up onto the board to lay its two fruit there.",
      },
    ],
    detail: {
      part: "bud",
      body: (
        <>
          There is also a small detail for the attentive: one bud hangs from the creeper just below the card. Śaṅkara (Saundaryalaharī 78) sees the same creeper and calls the pair its buds; this hymn calls them its
          fruit. It is the same plant, a season apart.
        </>
      ),
    },
  },
  "015": {
    Art: WhatItHoldsUp,
    intro: (Spot) => (
      <>
        The first name is an argument, not a description, and the artwork is built the same way: her waist is never
        drawn. Everything here is wrapped round it, and wherever anything passes behind it, it disappears. Inside
        there is only <Spot part="support">her light</Spot>, and above is the <Spot part="weight">weight it carries</Spot>.
        Every element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 35,
        part: "creeper",
        depicts:
          "The creeper of down from the last verse climbs in a spiral round an upright that isn't there. Its turns vanish wherever they would pass behind it, so the eye can tell exactly where it must stand.",
      },
      {
        nama: 36,
        part: "splint",
        depicts:
          "Three bands of red silk are tied round the same emptiness, as a splint is tied round a break, and the turns of the creeper crowd together between them. Their gold borders are a royal band's, because paṭṭa means both the bandage and the cloth tied on at a coronation.",
      },
    ],
    detail: {
      part: "sky-thread",
      body: (
        <>
          There is also a small detail for the attentive: a hair-fine dark ripple runs down the middle of the hollow.
          Śaṅkara (Saundaryalaharī 77) says the faint something that discerning eyes make out at her waist is the sky,
          squeezed to a thread as thin as the smallest ripple on the Yamunā.
        </>
      ),
    },
  },
  "016": {
    Art: SafflowerSlope,
    intro: (Spot) => (
      <>
        The verse calls the place her cloth lies a <i>taṭī</i>, the word for a mountainside, and Śaṅkara takes it at
        its word: the lord of mountains gave her his own slope as a wedding gift. So the cloth lies along{" "}
        <Spot part="slope">a hillside at dawn</Spot>, before the sun is up. Every element comes from one of the two
        names.
      </>
    ),
    entries: [
      {
        nama: 37,
        part: "cloth",
        depicts:
          "A cloth dyed with safflower covers the slope from the ridge down, its folds gathered toward the knot and catching the dawn along their crests. It is the first garment the hymn names.",
      },
      {
        nama: 38,
        part: "girdle",
        depicts:
          "Along the ridge runs a gold cord hung with bells, each set with a ruby or an emerald. Their sound spreads up from the knot in broken rings, further than anything else reaches, because she is heard before she is seen.",
      },
    ],
    detail: {
      part: "safflower",
      body: (
        <>
          There is also a small detail for the attentive: below the hem grow three safflower heads, the thistle the dye
          is made from. Of every red there is, safflower fades fastest in the light, and the poem chose it for a goddess
          whose colour is the few minutes before sunrise.
        </>
      ),
    },
  },
  "017": {
    Art: DrawnCurtain,
    intro: (Spot) => (
      <>
        One name of this verse withholds and the other displays, and the artwork is divided the same way, at a hem.
        Above it nothing is shown but <Spot part="light">her light</Spot>, coming through the cloth. Every element
        comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 39,
        part: "curtain",
        depicts:
          "A curtain is drawn closed and hung from his crescent, so that the one person it is not closed to is named at the top of it. The hymn describes by stepping back, and the artwork steps back with it.",
      },
      {
        nama: 40,
        part: "crowns",
        depicts:
          "Below the hem the reticence stops, and two small crowns cut from ruby sit side by side in full colour, tier on tier, their stones flashing.",
      },
    ],
    detail: {
      part: "border",
      body: (
        <>
          There is also a small detail for the attentive: the curtain&rsquo;s border is woven with elephants&rsquo;
          trunks and plantain stems. Śaṅkara (Saundaryalaharī 82) says her thighs defeated both, the two stock similes
          for a smooth tapering limb, so here they are, reduced to a hem.
        </>
      ),
    },
  },
  "018": {
    Art: FirstRainQuivers,
    intro: (Spot) => (
      <>
        The verse is set in <Spot part="rain">the first rain</Spot> of the monsoon, which is when its scarlet insects
        come up out of the ground. Every element comes from one of the three names.
      </>
    ),
    entries: [
      {
        nama: 41,
        part: "quivers",
        depicts:
          "Love's two quivers, crossed as weapons are hung, each tapering from a wide mouth to a narrow foot with five fletched arrows standing out of it. Scarlet velvet mites are strewn all over them.",
      },
      {
        nama: 42,
        part: "grass",
        depicts: "Where each quiver narrows to its foot, it disappears into the new grass, so that nothing of the joint shows.",
      },
      {
        nama: 43,
        part: "tortoises",
        depicts:
          "Two tortoises have come out in the rain, and over each domed shell runs a single curve of light, higher and smoother than the shell, outdoing it at its own shape.",
      },
    ],
    detail: {
      part: "arrowheads",
      body: (
        <>
          There is also a small detail for the attentive: ten bright points show through the grass at the quivers&rsquo;
          feet. Śaṅkara (Saundaryalaharī 83) says Love loaded her two quivers with twice his five arrows, and that
          their ten heads, whetted on the crowns of the gods, are the nails of her feet.
        </>
      ),
    },
  },
  "019": {
    Art: NailMoons,
    intro: () => (
      <>
        The verse looks no higher than her feet, which is where a person&rsquo;s eyes are after bowing, so nothing of
        her is shown but her two footprints and what their light does. Every element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 44,
        part: "nail-light",
        depicts:
          "On the ten toes of her footprints the ten nails are small moons, and their light falls over the dark lying before her feet, where those who bow are. It covers the dark like a cloth rather than burning it away, as the name has it: the dullness is buried out of sight.",
      },
      {
        nama: 45,
        part: "net",
        depicts:
          "The light of her two feet runs out across the floor in rays, each foot's rays crossing the other's and knotting into a net. The lotus, the usual measure of a lovely foot, has been left outside it at the edge, open and unregarded.",
      },
    ],
    detail: {
      part: "hands",
      body: (
        <>
          There is also a small detail for the attentive: the hands folded in the bowing are closed like buds. Śaṅkara
          (Saundaryalaharī 89) calls her nails moons, and lotuses close when the moon is up, so the hands of the women
          of heaven, which are lotuses, can only fold before them.
        </>
      ),
    },
  },
  "020": {
    Art: StillWaterSteps,
    intro: (Spot) => (
      <>
        The hymn&rsquo;s portrait of her reaches her feet in this verse, and closes by naming where all of it comes
        from. It is set on <Spot part="water">still water</Spot>, because of the swan. Every element comes from one
        of the three names.
      </>
    ),
    entries: [
      {
        nama: 46,
        part: "anklets",
        depicts:
          "Her feet are two red lotuses standing on the water a step apart, each ringed by a jewelled anklet hung with small bells. Their ringing spreads across the surface in broken rings.",
      },
      {
        nama: 47,
        part: "swan",
        depicts:
          "A female swan keeps pace with her feet, so slowly that her wake hardly opens behind her and its ripples lie far apart.",
      },
      {
        nama: 48,
        part: "treasury",
        depicts:
          "Above, the treasury the name calls her stands open, heaped with rubies, emeralds and pearls, and its light pours down over everything below, as if the loveliness of the scene had been drawn out of it.",
      },
    ],
    detail: {
      part: "salt",
      body: (
        <>
          There is also a small detail for the attentive: on the rim of the treasury lies a little heap of salt. The
          word for loveliness, <i>lāvaṇya</i>, is made from <i>lavaṇa</i>, salt: it is the quality that makes a face
          worth looking at, as salt makes food worth eating.
        </>
      ),
    },
  },
  "021": {
    Art: OnHisLap,
    intro: () => (
      <>
        The portrait that began at her crown has reached her feet, and this verse sums it up in three names before
        naming, at last, the one whose lap she sits on. Every element comes from one of the six names.
      </>
    ),
    entries: [
      {
        nama: 49,
        part: "red",
        depicts: "She is shown as a single flame of light in one flat red, with no shading anywhere, because every part of her is the same colour.",
      },
      {
        nama: 50,
        part: "outline",
        depicts:
          "Its outline is one unbroken gold line, closed in a single stroke and symmetrical, with nothing added and nothing to correct.",
      },
      {
        nama: 51,
        part: "gems",
        depicts:
          "Round her, on a gold chain, are the gems of the navaratna, the setting that holds all nine precious stones. Eight are there: pearl, coral, emerald, topaz, diamond, sapphire, hessonite and cat's-eye. The ruby belongs at the centre, and the centre is her.",
      },
      {
        nama: 52,
        part: "lap",
        depicts:
          "Kāmeśvara appears as his crescent, laid horns up as a lap, and she is seated on it to the right as you look, which is his left, the consort's side.",
      },
      {
        nama: 53,
        part: "bindu",
        depicts:
          "Where she rests on him is one point of light, half his white and half her red. Her name Śivā is his name made feminine, and here the two make one point.",
      },
      {
        nama: 54,
        part: "thread",
        depicts:
          "They are tied together by a single lotus fibre, looped loosely round his horn. It is the weakest bond there is, and it holds, because he has no wish to break it.",
      },
    ],
  },
  "022": {
    Art: MeruInward,
    intro: (Spot) => (
      <>
        The verse moves inward, from the mountain at the centre of the world to the one seat at the centre of
        everything, and the artwork climbs with it to <Spot part="light">her presence</Spot>, which is the light the
        whole of it is lit by. Every element comes from one of the four names.
      </>
    ),
    entries: [
      {
        nama: 55,
        part: "meru",
        depicts:
          "Meru, the golden world-mountain, rises from the foot of the plate with three summits, and everything else stands on the middle one.",
      },
      {
        nama: 56,
        part: "city",
        depicts:
          "Her city climbs the middle summit in walls of different metals, each inside the last and higher than it: iron, copper, silver, gold, then ruby and emerald, entered by one gate at the front.",
      },
      {
        nama: 57,
        part: "house",
        depicts:
          "On the innermost terrace stands a pavilion of the wish-granting gem, open between its pillars and roofed with the gem itself, cut in facets.",
      },
      {
        nama: 58,
        part: "couch",
        depicts:
          "Inside it is her couch. Its four legs are four gods, each marked with his work: Brahmā's lotus for making, Viṣṇu's discus for keeping, Rudra's trident for ending, and Īśvara's veil for hiding. Its white plank is Sadāśiva, the fifth, whose work is grace, and her presence is seated on him.",
      },
    ],
  },
  "023": {
    Art: NectarIsland,
    intro: (Spot) => (
      <>
        The first three names are frames, each wider than the last, and the artwork draws them as rings round{" "}
        <Spot part="light">her light</Spot>. Then the verse turns from where she lives to her eyes, and the artwork turns
        with it, into the water nearest the viewer. Every element comes from one of the five names.
      </>
    ),
    entries: [
      {
        nama: 59,
        part: "lotuses",
        depicts:
          "At the centre, lotuses grown as tall as the trees round them, a forest of them rising from a pool, with their leaves held up on stalks and their buds still closed. Her light is seated in the tallest.",
      },
      {
        nama: 60,
        part: "grove",
        depicts:
          "Round the lotuses stands a grove of kadamba trees, glossy-leaved and hung with the orange, pale-whiskered balls that open at the first rain.",
      },
      {
        nama: 61,
        part: "sea",
        depicts:
          "The grove and the lotuses stand on an island, and the island lies in a sea of nectar, the drink that keeps the gods from dying, drawn milk-white and patterned with small waves out to the edges of the plate.",
      },
      {
        nama: 62,
        part: "eyes",
        depicts:
          "In the near water two fish circle each other, sending out rings. They are her eyes, drawn as fish because the poets' word for a long, lovely eye is a fish-shaped one, and desire is in them.",
      },
      {
        nama: 63,
        part: "gift",
        depicts:
          "From her eyes a path of light runs over the water to the viewer, the way the moon's path runs to whoever stands on the shore, and on it a lotus floats out to be handed over: what is wished for, given.",
      },
    ],
  },
  "024": {
    Art: CourtAndArmy,
    intro: (Spot) => (
      <>
        Two names a line long, and the hymn turns from describing her to telling a story. The artwork splits the same
        way, above and below <Spot part="light">her glory</Spot>, the light everything here is gathered round. Every
        element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 64,
        part: "court",
        depicts:
          "Above, the gods and the seers are gathered company after company, row behind row, each holding up a lamp in praise of her: gold flames for the gods in front, white flames for the seers behind them.",
      },
      {
        nama: 65,
        part: "army",
        depicts:
          "Below, the army of her powers issues from her light and moves out. Śakti means a power and also a spear, so it is drawn as ranks of spears under pennants, levelled forward toward a bank of ash on the right, the ash of burnt Desire that Bhaṇḍa was shaped from.",
      },
    ],
  },
  "025": {
    Art: ElephantsAndHorses,
    intro: (Spot) => (
      <>
        The two names are built alike and part in their last words: the elephants attend her, the horses enclose her.
        The artwork keeps the difference, one a retinue beside <Spot part="light">her light</Spot> and the other a ring
        round all of it. Every element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 66,
        part: "elephants",
        depicts:
          "Her elephant corps, the division Sampatkarī, the maker of prosperity, leads. A lead elephant stands either side of her light with its herd behind it, caparisoned in red and gold, trunks raised to pour water over her from golden pots, as Śrī's elephants do: service, and the wealth that comes with it.",
      },
      {
        nama: 67,
        part: "cavalry",
        depicts:
          "The cavalry Aśvārūḍhā marshals rides round everything in two circuits of galloping horses, all one way, closing on her from every side, far too many to count.",
      },
    ],
  },
  "026": {
    Art: KingOfWheels,
    intro: (Spot) => (
      <>
        <i>Cakrarāja</i>, King of Wheels, is one of the ordinary names of the Śrīcakra, and the tradition reads the
        nine tiers of her <Spot part="chariot">chariot</Spot> as its nine enclosures. So the chariot is drawn as the
        diagram raised in steps and set on wheels, with <Spot part="light">her light</Spot> at the summit. Every
        element comes from one of the two names.
      </>
    ),
    entries: [
      {
        nama: 68,
        part: "weapons",
        depicts:
          "Spears, tridents, arrows and goads stand ready round the rim of every tier, from the square of gates to the top, because on this chariot the weapons are the goddesses stationed on its steps.",
      },
      {
        nama: 69,
        part: "geyacakra",
        depicts:
          "Beside it, a little behind, rides Mantriṇī's Wheel of Song, seven dark steps on its own wheels, with her ruby-set vīṇā on top, her sapphire light above it, and rings of song rising.",
      },
    ],
    detail: {
      part: "triangles",
      body: (
        <>
          On the top tier, the nine interlocking triangles, four pointing away and five toward you, laid out by the old
          rule of a diameter cut into forty-eight. Saundaryalaharī 11 counts the same figure standing still.
        </>
      ),
    },
  },
  "027": {
    Art: WallOfFire,
    intro: (Spot) => (
      <>
        The verse pulls back to the shape of the whole field, so the camp is seen from outside and low, the way a
        besieger would see it, with <Spot part="chariot">her own chariot</Spot> still moving in the middle of it.
      </>
    ),
    entries: [
      {
        nama: 70,
        part: "kiricakra",
        depicts:
          "Daṇḍanāthā's Kiricakra, the boar-wheel chariot, goes out first through the gap: five crimson steps on their own wheels, her rod of command for a flagstaff, a gold boar on the banner, and the road ahead of it clear.",
      },
      {
        nama: 71,
        part: "rampart",
        depicts:
          "Jvālāmālinī's wall of fire rings the whole camp, its far side a horizon of flame above the card and its near side across the foot, lighting the ground inside. It is open in only one place, the south, toward Śūnyaka.",
      },
    ],
    detail: {
      part: "lion",
      body: (
        <>
          Before the Kiricakra stands a small gold lion. The Lalitopākhyāna gives Daṇḍanāthā a lion, Caṇḍocchaṇḍa,
          as well as her boar, and it goes ahead of her chariot.
        </>
      ),
    },
  },
  "028": {
    Art: NityasOnslaught,
    intro: (Spot) => (
      <>
        Both names are about her face while she watches, and neither has her strike a blow. So she stays out of the
        fight, on <Spot part="chariot">her chariot</Spot> at the left, and <Spot part="gaze">her light leans
        toward it</Spot>, its glow and its gaze thrown forward over the field.
      </>
    ),
    entries: [
      {
        nama: 72,
        part: "army",
        depicts:
          "The army of her powers, the spears of Shloka 24, presses rank on rank into the ash of Bhaṇḍa's host at the right, nearer and larger as it goes.",
      },
      {
        nama: 73,
        part: "nityas",
        depicts:
          "The fifteen Nityās, goddesses of the bright fortnight's nights, come down out of the sky one after another as waxing moons, swelling as they come, as the verse's āṭopa swells, and the fullest strikes the ash. She is the sixteenth, the full moon, watching.",
      },
    ],
    detail: {
      part: "jvalamalini",
      body: (
        <>
          The fourteenth moon wears a ring of small flames. That night belongs to Jvālāmālinī, the Nityā who raised the
          wall of fire in the last verse.
        </>
      ),
    },
  },
  "029": {
    Art: BalasArrows,
    intro: (Spot) => (
      <>
        Two more names of a mother&rsquo;s pleasure, and in neither does the sovereign lift a hand. She stays on{" "}
        <Spot part="chariot">her chariot</Spot> at the left, as in the last verse, and her daughter and her minister
        do the fighting.
      </>
    ),
    entries: [
      {
        nama: 74,
        part: "bala",
        depicts:
          "Bālā, a small light the colour of the rising sun, ringed in the gold of the armour her mother put on her, joined to her by a thread of breath. From her thirty crescent-headed arrows fly out, one to each of Bhaṇḍa's thirty sons, thirty puffs of his ash.",
      },
      {
        nama: 75,
        part: "mantrini",
        depicts:
          "Across the top, Mantriṇī's sapphire light over her vīṇā throws a shaft of its light into the ash of Viṣaṅga, Bhaṇḍa's brother, and it breaks and falls.",
      },
    ],
    detail: {
      part: "syllables",
      body: (
        <>
          Under Bālā, her three syllables, aiṃ klīṃ sauḥ. They are often the first mantra a student is given, and the
          nyāsa before the stotra has already set them on the reciter&rsquo;s fingers.
        </>
      ),
    },
  },
  "030": {
    Art: GlanceAndASon,
    intro: (Spot) => (
      <>
        The verse breaks in two, and so does the picture. Below the card the war stops for a look: her light at the
        left and Kāmeśvara&rsquo;s crescent at the right, and <Spot part="glance">the look that passes between
        them</Spot>.
      </>
    ),
    entries: [
      {
        nama: 76,
        part: "varahi",
        depicts:
          "Across the top, Vārāhī, a crimson light behind her crossed plough and pestle, draws the breath out of Viśukra, a bank of Bhaṇḍa's ash, and it streams back to her.",
      },
      {
        nama: 77,
        part: "ganesa",
        depicts:
          "Where the look meets, Mahāgaṇapati arises: a light ruddy as the dawn, ringed by the things his ten hands hold, the mace, trident, conch, lotus, tusk, citron, bow, discus, ear of rice and jewelled pot.",
      },
    ],
    detail: {
      part: "bow",
      body: (
        <>
          One of the ten things in his ring is his mother&rsquo;s own: the sugarcane bow, drawn as hers is in Shloka 3.
        </>
      ),
    },
  },
  "031": {
    Art: AnsweringRain,
    intro: (Spot) => (
      <>
        Four verses of watching end here, and from the second name on she fights. So{" "}
        <Spot part="light">her light</Spot> at the left is no longer only looking: the rain goes up from it.
      </>
    ),
    entries: [
      {
        nama: 78,
        part: "yantra",
        depicts:
          "Below the card, Mahāgaṇapati, the ring of ten from the last verse, has found Viśukra's stone slab inside the wall and split it with his tusk. The pieces fly apart and its powder blows away on the wind.",
      },
      {
        nama: 79,
        part: "rain",
        depicts:
          "Above, her answering missiles, gold shafts with heads of flame, go up in a rain, and each meets one of Bhaṇḍa's dark weapons coming in from the upper right, and the two go out together in a burst.",
      },
    ],
    detail: {
      part: "figure",
      body: (
        <>
          On the broken pieces you can still see what Viśukra cut into the slab: an eight-angled figure with a trident
          at each of its eight points, where the eight powers of obstruction, led by Alasā, Sloth, were posted.
        </>
      ),
    },
  },
  "032": {
    Art: TenDescents,
    intro: (Spot) => (
      <>
        Her two arms rise from <Spot part="light">her light</Spot> as beams, empty-handed, and the hands are drawn
        only as <Spot part="nails">their nails</Spot>: five small moons at the end of each beam, as her toenails were
        in Shloka 19, with light coming off them.
      </>
    ),
    entries: [
      {
        nama: 80,
        part: "forms",
        depicts:
          "Round the card, out of that light, come the forms of the purāṇa's table, each with a little light of its own: the fish, the tortoise, the boar, the man-lion, the dwarf's umbrella and water pot, Paraśurāma's axe, Rāma's bow, the four lights of the fourfold Vāsudeva, and Kalki's white horse under a raised sword.",
      },
      {
        nama: 81,
        part: "pasupata",
        depicts:
          "Below, the great Pāśupata, a trident-headed shaft of fire, flies low across the plate. Behind it the demon host is nothing but flame and rising embers, and ahead of it is the last of their ash.",
      },
    ],
    detail: {
      part: "narasimha",
      body: (
        <>
          The man-lion is drawn with his claws showing. Narasiṃha killed with his nails because no weapon was allowed
          against the demon, so the form that comes out of her nails is itself a form about nails.
        </>
      ),
    },
  },
  "033": {
    Art: EmptyCity,
    intro: (Spot) => (
      <>
        <Spot part="light">Her light</Spot>, at the left, has nothing left to send out and is all radiance now, as it
        was before the war began.
      </>
    ),
    entries: [
      {
        nama: 82,
        part: "city",
        depicts:
          "At the right the weapon named for her consort, a long shaft of pale light with Kāmeśvara's crescent for its head, has come to rest at the heart of Śūnyaka, the Empty Place. Of the city and Bhaṇḍa inside it only an outline is left: walls, domes and a spire drawn in ash round nothing, the last flames going out at its foot and smoke rising.",
      },
      {
        nama: 83,
        part: "praise",
        depicts:
          "Above, the gods praise her: Brahmā's lotus, Viṣṇu's conch and discus, Indra's thunderbolt, and below them the lamps of the gods behind them, held up in companies along an arc round her light.",
      },
    ],
    detail: {
      part: "shoot",
      body: (
        <>
          In the ash at the foot of the burnt city there is one green shoot. The demon was made from the ashes of
          Kāma, and the gods are about to ask her to bring the god of love back to life; that is the next verse.
        </>
      ),
    },
  },
  "034": {
    Art: Sanjivani,
    intro: (Spot) => (
      <>
        Her <Spot part="glance">sidelong look</Spot> falls from the lotus at the top onto the ash below. The
        purāṇa says Kāma was born again out of her look, as Gaṇeśa was four verses earlier.
      </>
    ),
    entries: [
      {
        nama: 84,
        part: "herb",
        depicts:
          "Below the card lies the ash of Kāma, burnt by the fire of Hara's eye, and out of it grows the herb that brings the dead back, alight, as the herbs were on the mountain Hanumān carried. She is not the one who gives the herb; she is the herb.",
      },
      {
        nama: 85,
        part: "face",
        depicts:
          "Above the card her face is a lotus, and over it rises the first summit of her mantra, the cluster of speech: five lights up a peak. The syllables are given at initiation and are not written here, except the last, ह्रीं, which closes all three clusters.",
      },
    ],
    detail: {
      part: "kama",
      body: (
        <>
          Kāma comes back as a rosy light with his bow and arrows made of flowers, and he and Rati look at each other.
          The purāṇa gives him two arms now where he had four: what comes back is not quite what was lost.
        </>
      ),
    },
  },
  "035": {
    Art: MantraBody,
    intro: (Spot) => (
      <>
        Her light stands as a tall column, her body spelled instead of painted. At the top is{" "}
        <Spot part="face">her face</Spot> from the last verse: the lotus, and the cluster of speech rising over it.
      </>
    ),
    entries: [
      {
        nama: 86,
        part: "middle",
        depicts:
          "Between the throat and the waist rises the middle cluster, the sovereignty of desire, in a rosy light: six syllables up the flanks of its peak, the last of them ह्रीं.",
      },
      {
        nama: 87,
        part: "sakti",
        depicts:
          "Below the waist the śakti cluster, four syllables in a vermilion light, stands on the lotus she stands on: she is this cluster, and she carries it.",
      },
    ],
    detail: {
      part: "seams",
      body: (
        <>
          The two seams are at the throat and the waist, where the names divide her. Before the hymn is recited the
          three clusters are placed on the reciter&apos;s own body at the same places, so in the nyāsa the reciter builds
          this body on his own.
        </>
      ),
    },
  },
  "036": {
    Art: RootMantra,
    intro: (Spot) => (
      <>
        <Spot part="light">Her light</Spot> is in the crown, at the right, and everything else in the picture comes
        from it.
      </>
    ),
    entries: [
      {
        nama: 88,
        part: "mantra",
        depicts:
          "In the crown her light is ringed by the whole root mantra, fifteen syllables round her in the colours of their three clusters, with the three ह्रीं that close the clusters set into the ring. The mantra is not round her as a frame is round a picture; it is what she is made of.",
      },
      {
        nama: 89,
        part: "range",
        depicts:
          "Below the card the three clusters stand together on one ground line as a single range of three peaks, speech, desire and power, the middle one highest: her frame.",
      },
      {
        nama: 90,
        part: "nectar",
        depicts:
          "From the ring a thin fall of nectar comes down at the right into a brimming cup. Whether it falls from the crown of the head or is poured in the rite, the two readings the commentators give, the picture does not say.",
      },
      {
        nama: 91,
        part: "compact",
        depicts:
          "Under the range lies the kula's compact, a palm-leaf book bound shut with a vermilion cord and sealed. She keeps it, which here means she decides who is told.",
      },
    ],
    detail: {
      part: "seal",
      body: (
        <>
          The seal on the book carries only a small downward triangle, the sign of the goddess. Whatever is written
          inside is not drawn: the fifteen syllables themselves are given at initiation, and this plate, like the
          printed manuals, leaves them out.
        </>
      ),
    },
  },
  "037": {
    Art: KulaAndSamaya,
    intro: (Spot) => (
      <>
        The verse names both of the tradition&apos;s ways of worshipping her and puts her inside each, so her light is
        drawn twice: <Spot part="within">once in the kula</Spot> at the left, and{" "}
        <Spot part="samaya">once in the samaya</Spot> at the right.
      </>
    ),
    entries: [
      {
        nama: 92,
        part: "household",
        depicts:
          "At the left is the kula as a household: a doorway hung with mango leaves, as a house is for a festival. Kulāṅganā is ordinary Sanskrit for the mistress of such a house.",
      },
      {
        nama: 93,
        part: "within",
        depicts: "Her light is inside the doorway, at the centre of the household, not outside it looking in.",
      },
      {
        nama: 94,
        part: "kaula",
        depicts:
          "Before the door stand the outward rite's lamp and cup: the Kaula way worships her with the full apparatus of an external rite.",
      },
      {
        nama: 95,
        part: "yogini",
        depicts:
          "Round her light is the kula in its other sense, the assembly of powers: eight small lights, each joined to her and to the next, so that her practice makes them one.",
      },
      {
        nama: 96,
        part: "akula",
        depicts:
          "Above, between the two ways and joined to neither, is a pale still light with nothing round it: akulā, not the kula. In the Kashmirian usage akula is also Śiva, the unmoving ground, and the light is his colour.",
      },
      {
        nama: 97,
        part: "samaya",
        depicts: "At the right her light is within the samaya, in the lotus of the heart.",
      },
      {
        nama: 98,
        part: "practice",
        depicts:
          "The samaya is the inward worship, done in the centres of the body rather than before a diagram: a slender column of light through six small lotuses.",
      },
    ],
    detail: {
      part: "threshold",
      body: (
        <>
          On the household&apos;s threshold is a kolam, the line of rice-flour dots and loops the woman of the house draws at
          her door each morning.
        </>
      ),
    },
  },
  "038": {
    Art: FirstTwoKnots,
    intro: (Spot) => (
      <>
        The hymn turns inward here, to the body of whoever is chanting. <Spot part="channel">A channel of light</Spot>{" "}
        runs up the middle of the plate through the centres, lit from the root as far as the second knot.
      </>
    ),
    entries: [
      {
        nama: 99,
        part: "root",
        depicts:
          "At the foot is the root centre, a lotus of four petals round the yellow square of earth, and her light is seated in it.",
      },
      {
        nama: 100,
        part: "brahma",
        depicts:
          "Just above it the knot of Brahmā, the first of the three cords tied across the channel, is split, its two halves pushed apart and the light going up between them.",
      },
      {
        nama: 101,
        part: "manipura",
        depicts:
          "Higher up is the navel wheel, ten petals round the downward triangle of fire, and inside it her light comes up into view like the sun on the horizon: uditā is the word for a sunrise.",
      },
      {
        nama: 102,
        part: "visnu",
        depicts: "Above the navel the knot of Viṣṇu, the second cord, is split in the same way.",
      },
    ],
    detail: {
      part: "silent",
      body: (
        <>
          The verse names only two of the centres it passes. The others are drawn faint and unlit, and so is the
          thousand-petalled lotus at the top: the third knot is still tied, and the next verse finishes the climb.
        </>
      ),
    },
  },
  "039": {
    Art: SummitAndRain,
    intro: (Spot) => (
      <>
        The climb of the last verse is finished: <Spot part="channel">the channel</Spot> is lit now from the root to the
        crown.
      </>
    ),
    entries: [
      {
        nama: 103,
        part: "ajna",
        depicts: "At the brow is the wheel of command, two white petals like wings, and her light is inside it.",
      },
      {
        nama: 104,
        part: "rudra",
        depicts: "Just above it the knot of Rudra, the last and the hardest of the three cords, is split.",
      },
      {
        nama: 105,
        part: "summit",
        depicts:
          "At the top the thousand-petalled lotus is lit, ring on ring of fine petals, and her light is mounted on it, as on a seat or a vehicle.",
      },
      {
        nama: 106,
        part: "rain",
        depicts:
          "From the lotus's rim the nectar comes back down over the whole body, in two falls of drops past the centres to the root and a fine rain under the lotus.",
      },
    ],
    detail: {
      part: "passed",
      body: (
        <>
          Below, the centres of the last verse are all lit now, the ones it passed over in silence too, and the knots of
          Brahmā and Viṣṇu hang open between them.
        </>
      ),
    },
  },
  "040": {
    Art: LightningVine,
    intro: (Spot) => (
      <>
        Two verses have described a climb without naming what climbs. Here it is named:{" "}
        <Spot part="kundalini">the coiled one</Spot>.
      </>
    ),
    entries: [
      {
        nama: 107,
        part: "lightning",
        depicts:
          "Up the middle of the plate runs a streak of lightning drawn out like a climbing vine, thin, sharp-angled and gone before the eye settles on it.",
      },
      {
        nama: 108,
        part: "above",
        depicts:
          "It ends above the six wheels, in her light. The verse counts six and puts her past them, so the crown here is not a seventh wheel but a light with no lotus under it.",
      },
      {
        nama: 109,
        part: "clinging",
        depicts:
          "From the corners of the lightning, tendrils curl and grip, as a creeper's do: a great clinging, which holds however far she rises.",
      },
      {
        nama: 110,
        part: "kundalini",
        depicts:
          "At its foot, round the root centre, it is still coiled three and a half times, as the coiled one is said to lie before she straightens and climbs.",
      },
      {
        nama: 111,
        part: "fibre",
        depicts:
          "At the right a lotus stalk has been broken and the fine fibres inside it drawn out between the two pieces. She is finer than these, so nothing in the picture is fine enough to be her.",
      },
    ],
    detail: {
      part: "wheels",
      body: (
        <>
          The lightning goes straight through the centre of each of the six wheels, root, svādhiṣṭhāna, navel, heart,
          throat and brow, and zigzags only between them.
        </>
      ),
    },
  },
  "041": {
    Art: ForestOfBecoming,
    intro: (Spot) => (
      <>
        From here the hymn sorts her names by sound, and this verse turns one syllable, bha-, three ways.{" "}
        <Spot part="form">Her light</Spot> is in the crown.
      </>
    ),
    entries: [
      {
        nama: 112,
        part: "bhava",
        depicts:
          "Beside her light is the crescent of Bhava, Rudra as the source of becoming, one of his oldest names; Bhavānī is his wife.",
      },
      {
        nama: 113,
        part: "contemplation",
        depicts:
          "Below, a lamp whose flame does not flicker sends one straight line of light up to her: bhāvanā, the mind holding a thing steadily until it is present.",
      },
      {
        nama: 114,
        part: "axe",
        depicts:
          "Below the card stands the forest of becoming, the world one is born into over and over, trunk behind trunk. A small axe has been taken to it and a clearing cut through the middle, the felled trunks lying in it, and the line of light rises through the clearing.",
      },
      {
        nama: 115,
        part: "auspicious",
        depicts:
          "At the left stands a full pot crowned with mango leaves and a coconut, the most auspicious of things, which she is fond of.",
      },
      {
        nama: 116,
        part: "form",
        depicts: "Her light is drawn as it always is, because her shape is the good itself and needs no other sign.",
      },
      {
        nama: 117,
        part: "fortune",
        depicts:
          "At the right is a tray of kumkum, turmeric and bangles, the married woman's good fortune, with gold motes falling on it: saubhāgya is not earned by those who get it, it is handed to them.",
      },
    ],
    detail: {
      part: "chips",
      body: (
        <>
          The name says kuṭhārikā, a little axe, not kuṭhāra. It is the one from Paraśurāma&apos;s hand in Shloka 32, and the
          chips are still flying from the trunk it is in.
        </>
      ),
    },
  },
  "042": {
    Art: DevotionGoverns,
    intro: (Spot) => (
      <>
        The first three names are a ladder, and each rung concedes more. <Spot part="light">Her light</Spot> is in the
        crown, and everything below is reaching for it.
      </>
    ),
    entries: [
      {
        nama: 118,
        part: "offering",
        depicts:
          "Below the card a devotee's offering lies on a leaf: a leaf, a flower, a fruit and a little water, the four things the Gītā says are enough when given with love.",
      },
      {
        nama: 119,
        part: "road",
        depicts:
          "From the flower a garland climbs all the way to her light. It is the one road that arrives.",
      },
      {
        nama: 120,
        part: "bound",
        depicts:
          "At the top the garland closes in a ring round her light: devotion does not only reach her, it holds her, as vaśya is said of a thing brought under control.",
      },
      {
        nama: 121,
        part: "fear",
        depicts: "At the edges of the plate the shadows of fear are going under.",
      },
      {
        nama: 122,
        part: "sambhu",
        depicts:
          "On one side of her light is the crescent of Śambhu, the gentlest of Śiva's names, the one used when the terrible aspect is set aside.",
      },
      {
        nama: 123,
        part: "sarada",
        depicts:
          "At the right Śāradā, the goddess of speech, a white light with her vīṇā, is worshipping her too.",
      },
      {
        nama: 124,
        part: "sarva",
        depicts: "On the other side of her light is the bow of Śarva, Śiva as the archer, with an arrow on its string.",
      },
      {
        nama: 125,
        part: "shelter",
        depicts:
          "Over the whole scene below is a dome of her light, and the shadows of fear are outside it: śarman means shelter first, and the ease of being sheltered second.",
      },
    ],
    detail: {
      part: "short",
      body: (
        <>
          Beside the garland two other roads set out, one from a palm-leaf book and one from a fire altar, knowledge and
          rite. Both stop short, under the dome.
        </>
      ),
    },
  },
  "043": {
    Art: AutumnMoonTurn,
    intro: (Spot) => (
      <>
        The verse starts with <Spot part="face">the moon</Spot> and ends by taking every comparison back. Six names
        of praise are drawn in the crown and at the left, and the turn comes <Spot part="unsupported">at the lower
        right</Spot>.
      </>
    ),
    entries: [
      {
        nama: 126,
        part: "sankara",
        depicts: "At the left of the crown stands Śaṅkara's trident: she is his own.",
      },
      {
        nama: 127,
        part: "sri",
        depicts:
          "At the right of the crown a lotus, Śrī's flower, and gold falling from it: she makes splendour and fortune wherever she turns.",
      },
      {
        nama: 128,
        part: "true",
        depicts: "In the middle below the card a plumb line hangs dead straight, the standard that other things are measured by.",
      },
      {
        nama: 129,
        part: "face",
        depicts:
          "In the crown is the full autumn moon, deer and all, clear and without a halo: autumn is when the moon is clearest, and it is what faces are measured against.",
      },
      {
        nama: 130,
        part: "waist",
        depicts:
          "Tied to the trident is Śiva's drum, drawn in to almost nothing at its waist, the one narrow line in a full shape.",
      },
      {
        nama: 131,
        part: "peace",
        depicts: "At the lower left a pool lies so still that the moon's reflection in it is whole, with not one ripple through it.",
      },
      {
        nama: 132,
        part: "unsupported",
        depicts:
          "At the lower right her light hangs over an empty seat, and there is nothing at all under it: she is the ground, so she stands on nothing.",
      },
      {
        nama: 133,
        part: "unstained",
        depicts:
          "On the pool floats a lotus leaf with water standing on it in beads, one about to roll off: the Gītā's image of what is in the world and not smeared by it.",
      },
    ],
    detail: {
      part: "clouds",
      body: (
        <>
          At the edges of the crown the last clouds of the rains are going off. Śarat is the season after the monsoon,
          when the sky has been washed, and that is why the autumn moon is the one faces are compared to.
        </>
      ),
    },
  },
  "044": {
    Art: TenTakenAway,
    intro: (Spot) => (
      <>
        Ten names, eight of them taken away. At the centre is <Spot part="formless">her light</Spot>, and round it
        the things that have no hold on her.
      </>
    ),
    entries: [
      {
        nama: 134,
        part: "untainted",
        depicts: "At the lower left a lotus leaf, with the water running off its edge and leaving no film behind.",
      },
      {
        nama: 135,
        part: "stainless",
        depicts: "Beside it a clear crystal, with nothing clouding it inside or out.",
      },
      {
        nama: 136,
        part: "eternal",
        depicts: "Round her light runs one gold ring, with nowhere it starts and nowhere it stops.",
      },
      {
        nama: 137,
        part: "formless",
        depicts:
          "Her light itself is only a glow, with no rim and no disc: there is no outline of her that could be drawn.",
      },
      {
        nama: 138,
        part: "unperturbed",
        depicts:
          "At the left a lamp burns in a niche out of the wind and its flame does not flicker, the Gītā's image of a mind that nothing scatters.",
      },
      {
        nama: 139,
        part: "strands",
        depicts:
          "From the right comes a rope of three strands, white, red and dark, the three that nature is twisted out of. Before it reaches her it comes undone.",
      },
      {
        nama: 140,
        part: "partless",
        depicts:
          "In the crown the moon is whole. A kalā is a digit of the moon, and none of hers has been taken away.",
      },
      {
        nama: 141,
        part: "tranquil",
        depicts:
          "At the lower right a fire has burnt down to embers in its ash, and its smoke goes straight up: every disturbance spent.",
      },
      {
        nama: 142,
        part: "desireless",
        depicts: "Beside the fire the flower arrow of desire lies where it fell, with no one to aim it at.",
      },
      {
        nama: 143,
        part: "calamity",
        depicts:
          "Rāhu, the shadow that swallows the moon at an eclipse, has gone past it in the crown without touching it, and is going off.",
      },
    ],
    detail: {
      part: "strands",
      body: (
        <>
          A guṇa is literally a strand of a rope. Sattva, rajas and tamas, clarity, motion and heaviness, are
          traditionally white, red and dark, and everything in nature is twisted out of the three.
        </>
      ),
    },
  },
  "045": {
    Art: PotAndSpace,
    intro: (Spot) => (
      <>
        Eight names saying that nothing about her ever happened. Her light is drawn twice: once as{" "}
        <Spot part="awake">the pole star</Spot>, and once as <Spot part="space">the one space</Spot> that the pots
        stand in.
      </>
    ),
    entries: [
      {
        nama: 144,
        part: "free",
        depicts:
          "One of the pots has broken, and its shards lie on the ground. The space it held is just as it was. It was never shut in, so nothing was set free.",
      },
      {
        nama: 145,
        part: "clay",
        depicts:
          "At the left lies the lump of clay that every pot is made of. Whatever shape it is turned into, it is still clay, as in the Chāndogya's lesson.",
      },
      {
        nama: 146,
        part: "pots",
        depicts:
          "The pots stand in a row, every one a different shape. They are the world's manifold, and their shapes stop at their rims.",
      },
      {
        nama: 147,
        part: "held",
        depicts:
          "Round the pole star the other stars wheel on their trails. In the Purāṇas they are all tied to it, and it is tied to nothing.",
      },
      {
        nama: 148,
        part: "pure",
        depicts: "Smoke drifts in from the right and thins away before it reaches the middle. Smoke cannot dirty space.",
      },
      {
        nama: 149,
        part: "awake",
        depicts: "In the crown her light is the pole star, the one star that never sets. It is awake all night, every night.",
      },
      {
        nama: 150,
        part: "blameless",
        depicts:
          "At the right lies a palm leaf with its stylus, and nothing is written on it. Avadya means literally what is not to be said, and there is nothing to say against her.",
      },
      {
        nama: 151,
        part: "space",
        depicts:
          "One band of her light runs through the pots and between them, inside and outside alike, without a gap anywhere.",
      },
    ],
    detail: {
      part: "free",
      body: (
        <>
          This is the Vedāntins&apos; pot and space. The space in a pot seems to be a space of its own, and when the
          pot breaks it seems to be freed. It was the one space all along.
        </>
      ),
    },
  },
  "046": {
    Art: OtherEndOfTheRope,
    intro: (Spot) => (
      <>
        Four names that take something away from her, then two pairs that turn outward, where what she is free of
        she takes away from others too. <Spot part="light">Her light</Spot> sits on her couch below the card, and
        nothing in the picture lit it.
      </>
    ),
    entries: [
      {
        nama: 152,
        part: "lamps",
        depicts:
          "A line of lamps runs out toward us from her seat, each lit from the one before. Follow them back and the first was lit from her light, which nothing lit.",
      },
      {
        nama: 153,
        part: "moon",
        depicts: "In the crown the full moon shines with no mark on it at all, as the moon would look with its dark patch wiped away.",
      },
      {
        nama: 154,
        part: "crystal",
        depicts:
          "On her seat a clear crystal stands with a red hibiscus held up beside it. In the old example the flower makes the crystal look red; here it stays clear.",
      },
      {
        nama: 155,
        part: "couch",
        depicts:
          "She sits on the couch whose legs are four gods and whose plank is a fifth. The leg at the right is Īśvara, the Lord himself, holding up a corner of her seat.",
      },
      {
        nama: 156,
        part: "undyed",
        depicts: "Her end of the noose is undyed: the red of the cord never reaches the part of it that is hers.",
      },
      {
        nama: 157,
        part: "noose",
        depicts:
          "The far end, the red loop of Shloka 2's noose, is held by the elephant. The red is wearing off the cord as it runs toward her and drifts away in flecks.",
      },
      {
        nama: 158,
        part: "bees",
        depicts:
          "Bees drink the rut that runs from an elephant's temples. These are leaving it, and none of them turn toward her, because there is nothing in her to drink.",
      },
      {
        nama: 159,
        part: "elephant",
        depicts:
          "The elephant has come close enough to take her cord in its trunk, and the rut on its temple has dried to a faint trace.",
      },
    ],
    detail: {
      part: "deer",
      body: (
        <>
          The moon&apos;s mark is the deer of Shloka 5, and here it has leapt clear of the moon, at the top right.
          Kalaṅka, a mark, is a different word from Shloka 44&apos;s kalā, a digit; that moon kept its deer, and this
          one has none.
        </>
      ),
    },
  },
  "047": {
    Art: TwoBirds,
    intro: (Spot) => (
      <>
        Two names alone, then three pairs, each said once of her and once of what she does for whoever comes
        near. The verse is the Muṇḍaka Upaniṣad&apos;s two birds on one <Spot part="tree">tree</Spot>: one eats
        its fruit, sunk, grieving and deluded; the other only looks on, and when the first sees it, its grief
        goes. The tree grows from the kerb of a <Spot part="tank">temple tank</Spot>, as pippalas do.
      </>
    ),
    entries: [
      {
        nama: 160,
        part: "still-leaves",
        depicts:
          "A pippala's leaves hang on long stalks and tremble in the least air, all over the tree. Round her they hang still.",
      },
      {
        nama: 161,
        part: "light",
        depicts:
          "On the bough where the second bird should sit there is only her light: nobody there to say I.",
      },
      {
        nama: 162,
        part: "mist",
        depicts: "Mist lies over the lower tree and the water, and stops well below her bough.",
      },
      {
        nama: 163,
        part: "bird",
        depicts:
          "The other bird, low in the mist, has turned its head up to her, and the mist has cleared in a lane between them.",
      },
      {
        nama: 164,
        part: "figs",
        depicts: "The figs on her bough are ripe and nobody has eaten them; she calls none of them hers.",
      },
      {
        nama: 165,
        part: "dropped",
        depicts:
          "The fig the other bird was eating has fallen from its beak as it looked up, and is dropping into the water.",
      },
      {
        nama: 166,
        part: "lotus",
        depicts:
          "In the tank a white lotus stands clear of the water, and its leaf beads the water off: the Gītā's image (5.10) for one whom sin does not stick to.",
      },
      {
        nama: 167,
        part: "shaken",
        depicts:
          "The bird shakes dark motes from its wings, and they go out as they fall. The Upaniṣad says that whoever sees her shakes off good and evil.",
      },
    ],
    detail: {
      part: "seedling",
      body: (
        <>
          In a crack of the kerb a pippala seedling has come up. Nobody plants a pippala: its seeds are sown by
          birds, which drop the figs they were eating, as the bird in the mist has just done.
        </>
      ),
    },
  },
  "048": {
    Art: WheelStopped,
    intro: (Spot) => (
      <>
        The most symmetrical verse in the hymn: four pairs, each naming a thing she is free of and then the same
        thing she destroys, so the picture is symmetrical about her light. The <Spot part="sword">sword</Spot> and
        the <Spot part="wheel">wheel</Spot> come from the Muṇḍaka Upaniṣad (2.2.8): when she is seen, the knot of the heart is split, doubts are cut, and the works
        that keep the round going are used up.
      </>
    ),
    entries: [
      {
        nama: 168,
        part: "goad",
        depicts:
          "Shloka 2 gave her a goad in the shape of anger. Here it stands point down, plain gold, nothing in it hot.",
      },
      {
        nama: 169,
        part: "steam",
        depicts:
          "Its point rests in a basin of water, and the last red is leaving it as steam, cooled rather than answered.",
      },
      {
        nama: 170,
        part: "pot",
        depicts: "At the right a pot is full to the brim and runs over: it wants no more than it holds.",
      },
      {
        nama: 171,
        part: "box",
        depicts:
          "The water running from it has burst the lock of a strongbox at its foot and is carrying the coins away.",
      },
      {
        nama: 172,
        part: "sword",
        depicts: "From just below her hangs the sword of knowledge, straight and double-edged, point down.",
      },
      {
        nama: 173,
        part: "knot",
        depicts:
          "The knot of the heart lies cut on its blade, and the two halves are falling away. The Gītā tells Arjuna to cut doubt with this sword rather than answer it.",
      },
      {
        nama: 174,
        part: "light",
        depicts: "Her light is at the hub of the wheel, the one point of a wheel that never goes round.",
      },
      {
        nama: 175,
        part: "wheel",
        depicts:
          "Where the sword passed, the rim of the wheel of becoming is split. Two spokes have dropped out onto the floor, and the round can't turn again.",
      },
    ],
    detail: {
      part: "strands",
      body: (
        <>
          The rim is bound in three bands, ivory, red and dark: the three strands, the guṇas, that Shloka 44 drew
          as a rope coming undone. The Śvetāśvatara Upaniṣad calls the wheel of becoming threefold for the same
          reason.
        </>
      ),
    },
  },
  "049": {
    Art: RiversToTheSea,
    intro: (Spot) => (
      <>
        The Kaṭha Upaniṣad, in the passage this verse stands on, says that rain falling on a{" "}
        <Spot part="peak">peak</Spot> runs off it every way, as a mind that sees division runs after things, and
        that water poured into water becomes just that water. So one rain runs off one peak as two{" "}
        <Spot part="rivers">rivers</Spot>, a white one and a dark one, and they come down either side of the
        picture to one sea.
      </>
    ),
    entries: [
      {
        nama: 176,
        part: "calm",
        depicts:
          "Round her reflection the far sea lies without a ripple. Yoga calls the mind's movements waves, and she is where they have stopped.",
      },
      {
        nama: 177,
        part: "light",
        depicts: "Her light hangs low over the sea, and the rivers rushing down on either side stop short of it.",
      },
      {
        nama: 178,
        part: "sea",
        depicts: "The sea is one water, its ripples running unbroken from side to side, with no seam where the rivers came in.",
      },
      {
        nama: 179,
        part: "mouths",
        depicts:
          "Each river carries its name, Gaṅgā on the white and Yamunā on the dark, until it nears the sea. There the names fade out and the colours spread and are lost, as the Chāndogya says rivers in the sea no longer know which one they were.",
      },
      {
        nama: 180,
        part: "cloud",
        depicts:
          "The cloud over the peak is the sea's own water risen again, and its rain is where the rivers begin. None of it is ever lost.",
      },
      {
        nama: 181,
        part: "vine",
        depicts:
          "On the bank of the white river a ripe cucumber has come away from its stalk. The oldest prayer against death asks to be loosed from it in just that way.",
      },
      {
        nama: 182,
        part: "reflection",
        depicts:
          "Her light lies on the water in a column of broken gold that trembles with every ripple, while she herself does not move.",
      },
      {
        nama: 183,
        part: "boats",
        depicts:
          "Offering lamps on leaf boats ride the dark river out to sea and go on past her. Nothing is taken from them.",
      },
    ],
    detail: {
      part: "sky-flower",
      body: (
        <>
          Beside the cloud is a flower drawn only in dots, on no stalk: the sky-flower. Patañjali&apos;s commentators
          give it as their example of a <i>vikalpa</i>, a word with nothing behind it, which is exactly what she is
          said not to be.
        </>
      ),
    },
  },
  "050": {
    Art: HillFort,
    intro: (Spot) => (
      <>
        Durgā means a stronghold, and of all strongholds the law books put first a fort on a hill, the{" "}
        <i>giri-durga</i> (Manu 7.70–71). So this is one: <Spot part="walls">walls</Spot> on a sheer{" "}
        <Spot part="crag">crag</Spot>, with her inside.
      </>
    ),
    entries: [
      {
        nama: 184,
        part: "scales",
        depicts: "In the crown a balance hangs dead level with both pans empty, because nothing can go in the other pan.",
      },
      {
        nama: 185,
        part: "garland",
        depicts:
          "A garland of blue lotuses hangs over the gate, dark among all that gold. The Saundaryalaharī likens her hair to blue lotuses, and says the flowers of Indra's garden move into it for its scent; they are coming down into it from the bough at the top left.",
      },
      {
        nama: 186,
        part: "walls",
        depicts: "Her walls stand whole, every course laid and every merlon in its place, with nothing worn away.",
      },
      {
        nama: 187,
        part: "gate",
        depicts:
          "The gate stands open, its spiked doors folded back and its bar laid on the ground. No danger comes that it would have to be shut against.",
      },
      {
        nama: 188,
        part: "light",
        depicts: "Her light is inside the gate, at the top of the climb and at the heart of the fort, and nowhere nearer.",
      },
      {
        nama: 189,
        part: "path",
        depicts:
          "The way up goes back and forth across the cliff, broad and worn at the foot and narrowing as it climbs, because few walk it to the end.",
      },
      {
        nama: 190,
        part: "crag",
        depicts: "The fort stands on a crag with sheer, fissured sides: a place no one could take by storm.",
      },
      {
        nama: 191,
        part: "spear",
        depicts:
          "Her spear, flung from the gate, has struck into a dark cleft in the rock, and the dark is breaking away from it in pieces and falling.",
      },
      {
        nama: 192,
        part: "spring",
        depicts:
          "From the place it struck a spring gushes out and falls to a pool at the foot, so that where the dark was there is water.",
      },
    ],
    detail: {
      part: "lion",
      body: (
        <>
          Beside the gate a small gold lion has sat down. Under this one name she is the Durgā of the Devī
          Māhātmya, who rides a lion into battle, and here, with nothing left to fight, it waits at her door.
        </>
      ),
    },
  },
  "051": {
    Art: MonsoonPool,
    intro: (Spot) => (
      <>
        <i>Sāndra</i>, thick, is a word used of clouds, and <i>ghana</i>, dense, is simply another name for one. So
        her compassion is drawn as the rains: one cloud over the whole sky, and under it a forest{" "}
        <Spot part="pool">pool</Spot> with her <Spot part="light">light</Spot> hanging low over the water.
      </>
    ),
    entries: [
      {
        nama: 193,
        part: "owl",
        depicts:
          "On a dead branch at the left an owl sits nearer her light than anything else in the picture, with its eyes shut tight. Bhartṛhari asks whether it is the sun's fault that the owl can't see by day.",
      },
      {
        nama: 194,
        part: "drinking",
        depicts:
          "A tiger and a deer drink side by side from the one pool, their heads bowed together under her light. The Yoga Sūtra says that near one who is settled in harmlessness, enmity is given up (2.35): nothing is punished, it simply stops.",
      },
      {
        nama: 195,
        part: "pearl",
        depicts:
          "In the shallows under her a shell lies open on a pearl: the old story's raindrop that falls into a shell and hardens there without a flaw, with nothing on it for the eye to catch.",
      },
      {
        nama: 196,
        part: "lightning",
        depicts:
          "In the cloud a single flash lights everything at once. The Kena Upaniṣad teaches brahman this way, as the lightning flashes (4.4): all of it known in an instant, with no one bringing word.",
      },
      {
        nama: 197,
        part: "cloud",
        depicts:
          "The cloud is heaped across the whole sky, dark and heavy in the belly, and its rain comes down in sheets rather than drops: poured, not sprinkled.",
      },
      {
        nama: 198,
        part: "veiled",
        depicts:
          "The sun and the moon are behind the cloud, and neither shows as more than a faint disc. The Śvetāśvatara says of the highest that no one equal to it, and no one greater, is seen.",
      },
    ],
    detail: {
      part: "cataka",
      body: (
        <>
          On a reed at the right a cātaka holds its beak open to the rain. It is said to drink nothing but rain from
          the cloud, and Bhartṛhari puts it in the same verse as the owl: if no rain falls into its beak, is that the
          cloud&apos;s fault? Here a drop is falling straight in.
        </>
      ),
    },
  },
  "052": {
    Art: LetterRosary,
    intro: (Spot) => (
      <>
        Every name in this verse begins with <i>sarva</i>, all. After the long run of names that took things away, the
        hymn now adds, so the picture is full: a <Spot part="mantra">rosary</Spot> strung round all of it, and inside
        it everything turned toward her <Spot part="light">light</Spot>.
      </>
    ),
    entries: [
      {
        nama: 199,
        part: "sparks",
        depicts:
          "Sparks fly up out of her light, and each one is a small light of the same form. The Muṇḍaka Upaniṣad says that as sparks of like form leap by thousands from a blazing fire, so all things come from the imperishable (2.1.1). The powers are not things she holds: they are her own fire.",
      },
      {
        nama: 200,
        part: "conch",
        depicts:
          "A conch sounds toward her, as one is blown to open every wedding, festival and rite. The Devī Māhātmya's best-loved verse calls her the auspiciousness of everything auspicious (11.10).",
      },
      {
        nama: 201,
        part: "hamsa",
        depicts:
          "A single haṃsa flies home to her. The Śvetāśvatara pictures the soul as a haṃsa wandering in the great wheel, and says it reaches the deathless only when it is favoured (1.6): the good going is given, not earned.",
      },
      {
        nama: 202,
        part: "crowns",
        depicts:
          "Before her footstool lie the crowns of Brahmā, Viṣṇu and Indra, bowed to the floor. In the Saundaryalaharī her attendants call out as she rises to greet Śiva: mind Brahmā's crown, you will trip on Viṣṇu's, step round Indra's (29).",
      },
      {
        nama: 203,
        part: "gold",
        depicts:
          "A nugget of gold lies among a necklace, a bangle, a ring and an earring. The Chāndogya says that by one nugget everything made of gold is known: the change is only a name, and what is real is the gold (6.1.5). She is the gold of everything.",
      },
      {
        nama: 204,
        part: "mantra",
        depicts:
          "Round the whole picture runs a rosary of the fifty letters, from अ over the crown to क्ष. Every mantra is made of these letters, and in the tantras the letters are the little mothers, her own body of sound.",
      },
    ],
    detail: {
      part: "meru",
      body: (
        <>
          At the foot of the rosary, where the loop closes, the gold meru bead sits between अ, the first letter, and
          क्ष, the last. A rosary is called an <i>akṣamālā</i>, and the tradition hears the word as the garland that runs
          from <i>a</i> to <i>kṣa</i>.
        </>
      ),
    },
  },
  "053": {
    Art: GraciousOne,
    intro: (Spot) => (
      <>
        The verse goes from everything to kindness, and the picture is a sanctum floor where all of it meets: a{" "}
        <Spot part="yantra">diagram</Spot> drawn on the floor, a book, a bull, a bow, a bough, and over them a sound
        going up into silence.
      </>
    ),
    entries: [
      {
        nama: 205,
        part: "yantra",
        depicts:
          "A yantra is drawn in rice flour on the floor, square, circle, petals and star, and her light stands at its bindu. The lines are only lines; what is in them is her.",
      },
      {
        nama: 206,
        part: "tantra",
        depicts:
          "A palm-leaf tantra lies open on its stand, its cord hanging loose. Tantra first meant the warp stretched on a loom: the scriptures are the stretched threads, and the whole cloth of them is her outward form.",
      },
      {
        nama: 207,
        part: "nada",
        depicts:
          "Over the card a bindu, a half-moon and a short bar stand one above another, and from them a fine thread of resonance rises, thinner and fainter, past three last points of light into nothing. This is the old ladder of a mantra's sound fading into silence, and at its top, where mind goes past itself, is manonmanī.",
      },
      {
        nama: 208,
        part: "nandi",
        depicts:
          "Nandī, Śiva's bull, lies before her with his back to us, looking in, as he faces the shrine in every Śiva temple. Māheśvarī is the great lord's own power, and among the mothers she rides this bull.",
      },
      {
        nama: 209,
        part: "light",
        depicts:
          "Devī means the shining one, from the root div, to shine, and the great goddess is drawn simply as the light at the centre, the one every other goddess takes the title from.",
      },
      {
        nama: 210,
        part: "bilva",
        depicts:
          "A bilva bough reaches into the crown with its round fruit, which is called śrīphala, Śrī's fruit. The Śrī Sūkta says the bilva was born of Lakṣmī's tapas (6), and its three-part leaves are what Śiva is offered: one tree for both.",
      },
      {
        nama: 211,
        part: "bow",
        depicts:
          "Rudra's bow lies unstrung on the floor with a jasmine garland over it. The Vedic hymns beg the archer god to unstring it and be gracious, mṛḍa; this is him when he has, and the verse ends on the word for his kindness.",
      },
    ],
    detail: {
      part: "ear",
      body: (
        <>
          At Nandī&apos;s left ear a jasmine flower is tucked, and three small arcs go in. In Śiva temples people still
          lean down and whisper their prayers into the bull&apos;s ear, so that he will carry them in.
        </>
      ),
    },
  },
  "054": {
    Art: OneInManyPots,
    intro: (Spot) => (
      <>
        Seven great-names make a night lake under the Milky Way. Her <Spot part="light">light</Spot> stands on a lotus in
        the still water, everything on the lake moves toward her or away from her, and on the steps of the near bank nine{" "}
        <Spot part="pots">vessels</Spot> each hold all of it.
      </>
    ),
    entries: [
      {
        nama: 212,
        part: "sky",
        depicts:
          "The Milky Way rises from the far shore and arches across the whole sky. Nothing smaller would do for a form measured only by everything there is, and even this is only the part of it that shows at night.",
      },
      {
        nama: 213,
        part: "offerings",
        depicts:
          "Marigolds, jasmine, lotus petals and little leaf-cup lamps, let go from every shore, are all drifting across the water to her lotus. Wherever the worship was offered, this is where it arrives.",
      },
      {
        nama: 214,
        part: "reed",
        depicts:
          "At the right a tuft of reed has caught fire from her and is burning away to ash. The Chāndogya says that as the fluff of reed thrown in a fire is burned up, so are all the sins of one who knows (5.24.3).",
      },
      {
        nama: 215,
        part: "pots",
        depicts:
          "Each of the nine vessels on the ghat steps, clay pots and brass lotas, holds her whole light, not a ninth of it. That is māyā in its old sense, the craft by which one is made to appear as many, and the pots are her doing as much as the light is.",
      },
      {
        nama: 216,
        part: "lotus",
        depicts:
          "She stands on a white lotus among its pads, a flower that rises clean out of the mud: sattva, the clear and buoyant strand, and plain being, both without limit.",
      },
      {
        nama: 217,
        part: "ripples",
        depicts:
          "Every ring on the water spreads out from her, out to both banks. Without her, says the Saundaryalaharī, Śiva himself could not so much as stir (1); not a ripple moves except from her.",
      },
      {
        nama: 218,
        part: "birds",
        depicts:
          "A pair of cakravākas float side by side near her, with a small red heart between them. The poets' ruddy geese are parted every night and call to each other till dawn; in her light they are together, and the night does not part them.",
      },
    ],
    detail: {
      part: "siva",
      body: (
        <>
          On the nearest pot is painted शिव, Śiva, with its i-sign lit. The old saying goes that the i is Śakti, and without
          it śiva is only śava, a corpse.
        </>
      ),
    },
  },
  "055": {
    Art: StairOfAttainment,
    intro: (Spot) => (
      <>
        Six names list the goods that practice was thought to win, and the picture lays them out on a{" "}
        <Spot part="stair">temple stair</Spot> whose last step is her <Spot part="light">light</Spot>; the seventh
        name is for the people who climb it.
      </>
    ),
    entries: [
      {
        nama: 219,
        part: "feast",
        depicts:
          "On the landing a banana leaf is spread with rice, sweets, a banana, a cup of payasam and betel, the food that temples still call her bhoga. What is set before her she takes and enjoys.",
      },
      {
        nama: 220,
        part: "camaras",
        depicts:
          "Two royal fly-whisks of white yak hair cross in the crown, the insignia of a sovereign, bound by a clasp of eight pearls for the eight powers of a lord. They are only the fittings of her court.",
      },
      {
        nama: 221,
        part: "lion",
        depicts: "A lion sits on the plinth at the left of the stair's foot, the old emblem of a hero's valour, and hers.",
      },
      {
        nama: 222,
        part: "elephant",
        depicts:
          "An elephant stands on the plinth at the right. The Yoga Sūtra promises the strength of an elephant to those who meditate on strength (3.24); in her it is not won but simply there.",
      },
      {
        nama: 223,
        part: "crystal",
        depicts:
          "A clear crystal on the landing takes her light and breaks it into colours. The Yoga Sūtra likens the clarified mind to a flawless jewel that takes the colour of whatever it rests on (1.41); understanding is her light in it.",
      },
      {
        nama: 224,
        part: "stair",
        depicts:
          "The stair has eight steps, the lesser attainments, with a steady lamp beside each, and every one of them leads to the landing at the sanctum door where her light stands. She is not one more step but where the steps arrive.",
      },
      {
        nama: 225,
        part: "sandals",
        depicts:
          "At the foot of the stair three pairs of sandals have been left, of gold, silver and wood, for the masters of the divine, the perfected and the human lineages of teachers. Even they go up to her barefoot.",
      },
    ],
    detail: {
      part: "mouse",
      body: (
        <>
          A mouse is coming down the steps with a sweet from her leaf. Siddhi and Buddhi stand side by side in this
          verse as they do beside Gaṇeśa, whose two wives they are, and this is his mouse.
        </>
      ),
    },
  },
  "056": {
    Art: GreatYantra,
    intro: (Spot) => (
      <>
        Every name here begins with <i>mahā</i>, great, and the picture lays out the apparatus of her worship in the
        verse&apos;s own order, from the cloth overhead to the <Spot part="yantra">diagram</Spot> where her{" "}
        <Spot part="light">light</Spot> is invoked to sit. Each piece is drawn as hers, not the worshipper&apos;s.
      </>
    ),
    entries: [
      {
        nama: 226,
        part: "tantra",
        depicts:
          "Overhead a red canopy is stretched on four posts, its warp running through the cloth in plain sight and hanging from the rod as sixty-four threads. Tantra comes from tan, to stretch, as the warp is stretched on a loom; the sixty-four tantras of the Saundaryalaharī (31) hang loose, and hers is the cloth they come out of, whole.",
      },
      {
        nama: 227,
        part: "mantra",
        depicts:
          "From the canopy's edge hang three festoons, fifteen lights in all, the syllables of her mantra in their clusters of five, six and four. Each cluster ends in a gold disc engraved ह्रीं, the one syllable written out; the rest are given at initiation.",
      },
      {
        nama: 228,
        part: "yantra",
        depicts:
          "Below, face-on, the Śrīcakra is cut in a gold plate: the square of gates, three circles, sixteen petals and eight, and the nine interlocking triangles. Yantra is a device for holding something in place, and what it holds is her.",
      },
      {
        nama: 229,
        part: "seat",
        depicts:
          "The plate stands on a low throne with lions on its face and a jewelled arch for its back, raised on a dais. In the rite a plate is treated as the furniture of a throne room, and her light at the bindu is the one seated on it.",
      },
      {
        nama: 230,
        part: "krama",
        depicts:
          "Red flowers lie one in each enclosure, from the front gate inward, on a thread of light that winds through them to the bindu, and on the ground five offerings stand in the order they are made: sandal paste, flowers, incense, lamp and food. The order is part of what is offered.",
      },
      {
        nama: 231,
        part: "bhairava",
        depicts:
          "At the left Bhairava has planted his trident with his drum hanging from it, and at the right his skull-bowl stands heaped with red hibiscus and jasmine. The most terrible form of Śiva has set his terror down and filled his hands with flowers.",
      },
    ],
    detail: {
      part: "dog",
      body: (
        <>
          Bhairava&apos;s black dog, his mount, lies asleep at the foot of the trident with its nose on its paws. At his
          temples people feed the dogs as a way of feeding him; here, with its master at worship, it has nothing to
          guard.
        </>
      ),
    },
  },
  "057": {
    Art: WitnessOfTheDance,
    intro: (Spot) => (
      <>
        At the end of a world-age Śiva dances the <Spot part="worlds">worlds</Spot> into the fire, their eggs and the
        lotus, discus and thunderbolt of the gods who ran them, until there is only a field of ash. The picture draws
        the dance without the dancer. What it keeps still is her <Spot part="light">light</Spot>, the one thing the
        dance happens in front of.
      </>
    ),
    entries: [
      {
        nama: 232,
        part: "dance",
        depicts:
          "A ring of fire wheels round the card, its flames thrown back by the turn, and at the upper right the drum that keeps the dance's time is being shaken, its beads striking both heads. The tāṇḍava at the close of a kalpa is not a picture of the destruction but the destruction itself; she is its sākṣiṇī, the one who sees it with her own eyes.",
      },
      {
        nama: 233,
        part: "throne",
        depicts:
          "Below it stands one throne with two seats, his marked with his crescent and empty, because he is the one dancing, and hers with her light on it. A mahiṣī is the anointed chief queen, who shares the king's throne rather than attending at it.",
      },
      {
        nama: 234,
        part: "cities",
        depicts:
          "Three small cities, of gold, silver and iron, stand round the throne at the points of a triangle, the iron one on the ash, each lit at its gate by her. They are the three cities of the old myth, and every later reading of them, waking, dream and sleep among them; she is the beauty of the set, not of any one.",
      },
    ],
    detail: {
      part: "beats",
      body: (
        <>
          Above the drum hang the beats it has sounded, nine and then five. The grammarians say that when the king of
          dancers finished his dance he beat his drum nine times and five, and the fourteen sounds became the fourteen
          sūtras with which Pāṇini begins: they are called the Māheśvara sūtras, after the same Maheśvara as this
          name.
        </>
      ),
    },
  },
  "058": {
    Art: YoginiTemple,
    intro: (Spot) => (
      <>
        Sixty-four is said three times, and the picture is drawn where the third sixty-four was worshipped: a{" "}
        <Spot part="temple">yoginī temple</Spot>, round, roofless, and lined inside with niches, as the ones at
        Hirapur and Bheraghat still are. In the middle stands her <Spot part="light">light</Spot> on a round seat.
      </>
    ),
    entries: [
      {
        nama: 235,
        part: "services",
        depicts:
          "Over her are the parasol, the mirror and the fan, which come near the end of the sixty-four services. The whole rite is one long morning of hospitality, from taking off her old ornaments to the bath, the silks, the jewels and the weapons, and it closes with the five offerings with which an ordinary worship begins.",
      },
      {
        nama: 236,
        part: "arts",
        depicts:
          "Round her on the floor lie eight of the sixty-four arts: a vīṇā, a drum, anklet bells for dance, a brush and colours, a garland, a gem on its touchstone, a palm-leaf book, and a parrot being taught to talk. She is not served by them but made of them, the household knack as much as the high art.",
      },
      {
        nama: 237,
        part: "yoginis",
        depicts:
          "In every niche of the wall a yoginī burns as a small flame facing the centre, and more come down out of the open sky in flocks, eight to a flock: a gaṇa is a troop and a flock alike, and sixty-four crores is a number meant to be beyond counting.",
      },
    ],
    detail: {
      part: "moon",
      body: (
        <>
          Inside the wheel of flocks the moon shows one thin digit. That digit is a kalā too, the same word as
          the arts of the second name: a part of something larger, a sixteenth of the moon, a skill that can be taught.
        </>
      ),
    },
  },
  "059": {
    Art: MiddleOfTheMoon,
    intro: (Spot) => (
      <>
        The verse turns on the moon, and so does the picture: below the card the{" "}
        <Spot part="orb">moon&rsquo;s full disc</Spot> stands upright, being filled, and round it the moon waxes and
        wanes in fifteen small moons, each lit from her side. Their sixteenth is at the centre and never changes.
      </>
    ),
    entries: [
      {
        nama: 238,
        part: "manu",
        depicts:
          "From the left a gold jug pours into the disc: the vidyā as it came down Manu's line. He heads most lists of the twelve teachers through whom it was handed on.",
      },
      {
        nama: 239,
        part: "candra",
        depicts:
          "From the right a silver jug, marked with a crescent, pours the same water: Candra's recension. Once in the disc the two streams are one water, as she is one vidyā however it is spoken.",
      },
      {
        nama: 240,
        part: "orb",
        depicts:
          "She stands at the very centre of the moon's disc, which here is the cool, full orb the streams pour into, ringed by the fifteen digits that wax and wane; she is the one that does not.",
      },
      {
        nama: 241,
        part: "form",
        depicts: "Her light at the centre takes a form, slender and pointed like a lamp flame, full below: lovely in the plain sense.",
      },
      {
        nama: 242,
        part: "smile",
        depicts:
          "Her smile is the net of moonlight spreading from her across the ground (Saundaryalaharī 63), and the two cakoras on the rocks, birds that live on moonlight, have come to drink it.",
      },
      {
        nama: 243,
        part: "crescent",
        depicts: "On the tip of her form she wears a crescent, horns up. On Śiva it is the trace of an old ordeal; on her it is an ornament.",
      },
    ],
    detail: {
      part: "sour-gruel",
      body: (
        <>
          A third cakora has flown off to the moon in the sky and is drinking that instead. Śaṅkara says her smile
          was so sweet that it numbed their beaks, so now they take the cold-rayed moon for sour gruel, to clear the
          palate (Saundaryalaharī 63).
        </>
      ),
    },
  },
  "060": {
    Art: MountainsDaughter,
    intro: (Spot) => (
      <>
        The verse starts very far away and comes close enough to see her eyes, and so does the picture:{" "}
        <Spot part="mountain">Himavat</Spot> fills the plate, snow peaks in the crown, and at his foot a cave opens in
        the rock with her house on its back wall.
      </>
    ),
    entries: [
      {
        nama: 244,
        part: "world",
        depicts:
          "On his flanks the deodars stand still and the wild geese come in over the snows: the unmoving world and the moving one, both under her rule.",
      },
      {
        nama: 245,
        part: "cakra",
        depicts:
          "On the back wall of the cave stands the Śrīcakra, the king of diagrams. It does not stand for her; it is the house she lives in.",
      },
      {
        nama: 246,
        part: "mountain",
        depicts:
          "The mountain is her father, Himavat, and the rock she is named from. Pārvatī is simply what any daughter of that house would be called (Kumārasambhava 1.26).",
      },
      {
        nama: 247,
        part: "lotuses",
        depicts: "Before the cave's mouth, in a still pool, two lotuses have opened wide: her eyes, broad and fresh as they are.",
      },
      {
        nama: 248,
        part: "ruby",
        depicts:
          "Her light at the bindu fills the cave red as a ruby, padmarāga, the lotus-coloured stone, so the one word gives her eyes and her complexion. For once the thing compared is not put to shame; she simply shines as much.",
      },
    ],
    detail: {
      part: "yak",
      body: (
        <>
          On a ledge to the right a yak stands with its white tail lifted. Kālidāsa says the yaks of the Himālaya, flicking
          tails as white as moonbeams, fan him as servants fan a king, and so make his title &ldquo;king of
          mountains&rdquo; true (Kumārasambhava 1.13). The verse has a king of diagrams; the mountain has his whisks.
        </>
      ),
    },
  },
  "061": {
    Art: SaltAndTheCouch,
    intro: (Spot) => (
      <>
        The verse&rsquo;s second line is the reason for its first, and the picture keeps them together: below the card{" "}
        <Spot part="light">her light</Spot> is seated on the couch of the five gods, and all the life they have runs into
        them from her.
      </>
    ),
    entries: [
      {
        nama: 249,
        part: "couch",
        depicts:
          "The couch of the five Brahmās on its dais: Brahmā, Viṣṇu, Rudra and Īśvara its legs, Sadāśiva its plank. The gold of the legs has gone dull. Without her they cannot so much as stir (Saundaryalaharī 1).",
      },
      {
        nama: 250,
        part: "five",
        depicts:
          "In the crown the five Brahmās shine as the five faces of Sadāśiva, Īśāna upward at the centre and the other four toward the quarters, each in its own colour and each a flame of the same light. Below, she sits above them; here, she is them.",
      },
      {
        nama: 251,
        part: "light",
        depicts:
          "She is a light made of nothing but awareness. A thread of it runs down into each of the four legs and lights its medallion; that is all the life they have.",
      },
      {
        nama: 252,
        part: "bliss",
        depicts:
          "Her bliss widens round her ring beyond ring, each wider than the last by the same measure, like the Taittirīya's ladder of joys, each a hundred times the one below, up to the bliss that words turn back from.",
      },
      {
        nama: 253,
        part: "salt",
        depicts:
          "In a brass bowl before the dais a lump of rock salt is dissolving. No one could pick it out of the water again, yet the water is salt wherever it is touched: so is she a mass of knowing, with no inside and no outside (Bṛhadāraṇyaka 2.4.12).",
      },
    ],
    detail: {
      part: "blush",
      body: (
        <>
          The plank is white except where she sits, and there it is red. Śaṅkara says Sadāśiva, white as crystal, contrived
          to become the coverlet of her couch, and reflecting her red light he looks like love itself made flesh, a
          delight to her eyes (Saundaryalaharī 92).
        </>
      ),
    },
  },
  "062": {
    Art: WakingAndDream,
    intro: (Spot) => (
      <>
        The Māṇḍūkya says the dreamer has the same limbs and the same mouths as the waker, only turned inward, and the
        picture takes it at its word: the waking world stands along the far bank, and{" "}
        <Spot part="dream">the dream</Spot> is the same world turned over in the water.
      </>
    ),
    entries: [
      {
        nama: 254,
        part: "lamp",
        depicts:
          "On the water between them floats a lamp in a windless place, its flame quite still (Gītā 6.19). It rises toward the one world and its reflection goes down into the other: what sees, the seeing, and what is seen, one light.",
      },
      {
        nama: 255,
        part: "leaf",
        depicts:
          "Beside it a lotus leaf, which the water stands on in beads and never wets (Gītā 5.10): no deed, good or bad, leaves a mark on her.",
      },
      {
        nama: 256,
        part: "world",
        depicts:
          "The whole world along the bank, hills and palms, the village and its road, the temple and its trees, the birds overhead: her body, not her handiwork. Viśva is also the Māṇḍūkya's name for the waking self.",
      },
      {
        nama: 257,
        part: "sun",
        depicts: "The sun is up and the world is awake in its light, aware of what is outside it.",
      },
      {
        nama: 258,
        part: "dream",
        depicts: "Below the bank the same world lies turned over in the water, every house and tree of it, aware of what is inside.",
      },
      {
        nama: 259,
        part: "taijasa",
        depicts:
          "There is no sun in the water; the dream is lit from within, its windows and the temple door alight. Taijasa, the dreaming self, is the luminous one, its own light (Bṛhadāraṇyaka 4.3.9).",
      },
    ],
    detail: {
      part: "chariot",
      body: (
        <>
          On the road along the bank there is nothing; on the same road in the water a chariot is driving. &ldquo;There are
          no chariots there, no teams, no roads; but he makes chariots, teams and roads,&rdquo; says Yājñavalkya of the
          dreamer (Bṛhadāraṇyaka 4.3.10).
        </>
      ),
    },
  },
  "063": {
    Art: OceanOfSleep,
    intro: (Spot) => (
      <>
        The verse is a hinge between sleep and making, and the picture draws the scene the Purāṇas hang the two on:{" "}
        <Spot part="ocean">the one ocean</Spot> of the night between worlds, Viṣṇu asleep on the serpent, and a lotus
        rising from his navel with Brahmā on it.
      </>
    ),
    entries: [
      {
        nama: 260,
        part: "sleep",
        depicts:
          "A veil of night is drawn over the sleeper and stars stand in the dark round him. The sleep that holds Viṣṇu at the end of a world is she, the goddess who dwells in all beings as sleep (Devī Māhātmya 1, 5).",
      },
      {
        nama: 261,
        part: "ocean",
        depicts:
          "The one ocean, without shore or horizon: every water has become one water, as the sleeper's mind becomes one, a solid mass of knowing (Māṇḍūkya 5). It is dark, yet lit faintly from within.",
      },
      {
        nama: 262,
        part: "fourth",
        depicts:
          "Apart from all of it, in the crown, her light stands over a crescent, the half-measure that sits above ॐ and is never sounded: the fourth, beyond waking, dream and sleep (Māṇḍūkya 12).",
      },
      {
        nama: 263,
        part: "measures",
        depicts:
          "Below it hang the three measures, a, u and m, which the Upaniṣad makes waking, dream and sleep. They are strung together; she is not on the string, and even being the fourth is no state of hers.",
      },
      {
        nama: 264,
        part: "worlds",
        depicts:
          "Out of the lotus the fourteen worlds are let go as eggs, growing as they go: seven rise past the card into the night and seven sink into the water below. Creation as emission, the word sṛṣṭi.",
      },
      {
        nama: 265,
        part: "brahma",
        depicts:
          "From the sleeper's navel a lotus rises, and on it Brahmā's four faces are lit as four flames turned to the quarters. The face of making is his; the power in it is hers.",
      },
      {
        nama: 266,
        part: "guard",
        depicts:
          "Śeṣa lies coiled under the sleeper as his bed, and his seven hoods, each with its jewel, are spread over the sleeper's head. Goptrī is from √gup, which means to guard and also to hide.",
      },
      {
        nama: 267,
        part: "govinda",
        depicts:
          "On the coils lies a dark light, Viṣṇu, his conch and discus set down beside him: Govinda, who goes after the worlds as a cowherd after his cattle, resting between one round and the next.",
      },
    ],
    detail: {
      part: "banyan",
      body: (
        <>
          On the water below the serpent&rsquo;s tail floats a single banyan leaf with a speck of the same dark light on it. In another
          telling the sleeper of the one ocean is an infant lying on a banyan leaf, wondering who he is, and in the
          Devī Bhāgavata it is she who answers him with half a verse: &ldquo;All this is I alone; there is nothing else
          eternal.&rdquo;
        </>
      ),
    },
  },
  "064": {
    Art: TheDrawnScreen,
    intro: (Spot) => (
      <>
        The five acts are drawn as a temple keeps them, at <Spot part="sanctum">the door of a sanctum</Spot> at the
        moment the screen is drawn aside. Inside rest the same five gods who lay inert under her three verses back, now
        at work.
      </>
    ),
    entries: [
      {
        nama: 268,
        part: "gather",
        depicts:
          "In the crown the fourteen worlds are drawn in a spiral into the fire, shrinking as they go, the way a breath is taken in.",
      },
      {
        nama: 269,
        part: "rudra",
        depicts:
          "Beside the door Rudra's trident rises from the ground into the crown, fire on its three points and his drum tied under them: the fire at the end of a world, which is only her gathering it back.",
      },
      {
        nama: 270,
        part: "screen",
        depicts:
          "A vermilion screen hangs before the door, and one half of it is still drawn across. Tirodhāna is a curtain put across a thing; what it hides is her own nature, so that a world of separate beings can stand.",
      },
      {
        nama: 271,
        part: "cord",
        depicts:
          "The screen hangs from a rod with crowned finials, and the cord that draws it runs up the doorpost and out of sight: a rule the worlds live under and cannot see.",
      },
      {
        nama: 272,
        part: "sadasiva",
        depicts:
          "The plank she rests on is Sadāśiva, the fifth of the couch's gods, white as crystal and lit along its length: grace as a disposition that never lapses.",
      },
      {
        nama: 273,
        part: "grace",
        depicts:
          "Where the screen is pulled aside her light is open to view, and it spills over the threshold and down the steps toward whoever stands there. Grace is the curtain's other half, given, not earned (Gītā 7.14).",
      },
      {
        nama: 274,
        part: "couch",
        depicts:
          "She rests on the couch of the five Brahmās, the gods of the five acts, every leg bright and every medallion lit. The five are what she rests on and what she is wholly given over to.",
      },
    ],
    detail: {
      part: "spider",
      body: (
        <>
          Under the right end of the lintel a spider hangs on its thread from its web. &ldquo;As a spider sends out its
          thread and draws it in again, so from the imperishable this world comes forth&rdquo; (Muṇḍaka 1.1.7): the
          Upaniṣad&rsquo;s own picture for making and withdrawing as one act of one maker.
        </>
      ),
    },
  },
};
