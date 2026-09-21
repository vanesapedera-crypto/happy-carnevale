import Image from "next/image";
import Link from "next/link";

export default function CostumeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Kreisā puse */}
          <div>

            <span className="inline-flex rounded-full bg-violet-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-violet-600">
              Kostīmu noma
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
              Izvēlies savu
              <span className="block text-violet-500">
                tēlu!
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-gray-600">
              Plaša kostīmu izvēle bērniem un pieaugušajiem dažādiem
              pasākumiem – dzimšanas dienām, bērnudārziem,
              korporatīvajiem pasākumiem, Helovīnam,
              Ziemassvētkiem un citiem svētkiem.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#kategorijas"
                className="rounded-full bg-violet-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-violet-600"
              >
                Skatīt kostīmus →
              </a>

              <a
                href="/kontakti"
                className="rounded-full border-2 border-violet-500 px-8 py-4 text-lg font-bold text-violet-500 transition hover:bg-violet-50"
              >
                Sazināties
              </a>

            </div>

          </div>

          {/* Labā puse */}
          <div className="relative flex justify-center">

            {/* Rozā aplis fonā */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-100 blur-3xl" />

            <Image
              src="/images/costumes/hero.png"
              alt="Kostīmu noma"
              width={650}
              height={650}
              priority
              className="relative z-10"
            />

          </div>

        </div>

      </div>

      {/* Dekori */}
      <div className="absolute left-10 top-20 h-6 w-6 rounded-full bg-violet-300" />
      <div className="absolute right-16 top-36 h-4 w-4 rounded-full bg-yellow-300" />
      <div className="absolute bottom-16 left-1/4 h-5 w-5 rounded-full bg-violet-200" />
      <div className="absolute right-1/3 bottom-10 h-7 w-7 rounded-full bg-purple-200" />
    </section>
  );
}
{/* GALVENĀS KATEGORIJAS */}

<section className="bg-[#fff8fb] pb-24">
  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-14 text-center">

      <div className="flex items-center justify-center gap-5">

        <div className="h-px w-32 bg-violet-200" />

        <span className="text-lg font-black uppercase tracking-[0.35em] text-violet-500">
          Galvenās kategorijas
        </span>

        <div className="h-px w-32 bg-violet-200" />

      </div>

    </div>

    <div className="grid gap-8 lg:grid-cols-4">

      {/* Mascoti */}
      <Link
        href="/kostimu-noma/lielie-mascoti"
        className="group overflow-hidden rounded-[35px] bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="relative h-[340px]">

          <Image
            src="/images/categories/stitch.png"
            alt="Mascoti"
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 p-8 text-white">

            <h3 className="text-4xl font-black leading-tight">
              Lielie
              <br />
              Mascota tēli
            </h3>

            <p className="mt-3 text-lg text-white/90">
              Iespaidīgi tēli,
              kas vienmēr sagādā prieku.
            </p>

            <span className="mt-6 inline-flex rounded-full bg-violet-500 px-6 py-3 font-bold">
              Skatīt kostīmus →
            </span>

          </div>

        </div>
      </Link>

      {/* Zaķi */}
      <Link
        href="/kostimu-noma/gaisa-plusmas"
        className="group overflow-hidden rounded-[35px] bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="relative h-[340px]">

          <Image
            src="/images/categories/rabbit.png"
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

          <div className="absolute bottom-0 p-8 text-white">

            <h3 className="text-4xl font-black">
              Gaisa
              <br />
              plūsmas
              <br />
              kostīmi
            </h3>

            <p className="mt-3">
              Viegli, ērti un spilgti
              pasākumiem.
            </p>

            <span className="mt-6 inline-flex rounded-full bg-violet-500 px-6 py-3 font-bold">
              Skatīt kostīmus →
            </span>

          </div>

        </div>
      </Link>

      {/* Filmas */}
      <Link
        href="/kostimu-noma/filmu"
        className="group overflow-hidden rounded-[35px] bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="relative h-[340px]">

          <Image
            src="/images/categories/minion.png"
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

          <div className="absolute bottom-0 p-8 text-white">

            <h3 className="text-4xl font-black">
              Filmu un
              <br />
              multfilmu
              <br />
              tēli
            </h3>

            <p className="mt-3">
              Iemīļoti varoņi
              bērnu svētkiem.
            </p>

            <span className="mt-6 inline-flex rounded-full bg-violet-500 px-6 py-3 font-bold">
              Skatīt kostīmus →
            </span>

          </div>

        </div>
      </Link>

      {/* Citi */}
      <Link
        href="/kostimu-noma/citi"
        className="group overflow-hidden rounded-[35px] bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="relative h-[340px]">

          <Image
            src="/images/categories/shark.png"
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

          <div className="absolute bottom-0 p-8 text-white">

            <h3 className="text-4xl font-black">
              Citi
              <br />
              tēli
            </h3>

            <p className="mt-3">
              Dažādi kostīmi
              jebkuram pasākumam.
            </p>

            <span className="mt-6 inline-flex rounded-full bg-violet-500 px-6 py-3 font-bold">
              Skatīt kostīmus →
            </span>

          </div>

        </div>
      </Link>

    </div>
  </div>
</section>