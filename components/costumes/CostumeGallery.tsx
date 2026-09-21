"use client";

import Image from "next/image";

type Props = {
  title: string;
  folder: string;
  costumes: string[];
};

export default function CostumeGallery({
  title,
  folder,
  costumes,
}: Props) {
  return (
    <section className="bg-violet-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-center text-5xl font-black">
          {title}
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {costumes.map((costume) => (
            <div
              key={costume}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={`/kostimi/${folder}/${costume}.jpg`}
                  alt={costume}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-center text-lg font-bold capitalize">
                  {costume.replaceAll("-", " ")}
                </h2>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}