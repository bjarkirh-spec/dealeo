"use client";

function optimizeImg(url: string | null | undefined, w = 600): string | null {
  if (!url) return null;
  if (!url.includes('unsplash.com')) return url;
  return url.split('?')[0] + `?w=${w}&auto=format&fit=crop&q=80`;
}

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";
import type { DbDeal } from "@/lib/types";

function VerifyContent() {
  const { code } = useParams();
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const codeStr = Array.isArray(code) ? code[0] : code;
  const userId = searchParams.get("u");

  const [status, setStatus] = useState<"loading" | "valid" | "already_used" | "expired" | "invalid">("loading");
  const [deal, setDeal] = useState<DbDeal | null>(null);

  useEffect(() => {
    if (!codeStr) {
      setStatus("invalid");
      return;
    }

    // Check if already scanned on this device (prevent double-counting)
    const scannedKey = `scanned_${codeStr}`;
    if (typeof window !== "undefined" && localStorage.getItem(scannedKey)) {
      setStatus("already_used");
      return;
    }

    // Code format: DEALEO-[dealId first 8 chars uppercase]-[timestamp base36]
    const parts = codeStr.split("-");
    if (parts.length !== 3 || parts[0] !== "DEALEO") {
      setStatus("invalid");
      return;
    }

    const dealPrefix = parts[1].toLowerCase();
    const timestampB36 = parts[2].toLowerCase();
    const timestamp = parseInt(timestampB36, 36);

    // Check if expired (5 minutes = 300000ms)
    if (Date.now() - timestamp > 300000) {
      setStatus("expired");
      return;
    }

    // Look up the deal
    supabase
      .from("deals")
      .select(`*, restaurants (name, image_emoji, image_url, neighborhood)`)
      .ilike("id", `${dealPrefix}%`)
      .eq("is_active", true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setStatus("invalid");
          return;
        }
        setDeal(data);
        setStatus("valid");

        // Mark this code as scanned on this device (expires after 10 min via key timestamp)
        if (typeof window !== "undefined") {
          localStorage.setItem(scannedKey, String(Date.now()));
          // Clean up old scanned keys to avoid localStorage bloat
          try {
            const now = Date.now();
            Object.keys(localStorage)
              .filter((k) => k.startsWith("scanned_"))
              .forEach((k) => {
                const t = parseInt(localStorage.getItem(k) || "0");
                if (now - t > 600000) localStorage.removeItem(k);
              });
          } catch {/* ignore */}
        }

        // Increment redemption count and auto-deactivate if cap is hit
        const newCount = (data.redemptions_count || 0) + 1;
        const hitLimit = data.max_redemptions && newCount >= data.max_redemptions;
        supabase
          .from("deals")
          .update({
            redemptions_count: newCount,
            ...(hitLimit ? { is_active: false } : {}),
          })
          .eq("id", data.id);

        // Record in user history — only on actual scan, not on page open
        if (userId) {
          supabase.from("user_redemptions").insert({
            user_id: userId,
            deal_id: data.id,
            deal_title: data.title,
            discount_label: data.discount_label,
            restaurant_name: data.restaurants?.name,
            redeemed_at: new Date().toISOString(),
          });
        }
      });
  }, [codeStr]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "valid" && deal) {
    const title = lang === "es" && deal.title_es ? deal.title_es : deal.title;
    return (
      <div className="min-h-screen bg-green-500 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-8xl mb-4">✅</div>
        <h1 className="text-white font-black text-4xl mb-2">
          {lang === "es" ? "VÁLIDO" : "VALID"}
        </h1>
        <p className="text-green-100 text-lg mb-8">
          {lang === "es" ? "Esta oferta es auténtica" : "This deal is genuine"}
        </p>

        <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
          {deal.restaurants?.image_url ? (
            <img src={optimizeImg(deal.restaurants.image_url) || ""} alt={deal.restaurants.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3" />
          ) : (
            <div className="text-5xl mb-3">{deal.restaurants?.image_emoji}</div>
          )}
          <h2 className="font-black text-gray-900 text-xl mb-1">{deal.restaurants?.name}</h2>
          <p className="text-gray-500 text-sm mb-4">{deal.restaurants?.neighborhood}</p>
          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            <p className="font-bold text-green-700 text-lg">{deal.discount_label}</p>
            <p className="text-green-600 text-sm">{title}</p>
          </div>
        </div>

        <p className="text-green-100 text-sm mt-8">
          {lang === "es" ? "Canje registrado · " : "Redemption logged · "}
          {new Date().toLocaleTimeString(lang === "es" ? "es-ES" : "en-GB")}
        </p>
      </div>
    );
  }

  if (status === "already_used") {
    return (
      <div className="min-h-screen bg-amber-500 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-8xl mb-4">⚠️</div>
        <h1 className="text-white font-black text-4xl mb-2">
          {lang === "es" ? "YA USADO" : "ALREADY USED"}
        </h1>
        <p className="text-amber-100 text-lg">
          {lang === "es" ? "Este código ya ha sido escaneado" : "This code has already been scanned"}
        </p>
        <p className="text-amber-200 text-sm mt-4">
          {lang === "es" ? "Pide al cliente que genere un nuevo código" : "Ask the customer to generate a new code"}
        </p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-8xl mb-4">⏰</div>
        <h1 className="text-white font-black text-4xl mb-2">
          {lang === "es" ? "EXPIRADO" : "EXPIRED"}
        </h1>
        <p className="text-gray-400 text-lg">
          {lang === "es" ? "Este código QR tiene más de 5 minutos" : "This QR code is more than 5 minutes old"}
        </p>
        <p className="text-gray-500 text-sm mt-4">
          {lang === "es" ? "Pide al cliente que genere un nuevo código" : "Ask the customer to generate a new code"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-8xl mb-4">❌</div>
      <h1 className="text-white font-black text-4xl mb-2">
        {lang === "es" ? "INVÁLIDO" : "INVALID"}
      </h1>
      <p className="text-red-100 text-lg">
        {lang === "es" ? "Este código QR no es reconocido" : "This QR code is not recognised"}
      </p>
      <p className="text-red-200 text-sm mt-4">
        {lang === "es" ? "No apliques el descuento" : "Do not apply the discount"}
      </p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
