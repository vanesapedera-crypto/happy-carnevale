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
    // Mazāk izmēru variantu = mazāk bilžu apstrāžu un biežāk gatava bilde no kešatmiņas.
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [48, 96, 160, 256, 384],
    // Apstrādātās bildes glabā 31 dienu (citādi Vercel tās pārstrādā atkal un atkal).
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
