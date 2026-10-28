"""
Targeted patch: fix Tiki photos + add variety so bars don't all look the same.
Run: python fix_variety.py
"""
import urllib.request
import json

SUPABASE_URL = "https://edyveysyruhbqkoyiday.supabase.co"
ANON_KEY     = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXZleXN5cnVoYnFrb3lpZGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTc1NzUsImV4cCI6MjA4ODk3MzU3NX0.hKmsCiGG3-1UW9t0MZilRFUOyJgg_lWloLRWDRxZQFk"
BASE = "https://images.unsplash.com/"
def q(pid): return f"{BASE}{pid}?w=600&auto=format&fit=crop&q=80"

# All confirmed working (not 404, correct content type)
BEER_MUG     = q("photo-1608270586620-248524c67de9")  # beer mug
BAR_INTERIOR = q("photo-1572116469696-31de0f17cc34")  # bar interior dark
BAR_BOTTLES  = q("photo-1575444758702-4a6b9222336e")  # bar with bottles/people
COCKTAIL     = q("photo-1551024709-8f23befc6f87")     # cocktail bar
SPIRITS      = q("photo-1569529465841-dfecdab7503b")  # spirits / whisky
CONCERT      = q("photo-1516450360452-9312f5e86fc7")  # concert stage lights
CONCERT2     = q("photo-1501386761578-eac5c94b800a")  # concert crowd
PUB_INTERIOR = q("photo-1470337458703-46ad1756a187")  # warm pub interior
COLORFUL_CTL = q("photo-1514362545857-3bc16c4c7d1b")  # colourful cocktails
BEER_GLASS   = q("photo-1561758033-d89a9ad46330")     # beer/whisky glass pour
ROCK_STAGE   = q("photo-1524368535928-5b5e00ddc76b")  # rock stage

# Specific overrides: exact restaurant name → photo
PATCHES = {
    # Tiki — previous photo was 404; use colorful cocktails (tropical vibe)
    "Tiki Beach":           COLORFUL_CTL,
    "Tiki Town":            COLORFUL_CTL,
    # Add variety to bars that all got the same bar_interior
    "Bar El Papagayo":      COCKTAIL,
    "Cheap & Cheerful":     BEER_MUG,
    "Cromwell's":           PUB_INTERIOR,
    "Hotel California Bar": BEER_GLASS,
    "Ibrox Bar":            BAR_BOTTLES,
    "Jokers Bar":           BAR_BOTTLES,
    "The Red Lion":         PUB_INTERIOR,
    "Uncle Peds":           BEER_MUG,
    "Uncle Ron's":          COCKTAIL,
    "White Horse Bar":      BEER_GLASS,
}

def patch(rid, url):
    path = f"/rest/v1/restaurants?id=eq.{rid}"
    body = json.dumps({"image_url": url}).encode()
    req  = urllib.request.Request(SUPABASE_URL + path, data=body, method="PATCH")
    req.add_header("apikey", ANON_KEY)
    req.add_header("Authorization", f"Bearer {ANON_KEY}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "return=minimal")
    with urllib.request.urlopen(req): pass

# Fetch all
req = urllib.request.Request(SUPABASE_URL + "/rest/v1/restaurants?select=id,name&order=name")
req.add_header("apikey", ANON_KEY)
req.add_header("Authorization", f"Bearer {ANON_KEY}")
with urllib.request.urlopen(req) as r:
    rows = json.loads(r.read())

count = 0
for row in rows:
    name = row["name"]
    if name in PATCHES:
        print(f"Patching: {name}")
        patch(row["id"], PATCHES[name])
        count += 1

print(f"\nDone — {count} patched.")
