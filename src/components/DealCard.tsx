"use client";

import { useLang } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";

function ReportButton({ dealId, dealTitle, lang }: { dealId: string | null; dealTitle: string; lang: string }) {
  const [state, setState] = useState<"idle" | "open" | "sending" | "sent">("idle");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const open = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("open");
  };

  const submit = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dealId || state === "sending") return;
    setState("sending");
    try {
      const body = new FormData();
      body.append("dealId", dealId);
      body.append("dealTitle", dealTitle);
      if (price) body.append("suggestedPrice", price);
      if (note) body.append("note", note);
      if (photo) body.append("photo", photo);
      await fetch("/api/report-deal", { method: "POST", body });
      setState("sent");
    } catch {
      setState("open");
    }
  }, [dealId, dealTitle, price, note, photo, state]);

  if (state === "sent") {
    return <span className="text-xs text-green-500 font-medium">✓ {lang === "es" ? "Gracias, lo revisamos" : lang === "it" ? "Grazie, controlliamo" : "Thanks, we'll check it"}</span>;
  }

  if (state === "idle") {
    return (
      <button onClick={open} className="text-xs text-gray-600 hover:text-orange-400 transition-colors underline underline-offset-2">
        {lang === "es" ? "Precio incorrecto?" : lang === "it" ? "Prezzo errato?" : "Wrong price?"}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 w-full mt-1" onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        placeholder={lang === "es" ? "Precio correcto (ej: €5)" : lang === "it" ? "Prezzo corretto (es: €5)" : "Correct price (e.g. €5)"}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="text-xs bg-gray-800 text-white border border-gray-700 rounded-lg px-2 py-1.5 w-full outline-none focus:border-teal-500"
      />
      <input
        type="text"
        placeholder={lang === "es" ? "Nota opcional" : lang === "it" ? "Nota opzionale" : "Optional note"}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="text-xs bg-gray-800 text-white border border-gray-700 rounded-lg px-2 py-1.5 w-full outline-none focus:border-teal-500"
      />
      <label className={`text-xs cursor-pointer border rounded-lg px-2 py-1.5 w-full flex items-center gap-1.5 transition-colors ${photo ? "border-teal-500 text-teal-400 bg-teal-900/20" : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300"}`}>
        📷 {photo ? photo.name : (lang === "es" ? "Adjuntar foto del ticket (opcional)" : lang === "it" ? "Allega foto scontrino (opz.)" : "Attach photo of bill (optional)")}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
      </label>
      <div className="flex gap-2">
        <button
          onClick={submit}
          disabled={state === "sending"}
          className="text-xs bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
        >
          {state === "sending" ? "..." : (lang === "es" ? "Enviar" : lang === "it" ? "Invia" : "Send")}
        </button>
        <button onClick={(e) => { e.stopPropagation(); setState("idle"); }} className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1.5">
          {lang === "es" ? "Cancelar" : lang === "it" ? "Annulla" : "Cancel"}
        </button>
      </div>
    </div>
  );
}
import type { DbDeal, Deal } from "@/lib/types";

function useCountdown(
  validUntil: string | null,
  wentLiveAt?: string | null,
  liveDurationMinutes?: number | null,
  lang?: string
): string {
  const left = lang === "es" ? "restantes" : lang === "it" ? "rimanenti" : "left";
  const endingSoon = lang === "es" ? "Terminando pronto" : lang === "it" ? "Sta per finire" : "Ending soon";

  const untilLabel = lang === "es" ? "Hasta" : lang === "it" ? "Fino alle" : "Until";
  const formatUntil = (h: number, m: number) =>
    `${untilLabel} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  const calc = () => {
    if (wentLiveAt && liveDurationMinutes) {
      const expiry = new Date(new Date(wentLiveAt).getTime() + liveDurationMinutes * 60000);
      const diffMins = Math.floor((expiry.getTime() - Date.now()) / 60000);
      if (diffMins <= 0) return endingSoon;
      if (diffMins > 120) return formatUntil(expiry.getHours(), expiry.getMinutes());
      if (diffMins < 60) return `${diffMins}m ${left}`;
      const hrs = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return mins > 0 ? `${hrs}h ${mins}m ${left}` : `${hrs}h ${left}`;
    }
    // Fallback: valid_until time of day
    if (!validUntil) return "";
    const now = new Date();
    const [h, m] = validUntil.split(":").map(Number);
    const target = new Date(now);
    target.setHours(h, m, 0, 0);
    if (target <= now) return endingSoon;
    const diffMins = Math.floor((target.getTime() - now.getTime()) / 60000);
    if (diffMins > 120) return formatUntil(h, m);
    if (diffMins < 60) return `${diffMins}m ${left}`;
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return mins > 0 ? `${hrs}h ${mins}m ${left}` : `${hrs}h ${left}`;
  };
  const isActive = !!(wentLiveAt || validUntil);
  const [time, setTime] = useState(calc);
  // useLayoutEffect runs before first paint so the timer string never flashes in the wrong language
  useLayoutEffect(() => {
    setTime(calc());
    if (!isActive) return;
    const interval = setInterval(() => setTime(calc()), 30000);
    return () => clearInterval(interval);
  }, [validUntil, wentLiveAt, liveDurationMinutes, lang, isActive]);
  return time;
}

interface DealCardProps {
  deal: DbDeal | Deal;
  fromDb?: boolean;
  goingCount?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  happyHour: "bg-teal-50 text-teal-700",
  twoForOne: "bg-purple-50 text-purple-700",
  drinks: "bg-blue-50 text-blue-700",
  food: "bg-green-50 text-green-700",
  experiences: "bg-yellow-50 text-yellow-700",
};

const CATEGORY_PLACEHOLDER: Record<string, { gradient: string; emoji: string }> = {
  happyHour:   { gradient: "from-teal-900 to-gray-900",   emoji: "🍹" },
  twoForOne:   { gradient: "from-purple-900 to-gray-900", emoji: "🍺" },
  drinks:      { gradient: "from-blue-900 to-gray-900",   emoji: "🥂" },
  food:        { gradient: "from-green-900 to-gray-900",  emoji: "🍽️" },
  experiences: { gradient: "from-orange-900 to-gray-900", emoji: "🎉" },
};

function optimizeImg(url: string | null, w = 600): string | null {
  if (!url) return null;
  if (!url.includes('unsplash.com')) return url;
  const base = url.split('?')[0];
  return `${base}?w=${w}&auto=format&fit=crop&q=80`;
}

const ACTION_LABELS: Record<string, { en: string; es: string }> = {
  happyHour: { en: "Explore", es: "Explorar" },
  experiences: { en: "See Offer", es: "Ver oferta" },
  food: { en: "See Offer", es: "Ver oferta" },
};

export default function DealCard({ deal, fromDb, goingCount }: DealCardProps) {
  const { lang, tr } = useLang();
  const router = useRouter();
  const db = (fromDb ? deal : null) as DbDeal | null;
  const legacy = (!fromDb ? deal : null) as Deal | null;

  const dealId = db?.id ?? null;

  const title = db
    ? (lang === "es" && db.title_es ? db.title_es : db.title)
    : (lang === "es" ? legacy!.dealTitleEs : legacy!.dealTitle);

  const restaurantName = db ? db.restaurants?.name : legacy!.restaurantName;
  const neighborhood = db ? db.restaurants?.neighborhood : legacy!.neighborhood;
  const rating = db ? db.restaurants?.rating : legacy!.rating;
  const emoji = db ? db.restaurants?.image_emoji : legacy!.restaurantImage;
  // Deal photo takes priority over restaurant photo
  const imageUrl = optimizeImg(db ? (db.image_url ?? db.restaurants?.image_url ?? null) : null);
  const isLive = db ? db.is_live : legacy!.isLive;
  const redemptionsLeft = db
    ? (db.max_redemptions ? db.max_redemptions - (db.redemptions_count || 0) : null)
    : legacy!.redemptionsLeft;
  const validUntil = db ? db.valid_until : legacy!.validUntil;
  const validFrom = db ? db.valid_from : null;
  const validDays: string[] | null = db?.valid_days?.length ? db.valid_days : null;
  const discountLabel = db ? db.discount_label : legacy!.discountLabel;
  const isRedeemable = db ? db.deal_type !== "informational" : true;
  const isSoldOut = isRedeemable && db?.max_redemptions && (db.redemptions_count || 0) >= db.max_redemptions;
  // 'venue' source = posted by bar owner. Only show badge when restaurant also has a user_id (actually signed up)
  const isTip = db ? (db.source !== "venue") : false;
  const isVenueVerified = db ? (db.source === "venue" && !!(db.restaurants as { user_id?: string } | null)?.user_id) : false;
  const category = db ? db.category : "food";

  // Compute standing deal status based on valid_from / valid_until
  const standingStatus: "active" | "later" | null = (() => {
    if (!validFrom || isLive) return null;
    const DAY_MAP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = DAY_MAP[new Date().getDay()];
    if (validDays && validDays.length > 0 && !validDays.includes(today)) return null;
    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
    const [fh, fm] = validFrom.split(":").map(Number);
    const fromMins = fh * 60 + fm;
    const [uh, um] = (validUntil || "23:59").split(":").map(Number);
    const untilMins = uh * 60 + um;
    if (nowMins >= fromMins && nowMins <= untilMins) return "active";
    if (nowMins < fromMins) return "later";
    return null;
  })();

  const wentLiveAt = db ? db.went_live_at : null;
  const liveDurationMinutes = db ? db.live_duration_minutes : null;
  const countdown = useCountdown(isLive ? validUntil : null, wentLiveAt, liveDurationMinutes, lang);

  const actionLabel = isSoldOut
    ? (lang === "es" ? "Agotado" : lang === "it" ? "Esaurito" : "Sold out")
    : isLive
    ? (lang === "es" ? "Canjear" : lang === "it" ? "Riscatta" : "Redeem Now")
    : isRedeemable
    ? (ACTION_LABELS[category]?.[lang === "es" ? "es" : "en"] ?? (lang === "es" ? "Ver oferta" : lang === "it" ? "Vedi offerta" : "View Deal"))
    : (lang === "es" ? "Ver oferta" : lang === "it" ? "Vedi offerta" : "View Deal");

  // Live deal — full orange banner style
  if (isLive) {
    const liveBg = isSoldOut ? "bg-gray-400" : "bg-orange-500";
    return (
      <div
        className={`rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform ${isSoldOut ? "opacity-75" : ""}`}
        onClick={() => dealId && !isSoldOut && router.push(`/deals/${dealId}`)}
      >
        <div className={`${liveBg} px-4 py-3 flex items-center gap-2`}>
          <span className={`${isSoldOut ? "bg-gray-200 text-gray-500" : "bg-white text-orange-500"} text-xs font-black px-2 py-0.5 rounded-md uppercase tracking-wide`}>
            {isSoldOut ? (lang === "es" ? "Agotado" : lang === "it" ? "Esaurito" : "Sold Out") : (lang === "es" ? "En Vivo" : lang === "it" ? "Live" : "Live Deal")}
          </span>
          {!isSoldOut && countdown && (
            <span className="text-white text-xs font-medium opacity-90">
              {countdown}
            </span>
          )}
          {isRedeemable && redemptionsLeft != null && !isSoldOut && redemptionsLeft <= 10 && (
            <span className="text-white text-xs font-medium opacity-90">
              {redemptionsLeft} {lang === "es" ? "restantes" : lang === "it" ? "rimanenti" : "left"}
            </span>
          )}
          {(goingCount ?? 0) >= 2 && (
            <span className="ml-auto text-white text-xs font-medium opacity-90">
              🙋 {goingCount} {lang === "es" ? "van" : lang === "it" ? "ci vanno" : "going"}
            </span>
          )}
        </div>
        <div className={`${liveBg} px-4 pb-4 flex items-center gap-4`}>
          {imageUrl ? (
            <img src={imageUrl} alt={restaurantName || ""} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
          ) : (
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 bg-gradient-to-br ${CATEGORY_PLACEHOLDER[category]?.gradient ?? "from-gray-800 to-gray-900"}`}>
              {CATEGORY_PLACEHOLDER[category]?.emoji ?? "🍹"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-white text-lg leading-tight">{title}</h3>
            <p className={`${isSoldOut ? "text-gray-200" : "text-orange-100"} text-sm`}>{restaurantName}</p>
          </div>
          <button
            className={`${isSoldOut ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-orange-500"} font-bold text-sm px-4 py-2 rounded-xl whitespace-nowrap`}
            disabled={!!isSoldOut}
          >
            {isSoldOut ? (lang === "es" ? "Agotado" : "Sold Out") : isRedeemable ? (lang === "es" ? "Canjear" : "Redeem Now") : (lang === "es" ? "Ver oferta" : "View Offer")}
          </button>
        </div>
      </div>
    );
  }

  // Standard deal card — image left, info right
  return (
    <div
      className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-all hover:shadow-md"
      onClick={() => dealId && router.push(`/deals/${dealId}`)}
    >
      <div className="flex items-stretch">
        {/* Left: photo or emoji */}
        <div className="w-28 flex-shrink-0 self-stretch overflow-hidden" style={{minHeight: 130}}>
          {imageUrl ? (
            <img src={imageUrl} alt={restaurantName || ""} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br ${CATEGORY_PLACEHOLDER[category]?.gradient ?? "from-gray-800 to-gray-900"}`}>
              {CATEGORY_PLACEHOLDER[category]?.emoji ?? "🍹"}
            </div>
          )}
        </div>

        {/* Right: deal info */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            {/* Discount label + rating row */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                {discountLabel}
              </span>
              <div className="flex items-center gap-1.5">
                {isTip ? (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full" title={lang === "es" ? "Tip de Dealeo — confirma horarios con el local antes de ir" : "Dealeo tip — confirm times with the venue before you go"}>
                    💡 {lang === "es" ? "Tip" : "Tip"}
                  </span>
                ) : isVenueVerified ? (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full" title={lang === "es" ? "Publicado directamente por el local — información actualizada" : "Posted by the venue — details kept up to date"}>
                    ✓ {lang === "es" ? "Del local" : "By venue"}
                  </span>
                ) : null}
                {(rating ?? 0) > 0 && (
                  <div className="flex items-center gap-0.5 text-xs">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium text-gray-300">{rating}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Deal title */}
            <h3 className="font-bold text-white text-base leading-snug mb-1 line-clamp-2">
              {title}
            </h3>

            {/* Time + venue */}
            <div className="flex flex-col gap-0.5">
              {standingStatus === "active" && (
                <span className="text-xs font-bold text-teal-600">● {lang === "es" ? "Activo ahora" : "Active now"}{validUntil ? ` · ${lang === "es" ? "hasta" : "until"} ${validUntil.slice(0, 5)}` : ""}</span>
              )}
              {standingStatus === "later" && validFrom && (
                <span className="text-xs font-medium text-orange-500">⏰ {lang === "es" ? "Hoy a las" : "Today at"} {validFrom.slice(0, 5)}{validUntil ? ` – ${validUntil.slice(0, 5)}` : ""}</span>
              )}
              {!standingStatus && validUntil && !validFrom && (
                <span className="text-xs text-gray-400">{lang === "es" ? "Hasta" : "Until"} {validUntil.slice(0, 5)}</span>
              )}
              {validFrom && validUntil && !standingStatus && (
                <span className="text-xs text-gray-400">{validFrom.slice(0, 5)} – {validUntil.slice(0, 5)}</span>
              )}
              {validDays && (
                <span className="text-xs text-gray-400">📅 {validDays.join(", ")}</span>
              )}
              <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                {restaurantName}
                {db?.restaurants?.is_approved && (
                  <span className="text-teal-500" title="Verified venue">✓</span>
                )}
              </span>
              {db?.restaurants?.sun_tags && db.restaurants.sun_tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {db.restaurants.sun_tags.slice(0, 2).map((tag) => {
                    const SUN_LABELS: Record<string, string> = {
                      morning_sun: "☀️ Morning Sun", afternoon_sun: "☀️ Afternoon Sun",
                      sunset_spot: "🌅 Sunset", sunny_terrace: "🪑 Sunny Terrace",
                      rooftop: "🌇 Rooftop", beachfront: "🌴 Beachfront",
                      outdoor_seating: "🪑 Outdoor", mostly_shaded: "🌿 Shaded",
                    };
                    return (
                      <span key={tag} className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full font-medium">
                        {SUN_LABELS[tag] ?? tag}
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                {neighborhood && (
                  <span className="text-xs text-gray-400">{neighborhood}</span>
                )}
                {db?._distanceKm != null && (
                  <span className="text-xs text-gray-400">
                    · 📍 {db._distanceKm < 1
                      ? `${Math.round(db._distanceKm * 1000)}m`
                      : `${db._distanceKm.toFixed(1)}km`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom: action button */}
          <div className="flex items-center justify-between mt-2">
            {isSoldOut ? (
              <span className="text-xs text-gray-400 font-medium">🚫 {lang === "es" ? "Agotado" : lang === "it" ? "Esaurito" : "Sold out"}</span>
            ) : redemptionsLeft != null && redemptionsLeft <= 10 && redemptionsLeft > 0 ? (
              <span className="text-xs text-orange-500 font-medium">
                🔥 {redemptionsLeft} {lang === "es" ? "quedan" : lang === "it" ? "rimanenti" : "left"}
              </span>
            ) : (goingCount ?? 0) >= 2 ? (
              <span className="text-xs text-teal-600 font-medium">🙋 {goingCount} {lang === "es" ? "van" : lang === "it" ? "ci vanno" : "going"}</span>
            ) : (db?.redemptions_count ?? 0) >= 5 ? (
              <span className="text-xs text-gray-400 font-medium">✅ {db!.redemptions_count} {lang === "es" ? "canjeados" : lang === "it" ? "riscattati" : "redeemed"}</span>
            ) : <span />}
            <div className="flex items-center gap-2">
              {dealId && (
                <button
                  aria-label="Share"
                  className="p-2 rounded-xl text-gray-500 hover:text-orange-400 hover:bg-gray-800 transition-colors"
                  onClick={async (e) => {
                    e.stopPropagation();
                    const url = `${window.location.origin}/deals/${dealId}`;
                    if (navigator.share) {
                      await navigator.share({ title: title ?? "", text: discountLabel, url });
                    } else {
                      await navigator.clipboard.writeText(url).catch(() => {});
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
              )}
              <button
                className={`text-sm font-bold px-4 py-2 rounded-xl text-white transition-colors ${
                  isSoldOut
                    ? "bg-gray-300 cursor-not-allowed"
                    : isRedeemable
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dealId && !isSoldOut) router.push(`/deals/${dealId}`);
                }}
              >
                {actionLabel}
              </button>
            </div>
          </div>

          {/* Price disclaimer + report */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
            <span className="text-xs text-gray-600">
              {lang === "es" ? "Precios del local · pueden variar" : lang === "it" ? "Prezzi del locale · possono variare" : "Prices set by venues · may vary"}
            </span>
            <ReportButton dealId={dealId} dealTitle={title ?? ""} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
