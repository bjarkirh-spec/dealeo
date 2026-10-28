import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ofertas Bares y Restaurantes Alicante 2026 — Dealeo",
  description: "Encuentra las mejores ofertas de bares y restaurantes en Alicante. Happy hour, copas 2x1, descuentos en comida y ofertas flash en directo. Gratis, sin reserva.",
  keywords: ["ofertas alicante", "happy hour alicante", "copas 2x1 alicante", "descuentos bares alicante", "ofertas restaurantes alicante", "bares baratos alicante", "donde tomar algo barato alicante", "promociones bares alicante", "ofertas copas alicante", "descuentos copas alicante"],
  openGraph: { title: "Ofertas Bares y Restaurantes Alicante 2026 | Dealeo", description: "Las mejores ofertas de bares y restaurantes en Alicante. Happy hour, copas 2x1 y ofertas flash en directo.", url: "https://www.dealeo.es/ofertas-alicante", siteName: "Dealeo", type: "website", locale: "es_ES" },
  alternates: { canonical: "https://www.dealeo.es/ofertas-alicante" },
};

const FAQS = [
  { q: "¿Dónde encontrar ofertas de bares en Alicante?", a: "En Dealeo puedes ver todas las ofertas de bares y restaurantes en Alicante en tiempo real — happy hour, copas 2x1, descuentos en comida y ofertas flash al momento." },
  { q: "¿Cuándo es el happy hour en Alicante?", a: "La mayoría de bares en Alicante tienen happy hour entre las 17:00 y las 20:00, aunque muchos extienden sus ofertas más tarde. En Dealeo puedes ver los horarios exactos de cada local." },
  { q: "¿Hay copas 2x1 en Alicante?", a: "Sí — las copas 2x1 son uno de los tipos de oferta más comunes en Dealeo. Filtra por '2x1' en la app para ver las ofertas actuales cerca de ti." },
  { q: "¿Es gratis usar Dealeo?", a: "Totalmente gratis. Busca ofertas, guarda tus favoritas y canjéalas con un código QR en el local. Sin suscripción, sin comisiones." },
  { q: "¿Qué zonas de Alicante cubre Dealeo?", a: "Dealeo cubre bares y restaurantes en todo Alicante — Centro, El Puerto, Ensanche, Altozano, Casco Antiguo y más barrios que se van añadiendo continuamente." },
];

export default function OfertasAlicantePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": "Ofertas Bares y Restaurantes Alicante", "url": "https://www.dealeo.es/ofertas-alicante", "inLanguage": "es", "mainEntity": { "@type": "FAQPage", "mainEntity": FAQS.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) } }) }} />
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Alicante · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">Ofertas de Bares en Alicante</h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">Happy hour, copas 2x1, descuentos en comida y ofertas flash en directo — todo en una app gratuita.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals" className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg">Ver Ofertas →</Link>
            <Link href="/live" className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-700 transition-colors border border-orange-300">🔴 En Directo</Link>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">La guía de ofertas de bares en Alicante en tiempo real</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Alicante tiene una escena de bares increíble — desde chiringuitos en el Puerto hasta bares de tapas en el Casco Antiguo. El happy hour es una parte esencial de la cultura local, con la mayoría de bares ofreciendo descuentos en copas por la tarde.</p>
          <p className="text-gray-600 leading-relaxed mb-4">El problema es saber qué bares tienen ofertas ahora mismo. Eso es exactamente lo que resuelve Dealeo. Los locales publican sus horarios de happy hour y ofertas flash directamente en la app — tú las ves en tiempo real y las canjeas con un código QR.</p>
          <p className="text-gray-600 leading-relaxed">Sin buscar en Instagram, sin blogs desactualizados. Abre Dealeo y ve qué hay.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Tipos de ofertas en Dealeo Alicante</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🍹", label: "Happy Hour", href: "/deals?category=happyHour" },
              { emoji: "🍺", label: "Copas 2x1", href: "/deals?category=twoForOne" },
              { emoji: "🍔", label: "Ofertas Comida", href: "/deals?category=food" },
              { emoji: "🔴", label: "Ofertas Flash", href: "/live" },
              { emoji: "🎉", label: "Experiencias", href: "/deals?category=experiences" },
              { emoji: "🥂", label: "Especiales Bebidas", href: "/deals?category=drinks" },
            ].map(({ emoji, label, href }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">¿Tienes un bar o restaurante en Alicante?</h2>
          <p className="text-teal-100 mb-6 leading-relaxed">Publica tus ofertas en Dealeo gratis. Llega a clientes que buscan descuentos ahora mismo.</p>
          <Link href="/business" className="inline-block bg-white text-teal-600 font-black px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors">Únete gratis →</Link>
        </section>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href="/alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all"><p className="font-semibold text-gray-900 text-sm">Todas las ofertas Alicante →</p></Link>
          <Link href="/ofertas-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all"><p className="font-semibold text-gray-900 text-sm">Ofertas Benidorm →</p></Link>
        </div>
        <div className="text-center"><Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Volver a Dealeo</Link></div>
      </div>
    </div>
  );
}
