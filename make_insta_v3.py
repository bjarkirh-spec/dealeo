"""
Generate 2 Instagram posts for Dealeo and email them.
pip install pillow requests
"""

import os, base64, json, urllib.request, urllib.error
from PIL import Image, ImageDraw, ImageFont

OUT = r"C:\Users\bjark\OneDrive\Desktop\dealeo_posts_v3"
os.makedirs(OUT, exist_ok=True)

W, H = 1080, 1080
ORANGE = (255, 107, 53)
WHITE  = (255, 255, 255)

RESEND_KEY = open(r"C:\Users\bjark\OneDrive\Desktop\dealeo\.env.local").read()
for line in RESEND_KEY.splitlines():
    if line.startswith("RESEND_API_KEY="):
        RESEND_KEY = line.split("=", 1)[1].strip()
        break

def fnt(size, bold=False):
    for path in [
        f"C:/Windows/Fonts/{'arialbd' if bold else 'arial'}.ttf",
        f"C:/Windows/Fonts/{'calibrib' if bold else 'calibri'}.ttf",
    ]:
        if os.path.exists(path): return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def get_photo(photo_id):
    cache = os.path.join(OUT, f"_bg_{photo_id}.jpg")
    if not os.path.exists(cache):
        url = f"https://images.unsplash.com/{photo_id}?w=1080&h=1080&fit=crop&auto=format&q=90"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as r:
            with open(cache, "wb") as f: f.write(r.read())
    return Image.open(cache).convert("RGB").resize((W, H))

def dark_gradient(img, top_alpha=80, bottom_alpha=220):
    overlay = Image.new("RGBA", (W, H))
    draw = ImageDraw.Draw(overlay)
    for y in range(H):
        a = int(top_alpha + (bottom_alpha - top_alpha) * (y / H))
        draw.line([(0, y), (W, y)], fill=(0, 0, 0, a))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

def draw_logo(draw):
    draw.text((64, 64), "●", font=fnt(60, bold=True), fill=ORANGE)
    draw.text((126, 72), "Dealeo", font=fnt(54, bold=True), fill=WHITE)

def pill(draw, text, x, y):
    f = fnt(28, bold=True)
    bb = draw.textbbox((0,0), text, font=f)
    tw, th = bb[2]-bb[0], bb[3]-bb[1]
    draw.rounded_rectangle([x, y, x+tw+56, y+th+28], radius=40, fill=ORANGE)
    draw.text((x+28, y+14), text, font=f, fill=WHITE)
    return y + th + 28 + 28

def accent_line(draw, x, y):
    draw.rounded_rectangle([x, y, x+110, y+6], radius=3, fill=ORANGE)
    return y + 26

# ── POST 1 (EN) — consumer, going out tonight ───────────────────────────
def post1():
    bg = get_photo("photo-1566417713940-fe7c737a9ef2")  # lively bar crowd
    bg = dark_gradient(bg, top_alpha=50, bottom_alpha=230)
    draw = ImageDraw.Draw(bg)
    draw_logo(draw)

    y = pill(draw, "ALICANTE  &  BENIDORM", 64, 168)
    y = accent_line(draw, 64, y)

    draw.text((64, y), "Going out", font=fnt(118, bold=True), fill=WHITE)
    y += 120
    draw.text((64, y), "tonight?", font=fnt(118, bold=True), fill=ORANGE)
    y += 130

    draw.text((64, y), "Find the best happy hours near you.", font=fnt(42), fill=(220,220,220))
    y += 62
    draw.text((64, y), "60+ bars  ·  Updated daily  ·  Free", font=fnt(40), fill=(190,190,190))

    # Bottom
    draw.rectangle([(0, H-160), (W, H)], fill=(0,0,0))
    draw.text((64, H-128), "dealeo.es", font=fnt(56, bold=True), fill=WHITE)
    draw.text((64, H-60), "Open the app or visit on your browser", font=fnt(34), fill=(180,180,180))

    path = os.path.join(OUT, "post1_en.png")
    bg.save(path, quality=95)
    print(f"  Saved: {path}")
    return path

# ── POST 2 (ES) — Spanish consumer, evening vibe ────────────────────────
def post2():
    bg = get_photo("photo-1514362545857-3bc16c4c7d1b")  # cocktails close-up
    bg = dark_gradient(bg, top_alpha=40, bottom_alpha=215)
    draw = ImageDraw.Draw(bg)
    draw_logo(draw)

    y = pill(draw, "HAPPY HOUR  ·  CADA DIA", 64, 168)
    y = accent_line(draw, 64, y)

    draw.text((64, y), "Las mejores", font=fnt(104, bold=True), fill=WHITE)
    y += 112
    draw.text((64, y), "ofertas de", font=fnt(104, bold=True), fill=WHITE)
    y += 112
    draw.text((64, y), "tu ciudad.", font=fnt(104, bold=True), fill=ORANGE)
    y += 130

    draw.text((64, y), "Descubre bares en Alicante y Benidorm.", font=fnt(40), fill=(220,220,220))
    y += 58
    draw.text((64, y), "Gratis  ·  Sin registro  ·  Actualizado hoy", font=fnt(38), fill=(190,190,190))

    # Bottom bar with orange accent
    draw.rectangle([(0, H-160), (W, H)], fill=ORANGE)
    draw.text((64, H-128), "Descarga Dealeo — es gratis", font=fnt(48, bold=True), fill=WHITE)
    draw.text((64, H-64), "dealeo.es", font=fnt(40, bold=True), fill=(255,255,255))

    path = os.path.join(OUT, "post2_es.png")
    bg.save(path, quality=95)
    print(f"  Saved: {path}")
    return path

# ── Generate ─────────────────────────────────────────────────────────────
print("Generating posts...\n")
p1 = post1()
p2 = post2()

# ── Email ────────────────────────────────────────────────────────────────
print("\nEmailing to bjarkirh@gmail.com...")

attachments = []
for path in [p1, p2]:
    with open(path, "rb") as f:
        attachments.append({
            "filename": os.path.basename(path),
            "content": base64.b64encode(f.read()).decode(),
        })

payload = {
    "from": "hello@dealeo.es",
    "to": ["bjarkirh@gmail.com"],
    "subject": "Dealeo — 2 Instagram posts ready",
    "text": "Your 2 Instagram posts are attached (1080x1080 PNG). Post 1 is in English, post 2 in Spanish.",
    "html": """
    <h2 style="color:#ff6b35">Dealeo Instagram Posts</h2>
    <p>2 images attached (1080x1080, ready to post):</p>
    <ul>
      <li><b>post1_en.png</b> — English: "Going out tonight?" (consumer)</li>
      <li><b>post2_es.png</b> — Spanish: "Las mejores ofertas de tu ciudad" (consumer)</li>
    </ul>
    <p style="color:#888">Also saved at: C:\\Users\\bjark\\OneDrive\\Desktop\\dealeo_posts_v3\\</p>
    """,
    "attachments": attachments,
}

req = urllib.request.Request(
    "https://api.resend.com/emails",
    data=json.dumps(payload).encode(),
    method="POST",
)
req.add_header("Authorization", f"Bearer {RESEND_KEY}")
req.add_header("Content-Type", "application/json")
req.add_header("User-Agent", "Mozilla/5.0")

try:
    with urllib.request.urlopen(req) as r:
        resp = json.loads(r.read())
        print(f"Sent! ID: {resp.get('id')}")
except urllib.error.HTTPError as e:
    print(f"Error {e.code}: {e.read().decode()}")
