"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import DealCard from "@/components/DealCard";
import CategoryFilter from "@/components/CategoryFilter";
import BottomNav from "@/components/BottomNav";
import { getDealsWithRestaurants, getDealById, getDistanceKm, getSunnyVenues, invalidateDealsCache, getRestaurantsWithDeals } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { DealCategory, DbDeal, DbRestaurant } from "@/lib/types";
import { DealCardSkeletonList, LiveDealCardSkeleton } from "@/components/DealCardSkeleton";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import { TouristBanner, TouristPicker, TouristGuide } from "@/components/TouristMode";

export default function Home() {
  const { tr, lang } = useLang();
  const L = (en: string, es: string, it: string) => lang === "es" ? es : lang === "it" ? it : en;
  const router = useRouter();
  const [category, setCategory] = useState<DealCategory>("all");
  const [search, setSearch] = useState("");
  const [neighborhood, setNeighborhood] = useState("all");
  const [city, setCity] = useState("all");
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [goingCounts, setGoingCounts] = useState<Record<string, number>>({});
  const [sunnyVenues, setSunnyVenues] = useState<DbRestaurant[]>([]);
  const [allVenues, setAllVenues] = useState<any[]>([]);
  const [showTouristPicker, setShowTouristPicker] = useState(false);
  const [touristDays, setTouristDays] = useState(0);

  useEffect(() => {
    getSunnyVenues().then(setSunnyVenues);
    getRestaurantsWithDeals().then(setAllVenues);

    const stored = localStorage.getItem("dealeo-tourist");
    if (stored && stored !== "dismissed") setTouristDays(parseInt(stored));

    getDealsWithRestaurants().then(async (data) => {
      setDeals(data);
      setLoading(false);
      if (data.length > 0) {
        const { data: goingData } = await supabase
          .from("deal_going")
          .select("deal_id")
          .in("deal_id", data.map((d) => d.id));
        const counts: Record<string, number> = {};
        for (const g of goingData || []) {
          counts[g.deal_id] = (counts[g.deal_id] || 0) + 1;
        }
        setGoingCounts(counts);
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }

    // Realtime: update deals instantly when is_live changes or new live deal created
    const channel = supabase
      .channel("home-deals-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "deals" },
        async (payload) => {
          invalidateDealsCache();
          const next = payload.new as DbDeal;
          if (next.is_live && next.is_active) {
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
          if (next.is_live && !prev.is_live) {
            const full = await getDealById(next.id);
            if (full) {
              setDeals((d) => {
                const exists = d.find((x) => x.id === full.id);
                if (exists) return d.map((x) => x.id === full.id ? full : x);
                return [full, ...d];
              });
            }
          } else if (!next.is_live && prev.is_live) {
            setDeals((d) => d.map((x) => x.id === next.id ? { ...x, is_live: false } : x));
          } else if (!next.is_active && prev.is_active) {
            // Deactivated (e.g. sold out) — remove from list
            setDeals((d) => d.filter((x) => x.id !== next.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Sort by distance when location is available, and attach computed distance
  const sortedDeals = userLocation
    ? [...deals]
        .map((d) => {
          const distKm = d.restaurants?.latitude && d.restaurants?.longitude
            ? getDistanceKm(userLocation.lat, userLocation.lng, d.restaurants.latitude, d.restaurants.longitude)
            : null;
          return { ...d, _distanceKm: distKm };
        })
        .sort((a, b) => {
          if (a.is_live !== b.is_live) return a.is_live ? -1 : 1;
          return (a._distanceKm ?? 999) - (b._distanceKm ?? 999);
        })
    : deals;

  // Neighborhood filter
  const neighborhoods = [...new Set(
    deals.map((d) => d.restaurants?.neighborhood).filter(Boolean)
  )].sort() as string[];

  const cityDeals = city === "all"
    ? sortedDeals
    : sortedDeals.filter((d) => d.restaurants?.city === city);

  const neighborhoodDeals = neighborhood === "all"
    ? cityDeals
    : cityDeals.filter((d) => d.restaurants?.neighborhood === neighborhood);

  // Standing deal status helpers
  const DAY_MAP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayName = DAY_MAP[new Date().getDay()];
  const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
  const isValidToday = (d: DbDeal) => !d.valid_days?.length || d.valid_days.includes(todayName);

  // A deal is "effectively live" if manually activated OR it's a standing deal active right now
  const isStandingLiveNow = (d: DbDeal) => {
    if (!d.valid_from) return false;
    if (!isValidToday(d)) return false;
    const [fh, fm] = d.valid_from.split(":").map(Number);
    if (nowMins < fh * 60 + fm) return false;
    if (d.valid_to) {
      const [th, tm] = d.valid_to.split(":").map(Number);
      if (nowMins >= th * 60 + tm) return false;
    }
    return true;
  };

  // is_live=true means manually activated, but still respect valid_to/valid_from if set
  const isEffectiveLive = (d: DbDeal) => {
    if (d.is_live) {
      if (d.valid_from && isValidToday(d)) {
        const [fh, fm] = d.valid_from.split(":").map(Number);
        if (nowMins < fh * 60 + fm) return false;
      }
      if (d.valid_to && isValidToday(d)) {
        const [th, tm] = d.valid_to.split(":").map(Number);
        if (nowMins >= th * 60 + tm) return false;
      }
      return true;
    }
    return isStandingLiveNow(d);
  };

  const liveDeals = neighborhoodDeals.filter((d) => isEffectiveLive(d));
  const laterTodayDeals = neighborhoodDeals.filter((d) => {
    if (!d.valid_from || d.is_live) return false;
    if (!isValidToday(d)) return false;
    const [fh, fm] = d.valid_from.split(":").map(Number);
    return nowMins < fh * 60 + fm;
  }).sort((a, b) => {
    const [ah, am] = a.valid_from!.split(":").map(Number);
    const [bh, bm] = b.valid_from!.split(":").map(Number);
    return (ah * 60 + am) - (bh * 60 + bm);
  });
  const laterTodayIds = new Set(laterTodayDeals.map((d) => d.id));

  // Ending soon: valid deals whose valid_to is within the next 90 minutes
  const endingSoonDeals = neighborhoodDeals.filter((d) => {
    if (!d.valid_to || !isValidToday(d)) return false;
    const [th, tm] = d.valid_to.split(":").map(Number);
    const toMins = th * 60 + tm;
    return toMins > nowMins && toMins - nowMins <= 90;
  });

  const liveIds = new Set(liveDeals.map((d) => d.id));
  const happyHourDeals = neighborhoodDeals.filter((d) => d.category === "happyHour" && !liveIds.has(d.id) && !laterTodayIds.has(d.id));
  const experiencesDeals = neighborhoodDeals.filter((d) => d.category === "experiences" && !liveIds.has(d.id) && !laterTodayIds.has(d.id));
  const nightlifeDeals = neighborhoodDeals.filter((d) => d.category === "nightlife" && !liveIds.has(d.id));
  const trendingDeals = neighborhoodDeals.filter((d) => !liveIds.has(d.id) && d.category !== "happyHour" && d.category !== "experiences" && d.category !== "nightlife" && !laterTodayIds.has(d.id) && isValidToday(d)).slice(0, 6);

  const filteredDeals = neighborhoodDeals.filter((deal) => {
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
  });

  const showSections = category === "all" && search === "";

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <OnboardingOverlay />
      <Header />

      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0D2B35]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: copy */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-900/50 border border-teal-700/50 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              🔴 {L("Live deals updating now", "Ofertas en vivo ahora", "Offerte live adesso")}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {L("Great drinks.", "Grandes bebidas.", "Ottimi drink.")}
            </h1>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3">
              <span className="text-orange-500">{L("Better", "Mejores", "Migliori")}</span>
              <span className="text-white"> {L("deals.", "ofertas.", "offerte.")}</span>
            </h1>
            <div className="mb-4 h-1 w-24 rounded-full bg-orange-500 opacity-80 mx-auto md:mx-0" />
            <p className="text-gray-300 text-base md:text-lg mb-6 max-w-lg mx-auto md:mx-0">
              {L("Happy hours, 2-for-1 drinks, food deals and live flash offers at bars across ", "Happy hours, bebidas 2x1, ofertas de comida y flash deals en bares de ", "Happy hour, drink 2x1, offerte cibo e flash deal nei bar di ")}
              <span className="text-teal-400 font-bold">Alicante &amp; Benidorm</span>
            </p>
            {/* CTAs */}
            <div className="flex gap-3 mb-6 flex-wrap justify-center md:justify-start">
              <a href="/deals" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors flex items-center gap-2 text-sm">
                {L("Browse Deals →", "Ver Ofertas →", "Scopri Offerte →")}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=es.dealeo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-5 py-3 rounded-full hover:bg-white/20 transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#34a853"><path d="M3 20.5v-17c0-.83 1-1.29 1.6-.71l14 8.5c.53.32.53 1.1 0 1.42l-14 8.5c-.6.58-1.6.12-1.6-.71z"/></svg>
                {L("Get the App", "Descargar", "Scarica")}
              </a>
            </div>
            {/* How it works — 3 steps */}
            <div className="flex gap-4 flex-wrap justify-center md:justify-start text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-black flex items-center justify-center text-[10px]">1</span>{L("Open the app", "Abre la app", "Apri l'app")}</span>
              <span className="text-gray-600">→</span>
              <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-black flex items-center justify-center text-[10px]">2</span>{L("Find a live deal nearby", "Encuentra una oferta cerca", "Trova un'offerta vicina")}</span>
              <span className="text-gray-600">→</span>
              <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-black flex items-center justify-center text-[10px]">3</span>{L("Show & redeem", "Muestra y canjea", "Mostra e riscatta")}</span>
            </div>
          </div>
          {/* Right: cocktail image — desktop only */}
          <div className="hidden md:flex flex-1 flex-col items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-drinks.jpg.png.png"
              alt="Cocktails"
              className="w-full max-w-lg object-cover rounded-xl"
              style={{ maxHeight: "380px", objectPosition: "center top" }}
            />
          </div>
        </div>
        {/* Stats bar */}
        <div className="bg-[#0A2028] py-3">
          <div className="max-w-6xl mx-auto px-4 flex justify-center gap-8 md:gap-16 text-xs md:text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5"><span className="text-orange-400 font-black">157+</span> {L("venues", "locales", "locali")}</span>
            <span className="flex items-center gap-1.5"><span className="text-orange-400 font-black">2</span> {L("cities", "ciudades", "città")}</span>
            <span className="flex items-center gap-1.5"><span className="text-orange-400 font-black">0€</span> {L("to use", "para usar", "per usare")}</span>
            <span className="flex items-center gap-1.5">✅ {L("Updated daily", "Actualizado cada día", "Aggiornato ogni giorno")}</span>
          </div>
        </div>
      </section>

      {/* ── For venue owners strip ───────────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            🏢 {L("Own a bar or restaurant?", "¿Tienes un bar o restaurante?", "Hai un bar o ristorante?")}
          </p>
          <a href="/business" className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors whitespace-nowrap">
            {L("List your venue free →", "Añadir tu local gratis →", "Aggiungi il tuo locale →")}
          </a>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pb-24">
        {/* Search bar */}
        <div className="py-4">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={L("Find the best deals...", "Buscar las mejores ofertas...", "Cerca le migliori offerte...")}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-900 shadow-sm"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-3">
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* City toggle */}
        <div className="flex items-center gap-2 mb-3">
          {["all", "Alicante", "Benidorm"].map((c) => (
            <button
              key={c}
              onClick={() => { setCity(c); setNeighborhood("all"); }}
              className={`text-sm font-bold px-4 py-2 rounded-full transition-colors ${
                city === c ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {c === "all" ? L("All", "Todos", "Tutti") : c}
            </button>
          ))}
        </div>

        {/* Neighborhood filter */}
        {!loading && neighborhoods.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => setNeighborhood("all")}
              className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                neighborhood === "all" ? "bg-white text-gray-900" : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {L("All areas", "Todos", "Tutte le zone")}
            </button>
            {neighborhoods.map((n) => (
              <button
                key={n}
                onClick={() => setNeighborhood(neighborhood === n ? "all" : n)}
                className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                  neighborhood === n ? "bg-teal-600 text-white" : "bg-gray-800 text-gray-300 border border-gray-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {/* Tourist mode picker modal */}
        {showTouristPicker && (
          <TouristPicker onDone={(days) => {
            setShowTouristPicker(false);
            if (days > 0) {
              localStorage.setItem("dealeo-tourist", String(days));
              setTouristDays(days);
            }
          }} />
        )}

        {/* Loading skeletons */}
        {loading && <DealCardSkeletonList count={4} />}

        {/* Tourist guide — replaces normal sections */}
        {!loading && touristDays > 0 && showSections && (
          <TouristGuide deals={deals} goingCounts={goingCounts} />
        )}

        {!loading && showSections && touristDays === 0 && (
          <TouristBanner onActivate={() => setShowTouristPicker(true)} />
        )}

        {!loading && showSections && touristDays === 0 && (
          <>
            {/* Location indicator */}
            {userLocation && (
              <div className="flex items-center gap-1.5 mb-4 text-xs text-gray-400">
                <span>📍</span>
                <span>{L("Sorted by distance from your location", "Ordenado por distancia a tu ubicación", "Ordinato per distanza dalla tua posizione")}</span>
              </div>
            )}

            {/* Live Deals Banner */}
            {liveDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <h2 className="font-bold text-white">{L("Live Deals", "Ofertas en vivo", "Offerte in Diretta")}</h2>
                  </div>
                  <span className="text-xs text-gray-400">{L("Near you", "Cerca de ti", "Vicino a te")}</span>
                </div>
                <div className="grid gap-3">
                  {liveDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                  ))}
                </div>
              </div>
            )}

            {/* Ending Soon */}
            {endingSoonDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">⌛</span>
                  <h2 className="font-bold text-white">{L("Ending Soon", "Terminan pronto", "In Scadenza")}</h2>
                </div>
                <div className="grid gap-3">
                  {endingSoonDeals.map((deal) => {
                    const [th, tm] = deal.valid_to!.split(":").map(Number);
                    const minsLeft = (th * 60 + tm) - nowMins;
                    return (
                      <div key={deal.id} className="relative">
                        <DealCard deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {minsLeft < 60
                            ? `${minsLeft}m left`
                            : `${Math.floor(minsLeft / 60)}h ${minsLeft % 60}m left`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Later Today */}
            {laterTodayDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⏰</span>
                    <h2 className="font-bold text-white">{L("Later Today", "Más tarde hoy", "Più Tardi Oggi")}</h2>
                  </div>
                </div>
                <div className="grid gap-3">
                  {laterTodayDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                  ))}
                </div>
              </div>
            )}

            {/* Trending Tonight */}
            {trendingDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-white">{L("Trending Tonight", "Destacado esta noche", "Di Tendenza Stasera")}</h2>
                  <button onClick={() => router.push("/deals")} className="text-xs text-teal-600 font-medium">{L("See all", "Ver todo", "Vedi tutto")}</button>
                </div>
                <div className="grid gap-3">
                  {trendingDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                  ))}
                </div>
              </div>
            )}

            {/* Sunny Terraces & Spots — horizontal venue scroll */}
            {/* Happy Hour Specials */}
            {happyHourDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-white">{L("Happy Hour Specials", "Especiales Happy Hour", "Speciali Happy Hour")}</h2>
                  <button onClick={() => router.push("/deals?category=happyHour")} className="text-xs text-teal-600 font-medium">{L("See all", "Ver todo", "Vedi tutto")}</button>
                </div>
                <div className="grid gap-3">
                  {happyHourDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                  ))}
                </div>
              </div>
            )}

            {/* Experiences */}
            {experiencesDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-white">{L("Experiences", "Experiencias", "Esperienze")}</h2>
                  <button onClick={() => router.push("/deals?category=experiences")} className="text-xs text-teal-600 font-medium">{L("See all", "Ver todo", "Vedi tutto")}</button>
                </div>
                <div className="grid gap-3">
                  {experiencesDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                  ))}
                </div>
              </div>
            )}

            {/* Nightlife */}
            {nightlifeDeals.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌙</span>
                    <h2 className="font-bold text-white">{L("Nightlife", "Nocturno", "Vita Notturna")}</h2>
                  </div>
                  <button onClick={() => { setCategory("nightlife"); }} className="text-xs text-teal-600 font-medium">
                    {L("See all", "Ver todo", "Vedi tutto")}
                  </button>
                </div>
                <div className="grid gap-3">
                  {nightlifeDeals.slice(0, 4).map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                  ))}
                </div>
              </div>
            )}

            {/* Sun Spots */}
            {sunnyVenues.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-white">
                    {L("☀️ Sun Spots", "☀️ Terrazas con Sol", "☀️ Posti al Sole")}
                  </h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                  {sunnyVenues.map((venue) => {
                    const SUN_LABELS: Record<string, string> = {
                      morning_sun: L("Morning Sun", "Sol mañana", "Sole Mattina"),
                      afternoon_sun: L("Afternoon Sun", "Sol tarde", "Sole Pomeriggio"),
                      sunset_spot: L("Sunset Spot", "Atardecer", "Tramonto"),
                      sunny_terrace: L("Sunny Terrace", "Terraza soleada", "Terrazza Soleggiata"),
                      rooftop: "Rooftop",
                      beachfront: L("Beachfront", "Frente al mar", "Sul Mare"),
                      outdoor_seating: L("Outdoor", "Exterior", "All'Aperto"),
                      mostly_shaded: L("Shaded", "A la sombra", "All'Ombra"),
                    };
                    return (
                      <button
                        key={venue.id}
                        onClick={() => router.push(`/restaurants/${venue.id}`)}
                        className="flex-shrink-0 w-40 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow"
                      >
                        <div className="h-24 bg-amber-50 flex items-center justify-center text-4xl">
                          {venue.image_url
                            ? <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover" />
                            : (venue.image_emoji || "🌞")}
                        </div>
                        <div className="p-2">
                          <p className="font-semibold text-xs text-gray-900 truncate">{venue.name}</p>
                          {venue.sun_tags && venue.sun_tags.length > 0 && (
                            <p className="text-xs text-amber-600 mt-0.5 truncate">
                              {SUN_LABELS[venue.sun_tags[0]] ?? venue.sun_tags[0]}
                            </p>
                          )}
                          {venue.sun_note && (
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{venue.sun_note}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No deals fallback */}
            {deals.length === 0 && (
              <div className="text-center py-10 px-4">
                <p className="text-5xl mb-4">🍺</p>
                <p className="font-bold text-gray-200 text-lg mb-1">{L("Quiet right now", "Tranquilo por ahora", "Tranquillo adesso")}</p>
                <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                  {L(
                    "Happy hours usually start from 17:00. Enable notifications and we'll ping you the moment a deal goes live.",
                    "Los happy hours suelen empezar a partir de las 17:00. Activa las notificaciones y te avisamos en cuanto salga una oferta.",
                    "Gli happy hour di solito iniziano dalle 17:00. Attiva le notifiche e ti avvisiamo appena esce un'offerta."
                  )}
                </p>
                <a href="/deals" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                  {L("Browse all deals →", "Ver todas las ofertas →", "Vedi tutte le offerte →")}
                </a>
              </div>
            )}
          </>
        )}

        {/* Filtered view */}
        {!loading && !showSections && (
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 mb-3">
              {search
                ? L(`Results for "${search}"`, `Resultados para "${search}"`, `Risultati per "${search}"`)
                : tr.sections.nearYou}
            </h2>
            {filteredDeals.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="font-medium">{L("No deals found", "Sin resultados", "Nessuna offerta trovata")}</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} fromDb goingCount={goingCounts[deal.id]} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* All venues — always visible, filtered by city if selected */}
        {!loading && (() => {
          const venueList = allVenues.filter((r: any) =>
            !r.is_demo && (city === "all" || r.city === city)
          );
          if (venueList.length === 0) return null;
          const label = city === "all"
            ? L("All venues", "Todos los locales", "Tutti i locali")
            : L(`Venues in ${city}`, `Locales en ${city}`, `Locali a ${city}`);
          return (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-white">{label}</h2>
                <button onClick={() => router.push("/restaurants")} className="text-xs text-teal-500 font-medium">
                  {L("See all", "Ver todo", "Vedi tutto")}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {venueList.slice(0, city === "all" ? 8 : 50).map((r: any) => {
                  const liveDeals = (r.deals || []).filter((d: any) => d.is_live && d.is_active);
                  const activeDeals = (r.deals || []).filter((d: any) => d.is_active);
                  return (
                    <button
                      key={r.id}
                      onClick={() => router.push(`/restaurants/${r.id}`)}
                      className="w-full flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-3 hover:border-orange-500 transition-colors text-left"
                    >
                      <div className={`w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center text-xl ${liveDeals.length > 0 ? "ring-2 ring-red-500" : ""} ${r.image_url ? "" : "bg-gray-800"}`}>
                        {r.image_url
                          ? <img src={r.image_url} alt={r.name} className="w-full h-full object-cover" />
                          : (r.image_emoji || "🍻")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-white text-sm truncate">{r.name}</p>
                          {r.is_approved && <span className="text-teal-500 text-xs flex-shrink-0">✓</span>}
                          {liveDeals.length > 0 && (
                            <span className="flex items-center gap-0.5 bg-red-900/60 text-red-400 text-[10px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0">
                              <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                              LIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {[r.neighborhood, r.city].filter(Boolean).join(" · ")} {activeDeals.length > 0 ? `· ${activeDeals.length} ${lang === "es" ? "oferta" + (activeDeals.length !== 1 ? "s" : "") : lang === "it" ? "offerta" + (activeDeals.length !== 1 ? "e" : "") : "deal" + (activeDeals.length !== 1 ? "s" : "")}` : ""}
                        </p>
                      </div>
                      <span className="text-gray-600 flex-shrink-0">→</span>
                    </button>
                  );
                })}
                {city === "all" && venueList.length > 8 && (
                  <button
                    onClick={() => router.push("/restaurants")}
                    className="w-full text-center text-sm text-teal-500 font-medium py-3 bg-gray-900 border border-gray-800 rounded-2xl hover:border-teal-600 transition-colors"
                  >
                    {L(`See ${venueList.length - 8} more venues →`, `Ver los ${venueList.length - 8} locales más →`, `Vedi altri ${venueList.length - 8} locali →`)}
                  </button>
                )}
              </div>
            </div>
          );
        })()}


        {/* Business CTA */}
        {!loading && (
          <div className="mt-4 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-5 text-white">
            <h3 className="font-bold text-lg">
              {L("List your venue on Dealeo", "Lista tu local en Dealeo", "Aggiungi il tuo locale su Dealeo")}
            </h3>
            <p className="text-teal-100 text-sm mb-4">
              {L("List your venue for free and start reaching customers in Alicante today.", "Añade tu local gratis y empieza a llegar a clientes en Alicante hoy mismo.", "Aggiungi il tuo locale gratis e inizia ad attirare clienti ad Alicante oggi.")}
            </p>
            <a
              href="/business"
              className="inline-block bg-white text-teal-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-teal-50 transition-colors"
            >
              {L("Join free →", "Unirse gratis →", "Unisciti gratis →")}
            </a>
          </div>
        )}
      </main>


      <BottomNav />
    </div>
  );
}
