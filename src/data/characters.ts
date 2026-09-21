export type CharacterCategory =
  | "animators"
  | "maskots"
  | "gaisa-kostims";

export interface Character {
  id: number;
  title: string;
  image: string;
  category: CharacterCategory;
}

export const characters: Character[] = [
  // ========================
  // ANIMATORI
  // ========================

  {
    id: 1,
    title: "Elza",
    image: "/images/personazi/elza.jpg",
    category: "animators",
  },
  {
    id: 2,
    title: "Anna",
    image: "/images/personazi/anna.jpg",
    category: "animators",
  },
  {
    id: 3,
    title: "Spider-Man",
    image: "/images/personazi/spiderman.jpg",
    category: "animators",
  },

  // ========================
  // MASKOTI
  // ========================

  {
    id: 101,
    title: "Mikipele",
    image: "/images/maskoti/mikipele.jpg",
    category: "maskots",
  },
  {
    id: 102,
    title: "Minnija",
    image: "/images/maskoti/minnija.jpg",
    category: "maskots",
  },

  // ========================
  // GAISA KOSTĪMI
  // ========================

  {
    id: 201,
    title: "T-Rex",
    image: "/images/gaisa-kostimi/trex.jpg",
    category: "gaisa-kostims",
  },
];