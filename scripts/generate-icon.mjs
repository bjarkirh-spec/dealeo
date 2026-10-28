import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const originalPath = "C:\\Users\\bjark\\Downloads\\ChatGPT Image Mar 17, 2026, 12_16_02 PM.png";

// Crop 200px from each side — removes the entire white ring and border
// leaving only the teal area + icon
const crop = 200;
const cropSize = 1024 - crop * 2; // 624px

const cropped = await sharp(originalPath)
  .extract({ left: crop, top: crop, width: cropSize, height: cropSize })
  .toBuffer();

await sharp(cropped).resize(512, 512).png().toFile(path.join(__dirname, '../public/icon-512.png'));
await sharp(cropped).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon-192.png'));

// Verify corner is teal
const { data } = await sharp(cropped).resize(512,512).raw().toBuffer({ resolveWithObject: true });
const r = data[0], g = data[1], b = data[2];
console.log('Corner pixel RGB:', r, g, b);
console.log(g > 130 && r < 100 ? '✅ Teal!' : '❌ Still white — RGB: ' + r + ',' + g + ',' + b);
