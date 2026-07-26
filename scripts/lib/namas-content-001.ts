/**
 * Hand-written content for nāmas 1–100 of the Lalitā Sahasranāma.
 *
 * Word meanings are grounded in Monier-Williams (1899); the prose glosses,
 * translations and compound analyses are written fresh for this project.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  1: {
    gloss: "The Resplendent Mother",
    translation:
      "She is the mother of everything that is, and majesty belongs to her as naturally as warmth belongs to fire.",
    compound: {
      type: "karmadhāraya",
      gloss: "the mother who is majesty itself",
      vigraha: "śrīś cāsau mātā ca",
      children: [
        ["śrī", "radiance, majesty, auspicious good fortune"],
        ["mātṛ", "mother"],
      ],
    },
  },

  2: {
    gloss: "The Great Empress",
    translation:
      "She reigns over the whole of creation as its sovereign, holding an authority no other power can limit.",
    compound: {
      type: "karmadhāraya",
      gloss: "the glorious great queen",
      vigraha: "śrīś cāsau mahārājñī ca",
      children: [
        ["śrī", "radiance, majesty, auspicious good fortune"],
        {
          iast: "mahārājñī",
          type: "karmadhāraya",
          gloss: "great queen",
          vigraha: "mahatī cāsau rājñī ca",
          children: [
            ["mahat", "great, mighty"],
            ["rājñī", "queen, the wife of a king"],
          ],
        },
      ],
    },
  },

  3: {
    gloss: "Mistress Of The Lion Throne",
    translation:
      "She is the one seated in command upon the splendid lion-throne, the seat from which the universe is governed.",
    compound: {
      type: "tatpuruṣa",
      gloss: "sovereign lady of the majestic lion-throne",
      vigraha: "śrīmataḥ siṃhāsanasya īśvarī",
      children: [
        {
          iast: "śrīmatsiṃhāsana",
          type: "karmadhāraya",
          gloss: "the lion-throne endowed with splendour",
          vigraha: "śrīmac ca tat siṃhāsanaṃ ca",
          children: [
            ["śrīmat", "possessed of splendour, glorious"],
            {
              iast: "siṃhāsana",
              type: "tatpuruṣa",
              gloss: "lion-seat, throne",
              vigraha: "siṃhasya āsanam",
              children: [
                ["siṃha", "lion"],
                ["āsana", "seat"],
              ],
            },
          ],
        },
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },

  4: {
    gloss: "Born From The Fire Of Awareness",
    translation:
      "She rose out of the sacrificial pit whose fire is pure consciousness, so that her origin is awareness itself rather than any element.",
    compound: {
      type: "tatpuruṣa",
      gloss: "arisen from the fire-pit of consciousness",
      vigraha: "cidagnikuṇḍāt sambhūtā",
      children: [
        {
          iast: "cidagnikuṇḍa",
          type: "tatpuruṣa",
          gloss: "the fire-pit of consciousness",
          vigraha: "cidagneḥ kuṇḍam",
          children: [
            {
              iast: "cidagni",
              type: "karmadhāraya",
              gloss: "the fire that is consciousness",
              vigraha: "cid eva agniḥ",
              children: [
                ["cit", "consciousness, pure awareness"],
                ["agni", "fire"],
              ],
            },
            ["kuṇḍa", "a pit sunk in the ground to hold sacred fire, a basin"],
          ],
        },
        ["sambhūta", "arisen, come into being, born from"],
      ],
    },
  },

  5: {
    gloss: "Risen For The Gods' Cause",
    translation:
      "She took form fully intent on the errand of the gods, appearing precisely when the powers of heaven had no other recourse.",
    compound: {
      type: "tatpuruṣa",
      gloss: "risen up for the work of the gods",
      vigraha: "devakārye samudyatā",
      children: [
        {
          iast: "devakārya",
          type: "tatpuruṣa",
          gloss: "the business of the gods",
          vigraha: "devānāṃ kāryam",
          children: [
            ["deva", "god, shining one"],
            ["kārya", "what must be done, task, business"],
          ],
        },
        ["samudyata", "risen up, roused, ready for action"],
      ],
    },
  },

  6: {
    gloss: "Bright As A Thousand Dawns",
    translation:
      "Her body gives off the light of a thousand suns climbing at once over the horizon.",
    note: "ābhā is itself feminine, so the ending does not settle the class; the bahuvrīhi reading is taken because the epithet describes her rather than naming a radiance.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose sheen is that of a thousand rising suns",
      vigraha: "udyadbhānusahasrasya ābheva ābhā yasyāḥ sā",
      children: [
        {
          iast: "udyadbhānusahasra",
          type: "tatpuruṣa",
          gloss: "a thousand rising suns",
          vigraha: "udyatāṃ bhānūnāṃ sahasram",
          children: [
            {
              iast: "udyadbhānu",
              type: "karmadhāraya",
              gloss: "the rising sun",
              vigraha: "udyaṃś cāsau bhānuś ca",
              children: [
                ["udyat", "rising, coming up"],
                ["bhānu", "sun, ray of light"],
              ],
            },
            ["sahasra", "a thousand"],
          ],
        },
        ["ābhā", "radiance, sheen, the look a thing gives off"],
      ],
    },
  },

  7: {
    gloss: "Endowed With Four Arms",
    translation:
      "She appears with four arms, each one carrying an instrument by which she governs the movements of desire.",
    compound: {
      type: "tatpuruṣa",
      gloss: "furnished with four arms",
      vigraha: "caturbhir bāhubhiḥ samanvitā",
      children: [
        {
          iast: "caturbāhu",
          type: "dvigu",
          gloss: "a set of four arms",
          vigraha: "catvāro bāhavaḥ",
          children: [
            ["catur", "four"],
            ["bāhu", "arm"],
          ],
        },
        ["samanvita", "furnished with, fully possessed of"],
      ],
    },
  },

  8: {
    gloss: "Rich With The Noose Of Longing",
    translation:
      "In one hand she carries the noose whose very substance is attachment, the cord by which every creature is drawn toward what it loves.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abounding in the noose that is desire itself",
      vigraha: "rāgasvarūpeṇa pāśena āḍhyā",
      children: [
        {
          iast: "rāgasvarūpapāśa",
          type: "karmadhāraya",
          gloss: "the noose whose nature is passion",
          vigraha: "rāgasvarūpaḥ pāśaḥ",
          children: [
            {
              iast: "rāgasvarūpa",
              type: "tatpuruṣa",
              gloss: "the essential form of desire",
              vigraha: "rāgasya svarūpam",
              children: [
                ["rāga", "colouring; passion, attachment, desire"],
                ["svarūpa", "own form, essential nature"],
              ],
            },
            ["pāśa", "noose, snare, binding cord"],
          ],
        },
        ["āḍhya", "rich in, abundantly supplied with"],
      ],
    },
  },

  9: {
    gloss: "Blazing With The Goad Of Wrath",
    translation:
      "Her elephant-goad is anger given a shape, and it flashes in her hand as the force that turns a creature back from its wandering.",
    compound: {
      type: "tatpuruṣa",
      gloss: "brilliant with the goad shaped out of anger",
      vigraha: "krodhākāreṇa aṅkuśena ujjvalā",
      children: [
        {
          iast: "krodhākārāṅkuśa",
          type: "karmadhāraya",
          gloss: "the goad that has the shape of wrath",
          vigraha: "krodhākāraḥ aṅkuśaḥ",
          children: [
            {
              iast: "krodhākāra",
              type: "bahuvrīhi",
              gloss: "having anger for its form",
              vigraha: "krodha ākāro yasya saḥ",
              children: [
                ["krodha", "anger, wrath"],
                ["ākāra", "form, shape, outward figure"],
              ],
            },
            ["aṅkuśa", "elephant-driver's hook, goad"],
          ],
        },
        ["ujjvala", "blazing up, brilliant, luminous"],
      ],
    },
  },

  10: {
    gloss: "Bearer Of The Sugarcane Bow",
    translation:
      "The bow she draws is made of sugarcane and is nothing other than the mind, sweet to the taste and bent by her hand.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose sugarcane bow is the mind",
      vigraha: "manorūpam ikṣukodaṇḍaṃ yasyāḥ sā",
      children: [
        {
          iast: "manorūpa",
          type: "karmadhāraya",
          gloss: "the form that is mind",
          vigraha: "mana eva rūpam",
          children: [
            ["manas", "mind, the inner organ of thought and feeling"],
            ["rūpa", "form, shape, visible appearance"],
          ],
        },
        {
          iast: "ikṣukodaṇḍa",
          type: "karmadhāraya",
          gloss: "a bow of sugarcane",
          vigraha: "ikṣumayaṃ kodaṇḍam",
          children: [
            ["ikṣu", "sugarcane"],
            ["kodaṇḍa", "bow"],
          ],
        },
      ],
    },
  },

  11: {
    gloss: "Whose Arrows Are The Subtle Elements",
    translation:
      "Her five arrows are the bare sense-qualities themselves, so that every sight, sound, touch, taste and smell is a shaft loosed from her bow.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose arrows are the five subtle elements",
      vigraha: "pañca tanmātrāṇy eva sāyakā yasyāḥ sā",
      children: [
        {
          iast: "pañcatanmātra",
          type: "dvigu",
          gloss: "the set of five subtle elements",
          vigraha: "pañcānāṃ tanmātrāṇāṃ samāhāraḥ",
          children: [
            ["pañcan", "five"],
            ["tanmātra", "a bare sense-quality, subtle element"],
          ],
        },
        ["sāyaka", "arrow, missile"],
      ],
    },
  },

  12: {
    gloss: "In Whose Red Flood The Worlds Are Drowned",
    translation:
      "The rosy light that streams from her own body rises like a tide until every world-egg floats submerged in it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whose flood of ruddy light the mass of worlds lies sunk",
      vigraha: "nijāruṇaprabhāpūre majjad brahmāṇḍamaṇḍalaṃ yasyāḥ sā",
      children: [
        {
          iast: "nijāruṇaprabhāpūramajjat",
          type: "tatpuruṣa",
          gloss: "sinking in the flood of her own red radiance",
          vigraha: "nijāruṇaprabhāpūre majjat",
          children: [
            {
              iast: "nijāruṇaprabhāpūra",
              type: "tatpuruṣa",
              gloss: "the flood of her own dawn-red light",
              vigraha: "nijāyā aruṇāyāḥ prabhāyāḥ pūraḥ",
              children: [
                {
                  iast: "nijāruṇaprabhā",
                  type: "karmadhāraya",
                  gloss: "her own reddish radiance",
                  vigraha: "nijā cāsāv aruṇā ca prabhā ca",
                  children: [
                    ["nija", "one's own, innate"],
                    ["aruṇa", "reddish, tawny, the colour of dawn"],
                    ["prabhā", "light, splendour, radiance"],
                  ],
                },
                ["pūra", "flood, swelling stream, a great quantity of water"],
              ],
            },
            ["majjat", "sinking, going under, being submerged"],
          ],
        },
        {
          iast: "brahmāṇḍamaṇḍala",
          type: "tatpuruṣa",
          gloss: "the whole round of cosmic eggs",
          vigraha: "brahmāṇḍānāṃ maṇḍalam",
          children: [
            ["brahmāṇḍa", "the egg of Brahmā, a universe"],
            ["maṇḍala", "circle, orb, an entire collection"],
          ],
        },
      ],
    },
  },

  13: {
    gloss: "Whose Hair Shines With Flowers",
    translation:
      "Campaka, aśoka, punnāga and fragrant water-lily blossoms are woven through her hair and make it glisten.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose hair glistens with campaka, aśoka, punnāga and saugandhika blooms",
      vigraha: "campakāśokapunnāgasaugandhikair lasan kaco yasyāḥ sā",
      children: [
        {
          iast: "campakāśokapunnāgasaugandhikalasat",
          type: "tatpuruṣa",
          gloss: "shining with campaka, aśoka, punnāga and saugandhika flowers",
          vigraha: "campakāśokapunnāgasaugandhikair lasat",
          children: [
            {
              iast: "campakāśokapunnāgasaugandhika",
              type: "dvandva",
              gloss: "campaka, aśoka, punnāga and saugandhika blossoms",
              vigraha: "campakaś ca aśokaś ca punnāgaś ca saugandhikaṃ ca",
              children: [
                ["campaka", "the campaka tree and its yellow fragrant flower"],
                ["aśoka", "the aśoka tree, which bears deep red blossoms"],
                ["punnāga", "the punnāga tree, Calophyllum inophyllum"],
                ["saugandhika", "the sweet-scented white or blue water-lily"],
              ],
            },
            ["lasat", "shining, glistening, sporting"],
          ],
        },
        ["kaca", "the hair of the head"],
      ],
    },
  },

  14: {
    gloss: "Crowned With Rows Of Rubies",
    translation:
      "A diadem set with tier upon tier of rubies flashes above her, and that flashing is itself her ornament.",
    compound: {
      type: "tatpuruṣa",
      gloss: "adorned by a crown glittering with rows of ruby gems",
      vigraha: "kuruvindamaṇiśreṇīkanatkoṭīreṇa maṇḍitā",
      children: [
        {
          iast: "kuruvindamaṇiśreṇīkanatkoṭīra",
          type: "karmadhāraya",
          gloss: "the diadem that glitters with rows of rubies",
          vigraha: "kuruvindamaṇiśreṇībhiḥ kanac ca tat koṭīraṃ ca",
          children: [
            {
              iast: "kuruvindamaṇiśreṇīkanat",
              type: "tatpuruṣa",
              gloss: "glittering with rows of ruby gems",
              vigraha: "kuruvindamaṇiśreṇībhiḥ kanat",
              children: [
                {
                  iast: "kuruvindamaṇiśreṇī",
                  type: "tatpuruṣa",
                  gloss: "rows of ruby gems",
                  vigraha: "kuruvindamaṇīnāṃ śreṇyaḥ",
                  children: [
                    {
                      iast: "kuruvindamaṇi",
                      type: "karmadhāraya",
                      gloss: "the gem that is a ruby",
                      vigraha: "kuruvinda eva maṇiḥ",
                      children: [
                        ["kuruvinda", "ruby"],
                        ["maṇi", "jewel, gem, bead"],
                      ],
                    },
                    ["śreṇī", "row, line, tier"],
                  ],
                },
                ["kanat", "shining, glittering"],
              ],
            },
            ["koṭīra", "crown, diadem"],
          ],
        },
        ["maṇḍita", "adorned, decorated"],
      ],
    },
  },

  15: {
    gloss: "Graced By A Half-Moon Brow",
    translation:
      "The broad curve of her forehead carries the same clear light as the moon on the eighth night of the waxing fortnight.",
    note: "Frequently listed as a bahuvrīhi, but the final member śobhitā is a participle predicated of the goddess herself, which makes an instrumental tatpuruṣa the tighter analysis.",
    compound: {
      type: "tatpuruṣa",
      gloss: "made beautiful by a brow shining like the eighth-night moon",
      vigraha: "aṣṭamīcandravibhrājatā alikasthalena śobhitā",
      children: [
        {
          iast: "aṣṭamīcandravibhrājadalikasthala",
          type: "karmadhāraya",
          gloss: "the expanse of brow that shines like the eighth-night moon",
          vigraha: "aṣṭamīcandravibhrājac ca tad alikasthalaṃ ca",
          children: [
            {
              iast: "aṣṭamīcandravibhrājat",
              type: "tatpuruṣa",
              gloss: "shining like the moon of the eighth lunar day",
              vigraha: "aṣṭamīcandra iva vibhrājat",
              children: [
                {
                  iast: "aṣṭamīcandra",
                  type: "tatpuruṣa",
                  gloss: "the moon of the eighth lunar day",
                  vigraha: "aṣṭamyāś candraḥ",
                  children: [
                    ["aṣṭamī", "the eighth day or night of a lunar fortnight"],
                    ["candra", "moon"],
                  ],
                },
                ["vibhrājat", "shining forth, gleaming brightly"],
              ],
            },
            {
              iast: "alikasthala",
              type: "karmadhāraya",
              gloss: "the expanse of the forehead",
              vigraha: "alikam eva sthalam",
              children: [
                ["alika", "forehead, brow"],
                ["sthala", "level ground, tract, expanse"],
              ],
            },
          ],
        },
        ["śobhita", "made beautiful, graced, embellished by"],
      ],
    },
  },

  16: {
    gloss: "Whose Musk Mark Is The Moon's Spot",
    translation:
      "The dab of musk on her face plays the part that the dark blemish plays on the moon, a small shadow that only sharpens the brightness around it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose musk mark looks like the spot on the moon of her face",
      vigraha: "mukhacandrakalaṅkābhaṃ mṛganābhiviśeṣakaṃ yasyāḥ sā",
      children: [
        {
          iast: "mukhacandrakalaṅkābha",
          type: "bahuvrīhi",
          gloss: "resembling the blemish on the moon that is her face",
          vigraha: "mukhacandrakalaṅkasya ābheva ābhā yasya tat",
          children: [
            {
              iast: "mukhacandrakalaṅka",
              type: "tatpuruṣa",
              gloss: "the dark mark on the face-moon",
              vigraha: "mukhacandrasya kalaṅkaḥ",
              children: [
                {
                  iast: "mukhacandra",
                  type: "karmadhāraya",
                  gloss: "the moon that is her face",
                  vigraha: "mukham eva candraḥ",
                  children: [
                    ["mukha", "face, countenance"],
                    ["candra", "moon"],
                  ],
                },
                ["kalaṅka", "spot, stain, blemish"],
              ],
            },
            ["ābha", "resembling, having the look of"],
          ],
        },
        {
          iast: "mṛganābhiviśeṣaka",
          type: "tatpuruṣa",
          gloss: "the ornamental mark drawn in musk",
          vigraha: "mṛganābhinā kṛtaṃ viśeṣakam",
          children: [
            ["mṛganābhi", "musk, literally the deer's navel"],
            ["viśeṣaka", "a decorative mark painted on the face"],
          ],
        },
      ],
    },
  },

  17: {
    gloss: "Whose Brows Are Love's Archway",
    translation:
      "Her face is the festive house of Love, and her two eyebrows are the garlanded arch flung across its doorway.",
    note: "Monier-Williams records cilli / cillikā chiefly as a pot-herb; the sense required here is the well-attested one of the eyebrow, as in the parallel word bhrūlatā.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose eyebrows are the festooned arch of Love's bridal house",
      vigraha: "vadanasmaramāṅgalyagṛhatoraṇe iva cillike yasyāḥ sā",
      children: [
        {
          iast: "vadanasmaramāṅgalyagṛhatoraṇa",
          type: "tatpuruṣa",
          gloss: "the festooned gateway of the auspicious house of Love that is her face",
          vigraha: "vadanasmaramāṅgalyagṛhasya toraṇam",
          children: [
            {
              iast: "vadanasmaramāṅgalyagṛha",
              type: "karmadhāraya",
              gloss: "her face, which is Love's own festive house",
              vigraha: "vadanam eva smarasya māṅgalyaṃ gṛham",
              children: [
                ["vadana", "face, countenance"],
                {
                  iast: "smaramāṅgalyagṛha",
                  type: "tatpuruṣa",
                  gloss: "the auspicious house of the god of love",
                  vigraha: "smarasya māṅgalyaṃ gṛham",
                  children: [
                    ["smara", "Kāma, the god of love; remembrance"],
                    ["māṅgalya", "auspicious, festive, bringing good fortune"],
                    ["gṛha", "house, dwelling"],
                  ],
                },
              ],
            },
            ["toraṇa", "arched gateway hung with festoons"],
          ],
        },
        ["cillikā", "eyebrow"],
      ],
    },
  },

  18: {
    gloss: "Whose Eyes Are Fish In Beauty's Stream",
    translation:
      "The loveliness of her face brims over like a channel in flood, and her eyes move in it the way fish dart through running water.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose eyes look like fish darting in the overflow of her face's beauty",
      vigraha: "vaktralakṣmīparīvāhacalanmīnābhe locane yasyāḥ sā",
      children: [
        {
          iast: "vaktralakṣmīparīvāhacalanmīnābha",
          type: "bahuvrīhi",
          gloss: "having the look of fish moving in the flood of her face's loveliness",
          vigraha: "vaktralakṣmīparīvāhacalanmīnasya ābheva ābhā yasya tat",
          children: [
            {
              iast: "vaktralakṣmīparīvāhacalanmīna",
              type: "tatpuruṣa",
              gloss: "a fish darting in the overflow of her face's beauty",
              vigraha: "vaktralakṣmīparīvāhe calanmīnaḥ",
              children: [
                {
                  iast: "vaktralakṣmīparīvāha",
                  type: "tatpuruṣa",
                  gloss: "the overflow channel of the beauty of her face",
                  vigraha: "vaktralakṣmyāḥ parīvāhaḥ",
                  children: [
                    {
                      iast: "vaktralakṣmī",
                      type: "tatpuruṣa",
                      gloss: "the loveliness of the face",
                      vigraha: "vaktrasya lakṣmīḥ",
                      children: [
                        ["vaktra", "mouth, face"],
                        ["lakṣmī", "beauty, splendour, good fortune"],
                      ],
                    },
                    ["parīvāha", "the overflow of a full reservoir, an outlet channel"],
                  ],
                },
                {
                  iast: "calanmīna",
                  type: "karmadhāraya",
                  gloss: "a darting fish",
                  vigraha: "calaṃś cāsau mīnaś ca",
                  children: [
                    ["calat", "moving, stirring, darting"],
                    ["mīna", "fish"],
                  ],
                },
              ],
            },
            ["ābha", "resembling, having the appearance of"],
          ],
        },
        ["locana", "eye"],
      ],
    },
  },

  19: {
    gloss: "Whose Nose Is A Fresh Campaka Bud",
    translation:
      "The straight ridge of her nose has the pale gold colour and slender line of a campaka flower newly opened.",
    compound: {
      type: "tatpuruṣa",
      gloss: "made resplendent by a nose-ridge like a fresh campaka blossom",
      vigraha: "navacampakapuṣpābhena nāsādaṇḍena virājitā",
      children: [
        {
          iast: "navacampakapuṣpābhanāsādaṇḍa",
          type: "karmadhāraya",
          gloss: "the shaft of her nose, fair as a newly opened campaka flower",
          vigraha: "navacampakapuṣpābhaś cāsau nāsādaṇḍaś ca",
          children: [
            {
              iast: "navacampakapuṣpābha",
              type: "bahuvrīhi",
              gloss: "having the look of a fresh campaka blossom",
              vigraha: "navacampakapuṣpasya ābheva ābhā yasya saḥ",
              children: [
                {
                  iast: "navacampakapuṣpa",
                  type: "karmadhāraya",
                  gloss: "a fresh campaka blossom",
                  vigraha: "navaṃ campakapuṣpam",
                  children: [
                    ["nava", "new, fresh, just opened"],
                    {
                      iast: "campakapuṣpa",
                      type: "tatpuruṣa",
                      gloss: "the flower of the campaka tree",
                      vigraha: "campakasya puṣpam",
                      children: [
                        ["campaka", "the campaka tree, Michelia champaca"],
                        ["puṣpa", "flower, blossom"],
                      ],
                    },
                  ],
                },
                ["ābha", "resembling, having the appearance of"],
              ],
            },
            {
              iast: "nāsādaṇḍa",
              type: "tatpuruṣa",
              gloss: "the shaft of the nose",
              vigraha: "nāsāyā daṇḍaḥ",
              children: [
                ["nāsā", "nose"],
                ["daṇḍa", "staff, rod, shaft"],
              ],
            },
          ],
        },
        ["virājita", "made resplendent, rendered brilliant"],
      ],
    },
  },

  20: {
    gloss: "Radiant With A Star-Shaming Nose Jewel",
    translation:
      "The jewel in her nose burns so clearly that the light of the stars is put out of countenance beside it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "brilliant with a nose-ornament that outshines the lustre of the stars",
      vigraha: "tārākāntitiraskāriṇā nāsābharaṇena bhāsurā",
      children: [
        {
          iast: "tārākāntitiraskārināsābharaṇa",
          type: "karmadhāraya",
          gloss: "the nose-jewel that eclipses the brightness of the stars",
          vigraha: "tārākāntitiraskāri ca tan nāsābharaṇaṃ ca",
          children: [
            {
              iast: "tārākāntitiraskārin",
              type: "tatpuruṣa",
              gloss: "surpassing the lustre of the stars",
              vigraha: "tārākāntes tiraskāri",
              children: [
                {
                  iast: "tārākānti",
                  type: "tatpuruṣa",
                  gloss: "the brightness of the stars",
                  vigraha: "tārāṇāṃ kāntiḥ",
                  children: [
                    ["tārā", "star"],
                    ["kānti", "loveliness, brightness, lustre"],
                  ],
                },
                ["tiraskārin", "surpassing, putting to shame"],
              ],
            },
            {
              iast: "nāsābharaṇa",
              type: "tatpuruṣa",
              gloss: "an ornament for the nose",
              vigraha: "nāsāyā ābharaṇam",
              children: [
                ["nāsā", "nose"],
                ["ābharaṇa", "ornament, jewellery"],
              ],
            },
          ],
        },
        ["bhāsura", "shining, radiant, splendid"],
      ],
    },
  },

  21: {
    gloss: "Charming With Kadamba Ear-Flowers",
    translation:
      "Clusters of kadamba blossom are worked into the ornament at her ear, and the sight of it carries the mind away.",
    compound: {
      type: "tatpuruṣa",
      gloss: "captivating by an ear-ornament made of kadamba clusters",
      vigraha: "kadambamañjarīkḷptena karṇapūreṇa manoharā",
      children: [
        {
          iast: "kadambamañjarīkḷptakarṇapūra",
          type: "karmadhāraya",
          gloss: "the ear-ornament fashioned from sprays of kadamba",
          vigraha: "kadambamañjarīkḷptaś cāsau karṇapūraś ca",
          children: [
            {
              iast: "kadambamañjarīkḷpta",
              type: "tatpuruṣa",
              gloss: "made up of kadamba clusters",
              vigraha: "kadambamañjarībhiḥ kḷptaḥ",
              children: [
                {
                  iast: "kadambamañjarī",
                  type: "tatpuruṣa",
                  gloss: "a cluster of kadamba blossoms",
                  vigraha: "kadambasya mañjarī",
                  children: [
                    ["kadamba", "the kadamba tree, whose orange blossoms are fragrant"],
                    ["mañjarī", "a cluster of blossoms, a flowering spray"],
                  ],
                },
                ["kḷpta", "made, arranged, fashioned"],
              ],
            },
            ["karṇapūra", "an ornament worn at the ear, often of flowers"],
          ],
        },
        ["manohara", "heart-stealing, captivating"],
      ],
    },
  },

  22: {
    gloss: "Wearing Sun And Moon As Earrings",
    translation:
      "The discs of the sun and the moon have become the pair of pendants that hang from her ears.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose earrings are the orbs of sun and moon",
      vigraha: "tāṭaṅkayugalībhūte tapanoḍupamaṇḍale yasyāḥ sā",
      children: [
        {
          iast: "tāṭaṅkayugalībhūta",
          type: "tatpuruṣa",
          gloss: "having become a pair of ear-pendants",
          vigraha: "tāṭaṅkayugalī bhūta",
          children: [
            {
              iast: "tāṭaṅkayugala",
              type: "tatpuruṣa",
              gloss: "a pair of large earrings",
              vigraha: "tāṭaṅkayor yugalam",
              children: [
                ["tāṭaṅka", "a large ear-ornament, ear-pendant"],
                ["yugala", "a pair, a couple"],
              ],
            },
            ["bhūta", "become, turned into"],
          ],
        },
        {
          iast: "tapanoḍupamaṇḍala",
          type: "tatpuruṣa",
          gloss: "the discs of sun and moon",
          vigraha: "tapanoḍupayor maṇḍale",
          children: [
            {
              iast: "tapanoḍupa",
              type: "dvandva",
              gloss: "the sun and the moon",
              vigraha: "tapanaś ca uḍupaś ca",
              children: [
                ["tapana", "the burning one, the sun"],
                ["uḍupa", "the moon, likened to a small boat"],
              ],
            },
            ["maṇḍala", "disc, orb"],
          ],
        },
      ],
    },
  },

  23: {
    gloss: "Whose Cheeks Shame Ruby Mirrors",
    translation:
      "Her cheeks are so smooth and so deeply flushed that a mirror cut from ruby would look dull held beside them.",
    note: "The final member bhū is inherently feminine, so the ending does not decide the class; the compound is read as a bahuvrīhi because the epithet names the goddess and not a pair of cheeks.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose cheeks outdo a mirror of ruby",
      vigraha: "padmarāgaśilādarśaparibhāvinī kapolabhūr yasyāḥ sā",
      children: [
        {
          iast: "padmarāgaśilādarśaparibhāvin",
          type: "tatpuruṣa",
          gloss: "putting a mirror of ruby to shame",
          vigraha: "padmarāgaśilādarśasya paribhāvī",
          children: [
            {
              iast: "padmarāgaśilādarśa",
              type: "tatpuruṣa",
              gloss: "a looking-glass of ruby",
              vigraha: "padmarāgaśilāyā ādarśaḥ",
              children: [
                {
                  iast: "padmarāgaśilā",
                  type: "karmadhāraya",
                  gloss: "the stone that is a ruby",
                  vigraha: "padmarāga eva śilā",
                  children: [
                    {
                      iast: "padmarāga",
                      type: "bahuvrīhi",
                      gloss: "having the colour of a lotus, the ruby",
                      vigraha: "padmasya rāga iva rāgo yasya saḥ",
                      children: [
                        ["padma", "lotus"],
                        ["rāga", "colour, hue, redness"],
                      ],
                    },
                    ["śilā", "stone, rock"],
                  ],
                },
                ["ādarśa", "mirror, looking-glass"],
              ],
            },
            ["paribhāvin", "slighting, putting down, surpassing"],
          ],
        },
        {
          iast: "kapolabhū",
          type: "tatpuruṣa",
          gloss: "the surface of the cheeks",
          vigraha: "kapolayor bhūḥ",
          children: [
            ["kapola", "cheek"],
            ["bhū", "ground, surface, the place where something is"],
          ],
        },
      ],
    },
  },

  24: {
    gloss: "Whose Lips Outdo Coral And Bimba",
    translation:
      "Fresh coral and the ripe bimba fruit are the two standards of red, and her lips leave both of them behind.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose lips shame the beauty of new coral and the bimba fruit",
      vigraha: "navavidrumabimbaśrīnyakkāri radanacchadaṃ yasyāḥ sā",
      children: [
        {
          iast: "navavidrumabimbaśrīnyakkārin",
          type: "tatpuruṣa",
          gloss: "humbling the loveliness of fresh coral and the bimba fruit",
          vigraha: "navavidrumabimbaśriyo nyakkārī",
          children: [
            {
              iast: "navavidrumabimbaśrī",
              type: "tatpuruṣa",
              gloss: "the beauty of new coral and of the bimba fruit",
              vigraha: "navavidrumabimbayoḥ śrīḥ",
              children: [
                {
                  iast: "navavidrumabimba",
                  type: "dvandva",
                  gloss: "fresh coral and the bimba fruit",
                  vigraha: "navavidrumaś ca bimbaṃ ca",
                  children: [
                    {
                      iast: "navavidruma",
                      type: "karmadhāraya",
                      gloss: "newly formed coral",
                      vigraha: "navaś cāsau vidrumaś ca",
                      children: [
                        ["nava", "new, fresh"],
                        ["vidruma", "coral"],
                      ],
                    },
                    ["bimba", "the scarlet fruit of the bimba creeper"],
                  ],
                },
                ["śrī", "beauty, splendour"],
              ],
            },
            ["nyakkārin", "bringing low, putting to shame"],
          ],
        },
        {
          iast: "radanacchada",
          type: "tatpuruṣa",
          gloss: "the cover of the teeth, the lip",
          vigraha: "radanānāṃ chadaḥ",
          children: [
            ["radana", "tooth"],
            ["chada", "a cover, covering"],
          ],
        },
      ],
    },
  },

  25: {
    gloss: "Whose Teeth Are Sprouts Of Pure Knowledge",
    translation:
      "Her two rows of teeth gleam like the first shoots of the pure knowledge that her own mantra plants in a seeker.",
    compound: {
      type: "tatpuruṣa",
      gloss: "shining with two rows of teeth shaped like shoots of pure knowledge",
      vigraha: "śuddhavidyāṅkurākāreṇa dvijapaṅktidvayena ujjvalā",
      children: [
        {
          iast: "śuddhavidyāṅkurākāradvijapaṅktidvaya",
          type: "karmadhāraya",
          gloss: "the two rows of teeth having the form of sprouts of pure knowledge",
          vigraha: "śuddhavidyāṅkurākāraṃ ca tad dvijapaṅktidvayaṃ ca",
          children: [
            {
              iast: "śuddhavidyāṅkurākāra",
              type: "bahuvrīhi",
              gloss: "having the shape of a shoot of pure knowledge",
              vigraha: "śuddhavidyāṅkurasya ākāra iva ākāro yasya tat",
              children: [
                {
                  iast: "śuddhavidyāṅkura",
                  type: "tatpuruṣa",
                  gloss: "the sprout of pure knowledge",
                  vigraha: "śuddhavidyāyā aṅkuraḥ",
                  children: [
                    {
                      iast: "śuddhavidyā",
                      type: "karmadhāraya",
                      gloss: "unmixed knowledge",
                      vigraha: "śuddhā cāsau vidyā ca",
                      children: [
                        ["śuddha", "clean, pure, unmixed"],
                        ["vidyā", "knowledge, sacred learning, a mantra"],
                      ],
                    },
                    ["aṅkura", "a sprout, shoot, first blade"],
                  ],
                },
                ["ākāra", "form, shape"],
              ],
            },
            {
              iast: "dvijapaṅktidvaya",
              type: "tatpuruṣa",
              gloss: "the pair of rows of teeth",
              vigraha: "dvijapaṅktyor dvayam",
              children: [
                {
                  iast: "dvijapaṅkti",
                  type: "tatpuruṣa",
                  gloss: "a row of teeth",
                  vigraha: "dvijānāṃ paṅktiḥ",
                  children: [
                    ["dvija", "the twice-born; a tooth, since it grows a second time"],
                    ["paṅkti", "row, line, series"],
                  ],
                },
                ["dvaya", "a pair, twofold set"],
              ],
            },
          ],
        },
        ["ujjvala", "blazing, brilliant, lustrous"],
      ],
    },
  },

  26: {
    gloss: "Whose Camphor Betel Scents The Quarters",
    translation:
      "The perfume of the camphor-sweetened betel she chews travels outward until the whole space between the directions is full of it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose surrounding quarters are pervaded by the fragrance of her camphor betel",
      vigraha: "karpūravīṭikāmodasamākarṣi digantaraṃ yasyāḥ sā",
      children: [
        {
          iast: "karpūravīṭikāmodasamākarṣin",
          type: "tatpuruṣa",
          gloss: "spreading far the fragrance of a camphor betel roll",
          vigraha: "karpūravīṭikāmodena samākarṣi",
          children: [
            {
              iast: "karpūravīṭikāmoda",
              type: "tatpuruṣa",
              gloss: "the fragrance of the camphor betel roll",
              vigraha: "karpūravīṭikāyā āmodaḥ",
              children: [
                {
                  iast: "karpūravīṭikā",
                  type: "karmadhāraya",
                  gloss: "a betel roll scented with camphor",
                  vigraha: "karpūrayuktā vīṭikā",
                  children: [
                    ["karpūra", "camphor"],
                    ["vīṭikā", "a rolled quid of betel leaf"],
                  ],
                },
                ["āmoda", "a diffusive perfume, strong fragrance"],
              ],
            },
            ["samākarṣin", "drawing far, spreading, diffusing fragrance"],
          ],
        },
        {
          iast: "digantara",
          type: "tatpuruṣa",
          gloss: "the space lying between the quarters of the sky",
          vigraha: "diśām antaram",
          children: [
            ["diś", "quarter of the sky, direction"],
            ["antara", "the space between, interval, interior"],
          ],
        },
      ],
    },
  },

  27: {
    gloss: "Whose Speech Outsings The Lute",
    translation:
      "The sweetness of her ordinary conversation silences the kacchapī lute, which had until then been the standard of sweet sound.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whom the kacchapī lute is put to shame through the sweetness of her speech",
      vigraha: "nijasallāpamādhuryeṇa vinirbhartsitā kacchapī yayā sā",
      children: [
        {
          iast: "nijasallāpamādhuryavinirbhartsita",
          type: "tatpuruṣa",
          gloss: "rebuked by the sweetness of her own speech",
          vigraha: "nijasallāpamādhuryeṇa vinirbhartsitā",
          children: [
            {
              iast: "nijasallāpamādhurya",
              type: "tatpuruṣa",
              gloss: "the sweetness of her own conversation",
              vigraha: "nijasallāpasya mādhuryam",
              children: [
                {
                  iast: "nijasallāpa",
                  type: "karmadhāraya",
                  gloss: "her own talk",
                  vigraha: "nijaś cāsau sallāpaś ca",
                  children: [
                    ["nija", "one's own, innate"],
                    ["sallāpa", "conversation, familiar talk"],
                  ],
                },
                ["mādhurya", "sweetness, charm"],
              ],
            },
            ["vinirbhartsita", "reproached, put to shame, outdone"],
          ],
        },
        ["kacchapī", "a lute so named for its tortoise-shaped body"],
      ],
    },
  },

  28: {
    gloss: "In Whose Smile Kāmeśa's Mind Is Drowned",
    translation:
      "Light spills from her faint smile in such quantity that the mind of her consort sinks and is lost in it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in the flood of whose gentle smile the mind of Kāmeśa lies submerged",
      vigraha: "mandasmitaprabhāpūre majjat kāmeśamānasaṃ yasyāḥ sā",
      children: [
        {
          iast: "mandasmitaprabhāpūramajjat",
          type: "tatpuruṣa",
          gloss: "sinking in the flood of light from a soft smile",
          vigraha: "mandasmitaprabhāpūre majjat",
          children: [
            {
              iast: "mandasmitaprabhāpūra",
              type: "tatpuruṣa",
              gloss: "the flood of radiance of her gentle smile",
              vigraha: "mandasmitasya prabhāyāḥ pūraḥ",
              children: [
                {
                  iast: "mandasmita",
                  type: "karmadhāraya",
                  gloss: "a slight, soft smile",
                  vigraha: "mandaṃ ca tat smitaṃ ca",
                  children: [
                    ["manda", "slow, slight, gentle"],
                    ["smita", "a smile, a gentle laugh"],
                  ],
                },
                ["prabhā", "light, radiance"],
                ["pūra", "flood, swelling stream"],
              ],
            },
            ["majjat", "sinking, being submerged"],
          ],
        },
        {
          iast: "kāmeśamānasa",
          type: "tatpuruṣa",
          gloss: "the mind of the lord of desire",
          vigraha: "kāmeśasya mānasam",
          children: [
            {
              iast: "kāmeśa",
              type: "tatpuruṣa",
              gloss: "lord of desire, Śiva as her consort",
              vigraha: "kāmānām īśaḥ",
              children: [
                ["kāma", "desire, love"],
                ["īśa", "lord, master"],
              ],
            },
            ["mānasa", "the mind, that which belongs to the mind"],
          ],
        },
      ],
    },
  },

  29: {
    gloss: "Whose Chin Has No Equal",
    translation:
      "Poets looking for something to compare her chin to have never found one, and she shines all the more for that failure.",
    compound: {
      type: "tatpuruṣa",
      gloss: "made resplendent by the beauty of a chin for which no likeness has been found",
      vigraha: "anākalitasādṛśyayā cibukaśriyā virājitā",
      children: [
        {
          iast: "anākalitasādṛśyacibukaśrī",
          type: "karmadhāraya",
          gloss: "the beauty of a chin whose equal was never met with",
          vigraha: "anākalitasādṛśyā cāsau cibukaśrīś ca",
          children: [
            {
              iast: "anākalitasādṛśya",
              type: "bahuvrīhi",
              gloss: "whose likeness has never been grasped",
              vigraha: "anākalitaṃ sādṛśyaṃ yasyāḥ sā",
              children: [
                ["anākalita", "not grasped, never ascertained"],
                ["sādṛśya", "likeness, resemblance"],
              ],
            },
            {
              iast: "cibukaśrī",
              type: "tatpuruṣa",
              gloss: "the loveliness of the chin",
              vigraha: "cibukasya śrīḥ",
              children: [
                ["cibuka", "chin"],
                ["śrī", "beauty, splendour"],
              ],
            },
          ],
        },
        ["virājita", "made resplendent, rendered brilliant"],
      ],
    },
  },

  30: {
    gloss: "Whose Neck Wears Kāmeśa's Marriage Thread",
    translation:
      "The auspicious cord her husband knotted at her throat is the one ornament that outshines everything else she wears.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose neck is graced by the marriage cord tied by Kāmeśa",
      vigraha: "kāmeśabaddhamāṅgalyasūtraśobhitā kandharā yasyāḥ sā",
      children: [
        {
          iast: "kāmeśabaddhamāṅgalyasūtraśobhita",
          type: "tatpuruṣa",
          gloss: "graced by the auspicious thread fastened by Kāmeśa",
          vigraha: "kāmeśabaddhena māṅgalyasūtreṇa śobhitā",
          children: [
            {
              iast: "kāmeśabaddhamāṅgalyasūtra",
              type: "karmadhāraya",
              gloss: "the marriage cord tied on by Kāmeśa",
              vigraha: "kāmeśabaddhaṃ ca tan māṅgalyasūtraṃ ca",
              children: [
                {
                  iast: "kāmeśabaddha",
                  type: "tatpuruṣa",
                  gloss: "fastened by the lord of desire",
                  vigraha: "kāmeśena baddham",
                  children: [
                    ["kāmeśa", "lord of desire, Śiva as her consort"],
                    ["baddha", "bound, tied, fastened"],
                  ],
                },
                {
                  iast: "māṅgalyasūtra",
                  type: "karmadhāraya",
                  gloss: "the auspicious cord of marriage",
                  vigraha: "māṅgalyaṃ ca tat sūtraṃ ca",
                  children: [
                    ["māṅgalya", "auspicious, conferring good fortune"],
                    ["sūtra", "thread, cord, string"],
                  ],
                },
              ],
            },
            ["śobhita", "made beautiful, graced"],
          ],
        },
        ["kandharā", "the neck"],
      ],
    },
  },

  31: {
    gloss: "Whose Arms Wear Golden Armlets",
    translation:
      "Bands and bracelets of gold circle her upper arms and make their curve still more lovely.",
    compound: {
      type: "tatpuruṣa",
      gloss: "endowed with arms made lovely by golden armlets and bracelets",
      vigraha: "kanakāṅgadakeyūrakamanīyair bhujaiḥ anvitā",
      children: [
        {
          iast: "kanakāṅgadakeyūrakamanīyabhuja",
          type: "karmadhāraya",
          gloss: "arms lovely with armlets and bracelets of gold",
          vigraha: "kanakāṅgadakeyūrakamanīyaś cāsau bhujaś ca",
          children: [
            {
              iast: "kanakāṅgadakeyūrakamanīya",
              type: "tatpuruṣa",
              gloss: "made lovely by golden armlets and bracelets",
              vigraha: "kanakāṅgadakeyūrābhyāṃ kamanīyaḥ",
              children: [
                {
                  iast: "kanakāṅgadakeyūra",
                  type: "karmadhāraya",
                  gloss: "armlet and bracelet of gold",
                  vigraha: "kanakamayāv aṅgadakeyūrau",
                  children: [
                    ["kanaka", "gold"],
                    {
                      iast: "aṅgadakeyūra",
                      type: "dvandva",
                      gloss: "the armlet and the upper-arm bracelet",
                      vigraha: "aṅgadaṃ ca keyūraṃ ca",
                      children: [
                        ["aṅgada", "a bracelet worn on the upper arm"],
                        ["keyūra", "an armlet worn above the elbow"],
                      ],
                    },
                  ],
                },
                ["kamanīya", "desirable, lovely, pleasing"],
              ],
            },
            ["bhuja", "arm"],
          ],
        },
        ["anvita", "joined with, endowed with, possessed of"],
      ],
    },
  },

  32: {
    gloss: "Wearing Jewelled Necklace And Pearls",
    translation:
      "A necklace of gems with its pendant hangs at her throat, and strings of pearls swing loosely below it.",
    note: "cintāka, a pendant hung from a necklace, is not among the headwords of Monier-Williams; the sense is taken from its use in ornament lists of this kind.",
    compound: {
      type: "tatpuruṣa",
      gloss: "furnished with a jewelled neck-pendant and swaying pearls",
      vigraha: "ratnagraiveyacintākalolamuktāphalair anvitā",
      children: [
        {
          iast: "ratnagraiveyacintākalolamuktāphala",
          type: "dvandva",
          gloss: "the pendant of a jewelled necklace, and swinging pearls",
          vigraha: "ratnagraiveyacintākaś ca lolamuktāphalāni ca",
          children: [
            {
              iast: "ratnagraiveyacintāka",
              type: "tatpuruṣa",
              gloss: "the pendant of a necklace of gems",
              vigraha: "ratnagraiveyasya cintākaḥ",
              children: [
                {
                  iast: "ratnagraiveya",
                  type: "karmadhāraya",
                  gloss: "a neck-chain made of jewels",
                  vigraha: "ratnamayaṃ graiveyam",
                  children: [
                    ["ratna", "jewel, gem, precious thing"],
                    ["graiveya", "a necklace, an ornament for the throat"],
                  ],
                },
                ["cintāka", "a pendant hung from a necklace"],
              ],
            },
            {
              iast: "lolamuktāphala",
              type: "karmadhāraya",
              gloss: "swinging pearls",
              vigraha: "lolaṃ ca tan muktāphalaṃ ca",
              children: [
                ["lola", "moving to and fro, swinging, restless"],
                {
                  iast: "muktāphala",
                  type: "tatpuruṣa",
                  gloss: "a pearl",
                  vigraha: "muktāyāḥ phalam",
                  children: [
                    ["muktā", "a pearl"],
                    ["phala", "fruit"],
                  ],
                },
              ],
            },
          ],
        },
        ["anvita", "joined with, endowed with"],
      ],
    },
  },

  33: {
    gloss: "Whose Breasts Bought Kāmeśvara's Love",
    translation:
      "Her breasts are the counter-stake she laid down in exchange for the jewel that is her husband's love, and the bargain was an even one.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose breasts are the price paid for the gem of Kāmeśvara's love",
      vigraha: "kāmeśvarapremaratnamaṇipratipaṇau stanau yasyāḥ sā",
      children: [
        {
          iast: "kāmeśvarapremaratnamaṇipratipaṇa",
          type: "tatpuruṣa",
          gloss: "the counter-stake for the jewel of Kāmeśvara's love",
          vigraha: "kāmeśvarapremaratnamaṇeḥ pratipaṇaḥ",
          children: [
            {
              iast: "kāmeśvarapremaratnamaṇi",
              type: "tatpuruṣa",
              gloss: "the precious gem that is the love of Kāmeśvara",
              vigraha: "kāmeśvarapremṇo ratnamaṇiḥ",
              children: [
                {
                  iast: "kāmeśvaraprema",
                  type: "tatpuruṣa",
                  gloss: "the love of the lord of desire",
                  vigraha: "kāmeśvarasya prema",
                  children: [
                    {
                      iast: "kāmeśvara",
                      type: "tatpuruṣa",
                      gloss: "lord of desire",
                      vigraha: "kāmānām īśvaraḥ",
                      children: [
                        ["kāma", "desire, love"],
                        ["īśvara", "lord, master"],
                      ],
                    },
                    ["preman", "love, affection"],
                  ],
                },
                {
                  iast: "ratnamaṇi",
                  type: "karmadhāraya",
                  gloss: "a precious gem",
                  vigraha: "ratnaṃ ca tan maṇiś ca",
                  children: [
                    ["ratna", "jewel, treasure"],
                    ["maṇi", "gem, bead"],
                  ],
                },
              ],
            },
            ["pratipaṇa", "the stake laid against another's, the price in an exchange"],
          ],
        },
        ["stana", "breast"],
      ],
    },
  },

  34: {
    gloss: "Whose Navel Is The Watering Basin",
    translation:
      "Her navel is the hollow dug round a root, the line of down above it is the creeper, and her two breasts are the fruit that creeper bears.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose navel is the basin, whose line of down is the creeper, and whose breasts are its fruit",
      vigraha: "nābhyālavāle romālilatāyāḥ phalabhūtaṃ kucadvayaṃ yasyāḥ sā",
      children: [
        {
          iast: "nābhyālavāla",
          type: "karmadhāraya",
          gloss: "the navel that serves as a watering basin",
          vigraha: "nābhir eva ālavālam",
          children: [
            ["nābhi", "navel"],
            ["ālavāla", "the basin hollowed out round the root of a tree"],
          ],
        },
        {
          iast: "romālilatā",
          type: "karmadhāraya",
          gloss: "the creeper that is the line of down",
          vigraha: "romālir eva latā",
          children: [
            {
              iast: "romāli",
              type: "tatpuruṣa",
              gloss: "the line of fine body hair",
              vigraha: "romṇām āliḥ",
              children: [
                ["roman", "the hair of the body, down"],
                ["āli", "a row, a continuous line"],
              ],
            },
            ["latā", "a creeper, a slender climbing plant"],
          ],
        },
        {
          iast: "phalakucadvaya",
          type: "karmadhāraya",
          gloss: "the pair of breasts that are its fruit",
          vigraha: "phalabhūtaṃ kucadvayam",
          children: [
            ["phala", "fruit"],
            {
              iast: "kucadvaya",
              type: "tatpuruṣa",
              gloss: "the pair of breasts",
              vigraha: "kucayor dvayam",
              children: [
                ["kuca", "the female breast"],
                ["dvaya", "a pair"],
              ],
            },
          ],
        },
      ],
    },
  },

  35: {
    gloss: "Whose Waist Is Known Only By Inference",
    translation:
      "Her waist is too slender to be seen directly, and one knows it is there only because the visible line of down must be growing on something.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose waist is inferred from its being the support of the visible line of down",
      vigraha: "lakṣyaromalatādhāratayā samunneyā madhyamā yasyāḥ sā",
      children: [
        {
          iast: "lakṣyaromalatādhāratāsamunneya",
          type: "tatpuruṣa",
          gloss: "to be deduced from bearing the visible creeper of down",
          vigraha: "lakṣyaromalatādhāratayā samunneyā",
          children: [
            {
              iast: "lakṣyaromalatādhāratā",
              type: "tatpuruṣa",
              gloss: "the fact of supporting the perceptible creeper of down",
              vigraha: "lakṣyaromalatāyā ādhāratā",
              children: [
                {
                  iast: "lakṣyaromalatā",
                  type: "karmadhāraya",
                  gloss: "the visible creeper of body hair",
                  vigraha: "lakṣyā cāsau romalatā ca",
                  children: [
                    ["lakṣya", "perceptible, able to be observed"],
                    {
                      iast: "romalatā",
                      type: "karmadhāraya",
                      gloss: "the creeper that is the line of down",
                      vigraha: "roma eva latā",
                      children: [
                        ["roman", "the hair of the body, down"],
                        ["latā", "creeper, climbing plant"],
                      ],
                    },
                  ],
                },
                ["ādhāratā", "the condition of being a support"],
              ],
            },
            ["samunneya", "to be inferred, to be deduced"],
          ],
        },
        ["madhyama", "the middle part of the body, the waist"],
      ],
    },
  },

  36: {
    gloss: "Whose Three Waist Folds Are A Binding Band",
    translation:
      "Her middle looks ready to give way under the weight of her breasts, and the three folds across it hold it like a bandage tied round.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose three waist-folds bind a middle breaking beneath the weight of her breasts",
      vigraha: "stanabhāradalato madhyasya paṭṭabandha iva valitrayaṃ yasyāḥ sā",
      children: [
        {
          iast: "stanabhāradalanmadhyapaṭṭabandha",
          type: "tatpuruṣa",
          gloss: "a binding band for a waist giving way under the weight of the breasts",
          vigraha: "stanabhāradalanmadhyasya paṭṭabandhaḥ",
          children: [
            {
              iast: "stanabhāradalanmadhya",
              type: "karmadhāraya",
              gloss: "the waist that splits under the weight of the breasts",
              vigraha: "stanabhāradalaṃś cāsau madhyaś ca",
              children: [
                {
                  iast: "stanabhāradalat",
                  type: "tatpuruṣa",
                  gloss: "breaking under the burden of the breasts",
                  vigraha: "stanabhāreṇa dalat",
                  children: [
                    {
                      iast: "stanabhāra",
                      type: "tatpuruṣa",
                      gloss: "the weight of the breasts",
                      vigraha: "stanayor bhāraḥ",
                      children: [
                        ["stana", "breast"],
                        ["bhāra", "burden, weight, load"],
                      ],
                    },
                    ["dalat", "splitting, bursting, giving way"],
                  ],
                },
                ["madhya", "the middle, the waist"],
              ],
            },
            {
              iast: "paṭṭabandha",
              type: "tatpuruṣa",
              gloss: "a binding of cloth, a bandage",
              vigraha: "paṭṭasya bandhaḥ",
              children: [
                ["paṭṭa", "a strip of cloth, band, fillet"],
                ["bandha", "a tying, bond, ligature"],
              ],
            },
          ],
        },
        {
          iast: "valitraya",
          type: "dvigu",
          gloss: "the three folds of the skin",
          vigraha: "valīnāṃ trayam",
          children: [
            ["vali", "a fold of the skin, wrinkle"],
            ["traya", "a triad, a set of three"],
          ],
        },
      ],
    },
  },

  37: {
    gloss: "Whose Hips Blaze In Safflower Red",
    translation:
      "A cloth dyed with safflower, red as the sky at sunrise, catches the light along the slope of her hips.",
    note: "The doubling in aruṇāruṇa is intensive rather than a true pair of members; it is analysed here as a comparison, dawn-red set against red.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose hips shine with a garment dyed dawn-red with safflower",
      vigraha: "aruṇāruṇakausumbhavastrabhāsvatī kaṭītaṭī yasyāḥ sā",
      children: [
        {
          iast: "aruṇāruṇakausumbhavastrabhāsvat",
          type: "tatpuruṣa",
          gloss: "shining with a safflower cloth as red as the dawn",
          vigraha: "aruṇāruṇakausumbhavastreṇa bhāsvat",
          children: [
            {
              iast: "aruṇāruṇakausumbhavastra",
              type: "karmadhāraya",
              gloss: "the safflower-dyed cloth, red as the dawn",
              vigraha: "aruṇāruṇaṃ ca tat kausumbhavastraṃ ca",
              children: [
                {
                  iast: "aruṇāruṇa",
                  type: "karmadhāraya",
                  gloss: "red with the very redness of dawn",
                  vigraha: "aruṇa iva aruṇaḥ",
                  children: [
                    ["aruṇa", "the dawn, the reddening sky before sunrise"],
                    ["aruṇa", "reddish, ruddy, tawny"],
                  ],
                },
                {
                  iast: "kausumbhavastra",
                  type: "karmadhāraya",
                  gloss: "cloth dyed with safflower",
                  vigraha: "kausumbhaṃ ca tad vastraṃ ca",
                  children: [
                    ["kausumbha", "dyed with safflower, orange-red"],
                    ["vastra", "cloth, garment"],
                  ],
                },
              ],
            },
            ["bhāsvat", "luminous, shining"],
          ],
        },
        {
          iast: "kaṭītaṭī",
          type: "tatpuruṣa",
          gloss: "the slope of the hips",
          vigraha: "kaṭyās taṭī",
          children: [
            ["kaṭi", "the hip, the loins"],
            ["taṭī", "a slope, bank, declivity"],
          ],
        },
      ],
    },
  },

  38: {
    gloss: "Adorned With A Belt Of Jewelled Bells",
    translation:
      "The cord about her waist carries small bells set with gems, so that her every movement is announced before it is seen.",
    compound: {
      type: "tatpuruṣa",
      gloss: "decked with a girdle cord delightful with jewelled bells",
      vigraha: "ratnakiṅkiṇikāramyeṇa raśanādāmnā bhūṣitā",
      children: [
        {
          iast: "ratnakiṅkiṇikāramyaraśanādāman",
          type: "karmadhāraya",
          gloss: "the girdle cord made delightful by jewelled bells",
          vigraha: "ratnakiṅkiṇikāramyaṃ ca tad raśanādāma ca",
          children: [
            {
              iast: "ratnakiṅkiṇikāramya",
              type: "tatpuruṣa",
              gloss: "delightful with little bells of jewels",
              vigraha: "ratnakiṅkiṇikābhī ramyam",
              children: [
                {
                  iast: "ratnakiṅkiṇikā",
                  type: "karmadhāraya",
                  gloss: "a small bell made of jewels",
                  vigraha: "ratnamayī kiṅkiṇikā",
                  children: [
                    ["ratna", "jewel, gem"],
                    ["kiṅkiṇikā", "a small tinkling bell"],
                  ],
                },
                ["ramya", "delightful, pleasing"],
              ],
            },
            {
              iast: "raśanādāman",
              type: "tatpuruṣa",
              gloss: "the cord of the waist-girdle",
              vigraha: "raśanāyā dāma",
              children: [
                ["raśanā", "a girdle, a woman's waist-band"],
                ["dāman", "cord, string, wreath"],
              ],
            },
          ],
        },
        ["bhūṣita", "adorned, decorated"],
      ],
    },
  },

  39: {
    gloss: "Whose Thighs Only Kāmeśa Knows",
    translation:
      "The beauty and softness of her thighs are a thing known to her husband alone, and to no other witness.",
    compound: {
      type: "tatpuruṣa",
      gloss: "endowed with a pair of thighs whose grace and softness Kāmeśa alone has known",
      vigraha: "kāmeśajñātasaubhāgyamārdavena ūrudvayena anvitā",
      children: [
        {
          iast: "kāmeśajñātasaubhāgyamārdavorudvaya",
          type: "bahuvrīhi",
          gloss: "the two thighs whose loveliness and softness are known to Kāmeśa",
          vigraha: "kāmeśajñāte saubhāgyamārdave yasya tad ūrudvayam",
          children: [
            {
              iast: "kāmeśajñātasaubhāgyamārdava",
              type: "karmadhāraya",
              gloss: "grace and softness known to the lord of desire",
              vigraha: "kāmeśajñāte ca te saubhāgyamārdave ca",
              children: [
                {
                  iast: "kāmeśajñāta",
                  type: "tatpuruṣa",
                  gloss: "known to Kāmeśa",
                  vigraha: "kāmeśena jñātam",
                  children: [
                    ["kāmeśa", "lord of desire, Śiva as her consort"],
                    ["jñāta", "known, understood"],
                  ],
                },
                {
                  iast: "saubhāgyamārdava",
                  type: "dvandva",
                  gloss: "loveliness and softness",
                  vigraha: "saubhāgyaṃ ca mārdavaṃ ca",
                  children: [
                    ["saubhāgya", "grace, charm, good fortune"],
                    ["mārdava", "softness, pliancy, gentleness"],
                  ],
                },
              ],
            },
            {
              iast: "ūrudvaya",
              type: "tatpuruṣa",
              gloss: "the pair of thighs",
              vigraha: "ūrvor dvayam",
              children: [
                ["ūru", "thigh"],
                ["dvaya", "a pair"],
              ],
            },
          ],
        },
        ["anvita", "endowed with, accompanied by"],
      ],
    },
  },

  40: {
    gloss: "Whose Knees Are Crowns Of Ruby",
    translation:
      "Her two knees are rounded and glowing, shaped like a pair of crowns cut out of ruby.",
    compound: {
      type: "tatpuruṣa",
      gloss: "resplendent with two knees shaped like ruby diadems",
      vigraha: "māṇikyamukuṭākāreṇa jānudvayena virājitā",
      children: [
        {
          iast: "māṇikyamukuṭākārajānudvaya",
          type: "karmadhāraya",
          gloss: "the pair of knees having the shape of ruby crowns",
          vigraha: "māṇikyamukuṭākāraṃ ca taj jānudvayaṃ ca",
          children: [
            {
              iast: "māṇikyamukuṭākāra",
              type: "bahuvrīhi",
              gloss: "having the form of a crown of ruby",
              vigraha: "māṇikyamukuṭasya ākāra iva ākāro yasya tat",
              children: [
                {
                  iast: "māṇikyamukuṭa",
                  type: "karmadhāraya",
                  gloss: "a diadem made of ruby",
                  vigraha: "māṇikyamayaṃ mukuṭam",
                  children: [
                    ["māṇikya", "ruby"],
                    ["mukuṭa", "crown, tiara, diadem"],
                  ],
                },
                ["ākāra", "form, shape"],
              ],
            },
            {
              iast: "jānudvaya",
              type: "tatpuruṣa",
              gloss: "the pair of knees",
              vigraha: "jānvor dvayam",
              children: [
                ["jānu", "knee"],
                ["dvaya", "a pair"],
              ],
            },
          ],
        },
        ["virājita", "made resplendent, rendered brilliant"],
      ],
    },
  },

  41: {
    gloss: "Whose Shanks Are Love's Quivers",
    translation:
      "Her calves taper like the quivers of the god of love, scattered over with the small scarlet insects that appear with the rains.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose shanks resemble Love's quivers strewn with cochineal insects",
      vigraha: "indragopaparikṣiptasmaratūṇābhe jaṅghike yasyāḥ sā",
      children: [
        {
          iast: "indragopaparikṣiptasmaratūṇābha",
          type: "bahuvrīhi",
          gloss: "resembling a quiver of Love scattered over with cochineal insects",
          vigraha: "indragopaparikṣiptasmaratūṇasya ābheva ābhā yayos te",
          children: [
            {
              iast: "indragopaparikṣiptasmaratūṇa",
              type: "karmadhāraya",
              gloss: "Love's quiver strewn with scarlet insects",
              vigraha: "indragopaparikṣiptaś cāsau smaratūṇaś ca",
              children: [
                {
                  iast: "indragopaparikṣipta",
                  type: "tatpuruṣa",
                  gloss: "scattered over with cochineal insects",
                  vigraha: "indragopaiḥ parikṣiptaḥ",
                  children: [
                    ["indragopa", "the cochineal insect, a small bright red insect of the rains"],
                    ["parikṣipta", "thrown about, scattered over, surrounded"],
                  ],
                },
                {
                  iast: "smaratūṇa",
                  type: "tatpuruṣa",
                  gloss: "the quiver of the god of love",
                  vigraha: "smarasya tūṇaḥ",
                  children: [
                    ["smara", "Kāma, the god of love"],
                    ["tūṇa", "quiver"],
                  ],
                },
              ],
            },
            ["ābha", "resembling, having the appearance of"],
          ],
        },
        ["jaṅghikā", "the shank, the leg between ankle and knee"],
      ],
    },
  },

  42: {
    gloss: "Whose Ankles Are Hidden",
    translation:
      "Her ankle bones do not stand out at all, the sign of a body finished with perfect proportion.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose ankles are concealed",
      vigraha: "gūḍhau gulphau yasyāḥ sā",
      children: [
        ["gūḍha", "covered, hidden, not apparent"],
        ["gulpha", "ankle"],
      ],
    },
  },

  43: {
    gloss: "Whose Insteps Outdo The Tortoise Shell",
    translation:
      "The arch of her foot rises with a curve smoother and more perfect than the domed back of a tortoise.",
    compound: {
      type: "tatpuruṣa",
      gloss: "endowed with insteps that surpass the back of a tortoise",
      vigraha: "kūrmapṛṣṭhajayiṣṇunā prapadena anvitā",
      children: [
        {
          iast: "kūrmapṛṣṭhajayiṣṇuprapada",
          type: "karmadhāraya",
          gloss: "the instep that vanquishes the tortoise's shell",
          vigraha: "kūrmapṛṣṭhajayiṣṇu ca tat prapadaṃ ca",
          children: [
            {
              iast: "kūrmapṛṣṭhajayiṣṇu",
              type: "tatpuruṣa",
              gloss: "conquering the back of a tortoise",
              vigraha: "kūrmapṛṣṭhaṃ jayiṣṇu",
              children: [
                {
                  iast: "kūrmapṛṣṭha",
                  type: "tatpuruṣa",
                  gloss: "the back of a tortoise",
                  vigraha: "kūrmasya pṛṣṭham",
                  children: [
                    ["kūrma", "tortoise, turtle"],
                    ["pṛṣṭha", "the back, the rounded upper surface"],
                  ],
                },
                ["jayiṣṇu", "victorious, overcoming"],
              ],
            },
            ["prapada", "the fore part of the foot, the instep and toes"],
          ],
        },
        ["anvita", "endowed with, furnished with"],
      ],
    },
  },

  44: {
    gloss: "Whose Toenails Dispel The Dark In Us",
    translation:
      "The light thrown off by her toenails falls over those who bow at her feet and buries the dullness in them out of sight.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whose nail-radiance the darkness of those who bow is covered over",
      vigraha: "nakhadīdhitisañchanno namajjanatamoguṇo yasyāḥ sā",
      children: [
        {
          iast: "nakhadīdhitisañchanna",
          type: "tatpuruṣa",
          gloss: "covered over by the brilliance of her nails",
          vigraha: "nakhadīdhitibhiḥ sañchannaḥ",
          children: [
            {
              iast: "nakhadīdhiti",
              type: "tatpuruṣa",
              gloss: "the radiance of the nails",
              vigraha: "nakhānāṃ dīdhitiḥ",
              children: [
                ["nakha", "nail of the finger or toe"],
                ["dīdhiti", "brightness, splendour, a ray"],
              ],
            },
            ["sañchanna", "wholly covered, concealed"],
          ],
        },
        {
          iast: "namajjanatamoguṇa",
          type: "tatpuruṣa",
          gloss: "the dark quality in those who bow before her",
          vigraha: "namajjanānāṃ tamoguṇaḥ",
          children: [
            {
              iast: "namajjana",
              type: "karmadhāraya",
              gloss: "people who bow down",
              vigraha: "naman jana eva",
              children: [
                ["namat", "bowing, bending down"],
                ["jana", "a person, people"],
              ],
            },
            {
              iast: "tamoguṇa",
              type: "karmadhāraya",
              gloss: "the strand of darkness and inertia",
              vigraha: "tama eva guṇaḥ",
              children: [
                ["tamas", "darkness, gloom, mental dullness"],
                ["guṇa", "a strand, one of the three constituents of nature"],
              ],
            },
          ],
        },
      ],
    },
  },

  45: {
    gloss: "Whose Feet Put Lotuses To Flight",
    translation:
      "So much light comes off her two feet that the lotus, the usual measure of a beautiful foot, is simply set aside.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whose feet's web of light the lotus is driven from the field",
      vigraha: "padadvayaprabhājālaparākṛtaṃ saroruhaṃ yasyāḥ sā",
      children: [
        {
          iast: "padadvayaprabhājālaparākṛta",
          type: "tatpuruṣa",
          gloss: "set aside by the mesh of radiance from her two feet",
          vigraha: "padadvayaprabhājālena parākṛtam",
          children: [
            {
              iast: "padadvayaprabhājāla",
              type: "tatpuruṣa",
              gloss: "the net of light thrown out by her two feet",
              vigraha: "padadvayasya prabhājālam",
              children: [
                {
                  iast: "padadvaya",
                  type: "tatpuruṣa",
                  gloss: "the pair of feet",
                  vigraha: "padayor dvayam",
                  children: [
                    ["pada", "foot, step"],
                    ["dvaya", "a pair"],
                  ],
                },
                {
                  iast: "prabhājāla",
                  type: "tatpuruṣa",
                  gloss: "a net or mass of radiance",
                  vigraha: "prabhāyā jālam",
                  children: [
                    ["prabhā", "light, radiance"],
                    ["jāla", "a net, a woven mesh, a dense collection"],
                  ],
                },
              ],
            },
            ["parākṛta", "set aside, rejected, driven off"],
          ],
        },
        {
          iast: "saroruha",
          type: "tatpuruṣa",
          gloss: "the lotus, what grows in a pool",
          vigraha: "sarasi rohati iti",
          children: [
            ["saras", "a pool, lake"],
            ["ruha", "growing, rising out of"],
          ],
        },
      ],
    },
  },

  46: {
    gloss: "Whose Lotus Feet Wear Ringing Anklets",
    translation:
      "Jewelled anklets sound softly about her feet, and those feet open like lotuses wherever she sets them down.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose blessed lotus feet are adorned with tinkling jewelled anklets",
      vigraha: "śiñjānamaṇimañjīramaṇḍite śrīpadāmbuje yasyāḥ sā",
      children: [
        {
          iast: "śiñjānamaṇimañjīramaṇḍita",
          type: "tatpuruṣa",
          gloss: "adorned with tinkling anklets of gems",
          vigraha: "śiñjānamaṇimañjīreṇa maṇḍitam",
          children: [
            {
              iast: "śiñjānamaṇimañjīra",
              type: "karmadhāraya",
              gloss: "a jewelled anklet that jingles",
              vigraha: "śiñjānaṃ ca tan maṇimañjīraṃ ca",
              children: [
                ["śiñjāna", "tinkling, jingling"],
                {
                  iast: "maṇimañjīra",
                  type: "karmadhāraya",
                  gloss: "an anklet made of gems",
                  vigraha: "maṇimayaṃ mañjīram",
                  children: [
                    ["maṇi", "gem, jewel"],
                    ["mañjīra", "anklet, foot-ornament"],
                  ],
                },
              ],
            },
            ["maṇḍita", "adorned, decorated"],
          ],
        },
        {
          iast: "śrīpadāmbuja",
          type: "karmadhāraya",
          gloss: "her blessed lotus feet",
          vigraha: "śrīmac ca tat padāmbujaṃ ca",
          children: [
            ["śrī", "auspicious, blessed, glorious"],
            {
              iast: "padāmbuja",
              type: "karmadhāraya",
              gloss: "the foot that is a lotus",
              vigraha: "padam eva ambujam",
              children: [
                ["pada", "foot"],
                ["ambuja", "water-born, the lotus"],
              ],
            },
          ],
        },
      ],
    },
  },

  47: {
    gloss: "Who Walks With A Swan's Slow Grace",
    translation:
      "She moves without hurry, in the gliding unhurried manner of a swan crossing still water.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose unhurried gait is that of a female swan",
      vigraha: "marālyā iva mandagamanaṃ yasyāḥ sā",
      children: [
        ["marālī", "a female swan or flamingo"],
        {
          iast: "mandagamana",
          type: "karmadhāraya",
          gloss: "a slow, soft gait",
          vigraha: "mandaṃ ca tad gamanaṃ ca",
          children: [
            ["manda", "slow, gentle, unhurried"],
            ["gamana", "going, gait, manner of walking"],
          ],
        },
      ],
    },
  },

  48: {
    gloss: "The Treasury Of Great Loveliness",
    translation:
      "Beauty is not something she possesses in part; she is the hoard from which every instance of it is drawn.",
    gender: "masculine",
    note: "śevadhi is a masculine noun and keeps its own gender here, as the dative śevadhaye of the nāmāvalī confirms, even though the epithet refers to the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the treasure-store of great beauty",
      vigraha: "mahālāvaṇyasya śevadhiḥ",
      children: [
        {
          iast: "mahālāvaṇya",
          type: "karmadhāraya",
          gloss: "great loveliness",
          vigraha: "mahac ca tal lāvaṇyaṃ ca",
          children: [
            ["mahat", "great, abundant"],
            ["lāvaṇya", "beauty, charm; literally saltness, savour"],
          ],
        },
        ["śevadhi", "a treasure, a store of wealth"],
      ],
    },
  },

  49: {
    gloss: "Wholly Crimson",
    translation:
      "Every part of her is the same deep red, the colour of the sky just before the sun comes up.",
    compound: {
      type: "karmadhāraya",
      gloss: "red throughout",
      vigraha: "sarvā cāsāv aruṇā ca",
      children: [
        ["sarva", "all, whole, entire"],
        ["aruṇa", "reddish, ruddy, the colour of dawn"],
      ],
    },
  },

  50: {
    gloss: "Whose Body Is Without Flaw",
    translation:
      "There is no limb of hers that could be criticised, nothing added and nothing wanting.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose limbs are beyond reproach",
      vigraha: "anavadyāny aṅgāni yasyāḥ sā",
      children: [
        ["anavadya", "blameless, faultless, unobjectionable"],
        ["aṅga", "limb, member of the body"],
      ],
    },
  },

  51: {
    gloss: "Adorned With Every Ornament",
    translation:
      "There is no jewel she does not wear, and no ornament that is not made more valuable by being worn by her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "decked out with all the ornaments",
      vigraha: "sarvābharaṇair bhūṣitā",
      children: [
        {
          iast: "sarvābharaṇa",
          type: "karmadhāraya",
          gloss: "all the ornaments",
          vigraha: "sarvāṇi ca tāny ābharaṇāni ca",
          children: [
            ["sarva", "all, every"],
            ["ābharaṇa", "ornament, jewellery"],
          ],
        },
        ["bhūṣita", "adorned, decorated"],
      ],
    },
  },

  52: {
    gloss: "Seated On Śiva Kāmeśvara's Lap",
    translation:
      "Her place is on the lap of Śiva in his form as the lord of desire, the two of them making one seat between them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding on the lap of Śiva Kāmeśvara",
      vigraha: "śivakāmeśvarasya aṅke sthā",
      children: [
        {
          iast: "śivakāmeśvarāṅka",
          type: "tatpuruṣa",
          gloss: "the lap of Śiva the lord of desire",
          vigraha: "śivakāmeśvarasya aṅkaḥ",
          children: [
            {
              iast: "śivakāmeśvara",
              type: "karmadhāraya",
              gloss: "Śiva in the form of the lord of desire",
              vigraha: "śivaś cāsau kāmeśvaraś ca",
              children: [
                ["śiva", "the auspicious one, Śiva"],
                ["kāmeśvara", "lord of desire"],
              ],
            },
            ["aṅka", "lap, the hollow of the side"],
          ],
        },
        ["stha", "standing, seated, abiding in"],
      ],
    },
  },

  53: {
    gloss: "The Auspicious One",
    translation:
      "She is well-being itself, the consort of Śiva who carries his name in the feminine because she carries his nature.",
  },

  54: {
    gloss: "Whose Beloved Is Her Own",
    translation:
      "Her husband is entirely hers, held not by force but by an attachment he has no wish to break.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose beloved is under her own sway",
      vigraha: "svādhīno vallabho yasyāḥ sā",
      children: [
        {
          iast: "svādhīna",
          type: "bahuvrīhi",
          gloss: "subject to oneself, in one's own power",
          vigraha: "sva ātmā adhīno yasya saḥ",
          children: [
            ["sva", "one's own, self"],
            ["adhīna", "dependent on, subject to"],
          ],
        },
        ["vallabha", "beloved, favourite, husband"],
      ],
    },
  },

  55: {
    gloss: "Dwelling On Meru's Middle Peak",
    translation:
      "Of the three summits of the golden mountain she occupies the central one, the point on which the whole world is balanced.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding on the middle summit of Sumeru",
      vigraha: "sumeror madhyaśṛṅge sthā",
      children: [
        {
          iast: "sumerumadhyaśṛṅga",
          type: "tatpuruṣa",
          gloss: "the central peak of Sumeru",
          vigraha: "sumeror madhyaśṛṅgam",
          children: [
            {
              iast: "sumeru",
              type: "karmadhāraya",
              gloss: "the excellent Meru",
              vigraha: "śobhanaś cāsau meruś ca",
              children: [
                ["su", "good, excellent, well"],
                ["meru", "Meru, the golden world-mountain"],
              ],
            },
            {
              iast: "madhyaśṛṅga",
              type: "karmadhāraya",
              gloss: "the middle peak",
              vigraha: "madhyaṃ ca tac chṛṅgaṃ ca",
              children: [
                ["madhya", "middle, central"],
                ["śṛṅga", "peak, horn, summit"],
              ],
            },
          ],
        },
        ["stha", "standing, abiding in"],
      ],
    },
  },

  56: {
    gloss: "Lady Of The Resplendent City",
    translation:
      "The shining city built in tiers around her is hers to govern, and she is its presiding lady.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of the city of splendour",
      vigraha: "śrīmato nagarasya nāyikā",
      children: [
        {
          iast: "śrīmannagara",
          type: "karmadhāraya",
          gloss: "the city possessed of splendour",
          vigraha: "śrīmac ca tan nagaraṃ ca",
          children: [
            ["śrīmat", "possessed of splendour, glorious"],
            ["nagara", "city, town"],
          ],
        },
        ["nāyikā", "mistress, lady, leader"],
      ],
    },
  },

  57: {
    gloss: "Dwelling In The Wish-Gem House",
    translation:
      "At the centre of her city stands a house built out of the gem that grants whatever is thought of, and she lives within it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding inside the mansion of wish-fulfilling gems",
      vigraha: "cintāmaṇigṛhasya ante sthā",
      children: [
        {
          iast: "cintāmaṇigṛhānta",
          type: "tatpuruṣa",
          gloss: "the interior of the house of wish-granting gems",
          vigraha: "cintāmaṇigṛhasya antaḥ",
          children: [
            {
              iast: "cintāmaṇigṛha",
              type: "karmadhāraya",
              gloss: "a house built of wish-granting gems",
              vigraha: "cintāmaṇimayaṃ gṛham",
              children: [
                {
                  iast: "cintāmaṇi",
                  type: "tatpuruṣa",
                  gloss: "the gem that yields whatever is wished for",
                  vigraha: "cintāyā maṇiḥ",
                  children: [
                    ["cintā", "thought, wish, what one has in mind"],
                    ["maṇi", "gem, jewel"],
                  ],
                },
                ["gṛha", "house, dwelling"],
              ],
            },
            ["anta", "the inner part, inside"],
          ],
        },
        ["stha", "standing, abiding in"],
      ],
    },
  },

  58: {
    gloss: "Seated On The Couch Of Five Brahmās",
    translation:
      "Her couch is made of five great gods who have taken the shape of its legs and its plank, so that the whole hierarchy of creation supports her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "seated on the couch formed of the five Brahmās",
      vigraha: "pañcabrahmāsane sthitā",
      children: [
        {
          iast: "pañcabrahmāsana",
          type: "tatpuruṣa",
          gloss: "the seat made of the five Brahmās",
          vigraha: "pañcabrahmaṇām āsanam",
          children: [
            {
              iast: "pañcabrahman",
              type: "dvigu",
              gloss: "the group of five creator-gods",
              vigraha: "pañcānāṃ brahmaṇāṃ samāhāraḥ",
              children: [
                ["pañcan", "five"],
                ["brahman", "the creator god; the absolute"],
              ],
            },
            ["āsana", "seat, couch"],
          ],
        },
        ["sthita", "seated, established, remaining"],
      ],
    },
  },

  59: {
    gloss: "Dwelling In The Great Lotus Forest",
    translation:
      "She has her seat in a thicket of enormous lotuses, a place where the flowers grow as thick as trees.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding in the forest of great lotuses",
      vigraha: "mahāpadmāṭavyāṃ saṃsthā",
      children: [
        {
          iast: "mahāpadmāṭavī",
          type: "tatpuruṣa",
          gloss: "a forest of great lotuses",
          vigraha: "mahāpadmānām aṭavī",
          children: [
            {
              iast: "mahāpadma",
              type: "karmadhāraya",
              gloss: "a great lotus",
              vigraha: "mahac ca tat padmaṃ ca",
              children: [
                ["mahat", "great, large"],
                ["padma", "lotus"],
              ],
            },
            ["aṭavī", "forest, wilderness, a place to roam in"],
          ],
        },
        ["saṃstha", "abiding in, resting in"],
      ],
    },
  },

  60: {
    gloss: "Dweller In The Kadamba Grove",
    translation:
      "She keeps her residence among kadamba trees, whose orange blossoms open at the first touch of the rains.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who dwells in the kadamba wood",
      vigraha: "kadambavane vasati iti",
      children: [
        {
          iast: "kadambavana",
          type: "tatpuruṣa",
          gloss: "a grove of kadamba trees",
          vigraha: "kadambānāṃ vanam",
          children: [
            ["kadamba", "the kadamba tree, with fragrant orange flowers"],
            ["vana", "forest, wood, grove"],
          ],
        },
        ["vāsin", "dwelling, inhabiting"],
      ],
    },
  },

  61: {
    gloss: "Abiding Amid The Sea Of Nectar",
    translation:
      "Her island stands at the centre of an ocean of the drink that keeps the gods from dying.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding in the middle of the ocean of nectar",
      vigraha: "sudhāsāgarasya madhye sthā",
      children: [
        {
          iast: "sudhāsāgaramadhya",
          type: "tatpuruṣa",
          gloss: "the middle of the ocean of nectar",
          vigraha: "sudhāsāgarasya madhyam",
          children: [
            {
              iast: "sudhāsāgara",
              type: "karmadhāraya",
              gloss: "the ocean that is nectar",
              vigraha: "sudhaiva sāgaraḥ",
              children: [
                ["sudhā", "the drink of the gods, nectar"],
                ["sāgara", "ocean, sea"],
              ],
            },
            ["madhya", "the middle, the centre"],
          ],
        },
        ["stha", "standing, abiding in"],
      ],
    },
  },

  62: {
    gloss: "Whose Eyes Are Full Of Love",
    translation:
      "Desire lives in her eyes, and what she looks upon with them is granted before it is asked for.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whose eyes there is love",
      vigraha: "kāmayukte akṣiṇī yasyāḥ sā",
      children: [
        ["kāma", "desire, longing, love"],
        ["akṣi", "eye"],
      ],
    },
  },

  63: {
    gloss: "The Giver Of What Is Wished For",
    translation:
      "Whatever a person genuinely wants, she is the one who hands it over.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows what is desired",
      vigraha: "kāmaṃ dadāti iti",
      children: [
        ["kāma", "desire, the object wished for"],
        ["dāyin", "giving, bestowing"],
      ],
    },
  },

  64: {
    gloss: "Whose Glory Assembled Gods And Sages Praise",
    translation:
      "Crowd upon crowd of gods and seers gather to sing the greatness that belongs to her alone.",
    note: "The nāmāvalī drops a syllable and writes -vaibhā, which is not a word; the citation form follows the stotra recension's -vaibhavā, from vaibhava, might or magnificence.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose own majesty is being hymned by massed hosts of gods and sages",
      vigraha: "devarṣigaṇasaṅghātaiḥ stūyamānam ātmavaibhavaṃ yasyāḥ sā",
      children: [
        {
          iast: "devarṣigaṇasaṅghātastūyamāna",
          type: "tatpuruṣa",
          gloss: "praised by the assembled throngs of gods and sages",
          vigraha: "devarṣigaṇasaṅghātaiḥ stūyamānā",
          children: [
            {
              iast: "devarṣigaṇasaṅghāta",
              type: "tatpuruṣa",
              gloss: "the massed troops of gods and seers",
              vigraha: "devarṣīṇāṃ gaṇasaṅghātaḥ",
              children: [
                {
                  iast: "devarṣi",
                  type: "dvandva",
                  gloss: "gods and sages",
                  vigraha: "devāś ca ṛṣayaś ca",
                  children: [
                    ["deva", "god, celestial being"],
                    ["ṛṣi", "seer, inspired sage"],
                  ],
                },
                {
                  iast: "gaṇasaṅghāta",
                  type: "karmadhāraya",
                  gloss: "a dense assembly of troops",
                  vigraha: "gaṇānāṃ saṅghātaḥ",
                  children: [
                    ["gaṇa", "troop, host, company"],
                    ["saṅghāta", "a close gathering, a compact mass"],
                  ],
                },
              ],
            },
            ["stūyamāna", "being praised, being hymned"],
          ],
        },
        {
          iast: "ātmavaibhava",
          type: "tatpuruṣa",
          gloss: "her own majesty",
          vigraha: "ātmano vaibhavam",
          children: [
            ["ātman", "self, one's own person"],
            ["vaibhava", "might, magnificence, regal power"],
          ],
        },
      ],
    },
  },

  65: {
    gloss: "Attended By The Army Of Śaktis",
    translation:
      "When Bhaṇḍa had to be destroyed she came surrounded by an army of her own powers, each of them ready for the killing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "accompanied by an army of Śaktis bent on slaying the demon Bhaṇḍa",
      vigraha: "bhaṇḍāsuravadhodyuktayā śaktisenayā samanvitā",
      children: [
        {
          iast: "bhaṇḍāsuravadhodyuktaśaktisenā",
          type: "karmadhāraya",
          gloss: "the army of Śaktis intent on Bhaṇḍa's destruction",
          vigraha: "bhaṇḍāsuravadhodyuktā cāsau śaktisenā ca",
          children: [
            {
              iast: "bhaṇḍāsuravadhodyukta",
              type: "tatpuruṣa",
              gloss: "roused for the killing of the demon Bhaṇḍa",
              vigraha: "bhaṇḍāsuravadhe udyuktā",
              children: [
                {
                  iast: "bhaṇḍāsuravadha",
                  type: "tatpuruṣa",
                  gloss: "the slaying of the demon Bhaṇḍa",
                  vigraha: "bhaṇḍāsurasya vadhaḥ",
                  children: [
                    {
                      iast: "bhaṇḍāsura",
                      type: "karmadhāraya",
                      gloss: "the demon named Bhaṇḍa",
                      vigraha: "bhaṇḍo nāma asuraḥ",
                      children: [
                        ["bhaṇḍa", "Bhaṇḍa, the demon born from the ashes of Kāma"],
                        ["asura", "demon, adversary of the gods"],
                      ],
                    },
                    ["vadha", "slaying, killing, destruction"],
                  ],
                },
                ["udyukta", "roused, prepared, intent upon"],
              ],
            },
            {
              iast: "śaktisenā",
              type: "tatpuruṣa",
              gloss: "an army of Śaktis",
              vigraha: "śaktīnāṃ senā",
              children: [
                ["śakti", "power, energy; a goddess embodying her power"],
                ["senā", "army, armed force"],
              ],
            },
          ],
        },
        ["samanvita", "accompanied by, fully attended by"],
      ],
    },
  },

  66: {
    gloss: "Served By Sampatkarī's Elephant Corps",
    translation:
      "The herd of war-elephants that the goddess Sampatkarī rides at the head of moves with her as her retinue.",
    compound: {
      type: "tatpuruṣa",
      gloss: "waited on by the elephant host that Sampatkarī has mounted",
      vigraha: "sampatkarīsamārūḍhena sindhuravrajena sevitā",
      children: [
        {
          iast: "sampatkarīsamārūḍhasindhuravraja",
          type: "karmadhāraya",
          gloss: "the elephant troop ridden by Sampatkarī",
          vigraha: "sampatkarīsamārūḍhaś cāsau sindhuravrajaś ca",
          children: [
            {
              iast: "sampatkarīsamārūḍha",
              type: "tatpuruṣa",
              gloss: "mounted by Sampatkarī",
              vigraha: "sampatkaryā samārūḍhaḥ",
              children: [
                {
                  iast: "sampatkarī",
                  type: "tatpuruṣa",
                  gloss: "she who brings about prosperity",
                  vigraha: "sampadaṃ karoti iti",
                  children: [
                    ["sampad", "prosperity, success, abundance"],
                    ["kara", "making, causing, bringing about"],
                  ],
                },
                ["samārūḍha", "mounted, ascended, ridden"],
              ],
            },
            {
              iast: "sindhuravraja",
              type: "tatpuruṣa",
              gloss: "a herd of elephants",
              vigraha: "sindhurāṇāṃ vrajaḥ",
              children: [
                ["sindhura", "elephant"],
                ["vraja", "herd, troop, multitude"],
              ],
            },
          ],
        },
        ["sevita", "attended, waited upon, served"],
      ],
    },
  },

  67: {
    gloss: "Ringed By Aśvārūḍhā's Cavalry",
    translation:
      "Uncountable crores of horses, marshalled by the goddess who rides at their head, close round her on every side.",
    note: "The nāma is not a single compound: the compound ending in koṭikoṭi stands in the instrumental plural before the separate participle āvṛtā, so only the compound proper is analysed here.",
    compound: {
      iast: "aśvārūḍhādhiṣṭhitāśvakoṭikoṭi",
      type: "karmadhāraya",
      gloss: "crores upon crores of horses commanded by Aśvārūḍhā",
      vigraha: "aśvārūḍhādhiṣṭhitāś ca tā aśvakoṭikoṭayaś ca",
      children: [
        {
          iast: "aśvārūḍhādhiṣṭhita",
          type: "tatpuruṣa",
          gloss: "presided over by the goddess mounted on a horse",
          vigraha: "aśvārūḍhayā adhiṣṭhitāḥ",
          children: [
            {
              iast: "aśvārūḍhā",
              type: "tatpuruṣa",
              gloss: "she who is mounted on a horse",
              vigraha: "aśvam ārūḍhā",
              children: [
                ["aśva", "horse"],
                ["ārūḍha", "mounted, having ascended"],
              ],
            },
            ["adhiṣṭhita", "presided over, superintended, commanded"],
          ],
        },
        {
          iast: "aśvakoṭikoṭi",
          type: "tatpuruṣa",
          gloss: "crores of crores of horses",
          vigraha: "aśvānāṃ koṭikoṭayaḥ",
          children: [
            ["aśva", "horse"],
            {
              iast: "koṭikoṭi",
              type: "tatpuruṣa",
              gloss: "a crore of crores, an uncountable number",
              vigraha: "koṭīnāṃ koṭayaḥ",
              children: [
                ["koṭi", "ten million, the highest of the older numerals"],
                ["koṭi", "ten million"],
              ],
            },
          ],
        },
      ],
    },
  },

  68: {
    gloss: "Armed On The Cakrarāja Chariot",
    translation:
      "Every weapon there is stands ready on the great chariot called King of Wheels, and she goes to war fitted out with all of them.",
    note: "Many read cakrarājarathārūḍhā as said of the goddess herself, which would make the name a pairing of two separate descriptions; the analysis here follows the parallel wording of the two nāmas that come after it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "fully equipped with all the weapons borne on the Cakrarāja chariot",
      vigraha: "cakrarājarathārūḍhaiḥ sarvāyudhaiḥ pariṣkṛtā",
      children: [
        {
          iast: "cakrarājarathārūḍhasarvāyudha",
          type: "karmadhāraya",
          gloss: "all the weapons mounted on the chariot King of Wheels",
          vigraha: "cakrarājarathārūḍhāni ca tāni sarvāyudhāni ca",
          children: [
            {
              iast: "cakrarājarathārūḍha",
              type: "tatpuruṣa",
              gloss: "mounted upon the Cakrarāja chariot",
              vigraha: "cakrarājarathaṃ ārūḍha",
              children: [
                {
                  iast: "cakrarājaratha",
                  type: "karmadhāraya",
                  gloss: "the chariot called King of Wheels",
                  vigraha: "cakrarāja iti nāmā rathaḥ",
                  children: [
                    {
                      iast: "cakrarāja",
                      type: "tatpuruṣa",
                      gloss: "the king among wheels or diagrams",
                      vigraha: "cakrāṇāṃ rājā",
                      children: [
                        ["cakra", "wheel; a mystic diagram"],
                        ["rājan", "king, chief"],
                      ],
                    },
                    ["ratha", "chariot, war-car"],
                  ],
                },
                ["ārūḍha", "mounted, placed upon"],
              ],
            },
            {
              iast: "sarvāyudha",
              type: "karmadhāraya",
              gloss: "all the weapons",
              vigraha: "sarvāṇi ca tāny āyudhāni ca",
              children: [
                ["sarva", "all, every"],
                ["āyudha", "weapon, implement of war"],
              ],
            },
          ],
        },
        ["pariṣkṛta", "fitted out, equipped, adorned"],
      ],
    },
  },

  69: {
    gloss: "Waited On By Mantriṇī",
    translation:
      "Her minister rides beside her on the chariot named Wheel of Song, attending her throughout the battle.",
    compound: {
      type: "tatpuruṣa",
      gloss: "served by Mantriṇī mounted on the Geyacakra chariot",
      vigraha: "geyacakrarathārūḍhayā mantriṇyā parisevitā",
      children: [
        {
          iast: "geyacakrarathārūḍhamantriṇī",
          type: "karmadhāraya",
          gloss: "Mantriṇī riding the chariot Wheel of Song",
          vigraha: "geyacakrarathārūḍhā cāsau mantriṇī ca",
          children: [
            {
              iast: "geyacakrarathārūḍha",
              type: "tatpuruṣa",
              gloss: "mounted on the chariot called Wheel of Song",
              vigraha: "geyacakrarathaṃ ārūḍhā",
              children: [
                {
                  iast: "geyacakraratha",
                  type: "karmadhāraya",
                  gloss: "the chariot named Geyacakra",
                  vigraha: "geyacakraṃ iti nāmā rathaḥ",
                  children: [
                    {
                      iast: "geyacakra",
                      type: "karmadhāraya",
                      gloss: "the wheel that is song",
                      vigraha: "geyam eva cakram",
                      children: [
                        ["geya", "to be sung, song"],
                        ["cakra", "wheel; mystic diagram"],
                      ],
                    },
                    ["ratha", "chariot"],
                  ],
                },
                ["ārūḍha", "mounted, having ascended"],
              ],
            },
            ["mantriṇī", "the woman counsellor, her minister goddess"],
          ],
        },
        ["parisevita", "attended on all sides, waited upon"],
      ],
    },
  },

  70: {
    gloss: "Preceded By Daṇḍanāthā",
    translation:
      "The commander who wields the rod of punishment goes before her on the boar-wheel chariot, clearing the road.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having Daṇḍanāthā on the Kiricakra chariot placed in front",
      vigraha: "kiricakrarathārūḍhayā daṇḍanāthayā puraskṛtā",
      children: [
        {
          iast: "kiricakrarathārūḍhadaṇḍanāthā",
          type: "karmadhāraya",
          gloss: "Daṇḍanāthā riding the boar-wheel chariot",
          vigraha: "kiricakrarathārūḍhā cāsau daṇḍanāthā ca",
          children: [
            {
              iast: "kiricakrarathārūḍha",
              type: "tatpuruṣa",
              gloss: "mounted on the chariot called Boar Wheel",
              vigraha: "kiricakrarathaṃ ārūḍhā",
              children: [
                {
                  iast: "kiricakraratha",
                  type: "karmadhāraya",
                  gloss: "the chariot named Kiricakra",
                  vigraha: "kiricakraṃ iti nāmā rathaḥ",
                  children: [
                    {
                      iast: "kiricakra",
                      type: "karmadhāraya",
                      gloss: "the wheel that is a boar",
                      vigraha: "kirir eva cakram",
                      children: [
                        ["kiri", "a hog, a boar"],
                        ["cakra", "wheel; mystic diagram"],
                      ],
                    },
                    ["ratha", "chariot"],
                  ],
                },
                ["ārūḍha", "mounted, having ascended"],
              ],
            },
            {
              iast: "daṇḍanāthā",
              type: "tatpuruṣa",
              gloss: "the mistress of the rod of chastisement",
              vigraha: "daṇḍasya nāthā",
              children: [
                ["daṇḍa", "staff, rod, punishment"],
                ["nāthā", "mistress, protectress"],
              ],
            },
          ],
        },
        ["puraskṛta", "placed in front, given precedence"],
      ],
    },
  },

  71: {
    gloss: "Moving Within The Wall Of Flame",
    translation:
      "Jvālāmālinī threw up a rampart of fire around the army, and she moves freely inside it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "moving in the midst of the fiery rampart raised by Jvālāmālinī",
      vigraha: "jvālāmālinikākṣiptavahniprākāramadhye gacchati iti",
      children: [
        {
          iast: "jvālāmālinikākṣiptavahniprākāramadhya",
          type: "tatpuruṣa",
          gloss: "the inside of the fire-wall thrown up by Jvālāmālinikā",
          vigraha: "jvālāmālinikākṣiptavahniprākārasya madhyam",
          children: [
            {
              iast: "jvālāmālinikākṣiptavahniprākāra",
              type: "karmadhāraya",
              gloss: "the rampart of fire cast up by Jvālāmālinikā",
              vigraha: "jvālāmālinikākṣiptaś cāsau vahniprākāraś ca",
              children: [
                {
                  iast: "jvālāmālinikākṣipta",
                  type: "tatpuruṣa",
                  gloss: "flung out by the goddess garlanded with flames",
                  vigraha: "jvālāmālinikayā ākṣiptaḥ",
                  children: [
                    {
                      iast: "jvālāmālinikā",
                      type: "bahuvrīhi",
                      gloss: "she who wears a garland of flames",
                      vigraha: "jvālāmālā yasyā asti sā",
                      children: [
                        ["jvālā", "flame, blaze"],
                        ["mālin", "wearing a garland, wreathed"],
                      ],
                    },
                    ["ākṣipta", "thrown out, cast forth"],
                  ],
                },
                {
                  iast: "vahniprākāra",
                  type: "karmadhāraya",
                  gloss: "a rampart made of fire",
                  vigraha: "vahnir eva prākāraḥ",
                  children: [
                    ["vahni", "fire"],
                    ["prākāra", "wall, rampart, enclosure"],
                  ],
                },
              ],
            },
            ["madhya", "the middle, the inside"],
          ],
        },
        ["ga", "going, moving, abiding in"],
      ],
    },
  },

  72: {
    gloss: "Gladdened By The Śaktis' Valour",
    translation:
      "Watching her powers press the attack on Bhaṇḍa's forces, she is filled with delight at their courage.",
    compound: {
      type: "tatpuruṣa",
      gloss: "made joyful by the prowess of the Śaktis bent on destroying Bhaṇḍa's army",
      vigraha: "bhaṇḍasainyavadhodyuktaśaktivikrameṇa harṣitā",
      children: [
        {
          iast: "bhaṇḍasainyavadhodyuktaśaktivikrama",
          type: "tatpuruṣa",
          gloss: "the valour of the Śaktis intent on slaughtering Bhaṇḍa's army",
          vigraha: "bhaṇḍasainyavadhodyuktānāṃ śaktīnāṃ vikramaḥ",
          children: [
            {
              iast: "bhaṇḍasainyavadhodyuktaśakti",
              type: "karmadhāraya",
              gloss: "the Śaktis roused to destroy Bhaṇḍa's host",
              vigraha: "bhaṇḍasainyavadhodyuktāś ca tāḥ śaktayaś ca",
              children: [
                {
                  iast: "bhaṇḍasainyavadhodyukta",
                  type: "tatpuruṣa",
                  gloss: "intent on the slaughter of Bhaṇḍa's army",
                  vigraha: "bhaṇḍasainyavadhe udyuktāḥ",
                  children: [
                    {
                      iast: "bhaṇḍasainyavadha",
                      type: "tatpuruṣa",
                      gloss: "the destruction of Bhaṇḍa's army",
                      vigraha: "bhaṇḍasainyasya vadhaḥ",
                      children: [
                        ["bhaṇḍa", "Bhaṇḍa, the demon adversary"],
                        ["sainya", "army, host of soldiers"],
                        ["vadha", "slaying, destruction"],
                      ],
                    },
                    ["udyukta", "roused, ready, intent upon"],
                  ],
                },
                ["śakti", "power; a goddess embodying her power"],
              ],
            },
            ["vikrama", "stride, valour, display of strength"],
          ],
        },
        ["harṣita", "gladdened, delighted"],
      ],
    },
  },

  73: {
    gloss: "Eager To Watch The Nityās' Onslaught",
    translation:
      "She leans forward with open pleasure to see the swelling force with which the Nityā goddesses fight.",
    compound: {
      type: "tatpuruṣa",
      gloss: "keenly eager to behold the surging prowess of the Nityā goddesses",
      vigraha: "nityāparākramāṭopanirīkṣaṇe samutsukā",
      children: [
        {
          iast: "nityāparākramāṭopanirīkṣaṇa",
          type: "tatpuruṣa",
          gloss: "the sight of the swelling valour of the Nityās",
          vigraha: "nityāparākramāṭopasya nirīkṣaṇam",
          children: [
            {
              iast: "nityāparākramāṭopa",
              type: "tatpuruṣa",
              gloss: "the exuberance of the Nityās' valour",
              vigraha: "nityānāṃ parākramāṭopaḥ",
              children: [
                ["nityā", "one of the eternal goddesses of her retinue"],
                {
                  iast: "parākramāṭopa",
                  type: "tatpuruṣa",
                  gloss: "the swelling of prowess",
                  vigraha: "parākramasya āṭopaḥ",
                  children: [
                    ["parākrama", "prowess, bold advance, heroism"],
                    ["āṭopa", "swelling, puffing up, exuberance"],
                  ],
                },
              ],
            },
            ["nirīkṣaṇa", "looking at, beholding"],
          ],
        },
        ["samutsuka", "keenly eager, longing"],
      ],
    },
  },

  74: {
    gloss: "Delighted By Bālā's Prowess",
    translation:
      "The girl-goddess Bālā set out to kill the sons of Bhaṇḍa, and her daring gave the mother open joy.",
    compound: {
      type: "tatpuruṣa",
      gloss: "gladdened by the valour of Bālā, who was bent on slaying Bhaṇḍa's sons",
      vigraha: "bhaṇḍaputravadhodyuktabālāvikrameṇa nanditā",
      children: [
        {
          iast: "bhaṇḍaputravadhodyuktabālāvikrama",
          type: "tatpuruṣa",
          gloss: "the valour of Bālā, intent on killing Bhaṇḍa's sons",
          vigraha: "bhaṇḍaputravadhodyuktāyā bālāyā vikramaḥ",
          children: [
            {
              iast: "bhaṇḍaputravadhodyuktabālā",
              type: "karmadhāraya",
              gloss: "Bālā, roused to destroy the sons of Bhaṇḍa",
              vigraha: "bhaṇḍaputravadhodyuktā cāsau bālā ca",
              children: [
                {
                  iast: "bhaṇḍaputravadhodyukta",
                  type: "tatpuruṣa",
                  gloss: "intent on the killing of Bhaṇḍa's sons",
                  vigraha: "bhaṇḍaputravadhe udyuktā",
                  children: [
                    {
                      iast: "bhaṇḍaputravadha",
                      type: "tatpuruṣa",
                      gloss: "the slaying of Bhaṇḍa's sons",
                      vigraha: "bhaṇḍaputrāṇāṃ vadhaḥ",
                      children: [
                        ["bhaṇḍa", "Bhaṇḍa, the demon adversary"],
                        ["putra", "son"],
                        ["vadha", "slaying, destruction"],
                      ],
                    },
                    ["udyukta", "roused, prepared, intent upon"],
                  ],
                },
                ["bālā", "a young girl; the youthful form of the goddess"],
              ],
            },
            ["vikrama", "valour, heroic advance"],
          ],
        },
        ["nandita", "gladdened, made to rejoice"],
      ],
    },
  },

  75: {
    gloss: "Pleased By The Fall Of Viṣaṅga",
    translation:
      "Mother Mantriṇī brought down the demon Viṣaṅga, and the deed satisfied her completely.",
    compound: {
      type: "tatpuruṣa",
      gloss: "well pleased by the killing of Viṣaṅga carried out by mother Mantriṇī",
      vigraha: "mantriṇyambāviracitena viṣaṅgavadhena toṣitā",
      children: [
        {
          iast: "mantriṇyambāviracitaviṣaṅgavadha",
          type: "karmadhāraya",
          gloss: "the slaying of Viṣaṅga brought about by mother Mantriṇī",
          vigraha: "mantriṇyambāviracitaś cāsau viṣaṅgavadhaś ca",
          children: [
            {
              iast: "mantriṇyambāviracita",
              type: "tatpuruṣa",
              gloss: "accomplished by mother Mantriṇī",
              vigraha: "mantriṇyambayā viracitaḥ",
              children: [
                {
                  iast: "mantriṇyambā",
                  type: "karmadhāraya",
                  gloss: "the mother who is her counsellor",
                  vigraha: "mantriṇī cāsau ambā ca",
                  children: [
                    ["mantriṇī", "the woman counsellor, her minister goddess"],
                    ["ambā", "mother, a respectful name for a woman"],
                  ],
                },
                ["viracita", "arranged, brought about, accomplished"],
              ],
            },
            {
              iast: "viṣaṅgavadha",
              type: "tatpuruṣa",
              gloss: "the killing of Viṣaṅga",
              vigraha: "viṣaṅgasya vadhaḥ",
              children: [
                ["viṣaṅga", "Viṣaṅga, a brother of the demon Bhaṇḍa"],
                ["vadha", "slaying, destruction"],
              ],
            },
          ],
        },
        ["toṣita", "satisfied, pleased"],
      ],
    },
  },

  76: {
    gloss: "Delighted By Vārāhī's Might",
    translation:
      "Vārāhī took the life-breath out of Viśukra, and the strength she showed in doing it made the goddess rejoice.",
    compound: {
      type: "tatpuruṣa",
      gloss: "gladdened by the might of Vārāhī, who carried off the life of Viśukra",
      vigraha: "viśukraprāṇaharaṇavārāhyā vīryeṇa nanditā",
      children: [
        {
          iast: "viśukraprāṇaharaṇavārāhīvīrya",
          type: "tatpuruṣa",
          gloss: "the might of Vārāhī, who took away the breath of Viśukra",
          vigraha: "viśukraprāṇaharaṇavārāhyā vīryam",
          children: [
            {
              iast: "viśukraprāṇaharaṇavārāhī",
              type: "karmadhāraya",
              gloss: "Vārāhī, the taker of Viśukra's life",
              vigraha: "viśukraprāṇaharaṇā cāsau vārāhī ca",
              children: [
                {
                  iast: "viśukraprāṇaharaṇa",
                  type: "tatpuruṣa",
                  gloss: "the carrying off of Viśukra's life-breath",
                  vigraha: "viśukrasya prāṇaharaṇam",
                  children: [
                    ["viśukra", "Viśukra, a brother of the demon Bhaṇḍa"],
                    ["prāṇa", "breath, the vital force"],
                    ["haraṇa", "taking away, carrying off"],
                  ],
                },
                ["vārāhī", "the boar-faced goddess, commander of her forces"],
              ],
            },
            ["vīrya", "heroism, valour, virile strength"],
          ],
        },
        ["nandita", "gladdened, made to rejoice"],
      ],
    },
  },

  77: {
    gloss: "Who Made Gaṇeśa With A Glance",
    translation:
      "A single look exchanged with her husband's face was enough to bring the elephant-headed lord into existence.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whom the blessed Gaṇeśvara was produced through a look at Kāmeśvara's face",
      vigraha: "kāmeśvaramukhālokena kalpitaḥ śrīgaṇeśvaro yayā sā",
      children: [
        {
          iast: "kāmeśvaramukhāloka",
          type: "tatpuruṣa",
          gloss: "the sight of the face of Kāmeśvara",
          vigraha: "kāmeśvaramukhasya ālokaḥ",
          children: [
            {
              iast: "kāmeśvaramukha",
              type: "tatpuruṣa",
              gloss: "the face of the lord of desire",
              vigraha: "kāmeśvarasya mukham",
              children: [
                ["kāmeśvara", "lord of desire, Śiva as her consort"],
                ["mukha", "face, countenance"],
              ],
            },
            ["āloka", "looking, sight, a glance"],
          ],
        },
        {
          iast: "kalpitaśrīgaṇeśvara",
          type: "karmadhāraya",
          gloss: "the blessed lord of the hosts, brought into being",
          vigraha: "kalpitaś cāsau śrīgaṇeśvaraś ca",
          children: [
            ["kalpita", "formed, produced, brought into being"],
            {
              iast: "śrīgaṇeśvara",
              type: "karmadhāraya",
              gloss: "the glorious lord of Śiva's hosts",
              vigraha: "śrīmāṃś cāsau gaṇeśvaraś ca",
              children: [
                ["śrī", "glorious, blessed"],
                ["gaṇeśvara", "lord of the troops, Gaṇeśa"],
              ],
            },
          ],
        },
      ],
    },
  },

  78: {
    gloss: "Rejoicing When Gaṇeśa Broke The Obstacle Engine",
    translation:
      "The demons set up a contrivance to obstruct her army; the great Gaṇeśa smashed it, and she was overjoyed.",
    compound: {
      type: "tatpuruṣa",
      gloss: "greatly delighted by the obstruction-engine shattered by the great Gaṇeśa",
      vigraha: "mahāgaṇeśanirbhinnena vighnayantreṇa praharṣitā",
      children: [
        {
          iast: "mahāgaṇeśanirbhinnavighnayantra",
          type: "karmadhāraya",
          gloss: "the machine of obstruction split apart by the great Gaṇeśa",
          vigraha: "mahāgaṇeśanirbhinnaṃ ca tad vighnayantraṃ ca",
          children: [
            {
              iast: "mahāgaṇeśanirbhinna",
              type: "tatpuruṣa",
              gloss: "broken open by the great Gaṇeśa",
              vigraha: "mahāgaṇeśena nirbhinnam",
              children: [
                {
                  iast: "mahāgaṇeśa",
                  type: "karmadhāraya",
                  gloss: "the great Gaṇeśa",
                  vigraha: "mahāṃś cāsau gaṇeśaś ca",
                  children: [
                    ["mahat", "great, mighty"],
                    ["gaṇeśa", "lord of the troops, Gaṇeśa"],
                  ],
                },
                ["nirbhinna", "split open, broken apart"],
              ],
            },
            {
              iast: "vighnayantra",
              type: "tatpuruṣa",
              gloss: "a contrivance for creating obstruction",
              vigraha: "vighnasya yantram",
              children: [
                ["vighna", "obstacle, hindrance"],
                ["yantra", "machine, contrivance, engine"],
              ],
            },
          ],
        },
        ["praharṣita", "made to rejoice greatly"],
      ],
    },
  },

  79: {
    gloss: "Who Rains Counter-Weapons On Bhaṇḍa's Missiles",
    translation:
      "For every weapon the demon king released she sent back a shower of answering missiles.",
    compound: {
      type: "tatpuruṣa",
      gloss: "showering counter-missiles against the weapons discharged by the demon lord Bhaṇḍa",
      vigraha: "bhaṇḍāsurendranirmukteṣu śastreṣu pratyastrāṇi varṣati iti",
      children: [
        {
          iast: "bhaṇḍāsurendranirmuktaśastra",
          type: "karmadhāraya",
          gloss: "the weapons let fly by Bhaṇḍa, chief of demons",
          vigraha: "bhaṇḍāsurendranirmuktāni ca tāni śastrāṇi ca",
          children: [
            {
              iast: "bhaṇḍāsurendranirmukta",
              type: "tatpuruṣa",
              gloss: "discharged by Bhaṇḍa the lord of demons",
              vigraha: "bhaṇḍāsurendreṇa nirmuktāni",
              children: [
                {
                  iast: "bhaṇḍāsurendra",
                  type: "karmadhāraya",
                  gloss: "Bhaṇḍa, the chief of the demons",
                  vigraha: "bhaṇḍo nāma asurendraḥ",
                  children: [
                    ["bhaṇḍa", "Bhaṇḍa, the demon adversary"],
                    {
                      iast: "asurendra",
                      type: "tatpuruṣa",
                      gloss: "lord of the demons",
                      vigraha: "asurāṇām indraḥ",
                      children: [
                        ["asura", "demon, enemy of the gods"],
                        ["indra", "chief, lord, the best of a kind"],
                      ],
                    },
                  ],
                },
                ["nirmukta", "released, let loose, discharged"],
              ],
            },
            ["śastra", "weapon, missile"],
          ],
        },
        {
          iast: "pratyastravarṣiṇī",
          type: "tatpuruṣa",
          gloss: "she who rains down counter-missiles",
          vigraha: "pratyastrāṇāṃ varṣiṇī",
          children: [
            ["pratyastra", "a missile hurled in return"],
            ["varṣin", "raining, showering down"],
          ],
        },
      ],
    },
  },

  80: {
    gloss: "From Whose Nails Viṣṇu's Ten Forms Arose",
    translation:
      "The ten descents of Nārāyaṇa came out of the nails on her fingers when the battle needed them.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she from whose fingernails the ten forms of Nārāyaṇa sprang",
      vigraha: "karāṅgulinakhotpannā nārāyaṇadaśākṛtayo yasyāḥ sā",
      children: [
        {
          iast: "karāṅgulinakhotpanna",
          type: "tatpuruṣa",
          gloss: "arisen from the nails of the fingers of her hand",
          vigraha: "karāṅgulinakhebhya utpannāḥ",
          children: [
            {
              iast: "karāṅgulinakha",
              type: "tatpuruṣa",
              gloss: "the nails on the fingers of the hand",
              vigraha: "karāṅgulīnāṃ nakhāḥ",
              children: [
                {
                  iast: "karāṅguli",
                  type: "tatpuruṣa",
                  gloss: "the fingers of the hand",
                  vigraha: "karasya aṅgulayaḥ",
                  children: [
                    ["kara", "hand"],
                    ["aṅguli", "finger"],
                  ],
                },
                ["nakha", "nail, claw"],
              ],
            },
            ["utpanna", "arisen, produced, come forth"],
          ],
        },
        {
          iast: "nārāyaṇadaśākṛti",
          type: "tatpuruṣa",
          gloss: "the ten forms of Nārāyaṇa",
          vigraha: "nārāyaṇasya daśa ākṛtayaḥ",
          children: [
            ["nārāyaṇa", "Nārāyaṇa, Viṣṇu"],
            {
              iast: "daśākṛti",
              type: "dvigu",
              gloss: "the set of ten forms",
              vigraha: "daśānām ākṛtīnāṃ samāhāraḥ",
              children: [
                ["daśan", "ten"],
                ["ākṛti", "form, shape, appearance"],
              ],
            },
          ],
        },
      ],
    },
  },

  81: {
    gloss: "Who Burned The Demon Host With Śiva's Weapon",
    translation:
      "She loosed the great Pāśupata missile, and its fire left nothing of the demon soldiers.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whose great Pāśupata fire the demon soldiers were burnt away",
      vigraha: "mahāpāśupatāstrāgninirdagdhā asurasainikā yayā sā",
      children: [
        {
          iast: "mahāpāśupatāstrāgninirdagdha",
          type: "tatpuruṣa",
          gloss: "burnt up by the fire of the great Pāśupata weapon",
          vigraha: "mahāpāśupatāstrāgninā nirdagdhāḥ",
          children: [
            {
              iast: "mahāpāśupatāstrāgni",
              type: "tatpuruṣa",
              gloss: "the fire of the great weapon of Paśupati",
              vigraha: "mahāpāśupatāstrasya agniḥ",
              children: [
                {
                  iast: "mahāpāśupatāstra",
                  type: "karmadhāraya",
                  gloss: "the great missile belonging to Paśupati",
                  vigraha: "mahac ca tat pāśupatāstraṃ ca",
                  children: [
                    ["mahat", "great, mighty"],
                    {
                      iast: "pāśupatāstra",
                      type: "tatpuruṣa",
                      gloss: "the weapon of the lord of creatures",
                      vigraha: "paśupateḥ astram",
                      children: [
                        ["pāśupata", "belonging to Paśupati, to Śiva"],
                        ["astra", "missile weapon"],
                      ],
                    },
                  ],
                },
                ["agni", "fire"],
              ],
            },
            ["nirdagdha", "burnt up, consumed by fire"],
          ],
        },
        {
          iast: "asurasainika",
          type: "tatpuruṣa",
          gloss: "the soldiers of the demon army",
          vigraha: "asurāṇāṃ sainikāḥ",
          children: [
            ["asura", "demon, enemy of the gods"],
            ["sainika", "soldier, member of an army"],
          ],
        },
      ],
    },
  },

  82: {
    gloss: "Who Emptied Śūnyaka With Kāmeśvara's Weapon",
    translation:
      "The weapon named after her consort burned the city of Śūnyaka and Bhaṇḍa within it to nothing at once.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whom Śūnyaka along with Bhaṇḍāsura was burnt by the Kāmeśvara missile",
      vigraha: "kāmeśvarāstranirdagdhaṃ sabhāṇḍāsuraṃ śūnyakaṃ yayā sā",
      children: [
        {
          iast: "kāmeśvarāstranirdagdha",
          type: "tatpuruṣa",
          gloss: "consumed by the weapon of Kāmeśvara",
          vigraha: "kāmeśvarāstreṇa nirdagdham",
          children: [
            {
              iast: "kāmeśvarāstra",
              type: "tatpuruṣa",
              gloss: "the missile belonging to Kāmeśvara",
              vigraha: "kāmeśvarasya astram",
              children: [
                ["kāmeśvara", "lord of desire, Śiva as her consort"],
                ["astra", "missile weapon"],
              ],
            },
            ["nirdagdha", "burnt up, consumed"],
          ],
        },
        {
          iast: "sabhāṇḍāsuraśūnyaka",
          type: "karmadhāraya",
          gloss: "the city Śūnyaka together with Bhaṇḍāsura",
          vigraha: "bhaṇḍāsureṇa sahitaṃ ca tac chūnyakaṃ ca",
          children: [
            {
              iast: "sabhāṇḍāsura",
              type: "bahuvrīhi",
              gloss: "accompanied by the demon Bhaṇḍa",
              vigraha: "bhaṇḍāsureṇa saha vartate iti",
              children: [
                ["sa", "with, together with"],
                ["bhaṇḍāsura", "Bhaṇḍa, the demon adversary"],
              ],
            },
            ["śūnyaka", "Śūnyaka, the demon's capital; literally the empty place"],
          ],
        },
      ],
    },
  },

  83: {
    gloss: "Whose Greatness The High Gods Hymn",
    translation:
      "Brahmā, Viṣṇu, Indra and the gods who follow them join in praising the extent of her power.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose might is hymned by Brahmā, Upendra, Mahendra and the other gods",
      vigraha: "brahmopendramahendrādidevasaṃstutaṃ vaibhavaṃ yasyāḥ sā",
      children: [
        {
          iast: "brahmopendramahendrādidevasaṃstuta",
          type: "tatpuruṣa",
          gloss: "well praised by Brahmā, Upendra, Mahendra and the rest of the gods",
          vigraha: "brahmopendramahendrādidevaiḥ saṃstutam",
          children: [
            {
              iast: "brahmopendramahendrādideva",
              type: "karmadhāraya",
              gloss: "the gods beginning with Brahmā, Upendra and Mahendra",
              vigraha: "brahmopendramahendrādayaś ca te devāś ca",
              children: [
                {
                  iast: "brahmopendramahendrādi",
                  type: "bahuvrīhi",
                  gloss: "having Brahmā, Upendra and Mahendra at their head",
                  vigraha: "brahmopendramahendrā ādau yeṣāṃ te",
                  children: [
                    {
                      iast: "brahmopendramahendra",
                      type: "dvandva",
                      gloss: "Brahmā, Upendra and Mahendra",
                      vigraha: "brahmā ca upendraś ca mahendraś ca",
                      children: [
                        ["brahman", "Brahmā, the creator"],
                        ["upendra", "the younger brother of Indra, Viṣṇu"],
                        ["mahendra", "the great Indra"],
                      ],
                    },
                    ["ādi", "beginning, first; and the rest"],
                  ],
                },
                ["deva", "god, celestial being"],
              ],
            },
            ["saṃstuta", "praised together, extolled"],
          ],
        },
        ["vaibhava", "might, greatness, magnificence"],
      ],
    },
  },

  84: {
    gloss: "The Herb That Revived Burnt Kāma",
    translation:
      "Desire was reduced to ash by the fire of Hara's third eye, and she is the healing plant that brought it back to life.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the life-restoring herb for Kāma, who was burnt by the fire of Hara's eye",
      vigraha: "haranetrāgnisandagdhasya kāmasya sañjīvanauṣadhiḥ",
      children: [
        {
          iast: "haranetrāgnisandagdhakāma",
          type: "karmadhāraya",
          gloss: "Kāma, burnt to ashes by the fire of Hara's eye",
          vigraha: "haranetrāgnisandagdhaś cāsau kāmaś ca",
          children: [
            {
              iast: "haranetrāgnisandagdha",
              type: "tatpuruṣa",
              gloss: "consumed by the fire of Hara's eye",
              vigraha: "haranetrāgninā sandagdhaḥ",
              children: [
                {
                  iast: "haranetrāgni",
                  type: "tatpuruṣa",
                  gloss: "the fire of the eye of Hara",
                  vigraha: "haranetrasya agniḥ",
                  children: [
                    {
                      iast: "haranetra",
                      type: "tatpuruṣa",
                      gloss: "the eye of Hara",
                      vigraha: "harasya netram",
                      children: [
                        ["hara", "the remover, Śiva"],
                        ["netra", "eye"],
                      ],
                    },
                    ["agni", "fire"],
                  ],
                },
                ["sandagdha", "burnt up, wholly scorched"],
              ],
            },
            ["kāma", "Kāma, the god of desire"],
          ],
        },
        {
          iast: "sañjīvanauṣadhi",
          type: "karmadhāraya",
          gloss: "the herb that restores life",
          vigraha: "sañjīvanī cāsāv auṣadhiś ca",
          children: [
            ["sañjīvana", "restoring to life, reviving"],
            ["oṣadhi", "a medicinal herb, a healing plant"],
          ],
        },
      ],
    },
  },

  85: {
    gloss: "Whose Lotus Face Is The Vāgbhava Syllables",
    translation:
      "The first cluster of her mantra, the one that governs speech, takes visible shape as the lotus of her face.",
    note: "vāgbhava is a technical Śrīvidyā term for the first cluster of the mantra and is not a Monier-Williams headword; it is analysed here from vāc and bhava, that which arises as speech.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose lotus face is the one form of the glorious Vāgbhava cluster",
      vigraha: "śrīmadvāgbhavakūṭaikasvarūpaṃ mukhapaṅkajaṃ yasyāḥ sā",
      children: [
        {
          iast: "śrīmadvāgbhavakūṭaikasvarūpa",
          type: "tatpuruṣa",
          gloss: "the single essential form of the glorious Vāgbhava cluster",
          vigraha: "śrīmadvāgbhavakūṭasya ekasvarūpam",
          children: [
            {
              iast: "śrīmadvāgbhavakūṭa",
              type: "karmadhāraya",
              gloss: "the glorious cluster of syllables that gives rise to speech",
              vigraha: "śrīmac ca tad vāgbhavakūṭaṃ ca",
              children: [
                ["śrīmat", "possessed of splendour, glorious"],
                {
                  iast: "vāgbhavakūṭa",
                  type: "tatpuruṣa",
                  gloss: "the cluster belonging to the origin of speech",
                  vigraha: "vāgbhavasya kūṭam",
                  children: [
                    {
                      iast: "vāgbhava",
                      type: "tatpuruṣa",
                      gloss: "that which arises as speech",
                      vigraha: "vāco bhavaḥ",
                      children: [
                        ["vāc", "speech, voice, word"],
                        ["bhava", "coming into being, origin"],
                      ],
                    },
                    ["kūṭa", "peak, summit; a cluster or group"],
                  ],
                },
              ],
            },
            {
              iast: "ekasvarūpa",
              type: "karmadhāraya",
              gloss: "the one essential form",
              vigraha: "ekaṃ ca tat svarūpaṃ ca",
              children: [
                ["eka", "one, single, sole"],
                ["svarūpa", "own form, essential nature"],
              ],
            },
          ],
        },
        {
          iast: "mukhapaṅkaja",
          type: "karmadhāraya",
          gloss: "the face that is a lotus",
          vigraha: "mukham eva paṅkajam",
          children: [
            ["mukha", "face, countenance"],
            ["paṅkaja", "the mud-born, a lotus"],
          ],
        },
      ],
    },
  },

  86: {
    gloss: "Whose Torso Is The Middle Syllables",
    translation:
      "Everything from below her throat down to her waist is the second cluster of the mantra taken on as a body.",
    note: "Since the -in suffix already carries the possession, the compound proper is the tatpuruṣa X-svarūpa; read instead as a bahuvrīhi it would mean she whose form is the middle cluster, which comes to the same thing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "embodying the middle cluster from below the throat as far as the waist",
      vigraha: "kaṇṭhādhaḥkaṭiparyantasya madhyakūṭasya svarūpiṇī",
      children: [
        {
          iast: "kaṇṭhādhaḥkaṭiparyantamadhyakūṭa",
          type: "karmadhāraya",
          gloss: "the middle cluster reaching from below the throat to the waist",
          vigraha: "kaṇṭhādhaḥkaṭiparyantaṃ ca tan madhyakūṭaṃ ca",
          children: [
            {
              iast: "kaṇṭhādhaḥkaṭiparyanta",
              type: "karmadhāraya",
              gloss: "extending from below the throat down to the hips",
              vigraha: "kaṇṭhādhaś ca kaṭiparyantaṃ ca",
              children: [
                {
                  iast: "kaṇṭhādhas",
                  type: "avyayībhāva",
                  gloss: "below the throat",
                  vigraha: "kaṇṭhasya adhaḥ",
                  children: [
                    ["kaṇṭha", "throat, neck"],
                    ["adhas", "below, underneath"],
                  ],
                },
                {
                  iast: "kaṭiparyanta",
                  type: "bahuvrīhi",
                  gloss: "having the hips as its limit",
                  vigraha: "kaṭiḥ paryanto yasya tat",
                  children: [
                    ["kaṭi", "hip, loins, waist"],
                    ["paryanta", "limit, border, end"],
                  ],
                },
              ],
            },
            {
              iast: "madhyakūṭa",
              type: "karmadhāraya",
              gloss: "the middle cluster of the mantra",
              vigraha: "madhyaṃ ca tat kūṭaṃ ca",
              children: [
                ["madhya", "middle, central"],
                ["kūṭa", "peak; a cluster or group"],
              ],
            },
          ],
        },
        ["svarūpin", "having the form of, embodying"],
      ],
    },
  },

  87: {
    gloss: "Who Bears The Śakti Syllables Below The Waist",
    translation:
      "Her body from the waist downward has become one with the third cluster of the mantra, and she carries it as her own.",
    compound: {
      type: "tatpuruṣa",
      gloss: "bearing the part below the waist as one with the Śakti cluster",
      vigraha: "śaktikūṭaikatāpannaṃ kaṭyadhobhāgaṃ dhārayati iti",
      children: [
        {
          iast: "śaktikūṭaikatāpannakaṭyadhobhāga",
          type: "karmadhāraya",
          gloss: "the region below the waist that has become one with the Śakti cluster",
          vigraha: "śaktikūṭaikatāpannaś cāsau kaṭyadhobhāgaś ca",
          children: [
            {
              iast: "śaktikūṭaikatāpanna",
              type: "tatpuruṣa",
              gloss: "having attained oneness with the Śakti cluster",
              vigraha: "śaktikūṭasya ekatām āpannaḥ",
              children: [
                {
                  iast: "śaktikūṭa",
                  type: "tatpuruṣa",
                  gloss: "the cluster of syllables belonging to Śakti",
                  vigraha: "śakteḥ kūṭam",
                  children: [
                    ["śakti", "power, energy, the goddess as power"],
                    ["kūṭa", "peak; a cluster or group"],
                  ],
                },
                {
                  iast: "ekatāpanna",
                  type: "tatpuruṣa",
                  gloss: "come to be one with",
                  vigraha: "ekatām āpannaḥ",
                  children: [
                    ["ekatā", "oneness, identity"],
                    ["āpanna", "having reached, having attained"],
                  ],
                },
              ],
            },
            {
              iast: "kaṭyadhobhāga",
              type: "tatpuruṣa",
              gloss: "the portion of the body below the waist",
              vigraha: "kaṭer adhobhāgaḥ",
              children: [
                ["kaṭi", "hip, waist"],
                ["adhobhāga", "the lower part"],
              ],
            },
          ],
        },
        ["dhārin", "bearing, holding, carrying"],
      ],
    },
  },

  88: {
    gloss: "Whose Very Self Is The Root Mantra",
    translation:
      "She is not represented by the root mantra; she is what the root mantra is made of.",
    note: "The -ātmaka suffix carries the possessive force, so the word is taken here as a taddhita derivative of the tatpuruṣa mūlamantrātman; it is also commonly read as a bahuvrīhi, she whose self is the root mantra.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the root mantra for its very self",
      vigraha: "mūlamantram ātmā yasyāḥ sā mūlamantrātmā, tathābhūtā mūlamantrātmikā",
      children: [
        {
          iast: "mūlamantra",
          type: "karmadhāraya",
          gloss: "the root mantra",
          vigraha: "mūlaṃ ca tan mantraṃ ca",
          children: [
            ["mūla", "root, foundation, origin"],
            ["mantra", "sacred formula, mantra"],
          ],
        },
        ["ātmaka", "having the nature of, consisting of"],
      ],
    },
  },

  89: {
    gloss: "Whose Body Is The Three Root Clusters",
    translation:
      "The three groups of syllables at the root of her mantra together make up the frame she inhabits.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose body is the triad of root clusters",
      vigraha: "mūlakūṭatrayaṃ kalevaraṃ yasyāḥ sā",
      children: [
        {
          iast: "mūlakūṭatraya",
          type: "tatpuruṣa",
          gloss: "the three root clusters of syllables",
          vigraha: "mūlakūṭānāṃ trayam",
          children: [
            {
              iast: "mūlakūṭa",
              type: "karmadhāraya",
              gloss: "a root cluster of syllables",
              vigraha: "mūlaṃ ca tat kūṭaṃ ca",
              children: [
                ["mūla", "root, base, origin"],
                ["kūṭa", "peak; a cluster or group"],
              ],
            },
            ["traya", "a triad, a set of three"],
          ],
        },
        ["kalevara", "the body, the bodily frame"],
      ],
    },
  },

  90: {
    gloss: "Who Savours The Nectar Of Kula Alone",
    translation:
      "One taste holds her, and it is the nectar of the kula; nothing else has any savour for her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "delighting solely in the nectar of the kula",
      vigraha: "kulāmṛte ekarasikā",
      children: [
        {
          iast: "kulāmṛta",
          type: "tatpuruṣa",
          gloss: "the nectar belonging to the kula",
          vigraha: "kulasya amṛtam",
          children: [
            ["kula", "family, lineage; in tantra, the assemblage of powers"],
            ["amṛta", "the deathless drink, nectar"],
          ],
        },
        {
          iast: "ekarasika",
          type: "karmadhāraya",
          gloss: "having a taste for one thing only",
          vigraha: "eka eva rasikaḥ",
          children: [
            ["eka", "one, single, sole"],
            ["rasika", "having a taste for, relishing, devoted to"],
          ],
        },
      ],
    },
  },

  91: {
    gloss: "Guardian Of The Kula's Covenant",
    translation:
      "The private agreements that bind the kula together are kept safe by her and by no one else.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who protects the compact of the kula",
      vigraha: "kulasaṅketasya pālinī",
      children: [
        {
          iast: "kulasaṅketa",
          type: "tatpuruṣa",
          gloss: "the secret compact of the kula",
          vigraha: "kulasya saṃketaḥ",
          children: [
            ["kula", "family, lineage; the tantric assembly"],
            ["saṃketa", "agreement, covenant, prearranged sign"],
          ],
        },
        ["pālin", "protecting, guarding, keeping"],
      ],
    },
  },

  92: {
    gloss: "The Woman Of The Kula",
    translation:
      "She is the well-born woman of the lineage, the one whose presence makes the household a household.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the woman belonging to the kula",
      vigraha: "kulasya aṅganā",
      children: [
        ["kula", "family, noble lineage; the tantric assembly"],
        ["aṅganā", "a woman of well-rounded limbs, a woman"],
      ],
    },
  },

  93: {
    gloss: "Abiding Within The Kula",
    translation:
      "She has her seat inside the kula itself, not somewhere outside it looking on.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding inside the kula",
      vigraha: "kulasya ante sthā",
      children: [
        {
          iast: "kulānta",
          type: "tatpuruṣa",
          gloss: "the interior of the kula",
          vigraha: "kulasya antaḥ",
          children: [
            ["kula", "family, lineage; the tantric assembly"],
            ["anta", "the inner part, inside"],
          ],
        },
        ["stha", "standing, abiding in"],
      ],
    },
  },

  94: {
    gloss: "She Of The Kaula Way",
    translation:
      "The left-hand path that takes the whole body and the whole world as material for worship belongs to her.",
    note: "A taddhita derivative of kula rather than a compound: kaula with the feminine suffix, she who belongs to the Kaula observance.",
  },

  95: {
    gloss: "The Yoginī Of The Kula",
    translation:
      "Among the powers that make up the kula she is the yoginī, the one whose practice joins them into one.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the yoginī who belongs to the kula",
      vigraha: "kulasya yoginī",
      children: [
        ["kula", "family, lineage; the tantric assembly"],
        ["yoginī", "a woman practised in yoga, a goddess of power"],
      ],
    },
  },

  96: {
    gloss: "Beyond The Kula",
    translation:
      "Above the whole ordered assembly of powers is a place where the ordering stops, and she is there too.",
    note: "A negative compound: read as a nañ-tatpuruṣa, she who is not the kula, though it can equally be taken as a bahuvrīhi, she for whom there is no kula.",
    compound: {
      type: "tatpuruṣa",
      gloss: "not the kula, beyond the assembly of powers",
      vigraha: "na kulam",
      children: [
        ["a", "not, un-"],
        ["kula", "family, lineage; the tantric assembly"],
      ],
    },
  },

  97: {
    gloss: "Abiding Within The Samaya",
    translation:
      "The inward discipline that dispenses with outward rite is where she is found.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding within the samaya observance",
      vigraha: "samayasya ante sthā",
      children: [
        {
          iast: "samayānta",
          type: "tatpuruṣa",
          gloss: "the inside of the samaya",
          vigraha: "samayasya antaḥ",
          children: [
            ["samaya", "agreement, established observance, convention"],
            ["anta", "the inner part, inside"],
          ],
        },
        ["stha", "standing, abiding in"],
      ],
    },
  },

  98: {
    gloss: "Devoted To The Samaya Practice",
    translation:
      "Of the two ways of worshipping her she is herself given over to the inward one.",
    compound: {
      type: "tatpuruṣa",
      gloss: "wholly given to the observance of the samaya",
      vigraha: "samayācāre tatparā",
      children: [
        {
          iast: "samayācāra",
          type: "tatpuruṣa",
          gloss: "the conduct prescribed by the samaya",
          vigraha: "samayasya ācāraḥ",
          children: [
            ["samaya", "agreement, established observance"],
            ["ācāra", "conduct, customary practice, rule of behaviour"],
          ],
        },
        ["tatpara", "wholly devoted to, intent upon"],
      ],
    },
  },

  99: {
    gloss: "Whose One Seat Is The Root Centre",
    translation:
      "At the base of the spine is the centre she calls her single dwelling, the ground on which the rest is built.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose sole abode is the root-support centre",
      vigraha: "mūlādhāra ekanilayo yasyāḥ sā",
      children: [
        {
          iast: "mūlādhāra",
          type: "tatpuruṣa",
          gloss: "the support at the root, the lowest centre of the body",
          vigraha: "mūlasya ādhāraḥ",
          children: [
            ["mūla", "root, base, foundation"],
            ["ādhāra", "support, that which holds up"],
          ],
        },
        {
          iast: "ekanilaya",
          type: "karmadhāraya",
          gloss: "one single dwelling",
          vigraha: "ekaś cāsau nilayaś ca",
          children: [
            ["eka", "one, single, sole"],
            ["nilaya", "resting place, dwelling, abode"],
          ],
        },
      ],
    },
  },

  100: {
    gloss: "Who Cuts The Knot Of Brahmā",
    translation:
      "The first of the three knots that hold the rising energy down is untied by her, and the way upward opens.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who splits open the knot of Brahmā",
      vigraha: "brahmagranther vibhedinī",
      children: [
        {
          iast: "brahmagranthi",
          type: "tatpuruṣa",
          gloss: "the knot of Brahmā, the lowest of the three obstructions",
          vigraha: "brahmaṇo granthiḥ",
          children: [
            ["brahman", "Brahmā, the creator"],
            ["granthi", "a knot, a tie difficult to undo"],
          ],
        },
        ["vibhedin", "piercing, splitting apart, breaking through"],
      ],
    },
  },
};
