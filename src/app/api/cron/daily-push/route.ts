import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

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

  // Today's day key (e.g. "fri")
  const today = DAYS[new Date().getDay()];

  // Fetch today's active deals with restaurant info, pick top 5 by rating
  const { data: deals } = await supabase
    .from("deals")
    .select("id, title, title_es, discount_label, restaurants(name, image_emoji, rating)")
    .eq("is_active", true)
    .eq("is_live", false)
    .eq("source", "venue")
    .contains("valid_days", [today])
    .order("id")
    .limit(50);

  if (!deals || deals.length === 0) {
    return NextResponse.json({ sent: 0, reason: "no deals today" });
  }

  // Sort by restaurant rating descending, pick top 3
  const sorted = [...deals].sort((a, b) => {
    const ra = (a.restaurants as any)?.rating ?? 0;
    const rb = (b.restaurants as any)?.rating ?? 0;
    return rb - ra;
  });
  const top = sorted.slice(0, 3);
  const featured = top[0];
  const restaurant = (featured.restaurants as any);

  // Build notification copy
  const countText = top.length > 1 ? ` + ${top.length - 1} more` : "";
  const countTextEs = top.length > 1 ? ` + ${top.length - 1} más` : "";

  const enTitle = `${restaurant?.image_emoji ?? "🍺"} Happy hour starts soon!`;
  const enBody  = `${featured.title}${countText} — tap to see tonight's best deals`;
  const esTitle = `${restaurant?.image_emoji ?? "🍺"} ¡El happy hour empieza pronto!`;
  const esBody  = `${featured.title_es ?? featured.title}${countTextEs} — toca para ver las mejores ofertas de hoy`;

  // Fetch all push subscriptions
  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("subscription, lang, endpoint");

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0, reason: "no subscribers" });
  }

  let sent = 0;
  const expired: string[] = [];

  for (const row of subscriptions) {
    const isEs = row.lang === "es";
    const payload = JSON.stringify({
      title: isEs ? esTitle : enTitle,
      body:  isEs ? esBody  : enBody,
      url:   `/deals/${featured.id}`,
      tag:   "daily-push",
    });

    try {
      await webpush.sendNotification(row.subscription, payload);
      sent++;
    } catch (err: any) {
      if (err.statusCode === 410 || err.statusCode === 404) {
        expired.push(row.endpoint);
      }
    }
  }

  // Clean up expired subscriptions
  for (const endpoint of expired) {
    await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
  }

  return NextResponse.json({
    sent,
    expired: expired.length,
    featured: featured.title,
    today,
  });
}
