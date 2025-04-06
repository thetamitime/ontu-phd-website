import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ontu.edu.ua",
        pathname: "/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5124/api/:path*", // The backend API URL
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/apply-documents",
        destination: "/apply-documents/phd",
        permanent: true,
      },
      {
        source: "/apply-roadmap",
        destination: "/apply-roadmap/phd",
        permanent: true,
      },
      {
        source: "/defence",
        destination: "/defence/phd",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
