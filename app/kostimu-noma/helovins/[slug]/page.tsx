import CostumeDetail, {
  costumeMetadata,
} from "@/components/costumes/CostumeDetail";

// Viena kostīma lapa. Saturs un izskats: components/costumes/CostumeDetail.tsx
const CATEGORY = "helovins";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Lapas izveidojas pēc pieprasījuma un tiek saglabātas kešatmiņā
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return costumeMetadata(CATEGORY, slug);
}

export default async function CostumePage({ params }: PageProps) {
  const { slug } = await params;
  return <CostumeDetail categoryPath={CATEGORY} slug={slug} />;
}
