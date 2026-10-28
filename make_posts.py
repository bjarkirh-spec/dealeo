from PIL import Image, ImageDraw, ImageFont
import os

OUT = r'C:/Users/bjark/OneDrive/Desktop/Dealeo/instagram-posts'
W, H = 1080, 1350

DARK       = (18, 18, 18)
ORANGE     = (255, 100, 0)
ORANGE_BG  = (230, 88, 0)
WHITE      = (255, 255, 255)
GRAY       = (160, 160, 160)
LIGHT_GRAY = (210, 210, 210)

FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_REG  = "C:/Windows/Fonts/arial.ttf"

def fnt(size, bold=True):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)

def center_text(draw, text, y, font, color, line_spacing=12):
    lines = text.split('\n')
    current_y = y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        lw = bbox[2] - bbox[0]
        lh = bbox[3] - bbox[1]
        x = (W - lw) // 2
        draw.text((x, current_y), line, font=font, fill=color)
        current_y += lh + line_spacing
    return current_y

def wrap_center(draw, text, y, font, color, max_w=880, line_spacing=14):
    words = text.split()
    lines = []
    current = []
    for word in words:
        test = ' '.join(current + [word])
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] > max_w and current:
            lines.append(' '.join(current))
            current = [word]
        else:
            current.append(word)
    if current:
        lines.append(' '.join(current))
    current_y = y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        lw = bbox[2] - bbox[0]
        lh = bbox[3] - bbox[1]
        x = (W - lw) // 2
        draw.text((x, current_y), line, font=font, fill=color)
        current_y += lh + line_spacing
    return current_y

def orange_pill(draw, text, cx, cy, font, pad_x=40, pad_y=18):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    rx = cx - tw // 2 - pad_x
    ry = cy - th // 2 - pad_y
    rw = cx + tw // 2 + pad_x
    rh = cy + th // 2 + pad_y
    draw.rounded_rectangle([rx, ry, rw, rh], radius=30, fill=ORANGE)
    draw.text((cx - tw // 2, cy - th // 2), text, font=font, fill=WHITE)

def dark_pill(draw, text, cx, cy, font, pad_x=30, pad_y=14):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    rx = cx - tw // 2 - pad_x
    ry = cy - th // 2 - pad_y
    rw = cx + tw // 2 + pad_x
    rh = cy + th // 2 + pad_y
    draw.rounded_rectangle([rx, ry, rw, rh], radius=24, fill=(40, 40, 40))
    draw.text((cx - tw // 2, cy - th // 2), text, font=font, fill=WHITE)

def bottom_bar(draw, text='dealeo.es'):
    draw.rectangle([0, H - 70, W, H], fill=(30, 30, 30))
    f = fnt(30, bold=False)
    bbox = draw.textbbox((0, 0), text, font=f)
    lw = bbox[2] - bbox[0]
    draw.text(((W - lw) // 2, H - 52), text, font=f, fill=ORANGE)

def orange_bottom_bar(draw, text):
    draw.rectangle([0, H - 100, W, H], fill=ORANGE)
    f = fnt(40)
    bbox = draw.textbbox((0, 0), text, font=f)
    lw = bbox[2] - bbox[0]
    draw.text(((W - lw) // 2, H - 78), text, font=f, fill=WHITE)

# POST 1: Spanish pinned version
def make_pinned_es():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 120
    f_logo = fnt(100)
    bbox = draw.textbbox((0, 0), 'dealeo', font=f_logo)
    lw = bbox[2] - bbox[0]
    draw.text(((W - lw) // 2, y), 'dealeo', font=f_logo, fill=ORANGE)
    y += bbox[3] - bbox[1] + 20

    f_tag = fnt(28, bold=False)
    y = wrap_center(draw, 'La app de ofertas para bares y restaurantes en Alicante.', y, f_tag, GRAY, line_spacing=10)
    y += 50

    f_h = fnt(90)
    y = center_text(draw, 'Estamos\nempezando.', y, f_h, WHITE, line_spacing=8)
    y += 50

    f_desc = fnt(34, bold=False)
    y = center_text(draw, 'Ofertas en vivo. Notificaciones push en\ntiempo real. Happy hours, 2x1 y ofertas\nflash, justo cuando las necesitas.', y, f_desc, LIGHT_GRAY, line_spacing=14)
    y += 60

    pill_f = fnt(26)
    pills = ['En Vivo', 'Seguimiento', 'QR']
    spacing = W // (len(pills) + 1)
    for i, p in enumerate(pills):
        cx = spacing * (i + 1)
        dark_pill(draw, p, cx, y + 20, pill_f)
    y += 90

    draw.rectangle([0, H - 80, W, H], fill=ORANGE)
    f_web = fnt(34)
    bbox = draw.textbbox((0, 0), 'dealeo.es', font=f_web)
    lw = bbox[2] - bbox[0]
    draw.text(((W - lw) // 2, H - 60), 'dealeo.es', font=f_web, fill=WHITE)

    img.save(f'{OUT}/pinned_es.jpg', quality=95)
    print('pinned_es.jpg done')

# POST 2: Happy Hour EN
def make_happy_hour_en():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 140
    y = center_text(draw, 'Stop missing out.', y, fnt(32, bold=False), GRAY)
    y += 30
    y = center_text(draw, 'Happy\nHour', y, fnt(130), ORANGE, line_spacing=0)
    y += 20
    y = center_text(draw, 'just got smarter.', y, fnt(58), WHITE)
    y += 70
    y = wrap_center(draw, 'Dealeo notifies you the moment your favourite bar drops a deal.', y, fnt(36, bold=False), LIGHT_GRAY, line_spacing=14)
    y += 80
    orange_pill(draw, 'GET THE DEALEO APP', W // 2, y, fnt(34))
    bottom_bar(draw)
    img.save(f'{OUT}/happy_hour_en.jpg', quality=95)
    print('happy_hour_en.jpg done')

# POST 3: Happy Hour ES
def make_happy_hour_es():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 140
    y = center_text(draw, 'No te lo pierdas mas.', y, fnt(32, bold=False), GRAY)
    y += 30
    y = center_text(draw, 'Happy\nHour', y, fnt(130), ORANGE, line_spacing=0)
    y += 20
    y = center_text(draw, 'en tu movil.', y, fnt(58), WHITE)
    y += 70
    y = wrap_center(draw, 'Dealeo te avisa en el momento en que tu bar favorito lanza una oferta.', y, fnt(36, bold=False), LIGHT_GRAY, line_spacing=14)
    y += 80
    orange_pill(draw, 'DESCARGA DEALEO', W // 2, y, fnt(34))
    bottom_bar(draw)
    img.save(f'{OUT}/happy_hour_es.jpg', quality=95)
    print('happy_hour_es.jpg done')

# POST 4: Flash Deals EN
def make_flash_en():
    img = Image.new('RGB', (W, H), ORANGE_BG)
    draw = ImageDraw.Draw(img)

    y = 120
    y = center_text(draw, 'Limited time.', y, fnt(36, bold=False), (255, 220, 180))
    y += 20
    y = center_text(draw, 'Flash\nDeals.', y, fnt(150), WHITE, line_spacing=-10)
    y += 40
    y = wrap_center(draw, 'Real deals. Right now. Open Dealeo and grab them before they are gone.', y, fnt(42, bold=False), WHITE, line_spacing=16)
    y += 80
    dark_pill(draw, 'dealeo.es', W // 2, y, fnt(36), pad_x=50, pad_y=20)
    img.save(f'{OUT}/flash_deals_en.jpg', quality=95)
    print('flash_deals_en.jpg done')

# POST 5: Flash Deals ES
def make_flash_es():
    img = Image.new('RGB', (W, H), ORANGE_BG)
    draw = ImageDraw.Draw(img)

    y = 120
    y = center_text(draw, 'Tiempo limitado.', y, fnt(36, bold=False), (255, 220, 180))
    y += 20
    y = center_text(draw, 'Ofertas\nFlash.', y, fnt(150), WHITE, line_spacing=-10)
    y += 40
    y = wrap_center(draw, 'Ofertas reales. Ahora mismo. Abre Dealeo y aprovechalas antes de que se agoten.', y, fnt(42, bold=False), WHITE, line_spacing=16)
    y += 80
    dark_pill(draw, 'dealeo.es', W // 2, y, fnt(36), pad_x=50, pad_y=20)
    img.save(f'{OUT}/flash_deals_es.jpg', quality=95)
    print('flash_deals_es.jpg done')

# POST 6: Free EN
def make_free_en():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 200
    y = center_text(draw, 'Free.', y, fnt(160), ORANGE)
    y += 10
    y = center_text(draw, 'Always.', y, fnt(72), WHITE)
    y += 80
    y = center_text(draw, 'No subscriptions.\nNo hidden fees.\nJust great bar deals in\nAlicante & Benidorm.', y, fnt(38, bold=False), LIGHT_GRAY, line_spacing=18)
    y += 80
    orange_pill(draw, 'GET THE DEALEO APP', W // 2, y, fnt(34))
    bottom_bar(draw)
    img.save(f'{OUT}/free_en.jpg', quality=95)
    print('free_en.jpg done')

# POST 7: Free ES
def make_free_es():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 200
    y = center_text(draw, 'Gratis.', y, fnt(160), ORANGE)
    y += 10
    y = center_text(draw, 'Siempre.', y, fnt(72), WHITE)
    y += 80
    y = center_text(draw, 'Sin suscripciones.\nSin costes ocultos.\nSolo las mejores ofertas\nen Alicante y Benidorm.', y, fnt(38, bold=False), LIGHT_GRAY, line_spacing=18)
    y += 80
    orange_pill(draw, 'DESCARGA DEALEO', W // 2, y, fnt(34))
    bottom_bar(draw)
    img.save(f'{OUT}/free_es.jpg', quality=95)
    print('free_es.jpg done')

# POST 8: 2-for-1 EN
def make_2for1_en():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([40, 40, W - 40, 580], radius=40, fill=ORANGE)
    draw.text((80, 90), "Don't miss out on local deals again!", font=fnt(34, bold=False), fill=(255, 220, 180))
    draw.text((80, 160), '2-for-1', font=fnt(150), fill=WHITE)
    draw.text((80, 360), 'Drinks!', font=fnt(150), fill=WHITE)
    draw.rounded_rectangle([40, 610, W - 40, 1100], radius=40, fill=(30, 30, 30))
    wrap_center(draw, 'Find every 2-for-1 deal at bars near you, updated in real time.', 660, fnt(40, bold=False), LIGHT_GRAY, line_spacing=18)
    orange_bottom_bar(draw, 'GET THE DEALEO APP!')
    img.save(f'{OUT}/2for1_en.jpg', quality=95)
    print('2for1_en.jpg done')

# POST 9: 2-for-1 ES
def make_2for1_es():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([40, 40, W - 40, 580], radius=40, fill=ORANGE)
    draw.text((80, 90), 'No te pierdas las ofertas locales!', font=fnt(34, bold=False), fill=(255, 220, 180))
    draw.text((80, 160), '2x1', font=fnt(150), fill=WHITE)
    draw.text((80, 360), 'Bebidas!', font=fnt(130), fill=WHITE)
    draw.rounded_rectangle([40, 610, W - 40, 1100], radius=40, fill=(30, 30, 30))
    wrap_center(draw, 'Encuentra todas las ofertas 2x1 en bares cerca de ti, en tiempo real.', 660, fnt(40, bold=False), LIGHT_GRAY, line_spacing=18)
    orange_bottom_bar(draw, 'DESCARGA DEALEO!')
    img.save(f'{OUT}/2for1_es.jpg', quality=95)
    print('2for1_es.jpg done')

# POST 10: Benidorm EN
def make_benidorm_en():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 120
    y = center_text(draw, 'Now live in', y, fnt(36, bold=False), GRAY)
    y += 10
    y = center_text(draw, 'Benidorm', y, fnt(120), ORANGE)
    y += 10
    y = center_text(draw, '&', y, fnt(48, bold=False), GRAY)
    y = center_text(draw, 'Alicante', y, fnt(110), WHITE)
    y += 50
    y = center_text(draw, 'The deals app for bars,\nbeach clubs & restaurants.\nHappy hours. 2-for-1s. Flash deals.', y, fnt(38, bold=False), LIGHT_GRAY, line_spacing=16)
    y += 70
    orange_pill(draw, 'GET THE APP  dealeo.es', W // 2, y, fnt(32))
    img.save(f'{OUT}/benidorm_en.jpg', quality=95)
    print('benidorm_en.jpg done')

# POST 11: Benidorm ES
def make_benidorm_es():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 120
    y = center_text(draw, 'Ya disponible en', y, fnt(36, bold=False), GRAY)
    y += 10
    y = center_text(draw, 'Benidorm', y, fnt(120), ORANGE)
    y += 10
    y = center_text(draw, 'y', y, fnt(48, bold=False), GRAY)
    y = center_text(draw, 'Alicante', y, fnt(110), WHITE)
    y += 50
    y = center_text(draw, 'La app de ofertas para bares,\nbares de playa y restaurantes.\nHappy hours. 2x1. Ofertas flash.', y, fnt(38, bold=False), LIGHT_GRAY, line_spacing=16)
    y += 70
    orange_pill(draw, 'DESCARGALA  dealeo.es', W // 2, y, fnt(32))
    img.save(f'{OUT}/benidorm_es.jpg', quality=95)
    print('benidorm_es.jpg done')

# POST 12: Notifications EN
def make_notif_en():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 100
    draw.rounded_rectangle([60, y, W - 60, y + 190], radius=24, fill=(35, 35, 35))
    draw.text((100, y + 20), 'DEALEO  now', font=fnt(26, bold=False), fill=GRAY)
    draw.text((100, y + 65), '2-for-1 drinks at Samoa Cafe', font=fnt(34), fill=WHITE)
    draw.text((100, y + 118), 'ends in 45 minutes!', font=fnt(34), fill=ORANGE)
    y += 230

    y = center_text(draw, 'Never miss\na deal.', y, fnt(95), WHITE, line_spacing=5)
    y += 50
    y = wrap_center(draw, 'Get real-time push notifications for happy hours, 2-for-1s and flash deals near you.', y, fnt(38, bold=False), LIGHT_GRAY, line_spacing=16)
    y += 70
    orange_pill(draw, 'GET THE DEALEO APP', W // 2, y, fnt(34))
    bottom_bar(draw)
    img.save(f'{OUT}/notifications_en.jpg', quality=95)
    print('notifications_en.jpg done')

# POST 13: Notifications ES
def make_notif_es():
    img = Image.new('RGB', (W, H), DARK)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=ORANGE)

    y = 100
    draw.rounded_rectangle([60, y, W - 60, y + 190], radius=24, fill=(35, 35, 35))
    draw.text((100, y + 20), 'DEALEO  ahora', font=fnt(26, bold=False), fill=GRAY)
    draw.text((100, y + 65), '2x1 bebidas en Samoa Cafe', font=fnt(34), fill=WHITE)
    draw.text((100, y + 118), 'termina en 45 minutos!', font=fnt(34), fill=ORANGE)
    y += 230

    y = center_text(draw, 'No te pierdas\nninguna oferta.', y, fnt(90), WHITE, line_spacing=5)
    y += 50
    y = wrap_center(draw, 'Notificaciones push en tiempo real para happy hours, 2x1 y ofertas flash cerca de ti.', y, fnt(38, bold=False), LIGHT_GRAY, line_spacing=16)
    y += 70
    orange_pill(draw, 'DESCARGA DEALEO', W // 2, y, fnt(34))
    bottom_bar(draw)
    img.save(f'{OUT}/notifications_es.jpg', quality=95)
    print('notifications_es.jpg done')

# POST 14: Best Deals EN
def make_bars_en():
    img = Image.new('RGB', (W, H), ORANGE_BG)
    draw = ImageDraw.Draw(img)

    y = 100
    y = center_text(draw, 'The best\nbar deals\nin Alicante\n& Benidorm.', y, fnt(105), WHITE, line_spacing=8)
    y += 50

    draw.rounded_rectangle([60, y, W - 60, y + 360], radius=32, fill=(20, 20, 20))
    f_item = fnt(38)
    items = ['  Happy hours', '  2-for-1 drinks', '  Flash deals', '  Events & live music']
    iy = y + 45
    for item in items:
        draw.text((120, iy), item, font=f_item, fill=WHITE)
        iy += 76
    y += 390

    dark_pill(draw, 'All free on dealeo.es', W // 2, y + 30, fnt(36), pad_x=50, pad_y=22)
    img.save(f'{OUT}/bars_en.jpg', quality=95)
    print('bars_en.jpg done')

# POST 15: Best Deals ES
def make_bars_es():
    img = Image.new('RGB', (W, H), ORANGE_BG)
    draw = ImageDraw.Draw(img)

    y = 100
    y = center_text(draw, 'Las mejores\nofertas de\nbares en\nAlicante.', y, fnt(105), WHITE, line_spacing=8)
    y += 50

    draw.rounded_rectangle([60, y, W - 60, y + 360], radius=32, fill=(20, 20, 20))
    f_item = fnt(38)
    items = ['  Happy hours', '  2x1 bebidas', '  Ofertas flash', '  Eventos y musica en vivo']
    iy = y + 45
    for item in items:
        draw.text((120, iy), item, font=f_item, fill=WHITE)
        iy += 76
    y += 390

    dark_pill(draw, 'Gratis en dealeo.es', W // 2, y + 30, fnt(36), pad_x=50, pad_y=22)
    img.save(f'{OUT}/bars_es.jpg', quality=95)
    print('bars_es.jpg done')

make_pinned_es()
make_happy_hour_en()
make_happy_hour_es()
make_flash_en()
make_flash_es()
make_free_en()
make_free_es()
make_2for1_en()
make_2for1_es()
make_benidorm_en()
make_benidorm_es()
make_notif_en()
make_notif_es()
make_bars_en()
make_bars_es()

print('\nAll 15 posts created!')
