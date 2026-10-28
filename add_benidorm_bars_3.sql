-- Benidorm batch 3: nightlife icons + British food & breakfast spots
-- Run in Supabase SQL Editor → Run

DO $$
DECLARE
  r_id uuid;
BEGIN

-- ── NIGHTLIFE ────────────────────────────────────────────────────────────────

-- 1. Penelope Club — one of Spain's most famous nightclubs, 3 rooms, 3 000 capacity
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Penelope Club Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Penelope Club Benidorm', 'Calle Murcia 4, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5482, -0.1198, 4.3, '🎉',
    'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Benidorm''s Biggest Club — 3 Rooms, 3 000 People', 'El Club Más Grande de Benidorm — 3 Salas, 3 000 Personas', 'nightlife', 'Biggest club in town',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '23:00', '06:00', 'nightlife', false, true, null, 0, 'community');
END IF;

-- 2. KU Discoteca — iconic open-air club, Ibiza-style atmosphere
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'KU Discoteca Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('KU Discoteca Benidorm', 'Avenida de la Comunitat Valenciana, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5478, -0.1202, 4.2, '🎵',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Open-Air Club Night — Ibiza Vibes in Benidorm', 'Noche de Club al Aire Libre — Ambiente Ibiza', 'nightlife', 'Open-air club night',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '23:00', '06:00', 'nightlife', false, true, null, 0, 'community');
END IF;

-- 3. Benidorm Palace — world-famous dinner show & cabaret since 1977
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Benidorm Palace' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Benidorm Palace', 'Avenida Dr. Severo Ochoa 13, Benidorm', 'Levante', 'Benidorm', 38.5360, -0.1380, 4.5, '🎭',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'World-Class Dinner Show & Cabaret from 10pm', 'Cena Show y Cabaret de Clase Mundial desde las 22h', 'experiences', 'Dinner show from 10pm',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '20:00', '01:00', 'experiences', false, true, null, 0, 'community');
END IF;

-- 4. Rovers Return — Calle Gerona 19, classic British pub, fresh pizzas & pint deals
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Rovers Return Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Rovers Return Benidorm', 'Calle Gerona 19, Benidorm', 'Levante', 'Benidorm', 38.5433, -0.1261, 4.3, '🍺',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Fresh Handmade Pizzas + Cheap Pints All Day', 'Pizzas Artesanas Frescas + Pintas Baratas Todo el Día', 'food', 'Cheap pints all day',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '10:00', '23:00', 'food', false, true, null, 0, 'community');
END IF;

-- 5. Jumping Jacks — huge terrace bar, Calle Gerona, cider & pint deals
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Jumping Jacks Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Jumping Jacks Benidorm', 'Calle Gerona 22, Benidorm', 'Levante', 'Benidorm', 38.5435, -0.1264, 4.2, '🍻',
    'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Massive Terrace — Cider & Pint Deals All Day', 'Terraza Gigante — Ofertas de Sidra y Cerveza Todo el Día', 'happyHour', 'Cider & pint deals',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '10:00', '23:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 6. Union Jack Sports Bar — 2 pints for €3, all sports live, Rincon de Loix
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Union Jack Sports Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Union Jack Sports Bar Benidorm', 'Avenida Ametlla de Mar, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5468, -0.1235, 4.2, '🏟️',
    'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2 Pints for €3 — All Sports Live on Big Screens', '2 Pintas por €3 — Todos los Deportes en Directo', 'twoForOne', '2 pints for €3',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '11:00', '23:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 7. Daytona Rock Bar — Av. Alcoi 15, beachfront rock bar, 2 pints Amstel €4.90, live music
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Daytona Rock Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Daytona Rock Bar Benidorm', 'Avinguda Alcoi 15, Benidorm', 'Levante Beach', 'Benidorm', 38.5415, -0.1295, 4.4, '🎸',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2 Pints Amstel €4.90 + Live Rock Music Nightly', '2 Pintas Amstel €4.90 + Música Rock en Vivo cada Noche', 'twoForOne', '2 pints Amstel €4.90',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '02:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 8. Collier's Bar — cosy Scottish bar, Old Town, big screen sports
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Collier''s Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Collier''s Bar Benidorm', 'Old Town, Benidorm', 'Old Town', 'Benidorm', 38.5390, -0.1325, 4.4, '🍺',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Cosy Scottish Bar — Sports, Drinks & Great Craic', 'Bar Escocés Acogedor — Deportes, Bebidas y Buen Ambiente', 'drinks', 'Sports & drinks',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '11:00', '23:00', 'drinks', false, true, null, 0, 'community');
END IF;

-- 9. Explorers Club — naval theme, 2-for-1 happy hour, live music every night
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Explorers Club Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Explorers Club Benidorm', 'Calle Lepanto, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5450, -0.1248, 4.3, '⚓',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2-for-1 Happy Hour + Live Music Every Night', '2x1 en Happy Hour + Música en Vivo cada Noche', 'twoForOne', '2-for-1 happy hour',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '17:00', '20:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 10. Rolling Stone Benidorm — rock/party bar (site of former Lineker''s Bar), Calle Gerona
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Rolling Stone Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Rolling Stone Benidorm', 'Calle Gerona, Benidorm', 'Levante', 'Benidorm', 38.5438, -0.1259, 4.2, '🎵',
    'https://images.unsplash.com/photo-1574879948818-c37f74d9440d?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Rock Bar — Cheap Drinks & Party Atmosphere All Night', 'Bar Rock — Bebidas Baratas y Fiesta Toda la Noche', 'drinks', 'Cheap drinks all night',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '20:00', '04:00', 'drinks', false, true, null, 0, 'community');
END IF;

-- ── FULL ENGLISH BREAKFAST & BRITISH FOOD ───────────────────────────────────

-- 11. The Midland Bar & Restaurant — full English all day, classic British pub food
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'The Midland Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('The Midland Benidorm', 'Calle Gerona 8, Benidorm', 'Levante', 'Benidorm', 38.5428, -0.1270, 4.3, '🍳',
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Full English All Day from €4.50 — Beans, Bacon & All', 'Desayuno Inglés Completo Todo el Día desde €4.50', 'food', 'Full English from €4.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '08:00', '16:00', 'food', false, true, null, 0, 'community');
END IF;

-- 12. Scruffy Murphy's Irish Bar — Irish pub, full Irish breakfast, quiz nights, live sport
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Scruffy Murphy''s Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Scruffy Murphy''s Benidorm', 'Rincon de Loix, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5463, -0.1241, 4.3, '🍀',
    'https://images.unsplash.com/photo-1527722569451-5be6e8f7d3c8?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Full Irish Breakfast + Pint from €6 — Quiz Nights Too', 'Desayuno Irlandés Completo + Pinta desde €6', 'food', 'Breakfast + pint €6',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '08:00', '14:00', 'food', false, true, null, 0, 'community');
END IF;

-- 13. Mulligans Irish Bar Benidorm — traditional Irish pub, sports, Guinness, food
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Mulligans Irish Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Mulligans Irish Bar Benidorm', 'Calle Martínez Alejos, Benidorm', 'Old Town', 'Benidorm', 38.5393, -0.1318, 4.3, '🍀',
    'https://images.unsplash.com/photo-1577003833619-76bbd7f82948?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Guinness + Full Breakfast All Morning — Live Sport All Day', 'Guinness + Desayuno Completo Toda la Mañana', 'food', 'Guinness & breakfast',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '08:00', '14:00', 'food', false, true, null, 0, 'community');
END IF;

-- 14. The Frying Squad — best fish & chips in Benidorm, Levante area
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'The Frying Squad Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('The Frying Squad Benidorm', 'Levante, Benidorm', 'Levante', 'Benidorm', 38.5421, -0.1289, 4.5, '🐟',
    'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Fish & Chips from €5 — Best Chippy in Benidorm', 'Fish & Chips desde €5 — La Mejor Freiduría de Benidorm', 'food', 'Fish & chips from €5',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '11:30', '22:00', 'food', false, true, null, 0, 'community');
END IF;

-- 15. The Kiwi Restaurant — legendary Benidorm breakfast spot, open since early morning
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'The Kiwi Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('The Kiwi Benidorm', 'Calle Gerona, Benidorm', 'Levante', 'Benidorm', 38.5426, -0.1268, 4.4, '🥝',
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Legendary All-Day Breakfast from €3.50', 'Desayuno Completo Todo el Día desde €3.50 — Legendario', 'food', 'Breakfast from €3.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '07:00', '15:00', 'food', false, true, null, 0, 'community');
END IF;

-- 16. Cheers Bar Benidorm — big outdoor terrace, full English, cheap drinks, Levante
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Cheers Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Cheers Bar Benidorm', 'Avenida de Madrid, Benidorm', 'Levante', 'Benidorm', 38.5409, -0.1296, 4.2, '🥂',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Full English Breakfast + Tea from €4 — Terrace Views', 'Desayuno Inglés + Té desde €4 — Vistas desde la Terraza', 'food', 'Breakfast + tea €4',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '08:00', '13:00', 'food', false, true, null, 0, 'community');
END IF;

-- 17. Taj Mahal Benidorm — most popular Indian restaurant, curry night deals
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Taj Mahal Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Taj Mahal Benidorm', 'Calle Virgen del Sufragio, Benidorm', 'Old Town', 'Benidorm', 38.5388, -0.1332, 4.3, '🍛',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Curry Night — Main + Rice + Naan from €8', 'Noche de Curry — Plato + Arroz + Naan desde €8', 'food', 'Curry meal from €8',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '17:00', '23:00', 'food', false, true, null, 0, 'community');
END IF;

-- 18. Charlie's Diner Benidorm — American-style diner, burgers, breakfast all day
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Charlie''s Diner Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Charlie''s Diner Benidorm', 'Levante Strip, Benidorm', 'Levante', 'Benidorm', 38.5424, -0.1275, 4.2, '🍔',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'All-Day Breakfast + Burgers from €4 — American Diner', 'Desayuno Todo el Día + Burgers desde €4 — Estilo Americano', 'food', 'Breakfast from €4',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '08:00', '22:00', 'food', false, true, null, 0, 'community');
END IF;

END $$;

-- Verify all Benidorm venues
SELECT r.name, r.neighborhood, d.title, d.valid_from, d.valid_until, d.category
FROM restaurants r
JOIN deals d ON d.restaurant_id = r.id
WHERE r.city = 'Benidorm'
ORDER BY r.neighborhood, r.name;
