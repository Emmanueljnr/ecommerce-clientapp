/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', //reduces the size of Next js
    images: {
      domains: ['cdn.sanity.io'],
    },
    async redirects() {
      return [
        {
          source: '/cancel',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;

  