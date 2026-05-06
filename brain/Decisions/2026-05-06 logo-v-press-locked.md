---
type: decision
date: 2026-05-06
affects: [Devotion]
---

# Logo locked: V-press wordmark

## Context

Six rounds of logo exploration (v1 sacred geometry → v2 gothic window →
v3 fresh territory → v4 gym typography → v5 spaghetti wall → v6 V-press
refined) ran 2026-05-04 → 2026-05-06. Owen's "mate" had said all of v1
were bad; Owen disagreed and pushed forward on the circle (orbit + dot)
and the star (quatrefoil rotated 45°), then asked for "a play on words
with lines and dumbbells" — leading to the V-press concept in v4.

By v6 the V-press was refined across 12+ standalone variants and 6
wordmark integrations.

## Options considered

Strongest contenders out of the full v1–v6 set:

- **Gothic window** (v2 #03 variant B) — quatrefoil inscribed in a ring.
  Strong sacred-geometry mark; was the leader through v3.
- **Wax seal D** (v3 #03) — sigillum / vow-mark. Conceptually strong but
  reads "law firm" if executed too cleanly.
- **Quatrefoil rotated 45°** (v5 Group A) — north-star reading. Clean,
  distinctive.
- **V-press** (v4 #01, then v6 V1–V12) — the V in DEVOTION holds a
  barbell. Letterform doubles as figure-pressing-overhead.
- **Kettlebell-as-bell pun** (v5 Group D) — kettlebell with halo. Real
  semantic overlap but visually noisy.

## Decision

**V-press wordmark.** "DeVotion" with a midcap V; barbell (line + two
circular plates) sits above the V's tips. The word IS the logo; a
symbol-only V-press exists for app icon / favicon contexts only.

Specifically:
- Light-mode wordmark: V2 (Fraunces V + oxblood plates) at app-icon scale,
  W1 (clean wordmark) at marketing scale.
- Dark-mode wordmark: D2 (same on ink), W2 (italic + oxblood plates).
- W5 (bending bar = max effort) and W6 (wider bar tip-to-tip) are noted
  as future variants Owen wants to revisit.

## Reason

- **Subtle.** The play hides until you look. The V is a normal letter
  unless you notice the barbell — at which point it's obvious and
  delightful.
- **Doubles as letterform AND figure.** The V is a held-up object with
  arms. The metaphor is geometric, not pictorial.
- **Wordmark-first respects the "word IS the logo" principle.** The
  brand reads its name and the symbol simultaneously. No "logo + name
  side-by-side" ambiguity.
- **App-icon answer falls out for free.** The standalone V-press in a
  square is a clean app icon without needing a separate mark.

## Consequences

- `<Wordmark>` and `<VPressSymbol>` shipped as components in
  [src/components/wordmark.tsx](../../src/components/wordmark.tsx).
- Favicon at [src/app/icon.svg](../../src/app/icon.svg) — V-press on
  ink with oxblood plates.
- Halo ring, vigil candle, pentagon-D shield, sigil — all dead. CSS
  removed from globals.css.
- Hover-reveal expandable wordmark for non-home pages — see
  [2026-05-06 add-dark-mode](2026-05-06%20add-dark-mode.md) (bundled
  in same release).

## Follow-ups

- Iterate W5 (bending bar) for the "max effort" variant if/when needed.
- Iterate W6 (wider bar) if the current bar feels too narrow at large
  marketing sizes.
- Build a 16x16 / 32x32 / 64x64 PNG icon set for older browser/OS
  contexts that don't render `icon.svg` reliably (low priority).
