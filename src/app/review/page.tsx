"use client";

import "./v3-review.css";
import Link from "next/link";
import { BrandName, BrandWordmark } from "@/components/wordmark";
import { useEffect, useRef } from "react";

type LedgerState = "done" | "rest" | "missed";

type LedgerRow = {
  d: string;
  state: LedgerState;
  label: string;
};

type Lift = {
  name: string;
  pr: string;
  hold?: boolean;
  big: string;
  unit: string;
  bigAccent?: boolean;
  delta: React.ReactNode;
  bar: number; // percent fill 0-100
};

type FocusItem = {
  num: string;
  title: string;
  body: string;
};

const WEEK: LedgerRow[] = [
  { d: "Mon", state: "done",   label: "Press & pull" },
  { d: "Tue", state: "rest",   label: "Rest" },
  { d: "Wed", state: "done",   label: "Lower" },
  { d: "Thu", state: "rest",   label: "Rest" },
  { d: "Fri", state: "missed", label: "Lower (missed)" },
  { d: "Sat", state: "done",   label: "Conditioning" },
  { d: "Sun", state: "rest",   label: "Rest · review day" },
];

const LIFTS: Lift[] = [
  {
    name: "Barbell Bench Press",
    pr: "+PR",
    big: "92.5",
    unit: "kg",
    bigAccent: true,
    delta: <><strong>+5 kg</strong> over two weeks &middot; top set 92.5 &times; 6</>,
    bar: 88,
  },
  {
    name: "Back Squat",
    pr: "Hold",
    hold: true,
    big: "120",
    unit: "kg",
    delta: <>Same as last week &middot; skipped one set on Friday</>,
    bar: 60,
  },
  {
    name: "Pull-up",
    pr: "+1",
    big: "11",
    unit: "reps",
    bigAccent: true,
    delta: <><strong>+1 rep</strong> &middot; bodyweight set, clean</>,
    bar: 72,
  },
];

const FOCUS_ITEMS: FocusItem[] = [
  {
    num: "01",
    title: "Move legs to Tuesday",
    body: "You start strong and fade by Friday. Tuesday gives the day its energy back.",
  },
  {
    num: "02",
    title: "Bank the bench progression",
    body: "Hold 92.5 × 6 for one more session before adding weight. Owning a number is half the lift.",
  },
  {
    num: "03",
    title: "One conditioning slot, kept",
    body: "Saturday worked. Same shape — 25 minutes, easy zone — and we lock the loop.",
  },
];

export default function Review() {
  return (
    <div className="v3-root">
      <div className="bg-atmosphere" aria-hidden />
      <div className="bg-grid" aria-hidden />

      <SiteNav />

      <main>
        <Stage />
        <DarkBody />
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  return (
    <nav className="nav3" aria-label="Primary">
      <Link href="/" className="nav3__brand">
        <BrandWordmark size="md" />
      </Link>
      <Link href="/today" className="nav3__link">Today</Link>
      <Link href="/review" className="nav3__link nav3__link--active">Review</Link>
      <Link href="/onboarding" className="nav3__link">Plan</Link>
      <Link href="/today" className="nav3__cta">Begin week 7 &rarr;</Link>
    </nav>
  );
}

function Stage() {
  const stageRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor) return;
    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.transform = `translate3d(${x - 210}px, ${y - 210}px, 0)`;
    };
    stage.addEventListener("pointermove", onMove);
    return () => { stage.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <section className="stage" ref={stageRef}>
      <div className="stage__aurora stage__aurora--key" aria-hidden />
      <div className="stage__aurora stage__aurora--rim" aria-hidden />
      <div className="stage__cursor" ref={cursorRef} aria-hidden />

      <div className="container">
        <div className="stage__eyebrow">
          <span className="stage__eyebrow-rule" />
          <span className="stage__eyebrow-dot" />
          <span className="stage__eyebrow-text">Sunday review &middot; Week six</span>
          <span className="stage__eyebrow-rule r" />
        </div>

        <h1 className="stage__title">
          Three of four. <em>Bench up 5 kg<span className="stage__period">.</span></em>
        </h1>

        <p className="stage__sub">
          A quiet week with one slip. Same shape as last Friday &mdash; and the data finally tells us why.
          {" "}<strong>Scroll for the verdict.</strong>
        </p>

        <div className="scoreboard">
          <div className="score score--accent">
            <div className="score__label">Completed</div>
            <p className="score__big">75<span className="score__big-suffix">%</span></p>
            <div className="score__sub"><strong>3 of 4</strong> sessions</div>
          </div>
          <div className="score">
            <div className="score__label">Volume</div>
            <p className="score__big">42,800</p>
            <div className="score__sub">kg &middot; <strong>+8%</strong> vs prev</div>
          </div>
          <div className="score">
            <div className="score__label">Top lift</div>
            <p className="score__big score__big--word">Bench</p>
            <div className="score__sub"><strong>&uarr; 5 kg</strong> in two weeks</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkBody() {
  // Reveal-on-scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: just show everything
      document.querySelectorAll(".v3-root .reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".v3-root .reveal").forEach((el) => io.observe(el));
    return () => { io.disconnect(); };
  }, []);

  return (
    <section className="body-dark">
      <div className="container--narrow">

        {/* Week ledger */}
        <div className="ledger reveal">
          <div className="ledger__head">
            <div>
              <span className="eyebrow"><span className="eyebrow__rule" />The week, day by day</span>
              <h2 className="h-2 ledger__head-title">What actually happened.</h2>
            </div>
            <span className="ledger__meta">7 days &middot; May 4 &mdash; May 10</span>
          </div>

          <div className="ledger__card">
            {WEEK.map((row) => (
              <div className="ledger__row" key={row.d}>
                <span className="ledger__day">{row.d}</span>
                <span className={`ledger__label ${
                  row.state === "missed"
                    ? "ledger__label--missed"
                    : row.state === "rest"
                    ? "ledger__label--muted"
                    : ""
                }`}>{row.label}</span>
                <span className={`ledger__tag ${
                  row.state === "done"
                    ? "ledger__tag--done"
                    : row.state === "missed"
                    ? "ledger__tag--missed"
                    : ""
                }`}>
                  {row.state === "done" ? "Done" : row.state === "missed" ? "Skipped" : "Rest"}
                </span>
                <span className={`ledger__mark ledger__mark--${row.state}`} aria-label={row.state} />
              </div>
            ))}
          </div>
        </div>

        {/* Honest verdict — dark glass focal moment */}
        <div className="verdict reveal">
          <div className="verdict__card">
            <span className="verdict__top-rule" />
            <span className="verdict__eyebrow">
              <span className="verdict__eyebrow-rule" />
              <span className="verdict__eyebrow-dot" />
              Honest verdict
            </span>
            <p className="verdict__quote">
              Three of four sessions in. Friday&apos;s leg day was the one that slipped &mdash;{" "}
              <em>same as last week</em>. Bench is up 5 kg in two weeks;{" "}
              <strong>that&apos;s the win you should bank.</strong> Next week we move legs to Tuesday &mdash;
              the data shows you start strong and fade by Friday.
            </p>
            <div className="verdict__sig">
              <span className="verdict__sig-mark" />
              <span className="verdict__sig-text">
                <strong><BrandName /> Coach</strong> &middot; written from your week six data, May 10
              </span>
            </div>
          </div>
        </div>

        {/* Lifts that moved */}
        <div className="lifts reveal">
          <div className="lifts__head">
            <div>
              <span className="eyebrow"><span className="eyebrow__rule" />Lifts that moved</span>
              <h2 className="h-2 lifts__head-title">Where the needle went.</h2>
            </div>
          </div>
          <div className="lifts__grid">
            {LIFTS.map((lift) => (
              <div className="lift" key={lift.name}>
                <div className="lift__head">
                  <span className="lift__name">{lift.name}</span>
                  <span className={`lift__pr ${lift.hold ? "lift__pr--hold" : ""}`}>{lift.pr}</span>
                </div>
                <p className={`lift__big ${lift.bigAccent ? "lift__big-accent" : ""}`}>
                  {lift.big}<span>{lift.unit}</span>
                </p>
                <div className="lift__delta">{lift.delta}</div>
                <div className="lift__bar">
                  <div className="lift__bar-fill" style={{ width: `${lift.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next week's focus */}
        <div className="focus reveal">
          <div>
            <span className="eyebrow"><span className="eyebrow__rule" />Next week&apos;s focus</span>
            <h3 className="focus__heading">
              Lower-body consistency is the <em>unlock</em>.
            </h3>
          </div>
          <div>
            <p className="focus__body">
              Same volume, just earlier in the week. Three small adjustments and we keep the bench
              momentum going.
            </p>
            <ul className="focus__list">
              {FOCUS_ITEMS.map((item) => (
                <li className="focus__item" key={item.num}>
                  <span className="focus__num">{item.num}</span>
                  <div>
                    <p className="focus__item-title">{item.title}</p>
                    <p className="focus__item-body">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="cta reveal">
          <h2 className="cta__title">Ready for <em>week seven</em>?</h2>
          <p className="cta__sub">
            Your plan&apos;s already updated &mdash; Tuesday is leg day, bench holds at 92.5.
            Open it when you&apos;re set.
          </p>
          <div className="cta__row">
            <Link className="btn3 btn3--accent" href="/today">Begin the new week &rarr;</Link>
            <Link className="btn3 btn3--ghost-dark" href="/onboarding">Tweak the plan</Link>
          </div>
        </div>

      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__inner">
          <div className="foot__brand">
            <BrandWordmark size="lg" />
          </div>
          <div className="foot__links">
            <Link href="/today">Today</Link>
            <Link href="/review">Review</Link>
            <Link href="/onboarding">Plan</Link>
            <Link href="/">Home</Link>
          </div>
        </div>
        <div className="foot__bot">
          <span>&copy; 2026 DEVOTION STUDIO LTD</span>
          <span>Sunday review &middot; Week six &middot; May 10, 2026</span>
        </div>
      </div>
    </footer>
  );
}
