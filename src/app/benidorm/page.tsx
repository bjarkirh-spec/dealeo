import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Happy Hour & Drinks Deals in Benidorm — Dealeo",
  description:
    "Find the best happy hours, 2-for-1 drinks and live flash deals in Benidorm. Levante Strip, Old Town, Rincon de Loix and more. Free to use.",
  keywords: [
    "happy hour benidorm", "deals benidorm", "ofertas benidorm",
    "2 for 1 drinks benidorm", "benidorm bar deals", "benidorm nightlife deals",
    "happy hour levante benidorm", "cheap drinks benidorm", "benidorm strip offers",
    "rincon de loix deals",
  ],
  openGraph: {
    title: "Happy Hour & Drinks Deals in Benidorm | Dealeo",
    description:
      "Find the best happy hours, 2-for-1 drinks and live flash deals in Benidorm. Levante Strip, Old Town, Rincon de Loix and more.",
    url: "https://www.dealeo.es/benidorm",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dealeo.es/benidorm",
  },
};

const AREAS = [
  { name: "Levante Strip", desc: "The heart of Benidorm nightlife — pubs, clubs and non-stop happy hours." },
  { name: "Old Town", desc: "Traditional Spanish bars and tapas with great local deals in Benidorm's historic centre." },
  { name: "Rincon de Loix", desc: "Lively English-style pubs with daily drink promotions and 2-for-1 offers." },
  { name: "Poniente", desc: "Quieter beach-side bars with sunset happy hours and food deals." },
  { name: "Centro", desc: "Bars and restaurants in the Benidorm city centre with local specials." },
];

const FAQS = [
  {
    q: "What is Dealeo?",
    a: "Dealeo is a free app showing the best bar and restaurant deals in Benidorm — happy hours, 2-for-1 drinks, live flash deals and more, all updated in real time.",
  },
  {
    q: "Which areas of Benidorm does Dealeo cover?",
    a: "Dealeo covers venues across Benidorm including the Levante Strip, Old Town, Rincon de Loix, Poniente and Centro. New venues are added regularly.",
  },
  {
    q: "How do I find the cheapest drinks in Benidorm?",
    a: "Open Dealeo and filter by city: Benidorm. You'll see all current happy hours, 2-for-1 deals and live flash deals from nearby bars — completely free.",
  },
  {
    q: "Is Dealeo free to use?",
    a: "Yes — completely free. No subscription, no vouchers to print. Just find a deal and show the QR code to staff at the venue.",
  },
  {
    q: "Can I get notified when a flash deal goes live in Benidorm?",
    a: "Yes — tap the bell icon in the app and enable notifications. You'll get an alert the moment a bar near you activates a live deal.",
  },
];

export default function BenidormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Happy Hour & Drinks Deals in Benidorm — Dealeo",
            "description": "Find the best happy hours, 2-for-1 drinks and live flash deals in Benidorm.",
            "url": "https://www.dealeo.es/benidorm",
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
      <div className="bg-gradient-to-br from-teal-600 to-teal-500 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-teal-100 text-sm font-semibold uppercase tracking-widest mb-3">Benidorm</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            The Best Drinks &amp; Bar Deals in Benidorm
          </h1>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">
            Happy hours, 2-for-1 drinks, live flash deals — all on one free app. Updated in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/deals"
              className="bg-white text-teal-600 font-black px-8 py-4 rounded-2xl text-lg hover:bg-teal-50 transition-colors shadow-lg"
            >
              Browse Deals →
            </Link>
            <Link
              href="/live"
              className="bg-teal-700 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-teal-800 transition-colors border border-teal-400"
            >
              🔴 Live Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* What is Dealeo */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Deals in Benidorm, in real time</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Benidorm has hundreds of bars and pubs — but knowing who has the best deal on right now is impossible without Dealeo. Venues post their happy hours, 2-for-1 offers and live flash deals directly to the app, so you always know what&apos;s on before you leave your hotel.
          </p>
          <p className="text-gray-600 leading-relaxed">
            No vouchers, no sign-up required. Just open the app, pick a deal, and show the QR code to staff.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">How it works</h2>
          <div className="grid gap-4">
            {[
              { step: "1", title: "Browse deals near you", desc: "See happy hours, 2-for-1s and flash deals at bars in Benidorm — updated in real time." },
              { step: "2", title: "Pick your offer", desc: "Tap any deal to see the full details, venue address and current hours." },
              { step: "3", title: "Redeem with a QR code", desc: "Show the QR code to staff. They scan it, you get the discount. Done." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 bg-teal-600 text-white font-black rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                  {step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Areas */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Deals across Benidorm</h2>
          <div className="grid gap-3">
            {AREAS.map(({ name, desc }) => (
              <Link
                key={name}
                href="/deals"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-teal-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl flex-shrink-0">📍</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
                <span className="text-gray-300 flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Deal types */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">What you&apos;ll find on Dealeo</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🍺", label: "Happy Hours", href: "/deals?cat=happyHour" },
              { emoji: "2️⃣", label: "2-for-1 Drinks", href: "/deals?cat=twoForOne" },
              { emoji: "🍔", label: "Food Deals", href: "/deals?cat=food" },
              { emoji: "🔴", label: "Live Flash Deals", href: "/live" },
              { emoji: "🎉", label: "Experiences", href: "/deals?cat=experiences" },
              { emoji: "🥂", label: "Drink Specials", href: "/deals?cat=drinks" },
            ].map(({ emoji, label, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-teal-300 hover:shadow-md transition-all"
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

        {/* CTA for venues */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">Own a bar or pub in Benidorm?</h2>
          <p className="text-orange-100 mb-6 leading-relaxed">
            List your venue on Dealeo for free. Reach hundreds of tourists and locals looking for deals right now.
          </p>
          <Link
            href="/business"
            className="inline-block bg-white text-orange-500 font-black px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Join free →
          </Link>
        </section>

        <div className="text-center">
          <Link href="/" className="text-teal-600 font-semibold hover:text-teal-700">
            ← Back to Dealeo
          </Link>
        </div>
      </div>
    </div>
  );
}
