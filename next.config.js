/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: [
  //     "arweave.net",
  //     "s2.coinmarketcap.com",
  //     "images.ctfassets.net",
  //     "via.placeholder.com",
  //     "ipfs.io",
  //   ],
  // },

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
