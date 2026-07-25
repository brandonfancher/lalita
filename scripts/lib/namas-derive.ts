/**
 * Mechanical half of the nāma dataset: reading the nāmāvalī, transliterating
 * it, and recovering the nominative citation form from the dative the source
 * gives.
 *
 * The nāmāvalī lists each name as `OM <name-in-dative> namaH |`. Because every
 * name is an epithet of the goddess, the dative is usually feminine singular
 * and the nominative follows by rule. Two things make that unreliable on its
 * own, and both are handled here by an index-keyed override table:
 *
 *  - `-yai` is the dative of both ī-stems (kuṇḍalinī → kuṇḍalinyai) and
 *    feminine i-stems (śakti → śaktyai), which have different nominatives
 *    (-ī vs -iḥ). The ending cannot decide between them.
 *  - a minority of names are not feminine ā/ī-stems at all: root nouns
 *    (sahasrapāt), an-stems (ātmā, brahma), ū-stems (subhrūḥ), s-stems
 *    (virajāḥ), neuters (paraṃ jyotiḥ) and even pronouns (tat, tvam).
 *
 * Every override was settled against the stotra recension in
 * `sources/text/lalitacomplete.itx`, which states the same thousand names in
 * the nominative.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { toDevanagari, toIast } from "./itrans";
import { parseNamavali } from "./parse-source";

export const NAMAVALI_PATH = join(process.cwd(), "sources/text/lalitaa1000.itx");

export interface DerivedNama {
  index: number;
  /** Dative form in ITRANS, exactly as the nāmāvalī has it. */
  namavaliItrans: string;
  namavaliIast: string;
  namavaliDeva: string;
  /** Nominative citation form in ITRANS. */
  itransNominative: string;
  iast: string;
  deva: string;
  /** Which rule or override produced the nominative, for auditing. */
  rule: string;
}

/**
 * Regular dative endings and the nominative they imply, longest match first.
 * `-Ayai` is the ā-stem dative (durgAyai → durgA); `-tre` the ṛ-stem agent noun
 * (mAtre → mAtA); `-~nai` the ī-stem written with the palatal cluster
 * (mahArAj~nai → mahArAj~nI); `-yai` the ī-stem generally.
 */
const DATIVE_RULES: Array<{ from: RegExp; to: string; rule: string }> = [
  { from: /Ayai$/, to: "A", rule: "-āyai → -ā (ā-stem)" },
  { from: /tre$/, to: "tA", rule: "-tre → -tā (ṛ-stem)" },
  { from: /~nai$/, to: "~nI", rule: "-ñai → -ñī (ī-stem)" },
  { from: /yai$/, to: "I", rule: "-yai → -ī (ī-stem)" },
];

interface Override {
  /** Nominative in ITRANS. */
  itrans: string;
  /** Why the rules do not apply. */
  why: string;
}

/**
 * Nominatives the regular rules cannot reach, keyed by nāma index. Grouped by
 * the reason the rule fails.
 */
export const NOMINATIVE_OVERRIDES: Record<number, Override> = {
  // The first entry carries the bīja syllables of the mantra ahead of the name.
  1: { itrans: "shrImAtA", why: "bīja syllables aiṃ hrīṃ śrīṃ precede the name" },

  // Feminine i-stems: dative -yai / -aye, nominative -iḥ.
  48: { itrans: "mahAlAvaNyashevadhiH", why: "i-stem śevadhi" },
  80: { itrans: "karA~NgulinakhotpannanArAyaNadashAkR^itiH", why: "i-stem ākṛti" },
  84: { itrans: "haranetrAgnisandagdhakAmasa~njIvanauShadhiH", why: "i-stem oṣadhi" },
  107: { itrans: "taDillatAsamaruchiH", why: "i-stem ruci; nāmāvalī writes taṭit for taḍit" },
  109: { itrans: "mahAsaktiH", why: "i-stem āsakti" },
  116: { itrans: "bhadramUrtiH", why: "i-stem mūrti" },
  154: { itrans: "nirupAdhiH", why: "i-stem upādhi" },
  217: { itrans: "mahAshaktiH", why: "i-stem śakti" },
  218: { itrans: "mahAratiH", why: "i-stem rati" },
  223: { itrans: "mahAbuddhiH", why: "i-stem buddhi" },
  224: { itrans: "mahAsiddhiH", why: "i-stem siddhi" },
  362: { itrans: "chitiH", why: "i-stem citi" },
  365: { itrans: "svAtmAnandalavIbhUtabrahmAdyAnandasantatiH", why: "i-stem santati" },
  397: { itrans: "mUlaprakR^itiH", why: "i-stem prakṛti" },
  404: { itrans: "bhaktAhArdatamobhedabhAnumadbhAnusantatiH", why: "i-stem santati" },
  407: { itrans: "shivamUrtiH", why: "i-stem mūrti" },
  418: { itrans: "jaDashaktiH", why: "i-stem śakti" },
  421: { itrans: "vyAhR^itiH", why: "i-stem vyāhṛti" },
  443: { itrans: "tuShTiH", why: "i-stem tuṣṭi" },
  444: { itrans: "puShTiH", why: "i-stem puṣṭi" },
  445: { itrans: "matiH", why: "i-stem mati" },
  446: { itrans: "dhR^itiH", why: "i-stem dhṛti" },
  447: { itrans: "shAntiH", why: "i-stem śānti" },
  449: { itrans: "kAntiH", why: "i-stem kānti" },
  537: { itrans: "amatiH", why: "i-stem amati" },
  539: { itrans: "shrutiH", why: "i-stem śruti" },
  540: { itrans: "smR^itiH", why: "i-stem smṛti" },
  542: { itrans: "puNyakIrtiH", why: "i-stem kīrti" },
  567: { itrans: "bhaktanidhiH", why: "i-stem nidhi" },
  572: { itrans: "parAshaktiH", why: "i-stem śakti" },
  581: { itrans: "dayAmUrtiH", why: "i-stem mūrti" },
  603: { itrans: "gurumUrtiH", why: "i-stem mūrti" },
  604: { itrans: "guNanidhiH", why: "i-stem nidhi" },
  615: { itrans: "AdishaktiH", why: "i-stem śakti" },
  619: { itrans: "pAvanAkR^itiH", why: "i-stem ākṛti" },
  628: { itrans: "trimUrtiH", why: "i-stem mūrti" },
  662: { itrans: "aShTamUrtiH", why: "i-stem mūrti" },
  683: { itrans: "shobhanAsulabhAgatiH", why: "i-stem gati" },
  742: { itrans: "bhavadAvasudhAvR^iShTiH", why: "i-stem vṛṣṭi" },
  748: { itrans: "rogaparvatadambholiH", why: "i-stem dambholi" },
  766: { itrans: "japApuShpanibhAkR^itiH", why: "i-stem ākṛti" },
  797: { itrans: "kalAnidhiH", why: "i-stem nidhi" },
  800: { itrans: "rasashevadhiH", why: "i-stem śevadhi" },
  830: { itrans: "prakaTAkR^itiH", why: "i-stem ākṛti" },
  848: { itrans: "udArakIrtiH", why: "i-stem kīrti" },
  879: { itrans: "sudhAsR^itiH", why: "i-stem sṛti" },
  894: { itrans: "ayoniH", why: "i-stem yoni" },
  933: { itrans: "ma~NgalAkR^itiH", why: "i-stem ākṛti" },
  992: { itrans: "avyAjakaruNAmUrtiH", why: "i-stem mūrti" },

  // lakṣmī-type ī-stems, which unlike devī-type keep a nominative visarga.
  210: { itrans: "mahAlakShmIH", why: "lakṣmī-type ī-stem, nominative in -īḥ" },
  689: { itrans: "rAjyalakShmIH", why: "lakṣmī-type ī-stem, nominative in -īḥ" },

  // ū-stems: dative -uve / -ure, nominative -ūḥ.
  23: { itrans: "padmarAgashilAdarshaparibhAvikapolabhUH", why: "ū-stem bhū" },
  433: { itrans: "madapATalagaNDabhUH", why: "ū-stem bhū" },
  461: { itrans: "subhrUH", why: "ū-stem bhrū" },
  550: { itrans: "viyadAdijagatprasUH", why: "ū-stem prasū" },
  606: { itrans: "guhajanmabhUH", why: "ū-stem bhū" },
  786: { itrans: "mantriNInyastarAjyadhUH", why: "ū-stem dhur" },
  837: { itrans: "viyatprasUH", why: "ū-stem prasū" },

  // Consonant stems, neuters, pronouns and other genuine irregulars.
  284: { itrans: "sahasrapAt", why: "root noun pād, nominative sahasrapāt" },
  425: { itrans: "tat", why: "neuter demonstrative pronoun; dative tasmai" },
  426: { itrans: "tvam", why: "second-person pronoun; dative tubhyam" },
  427: { itrans: "ayI", why: "read as the vocative particle ayi by some commentators" },
  429: { itrans: "niHsImamahimA", why: "an-stem mahiman" },
  617: { itrans: "AtmA", why: "an-stem ātman" },
  711: { itrans: "sAdhu", why: "u-stem adjective sādhu" },
  712: { itrans: "I", why: "the bare syllable ī taken as a name" },
  779: { itrans: "virajAH", why: "s-stem virajas" },
  795: { itrans: "kAmadhuk", why: "root noun kāmaduh, nominative kāmadhuk" },
  806: { itrans: "paraM jyotiH", why: "neuter s-stem jyotis with attribute param" },
  807: { itrans: "paraM dhAma", why: "neuter an-stem dhāman with attribute param" },
  808: { itrans: "paramANuH", why: "masculine u-stem aṇu" },
  822: { itrans: "brahma", why: "neuter an-stem brahman" },

  // Where the nāmāvalī's spelling is a scribal slip, the stotra recension in
  // lalitacomplete.itx supplies the reading used for the citation form.
  21: { itrans: "kadambama~njarIkL^iptakarNapUramanoharA", why: "kḷpta (√kḷp), for nāmāvalī klṛpta" },
  27: { itrans: "nijasallApamAdhuryavinirbhartsitakachChapI", why: "vinirbhartsita, for nāmāvalī vinirbhatsita" },
  31: { itrans: "kanakA~NgadakeyUrakamanIyabhujAnvitA", why: "bhujā (arm), for nāmāvalī mujā" },
  66: { itrans: "sampatkarIsamArUDhasindhuravrajasevitA", why: "sindhura (elephant), for nāmāvalī sindura" },
  216: { itrans: "mahAsattvA", why: "sattva, for nāmāvalī satva" },
  258: { itrans: "svapantI", why: "svapantī (dreaming), for nāmāvalī svapatnī" },
  488: { itrans: "daMShTrojjvalA", why: "ujjvalā, for nāmāvalī ujvalā" },
  497: { itrans: "vajrAdikAyudhopetA", why: "vajrādika-āyudha, for nāmāvalī vajrādhika" },
  511: { itrans: "bandhinyAdisamanvitA", why: "bandhinī, for nāmāvalī bandinī" },
  648: { itrans: "lIlAkL^iptabrahmANDamaNDalA", why: "kḷpta (√kḷp), for nāmāvalī klṛpta" },
  667: { itrans: "nirdvaitA", why: "nirdvaitā, for nāmāvalī nidvaitā" },
  680: { itrans: "bhAvAbhAvavivarjitA", why: "vivarjitā, for nāmāvalī virjitā" },
  697: { itrans: "sarvalokavasha~NkarI", why: "vaśaṅkarī, for nāmāvalī vaṃśakarī" },
};

/**
 * Entries the typesetter wrapped across two lines, leaving a space inside a
 * single compound. Names 806 and 807 are genuinely two words and stay as they
 * are.
 */
const GENUINELY_TWO_WORDS = new Set([806, 807]);

function joinWrapped(index: number, itrans: string): string {
  if (GENUINELY_TWO_WORDS.has(index)) return itrans;
  return itrans.replace(/\s+/g, "");
}

/** Apply the dative→nominative rules, consulting the override table first. */
export function nominativeOf(index: number, dativeItrans: string): { itrans: string; rule: string } {
  const override = NOMINATIVE_OVERRIDES[index];
  if (override) return { itrans: override.itrans, rule: `override: ${override.why}` };

  const dative = joinWrapped(index, dativeItrans);
  for (const { from, to, rule } of DATIVE_RULES) {
    if (from.test(dative)) return { itrans: dative.replace(from, to), rule };
  }
  return { itrans: dative, rule: "UNMATCHED" };
}

export function readNamavali(path: string = NAMAVALI_PATH): string[] {
  return parseNamavali(readFileSync(path, "utf8"));
}

export function deriveAll(path: string = NAMAVALI_PATH): DerivedNama[] {
  return readNamavali(path).map((namavaliItrans, i) => {
    const index = i + 1;
    const { itrans, rule } = nominativeOf(index, namavaliItrans);
    return {
      index,
      namavaliItrans,
      namavaliIast: toIast(namavaliItrans),
      namavaliDeva: toDevanagari(namavaliItrans),
      itransNominative: itrans,
      iast: toIast(itrans),
      deva: toDevanagari(itrans),
      rule,
    };
  });
}
