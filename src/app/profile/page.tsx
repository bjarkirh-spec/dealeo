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
import { subscribeUserToPush } from "@/lib/notifications";
import { getFavoritesByUser } from "@/lib/auth";
import type { DbDeal, DbRedemption, DbRestaurant } from "@/lib/types";
import type { User } from "@supabase/supabase-js";
import DealCard from "@/components/DealCard";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

function SubmitTip({ userId, lang }: { userId: string; lang: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ venue_name: "", venue_city: "Alicante", deal_description: "", deal_days: "", deal_time: "", notes: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.venue_name || !form.deal_description) return;
    await supabase.from("deal_tips").insert({ ...form, user_id: userId, status: "pending" });
    setSent(true);
    setForm({ venue_name: "", venue_city: "Alicante", deal_description: "", deal_days: "", deal_time: "", notes: "" });
    setTimeout(() => { setSent(false); setOpen(false); }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden mb-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition-colors text-left"
      >
        <span className="text-xl">💡</span>
        <span className="font-medium text-gray-900 flex-1">
          {lang === "es" ? "Enviar un tip de oferta" : "Submit a deal tip"}
        </span>
        <span className="text-gray-400 text-lg">{open ? "↑" : "↓"}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-5 pb-5 flex flex-col gap-3 border-t border-amber-50">
          {sent ? (
            <div className="py-6 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-bold text-gray-900">{lang === "es" ? "¡Gracias por el tip!" : "Thanks for the tip!"}</p>
              <p className="text-sm text-gray-400 mt-1">{lang === "es" ? "Lo revisaremos y añadiremos pronto." : "We'll review it and add it soon."}</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400 pt-3">{lang === "es" ? "¿Conoces una oferta que no está en Dealeo? ¡Cuéntanos!" : "Know a deal that's not on Dealeo? Tell us!"}</p>
              <input
                required
                placeholder={lang === "es" ? "Nombre del local *" : "Venue name *"}
                value={form.venue_name}
                onChange={e => setForm(f => ({ ...f, venue_name: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-orange-400"
              />
              <select
                value={form.venue_city}
                onChange={e => setForm(f => ({ ...f, venue_city: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-orange-400 bg-white"
              >
                <option value="Alicante">Alicante</option>
                <option value="Benidorm">Benidorm</option>
              </select>
              <input
                required
                placeholder={lang === "es" ? "Describe la oferta * (ej: 2x1 en cócteles)" : "Describe the deal * (e.g. 2-for-1 cocktails)"}
                value={form.deal_description}
                onChange={e => setForm(f => ({ ...f, deal_description: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-orange-400"
              />
              <input
                placeholder={lang === "es" ? "¿Qué días? (ej: Jueves, todos los días)" : "Which days? (e.g. Thursdays, every day)"}
                value={form.deal_days}
                onChange={e => setForm(f => ({ ...f, deal_days: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-orange-400"
              />
              <input
                placeholder={lang === "es" ? "¿A qué hora? (ej: 17:00 – 20:00)" : "What time? (e.g. 5pm – 8pm)"}
                value={form.deal_time}
                onChange={e => setForm(f => ({ ...f, deal_time: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-orange-400"
              />
              <input
                placeholder={lang === "es" ? "¿Algo más que añadir?" : "Anything else to add?"}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-orange-400"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {lang === "es" ? "Enviar tip" : "Submit tip"}
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { lang, setLang } = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifPermission, setNotifPermission] = useState<string>("default");
  const [favorites, setFavorites] = useState<DbDeal[]>([]);
  const [redemptions, setRedemptions] = useState<DbRedemption[]>([]);
  const [pwResetSent, setPwResetSent] = useState(false);
  const [showAllRedemptions, setShowAllRedemptions] = useState(false);
  const [following, setFollowing] = useState<DbRestaurant[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      setLoading(false);
      if (u) {
        const { data: favData } = await getFavoritesByUser(u.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFavorites(((favData ?? []) as any[]).map((f: { deals: DbDeal }) => f.deals).filter(Boolean) as DbDeal[]);

        const { data: redemptionData } = await supabase
          .from("user_redemptions")
          .select("*")
          .eq("user_id", u.id)
          .order("redeemed_at", { ascending: false });
        setRedemptions(redemptionData ?? []);

        const { data: followData } = await supabase
          .from("restaurant_follows")
          .select("restaurants(*)")
          .eq("user_id", u.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFollowing(((followData ?? []) as any[]).map((f: { restaurants: DbRestaurant }) => f.restaurants).filter(Boolean) as DbRestaurant[]);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission);
    }

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-500 hover:text-gray-700 text-2xl p-2 -m-2">←</button>
        <h1 className="font-bold text-gray-900">{lang === "es" ? "Mi Perfil" : "My Profile"}</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        {user ? (
          <>
            {/* Avatar + email */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-400 rounded-3xl p-8 text-center mb-6 shadow-lg shadow-orange-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                😋
              </div>
              <p className="text-white font-bold text-lg">{user.email}</p>
              <p className="text-orange-100 text-sm mt-1">
                {lang === "es" ? "Miembro de Dealeo" : "Dealeo Member"}
              </p>
            </div>

            {/* Savings stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: lang === "es" ? "Canjes" : "Redeemed", value: String(redemptions.length), icon: "🎟️" },
                { label: lang === "es" ? "Favoritos" : "Favourites", value: String(favorites.length), icon: "❤️" },
                { label: lang === "es" ? "Este mes" : "This month", value: String(redemptions.filter(r => { const d = new Date(r.redeemed_at); const now = new Date(); return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth(); }).length), icon: "📅" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                  <div className="text-2xl mb-1">{icon}</div>
                  <p className="font-black text-gray-900 text-xl">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              ))}
            </div>


            {/* Following */}
            {following.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  {lang === "es" ? "🏪 Locales que sigues" : "🏪 Places you follow"} ({following.length})
                </h3>
                <div className="flex flex-col gap-2">
                  {following.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => router.push(`/restaurants/${r.id}`)}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left w-full"
                    >
                      {r.image_url ? (
                        <img src={optimizeImg(r.image_url) || ""} alt={r.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="text-3xl flex-shrink-0">{r.image_emoji}</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.neighborhood} · {r.city}</p>
                      </div>
                      <span className="text-gray-300 text-lg">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Redemption history */}
            {redemptions.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">
                    {lang === "es" ? "🎟️ Historial de canjes" : "🎟️ Redemption History"}
                  </h3>
                  {redemptions.length > 5 && (
                    <button
                      onClick={() => setShowAllRedemptions((v) => !v)}
                      className="text-xs text-orange-500 font-semibold"
                    >
                      {showAllRedemptions
                        ? (lang === "es" ? "Ver menos" : "Show less")
                        : (lang === "es" ? `Ver todos (${redemptions.length})` : `See all (${redemptions.length})`)}
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {(showAllRedemptions ? redemptions : redemptions.slice(0, 5)).map((r) => (
                    <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                      <div className="bg-orange-100 text-orange-600 font-black text-xs px-2 py-1.5 rounded-xl flex-shrink-0">
                        {r.discount_label}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{r.deal_title}</p>
                        <p className="text-xs text-gray-400">{r.restaurant_name}</p>
                      </div>
                      <p className="text-xs text-gray-300 flex-shrink-0">
                        {new Date(r.redeemed_at).toLocaleDateString(lang === "es" ? "es-ES" : lang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved deals */}
            {favorites.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  {lang === "es" ? "❤️ Ofertas guardadas" : "❤️ Saved Deals"}
                </h3>
                <div className="grid gap-3">
                  {favorites.filter((d) => d.is_active).map((deal) => (
                    <DealCard key={deal.id} deal={deal} fromDb />
                  ))}
                  {favorites.filter((d) => !d.is_active).map((deal) => (
                    <div key={deal.id} className="relative rounded-2xl overflow-hidden opacity-50 pointer-events-none select-none">
                      <DealCard deal={deal} fromDb />
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

            {/* Submit a Deal Tip */}
            <SubmitTip userId={user.id} lang={lang} />

            {/* Settings */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <button
                onClick={async () => {
                  const granted = await subscribeUserToPush();
                  setNotifPermission(granted ? "granted" : "denied");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">🔔</span>
                <span className="font-medium text-gray-900 flex-1">
                  {lang === "es" ? "Notificaciones" : "Notifications"}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  notifPermission === "granted"
                    ? "bg-green-100 text-green-600"
                    : notifPermission === "denied"
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {notifPermission === "granted"
                    ? lang === "es" ? "Activadas" : "On"
                    : notifPermission === "denied"
                    ? lang === "es" ? "Bloqueadas" : "Blocked"
                    : lang === "es" ? "Activar" : "Enable"}
                </span>
              </button>
              {/* Change password */}
              <button
                onClick={async () => {
                  if (!user?.email || pwResetSent) return;
                  await supabase.auth.resetPasswordForEmail(user.email, {
                    redirectTo: `${window.location.origin}/login`,
                  });
                  setPwResetSent(true);
                  setTimeout(() => setPwResetSent(false), 8000);
                }}
                className="w-full flex items-center gap-3 px-5 py-4 border-t border-gray-100 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">🔑</span>
                <span className="font-medium text-gray-900 flex-1">
                  {lang === "es" ? "Cambiar contraseña" : "Change password"}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                  pwResetSent ? "bg-green-100 text-green-600" : "text-gray-400"
                }`}>
                  {pwResetSent ? (lang === "es" ? "✅ Email enviado" : "✅ Email sent") : "→"}
                </span>
              </button>
              {/* Language toggle */}
              <div className="w-full flex items-center gap-3 px-5 py-4 border-t border-gray-100">
                <span className="text-xl">🌍</span>
                <span className="font-medium text-gray-900 flex-1">
                  {lang === "es" ? "Idioma" : lang === "it" ? "Lingua" : "Language"}
                </span>
                <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("es")}
                    className={`px-2.5 py-1 rounded-full transition-all ${lang === "es" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setLang("it")}
                    className={`px-2.5 py-1 rounded-full transition-all ${lang === "it" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                  >
                    IT
                  </button>
                </div>
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={handleSignOut}
              className="w-full bg-white border border-red-100 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-50 transition-colors"
            >
              {lang === "es" ? "Cerrar sesión" : "Sign out"}
            </button>

            {/* Legal links */}
            <div className="flex items-center justify-center gap-4 mt-6 pb-2">
              <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2">
                {lang === "es" ? "Términos" : "Terms"}
              </Link>
              <span className="text-gray-200">·</span>
              <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2">
                {lang === "es" ? "Privacidad" : "Privacy"}
              </Link>
              <span className="text-gray-200">·</span>
              <a href="mailto:hello@dealeo.es" className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2">
                {lang === "es" ? "Contacto" : "Contact"}
              </a>
            </div>
            <p className="text-center text-[10px] text-gray-300 mt-1 pb-2">© 2026 Dealeo</p>
          </>
        ) : (
          /* Not logged in */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="font-black text-gray-900 text-2xl mb-2">
              {lang === "es" ? "Crea tu cuenta" : "Create your account"}
            </h2>
            <p className="text-gray-500 mb-8">
              {lang === "es"
                ? "Guarda tus ofertas favoritas y rastrea tus ahorros"
                : "Save your favourite deals and track your savings"}
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-colors mb-3"
            >
              {lang === "es" ? "Crear cuenta gratis" : "Create free account"}
            </button>
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              {lang === "es" ? "Ya tengo cuenta" : "I already have an account"}
            </button>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2">
                {lang === "es" ? "Términos" : "Terms"}
              </Link>
              <span className="text-gray-200">·</span>
              <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2">
                {lang === "es" ? "Privacidad" : "Privacy"}
              </Link>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
