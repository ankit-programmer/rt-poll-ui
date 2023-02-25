/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com"
      }
    ]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
