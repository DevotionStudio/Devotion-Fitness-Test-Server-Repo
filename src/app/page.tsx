"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="shell">
      <SiteHeader />
      <main id="top">
        <Hero />
        <Manifesto />
        <Principles />
        <Practice />
        <Pricing />
        <Waitlist />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────── */

function SiteHeader() {
  return (
    <header className="container-d sticky top-0 z-30 bg-bone/90 backdrop-blur-sm border-b border-line2">
      <div className="flex items-center justify-between py-5">
        <Link href="#top" aria-label="Devotion home">
          <Wordmark size="sm" />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          <a href="#manifesto" className="text-sm text-ink-2 hover:text-oxblood">Manifesto</a>
          <a href="#principles" className="text-sm text-ink-2 hover:text-oxblood">Principles</a>
          <a href="#pricing" className="text-sm text-ink-2 hover:text-oxblood">Pricing</a>
          <Link href="/onboarding" className="text-sm text-ink-2 hover:text-oxblood">Begin</Link>
        </nav>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <a href="#join" className="btn-d-quiet hidden sm:inline-flex">Join — invite only</a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────── */

function Hero() {
  return (
    <section className="container-d pt-24 md:pt-36 pb-24">
      <div className="max-w-[920px]">
        <p className="eyebrow eyebrow-ox">Vol. I · A daily practice</p>
        <h1 className="display-1 mt-7">
          Strength is a <em className="italic-serif">discipline</em>,<br />
          not a download.
        </h1>
        <p className="lead mt-9 max-w-[640px]">
          Devotion is a strength training practice — programmed for you, recorded set by set, and reviewed weekly with the calm of an old craft. No streaks. No badges. No noise.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="#join" className="btn-d-primary">Take the vow</a>
          <a href="#manifesto" className="btn-d-quiet">Read the manifesto →</a>
        </div>
      </div>

      {/* Editorial sub-row — date / chapter feel */}
      <div className="mt-24 flex items-end justify-between border-t border-ink pt-6 max-w-[920px]">
        <div>
          <span className="eyebrow">First edition</span>
          <div className="display-3 mt-2">No. 001</div>
        </div>
        <div className="text-right">
          <span className="eyebrow">For the lifter who</span>
          <div className="italic-serif text-2xl text-ink-2 mt-2">keeps showing up.</div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function Manifesto() {
  const lines = [
    {
      n: "I",
      title: "Plan, then act.",
      body: "Every session is a written script. You read it, you do it. You don't decide between sets.",
    },
    {
      n: "II",
      title: "Record everything.",
      body: "Weight. Reps. How hard it felt. The honest log is the only one that compounds.",
    },
    {
      n: "III",
      title: "Review on Sunday.",
      body: "The week ends with one paragraph: what worked, what slipped, what the next week asks of you.",
    },
  ];
  return (
    <section id="manifesto" className="container-d py-28 border-t border-line">
      <div className="grid gap-16 md:grid-cols-[260px_minmax(0,1fr)]">
        <div>
          <span className="eyebrow eyebrow-ox">The manifesto</span>
          <h2 className="display-2 mt-5">
            Three vows.
          </h2>
          <span className="rule-ox mt-6" />
        </div>
        <div className="space-y-12">
          {lines.map((l) => (
            <div key={l.n} className="grid grid-cols-[40px_minmax(0,1fr)] gap-6 items-baseline">
              <span className="roman">{l.n}.</span>
              <div>
                <h3 className="display-3">{l.title}</h3>
                <p className="lead mt-3 max-w-[560px]">{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function Principles() {
  const items = [
    {
      n: "01",
      title: "Programming, not prompts.",
      body: "Periodised blocks built around your goal, equipment, and the 7 days you actually have. The plan adapts when life does.",
    },
    {
      n: "02",
      title: "Numbers stay honest.",
      body: "Tabular logs, RPE, top-set tracking. The numbers are quiet but they don't lie.",
    },
    {
      n: "03",
      title: "Coached prose, not push notifications.",
      body: "A short, written read at the end of each week. Spoken to you, not sold to you.",
    },
  ];
  return (
    <section id="principles" className="container-d py-28 border-t border-line bg-bone2">
      <div className="grid gap-12 md:grid-cols-3">
        {items.map((it) => (
          <article key={it.n} className="grid gap-5">
            <div className="flex items-baseline gap-3">
              <span className="roman">{it.n}</span>
              <span className="rule-ox flex-1" />
            </div>
            <h3 className="display-3">{it.title}</h3>
            <p className="body-d">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function Practice() {
  return (
    <section id="practice" className="container-d py-28 border-t border-line">
      <div className="grid gap-16 md:grid-cols-[minmax(0,1fr)_360px] items-start">
        <div>
          <span className="eyebrow eyebrow-ox">A page from the practice</span>
          <h2 className="display-2 mt-5">
            What a Tuesday looks like.
          </h2>
          <p className="lead mt-7 max-w-[520px]">
            One screen. The day's lift, the target weight, the last time you did it. A checkbox per set. A coach's note when you need one. Nothing else.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/today" className="btn-d-ghost">Open the practice</Link>
            <Link href="/onboarding" className="btn-d-quiet">Or set yours up →</Link>
          </div>
        </div>

        {/* Editorial card mock — bone, no shadows, no rounding */}
        <aside className="border border-ink p-7" aria-label="Today's session preview">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Tuesday, week 06</span>
            <span className="roman">XII</span>
          </div>
          <h3 className="display-3 mt-5">Press &amp; pull.</h3>
          <span className="rule mt-5 block" />
          <ul className="mt-5 divide-y divide-line">
            {[
              ["Bench press", "82.5kg · 4 × 6"],
              ["Pendlay row", "70kg · 4 × 8"],
              ["Incline DB press", "30kg · 3 × 10"],
              ["Face pull", "—"],
            ].map(([n, m]) => (
              <li key={n} className="flex items-baseline justify-between py-3">
                <span className="text-sm">{n}</span>
                <span className="text-sm tab-num text-ink-2">{m}</span>
              </li>
            ))}
          </ul>
          <p className="quote quote-ox mt-7">
            +2.5kg on bench. Earn it off the chest, no bounce.
          </p>
        </aside>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function Pricing() {
  return (
    <section id="pricing" className="container-d py-28 border-t border-line">
      <div className="grid gap-12 md:grid-cols-[260px_minmax(0,1fr)]">
        <div>
          <span className="eyebrow eyebrow-ox">Tithes</span>
          <h2 className="display-2 mt-5">Two ways<br/>to commit.</h2>
        </div>

        <div className="grid gap-px bg-ink border border-ink">
          <PriceRow
            name="Solo"
            sub="One lifter. The whole practice."
            price="£14"
            unit="month"
            cta="Begin solo"
          />
          <PriceRow
            name="Crew"
            sub="Up to six lifters. Shared programs and reviews."
            price="£49"
            unit="month"
            cta="Form a crew"
            featured
          />
        </div>
      </div>
    </section>
  );
}

function PriceRow({
  name, sub, price, unit, cta, featured,
}: { name: string; sub: string; price: string; unit: string; cta: string; featured?: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_auto_auto] items-center gap-6 px-7 py-8 ${featured ? "bg-ink text-bone" : "bg-bone"}`}>
      <div>
        <h3 className="display-3" style={{ color: featured ? "var(--bone)" : "var(--ink)" }}>{name}</h3>
        <p className={`mt-2 text-sm ${featured ? "text-bone/70" : "text-ink-2"}`}>{sub}</p>
      </div>
      <div className="text-right">
        <div className="numeric-md" style={{ color: featured ? "var(--bone)" : "var(--ink)" }}>{price}</div>
        <div className={`text-xs uppercase tracking-[0.18em] mt-1 ${featured ? "text-bone/60" : "text-ash"}`}>per {unit}</div>
      </div>
      <a
        href="#join"
        className={`btn-d ${featured ? "bg-oxblood text-bone hover:bg-oxblood2" : "bg-ink text-bone hover:bg-oxblood"}`}
      >
        {cta}
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────── */

function Waitlist() {
  const [email, setEmail] = useState("");
  const [vow, setVow] = useState<"strength" | "conditioning" | "crew" | "">("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !vow) {
      setNote("A name and a vow, please.");
      return;
    }
    setNote("Welcome. The first cycle opens shortly.");
    setEmail("");
    setVow("");
  };

  return (
    <section id="join" className="container-d py-28 border-t border-line bg-ink text-bone">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-end">
        <div>
          <span className="eyebrow" style={{ color: "var(--gilt)" }}>The list</span>
          <h2 className="display-2 mt-5" style={{ color: "var(--bone)" }}>
            Take the vow.
          </h2>
          <p className="mt-7 max-w-[460px]" style={{ color: "rgba(244,239,228,0.72)", fontSize: 17, lineHeight: 1.55 }}>
            Devotion opens in small cohorts. Leave your name and the vow you'd take, and we'll write back when the next chapter begins.
          </p>
        </div>
        <form onSubmit={submit} className="grid gap-6">
          <label className="grid gap-2">
            <span className="eyebrow" style={{ color: "var(--bone)" }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="bg-transparent border-b border-bone/40 py-3 text-bone placeholder-bone/40 outline-none focus:border-oxblood text-lg"
            />
          </label>
          <fieldset className="grid gap-3">
            <span className="eyebrow" style={{ color: "var(--bone)" }}>Your vow</span>
            <div className="grid grid-cols-3 border border-bone/30 divide-x divide-bone/30">
              {[
                { id: "strength", label: "Strength" },
                { id: "conditioning", label: "Conditioning" },
                { id: "crew", label: "Crew" },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setVow(o.id as typeof vow)}
                  className={`py-3 text-sm transition-colors ${
                    vow === o.id ? "bg-oxblood text-bone" : "text-bone/70 hover:bg-bone/10"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="btn-d bg-oxblood text-bone hover:bg-oxblood2 self-start">
            Join the list
          </button>
          {note && (
            <p className="italic-serif text-base" style={{ color: vow ? "var(--gilt)" : "rgba(244,239,228,0.6)" }}>
              {note}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function SiteFooter() {
  return (
    <footer className="container-d py-12 border-t border-line bg-bone">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Wordmark size="sm" />
          <p className="text-xs text-ash mt-3">A daily practice of strength · A working name, subject to change.</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-ink-2">
          <Link href="/onboarding" className="hover:text-oxblood">Begin</Link>
          <Link href="/today" className="hover:text-oxblood">Today</Link>
          <Link href="/review" className="hover:text-oxblood">Review</Link>
          <a href="#manifesto" className="hover:text-oxblood">Manifesto</a>
          <a href="#pricing" className="hover:text-oxblood">Pricing</a>
        </nav>
      </div>
    </footer>
  );
}
