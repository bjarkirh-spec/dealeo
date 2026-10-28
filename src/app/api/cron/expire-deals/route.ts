import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { DbDeal } from "@/lib/types";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const now = new Date();
  const nowMs = now.getTime();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const DAY_KEYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayKey = DAY_KEYS[now.getDay()];

  // 1. Expire manually-activated deals whose duration has elapsed
  const { data: timedDeals } = await supabase
    .from("deals")
    .select("id, went_live_at, live_duration_minutes")
    .eq("is_live", true)
    .not("went_live_at", "is", null)
    .not("live_duration_minutes", "is", null);

  const timedExpired = (timedDeals || []).filter((d: Pick<DbDeal, "id" | "went_live_at" | "live_duration_minutes">) => {
    const expiresAt = new Date(d.went_live_at!).getTime() + d.live_duration_minutes! * 60000;
    return expiresAt <= nowMs;
  });

  // 2. Expire auto-live deals whose valid_to has passed or today is no longer a valid day
  const { data: autoDeals } = await supabase
    .from("deals")
    .select("id, valid_to, valid_days")
    .eq("is_live", true)
    .is("live_duration_minutes", null)
    .not("valid_from", "is", null);

  const autoExpired = (autoDeals || []).filter((d: any) => {
    // If today isn't a valid day anymore, turn off
    if (d.valid_days && !d.valid_days.includes(todayKey)) return true;
    // If valid_to has passed, turn off
    if (d.valid_to) {
      const [th, tm] = (d.valid_to as string).split(":").map(Number);
      if (nowMins >= th * 60 + tm) return true;
    }
    return false;
  });

  const allExpired = [...timedExpired, ...autoExpired];

  for (const deal of allExpired) {
    await supabase
      .from("deals")
      .update({ is_live: false, went_live_at: null, live_duration_minutes: null })
      .eq("id", deal.id);
  }

  return NextResponse.json({ expired: allExpired.length, timed: timedExpired.length, auto: autoExpired.length });
}
