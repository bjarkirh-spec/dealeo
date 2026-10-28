import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  webpush.setVapidDetails(
    "mailto:hello@dealeo.es",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch the top active deals by redemption count for the teaser text
  const { data: topDeals } = await supabase
    .from("deals")
    .select("title, title_es, discount_label, id, restaurants(name)")
    .eq("is_active", true)
    .order("redemptions_count", { ascending: false })
    .limit(3);

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("subscription, lang, endpoint");

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const dealCount = topDeals?.length ?? 0;
  const topDeal = topDeals?.[0] ?? null;
  const topRestaurantName = topDeal
    ? (Array.isArray(topDeal.restaurants)
        ? (topDeal.restaurants[0] as { name: string } | undefined)?.name
        : (topDeal.restaurants as { name: string } | null)?.name) ?? "Dealeo"
    : "Dealeo";

  let sent = 0;
  const expired: string[] = [];

  for (const row of subscriptions) {
    const isEs = row.lang === "es";

    const title = isEs
      ? "🎉 Las mejores ofertas de la semana"
      : "🎉 This week's best deals in Alicante";

    const body = isEs
      ? dealCount > 0
        ? `${topDeal!.discount_label} en ${topRestaurantName} y más ofertas esperándote`
        : "Happy hours, 2x1 y más — descubre qué hay esta noche"
      : dealCount > 0
        ? `${topDeal!.discount_label} at ${topRestaurantName} and more waiting for you`
        : "Happy hours, 2-for-1s and more — see what's on tonight";

    const payload = JSON.stringify({
      title,
      body,
      url: "/deals",
      tag: "weekly-deals",
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

  // Clean up dead subscriptions
  for (const endpoint of expired) {
    await supabase
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", endpoint);
  }

  return NextResponse.json({ sent, expired: expired.length, deals: dealCount });
}
