---
type: decision
date: 2026-05-06
affects: [Devotion]
---

# Add dark mode + hover-reveal expandable wordmark

## Context

Owen requested two changes in the same brief: (1) dark mode (his words:
"we want black and dark mode so people have options") and (2) an
animation where non-home pages show only the V-press by default and
expand to show the full wordmark on hover.

## Options considered for theming

- **Tailwind class darkMode + manual class swap.** Standard pattern.
  Loses some of the visual continuity since every alpha-modifier needs
  a `dark:` variant.
- **CSS variable swap on `[data-theme="dark"]`.** Centralised. The whole
  palette inverts via one selector. Required upgrading tokens to RGB
  triplets so Tailwind's alpha-modifier syntax keeps working.
- **System preference only, no toggle.** Simpler but the user explicitly
  asked for a toggle.

## Options considered for hover-reveal

- **Two separate components.** `<Wordmark>` and a new `<HeaderMark>`
  that only shows the V. Maintenance cost across two components.
- **One component with an `expandable` prop.** Single source of truth.
- **CSS-only animation vs JS state.** CSS-only is faster, no hydration
  issues, no React re-renders.

## Decision

- **Dark mode via RGB-triplet CSS variables + `[data-theme="dark"]`
  selector.** Toggle component stores preference in
  `localStorage['devotion:theme']`, default = `prefers-color-scheme`.
  No-flash boot script in `<head>` runs before React hydrates.
- **Hover-reveal via `expandable` prop on `<Wordmark>`, CSS-only.**
  De/otion start at `max-width: 0; opacity: 0; transform: translateX(...)`
  and expand on `:hover` / `:focus-visible` of the parent link or the
  span itself.

## Reason

Variable-driven theming gives a single place to redefine the palette,
which makes future palette tweaks (or adding a "true black" theme later)
trivial. The RGB-triplet token shape costs ~30 lines of refactor in the
Tailwind config but is the standard Next.js + Tailwind dark-mode pattern.

Single-component with `expandable` keeps the logo system unified — same
import, same wordmark, just one prop. Future contributors don't have to
ask which component to use where. CSS-only animation runs at native
browser speed and works without JS — graceful degradation.

## Consequences

- [tailwind.config.ts](../../tailwind.config.ts) refactored: every color
  token now `rgb(var(--<name>-rgb) / <alpha-value>)`.
- [src/app/globals.css](../../src/app/globals.css) gained:
  - RGB-triplet vars for both light and dark
  - aurora gradient and tile-fill tokens that swap with theme
  - `body { transition: background-color 220ms, color 220ms }` for soft
    theme swap
  - `.wm-expandable` with max-width + transform CSS
  - `.theme-toggle` with sliding pill thumb
- [src/app/layout.tsx](../../src/app/layout.tsx) gained the
  `themeBoot` `<script dangerouslySetInnerHTML />` to prevent
  flash-of-wrong-theme.
- New component [src/components/theme-toggle.tsx](../../src/components/theme-toggle.tsx).
- Wordmark component rewritten to HTML+CSS layout (barbell SVG
  positioned absolute over V span) instead of fixed SVG coordinates;
  this was needed both for the hover animation AND to make font swaps
  not break alignment.
- `<Wordmark expandable plateAccent />` wired into `/today`,
  `/onboarding`, `/review`. Home page (`/`) keeps `<Wordmark />` (full
  always).
- `<ThemeToggle />` wired into all four page headers.

## Follow-ups

- Verify dark mode on `/onboarding` and `/today` — particularly the
  workout-card states which weren't tested in the same depth.
- Consider a "true black" / OLED theme variant later (not now). The
  current dark is `#0d0818` deep aubergine, not pure black.
- Test the expandable wordmark on touch (no `:hover` on touch). Tap-on-
  link triggers focus-visible briefly which expands; verify the UX is
  acceptable on phones.
