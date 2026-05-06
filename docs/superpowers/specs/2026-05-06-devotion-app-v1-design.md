# Devotion App v1 — Design Spec

**Date:** 2026-05-06
**Owner:** Owen Leaton
**Status:** Draft, pending user review
**Scope:** v1 of the native Devotion app — Hevy + MyFitnessPal merged. Workout-first with AI plan generation, mid-session AI adjustments, a curated library, and community routines. Food tracking is Phase 2 but the IA reserves space for it.

---

## Summary

Devotion v1 is a native iOS + Android + Web app built in Expo (React Native), designed to merge the workout-tracking experience of Hevy with the dashboard/onboarding rhythm of MyFitnessPal, applied to Devotion's existing brand identity. The differentiator is AI: plan generation from goals + equipment, and a "make this easier/harder" button during active workouts. Free tier supports unlimited logging and full community access; premium (£4.99/mo or £39.99/yr) unlocks unlimited AI calls. Target ship: ~12 weeks of focused build, App Store submission included.

---

## Decisions locked during brainstorm

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Platform | **Expo (React Native) + EAS Build/Submit** | App Store target requires native; EAS lets us submit from Windows without a Mac; single codebase covers iOS, Android, web preview |
| 2 | Brand | **Hevy/MFP for layout/IA only; Devotion ember/iron/coal palette + Archivo Black + sharp corners retained** | User explicitly wanted the workflow not the visual language |
| 3 | v1 feature scope | **All 4 AI/discovery features:** AI plan generator + mid-session "make easier" + curated library + community routines | User direction — accepting larger v1 in exchange for full launch |
| 4 | Monetization | **Freemium**, AI features gated, all logging + library + community free; £4.99/mo or £39.99/yr; 7-day trial | Matches reference apps; AI gate aligns with real per-user variable cost |

---

## Section 1 — Tech stack & architecture

### Mobile app

- **Expo SDK 52 + React Native 0.76 + TypeScript**
- **Expo Router** for file-based routing (mirrors Next.js App Router mental model)
- **NativeWind** for styling — Tailwind classes on RN; reuses Devotion's existing `ember`/`iron`/`coal`/`paper` token system
- **Zustand** for client state, **TanStack Query** for server state and caching

### Build & deploy

- **EAS Build** for binaries (iOS .ipa from Windows), **EAS Submit** for store delivery
- App Store Connect: enroll Apple Developer Program under personal account first ($99/yr, ~24h approval). Transfer to Devotion Ltd once company formed.
- Google Play: $25 one-time

### Backend

- **Supabase** (Postgres + Auth + Storage + Realtime + RLS)
  - Auth: email/password + Apple Sign-In + Google Sign-In
  - Storage: routine cover images, profile pics
  - Edge Functions (Deno): server-side Claude calls, RevenueCat webhook, deep-link metadata for marketing site
- **Row-Level Security** enforces privacy: users see their own data + public routines; exercise library world-readable

### AI

- **Anthropic Claude API**
  - **Sonnet 4.6** for plan generation (quality)
  - **Haiku 4.5** for mid-session adjustments + alternates (speed, cost)
  - **Prompt caching** on system prompt + exercise DB context (~10× cost reduction on repeats)
  - **Structured output via tool use** — never free-form prose
  - All AI calls go through Supabase Edge Functions, never directly from app (so we monitor cost, swap models, add caching)

### Exercise database

- **`yuhonas/free-exercise-db`** seed (~800 exercises, MIT, includes images, equipment, primary/secondary muscles, instructions)
- Seeded once into Supabase `exercises` table
- Users can add custom exercises (`exercises.created_by` = user_id)

### Payments

- **RevenueCat SDK** (handles iOS, Android, web in one)
- Webhook → Supabase Edge Function → updates `user_subscription` row
- Source of truth: RevenueCat. Our DB is a cache.

### Analytics & feature flags

- **PostHog** (free tier) — funnels for onboarding, feature flags for dev-skip toggle in production-ish builds

### Marketing site

- **Stays as-is** at `devotion.fitness` — current Next.js code on Vercel
- Becomes the "download" landing page + handles `/r/<slug>` deep links for shared routines (renders public routine page, prompts app install)
- App and marketing site are separate repos; share only brand tokens (committed-and-copied, no monorepo)

### Repo structure

- **New repo: `devotion-app`** (Expo)
- Existing repo: marketing site (current repo)
- No monorepo in v1 — adds complexity solo, can converge later if needed

---

## Section 2 — App structure (tabs, screens, onboarding)

### Bottom navigation — 4 tabs

| Tab | Role | Inspired by |
|---|---|---|
| **Home** | Today snapshot — next workout, streak, quick actions | MFP Today |
| **Train** | Routines, Start Workout, Library, Explore (community), AI Plan Gen | Hevy Workout |
| **Eat** | Calorie ring + macros + diary — **placeholder shell in v1** with "Coming soon" + waitlist | MFP Today/Diary |
| **You** | Profile, stats, social, settings, premium | Hevy Profile + MFP More |

The Eat tab shell is intentional in v1 so the navigation doesn't restructure when food drops in v2.

### Onboarding flow (8 steps)

MFP-style top progress bar. Each step is a separate screen with Back + Next.

1. **Goal** — multi-select up to 2: build muscle / get stronger / lose fat / general fitness / improve endurance
2. **Experience level** — beginner / intermediate / advanced
3. **Days per week** — 2 / 3 / 4 / 5 / 6
4. **Equipment** — full gym / home + dumbbells / bodyweight only / custom checklist
5. **Body** — height + weight + sex (kg/lb + ft/in toggle)
6. **Injuries to avoid** — optional free text
7. **AI plan generation reveal** — loading screen with progress steps, then "Here's your 4-week plan" preview (mirrors MFP's "your daily calorie goal" reveal)
8. **Sign up to save** — email + Apple Sign-In + Google Sign-In

Account creation gated to step 8 (after value shown) to maximize conversion.

### Dev-skip mechanism

- **Trigger:** tap Devotion logo 5× on splash screen
- **Hidden Dev menu** with toggles:
  - Skip onboarding (loads saved profile from local storage)
  - Force premium (bypass paywall locally)
  - Reset all local data
  - Prefill workout history with sample data
  - Toggle PostHog feature flags
- Stored in local storage, never synced to Supabase
- Auto-stripped from production App Store builds via env flag (`EAS_BUILD_PROFILE === 'production'`)

### Full v1 screen inventory (26 screens)

| # | Screen | Notes |
|---|---|---|
| 1 | Splash | Logo + dev-menu trigger |
| 2–9 | Onboarding ×8 | Including AI plan reveal |
| 10 | Auth | Sign up / sign in |
| 11 | Home | Today snapshot |
| 12 | Train | 3 sub-tabs: Routines / Library / Explore |
| 13 | Routine detail | Edit / start / delete |
| 14 | Routine builder | Add exercises, sets, supersets |
| 15 | Exercise picker | Search + filter by muscle/equipment |
| 16 | **Active workout** | Hevy core — sets/reps/weight, rest timer, "make easier" AI button |
| 17 | Workout summary | Volume, PRs, share button |
| 18 | History | Calendar + list view |
| 19 | AI plan wizard | Standalone deep flow (richer than onboarding's quick gen) |
| 20 | Explore (community) | Trending / New / For you / By tag |
| 21 | Public routine page | Shareable, forkable |
| 22 | Eat (placeholder) | "Coming soon" + waitlist |
| 23 | You / profile | Stats, social counts, premium status |
| 24 | Settings | Account, units, notifications, sign out |
| 25 | Paywall | Premium upsell |
| 26 | Public profile (others) | Their public routines, follow button |

---

## Section 3 — Data model

### Five core entities

```
USER ──┬─→ has ONE profile (goals, equipment, body stats, experience)
       ├─→ has MANY routines (workout templates)
       ├─→ has MANY sessions (actual workouts performed)
       ├─→ has MANY body_measurements
       ├─→ FOLLOWS / IS FOLLOWED BY users
       └─→ has ONE subscription status

EXERCISE  (shared library, ~800 seeded; user-added customs allowed)
   ↑ referenced by routines AND sessions

ROUTINE  (template) ──→ contains EXERCISES (ordered) → each with SETS (target reps, weight, RPE)
   • is_public flag — drives Explore visibility
   • source: 'user' | 'ai' | 'curated'

PLAN  (multi-week program) ──→ wraps MANY routines mapped to day_index/week_index
   • v1: only AI-generated plans; v2: import from others

SESSION  (actual workout performed) ──→ snapshots EXERCISES + SETS at time-of-doing
   • routine = recipe; session = what you cooked
   • powers PRs, history, charts, AI re-calibration
```

### Tables (Postgres / Supabase)

#### Identity & subscription

- `users` (id, email, username, display_name, avatar_url, bio, created_at)
- `user_profile` (user_id, sex, height_cm, weight_kg, experience_level, goals[], equipment[], days_per_week, injuries, units_pref)
- `user_subscription` (user_id, status, tier, period_end, source = 'revenuecat')
- `user_settings` (user_id, notifications, units, theme)

#### Library

- `exercises` (id, name, slug, primary_muscle, secondary_muscles[], equipment, mechanic, category, instructions[], image_url, created_by user_id NULL)

#### Routines & plans

- `routines` (id, owner_id, name, description, cover_image_url, is_public, source, folder_id NULL, created_at, updated_at)
- `routine_exercises` (id, routine_id, exercise_id, position, superset_group NULL, rest_seconds, notes)
- `routine_sets` (id, routine_exercise_id, position, target_reps, target_weight NULL, target_rpe NULL, set_type)
- `plans` (id, owner_id, name, generated_by, goal, duration_weeks, days_per_week, source_prompt JSONB, created_at)
- `plan_routines` (plan_id, routine_id, day_index, week_index)

#### Sessions

- `workout_sessions` (id, user_id, routine_id NULL, started_at, completed_at, duration_seconds, notes, total_volume_kg, perceived_effort)
- `session_exercises` (id, session_id, exercise_id, position, superset_group NULL, notes)
- `session_sets` (id, session_exercise_id, position, reps, weight_kg, rpe NULL, completed BOOL, set_type, rest_taken_seconds)

#### Body & PRs

- `body_measurements` (id, user_id, recorded_at, weight_kg NULL, body_fat_pct NULL, neck_cm, chest, waist, hips, biceps, thigh)
- `personal_records` (id, user_id, exercise_id, type: '1rm'|'volume'|'reps_at_weight', value, achieved_at, session_id) — backfilled from sessions, indexed for fast lookup

#### Social

- `follows` (follower_id, following_id, created_at)
- `routine_likes` (user_id, routine_id, created_at)
- `routine_forks` (id, original_id, new_id, user_id, created_at)
- `routine_reports` (id, routine_id, reporter_id, reason, status, created_at)

#### AI cost & usage

- `ai_calls` (id, user_id, type, model, tokens_in, tokens_out, cost_estimate_usd, succeeded, created_at)

#### Phase 2 placeholders (designed but not implemented in v1)

- `foods`, `meals`, `meal_entries`, `water_logs` — slot into `users` without restructuring

### Row-Level Security

- Profile, sessions, measurements, settings: owner-only read/write
- Routines: private by default; public flag exposes read access to anyone; write always owner-only
- Exercise library: world-readable; owner or service-role write
- Follows: follower-only write; both parties readable for counts
- Subscriptions: service-role write only (RevenueCat webhook); user read

### Derived data (no separate tables)

- Streaks, weekly volume, PR charts: computed from `workout_sessions` + `session_sets` on read; cached per-user via materialized views or in-memory

---

## Section 4 — AI features

### A) AI Plan Generator (Sonnet 4.6)

**Triggers:**
- Onboarding step 7 (auto, from onboarding answers)
- Train tab → "Generate new plan" (manual, with extra options)
- Anytime user wants a fresh program

**Inputs:**
- `user_profile` (goals, experience, equipment, days/week, injuries, body stats)
- Last 4 weeks of `workout_sessions` + `session_sets` (if returning user — drives progressive overload)
- Filtered subset of `exercises` matching equipment AND avoiding injuries (filter applied server-side before Claude sees it)

**Output schema (Claude tool use):**
```
{
  plan: {
    name, duration_weeks, days_per_week, goal,
    weeks: [{
      week_index,
      days: [{
        day_index,
        routine: {
          name, description,
          exercises: [{
            exercise_id (must exist in filtered list),
            position, superset_group?,
            sets: [{ position, target_reps, target_weight?, target_rpe?, set_type }]
          }]
        }
      }]
    }]
  }
}
```

**Validation before save:**
- All exercise_ids exist in filtered DB subset
- Max 7 days/week, max 8 exercises/day, max 8 sets/exercise
- Schema-validated; on failure, re-prompt once with the error message; on second failure, surface to user

**UX:**
- Loading screen with progress steps: "Reading your goals → Picking exercises → Building your week → Finalizing"
- Takes ~8–15s
- Reveal screen → preview each day → Save plan / Regenerate (one regen free, further count against quota)

### B) Mid-session "Make Easier / Harder" (Haiku 4.5)

**Trigger:** Active workout → exercise card → "..." menu → Make easier / Make harder

**Inputs:**
- Current exercise + sets logged so far this session
- Last 3–5 sessions on this exercise
- Recent RPE history if available

**Output (tool use):**
```
{
  suggestion: {
    target_weight_kg, target_reps, reasoning_short (≤120 chars)
  }
}
```

**UX:**
- ~700ms response, suggestion card slides up
- "Try **65 kg × 6 reps** instead. You've been close to failure on your last 3 sets — drop ~10% load to keep volume up."
- Buttons: **Use this** / **Keep going**
- If accepted: rewrites remaining sets in live session only (does not touch routine template)

**Guardrails:**
- Make easier: max -30% weight, max -50% reps
- Make harder: max +10% weight, max +25% reps
- Never below logged warmup weights

### C) Exercise Alternates (Haiku 4.5)

**Trigger:** Tap exercise in routine builder OR active workout → "Show alternates"
**Output:** 3 exercise IDs from filtered DB matching same primary muscle + available equipment
**UX:** Bottom sheet with 3 cards; tap to swap

### Cost & gating

| Action | Model | Approx cost/call | Free | Premium |
|---|---|---|---|---|
| Plan gen | Sonnet 4.6 | ~£0.08 (cached) | 2/month | Unlimited |
| Make easier/harder | Haiku 4.5 | ~£0.001 | shared 10/mo | Unlimited |
| Alternates | Haiku 4.5 | ~£0.001 | shared 10/mo | Unlimited |

**Cost circuit breakers:**
- Per-user daily cap: £2 of Claude spend; soft-block until tomorrow if exceeded
- Global daily cap: configurable hard cap; AI returns "busy, try later" beyond it

### Implementation notes

- All AI calls live in Supabase Edge Functions (`/functions/v1/ai-plan-gen`, `/functions/v1/ai-mid-session`, `/functions/v1/ai-alternates`)
- Each function:
  1. Auth check (Supabase JWT)
  2. Quota check (`ai_calls` count for current month) — if free user over quota, return paywall hint
  3. Build prompt (with cached system prompt key)
  4. Call Claude with tool use schema
  5. Validate response against schema
  6. Persist results + log to `ai_calls`
  7. Return to client
- System prompts versioned in repo, prompt-cache keys include version

---

## Section 5 — Library, community, paywall

### A) Curated Library (v1 launch content)

10 hand-authored routines, `source = 'curated'`, `is_official = true`, owner = a Devotion-system user_id:

1. Full Body 3-Day Beginner (full gym)
2. Push / Pull / Legs 6-Day (full gym, intermediate hypertrophy)
3. Upper / Lower 4-Day (full gym, time-crunched)
4. 5/3/1 Boring But Big (barbell, strength)
5. Dumbbell Only Home Plan (DBs only)
6. Bodyweight Anywhere (no equipment, travel)
7. 30-min Strength Express (full gym, busy)
8. Glute Focus 4-Day (full gym, glute hypertrophy)
9. Push Day A (single-session reference)
10. Pull Day A (single-session reference)

Each card: cover image, name, "by Devotion", days/week, equipment, est. duration, difficulty.
Tap → detail → "Use this routine" → forks a copy to user's account.

**Authoring:** Supabase Studio + SQL helpers for v1. Custom CMS deferred until library passes ~50 routines.

### B) Community / Explore tab

**Browse views:**
- **Trending this week** — most forks + likes in last 7 days
- **New** — recent public
- **For you** — filtered by user's goal, equipment, days/week
- **By tag** — Push/Pull/Legs, Beginner, Glutes, Strength, etc.

**Routine card:** name + author + avatar + like count + fork count + tags + duration.
**Public routine page:** detail view, Save (fork), Like, Follow author, Share (deep link).
**Author profile:** public routines, follower/following counts, total workouts (proof of legitimacy).

**Making a routine public:** toggle in routine builder + optional cover image, description, tags.

**Sharing externally:** every public routine has slug + deep link `devotion.fitness/r/<slug>` (handled by marketing site Next.js route, prompts app install or opens in app).

### Moderation (lightweight v1)

- Report button on every public routine
- Auto-hide on 3+ pending reports
- Manual review via Supabase
- Block user → hides all their content from current user

### Anti-spam (mandatory)

- Cannot publish until 3 completed sessions logged
- Max 5 new public routines per user per day
- Unique usernames; no display-name impersonation
- Account age + verified email checks before publishing

### C) Paywall + monetization

**Pricing:**
- £4.99/month or £39.99/yr (annual ≈ £3.33/mo, ~33% discount)
- 7-day free trial on monthly subscription

**Premium unlocks:**
- Unlimited AI plan gens (free: 2/mo)
- Unlimited AI make-easier/harder/alternates (free: 10/mo total)

**Forever-free:**
- Unlimited workout logging
- Unlimited manual routines
- Full curated library
- Full community Explore + sharing/forking
- All history, charts, basic stats

**Paywall triggers:**
1. Free quota hit on AI action — paywall sheet slides up with context
2. You tab → Premium badge → upsell screen
3. Soft prompt during onboarding after AI plan reveal — single dismissable card, never blocking

**Paywall screen contents:**
- Hero + 3-bullet value prop
- Free vs Premium comparison table
- Plan toggle: Monthly / Annual
- Primary CTA: "Start 7-day free trial"
- "Restore Purchases" link (App Store mandatory)
- Apple/Google legal footer

**Plumbing:**
- RevenueCat SDK in app
- RevenueCat webhook → Supabase Edge Function → updates `user_subscription`
- RLS uses `user_subscription` to gate AI Edge Functions

---

## Section 6 — Phasing + brand application

### Build milestones (12 weeks, focused solo + AI-assisted)

| # | Milestone | Weeks | Outcome |
|---|---|---|---|
| M1 | Foundation | 1–2 | Expo scaffold, NativeWind tokens, Supabase wired, auth (email + Apple + Google), splash + dev menu, empty tabs route |
| M2 | Core logging | 3–4 | Exercise library seeded, routine builder, **active workout screen**, summary, history |
| M3 | Onboarding + AI plan gen | 5 | 8-step onboarding, Claude Edge Function, plan reveal screen |
| M4 | Mid-session AI + alternates | 6 | Make easier/harder, alternates, cost tracking, circuit breakers |
| M5 | Library + community | 7–8 | 10 curated routines, Explore tab, public routine pages, follow/fork/like, deep-link sharing |
| M6 | Premium + polish | 9–10 | RevenueCat, paywall + triggers, settings, profile polish |
| M7 | App Store submission | 11–12 | TestFlight, App Store + Play Store metadata, screenshots, privacy labels, submit |

After each milestone the app is in a working, demoable state. Earliest "shippable as web-only beta" point: M3.

### Apple Developer Program enrollment

- **Personal account first** ($99/year, ~24h approval)
- Transfer app to Devotion Ltd once company formed (Apple supports app transfers)
- Don't block M7 on company formation

### Brand application — Devotion identity on Hevy/MFP layouts

**Palette (unchanged):**
- `coal` (near-black) — backgrounds
- `iron` (steel grey) — cards, dividers, secondary surfaces
- `paper` (off-white) — text on dark
- `ember` (orange-red) — primary CTAs, active states, "moment" color

**Typography (unchanged):**
- **Archivo Black** — display, big numbers, "moment" text (PRs, plan reveal, totals)
- **Manrope** — body, labels, inputs, buttons

**Corner radius — Apple Health pattern:**
- Display surfaces (history, profile, charts, plan reveal): **0 px (sharp)** — full Devotion identity
- Interactive surfaces during active workout (set inputs, complete buttons): **6 px subtle radius** — ergonomic during training
- Buttons: **8 px**, never pill-shaped (Hevy/MFP use pills; Devotion does not)

**Screen translation map:**

| Hevy/MFP screenshot | Devotion treatment |
|---|---|
| MFP plan reveal (8246) | Coal bg, "12-WEEK PLAN" massive Archivo Black ember, iron sub-text |
| MFP Today (8247) | Coal bg, calorie ring with ember stroke on iron track, big Archivo Black number |
| Hevy Workout list (8253) | Coal bg, iron-bordered routine cards, ember "Start Routine" CTA (replaces Hevy blue) |
| Active workout (Hevy core, not screenshotted) | Coal bg, iron exercise cards (4 px radius), ember "Complete Set" with haptic, big Archivo Black weight × reps |
| Hevy Profile (8255) | Coal bg, Archivo Black workout count, ember on active dashboard tile |
| MFP More menu (8250) | Folded into "You" tab as a list — no separate screen |

---

## Open questions / things to track

- **Global daily AI spend cap** — per-user cap is £2/day (specified); global cap needs Owen's final number (default proposal: £20/day during early launch, raised as DAU grows)
- **Apple Developer enrollment** — Owen to register personal account, target before M7
- **Devotion Ltd formation timeline** — affects when app can be transferred (does not block submission)
- **Curated library content authoring** — needs schedule allocated in M5 (estimate ~1 day per routine for solid content)
- **Push notifications** — out of v1 scope; revisit in v2 (rest timer + workout reminders are best candidates)
- **Health/Fit integrations** (Apple Health, Google Fit) — out of v1 scope; v2 candidate
- **Marketing site `/r/<slug>` route** — small task added to existing Next.js repo during M5

---

## Out of scope for v1 (explicitly deferred)

- Food / nutrition tracking (Phase 2 — IA reserves the tab)
- Calendar tab (MFP's "Plan")
- AI form-check / video analysis (Phase 3)
- Apple Watch / Wear OS native apps (Phase 2)
- Native Health/Fit integrations
- Push notifications
- Custom CMS for curated library (Supabase Studio sufficient at v1 scale)
- Real admin dashboard (manual moderation via Supabase)
- Family / team accounts
- In-app messaging / DMs
