-- Fix UTF-8/Windows-1252 mojibake in deal titles, title_es, and discount_label
-- Run each block separately in Supabase SQL editor

-- Step 1: Fix title column
UPDATE deals SET title =
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    title,
    'â€"',  '—'),
    'â€™',  ''''),
    'â€˜',  ''''),
    'â€œ',  '"'),
    'â€',   '"'),
    'â‚¬',  '€'),
    'Ã©',   'é'),
    'Ã¨',   'è'),
    'Ã ',   'à'),
    'Ã¢',   'â'),
    'Ãª',   'ê'),
    'Ã®',   'î'),
    'Ã´',   'ô'),
    'Ã¹',   'ù'),
    'Ãº',   'ú'),
    'Ã»',   'û'),
    'Ã¡',   'á'),
    'Ã³',   'ó'),
    'Ã²',   'ò'),
    'Ã±',   'ñ'),
    'Ã§',   'ç'),
    'Ã¤',   'ä'),
    'Ã¶',   'ö'),
    'Ã¼',   'ü'),
    'Ã',    'Ú'),
    'Ã',    'Á')
WHERE title ~ 'Ã|â';

-- Step 2: Fix the invisible soft-hyphen case: Ã + chr(173) = í
UPDATE deals SET title = REPLACE(title, 'Ã' || chr(173), 'í')
WHERE title LIKE '%Ã%';

-- Step 3: Fix title_es column
UPDATE deals SET title_es =
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    title_es,
    'â€"',  '—'),
    'â€™',  ''''),
    'â€˜',  ''''),
    'â€œ',  '"'),
    'â€',   '"'),
    'â‚¬',  '€'),
    'Ã©',   'é'),
    'Ã¨',   'è'),
    'Ã ',   'à'),
    'Ã¢',   'â'),
    'Ãª',   'ê'),
    'Ã®',   'î'),
    'Ã´',   'ô'),
    'Ã¹',   'ù'),
    'Ãº',   'ú'),
    'Ã»',   'û'),
    'Ã¡',   'á'),
    'Ã³',   'ó'),
    'Ã²',   'ò'),
    'Ã±',   'ñ'),
    'Ã§',   'ç'),
    'Ã¤',   'ä'),
    'Ã¶',   'ö'),
    'Ã¼',   'ü'),
    'Ã',    'Ú'),
    'Ã',    'Á')
WHERE title_es ~ 'Ã|â';

UPDATE deals SET title_es = REPLACE(title_es, 'Ã' || chr(173), 'í')
WHERE title_es LIKE '%Ã%';

-- Step 4: Fix discount_label column
UPDATE deals SET discount_label =
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    discount_label,
    'â€"',  '—'),
    'â€™',  ''''),
    'â€˜',  ''''),
    'â€œ',  '"'),
    'â€',   '"'),
    'â‚¬',  '€'),
    'Ã©',   'é'),
    'Ã¨',   'è'),
    'Ã ',   'à'),
    'Ã¢',   'â'),
    'Ãª',   'ê'),
    'Ã®',   'î'),
    'Ã´',   'ô'),
    'Ã¹',   'ù'),
    'Ãº',   'ú'),
    'Ã»',   'û'),
    'Ã¡',   'á'),
    'Ã³',   'ó'),
    'Ã²',   'ò'),
    'Ã±',   'ñ'),
    'Ã§',   'ç'),
    'Ã¤',   'ä'),
    'Ã¶',   'ö'),
    'Ã¼',   'ü'),
    'Ã',    'Ú'),
    'Ã',    'Á')
WHERE discount_label ~ 'Ã|â';

UPDATE deals SET discount_label = REPLACE(discount_label, 'Ã' || chr(173), 'í')
WHERE discount_label LIKE '%Ã%';

-- Verify: check any remaining broken chars
SELECT id, title, title_es, discount_label
FROM deals
WHERE title ~ 'Ã|â' OR title_es ~ 'Ã|â' OR discount_label ~ 'Ã|â'
LIMIT 20;
