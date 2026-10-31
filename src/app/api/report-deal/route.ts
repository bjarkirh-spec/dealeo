import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { dealId, dealTitle } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: deal } = await supabase
    .from("deals")
    .select("title, discount_label, restaurants(name, neighborhood)")
    .eq("id", dealId)
    .single();

  const venueName = (deal?.restaurants as { name?: string })?.name ?? "Unknown venue";
  const neighborhood = (deal?.restaurants as { neighborhood?: string })?.neighborhood ?? "";
  const venueStr = neighborhood ? `${venueName} · ${neighborhood}` : venueName;

  await resend.emails.send({
    from: "hello@dealeo.es",
    to: "bjarkirh@gmail.com",
    subject: `Price report: ${venueName} — ${deal?.title ?? dealTitle}`,
    html: `
      <p>A user flagged a possibly incorrect price.</p>
      <p><b>Venue:</b> ${venueStr}</p>
      <p><b>Deal:</b> ${deal?.title ?? dealTitle}</p>
      <p><b>Deal ID:</b> ${dealId}</p>
      <p>Check the deal in the dashboard and verify with the venue.</p>
      <p><a href="https://www.dealeo.es/admin">Open admin dashboard &rarr;</a></p>
    `,
  });

  return NextResponse.json({ ok: true });
}
