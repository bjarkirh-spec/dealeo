# Dealeo — Claude Context

## Project
- **App:** Dealeo PWA — food & drink deal discovery for Alicante/Benidorm, Spain
- **Stack:** Next.js 16 App Router, Supabase (PostgreSQL + Auth), Tailwind CSS v4, TypeScript
- **Repo path:** `C:\Users\bjark\OneDrive\Desktop\dealeo`
- **Production:** https://www.dealeo.es (deployed via `vercel --prod` from terminal — no git)
- **Supabase project:** dealeo (free tier, kept alive via `/api/cron/keepalive`)

## Deploy command
```
vercel --prod
```
Run from `C:\Users\bjark\OneDrive\Desktop\dealeo` in VS Code terminal.

## Critical gotcha — Android folder
The Android/Bubblewrap project lives in `android-app/`. It MUST stay named `android-app/` — **never rename it back to `app/`**. If it's named `app/`, Next.js uses it as the app router directory instead of `src/app/`, breaking ALL routes with a 404.

## Android / Google Play
- Bubblewrap AAB: `android-app/build/outputs/bundle/releaseBundle/app-release-bundle.aab`
- Keystore: `android.keystore` (password stored securely by user)
- Google Play Console: account "Dealeo", identity verification pending as of 2026-04-13

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — shared UI components
- `src/lib/db.ts` — Supabase data fetching (getDealsWithRestaurants, getDealById, getSunnyVenues)
- `src/lib/types.ts` — TypeScript types (DealCategory, DbDeal, DbRestaurant)
- `src/lib/translations.ts` — EN/ES bilingual strings
- `src/context/LanguageContext.tsx` — language state (EN/ES)
- `public/sw.js` — service worker (push notifications + offline)

## Database tables (Supabase)
- `restaurants` — venue profiles (name, city, neighborhood, image_url, sun_tags, sun_note, is_demo, is_active, is_approved)
- `deals` — deals (title, title_es, category, valid_from, valid_to, valid_days, is_live, is_active)
- `deal_redemptions` — redemption log
- `deal_going` — "I'm going" counts
- `profiles` — user profiles
- `push_subscriptions` — web push tokens

## Key features
- Home feed with sections: Live, Coming Up, Happy Hour, Experiences, ☀️ Sun Spots, Trending
- Sun Spots: `sun_tags text[]` + `sun_note text` on restaurants table; `getSunnyVenues()` in db.ts; horizontal scroll row on homepage; badges on DealCard
- Bilingual EN/ES throughout
- Business dashboard: deals CRUD, live toggle, analytics, QR tools
- PWA install prompt (Android + iOS)
- Push notifications: daily at 16:00 via `/api/cron/daily-push`
- Crons: expire-deals (3am), daily-push (16:00), keepalive (every 5 days)
- Free tier: 2 redemptions/month, upgrade CTA

## Email
- Provider: Resend API
- From: hello@dealeo.es → forwards to bjarkirh@gmail.com

## User preferences
- Always deploy after finishing a feature — don't stop and ask
- Pick the next logical improvement autonomously
- Keep responses concise
