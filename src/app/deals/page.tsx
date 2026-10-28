"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import DealCard from "@/components/DealCard";
import CategoryFilter from "@/components/CategoryFilter";
import BottomNav from "@/components/BottomNav";
import { getDealsWithRestaurants, getDistanceKm, getDealById, invalidateDealsCache } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { DealCategory, DbDeal } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";
import { DealCardSkeletonList } from "@/components/DealCardSkeleton";

const PAGE_SIZE = 20;

function DealsContent() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as DealCategory) || "all";
  const [category, setCategory] = useState<DealCategory>(initialCategory);
  const [search, setSearch] = useState("");
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDealsWithRestaurants().then((data) => {
      setDeals(data);
      setLoading(false);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }

    const channel = supabase
      .channel("deals-page-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "deals" },
        async (payload) => {
          invalidateDealsCache();
          const next = payload.new as DbDeal;
          if (next.is_active) {
            const full = await getDealById(next.id);
            if (full) setDeals((d) => [full, ...d]);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deals" },
        async (payload) => {
          invalidateDealsCache();
          const next = payload.new as DbDeal;
          const prev = payload.old as Partial<DbDeal>;
          if (!next.is_active && prev.is_active) {
            setDeals((d) => d.filter((x) => x.id !== next.id));
          } else if (next.is_active) {
            const full = await getDealById(next.id);
            if (full) {
              setDeals((d) => {
                const exists = d.find((x) => x.id === full.id);
                if (exists) return d.map((x) => x.id === full.id ? full : x);
                return [full, ...d];
              });
            }
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Reset pagination when filter changes
  useEffect(() => { setPage(1); }, [category, search, userLocation]);

  const enrichedDeals = userLocation
    ? deals.map((d) => ({
        ...d,
        _distanceKm: d.restaurants?.latitude && d.restaurants?.longitude
          ? getDistanceKm(userLocation.lat, userLocation.lng, d.restaurants.latitude, d.restaurants.longitude)
          : null,
      }))
    : deals;

  const filteredDeals = enrichedDeals
    .filter((deal) => {
      const matchesCategory =
        category === "all" ||
        deal.category === category ||
        (category === "live" && deal.is_live);
      const matchesSearch =
        search === "" ||
        deal.restaurants?.name?.toLowerCase().includes(search.toLowerCase()) ||
        deal.title?.toLowerCase().includes(search.toLowerCase()) ||
        deal.title_es?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (a.is_live !== b.is_live) return a.is_live ? -1 : 1;
      return (a._distanceKm ?? 999) - (b._distanceKm ?? 999);
    });

  return (
    <main className="max-w-2xl mx-auto px-4 pb-24">
      <div className="py-4">
        <h1 className="text-xl font-black text-gray-900 mb-4">
          {lang === "es" ? "Todas las Ofertas" : "All Deals"}
        </h1>
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "es" ? "Buscar ofertas..." : "Search deals..."}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 shadow-sm"
          />
        </div>
        <CategoryFilter selected={category} onChange={setCategory} />
        {userLocation && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
            <span>📍</span>
            <span>{lang === "es" ? "Ordenado por distancia a tu ubicación" : "Sorted by distance from your location"}</span>
          </div>
        )}
      </div>

      {loading ? (
        <DealCardSkeletonList count={5} />
      ) : filteredDeals.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="font-medium">{lang === "es" ? "Sin resultados" : "No deals found"}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredDeals.slice(0, page * PAGE_SIZE).map((deal) => (
            <DealCard key={deal.id} deal={deal} fromDb />
          ))}
          {page * PAGE_SIZE < filteredDeals.length && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="w-full py-3 text-sm font-bold text-teal-600 border border-teal-200 rounded-2xl hover:bg-teal-50 transition-colors"
            >
              {lang === "es" ? `Ver más (${filteredDeals.length - page * PAGE_SIZE} restantes)` : `Load more (${filteredDeals.length - page * PAGE_SIZE} remaining)`}
            </button>
          )}
          {/* Submit tip CTA */}
          <a
            href="/tips"
            className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-4 mt-1 active:scale-[0.98] transition-transform"
          >
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="font-bold text-amber-800 text-sm">
                {lang === "es" ? "¿Conoces una oferta?" : "Know about a deal?"}
              </p>
              <p className="text-amber-600 text-xs">
                {lang === "es" ? "Compártela con la comunidad" : "Share it with the community"}
              </p>
            </div>
            <span className="text-amber-400 text-lg">→</span>
          </a>
        </div>
      )}
    </main>
  );
}

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Header />
      <Suspense fallback={
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <DealsContent />
      </Suspense>
      <BottomNav />
    </div>
  );
}
