from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import requests, os, io, textwrap

OUT = r'C:/Users/bjark/OneDrive/Desktop/Dealeo/instagram-posts'
PHOTOS = r'C:/Users/bjark/OneDrive/Desktop/Dealeo/bg-photos'
os.makedirs(OUT, exist_ok=True)
os.makedirs(PHOTOS, exist_ok=True)

W, H = 1080, 1080
ORANGE = (255, 107, 0)
WHITE = (255, 255, 255)
DARK = (12, 12, 16)
GRAY = (180, 180, 180)

# Download background photos from Unsplash
photos = {
    'cocktails':   'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1080&h=1080&fit=crop&q=90',
    'bar_people':  'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1080&h=1080&fit=crop&q=90',
    'drinks_dark': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=1080&h=1080&fit=crop&q=90',
    'happy_hour':  'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1080&h=1080&fit=crop&q=90',
    'bar_neon':    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1080&h=1080&fit=crop&q=90',
    'spain_street':'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080&h=1080&fit=crop&q=90',
    'beach_bar':   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&h=1080&fit=crop&q=90',
}

print("Downloading background photos...")
bgs = {}
for name, url in photos.items():
    path = f'{PHOTOS}/{name}.jpg'
    if not os.path.exists(path):
        r = requests.get(url, timeout=15)
        with open(path, 'wb') as f:
            f.write(r.content)
        print(f"  Downloaded {name}")
    bgs[name] = Image.open(path).convert('RGB').resize((W, H))
print("Photos ready.\n")

def get_font(size, bold=False):
    try:
        path = "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def dark_overlay(img, opacity=0.55):
    overlay = Image.new('RGB', (W, H), (0, 0, 0))
    return Image.blend(img, overlay, opacity)

def orange_overlay(img, opacity=0.45):
    overlay = Image.new('RGB', (W, H), ORANGE)
    return Image.blend(img, overlay, opacity)

def gradient_overlay(img, top_opacity=0.8, bottom_opacity=0.2):
    """Dark on top fading out — keeps photo visible in middle"""
    result = img.copy()
    draw = ImageDraw.Draw(result)
    for y in range(H):
        t = y / H
        # Strong dark at top and bottom, lighter in middle
        if t < 0.4:
            alpha = int(255 * (top_opacity * (1 - t/0.4)))
        elif t > 0.6:
            alpha = int(255 * (0.7 * ((t - 0.6) / 0.4)))
        else:
            alpha = 0
        if alpha > 0:
            draw.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    return result

def bottom_gradient(img, strength=0.85):
    result = img.copy().convert('RGBA')
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for y in range(H // 2, H):
        t = (y - H // 2) / (H // 2)
        alpha = int(255 * strength * t)
        draw.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    result = Image.alpha_composite(result, overlay)
    return result.convert('RGB')

def center_text(draw, text, font, y, fill=WHITE):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    draw.text((x, y), text, fill=fill, font=font)
    return bbox[3] - bbox[1]

def shadow_text(draw, text, font, x, y, fill=WHITE, shadow_color=(0,0,0), offset=3):
    draw.text((x+offset, y+offset), text, fill=shadow_color, font=font)
    draw.text((x, y), text, fill=fill, font=font)

def center_shadow(draw, text, font, y, fill=WHITE, shadow=(0,0,0,180), offset=3):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    draw.text((x+offset, y+offset), text, fill=shadow, font=font)
    draw.text((x, y), text, fill=fill, font=font)
    return bbox[3] - bbox[1]

def pill_button(draw, text, font, cy, bg=ORANGE, fg=DARK, width=600):
    x1 = (W - width) // 2
    x2 = x1 + width
    draw.rounded_rectangle([x1, cy, x2, cy+80], radius=40, fill=bg)
    bbox = draw.textbbox((0,0), text, font=font)
    tw = bbox[2]-bbox[0]
    draw.text(((W-tw)//2, cy+18), text, fill=fg, font=font)

def logo(draw, x=60, y=50, size=38):
    draw.text((x, y), "dealeo", fill=ORANGE, font=get_font(size, bold=True))

posts = []

# ══════════════════════════════════════════════════════════════
# 1. PINNED — SPANISH (matches the English pinned exactly)
# ══════════════════════════════════════════════════════════════
bg = dark_overlay(bgs['bar_neon'], 0.65)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw, 60, 60)
draw.text((60, 118), "La app de ofertas en Alicante y Benidorm.", fill=GRAY, font=get_font(26))
draw.rectangle([0, 175, W, 179], fill=ORANGE)

center_shadow(draw, "Acabamos de", get_font(88, True), 220, WHITE)
center_shadow(draw, "empezar.", get_font(88, True), 330, ORANGE)

f_body = get_font(34)
lines = [
    "Ofertas en vivo. Notificaciones en tiempo real.",
    "Happy hours, 2x1s y flash deals —",
    "justo cuando más los necesitas.",
]
y = 490
for line in lines:
    center_shadow(draw, line, f_body, y, GRAY)
    y += 52

# Tags
tags = ["En Vivo", "Canje QR", "Notificaciones"]
f_tag = get_font(26, True)
total_w = sum(draw.textbbox((0,0), t, font=f_tag)[2]+50 for t in tags) + 20*(len(tags)-1)
tx = (W - total_w) // 2
for tag in tags:
    bbox = draw.textbbox((0,0), tag, font=f_tag)
    tw = bbox[2]+50
    draw.rounded_rectangle([tx, 740, tx+tw, 795], radius=25, outline=ORANGE, width=2)
    draw.text((tx+25, 750), tag, fill=ORANGE, font=f_tag)
    tx += tw + 20

draw.rectangle([0, 860, W, 864], fill=ORANGE)
draw.text((60, 895), "dealeo.es", fill=ORANGE, font=get_font(32, True))
draw.text((60, 945), "Alicante · Benidorm", fill=GRAY, font=get_font(28))

img.save(f'{OUT}/pinned_es.jpg', quality=95)
posts.append('pinned_es.jpg')
print("pinned_es.jpg done")

# ══════════════════════════════════════════════════════════════
# 2. 2-FOR-1 ENGLISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['cocktails'], 0.9)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 570, W, H], fill=(10, 10, 14))
center_shadow(draw, "2-for-1", get_font(160, True), 360, WHITE)
center_shadow(draw, "Drinks.", get_font(100, True), 510, ORANGE)
center_shadow(draw, "Find bars running 2-for-1 near you.", get_font(34), 635, GRAY)
pill_button(draw, "OPEN DEALEO  ·  dealeo.es", get_font(32, True), 730, width=680)
draw.text((60, 950), "dealeo.es", fill=GRAY, font=get_font(26))

img.save(f'{OUT}/2for1_en.jpg', quality=95)
posts.append('2for1_en.jpg')
print("2for1_en.jpg done")

# ══════════════════════════════════════════════════════════════
# 3. 2x1 SPANISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['cocktails'], 0.9)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 570, W, H], fill=(10, 10, 14))
center_shadow(draw, "2x1", get_font(180, True), 340, WHITE)
center_shadow(draw, "Bebidas.", get_font(100, True), 510, ORANGE)
center_shadow(draw, "Encuentra bares con 2x1 cerca de ti.", get_font(34), 635, GRAY)
pill_button(draw, "ABRE DEALEO  ·  dealeo.es", get_font(32, True), 730, width=680)
draw.text((60, 950), "dealeo.es", fill=GRAY, font=get_font(26))

img.save(f'{OUT}/2for1_es.jpg', quality=95)
posts.append('2for1_es.jpg')
print("2for1_es.jpg done")

# ══════════════════════════════════════════════════════════════
# 4. HAPPY HOUR ENGLISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['happy_hour'], 0.88)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 580, W, H], fill=(10, 10, 14))
center_shadow(draw, "Happy Hour", get_font(110, True), 390, WHITE)
center_shadow(draw, "just got smarter.", get_font(64, True), 510, ORANGE)
center_shadow(draw, "Real-time alerts. Know before you go.", get_font(34), 610, GRAY)
pill_button(draw, "GET THE APP  ·  dealeo.es", get_font(32, True), 720, width=680)
draw.text((60, 950), "Free · Alicante & Benidorm", fill=GRAY, font=get_font(26))

img.save(f'{OUT}/happyhour_en.jpg', quality=95)
posts.append('happyhour_en.jpg')
print("happyhour_en.jpg done")

# ══════════════════════════════════════════════════════════════
# 5. HAPPY HOUR SPANISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['happy_hour'], 0.88)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 580, W, H], fill=(10, 10, 14))
center_shadow(draw, "Happy Hour", get_font(110, True), 390, WHITE)
center_shadow(draw, "más inteligente.", get_font(78, True), 510, ORANGE)
center_shadow(draw, "Alertas en tiempo real. Sábelo antes de salir.", get_font(30), 615, GRAY)
pill_button(draw, "DESCARGA LA APP  ·  dealeo.es", get_font(30, True), 720, width=720)
draw.text((60, 950), "Gratis · Alicante & Benidorm", fill=GRAY, font=get_font(26))

img.save(f'{OUT}/happyhour_es.jpg', quality=95)
posts.append('happyhour_es.jpg')
print("happyhour_es.jpg done")

# ══════════════════════════════════════════════════════════════
# 6. FLASH DEAL ENGLISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['drinks_dark'], 0.9)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 590, W, H], fill=(10, 10, 14))
center_shadow(draw, "⚡ Flash Deal", get_font(90, True), 390, ORANGE)
center_shadow(draw, "Right now.", get_font(110, True), 480, WHITE)
center_shadow(draw, "Dealeo alerts you the second a deal drops.", get_font(32), 625, GRAY)
pill_button(draw, "GET ALERTS  ·  dealeo.es", get_font(32, True), 725, width=680)
draw.text((60, 950), "Free · Alicante & Benidorm", fill=GRAY, font=get_font(26))

img.save(f'{OUT}/flashdeal_en.jpg', quality=95)
posts.append('flashdeal_en.jpg')
print("flashdeal_en.jpg done")

# ══════════════════════════════════════════════════════════════
# 7. FLASH DEAL SPANISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['drinks_dark'], 0.9)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 590, W, H], fill=(10, 10, 14))
center_shadow(draw, "⚡ Flash Deal", get_font(90, True), 390, ORANGE)
center_shadow(draw, "Ahora mismo.", get_font(100, True), 480, WHITE)
center_shadow(draw, "Dealeo te avisa en el momento que hay una oferta.", get_font(30), 625, GRAY)
pill_button(draw, "ACTIVA ALERTAS  ·  dealeo.es", get_font(30, True), 725, width=740)
draw.text((60, 950), "Gratis · Alicante & Benidorm", fill=GRAY, font=get_font(26))

img.save(f'{OUT}/flashdeal_es.jpg', quality=95)
posts.append('flashdeal_es.jpg')
print("flashdeal_es.jpg done")

# ══════════════════════════════════════════════════════════════
# 8. BAR OWNERS ENGLISH
# ══════════════════════════════════════════════════════════════
bg = dark_overlay(bgs['bar_people'], 0.6)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
center_shadow(draw, "Own a bar?", get_font(100, True), 200, WHITE)
center_shadow(draw, "List your deals for free.", get_font(60, True), 330, ORANGE)

f_check = get_font(36)
items = [
    "Post deals in 60 seconds",
    "Reach tourists & locals",
    "No monthly fee",
    "QR redemption built in",
]
y = 470
for item in items:
    bbox = draw.textbbox((0,0), f"✓  {item}", font=f_check)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    shadow_text(draw, f"✓  {item}", f_check, x, y, WHITE)
    y += 62

pill_button(draw, "SIGN UP FREE  ·  dealeo.es", get_font(34, True), 760, width=720)
center_shadow(draw, "First 50 venues get 50% off forever.", get_font(28), 885, GRAY)

img.save(f'{OUT}/barowners_en.jpg', quality=95)
posts.append('barowners_en.jpg')
print("barowners_en.jpg done")

# ══════════════════════════════════════════════════════════════
# 9. BAR OWNERS SPANISH
# ══════════════════════════════════════════════════════════════
bg = dark_overlay(bgs['bar_people'], 0.6)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
center_shadow(draw, "¿Tienes un bar?", get_font(88, True), 200, WHITE)
center_shadow(draw, "Publica gratis tus ofertas.", get_font(54, True), 320, ORANGE)

f_check = get_font(36)
items = [
    "Publica en 60 segundos",
    "Llega a turistas y locales",
    "Sin cuota mensual",
    "Canje QR integrado",
]
y = 460
for item in items:
    bbox = draw.textbbox((0,0), f"✓  {item}", font=f_check)
    tw = bbox[2] - bbox[0]
    x = (W - tw) // 2
    shadow_text(draw, f"✓  {item}", f_check, x, y, WHITE)
    y += 62

pill_button(draw, "REGÍSTRATE GRATIS  ·  dealeo.es", get_font(32, True), 760, width=780)
center_shadow(draw, "Los primeros 50 locales: 50% dto. para siempre.", get_font(26), 885, GRAY)

img.save(f'{OUT}/barowners_es.jpg', quality=95)
posts.append('barowners_es.jpg')
print("barowners_es.jpg done")

# ══════════════════════════════════════════════════════════════
# 10. VISITING ALICANTE ENGLISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['spain_street'], 0.88)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 600, W, H], fill=(10, 10, 14))
center_shadow(draw, "Visiting Alicante?", get_font(82, True), 400, WHITE)
center_shadow(draw, "Find the best bar deals.", get_font(60, True), 510, ORANGE)
center_shadow(draw, "Happy hours · 2-for-1s · Flash deals", get_font(34), 620, GRAY)
pill_button(draw, "FREE APP  ·  dealeo.es", get_font(34, True), 730, width=640)
draw.text((60, 955), "Alicante & Benidorm", fill=GRAY, font=get_font(28))

img.save(f'{OUT}/alicante_en.jpg', quality=95)
posts.append('alicante_en.jpg')
print("alicante_en.jpg done")

# ══════════════════════════════════════════════════════════════
# 11. VISITING ALICANTE SPANISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['spain_street'], 0.88)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 600, W, H], fill=(10, 10, 14))
center_shadow(draw, "¿Visitando Alicante?", get_font(76, True), 400, WHITE)
center_shadow(draw, "Las mejores ofertas de bares.", get_font(54, True), 500, ORANGE)
center_shadow(draw, "Happy hours · 2x1s · Flash deals", get_font(34), 610, GRAY)
pill_button(draw, "APP GRATIS  ·  dealeo.es", get_font(34, True), 730, width=660)
draw.text((60, 955), "Alicante & Benidorm", fill=GRAY, font=get_font(28))

img.save(f'{OUT}/alicante_es.jpg', quality=95)
posts.append('alicante_es.jpg')
print("alicante_es.jpg done")

# ══════════════════════════════════════════════════════════════
# 12. BEACH BAR ENGLISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['beach_bar'], 0.88)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 600, W, H], fill=(10, 10, 14))
center_shadow(draw, "Best beach bars.", get_font(88, True), 400, WHITE)
center_shadow(draw, "Best deals.", get_font(88, True), 510, ORANGE)
center_shadow(draw, "All in one free app.", get_font(44), 630, GRAY)
pill_button(draw, "dealeo.es  →  Free Download", get_font(32, True), 740, width=700)
draw.text((60, 955), "Alicante & Benidorm", fill=GRAY, font=get_font(28))

img.save(f'{OUT}/beachbar_en.jpg', quality=95)
posts.append('beachbar_en.jpg')
print("beachbar_en.jpg done")

# ══════════════════════════════════════════════════════════════
# 13. BEACH BAR SPANISH
# ══════════════════════════════════════════════════════════════
bg = bottom_gradient(bgs['beach_bar'], 0.88)
img = bg.copy()
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 8], fill=ORANGE)
logo(draw)
draw.rectangle([0, 600, W, H], fill=(10, 10, 14))
center_shadow(draw, "Los mejores beach bars.", get_font(76, True), 400, WHITE)
center_shadow(draw, "Las mejores ofertas.", get_font(76, True), 500, ORANGE)
center_shadow(draw, "Todo en una app gratis.", get_font(44), 620, GRAY)
pill_button(draw, "dealeo.es  →  Descarga Gratis", get_font(30, True), 740, width=720)
draw.text((60, 955), "Alicante & Benidorm", fill=GRAY, font=get_font(28))

img.save(f'{OUT}/beachbar_es.jpg', quality=95)
posts.append('beachbar_es.jpg')
print("beachbar_es.jpg done")

print(f"\nAll {len(posts)} posts created!")
print(posts)
