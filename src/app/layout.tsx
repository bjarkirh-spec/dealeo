import type { Metadata } from "next";
import { Geist, Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import NotificationSetup from "@/components/NotificationSetup";
import OfflineBanner from "@/components/OfflineBanner";
import LangSync from "@/components/LangSync";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: "900",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Set NEXT_PUBLIC_APP_URL in your environment (e.g. https://dealeo-rho.vercel.app) for correct OG tags
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.dealeo.es";

export const metadata: Metadata = {
  title: {
    default: "Dealeo — Happy Hour & Food Deals in Alicante",
    template: "%s | Dealeo Alicante",
  },
  description:
    "Find the best happy hour deals, 2-for-1 drinks, and restaurant offers in Alicante. Live flash deals updated in real time. Free to use.",
  keywords: [
    "happy hour alicante", "deals alicante", "ofertas restaurantes alicante",
    "food deals alicante", "bar deals alicante", "2 for 1 drinks alicante",
    "descuentos bares alicante", "ofertas comida alicante", "dealeo",
  ],
  openGraph: {
    title: "Dealeo — Happy Hour & Food Deals in Alicante",
    description: "Find happy hours, 2-for-1s and live flash deals at bars and restaurants across Alicante. Free to use.",
    url: APP_URL,
    siteName: "Dealeo",
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630 }],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Dealeo — Happy Hour & Food Deals in Alicante",
    description: "Happy hours, 2-for-1s and live flash deals in Alicante. Free.",
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f1117" />
        <meta name="color-scheme" content="dark" />
        <meta name="google-site-verification" content="dINhmDZQaN_9eOfNB8lSu2z7JSChUy0qpzDdWmz8tIM" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "MobileApplication",
                "name": "Dealeo",
                "description": "Find the best happy hour deals, 2-for-1 drinks and live flash offers at bars and restaurants in Alicante and Benidorm. Free to use.",
                "url": "https://www.dealeo.es",
                "applicationCategory": "FoodApplication",
                "operatingSystem": "Android, iOS",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                "installUrl": "https://play.google.com/store/apps/details?id=es.dealeo.app",
                "screenshot": "https://www.dealeo.es/icon-512.png",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "ratingCount": "1" }
              },
              {
                "@type": "LocalBusiness",
                "name": "Dealeo",
                "description": "App for finding happy hour deals, 2-for-1 drinks and live flash offers at bars and restaurants in Alicante and Benidorm.",
                "url": "https://www.dealeo.es",
                "logo": "https://www.dealeo.es/icon-512.png",
                "image": "https://www.dealeo.es/icon-512.png",
                "telephone": null,
                "email": "hello@dealeo.es",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Alicante",
                  "addressRegion": "Valencia",
                  "addressCountry": "ES"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 38.3452,
                  "longitude": -0.4810
                },
                "areaServed": [
                  { "@type": "City", "name": "Alicante" },
                  { "@type": "City", "name": "Benidorm" }
                ],
                "sameAs": [
                  "https://play.google.com/store/apps/details?id=es.dealeo.app"
                ]
              },
              {
                "@type": "WebSite",
                "name": "Dealeo",
                "url": "https://www.dealeo.es",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": { "@type": "EntryPoint", "urlTemplate": "https://www.dealeo.es/deals?q={search_term_string}" },
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          })}}
        />
      </head>
      <body className={`${geist.variable} ${barlowCondensed.variable} ${dmSans.variable} antialiased`}>
        <LanguageProvider>
          <LangSync />
          <NotificationSetup />
          <OfflineBanner />
          <CookieBanner />
          {children}
          <Analytics />
          <footer className="sr-only" aria-hidden="true">
            <nav>
              <a href="/alicante">Happy Hour Alicante</a>
              <a href="/benidorm">Happy Hour Benidorm</a>
              <a href="/happy-hour-alicante">Happy Hour Alicante Guide</a>
              <a href="/happy-hour-benidorm">Happy Hour Benidorm Guide</a>
              <a href="/ofertas-alicante">Ofertas Bares Alicante</a>
              <a href="/ofertas-benidorm">Ofertas Bares Benidorm</a>
              <a href="/sobre-dealeo">Sobre Dealeo</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms &amp; Conditions</a>
            </nav>
          </footer>
          <div className="flex justify-center gap-6 py-4 text-xs text-gray-700">
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms &amp; Conditions</a>
            <a href="mailto:hello@dealeo.es" className="hover:text-gray-400 transition-colors">Contact</a>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
