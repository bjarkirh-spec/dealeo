"use client";

function optimizeImg(url: string | null | undefined, w = 600): string | null {
  if (!url) return null;
  if (!url.includes('unsplash.com')) return url;
  return url.split('?')[0] + `?w=${w}&auto=format&fit=crop&q=80`;
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import { DealCategory, DbRestaurantWithDeals, DbDeal } from "@/lib/types";
import { getRestaurantsWithDeals } from "@/lib/db";
import BottomNav from "@/components/BottomNav";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const MAP_CATEGORIES: { key: DealCategory; icon: string; label: string; labelEs: string }[] = [
  { key: "all", icon: "🍽️", label: "All", labelEs: "Todo" },
  { key: "live", icon: "🔴", label: "Live", labelEs: "En vivo" },
  { key: "twoForOne", icon: "2️⃣", label: "2-for-1", labelEs: "2x1" },
  { key: "happyHour", icon: "🍻", label: "Happy Hour", labelEs: "Happy Hour" },
  { key: "drinks", icon: "🥂", label: "Drinks", labelEs: "Bebidas" },
  { key: "food", icon: "🥘", label: "Food", labelEs: "Comida" },
  { key: "experiences", icon: "🎟️", label: "Experiences", labelEs: "Experiencias" },
];

const AMENITY_FILTERS = [
  { value: "darts", label: "🎯 Darts" },
  { value: "pool", label: "🎱 Pool" },
  { value: "karaoke", label: "🎤 Karaoke" },
  { value: "live_music", label: "🎵 Live Music" },
  { value: "sports_tv", label: "📺 Sports TV" },
  { value: "board_games", label: "🎲 Games" },
  { value: "terrace", label: "🌿 Terrace" },
  { value: "beer_garden", label: "🍺 Beer Garden" },
  { value: "quiz_night", label: "🧠 Quiz" },
  { value: "dance_floor", label: "💃 Dancing" },
  { value: "arcade", label: "🕹️ Arcade" },
  { value: "ping_pong", label: "🏓 Ping Pong" },
];

export default function MapPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [restaurants, setRestaurants] = useState<DbRestaurantWithDeals[]>([]);
  const [selected, setSelected] = useState<DbRestaurantWithDeals | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<DealCategory>("all");
  const [amenityFilter, setAmenityFilter] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [centerOnUser, setCenterOnUser] = useState(false);
  const [locating, setLocating] = useState(false);

  // Auto-request location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setCenterOnUser(true);
        },
        () => {} // silently fall back to Alicante default
      );
    }
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setCenterOnUser(true);
        setLocating(false);
      },
      () => setLocating(false)
    );
  };

  useEffect(() => {
    getRestaurantsWithDeals().then((data) => {
      setRestaurants(data as DbRestaurantWithDeals[]);
      setLoading(false);
    });

    // Realtime: update live status of deals on the map
    const channel = supabase
      .channel("map-deals-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deals" },
        (payload) => {
          const next = payload.new as DbDeal;
          setRestaurants((prev) =>
            prev.map((r) => ({
              ...r,
              deals: r.deals?.map((d) =>
                d.id === next.id ? { ...d, is_live: next.is_live, is_active: next.is_active } : d
              ),
            }))
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesCategory = category === "all" ? true
      : category === "live" ? r.deals?.some((d) => d.is_live && d.is_active)
      : r.deals?.some((d) => d.is_active && d.category === category);
    const matchesAmenity = !amenityFilter || (r.amenities ?? []).includes(amenityFilter);
    return matchesCategory && matchesAmenity;
  });

  return (
    <div className="h-screen flex flex-col relative pb-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.push("/")} className="text-gray-500 hover:text-gray-700 text-2xl p-2 -m-2">←</button>
          <h1 className="font-bold text-gray-900 flex-1">
            {lang === "es" ? "Ofertas en el mapa" : "Deals Map"}
          </h1>
          <button
            onClick={handleLocate}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              userLocation
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500"
            }`}
          >
            {locating ? "..." : "📍"}
            <span className="hidden sm:inline">{lang === "es" ? "Mi ubicación" : "My location"}</span>
          </button>
          <span className="text-sm text-gray-400">{filteredRestaurants.length} {lang === "es" ? "locales" : "venues"}</span>
        </div>
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {MAP_CATEGORIES.map(({ key, icon, label, labelEs }) => (
            <button
              key={key}
              onClick={() => { setCategory(key); setSelected(null); setAmenityFilter(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                category === key && !amenityFilter
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              <span>{icon}</span>
              <span>{lang === "es" ? labelEs : label}</span>
            </button>
          ))}
        </div>
        {/* Amenity filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-2 scrollbar-hide">
          {AMENITY_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setAmenityFilter(amenityFilter === value ? null : value); setSelected(null); setCategory("all"); }}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 border ${
                amenityFilter === value
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-teal-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <MapView
            restaurants={filteredRestaurants}
            onSelect={setSelected}
            lang={lang}
            userLocation={userLocation}
            centerOnUser={centerOnUser}
            onCentered={() => setCenterOnUser(false)}
          />
        )}
      </div>

      {/* Selected restaurant popup */}
      <BottomNav />

      {selected && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-3">
              {selected.image_url ? (
                <img src={optimizeImg(selected.image_url) || ""} alt={selected.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="text-3xl">{selected.image_emoji}</div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{selected.name}</h3>
                <p className="text-xs text-gray-400">{selected.neighborhood} · ★ {selected.rating}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {/* Deals preview */}
            <div className="flex gap-2 flex-wrap mb-2">
              {selected.deals?.filter((d) => d.is_active).slice(0, 3).map((deal) => (
                <span key={deal.id} className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  {deal.is_live && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                  {deal.discount_label}
                </span>
              ))}
            </div>
            {/* Amenity tags */}
            {(selected.amenities ?? []).length > 0 && (
              <div className="flex gap-1.5 flex-wrap mb-3">
                {(selected.amenities ?? []).map((a) => {
                  const match = AMENITY_FILTERS.find((f) => f.value === a);
                  return match ? (
                    <span key={a} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{match.label}</span>
                  ) : null;
                })}
              </div>
            )}

            <button
              onClick={() => router.push(`/restaurants/${selected.id}`)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              {lang === "es" ? "Ver ofertas" : "See deals"} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
