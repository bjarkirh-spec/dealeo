"""
Verify current DB state + re-check all URLs for 404s.
Run: python check_photos.py
"""
import urllib.request
import json

SUPABASE_URL = "https://edyveysyruhbqkoyiday.supabase.co"
ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXZleXN5cnVoYnFrb3lpZGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTc1NzUsImV4cCI6MjA4ODk3MzU3NX0.hKmsCiGG3-1UW9t0MZilRFUOyJgg_lWloLRWDRxZQFk"

BUILDING_ID  = "photo-1527576539890-dfa815648363"
RED_WINE_ID  = "photo-1510812431401-41d2bd2722f3"

def check_url(url):
    try:
        req = urllib.request.Request(url + "?w=60&q=10" if "?" not in url else url, method="HEAD")
        req.add_header("User-Agent", "Mozilla/5.0")
        with urllib.request.urlopen(req, timeout=6) as r:
            return r.status < 400
    except Exception:
        return False

req = urllib.request.Request(SUPABASE_URL + "/rest/v1/restaurants?select=id,name,image_url&order=name")
req.add_header("apikey", ANON_KEY)
req.add_header("Authorization", f"Bearer {ANON_KEY}")
with urllib.request.urlopen(req) as r:
    rows = json.loads(r.read())

problems = []
for row in rows:
    name = row["name"]
    url  = row.get("image_url") or ""

    if not url:
        problems.append(f"  NULL        | {name}")
        continue
    if BUILDING_ID in url:
        problems.append(f"  BUILDING ❌  | {name} | {url[:70]}")
        continue
    if RED_WINE_ID in url:
        problems.append(f"  RED WINE ❌  | {name} | {url[:70]}")
        continue

    ok = check_url(url)
    if not ok:
        problems.append(f"  404 ❌       | {name} | {url[:70]}")

if problems:
    print(f"PROBLEMS ({len(problems)}):")
    for p in problems:
        print(p)
else:
    print("All good — no broken or wrong photos in DB.")
    print("If app still shows issues → hard refresh browser or clear app cache.")
