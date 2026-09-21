export const SITE = {
  name: "Happy Carneval",
  description:
    "Kostīmu noma bērniem un pieaugušajiem, mascoti, animatori un radošās darbnīcas visā Latvijā.",
  url: "https://happycarneval.lv",
  phone: "+371 20 000 000",
  phoneHref: "tel:+37120000000",
  email: "info@happycarneval.lv",
  address: "Brīvības iela 100, Rīga, LV-1001",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000000!2d24.1052!3d56.9496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDU2JzU4LjYiTiAyNMKwMDYnMTguNyJF!5e0!3m2!1slv!2slv!4v1700000000000",
};

export const NAV_LINKS = [
  { label: "Sākums", href: "/" },
  { label: "Kostīmu noma", href: "/kostimu-noma" },
  { label: "Pasākumu organizēšana", href: "/bernu-pasakumi" },
  { label: "Veikals", href: "/veikals" },
  { label: "Par mums", href: "/par-mums" },
  { label: "Kontakti", href: "/kontakti" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
] as const;
