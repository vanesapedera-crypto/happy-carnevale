import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-primary hover:bg-primary/90 hover:shadow-lg",
  secondary:
    "bg-secondary text-white shadow-secondary hover:bg-secondary/90 hover:shadow-lg",
  outline:
    "bg-white text-ink border border-ink/10 hover:border-ink/20 hover:bg-ink/[0.03]",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-all duration-300 ease-out active:scale-[0.98]";

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const styles = `${baseStyles} ${VARIANT_STYLES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
