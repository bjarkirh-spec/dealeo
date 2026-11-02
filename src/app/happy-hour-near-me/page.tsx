import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Happy Hour Near Me — Live Deals in Alicante & Benidorm | Dealeo",
  description: "Find happy hour near you right now. Live drink deals, 2-for-1 cocktails and flash offers from bars in Alicante and Benidorm. Free, no sign-up.",
  keywords: [
    "happy hour near me", "happy hour near me now", "happy hours near me today",
    "happy hour close to me", "where is happy hour near me", "happy hour bars near me",
    "happy hour drinks near me", "near me happy hour", "happy hour open now near me",
    "happy hours tonight near me",
  ],
  openGraph: {
    title: "Happy Hour Near Me — Live Deals | Dealeo",
    description: "Find happy hour near you right now. Live drink deals and 2-for-1 cocktails in Alicante and Benidorm.",
    url: "https://www.dealeo.es/happy-hour-near-me",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/happy-hour-near-me" },
};

const FAQS = [
  {
    q: "How do I find happy hour near me?",
    a: "Open the Dealeo app and it shows all active happy hours near your location right now — updated in real time. Tap any deal, show the QR code to the bartender, and enjoy the discount.",
  },
  {
    q: "What time is happy hour near me?",
    a: "In Alicante and Benidorm, most bars run happy hour between 4pm and 9pm. Some run them earlier, some later, and live flash deals can appear any time. Dealeo shows exact times and live countdowns for every deal.",
  },
  {
    q: "Which bars near me have happy hour today?",
    a: "Dealeo shows every bar with an active happy hour deal near you, updated live. Open the app, allow location access, and you'll see deals sorted by distance from where you are right now.",
  },
  {
    q: "Is there happy hour near me right now?",
    a: "Open the Dealeo app to check. The Live tab shows deals activated in real time — if a bar near you has a flash deal or live happy hour active, you'll see it immediately.",
  },
  {
    q: "Does Dealeo work near me in Alicante and Benidorm?",
    a: "Yes — Dealeo covers bars and restaurants across Alicante city, Benidorm (Levante Beach, Old Town, Rincon de Loix) and surrounding areas. New venues are added regularly.",
  },
];

export default function HappyHourNearMePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Happy Hour Near Me — Alicante & Benidorm",
            "url": "https://www.dealeo.es/happy-hour-near-me",
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
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest">Live Now</p>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            Happy Hour Near Me
          </h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">
            See which bars near you have happy hour deals right now — 2-for-1 cocktails, cheap drinks and live flash offers in Alicante and Benidorm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals?category=happyHour" className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg">
              Find Happy Hour →
            </Link>
            <Link href="/live" className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-700 transition-colors border border-orange-300">
              🔴 Live Deals Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Find happy hour near you in seconds</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo is the fastest way to find happy hour near you. Open the app, allow location access, and you instantly see every bar near you with an active happy hour deal — sorted by distance, with countdowns showing how long each deal lasts.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            No more Googling "happy hour near me" and getting outdated results. Dealeo connects directly to venues — when a bar activates a deal, you see it live. When it ends, it disappears. Always current, always accurate.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Currently covering bars and restaurants across <strong>Alicante</strong> and <strong>Benidorm</strong>, with more cities coming soon.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">How it works</h2>
          <div className="grid gap-4">
            {[
              { step: "1", title: "Open Dealeo near you", desc: "Allow location access and Dealeo immediately shows every bar near you with a happy hour deal active right now." },
              { step: "2", title: "Pick your deal", desc: "Filter by happy hour, 2-for-1, food deals or live flash offers. Tap any deal to see the full details and venue location." },
              { step: "3", title: "Show the QR code", desc: "Show the QR code on your phone to the bartender. They scan it, you get the discount. No vouchers, no printing." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className="w-10 h-10 bg-orange-500 text-white font-black rounded-xl flex items-center justify-center flex-shrink-0 text-lg">{step}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Happy hour near me — by city</h2>
          <div className="grid gap-3">
            {[
              { city: "Happy hour in Alicante", desc: "Centro, El Puerto, Casco Antiguo — happy hours updated live across all of Alicante.", href: "/happy-hour-alicante" },
              { city: "Happy hour in Benidorm", desc: "Levante Beach, Old Town, Rincon de Loix — every happy hour in Benidorm right now.", href: "/happy-hour-benidorm" },
              { city: "Cheap drinks near me", desc: "The cheapest drinks deals near you — filtered by location, updated in real time.", href: "/cheap-drinks-alicante" },
              { city: "2-for-1 drinks near me", desc: "Buy one get one free drinks, sorted by distance from your location.", href: "/2-for-1-alicante" },
            ].map(({ city, desc, href }) => (
              <Link key={city} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-orange-300 hover:shadow-md transition-all">
                <span className="text-2xl flex-shrink-0">📍</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{city}</p>
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

        <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">Never miss a deal near you</h2>
          <p className="text-orange-100 mb-6 leading-relaxed">
            Enable notifications and get an instant alert when a bar near you activates a happy hour or live flash deal.
          </p>
          <Link href="/deals" className="inline-block bg-white text-orange-500 font-black px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">
            Open Dealeo →
          </Link>
        </section>

        <div className="text-center">
          <Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
