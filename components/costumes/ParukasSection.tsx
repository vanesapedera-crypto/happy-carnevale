import Image from "next/image";
import Link from "next/link";

const parukas = Array.from({ length: 60 }, (_, index) => {
  const n = index + 1;

  return {
    title: `Parūka ${n}`,
    image: `/kostimi/parukas/paruka-${n}.jpg`,
    price: "12 € / līdz 3 diennaktīm",
    size: "One size",
  };
});

export default function ParukasSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">Parūkas</h2>
            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Krāsainas, smieklīgas un tēliem atbilstošas parūkas dažādiem
              pasākumiem, kostīmiem un svētkiem.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {parukas.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>

                  <div className="mt-5 inline-flex w-fit rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-600">
                    {item.price}
                  </div>

                  <p className="mt-4 text-gray-600">{item.size}</p>

                  <Link
                    href={`/rezervacija-kostimiem?kostims=${encodeURIComponent(
                      item.title,
                    )}&image=${encodeURIComponent(
                      item.image,
                    )}&price=${encodeURIComponent(
                      item.price,
                    )}&size=${encodeURIComponent(item.size)}`}
                    className="mt-7 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    Rezervēt →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}