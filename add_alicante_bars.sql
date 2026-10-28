-- Add real Alicante centro bars with happy hour deals
-- Paste in Supabase SQL editor → Run

DO $$
DECLARE
  r_id uuid;
BEGIN

-- 1. Checkpoint Charlie
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Checkpoint Charlie') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Checkpoint Charlie', 'Calle Castaños, Alicante', 'El Barrio', 'Alicante', 38.3452, -0.4820, 4.2, '🍺',
    'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — Beers & Shots', 'Happy Hour — Cervezas y Chupitos', 'happyHour', 'Drinks from €2',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '19:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 2. La Cantina del Barrio
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Cantina del Barrio') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Cantina del Barrio', 'Calle Mayor, Alicante', 'El Barrio', 'Alicante', 38.3448, -0.4812, 4.3, '🥂',
    'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Happy Hour — 2x1 Gin Tonics', 'Happy Hour — 2x1 Gin Tonics', 'twoForOne', '2x1 Gin Tonic',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '18:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 3. Café del Puerto Alicante
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Café del Puerto Alicante') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Café del Puerto Alicante', 'Muelle de Poniente, Alicante', 'Puerto', 'Alicante', 38.3398, -0.4812, 4.4, '⛵',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Marina Happy Hour', 'Happy Hour en el Puerto', 'happyHour', 'Beers €2.50',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '17:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 4. Bar Manero
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Bar Manero') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Bar Manero', 'Plaza Gabriel Miró, Alicante', 'Centro', 'Alicante', 38.3444, -0.4845, 4.5, '🍷',
    'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Vermouth & Tapas Hour', 'Hora del Vermut con Tapas', 'happyHour', 'Vermut + tapa €3.50',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '12:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 5. Taberna del Gourmet
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Taberna del Gourmet') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Taberna del Gourmet', 'Calle San Fernando 10, Alicante', 'Centro', 'Alicante', 38.3451, -0.4838, 4.6, '🍾',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Wine & Pintxos Happy Hour', 'Happy Hour Vino y Pintxos', 'happyHour', 'Wine €3 / Pintxo €2',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '13:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 6. El Portal Taberna
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'El Portal Taberna') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('El Portal Taberna', 'Calle Churruca 1, Alicante', 'Centro', 'Alicante', 38.3455, -0.4833, 4.4, '🍻',
    'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Craft Beer Happy Hour', 'Happy Hour Cervezas Artesanas', 'happyHour', 'Craft beer €3',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '17:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 7. Cervecería Sento
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Cervecería Sento') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Cervecería Sento', 'Calle San Francisco, Alicante', 'Centro', 'Alicante', 38.3461, -0.4841, 4.3, '🍺',
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Pints & Tapas from €2.50', 'Pintas y Tapas desde €2.50', 'happyHour', 'Pint + tapa €2.50',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '12:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 8. Backstage Cocktail Bar
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Backstage Cocktail Bar') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Backstage Cocktail Bar', 'Calle Castaños 28, Alicante', 'El Barrio', 'Alicante', 38.3449, -0.4822, 4.4, '🍸',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, '2 Cocktails for €12', '2 Cócteles por €12', 'twoForOne', '2 Cocktails €12',
    ARRAY['wed','thu','fri','sat'], '20:00', 'twoForOne', false, true, null, 0, 'community');
END IF;

-- 9. La Lonja Bar
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Lonja Bar') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('La Lonja Bar', 'Plaza del Mar, Alicante', 'Puerto', 'Alicante', 38.3401, -0.4807, 4.2, '🌅',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Sunset Cocktails by the Sea', 'Cócteles al Atardecer', 'happyHour', 'Cocktails €7',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '18:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 10. Nou Manolín
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Nou Manolín') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Nou Manolín', 'Calle Villegas 3, Alicante', 'Centro', 'Alicante', 38.3456, -0.4831, 4.7, '🦐',
    'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Tapas & Wine at the Bar', 'Tapas y Vino en la Barra', 'happyHour', 'Tapas from €2',
    ARRAY['mon','tue','wed','thu','fri','sat','sun'], '13:00', 'happyHour', false, true, null, 0, 'community');
END IF;

END $$;

SELECT COUNT(*) AS total_alicante_restaurants FROM restaurants WHERE city = 'Alicante';
