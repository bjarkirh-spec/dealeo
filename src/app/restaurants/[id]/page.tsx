"use client";

function optimizeImg(url: string | null | undefined, w = 600): string | null {
  if (!url) return null;
  if (!url.includes('unsplash.com')) return url;
  return url.split('?')[0] + `?w=${w}&auto=format&fit=crop&q=80`;
}

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import { getReviewsByRestaurant } from "@/lib/auth";
import { RestaurantPageSkeleton } from "@/components/DealCardSkeleton";
import type { DbRestaurant, DbDeal, DbReview } from "@/lib/types";

export default function RestaurantProfile() {
  const { id } = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const [restaurant, setRestaurant] = useState<DbRestaurant | null>(null);
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [followUserId, setFollowUserId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from("restaurants").select("*").eq("id", id).single(),
      supabase.from("deals").select("*").eq("restaurant_id", id).eq("is_active", true).order("is_live", { ascending: false }),
      getReviewsByRestaurant(id as string),
      supabase.from("restaurant_follows").select("id", { count: "exact", head: true }).eq("restaurant_id", id),
    ]).then(([{ data: r }, { data: d }, { data: rev }, { count: fCount }]) => {
      setRestaurant(r);
      setDeals(d || []);
      setReviews(rev || []);
      setFollowCount(fCount ?? 0);
      setLoading(false);
    });

    // Check if current user is following
    supabase.auth.getSession().then(async ({ data }) => {
      const uid = data.session?.user?.id;
      if (uid) {
        setFollowUserId(uid);
        const { data: fData } = await supabase
          .from("restaurant_follows")
          .select("id")
          .eq("restaurant_id", id)
          .eq("user_id", uid)
          .maybeSingle();
        setIsFollowing(!!fData);
      }
    });

    // Realtime: reflect live status changes immediately
    const channel = supabase
      .channel(`restaurant-${id}-deals`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deals", filter: `restaurant_id=eq.${id}` },
        (payload) => {
          const next = payload.new as DbDeal;
          if (!next.is_active) {
            setDeals((prev) => prev.filter((d) => d.id !== next.id));
          } else {
            setDeals((prev) => {
              const exists = prev.find((d) => d.id === next.id);
              const updated = exists
                ? prev.map((d) => d.id === next.id ? { ...d, ...next } : d)
                : [...prev, next];
              return updated.sort((a, b) => (b.is_live ? 1 : 0) - (a.is_live ? 1 : 0));
            });
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  const handleFollow = async () => {
    if (!followUserId) {
      // Not logged in — could redirect to login
      return;
    }
    if (isFollowing) {
      await supabase.from("restaurant_follows")
        .delete()
        .eq("restaurant_id", id)
        .eq("user_id", followUserId);
      setIsFollowing(false);
      setFollowCount((c) => Math.max(0, c - 1));
    } else {
      await supabase.from("restaurant_follows")
        .insert({ user_id: followUserId, restaurant_id: id });
      setIsFollowing(true);
      setFollowCount((c) => c + 1);
    }
  };

  if (loading) return <RestaurantPageSkeleton />;

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
        {lang === "es" ? "Restaurante no encontrado" : "Restaurant not found"}
      </div>
    );
  }

  const liveDeals = deals.filter((d) => d.is_live);
  const regularDeals = deals.filter((d) => !d.is_live);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-500 hover:text-gray-700 text-2xl p-2 -m-2">
          ←
        </button>
        <h1 className="font-bold text-gray-900 flex-1 truncate">{restaurant.name}</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-12">
        {/* Hero */}
        <div className="rounded-3xl overflow-hidden mb-6 shadow-lg shadow-orange-100 relative">
          {restaurant.image_url ? (
            <>
              <img src={optimizeImg(restaurant.image_url) || ""} alt={restaurant.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h2 className="font-black text-2xl mb-0.5">{restaurant.name}</h2>
                <p className="text-orange-200 text-sm mb-2">{restaurant.neighborhood} · {restaurant.city}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-300 text-lg">★</span>
                    <span className="font-bold">{restaurant.rating}</span>
                    <span className="text-orange-200 text-sm">({restaurant.review_count} {lang === "es" ? "reseñas" : "reviews"})</span>
                  </div>
                  {followCount > 0 && (
                    <span className="text-orange-200 text-xs">· {followCount} {lang === "es" ? `seguidor${followCount !== 1 ? "es" : ""}` : `follower${followCount !== 1 ? "s" : ""}`}</span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-br from-orange-500 to-orange-400 p-8 text-center">
              <div className="text-7xl mb-4">{restaurant.image_emoji}</div>
              <h2 className="text-white font-black text-2xl mb-1">{restaurant.name}</h2>
              <p className="text-orange-100 text-sm mb-4">{restaurant.neighborhood} · {restaurant.city}</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-yellow-300 text-lg">★</span>
                <span className="text-white font-bold">{restaurant.rating}</span>
                <span className="text-orange-200 text-sm">({restaurant.review_count} {lang === "es" ? "reseñas" : "reviews"})</span>
              </div>
              {followCount > 0 && (
                <p className="text-orange-200 text-xs mt-2">
                  {followCount} {lang === "es" ? `seguidor${followCount !== 1 ? "es" : ""}` : `follower${followCount !== 1 ? "s" : ""}`}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Dirección" : "Address"}</p>
            <p className="text-sm font-semibold text-gray-900">{restaurant.address}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Ciudad" : "City"}</p>
            <p className="text-sm font-semibold text-gray-900">{restaurant.city}</p>
          </div>
          {restaurant.phone && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Teléfono" : "Phone"}</p>
              <a href={`tel:${restaurant.phone}`} className="text-sm font-semibold text-orange-500">{restaurant.phone}</a>
            </div>
          )}
          {restaurant.website && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Website</p>
              <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-orange-500 truncate block">
                {restaurant.website.replace("https://", "")}
              </a>
            </div>
          )}
        </div>

        {/* Get Directions */}
        {restaurant.latitude && restaurant.longitude && (
          <a
            href={`https://maps.google.com/?q=${restaurant.latitude},${restaurant.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-700 font-semibold text-sm py-3 rounded-2xl hover:bg-gray-50 transition-colors mb-6"
          >
            🗺️ {lang === "es" ? "Cómo llegar" : "Get Directions"}
          </a>
        )}

        {/* Description */}
        {restaurant.description && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
            <h3 className="font-bold text-gray-900 mb-2">{lang === "es" ? "Sobre nosotros" : "About"}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {lang === "es" && restaurant.description_es ? restaurant.description_es : restaurant.description}
            </p>
          </div>
        )}

        {/* Live Deals */}
        {liveDeals.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <h3 className="font-bold text-gray-900">{lang === "es" ? "Ofertas en vivo ahora" : "Live right now"}</h3>
            </div>
            <div className="space-y-3">
              {liveDeals.map((deal) => (
                <DealRow key={deal.id} deal={deal} lang={lang} onClick={() => router.push(`/deals/${deal.id}`)} />
              ))}
            </div>
          </div>
        )}

        {/* All Deals */}
        {regularDeals.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 mb-3">
              {lang === "es" ? "Todas las ofertas" : "All deals"}
            </h3>
            <div className="space-y-3">
              {regularDeals.map((deal) => (
                <DealRow key={deal.id} deal={deal} lang={lang} onClick={() => router.push(`/deals/${deal.id}`)} />
              ))}
            </div>
          </div>
        )}

        {deals.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center mt-2">
            <p className="text-4xl mb-3">🍽️</p>
            <h3 className="font-bold text-gray-900 mb-1">
              {lang === "es" ? "Sin ofertas ahora mismo" : "No deals right now"}
            </h3>
            <p className="text-gray-400 text-sm">
              {lang === "es" ? "Vuelve pronto — este local añadirá ofertas próximamente." : "Check back soon — this venue will be adding deals."}
            </p>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 mb-3">
              {lang === "es" ? "Reseñas" : "Reviews"} ({reviews.length})
            </h3>
            <div className="space-y-3">
              {reviews.map((rev, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 text-sm">{"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {new Date(rev.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  {rev.comment && (
                    <p className="text-sm text-gray-600 mt-1">{rev.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function useLiveCountdown(deal: DbDeal, lang: string): string | null {
  const calc = () => {
    if (!deal.is_live || !deal.went_live_at || !deal.live_duration_minutes) return null;
    const expiry = new Date(deal.went_live_at).getTime() + deal.live_duration_minutes * 60000;
    const diffMins = Math.floor((expiry - Date.now()) / 60000);
    if (diffMins <= 0) return lang === "es" ? "Terminando pronto" : "Ending soon";
    if (diffMins < 60) return `${diffMins}m ${lang === "es" ? "restantes" : "left"}`;
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return mins > 0
      ? `${hrs}h ${mins}m ${lang === "es" ? "restantes" : "left"}`
      : `${hrs}h ${lang === "es" ? "restantes" : "left"}`;
  };
  const [label, setLabel] = useState(calc);
  useEffect(() => {
    setLabel(calc());
    const t = setInterval(() => setLabel(calc()), 30000);
    return () => clearInterval(t);
  }, [deal.went_live_at, deal.live_duration_minutes, lang]);
  return label;
}

function DealRow({ deal, lang, onClick }: { deal: DbDeal; lang: string; onClick: () => void }) {
  const title = lang === "es" && deal.title_es ? deal.title_es : deal.title;
  const countdown = useLiveCountdown(deal, lang);
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
    >
      <div className="bg-orange-500 text-white font-black text-xs px-3 py-2 rounded-xl flex-shrink-0">
        {deal.discount_label}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{title}</p>
        {deal.is_live && countdown ? (
          <p className="text-xs text-red-500 font-medium">⚡ {countdown}</p>
        ) : deal.valid_until ? (
          <p className="text-xs text-gray-400">⏰ {lang === "es" ? "Hasta" : "Until"} {deal.valid_until.slice(0, 5)}</p>
        ) : null}
      </div>
      {deal.is_live && (
        <span className="flex items-center gap-1 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          {lang === "es" ? "EN VIVO" : "LIVE"}
        </span>
      )}
      <span className="text-gray-400">→</span>
    </button>
  );
}
