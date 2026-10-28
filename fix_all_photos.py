"""
1. Check every restaurant photo URL for 404s
2. Fix broken + wrong-content photos
Run: python fix_all_photos.py
"""
import urllib.request
import urllib.error
import json

SUPABASE_URL = "https://edyveysyruhbqkoyiday.supabase.co"
ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXZleXN5cnVoYnFrb3lpZGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTc1NzUsImV4cCI6MjA4ODk3MzU3NX0.hKmsCiGG3-1UW9t0MZilRFUOyJgg_lWloLRWDRxZQFk"
BASE         = "https://images.unsplash.com/"

def q(pid): return f"{BASE}{pid}?w=600&auto=format&fit=crop&q=80"

# Confirmed working photos (verified via live screenshots)
BEER_MUG      = q("photo-1608270586620-248524c67de9")  # beer mug
BAR_INTERIOR  = q("photo-1572116469696-31de0f17cc34")  # bar interior
BAR_BOTTLES   = q("photo-1575444758702-4a6b9222336e")  # dark bar / bottles
COCKTAIL      = q("photo-1551024709-8f23befc6f87")     # cocktail bar
SPIRITS       = q("photo-1569529465841-dfecdab7503b")  # spirits / whisky
CONCERT       = q("photo-1516450360452-9312f5e86fc7")  # concert stage
CONCERT2      = q("photo-1501386761578-eac5c94b800a")  # concert crowd
BEACH_COCKTAIL= q("photo-1514362545857-3bc16c4c7d1b") # colourful cocktails (Bikini Beach uses this - working)
BEER_GLASS    = q("photo-1561758033-d89a9ad46330")     # beer/whisky glass

# Extra safe IDs — widely used on Unsplash, should be stable
PUB_INTERIOR  = q("photo-1470337458703-46ad1756a187")  # pub interior (Tiki City uses this - working)
TIKI_TROPICAL = q("photo-1559181567-c3190ee5839d")     # tropical bar (Tiki Beach uses this - working)
CONCERT3      = q("photo-1524368535928-5b5e00ddc76b")  # rock stage (Rockstar/Sinatra use - working)

# Photo IDs confirmed WRONG from screenshots (architecture, red wine, etc.)
WRONG_IDS = {
    "photo-1527576539890-dfa815648363",  # shows architecture spiral — used by Robin's Pub, O'Hara
    "photo-1510812431401-41d2bd2722f3",  # shows red wine glasses — used by Samoa, Tiki Town
}

# Assignment: bar name fragment (lower) → replacement photo
REASSIGN = {
    # Irish / English pubs — architecture photo replaced with beer/pub
    "robin":          BEER_MUG,
    "o'hara":         PUB_INTERIOR,
    "hara":           PUB_INTERIOR,
    # Beach / tropical / cocktail — red wine replaced with cocktail
    "samoa":          COCKTAIL,
    "tiki town":      TIKI_TROPICAL,
    "tiki":           TIKI_TROPICAL,
    # Generic fallback by type
    "pub":            PUB_INTERIOR,
    "irish":          BEER_GLASS,
    "cocktail":       COCKTAIL,
    "beach":          BEACH_COCKTAIL,
    "rock":           CONCERT3,
    "music":          CONCERT,
    "disco":          CONCERT3,
}

def supabase_get(path):
    req = urllib.request.Request(SUPABASE_URL + path)
    req.add_header("apikey", ANON_KEY)
    req.add_header("Authorization", f"Bearer {ANON_KEY}")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def supabase_patch(rid, image_url):
    path  = f"/rest/v1/restaurants?id=eq.{rid}"
    body  = json.dumps({"image_url": image_url}).encode()
    req   = urllib.request.Request(SUPABASE_URL + path, data=body, method="PATCH")
    req.add_header("apikey", ANON_KEY)
    req.add_header("Authorization", f"Bearer {ANON_KEY}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "return=minimal")
    with urllib.request.urlopen(req): pass

def check_url(url):
    """Return True if URL loads (2xx or 3xx), False if 4xx/error."""
    try:
        req = urllib.request.Request(url, method="HEAD")
        req.add_header("User-Agent", "Mozilla/5.0")
        with urllib.request.urlopen(req, timeout=6) as r:
            return r.status < 400
    except Exception:
        return False

def best_replacement(name):
    n = name.lower()
    for fragment, photo in REASSIGN.items():
        if fragment in n:
            return photo
    return BAR_INTERIOR  # safe default

def extract_id(url):
    """Get just the photo-XXXXX part from a full URL."""
    if not url:
        return None
    for part in url.split("/"):
        if part.startswith("photo-"):
            return part.split("?")[0]
    return None

# ── Main ──────────────────────────────────────────────────────────────────────
rows = supabase_get("/rest/v1/restaurants?select=id,name,image_url&order=name")
print(f"Checking {len(rows)} restaurants...\n")

to_fix = []  # (id, name, reason, new_url)

for r in rows:
    rid  = r["id"]
    name = r["name"]
    url  = r.get("image_url") or ""
    pid  = extract_id(url)

    if not url:
        to_fix.append((rid, name, "no photo", best_replacement(name)))
        continue

    if pid in WRONG_IDS:
        to_fix.append((rid, name, f"wrong content ({pid})", best_replacement(name)))
        continue

    # Check for 404
    test_url = url if "?" in url else url + "?w=60&q=10"
    ok = check_url(test_url)
    if not ok:
        print(f"  404 → {name}: {url[:70]}")
        to_fix.append((rid, name, "404 broken", best_replacement(name)))

print(f"\n{'─'*60}")
if not to_fix:
    print("All photos OK — nothing to fix.")
else:
    print(f"Fixing {len(to_fix)} restaurants:\n")
    for rid, name, reason, new_url in to_fix:
        print(f"  [{reason}] {name}")
        print(f"    → {new_url[:80]}")
        supabase_patch(rid, new_url)
    print(f"\nDone — {len(to_fix)} photos patched.")
