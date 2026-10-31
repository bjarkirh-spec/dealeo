export type Language = "en" | "es" | "it";

// ─── Database row types (snake_case, mirrors Supabase schema) ───────────────

export interface DbRestaurant {
  id: string;
  user_id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string | null;
  website: string | null;
  email: string;
  image_emoji: string;
  image_url: string | null;
  description: string | null;
  description_es: string | null;
  rating: number;
  review_count: number;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  is_demo: boolean;
  is_approved: boolean;
  created_at: string;
  sun_tags: string[] | null;
  sun_note: string | null;
  amenities: string[] | null;
}

export interface DbDeal {
  id: string;
  restaurant_id: string;
  title: string;
  title_es: string | null;
  category: string;
  discount_label: string;
  valid_until: string | null;
  valid_days: string[] | null;
  is_active: boolean;
  is_live: boolean;
  went_live_at: string | null;
  live_duration_minutes: number | null;
  max_redemptions: number | null;
  redemptions_count: number;
  deal_type: string;
  valid_from: string | null;
  valid_to: string | null;
  image_url: string | null;
  source: "venue" | "community" | "verified" | "admin" | null;
  created_at: string;
  // joined fields
  restaurants?: DbRestaurant;
  // client-side computed
  _distanceKm?: number | null;
}

export interface DbDealTip {
  id: string;
  user_id: string;
  venue_name: string;
  venue_city: string;
  deal_description: string;
  deal_days: string | null;
  deal_time: string | null;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface DbReview {
  id?: string;
  user_id: string;
  restaurant_id?: string;
  deal_id?: string | null;
  rating: number;
  comment?: string | null;
  created_at: string;
}

export interface DbRedemption {
  id: string;
  user_id: string;
  deal_id: string;
  deal_title: string;
  discount_label: string;
  restaurant_name: string;
  redeemed_at: string;
  deals?: DbDeal & { restaurants?: DbRestaurant };
}

/** Restaurant row with its deals array — used by the map page */
export type DbRestaurantWithDeals = DbRestaurant & { deals: DbDeal[] };

export type DealCategory =
  | "all"
  | "twoForOne"
  | "happyHour"
  | "drinks"
  | "food"
  | "experiences"
  | "nightlife"
  | "live";

export interface Deal {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  dealTitle: string;
  dealTitleEs: string;
  description: string;
  descriptionEs: string;
  category: DealCategory;
  discountLabel: string;
  distance: string;
  rating: number;
  reviews: number;
  validUntil: string;
  isLive: boolean;
  minutesLeft?: number;
  redemptionsLeft?: number;
  maxRedemptions?: number;
  address: string;
  neighborhood: string;
}
