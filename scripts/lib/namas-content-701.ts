/**
 * Nāmas 701–800.
 *
 * Word meanings are grounded in the Monier-Williams Sanskrit-English
 * Dictionary (1899); the glosses, translations and compound analyses are
 * written fresh for this dataset.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  701: {
    gloss: "Unbounded By Space And Time",
    translation:
      "Neither place nor moment can fence her in, for she is wholly present wherever and whenever anything is.",
    compound: {
      type: "tatpuruṣa",
      gloss: "not delimited by place and time",
      vigraha: "deśena kālena ca aparicchinnā",
      children: [
        {
          iast: "deśakāla",
          type: "dvandva",
          gloss: "Place And Time",
          vigraha: "deśaś ca kālaś ca",
          children: [
            ["deśa", "place, region, spot"],
            ["kāla", "time"],
          ],
        },
        {
          iast: "aparicchinna",
          type: "tatpuruṣa",
          gloss: "Undelimited",
          vigraha: "na paricchinnā",
          children: [
            ["a", "not (privative prefix)"],
            ["paricchinna", "cut off, bounded, circumscribed"],
          ],
        },
      ],
    },
  },
  702: {
    gloss: "All-Pervading",
    translation:
      "She reaches into everything there is, so that no corner of the world is without her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "going everywhere",
      vigraha: "sarvaṃ gacchatīti sarvagā",
      children: [
        ["sarva", "all, every, the whole"],
        ["ga", "going to, moving in (from √gam)"],
      ],
    },
  },
  703: {
    gloss: "Enchantress Of All",
    translation:
      "Everything that lives is drawn out of itself by her beauty, so that she bewilders the whole of creation.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bewitches all",
      vigraha: "sarvaṃ mohayatīti sarvamohinī",
      children: [
        ["sarva", "all, everyone"],
        ["mohinī", "bewildering, fascinating woman"],
      ],
    },
  },
  704: {
    gloss: "Sarasvatī",
    translation:
      "She is Sarasvatī, the flowing one, from whom speech, learning and every well-turned word come.",
  },
  705: {
    gloss: "Made Of Scripture",
    translation:
      "The whole body of sacred teaching is her substance, so that to study the śāstras is already to touch her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of the scriptures",
      vigraha: "śāstram eva svarūpaṃ yasyāḥ sā śāstramayī",
      children: [
        ["śāstra", "authoritative teaching, sacred treatise"],
        ["mayī", "made of, consisting of (suffix -maya)"],
      ],
    },
  },
  706: {
    gloss: "Mother Of Guha",
    translation:
      "She is the mother of Guha, the son born in secret, and by the same word the mother who lives in the cave of the heart.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mother of Guha",
      vigraha: "guhasya ambā",
      children: [
        ["guha", "Guha (Skanda), the one reared in a hidden place; a cave"],
        ["ambā", "mother"],
      ],
    },
  },
  707: {
    gloss: "Whose Form Is Secret",
    translation:
      "Her real shape is a mystery, disclosed only where it is kept hidden.",
    note: "rūpiṇī is the feminine of rūpin, and it is that suffix which supplies the having, so the compound behind it is guhyarūpa; a bahuvrīhi reading, she whose form is hidden, is equally defensible.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having a hidden form",
      vigraha: "guhyaṃ rūpam asyā astīti guhyarūpiṇī",
      children: [
        ["guhya", "to be concealed, secret, mysterious"],
        ["rūpiṇī", "having the form of (from rūpin)"],
      ],
    },
  },
  708: {
    gloss: "Free Of Every Limitation",
    translation:
      "No adjunct of body, name or condition attaches to her; she stands loose from all of them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "released from all limiting adjuncts",
      vigraha: "sarvebhya upādhibhyo vinirmuktā",
      children: [
        {
          iast: "sarvopādhi",
          type: "karmadhāraya",
          gloss: "Every Limiting Adjunct",
          vigraha: "sarve upādhayaḥ",
          children: [
            ["sarva", "all, every"],
            ["upādhi", "limiting adjunct, a disguise laid over the real"],
          ],
        },
        ["vinirmukta", "wholly released, set free from"],
      ],
    },
  },
  709: {
    gloss: "Wife Devoted To Sadāśiva",
    translation:
      "Her husband Sadāśiva is her one observance, and she keeps that vow perfectly.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the devoted wife of Sadāśiva",
      vigraha: "sadāśivasya pativratā",
      children: [
        {
          iast: "sadāśiva",
          type: "karmadhāraya",
          gloss: "Sadāśiva, The Ever-Auspicious",
          vigraha: "sadā śivaḥ",
          children: [
            ["sadā", "always, perpetually"],
            ["śiva", "auspicious, gracious; Śiva"],
          ],
        },
        {
          iast: "pativratā",
          type: "bahuvrīhi",
          gloss: "Faithful Wife",
          vigraha: "patir eva vrataṃ yasyāḥ sā",
          children: [
            ["pati", "husband, lord"],
            ["vrata", "vow, binding observance"],
          ],
        },
      ],
    },
  },
  710: {
    gloss: "Mistress Of The Lineage Teaching",
    translation:
      "The doctrine handed from teacher to pupil is hers to govern, and it keeps its authority only from her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of the transmitted tradition",
      vigraha: "sampradāyasya īśvarī",
      children: [
        ["sampradāya", "tradition, doctrine handed down from teacher to pupil"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  711: {
    gloss: "The Good",
    translation:
      "She is goodness itself — straight, unerring and kindly disposed toward whoever turns to her.",
    pos: "adjective",
    gender: "neuter",
    declension: "u-stem",
    stem: "sādhu",
    note: "Counted as its own nāma in the standard enumeration, which reads six names in this verse; the dative sādhune is the masculine-neuter form, not the feminine sādhvyai that appears at nāma 126.",
  },
  712: {
    gloss: "The Syllable Ī",
    translation:
      "She is the bare sound ī, which the lexicons also record as a name of Lakṣmī.",
    pos: "noun",
    note: "A single vowel standing as a nāma, which the standard enumeration also counts separately here; published lists gloss it simply as the letter ī.",
  },
  713: {
    gloss: "Embodied As The Circle Of Gurus",
    translation:
      "The whole succession of teachers is her body, so that reverence paid to any of them reaches her.",
    note: "Since the possession is carried by -in, gurumaṇḍalarūpa is the compound and rūpiṇī a taddhita on it; the name is also commonly read as a bahuvrīhi, she who has the circle of gurus for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the circle of gurus for her form",
      vigraha: "gurumaṇḍalaṃ rūpam asyā astīti gurumaṇḍalarūpiṇī",
      children: [
        {
          iast: "gurumaṇḍala",
          type: "tatpuruṣa",
          gloss: "Circle Of Teachers",
          vigraha: "gurūṇāṃ maṇḍalam",
          children: [
            ["guru", "weighty one, spiritual teacher"],
            ["maṇḍala", "circle, ring, assembled company"],
          ],
        },
        ["rūpiṇī", "having the form of (from rūpin)"],
      ],
    },
  },
  714: {
    gloss: "Risen Above The Kula",
    translation:
      "She has climbed out past kula altogether — past family, past the body, past even the Kaula way that worships her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "gone up out of the kula",
      vigraha: "kulād uttīrṇā",
      children: [
        ["kula", "family, group; in Tantric usage the body and the Kaula order"],
        ["uttīrṇa", "crossed over, come up out of"],
      ],
    },
  },
  715: {
    gloss: "Worshipped Through Bhaga",
    translation:
      "She is approached by way of bhaga, the sixfold fullness of sovereignty, virtue, fame, beauty, knowledge and detachment.",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped by means of bhaga",
      vigraha: "bhagena ārādhyā",
      children: [
        ["bhaga", "good fortune, excellence, the sixfold divine fullness"],
        ["ārādhyā", "to be propitiated, worthy of worship"],
      ],
    },
  },
  716: {
    gloss: "Māyā",
    translation:
      "She is Māyā, the strange power that unfolds a world of appearances and conceals herself inside it.",
  },
  717: {
    gloss: "Full Of Sweetness",
    translation:
      "Honey runs through her, and her name is also that of the sweet stage of absorption in which everything begins to taste of bliss.",
    note: "A -mat possessive derivative of madhu, not a compound.",
  },
  718: {
    gloss: "The Wide Earth",
    translation:
      "She is Mahī, the broad ground that carries without complaint everything set upon it.",
  },
  719: {
    gloss: "Mother Of The Hosts",
    translation:
      "The troops of attendants who crowd around Śiva look to her as their mother.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mother of the gaṇas",
      vigraha: "gaṇānām ambā",
      children: [
        ["gaṇa", "troop, host, band of Śiva's attendants"],
        ["ambā", "mother"],
      ],
    },
  },
  720: {
    gloss: "Worshipped By The Guhyakas",
    translation:
      "The Guhyakas, who keep Kubera's hoards inside the mountains, offer their worship to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "worshipped by the Guhyakas",
      vigraha: "guhyakair ārādhyā",
      children: [
        ["guhyaka", "Guhyaka, a demigod of Kubera's retinue who guards hidden treasure"],
        ["ārādhyā", "to be propitiated, worthy of worship"],
      ],
    },
  },
  721: {
    gloss: "Tender-Limbed",
    translation:
      "Every limb of hers is soft to the point of yielding, without a hard line anywhere on her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose limbs are tender",
      vigraha: "komalāni aṅgāni yasyāḥ sā",
      children: [
        ["komala", "soft, tender, delicate"],
        ["aṅga", "limb, member of the body"],
      ],
    },
  },
  722: {
    gloss: "Fond Of The Guru",
    translation:
      "The teacher is what she loves, and she is in turn the teacher's own delight.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the guru is dear",
      vigraha: "guruḥ priyo yasyāḥ sā",
      children: [
        ["guru", "weighty one, spiritual teacher"],
        ["priya", "dear, beloved"],
      ],
    },
  },
  723: {
    gloss: "Answerable To No One",
    translation:
      "She runs on her own authority alone, taking her rule from nothing outside herself.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose governing principle is her own",
      vigraha: "svaṃ tantraṃ yasyāḥ sā",
      children: [
        ["sva", "one's own, self"],
        ["tantra", "framework, governing system, authority"],
      ],
    },
  },
  724: {
    gloss: "Ruler Of All The Tantras",
    translation:
      "Every tantra, whatever its school, is under her command and describes her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of all the tantras",
      vigraha: "sarveṣāṃ tantrāṇām īśī",
      children: [
        {
          iast: "sarvatantra",
          type: "karmadhāraya",
          gloss: "All The Tantras",
          vigraha: "sarvāṇi tantrāṇi",
          children: [
            ["sarva", "all, every"],
            ["tantra", "tantra, a scripture of ritual and mantra"],
          ],
        },
        ["īśī", "mistress, ruler (feminine of īśa)"],
      ],
    },
  },
  725: {
    gloss: "Embodied As Dakṣiṇāmūrti",
    translation:
      "She takes the shape of Dakṣiṇāmūrti, the south-facing teacher who instructs by keeping silent.",
    note: "The -in suffix is the possessive element, so the analysis takes dakṣiṇāmūrtirūpa as the compound and rūpiṇī as derived from it, rather than reading a bahuvrīhi, she who has Dakṣiṇāmūrti's form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the form of Dakṣiṇāmūrti",
      vigraha: "dakṣiṇāmūrter rūpam asyā astīti dakṣiṇāmūrtirūpiṇī",
      children: [
        {
          iast: "dakṣiṇāmūrti",
          type: "karmadhāraya",
          gloss: "The South-Facing Form",
          vigraha: "dakṣiṇā mūrtiḥ",
          children: [
            ["dakṣiṇā", "southward, facing south"],
            ["mūrti", "form, embodiment, image"],
          ],
        },
        ["rūpiṇī", "having the form of (from rūpin)"],
      ],
    },
  },
  726: {
    gloss: "Worshipped By Sanaka And His Brothers",
    translation:
      "Sanaka and the other mind-born sons of Brahmā, forever boys, give her their full worship.",
    compound: {
      type: "tatpuruṣa",
      gloss: "thoroughly worshipped by Sanaka and the rest",
      vigraha: "sanakādibhiḥ samārādhyā",
      children: [
        {
          iast: "sanakādi",
          type: "bahuvrīhi",
          gloss: "Sanaka And The Rest",
          vigraha: "sanakaḥ ādir yeṣāṃ te",
          children: [
            ["sanaka", "Sanaka, eldest of Brahmā's mind-born sages"],
            ["ādi", "beginning; and so on, and the rest"],
          ],
        },
        ["samārādhyā", "to be worshipped completely"],
      ],
    },
  },
  727: {
    gloss: "Giver Of The Knowledge Of Śiva",
    translation:
      "The knowledge in which Śiva is finally recognised is a gift only she can make.",
    compound: {
      type: "tatpuruṣa",
      gloss: "bestower of the knowledge of Śiva",
      vigraha: "śivajñānaṃ pradadātīti śivajñānapradāyinī",
      children: [
        {
          iast: "śivajñāna",
          type: "tatpuruṣa",
          gloss: "Knowledge Of Śiva",
          vigraha: "śivasya jñānam",
          children: [
            ["śiva", "Śiva, the auspicious one"],
            ["jñāna", "knowledge, especially the higher knowledge"],
          ],
        },
        ["pradāyinī", "bestowing, granting"],
      ],
    },
  },
  728: {
    gloss: "Digit Of Pure Consciousness",
    translation:
      "She is that fine sliver of awareness which is never itself an object, the way one digit stands for the whole moon.",
    compound: {
      type: "karmadhāraya",
      gloss: "the digit that is consciousness",
      vigraha: "cid eva kalā",
      children: [
        ["cit", "pure consciousness, awareness"],
        ["kalā", "a sixteenth part, digit of the moon; a fine portion"],
      ],
    },
  },
  729: {
    gloss: "Bud Of Bliss",
    translation:
      "Bliss appears in her as a flower still closed, holding everything it will become.",
    compound: {
      type: "karmadhāraya",
      gloss: "the bud that is bliss",
      vigraha: "ānanda eva kalikā",
      children: [
        ["ānanda", "bliss, joy"],
        ["kalikā", "an unopened flower, bud"],
      ],
    },
  },
  730: {
    gloss: "Whose Nature Is Love",
    translation:
      "Love is not something she feels but the very stuff she is made of.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is love",
      vigraha: "prema rūpaṃ yasyāḥ sā",
      children: [
        ["preman", "love, tender affection, fondness"],
        ["rūpa", "form, shape, nature"],
      ],
    },
  },
  731: {
    gloss: "Doer Of Kindness",
    translation:
      "Whatever she does for those who come to her turns out to be exactly what they wanted.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who does what is pleasing",
      vigraha: "priyaṃ karotīti priyaṅkarī",
      children: [
        ["priya", "what is dear, a kindness, a pleasure"],
        ["karī", "doer, maker (feminine of kara)"],
      ],
    },
  },
  732: {
    gloss: "Pleased By The Recital Of Her Names",
    translation:
      "Reading her thousand names straight through is enough to win her, no other offering being required.",
    compound: {
      type: "tatpuruṣa",
      gloss: "delighted by a complete recitation of the names",
      vigraha: "nāmapārāyaṇena prītā",
      children: [
        {
          iast: "nāmapārāyaṇa",
          type: "tatpuruṣa",
          gloss: "Recitation Of The Names",
          vigraha: "nāmnāṃ pārāyaṇam",
          children: [
            ["nāman", "name, appellation"],
            ["pārāyaṇa", "reading through to the end, complete recitation"],
          ],
        },
        ["prīta", "pleased, gladdened, satisfied"],
      ],
    },
  },
  733: {
    gloss: "The Vidyā Of Nandin",
    translation:
      "She is the mantra-lore that Nandin received and passed on, a form of her own vidyā carrying his name.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the vidyā belonging to Nandin",
      vigraha: "nandinaḥ vidyā",
      children: [
        ["nandi", "Nandin, the joyful one, Śiva's foremost attendant"],
        ["vidyā", "knowledge; a mantra of the goddess"],
      ],
    },
  },
  734: {
    gloss: "Mistress Of Dancers",
    translation:
      "She presides over the dance, and stands beside Śiva when he takes the name Naṭeśvara.",
    compound: {
      type: "tatpuruṣa",
      gloss: "sovereign lady of dancers",
      vigraha: "naṭānām īśvarī",
      children: [
        ["naṭa", "dancer, actor, mime"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  735: {
    gloss: "Ground Of The Illusory World",
    translation:
      "The world is false the way a snake seen in a rope is false, and she is the rope it is laid over.",
    note: "The neuter adhiṣṭhāna takes the feminine ending in agreement with the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the substratum of the unreal world",
      vigraha: "mithyājagataḥ adhiṣṭhānam",
      children: [
        {
          iast: "mithyājagat",
          type: "karmadhāraya",
          gloss: "The Unreal World",
          vigraha: "mithyā jagat",
          children: [
            ["mithyā", "falsely, wrongly; unreal, only apparent"],
            ["jagat", "the moving world, all that lives"],
          ],
        },
        ["adhiṣṭhāna", "standing-place, base, substratum"],
      ],
    },
  },
  736: {
    gloss: "Giver Of Liberation",
    translation:
      "Release from the round of births is hers to hand out, and she hands it out freely.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives liberation",
      vigraha: "muktiṃ dadātīti muktidā",
      children: [
        ["mukti", "release, final liberation"],
        ["dā", "giving, granting (from √dā)"],
      ],
    },
  },
  737: {
    gloss: "Embodied As Liberation",
    translation:
      "Liberation is not a state she confers from outside; it is the shape she herself wears.",
    note: "Treated as a taddhita in -in on muktirūpa, the suffix rather than the compound expressing possession; the bahuvrīhi sense, she who has liberation for her form, is the usual alternative.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having liberation for her form",
      vigraha: "mukti rūpam asyā astīti muktirūpiṇī",
      children: [
        ["mukti", "release, final liberation"],
        ["rūpiṇī", "having the form of (from rūpin)"],
      ],
    },
  },
  738: {
    gloss: "Fond Of The Lāsya Dance",
    translation:
      "She loves the lāsya, the graceful dance of feeling that answers Śiva's thunderous tāṇḍava.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the lāsya dance is dear",
      vigraha: "lāsyaṃ priyaṃ yasyāḥ sā",
      children: [
        ["lāsya", "the gentle dance expressing love, danced by women"],
        ["priya", "dear, beloved"],
      ],
    },
  },
  739: {
    gloss: "Bringer Of Dissolution",
    translation:
      "When the time comes she folds the worlds back into herself, and nothing resists.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who brings about dissolution",
      vigraha: "layaṃ karotīti layakarī",
      children: [
        ["laya", "dissolution, absorption, disappearance"],
        ["karī", "doer, maker (feminine of kara)"],
      ],
    },
  },
  740: {
    gloss: "Modesty",
    translation:
      "She is the reticence that keeps a thing worth having out of plain sight.",
  },
  741: {
    gloss: "Praised By Rambhā And The Apsarases",
    translation:
      "Rambhā and the other dancers of Indra's court bow before a beauty they cannot match.",
    compound: {
      type: "tatpuruṣa",
      gloss: "saluted by Rambhā and the rest",
      vigraha: "rambhādibhir vanditā",
      children: [
        {
          iast: "rambhādi",
          type: "bahuvrīhi",
          gloss: "Rambhā And The Rest",
          vigraha: "rambhā ādir yāsāṃ tāḥ",
          children: [
            ["rambhā", "Rambhā, the loveliest of the celestial nymphs"],
            ["ādi", "beginning; and so on, and the rest"],
          ],
        },
        ["vandita", "praised, saluted, revered"],
      ],
    },
  },
  742: {
    gloss: "Nectar-Rain On The Wildfire Of Existence",
    translation:
      "Worldly life burns like a forest fire, and she falls on it as a downpour of nectar.",
    compound: {
      type: "tatpuruṣa",
      gloss: "a shower of nectar upon the forest fire of becoming",
      vigraha: "bhavadāvāya sudhāvṛṣṭiḥ",
      children: [
        {
          iast: "bhavadāva",
          type: "karmadhāraya",
          gloss: "The Wildfire Of Becoming",
          vigraha: "bhava eva dāvaḥ",
          children: [
            ["bhava", "coming into being, worldly existence"],
            ["dāva", "a forest conflagration"],
          ],
        },
        {
          iast: "sudhāvṛṣṭi",
          type: "tatpuruṣa",
          gloss: "Rain Of Nectar",
          vigraha: "sudhāyā vṛṣṭiḥ",
          children: [
            ["sudhā", "nectar, the drink of the gods"],
            ["vṛṣṭi", "rain, a shower"],
          ],
        },
      ],
    },
  },
  743: {
    gloss: "Wildfire In The Forest Of Sins",
    translation:
      "Accumulated wrongdoing stands thick as a forest, and she runs through it as fire.",
    note: "The masculine anala takes the feminine ending in agreement with the goddess.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the conflagration in the forest that is sin",
      vigraha: "pāpāraṇye davānalaḥ",
      children: [
        {
          iast: "pāpāraṇya",
          type: "karmadhāraya",
          gloss: "The Forest Of Sin",
          vigraha: "pāpam eva araṇyam",
          children: [
            ["pāpa", "evil, wrongdoing, sin"],
            ["araṇya", "wilderness, forest"],
          ],
        },
        {
          iast: "davānala",
          type: "karmadhāraya",
          gloss: "Forest Fire",
          vigraha: "davaḥ eva analaḥ",
          children: [
            ["dava", "a burning forest, conflagration"],
            ["anala", "fire"],
          ],
        },
      ],
    },
  },
  744: {
    gloss: "Whirlwind To The Cotton Of Misfortune",
    translation:
      "Ill luck is as light as cotton fluff before her, and she is the gale that scatters it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "a hurricane against the cotton-down of ill fortune",
      vigraha: "daurbhāgyatūlasya vātūlā",
      children: [
        {
          iast: "daurbhāgyatūla",
          type: "karmadhāraya",
          gloss: "The Cotton-Down Of Misfortune",
          vigraha: "daurbhāgyam eva tūlam",
          children: [
            ["daurbhāgya", "ill luck, misfortune, being unloved"],
            ["tūla", "a tuft of cotton or reed-down"],
          ],
        },
        ["vātūla", "a whirlwind, gale, hurricane"],
      ],
    },
  },
  745: {
    gloss: "Sunlight On The Darkness Of Age",
    translation:
      "Old age closes in like nightfall, and she rises against it with the light of the sun.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the sun's radiance falling on the darkness of old age",
      vigraha: "jarādhvānte raviprabhā",
      children: [
        {
          iast: "jarādhvānta",
          type: "karmadhāraya",
          gloss: "The Darkness Of Old Age",
          vigraha: "jarā eva dhvāntam",
          children: [
            ["jarā", "growing old, old age, decrepitude"],
            ["dhvānta", "darkness, gloom"],
          ],
        },
        {
          iast: "raviprabhā",
          type: "tatpuruṣa",
          gloss: "Radiance Of The Sun",
          vigraha: "raveḥ prabhā",
          children: [
            ["ravi", "the sun"],
            ["prabhā", "light, splendour, radiance"],
          ],
        },
      ],
    },
  },
  746: {
    gloss: "Moonlight On The Sea Of Good Fortune",
    translation:
      "As moonlight draws the tide up, her light makes a devotee's good fortune rise.",
    compound: {
      type: "tatpuruṣa",
      gloss: "moonlight upon the ocean of good fortune",
      vigraha: "bhāgyābdheś candrikā",
      children: [
        {
          iast: "bhāgyābdhi",
          type: "karmadhāraya",
          gloss: "The Ocean Of Good Fortune",
          vigraha: "bhāgyam eva abdhiḥ",
          children: [
            ["bhāgya", "one's lot, good fortune, prosperity"],
            ["abdhi", "the holder of waters, the ocean"],
          ],
        },
        ["candrikā", "moonlight"],
      ],
    },
  },
  747: {
    gloss: "Raincloud To The Peacock Of The Devotee's Mind",
    translation:
      "A devotee's mind cries out for her as a peacock cries for the monsoon, and she gathers overhead as the rain.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the heavy rain cloud for the peacock that is the devotee's mind",
      vigraha: "bhaktacittakekinaḥ ghanāghanā",
      children: [
        {
          iast: "bhaktacittakeki",
          type: "karmadhāraya",
          gloss: "The Peacock That Is The Devotee's Mind",
          vigraha: "bhaktacittam eva kekī",
          children: [
            {
              iast: "bhaktacitta",
              type: "tatpuruṣa",
              gloss: "The Devotee's Mind",
              vigraha: "bhaktasya cittam",
              children: [
                ["bhakta", "devoted one, worshipper"],
                ["citta", "mind, the thinking and feeling faculty"],
              ],
            },
            ["kekin", "peacock, so called from its cry"],
          ],
        },
        ["ghanāghana", "a dense, heavily raining cloud"],
      ],
    },
  },
  748: {
    gloss: "Thunderbolt To The Mountain Of Disease",
    translation:
      "Sickness piles up like a mountain, and she splits it as Indra's bolt split the wings off the hills.",
    note: "The masculine dambholi is applied to the goddess in apposition.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the thunderbolt that shatters the mountain of disease",
      vigraha: "rogaparvatasya dambholiḥ",
      children: [
        {
          iast: "rogaparvata",
          type: "karmadhāraya",
          gloss: "The Mountain Of Disease",
          vigraha: "rogaḥ eva parvataḥ",
          children: [
            ["roga", "sickness, disease, infirmity"],
            ["parvata", "mountain, rocky height"],
          ],
        },
        ["dambholi", "Indra's thunderbolt"],
      ],
    },
  },
  749: {
    gloss: "Axe To The Tree Of Death",
    translation:
      "Death stands like a hardwood tree in the path, and she is the small bright axe that fells it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the hatchet for the timber that is death",
      vigraha: "mṛtyudāruṇaḥ kuṭhārikā",
      children: [
        {
          iast: "mṛtyudāru",
          type: "karmadhāraya",
          gloss: "The Timber That Is Death",
          vigraha: "mṛtyur eva dāru",
          children: [
            ["mṛtyu", "death, dying"],
            ["dāru", "wood, timber, a piece of wood"],
          ],
        },
        ["kuṭhārikā", "a small axe, hatchet"],
      ],
    },
  },
  750: {
    gloss: "Great Sovereign Lady",
    translation:
      "She is Maheśvarī, the great ruler, consort and equal of Maheśvara himself.",
    compound: {
      type: "karmadhāraya",
      gloss: "the great sovereign lady",
      vigraha: "mahatī cāsau īśvarī ca",
      children: [
        ["mahat", "great, mighty, vast"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  751: {
    gloss: "Great Kālī",
    translation:
      "She is Mahākālī, the dark one who outlasts time by devouring it.",
    compound: {
      type: "karmadhāraya",
      gloss: "the great Kālī",
      vigraha: "mahatī cāsau kālī ca",
      children: [
        ["mahat", "great, mighty, vast"],
        ["kālī", "the black one; Kālī, consort of Mahākāla"],
      ],
    },
  },
  752: {
    gloss: "Of The Great Devouring",
    translation:
      "At the end of an age the whole of creation is one mouthful to her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose morsel is enormous",
      vigraha: "mahān grāso yasyāḥ sā",
      children: [
        ["mahat", "great, huge"],
        ["grāsa", "a mouthful, morsel; the portion swallowed in an eclipse"],
      ],
    },
  },
  753: {
    gloss: "The Great Eater",
    translation:
      "Her appetite has no floor to it, for everything that comes into being is eventually her food.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose eating is vast",
      vigraha: "mahad aśanaṃ yasyāḥ sā",
      children: [
        ["mahat", "great, much, vast"],
        ["aśana", "eating, food"],
      ],
    },
  },
  754: {
    gloss: "She Who Refused Even A Leaf",
    translation:
      "In her austerities she gave up food by degrees until she would not take even a fallen leaf, and by that won Śiva.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who is without a leaf",
      vigraha: "na vidyate parṇaṃ yasyāḥ sā",
      children: [
        ["a", "not, without (privative prefix)"],
        ["parṇa", "leaf"],
      ],
    },
  },
  755: {
    gloss: "The Fierce One",
    translation:
      "She is Caṇḍikā, whose anger burns hot when the world needs defending.",
  },
  756: {
    gloss: "Slayer Of The Asuras Caṇḍa And Muṇḍa",
    translation:
      "She struck down Caṇḍa and Muṇḍa, the two demon captains, and took the name Cāmuṇḍā from them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "destroyer of the demons Caṇḍa and Muṇḍa",
      vigraha: "caṇḍamuṇḍāsurāṇāṃ niṣūdinī",
      children: [
        {
          iast: "caṇḍamuṇḍāsura",
          type: "karmadhāraya",
          gloss: "The Demons Caṇḍa And Muṇḍa",
          vigraha: "caṇḍamuṇḍau asurau",
          children: [
            {
              iast: "caṇḍamuṇḍa",
              type: "dvandva",
              gloss: "Caṇḍa And Muṇḍa",
              vigraha: "caṇḍaś ca muṇḍaś ca",
              children: [
                ["caṇḍa", "the violent one; the demon Caṇḍa"],
                ["muṇḍa", "the shaven or bald one; the demon Muṇḍa"],
              ],
            },
            ["asura", "demon, adversary of the gods"],
          ],
        },
        ["niṣūdinī", "destroying, slaying"],
      ],
    },
  },
  757: {
    gloss: "Whose Being Is Perishable And Imperishable",
    translation:
      "What decays and what never decays are both her, so that nothing falls outside her nature.",
    note: "In ātmikā the -ka suffix already means having, so the word is taken as a derivative of kṣarākṣarātman; a bahuvrīhi reading, she whose self is the perishable and the imperishable, is also current.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of the perishable and the imperishable",
      vigraha: "kṣarākṣarayor ātmikā",
      children: [
        {
          iast: "kṣarākṣara",
          type: "dvandva",
          gloss: "The Perishable And The Imperishable",
          vigraha: "kṣaraś ca akṣaraś ca",
          children: [
            ["kṣara", "melting away, perishable"],
            ["akṣara", "undecaying, imperishable"],
          ],
        },
        ["ātmikā", "having the nature of, consisting of"],
      ],
    },
  },
  758: {
    gloss: "Ruler Of All The Worlds",
    translation:
      "Every world, high or low, has her for its one sovereign.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of all the worlds",
      vigraha: "sarveṣāṃ lokānām īśī",
      children: [
        {
          iast: "sarvaloka",
          type: "karmadhāraya",
          gloss: "All The Worlds",
          vigraha: "sarve lokāḥ",
          children: [
            ["sarva", "all, every"],
            ["loka", "world, realm, sphere of existence"],
          ],
        },
        ["īśī", "mistress, ruler (feminine of īśa)"],
      ],
    },
  },
  759: {
    gloss: "Upholder Of The Universe",
    translation:
      "She carries the whole world, and it stays in being only because she keeps holding it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears up the universe",
      vigraha: "viśvaṃ dhārayatīti viśvadhāriṇī",
      children: [
        ["viśva", "all, entire; the universe"],
        ["dhāriṇī", "bearing, supporting, sustaining"],
      ],
    },
  },
  760: {
    gloss: "Giver Of The Three Aims",
    translation:
      "Right conduct, means and pleasure — the three ends a person may honourably pursue — are all in her gift.",
    compound: {
      type: "tatpuruṣa",
      gloss: "bestower of the group of three human aims",
      vigraha: "trivargasya dātrī",
      children: [
        {
          iast: "trivarga",
          type: "dvigu",
          gloss: "The Group Of Three",
          vigraha: "trayāṇāṃ vargaḥ",
          children: [
            ["tri", "three"],
            ["varga", "group, class, set"],
          ],
        },
        ["dātrī", "giver, bestower (feminine of dātṛ)"],
      ],
    },
  },
  761: {
    gloss: "Blessed With Every Good Fortune",
    translation:
      "Good fortune is her permanent condition, and it shows as beauty and as the power to make others fortunate.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose portion is fair",
      vigraha: "śobhanaṃ bhagaṃ yasyāḥ sā",
      children: [
        ["su", "good, well, fair (prefix)"],
        ["bhaga", "good fortune, prosperity, excellence"],
      ],
    },
  },
  762: {
    gloss: "Three-Eyed",
    translation:
      "Sun, moon and fire are her three eyes, so that she sees by day, by night and past both.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has three eyes",
      vigraha: "trīṇy ambakāni yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["ambaka", "eye"],
      ],
    },
  },
  763: {
    gloss: "Whose Nature Is The Three Strands",
    translation:
      "Purity, energy and inertia are the three threads she is spun from, and she weaves the world out of them.",
    note: "The possessive force belongs to the -ka of ātmaka, so triguṇātman is the compound proper; read the other way the name is a bahuvrīhi, she whose nature is the three strands.",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of the three guṇas",
      vigraha: "triguṇānām ātmikā",
      children: [
        {
          iast: "triguṇa",
          type: "dvigu",
          gloss: "The Three Strands",
          vigraha: "trayāṇāṃ guṇānāṃ samāhāraḥ",
          children: [
            ["tri", "three"],
            ["guṇa", "a strand of a cord; a constituent quality of nature"],
          ],
        },
        ["ātmikā", "having the nature of, consisting of"],
      ],
    },
  },
  764: {
    gloss: "Giver Of Heaven And Of Release",
    translation:
      "She grants heaven to those who want it and freedom from rebirth to those who want more.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives both heaven and final release",
      vigraha: "svargam apavargaṃ ca dadātīti svargāpavargadā",
      children: [
        {
          iast: "svargāpavarga",
          type: "dvandva",
          gloss: "Heaven And Release",
          vigraha: "svargaś ca apavargaś ca",
          children: [
            ["svarga", "heaven, the bright world of the gods"],
            ["apavarga", "completion; release from rebirth"],
          ],
        },
        ["dā", "giving, granting (from √dā)"],
      ],
    },
  },
  765: {
    gloss: "The Unmixed",
    translation:
      "Nothing foreign has ever been added to her, so she is clean in the way that only what is simple can be.",
  },
  766: {
    gloss: "Whose Form Glows Like A Hibiscus",
    translation:
      "Her body has the deep red of a hibiscus flower, the colour of the dawn and of the offerings she likes best.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose shape resembles the japā flower",
      vigraha: "japāpuṣpanibhā ākṛtir yasyāḥ sā",
      children: [
        {
          iast: "japāpuṣpanibha",
          type: "tatpuruṣa",
          gloss: "Like A Hibiscus Blossom",
          vigraha: "japāpuṣpasya nibhaḥ",
          children: [
            {
              iast: "japāpuṣpa",
              type: "tatpuruṣa",
              gloss: "Hibiscus Blossom",
              vigraha: "japāyāḥ puṣpam",
              children: [
                ["japā", "the China rose, hibiscus"],
                ["puṣpa", "flower, blossom"],
              ],
            },
            ["nibha", "resembling, like"],
          ],
        },
        ["ākṛti", "form, shape, appearance"],
      ],
    },
  },
  767: {
    gloss: "Full Of Vigour",
    translation:
      "Vital strength is stored up in her, and every living thing draws its energy from that store.",
    note: "A -vat possessive derivative of the s-stem ojas, with the regular -aḥ to -o before v.",
  },
  768: {
    gloss: "Bearer Of Radiance",
    translation:
      "She carries her own light, owing nothing of her brilliance to anything outside her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who holds splendour",
      vigraha: "dyutiṃ dharatīti dyutidharā",
      children: [
        ["dyuti", "splendour, brightness, lustre"],
        ["dhara", "bearing, holding, carrying"],
      ],
    },
  },
  769: {
    gloss: "Whose Form Is The Sacrifice",
    translation:
      "The rite, the offering and the one who offers are all shapes of her, so that every sacrifice reaches her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is the sacrifice",
      vigraha: "yajño rūpaṃ yasyāḥ sā",
      children: [
        ["yajña", "worship, offering, sacrifice"],
        ["rūpa", "form, shape, nature"],
      ],
    },
  },
  770: {
    gloss: "Devoted To Her Observance",
    translation:
      "The vow she has taken is precious to her, and she is equally fond of those who keep their own.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom her vow is dear",
      vigraha: "priyaṃ vrataṃ yasyāḥ sā",
      children: [
        ["priya", "dear, beloved"],
        ["vrata", "vow, rule of life, religious observance"],
      ],
    },
  },
  771: {
    gloss: "Hard To Propitiate",
    translation:
      "She is not won cheaply; the worship that reaches her costs the worshipper something.",
    compound: {
      type: "tatpuruṣa",
      gloss: "difficult to win over",
      vigraha: "duḥkhena ārādhyā",
      children: [
        ["dus", "ill, hard, with difficulty (prefix)"],
        ["ārādhyā", "to be propitiated, worthy of worship"],
      ],
    },
  },
  772: {
    gloss: "Not To Be Assailed",
    translation:
      "No one can come at her by force, and whoever tries is the one who breaks.",
    compound: {
      type: "tatpuruṣa",
      gloss: "difficult to attack",
      vigraha: "duḥkhena ādhraṣṭuṃ śakyā",
      children: [
        ["dus", "ill, hard, with difficulty (prefix)"],
        ["ādharṣa", "assailable, liable to be attacked"],
      ],
    },
  },
  773: {
    gloss: "Fond Of Pāṭalī Blossoms",
    translation:
      "The pale trumpet flowers of the pāṭalī tree are what she likes to be offered.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the pāṭalī flower is dear",
      vigraha: "pāṭalīkusumaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "pāṭalīkusuma",
          type: "tatpuruṣa",
          gloss: "Blossom Of The Pāṭalī",
          vigraha: "pāṭalyāḥ kusumam",
          children: [
            ["pāṭalī", "the trumpet-flower tree, Bignonia suaveolens"],
            ["kusuma", "flower, blossom"],
          ],
        },
        ["priya", "dear, beloved"],
      ],
    },
  },
  774: {
    gloss: "The Great One",
    translation:
      "She is simply great — great in extent, in age and in worth, with nothing to compare her to.",
    note: "Feminine of the consonant stem mahat.",
  },
  775: {
    gloss: "Dwelling On Meru",
    translation:
      "Her house stands on Meru, the golden mountain at the centre around which everything else turns.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose abode is Meru",
      vigraha: "merur nilayo yasyāḥ sā",
      children: [
        ["meru", "Meru, the golden world-mountain"],
        ["nilaya", "resting-place, dwelling, abode"],
      ],
    },
  },
  776: {
    gloss: "Fond Of Mandāra Blossoms",
    translation:
      "The coral tree of paradise flowers for her, and she is pleased when its blossoms are laid before her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the mandāra flower is dear",
      vigraha: "mandārakusumaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "mandārakusuma",
          type: "tatpuruṣa",
          gloss: "Blossom Of The Mandāra",
          vigraha: "mandārasya kusumam",
          children: [
            ["mandāra", "the coral tree, one of the five trees of paradise"],
            ["kusuma", "flower, blossom"],
          ],
        },
        ["priya", "dear, beloved"],
      ],
    },
  },
  777: {
    gloss: "Worshipped By The Heroes",
    translation:
      "The vīras, who take the difficult path without flinching from it, are the ones who worship her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "worshipped by heroes",
      vigraha: "vīrair ārādhyā",
      children: [
        ["vīra", "hero, brave man; an adept of the heroic discipline"],
        ["ārādhyā", "to be propitiated, worthy of worship"],
      ],
    },
  },
  778: {
    gloss: "Whose Form Is Virāj",
    translation:
      "The vast shining body of the universe, Virāj, is one of her shapes.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is the cosmic Virāj",
      vigraha: "virāḍ rūpaṃ yasyāḥ sā",
      children: [
        ["virāj", "ruling far and wide; Virāj, the first embodied cosmos"],
        ["rūpa", "form, shape, nature"],
      ],
    },
  },
  779: {
    gloss: "Free Of Dust And Passion",
    translation:
      "Nothing settles on her — neither dust, nor the restless quality of rajas, nor the taint of blood.",
    declension: "s-stem",
    stem: "virajas",
    compound: {
      type: "bahuvrīhi",
      gloss: "she from whom rajas has departed",
      vigraha: "vigataṃ rajo yasyāḥ sā",
      children: [
        ["vi", "away, apart, without (prefix)"],
        ["rajas", "dust, pollen; the restless strand of nature"],
      ],
    },
  },
  780: {
    gloss: "Facing Every Direction",
    translation:
      "Turn where you like and you meet her face, for she has no back to be behind.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose face is turned every way",
      vigraha: "viśvato mukhaṃ yasyāḥ sā",
      children: [
        ["viśvatas", "from or on all sides, in every direction"],
        ["mukha", "face, mouth"],
      ],
    },
  },
  781: {
    gloss: "Whose Form Is The Inward Self",
    translation:
      "She is what is found by turning attention around to face the one who is looking.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is the indwelling self",
      vigraha: "pratyag rūpaṃ yasyāḥ sā",
      children: [
        ["pratyañc", "turned inward, the self within"],
        ["rūpa", "form, shape, nature"],
      ],
    },
  },
  782: {
    gloss: "The Supreme Ether",
    translation:
      "She is the space beyond space, in which the sky itself has room to be.",
    note: "The masculine ākāśa takes the feminine ending in agreement with the goddess.",
    compound: {
      type: "karmadhāraya",
      gloss: "the highest ether",
      vigraha: "paraḥ ākāśaḥ",
      children: [
        ["para", "highest, supreme, beyond"],
        ["ākāśa", "open space, ether, sky"],
      ],
    },
  },
  783: {
    gloss: "Giver Of Life",
    translation:
      "The breath that keeps a creature alive is handed to it by her, one moment at a time.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who gives the breath of life",
      vigraha: "prāṇaṃ dadātīti prāṇadā",
      children: [
        ["prāṇa", "breath, the breath of life, vitality"],
        ["dā", "giving, granting (from √dā)"],
      ],
    },
  },
  784: {
    gloss: "Embodied As The Breath Of Life",
    translation:
      "She does not merely grant the life-breath; she is it, moving in every chest that rises and falls.",
    note: "prāṇarūpa is the compound and the possessive -in is added to it, which is why the name is classed as a tatpuruṣa; it is also read as a bahuvrīhi, she who has the breath of life for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the vital breath for her form",
      vigraha: "prāṇo rūpam asyā astīti prāṇarūpiṇī",
      children: [
        ["prāṇa", "breath, the breath of life, vitality"],
        ["rūpiṇī", "having the form of (from rūpin)"],
      ],
    },
  },
  785: {
    gloss: "Worshipped By Mārtāṇḍa-Bhairava",
    translation:
      "Bhairava in his solar form, Mārtāṇḍa-Bhairava, is among her worshippers and is counted her consort in that rite.",
    compound: {
      type: "tatpuruṣa",
      gloss: "worshipped by Mārtāṇḍa-Bhairava",
      vigraha: "mārtāṇḍabhairaveṇa ārādhyā",
      children: [
        {
          iast: "mārtāṇḍabhairava",
          type: "karmadhāraya",
          gloss: "Bhairava As The Sun",
          vigraha: "mārtāṇḍaś cāsau bhairavaś ca",
          children: [
            ["mārtāṇḍa", "born of the lifeless egg, the sun"],
            ["bhairava", "the terrible one, a fierce form of Śiva"],
          ],
        },
        ["ārādhyā", "to be propitiated, worthy of worship"],
      ],
    },
  },
  786: {
    gloss: "Who Set The Realm's Burden On Her Minister",
    translation:
      "She handed the whole yoke of government to Mantriṇī and kept none of the labour of ruling for herself.",
    declension: "r-stem",
    stem: "mantriṇīnyastarājyadhur",
    note: "Consonant stem dhur, nominative singular dhūḥ.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she by whom the yoke of kingship was laid on her minister",
      vigraha: "mantriṇyāṃ nyastā rājyadhūr yayā sā",
      children: [
        {
          iast: "mantriṇīnyasta",
          type: "tatpuruṣa",
          gloss: "Laid Upon The Minister",
          vigraha: "mantriṇyāṃ nyastā",
          children: [
            ["mantriṇī", "woman counsellor; Mantriṇī, the goddess's minister"],
            ["nyasta", "laid down, deposited, entrusted"],
          ],
        },
        {
          iast: "rājyadhur",
          type: "tatpuruṣa",
          gloss: "Yoke Of Sovereignty",
          vigraha: "rājyasya dhūḥ",
          children: [
            ["rājya", "kingship, sovereignty, realm"],
            ["dhur", "yoke, burden, load"],
          ],
        },
      ],
    },
  },
  787: {
    gloss: "Mistress Of Tripura",
    translation:
      "The triple city is hers to govern, whether it is read as three fortresses or as the three states a mind passes through.",
    compound: {
      type: "tatpuruṣa",
      gloss: "ruler of Tripura",
      vigraha: "tripurasya īśī",
      children: [
        ["tripura", "the triple city of the demons; the threefold world"],
        ["īśī", "mistress, ruler (feminine of īśa)"],
      ],
    },
  },
  788: {
    gloss: "Whose Army Conquers",
    translation:
      "The forces she sends out have never yet come back beaten.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose army is victorious",
      vigraha: "jayantī senā yasyāḥ sā",
      children: [
        ["jayat", "conquering, winning (present participle of √ji)"],
        ["senā", "army, armed host"],
      ],
    },
  },
  789: {
    gloss: "Beyond The Three Strands",
    translation:
      "Purity, restlessness and dullness are hers to deploy, but none of the three has any grip on her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she from whom the state of the three guṇas has gone",
      vigraha: "nirgataṃ traiguṇyaṃ yasyāḥ sā",
      children: [
        ["nis", "out, away, without (prefix)"],
        ["traiguṇya", "the condition of consisting of the three guṇas"],
      ],
    },
  },
  790: {
    gloss: "Both Higher And Lower",
    translation:
      "She is the far and the near at once, the cause and the effect, without being divided by the difference.",
    compound: {
      type: "dvandva",
      gloss: "the transcendent and the immanent together",
      vigraha: "parā ca aparā ca",
      children: [
        ["para", "far, higher, transcendent"],
        ["apara", "nearer, lower, subsequent"],
      ],
    },
  },
  791: {
    gloss: "Whose Form Is Truth, Knowledge And Bliss",
    translation:
      "What is real, what knows, and what is happy are not three things in her but one.",
    compound: {
      type: "bahuvrīhi",
      gloss: "whose form is truth, knowledge and bliss",
      vigraha: "satyajñānānandaṃ rūpaṃ yasyāḥ sā",
      children: [
        {
          iast: "satyajñānānanda",
          type: "dvandva",
          gloss: "Truth, Knowledge And Bliss",
          vigraha: "satyaṃ ca jñānaṃ ca ānandaś ca",
          children: [
            ["satya", "true, real; truth, reality"],
            ["jñāna", "knowing, knowledge"],
            ["ānanda", "bliss, joy"],
          ],
        },
        ["rūpa", "form, shape, nature"],
      ],
    },
  },
  792: {
    gloss: "Intent On Perfect Union",
    translation:
      "Her whole aim is sāmarasya, the state in which two things share a single flavour and stop being two.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose chief object is identity of essence",
      vigraha: "sāmarasyaṃ parāyaṇaṃ yasyāḥ sā",
      children: [
        ["sāmarasya", "sameness of savour, identity of essence (from samarasa)"],
        ["parāyaṇa", "final resort, chief object of devotion"],
      ],
    },
  },
  793: {
    gloss: "Wearing The Matted Knot",
    translation:
      "Her hair is coiled in the shell-shaped knot that Śiva wears, which marks her as his match rather than his ornament.",
    note: "Feminine of the -in derivative kapardin, from kaparda.",
  },
  794: {
    gloss: "Garland Of Digits",
    translation:
      "The sixteen digits of the moon hang together on her as a strand of beads, and the arts they stand for are the same garland.",
    compound: {
      type: "tatpuruṣa",
      gloss: "a garland made of the kalās",
      vigraha: "kalānāṃ mālā",
      children: [
        ["kalā", "a sixteenth part, a digit of the moon; an art"],
        ["mālā", "garland, wreath, string of beads"],
      ],
    },
  },
  795: {
    gloss: "Yielding Every Wish",
    translation:
      "She is the cow of plenty, giving out whatever is asked of her as easily as milk is drawn.",
    declension: "consonant stem",
    stem: "kāmaduh",
    note: "Root noun in -duh; the final aspirate surfaces as -dhuk in the nominative singular.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who milks out desires",
      vigraha: "kāmān dogdhīti kāmadhuk",
      children: [
        ["kāma", "wish, desire, object longed for"],
        ["duh", "milking, yielding (from √duh)"],
      ],
    },
  },
  796: {
    gloss: "Taking Any Form She Wishes",
    translation:
      "She wears whatever shape she pleases, and the shape desire itself takes is also hers.",
    note: "The having is in the suffix -in, so kāmarūpa is the compound and rūpiṇī the derivative; the same word read as a bahuvrīhi gives she who has the form she desires. The name recurs as the second member of nāma 454.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the form she wishes",
      vigraha: "kāmato rūpam asyā astīti kāmarūpiṇī",
      children: [
        ["kāma", "wish, desire, one's own will"],
        ["rūpiṇī", "having the form of (from rūpin)"],
      ],
    },
  },
  797: {
    gloss: "Treasury Of The Arts",
    translation:
      "Every skill and every digit of the moon is stored in her, which is why the same word names the moon.",
    note: "The masculine nidhi is applied to the goddess in apposition; kalānidhi is also a common name for the moon.",
    compound: {
      type: "tatpuruṣa",
      gloss: "a hoard of the kalās",
      vigraha: "kalānāṃ nidhiḥ",
      children: [
        ["kalā", "a sixteenth part, a digit of the moon; an art"],
        ["nidhi", "receptacle, store, treasure-hoard"],
      ],
    },
  },
  798: {
    gloss: "The Art Of Poetry",
    translation:
      "She is the craft by which words are made to carry more than they say.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the art of poetry",
      vigraha: "kāvyasya kalā",
      children: [
        ["kāvya", "the work of a poet, poetry"],
        ["kalā", "art, skill, practised accomplishment"],
      ],
    },
  },
  799: {
    gloss: "Knower Of Savour",
    translation:
      "She knows rasa in all its senses at once — the taste on the tongue, the mood of a poem, and the essence of a thing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who knows flavour",
      vigraha: "rasaṃ jānātīti rasajñā",
      children: [
        ["rasa", "sap, juice, taste; the essence of a thing; poetic mood"],
        ["jña", "knowing, acquainted with (from √jñā)"],
      ],
    },
  },
  800: {
    gloss: "Hoard Of Savour",
    translation:
      "She is where all savour is stored, an inexhaustible treasury of the essence of things.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the treasure-store of rasa",
      vigraha: "rasasya śevadhiḥ",
      children: [
        ["rasa", "sap, juice, taste; the essence of a thing"],
        ["śevadhi", "treasure-receptacle, inexhaustible hoard"],
      ],
    },
  },
};
