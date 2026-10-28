"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

export default function BusinessLanding() {
  const { lang, setLang } = useLang();
  const [venueCount, setVenueCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("restaurants")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => setVenueCount(count ?? 0));
  }, []);

  const es = lang === "es";

  const benefits = es ? [
    { icon: "⚡", title: "Ofertas en vivo", desc: "¿Tienes mesas vacías ahora mismo? Crea una oferta en vivo y llénalas en minutos." },
    { icon: "📊", title: "Ve tus resultados", desc: "Controla cuántos clientes canjean tus ofertas y qué promociones funcionan mejor." },
    { icon: "🔔", title: "Notificaciones push", desc: "Cuando activas una oferta, los clientes cercanos reciben una notificación al instante." },
  ] : [
    { icon: "⚡", title: "Live deals", desc: "Got empty tables right now? Create a live deal and fill them within minutes." },
    { icon: "📊", title: "See your results", desc: "Track how many customers redeem your deals and which offers perform best." },
    { icon: "🔔", title: "Push notifications", desc: "When you go live, nearby customers get an instant push notification to their phone." },
  ];

  const steps = es ? [
    { step: "1", icon: "✍️", title: "Crea tu oferta", desc: "Regístrate en minutos. Añade tu local, elige un descuento y los días en que se aplica." },
    { step: "2", icon: "🔴", title: "Actívala cuando quieras", desc: "Pulsa 'Activar' cuando quieras llenar mesas rápido. Los clientes cercanos reciben una notificación al instante." },
    { step: "3", icon: "📱", title: "Los clientes la canjean", desc: "Muestran un código QR. Tu equipo lo escanea. Sin cupones en papel, sin hojas de cálculo — solo más clientes." },
  ] : [
    { step: "1", icon: "✍️", title: "Create your deal", desc: "Sign up in minutes. Add your venue, set a discount, and choose which days it runs." },
    { step: "2", icon: "🔴", title: "Go live anytime", desc: "Tap 'Go Live' when you want to fill tables fast. Nearby customers get a push notification instantly." },
    { step: "3", icon: "📱", title: "Customers redeem", desc: "They show a QR code. Your staff scans it. No paper coupons, no spreadsheets — just more covers." },
  ];

  const FOUNDING_CAP = 50;
  const spotsLeft = venueCount !== null ? Math.max(0, FOUNDING_CAP - venueCount) : null;

  const stats = es ? [
    { value: "€19/mes", label: "Precio fundador (luego €39)" },
    { value: "< 2min", label: "Para crear una oferta" },
    { value: "En vivo", label: "Notificaciones push" },
  ] : [
    { value: "€19/mo", label: "Founding price (then €39)" },
    { value: "< 2min", label: "To create a deal" },
    { value: "Real-time", label: "Push notifications" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-medium">
              <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>EN</button>
              <button onClick={() => setLang("es")} className={`px-2.5 py-1 rounded-full transition-all ${lang === "es" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>ES</button>
            </div>
            <Link href="/business/login" className="text-sm font-medium text-orange-500 hover:text-orange-600">
              {es ? "Entrar →" : "Login →"}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          {spotsLeft !== null && spotsLeft <= 50 && (
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              {spotsLeft > 0
                ? (es ? `${spotsLeft} plazas fundadoras disponibles` : `${spotsLeft} founding spots remaining`)
                : (es ? "Plazas fundadoras agotadas" : "Founding spots full")}
            </div>
          )}
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            {es ? <>Llena tus mesas.<br />Haz crecer tu negocio.</> : <>Fill your tables.<br />Grow your business.</>}
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-6">
            {es
              ? "Únete a Dealeo y llega a miles de clientes en Alicante. Los primeros 50 locales son Socios Fundadores — gratis durante el lanzamiento, y con el precio bloqueado mientras sigas en Dealeo."
              : "Join Dealeo and reach thousands of customers in Alicante. The first 50 venues are Founding Venues — free during launch, then locked in at half price for as long as you stay on Dealeo."}
          </p>
          <Link
            href="/business/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
          >
            {es ? "Reservar mi plaza fundadora →" : "Claim my founding spot →"}
          </Link>
          {venueCount !== null && venueCount > 0 && (
            <p className="text-sm text-gray-400 mt-4">
              🍽️ <strong className="text-gray-600">{venueCount}</strong> {es ? "locales ya dentro" : "venues already in"}
            </p>
          )}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {benefits.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">
            {es ? "Cómo funciona" : "How it works"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ step, icon, title, desc }) => (
              <div key={step} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-black shadow">
                  {step}
                </div>
                <div className="text-3xl mb-3 mt-1">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-16 text-center">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <p className="text-lg font-black text-orange-500 leading-tight">{value}</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Founding Venue pricing */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-8">
            {es ? "Precios simples" : "Simple pricing"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Founding */}
            <div className="relative bg-white rounded-2xl border-2 border-orange-400 shadow-md p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {es ? "⭐ Primeros 50 locales" : "⭐ First 50 venues only"}
              </div>
              <p className="font-black text-gray-900 text-lg mt-2 mb-1">{es ? "Socio Fundador" : "Founding Venue"}</p>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-4xl font-black text-orange-500">€19</span>
                <span className="text-gray-400 text-sm mb-1">{es ? "/mes — bloqueado mientras sigas con nosotros" : "/mo — locked in as long as you stay"}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                {es ? "Gratis durante la fase de lanzamiento. Cuando activemos los pagos, pagas €19/mes mientras sigas en Dealeo — la mitad que los nuevos locales." : "Free during our launch phase. When billing starts, you pay €19/month for as long as you stay on Dealeo — half what future venues pay."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                {(es ? [
                  "✅ Ofertas en vivo ilimitadas",
                  "✅ Notificaciones push a clientes cercanos",
                  "✅ Panel de analíticas completo",
                  "✅ Código QR para canjear ofertas",
                  "✅ Precio bloqueado mientras sigas con nosotros",
                ] : [
                  "✅ Unlimited live deals",
                  "✅ Push notifications to nearby customers",
                  "✅ Full analytics dashboard",
                  "✅ QR code redemptions",
                  "✅ Price locked in as long as you stay",
                ]).map(f => <li key={f}>{f}</li>)}
              </ul>
              <Link
                href="/business/signup"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {es ? "Reservar mi plaza →" : "Claim my spot →"}
              </Link>
            </div>

            {/* Standard */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="font-black text-gray-900 text-lg mb-1">{es ? "Estándar" : "Standard"}</p>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-4xl font-black text-gray-400">€39</span>
                <span className="text-gray-400 text-sm mb-1">{es ? "/mes" : "/mo"}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {es ? "Para locales que se unan después del período de lanzamiento." : "For venues joining after the launch period."}
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                {(es ? [
                  "✅ Ofertas en vivo ilimitadas",
                  "✅ Notificaciones push a clientes cercanos",
                  "✅ Panel de analíticas completo",
                  "✅ Código QR para canjear ofertas",
                ] : [
                  "✅ Unlimited live deals",
                  "✅ Push notifications to nearby customers",
                  "✅ Full analytics dashboard",
                  "✅ QR code redemptions",
                ]).map(f => <li key={f}>{f}</li>)}
              </ul>
              <div className="block text-center bg-gray-100 text-gray-400 font-bold py-3 rounded-xl text-sm">
                {es ? "Disponible próximamente" : "Available after launch"}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-2">
            {es ? `No pierdas tu plaza fundadora` : `Don't lose your founding spot`}
          </h2>
          <p className="text-orange-100 mb-2">
            {es
              ? "Gratis ahora. €19/mes cuando activemos los pagos. €39/mes para todos los demás."
              : "Free now. €19/month when billing starts. €39/month for everyone else."}
          </p>
          {spotsLeft !== null && spotsLeft > 0 && (
            <p className="text-orange-200 text-sm mb-6">
              {es ? `Solo quedan ${spotsLeft} plazas fundadoras.` : `Only ${spotsLeft} founding spots left.`}
            </p>
          )}
          <Link
            href="/business/signup"
            className="inline-block bg-white text-orange-500 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors"
          >
            {es ? "Reservar mi plaza →" : "Claim my founding spot →"}
          </Link>
        </div>
      </main>
    </div>
  );
}
