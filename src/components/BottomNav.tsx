"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import type { DbDeal } from "@/lib/types";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    labelEs: "Inicio",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#0d9488" : "none"} stroke={active ? "#0d9488" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    href: "/deals",
    label: "Deals",
    labelEs: "Ofertas",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#0d9488" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    href: "/live",
    label: "Live",
    labelEs: "En Vivo",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#0d9488" : "none"} stroke={active ? "#0d9488" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    href: "/map",
    label: "Map",
    labelEs: "Mapa",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#0d9488" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    href: "/favorites",
    label: "Saved",
    labelEs: "Guardados",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#0d9488" : "none"} stroke={active ? "#0d9488" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    // Check live deals count for badge
    supabase
      .from("deals")
      .select("id", { count: "exact", head: true })
      .eq("is_live", true)
      .eq("is_active", true)
      .then(({ count }) => setLiveCount(count ?? 0));

    // Subscribe to live deal changes to update badge
    const channel = supabase
      .channel("bottom-nav-live")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "deals" }, (payload) => {
        const next = payload.new as DbDeal;
        const prev = payload.old as Partial<DbDeal>;
        if (next.is_live && !prev.is_live) setLiveCount((c) => c + 1);
        else if (!next.is_live && prev.is_live) setLiveCount((c) => Math.max(0, c - 1));
        else if (!next.is_active && prev.is_active && prev.is_live) setLiveCount((c) => Math.max(0, c - 1));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="max-w-2xl mx-auto flex">
        {NAV_ITEMS.map(({ href, label, labelEs, icon }) => {
          const active = pathname === href;
          const showBadge = href === "/live" && liveCount > 0 && !active;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-1 py-3 relative"
            >
              <div className="relative">
                {icon(active)}
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-black">
                    {liveCount > 9 ? "9+" : liveCount}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${active ? "text-teal-600" : "text-gray-400"}`}>
                {lang === "es" ? labelEs : label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
