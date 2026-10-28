import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dealeo — Happy Hours & Live Deals in Alicante & Benidorm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0d12",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", top: -120, left: -80,
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -100, right: -60,
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)",
        }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 900, color: "#fff",
          }}>D</div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 900 }}>
            <span style={{ color: "#f97316" }}>Deal</span>
            <span style={{ color: "#0d9488" }}>eo</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 68, fontWeight: 900, color: "#efefef",
          lineHeight: 1.05, letterSpacing: "-2px",
          marginBottom: 24, maxWidth: 760,
        }}>
          Happy hours &amp; live deals.{" "}
          <span style={{ color: "#f97316" }}>Free.</span>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 28, color: "#9496a3", fontWeight: 500,
          marginBottom: 48, maxWidth: 600,
        }}>
          Alicante &amp; Benidorm · 157+ bars · updated in real time
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Happy Hours", "2-for-1 Drinks", "Live Flash Deals", "Food Deals"].map((label) => (
            <div key={label} style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.25)",
              color: "#f97316",
              fontSize: 18, fontWeight: 700,
              padding: "8px 20px", borderRadius: 40,
              letterSpacing: "0.03em",
            }}>{label}</div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute", bottom: 48, right: 80,
          fontSize: 22, color: "#55586a", fontWeight: 600,
        }}>
          dealeo.es
        </div>
      </div>
    ),
    { ...size }
  );
}
