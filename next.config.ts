import type { NextConfig } from "next";
import {
  buildContentSecurityPolicy,
  YOUTUBE_IMAGE_HOSTS,
} from "./src/lib/youtube-domains";

const nextConfig: NextConfig = {
  // Allow YouTube thumbnail hosts as optimized `next/image` remote sources.
  images: {
    remotePatterns: YOUTUBE_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },

  // Apply a Content-Security-Policy that allowlists the YouTube domains needed
  // to embed videos (player frame, scripts, thumbnails, streams and API).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
