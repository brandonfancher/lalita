import { C, card, CARD_SIZE, CARD_TYPE, Deva, Eyebrow, TEXT_WIDTH } from "@/lib/og/card";

export const alt = "Lalitā Sahasranāma: learn, study, and chant the thousand names of the Divine Mother";
export const size = CARD_SIZE;
export const contentType = CARD_TYPE;

export default async function Image() {
  return card({
    artId: "000",
    footer: "182 shlokas · 1,000 names · chant along",
    children: (
      <>
        <Eyebrow>Learn · study · chant</Eyebrow>
        <div style={{ display: "flex", marginTop: 30 }}>
          <Deva text="श्रीललितासहस्रनामस्तोत्रम्" size={50} color={C.goldSoft} maxWidth={TEXT_WIDTH} />
        </div>
        <div style={{ display: "flex", marginTop: 6, fontSize: 86, lineHeight: 1, color: C.ink }}>Lalitā Sahasranāma</div>
        <div style={{ display: "flex", marginTop: 22, fontStyle: "italic", fontSize: 38, lineHeight: 1.2, color: C.muted }}>
          The thousand names of the Divine Mother, one shloka at a time
        </div>
      </>
    ),
  });
}
