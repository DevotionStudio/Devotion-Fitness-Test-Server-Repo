---
type: concept
domain: brand
updated: 2026-05-06
---

# Word IS the logo

The wordmark is the primary mark. There is no separate symbol that
substitutes for the name in primary contexts.

## The principle

A logotype-first brand says: the name and the mark are the same thing.
You don't need a separate icon to "stand in for" the wordmark. The
wordmark itself is the identity.

Examples in the same lineage:
- **Aesop.** Just "Aesop" in a thin serif. No icon.
- **Kinfolk.** Wordmark only. The publication is the mark.
- **Calm.** "calm" in a quiet sans. The icon is just the wordmark cropped.
- **Linear.** The wordmark and the geometric mark are equally present;
  the wordmark is rarely missing.

The opposite pattern — symbol-first brands like Apple, Nike, Twitter —
treats the icon as primary and the name as secondary. That works for
brands with massive distribution; it doesn't work for new brands trying
to become recognizable.

## Why this fits Devotion

1. **The brand is built on language.** "Devotion" is a *brand idea*, not
   a category description. The word does work the icon couldn't —
   readers think about what devotion means to them. A standalone symbol
   would lose that.

2. **The V-press depends on the word.** The whole [V-press metaphor](V-press%20metaphor.md)
   only works when you can see "DeVotion" in full and notice the
   mid-capital. The play is *inside* the typography. Removing the word
   removes the joke.

3. **Editorial brands use wordmarks.** Magazine mastheads are wordmarks.
   Devotion's whole posture (see [Liturgical Restraint](Liturgical%20Restraint.md))
   is editorial — wordmark-first is the natural fit.

4. **Easier to evolve.** Wordmark-first lets the brand iterate the
   icon (V-press → bending-bar variant → future variants) without
   changing the master mark. The word is stable; the mark variants
   accumulate.

## Implementation

- The home page (`/`) header always shows the full wordmark.
- Non-home pages (`/today`, `/onboarding`, `/review`) show a *collapsed*
  wordmark — V-press only — that expands to the full wordmark on hover
  or focus. This preserves the wordmark-is-primary principle while
  reclaiming header space inside the app shell.
- The favicon and any iOS / Android home-screen icon use the
  V-press symbol alone — but those are explicitly app-icon contexts
  where 16×16 / 64×64 squares constrain the shape to a glyph.

See [Decisions/2026-05-06 logo-v-press-locked](../Decisions/2026-05-06%20logo-v-press-locked.md)
and [Decisions/2026-05-06 add-dark-mode](../Decisions/2026-05-06%20add-dark-mode.md)
for the implementation rationale.

## What this means in practice

Don't:
- Build marketing pages that lead with the standalone V symbol instead
  of the wordmark.
- Crop the wordmark down to "D" or "V" in headers / nav.
- Use the symbol-only V on social profiles with a name-less avatar
  unless the name is in the @-handle.

Do:
- Lead with `<Wordmark>` in every primary surface.
- Use `<VPressSymbol>` only when the surface is *constrained to a square
  smaller than the wordmark needs* (app icon, favicon, very tight
  inline contexts).
- Pair the symbol with the wordmark whenever there's room.

## Cross-references

- [Concepts/V-press metaphor](V-press%20metaphor.md)
- [Concepts/Liturgical Restraint](Liturgical%20Restraint.md)
- [Brand](../Entities/Devotion/Brand.md)
