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
}

module.exports = nextConfig
