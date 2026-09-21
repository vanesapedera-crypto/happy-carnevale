import Image from "next/image";
import { Gift, PartyPopper, Heart } from "lucide-react";

export default function PartyBoxHero() {
  return (
    <section className="relative overflow-hidden bg-[#fff7fb] pt-36 pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Kreisā puse */}
        <div className="relative">
          <div className="overflow-hidden rounded-[40px] bg-white p-3 shadow-2xl">
            <Image
              src="/images/shop/party-box.png"
              alt="Party Box"
              width={900}
              height={700}
              className="rounded-[30px]"
            />
          </div>

          <div className="absolute left-6 top-6 rotate-[-8deg] rounded-[35px] bg-white px-8 py-8 shadow-xl">
            <h3 className="text-5xl font-black text-[#17223b]">
              Party Box
            </h3>

            <p className="mt-4 text-2xl leading-relaxed text-[#17223b]">
              Viss, kas vajadzīgs
              <br />
              krāšņiem burbuļiem!
            </p>

            <div className="mt-6 text-center text-5xl text-pink-500">
              ♡
            </div>
          </div>
        </div>

        {/* Labā puse */}
        <div className="relative">
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.35em] text-pink-500">
            Party Box
          </span>

          <h1 className="mt-6 text-7xl font-black leading-none text-[#17223b]">
            Party Box
          </h1>

          <h2 className="mt-6 text-5xl font-black leading-tight text-pink-500">
            Izvēlies sev piemērotāko
            <br />
            komplektu un burbuļu
            <br />
            kociņus!
          </h2>

          <p className="mt-8 max-w-xl text-2xl leading-relaxed text-slate-600">
            Party Box ir lielisks komplekts jautrai un aktīvai laika
            pavadīšanai. Tajā atradīsi visu nepieciešamo, lai radītu krāšņus,
            lielus un izturīgus ziepju burbuļus — ideāli bērniem, ģimenes
            pasākumiem un svētkiem.
          </p>

          <div className="mt-14 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-pink-50">
                <Gift className="h-10 w-10 text-pink-500" />
              </div>

              <p className="mt-5 text-xl font-bold text-[#17223b]">
                Lieliska dāvana
                <br />
                bērniem
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-pink-50">
                <PartyPopper className="h-10 w-10 text-pink-500" />
              </div>

              <p className="mt-5 text-xl font-bold text-[#17223b]">
                Piemērots svētkiem
                <br />
                un pasākumiem
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-pink-50">
                <Heart className="h-10 w-10 text-pink-500" />
              </div>

              <p className="mt-5 text-xl font-bold text-[#17223b]">
                Radīts
                <br />
                neaizmirstamiem
                <br />
                mirkļiem
              </p>
            </div>
          </div>

          {/* Dekoratīvais teksts */}
          <div className="absolute -right-4 top-0 rotate-[-10deg] text-right text-4xl font-medium text-pink-500">
            Vairāk prieka
            <br />
            katram mirklim!
          </div>
        </div>
      </div>
    </section>
  );
}