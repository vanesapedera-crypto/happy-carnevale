import Link from "next/link";

type LogoProps = {
  variant?: "dark" | "light";
};

export default function Logo({ variant = "dark" }: LogoProps) {
  const textColor = variant === "dark" ? "text-ink" : "text-white";

  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Happy Carneval — sākums">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-lg">
        🎪
      </span>
      <span className={`text-lg font-semibold tracking-tight ${textColor}`}>
        Happy Carneval
      </span>
    </Link>
  );
}
