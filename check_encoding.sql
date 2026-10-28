-- Check what's actually stored for broken rows
SELECT id, title, discount_label,
  octet_length(discount_label) as byte_len,
  encode(convert_to(discount_label, 'UTF8'), 'hex') as hex
FROM deals
WHERE discount_label LIKE '%â%' OR discount_label LIKE '%Ã%'
   OR title LIKE '%â%' OR title LIKE '%Ã%'
LIMIT 10;
