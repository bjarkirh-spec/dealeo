"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, getRestaurantByUser, getDealsByRestaurant, signOut, toggleDeal, toggleLive, deleteDeal } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { DbRestaurant, DbDeal } from "@/lib/types";
import { QRCodeCanvas } from "qrcode.react";

function LiveTimeLeft({ wentLiveAt, durationMinutes }: { wentLiveAt: string; durationMinutes: number }) {
  const calc = () => {
    const expiry = new Date(new Date(wentLiveAt).getTime() + durationMinutes * 60000);
    const diffMins = Math.floor((expiry.getTime() - Date.now()) / 60000);
    if (diffMins <= 0) return "Ending soon";
    if (diffMins < 60) return `${diffMins}m left`;
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return mins > 0 ? `${hrs}h ${mins}m left` : `${hrs}h left`;
  };
  const [label, setLabel] = useState(calc);
  useEffect(() => {
    setLabel(calc());
    const t = setInterval(() => setLabel(calc()), 30000);
    return () => clearInterval(t);
  }, [wentLiveAt, durationMinutes]);
  return <span className="text-white text-xs font-medium opacity-90 flex-shrink-0">{label}</span>;
}

export default function Dashboard() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<DbRestaurant | null>(null);
  const [deals, setDeals] = useState<DbDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [noRestaurant, setNoRestaurant] = useState(false);
  const [durationPick, setDurationPick] = useState<string | null>(null); // deal id showing picker
  const [showMarketing, setShowMarketing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // deal id pending delete
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState(false);
  const dealIdsRef = useRef<string[]>([]);
  const [goingCounts, setGoingCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (!session) {
        router.push("/business/login");
        return;
      }

      const { data: rest } = await getRestaurantByUser(session.user.id);
      if (!rest) {
        setNoRestaurant(true);
        setLoading(false);
        return;
      }

      setRestaurant(rest);
      const { data: d } = await getDealsByRestaurant(rest.id);
      const dealList = d || [];

      // Auto-stop any expired live deals
      const now = Date.now();
      for (const deal of dealList) {
        if (
          deal.is_live &&
          deal.went_live_at &&
          deal.live_duration_minutes &&
          new Date(deal.went_live_at).getTime() + deal.live_duration_minutes * 60000 <= now
        ) {
          await toggleLive(deal.id, false);
          deal.is_live = false;
          deal.went_live_at = null;
          deal.live_duration_minutes = null;
        }
      }

      dealIdsRef.current = dealList.map((d) => d.id);
      setDeals(dealList);

      // Fetch going counts for all deals
      if (dealList.length > 0) {
        const { data: goingData } = await supabase
          .from("deal_going")
          .select("deal_id")
          .in("deal_id", dealList.map((d) => d.id));
        const counts: Record<string, number> = {};
        for (const g of goingData || []) {
          counts[g.deal_id] = (counts[g.deal_id] || 0) + 1;
        }
        setGoingCounts(counts);
      }

      setLoading(false);
    }
    load();

    // Realtime: keep redemptions_count current as customers redeem deals
    const channel = supabase
      .channel("dashboard-redemptions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_redemptions" },
        (payload) => {
          const r = payload.new as { deal_id: string };
          if (!dealIdsRef.current.includes(r.deal_id)) return;
          setDeals((prev) =>
            prev.map((d) =>
              d.id === r.deal_id
                ? { ...d, redemptions_count: (d.redemptions_count || 0) + 1 }
                : d
            )
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [router]);

  const handleToggle = async (dealId: string, current: boolean) => {
    if (togglingId) return;
    setTogglingId(dealId);
    await toggleDeal(dealId, !current);
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, is_active: !current } : d))
    );
    setTogglingId(null);
  };

  const handleToggleLive = async (dealId: string, current: boolean, durationMinutes?: number | null) => {
    const goingLive = !current;
    setDurationPick(null);
    await toggleLive(dealId, goingLive, durationMinutes);
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? {
              ...d,
              is_live: goingLive,
              went_live_at: goingLive ? new Date().toISOString() : null,
              live_duration_minutes: goingLive ? (durationMinutes ?? null) : null,
            }
          : d
      )
    );

    // Fire push notifications when going live
    if (goingLive && restaurant) {
      const deal = deals.find((d) => d.id === dealId);
      const { data: { session } } = await supabase.auth.getSession();
      fetch("/api/notify-live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({
          restaurantName: restaurant!.name,
          restaurantEmoji: restaurant!.image_emoji,
          dealTitle: deal?.title ?? "",
          dealTitleEs: deal?.title_es ?? "",
          discountLabel: deal?.discount_label ?? "",
          dealId,
          restaurantId: restaurant!.id,
        }),
      });
    }
  };

  const handleDelete = async (dealId: string) => {
    setDeletingId(dealId);
    await deleteDeal(dealId);
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    setConfirmDelete(null);
    setDeletingId(null);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/business/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeDeals = deals.filter((d) => d.is_active);
  const liveDeals = deals.filter((d) => d.is_live);
  const totalRedemptions = deals.reduce((sum, d) => sum + (d.redemptions_count || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pending approval banner */}
      {restaurant && !restaurant.is_approved && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center text-sm">
          <span className="text-amber-800 font-medium">⏳ Your venue is pending review.</span>
          <span className="text-amber-700"> Your deals will go live once approved — usually within 24 hours. Questions? Email </span>
          <a href="mailto:hello@dealeo.es" className="text-amber-800 font-semibold underline">hello@dealeo.es</a>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              {restaurant?.name}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {noRestaurant ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-4xl mb-3">🍽️</p>
            <h2 className="font-bold text-gray-900 mb-2">No restaurant linked yet</h2>
            <p className="text-gray-500 text-sm mb-6">
              Contact Dealeo to link your restaurant to this account.
            </p>
            <a
              href="mailto:hello@dealeo.es"
              className="inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-xl text-sm"
            >
              Contact us
            </a>
          </div>
        ) : (
          <>
            {/* Welcome */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">Business Dashboard</p>
                <h1 className="text-2xl font-black text-gray-900">
                  {restaurant!.image_emoji} {restaurant!.name}
                </h1>
                <p className="text-gray-500 text-sm">{restaurant!.neighborhood} · {restaurant!.address}</p>
              </div>
              <Link
                href="/business/dashboard/edit-profile"
                className="flex-shrink-0 text-xs text-gray-400 hover:text-orange-500 bg-white border border-gray-200 px-3 py-1.5 rounded-xl font-medium transition-colors"
              >
                ✏️ Edit profile
              </Link>
            </div>

            {/* Live deal alert */}
            {liveDeals.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-red-700 text-sm">
                    {liveDeals.length} deal{liveDeals.length > 1 ? "s" : ""} live right now
                  </p>
                  <p className="text-red-400 text-xs">Customers nearby are seeing your deals</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { label: "Active", value: activeDeals.length, icon: "🎯" },
                { label: "Live Now", value: liveDeals.length, icon: "🔴" },
                { label: "Redeemed", value: totalRedemptions, icon: "✅" },
                { label: "Going", value: Object.values(goingCounts).reduce((s, c) => s + c, 0), icon: "🙋", tooltip: "Users who tapped 'Going' on your deals — planning to visit" },
              ].map(({ label, value, icon, tooltip }: { label: string; value: number; icon: string; tooltip?: string }) => (
                <div key={label} title={tooltip} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center cursor-default">
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-2xl font-black text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <Link
                href="/business/dashboard/analytics"
                className="w-full flex items-center justify-between bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>View full analytics</span>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            </div>

            {/* Marketing Tools */}
            <div className="mb-6">
              <button
                onClick={() => setShowMarketing((v) => !v)}
                className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3.5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📣</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Marketing Tools</p>
                    <p className="text-xs text-gray-400">QR code · Share link</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{showMarketing ? "▲" : "▼"}</span>
              </button>

              {showMarketing && (
                <div className="bg-white border border-gray-100 border-t-0 rounded-b-2xl px-4 pb-5 -mt-1 pt-4">
                  <p className="text-xs text-gray-500 mb-4 text-center">
                    Print this QR code and display it at your venue — customers scan it to see your deals on Dealeo
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                      <QRCodeCanvas
                        id="restaurant-qr"
                        value={`${window.location.origin}/restaurants/${restaurant!.id}`}
                        size={180}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  </div>
                  {copyToast && (
                    <p className="text-xs text-green-600 font-medium text-center mb-2">✅ Link copied!</p>
                  )}
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/restaurants/${restaurant!.id}`);
                        setCopyToast(true);
                        setTimeout(() => setCopyToast(false), 2500);
                      }}
                      className="flex-1 py-2.5 text-sm font-bold border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      🔗 Copy link
                    </button>
                    <button
                      onClick={() => {
                        const canvas = document.getElementById("restaurant-qr") as HTMLCanvasElement;
                        if (!canvas) return;
                        const url = canvas.toDataURL("image/png");
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${restaurant!.name}-dealeo-qr.png`;
                        a.click();
                      }}
                      className="flex-1 py-2.5 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      ⬇ Download
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/restaurants/${restaurant!.id}`;
                      const text = `Check out our deals on Dealeo! ${url}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                    }}
                    className="w-full py-2.5 text-sm font-bold bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    💬 Share on WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Deals list */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">Your Deals</h2>
              <Link
                href="/business/dashboard/new-deal"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
              >
                + New Deal
              </Link>
            </div>

            {deals.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <p className="text-4xl mb-3">✨</p>
                <h3 className="font-bold text-gray-900 mb-2">No deals yet</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Create your first deal to start attracting customers
                </p>
                <Link
                  href="/business/dashboard/new-deal"
                  className="inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-xl text-sm"
                >
                  Create First Deal →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                      deal.is_live ? "border-red-200" : "border-gray-100"
                    }`}
                  >
                    {/* Live banner */}
                    {deal.is_live && (
                      <div className="bg-red-500 px-4 py-1.5 flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-xs font-bold flex-1">LIVE NOW · Customers can see this deal</span>
                        {deal.went_live_at && deal.live_duration_minutes && (
                          <LiveTimeLeft wentLiveAt={deal.went_live_at} durationMinutes={deal.live_duration_minutes} />
                        )}
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">{deal.title}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {deal.discount_label}
                            {deal.valid_from
                              ? ` · ${deal.valid_from.slice(0, 5)} – ${(deal.valid_until || "").slice(0, 5)}`
                              : deal.valid_until
                              ? ` · Until ${deal.valid_until.slice(0, 5)}`
                              : ""}
                          </p>
                          {(deal.valid_days?.length ?? 0) > 0 && (
                            <p className="text-xs text-gray-400 mt-0.5">📅 {deal.valid_days!.join(", ")}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-0.5">
                            {deal.redemptions_count || 0} redemptions
                            {deal.max_redemptions ? ` / ${deal.max_redemptions} max` : ""}
                            {(goingCounts[deal.id] || 0) > 0 && (
                              <span className="ml-2 text-teal-600 font-medium">· 🙋 {goingCounts[deal.id]} going</span>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Active toggle */}
                          <button
                            onClick={() => handleToggle(deal.id, deal.is_active)}
                            disabled={togglingId === deal.id}
                            className={`w-10 h-6 rounded-full transition-colors relative ${
                              togglingId === deal.id ? "opacity-50 cursor-not-allowed" : ""
                            } ${deal.is_active ? "bg-green-400" : "bg-gray-200"}`}
                            title={deal.is_active ? "Active — tap to deactivate" : "Inactive — tap to activate"}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                                deal.is_active ? "left-5" : "left-1"
                              }`}
                            />
                          </button>

                          {/* Repeat (template) */}
                          <Link
                            href={`/business/dashboard/new-deal?from=${deal.id}&title=${encodeURIComponent(deal.title)}&title_es=${encodeURIComponent(deal.title_es || "")}&category=${deal.category}&discount=${encodeURIComponent(deal.discount_label)}&from_time=${deal.valid_from || ""}&until_time=${deal.valid_until || ""}&days=${(deal.valid_days || []).join(",")}&type=${deal.deal_type}`}
                            className="text-gray-300 hover:text-teal-500 transition-colors text-base"
                            title="Repeat this deal"
                          >
                            📋
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/business/dashboard/edit-deal/${deal.id}`}
                            className="text-gray-300 hover:text-orange-400 transition-colors text-base"
                            title="Edit deal"
                          >
                            ✏️
                          </Link>

                          {/* Delete */}
                          {confirmDelete === deal.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(deal.id)}
                                disabled={deletingId === deal.id}
                                className={`text-xs text-red-500 font-bold hover:text-red-600 ${deletingId === deal.id ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                {deletingId === deal.id ? "..." : "Delete"}
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="text-xs text-gray-400 hover:text-gray-600 ml-1"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(deal.id)}
                              className="text-gray-300 hover:text-red-400 transition-colors text-base"
                              title="Delete deal"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Go Live / Stop */}
                      {deal.is_active && (
                        deal.is_live ? (
                          <button
                            onClick={() => handleToggleLive(deal.id, true)}
                            className="w-full py-2.5 rounded-xl text-sm font-bold bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-all"
                          >
                            ⏹ Stop Live Deal
                          </button>
                        ) : durationPick === deal.id ? (
                          <div className="space-y-2">
                            <p className="text-xs text-gray-500 font-medium text-center">How long should this deal run?</p>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { label: "30m", value: 30 },
                                { label: "1h", value: 60 },
                                { label: "2h", value: 120 },
                                { label: "∞", value: null },
                              ].map(({ label, value }) => (
                                <button
                                  key={label}
                                  onClick={() => handleToggleLive(deal.id, false, value)}
                                  className="py-2 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-orange-500 transition-colors"
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={() => setDurationPick(null)}
                              className="w-full py-1.5 text-xs text-gray-400 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDurationPick(deal.id)}
                            className="w-full py-2.5 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all"
                          >
                            🔴 Go Live Now
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Support */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-400 mb-3">Need help? We&apos;re here.</p>
          <div className="flex gap-3 justify-center">
            <a
              href="https://wa.me/34643731206?text=Hi%2C%20I%20need%20help%20with%20my%20Dealeo%20listing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp us
            </a>
            <a
              href="mailto:hello@dealeo.es"
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              ✉️ Email us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
