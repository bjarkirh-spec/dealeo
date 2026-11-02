import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2-for-1 Drinks Near Me — Live Cocktail Deals | Dealeo",
  description: "Find 2-for-1 drink deals near you right now. Buy one get one free cocktails, beer and more in Alicante and Benidorm. Free, updated live.",
  keywords: [
    "2 for 1 cocktails near me", "2 for 1 drinks near me", "2 for 1 near me",
    "two for one drinks near me", "buy one get one drinks near me", "bogof cocktails near me",
    "2 for 1 cocktail near me", "2 for 1 specials near me", "twoforone near me",
    "cheap cocktails near me",
  ],
  openGraph: {
    title: "2-for-1 Drinks Near Me | Dealeo",
    description: "Find 2-for-1 cocktail and drink deals near you in Alicante and Benidorm. Updated live, free to use.",
    url: "https://www.dealeo.es/2-for-1-near-me",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/2-for-1-near-me" },
};

const FAQS = [
  {
    q: "How do I find 2-for-1 drinks near me?",
    a: "Open Dealeo, filter by '2-for-1' and allow location access. You'll instantly see every bar near you running a buy-one-get-one deal right now, sorted by distance.",
  },
  {
    q: "Where can I get 2-for-1 cocktails near me?",
    a: "In Alicante and Benidorm, 2-for-1 cocktail deals are very common during happy hour. Dealeo shows them all live — tap any deal and show the QR code at the bar.",
  },
  {
    q: "Are there 2-for-1 drinks near me tonight?",
    a: "Open the Dealeo app to check. The Live tab shows all deals active right now, including any 2-for-1 offers near your current location.",
  },
  {
    q: "How does a 2-for-1 deal work on Dealeo?",
    a: "Tap the deal in the app to open it, then show the QR code to the bartender when you order. They scan it and give you two drinks for the price of one. No voucher, no printing needed.",
  },
];

export default function TwoForOneNearMePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "2-for-1 Drinks Near Me",
            "url": "https://www.dealeo.es/2-for-1-near-me",
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
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-3">Live Near You</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            2-for-1 Drinks Near Me
          </h1>
          <p className="text-purple-200 text-lg mb-8 leading-relaxed">
            Find buy-one-get-one drink deals near you right now — 2-for-1 cocktails, beer and more in Alicante and Benidorm, updated live.
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
          <h2 className="text-2xl font-black text-gray-900 mb-4">2-for-1 drinks near you — found instantly</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo is the fastest way to find 2-for-1 drink deals near you. Open the app, filter by 2-for-1, and see every bar near your location running a buy-one-get-one offer right now — no outdated blog lists, no guessing.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo currently covers bars in <strong>Alicante</strong> and <strong>Benidorm</strong>, where 2-for-1 cocktail deals are extremely common — especially during happy hour on Levante Beach and in the city centres.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">2-for-1 deals by location</h2>
          <div className="grid gap-3">
            {[
              { label: "2-for-1 in Alicante", desc: "Centro, El Puerto, Casco Antiguo — every 2-for-1 drink deal in Alicante.", href: "/2-for-1-alicante" },
              { label: "2-for-1 in Benidorm", desc: "Levante Beach, Old Town, Rincon de Loix — buy-one-get-one deals across Benidorm.", href: "/2-for-1-benidorm" },
              { label: "Happy hour near me", desc: "All happy hours near your location, updated live.", href: "/happy-hour-near-me" },
              { label: "Cheap drinks near me", desc: "The cheapest drink deals near you right now.", href: "/drink-deals-near-me" },
            ].map(({ label, desc, href }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-purple-300 hover:shadow-md transition-all">
                <span className="text-2xl flex-shrink-0">2️⃣</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
                <span className="text-gray-300 flex-shrink-0">→</span>
              </Link>
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

        <div className="text-center">
          <Link href="/" className="text-purple-600 font-semibold hover:text-purple-700">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
