INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'The Red Lion Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5362,-0.1302,4.3,'🦁','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='The Red Lion Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 Cocktails All Night','2x1 Cócteles Toda la Noche','twoForOne','2-for-1 Cocktails',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Red Lion Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 Cocktails All Night');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints from €2','Happy Hour — Pintas desde €2','happyHour','Pints from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Red Lion Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints from €2');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Rocky''s Pub Benidorm','Benidorm','Levante Strip','Avenida de la Comunidad Valenciana, Benidorm',38.5365,-0.1306,4.2,'🥊','https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Rocky''s Pub Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Drinks from €1.50','Happy Hour — Bebidas desde €1.50','happyHour','Drinks from €1.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Rocky''s Pub Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Drinks from €1.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Free Shot with Every Double','Chupito Gratis con Cada Doble','drinks','Free Shot',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Rocky''s Pub Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Free Shot with Every Double');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Rose and Crown Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5368,-0.1308,4.1,'🌹','https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Rose and Crown Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Traditional Pub Breakfast — €5.95','Desayuno Inglés Tradicional — €5,95','food','Breakfast €5.95',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'09:00','15:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Rose and Crown Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Traditional Pub Breakfast — €5.95');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints €2.50','Happy Hour — Pintas €2,50','happyHour','Pints €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Rose and Crown Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints €2.50');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Riders Bar Benidorm','Benidorm','Levante Strip','Avenida de la Comunidad Valenciana, Benidorm',38.5355,-0.1295,4.0,'🏍️','https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Riders Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 on All Spirits','2x1 en Todos los Licores','twoForOne','2-for-1 Spirits',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'19:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Riders Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 on All Spirits');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Cocktails €3','Happy Hour — Cócteles €3','happyHour','Cocktails €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Riders Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Cocktails €3');
