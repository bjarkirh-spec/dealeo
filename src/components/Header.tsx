"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";
import { subscribeUserToPush } from "@/lib/notifications";
import type { User } from "@supabase/supabase-js";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const { lang, setLang } = useLang();
  const [notifStatus, setNotifStatus] = useState<"default" | "granted" | "denied">("default");
  const [notifToast, setNotifToast] = useState<string | null>(null);

  // Install
  const [showInstall, setShowInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
    if (isStandalone) return;
    if (localStorage.getItem("pwa-install-dismissed")) return;

    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
    if (ios) { setIsIos(true); setShowInstall(true); return; }

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIos) { setShowIosGuide(true); return; }
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") {
      setShowInstall(false);
      localStorage.setItem("pwa-install-dismissed", "1");
    }
    deferredPrompt.current = null;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    if (typeof window !== "undefined") {
      const storedEnabled = localStorage.getItem("dealeo_notifications_enabled") === "true";
      if ("Notification" in window) {
        const perm = Notification.permission as "default" | "granted" | "denied";
        if (perm === "denied") {
          setNotifStatus("denied");
        } else if (perm === "granted" || storedEnabled) {
          setNotifStatus("granted");
        } else {
          setNotifStatus("default");
        }
      } else if (storedEnabled) {
        setNotifStatus("granted");
      }
    }
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleNotifBell = async () => {
    if (notifStatus === "granted") {
      const msg = lang === "es" ? "✅ Notificaciones activadas" : "✅ Notifications are on";
      setNotifToast(msg);
      setTimeout(() => setNotifToast(null), 2500);
      return;
    }
    if (notifStatus === "denied") {
      const msg = lang === "es"
        ? "Notificaciones bloqueadas — actívalas en los ajustes del navegador"
        : "Notifications blocked — enable them in browser settings";
      setNotifToast(msg);
      setTimeout(() => setNotifToast(null), 3500);
      return;
    }
    const granted = await subscribeUserToPush(lang);
    const newStatus = granted ? "granted" : "denied";
    setNotifStatus(newStatus);
    if (typeof window !== "undefined") {
      if (granted) localStorage.setItem("dealeo_notifications_enabled", "true");
      else localStorage.removeItem("dealeo_notifications_enabled");
    }
    const msg = granted
      ? (lang === "es" ? "🔔 ¡Notificaciones activadas!" : "🔔 Notifications enabled!")
      : (lang === "es" ? "Permisos denegados" : "Permission denied");
    setNotifToast(msg);
    setTimeout(() => setNotifToast(null), 2500);
  };

  const initials = user?.email ? user.email[0].toUpperCase() : null;

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* Notification toast */}
      {notifToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg z-50 whitespace-nowrap">
          {notifToast}
        </div>
      )}

      {/* iOS install guide — full bottom sheet */}
      {showIosGuide && (
        <div className="fixed inset-0 z-[100] flex items-end bg-black/50" onClick={() => setShowIosGuide(false)}>
          <div className="w-full bg-gray-900 rounded-t-3xl p-6 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-5" />
            <div className="flex items-center gap-3 mb-5">
              <img src="/icon-new.png.png" className="w-12 h-12 rounded-2xl flex-shrink-0" alt="Dealeo" />
              <div>
                <p className="text-white font-bold text-base">{lang === "es" ? "Añadir a la pantalla de inicio" : lang === "it" ? "Aggiungi alla schermata Home" : "Add to your Home Screen"}</p>
                <p className="text-gray-400 text-xs mt-0.5">{lang === "es" ? "Como una app real — sin App Store" : lang === "it" ? "Come una vera app — senza App Store" : "Works like a real app — no App Store needed"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              {[
                {
                  n: 1, icon: "⬆️",
                  title: lang === "es" ? "Toca el botón Compartir" : lang === "it" ? "Tocca Condividi" : "Tap the Share button",
                  sub: lang === "es" ? "El cuadro con flecha abajo en Safari" : lang === "it" ? "Il riquadro con freccia in basso su Safari" : "The box with an arrow at the bottom of Safari",
                },
                {
                  n: 2, icon: "＋",
                  title: lang === "es" ? '"Añadir a inicio"' : lang === "it" ? '"Aggiungi a Home"' : '"Add to Home Screen"',
                  sub: lang === "es" ? "Desplázate hacia abajo en el menú" : lang === "it" ? "Scorri in basso nel menu" : "Scroll down in the share menu to find it",
                },
                {
                  n: 3, icon: "✅",
                  title: lang === "es" ? 'Toca "Agregar" arriba a la derecha' : lang === "it" ? 'Tocca "Aggiungi" in alto a destra' : 'Tap "Add" in the top right',
                  sub: lang === "es" ? "Dealeo aparece en tu inicio al instante" : lang === "it" ? "Dealeo appare sulla Home istantaneamente" : "Dealeo appears on your home screen instantly",
                },
              ].map(s => (
                <div key={s.n} className="flex items-center gap-3 bg-gray-800 rounded-xl p-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">{s.n}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{s.title}</p>
                    <p className="text-gray-400 text-xs">{s.sub}</p>
                  </div>
                  <span className="text-xl flex-shrink-0">{s.icon}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-xs mb-4">↓ {lang === "es" ? "El botón Compartir está en la barra inferior de Safari" : lang === "it" ? "Il pulsante Condividi è nella barra in basso" : "The Share button is in the bottom toolbar of Safari"}</p>
            <button onClick={() => { setShowIosGuide(false); setShowInstall(false); localStorage.setItem("pwa-install-dismissed", "1"); }} className="w-full py-3 text-gray-500 text-sm">
              {lang === "es" ? "Quizás luego" : lang === "it" ? "Forse dopo" : "Maybe later"}
            </button>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-new.png.png" alt="Dealeo" width={28} height={28} className="rounded-lg" />
          <span className="font-black text-xl"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/deals" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
            {lang === "es" ? "Ofertas Cercanas" : "Nearby Deals"}
          </Link>
          <Link href="/deals?cat=happyHour" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
            {lang === "es" ? "Happy Hours" : "Happy Hours"}
          </Link>
          <Link href="/deals?cat=twoForOne" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
            2-for-1
          </Link>
          <Link href="/deals?cat=food" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
            {lang === "es" ? "Comida" : "Food Deals"}
          </Link>
          <Link href="/business" className="text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors">
            {lang === "es" ? "Tu local →" : "For venues →"}
          </Link>
          {lang === "es" && (
            <Link href="/es" className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">
              Inicio en español →
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Install button — shows when not yet installed */}
          {showInstall && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v13M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>
              {lang === "es" ? "Guardar en móvil" : lang === "it" ? "Salva sul telefono" : "Save to phone"}
            </button>
          )}

          {/* Language toggle */}
          <div className="flex items-center bg-gray-800 rounded-full p-0.5 text-xs font-medium">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-gray-600 text-white shadow-sm" : "text-gray-400"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "es" ? "bg-gray-600 text-white shadow-sm" : "text-gray-400"}`}
            >
              ES
            </button>
            <button
              onClick={() => setLang("it")}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "it" ? "bg-gray-600 text-white shadow-sm" : "text-gray-400"}`}
            >
              IT
            </button>
          </div>

          {/* Notification bell */}
          <button onClick={handleNotifBell} className="relative p-1.5" aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={notifStatus === "granted" ? "#22c55e" : "#374151"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifStatus === "granted" && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
            )}
          </button>

          {/* User avatar */}
          <Link href={user ? "/profile" : "/login"}>
            {initials ? (
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
                {initials}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
