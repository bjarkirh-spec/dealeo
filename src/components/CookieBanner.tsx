"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-consent")) setVisible(true);
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie-consent", "accepted"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  const t = {
    en: {
      text: "We use local storage to save your preferences (language, notifications). No tracking cookies.",
      accept: "Got it",
      privacy: "Privacy Policy",
    },
    es: {
      text: "Usamos almacenamiento local para guardar tus preferencias (idioma, notificaciones). Sin cookies de seguimiento.",
      accept: "Entendido",
      privacy: "Política de privacidad",
    },
    it: {
      text: "Utilizziamo la memoria locale per salvare le tue preferenze (lingua, notifiche). Nessun cookie di tracciamento.",
      accept: "Capito",
      privacy: "Informativa sulla privacy",
    },
  }[lang] ?? {
    text: "We use local storage to save your preferences (language, notifications). No tracking cookies.",
    accept: "Got it",
    privacy: "Privacy Policy",
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4" style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 0px))" }}>
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-xs text-gray-400 flex-1 leading-relaxed">
          {t.text}{" "}
          <Link href="/privacy" className="text-teal-400 underline underline-offset-2 hover:text-teal-300">
            {t.privacy}
          </Link>
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
