---
type: journal
date: 2026-05-06
weekday: Wednesday
---

# 2026-05-06 — Wednesday

## Session summary

Massive session. Logo locked, design system overhauled, domains bought,
second brain created. Probably the highest-output day for Devotion so far.

## Notes — chronological

### Logo finalisation (continuation from 2026-05-04)

- v1–v3 sacred-geometry options had been rejected; v4 introduced gym
  typographic plays.
- v5 was a 47-mark spaghetti wall in 7 groups (letter swaps, equipment,
  kettlebell-bell pun, figures, wordmark treatments, crests).
- v6 refined the V-press concept into 12 standalone V-marks, dark-ground
  variants, wordmark integrations, lockups, and scale stress tests.
- Owen picked: **V2** (light V + oxblood plates), **D2** (dark variant),
  **W1** (clean wordmark), **W2** (italic + oxblood plates).
- W5 (bending bar) and W6 (wider bar) noted as future variants.
- Decision recorded: [Decisions/2026-05-06 logo-v-press-locked](../../../Decisions/2026-05-06%20logo-v-press-locked.md).

### V-press component build

- New file `src/components/wordmark.tsx` — exports `<Wordmark>` and
  `<VPressSymbol>`.
- Initial implementation rendered three SVG text segments (`De`, `V`,
  `otion`) with hand-tuned x positions for Fraunces.
- Wired into all four pages (home header + footer, today, review,
  onboarding) — replacing the old halo-ring component.
- Old halo / candle / sigil / pentagon-D CSS deleted from globals.css.
- Favicon at `src/app/icon.svg` — V-press on ink background with
  oxblood plates.
- Verified in browser via Playwright. All four pages rendered cleanly.

### Owen's review: "the font feels girly"

- Specifically Fraunces — Owen called it "girly" and said it didn't suit
  the strength register.
- Also asked for: dark mode, hover-reveal animation on non-home pages,
  and reminded me to "make lots of changes at once not one at a time"
  (token-cost feedback).
- Decision recorded: [Decisions/2026-05-06 swap-fraunces-for-newsreader](../../../Decisions/2026-05-06%20swap-fraunces-for-newsreader.md).
- New feedback memory: avoid girly serifs for Devotion. Newsreader is
  the current pick.
- New feedback memory: batch related changes; cited token cost as the
  reason.

### Big batch shipped (2026-05-06 evening)

All in one turn:

1. **Newsreader replaces Fraunces.** `next/font/google` import in
   layout.tsx swapped. All Fraunces fallback chains in globals.css
   replaced with Newsreader. SOFT axis settings stripped (Newsreader
   has no SOFT axis).

2. **Dark mode.** RGB-triplet CSS vars (`--bone-rgb: 245 242 251`),
   `[data-theme="dark"]` selector overrides, `tailwind.config.ts`
   refactored to use `rgb(var(--<name>-rgb) / <alpha-value>)` so
   alpha modifiers keep working. Aurora gradient and tile-fill
   tokens swap with theme.

3. **Theme toggle component.** `src/components/theme-toggle.tsx` — pill
   switch with sliding thumb, sun/moon icons, persists to
   `localStorage['devotion:theme']`.

4. **No-flash boot script** in layout.tsx `<head>` — runs before React
   hydrates; reads localStorage; sets `data-theme` attribute. Prevents
   flash of wrong theme.

5. **Hover-reveal expandable wordmark.** Rewrote wordmark.tsx to use
   HTML+CSS layout instead of fixed SVG coordinates (so font swaps
   don't break alignment). Added `expandable` prop. Non-home pages
   render `<Wordmark expandable plateAccent />`; home page stays full.
   Animation is CSS-only via `max-width` and `transform: translateX`.

6. **`<ThemeToggle />` wired** into all four page headers.

Verified in browser. Both light and dark modes work. Hover-expand works
(playwright confirmed). No console errors. Type-check passes.

Decision recorded: [Decisions/2026-05-06 add-dark-mode](../../../Decisions/2026-05-06%20add-dark-mode.md).

### Domain registration

- Owen reviewed two GoDaddy options: `devotionfitness.co.uk` (£6.99
  first year, £12.99/yr renewal) and `devotion.fitness` (£5.90 first
  year, £47.29/yr renewal — the catch).
- Recommended buying both: `.fitness` as primary, `.co.uk` as 301
  redirect mirror. Decline the GoDaddy "Full Domain Protection" upsells
  (fluff). Decline GoDaddy M365 Email Essentials (bait-and-switch
  pricing).
- Owen bought both. Total £15.65 (£12.89 + £2.76 VAT).
- Account: owenleaton2020@gmail.com.
- Decision recorded: [Decisions/2026-05-06 register-devotion-domains](../../../Decisions/2026-05-06%20register-devotion-domains.md).

### Second brain scaffolded

- Owen asked for a "2nd brain" for Devotion mirroring the KAGE/BUNSHIN
  pattern from DeskWolf.
- Created `brain/` at the project root with:
  - `README.md`, `index.md`, `log.md`
  - `Entities/Devotion/` (index, Strategy, Brand, Product, Tech)
  - `Decisions/` (six immutable records)
  - `Concepts/` (Liturgical Restraint, V-press metaphor, Word IS the logo)
  - `Projects/Logo System.md`
  - `Connections/Owen Leaton.md`
  - This journal entry
- Auto-memory updated with brain location pointer (separate from this
  vault — auto-memory tells Claude *how* to work; brain tells Claude
  *what* the project is).

## What's done

- ✅ Logo locked + shipped
- ✅ Newsreader serif live
- ✅ Dark mode + theme toggle live
- ✅ Hover-reveal wordmark live
- ✅ Domains registered
- ✅ Second brain scaffolded
- ✅ **GitHub repo created** (`Optionallll/devotion_app`, private)
- ✅ **Vercel project deployed** (`optionalllls-projects/devotion-app`)
- ✅ **GoDaddy DNS configured** (`@ → 76.76.21.21`, `www → cname.vercel-dns.com`)
  — required deleting GoDaddy's parking-page A records (`A @ Parked` /
  `A @ WebsiteBuilder Site`) and the auto-created bad CNAMEs that
  pointed `www` at the domain itself
- ✅ **SSL provisioned via Let's Encrypt** automatically once DNS was clean
- ✅ **`https://devotion.fitness` is LIVE** — Owen confirmed seeing the
  rendered site in his browser
- ✅ `vercel.json` redirect rule committed (`devotionfitness.co.uk →
  devotion.fitness`)

## What's open

- ⚠️ **`.co.uk` redirect not yet firing** — the `vercel.json` rule with
  `has.host` matcher may need different syntax, or there's an edge
  cache. Both domains currently serve identical content. Worth a 10-min
  look tomorrow.
- Phase 1 backend planning (auth, DB, programming engine, Sunday
  review writer).
- Final brand-name lock-in (Devotion still flagged "working name").
- Cloudflare email routing for `hello@devotion.fitness`.
- Build out the actual app substance — Owen's framing: *"definitely
  still lots to do like build the actual app itself but we will get
  there and make it a 10k website and make our app look good
  functioning and stuff."*
- **Form a company for Devotion** — Owen plans to "buy an LLC". As a
  UK-based founder this likely means a UK Ltd, not a US LLC. Research
  doc: [Decisions/2026-05-07 future-llc-ltd-research](../../../Decisions/2026-05-07%20future-llc-ltd-research.md).

## Tomorrow / next session

- Walk through UK Ltd vs US LLC decision tree (confirm launch geography
  first, then jurisdiction, then DIY-at-Companies-House vs formation
  agent). See `Decisions/2026-05-07 future-llc-ltd-research.md`.
- Quick fix on the `.co.uk` redirect rule.
- Probably start moving toward Phase 1 — backend stack decision
  (Supabase vs Postgres + Drizzle vs etc) once company structure is
  decided (so the Stripe / Supabase accounts get created in the right
  legal name from day one).

## Owen's stated direction (quotes from end of session)

> "I see it in my browser… definitely still lots to do like build the
> actual app itself but we will get there and make it a 10k website
> and make our app look good functioning and stuff."

> "Plan is ima buy an LLC probably and we are going to have to find
> out the best way to do that."

The "10k website" framing is a useful anchor — Owen wants the marketing
site to feel like a commissioned £10k design build, not an MVP. Hold
this register when iterating on the marketing pages.
