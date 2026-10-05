/**
 * Admin panelī augšupielādētie attēli glabājas Supabase Storage.
 * next/image drīkst ielādēt attēlus tikai no šī viena projekta krātuves.
 */
function supabaseImagePatterns() {
  try {
    const { protocol, hostname } = new URL(process.env.SUPABASE_URL ?? "");
    if (protocol !== "https:") return [];
    return [
      {
        protocol: "https",
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabaseImagePatterns(),
  },
};

export default nextConfig;
