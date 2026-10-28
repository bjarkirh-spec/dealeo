"use client";

import { useEffect, useRef } from "react";
import { registerServiceWorker, showNotification, updatePushLang } from "@/lib/notifications";
import { supabase } from "@/lib/supabase";
import type { DbDeal } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";

export default function NotificationSetup() {
  // Track which deal IDs we've already shown a notification for to prevent duplicates
  const notifiedIds = useRef<Set<string>>(new Set());
  const { lang } = useLang();
  // Use a ref so the realtime handler always reads the current lang without re-subscribing
  const langRef = useRef(lang);
  langRef.current = lang;

  // Update stored push subscription lang whenever user switches language
  useEffect(() => {
    updatePushLang(lang);
  }, [lang]);

  useEffect(() => {
    registerServiceWorker();

    // Subscribe to deals going live — only notify once per deal ID
    const channel = supabase
      .channel("notification-setup-live")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "deals" },
        (payload) => {
          const next = payload.new as DbDeal;
          // Only fire when deal is live, active, and we haven't notified for this deal yet
          if (next.is_live && next.is_active && !notifiedIds.current.has(next.id)) {
            notifiedIds.current.add(next.id);
            const isEs = langRef.current === "es";
            showNotification(
              isEs ? "🔴 ¡Oferta en vivo ahora!" : "🔴 Live deal just started!",
              isEs
                ? `${next.discount_label} — toca para verla ahora`
                : `${next.discount_label} — tap to see it now`,
              `/deals/${next.id}`,
              `live-${next.id}`
            );
          }
          // Clear from notified set when deal goes offline so future re-activations notify again
          if (!next.is_live && notifiedIds.current.has(next.id)) {
            notifiedIds.current.delete(next.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
