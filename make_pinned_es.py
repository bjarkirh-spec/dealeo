from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math

W, H = 1080, 1080
OUT = r'C:/Users/bjark/OneDrive/Desktop/Dealeo/instagram-posts/pinned_es.png'

# ── Canvas ────────────────────────────────────────────────────────────────────
img = Image.new('RGB', (W, H), (10, 10, 16))
draw = ImageDraw.Draw(img)

# ── Glow orbs ────────────────────────────────────────────────────────────────
def add_glow(img, cx, cy, radius, color, strength=180):
    glow = Image.new('RGB', (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r in range(radius, 0, -4):
        alpha = int(strength * (1 - r / radius) ** 1.8)
        c = tuple(min(255, int(ch * alpha / 255)) for ch in color)
        gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)
    glow = glow.filter(ImageFilter.GaussianBlur(radius=60))
    img = Image.blend(img, glow, alpha=0.85)
    return img

img = add_glow(img, -30, 80, 420, (255, 100, 0), strength=160)
img = add_glow(img, W + 20, H - 60, 440, (0, 180, 150), strength=140)
draw = ImageDraw.Draw(img)

# ── Corner dots ───────────────────────────────────────────────────────────────
dot_r = 8
draw.ellipse([48, 48, 48+dot_r*2, 48+dot_r*2], fill=(255, 100, 0))
draw.ellipse([W-64, 48, W-64+dot_r*2, 48+dot_r*2], fill=(0, 200, 170))
draw.ellipse([48, H-64, 48+dot_r*2, H-64+dot_r*2], fill=(0, 200, 170))
draw.ellipse([W-64, H-64, W-64+dot_r*2, H-64+dot_r*2], fill=(255, 100, 0))

# ── Fonts ─────────────────────────────────────────────────────────────────────
def font(size, bold=False):
    try:
        path = "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def center_x(draw, text, f, y, fill):
    bb = draw.textbbox((0, 0), text, font=f)
    x = (W - (bb[2] - bb[0])) // 2
    draw.text((x, y), text, fill=fill, font=f)
    return bb[3] - bb[1]

# ── Top badge ─────────────────────────────────────────────────────────────────
badge_text = "LANZAMIENTO EN ALICANTE"
f_badge = font(22, bold=True)
bb = draw.textbbox((0, 0), badge_text, font=f_badge)
bw, bh = bb[2]-bb[0], bb[3]-bb[1]
bpad_x, bpad_y = 28, 14
bx = (W - bw - bpad_x*2) // 2
by = 100
draw.rounded_rectangle([bx, by, bx+bw+bpad_x*2, by+bh+bpad_y*2], radius=30, outline=(255, 100, 0), width=2)
draw.text((bx+bpad_x, by+bpad_y), badge_text, fill=(255, 100, 0), font=f_badge)

# ── Logo "dealeo" ─────────────────────────────────────────────────────────────
f_logo = font(110, bold=True)
logo_y = 200
# render "deal" in orange, "eo" in teal
part1, part2 = "deal", "eo"
bb1 = draw.textbbox((0, 0), part1, font=f_logo)
bb2 = draw.textbbox((0, 0), part2, font=f_logo)
total_w = (bb1[2]-bb1[0]) + (bb2[2]-bb2[0])
x1 = (W - total_w) // 2
x2 = x1 + (bb1[2]-bb1[0])
draw.text((x1, logo_y), part1, fill=(255, 107, 0), font=f_logo)
draw.text((x2, logo_y), part2, fill=(0, 200, 170), font=f_logo)

# ── Tagline ───────────────────────────────────────────────────────────────────
f_tag = font(32)
center_x(draw, "La app de ofertas para bares y restaurantes de Alicante.", f_tag, 340, (180, 180, 190))

# ── Divider ───────────────────────────────────────────────────────────────────
draw.line([(W//2-80, 410), (W//2+80, 410)], fill=(80, 80, 90), width=1)

# ── Main headline ─────────────────────────────────────────────────────────────
f_h1 = font(72, bold=True)
f_h2 = font(72, bold=True)
center_x(draw, "Estamos empezando.", f_h1, 440, (255, 255, 255))
# orange "empezando."
bb_line = draw.textbbox((0,0), "Estamos empezando.", font=f_h1)
line_w = bb_line[2]-bb_line[0]
# render just orange word
bb_full = draw.textbbox((0,0), "Estamos ", font=f_h1)
prefix_w = bb_full[2]-bb_full[0]
x_orange = (W - line_w) // 2 + prefix_w
draw.text((x_orange, 440), "empezando.", fill=(255, 107, 0), font=f_h2)

# ── Body text ─────────────────────────────────────────────────────────────────
f_body = font(30)
body_lines = [
    "Ofertas en vivo. Notificaciones en tiempo real.",
    "Happy hours, 2x1 y flash deals —",
    "justo cuando más los necesitas.",
]
y = 560
for line in body_lines:
    center_x(draw, line, f_body, y, (150, 150, 165))
    y += 48

# ── Pill tags ─────────────────────────────────────────────────────────────────
tags = [("Publicar oferta", True), ("Rastrear canjes", False), ("Canje QR", False)]
f_pill = font(24, bold=False)
pill_h = 48
pill_gap = 18
pill_pad = 28

# measure total width
total_pill_w = 0
pill_widths = []
for label, highlighted in tags:
    bb = draw.textbbox((0,0), label, font=f_pill)
    pw = bb[2]-bb[0] + pill_pad*2
    pill_widths.append(pw)
    total_pill_w += pw
total_pill_w += pill_gap * (len(tags)-1)

px = (W - total_pill_w) // 2
py = 730
for i, (label, highlighted) in enumerate(tags):
    pw = pill_widths[i]
    color = (255, 107, 0) if highlighted else (100, 100, 115)
    draw.rounded_rectangle([px, py, px+pw, py+pill_h], radius=pill_h//2, outline=color, width=2)
    bb = draw.textbbox((0,0), label, font=f_pill)
    tx = px + (pw - (bb[2]-bb[0])) // 2
    ty = py + (pill_h - (bb[3]-bb[1])) // 2
    draw.text((tx, ty), label, fill=color, font=f_pill)
    px += pw + pill_gap

# ── Bottom URL ────────────────────────────────────────────────────────────────
f_url = font(32)
center_x(draw, "dealeo.es", f_url, 860, (0, 200, 170))

# ── Rounded corners ───────────────────────────────────────────────────────────
mask = Image.new('L', (W, H), 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle([0, 0, W, H], radius=40, fill=255)
img.putalpha(mask)

img.save(OUT, quality=97)
print("Saved:", OUT)
