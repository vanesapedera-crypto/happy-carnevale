export const SITE = {
  name: "Happy Carnevale",
  description:
    "Kostīmu noma bērniem un pieaugušajiem, mascoti, animatori un radošās darbnīcas visā Latvijā.",
  url: "https://happycarnevale.lv",
  phone: "+371 26 126 313",
  phoneHref: "tel:+37126126313",
  email: "carnevalehappy@gmail.com",
  address: "Stabu iela 90, Rīga, LV-1009",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000000!2d24.1052!3d56.9496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDU2JzU4LjYiTiAyNMKwMDYnMTguNyJF!5e0!3m2!1slv!2slv!4v1700000000000",
};

export const NAV_LINKS = [
  { label: "Sākums", href: "/" },
  { label: "Kostīmu noma", href: "/kostimu-noma" },
  { label: "Pasākumu organizēšana", href: "/bernu-pasakumi" },
  { label: "Burbulītes burbuļi", href: "/veikals" },
  { label: "Kontakti", href: "/kontakti" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Burbulitesburbuli",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/burbulites_burbuli/",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@burbulitesburbuli",
  },
] as const;
