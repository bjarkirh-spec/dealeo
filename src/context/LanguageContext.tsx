"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/lib/types";
import { t, Translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  tr: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  tr: t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("dealeo-lang") as Language;
    if (saved === "en" || saved === "es" || saved === "it") {
      setLangState(saved);
    } else if (navigator.language.toLowerCase().startsWith("es")) {
      setLangState("es");
    } else if (navigator.language.toLowerCase().startsWith("it")) {
      setLangState("it");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("dealeo-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
