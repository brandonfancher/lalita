import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  return {
    // The whole site is static files in `out/`, served as `vercel.json` describes, which also
    // holds the redirects. The one thing needing a server, the contact form, posts to `api/`.
    output: "export",
    // `.dev.ts` route handlers stand in for `api/` functions under `next dev` only.
    pageExtensions:
      phase === PHASE_DEVELOPMENT_SERVER ? ["dev.ts", "tsx", "ts", "jsx", "js"] : ["tsx", "ts", "jsx", "js"],
    // Loads its WebAssembly relative to its own module, so it has to stay unbundled.
    serverExternalPackages: ["harfbuzzjs"],
  };
}
