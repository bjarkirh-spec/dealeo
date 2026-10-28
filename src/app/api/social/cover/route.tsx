import { ImageResponse } from "next/og";

export const runtime = "edge";

const W = 820;
const H = 312;

const PHOTO_ID = "1574096079513-d8259312b785"; // ornate warm bar interior

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const CHUNK = 8192;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(
      ...Array.from(bytes.subarray(i, Math.min(i + CHUNK, bytes.length)))
    );
  }
  return btoa(binary);
}

export async function GET() {
  const photoUrl = `https://images.unsplash.com/photo-${PHOTO_ID}?w=820&h=312&fit=crop&crop=center&q=85`;

  let photoSrc = "";
  try {
    const res = await fetch(photoUrl);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      photoSrc = `data:image/jpeg;base64,${bufferToBase64(buf)}`;
    }
  } catch {
    // fall through to gradient-only background
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#111",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* Background photo */}
        {photoSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        {/* Dark overlay — heavier on left so text reads cleanly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.55) 100%)",
            display: "flex",
          }}
        />

        {/* Orange accent bar — left edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "#F97316",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px 0 40px",
          }}
        >
          {/* LEFT: logo + wordmark + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Logo row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="44" height="44" viewBox="0 0 512 512" fill="none">
                <path
                  d="M 100 110 Q 100 66 144 66 L 368 66 Q 412 66 412 110 L 412 340 Q 412 374 386 388 L 256 454 L 126 388 Q 100 374 100 340 Z"
                  fill="#F97316"
                />
                <circle cx="256" cy="66" r="26" fill="white" />
                <circle cx="256" cy="66" r="14" fill="rgba(0,0,0,0.8)" />
                <path
                  d="M 278 48 Q 360 -10 400 30"
                  fill="none"
                  stroke="white"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <circle
                  cx="400"
                  cy="30"
                  r="32"
                  fill="none"
                  stroke="white"
                  strokeWidth="18"
                />
              </svg>
              <span
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-1px",
                  display: "flex",
                }}
              >
                DEALEO
              </span>
            </div>

            {/* Tagline */}
            <span
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Happy Hour · Food Deals · Alicante
            </span>
          </div>

          {/* RIGHT: headline + URL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  display: "flex",
                  textAlign: "right",
                }}
              >
                The best deals
              </span>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#F97316",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  display: "flex",
                }}
              >
                near you. Free.
              </span>
            </div>

            {/* URL pill */}
            <div
              style={{
                background: "#F97316",
                borderRadius: 8,
                padding: "7px 18px",
                display: "flex",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "0.5px",
                  display: "flex",
                }}
              >
                dealeo.es
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
