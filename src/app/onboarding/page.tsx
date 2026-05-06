"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

type Goal = "fat-loss" | "muscle" | "strength" | "health" | "endurance";
type Level = "beginner" | "intermediate" | "advanced";
type Equipment = "gym" | "home-gym" | "dumbbells" | "minimal" | "bodyweight";
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const GOALS: { id: Goal; label: string; sub: string }[] = [
  { id: "strength", label: "Get stronger", sub: "Heavier lifts, lower reps" },
  { id: "muscle", label: "Build muscle", sub: "Hypertrophy focus" },
  { id: "fat-loss", label: "Lose fat", sub: "Lean down, keep muscle" },
  { id: "endurance", label: "Build endurance", sub: "Stamina + conditioning" },
  { id: "health", label: "Stay healthy", sub: "Move well, feel good" },
];

const LEVELS: { id: Level; label: string; sub: string }[] = [
  { id: "beginner", label: "New to this", sub: "Less than 6 months training" },
  { id: "intermediate", label: "Been at it a while", sub: "6 months – 2 years" },
  { id: "advanced", label: "Experienced", sub: "2+ years, know my numbers" },
];

const EQUIP: { id: Equipment; label: string; sub: string }[] = [
  { id: "gym", label: "Full gym", sub: "Racks, machines, the lot" },
  { id: "home-gym", label: "Home gym", sub: "Rack and barbell" },
  { id: "dumbbells", label: "Dumbbells", sub: "Adjustable or fixed" },
  { id: "minimal", label: "Bands / kettlebell", sub: "Travel-friendly" },
  { id: "bodyweight", label: "Bodyweight only", sub: "No equipment needed" },
];

const DAY_LABELS: { d: Day; short: string }[] = [
  { d: 1, short: "M" },
  { d: 2, short: "T" },
  { d: 3, short: "W" },
  { d: 4, short: "T" },
  { d: 5, short: "F" },
  { d: 6, short: "S" },
  { d: 0, short: "S" },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [age, setAge] = useState(28);
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(78);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [trainDays, setTrainDays] = useState<Set<Day>>(new Set([1, 3, 5] as Day[]));
  const [length, setLength] = useState(45);
  const [equipment, setEquipment] = useState<Set<Equipment>>(new Set(["gym"]));
  const [generating, setGenerating] = useState(false);

  const totalSteps = 5;
  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleEquip = (id: Equipment) => {
    const n = new Set(equipment);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    setEquipment(n);
  };

  const toggleDay = (d: Day) => {
    const n = new Set(trainDays);
    if (n.has(d)) n.delete(d);
    else n.add(d);
    setTrainDays(n);
  };

  const startGenerate = () => {
    setGenerating(true);
    setTimeout(() => setStep(totalSteps), 1800);
  };

  const stepName = ["Goal", "Experience", "You", "Cadence", "Tools", "Plan"][Math.min(step, 5)];

  return (
    <main className="phone container-d pt-6">
      {/* Header — mark, lesson number, progress */}
      <header className="flex items-center justify-between pt-2">
        <Link href="/" aria-label="Devotion home" className="inline-flex items-center">
          <Wordmark size="sm" expandable plateAccent />
        </Link>
        <div className="flex items-center gap-4">
          <span className="roman">
            {["I", "II", "III", "IV", "V", "VI"][Math.min(step, 5)]}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="mt-6 flex items-center gap-4">
        <span className="rule flex-1" />
        <span className="eyebrow eyebrow-ink whitespace-nowrap">{stepName}</span>
        <span className="rule flex-1" />
      </div>

      {/* Progress dots */}
      <div className="mt-3 flex justify-center gap-2">
        {Array.from({ length: totalSteps + 1 }, (_, i) => (
          <span
            key={i}
            className={`h-1 w-6 transition-colors ${
              i <= step ? "bg-oxblood" : "bg-line"
            }`}
          />
        ))}
      </div>

      {/* Steps */}
      {step === 0 && (
        <Section
          eyebrow="Lesson I — Goal"
          title="What do you want from the next twelve weeks?"
          sub="Pick one. The plan is shaped around it."
        >
          <div className="grid gap-2.5">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setGoal(g.id);
                  setTimeout(next, 140);
                }}
                className={`tile ${goal === g.id ? "tile-on" : ""}`}
              >
                <div className="tile-title">{g.label}</div>
                <div className="tile-sub">{g.sub}</div>
              </button>
            ))}
          </div>
        </Section>
      )}

      {step === 1 && (
        <Section
          eyebrow="Lesson II — Experience"
          title="How long have you trained?"
          sub="Honesty calibrates everything that follows."
        >
          <div className="grid gap-2.5">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setLevel(l.id);
                  setTimeout(next, 140);
                }}
                className={`tile ${level === l.id ? "tile-on" : ""}`}
              >
                <div className="tile-title">{l.label}</div>
                <div className="tile-sub">{l.sub}</div>
              </button>
            ))}
          </div>
        </Section>
      )}

      {step === 2 && (
        <Section
          eyebrow="Lesson III — You"
          title="A few honest numbers."
          sub="Used to scale loads and conditioning. Skip what you like."
        >
          <div className="mt-2 mb-6">
            <div className="segmented">
              <button onClick={() => setUnits("metric")} className={units === "metric" ? "on" : ""}>Metric</button>
              <button onClick={() => setUnits("imperial")} className={units === "imperial" ? "on" : ""}>Imperial</button>
            </div>
          </div>

          <Slider label="Age" value={age} unit="years" min={14} max={80} step={1} onChange={setAge} />
          <Slider
            label="Height"
            value={units === "metric" ? heightCm : Math.round(heightCm / 2.54)}
            unit={units === "metric" ? "cm" : "in"}
            min={units === "metric" ? 130 : 51}
            max={units === "metric" ? 220 : 87}
            step={1}
            onChange={(v) => setHeightCm(units === "metric" ? v : Math.round(v * 2.54))}
          />
          <Slider
            label="Weight"
            value={units === "metric" ? weightKg : Math.round(weightKg * 2.205)}
            unit={units === "metric" ? "kg" : "lb"}
            min={units === "metric" ? 35 : 77}
            max={units === "metric" ? 200 : 440}
            step={units === "metric" ? 1 : 2}
            onChange={(v) => setWeightKg(units === "metric" ? v : +(v / 2.205).toFixed(1))}
          />

          <div className="mt-10 flex items-center justify-between">
            <button onClick={back} className="btn-d-quiet">← Back</button>
            <button onClick={next} className="btn-d-primary">Continue</button>
          </div>
        </Section>
      )}

      {step === 3 && (
        <Section
          eyebrow="Lesson IV — Cadence"
          title="When can you train?"
          sub="Tap the days you'll commit to. Realistic, not aspirational."
        >
          <div className="mt-3 flex justify-between">
            {DAY_LABELS.map(({ d, short }) => (
              <button
                key={`${d}-${short}`}
                onClick={() => toggleDay(d)}
                className={`day-circle accent ${trainDays.has(d) ? "on accent" : ""}`}
                aria-pressed={trainDays.has(d)}
                aria-label={`Toggle day ${short}`}
              >
                {short}
              </button>
            ))}
          </div>
          <p className="text-center mt-4 text-sm text-ink-2 italic-serif">
            {trainDays.size === 0
              ? "At least one day."
              : `${trainDays.size} ${trainDays.size === 1 ? "day" : "days"} a week.`}
          </p>

          <div className="mt-10">
            <div className="eyebrow eyebrow-ink mb-3">Session length</div>
            <div className="segmented">
              {[30, 45, 60, 75].map((m) => (
                <button key={m} onClick={() => setLength(m)} className={length === m ? "on" : ""}>
                  {m} min
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button onClick={back} className="btn-d-quiet">← Back</button>
            <button
              onClick={next}
              disabled={trainDays.size === 0}
              className={`btn-d-primary ${trainDays.size === 0 ? "opacity-40 pointer-events-none" : ""}`}
            >
              Continue
            </button>
          </div>
        </Section>
      )}

      {step === 4 && (
        <Section
          eyebrow="Lesson V — Tools"
          title="What do you have to hand?"
          sub="Pick everything you can use. The plan only programs what you own."
        >
          <div className="grid gap-2.5">
            {EQUIP.map((e) => {
              const on = equipment.has(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() => toggleEquip(e.id)}
                  className={`check-tile ${on ? "check-tile-on" : ""}`}
                  aria-pressed={on}
                >
                  <span className="check-tile-mark">{on ? "✓" : ""}</span>
                  <span className="flex-1">
                    <span className="tile-title block text-lg">{e.label}</span>
                    <span className="tile-sub block">{e.sub}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button onClick={back} className="btn-d-quiet">← Back</button>
            <button
              onClick={startGenerate}
              disabled={equipment.size === 0 || generating}
              className={`btn-d-accent ${
                equipment.size === 0 || generating ? "opacity-40 pointer-events-none" : ""
              }`}
            >
              {generating ? "Writing your week…" : "Open the plan"}
            </button>
          </div>
        </Section>
      )}

      {step === totalSteps && (
        <Section
          eyebrow="Vol. I — Your plan"
          title="The first chapter."
          sub={`Today is ${weekday(new Date())}. The day's session is below.`}
        >
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {weeklyPlan(trainDays, goal).map((row, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between py-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="roman w-8">{toRoman(i + 1)}</span>
                  <span className="text-sm">{row.day}</span>
                </div>
                <span
                  className={`text-sm tab-num ${
                    row.rest ? "italic-serif text-ash" : "text-ink"
                  }`}
                >
                  {row.session}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-3">
            <Link href="/today" className="btn-d-accent block text-center">
              Begin today's session
            </Link>
            <Link href="/" className="btn-d-quiet block text-center">
              Back to the manifesto
            </Link>
          </div>
        </Section>
      )}
    </main>
  );
}

/* ─── helpers ───────────────────────────────────────── */

function Section({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 flex-1 flex flex-col">
      <span className="eyebrow eyebrow-ox">{eyebrow}</span>
      <h1 className="display-3 mt-3">{title}</h1>
      <p className="lead mt-3 text-base">{sub}</p>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Slider({
  label, value, unit, min, max, step, onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mt-7">
      <div className="flex items-baseline justify-between mb-3">
        <span className="eyebrow eyebrow-ink">{label}</span>
        <span className="text-xs text-ash tab-num">{min}–{max} {unit}</span>
      </div>
      <div className="numeric-xl flex items-baseline gap-2">
        {value}
        <span className="text-base text-ash italic-serif tracking-normal" style={{ fontStyle: "italic" }}>{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="slider-d mt-5"
        aria-label={label}
        style={{
          background: `linear-gradient(to right, var(--oxblood) ${pct}%, var(--line) ${pct}%)`,
        }}
      />
    </div>
  );
}

function weekday(d: Date) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
}

function toRoman(n: number): string {
  return ["I", "II", "III", "IV", "V", "VI", "VII"][n - 1] ?? `${n}`;
}

function weeklyPlan(days: Set<Day>, goal: Goal | null) {
  const order: Day[] = [1, 2, 3, 4, 5, 6, 0];
  const sessions = sessionsForGoal(goal, days.size);
  let i = 0;
  return order.map((d) => {
    const isTrain = days.has(d);
    const name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d];
    if (!isTrain) return { day: name, session: "Rest", rest: true };
    const s = sessions[i % sessions.length];
    i++;
    return { day: name, session: s, rest: false };
  });
}

function sessionsForGoal(goal: Goal | null, n: number): string[] {
  const map: Record<Goal, string[]> = {
    strength: ["Lower — squat", "Upper — press", "Lower — pull", "Upper — bench", "Conditioning"],
    muscle:   ["Push", "Pull", "Lower", "Upper", "Arms + core"],
    "fat-loss": ["Full body A", "Conditioning", "Full body B", "Conditioning", "Mobility"],
    endurance: ["Aerobic", "Strength", "Intervals", "Strength", "Long aerobic"],
    health:    ["Strength", "Walk + mobility", "Strength", "Conditioning", "Mobility"],
  };
  return map[goal ?? "strength"].slice(0, Math.max(n, 3));
}
