import { supabase } from "./supabase";
import type { DbDeal, DbRestaurant } from "./types";

export function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function getDealById(id: string) {
  const { data, error } = await supabase
    .from("deals")
    .select(`
      *,
      restaurants (
        id,
        name,
        address,
        neighborhood,
        image_emoji,
        image_url,
        rating,
        review_count,
        latitude,
        longitude,
        sun_tags,
        sun_note
      )
    `)
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

async function getRealRestaurantCount(): Promise<number> {
  const { count } = await supabase
    .from("restaurants")
    .select("id", { count: "exact", head: true })
    .eq("is_demo", false)
    .eq("is_active", true)
    .eq("is_approved", true);
  return count ?? 0;
}

let dealsCache: { data: DbDeal[]; at: number } | null = null;
const DEALS_CACHE_TTL = 60_000;

export function invalidateDealsCache() {
  dealsCache = null;
}

export async function getDealsWithRestaurants() {
  if (dealsCache && Date.now() - dealsCache.at < DEALS_CACHE_TTL) {
    return dealsCache.data;
  }

  const [realCount, { data, error }] = await Promise.all([
    getRealRestaurantCount(),
    supabase
      .from("deals")
      .select(`
        *,
        restaurants (
          id,
          name,
          address,
          neighborhood,
          image_emoji,
          image_url,
          rating,
          review_count,
          latitude,
          longitude,
          city,
          is_demo,
          is_approved,
          sun_tags,
          sun_note
        )
      `)
      .eq("is_active", true)
      .order("is_live", { ascending: false }),
  ]);

  if (error) {
    console.error("Error fetching deals:", error);
    return [];
  }

  // Filter out expired live deals (duration elapsed) — cron handles DB cleanup every 5 min
  const now = Date.now();
  const processed = data.map((deal: DbDeal) => {
    if (
      deal.is_live &&
      deal.went_live_at &&
      deal.live_duration_minutes &&
      new Date(deal.went_live_at).getTime() + deal.live_duration_minutes * 60000 <= now
    ) {
      return { ...deal, is_live: false };
    }
    return deal;
  });

  // Progressive demo hiding: 1 fake restaurant disappears per real restaurant that joins
  const realDeals = processed.filter((d: DbDeal) => !d.restaurants?.is_demo && d.restaurants?.is_approved !== false);
  const demoDeals = processed.filter((d: DbDeal) => d.restaurants?.is_demo);

  // Get unique demo restaurant IDs in the order they appear
  const demoRestaurantIds = [
    ...new Set(demoDeals.map((d: DbDeal) => d.restaurants?.id).filter((id): id is string => !!id)),
  ];

  // Hide the first N demo restaurants (oldest ones go first)
  const hiddenIds = new Set(demoRestaurantIds.slice(0, realCount));
  const visibleDemos = demoDeals.filter((d: DbDeal) => !hiddenIds.has(d.restaurants?.id ?? ""));

  const result = [...realDeals, ...visibleDemos];
  dealsCache = { data: result, at: Date.now() };
  return result;
}

export async function getSunnyVenues(): Promise<DbRestaurant[]> {
  const { data } = await supabase
    .from("restaurants")
    .select("id, name, neighborhood, city, image_emoji, image_url, rating, sun_tags, sun_note, is_demo, is_approved, is_active")
    .eq("is_active", true)
    .eq("is_approved", true)
    .not("sun_tags", "is", null)
    .neq("sun_tags", "{}");

  if (!data) return [];
  // Same progressive demo-hiding logic: only real venues for the sunny row
  return data.filter((r) => !r.is_demo) as DbRestaurant[];
}

export async function getRestaurantsWithDeals() {
  const realCount = await getRealRestaurantCount();

  const { data } = await supabase
    .from("restaurants")
    .select("*, deals(id, title, title_es, discount_label, category, is_live, is_active)")
    .eq("is_active", true)
    .eq("is_approved", true);

  if (!data) return [];

  const realRestaurants = data.filter((r) => !r.is_demo);
  const demoRestaurants = data.filter((r) => r.is_demo);

  // Hide first N demo restaurants
  const visibleDemos = demoRestaurants.slice(realCount);

  return [...realRestaurants, ...visibleDemos];
}
