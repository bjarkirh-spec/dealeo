"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function NotFound() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-4">🍽️</div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">
        {lang === "es" ? "Página no encontrada" : "Page not found"}
      </h1>
      <p className="text-gray-500 mb-8">
        {lang === "es"
          ? "Esta oferta puede haber terminado o el enlace es incorrecto."
          : "This deal may have ended or the link is incorrect."}
      </p>
      <Link
        href="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors"
      >
        {lang === "es" ? "Ver todas las ofertas →" : "Browse all deals →"}
      </Link>
    </div>
  );
}
