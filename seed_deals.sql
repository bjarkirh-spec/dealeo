-- Seed community venues and deals for Dealeo
-- Run in Supabase SQL Editor

-- Get your user ID and use it as the owner of all community venues
DO $$
DECLARE
  admin_id uuid;
BEGIN
  SELECT id INTO admin_id FROM auth.users WHERE email = 'bjarkirh@gmail.com' LIMIT 1;

  -- ── BENIDORM VENUES ──────────────────────────────────────────────────────

  INSERT INTO restaurants (user_id, name, address, neighborhood, city, phone, image_emoji, description, description_es, latitude, longitude, is_active, is_demo, is_approved, rating, review_count)
  VALUES
    (admin_id, 'Ibrox Bar',           'Benidorm',          'English Square',  'Benidorm', NULL, '🍺', 'Popular British bar with great drink deals on the English Square.', 'Bar británico popular con excelentes ofertas en la zona inglesa.', 38.5392, -0.1331, true, true, true, 4.2, 0),
    (admin_id, 'Sol Beach Bar',        'Levante Beach',     'Levante Beach',   'Benidorm', NULL, '🌊', 'Beachfront bar with daily happy hours and amazing views.', 'Bar en la playa con happy hours diarios y vistas increíbles.', 38.5412, -0.1285, true, true, true, 4.4, 0),
    (admin_id, 'Bikini Beach Bar',     'Levante Beach',     'Levante Beach',   'Benidorm', NULL, '👙', 'Lively beach bar with cocktail happy hours twice daily.', 'Animado bar de playa con happy hours de cócteles dos veces al día.', 38.5415, -0.1280, true, true, true, 4.1, 0),
    (admin_id, 'The Jungle',           'Levante Beach',     'Levante Beach',   'Benidorm', NULL, '🌿', 'Beach bar and restaurant with daily happy hour cocktails and nachos.', 'Bar y restaurante en la playa con cócteles de happy hour y nachos diarios.', 38.5410, -0.1288, true, true, true, 4.3, 0),
    (admin_id, 'Tiki Beach',           'Levante Beach',     'Levante Beach',   'Benidorm', NULL, '🌺', 'Non-stop happy hour all day — one of the cheapest beers in Benidorm.', 'Happy hour sin parar todo el día — una de las cervezas más baratas de Benidorm.', 38.5418, -0.1275, true, true, true, 4.5, 0),
    (admin_id, 'Tiki City',            'New Town',          'New Town',        'Benidorm', NULL, '🍹', 'Great deals on buckets and cocktail pitchers all day long.', 'Grandes ofertas en cubos de cervezas y jarras de cócteles todo el día.', 38.5388, -0.1340, true, true, true, 4.3, 0),
    (admin_id, 'Tiki Town',            'Levante Beach',     'Levante Beach',   'Benidorm', NULL, '🎶', 'Beachfront bar with all-day drink deals and live DJ from 11:30am.', 'Bar en la playa con ofertas de bebidas todo el día y DJ en vivo desde las 11:30.', 38.5420, -0.1270, true, true, true, 4.2, 0),
    (admin_id, 'Riviera Music Lounge', 'Old Town',          'Old Town',        'Benidorm', NULL, '🎸', 'Music lounge with nightly happy hour on all drinks.', 'Lounge musical con happy hour nocturno en todas las bebidas.', 38.5375, -0.1360, true, true, true, 4.0, 0),
    (admin_id, 'Casper''s Eatery & Bar','Old Town',         'Old Town',        'Benidorm', NULL, '👻', 'Friendly bar and eatery with a great "Happy 2 Hours" gin and cocktail deal.', 'Bar y restaurante simpático con excelente oferta de ginebra y cócteles Happy 2 Hours.', 38.5370, -0.1355, true, true, true, 4.4, 0),
    (admin_id, 'Champions Bar',        'New Town Strip',    'New Town',        'Benidorm', NULL, '🏆', 'Sports bar famous for €1 pints and the free sambuca deal.', 'Bar de deportes famoso por las cervezas a €1 y la oferta de sambuca gratis.', 38.5385, -0.1345, true, true, true, 4.6, 0),
    (admin_id, 'Bahamas Fun Bar',      'New Town',          'New Town',        'Benidorm', NULL, '🌴', 'Fun bar with 2-for-1 cocktails and a lively party atmosphere.', 'Bar divertido con cócteles 2x1 y un animado ambiente de fiesta.', 38.5380, -0.1350, true, true, true, 4.0, 0),
    (admin_id, 'Queen Vic',            'New Town Strip',    'New Town',        'Benidorm', NULL, '👑', 'Classic British pub with karaoke and a legendary Sunday Roast.', 'Pub británico clásico con karaoke y un legendario Sunday Roast.', 38.5382, -0.1348, true, true, true, 4.3, 0),
    (admin_id, 'NOVA Cocktail Bar',    'Old Town',          'Old Town',        'Benidorm', NULL, '🍸', 'Stylish cocktail bar in the Old Town with great happy hour prices.', 'Elegante bar de cócteles en el casco antiguo con excelentes precios en happy hour.', 38.5372, -0.1358, true, true, true, 4.7, 0),
    (admin_id, 'White Horse Bar',      'English Square',    'English Square',  'Benidorm', NULL, '🐴', 'Lively bar with buy one get one free on spirits and beer every evening.', 'Animado bar con 2x1 en destilados y cerveza cada tarde.', 38.5390, -0.1333, true, true, true, 4.1, 0),
    (admin_id, 'Cafe Benidorm',        'English Square',    'English Square',  'Benidorm', NULL, '☕', 'One of the most popular bars on the English Square — 2-for-1 all night on weekdays.', 'Uno de los bares más populares de la zona inglesa — 2x1 toda la noche entre semana.', 38.5393, -0.1330, true, true, true, 4.4, 0),
    (admin_id, 'Tommy''s Bar',         'New Town',          'New Town',        'Benidorm', NULL, '🎤', 'Karaoke and show bar with 2-for-1 drinks all night long.', 'Bar de karaoke y espectáculos con bebidas 2x1 toda la noche.', 38.5386, -0.1342, true, true, true, 4.2, 0)
  ON CONFLICT DO NOTHING;

  -- ── ALICANTE VENUES ──────────────────────────────────────────────────────

  INSERT INTO restaurants (user_id, name, address, neighborhood, city, phone, image_emoji, description, description_es, latitude, longitude, is_active, is_demo, is_approved, rating, review_count)
  VALUES
    (admin_id, 'Lit Hot Pot', 'Calle Tomás López Torregrosa 10', 'Centro', 'Alicante', '865551748', '🍲', 'Korean hot pot restaurant with an amazing Thursday 2-for-1 deal.', 'Restaurante coreano de hot pot con una increíble oferta 2x1 los jueves.', 38.3452, -0.4810, true, true, true, 4.5, 0),
    (admin_id, 'Jendrix Rock Bar', 'Alicante Centro', 'El Barrio', 'Alicante', NULL, '🎸', 'Rock bar with live music and weekly pub games and drinks night on Wednesdays.', 'Bar de rock con música en vivo y noche semanal de juegos y bebidas los miércoles.', 38.3460, -0.4825, true, true, true, 4.3, 0)
  ON CONFLICT DO NOTHING;

  -- ── DEALS ────────────────────────────────────────────────────────────────

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, valid_days, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Beer Time Deal — Reduced Pints All Day', 'Beer Time — Cervezas a Precio Reducido', 'happyHour', 'Cheap pints', '10:00', '18:00', ARRAY['Mon','Tue','Wed','Thu','Fri'], true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Ibrox Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Happy Hour — Pints €2.50, Cocktails from €4', 'Happy Hour — Cervezas €2.50, Cócteles desde €4', 'happyHour', 'Pints €2.50', '17:00', '19:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Sol Beach Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Happy Hour — Cocktails €5', 'Happy Hour — Cócteles €5', 'happyHour', 'Cocktails €5', '17:00', '20:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Bikini Beach Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Happy Hour — Cocktails €6 + Nachos', 'Happy Hour — Cócteles €6 + Nachos', 'happyHour', 'Cocktails €6', '17:00', '20:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'The Jungle' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'All-Day Happy Hour — Pints from €2.90', 'Happy Hour Todo el Día — Cervezas desde €2.90', 'happyHour', 'Pints from €2.90', '10:00', '23:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Tiki Beach' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Bucket of 5 Beers for €11', 'Cubo de 5 Cervezas por €11', 'drinks', '5 beers €11', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Tiki City' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Cocktail Pitchers from €6.50 All Day', 'Jarras de Cócteles desde €6.50 Todo el Día', 'drinks', 'Pitchers from €6.50', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Tiki Town' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Happy Hour — Drinks All Night', 'Happy Hour — Bebidas Toda la Noche', 'happyHour', 'Happy Hour', '18:30', '20:30', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Riviera Music Lounge' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, valid_days, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Happy 2 Hours — Gin & Cocktails', 'Happy 2 Hours — Ginebra y Cócteles', 'happyHour', 'Happy 2 Hours', '17:00', '19:00', ARRAY['Tue','Wed','Thu','Fri','Sat','Sun'], true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Casper''s Eatery & Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, '€1 Pints Until 7pm', 'Cervezas a €1 Hasta las 19:00', 'drinks', 'Pints €1', '19:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Champions Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Free Sambuca Shot with Every Mahou Beer', 'Chupito de Sambuca Gratis con Cada Mahou', 'drinks', 'Free shot', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Champions Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, '2-for-1 Cocktails Every Evening', '2x1 en Cócteles Cada Tarde', 'twoForOne', '2-for-1 cocktails', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Bahamas Fun Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Sunday Roast — Great Value', 'Sunday Roast — Precio Increíble', 'food', 'Sunday Roast', ARRAY['Sun'], true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Queen Vic' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Happy Hour — 2 Cocktails €12 or 4 Shots €12', 'Happy Hour — 2 Cócteles €12 o 4 Chupitos €12', 'happyHour', '2 cocktails €12', '16:00', '19:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'NOVA Cocktail Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_until, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Buy One Get One Free on Spirits & Beer', '2x1 en Destilados y Cerveza', 'twoForOne', 'BOGOF drinks', '19:00', '21:00', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'White Horse Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_until, valid_days, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, '2-for-1 on Spirits, Pints & Wine All Night', '2x1 en Destilados, Cervezas y Vino Toda la Noche', 'twoForOne', '2-for-1 all night', '23:59', ARRAY['Mon','Tue','Wed','Thu'], true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Cafe Benidorm' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, '2-for-1 Drinks All Night', 'Bebidas 2x1 Toda la Noche', 'twoForOne', '2-for-1 drinks', true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Tommy''s Bar' AND city = 'Benidorm' AND is_demo = true LIMIT 1;

  -- Alicante deals
  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Thursday Madness — Pay 1 Take 2 Hot Pot', 'Jueves Locos — Paga 1 Come 2 Hot Pot', 'twoForOne', '2-for-1 hot pot', ARRAY['Thu'], true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Lit Hot Pot' AND city = 'Alicante' AND is_demo = true LIMIT 1;

  INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_from, valid_days, is_active, is_live, deal_type, source, redemptions_count)
  SELECT id, 'Pub Games Night — Drinks Included', 'Noche de Juegos de Pub — Bebidas Incluidas', 'experiences', 'Games + drinks', '20:00', ARRAY['Wed'], true, false, 'informational', 'community', 0
  FROM restaurants WHERE name = 'Jendrix Rock Bar' AND city = 'Alicante' AND is_demo = true LIMIT 1;

END $$;
