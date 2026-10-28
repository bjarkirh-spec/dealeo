import { supabase } from "./supabase";
import type { DbDeal } from "./types";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getRestaurantByUser(userId: string) {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", userId)
    .single();
  return { data, error };
}

export async function getDealsByRestaurant(restaurantId: string) {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function createDeal(deal: {
  restaurant_id: string;
  title: string;
  title_es: string;
  category: string;
  discount_label: string;
  valid_until: string;
  is_live: boolean;
  max_redemptions: number | null;
  deal_type: string;
  valid_days: string[];
  valid_from?: string | null;
  went_live_at?: string | null;
  live_duration_minutes?: number | null;
  image_url?: string | null;
}) {
  const { data, error } = await supabase
    .from("deals")
    .insert({ ...deal, is_active: true, redemptions_count: 0, source: "venue" })
    .select()
    .single();
  return { data, error };
}

export async function toggleFavorite(userId: string, dealId: string) {
  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("deal_id", dealId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("deal_id", dealId);
    return { favorited: false, error };
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: userId, deal_id: dealId });
    return { favorited: true, error };
  }
}

export async function getFavoritesByUser(userId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select("deal_id, deals(*, restaurants(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function checkFavorite(userId: string, dealId: string) {
  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("deal_id", dealId)
    .single();
  return !!data;
}

export async function deleteDeal(dealId: string) {
  const { error } = await supabase.from("deals").delete().eq("id", dealId);
  return { error };
}

export async function toggleDeal(dealId: string, isActive: boolean) {
  const { error } = await supabase
    .from("deals")
    .update({ is_active: isActive })
    .eq("id", dealId);
  return { error };
}

export async function toggleLive(dealId: string, isLive: boolean, durationMinutes?: number | null) {
  const updates: Partial<DbDeal> & { went_live_at: string | null; live_duration_minutes: number | null } = { is_live: isLive, went_live_at: null, live_duration_minutes: null };
  if (isLive) {
    updates.went_live_at = new Date().toISOString();
    updates.live_duration_minutes = durationMinutes ?? null;
  } else {
    updates.went_live_at = null;
    updates.live_duration_minutes = null;
  }
  const { error } = await supabase.from("deals").update(updates).eq("id", dealId);
  return { error };
}

export async function updateDeal(dealId: string, updates: {
  title?: string;
  title_es?: string;
  category?: string;
  discount_label?: string;
  valid_until?: string;
  valid_from?: string | null;
  max_redemptions?: number | null;
  deal_type?: string;
  valid_days?: string[];
  image_url?: string | null;
}) {
  const { error } = await supabase
    .from("deals")
    .update(updates)
    .eq("id", dealId);
  return { error };
}

export async function updateRestaurant(restaurantId: string, updates: {
  name?: string;
  address?: string;
  neighborhood?: string;
  phone?: string;
  website?: string;
  image_emoji?: string;
  image_url?: string | null;
  description?: string;
  description_es?: string;
  latitude?: number | null;
  longitude?: number | null;
  sun_tags?: string[];
  sun_note?: string | null;
  amenities?: string[] | null;
}) {
  const { error } = await supabase
    .from("restaurants")
    .update(updates)
    .eq("id", restaurantId);
  return { error };
}

export async function submitReview(review: {
  user_id: string;
  restaurant_id: string;
  deal_id?: string | null;
  rating: number;
  comment?: string;
}) {
  const { error } = await supabase
    .from("reviews")
    .upsert(review, { onConflict: "user_id,restaurant_id" });

  if (!error) {
    // Recalculate restaurant aggregate rating
    const { data: allReviews } = await supabase
      .from("reviews")
      .select("rating")
      .eq("restaurant_id", review.restaurant_id);

    if (allReviews && allReviews.length > 0) {
      const avg = allReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / allReviews.length;
      await supabase
        .from("restaurants")
        .update({ rating: Math.round(avg * 10) / 10, review_count: allReviews.length })
        .eq("id", review.restaurant_id);
    }
  }

  return { error };
}

export async function getReviewsByRestaurant(restaurantId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating, comment, created_at, user_id")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: false })
    .limit(20);
  return { data, error };
}

export async function createRestaurant(restaurant: {
  user_id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  email: string;
  image_emoji: string;
  description: string;
  latitude?: number | null;
  longitude?: number | null;
}) {
  const { data, error } = await supabase
    .from("restaurants")
    .insert({ ...restaurant, is_active: true, rating: 0, review_count: 0 })
    .select()
    .single();
  return { data, error };
}
