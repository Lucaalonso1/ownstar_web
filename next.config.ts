import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async rewrites() {
    return [
      // Proxy para permitir checkout directo si Shopify lo permite
      {
        source: "/shopify-checkout/:path*",
        destination: "https://ownstarco.myshopify.com/cart/:path*",
      },
      {
        source: "/checkouts/:path*",
        destination: "https://ownstarco.myshopify.com/checkouts/:path*",
      }
    ];
  },
};

export default nextConfig;
