/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["http://localhost:1337/", "http://localhost", "localhost"],

  },
  output: 'export',
  basePath: '/day-decor',
  assetPrefix: '/day-decor/',
  serverRuntimeConfig: {
    rsaPrivateKey: process.env.RSA_PRIVATE_KEY,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
  },
  publicRuntimeConfig: {
    mongoURI: process.env.MONGODB_URI,
    mongoDB: process.env.MONGODB_DB,
    hostUrl: process.env.HOST_URL,
    apiUrl: process.env.API_URL,
    rsaPublicKey: process.env.RSA_PUBLIC_KEY,
  },
};