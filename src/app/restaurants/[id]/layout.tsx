import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.dealeo.es";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("name, neighborhood, description, rating, review_count, image_url")
    .eq("id", id)
    .single();

  if (!restaurant) {
    return { title: "Restaurant — Dealeo" };
  }

  const title = `${restaurant.name} — Deals on Dealeo`;
  const description = restaurant.description
    ? `${restaurant.description} · ★${restaurant.rating} (${restaurant.review_count} reviews) in ${restaurant.neighborhood}, Alicante.`
    : `See exclusive deals at ${restaurant.name} in ${restaurant.neighborhood ?? "Alicante"} on Dealeo.`;
  const url = `${APP_URL}/restaurants/${id}`;
  const ogImage = restaurant.image_url ?? `${APP_URL}/icon-512.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Dealeo",
      images: [{ url: ogImage, width: 800, height: 600 }],
      type: "website",
    },
    twitter: {
      card: restaurant.image_url ? "summary_large_image" : "summary",
      title,
      description,
      images: restaurant.image_url ? [restaurant.image_url] : undefined,
    },
  };
}

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
