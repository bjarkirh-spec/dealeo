"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { DbRestaurant, DbDealTip } from "@/lib/types";

interface PriceReport {
  id: string;
  deal_id: string;
  suggested_price: string | null;
  photo_url: string | null;
  note: string | null;
  status: string;
  created_at: string;
  deals?: { title: string; discount_label: string; restaurants?: { name: string } };
}

const ADMIN_EMAIL = "bjarkirh@gmail.com";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<DbRestaurant[]>([]);
  const [approved, setApproved] = useState<DbRestaurant[]>([]);
  const [tips, setTips] = useState<DbDealTip[]>([]);
  const [actionId, setActionId] = useState<string | null>(null);
  const [priceReports, setPriceReports] = useState<PriceReport[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const email = data.session?.user?.email ?? "";
      if (!ADMIN_EMAIL || email !== ADMIN_EMAIL) {
        router.replace("/");
        return;
      }
      setAuthed(true);
      await Promise.all([fetchRestaurants(), fetchTips(), fetchPriceReports()]);
      setLoading(false);
    });
  }, [router]);

  async function fetchRestaurants() {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .eq("is_demo", false)
      .order("created_at", { ascending: false });

    if (!data) return;
    setPending(data.filter((r: DbRestaurant) => !r.is_approved));
    setApproved(data.filter((r: DbRestaurant) => r.is_approved));
  }

  async function fetchPriceReports() {
    const { data } = await supabase
      .from("price_reports")
      .select("*, deals(title, discount_label, restaurants(name))")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    if (data) setPriceReports(data as PriceReport[]);
  }

  async function approvePriceReport(report: PriceReport) {
    if (!report.suggested_price) return;
    await supabase.from("deals").update({ discount_label: report.suggested_price }).eq("id", report.deal_id);
    await supabase.from("price_reports").update({ status: "approved" }).eq("id", report.id);
    setPriceReports((r) => r.filter((x) => x.id !== report.id));
  }

  async function dismissPriceReport(id: string) {
    await supabase.from("price_reports").update({ status: "dismissed" }).eq("id", id);
    setPriceReports((r) => r.filter((x) => x.id !== id));
  }

  async function fetchTips() {
    const { data } = await supabase
      .from("deal_tips")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    if (data) setTips(data);
  }

  async function dismissTip(id: string) {
    await supabase.from("deal_tips").update({ status: "rejected" }).eq("id", id);
    setTips((t) => t.filter((tip) => tip.id !== id));
  }

  async function adminFetch(action: string, id: string) {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? "";
    return fetch("/api/admin-action", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ action, id }),
    });
  }

  async function approve(id: string) {
    setActionId(id);
    const res = await adminFetch("approve", id);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      alert(`Approve failed: ${res.status} — ${body.error ?? "unknown error"}`);
      setActionId(null);
      return;
    }

    // Send approval email to the restaurant
    const restaurant = pending.find((r) => r.id === id);
    if (restaurant?.email) {
      fetch("/api/email/bar-approved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: restaurant.email, restaurantName: restaurant.name }),
      });
    }

    await fetchRestaurants();
    setActionId(null);
  }

  async function reject(id: string) {
    if (!confirm("Delete this restaurant and all its deals? This cannot be undone.")) return;
    setActionId(id);
    await adminFetch("reject", id);
    await fetchRestaurants();
    setActionId(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            <span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span>
            <span className="text-gray-400 text-sm font-normal ml-2">admin</span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Price Reports */}
        {priceReports.length > 0 && (
          <section className="mb-10">
            <h2 className="font-black text-gray-900 text-lg mb-4">
              💰 Price Reports
              <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{priceReports.length}</span>
            </h2>
            <div className="flex flex-col gap-3">
              {priceReports.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">{r.deals?.restaurants?.name ?? "Unknown venue"}</p>
                      <p className="text-sm text-gray-700 mt-0.5">{r.deals?.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Current: <span className="font-medium">{r.deals?.discount_label}</span></p>
                      {r.suggested_price && (
                        <p className="text-xs text-green-700 font-bold mt-1">Suggested: {r.suggested_price}</p>
                      )}
                      {r.note && <p className="text-xs text-gray-500 italic mt-1">{r.note}</p>}
                      {r.photo_url && (
                        <a href={r.photo_url} target="_blank" rel="noreferrer" className="text-xs text-teal-600 underline mt-1 block">
                          📷 View photo
                        </a>
                      )}
                      <p className="text-xs text-gray-300 mt-1">{new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {r.suggested_price && (
                        <button
                          onClick={() => approvePriceReport(r)}
                          className="text-xs bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1.5 rounded-xl transition-colors"
                        >
                          ✓ Update price
                        </button>
                      )}
                      <button
                        onClick={() => dismissPriceReport(r.id)}
                        className="text-xs text-gray-400 hover:text-red-400 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deal Tips */}
        {tips.length > 0 && (
          <section className="mb-10">
            <h2 className="font-black text-gray-900 text-lg mb-4">
              💡 Deal Tips
              <span className="ml-2 bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">{tips.length}</span>
            </h2>
            <div className="flex flex-col gap-3">
              {tips.map((tip) => (
                <div key={tip.id} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">{tip.venue_name} <span className="text-gray-400 font-normal text-sm">· {tip.venue_city}</span></p>
                      <p className="text-sm text-gray-700 mt-1">{tip.deal_description}</p>
                      {tip.deal_days && <p className="text-xs text-gray-500 mt-1">📅 {tip.deal_days}</p>}
                      {tip.deal_time && <p className="text-xs text-gray-500">🕐 {tip.deal_time}</p>}
                      {tip.notes && <p className="text-xs text-gray-400 italic mt-1">{tip.notes}</p>}
                      <p className="text-xs text-gray-300 mt-1">{new Date(tip.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                    </div>
                    <button
                      onClick={() => dismissTip(tip.id)}
                      className="text-xs text-gray-400 hover:text-red-400 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pending */}
        <section className="mb-10">
          <h2 className="font-black text-gray-900 text-lg mb-4">
            ⏳ Pending Approval
            {pending.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
            )}
          </h2>

          {pending.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-gray-400 text-sm">
              No pending venues
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {pending.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{r.image_emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">{r.name}</p>
                      <p className="text-sm text-gray-500">{r.address}</p>
                      {r.neighborhood && <p className="text-xs text-gray-400">{r.neighborhood}</p>}
                      {r.phone && <p className="text-xs text-gray-400">📞 {r.phone}</p>}
                      {r.email && <p className="text-xs text-gray-400">✉️ {r.email}</p>}
                      {r.description && (
                        <p className="text-xs text-gray-500 mt-1 italic">&ldquo;{r.description}&rdquo;</p>
                      )}
                      <p className="text-xs text-gray-300 mt-1">
                        Signed up {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => approve(r.id)}
                        disabled={actionId === r.id}
                        className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => reject(r.id)}
                        disabled={actionId === r.id}
                        className="bg-white border border-red-200 hover:bg-red-50 text-red-500 text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Approved */}
        <section>
          <h2 className="font-black text-gray-900 text-lg mb-4">
            ✅ Approved Venues
            <span className="ml-2 text-gray-400 text-sm font-normal">({approved.length})</span>
          </h2>
          <div className="flex flex-col gap-2">
            {approved.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{r.image_emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.neighborhood || r.address}</p>
                </div>
                <span className="text-xs text-gray-300">
                  {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
