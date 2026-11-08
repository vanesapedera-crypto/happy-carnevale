"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS, LANG_LABELS, lp, splitLangPath } from "@/lib/i18n";
import { useLang } from "@/context/LangContext";

/** LV | RU | EN — ved uz to pašu lapu citā valodā. */
export default function LanguageSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const current = useLang();
  const pathname = usePathname() || "/";
  const { path } = splitLangPath(pathname);

  return (
    <div className="flex items-center gap-1 text-sm font-semibold" aria-label="Valoda / Язык / Language">
      {LANGS.map((lang, index) => (
        <span key={lang} className="flex items-center gap-1">
          {index > 0 && <span className="text-gray-300">|</span>}
          {lang === current ? (
            <span className="rounded px-1.5 py-1 text-pink-500" aria-current="true">
              {LANG_LABELS[lang].short}
            </span>
          ) : (
            <Link
              href={lp(lang, path)}
              hrefLang={lang}
              lang={lang}
              title={LANG_LABELS[lang].name}
              onClick={onNavigate}
              className="rounded px-1.5 py-1 text-gray-500 hover:text-pink-500"
            >
              {LANG_LABELS[lang].short}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
