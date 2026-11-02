import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cheap Drinks in Benidorm 2026 — Best Bar Deals | Dealeo",
  description: "Find the cheapest drinks in Benidorm right now. Happy hours, 2-for-1 cocktails and cheap beer deals on Levante Beach, Old Town and Rincon de Loix. Free app.",
  keywords: [
    "cheap drinks benidorm", "cheap cocktails benidorm", "cheapest bars benidorm",
    "cheap beer benidorm", "cheap cocktails benidorm levante beach", "best drink prices benidorm",
    "cheapest pints levante beach", "cheap drinks benidorm levante", "cheap bars benidorm",
    "bares baratos benidorm", "copas baratas benidorm", "bebidas baratas benidorm",
  ],
  openGraph: {
    title: "Cheap Drinks in Benidorm 2026 | Dealeo",
    description: "Find the cheapest cocktails, beer and drinks deals in Benidorm. Updated in real time, free to use.",
    url: "https://www.dealeo.es/cheap-drinks-benidorm",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/cheap-drinks-benidorm" },
};

const FAQS = [
  {
    q: "Where can I get cheap drinks in Benidorm?",
    a: "Levante Beach, the Old Town and Rincon de Loix are the best areas for cheap drinks in Benidorm. Many bars run happy hours from 4pm–8pm with 2-for-1 cocktails and reduced beer prices. Dealeo shows you all current deals in real time.",
  },
  {
    q: "What is the cheapest bar in Benidorm?",
    a: "Prices vary by time of day — a bar that charges full price at 9pm may offer 2-for-1 cocktails at 6pm. Dealeo shows you which bars have deals active right now, so you always find the best value.",
  },
  {
    q: "How much does a pint cost in Benidorm?",
    a: "A pint in Benidorm typically costs €3–€5. During happy hour it can drop to €2–€3. Dealeo lists current promotions so you find the best price near you.",
  },
  {
    q: "Are cocktails cheap in Benidorm?",
    a: "Yes — Benidorm is one of the best places in Spain for cheap cocktails. Many bars offer 2-for-1 deals, especially on Levante Beach. Dealeo lists all current cocktail deals updated in real time.",
  },
  {
    q: "What time do bars in Benidorm do happy hour?",
    a: "Most Benidorm bars run happy hour between 4pm and 8pm. Some extend deals later into the evening, especially on the Levante Strip. Dealeo shows live countdown timers for each active deal.",
  },
];

export default function CheapDrinksBenidormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cheap Drinks in Benidorm 2026",
            "url": "https://www.dealeo.es/cheap-drinks-benidorm",
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

      <div className="bg-gradient-to-br from-teal-600 to-teal-500 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-100 text-sm font-semibold uppercase tracking-widest mb-3">Benidorm · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            Cheap Drinks in Benidorm
          </h1>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">
            The best cheap cocktails, happy hours and 2-for-1 beer deals across Levante Beach, Old Town and Rincon de Loix — updated live, free to use.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals?category=twoForOne" className="bg-white text-teal-600 font-black px-8 py-4 rounded-2xl text-lg hover:bg-teal-50 transition-colors shadow-lg">
              See 2-for-1 Deals →
            </Link>
            <Link href="/deals?category=happyHour" className="bg-teal-700 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-teal-800 transition-colors border border-teal-400">
              Happy Hours
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">How to find the cheapest drinks in Benidorm</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Benidorm is already one of the most affordable places to drink in Spain — but with Dealeo, you can go even further. Bars across Levante Beach, the Old Town and Rincon de Loix post their happy hours, 2-for-1 cocktail deals and flash discounts directly to the app in real time.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Instead of walking up and down the strip looking for deals, open Dealeo and see exactly which bars have cheap drinks <em>right now</em> — with a countdown timer and a QR code you show to the bartender.
          </p>
          <p className="text-gray-600 leading-relaxed">
            No vouchers, no sign-up needed. Completely free.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Best areas for cheap drinks in Benidorm</h2>
          <div className="grid gap-4">
            {[
              {
                area: "Levante Beach",
                desc: "The most popular strip in Benidorm. Bars here run non-stop happy hours and 2-for-1 cocktail deals, especially in the early evening. Great for cheap cocktails at sunset.",
              },
              {
                area: "Old Town (Casco Antiguo)",
                desc: "Traditional Spanish bars with local prices. Less touristy than Levante, with cerveza and wine deals that are hard to beat.",
              },
              {
                area: "Rincon de Loix",
                desc: "The English quarter — packed with pubs doing all-day drink promotions, cheap pints and shots deals.",
              },
              {
                area: "Poniente Beach",
                desc: "Quieter, more local feel. Sunset happy hours on the beach with cheaper prices than Levante.",
              },
            ].map(({ area, desc }) => (
              <div key={area} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1">📍 {area}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Types of deals on Dealeo in Benidorm</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🍹", label: "Happy Hours", href: "/deals?category=happyHour" },
              { emoji: "2️⃣", label: "2-for-1 Cocktails", href: "/deals?category=twoForOne" },
              { emoji: "🍺", label: "Cheap Beer", href: "/deals?category=drinks" },
              { emoji: "🔴", label: "Live Flash Deals", href: "/live" },
            ].map(({ emoji, label, href }) => (
              <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-teal-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
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

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href="/benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-teal-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">All Benidorm deals →</p>
          </Link>
          <Link href="/happy-hour-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-teal-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Happy hour Benidorm →</p>
          </Link>
          <Link href="/2-for-1-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-teal-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">2-for-1 Benidorm →</p>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-teal-600 font-semibold hover:text-teal-700">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
