"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, getRestaurantByUser, getDealsByRestaurant } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { DbRestaurant, DbDeal } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";

interface Redemption {
  id: string;
  deal_id: string;
  deal_title: string;
  discount_label: string;
  redeemed_at: string;
}

interface DealStat {
  id: string;
  title: string;
  discount_label: string;
  count: number;
  going: number;
  is_active: boolean;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { lang } = useLang();
  const langRef = useRef(lang);
  langRef.current = lang;
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<DbRestaurant | null>(null);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [dealStats, setDealStats] = useState<DealStat[]>([]);
  const dealIdsRef = useRef<string[]>([]);
  const [newRedemptionFlash, setNewRedemptionFlash] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (!session) { router.push("/business/login"); return; }

      const { data: rest } = await getRestaurantByUser(session.user.id);
      if (!rest) { router.push("/business/dashboard"); return; }
      setRestaurant(rest);

      const { data: deals } = await getDealsByRestaurant(rest.id);
      const dealList = deals || [];
      const dealIds = dealList.map((d: DbDeal) => d.id);
      dealIdsRef.current = dealIds;

      if (dealIds.length === 0) {
        setLoading(false);
        return;
      }

      const [{ data: reds }, { data: goingRows }] = await Promise.all([
        supabase
          .from("user_redemptions")
          .select("id, deal_id, deal_title, discount_label, redeemed_at")
          .in("deal_id", dealIds)
          .order("redeemed_at", { ascending: false }),
        supabase
          .from("deal_going")
          .select("deal_id")
          .in("deal_id", dealIds),
      ]);

      const redemptionList: Redemption[] = reds || [];
      setRedemptions(redemptionList);

      // Build per-deal stats
      const countMap: Record<string, number> = {};
      for (const r of redemptionList) {
        countMap[r.deal_id] = (countMap[r.deal_id] || 0) + 1;
      }
      const goingMap: Record<string, number> = {};
      for (const g of goingRows || []) {
        goingMap[g.deal_id] = (goingMap[g.deal_id] || 0) + 1;
      }

      const stats: DealStat[] = dealList.map((d: DbDeal) => ({
        id: d.id,
        title: d.title,
        discount_label: d.discount_label,
        count: countMap[d.id] || 0,
        going: goingMap[d.id] || 0,
        is_active: d.is_active,
      })).sort((a: DealStat, b: DealStat) => b.count - a.count);

      setDealStats(stats);
      setLoading(false);
    }
    load();

    // Realtime: add new redemptions as they happen
    const channel = supabase
      .channel("analytics-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_redemptions" },
        (payload) => {
          const r = payload.new as Redemption;
          if (!dealIdsRef.current.includes(r.deal_id)) return;
          setRedemptions((prev) => [r, ...prev]);
          setDealStats((prev) =>
            [...prev]
              .map((d) => d.id === r.deal_id ? { ...d, count: d.count + 1 } : d)
              .sort((a, b) => b.count - a.count)
          );
          setNewRedemptionFlash(`✅ ${r.discount_label} ${langRef.current === "es" ? "canjeado!" : "redeemed!"}`);
          setTimeout(() => setNewRedemptionFlash(null), 3000);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const weekStart = todayStart - 6 * 86400000;

  const todayCount = redemptions.filter(r => new Date(r.redeemed_at).getTime() >= todayStart).length;
  const weekCount = redemptions.filter(r => new Date(r.redeemed_at).getTime() >= weekStart).length;
  const totalCount = redemptions.length;
  const totalGoing = dealStats.reduce((s, d) => s + d.going, 0);
  const topDeal = dealStats[0];
  const maxCount = Math.max(...dealStats.map(d => d.count), 1);

  // Last 7 days bar chart data
  const days: { label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = todayStart - i * 86400000;
    const dayEnd = dayStart + 86400000;
    const count = redemptions.filter(r => {
      const t = new Date(r.redeemed_at).getTime();
      return t >= dayStart && t < dayEnd;
    }).length;
    const date = new Date(dayStart);
    days.push({
      label: date.toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { weekday: "short" }),
      count,
    });
  }
  const maxDay = Math.max(...days.map(d => d.count), 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/business/dashboard" className="text-gray-500 hover:text-gray-700 text-xl">←</Link>
          <h1 className="font-bold text-gray-900 flex-1">{lang === "es" ? "Analíticas" : "Analytics"}</h1>
          <span className="text-sm text-gray-400">{restaurant?.name}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-12">
        {/* Live redemption flash */}
        {newRedemptionFlash && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            {newRedemptionFlash}
          </div>
        )}

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: lang === "es" ? "Hoy" : "Today", value: todayCount, icon: "📅" },
            { label: lang === "es" ? "Esta semana" : "This week", value: weekCount, icon: "📈" },
            { label: lang === "es" ? "Total" : "All time", value: totalCount, icon: "🎟️" },
            { label: lang === "es" ? "Van a ir" : "Going", value: totalGoing, icon: "🙋" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-2xl font-black text-gray-900">{value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* 7-day bar chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">{lang === "es" ? "Canjes — últimos 7 días" : "Redemptions — last 7 days"}</h2>
          {totalCount === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">{lang === "es" ? "Sin canjes aún" : "No redemptions yet"}</p>
          ) : (
            <div className="flex items-end gap-2 h-28">
              {days.map(({ label, count }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500 font-medium">{count > 0 ? count : ""}</span>
                  <div className="w-full rounded-t-lg bg-orange-100 flex items-end justify-center" style={{ height: "80px" }}>
                    <div
                      className="w-full rounded-t-lg bg-orange-500 transition-all"
                      style={{ height: `${(count / maxDay) * 80}px`, minHeight: count > 0 ? "4px" : "0" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top deal highlight */}
        {topDeal && topDeal.count > 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-5 mb-6 text-white">
            <p className="text-orange-100 text-xs font-medium uppercase tracking-wide mb-1">⭐ {lang === "es" ? "Mejor oferta" : "Top performer"}</p>
            <p className="font-black text-xl">{topDeal.title}</p>
            <p className="text-orange-100 text-sm mt-1">
              {topDeal.discount_label} · {topDeal.count} {lang === "es" ? `canje${topDeal.count !== 1 ? "s" : ""}` : `redemption${topDeal.count !== 1 ? "s" : ""}`}
            </p>
          </div>
        )}

        {/* Per-deal breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">{lang === "es" ? "Por oferta" : "Per-deal breakdown"}</h2>
          {dealStats.length === 0 ? (
            <p className="text-gray-400 text-sm">{lang === "es" ? "Sin ofertas aún" : "No deals yet"}</p>
          ) : (
            <div className="space-y-3">
              {dealStats.map((deal) => (
                <div key={deal.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${deal.is_active ? "bg-green-400" : "bg-gray-300"}`} />
                      <span className="text-sm font-medium text-gray-900 truncate">{deal.title}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                      <span className="text-sm font-black text-gray-900">{deal.count}</span>
                      {deal.going > 0 && (
                        <span className="text-xs text-teal-600 font-medium">🙋 {deal.going}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full transition-all"
                      style={{ width: `${(deal.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent redemptions feed */}
        {redemptions.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">{lang === "es" ? "Canjes recientes" : "Recent redemptions"}</h2>
              <button
                onClick={() => {
                  const header = ["Date", "Deal", "Discount"].join(",");
                  const rows = redemptions.map(r =>
                    [
                      new Date(r.redeemed_at).toISOString().slice(0, 16).replace("T", " "),
                      `"${r.deal_title.replace(/"/g, '""')}"`,
                      r.discount_label,
                    ].join(",")
                  );
                  const csv = [header, ...rows].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${restaurant?.name ?? "dealeo"}-redemptions.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="text-xs text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
              >
                ⬇ {lang === "es" ? "Exportar CSV" : "Export CSV"}
              </button>
            </div>
            <div className="space-y-3">
              {redemptions.slice(0, 20).map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <div className="bg-orange-100 text-orange-600 font-black text-xs px-2 py-1 rounded-lg flex-shrink-0">
                    {r.discount_label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{r.deal_title}</p>
                  </div>
                  <p className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(r.redeemed_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalCount === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📊</p>
            <p className="font-medium text-gray-600">{lang === "es" ? "Sin canjes aún" : "No redemptions yet"}</p>
            <p className="text-sm mt-1">{lang === "es" ? "Publica una oferta en vivo para atraer clientes" : "Go live with a deal to start attracting customers"}</p>
          </div>
        )}
      </main>
    </div>
  );
}
