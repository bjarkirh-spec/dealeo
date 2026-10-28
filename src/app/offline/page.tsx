"use client";

import { useLang } from "@/context/LanguageContext";

export default function OfflinePage() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl mb-6">📡</div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">
        {lang === "es" ? "Sin conexión" : "You're offline"}
      </h1>
      <p className="text-gray-500 mb-8 max-w-xs">
        {lang === "es"
          ? "Sin conexión a internet. Las páginas visitadas anteriormente siguen disponibles."
          : "No internet connection. Previously visited pages are still available."}
      </p>
      <a
        href="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors"
      >
        {lang === "es" ? "Reintentar" : "Try again"}
      </a>
    </div>
  );
}
