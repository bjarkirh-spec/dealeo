import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const DAY_KEYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  webpush.setVapidDetails(
    "mailto:hello@dealeo.es",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  const now = new Date();
  const todayKey = DAY_KEYS[now.getDay()];
  const nowMins = now.getHours() * 60 + now.getMinutes();

  // Find standing deals that should be live right now:
  // - active, not already live, has valid_days and valid_from
  // - today is in valid_days
  // - valid_from has passed
  // - valid_to has not passed (or no valid_to)
  const { data: candidates } = await supabase
    .from("deals")
    .select("id, title, title_es, valid_from, valid_to, restaurant_id, restaurants(id, name, image_emoji, user_id)")
    .eq("is_active", true)
    .eq("is_live", false)
    .not("valid_from", "is", null)
    .not("valid_days", "is", null)
    .contains("valid_days", [todayKey]);

  if (!candidates || candidates.length === 0) {
    return NextResponse.json({ activated: 0, reason: "no candidates" });
  }

  // Filter by time window
  const toActivate = (candidates as any[]).filter((d) => {
    const [fh, fm] = ((d.valid_from as string) ?? "").split(":").map(Number);
    const fromMins = fh * 60 + fm;
    if (nowMins < fromMins) return false; // not started yet

    if (d.valid_to) {
      const [th, tm] = (d.valid_to as string).split(":").map(Number);
      const toMins = th * 60 + tm;
      if (nowMins >= toMins) return false; // already ended
    }
    return true;
  });

  if (toActivate.length === 0) {
    return NextResponse.json({ activated: 0, reason: "none in time window" });
  }

  let activated = 0;
  let notified = 0;

  for (const deal of toActivate) {
    const { error } = await supabase
      .from("deals")
      .update({ is_live: true, went_live_at: now.toISOString(), live_duration_minutes: null })
      .eq("id", deal.id);

    if (error) continue;
    activated++;

    const restaurant = deal.restaurants as any;
    if (!restaurant) continue;

    // Send push notifications to followers + people who saved this deal
    const [{ data: follows }, { data: saved }, { data: subscriptions }] = await Promise.all([
      supabase.from("restaurant_follows").select("user_id").eq("restaurant_id", restaurant.id),
      supabase.from("favorites").select("user_id").eq("deal_id", deal.id),
      supabase.from("push_subscriptions").select("subscription, lang, user_id, endpoint"),
    ]);

    const followerIds = new Set((follows || []).map((f: any) => f.user_id));
    const savedByIds = new Set((saved || []).map((f: any) => f.user_id));
    const expired: string[] = [];

    for (const row of subscriptions || []) {
      const isEs = row.lang === "es";
      const isSaved = row.user_id && savedByIds.has(row.user_id);
      const isFollower = row.user_id && followerIds.has(row.user_id);

      let title: string;
      let body: string;

      if (isSaved) {
        title = isEs ? `⭐ ¡Tu oferta guardada está en vivo!` : `⭐ Your saved deal is live now!`;
        body = isEs
          ? `${deal.title_es ?? deal.title} en ${restaurant.name} — ¡date prisa!`
          : `${deal.title} at ${restaurant.name} — don't miss it!`;
      } else if (isFollower) {
        title = isEs
          ? `${restaurant.image_emoji || "🏪"} ¡${restaurant.name} está en vivo!`
          : `${restaurant.image_emoji || "🏪"} ${restaurant.name} is Live Now!`;
        body = isEs
          ? `${deal.title_es ?? deal.title} — un local que sigues`
          : `${deal.title} — a place you follow`;
      } else {
        continue; // only notify followers & saved-deal users for auto-live (avoid spam)
      }

      try {
        await webpush.sendNotification(row.subscription, JSON.stringify({
          title, body,
          url: `/deals/${deal.id}`,
          tag: `live-${deal.id}`,
        }));
        notified++;
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) expired.push(row.endpoint);
      }
    }

    for (const endpoint of expired) {
      await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
    }
  }

  return NextResponse.json({ activated, notified });
}
