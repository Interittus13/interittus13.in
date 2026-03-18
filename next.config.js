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
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'static.anzifan.com'
        },
        {
          protocol: 'https',
          hostname: 'cdn.sspai.com'
        },
        {
          protocol: 'https',
          hostname: 'cdn.dribbble.com'
        },
        {
          protocol: 'https',
          hostname: 'image.freepik.com'
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'cdn.jsdelivr.net'
        },
        {
          protocol: 'https',
          hostname: 'image.cugxuan.cn'
        },
        {
          protocol: 'https',
          hostname: 'blog-static.mikuchan.top'
        },
        {
          protocol: 'https',
          hostname: 'amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: 'img.zhheo.com'
        },
        {
          protocol: 'https',
          hostname: 'www.aohuiliu.fun'
        },
        {
          protocol: 'https',
          hostname: 'rxhsk.xicp.fun'
        },
        {
          protocol: 'https',
          hostname: 'www.fomal.cc'
        },
        {
          protocol: 'https',
          hostname: 'www.notion.so'
        },
        {
          protocol: 'https',
          hostname: 'lh5.googleusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 's3-us-west-2.amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: '*.amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org'
        },
      ]
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