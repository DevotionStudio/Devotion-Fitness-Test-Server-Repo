---
type: decision
date: 2026-05-07
status: positioning-shift
affects: [Devotion]
---

# Positioning shift: MyFitnessPal-class consumer app, not B2B-comparable

## Context

Late 2026-05-06 / early 2026-05-07. While reviewing the marketing site
overhaul (which adopted the DeskWolf house design system), Owen flagged
the comparison was wrong-altitude:

> "This isn't just a GymFit app... we're building something which millions
> of people could use, not maybe like a few 10,000 people might ever go
> to a 100,000 people might ever go to. This is like people download it,
> and they could just pay it. There's not a walk in anyone from anywhere."

> "One big competitor was MyFitnessPal."

DeskWolf's industry pages (sites.deskwolf.ai/industries) are **B2B
website demos** for local-business operators — gyms, plumbers, dentists.
That's the design *quality* bar but not the *register*. Devotion is a
**B2C consumer app** comparable to MyFitnessPal (200M+ users), Strong,
Hevy, Caliber, Fitbod, Future.

## What this changes

### Audience scale

- **Was:** "intermediate-to-advanced lifters tired of generic fitness
  apps." Niche, high-intent, ~10k-100k addressable.
- **Now:** "anyone who wants strength training that thinks for them."
  Mass-market consumer app, millions addressable, mostly self-serve.

### Marketing surface

- Premium consumer app feel, not B2B-website-demo feel.
- Big visual moments: phone mockups, app screenshots, user faces (when
  we have real users).
- Trust signals: app-store ratings (when live), download counts,
  press mentions, founder photo + story (when we want to put Owen on
  the page).
- Conversion path: download → onboard → first session, not
  contact-sales.
- Distribution: app stores + organic search + social, not paid B2B
  channels.

### Pricing

- Standard consumer app pricing, not B2B SaaS. Currently:
  - £6.99/month / £49/year / £75 lifetime (founders)
- Owen flagged 2026-05-07 he's "still not sure" about the current
  pricing. Possible directions:
  - Free tier + paid upgrade (MyFitnessPal model — most users free,
    monetise on premium features)
  - Lower entry point (£3.99/mo to widen funnel)
  - Annual-only / Lifetime-only (skip monthly to reduce churn ops)
- Decision pending. Test against MyFitnessPal / Strong / Hevy
  benchmarks before locking.

### Product framing

- Not "a daily devotional practice for serious lifters."
- Closer to "your strength training engine — programmed, captured,
  reviewed."
- Drop any positioning language that boxes us to a specific user
  archetype (the monk, the disciplined returner, etc.). Speak more
  broadly.

### Site architecture

- Marketing site needs hero visuals (phone mockups with app screens)
  not just text + a single mockup card.
- Likely sections to add: feature gallery (multiple app screens), real
  user stories (when available), download badges (App Store / Play
  Store) at the top, comparison table (Devotion vs Strong vs Hevy vs
  Caliber).
- Drop or downgrade the "founder pricing 100 lifters only" framing
  once real launch happens — pre-launch waitlist tactic, not a
  permanent feature.

## Decision

**Reposition Devotion as a MyFitnessPal-class consumer app.**
DeskWolf-bar design *quality*, but consumer-app *register*. The
marketing site, copy, and pricing all need to be calibrated to that
scale — not to the B2B-website-demo register the site currently echoes.

## Reason

The product *is* mass-market. It's a paid app with no service
component, no consultations, no human coach in the loop. That puts it
in the same category as Strong / Hevy / MyFitnessPal / Fitbod —
self-serve consumer subscriptions. Continuing to market it like a
local-business website demo would undersell both the addressable
market and the design ambition.

## Consequences

- Marketing site needs another iteration with consumer-app polish:
  phone-mockup hero, app screenshot gallery, comparison table, lower
  text/visual ratio.
- Pricing structure under review.
- App-build sprint becomes the priority — currently /today /onboarding
  /review are static demos; they need to function for real users.
- Future scale planning needs to assume consumer-app costs (mobile
  apps, payment processing at scale, support infrastructure) — not
  B2B SaaS levels.

## Follow-ups

- Reference research: pull MyFitnessPal homepage + app store listing
  + paid-tier upsell screens. Same for Strong / Hevy / Future.
- Pricing decision: test free-tier-with-paid-upgrade vs
  paid-from-day-one across competitors.
- Marketing site v3: phone-mockup hero, app gallery, comparison table.
- Phase 1 backend planning: auth, DB, programming engine, real
  Sunday-review writer. The static demos need to become a real product.
- Update [Strategy.md](../Entities/Devotion/Strategy.md) to reflect
  MyFitnessPal-class audience.
