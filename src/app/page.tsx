import type { Metadata } from "next";
import LandingPageClient from "@/components/LandingPageClient";

export const metadata: Metadata = {
  title: "Dealeo — Happy Hour & Drink Deals Near You in Alicante & Benidorm",
  description: "Find happy hour deals near you right now — 2-for-1 cocktails, cheap drinks and live flash deals at bars in Alicante and Benidorm. Free, no sign-up.",
  keywords: "happy hour near me, happy hour alicante, happy hour benidorm, 2 for 1 drinks near me, cheap drinks near me, deals benidorm, 2 for 1 drinks alicante, ofertas bares alicante, benidorm bar deals",
  openGraph: {
    type: "website",
    url: "https://www.dealeo.es",
    title: "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm",
    description: "Find the best happy hours, 2-for-1 drinks and live flash deals at bars in Alicante and Benidorm. Free, real-time, no sign-up.",
    images: [{ url: "https://www.dealeo.es/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm",
    description: "Find the best happy hours, 2-for-1 drinks and live flash deals at bars in Alicante and Benidorm.",
    images: ["https://www.dealeo.es/og-image.png"],
  },
  alternates: { canonical: "https://www.dealeo.es" },
};

export default function LandingPage() {
  return <LandingPageClient />;
}