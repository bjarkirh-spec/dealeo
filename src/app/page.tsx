import type { Metadata } from "next";
import LandingFadeIn from "@/components/LandingFadeIn";

export const metadata: Metadata = {
  title: "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm",
  description: "Find the best happy hours, 2-for-1 drinks and live flash deals at bars in Alicante and Benidorm. Free to use, updated in real time.",
  keywords: "happy hour alicante, deals benidorm, 2 for 1 drinks alicante, ofertas bares alicante, benidorm bar deals, happy hour benidorm",
  openGraph: {
    type: "website",
    url: "https://www.dealeo.es",
    title: "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm",
    description: "Find the best happy hours, 2-for-1 drinks and live flash deals at bars in Alicante and Benidorm. Free, real-time, no sign-up.",
    images: [{ url: "https://www.dealeo.es/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm",
    description: "Find the best happy hours, 2-for-1 drinks and live flash deals at bars in Alicante and Benidorm.",
    images: ["https://www.dealeo.es/og-image.png"],
  },
  alternates: { canonical: "https://www.dealeo.es" },
};

export default function LandingPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" />
      <style>{`
:root {
  --bg:#0b0d12; --s1:#111318; --s2:#181b24; --s3:#1e2230;
  --fg:#efefef; --fg-2:#9496a3; --fg-3:#55586a;
  --orange:#f97316; --teal:#0d9488; --amber:#f59e0b;
  --border:#20242f; --green:#4ade80;
  --fd:'Barlow Condensed',system-ui,sans-serif;
  --fb:'DM Sans',system-ui,sans-serif;
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
/* PHONE */
.lp-phone-outer{position:relative;display:flex;justify-content:center}
.lp-phone-glow{position:absolute;inset:-30px;border-radius:60px;background:radial-gradient(circle,rgba(249,115,22,.12) 0%,transparent 70%);pointer-events:none}
.lp-phone{width:260px;border-radius:40px;border:2px solid var(--border);background:var(--s1);overflow:hidden;box-shadow:0 50px 100px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.04);position:relative;z-index:1}
.lp-pill-wrap{height:30px;background:var(--s1);display:flex;justify-content:center;align-items:flex-start;padding-top:7px}
.lp-pill{width:64px;height:10px;background:var(--bg);border-radius:10px}
.lp-p-top{padding:8px 14px 6px;display:flex;justify-content:space-between;align-items:center}
.lp-p-top-title{font-family:var(--fd);font-weight:800;font-size:.95rem;letter-spacing:-.01em;color:var(--fg)}
.lp-live-dot{display:flex;align-items:center;gap:5px;background:#ef4444;color:#fff;font-size:.58rem;font-weight:700;letter-spacing:.05em;padding:3px 8px;border-radius:20px}
.lp-live-dot::before{content:"";width:5px;height:5px;border-radius:50%;background:#fff;animation:lp-blink 1.3s infinite}
@keyframes lp-blink{0%,100%{opacity:1}50%{opacity:.3}}
.lp-p-tabs{display:flex;border-bottom:1px solid var(--border);padding:0 14px;margin-bottom:8px}
.lp-p-tab{font-size:.62rem;font-weight:600;padding:5px 10px;color:var(--fg-3);border-bottom:2px solid transparent;cursor:default}
.lp-p-tab.on{color:var(--orange);border-bottom-color:var(--orange)}
.lp-dc{margin:4px 12px 8px;background:var(--s2);border-radius:16px;border:1px solid var(--border);overflow:hidden}
.lp-dc-img{height:86px;background:linear-gradient(135deg,#1a2035 0%,#0d1120 100%);display:flex;align-items:center;justify-content:center;font-size:2.4rem;position:relative}
.lp-dc-tag{position:absolute;top:7px;left:8px;background:var(--orange);color:#fff;font-size:.56rem;font-weight:700;letter-spacing:.05em;padding:3px 8px;border-radius:20px;text-transform:uppercase}
.lp-dc-tag.amber{background:var(--amber);color:#0b0d12}
.lp-dc-body{padding:9px 12px 12px}
.lp-dc-name{font-family:var(--fd);font-weight:700;font-size:.85rem;letter-spacing:-.01em;color:var(--fg);margin-bottom:2px}
.lp-dc-venue{font-size:.62rem;color:var(--fg-2);margin-bottom:6px}
.lp-dc-status{font-size:.6rem;font-weight:600;display:flex;align-items:center;gap:4px}
.lp-dc-status.live{color:var(--green)}
.lp-dc-status.live::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--green);animation:lp-blink 1.3s infinite}
.lp-dc-status.soon{color:var(--amber)}
.lp-dc-sm{margin:0 12px 8px;background:var(--s2);border:1px solid var(--border);border-radius:12px;padding:9px 11px;display:flex;gap:9px;align-items:center}
.lp-dc-sm-icon{width:36px;height:36px;border-radius:9px;background:rgba(249,115,22,.12);display:grid;place-items:center;font-size:1.2rem;flex-shrink:0}
.lp-dc-badge{display:inline-block;margin-top:3px;background:rgba(249,115,22,.12);color:var(--orange);font-size:.52rem;font-weight:700;letter-spacing:.05em;padding:2px 6px;border-radius:20px;text-transform:uppercase}
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
          <a href="/" className="lp-logo">
            <span>Deal<em>eo</em></span>
          </a>
          <div className="lp-nav-r">
            <a href="/deals" className="lp-btn lp-btn-outline">Open app</a>
            <a href="https://play.google.com/store/apps/details?id=es.dealeo.app" className="lp-btn lp-btn-orange">Download free</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-glow" />
        <div className="lp-wrap">
          <div className="lp-hero-grid">
            <div>
              <div className="lp-hero-kicker">Alicante &amp; Benidorm · Live now</div>
              <h1 className="lp-h1">
                You&apos;re paying<br />
                <span className="hi">too much</span><br />
                <span className="lo">for that beer.</span>
              </h1>
              <p className="lp-hero-sub">
                Dealeo shows you every <strong>happy hour, 2-for-1 and live deal</strong> at 157 bars in Alicante and Benidorm. Updated in real time. Completely free.
              </p>
              <div className="lp-hero-actions">
                <a href="https://play.google.com/store/apps/details?id=es.dealeo.app" className="lp-btn lp-btn-orange lp-btn-lg">Find tonight&apos;s deals</a>
                <a href="/deals" className="lp-btn lp-btn-outline lp-btn-lg">Open in browser →</a>
              </div>
              <div className="lp-hero-trust">
                <span className="lp-trust-item">Free forever</span>
                <span className="lp-trust-item">No sign-up</span>
                <span className="lp-trust-item">Works right now</span>
              </div>
            </div>
            <div className="lp-phone-outer">
              <div className="lp-phone-glow" />
              <div className="lp-phone">
                <div className="lp-pill-wrap"><div className="lp-pill" /></div>
                <div className="lp-p-top">
                  <span className="lp-p-top-title">dealeo</span>
                  <span className="lp-live-dot">LIVE</span>
                </div>
                <div className="lp-p-tabs">
                  <div className="lp-p-tab on">All</div>
                  <div className="lp-p-tab">Happy Hour</div>
                  <div className="lp-p-tab">2-for-1</div>
                </div>
                <div className="lp-dc">
                  <div className="lp-dc-img">
                    🍻
                    <span className="lp-dc-tag">2-for-1</span>
                  </div>
                  <div className="lp-dc-body">
                    <div className="lp-dc-name">2-for-1 Gin Tonics</div>
                    <div className="lp-dc-venue">NIC Cócteles · El Barrio · Alicante</div>
                    <div className="lp-dc-status live">Live now · ends 22:00</div>
                  </div>
                </div>
                <div className="lp-dc-sm">
                  <div className="lp-dc-sm-icon">🍺</div>
                  <div>
                    <div className="lp-dc-name">Cañas €1.50</div>
                    <div className="lp-dc-venue">Bar Manero · Centro</div>
                    <span className="lp-dc-badge">Happy Hour</span>
                  </div>
                </div>
                <div className="lp-dc-sm">
                  <div className="lp-dc-sm-icon">🍹</div>
                  <div>
                    <div className="lp-dc-name">Cocktails 2/€12</div>
                    <div className="lp-dc-venue">Mirador · Old Town</div>
                    <div className="lp-dc-status soon">⏰ Starts 19:00</div>
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
          {[
            { label: "Happy Hour", val: "17:00–20:00" },
            { label: "2-for-1 Drinks", val: "157 bars" },
            { label: "Live Deals", val: "Right now" },
            { label: "Alicante", val: "44 venues" },
            { label: "Benidorm", val: "113 venues" },
            { label: "Free forever", val: "No sign-up" },
            { label: "Happy Hour", val: "17:00–20:00" },
            { label: "2-for-1 Drinks", val: "157 bars" },
            { label: "Live Deals", val: "Right now" },
            { label: "Alicante", val: "44 venues" },
            { label: "Benidorm", val: "113 venues" },
            { label: "Free forever", val: "No sign-up" },
          ].map((item, i) => (
            <span key={i} className="lp-t-item"><b>{item.label}</b> {item.val}</span>
          ))}
        </div>
      </div>

      {/* TWO BUCKETS */}
      <section className="lp-buckets">
        <div className="lp-wrap">
          <div className="lp-bucket-grid lp-fade">
            <div className="lp-bucket">
              <div className="lp-bucket-num">01</div>
              <h2 className="lp-bucket-title">SPEND<br /><em>LESS.</em></h2>
              <p>Stop paying full price for the same beer your mate got 2-for-1 an hour ago. Know the deals before you walk in.</p>
              <div className="lp-bucket-items">
                <div className="lp-bucket-item">Happy hours from 17:00</div>
                <div className="lp-bucket-item">2-for-1 drink deals</div>
                <div className="lp-bucket-item">Flash deals under an hour</div>
                <div className="lp-bucket-item">Food specials and set menus</div>
              </div>
            </div>
            <div className="lp-bucket">
              <div className="lp-bucket-num">02</div>
              <h2 className="lp-bucket-title">KNOW<br /><em>WHERE.</em></h2>
              <p>157 bars across two cities. Filter by neighbourhood, deal type, or what&apos;s live right now. No scrolling through Instagram.</p>
              <div className="lp-bucket-items">
                <div className="lp-bucket-item">Alicante old town bars</div>
                <div className="lp-bucket-item">Benidorm strip venues</div>
                <div className="lp-bucket-item">Map view, sorted by distance</div>
                <div className="lp-bucket-item">Live deals highlighted in red</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="lp-stats">
        <div className="lp-wrap">
          <div className="lp-stats-grid lp-fade">
            <div className="lp-stat">
              <div className="lp-stat-n"><em>157</em>+</div>
              <div className="lp-stat-l">bars & venues listed</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-n"><em>2</em></div>
              <div className="lp-stat-l">cities covered</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-n"><em>0</em>€</div>
              <div className="lp-stat-l">to use, forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <div className="lp-wrap">
          <div className="lp-feat-label">How it works</div>
          <h2 className="lp-h2">Built for people<br />who drink well.</h2>

          <div className="lp-feat-block lp-fade">
            <div className="lp-feat-text">
              <div className="lp-feat-icon">⚡</div>
              <h3>Live deals, right now</h3>
              <p>Bars can activate a flash deal for the next 30–60 minutes. You get it in real time — before the queue forms and before it sells out.</p>
            </div>
            <div className="lp-feat-visual">
              <div className="lp-fvc">
                <div style={{fontSize:'.6rem',fontWeight:700,color:'var(--green)',marginBottom:14,letterSpacing:'.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--green)',display:'inline-block'}} />
                  3 deals live now
                </div>
                {[
                  {label:'Bar Manero · 2-for-1',val:'ends 20:00',pct:72},
                  {label:'La Lonja · Pintxos €3',val:'ends 20:00',pct:55},
                  {label:'NIC · Happy Hour',val:'ends 22:00',pct:38},
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

          <div className="lp-feat-block flip lp-fade lp-fade d1">
            <div className="lp-feat-text">
              <div className="lp-feat-icon">📍</div>
              <h3>Your area, not all of Spain</h3>
              <p>Filter by neighbourhood. Whether you&apos;re in Alicante&apos;s old town, on Benidorm&apos;s Levante strip, or somewhere in between — see only what&apos;s walking distance.</p>
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
              <h3>Researched, not invented</h3>
              <p>Every deal was gathered from public sources — menus, social posts, bar websites. Prices change. If something&apos;s off, tap Report and suggest the real price. We update it for everyone.</p>
            </div>
            <div className="lp-feat-visual">
              <div className="lp-fvc">
                <div style={{fontSize:'.6rem',fontWeight:700,color:'var(--orange)',marginBottom:14,letterSpacing:'.06em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'var(--orange)',display:'inline-block'}} />
                  Community updated
                </div>
                <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:'1.1rem',marginBottom:4,color:'var(--fg)'}}>2-for-1 Gin Tonics</div>
                <div style={{fontSize:'.65rem',color:'var(--fg-2)',marginBottom:12}}>NIC Cócteles · El Barrio · Alicante</div>
                <div style={{background:'rgba(74,222,128,.06)',borderRadius:8,padding:10,fontSize:'.65rem',color:'var(--fg-2)',lineHeight:1.5,border:'1px solid rgba(74,222,128,.12)'}}>
                  💬 &ldquo;Actually it&apos;s €6 now, not €5&rdquo; — updated by a user, 2h ago
                </div>
                <div style={{marginTop:10,fontSize:'.6rem',color:'var(--fg-3)'}}>Researched from public sources · You can fix it</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="lp-cities">
        <div className="lp-wrap">
          <div className="lp-feat-label">Where we are</div>
          <h2 className="lp-h2">Two cities.<br />Zero excuses.</h2>
          <div className="lp-city-grid lp-fade">
            <div className="lp-city-card">
              <div className="lp-city-emoji">🌊</div>
              <div className="lp-city-chip">Sophisticated city</div>
              <h3>Alicante</h3>
              <p>Old town vermuterías, port-side cocktail bars, rooftop terraces. Locals eat at 14:00 and drink until late. Now you know where.</p>
              <div className="lp-city-meta"><strong>44 venues</strong> · El Barrio, Casco Antiguo, Centro, Puerto, Explanada</div>
            </div>
            <div className="lp-city-card">
              <div className="lp-city-emoji">🎉</div>
              <div className="lp-city-chip">Holiday strip</div>
              <h3>Benidorm</h3>
              <p>British pubs, beachfront bars, shot bars and showbars. Every night somebody&apos;s running a happy hour. Find the one worth going to.</p>
              <div className="lp-city-meta"><strong>113 venues</strong> · Levante Strip, Rincon de Loix, Old Town, Poniente</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="lp-trust">
        <div className="lp-wrap">
          <div className="lp-trust-inner lp-fade">
            <div>
              <div className="lp-trust-label">✓ Honest</div>
              <h2 className="lp-h2" style={{marginBottom:16}}>NO B.S.</h2>
              <p style={{fontSize:'.95rem',color:'var(--fg-2)',lineHeight:1.7}}>We make money from travel, not from bars. That means no reason to hide a great deal — or promote a bad one.</p>
            </div>
            <div className="lp-trust-items">
              <div className="lp-trust-item-b">
                <div className="lp-t-icon">🏪</div>
                <div className="lp-t-content">
                  <h4>We make money from travel, not bars</h4>
                  <p>Dealeo earns affiliate commission when you book a hotel or buy a travel eSIM. Bars don&apos;t pay us to rank higher.</p>
                </div>
              </div>
              <div className="lp-trust-item-b">
                <div className="lp-t-icon">📍</div>
                <div className="lp-t-content">
                  <h4>Deals are researched, not invented</h4>
                  <p>Gathered from menus, social posts, bar websites. Prices change — if something&apos;s wrong, suggest the real price and we&apos;ll update it for everyone.</p>
                </div>
              </div>
              <div className="lp-trust-item-b">
                <div className="lp-t-icon">🆓</div>
                <div className="lp-t-content">
                  <h4>Free for users, always</h4>
                  <p>No subscription, no premium tier, no &ldquo;unlock more deals.&rdquo; Everything is visible to everyone, for free. That won&apos;t change.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="lp-reviews">
        <div className="lp-wrap">
          <div className="lp-reviews-header">
            <h2 className="lp-h2" style={{marginBottom:0}}>What people say.<br /><span style={{color:'var(--fg-2)'}}>NOT BRIBED.</span></h2>
            <p className="lp-reviews-aside">Real reviews from real users. We don&apos;t pay for them and we can&apos;t delete them.</p>
          </div>
          <div className="lp-review-grid lp-fade">
            {[
              {stars:'★★★★★',text:'"Finally found the happy hour at Bar Manero I walked past for three days. Saved €8 on gin tonics."',author:'— James T., Alicante'},
              {stars:'★★★★★',text:'"Benidorm strip on a budget actually works. Pulled up Dealeo at 18:00, had a €2 pint by 18:05."',author:'— Sarah M., Benidorm'},
              {stars:'★★★★☆',text:'"One deal was wrong price, reported it, got fixed next day. Like that it\'s honest about being community-sourced."',author:'— Mikael J., Alicante'},
            ].map((r,i) => (
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
              <div className="lp-feat-label">For venue owners</div>
              <h2 className="lp-h2">Your deals.<br />Their phones.</h2>
              <div className="lp-fbs-steps">
                {[
                  {n:'1',title:'Claim your listing',desc:'Your bar is probably already on Dealeo. Claim it in 2 minutes — no setup fee, no contract.'},
                  {n:'2',title:'Add your deals',desc:'Log in and add whatever you\'re running tonight. Happy hour, 2-for-1, flash deal — your call.'},
                  {n:'3',title:'Customers walk in',desc:'People nearby see your deal live. They show up. You don\'t pay us for the lead.'},
                ].map((s) => (
                  <div key={s.n} className="lp-fbs-item">
                    <div className="lp-fbs-num">{s.n}</div>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/business" className="lp-btn lp-btn-teal" style={{background:'var(--teal)',color:'#fff',marginTop:12}}>List your venue free →</a>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
              <div className="lp-fbv-card">
                <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(74,222,128,.06)',border:'1px solid rgba(74,222,128,.12)',borderRadius:8,padding:'6px 10px',marginBottom:16,width:'fit-content'}}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:'var(--green)',display:'inline-block'}} />
                  <span style={{fontSize:'.65rem',fontWeight:700,color:'var(--green)'}}>Deal is live now</span>
                </div>
                <div className="lp-fbv-stat-row">
                  <div className="lp-fbv-stat"><div className="lp-fbv-stat-n">47</div>views today</div>
                  <div className="lp-fbv-stat"><div className="lp-fbv-stat-n">12</div>going</div>
                  <div className="lp-fbv-stat"><div className="lp-fbv-stat-n">0€</div>cost</div>
                </div>
              </div>
              <p style={{fontSize:'.72rem',color:'var(--fg-3)',textAlign:'center',maxWidth:240}}>You control what&apos;s on here. We just make sure the right people see it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-wrap">
          <h2 className="lp-h2" style={{fontSize:'clamp(2.4rem,6vw,4.5rem)',maxWidth:'14ch',margin:'0 auto 12px'}}>Stop paying full price.</h2>
          <p className="lp-cta-sub">The happy hour started 20 minutes ago.</p>
          <div className="lp-cta-btns">
            <a href="https://play.google.com/store/apps/details?id=es.dealeo.app" className="lp-btn lp-btn-orange lp-btn-lg">Download free on Android</a>
            <a href="/deals" className="lp-btn lp-btn-outline lp-btn-lg">Open in browser →</a>
          </div>
          <p className="lp-cta-note">Free forever · No account needed · Works right now</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <span className="lp-footer-copy">© 2025 Dealeo · Alicante &amp; Benidorm</span>
          <div className="lp-footer-links">
            <a href="/deals">App</a>
            <a href="/business">For bars</a>
            <a href="/sobre-dealeo">About</a>
          </div>
        </div>
      </footer>

      <LandingFadeIn />
    </>
  );
}
