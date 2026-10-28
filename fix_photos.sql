UPDATE restaurants SET image_url = CASE name
  -- Building photo → pub/beer
  WHEN 'The Robin''s Pub'       THEN 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80'
  WHEN 'O''Hara Irish Pub'      THEN 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop&q=80'
  -- Red wine photo → cocktail/beach
  WHEN 'Samoa Café del Puerto'  THEN 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80'
  WHEN 'Sol Beach Bar'          THEN 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80'
  WHEN 'Tiki Town'              THEN 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80'
  -- 404 broken → correct replacements
  WHEN 'Bar 69'                 THEN 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80'
  WHEN 'Bar El Papagayo'        THEN 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80'
  WHEN 'Cheap & Cheerful'       THEN 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80'
  WHEN 'Cromwell''s'            THEN 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop&q=80'
  WHEN 'Hotel California Bar'   THEN 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80'
  WHEN 'Ibrox Bar'              THEN 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&auto=format&fit=crop&q=80'
  WHEN 'Jokers Bar'             THEN 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&auto=format&fit=crop&q=80'
  WHEN 'Oliver''s Bar'          THEN 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80'
  WHEN 'Riviera Music Lounge'   THEN 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80'
  WHEN 'The Red Lion'           THEN 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop&q=80'
  WHEN 'Tiki Beach'             THEN 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80'
  WHEN 'Uncle Peds'             THEN 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&auto=format&fit=crop&q=80'
  WHEN 'Uncle Ron''s'           THEN 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80'
  WHEN 'Western Saloon Benidorm'THEN 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80'
  WHEN 'White Horse Bar'        THEN 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80'
END
WHERE name IN (
  'The Robin''s Pub','O''Hara Irish Pub',
  'Samoa Café del Puerto','Sol Beach Bar','Tiki Town',
  'Bar 69','Bar El Papagayo','Cheap & Cheerful','Cromwell''s',
  'Hotel California Bar','Ibrox Bar','Jokers Bar','Oliver''s Bar',
  'Riviera Music Lounge','The Red Lion','Tiki Beach',
  'Uncle Peds','Uncle Ron''s','Western Saloon Benidorm','White Horse Bar'
);
