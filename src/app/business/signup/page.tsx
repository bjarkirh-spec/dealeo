"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn, createRestaurant } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { geocodeAddress } from "@/lib/geocode";
import { useLang } from "@/context/LanguageContext";

const EMOJIS = ["🍕","🍔","🌮","🍣","🍜","🥩","🍷","🍺","☕","🍰","🥗","🍱","🌯","🍝","🥘","🍻","🍸","🧆","🥙","🍤"];

export default function BusinessSignup() {
  const router = useRouter();
  const { lang, setLang } = useLang();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [venueCount, setVenueCount] = useState<number | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  // Step 3 — first deal
  const [dealTitle, setDealTitle] = useState("");
  const [dealCategory, setDealCategory] = useState("happyHour");
  const [dealLabel, setDealLabel] = useState("");
  const [dealFrom, setDealFrom] = useState("");
  const [dealUntil, setDealUntil] = useState("");

  useEffect(() => {
    supabase.from("restaurants").select("id", { count: "exact", head: true }).then(({ count }) => {
      setVenueCount(count ?? 0);
    });
  }, []);


  // Step 1 — account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Step 2 — restaurant info
  const [name, setName] = useState("");
  const [city, setCity] = useState("Alicante");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("🍽️");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError(lang === "es" ? "La contraseña debe tener al menos 6 caracteres" : "Password must be at least 6 characters");
      return;
    }
    if (!agreedTerms) {
      setError(lang === "es" ? "Debes aceptar los términos y la política de privacidad" : "You must agree to the terms and privacy policy");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Create auth account
    const { data: signUpData, error: signUpError } = await signUp(email, password);
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Sign in to get session (needed for RLS)
    await signIn(email, password);

    // 3. Geocode address to get coordinates for map
    const coords = await geocodeAddress(address, city);

    // 4. Create restaurant record
    const { data: restaurantData, error: restaurantError } = await createRestaurant({
      user_id: userId,
      name,
      address,
      neighborhood,
      city,
      phone,
      email,
      image_emoji: emoji,
      description,
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
    });

    if (restaurantError) {
      setError("Account created but couldn't save restaurant info: " + restaurantError.message);
      setLoading(false);
      return;
    }

    // 5. Auto-verify via Google Places (fire and forget — approval happens server-side)
    if (restaurantData?.id) {
      fetch("/api/verify-restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId: restaurantData.id, name, address }),
      }).catch(() => {/* non-critical */});
    }

    // 6. Notify admin of new venue signup
    fetch("/api/email/venue-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ venueName: name, venueEmail: email, city, address, restaurantId: restaurantData?.id }),
    }).catch(() => {/* non-critical */});

    setRestaurantId(restaurantData?.id ?? null);
    setLoading(false);
    setStep(3);
  };

  const handleDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantId || !dealTitle || !dealLabel) return;
    setLoading(true);
    setError("");
    await supabase.from("deals").insert({
      restaurant_id: restaurantId,
      title: dealTitle,
      category: dealCategory,
      discount_label: dealLabel,
      valid_from: dealFrom || null,
      valid_until: dealUntil || null,
      deal_type: "redeemable",
      source: "venue",
      is_active: true,
      is_live: false,
    });
    setLoading(false);
    router.push("/business/onboarding");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-medium">
              <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>EN</button>
              <button onClick={() => setLang("es")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "es" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>ES</button>
            </div>
            <Link href="/business/login" className="text-sm text-gray-500 hover:text-gray-700">
              {lang === "es" ? "¿Ya tienes cuenta? Entrar →" : "Already have an account? Log in →"}
            </Link>
          </div>
        </div>
      </header>

      {/* Social proof strip */}
      <div className="bg-teal-700 text-white text-xs py-2 text-center font-medium">
        {venueCount !== null
          ? (lang === "es"
            ? `🏢 ${venueCount} locales ya en la plataforma — gratis para siempre`
            : `🏢 ${venueCount} venues already on the platform — free forever`)
          : (lang === "es" ? "🏢 Completamente gratis para tu local" : "🏢 Completely free for your venue")}
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-md">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? "bg-orange-500" : "bg-gray-200"}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? "bg-orange-500" : "bg-gray-200"}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? "bg-orange-500" : "bg-gray-200"}`} />
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-xl font-black text-gray-900 mb-1">{lang === "es" ? "Añade tu local a Dealeo" : "List your venue on Dealeo"}</h1>
              <p className="text-sm text-gray-500 mb-4">{lang === "es" ? "Paso 1 de 2 — Crea tu cuenta" : "Step 1 of 2 — Create your account"}</p>
              <div className="flex gap-3 mb-5 text-xs text-gray-500">
                <span className="flex items-center gap-1">✅ {lang === "es" ? "Gratis" : "Free"}</span>
                <span className="flex items-center gap-1">✅ {lang === "es" ? "Sin contratos" : "No contracts"}</span>
                <span className="flex items-center gap-1">✅ {lang === "es" ? "Activo en minutos" : "Live in minutes"}</span>
              </div>

              <form onSubmit={handleStep1} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@bar.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Contraseña" : "Password"}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                  <p className="text-xs text-gray-400 mt-1">{lang === "es" ? "Mínimo 6 caracteres" : "Minimum 6 characters"}</p>
                </div>

                {/* Terms + age consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-orange-500 flex-shrink-0"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    {lang === "es"
                      ? <>Tengo 18 años o más y acepto los <Link href="/terms" className="text-orange-500 underline">Términos de uso</Link> y la <Link href="/privacy" className="text-orange-500 underline">Política de privacidad</Link> de Dealeo.</>
                      : <>I am 18 or older and agree to Dealeo&apos;s <Link href="/terms" className="text-orange-500 underline">Terms of Use</Link> and <Link href="/privacy" className="text-orange-500 underline">Privacy Policy</Link>.</>
                    }
                  </span>
                </label>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
                )}

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {lang === "es" ? "Continuar →" : "Continue →"}
                </button>
              </form>
            </>
          ) : step === 2 ? (
            <>
              <button
                onClick={() => { setStep(1); setError(""); }}
                className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
              >
                ← Back
              </button>
              <h1 className="text-xl font-black text-gray-900 mb-1">{lang === "es" ? "Tu local" : "Your Venue"}</h1>
              <p className="text-sm text-gray-500 mb-6">{lang === "es" ? "Paso 2 de 3 — Cuéntanos sobre tu local" : "Step 2 of 3 — Tell us about your venue"}</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Emoji picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pick an icon for your venue</label>
                  <div className="grid grid-cols-10 gap-1">
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setEmoji(e)}
                        className={`text-xl p-1.5 rounded-lg transition-all ${
                          emoji === e ? "bg-orange-100 ring-2 ring-orange-400" : "hover:bg-gray-100"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Selected: {emoji}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Nombre del local *" : "Venue Name *"}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bar El Rincón"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Ciudad *" : "City *"}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Alicante, Benidorm, Rome..."
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Dirección *" : "Address *"}</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Calle Mayor 12"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Barrio / Zona" : "Neighbourhood"}</label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder={lang === "es" ? "p.ej. El Barrio, Centro, Puerto" : "e.g. El Barrio, Centro, Puerto"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Teléfono" : "Phone"}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">{lang === "es" ? "Descripción breve" : "Short description"}</label>
                    <span className={`text-xs ${description.length > 270 ? "text-red-400" : "text-gray-400"}`}>
                      {description.length}/300
                    </span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={lang === "es" ? "¿Qué hace especial tu local?" : "What makes your place special?"}
                    rows={2}
                    maxLength={300}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating your account...
                    </span>
                  ) : "Create Restaurant Account →"}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  {lang === "es" ? "Gratis · Sin tarjeta de crédito" : "Free to join · No credit card needed"}
                </p>
              </form>
            </>
          ) : step === 3 ? (
            <>
              <h1 className="text-xl font-black text-gray-900 mb-1">{lang === "es" ? "Añade tu primera oferta" : "Add your first deal"}</h1>
              <p className="text-sm text-gray-500 mb-6">
                {lang === "es"
                  ? "Paso 3 de 3 — Necesitas al menos una oferta para aparecer en la app"
                  : "Step 3 of 3 — You need at least one deal to appear in the app"}
              </p>
              <form onSubmit={handleDeal} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Nombre de la oferta *" : "Deal title *"}</label>
                  <input
                    type="text"
                    value={dealTitle}
                    onChange={(e) => setDealTitle(e.target.value)}
                    placeholder={lang === "es" ? "p.ej. Happy Hour — Cócteles 2x1" : "e.g. Happy Hour — 2-for-1 Cocktails"}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Categoría *" : "Category *"}</label>
                  <select
                    value={dealCategory}
                    onChange={(e) => setDealCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white"
                  >
                    <option value="happyHour">{lang === "es" ? "Happy Hour" : "Happy Hour"}</option>
                    <option value="twoForOne">{lang === "es" ? "2 por 1" : "2-for-1"}</option>
                    <option value="drinks">{lang === "es" ? "Bebidas" : "Drinks"}</option>
                    <option value="food">{lang === "es" ? "Comida" : "Food"}</option>
                    <option value="experiences">{lang === "es" ? "Experiencias" : "Experiences"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Precio / etiqueta *" : "Price / label *"}</label>
                  <input
                    type="text"
                    value={dealLabel}
                    onChange={(e) => setDealLabel(e.target.value)}
                    placeholder={lang === "es" ? "p.ej. 2 cócteles por €10" : "e.g. 2 cocktails for €10"}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Desde (hora)" : "From (time)"}</label>
                    <input
                      type="time"
                      value={dealFrom}
                      onChange={(e) => setDealFrom(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{lang === "es" ? "Hasta (hora)" : "Until (time)"}</label>
                    <input
                      type="time"
                      value={dealUntil}
                      onChange={(e) => setDealUntil(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>
                {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
                <button
                  type="submit"
                  disabled={loading || !dealTitle || !dealLabel}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === "es" ? "Guardando..." : "Saving..."}
                    </span>
                  ) : (lang === "es" ? "Publicar mi local →" : "Go live →")}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  {lang === "es" ? "Puedes añadir más ofertas desde tu panel" : "You can add more deals from your dashboard"}
                </p>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
