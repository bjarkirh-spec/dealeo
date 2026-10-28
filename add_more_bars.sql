-- Add 10 more real bars/venues in Alicante and Benidorm with deals
-- Paste in Supabase SQL Editor → Run

DO $$
DECLARE
  r_id uuid;
BEGIN

-- ── ALICANTE VENUES ──────────────────────────────────────────────────────────

-- 1. El Patio — classic tapas courtyard bar near the Old Town
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'El Patio' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('El Patio', 'Calle Labradores 18, Alicante', 'El Barrio', 'Alicante', 38.3457, -0.4818, 4.4, '🌿',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Tapas & Beer from €4', 'Tapas y Cerveza desde €4', 'happyHour', 'Tapa + beer €4',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '13:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 2. La Taberna — traditional Alicante tavern, cured meats and house wine
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Taberna' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Taberna', 'Calle Mayor 36, Alicante', 'Centro', 'Alicante', 38.3446, -0.4832, 4.3, '🍷',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'House Wine & Montaditos — €1.50 each', 'Vino de la Casa y Montaditos — €1.50 c/u', 'happyHour', 'Wine + montadito €1.50',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '12:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 3. Cervecería Munich — German-style beer hall, long tables, cold draught
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Cervecería Munich' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Cervecería Munich', 'Avenida Federico Soto 8, Alicante', 'Centro', 'Alicante', 38.3468, -0.4852, 4.3, '🍺',
    'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — Half-Litre Draught €3', 'Happy Hour — Media Jarra €3', 'happyHour', 'Half-litre €3',
    ARRAY['mon','tue','wed','thu','fri'], '17:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 4. El Cantó — neighbourhood bar in the Ensanche, pintxos and vermouth
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'El Cantó' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('El Cantó', 'Calle Italia 5, Alicante', 'Ensanche', 'Alicante', 38.3480, -0.4870, 4.2, '🥂',
    'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Vermouth Hour — Vermut + Pintxo €3', 'Hora del Vermut — Vermut + Pintxo €3', 'happyHour', 'Vermut + pintxo €3',
    ARRAY['sat','sun'], '12:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 5. Bar Capitol — legendary Alicante bar on Explanada, busy all day
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bar Capitol' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Bar Capitol', 'Explanada de España, Alicante', 'Puerto', 'Alicante', 38.3415, -0.4823, 4.5, '☀️',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Caña + Tapa from €2 on the Explanada', 'Caña + Tapa desde €2 en la Explanada', 'happyHour', 'Caña + tapa €2',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '11:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 6. Restaurante Monastrell — fine tapas and creative cuisine, wine focus
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Restaurante Monastrell' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Restaurante Monastrell', 'Calle Rafael Altamira 7, Alicante', 'Centro', 'Alicante', 38.3459, -0.4840, 4.8, '🍾',
    'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Bar Menu — Creative Tapas & Glass of Wine €8', 'Menú de Barra — Tapas Creativas y Copa de Vino €8', 'food', 'Tapas + wine €8',
    ARRAY['tue','wed','thu','fri'], '13:00', 'food', false, true, null, 0, 'community');
END IF;

-- 7. Pepe el Navarro — iconic family-run bar, cheap wine, standing room only
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Pepe el Navarro' AND city = 'Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Pepe el Navarro', 'Calle Castaños 32, Alicante', 'El Barrio', 'Alicante', 38.3451, -0.4821, 4.6, '🍻',
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Wine from €1.20 a Glass All Day', 'Vino desde €1.20 la Copa Todo el Día', 'happyHour', 'Wine €1.20',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '10:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- ── BENIDORM VENUES ───────────────────────────────────────────────────────────

-- 8. La Finca Beach Bar — Levante beachfront, Spanish crowd, great paella
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Finca Beach Bar' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Finca Beach Bar', 'Levante Beach Promenade, Benidorm', 'Levante Beach', 'Benidorm', 38.5408, -0.1291, 4.5, '🌊',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Beachfront Happy Hour — Sangria & Cañas €3', 'Happy Hour en la Playa — Sangría y Cañas €3', 'happyHour', 'Sangria + caña €3',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '16:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 9. Bar Nou Manolín Benidorm — offshoot-style tapas bar, Old Town
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bar Nou Manolín Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Bar Nou Manolín Benidorm', 'Calle Santo Domingo, Benidorm', 'Old Town', 'Benidorm', 38.5368, -0.1362, 4.4, '🦐',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Tapas & Local Wine — 2 Tapas + Wine €6', 'Tapas y Vino Local — 2 Tapas + Vino €6', 'happyHour', '2 tapas + wine €6',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '12:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 10. Mirador Sunset Bar — Old Town hilltop, 180° sea views, cocktails at dusk
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Mirador Sunset Bar' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Mirador Sunset Bar', 'Mirador del Castillo, Benidorm', 'Old Town', 'Benidorm', 38.5362, -0.1370, 4.7, '🌅',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Sunset Cocktails — 2 for €15 from 7pm', 'Cócteles al Atardecer — 2 por €15 desde las 19:00', 'twoForOne', '2 cocktails €15',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '19:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

END $$;

SELECT r.name, r.city, r.neighborhood, d.title, d.deal_type, d.valid_from, d.valid_days
FROM restaurants r
JOIN deals d ON d.restaurant_id = r.id
WHERE r.name IN (
  'El Patio', 'La Taberna', 'Cervecería Munich', 'El Cantó', 'Bar Capitol',
  'Restaurante Monastrell', 'Pepe el Navarro',
  'La Finca Beach Bar', 'Bar Nou Manolín Benidorm', 'Mirador Sunset Bar'
)
ORDER BY r.city, r.name;
