# Devotion

> Strength is a discipline, not a download.

A daily strength training practice — programmed, recorded, and reviewed
weekly with the calm of an old craft. **No streaks. No badges. No noise.**

Built with Next.js 15 + React 19 + TypeScript + Tailwind. Web-first PWA;
React Native shell to follow.

## Run

```bash
npm install
npm run dev          # localhost:3000 (or 3002 if 3000 is taken)
npx tsc --noEmit     # type-check
npm run build        # production build
npm run prompts      # prompt-prototyping harness (separate from app)
```

## Routes

- `/` — Marketing site (manifesto, principles, pricing, waitlist)
- `/onboarding` — Six-lesson setup
- `/today` — Today's session card → workout → done
- `/review` — Sunday review

## Documentation

The project carries its own knowledge vault at [`brain/`](brain/) — read
[`brain/README.md`](brain/README.md) first, then
[`brain/index.md`](brain/index.md). Decisions, brand notes, and design
rationale live there.

## Domains

- Production: `devotion.fitness` (DNS configuration pending)
- UK redirect: `devotionfitness.co.uk`

## Stack

- Next.js 15.5.15 (App Router) on React 19
- TypeScript strict
- Tailwind 3 with RGB-triplet CSS variable theming + `[data-theme="dark"]`
- `Newsreader` (serif) + `Hanken Grotesk` (sans) via `next/font/google`
- No DB, auth, or persistence yet — phase 0 is intentionally static
