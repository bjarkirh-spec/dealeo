import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drink Deals Near Me — Live Bar Offers in Alicante & Benidorm | Dealeo",
  description: "Find drink deals near you right now. Cheap cocktails, happy hours and 2-for-1 bar offers in Alicante and Benidorm. Free, no sign-up needed.",
  keywords: [
    "drink deals near me", "drinks deals near me", "cheap drinks near me",
    "drink offers near me", "bar deals near me", "discounted drinks near me",
    "drinks near me", "cheap cocktail near me", "cheapest drinks near me",
    "drink specials near me", "happy hour drinks near me",
  ],
  openGraph: {
    title: "Drink Deals Near Me | Dealeo",
    description: "Find the best drink deals near you in Alicante and Benidorm. Live happy hours, 2-for-1 cocktails, updated in real time.",
    url: "https://www.dealeo.es/drink-deals-near-me",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/drink-deals-near-me" },
};

const FAQS = [
  {
    q: "How do I find drink deals near me?",
    a: "Open Dealeo and allow location access. You'll see all active drink deals near you right now — happy hours, 2-for-1s, live flash offers — sorted by distance.",
  },
  {
    q: "What drink deals are near me tonight?",
    a: "Check the Dealeo app. The Live tab shows deals activated in real time by bars near your current location. The Deals tab shows all scheduled happy hours and 2-for-1 offers on tonight.",
  },
  {
    q: "Are there cheap cocktail deals near me?",
    a: "In Alicante and Benidorm, cheap cocktail deals and 2-for-1 offers are very common. Dealeo lists them all, updated in real time so you always see what's cheapest near you right now.",
  },
  {
    q: "How do I get notified about drink deals near me?",
    a: "Enable notifications in the Dealeo app. When a bar near you activates a live flash deal or happy hour, you get an instant notification — so you never miss a deal.",
  },
];

export default function DrinkDealsNearMePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Drink Deals Near Me — Alicante & Benidorm",
            "url": "https://www.dealeo.es/drink-deals-near-me",
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

      <div className="bg-gradient-to-br from-teal-700 to-teal-600 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Near You · Live</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            Drink Deals Near Me
          </h1>
          <p className="text-teal-200 text-lg mb-8 leading-relaxed">
            Find the best drink deals near you right now — happy hours, 2-for-1 cocktails and live flash offers from bars in Alicante and Benidorm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals" className="bg-white text-teal-700 font-black px-8 py-4 rounded-2xl text-lg hover:bg-teal-50 transition-colors shadow-lg">
              Find Deals Near Me →
            </Link>
            <Link href="/live" className="bg-teal-800 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-teal-900 transition-colors border border-teal-500">
              🔴 Live Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">The best drink deals near you, in real time</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo shows you every drink deal active near your location right now. Bars post their happy hours and promotions live — when a deal goes live, you see it. When it ends, it&apos;s gone.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            No outdated websites. No guessing. Just open the app, see what&apos;s on near you, pick the best deal, and walk in with a QR code ready.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Currently covering <strong>Alicante</strong> and <strong>Benidorm</strong> — two of Spain&apos;s best cities for bar deals.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Types of drink deals near you</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🍹", label: "Happy Hours", href: "/happy-hour-near-me" },
              { emoji: "2️⃣", label: "2-for-1 Drinks", href: "/2-for-1-near-me" },
              { emoji: "🍺", label: "Cheap Beer", href: "/deals?category=drinks" },
              { emoji: "🔴", label: "Live Flash Deals", href: "/live" },
              { emoji: "🥂", label: "Cocktail Deals", href: "/deals?category=drinks" },
              { emoji: "🍽️", label: "Food & Drink", href: "/deals?category=food" },
            ].map(({ emoji, label, href }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-teal-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Drink deals near me by city</h2>
          <div className="grid gap-3">
            {[
              { label: "Drink deals in Alicante", desc: "Happy hours and 2-for-1 cocktails from bars across Alicante.", href: "/alicante" },
              { label: "Drink deals in Benidorm", desc: "Levante Beach, Old Town and Rincon de Loix — the best bar deals in Benidorm.", href: "/benidorm" },
              { label: "Cheap drinks Alicante", desc: "The cheapest drinks in Alicante right now.", href: "/cheap-drinks-alicante" },
              { label: "Cheap drinks Benidorm", desc: "The cheapest drinks in Benidorm right now.", href: "/cheap-drinks-benidorm" },
            ].map(({ label, desc, href }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-teal-300 hover:shadow-md transition-all">
                <span className="text-2xl flex-shrink-0">🍹</span>
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
          <Link href="/" className="text-teal-600 font-semibold hover:text-teal-700">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
