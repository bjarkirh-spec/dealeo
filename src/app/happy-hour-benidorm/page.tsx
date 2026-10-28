import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Happy Hour in Benidorm 2026 — Best Bars & Drink Deals | Dealeo",
  description: "Find the best happy hour deals in Benidorm right now. 2-for-1 cocktails, cheap beer, live flash deals from bars across Benidorm Old Town, Levante and Rincon de Loix. Free app.",
  keywords: ["happy hour benidorm", "happy hour benidorm 2026", "best happy hour benidorm", "2 for 1 cocktails benidorm", "cheap drinks benidorm", "benidorm bar deals tonight", "happy hour benidorm old town", "2 for 1 benidorm", "benidorm drinks deals", "where to drink cheaply benidorm"],
  openGraph: { title: "Happy Hour in Benidorm 2026 | Dealeo", description: "Find the best happy hour deals in Benidorm. 2-for-1 cocktails, live flash deals and cheap drinks. Free to use.", url: "https://www.dealeo.es/happy-hour-benidorm", siteName: "Dealeo", type: "website" },
  alternates: { canonical: "https://www.dealeo.es/happy-hour-benidorm" },
};

const FAQS = [
  { q: "What time is happy hour in Benidorm?", a: "Most bars in Benidorm run happy hour from around 4pm to 8pm, though many extend deals later into the night especially in the Old Town. Dealeo shows live times for each venue." },
  { q: "Where is the best happy hour in Benidorm?", a: "The Old Town and Rincon de Loix (English quarter) have the most bars with happy hour deals. Levante Beach bars also offer great sunset happy hours." },
  { q: "Are there 2-for-1 drinks in Benidorm?", a: "Yes — 2-for-1 cocktails and beer deals are extremely common in Benidorm. Dealeo lists them all in one place, updated in real time." },
  { q: "Is Dealeo free to use in Benidorm?", a: "Completely free. Browse deals, save favourites, and redeem with a QR code at the venue. No subscription, no booking fee." },
  { q: "Does Dealeo cover Benidorm Old Town?", a: "Yes. The Old Town is one of the most active areas on Dealeo — many bars post daily happy hour and 2-for-1 deals there." },
];

export default function HappyHourBenidormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": "Happy Hour in Benidorm 2026", "url": "https://www.dealeo.es/happy-hour-benidorm", "mainEntity": { "@type": "FAQPage", "mainEntity": FAQS.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) } }) }} />
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Benidorm · 2026</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl leading-tight mb-4">Happy Hour in Benidorm</h1>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">The best 2-for-1 cocktails, cheap beer and live flash deals from bars across Benidorm — updated in real time, free to use.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/deals?category=happyHour" className="bg-white text-orange-500 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg">See Happy Hours →</Link>
            <Link href="/live" className="bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-700 transition-colors border border-orange-300">🔴 Live Now</Link>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Your real-time guide to happy hour in Benidorm</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Benidorm is one of Europe's most popular nightlife destinations — and that means competition between bars, which means deals for you. The trick is knowing which bars are running specials right now. Dealeo solves that. Venues post their happy hours and flash deals directly to the app, live.</p>
          <p className="text-gray-600 leading-relaxed">Whether you're on Levante Beach looking for a sunset cocktail deal, exploring the Old Town for 2-for-1 shots, or in Rincon de Loix for cheap beers — Dealeo shows what's on right now, near you.</p>
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
          <Link href="/benidorm" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all"><p className="font-semibold text-gray-900 text-sm">All Benidorm deals →</p></Link>
          <Link href="/happy-hour-alicante" className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-orange-300 transition-all"><p className="font-semibold text-gray-900 text-sm">Happy hour Alicante →</p></Link>
        </div>
        <div className="text-center"><Link href="/" className="text-orange-500 font-semibold hover:text-orange-600">← Back to Dealeo</Link></div>
      </div>
    </div>
  );
}
