import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load the dev server's assets. Dev only; ignored in production.
  allowedDevOrigins: ["192.168.1.170", "nicks-vivrelle-macbook-pro.local"],
  images: {
    remotePatterns: [
      // Placeholder photos used until the journal has a real home (S3 or Vercel Blob).
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
