/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next")
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA(
  withPlaiceholder({
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      })
      return config
    },
    images: {
      qualities: [75, 80, 85, 100],
      minimumCacheTTL: 60,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'www.notion.so',
        },
        {
          protocol: 'https',
          hostname: '*.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
        },
      ],
    },

    // async redirects() {
    //   return [
    //     {
    //       source: '/:path((?!me|tags|friends|archive|categories)[^/]+)',
    //       destination: '/posts/:path*',
    //       permanent: true,
    //     },
    //   ]
    // },
  }))