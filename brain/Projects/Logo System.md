---
type: project
status: shipped
entity: Devotion
started: 2026-05-04
shipped: 2026-05-06
---

# Logo System

The journey from "no logo" to V-press locked. Six rounds across three days.

## Final state — 2026-05-06

The V-press wordmark — see
[Concepts/V-press metaphor](../Concepts/V-press%20metaphor.md) and
[Decisions/2026-05-06 logo-v-press-locked](../Decisions/2026-05-06%20logo-v-press-locked.md).

Components:
- [`<Wordmark>`](../../src/components/wordmark.tsx) — full inline wordmark.
- [`<VPressSymbol>`](../../src/components/wordmark.tsx) — square symbol-only.
- [Favicon](../../src/app/icon.svg) — V-press on ink.

## History

### v0 — Pre-V-press (Anvil → early Devotion)

- **Pentagon-D shield** — Anvil-era v1. Dropped 2026-05-03 with the
  rebrand.
- **Vigil candle sigil** — first Devotion-era mark. Owen called it
  "terrible" within hours.
- **Halo ring** — concentric purple aperture (2px violet circle + soft
  outer ring). Replaced the candle 2026-05-03 evening. Lived as the
  brand-mark for ~3 days while logo exploration happened.

### v1 — Sacred geometry (2026-05-04 morning)

Mockup: `c:/tmp/devotion-logo-explorations.html`

Four marks: vesica piscis, tonsured halo, quatrefoil, hairline orbit + dot.
Owen liked the orbit and the quatrefoil but his "mate" said all four
were bad. Owen disagreed and pushed forward.

### v2 — Gothic window (2026-05-04)

Mockup: `c:/tmp/devotion-logo-v2.html`

Refined orbit (8 variants) + refined quatrefoil rotated 45° as a star
(8 variants) + the hybrid: **quatrefoil inscribed in the orbit** —
literally how cathedral rose windows are built. The hybrid was leading
through this round.

### v3 — Fresh territory (2026-05-04)

Mockup: `c:/tmp/devotion-logo-v3.html`

Eight new directions deliberately *away* from the gothic window:
pointed gothic arch, D-as-arch monogram, wax seal sigillum, diptych,
two-lines-one-point (praying hands), tally grid, cardinal star,
wordmark-only. Wax seal was the strongest fresh contender; nothing
beat the v2 keeper outright.

### v4 — Gym typographic play (2026-05-06)

Mockup: `c:/tmp/devotion-logo-v4.html`

Owen pivoted: "play on words with lines and dumbells". Six directions:
T as barbell, both O's as plates, barbell-as-rule below wordmark,
dumbbell-D standalone, V-as-overhead-press, I as dumbbell. **The V-press
emerged here** as the cleanest typographic play.

### v5 — Spaghetti wall (2026-05-06)

Mockup: `c:/tmp/devotion-logo-v5-spaghetti.html`

Owen asked for "lots of options... spaghetti at a wall." 47 ideas
across 7 groups: letter swaps (8), wordmark + barbell rule (4),
equipment marks (9), kettlebell-as-bell pun (8), figure marks (4),
wordmark treatments (10), heraldic crests (6).

The kettlebell-IS-a-church-bell pun (Group D) was a sleeper concept I
hadn't considered until I started building — real semantic overlap, but
visually noisy in execution.

### v6 — V-press refined (2026-05-06)

Mockup: `c:/tmp/devotion-logo-v6-vpress.html`

12 standalone V-marks at app-icon scale, 4 dark-ground tests, 6
wordmark integrations, 4 lockup variants, 4-step scale stress test
(200/96/48/24px), 3 phone-home-screen mocks.

Owen picked: V2 (light wordmark Fraunces V + oxblood plates), D2 (same
on dark), W1 (wordmark Fraunces clean), W2 (wordmark italic + oxblood
plates). Noted W5 (bending bar) and W6 (wider bar) as future variants
to revisit.

### Implementation — 2026-05-06

Built `<Wordmark>` and `<VPressSymbol>` in
[src/components/wordmark.tsx](../../src/components/wordmark.tsx). Wired
into all 4 pages. Old halo / candle / sigil / pentagon-D CSS deleted.
Favicon at [src/app/icon.svg](../../src/app/icon.svg).

Then Owen called Fraunces "girly" — see
[Decisions/2026-05-06 swap-fraunces-for-newsreader](../Decisions/2026-05-06%20swap-fraunces-for-newsreader.md)
— and asked for dark mode + hover-reveal. All shipped in the same batch.

## Lessons

- **Six rounds was the right number.** Stopping at v3 would have shipped
  a beautiful but disconnected mark. Stopping at v5 would have been
  decision-paralysis. v4 was the breakthrough — Owen's "play on words"
  prompt unlocked the V-press.
- **Mate's "all bad" feedback was actively misleading.** Owen's gut
  picked the right two contenders (orbit, star) when his mate's
  external read said throw out all four. Founders should trust their
  taste over external first-pass reactions, especially during
  exploration phases.
- **Mockup HTML files are doing a lot of work.** All six rounds lived
  in standalone files at `c:/tmp/devotion-logo-*.html` — easy to pull
  up side-by-side, review on phone, share with mates. Worth keeping
  the pattern for future visual exploration.
- **"Word IS the logo" emerged from this work.** The principle wasn't
  pre-decided; it crystallised around v4 when the typographic plays
  beat the symbol-only marks. See
  [Concepts/Word IS the logo](../Concepts/Word%20IS%20the%20logo.md).

## Future variants (saved, not shipped)

- **W5 — bending bar.** Bar bows under load. Reads as max effort. Use
  when the brand needs a "heavier" register.
- **W6 — wider bar.** Bar spans full V-tip-to-tip instead of sitting
  between the tips. More architectural.
- **Quatrefoil inscribed in ring (v2 #03 variant B).** Decorative
  alternate mark; could live alongside V-press on merch / certificates
  /seasonal contexts where a different visual register is wanted.
