/**
 * Nāmas 301–400 of the Lalitā Sahasranāma.
 *
 * Word meanings are grounded in the Monier-Williams Sanskrit-English
 * Dictionary (1899); the glosses, translations and compound analyses are
 * written fresh for this dataset.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  301: {
    gloss: "Utterer Of Hrīṃ",
    translation:
      "She sounds forth hrīṃ, the seed-syllable that opens every limb of her mantra.",
    pos: "noun",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who makes the sound hrīṃ",
      vigraha: "hrīṃ iti karotīti hrīṅkārī",
      children: [
        ["hrīṃ", "the seed-syllable hrīṃ, not a word but a sound"],
        ["kārī", "she who makes or utters"],
      ],
    },
  },
  302: {
    gloss: "Endowed With Hrīṃ",
    translation:
      "She carries hrīṃ as her own possession, and carries with it the modesty that the same syllable spells.",
    note: "Possessive derivative in -mat on hrī, 'shame, modesty', which the mantra tradition hears as the bīja hrīṃ.",
  },
  303: {
    gloss: "Dear To The Heart",
    translation:
      "She is seated in the heart and is the one thing there that is wholly welcome.",
    pos: "adjective",
    note: "Secondary derivative in -ya from hṛd, 'heart'.",
  },
  304: {
    gloss: "Beyond Rejection And Acceptance",
    translation:
      "Nothing in her is to be thrown away and nothing is to be added, so the whole labour of choosing falls silent before her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "free of what is to be rejected and what is to be accepted",
      vigraha: "heyenopādeyena ca varjitā heyopādeyavarjitā",
      children: [
        {
          iast: "heyopādeya",
          type: "dvandva",
          gloss: "the rejectable and the acceptable",
          vigraha: "heyaṃ ca upādeyaṃ ca heyopādeyam",
          children: [
            ["heya", "to be abandoned, fit to be rejected"],
            ["upādeya", "to be taken up, fit to be accepted"],
          ],
        },
        ["varjita", "devoid of, free from"],
      ],
    },
  },
  305: {
    gloss: "Worshipped By The King Of Kings",
    translation:
      "The emperor above all emperors is himself found at her feet, offering worship.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "worshipped by the supreme sovereign",
      vigraha: "rājarājenārcitā rājarājārcitā",
      children: [
        {
          iast: "rājarāja",
          type: "tatpuruṣa",
          gloss: "king of kings, emperor",
          vigraha: "rājñāṃ rājā rājarājaḥ",
          children: [
            ["rājan", "king"],
            ["rājan", "king"],
          ],
        },
        ["arcita", "honoured, worshipped"],
      ],
    },
  },
  306: {
    gloss: "The Queen",
    translation:
      "She holds sovereignty in her own person, queen rather than merely a king's wife.",
  },
  307: {
    gloss: "The Delightful One",
    translation: "She is made to be enjoyed, and delight is the only fit response to her.",
    pos: "adjective",
  },
  308: {
    gloss: "Lotus-Eyed",
    translation: "Her eyes have the long cool shape of blue lotus petals.",
    compound: {
      type: "bahuvrīhi",
      gloss: "having eyes like blue lotuses",
      vigraha: "rājīve iva locane yasyāḥ sā rājīvalocanā",
      children: [
        ["rājīva", "blue lotus"],
        ["locana", "eye"],
      ],
    },
  },
  309: {
    gloss: "She Who Gladdens",
    translation:
      "She colours the mind the way a dye takes to cloth, and what she colours it with is joy.",
  },
  310: {
    gloss: "The Lovely Woman",
    translation:
      "She has the freshness of a young woman in whom one takes unmixed pleasure.",
  },
  311: {
    gloss: "Full Of Savour",
    translation: "She is the taste in things, the juice that makes them worth having.",
    pos: "adjective",
  },
  312: {
    gloss: "Girdled With Ringing Bells",
    translation: "Little bells chime along the belt at her waist whenever she moves.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose girdle is strung with jingling bells",
      vigraha: "raṇatkiṅkiṇir mekhalā yasyāḥ sā raṇatkiṅkiṇimekhalā",
      children: [
        {
          iast: "raṇatkiṅkiṇi",
          type: "karmadhāraya",
          gloss: "ringing little bells",
          vigraha: "raṇantyaḥ kiṅkiṇyaḥ raṇatkiṅkiṇayaḥ",
          children: [
            ["raṇat", "ringing, jingling"],
            ["kiṅkiṇī", "a small bell"],
          ],
        },
        ["mekhalā", "girdle worn at the hips"],
      ],
    },
  },
  313: {
    gloss: "Fortune Herself",
    translation:
      "She is Ramā, the good fortune whose arrival makes a household prosper and whose departure empties it.",
  },
  314: {
    gloss: "Full-Moon-Faced",
    translation:
      "Her face carries the round unclouded brightness of the moon on the night it comes to the full.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose face is the full moon",
      vigraha: "rākendur iva vadanaṃ yasyāḥ sā rākenduvadanā",
      children: [
        {
          iast: "rākendu",
          type: "tatpuruṣa",
          gloss: "the moon at the full",
          vigraha: "rākāyā induḥ rākenduḥ",
          children: [
            ["rākā", "the day and goddess of the full moon"],
            ["indu", "moon"],
          ],
        },
        ["vadana", "face"],
      ],
    },
  },
  315: {
    gloss: "Shaped Of Delight",
    translation:
      "She wears the form of Rati, so that erotic delight is not something she has but something she is.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is delight",
      vigraha: "ratir eva rūpaṃ yasyāḥ sā ratirūpā",
      children: [
        ["rati", "pleasure, erotic delight, personified as Rati"],
        ["rūpa", "form, shape"],
      ],
    },
  },
  316: {
    gloss: "Fond Of Delight",
    translation:
      "Love's pleasure is dear to her, and she is dear in turn to Rati who presides over it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "to whom delight is dear",
      vigraha: "ratiḥ priyā yasyāḥ sā ratipriyā",
      children: [
        ["rati", "pleasure, love"],
        ["priya", "dear, beloved"],
      ],
    },
  },
  317: {
    gloss: "Giver Of Protection",
    translation: "She sets a guard around whoever turns to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who affords protection",
      vigraha: "rakṣāṃ karotīti rakṣākarī",
      children: [
        ["rakṣā", "protection, guarding"],
        ["karī", "she who makes or provides"],
      ],
    },
  },
  318: {
    gloss: "Slayer Of Demons",
    translation: "She cuts down the rākṣasas who would make prey of the world.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who kills rākṣasas",
      vigraha: "rākṣasān hantīti rākṣasaghnī",
      children: [
        ["rākṣasa", "a rākṣasa, malignant night-demon"],
        ["ghnī", "she who strikes down"],
      ],
    },
  },
  319: {
    gloss: "The Beautiful Woman",
    translation:
      "The plain Sanskrit word for a woman one cannot look away from serves as her name.",
  },
  320: {
    gloss: "Eager For Her Lover",
    translation:
      "She is greedy for her consort, wanting nothing else while he is not beside her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "passionately attached to her lover",
      vigraha: "ramaṇe lampaṭā ramaṇalampaṭā",
      children: [
        ["ramaṇa", "lover, husband"],
        ["lampaṭa", "greedy for, eagerly attached to"],
      ],
    },
  },
  321: {
    gloss: "The Desirable One",
    translation:
      "She is what everything else is wanted for, the object every desire is really aiming at.",
    pos: "adjective",
  },
  322: {
    gloss: "Formed Of The Kāmakalā",
    translation:
      "Her body is the kāmakalā, the small figure of points and letters in which desire and the shape it takes are drawn together.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is the kāmakalā",
      vigraha: "kāmakalaiva rūpaṃ yasyāḥ sā kāmakalārūpā",
      children: [
        {
          iast: "kāmakalā",
          type: "tatpuruṣa",
          gloss: "the digit of desire",
          vigraha: "kāmasya kalā kāmakalā",
          children: [
            ["kāma", "desire, and Kāma the god of desire"],
            ["kalā", "a digit, a sixteenth part, a fine portion"],
          ],
        },
        ["rūpa", "form, shape"],
      ],
    },
  },
  323: {
    gloss: "Lover Of Kadamba Blossoms",
    translation:
      "The heavy orange flowers of the kadamba tree are the offering she likes best.",
    compound: {
      type: "bahuvrīhi",
      gloss: "to whom the kadamba flower is dear",
      vigraha: "kadambakusumaṃ priyaṃ yasyāḥ sā kadambakusumapriyā",
      children: [
        {
          iast: "kadambakusuma",
          type: "tatpuruṣa",
          gloss: "blossom of the kadamba tree",
          vigraha: "kadambasya kusumaṃ kadambakusumam",
          children: [
            ["kadamba", "the kadamba tree, Nauclea cadamba"],
            ["kusuma", "flower, blossom"],
          ],
        },
        ["priya", "dear, beloved"],
      ],
    },
  },
  324: {
    gloss: "The Auspicious One",
    translation:
      "Her presence turns things out well; the word for her is the word one says over a new beginning.",
  },
  325: {
    gloss: "Root Of The World",
    translation:
      "The world grows out of her the way a plant grows out of the bulb hidden under the soil.",
    note: "The masculine kanda takes a feminine -ā to agree with the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the bulbous root from which the world springs",
      vigraha: "jagatyāḥ kandaḥ jagatīkandā",
      children: [
        ["jagatī", "the earth, the moving world"],
        ["kanda", "a bulb or tuberous root"],
      ],
    },
  },
  326: {
    gloss: "Ocean Of Compassion",
    translation:
      "Pity is a taste she holds in such quantity that the only measure for it is the sea.",
    note: "The masculine sāgara takes a feminine -ā to agree with the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "an ocean of the flavour of compassion",
      vigraha: "karuṇārasasya sāgaraḥ karuṇārasasāgarā",
      children: [
        {
          iast: "karuṇārasa",
          type: "tatpuruṣa",
          gloss: "the flavour of compassion",
          vigraha: "karuṇāyā rasaḥ karuṇārasaḥ",
          children: [
            ["karuṇā", "pity, compassion"],
            ["rasa", "sap, savour, aesthetic flavour"],
          ],
        },
        ["sāgara", "ocean"],
      ],
    },
  },
  327: {
    gloss: "Mistress Of The Arts",
    translation:
      "Every skill and every fraction of the moon belongs to her, since kalā means both a craft and a sixteenth part.",
    note: "Possessive derivative in -vat on kalā, 'a portion, a digit of the moon, a fine art'.",
  },
  328: {
    gloss: "Sweet Of Speech",
    translation: "Her voice is low and musical, indistinct in the way that pleases.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose speech is soft and melodious",
      vigraha: "kala ālāpo yasyāḥ sā kalālāpā",
      children: [
        ["kala", "low, soft and musical in sound"],
        ["ālāpa", "speech, conversation, utterance"],
      ],
    },
  },
  329: {
    gloss: "The Beloved",
    translation:
      "She is desired and cherished, the one word kānta covering both what is beautiful and what is loved.",
  },
  330: {
    gloss: "Lover Of Kādambarī Wine",
    translation:
      "She is fond of kādambarī, the liquor distilled from kadamba flowers, and her devotees pour it out for her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "to whom kādambarī liquor is dear",
      vigraha: "kādambarī priyā yasyāḥ sā kādambarīpriyā",
      children: [
        ["kādambarī", "spirituous liquor made from kadamba flowers"],
        ["priya", "dear, beloved"],
      ],
    },
  },
  331: {
    gloss: "Granter Of Boons",
    translation: "She hands over what is asked of her, and the asking is enough.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives a boon",
      vigraha: "varaṃ dadātīti varadā",
      children: [
        ["vara", "a boon, a wish granted"],
        ["da", "giving, bestowing"],
      ],
    },
  },
  332: {
    gloss: "Beautiful-Eyed",
    translation: "Her eyes are lovely, and a glance from them is itself a favour.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose eyes are beautiful",
      vigraha: "vāme nayane yasyāḥ sā vāmanayanā",
      children: [
        ["vāma", "lovely, fair, pleasing"],
        ["nayana", "eye"],
      ],
    },
  },
  333: {
    gloss: "Swaying With Wine",
    translation:
      "The vāruṇī liquor has gone to her head, and she is unsteady with the sweetness of it.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "overcome by the intoxication of vāruṇī liquor",
      vigraha: "vāruṇīmadena vihvalā vāruṇīmadavihvalā",
      children: [
        {
          iast: "vāruṇīmada",
          type: "tatpuruṣa",
          gloss: "the intoxication of vāruṇī",
          vigraha: "vāruṇyā madaḥ vāruṇīmadaḥ",
          children: [
            ["vāruṇī", "spirituous liquor, personified as Varuṇa's daughter"],
            ["mada", "intoxication, rapture"],
          ],
        },
        ["vihvala", "unsteady, overcome, swooning"],
      ],
    },
  },
  334: {
    gloss: "Greater Than All",
    translation:
      "Set her beside the whole universe and there is still something of her left over.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "exceeding the universe",
      vigraha: "viśvasmād adhikā viśvādhikā",
      children: [
        ["viśva", "all, the whole universe"],
        ["adhika", "surpassing, more than, in excess of"],
      ],
    },
  },
  335: {
    gloss: "Known Through The Veda",
    translation:
      "What the Vedas are for is to make her knowable; strip that away and they say nothing.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be known by means of the Vedas",
      vigraha: "vedair vedyā vedavedyā",
      children: [
        ["veda", "the Veda, sacred knowledge"],
        ["vedya", "to be known or understood"],
      ],
    },
  },
  336: {
    gloss: "Dweller On The Vindhyas",
    translation:
      "She has her seat in the Vindhya range, the wall of hills that divides the north of the land from the south.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who dwells on the Vindhya mountain",
      vigraha: "vindhyācale nivasatīti vindhyācalanivāsinī",
      children: [
        {
          iast: "vindhyācala",
          type: "karmadhāraya",
          gloss: "the Vindhya mountain",
          vigraha: "vindhyo nāmācalaḥ vindhyācalaḥ",
          children: [
            ["vindhya", "the Vindhya range"],
            ["acala", "an unmoving thing, a mountain"],
          ],
        },
        ["nivāsinī", "she who dwells"],
      ],
    },
  },
  337: {
    gloss: "The Ordainer",
    translation:
      "She arranges how things will fall out, doing for the world what Brahmā is credited with doing.",
    note: "Feminine of the agent noun vidhātṛ, 'disposer, creator'.",
  },
  338: {
    gloss: "Mother Of The Vedas",
    translation: "The Vedas are born from her, not she from them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives birth to the Vedas",
      vigraha: "vedānāṃ jananī vedajananī",
      children: [
        ["veda", "the Veda, sacred knowledge"],
        ["jananī", "mother, she who brings to birth"],
      ],
    },
  },
  339: {
    gloss: "The Māyā Of Viṣṇu",
    translation:
      "She is the power by which Viṣṇu throws the world up as an appearance and keeps it convincing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the illusory power belonging to Viṣṇu",
      vigraha: "viṣṇor māyā viṣṇumāyā",
      children: [
        ["viṣṇu", "Viṣṇu"],
        ["māyā", "creative illusion, the power of appearance"],
      ],
    },
  },
  340: {
    gloss: "The Playful One",
    translation:
      "She moves for the pleasure of moving, and the shimmer of that play is what we see as the world.",
  },
  341: {
    gloss: "The Field Itself",
    translation:
      "She is the field — the body and the whole spread of nature worked upon by the one who knows it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose own nature is the field",
      vigraha: "kṣetram eva svarūpaṃ yasyāḥ sā kṣetrasvarūpā",
      children: [
        ["kṣetra", "a field, and so the body as the ground of experience"],
        {
          iast: "svarūpa",
          type: "karmadhāraya",
          gloss: "one's own form or essential nature",
          vigraha: "svaṃ rūpaṃ svarūpam",
          children: [
            ["sva", "own, proper to oneself"],
            ["rūpa", "form, shape, nature"],
          ],
        },
      ],
    },
  },
  342: {
    gloss: "Mistress Of The Field",
    translation: "The field is hers, and she rules what happens on it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who rules the field",
      vigraha: "kṣetrasyeśī kṣetreśī",
      children: [
        ["kṣetra", "a field, the body as the ground of experience"],
        ["īśī", "mistress, female ruler"],
      ],
    },
  },
  343: {
    gloss: "Guardian Of Field And Knower",
    translation:
      "She keeps both halves of the pair safe: the field that is acted on and the knower who watches it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who protects the field and the knower of the field",
      vigraha: "kṣetrakṣetrajñau pālayatīti kṣetrakṣetrajñapālinī",
      children: [
        {
          iast: "kṣetrakṣetrajña",
          type: "dvandva",
          gloss: "the field and the knower of the field",
          vigraha: "kṣetraṃ ca kṣetrajñaś ca kṣetrakṣetrajñau",
          children: [
            ["kṣetra", "a field, the body as the ground of experience"],
            {
              iast: "kṣetrajña",
              type: "tatpuruṣa",
              gloss: "the knower of the field, the conscious self",
              vigraha: "kṣetraṃ jānātīti kṣetrajñaḥ",
              children: [
                ["kṣetra", "field"],
                ["jña", "knowing, one who knows"],
              ],
            },
          ],
        },
        ["pālinī", "she who guards"],
      ],
    },
  },
  344: {
    gloss: "Free Of Waning And Waxing",
    translation:
      "She neither shrinks nor swells; what she is at any moment is the whole of what she is.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "wholly released from decrease and increase",
      vigraha: "kṣayavṛddhibhyāṃ vinirmuktā kṣayavṛddhivinirmuktā",
      children: [
        {
          iast: "kṣayavṛddhi",
          type: "dvandva",
          gloss: "waning and waxing",
          vigraha: "kṣayaś ca vṛddhiś ca kṣayavṛddhī",
          children: [
            ["kṣaya", "loss, decay, waning"],
            ["vṛddhi", "growth, increase, waxing"],
          ],
        },
        ["vinirmukta", "wholly loosed from, exempt from"],
      ],
    },
  },
  345: {
    gloss: "Worshipped By The Field-Guardians",
    translation:
      "The kṣetrapālas who stand watch over holy ground turn inward and worship her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "well worshipped by the guardian of the field",
      vigraha: "kṣetrapālena samarcitā kṣetrapālasamarcitā",
      children: [
        {
          iast: "kṣetrapāla",
          type: "tatpuruṣa",
          gloss: "guardian of the field, a tutelary deity of a sacred site",
          vigraha: "kṣetraṃ pālayatīti kṣetrapālaḥ",
          children: [
            ["kṣetra", "field, sacred precinct"],
            ["pāla", "protector, guardian"],
          ],
        },
        ["samarcita", "fully worshipped, duly adored"],
      ],
    },
  },
  346: {
    gloss: "The Victorious",
    translation: "She wins, and she is the winning itself wherever anyone wins anything.",
  },
  347: {
    gloss: "The Stainless",
    translation: "No mark or blemish has ever settled on her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "from whom impurity has departed",
      vigraha: "vigataṃ malaṃ yasyāḥ sā vimalā",
      children: [
        ["vi", "away, gone, without"],
        ["mala", "dirt, stain, impurity"],
      ],
    },
  },
  348: {
    gloss: "Worthy Of Salutation",
    translation: "She is the one before whom bowing is the right thing to do.",
    pos: "adjective",
  },
  349: {
    gloss: "Tender To Those Who Bow",
    translation:
      "Towards people who come reverently to her she feels what a cow feels for her calf.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "affectionate towards reverent folk",
      vigraha: "vandārujane vatsalā vandārujanavatsalā",
      children: [
        {
          iast: "vandārujana",
          type: "karmadhāraya",
          gloss: "reverent people",
          vigraha: "vandāravo janāḥ vandārujanāḥ",
          children: [
            ["vandāru", "reverential, given to praising"],
            ["jana", "a person, people"],
          ],
        },
        ["vatsala", "tender towards, fond as a cow of her calf"],
      ],
    },
  },
  350: {
    gloss: "Speaker Of The Word",
    translation:
      "Speech does not happen to her; she is the one uttering it wherever it is uttered.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who speaks the word",
      vigraha: "vācaṃ vadatīti vāgvādinī",
      children: [
        ["vāc", "speech, voice, the word"],
        ["vādinī", "she who speaks"],
      ],
    },
  },
  351: {
    gloss: "Lovely-Haired",
    translation: "Her hair falls beautifully, dark and loose down her back.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose locks are beautiful",
      vigraha: "vāmāḥ keśā yasyāḥ sā vāmakeśī",
      children: [
        ["vāma", "lovely, fair, pleasing"],
        ["keśa", "hair of the head"],
      ],
    },
  },
  352: {
    gloss: "Dwelling In The Circle Of Fire",
    translation:
      "Her seat is the fiery ring, the region of flame that meditation places at the base of the body.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who dwells in the disk of fire",
      vigraha: "vahnimaṇḍale vasatīti vahnimaṇḍalavāsinī",
      children: [
        {
          iast: "vahnimaṇḍala",
          type: "tatpuruṣa",
          gloss: "the disk or region of fire",
          vigraha: "vahner maṇḍalaṃ vahnimaṇḍalam",
          children: [
            ["vahni", "fire, the bearer of oblations"],
            ["maṇḍala", "a disk, circle, region"],
          ],
        },
        ["vāsinī", "she who dwells"],
      ],
    },
  },
  353: {
    gloss: "Wish-Granting Vine Of The Devout",
    translation:
      "For those who hold to her she is the slender celestial creeper that yields whatever is asked of it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the wish-yielding creeper of those who have devotion",
      vigraha: "bhaktimatāṃ kalpalatikā bhaktimatkalpalatikā",
      children: [
        ["bhaktimat", "possessed of devotion, a devotee"],
        {
          iast: "kalpalatikā",
          type: "karmadhāraya",
          gloss: "the wish-granting creeper",
          vigraha: "kalpo latikā kalpalatikā",
          children: [
            ["kalpa", "the heavenly wish-fulfilling growth"],
            ["latikā", "a slender creeper"],
          ],
        },
      ],
    },
  },
  354: {
    gloss: "Loosener Of The Beast's Bonds",
    translation:
      "The soul is tethered like a beast; she is the one who unties the rope.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who releases the fetter of the bound creature",
      vigraha: "paśupāśaṃ vimocayatīti paśupāśavimocinī",
      children: [
        {
          iast: "paśupāśa",
          type: "tatpuruṣa",
          gloss: "the tether of the bound creature",
          vigraha: "paśoḥ pāśaḥ paśupāśaḥ",
          children: [
            ["paśu", "a tethered animal, and so the bound soul"],
            ["pāśa", "noose, tether, fetter"],
          ],
        },
        ["vimocinī", "she who unbinds or sets free"],
      ],
    },
  },
  355: {
    gloss: "Destroyer Of Every Heresy",
    translation:
      "Every false teaching is gathered up and put away by her, with nothing left over.",
    compound: {
      type: "bahuvrīhi",
      gloss: "by whom all heretics have been swept away",
      vigraha: "saṃhṛtā aśeṣapāṣaṇḍā yayā sā saṃhṛtāśeṣapāṣaṇḍā",
      children: [
        ["saṃhṛta", "gathered up, drawn in, destroyed"],
        {
          iast: "aśeṣapāṣaṇḍa",
          type: "karmadhāraya",
          gloss: "heretics without remainder",
          vigraha: "aśeṣāḥ pāṣaṇḍāḥ aśeṣapāṣaṇḍāḥ",
          children: [
            ["aśeṣa", "leaving nothing over, entire"],
            ["pāṣaṇḍa", "a heretic, a professor of false doctrine"],
          ],
        },
      ],
    },
  },
  356: {
    gloss: "Promoter Of Right Conduct",
    translation:
      "She starts good behaviour moving in the world and keeps it going once it has begun.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who sets right conduct in motion",
      vigraha: "sadācāraṃ pravartayatīti sadācārapravartikā",
      children: [
        {
          iast: "sadācāra",
          type: "karmadhāraya",
          gloss: "the conduct of good people",
          vigraha: "satām ācāraḥ sadācāraḥ",
          children: [
            ["sat", "good, true, existing"],
            ["ācāra", "conduct, established usage"],
          ],
        },
        ["pravartikā", "she who sets in motion"],
      ],
    },
  },
  357: {
    gloss: "Moonlight To The Threefold-Scorched",
    translation:
      "Those burnt by the three fires of affliction feel her fall on them as moonlight falls on hot ground.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the moonlight that cools those scorched by the fire of the three afflictions",
      vigraha:
        "tāpatrayāgnisantaptānāṃ samāhlādanā candrikā tāpatrayāgnisantaptasamāhlādanacandrikā",
      children: [
        {
          iast: "tāpatrayāgnisantapta",
          type: "tatpuruṣa",
          gloss: "scorched by the fire of the three afflictions",
          vigraha: "tāpatrayāgninā santaptaḥ tāpatrayāgnisantaptaḥ",
          children: [
            {
              iast: "tāpatrayāgni",
              type: "tatpuruṣa",
              gloss: "the fire of the threefold affliction",
              vigraha: "tāpatrayasyāgniḥ tāpatrayāgniḥ",
              children: [
                {
                  iast: "tāpatraya",
                  type: "tatpuruṣa",
                  gloss: "the three afflictions",
                  vigraha: "tāpānāṃ trayaṃ tāpatrayam",
                  children: [
                    ["tāpa", "heat, pain, affliction"],
                    ["traya", "a triad, a set of three"],
                  ],
                },
                ["agni", "fire"],
              ],
            },
            ["santapta", "thoroughly heated, scorched"],
          ],
        },
        ["samāhlādana", "thoroughly refreshing, gladdening"],
        ["candrikā", "moonlight"],
      ],
    },
  },
  358: {
    gloss: "The Young Woman",
    translation: "She never ages past the moment when youth is at its height.",
  },
  359: {
    gloss: "Worshipped By Ascetics",
    translation:
      "Those who have burnt everything else away by austerity spend what is left on worshipping her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped by ascetics",
      vigraha: "tāpasair ārādhyā tāpasārādhyā",
      children: [
        ["tāpasa", "an ascetic, a practiser of austerity"],
        ["ārādhya", "to be propitiated or worshipped"],
      ],
    },
  },
  360: {
    gloss: "Slender-Waisted",
    translation: "Her waist is narrow enough to be spanned by a hand.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose waist is slender",
      vigraha: "tanu madhyaṃ yasyāḥ sā tanumadhyā",
      children: [
        ["tanu", "thin, slender, fine"],
        ["madhya", "the middle of the body, the waist"],
      ],
    },
  },
  361: {
    gloss: "Remover Of Darkness",
    translation:
      "She drives off the dark, both the dark one cannot see through and the dullness one cannot think through.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who takes away darkness",
      vigraha: "tamo 'pahantīti tamopahā",
      children: [
        ["tamas", "darkness, gloom, the inertia that dulls the mind"],
        ["apaha", "driving off, removing"],
      ],
    },
  },
  362: {
    gloss: "Pure Consciousness",
    translation:
      "She is awareness in the bare sense — the fact of knowing, before there is anything known.",
  },
  363: {
    gloss: "What The Word 'That' Points To",
    translation:
      "When the great sentence says 'that', she is what the word reaches for without naming it directly.",
    note: "The masculine artha takes a feminine -ā to agree with the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the indicated meaning of the word tat",
      vigraha: "tatpadasya lakṣyo 'rthaḥ tatpadalakṣyārthā",
      children: [
        {
          iast: "tatpada",
          type: "karmadhāraya",
          gloss: "the word 'that'",
          vigraha: "tad iti padaṃ tatpadam",
          children: [
            ["tad", "that"],
            ["pada", "a word, a term"],
          ],
        },
        {
          iast: "lakṣyārtha",
          type: "karmadhāraya",
          gloss: "the implied sense",
          vigraha: "lakṣyo 'rthaḥ lakṣyārthaḥ",
          children: [
            ["lakṣya", "to be indicated indirectly, aimed at"],
            ["artha", "meaning, sense, object"],
          ],
        },
      ],
    },
  },
  364: {
    gloss: "Formed Of Consciousness, One Savour",
    translation:
      "She has one taste throughout, and the taste is awareness; there is no second ingredient in her.",
    note: "Classed as a tatpuruṣa because the -in suffix, not the compound, expresses the possession: cidekarasarūpa is the compound and rūpiṇī the taddhita made from it. It is also often read as a bahuvrīhi, she who has consciousness-as-one-savour for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the form of the single essence that is consciousness",
      vigraha: "cidekarasaṃ rūpam asyā astīti cidekarasarūpiṇī",
      children: [
        {
          iast: "cidekarasa",
          type: "karmadhāraya",
          gloss: "the one savour which is consciousness",
          vigraha: "cid evaikarasaś cidekarasaḥ",
          children: [
            ["cit", "consciousness, pure awareness"],
            {
              iast: "ekarasa",
              type: "karmadhāraya",
              gloss: "a single uniform savour",
              vigraha: "eko rasaḥ ekarasaḥ",
              children: [
                ["eka", "one, single"],
                ["rasa", "savour, essence"],
              ],
            },
          ],
        },
        ["rūpiṇī", "she who bears the form of"],
      ],
    },
  },
  365: {
    gloss: "Whose Bliss Dwarfs The Gods'",
    translation:
      "Set the unbroken joy of Brahmā and every god beneath him against the bliss of her own Self, and the whole run of it comes to one shaving of hers.",
    compound: {
      type: "bahuvrīhi",
      gloss:
        "she in relation to whom the whole series of the joys of Brahmā and the rest is a mere fragment of the bliss of her own Self",
      vigraha:
        "svātmānandalavībhūtā brahmādyānandasantatir yasyāḥ sā svātmānandalavībhūtabrahmādyānandasantatiḥ",
      children: [
        {
          iast: "svātmānandalavībhūta",
          type: "tatpuruṣa",
          gloss: "reduced to a shred of the bliss of one's own Self",
          vigraha: "svātmānandasya lavībhūtaḥ svātmānandalavībhūtaḥ",
          children: [
            {
              iast: "svātmānanda",
              type: "tatpuruṣa",
              gloss: "the bliss of one's own Self",
              vigraha: "svātmana ānandaḥ svātmānandaḥ",
              children: [
                {
                  iast: "svātman",
                  type: "karmadhāraya",
                  gloss: "one's own Self",
                  vigraha: "sva ātmā svātmā",
                  children: [
                    ["sva", "own"],
                    ["ātman", "self"],
                  ],
                },
                ["ānanda", "bliss, joy"],
              ],
            },
            ["lavībhūta", "become a mere particle, reduced to a fragment"],
          ],
        },
        {
          iast: "brahmādyānandasantati",
          type: "tatpuruṣa",
          gloss: "the unbroken succession of the joys of Brahmā and the rest",
          vigraha: "brahmādyānandānāṃ santatiḥ brahmādyānandasantatiḥ",
          children: [
            {
              iast: "brahmādyānanda",
              type: "tatpuruṣa",
              gloss: "the joy of Brahmā and the other gods",
              vigraha: "brahmādīnām ānandaḥ brahmādyānandaḥ",
              children: [
                {
                  iast: "brahmādi",
                  type: "bahuvrīhi",
                  gloss: "Brahmā and those after him",
                  vigraha: "brahmā ādir yeṣāṃ te brahmādayaḥ",
                  children: [
                    ["brahman", "Brahmā, the creator"],
                    ["ādi", "beginning, and the rest"],
                  ],
                },
                ["ānanda", "bliss, joy"],
              ],
            },
            ["santati", "an unbroken series, continuum"],
          ],
        },
      ],
    },
  },
  366: {
    gloss: "The Supreme",
    translation:
      "She is the highest, and in the doctrine of speech she is parā, the level of the word before it has begun to stir.",
    pos: "adjective",
  },
  367: {
    gloss: "Formed Of Inward Consciousness",
    translation:
      "Her form is awareness turned back on itself, facing inward rather than out at objects.",
    note: "The middle member appears with a lengthened vowel as citī; the stem is citi.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is inward-facing consciousness",
      vigraha: "pratyakcitir eva rūpaṃ yasyāḥ sā pratyakcitīrūpā",
      children: [
        {
          iast: "pratyakciti",
          type: "karmadhāraya",
          gloss: "consciousness turned inward",
          vigraha: "pratyañcī citiḥ pratyakcitiḥ",
          children: [
            ["pratyañc", "turned back, facing inward"],
            ["citi", "consciousness, the thinking mind"],
          ],
        },
        ["rūpa", "form, shape"],
      ],
    },
  },
  368: {
    gloss: "The Seeing Word",
    translation:
      "She is paśyantī, speech at the stage where it is still a single seen thing and has not yet split into words.",
    note: "Feminine present participle of √paś, 'to see'.",
  },
  369: {
    gloss: "The Supreme Deity",
    translation: "Whatever else is called a god, she is the divinity above them.",
    compound: {
      type: "karmadhāraya",
      gloss: "the deity who is supreme",
      vigraha: "parā cāsau devatā ca paradevatā",
      children: [
        ["para", "highest, supreme, beyond"],
        ["devatā", "a divinity, godhead"],
      ],
    },
  },
  370: {
    gloss: "The Middle Word",
    translation:
      "She is madhyamā, speech at the middle stage, formed in the mind but not yet on the breath.",
    pos: "adjective",
  },
  371: {
    gloss: "Formed Of Uttered Speech",
    translation:
      "She takes shape as vaikharī, speech that has come all the way out into audible, sentence-shaped sound.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is articulate utterance",
      vigraha: "vaikhary eva rūpaṃ yasyāḥ sā vaikharīrūpā",
      children: [
        ["vaikharī", "fully articulated speech, the outermost stage of the word"],
        ["rūpa", "form, shape"],
      ],
    },
  },
  372: {
    gloss: "Swan On The Devotee's Lake",
    translation:
      "The devotee's mind is the lake Mānasa, and she is the swan that floats on it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the female swan on the mind-lake of the devotee",
      vigraha: "bhaktamānase haṃsikā bhaktamānasahaṃsikā",
      children: [
        {
          iast: "bhaktamānasa",
          type: "tatpuruṣa",
          gloss: "the mind of the devotee, punning on Lake Mānasa",
          vigraha: "bhaktasya mānasaṃ bhaktamānasam",
          children: [
            ["bhakta", "a devotee, one attached in love"],
            ["mānasa", "the mind, and the lake Mānasa"],
          ],
        },
        ["haṃsikā", "a female swan or goose"],
      ],
    },
  },
  373: {
    gloss: "Life-Vein Of Kāmeśvara",
    translation:
      "She runs through her consort like the vessel that carries his breath; cut her out and nothing of him is left alive.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the artery of life belonging to Kāmeśvara",
      vigraha: "kāmeśvarasya prāṇanāḍī kāmeśvaraprāṇanāḍī",
      children: [
        {
          iast: "kāmeśvara",
          type: "tatpuruṣa",
          gloss: "lord of desire, her consort",
          vigraha: "kāmasyeśvaraḥ kāmeśvaraḥ",
          children: [
            ["kāma", "desire"],
            ["īśvara", "lord, master"],
          ],
        },
        {
          iast: "prāṇanāḍī",
          type: "tatpuruṣa",
          gloss: "the channel of the life-breath",
          vigraha: "prāṇasya nāḍī prāṇanāḍī",
          children: [
            ["prāṇa", "breath, vitality, life"],
            ["nāḍī", "a tube, vein, channel"],
          ],
        },
      ],
    },
  },
  374: {
    gloss: "Grateful For What Is Done",
    translation:
      "The smallest thing offered to her is noticed and remembered, and she answers it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who recognizes what has been done for her",
      vigraha: "kṛtaṃ jānātīti kṛtajñā",
      children: [
        ["kṛta", "what has been done, a service rendered"],
        ["jña", "knowing, mindful of"],
      ],
    },
  },
  375: {
    gloss: "Worshipped By Kāma",
    translation:
      "Desire itself, in the person of the god Kāma, comes to her as a worshipper.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "worshipped by Kāma",
      vigraha: "kāmena pūjitā kāmapūjitā",
      children: [
        ["kāma", "Kāma, the god of desire"],
        ["pūjita", "worshipped, honoured"],
      ],
    },
  },
  376: {
    gloss: "Brimming With Erotic Savour",
    translation:
      "She is filled to the top with śṛṅgāra, the flavour that poetry reserves for love.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "wholly filled with the erotic sentiment",
      vigraha: "śṛṅgārarasena sampūrṇā śṛṅgārarasasampūrṇā",
      children: [
        {
          iast: "śṛṅgārarasa",
          type: "karmadhāraya",
          gloss: "the erotic flavour",
          vigraha: "śṛṅgāra eva rasaḥ śṛṅgārarasaḥ",
          children: [
            ["śṛṅgāra", "love, sexual passion"],
            ["rasa", "savour, aesthetic flavour"],
          ],
        },
        ["sampūrṇa", "completely filled, brimful"],
      ],
    },
  },
  377: {
    gloss: "Victory",
    translation: "She is victory in person, and those who hold to her share in it.",
  },
  378: {
    gloss: "Seated At Jālandhara",
    translation:
      "She has her station at Jālandhara, one of the seats where the goddess is held to be locally present.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding at Jālandhara",
      vigraha: "jālandhare sthitā jālandharasthitā",
      children: [
        ["jālandhara", "Jālandhara, a seat of the goddess"],
        ["sthita", "standing, abiding"],
      ],
    },
  },
  379: {
    gloss: "Dwelling At The Oḍyāṇa Seat",
    translation:
      "Her home is the pīṭha of Oḍyāṇa, another of the places where her presence is fixed to the ground.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose dwelling is the Oḍyāṇa seat",
      vigraha: "oḍyāṇapīṭho nilayo yasyāḥ sā oḍyāṇapīṭhanilayā",
      children: [
        {
          iast: "oḍyāṇapīṭha",
          type: "karmadhāraya",
          gloss: "the seat called Oḍyāṇa",
          vigraha: "oḍyāṇaṃ nāma pīṭham oḍyāṇapīṭham",
          children: [
            ["oḍyāṇa", "Oḍyāṇa, a seat of the goddess"],
            ["pīṭha", "a seat, pedestal, sacred site"],
          ],
        },
        ["nilaya", "dwelling, resting-place"],
      ],
    },
  },
  380: {
    gloss: "Dwelling In The Circle Of The Bindu",
    translation:
      "She lives at the point at the centre of the diagram, where the whole figure gathers to a single dot.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who dwells in the region of the bindu",
      vigraha: "bindumaṇḍale vasatīti bindumaṇḍalavāsinī",
      children: [
        {
          iast: "bindumaṇḍala",
          type: "tatpuruṣa",
          gloss: "the circle around the central point",
          vigraha: "bindor maṇḍalaṃ bindumaṇḍalam",
          children: [
            ["bindu", "a drop, a point, the central dot of the diagram"],
            ["maṇḍala", "a disk, circle, region"],
          ],
        },
        ["vāsinī", "she who dwells"],
      ],
    },
  },
  381: {
    gloss: "Worshipped By The Secret Rite",
    translation:
      "She is approached through the ordered steps of a rite performed out of sight, not in public assembly.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped by the sequence of the secret sacrifice",
      vigraha: "rahoyāgakrameṇārādhyā rahoyāgakramārādhyā",
      children: [
        {
          iast: "rahoyāgakrama",
          type: "tatpuruṣa",
          gloss: "the prescribed order of the secret sacrifice",
          vigraha: "rahoyāgasya kramaḥ rahoyāgakramaḥ",
          children: [
            {
              iast: "rahoyāga",
              type: "tatpuruṣa",
              gloss: "sacrifice performed in secret",
              vigraha: "rahasi yāgaḥ rahoyāgaḥ",
              children: [
                ["rahas", "solitude, secrecy, a hidden place"],
                ["yāga", "an offering, a sacrificial rite"],
              ],
            },
            ["krama", "step, regular sequence, prescribed order"],
          ],
        },
        ["ārādhya", "to be propitiated or worshipped"],
      ],
    },
  },
  382: {
    gloss: "Satisfied By Secret Libation",
    translation:
      "The offering poured for her in private is what actually reaches her and contents her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "gratified by the libation offered in secret",
      vigraha: "rahastarpaṇena tarpitā rahastarpaṇatarpitā",
      children: [
        {
          iast: "rahastarpaṇa",
          type: "tatpuruṣa",
          gloss: "libation made in secret",
          vigraha: "rahasi tarpaṇaṃ rahastarpaṇam",
          children: [
            ["rahas", "solitude, secrecy"],
            ["tarpaṇa", "a satisfying libation, an offering of water"],
          ],
        },
        ["tarpita", "satisfied, gratified"],
      ],
    },
  },
  383: {
    gloss: "Swift To Be Pleased",
    translation: "She does not keep anyone waiting for her favour.",
    note: "The first member sadyas is an indeclinable adverb.",
    compound: {
      type: "karmadhāraya",
      gloss: "she who grows gracious at once",
      vigraha: "sadyaḥ prasīdatīti sadyaḥprasādinī",
      children: [
        ["sadyas", "on the same day, at once, immediately"],
        ["prasādinī", "she who becomes gracious"],
      ],
    },
  },
  384: {
    gloss: "Witness Of All",
    translation:
      "Everything that happens happens in her sight, and she is present to it without taking part.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the witness of everything",
      vigraha: "viśvasya sākṣiṇī viśvasākṣiṇī",
      children: [
        ["viśva", "all, the whole world"],
        ["sākṣiṇī", "she who observes, a witness"],
      ],
    },
  },
  385: {
    gloss: "Having No Witness",
    translation:
      "She watches everything and nothing watches her; there is no second party who could stand outside her and look on.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "devoid of any witness",
      vigraha: "sākṣiṇā varjitā sākṣivarjitā",
      children: [
        ["sākṣin", "an observer, a witness"],
        ["varjita", "devoid of, without"],
      ],
    },
  },
  386: {
    gloss: "Joined By The Six Limb-Deities",
    translation:
      "The six deities assigned to the limbs of her mantra stand with her as a body stands with its parts.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "attended by the deities of the six limbs",
      vigraha: "ṣaḍaṅgadevatābhir yuktā ṣaḍaṅgadevatāyuktā",
      children: [
        {
          iast: "ṣaḍaṅgadevatā",
          type: "tatpuruṣa",
          gloss: "the deities of the six limbs of the mantra",
          vigraha: "ṣaḍaṅgasya devatāḥ ṣaḍaṅgadevatāḥ",
          children: [
            {
              iast: "ṣaḍaṅga",
              type: "dvigu",
              gloss: "the set of six limbs",
              vigraha: "ṣaṇṇām aṅgānāṃ samāhāraḥ ṣaḍaṅgam",
              children: [
                ["ṣaṣ", "six"],
                ["aṅga", "a limb, a subordinate part of a mantra"],
              ],
            },
            ["devatā", "a divinity, presiding deity"],
          ],
        },
        ["yukta", "joined with, attended by"],
      ],
    },
  },
  387: {
    gloss: "Filled With The Six Excellences",
    translation:
      "The six lordly qualities are not distributed among her in parts; she has each of them entire.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "wholly filled with the aggregate of six qualities",
      vigraha: "ṣāḍguṇyena paripūritā ṣāḍguṇyaparipūritā",
      children: [
        ["ṣāḍguṇya", "the aggregate of the six excellences"],
        ["paripūrita", "filled all round, made complete"],
      ],
    },
  },
  388: {
    gloss: "Ever Moist",
    translation:
      "She is never dry towards those who ask; the tenderness in her is always already wet, as her name among the Nityā goddesses says.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "perpetually moist",
      vigraha: "nityaṃ klinnā nityaklinnā",
      children: [
        ["nitya", "constant, perpetual"],
        ["klinna", "moistened, wet, softened"],
      ],
    },
  },
  389: {
    gloss: "Beyond Comparison",
    translation: "Nothing stands close enough to her to serve as a comparison.",
    compound: {
      type: "bahuvrīhi",
      gloss: "for whom there is no likeness",
      vigraha: "nirgatā upamā yasyāḥ sā nirupamā",
      children: [
        ["nis", "out, away, without"],
        ["upamā", "likeness, comparison"],
      ],
    },
  },
  390: {
    gloss: "Giver Of The Bliss Of Release",
    translation:
      "What she hands over at the end is the happiness of being blown out, with nothing further to want.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows the happiness of nirvāṇa",
      vigraha: "nirvāṇasukhaṃ dadātīti nirvāṇasukhadāyinī",
      children: [
        {
          iast: "nirvāṇasukha",
          type: "tatpuruṣa",
          gloss: "the happiness of extinction",
          vigraha: "nirvāṇasya sukhaṃ nirvāṇasukham",
          children: [
            ["nirvāṇa", "blowing out, extinction, final release"],
            ["sukha", "ease, happiness"],
          ],
        },
        ["dāyinī", "she who gives"],
      ],
    },
  },
  391: {
    gloss: "Formed Of The Sixteen Nityās",
    translation:
      "Her body is the set of sixteen eternal goddesses, of whom she herself is the sixteenth and the whole.",
    note: "The middle member can also be read as an appositional karmadhāraya, 'the eternal Ṣoḍaśī'.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is the group of sixteen Nityās",
      vigraha: "nityāṣoḍaśikaiva rūpaṃ yasyāḥ sā nityāṣoḍaśikārūpā",
      children: [
        {
          iast: "nityāṣoḍaśikā",
          type: "tatpuruṣa",
          gloss: "the sixteen-fold company of the Nityās",
          vigraha: "nityānāṃ ṣoḍaśikā nityāṣoḍaśikā",
          children: [
            ["nityā", "a Nityā, one of the eternal goddesses"],
            ["ṣoḍaśikā", "a group of sixteen, the sixteenth"],
          ],
        },
        ["rūpa", "form, shape"],
      ],
    },
  },
  392: {
    gloss: "Half The Body Of Śiva",
    translation:
      "She occupies one side of Śrīkaṇṭha's frame, so that the pair of them make a single figure.",
    note: "śarīriṇī behaves like the -rūpiṇī names: the possessive -in is the operative element, so the compound proper is śrīkaṇṭhārdhaśarīra. The name can equally be taken as a bahuvrīhi, she whose body is half of Śrīkaṇṭha.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who has half of Śrīkaṇṭha's body for her own",
      vigraha: "śrīkaṇṭhārdhaṃ śarīram asyā astīti śrīkaṇṭhārdhaśarīriṇī",
      children: [
        {
          iast: "śrīkaṇṭhārdha",
          type: "tatpuruṣa",
          gloss: "half of Śrīkaṇṭha",
          vigraha: "śrīkaṇṭhasyārdhaṃ śrīkaṇṭhārdham",
          children: [
            {
              iast: "śrīkaṇṭha",
              type: "bahuvrīhi",
              gloss: "the glorious-throated one, Śiva",
              vigraha: "śrīmān kaṇṭho yasya saḥ śrīkaṇṭhaḥ",
              children: [
                ["śrī", "splendour, beauty, glory"],
                ["kaṇṭha", "throat, neck"],
              ],
            },
            ["ardha", "half"],
          ],
        },
        ["śarīriṇī", "she who possesses a body"],
      ],
    },
  },
  393: {
    gloss: "Full Of Radiance",
    translation: "Light is not shed on her; she has it as a property of her own.",
    note: "Possessive derivative in -vat on prabhā, 'light, splendour'.",
  },
  394: {
    gloss: "Formed Of Light",
    translation:
      "There is nothing under the brightness — the brightness is what she is made of.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is radiance",
      vigraha: "prabhaiva rūpaṃ yasyāḥ sā prabhārūpā",
      children: [
        ["prabhā", "light, splendour, radiance"],
        ["rūpa", "form, shape"],
      ],
    },
  },
  395: {
    gloss: "The Renowned",
    translation:
      "She is famous in the plain sense: everybody has heard of her, and the word for her is the word for what is common knowledge.",
    pos: "adjective",
  },
  396: {
    gloss: "The Supreme Sovereign",
    translation: "Above every other ruling power there is her rule.",
    compound: {
      type: "karmadhāraya",
      gloss: "the mistress who is highest",
      vigraha: "paramā cāsāv īśvarī ca parameśvarī",
      children: [
        ["parama", "highest, supreme"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  397: {
    gloss: "Nature At The Root",
    translation:
      "She is the first material, the nature that everything else is a modification of and that is a modification of nothing.",
    compound: {
      type: "karmadhāraya",
      gloss: "primordial nature",
      vigraha: "mūlabhūtā prakṛtiḥ mūlaprakṛtiḥ",
      children: [
        ["mūla", "root, base, origin"],
        ["prakṛti", "nature, primary substance"],
      ],
    },
  },
  398: {
    gloss: "The Unmanifest",
    translation:
      "She has not come out into view, and no sense will ever bring her into view.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "not manifest",
      vigraha: "na vyaktā avyaktā",
      children: [
        ["a", "not, un-"],
        ["vyakta", "manifest, apparent, perceptible"],
      ],
    },
  },
  399: {
    gloss: "Formed Of Manifest And Unmanifest",
    translation:
      "What shows and what stays hidden are both her own shape; she is not divided between them.",
    note: "The suffix -in supplies the having, so the word is treated as a taddhita on vyaktāvyaktasvarūpa rather than as a bahuvrīhi; the bahuvrīhi sense, she who has the manifest and unmanifest for her form, is a common alternative.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she whose own nature is both the manifest and the unmanifest",
      vigraha: "vyaktāvyaktaṃ svarūpam asyā astīti vyaktāvyaktasvarūpiṇī",
      children: [
        {
          iast: "vyaktāvyakta",
          type: "dvandva",
          gloss: "the manifest and the unmanifest",
          vigraha: "vyaktaṃ cāvyaktaṃ ca vyaktāvyaktam",
          children: [
            ["vyakta", "manifest, evident"],
            ["avyakta", "unmanifest, imperceptible"],
          ],
        },
        ["svarūpiṇī", "she who has as her own nature"],
      ],
    },
  },
  400: {
    gloss: "The All-Pervading",
    translation:
      "She reaches through everything, leaving no gap where she is not already present.",
  },
};
