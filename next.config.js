/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["utf-8-validate"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
