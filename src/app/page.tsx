import type { Metadata } from "next";
import LandingPageClient from "@/components/LandingPageClient";

export const metadata: Metadata = {
  title: "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm",
  description: "Find the best happy hours, 2-for-1 drinks and live flash deals at bars in Alicante and Benidorm. Free to use, updated in real time.",
  keywords: "happy hour alicante, deals benidorm, 2 for 1 drinks alicante, ofertas bares alicante, benidorm bar deals, happy hour benidorm",
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