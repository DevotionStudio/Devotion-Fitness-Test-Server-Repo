---
type: entity
kind: product
entity: Devotion
updated: 2026-05-06
---

# Devotion — Product

## MVP scope (Phase 0–1)

The product has four routes. Phase 0 ships them as static demos to validate
positioning. Phase 1 wires them to a real backend.

### `/` — Marketing

Editorial landing. Positioned as a *manifesto + product preview* hybrid.
- Hero: the "Strength is a *discipline*, not a download" pitch.
- Manifesto: the four principles (no streaks, programmed not entertained,
  the Sunday review, the long arc).
- Principles section.
- Practice preview (anchored screenshots of /today and /review).
- Pricing card.
- Waitlist / "Take the vow" CTA.
- Footer.

### `/onboarding` — Lesson-paced setup

Six lessons (I–VI in Roman numerals, displayed in the header):
1. **Goal** — Get stronger, build muscle, lose fat, build endurance,
   stay healthy.
2. **Level** — Beginner, intermediate, advanced.
3. **Equipment** — Full gym, home gym, dumbbells only, minimal, bodyweight.
4. **Schedule** — days per week, day-of-week selection.
5. **Vow** — the user's stated commitment (a pricing-tier proxy).
6. **Confirm** — review the plan.

The header shows the V-press (collapsed) + the current Roman numeral.

### `/today` — Session card

The day's session, shown card-first, then drill-down to a workout view,
then "done" state.

- **Card** — exercises, set/rep/weight summary, "Begin session" CTA.
- **Workout** — per-set logger with checkboxes (set-checks), weight
  adjustment, rest timer (later phase).
- **Done** — quick capture (RPE, notes), "back to today".

### `/review` — Sunday review

The Sunday view. Shown weekly. Three blocks:
1. **Headline** — the LLM-written paragraph. "Three of four sessions in.
   Friday's leg day was the one that slipped..."
2. **Stats bar** — completion %, volume (kg), top lift.
3. **Week list** — Mon–Sun, with status (done / missed / rest), session
   name. Today indicator.

## Design principles

1. **Rules for programming, LLM for prose.** The progression engine is
   deterministic. Sets, reps, and weights are math. Only the *narration*
   (the Sunday paragraph, possibly the daily intro) goes through an LLM.
   This keeps progression auditable and the LLM unable to hallucinate
   weight selections.

2. **No streaks. No badges. No noise.** Explicit anti-pattern.

3. **Editorial typography over UI chrome.** Newsreader headlines + tabular
   numerics carry the visual weight. UI controls are sharp, simple, and
   recede.

4. **Quiet defaults; revealed depth.** First-time users see a clean
   surface. Power features (multi-block progression, deload weeks, etc)
   sit one layer down, accessed only when asked for.

5. **Web-first PWA, not mobile-first design.** The site renders well on
   phone, but the design is built around an editorial wide layout. RN
   shell comes later.

## What's not in MVP

- Auth, persistence (Phase 1).
- Programming engine (Phase 1).
- Real Sunday review writer (Phase 1).
- Payments (Phase 1).
- Wearable integration (Phase 2).
- Social / community (never per current strategy).
- Video coaching (likely never).
- Multi-language (Phase 2 at earliest).

## Personas (working set)

See [project_personas.md](../../../../../.claude/projects/c--Users-Owen-Documents-GymFit-app/memory/project_personas.md)
in auto-memory for the five working personas covering goal × level ×
equipment × consistency edges. Useful when prompt-prototyping the Sunday
review writer.

## Run commands

See [Tech](Tech.md).
