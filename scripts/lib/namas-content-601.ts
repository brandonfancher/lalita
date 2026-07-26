/**
 * Nāmas 601–700.
 *
 * Word meanings are taken from the Monier-Williams Sanskrit-English Dictionary
 * (1899); the glosses, translations and compound analyses are written fresh.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  601: {
    gloss: "Whose Long Eyes Sway A Little",
    translation:
      "Her long eyes rock very slightly from side to side, the small restless motion of a gaze that misses nothing.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose long eyes are gently swaying",
      vigraha: "darāndolite dīrghe akṣiṇī yasyāḥ sā",
      children: [
        {
          iast: "darāndolita",
          type: "karmadhāraya",
          gloss: "swayed a little",
          vigraha: "daram āndolitam",
          children: [
            ["dara", "a little, slightly"],
            ["āndolita", "swung, set rocking"],
          ],
        },
        ["dīrgha", "long"],
        ["akṣi", "eye"],
      ],
    },
  },

  602: {
    gloss: "Whose Face Shines With A Faint Smile",
    translation:
      "The barest trace of a smile breaks on her lips and lights her whole face from within.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose face is lit up by a slight smile",
      vigraha: "darahāsena ujjvalan mukhaṃ yasyāḥ sā",
      children: [
        {
          iast: "darahāsa",
          type: "karmadhāraya",
          gloss: "a slight smile",
          vigraha: "daraḥ hāsaḥ",
          children: [
            ["dara", "a little, slightly"],
            ["hāsa", "laughter, a smile"],
          ],
        },
        ["ujjvalat", "flaring up, shining out"],
        ["mukha", "face, countenance"],
      ],
    },
  },

  603: {
    gloss: "The Form Of The Teacher",
    translation:
      "She takes shape as the teacher, so that whoever gives genuine instruction is wearing her form for the moment.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the embodied form of the guru",
      vigraha: "guroḥ mūrtiḥ",
      children: [
        ["guru", "a weighty one, a teacher"],
        ["mūrti", "solid form, embodiment"],
      ],
    },
  },

  604: {
    gloss: "Treasury Of Virtues",
    translation:
      "Every good quality is laid up in her the way coin is laid up in a strongroom.",
    compound: {
      type: "tatpuruṣa",
      gloss: "a hoard of good qualities",
      vigraha: "guṇānāṃ nidhiḥ",
      children: [
        ["guṇa", "a strand, a good quality"],
        ["nidhi", "a store, a hoard, a treasury"],
      ],
    },
  },

  605: {
    gloss: "Mother Of Cattle",
    translation:
      "She is the mother of the herds, the source of the cattle on whose milk and labour human life has always leaned.",
    stem: "gomātṛ",
    declension: "ṛ-stem",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mother of cows",
      vigraha: "gavāṃ mātā",
      children: [
        ["go", "a cow, cattle"],
        ["mātṛ", "mother"],
      ],
    },
  },

  606: {
    gloss: "Birthplace Of Guha",
    translation:
      "Guha, the war-god reared in secret, has his origin in her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the place where Guha was born",
      vigraha: "guhasya janmabhūḥ",
      children: [
        ["guha", "Guha, the god Skanda, reared in a hidden place"],
        {
          iast: "janmabhū",
          type: "tatpuruṣa",
          gloss: "birthplace",
          vigraha: "janmanaḥ bhūḥ",
          children: [
            ["janman", "birth, origin"],
            ["bhū", "ground, the place where a thing comes to be"],
          ],
        },
      ],
    },
  },

  607: {
    gloss: "Mistress Of The Gods",
    translation:
      "The gods themselves acknowledge her as the one who rules them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the sovereign lady of the gods",
      vigraha: "devānām īśī",
      children: [
        ["deva", "a god, a shining one"],
        ["īśī", "mistress, one who has power over"],
      ],
    },
  },

  608: {
    gloss: "Abiding In The Rule Of Law",
    translation:
      "Just government is her own ground, and she stands within it wherever a ruler wields the rod fairly.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "standing within the science of just rule",
      vigraha: "daṇḍanītau tiṣṭhatīti",
      children: [
        {
          iast: "daṇḍanīti",
          type: "tatpuruṣa",
          gloss: "the administration of justice",
          vigraha: "daṇḍasya nītiḥ",
          children: [
            ["daṇḍa", "a rod, the rod of punishment"],
            ["nīti", "guidance, conduct of affairs, polity"],
          ],
        },
        ["sthā", "standing, abiding in"],
      ],
    },
  },

  609: {
    gloss: "Whose Form Is The Tiny Space",
    translation:
      "She has the shape of the minute space within the heart that the Upaniṣads call small yet find the whole world inside.",
    note: "The possession is expressed by the suffix -in, so daharākāśarūpa is the compound and rūpiṇī a taddhita on it; the name is also read as a bahuvrīhi, she who has the tiny inner space for her form.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the form of the tiny inner ether",
      vigraha: "daharākāśarūpam asyā astīti",
      children: [
        {
          iast: "daharākāśa",
          type: "karmadhāraya",
          gloss: "the minute space within the heart",
          vigraha: "daharaḥ ākāśaḥ",
          children: [
            ["dahara", "small, fine, subtle"],
            ["ākāśa", "open space, ether"],
          ],
        },
        ["rūpiṇī", "having the form of"],
      ],
    },
  },

  610: {
    gloss: "Worshipped By The Circle Of Lunar Days",
    translation:
      "The whole ring of lunar days honours her, from the first day after the new moon through to the night of the full moon.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "worshipped by the full round of lunar days",
      vigraha: "pratipanmukhyena rākāntena tithimaṇḍalena pūjitā",
      children: [
        {
          iast: "pratipanmukhya",
          type: "bahuvrīhi",
          gloss: "beginning with the first lunar day",
          vigraha: "pratipad mukhyā yasya tat",
          children: [
            ["pratipad", "the first day of a lunar fortnight"],
            ["mukhya", "foremost, first in order"],
          ],
        },
        {
          iast: "rākānta",
          type: "bahuvrīhi",
          gloss: "ending with the full moon",
          vigraha: "rākā antaḥ yasya tat",
          children: [
            ["rākā", "the day of full moon and its presiding goddess"],
            ["anta", "end, limit"],
          ],
        },
        {
          iast: "tithimaṇḍala",
          type: "tatpuruṣa",
          gloss: "the circle of lunar days",
          vigraha: "tithīnāṃ maṇḍalam",
          children: [
            ["tithi", "a lunar day"],
            ["maṇḍala", "a circle, a complete round"],
          ],
        },
        ["pūjitā", "worshipped, honoured"],
      ],
    },
  },

  611: {
    gloss: "Made Of The Digits",
    translation:
      "Her substance is the set of measured portions by which the moon is reckoned and the arts are counted.",
    note: "ātmikā is the feminine of ātmaka, whose -ka suffix already means having, so the word is taken as a derivative of kalātman; the bahuvrīhi reading, she whose self is the digits, is also common.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of the digits",
      vigraha: "kalānām ātmikā, kalāsvarūpā",
      children: [
        ["kalā", "a sixteenth part, a digit of the moon, an art"],
        ["ātman", "self, essential nature"],
      ],
    },
  },

  612: {
    gloss: "Mistress Of The Digits",
    translation:
      "She holds sway over the moon's waxing and waning portions and over the arts that share their name.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the lady who rules the digits",
      vigraha: "kalānāṃ nāthā",
      children: [
        ["kalā", "a digit of the moon, an art"],
        ["nāthā", "mistress, protectress"],
      ],
    },
  },

  613: {
    gloss: "Delighting In Poetic Discourse",
    translation:
      "Poetry spoken aloud is her recreation, and she is drawn to wherever fine words are being made.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "taking pleasure in the recital of poetry",
      vigraha: "kāvyālāpena vinodinī",
      children: [
        {
          iast: "kāvyālāpa",
          type: "tatpuruṣa",
          gloss: "the recitation of poetry",
          vigraha: "kāvyasya ālāpaḥ",
          children: [
            ["kāvya", "the work of a poet, poetry"],
            ["ālāpa", "speaking, discourse"],
          ],
        },
        ["vinodinī", "diverting herself, taking delight"],
      ],
    },
  },

  614: {
    gloss: "Served On Left And Right By Ramā And Vāṇī With Chowries",
    translation:
      "Lakṣmī stands at her left and Sarasvatī at her right, each waving a yak-tail whisk over her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "attended on either side by Lakṣmī and Sarasvatī bearing chowries",
      vigraha: "sacāmarābhyāṃ ramāvāṇībhyāṃ savyadakṣiṇayoḥ sevitā",
      children: [
        {
          iast: "sacāmara",
          type: "bahuvrīhi",
          gloss: "holding a chowrie",
          vigraha: "cāmareṇa saha vartate iti",
          children: [
            ["sa", "together with"],
            ["cāmara", "a fly-whisk of yak hair"],
          ],
        },
        {
          iast: "ramāvāṇī",
          type: "dvandva",
          gloss: "Lakṣmī and Sarasvatī",
          vigraha: "ramā ca vāṇī ca",
          children: [
            ["ramā", "Ramā, the goddess of fortune"],
            ["vāṇī", "Vāṇī, speech personified as Sarasvatī"],
          ],
        },
        {
          iast: "savyadakṣiṇa",
          type: "dvandva",
          gloss: "left and right",
          vigraha: "savyaṃ ca dakṣiṇaṃ ca",
          children: [
            ["savya", "left"],
            ["dakṣiṇa", "right"],
          ],
        },
        ["sevitā", "waited upon, attended"],
      ],
    },
  },

  615: {
    gloss: "The Primal Power",
    translation:
      "She is the power that stands first, before which no other force has anything to work with.",
    compound: {
      type: "karmadhāraya",
      gloss: "the power that comes at the beginning",
      vigraha: "ādyā śaktiḥ",
      children: [
        ["ādi", "beginning, first"],
        ["śakti", "power, capacity, energy"],
      ],
    },
  },

  616: {
    gloss: "Immeasurable",
    translation:
      "No measure can be laid against her, since every yardstick is itself something she contains.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "not to be measured",
      vigraha: "na meyā",
      children: [
        ["a", "not"],
        ["meyā", "able to be measured"],
      ],
    },
  },

  617: {
    gloss: "The Self",
    translation:
      "She is the self, the single thing every creature points to when it says the word 'I'.",
    gender: "masculine",
    stem: "ātman",
    declension: "an-stem",
    note: "ātman is grammatically masculine and stays so here, though the epithet is used of the goddess",
  },

  618: {
    gloss: "The Supreme",
    translation:
      "Nothing stands above her, and there is no further place to look once she is reached.",
    pos: "adjective",
  },

  619: {
    gloss: "Whose Form Purifies",
    translation:
      "The mere shape of her cleanses whoever holds it in mind.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is purifying",
      vigraha: "pāvanā ākṛtir yasyāḥ sā",
      children: [
        ["pāvana", "purifying, cleansing"],
        ["ākṛti", "shape, figure, outward form"],
      ],
    },
  },

  620: {
    gloss: "Mother Of Countless Millions Of World-Eggs",
    translation:
      "Not one universe but many millions of them have her for their mother.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives birth to innumerable crores of universes",
      vigraha: "anekakoṭibrahmāṇḍānāṃ jananī",
      children: [
        {
          iast: "anekakoṭi",
          type: "karmadhāraya",
          gloss: "many tens of millions",
          vigraha: "anekāḥ koṭayaḥ",
          children: [
            ["aneka", "more than one, many"],
            ["koṭi", "ten million, a crore"],
          ],
        },
        {
          iast: "brahmāṇḍa",
          type: "tatpuruṣa",
          gloss: "the cosmic egg, a universe",
          vigraha: "brahmaṇaḥ aṇḍam",
          children: [
            ["brahman", "Brahmā, the creator"],
            ["aṇḍa", "an egg"],
          ],
        },
        ["jananī", "mother, she who brings to birth"],
      ],
    },
  },

  621: {
    gloss: "Of Divine Body",
    translation:
      "The body she wears is of heavenly make, not assembled out of flesh and element.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose bodily form is divine",
      vigraha: "divyaḥ vigrahaḥ yasyāḥ sā",
      children: [
        ["divya", "heavenly, divine"],
        ["vigraha", "body, bodily form"],
      ],
    },
  },

  622: {
    gloss: "Uttering The Syllable Klīṃ",
    translation:
      "She sounds as klīṃ, the seed-syllable of desire that opens her mantra.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who makes the sound klīṃ",
      vigraha: "klīm ity akṣaraṃ karotīti",
      children: [
        ["klīṃ", "klīṃ, a seed-syllable of the goddess"],
        ["kārī", "making, sounding, uttering"],
      ],
    },
  },

  623: {
    gloss: "The Sole One",
    translation:
      "She is alone and unmixed, taking nothing into herself from outside.",
    pos: "adjective",
  },

  624: {
    gloss: "The Secret One",
    translation:
      "She is to be kept hidden, spoken of only where the speaking will do good.",
    pos: "adjective",
  },

  625: {
    gloss: "Giver Of The State Of Aloneness",
    translation:
      "She hands over the condition of perfect solitude in which the soul is loosed from every tie.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows the station of absolute isolation",
      vigraha: "kaivalyapadaṃ dadātīti",
      children: [
        {
          iast: "kaivalyapada",
          type: "karmadhāraya",
          gloss: "the state that is aloneness",
          vigraha: "kaivalyam eva padam",
          children: [
            ["kaivalya", "isolation, the soul's detachment from all else"],
            ["pada", "a station, a state arrived at"],
          ],
        },
        ["dāyinī", "giving, bestowing"],
      ],
    },
  },

  626: {
    gloss: "She Of The Three Cities",
    translation:
      "She is Tripurā, the goddess whose name gathers up every triad, from the three fortified cities of the old story to the three states in which a person lives.",
    pos: "noun",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the three cities belong",
      vigraha: "trīṇi purāṇi yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["pura", "a fortified town, a city"],
      ],
    },
  },

  627: {
    gloss: "Revered By The Three Worlds",
    translation:
      "Earth, air and heaven together bow to her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be saluted by the triple world",
      vigraha: "trijagatā vandyā",
      children: [
        {
          iast: "trijagat",
          type: "dvigu",
          gloss: "the three worlds taken together",
          vigraha: "trayāṇāṃ jagatāṃ samāhāraḥ",
          children: [
            ["tri", "three"],
            ["jagat", "the moving world"],
          ],
        },
        ["vandyā", "to be praised, worthy of salutation"],
      ],
    },
  },

  628: {
    gloss: "Of Threefold Form",
    translation:
      "She wears three shapes, matching the three works of making, keeping and withdrawing the world.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has three embodiments",
      vigraha: "tisraḥ mūrtayaḥ yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["mūrti", "embodiment, form"],
      ],
    },
  },

  629: {
    gloss: "Sovereign Of The Thirty Gods",
    translation:
      "The thirty deities of the Vedic reckoning hold her as their queen.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mistress of the thirty gods",
      vigraha: "tridaśānām īśvarī",
      children: [
        {
          iast: "tridaśa",
          type: "dvigu",
          gloss: "the thirty, a name for the gods",
          vigraha: "trayaḥ daśāḥ",
          children: [
            ["tri", "three"],
            ["daśa", "ten"],
          ],
        },
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },

  630: {
    gloss: "Of Three Syllables",
    translation:
      "She is present in a mantra of three syllables and takes that brief sound for her body.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who consists of three syllables",
      vigraha: "trīṇy akṣarāṇi yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["akṣara", "a syllable, an imperishable sound"],
      ],
    },
  },

  631: {
    gloss: "Rich In Divine Fragrance",
    translation:
      "A scent not of this world hangs about her in abundance.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "abounding in heavenly perfume",
      vigraha: "divyagandhena āḍhyā",
      children: [
        {
          iast: "divyagandha",
          type: "karmadhāraya",
          gloss: "heavenly fragrance",
          vigraha: "divyaḥ gandhaḥ",
          children: [
            ["divya", "heavenly, divine"],
            ["gandha", "smell, fragrance"],
          ],
        },
        ["āḍhyā", "rich in, abounding with"],
      ],
    },
  },

  632: {
    gloss: "Adorned With A Vermilion Mark",
    translation:
      "A stroke of red lead on her brow completes her beauty.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "made beautiful by a tilaka of vermilion",
      vigraha: "sindūratilakena añcitā",
      children: [
        {
          iast: "sindūratilaka",
          type: "tatpuruṣa",
          gloss: "a forehead mark of vermilion",
          vigraha: "sindūrasya tilakaḥ",
          children: [
            ["sindūra", "red lead, vermilion"],
            ["tilaka", "a mark made on the forehead"],
          ],
        },
        ["añcita", "made handsome, distinguished, adorned"],
      ],
    },
  },

  633: {
    gloss: "Umā",
    translation:
      "She is Umā, the mountain's daughter who won Śiva by sheer persistence in austerity.",
  },

  634: {
    gloss: "Daughter Of The Mountain Lord",
    translation:
      "Himavat, chief among mountains, is her father.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the daughter of the lord of mountains",
      vigraha: "śailendrasya tanayā",
      children: [
        {
          iast: "śailendra",
          type: "tatpuruṣa",
          gloss: "the lord of mountains, the Himālaya",
          vigraha: "śailānām indraḥ",
          children: [
            ["śaila", "a rock, a mountain"],
            ["indra", "chief, foremost one"],
          ],
        },
        ["tanayā", "daughter"],
      ],
    },
  },

  635: {
    gloss: "The Fair One",
    translation:
      "Her complexion is pale and shining, and she is named for that brightness.",
  },

  636: {
    gloss: "Attended By Gandharvas",
    translation:
      "The gandharvas, musicians of the sky, wait on her with their singing.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "waited upon by the celestial singers",
      vigraha: "gandharvaiḥ sevitā",
      children: [
        ["gandharva", "a Gandharva, a celestial musician"],
        ["sevitā", "served, attended upon"],
      ],
    },
  },

  637: {
    gloss: "Whose Womb Is The Universe",
    translation:
      "All that exists is carried inside her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who holds the whole world in her womb",
      vigraha: "viśvaṃ garbhe yasyāḥ sā",
      children: [
        ["viśva", "all, the whole world"],
        ["garbha", "womb, interior"],
      ],
    },
  },

  638: {
    gloss: "Whose Womb Holds The Gold",
    translation:
      "The golden germ from which the worlds unfold lies within her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whose womb the golden seed rests",
      vigraha: "svarṇaṃ garbhe yasyāḥ sā",
      children: [
        ["svarṇa", "gold"],
        ["garbha", "womb, embryo"],
      ],
    },
  },

  639: {
    gloss: "Giver To The Lowliest",
    translation:
      "She gives to those at the very bottom, so that no petitioner stands too far down the scale to be reached by her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives to the lowly",
      vigraha: "avarebhyaḥ dadātīti",
      children: [
        ["avara", "low, inferior, least"],
        ["dā", "giving"],
      ],
    },
  },

  640: {
    gloss: "Supreme Mistress Of Speech",
    translation:
      "Every kind of utterance, from the plainest word to the highest hymn, falls under her authority.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the overlord of all speech",
      vigraha: "vācām adhīśvarī",
      children: [
        ["vāc", "speech, voice, word"],
        {
          iast: "adhīśvarī",
          type: "tatpuruṣa",
          gloss: "supreme mistress",
          vigraha: "adhikā īśvarī",
          children: [
            ["adhi", "over, above"],
            ["īśvarī", "mistress, sovereign lady"],
          ],
        },
      ],
    },
  },

  641: {
    gloss: "Reached Through Meditation",
    translation:
      "There is no road to her but the inward one.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be approached by meditation",
      vigraha: "dhyānena gamyā",
      children: [
        ["dhyāna", "sustained meditation"],
        ["gamyā", "to be gone to, attainable"],
      ],
    },
  },

  642: {
    gloss: "Unbounded",
    translation:
      "No line can be drawn around her and no definition ever closes on her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "not able to be delimited",
      vigraha: "na paricchedyā",
      children: [
        ["a", "not"],
        ["paricchedyā", "able to be cut off, bounded or defined"],
      ],
    },
  },

  643: {
    gloss: "Giver Of Knowledge",
    translation:
      "Knowledge is hers to hand over, and no one takes it who has not been given it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows knowledge",
      vigraha: "jñānaṃ dadātīti",
      children: [
        ["jñāna", "knowing, knowledge"],
        ["dā", "giving"],
      ],
    },
  },

  644: {
    gloss: "Whose Body Is Knowledge",
    translation:
      "What in another would be flesh is in her nothing but knowing.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose bodily form is knowledge itself",
      vigraha: "jñānam eva vigrahaḥ yasyāḥ sā",
      children: [
        ["jñāna", "knowledge"],
        ["vigraha", "body, bodily form"],
      ],
    },
  },

  645: {
    gloss: "Known Through All The Vedānta",
    translation:
      "The closing portions of every Veda exist in order to make her known.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be known by the whole of the Vedānta",
      vigraha: "sarvair vedāntaiḥ saṃvedyā",
      children: [
        {
          iast: "sarvavedānta",
          type: "karmadhāraya",
          gloss: "the whole body of Vedānta",
          vigraha: "sarve vedāntāḥ",
          children: [
            ["sarva", "all, entire"],
            {
              iast: "vedānta",
              type: "tatpuruṣa",
              gloss: "the end of the Veda",
              vigraha: "vedasya antaḥ",
              children: [
                ["veda", "the Veda, sacred knowledge"],
                ["anta", "end, conclusion"],
              ],
            },
          ],
        },
        ["saṃvedyā", "to be known or understood"],
      ],
    },
  },

  646: {
    gloss: "Whose Nature Is Truth And Bliss",
    translation:
      "What she is made of is real being together with joy that has no end to it.",
    note: "Read as a taddhita in -in on satyānandasvarūpa, since it is the suffix and not the compound that supplies the having; a bahuvrīhi analysis, she whose form is truth and bliss, is equally defensible.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having truth and bliss for her own nature",
      vigraha: "satyānandaḥ svarūpam asyā astīti",
      children: [
        {
          iast: "satyānanda",
          type: "dvandva",
          gloss: "truth and bliss",
          vigraha: "satyaṃ ca ānandaś ca",
          children: [
            ["satya", "true, real being"],
            ["ānanda", "joy, bliss"],
          ],
        },
        ["svarūpiṇī", "having as her own form"],
      ],
    },
  },

  647: {
    gloss: "Worshipped By Lopāmudrā",
    translation:
      "Lopāmudrā, the wife of Agastya, gave her worship and left a line of practice behind her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "honoured by Lopāmudrā",
      vigraha: "lopāmudrayā arcitā",
      children: [
        ["lopāmudrā", "Lopāmudrā, wife of the sage Agastya"],
        ["arcitā", "honoured, worshipped"],
      ],
    },
  },

  648: {
    gloss: "By Whom The Round Of Worlds Was Fashioned In Play",
    translation:
      "The whole assembly of world-eggs was put together by her with the ease of a child at a game.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whom the multitude of universes was shaped in sport",
      vigraha: "līlākḷptaṃ brahmāṇḍamaṇḍalaṃ yayā sā",
      children: [
        {
          iast: "līlākḷpta",
          type: "tatpuruṣa",
          gloss: "fashioned in play",
          vigraha: "līlayā kḷptam",
          children: [
            ["līlā", "play, sport, effortless doing"],
            ["kḷpta", "arranged, formed, brought about"],
          ],
        },
        {
          iast: "brahmāṇḍamaṇḍala",
          type: "tatpuruṣa",
          gloss: "the whole company of world-eggs",
          vigraha: "brahmāṇḍānāṃ maṇḍalam",
          children: [
            {
              iast: "brahmāṇḍa",
              type: "tatpuruṣa",
              gloss: "the cosmic egg, a universe",
              vigraha: "brahmaṇaḥ aṇḍam",
              children: [
                ["brahman", "Brahmā, the creator"],
                ["aṇḍa", "an egg"],
              ],
            },
            ["maṇḍala", "a circle, an assembled group"],
          ],
        },
      ],
    },
  },

  649: {
    gloss: "Invisible",
    translation:
      "No eye reaches her, because seeing is something she does rather than something done to her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "not able to be seen",
      vigraha: "na dṛśyā",
      children: [
        ["a", "not"],
        ["dṛśyā", "visible, able to be seen"],
      ],
    },
  },

  650: {
    gloss: "Free Of Anything Visible",
    translation:
      "Nothing that could be looked at is left in her once she is seen truly.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of any object of sight",
      vigraha: "dṛśyena rahitā",
      children: [
        ["dṛśya", "a visible thing, an object of sight"],
        ["rahita", "left, free from, without"],
      ],
    },
  },

  651: {
    gloss: "The Knower",
    translation:
      "She is the one who knows, standing behind every act of knowing as the one for whom it happens.",
  },

  652: {
    gloss: "Without Anything To Be Known",
    translation:
      "Nothing is left over outside her for her to learn.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "free of any object of knowledge",
      vigraha: "vedyena varjitā",
      children: [
        ["vedya", "a thing to be known, an object of knowledge"],
        ["varjita", "excluded, deprived of, without"],
      ],
    },
  },

  653: {
    gloss: "The Yoginī",
    translation:
      "She is the one who is joined, keeping in herself the discipline that others only take up.",
  },

  654: {
    gloss: "Giver Of Union",
    translation:
      "The joining that yoga aims at is hers to grant.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows yoga",
      vigraha: "yogaṃ dadātīti",
      children: [
        ["yoga", "yoking, joining, disciplined union"],
        ["dā", "giving"],
      ],
    },
  },

  655: {
    gloss: "Fit For Union",
    translation:
      "She is the proper object of contemplation and the one thing worth being yoked to.",
    pos: "adjective",
  },

  656: {
    gloss: "Whose Bliss Is That Of Union",
    translation:
      "The delight she takes is the delight that arises when the practitioner's separateness gives way.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose joy comes of yoga",
      vigraha: "yogajaḥ ānandaḥ yasyāḥ sā",
      children: [
        ["yoga", "yoking, disciplined union"],
        ["ānanda", "joy, bliss"],
      ],
    },
  },

  657: {
    gloss: "Bearer Of The Yoke",
    translation:
      "She carries the yoke of the world's order, holding the ages steady as they turn.",
    note: "yugam keeps its accusative ending inside the compound (an aluk-samāsa)",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the yoke",
      vigraha: "yugaṃ dharatīti",
      children: [
        ["yugam", "the yoke, an age of the world"],
        ["dharā", "bearing, upholding"],
      ],
    },
  },

  658: {
    gloss: "Whose Form Is The Powers Of Will, Knowledge And Action",
    translation:
      "She appears as three energies at once: the wanting that starts a thing, the knowing that shapes it, and the doing that carries it out.",
    note: "The long compound ends in svarūpa, and the possessive -in is added to that whole; hence a tatpuruṣa here rather than a bahuvrīhi, she who has the three śaktis for her form.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the powers of will, knowledge and action as her own form",
      vigraha: "icchāśaktir jñānaśaktiḥ kriyāśaktiś ca svarūpam asyā santīti",
      children: [
        {
          iast: "icchāśakti",
          type: "tatpuruṣa",
          gloss: "the power of will",
          vigraha: "icchāyāḥ śaktiḥ",
          children: [
            ["icchā", "wish, desire, will"],
            ["śakti", "power, energy"],
          ],
        },
        {
          iast: "jñānaśakti",
          type: "tatpuruṣa",
          gloss: "the power of knowledge",
          vigraha: "jñānasya śaktiḥ",
          children: [
            ["jñāna", "knowing, knowledge"],
            ["śakti", "power, energy"],
          ],
        },
        {
          iast: "kriyāśakti",
          type: "tatpuruṣa",
          gloss: "the power of action",
          vigraha: "kriyāyāḥ śaktiḥ",
          children: [
            ["kriyā", "doing, action, performance"],
            ["śakti", "power, energy"],
          ],
        },
        ["svarūpiṇī", "having as her own form"],
      ],
    },
  },

  659: {
    gloss: "Support Of All",
    translation:
      "Everything that stands is standing on her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the support of everything",
      vigraha: "sarveṣām ādhārā",
      children: [
        ["sarva", "all, every"],
        ["ādhāra", "support, prop, that which holds"],
      ],
    },
  },

  660: {
    gloss: "The Firm Foundation",
    translation:
      "She is the good ground on which anything can be set up and expected to hold.",
    compound: {
      type: "karmadhāraya",
      gloss: "a sound and steady footing",
      vigraha: "śobhanā pratiṣṭhā",
      children: [
        ["su", "good, well, excellent"],
        ["pratiṣṭhā", "standing firm, a base, a foundation"],
      ],
    },
  },

  661: {
    gloss: "Wearing The Form Of Being And Non-Being",
    translation:
      "She takes on the shape of what is and equally of what is not, so neither category leaves her out.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the form of the existent and the non-existent",
      vigraha: "sadasadrūpaṃ dhārayatīti",
      children: [
        {
          iast: "sadasadrūpa",
          type: "tatpuruṣa",
          gloss: "the form of being and non-being",
          vigraha: "sataś ca asataś ca rūpam",
          children: [
            {
              iast: "sadasat",
              type: "dvandva",
              gloss: "the existent and the non-existent",
              vigraha: "sac ca asac ca",
              children: [
                ["sat", "being, that which exists"],
                ["asat", "not being, that which does not exist"],
              ],
            },
            ["rūpa", "form, appearance"],
          ],
        },
        ["dhāriṇī", "bearing, holding, wearing"],
      ],
    },
  },

  662: {
    gloss: "Of Eightfold Form",
    translation:
      "She stands in eight shapes at once, as the elements and the luminaries and the sacrificer are all reckoned forms of the divine.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has eight embodiments",
      vigraha: "aṣṭau mūrtayaḥ yasyāḥ sā",
      children: [
        ["aṣṭan", "eight"],
        ["mūrti", "embodiment, form"],
      ],
    },
  },

  663: {
    gloss: "Conqueror Of The Unborn",
    translation:
      "She defeats the unborn one, that beginningless material nature which binds everybody else.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is victorious over the unborn",
      vigraha: "ajāyāḥ jaitrī",
      children: [
        ["ajā", "the unborn one, primordial nature or illusion"],
        ["jaitrī", "victorious, one who conquers"],
      ],
    },
  },

  664: {
    gloss: "Ordainer Of The World's Course",
    translation:
      "The ordinary going-on of the world, its work and traffic and getting of a living, is laid down by her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who arranges the course of the world",
      vigraha: "lokayātrāṃ vidhatta iti",
      children: [
        {
          iast: "lokayātrā",
          type: "tatpuruṣa",
          gloss: "the going-on of the world, ordinary life",
          vigraha: "lokasya yātrā",
          children: [
            ["loka", "world, the space people live in"],
            ["yātrā", "going, course, the support of life"],
          ],
        },
        ["vidhāyinī", "arranging, ordaining, bringing about"],
      ],
    },
  },

  665: {
    gloss: "The Solitary One",
    translation:
      "She is alone, with nothing beside her that would count as a second.",
    pos: "adjective",
  },

  666: {
    gloss: "Whose Form Is Plenitude",
    translation:
      "Her shape is sheer fullness, the unbounded amplitude in which there is nothing further to want.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is the infinite fullness",
      vigraha: "bhūmā rūpaṃ yasyāḥ sā",
      children: [
        ["bhūman", "abundance, plenty, the unbounded whole"],
        ["rūpa", "form, appearance"],
      ],
    },
  },

  667: {
    gloss: "Without Duality",
    translation:
      "There is no second thing in her against which she could be set off.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom no duality is found",
      vigraha: "na vidyate dvaitaṃ yasyāḥ sā",
      children: [
        ["nis", "out, away, free from"],
        ["dvaita", "duality, twofoldness"],
      ],
    },
  },

  668: {
    gloss: "Free Of Duality",
    translation:
      "Whatever splits the world into two has been left behind in her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "deprived of duality",
      vigraha: "dvaitena varjitā",
      children: [
        ["dvaita", "duality, twofoldness"],
        ["varjita", "excluded, deprived of, without"],
      ],
    },
  },

  669: {
    gloss: "Giver Of Food",
    translation:
      "She hands out food, the first of gifts and the one without which no other help is worth anything.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives food",
      vigraha: "annaṃ dadātīti",
      children: [
        ["anna", "food, boiled rice"],
        ["dā", "giving"],
      ],
    },
  },

  670: {
    gloss: "Giver Of Wealth",
    translation:
      "Goods and riches come from her hand.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives wealth",
      vigraha: "vasu dadātīti",
      children: [
        ["vasu", "goods, wealth, anything of value"],
        ["dā", "giving"],
      ],
    },
  },

  671: {
    gloss: "The Ancient One",
    translation:
      "She is old past reckoning, having grown before there was anything else to grow alongside.",
  },

  672: {
    gloss: "Whose Nature Is The Oneness Of Brahman And Self",
    translation:
      "What she is, is the very identity of the absolute with the self that each person already is.",
    note: "Since -in carries the possession, the compound proper is brahmātmaikyasvarūpa and svarūpiṇī is derived from it; the name is also read as a bahuvrīhi, she whose form is that identity.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the unity of brahman and the self as her own form",
      vigraha: "brahmātmaikyaṃ svarūpam asyā astīti",
      children: [
        {
          iast: "brahmātmaikya",
          type: "tatpuruṣa",
          gloss: "the oneness of brahman and the self",
          vigraha: "brahmātmanoḥ aikyam",
          children: [
            {
              iast: "brahmātman",
              type: "dvandva",
              gloss: "brahman and the self",
              vigraha: "brahma ca ātmā ca",
              children: [
                ["brahman", "the absolute, the ground of all"],
                ["ātman", "the self"],
              ],
            },
            ["aikya", "oneness, identity"],
          ],
        },
        ["svarūpiṇī", "having as her own form"],
      ],
    },
  },

  673: {
    gloss: "The Vast One",
    translation:
      "She is wide and lofty, large enough that nothing has to be left outside her.",
    pos: "adjective",
  },

  674: {
    gloss: "The Brāhmaṇ's Consort",
    translation:
      "She is Brāhmaṇī, the feminine counterpart of the sacred word and of the priest who carries it.",
  },

  675: {
    gloss: "Brāhmī",
    translation:
      "She is Brāhmī, the energy of the creator, counted first among the mothers and identified with speech itself.",
  },

  676: {
    gloss: "Whose Bliss Is That Of Brahman",
    translation:
      "The joy she has is the joy of the absolute, the one delight that is not caused by anything.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose bliss is the bliss of brahman",
      vigraha: "brahmaṇaḥ ānandaḥ yasyāḥ sā",
      children: [
        ["brahman", "the absolute, the ground of all"],
        ["ānanda", "joy, bliss"],
      ],
    },
  },

  677: {
    gloss: "To Whom Offerings Are Dear",
    translation:
      "The portion set aside and given away is what pleases her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the oblation is dear",
      vigraha: "baliḥ priyaḥ yasyāḥ sā",
      children: [
        ["bali", "an offering, a portion of food set apart"],
        ["priya", "dear, beloved"],
      ],
    },
  },

  678: {
    gloss: "Whose Form Is Language",
    translation:
      "Every spoken tongue is a shape she has taken.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is speech",
      vigraha: "bhāṣā rūpaṃ yasyāḥ sā",
      children: [
        ["bhāṣā", "speech, a spoken language"],
        ["rūpa", "form, appearance"],
      ],
    },
  },

  679: {
    gloss: "Whose Army Is Vast",
    translation:
      "The force at her command is enormous, and no adversary has yet counted the whole of it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has a great army",
      vigraha: "bṛhatī senā yasyāḥ sā",
      children: [
        ["bṛhat", "great, lofty, vast"],
        ["senā", "an army, an armed force"],
      ],
    },
  },

  680: {
    gloss: "Free Of Being And Non-Being",
    translation:
      "She stands clear of both terms, neither counted among the things that are nor among the things that are not.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "exempt from existence and non-existence alike",
      vigraha: "bhāvābhāvābhyāṃ vivarjitā",
      children: [
        {
          iast: "bhāvābhāva",
          type: "dvandva",
          gloss: "being and non-being",
          vigraha: "bhāvaś ca abhāvaś ca",
          children: [
            ["bhāva", "being, existence"],
            ["abhāva", "non-existence, absence"],
          ],
        },
        ["vivarjita", "left aside, free or exempt from"],
      ],
    },
  },

  681: {
    gloss: "Easily Worshipped",
    translation:
      "Winning her over takes no elaborate apparatus, only the doing of it.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be propitiated with ease",
      vigraha: "sukhena ārādhyā",
      children: [
        ["sukha", "ease, comfort"],
        ["ārādhyā", "to be worshipped, to be won over"],
      ],
    },
  },

  682: {
    gloss: "Maker Of Good Fortune",
    translation:
      "What is auspicious comes about because she brings it about.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who produces what is auspicious",
      vigraha: "śubhaṃ karotīti",
      children: [
        ["śubha", "good, auspicious, fortunate"],
        ["karī", "making, causing"],
      ],
    },
  },

  683: {
    gloss: "The Lovely And Easily Reached Refuge",
    translation:
      "She is the resort that is both beautiful to arrive at and near enough that anyone may arrive.",
    compound: {
      type: "karmadhāraya",
      gloss: "a beautiful and readily attainable goal",
      vigraha: "śobhanā ca sulabhā ca gatiḥ",
      children: [
        ["śobhanā", "beautiful, splendid, auspicious"],
        ["sulabhā", "easily obtained, readily accessible"],
        ["gati", "a going, a resort, the goal reached"],
      ],
    },
  },

  684: {
    gloss: "Sovereign Over The King Of Kings",
    translation:
      "Even the emperor who outranks all other kings has her above him.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mistress of the king of kings",
      vigraha: "rājarājasya īśvarī",
      children: [
        {
          iast: "rājarāja",
          type: "tatpuruṣa",
          gloss: "king of kings, emperor",
          vigraha: "rājñāṃ rājā",
          children: [
            ["rājan", "a king, a ruler"],
            ["rājan", "a king, a ruler"],
          ],
        },
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },

  685: {
    gloss: "Giver Of Kingdoms",
    translation:
      "Sovereignty is one of the things she hands out.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows a kingdom",
      vigraha: "rājyaṃ dadātīti",
      children: [
        ["rājya", "kingship, a kingdom, dominion"],
        ["dāyinī", "giving, bestowing"],
      ],
    },
  },

  686: {
    gloss: "Beloved Of The Realm",
    translation:
      "The kingdom holds her dear, and its prosperity is a matter of her favour.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is dear to the kingdom",
      vigraha: "rājyasya vallabhā",
      children: [
        ["rājya", "kingship, a kingdom"],
        ["vallabhā", "the beloved one, a cherished mistress"],
      ],
    },
  },

  687: {
    gloss: "Whose Compassion Shines",
    translation:
      "Her pity is not hidden but visibly radiant, the first thing about her that anyone notices.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose mercy is resplendent",
      vigraha: "rājatī kṛpā yasyāḥ sā",
      children: [
        ["rājat", "shining, resplendent"],
        ["kṛpā", "pity, tenderness, compassion"],
      ],
    },
  },

  688: {
    gloss: "By Whom Her Own Dependents Are Set On Royal Thrones",
    translation:
      "Those who have taken shelter with her she raises up and seats on the thrones of kings.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whom her own refugees have been installed on the royal seat",
      vigraha: "rājapīṭhe niveśitāḥ nijāśritāḥ yayā sā",
      children: [
        {
          iast: "rājapīṭha",
          type: "tatpuruṣa",
          gloss: "the royal throne",
          vigraha: "rājñaḥ pīṭham",
          children: [
            ["rājan", "a king"],
            ["pīṭha", "a seat, a throne"],
          ],
        },
        ["niveśita", "caused to be seated, installed"],
        {
          iast: "nijāśrita",
          type: "karmadhāraya",
          gloss: "her own dependents",
          vigraha: "nijāś ca te āśritāś ca",
          children: [
            ["nija", "one's own"],
            ["āśrita", "one who has taken refuge, a dependent"],
          ],
        },
      ],
    },
  },

  689: {
    gloss: "The Fortune Of Sovereignty",
    translation:
      "She is the good luck that attaches to rule, the splendour without which a throne is only furniture.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the prosperity that belongs to kingship",
      vigraha: "rājyasya lakṣmīḥ",
      children: [
        ["rājya", "kingship, dominion"],
        ["lakṣmī", "good fortune, prosperity, splendour"],
      ],
    },
  },

  690: {
    gloss: "Mistress Of The Treasury",
    translation:
      "The store from which everything is paid out is under her keeping.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the lady who owns the treasury",
      vigraha: "kośasya nāthā",
      children: [
        ["kośa", "a chest, a store, a treasury"],
        ["nāthā", "mistress, protectress"],
      ],
    },
  },

  691: {
    gloss: "Commander Of The Fourfold Army",
    translation:
      "Elephants, chariots, cavalry and foot all answer to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mistress of the army of four divisions",
      vigraha: "caturaṅgabalasya īśvarī",
      children: [
        {
          iast: "caturaṅgabala",
          type: "karmadhāraya",
          gloss: "the army of four divisions",
          vigraha: "caturaṅgaṃ balam",
          children: [
            {
              iast: "caturaṅga",
              type: "bahuvrīhi",
              gloss: "having four divisions",
              vigraha: "catvāri aṅgāni yasya tat",
              children: [
                ["catur", "four"],
                ["aṅga", "a limb, a division"],
              ],
            },
            ["bala", "force, might, an army"],
          ],
        },
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },

  692: {
    gloss: "Giver Of Universal Empire",
    translation:
      "Rule over the whole earth is a gift within her power.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows paramount sovereignty",
      vigraha: "sāmrājyaṃ dadātīti",
      children: [
        ["sāmrājya", "universal dominion, empire"],
        ["dāyinī", "giving, bestowing"],
      ],
    },
  },

  693: {
    gloss: "Whose Pledge Is True",
    translation:
      "What she has undertaken she performs, so a promise from her is already an accomplished thing.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose engagement holds good",
      vigraha: "satyā sandhā yasyāḥ sā",
      children: [
        ["satya", "true, real, unfailing"],
        ["sandhā", "a compact, an engagement, a vow"],
      ],
    },
  },

  694: {
    gloss: "Girdled By The Ocean",
    translation:
      "She wears the sea about her waist as the earth wears it, which is to say the earth is her body.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose girdle is the ocean",
      vigraha: "sāgaraḥ mekhalā yasyāḥ sā",
      children: [
        ["sāgara", "the ocean"],
        ["mekhalā", "a girdle, a belt worn round the waist"],
      ],
    },
  },

  695: {
    gloss: "The Consecrated One",
    translation:
      "She has been formally initiated and holds to the observance, bound by her own vow as a sacrificer is bound.",
    pos: "adjective",
  },

  696: {
    gloss: "Queller Of The Demons",
    translation:
      "The sons of Diti are put down by her whenever they press too far.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who subdues the demons",
      vigraha: "daityān śamayatīti",
      children: [
        ["daitya", "a son of Diti, a demon"],
        ["śamanī", "calming, quelling, destroying"],
      ],
    },
  },

  697: {
    gloss: "Bringing All Worlds Under Her Sway",
    translation:
      "Every region there is falls under her control.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who subjugates all the worlds",
      vigraha: "sarvalokaṃ vaśaṃ karotīti",
      children: [
        {
          iast: "sarvaloka",
          type: "karmadhāraya",
          gloss: "all the worlds",
          vigraha: "sarve lokāḥ",
          children: [
            ["sarva", "all, every"],
            ["loka", "a world, a region"],
          ],
        },
        {
          iast: "vaśaṅkarī",
          type: "tatpuruṣa",
          gloss: "bringing into subjection",
          vigraha: "vaśaṃ karotīti",
          children: [
            ["vaśam", "into one's power, under control"],
            ["karī", "making, bringing about"],
          ],
        },
      ],
    },
  },

  698: {
    gloss: "Giver Of Every Object Sought",
    translation:
      "Whatever anyone is after, she is the one who supplies it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who grants all desired ends",
      vigraha: "sarvān arthān dadātīti",
      children: [
        {
          iast: "sarvārtha",
          type: "karmadhāraya",
          gloss: "every object of pursuit",
          vigraha: "sarve arthāḥ",
          children: [
            ["sarva", "all, every"],
            ["artha", "aim, object, wealth, purpose"],
          ],
        },
        ["dātrī", "a giver, she who bestows"],
      ],
    },
  },

  699: {
    gloss: "Sāvitrī",
    translation:
      "She is Sāvitrī, at once the verse addressed to the sun that every twice-born recites and the goddess that verse invokes.",
  },

  700: {
    gloss: "Whose Form Is Being, Consciousness And Bliss",
    translation:
      "She is made of three things that turn out to be one: that she is, that she knows, and that she is glad.",
    note: "The suffix -in does the possessive work, so saccidānandarūpa is the compound and rūpiṇī the taddhita formed on it. The familiar bahuvrīhi rendering, she who has being, consciousness and bliss for her form, is no less sound.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having being, consciousness and bliss as her own form",
      vigraha: "saccidānandaḥ svarūpam asyā astīti",
      children: [
        {
          iast: "saccidānanda",
          type: "dvandva",
          gloss: "being, consciousness and bliss",
          vigraha: "sac ca cic ca ānandaś ca",
          children: [
            ["sat", "being, that which is"],
            ["cit", "thought, consciousness"],
            ["ānanda", "joy, bliss"],
          ],
        },
        ["rūpiṇī", "having the form of"],
      ],
    },
  },
};
