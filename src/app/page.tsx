"use client";

import "./v3-home.css";
import Link from "next/link";
import { BrandName, BrandWordmark } from "@/components/wordmark";
import { useEffect, useRef } from "react";

const MOVES = [
  { num: "01 · Plan",    title: "A plan that fits you, today.",    body: "Tell us your goal — cutting, bulking, just stronger — and the app builds your week. Adjusts as life happens." },
  { num: "02 · Train",   title: "Track every set, fast.",          body: "Big buttons, big numbers. Logs sets in seconds. Knows your last lift, your PR, your bar speed." },
  { num: "03 · Coach",   title: "An AI in your corner.",           body: "Asks if a set felt easy. Suggests alternates when the rack is busy. Pushes you when you're flat." },
  { num: "04 · Eat",     title: "Calories that just work.",        body: "Search any food in two taps. Macros land in your daily ring. Cutting or bulking — targets adapt." },
  { num: "05 · Recover", title: "Earn your rest days.",            body: "Body readiness scoring per muscle. Banked rest days for streaks. No more guilt-skipping leg day." },
];

const TICKER_GROUP = [
  { value: "3,420",      label: "sets logged today" },
  { value: "14",         label: "PRs in the last hour" },
  { value: "2,180 kcal", label: "today's calorie target" },
  { value: "97%",        label: "plan adherence this week" },
  { value: "2.4s",       label: "avg coach response" },
];

const FAQS: Array<[string, React.ReactNode]> = [
  ["Do I need a gym, or does this work at home?",
    <><strong>Both.</strong> Tell <BrandName /> what equipment you've got — full commercial gym, garage with a rack and dumbbells, or just a resistance band — and the plan adapts. Same app, no separate "home" mode. Travel for a week? Switch your equipment and the plan rebuilds in a tap.</>],
  ["Is the AI coach actually useful, or is it gimmicky?",
    <>It reads <strong>your</strong> last 30 days — sets, reps, weights, calories, sleep, readiness — before it says a word. So when it tells you to drop the weight on set 4, it's because your bar speed is down 18% and you're under-recovered. Not because of a generic rule.</>],
  ["How is this different from MyFitnessPal + Hevy?",
    <>Two apps that don't talk to each other vs. one that does. <BrandName /> sees that you're cutting, that you ate 2,180 kcal yesterday, that today is push day, and that your shoulder is at 78% readiness — and shapes the session accordingly. That's the whole pitch.</>],
  ["Will it import my Strong / Hevy / spreadsheet history?",
    <>Yes. CSV import on day one for all the major trackers. Your PRs come with you so the coach knows where you've been before it tells you where to go.</>],
  ["What happens if I cancel?",
    <>You keep your data forever — export to CSV any time, including after you cancel. The app drops to a read-only free tier so your history doesn't disappear. We don't hold your sets hostage.</>],
  ["When does the iOS app land?",
    <>TestFlight in <strong>summer 2026</strong>, public App Store shortly after. Founder members get first access. The web app works on phone today — install it to your home screen and you've got a PWA.</>],
];

export default function Home() {
  return (
    <div className="v3-root">
      <SiteNav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Moves />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
      <PageSchema />
    </div>
  );
}

function SiteNav() {
  const navRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    // Keep the animated white wordmark on the dark glass nav.
    nav.classList.add("on-dark");
  }, []);
  return (
    <nav className="nav3 on-dark" ref={navRef} aria-label="Primary">
      <Link href="#top" className="nav3__brand">
        <BrandWordmark size="md" />
      </Link>
      <a href="#why" className="nav3__link">Why</a>
      <a href="#how" className="nav3__link">How it works</a>
      <a href="#pricing" className="nav3__link">Pricing</a>
      <a href="#faq" className="nav3__link">FAQ</a>
      <Link href="/onboarding" className="nav3__cta">Start free →</Link>
    </nav>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    if (!hero || !cursor) return;
    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
    };
    hero.addEventListener("pointermove", onMove);
    return () => { hero.removeEventListener("pointermove", onMove); };
  }, []);
  return (
    <section className="hero3" id="hero3" ref={heroRef}>
      <div className="hero3__grid" aria-hidden />
      <div className="hero3__aurora hero3__aurora--key" aria-hidden />
      <div className="hero3__aurora hero3__aurora--rim" aria-hidden />
      <div className="hero3__aurora hero3__aurora--base" aria-hidden />
      <div className="hero3__vignette" aria-hidden />
      <div className="hero3__edge" aria-hidden />
      <div className="hero3__cursor" ref={cursorRef} aria-hidden />

      <div className="container" id="top">
        <div className="hero3__eyebrow">
          <span className="hero3__eyebrow-rule" />
          <span className="hero3__eyebrow-dot" />
          <span className="hero3__eyebrow-text">Now in founder access · 500 places</span>
          <span className="hero3__eyebrow-rule r" />
        </div>

        <div className="hero3__wordmark">
          <h1>
            <Word text="Train" baseDelay={0.4} />{" "}
            <Word text="with" baseDelay={0.74} />{" "}
            <Word text="devotion" baseDelay={1.06} className="word--devotion" />
            <span className="hero3__period">.</span>
          </h1>
        </div>

        <p className="hero3__sub">
          Your <strong>plan</strong>, your <strong>numbers</strong>, your <strong>coach</strong>. One app
          that knows where you train, what you've eaten, and what your body's ready for — every single day.
        </p>

        <div className="hero3__ctas">
          <Link href="/onboarding" className="btn3 btn3--accent">Start free →</Link>
          <a href="#how" className="btn3 btn3--ghost-dark">See how it works</a>
        </div>

        <HeroStage />
      </div>
    </section>
  );
}

function Word({ text, baseDelay, className = "" }: { text: string; baseDelay: number; className?: string }) {
  return (
    <span className={`word ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={i} className="letter" style={{ animationDelay: `${baseDelay + i * 0.06}s` }}>{ch}</span>
      ))}
    </span>
  );
}

function HeroStage() {
  return (
    <div className="hero3__stage">
      <Orbit position="pr" label="New PR" value="Bench · 92.5 kg" sub="+2.5 kg vs last week" />
      <Orbit position="hr" label="Heart rate" value="142 bpm" sub="Zone 3 · steady" green />
      <Orbit position="volume" label="Volume today" value="14,820 kg" sub="Push day · chest + tris" />
      <Orbit position="coach" label="AI Coach" value="Easier set 4?" sub="Bar speed dropped 18%" />

      <div className="phone3">
        <div className="phone3__notch" />
        <div className="phone3__screen">
          <div className="wo3">
            <div className="wo3__time">9:42 AM</div>
            <div className="wo3__status">
              <span className="wo3__status-dot" />
              <span className="wo3__status-text">Workout · Push day</span>
            </div>
            <div className="wo3__exercise">
              <div className="wo3__exercise-name">Barbell Bench Press</div>
              <div className="wo3__exercise-meta">Set 3 of 4 · last: 90 kg × 6</div>
            </div>
            <div className="wo3__set-board">
              <SetRow n="1" weight="85" reps="8" done />
              <SetRow n="2" weight="90" reps="7" done />
              <SetRow n="3" weight="92.5" reps="—" active />
              <SetRow n="4" weight="—" reps="—" />
            </div>
            <div className="wo3__rest">
              <div>
                <div className="wo3__rest-label">Resting</div>
                <div className="wo3__rest-sub">Next: set 3</div>
              </div>
              <div className="wo3__rest-value">1:42</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Orbit({ position, label, value, sub, green }: { position: "pr"|"hr"|"volume"|"coach"; label: string; value: string; sub: string; green?: boolean }) {
  return (
    <div className={`orbit3 orbit3--${position}`}>
      <span className="orbit3__label">{label}</span>
      <span className="orbit3__value">{value}</span>
      <div className="orbit3__row">
        <span className={`orbit3__swatch ${green ? "orbit3__swatch--green" : ""}`} />
        <span className="orbit3__sub">{sub}</span>
      </div>
    </div>
  );
}

function SetRow({ n, weight, reps, done, active }: { n: string; weight: string; reps: string; done?: boolean; active?: boolean }) {
  const isPending = !done && !active;
  return (
    <div className={`wo3__set-row ${active ? "active" : ""}`} style={isPending ? { opacity: 0.5 } : undefined}>
      <span className="wo3__set-num" style={active ? { color: "var(--violet-2)" } : undefined}>{n}</span>
      <span className="wo3__set-val">{weight}<span> kg</span></span>
      <span className="wo3__set-val">{reps}<span> reps</span></span>
      <span className={`wo3__set-check ${!done ? "wo3__set-check--off" : ""}`}>{done ? "✓" : ""}</span>
    </div>
  );
}

function Ticker() {
  const items = [...TICKER_GROUP, ...TICKER_GROUP];
  return (
    <div className="ticker3">
      <div className="ticker3__inner">
        {items.map((item, i) => (
          <div key={i} style={{ display: "contents" }}>
            <span className="ticker3__item">
              {i % TICKER_GROUP.length === 0 ? <span className="ticker3__dot" /> : null}
              <strong>{item.value}</strong> {item.label}
            </span>
            <span className="ticker3__sep">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="section3 section3--dark" id="why">
      <div className="container">
        <div className="grid-2-end">
          <div>
            <span className="eyebrow3 eyebrow3--violet">The honest problem</span>
            <h2 className="h3-1" style={{ marginTop: 16 }}>Most people quit by <em className="accent3">week 6</em>.</h2>
            <p className="body3-lg" style={{ marginTop: 18 }}>
              Generic plans, stale spreadsheets, and three apps that don't talk to each other. We built
              <BrandName /> because the gap between knowing what to do and actually doing it is where every
              fitness journey dies.
            </p>
          </div>
          <div className="stat3 stat3--dark">
            <div className="stat3__label">UK gym dropout</div>
            <div className="stat3__big">73%</div>
            <div className="stat3__sub">Quit within 6 months of joining.</div>
            <div className="stat3__bar"><div className="stat3__bar-fill" /></div>
            <div className="stat3__breakdown">
              <div>
                <div className="stat3__cell-value">£480</div>
                <div className="stat3__cell-label">Wasted / yr</div>
              </div>
              <div>
                <div className="stat3__cell-value">3 apps</div>
                <div className="stat3__cell-label">Avg juggled</div>
              </div>
              <div>
                <div className="stat3__cell-value">5 min</div>
                <div className="stat3__cell-label">To log a meal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Moves() {
  return (
    <section className="moves3" id="how">
      <div className="moves3__intro">
        <span className="moves3__kicker">How it works</span>
        <h2 className="moves3__title">Five things, <em>one app</em>.</h2>
        <p className="moves3__sub">
          Plan, train, eat, recover, repeat. <BrandName /> handles the loop so you can focus on showing up.
        </p>
      </div>
      <ul className="moves3__list">
        {MOVES.map((move) => (
          <li key={move.num} className="move3">
            <span className="move3__num">{move.num}</span>
            <h3 className="move3__title">{move.title}</h3>
            <p className="move3__body">{move.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section3 section3--cream" id="pricing">
      <div className="container">
        <div className="pricing3__intro">
          <span className="eyebrow3 eyebrow3--violet">Simple pricing</span>
          <h2 className="h3-2" style={{ marginTop: 14 }}>Pay less than your gym membership.</h2>
          <p className="body3-lg" style={{ marginTop: 16, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Start free. Upgrade when you want the AI coach, smart plans, and unlimited everything.
          </p>
        </div>
        <div className="pricing3__grid">
          <div className="pricing3__card">
            <div className="pricing3__card-title">Monthly</div>
            <div className="pricing3__card-tag">Cancel anytime</div>
            <div>
              <span className="pricing3__card-big">£6.99</span>
              <span className="pricing3__card-cadence">/month</span>
            </div>
            <ul className="pricing3__card-list">
              <li>Unlimited workouts &amp; routines</li>
              <li>Calorie + macro tracking</li>
              <li>AI coach (chat + mid-set)</li>
              <li>Sync across devices</li>
            </ul>
            <Link href="/onboarding" className="btn3 btn3--ghost">Start free trial</Link>
          </div>

          <div className="pricing3__card pricing3__card--featured">
            <div className="pricing3__card-title">Annual</div>
            <div className="pricing3__card-tag">Save £35 vs monthly</div>
            <div>
              <span className="pricing3__card-big">£49</span>
              <span className="pricing3__card-cadence">/year</span>
            </div>
            <ul className="pricing3__card-list">
              <li>Everything in Monthly</li>
              <li>AI plan generator</li>
              <li>Goal phases (cut / bulk / maintain)</li>
              <li>Priority coach response</li>
            </ul>
            <Link href="/onboarding" className="btn3 btn3--accent">Get annual</Link>
          </div>

          <div className="pricing3__card">
            <div className="pricing3__card-title">Founder</div>
            <div className="pricing3__card-tag">One-time, lifetime</div>
            <div>
              <span className="pricing3__card-big">£75</span>
              <span className="pricing3__card-cadence">once</span>
            </div>
            <ul className="pricing3__card-list">
              <li>Lifetime access, every feature</li>
              <li>Direct line to the founders</li>
              <li>Vote on the roadmap</li>
              <li>Limited to first 500 members</li>
            </ul>
            <Link href="/onboarding" className="btn3 btn3--primary">Become a founder</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section3 section3--dark faq3" id="faq">
      <div className="container">
        <div className="faq3__intro">
          <span className="eyebrow3 eyebrow3--violet">Frequently asked</span>
          <h2 className="faq3__title">The honest questions.</h2>
          <p className="faq3__sub">No marketing dance. Quick answers to the things people actually ask before they sign up.</p>
        </div>
        <div className="faq3__list">
          {FAQS.map(([q, a], i) => (
            <details className="faq3__row" key={i} open={i === 0}>
              <summary>
                <span>{q}</span>
                <span className="faq3__plus" aria-hidden>+</span>
              </summary>
              <div className="faq3__answer">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta3 cta-stage" id="cta">
      <div className="container">
        <h2>Train with <BrandWordmark size="xl" className="cta3__brand-logo" />.</h2>
        <p>Start free. No credit card. Your first AI-built plan in 90 seconds.</p>
        <div className="cta3__row cta-stage__row">
          <Link href="/onboarding" className="btn3 btn3--accent">Start free →</Link>
          <Link href="/onboarding" className="btn3 btn3--ghost-dark">Become a founder · £75</Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="foot3">
      <div className="container">
        <div className="foot3__grid">
          <div>
            <div className="foot3__brand">
              <BrandWordmark size="lg" />
            </div>
            <p className="foot3__tag">Train with <BrandName />. The plan, the numbers, the coach — one app that gets you to the next session.</p>
          </div>
          <div className="foot3__col">
            <h4>Product</h4>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <Link href="/onboarding">Get started</Link>
            <a href="#faq">FAQ</a>
          </div>
          <div className="foot3__col">
            <h4>App</h4>
            <Link href="/today">Today</Link>
            <Link href="/review">Review</Link>
            <Link href="/onboarding">Onboarding</Link>
          </div>
          <div className="foot3__col">
            <h4>Legal</h4>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="mailto:contact@devotion.team">Contact</a>
          </div>
        </div>
        <div className="foot3__bot">
          <span>© 2026 DEVOTION STUDIO LTD</span>
          <span>devotion.fitness · Made in the UK</span>
        </div>
      </div>
    </footer>
  );
}

function PageSchema() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Devotion",
      url: "https://devotion.fitness",
      slogan: "Train with devotion.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Devotion",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS, Android",
      offers: [
        { "@type": "Offer", name: "Monthly", price: "6.99", priceCurrency: "GBP" },
        { "@type": "Offer", name: "Annual",  price: "49.00", priceCurrency: "GBP" },
        { "@type": "Offer", name: "Founder", price: "75.00", priceCurrency: "GBP" },
      ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
