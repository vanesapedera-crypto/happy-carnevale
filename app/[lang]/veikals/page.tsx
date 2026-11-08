import type { Metadata } from "next";
import ProductsSection from "@/components/shop/ProductsSection";
import MixedGallery from "@/components/common/MixedGallery";
import BubbleInfoSection from "@/components/shop/BubbleInfoSection";

import { pageMetadata, toLang, tr } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/veikals", {
    title: {
      lv: "Ziepju burbuļi – milzu burbuļu šķidrums un kociņi | Burbulītes burbuļi",
      ru: "Мыльные пузыри – жидкость и палочки для гигантских пузырей | Burbulītes burbuļi",
      en: "Soap bubbles – giant bubble solution and wands | Burbulītes burbuļi",
    },
    description: {
      lv: "Profesionāls milzu ziepju burbuļu koncentrāts, burbuļu kociņi un Party Box komplekti. Saņemšana Rīgā vai piegāde uz jebkuru pakomātu.",
      ru: "Профессиональный концентрат для гигантских мыльных пузырей, палочки для пузырей и наборы Party Box. Самовывоз в Риге или доставка в любой пакомат.",
      en: "Professional giant soap bubble concentrate, bubble wands and Party Box sets. Pick up in Riga or delivery to any parcel locker.",
    },
  });
}

export default async function VeikalsPage({ params }: Props) {
  const lang = toLang((await params).lang);
  const photo = tr(lang, {
    lv: "Milzu ziepju burbuļi – foto",
    ru: "Гигантские мыльные пузыри – фото",
    en: "Giant soap bubbles – photo",
  });
  return (
    <>
      <ProductsSection />

      <MixedGallery
        items={[
          { type: "image", src: "/images/shop/gallery/1.jpg", alt: `${photo} 1` },
          { type: "image", src: "/images/shop/gallery/2.jpg", alt: `${photo} 2` },
          { type: "image", src: "/images/shop/gallery/3.jpg", alt: `${photo} 3` },
          { type: "image", src: "/images/shop/gallery/4.jpg", alt: `${photo} 4` },
          { type: "image", src: "/images/shop/gallery/5.jpg", alt: `${photo} 5` },
          { type: "image", src: "/images/shop/gallery/6.jpg", alt: `${photo} 6` },
          { type: "image", src: "/images/shop/gallery/7.jpg", alt: `${photo} 7` },
          { type: "image", src: "/images/shop/gallery/8.jpg", alt: `${photo} 8` },
          { type: "image", src: "/images/shop/gallery/10.jpg", alt: `${photo} 10` },
          { type: "image", src: "/images/shop/gallery/11.jpg", alt: `${photo} 11` },
          { type: "image", src: "/images/shop/gallery/12.jpg", alt: `${photo} 12` },
          { type: "image", src: "/images/shop/gallery/13.jpg", alt: `${photo} 13` },
          { type: "image", src: "/images/shop/gallery/14.jpg", alt: `${photo} 14` },
          { type: "image", src: "/images/shop/gallery/15.jpg", alt: `${photo} 15` },
          { type: "image", src: "/images/shop/gallery/16.jpg", alt: `${photo} 16` },
        ]}
      />

      <BubbleInfoSection lang={lang} />
    </>
  );
}