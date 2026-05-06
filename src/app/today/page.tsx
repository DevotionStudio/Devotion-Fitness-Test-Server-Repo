"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  weightKg: number;
  lastTime?: string;
  note?: string;
};

const SESSION: { title: string; durationMin: number; chapter: string; exercises: Exercise[] } = {
  title: "Press & pull",
  durationMin: 45,
  chapter: "XII",
  exercises: [
    {
      name: "Barbell bench press",
      sets: 4,
      reps: "6–8",
      weightKg: 82.5,
      lastTime: "80 kg × 8 (RPE 8)",
      note: "+2.5 kg from last week. Earn it off the chest, no bounce.",
    },
    { name: "Pendlay row", sets: 4, reps: "6–8", weightKg: 70, lastTime: "67.5 kg × 8 (RPE 7)" },
    { name: "Incline DB press", sets: 3, reps: "8–10", weightKg: 30, lastTime: "27.5 kg × 10 (RPE 7)" },
    { name: "Cable face pull", sets: 3, reps: "12–15", weightKg: 22.5, lastTime: "20 kg × 14 (RPE 6)" },
  ],
};

type Mode = "card" | "workout" | "done";

export default function TodayPage() {
  const [mode, setMode] = useState<Mode>("card");
  if (mode === "card") return <Card onStart={() => setMode("workout")} />;
  if (mode === "workout") return <Workout onFinish={() => setMode("done")} />;
  return <Done onBack={() => setMode("card")} />;
}

function HeaderBar({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between pt-2">
      <div className="flex items-baseline gap-2.5">{left}</div>
      <div className="flex items-center gap-4">
        {right}
        <ThemeToggle />
      </div>
    </header>
  );
}

function HomeMark() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Devotion home">
      <Wordmark size="sm" expandable plateAccent />
    </Link>
  );
}

/* ─── Today card ─────────────────────────────────── */

function Card({ onStart }: { onStart: () => void }) {
  return (
    <main className="phone container-d pt-6">
      <HeaderBar
        left={<HomeMark />}
        right={<span className="roman">{SESSION.chapter}</span>}
      />

      <div className="mt-10">
        <span className="eyebrow eyebrow-ox">Today, Tuesday</span>
        <h1 className="display-2 mt-4">{SESSION.title}</h1>
        <p className="mt-3 text-sm text-ink-2">
          {SESSION.durationMin} minutes · {SESSION.exercises.length} movements
        </p>
        <span className="rule mt-7 block" />
      </div>

      <ul className="mt-7 divide-y divide-line">
        {SESSION.exercises.map((e, i) => (
          <li key={e.name} className="flex items-baseline justify-between py-4">
            <div className="flex items-baseline gap-4">
              <span className="roman w-8">{toRoman(i + 1)}</span>
              <span className="text-base">{e.name}</span>
            </div>
            <span className="text-sm text-ink-2 tab-num">
              {e.sets} × {e.reps} · {e.weightKg} kg
            </span>
          </li>
        ))}
      </ul>

      {SESSION.exercises[0].note && (
        <p className="quote quote-ox mt-9">{SESSION.exercises[0].note}</p>
      )}

      <div className="mt-auto pt-12 grid gap-3">
        <button onClick={onStart} className="btn-d-accent">Begin session</button>
        <button className="btn-d-quiet">Reschedule →</button>
      </div>
    </main>
  );
}

/* ─── In-workout ─────────────────────────────────── */

function Workout({ onFinish }: { onFinish: () => void }) {
  const [exIndex, setExIndex] = useState(0);
  const ex = SESSION.exercises[exIndex];

  const [sets, setSets] = useState<{ done: boolean; reps: number; weight: number }[]>(
    Array.from({ length: ex.sets }, () => ({
      done: false,
      reps: parseInt(ex.reps.split("–")[0], 10),
      weight: ex.weightKg,
    })),
  );
  const [showRPE, setShowRPE] = useState(false);

  useEffect(() => {
    setSets(
      Array.from({ length: ex.sets }, () => ({
        done: false,
        reps: parseInt(ex.reps.split("–")[0], 10),
        weight: ex.weightKg,
      })),
    );
    setShowRPE(false);
  }, [exIndex, ex.sets, ex.reps, ex.weightKg]);

  const allDone = sets.every((s) => s.done);

  const toggle = (i: number) =>
    setSets((arr) => arr.map((s, idx) => (idx === i ? { ...s, done: !s.done } : s)));

  const adjust = (i: number, field: "weight" | "reps", delta: number) =>
    setSets((arr) =>
      arr.map((s, idx) => (idx === i ? { ...s, [field]: +(s[field] + delta).toFixed(1) } : s)),
    );

  const onNextExercise = () => {
    if (exIndex < SESSION.exercises.length - 1) setExIndex((i) => i + 1);
    else onFinish();
  };

  return (
    <main className="phone container-d pt-6">
      <HeaderBar
        left={
          <button onClick={onFinish} className="text-xs uppercase tracking-[0.2em] text-ink-2 hover:text-oxblood">
            End
          </button>
        }
        right={
          <span className="text-xs uppercase tracking-[0.2em] text-ash tab-num">
            {exIndex + 1} of {SESSION.exercises.length}
          </span>
        }
      />

      <div className="mt-9">
        <span className="eyebrow eyebrow-ox">{SESSION.title}</span>
        <h1 className="display-3 mt-3">{ex.name}</h1>
        <p className="mt-3 text-sm text-ink-2 tab-num">
          {ex.sets} × {ex.reps} @ {ex.weightKg} kg
          {ex.lastTime && <span className="ml-3 text-ash">· last: {ex.lastTime}</span>}
        </p>
        {ex.note && <p className="quote quote-ox mt-6">{ex.note}</p>}
        <span className="rule mt-7 block" />
      </div>

      {/* Set table — tabular, devotional, no card chrome */}
      <div className="mt-6">
        <div className="grid grid-cols-[28px_1fr_1fr_44px] gap-3 items-center pb-2 border-b border-line">
          <span className="eyebrow eyebrow-ink">#</span>
          <span className="eyebrow eyebrow-ink">Weight</span>
          <span className="eyebrow eyebrow-ink">Reps</span>
          <span className="eyebrow eyebrow-ink text-right">Done</span>
        </div>
        {sets.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-[28px_1fr_1fr_44px] gap-3 items-center py-3 border-b border-line2"
          >
            <span className="roman text-base">{toRoman(i + 1)}</span>
            <NudgeRow value={`${s.weight} kg`} onMinus={() => adjust(i, "weight", -2.5)} onPlus={() => adjust(i, "weight", 2.5)} />
            <NudgeRow value={`${s.reps}`} onMinus={() => adjust(i, "reps", -1)} onPlus={() => adjust(i, "reps", 1)} />
            <button
              onClick={() => toggle(i)}
              className={`set-check ${s.done ? "on" : ""} justify-self-end`}
              aria-label={`mark set ${i + 1} ${s.done ? "incomplete" : "complete"}`}
            >
              ✓
            </button>
          </div>
        ))}
      </div>

      <RestTimer key={`rest-${exIndex}-${sets.filter((s) => s.done).length}`} />

      {!showRPE && (
        <div className="mt-auto pt-10">
          <button
            onClick={() => setShowRPE(true)}
            disabled={!allDone}
            className={`btn-d-accent w-full ${!allDone ? "opacity-40 pointer-events-none" : ""}`}
          >
            Done with this movement
          </button>
        </div>
      )}

      {showRPE && (
        <div className="mt-auto pt-10">
          <div className="flex items-baseline justify-between mb-4">
            <span className="eyebrow eyebrow-ox">How hard?</span>
            <span className="text-xs text-ash">1 easy · 10 max</span>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={onNextExercise}
                className="aspect-square border border-line text-sm text-ink-2 hover:bg-ink hover:text-bone hover:border-ink transition-colors"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function NudgeRow({ value, onMinus, onPlus }: { value: string; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onMinus} className="w-7 h-7 border border-line text-ink-2 hover:border-ink" aria-label="decrease">−</button>
      <span className="text-sm tab-num flex-1 text-center">{value}</span>
      <button onClick={onPlus} className="w-7 h-7 border border-line text-ink-2 hover:border-ink" aria-label="increase">+</button>
    </div>
  );
}

function RestTimer() {
  const [seconds, setSeconds] = useState(90);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4">
      <span className="eyebrow eyebrow-ink">Rest</span>
      <span className="numeric-md tab-num">
        {m}:{s.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

/* ─── Done summary ───────────────────────────────── */

function Done({ onBack }: { onBack: () => void }) {
  const message = useMemo(
    () =>
      "A clean session. Bench moved to 82.5 kg without breaking form. Two more pushes like that and we add another 2.5 kg next week.",
    [],
  );
  return (
    <main className="phone container-d pt-6">
      <HeaderBar
        left={
          <button onClick={onBack} className="text-xs uppercase tracking-[0.2em] text-ink-2 hover:text-oxblood">
            ← Back
          </button>
        }
        right={<span className="roman">XII</span>}
      />

      <div className="mt-12">
        <span className="eyebrow eyebrow-ox">Session complete</span>
        <h1 className="display-2 mt-4">
          Faithful work today.
        </h1>
        <span className="rule mt-7 block" />
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
        {[
          { l: "Volume", v: "12,400 kg" },
          { l: "Time", v: "44 min" },
          { l: "Top set", v: "82.5 × 8" },
        ].map((s) => (
          <div key={s.l}>
            <dt className="eyebrow eyebrow-ink">{s.l}</dt>
            <dd className="numeric-md mt-2 tab-num">{s.v}</dd>
          </div>
        ))}
      </dl>

      <p className="quote quote-ox mt-9">{message}</p>

      <div className="mt-auto pt-12 grid gap-3">
        <Link href="/review" className="btn-d-accent block text-center">Read the weekly review</Link>
        <Link href="/" className="btn-d-quiet block text-center">Back to the manifesto</Link>
      </div>
    </main>
  );
}

function toRoman(n: number): string {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][n - 1] ?? `${n}`;
}
