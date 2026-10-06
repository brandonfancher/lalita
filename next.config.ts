import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      { source: "/practice", destination: "/chant", permanent: true },
      { source: "/namas", destination: "/namas/list", permanent: false },
    ];
  },
};

export default nextConfig;
