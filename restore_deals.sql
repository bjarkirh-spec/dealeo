INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,valid_days,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Beer Time Deal — Reduced Pints All Day','Beer Time — Cervezas a Precio Reducido','happyHour','Cheap pints','10:00','18:00',ARRAY['Mon','Tue','Wed','Thu','Fri'],true,false,'informational','community',0
FROM restaurants WHERE name='Ibrox Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Pints €2.50, Cocktails from €4','Happy Hour — Cervezas €2.50, Cócteles desde €4','happyHour','Pints €2.50','17:00','19:00',true,false,'informational','community',0
FROM restaurants WHERE name='Sol Beach Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Cocktails €5','Happy Hour — Cócteles €5','happyHour','Cocktails €5','17:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='Bikini Beach Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Cocktails €6 + Nachos','Happy Hour — Cócteles €6 + Nachos','happyHour','Cocktails €6','17:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='The Jungle' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'All-Day Happy Hour — Pints from €2.90','Happy Hour Todo el Día — Cervezas desde €2.90','happyHour','Pints from €2.90','10:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Tiki Beach' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Bucket of 5 Beers for €11','Cubo de 5 Cervezas por €11','drinks','5 beers €11',true,false,'informational','community',0
FROM restaurants WHERE name='Tiki City' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Cocktail Pitchers from €6.50 All Day','Jarras de Cócteles desde €6.50 Todo el Día','drinks','Pitchers from €6.50',true,false,'informational','community',0
FROM restaurants WHERE name='Tiki Town' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Drinks All Night','Happy Hour — Bebidas Toda la Noche','happyHour','Happy Hour','18:30','20:30',true,false,'informational','community',0
FROM restaurants WHERE name='Riviera Music Lounge' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,valid_days,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy 2 Hours — Gin & Cocktails','Happy 2 Hours — Ginebra y Cócteles','happyHour','Happy 2 Hours','17:00','19:00',ARRAY['Tue','Wed','Thu','Fri','Sat','Sun'],true,false,'informational','community',0
FROM restaurants WHERE name='Casper''s Eatery & Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'€1 Pints Until 7pm','Cervezas a €1 Hasta las 19:00','drinks','Pints €1','19:00',true,false,'informational','community',0
FROM restaurants WHERE name='Champions Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id AND d.title='€1 Pints Until 7pm');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Free Sambuca Shot with Every Mahou Beer','Chupito de Sambuca Gratis con Cada Mahou','drinks','Free shot',true,false,'informational','community',0
FROM restaurants WHERE name='Champions Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id AND d.title='Free Sambuca Shot with Every Mahou Beer');

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 Cocktails Every Evening','2x1 en Cócteles Cada Tarde','twoForOne','2-for-1 cocktails',true,false,'informational','community',0
FROM restaurants WHERE name='Bahamas Fun Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Sunday Roast — Great Value','Sunday Roast — Precio Increíble','food','Sunday Roast',ARRAY['Sun'],true,false,'informational','community',0
FROM restaurants WHERE name='Queen Vic' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — 2 Cocktails €12 or 4 Shots €12','Happy Hour — 2 Cócteles €12 o 4 Chupitos €12','happyHour','2 cocktails €12','16:00','19:00',true,false,'informational','community',0
FROM restaurants WHERE name='NOVA Cocktail Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Buy One Get One Free on Spirits & Beer','2x1 en Destilados y Cerveza','twoForOne','BOGOF drinks','19:00','21:00',true,false,'informational','community',0
FROM restaurants WHERE name='White Horse Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_until,valid_days,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 on Spirits, Pints & Wine All Night','2x1 en Destilados, Cervezas y Vino Toda la Noche','twoForOne','2-for-1 all night','23:59',ARRAY['Mon','Tue','Wed','Thu'],true,false,'informational','community',0
FROM restaurants WHERE name='Cafe Benidorm' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 Drinks All Night','Bebidas 2x1 Toda la Noche','twoForOne','2-for-1 drinks',true,false,'informational','community',0
FROM restaurants WHERE name='Tommy''s Bar' AND city='Benidorm' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Thursday Madness — Pay 1 Take 2 Hot Pot','Jueves Locos — Paga 1 Come 2 Hot Pot','twoForOne','2-for-1 hot pot',ARRAY['Thu'],true,false,'informational','community',0
FROM restaurants WHERE name='Lit Hot Pot' AND city='Alicante' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_from,valid_days,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Pub Games Night — Drinks Included','Noche de Juegos de Pub — Bebidas Incluidas','experiences','Games + drinks','20:00',ARRAY['Wed'],true,false,'informational','community',0
FROM restaurants WHERE name='Jendrix Rock Bar' AND city='Alicante' AND is_demo=true
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Beers & Shots','Happy Hour — Cervezas y Chupitos','happyHour','Drinks from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'19:00',true,false,'informational','community',0
FROM restaurants WHERE name='Checkpoint Charlie' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — 2x1 Gin Tonics','Happy Hour — 2x1 Gin Tonics','twoForOne','2x1 Gin Tonic',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Cantina del Barrio' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Marina Happy Hour','Happy Hour en el Puerto','happyHour','Beers €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00',true,false,'informational','community',0
FROM restaurants WHERE name='Café del Puerto Alicante' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Vermouth & Tapas Hour','Hora del Vermut con Tapas','happyHour','Vermut + tapa €3.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00',true,false,'informational','community',0
FROM restaurants WHERE name='Bar Manero' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Wine & Pintxos Happy Hour','Happy Hour Vino y Pintxos','happyHour','Wine €3 / Pintxo €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'13:00',true,false,'informational','community',0
FROM restaurants WHERE name='Taberna del Gourmet' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Craft Beer Happy Hour','Happy Hour Cervezas Artesanas','happyHour','Craft beer €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00',true,false,'informational','community',0
FROM restaurants WHERE name='El Portal Taberna' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Pints & Tapas from €2.50','Pintas y Tapas desde €2.50','happyHour','Pint + tapa €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00',true,false,'informational','community',0
FROM restaurants WHERE name='Cervecería Sento' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2 Cocktails for €12','2 Cócteles por €12','twoForOne','2 Cocktails €12',ARRAY['Wed','Thu','Fri','Sat'],'20:00',true,false,'informational','community',0
FROM restaurants WHERE name='Backstage Cocktail Bar' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Sunset Cocktails by the Sea','Cócteles al Atardecer','happyHour','Cocktails €7',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Lonja Bar' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Tapas & Wine at the Bar','Tapas y Vino en la Barra','happyHour','Tapas from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'13:00',true,false,'informational','community',0
FROM restaurants WHERE name='Nou Manolín' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);
