---
type: entity
kind: product
status: active
started: 2026-04-25
domain: devotion.fitness
---

# Devotion

> Strength is a discipline, not a download.

A daily strength training practice — programmed for you, recorded set by set,
and reviewed weekly with the calm of an old craft. **No streaks. No badges.
No noise.**

## What it is

A web-first PWA (later React Native) that treats lifting as **practice**, not
content. The user shows up daily; the app programs the session, captures
what happened, and on Sunday gives them a one-paragraph review of the week.

The product's posture is editorial / monastic — see
[Concepts/Liturgical Restraint](../../Concepts/Liturgical%20Restraint.md).
The brand's posture is the V-press —
[Concepts/V-press metaphor](../../Concepts/V-press%20metaphor.md).

## Current state — 2026-05-06

- **Routes built:** `/` (marketing), `/onboarding`, `/today`, `/review`.
  Each is a React Server Component with selective `"use client"`.
- **Brand:** locked. V-press wordmark + dark-mode + hover-reveal logo on
  non-home pages. Newsreader serif + Hanken Grotesk sans.
- **Domains:** `devotion.fitness` (primary), `devotionfitness.co.uk`
  (will 301 to primary). Registered 2026-05-06 via GoDaddy.
- **Tech:** Next.js 15.5, React 19, TypeScript, Tailwind 3, no DB yet —
  all marketing/onboarding flows are static. See [Tech](Tech.md).
- **Not yet shipped:** auth, persistence, programming engine, real session
  capture, Sunday review writer (LLM-fronted), payments.

## What's distinctive

- **Rules for programming, LLM only for prose.** Volume and progression are
  deterministic; the writer that turns numbers into Sunday's paragraph is
  the only LLM-fronted surface.
- **No social features. No streaks. No leaderboard.** The "you didn't break
  the chain" mechanic is exactly what we *don't* do.
- **Editorial UI.** Type carries the weight. Numbers are large and tabular.
  The product reads like a quiet print magazine, not a fitness app.

## Open questions

See [project_open_questions.md](../../../../../.claude/projects/c--Users-Owen-Documents-GymFit-app/memory/project_open_questions.md)
in auto-memory:
- Geo / launch market.
- Pricing anchor.
- LLM provider (Anthropic vs OpenAI).
- Final brand lock-in (Devotion is "working name" but increasingly stable).

## Top-level pages

- [Strategy](Strategy.md) — positioning, audience, monetisation thesis.
- [Brand](Brand.md) — voice, V-press logo, palette, typography, dark mode.
- [Product](Product.md) — MVP scope, four routes, design principles.
- [Tech](Tech.md) — stack, deployment, run commands, file map.
