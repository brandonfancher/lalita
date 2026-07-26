/**
 * Nāmas 801–900: gloss, translation and compound analysis.
 *
 * Word meanings are grounded in Monier-Williams (1899); the English is written
 * fresh here rather than taken from any modern commentary.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  801: {
    gloss: "The Well-Nourished One",
    translation:
      "She is thriving abundance itself, full-grown and wanting nothing, and it is out of her fullness that every creature is fed.",
    pos: "adjective",
  },

  802: {
    gloss: "The Primordial One",
    translation:
      "She belongs to no epoch, having already been there before the oldest thing anyone calls old.",
    pos: "adjective",
  },

  803: {
    gloss: "The One Worthy Of Worship",
    translation:
      "Reverence comes to rest in her, for she is the one to whom every act of worship is finally owed.",
    pos: "adjective",
  },

  804: {
    gloss: "The Lotus",
    translation:
      "She is the blue lotus that opens on still water, and, in the older reach of the word, the water and the wide sky as well.",
  },

  805: {
    gloss: "The Lotus-Eyed",
    translation:
      "Her two eyes have the long cool shape of lotus petals, and her glance falls with the same unhurried opening.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having eyes like lotuses",
      vigraha: "puṣkare iva īkṣaṇe yasyāḥ sā",
      children: [
        ["puṣkara", "blue lotus, lotus flower"],
        ["īkṣaṇa", "eye, look, glance"],
      ],
    },
  },

  806: {
    gloss: "The Supreme Light",
    translation:
      "She is the light past all lights, the self-shining ground by which suns and lamps and thoughts are themselves made visible.",
    gender: "neuter",
    stem: "jyotis",
    declension: "s-stem",
    note: "Neuter s-stem jyotis with the agreeing neuter adjective param; a two-word phrase rather than a compound.",
  },

  807: {
    gloss: "The Supreme Abode",
    translation:
      "She is the highest dwelling, the place past which there is nowhere further to go, and also the splendour such a place gives off.",
    gender: "neuter",
    stem: "dhāman",
    declension: "an-stem",
    note: "Neuter an-stem dhāman with the agreeing neuter adjective param; a two-word phrase rather than a compound.",
  },

  808: {
    gloss: "The Ultimate Atom",
    translation:
      "She is the last indivisible particle, so small that nothing can be taken from her, which is the near side of her being so vast that nothing can be added.",
    gender: "masculine",
    compound: {
      type: "karmadhāraya",
      gloss: "the ultimate atom",
      vigraha: "paramaḥ ca asau aṇuḥ ca",
      children: [
        ["parama", "highest, ultimate, last"],
        ["aṇu", "atom, minute particle"],
      ],
    },
  },

  809: {
    gloss: "Higher Than The Highest",
    translation:
      "Whatever is named as supreme, she stands beyond it, so the search for something higher finds no stopping place short of her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "higher than what is highest",
      vigraha: "parasmāt api parā",
      children: [
        ["parāt", "than what is supreme (ablative of para)"],
        ["parā", "farther, higher, beyond"],
      ],
    },
  },

  810: {
    gloss: "Holding The Noose",
    translation:
      "The noose lies in her hand, the cord with which she draws her devotees toward herself and ties down whatever needs tying.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having a noose in her hand",
      vigraha: "pāśaḥ haste yasyāḥ sā",
      children: [
        ["pāśa", "noose, snare, fetter"],
        ["hasta", "hand"],
      ],
    },
  },

  811: {
    gloss: "Destroyer Of The Noose",
    translation:
      "The same hand that holds the noose severs it, and the bondage tying a soul to its own narrowness falls away.",
    compound: {
      type: "tatpuruṣa",
      gloss: "slayer of the noose",
      vigraha: "pāśaṃ hanti iti pāśahantrī",
      children: [
        ["pāśa", "noose, bond, fetter"],
        ["hantrī", "she who strikes down, destroyer"],
      ],
    },
  },

  812: {
    gloss: "Shatterer Of Hostile Mantras",
    translation:
      "Spells aimed at her devotees break apart on reaching her, their force undone before it can land.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who splits apart the mantras of enemies",
      vigraha: "paramantrān vibhinatti iti paramantravibhedinī",
      children: [
        {
          iast: "paramantra",
          type: "tatpuruṣa",
          gloss: "an enemy's spell",
          vigraha: "parasya mantraḥ",
          children: [
            ["para", "other, alien, hostile"],
            ["mantra", "sacred formula, incantation, spell"],
          ],
        },
        ["vibhedinī", "she who splits apart, breaker, dispeller"],
      ],
    },
  },

  813: {
    gloss: "The Embodied",
    translation:
      "She settles into definite shape and can be met as a figure with limbs, ornaments and a face.",
    pos: "adjective",
  },

  814: {
    gloss: "The Formless",
    translation:
      "She is just as truly without shape, since any outline drawn around her would already not be hers.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "not having form",
      vigraha: "na mūrtā iti amūrtā",
      children: [
        ["a", "not, un-"],
        ["mūrta", "having a fixed shape, embodied, material"],
      ],
    },
  },

  815: {
    gloss: "Content With Perishable Gifts",
    translation:
      "She is satisfied by what fades — a flower, a handful of rice, a passing thought — and asks no offering that will last.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "satisfied by impermanent things",
      vigraha: "anityaiḥ tṛptā",
      children: [
        {
          iast: "anitya",
          type: "tatpuruṣa",
          gloss: "not lasting, transient",
          vigraha: "na nityam iti anityam",
          children: [
            ["a", "not, un-"],
            ["nitya", "perpetual, everlasting"],
          ],
        },
        ["tṛpta", "satisfied, contented"],
      ],
    },
  },

  816: {
    gloss: "Swan On The Sages' Mind-Lake",
    translation:
      "The quieted mind of a sage is her lake Mānasa, and she floats there as a swan that will settle on no more troubled water.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the swan on the mind-lake of the sages",
      vigraha: "munīnāṃ mānase haṃsikā",
      children: [
        {
          iast: "munimānasa",
          type: "tatpuruṣa",
          gloss: "the minds of the sages, which are their Mānasa lake",
          vigraha: "munīnāṃ mānasam",
          children: [
            ["muni", "sage, ascetic, one moved by inward impulse"],
            ["mānasa", "the mind; the lake Mānasa"],
          ],
        },
        ["haṃsikā", "female swan or wild goose"],
      ],
    },
  },

  817: {
    gloss: "Whose Vow Is Truth",
    translation:
      "Truth is the observance she keeps, so that what she says is the case by her saying it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having truth for her vow",
      vigraha: "satyaṃ vrataṃ yasyāḥ sā",
      children: [
        ["satya", "truth, what is real"],
        ["vrata", "vow, observance, rule of life"],
      ],
    },
  },

  818: {
    gloss: "Whose Form Is The Real",
    translation:
      "Whatever is genuinely there in a thing is her form; take away everything that merely seems, and she is the remainder.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having the real for her form",
      vigraha: "satyam eva rūpaṃ yasyāḥ sā",
      children: [
        ["satya", "truth, reality, what genuinely is"],
        ["rūpa", "form, shape, appearance"],
      ],
    },
  },

  819: {
    gloss: "Inner Ruler Of All",
    translation:
      "She governs each creature from inside it, standing nearer to that creature than it stands to itself.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the inner controller of everything",
      vigraha: "sarveṣām antaryāmiṇī",
      children: [
        ["sarva", "all, every, the whole"],
        {
          iast: "antaryāmiṇī",
          type: "tatpuruṣa",
          gloss: "she who regulates from within",
          vigraha: "antar yamayati iti antaryāmiṇī",
          children: [
            ["antar", "within, inside"],
            ["yāmin", "restraining, controlling"],
          ],
        },
      ],
    },
  },

  820: {
    gloss: "The True One",
    translation:
      "She is sat, that which simply is, and she is Satī, the wife whose faithfulness would not survive an insult to her lord.",
  },

  821: {
    gloss: "The Power Of Brahmā",
    translation:
      "As the energy belonging to Brahmā she is the creative push by which a world is first laid out.",
  },

  822: {
    gloss: "Brahman",
    translation:
      "She is the Absolute itself, the single reality that swells past every name and is never one thing among others.",
    gender: "neuter",
    stem: "brahman",
    declension: "an-stem",
    note: "Neuter an-stem brahman, nominative singular brahma.",
  },

  823: {
    gloss: "The Mother",
    translation:
      "She gives birth, and everything that has ever been born stands to her in the relation of a child.",
  },

  824: {
    gloss: "Of Many Forms",
    translation:
      "She wears shape after shape without spending herself, and no one of them is more truly hers than the rest.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having many forms",
      vigraha: "bahūni rūpāṇi yasyāḥ sā",
      children: [
        ["bahu", "many, much, manifold"],
        ["rūpa", "form, shape"],
      ],
    },
  },

  825: {
    gloss: "Worshipped By The Wise",
    translation:
      "Those who have woken up turn to her, their wisdom showing itself in the direction their reverence takes.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "honoured by the wise",
      vigraha: "budhaiḥ arcitā",
      children: [
        ["budha", "one who is awake, a wise or learned man"],
        ["arcita", "honoured, worshipped, saluted"],
      ],
    },
  },

  826: {
    gloss: "The Generatrix",
    translation:
      "She is the impelling force behind birth, rousing what lies latent until it comes out into the open as a living thing.",
  },

  827: {
    gloss: "The Fiercely Burning",
    translation:
      "Her heat is extreme, a violence that burns obstruction away rather than merely warming what it touches.",
    pos: "adjective",
  },

  828: {
    gloss: "The Command",
    translation:
      "She is sovereign command, the unarguable authority a word carries when there is nothing above it to appeal to.",
  },

  829: {
    gloss: "The Foundation",
    translation:
      "She is what other things stand on, the ground that gives a thing its footing and keeps it from falling out of existence.",
  },

  830: {
    gloss: "Of Manifest Form",
    translation:
      "Her shape is plain and public, held out to sight rather than kept behind a screen of secrecy.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is evident",
      vigraha: "prakaṭā ākṛtiḥ yasyāḥ sā",
      children: [
        ["prakaṭa", "evident, manifest, open, public"],
        ["ākṛti", "form, figure, shape"],
      ],
    },
  },

  831: {
    gloss: "Mistress Of The Life-Breath",
    translation:
      "The breath that goes out and returns is hers to govern, and with it the whole current of vitality it carries.",
    compound: {
      type: "tatpuruṣa",
      gloss: "sovereign lady of the vital breath",
      vigraha: "prāṇānām īśvarī",
      children: [
        ["prāṇa", "vital breath, life"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },

  832: {
    gloss: "Giver Of Life",
    translation:
      "She hands out breath, and a body becomes a living creature at the moment she does.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows the vital breath",
      vigraha: "prāṇān dadāti iti prāṇadātrī",
      children: [
        ["prāṇa", "vital breath, life"],
        ["dātrī", "she who gives, bestower"],
      ],
    },
  },

  833: {
    gloss: "Embodied As The Fifty Seats",
    translation:
      "She takes the form of the fifty sacred seats, one for each sound of the alphabet, so that the map of holy places and the map of speech turn out to be one map.",
    note: "The suffix -in carries the possession, so pañcāśatpīṭharūpa is the compound and rūpiṇī is built on it; the name is also read as a bahuvrīhi, she who has the fifty seats for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of the fifty seats",
      vigraha: "pañcāśatpīṭhānāṃ rūpiṇī",
      children: [
        {
          iast: "pañcāśatpīṭha",
          type: "dvigu",
          gloss: "the set of fifty seats",
          vigraha: "pañcāśat pīṭhāni",
          children: [
            ["pañcāśat", "fifty"],
            ["pīṭha", "seat, pedestal, sacred site"],
          ],
        },
        ["rūpiṇī", "she who bears the form of"],
      ],
    },
  },

  834: {
    gloss: "The Unfettered",
    translation:
      "No chain holds her, and nothing outside her sets a limit on what she may do.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having no chains",
      vigraha: "vigatā śṛṅkhalā yasyāḥ sā",
      children: [
        ["vi", "apart, away, without"],
        ["śṛṅkhalā", "chain, fetter"],
      ],
    },
  },

  835: {
    gloss: "Dwelling In Solitude",
    translation:
      "She abides where things have been told apart and set aside, in the clean solitude that discrimination opens up.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding in what is set apart",
      vigraha: "vivikte tiṣṭhati iti viviktasthā",
      children: [
        ["vivikta", "separated, discriminated, solitary"],
        ["stha", "standing, abiding in"],
      ],
    },
  },

  836: {
    gloss: "Mother Of Heroes",
    translation:
      "She bears heroes, and in the tantric reading her child is the vīra, the adept brave enough for her rites.",
    stem: "vīramātṛ",
    declension: "ṛ-stem",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mother of heroes",
      vigraha: "vīrāṇāṃ mātā",
      children: [
        ["vīra", "hero, brave man; in Tantra, the adept"],
        ["mātṛ", "mother"],
      ],
    },
  },

  837: {
    gloss: "Mother Of Space",
    translation:
      "Ether, the first and subtlest of the elements, comes out of her, so that even emptiness has a parent.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who brings forth the sky",
      vigraha: "viyataḥ prasūḥ",
      children: [
        ["viyat", "sky, atmosphere, ether"],
        ["prasū", "she who brings forth, mother"],
      ],
    },
  },

  838: {
    gloss: "The Bestower Of Release",
    translation:
      "She carries the feminine of Viṣṇu's own name, read in the tradition as the one who hands liberation over.",
  },

  839: {
    gloss: "The Abode Of Liberation",
    translation:
      "Freedom is not a country one travels to but a coming to rest in her, and she is that resting place.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the dwelling place of liberation",
      vigraha: "mukteḥ nilayaḥ",
      children: [
        ["mukti", "release, final liberation"],
        ["nilaya", "abode, resting place"],
      ],
    },
  },

  840: {
    gloss: "Embodied As The Root Form",
    translation:
      "Every image made of her copies one original body, and she is that root form from which the copies take their likeness.",
    note: "Analysed as rūpin, the possessive derivative of mūlavigraharūpa, since the suffix and not the compound expresses the having; a bahuvrīhi reading, she whose form is the root body, is equally defensible.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of the original body",
      vigraha: "mūlavigrahasya rūpiṇī",
      children: [
        {
          iast: "mūlavigraha",
          type: "karmadhāraya",
          gloss: "the original body",
          vigraha: "mūlaṃ ca tad vigrahaḥ ca",
          children: [
            ["mūla", "root, origin, base"],
            ["vigraha", "body, bodily form"],
          ],
        },
        ["rūpiṇī", "she who bears the form of"],
      ],
    },
  },

  841: {
    gloss: "Knower Of The Heart",
    translation:
      "She reads the intention behind a gesture, so an offering is weighed by the feeling put into it and not by its cost.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who knows what is felt",
      vigraha: "bhāvaṃ jānāti iti bhāvajñā",
      children: [
        ["bhāva", "state of mind, feeling, disposition, intention"],
        ["jña", "knowing, familiar with"],
      ],
    },
  },

  842: {
    gloss: "Curer Of The Sickness Of Existence",
    translation:
      "Being caught in birth after birth is counted here as an illness, and she is the physician who kills the disease outright.",
    compound: {
      type: "tatpuruṣa",
      gloss: "destroyer of the disease of worldly existence",
      vigraha: "bhavarogaṃ hanti iti bhavarogaghnī",
      children: [
        {
          iast: "bhavaroga",
          type: "karmadhāraya",
          gloss: "the sickness that is worldly existence",
          vigraha: "bhavaḥ eva rogaḥ",
          children: [
            ["bhava", "becoming, birth, worldly existence"],
            ["roga", "disease, sickness, infirmity"],
          ],
        },
        ["ghnī", "she who strikes down, destroyer"],
      ],
    },
  },

  843: {
    gloss: "Turner Of The Wheel Of Becoming",
    translation:
      "The round of birth and death revolves because she keeps it revolving, and it would halt the instant she let go.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who sets the wheel of existence turning",
      vigraha: "bhavacakraṃ pravartayati iti bhavacakrapravartinī",
      children: [
        {
          iast: "bhavacakra",
          type: "tatpuruṣa",
          gloss: "the wheel of worldly existence",
          vigraha: "bhavasya cakram",
          children: [
            ["bhava", "becoming, birth, worldly existence"],
            ["cakra", "wheel"],
          ],
        },
        ["pravartinī", "she who sets in motion, keeps going"],
      ],
    },
  },

  844: {
    gloss: "Essence Of The Vedic Metres",
    translation:
      "What the metres of the hymns are carrying, underneath the count of their syllables, is her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the pith of the sacred metres",
      vigraha: "chandasāṃ sāraḥ",
      children: [
        ["chandas", "metre; a sacred Vedic hymn"],
        ["sāra", "pith, core, essence"],
      ],
    },
  },

  845: {
    gloss: "Essence Of Scripture",
    translation:
      "Take the treatises apart into their definitions and arguments, and what will not reduce any further is her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the pith of the scriptures",
      vigraha: "śāstrāṇāṃ sāraḥ",
      children: [
        ["śāstra", "teaching, treatise, sacred text"],
        ["sāra", "pith, core, essence"],
      ],
    },
  },

  846: {
    gloss: "Essence Of Mantras",
    translation:
      "A mantra works because she is the potency inside the syllables, not because the syllables have force of their own.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the pith of the mantras",
      vigraha: "mantrāṇāṃ sāraḥ",
      children: [
        ["mantra", "sacred formula, incantation"],
        ["sāra", "pith, core, essence"],
      ],
    },
  },

  847: {
    gloss: "The Slender-Bellied",
    translation:
      "Her waist is level and flat, the slimness poets have always counted a mark of beauty.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having a flat belly",
      vigraha: "talam iva udaraṃ yasyāḥ sā",
      children: [
        ["tala", "flat surface, level, the flat of the palm"],
        ["udara", "belly, abdomen"],
      ],
    },
  },

  848: {
    gloss: "Of Exalted Fame",
    translation:
      "Her renown is noble in its own right, praise that lifts whoever repeats it rather than merely spreading a name about.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose fame is lofty",
      vigraha: "udārā kīrtiḥ yasyāḥ sā",
      children: [
        ["udāra", "lofty, exalted, noble, generous"],
        ["kīrti", "fame, renown, good report"],
      ],
    },
  },

  849: {
    gloss: "Of Unbounded Glory",
    translation:
      "Her majesty has had its tether cut: there is no measure it keeps inside and no rival it has to share room with.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose glory is unrestrained",
      vigraha: "uddāmaṃ vaibhavaṃ yasyāḥ sā",
      children: [
        {
          iast: "uddāma",
          type: "bahuvrīhi",
          gloss: "unrestrained, with its tether loosed",
          vigraha: "utkrāntaṃ dāma yasya tat",
          children: [
            ["ud", "up, out, away"],
            ["dāman", "cord, rope, tether"],
          ],
        },
        ["vaibhava", "might, greatness, magnificence"],
      ],
    },
  },

  850: {
    gloss: "Embodied As The Letters",
    translation:
      "She takes the form of the sounds of the alphabet, so speech is not a description of her but a piece of her.",
    note: "Since -in supplies the possessive sense, varṇarūpa is the compound proper and rūpiṇī the taddhita on it; the word is also read as a bahuvrīhi, she who has the letters for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of the letters",
      vigraha: "varṇānāṃ rūpiṇī",
      children: [
        ["varṇa", "letter, sound of speech; colour"],
        ["rūpiṇī", "she who bears the form of"],
      ],
    },
  },

  851: {
    gloss: "Giver Of Rest To People Scorched By Birth, Death And Old Age",
    translation:
      "The rest she grants ends effort instead of interrupting it, a stopping that does not have to be started again. The name says who needs it: people burnt by being born, growing old and dying, over and over.",
    note: "Printed nāmāvalīs often shorten this to viśrāntidāyinī for the salutation. The stotra gives it in full, and that longer form is used here as the citation form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows repose on those scorched by birth, death and old age",
      vigraha: "janmamṛtyujarābhis taptānāṃ janānāṃ viśrāntidāyinī",
      children: [
        ["janma", "birth, coming into being"],
        ["mṛtyu", "death"],
        ["jarā", "old age, the wearing down of the body"],
        ["tapta", "heated, scorched, tormented (√tap)"],
        ["jana", "people, living beings"],
        ["viśrānti", "rest, repose, cessation"],
        ["dāyinī", "she who gives, bestower"],
      ],
    },
  },

  852: {
    gloss: "Proclaimed By All The Upaniṣads",
    translation:
      "The secret teachings do not merely hint at her; taken together they call her name out loud.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "loudly announced by all the Upaniṣads",
      vigraha: "sarvābhiḥ upaniṣadbhiḥ udghuṣṭā",
      children: [
        {
          iast: "sarvopaniṣad",
          type: "karmadhāraya",
          gloss: "all the Upaniṣads",
          vigraha: "sarvāḥ upaniṣadaḥ",
          children: [
            ["sarva", "all, every"],
            ["upaniṣad", "Upaniṣad, esoteric doctrine"],
          ],
        },
        ["udghuṣṭa", "proclaimed aloud, noised abroad"],
      ],
    },
  },

  853: {
    gloss: "Whose Nature Is The Phase Beyond Peace",
    translation:
      "Of the five kalās the last is Śāntyatītā, the one that has gone past even stillness, and that is what she is made of.",
    note: "ātmikā is the feminine of ātmaka, whose -ka already means having, so the base is śāntyatītakalātman; read as a bahuvrīhi the name would be she whose self is that final kalā.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having for her nature the kalā that transcends peace",
      vigraha: "śāntyatītāyāḥ kalāyāḥ ātmikā",
      children: [
        {
          iast: "śāntyatītakalā",
          type: "karmadhāraya",
          gloss: "the phase called Śāntyatītā",
          vigraha: "śāntyatītā ca sā kalā ca",
          children: [
            {
              iast: "śāntyatīta",
              type: "tatpuruṣa",
              gloss: "gone beyond peace",
              vigraha: "śāntim atītā",
              children: [
                ["śānti", "peace, tranquillity, quiet"],
                ["atīta", "gone beyond, passed over, transcended"],
              ],
            },
            ["kalā", "a part, portion, phase"],
          ],
        },
        ["ātmikā", "having the nature of, consisting of"],
      ],
    },
  },

  854: {
    gloss: "The Unfathomable",
    translation:
      "She is deep the way a voice or a character is deep, with more below the surface than any sounding will reach.",
    pos: "adjective",
  },

  855: {
    gloss: "Abiding At The Edge Of The Sky",
    translation:
      "She stands where space itself gives out, at the far boundary the sky does not cross.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding at the limit of the sky",
      vigraha: "gaganānte tiṣṭhati iti gaganāntasthā",
      children: [
        {
          iast: "gaganānta",
          type: "tatpuruṣa",
          gloss: "the far limit of the sky",
          vigraha: "gaganasya antaḥ",
          children: [
            ["gagana", "sky, firmament, atmosphere"],
            ["anta", "end, limit, boundary"],
          ],
        },
        ["stha", "standing, abiding in"],
      ],
    },
  },

  856: {
    gloss: "The Proud",
    translation:
      "She bears herself proudly, which in her is not vanity but the plain carriage of one who has nothing above her.",
    pos: "adjective",
  },

  857: {
    gloss: "Greedy For Song",
    translation:
      "Singing draws her the way a scent draws a bee, and she is eager enough for it to come where it is.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "eagerly longing for song",
      vigraha: "gāne lolupā",
      children: [
        ["gāna", "song, singing"],
        ["lolupa", "ardently longing for, greedy, covetous"],
      ],
    },
  },

  858: {
    gloss: "Free Of Mental Construction",
    translation:
      "Nothing about her is assembled by imagining; she is what stays once the mind stops fabricating.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of fabrication",
      vigraha: "kalpanayā rahitā",
      children: [
        ["kalpanā", "fabricating, imagining, assuming something to be real"],
        ["rahita", "free from, devoid of, deserted by"],
      ],
    },
  },

  859: {
    gloss: "The Farthest Goal",
    translation:
      "She is the end of the course, the highest pitch past which there is no further degree to reach.",
  },

  860: {
    gloss: "She Who Has No Other Beloved",
    translation:
      "There is no second for her to love, since she and her lord are not two, as the next name goes on to say.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having no lover apart from herself",
      vigraha: "na vidyate anyaḥ kāntaḥ yasyāḥ sā",
      children: [
        ["a", "not, none"],
        ["kānta", "beloved, lover, husband"],
      ],
    },
  },

  861: {
    gloss: "Half Her Beloved's Body",
    translation:
      "In the Ardhanārī form a single body is shared, and the half that is hers cannot be pulled away from the half that is his.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose body is half of her beloved's",
      vigraha: "kāntasya ardhaṃ vigrahaḥ yasyāḥ sā",
      children: [
        {
          iast: "kāntārdha",
          type: "tatpuruṣa",
          gloss: "half of the beloved",
          vigraha: "kāntasya ardham",
          children: [
            ["kānta", "beloved, husband"],
            ["ardha", "half, one part of two"],
          ],
        },
        ["vigraha", "body, bodily form"],
      ],
    },
  },

  862: {
    gloss: "Free Of Cause And Effect",
    translation:
      "Nothing produced her and she follows from nothing, so the chain of dependence that binds other things has no grip on her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "released from effect and cause",
      vigraha: "kāryakāraṇābhyāṃ nirmuktā",
      children: [
        {
          iast: "kāryakāraṇa",
          type: "dvandva",
          gloss: "effect and cause",
          vigraha: "kāryaṃ ca kāraṇaṃ ca",
          children: [
            ["kārya", "effect, what is to be brought about"],
            ["kāraṇa", "cause, that from which something proceeds"],
          ],
        },
        ["nirmukta", "loosed from, wholly free of"],
      ],
    },
  },

  863: {
    gloss: "Rippling With Love-Play",
    translation:
      "Amorous play moves through her as waves move through water, each crest lifting the next.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "set rippling by amorous play",
      vigraha: "kāmakelibhiḥ taraṅgitā",
      children: [
        {
          iast: "kāmakeli",
          type: "tatpuruṣa",
          gloss: "amorous play",
          vigraha: "kāmasya keliḥ",
          children: [
            ["kāma", "desire, love"],
            ["keli", "play, sport, amorous dalliance"],
          ],
        },
        ["taraṅgita", "moving in waves, rippling, undulating"],
      ],
    },
  },

  864: {
    gloss: "Wearing Earrings Of Gleaming Gold",
    translation:
      "Gold catches the light at her ears, and the flash of those ornaments is often the first thing a worshipper sees of her face.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose earrings are of glittering gold",
      vigraha: "kanatkanakamayaṃ tāṭaṅkaṃ yasyāḥ sā",
      children: [
        {
          iast: "kanatkanaka",
          type: "karmadhāraya",
          gloss: "glittering gold",
          vigraha: "kanat ca tat kanakaṃ ca",
          children: [
            ["kanat", "shining, glittering (present participle of √kan)"],
            ["kanaka", "gold"],
          ],
        },
        ["tāṭaṅka", "large ear-ornament, earring"],
      ],
    },
  },

  865: {
    gloss: "Wearing A Body For Play",
    translation:
      "The form she takes is put on for sport, worn the way a player wears a costume and set down again as easily.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who wears a body assumed for play",
      vigraha: "līlāvigrahaṃ dhārayati iti līlāvigrahadhāriṇī",
      children: [
        {
          iast: "līlāvigraha",
          type: "tatpuruṣa",
          gloss: "a body taken on for sport",
          vigraha: "līlāyai vigrahaḥ",
          children: [
            ["līlā", "play, sport, mere semblance assumed in play"],
            ["vigraha", "body, bodily form"],
          ],
        },
        ["dhāriṇī", "she who bears, wears or holds"],
      ],
    },
  },

  866: {
    gloss: "The Unborn",
    translation:
      "She was never brought into being, and under this same name the tradition calls the unborn Prakṛti out of which the world is spun.",
    compound: {
      type: "tatpuruṣa",
      gloss: "not born",
      vigraha: "na jātā iti ajā",
      children: [
        ["a", "not, un-"],
        ["ja", "born, produced"],
      ],
    },
  },

  867: {
    gloss: "Free Of Decay",
    translation:
      "Nothing in her wears thin or wanes, so time takes from her none of what it takes from everything else.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "wholly released from waning",
      vigraha: "kṣayāt vinirmuktā",
      children: [
        ["kṣaya", "loss, waste, wane, decay, destruction"],
        ["vinirmukta", "entirely loosed from, set free of"],
      ],
    },
  },

  868: {
    gloss: "The Artless Beauty",
    translation:
      "Hers is the charm of the young and unpractised, disarming exactly because none of it is calculated.",
    pos: "adjective",
  },

  869: {
    gloss: "Quick To Be Pleased",
    translation:
      "Her favour does not have to be earned slowly; a small sincerity is enough, and she is already gracious.",
    compound: {
      type: "karmadhāraya",
      gloss: "swiftly gracious",
      vigraha: "kṣipraṃ prasīdati iti kṣipraprasādinī",
      children: [
        ["kṣipra", "quick, swift, springing back at once"],
        ["prasādinī", "she who shows favour, gracious one"],
      ],
    },
  },

  870: {
    gloss: "Worshipped By The Inward-Turned",
    translation:
      "Those who have turned their attention around to face inward can reach her by worship, the rite working where the gaze has already gone.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped by those turned inward",
      vigraha: "antarmukhaiḥ samārādhyā",
      children: [
        {
          iast: "antarmukha",
          type: "bahuvrīhi",
          gloss: "having the face turned inward",
          vigraha: "antar mukhaṃ yasya saḥ",
          children: [
            ["antar", "within, inward"],
            ["mukha", "face, mouth"],
          ],
        },
        ["samārādhya", "to be worshipped, to be propitiated"],
      ],
    },
  },

  871: {
    gloss: "Hard To Reach For The Outward-Turned",
    translation:
      "For those whose attention stays fastened on outside things she is next to impossible to find, being nowhere they are looking.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "very hard for the outward-turned to obtain",
      vigraha: "bahirmukhaiḥ sudurlabhā",
      children: [
        {
          iast: "bahirmukha",
          type: "bahuvrīhi",
          gloss: "having the face turned outward",
          vigraha: "bahiḥ mukhaṃ yasya saḥ",
          children: [
            ["bahis", "outside, outward"],
            ["mukha", "face, mouth"],
          ],
        },
        {
          iast: "sudurlabha",
          type: "karmadhāraya",
          gloss: "exceedingly hard to obtain",
          vigraha: "atīva durlabhā",
          children: [
            ["su", "well, very, exceedingly"],
            ["durlabha", "difficult to obtain, scarce, rare"],
          ],
        },
      ],
    },
  },

  872: {
    gloss: "The Threefold Veda",
    translation:
      "She is the triad of Ṛg, Yajus and Sāman, the three kinds of sacred utterance counted together as one body of knowledge.",
  },

  873: {
    gloss: "Abode Of The Three Aims",
    translation:
      "Duty, wealth and pleasure, the three ordinary goods a human life pursues, all have their seat in her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the dwelling place of the group of three",
      vigraha: "trivargasya nilayaḥ",
      children: [
        {
          iast: "trivarga",
          type: "dvigu",
          gloss: "the group of three human aims",
          vigraha: "trayāṇāṃ vargaḥ",
          children: [
            ["tri", "three"],
            ["varga", "group, class, set"],
          ],
        },
        ["nilaya", "abode, resting place"],
      ],
    },
  },

  874: {
    gloss: "Abiding In The Three",
    translation:
      "She is present in each member of every triad — the three states, the three worlds, the three strands of nature — and confined to none of them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding in the three",
      vigraha: "triṣu tiṣṭhati iti tristhā",
      children: [
        ["tri", "three"],
        ["stha", "standing, abiding in"],
      ],
    },
  },

  875: {
    gloss: "Garlanded With The Three Cities",
    translation:
      "The three cities hang about her like a wreath, worn as an ornament rather than defended as a fortress.",
    compound: {
      type: "tatpuruṣa",
      gloss: "wearing the three cities as a garland",
      vigraha: "tripurāṇāṃ mālinī",
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
        ["mālinī", "she who wears a garland, the wreathed one"],
      ],
    },
  },

  876: {
    gloss: "Free Of Sickness",
    translation:
      "No disorder reaches her, and the word carries its other sense as well: she is entire, with nothing lacking.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having no disease",
      vigraha: "nirgataḥ āmayaḥ yasyāḥ sā",
      children: [
        ["nir", "out, away, without (nis before a vowel)"],
        ["āmaya", "sickness, disease"],
      ],
    },
  },

  877: {
    gloss: "Without Support",
    translation:
      "She leans on nothing, because anything she could lean on would itself already be resting on her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having no prop",
      vigraha: "na vidyate ālambaḥ yasyāḥ sā",
      children: [
        ["nir", "out, away, without (nis before a vowel)"],
        ["ālamba", "support, prop, that on which one rests"],
      ],
    },
  },

  878: {
    gloss: "Delighting In Her Own Self",
    translation:
      "Her pleasure is taken in herself, so nothing outside her has to be added for her enjoyment to be complete.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose delight is in her own self",
      vigraha: "svātmani ārāmaḥ yasyāḥ sā",
      children: [
        {
          iast: "svātman",
          type: "karmadhāraya",
          gloss: "one's own self",
          vigraha: "svaḥ eva ātmā",
          children: [
            ["sva", "own, one's own"],
            ["ātman", "self, soul, essence"],
          ],
        },
        ["ārāma", "delight, pleasure; a pleasure garden"],
      ],
    },
  },

  879: {
    gloss: "The Flowing Of Nectar",
    translation:
      "She is the course along which the deathless drink runs, the stream itself and not a cup drawn from it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the course of nectar",
      vigraha: "sudhāyāḥ sṛtiḥ",
      children: [
        ["sudhā", "nectar, the drink of the gods"],
        ["sṛti", "path, course, flowing"],
      ],
    },
  },

  880: {
    gloss: "Expert At Raising Those Sunk In The Mire Of Rebirth",
    translation:
      "Hauling the sunk up out of where they have sunk is a skill, and she has it completely. The name fills the whole first line of its verse: those it rescues are stuck fast in saṃsāra as in mud, and she is not merely willing to pull them out but expert at it.",
    pos: "adjective",
    note: "Printed nāmāvalīs often shorten this to samuddharaṇapaṇḍitā for the salutation. The stotra gives it in full, and that longer form is used here as the citation form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "skilled in raising up those sunk in the mire of rebirth",
      vigraha: "saṃsārapaṅke nirmagnānāṃ samuddharaṇe paṇḍitā",
      children: [
        [
          "saṃsārapaṅka",
          "the mud of transmigration — saṃsāra, the round of rebirth, as paṅka, mire",
        ],
        ["nirmagna", "sunk down into, submerged (ni + √majj)"],
        ["samuddharaṇa", "drawing well up, raising out, rescue"],
        ["paṇḍita", "learned, skilful, expert in"],
      ],
    },
  },

  881: {
    gloss: "To Whom Sacrifice Is Dear",
    translation:
      "The offering fire pleases her, and she comes willingly wherever a rite is carried out properly.",
    compound: {
      type: "bahuvrīhi",
      gloss: "to whom the sacrifice is dear",
      vigraha: "yajñaḥ priyaḥ yasyāḥ sā",
      children: [
        ["yajña", "sacrifice, oblation, act of worship"],
        ["priya", "dear, beloved, pleasing"],
      ],
    },
  },

  882: {
    gloss: "Performer Of The Sacrifice",
    translation:
      "She is not only the one the rite honours but the one carrying it out, acting through the priest's hands.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who performs the sacrifice",
      vigraha: "yajñaṃ karoti iti yajñakartrī",
      children: [
        ["yajña", "sacrifice, oblation"],
        ["kartrī", "she who does or makes, the agent"],
      ],
    },
  },

  883: {
    gloss: "Embodied As The Sacrificer",
    translation:
      "The patron who commissions the rite and bears its cost is also her, so offering, priest and patron collapse into a single presence.",
    note: "The possession sits in the suffix -in, so yajamānasvarūpa is the compound and svarūpiṇī a derivative of it; the bahuvrīhi reading, she who has the sacrificer for her form, is equally current.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is the very nature of the sacrificer",
      vigraha: "yajamānasya svarūpiṇī",
      children: [
        ["yajamāna", "the institutor and patron of a sacrifice"],
        {
          iast: "svarūpiṇī",
          type: "karmadhāraya",
          gloss: "having the very form, embodying the essential nature",
          vigraha: "svam eva rūpam",
          children: [
            ["sva", "own, very, proper"],
            ["rūpiṇī", "she who bears the form of"],
          ],
        },
      ],
    },
  },

  884: {
    gloss: "Support Of Dharma",
    translation:
      "Right order does not hold itself up; it rests on her, and would give way the moment she withdrew.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the support of righteousness",
      vigraha: "dharmasya ādhāraḥ",
      children: [
        ["dharma", "law, right order, duty, righteousness"],
        ["ādhāra", "support, prop, substratum"],
      ],
    },
  },

  885: {
    gloss: "Overseer Of Wealth",
    translation:
      "Riches fall under her supervision, dispensed and withheld at her discretion rather than simply earned.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the superintendent of wealth",
      vigraha: "dhanasya adhyakṣā",
      children: [
        ["dhana", "wealth, riches, property"],
        ["adhyakṣa", "superintendent, overseer, presiding one"],
      ],
    },
  },

  886: {
    gloss: "Increaser Of Wealth And Grain",
    translation:
      "Money in the box and grain in the store both swell under her hand, which is the plain prosperity householders ask her for.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who makes wealth and grain grow",
      vigraha: "dhanadhānyaṃ vivardhayati iti dhanadhānyavivardhinī",
      children: [
        {
          iast: "dhanadhānya",
          type: "dvandva",
          gloss: "wealth and grain",
          vigraha: "dhanaṃ ca dhānyaṃ ca",
          children: [
            ["dhana", "wealth, riches"],
            ["dhānya", "grain, corn"],
          ],
        },
        ["vivardhinī", "she who increases, augments, makes grow"],
      ],
    },
  },

  887: {
    gloss: "To Whom Brahmins Are Dear",
    translation:
      "The inspired and the learned stand close to her, and she favours those who keep the sacred word in use.",
    compound: {
      type: "bahuvrīhi",
      gloss: "to whom brahmins are dear",
      vigraha: "viprāḥ priyāḥ yasyāḥ sā",
      children: [
        ["vipra", "inwardly stirred, inspired one, sage, brahmin"],
        ["priya", "dear, beloved, pleasing"],
      ],
    },
  },

  888: {
    gloss: "Whose Form Is The Brahmin",
    translation:
      "She appears as the brahmin himself, so respect paid to him is not a substitute for worship of her but the thing itself.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having the brahmin for her form",
      vigraha: "vipraḥ eva rūpaṃ yasyāḥ sā",
      children: [
        ["vipra", "inspired one, sage, brahmin"],
        ["rūpa", "form, shape, appearance"],
      ],
    },
  },

  889: {
    gloss: "She Who Makes The Universe Revolve",
    translation:
      "Planets, seasons and lifetimes all come round again, and the turning happens because she keeps causing it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who causes the whirling of the universe",
      vigraha: "viśvasya bhramaṇaṃ karoti iti viśvabhramaṇakāriṇī",
      children: [
        {
          iast: "viśvabhramaṇa",
          type: "tatpuruṣa",
          gloss: "the revolving of the universe",
          vigraha: "viśvasya bhramaṇam",
          children: [
            ["viśva", "all, the whole, the universe"],
            ["bhramaṇa", "wandering about, revolving, turning round"],
          ],
        },
        ["kāriṇī", "she who does, makes or causes"],
      ],
    },
  },

  890: {
    gloss: "For Whom The Universe Is One Mouthful",
    translation:
      "When a cycle closes she swallows the whole world as easily as a single lump of food.",
    compound: {
      type: "bahuvrīhi",
      gloss: "for whom the universe is a mouthful",
      vigraha: "viśvaṃ grāsaḥ yasyāḥ sā",
      children: [
        ["viśva", "all, the whole, the universe"],
        ["grāsa", "a mouthful, a lump of food"],
      ],
    },
  },

  891: {
    gloss: "Of Coral Radiance",
    translation:
      "Her body gives off the deep red glow of coral, a warm colour rather than a burning one.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having the lustre of coral",
      vigraha: "vidrumasya iva ābhā yasyāḥ sā",
      children: [
        ["vidruma", "coral"],
        ["ābhā", "splendour, lustre, appearance"],
      ],
    },
  },

  892: {
    gloss: "The Power Of Viṣṇu",
    translation:
      "She is Viṣṇu's own energy, counted among the Mother goddesses and bearing the emblems he bears.",
  },

  893: {
    gloss: "Embodied As Viṣṇu",
    translation:
      "The preserving god is a shape she takes rather than a separate person she deals with.",
    note: "Taken as a taddhita in -in on viṣṇurūpa, the suffix doing the possessive work; the name can equally be read as a bahuvrīhi, she who has Viṣṇu's form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of Viṣṇu",
      vigraha: "viṣṇoḥ rūpiṇī",
      children: [
        ["viṣṇu", "Viṣṇu, the all-pervading preserver"],
        ["rūpiṇī", "she who bears the form of"],
      ],
    },
  },

  894: {
    gloss: "Having No Origin",
    translation:
      "No womb bore her and no source produced her, which is why nothing at all can be named as prior to her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having no womb or origin",
      vigraha: "na vidyate yoniḥ yasyāḥ sā",
      children: [
        ["a", "not, none"],
        ["yoni", "womb, source, origin"],
      ],
    },
  },

  895: {
    gloss: "The Abode Of The Source",
    translation:
      "Having no origin of her own, she is nonetheless where every origin has its seat.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the dwelling place of the womb of things",
      vigraha: "yoneḥ nilayaḥ",
      children: [
        ["yoni", "womb, source, origin"],
        ["nilaya", "abode, resting place"],
      ],
    },
  },

  896: {
    gloss: "Standing Unmoved At The Summit",
    translation:
      "She holds the peak like an anvil that takes blow after blow without shifting, which is the Vedāntic figure for what never alters.",
    compound: {
      type: "tatpuruṣa",
      gloss: "standing on the summit",
      vigraha: "kūṭe tiṣṭhati iti kūṭasthā",
      children: [
        ["kūṭa", "peak, summit, highest point; an anvil"],
        ["stha", "standing, abiding in"],
      ],
    },
  },

  897: {
    gloss: "Embodied As The Kula",
    translation:
      "She takes the form of the Kaula lineage and of everything its word kula gathers up, the whole family of knower, knowing and known.",
    note: "The having belongs to the suffix -in, so kularūpa is the compound and rūpiṇī the formation on it; a bahuvrīhi analysis, she whose form is the kula, is also well attested.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes the form of the Kula",
      vigraha: "kulasya rūpiṇī",
      children: [
        ["kula", "family, clan, community; the Kaula tradition"],
        ["rūpiṇī", "she who bears the form of"],
      ],
    },
  },

  898: {
    gloss: "Fond Of The Company Of Heroes",
    translation:
      "The circle of adepts pleases her, and she is drawn to the gathering where those fit for her rites sit together.",
    compound: {
      type: "bahuvrīhi",
      gloss: "to whom the assembly of heroes is dear",
      vigraha: "vīragoṣṭhī priyā yasyāḥ sā",
      children: [
        {
          iast: "vīragoṣṭhī",
          type: "tatpuruṣa",
          gloss: "the assembly of heroes",
          vigraha: "vīrāṇāṃ goṣṭhī",
          children: [
            ["vīra", "hero, brave man; in Tantra, the adept"],
            ["goṣṭhī", "assembly, gathering, company"],
          ],
        },
        ["priya", "dear, beloved, pleasing"],
      ],
    },
  },

  899: {
    gloss: "The Heroine",
    translation:
      "She is brave herself, and the courage she asks of her adepts is first of all her own.",
  },

  900: {
    gloss: "Beyond Action",
    translation:
      "Nothing ties her to what she does, so deeds pass through her without leaving the residue that binds a doer to consequences.",
    pos: "adjective",
    note: "Vṛddhi derivative of niṣkarman, 'inactive'; not itself a compound.",
  },
};
