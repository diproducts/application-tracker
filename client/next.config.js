/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiURL: process.env.URL,
  },
}

module.exports = nextConfig
