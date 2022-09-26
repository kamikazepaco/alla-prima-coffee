/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])

module.exports = withTM ({
  // env: {SQUARE_ACCESS_TOKEN},
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
  },
  image: {
    domains: ['https://square-catalog-sandbox.s3.amazonaws.com'],
  },
})
