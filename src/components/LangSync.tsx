"use client";

import { useEffect } from "react";
import { useLang } from "@/context/LanguageContext";

/** Keeps <html lang="…"> in sync with the user's language selection */
export default function LangSync() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
