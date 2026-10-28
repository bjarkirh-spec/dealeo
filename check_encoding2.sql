-- Find any non-ASCII characters in deal text fields
SELECT id, title, title_es, discount_label
FROM deals
WHERE discount_label ~ '[^\x00-\x7F]'
   OR title ~ '[^\x00-\x7F]'
   OR title_es ~ '[^\x00-\x7F]'
LIMIT 20;
