/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  basePath: "/apps/mov",
  images: { unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "image.tmdb.org" }] },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  swcMinify: true,
};
export default config;
