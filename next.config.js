/** @type {import('next.NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', // The domain for your Unsplash images
      'via.placeholder.com', // The domain for your placeholder images
      'placehold.co',        // 👈 Add this new domain
      // Add any other image domains here
    ],
  },
};

module.exports = nextConfig;