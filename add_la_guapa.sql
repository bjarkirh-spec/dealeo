-- La Guapa Vermutería, Calle San Ildefonso 7, Alicante (Casco Antiguo)
INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, image_emoji, is_active, is_approved, is_demo)
SELECT 'La Guapa Vermutería', 'Alicante', 'Casco Antiguo', 'Calle San Ildefonso 7', 38.3449, -0.4822, '🍸', true, true, false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name = 'La Guapa Vermutería');

INSERT INTO deals (restaurant_id, title, title_es, category, discount_label, valid_days, valid_from, valid_until, is_active, is_live, deal_type, source)
SELECT r.id,
  'Vermouth & Tapas Hour',
  'Hora del Vermut y Tapas',
  'happyHour',
  'Vermut desde 2€',
  ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  '12:00', '15:00',
  true, false, 'informational', 'community'
FROM restaurants r
WHERE r.name = 'La Guapa Vermutería'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id = r.id);
