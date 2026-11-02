import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cheap Drinks in Alicante 2026 — Bar Deals & Happy Hours | Dealeo",
  description: "Find the cheapest drinks in Alicante right now. Happy hours, 2-for-1 cocktails and cheap beer at bars in Centro, El Puerto and Casco Antiguo. Free app.",
  keywords: [
    "cheap drinks alicante", "cheap cocktails alicante", "cheapest bars alicante",
    "cheap beer alicante", "copas baratas alicante", "bares baratos alicante",
    "cheap bars in alicante", "alicante old town bars cheap", "affordable bars alicante",
    "cheap pints alicante", "bar deals alicante tonight",
  ],
  openGraph: {
    title: "Cheap Drinks in Alicante 2026 | Dealeo",
    description: "Find the cheapest cocktails, beer and drink deals in Alicante. Updated in real time, free to use.",
    url: "https://www.dealeo.es/cheap-drinks-alicante",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/cheap-drinks-alicante" },
};

const FAQS = [
  {
    q: "Where can I get cheap drinks in Alicante?",
    a: "El Puerto, Centro and Casco Antiguo have the best selection of bars with cheap drinks deals in Alicante. Many run happy hours from 5pm–9pm with 2-for-1 cocktails and reduced beer prices. Dealeo shows you what's available right now.",
  },
  {
    q: "How much is a beer in Alicante?",
    a: "A beer (caña) in Alicante typically costs €2–€4. During happy hour it can drop to €1.50–€2.50. Check Dealeo for current drink deals near you.",
  },
  {
    q: "Are cocktails expensive in Alicante?",
    a: "Cocktails in Alicante typically cost €7–€12, but during happy hour many bars offer 2-for-1 deals. Dealeo lists all current cocktail happy hours so you always find the best price.",
  },
  {
    q: "¿Dónde están las copas baratas en Alicante?",
    a: "Los mejores bares con copas baratas en Alicante están en el Puerto, el Centro y el Casco Antiguo. Muchos tienen happy hour de 17:00 a 21:00 con cócteles 2x1. Busca en Dealeo las ofertas actuales.",
  },
];

export default function CheapDrinksAlicantePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cheap Drinks in Alicante 2026",
            "url": "https://www.dealeo.es/cheap-drinks-alicante",
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

      <div className="bg-gradient-to-br from-orange-500 to-orange-400 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Alicante · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            Cheap Drinks in Alicante
          </h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">
            The best cheap cocktails, happy hours and 2-for-1 beer deals across Centro, El Puerto and Casco Antiguo — updated live, free to use.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals?category=happyHour" className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg">
              See Happy Hours →
            </Link>
            <Link href="/deals?category=twoForOne" className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-700 transition-colors border border-orange-300">
              2-for-1 Deals
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">How to find the cheapest drinks in Alicante</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Alicante has a vibrant bar scene with something for every budget. The key is knowing where deals are running <em>right now</em>. Dealeo aggregates happy hours, 2-for-1 cocktail offers and live flash deals from bars across the city — updated in real time.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you want a cheap beer on El Puerto waterfront, 2-for-1 cocktails in Casco Antiguo, or a surprise flash deal near your hotel — open Dealeo and it&apos;s all there.
          </p>
          <p className="text-gray-600 leading-relaxed">
            No vouchers to print. No sign-up needed. Just find a deal and show the QR code.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Best areas for cheap drinks in Alicante</h2>
          <div className="grid gap-4">
            {[
              { area: "El Puerto", desc: "Alicante's seafront is full of bars with sunset happy hours and cheap cocktail deals. Great views, even better prices during happy hour." },
              { area: "Centro", desc: "The city centre has the densest concentration of bars with deals — happy hours, 2-for-1s and live flash offers all in one area." },
              { area: "Casco Antiguo", desc: "The old town's winding streets hide some of Alicante's best-value bars. Traditional cervecerías serve cheap beer alongside modern cocktail bars with happy hour deals." },
              { area: "Ensanche", desc: "More local, less touristy — Ensanche has good-value bars popular with Alicante residents. Craft beer and wine deals are common." },
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
          <Link href="/alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">All Alicante deals →</p>
          </Link>
          <Link href="/2-for-1-alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">2-for-1 Alicante →</p>
          </Link>
          <Link href="/cheap-drinks-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Cheap drinks Benidorm →</p>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
