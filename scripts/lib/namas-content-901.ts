/**
 * Nāmas 901–1000 of the Lalitā Sahasranāma.
 *
 * Word senses are grounded in the Monier-Williams Sanskrit-English Dictionary
 * (1899); the glosses, translations and compound analyses are written fresh
 * for this dataset.
 *
 * Two conventions used throughout this batch:
 *
 *   - Compounds whose final member is a possessive derivative of a real noun
 *     (`-rūpiṇī` from rūpa, `-ātmikā` from ātman) are treated as bahuvrīhi,
 *     since the whole denotes the possessor and not the form possessed.
 *     Compounds whose final member governs the earlier one verbally
 *     (`-dāyinī`, `-karī`, `-sthā`, `-vardhinī`) are tatpuruṣa.
 *   - Names that are single words carrying a taddhita suffix rather than true
 *     compounds (manasvinī, stutimatī, vajriṇī) carry no `compound` block; the
 *     suffix is recorded in `note` instead.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  901: {
    gloss: "Embodied As Primal Sound",
    translation:
      "She takes the form of nāda, the resonance out of which speech and world alike unfold.",
    note: "The possessive force lies in the suffix -in, so nādarūpa is the compound and rūpiṇī the taddhita made on it; the name is also commonly read as a bahuvrīhi, she who has sound for her form.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having sound for her form",
      vigraha: "nādasya rūpam iti nādarūpam, tad asyā astīti nādarūpiṇī",
      children: [
        ["nāda", "sound, resonance, the primal tone"],
        ["rūpiṇī", "having as her form"],
      ],
    },
  },
  902: {
    gloss: "Producer Of Discerning Knowledge",
    translation:
      "She sets discrimination working, rousing the faculty that tells the real from the merely apparent.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the bringing forth of discriminative knowledge",
      vigraha: "vijñānasya kalanā",
      children: [
        ["vijñāna", "discriminating knowledge, discernment"],
        ["kalanā", "the act of causing or bringing about"],
      ],
    },
  },
  903: {
    gloss: "The Whole And Ready One",
    translation:
      "She is sound, unimpaired and always prepared, and the same feminine noun is used for the praise offered to her.",
    note: "Feminine of the adjective kalya 'healthy, ready'; Monier-Williams also records a distinct f. kalyā 'praise, eulogy'.",
  },
  904: {
    gloss: "The Consummately Skilled",
    translation:
      "She is refined and quick-witted, the participle meaning literally 'burnt through' and so ripened to perfection.",
    pos: "adjective",
    note: "Past participle of vi-√dah 'burn up', which developed the transferred sense 'matured, accomplished, shrewd'.",
  },
  905: {
    gloss: "Seated On The Bindu",
    translation:
      "Her throne is the bindu, the dimensionless point at the heart of the Śrīcakra from which every enclosure of the diagram issues.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is the central point",
      vigraha: "baindavam āsanaṃ yasyāḥ sā baindavāsanā",
      children: [
        ["baindava", "belonging to the bindu, the central point"],
        ["āsana", "seat, throne"],
      ],
    },
  },
  906: {
    gloss: "Surpassing The Categories",
    translation:
      "She stands above the tattvas, exceeding every principle by which the cosmos is counted out.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "greater than the principles of reality",
      vigraha: "tattvebhyo'dhikā",
      children: [
        ["tattva", "principle, category of reality"],
        ["adhikā", "exceeding, greater than"],
      ],
    },
  },
  907: {
    gloss: "Made Of The Tattvas",
    translation:
      "Standing above the categories, she is nonetheless woven of them, so that nothing in the graded order of things falls outside her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of the principles of reality",
      vigraha: "tattvānāṃ mayī, tattvasvarūpā",
      children: [
        ["tattva", "principle, category of reality"],
        ["mayī", "consisting of, formed out of"],
      ],
    },
  },
  908: {
    gloss: "Essence Of 'That Thou Art'",
    translation:
      "Her own being is the import of the great Upaniṣadic sentence tat tvam asi, in which the individual self and the absolute are declared to be one.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the import of 'that thou art' for her essential form",
      vigraha: "tattvamarthaḥ svarūpam asyā astīti tattvamarthasvarūpiṇī",
      children: [
        {
          iast: "tattvamartha",
          type: "tatpuruṣa",
          gloss: "the import of the words 'that thou'",
          vigraha: "tattvam iti vākyasyārthaḥ",
          children: [
            {
              iast: "tattvam",
              type: "dvandva",
              gloss: "'that' and 'thou' set side by side",
              vigraha: "tac ca tvaṃ ca",
              children: [
                ["tat", "that, the absolute spoken of at a distance"],
                ["tvam", "thou, the self spoken to"],
              ],
            },
            ["artha", "meaning, import"],
          ],
        },
        ["svarūpiṇī", "having as her own essential form"],
      ],
    },
    note: "The first member is read as the mahāvākya fragment tat tvam, not as tattva 'principle' with an added -m. The final -in supplies the possession, so the compound proper is tattvamarthasvarūpa and svarūpiṇī is derived from it; the name is also read as a bahuvrīhi, she who has the sentence's import for her form.",
  },
  909: {
    gloss: "Lover Of Sāman Chant",
    translation:
      "The measured singing of the Sāmaveda pleases her beyond other music.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the chanting of Sāman hymns is dear",
      vigraha: "sāmagānaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "sāmagāna",
          type: "tatpuruṣa",
          gloss: "the chanting of the Sāman hymns",
          vigraha: "sāmnāṃ gānam",
          children: [
            ["sāman", "a chanted Vedic hymn, the Sāmaveda"],
            ["gāna", "singing, chant"],
          ],
        },
        ["priya", "dear, beloved"],
      ],
    },
  },
  910: {
    gloss: "The Gentle One",
    translation:
      "She is mild and cooling, the adjective derived from soma and carrying at once lunar coolness and an unruffled temper.",
    pos: "adjective",
  },
  911: {
    gloss: "Consort Of Sadāśiva",
    translation:
      "She keeps house with Sadāśiva, and the word chosen for her is the homely one for the mistress of a household.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the householder-wife of Sadāśiva",
      vigraha: "sadāśivasya kuṭumbinī",
      children: [
        {
          iast: "sadāśiva",
          type: "karmadhāraya",
          gloss: "the ever-auspicious one",
          vigraha: "sadā śivaḥ",
          children: [
            ["sadā", "always, perpetually"],
            ["śiva", "auspicious; Śiva"],
          ],
        },
        ["kuṭumbinī", "housewife, mistress of a household"],
      ],
    },
  },
  912: {
    gloss: "Present In Both Paths",
    translation:
      "She is found equally on the right-hand and the left-hand routes of practice, preferring neither.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding on the left-hand and right-hand ways",
      vigraha: "savyāpasavyayor mārgayos tiṣṭhatīti savyāpasavyamārgasthā",
      children: [
        {
          iast: "savyāpasavyamārga",
          type: "karmadhāraya",
          gloss: "the left-hand and right-hand ways",
          vigraha: "savyāpasavyau mārgau",
          children: [
            {
              iast: "savyāpasavya",
              type: "dvandva",
              gloss: "left and right",
              vigraha: "savyaṃ cāpasavyaṃ ca",
              children: [
                ["savya", "left, on the left"],
                ["apasavya", "not on the left, right"],
              ],
            },
            ["mārga", "path, way of practice"],
          ],
        },
        ["sthā", "standing in, abiding in"],
      ],
    },
  },
  913: {
    gloss: "Averter Of Every Calamity",
    translation:
      "She turns aside each misfortune that threatens those who take shelter with her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who wards off all calamities",
      vigraha: "sarvāsām āpadāṃ vinivāriṇī",
      children: [
        {
          iast: "sarvāpad",
          type: "karmadhāraya",
          gloss: "every calamity",
          vigraha: "sarvā cāsāv āpac ca",
          children: [
            ["sarva", "all, every"],
            ["āpad", "misfortune, calamity, distress"],
          ],
        },
        ["vinivāriṇī", "she who holds back, averts"],
      ],
    },
  },
  914: {
    gloss: "Abiding In Herself",
    translation:
      "She rests in her own being and needs no support outside it, the same word serving in ordinary speech for one who is simply well.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "standing in her own self",
      vigraha: "sve ātmani tiṣṭhatīti svasthā",
      children: [
        ["sva", "one's own, the self"],
        ["sthā", "standing, abiding"],
      ],
    },
  },
  915: {
    gloss: "Sweet By Nature",
    translation:
      "Her sweetness is not put on for an occasion but belongs to her constitution.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "sweet through her innate disposition",
      vigraha: "svabhāvena madhurā",
      children: [
        {
          iast: "svabhāva",
          type: "karmadhāraya",
          gloss: "innate nature",
          vigraha: "svo bhāvaḥ",
          children: [
            ["sva", "own, proper to oneself"],
            ["bhāva", "state of being, disposition"],
          ],
        },
        ["madhurā", "sweet, charming, mellifluous"],
      ],
    },
  },
  916: {
    gloss: "The Steadfast And Wise",
    translation:
      "She is unshaken in composure and deep in understanding, the adjective covering both courage and insight.",
    pos: "adjective",
  },
  917: {
    gloss: "Worshipped By The Steadfast",
    translation:
      "It is the composed and the discerning who worship her thoroughly.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "fully worshipped by the resolute",
      vigraha: "dhīraiḥ samarcitā",
      children: [
        ["dhīra", "steadfast, composed, wise"],
        ["samarcitā", "thoroughly worshipped, adored"],
      ],
    },
  },
  918: {
    gloss: "Worshipped With Consciousness As Offering",
    translation:
      "The guest-water poured out for her is awareness itself rather than anything drawn from a well.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped with consciousness as the guest-offering",
      vigraha: "caitanyārghyeṇa samārādhyā",
      children: [
        {
          iast: "caitanyārghya",
          type: "karmadhāraya",
          gloss: "the guest-offering that is consciousness",
          vigraha: "caitanyam evārghyam",
          children: [
            ["caitanya", "consciousness, awareness, spirit"],
            ["arghya", "water offered to an honoured guest"],
          ],
        },
        ["samārādhyā", "to be fully propitiated, worthy of worship"],
      ],
    },
  },
  919: {
    gloss: "Fond Of The Flower Of Consciousness",
    translation:
      "The blossom she cares for is the worshipper's own awareness, laid before her in place of anything picked.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the flower of consciousness is dear",
      vigraha: "caitanyakusumaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "caitanyakusuma",
          type: "karmadhāraya",
          gloss: "the flower that is consciousness",
          vigraha: "caitanyam eva kusumam",
          children: [
            ["caitanya", "consciousness, awareness"],
            ["kusuma", "flower, blossom"],
          ],
        },
        ["priya", "dear, beloved"],
      ],
    },
  },
  920: {
    gloss: "Forever Risen",
    translation:
      "She has risen once and never sets, unlike the sun whose ascent is always followed by decline.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "always arisen",
      vigraha: "sadā uditā",
      children: [
        ["sadā", "always, perpetually"],
        ["uditā", "risen, ascended"],
      ],
    },
  },
  921: {
    gloss: "Ever Content",
    translation:
      "Nothing can add to her satisfaction and nothing can dent it.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "always satisfied",
      vigraha: "sadā tuṣṭā",
      children: [
        ["sadā", "always, perpetually"],
        ["tuṣṭā", "satisfied, contented"],
      ],
    },
  },
  922: {
    gloss: "Rose-Red As The Young Sun",
    translation:
      "Her colour is the pale red of the sun in the moment after it clears the horizon.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "pink like the newly risen sun",
      vigraha: "taruṇāditya iva pāṭalā",
      children: [
        {
          iast: "taruṇāditya",
          type: "karmadhāraya",
          gloss: "the newly risen sun",
          vigraha: "taruṇaś cāsāv ādityaś ca",
          children: [
            ["taruṇa", "young, tender, just risen"],
            ["āditya", "the sun"],
          ],
        },
        ["pāṭalā", "pale red, rose-coloured"],
      ],
    },
  },
  923: {
    gloss: "Worshipped By Both Observances",
    translation:
      "The straightforward right-hand worshippers and those who follow the contrary rite alike reach her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be worshipped by the right-handed and the left-handed",
      vigraha: "dakṣiṇair adakṣiṇaiś cārādhyā",
      children: [
        {
          iast: "dakṣiṇādakṣiṇa",
          type: "dvandva",
          gloss: "the right-hand and the left-hand",
          vigraha: "dakṣiṇaś cādakṣiṇaś ca",
          children: [
            ["dakṣiṇa", "right, southern; straightforward"],
            ["adakṣiṇa", "not right, contrary; left-hand"],
          ],
        },
        ["ārādhyā", "to be propitiated, worthy of worship"],
      ],
    },
  },
  924: {
    gloss: "Faintly Smiling Lotus Face",
    translation:
      "The lotus of her face carries the barest opening of a smile.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose lotus-face wears a slight smile",
      vigraha: "darasmeraṃ mukhāmbujaṃ yasyāḥ sā",
      children: [
        {
          iast: "darasmera",
          type: "karmadhāraya",
          gloss: "slightly smiling",
          vigraha: "daraṃ smerā, īṣat smerā",
          children: [
            ["dara", "a little, slightly"],
            ["smera", "smiling; opened, in blossom"],
          ],
        },
        {
          iast: "mukhāmbuja",
          type: "karmadhāraya",
          gloss: "the lotus that is her face",
          vigraha: "mukham evāmbujam",
          children: [
            ["mukha", "face, countenance"],
            ["ambuja", "lotus, that which is born in water"],
          ],
        },
      ],
    },
  },
  925: {
    gloss: "The Absolute Of The Kaulas",
    translation:
      "To the Kaula practitioner she is the one unaccompanied reality, invoked as Kaulinī and known as the sole absolute.",
    compound: {
      type: "karmadhāraya",
      gloss: "Kaulinī who is the one absolute",
      vigraha: "kaulinī cāsau kevalā ca",
      children: [
        ["kaulinī", "the goddess of the Kaula lineage"],
        ["kevalā", "alone, unmixed, absolute"],
      ],
    },
  },
  926: {
    gloss: "Giver Of Priceless Liberation",
    translation:
      "She hands over the standing of absolute aloneness, a gift on which no price can be set.",
    compound: {
      type: "tatpuruṣa",
      gloss: "bestower of the invaluable state of liberation",
      vigraha: "anarghyaṃ kaivalyapadaṃ dadātīti",
      children: [
        {
          iast: "anarghyakaivalyapada",
          type: "karmadhāraya",
          gloss: "the priceless station of absolute freedom",
          vigraha: "anarghyaṃ ca tat kaivalyapadaṃ ca",
          children: [
            ["anarghya", "priceless, beyond valuation"],
            {
              iast: "kaivalyapada",
              type: "karmadhāraya",
              gloss: "the station that is kaivalya",
              vigraha: "kaivalyam eva padam",
              children: [
                ["kaivalya", "absolute aloneness, liberation"],
                ["pada", "station, standing-place, state"],
              ],
            },
          ],
        },
        ["dāyinī", "she who bestows"],
      ],
    },
  },
  927: {
    gloss: "Delighting In Hymns",
    translation:
      "Songs of praise please her, so that singing to her is itself a means of reaching her.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom hymns of praise are dear",
      vigraha: "stotraṃ priyaṃ yasyāḥ sā",
      children: [
        ["stotra", "a hymn of praise, eulogy"],
        ["priya", "dear, beloved"],
      ],
    },
  },
  928: {
    gloss: "Rich In Praise",
    translation:
      "Praise gathers about her without exhausting her, and she in turn is the power by which praise is uttered.",
    pos: "adjective",
    note: "Possessive suffix -mat on stuti 'praise'; the feminine stutimatī inflects like an ī-stem.",
  },
  929: {
    gloss: "Whose Glory The Vedas Hymn",
    translation:
      "Revealed scripture itself undertakes the celebration of her magnificence.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose might is extolled by the Vedas",
      vigraha: "śrutibhiḥ saṃstutaṃ vaibhavaṃ yasyāḥ sā",
      children: [
        {
          iast: "śrutisaṃstuta",
          type: "tatpuruṣa",
          gloss: "hymned by revealed scripture",
          vigraha: "śrutibhiḥ saṃstutam",
          children: [
            ["śruti", "revealed scripture, the Veda, what is heard"],
            ["saṃstuta", "celebrated together, extolled"],
          ],
        },
        ["vaibhava", "glory, majestic power"],
      ],
    },
  },
  930: {
    gloss: "Of Noble Mind",
    translation:
      "She possesses mind in its full reach, at once intelligent and high in spirit.",
    pos: "adjective",
    note: "Possessive suffix -vin on manas 'mind'.",
  },
  931: {
    gloss: "Full Of Honour",
    translation:
      "Honour is hers by right, and she is quick to guard the dignity of those who belong to her.",
    pos: "adjective",
    note: "Possessive suffix -vat on māna 'honour, self-respect'.",
  },
  932: {
    gloss: "The Great Sovereign",
    translation:
      "She is the great mistress, feminine counterpart of Maheśa.",
    compound: {
      type: "karmadhāraya",
      gloss: "the mistress who is great",
      vigraha: "mahatī cāsāv īśī ca",
      children: [
        ["mahā", "great"],
        ["īśī", "mistress, ruler"],
      ],
    },
  },
  933: {
    gloss: "Auspiciousness Embodied",
    translation:
      "Her very outline is good fortune, so that merely looking at her is already a blessing.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is auspiciousness itself",
      vigraha: "maṅgalā ākṛtir yasyāḥ sā",
      children: [
        ["maṅgala", "auspiciousness, welfare, good fortune"],
        ["ākṛti", "form, shape, appearance"],
      ],
    },
  },
  934: {
    gloss: "Mother Of All",
    translation:
      "Everything that exists counts as her child.",
    stem: "viśvamātṛ",
    declension: "ṛ-stem",
    compound: {
      type: "tatpuruṣa",
      gloss: "mother of the whole universe",
      vigraha: "viśvasya mātā",
      children: [
        ["viśva", "all, entire, the whole universe"],
        ["mātṛ", "mother"],
      ],
    },
    note: "An agent noun in -tṛ; the nominative singular viśvamātā conceals the underlying ṛ-stem.",
  },
  935: {
    gloss: "Sustainer Of The World",
    translation:
      "She holds the moving world in being, nurse and support of what she has borne.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who upholds the moving world",
      vigraha: "jagato dhātrī",
      children: [
        ["jagat", "the moving world, all that lives"],
        ["dhātrī", "female supporter, nurse"],
      ],
    },
  },
  936: {
    gloss: "The Wide-Eyed",
    translation:
      "Her eyes are long and broad, a mark of beauty and of a gaze that takes in everything.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose eyes are wide",
      vigraha: "viśāle akṣiṇī yasyāḥ sā",
      children: [
        ["viśāla", "wide, broad, extensive"],
        ["akṣi", "eye"],
      ],
    },
  },
  937: {
    gloss: "The Dispassionate",
    translation:
      "She is free of clinging, and since rāga also names a colour the epithet hints that she is beyond every tint.",
    pos: "adjective",
    note: "vi- 'away from' prefixed to rāga 'passion, colour', with the possessive suffix -in.",
  },
  938: {
    gloss: "The Bold And Confident",
    translation:
      "She acts without hesitation, mature and assured in whatever she takes up.",
    pos: "adjective",
  },
  939: {
    gloss: "Supremely Generous",
    translation:
      "Her liberality has no ceiling and no condition attached to it.",
    pos: "adjective",
    compound: {
      type: "karmadhāraya",
      gloss: "generous in the highest degree",
      vigraha: "paramā cāsāv udārā ca",
      children: [
        ["parama", "highest, supreme, most excellent"],
        ["udārā", "noble, exalted, generous"],
      ],
    },
  },
  940: {
    gloss: "Of Supreme Delight",
    translation:
      "The joy she is and gives is of the highest order, and āmoda also names a fragrance that spreads of its own accord.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose gladness is supreme",
      vigraha: "para āmodo yasyāḥ sā",
      children: [
        ["para", "supreme, highest, beyond"],
        ["āmoda", "gladness, delight; diffusive fragrance"],
      ],
    },
  },
  941: {
    gloss: "Made Of Mind",
    translation:
      "She is the stuff of thought itself, the sheath of mind having nothing in it that is not her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of mind",
      vigraha: "manaso mayī, manaḥsvarūpā",
      children: [
        ["manas", "mind, the inner organ of perception"],
        ["mayī", "consisting of, formed out of"],
      ],
    },
  },
  942: {
    gloss: "Whose Hair Is The Sky",
    translation:
      "Open space streams from her head as hair, matching the epithet Vyomakeśa borne by Śiva.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose locks are the open sky",
      vigraha: "vyoma keśā yasyāḥ sā",
      children: [
        ["vyoman", "sky, space, ether"],
        ["keśa", "hair of the head"],
      ],
    },
  },
  943: {
    gloss: "Seated In The Celestial Car",
    translation:
      "She travels in the aerial palace, and read as vi-māna the name says besides that she stands outside all measure.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "abiding in the aerial chariot",
      vigraha: "vimāne tiṣṭhatīti vimānasthā",
      children: [
        ["vimāna", "aerial car, celestial palace"],
        ["sthā", "standing in, seated in"],
      ],
    },
  },
  944: {
    gloss: "Wielder Of The Thunderbolt",
    translation:
      "She carries the vajra, the adamantine weapon that cuts what nothing else will cut.",
    pos: "adjective",
    note: "Possessive suffix -in on vajra 'thunderbolt', feminine vajriṇī.",
  },
  945: {
    gloss: "Mistress Of The Left-Hand Path",
    translation:
      "She presides over the left-hand observance and lends her name to the Vāmakeśvara Tantra.",
    compound: {
      type: "tatpuruṣa",
      gloss: "sovereign lady of the left-hand way",
      vigraha: "vāmakasyeśvarī",
      children: [
        ["vāmaka", "left, belonging to the left"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
    note: "Segmented vāmaka + īśvarī, the only split the sandhi allows; the compound is also simply the feminine of Vāmakeśvara, the tantra named after her.",
  },
  946: {
    gloss: "Fond Of The Five Sacrifices",
    translation:
      "The five daily offerings laid on a householder are dear to her.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the five sacrifices are dear",
      vigraha: "pañca yajñāḥ priyā yasyāḥ sā",
      children: [
        {
          iast: "pañcayajña",
          type: "dvigu",
          gloss: "the set of five sacrifices",
          vigraha: "pañcānāṃ yajñānāṃ samāhāraḥ",
          children: [
            ["pañcan", "five"],
            ["yajña", "sacrifice, offering, act of worship"],
          ],
        },
        ["priya", "dear, beloved"],
      ],
    },
  },
  947: {
    gloss: "Reclining On The Corpse Couch",
    translation:
      "Her couch is carried by five gods lying inert as corpses, and she alone upon it remains awake.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who lies upon the couch of the five corpses",
      vigraha: "pañcapretamañce'dhiśete iti",
      children: [
        {
          iast: "pañcapretamañca",
          type: "tatpuruṣa",
          gloss: "the couch formed of the five corpses",
          vigraha: "pañcapretānāṃ mañcaḥ",
          children: [
            {
              iast: "pañcapreta",
              type: "dvigu",
              gloss: "the five corpses",
              vigraha: "pañcānāṃ pretānāṃ samāhāraḥ",
              children: [
                ["pañcan", "five"],
                ["preta", "a departed one, corpse"],
              ],
            },
            ["mañca", "couch, raised platform, dais"],
          ],
        },
        ["adhiśāyinī", "she who lies upon"],
      ],
    },
  },
  948: {
    gloss: "The Fifth",
    translation:
      "She is the fifth, following the four who precede her in the ordering of her powers.",
    pos: "adjective",
    note: "Feminine of the ordinal pañcama, formed from pañcan 'five'.",
  },
  949: {
    gloss: "Ruler Of The Five Elements",
    translation:
      "Earth, water, fire, air and space are all under her hand.",
    compound: {
      type: "tatpuruṣa",
      gloss: "mistress of the five gross elements",
      vigraha: "pañcānāṃ bhūtānām īśī",
      children: [
        {
          iast: "pañcabhūta",
          type: "dvigu",
          gloss: "the set of five elements",
          vigraha: "pañcānāṃ bhūtānāṃ samāhāraḥ",
          children: [
            ["pañcan", "five"],
            ["bhūta", "element, that which has come to be"],
          ],
        },
        ["īśī", "mistress, ruler"],
      ],
    },
  },
  950: {
    gloss: "Served With Fivefold Offering",
    translation:
      "The rite she accepts uses five articles of attendance, the short form of the far longer sequence of services.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "attended with services five in number",
      vigraha: "pañcasaṅkhyair upacārair upacaryate iti",
      children: [
        {
          iast: "pañcasaṅkhyā",
          type: "bahuvrīhi",
          gloss: "amounting to five",
          vigraha: "pañca saṅkhyā yeṣāṃ te",
          children: [
            ["pañcan", "five"],
            ["saṅkhyā", "number, reckoning, total"],
          ],
        },
        ["upacāriṇī", "attended with acts of ritual service"],
      ],
    },
  },
  951: {
    gloss: "The Everlasting",
    translation:
      "She continues without break, the adjective built on śaśvat, 'again and again'.",
    pos: "adjective",
    note: "Feminine of śāśvata, a vṛddhi derivative of the indeclinable śaśvat 'repeatedly, perpetually'.",
  },
  952: {
    gloss: "Whose Sovereignty Is Eternal",
    translation:
      "Her dominion was never conferred on her and so can never lapse.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose lordship is unending",
      vigraha: "śāśvatam aiśvaryaṃ yasyāḥ sā",
      children: [
        ["śāśvata", "perpetual, everlasting"],
        ["aiśvarya", "lordship, sovereign power"],
      ],
    },
  },
  953: {
    gloss: "Giver Of Bliss",
    translation:
      "She hands out śarman, a word that means both shelter and the happiness of being sheltered.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows refuge and happiness",
      vigraha: "śarma dadātīti śarmadā",
      children: [
        ["śarman", "shelter, refuge; bliss, comfort"],
        ["da", "giving, bestowing"],
      ],
    },
  },
  954: {
    gloss: "Enchantress Of Śambhu",
    translation:
      "She casts her spell over Śiva himself, so that the source of all detachment is drawn towards her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bewitches Śambhu",
      vigraha: "śambhuṃ mohayatīti",
      children: [
        ["śambhu", "the benevolent one, Śambhu, Śiva"],
        ["mohinī", "she who bewilders, enchants"],
      ],
    },
  },
  955: {
    gloss: "The Bearing Earth",
    translation:
      "She is the earth, that which carries; the name is a feminine agent noun from the root meaning to hold.",
    note: "Formed from √dhṛ 'bear, hold'; Monier-Williams glosses dharā as 'bearer, supporter', hence the earth.",
  },
  956: {
    gloss: "Daughter Of The Mountain",
    translation:
      "She is born to the mountain, dhara naming that which holds firm and so the Himālaya.",
    compound: {
      type: "tatpuruṣa",
      gloss: "daughter of the upholder, the mountain",
      vigraha: "dharasya sutā",
      children: [
        ["dhara", "bearer, that which upholds; a mountain"],
        ["sutā", "daughter"],
      ],
    },
  },
  957: {
    gloss: "The Blessed And Enriching",
    translation:
      "She is fortunate herself and makes fortunate those who come near, the adjective built on dhana, wealth.",
    pos: "adjective",
  },
  958: {
    gloss: "Upholder Of Dharma",
    translation:
      "She keeps to the law and bears within herself every defining property that anything can have.",
    pos: "adjective",
    note: "Possessive suffix -in on dharma; Monier-Williams gives dharmin both as 'faithful to duty' and as 'bearer of a characteristic property'.",
  },
  959: {
    gloss: "Increaser Of Dharma",
    translation:
      "Where she is honoured, right order grows of itself.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who makes right order flourish",
      vigraha: "dharmaṃ vardhayatīti",
      children: [
        ["dharma", "law, right order, duty"],
        ["vardhinī", "she who causes to increase"],
      ],
    },
  },
  960: {
    gloss: "Beyond The Worlds",
    translation:
      "She has passed out past every world that can be reached or even imagined.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having gone beyond the worlds",
      vigraha: "lokān atītā",
      children: [
        ["loka", "world, sphere of existence"],
        ["atītā", "gone beyond, transcending"],
      ],
    },
  },
  961: {
    gloss: "Beyond The Three Strands",
    translation:
      "Sattva, rajas and tamas do not reach her, though all of nature is spun out of them.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having transcended the constituent qualities",
      vigraha: "guṇān atītā",
      children: [
        ["guṇa", "strand, constituent quality of nature"],
        ["atītā", "gone beyond, transcending"],
      ],
    },
  },
  962: {
    gloss: "Beyond Everything",
    translation:
      "Whatever can be named has already been left behind by her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having gone beyond all things",
      vigraha: "sarvam atītā",
      children: [
        ["sarva", "all, everything"],
        ["atītā", "gone beyond, transcending"],
      ],
    },
  },
  963: {
    gloss: "Whose Nature Is Stillness",
    translation:
      "Her very self is quiet, the settled calm that arrives when the mind stops reaching outward.",
    note: "Analysed as a secondary formation on śamātman, the having being expressed by the suffix rather than by the compound; the name is also read as a bahuvrīhi, she whose self is tranquillity.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "consisting of tranquillity",
      vigraha: "śamasyātmikā, śamasvarūpā",
      children: [
        ["śama", "tranquillity, cessation of striving"],
        ["ātmikā", "having the nature of"],
      ],
    },
  },
  964: {
    gloss: "Bright As The Bandhūka Blossom",
    translation:
      "Her colour answers to the scarlet flower of the bandhūka, which opens red at midday.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose look is that of the bandhūka flower",
      vigraha: "bandhūkakusumasyeva prakhyā yasyāḥ sā",
      children: [
        {
          iast: "bandhūkakusuma",
          type: "tatpuruṣa",
          gloss: "the blossom of the bandhūka tree",
          vigraha: "bandhūkasya kusumam",
          children: [
            ["bandhūka", "the bandhūka tree, Pentapetes phoenicea"],
            ["kusuma", "flower, blossom"],
          ],
        },
        ["prakhyā", "appearance, look, resemblance"],
      ],
    },
  },
  965: {
    gloss: "The Young Girl",
    translation:
      "She appears as a girl not yet grown, and Bālā is likewise the name of one of her principal mantras.",
  },
  966: {
    gloss: "Delighting In Play",
    translation:
      "Creation costs her no effort; she keeps it going as an amusement.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who diverts herself in play",
      vigraha: "līlayā vinodinī",
      children: [
        ["līlā", "play, sport, effortless grace"],
        ["vinodinī", "she who takes diversion, delights"],
      ],
    },
  },
  967: {
    gloss: "The Wholly Auspicious",
    translation:
      "Every good sign belongs to her, and the word is also the ordinary one for a woman whose husband is living.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose auspiciousness is perfect",
      vigraha: "śobhanaṃ maṅgalaṃ yasyāḥ sā",
      children: [
        ["su", "good, excellent, well"],
        ["maṅgala", "auspiciousness, welfare, good fortune"],
      ],
    },
  },
  968: {
    gloss: "Maker Of Happiness",
    translation:
      "She produces ease and well-being in whoever turns towards her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who brings about happiness",
      vigraha: "sukhaṃ karotīti sukhakarī",
      children: [
        ["sukha", "happiness, ease, comfort"],
        ["karī", "making, producing"],
      ],
    },
  },
  969: {
    gloss: "Richly And Beautifully Robed",
    translation:
      "She is abundantly furnished with fine dress and ornament.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "opulent in beautiful attire",
      vigraha: "suveṣeṇāḍhyā",
      children: [
        {
          iast: "suveṣa",
          type: "karmadhāraya",
          gloss: "beautiful attire",
          vigraha: "śobhano veṣaḥ",
          children: [
            ["su", "good, fine, beautiful"],
            ["veṣa", "dress, apparel, adornment"],
          ],
        },
        ["āḍhyā", "rich in, abundantly supplied with"],
      ],
    },
  },
  970: {
    gloss: "The Auspicious Wife",
    translation:
      "She is the suvāsinī, the honoured woman of the house whom the rite treats as the goddess herself present.",
    compound: {
      type: "karmadhāraya",
      gloss: "she who dwells auspiciously",
      vigraha: "suṣṭhu vasatīti suvāsinī",
      children: [
        ["su", "well, auspiciously"],
        ["vāsinī", "she who dwells, resides"],
      ],
    },
    note: "Monier-Williams defines suvāsinī as a woman residing in her father's house, and as a courtesy term for a woman whose husband is alive.",
  },
  971: {
    gloss: "Pleased By Honouring Suvāsinīs",
    translation:
      "Worship offered to living suvāsinīs reaches her and gives her pleasure.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "gratified by the worship of auspicious wives",
      vigraha: "suvāsinyarcanena prītā",
      children: [
        {
          iast: "suvāsinyarcana",
          type: "tatpuruṣa",
          gloss: "the worship offered to suvāsinīs",
          vigraha: "suvāsinīnām arcanam",
          children: [
            {
              iast: "suvāsinī",
              type: "karmadhāraya",
              gloss: "the auspicious married woman",
              vigraha: "suṣṭhu vasatīti suvāsinī",
              children: [
                ["su", "well, auspiciously"],
                ["vāsinī", "she who dwells, resides"],
              ],
            },
            ["arcana", "worship, homage paid"],
          ],
        },
        ["prītā", "pleased, gratified"],
      ],
    },
  },
  972: {
    gloss: "Beautiful Throughout",
    translation:
      "There is no part of her that is not lovely, the prefix carrying the beauty out to every edge.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "splendid on every side",
      vigraha: "ā samantāc chobhanā",
      children: [
        ["ā", "thoroughly, on every side"],
        ["śobhanā", "beautiful, splendid, brilliant"],
      ],
    },
    note: "A prādi compound: the preverb ā- prefixed directly to the adjective śobhanā.",
  },
  973: {
    gloss: "Of Spotless Mind",
    translation:
      "Nothing turbid sits in her mind, and she clears the minds of those who fix on her.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose mind is pure",
      vigraha: "śuddhaṃ mānasaṃ yasyāḥ sā",
      children: [
        ["śuddha", "clean, clear, pure, unmixed"],
        ["mānasa", "mind, the mental faculty"],
      ],
    },
  },
  974: {
    gloss: "Gladdened By Bindu Libation",
    translation:
      "The libation poured at the central point of the Śrīcakra leaves her entirely satisfied.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "well pleased by the offering made at the bindu",
      vigraha: "bindutarpaṇena santuṣṭā",
      children: [
        {
          iast: "bindutarpaṇa",
          type: "tatpuruṣa",
          gloss: "the libation offered at the bindu",
          vigraha: "bindau tarpaṇam",
          children: [
            ["bindu", "point, drop; the centre of the Śrīcakra"],
            ["tarpaṇa", "a satiating libation, refreshing offering"],
          ],
        },
        ["santuṣṭā", "fully contented, well pleased"],
      ],
    },
  },
  975: {
    gloss: "Born Before All",
    translation:
      "She precedes everything that has come into being and therefore has no elder.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "arisen earlier than all else",
      vigraha: "pūrvaṃ jātā",
      children: [
        ["pūrva", "prior, earlier, foregoing"],
        ["ja", "born, arisen, produced"],
      ],
    },
  },
  976: {
    gloss: "Mother Tripurā",
    translation:
      "She is Tripurā, who presides over the threefold city, and she is mother to whoever calls on her.",
    compound: {
      type: "karmadhāraya",
      gloss: "Tripurā who is the mother",
      vigraha: "tripurā cāsāv ambikā ca",
      children: [
        {
          iast: "tripurā",
          type: "dvigu",
          gloss: "the triple city",
          vigraha: "trayāṇāṃ purāṇāṃ samāhāraḥ",
          children: [
            ["tri", "three"],
            ["pura", "city, fortress, stronghold"],
          ],
        },
        ["ambikā", "mother, good woman"],
      ],
    },
  },
  977: {
    gloss: "Worshipped With Ten Seals",
    translation:
      "The ten mudrās shown with the hands bring her worship to completion.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "to be fully worshipped by means of the ten mudrās",
      vigraha: "daśabhir mudrābhiḥ samārādhyā",
      children: [
        {
          iast: "daśamudrā",
          type: "dvigu",
          gloss: "the set of ten seals",
          vigraha: "daśānāṃ mudrāṇāṃ samāhāraḥ",
          children: [
            ["daśan", "ten"],
            ["mudrā", "seal, ritual gesture of the hands"],
          ],
        },
        ["samārādhyā", "to be fully propitiated, worthy of worship"],
      ],
    },
  },
  978: {
    gloss: "Wielding Tripurā's Splendour",
    translation:
      "She brings the sovereign splendour of Tripurā under her control, and confers that same mastery on those who worship her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who subjugates by the majesty of Tripurā",
      vigraha: "tripurāśriyaṃ vaśaṃ karotīti",
      children: [
        {
          iast: "tripurāśrī",
          type: "tatpuruṣa",
          gloss: "the splendour of Tripurā",
          vigraha: "tripurāyāḥ śrīḥ",
          children: [
            {
              iast: "tripurā",
              type: "dvigu",
              gloss: "the triple city",
              vigraha: "trayāṇāṃ purāṇāṃ samāhāraḥ",
              children: [
                ["tri", "three"],
                ["pura", "city, fortress, stronghold"],
              ],
            },
            ["śrī", "splendour, majesty, prosperity"],
          ],
        },
        {
          iast: "vaśaṅkarī",
          type: "tatpuruṣa",
          gloss: "she who brings under subjection",
          vigraha: "vaśaṃ karotīti vaśaṅkarī",
          children: [
            ["vaśam", "into submission, under control"],
            ["karī", "making, bringing about"],
          ],
        },
      ],
    },
    note: "The first member keeps its accusative -am before karī, an upapada formation of the type vaśaṃkara.",
  },
  979: {
    gloss: "The Seal Of Knowledge",
    translation:
      "She is the jñānamudrā, the gesture in which the hand alone says what is understood.",
    compound: {
      type: "karmadhāraya",
      gloss: "the seal which is knowledge itself",
      vigraha: "jñānam eva mudrā",
      children: [
        ["jñāna", "knowledge, the higher knowing"],
        ["mudrā", "seal, ritual gesture of the hands"],
      ],
    },
  },
  980: {
    gloss: "Reached Through Knowledge",
    translation:
      "No approach except knowing arrives at her.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "attainable by means of knowledge",
      vigraha: "jñānena gamyā",
      children: [
        ["jñāna", "knowledge, the higher knowing"],
        ["gamyā", "to be reached, approachable, attainable"],
      ],
    },
  },
  981: {
    gloss: "Both Knowing And Known",
    translation:
      "She is at once the act of knowledge and the thing it knows, so that in her the two never stand apart.",
    note: "Since -in carries the having, jñānajñeyasvarūpa is the compound and svarūpiṇī a taddhita on it; the bahuvrīhi reading, she who has knowledge and its object for her form, is equally defensible.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having knowledge and its object for her own form",
      vigraha: "jñānajñeyaṃ svarūpam asyā astīti jñānajñeyasvarūpiṇī",
      children: [
        {
          iast: "jñānajñeya",
          type: "dvandva",
          gloss: "knowledge and its object",
          vigraha: "jñānaṃ ca jñeyaṃ ca",
          children: [
            ["jñāna", "knowledge, the act of knowing"],
            ["jñeya", "that which is to be known"],
          ],
        },
        ["svarūpiṇī", "having as her own essential form"],
      ],
    },
  },
  982: {
    gloss: "The Yoni Seal",
    translation:
      "She is the yonimudrā, the gesture that shapes with the fingers the source from which everything issues.",
    compound: {
      type: "karmadhāraya",
      gloss: "the seal that takes the shape of the yoni",
      vigraha: "yonir eva mudrā",
      children: [
        ["yoni", "womb, source, place of origin"],
        ["mudrā", "seal, ritual gesture of the hands"],
      ],
    },
  },
  983: {
    gloss: "Mistress Of The Threefold Seal",
    translation:
      "She commands the trikhaṇḍā, the seal in three sections with which the worship is closed.",
    compound: {
      type: "tatpuruṣa",
      gloss: "sovereign of the seal made of three parts",
      vigraha: "trikhaṇḍāyā īśī",
      children: [
        {
          iast: "trikhaṇḍa",
          type: "dvigu",
          gloss: "the set of three sections",
          vigraha: "trayāṇāṃ khaṇḍānāṃ samāhāraḥ",
          children: [
            ["tri", "three"],
            ["khaṇḍa", "part, section, division"],
          ],
        },
        ["īśī", "mistress, ruler"],
      ],
    },
  },
  984: {
    gloss: "Holder Of The Three Strands",
    translation:
      "Sattva, rajas and tamas are hers to hold, although a few names earlier she was declared free of them.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who possesses the three constituent qualities",
      vigraha: "trayo guṇā yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["guṇa", "strand, constituent quality of nature"],
      ],
    },
  },
  985: {
    gloss: "Mother",
    translation:
      "She is simply Mother, the oldest and plainest term of address a worshipper has.",
  },
  986: {
    gloss: "Dwelling In The Triangle",
    translation:
      "She occupies the innermost triangle of the Śrīcakra, the enclosure immediately around the point.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who resides in the triangle",
      vigraha: "trikoṇe gacchati tiṣṭhati vā",
      children: [
        {
          iast: "trikoṇa",
          type: "bahuvrīhi",
          gloss: "that which has three corners, a triangle",
          vigraha: "trīṇi koṇāni yasya tat",
          children: [
            ["tri", "three"],
            ["koṇa", "corner, angle"],
          ],
        },
        ["ga", "going in, abiding in"],
      ],
    },
  },
  987: {
    gloss: "The Sinless",
    translation:
      "No fault attaches to her, and none is left in those she takes up.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she in whom there is no evil",
      vigraha: "na vidyate aghaṃ yasyāḥ sā",
      children: [
        ["an", "not, absence of"],
        ["agha", "sin, evil, mishap"],
      ],
    },
  },
  988: {
    gloss: "Of Wondrous Deeds",
    translation:
      "The record of what she has done exceeds anything ordinary causes could produce.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose conduct is marvellous",
      vigraha: "adbhutaṃ cāritraṃ yasyāḥ sā",
      children: [
        ["adbhuta", "marvellous, extraordinary, supernatural"],
        ["cāritra", "conduct, course of action, way of proceeding"],
      ],
    },
  },
  989: {
    gloss: "Bestower Of Desired Ends",
    translation:
      "What is genuinely wanted she supplies.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who grants the objects desired",
      vigraha: "vāñchitān arthān pradadātīti",
      children: [
        {
          iast: "vāñchitārtha",
          type: "karmadhāraya",
          gloss: "the object that is desired",
          vigraha: "vāñchitaś cāsāv arthaś ca",
          children: [
            ["vāñchita", "wished for, desired, longed for"],
            ["artha", "object, aim, thing sought"],
          ],
        },
        ["pradāyinī", "she who bestows, grants"],
      ],
    },
  },
  990: {
    gloss: "Known Through Sustained Practice",
    translation:
      "She becomes known only where practice has been carried well past the ordinary measure.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "known by an excess of repeated practice",
      vigraha: "abhyāsātiśayena jñātā",
      children: [
        {
          iast: "abhyāsātiśaya",
          type: "tatpuruṣa",
          gloss: "a surpassing degree of practice",
          vigraha: "abhyāsasyātiśayaḥ",
          children: [
            ["abhyāsa", "repeated practice, application, exercise"],
            ["atiśaya", "pre-eminence, surpassing degree"],
          ],
        },
        ["jñātā", "known, ascertained, understood"],
      ],
    },
  },
  991: {
    gloss: "Whose Form Transcends Six Paths",
    translation:
      "The six courses by which words and worlds are mapped out all lie behind the form she wears.",
    note: "Taken as rūpin, the possessive derivative of ṣaḍadhvātītarūpa, rather than as a bahuvrīhi, she whose form has gone past the six paths; the suffix is what supplies the having.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having a form that lies beyond the six paths",
      vigraha: "ṣaḍadhvātītaṃ rūpam asyā astīti ṣaḍadhvātītarūpiṇī",
      children: [
        {
          iast: "ṣaḍadhvātīta",
          type: "tatpuruṣa",
          gloss: "gone beyond the six paths",
          vigraha: "ṣaḍ adhvano'tītam",
          children: [
            {
              iast: "ṣaḍadhva",
              type: "dvigu",
              gloss: "the set of six paths",
              vigraha: "ṣaṇṇām adhvanāṃ samāhāraḥ",
              children: [
                ["ṣaṭ", "six"],
                ["adhvan", "road, path, course"],
              ],
            },
            ["atīta", "gone beyond, transcending"],
          ],
        },
        ["rūpiṇī", "having as her form"],
      ],
    },
  },
  992: {
    gloss: "Embodiment Of Guileless Mercy",
    translation:
      "She is compassion given a body, and that compassion asks for nothing and pretends nothing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the bodily form of unfeigned compassion",
      vigraha: "avyājakaruṇāyā mūrtiḥ",
      children: [
        {
          iast: "avyājakaruṇā",
          type: "karmadhāraya",
          gloss: "compassion without pretext",
          vigraha: "avyājā cāsau karuṇā ca",
          children: [
            {
              iast: "avyāja",
              type: "bahuvrīhi",
              gloss: "having no ulterior motive",
              vigraha: "na vidyate vyājo yasyāṃ sā",
              children: [
                ["a", "not, without"],
                ["vyāja", "deceit, pretext, disguise"],
              ],
            },
            ["karuṇā", "compassion, pity"],
          ],
        },
        ["mūrti", "embodiment, material form, incarnation"],
      ],
    },
  },
  993: {
    gloss: "Lamp In The Dark Of Ignorance",
    translation:
      "She is the small steady light by which the dark of not-knowing is put out.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the lamp for the darkness that is ignorance",
      vigraha: "ajñānadhvāntasya dīpikā",
      children: [
        {
          iast: "ajñānadhvānta",
          type: "karmadhāraya",
          gloss: "the darkness that is ignorance",
          vigraha: "ajñānam eva dhvāntam",
          children: [
            {
              iast: "ajñāna",
              type: "tatpuruṣa",
              gloss: "absence of knowledge",
              vigraha: "na jñānam ajñānam",
              children: [
                ["a", "not, absence of"],
                ["jñāna", "knowledge"],
              ],
            },
            ["dhvānta", "darkness, gloom"],
          ],
        },
        ["dīpikā", "a lamp, that which illumines"],
      ],
    },
  },
  994: {
    gloss: "Known To Child And Cowherd",
    translation:
      "Her fame reaches everyone, from small children to herdsmen, and asks no learning of those who receive it.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "known to all alike, children and cowherds included",
      vigraha: "ābālagopaṃ viditā",
      children: [
        {
          iast: "ābālagopa",
          type: "avyayībhāva",
          gloss: "reaching as far as children and cowherds",
          vigraha: "ā bālebhyo gopebhyaś ca",
          children: [
            ["ā", "as far as, up to and including"],
            {
              iast: "bālagopa",
              type: "dvandva",
              gloss: "children and cowherds",
              vigraha: "bālāś ca gopāś ca",
              children: [
                ["bāla", "child, young one"],
                ["gopa", "cowherd, herdsman"],
              ],
            },
          ],
        },
        ["viditā", "known, recognized, understood"],
      ],
    },
  },
  995: {
    gloss: "Whose Command None Transgresses",
    translation:
      "Her order stands over everyone, and nobody has the standing to step across it.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose rule no one can overstep",
      vigraha: "sarvair anullaṅghyaṃ śāsanaṃ yasyāḥ sā",
      children: [
        {
          iast: "sarvānullaṅghya",
          type: "tatpuruṣa",
          gloss: "not to be transgressed by anyone",
          vigraha: "sarvair anullaṅghyam",
          children: [
            ["sarva", "all, everyone"],
            {
              iast: "anullaṅghya",
              type: "tatpuruṣa",
              gloss: "not to be leapt over",
              vigraha: "na ullaṅghyam",
              children: [
                ["an", "not"],
                ["ullaṅghya", "to be leapt over, to be transgressed"],
              ],
            },
          ],
        },
        ["śāsana", "command, edict, rule, government"],
      ],
    },
  },
  996: {
    gloss: "Dwelling In The Sovereign Śrīcakra",
    translation:
      "The Śrīcakra, first among all diagrams, is the house she lives in.",
    pos: "adjective",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose abode is the royal Śrīcakra",
      vigraha: "śrīcakrarājo nilayo yasyāḥ sā",
      children: [
        {
          iast: "śrīcakrarāja",
          type: "karmadhāraya",
          gloss: "the Śrīcakra, king among diagrams",
          vigraha: "śrīcakram eva rājā",
          children: [
            {
              iast: "śrīcakra",
              type: "karmadhāraya",
              gloss: "the wheel of splendour",
              vigraha: "śrīmac cakram",
              children: [
                ["śrī", "splendour, majesty, auspicious beauty"],
                ["cakra", "wheel, circle, mystical diagram"],
              ],
            },
            ["rāja", "king, chief, the foremost"],
          ],
        },
        ["nilaya", "abode, dwelling, resting-place"],
      ],
    },
  },
  997: {
    gloss: "The Glorious Tripurasundarī",
    translation:
      "She is the beautiful one of the three cities, and the honorific śrīmat marks this as the name under which the whole tradition knows her.",
    compound: {
      type: "karmadhāraya",
      gloss: "the illustrious beauty of the triple city",
      vigraha: "śrīmatī cāsau tripurasundarī ca",
      children: [
        ["śrīmat", "illustrious, glorious, august"],
        {
          iast: "tripurasundarī",
          type: "tatpuruṣa",
          gloss: "the beautiful one of the three cities",
          vigraha: "tripurāṇāṃ sundarī",
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
            ["sundarī", "a beautiful woman"],
          ],
        },
      ],
    },
  },
  998: {
    gloss: "The Blessed Śivā",
    translation:
      "She is Śrī and Śivā at once, radiant prosperity and quiet beatitude held in one name, the feminine of auspiciousness itself.",
    compound: {
      type: "karmadhāraya",
      gloss: "she who is Śrī and equally Śivā",
      vigraha: "śrīś cāsau śivā ca",
      children: [
        ["śrī", "radiance, prosperity, majesty; the goddess Śrī"],
        ["śivā", "the auspicious one, the feminine of Śiva"],
      ],
    },
  },
  999: {
    gloss: "Form Of Śiva-Śakti Union",
    translation:
      "Her form is the single fact of Śiva and Śakti being one, and the stotra ends by saying not that she is a partner in that union but that she is the union.",
    note: "The last of the -rūpiṇī names is analysed like the rest: -in supplies the possession, so śivaśaktyaikyarūpa is the compound and rūpiṇī is formed on it. The bahuvrīhi sense, she who has the union of Śiva and Śakti for her form, is the familiar alternative.",
    pos: "adjective",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the oneness of Śiva and Śakti for her form",
      vigraha: "śivaśaktyaikyaṃ rūpam asyā astīti śivaśaktyaikyarūpiṇī",
      children: [
        {
          iast: "śivaśaktyaikya",
          type: "tatpuruṣa",
          gloss: "the oneness of Śiva and Śakti",
          vigraha: "śivaśaktyor aikyam",
          children: [
            {
              iast: "śivaśakti",
              type: "dvandva",
              gloss: "Śiva and Śakti",
              vigraha: "śivaś ca śaktiś ca",
              children: [
                ["śiva", "Śiva, the auspicious, the quiescent ground"],
                ["śakti", "Śakti, power, the active energy"],
              ],
            },
            ["aikya", "oneness, identity, union"],
          ],
        },
        ["rūpiṇī", "having as her very form"],
      ],
    },
  },
  1000: {
    gloss: "Mother Lalitā",
    translation:
      "The last of the thousand gathers all the rest into a single address: Lalitā, the one at play, who is Mother.",
    compound: {
      type: "karmadhāraya",
      gloss: "Lalitā who is the mother",
      vigraha: "lalitā cāsāv ambikā ca",
      children: [
        ["lalitā", "Lalitā, the graceful one, she who is at play"],
        ["ambikā", "mother, good woman"],
      ],
    },
  },
};
