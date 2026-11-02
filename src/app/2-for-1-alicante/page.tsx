import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2-for-1 Drinks in Alicante 2026 — Cocktail & Beer Deals | Dealeo",
  description: "Find 2-for-1 cocktail and drink deals in Alicante right now. Live deals from bars in Centro, El Puerto and Casco Antiguo. Free, no sign-up needed.",
  keywords: [
    "2 for 1 alicante", "2 for 1 cocktails alicante", "2 for 1 drinks alicante",
    "2 for 1 cocktails near me", "two for one alicante", "happy hour 2x1 alicante",
    "ofertas 2x1 alicante", "2x1 cócteles alicante", "2x1 cervezas alicante",
    "bar 2 for 1 near me",
  ],
  openGraph: {
    title: "2-for-1 Drinks in Alicante 2026 | Dealeo",
    description: "Find 2-for-1 cocktail deals in Alicante, updated live. Centro, El Puerto, Casco Antiguo. Free to use.",
    url: "https://www.dealeo.es/2-for-1-alicante",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/2-for-1-alicante" },
};

const FAQS = [
  {
    q: "Where can I find 2-for-1 cocktails in Alicante?",
    a: "2-for-1 cocktail deals in Alicante are most common around El Puerto, Centro and Casco Antiguo. Dealeo shows all current 2-for-1 offers in real time — just open the app and filter by '2-for-1'.",
  },
  {
    q: "What time are 2-for-1 drink deals in Alicante?",
    a: "Most 2-for-1 deals in Alicante run during happy hour, typically 5pm–9pm. Some bars run them earlier or all day. Dealeo shows live countdown timers for every active deal.",
  },
  {
    q: "¿Dónde hay ofertas 2x1 en Alicante?",
    a: "Muchos bares de Alicante ofrecen promociones 2x1, especialmente en el Puerto, Centro y el Casco Antiguo. En Dealeo puedes ver todas las ofertas 2x1 actualizadas en tiempo real.",
  },
  {
    q: "How do I use Dealeo to find 2-for-1 deals?",
    a: "Open the Dealeo app, tap the 2-for-1 category filter, and you'll see every bar running a buy-one-get-one deal right now. Tap any deal and show the QR code to the bartender.",
  },
];

export default function TwoForOneAlicantePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "2-for-1 Drinks in Alicante 2026",
            "url": "https://www.dealeo.es/2-for-1-alicante",
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": FAQS.map(({ q, a }) => ({
                "@type": "Question",
                "name": q,
                "acceptedAnswer": { "@type": "Answer", "text": a },
              })),
            },
          }),
        }}
      />

      <div className="bg-gradient-to-br from-purple-700 to-purple-600 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-3">Alicante · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            2-for-1 Drinks in Alicante
          </h1>
          <p className="text-purple-200 text-lg mb-8 leading-relaxed">
            Buy one get one free cocktails, beers and drinks — find every 2-for-1 deal in Alicante right now, updated live.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals?category=twoForOne" className="bg-white text-purple-700 font-black px-8 py-4 rounded-2xl text-lg hover:bg-purple-50 transition-colors shadow-lg">
              See 2-for-1 Deals →
            </Link>
            <Link href="/live" className="bg-purple-800 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-purple-900 transition-colors border border-purple-400">
              🔴 Live Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">2-for-1 cocktail deals in Alicante — find them live</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Alicante&apos;s bar scene is competitive — and that means 2-for-1 drink deals are everywhere during happy hour. From cocktail bars on El Puerto waterfront to bustling tapas bars in the Casco Antiguo, you&apos;ll find buy-one-get-one offers across the city.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo collects every 2-for-1 deal in Alicante and shows them live on your phone. Tap the deal, show the QR code to the bartender, get your free drink. That simple.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Best areas for 2-for-1 deals in Alicante</h2>
          <div className="grid gap-4">
            {[
              { area: "El Puerto", desc: "Waterfront bars with happy hour 2-for-1 cocktails. Especially good at sunset." },
              { area: "Centro", desc: "The city centre has the highest density of bars running 2-for-1 drink deals in Alicante." },
              { area: "Casco Antiguo", desc: "Old town bars mix traditional Spanish atmosphere with modern cocktail deals." },
              { area: "Ensanche", desc: "Trendy area popular with locals — good for 2-for-1 wine and craft beer deals." },
            ].map(({ area, desc }) => (
              <div key={area} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1">📍 {area}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href="/alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-purple-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">All Alicante deals →</p>
          </Link>
          <Link href="/happy-hour-alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-purple-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Happy hour Alicante →</p>
          </Link>
          <Link href="/2-for-1-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-purple-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">2-for-1 Benidorm →</p>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-purple-600 font-semibold hover:text-purple-700">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
