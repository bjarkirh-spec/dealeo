import { supabase } from "./supabase";

export async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    return reg;
  } catch (e) {
    console.error("SW registration failed:", e);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export async function subscribeUserToPush(lang: "en" | "es" | "it" = "en"): Promise<boolean> {
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return false;

    const reg = await registerServiceWorker();
    if (!reg) return false;

    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) return false;

    // Convert base64url VAPID key to Uint8Array
    const padding = "=".repeat((4 - (publicKey.length % 4)) % 4);
    const base64 = (publicKey + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const applicationServerKey = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      applicationServerKey[i] = rawData.charCodeAt(i);
    }

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });

    // Save to Supabase — upsert by endpoint to avoid duplicates
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id ?? null;

    await supabase.from("push_subscriptions").upsert(
      {
        user_id: userId,
        subscription: subscription.toJSON(),
        endpoint: subscription.endpoint,
        lang,
      },
      { onConflict: "endpoint" }
    );

    return true;
  } catch (e) {
    console.error("Push subscription failed:", e);
    return false;
  }
}

/** Update the stored language preference for the current device's push subscription */
export async function updatePushLang(lang: "en" | "es" | "it"): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    await supabase
      .from("push_subscriptions")
      .update({ lang })
      .eq("endpoint", sub.endpoint);
  } catch {/* fail silently */}
}

export function showNotification(title: string, body: string, url = "/", tag = "dealeo-live") {
  if (typeof window === "undefined" || Notification.permission !== "granted") return;
  const n = new Notification(title, {
    body,
    icon: "/api/icon",
    tag,
  });
  n.onclick = () => {
    window.focus();
    window.location.href = url;
    n.close();
  };
}

