import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Happy Hour in Alicante 2026 — Best Bars & Drink Deals | Dealeo",
  description:
    "Find happy hour deals in Alicante right now. 2-for-1 cocktails, cheap beer, live flash deals from bars and restaurants across Alicante. Free app, no booking needed.",
  keywords: [
    "happy hour alicante", "happy hour alicante 2026", "best happy hour alicante",
    "2 for 1 cocktails alicante", "cheap drinks alicante", "alicante bar deals tonight",
    "happy hour centro alicante", "happy hour puerto alicante", "drinks deals alicante",
    "where to drink cheaply alicante", "alicante nightlife cheap",
  ],
  openGraph: {
    title: "Happy Hour in Alicante 2026 — Best Bars & Drink Deals | Dealeo",
    description:
      "Find the best happy hour deals in Alicante right now. 2-for-1 cocktails, live flash deals and cheap drinks. Free to use.",
    url: "https://www.dealeo.es/happy-hour-alicante",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dealeo.es/happy-hour-alicante",
  },
};

const TIPS = [
  {
    title: "Go between 5pm and 8pm",
    body: "Most Alicante bars run happy hour in the early evening before the dinner rush. This window is when you'll find the most 2-for-1s and reduced-price drinks.",
  },
  {
    title: "Check the Live tab first",
    body: "Some venues post last-minute flash deals — a bar that's quieter than expected might drop a 2-for-1 for the next 30 minutes. The Live tab on Dealeo shows these in real time.",
  },
  {
    title: "Head to El Puerto or Casco Antiguo",
    body: "These two areas have the highest concentration of bars with regular happy hour promotions. El Puerto has great sunset views to go with the deals.",
  },
  {
    title: "Enable notifications",
    body: "Turn on Dealeo notifications and you'll get an alert the moment a live flash deal drops near you — no need to keep checking.",
  },
];

const FAQS = [
  {
    q: "What time is happy hour in Alicante?",
    a: "Most bars in Alicante run happy hour between 5pm and 8pm, though some venues extend deals later. Dealeo shows live times for each venue so you always know what's currently on.",
  },
  {
    q: "Where is the best happy hour in Alicante?",
    a: "El Puerto, Casco Antiguo and Centro have the highest concentration of bars with happy hour deals. Browse the map on Dealeo to find the closest one to you.",
  },
  {
    q: "Are there 2-for-1 cocktail deals in Alicante?",
    a: "Yes — 2-for-1 cocktails are one of the most common deal types on Dealeo in Alicante. Filter by '2-for-1' in the app to see current offers.",
  },
  {
    q: "Is Dealeo free to use?",
    a: "Completely free. Browse deals, save your favourites, and redeem with a QR code at the venue. No subscription, no booking fee.",
  },
  {
    q: "¿Dónde encontrar el mejor happy hour en Alicante?",
    a: "En Dealeo puedes ver todas las ofertas de happy hour en Alicante en tiempo real — copas 2x1, descuentos en cervezas y ofertas flash en directo.",
  },
];

export default function HappyHourAlicantePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Happy Hour in Alicante — Best Bars & Drink Deals",
            "description": "Find the best happy hour deals in Alicante. 2-for-1 cocktails, cheap beer, live flash deals from bars and restaurants.",
            "url": "https://www.dealeo.es/happy-hour-alicante",
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

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Alicante · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            Happy Hour in Alicante
          </h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">
            The best 2-for-1 cocktails, cheap beer deals and live flash offers from bars across Alicante — updated in real time, free to use.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/deals?category=happyHour"
              className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              See Happy Hours →
            </Link>
            <Link
              href="/live"
              className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-700 transition-colors border border-orange-300"
            >
              🔴 Live Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Intro */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Happy hour in Alicante — your real-time guide</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Alicante has a fantastic bar scene — from seafront chiringuitos at El Puerto to packed tapas bars in the Casco Antiguo. Happy hour is a big part of the culture here, with most bars offering drink deals in the early evening.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The problem is knowing which bars are running deals <em>right now</em>. That&apos;s what Dealeo solves. Venues post their happy hour times and flash deals directly to the app — you see them live, with a countdown, and redeem with a QR code.
          </p>
          <p className="text-gray-600 leading-relaxed">
            No searching through Instagram stories, no outdated blog posts. Just open Dealeo and see what&apos;s on.
          </p>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Tips for finding the best happy hour in Alicante</h2>
          <div className="grid gap-4">
            {TIPS.map(({ title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-2">💡 {title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deal types */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">What you&apos;ll find on Dealeo in Alicante</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🍹", label: "Happy Hours", href: "/deals?category=happyHour" },
              { emoji: "2️⃣", label: "2-for-1 Drinks", href: "/deals?category=twoForOne" },
              { emoji: "🍔", label: "Food Deals", href: "/deals?category=food" },
              { emoji: "🔴", label: "Live Flash Deals", href: "/live" },
              { emoji: "🎉", label: "Experiences", href: "/deals?category=experiences" },
              { emoji: "🥂", label: "Drink Specials", href: "/deals?category=drinks" },
            ].map(({ emoji, label, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">Own a bar in Alicante?</h2>
          <p className="text-teal-100 mb-6 leading-relaxed">
            Post your happy hour on Dealeo for free. Reach customers actively looking for deals right now.
          </p>
          <Link
            href="/business"
            className="inline-block bg-white text-teal-600 font-black px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors"
          >
            List your venue →
          </Link>
        </section>

        {/* Internal links */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href="/alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">All Alicante deals →</p>
          </Link>
          <Link href="/benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Happy hour Benidorm →</p>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">
            ← Back to Dealeo
          </Link>
        </div>
      </div>
    </div>
  );
}
