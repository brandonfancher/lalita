import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Loads its WebAssembly relative to its own module, so it has to stay unbundled.
  serverExternalPackages: ["harfbuzzjs"],
  redirects() {
    return [
      { source: "/practice", destination: "/chant", permanent: true },
      { source: "/namas", destination: "/namas/list", permanent: false },
    ];
  },
};

export default nextConfig;
