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
import { submitReview } from "@/lib/auth";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import { subscribeUserToPush } from "@/lib/notifications";
import type { DbDeal } from "@/lib/types";

export default function RedeemDeal() {
  const { id } = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const [deal, setDeal] = useState<DbDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeemCode] = useState(() => `DEALEO-${String(id).slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`);
  const [userId, setUserId] = useState<string | null>(null);
  // Build QR value after userId is known so we can embed it for server-side attribution
  const qrValue = typeof window !== "undefined"
    ? `${window.location.origin}/verify/${redeemCode}${userId ? `?u=${userId}` : ""}`
    : redeemCode;
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewHover, setReviewHover] = useState(0);
  const [pushPrompt, setPushPrompt] = useState<"idle" | "shown" | "done">("idle");
  // Computed before effects so hooks can reference it as a stable dep
  const isExpired = timeLeft <= 0;

  useEffect(() => {
    // Fetch deal and session in parallel so the QR renders with userId from the start
    Promise.all([
      supabase.from("deals").select(`*, restaurants (id, name, image_emoji, image_url)`).eq("id", id).single(),
      supabase.auth.getSession(),
    ]).then(([{ data }, { data: sessionData }]) => {
      setDeal(data);
      const uid = sessionData?.session?.user?.id;
      if (uid) setUserId(uid);
      setLoading(false);
    });
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Show push notification prompt after a short delay if not already subscribed/dismissed
  useEffect(() => {
    if (loading || isExpired) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "granted" || Notification.permission === "denied") return;
    if (localStorage.getItem("push-prompt-dismissed")) return;
    const t = setTimeout(() => setPushPrompt("shown"), 4000);
    return () => clearTimeout(t);
  }, [loading, isExpired]);

  // Screen wake lock — keep screen on while QR is visible so staff can scan
  useEffect(() => {
    if (isExpired) return;
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) return;
    let wakeLock: { release: () => Promise<void> } | null = null;

    const acquire = async () => {
      try {
        wakeLock = await (navigator as unknown as { wakeLock: { request(type: "screen"): Promise<{ release: () => Promise<void> }> } }).wakeLock.request("screen");
      } catch {/* not supported or permission denied — fail silently */}
    };

    acquire();

    // Re-acquire after the tab regains visibility (required by the Wake Lock spec)
    const onVisibility = () => {
      if (document.visibilityState === "visible") acquire();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      wakeLock?.release().catch(() => {});
    };
  }, [isExpired]);

  const handleSubmitReview = async () => {
    if (!userId || !deal?.restaurants?.id || reviewRating === 0) return;
    await submitReview({
      user_id: userId,
      restaurant_id: deal.restaurants.id,
      deal_id: deal.id,
      rating: reviewRating,
      comment: reviewComment.trim() || undefined,
    });
    setReviewSubmitted(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const urgentColor = timeLeft < 60 ? "text-red-500" : "text-orange-500";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const title = lang === "es" && deal?.title_es ? deal.title_es : deal?.title;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-400 hover:text-white text-2xl p-2 -m-2">
          ←
        </button>
        <h1 className="font-bold text-white flex-1 text-center pr-6">
          {lang === "es" ? "Canjear Oferta" : "Redeem Deal"}
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Restaurant */}
        <div className="text-center mb-6">
          {deal?.restaurants?.image_url ? (
            <img src={optimizeImg(deal.restaurants.image_url) || ""} alt={deal.restaurants.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-2" />
          ) : (
            <div className="text-5xl mb-2">{deal?.restaurants?.image_emoji}</div>
          )}
          <h2 className="text-white font-bold text-lg">{deal?.restaurants?.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{title}</p>
        </div>

        {/* QR Code */}
        <div className={`bg-white p-6 rounded-3xl mb-6 shadow-2xl transition-all ${isExpired ? "opacity-30 grayscale" : ""}`}>
          <QRCode
            value={qrValue}
            size={220}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Code text */}
        <p className="text-gray-500 text-xs font-mono mb-6 tracking-wider">
          {redeemCode}
        </p>

        {/* Timer / Review */}
        {!isExpired ? (
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">
              {lang === "es" ? "Este código expira en" : "This code expires in"}
            </p>
            <p className={`font-black text-4xl font-mono ${urgentColor}`}>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        ) : userId && !reviewSubmitted ? (
          <div className="w-full max-w-sm bg-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-bold text-center mb-1">
              {lang === "es" ? "¿Qué tal estuvo?" : "How was it?"}
            </h3>
            <p className="text-gray-400 text-xs text-center mb-4">
              {lang === "es" ? "Ayuda a otros usuarios con tu reseña" : "Help others with your review"}
            </p>
            {/* Stars */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setReviewHover(star)}
                  onMouseLeave={() => setReviewHover(0)}
                  onClick={() => setReviewRating(star)}
                  className={`text-3xl transition-transform active:scale-90 ${
                    star <= (reviewHover || reviewRating) ? "text-yellow-400" : "text-gray-600"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder={lang === "es" ? "Comentario opcional..." : "Optional comment..."}
              rows={2}
              className="w-full bg-gray-700 text-white text-sm rounded-xl px-3 py-2 mb-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setReviewSubmitted(true)}
                className="flex-1 py-2 text-xs text-gray-400 hover:text-gray-200"
              >
                {lang === "es" ? "Saltar" : "Skip"}
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={reviewRating === 0}
                className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-bold text-sm rounded-xl transition-colors"
              >
                {lang === "es" ? "Enviar" : "Submit"}
              </button>
            </div>
          </div>
        ) : reviewSubmitted ? (
          <div className="text-center">
            <p className="text-4xl mb-2">🙏</p>
            <p className="text-white font-bold mb-1">{lang === "es" ? "¡Gracias!" : "Thank you!"}</p>
            <p className="text-gray-400 text-sm mb-4">{lang === "es" ? "Tu reseña ha sido enviada" : "Your review has been submitted"}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
            >
              {lang === "es" ? "Ver más ofertas" : "Find more deals"}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-400 font-bold text-lg mb-3">
              {lang === "es" ? "Código expirado" : "Code expired"}
            </p>
            <button
              onClick={() => router.push(`/deals/${id}/redeem`)}
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              {lang === "es" ? "Generar nuevo código" : "Generate new code"}
            </button>
          </div>
        )}

        {/* Push notification prompt */}
        {pushPrompt === "shown" && (
          <div className="mt-6 bg-gray-800 border border-gray-700 rounded-2xl p-4 w-full max-w-sm flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">🔔</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-snug">
                {lang === "es" ? "Alertas de ofertas en vivo" : "Get live deal alerts"}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                {lang === "es" ? "Sé el primero en saber cuando haya una oferta" : "Be first to know when deals drop"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button
                onClick={async () => {
                  const ok = await subscribeUserToPush(lang as "en" | "es");
                  setPushPrompt("done");
                  if (!ok) localStorage.setItem("push-prompt-dismissed", "1");
                }}
                className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
              >
                {lang === "es" ? "Activar" : "Turn on"}
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("push-prompt-dismissed", "1");
                  setPushPrompt("idle");
                }}
                className="text-gray-500 text-xs text-center hover:text-gray-300"
              >
                {lang === "es" ? "No gracias" : "No thanks"}
              </button>
            </div>
          </div>
        )}
        {pushPrompt === "done" && (
          <p className="mt-4 text-green-400 text-xs font-medium">
            ✓ {lang === "es" ? "¡Notificaciones activadas!" : "Notifications enabled!"}
          </p>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 rounded-2xl p-4 w-full max-w-sm">
          <h3 className="text-gray-300 font-semibold text-sm mb-2 text-center">
            {lang === "es" ? "¿Cómo funciona?" : "How to redeem"}
          </h3>
          <ol className="text-gray-400 text-xs space-y-1.5">
            <li>1. {lang === "es" ? "Muestra este código al personal del local" : "Show this QR code to the staff"}</li>
            <li>2. {lang === "es" ? "El personal escaneará el código" : "Staff will scan the code"}</li>
            <li>3. {lang === "es" ? "¡Disfruta tu oferta!" : "Enjoy your deal!"}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
