/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // Optionnel : utile si vous utilisez aussi les miniatures YouTube !
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;