import { card, C, CARD_SIZE, CARD_TYPE, DevaLine, Eyebrow, TEXT_WIDTH } from "@/lib/og/card";
import { getModule } from "@/lib/content";
import { hasShareArt } from "@/lib/og/art";
import { namaRangeLabel } from "@/lib/site";
import { toDevanagariDigits } from "@/lib/utils";

export const contentType = CARD_TYPE;

export async function generateImageMetadata({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Also called without the shloka, only to learn the image ids.
  const { id } = (await params) ?? {};
  if (!id) return [{ id: "card", size: CARD_SIZE, contentType }];
  const mod = getModule(id);
  const what = mod.number === null ? "The dhyāna verses" : `Shloka ${mod.number}`;
  return [
    {
      id: "card",
      size: CARD_SIZE,
      contentType,
      alt: `${what} of the Lalitā Sahasranāma: ${mod.lines[0].iast}${mod.subtitle ? ` — ${mod.subtitle}` : ""}`,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mod = getModule(id);
  const isDhyana = mod.number === null;
  // The dhyāna runs to fourteen lines; its first verse stands for it.
  const lines = mod.lines.slice(0, 4);
  const devaSize = lines.length > 2 ? 34 : 46;
  const range = namaRangeLabel(mod.namaRange);

  return card({
    artId: hasShareArt(id) ? id : undefined,
    numeral: isDhyana ? "ॐ" : toDevanagariDigits(mod.number!),
    footer: range ? `${range[0].toUpperCase()}${range.slice(1)} · meaning · chant` : "Meaning · chant",
    children: (
      <>
        <Eyebrow>{isDhyana ? "Lalitā Sahasranāma · Dhyāna" : `Lalitā Sahasranāma · Shloka ${mod.number}`}</Eyebrow>
        {mod.subtitle && (
          <div style={{ display: "flex", marginTop: 18, fontStyle: "italic", fontSize: mod.subtitle.length > 48 ? 40 : 50, lineHeight: 1.1, color: C.ink }}>
            {mod.subtitle}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: lines.length > 2 ? 2 : 8, marginTop: 34 }}>
          {lines.map((line, i) => (
            <DevaLine
              key={i}
              text={line.deva}
              marker={isDhyana ? undefined : i === lines.length - 1 ? `॥ ${toDevanagariDigits(mod.number!)} ॥` : "।"}
              size={devaSize}
              maxWidth={TEXT_WIDTH}
            />
          ))}
        </div>
        {lines.length <= 2 && (
          <div style={{ display: "flex", flexDirection: "column", marginTop: 16, fontStyle: "italic", fontSize: 26, lineHeight: 1.3, color: C.muted }}>
            {lines.map((line, i) => (
              <div key={i} style={{ display: "flex" }}>
                {line.iast}
              </div>
            ))}
          </div>
        )}
      </>
    ),
  });
}
