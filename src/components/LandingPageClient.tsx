"use client";
import { useState } from "react";
import Link from "next/link";
import LandingFadeIn from "@/components/LandingFadeIn";

const t = {
  es: {
    navExplore: "Ver ofertas",
    navDownload: "Descargar gratis",
    heroKicker: "Alicante & Benidorm · En vivo ahora",
    h1a: "Estás pagando",
    h1b: "demasiado",
    h1c: "por esa cerveza.",
    heroSub: "Dealeo te muestra cada <strong>happy hour, 2x1 y oferta en directo</strong> en 157 bares de Alicante y Benidorm. Actualizado en tiempo real. Completamente gratis.",
    heroCta1: "Ver ofertas de hoy",
    heroCta2: "Abrir en el navegador →",
    trustFree: "Siempre gratis",
    trustNoSignup: "Sin registro",
    trustNow: "Funciona ahora mismo",
    tickerItems: [
      { label: "Happy Hour", val: "17:00–20:00" },
      { label: "2x1 en copas", val: "157 bares" },
      { label: "Ofertas en directo", val: "Ahora mismo" },
      { label: "Alicante", val: "44 locales" },
      { label: "Benidorm", val: "113 locales" },
      { label: "Siempre gratis", val: "Sin registro" },
    ],
    b1num: "01", b1title: ["AHORRA", "MÁS."],
    b1desc: "Deja de pagar precio completo por la misma copa que tu amigo consiguió 2x1 hace una hora. Conoce las ofertas antes de entrar.",
    b1items: ["Happy hours desde las 17:00", "Ofertas 2x1 en bebidas", "Ofertas flash de menos de una hora", "Menús especiales y raciones"],
    b2num: "02", b2title: ["SABE", "DÓNDE."],
    b2desc: "157 bares en dos ciudades. Filtra por barrio, tipo de oferta o lo que hay activo ahora mismo. Sin buscar en Instagram.",
    b2items: ["Bares del casco antiguo de Alicante", "Bares de la zona de Benidorm", "Vista de mapa, ordenado por distancia", "Ofertas activas resaltadas en rojo"],
    statBars: "bares y locales", statCities: "ciudades", statFree: "para usar, siempre",
    featLabel: "Cómo funciona",
    featH2: ["Hecho para los que", "beben bien."],
    feat1Title: "Ofertas en directo, ahora mismo",
    feat1Desc: "Los bares pueden activar una oferta flash para los próximos 30–60 minutos. La recibes en tiempo real — antes de que se forme la cola y se agote.",
    feat1Live: "3 ofertas activas ahora",
    feat2Title: "Tu zona, no toda España",
    feat2Desc: "Filtra por barrio. Estés en el casco antiguo de Alicante, en el Levante de Benidorm o en otro lugar — ve solo lo que tienes a pie.",
    feat3Title: "Investigado, no inventado",
    feat3Desc: "Cada oferta se ha recopilado de fuentes públicas — cartas, redes sociales, webs de bares. Los precios cambian. Si algo no cuadra, toca Reportar y sugiere el precio real. Lo actualizamos para todos.",
    feat3Community: "Actualizado por la comunidad",
    feat3Updated: "«En realidad son €6 ahora, no €5» — actualizado por un usuario, hace 2h",
    feat3Source: "Investigado de fuentes públicas · Tú puedes corregirlo",
    citiesLabel: "Dónde estamos",
    citiesH2: ["Dos ciudades.", "Cero excusas."],
    city1Chip: "Ciudad sofisticada",
    city1Desc: "Vermutería del casco antiguo, bares de cócteles junto al puerto, terrazas en azotea. Los locales comen a las 14:00 y salen hasta tarde. Ahora ya sabes dónde.",
    city1Meta: "44 locales · El Barrio, Casco Antiguo, Centro, Puerto, Explanada",
    city2Chip: "Zona de vacaciones",
    city2Desc: "Pubs británicos, bares en la playa, bares de chupitos y espectáculos. Cada noche alguien tiene un happy hour. Encuentra el que vale la pena.",
    city2Meta: "113 locales · Zona Levante, Rincón de Loix, Casco Antiguo, Poniente",
    trustLabel: "✓ Honesto",
    trustH2: "SIN B.S.",
    trustDesc: "Ganamos dinero con viajes, no con bares. Sin motivo para ocultar una buena oferta — ni para promocionar una mala.",
    ti1Title: "Ganamos con viajes, no con bares",
    ti1Desc: "Dealeo gana comisiones de afiliado cuando reservas un hotel o compras una eSIM de viaje. Los bares no nos pagan para aparecer más arriba.",
    ti2Title: "Ofertas investigadas, no inventadas",
    ti2Desc: "Recopiladas de cartas, redes sociales y webs de bares. Los precios cambian — si algo está mal, sugiere el precio real y lo actualizamos para todos.",
    ti3Title: "Gratis para los usuarios, siempre",
    ti3Desc: "Sin suscripción, sin versión premium, sin «desbloquea más ofertas». Todo visible para todos, gratis. Eso no va a cambiar.",
    revLabel: "Qué dice la gente.",
    revNoBribe: "SIN SOBORNOS.",
    revAside: "Reseñas reales de usuarios reales. No las pagamos ni podemos borrarlas.",
    reviews: [
      { stars: "★★★★★", text: "«Por fin encontré el happy hour del Bar Manero que pasé tres días ignorando. Ahorré €8 en gin tonics.»", author: "— James T., Alicante" },
      { stars: "★★★★★", text: "«Benidorm sin gastar un pastón funciona de verdad. Abrí Dealeo a las 18:00, tenía una pinta por €2 a las 18:05.»", author: "— Sarah M., Benidorm" },
      { stars: "★★★★☆", text: "«Una oferta tenía el precio mal, lo reporté y al día siguiente estaba corregido. Me gusta que sea honesto sobre ser community-sourced.»", author: "— Mikael J., Alicante" },
    ],
    barsLabel: "Para dueños de locales",
    barsH2: ["Tus ofertas.", "Sus móviles."],
    barsSteps: [
      { n: "1", title: "Reclama tu local", desc: "Tu bar probablemente ya está en Dealeo. Reclámate en 2 minutos — sin comisión, sin contrato." },
      { n: "2", title: "Añade tus ofertas", desc: "Inicia sesión y añade lo que tienes esta noche. Happy hour, 2x1, oferta flash — tú decides." },
      { n: "3", title: "Llegan los clientes", desc: "La gente cercana ve tu oferta en directo. Vienen. No nos pagas nada por ello." },
    ],
    barsCta: "Añade tu local gratis →",
    barsNote: "Tú controlas lo que aparece aquí. Nosotros nos aseguramos de que llegue a quien le interesa.",
    ctaH2: "Deja de pagar precio completo.",
    ctaSub: "El happy hour empezó hace 20 minutos.",
    ctaBtn1: "Descargar gratis en Android",
    ctaBtn2: "Abrir en el navegador →",
    ctaNote: "Gratis siempre · Sin cuenta · Funciona ahora mismo",
    footerCopy: "© 2025 Dealeo · Alicante & Benidorm",
    footerApp: "App",
    footerBars: "Para bares",
    footerAbout: "Quiénes somos",
  },
  en: {
    navExplore: "Explore deals",
    navDownload: "Download free",
    heroKicker: "Alicante & Benidorm · Live now",
    h1a: "You're paying",
    h1b: "too much",
    h1c: "for that beer.",
    heroSub: "Dealeo shows you every <strong>happy hour, 2-for-1 and live deal</strong> at 157 bars in Alicante and Benidorm. Updated in real time. Completely free.",
    heroCta1: "Find tonight's deals",
    heroCta2: "Open in browser →",
    trustFree: "Free forever",
    trustNoSignup: "No sign-up",
    trustNow: "Works right now",
    tickerItems: [
      { label: "Happy Hour", val: "17:00–20:00" },
      { label: "2-for-1 Drinks", val: "157 bars" },
      { label: "Live Deals", val: "Right now" },
      { label: "Alicante", val: "44 venues" },
      { label: "Benidorm", val: "113 venues" },
      { label: "Free forever", val: "No sign-up" },
    ],
    b1num: "01", b1title: ["SPEND", "LESS."],
    b1desc: "Stop paying full price for the same beer your mate got 2-for-1 an hour ago. Know the deals before you walk in.",
    b1items: ["Happy hours from 17:00", "2-for-1 drink deals", "Flash deals under an hour", "Food specials and set menus"],
    b2num: "02", b2title: ["KNOW", "WHERE."],
    b2desc: "157 bars across two cities. Filter by neighbourhood, deal type, or what's live right now. No scrolling through Instagram.",
    b2items: ["Alicante old town bars", "Benidorm strip venues", "Map view, sorted by distance", "Live deals highlighted in red"],
    statBars: "bars & venues listed", statCities: "cities covered", statFree: "to use, forever",
    featLabel: "How it works",
    featH2: ["Built for people", "who drink well."],
    feat1Title: "Live deals, right now",
    feat1Desc: "Bars can activate a flash deal for the next 30–60 minutes. You get it in real time — before the queue forms and before it sells out.",
    feat1Live: "3 deals live now",
    feat2Title: "Your area, not all of Spain",
    feat2Desc: "Filter by neighbourhood. Whether you're in Alicante's old town, on Benidorm's Levante strip, or somewhere in between — see only what's walking distance.",
    feat3Title: "Researched, not invented",
    feat3Desc: "Every deal was gathered from public sources — menus, social posts, bar websites. Prices change. If something's off, tap Report and suggest the real price. We update it for everyone.",
    feat3Community: "Community updated",
    feat3Updated: "\"Actually it's €6 now, not €5\" — updated by a user, 2h ago",
    feat3Source: "Researched from public sources · You can fix it",
    citiesLabel: "Where we are",
    citiesH2: ["Two cities.", "Zero excuses."],
    city1Chip: "Sophisticated city",
    city1Desc: "Old town vermuterías, port-side cocktail bars, rooftop terraces. Locals eat at 14:00 and drink until late. Now you know where.",
    city1Meta: "44 venues · El Barrio, Casco Antiguo, Centro, Puerto, Explanada",
    city2Chip: "Holiday strip",
    city2Desc: "British pubs, beachfront bars, shot bars and showbars. Every night somebody's running a happy hour. Find the one worth going to.",
    city2Meta: "113 venues · Levante Strip, Rincon de Loix, Old Town, Poniente",
    trustLabel: "✓ Honest",
    trustH2: "NO B.S.",
    trustDesc: "We make money from travel, not from bars. That means no reason to hide a great deal — or promote a bad one.",
    ti1Title: "We make money from travel, not bars",
    ti1Desc: "Dealeo earns affiliate commission when you book a hotel or buy a travel eSIM. Bars don't pay us to rank higher.",
    ti2Title: "Deals are researched, not invented",
    ti2Desc: "Gathered from menus, social posts, bar websites. Prices change — if something's wrong, suggest the real price and we'll update it for everyone.",
    ti3Title: "Free for users, always",
    ti3Desc: "No subscription, no premium tier, no \"unlock more deals.\" Everything is visible to everyone, for free. That won't change.",
    revLabel: "What people say.",
    revNoBribe: "NOT BRIBED.",
    revAside: "Real reviews from real users. We don't pay for them and we can't delete them.",
    reviews: [
      { stars: "★★★★★", text: "\"Finally found the happy hour at Bar Manero I walked past for three days. Saved €8 on gin tonics.\"", author: "— James T., Alicante" },
      { stars: "★★★★★", text: "\"Benidorm strip on a budget actually works. Pulled up Dealeo at 18:00, had a €2 pint by 18:05.\"", author: "— Sarah M., Benidorm" },
      { stars: "★★★★☆", text: "\"One deal was wrong price, reported it, got fixed next day. Like that it's honest about being community-sourced.\"", author: "— Mikael J., Alicante" },
    ],
    barsLabel: "For venue owners",
    barsH2: ["Your deals.", "Their phones."],
    barsSteps: [
      { n: "1", title: "Claim your listing", desc: "Your bar is probably already on Dealeo. Claim it in 2 minutes — no setup fee, no contract." },
      { n: "2", title: "Add your deals", desc: "Log in and add whatever you're running tonight. Happy hour, 2-for-1, flash deal — your call." },
      { n: "3", title: "Customers walk in", desc: "People nearby see your deal live. They show up. You don't pay us for the lead." },
    ],
    barsCta: "List your venue free →",
    barsNote: "You control what's on here. We just make sure the right people see it.",
    ctaH2: "Stop paying full price.",
    ctaSub: "The happy hour started 20 minutes ago.",
    ctaBtn1: "Download free on Android",
    ctaBtn2: "Open in browser →",
    ctaNote: "Free forever · No account needed · Works right now",
    footerCopy: "© 2025 Dealeo · Alicante & Benidorm",
    footerApp: "App",
    footerBars: "For bars",
    footerAbout: "About",
  },
} as const;

type Lang = "es" | "en";

export default function LandingPageClient() {
  const [lang, setLang] = useState<Lang>("es");
  const c = t[lang];
  const other: Lang = lang === "es" ? "en" : "es";

  const tickerDouble = [...c.tickerItems, ...c.tickerItems];

  return (
    <>
      <style>{`
:root {
  --bg:#0b0d12; --s1:#111318; --s2:#181b24; --s3:#1e2230;
  --fg:#efefef; --fg-2:#9496a3; --fg-3:#55586a;
  --orange:#f97316; --teal:#0d9488; --amber:#f59e0b;
  --border:#20242f; --green:#4ade80;
  --fd:var(--font-barlow-condensed),system-ui,sans-serif;
  --fb:var(--font-dm-sans),system-ui,sans-serif;
  color-scheme:dark;
}
@media(prefers-color-scheme:light){
  :root:not([data-theme="dark"]){
    --bg:#f7f7f9;--s1:#eeeef3;--s2:#e4e5ed;--s3:#d8dae6;
    --fg:#0b0d12;--fg-2:#50536a;--fg-3:#9496a3;--border:#d0d3e2;
    color-scheme:light;
  }
}
:root[data-theme="light"]{
  --bg:#f7f7f9;--s1:#eeeef3;--s2:#e4e5ed;--s3:#d8dae6;
  --fg:#0b0d12;--fg-2:#50536a;--fg-3:#9496a3;--border:#d0d3e2;
  color-scheme:light;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--fg);font-family:var(--fb);font-size:16px;line-height:1.6;overflow-x:hidden}
a{color:inherit;text-decoration:none}
img{max-width:100%}
.lp-wrap{max-width:1080px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.lp-btn{display:inline-flex;align-items:center;gap:7px;font-family:var(--fb);font-weight:600;font-size:.9rem;border:none;border-radius:100px;padding:12px 24px;cursor:pointer;transition:opacity .15s,transform .15s;white-space:nowrap;text-decoration:none}
.lp-btn:hover{opacity:.85;transform:translateY(-1px)}
.lp-btn-orange{background:var(--orange);color:#fff}
.lp-btn-outline{background:transparent;color:var(--fg-2);border:1.5px solid var(--border)}
.lp-btn-lg{font-size:1rem;padding:15px 30px}
.lp-lang-toggle{background:transparent;border:1.5px solid var(--border);color:var(--fg-3);border-radius:100px;padding:6px 14px;font-size:.75rem;font-weight:700;cursor:pointer;letter-spacing:.05em;transition:color .15s,border-color .15s}
.lp-lang-toggle:hover{color:var(--fg);border-color:var(--fg-3)}
/* NAV */
.lp-nav{position:sticky;top:0;z-index:200;background:rgba(11,13,18,.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding-block:14px;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.lp-nav-inner{max-width:1080px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
.lp-logo{font-family:var(--fd);font-weight:900;font-size:1.6rem;letter-spacing:-.01em;color:var(--orange);display:flex;align-items:center;gap:9px}
.lp-logo em{font-style:normal;color:var(--teal)}
.lp-nav-r{display:flex;align-items:center;gap:10px}
/* HERO */
.lp-hero{padding-block:90px 60px;position:relative;overflow:hidden}
.lp-hero-glow{position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:800px;height:600px;background:radial-gradient(ellipse at top,rgba(249,115,22,.13) 0%,transparent 65%);pointer-events:none}
.lp-hero-grid{display:grid;grid-template-columns:1fr 420px;align-items:center;gap:64px}
.lp-hero-kicker{display:inline-flex;align-items:center;gap:8px;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:22px}
.lp-hero-kicker::before{content:"";width:20px;height:2px;background:var(--orange);border-radius:2px}
.lp-h1{font-family:var(--fd);font-weight:900;font-size:clamp(3rem,6.5vw,5rem);line-height:.97;letter-spacing:-.02em;text-wrap:balance;margin-bottom:26px}
.lp-h1 .hi{color:var(--orange)}
.lp-h1 .lo{color:var(--fg-2)}
.lp-hero-sub{font-size:1.1rem;color:var(--fg-2);max-width:44ch;line-height:1.7;margin-bottom:36px}
.lp-hero-sub strong{color:var(--fg);font-weight:600}
.lp-hero-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:28px}
.lp-hero-trust{display:flex;flex-wrap:wrap;gap:18px}
.lp-trust-item{display:flex;align-items:center;gap:6px;font-size:.78rem;color:var(--fg-3)}
.lp-trust-item::before{content:"✓";color:var(--orange);font-weight:700;font-size:.85rem}
/* PHONE — always dark regardless of OS theme */
.lp-phone-outer{position:relative;display:flex;justify-content:center}
.lp-phone-glow{position:absolute;inset:-30px;border-radius:60px;background:radial-gradient(circle,rgba(249,115,22,.18) 0%,transparent 70%);pointer-events:none}
.lp-phone{width:260px;border-radius:40px;border:2px solid #20242f;background:#111318;overflow:hidden;box-shadow:0 50px 100px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.06),inset 0 1px 0 rgba(255,255,255,.04);position:relative;z-index:1;color-scheme:dark}
.lp-pill-wrap{height:30px;background:#111318;display:flex;justify-content:center;align-items:flex-start;padding-top:7px}
.lp-pill{width:64px;height:10px;background:#0b0d12;border-radius:10px}
.lp-p-top{padding:8px 14px 6px;display:flex;justify-content:space-between;align-items:center}
.lp-p-top-title{font-family:var(--fd);font-weight:800;font-size:.95rem;letter-spacing:-.01em;color:#efefef}
.lp-live-dot{display:flex;align-items:center;gap:5px;background:#ef4444;color:#fff;font-size:.58rem;font-weight:700;letter-spacing:.05em;padding:3px 8px;border-radius:20px}
.lp-live-dot::before{content:"";width:5px;height:5px;border-radius:50%;background:#fff;animation:lp-blink 1.3s infinite}
@keyframes lp-blink{0%,100%{opacity:1}50%{opacity:.3}}
.lp-p-tabs{display:flex;border-bottom:1px solid #20242f;padding:0 14px;margin-bottom:8px}
.lp-p-tab{font-size:.62rem;font-weight:600;padding:5px 10px;color:#55586a;border-bottom:2px solid transparent;cursor:default}
.lp-p-tab.on{color:#f97316;border-bottom-color:#f97316}
.lp-dc{margin:4px 12px 8px;background:#181b24;border-radius:16px;border:1px solid #20242f;overflow:hidden}
.lp-dc-img{height:86px;background:linear-gradient(135deg,#1a2035 0%,#0d1120 100%);display:flex;align-items:center;justify-content:center;font-size:2.4rem;position:relative}
.lp-dc-tag{position:absolute;top:7px;left:8px;background:#f97316;color:#fff;font-size:.56rem;font-weight:700;letter-spacing:.05em;padding:3px 8px;border-radius:20px;text-transform:uppercase}
.lp-dc-body{padding:9px 12px 12px}
.lp-dc-name{font-family:var(--fd);font-weight:700;font-size:.85rem;letter-spacing:-.01em;color:#efefef;margin-bottom:2px}
.lp-dc-venue{font-size:.62rem;color:#9496a3;margin-bottom:6px}
.lp-dc-status{font-size:.6rem;font-weight:600;display:flex;align-items:center;gap:4px}
.lp-dc-status.live{color:#4ade80}
.lp-dc-status.live::before{content:"";width:5px;height:5px;border-radius:50%;background:#4ade80;animation:lp-blink 1.3s infinite}
.lp-dc-status.soon{color:#f59e0b}
.lp-dc-sm{margin:0 12px 8px;background:#181b24;border:1px solid #20242f;border-radius:12px;padding:9px 11px;display:flex;gap:9px;align-items:center}
.lp-dc-sm-icon{width:36px;height:36px;border-radius:9px;background:rgba(249,115,22,.12);display:grid;place-items:center;font-size:1.2rem;flex-shrink:0}
.lp-dc-badge{display:inline-block;margin-top:3px;background:rgba(249,115,22,.12);color:#f97316;font-size:.52rem;font-weight:700;letter-spacing:.05em;padding:2px 6px;border-radius:20px;text-transform:uppercase}
/* TICKER */
.lp-ticker{border-block:1px solid var(--border);background:var(--s1);padding-block:12px;overflow:hidden}
.lp-t-track{display:flex;white-space:nowrap;animation:lp-tick 24s linear infinite;width:max-content}
.lp-t-track:hover{animation-play-state:paused}
@keyframes lp-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.lp-t-item{display:inline-flex;align-items:center;gap:10px;padding:0 24px;font-size:.74rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--fg-3)}
.lp-t-item b{color:var(--orange);font-weight:700}
/* BUCKETS */
.lp-buckets{padding-block:80px;background:var(--s1);border-bottom:1px solid var(--border)}
.lp-bucket-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:24px;overflow:hidden;border:1px solid var(--border)}
.lp-bucket{background:var(--bg);padding:48px 40px;position:relative;overflow:hidden}
.lp-bucket::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 80%,rgba(249,115,22,.07) 0%,transparent 60%);pointer-events:none}
.lp-bucket-num{font-family:var(--fd);font-weight:900;font-size:clamp(3.5rem,7vw,6rem);line-height:1;letter-spacing:-.03em;color:var(--orange);opacity:.18;margin-bottom:-20px}
.lp-bucket-title{font-family:var(--fd);font-weight:900;font-size:clamp(2rem,4vw,3rem);line-height:1;letter-spacing:-.02em;color:var(--fg);margin-bottom:18px;position:relative}
.lp-bucket-title em{font-style:normal;color:var(--orange)}
.lp-bucket p{font-size:.95rem;color:var(--fg-2);line-height:1.7;margin-bottom:20px;max-width:36ch}
.lp-bucket-items{display:flex;flex-direction:column;gap:8px}
.lp-bucket-item{display:flex;align-items:center;gap:8px;font-size:.85rem;color:var(--fg-2)}
.lp-bucket-item::before{content:"→";color:var(--orange);font-weight:700;flex-shrink:0}
/* STATS */
.lp-stats{padding-block:70px}
.lp-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:20px;overflow:hidden}
.lp-stat{background:var(--s1);padding:40px 32px;text-align:center}
.lp-stat-n{font-family:var(--fd);font-weight:900;font-size:clamp(2.8rem,6vw,4rem);letter-spacing:-.04em;line-height:1;color:var(--fg);margin-bottom:6px}
.lp-stat-n em{font-style:normal;color:var(--orange)}
.lp-stat-l{font-size:.82rem;color:var(--fg-2)}
/* FEATURES */
.lp-features{padding-block:20px 80px}
.lp-feat-label{font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--orange);margin-bottom:14px}
.lp-h2{font-family:var(--fd);font-weight:900;font-size:clamp(2rem,4.5vw,3.2rem);letter-spacing:-.02em;line-height:1.05;text-wrap:balance;margin-bottom:56px}
.lp-feat-block{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--border);border-radius:24px;overflow:hidden;margin-bottom:16px}
.lp-feat-block.flip .lp-feat-text{order:2}
.lp-feat-block.flip .lp-feat-visual{order:1}
.lp-feat-text{padding:48px 44px;display:flex;flex-direction:column;justify-content:center}
.lp-feat-icon{width:52px;height:52px;border-radius:14px;background:rgba(249,115,22,.1);display:grid;place-items:center;font-size:1.6rem;margin-bottom:22px}
.lp-feat-text h3{font-family:var(--fd);font-weight:800;font-size:1.6rem;letter-spacing:-.02em;line-height:1.1;margin-bottom:14px}
.lp-feat-text p{font-size:.93rem;color:var(--fg-2);line-height:1.7;max-width:38ch}
.lp-feat-visual{background:var(--s1);border-left:1px solid var(--border);display:flex;align-items:center;justify-content:center;min-height:260px;padding:32px;position:relative;overflow:hidden}
.lp-feat-block.flip .lp-feat-visual{border-left:none;border-right:1px solid var(--border)}
.lp-fvc{background:var(--s2);border:1px solid var(--border);border-radius:16px;padding:20px;width:100%;max-width:240px}
.lp-fvc-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.lp-fvc-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.lp-fvc-bar{height:8px;border-radius:4px;background:var(--s3);flex:1}
.lp-fvc-bar-fill{height:100%;border-radius:4px;background:var(--orange)}
.lp-fvc-label{font-size:.65rem;color:var(--fg-2);min-width:60px;text-align:right}
.lp-map-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%}
.lp-map-dot{aspect-ratio:1;border-radius:6px;background:var(--s3);display:grid;place-items:center;font-size:.9rem}
.lp-map-dot.on{background:rgba(249,115,22,.15)}
.lp-map-dot.live{background:rgba(74,222,128,.12)}
/* CITIES */
.lp-cities{padding-block:80px;background:var(--s1);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.lp-city-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.lp-city-card{border-radius:22px;border:1px solid var(--border);padding:44px 38px;background:var(--bg);transition:border-color .2s;position:relative;overflow:hidden}
.lp-city-card:hover{border-color:rgba(249,115,22,.4)}
.lp-city-emoji{font-size:5rem;position:absolute;bottom:-10px;right:16px;opacity:.1;pointer-events:none;line-height:1}
.lp-city-chip{display:inline-block;background:rgba(249,115,22,.1);color:var(--orange);font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:18px}
.lp-city-card h3{font-family:var(--fd);font-weight:900;font-size:2.2rem;letter-spacing:-.03em;margin-bottom:12px;line-height:1}
.lp-city-card p{font-size:.9rem;color:var(--fg-2);line-height:1.65;max-width:30ch;margin-bottom:24px}
.lp-city-meta{font-size:.78rem;color:var(--fg-3);font-weight:500}
.lp-city-meta strong{color:var(--fg);font-weight:600}
/* TRUST */
.lp-trust{padding-block:80px}
.lp-trust-inner{background:var(--s1);border:1px solid var(--border);border-radius:24px;padding:56px 52px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.lp-trust-label{display:inline-flex;align-items:center;gap:8px;background:rgba(74,222,128,.08);color:var(--green);font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:5px 12px;border-radius:20px;margin-bottom:22px;border:1px solid rgba(74,222,128,.15)}
.lp-trust-items{display:flex;flex-direction:column;gap:20px}
.lp-trust-item-b{display:flex;gap:14px;align-items:flex-start}
.lp-t-icon{width:44px;height:44px;border-radius:12px;background:rgba(249,115,22,.08);display:grid;place-items:center;font-size:1.3rem;flex-shrink:0;border:1px solid rgba(249,115,22,.12)}
.lp-t-content h4{font-family:var(--fd);font-weight:700;font-size:1rem;letter-spacing:-.01em;margin-bottom:4px}
.lp-t-content p{font-size:.85rem;color:var(--fg-2);line-height:1.6}
/* REVIEWS */
.lp-reviews{padding-block:80px;background:var(--s1);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.lp-reviews-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:16px}
.lp-reviews-aside{font-size:.8rem;color:var(--fg-3);font-style:italic;max-width:28ch;text-align:right}
.lp-review-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.lp-review-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:26px 22px}
.lp-review-stars{color:var(--amber);font-size:.85rem;letter-spacing:2px;margin-bottom:14px}
.lp-review-text{font-size:.9rem;color:var(--fg);line-height:1.65;margin-bottom:16px;font-style:italic}
.lp-review-author{font-size:.75rem;color:var(--fg-3);font-weight:600}
/* FOR BARS */
.lp-for-bars{padding-block:90px;border-top:1px solid var(--border)}
.lp-for-bars-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.lp-fbs-steps{display:flex;flex-direction:column;gap:16px;margin-bottom:8px}
.lp-fbs-item{display:flex;gap:14px;align-items:flex-start}
.lp-fbs-num{width:32px;height:32px;border-radius:10px;background:rgba(13,148,136,.12);color:var(--teal);font-family:var(--fd);font-weight:900;font-size:1rem;display:grid;place-items:center;flex-shrink:0;border:1px solid rgba(13,148,136,.2)}
.lp-fbs-item strong{font-size:.88rem;font-weight:700;display:block;margin-bottom:3px}
.lp-fbs-item p{font-size:.8rem;color:var(--fg-2);line-height:1.5;margin:0}
.lp-fbv-card{background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:300px}
.lp-fbv-stat-row{display:flex;border:1px solid var(--border);border-radius:12px;overflow:hidden}
.lp-fbv-stat{flex:1;text-align:center;padding:10px 8px;border-right:1px solid var(--border);font-size:.68rem;color:var(--fg-3);display:flex;flex-direction:column;gap:3px}
.lp-fbv-stat:last-child{border-right:none}
.lp-fbv-stat-n{font-family:var(--fd);font-weight:900;font-size:1.3rem;color:var(--fg);line-height:1}
/* CTA */
.lp-cta{padding-block:110px;text-align:center;position:relative;overflow:hidden}
.lp-cta::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(249,115,22,.12) 0%,transparent 60%);pointer-events:none}
.lp-cta-sub{font-family:var(--fd);font-weight:700;font-size:clamp(1.4rem,3vw,2rem);color:var(--fg-2);letter-spacing:-.01em;margin-bottom:40px}
.lp-cta-btns{display:flex;justify-content:center;flex-wrap:wrap;gap:14px;margin-bottom:20px}
.lp-cta-note{font-size:.8rem;color:var(--fg-3)}
/* FOOTER */
.lp-footer{border-top:1px solid var(--border);padding-block:28px;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px));padding-bottom:max(20px,env(safe-area-inset-bottom,0px))}
.lp-footer-inner{max-width:1080px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px}
.lp-footer-copy{font-size:.78rem;color:var(--fg-3)}
.lp-footer-links{display:flex;gap:20px}
.lp-footer-links a{font-size:.78rem;color:var(--fg-3);transition:color .15s}
.lp-footer-links a:hover{color:var(--fg)}
/* FADE UP */
.lp-fade{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}
.lp-fade.visible{opacity:1;transform:translateY(0)}
.lp-fade.d1{transition-delay:.08s}
.lp-fade.d2{transition-delay:.16s}
.lp-fade.d3{transition-delay:.24s}
@media(prefers-reduced-motion:reduce){
  .lp-t-track,.lp-live-dot::before,.lp-dc-status.live::before{animation:none}
  .lp-fade{opacity:1;transform:none;transition:none}
}
/* RESPONSIVE */
@media(max-width:800px){
  .lp-hero-grid{grid-template-columns:1fr;gap:44px;text-align:center}
  .lp-hero-kicker{justify-content:center}
  .lp-hero-sub{margin-inline:auto}
  .lp-hero-actions{justify-content:center}
  .lp-hero-trust{justify-content:center}
  .lp-phone-outer{order:-1}
  .lp-bucket-grid{grid-template-columns:1fr}
  .lp-stats-grid{grid-template-columns:1fr}
  .lp-feat-block{grid-template-columns:1fr}
  .lp-feat-visual{display:none}
  .lp-feat-block.flip .lp-feat-text,.lp-feat-block.flip .lp-feat-visual{order:unset}
  .lp-city-grid{grid-template-columns:1fr}
  .lp-review-grid{grid-template-columns:1fr}
  .lp-trust-inner{grid-template-columns:1fr;gap:36px;padding:36px 28px}
  .lp-reviews-aside{text-align:left}
  .lp-for-bars-inner{grid-template-columns:1fr;gap:44px}
  .lp-footer-inner{flex-direction:column;align-items:flex-start}
}
@media(max-width:480px){
  .lp-h1{font-size:2.6rem}
  .lp-h2{font-size:1.75rem}
  .lp-phone{width:220px}
  .lp-bucket{padding:32px 24px}
}
      `}</style>

      {/* NAV */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="lp-logo">
            <span>Deal<em>eo</em></span>
          </Link>
          <div className="lp-nav-r">
            <button className="lp-lang-toggle" onClick={() => setLang(other)}>
              {other.toUpperCase()}
            </button>
            <Link href="/deals" className="lp-btn lp-btn-outline">{c.navExplore}</Link>
            <a href="https://play.google.com/store/apps/details?id=es.dealeo.app" className="lp-btn lp-btn-orange">{c.navDownload}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-glow" />
        <div className="lp-wrap">
          <div className="lp-hero-grid">
            <div>
              <div className="lp-hero-kicker">{c.heroKicker}</div>
              <h1 className="lp-h1">
                {c.h1a}<br />
                <span className="hi">{c.h1b}</span><br />
                <span className="lo">{c.h1c}</span>
              </h1>
              <p className="lp-hero-sub" dangerouslySetInnerHTML={{ __html: c.heroSub }} />
              <div className="lp-hero-actions">
                <a href="https://play.google.com/store/apps/details?id=es.dealeo.app" className="lp-btn lp-btn-orange lp-btn-lg">{c.heroCta1}</a>
                <Link href="/deals" className="lp-btn lp-btn-outline lp-btn-lg">{c.heroCta2}</Link>
              </div>
              <div className="lp-hero-trust">
                <span className="lp-trust-item">{c.trustFree}</span>
                <span className="lp-trust-item">{c.trustNoSignup}</span>
                <span className="lp-trust-item">{c.trustNow}</span>
              </div>
            </div>
            <div className="lp-phone-outer">
              <div className="lp-phone-glow" />
              <div className="lp-phone">
                {/* notch */}
                <div className="lp-pill-wrap"><div className="lp-pill" /></div>

                {/* status bar */}
                <div style={{padding:'0 16px 6px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:'.45rem',color:'#6b7280',fontWeight:600}}>9:41</span>
                  <div style={{display:'flex',gap:3,alignItems:'center'}}>
                    <svg width="9" height="6" viewBox="0 0 9 6"><rect x="0" y="2" width="2" height="4" rx=".5" fill="#6b7280"/><rect x="2.5" y="1.5" width="2" height="4.5" rx=".5" fill="#6b7280"/><rect x="5" y=".5" width="2" height="5.5" rx=".5" fill="#6b7280"/><rect x="7.5" y="0" width="1.5" height="6" rx=".5" fill="#9ca3af"/></svg>
                    <svg width="7" height="6" viewBox="0 0 7 6"><path d="M3.5 1C2.1 1 .9 1.6 0 2.5l1 1C1.6 2.8 2.5 2.4 3.5 2.4s1.9.4 2.5 1.1l1-1C6.1 1.6 4.9 1 3.5 1z" fill="#6b7280"/><path d="M3.5 3.2c-.6 0-1.1.3-1.4.7l1 1c.1-.1.3-.2.4-.2s.3.1.4.2l1-1c-.3-.4-.8-.7-1.4-.7z" fill="#9ca3af"/><circle cx="3.5" cy="5.3" r=".7" fill="#fff"/></svg>
                    <svg width="11" height="6" viewBox="0 0 11 6"><rect x=".5" y=".5" width="9" height="5" rx="1.5" stroke="#6b7280" strokeWidth=".8" fill="none"/><rect x="10" y="2" width=".8" height="2" rx=".4" fill="#6b7280"/><rect x="1.5" y="1.5" width="6" height="3" rx=".8" fill="#4ade80"/></svg>
                  </div>
                </div>

                {/* app header */}
                <div style={{padding:'2px 14px 10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontFamily:'var(--fd)',fontWeight:900,fontSize:'1.15rem',letterSpacing:'-.02em'}}>
                    <span style={{color:'#f97316'}}>Deal</span><span style={{color:'#0d9488'}}>eo</span>
                  </span>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{display:'flex',alignItems:'center',gap:3,background:'rgba(239,68,68,.15)',border:'1px solid rgba(239,68,68,.3)',color:'#f87171',fontSize:'.42rem',fontWeight:700,padding:'2px 7px',borderRadius:20,letterSpacing:'.06em'}}>
                      <span style={{width:4,height:4,borderRadius:'50%',background:'#ef4444',display:'inline-block',boxShadow:'0 0 4px #ef4444'}} />
                      LIVE
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </div>
                </div>

                {/* category pills */}
                <div style={{display:'flex',gap:5,padding:'0 12px 10px',overflowX:'hidden'}}>
                  {(lang==="es"
                    ? ['Todas','En Vivo','2x1','Happy Hour','Bebidas']
                    : ['All','Live','2-for-1','Happy Hour','Drinks']
                  ).map((label,i) => (
                    <span key={i} style={{
                      flexShrink:0,
                      background: i===0 ? '#0d9488' : i===1 ? 'rgba(239,68,68,.15)' : '#1a1d2a',
                      color: i===0 ? '#fff' : i===1 ? '#f87171' : '#8b8fa8',
                      border: i===1 ? '1px solid rgba(239,68,68,.3)' : '1px solid transparent',
                      fontSize:'.44rem',fontWeight:700,padding:'4px 9px',borderRadius:20,whiteSpace:'nowrap'
                    }}>{i===1 ? '● ' : ''}{label}</span>
                  ))}
                </div>

                {/* card 1 */}
                <div style={{margin:'0 10px 7px',borderRadius:14,overflow:'hidden',display:'flex',background:'#161923',border:'1px solid #23273a'}}>
                  <div style={{width:70,flexShrink:0,position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#0d4f3c 0%,#052b1f 50%,#091a14 100%)'}}>
                      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <svg width="28" height="36" viewBox="0 0 28 36" fill="none"><path d="M4 2h20l-7 14v14h4v4H7v-4h4V16L4 2z" fill="rgba(13,212,168,.25)" stroke="rgba(13,212,168,.7)" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="9" cy="9" r="1.5" fill="rgba(13,212,168,.6)"/><path d="M14 16v6" stroke="rgba(13,212,168,.4)" strokeWidth="1"/></svg>
                      </div>
                      <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,transparent 55%,#161923)'}} />
                    </div>
                  </div>
                  <div style={{padding:'9px 10px 8px',flex:1,minWidth:0}}>
                    <div style={{display:'flex',gap:4,marginBottom:5,flexWrap:'wrap'}}>
                      <span style={{background:'#0d9488',color:'#fff',fontSize:'.4rem',fontWeight:800,padding:'2px 6px',borderRadius:20,letterSpacing:'.02em'}}>2×1</span>
                      <span style={{background:'rgba(74,222,128,.1)',color:'#4ade80',fontSize:'.4rem',fontWeight:700,padding:'2px 6px',borderRadius:20,border:'1px solid rgba(74,222,128,.2)'}}>✓ {lang==="es"?"Del local":"Verified"}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:'.68rem',color:'#f0f1f5',marginBottom:2,lineHeight:1.3}}>{lang==="es"?"2 cócteles por €14":"2 cocktails for €14"}</div>
                    <div style={{fontSize:'.5rem',color:'#6b7280',marginBottom:6}}>The Whisper Co · Centro</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{display:'flex',alignItems:'center',gap:3,fontSize:'.44rem',color:'#4ade80',fontWeight:600}}>
                        <span style={{width:4,height:4,borderRadius:'50%',background:'#4ade80',display:'inline-block',boxShadow:'0 0 5px #4ade80'}} />
                        {lang==="es"?"En vivo · 22:00":"Live · ends 22:00"}
                      </span>
                      <span style={{background:'linear-gradient(135deg,#f97316,#ea580c)',color:'#fff',fontSize:'.44rem',fontWeight:700,padding:'3px 9px',borderRadius:20,boxShadow:'0 2px 8px rgba(249,115,22,.35)'}}>{lang==="es"?"Explorar":"Explore"}</span>
                    </div>
                  </div>
                </div>

                {/* card 2 */}
                <div style={{margin:'0 10px 7px',borderRadius:14,overflow:'hidden',display:'flex',background:'#161923',border:'1px solid #23273a'}}>
                  <div style={{width:70,flexShrink:0,position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#3b1f06 0%,#1e0f03 100%)'}}>
                      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <svg width="26" height="36" viewBox="0 0 26 36" fill="none"><rect x="5" y="2" width="16" height="22" rx="3" fill="rgba(251,191,36,.2)" stroke="rgba(251,191,36,.6)" strokeWidth="1.5"/><rect x="8" y="5" width="4" height="8" rx="1" fill="rgba(251,191,36,.3)"/><rect x="5" y="18" width="16" height="6" rx="0" fill="rgba(251,191,36,.25)"/><rect x="8" y="24" width="10" height="8" rx="1" fill="rgba(251,191,36,.15)" stroke="rgba(251,191,36,.4)" strokeWidth="1"/><path d="M21 8h3v6h-3" stroke="rgba(251,191,36,.5)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                      </div>
                      <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,transparent 55%,#161923)'}} />
                    </div>
                  </div>
                  <div style={{padding:'9px 10px 8px',flex:1,minWidth:0}}>
                    <div style={{display:'flex',gap:4,marginBottom:5}}>
                      <span style={{background:'rgba(245,158,11,.15)',color:'#fbbf24',fontSize:'.4rem',fontWeight:800,padding:'2px 6px',borderRadius:20,border:'1px solid rgba(245,158,11,.25)',letterSpacing:'.02em'}}>Happy Hour</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:'.68rem',color:'#f0f1f5',marginBottom:2,lineHeight:1.3}}>Cañas €1.50</div>
                    <div style={{fontSize:'.5rem',color:'#6b7280',marginBottom:6}}>Bar Manero · Centro</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{fontSize:'.44rem',color:'#fbbf24',fontWeight:600}}>⏰ 17:00 – 20:00</span>
                      <span style={{background:'linear-gradient(135deg,#f97316,#ea580c)',color:'#fff',fontSize:'.44rem',fontWeight:700,padding:'3px 9px',borderRadius:20,boxShadow:'0 2px 8px rgba(249,115,22,.35)'}}>{lang==="es"?"Explorar":"Explore"}</span>
                    </div>
                  </div>
                </div>

                {/* card 3 smaller */}
                <div style={{margin:'0 10px 10px',borderRadius:14,overflow:'hidden',display:'flex',background:'#161923',border:'1px solid #23273a'}}>
                  <div style={{width:70,flexShrink:0,position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#1a0a2e 0%,#0d0618 100%)'}}>
                      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <svg width="28" height="36" viewBox="0 0 28 36" fill="none"><path d="M2 4h24L16 18v12h3v4H9v-4h3V18L2 4z" fill="rgba(167,139,250,.2)" stroke="rgba(167,139,250,.65)" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="14" cy="14" r="3" fill="rgba(167,139,250,.2)"/><path d="M8 8l2 3M20 8l-2 3" stroke="rgba(167,139,250,.4)" strokeWidth="1" strokeLinecap="round"/></svg>
                      </div>
                      <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,transparent 55%,#161923)'}} />
                    </div>
                  </div>
                  <div style={{padding:'9px 10px 8px',flex:1,minWidth:0}}>
                    <div style={{display:'flex',gap:4,marginBottom:5}}>
                      <span style={{background:'rgba(139,92,246,.15)',color:'#a78bfa',fontSize:'.4rem',fontWeight:800,padding:'2px 6px',borderRadius:20,border:'1px solid rgba(139,92,246,.25)',letterSpacing:'.02em'}}>{lang==="es"?"Flash":"Flash"}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:'.68rem',color:'#f0f1f5',marginBottom:2,lineHeight:1.3}}>{lang==="es"?"Gin Tonic €6":"Gin & Tonic €6"}</div>
                    <div style={{fontSize:'.5rem',color:'#6b7280',marginBottom:6}}>Mirador · Old Town</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{fontSize:'.44rem',color:'#a78bfa',fontWeight:600}}>⚡ {lang==="es"?"Solo hoy":"Today only"}</span>
                      <span style={{background:'linear-gradient(135deg,#f97316,#ea580c)',color:'#fff',fontSize:'.44rem',fontWeight:700,padding:'3px 9px',borderRadius:20,boxShadow:'0 2px 8px rgba(249,115,22,.35)'}}>{lang==="es"?"Explorar":"Explore"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="lp-ticker">
        <div className="lp-t-track">
          {tickerDouble.map((item, i) => (
            <span key={i} className="lp-t-item"><b>{item.label}</b> {item.val}</span>
          ))}
        </div>
      </div>

      {/* TWO BUCKETS */}
      <section className="lp-buckets">
        <div className="lp-wrap">
          <div className="lp-bucket-grid lp-fade">
            <div className="lp-bucket">
              <div className="lp-bucket-num">{c.b1num}</div>
              <h2 className="lp-bucket-title">{c.b1title[0]}<br /><em>{c.b1title[1]}</em></h2>
              <p>{c.b1desc}</p>
              <div className="lp-bucket-items">
                {c.b1items.map((item, i) => <div key={i} className="lp-bucket-item">{item}</div>)}
              </div>
            </div>
            <div className="lp-bucket">
              <div className="lp-bucket-num">{c.b2num}</div>
              <h2 className="lp-bucket-title">{c.b2title[0]}<br /><em>{c.b2title[1]}</em></h2>
              <p>{c.b2desc}</p>
              <div className="lp-bucket-items">
                {c.b2items.map((item, i) => <div key={i} className="lp-bucket-item">{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="lp-stats">
        <div className="lp-wrap">
          <div className="lp-stats-grid lp-fade">
            <div className="lp-stat"><div className="lp-stat-n"><em>157</em>+</div><div className="lp-stat-l">{c.statBars}</div></div>
            <div className="lp-stat"><div className="lp-stat-n"><em>2</em></div><div className="lp-stat-l">{c.statCities}</div></div>
            <div className="lp-stat"><div className="lp-stat-n"><em>0</em>€</div><div className="lp-stat-l">{c.statFree}</div></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-wrap">
          <div className="lp-feat-label">{c.featLabel}</div>
          <h2 className="lp-h2">{c.featH2[0]}<br />{c.featH2[1]}</h2>

          <div className="lp-feat-block lp-fade">
            <div className="lp-feat-text">
              <div className="lp-feat-icon">⚡</div>
              <h3>{c.feat1Title}</h3>
              <p>{c.feat1Desc}</p>
            </div>
            <div className="lp-feat-visual">
              <div className="lp-fvc">
                <div style={{fontSize:'.6rem',fontWeight:700,color:'var(--green)',marginBottom:14,letterSpacing:'.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--green)',display:'inline-block'}} />
                  {c.feat1Live}
                </div>
                {[
                  {label:'Bar Manero · 2x1',val:'ends 20:00'},
                  {label:'La Lonja · Pintxos €3',val:'ends 20:00'},
                  {label:'NIC · Happy Hour',val:'ends 22:00'},
                ].map((r,i) => (
                  <div key={i} className="lp-fvc-row">
                    <span className="lp-fvc-dot" style={{background:'var(--orange)'}} />
                    <span style={{fontSize:'.65rem',color:'var(--fg)',flex:1}}>{r.label}</span>
                    <span className="lp-fvc-label" style={{color:'var(--orange)',fontSize:'.6rem',fontWeight:700}}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lp-feat-block flip lp-fade d1">
            <div className="lp-feat-text">
              <div className="lp-feat-icon">📍</div>
              <h3>{c.feat2Title}</h3>
              <p>{c.feat2Desc}</p>
            </div>
            <div className="lp-feat-visual">
              <div className="lp-fvc">
                <div style={{fontSize:'.6rem',fontWeight:700,color:'var(--fg-2)',marginBottom:10,letterSpacing:'.06em',textTransform:'uppercase'}}>Benidorm · Levante</div>
                <div className="lp-map-grid">
                  {['🏖','🍺','🎵','🍹','🥂','🎭','🍻','🍕','🎸','🍷','🥃','🎶'].map((e,i) => (
                    <div key={i} className={`lp-map-dot${i % 4 === 1 ? ' live' : i % 3 === 0 ? ' on' : ''}`}>{e}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lp-feat-block lp-fade d2">
            <div className="lp-feat-text">
              <div className="lp-feat-icon">✅</div>
              <h3>{c.feat3Title}</h3>
              <p>{c.feat3Desc}</p>
            </div>
            <div className="lp-feat-visual">
              <div className="lp-fvc">
                <div style={{fontSize:'.6rem',fontWeight:700,color:'var(--orange)',marginBottom:14,letterSpacing:'.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--orange)',display:'inline-block'}} />
                  {c.feat3Community}
                </div>
                <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:'1.1rem',marginBottom:4,color:'var(--fg)'}}>2{lang==="es"?"x1":"-for-1"} Gin Tonics</div>
                <div style={{fontSize:'.65rem',color:'var(--fg-2)',marginBottom:12}}>NIC Cócteles · El Barrio · Alicante</div>
                <div style={{background:'rgba(74,222,128,.06)',borderRadius:8,padding:10,fontSize:'.65rem',color:'var(--fg-2)',lineHeight:1.5,border:'1px solid rgba(74,222,128,.12)'}}>
                  💬 {c.feat3Updated}
                </div>
                <div style={{marginTop:10,fontSize:'.6rem',color:'var(--fg-3)'}}>{c.feat3Source}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="lp-cities">
        <div className="lp-wrap">
          <div className="lp-feat-label">{c.citiesLabel}</div>
          <h2 className="lp-h2">{c.citiesH2[0]}<br />{c.citiesH2[1]}</h2>
          <div className="lp-city-grid lp-fade">
            <div className="lp-city-card">
              <div className="lp-city-emoji">🌊</div>
              <div className="lp-city-chip">{c.city1Chip}</div>
              <h3>Alicante</h3>
              <p>{c.city1Desc}</p>
              <div className="lp-city-meta">{c.city1Meta}</div>
            </div>
            <div className="lp-city-card">
              <div className="lp-city-emoji">🎉</div>
              <div className="lp-city-chip">{c.city2Chip}</div>
              <h3>Benidorm</h3>
              <p>{c.city2Desc}</p>
              <div className="lp-city-meta">{c.city2Meta}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="lp-trust">
        <div className="lp-wrap">
          <div className="lp-trust-inner lp-fade">
            <div>
              <div className="lp-trust-label">{c.trustLabel}</div>
              <h2 className="lp-h2" style={{marginBottom:16}}>{c.trustH2}</h2>
              <p style={{fontSize:'.95rem',color:'var(--fg-2)',lineHeight:1.7}}>{c.trustDesc}</p>
            </div>
            <div className="lp-trust-items">
              {[
                {icon:'🏪', title: c.ti1Title, desc: c.ti1Desc},
                {icon:'📍', title: c.ti2Title, desc: c.ti2Desc},
                {icon:'🆓', title: c.ti3Title, desc: c.ti3Desc},
              ].map((item,i) => (
                <div key={i} className="lp-trust-item-b">
                  <div className="lp-t-icon">{item.icon}</div>
                  <div className="lp-t-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="lp-reviews">
        <div className="lp-wrap">
          <div className="lp-reviews-header">
            <h2 className="lp-h2" style={{marginBottom:0}}>{c.revLabel}<br /><span style={{color:'var(--fg-2)'}}>{c.revNoBribe}</span></h2>
            <p className="lp-reviews-aside">{c.revAside}</p>
          </div>
          <div className="lp-review-grid lp-fade">
            {c.reviews.map((r,i) => (
              <div key={i} className="lp-review-card">
                <div className="lp-review-stars">{r.stars}</div>
                <p className="lp-review-text">{r.text}</p>
                <div className="lp-review-author">{r.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR BARS */}
      <section className="lp-for-bars">
        <div className="lp-wrap">
          <div className="lp-for-bars-inner">
            <div>
              <div className="lp-feat-label">{c.barsLabel}</div>
              <h2 className="lp-h2">{c.barsH2[0]}<br />{c.barsH2[1]}</h2>
              <div className="lp-fbs-steps">
                {c.barsSteps.map((s) => (
                  <div key={s.n} className="lp-fbs-item">
                    <div className="lp-fbs-num">{s.n}</div>
                    <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/business" className="lp-btn lp-btn-teal" style={{background:'var(--teal)',color:'#fff',marginTop:12}}>{c.barsCta}</Link>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
              <div className="lp-fbv-card">
                <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(74,222,128,.06)',border:'1px solid rgba(74,222,128,.12)',borderRadius:8,padding:'6px 10px',marginBottom:16,width:'fit-content'}}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:'var(--green)',display:'inline-block'}} />
                  <span style={{fontSize:'.65rem',fontWeight:700,color:'var(--green)'}}>{lang==="es"?"Oferta activa ahora":"Deal is live now"}</span>
                </div>
                <div className="lp-fbv-stat-row">
                  <div className="lp-fbv-stat"><div className="lp-fbv-stat-n">47</div>{lang==="es"?"vistas hoy":"views today"}</div>
                  <div className="lp-fbv-stat"><div className="lp-fbv-stat-n">12</div>{lang==="es"?"van":"going"}</div>
                  <div className="lp-fbv-stat"><div className="lp-fbv-stat-n">0€</div>{lang==="es"?"coste":"cost"}</div>
                </div>
              </div>
              <p style={{fontSize:'.72rem',color:'var(--fg-3)',textAlign:'center',maxWidth:240}}>{c.barsNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-wrap">
          <h2 className="lp-h2" style={{fontSize:'clamp(2.4rem,6vw,4.5rem)',maxWidth:'14ch',margin:'0 auto 12px'}}>{c.ctaH2}</h2>
          <p className="lp-cta-sub">{c.ctaSub}</p>
          <div className="lp-cta-btns">
            <a href="https://play.google.com/store/apps/details?id=es.dealeo.app" className="lp-btn lp-btn-orange lp-btn-lg">{c.ctaBtn1}</a>
            <Link href="/deals" className="lp-btn lp-btn-outline lp-btn-lg">{c.ctaBtn2}</Link>
          </div>
          <p className="lp-cta-note">{c.ctaNote}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <span className="lp-footer-copy">{c.footerCopy}</span>
          <div className="lp-footer-links">
            <Link href="/deals">{c.footerApp}</Link>
            <Link href="/business">{c.footerBars}</Link>
            <Link href="/sobre-dealeo">{c.footerAbout}</Link>
          </div>
        </div>
      </footer>

      <LandingFadeIn />
    </>
  );
}
