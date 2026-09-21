import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="hidden lg:block">
        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={260}
          height={260}
          className="absolute right-32 top-16 z-0 opacity-40"
        />

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={150}
          height={150}
          className="absolute right-12 top-80 z-0 opacity-30"
        />

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={100}
          height={100}
          className="absolute bottom-40 right-[430px] z-0 opacity-25"
        />

        <Image
          src="/images/hero/hero-right.png"
          alt="Burbulīte"
          width={1000}
          height={1100}
          priority
          className="absolute -right-48 bottom-0 z-10 h-[96%] w-auto object-contain"
        />

        <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6">
          <div className="relative -ml-12 w-full max-w-[760px]">
            <Image
              src="/images/hero/hero-bubble.svg"
              alt="Happy Carnevale"
              width={760}
              height={700}
              priority
              className="h-auto w-full"
            />

            <div className="absolute left-1/2 top-[59%] w-[360px] -translate-x-1/2 text-left">
              <p className="text-[18px] leading-8 text-gray-700">
                Priecājos Tevi redzēt!
                <br />
                Pie mums vari iznomāt košus kostīmus,
                <br />
                satikt iemīļotus pasaku tēlus, uzaicināt animatoru
                <br />
                un iegādāties visu milzu ziepju burbuļu salūtam.
              </p>
            </div>

            <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-5">
              <Link
                href="/kostimu-noma"
                className="rounded-full bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-600"
              >
                Kostīmu noma
              </Link>

              <Link
                href="/veikals"
                className="rounded-full border-2 border-pink-500 bg-white px-8 py-4 font-semibold text-pink-500 transition hover:bg-pink-500 hover:text-white"
              >
                Burbulītes burbuļi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex justify-center">
          <Image
            src="/images/hero/hero-right.png"
            alt="Burbulīte"
            width={420}
            height={520}
            priority
            className="h-auto w-[88%] max-w-[320px]"
          />
        </div>

        <div className="-mt-6 rounded-[32px] bg-white p-7 shadow-2xl">
          <h1 className="text-center text-4xl font-bold text-pink-500">Sveiki!</h1>

          <p className="mt-2 text-center text-lg font-medium">Es esmu Burbulīte</p>

          <p className="mt-5 text-center leading-7 text-gray-600">
            Priecājos Tevi redzēt!
            <br />
            Pie mums vari iznomāt košus kostīmus,
            satikt iemīļotus pasaku tēlus,
            uzaicināt animatoru un iegādāties
            milzu ziepju burbuļu šķidrumu.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/kostimu-noma"
              className="rounded-full bg-pink-500 py-4 text-center font-semibold text-white"
            >
              Kostīmu noma
            </Link>

            <Link
              href="/veikals"
              className="rounded-full border-2 border-pink-500 py-4 text-center font-semibold text-pink-500"
            >
              Burbulītes burbuļi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
