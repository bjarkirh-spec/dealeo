UPDATE deals SET
  title = convert_from(convert_to(title, 'WIN1252'), 'UTF8'),
  title_es = convert_from(convert_to(title_es, 'WIN1252'), 'UTF8'),
  discount_label = convert_from(convert_to(discount_label, 'WIN1252'), 'UTF8')
WHERE title ~ '[^\x00-\x7F]' OR title_es ~ '[^\x00-\x7F]' OR discount_label ~ '[^\x00-\x7F]';
