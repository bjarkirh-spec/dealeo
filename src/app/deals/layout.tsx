import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Restaurant & Bar Deals in Alicante",
  description:
    "Browse happy hours, 2-for-1 drinks, food discounts and live flash deals at bars and restaurants in Alicante. New deals added daily.",
  openGraph: {
    title: "Best Restaurant & Bar Deals in Alicante | Dealeo",
    description: "Happy hours, 2-for-1s and flash deals across Alicante. Updated in real time.",
  },
  alternates: {
    canonical: "https://www.dealeo.es/deals",
  },
};

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
