import Image from "next/image";

export default function PartyBoxHero() {
  return (
    <section className="bg-[#fff7fb] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* Bilde */}
        <div className="flex justify-center">
          <Image
            src="/images/shop/party-box.png"
            alt="Party Box"
            width={650}
            height={650}
            className="w-full max-w-lg object-contain"
            priority
          />
        </div>

        {/* Saturs */}
        <div>
          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
            Party Box
          </span>

          <h1 className="mt-5 text-5xl font-black text-[#17223b]">
            Party Box
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 text-gray-600">
            Viss nepieciešamais, lai radītu lielus un izturīgus ziepju
            burbuļus. Ideāli bērnu ballītēm, ģimenes pasākumiem un svētkiem.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-5 py-3 font-semibold text-pink-600 shadow">
              ✓ 5L želeja
            </span>

            <span className="rounded-full bg-white px-5 py-3 font-semibold text-pink-600 shadow">
              ✓ Burbuļu kociņi
            </span>

            <span className="rounded-full bg-white px-5 py-3 font-semibold text-pink-600 shadow">
              ✓ Gatavs svētkiem
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}