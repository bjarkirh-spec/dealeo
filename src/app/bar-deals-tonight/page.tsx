import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bar Deals Tonight — Live Drink Offers in Alicante & Benidorm | Dealeo",
  description: "Find bar deals happening tonight in Alicante and Benidorm. Live happy hours, 2-for-1 cocktails and flash deals updated in real time. Free, no sign-up.",
  keywords: [
    "bar deals tonight", "drink deals tonight", "happy hour tonight alicante",
    "happy hour tonight benidorm", "bars open tonight deals", "drink offers tonight",
    "live bar deals", "flash deals bars tonight", "what bars have deals tonight",
    "happy hours tonight near me",
  ],
  openGraph: {
    title: "Bar Deals Tonight — Live Offers in Alicante & Benidorm | Dealeo",
    description: "Live bar deals happening tonight. Happy hours, 2-for-1 cocktails and flash offers in Alicante and Benidorm.",
    url: "https://www.dealeo.es/bar-deals-tonight",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/bar-deals-tonight" },
};

export default function BarDealsTonightPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Bar Deals Tonight — Alicante & Benidorm",
            "url": "https://www.dealeo.es/bar-deals-tonight",
            "description": "Find live bar deals tonight in Alicante and Benidorm. Happy hours, 2-for-1 cocktails and flash deals updated in real time.",
          }),
        }}
      />

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest">Live Tonight</p>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">
            Bar Deals Tonight
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            See which bars in Alicante and Benidorm have deals running right now — happy hours, 2-for-1s and live flash offers, updated in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/live" className="bg-red-500 text-white font-black px-8 py-4 rounded-2xl text-lg hover:bg-red-600 transition-colors shadow-lg">
              🔴 See Live Deals Now
            </Link>
            <Link href="/deals" className="bg-gray-700 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-gray-600 transition-colors border border-gray-600">
              All Deals Tonight
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">What bar deals are on tonight?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Dealeo shows you live bar deals in Alicante and Benidorm as they happen. Venues activate deals in real time — when a bar starts happy hour or launches a flash offer, you see it instantly with a countdown timer.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Tonight you might find 2-for-1 cocktails on Levante Beach, a happy hour flash deal in Alicante Centro, or a last-minute beer offer from a bar around the corner. The only way to know for sure is to open the app.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Free to use. No sign-up. Show the QR code at the bar and enjoy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Types of bar deals on Dealeo tonight</h2>
          <div className="grid gap-4">
            {[
              {
                title: "🔴 Live Flash Deals",
                desc: "A bar activates a deal right now — 30 minutes, an hour, until midnight. You get a notification the second it goes live. The best value deals happen in real time.",
                href: "/live",
              },
              {
                title: "🍹 Happy Hours",
                desc: "Scheduled happy hour deals posted in advance. Browse tonight's happy hours by venue and filter by city or deal type.",
                href: "/deals?category=happyHour",
              },
              {
                title: "2️⃣ 2-for-1 Deals",
                desc: "Two drinks for the price of one. Cocktails, beer, wine — filter by 2-for-1 to see every buy-one-get-one offer active tonight.",
                href: "/deals?category=twoForOne",
              },
              {
                title: "🍽️ Food Deals Tonight",
                desc: "Not just drinks — food deals, early bird menus and discounted dinners from restaurants with active offers.",
                href: "/deals?category=food",
              },
            ].map(({ title, desc, href }) => (
              <Link key={title} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Deals by city tonight</h2>
          <div className="grid gap-3">
            {[
              { city: "Alicante", desc: "Happy hours, 2-for-1 cocktails and flash deals from bars across Alicante tonight.", href: "/alicante" },
              { city: "Benidorm", desc: "Levante Beach, Old Town and Rincon de Loix — live bar deals in Benidorm tonight.", href: "/benidorm" },
            ].map(({ city, desc, href }) => (
              <Link key={city} href={href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:border-orange-300 hover:shadow-md transition-all">
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

        <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 text-center text-white mb-12">
          <h2 className="font-black text-2xl mb-2">Enable notifications</h2>
          <p className="text-orange-100 mb-6 leading-relaxed">
            Get alerted the moment a bar near you launches a flash deal tonight. Turn on Dealeo notifications and never miss a deal.
          </p>
          <Link href="/deals" className="inline-block bg-white text-orange-500 font-black px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">
            Open Dealeo →
          </Link>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link href="/happy-hour-alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Happy hour Alicante →</p>
          </Link>
          <Link href="/happy-hour-benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all">
            <p className="font-semibold text-gray-900 text-sm">Happy hour Benidorm →</p>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Back to Dealeo</Link>
        </div>
      </div>
    </div>
  );
}
