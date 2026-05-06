---
type: decision
date: 2026-05-06
affects: [Devotion]
---

# Register devotion.fitness + devotionfitness.co.uk

## Context

With the brand name stable ("Devotion"), the logo locked (V-press),
and the design system shipped (Newsreader + dark mode), Owen wanted to
secure the domains before someone else did. The .com is squatted; need
a .fitness or modifier.

## Options considered

- **devotion.com** — squatted, listed for thousands.
- **devotion.fitness** — available, £5.90 first year, £47.29/yr renewal
  (significantly more than legacy TLDs).
- **devotionfitness.co.uk** — available, £6.99 first year, £12.99/yr
  renewal. UK-only positioning.
- **getdevotion.com / trydevotion.com** — available, cheap, but generic
  startup-prefix energy.
- **devotion.app / devotion.gym** — available, mid-priced, decent fits.

## Decision

**Register both `devotion.fitness` and `devotionfitness.co.uk`.** Use
`devotion.fitness` as the primary brand domain; `.co.uk` as a 301
redirect to catch UK users typing the obvious alternative.

## Reason

- `devotion.fitness` reads as `devotion` + `.fitness` — domain doubles
  as tagline. Same elegance as `linear.app`, `vercel.com`, `humane.com`.
  Matches the "word IS the logo" decision.
- `.co.uk` at £6.99 first year is cheap insurance — locks competitors
  out of the obvious UK mirror, catches typo-prone users.
- £12.89 first year for both, declining all upsells. Reasonable.
- `.fitness` renewal at £47.29/yr is the only expensive part; over 5
  years that's ~£170 vs ~£65 for the .co.uk. For a primary brand
  domain it's accepted.

Registered via GoDaddy on `owenleaton2020@gmail.com`. Total paid:
£15.65 (£12.89 + £2.76 VAT).

## Consequences

- All marketing copy can now reference `devotion.fitness`.
- DNS / hosting setup deferred — current site runs only on `localhost`
  during dev. Plan: deploy to Vercel hobby tier, point both domains at
  the Vercel app.
- Email at the brand domain is a future task. **Do NOT use GoDaddy's
  Microsoft 365 Email Essentials** (£0.99/mo first year is a bait-and-
  switch for £6.49/mo at renewal). Use Cloudflare Email Routing (free)
  for inbound; switch to Google Workspace (£4.60/mo) when sending is
  needed.
- Both **Full Domain Protection** upsells declined — the protection is
  GoDaddy fluff that mostly just enables 2FA on transfer. Equivalent
  achievable for free by enabling 2FA on the GoDaddy account itself
  and leaving the default transfer-lock on.

## Follow-ups

- Configure DNS once Vercel deployment is live.
- Set up `devotionfitness.co.uk` → `devotion.fitness` 301 redirect.
- Set up Cloudflare Email Routing for `hello@devotion.fitness` →
  Owen's existing inbox.
- Add domain renewal date (May 2027) to `Decisions/` follow-up calendar
  or KAGE/ClickUp once that integration runs for this project.
