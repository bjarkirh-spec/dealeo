import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ofertas Bares Benidorm 2026 — Copas Baratas y Happy Hour | Dealeo",
  description: "Encuentra las mejores ofertas de bares en Benidorm. Happy hour, copas 2x1, cervezas baratas y ofertas flash en directo. App gratuita, sin reserva.",
  keywords: ["ofertas benidorm", "happy hour benidorm", "copas 2x1 benidorm", "bares baratos benidorm", "descuentos bares benidorm", "cervezas baratas benidorm", "promociones benidorm", "ofertas copas benidorm", "2x1 benidorm", "donde salir barato benidorm"],
  openGraph: { title: "Ofertas Bares Benidorm 2026 | Dealeo", description: "Las mejores ofertas de bares en Benidorm. Happy hour, copas 2x1 y ofertas flash en directo.", url: "https://www.dealeo.es/ofertas-benidorm", siteName: "Dealeo", type: "website", locale: "es_ES" },
  alternates: { canonical: "https://www.dealeo.es/ofertas-benidorm" },
};

const FAQS = [
  { q: "¿Dónde encontrar ofertas de bares en Benidorm?", a: "En Dealeo puedes ver todas las ofertas de bares en Benidorm actualizadas en tiempo real — happy hour, copas 2x1, cervezas baratas y ofertas flash al momento." },
  { q: "¿Cuándo es el happy hour en Benidorm?", a: "La mayoría de bares en Benidorm tienen happy hour entre las 16:00 y las 20:00, aunque muchos extienden sus promociones hasta más tarde especialmente en el casco antiguo." },
  { q: "¿Hay copas 2x1 en Benidorm?", a: "Sí — las copas 2x1 y los chupitos baratos son muy comunes en Benidorm. Dealeo los lista todos en un mismo lugar, actualizados en directo." },
  { q: "¿Qué zonas de Benidorm cubre Dealeo?", a: "Dealeo cubre el casco antiguo, Rincón de Loix, Playa de Levante, Playa de Poniente y la Avenida del Mediterráneo." },
  { q: "¿Es gratis usar Dealeo en Benidorm?", a: "Totalmente gratis. Sin suscripción, sin comisiones. Encuentra una oferta, canjéala con el código QR y disfruta." },
];

export default function OfertasBenidormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": "Ofertas Bares Benidorm 2026", "url": "https://www.dealeo.es/ofertas-benidorm", "inLanguage": "es", "mainEntity": { "@type": "FAQPage", "mainEntity": FAQS.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) } }) }} />
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Benidorm · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">Ofertas de Bares en Benidorm</h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">Happy hour, copas 2x1, cervezas baratas y ofertas flash — todo en una app gratuita, actualizada en tiempo real.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals" className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg">Ver Ofertas →</Link>
            <Link href="/live" className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-700 transition-colors border border-orange-300">🔴 En Directo</Link>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">La guía de ofertas de bares en Benidorm en tiempo real</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Benidorm tiene cientos de bares compitiendo por tus euros — lo que significa ofertas por todas partes, si sabes dónde buscar. Dealeo lo reúne todo en un solo lugar, actualizado en tiempo real.</p>
          <p className="text-gray-600 leading-relaxed">Ya sea para un happy hour antes de cenar, una ronda 2x1 en el paseo, o una oferta flash de un bar cerca — abre Dealeo, encuentra la oferta y muestra el código QR al personal. Sin impresiones, sin vales.</p>
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
          <h2 className="font-black text-2xl mb-2">¿Tienes un bar en Benidorm?</h2>
          <p className="text-teal-100 mb-6 leading-relaxed">Publica tus ofertas en Dealeo gratis. Llega a turistas y locales que buscan descuentos ahora mismo.</p>
          <Link href="/business" className="inline-block bg-white text-teal-600 font-black px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors">Únete gratis →</Link>
        </section>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href="/benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all"><p className="font-semibold text-gray-900 text-sm">Todas las ofertas Benidorm →</p></Link>
          <Link href="/ofertas-alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all"><p className="font-semibold text-gray-900 text-sm">Ofertas Alicante →</p></Link>
        </div>
        <div className="text-center"><Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Volver a Dealeo</Link></div>
      </div>
    </div>
  );
}
