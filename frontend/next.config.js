/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    PUBLIC_ID_COLLECTION: process.env.PUBLIC_ID_COLLECTION,
  },
};

module.exports = nextConfig;
