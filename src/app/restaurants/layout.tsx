import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bars & Restaurants with Deals in Alicante",
  description:
    "Discover bars and restaurants offering exclusive deals in Alicante. Happy hours, food discounts and live flash offers — all in one place.",
  openGraph: {
    title: "Bars & Restaurants with Deals in Alicante | Dealeo",
    description: "Find venues running happy hours and deals across Alicante's best neighbourhoods.",
  },
  alternates: {
    canonical: "https://www.dealeo.es/restaurants",
  },
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
