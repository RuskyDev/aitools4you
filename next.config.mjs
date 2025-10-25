/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qmxubuxchxlzzzhxvvcc.supabase.co"
      }
    ],
  },
  allowedDevOrigins: ["192.168.18.19"]
};

export default nextConfig;