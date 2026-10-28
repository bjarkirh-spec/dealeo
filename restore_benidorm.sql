INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Tapas & Wine from €2','Tapas y Vino desde €2','happyHour','Tapas from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00','22:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Cava Aragonesa' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Pintxos Happy Hour — 3 Pintxos + Drink €6','Happy Hour — 3 Pintxos + Bebida €6','happyHour','3 pintxos + drink €6',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Taperia Aurrera' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Lunch Menu — Paella + Drink €12','Menú del Día — Paella + Bebida €12','food','Paella + drink €12',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'13:00','16:00',true,false,'informational','community',0
FROM restaurants WHERE name='Restaurante Ulia' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Sunset Happy Hour — Wine & Snacks from €3','Happy Hour Atardecer — Vino y Aperitivos desde €3','happyHour','Wine from €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:30','20:30',true,false,'informational','community',0
FROM restaurants WHERE name='Bar Mal Pas' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 Cocktails — Every Night 8–10pm','2x1 Cócteles — Cada Noche 20–22h','twoForOne','2-for-1 cocktails',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','22:00',true,false,'informational','community',0
FROM restaurants WHERE name='Bar 69 Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Pints €2.50 all afternoon','Happy Hour — Pintas €2.50 toda la tarde','happyHour','Pints €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','19:00',true,false,'informational','community',0
FROM restaurants WHERE name='Vincent''s Old Town' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Afternoon Drinks — Beer & Shots from €2','Tarde de Copas — Cerveza y Chupitos desde €2','happyHour','Drinks from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'15:00','18:00',true,false,'informational','community',0
FROM restaurants WHERE name='Thistle Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'All-Day Happy Hour — Beers & Spirits from €2','Happy Hour Todo el Día — Cervezas desde €2','happyHour','Drinks from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'11:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='Railway''s Bar' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour + Live Music — 6:30–8:30pm nightly','Happy Hour + Música en Vivo — 18:30–20:30','happyHour','Drinks discounted',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:30','20:30',true,false,'informational','community',0
FROM restaurants WHERE name='Riviera Music Lounge' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 Shots — Pre-Party 8–10pm','2x1 Chupitos — Pre-Fiesta 20–22h','twoForOne','2-for-1 shots',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','22:00',true,false,'informational','community',0
FROM restaurants WHERE name='Black Chicken Bar' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Early Doors — Pints €3 from 5pm','Apertura — Pintas €3 desde las 17h','happyHour','Pints €3',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='Talk of the Coast' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Beach Happy Hour — Cocktails & Cañas €3.50','Happy Hour Playa — Cócteles y Cañas €3.50','happyHour','Cocktails €3.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','19:00',true,false,'informational','community',0
FROM restaurants WHERE name='Sol Beach Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Match Day Deal — Pint + Pie €6','Día de Partido — Pinta + Empanada €6','food','Pint + pie €6',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Med23 Pub' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Double Measures, Single Price','Happy Hour — Doble Medida, Precio Sencillo','happyHour','Doubles at single price',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','21:00',true,false,'informational','community',0
FROM restaurants WHERE name='Andy''s Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 Pints on the English Square','2x1 Pintas en English Square','twoForOne','2-for-1 pints',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Champions Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Spirits €2 all evening','Happy Hour — Licores €2 toda la tarde','happyHour','Spirits €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','21:00',true,false,'informational','community',0
FROM restaurants WHERE name='Hippodrome Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Long Island Iced Tea — €4 all night','Long Island Tea — €4 toda la noche','drinks','Long Island €4',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Bahamas Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Happy Hour — Pints & Shots from €2','Happy Hour — Pintas y Chupitos desde €2','happyHour','Drinks from €2',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'16:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='Queen Mary Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'2-for-1 Draught Beer — 5pm to 8pm','2x1 Cerveza de Barril — 17h a 20h','twoForOne','2-for-1 draught',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'17:00','20:00',true,false,'informational','community',0
FROM restaurants WHERE name='Drop Inn Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Cheap Rounds — Spirits from €2.50 all night','Rondas Baratas — Licores desde €2.50','happyHour','Spirits from €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'19:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Faulty Towers Bar' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Caña + Tapa from €2.50 all day','Caña + Tapa desde €2.50 todo el día','happyHour','Caña + tapa €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00','22:00',true,false,'informational','community',0
FROM restaurants WHERE name='El Rincón de las Cañas' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Wine & Cheese Board €9','Tabla de Quesos y Vino €9','happyHour','Wine + cheese €9',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','21:00',true,false,'informational','community',0
FROM restaurants WHERE name='La Bodeguita Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Free Entry — Live Tribute Acts & Cabaret Nightly','Entrada Gratis — Tributos y Cabaret cada Noche','experiences','Free entry',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'20:00','02:00',true,false,'informational','community',0
FROM restaurants WHERE name='Morgan Tavern' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'All-Day Happy Hour — Pints €2.50, DJ from 11:30am','Happy Hour Todo el Día — Pintas €2.50, DJ desde las 11:30','happyHour','Pints €2.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'10:00','01:00',true,false,'informational','community',0
FROM restaurants WHERE name='Tiki Beach Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Cheapest Pints on the Strip — €1.50 all day','Pintas más Baratas del Strip — €1.50 todo el día','happyHour','Pints €1.50',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'11:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Rockstar Bar Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Wild West Nights — Shows & Themed Entertainment','Noches del Oeste — Shows y Entretenimiento','experiences','Themed shows nightly',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'21:00','03:00',true,false,'informational','community',0
FROM restaurants WHERE name='Red Dog Western Saloon' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Foam Party & Live Entertainment from 9pm','Fiesta de Espuma y Entretenimiento en Vivo desde 21h','experiences','Shows from 9pm',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'21:00','04:00',true,false,'informational','community',0
FROM restaurants WHERE name='Jokers Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Wood-Fired Pizza from €7 — Old Town','Pizza de Leña desde €7 — Casco Antiguo','food','Pizza from €7',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00','23:00',true,false,'informational','community',0
FROM restaurants WHERE name='Pizzeria Avanti Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Full English Breakfast + Tea/Coffee from €4','Desayuno Inglés Completo + Té/Café desde €4','food','Full English from €4',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'08:00','13:00',true,false,'informational','community',0
FROM restaurants WHERE name='Yorkshire Pride Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Sunday Roast — Full Dinner from €9','Asado Dominical — Cena Completa desde €9','food','Roast dinner from €9',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'12:00','21:00',true,false,'informational','community',0
FROM restaurants WHERE name='Two Palms Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Menú del Día — 3 Courses + Drink from €10','Menú del Día — 3 Platos + Bebida desde €10','food','3 courses + drink €10',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'13:00','16:00',true,false,'informational','community',0
FROM restaurants WHERE name='Internationale Benidorm' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);

INSERT INTO deals (restaurant_id,title,title_es,category,discount_label,valid_days,valid_from,valid_until,is_active,is_live,deal_type,source,redemptions_count)
SELECT id,'Cocktail Hour — Signature Drinks from €6','Hora del Cóctel — Bebidas desde €6','drinks','Cocktails from €6',ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],'18:00','21:00',true,false,'informational','community',0
FROM restaurants WHERE name='Baldo Restaurant & Cocktail Bar' AND city='Benidorm'
AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.restaurant_id=restaurants.id);
