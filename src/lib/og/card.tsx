import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import sharp from "sharp";

import { ART_CROP, artDataUri } from "./art";
import { shapeDevanagari } from "./devanagari";

/**
 * The share card: the page by lamplight, with the verse or name on the left
 * and the shloka's artwork on the right. Everything is sized to stay legible
 * when a chat app shrinks the card to a third of its width.
 */

export const CARD_SIZE = { width: 1200, height: 630 };

export const C = {
  bg: "#15100c",
  ink: "#f1e5d1",
  muted: "#bca98f",
  faint: "#85735e",
  sindura: "#e2674c",
  gold: "#d0a24a",
  goldSoft: "#e2bf78",
  line: "#56432f",
};

const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));

async function fonts() {
  const [garamond, garamondItalic, sans] = await Promise.all([
    font("EBGaramond-Regular.ttf"),
    font("EBGaramond-Italic.ttf"),
    font("InstrumentSans-Medium.ttf"),
  ]);
  return [
    { name: "Garamond", data: garamond, weight: 400 as const, style: "normal" as const },
    { name: "Garamond", data: garamondItalic, weight: 400 as const, style: "italic" as const },
    { name: "Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ];
}

export { shapeDevanagari };

/** Shaped Devanagari as an image element. */
export function Deva({ text, size, color = C.ink, maxWidth }: { text: string; size: number; color?: string; maxWidth?: number }) {
  const shaped = shapeDevanagari([{ text, color }], size, maxWidth);
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" src={shaped.src} width={shaped.width} height={shaped.height} />;
}

/** A verse line whose closing daṇḍa or verse number is set in vermilion. */
export function DevaLine({ text, marker, size, maxWidth }: { text: string; marker?: string; size: number; maxWidth: number }) {
  const runs = [{ text, color: C.ink }];
  if (marker) runs.push({ text: ` ${marker}`, color: C.sindura });
  const shaped = shapeDevanagari(runs, size, maxWidth);
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" src={shaped.src} width={shaped.width} height={shaped.height} />;
}

/** The site's yantra mark, without its bindu: the numeral sits there instead. */
const yantra = (color: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="0.4" stroke-linejoin="round"><circle cx="16" cy="16" r="14.5"/><circle cx="16" cy="16" r="11.75" stroke-width="0.25" opacity="0.6"/><path d="M6.2 10.4h19.6L16 27.2z"/></svg>`,
  ).toString("base64")}`;

const PANEL = 430;

/** The right-hand panel: the shloka's artwork, or the yantra with a numeral for shlokas not yet adorned. */
function Panel({ artId, numeral }: { artId?: string; numeral?: string }) {
  const art = artId ? artDataUri(artId) : null;
  const artWidth = Math.round((CARD_SIZE.height * ART_CROP.w) / ART_CROP.h);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: PANEL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(art ? {} : { backgroundImage: `radial-gradient(circle at 50% 50%, rgba(226,103,76,0.2), rgba(21,16,12,0) 60%)` }),
      }}
    >
      {art ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" src={art} width={artWidth} height={CARD_SIZE.height} style={{ position: "absolute", right: 0, top: 0 }} />
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: 340, height: 340 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={yantra(C.gold)} width={340} height={340} style={{ position: "absolute", opacity: 0.55 }} />
          {numeral && (
            <div style={{ display: "flex", marginTop: -36 }}>
              <Deva text={numeral} size={numeral.length > 2 ? 64 : 88} color={C.sindura} />
            </div>
          )}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 160,
          backgroundImage: `linear-gradient(to right, ${C.bg}, rgba(21,16,12,0))`,
        }}
      />
    </div>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", fontFamily: "Sans", fontSize: 22, letterSpacing: 4, color: C.gold, textTransform: "uppercase" }}>
      {children}
    </div>
  );
}

/** Width available to the text column. */
export const TEXT_WIDTH = CARD_SIZE.width - PANEL - 72 - 24;

/**
 * Cards are sent as JPEG: the glow makes PNGs several hundred kilobytes, and
 * WhatsApp, where most of these links travel, drops previews that heavy.
 */
export const CARD_TYPE = "image/jpeg";

export async function card(props: { children: React.ReactNode; footer: string; artId?: string; numeral?: string }) {
  const png = await (await render(props)).arrayBuffer();
  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": CARD_TYPE, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

/** Satori lays a fragment's children out in a row, so fragments are dissolved into the column. */
function unwrap(node: ReactNode): ReactNode[] {
  return Children.toArray(node).flatMap((child) =>
    isValidElement(child) && child.type === Fragment
      ? unwrap((child as ReactElement<{ children?: ReactNode }>).props.children)
      : [child],
  );
}

async function render({
  children,
  footer,
  artId,
  numeral,
}: {
  children: React.ReactNode;
  footer: string;
  artId?: string;
  numeral?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: C.bg,
          fontFamily: "Garamond",
          color: C.ink,
        }}
      >
        <Panel artId={artId} numeral={numeral} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: TEXT_WIDTH + 72,
            height: "100%",
            padding: "60px 0 52px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>{unwrap(children)}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Sans", fontSize: 22, color: C.muted }}>
            <div style={{ display: "flex", width: 36, height: 2, backgroundColor: C.sindura }} />
            <div style={{ display: "flex" }}>{footer}</div>
            <div style={{ display: "flex", color: C.faint }}>·</div>
            <div style={{ display: "flex", color: C.gold }}>lalita.study</div>
          </div>
        </div>
      </div>
    ),
    { ...CARD_SIZE, fonts: await fonts() },
  );
}
