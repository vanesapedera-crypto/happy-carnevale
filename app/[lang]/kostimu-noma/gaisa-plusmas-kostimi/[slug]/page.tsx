import CostumeDetail, {
  costumeMetadata,
} from "@/components/costumes/CostumeDetail";
import { toLang } from "@/lib/i18n";

// Viena kostīma lapa. Saturs un izskats: components/costumes/CostumeDetail.tsx
const CATEGORY = "gaisa-plusmas-kostimi";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

// Lapas izveidojas pēc pieprasījuma un tiek saglabātas kešatmiņā
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  return costumeMetadata(CATEGORY, slug, toLang(lang));
}

export default async function CostumePage({ params }: PageProps) {
  const { lang, slug } = await params;
  return <CostumeDetail categoryPath={CATEGORY} slug={slug} lang={toLang(lang)} />;
}
