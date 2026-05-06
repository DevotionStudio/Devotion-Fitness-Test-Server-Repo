---
type: entity
kind: tech
entity: Devotion
updated: 2026-05-06
---

# Devotion — Tech

## Stack

- **Framework:** Next.js 15.5.15, App Router, React 19.
- **Language:** TypeScript (strict).
- **Styling:** Tailwind 3 + CSS custom properties. Theme tokens are RGB
  triplets (`--bone-rgb: 245 242 251`) exposed to Tailwind via
  `rgb(var(--bone-rgb) / <alpha-value>)` so alpha modifiers work and
  swap with `[data-theme="dark"]`.
- **Fonts:** Newsreader (serif) + Hanken Grotesk (sans), both via
  `next/font/google`.
- **No DB yet.** Phase 0 is fully static. Phase 1 will likely use
  Supabase or Postgres + Drizzle (TBD; not committed).
- **No auth yet.** Phase 1 — likely Clerk or NextAuth (TBD).

## File map

```
src/
├── app/
│   ├── layout.tsx              # root layout, font loading, theme boot script
│   ├── globals.css             # design system, theme tokens, components
│   ├── page.tsx                # / marketing
│   ├── icon.svg                # favicon — V-press on ink
│   ├── onboarding/page.tsx
│   ├── today/page.tsx
│   └── review/page.tsx
├── components/
│   ├── wordmark.tsx            # <Wordmark> (HTML+SVG hybrid) and <VPressSymbol>
│   └── theme-toggle.tsx        # light/dark pill switch
└── lib/
    └── (stays small; pure utilities only)
```

## Run commands

```bash
# dev server (auto-picks free port; usually 3000 or 3002)
npm run dev

# type-check (silent on success)
npx tsc --noEmit

# prompt prototyping harness — separate from the app
npm run prompts
```

The dev environment is **Windows + Node 24**. Some package versions are
pinned to avoid known issues:
- Next 15.5 (not 16; 16 had a regression with `next/font` axes config)
- Anthropic SDK 0.88 (newer SDK shapes the message API differently)

See [reference_dev_environment.md](../../../../../.claude/projects/c--Users-Owen-Documents-GymFit-app/memory/reference_dev_environment.md)
in auto-memory for the full pin list and gotchas.

## Theme system

CSS variables in `globals.css`:

```css
:root {
  --bone-rgb: 245 242 251;
  --bone: rgb(var(--bone-rgb));
  /* ... */
}

[data-theme="dark"] {
  --bone-rgb: 13 8 24;
  /* ... */
}
```

`tailwind.config.ts` consumes those:

```ts
colors: {
  bone: "rgb(var(--bone-rgb) / <alpha-value>)",
  // ...
}
```

A no-flash boot script in `layout.tsx` runs before React hydrates,
reading `localStorage['devotion:theme']` and falling back to
`prefers-color-scheme`. The `<html>` element is set with
`suppressHydrationWarning` to absorb the SSR/client diff.

## Domains

- **Primary:** `devotion.fitness` (registered 2026-05-06, GoDaddy,
  £5.90 first year, £47.29/yr renewal)
- **Backup:** `devotionfitness.co.uk` (registered 2026-05-06, GoDaddy,
  £6.99 first year, £12.99/yr renewal). Will 301 to primary once DNS is
  configured.
- Account: `owenleaton2020@gmail.com`

## Deployment plan (not yet executed)

- **Host:** Vercel (free hobby tier for now). Repo → automatic deploy.
- **DNS:** GoDaddy → Vercel name servers, or A/CNAME records pointing
  to `cname.vercel-dns.com`.
- **Email:** Cloudflare Email Routing (free) for `hello@devotion.fitness`
  inbound; switch to Google Workspace (£4.60/mo per mailbox, annual)
  when the brand needs to send mail. **Avoid GoDaddy M365 Email
  Essentials** — the £0.99/mo first-year rate is bait for a £6.49/mo
  renewal.

## Known caveats

- Newsreader doesn't have a `SOFT` axis like Fraunces did. All
  `font-variation-settings` were stripped to `"opsz" N` only — adding
  `SOFT` back would silently no-op.
- The wordmark uses HTML+CSS layout (not fixed SVG coords) so swapping
  fonts doesn't break alignment. The barbell is `position: absolute`
  on top of the V's `<span>`. If a designer ever wants pixel-perfect
  V-tip alignment, switch to per-font fine-tuning instead of universal
  positioning.
- The aurora background gradient sits on `body::before` with
  `pointer-events: none` and `z-index: 0`. All children get
  `position: relative; z-index: 1`. Don't break this stacking when
  adding new top-level elements.
