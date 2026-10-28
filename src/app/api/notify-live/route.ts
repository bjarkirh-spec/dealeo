import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

export async function POST(req: NextRequest) {
  const { dealId, dealTitle, dealTitleEs, discountLabel, restaurantName, restaurantEmoji } = await req.json();

  if (!dealId || !dealTitle) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
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

  const { data: subscriptions } = await supabase
    .from("push_subscriptions")
    .select("subscription, lang, endpoint");

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const emoji = restaurantEmoji || "🔴";
  const expired: string[] = [];
  let sent = 0;

  for (const row of subscriptions) {
    const isEs = row.lang === "es";
    const isIt = row.lang === "it";

    const title = isEs
      ? `${emoji} ¡Oferta en directo ahora!`
      : isIt
      ? `${emoji} Offerta live adesso!`
      : `${emoji} Live deal just dropped!`;

    const body = isEs
      ? `${dealTitleEs ?? dealTitle} en ${restaurantName} — ${discountLabel}`
      : isIt
      ? `${dealTitle} da ${restaurantName} — ${discountLabel}`
      : `${dealTitle} at ${restaurantName} — ${discountLabel}`;

    const payload = JSON.stringify({
      title,
      body,
      url: `/deals/${dealId}`,
      tag: "live-deal",
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

  for (const endpoint of expired) {
    await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
  }

  return NextResponse.json({ sent, expired: expired.length });
}
