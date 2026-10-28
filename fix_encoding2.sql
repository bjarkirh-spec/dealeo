-- Preview first — check the conversion looks correct before applying
SELECT
  title,
  convert_from(convert_to(title, 'WIN1252'), 'UTF8') as title_fixed,
  discount_label,
  convert_from(convert_to(discount_label, 'WIN1252'), 'UTF8') as label_fixed
FROM deals
WHERE title ~ '[^\x00-\x7F]' OR discount_label ~ '[^\x00-\x7F]'
LIMIT 5;
