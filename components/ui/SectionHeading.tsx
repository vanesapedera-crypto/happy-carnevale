type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {kicker && (
        <span className="text-sm font-medium text-secondary">{kicker}</span>
      )}
      <h2 className="text-balance text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-ink/60">{description}</p>
      )}
    </div>
  );
}
