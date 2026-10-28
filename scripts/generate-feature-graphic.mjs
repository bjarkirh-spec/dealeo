import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const originalPath = "C:\\Users\\bjark\\Downloads\\ChatGPT Image Mar 17, 2026, 12_16_02 PM.png";

// Crop the ChatGPT icon same way as app icon (remove white ring)
const iconBuffer = await sharp(originalPath)
  .extract({ left: 200, top: 200, width: 624, height: 624 })
  .resize(380, 380)
  .png()
  .toBuffer();

// Background SVG — teal gradient + text (no icon, we composite that separately)
const bgSvg = `<svg width="1024" height="500" viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a5c55"/>
      <stop offset="100%" stop-color="#0f9689"/>
    </linearGradient>
    <linearGradient id="tag2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff7a1a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ff9100" stop-opacity="0.18"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="500" fill="url(#bg)"/>

  <!-- Decorative tag shape top right -->
  <path d="M 870 -30 Q 840 -30 840 0 L 840 340 L 940 440 L 1040 340 L 1040 0 Q 1040 -30 1010 -30 Z"
        fill="url(#tag2)"/>

  <!-- DEALEO wordmark -->
  <text x="430" y="220"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900" font-size="112" letter-spacing="-2" fill="white">DEALEO</text>

  <!-- Orange underline -->
  <rect x="430" y="234" width="200" height="6" rx="3" fill="#ff7a1a" opacity="0.9"/>

  <!-- Tagline -->
  <text x="432" y="290"
    font-family="Arial, sans-serif" font-weight="400" font-size="32"
    fill="white" opacity="0.8">Live deals at bars near you</text>

  <!-- Category pills -->
  <rect x="430" y="330" width="152" height="40" rx="20" fill="white" opacity="0.12"/>
  <text x="506" y="356" font-family="Arial, sans-serif" font-size="20"
        fill="white" text-anchor="middle" opacity="0.9">🍹 Happy Hour</text>

  <rect x="596" y="330" width="116" height="40" rx="20" fill="white" opacity="0.12"/>
  <text x="654" y="356" font-family="Arial, sans-serif" font-size="20"
        fill="white" text-anchor="middle" opacity="0.9">🌙 Nightlife</text>

  <rect x="726" y="330" width="126" height="40" rx="20" fill="white" opacity="0.12"/>
  <text x="789" y="356" font-family="Arial, sans-serif" font-size="20"
        fill="white" text-anchor="middle" opacity="0.9">☀️ Terraces</text>
</svg>`;

const bgBuffer = await sharp(Buffer.from(bgSvg))
  .png()
  .toBuffer();

// Composite icon on left side, vertically centered
const outputPath = path.join(__dirname, '../public/feature-graphic.png');
await sharp(bgBuffer)
  .composite([{
    input: iconBuffer,
    left: 30,
    top: Math.round((500 - 380) / 2) // vertically centered = 60px from top
  }])
  .png()
  .toFile(outputPath);

console.log('✅ Feature graphic updated with matching icon!');
