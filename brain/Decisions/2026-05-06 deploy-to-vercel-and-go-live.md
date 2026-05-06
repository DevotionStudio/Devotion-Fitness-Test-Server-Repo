---
type: decision
date: 2026-05-06
affects: [Devotion]
---

# Deploy to Vercel and go live at devotion.fitness

## Context

After locking the V-press logo, swapping to Newsreader, adding dark mode,
and registering the domains, the site needed to actually exist on the
internet. No deployment had happened yet — everything was localhost-only.

## Options considered

- **Vercel hobby tier (free).** First-class Next.js host. Auto-detection,
  zero config, free SSL, global edge. The team behind Next.js.
- **Netlify.** Comparable feature set; slightly less native to Next.js.
- **Self-host on a VPS** (Hetzner, DigitalOcean). Cheaper at scale but
  requires reverse-proxy + Let's Encrypt + ops effort that doesn't pay
  off for a pre-launch project.
- **Cloudflare Pages.** Good but Next.js App Router support is younger.

## Decision

**Vercel hobby tier.** GitHub-integrated; pushes to `main` auto-deploy
to production.

## Reason

Devotion is a Next.js app. Vercel is Next.js's home environment — every
quirk, every edge case, every framework feature is supported there
first. For a pre-launch product the optimisation is *speed of iteration*,
not infra cost. Free tier is enough for current traffic; can move later
if usage demands it.

## What was done — 2026-05-06

1. **GitHub repo created** at `github.com/Optionallll/devotion_app`
   (personal account, private). Local git initialised, identity set to
   `Owen Leaton <owenleaton2020@gmail.com>` at the **local repo level**
   only — does not affect any other repos. First commit pushed.
2. **Vercel project linked** via `npm i -g vercel && vercel login &&
   vercel link --project devotion-app --yes`. Project name
   `optionalllls-projects/devotion-app`.
3. **Auto-deploy URL** `devotion-app-ten.vercel.app` was live within
   ~90 seconds of import. Production URL aliased to
   `devotion-bwjb7q2lj-optionalllls-projects.vercel.app`.
4. **Both custom domains attached** via `vercel domains add
   devotion.fitness` and `vercel domains add devotionfitness.co.uk`.
5. **GoDaddy DNS configured** — A `@ → 76.76.21.21` and CNAME
   `www → cname.vercel-dns.com` on each domain.
6. **DNS conflict cleanup** (the bit that took the longest):
   - GoDaddy by default leaves a parking-page A record at `@` (`A @
     Parked` on .fitness, `A @ WebsiteBuilder Site` on .co.uk) — these
     fight the Vercel A record. **Deleted both.**
   - GoDaddy auto-created a CNAME `www → <domain>` on each (pointing www
     at itself) — wrong. **Deleted both.**
   - GoDaddy/I created a typo CNAME `ww → cname.vercel-dns.com` (only
     2 w's). **Deleted both.**
   - Re-added the correct CNAME `www → cname.vercel-dns.com` on each.
7. **SSL provisioning** completed automatically via Let's Encrypt once
   DNS was clean.
8. **vercel.json redirect rule** committed for
   `devotionfitness.co.uk → devotion.fitness` (308 permanent) and
   `www.* → apex.*` for both domains. **Note: .co.uk redirect appears
   to not be firing yet — both domains serve content directly. Open
   follow-up.**

## Consequences

- The site is publicly reachable at `https://devotion.fitness`.
- Future pushes to `main` on GitHub auto-deploy to production.
- Owen can show people a real URL.
- All DNS managed via GoDaddy (didn't switch to Vercel nameservers —
  optional later if we want one-pane DNS management).

## Follow-ups

- **Verify .co.uk → .fitness redirect.** Currently both serve identical
  content; the vercel.json redirect rule with `has.host` matcher might
  need different syntax, or there's a cache issue. Worth a 10-min look
  tomorrow.
- **Set up `hello@devotion.fitness` email** via Cloudflare Email
  Routing (free, inbound only) when needed.
- **Domain renewals** May 2027 — `.fitness` £47.29, `.co.uk` £12.99.
- **Move DNS to Vercel** *(optional)* for one-pane management — change
  GoDaddy nameservers to `ns1.vercel-dns.com` + `ns2.vercel-dns.com`.
  Not blocking; current setup works.

## Cross-references

- [Decisions/2026-05-06 register-devotion-domains](2026-05-06%20register-devotion-domains.md)
- [Entities/Devotion/Tech](../Entities/Devotion/Tech.md)
- Vercel project: https://vercel.com/optionalllls-projects/devotion-app
- GitHub repo: https://github.com/Optionallll/devotion_app
