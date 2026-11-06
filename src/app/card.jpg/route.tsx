import { C, card, Deva, Eyebrow, TEXT_WIDTH } from "@/lib/og/card";

export const dynamic = "force-static";

/** The site's own share card, for pages without one of their own. */
export async function GET() {
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
