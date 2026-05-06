---
type: entity
kind: strategy
entity: Devotion
updated: 2026-05-06
---

# Devotion — Strategy

## One-line positioning

Strength training as a daily practice — programmed, recorded, reviewed
weekly — with the calm of an old craft instead of the noise of a fitness app.

## Audience

- **Primary:** intermediate-to-advanced lifters (1+ year training history)
  who are tired of "ten thousand AI workouts" apps. They want *consistency
  enforcement* and *progressive programming*, not motivation hacks.
- **Secondary:** disciplined beginners — people who already see lifting as
  practice, not entertainment. Smaller market but ~aligned positioning.
- **Not for:** people who want gamification, streaks, or social comparison.
  These users are explicitly anti-pattern; the product loses its register
  if we try to serve them.

## Why "Devotion" (not "Stacked", not "Anvil", not generic gym)

- "Stacked" / "Anvil" are *literal-gym words*. They compete with every
  other fitness app in the same lexical space.
- "Devotion" is a **brand word**. The discoverability cost is real (people
  don't search "devotion app" looking for fitness) but the brand integrity
  is much higher. Closer in register to **Caliber** or **Future**.
- See [2026-05-04 reject-dvotion-spelling](../../Decisions/2026-05-04%20reject-dvotion-spelling.md)
  for why we kept the E despite the SEO/handle availability tax.

## Competitive frame

| App | What it sells | What we sell instead |
|---|---|---|
| Strong / Hevy | Logging | Programming + a Sunday review |
| Caliber / Future | Coach | Practice without a coach |
| Centr / Apple Fitness+ | Content (videos) | Discipline (the lift itself) |
| Strava | Social proof | Solitude |

The closest peer in **tone** is Future or Whoop — premium, considered,
adult. The closest peer in **mechanic** is Caliber. We share neither's
exact pricing or feature set; positioning is the moat, not capability.

## Monetisation thesis

Freemium → paid tier. Free is "show up and log." Paid unlocks:
- Programmed progression (the rules engine that picks weights and sets)
- Sunday review (the LLM-written paragraph)
- Multi-block periodisation (later phase)

**Not yet anchored.** See open questions for pricing decision.

## Phasing

1. **Phase 0 (now):** marketing site, onboarding flow, demo `/today` and
   `/review` screens. Static, no auth. Validates the *positioning* before
   any infra spend.
2. **Phase 1:** real app — auth, persistence, programming engine, session
   capture, Sunday review. Web PWA. Free + paid tiers live.
3. **Phase 2:** React Native shell. Wearables (Apple Health, Whoop, Garmin
   read-only at first). Multi-block periodisation. Coach-assist tier.

## Strategic risks

- **Discoverability.** "Devotion" is hard to search for. Mitigated by
  word-of-mouth + the .fitness TLD (people google "devotion fitness app").
- **Tone fragility.** If the UI starts looking like every other fitness
  app, the positioning collapses. Design discipline is load-bearing —
  see [Concepts/Liturgical Restraint](../../Concepts/Liturgical%20Restraint.md).
- **LLM-prose drift.** The Sunday review must read like a coach who knows
  the user, not a generic AI summary. Voice consistency is a hard problem;
  prompt + memory architecture matter.

## What we're explicitly *not* doing

- No social/community features at launch.
- No streak counters or "don't break the chain" mechanics.
- No video coaching (yet, possibly never — the brand isn't about content).
- No mobile-first design while the foundation is being figured out — web
  PWA proves the mechanic before native shell investment.
