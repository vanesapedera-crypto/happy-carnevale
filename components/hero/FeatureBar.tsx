import Link from "next/link";
import {
  Sparkles,
  Shirt,
  PartyPopper,
  Store,
  Palette,
} from "lucide-react";

const features = [
  {
    title: "Kostīmu noma",
    icon: Shirt,
    href: "/kostimu-noma",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Mascoti",
    icon: Sparkles,
    href: "/kostimu-noma#mascoti",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Animatori",
    icon: PartyPopper,
    href: "/pasakumi",
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Darbnīcas",
    icon: Palette,
    href: "/pasakumi",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Veikals",
    icon: Store,
    href: "/veikals",
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function FeatureBar() {
  return (
    <section className="-mt-16 relative z-40">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-[36px] bg-white shadow-2xl p-4">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {features.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-3xl p-6 transition duration-300 hover:-translate-y-2 hover:bg-pink-50"
                >
                  <div
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Apskatīt →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}