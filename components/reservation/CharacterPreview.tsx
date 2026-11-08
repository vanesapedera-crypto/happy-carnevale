import Image from "next/image";
import { WandSparkles } from "lucide-react";
import { useTr } from "@/context/LangContext";

interface CharacterPreviewProps {
  image?: string | null;
  sizes: string;
}

/** Izvēlētā tēla bilde vai, ja tēls vēl nav izvēlēts, rozā tukšais stāvoklis (nevis salauzta bilde). */
export default function CharacterPreview({ image, sizes }: CharacterPreviewProps) {
  const t = useTr();
  if (!image) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-pink-50 text-pink-400">
        <WandSparkles size={36} strokeWidth={1.6} />
        <span className="text-sm font-semibold">
          {t({ lv: "Tēls vēl nav izvēlēts", ru: "Персонаж ещё не выбран", en: "No character chosen yet" })}
        </span>
      </div>
    );
  }
  return <Image src={image} alt="" fill sizes={sizes} className="object-cover" />;
}
