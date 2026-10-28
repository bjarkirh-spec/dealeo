-- Add 10 more well-known Benidorm venues — batch 2
-- Run AFTER add_benidorm_bars.sql
-- Paste in Supabase SQL Editor → Run

DO $$
DECLARE
  r_id uuid;
BEGIN

-- ── STRIP / LEVANTE ─────────────────────────────────────────────────────────

-- 1. Morgan Tavern — Benidorm's most famous bar (TV show "Benidorm" / Neptune's Bar)
--    Free entry, live tribute acts & cabaret every night. Start of Calle Gerona.
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Morgan Tavern' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Morgan Tavern', 'Calle Gerona 1, Benidorm', 'Levante', 'Benidorm', 38.5424, -0.1280, 4.4, '🎭',
    'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Free Entry — Live Tribute Acts & Cabaret Nightly', 'Entrada Gratis — Tributos y Cabaret cada Noche', 'experiences', 'Free entry',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '20:00', '02:00', 'experiences', false, true, null, 0, 'community');
END IF;

-- 2. Tiki Beach — Av. de Madrid 14, Levante beachfront, DJ from 11:30am, all-day happy hour
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Tiki Beach Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Tiki Beach Benidorm', 'Avenida de Madrid 14, Benidorm', 'Levante Beach', 'Benidorm', 38.5412, -0.1292, 4.5, '🌴',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'All-Day Happy Hour — Pints €2.50, DJ from 11:30am', 'Happy Hour Todo el Día — Pintas €2.50, DJ desde las 11:30', 'happyHour', 'Pints €2.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '10:00', '01:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 3. Rockstar Bar — Calle Gerona, huge sunny terrace, cheapest pints on the strip €1.50
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Rockstar Bar Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Rockstar Bar Benidorm', 'Calle Gerona 18, Benidorm', 'Levante', 'Benidorm', 38.5429, -0.1265, 4.2, '🎸',
    'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Cheapest Pints on the Strip — €1.50 all day', 'Pintas más Baratas del Strip — €1.50 todo el día', 'happyHour', 'Pints €1.50',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '11:00', '23:00', 'happyHour', false, true, null, 0, 'community');
END IF;

-- 4. Red Dog Western Saloon — 15 Calle Lepanto, themed bar, shows and entertainment nightly
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Red Dog Western Saloon' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Red Dog Western Saloon', 'Calle Lepanto 15, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5462, -0.1240, 4.1, '🤠',
    'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Wild West Nights — Shows & Themed Entertainment', 'Noches del Oeste — Shows y Entretenimiento', 'experiences', 'Themed shows nightly',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '21:00', '03:00', 'experiences', false, true, null, 0, 'community');
END IF;

-- 5. Jokers Benidorm — Calle Filipinas / Calle Lepanto, foam parties, shows from 9pm
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Jokers Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Jokers Benidorm', 'Calle Filipinas / Calle Lepanto, Benidorm', 'Rincon de Loix', 'Benidorm', 38.5464, -0.1243, 4.1, '🃏',
    'https://images.unsplash.com/photo-1657313666513-70770d329ef4?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Foam Party & Live Entertainment from 9pm', 'Fiesta de Espuma y Entretenimiento en Vivo desde 21h', 'nightlife', 'Shows from 9pm',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '21:00', '04:00', 'nightlife', false, true, null, 0, 'community');
END IF;

-- ── OLD TOWN — FOOD ─────────────────────────────────────────────────────────

-- 6. Pizzeria Avanti — just off Tapas Alley, wood-fired pizza, great value
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Pizzeria Avanti Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Pizzeria Avanti Benidorm', 'Calle Santo Domingo 12, Benidorm', 'Old Town', 'Benidorm', 38.5391, -0.1329, 4.5, '🍕',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Wood-Fired Pizza from €7 — Old Town', 'Pizza de Leña desde €7 — Casco Antiguo', 'food', 'Pizza from €7',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '23:00', 'food', false, true, null, 0, 'community');
END IF;

-- ── BRITISH FOOD / STRIP ────────────────────────────────────────────────────

-- 7. Yorkshire Pride — full English & Scottish breakfasts, strip area
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Yorkshire Pride Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Yorkshire Pride Benidorm', 'Calle Gerona 28, Benidorm', 'Levante', 'Benidorm', 38.5432, -0.1266, 4.3, '🍳',
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Full English Breakfast + Tea/Coffee from €4', 'Desayuno Inglés Completo + Té/Café desde €4', 'food', 'Full English from €4',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '08:00', '13:00', 'food', false, true, null, 0, 'community');
END IF;

-- 8. Two Palms — hearty British food, full English, roast dinners, strip
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Two Palms Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Two Palms Benidorm', 'Calle Gerona 35, Benidorm', 'Levante', 'Benidorm', 38.5430, -0.1271, 4.3, '🌴',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Sunday Roast — Full Dinner from €9', 'Asado Dominical — Cena Completa desde €9', 'food', 'Roast dinner from €9',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '12:00', '21:00', 'food', false, true, null, 0, 'community');
END IF;

-- 9. Internationale Benidorm — Spanish menú del día, 3 courses + drink from €10
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Internationale Benidorm' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Internationale Benidorm', 'Avenida del Mediterráneo 5, Benidorm', 'Levante', 'Benidorm', 38.5417, -0.1285, 4.2, '🍽️',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Menú del Día — 3 Courses + Drink from €10', 'Menú del Día — 3 Platos + Bebida desde €10', 'food', '3 courses + drink €10',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '13:00', '16:00', 'food', false, true, null, 0, 'community');
END IF;

-- 10. Baldo Restaurant & Cocktail Bar — Benidorm seafront, cocktails and food, popular with locals
IF NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'Baldo Restaurant & Cocktail Bar' AND city = 'Benidorm') THEN
  INSERT INTO restaurants (name, address, neighborhood, city, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
  VALUES ('Baldo Restaurant & Cocktail Bar', 'Calle Martínez Alejos 8, Benidorm', 'Old Town', 'Benidorm', 38.5394, -0.1319, 4.6, '🍹',
    'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600&auto=format&fit=crop&q=80', true, true, false)
  RETURNING id INTO r_id;
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_to, deal_type, is_live, is_active, max_redemptions, redemptions_count, source)
  VALUES (r_id, 'Cocktail Hour — Signature Drinks from €6', 'Hora del Cóctel — Bebidas desde €6', 'drinks', 'Cocktails from €6',
    ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '18:00', '21:00', 'drinks', false, true, null, 0, 'community');
END IF;

END $$;

-- Verify all Benidorm venues
SELECT r.name, r.neighborhood, d.title, d.valid_from, d.valid_to, d.category
FROM restaurants r
JOIN deals d ON d.restaurant_id = r.id
WHERE r.city = 'Benidorm'
ORDER BY r.neighborhood, r.name;
