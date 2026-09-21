export type Category = {
  emoji: string;
  label: string;
  href: string;
};

export const CATEGORIES: Category[] = [
  { emoji: "🎭", label: "Kostīmu noma", href: "/kostimu-noma" },
  { emoji: "🦸", label: "Mascoti", href: "/kostimu-noma#mascoti" },
  { emoji: "👑", label: "Pasaku tēli", href: "/kostimu-noma#pasaku-teli" },
  {
    emoji: "🎈",
    label: "Gaisa plūsmas kostīmi",
    href: "/kostimu-noma#gaisa-plusmas",
  },
  { emoji: "🫧", label: "Veikals", href: "/veikals" },
  {
    emoji: "🎨",
    label: "Radošās darbnīcas",
    href: "/bernu-pasakumi#darbnicas",
  },
];

export type BentoService = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  size: "large" | "medium" | "small";
  accent: "primary" | "secondary" | "accent" | "sunshine";
};

export const BENTO_SERVICES: BentoService[] = [
  {
    id: "kostimu-noma",
    title: "Kostīmu noma",
    description:
      "Simtiem kostīmu bērniem un pieaugušajiem — no pasaku varoņiem līdz svētku klasikai.",
    href: "/kostimu-noma",
    image:
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=1600&auto=format&fit=crop",
    size: "large",
    accent: "primary",
  },
  {
    id: "mascoti",
    title: "Mascoti",
    description: "Iemīļoti tēli, kas iepriecina viesus jebkurā pasākumā.",
    href: "/kostimu-noma#mascoti",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
    accent: "secondary",
  },
  {
    id: "pasaku-teli",
    title: "Pasaku tēli",
    description: "Princeses, supervaroņi un citi bērnu iecienīti tēli.",
    href: "/kostimu-noma#pasaku-teli",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
    accent: "sunshine",
  },
  {
    id: "gaisa-plusmas",
    title: "Gaisa plūsmas kostīmi",
    description: "Lieli, kustīgi un neaizmirstami — īsti pasākuma centrpunkti.",
    href: "/kostimu-noma#gaisa-plusmas",
    image:
      "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    accent: "accent",
  },
  {
    id: "animatori",
    title: "Animatori",
    description: "Pieredzējuši animatori, kas vada spēles un rada svētku noskaņu.",
    href: "/bernu-pasakumi#animatori",
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    accent: "primary",
  },
  {
    id: "darbnicas",
    title: "Radošās darbnīcas",
    description: "Zīmēšana, rokdarbi un radošas aktivitātes bērniem.",
    href: "/bernu-pasakumi#darbnicas",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    accent: "secondary",
  },
  {
    id: "glitter",
    title: "Glitter tetovējumi",
    description: "Spilgti, mirdzoši motīvi ikvienam svētku dalībniekam.",
    href: "/bernu-pasakumi#glitter",
    image:
      "https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    accent: "sunshine",
  },
  {
    id: "veikals",
    title: "Veikals",
    description: "Ziepju burbuļi un svētku piederumi, ko paņemt līdzi mājās.",
    href: "/veikals",
    image:
      "https://images.unsplash.com/photo-1602524206694-4ee98243bb2f?q=80&w=1200&auto=format&fit=crop",
    size: "medium",
    accent: "accent",
  },
];

export type Costume = {
  id: string;
  name: string;
  image: string;
};

export const POPULAR_COSTUMES: Costume[] = [
  {
    id: "princese-aurora",
    name: "Princese Aurora",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "zvaigznu-varonis",
    name: "Zvaigžņu varonis",
    image:
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "mezha-karaliene",
    name: "Meža karaliene",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "piraatu-kapteinis",
    name: "Pirātu kapteinis",
    image:
      "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "superzeni",
    name: "Superzēns",
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: "vela-dejotaja",
    name: "Vēla dejotāja",
    image:
      "https://images.unsplash.com/photo-1603336423416-e0f8c6c4e6c5?q=80&w=900&auto=format&fit=crop",
  },
];

export type Benefit = {
  title: string;
  description: string;
  emoji: string;
};

export const BENEFITS: Benefit[] = [
  {
    emoji: "🧵",
    title: "Plašs klāsts",
    description:
      "Simtiem kostīmu visos izmēros — no maziem bērniem līdz pieaugušajiem.",
  },
  {
    emoji: "✨",
    title: "Nevainojama kvalitāte",
    description: "Katrs kostīms tiek kopts, tīrīts un pārbaudīts pirms izsniegšanas.",
  },
  {
    emoji: "⏱️",
    title: "Ātra rezervācija",
    description: "Piemeklē un rezervē tēlu dažu minūšu laikā, tiešsaistē vai klātienē.",
  },
  {
    emoji: "🎪",
    title: "Viss vienuviet",
    description: "Kostīmi, animatori, darbnīcas un dekori — viens partneris visam pasākumam.",
  },
  {
    emoji: "💛",
    title: "Ģimenisks serviss",
    description: "Personīga pieeja katram klientam un rūpes par katru detaļu.",
  },
];
