/**
 * Helpers for turning the sanskritdocuments.org ITRANS (.itx) sources into
 * clean Devanagari and IAST.
 *
 * The .itx files are LaTeX-flavoured: they carry typesetting macros, editorial
 * comments after `##`, `%` comment lines, and parenthetical variant readings
 * interleaved with the verse text. Everything here strips that scaffolding
 * without touching the text itself.
 */

import Sanscript from "@indic-transliteration/sanscript";

/** Lines that are pure typesetting or metadata rather than text. */
const LATEX_LINE = /^\s*(\\|#include|#endwordvowel|\{|\}|%)/;

/** Inline LaTeX macros to drop, e.g. \medskip \hrule \ldq{} \largedvng */
const LATEX_MACRO = /\\[a-zA-Z@]+(\{[^}]*\})?/g;

/**
 * Strip the ITX scaffolding from a raw source string and return plain ITRANS
 * lines. Editorial comments introduced by `##` are removed, as are `%` lines.
 */
export function cleanItxLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => {
      // Editorial notes live after `##` on the same line.
      let out = line.split("##")[0];
      out = out.replace(LATEX_MACRO, " ");
      return out;
    })
    .filter((line) => !LATEX_LINE.test(line))
    .map((line) => line.replace(/\s+/g, " ").trim());
}

/**
 * Remove parenthetical variant readings, e.g. `... || 9|| (dashanachChadA)`.
 * These are alternate manuscript readings the editors recorded alongside the
 * main text; they are preserved separately rather than inlined.
 */
export function stripVariants(line: string): { text: string; variants: string[] } {
  const variants: string[] = [];
  const text = line
    .replace(/\(([^)]*)\)/g, (_match, inner: string) => {
      const v = inner.trim();
      if (v) variants.push(v);
      return " ";
    })
    .replace(/\s+/g, " ")
    .trim();
  return { text, variants };
}

/** ITRANS -> Devanagari. */
export function toDevanagari(itrans: string): string {
  return Sanscript.t(itrans, "itrans", "devanagari");
}

/** ITRANS -> IAST. */
export function toIast(itrans: string): string {
  return Sanscript.t(itrans, "itrans", "iast");
}

/** Devanagari -> IAST, for text that is already in script. */
export function devaToIast(deva: string): string {
  return Sanscript.t(deva, "devanagari", "iast");
}

/** IAST -> Devanagari. */
export function iastToDeva(iast: string): string {
  return Sanscript.t(iast, "iast", "devanagari");
}

/** IAST -> SLP1, used for dictionary lookups. */
export function iastToSlp1(iast: string): string {
  return Sanscript.t(iast, "iast", "slp1");
}

/** SLP1 -> IAST. */
export function slp1ToIast(slp1: string): string {
  return Sanscript.t(slp1, "slp1", "iast");
}

/**
 * Fold IAST to a bare ASCII skeleton for fuzzy matching: strips diacritics and
 * collapses the distinctions that sandhi most often disturbs.
 */
export function foldIast(iast: string): string {
  return iast
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

/** Strip verse-number markers like `|| 12||` and the daṇḍa punctuation. */
export function stripDandas(line: string): string {
  return line
    .replace(/\|\|\s*\d+\s*\|\|/g, " ")
    .replace(/[|॥।]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract a trailing verse number from a line, e.g. `|| 12||` -> 12. */
export function verseNumberOf(line: string): number | null {
  const m = line.match(/\|\|\s*(\d+)\s*\|\|/);
  return m ? Number(m[1]) : null;
}
