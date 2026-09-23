import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";

const cartoons = [
  {
    title: "Ash no Pokemoniem",
    image: "/kostimi/multfilmu/ash-no-pokemoniem.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Bailīgā mūķene",
    image: "/kostimi/multfilmu/bailiga-mukene.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Bings",
    image: "/kostimi/multfilmu/bings.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Čeizs",
    image: "/kostimi/multfilmu/ceizs.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Creeper no Minecraft",
    image: "/kostimi/multfilmu/creeper-no-minecraft.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Cruella",
    image: "/kostimi/multfilmu/cruella.jpg",
    price: "20 €",
    size: "XS-L",
  },
  {
    title: "Dino mazulis",
    image: "/kostimi/multfilmu/Dino mazulis.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Drakula",
    image: "/kostimi/multfilmu/drakula.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Džokers (1)",
    image: "/kostimi/multfilmu/dzokers-1.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Džokers (2)",
    image: "/kostimi/multfilmu/dzokers-2.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Everesta",
    image: "/kostimi/multfilmu/everesta.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Fins",
    image: "/kostimi/multfilmu/fins.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Gabby's Dollhouse",
    image: "/kostimi/multfilmu/gabbu-dollhouse.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Harijs Poters",
    image: "/kostimi/multfilmu/Harijs potters.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Hārlija",
    image: "/kostimi/multfilmu/harlija.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Hello Kitty",
    image: "/kostimi/multfilmu/hello-kitty.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Hermione",
    image: "/kostimi/multfilmu/Hermione.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Joy",
    image: "/kostimi/multfilmu/joy.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Klauns",
    image: "/kostimi/multfilmu/klauns.jpg",
    price: "20 €",
    size: "S-L",
  },
  {
    title: "Labubu (Lillā)",
    image: "/kostimi/multfilmu/labubu-lilla.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Labubu (Rozā)",
    image: "/kostimi/multfilmu/labubu-roza.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Spociņš",
    image: "/kostimi/multfilmu/spocins.jpg",
    price: "20 €",
    size: "XS-L",
  },
  {
    title: "LEGO Ninjago",
    image: "/kostimi/multfilmu/lego-ninjago.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "LOL Balerīna",
    image: "/kostimi/multfilmu/lol-balerina.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "LOL Queen Bee",
    image: "/kostimi/multfilmu/lol-queen-bee.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Luigi",
    image: "/kostimi/multfilmu/luigi.jpg",
    price: "20 €",
    size: "S-L",
  },
  {
    title: "Māršals",
    image: "/kostimi/multfilmu/marsels.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Maša",
    image: "/kostimi/multfilmu/Masa-un-lacis.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Minioni",
    image: "/kostimi/multfilmu/minioni.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Minnija",
    image: "/kostimi/multfilmu/minnija.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "SQUID GAME",
    image: "/kostimi/multfilmu/money-heist-1.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Money Heist",
    image: "/kostimi/multfilmu/money-heist-2.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Pennywise",
    image: "/kostimi/multfilmu/pennywise.jpg",
    price: "20 €",
    size: "M-XL",
  },
  {
    title: "Pepija Garzeķe",
    image: "/kostimi/multfilmu/pepija-garzeke.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Peppa",
    image: "/kostimi/multfilmu/peppa.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Pikaču",
    image: "/kostimi/multfilmu/pikacu.jpg",
    price: "25 €",
    size: "S-XL",
  },
   {
    title: "Avatars",
    image: "/kostimi/multfilmu/avatars.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Pirātu meitene",
    image: "/kostimi/multfilmu/pirata-meitene.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Pirāts (1)",
    image: "/kostimi/multfilmu/pirata-zens-1.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Pirāts (2)",
    image: "/kostimi/multfilmu/pirata-zens-2.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Pomnija",
    image: "/kostimi/multfilmu/pomnija.jpg",
    price: "30 €",
    size: "S-M",
  },
  {
    title: "Poppija",
    image: "/kostimi/multfilmu/poppija.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Ragana",
    image: "/kostimi/multfilmu/Ragana.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Selestija Vienradzis",
    image: "/kostimi/multfilmu/selestija-vienradzis.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Simka",
    image: "/kostimi/multfilmu/simka-no-fiksiki.jpg",
    price: "20 €",
    size: "XS-M",
  },
  {
    title: "Skaja",
    image: "/kostimi/multfilmu/skaja.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Smurfete",
    image: "/kostimi/multfilmu/smurfete.jpg",
    price: "20 €",
    size: "XS-M",
  },
  {
    title: "Soniks",
    image: "/kostimi/multfilmu/soniks.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Šreks",
    image: "/kostimi/multfilmu/sreks.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Stičs",
    image: "/kostimi/multfilmu/stich.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Sūklis Bobs (1)",
    image: "/kostimi/multfilmu/suklis-bobs-1.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Sūklis Bobs (2)",
    image: "/kostimi/multfilmu/suklis-bobs-2.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Super Mario",
    image: "/kostimi/multfilmu/supermario.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Transformeris",
    image: "/kostimi/multfilmu/transformer.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Twilight Sparkle",
    image: "/kostimi/multfilmu/twilight-sparkle-unicorn.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Vienradzis",
    image: "/kostimi/multfilmu/vienradzis.jpg",
    price: "15 €",
    size: "S-L",
  },
  {
    title: "Vinnijs Pūks",
    image: "/kostimi/multfilmu/vinnijs.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Wednesday",
    image: "/kostimi/multfilmu/wednesday.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Zars",
    image: "/kostimi/multfilmu/zars.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Zirnīši",
    image: "/kostimi/multfilmu/zirnisi.jpg",
    price: "20 €",
    size: "XS-M",
  },
   {
    title: "Eglīte",
    image: "/kostimi/ziemassvetki/eglite.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Rūķis",
    image: "/kostimi/ziemassvetki/rukis-smaidulis.jpg",
    price: "30 €",
    size: "XS-XL",
  },
  {
    title: "Sniegbaltīte",
    image: "/kostimi/ziemassvetki/sniegbaltite.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Ziemassvētku vecītis",
    image: "/kostimi/ziemassvetki/ziemassvetku-vecitis.jpg",
    price: "50 €",
    size: "S-XL",
  },
  {
    title: "Grinčš",
    image: "/kostimi/ziemassvetki/grincs.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Lego Ninjago",
    image: "/kostimi/mascotas/lego-ninjago.jpg",
    price: "25 €  ",
    size: "XS-L",
  },
];

export default function MultfilmuSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">

          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Filmu un multfilmu tēli
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

        {/* ================= DESKTOP ================= */}
<div className="hidden lg:grid gap-8 lg:grid-cols-4">
  {cartoons.map((item, index) => (
    <div
      key={`${item.title}-${index}`}
      className="group flex flex-col overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[64px] text-2xl font-bold tracking-tight text-gray-900">
          {item.title}
        </h3>

        <div className="mt-5 flex items-center gap-2 text-pink-600">
          <FiTag className="h-5 w-5" />
          <span className="font-semibold">{item.price}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <TbRulerMeasure className="h-5 w-5" />
          <span>{item.size}</span>
        </div>

        <Link
          href={`/rezervacija-kostimiem?kostims=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&price=${encodeURIComponent(item.price)}&size=${encodeURIComponent(item.size)}`}
          className="mt-auto flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          Rezervēt →
        </Link>
      </div>
    </div>
  ))}
</div>

{/* ================= MOBILE ================= */}
<div className="flex flex-col gap-5 lg:hidden">
  {cartoons.map((item, index) => (
    <div
      key={`${item.title}-${index}`}
      className="overflow-hidden rounded-[26px] bg-white shadow-lg"
    >
      <div className="flex">
        <div className="relative h-44 w-36 shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {item.title}
            </h3>

            <div className="mt-5 flex items-center gap-2 text-pink-600">
              <FiTag className="h-5 w-5" />
              <span className="font-semibold">{item.price}</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-gray-600">
              <TbRulerMeasure className="h-5 w-5" />
              <span>{item.size}</span>
            </div>
          </div>

          <Link
            href={`/rezervacija-kostimiem?kostims=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&price=${encodeURIComponent(item.price)}&size=${encodeURIComponent(item.size)}`}
            className="mt-5 flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 font-semibold text-white"
          >
            Rezervēt →
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>

      </div>
    </section>
  );
}