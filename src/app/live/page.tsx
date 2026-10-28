"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DealCard from "@/components/DealCard";
import BottomNav from "@/components/BottomNav";
import { getDealsWithRestaurants, getDealById, getDistanceKm } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";
import { LiveDealCardSkeleton } from "@/components/DealCardSkeleton";
import type { DbDeal } from "@/lib/types";

export default function LivePage() {
  const { lang } = useLang();
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDealFlash, setNewDealFlash] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }

    getDealsWithRestaurants().then((data) => {
      setDeals(data.filter((d) => d.is_live));
      setLoading(false);
    });

    const channel = supabase
      .channel("live-page-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "deals" },
        async (payload) => {
          const next = payload.new as DbDeal;
          if (next.is_live && next.is_active) {
            const full = await getDealById(next.id);
            if (full) {
              setDeals((d) => [full, ...d]);
              setNewDealFlash(true);
              setTimeout(() => setNewDealFlash(false), 3000);
            }
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deals" },
        async (payload) => {
          const next = payload.new as DbDeal;
          const prev = payload.old as Partial<DbDeal>;
          if (next.is_live && !prev.is_live) {
            const full = await getDealById(next.id);
            if (full) {
              setDeals((d) => {
                const exists = d.find((x) => x.id === full.id);
                if (exists) return d.map((x) => x.id === full.id ? full : x);
                return [full, ...d];
              });
              setNewDealFlash(true);
              setTimeout(() => setNewDealFlash(false), 3000);
            }
          } else if (!next.is_live && prev.is_live) {
            setDeals((d) => d.filter((x) => x.id !== next.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Auto-remove deals that expire client-side (duration elapsed)
  useEffect(() => {
    const checkExpiry = () => {
      const now = Date.now();
      setDeals((prev) => prev.filter((d) => {
        if (!d.went_live_at || !d.live_duration_minutes) return true;
        return new Date(d.went_live_at).getTime() + d.live_duration_minutes * 60000 > now;
      }));
    };
    const interval = setInterval(checkExpiry, 30000);
    return () => clearInterval(interval);
  }, []);

  const sortedDeals = userLocation
    ? deals
        .map((d) => ({
          ...d,
          _distanceKm: d.restaurants?.latitude && d.restaurants?.longitude
            ? getDistanceKm(userLocation.lat, userLocation.lng, d.restaurants.latitude, d.restaurants.longitude)
            : null,
        }))
        .sort((a, b) => (a._distanceKm ?? 999) - (b._distanceKm ?? 999))
    : deals;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pb-24">
        <div className="py-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <h1 className="text-xl font-black text-gray-900">
              {lang === "es" ? "Ofertas en Vivo" : "Live Deals"}
            </h1>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            {lang === "es" ? "Ofertas de tiempo limitado ahora mismo" : "Time-sensitive offers happening right now"}
          </p>
          {userLocation && (
            <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-400">
              <span>📍</span>
              <span>{lang === "es" ? "Ordenado por distancia a tu ubicación" : "Sorted by distance from your location"}</span>
            </div>
          )}
        </div>

        {newDealFlash && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            {lang === "es" ? "¡Nueva oferta en vivo acaba de aparecer!" : "New live deal just dropped!"}
          </div>
        )}

        {loading ? (
          <div className="grid gap-3">
            {[0, 1, 2].map((i) => <LiveDealCardSkeleton key={i} />)}
          </div>
        ) : sortedDeals.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">⚡</p>
            <p className="font-medium text-gray-600">
              {lang === "es" ? "Sin ofertas en vivo ahora" : "No live deals right now"}
            </p>
            <p className="text-sm mt-1">
              {lang === "es" ? "Vuelve más tarde — los locales publican ofertas flash durante el día" : "Check back later — venues post flash deals throughout the day"}
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {sortedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} fromDb />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
