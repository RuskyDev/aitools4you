/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "qmxubuxchxlzzzhxvvcc.supabase.co"
      }
    ],
  },
};

export default nextConfig;