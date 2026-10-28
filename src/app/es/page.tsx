import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dealeo — Happy Hour y Ofertas en Directo en Alicante y Benidorm",
  description:
    "Encuentra los mejores happy hours, copas 2x1 y ofertas flash en bares de Alicante y Benidorm. Actualizado en tiempo real. Gratis.",
  keywords: [
    "happy hour alicante", "ofertas bares alicante", "copas 2x1 alicante",
    "happy hour benidorm", "ofertas benidorm", "descuentos bares alicante",
    "app ofertas bares alicante", "copa barata alicante", "benidorm ofertas bares",
    "dealeo", "ofertas flash alicante",
  ],
  openGraph: {
    title: "Dealeo — Happy Hour y Ofertas en Directo | Alicante y Benidorm",
    description:
      "Encuentra los mejores happy hours, copas 2x1 y ofertas flash en bares de Alicante y Benidorm. Gratis, en tiempo real.",
    url: "https://www.dealeo.es/es",
    siteName: "Dealeo",
    type: "website",
    locale: "es_ES",
  },
  alternates: {
    canonical: "https://www.dealeo.es/es",
  },
};

const FEATURES = [
  {
    emoji: "🔴",
    title: "Ofertas flash en directo",
    desc: "Cuando un bar activa una oferta, te llega una notificación al momento. No hay que buscar: te avisamos nosotros.",
  },
  {
    emoji: "🍹",
    title: "Happy hours reales",
    desc: "Los horarios los ponen los propios locales. Si pone que el happy hour es de 18:00 a 20:00, es porque el bar lo ha confirmado.",
  },
  {
    emoji: "📍",
    title: "Por barrios y zonas",
    desc: "Filtra por Alicante o Benidorm, y dentro de cada ciudad por zona. Sin desplazarte a ningún sitio que no te quede cerca.",
  },
  {
    emoji: "🆓",
    title: "Gratis. Sin trampa.",
    desc: "Sin suscripción, sin código de descuento que imprimir, sin registro obligatorio. Abres la app, ves las ofertas, vas al bar.",
  },
];

const SCENARIOS = [
  {
    emoji: "🏨",
    text: "Acabas de llegar al hotel. No conoces la zona. Abres Dealeo, filtras Benidorm — 14 happy hours activos ahora mismo, 3 a menos de 5 minutos andando.",
    label: "Turista · Primera noche",
  },
  {
    emoji: "🔔",
    text: "Notificación a las 20:47: un bar en la Calle Mayor acaba de activar una oferta 2x1 por 90 minutos. Ya estás de camino.",
    label: "Local · Centro de Alicante",
  },
  {
    emoji: "💬",
    text: "Grupo de seis personas sin plan. Alguien saca Dealeo. Tres opciones con ofertas activas cerca. Decisión tomada en 30 segundos.",
    label: "Salida en grupo · Benidorm",
  },
];

const FAQS = [
  {
    q: "¿Qué es Dealeo?",
    a: "Dealeo es una app gratuita que muestra los mejores happy hours, copas 2x1 y ofertas flash en bares y restaurantes de Alicante y Benidorm, actualizados en tiempo real.",
  },
  {
    q: "¿Cómo sé que las ofertas son reales?",
    a: "Cada oferta la publica directamente el local desde su panel de control. Si está en la app, el bar lo ha activado — no son ofertas inventadas ni desactualizadas.",
  },
  {
    q: "¿Tiene coste para los clientes?",
    a: "No. Dealeo es completamente gratis para quienes buscan ofertas. Sin suscripción, sin comisión, sin letra pequeña.",
  },
  {
    q: "¿Cómo canjeo una oferta?",
    a: "Toca la oferta, se abre una pantalla con un código QR. Se lo muestras al personal del local. Lo escanean y listo.",
  },
  {
    q: "¿Puedo recibir notificaciones cuando salga una oferta?",
    a: "Sí. Toca el icono de la campana en la app y activa las notificaciones. Te avisamos en cuanto un bar cerca active algo en directo.",
  },
  {
    q: "¿Los precios son exactos?",
    a: "Los precios los fija cada local y pueden variar. Si ves un precio distinto en el bar, usa el botón 'Precio incorrecto' en la app para avisarnos.",
  },
];

export default function EsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Dealeo — Happy Hour y Ofertas en Alicante y Benidorm",
            description: "Encuentra los mejores happy hours, copas 2x1 y ofertas flash en bares de Alicante y Benidorm.",
            url: "https://www.dealeo.es/es",
            inLanguage: "es",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: FAQS.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          }),
        }}
      />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-new.png.png" alt="Dealeo" width={28} height={28} className="rounded-lg" />
          <span className="font-black text-xl"><span className="text-orange-500">Deal</span><span className="text-teal-500">eo</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/deals" className="hidden sm:block text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors">
            Ver ofertas
          </Link>
          <Link href="/business" className="text-sm font-medium text-gray-400 hover:text-teal-400 transition-colors">
            Para locales →
          </Link>
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">EN</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 py-20 text-center" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.1) 0%, transparent 60%)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Alicante · Benidorm
          </div>
          <h1 className="font-black text-5xl sm:text-6xl leading-tight tracking-tight mb-4" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            Happy hours y<br />
            <span className="text-orange-500">ofertas en directo.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Más de 157 bares. Actualizado en tiempo real. Gratis para siempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/deals"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
            >
              Ver ofertas ahora →
            </Link>
            <Link
              href="/live"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors border border-gray-700"
            >
              🔴 En directo
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-gray-500">
            <span>Sin registro</span>
            <span className="text-gray-700">·</span>
            <span>Sin suscripción</span>
            <span className="text-gray-700">·</span>
            <span>Sin vouchers</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-gray-800 bg-gray-900 py-10">
        <div className="max-w-2xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          {[
            { n: "157+", label: "bares y restaurantes" },
            { n: "2", label: "ciudades cubiertas" },
            { n: "€0", label: "coste para el usuario" },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-orange-500 mb-1">{n}</div>
              <div className="text-xs text-gray-500 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Cómo funciona</p>
        <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
          Tres pasos. Una copa más barata.
        </h2>
        <div className="grid gap-4">
          {[
            { n: "1", title: "Abre Dealeo", desc: "Sin registro necesario. Se carga en segundos y muestra las ofertas activas cerca de ti ahora mismo." },
            { n: "2", title: "Elige tu oferta", desc: "Happy hours, 2x1, ofertas flash, comida — filtra por categoría o zona y elige lo que te apetezca." },
            { n: "3", title: "Muestra el QR", desc: "El personal del bar escanea el código QR. Nada que imprimir, ningún código que teclear." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white font-black rounded-xl flex items-center justify-center flex-shrink-0 text-lg">{n}</div>
              <div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-900 border-y border-gray-800 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">Por qué Dealeo</p>
          <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            No es otra app de descuentos.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map(({ emoji, title, desc }) => (
              <div key={title} className="bg-gray-950 border border-gray-800 rounded-2xl p-5">
                <div className="text-2xl mb-3">{emoji}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Ciudades</p>
        <h2 className="text-3xl font-black mb-8" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
          Dos ciudades.<br />Cientos de razones para salir.
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/alicante" className="bg-gray-900 border border-gray-800 hover:border-orange-500/40 rounded-2xl p-6 transition-colors group">
            <div className="text-4xl mb-3">🏙️</div>
            <h3 className="font-black text-xl text-white mb-1">Alicante</h3>
            <p className="text-gray-500 text-sm mb-4">Centro, El Puerto, Ensanche, Altozano, Casco Antiguo y más barrios añadiéndose continuamente.</p>
            <span className="text-orange-500 text-sm font-bold group-hover:underline">Ver ofertas en Alicante →</span>
          </Link>
          <Link href="/benidorm" className="bg-gray-900 border border-gray-800 hover:border-teal-500/40 rounded-2xl p-6 transition-colors group">
            <div className="text-4xl mb-3">🏖️</div>
            <h3 className="font-black text-xl text-white mb-1">Benidorm</h3>
            <p className="text-gray-500 text-sm mb-4">Strip de Levante, Casco Antiguo, Rincón de Loix, Poniente. Aquí siempre hay algo activo.</p>
            <span className="text-teal-400 text-sm font-bold group-hover:underline">Ver ofertas en Benidorm →</span>
          </Link>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="bg-gray-900 border-y border-gray-800 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Tres noches</p>
          <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            Una app. Cualquier situación.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {SCENARIOS.map(({ emoji, text, label }) => (
              <div key={label} className="bg-gray-950 border border-gray-800 rounded-2xl p-5">
                <div className="text-2xl mb-3">{emoji}</div>
                <p className="text-gray-300 text-sm leading-relaxed italic mb-4">"{text}"</p>
                <p className="text-gray-600 text-xs font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR BARS */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-teal-900/60 to-gray-900 border border-teal-800/40 rounded-3xl p-8 sm:p-10">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">Para locales</p>
          <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            ¿Tienes un bar o restaurante?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
            Publica tu happy hour en 30 segundos. Cuando activas una oferta flash, los clientes de la zona reciben una notificación al instante y vienen a tu local.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/business"
              className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-black px-6 py-3 rounded-xl transition-colors"
            >
              Únete gratis →
            </Link>
            <a
              href="https://wa.me/message/dealeo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold px-6 py-3 rounded-xl transition-colors border border-gray-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.522 5.862L0 24l6.277-1.497A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.016-1.377l-.36-.213-3.727.888.923-3.638-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Preguntas frecuentes</p>
          <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            Todo lo que necesitas saber.
          </h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-gray-950 border border-gray-800 rounded-2xl p-5">
                <h3 className="font-bold text-white mb-2 text-sm">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 text-center px-6" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 60%)" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}>
            La próxima copa <span className="text-orange-500">te sale más barata.</span>
          </h2>
          <p className="text-gray-500 mb-8">Sin registro. Sin descargas. Abre la web y ya.</p>
          <Link
            href="/deals"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl text-lg transition-colors shadow-lg"
          >
            Ver ofertas ahora →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-lg"><span className="text-orange-500">Deal</span><span className="text-teal-500">eo</span></span>
          </Link>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Términos</Link>
            <a href="mailto:hello@dealeo.es" className="hover:text-gray-400 transition-colors">Contacto</a>
            <Link href="/" className="hover:text-gray-400 transition-colors">English</Link>
          </div>
        </div>
      </footer>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&display=swap" />
    </div>
  );
}
