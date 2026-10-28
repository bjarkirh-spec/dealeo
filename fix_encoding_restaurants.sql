-- Check for encoding issues in restaurants table
SELECT id, name, address, neighborhood
FROM restaurants
WHERE name ~ 'Ã|â' OR address ~ 'Ã|â' OR neighborhood ~ 'Ã|â'
LIMIT 30;
