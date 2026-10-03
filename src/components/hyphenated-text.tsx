import { Fragment } from "react";

/**
 * Sanskrit text that can be shown with its compounds broken into words,
 * following the reader's word-breaks switch.
 *
 * Both forms are rendered and CSS shows one, so the page is right on first
 * paint. The whole form stays a single run of text, because splitting it
 * across elements can break the conjuncts Devanagari draws across a word
 * boundary; in the broken form a hyphen already sits between them.
 */
export function HyphenatedText({ text, hyphenated }: { text: string; hyphenated?: string }) {
  if (!hyphenated) return text;

  return (
    <>
      <span className="without-word-breaks">{text}</span>
      <span className="with-word-breaks">
        {hyphenated.split("-").map((piece, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="word-break">-</span>}
            {piece}
          </Fragment>
        ))}
      </span>
    </>
  );
}
