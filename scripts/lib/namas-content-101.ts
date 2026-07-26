/**
 * Nāmas 101–200: the close of the kuṇḍalinī ascent, the cluster of names
 * beginning with bha- and śa-, and the long run of privative nir-/niṣ- names
 * that denies one limitation after another of the goddess.
 *
 * Word meanings are grounded in Monier-Williams (1899); the prose is original.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  101: {
    gloss: "Risen Within The Maṇipūra",
    translation:
      "She comes into view inside the maṇipūra, the wheel stationed at the navel, as the ascending power reaches it.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "risen within the interior of the maṇipūra",
      vigraha: "maṇipūrasya antare uditā",
      children: [
        {
          iast: "maṇipūrāntara",
          type: "tatpuruṣa",
          gloss: "the interior of the maṇipūra",
          vigraha: "maṇipūrasya antaram",
          children: [
            ["maṇipūra", "the navel, and the mystic wheel placed there"],
            ["antara", "the inside, the space within"],
          ],
        },
        ["udita", "risen, come up"],
      ],
    },
  },

  102: {
    gloss: "Piercer Of The Viṣṇu Knot",
    translation:
      "She splits the knot that bears Viṣṇu's name, the second of the three ties that hold the rising power in check.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who splits the knot of viṣṇu",
      vigraha: "viṣṇugranthiṃ vibhinatti iti",
      children: [
        {
          iast: "viṣṇugranthi",
          type: "tatpuruṣa",
          gloss: "the knot belonging to Viṣṇu",
          vigraha: "viṣṇoḥ granthiḥ",
          children: [
            ["viṣṇu", "Viṣṇu, the all-pervading god"],
            ["granthi", "a knot, a tie drawn tight"],
          ],
        },
        ["vibhedin", "splitting apart, piercing through"],
      ],
    },
  },

  103: {
    gloss: "Seated Within The Ājñā Wheel",
    translation:
      "She stands in the hollow of the ājñā wheel between the brows, the station from which command is issued.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding in the inner space of the wheel of command",
      vigraha: "ājñācakrasya antarāle tiṣṭhati iti",
      children: [
        {
          iast: "ājñācakrāntarāla",
          type: "tatpuruṣa",
          gloss: "the inner space of the wheel of command",
          vigraha: "ājñācakrasya antarālam",
          children: [
            {
              iast: "ājñācakra",
              type: "tatpuruṣa",
              gloss: "the wheel of command",
              vigraha: "ājñāyāḥ cakram",
              children: [
                ["ājñā", "an order, unquestioned authority"],
                ["cakra", "a wheel, and so a mystic circle in the body"],
              ],
            },
            ["antarāla", "the space between, an interior"],
          ],
        },
        ["stha", "standing, situated in"],
      ],
    },
  },

  104: {
    gloss: "Piercer Of The Rudra Knot",
    translation:
      "She breaks through the knot named for Rudra, the last of the three obstructions on the upward road.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who splits the knot of rudra",
      vigraha: "rudragranthiṃ vibhinatti iti",
      children: [
        {
          iast: "rudragranthi",
          type: "tatpuruṣa",
          gloss: "the knot belonging to Rudra",
          vigraha: "rudrasya granthiḥ",
          children: [
            ["rudra", "Rudra, the howling god of storms"],
            ["granthi", "a knot, a tie drawn tight"],
          ],
        },
        ["vibhedin", "splitting apart, piercing through"],
      ],
    },
  },

  105: {
    gloss: "Mounted On The Thousand-Petalled Lotus",
    translation:
      "Her climb ends at the crown of the head, where she takes her seat on the lotus of a thousand spokes.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "mounted upon the thousand-spoked lotus",
      vigraha: "sahasrārāmbuje ārūḍhā",
      children: [
        {
          iast: "sahasrārāmbuja",
          type: "karmadhāraya",
          gloss: "the thousand-spoked lotus",
          vigraha: "sahasrāraṃ ca tad ambujaṃ ca",
          children: [
            {
              iast: "sahasrāra",
              type: "bahuvrīhi",
              gloss: "having a thousand spokes",
              vigraha: "sahasram arāḥ yasya tat",
              children: [
                ["sahasra", "a thousand"],
                ["ara", "the spoke of a wheel"],
              ],
            },
            {
              iast: "ambuja",
              type: "tatpuruṣa",
              gloss: "the water-born, a lotus",
              vigraha: "ambuni jāyate iti",
              children: [
                ["ambu", "water"],
                ["ja", "born, sprung from"],
              ],
            },
          ],
        },
        ["ārūḍha", "having mounted, seated upon"],
      ],
    },
  },

  106: {
    gloss: "Raining Down A Flood Of Nectar",
    translation:
      "From that height she pours the deathless drink downward, soaking the body she has just climbed through.",
    compound: {
      type: "tatpuruṣa",
      gloss: "raining down a flood of nectar",
      vigraha: "sudhāsāram abhivarṣati iti",
      children: [
        {
          iast: "sudhāsāra",
          type: "tatpuruṣa",
          gloss: "the flow of nectar",
          vigraha: "sudhāyāḥ sāraḥ",
          children: [
            ["sudhā", "the drink of the gods, nectar"],
            ["sāra", "a flowing, and so the essence or richest part"],
          ],
        },
        ["abhivarṣin", "raining down upon"],
      ],
    },
  },

  107: {
    gloss: "Radiant As A Streak Of Lightning",
    translation:
      "Her brilliance is the brilliance of lightning drawn out like a vine, thin and sudden and impossible to look away from.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose radiance equals a creeper of lightning",
      vigraha: "taḍillatayā samā ruciḥ yasyāḥ sā",
      children: [
        {
          iast: "taḍillatāsama",
          type: "tatpuruṣa",
          gloss: "equal to a creeper of lightning",
          vigraha: "taḍillatayā samā",
          children: [
            {
              iast: "taḍillatā",
              type: "karmadhāraya",
              gloss: "a creeper that is lightning",
              vigraha: "taḍid eva latā",
              children: [
                ["taḍit", "lightning"],
                ["latā", "a creeper, a climbing vine"],
              ],
            },
            ["sama", "equal to, on a level with"],
          ],
        },
        ["ruci", "lustre, radiance"],
      ],
    },
  },

  108: {
    gloss: "Established Above The Six Wheels",
    translation:
      "She rests beyond the six wheels strung along the spine, higher than the whole ladder she has just climbed.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "firmly placed above the six wheels",
      vigraha: "ṣaṭcakrāṇām upari saṃsthitā",
      children: [
        {
          iast: "ṣaṭcakropari",
          type: "tatpuruṣa",
          gloss: "above the six wheels",
          vigraha: "ṣaṭcakrāṇām upari",
          children: [
            {
              iast: "ṣaṭcakra",
              type: "dvigu",
              gloss: "the set of six wheels",
              vigraha: "ṣaṇṇāṃ cakrāṇāṃ samāhāraḥ",
              children: [
                ["ṣaṣ", "six"],
                ["cakra", "a wheel, a mystic circle in the body"],
              ],
            },
            ["upari", "above, over"],
          ],
        },
        ["saṃsthita", "standing firm, settled"],
      ],
    },
  },

  109: {
    gloss: "Of Great Attachment",
    translation:
      "Her hold on her own is a great one, an attachment that does not slacken however far she rises.",
    note:
      "The Devanagari admits two resolutions, mahā + āsakti and mahā + sakti, both meaning a great clinging; many editions instead read mahāśaktiḥ, 'the great power', which fits the surrounding kuṇḍalinī names.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose attachment is great",
      vigraha: "mahatī āsaktiḥ yasyāḥ sā",
      children: [
        ["mahat", "great, vast"],
        ["āsakti", "attachment, clinging, devotedness"],
      ],
    },
  },

  110: {
    gloss: "The Coiled One",
    translation:
      "She lies wound like a sleeping snake at the base of the spine until the moment she straightens and climbs.",
    note:
      "A possessive derivative of kuṇḍala, 'a ring or coil', built with the suffix -in and its feminine -ī; not a compound.",
  },

  111: {
    gloss: "Finer Than A Lotus Fibre",
    translation:
      "She is subtler than the thread that trails from a broken lotus stalk, too fine for the eye to follow.",
    pos: "adjective",
    note: "tanīyas is the comparative of tanu, 'slender', and takes its first member in an ablative sense.",
    compound: {
      type: "tatpuruṣa",
      gloss: "finer than the fibre of a lotus stalk",
      vigraha: "bisatantoḥ tanīyasī",
      children: [
        {
          iast: "bisatantu",
          type: "tatpuruṣa",
          gloss: "the fibre of a lotus stalk",
          vigraha: "bisasya tantuḥ",
          children: [
            ["bisa", "the stalk or shoot of a lotus"],
            ["tantu", "a thread, a fibre"],
          ],
        },
        ["tanīyas", "slenderer, finer"],
      ],
    },
  },

  112: {
    gloss: "Consort Of Bhava",
    translation:
      "As the wife of Bhava she is Śiva's mild face, the aspect of him that the world can bear to meet.",
    note: "Formed from bhava with the -ānī suffix Sanskrit keeps for the wives of gods, as in indrāṇī and rudrāṇī.",
  },

  113: {
    gloss: "Reached By Contemplation",
    translation:
      "She is arrived at by holding her steadily in mind, not by anything the hands can perform.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "attainable through contemplation",
      vigraha: "bhāvanayā gamyā",
      children: [
        ["bhāvanā", "sustained contemplation, a conception held firmly in mind"],
        ["gamya", "to be reached, attainable"],
      ],
    },
  },

  114: {
    gloss: "Axe To The Forest Of Existence",
    translation:
      "Worldly life grows as thick as a forest, and she is the hatchet taken to its trunks.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the axe for the forest of worldly existence",
      vigraha: "bhavāraṇyasya kuṭhārikā",
      children: [
        {
          iast: "bhavāraṇya",
          type: "karmadhāraya",
          gloss: "the forest that is worldly existence",
          vigraha: "bhava eva araṇyam",
          children: [
            ["bhava", "becoming, the round of worldly existence"],
            ["araṇya", "a forest, a trackless wilderness"],
          ],
        },
        ["kuṭhārikā", "a small axe, a hatchet"],
      ],
    },
  },

  115: {
    gloss: "Fond Of The Auspicious",
    translation:
      "What is good and fortunate is what she loves, and she keeps company with those who love it as well.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the auspicious is dear",
      vigraha: "bhadraṃ priyaṃ yasyāḥ sā",
      children: [
        ["bhadra", "auspicious, fortunate, good"],
        ["priya", "dear, beloved"],
      ],
    },
  },

  116: {
    gloss: "Auspicious In Form",
    translation:
      "Her shape is itself good fortune, so that to catch sight of her is already a blessing.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is auspicious",
      vigraha: "bhadrā mūrtiḥ yasyāḥ sā",
      children: [
        ["bhadra", "auspicious, blessed"],
        ["mūrti", "a solid form, an embodiment"],
      ],
    },
  },

  117: {
    gloss: "Giver Of Fortune To Devotees",
    translation:
      "She hands her devotees the good fortune they had no means of earning for themselves.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives good fortune to devotees",
      vigraha: "bhaktānāṃ saubhāgyaṃ dadāti iti",
      children: [
        {
          iast: "bhaktasaubhāgya",
          type: "tatpuruṣa",
          gloss: "the good fortune of devotees",
          vigraha: "bhaktānāṃ saubhāgyam",
          children: [
            ["bhakta", "devoted, one who is attached in worship"],
            ["saubhāgya", "good fortune, welfare, loveliness"],
          ],
        },
        ["dāyin", "giving, bestowing"],
      ],
    },
  },

  118: {
    gloss: "Fond Of Devotion",
    translation:
      "Of everything set before her it is devotion, and not the offering it comes wrapped in, that she prizes.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom devotion is dear",
      vigraha: "bhaktiḥ priyā yasyāḥ sā",
      children: [
        ["bhakti", "devotion, loving attachment"],
        ["priya", "dear, beloved"],
      ],
    },
  },

  119: {
    gloss: "Reached By Devotion",
    translation:
      "Devotion is the road that arrives at her; scholarship and ritual walk only part of the way.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "attainable through devotion",
      vigraha: "bhaktyā gamyā",
      children: [
        ["bhakti", "devotion, loving attachment"],
        ["gamya", "to be reached, attainable"],
      ],
    },
  },

  120: {
    gloss: "Won Over By Devotion",
    translation:
      "Devotion has power over her, and she consents to be governed by it as by nothing else.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "brought under control by devotion",
      vigraha: "bhaktyā vaśyā",
      children: [
        ["bhakti", "devotion, loving attachment"],
        ["vaśya", "to be brought under control, yielding"],
      ],
    },
  },

  121: {
    gloss: "Remover Of Fear",
    translation:
      "She drives fear off the field, and in her presence there is nothing left to be afraid of.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who drives away fear",
      vigraha: "bhayam apahanti iti",
      children: [
        ["bhaya", "fear, dread"],
        ["apaha", "keeping back, driving away"],
      ],
    },
  },

  122: {
    gloss: "She Who Belongs To Śambhu",
    translation:
      "She is Śambhu's own power, named after the benign form under which Śiva is approached.",
    note: "A vṛddhi derivative of śambhu with the feminine -ī, not a compound.",
  },

  123: {
    gloss: "Worshipped By Śāradā",
    translation:
      "Śāradā, who presides over speech and learning, is herself found among her worshippers.",
    pos: "adjective",
    note:
      "śāradā is read here as a name of Sarasvatī; the same syllables can be taken as śārada, 'autumnal', yielding 'to be worshipped in autumn'.",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped by Śāradā",
      vigraha: "śāradayā ārādhyā",
      children: [
        ["śāradā", "Śāradā, a name of Sarasvatī"],
        ["ārādhya", "to be worshipped, to be won over"],
      ],
    },
  },

  124: {
    gloss: "Consort Of Śarva",
    translation:
      "She is the wife of Śarva, the archer's name Rudra has carried since Vedic times.",
    note: "Like bhavānī, built with the -ānī suffix reserved for the wives of gods.",
  },

  125: {
    gloss: "Bestower Of Bliss",
    translation:
      "She deals out shelter, and with the shelter the ease that comes of being safe.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives shelter and bliss",
      vigraha: "śarma dadāti iti",
      children: [
        ["śarman", "shelter, refuge, and the happiness it brings"],
        ["dāyin", "giving, bestowing"],
      ],
    },
  },

  126: {
    gloss: "She Who Belongs To Śaṅkara",
    translation:
      "She is Śaṅkara's own, the female half of the god whose name means the one who makes things well.",
    note: "A vṛddhi derivative of śaṅkara with the feminine -ī, not a compound.",
  },

  127: {
    gloss: "Maker Of Prosperity",
    translation:
      "She manufactures splendour, and wealth and beauty gather wherever she turns her attention.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who produces prosperity",
      vigraha: "śriyaṃ karoti iti",
      children: [
        ["śrī", "radiance, prosperity, good fortune"],
        ["kara", "making, producing"],
      ],
    },
  },

  128: {
    gloss: "The Virtuous One",
    translation:
      "She is straight and true in conduct, the standard by which a good woman is measured.",
    note: "The feminine of sādhu, 'straight, right, good'.",
  },

  129: {
    gloss: "Face Like The Autumn Moon",
    translation:
      "Her face holds the clean cool light of the moon in autumn, once the rains have scrubbed the sky.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose face resembles the autumn moon",
      vigraha: "śaraccandranibham ānanaṃ yasyāḥ sā",
      children: [
        {
          iast: "śaraccandranibha",
          type: "tatpuruṣa",
          gloss: "resembling the autumn moon",
          vigraha: "śaraccandreṇa nibham",
          children: [
            {
              iast: "śaraccandra",
              type: "tatpuruṣa",
              gloss: "the moon of autumn",
              vigraha: "śaradi candraḥ",
              children: [
                ["śarad", "autumn, the season of ripening"],
                ["candra", "the moon, the shining one"],
              ],
            },
            ["nibha", "resembling, of the same look as"],
          ],
        },
        ["ānana", "the face"],
      ],
    },
  },

  130: {
    gloss: "Slender-Waisted",
    translation:
      "Her waist is drawn thin, the one narrow line in a figure otherwise full.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose belly is slender",
      vigraha: "śātam udaraṃ yasyāḥ sā",
      children: [
        ["śāta", "thin, slender, finely drawn"],
        ["udara", "the belly, the waist"],
      ],
    },
  },

  131: {
    gloss: "Possessed Of Peace",
    translation:
      "Peace is a property she owns outright, a stillness that nothing arriving from outside can shake.",
    pos: "adjective",
    note:
      "Formed from śānti, 'peace', with the possessive suffix -mat and its feminine -matī; a secondary derivative rather than a compound.",
  },

  132: {
    gloss: "Without Support",
    translation:
      "Nothing props her up, because she is the ground on which everything else is standing.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she for whom there is no support",
      vigraha: "na vidyate ādhāraḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["ādhāra", "a support, the base a thing rests on"],
      ],
    },
  },

  133: {
    gloss: "Unstained",
    translation:
      "No pigment takes on her; she goes through the world without picking up its colour.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she on whom there is no smear",
      vigraha: "na vidyate añjanaṃ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["añjana", "an ointment or dark pigment, and so a smear or stain"],
      ],
    },
  },

  134: {
    gloss: "Untainted",
    translation:
      "Nothing sticks to her, the way water leaves no film behind on the leaf it runs off.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom nothing adheres",
      vigraha: "na vidyate lepaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["lepa", "a smearing, anything that clings as a coating or stain"],
      ],
    },
  },

  135: {
    gloss: "Stainless",
    translation:
      "She carries no dirt of either kind, neither the body's grime nor the mind's.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no impurity",
      vigraha: "na vidyate malaṃ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["mala", "dirt, filth, impurity of body or of character"],
      ],
    },
  },

  136: {
    gloss: "The Eternal",
    translation: "She does not start and does not stop; she simply goes on.",
    pos: "adjective",
  },

  137: {
    gloss: "Formless",
    translation:
      "She has no outline that could be drawn, and every shape given to her is a loan she permits.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has no shape",
      vigraha: "na vidyate ākāraḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["ākāra", "form, figure, outward shape"],
      ],
    },
  },

  138: {
    gloss: "Unperturbed",
    translation:
      "Nothing crowds her or throws her off; her attention never scatters.",
    note:
      "The second member is an adjective and the compound simply negates it, so this is a nañ-type tatpuruṣa rather than the bahuvrīhi that nis- usually forms.",
    compound: {
      type: "tatpuruṣa",
      gloss: "not agitated",
      vigraha: "na ākulā",
      children: [
        ["nis", "not, un-"],
        ["ākula", "agitated, confused, crowded"],
      ],
    },
  },

  139: {
    gloss: "Beyond The Three Strands",
    translation:
      "The three strands that nature is woven from — clarity, motion and heaviness — are not threaded through her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom the strands are absent",
      vigraha: "na vidyante guṇāḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["guṇa", "a strand or quality, one of the three constituents of nature"],
      ],
    },
  },

  140: {
    gloss: "Without Parts",
    translation:
      "She does not come in portions; there is no fraction of her that could be held on its own.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has no parts",
      vigraha: "na vidyante kalāḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["kalā", "a part, a portion, a single digit of a whole"],
      ],
    },
  },

  141: {
    gloss: "The Tranquil",
    translation: "She has come to rest, every disturbance in her long since spent.",
    pos: "adjective",
  },

  142: {
    gloss: "Free Of Desire",
    translation:
      "She wants for nothing, having no hollow in her that a wish could be poured into.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no desire",
      vigraha: "na vidyate kāmaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["kāma", "desire, the longing for what one lacks"],
      ],
    },
  },

  143: {
    gloss: "Untouched By Calamity",
    translation:
      "Disaster does not reach her, and the accidents that overturn everything else go past.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whom no calamity visits",
      vigraha: "na vidyate upaplavaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["upaplava", "a visitation, an overwhelming misfortune"],
      ],
    },
  },

  144: {
    gloss: "Forever Free",
    translation:
      "She was never bound, so her freedom is not something achieved but something always the case.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "perpetually liberated",
      vigraha: "nityaṃ muktā",
      children: [
        ["nitya", "constant, perpetual"],
        ["mukta", "loosed, set free"],
      ],
    },
  },

  145: {
    gloss: "Unchanging",
    translation:
      "She undergoes no alteration, neither swelling nor decaying as things happen around her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no change",
      vigraha: "na vidyate vikāraḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["vikāra", "a change, a departure from one's natural state"],
      ],
    },
  },

  146: {
    gloss: "Without Manifoldness",
    translation:
      "The spreading multiplicity that makes up the visible world does not extend into her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no manifoldness",
      vigraha: "na vidyate prapañcaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["prapañca", "expansion into manifoldness, the visible world"],
      ],
    },
  },

  147: {
    gloss: "Depending On Nothing",
    translation:
      "She leans on no one and takes no refuge, being the refuge everyone else runs to.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has no support to rest on",
      vigraha: "na vidyate āśrayaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["āśraya", "a resting place, the thing one depends on"],
      ],
    },
  },

  148: {
    gloss: "Forever Pure",
    translation:
      "Her purity is not the result of any washing; it has never at any point been otherwise.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "perpetually pure",
      vigraha: "nityaṃ śuddhā",
      children: [
        ["nitya", "constant, perpetual"],
        ["śuddha", "cleansed, clear, unmixed"],
      ],
    },
  },

  149: {
    gloss: "Forever Awake",
    translation:
      "She never nods off to herself, and her knowing has no first moment to date it from.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "perpetually awakened",
      vigraha: "nityaṃ buddhā",
      children: [
        ["nitya", "constant, perpetual"],
        ["buddha", "awakened, awake, aware"],
      ],
    },
  },

  150: {
    gloss: "Blameless",
    translation:
      "There is nothing in her to fault, no ledge on which censure could find a grip.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is nothing blamable",
      vigraha: "na vidyate avadyaṃ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["avadya", "what is not to be praised, a fault"],
      ],
    },
  },

  151: {
    gloss: "Without A Gap",
    translation:
      "She runs on unbroken, with no interval anywhere in her, in space or in time.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no interval",
      vigraha: "na vidyate antaraṃ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["antara", "an interval, a space or gap between"],
      ],
    },
  },

  152: {
    gloss: "Without A Cause",
    translation:
      "Nothing produced her, so there is nothing to point at as the reason she is there.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has no cause",
      vigraha: "na vidyate kāraṇaṃ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["kāraṇa", "a cause, that from which a thing comes to be"],
      ],
    },
  },

  153: {
    gloss: "Spotless",
    translation:
      "Not a mark shows anywhere on her, as the moon would look with its dark patch wiped off.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she on whom there is no spot",
      vigraha: "na vidyate kalaṅkaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["kalaṅka", "a spot or stain, and so a blot on one's name"],
      ],
    },
  },

  154: {
    gloss: "Without Limiting Adjunct",
    translation:
      "No borrowed attribute narrows her down, and whatever is predicated of her is a costume she can set aside.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has no limiting adjunct",
      vigraha: "na vidyate upādhiḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["upādhi", "a substitute or disguise, a qualification laid over a thing"],
      ],
    },
  },

  155: {
    gloss: "Having No Master",
    translation:
      "There is no lord set over her; the chain of authority ends where she begins.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she over whom there is no lord",
      vigraha: "na vidyate īśvaraḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["īśvara", "a lord, one with power over another"],
      ],
    },
  },

  156: {
    gloss: "Free Of Passion",
    translation:
      "No dye of passion takes on her, and nothing outside her can colour what she does.",
    note:
      "nis + rāga yields nīrāga: the sibilant drops before r and the preceding vowel lengthens to compensate.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no passion",
      vigraha: "na vidyate rāgaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["rāga", "colouring or dyeing, and so passion and attachment"],
      ],
    },
  },

  157: {
    gloss: "Crusher Of Passion",
    translation:
      "She wears passion down and grinds it away in whoever holds to her long enough.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who crushes passion",
      vigraha: "rāgaṃ mathnāti iti",
      children: [
        ["rāga", "passion, attachment"],
        ["mathana", "churning, rubbing away, crushing"],
      ],
    },
  },

  158: {
    gloss: "Free Of Intoxication",
    translation:
      "No rush of pride goes to her head, and she never acts out of that kind of heat.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no intoxication",
      vigraha: "na vidyate madaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["mada", "intoxication, rapture, and so arrogance"],
      ],
    },
  },

  159: {
    gloss: "Destroyer Of Pride",
    translation:
      "She ends the drunkenness of self-regard in anyone who stands close enough to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys intoxication and pride",
      vigraha: "madaṃ nāśayati iti",
      children: [
        ["mada", "intoxication, arrogance"],
        ["nāśin", "destroying, doing away with"],
      ],
    },
  },

  160: {
    gloss: "Free Of Anxiety",
    translation:
      "Nothing worries her, because there is no outcome she has to secure.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no anxiety",
      vigraha: "na vidyate cintā yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["cintā", "anxious thought, worry"],
      ],
    },
  },

  161: {
    gloss: "Without Ego",
    translation:
      "The habit of saying 'I' has no purchase in her, and everything built on that habit goes with it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no ego",
      vigraha: "na vidyate ahaṅkāraḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        {
          iast: "ahaṅkāra",
          type: "tatpuruṣa",
          gloss: "the making of an 'I'",
          vigraha: "ahaṃ iti kāraḥ",
          children: [
            ["aham", "I"],
            ["kāra", "the making, the act of producing"],
          ],
        },
      ],
    },
  },

  162: {
    gloss: "Free Of Delusion",
    translation:
      "She is never taken in; nothing appears to her as anything other than what it is.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no delusion",
      vigraha: "na vidyate mohaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["moha", "bewilderment, loss of one's bearings, delusion"],
      ],
    },
  },

  163: {
    gloss: "Destroyer Of Delusion",
    translation:
      "She burns the fog off those who turn toward her and leaves them able to see.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys delusion",
      vigraha: "mohaṃ nāśayati iti",
      children: [
        ["moha", "bewilderment, delusion"],
        ["nāśin", "destroying, doing away with"],
      ],
    },
  },

  164: {
    gloss: "Without 'Mine'",
    translation:
      "She calls nothing her own, and for that reason nothing can be taken from her.",
    note: "mama is the genitive of aham, 'I', standing here as a nominal member of the compound.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no sense of 'mine'",
      vigraha: "na vidyate mama iti bhāvaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["mama", "'mine', the claim that a thing is one's own"],
      ],
    },
  },

  165: {
    gloss: "Slayer Of Possessiveness",
    translation:
      "She kills the sense of ownership outright rather than arguing anyone out of it.",
    note: "hantrī is the feminine of the agent noun hantṛ, 'slayer'.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who slays the sense of 'mine'",
      vigraha: "mamatāṃ hanti iti",
      children: [
        ["mamatā", "the state of 'mine', self-interest, possessiveness"],
        ["hantṛ", "a slayer, one who strikes down"],
      ],
    },
  },

  166: {
    gloss: "Sinless",
    translation: "No wrongdoing sticks to her, and she has nothing to answer for.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no sin",
      vigraha: "na vidyate pāpaṃ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["pāpa", "evil, wickedness, sin"],
      ],
    },
  },

  167: {
    gloss: "Destroyer Of Sin",
    translation:
      "She wipes out accumulated wrongdoing, which is why the guilty come to her first.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys sin",
      vigraha: "pāpaṃ nāśayati iti",
      children: [
        ["pāpa", "evil, sin"],
        ["nāśin", "destroying, doing away with"],
      ],
    },
  },

  168: {
    gloss: "Free Of Anger",
    translation: "Anger never rises in her, however she is provoked.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no anger",
      vigraha: "na vidyate krodhaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["krodha", "anger, wrath"],
      ],
    },
  },

  169: {
    gloss: "Queller Of Anger",
    translation:
      "She cools anger in others, settling it rather than answering it in kind.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who calms anger",
      vigraha: "krodhaṃ śamayati iti",
      children: [
        ["krodha", "anger, wrath"],
        ["śamana", "calming, allaying, putting out"],
      ],
    },
  },

  170: {
    gloss: "Free Of Greed",
    translation:
      "She grasps at nothing, wanting no more of anything than there already is.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no greed",
      vigraha: "na vidyate lobhaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["lobha", "covetousness, greedy longing"],
      ],
    },
  },

  171: {
    gloss: "Destroyer Of Greed",
    translation:
      "She undoes the appetite for getting and keeping in those who worship her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys greed",
      vigraha: "lobhaṃ nāśayati iti",
      children: [
        ["lobha", "covetousness, greed"],
        ["nāśin", "destroying, doing away with"],
      ],
    },
  },

  172: {
    gloss: "Free Of Doubt",
    translation:
      "Nothing in her hesitates, and no question about her is left standing open.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no doubt",
      vigraha: "na vidyate saṃśayaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["saṃśaya", "doubt, wavering between two possibilities"],
      ],
    },
  },

  173: {
    gloss: "Slayer Of Doubt",
    translation:
      "She kills doubt at the root instead of settling it one question at a time.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who slays doubt",
      vigraha: "saṃśayaṃ hanti iti",
      children: [
        ["saṃśaya", "doubt, uncertainty"],
        ["ghna", "striking down, killing"],
      ],
    },
  },

  174: {
    gloss: "Free Of Becoming",
    translation:
      "She never comes into being, and so she stands outside the turning of birth and death.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no coming to be",
      vigraha: "na vidyate bhavaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["bhava", "coming into being, worldly existence"],
      ],
    },
  },

  175: {
    gloss: "Destroyer Of Worldly Existence",
    translation:
      "For those who ask it of her she brings the round of becoming to a close.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys worldly existence",
      vigraha: "bhavaṃ nāśayati iti",
      children: [
        ["bhava", "becoming, the round of worldly existence"],
        ["nāśin", "destroying, doing away with"],
      ],
    },
  },

  176: {
    gloss: "Free Of Mental Construction",
    translation:
      "She admits no alternatives and no invented distinctions, and is known only where the mind stops sorting.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no mental construction",
      vigraha: "na vidyate vikalpaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["vikalpa", "an alternative, and so a mental construct or hesitation"],
      ],
    },
  },

  177: {
    gloss: "Untroubled",
    translation:
      "Nothing presses in on her, and distress finds no surface in her to work against.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no distress",
      vigraha: "na vidyate ābādhaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["ābādha", "pressing upon, molestation, distress"],
      ],
    },
  },

  178: {
    gloss: "Without Division",
    translation:
      "She has no seam anywhere, no line along which one part could be told from another.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no division",
      vigraha: "na vidyate bhedaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["bheda", "a splitting, a division or difference"],
      ],
    },
  },

  179: {
    gloss: "Destroyer Of Division",
    translation:
      "She dissolves the sense of separateness, beginning with the one between worshipper and worshipped.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who destroys division",
      vigraha: "bhedaṃ nāśayati iti",
      children: [
        ["bheda", "division, difference"],
        ["nāśin", "destroying, doing away with"],
      ],
    },
  },

  180: {
    gloss: "Imperishable",
    translation:
      "She does not perish, since there is nothing in her that could go missing.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she for whom there is no destruction",
      vigraha: "na vidyate nāśaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["nāśa", "loss, disappearance, destruction"],
      ],
    },
  },

  181: {
    gloss: "Crusher Of Death",
    translation:
      "She grinds death down, which is in the end what her worshippers are asking her for.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who crushes death",
      vigraha: "mṛtyuṃ mathnāti iti",
      children: [
        ["mṛtyu", "death, dying"],
        ["mathana", "churning, rubbing away, crushing"],
      ],
    },
  },

  182: {
    gloss: "Without Action",
    translation:
      "She does nothing at all and everything is done, since she has no ends left to pursue.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no activity",
      vigraha: "na vidyate kriyā yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["kriyā", "action, a deed performed, a rite"],
      ],
    },
  },

  183: {
    gloss: "Possessing Nothing",
    translation:
      "She takes nothing in and keeps nothing back, with no property and no household around her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has no possessions",
      vigraha: "na vidyate parigrahaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["parigraha", "laying hold of, acceptance, property and retinue"],
      ],
    },
  },

  184: {
    gloss: "Beyond Comparison",
    translation:
      "No balance can weigh her, because there is nothing to put in the other pan.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she for whom there is no counterweight",
      vigraha: "na vidyate tulā yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["tulā", "a balance or scale, and so equality and comparison"],
      ],
    },
  },

  185: {
    gloss: "Dark-Haired",
    translation:
      "The hair of her head is a deep blue-black, falling dark across all that brightness.",
    note: "The first member is nīla, 'dark', not the privative nis- that opens the names around it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose hair is dark",
      vigraha: "nīlāḥ cikurāḥ yasyāḥ sā",
      children: [
        ["nīla", "dark blue, blue-black"],
        ["cikura", "the hair of the head"],
      ],
    },
  },

  186: {
    gloss: "Free Of Decay",
    translation: "Nothing departs from her and nothing in her wears out.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no wasting away",
      vigraha: "na vidyate apāyaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["apāya", "going away, loss, destruction"],
      ],
    },
  },

  187: {
    gloss: "Free Of Danger",
    translation:
      "No lapse and no peril touches her, and time finds nothing in her to spend.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she for whom there is no passing away or peril",
      vigraha: "na vidyate atyayaḥ yasyāḥ sā",
      children: [
        ["nis", "without, free from"],
        ["atyaya", "passing away, and so danger or transgression"],
      ],
    },
  },

  188: {
    gloss: "Hard To Obtain",
    translation:
      "She is not easily got hold of, and the difficulty is part of what she is rather than an obstacle in front of her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "difficult to obtain",
      vigraha: "duḥkhena labhyate iti",
      children: [
        ["dus", "hard, difficult, ill"],
        ["labha", "the obtaining, the getting of a thing"],
      ],
    },
  },

  189: {
    gloss: "Hard To Approach",
    translation:
      "The way to her is rough going, and not many walk it to the end.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "difficult to traverse",
      vigraha: "duḥkhena gamyate iti",
      children: [
        ["dus", "hard, difficult"],
        ["gama", "going, the traversing of a way"],
      ],
    },
  },

  190: {
    gloss: "Durgā, The Unassailable",
    translation:
      "She is the stronghold no one can storm, and under this name she is the warrior goddess herself.",
    note:
      "Grammatically dus + √gam, 'hard of access'; the tradition also derives the name from an Asura called Durga whom she is said to have killed.",
    compound: {
      type: "tatpuruṣa",
      gloss: "difficult of access",
      vigraha: "duḥkhena gamyate iti",
      children: [
        ["dus", "hard, difficult"],
        ["ga", "going, reaching"],
      ],
    },
  },

  191: {
    gloss: "Slayer Of Sorrow",
    translation:
      "She strikes pain down rather than merely consoling the one who is in it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who slays sorrow",
      vigraha: "duḥkhaṃ hanti iti",
      children: [
        ["duḥkha", "pain, sorrow, discomfort"],
        ["hantṛ", "a slayer, one who strikes down"],
      ],
    },
  },

  192: {
    gloss: "Giver Of Happiness",
    translation:
      "Having taken the pain away she does not leave the space empty but fills it with ease.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows happiness",
      vigraha: "sukhaṃ dadāti iti",
      children: [
        ["sukha", "ease, comfort, happiness"],
        ["prada", "giving, bestowing"],
      ],
    },
  },

  193: {
    gloss: "Far From The Wicked",
    translation:
      "She keeps her distance from the corrupt, who never find her however close they stand.",
    pos: "adjective",
    note:
      "Taken here as an ablative tatpuruṣa; it is also read as a bahuvrīhi, 'she from whom the wicked are held far off'.",
    compound: {
      type: "tatpuruṣa",
      gloss: "distant from the wicked",
      vigraha: "duṣṭebhyaḥ dūrā",
      children: [
        ["duṣṭa", "spoilt, corrupt, wicked"],
        ["dūra", "far off, distant"],
      ],
    },
  },

  194: {
    gloss: "Queller Of Bad Conduct",
    translation:
      "She quiets evil habits down instead of punishing them, so that they simply stop.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who allays bad conduct",
      vigraha: "durācāraṃ śamayati iti",
      children: [
        {
          iast: "durācāra",
          type: "karmadhāraya",
          gloss: "bad conduct",
          vigraha: "duṣṭaḥ ācāraḥ",
          children: [
            ["dus", "bad, ill"],
            ["ācāra", "conduct, customary behaviour"],
          ],
        },
        ["śamana", "calming, allaying, putting an end to"],
      ],
    },
  },

  195: {
    gloss: "Free Of Fault",
    translation:
      "Every defect has been left out of her, and there is no flaw for the eye to catch on.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of fault",
      vigraha: "doṣeṇa varjitā",
      children: [
        ["doṣa", "a fault, a defect, a want"],
        ["varjita", "deprived of, lacking, without"],
      ],
    },
  },

  196: {
    gloss: "All-Knowing",
    translation:
      "Nothing falls outside what she knows, and she waits on no one to report it to her.",
    pos: "adjective",
    note: "An upapada tatpuruṣa: the root-noun -jña takes the preceding member as its object.",
    compound: {
      type: "tatpuruṣa",
      gloss: "knowing everything",
      vigraha: "sarvaṃ jānāti iti",
      children: [
        ["sarva", "all, every, the whole"],
        ["jña", "knowing, one who knows"],
      ],
    },
  },

  197: {
    gloss: "Of Thick Compassion",
    translation:
      "Her pity is not thinly spread; it comes dense and unbroken, poured rather than sprinkled.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose compassion is dense",
      vigraha: "sāndrā karuṇā yasyāḥ sā",
      children: [
        ["sāndra", "thick, dense, unctuous"],
        ["karuṇā", "pity, compassion"],
      ],
    },
  },

  198: {
    gloss: "Without Equal Or Superior",
    translation:
      "No one stands level with her and no one stands above her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of an equal and of a superior",
      vigraha: "samānādhikābhyāṃ varjitā",
      children: [
        {
          iast: "samānādhika",
          type: "dvandva",
          gloss: "an equal and a superior",
          vigraha: "samānaś ca adhikaś ca",
          children: [
            ["samāna", "equal, the same as"],
            ["adhika", "greater, surpassing"],
          ],
        },
        ["varjita", "deprived of, lacking, without"],
      ],
    },
  },

  199: {
    gloss: "Made Of All Powers",
    translation:
      "Every power there is belongs to her substance rather than being an instrument she picks up.",
    pos: "adjective",
    note:
      "-maya is a secondary suffix meaning 'consisting of', with feminine -mayī, added here to the compound sarvaśakti.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of all powers",
      vigraha: "sarvaśaktīnāṃ svarūpā",
      children: [
        {
          iast: "sarvaśakti",
          type: "karmadhāraya",
          gloss: "all powers",
          vigraha: "sarvāḥ śaktayaḥ",
          children: [
            ["sarva", "all, every"],
            ["śakti", "power, capacity, the active energy of a god"],
          ],
        },
        ["maya", "consisting of, made up of"],
      ],
    },
  },

  200: {
    gloss: "Wholly Auspicious",
    translation:
      "She is auspicious the whole way through, and every good thing that happens is a piece of her.",
    compound: {
      type: "karmadhāraya",
      gloss: "the entirely auspicious one",
      vigraha: "sarvā cāsau maṅgalā ca",
      children: [
        ["sarva", "all, entire"],
        ["maṅgala", "auspicious; welfare, good fortune"],
      ],
    },
  },
};
