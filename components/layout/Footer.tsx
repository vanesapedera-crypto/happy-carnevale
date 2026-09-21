import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/5 bg-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink/55">
            {SITE.description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Navigācija</span>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/55 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Kontakti</span>
          <a href={SITE.phoneHref} className="text-sm text-ink/55 hover:text-primary">
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-ink/55 hover:text-primary"
          >
            {SITE.email}
          </a>
          <span className="text-sm text-ink/55">{SITE.address}</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-ink">Seko līdzi</span>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink/55 hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-ink/5 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink/40 sm:flex-row">
          <span>© {year} Happy Carnevale. Visas tiesības aizsargātas.</span>
          <span>Rīga, Latvija</span>
        </Container>
      </div>
    </footer>
  );
}
