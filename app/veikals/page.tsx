import type { Metadata } from "next";
import ProductsSection from "@/components/shop/ProductsSection";
import MixedGallery from "@/components/common/MixedGallery";

export const metadata: Metadata = {
  title: "Milzu ziepju burbuļu šķidrums un kociņi | Burbulītes burbuļi",
  description:
    "Profesionāls milzu ziepju burbuļu koncentrāts, burbuļu kociņi un Party Box komplekti. Saņemšana Rīgā vai piegāde uz jebkuru pakomātu.",
};

export default function VeikalsPage() {
  return (
    <>
      <ProductsSection />

      <MixedGallery
        items={[
          { type: "image", src: "/images/shop/gallery/1.jpg", alt: "Milzu ziepju burbuļi – foto 1" },
          { type: "image", src: "/images/shop/gallery/2.jpg", alt: "Milzu ziepju burbuļi – foto 2" },
          { type: "image", src: "/images/shop/gallery/3.jpg", alt: "Milzu ziepju burbuļi – foto 3" },
          { type: "image", src: "/images/shop/gallery/4.jpg", alt: "Milzu ziepju burbuļi – foto 4" },
          { type: "image", src: "/images/shop/gallery/5.jpg", alt: "Milzu ziepju burbuļi – foto 5" },
          { type: "image", src: "/images/shop/gallery/6.jpg", alt: "Milzu ziepju burbuļi – foto 6" },
          { type: "image", src: "/images/shop/gallery/7.jpg", alt: "Milzu ziepju burbuļi – foto 7" },
          { type: "image", src: "/images/shop/gallery/8.jpg", alt: "Milzu ziepju burbuļi – foto 8" },
          { type: "image", src: "/images/shop/gallery/10.jpg", alt: "Milzu ziepju burbuļi – foto 10" },
          { type: "image", src: "/images/shop/gallery/11.jpg", alt: "Milzu ziepju burbuļi – foto 11" },
          { type: "image", src: "/images/shop/gallery/12.jpg", alt: "Milzu ziepju burbuļi – foto 12" },
          { type: "image", src: "/images/shop/gallery/13.jpg", alt: "Milzu ziepju burbuļi – foto 13" },
          { type: "image", src: "/images/shop/gallery/14.jpg", alt: "Milzu ziepju burbuļi – foto 14" },
          { type: "image", src: "/images/shop/gallery/15.jpg", alt: "Milzu ziepju burbuļi – foto 15" },
          { type: "image", src: "/images/shop/gallery/16.jpg", alt: "Milzu ziepju burbuļi – foto 16" },
        ]}
      />
    </>
  );
}