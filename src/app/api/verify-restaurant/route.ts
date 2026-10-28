import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const { restaurantId, name, address } = await req.json();

  if (!restaurantId || !name || !address) {
    return NextResponse.json({ approved: false, reason: "missing fields" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    // No API key configured — skip auto-verify, leave pending for manual review
    return NextResponse.json({ approved: false, reason: "no api key" });
  }

  try {
    const query = encodeURIComponent(`${name} ${address} Alicante`);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`,
      { next: { revalidate: 0 } }
    );
    const json = await res.json();

    const found = json.status === "OK" && json.results?.length > 0;

    if (found) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await supabase
        .from("restaurants")
        .update({ is_approved: true })
        .eq("id", restaurantId);
    }

    return NextResponse.json({ approved: found, reason: found ? "found on google maps" : "not found" });
  } catch {
    return NextResponse.json({ approved: false, reason: "error" });
  }
}
