"""
Generate 4 eye-catching Instagram posts (1080x1080) for Dealeo.
Uses real Unsplash photos as backgrounds with gradient overlays.
pip install pillow requests
"""

import os, urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = r"C:\Users\bjark\OneDrive\Desktop\dealeo_posts_v2"
os.makedirs(OUT, exist_ok=True)

W, H = 1080, 1080
ORANGE = (255, 107, 53)
WHITE  = (255, 255, 255)
BLACK  = (0, 0, 0)

# ── fonts ──────────────────────────────────────────────────────────────
def fnt(size, bold=False):
    for path in [
        f"C:/Windows/Fonts/{'arialbd' if bold else 'arial'}.ttf",
        f"C:/Windows/Fonts/{'calibrib' if bold else 'calibri'}.ttf",
    ]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

# ── download Unsplash photo ─────────────────────────────────────────────
def get_photo(photo_id, w=1080, h=1080):
    cache = os.path.join(OUT, f"_bg_{photo_id}.jpg")
    if not os.path.exists(cache):
        url = f"https://images.unsplash.com/{photo_id}?w={w}&h={h}&fit=crop&auto=format&q=90"
        print(f"  Downloading background {photo_id}...")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as r:
            with open(cache, "wb") as f:
                f.write(r.read())
    img = Image.open(cache).convert("RGB").resize((W, H))
    return img

# ── gradient overlay ───────────────────────────────────────────────────
def dark_gradient(img, top_alpha=180, bottom_alpha=230):
    """Dark gradient from top to bottom over the photo."""
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for y in range(H):
        a = int(top_alpha + (bottom_alpha - top_alpha) * (y / H))
        draw.line([(0, y), (W, y)], fill=(0, 0, 0, a))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

def orange_bottom(img, height=220):
    """Solid orange bar at the bottom."""
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    # Gradient fade from transparent to orange
    for y in range(height):
        a = int(255 * (y / height) ** 0.6)
        r, g, b = ORANGE
        draw.line([(0, H - height + y), (W, H - height + y)], fill=(r, g, b, a))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

# ── text with auto-wrap ────────────────────────────────────────────────
def draw_text_wrapped(draw, text, x, y, font, fill, max_width, line_spacing=16):
    words = text.split()
    lines, line = [], []
    for word in words:
        test = " ".join(line + [word])
        if draw.textlength(test, font=font) <= max_width:
            line.append(word)
        else:
            if line: lines.append(" ".join(line))
            line = [word]
    if line: lines.append(" ".join(line))
    for i, l in enumerate(lines):
        draw.text((x, y + i * (font.size + line_spacing)), l, font=font, fill=fill)
    return y + len(lines) * (font.size + line_spacing)

# ── orange accent pill ─────────────────────────────────────────────────
def draw_pill(draw, text, x, y, font, pad_x=28, pad_y=14):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    draw.rounded_rectangle([x, y, x+tw+pad_x*2, y+th+pad_y*2], radius=40, fill=ORANGE)
    draw.text((x+pad_x, y+pad_y), text, font=font, fill=WHITE)
    return y + th + pad_y*2 + 24

# ── thin orange line ───────────────────────────────────────────────────
def draw_line(draw, x, y, length=120, thickness=6):
    draw.rounded_rectangle([x, y, x+length, y+thickness], radius=3, fill=ORANGE)

# ── logo in corner ─────────────────────────────────────────────────────
def draw_logo(draw, x=64, y=60):
    dot = fnt(64, bold=True)
    logo = fnt(56, bold=True)
    draw.text((x, y), "●", font=dot, fill=ORANGE)
    draw.text((x+62, y+6), "dealeo", font=logo, fill=WHITE)

# ══════════════════════════════════════════════════════════════════════
#  POST 1 (EN) — Consumer: Tonight's best happy hours
# ══════════════════════════════════════════════════════════════════════
def post1_en():
    bg = get_photo("photo-1572116469696-31de0f17cc34")  # warm bar interior
    bg = dark_gradient(bg, top_alpha=60, bottom_alpha=210)
    bg = orange_bottom(bg, height=260)
    draw = ImageDraw.Draw(bg)
    draw_logo(draw)

    # Top pill
    y = draw_pill(draw, "HAPPY HOUR  ·  ALICANTE & BENIDORM", 64, 180, fnt(28, bold=True))

    # Big headline
    y += 20
    draw_line(draw, 64, y)
    y += 28
    y = draw_text_wrapped(draw, "Tonight's best\nhappy hours\nin one place.", 64, y, fnt(110, bold=True), WHITE, W-128, line_spacing=8)

    # Sub
    y += 20
    draw.text((64, y), "60+ bars  ·  Live deals  ·  Free to use", font=fnt(40), fill=(220, 220, 220))

    # Bottom strip
    draw.text((64, H-148), "dealeo.es", font=fnt(52, bold=True), fill=WHITE)
    draw.text((64, H-84), "Download free on iOS & Android", font=fnt(36), fill=(255,255,255,200))

    path = os.path.join(OUT, "post1_en.png")
    bg.save(path)
    print(f"  OK: {path}")

# ══════════════════════════════════════════════════════════════════════
#  POST 2 (EN) — Deal spotlight: cocktails
# ══════════════════════════════════════════════════════════════════════
def post2_en():
    bg = get_photo("photo-1551024709-8f23befc6f87")  # cocktail bar
    bg = dark_gradient(bg, top_alpha=40, bottom_alpha=240)
    bg = orange_bottom(bg, height=280)
    draw = ImageDraw.Draw(bg)
    draw_logo(draw)

    y = draw_pill(draw, "DEAL SPOTLIGHT", 64, 180, fnt(30, bold=True))

    y += 30
    draw_line(draw, 64, y, length=100)
    y += 32

    draw.text((64, y), "2 Cocktails", font=fnt(120, bold=True), fill=WHITE)
    y += 125
    draw.text((64, y), "for €12", font=fnt(120, bold=True), fill=ORANGE)
    y += 140

    draw.text((64, y), "26 Cocktail Room  ·  Centro, Alicante", font=fnt(40), fill=(220,220,220))
    y += 58
    draw.text((64, y), "Mon–Sat  ·  18:00 – 21:00", font=fnt(38), fill=(200,200,200))

    draw.text((64, H-148), "Find this deal at dealeo.es", font=fnt(48, bold=True), fill=WHITE)
    draw.text((64, H-84), "Happy hours updated daily", font=fnt(34), fill=(255,255,255,200))

    path = os.path.join(OUT, "post2_en.png")
    bg.save(path)
    print(f"  OK: {path}")

# ══════════════════════════════════════════════════════════════════════
#  POST 3 (ES) — Consumer: Las mejores ofertas
# ══════════════════════════════════════════════════════════════════════
def post3_es():
    bg = get_photo("photo-1575444758702-4a6b9222336e")  # dark bar with bottles
    bg = dark_gradient(bg, top_alpha=60, bottom_alpha=215)
    bg = orange_bottom(bg, height=260)
    draw = ImageDraw.Draw(bg)
    draw_logo(draw)

    y = draw_pill(draw, "HAPPY HOUR  ·  ALICANTE Y BENIDORM", 64, 180, fnt(28, bold=True))

    y += 20
    draw_line(draw, 64, y)
    y += 28
    y = draw_text_wrapped(draw, "Las mejores\nofertas de\ncopas, aquí.", 64, y, fnt(110, bold=True), WHITE, W-128, line_spacing=8)

    y += 20
    draw.text((64, y), "Más de 60 bares  ·  Gratis  ·  Sin registro", font=fnt(38), fill=(220,220,220))

    draw.text((64, H-148), "dealeo.es", font=fnt(52, bold=True), fill=WHITE)
    draw.text((64, H-84), "Descárgalo gratis en iOS y Android", font=fnt(36), fill=(255,255,255,200))

    path = os.path.join(OUT, "post3_es.png")
    bg.save(path)
    print(f"  OK: {path}")

# ══════════════════════════════════════════════════════════════════════
#  POST 4 (ES) — Bar owner
# ══════════════════════════════════════════════════════════════════════
def post4_es():
    bg = get_photo("photo-1569529465841-dfecdab7503b")  # spirits/bottles
    bg = dark_gradient(bg, top_alpha=80, bottom_alpha=230)
    bg = orange_bottom(bg, height=260)
    draw = ImageDraw.Draw(bg)
    draw_logo(draw)

    y = draw_pill(draw, "PARA BARES Y LOCALES", 64, 180, fnt(30, bold=True))

    y += 30
    draw_line(draw, 64, y, length=100)
    y += 36

    draw.text((64, y), "¿Tienes un bar?", font=fnt(96, bold=True), fill=WHITE)
    y += 110
    draw.text((64, y), "Llega a más clientes.", font=fnt(80, bold=True), fill=ORANGE)
    y += 105
    draw.text((64, y), "Gratis.", font=fnt(80, bold=True), fill=WHITE)
    y += 100

    for line in ["✓  Publica tu happy hour en minutos", "✓  Locales y turistas ven tus ofertas", "✓  Sin comisión, siempre gratis"]:
        draw.text((64, y), line, font=fnt(36), fill=(215,215,215))
        y += 52

    draw.text((64, H-148), "dealeo.es  →  Para locales", font=fnt(48, bold=True), fill=WHITE)
    draw.text((64, H-84), "Empieza gratis hoy", font=fnt(34), fill=(255,255,255,200))

    path = os.path.join(OUT, "post4_es.png")
    bg.save(path)
    print(f"  OK: {path}")

# ── run ────────────────────────────────────────────────────────────────
print("Generating Dealeo Instagram posts v2...\n")
post1_en()
post2_en()
post3_es()
post4_es()
print(f"\nDone! Saved to {OUT}")
