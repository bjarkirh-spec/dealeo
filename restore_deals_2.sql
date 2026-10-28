INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Tapas & Beer from €4','Tapas y Cerveza desde €4','happyHour','Tapa + beer €4',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'13:00',true,false,'informational','community',0
FROM restaurants WHERE name='El Patio' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'House Wine & Montaditos — €1.50 each','Vino de la Casa y Montaditos — €1.50 c/u','happyHour','Wine + montadito €1.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Taberna' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Half-Litre Draught €3','Happy Hour — Media Jarra €3','happyHour','Half-litre €3',ARRAY['Mon','Tue','Wed','Thu','Fri'],'17:00',true,false,'informational','community',0
FROM restaurants WHERE name='Cervecería Munich' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Vermouth Hour — Vermut + Pintxo €3','Hora del Vermut — Vermut + Pintxo €3','happyHour','Vermut + pintxo €3',ARRAY['Sat','Sun'],'12:00',true,false,'informational','community',0
FROM restaurants WHERE name='El Cantó' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Caña + Tapa from €2 on the Explanada','Caña + Tapa desde €2 en la Explanada','happyHour','Caña + tapa €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'11:00',true,false,'informational','community',0
FROM restaurants WHERE name='Bar Capitol' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Bar Menu — Creative Tapas & Glass of Wine €8','Menú de Barra — Tapas Creativas y Copa de Vino €8','food','Tapas + wine €8',ARRAY['Tue','Wed','Thu','Fri'],'13:00',true,false,'informational','community',0
FROM restaurants WHERE name='Restaurante Monastrell' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Wine from €1.20 a Glass All Day','Vino desde €1.20 la Copa Todo el Día','happyHour','Wine €1.20',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'10:00',true,false,'informational','community',0
FROM restaurants WHERE name='Pepe el Navarro' AND city='Alicante'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Beachfront Happy Hour — Sangria & Cañas €3','Happy Hour en la Playa — Sangría y Cañas €3','happyHour','Sangria + caña €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Finca Beach Bar' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Tapas & Local Wine — 2 Tapas + Wine €6','Tapas y Vino Local — 2 Tapas + Vino €6','happyHour','2 tapas + wine €6',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00',true,false,'informational','community',0
FROM restaurants WHERE name='Bar Nou Manolín Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Sunset Cocktails — 2 for €15 from 7pm','Cócteles al Atardecer — 2 por €15 desde las 19:00','twoForOne','2 cocktails €15',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'19:00',true,false,'informational','community',0
FROM restaurants WHERE name='Mirador Sunset Bar' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);
