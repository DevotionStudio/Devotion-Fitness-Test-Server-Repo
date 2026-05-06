---
type: entity
kind: brand
entity: Devotion
updated: 2026-05-06
---

# Devotion — Brand

## Logo — V-press

The wordmark is **"DeVotion"** with a midcap V. The V holds a small barbell
(line + two circular plates) above its tips. The V is doing the lift; the
letter is the metaphor.

- **Component:** [src/components/wordmark.tsx](../../../src/components/wordmark.tsx)
- **Symbol-only V:** `VPressSymbol` from the same file, used for app icon
  / favicon contexts only.
- **Favicon:** [src/app/icon.svg](../../../src/app/icon.svg) — V-press on
  ink with oxblood plates.
- **Hover-reveal:** non-home pages render `<Wordmark expandable plateAccent />`
  which collapses to V-only and expands De/otion symmetrically on hover or
  focus. Home page stays full always.
- **Future variants noted:** W5 (bending bar = max effort) and W6 (wider
  bar tip-to-tip) — saved as iteration directions, not currently shipped.

See [Concepts/V-press metaphor](../../Concepts/V-press%20metaphor.md) for
the design rationale, and [Projects/Logo System](../../Projects/Logo%20System.md)
for the full v1→v6 exploration history.

## Voice

- **Quiet, confident, adult.** Not motivational. Not bro. Not therapeutic.
- **Editorial cadence.** Short paragraphs, periodic emphasis, willingness
  to use a long sentence when the rhythm calls for it.
- **Italic for accent, not decoration.** "Strength is a *discipline*, not
  a download." The italic carries one word, never a clause.
- **Never gamification language.** No "crush it", "smash", "level up",
  "unlock", "you got this".

## Palette — RGB triplet tokens

Defined in [src/app/globals.css](../../../src/app/globals.css) as
`--<name>-rgb: r g b` triplets. Tailwind exposes them via
`rgb(var(--name-rgb) / <alpha-value>)` for alpha-modifier support.

### Light theme (default)

| Token | Value | Use |
|---|---|---|
| `bone` | #f5f2fb (lavender mist) | background |
| `bone-2` | #ece6f5 | surface, elevated |
| `ink` | #1d0f2e (deep aubergine) | text, headlines |
| `ink-2` | #3a2552 | secondary text |
| `ash` | #8a7ea3 | muted text, eyebrows |
| `oxblood` | #6b2cd9 (royal violet) | primary accent |
| `oxblood-2` | #7d3ee8 | hover violet |

### Dark theme — `[data-theme="dark"]`

| Token | Value | Use |
|---|---|---|
| `bone` | #0d0818 (near-black aubergine) | background |
| `bone-2` | #181028 | surface |
| `ink` | #f5f2fb | text — bone inverts |
| `ink-2` | #c8bfd9 | secondary text |
| `oxblood` | #9c6dff | brighter violet for dark contrast |

The aurora atmosphere (`body::before` radial gradients) and tile fills
also swap via `--aurora-1`, `--aurora-2`, `--tile-fill-a` tokens.

## Typography

- **Serif** — Newsreader 500 (replaced Fraunces 2026-05-06; Fraunces
  rejected as "girly"). Used for display headlines, the wordmark, the
  "discipline" italics. `opsz` axis only — Newsreader has no SOFT axis.
- **Sans** — Hanken Grotesk. Used for body, eyebrows, UI, buttons.
- **No third font.** No mono. Numerals tabular via `font-variant-numeric`.
- **Italics carry meaning.** Don't italic for typography fashion.

## Theme toggle

[src/components/theme-toggle.tsx](../../../src/components/theme-toggle.tsx) —
pill switch in the top-right of every page. Persists to
`localStorage['devotion:theme']`. No-flash boot script in
[layout.tsx](../../../src/app/layout.tsx) reads localStorage before React
hydrates so the first paint is correct.

Default = system preference (`prefers-color-scheme`).

## What we don't use

- **No gradients in UI.** Aurora background gradient is the only one,
  and it's behind `pointer-events: none`.
- **No drop shadows.** Hairline rules, 1px borders, rgba alphas instead.
- **No rounded corners on text containers.** Sharp by default. Rounded
  pills are reserved for buttons (`.btn-d`).
- **No icons inside body copy.** Icons are for navigation/UI only.
- **No emoji in product copy.** Anywhere.

## Brand-name history

- 2026-04-25 → 2026-04-29: "GymFit" (placeholder)
- 2026-04-29 → 2026-05-03: "Anvil" (industrial-forge era)
- 2026-05-03 → present: **"Devotion"** (current — see decision)

The disk path is still `c:\Users\Owen\Documents\GymFit app` — don't rename.
