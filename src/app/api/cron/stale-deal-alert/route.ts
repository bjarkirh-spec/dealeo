import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 60);

  const { data: staleDeals, error } = await supabase
    .from("deals")
    .select("id, title, created_at, restaurants(id, name, email)")
    .eq("is_active", true)
    .lt("created_at", cutoff.toISOString());

  if (error || !staleDeals || staleDeals.length === 0) {
    return NextResponse.json({ alerted: 0, deals: 0 });
  }

  // Group by restaurant
  const byVenue = new Map<string, { name: string; email: string; deals: { id: string; title: string; created_at: string }[] }>();

  for (const deal of staleDeals) {
    const r = Array.isArray(deal.restaurants) ? deal.restaurants[0] : deal.restaurants;
    if (!r?.email || !r?.name) continue;
    const key = r.id as string;
    if (!byVenue.has(key)) byVenue.set(key, { name: r.name, email: r.email, deals: [] });
    byVenue.get(key)!.deals.push({ id: deal.id, title: deal.title, created_at: deal.created_at });
  }

  let alerted = 0;

  for (const [, venue] of byVenue) {
    const dealRows = venue.deals
      .map(d => {
        const daysOld = Math.floor((Date.now() - new Date(d.created_at).getTime()) / 86400000);
        return `<li><b>${d.title}</b> — last updated ${daysOld} days ago</li>`;
      })
      .join("");

    await resend.emails.send({
      from: "Dealeo <hello@dealeo.es>",
      to: venue.email,
      subject: `⚠️ Your Dealeo offers may need a refresh`,
      html: `
        <p>Hi ${venue.name},</p>
        <p>Some of your deals on <a href="https://www.dealeo.es">Dealeo</a> haven't been updated in over 60 days. Prices and details can change — a quick review keeps your customers happy and ensures accuracy.</p>
        <ul>${dealRows}</ul>
        <p><a href="https://www.dealeo.es/business/dashboard" style="background:#f97316;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:8px">Review my deals →</a></p>
        <p style="color:#888;font-size:12px;margin-top:24px">You're receiving this because your venue is listed on Dealeo. <a href="https://www.dealeo.es/business/dashboard">Manage your listing</a>.</p>
      `,
    });

    alerted++;
  }

  // Also notify admin
  if (alerted > 0) {
    await resend.emails.send({
      from: "Dealeo <hello@dealeo.es>",
      to: "bjarkirh@gmail.com",
      subject: `📋 Stale deal alerts sent: ${alerted} venues`,
      html: `<p>${staleDeals.length} deals across ${alerted} venues are 60+ days old. Venue alert emails sent.</p>`,
    });
  }

  return NextResponse.json({ alerted, deals: staleDeals.length });
}
