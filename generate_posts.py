"""
Generate Instagram post PNGs (1080x1080) for Dealeo.
Requires: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os, textwrap

OUT = r"C:\Users\bjark\OneDrive\Desktop\dealeo_posts"
os.makedirs(OUT, exist_ok=True)

ORANGE  = (255, 107, 53)
WHITE   = (255, 255, 255)
DARK    = (30,  30,  30)
LIGHT   = (245, 245, 245)
GREY    = (120, 120, 120)

W, H = 1080, 1080

def load_font(size, bold=False):
    """Try system fonts, fall back to default."""
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibrib.ttf" if bold else r"C:\Windows\Fonts\calibri.ttf",
        r"C:\Windows\Fonts\verdanab.ttf" if bold else r"C:\Windows\Fonts\verdana.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def draw_rounded_rect(draw, xy, radius, fill):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill)

def wrap(text, width):
    return textwrap.fill(text, width)

def make_post(filename, bg_color, header, title, body_lines, footer, accent=ORANGE):
    img  = Image.new("RGB", (W, H), bg_color)
    draw = ImageDraw.Draw(img)

    # Top accent bar
    draw.rectangle([0, 0, W, 14], fill=accent)

    # Logo area
    logo_font  = load_font(72, bold=True)
    dot_font   = load_font(80, bold=True)
    draw.text((80, 60), "●", font=dot_font, fill=accent)
    draw.text((150, 68), "dealeo", font=logo_font, fill=DARK)

    # Header chip
    chip_font = load_font(36)
    chip_text = header
    bbox = draw.textbbox((0, 0), chip_text, font=chip_font)
    cw = bbox[2] - bbox[0] + 48
    ch = bbox[3] - bbox[1] + 24
    draw_rounded_rect(draw, (80, 200, 80 + cw, 200 + ch), 30, accent)
    draw.text((80 + 24, 200 + 12), chip_text, font=chip_font, fill=WHITE)

    # Title
    title_font = load_font(88, bold=True)
    y = 310
    for line in textwrap.wrap(title, width=18):
        draw.text((80, y), line, font=title_font, fill=DARK)
        y += 105

    # Body lines
    body_font = load_font(46)
    y += 30
    for line in body_lines:
        draw.text((80, y), line, font=body_font, fill=GREY)
        y += 68

    # Bottom accent strip
    draw.rectangle([0, H - 140, W, H], fill=accent)
    foot_font = load_font(42, bold=True)
    draw.text((80, H - 100), footer, font=foot_font, fill=WHITE)
    draw.text((W - 280, H - 100), "dealeo.es", font=foot_font, fill=WHITE)

    path = os.path.join(OUT, filename)
    img.save(path, "PNG")
    print(f"  Saved: {path}")

def make_spotlight(filename, deal_text, bar, time_info, price_tag):
    """Dark-background bar spotlight post."""
    img  = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)

    # Orange gradient top band
    for i in range(220):
        alpha = int(255 * (1 - i / 220))
        draw.rectangle([0, i, W, i+1], fill=(255, 107, 53, alpha))

    draw.rectangle([0, 0, W, 10], fill=ORANGE)

    # Logo
    logo_font = load_font(64, bold=True)
    dot_font  = load_font(72, bold=True)
    draw.text((80, 55), "●", font=dot_font, fill=WHITE)
    draw.text((148, 62), "dealeo", font=logo_font, fill=WHITE)

    # Price tag badge
    badge_font = load_font(44, bold=True)
    bb = draw.textbbox((0,0), price_tag, font=badge_font)
    bw = bb[2]-bb[0]+56
    draw_rounded_rect(draw, (80, 210, 80+bw, 265), 28, ORANGE)
    draw.text((80+28, 217), price_tag, font=badge_font, fill=WHITE)

    # Deal title
    t_font = load_font(90, bold=True)
    y = 310
    for line in textwrap.wrap(deal_text, width=17):
        draw.text((80, y), line, font=t_font, fill=WHITE)
        y += 110

    # Bar name + time
    sub_font = load_font(48)
    y += 20
    draw.text((80, y),      f"📍 {bar}",      font=sub_font, fill=LIGHT)
    draw.text((80, y + 66), f"🕐 {time_info}", font=sub_font, fill=LIGHT)

    # Bottom strip
    draw.rectangle([0, H-140, W, H], fill=ORANGE)
    foot_font = load_font(42, bold=True)
    draw.text((80, H-100), "Find it on Dealeo →", font=foot_font, fill=WHITE)
    draw.text((W-280, H-100), "dealeo.es", font=foot_font, fill=WHITE)

    path = os.path.join(OUT, filename)
    img.save(path, "PNG")
    print(f"  Saved: {path}")

print("Generating Dealeo Instagram posts...\n")

# Post 1 EN — App intro
make_post(
    "post1_en_app_intro.png",
    bg_color=WHITE,
    header="Happy hours · Alicante & Benidorm",
    title="All the best drink deals in one place",
    body_lines=[
        "✓  Browse 60+ bars near you",
        "✓  Filter by live deals & happy hours",
        "✓  Show QR at the bar — done",
        "✓  Free. No sign-up needed to browse",
    ],
    footer="Download now →",
)

# Post 1 ES — App intro
make_post(
    "post1_es_app_intro.png",
    bg_color=WHITE,
    header="Happy hours · Alicante y Benidorm",
    title="Las mejores ofertas de copas en un sitio",
    body_lines=[
        "✓  Más de 60 bares cerca de ti",
        "✓  Filtra por ofertas en vivo y happy hours",
        "✓  Muestra el QR en el bar — listo",
        "✓  Gratis. Sin registro para explorar",
    ],
    footer="Descárgalo ahora →",
)

# Post 2 — Bar spotlight
make_spotlight(
    "post2_en_spotlight_26cocktail.png",
    deal_text="2 Cocktails for €14",
    bar="26 Cocktail Room · Centro, Alicante",
    time_info="Mon–Sat  18:00–21:00",
    price_tag="2 Cocktails €14",
)

# Post 2 ES
make_spotlight(
    "post2_es_spotlight_26cocktail.png",
    deal_text="2 Cócteles por €14",
    bar="26 Cocktail Room · Centro, Alicante",
    time_info="Lun–Sab  18:00–21:00",
    price_tag="2 Cócteles €14",
)

# Post 3 EN — How it works
make_post(
    "post3_en_how_it_works.png",
    bg_color=LIGHT,
    header="How it works",
    title="Find a deal in 30 seconds",
    body_lines=[
        "1️⃣  Open dealeo.es",
        "2️⃣  Browse happy hours near you",
        "3️⃣  Tap Explore → show QR at bar",
        "4️⃣  Enjoy your deal 🍻",
    ],
    footer="No printing. No vouchers. Just your phone.",
)

# Post 3 ES — How it works
make_post(
    "post3_es_how_it_works.png",
    bg_color=LIGHT,
    header="Cómo funciona",
    title="Encuentra una oferta en 30 segundos",
    body_lines=[
        "1️⃣  Abre dealeo.es",
        "2️⃣  Busca happy hours cerca de ti",
        "3️⃣  Pulsa Explorar → muestra QR",
        "4️⃣  Disfruta tu oferta 🍻",
    ],
    footer="Sin imprimir. Sin cupones. Solo tu móvil.",
)

# Post 4 EN — FOMO/urgency
make_post(
    "post4_en_fomo.png",
    bg_color=WHITE,
    header="Happening right now ⏰",
    title="Still paying full price?",
    body_lines=[
        "🍺  Pints from €3",
        "🍹  Cocktails from €6",
        "🥂  2-for-1 drinks",
        "📍  Alicante & Benidorm",
    ],
    footer="Check dealeo.es now →",
)

# Post 4 ES — FOMO/urgency
make_post(
    "post4_es_fomo.png",
    bg_color=WHITE,
    header="Pasando ahora mismo ⏰",
    title="¿Sigues pagando precio completo?",
    body_lines=[
        "🍺  Cervezas desde €3",
        "🍹  Cócteles desde €6",
        "🥂  2x1 en copas",
        "📍  Alicante y Benidorm",
    ],
    footer="Mira dealeo.es ahora →",
)

# Post 5 EN — Bar owners
make_post(
    "post5_en_bar_owners.png",
    bg_color=DARK,
    header="For bar & venue owners",
    title="Reach more customers for free",
    body_lines=[
        "✓  List your happy hour in minutes",
        "✓  Locals + tourists see your deals",
        "✓  Real-time analytics dashboard",
        "✓  No commission. Always free to list.",
    ],
    footer="dealeo.es → For venues",
    accent=ORANGE,
)

# Post 5 ES — Bar owners
make_post(
    "post5_es_bar_owners.png",
    bg_color=DARK,
    header="Para bares y locales",
    title="Más clientes. Gratis.",
    body_lines=[
        "✓  Publica tu happy hour en minutos",
        "✓  Locales y turistas ven tus ofertas",
        "✓  Panel de analíticas en tiempo real",
        "✓  Sin comisión. Siempre gratis.",
    ],
    footer="dealeo.es → Para locales",
    accent=ORANGE,
)

print(f"\nDone! All posts saved to:\n  {OUT}")
