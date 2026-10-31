import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const getAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const supabase = getAdmin();

  const formData = await req.formData();
  const dealId = formData.get("dealId") as string;
  const dealTitle = formData.get("dealTitle") as string;
  const suggestedPrice = (formData.get("suggestedPrice") as string) || null;
  const note = (formData.get("note") as string) || null;
  const photo = formData.get("photo") as File | null;

  let photoUrl: string | null = null;
  if (photo && photo.size > 0) {
    const ext = photo.name.split(".").pop() ?? "jpg";
    const path = `${dealId}/${Date.now()}.${ext}`;
    const bytes = await photo.arrayBuffer();
    const { error: uploadErr } = await supabase.storage
      .from("price-reports")
      .upload(path, bytes, { contentType: photo.type, upsert: false });
    if (!uploadErr) {
      const { data } = supabase.storage.from("price-reports").getPublicUrl(path);
      photoUrl = data.publicUrl;
    }
  }

  await supabase.from("price_reports").insert({
    deal_id: dealId,
    suggested_price: suggestedPrice,
    photo_url: photoUrl,
    note,
    status: "pending",
  });

  const { data: deal } = await supabase
    .from("deals")
    .select("title, discount_label, restaurants(name, neighborhood)")
    .eq("id", dealId)
    .single();

  const venueName = (deal?.restaurants as { name?: string })?.name ?? "Unknown venue";
  const neighborhood = (deal?.restaurants as { neighborhood?: string })?.neighborhood ?? "";
  const venueStr = neighborhood ? `${venueName} &middot; ${neighborhood}` : venueName;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "hello@dealeo.es",
    to: "bjarkirh@gmail.com",
    subject: `Price report: ${venueName} - ${deal?.title ?? dealTitle}`,
    html: `
      <p>A user flagged a possibly incorrect price.</p>
      <p><b>Venue:</b> ${venueStr}</p>
      <p><b>Deal:</b> ${deal?.title ?? dealTitle}</p>
      ${suggestedPrice ? `<p><b>Suggested correct price:</b> ${suggestedPrice}</p>` : ""}
      ${note ? `<p><b>Note:</b> ${note}</p>` : ""}
      ${photoUrl ? `<p><b>Photo:</b> <a href="${photoUrl}">View photo</a></p>` : ""}
      <p><a href="https://www.dealeo.es/admin">Review in admin &rarr;</a></p>
    `,
  });

  return NextResponse.json({ ok: true });
}
