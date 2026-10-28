-- Add sun_tags and sun_note to existing Alicante and Benidorm venues
-- Paste in Supabase SQL Editor → Run

-- ── ALICANTE VENUES ──────────────────────────────────────────────────────────

-- Café del Puerto Alicante — marina waterfront, faces east, great morning sun
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'morning_sun', 'sea_views'],
  sun_note = 'East-facing marina terrace — bright morning sun until midday'
WHERE name = 'Café del Puerto Alicante' AND city = 'Alicante';

-- La Lonja Bar — Plaza del Mar, seafront, afternoon and sunset views
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'afternoon_sun', 'sunset_spot', 'sea_views'],
  sun_note = 'Seafront terrace at Plaza del Mar — golden afternoon sun and sunset over the harbour'
WHERE name = 'La Lonja Bar' AND city = 'Alicante';

-- Bar Manero — Plaza Gabriel Miró, open square, south-facing midday sun
UPDATE restaurants
SET
  sun_tags = ARRAY['south_facing', 'afternoon_sun', 'open_terrace'],
  sun_note = 'Open plaza terrace facing south — full sun from midday through late afternoon'
WHERE name = 'Bar Manero' AND city = 'Alicante';

-- Taberna del Gourmet — Calle San Fernando, sheltered but bright street terrace
UPDATE restaurants
SET
  sun_tags = ARRAY['afternoon_sun', 'open_terrace'],
  sun_note = 'Terrace on sunny Calle San Fernando — pleasant afternoon sun'
WHERE name = 'Taberna del Gourmet' AND city = 'Alicante';

-- Cervecería Sento — Calle San Francisco, central street terrace
UPDATE restaurants
SET
  sun_tags = ARRAY['afternoon_sun', 'open_terrace'],
  sun_note = 'Busy street terrace in the centro — catches afternoon sun from the west'
WHERE name = 'Cervecería Sento' AND city = 'Alicante';

-- Nou Manolín — classic Alicante institution, interior + small terrace
UPDATE restaurants
SET
  sun_tags = ARRAY['afternoon_sun'],
  sun_note = 'Small sunny terrace on Calle Villegas — warm afternoon light'
WHERE name = 'Nou Manolín' AND city = 'Alicante';

-- ── BENIDORM VENUES ───────────────────────────────────────────────────────────

-- Sol Beach Bar — Levante Beach, full beachfront facing south-east
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'morning_sun', 'afternoon_sun', 'sea_views'],
  sun_note = 'Right on Levante Beach — sun from 9am until late afternoon'
WHERE name = 'Sol Beach Bar' AND city = 'Benidorm';

-- Bikini Beach Bar — Levante Beach, beachfront
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'morning_sun', 'afternoon_sun', 'sea_views'],
  sun_note = 'Sandy beachfront spot on Levante — packed with sun all morning and afternoon'
WHERE name = 'Bikini Beach Bar' AND city = 'Benidorm';

-- The Jungle — Levante Beach, beachfront bar and restaurant
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'afternoon_sun', 'sea_views'],
  sun_note = 'Beachfront terrace on Levante Beach — great afternoon sun with sea views'
WHERE name = 'The Jungle' AND city = 'Benidorm';

-- Tiki Beach — Levante Beach, all-day sun, best beachfront spot
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'morning_sun', 'afternoon_sun', 'sea_views', 'sun_all_day'],
  sun_note = 'Prime Levante beachfront position — sun from opening to closing, uninterrupted sea views'
WHERE name = 'Tiki Beach' AND city = 'Benidorm';

-- Tiki Town — Levante Beach, beachfront with DJ
UPDATE restaurants
SET
  sun_tags = ARRAY['beachfront', 'morning_sun', 'afternoon_sun', 'sea_views'],
  sun_note = 'Beachfront bar on Levante — soaks up the sun all day with live DJ vibes'
WHERE name = 'Tiki Town' AND city = 'Benidorm';

-- NOVA Cocktail Bar — Old Town Benidorm, elevated position, rooftop-style terrace
UPDATE restaurants
SET
  sun_tags = ARRAY['rooftop', 'sunset_spot', 'sea_views'],
  sun_note = 'Elevated terrace in the Old Town — stunning sunset views over the bay'
WHERE name = 'NOVA Cocktail Bar' AND city = 'Benidorm';

-- Tiki City — New Town, open terrace on the strip
UPDATE restaurants
SET
  sun_tags = ARRAY['afternoon_sun', 'open_terrace'],
  sun_note = 'Open terrace on the New Town strip — catches good afternoon and evening sun'
WHERE name = 'Tiki City' AND city = 'Benidorm';

-- Champions Bar — New Town Strip, street-facing terrace
UPDATE restaurants
SET
  sun_tags = ARRAY['afternoon_sun', 'open_terrace'],
  sun_note = 'Street terrace on the New Town strip — warm sun in the late afternoon'
WHERE name = 'Champions Bar' AND city = 'Benidorm';

SELECT name, city, sun_tags, sun_note
FROM restaurants
WHERE city IN ('Alicante', 'Benidorm')
  AND sun_tags IS NOT NULL
  AND sun_tags != '{}'
ORDER BY city, name;
