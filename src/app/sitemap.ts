import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.dealeo.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [{ data: deals }, { data: restaurants }] = await Promise.all([
    supabase.from("deals").select("id, updated_at").eq("is_active", true),
    supabase.from("restaurants").select("id, updated_at").eq("is_active", true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${BASE_URL}/deals`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/live`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${BASE_URL}/map`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/business`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/es`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/alicante`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/benidorm`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/happy-hour-alicante`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/happy-hour-benidorm`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ofertas-alicante`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/ofertas-benidorm`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sobre-dealeo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/restaurants`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  const dealRoutes: MetadataRoute.Sitemap = (deals ?? []).map((d) => ({
    url: `${BASE_URL}/deals/${d.id}`,
    lastModified: d.updated_at ? new Date(d.updated_at) : new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const restaurantRoutes: MetadataRoute.Sitemap = (restaurants ?? []).map((r) => ({
    url: `${BASE_URL}/restaurants/${r.id}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dealRoutes, ...restaurantRoutes];
}
