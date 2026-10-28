"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import DealCard from "@/components/DealCard";
import type { DbDeal } from "@/lib/types";

const STORAGE_KEY = "dealeo-tourist";

interface TouristModeProps {
  deals: DbDeal[];
  goingCounts: Record<string, number>;
}

export function TouristBanner({ onActivate }: { onActivate: () => void }) {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState(true); // start hidden, check in effect

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setDismissed(false);
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-4 mb-5 text-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-bold text-base">
            {lang === "es" ? "✈️ ¿Estás de visita?" : "✈️ Visiting Alicante?"}
          </p>
          <p className="text-orange-100 text-xs mt-0.5">
            {lang === "es"
              ? "Cuéntanos cuántos días estás y te mostramos lo mejor."
              : "Tell us how long you're here and we'll show you the best deals."}
          </p>
        </div>
        <button
          onClick={() => { setDismissed(true); localStorage.setItem(STORAGE_KEY, "dismissed"); }}
          className="text-orange-200 text-lg leading-none flex-shrink-0"
        >
          ✕
        </button>
      </div>
      <button
        onClick={onActivate}
        className="mt-3 w-full bg-white text-orange-500 font-bold text-sm py-2 rounded-xl"
      >
        {lang === "es" ? "Crear mi guía →" : "Build my guide →"}
      </button>
    </div>
  );
}

export function TouristPicker({ onDone }: { onDone: (days: number) => void }) {
  const { lang } = useLang();
  const options = [
    { label: lang === "es" ? "Solo hoy" : "Just today", days: 1 },
    { label: lang === "es" ? "2 días" : "2 days", days: 2 },
    { label: lang === "es" ? "3 días" : "3 days", days: 3 },
    { label: lang === "es" ? "Un fin de semana" : "A weekend", days: 3 },
    { label: lang === "es" ? "Una semana" : "A week", days: 7 },
    { label: lang === "es" ? "Más tiempo" : "Longer stay", days: 14 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md">
        <h2 className="text-xl font-black text-gray-900 mb-1">
          {lang === "es" ? "¿Cuánto tiempo estás?" : "How long are you here?"}
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          {lang === "es"
            ? "Te personalizamos los mejores planes."
            : "We'll show you the best deals for your stay."}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => onDone(opt.days)}
              className="py-3 px-4 rounded-2xl border-2 border-gray-100 hover:border-orange-400 hover:bg-orange-50 text-sm font-semibold text-gray-800 transition-all text-left"
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { localStorage.setItem(STORAGE_KEY, "dismissed"); onDone(0); }}
          className="mt-4 w-full text-gray-400 text-sm"
        >
          {lang === "es" ? "No, soy local" : "No thanks, I'm a local"}
        </button>
      </div>
    </div>
  );
}

export function TouristGuide({ deals, goingCounts }: TouristModeProps) {
  const { lang } = useLang();
  const router = useRouter();
  const [days, setDays] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== "dismissed") setDays(parseInt(stored));
  }, []);

  if (!days) return null;

  // Top experiences + best-rated deals
  const experiences = deals
    .filter((d) => d.category === "experiences")
    .sort((a, b) => (b.restaurants?.rating ?? 0) - (a.restaurants?.rating ?? 0))
    .slice(0, 3);

  const mustTry = deals
    .filter((d) => d.category !== "experiences" && (d.restaurants?.rating ?? 0) >= 4)
    .sort((a, b) => (b.restaurants?.rating ?? 0) - (a.restaurants?.rating ?? 0))
    .slice(0, days <= 1 ? 3 : days <= 3 ? 5 : 8);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-bold text-gray-900">
            ✈️ {lang === "es" ? "Tu guía Dealeo" : "Your Dealeo Guide"}
          </h2>
          <p className="text-xs text-gray-400">
            {lang === "es"
              ? `Las mejores ofertas para ${days === 1 ? "hoy" : `${days} días`}`
              : `Best deals for your ${days === 1 ? "day" : `${days}-day`} stay`}
          </p>
        </div>
        <button
          onClick={() => { localStorage.removeItem(STORAGE_KEY); setDays(0); }}
          className="text-xs text-gray-400 underline"
        >
          {lang === "es" ? "Salir" : "Exit"}
        </button>
      </div>

      {experiences.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-2">
            🎟️ {lang === "es" ? "Experiencias imprescindibles" : "Must-do experiences"}
          </p>
          <div className="grid gap-3">
            {experiences.map((deal) => (
              <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
            ))}
          </div>
        </div>
      )}

      {mustTry.length > 0 && (
        <div>
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-2">
            ⭐ {lang === "es" ? "Mejor valorados" : "Top rated deals"}
          </p>
          <div className="grid gap-3">
            {mustTry.map((deal) => (
              <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => router.push("/map")}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold text-sm py-3 rounded-2xl hover:bg-gray-200 transition-colors"
      >
        🗺️ {lang === "es" ? "Ver todo en el mapa" : "Explore on the map"}
      </button>
    </div>
  );
}
