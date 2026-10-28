INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Geordie Bar Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5371,-0.1311,4.2,'⚫','https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Geordie Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Drinks from €1.50','Happy Hour — Bebidas desde €1.50','happyHour','Drinks from €1.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Geordie Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Drinks from €1.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 Shots All Night','2x1 Chupitos Toda la Noche','twoForOne','2-for-1 Shots',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Geordie Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 Shots All Night');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Tiger Tiger Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5374,-0.1314,4.1,'🐯','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Tiger Tiger Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Cocktails €3','Happy Hour — Cócteles €3','happyHour','Cocktails €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Tiger Tiger Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Cocktails €3');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 on All Cocktails','2x1 en Todos los Cócteles','twoForOne','2-for-1 Cocktails',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Tiger Tiger Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 on All Cocktails');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Sinatra''s Bar Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5377,-0.1317,4.3,'🎤','https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Sinatra''s Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Live Music Every Night — Free Entry','Música en Directo Cada Noche — Entrada Gratis','experiences','Free entry + live music',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Sinatra''s Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Live Music Every Night — Free Entry');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints €2','Happy Hour — Pintas €2','happyHour','Pints €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Sinatra''s Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints €2');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Legends Bar Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5380,-0.1320,4.2,'🌟','https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Legends Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — All Drinks €2','Happy Hour — Todas las Bebidas €2','happyHour','All drinks €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Legends Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — All Drinks €2');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Bucket of 5 Beers — €8','Cubo de 5 Cervezas — €8','drinks','5 beers €8',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Legends Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Bucket of 5 Beers — €8');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Shooters Bar Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5358,-0.1298,4.0,'🎯','https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Shooters Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints €2.50','Happy Hour — Pintas €2,50','happyHour','Pints €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Shooters Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints €2.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 Spirits All Night','2x1 Licores Toda la Noche','twoForOne','2-for-1 Spirits',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','03:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Shooters Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 Spirits All Night');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Manhattan Bar Benidorm','Benidorm','Levante Strip','Avenida de la Comunidad Valenciana, Benidorm',38.5361,-0.1301,4.1,'🗽','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Manhattan Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Cocktails from €3.50','Happy Hour — Cócteles desde €3,50','happyHour','Cocktails from €3.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Manhattan Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Cocktails from €3.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'2-for-1 on Sharing Pitchers','2x1 en Jarras para Compartir','twoForOne','2-for-1 Pitchers',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Manhattan Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='2-for-1 on Sharing Pitchers');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Lineker''s Bar Benidorm','Benidorm','Levante Strip','Avenida de la Comunidad Valenciana, Benidorm',38.5364,-0.1304,4.4,'⚽','https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Lineker''s Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'All Sports Live — Free Entry','Todo el Deporte en Directo — Entrada Gratis','experiences','Free entry + sport',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'11:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Lineker''s Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='All Sports Live — Free Entry');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints €2.50','Happy Hour — Pintas €2,50','happyHour','Pints €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Lineker''s Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints €2.50');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'The Old English Pub Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5383,-0.1323,4.0,'🏴󠁧󠁢󠁥󠁮󠁧󠁿','https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='The Old English Pub Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Full English Breakfast — €5.50','Desayuno Inglés Completo — €5,50','food','Breakfast €5.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'08:00','14:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Old English Pub Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Full English Breakfast — €5.50');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints from €2','Happy Hour — Pintas desde €2','happyHour','Pints from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='The Old English Pub Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints from €2');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Paddy''s Point Irish Bar Benidorm','Benidorm','Levante Strip','Calle Gerona, Benidorm',38.5386,-0.1325,4.2,'☘️','https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Paddy''s Point Irish Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Guinness €3','Happy Hour — Guinness €3','happyHour','Guinness €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Paddy''s Point Irish Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Guinness €3');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Live Irish Music — Free Entry','Música Irlandesa en Directo — Entrada Gratis','experiences','Free entry + live music',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','02:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Paddy''s Point Irish Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Live Irish Music — Free Entry');

INSERT INTO restaurants (name, city, neighborhood, address, latitude, longitude, rating, image_emoji, image_url, is_active, is_approved, is_demo)
SELECT 'Harry''s Bar Benidorm','Benidorm','Levante Strip','Avenida de la Comunidad Valenciana, Benidorm',38.5367,-0.1307,4.1,'🍺','https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',true,true,false
WHERE NOT EXISTS (SELECT 1 FROM restaurants WHERE name='Harry''s Bar Benidorm' AND city='Benidorm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Happy Hour — Pints €2','Happy Hour — Pintas €2','happyHour','Pints €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Harry''s Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Happy Hour — Pints €2');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source)
SELECT r.id,'Pub Quiz — Free Entry Every Tuesday','Pub Quiz — Entrada Gratis Cada Martes','experiences','Free pub quiz',ARRAY['Tue'],'20:00','23:00',true,false,'informational','community'
FROM restaurants r WHERE r.name='Harry''s Bar Benidorm' AND r.city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=r.id AND d.title='Pub Quiz — Free Entry Every Tuesday');
