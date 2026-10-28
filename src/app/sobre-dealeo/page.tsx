import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Dealeo — App de Ofertas de Bares y Restaurantes en Alicante y Benidorm",
  description: "Dealeo es la app gratuita para encontrar happy hour, copas 2x1, descuentos en restaurantes y ofertas flash en bares de Alicante y Benidorm. Descubre cómo funciona.",
  keywords: ["sobre dealeo", "que es dealeo", "app ofertas bares alicante", "app happy hour alicante", "app descuentos restaurantes alicante", "dealeo app", "ofertas bares benidorm app", "app copas baratas alicante", "guia bares alicante", "descuentos bares alicante benidorm"],
  openGraph: { title: "Sobre Dealeo — App de Ofertas en Alicante y Benidorm", description: "Dealeo es la app gratuita para encontrar happy hour, 2x1 y ofertas flash en bares de Alicante y Benidorm.", url: "https://www.dealeo.es/sobre-dealeo", siteName: "Dealeo", type: "website", locale: "es_ES" },
  alternates: { canonical: "https://www.dealeo.es/sobre-dealeo" },
};

export default function SobreDealeoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": "Sobre Dealeo", "url": "https://www.dealeo.es/sobre-dealeo", "inLanguage": "es", "description": "Dealeo es la app gratuita para encontrar happy hour, copas 2x1 y ofertas flash en bares de Alicante y Benidorm." }) }} />
      <div className="bg-gradient-to-br from-teal-600 to-teal-500 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">Sobre Dealeo</h1>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">La app gratuita para encontrar happy hour, copas 2x1 y ofertas flash en bares y restaurantes de Alicante y Benidorm.</p>
          <Link href="/deals" className="bg-white text-teal-600 font-black px-8 py-4 rounded-2xl text-lg hover:bg-teal-50 transition-colors shadow-lg">Ver Ofertas Ahora →</Link>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">¿Qué es Dealeo?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Dealeo es una app gratuita que muestra las mejores ofertas de comida y bebida en bares y restaurantes de Alicante y Benidorm — incluyendo ofertas flash en directo, happy hours, copas 2x1, descuentos en comida y mucho más.</p>
          <p className="text-gray-600 leading-relaxed mb-4">Los locales publican sus ofertas en tiempo real. Tú recibes una notificación en el momento en que algo se active cerca de ti. Muestra el código QR al personal y disfruta el descuento. Sin imprimir, sin vales, sin complicaciones.</p>
          <p className="text-gray-600 leading-relaxed">Completamente gratis para los usuarios. Sin suscripción, sin comisiones ocultas.</p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">¿Cómo funciona?</h2>
          <div className="grid gap-4">
            {[
              { step: "1", title: "Busca ofertas cerca de ti", desc: "Ve happy hours, copas 2x1 y ofertas flash cerca — actualizadas en tiempo real y ordenadas por distancia." },
              { step: "2", title: "Elige tu oferta", desc: "Toca cualquier oferta para ver los detalles completos, la ubicación del local y los horarios." },
              { step: "3", title: "Canjea con código QR", desc: "Muestra el código QR al personal del local. Lo escanean, obtienes el descuento." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white font-black rounded-xl flex items-center justify-center flex-shrink-0 text-lg">{step}</div>
                <div><h3 className="font-bold text-gray-900 mb-1">{title}</h3><p className="text-gray-500 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Tipos de ofertas en Dealeo</h2>
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
          <h2 className="text-2xl font-black text-gray-900 mb-6">¿Dónde opera Dealeo?</h2>
          <div className="grid gap-3">
            {[
              { city: "Alicante", desc: "Centro, El Puerto, Ensanche, Altozano, Casco Antiguo y más.", href: "/alicante" },
              { city: "Benidorm", desc: "Casco Antiguo, Rincón de Loix, Playa de Levante, Playa de Poniente.", href: "/benidorm" },
            ].map(({ city, desc, href }) => (
              <Link key={city} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-orange-300 transition-all">
                <span className="text-2xl">📍</span>
                <div className="flex-1"><p className="font-semibold text-gray-900">{city}</p><p className="text-gray-400 text-sm">{desc}</p></div>
                <span className="text-gray-300">→</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">¿Tienes un bar o restaurante?</h2>
          <p className="text-teal-100 mb-6 leading-relaxed">Publica tus ofertas en Dealeo gratis. Llega a cientos de clientes que buscan descuentos ahora mismo en Alicante y Benidorm.</p>
          <Link href="/business" className="inline-block bg-white text-teal-600 font-black px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors">Únete gratis →</Link>
        </section>
        <div className="text-center"><Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Volver a Dealeo</Link></div>
      </div>
    </div>
  );
}
