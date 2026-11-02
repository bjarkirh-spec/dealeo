import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2-for-1 Drinks in Benidorm 2026 — Best Cocktail Deals | Dealeo",
  description: "Find 2-for-1 cocktail and drink deals in Benidorm right now. Updated in real time. Levante Beach, Old Town, Rincon de Loix. Free, no sign-up.",
  keywords: [
    "2 for 1 benidorm", "2 for 1 cocktails benidorm", "2 for 1 drinks benidorm",
    "2 for 1 cocktails near me", "2 for 1 drinks near me", "twoforone benidorm",
    "buy one get one benidorm", "bogof drinks benidorm", "two for one benidorm",
    "happy hour 2 for 1 benidorm",
  ],
  openGraph: {
    title: "2-for-1 Drinks in Benidorm 2026 | Dealeo",
    description: "Find 2-for-1 cocktail and drink deals in Benidorm, updated live. Levante Beach, Old Town and Rincon de Loix. Free to use.",
    url: "https://www.dealeo.es/2-for-1-benidorm",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/2-for-1-benidorm" },
};

const FAQS = [
  {
    q: "Where can I find 2-for-1 cocktails in Benidorm?",
    a: "2-for-1 cocktail deals are very common in Benidorm, especially on Levante Beach and in Rincon de Loix. Dealeo shows all current 2-for-1 deals in real time so you always know where to go.",
  },
  {
    q: "What time are 2-for-1 deals in Benidorm?",
    a: "Most 2-for-1 deals in Benidorm run during happy hour, typically 4pm–8pm. Some bars extend them later or run them all day. Dealeo shows exact times and live countdowns for every deal.",
  },
  {
    q: "Are 2-for-1 drinks common in Benidorm?",
    a: "Very common — Benidorm is one of the best places in Europe for 2-for-1 drink deals. Cocktails, shots, beer and wine 2-for-1s are all listed on Dealeo.",
  },
  {
    q: "How do I redeem a 2-for-1 deal on Dealeo?",
    a: "Tap the deal in the Dealeo app, then show the QR code to the bartender when ordering. They scan it and you get the 2-for-1 price. No vouchers, no printing needed.",
  },
];

export default function TwoForOneBenidormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "2-for-1 Drinks in Benidorm 2026",
            "url": "https://www.dealeo.es/2-for-1-benidorm",
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
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-3">Benidorm · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            2-for-1 Drinks in Benidorm
          </h1>
          <p className="text-purple-200 text-lg mb-8 leading-relaxed">
            Buy one get one free cocktails, beers and more — find every 2-for-1 deal in Benidorm right now, updated live.
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
          <h2 className="text-2xl font-black text-gray-900 mb-4">2-for-1 drinks in Benidorm — find them live</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Benidorm is famous for cheap drinks — and 2-for-1 cocktail deals are one of the biggest reasons why. Bars across Levante Beach, the Old Town and Rincon de Loix run buy-one-get-one deals daily, particularly during happy hour.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo aggregates every 2-for-1 deal in Benidorm and shows them live on your phone. When a venue activates a 2-for-1 offer, you see it instantly — with a countdown timer and a QR code to redeem it in seconds.
          </p>
          <p className="text-gray-600 leading-relaxed">
            No need to walk between bars hunting for deals. Open the app, find the best 2-for-1 near you, and go.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">What 2-for-1 deals can I find?</h2>
          <div className="grid gap-4">
            {[
              { title: "2-for-1 Cocktails", desc: "The most popular deal type — two cocktails for the price of one. Hugely common on Levante Beach during happy hour." },
              { title: "2-for-1 Beer", desc: "Buy one pint, get one free. Common in the pubs of Rincon de Loix and along the main strip." },
              { title: "2-for-1 Shots", desc: "Many bars include shots in their 2-for-1 promotions, especially later in the evening." },
              { title: "2-for-1 Wine", desc: "Less common but available — check the Dealeo app for current wine 2-for-1 deals in Benidorm." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1">2️⃣ {title}</h3>
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
          <Link href="/cheap-drinks-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-purple-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Cheap drinks Benidorm →</p>
          </Link>
          <Link href="/happy-hour-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-purple-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Happy hour Benidorm →</p>
          </Link>
          <Link href="/2-for-1-alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-purple-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">2-for-1 Alicante →</p>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-purple-600 font-semibold hover:text-purple-700">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
