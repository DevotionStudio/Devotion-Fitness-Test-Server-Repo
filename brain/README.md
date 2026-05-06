# Devotion — Second Brain

A markdown-only knowledge vault for the Devotion project. Mirrors the
[BUNSHIN](../../ANGEL%20DeskWolf/kage/skill/references/obsidian-vault-layout.md)
layout used in KAGE. **Read-and-edit, not auto-generated** — this is durable
project memory, not log output.

## Layout

```
brain/
├── index.md                    # wiki index — every page, one line each
├── log.md                      # append-only event log
├── Entities/
│   └── Devotion/               # the product itself
│       ├── index.md            # what Devotion is, current state, one-liner
│       ├── Strategy.md         # positioning, vision
│       ├── Brand.md            # voice, identity, logo, palette, fonts
│       ├── Product.md          # MVP scope, features, principles
│       └── Tech.md             # stack, deployment, run commands
├── Projects/
│   └── Logo System.md          # the v1→v6 logo journey, current state
├── Decisions/                  # YYYY-MM-DD <slug>.md, immutable
│   └── *.md
├── Concepts/                   # cross-cutting domain concepts
│   ├── Liturgical Restraint.md
│   ├── V-press metaphor.md
│   └── Word IS the logo.md
├── Connections/
│   └── Owen Leaton.md          # founder
├── Journal/
│   └── YYYY/MM - Month/DD - Weekday.md
└── raw/                        # immutable source material (mockup files, briefs)
```

## Conventions

- **Frontmatter** every page. `type:` is required. See KAGE's
  [conventions.md](../../ANGEL%20DeskWolf/kage/skill/references/conventions.md)
  if unsure of the shape.
- **Decisions are immutable.** If a decision is reversed, write a new one
  citing `supersedes:` — don't edit the old file.
- **Filenames are exactly what is written.** Wikilinks resolve by filename
  stem; renaming breaks links. Stick with chosen titles.
- **Append `log.md` on every meaningful update.** One line, ISO date, kind,
  one-sentence summary. Lets a fresh Claude session catch up in 30 seconds.
- **Index is hand-maintained.** Karpathy wiki pattern — every new page gets
  one line in `index.md` under its category.

## How to use

- Read [index.md](index.md) first. It's the table of contents.
- For active context on what Devotion *is right now*, start at
  [Entities/Devotion/index.md](Entities/Devotion/index.md).
- For history of why we built it the way we did, scan [Decisions/](Decisions/).
- For deep concepts (the *ideas* the brand is built on), read
  [Concepts/](Concepts/).

## Why a second brain in addition to auto-memory

Auto-memory (the `~/.claude/projects/.../memory/` folder) is for **how Claude
should work with Owen** — preferences, communication style, what to save and
what to ignore. It compresses to fit conversation context.

This brain is for **what Devotion is and why**. It's durable, hand-curated,
and lives with the codebase. A new collaborator (human or AI) reads this to
understand the project; auto-memory tells future-Claude how to be helpful.
