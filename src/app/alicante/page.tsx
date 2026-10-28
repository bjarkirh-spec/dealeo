import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Happy Hour & Food Deals in Alicante — Dealeo",
  description:
    "Discover the best happy hours, 2-for-1 drinks and restaurant deals in Alicante. Real-time live flash deals, free to use. Altozano, El Puerto, Centro and more.",
  keywords: [
    "happy hour alicante", "deals alicante", "ofertas alicante",
    "2 for 1 drinks alicante", "descuentos restaurantes alicante",
    "bares alicante ofertas", "food deals alicante", "alicante nightlife deals",
    "happy hour alicante centro", "happy hour puerto alicante",
  ],
  openGraph: {
    title: "Happy Hour & Food Deals in Alicante | Dealeo",
    description:
      "Find the best happy hours, 2-for-1 drinks and restaurant deals in Alicante. Live flash deals updated in real time.",
    url: "https://www.dealeo.es/alicante",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dealeo.es/alicante",
  },
};

const AREAS = [
  { name: "Centro", desc: "Bars and restaurants in the heart of Alicante city centre." },
  { name: "El Puerto", desc: "Seafront venues with happy hours and fresh food deals." },
  { name: "Ensanche", desc: "Trendy bars and cafés with daily drink specials." },
  { name: "Altozano", desc: "Neighbourhood spots popular with locals for tapas and drinks." },
  { name: "Casco Antiguo", desc: "Historic old town bars with live music and great deals." },
];

const FAQS = [
  {
    q: "What is Dealeo?",
    a: "Dealeo is a free app that shows you the best food and drink deals at bars and restaurants in Alicante — including live flash deals, happy hours, 2-for-1 offers and more.",
  },
  {
    q: "How does happy hour work on Dealeo?",
    a: "Venues list their happy hour times on Dealeo. You can browse deals, save your favourites, and get notified the moment a flash deal goes live nearby.",
  },
  {
    q: "Is Dealeo free to use?",
    a: "Yes — completely free for customers. No subscription, no hidden fees. Just find a deal and show the QR code to the staff.",
  },
  {
    q: "Which areas of Alicante does Dealeo cover?",
    a: "Dealeo covers bars and restaurants across Alicante including Centro, El Puerto, Ensanche, Altozano, Casco Antiguo and more neighbourhoods being added regularly.",
  },
  {
    q: "¿Hay ofertas en español?",
    a: "Sí — Dealeo está disponible en español e inglés. Puedes cambiar el idioma en cualquier momento desde la app.",
  },
];

export default function AlicanteePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Happy Hour & Food Deals in Alicante — Dealeo",
            "description": "Discover the best happy hours, 2-for-1 drinks and restaurant deals in Alicante.",
            "url": "https://www.dealeo.es/alicante",
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
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Alicante</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            The Best Food &amp; Drink Deals in Alicante
          </h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">
            Happy hours, 2-for-1 drinks, live flash deals and restaurant discounts — all in one free app.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/deals"
              className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              Browse Deals →
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
        {/* What is Dealeo */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">What is Dealeo?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo is Alicante&apos;s free guide to the best bar and restaurant deals. Whether you&apos;re looking for a happy hour after work, a 2-for-1 cocktail on the weekend, or a live flash deal from a venue nearby — Dealeo has you covered.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Venues post their deals in real time. You get a notification the moment something goes live. Show the QR code to the staff and enjoy the discount. No printing, no vouchers, no fuss.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">How it works</h2>
          <div className="grid gap-4">
            {[
              { step: "1", title: "Browse deals", desc: "See happy hours, 2-for-1s and flash deals near you — updated in real time." },
              { step: "2", title: "Pick your offer", desc: "Tap any deal to see the full details, venue location and hours." },
              { step: "3", title: "Redeem with a QR code", desc: "Show the QR code to staff at the venue. They scan it, you get the deal." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white font-black rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
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
          <h2 className="text-2xl font-black text-gray-900 mb-6">Deals across Alicante</h2>
          <div className="grid gap-3">
            {AREAS.map(({ name, desc }) => (
              <Link
                key={name}
                href={`/deals`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-orange-300 hover:shadow-md transition-all"
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
          <h2 className="text-2xl font-black text-gray-900 mb-6">Types of deals on Dealeo</h2>
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

        {/* CTA for venues */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">Own a bar or restaurant in Alicante?</h2>
          <p className="text-teal-100 mb-6 leading-relaxed">
            List your venue on Dealeo for free. Reach hundreds of customers looking for deals right now.
          </p>
          <Link
            href="/business"
            className="inline-block bg-white text-teal-600 font-black px-8 py-3 rounded-xl hover:bg-teal-50 transition-colors"
          >
            Join free →
          </Link>
        </section>

        {/* Back to app */}
        <div className="text-center">
          <Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">
            ← Back to Dealeo
          </Link>
        </div>
      </div>
    </div>
  );
}
