import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.dealeo.es";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: deal } = await supabase
    .from("deals")
    .select("title, discount_label, restaurants(name, neighborhood, image_url)")
    .eq("id", id)
    .single();

  if (!deal) {
    return { title: "Deal — Dealeo" };
  }

  const r = deal.restaurants;
  const restaurant = (Array.isArray(r) ? r[0] : r) as { name: string; neighborhood: string; image_url?: string | null } | null;
  const title = `${deal.discount_label} — ${deal.title} at ${restaurant?.name}`;
  const description = `Get ${deal.discount_label} at ${restaurant?.name} in ${restaurant?.neighborhood ?? "Alicante"}. Limited time offer on Dealeo.`;
  const url = `${APP_URL}/deals/${id}`;
  const ogImage = restaurant?.image_url ?? `${APP_URL}/icon-512.png`;

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
      card: restaurant?.image_url ? "summary_large_image" : "summary",
      title,
      description,
      images: restaurant?.image_url ? [restaurant.image_url] : undefined,
    },
  };
}

export default function DealLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
