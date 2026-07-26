/**
 * Nāmas 201–300.
 *
 * Word meanings are grounded in Monier-Williams (1899); the glosses,
 * translations and compound analyses are written fresh for this dataset.
 *
 * Two conventions run through the batch. A name ending in a masculine or
 * neuter noun but inflected as a feminine (mahā-balā, from n. bala) is read as
 * a bahuvrīhi, since only the possessive reading explains the gender shift.
 * The suffixes -maya and -ātmaka are taddhita derivatives rather than true
 * final members, so X-mayī and X-ātmikā are entered as tatpuruṣas whose
 * vigraha paraphrases them with svarūpā, "having X for her nature".
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  201: {
    gloss: "Giver Of The Good Path",
    translation:
      "She hands the worshipper the good destiny that no effort of his own could reach.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows a happy destination",
      vigraha: "sadgatiṃ pradadātīti sadgatipradā",
      children: [
        {
          iast: "sadgati",
          type: "karmadhāraya",
          gloss: "the good course",
          vigraha: "satī cāsau gatiś ca",
          children: [
            ["sat", "good, real, true"],
            ["gati", "going, course, the state one goes to"],
          ],
        },
        ["pradā", "giving, bestowing"],
      ],
    },
  },
  202: {
    gloss: "Sovereign Of All",
    translation:
      "Nothing whatever stands outside her rule, so every other lordship is a share of hers.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of all things",
      vigraha: "sarveṣām īśvarī",
      children: [
        ["sarva", "all, every, the whole"],
        ["īśvarī", "sovereign lady, mistress"],
      ],
    },
  },
  203: {
    gloss: "She Who Consists Of All",
    translation:
      "The world is not something she made and left behind: it is the substance she has taken on.",
    compound: {
      type: "tatpuruṣa",
      gloss: "made of everything",
      vigraha: "sarvasya vikāra iti sarvamayī, sarvasvarūpā",
      children: [
        ["sarva", "all, everything"],
        ["maya", "made of, consisting of"],
      ],
    },
  },
  204: {
    gloss: "Very Form Of All Mantras",
    translation:
      "Every syllable uttered as a mantra is her own body of sound, whatever deity it names.",
    note: "The possessive force sits in the suffix -in, so the compound proper is sarvamantrasvarūpa and svarūpiṇī is a taddhita derivative built on it. The name is also commonly read as a bahuvrīhi, she who has all mantras for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she whose proper form is all mantras",
      vigraha: "sarveṣāṃ mantrāṇāṃ svarūpiṇī",
      children: [
        {
          iast: "sarvamantra",
          type: "karmadhāraya",
          gloss: "all mantras",
          vigraha: "sarve ca te mantrāś ca",
          children: [
            ["sarva", "all, every"],
            ["mantra", "sacred formula, instrument of thought"],
          ],
        },
        {
          iast: "svarūpiṇī",
          type: "karmadhāraya",
          gloss: "having as her very own form",
          vigraha: "svaṃ rūpam asyā astīti svarūpiṇī",
          children: [
            ["sva", "own, proper to oneself"],
            ["rūpa", "form, shape, nature"],
          ],
        },
      ],
    },
  },
  205: {
    gloss: "Soul Of Every Yantra",
    translation:
      "A drawn diagram is only lines until she inhabits it as its living self.",
    note: "ātmikā is the feminine of the -ka derivative ātmaka, and it is the suffix that supplies the having; the base compound is sarvayantrātman. Read the other way the name is a bahuvrīhi, she whose self is every yantra.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is the self of all ritual diagrams",
      vigraha: "sarveṣāṃ yantrāṇām ātmikā, sarvayantrasvarūpā",
      children: [
        {
          iast: "sarvayantra",
          type: "karmadhāraya",
          gloss: "all yantras",
          vigraha: "sarvāṇi ca tāni yantrāṇi ca",
          children: [
            ["sarva", "all, every"],
            ["yantra", "instrument of restraint; a mystic diagram"],
          ],
        },
        ["ātmikā", "having the nature or self of"],
      ],
    },
  },
  206: {
    gloss: "Whose Form Is All Tantra",
    translation:
      "The whole tantric revelation, root text and ritual alike, is the shape she wears.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is every tantra",
      vigraha: "sarvāṇi tantrāṇi rūpaṃ yasyāḥ sā",
      children: [
        {
          iast: "sarvatantra",
          type: "karmadhāraya",
          gloss: "all the tantras",
          vigraha: "sarvāṇi ca tāni tantrāṇi ca",
          children: [
            ["sarva", "all, entire"],
            ["tantra", "loom, framework; a scripture of the tantric canon"],
          ],
        },
        ["rūpa", "form, appearance"],
      ],
    },
  },
  207: {
    gloss: "Mind Beyond Mind",
    translation:
      "At the top of the ladder of sound she is the state in which thinking has passed out of itself.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mind's own transcendence of mind",
      vigraha: "manasa unmanī, manaso 'py atītāvasthā",
      children: [
        ["manas", "mind, the thinking faculty"],
        ["unmanī", "she who is out of mind, raised past thought"],
      ],
    },
  },
  208: {
    gloss: "Consort Of The Great Lord",
    translation:
      "Named from Maheśvara himself, she is the sovereign power without which the great lord would not act.",
    note: "vṛddhi derivative on maheśvara; the members can also be taken directly as mahā- and īśvarī",
    compound: {
      type: "karmadhāraya",
      gloss: "the great sovereign lady",
      vigraha: "mahatī cāsāv īśvarī ceti māheśvarī",
      children: [
        ["mahā", "great, mighty"],
        ["īśvarī", "sovereign lady, mistress"],
      ],
    },
  },
  209: {
    gloss: "The Great Goddess",
    translation:
      "Of all the goddesses she is the one from whom the title itself derives.",
    compound: {
      type: "karmadhāraya",
      gloss: "the goddess who is great",
      vigraha: "mahatī cāsau devī ca",
      children: [
        ["mahā", "great"],
        ["devī", "goddess, shining one"],
      ],
    },
  },
  210: {
    gloss: "The Great Lakṣmī",
    translation:
      "As Mahālakṣmī she is fortune at its source, not the small luck that comes and goes.",
    compound: {
      type: "karmadhāraya",
      gloss: "Lakṣmī in her great form",
      vigraha: "mahatī cāsau lakṣmīś ca",
      children: [
        ["mahā", "great"],
        ["lakṣmī", "Lakṣmī, good fortune, prosperity"],
      ],
    },
  },
  211: {
    gloss: "Beloved Of Mṛḍa",
    translation:
      "She is dear to Śiva under the name he bears when he is merciful.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the beloved of the gracious one",
      vigraha: "mṛḍasya priyā",
      children: [
        ["mṛḍa", "the gracious or merciful one, Śiva"],
        ["priyā", "beloved woman, wife"],
      ],
    },
  },
  212: {
    gloss: "Of Vast Form",
    translation:
      "Her body is measured only by the extent of what exists.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is great",
      vigraha: "mahad rūpaṃ yasyāḥ sā",
      children: [
        ["mahā", "great, vast"],
        ["rūpa", "form, body"],
      ],
    },
  },
  213: {
    gloss: "Supremely Worshipful",
    translation:
      "Worship offered anywhere else reaches its proper object only in her.",
    compound: {
      type: "karmadhāraya",
      gloss: "greatly to be worshipped",
      vigraha: "mahatī cāsau pūjyā ca",
      children: [
        ["mahā", "great, in a high degree"],
        ["pūjyā", "to be honoured, worthy of worship"],
      ],
    },
  },
  214: {
    gloss: "Destroyer Of Great Sins",
    translation:
      "Even the crimes that no expiation covers are burned away in her presence.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys the great sins",
      vigraha: "mahāpātakāni nāśayatīti mahāpātakanāśinī",
      children: [
        {
          iast: "mahāpātaka",
          type: "karmadhāraya",
          gloss: "a mortal sin",
          vigraha: "mahac ca tat pātakaṃ ca",
          children: [
            ["mahā", "great, grievous"],
            ["pātaka", "that which makes one fall, sin, crime"],
          ],
        },
        ["nāśinī", "destroying, doing away with"],
      ],
    },
  },
  215: {
    gloss: "The Great Illusion",
    translation:
      "The power that makes one appear as many is not a defect in the world but her deliberate art.",
    compound: {
      type: "karmadhāraya",
      gloss: "the great magical power",
      vigraha: "mahatī cāsau māyā ca",
      children: [
        ["mahā", "great"],
        ["māyā", "supernatural artifice, illusion-making power"],
      ],
    },
  },
  216: {
    gloss: "Of Great Being",
    translation:
      "Purity, courage and sheer existence are in her without measure.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who possesses great being",
      vigraha: "mahat sattvaṃ yasyāḥ sā",
      children: [
        ["mahā", "great, abundant"],
        ["sattva", "being, essence; the strand of purity and strength"],
      ],
    },
  },
  217: {
    gloss: "The Great Power",
    translation:
      "Every capacity that anything has to act is a fragment lent out of her.",
    compound: {
      type: "karmadhāraya",
      gloss: "the power that is great",
      vigraha: "mahatī cāsau śaktiś ca",
      children: [
        ["mahā", "great"],
        ["śakti", "power, ability, energy"],
      ],
    },
  },
  218: {
    gloss: "The Great Delight",
    translation:
      "The pleasure in which lover and beloved forget the difference between them is hers.",
    compound: {
      type: "karmadhāraya",
      gloss: "the great pleasure",
      vigraha: "mahatī cāsau ratiś ca",
      children: [
        ["mahā", "great"],
        ["rati", "rest, delight, the pleasure of love"],
      ],
    },
  },
  219: {
    gloss: "Of Boundless Enjoyment",
    translation:
      "What is offered to her she truly enjoys, and her capacity for it has no floor.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose enjoyment is vast",
      vigraha: "mahān bhogo yasyāḥ sā",
      children: [
        ["mahā", "great, vast"],
        ["bhoga", "enjoyment, the experiencing of what is offered"],
      ],
    },
  },
  220: {
    gloss: "Of Great Sovereignty",
    translation:
      "The eight powers that yogins strain toward are simply the ordinary furniture of her rule.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who holds great dominion",
      vigraha: "mahad aiśvaryaṃ yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["aiśvarya", "lordship, dominion, superhuman power"],
      ],
    },
  },
  221: {
    gloss: "Of Great Potency",
    translation:
      "Her valour is the force behind every act of heroism anyone else performs.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose virile force is great",
      vigraha: "mahad vīryaṃ yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["vīrya", "manly force, valour, generative potency"],
      ],
    },
  },
  222: {
    gloss: "Of Great Strength",
    translation:
      "Strength does not have to be summoned in her, since she is where it comes from.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who possesses great strength",
      vigraha: "mahad balaṃ yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["bala", "strength, force, might"],
      ],
    },
  },
  223: {
    gloss: "The Great Intelligence",
    translation:
      "The faculty by which anything at all is understood is her own discernment at work.",
    compound: {
      type: "karmadhāraya",
      gloss: "intelligence in its great form",
      vigraha: "mahatī cāsau buddhiś ca",
      children: [
        ["mahā", "great"],
        ["buddhi", "intelligence, reason, judgement"],
      ],
    },
  },
  224: {
    gloss: "The Great Attainment",
    translation:
      "Lesser accomplishments are steps; she is the arrival that makes them worth taking.",
    compound: {
      type: "karmadhāraya",
      gloss: "the great success or perfection",
      vigraha: "mahatī cāsau siddhiś ca",
      children: [
        ["mahā", "great"],
        ["siddhi", "accomplishment, attainment, perfection"],
      ],
    },
  },
  225: {
    gloss: "Sovereign Over The Masters Of Yoga",
    translation:
      "Those whom other yogins call master themselves look up to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of the great lords of yoga",
      vigraha: "mahatāṃ yogeśvarāṇām īśvarī",
      children: [
        {
          iast: "mahāyogeśvara",
          type: "karmadhāraya",
          gloss: "a great master of yoga",
          vigraha: "mahāṃś cāsau yogeśvaraś ca",
          children: [
            ["mahā", "great"],
            {
              iast: "yogeśvara",
              type: "tatpuruṣa",
              gloss: "lord of yoga",
              vigraha: "yogasyeśvaraḥ",
              children: [
                ["yoga", "yoking, disciplined practice, union"],
                ["īśvara", "lord, one who is able"],
              ],
            },
          ],
        },
        ["īśvarī", "sovereign lady"],
      ],
    },
  },
  226: {
    gloss: "Mistress Of The Great Tantra",
    translation:
      "The great tantras are hers in the way a system belongs to the one it describes.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the great tantra belongs",
      vigraha: "mahat tantraṃ yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["tantra", "framework, doctrine, tantric scripture"],
      ],
    },
  },
  227: {
    gloss: "Mistress Of The Great Mantra",
    translation:
      "The fifteen-syllabled formula that summons her is her own possession before it is anyone's practice.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose mantra is the great one",
      vigraha: "mahān mantro yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["mantra", "sacred formula"],
      ],
    },
  },
  228: {
    gloss: "Mistress Of The Great Yantra",
    translation:
      "The nine-triangled diagram is not a picture of her dwelling but a thing she owns and occupies.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose diagram is the great one",
      vigraha: "mahad yantraṃ yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["yantra", "device, mystic diagram"],
      ],
    },
  },
  229: {
    gloss: "Enthroned On The Great Seat",
    translation:
      "The seat beneath her is itself of cosmic size, built of gods who serve as its frame.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is great",
      vigraha: "mahad āsanaṃ yasyāḥ sā",
      children: [
        ["mahā", "great"],
        ["āsana", "seat, throne, posture of sitting"],
      ],
    },
  },
  230: {
    gloss: "Worshipped By The Great Rite",
    translation:
      "She is reached through the full sequence of the great sacrifice, performed in its proper order and not in fragments.",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be propitiated by the order of the great sacrifice",
      vigraha: "mahāyāgakrameṇārādhyā",
      children: [
        {
          iast: "mahāyāgakrama",
          type: "tatpuruṣa",
          gloss: "the ritual sequence of the great sacrifice",
          vigraha: "mahāyāgasya kramaḥ",
          children: [
            {
              iast: "mahāyāga",
              type: "karmadhāraya",
              gloss: "the great sacrifice",
              vigraha: "mahāṃś cāsau yāgaś ca",
              children: [
                ["mahā", "great"],
                ["yāga", "offering, sacrifice, ceremony of oblation"],
              ],
            },
            ["krama", "step, prescribed succession, ritual order"],
          ],
        },
        ["ārādhyā", "to be propitiated, worthy of being worshipped"],
      ],
    },
  },
  231: {
    gloss: "Worshipped By Great Bhairava",
    translation:
      "Śiva in his most terrifying form sets his terror aside to worship her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is worshipped by the great Bhairava",
      vigraha: "mahābhairaveṇa pūjitā",
      children: [
        {
          iast: "mahābhairava",
          type: "karmadhāraya",
          gloss: "the great Bhairava",
          vigraha: "mahāṃś cāsau bhairavaś ca",
          children: [
            ["mahā", "great"],
            ["bhairava", "the frightful one, Śiva in his fierce aspect"],
          ],
        },
        ["pūjita", "honoured, worshipped"],
      ],
    },
  },
  232: {
    gloss: "Witness Of Śiva's Dance At The Great Dissolution",
    translation:
      "When the worlds end and Śiva dances them out of existence, she alone remains as the onlooker.",
    compound: {
      type: "tatpuruṣa",
      gloss: "witness of the great tāṇḍava of Maheśvara at the great dissolution",
      vigraha: "maheśvarasya mahākalpe mahātāṇḍavasya sākṣiṇī",
      children: [
        {
          iast: "maheśvara",
          type: "karmadhāraya",
          gloss: "the great lord, Śiva",
          vigraha: "mahāṃś cāsāv īśvaraś ca",
          children: [
            ["mahā", "great"],
            ["īśvara", "lord, ruler"],
          ],
        },
        {
          iast: "mahākalpa",
          type: "karmadhāraya",
          gloss: "the great world-period ending in dissolution",
          vigraha: "mahāṃś cāsau kalpaś ca",
          children: [
            ["mahā", "great"],
            ["kalpa", "a world-age, the span between creation and dissolution"],
          ],
        },
        {
          iast: "mahātāṇḍava",
          type: "karmadhāraya",
          gloss: "the great frenzied dance",
          vigraha: "mahac ca tat tāṇḍavaṃ ca",
          children: [
            ["mahā", "great"],
            ["tāṇḍava", "violent dance, the dance of Śiva"],
          ],
        },
        ["sākṣiṇī", "eye-witness, she who looks on"],
      ],
    },
  },
  233: {
    gloss: "Queen Of Great Kāmeśa",
    translation:
      "She is the consecrated queen of the lord of desire, sharing his throne rather than attending on it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the crowned consort of the great lord of desire",
      vigraha: "mahākāmeśasya mahiṣī",
      children: [
        {
          iast: "mahākāmeśa",
          type: "karmadhāraya",
          gloss: "the great lord of desire",
          vigraha: "mahāṃś cāsau kāmeśaś ca",
          children: [
            ["mahā", "great"],
            {
              iast: "kāmeśa",
              type: "tatpuruṣa",
              gloss: "lord of desire",
              vigraha: "kāmasyeśaḥ",
              children: [
                ["kāma", "desire, love"],
                ["īśa", "lord, master"],
              ],
            },
          ],
        },
        ["mahiṣī", "consecrated queen, chief wife of a king"],
      ],
    },
  },
  234: {
    gloss: "Great Beauty Of The Three Cities",
    translation:
      "Under this name she is worshipped as the loveliness that presides over the three cities of waking, dream and sleep.",
    compound: {
      type: "karmadhāraya",
      gloss: "the great Tripurasundarī",
      vigraha: "mahatī cāsau tripurasundarī ca",
      children: [
        ["mahā", "great"],
        {
          iast: "tripurasundarī",
          type: "tatpuruṣa",
          gloss: "the beautiful one of the three cities",
          vigraha: "tripureṣu sundarī",
          children: [
            {
              iast: "tripura",
              type: "dvigu",
              gloss: "the three cities",
              vigraha: "trayāṇāṃ purāṇāṃ samāhāraḥ",
              children: [
                ["tri", "three"],
                ["pura", "city, fortress, stronghold"],
              ],
            },
            ["sundarī", "beautiful woman"],
          ],
        },
      ],
    },
  },
  235: {
    gloss: "Rich In Sixty-Four Services",
    translation:
      "The full ritual courtesy of sixty-four attentions, from welcome to farewell, is lavished on her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abounding in the sixty-four acts of ritual attendance",
      vigraha: "catuḥṣaṣṭyupacārair āḍhyā",
      children: [
        {
          iast: "catuḥṣaṣṭyupacāra",
          type: "dvigu",
          gloss: "the sixty-four services of worship",
          vigraha: "catuḥṣaṣṭir upacārāḥ",
          children: [
            ["catuḥṣaṣṭi", "sixty-four"],
            ["upacāra", "approach, attendance, act of ritual service"],
          ],
        },
        ["āḍhya", "rich in, abundantly furnished with"],
      ],
    },
  },
  236: {
    gloss: "Made Of The Sixty-Four Arts",
    translation:
      "Every craft and skill counted among the sixty-four arts is a portion of her substance.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of the sixty-four arts",
      vigraha: "catuḥṣaṣṭikalānāṃ vikāra iti catuḥṣaṣṭikalāmayī",
      children: [
        {
          iast: "catuḥṣaṣṭikalā",
          type: "dvigu",
          gloss: "the sixty-four arts",
          vigraha: "catuḥṣaṣṭiḥ kalāḥ",
          children: [
            ["catuḥṣaṣṭi", "sixty-four"],
            ["kalā", "a part or portion; a skill, one of the fine arts"],
          ],
        },
        ["maya", "made of, consisting of"],
      ],
    },
  },
  237: {
    gloss: "Served By Sixty-Four Crore Yoginīs",
    translation:
      "An uncountable retinue of yoginīs, reckoned at sixty-four crores, waits upon her in troops.",
    compound: {
      type: "tatpuruṣa",
      gloss: "attended by the hosts of the great sixty-four crore yoginīs",
      vigraha: "mahatībhiś catuḥṣaṣṭikoṭiyoginīgaṇaiḥ sevitā",
      children: [
        ["mahā", "great"],
        {
          iast: "catuḥṣaṣṭikoṭi",
          type: "dvigu",
          gloss: "sixty-four crores",
          vigraha: "catuḥṣaṣṭiḥ koṭayaḥ",
          children: [
            ["catuḥṣaṣṭi", "sixty-four"],
            ["koṭi", "the highest point; ten million, a crore"],
          ],
        },
        {
          iast: "yoginīgaṇa",
          type: "tatpuruṣa",
          gloss: "a troop of yoginīs",
          vigraha: "yoginīnāṃ gaṇaḥ",
          children: [
            ["yoginī", "female adept possessed of magical power"],
            ["gaṇa", "troop, flock, attendant host"],
          ],
        },
        ["sevita", "waited upon, served, frequented"],
      ],
    },
  },
  238: {
    gloss: "The Vidyā Of Manu",
    translation:
      "She is the secret formula in the recension that Manu handed down.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the esoteric knowledge taught by Manu",
      vigraha: "manunopadiṣṭā vidyā",
      children: [
        ["manu", "Manu, the first man and lawgiver; also a sacred formula"],
        ["vidyā", "knowledge, science; an esoteric mantra"],
      ],
    },
  },
  239: {
    gloss: "The Vidyā Of Candra",
    translation:
      "She is equally the formula in the line of transmission that goes back to the moon.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the esoteric knowledge received from Candra",
      vigraha: "candreṇopadiṣṭā vidyā",
      children: [
        ["candra", "the moon, Candra"],
        ["vidyā", "knowledge; an esoteric mantra"],
      ],
    },
  },
  240: {
    gloss: "Dwelling In The Moon's Orb",
    translation:
      "She is to be found at the very centre of the lunar disc, where its coolness gathers.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who abides at the centre of the moon's disc",
      vigraha: "candramaṇḍalasya madhye gacchatīti",
      children: [
        {
          iast: "candramaṇḍala",
          type: "tatpuruṣa",
          gloss: "the orb of the moon",
          vigraha: "candrasya maṇḍalam",
          children: [
            ["candra", "moon"],
            ["maṇḍala", "disk, orb, circle"],
          ],
        },
        {
          iast: "madhyagā",
          type: "tatpuruṣa",
          gloss: "she who goes or stays in the middle",
          vigraha: "madhye gacchatīti madhyagā",
          children: [
            ["madhya", "middle, centre"],
            ["ga", "going, abiding in"],
          ],
        },
      ],
    },
  },
  241: {
    gloss: "Of Lovely Form",
    translation:
      "Her shape is beautiful in the plain sense, pleasing to whoever is granted sight of it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is beautiful",
      vigraha: "cāru rūpaṃ yasyāḥ sā",
      children: [
        ["cāru", "agreeable, lovely, dear"],
        ["rūpa", "form, appearance"],
      ],
    },
  },
  242: {
    gloss: "Of Lovely Smile",
    translation:
      "The smile she wears is itself the reassurance her worshippers come for.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose smile is charming",
      vigraha: "cāru hāso yasyāḥ sā",
      children: [
        ["cāru", "lovely, pleasing"],
        ["hāsa", "laughter, smile"],
      ],
    },
  },
  243: {
    gloss: "Wearing The Lovely Crescent",
    translation:
      "Like Śiva she carries a sliver of moon, and on her it is an ornament rather than a mark of austerity.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the beautiful digit of the moon",
      vigraha: "cārvīṃ candrakalāṃ dharatīti",
      children: [
        {
          iast: "cārucandrakalā",
          type: "karmadhāraya",
          gloss: "the lovely crescent moon",
          vigraha: "cārvī cāsau candrakalā ca",
          children: [
            ["cāru", "lovely, beautiful"],
            {
              iast: "candrakalā",
              type: "tatpuruṣa",
              gloss: "a digit of the moon",
              vigraha: "candrasya kalā",
              children: [
                ["candra", "moon"],
                ["kalā", "a sixteenth part, a digit of the moon"],
              ],
            },
          ],
        },
        ["dharā", "bearing, holding, wearing"],
      ],
    },
  },
  244: {
    gloss: "Mistress Of The Moving And Unmoving World",
    translation:
      "Beasts and stones alike fall under one rule, and that rule is hers.",
    compound: {
      type: "tatpuruṣa",
      gloss: "sovereign of the world of moving and stationary beings",
      vigraha: "carācarasya jagato nāthā",
      children: [
        {
          iast: "carācarajagat",
          type: "karmadhāraya",
          gloss: "the world of the animate and the inanimate",
          vigraha: "carācaraṃ ca tat jagac ca",
          children: [
            {
              iast: "carācara",
              type: "dvandva",
              gloss: "the moving and the unmoving",
              vigraha: "caraś cācaraś ca",
              children: [
                ["cara", "moving, locomotive, animate"],
                ["acara", "not moving, fixed, inanimate"],
              ],
            },
            ["jagat", "that which moves, the world"],
          ],
        },
        ["nāthā", "mistress, protectress"],
      ],
    },
  },
  245: {
    gloss: "Dwelling In The King Of Cakras",
    translation:
      "Her residence is the Śrīcakra, which outranks every other diagram as a king outranks his subjects.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose dwelling is the sovereign cakra",
      vigraha: "cakrarājo niketanaṃ yasyāḥ sā",
      children: [
        {
          iast: "cakrarāja",
          type: "tatpuruṣa",
          gloss: "the king among cakras",
          vigraha: "cakrāṇāṃ rājā",
          children: [
            ["cakra", "wheel, circle, mystic diagram"],
            ["rāja", "king, sovereign"],
          ],
        },
        ["niketana", "house, dwelling, abode"],
      ],
    },
  },
  246: {
    gloss: "Daughter Of The Mountain",
    translation:
      "Born to Himavat, she takes her name from the rock she was born of and keeps its steadiness.",
    note: "vṛddhi derivative of parvata, 'mountain'; not a compound",
  },
  247: {
    gloss: "Lotus-Eyed",
    translation:
      "Her eyes have the shape, breadth and freshness of an opened lotus.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose eyes are lotuses",
      vigraha: "padme iva nayane yasyāḥ sā",
      children: [
        ["padma", "lotus"],
        ["nayana", "the eye, that which leads"],
      ],
    },
  },
  248: {
    gloss: "Radiant As A Ruby",
    translation:
      "Her complexion throws off the same deep red light as a ruby held against the sun.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose radiance equals that of a ruby",
      vigraha: "padmarāgasamā prabhā yasyāḥ sā",
      children: [
        {
          iast: "padmarāgasama",
          type: "tatpuruṣa",
          gloss: "equal to a ruby",
          vigraha: "padmarāgeṇa samaḥ",
          children: [
            {
              iast: "padmarāga",
              type: "bahuvrīhi",
              gloss: "the lotus-hued stone, a ruby",
              vigraha: "padmasyeva rāgo yasya saḥ",
              children: [
                ["padma", "lotus"],
                ["rāga", "colour, redness, hue"],
              ],
            },
            ["sama", "equal, like, matching"],
          ],
        },
        ["prabhā", "light, splendour, radiance"],
      ],
    },
  },
  249: {
    gloss: "Seated On The Couch Of Five Corpses",
    translation:
      "Her couch rests on five gods who lie inert beneath her, alive only insofar as she animates them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "seated on the couch made of the five corpses",
      vigraha: "pañcapretāsane āsīnā",
      children: [
        {
          iast: "pañcapretāsana",
          type: "tatpuruṣa",
          gloss: "the seat formed of five corpses",
          vigraha: "pañcapretānām āsanam",
          children: [
            {
              iast: "pañcapreta",
              type: "dvigu",
              gloss: "the five corpses",
              vigraha: "pañca pretāḥ",
              children: [
                ["pañca", "five"],
                ["preta", "one departed, a corpse"],
              ],
            },
            ["āsana", "seat, couch"],
          ],
        },
        ["āsīnā", "seated, sitting"],
      ],
    },
  },
  250: {
    gloss: "Embodiment Of The Five Brahmās",
    translation:
      "The five gods charged with creating, sustaining, dissolving, concealing and blessing are so many aspects of her single form.",
    note: "Taken as a taddhita in -in on the compound pañcabrahmasvarūpa, the suffix rather than the compound carrying the possession. The bahuvrīhi reading, she who has the five Brahmās for her form, is equally current.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she whose own form is the five Brahmās",
      vigraha: "pañcabrahmaṇāṃ svarūpiṇī",
      children: [
        {
          iast: "pañcabrahma",
          type: "dvigu",
          gloss: "the five Brahmās",
          vigraha: "pañca brahmāṇaḥ",
          children: [
            ["pañca", "five"],
            ["brahman", "Brahmā; the sacred power"],
          ],
        },
        {
          iast: "svarūpiṇī",
          type: "karmadhāraya",
          gloss: "having as her own form",
          vigraha: "svaṃ rūpam asyā astīti svarūpiṇī",
          children: [
            ["sva", "own"],
            ["rūpa", "form, nature"],
          ],
        },
      ],
    },
  },
  251: {
    gloss: "Made Of Consciousness",
    translation:
      "Whatever she is made of, it is not matter but the awareness by which matter is known.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of pure consciousness",
      vigraha: "cito vikāra iti cinmayī, citsvarūpā",
      children: [
        ["cit", "consciousness, the faculty of knowing"],
        ["maya", "made of, consisting of"],
      ],
    },
  },
  252: {
    gloss: "Filled With Highest Bliss",
    translation:
      "The joy in her is the unbroken kind that the Upaniṣads set above every pleasure that has a cause.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose bliss is the supreme one",
      vigraha: "paramaḥ ānando yasyāḥ sā",
      children: [
        ["parama", "highest, supreme"],
        ["ānanda", "bliss, joy"],
      ],
    },
  },
  253: {
    gloss: "Solid Mass Of Knowing",
    translation:
      "She has the density the Upaniṣads ascribe to pure knowing, with no gap in it where unconsciousness could lodge.",
    note: "The having is carried by -in, so what is compounded is vijñānaghanarūpa and rūpiṇī is derived from that; the alternative analysis, a bahuvrīhi meaning she who has the form of a mass of knowing, is well established.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the form of a compact mass of consciousness",
      vigraha: "vijñānaghanasya rūpam asyā astīti",
      children: [
        {
          iast: "vijñānaghana",
          type: "tatpuruṣa",
          gloss: "a solid mass of discerning awareness",
          vigraha: "vijñānasya ghanaḥ",
          children: [
            ["vijñāna", "discernment, understanding, consciousness"],
            ["ghana", "compact, solid, a dense mass"],
          ],
        },
        ["rūpiṇī", "having the form of"],
      ],
    },
  },
  254: {
    gloss: "Meditation, Meditator And Object",
    translation:
      "In her the three terms of contemplation collapse, since the one who meditates, the act and its object are the same.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is meditation, the meditator and the thing meditated on",
      vigraha: "dhyānaṃ dhyātā dhyeyaṃ ca rūpaṃ yasyāḥ sā",
      children: [
        {
          iast: "dhyānadhyātṛdhyeya",
          type: "dvandva",
          gloss: "meditation, meditator and object of meditation",
          vigraha: "dhyānaṃ ca dhyātā ca dhyeyaṃ ca",
          children: [
            ["dhyāna", "meditation, sustained contemplation"],
            ["dhyātṛ", "one who meditates"],
            ["dhyeya", "that which is to be meditated on"],
          ],
        },
        ["rūpa", "form, nature"],
      ],
    },
  },
  255: {
    gloss: "Beyond Merit And Demerit",
    translation:
      "The moral ledger that binds everyone else has no entry for her, since she is what the ledger is kept in.",
    compound: {
      type: "tatpuruṣa",
      gloss: "free of both righteousness and its opposite",
      vigraha: "dharmādharmābhyāṃ vivarjitā",
      children: [
        {
          iast: "dharmādharma",
          type: "dvandva",
          gloss: "right and wrong",
          vigraha: "dharmaś cādharmaś ca",
          children: [
            ["dharma", "law, duty, merit"],
            ["adharma", "lawlessness, demerit"],
          ],
        },
        ["vivarjita", "avoided, free from, destitute of"],
      ],
    },
  },
  256: {
    gloss: "Whose Form Is The Universe",
    translation:
      "Looked at rightly, the universe is not her handiwork but her body.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has the whole world for her form",
      vigraha: "viśvaṃ rūpaṃ yasyāḥ sā",
      children: [
        ["viśva", "all, whole, the universe"],
        ["rūpa", "form, body"],
      ],
    },
  },
  257: {
    gloss: "The Waking One",
    translation:
      "As waking she is the state in which the senses go out to a world spread before them.",
    note: "agent noun in -in from jāgara, 'waking', built on √jāgṛ; not a compound",
  },
  258: {
    gloss: "She Who Dreams",
    translation:
      "In dream she withdraws the senses and lights the scene from within instead.",
    pos: "participle",
    note: "feminine present participle of √svap, 'to sleep'; the participial stem is svapat-",
  },
  259: {
    gloss: "Whose Self Is Taijasa",
    translation:
      "The dreaming self that the Upaniṣads call Taijasa, lit by its own inner fire, is one of her selves.",
    note: "The -ka of ātmaka already means having, so taijasātman is the compound and ātmikā a secondary formation on it. Many read the name instead as a bahuvrīhi, she whose self is Taijasa.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the nature of the luminous dream-self",
      vigraha: "taijasasyātmikā, taijasasvarūpā",
      children: [
        ["taijasa", "made of light, luminous; the self in the dream state"],
        ["ātmikā", "having the nature or self of"],
      ],
    },
  },
  260: {
    gloss: "The Sleeping One",
    translation:
      "In dreamless sleep she rests as the state in which nothing at all is presented and nothing is lost.",
    pos: "participle",
    note: "past passive participle of √svap, 'to sleep'",
  },
  261: {
    gloss: "Whose Self Is Prājña",
    translation:
      "The self of deep sleep, wise because undivided, is likewise hers.",
    note: "As with the preceding pair of names, the possession is supplied by the suffix -ka, so the analysis here treats ātmikā as a derivative of prājñātman rather than as the final member of a bahuvrīhi meaning she whose self is Prājña.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the nature of the self in deep sleep",
      vigraha: "prājñasyātmikā, prājñasvarūpā",
      children: [
        ["prājña", "intelligent, wise; the self in dreamless sleep"],
        ["ātmikā", "having the nature or self of"],
      ],
    },
  },
  262: {
    gloss: "The Fourth",
    translation:
      "Past waking, dream and sleep she is simply the fourth, which has no content of its own to be named by.",
    pos: "adjective",
    note: "ordinal 'fourth', used substantively for the fourth state of consciousness",
  },
  263: {
    gloss: "Free Of Every State",
    translation:
      "Counting her as the fourth is a concession; strictly no condition at all can be laid over her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of all conditions",
      vigraha: "sarvābhir avasthābhir vivarjitā",
      children: [
        {
          iast: "sarvāvasthā",
          type: "karmadhāraya",
          gloss: "all states",
          vigraha: "sarvāś ca tā avasthāś ca",
          children: [
            ["sarva", "all, every"],
            ["avasthā", "state, condition, stage"],
          ],
        },
        ["vivarjita", "free from, deprived of"],
      ],
    },
  },
  264: {
    gloss: "Maker Of Creation",
    translation:
      "The first of the five cosmic acts is hers: she lets the worlds out of herself.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who performs creation",
      vigraha: "sṛṣṭeḥ kartrī",
      children: [
        ["sṛṣṭi", "letting go, emission, creation"],
        ["kartrī", "female maker, agent"],
      ],
    },
  },
  265: {
    gloss: "Whose Form Is Brahmā",
    translation:
      "When that creating is given a face and a name, the face is Brahmā's and the power behind it is hers.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has Brahmā for her form",
      vigraha: "brahmā rūpaṃ yasyāḥ sā",
      children: [
        ["brahman", "Brahmā, the god who creates"],
        ["rūpa", "form, shape"],
      ],
    },
  },
  266: {
    gloss: "The Protectress",
    translation:
      "The second act is preservation: what she has made she also guards and hides from harm.",
    note: "feminine agent noun in -trī from √gup, 'to guard'; not a compound",
  },
  267: {
    gloss: "Whose Form Is Govinda",
    translation:
      "That guarding wears the form of Viṣṇu, who goes after the worlds as a cowherd after his cattle.",
    note: "govindarūpa is the compound and the -in suffix does the possessing, which is why the name is classed as a tatpuruṣa here; a bahuvrīhi reading, she who has Govinda's form, is equally defensible.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the form of Govinda",
      vigraha: "govindasya rūpam asyā astīti",
      children: [
        {
          iast: "govinda",
          type: "tatpuruṣa",
          gloss: "finder of the cows, Viṣṇu",
          vigraha: "gā vindatīti govindaḥ",
          children: [
            ["go", "cow; the earth; a ray of light"],
            ["vinda", "finding, obtaining"],
          ],
        },
        ["rūpiṇī", "having the form of"],
      ],
    },
  },
  268: {
    gloss: "She Who Withdraws",
    translation:
      "The third act is retraction, drawing the worlds back into herself the way a breath is taken in.",
    note: "agent noun in -in from sam-√hṛ, 'to draw together, withdraw'; a prefixed verbal, not a compound",
  },
  269: {
    gloss: "Whose Form Is Rudra",
    translation:
      "That withdrawal shows itself as Rudra, the howling one whose terror is only her own act of gathering up.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has Rudra for her form",
      vigraha: "rudro rūpaṃ yasyāḥ sā",
      children: [
        ["rudra", "the howling one, Rudra"],
        ["rūpa", "form, shape"],
      ],
    },
  },
  270: {
    gloss: "Worker Of Concealment",
    translation:
      "The fourth act is the veil: she hides her own nature so that a world of separate beings can stand.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who brings about concealment",
      vigraha: "tirodhānaṃ karotīti tirodhānakarī",
      children: [
        ["tirodhāna", "covering, veiling, disappearance"],
        ["karī", "making, causing"],
      ],
    },
  },
  271: {
    gloss: "The Ruling Lady",
    translation:
      "In veiling she is called Īśvarī, the one able to hold the worlds under a rule they cannot see.",
    note: "feminine of īśvara, 'able, master'; not a compound",
  },
  272: {
    gloss: "Ever Auspicious",
    translation:
      "The fifth act is grace, and here she takes the form of Sadāśiva, whose kindness never lapses.",
    compound: {
      type: "karmadhāraya",
      gloss: "she who is always gracious",
      vigraha: "sadā śivā",
      children: [
        ["sadā", "always, at all times"],
        ["śiva", "auspicious, kindly; Śiva"],
      ],
    },
  },
  273: {
    gloss: "Bestower Of Grace",
    translation:
      "Grace is not owed and cannot be earned, which is why the giving of it is named as her own act.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who grants favour",
      vigraha: "anugrahaṃ dadātīti anugrahadā",
      children: [
        ["anugraha", "favour, kindness, grace"],
        ["dā", "giving, bestowing"],
      ],
    },
  },
  274: {
    gloss: "Devoted To The Five Acts",
    translation:
      "Creating, preserving, withdrawing, veiling and gracing are not five occupations but her single unbroken business.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose whole occupation is the five acts",
      vigraha: "pañca kṛtyāni parāyaṇaṃ yasyāḥ sā",
      children: [
        {
          iast: "pañcakṛtya",
          type: "dvigu",
          gloss: "the five cosmic functions",
          vigraha: "pañcānāṃ kṛtyānāṃ samāhāraḥ",
          children: [
            ["pañca", "five"],
            ["kṛtya", "what is to be done, a function"],
          ],
        },
        ["parāyaṇa", "chief resort, final aim, entire devotion"],
      ],
    },
  },
  275: {
    gloss: "Standing In The Sun's Orb",
    translation:
      "She stands at the heart of the solar disc as she does at the heart of the moon's, heat answering to coolness.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who stands at the centre of the sun's disc",
      vigraha: "bhānumaṇḍalasya madhye tiṣṭhatīti",
      children: [
        {
          iast: "bhānumaṇḍala",
          type: "tatpuruṣa",
          gloss: "the orb of the sun",
          vigraha: "bhānor maṇḍalam",
          children: [
            ["bhānu", "light, brightness, the sun"],
            ["maṇḍala", "disk, orb"],
          ],
        },
        {
          iast: "madhyasthā",
          type: "tatpuruṣa",
          gloss: "standing in the middle",
          vigraha: "madhye tiṣṭhatīti madhyasthā",
          children: [
            ["madhya", "middle, centre"],
            ["stha", "standing, abiding"],
          ],
        },
      ],
    },
  },
  276: {
    gloss: "The Terrible One",
    translation:
      "She answers to the fierce name as readily as to the gentle ones, for the two faces belong to one power.",
    note: "feminine of bhairava, 'frightful'; a name of the goddess in her fierce aspect, not a compound",
  },
  277: {
    gloss: "Garlanded With Excellences",
    translation:
      "The six perfections that make a being worth calling lord hang on her like a wreath.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who wears a garland of excellences",
      vigraha: "bhagānāṃ mālinī, bhagamālayā yuktā",
      children: [
        ["bhaga", "good fortune, excellence, lordly attribute"],
        ["mālinī", "wearing a garland"],
      ],
    },
  },
  278: {
    gloss: "Seated On The Lotus",
    translation:
      "Where the lotus is her seat she shows the mild aspect that Lakṣmī also wears.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is a lotus",
      vigraha: "padmam āsanaṃ yasyāḥ sā",
      children: [
        ["padma", "lotus"],
        ["āsana", "seat"],
      ],
    },
  },
  279: {
    gloss: "The Blessed One",
    translation:
      "She holds outright the fortune and majesty that the title bhagavatī reports.",
    note: "possessive -vat derivative of bhaga, 'good fortune, majesty'; not a compound",
  },
  280: {
    gloss: "Sister Of Viṣṇu",
    translation:
      "She and the lotus-navelled god came from one womb, which is why Viṣṇu ranks as her brother rather than her devotee.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the uterine sister of the lotus-navelled one",
      vigraha: "padmanābhasya sahodarī",
      children: [
        {
          iast: "padmanābha",
          type: "bahuvrīhi",
          gloss: "the lotus-navelled one, Viṣṇu",
          vigraha: "padmaṃ nābhau yasya saḥ",
          children: [
            ["padma", "lotus"],
            ["nābha", "navel"],
          ],
        },
        {
          iast: "sahodarī",
          type: "bahuvrīhi",
          gloss: "one born of the same womb, a sister",
          vigraha: "samānam udaraṃ yasyāḥ sā",
          children: [
            ["saha", "together with, the same (for samāna)"],
            ["udara", "belly, womb"],
          ],
        },
      ],
    },
  },
  281: {
    gloss: "Whose Blink Makes And Unmakes Worlds",
    translation:
      "Her eyes open and rows of worlds appear; they close and the same rows are gone.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whose opening and closing of the eyes the ranks of worlds arise and perish",
      vigraha: "unmeṣanimiṣābhyām utpannā vipannā ca bhuvanāvalī yasyāḥ sā",
      children: [
        {
          iast: "unmeṣanimiṣa",
          type: "dvandva",
          gloss: "the opening and shutting of the eyes",
          vigraha: "unmeṣaś ca nimiṣaś ca",
          children: [
            ["unmeṣa", "opening of the eyes, flashing forth"],
            ["nimiṣa", "shutting of the eyes, a wink"],
          ],
        },
        {
          iast: "utpannavipanna",
          type: "dvandva",
          gloss: "come into being and gone to ruin",
          vigraha: "utpannā ca vipannā ca",
          children: [
            ["utpanna", "arisen, produced"],
            ["vipanna", "perished, ruined, dead"],
          ],
        },
        {
          iast: "bhuvanāvalī",
          type: "tatpuruṣa",
          gloss: "the row of worlds",
          vigraha: "bhuvanānām āvalī",
          children: [
            ["bhuvana", "a world, a sphere of existence"],
            ["āvalī", "row, line, series"],
          ],
        },
      ],
    },
  },
  282: {
    gloss: "Thousand-Headed And Thousand-Faced",
    translation:
      "Like the cosmic person of the Vedic hymn she looks out of a thousand heads at once.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has a thousand heads and faces",
      vigraha: "sahasraṃ śīrṣāṇi vadanāni ca yasyāḥ sā",
      children: [
        ["sahasra", "a thousand"],
        {
          iast: "śīrṣavadana",
          type: "dvandva",
          gloss: "heads and faces",
          vigraha: "śīrṣāṇi ca vadanāni ca",
          children: [
            ["śīrṣan", "head"],
            ["vadana", "mouth, face"],
          ],
        },
      ],
    },
  },
  283: {
    gloss: "Thousand-Eyed",
    translation:
      "Nothing escapes notice when the seeing is done by a thousand eyes.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has a thousand eyes",
      vigraha: "sahasram akṣīṇi yasyāḥ sā",
      children: [
        ["sahasra", "a thousand"],
        ["akṣi", "eye"],
      ],
    },
  },
  284: {
    gloss: "Thousand-Footed",
    translation:
      "She stands everywhere at once, the whole earth being no wider than her stride.",
    stem: "sahasrapād",
    declension: "consonant stem",
    note: "bahuvrīhi in the root noun pād-; nominative singular sahasrapāt by final devoicing",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has a thousand feet",
      vigraha: "sahasraṃ pādā yasyāḥ sā",
      children: [
        ["sahasra", "a thousand"],
        ["pād", "foot"],
      ],
    },
  },
  285: {
    gloss: "Mother From Brahmā To The Worm",
    translation:
      "The creator god and the insect underfoot have the same mother, and she makes no distinction between them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mother of all beings from Brahmā down to the worm",
      vigraha: "ābrahma kīṭaparyantānāṃ sarveṣāṃ jananī",
      children: [
        {
          iast: "ābrahma",
          type: "avyayībhāva",
          gloss: "as far up as Brahmā",
          vigraha: "brahmāṇam abhivyāpya",
          children: [
            ["ā", "up to, as far as"],
            ["brahman", "Brahmā, the creator"],
          ],
        },
        ["kīṭa", "worm, insect, the lowliest creature"],
        ["jananī", "mother, she who brings to birth"],
      ],
    },
  },
  286: {
    gloss: "Ordainer Of Class And Stage Of Life",
    translation:
      "The divisions of society and the four stages of a life are arrangements she laid down.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who institutes the social orders and the stages of life",
      vigraha: "varṇāśramān vidadhātīti varṇāśramavidhāyinī",
      children: [
        {
          iast: "varṇāśrama",
          type: "dvandva",
          gloss: "social order and stage of life",
          vigraha: "varṇāś cāśramāś ca",
          children: [
            ["varṇa", "colour, class, social order"],
            ["āśrama", "hermitage; a stage in the life of a twice-born man"],
          ],
        },
        ["vidhāyinī", "ordaining, laying down, prescribing"],
      ],
    },
  },
  287: {
    gloss: "Whose Command Takes Shape As Scripture",
    translation:
      "Revealed scripture carries authority because it is nothing other than her own order set down in words.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose Veda is the embodiment of her own command",
      vigraha: "nijājñārūpo nigamo yasyāḥ sā",
      children: [
        {
          iast: "nijājñārūpa",
          type: "bahuvrīhi",
          gloss: "having the form of her own command",
          vigraha: "nijājñā rūpaṃ yasya saḥ",
          children: [
            {
              iast: "nijājñā",
              type: "karmadhāraya",
              gloss: "her own command",
              vigraha: "nijā cāsāv ājñā ca",
              children: [
                ["nija", "one's own, innate"],
                ["ājñā", "order, command, authority"],
              ],
            },
            ["rūpa", "form, embodiment"],
          ],
        },
        ["nigama", "revealed text, the Veda"],
      ],
    },
  },
  288: {
    gloss: "Giver Of The Fruits Of Good And Evil",
    translation:
      "Deeds do not ripen by themselves; she is the one who hands out what they have earned, pleasant or not.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who dispenses the results of merit and sin",
      vigraha: "puṇyāpuṇyayoḥ phalaṃ pradadātīti",
      children: [
        {
          iast: "puṇyāpuṇyaphala",
          type: "tatpuruṣa",
          gloss: "the fruit of merit and demerit",
          vigraha: "puṇyāpuṇyayoḥ phalam",
          children: [
            {
              iast: "puṇyāpuṇya",
              type: "dvandva",
              gloss: "merit and demerit",
              vigraha: "puṇyaṃ cāpuṇyaṃ ca",
              children: [
                ["puṇya", "auspicious, meritorious, virtuous act"],
                ["apuṇya", "unmeritorious, sinful act"],
              ],
            },
            ["phala", "fruit, result, consequence"],
          ],
        },
        ["pradā", "giving, bestowing"],
      ],
    },
  },
  289: {
    gloss: "Whose Foot-Dust Reddens The Parting Of The Vedas",
    translation:
      "The Upaniṣads bow so low that the dust of her lotus feet settles along their hair-parting like a married woman's vermilion.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she the dust of whose lotus feet has become vermilion on the hair-parting of the Vedas",
      vigraha: "śrutīnāṃ sīmante sindūrīkṛtā pādābjadhūlikā yasyāḥ sā",
      children: [
        {
          iast: "śrutisīmanta",
          type: "tatpuruṣa",
          gloss: "the hair-parting of the revealed texts",
          vigraha: "śrutīnāṃ sīmantaḥ",
          children: [
            ["śruti", "what is heard, revealed scripture; the ear"],
            ["sīmanta", "the parting of the hair"],
          ],
        },
        ["sindūrīkṛta", "turned into vermilion"],
        {
          iast: "pādābjadhūlikā",
          type: "tatpuruṣa",
          gloss: "the dust of the lotus feet",
          vigraha: "pādābjayor dhūlikā",
          children: [
            {
              iast: "pādābja",
              type: "karmadhāraya",
              gloss: "lotus feet",
              vigraha: "pādāv evābje",
              children: [
                ["pāda", "foot"],
                ["abja", "water-born, a lotus"],
              ],
            },
            ["dhūlikā", "fine dust, pollen"],
          ],
        },
      ],
    },
  },
  290: {
    gloss: "Pearl In The Shell Of All Scripture",
    translation:
      "The mass of revealed texts closes around her like the two halves of an oyster around its one pearl.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the pearl within the oyster-casket formed by the whole body of scripture",
      vigraha: "sakalāgamasandoharūpasya śuktisampuṭasya mauktikam",
      children: [
        {
          iast: "sakalāgamasandoha",
          type: "tatpuruṣa",
          gloss: "the entire mass of revealed texts",
          vigraha: "sakalānām āgamānāṃ sandohaḥ",
          children: [
            {
              iast: "sakalāgama",
              type: "karmadhāraya",
              gloss: "all the scriptures",
              vigraha: "sakalāś ca ta āgamāś ca",
              children: [
                ["sakala", "entire, complete, with all its parts"],
                ["āgama", "what has come down, traditional scripture"],
              ],
            },
            ["sandoha", "aggregate, mass, totality"],
          ],
        },
        {
          iast: "śuktisampuṭa",
          type: "tatpuruṣa",
          gloss: "the closed casket of the oyster shell",
          vigraha: "śukteḥ sampuṭaḥ",
          children: [
            ["śukti", "pearl-oyster, shell"],
            ["sampuṭa", "hemispherical bowl, closed casket"],
          ],
        },
        ["mauktika", "pearl"],
      ],
    },
  },
  291: {
    gloss: "Granter Of The Human Goals",
    translation:
      "Pleasure, wealth, duty and release are all in her gift, and she withholds none of the four from those who ask rightly.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows the aims of human life",
      vigraha: "puruṣārthān pradadātīti puruṣārthapradā",
      children: [
        {
          iast: "puruṣārtha",
          type: "tatpuruṣa",
          gloss: "an aim of human life",
          vigraha: "puruṣasyārthaḥ",
          children: [
            ["puruṣa", "a person, a human being"],
            ["artha", "aim, object, purpose"],
          ],
        },
        ["pradā", "giving, bestowing"],
      ],
    },
  },
  292: {
    gloss: "The Full",
    translation:
      "Nothing can be added to her and nothing taken away, so her fullness never fluctuates.",
    pos: "adjective",
    note: "past passive participle of √pṝ, 'to fill', used as a substantive",
  },
  293: {
    gloss: "The Enjoyer",
    translation:
      "She is the one who actually tastes every experience the worlds put forward.",
    note: "feminine of bhogin, 'enjoying', from bhoga; not a compound",
  },
  294: {
    gloss: "Sovereign Of The Worlds",
    translation:
      "Under this name she rules the worlds as a queen rules a realm, by right and not by force.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of the worlds",
      vigraha: "bhuvanānām īśvarī",
      children: [
        ["bhuvana", "world, sphere of existence"],
        ["īśvarī", "sovereign lady"],
      ],
    },
  },
  295: {
    gloss: "The Mother",
    translation:
      "Of all her names this is the plainest, the word a child uses.",
    note: "affectionate -kā derivative of ambā, 'mother'; not a compound",
  },
  296: {
    gloss: "Without Beginning Or End",
    translation:
      "She did not start and will not stop, so no date can be put on either side of her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has neither origin nor cessation",
      vigraha: "na vidyete ādir nidhanaṃ ca yasyāḥ sā",
      children: [
        ["an", "not, without"],
        {
          iast: "ādinidhana",
          type: "dvandva",
          gloss: "beginning and end",
          vigraha: "ādiś ca nidhanaṃ ca",
          children: [
            ["ādi", "beginning, origin"],
            ["nidhana", "conclusion, end, destruction"],
          ],
        },
      ],
    },
  },
  297: {
    gloss: "Served By Viṣṇu, Brahmā And Indra",
    translation:
      "The three great gods take their turn in attendance on her, each set aside his own sovereignty at her door.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is waited upon by Hari, Brahmā and Indra",
      vigraha: "haribrahmendraiḥ sevitā",
      children: [
        {
          iast: "haribrahmendra",
          type: "dvandva",
          gloss: "Hari, Brahmā and Indra",
          vigraha: "hariś ca brahmā cendraś ca",
          children: [
            ["hari", "Hari, Viṣṇu"],
            ["brahman", "Brahmā, the creator"],
            ["indra", "Indra, king of the gods"],
          ],
        },
        ["sevita", "served, waited upon, attended"],
      ],
    },
  },
  298: {
    gloss: "Consort Of Nārāyaṇa",
    translation:
      "Named from Nārāyaṇa, she is the power by which the god who rests on the waters does anything at all.",
    note: "vṛddhi feminine derivative of nārāyaṇa; not a compound",
  },
  299: {
    gloss: "Whose Form Is Primal Sound",
    translation:
      "Before speech divides into syllables it is a single undivided resonance, and that resonance is her body.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is sound itself",
      vigraha: "nādo rūpaṃ yasyāḥ sā",
      children: [
        ["nāda", "sound, tone, resonance"],
        ["rūpa", "form, body"],
      ],
    },
  },
  300: {
    gloss: "Free Of Name And Form",
    translation:
      "Having just been called sound itself, she is at once declared to be beyond every name a worshipper could fasten on her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of name and form",
      vigraha: "nāmarūpābhyāṃ vivarjitā",
      children: [
        {
          iast: "nāmarūpa",
          type: "dvandva",
          gloss: "name and form",
          vigraha: "nāma ca rūpaṃ ca",
          children: [
            ["nāman", "name"],
            ["rūpa", "form, shape"],
          ],
        },
        ["vivarjita", "free from, destitute of"],
      ],
    },
  },
};
