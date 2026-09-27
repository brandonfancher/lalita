import { DrawnBow } from "./drawn-bow";
import { EighthNightMoon } from "./eighth-night-moon";
import { FireOfAwareness } from "./fire-of-awareness";
import { FloweringHair } from "./flowering-hair";
import { ThousandDawns } from "./thousand-dawns";
import type { Artwork } from "./types";

/** Artwork adorning each shloka page, keyed by module id, with its note for readers. */
export const ARTWORK: Record<string, Artwork> = {
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
};
