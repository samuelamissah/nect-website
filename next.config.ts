import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zukjqyfjguwjugdpswqs.supabase.co",
      },
    ],
  },
};

export default nextConfig;
