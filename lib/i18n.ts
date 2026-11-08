import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/**
 * Mājaslapas valodas.
 * Latviešu (lv) ir galvenā: tās adreses ir bez prefiksa (/kostimu-noma).
 * Krievu un angļu adreses sākas ar /ru un /en (/ru/kostimu-noma).
 * Iekšēji (app/[lang]) latviešu lapas dzīvo zem /lv — to dara middleware.ts.
 */
export const LANGS = ["lv", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "lv";

/** Svešvalodas, kurām ir prefikss adresē. */
export const PREFIXED_LANGS: Lang[] = ["ru", "en"];

export const LANG_LABELS: Record<Lang, { short: string; name: string }> = {
  lv: { short: "LV", name: "Latviešu" },
  ru: { short: "RU", name: "Русский" },
  en: { short: "EN", name: "English" },
};

/** HTML lang un OpenGraph locale katrai valodai. */
export const LANG_LOCALE: Record<Lang, string> = {
  lv: "lv_LV",
  ru: "ru_RU",
  en: "en_US",
};

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** Droši pārvērš parametru par valodu (nezināmu — par latviešu). */
export function toLang(value: unknown): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}

/**
 * Lapas adrese izvēlētajā valodā.
 * lp("ru", "/kostimu-noma") -> "/ru/kostimu-noma"; lp("lv", "/") -> "/".
 * Ārējas saites (http, tel:, mailto:, #) atgriež nemainītas.
 */
export function lp(lang: Lang, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (lang === DEFAULT_LANG) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** No pārlūka adreses atdala valodu un ceļu bez prefiksa. */
export function splitLangPath(pathname: string): { lang: Lang; path: string } {
  const match = pathname.match(/^\/(ru|en|lv)(?=\/|$)/);
  if (!match) return { lang: DEFAULT_LANG, path: pathname || "/" };
  const rest = pathname.slice(match[0].length) || "/";
  return { lang: match[1] as Lang, path: rest };
}

/** Izvēlas tekstu pašreizējā valodā. */
export type Tr<T = string> = Record<Lang, T>;
export function tr<T>(lang: Lang, value: Tr<T>): T {
  return value[lang] ?? value[DEFAULT_LANG];
}

/**
 * Lapas metadati ar canonical un hreflang saitēm uz visām valodām.
 * `path` — lapas ceļš bez valodas prefiksa, piem., "/kostimu-noma".
 */
export function pageMetadata(
  lang: Lang,
  path: string,
  meta: { title: Tr | string; description: Tr | string } & Omit<
    Metadata,
    "title" | "description"
  >
): Metadata {
  const { title, description, openGraph, ...rest } = meta;
  const t = typeof title === "string" ? title : tr(lang, title);
  const d = typeof description === "string" ? description : tr(lang, description);
  return {
    metadataBase: new URL(SITE.url),
    ...rest,
    title: t,
    description: d,
    alternates: languageAlternates(lang, path),
    openGraph: {
      title: t,
      description: d,
      locale: LANG_LOCALE[lang],
      url: lp(lang, path),
      ...openGraph,
    },
  };
}

export function languageAlternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: lp(lang, path),
    languages: {
      lv: lp("lv", path),
      ru: lp("ru", path),
      en: lp("en", path),
      "x-default": lp("lv", path),
    },
  };
}

/** generateStaticParams visām valodām. */
export function langParams() {
  return LANGS.map((lang) => ({ lang }));
}
