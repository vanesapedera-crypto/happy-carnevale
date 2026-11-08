"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { DEFAULT_LANG, lp, type Lang, type Tr } from "@/lib/i18n";

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Pašreizējā lapas valoda (klienta komponentēm). */
export function useLang(): Lang {
  return useContext(LangContext);
}

/** Funkcija, kas iekšējai saitei pieliek valodas prefiksu. */
export function useLp() {
  const lang = useLang();
  return useCallback((path: string) => lp(lang, path), [lang]);
}

/** Funkcija, kas no {lv, ru, en} izvēlas pašreizējās valodas tekstu. */
export function useTr() {
  const lang = useLang();
  return useCallback(<T,>(value: Tr<T>): T => value[lang] ?? value[DEFAULT_LANG], [lang]);
}
