/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])

module.exports = withTM ({
  // env: {SQUARE_ACCESS_TOKEN},
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
  },
  images: {
    domains: [
      'square-catalog-sandbox.s3.amazonaws.com',
      'images.squarespace-cdn.com',
      'connect.squareupsandbox.com',
      'images.unsplash.com',

    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/catalog/:path*',
        destination: 'https://https://connect.squareupsandbox.com/v2/catalog/object/:path*',
      },
    ]
  },
})
