---
type: decision
date: 2026-05-06
affects: [Devotion]
---

# Serif swap: Fraunces → Newsreader

## Context

After the V-press logo shipped in Fraunces 500, Owen reviewed the live
site and said the font "feels very like girly idk it just doesnt suit
it." Fraunces is a high-personality fashion serif — soft curves, ball
terminals, dramatic italic — and it was reading too feminine-coded for
a strength brand.

## Options considered

- **Keep Fraunces.** Free, on Google Fonts, has the softness Owen wants
  to move away from. Rejected on Owen's instinct.
- **Geist or Inter** (modern sans). Strong, technical, masculine-coded
  but unisex. Would mean dropping serif entirely. Risk: loses editorial
  character.
- **GT Sectra / Tobias / PP Editorial New** (paid sharp serifs).
  Architectural, sober. Excellent fit but require a license.
- **Newsreader.** Editorial newspaper serif on Google Fonts. More upright
  and structural than Fraunces, less ornamentation, italic is firmer.
- **Crimson Pro / Source Serif.** Workhorse serifs — solid but lack the
  personality Newsreader carries.

## Decision

**Newsreader 500** as the serif. Body and UI stay on Hanken Grotesk.

## Reason

Newsreader keeps the editorial register (Devotion's whole brand voice
depends on quality typography) but moves the personality dial from
"fashion magazine" to "newspaper of record." The italic is sharper, the
upright is more structural, and the V — which is now load-bearing as
the wordmark hero — has stronger architecture in Newsreader.

Free on Google Fonts. Easy swap. Reversible if Owen disagrees on next
review.

## Consequences

- `next/font/google` import in
  [src/app/layout.tsx](../../src/app/layout.tsx) swapped Fraunces →
  Newsreader.
- All `font-family: ..., "Fraunces", ...` declarations in
  [src/app/globals.css](../../src/app/globals.css) replaced with
  `"Newsreader"`.
- All `font-variation-settings: "opsz" N, "SOFT" M;` had `SOFT` stripped
  — Newsreader has no SOFT axis. The `opsz` axis only.
- Wordmark component fallback chain updated.
- Memory note saved: avoid "girly" / fashion serifs (Fraunces, Playfair,
  Cormorant, DM Serif) for this brand register.

## Follow-ups

- If Newsreader still reads too soft on review, candidates in waiting:
  GT Sectra (paid), PP Editorial New (paid), or going full sans
  (Geist / Inter) and dropping serif altogether.
- Reload-test fonts at every size — Newsreader at 11px caps eyebrow text
  is the smallest deployment; verify it doesn't fall apart.
