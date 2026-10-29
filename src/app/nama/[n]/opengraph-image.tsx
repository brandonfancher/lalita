import { getNama } from "@/lib/content";
import { hasShareArt } from "@/lib/og/art";
import { C, card, CARD_SIZE, CARD_TYPE, Deva, Eyebrow, TEXT_WIDTH } from "@/lib/og/card";
import { capitalize } from "@/lib/transliterate";
import { toDevanagariDigits } from "@/lib/utils";

export const contentType = CARD_TYPE;

export async function generateImageMetadata({ params }: { params: Promise<{ n: string }> | { n: string } }) {
  // Also called without the name, only to learn the image ids.
  const { n } = (await params) ?? {};
  const found = n ? getNama(Number(n)) : null;
  if (!found) return [{ id: "card", size: CARD_SIZE, contentType }];
  const { nama } = found;
  return [
    {
      id: "card",
      size: CARD_SIZE,
      contentType,
      alt: `Name ${nama.index} of the Lalitā Sahasranāma: ${nama.deva}, ${nama.iast}, “${nama.gloss}”`,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ n: string }> }) {
  const found = getNama(Number((await params).n));
  if (!found) return new Response("Not found", { status: 404 });
  const { nama, module: mod } = found;
  const mantra = nama.namavaliDeva ? `ॐ ${nama.namavaliDeva} नमः` : null;

  return card({
    artId: hasShareArt(mod.id) ? mod.id : undefined,
    numeral: toDevanagariDigits(nama.index),
    footer: `Shloka ${mod.number} · meaning · how to chant`,
    children: (
      <>
        <Eyebrow>{`Lalitā Sahasranāma · Name ${nama.index} of 1000`}</Eyebrow>
        <div style={{ display: "flex", marginTop: 26 }}>
          <Deva text={nama.deva} size={104} maxWidth={TEXT_WIDTH} />
        </div>
        <div style={{ display: "flex", marginTop: 2, fontStyle: "italic", fontSize: 44, color: C.goldSoft }}>
          {capitalize(nama.iast)}
        </div>
        <div style={{ display: "flex", marginTop: 14, fontSize: nama.gloss.length > 34 ? 38 : 46, lineHeight: 1.15, color: C.ink }}>
          {`“${nama.gloss}”`}
        </div>
        {mantra && (
          <div style={{ display: "flex", marginTop: 26 }}>
            <Deva text={mantra} size={36} color={C.sindura} maxWidth={TEXT_WIDTH} />
          </div>
        )}
      </>
    ),
  });
}
