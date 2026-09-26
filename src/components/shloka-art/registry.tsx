import { FireOfAwareness } from "./fire-of-awareness";
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
};
