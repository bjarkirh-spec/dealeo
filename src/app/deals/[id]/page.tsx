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
import { toggleFavorite, checkFavorite, getSession, submitReview, getReviewsByRestaurant } from "@/lib/auth";
import { getDistanceKm } from "@/lib/db";
import type { DbDeal } from "@/lib/types";

export default function DealDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const [deal, setDeal] = useState<DbDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [goingCount, setGoingCount] = useState(0);
  const [isGoing, setIsGoing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportSending, setReportSending] = useState(false);
  const [reviews, setReviews] = useState<{ rating: number; comment: string | null; created_at: string; user_id: string }[]>([]);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }

    supabase
      .from("deals")
      .select(`*, restaurants (*)`)
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setDeal(data);
        setLoading(false);
      });

    // Fetch going count
    supabase
      .from("deal_going")
      .select("id", { count: "exact", head: true })
      .eq("deal_id", id as string)
      .then(({ count: gCount }) => setGoingCount(gCount ?? 0));

    getSession().then(async (session) => {
      if (session?.user) {
        setUserId(session.user.id);
        const isFav = await checkFavorite(session.user.id, id as string);
        setFavorited(isFav);

        // Check if user is going
        const { data: goingData } = await supabase
          .from("deal_going")
          .select("id")
          .eq("deal_id", id as string)
          .eq("user_id", session.user.id)
          .maybeSingle();
        setIsGoing(!!goingData);
      }
    });

    // Load reviews once deal data is available — restaurant_id comes from deal
    supabase
      .from("deals")
      .select("restaurant_id")
      .eq("id", id as string)
      .single()
      .then(({ data: d }) => {
        if (d?.restaurant_id) {
          getReviewsByRestaurant(d.restaurant_id).then(({ data: rv }) => {
            if (rv) setReviews(rv as { rating: number; comment: string | null; created_at: string; user_id: string }[]);
          });
        }
      });

    // Realtime: update redemptions_count and is_active as others redeem
    const channel = supabase
      .channel(`deal-detail-${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deals", filter: `id=eq.${id}` },
        (payload) => {
          setDeal((prev) => prev ? { ...prev, ...(payload.new as Partial<DbDeal>) } : prev);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  const handleFavorite = async () => {
    if (!userId) { router.push("/login"); return; }
    const { favorited: newState } = await toggleFavorite(userId, id as string);
    setFavorited(newState);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${title} — ${restaurant.name}`,
      text: lang === "es"
        ? `¡Mira esta oferta en Dealeo! ${title} en ${restaurant.name}`
        : `Check out this deal on Dealeo! ${title} at ${restaurant.name}`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handleGoing = async () => {
    if (!userId) { router.push("/login"); return; }
    if (isGoing) {
      await supabase.from("deal_going")
        .delete()
        .eq("deal_id", id as string)
        .eq("user_id", userId);
      setIsGoing(false);
      setGoingCount((c) => Math.max(0, c - 1));
    } else {
      await supabase.from("deal_going")
        .insert({ user_id: userId, deal_id: id });
      setIsGoing(true);
      setGoingCount((c) => c + 1);
    }
  };

  const handleReport = async () => {
    if (!reportReason) return;
    setReportSending(true);
    await fetch("/api/report-deal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dealId: id,
        dealTitle: deal ? (lang === "es" && deal.title_es ? deal.title_es : deal.title) : "",
        venueName: deal?.restaurants?.name ?? "",
        reason: reportReason,
        details: reportDetails,
      }),
    });
    setReportSending(false);
    setReportSent(true);
  };

  const handleSubmitReview = async () => {
    if (!userId || !myRating || !deal?.restaurants?.id) return;
    setReviewSubmitting(true);
    await submitReview({
      user_id: userId,
      restaurant_id: deal.restaurants.id,
      deal_id: id as string,
      rating: myRating,
      comment: myComment.trim() || undefined,
    });
    setReviewSubmitting(false);
    setReviewSubmitted(true);
    // Refresh reviews list
    const { data: rv } = await getReviewsByRestaurant(deal.restaurants.id);
    if (rv) setReviews(rv as { rating: number; comment: string | null; created_at: string; user_id: string }[]);
  };

  const handleWhatsApp = () => {
    const text = lang === "es"
      ? `¡Mira esta oferta en Dealeo! ${title} en ${restaurant.name} — ${window.location.href}`
      : `Check out this deal on Dealeo! ${title} at ${restaurant.name} — ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
        {lang === "es" ? "Oferta no encontrada" : "Deal not found"}
      </div>
    );
  }

  const title = lang === "es" && deal.title_es ? deal.title_es : deal.title;
  const restaurant = deal.restaurants!;
  const isRedeemable = deal.deal_type !== "informational";

  // Client-side expiry: treat as not-live if duration elapsed (cron may not have run yet)
  const isActuallyLive = deal.is_live &&
    !(deal.went_live_at && deal.live_duration_minutes &&
      new Date(deal.went_live_at).getTime() + deal.live_duration_minutes * 60000 <= Date.now());

  const distanceKm = userLocation && restaurant.latitude && restaurant.longitude
    ? getDistanceKm(userLocation.lat, userLocation.lng, restaurant.latitude, restaurant.longitude)
    : null;
  const distanceLabel = distanceKm != null
    ? (distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm.toFixed(1)}km`)
    : null;
  const isSoldOut = isRedeemable && deal.max_redemptions && (deal.redemptions_count || 0) >= deal.max_redemptions;
  const remaining = deal.max_redemptions ? deal.max_redemptions - (deal.redemptions_count || 0) : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": deal.title ?? "",
    "description": deal.discount_label ?? deal.title ?? "",
    "url": `https://www.dealeo.es/deals/${deal.id}`,
    "priceCurrency": "EUR",
    "price": "0",
    "availability": (deal.is_active && !isSoldOut) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "validFrom": deal.valid_from ?? undefined,
    "seller": {
      "@type": "FoodEstablishment",
      "name": restaurant.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": restaurant.address ?? "",
        "addressLocality": restaurant.city ?? "Alicante",
        "addressCountry": "ES"
      },
      ...(restaurant.latitude && restaurant.longitude ? {
        "geo": { "@type": "GeoCoordinates", "latitude": restaurant.latitude, "longitude": restaurant.longitude }
      } : {})
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Copy toast */}
      {copiedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg">
          {lang === "es" ? "✅ Enlace copiado" : "✅ Link copied"}
        </div>
      )}
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-500 hover:text-gray-700 text-2xl p-2 -m-2">
          ←
        </button>
        <h1 className="font-bold text-gray-900 flex-1 truncate">
          {restaurant.name}
        </h1>
        <button
          onClick={handleFavorite}
          className={`text-2xl p-2 -m-2 transition-colors ${favorited ? "text-red-500" : "text-gray-300 hover:text-red-400"}`}
        >
          {favorited ? "❤️" : "🤍"}
        </button>
        <button onClick={handleShare} className="text-gray-400 hover:text-orange-500 text-2xl p-2 -m-2">
          ↑
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        {/* Restaurant card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <div className="flex items-center gap-4 mb-4">
            {restaurant.image_url ? (
              <img src={optimizeImg(restaurant.image_url) || ""} alt={restaurant.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div className="text-5xl">{restaurant.image_emoji}</div>
            )}
            <div>
              <h2
                className="font-bold text-gray-900 text-xl cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
              >
                {restaurant.name} →
              </h2>
              <p className="text-gray-400 text-sm">{restaurant.neighborhood} · {restaurant.address}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium text-gray-700 text-sm">{restaurant.rating}</span>
                  <span className="text-gray-400 text-sm">({restaurant.review_count} {lang === "es" ? "reseñas" : "reviews"})</span>
                </div>
                {distanceLabel && (
                  <span className="text-xs text-gray-400">📍 {distanceLabel} {lang === "es" ? "de ti" : "away"}</span>
                )}
              </div>
            </div>
          </div>
          {restaurant.latitude && restaurant.longitude && (
            <a
              href={`https://maps.google.com/?q=${restaurant.latitude},${restaurant.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-medium text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors mt-2"
            >
              🗺️ {lang === "es" ? "Cómo llegar" : "Get Directions"}
            </a>
          )}
        </div>

        {/* Deal card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3 flex items-center justify-between">
            <span className="text-white font-black text-lg">{deal.discount_label}</span>
            <div className="flex items-center gap-2">
              {!isRedeemable && (
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ℹ️ Info
                </span>
              )}
              {isActuallyLive && (
                <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {lang === "es" ? "EN VIVO" : "LIVE"}
                </span>
              )}
            </div>
          </div>

          <div className="p-5">
            <h2 className="font-black text-gray-900 text-2xl mb-2">{title}</h2>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
              {deal.valid_from ? (
                <span className="flex items-center gap-1">
                  ⏰ {deal.valid_from.slice(0, 5)} – {(deal.valid_until || "").slice(0, 5)}
                </span>
              ) : deal.valid_until ? (
                <span className="flex items-center gap-1">
                  ⏰ {lang === "es" ? "Válido hasta" : "Valid until"} {deal.valid_until.slice(0, 5)}
                </span>
              ) : null}
              {isRedeemable && deal.max_redemptions && (
                isSoldOut ? (
                  <span className="flex items-center gap-1 text-red-500 font-bold">
                    🚫 {lang === "es" ? "Agotado" : "Sold out"}
                  </span>
                ) : remaining !== null && remaining <= 10 ? (
                  <span className={`flex items-center gap-1 font-medium ${remaining <= 3 ? "text-red-500" : "text-orange-500"}`}>
                    🔥 {remaining} {lang === "es" ? "restantes" : "left"}
                  </span>
                ) : null
              )}
              {isActuallyLive && deal.went_live_at && deal.live_duration_minutes && (() => {
                const expiresAt = new Date(deal.went_live_at).getTime() + deal.live_duration_minutes * 60000;
                const minsLeft = Math.max(0, Math.round((expiresAt - Date.now()) / 60000));
                return minsLeft > 0 ? (
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    ⚡ {minsLeft} {lang === "es" ? "minutos restantes" : "minutes left"}
                  </span>
                ) : null;
              })()}
            </div>

            {/* Conditions */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-gray-700 text-sm mb-2">
                {lang === "es" ? "Condiciones" : "Conditions"}
              </h3>
              <ul className="text-sm text-gray-500 space-y-1">
                {deal.valid_days && deal.valid_days.length > 0 && (
                  <li>📅 {lang === "es" ? "Días válidos" : "Valid days"}: {deal.valid_days.join(", ")}</li>
                )}
                {isRedeemable && deal.max_redemptions && (
                  <li>🎟️ {lang === "es" ? "Total canjes disponibles" : "Total redemptions available"}: {deal.max_redemptions}</li>
                )}
                {isRedeemable ? (
                  <li>📱 {lang === "es" ? "Mostrar código QR al personal" : "Show QR code to staff"}</li>
                ) : (
                  <li>🏪 {lang === "es" ? "Visita el local y pide la oferta directamente" : "Visit the venue and ask for the offer directly"}</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* I'm Going */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {lang === "es" ? "¿Piensas ir?" : "Planning to go?"}
              </p>
              {goingCount > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">
                  🙋 {goingCount} {lang === "es"
                    ? `persona${goingCount !== 1 ? "s" : ""} van`
                    : `${goingCount !== 1 ? "people" : "person"} going`}
                </p>
              )}
            </div>
            <button
              onClick={handleGoing}
              className={`font-bold text-sm px-5 py-2.5 rounded-xl transition-all ${
                isGoing
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              {isGoing
                ? (lang === "es" ? "✓ Voy" : "✓ Going")
                : (lang === "es" ? "Voy a ir" : "I'm Going")}
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">
              {lang === "es" ? "Reseñas" : "Reviews"}
              {reviews.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">({reviews.length})</span>
              )}
            </h3>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-semibold text-gray-700">
                  {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Existing reviews */}
          {reviews.length > 0 && (
            <div className="space-y-3 mb-4">
              {reviews.slice(0, 5).map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className={`text-sm ${s <= r.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      {new Date(r.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  {r.comment && <p className="text-sm text-gray-600">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Write a review */}
          {!userId ? (
            <button
              onClick={() => router.push(`/login?redirect=/deals/${id}`)}
              className="w-full border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {lang === "es" ? "Inicia sesión para dejar una reseña" : "Sign in to leave a review"}
            </button>
          ) : reviewSubmitted ? (
            <div className="text-center py-2">
              <p className="text-sm text-teal-600 font-medium">
                {lang === "es" ? "✓ ¡Gracias por tu reseña!" : "✓ Thanks for your review!"}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                {lang === "es" ? "Tu valoración" : "Your rating"}
              </p>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setMyRating(s)}
                    className={`text-2xl transition-transform hover:scale-110 ${
                      s <= (hoverRating || myRating) ? "text-yellow-400" : "text-gray-200"
                    }`}
                  >★</button>
                ))}
              </div>
              {myRating > 0 && (
                <>
                  <textarea
                    value={myComment}
                    onChange={(e) => setMyComment(e.target.value)}
                    placeholder={lang === "es" ? "Cuéntanos tu experiencia... (opcional)" : "Tell us about your experience... (optional)"}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 resize-none mb-3 focus:outline-none focus:border-orange-400"
                    rows={2}
                  />
                  <button
                    onClick={handleSubmitReview}
                    disabled={reviewSubmitting}
                    className="w-full bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    {reviewSubmitting
                      ? (lang === "es" ? "Enviando..." : "Submitting...")
                      : (lang === "es" ? "Enviar reseña" : "Submit review")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Share nudge */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">👥</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">
                {lang === "es" ? "¿Vas con amigos?" : "Going with friends?"}
              </p>
              <p className="text-gray-500 text-xs">
                {lang === "es" ? "Comparte esta oferta con ellos" : "Share this deal with them"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <span>💬</span> WhatsApp
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-orange-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-orange-600 transition-colors"
            >
              {lang === "es" ? "Compartir" : "Share"}
            </button>
          </div>
        </div>

        {/* Report link */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowReport(true)}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
          >
            {lang === "es" ? "¿Información incorrecta? Reportar" : "Incorrect info? Report this deal"}
          </button>
        </div>
      </div>

      {/* Report modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-8">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl">
            {reportSent ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-3">✅</div>
                <p className="font-bold text-gray-900 mb-1">
                  {lang === "es" ? "¡Gracias!" : "Thanks for the report!"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {lang === "es" ? "Lo revisaremos pronto." : "We'll review this shortly."}
                </p>
                <button
                  onClick={() => { setShowReport(false); setReportSent(false); setReportReason(""); setReportDetails(""); }}
                  className="bg-gray-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
                >
                  {lang === "es" ? "Cerrar" : "Close"}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">
                    {lang === "es" ? "🚩 Reportar oferta" : "🚩 Report this deal"}
                  </h3>
                  <button onClick={() => setShowReport(false)} className="text-gray-400 text-xl p-1">✕</button>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {lang === "es" ? "¿Qué está mal?" : "What's the issue?"}
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    { value: "wrong_price", en: "Wrong price", es: "Precio incorrecto" },
                    { value: "deal_ended", en: "Deal no longer available", es: "Oferta ya no disponible" },
                    { value: "wrong_days", en: "Wrong days / hours", es: "Días u horas incorrectos" },
                    { value: "closed", en: "Venue appears closed", es: "El local parece cerrado" },
                    { value: "other", en: "Other", es: "Otro" },
                  ].map(({ value, en, es }) => (
                    <button
                      key={value}
                      onClick={() => setReportReason(value)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                        reportReason === value
                          ? "border-orange-400 bg-orange-50 text-orange-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {lang === "es" ? es : en}
                    </button>
                  ))}
                </div>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder={lang === "es" ? "Detalles adicionales (opcional)" : "Additional details (optional)"}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 resize-none mb-4 focus:outline-none focus:border-orange-400"
                  rows={2}
                />
                <button
                  onClick={handleReport}
                  disabled={!reportReason || reportSending}
                  className="w-full bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  {reportSending
                    ? (lang === "es" ? "Enviando..." : "Sending...")
                    : (lang === "es" ? "Enviar reporte" : "Submit report")}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          {isRedeemable && !isSoldOut && !userId ? (
            <div>
              <button
                onClick={() => router.push(`/login?redirect=/deals/${id}/redeem`)}
                className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black py-4 rounded-2xl transition-colors text-lg shadow-lg shadow-orange-200"
              >
                {lang === "es" ? "🎟️ Inicia sesión para canjear" : "🎟️ Sign in to redeem"}
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
                {lang === "es" ? "Gratis — solo necesitas una cuenta" : "Free — you just need an account"}
              </p>
            </div>
          ) : isRedeemable && !isSoldOut ? (
            <button
              onClick={() => router.push(`/deals/${id}/redeem`)}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black py-4 rounded-2xl transition-colors text-lg shadow-lg shadow-orange-200"
            >
              {lang === "es" ? "🎟️ Canjear Oferta" : "🎟️ Redeem Deal"}
            </button>
          ) : isSoldOut ? (
            <div className="text-center">
              <div className="w-full bg-gray-100 text-gray-400 font-black py-4 rounded-2xl text-lg mb-2 cursor-not-allowed">
                🚫 {lang === "es" ? "Oferta agotada" : "Deal sold out"}
              </div>
              <p className="text-xs text-gray-400">
                {lang === "es" ? "Todos los canjes han sido utilizados" : "All redemptions have been used"}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">
                {lang === "es"
                  ? "Visita el local y menciona esta oferta"
                  : "Visit the venue and mention this offer"}
              </p>
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black py-4 rounded-2xl transition-colors text-lg"
              >
                {lang === "es" ? "← Volver a ofertas" : "← Back to deals"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
