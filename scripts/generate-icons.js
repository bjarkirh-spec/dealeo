const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '../public/icon-512.png');
const ANDROID_RES = path.join(__dirname, '../android/src/main/res');

// Standard launcher sizes
const SIZES = {
  'mipmap-mdpi':    48,
  'mipmap-hdpi':    72,
  'mipmap-xhdpi':   96,
  'mipmap-xxhdpi':  144,
  'mipmap-xxxhdpi': 192,
};

async function run() {
  for (const [folder, size] of Object.entries(SIZES)) {
    const dir = path.join(ANDROID_RES, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // ic_launcher
    await sharp(SRC)
      .resize(size, size)
      .png()
      .toFile(path.join(dir, 'ic_launcher.png'));

    // ic_maskable — same as launcher (icon already has dark bg filling the frame)
    await sharp(SRC)
      .resize(size, size)
      .png()
      .toFile(path.join(dir, 'ic_maskable.png'));

    console.log(`✓ ${folder} (${size}px)`);
  }

  // Also update public PWA icon-192
  await sharp(SRC).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon-192.png'));
  console.log('✓ PWA icons updated');
}

run().catch(console.error);
