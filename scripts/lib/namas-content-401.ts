/**
 * Nāmas 401–500.
 *
 * The run opens with the closing names of the Śiva sequence and the Vedāntic
 * names (tat, tvam, ayī), passes through the Kaula vocabulary, and ends inside
 * the cakra series: viśuddhi with Ḍākinī, anāhata with Rākiṇī, and the opening
 * names of maṇipūra with Lākinī.
 *
 * Word meanings are grounded in Monier-Williams (1899); the wording of every
 * gloss, translation and vigraha here is original.
 */

import type { Batch } from "./namas-types";

export const batch: Batch = {
  401: {
    gloss: "Of Manifold Forms",
    translation: "She takes shape in ways beyond counting, so that no single figure can be called hers alone.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose forms are of many kinds",
      vigraha: "vividhā ākārā yasyāḥ sā",
      children: [
        ["vividha", "of many sorts, manifold"],
        ["ākāra", "form, shape, outward figure"],
      ],
    },
  },
  402: {
    gloss: "Embodying Knowledge And Ignorance",
    translation: "The wisdom that frees and the ignorance that binds are equally her own essential nature.",
    note: "The possession is carried by the suffix -in, so vidyāvidyāsvarūpa is the compound and svarūpiṇī a taddhita formed on it. The name is also read as a bahuvrīhi, she who has knowledge and ignorance for her form.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the essential nature of knowledge and of ignorance",
      vigraha: "vidyā cāvidyā ca vidyāvidye, tayoḥ svarūpiṇī",
      children: [
        {
          iast: "vidyāvidyā",
          type: "dvandva",
          gloss: "Knowledge And Ignorance",
          vigraha: "vidyā cāvidyā ca",
          children: [
            ["vidyā", "knowledge, sacred learning"],
            ["avidyā", "ignorance, the veiling of what is real"],
          ],
        },
        ["svarūpiṇī", "she who has the essential form of"],
      ],
    },
  },
  403: {
    gloss: "Moonlight Gladdening Mahākāmeśa's Lotus Eyes",
    translation: "She falls upon the eyes of the great lord of desire as moonlight falls on night-lotuses, opening them in delight.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the moonlight that gladdens the night-lotuses that are Mahākāmeśa's eyes",
      vigraha: "mahākāmeśasya nayanakumudānām āhlādakarī kaumudī",
      children: [
        {
          iast: "mahākāmeśanayanakumuda",
          type: "tatpuruṣa",
          gloss: "Night-Lotuses That Are Mahākāmeśa's Eyes",
          vigraha: "mahākāmeśasya nayanāny eva kumudāni",
          children: [
            {
              iast: "mahākāmeśa",
              type: "karmadhāraya",
              gloss: "The Great Lord Of Desire",
              vigraha: "mahāṃś cāsau kāmeśaś ca",
              children: [
                ["mahā", "great"],
                {
                  iast: "kāmeśa",
                  type: "tatpuruṣa",
                  gloss: "Lord Of Desire",
                  vigraha: "kāmasya īśaḥ",
                  children: [
                    ["kāma", "desire, love"],
                    ["īśa", "lord, one who is master"],
                  ],
                },
              ],
            },
            ["nayana", "eye"],
            ["kumuda", "the white night-lotus, which opens to the moon"],
          ],
        },
        {
          iast: "āhlādakaumudī",
          type: "tatpuruṣa",
          gloss: "Gladdening Moonlight",
          vigraha: "āhlādasya kaumudī",
          children: [
            ["āhlāda", "refreshment, gladdening"],
            ["kaumudī", "moonlight"],
          ],
        },
      ],
    },
  },
  404: {
    gloss: "Sunbeams Dispelling Devotees' Inward Darkness",
    translation: "The darkness lodged in a devotee's heart breaks apart before her, as night gives way to an unbroken stream of sunbeams.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the stream of the sun's rays that shatters the darkness within the hearts of devotees",
      vigraha: "bhaktānām āhārdasya tamaso bhedakā bhānumato bhānusantatiḥ",
      children: [
        {
          iast: "bhaktāhārdatamas",
          type: "tatpuruṣa",
          gloss: "Darkness Seated In Devotees' Hearts",
          vigraha: "bhaktānāṃ hṛdi sthitaṃ tamaḥ",
          children: [
            ["bhakta", "devotee, one who is devoted"],
            ["āhārda", "belonging to the heart, lodged within"],
            ["tamas", "darkness, gloom"],
          ],
        },
        ["bheda", "splitting apart, breaking open"],
        {
          iast: "bhānumadbhānusantati",
          type: "tatpuruṣa",
          gloss: "Unbroken Stream Of The Sun's Rays",
          vigraha: "bhānumato bhānūnāṃ santatiḥ",
          children: [
            ["bhānumat", "the radiant one, the sun"],
            ["bhānu", "ray of light"],
            ["santati", "continuous flow, unbroken series"],
          ],
        },
      ],
    },
  },
  405: {
    gloss: "She Whose Envoy Is Śiva",
    translation: "She is the one who sent Śiva himself on her errand, taking the supreme god as her ambassador.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she of whom Śiva is the messenger",
      vigraha: "śivo dūto yasyāḥ sā",
      children: [
        ["śiva", "Śiva"],
        ["dūta", "messenger, envoy"],
      ],
    },
  },
  406: {
    gloss: "Worshipped By Śiva",
    translation: "Śiva is himself her worshipper, offering her the adoration that others offer to him.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is to be worshipped by Śiva",
      vigraha: "śivenārādhyā",
      children: [
        ["śiva", "Śiva"],
        ["ārādhyā", "to be worshipped, fit to be propitiated"],
      ],
    },
  },
  407: {
    gloss: "The Very Form Of Śiva",
    translation: "The shape in which Śiva becomes visible is no other than she.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the embodied form of Śiva",
      vigraha: "śivasya mūrtiḥ",
      children: [
        ["śiva", "Śiva"],
        ["mūrti", "embodied form, image"],
      ],
    },
  },
  408: {
    gloss: "Maker Of Welfare",
    translation: "Wherever her attention falls, wellbeing follows, for making things auspicious is her very act.",
    note: "the accusative śivam keeps its final m before kara by the mum augment",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who brings about what is auspicious",
      vigraha: "śivaṃ karotīti śivaṅkarī",
      children: [
        ["śivam", "what is auspicious, welfare"],
        ["karī", "she who makes or brings about"],
      ],
    },
  },
  409: {
    gloss: "Dear To Śiva",
    translation: "Of everything Śiva holds dear, she is the dearest.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is beloved of Śiva",
      vigraha: "śivasya priyā",
      children: [
        ["śiva", "Śiva"],
        ["priyā", "beloved one, she who is dear"],
      ],
    },
  },
  410: {
    gloss: "Intent On Śiva",
    translation: "Her whole regard rests on Śiva, who is for her the one thing of highest worth.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she for whom Śiva is the highest concern",
      vigraha: "śive parā",
      children: [
        ["śiva", "Śiva"],
        ["para", "highest; wholly given over to"],
      ],
    },
  },
  411: {
    gloss: "Beloved Of The Virtuous",
    translation: "Those who live by the discipline of the wise long for her above every other thing.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is desired by the well-instructed",
      vigraha: "śiṣṭānām iṣṭā",
      children: [
        ["śiṣṭa", "one trained in right conduct, a person of learning and discipline"],
        ["iṣṭa", "wished for, cherished"],
      ],
    },
  },
  412: {
    gloss: "Worshipped By The Virtuous",
    translation: "The homage of those schooled in right conduct is directed to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is honoured by the well-instructed",
      vigraha: "śiṣṭaiḥ pūjitā",
      children: [
        ["śiṣṭa", "one trained in right conduct, a person of learning and discipline"],
        ["pūjita", "honoured, worshipped"],
      ],
    },
  },
  413: {
    gloss: "Beyond Measure",
    translation: "No means of knowing can take her measure or settle what she is.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who cannot be measured or demonstrated",
      vigraha: "na prameyā yā sā",
      children: [
        ["a", "not (the negative prefix nañ)"],
        ["prameyā", "measurable, able to be proved"],
      ],
    },
  },
  414: {
    gloss: "Self-Luminous",
    translation: "She shines by a light that is her own, and needs nothing else to make her known.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose light is her own",
      vigraha: "svaḥ prakāśo yasyāḥ sā",
      children: [
        ["sva", "one's own"],
        ["prakāśa", "light, shining forth, manifestation"],
      ],
    },
  },
  415: {
    gloss: "Beyond The Reach Of Mind And Speech",
    translation: "Thought and word both stop short at the edge of her, having no field in which to grasp her.",
    note: "the genitive plural vācām is kept inside the compound rather than reduced to the stem",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who lies outside the range of minds and of words",
      vigraha: "manasāṃ vācāṃ ca agocarā",
      children: [
        {
          iast: "manovācām",
          type: "dvandva",
          gloss: "Of Minds And Words",
          vigraha: "manāṃsi ca vācaś ca, teṣām",
          children: [
            ["manas", "mind"],
            ["vāc", "speech, word"],
          ],
        },
        {
          iast: "agocarā",
          type: "tatpuruṣa",
          gloss: "Outside The Range",
          vigraha: "na gocarā",
          children: [
            ["a", "not (the negative prefix nañ)"],
            ["gocara", "range, field within which something can act"],
          ],
        },
      ],
    },
  },
  416: {
    gloss: "The Power Of Consciousness",
    translation: "She is awareness taken as sheer power, the force by which anything whatever comes to be known.",
    declension: "i-stem",
    stem: "cicchakti",
    note: "śakti is a feminine i-stem, and the stotra recension reads cicchaktiḥ",
    compound: {
      type: "tatpuruṣa",
      gloss: "the power that belongs to consciousness",
      vigraha: "citaḥ śaktiḥ",
      children: [
        ["cit", "pure consciousness"],
        ["śakti", "power, capacity, energy"],
      ],
    },
  },
  417: {
    gloss: "Whose Form Is Sentience",
    translation: "What shows itself as her form is sentience and nothing besides.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is consciousness itself",
      vigraha: "cetanaiva rūpaṃ yasyāḥ sā",
      children: [
        ["cetanā", "consciousness, sense, intelligence"],
        ["rūpa", "form"],
      ],
    },
  },
  418: {
    gloss: "The Power In Inert Matter",
    translation: "Even what is lifeless and unknowing holds together by a power that is hers.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the power belonging to what is insentient",
      vigraha: "jaḍasya śaktiḥ",
      children: [
        ["jaḍa", "inert, torpid, without sense"],
        ["śakti", "power, capacity, energy"],
      ],
    },
  },
  419: {
    gloss: "Whose Self Is Insentient Nature",
    translation: "The dull unknowing side of things is not foreign to her; it too is her own self.",
    note: "Since the -ka of ātmaka is itself the possessive element, the word is taken as a taddhita derivative of jaḍātman; read as a bahuvrīhi it would mean she whose self is the insentient.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having the insentient for her nature",
      vigraha: "jaḍasyātmikā, jaḍasvarūpā",
      children: [
        ["jaḍa", "inert, torpid, without sense"],
        ["ātmikā", "having as her self or nature"],
      ],
    },
  },
  420: {
    gloss: "The Gāyatrī",
    translation: "She is the Gāyatrī, both the metre of three eight-syllable feet and the verse to the sun that every twice-born recites.",
  },
  421: {
    gloss: "The Sacred Utterance",
    translation: "She is the vyāhṛti, the calling out of bhūḥ, bhuvaḥ and svaḥ that carries the reciter through the worlds.",
    note: "an action noun on √hṛ with the prefixes vi and ā, not a compound",
  },
  422: {
    gloss: "The Twilight Juncture",
    translation: "She is the seam where day and night meet, and the worship appointed for that hour.",
  },
  423: {
    gloss: "Served By Throngs Of The Twice-Born",
    translation: "Crowds of brahmins wait upon her, and their whole observance amounts to attendance on her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is attended upon by hosts of the twice-born",
      vigraha: "dvijavṛndena niṣevitā",
      children: [
        {
          iast: "dvijavṛnda",
          type: "tatpuruṣa",
          gloss: "Host Of The Twice-Born",
          vigraha: "dvijānāṃ vṛndam",
          children: [
            ["dvija", "twice-born, one reborn through initiation"],
            ["vṛnda", "multitude, throng"],
          ],
        },
        ["niṣevita", "attended upon, served, honoured"],
      ],
    },
  },
  424: {
    gloss: "Seated On The Tattvas",
    translation: "The ranked principles out of which the world is built serve her as a seat.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is the constituent principles",
      vigraha: "tattvāny āsanaṃ yasyāḥ sā",
      children: [
        ["tattva", "a true principle, a constituent reality"],
        ["āsana", "seat, posture of sitting"],
      ],
    },
  },
  425: {
    gloss: "That",
    translation: "She is the 'that' of the great Upaniṣadic sentence, the reality a word can point at but never hold.",
    pos: "pronoun",
    gender: "neuter",
    declension: "pronominal",
    stem: "tad",
    note: "the word tattvamayī is read by commentators as the three names tat, tvam and ayī",
  },
  426: {
    gloss: "Thou",
    translation: "She is the 'thou' of that same sentence, the self addressed in the second person and found to be nothing other than the first.",
    pos: "pronoun",
    gender: "common",
    declension: "pronominal",
    stem: "yuṣmad",
    note: "the second-person pronoun is not marked for gender",
  },
  427: {
    gloss: "O!",
    translation: "Taken as the particle of address, this name is the calling out itself, the bare act of turning toward her.",
    pos: "particle",
    gender: "not applicable",
    grammaticalCase: "not applicable",
    caseNumber: 0,
    number: "not applicable",
    declension: "indeclinable",
    stem: "ayi",
    note: "an indeclinable of address, lengthened to ayī where the verse divides tattvamayī",
  },
  428: {
    gloss: "Abiding Within The Five Sheaths",
    translation: "She stands inside the five wrappings of the self, further in than any of them reaches.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who abides within the five sheaths",
      vigraha: "pañcānāṃ kośānām antaḥ sthitā",
      children: [
        {
          iast: "pañcakośa",
          type: "dvigu",
          gloss: "The Five Sheaths",
          vigraha: "pañcānāṃ kośānāṃ samāhāraḥ",
          children: [
            ["pañcan", "five"],
            ["kośa", "sheath, casing, enveloping layer"],
          ],
        },
        ["antar", "within, in the interior of"],
        ["sthitā", "standing, abiding"],
      ],
    },
  },
  429: {
    gloss: "Of Boundless Greatness",
    translation: "Her greatness overruns every boundary anyone might try to set around it.",
    declension: "an-stem",
    stem: "niḥsīmamahiman",
    note: "a bahuvrīhi closing in the an-stem mahiman keeps that stem in the feminine",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose majesty has no limit",
      vigraha: "niḥsīmā mahimā yasyāḥ sā",
      children: [
        ["niḥsīma", "unbounded, without a border"],
        ["mahiman", "greatness, might, majesty"],
      ],
    },
  },
  430: {
    gloss: "Ever Young",
    translation: "Her youth does not pass into anything else; she stands permanently at its height.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose youth is perpetual",
      vigraha: "nityaṃ yauvanaṃ yasyāḥ sā",
      children: [
        ["nitya", "perpetual, unceasing"],
        ["yauvana", "youth, the prime of life"],
      ],
    },
  },
  431: {
    gloss: "Abounding In Rapture",
    translation: "A wine-like exhilaration fills her and shows itself in every movement.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is richly furnished with rapture",
      vigraha: "madena śālinī",
      children: [
        ["mada", "rapture, exhilaration, intoxication"],
        ["śālinī", "she who abounds in, is amply provided with"],
      ],
    },
  },
  432: {
    gloss: "Whose Reddened Eyes Roll With Rapture",
    translation: "Her eyes, flushed red, sway and wander with the intoxication that has taken hold of her.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose reddened eyes are set rolling by rapture",
      vigraha: "madena ghūrṇite rakte akṣiṇī yasyāḥ sā",
      children: [
        {
          iast: "madaghūrṇita",
          type: "tatpuruṣa",
          gloss: "Set Rolling By Rapture",
          vigraha: "madena ghūrṇitam",
          children: [
            ["mada", "rapture, exhilaration, intoxication"],
            ["ghūrṇita", "made to roll or sway to and fro"],
          ],
        },
        {
          iast: "raktākṣi",
          type: "karmadhāraya",
          gloss: "Reddened Eyes",
          vigraha: "raktam akṣi",
          children: [
            ["rakta", "reddened, flushed"],
            ["akṣi", "eye"],
          ],
        },
      ],
    },
  },
  433: {
    gloss: "Whose Cheeks Are Flushed Rose With Rapture",
    translation: "Rapture has spread a pale rose across the broad surface of her cheeks.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose cheek-surface is turned rosy by rapture",
      vigraha: "madena pāṭalā gaṇḍabhūr yasyāḥ sā",
      children: [
        {
          iast: "madapāṭala",
          type: "tatpuruṣa",
          gloss: "Rose-Tinted By Rapture",
          vigraha: "madena pāṭalā",
          children: [
            ["mada", "rapture, exhilaration, intoxication"],
            ["pāṭala", "pale red, rose-coloured"],
          ],
        },
        {
          iast: "gaṇḍabhū",
          type: "tatpuruṣa",
          gloss: "Expanse Of The Cheeks",
          vigraha: "gaṇḍayor bhūḥ",
          children: [
            ["gaṇḍa", "cheek, the whole side of the face"],
            ["bhū", "ground, expanse, surface"],
          ],
        },
      ],
    },
  },
  434: {
    gloss: "Limbs Anointed With Liquid Sandal",
    translation: "Sandal worked into a paste has been smeared the length of her limbs.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose limbs are smeared with liquid sandal",
      vigraha: "candanadraveṇa digdhāny aṅgāni yasyāḥ sā",
      children: [
        {
          iast: "candanadrava",
          type: "tatpuruṣa",
          gloss: "Liquid Sandal",
          vigraha: "candanasya dravaḥ",
          children: [
            ["candana", "sandalwood and the unguent made from it"],
            ["drava", "fluid, a melted or liquid preparation"],
          ],
        },
        ["digdha", "smeared, anointed"],
        ["aṅga", "limb, body"],
      ],
    },
  },
  435: {
    gloss: "Fond Of Campaka Blossoms",
    translation: "Of all flowers it is the campaka blossom she cares for.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom the campaka blossom is dear",
      vigraha: "cāmpeyakusumaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "cāmpeyakusuma",
          type: "tatpuruṣa",
          gloss: "Campaka Blossom",
          vigraha: "cāmpeyasya kusumam",
          children: [
            ["cāmpeya", "the campaka tree, Michelia campaka"],
            ["kusuma", "flower, blossom"],
          ],
        },
        ["priya", "dear, held in affection"],
      ],
    },
  },
  436: {
    gloss: "Skilful",
    translation: "She is deft and fitting in whatever she undertakes, and sound in herself.",
  },
  437: {
    gloss: "Of Tender Form",
    translation: "There is no hard line anywhere in her shape; the whole of it is soft.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose form is soft",
      vigraha: "komala ākāro yasyāḥ sā",
      children: [
        ["komala", "soft, tender, pleasing"],
        ["ākāra", "form, figure"],
      ],
    },
  },
  438: {
    gloss: "Kurukullā",
    translation: "She is Kurukullā, the goddess set over the moat of nectar that rings her island city.",
    note: "Monier-Williams traces the name to kurukulyā, 'of the Kuru line'",
  },
  439: {
    gloss: "Mistress Of The Kula",
    translation: "The Kaula lineage, with everything it hands down, stands under her rule.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the sovereign of the kula",
      vigraha: "kulasya īśvarī",
      children: [
        ["kula", "family, lineage; the body of Kaula practice"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  440: {
    gloss: "Dwelling In The Kula Hollow",
    translation: "Her home is the pit at the root of the body where the coiled power lies asleep.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose abode is the kula pit",
      vigraha: "kulakuṇḍam ālayo yasyāḥ sā",
      children: [
        {
          iast: "kulakuṇḍa",
          type: "tatpuruṣa",
          gloss: "The Kula Pit",
          vigraha: "kulasya kuṇḍam",
          children: [
            ["kula", "the kula seat at the base of the spine"],
            ["kuṇḍa", "a round hollow or pit, a fire-pit"],
          ],
        },
        ["ālaya", "dwelling, abode"],
      ],
    },
  },
  441: {
    gloss: "Served By Those Set On The Kaula Path",
    translation: "Those who have given themselves wholly to the Kaula road are the ones who attend her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is served by those intent on the Kaula path",
      vigraha: "kaulamārgatatparaiḥ sevitā",
      children: [
        {
          iast: "kaulamārgatatpara",
          type: "tatpuruṣa",
          gloss: "Wholly Intent On The Kaula Path",
          vigraha: "kaulamārge tatparaḥ",
          children: [
            {
              iast: "kaulamārga",
              type: "tatpuruṣa",
              gloss: "The Kaula Path",
              vigraha: "kaulānāṃ mārgaḥ",
              children: [
                ["kaula", "belonging to the kula, Kaula"],
                ["mārga", "path, road, course of practice"],
              ],
            },
            ["tatpara", "having that as one's highest aim"],
          ],
        },
        ["sevita", "attended upon, served"],
      ],
    },
  },
  442: {
    gloss: "Mother Of Kumāra And Gaṇanātha",
    translation: "Skanda and the lord of Śiva's hosts are alike her children.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mother of Kumāra and of Gaṇanātha",
      vigraha: "kumāragaṇanāthayor ambā",
      children: [
        {
          iast: "kumāragaṇanātha",
          type: "dvandva",
          gloss: "Kumāra And Gaṇanātha",
          vigraha: "kumāraś ca gaṇanāthaś ca",
          children: [
            ["kumāra", "the youth, Skanda"],
            {
              iast: "gaṇanātha",
              type: "tatpuruṣa",
              gloss: "Lord Of The Hosts",
              vigraha: "gaṇānāṃ nāthaḥ",
              children: [
                ["gaṇa", "troop, host of attendant deities"],
                ["nātha", "lord, protector"],
              ],
            },
          ],
        },
        ["ambā", "mother"],
      ],
    },
  },
  443: {
    gloss: "Contentment",
    translation: "She is the satisfaction in which wanting finally lies down.",
  },
  444: {
    gloss: "Nourishment",
    translation: "She is the thriving fullness by which anything grows and holds its increase.",
  },
  445: {
    gloss: "Understanding",
    translation: "She is the thought that takes shape and the resolve that comes of it.",
  },
  446: {
    gloss: "Steadfastness",
    translation: "She is the firmness that keeps a person from being shaken loose.",
  },
  447: {
    gloss: "Peace",
    translation: "She is the quiet left when the fever of wanting has burnt itself out.",
  },
  448: {
    gloss: "Possessed Of Wellbeing",
    translation: "Wellbeing is hers to hold and hers to hand on.",
    note: "svasti (su + asti) with the possessive suffix matup, not a compound",
  },
  449: {
    gloss: "Radiance",
    translation: "She is loveliness itself, the brightness that draws and holds the eye.",
  },
  450: {
    gloss: "The Delighter",
    translation: "Gladness follows wherever she goes, and giving it is her nature.",
  },
  451: {
    gloss: "Destroyer Of Obstacles",
    translation: "Whatever blocks the way is undone by her before it can hold.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who makes an end of obstacles",
      vigraha: "vighnānāṃ nāśinī",
      children: [
        ["vighna", "obstacle, hindrance, interruption"],
        ["nāśinī", "she who destroys or removes"],
      ],
    },
  },
  452: {
    gloss: "Possessed Of Fiery Splendour",
    translation: "Heat and brilliance are not borrowed by her; she holds them as her own.",
    note: "tejas with the possessive suffix matup, not a compound",
  },
  453: {
    gloss: "Three-Eyed",
    translation: "Two eyes take in the world and a third, set upright between them, burns through it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has three eyes",
      vigraha: "trīṇi nayanāni yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["nayana", "eye"],
      ],
    },
  },
  454: {
    gloss: "Taking At Will The Form Of Lolākṣī",
    translation: "She shows herself as Lolākṣī, the goddess of restless eyes, wearing that shape as freely as she wears any other.",
    note: "In -rūpiṇī the possessive work is done by the suffix -in, so the name is analysed as a taddhita on lolākṣīkāmarūpa rather than as a bahuvrīhi, she who has Lolākṣī's form at will.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bears the form of Lolākṣī at her pleasure",
      vigraha: "lolākṣyā rūpaṃ kāmena bibhartīti lolākṣīkāmarūpiṇī",
      children: [
        {
          iast: "lolākṣī",
          type: "bahuvrīhi",
          gloss: "She Of Restless Eyes",
          vigraha: "lole akṣiṇī yasyāḥ sā",
          children: [
            ["lola", "moving to and fro, unsteady, restless"],
            ["akṣi", "eye"],
          ],
        },
        {
          iast: "kāmarūpiṇī",
          type: "tatpuruṣa",
          gloss: "Assuming Any Form At Will",
          vigraha: "kāmato rūpam asyā astīti kāmarūpiṇī",
          children: [
            ["kāma", "wish, desire, one's own pleasure"],
            ["rūpa", "form, shape"],
          ],
        },
      ],
    },
  },
  455: {
    gloss: "The Garlanded One",
    translation: "She wears the garland, and the name belongs equally to the Mālinī ordering of the alphabet, its letters strung like flowers.",
    note: "mālā with the possessive suffix in, not a compound",
  },
  456: {
    gloss: "She Of The Swan",
    translation: "The swan is hers, both the bird that separates milk from water and the haṃsa of the breath going out and in.",
    note: "haṃsa with the possessive suffix in, not a compound",
  },
  457: {
    gloss: "Mother",
    translation: "She is simply the mother, the source everything comes out of and the shelter it returns to.",
    declension: "ṛ-stem",
    stem: "mātṛ",
  },
  458: {
    gloss: "Dwelling On Mount Malaya",
    translation: "She lives on the sandal-bearing western range, and its fragrance goes with her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who dwells on the Malaya mountain",
      vigraha: "malayācale vāsinī",
      children: [
        {
          iast: "malayācala",
          type: "karmadhāraya",
          gloss: "The Malaya Mountain",
          vigraha: "malayo nāma acalaḥ",
          children: [
            ["malaya", "Malaya, the range along the western coast"],
            ["acala", "the unmoving one, a mountain"],
          ],
        },
        ["vāsinī", "she who dwells or abides"],
      ],
    },
  },
  459: {
    gloss: "Of Lovely Face",
    translation: "Her face is fair, and it is turned toward whoever comes near.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose face is beautiful",
      vigraha: "śobhanaṃ mukhaṃ yasyāḥ sā",
      children: [
        ["su", "good, well, beautiful"],
        ["mukha", "face, mouth"],
      ],
    },
  },
  460: {
    gloss: "The Lotus",
    translation: "She is the lotus and the pool it crowds, rising clear of the water she grows in.",
    note: "a feminine formed on nalina, denoting the plant, its stalk, or a lotus pond",
  },
  461: {
    gloss: "Of Beautiful Brows",
    translation: "The two arcs of her brows are drawn with perfect beauty.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose eyebrows are lovely",
      vigraha: "śobhane bhruvau yasyāḥ sā",
      children: [
        ["su", "good, well, beautiful"],
        ["bhrū", "eyebrow"],
      ],
    },
  },
  462: {
    gloss: "Splendid",
    translation: "She is brilliant to look upon, and lends that brilliance to whatever she touches.",
  },
  463: {
    gloss: "Leader Of The Gods",
    translation: "The gods take their direction from her and follow where she goes.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mistress and leader of the gods",
      vigraha: "surāṇāṃ nāyikā",
      children: [
        ["sura", "a god, a deity"],
        ["nāyikā", "leader, mistress, the woman who takes the lead"],
      ],
    },
  },
  464: {
    gloss: "Dark-Throated",
    translation: "Her throat is dark as her husband's, marked by the poison he held there for the world's sake.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose throat is black",
      vigraha: "kālaḥ kaṇṭho yasyāḥ sā",
      children: [
        ["kāla", "black, dark-coloured"],
        ["kaṇṭha", "throat, neck"],
      ],
    },
  },
  465: {
    gloss: "Possessed Of Radiance",
    translation: "Loveliness is not lent to her from anywhere; she owns it.",
    note: "kānti with the possessive suffix matup, not a compound",
  },
  466: {
    gloss: "The Agitator",
    translation: "She unsettles what has come to rest, stirring the still into movement again.",
    note: "an agent noun on the causative of √kṣubh, to shake or disturb",
  },
  467: {
    gloss: "Of Subtle Form",
    translation: "The form she wears is too fine for any sense to lay hold of.",
    note: "The -in suffix supplies the having, so the compound proper is sūkṣmarūpa and rūpiṇī is derived from it; the older bahuvrīhi reading, she whose form is subtle, comes to the same sense by another route.",
    compound: {
      type: "tatpuruṣa",
      gloss: "having a subtle form",
      vigraha: "sūkṣmaṃ rūpam asyā astīti sūkṣmarūpiṇī",
      children: [
        ["sūkṣma", "minute, fine, subtle"],
        ["rūpa", "form, shape"],
      ],
    },
  },
  468: {
    gloss: "Mistress Of The Thunderbolt",
    translation: "She is Vajreśvarī, one of the nityā goddesses, and the adamantine weapon answers to her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the sovereign of the thunderbolt",
      vigraha: "vajrasya īśvarī",
      children: [
        ["vajra", "thunderbolt, the hard and mighty weapon"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  469: {
    gloss: "The Gracious Goddess",
    translation: "She is Vāmā, the lovely and left-hand one, answering to the Śiva-face of that name.",
    compound: {
      type: "karmadhāraya",
      gloss: "the goddess who is gracious",
      vigraha: "vāmā cāsau devī ca",
      children: [
        ["vāma", "lovely, gracious, dear; the left"],
        ["devī", "goddess"],
      ],
    },
  },
  470: {
    gloss: "Free From The Stages Of Age",
    translation: "Childhood, prime and old age do not take their turns in her; she stands outside that succession.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is untouched by the conditions of age",
      vigraha: "vayo'vasthābhir vivarjitā",
      children: [
        ["vayas", "age, any period of life"],
        ["avasthā", "state, stage, condition"],
        ["vivarjita", "free from, destitute of"],
      ],
    },
  },
  471: {
    gloss: "Mistress Of The Siddhas",
    translation: "The adepts who have won their powers hold her as sovereign over them.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the sovereign of the perfected ones",
      vigraha: "siddhānām īśvarī",
      children: [
        ["siddha", "one who has attained his object, a perfected adept"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  472: {
    gloss: "The Perfected Lore",
    translation: "She is the mantra already brought to full effect, which works from the moment it is taken up.",
    compound: {
      type: "karmadhāraya",
      gloss: "the knowledge that is accomplished and effective",
      vigraha: "siddhā cāsau vidyā ca",
      children: [
        ["siddha", "accomplished, fulfilled, brought to effect"],
        ["vidyā", "knowledge; the mantra-body of a goddess"],
      ],
    },
  },
  473: {
    gloss: "Mother Of The Siddhas",
    translation: "The adepts owe their attainment to her as a child owes its birth.",
    declension: "ṛ-stem",
    stem: "siddhamātṛ",
    compound: {
      type: "tatpuruṣa",
      gloss: "the mother of the perfected ones",
      vigraha: "siddhānāṃ mātā",
      children: [
        ["siddha", "one who has attained his object, a perfected adept"],
        ["mātṛ", "mother"],
      ],
    },
  },
  474: {
    gloss: "Renowned",
    translation: "Her fame carries far, and it is a brightness rather than a report.",
    note: "yaśas with the possessive suffix vin, not a compound",
  },
  475: {
    gloss: "Seated In The Viśuddhi Wheel",
    translation: "Her station is the wheel at the throat, where whatever passes through is made clean.",
    note: "The cakra series begins here and descends from the throat to the root before rising to the brow and the crown, each wheel given its own panel of names and closed by its presiding yoginī. The pairing of the seven yoginīs with the wheels that the hymn follows is not the one set out in the Ṣaṭcakranirūpaṇa and the manuals that depend on it; the two arrangements agree at only some of the wheels.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is the wheel of purification",
      vigraha: "viśuddhicakraṃ nilayo yasyāḥ sā",
      children: [
        {
          iast: "viśuddhicakra",
          type: "karmadhāraya",
          gloss: "The Wheel Called Viśuddhi",
          vigraha: "viśuddhir iti nāmnā cakram",
          children: [
            ["viśuddhi", "complete purification, cleansing"],
            ["cakra", "wheel; one of the centres ranged along the spine"],
          ],
        },
        ["nilaya", "resting-place, abode"],
      ],
    },
  },
  476: {
    gloss: "Of Ruddy Hue",
    translation: "Her colour is a light red, the tint that shows through just beneath the surface.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose colour is tinged with red",
      vigraha: "āraktaḥ varṇo yasyāḥ sā",
      children: [
        ["ārakta", "reddish, tinged with red"],
        ["varṇa", "colour, outward appearance"],
      ],
    },
  },
  477: {
    gloss: "Three-Eyed",
    translation: "Ḍākinī, who holds the throat wheel, looks out through three eyes.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has three eyes",
      vigraha: "trīṇi locanāni yasyāḥ sā",
      children: [
        ["tri", "three"],
        ["locana", "eye, that which brightens"],
      ],
    },
  },
  478: {
    gloss: "Armed With The Skull-Staff And More",
    translation: "She carries the skull-topped club and the other weapons that belong with it.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose weapons are the skull-staff and the rest",
      vigraha: "khaṭvāṅgādīni praharaṇāni yasyāḥ sā",
      children: [
        {
          iast: "khaṭvāṅgādi",
          type: "bahuvrīhi",
          gloss: "The Skull-Staff And The Rest",
          vigraha: "khaṭvāṅgam ādir yeṣāṃ tāni",
          children: [
            {
              iast: "khaṭvāṅga",
              type: "tatpuruṣa",
              gloss: "Club Shaped Like A Bedstead Leg",
              vigraha: "khaṭvāyā aṅgam",
              children: [
                ["khaṭvā", "bedstead, cot"],
                ["aṅga", "limb, leg"],
              ],
            },
            ["ādi", "the first of a series, and so on"],
          ],
        },
        ["praharaṇa", "weapon, means of striking"],
      ],
    },
  },
  479: {
    gloss: "Having But One Face",
    translation: "Among the many-faced powers of the wheels she is furnished with a single face.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is provided with one face",
      vigraha: "ekena vadanena samanvitā",
      children: [
        ["vadana", "face, countenance"],
        ["eka", "one, a single"],
        ["samanvita", "endowed with, fully provided with"],
      ],
    },
  },
  480: {
    gloss: "Fond Of Milk-Rice",
    translation: "The offering she favours is rice boiled in milk.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom food of milk-boiled rice is dear",
      vigraha: "pāyasānnaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "pāyasānna",
          type: "karmadhāraya",
          gloss: "Food That Is Milk-Rice",
          vigraha: "pāyasaṃ cātad annaṃ ca",
          children: [
            ["pāyasa", "made with milk, rice boiled in milk"],
            ["anna", "food, boiled rice"],
          ],
        },
        ["priya", "dear, favoured"],
      ],
    },
  },
  481: {
    gloss: "Abiding In The Skin",
    translation: "Of the bodily constituents she governs the skin, the outermost of the seven.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is stationed in the skin",
      vigraha: "tvaci sthitā",
      children: [
        ["tvac", "skin, hide"],
        ["sthā", "standing, abiding in"],
      ],
    },
  },
  482: {
    gloss: "Terror To The Herd-Bound World",
    translation: "To those still tethered like cattle by their own bonds she is an object of dread.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who strikes fear into the world of the fettered",
      vigraha: "paśulokasya bhayaṅkarī",
      children: [
        {
          iast: "paśuloka",
          type: "tatpuruṣa",
          gloss: "The World Of The Fettered",
          vigraha: "paśūnāṃ lokaḥ",
          children: [
            ["paśu", "a tethered animal; the soul still in bondage"],
            ["loka", "world, the people of it"],
          ],
        },
        {
          iast: "bhayaṅkarī",
          type: "tatpuruṣa",
          gloss: "She Who Causes Fear",
          vigraha: "bhayaṃ karotīti",
          children: [
            ["bhayam", "fear, dread"],
            ["karī", "she who makes or brings about"],
          ],
        },
      ],
    },
  },
  483: {
    gloss: "Encircled By The Great Powers From Amṛtā On",
    translation: "The great śaktis of the throat wheel, Amṛtā at their head, stand ranged about her.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is surrounded by the great powers beginning with Amṛtā",
      vigraha: "amṛtādibhir mahāśaktibhiḥ saṃvṛtā",
      children: [
        {
          iast: "amṛtādimahāśakti",
          type: "karmadhāraya",
          gloss: "The Great Powers Beginning With Amṛtā",
          vigraha: "amṛtādyāś cātāḥ mahāśaktayaś ca",
          children: [
            {
              iast: "amṛtādi",
              type: "bahuvrīhi",
              gloss: "Beginning With Amṛtā",
              vigraha: "amṛtā ādir yāsāṃ tāḥ",
              children: [
                ["amṛtā", "Amṛtā, a goddess; the deathless draught"],
                ["ādi", "the first of a series, and so on"],
              ],
            },
            {
              iast: "mahāśakti",
              type: "karmadhāraya",
              gloss: "Great Power",
              vigraha: "mahatī cāsau śaktiś ca",
              children: [
                ["mahā", "great"],
                ["śakti", "power, energy"],
              ],
            },
          ],
        },
        ["saṃvṛta", "surrounded, encompassed"],
      ],
    },
  },
  484: {
    gloss: "Sovereign Of The Ḍākinīs",
    translation: "She is Ḍākinī herself, the deity of the throat wheel, and rules the attendants of that name.",
    note: "Ḍākinī closes the first panel and so belongs to viśuddhi in this hymn; the Ṣaṭcakranirūpaṇa places her at the root wheel instead, one of the points where the two arrangements of the yoginīs diverge.",
    compound: {
      type: "tatpuruṣa",
      gloss: "the sovereign of the ḍākinīs",
      vigraha: "ḍākinīnām īśvarī",
      children: [
        ["ḍākinī", "a ḍākinī, a female spirit attending on Kālī"],
        ["īśvarī", "mistress, sovereign lady"],
      ],
    },
  },
  485: {
    gloss: "Seated In The Anāhata Lotus",
    translation: "Her place is the lotus at the heart, named for the sound that no striking produces.",
    note: "The panel opened here closes at rākiṇyambāsvarūpiṇī, so Rākiṇī is the yoginī of the heart in the hymn; the Ṣaṭcakranirūpaṇa gives anāhata to Kākinī instead.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is the unstruck lotus",
      vigraha: "anāhatābjaṃ nilayo yasyāḥ sā",
      children: [
        {
          iast: "anāhatābja",
          type: "karmadhāraya",
          gloss: "The Lotus Called Anāhata",
          vigraha: "anāhatam iti nāmnā abjam",
          children: [
            ["anāhata", "unstruck, produced otherwise than by a blow"],
            {
              iast: "abja",
              type: "tatpuruṣa",
              gloss: "Water-Born, The Lotus",
              vigraha: "apsu jātam",
              children: [
                ["ap", "water"],
                ["ja", "born from"],
              ],
            },
          ],
        },
        ["nilaya", "resting-place, abode"],
      ],
    },
  },
  486: {
    gloss: "Of Dark Lustre",
    translation: "The light coming off her is dark, the blue-black of a cloud heavy with rain.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose sheen is dark",
      vigraha: "śyāmā ābhā yasyāḥ sā",
      children: [
        ["śyāma", "dark, black, blue-black"],
        ["ābhā", "splendour, sheen, colour"],
      ],
    },
  },
  487: {
    gloss: "Two-Faced",
    translation: "Rākiṇī of the heart wheel looks out through a pair of faces.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she who has a pair of faces",
      vigraha: "vadanadvayaṃ yasyāḥ sā",
      children: [
        ["vadana", "face, countenance"],
        ["dvaya", "a pair, a twofold set"],
      ],
    },
  },
  488: {
    gloss: "Blazing With Her Fangs",
    translation: "Her jutting tusks catch the light and make her fearful to look upon.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is luminous by reason of her tusks",
      vigraha: "daṃṣṭrābhir ujjvalā",
      children: [
        ["daṃṣṭrā", "large tooth, tusk, fang"],
        ["ujjvala", "blazing up, luminous"],
      ],
    },
  },
  489: {
    gloss: "Bearing The Rosary And More",
    translation: "In her hands are the string of beads and the other emblems that go with it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who holds the rosary and the rest",
      vigraha: "akṣamālādīnāṃ dharā",
      children: [
        {
          iast: "akṣamālādi",
          type: "bahuvrīhi",
          gloss: "The Rosary And The Rest",
          vigraha: "akṣamālā ādir yeṣāṃ tāni",
          children: [
            {
              iast: "akṣamālā",
              type: "tatpuruṣa",
              gloss: "String Of Beads",
              vigraha: "akṣāṇāṃ mālā",
              children: [
                ["akṣa", "the seed used for prayer beads"],
                ["mālā", "garland, string"],
              ],
            },
            ["ādi", "the first of a series, and so on"],
          ],
        },
        ["dharā", "she who holds or carries"],
      ],
    },
  },
  490: {
    gloss: "Established In The Blood",
    translation: "Among the bodily constituents she is stationed in the blood.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is seated in the blood",
      vigraha: "rudhire saṃsthitā",
      children: [
        ["rudhira", "blood, the red fluid"],
        ["saṃsthita", "placed in, resting in"],
      ],
    },
  },
  491: {
    gloss: "Ringed By The Host Of Powers From Kālarātri On",
    translation: "A flood of śaktis, Kālarātri leading them, closes around her in the heart wheel.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is enclosed by the throng of powers beginning with Kālarātri",
      vigraha: "kālarātryādīnāṃ śaktīnām oghena vṛtā",
      children: [
        {
          iast: "kālarātryādiśaktyaugha",
          type: "tatpuruṣa",
          gloss: "Throng Of Powers Beginning With Kālarātri",
          vigraha: "kālarātryādīnāṃ śaktīnām oghaḥ",
          children: [
            {
              iast: "kālarātryādi",
              type: "bahuvrīhi",
              gloss: "Beginning With Kālarātri",
              vigraha: "kālarātrir ādir yāsāṃ tāḥ",
              children: [
                {
                  iast: "kālarātri",
                  type: "tatpuruṣa",
                  gloss: "The Night Of Time's Ending",
                  vigraha: "kālasya rātriḥ",
                  children: [
                    ["kāla", "time, especially all-consuming time"],
                    ["rātri", "night"],
                  ],
                },
                ["ādi", "the first of a series, and so on"],
              ],
            },
            {
              iast: "śaktyogha",
              type: "tatpuruṣa",
              gloss: "Flood Of Powers",
              vigraha: "śaktīnām oghaḥ",
              children: [
                ["śakti", "power, energy"],
                ["ogha", "flood, stream, multitude"],
              ],
            },
          ],
        },
        ["vṛta", "surrounded, enveloped"],
      ],
    },
  },
  492: {
    gloss: "Fond Of Rich Boiled Rice",
    translation: "What is set before her is boiled rice made glossy with butter.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she to whom unctuous boiled rice is dear",
      vigraha: "snigdhaudanaṃ priyaṃ yasyāḥ sā",
      children: [
        {
          iast: "snigdhaudana",
          type: "karmadhāraya",
          gloss: "Unctuous Boiled Rice",
          vigraha: "snigdhaṃ cātad odanaṃ ca",
          children: [
            ["snigdha", "oily, unctuous, glossy"],
            ["odana", "boiled rice, grain cooked with milk"],
          ],
        },
        ["priya", "dear, favoured"],
      ],
    },
  },
  493: {
    gloss: "Granting Boons To The Foremost Of Heroes",
    translation: "To the greatest of the heroic adepts she gives whatever they ask for.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who bestows boons on the chief among great heroes",
      vigraha: "mahāvīrendrāya varadā",
      children: [
        {
          iast: "mahāvīrendra",
          type: "tatpuruṣa",
          gloss: "Chief Among Great Heroes",
          vigraha: "mahāvīrāṇām indraḥ",
          children: [
            {
              iast: "mahāvīra",
              type: "karmadhāraya",
              gloss: "Great Hero",
              vigraha: "mahāṃś cāsau vīraś ca",
              children: [
                ["mahā", "great"],
                ["vīra", "hero, a brave and eminent man"],
              ],
            },
            ["indra", "chief, the foremost of its kind"],
          ],
        },
        {
          iast: "varadā",
          type: "tatpuruṣa",
          gloss: "Giver Of Boons",
          vigraha: "varaṃ dadātīti",
          children: [
            ["vara", "boon, the gift one chooses"],
            ["dā", "giving, bestowing"],
          ],
        },
      ],
    },
  },
  494: {
    gloss: "Embodying Mother Rākiṇī",
    translation: "Rākiṇī, the goddess who holds the heart wheel, is her own shape.",
    note: "Like the other -svarūpiṇī names of this series, it is treated as a taddhita in -in on rākiṇyambāsvarūpa, the suffix carrying the possession; the bahuvrīhi reading, she who has Mother Rākiṇī for her form, is equally available. The Ṣaṭcakranirūpaṇa seats Rākiṇī at svādhiṣṭhāna rather than at the heart, another of the wheels where the two arrangements differ.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who has the essential form of Mother Rākiṇī",
      vigraha: "rākiṇyambāyāḥ svarūpiṇī",
      children: [
        {
          iast: "rākiṇyambā",
          type: "karmadhāraya",
          gloss: "Mother Rākiṇī",
          vigraha: "rākiṇī caivāmbā ca",
          children: [
            ["rākiṇī", "Rākiṇī, the goddess of the heart wheel"],
            ["ambā", "mother"],
          ],
        },
        ["svarūpiṇī", "she who has the essential form of"],
      ],
    },
  },
  495: {
    gloss: "Seated In The Maṇipūra Lotus",
    translation: "Her place is the lotus at the navel, the jewelled city for which it is named.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose seat is the maṇipūra lotus",
      vigraha: "maṇipūrābjaṃ nilayo yasyāḥ sā",
      children: [
        {
          iast: "maṇipūrābja",
          type: "karmadhāraya",
          gloss: "The Lotus Called Maṇipūra",
          vigraha: "maṇipūram iti nāmnā abjam",
          children: [
            ["maṇipūra", "the navel; the mystic circle set there"],
            ["abja", "the water-born, a lotus"],
          ],
        },
        ["nilaya", "resting-place, abode"],
      ],
    },
  },
  496: {
    gloss: "Joined With Three Faces",
    translation: "Lākinī of the navel wheel is furnished with a set of three faces.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is provided with a triad of faces",
      vigraha: "vadanatrayeṇa saṃyutā",
      children: [
        {
          iast: "vadanatraya",
          type: "tatpuruṣa",
          gloss: "A Triad Of Faces",
          vigraha: "vadanānāṃ trayam",
          children: [
            ["vadana", "face, countenance"],
            ["traya", "a triad, a set of three"],
          ],
        },
        ["saṃyuta", "joined with, provided with"],
      ],
    },
  },
  497: {
    gloss: "Furnished With The Thunderbolt And Other Arms",
    translation: "She holds the thunderbolt and the weapons that are carried along with it.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is equipped with weapons beginning with the thunderbolt",
      vigraha: "vajrādikair āyudhair upetā",
      children: [
        {
          iast: "vajrādikāyudha",
          type: "karmadhāraya",
          gloss: "Weapons Beginning With The Thunderbolt",
          vigraha: "vajrādikāni cātāny āyudhāni ca",
          children: [
            {
              iast: "vajrādika",
              type: "bahuvrīhi",
              gloss: "Having The Thunderbolt First",
              vigraha: "vajram ādir yeṣāṃ tāni",
              children: [
                ["vajra", "thunderbolt, the hard and mighty weapon"],
                ["ādika", "the first of a series, and so on"],
              ],
            },
            ["āyudha", "weapon, implement of war"],
          ],
        },
        ["upeta", "furnished with, in possession of"],
      ],
    },
  },
  498: {
    gloss: "Encircled By Ḍāmarī And The Rest",
    translation: "The powers of the navel wheel, Ḍāmarī foremost among them, stand all round her.",
    note: "the instrumental plural ḍāmaryādibhiḥ is kept inside the name instead of being reduced to the stem",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is surrounded by those beginning with Ḍāmarī",
      vigraha: "ḍāmaryādibhiḥ śaktibhir āvṛtā",
      children: [
        {
          iast: "ḍāmaryādibhiḥ",
          type: "bahuvrīhi",
          gloss: "By Those Beginning With Ḍāmarī",
          vigraha: "ḍāmarī ādir yāsāṃ tābhiḥ",
          children: [
            ["ḍāmarī", "Ḍāmarī, a goddess of the navel wheel"],
            ["ādi", "the first of a series, and so on"],
          ],
        },
        ["āvṛta", "surrounded, encompassed"],
      ],
    },
  },
  499: {
    gloss: "Red In Colour",
    translation: "The colour of Lākinī is plain red, unmixed with any other shade.",
    compound: {
      type: "bahuvrīhi",
      gloss: "she whose colour is red",
      vigraha: "raktaḥ varṇo yasyāḥ sā",
      children: [
        ["rakta", "red, reddened"],
        ["varṇa", "colour, outward appearance"],
      ],
    },
  },
  500: {
    gloss: "Established In The Flesh",
    translation: "Among the bodily constituents she is fixed in the flesh.",
    compound: {
      type: "tatpuruṣa",
      gloss: "she who is grounded in the flesh",
      vigraha: "māṃse niṣṭhā",
      children: [
        ["māṃsa", "flesh, meat"],
        ["niṣṭhā", "standing firm in, being fixed upon"],
      ],
    },
  },
};
