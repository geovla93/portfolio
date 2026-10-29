import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
    return process.env.VERCEL_ENV === "preview"
      ? [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
          },
        ]
      : [];
  },
};

export default nextConfig;
