---
type: concept
domain: brand
updated: 2026-05-06
---

# V-press metaphor

The V in DEVOTION holds a barbell aloft. The letter is the lift.

## Specification

The wordmark renders "DeVotion" with a midcap V (uppercase V in middle of
otherwise lowercase letters). Above the V's tips sits a small barbell —
horizontal line with two circular plates at each end. The V's two
diagonal strokes read as arms, the barbell as the bar held overhead in
the lockout position of an overhead press.

At app-icon scale, the standalone V (with barbell) is the symbol mark.
At wordmark scale, the V is in context.

## Why this works

1. **Subtle until it isn't.** First read: "Devotion." Second read: "wait,
   why is the V capitalized?" Third read: "oh, the V is doing a press."
   The play hides until you look. Once you see it, it's unmissable.

2. **Letter doubles as figure.** The V is geometrically a person with
   arms raised. Adding the barbell completes the press posture without
   needing a literal person silhouette (which would feel pictorial /
   clip-art-y).

3. **No new asset.** The V-press lives *inside the wordmark*. The brand
   doesn't need a separate logo + name. They're the same thing.

4. **Survives at every scale.** At hero size, the barbell reads clearly.
   At app icon size, the V silhouette dominates. At favicon size, just
   the V plus a hint of horizontal line — enough.

## Why we landed here

The journey took six rounds. See [Projects/Logo System](../Projects/Logo%20System.md)
for the full v1→v6 history, and the immutable record at
[Decisions/2026-05-06 logo-v-press-locked](../Decisions/2026-05-06%20logo-v-press-locked.md).

The short version: v1–v3 chased sacred geometry / monastic shapes
(quatrefoil, vesica piscis, gothic arch, wax seal). They were
beautifully restrained but felt disconnected from the gym substance of
the product. Owen asked for "a play on words with lines and dumbbells"
in v4 — typographic equipment swaps inside the wordmark. The V-press
emerged as the cleanest of the typographic plays, and v6 pushed it
into shippable form.

## Variants

Implemented:
- **Light light / dark dark** — V-press flips with the theme.
- **Plain plates / oxblood plates** — `plateAccent` prop. Default
  light-mode wordmark uses ink plates; expandable / dark variants use
  oxblood plates for accent.
- **Expandable** — non-home pages collapse to V-only and expand on
  hover. See [Decisions/2026-05-06 add-dark-mode](../Decisions/2026-05-06%20add-dark-mode.md).

Future variants saved as candidates (v6 W5 / W6):
- **Bending bar** — bar bows under load. Reads as max effort. Shipping
  candidate when we want a "heavier" register.
- **Wider bar tip-to-tip** — bar spans the full width of the V's tips
  instead of sitting between them. More architectural; less anatomical.

## What this is NOT

- **Not a literal figure-pressing-overhead.** The V is a letter, not a
  human silhouette. Reading is geometric, not pictorial. This matters
  for licensing (no figure-on-bar mark to defend) and for the brand
  register (literal figures read as gym-bro stock art).
- **Not a separate symbol used apart from the word.** The V-press lives
  *inside* the wordmark. The standalone V exists for app-icon contexts
  only — not as a primary mark used in marketing without the wordmark
  alongside.
- **Not "DEVOTION" all caps with a barbell over the V.** The midcap
  presentation (mixed case, capital V) is intentional. All-caps reads
  like a sport brand; mixed case reads like an editorial brand with a
  knowing smile.

## Cross-references

- [Concepts/Word IS the logo](Word%20IS%20the%20logo.md) — adjacent
  principle that this metaphor enables.
- [Decisions/2026-05-06 logo-v-press-locked](../Decisions/2026-05-06%20logo-v-press-locked.md)
- [Projects/Logo System](../Projects/Logo%20System.md)
- Component: [src/components/wordmark.tsx](../../src/components/wordmark.tsx)
- Mockup: `c:/tmp/devotion-logo-v6-vpress.html`
