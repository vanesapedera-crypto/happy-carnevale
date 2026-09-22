import HeroSection from "@/components/shop/HeroSection";
import ProductsSection from "@/components/shop/ProductsSection";
import MixedGallery from "@/components/common/MixedGallery";

export default function VeikalsPage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />

      <MixedGallery
        items={[
          { type: "image", src: "/images/shop/gallery/1.jpg", alt: "Burbuļu bilde 1" },
          { type: "image", src: "/images/shop/gallery/2.jpg", alt: "Burbuļu bilde 2" },
          { type: "image", src: "/images/shop/gallery/3.jpg", alt: "Burbuļu bilde 3" },
          { type: "image", src: "/images/shop/gallery/4.jpg", alt: "Burbuļu bilde 4" },
          { type: "image", src: "/images/shop/gallery/5.jpg", alt: "Burbuļu bilde 5" },
          { type: "image", src: "/images/shop/gallery/6.jpg", alt: "Burbuļu bilde 6" },
          { type: "image", src: "/images/shop/gallery/7.jpg", alt: "Burbuļu bilde 7" },
          { type: "image", src: "/images/shop/gallery/8.jpg", alt: "Burbuļu bilde 8" },
          { type: "image", src: "/images/shop/gallery/9.jpg", alt: "Burbuļu bilde 9" },
          { type: "image", src: "/images/shop/gallery/10.jpg", alt: "Burbuļu bilde 10" },
          { type: "image", src: "/images/shop/gallery/11.jpg", alt: "Burbuļu bilde 11" },
          { type: "image", src: "/images/shop/gallery/12.jpg", alt: "Burbuļu bilde 12" },
          { type: "image", src: "/images/shop/gallery/13.jpg", alt: "Burbuļu bilde 13" },
          { type: "image", src: "/images/shop/gallery/14.jpg", alt: "Burbuļu bilde 14" },
          { type: "image", src: "/images/shop/gallery/15.jpg", alt: "Burbuļu bilde 15" },
          { type: "image", src: "/images/shop/gallery/16.jpg", alt: "Burbuļu bilde 16" },
        ]}
      />
    </>
  );
}