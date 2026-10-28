"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import DealCard from "@/components/DealCard";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";
import { getFavoritesByUser } from "@/lib/auth";
import type { DbDeal } from "@/lib/types";
import type { User } from "@supabase/supabase-js";
import { useLang } from "@/context/LanguageContext";
import { DealCardSkeletonList } from "@/components/DealCardSkeleton";

export default function FavoritesPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [favorites, setFavorites] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) {
        const { data: favData } = await getFavoritesByUser(u.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFavorites(((favData ?? []) as any[]).map((f: { deals: DbDeal }) => f.deals).filter(Boolean) as DbDeal[]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pb-24">
        <div className="py-4 mb-2">
          <h1 className="text-xl font-black text-gray-900">
            {lang === "es" ? "Ofertas Guardadas" : "Saved Deals"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {lang === "es" ? "Ofertas que has guardado para más tarde" : "Deals you've saved for later"}
          </p>
        </div>

        {loading ? (
          <DealCardSkeletonList count={3} />
        ) : !user ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">❤️</p>
            <p className="font-medium text-gray-700">
              {lang === "es" ? "Guarda tus ofertas favoritas" : "Save your favourite deals"}
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-6">
              {lang === "es" ? "Inicia sesión para guardar ofertas" : "Log in to save deals and access them anytime"}
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              {lang === "es" ? "Iniciar sesión" : "Log in"}
            </button>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">❤️</p>
            <p className="font-medium text-gray-600">
              {lang === "es" ? "Sin ofertas guardadas" : "No saved deals yet"}
            </p>
            <p className="text-sm mt-1">
              {lang === "es" ? "Toca el corazón en cualquier oferta para guardarla" : "Tap the heart on any deal to save it here"}
            </p>
          </div>
        ) : (
          (() => {
            const activeDeals = favorites.filter((d) => d.is_active);
            const expiredDeals = favorites.filter((d) => !d.is_active);
            return (
              <div className="space-y-6">
                {activeDeals.length > 0 && (
                  <div className="grid gap-3">
                    {activeDeals.map((deal) => (
                      <DealCard key={deal.id} deal={{ ...deal, restaurants: deal.restaurants }} fromDb />
                    ))}
                  </div>
                )}
                {expiredDeals.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      {lang === "es" ? "Ya no disponibles" : "No longer available"}
                    </p>
                    <div className="grid gap-3">
                      {expiredDeals.map((deal) => (
                        <div key={deal.id} className="relative rounded-2xl overflow-hidden opacity-50 pointer-events-none select-none">
                          <DealCard deal={{ ...deal, restaurants: deal.restaurants }} fromDb />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                              {lang === "es" ? "Expirado" : "Expired"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeDeals.length === 0 && expiredDeals.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p className="text-5xl mb-4">❤️</p>
                    <p className="font-medium text-gray-600">
                      {lang === "es" ? "Sin ofertas guardadas" : "No saved deals yet"}
                    </p>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </main>
      <BottomNav />
    </div>
  );
}
