import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Deals in Alicante Right Now",
  description:
    "See what's live in Alicante right now — flash happy hours, limited-time offers and drink deals happening at bars near you.",
  openGraph: {
    title: "Live Deals in Alicante Right Now | Dealeo",
    description: "Flash deals and happy hours live right now in Alicante. Updated in real time.",
  },
  alternates: {
    canonical: "https://www.dealeo.es/live",
  },
};

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
