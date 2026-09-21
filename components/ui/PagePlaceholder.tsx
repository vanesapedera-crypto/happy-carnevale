import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type PagePlaceholderProps = {
  kicker: string;
  title: string;
  description: string;
};

export default function PagePlaceholder({
  kicker,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col items-start gap-6 border-b border-ink/5 pb-16">
        <span className="rounded-full bg-secondary-soft px-4 py-2 text-sm font-medium text-secondary">
          {kicker}
        </span>
        <h1 className="text-balance text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-ink/60">
          {description}
        </p>
        <Button href="/kontakti" variant="primary">
          Sazināties ar mums
        </Button>
      </Container>
    </section>
  );
}
