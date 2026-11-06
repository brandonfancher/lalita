import { chantVerse } from "@/lib/chant-verses";
import { getAllModuleIds, getModule } from "@/lib/content";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllModuleIds().map((id) => ({ file: `${id}.json` }));
}

/** One shloka for the chant page, which loads the range it is asked for from these. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  return Response.json(chantVerse(getModule(file.replace(/\.json$/, ""))));
}
