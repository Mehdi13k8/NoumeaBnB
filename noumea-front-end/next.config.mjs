/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/noumea',
  basePath: "",
  images: {
    domains: ["picsum.photos"],
    unoptimized: true
  },
  output: 'export',
};

export default nextConfig;
