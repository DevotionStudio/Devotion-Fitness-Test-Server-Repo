"use client";

import "./v3-onboarding.css";
import Link from "next/link";
import { BrandName, BrandWordmark } from "@/components/wordmark";
import { useEffect, useRef, useState } from "react";

/* ─── Types ─── */
type Goal = "strength" | "muscle" | "fat-loss" | "endurance" | "health";
type Level = "beginner" | "intermediate" | "advanced";
type Equipment = "gym" | "home-gym" | "dumbbells" | "minimal" | "bodyweight";
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type HeightUnit = "cm" | "ft";
type WeightUnit = "kg" | "lb";

const STORAGE_KEY = "devotion:onboarding:v3";

/* ─── Step content ─── */
const GOALS: { id: Goal; title: string; sub: string }[] = [
  { id: "strength", title: "Get stronger", sub: "Heavier lifts, lower reps. Built around the big four." },
  { id: "muscle", title: "Build muscle", sub: "Hypertrophy focus. Volume in the 8–12 zone." },
  { id: "fat-loss", title: "Lose fat", sub: "Lean down, keep the muscle. Calories in, conditioning up." },
  { id: "endurance", title: "Build endurance", sub: "Stamina + conditioning. Mixed energy systems." },
  { id: "health", title: "Stay healthy", sub: "Move well, feel good. The everything-in-moderation plan." },
];

const LEVELS: { id: Level; title: string; sub: string }[] = [
  { id: "beginner", title: "New to this", sub: "Less than 6 months training. Light loads, slow ramp." },
  { id: "intermediate", title: "Been at it a while", sub: "6 months to 2 years. Know the basics, want a real plan." },
  { id: "advanced", title: "Experienced", sub: "2+ years, know my numbers. Ready for periodisation." },
];

const EQUIPMENT: { id: Equipment; title: string; sub: string }[] = [
  { id: "gym", title: "Full gym", sub: "Racks, machines, the lot. Maximum exercise pool." },
  { id: "home-gym", title: "Home gym", sub: "Rack and barbell. Big-lift focused programming." },
  { id: "dumbbells", title: "Dumbbells", sub: "Adjustable or fixed pair. Surprisingly versatile." },
  { id: "minimal", title: "Bands & kettlebell", sub: "Travel-friendly. Tension-based progressions." },
  { id: "bodyweight", title: "Bodyweight only", sub: "No equipment needed. Skill-progression plan." },
];

const DAY_LETTERS: { d: Day; short: string; full: string }[] = [
  { d: 1, short: "M", full: "Mon" },
  { d: 2, short: "T", full: "Tue" },
  { d: 3, short: "W", full: "Wed" },
  { d: 4, short: "T", full: "Thu" },
  { d: 5, short: "F", full: "Fri" },
  { d: 6, short: "S", full: "Sat" },
  { d: 0, short: "S", full: "Sun" },
];

const STEP_NAMES = ["Goal", "Experience", "You", "Cadence", "Tools", "Plan"];
const TOTAL_STEPS = 6;

export default function OnboardingPage() {
  /* ─── State (with persistence) ─── */
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);

  // Body — stored in metric (cm / kg) regardless of input unit
  const [age, setAge] = useState<string>("");
  const [heightCmInput, setHeightCmInput] = useState<string>("");
  const [heightFt, setHeightFt] = useState<string>("");
  const [heightIn, setHeightIn] = useState<string>("");
  const [weightInput, setWeightInput] = useState<string>("");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  // Cadence
  const [trainDays, setTrainDays] = useState<Set<Day>>(new Set<Day>([2, 4, 5]));
  const [sessionLength, setSessionLength] = useState<number>(45);

  // Equipment
  const [equipment, setEquipment] = useState<Set<Equipment>>(new Set<Equipment>(["gym"]));

  const [hydrated, setHydrated] = useState(false);

  /* ─── Hydration: load persisted state ─── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.goal) setGoal(s.goal);
        if (s.level) setLevel(s.level);
        if (typeof s.age === "string") setAge(s.age);
        if (typeof s.heightCmInput === "string") setHeightCmInput(s.heightCmInput);
        if (typeof s.heightFt === "string") setHeightFt(s.heightFt);
        if (typeof s.heightIn === "string") setHeightIn(s.heightIn);
        if (typeof s.weightInput === "string") setWeightInput(s.weightInput);
        if (s.heightUnit === "ft" || s.heightUnit === "cm") setHeightUnit(s.heightUnit);
        if (s.weightUnit === "lb" || s.weightUnit === "kg") setWeightUnit(s.weightUnit);
        if (Array.isArray(s.trainDays)) setTrainDays(new Set<Day>(s.trainDays as Day[]));
        if (typeof s.sessionLength === "number") setSessionLength(s.sessionLength);
        if (Array.isArray(s.equipment)) setEquipment(new Set<Equipment>(s.equipment as Equipment[]));
        if (typeof s.step === "number") setStep(Math.min(Math.max(s.step, 0), TOTAL_STEPS - 1));
      }
    } catch {
      /* ignore — first visit or unparseable */
    }
    setHydrated(true);
  }, []);

  /* ─── Persistence: save on change ─── */
  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload = {
        step,
        goal,
        level,
        age,
        heightCmInput,
        heightFt,
        heightIn,
        weightInput,
        heightUnit,
        weightUnit,
        trainDays: Array.from(trainDays),
        sessionLength,
        equipment: Array.from(equipment),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage may be unavailable */
    }
  }, [
    hydrated,
    step,
    goal,
    level,
    age,
    heightCmInput,
    heightFt,
    heightIn,
    weightInput,
    heightUnit,
    weightUnit,
    trainDays,
    sessionLength,
    equipment,
  ]);

  /* ─── Navigation ─── */
  const next = () => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pickGoal = (g: Goal) => {
    setGoal(g);
    window.setTimeout(next, 200);
  };
  const pickLevel = (l: Level) => {
    setLevel(l);
    window.setTimeout(next, 200);
  };
  const toggleDay = (d: Day) => {
    setTrainDays((prev) => {
      const n = new Set(prev);
      if (n.has(d)) n.delete(d);
      else n.add(d);
      return n;
    });
  };
  const toggleEquip = (id: Equipment) => {
    setEquipment((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  /* ─── Cursor follow on hero + steps ─── */
  const heroRef = useRef<HTMLElement | null>(null);
  const heroCursorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const hero = heroRef.current;
    const cursor = heroCursorRef.current;
    if (!hero || !cursor) return;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cursor.style.transform = `translate3d(${x - 190}px, ${y - 190}px, 0)`;
    };
    hero.addEventListener("pointermove", onMove);
    return () => hero.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="v3-root">
      {/* Global atmosphere */}
      <div className="atmos" aria-hidden>
        <div className="atmos__grid" />
        <div className="atmos__layer atmos__layer--a" />
        <div className="atmos__layer atmos__layer--b" />
        <div className="atmos__layer atmos__layer--c" />
      </div>

      <SiteNav />

      {/* ─── HERO HEADER ─── */}
      <section className="ob-hero" ref={heroRef}>
        <div className="ob-hero__aurora ob-hero__aurora--key" aria-hidden />
        <div className="ob-hero__aurora ob-hero__aurora--rim" aria-hidden />
        <div className="ob-hero__cursor" ref={heroCursorRef} aria-hidden />

        <div className="container">
          <div className="ob-hero__inner">
            <div className="ob-eyebrow">
              <span className="ob-eyebrow__rule" />
              <span className="ob-eyebrow__dot" />
              <span>Onboarding · 6 quick steps</span>
              <span className="ob-eyebrow__rule r" />
            </div>
            <h1 className="ob-hero__title">
              Let&apos;s build <em>your</em> plan.
            </h1>
            <p className="ob-hero__sub">
              Six honest answers, two minutes, and you&apos;re training. No spreadsheets, no guesswork — the plan
              adapts as life does.
            </p>
          </div>

          <div className="ob-progress">
            <div className="ob-progress__track">
              <div className="ob-progress__fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="ob-progress__steps">
              {STEP_NAMES.map((name, i) => (
                <span
                  key={name}
                  className={`ob-progress__step ${
                    i === step ? "current" : i < step ? "done" : ""
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} · {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STEP 01 · GOAL ─── */}
      {step === 0 && (
        <Step variant="b">
          <StepHead
            num="01"
            kicker="Goal"
            titleHtml={
              <>
                What do you want from the next <em>twelve weeks</em>?
              </>
            }
            sub="Pick one. The plan is shaped around it — sets, reps, conditioning, even the way the coach talks."
          />
          <div className="tile-grid">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`tile ${goal === g.id ? "is-on" : ""}`}
                onClick={() => pickGoal(g.id)}
              >
                <span className="tile__radio" />
                <span className="tile__body">
                  <div className="tile__title">{g.title}</div>
                  <div className="tile__sub">{g.sub}</div>
                </span>
                <span className="tile__arrow">→</span>
              </button>
            ))}
          </div>
          <StepNav
            hint="Tap a goal — we'll continue automatically"
            onContinue={next}
            disabled={!goal}
          />
        </Step>
      )}

      {step === 1 && <Divider label="Step 02" />}

      {/* ─── STEP 02 · EXPERIENCE ─── */}
      {step === 1 && (
        <Step variant="a">
          <StepHead
            num="02"
            kicker="Experience"
            titleHtml="How long have you trained?"
            sub="Honesty calibrates everything that follows. Pick the closest match — the plan adjusts inside a week if it's wrong."
          />
          <div className="tile-grid">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`tile ${level === l.id ? "is-on" : ""}`}
                onClick={() => pickLevel(l.id)}
              >
                <span className="tile__radio" />
                <span className="tile__body">
                  <div className="tile__title">{l.title}</div>
                  <div className="tile__sub">{l.sub}</div>
                </span>
                <span className="tile__arrow">→</span>
              </button>
            ))}
          </div>
          <StepNav onBack={back} onContinue={next} disabled={!level} />
        </Step>
      )}

      {step === 2 && <Divider label="Step 03" />}

      {/* ─── STEP 03 · YOU (mobile-app per-field unit pattern) ─── */}
      {step === 2 && (
        <Step variant="c">
          <StepHead
            num="03"
            kicker="You"
            titleHtml={
              <>
                A few <em>honest</em> numbers.
              </>
            }
            sub="Used to scale loads, calorie targets, and conditioning intensity. Skip whatever you don't feel like sharing."
          />

          <div className="field-stack" style={{ maxWidth: 720 }}>
            {/* Age */}
            <div className="field">
              <div className="field__head">
                <span className="field__label">Age</span>
                <span className="field__range">years</span>
              </div>
              <div className="field-input-row">
                <input
                  type="number"
                  inputMode="numeric"
                  className="field-input"
                  placeholder="28"
                  min={14}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(sanitizeNumeric(e.target.value, 3))}
                  aria-label="Age in years"
                />
                <span className="field-suffix">years</span>
              </div>
            </div>

            {/* Height — per-field unit toggle (cm / ft) */}
            <div className="field">
              <div className="field__head">
                <span className="field__label">Height</span>
                <span className="field__range">{heightUnit === "cm" ? "centimetres" : "feet & inches"}</span>
              </div>
              <div className="field-input-row">
                {heightUnit === "cm" ? (
                  <>
                    <input
                      type="number"
                      inputMode="numeric"
                      className="field-input"
                      placeholder="175"
                      min={100}
                      max={250}
                      value={heightCmInput}
                      onChange={(e) => setHeightCmInput(sanitizeNumeric(e.target.value, 3))}
                      aria-label="Height in centimetres"
                    />
                    <span className="field-suffix">cm</span>
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      inputMode="numeric"
                      className="field-input field-input--narrow"
                      placeholder="5"
                      min={3}
                      max={8}
                      value={heightFt}
                      onChange={(e) => setHeightFt(sanitizeNumeric(e.target.value, 1))}
                      aria-label="Height feet"
                    />
                    <span className="field-suffix">ft</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      className="field-input field-input--narrow"
                      placeholder="10"
                      min={0}
                      max={11}
                      value={heightIn}
                      onChange={(e) => setHeightIn(sanitizeNumeric(e.target.value, 2))}
                      aria-label="Height inches"
                    />
                    <span className="field-suffix">in</span>
                  </>
                )}
                <div className="unit-toggle" role="tablist" aria-label="Height unit">
                  <button
                    type="button"
                    className={heightUnit === "cm" ? "on" : ""}
                    onClick={() => {
                      setHeightUnit("cm");
                      setHeightFt("");
                      setHeightIn("");
                    }}
                    aria-pressed={heightUnit === "cm"}
                  >
                    cm
                  </button>
                  <button
                    type="button"
                    className={heightUnit === "ft" ? "on" : ""}
                    onClick={() => {
                      setHeightUnit("ft");
                      setHeightCmInput("");
                    }}
                    aria-pressed={heightUnit === "ft"}
                  >
                    ft
                  </button>
                </div>
              </div>
            </div>

            {/* Weight — per-field unit toggle (kg / lb) */}
            <div className="field">
              <div className="field__head">
                <span className="field__label">Weight</span>
                <span className="field__range">{weightUnit === "kg" ? "kilograms" : "pounds"}</span>
              </div>
              <div className="field-input-row">
                <input
                  type="number"
                  inputMode="decimal"
                  className="field-input"
                  placeholder={weightUnit === "kg" ? "75" : "165"}
                  min={weightUnit === "kg" ? 30 : 65}
                  max={weightUnit === "kg" ? 220 : 485}
                  value={weightInput}
                  onChange={(e) => setWeightInput(sanitizeNumeric(e.target.value, 5, true))}
                  aria-label={`Weight in ${weightUnit === "kg" ? "kilograms" : "pounds"}`}
                />
                <span className="field-suffix">{weightUnit}</span>
                <div className="unit-toggle" role="tablist" aria-label="Weight unit">
                  <button
                    type="button"
                    className={weightUnit === "kg" ? "on" : ""}
                    onClick={() => {
                      setWeightUnit("kg");
                      setWeightInput("");
                    }}
                    aria-pressed={weightUnit === "kg"}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    className={weightUnit === "lb" ? "on" : ""}
                    onClick={() => {
                      setWeightUnit("lb");
                      setWeightInput("");
                    }}
                    aria-pressed={weightUnit === "lb"}
                  >
                    lb
                  </button>
                </div>
              </div>
              <div className="field-helper">It&apos;s ok to estimate — you can update this later.</div>
            </div>
          </div>

          <StepNav onBack={back} onContinue={next} />
        </Step>
      )}

      {step === 3 && <Divider label="Step 04" />}

      {/* ─── STEP 04 · CADENCE ─── */}
      {step === 3 && (
        <Step variant="b">
          <StepHead
            center
            num="04"
            kicker="Cadence"
            titleHtml={
              <>
                When can you <em>actually</em> train?
              </>
            }
            sub="Tap the days you'll commit to. Realistic, not aspirational — the plan only programs what you'll show up for."
          />

          <div className="day-row">
            {DAY_LETTERS.map(({ d, short }) => (
              <button
                key={`${d}-${short}`}
                type="button"
                className={`day ${trainDays.has(d) ? "on" : ""}`}
                onClick={() => toggleDay(d)}
                aria-pressed={trainDays.has(d)}
                aria-label={`Toggle ${short}`}
              >
                {short}
              </button>
            ))}
          </div>
          <div className="day-meta">
            {trainDays.size === 0 ? (
              <strong>Pick at least one day</strong>
            ) : (
              <>
                <strong>
                  {trainDays.size} day{trainDays.size === 1 ? "" : "s"}
                </strong>{" "}
                a week — {cadenceLabel(trainDays.size)}
              </>
            )}
          </div>

          <div
            className="sub-block"
            style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <div className="sub-block__label">Session length</div>
            <div className="segmented segmented--full" style={{ margin: "0 auto" }}>
              {[30, 45, 60, 75].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={sessionLength === m ? "on" : ""}
                  onClick={() => setSessionLength(m)}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>

          <StepNav onBack={back} onContinue={next} disabled={trainDays.size === 0} />
        </Step>
      )}

      {step === 4 && <Divider label="Step 05" />}

      {/* ─── STEP 05 · TOOLS ─── */}
      {step === 4 && (
        <Step variant="a">
          <StepHead
            num="05"
            kicker="Tools"
            titleHtml={
              <>
                What do you have to <em>hand</em>?
              </>
            }
            sub="Pick everything you can use — at home, the gym, when you travel. The plan only programs what you own."
          />
          <div className="tile-grid">
            {EQUIPMENT.map((e) => {
              const on = equipment.has(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  className={`tile ${on ? "is-on" : ""}`}
                  onClick={() => toggleEquip(e.id)}
                  aria-pressed={on}
                >
                  <span className="tile__check">{on ? "✓" : ""}</span>
                  <span className="tile__body">
                    <div className="tile__title">{e.title}</div>
                    <div className="tile__sub">{e.sub}</div>
                  </span>
                </button>
              );
            })}
          </div>
          <StepNav
            onBack={back}
            onContinue={next}
            continueLabel="Open my plan →"
            disabled={equipment.size === 0}
          />
        </Step>
      )}

      {step === 5 && <Divider label="Step 06" />}

      {/* ─── STEP 06 · PLAN ─── */}
      {step === 5 && (
        <Step variant="b">
          <StepHead
            center
            num="06"
            kicker="Your plan"
            titleHtml={
              <>
                Week one is <em>ready</em>.
              </>
            }
            sub={`Today is ${weekdayName(new Date())}. Your first session is below — no extra setup, just open and lift.`}
          />

          {/* Summary chips */}
          <div className="summary">
            <span className="summary__chip">
              <span className="summary__chip-dot" />
              <strong>{labelFor(GOALS, goal) ?? "Get stronger"}</strong>
            </span>
            <span className="summary__chip">
              <span className="summary__chip-dot" />
              <strong>{labelFor(LEVELS, level) ?? "Intermediate"}</strong>
            </span>
            <span className="summary__chip">
              <span className="summary__chip-dot" />
              <strong>
                {trainDays.size}×/week
              </strong>{" "}
              · {sessionLength} min
            </span>
            <span className="summary__chip">
              <span className="summary__chip-dot" />
              <strong>{equipmentSummary(equipment)}</strong>
            </span>
          </div>

          {/* Plan card */}
          <div className="plan-card" style={{ marginTop: 36 }}>
            <div className="plan-card__head">
              <div className="plan-card__week">
                <div>
                  <div className="plan-card__title">Week 1 · Foundation</div>
                  <div className="plan-card__tag">Strength block · phase 1 of 4 · auto-adjusting</div>
                </div>
                <span className="plan-card__pill">Live</span>
              </div>
            </div>
            <ol className="plan-card__list">
              {weeklyPlan(trainDays, goal).map((row, i) => {
                const todayDay = (new Date().getDay() as Day);
                const isToday = row.dayIdx === todayDay;
                return (
                  <li key={i} className={`plan-row ${isToday ? "today" : ""}`}>
                    <span className="plan-row__num">{row.short}</span>
                    <span className="plan-row__day">{isToday ? "Today" : row.full}</span>
                    <span className={`plan-row__session ${row.rest ? "rest" : ""}`}>{row.session}</span>
                    <span className="plan-row__badge">{row.badge}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="plan-cta-row">
            <Link href="/today" className="btn3 btn3--accent">
              Begin today&apos;s session →
            </Link>
            <button
              type="button"
              className="btn3 btn3--ghost-dark"
              onClick={() => setStep(0)}
            >
              Edit my plan
            </button>
          </div>
        </Step>
      )}

      <SiteFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* Components                                                       */
/* ═══════════════════════════════════════════════════════════════ */

function SiteNav() {
  return (
    <nav className="nav3" aria-label="Primary">
      <Link href="/" className="nav3__brand">
        <BrandWordmark size="md" />
      </Link>
      <Link href="/#why" className="nav3__link">
        Why
      </Link>
      <Link href="/#how" className="nav3__link">
        How it works
      </Link>
      <Link href="/#pricing" className="nav3__link">
        Pricing
      </Link>
      <Link href="/#faq" className="nav3__link">
        FAQ
      </Link>
      <Link href="/" className="nav3__cta">
        Sign in
      </Link>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__inner">
          <div>
            <div className="foot__brand">
              <BrandWordmark size="lg" />
            </div>
            <p className="foot__tag" style={{ marginTop: 12 }}>
              Train with <BrandName />. The plan, the numbers, the coach — one app that gets you to the next session.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(247,245,240,0.5)",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Onboarding
            </div>
            <div style={{ fontSize: 13, color: "rgba(247,245,240,0.7)" }}>
              Six steps · two minutes · zero spreadsheets
            </div>
          </div>
        </div>
        <div className="foot__bot">
          <span>© 2026 DEVOTION STUDIO LTD</span>
          <span>devotion.fitness · Made in the UK</span>
        </div>
      </div>
    </footer>
  );
}

function Step({
  variant,
  children,
}: {
  variant: "a" | "b" | "c";
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const cur = cursorRef.current;
    if (!sec || !cur) return;
    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cur.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
    };
    sec.addEventListener("pointermove", onMove);
    return () => sec.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className={`step step--${variant}`} ref={sectionRef}>
      <div className="step__aura" aria-hidden />
      <div className="step__cursor" ref={cursorRef} aria-hidden />
      <div className="container">{children}</div>
    </section>
  );
}

function StepHead({
  num,
  kicker,
  titleHtml,
  sub,
  center,
}: {
  num: string;
  kicker: string;
  titleHtml: React.ReactNode;
  sub: string;
  center?: boolean;
}) {
  return (
    <div className={`step__head ${center ? "step__head--center" : ""}`}>
      <div className="ob-eyebrow-num-row">
        <span className="ob-eyebrow-num">{num}</span> {kicker}
      </div>
      <h2 className="step__title">{titleHtml}</h2>
      <p className="step__sub">{sub}</p>
    </div>
  );
}

function StepNav({
  hint,
  onBack,
  onContinue,
  continueLabel = "Continue →",
  disabled,
}: {
  hint?: string;
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="step__nav">
      {onBack ? (
        <button type="button" className="btn-back" onClick={onBack}>
          ← Back
        </button>
      ) : hint ? (
        <span className="step__nav-hint">{hint}</span>
      ) : (
        <span />
      )}
      <button
        type="button"
        className="btn3 btn3--accent"
        onClick={onContinue}
        disabled={disabled}
      >
        {continueLabel}
      </button>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="divider">
      <div className="divider__inner">
        <span className="divider__rule" />
        <span className="divider__dot">●</span>
        <span>{label}</span>
        <span className="divider__dot">●</span>
        <span className="divider__rule" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* Helpers                                                          */
/* ═══════════════════════════════════════════════════════════════ */

function sanitizeNumeric(raw: string, maxLen: number, allowDecimal = false): string {
  const cleaned = allowDecimal ? raw.replace(/[^0-9.]/g, "") : raw.replace(/[^0-9]/g, "");
  return cleaned.slice(0, maxLen);
}

function cadenceLabel(n: number): string {
  if (n <= 2) return "minimal cadence";
  if (n <= 4) return "solid intermediate cadence";
  return "high-frequency split";
}

function weekdayName(d: Date): string {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
}

function labelFor<T extends { id: string; title: string }>(
  list: T[],
  id: string | null,
): string | null {
  if (!id) return null;
  return list.find((x) => x.id === id)?.title ?? null;
}

function equipmentSummary(set: Set<Equipment>): string {
  if (set.size === 0) return "Bodyweight";
  if (set.size === 1) {
    const only = set.values().next().value as Equipment;
    return labelFor(EQUIPMENT, only) ?? "Bodyweight";
  }
  return `${set.size} setups`;
}

interface PlanRow {
  short: string;
  full: string;
  session: string;
  badge: string;
  rest: boolean;
  dayIdx: Day;
}

function weeklyPlan(days: Set<Day>, goal: Goal | null): PlanRow[] {
  const order: Day[] = [1, 2, 3, 4, 5, 6, 0];
  const sessions = sessionsForGoal(goal);
  let i = 0;
  return order.map((d): PlanRow => {
    const meta = DAY_LETTERS.find((x) => x.d === d)!;
    const isTrain = days.has(d);
    if (!isTrain) {
      return {
        short: meta.short,
        full: meta.full,
        session: "Rest",
        badge: d === 0 || d === 6 ? "Earned" : "Recover",
        rest: true,
        dayIdx: d,
      };
    }
    const s = sessions[i % sessions.length];
    i++;
    return {
      short: meta.short,
      full: meta.full,
      session: s.title,
      badge: s.badge,
      rest: false,
      dayIdx: d,
    };
  });
}

function sessionsForGoal(goal: Goal | null): { title: string; badge: string }[] {
  switch (goal) {
    case "muscle":
      return [
        { title: "Push — chest + tris", badge: "6 lifts · 45 min" },
        { title: "Pull — back + bis", badge: "6 lifts · 45 min" },
        { title: "Lower — quad focus", badge: "5 lifts · 50 min" },
        { title: "Upper — shoulder focus", badge: "5 lifts · 45 min" },
        { title: "Lower — hamstring focus", badge: "5 lifts · 50 min" },
      ];
    case "fat-loss":
      return [
        { title: "Full body A", badge: "5 lifts · 45 min" },
        { title: "Conditioning", badge: "30 min · zone 2" },
        { title: "Full body B", badge: "5 lifts · 45 min" },
        { title: "Conditioning", badge: "20 min · intervals" },
        { title: "Mobility + core", badge: "30 min" },
      ];
    case "endurance":
      return [
        { title: "Aerobic base", badge: "45 min · zone 2" },
        { title: "Strength — full body", badge: "5 lifts · 40 min" },
        { title: "Intervals", badge: "25 min · threshold" },
        { title: "Strength — full body", badge: "5 lifts · 40 min" },
        { title: "Long aerobic", badge: "60 min · zone 2" },
      ];
    case "health":
      return [
        { title: "Strength — full body", badge: "4 lifts · 40 min" },
        { title: "Walk + mobility", badge: "30 min" },
        { title: "Strength — full body", badge: "4 lifts · 40 min" },
        { title: "Conditioning", badge: "20 min · easy" },
        { title: "Mobility", badge: "20 min" },
      ];
    case "strength":
    default:
      return [
        { title: "Lower — squat focus", badge: "5 lifts · 45 min" },
        { title: "Upper — press focus", badge: "5 lifts · 45 min" },
        { title: "Lower — pull focus", badge: "4 lifts · 45 min" },
        { title: "Upper — bench focus", badge: "5 lifts · 45 min" },
        { title: "Conditioning", badge: "20 min · finisher" },
      ];
  }
}
