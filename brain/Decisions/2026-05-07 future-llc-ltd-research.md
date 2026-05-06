---
type: decision
date: 2026-05-07
status: pending-research
affects: [Devotion]
---

# Form a company for Devotion (LLC vs Ltd — research pending)

## Context

Owen flagged 2026-05-06 evening: *"plan is ima buy an llc probably and we
are going to have to find out the best way to do that."* Currently
operating as a sole individual; domains/hosting are in his personal name
on his personal accounts. Pre-launch but moving toward needing a legal
entity for: contracts, payment processing, IP holding, liability
separation, and (eventually) hiring.

## What "LLC" actually means here

Owen used "LLC" colloquially. Owen is **UK-based** (£ pricing, .co.uk
domain registration on a UK GoDaddy account) — so the actual structures
to compare are:

- **UK Private Limited Company (Ltd)** — the standard UK equivalent of an
  LLC. £50 to register at Companies House, can be done in ~24 hours.
  Limited liability, separate legal entity, must file annual confirmation
  + accounts.
- **Sole Trader** — current de-facto state. No registration cost, simpler
  taxes, but unlimited personal liability. Fine for pre-launch but a
  liability shield matters once you take payments / store user data.
- **US LLC** (Delaware / Wyoming / Florida) — only relevant if Owen
  specifically wants a US entity for fundraising / operating in the US.
  Adds complexity (US tax filings, registered agent fees ~£100/yr, EIN,
  cross-border tax treaties). Probably **not** the right call for a
  UK-resident founder unless raising US VC.
- **LLP (Limited Liability Partnership)** — for two or more partners
  only. Not relevant if Devotion stays solo-owned.

## Options to research before decision

1. **Ltd company at Companies House** (likely answer).
2. **Sole Trader → Ltd later** (defer the decision; just keep good
   records now).
3. **US Delaware LLC** (only if US operations / fundraising).
4. **Use a formation agent** (e.g. Mintformations, 1stFormations,
   Quality Formations) — bundle Ltd registration + registered office +
   annual confirmation help. ~£20–50 setup, ~£40/yr ongoing for the
   service.

## What we need to figure out tomorrow / next session

- **Decide jurisdiction.** UK Ltd (default) vs US LLC (only if specific
  US-facing reason).
- **If UK Ltd:**
  - Choose a name. Companies House requires it not match an existing
    company. "Devotion" itself probably taken — likely options:
    "Devotion Fitness Ltd", "Devotion Strength Ltd", "Devotion Practice
    Ltd". Check at https://find-and-update.company-information.service.gov.uk/
  - Choose SIC code (probably 96040 — physical well-being activities,
    or 62012 — business and domestic software development if framing
    as a tech company).
  - Decide registered office. Owen's home address goes on public record
    unless using a formation agent's address service.
  - Director(s) — Owen alone, or any cofounder.
  - Shareholding — start with 100 ordinary shares to Owen (simplest);
    can issue more later.
  - Bank: Tide / Starling / Mettle for UK Ltd current accounts (free
    tier). Avoid the high-street banks — slow account opening.
- **If US LLC:**
  - Why this jurisdiction specifically? Not a default — needs a reason.
  - Registered agent service required (~£100/yr).
  - Need an EIN (free from IRS, takes 1–2 weeks for foreign founders).
  - UK tax implications — would still need to file UK self-assessment
    or run a UK Ltd alongside.
- **Tax registration** — VAT only required once turnover >£90k/year
  (UK). Below that, voluntary registration is sometimes still smart for
  B2B, irrelevant for B2C.
- **Bank/payments setup** — Stripe is the obvious payment processor,
  works with both Ltd and Sole Trader. Connecting after company
  formation.
- **IP transfer** — domains and accounts currently in Owen's personal
  name. Once a Ltd exists, the company should own them — easy transfer
  via GoDaddy account merge or domain push.

## Decision

**Pending research — not blocking current dev work.** Owen wants to
form an entity but the right structure depends on launch geography and
fundraising plans, neither of which is locked.

## Reason this is pending, not deferred

Liability shield matters as soon as we take payments or store user
health data (which we will, as a fitness app). So forming an entity is
a known near-term task — we just don't yet know which kind.

## Follow-ups

- Next session: walk through the UK Ltd vs US LLC decision tree once
  Owen confirms launch geography.
- Pick name candidates and run them through Companies House search.
- Choose: DIY at Companies House (£50, 1hr) vs formation agent (£20–50
  + service fee, includes registered office).
- After formation: transfer GoDaddy domains, set up Tide/Starling
  business account, register for HMRC corporation tax, set up Stripe
  account in the company's name.
