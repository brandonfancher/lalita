/**
 * Nāmas 501–600.
 *
 * The batch opens inside the cakra sequence — the goddess is described
 * through the presiding śaktis Lākinī, Kākinī, Sākinī, Hākinī and Yākinī,
 * each with her petals, her bodily constituent, her colour and her offering
 * of cooked rice — and then turns, from 535 onward, to the great Vedāntic
 * and Śrīvidyā epithets.
 *
 * Word senses follow the Monier-Williams Sanskrit-English Dictionary (1899);
 * the glosses, translations and vigrahas are written fresh here.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  501: {
    gloss: "Gladdened By Jaggery-Rice",
    translation:
      "The offering set before her at this station is rice sweetened with raw cane sugar, and her mind receives it with pleasure.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose mind is pleased by rice cooked with jaggery",
      vigraha: "guḍānnena prītaṃ mānasaṃ yasyāḥ sā",
      children: [
        {
          iast: "guḍānnaprīta",
          type: "tatpuruṣa",
          gloss: "Pleased By Jaggery-Rice",
          vigraha: "guḍānnena prītaḥ",
          children: [
            {
              iast: "guḍānna",
              type: "tatpuruṣa",
              gloss: "Jaggery-Rice",
              vigraha: "guḍena saṃskṛtam annam",
              children: [
                ["guḍa", "raw cane sugar, treacle, jaggery"],
                ["anna", "food, boiled rice"],
              ],
            },
            ["prīta", "pleased, gratified"],
          ],
        },
        ["mānasa", "the mind, the mental faculty"],
      ],
    },
  },

  502: {
    gloss: "Giver Of Joy To Every Devotee",
    translation:
      "No worshipper is left out of her generosity; happiness reaches each of them without exception.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives happiness to all her devotees",
      vigraha: "samastebhyo bhaktebhyaḥ sukhaṃ dadātīti",
      children: [
        {
          iast: "samastabhakta",
          type: "karmadhāraya",
          gloss: "All Devotees",
          vigraha: "samastāś ca te bhaktāś ca",
          children: [
            ["samasta", "combined, whole, all"],
            ["bhakta", "devoted, a worshipper"],
          ],
        },
        {
          iast: "sukhada",
          type: "tatpuruṣa",
          gloss: "Bestowing Happiness",
          vigraha: "sukhaṃ dadātīti",
          children: [
            ["sukha", "ease, comfort, happiness"],
            ["da", "giving, bestowing"],
          ],
        },
      ],
    },
  },

  503: {
    gloss: "Embodied As Mother Lākinī",
    translation:
      "Presiding over the maṇipūra station, she takes on the shape of the Tantric goddess Lākinī, addressed with the respectful title of mother.",
    note: "The having lies in the suffix -in, so lākinyambāsvarūpa is the compound and svarūpiṇī the taddhita made on it; the name is also read as a bahuvrīhi, she who has Mother Lākinī for her form. At this wheel the hymn's pairing of yoginī and cakra agrees with that of the Ṣaṭcakranirūpaṇa, though the two schemes part company at other stations.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the very form of the mother Lākinī",
      vigraha: "lākinyambāyāḥ svarūpam asyā astīti lākinyambāsvarūpiṇī",
      children: [
        {
          iast: "lākinyambā",
          type: "karmadhāraya",
          gloss: "Mother Lākinī",
          vigraha: "lākinī caiva ambā",
          children: [
            ["lākinī", "Lākinī, a Tantric goddess"],
            ["ambā", "mother, a title of respect for a woman"],
          ],
        },
        ["svarūpiṇī", "having a form of her own, appearing in the shape of"],
      ],
    },
  },

  504: {
    gloss: "Seated In The Svādhiṣṭhāna Lotus",
    translation:
      "Her place is the second of the six mystical circles, the wheel that yogins locate at the root of the generative organs.",
    note: "The panel opened here closes at kākinīrūpadhāriṇī, so it is Kākinī who presides over this wheel in the hymn; the Ṣaṭcakranirūpaṇa gives svādhiṣṭhāna to Rākiṇī instead.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who has gone to the lotus of the svādhiṣṭhāna circle",
      vigraha: "svādhiṣṭhānāmbuje gatā",
      children: [
        {
          iast: "svādhiṣṭhānāmbuja",
          type: "tatpuruṣa",
          gloss: "Lotus Of The Svādhiṣṭhāna",
          vigraha: "svādhiṣṭhānasya ambujam",
          children: [
            ["svādhiṣṭhāna", "one's own seat; the second mystical circle"],
            ["ambuja", "water-born, a lotus"],
          ],
        },
        ["gata", "gone to, situated in"],
      ],
    },
  },

  505: {
    gloss: "Captivating With Four Faces",
    translation:
      "Kākinī looks out in four directions at once, and every one of those countenances carries away the beholder's heart.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who steals the heart by her four faces",
      vigraha: "caturvaktreṇa manoharā",
      children: [
        {
          iast: "caturvaktra",
          type: "dvigu",
          gloss: "Four Faces",
          vigraha: "catvāri vaktrāṇi",
          children: [
            ["catur", "four"],
            ["vaktra", "mouth, face"],
          ],
        },
        {
          iast: "manohara",
          type: "tatpuruṣa",
          gloss: "Heart-Stealing",
          vigraha: "mano haratīti",
          children: [
            ["manas", "mind, heart"],
            ["hara", "carrying off, seizing"],
          ],
        },
      ],
    },
  },

  506: {
    gloss: "Armed With Trident And More",
    translation:
      "Her hands are fully supplied with weapons, the trident standing first in the list.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is furnished with weapons beginning with the trident",
      vigraha: "śūlādyair āyudhaiḥ sampannā",
      children: [
        {
          iast: "śūlādyāyudha",
          type: "karmadhāraya",
          gloss: "Weapons Headed By The Trident",
          vigraha: "śūlādyāni ca tāny āyudhāni ca",
          children: [
            {
              iast: "śūlādya",
              type: "bahuvrīhi",
              gloss: "Having The Trident First",
              vigraha: "śūlam ādyaṃ yeṣāṃ tāni",
              children: [
                ["śūla", "spike, spear, the trident of Śiva"],
                ["ādya", "being at the beginning, first"],
              ],
            },
            ["āyudha", "a weapon"],
          ],
        },
        ["sampanna", "furnished with, possessed of"],
      ],
    },
  },

  507: {
    gloss: "Yellow In Hue",
    translation:
      "The colour proper to this śakti is yellow, the shade the dictionaries associate with butter and turmeric.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose colour is yellow",
      vigraha: "pīto varṇo yasyāḥ sā",
      children: [
        ["pīta", "yellow"],
        ["varṇa", "colour, hue, complexion"],
      ],
    },
  },

  508: {
    gloss: "Exceedingly Proud",
    translation:
      "Pride here is not a fault but an overflow of power: the śakti is flushed with her own sovereignty.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is proud beyond measure",
      vigraha: "atiśayena garvitā",
      children: [
        ["ati", "beyond, exceedingly"],
        ["garvita", "haughty, proud"],
      ],
    },
  },

  509: {
    gloss: "Established In The Fat",
    translation:
      "Of the seven bodily constituents she governs medas, the fatty tissue that the medical texts seat in the abdomen.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who has her station in the fat",
      vigraha: "medasi niṣṭhā",
      children: [
        ["medas", "fat, marrow, one of the seven bodily constituents"],
        ["niṣṭhā", "position, standing, firm seat"],
      ],
    },
  },

  510: {
    gloss: "Delighted By Honeyed Drink",
    translation:
      "What is sweet pleases her, and the sweet draught offered in worship is received with gladness.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is pleased by what is sweet",
      vigraha: "madhunā prītā",
      children: [
        ["madhu", "honey, sweet drink, anything sweet"],
        ["prīta", "pleased, delighted"],
      ],
    },
  },

  511: {
    gloss: "Attended By Bandhinī And The Rest",
    translation:
      "The six petals of her wheel are the six śaktis whose company she keeps, Bandhinī named first among them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is accompanied by Bandhinī and the others",
      vigraha: "bandhinyādibhiḥ samanvitā",
      children: [
        {
          iast: "bandhinyādi",
          type: "bahuvrīhi",
          gloss: "Beginning With Bandhinī",
          vigraha: "bandhinī ādir yāsāṃ tāḥ",
          children: [
            ["bandhinī", "Bandhinī, the binding one; a petal-śakti"],
            ["ādi", "beginning, and so on"],
          ],
        },
        ["samanvita", "accompanied by, endowed with"],
      ],
    },
  },

  512: {
    gloss: "Her Heart Set On Curd-Rice",
    translation:
      "Rice mixed with thick sour milk is the food she favours, and her affection settles on it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose heart is attached to rice mixed with curds",
      vigraha: "dadhyanne āsaktaṃ hṛdayaṃ yasyāḥ sā",
      children: [
        {
          iast: "dadhyannāsakta",
          type: "tatpuruṣa",
          gloss: "Attached To Curd-Rice",
          vigraha: "dadhyanne āsaktaḥ",
          children: [
            {
              iast: "dadhyanna",
              type: "tatpuruṣa",
              gloss: "Curd-Rice",
              vigraha: "dadhnā miśritam annam",
              children: [
                ["dadhi", "coagulated milk, thick sour milk"],
                ["anna", "food, boiled rice"],
              ],
            },
            ["āsakta", "fastened to, intent on"],
          ],
        },
        ["hṛdaya", "the heart, the seat of feeling"],
      ],
    },
  },

  513: {
    gloss: "Wearing The Shape Of Kākinī",
    translation:
      "At the svādhiṣṭhāna wheel she assumes the person of the goddess Kākinī and carries that form as her own.",
    note: "This hymn seats Kākinī at svādhiṣṭhāna. The Ṣaṭcakranirūpaṇa and the manuals that follow it assign her to the heart instead; the two arrangements of the seven yoginīs coincide at some wheels and part at others.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the form of Kākinī",
      vigraha: "kākinyā rūpaṃ dhārayatīti",
      children: [
        {
          iast: "kākinīrūpa",
          type: "tatpuruṣa",
          gloss: "The Form Of Kākinī",
          vigraha: "kākinyā rūpam",
          children: [
            ["kākinī", "Kākinī, a presiding goddess"],
            ["rūpa", "form, shape, appearance"],
          ],
        },
        ["dhāriṇī", "she who bears or wears"],
      ],
    },
  },

  514: {
    gloss: "Mounted On The Mūlādhāra Lotus",
    translation:
      "She has climbed to her seat on the lowest of the wheels, the root support at the base of the spine.",
    note: "The panel opened here closes at sākinyambāsvarūpiṇī, so Sākinī is the yoginī of the root wheel in the hymn; the Ṣaṭcakranirūpaṇa assigns mūlādhāra to Ḍākinī instead.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is mounted upon the lotus of the root support",
      vigraha: "mūlādhārāmbuje ārūḍhā",
      children: [
        {
          iast: "mūlādhārāmbuja",
          type: "tatpuruṣa",
          gloss: "Lotus Of The Root Support",
          vigraha: "mūlādhārasya ambujam",
          children: [
            ["mūlādhāra", "the root support, the lowest mystical circle"],
            ["ambuja", "water-born, a lotus"],
          ],
        },
        ["ārūḍha", "mounted, ascended, seated upon"],
      ],
    },
  },

  515: {
    gloss: "Five-Faced",
    translation:
      "Sākinī shows five countenances, matching the five elements her station is said to gather.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has five faces",
      vigraha: "pañca vaktrāṇi yasyāḥ sā",
      children: [
        ["pañca", "five"],
        ["vaktra", "mouth, face"],
      ],
    },
  },

  516: {
    gloss: "Abiding In The Bones",
    translation:
      "The constituent under her charge is bone, the hardest of the body's seven layers.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is seated in the bone",
      vigraha: "asthni saṃsthitā",
      children: [
        ["asthi", "a bone"],
        ["saṃsthita", "placed in, resting in"],
      ],
    },
  },

  517: {
    gloss: "Striking With Goad And More",
    translation:
      "The elephant-driver's hook heads the array of implements she strikes with.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose weapons are the goad and the rest",
      vigraha: "aṅkuśādīni praharaṇāni yasyāḥ sā",
      children: [
        {
          iast: "aṅkuśādi",
          type: "bahuvrīhi",
          gloss: "Beginning With The Goad",
          vigraha: "aṅkuśa ādir yeṣāṃ tāni",
          children: [
            ["aṅkuśa", "a hook, an elephant-driver's goad"],
            ["ādi", "beginning, and so on"],
          ],
        },
        ["praharaṇa", "a weapon, an instrument of striking"],
      ],
    },
  },

  518: {
    gloss: "Served By Varadā And The Others",
    translation:
      "The petal-goddesses of the root wheel, Varadā at their head, wait upon her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is waited on by Varadā and the rest",
      vigraha: "varadādibhir niṣevitā",
      children: [
        {
          iast: "varadādi",
          type: "bahuvrīhi",
          gloss: "Headed By Varadā",
          vigraha: "varadā ādir yāsāṃ tāḥ",
          children: [
            ["varada", "granting a boon; Varadā, a petal-śakti"],
            ["ādi", "beginning, and so on"],
          ],
        },
        ["niṣevita", "attended upon, served, honoured"],
      ],
    },
  },

  519: {
    gloss: "Fond Of Mudga-Rice",
    translation:
      "Rice boiled together with mung beans holds her thought at this station.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose thought clings to rice cooked with mung beans",
      vigraha: "mudgaudane āsaktaṃ cittaṃ yasyāḥ sā",
      children: [
        {
          iast: "mudgaudanāsakta",
          type: "tatpuruṣa",
          gloss: "Attached To Mudga-Rice",
          vigraha: "mudgaudane āsaktaḥ",
          children: [
            {
              iast: "mudgaudana",
              type: "tatpuruṣa",
              gloss: "Mung-Bean Rice",
              vigraha: "mudgaiḥ saha pakvam odanam",
              children: [
                ["mudga", "the mung bean, Phaseolus Mungo"],
                ["odana", "grain boiled in milk, porridge, cooked rice"],
              ],
            },
            ["āsakta", "fastened to, intent on"],
          ],
        },
        ["citta", "thought, mind, attention"],
      ],
    },
  },

  520: {
    gloss: "Embodied As Mother Sākinī",
    translation:
      "The śakti of the mūlādhāra wheel is no other than herself, honoured under the maternal name Sākinī.",
    note: "Analysed like the other cakra-goddess names: the -in suffix does the possessing, so the word is a derivative of sākinyambāsvarūpa. A bahuvrīhi reading, she who has Mother Sākinī for her form, is equally defensible. The Ṣaṭcakranirūpaṇa places Sākinī at the throat rather than at the root, one of the points where the two arrangements diverge.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the mother Sākinī for her own form",
      vigraha: "sākinyambāyāḥ svarūpam asyā astīti sākinyambāsvarūpiṇī",
      children: [
        {
          iast: "sākinyambā",
          type: "karmadhāraya",
          gloss: "Mother Sākinī",
          vigraha: "sākinī caiva ambā",
          children: [
            ["sākinī", "Sākinī, a presiding goddess"],
            ["ambā", "mother, a title of respect for a woman"],
          ],
        },
        ["svarūpiṇī", "having a form of her own, appearing in the shape of"],
      ],
    },
  },

  521: {
    gloss: "Dwelling In The Ājñā Lotus",
    translation:
      "Between the brows lies the wheel of command, and its lotus is the house she keeps.",
    note: "The nāmāvalī here reads nilāyai; the metrical text has nilayāyai, from nilaya, 'dwelling place'.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose abode is the lotus of the command wheel",
      vigraha: "ājñācakrābjaṃ nilayo yasyāḥ sā",
      children: [
        {
          iast: "ājñācakrābja",
          type: "tatpuruṣa",
          gloss: "Lotus Of The Command Wheel",
          vigraha: "ājñācakrasya abjam",
          children: [
            {
              iast: "ājñācakra",
              type: "tatpuruṣa",
              gloss: "Wheel Of Command",
              vigraha: "ājñāyāś cakram",
              children: [
                ["ājñā", "order, command, authority"],
                ["cakra", "wheel; a mystical circle of the body"],
              ],
            },
            ["abja", "water-born, a lotus"],
          ],
        },
        ["nilaya", "resting place, abode"],
      ],
    },
  },

  522: {
    gloss: "White In Hue",
    translation:
      "Hākinī's complexion is unclouded white, the colour of what is spotless.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose colour is white",
      vigraha: "śuklo varṇo yasyāḥ sā",
      children: [
        ["śukla", "bright, white, spotless"],
        ["varṇa", "colour, hue, complexion"],
      ],
    },
  },

  523: {
    gloss: "Six-Faced",
    translation:
      "Six faces turn outward from her at this station, one for each direction of space.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has six faces",
      vigraha: "ṣaḍ ānanāni yasyāḥ sā",
      children: [
        ["ṣaṣ", "six"],
        ["ānana", "mouth, face"],
      ],
    },
  },

  524: {
    gloss: "Resident In The Marrow",
    translation:
      "Among the bodily constituents she occupies marrow, the innermost of them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who abides in the marrow",
      vigraha: "majjāyāṃ saṃsthā",
      children: [
        ["majjā", "the marrow of bones"],
        ["saṃsthā", "abiding, staying, settled position"],
      ],
    },
  },

  525: {
    gloss: "Attended By Haṃsavatī And Her Peers",
    translation:
      "The two petals of the brow wheel are śaktis, and Haṃsavatī is named as the foremost of the pair.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is attended by the śaktis whose chief is Haṃsavatī",
      vigraha: "haṃsavatīmukhyābhiḥ śaktibhiḥ samanvitā",
      children: [
        {
          iast: "haṃsavatīmukhyaśakti",
          type: "karmadhāraya",
          gloss: "The Śaktis Headed By Haṃsavatī",
          vigraha: "haṃsavatīmukhyāś ca tāḥ śaktayaś ca",
          children: [
            {
              iast: "haṃsavatīmukhya",
              type: "bahuvrīhi",
              gloss: "Having Haṃsavatī As Chief",
              vigraha: "haṃsavatī mukhyā yāsāṃ tāḥ",
              children: [
                ["haṃsavatī", "Haṃsavatī, she who possesses the swan"],
                ["mukhya", "foremost, chief, principal"],
              ],
            },
            ["śakti", "power, energy, a goddess of power"],
          ],
        },
        ["samanvita", "accompanied by, endowed with"],
      ],
    },
  },

  526: {
    gloss: "Relishing Only Turmeric-Rice",
    translation:
      "Rice tinted with turmeric is the single dish for which she shows a taste at this wheel.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she whose one relish is rice cooked with turmeric",
      vigraha: "haridrānna eva ekarasikā",
      children: [
        {
          iast: "haridrānna",
          type: "tatpuruṣa",
          gloss: "Turmeric-Rice",
          vigraha: "haridrayā yuktam annam",
          children: [
            ["haridrā", "turmeric, Curcuma Longa"],
            ["anna", "food, boiled rice"],
          ],
        },
        {
          iast: "ekarasika",
          type: "karmadhāraya",
          gloss: "Having A Single Relish",
          vigraha: "eka eva rasikā",
          children: [
            ["eka", "one, single, alone"],
            ["rasika", "having a taste for, fond of"],
          ],
        },
      ],
    },
  },

  527: {
    gloss: "Wearing The Shape Of Hākinī",
    translation:
      "At the command wheel the form she puts on is that of the goddess Hākinī.",
    note: "The Ṣaṭcakranirūpaṇa also seats Hākinī between the brows, so the two arrangements of the seven yoginīs meet here, however they differ at the wheels below.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the form of Hākinī",
      vigraha: "hākinyā rūpaṃ dhārayatīti",
      children: [
        {
          iast: "hākinīrūpa",
          type: "tatpuruṣa",
          gloss: "The Form Of Hākinī",
          vigraha: "hākinyā rūpam",
          children: [
            ["hākinī", "Hākinī, a presiding goddess"],
            ["rūpa", "form, shape, appearance"],
          ],
        },
        ["dhāriṇī", "she who bears or wears"],
      ],
    },
  },

  528: {
    gloss: "Seated In The Thousand-Petalled Lotus",
    translation:
      "Above the six wheels opens the lotus of a thousand petals, and there she takes her place.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who stands in the lotus of a thousand petals",
      vigraha: "sahasradalapadme sthitā",
      children: [
        {
          iast: "sahasradalapadma",
          type: "karmadhāraya",
          gloss: "Thousand-Petalled Lotus",
          vigraha: "sahasradalaṃ ca tat padmaṃ ca",
          children: [
            {
              iast: "sahasradala",
              type: "bahuvrīhi",
              gloss: "Having A Thousand Petals",
              vigraha: "sahasraṃ dalāni yasya tat",
              children: [
                ["sahasra", "a thousand"],
                ["dala", "a petal, leaf, blade"],
              ],
            },
            ["padma", "a lotus"],
          ],
        },
        ["stha", "standing in, situated in"],
      ],
    },
  },

  529: {
    gloss: "Radiant With Every Colour",
    translation:
      "All shades adorn her, and since varṇa also names a letter of the alphabet, the whole range of speech-sounds shines in her too.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is made beautiful by all the colours",
      vigraha: "sarvair varṇair upaśobhitā",
      children: [
        {
          iast: "sarvavarṇa",
          type: "karmadhāraya",
          gloss: "All Colours",
          vigraha: "sarve ca te varṇāś ca",
          children: [
            ["sarva", "whole, entire, all"],
            ["varṇa", "colour; also a letter of the alphabet"],
          ],
        },
        ["upaśobhita", "adorned, made beautiful"],
      ],
    },
  },

  530: {
    gloss: "Bearer Of All Weapons",
    translation:
      "Whatever arms exist she holds, so that no instrument of protection is missing from her hands.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who holds every weapon",
      vigraha: "sarvāṇy āyudhāni dharatīti",
      children: [
        {
          iast: "sarvāyudha",
          type: "karmadhāraya",
          gloss: "All Weapons",
          vigraha: "sarvāṇi ca tāny āyudhāni ca",
          children: [
            ["sarva", "whole, entire, all"],
            ["āyudha", "a weapon"],
          ],
        },
        ["dhara", "holding, bearing, carrying"],
      ],
    },
  },

  531: {
    gloss: "Established In Śukla",
    translation:
      "The bright constituent, the last and finest distillation of the bodily elements, is where she rests.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is settled in the bright constituent",
      vigraha: "śukle saṃsthitā",
      children: [
        ["śukla", "the bright or white substance; the generative fluid"],
        ["saṃsthita", "placed in, resting in"],
      ],
    },
  },

  532: {
    gloss: "Facing Everywhere",
    translation:
      "There is no direction she does not look toward, and so no worshipper stands behind her back.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose face is turned in every direction",
      vigraha: "sarvato mukhaṃ yasyāḥ sā",
      children: [
        ["sarvatas", "from or in all directions, everywhere"],
        ["mukha", "mouth, face"],
      ],
    },
  },

  533: {
    gloss: "Pleased By Rice Of Every Kind",
    translation:
      "At the crown no single dish is singled out; every sort of cooked offering gladdens her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose mind is gratified by every kind of cooked rice",
      vigraha: "sarvaudanena prītaṃ cittaṃ yasyāḥ sā",
      children: [
        {
          iast: "sarvaudanaprīta",
          type: "tatpuruṣa",
          gloss: "Pleased By All Cooked Rice",
          vigraha: "sarvaudanena prītaḥ",
          children: [
            {
              iast: "sarvaudana",
              type: "karmadhāraya",
              gloss: "Every Kind Of Cooked Rice",
              vigraha: "sarvaṃ ca tad odanaṃ ca",
              children: [
                ["sarva", "whole, entire, all"],
                ["odana", "grain boiled in milk, porridge, cooked rice"],
              ],
            },
            ["prīta", "pleased, gratified"],
          ],
        },
        ["citta", "thought, mind, attention"],
      ],
    },
  },

  534: {
    gloss: "Embodied As Mother Yākinī",
    translation:
      "The last of the cakra goddesses, presiding at the crown, is her own form under another name.",
    note: "As with the rest of the series, svarūpiṇī is treated as a taddhita in -in on yākinyambāsvarūpa, since the suffix carries the possession; many read it instead as a bahuvrīhi, she whose form is Mother Yākinī. Yākinī closes the series at the crown in the Ṣaṭcakranirūpaṇa as well, one of the wheels where the two arrangements of the yoginīs coincide.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the mother Yākinī for her own form",
      vigraha: "yākinyambāyāḥ svarūpam asyā astīti yākinyambāsvarūpiṇī",
      children: [
        {
          iast: "yākinyambā",
          type: "karmadhāraya",
          gloss: "Mother Yākinī",
          vigraha: "yākinī caiva ambā",
          children: [
            ["yākinī", "Yākinī, a presiding goddess"],
            ["ambā", "mother, a title of respect for a woman"],
          ],
        },
        ["svarūpiṇī", "having a form of her own, appearing in the shape of"],
      ],
    },
  },

  535: {
    gloss: "The Cry Svāhā",
    translation:
      "She is the word spoken as an oblation is poured for the gods, and so the very act by which an offering reaches them.",
  },

  536: {
    gloss: "The Cry Svadhā",
    translation:
      "She is the call that carries an offering to the ancestors, and equally the self-sustaining power the word names.",
  },

  537: {
    gloss: "Not Reached By Thought",
    translation:
      "Reflection cannot lay hold of her, for she is what thinking arises out of rather than something thought can contain.",
    note: "Read as a negated mati, 'thought'; the lexicon also records amati in the sense of splendour, which some take here.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is without discursive thought",
      vigraha: "na matiḥ",
      children: [
        ["a", "not, un-"],
        ["mati", "thought, understanding, intention"],
      ],
    },
  },

  538: {
    gloss: "Intelligence Itself",
    translation:
      "The mental vigour by which anything is grasped at all is her, personified in the old lists as a daughter of Dakṣa.",
  },

  539: {
    gloss: "Revelation",
    translation:
      "What was heard by the seers and handed down unaltered as the Veda is nothing other than her.",
  },

  540: {
    gloss: "Tradition Remembered",
    translation:
      "The remembered body of law and teaching, held in human memory rather than directly revealed, likewise carries her name.",
  },

  541: {
    gloss: "Unsurpassed",
    translation:
      "Nothing stands above her, since any height one could name would still be a thing she measures.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "she than whom nothing is higher",
      vigraha: "na uttamā yasyāḥ",
      children: [
        ["an", "not, un-"],
        ["uttama", "highest, uppermost, best"],
      ],
    },
  },

  542: {
    gloss: "Of Holy Renown",
    translation:
      "The fame that attaches to her is itself sanctifying, so that speaking of her purifies the speaker.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose fame is meritorious",
      vigraha: "puṇyā kīrtir yasyāḥ sā",
      children: [
        ["puṇya", "auspicious, holy, meritorious"],
        ["kīrti", "mention, report, fame, renown"],
      ],
    },
  },

  543: {
    gloss: "Won Through Merit",
    translation:
      "She does not come by contrivance; a store of good acts is what finally brings her within reach.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is obtainable by merit",
      vigraha: "puṇyena labhyā",
      children: [
        ["puṇya", "virtue, purity, a meritorious act"],
        ["labhya", "obtainable, to be attained"],
      ],
    },
  },

  544: {
    gloss: "Holy To Hear And To Praise",
    translation:
      "Merit accrues both to the one who listens to her story and to the one who tells it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she of whom the hearing and the reciting are meritorious",
      vigraha: "puṇye śravaṇakīrtane yasyāḥ sā",
      children: [
        ["puṇya", "auspicious, holy, meritorious"],
        {
          iast: "śravaṇakīrtana",
          type: "dvandva",
          gloss: "Hearing And Reciting",
          vigraha: "śravaṇaṃ ca kīrtanaṃ ca",
          children: [
            ["śravaṇa", "the act of hearing, listening"],
            ["kīrtana", "mentioning, reciting, telling"],
          ],
        },
      ],
    },
  },

  545: {
    gloss: "Worshipped By Indra's Queen",
    translation:
      "Śacī, the daughter of the demon Puloman and consort of Indra, offers her honour.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is worshipped by the daughter of Puloman",
      vigraha: "pulomajayā arcitā",
      children: [
        {
          iast: "pulomajā",
          type: "tatpuruṣa",
          gloss: "Daughter Of Puloman",
          vigraha: "pulomno jātā",
          children: [
            ["puloman", "Puloman, a demon, father of Indra's consort"],
            ["ja", "born of, sprung from"],
          ],
        },
        ["arcita", "honoured, worshipped"],
      ],
    },
  },

  546: {
    gloss: "Loosener Of Bonds",
    translation:
      "Whatever ties a soul to repeated birth she unties, being herself unbound.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who releases from bondage",
      vigraha: "bandhāt mocayatīti",
      children: [
        ["bandha", "a bond, tie, fetter, imprisonment"],
        ["mocanī", "she who releases or sets free"],
      ],
    },
  },

  547: {
    gloss: "Of Curling Locks",
    translation:
      "Her hair falls in tight waves, the adjective barbara being used of what is curly rather than straight.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose curls are wavy",
      vigraha: "barbarā alakā yasyāḥ sā",
      children: [
        ["barbara", "curly, crisped"],
        ["alaka", "a curl, a lock of hair"],
      ],
    },
  },

  548: {
    gloss: "Formed Of Reflective Awareness",
    translation:
      "In the Śaiva analysis prakāśa is the light of pure being and vimarśa its self-recognition; she is the second, the turning of that light upon itself.",
    note: "The suffix -in is what expresses the having, so vimarśarūpa is the compound and rūpiṇī a secondary formation on it. Read as a bahuvrīhi the name would mean she who has reflective awareness for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of reflective self-awareness",
      vigraha: "vimarśasya rūpam asyā astīti vimarśarūpiṇī",
      children: [
        ["vimarśa", "deliberation, examination, reflective knowledge"],
        ["rūpiṇī", "having the form or character of"],
      ],
    },
  },

  549: {
    gloss: "Knowledge",
    translation:
      "She is learning in every branch, and in the Tantric idiom the word also names the mantra by which a deity is known.",
  },

  550: {
    gloss: "Mother Of The World From Ether Down",
    translation:
      "Space is the first of the elements to come forth, and the whole ordered world that follows is her offspring.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives birth to the world beginning with ether",
      vigraha: "viyadāder jagataḥ prasūḥ",
      children: [
        {
          iast: "viyadādijagat",
          type: "karmadhāraya",
          gloss: "The World Beginning With Ether",
          vigraha: "viyadādi ca tat jagac ca",
          children: [
            {
              iast: "viyadādi",
              type: "bahuvrīhi",
              gloss: "Having Ether As Its First",
              vigraha: "viyad ādir yasya tat",
              children: [
                ["viyat", "the sky, air, ether as an element"],
                ["ādi", "beginning, and so on"],
              ],
            },
            ["jagat", "that which moves, the world"],
          ],
        },
        ["prasū", "one who brings forth, a mother"],
      ],
    },
  },

  551: {
    gloss: "Quencher Of Every Illness",
    translation:
      "Sickness of body and of mind alike subsides in her presence.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who allays all diseases",
      vigraha: "sarvān vyādhīn praśamayatīti",
      children: [
        {
          iast: "sarvavyādhi",
          type: "karmadhāraya",
          gloss: "All Diseases",
          vigraha: "sarve ca te vyādhayaś ca",
          children: [
            ["sarva", "whole, entire, all"],
            ["vyādhi", "disorder, disease, ailment"],
          ],
        },
        ["praśamanī", "she who tranquillizes, allays or cures"],
      ],
    },
  },

  552: {
    gloss: "Warder Off Of All Death",
    translation:
      "Every kind of dying, the hundred violent ones and the one that comes of age, is held back by her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who keeps off death in all its forms",
      vigraha: "sarvaṃ mṛtyuṃ nivārayatīti",
      children: [
        {
          iast: "sarvamṛtyu",
          type: "karmadhāraya",
          gloss: "Death Of Every Kind",
          vigraha: "sarvaś cāsau mṛtyuś ca",
          children: [
            ["sarva", "whole, entire, all"],
            ["mṛtyu", "death, dying"],
          ],
        },
        ["nivāriṇī", "she who keeps back, hinders or prevents"],
      ],
    },
  },

  553: {
    gloss: "Counted First",
    translation:
      "In any reckoning of what deserves regard her name is set down at the head of the list.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is to be reckoned foremost",
      vigraha: "agre gaṇyā",
      children: [
        ["agra", "foremost point, front, first place"],
        ["gaṇya", "to be counted or reckoned"],
      ],
    },
  },

  554: {
    gloss: "Of Unthinkable Form",
    translation:
      "Her shape defeats the imagination, since every form the mind supplies is drawn from what she has already made.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is beyond conceiving",
      vigraha: "acintyaṃ rūpaṃ yasyāḥ sā",
      children: [
        {
          iast: "acintya",
          type: "tatpuruṣa",
          gloss: "Inconceivable",
          vigraha: "na cintyaḥ",
          children: [
            ["a", "not, un-"],
            ["cintya", "to be thought of, conceivable"],
          ],
        },
        ["rūpa", "form, shape, appearance"],
      ],
    },
  },

  555: {
    gloss: "Destroyer Of The Stain Of This Dark Age",
    translation:
      "The moral grime that gathers in the Kali era is rubbed away by her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys the impurity of the Kali age",
      vigraha: "kalikalmaṣaṃ nāśayatīti",
      children: [
        {
          iast: "kalikalmaṣa",
          type: "tatpuruṣa",
          gloss: "The Stain Of The Kali Age",
          vigraha: "kaleḥ kalmaṣam",
          children: [
            ["kali", "the last and worst of the four world ages"],
            ["kalmaṣa", "stain, dirt, moral defilement, sin"],
          ],
        },
        ["nāśinī", "she who destroys or removes"],
      ],
    },
  },

  556: {
    gloss: "Kātyāyanī",
    translation:
      "Under this old name of Durgā, formed from the lineage of the sage Kata, she is remembered as the fierce daughter born of the gods' combined anger.",
    note: "A patronymic-based name, not a compound; the feminine of Kātyāyana.",
  },

  557: {
    gloss: "Slayer Of Time",
    translation:
      "Time, which carries everything else away, is itself brought to an end by her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys Time",
      vigraha: "kālaṃ hantīti",
      children: [
        ["kāla", "time; death personified"],
        ["hantrī", "she who strikes down or slays"],
      ],
    },
  },

  558: {
    gloss: "Served By The Lotus-Eyed",
    translation:
      "Viṣṇu, whose eyes the poets liken to lotus petals, attends upon her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is waited upon by the lotus-eyed one",
      vigraha: "kamalākṣeṇa niṣevitā",
      children: [
        {
          iast: "kamalākṣa",
          type: "bahuvrīhi",
          gloss: "Lotus-Eyed",
          vigraha: "kamale iva akṣiṇī yasya saḥ",
          children: [
            ["kamala", "a lotus"],
            ["akṣi", "the eye"],
          ],
        },
        ["niṣevita", "attended upon, served, honoured"],
      ],
    },
  },

  559: {
    gloss: "Her Mouth Full Of Betel",
    translation:
      "She is pictured with the aromatic betel leaf in her mouth, the courtly refreshment of a queen at ease.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose mouth is filled with betel",
      vigraha: "tāmbūlena pūritaṃ mukhaṃ yasyāḥ sā",
      children: [
        {
          iast: "tāmbūlapūrita",
          type: "tatpuruṣa",
          gloss: "Filled With Betel",
          vigraha: "tāmbūlena pūritam",
          children: [
            ["tāmbūla", "the betel leaf, chewed with areca nut and spices"],
            ["pūrita", "filled, made full"],
          ],
        },
        ["mukha", "mouth, face"],
      ],
    },
  },

  560: {
    gloss: "Bright As Pomegranate Blossom",
    translation:
      "Her glow is the deep red of the pomegranate flower rather than any pallid light.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose lustre is that of the pomegranate flower",
      vigraha: "dāḍimīkusumasya prabhā iva prabhā yasyāḥ sā",
      children: [
        {
          iast: "dāḍimīkusuma",
          type: "tatpuruṣa",
          gloss: "Pomegranate Flower",
          vigraha: "dāḍimyāḥ kusumam",
          children: [
            ["dāḍimī", "the pomegranate tree"],
            ["kusuma", "a flower, blossom"],
          ],
        },
        ["prabhā", "light, splendour, radiance"],
      ],
    },
  },

  561: {
    gloss: "Doe-Eyed",
    translation:
      "Her glance has the wide startled softness that poets find in a deer.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose eyes are those of a doe",
      vigraha: "mṛgasya iva akṣiṇī yasyāḥ sā",
      children: [
        ["mṛga", "a forest animal, a deer or antelope"],
        ["akṣi", "the eye"],
      ],
    },
  },

  562: {
    gloss: "The Bewitching One",
    translation:
      "She casts the spell that holds the mind fast, the same power the myths give to the enchantress who took the nectar back from the demons.",
  },

  563: {
    gloss: "The Foremost",
    translation:
      "Wherever a first place exists she occupies it, whether in a list of deities or in the order of what is real.",
    pos: "adjective",
  },

  564: {
    gloss: "Consort Of Mṛḍa",
    translation:
      "Named as the wife of the gracious Śiva, she is Pārvatī considered in relation to him.",
    note: "A feminine formed from Mṛḍa, a name of Śiva; not a compound.",
  },

  565: {
    gloss: "Appearing As The Friend",
    translation:
      "She wears the shape of friendship itself, and with it the shape of the Vedic Mitra who calls creatures to their work.",
    note: "Taken as rūpin, the possessive derivative of mitrarūpa, rather than as a bahuvrīhi; the bahuvrīhi sense, she who has the form of a friend, amounts to the same thing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of a friend",
      vigraha: "mitrasya rūpam asyā astīti mitrarūpiṇī",
      children: [
        ["mitra", "a friend, companion; the Āditya Mitra"],
        ["rūpiṇī", "having the form or character of"],
      ],
    },
  },

  566: {
    gloss: "Forever Content",
    translation:
      "Since she lacks nothing, no satisfaction of hers depends on anything being supplied.",
    compound: {
      type: "karmadhāraya",
      gloss: "she who is always satisfied",
      vigraha: "nityaṃ tṛptā",
      children: [
        ["nitya", "constant, perpetual, eternal"],
        ["tṛpta", "satisfied, satiated"],
      ],
    },
  },

  567: {
    gloss: "Treasury Of The Devoted",
    translation:
      "For those attached to her she is the hoard itself, the wealth kept in reserve against every need.",
    note: "nidhi is lexically masculine; here it stands as a feminine epithet of the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is the treasure of her devotees",
      vigraha: "bhaktānāṃ nidhiḥ",
      children: [
        ["bhakta", "devoted, a worshipper"],
        ["nidhi", "a store, hoard, treasure"],
      ],
    },
  },

  568: {
    gloss: "The Governess",
    translation:
      "She holds the reins, restraining and directing as a charioteer does an unruly team.",
  },

  569: {
    gloss: "Mistress Of All That Is",
    translation:
      "Nothing whatever falls outside her rule, since the word nikhila leaves no remainder.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is sovereign over everything",
      vigraha: "nikhilasya īśvarī",
      children: [
        ["nikhila", "complete, whole, entire"],
        ["īśvarī", "a mistress, female ruler"],
      ],
    },
  },

  570: {
    gloss: "Attained Through Friendliness And Its Kin",
    translation:
      "The settled dispositions of goodwill, compassion, gladness and evenness make the mind fit to receive her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is reached through the dispositions beginning with friendliness",
      vigraha: "maitryādivāsanābhir labhyā",
      children: [
        {
          iast: "maitryādivāsanā",
          type: "karmadhāraya",
          gloss: "Dispositions Beginning With Friendliness",
          vigraha: "maitryādyāś ca tā vāsanāś ca",
          children: [
            {
              iast: "maitryādi",
              type: "bahuvrīhi",
              gloss: "Headed By Friendliness",
              vigraha: "maitrī ādir yāsāṃ tāḥ",
              children: [
                ["maitrī", "friendliness, benevolence, good will"],
                ["ādi", "beginning, and so on"],
              ],
            },
            ["vāsanā", "a settled impression in the mind, an abiding disposition"],
          ],
        },
        ["labhya", "obtainable, to be attained"],
      ],
    },
  },

  571: {
    gloss: "Witness Of The Great Dissolution",
    translation:
      "When the worlds are reabsorbed at the close of an age she alone remains, looking on at their disappearance.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is the witness of the universal dissolution",
      vigraha: "mahāpralayasya sākṣiṇī",
      children: [
        {
          iast: "mahāpralaya",
          type: "karmadhāraya",
          gloss: "The Great Dissolution",
          vigraha: "mahāṃś cāsau pralayaś ca",
          children: [
            ["mahat", "great, mighty"],
            ["pralaya", "reabsorption, the destruction of the world"],
          ],
        },
        ["sākṣiṇī", "she who observes as an eye-witness"],
      ],
    },
  },

  572: {
    gloss: "The Supreme Power",
    translation:
      "She is energy at its highest reach, the capacity from which every lesser power is a portion.",
    compound: {
      type: "karmadhāraya",
      gloss: "the power that is supreme",
      vigraha: "parā cāsau śaktiś ca",
      children: [
        ["para", "highest, supreme, beyond"],
        ["śakti", "power, ability, energy"],
      ],
    },
  },

  573: {
    gloss: "The Highest Consummation",
    translation:
      "She is the culminating point at which seeking has nowhere further to go.",
    compound: {
      type: "karmadhāraya",
      gloss: "the supreme culmination",
      vigraha: "parā cāsau niṣṭhā ca",
      children: [
        ["para", "highest, supreme, beyond"],
        ["niṣṭhā", "culminating point, completion, final state"],
      ],
    },
  },

  574: {
    gloss: "Solid Mass Of Consciousness",
    translation:
      "The Upaniṣadic phrase for the fourth state, awareness thickened until nothing else is left in it, describes her form.",
    note: "Classed as a tatpuruṣa because -in already supplies the possession, leaving prajñānaghanarūpa as the compound proper; the bahuvrīhi reading, she whose form is that solid mass of knowing, is also current.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having an undivided mass of pure awareness for her form",
      vigraha: "prajñānaghanasya rūpam asyā astīti prajñānaghanarūpiṇī",
      children: [
        {
          iast: "prajñānaghana",
          type: "tatpuruṣa",
          gloss: "Mass Of Pure Awareness",
          vigraha: "prajñānasya ghanaḥ",
          children: [
            ["prajñāna", "knowledge, intelligence, discernment"],
            ["ghana", "compact, solid, a dense mass"],
          ],
        },
        ["rūpiṇī", "having the form or character of"],
      ],
    },
  },

  575: {
    gloss: "Languid From The Sweet Draught",
    translation:
      "Having drunk the honey wine, she moves with the slowness of one whose limbs have gone heavy.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is made languid by drinking mead",
      vigraha: "mādhvīpānena alasā",
      children: [
        {
          iast: "mādhvīpāna",
          type: "tatpuruṣa",
          gloss: "The Drinking Of Mead",
          vigraha: "mādhvyāḥ pānam",
          children: [
            ["mādhvī", "a sweet intoxicating liquor, mead"],
            ["pāna", "drinking, a draught"],
          ],
        },
        ["alasa", "without energy, languid, indolent"],
      ],
    },
  },

  576: {
    gloss: "Intoxicated",
    translation:
      "She is flushed and elated, the word covering both the effect of drink and a rapture that needs none.",
    pos: "adjective",
  },

  577: {
    gloss: "Formed Of The Alphabet's Letters",
    translation:
      "The speech-sounds called mothers, from which every mantra is built, are the substance she is made of.",
    note: "rūpiṇī is the feminine of rūpin, so the possession belongs to the suffix and the compound behind it is mātṛkāvarṇarūpa; a bahuvrīhi reading, she who has the mother-letters for her form, is equally possible.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of the mother-letters",
      vigraha: "mātṛkāvarṇānāṃ rūpam asyā astīti mātṛkāvarṇarūpiṇī",
      children: [
        {
          iast: "mātṛkāvarṇa",
          type: "tatpuruṣa",
          gloss: "Letters Of The Mother-Alphabet",
          vigraha: "mātṛkāyā varṇāḥ",
          children: [
            ["mātṛkā", "a mother; the alphabet used as a magical diagram"],
            ["varṇa", "a letter, a speech-sound"],
          ],
        },
        ["rūpiṇī", "having the form or character of"],
      ],
    },
  },

  578: {
    gloss: "Housed On The Great Kailāsa",
    translation:
      "Her residence is the northern peak where Śiva is said to sit, here called great to mark it off from any earthly mountain.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose dwelling is the great Kailāsa",
      vigraha: "mahākailāso nilayo yasyāḥ sā",
      children: [
        {
          iast: "mahākailāsa",
          type: "karmadhāraya",
          gloss: "The Great Kailāsa",
          vigraha: "mahāṃś cāsau kailāsaś ca",
          children: [
            ["mahat", "great, mighty"],
            ["kailāsa", "Kailāsa, the mountain seat of Śiva"],
          ],
        },
        ["nilaya", "resting place, abode"],
      ],
    },
  },

  579: {
    gloss: "Arms Soft As Lotus Fibre",
    translation:
      "Her two arms curve like creepers and yield to the touch as the tender thread inside a lotus stalk does.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose creeper-like arms are soft as lotus fibre",
      vigraha: "mṛṇālavan mṛdvyau dorlate yasyāḥ sā",
      children: [
        {
          iast: "mṛṇālamṛdu",
          type: "tatpuruṣa",
          gloss: "Soft As Lotus Fibre",
          vigraha: "mṛṇālam iva mṛduḥ",
          children: [
            ["mṛṇāla", "the fibrous root or thread of a lotus"],
            ["mṛdu", "soft, tender, delicate"],
          ],
        },
        {
          iast: "dorlatā",
          type: "karmadhāraya",
          gloss: "Arm-Creeper",
          vigraha: "latā iva doḥ",
          children: [
            ["dos", "the arm, the forearm"],
            ["latā", "a creeper, a slender winding plant"],
          ],
        },
      ],
    },
  },

  580: {
    gloss: "Worthy Of Honour",
    translation:
      "She is what praise is properly directed toward, the gerundive marking an obligation rather than a compliment.",
    pos: "adjective",
  },

  581: {
    gloss: "Compassion Given A Body",
    translation:
      "Pity does not merely belong to her; it has taken shape and become her outline.",
    compound: {
      type: "karmadhāraya",
      gloss: "the embodiment that is compassion itself",
      vigraha: "dayaiva mūrtiḥ",
      children: [
        ["dayā", "sympathy, compassion, pity"],
        ["mūrti", "solid form, embodiment, image"],
      ],
    },
  },

  582: {
    gloss: "Clothed In Imperial Rule",
    translation:
      "Universal sovereignty is not conferred on her but worn by her, as a quality she is amply furnished with.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is possessed of a great empire",
      vigraha: "mahāsāmrājyena śālinī",
      children: [
        {
          iast: "mahāsāmrājya",
          type: "karmadhāraya",
          gloss: "Great Imperial Sovereignty",
          vigraha: "mahac ca tat sāmrājyaṃ ca",
          children: [
            ["mahat", "great, mighty"],
            ["sāmrājya", "universal sovereignty, empire"],
          ],
        },
        ["śālin", "possessed of, abounding in, furnished with"],
      ],
    },
  },

  583: {
    gloss: "Knowledge Of The Self",
    translation:
      "The learning that has the innermost self for its object, and not any outward thing, is she.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the science whose subject is the self",
      vigraha: "ātmano vidyā",
      children: [
        ["ātman", "breath, the self, the individual soul"],
        ["vidyā", "knowledge, science, learning"],
      ],
    },
  },

  584: {
    gloss: "The Great Learning",
    translation:
      "Among the sciences hers is the one called great, since the rest end where it begins.",
    compound: {
      type: "karmadhāraya",
      gloss: "the knowledge that is great",
      vigraha: "mahatī cāsau vidyā ca",
      children: [
        ["mahat", "great, mighty"],
        ["vidyā", "knowledge, science, learning"],
      ],
    },
  },

  585: {
    gloss: "The Auspicious Vidyā",
    translation:
      "This is the mantra-science named for śrī, the splendour and prosperity it confers on the one who holds it.",
    compound: {
      type: "karmadhāraya",
      gloss: "the knowledge that is radiance and prosperity",
      vigraha: "śrīr eva vidyā",
      children: [
        ["śrī", "light, splendour, beauty, prosperity"],
        ["vidyā", "knowledge, science, a mantra"],
      ],
    },
  },

  586: {
    gloss: "Attended By Kāma",
    translation:
      "Desire, personified as the god who bends the flower-bow, is found in the posture of a servant before her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is served by Kāma",
      vigraha: "kāmena sevitā",
      children: [
        ["kāma", "wish, desire; the god of love"],
        ["sevita", "served, attended upon, honoured"],
      ],
    },
  },

  587: {
    gloss: "The Holy Sixteen-Syllabled Vidyā",
    translation:
      "Beyond the fifteen-syllable formula stands its sixteen-syllable completion, and that mantra is her own body of sound.",
    compound: {
      type: "karmadhāraya",
      gloss: "the auspicious knowledge consisting of sixteen syllables",
      vigraha: "śrīmatī ṣoḍaśākṣarī cāsau vidyā ca",
      children: [
        ["śrī", "light, splendour, prosperity; a mark of holiness"],
        {
          iast: "ṣoḍaśākṣarī",
          type: "bahuvrīhi",
          gloss: "Having Sixteen Syllables",
          vigraha: "ṣoḍaśa akṣarāṇi yasyāḥ sā",
          children: [
            ["ṣoḍaśan", "sixteen"],
            ["akṣara", "imperishable; a syllable, a speech-sound"],
          ],
        },
        ["vidyā", "knowledge, science, a mantra"],
      ],
    },
  },

  588: {
    gloss: "Of Three Peaks",
    translation:
      "The root mantra falls into three clusters, and she is described by that threefold summit.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has three peaks or clusters",
      vigraha: "trīṇi kūṭāni yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["kūṭa", "a peak, summit, prominence"],
      ],
    },
  },

  589: {
    gloss: "The Utmost Point Of Desire",
    translation:
      "She is where longing arrives and stops, a name also borne by the shrine at Kāñcī that carries the word Kāmakoṭi.",
    note: "koṭi means both 'highest point' and 'ten million'; the second sense yields the alternative reading, 'she of countless Kāmas'.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is the summit of desire",
      vigraha: "kāmasya koṭiḥ",
      children: [
        ["kāma", "wish, desire, love"],
        ["koṭika", "the highest point or extremity, koṭi with the suffix -ka"],
      ],
    },
  },

  590: {
    gloss: "Served By Millions Of Lakṣmīs Made Her Handmaids",
    translation:
      "One sidelong look from her turns countless goddesses of fortune into attendants, and it is these who then wait on her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is served by ten million Lakṣmīs whom her glance has made servants",
      vigraha: "kaṭākṣeṇa kiṅkarībhūtānāṃ kamalānāṃ koṭyā sevitā",
      children: [
        {
          iast: "kaṭākṣakiṅkarībhūtakamalākoṭi",
          type: "karmadhāraya",
          gloss: "The Ten Million Lakṣmīs Turned Into Handmaids By Her Glance",
          vigraha: "kaṭākṣakiṅkarībhūtā cāsau kamalākoṭiś ca",
          children: [
            {
              iast: "kaṭākṣakiṅkarībhūta",
              type: "tatpuruṣa",
              gloss: "Become A Handmaid Through Her Sidelong Glance",
              vigraha: "kaṭākṣeṇa kiṅkarī bhūtā",
              children: [
                ["kaṭākṣa", "a sidelong look, a glance"],
                ["kiṅkarī", "a female servant, a handmaid"],
                ["bhūta", "become, turned into"],
              ],
            },
            {
              iast: "kamalākoṭi",
              type: "tatpuruṣa",
              gloss: "Ten Million Lakṣmīs",
              vigraha: "kamalānāṃ koṭiḥ",
              children: [
                ["kamalā", "Kamalā, a name of Lakṣmī"],
                ["koṭi", "ten million; the highest point"],
              ],
            },
          ],
        },
        ["sevita", "served, attended upon, honoured"],
      ],
    },
  },

  591: {
    gloss: "Seated In The Head",
    translation:
      "In the meditation on her placement through the body she is first fixed at the crown of the head.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is stationed in the head",
      vigraha: "śirasi sthitā",
      children: [
        ["śiras", "the head, the skull"],
        ["sthita", "standing, placed, situated"],
      ],
    },
  },

  592: {
    gloss: "Like The Moon",
    translation:
      "At the crown her light is cool and white, matching the disc of the moon.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose look is that of the moon",
      vigraha: "candrasya iva nibhā yasyāḥ sā",
      children: [
        ["candra", "the moon; shining, glittering"],
        ["nibha", "resembling, like, similar"],
      ],
    },
  },

  593: {
    gloss: "Present On The Brow",
    translation:
      "Moving down from the crown, the meditation next places her at the forehead.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who abides on the forehead",
      vigraha: "bhāle sthitā",
      children: [
        ["bhāla", "the forehead, the brow"],
        ["stha", "standing in, situated in"],
      ],
    },
  },

  594: {
    gloss: "Bright As A Rainbow",
    translation:
      "There her colour is not single but banded, the bow of Indra arched across the sky.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose radiance is that of the rainbow",
      vigraha: "indradhanuṣaḥ prabhā iva prabhā yasyāḥ sā",
      children: [
        {
          iast: "indradhanus",
          type: "tatpuruṣa",
          gloss: "Indra's Bow, The Rainbow",
          vigraha: "indrasya dhanuḥ",
          children: [
            ["indra", "Indra, god of the sky and of rain"],
            ["dhanus", "a bow; an arc"],
          ],
        },
        ["prabhā", "light, splendour, radiance"],
      ],
    },
  },

  595: {
    gloss: "Dwelling In The Heart",
    translation:
      "The third station of the meditation is the heart, the seat the texts give to feeling and to true knowing alike.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is seated in the heart",
      vigraha: "hṛdaye sthitā",
      children: [
        ["hṛdaya", "the heart, the seat of feeling and of knowledge"],
        ["stha", "standing in, situated in"],
      ],
    },
  },

  596: {
    gloss: "Like The Sun",
    translation:
      "In the heart her brightness is no longer cool but blazing, comparable to the sun.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose appearance is that of the sun",
      vigraha: "raver iva prakhyā yasyāḥ sā",
      children: [
        ["ravi", "the sun, the sun-god"],
        ["prakhyā", "look, appearance, resemblance"],
      ],
    },
  },

  597: {
    gloss: "Lamp Within The Triangle",
    translation:
      "At the centre of the innermost triangle of the diagram she burns like a small steady flame.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is the lamp inside the triangle",
      vigraha: "trikoṇāntare dīpikā",
      children: [
        {
          iast: "trikoṇāntara",
          type: "tatpuruṣa",
          gloss: "The Interior Of The Triangle",
          vigraha: "trikoṇasya antaram",
          children: [
            {
              iast: "trikoṇa",
              type: "bahuvrīhi",
              gloss: "Three-Cornered, A Triangle",
              vigraha: "trayaḥ koṇā yasya tat",
              children: [
                ["tri", "three"],
                ["koṇa", "a corner, an angle"],
              ],
            },
            ["antara", "the interior, the inside"],
          ],
        },
        ["dīpikā", "a light, a lamp"],
      ],
    },
  },

  598: {
    gloss: "Daughter Of Dakṣa",
    translation:
      "She is Satī, born to the patriarch Dakṣa and married to Śiva against her father's will.",
    note: "A patronymic feminine formed from Dakṣa; not a compound.",
  },

  599: {
    gloss: "Slayer Of The Demons",
    translation:
      "The sons of Diti, who set themselves against the ordered world, meet their end at her hand.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who strikes down the Daityas",
      vigraha: "daityān hantīti",
      children: [
        ["daitya", "a son of Diti, a demon"],
        ["hantrī", "she who strikes down or slays"],
      ],
    },
  },

  600: {
    gloss: "Wrecker Of Dakṣa's Sacrifice",
    translation:
      "The same daughter whose father slighted her husband saw to it that his great rite was broken up and left unfinished.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys the sacrifice of Dakṣa",
      vigraha: "dakṣayajñaṃ vināśayatīti",
      children: [
        {
          iast: "dakṣayajña",
          type: "tatpuruṣa",
          gloss: "The Sacrifice Of Dakṣa",
          vigraha: "dakṣasya yajñaḥ",
          children: [
            ["dakṣa", "Dakṣa, a patriarch, father of Satī"],
            ["yajña", "worship, an offering, a sacrifice"],
          ],
        },
        ["vināśinī", "she who destroys or brings to ruin"],
      ],
    },
  },
};
