import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy Hour & Drink Deals in Alicante & Benidorm — Dealeo",
  description: "Browse happy hours, 2-for-1 cocktails, food deals and live flash offers from bars in Alicante and Benidorm. Free, updated in real time.",
  keywords: [
    "happy hour alicante", "happy hour benidorm", "2 for 1 drinks alicante",
    "drink deals alicante", "bar deals benidorm", "cheap drinks near me",
    "happy hour deals near me", "bar offers tonight", "2 for 1 cocktails near me",
  ],
  openGraph: {
    title: "Happy Hour & Drink Deals — Dealeo",
    description: "Happy hours, 2-for-1 cocktails and live flash deals from bars in Alicante and Benidorm. Free to use.",
    url: "https://www.dealeo.es/deals",
    siteName: "Dealeo",
    type: "website",
  },
  alternates: { canonical: "https://www.dealeo.es/deals" },
};

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
