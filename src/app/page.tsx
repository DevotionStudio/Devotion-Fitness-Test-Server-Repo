"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  PhoneMockup,
  TodayScreen,
  ReviewScreen,
  OnboardingScreen,
} from "@/components/phone-mockup";

export default function Home() {
  return (
    <div className="shell">
      <SiteHeader />
      <main id="top">
        <Hero />
        <Benefits />
        <Practice />
        <FeatureBreakdown />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <SiteFooter />
      </main>
      <PageSchema />
    </div>
  );
}

/* ─────────────────────────────────────────── */

function SiteHeader() {
  return (
    <header className="container-d sticky top-0 z-30 bg-bone/85 backdrop-blur-md border-b border-line2">
      <div className="flex items-center justify-between py-5">
        <Link href="#top" aria-label="Devotion home">
          <Wordmark size="sm" />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          <a href="#how" className="text-sm font-medium text-ink-2 hover:text-oxblood transition-colors">How it works</a>
          <a href="#features" className="text-sm font-medium text-ink-2 hover:text-oxblood transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-ink-2 hover:text-oxblood transition-colors">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-ink-2 hover:text-oxblood transition-colors">FAQ</a>
          <Link href="/onboarding" className="text-sm font-medium text-ink-2 hover:text-oxblood transition-colors">Begin</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a href="#join" className="btn-d btn-d-accent hidden sm:inline-flex">Start training</a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────── */

function Hero() {
  return (
    <section className="container-d relative pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] items-center">
        <div className="max-w-[640px]">
          <span className="kicker">A daily strength practice</span>
          <h1 className="display-1 mt-6">
            Strength is a <em className="text-oxblood not-italic">discipline</em>,<br />
            not a download.
          </h1>
          <p className="lead mt-7 max-w-[560px]">
            Devotion programs your week, captures every set, and writes you a one-paragraph review every Sunday. No streaks. No badges. No noise.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#join" className="btn-d btn-d-accent">Start training →</a>
            <a href="#how" className="btn-d btn-d-ghost">See how it works</a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ash">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-oxblood inline-block" aria-hidden="true" />
              Founder pricing — £75 lifetime
            </span>
            <span className="hidden sm:inline text-line" aria-hidden="true">·</span>
            <span>First 100 lifters only</span>
          </div>
        </div>
        <div className="hidden lg:block justify-self-end relative">
          <div
            className="absolute -inset-10 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, rgb(var(--oxblood-rgb) / 0.35), transparent 70%)" }}
            aria-hidden="true"
          />
          <PhoneMockup label="Today's session preview" className="relative">
            <TodayScreen />
          </PhoneMockup>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

const ICONS = {
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 9h8M8 13h6M8 17h4" />
    </svg>
  ),
  log: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  silence: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  ),
};

function Benefits() {
  const items = [
    {
      n: "01",
      icon: ICONS.plan,
      title: "You stop deciding.",
      body: "Every session is written before you arrive. You read it, you do it. Decision fatigue is the enemy of discipline; the program removes it.",
    },
    {
      n: "02",
      icon: ICONS.log,
      title: "Every set captured.",
      body: "Tabular weight, reps, RPE — the kind of log that compounds into proof. Not a feed. Not a scroll. The honest record of work done.",
    },
    {
      n: "03",
      icon: ICONS.review,
      title: "Sundays read like a coach.",
      body: "One paragraph at the end of the week. What worked, what slipped, what next week asks of you. Specific, written for the lifter you actually are.",
    },
    {
      n: "04",
      icon: ICONS.silence,
      title: "Built for silence.",
      body: "No streaks. No badges. No push notifications begging for your attention. The work is the reward; the app gets out of the way.",
    },
  ];
  return (
    <section id="how" className="container-d py-20 md:py-28 border-t border-line">
      <div className="max-w-[760px]">
        <span className="kicker">How it works</span>
        <h2 className="display-2 mt-5">Built around four ideas.</h2>
        <p className="lead mt-5 max-w-[560px]">
          Strength training only compounds if you actually show up and the work is honest. Devotion is the smallest possible app that protects both.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <article key={it.n} className="card p-7">
            <div className="flex items-center justify-between">
              <span className="card-icon card-icon-violet">{it.icon}</span>
              <span className="num-badge">{it.n}</span>
            </div>
            <h3 className="display-3 mt-5">{it.title}</h3>
            <p className="text-sm leading-relaxed text-ink-2 mt-3">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function Practice() {
  return (
    <section id="practice" className="container-d py-20 md:py-28 border-t border-line bg-bone2 overflow-hidden">
      <div className="max-w-[760px] relative">
        <span className="kicker">See it in action</span>
        <h2 className="display-2 mt-5">The whole loop, in three screens.</h2>
        <p className="lead mt-5 max-w-[600px]">
          Onboarding shapes the plan in ten minutes. Today shows you exactly what to lift. Sunday tells you what the week actually did.
        </p>
      </div>

      <div className="relative mt-16">
        <div
          className="absolute -inset-x-20 -inset-y-10 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgb(var(--oxblood-rgb) / 0.30), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative grid gap-10 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <PhoneCard
            kicker="01 · Onboarding"
            title="Six lessons, ten minutes."
            body="The plan is shaped from your goal, equipment, and the days you actually have."
            screen={<OnboardingScreen />}
          />
          <PhoneCard
            kicker="02 · Today"
            title="One screen. Today's lift."
            body="Day's session, target weight, last time you did it. A checkbox per set. Nothing else."
            screen={<TodayScreen />}
            featured
          />
          <PhoneCard
            kicker="03 · Sunday"
            title="The review reads like a coach."
            body="One short paragraph that reads what the week actually did, not what it counted."
            screen={<ReviewScreen />}
          />
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
        <Link href="/today" className="btn-d btn-d-primary">Open the practice</Link>
        <Link href="/review" className="btn-d btn-d-ghost">See the Sunday review</Link>
      </div>
    </section>
  );
}

function PhoneCard({
  kicker,
  title,
  body,
  screen,
  featured,
}: {
  kicker: string;
  title: string;
  body: string;
  screen: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <article className="grid gap-5 max-w-[320px] w-full">
      <div className={featured ? "lg:-translate-y-4 transition-transform" : ""}>
        <PhoneMockup label={title}>{screen}</PhoneMockup>
      </div>
      <div className="text-center">
        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-oxblood">
          {kicker}
        </span>
        <h3 className="display-3 mt-2 text-lg">{title}</h3>
        <p className="text-sm text-ink-2 mt-2 leading-relaxed">{body}</p>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────── */

function FeatureBreakdown() {
  const rows = [
    {
      n: "01",
      name: "Personalised programming",
      sub: "Periodised cycles built around your goal, equipment, and the days you actually have.",
      value: "£40/mo",
      tag: "coaching value",
    },
    {
      n: "02",
      name: "Set-by-set capture",
      sub: "Tabular logs, RPE, top-set tracking. The kind of record that compounds into real proof.",
      value: "£15/mo",
      tag: "tracking value",
    },
    {
      n: "03",
      name: "Sunday written review",
      sub: "One short paragraph by Sunday night. Not a stat dump — a coach's read of your week.",
      value: "£25/mo",
      tag: "coach-prose value",
    },
    {
      n: "04",
      name: "Six-lesson onboarding",
      sub: "Done in ten minutes. The plan is generated from your real life, not a generic template.",
      value: "£20",
      tag: "setup value",
    },
  ];
  return (
    <section id="features" className="container-d py-20 md:py-28 border-t border-line">
      <div className="max-w-[760px]">
        <span className="kicker">Do the math</span>
        <h2 className="display-2 mt-5">What you actually get.</h2>
        <p className="lead mt-5 max-w-[560px]">
          Coaching, tracking, and weekly review usually cost separate things. Devotion bundles all three into the daily practice.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-bone overflow-hidden">
        {rows.map((r, i) => (
          <div
            key={r.n}
            className={`grid gap-3 sm:gap-6 px-5 md:px-8 py-6 sm:grid-cols-[44px_minmax(0,1fr)_auto] items-center ${i > 0 ? "border-t border-line" : ""}`}
          >
            <span className="num-badge hidden sm:inline-flex">{r.n}</span>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="num-badge sm:hidden">{r.n}</span>
                <h3 className="display-3 text-lg md:text-xl">{r.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-2 mt-2">{r.sub}</p>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="font-semibold text-base md:text-lg tab-num">{r.value}</span>
              <span className="text-xs uppercase tracking-[0.18em] ml-2 sm:ml-0 sm:block sm:mt-1 text-ash">
                {r.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 max-w-[760px]">
        <p className="text-sm md:text-base text-ink-2">
          A coach who'd assemble all of this would run roughly <strong className="text-ink">£100 a month.</strong>
        </p>
        <p className="text-2xl font-semibold text-oxblood tab-num">Devotion starts at £4.</p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function Pricing() {
  return (
    <section id="pricing" className="container-d py-20 md:py-28 border-t border-line bg-bone2">
      <div className="max-w-[760px]">
        <span className="kicker">Pricing</span>
        <h2 className="display-2 mt-5">Three ways to start.</h2>
        <p className="lead mt-5 max-w-[560px]">
          Standard tiers post-launch. The founder price disappears at lifter 101 — then it's gone.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* Monthly */}
        <article className="pcard">
          <div className="pcard__top">
            <h3 className="display-3 text-xl">Monthly</h3>
            <p className="text-sm text-ink-2 mt-1.5">Cancel anytime.</p>
            <div className="pcard__price mt-6">
              <span className="currency">£</span>6.99
              <span className="text-base font-medium text-ash align-baseline ml-1">/mo</span>
            </div>
          </div>
          <ul className="pcard__features">
            <li>Personalised programming</li>
            <li>Set-by-set capture</li>
            <li>Sunday written review</li>
            <li>Cancel any time</li>
          </ul>
          <div className="px-7 pb-7">
            <a href="#join" className="btn-d btn-d-primary w-full justify-center">Start monthly</a>
          </div>
        </article>

        {/* Annual */}
        <article className="pcard">
          <div className="pcard__top">
            <h3 className="display-3 text-xl">Annual</h3>
            <p className="text-sm text-ink-2 mt-1.5">Save 42% — effectively £4.08/mo.</p>
            <div className="pcard__price mt-6">
              <span className="currency">£</span>49
              <span className="text-base font-medium text-ash align-baseline ml-1">/yr</span>
            </div>
          </div>
          <ul className="pcard__features">
            <li>Everything in Monthly</li>
            <li>Save 42% vs monthly</li>
            <li>Locked-in pricing for the year</li>
            <li>Cancel any time</li>
          </ul>
          <div className="px-7 pb-7">
            <a href="#join" className="btn-d btn-d-primary w-full justify-center">Start annual</a>
          </div>
        </article>

        {/* Founder */}
        <article className="pcard pcard--featured">
          <div className="pcard__top pcard__top--dark">
            <span className="pcard__badge">Founder · 100 only</span>
            <h3 className="display-3 text-xl mt-5" style={{ color: "var(--bone)" }}>Founder</h3>
            <p className="text-sm mt-1.5" style={{ color: "rgb(var(--bone-rgb) / 0.72)" }}>Lifetime access. One payment, yours forever.</p>
            <div className="pcard__price mt-6">
              <span className="currency">£</span>75
              <span className="text-base font-medium align-baseline ml-1" style={{ color: "rgb(var(--bone-rgb) / 0.55)" }}>once</span>
            </div>
            <ul className="pcard__features">
              <li>Lifetime access — never billed again</li>
              <li>All future features included</li>
              <li>Founder badge in-app</li>
              <li>Direct line to product feedback</li>
            </ul>
          </div>
          <div className="p-7">
            <a href="#join" className="btn-d btn-d-accent w-full justify-center">Lock in founder price</a>
            <p className="text-xs text-ash text-center mt-3">Available pre-launch only</p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function FAQ() {
  const qs = [
    {
      q: "I'm not a beginner. Will the programming actually challenge me?",
      a: "Yes. The engine works from your current 1RM and progresses on RPE feedback. Heavy intermediates and advanced lifters get the same loading logic proven gyms use. The aesthetic is calm; the programming is not.",
    },
    {
      q: "What equipment do I need?",
      a: "Devotion adapts to what you have. Pick from full gym, home gym, dumbbells only, minimal, or pure bodyweight during onboarding. The program reshapes around your kit.",
    },
    {
      q: "How is this different from Strong, Hevy, or Caliber?",
      a: "Strong and Hevy log; they don't program. Caliber pairs you with a human coach for £150+/month. Devotion programs the work, captures it, and writes you a Sunday review for the price of a sandwich.",
    },
    {
      q: "What if I miss a week?",
      a: "The program reshapes. No streak to break, no shame screen. You come back, the next session reads your last entries, and the cycle adjusts.",
    },
    {
      q: "Is this for women too?",
      a: "Yes. The programming engine cares about your starting strength, recovery, and goals — not your sex. The aesthetic isn't pink, isn't bro. It's just calm.",
    },
    {
      q: "When does it launch?",
      a: "When the first 100 founders sign up. Pre-launch right now; the founder lifetime price is the launch threshold. After that, monthly and annual only.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Monthly and annual cancel any time, no questions. Founder is one payment, yours forever.",
    },
  ];
  return (
    <section id="faq" className="container-d py-20 md:py-28 border-t border-line">
      <div className="grid gap-12 md:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <span className="kicker">FAQ</span>
          <h2 className="display-2 mt-5">Common questions.</h2>
          <p className="lead mt-5 max-w-[260px]">
            Everything you'd ask before starting.
          </p>
        </div>
        <div className="grid gap-3">
          {qs.map((it, i) => (
            <details key={i} className="card p-6 group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                <h3 className="font-semibold text-base md:text-lg leading-snug">{it.q}</h3>
                <span
                  className="w-8 h-8 rounded-full bg-bone2 border border-line text-oxblood flex items-center justify-center transition-transform group-open:rotate-45 select-none shrink-0"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-sm leading-relaxed text-ink-2 mt-4 max-w-[660px]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */

function FinalCTA() {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<"monthly" | "annual" | "founder" | "">("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !tier) {
      setNote("An email and a tier, please.");
      return;
    }
    setNote("Welcome. We'll write back when the cycle opens.");
    setEmail("");
    setTier("");
  };

  return (
    <section id="join" className="container-d py-20 md:py-28 border-t border-line bg-ink text-bone">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <span className="kicker" style={{ color: "var(--oxblood-2)" }}>The list</span>
          <h2 className="display-2 mt-5" style={{ color: "var(--bone)" }}>
            Start training.
          </h2>
          <p className="mt-5 max-w-[460px] text-base leading-relaxed" style={{ color: "rgb(var(--bone-rgb) / 0.78)" }}>
            The first 100 lifters lock the founder price — £75 lifetime, then it's gone. Leave your email and the plan you'd choose.
          </p>
        </div>
        <form onSubmit={submit} className="grid gap-5 p-7 rounded-2xl bg-bone/5 border border-bone/10 backdrop-blur-sm">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgb(var(--bone-rgb) / 0.7)" }}>Email</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="bg-transparent border-b border-bone/30 py-2.5 text-bone placeholder-bone/40 outline-none focus:border-oxblood transition-colors text-base"
            />
          </label>
          <fieldset className="grid gap-2.5">
            <legend className="text-xs font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: "rgb(var(--bone-rgb) / 0.7)" }}>Plan</legend>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "monthly", label: "Monthly" },
                { id: "annual", label: "Annual" },
                { id: "founder", label: "Founder" },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setTier(o.id as typeof tier)}
                  aria-pressed={tier === o.id}
                  className={`py-3 px-4 rounded-full text-sm font-medium transition-colors ${
                    tier === o.id ? "bg-oxblood text-bone" : "bg-bone/5 text-bone/70 hover:bg-bone/10 border border-bone/10"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="btn-d btn-d-accent justify-center mt-1">
            Start training →
          </button>
          {note && (
            <p className="text-sm" style={{ color: tier ? "var(--oxblood-2)" : "rgb(var(--bone-rgb) / 0.6)" }}>
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
          <p className="text-xs text-ash mt-3">A daily strength practice · Devotion Studio Ltd</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2" aria-label="Footer">
          <Link href="/onboarding" className="hover:text-oxblood transition-colors">Begin</Link>
          <Link href="/today" className="hover:text-oxblood transition-colors">Today</Link>
          <Link href="/review" className="hover:text-oxblood transition-colors">Review</Link>
          <a href="#how" className="hover:text-oxblood transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-oxblood transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-oxblood transition-colors">FAQ</a>
        </nav>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────── */

function PageSchema() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Devotion",
      url: "https://devotion.fitness",
      slogan: "Strength is a discipline, not a download.",
      description:
        "A daily strength training practice — programmed, captured, and reviewed weekly.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Devotion",
      url: "https://devotion.fitness",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Devotion",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS, Android",
      description:
        "A daily strength training practice — programmed for you, captured set by set, reviewed weekly.",
      offers: [
        { "@type": "Offer", name: "Monthly", price: "6.99", priceCurrency: "GBP", category: "Subscription" },
        { "@type": "Offer", name: "Annual", price: "49.00", priceCurrency: "GBP", category: "Subscription" },
        { "@type": "Offer", name: "Founder", price: "75.00", priceCurrency: "GBP", category: "Lifetime", availability: "https://schema.org/LimitedAvailability" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "I'm not a beginner. Will the programming actually challenge me?", acceptedAnswer: { "@type": "Answer", text: "Yes. The engine works from your current 1RM and progresses on RPE feedback. Heavy intermediates and advanced lifters get the same loading logic proven gyms use." } },
        { "@type": "Question", name: "What equipment do I need?", acceptedAnswer: { "@type": "Answer", text: "Devotion adapts to what you have. Full gym, home gym, dumbbells only, minimal, or pure bodyweight." } },
        { "@type": "Question", name: "How is this different from Strong, Hevy, or Caliber?", acceptedAnswer: { "@type": "Answer", text: "Strong and Hevy log; they don't program. Caliber pairs you with a human coach for £150+/month. Devotion programs the work, captures it, and writes you a Sunday review for the price of a sandwich." } },
        { "@type": "Question", name: "What if I miss a week?", acceptedAnswer: { "@type": "Answer", text: "The program reshapes. No streak to break. The next session reads your last entries and the cycle adjusts." } },
        { "@type": "Question", name: "Is this for women too?", acceptedAnswer: { "@type": "Answer", text: "Yes. The programming engine cares about your starting strength, recovery, and goals — not your sex." } },
        { "@type": "Question", name: "When does it launch?", acceptedAnswer: { "@type": "Answer", text: "When the first 100 founders sign up. The founder lifetime price is the launch threshold." } },
        { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Monthly and annual cancel any time. Founder is one payment, yours forever." } },
      ],
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
