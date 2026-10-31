"use client";

function optimizeImg(url: string | null | undefined, w = 400): string | null {
  if (!url) return null;
  if (!url.includes('unsplash.com')) return url;
  return url.split('?')[0] + `?w=${w}&auto=format&fit=crop&q=80`;
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { getRestaurantsWithDeals } from "@/lib/db";
import BottomNav from "@/components/BottomNav";
import type { DbRestaurantWithDeals } from "@/lib/types";

export default function RestaurantsPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [restaurants, setRestaurants] = useState<DbRestaurantWithDeals[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");

  useEffect(() => {
    getRestaurantsWithDeals().then((data) => {
      setRestaurants(data as DbRestaurantWithDeals[]);
      setLoading(false);
    });
  }, []);

  const filtered = restaurants.filter((r) => {
    const matchesCity = city === "all" || r.city === city;
    const matchesSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.neighborhood || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.city || "").toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <div className="bg-[#0f1117] border-b border-gray-800 px-4 py-4 flex items-center gap-3 sticky top-0 z-40">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-400 hover:text-white text-xl p-2 -m-2">
          ←
        </button>
        <h1 className="font-bold text-white flex-1">
          {lang === "es" ? "Locales" : "Venues"}
        </h1>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">{filtered.length}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-4 pb-28">
        {/* Search */}
        <div className="relative mb-3">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "es" ? "Buscar locales..." : "Search venues..."}
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-900"
          />
        </div>

        {/* City filter */}
        <div className="flex gap-2 mb-5">
          {["all", "Alicante", "Benidorm"].map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`text-sm font-bold px-4 py-2 rounded-full transition-colors ${
                city === c ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {c === "all" ? (lang === "es" ? "Todos" : "All") : c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-800 rounded-2xl p-4 animate-pulse flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-700 rounded-2xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-700 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-3">🏪</p>
            <p>{lang === "es" ? "Sin locales encontrados" : "No venues found"}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((r) => {
              const activeDeals = (r.deals || []).filter((d) => d.is_active);
              const liveDeals = activeDeals.filter((d) => d.is_live);
              const hasDeals = activeDeals.length > 0;
              return (
                <div
                  key={r.id}
                  onClick={() => router.push(`/restaurants/${r.id}`)}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-3.5 flex items-center gap-3 hover:border-orange-500 transition-colors cursor-pointer"
                >
                  {/* Photo or emoji */}
                  <div className={`w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center text-2xl ${liveDeals.length > 0 ? "ring-2 ring-red-500" : ""} ${r.image_url ? "" : "bg-gray-800"}`}>
                    {r.image_url ? (
                      <img src={optimizeImg(r.image_url) || ""} alt={r.name} className="w-full h-full object-cover" />
                    ) : (
                      r.image_emoji || "🍻"
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="font-semibold text-white text-sm truncate">{r.name}</p>
                      {r.email && <span className="text-teal-500 text-xs flex-shrink-0">✓</span>}
                      {liveDeals.length > 0 && (
                        <span className="flex items-center gap-0.5 bg-red-900/60 text-red-400 text-[10px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0">
                          <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {[r.neighborhood, r.city].filter(Boolean).join(" · ")}
                    </p>
                    <div className="mt-1">
                      {hasDeals ? (
                        <span className="text-xs text-orange-400 font-medium">
                          {activeDeals.length} {lang === "es" ? `oferta${activeDeals.length !== 1 ? "s" : ""}` : `deal${activeDeals.length !== 1 ? "s" : ""}`}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600">
                          {lang === "es" ? "Sin ofertas activas" : "No active deals"}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-gray-600 flex-shrink-0 text-lg">→</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
