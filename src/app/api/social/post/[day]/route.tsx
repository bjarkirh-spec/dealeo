import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const W = 1080;
const H = 1350;

// 4 verified Unsplash photo IDs per day — rotates each week automatically.
// Week 1 = index 0, Week 2 = index 1, etc. (cycles every 4 weeks)
const PHOTOS: Record<string, string[]> = {
  monday: [
    "1551538827-9c037cb4f32a", // mojito being poured
    "1609951651556-5334e2706168", // cocktail glass close-up
    "1570598912132-0ba1dc952b7d", // colourful cocktail
    "1550426735-c33c7ce414ff", // craft cocktail on bar
  ],
  tuesday: [
    "1514362545857-3bc16c4c7d1b", // dark moody cocktail
    "1547146598-0962d0d87c97",   // dark bar drinks
    "1590423859012-39c5ee2845bd", // bar scene
    "1597241693839-07d7fb803af1", // cocktail overhead
  ],
  wednesday: [
    "1574096079513-d8259312b785", // ornate bar interior
    "1572116469696-31de0f17cc34", // bar pendant lights
    "1583106223774-3313c55721ed", // bar counter drinks
    "1605270012917-bf157c5a9541", // busy bar scene
  ],
  thursday: [
    "1507434965515-61970f2bd7c6", // sangria bottle & fruit
    "1547595628-c61a29f496f0",   // wine glass warm tone
    "1562601579-599dec564e06",   // wine pour close-up
    "1556855810-ac404aa91e85",   // cocktail with garnish
  ],
  friday: [
    "1516997121675-4c2d1684aa3e", // wine glasses purple nightlife
    "1578911373434-0cb395d2cbfb", // dramatic wine shot
    "1566995541428-f2246c17cda1", // wine bottles evening
    "1657313666513-70770d329ef4", // vibrant cocktail night
  ],
  saturday: [
    "1470337458703-46ad1756a187", // old fashioned being poured
    "1597075687490-8f673c6c17f6", // martini glass on table
    "1566417713940-fe7c737a9ef2", // liquor being poured
    "1607622750671-6cd9a99eabd1", // premium cocktail
  ],
  sunday: [
    "1414235077428-338989a2e8c0", // fine dining plate
    "1553361371-9b22f78e8b1d",   // wine & elegant setting
    "1506377247377-2a5b3b417ebb", // wine table sunday
    "1615332579037-3c44b3660b53", // craft beer sunday
  ],
};

const POSTS = {
  monday: {
    badge: "HAPPY HOUR",
    headline: ["Best deals,", "best drinks."],
    sub: "Find today's happy hour near you — free on Dealeo",
    accent: "#F97316",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.92) 100%)",
    badgeBg: "#F97316",
    badgeText: "#fff",
  },
  tuesday: {
    badge: "LIVE NOW",
    headline: ["Updated", "every day."],
    sub: "New food & drink deals daily — never miss a happy hour again",
    accent: "#F97316",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.95) 100%)",
    badgeBg: "#ef4444",
    badgeText: "#fff",
  },
  wednesday: {
    badge: "MID-WEEK SPECIAL",
    headline: ["Hump day.", "Happy hour."],
    sub: "Beats the afternoon slump — find deals near you",
    accent: "#fbbf24",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72) 65%, rgba(0,0,0,0.95) 100%)",
    badgeBg: "#fbbf24",
    badgeText: "#000",
  },
  thursday: {
    badge: "JUEVES FELIZ",
    headline: ["Jueves.", "Happy hour."],
    sub: "Encuentra los mejores descuentos cerca de ti · Find deals near you",
    accent: "#fb923c",
    overlay: "linear-gradient(to bottom, rgba(10,0,0,0.35) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.72) 65%, rgba(0,0,0,0.95) 100%)",
    badgeBg: "#fb923c",
    badgeText: "#fff",
  },
  friday: {
    badge: "FRIDAY NIGHT",
    headline: ["Weekend", "starts now."],
    sub: "The best bars & the best deals — only on Dealeo",
    accent: "#a78bfa",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.97) 100%)",
    badgeBg: "#7c3aed",
    badgeText: "#fff",
  },
  saturday: {
    badge: "WEEKEND VIBES",
    headline: ["Sip into", "the weekend."],
    sub: "The best cocktails, the best prices — find deals near you on Dealeo",
    accent: "#fbbf24",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.68) 65%, rgba(0,0,0,0.93) 100%)",
    badgeBg: "#F97316",
    badgeText: "#fff",
  },
  sunday: {
    badge: "SUNDAY SPECIAL",
    headline: ["Make it a", "Sunday to remember."],
    sub: "Wind down the week with amazing food & drink deals near you",
    accent: "#F97316",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.68) 65%, rgba(0,0,0,0.93) 100%)",
    badgeBg: "#F97316",
    badgeText: "#fff",
  },
} as const;

type Day = keyof typeof POSTS;

/** ISO week number (1-based) */
function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

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

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ day: string }> }
) {
  const { day } = await context.params;
  const key = day.toLowerCase() as Day;
  const post = POSTS[key] ?? POSTS.monday;

  // Pick photo by week number so it rotates automatically
  const week = isoWeek(new Date());
  const pool = PHOTOS[key] ?? PHOTOS.monday;
  const photoId = pool[week % pool.length];
  const photoUrl = `https://images.unsplash.com/photo-${photoId}?w=1080&h=1350&fit=crop&crop=center&q=85`;

  let photoSrc = "";
  try {
    const res = await fetch(photoUrl);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      photoSrc = `data:image/jpeg;base64,${bufferToBase64(buf)}`;
    }
  } catch {
    // fall back to gradient-only background
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
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

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: post.overlay,
            display: "flex",
          }}
        />

        {/* TOP: brand + badge */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "white",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 512 512" fill="none">
              <path
                d="M 100 110 Q 100 66 144 66 L 368 66 Q 412 66 412 110 L 412 340 Q 412 374 386 388 L 256 454 L 126 388 Q 100 374 100 340 Z"
                fill={post.accent}
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
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "0px",
                display: "flex",
              }}
            >
              DEALEO
            </span>
          </div>

          {/* Badge */}
          <div
            style={{
              background: post.badgeBg,
              color: post.badgeText,
              borderRadius: 50,
              padding: "12px 26px",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "1.5px",
              display: "flex",
            }}
          >
            {post.badge}
          </div>
        </div>

        {/* BOTTOM: text block */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 72px 72px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 32,
            }}
          >
            {post.headline.map((line, i) => (
              <span
                key={i}
                style={{
                  fontSize: 108,
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: "-3px",
                  color: "white",
                  display: "flex",
                }}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.5,
              marginBottom: 48,
              maxWidth: 860,
              display: "flex",
            }}
          >
            {post.sub}
          </div>

          {/* Divider + handle */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.25)",
              marginBottom: 36,
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 26,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 600,
                display: "flex",
              }}
            >
              @dealeo.es
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  background: post.accent,
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "white",
                  display: "flex",
                }}
              >
                dealeo.es
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
