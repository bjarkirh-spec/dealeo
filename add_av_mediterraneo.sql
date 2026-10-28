INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'The Black Bull Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5372,-0.1288,4.1,'🐂','https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='The Black Bull Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints €2','Happy Hour — Pintas €2','happyHour','Pints €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Black Bull Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints €2');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 on All Spirits','2x1 en Todos los Licores','twoForOne','2-for-1 Spirits',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Black Bull Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 on All Spirits');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'The Anchor Bar Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5375,-0.1291,4.2,'⚓','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='The Anchor Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — All Drinks €2','Happy Hour — Todas las Bebidas €2','happyHour','All drinks €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Anchor Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — All Drinks €2');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Karaoke Night — Free Entry','Noche de Karaoke — Entrada Gratis','experiences','Free karaoke',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'21:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Anchor Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Karaoke Night — Free Entry');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Fat Cat Bar Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5378,-0.1294,4.0,'🐱','https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Fat Cat Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Cocktails €3.50','Happy Hour — Cócteles €3,50','happyHour','Cocktails €3.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Fat Cat Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Cocktails €3.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Bucket of 5 Beers — €9','Cubo de 5 Cervezas — €9','drinks','5 beers €9',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Fat Cat Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Bucket of 5 Beers — €9');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Chaplins Bar Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5381,-0.1297,4.2,'🎩','https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Chaplins Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints from €2.50','Happy Hour — Pintas desde €2,50','happyHour','Pints from €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Chaplins Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints from €2.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Live Entertainment — Free Entry Nightly','Entretenimiento en Directo — Entrada Gratis','experiences','Free entry nightly',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Chaplins Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Live Entertainment — Free Entry Nightly');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Cool Britannia Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5384,-0.1300,4.1,'🇬🇧','https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Cool Britannia Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — 3 Shots for €5','Happy Hour — 3 Chupitos por €5','happyHour','3 shots €5',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Cool Britannia Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — 3 Shots for €5');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 Cocktails All Night','2x1 Cócteles Toda la Noche','twoForOne','2-for-1 Cocktails',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Cool Britannia Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 Cocktails All Night');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'The Highlander Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5369,-0.1285,4.3,'🏴󠁧󠁢󠁳󠁣󠁴󠁿','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='The Highlander Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Whisky from €2','Happy Hour — Whisky desde €2','happyHour','Whisky from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Highlander Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Whisky from €2');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Scottish Breakfast — €6','Desayuno Escocés — €6','food','Breakfast €6',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'08:00','13:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Highlander Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Scottish Breakfast — €6');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'The Beachcomber Benidorm','Benidorm','Levante Strip','Av. del Mediterráneo, Benidorm',38.5366,-0.1282,4.2,'🏖️','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='The Beachcomber Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — All Day on Mondays','Happy Hour — Todo el Día los Lunes','happyHour','All-day happy hour Mon',ARRAY['Mon'],'10:00','23:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Beachcomber Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — All Day on Mondays');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Cocktails €3','Happy Hour — Cócteles €3','happyHour','Cocktails €3',ARRAY['Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Beachcomber Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Cocktails €3');
