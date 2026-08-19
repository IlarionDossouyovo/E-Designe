/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'placehold.co',
      'localhost',
      'res.cloudinary.com',
      'picsum.photos',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Trailing slashes for better compatibility
  trailingSlash: true,
}

module.exports = nextConfig
