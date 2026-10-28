-- Add 22 real Benidorm bars across all neighbourhoods
-- Avoids existing: La Finca Beach Bar, Bar Nou Manolín Benidorm, Mirador Sunset Bar
-- Paste in Supabase SQL Editor → Run

DO $$
DECLARE
  r_id uuid;
BEGIN

-- ── OLD TOWN (CASCO ANTIGUO) ────────────────────────────────────────────────

-- 1. La Cava Aragonesa — Benidorm's most iconic tapas bar
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Cava Aragonesa' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Cava Aragonesa', 'Calle Santo Domingo 5, Benidorm', 'Old Town', 'Benidorm', 38.5395, -0.1328, 4.6, '🍷',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Tapas & Wine from €2', 'Tapas y Vino desde €2', 'happyHour', 'Tapas from €2',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '22:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 2. La Taperia Aurrera — Basque-style pintxos and sidra, always packed
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Taperia Aurrera' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Taperia Aurrera', 'Calle Almendros 3, Benidorm', 'Old Town', 'Benidorm', 38.5393, -0.1322, 4.5, '🥂',
    'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Pintxos Happy Hour — 3 Pintxos + Drink €6', 'Happy Hour — 3 Pintxos + Bebida €6', 'happyHour', '3 pintxos + drink €6',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '18:00', '20:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 3. Restaurante Ulia — paella, rice dishes and Mediterranean seafood
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Restaurante Ulia' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Restaurante Ulia', 'Plaza de la Constitución 1, Benidorm', 'Old Town', 'Benidorm', 38.5398, -0.1330, 4.5, '🦞',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Lunch Menu — Paella + Drink €12', 'Menú del Día — Paella + Bebida €12', 'food', 'Paella + drink €12',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '13:00', '16:00', 'food', false, true, null, 0, 'community');
END IF;

-- 4. Bar Mal Pas — terrace near Old Town viewpoint, wine and sunsets
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bar Mal Pas' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Bar Mal Pas', 'Paseo de la Carretera, Benidorm', 'Old Town', 'Benidorm', 38.5360, -0.1368, 4.4, '🌅',
    'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Sunset Happy Hour — Wine & Snacks from €3', 'Happy Hour Atardecer — Vino y Aperitivos desde €3', 'happyHour', 'Wine from €3',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '18:30', '20:30', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 5. Bar 69 Benidorm — most extensive cocktail menu in Old Town
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bar 69 Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Bar 69 Benidorm', 'Calle Mayor 15, Benidorm', 'Old Town', 'Benidorm', 38.5391, -0.1318, 4.5, '🍸',
    'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2-for-1 Cocktails — Every Night 8–10pm', '2x1 Cócteles — Cada Noche 20–22h', 'twoForOne', '2-for-1 cocktails',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '20:00', '22:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 6. Vincent's Old Town — original British bar in Benidorm since 1965
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Vincent''s Old Town' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Vincent''s Old Town', 'Calle Tomás Ortuño 12, Benidorm', 'Old Town', 'Benidorm', 38.5397, -0.1320, 4.3, '🍺',
    'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — Pints €2.50 all afternoon', 'Happy Hour — Pintas €2.50 toda la tarde', 'happyHour', 'Pints €2.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '16:00', '19:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 7. Thistle Bar Benidorm — tucked on Carrer de la Palma, cosy British pub
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Thistle Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Thistle Bar Benidorm', 'Carrer de la Palma 6, Benidorm', 'Old Town', 'Benidorm', 38.5405, -0.1310, 4.3, '🌿',
    'https://images.unsplash.com/photo-1547146598-0962d0d87c97?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Afternoon Drinks — Beer & Shots from €2', 'Tarde de Copas — Cerveza y Chupitos desde €2', 'happyHour', 'Drinks from €2',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '15:00', '18:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- ── CALLE GERONA / LEVANTE STRIP ────────────────────────────────────────────

-- 8. Railway's Bar — Calle Gerona 23, open 11am–4:30am daily
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Railway''s Bar' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Railway''s Bar', 'Calle Gerona 23, Benidorm', 'Levante', 'Benidorm', 38.5430, -0.1272, 4.2, '🚂',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'All-Day Happy Hour — Beers & Spirits from €2', 'Happy Hour Todo el Día — Cervezas desde €2', 'happyHour', 'Drinks from €2',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '11:00', '20:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 9. Riviera Music Lounge — live music, happy hour every night 6:30–8:30pm
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Riviera Music Lounge' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Riviera Music Lounge', 'Avenida del Mediterráneo 14, Benidorm', 'Levante', 'Benidorm', 38.5418, -0.1282, 4.4, '🎶',
    'https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour + Live Music — 6:30–8:30pm nightly', 'Happy Hour + Música en Vivo — 18:30–20:30', 'happyHour', 'Drinks discounted',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '18:30', '20:30', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 10. Black Chicken Bar — Calle Gerona, legendary karaoke bar
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Black Chicken Bar' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Black Chicken Bar', 'Calle Gerona 42, Benidorm', 'Levante', 'Benidorm', 38.5432, -0.1275, 4.1, '🎤',
    'https://images.unsplash.com/photo-1550426735-c33c7ce414ff?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2-for-1 Shots — Pre-Party 8–10pm', '2x1 Chupitos — Pre-Fiesta 20–22h', 'twoForOne', '2-for-1 shots',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '20:00', '22:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 11. Talk of the Coast — Calle Gerona, Northern & Motown music bar, tribute acts
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Talk of the Coast' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Talk of the Coast', 'Calle Gerona 31, Benidorm', 'Levante', 'Benidorm', 38.5428, -0.1268, 4.3, '🎸',
    'https://images.unsplash.com/photo-1583106223774-3313c55721ed?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Early Doors — Pints €3 from 5pm', 'Apertura — Pintas €3 desde las 17h', 'happyHour', 'Pints €3',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '17:00', '20:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 12. Sol Beach Bar Benidorm — Levante beachfront, cocktails and food all day
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Sol Beach Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Sol Beach Bar Benidorm', 'Paseo Colón s/n, Levante Beach, Benidorm', 'Levante Beach', 'Benidorm', 38.5420, -0.1289, 4.5, '🌊',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Beach Happy Hour — Cocktails & Cañas €3.50', 'Happy Hour Playa — Cócteles y Cañas €3.50', 'happyHour', 'Cocktails €3.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '16:00', '19:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 13. Med23 Pub — popular New Town pub, big screens, cold draught
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Med23 Pub' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Med23 Pub', 'Avenida del Mediterráneo 23, Benidorm', 'Levante', 'Benidorm', 38.5435, -0.1262, 4.2, '📺',
    'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Match Day Deal — Pint + Pie €6', 'Día de Partido — Pinta + Empanada €6', 'food', 'Pint + pie €6',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '23:00', 'food', false, true, null, 0, 'community');
END IF;

-- 14. Andy's Bar Benidorm — famous Levante bar, doubles at single price
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Andy''s Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Andy''s Bar Benidorm', 'Avenida del Mediterráneo 8, Benidorm', 'Levante', 'Benidorm', 38.5412, -0.1290, 4.4, '🍻',
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — Double Measures, Single Price', 'Happy Hour — Doble Medida, Precio Sencillo', 'happyHour', 'Doubles at single price',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '17:00', '21:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- ── ENGLISH SQUARE / RINCON DE LOIX ────────────────────────────────────────

-- 15. Champions Bar Benidorm — sports bar on English Square, all major games shown
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Champions Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Champions Bar Benidorm', 'Avenida de Mallorca 4, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5462, -0.1248, 4.2, '⚽',
    'https://images.unsplash.com/photo-1547146598-0962d0d87c97?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2-for-1 Pints on the English Square', '2x1 Pintas en English Square', 'twoForOne', '2-for-1 pints',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '23:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 16. Hippodrome Bar Benidorm — English Square landmark, cheap rounds
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Hippodrome Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Hippodrome Bar Benidorm', 'Avenida de Mallorca 8, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5460, -0.1252, 4.1, '🎠',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — Spirits €2 all evening', 'Happy Hour — Licores €2 toda la tarde', 'happyHour', 'Spirits €2',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '18:00', '21:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 17. Bahamas Bar Benidorm — English Square classic, beach-themed cocktails
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bahamas Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Bahamas Bar Benidorm', 'Avenida de Mallorca 2, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5458, -0.1245, 4.1, '🏖️',
    'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Long Island Iced Tea — €4 all night', 'Long Island Tea — €4 toda la noche', 'drinks', 'Long Island €4',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '17:00', '23:00', 'drinks', false, true, null, 0, 'community');
END IF;

-- 18. Queen Mary Benidorm — Rincon de Loix institution, Carling on tap, pool table
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Queen Mary Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Queen Mary Benidorm', 'Calle Filipinas 5, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5467, -0.1242, 4.2, '👑',
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — Pints & Shots from €2', 'Happy Hour — Pintas y Chupitos desde €2', 'happyHour', 'Drinks from €2',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '16:00', '20:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 19. Drop Inn Benidorm — Rincon de Loix, quiz nights, 2-for-1 draught
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Drop Inn Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Drop Inn Benidorm', 'Calle Filipinas 9, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5465, -0.1240, 4.3, '🍺',
    'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2-for-1 Draught Beer — 5pm to 8pm', '2x1 Cerveza de Barril — 17h a 20h', 'twoForOne', '2-for-1 draught',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '17:00', '20:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 20. Faulty Towers Bar — Rincon de Loix, comedy-themed, spirits all night
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Faulty Towers Bar' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Faulty Towers Bar', 'Calle Filipinas 14, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5469, -0.1238, 4.0, '😂',
    'https://images.unsplash.com/photo-1547146598-0962d0d87c97?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Cheap Rounds — Spirits from €2.50 all night', 'Rondas Baratas — Licores desde €2.50', 'happyHour', 'Spirits from €2.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '19:00', '23:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- ── PONIENTE AREA ───────────────────────────────────────────────────────────

-- 21. El Rincón de las Cañas — Poniente neighbourhood bar, caña + tapa deals
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'El Rincón de las Cañas' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('El Rincón de las Cañas', 'Avenida de la Comunitat Valenciana 12, Benidorm', 'Poniente', 'Benidorm', 38.5383, -0.1378, 4.4, '🍻',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Caña + Tapa from €2.50 all day', 'Caña + Tapa desde €2.50 todo el día', 'happyHour', 'Caña + tapa €2.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '22:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 22. La Bodeguita Benidorm — Poniente wine bar, local crowd, great value
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Bodeguita Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Bodeguita Benidorm', 'Calle Esperanto 7, Benidorm', 'Poniente', 'Benidorm', 38.5380, -0.1372, 4.5, '🍷',
    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Wine & Cheese Board €9', 'Tabla de Quesos y Vino €9', 'happyHour', 'Wine + cheese €9',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '18:00', '21:00', 'happyHour', false, true, null, 0, 'community');
END IF;

END $$;

-- Verify insertions
SELECT r.name, r.neighborhood, d.title, d.valid_from, d.valid_to
FROM restaurants r
JOIN deals d ON d.restaurant_id = r.id
WHERE r.city = 'Benidorm'
ORDER BY r.neighborhood, r.name;
