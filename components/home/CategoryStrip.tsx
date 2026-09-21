import Link from "next/link";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/lib/data";

export default function CategoryStrip() {
  return (
    <section className="border-y border-ink/5 bg-white py-8">
      <Container>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="group flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
            >
              <span className="text-lg">{category.emoji}</span>
              {category.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
