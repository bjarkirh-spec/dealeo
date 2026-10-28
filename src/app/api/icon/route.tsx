import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #14b8a6 0%, #0d9488 55%, #0f766e 100%)",
        }}
      >
        <svg width="512" height="512" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient id="tagGrad" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>

          {/* Price tag body */}
          <path
            d="M 100 110 Q 100 66 144 66 L 368 66 Q 412 66 412 110 L 412 340 Q 412 374 386 388 L 256 454 L 126 388 Q 100 374 100 340 Z"
            fill="url(#tagGrad)"
          />

          {/* Hole */}
          <circle cx="256" cy="66" r="26" fill="white" />
          <circle cx="256" cy="66" r="14" fill="#0d9488" />

          {/* String loop */}
          <path
            d="M 278 48 Q 360 -10 400 30"
            fill="none" stroke="white" strokeWidth="18" strokeLinecap="round"
          />
          <circle cx="400" cy="30" r="32" fill="none" stroke="white" strokeWidth="18" />

          {/* Coupe/margarita glass – white */}
          {/* Bowl */}
          <path d="M 118 188 Q 118 156 150 156 L 278 156 Q 310 156 310 188 L 294 280 L 134 280 Z" fill="white" />
          {/* Bowl interior (show orange) */}
          <path d="M 136 192 Q 136 168 160 168 L 268 168 Q 292 168 292 192 L 280 268 L 148 268 Z" fill="url(#tagGrad)" />
          {/* Stem */}
          <rect x="206" y="280" width="18" height="72" rx="9" fill="white" />
          {/* Base */}
          <rect x="158" y="348" width="114" height="20" rx="10" fill="white" />

          {/* Fork – angled bottom-right, ~30° tilt */}
          <g transform="translate(348, 420) rotate(-32)">
            {/* Handle */}
            <rect x="-10" y="-170" width="20" height="170" rx="10" fill="white" />
            {/* Neck */}
            <rect x="-10" y="-220" width="20" height="56" rx="6" fill="white" />
            {/* Tines */}
            <rect x="-26" y="-330" width="14" height="116" rx="7" fill="white" />
            <rect x="-7"  y="-330" width="14" height="116" rx="7" fill="white" />
            <rect x="12"  y="-330" width="14" height="116" rx="7" fill="white" />
          </g>
        </svg>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
