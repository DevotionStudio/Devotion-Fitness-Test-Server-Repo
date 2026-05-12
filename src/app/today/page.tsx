"use client";

import "./v3-today.css";
import Link from "next/link";
import { BrandMark, BrandName, BrandWordmark } from "@/components/wordmark";
import { useEffect, useMemo, useRef, useState } from "react";

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  weightKg: number;
  lastTime?: string;
  note?: string;
};

const SESSION: { title: string; durationMin: number; exercises: Exercise[] } = {
  title: "Press & pull",
  durationMin: 45,
  exercises: [
    {
      name: "Barbell bench press",
      sets: 4,
      reps: "6–8",
      weightKg: 82.5,
      lastTime: "80 kg × 8 (RPE 8)",
      note: "+2.5 kg from last week. Earn it off the chest, no bounce.",
    },
    {
      name: "Pendlay row",
      sets: 4,
      reps: "6–8",
      weightKg: 70,
      lastTime: "67.5 kg × 8 (RPE 7)",
      note: "Knock the bar dead between reps — no momentum. Keep chest tall, ribs down.",
    },
    {
      name: "Incline DB press",
      sets: 3,
      reps: "8–10",
      weightKg: 30,
      lastTime: "27.5 kg × 10 (RPE 7)",
    },
    {
      name: "Cable face pull",
      sets: 3,
      reps: "12–15",
      weightKg: 22.5,
      lastTime: "20 kg × 14 (RPE 6)",
    },
  ],
};

type SetState = { done: boolean; reps: string; weight: string };

export default function TodayPage() {
  const [exIndex, setExIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const allSets = useMemo(
    () =>
      SESSION.exercises.map((ex) => {
        const startReps = ex.reps.split(/[–-]/)[0]?.trim() ?? "";
        return Array.from({ length: ex.sets }, () => ({
          done: false,
          reps: startReps,
          weight: String(ex.weightKg),
        }));
      }),
    [],
  );

  const [setsByEx, setSetsByEx] = useState<SetState[][]>(allSets);

  const ex = SESSION.exercises[exIndex];
  const sets = setsByEx[exIndex];
  const allDone = sets.every((s) => s.done);
  const activeIdx = sets.findIndex((s) => !s.done);

  // Aggregate stats
  const totalSets = SESSION.exercises.reduce((acc, e) => acc + e.sets, 0);
  const completedSets = setsByEx.flat().filter((s) => s.done).length;
  const progressPct = Math.max(4, Math.round((completedSets / totalSets) * 100));
  const totalVolume = setsByEx.flat().reduce((acc, s) => {
    if (!s.done) return acc;
    const w = parseFloat(s.weight) || 0;
    const r = parseFloat(s.reps) || 0;
    return acc + w * r;
  }, 0);

  const updateSet = (idx: number, patch: Partial<SetState>) => {
    setSetsByEx((prev) =>
      prev.map((arr, ei) =>
        ei !== exIndex ? arr : arr.map((s, i) => (i === idx ? { ...s, ...patch } : s)),
      ),
    );
  };

  const adjust = (idx: number, field: "weight" | "reps", delta: number) => {
    const current = parseFloat(sets[idx][field]);
    const base = isNaN(current) ? 0 : current;
    const next = Math.max(0, +(base + delta).toFixed(field === "weight" ? 2 : 0));
    updateSet(idx, { [field]: String(next) });
  };

  const onNextExercise = () => {
    if (exIndex < SESSION.exercises.length - 1) setExIndex((i) => i + 1);
    else setFinished(true);
  };

  const onFinishSession = () => setFinished(true);

  if (finished) {
    return (
      <DoneView
        totalVolume={totalVolume}
        durationMin={SESSION.durationMin}
        topSet={topSetLabel(setsByEx)}
        onBack={() => {
          setFinished(false);
          setExIndex(0);
          setSetsByEx(allSets);
        }}
      />
    );
  }

  return (
    <div className="v3-root">
      <SiteNav />

      <SessionStage
        completedSets={completedSets}
        totalSets={totalSets}
        progressPct={progressPct}
        elapsedMin={Math.min(SESSION.durationMin, 22 + exIndex * 6)}
        movements={SESSION.exercises.length}
        volumeKg={Math.round(totalVolume) || 5840}
      />

      <BodySection>
        <ul className="ex-list">
          {SESSION.exercises.map((e, i) => {
            if (i < exIndex) {
              return <DoneExerciseCard key={e.name} ex={e} sets={setsByEx[i]} index={i} />;
            }
            if (i === exIndex) {
              return (
                <ActiveExerciseCard
                  key={e.name}
                  ex={e}
                  sets={sets}
                  index={i}
                  activeSetIdx={activeIdx === -1 ? sets.length - 1 : activeIdx}
                  allDone={allDone}
                  onUpdateSet={updateSet}
                  onAdjust={adjust}
                  onToggleDone={(idx) => updateSet(idx, { done: !sets[idx].done })}
                  onNextExercise={onNextExercise}
                />
              );
            }
            if (i === exIndex + 1) {
              return [
                <CoachCard key={`coach-before-${e.name}`} />,
                <PendingExerciseCard key={e.name} ex={e} index={i} />,
              ];
            }
            return <PendingExerciseCard key={e.name} ex={e} index={i} />;
          })}
        </ul>

        <div className="finish">
          <div className="finish__inner">
            <button className="btn-finish" onClick={onFinishSession}>
              Finish session →
            </button>
            <button className="btn-quiet" type="button">
              Add a movement
            </button>
          </div>
        </div>

        <div className="end-pad" />
      </BodySection>
    </div>
  );
}

/* ─── Nav (dark glass, never switches) ─── */
function SiteNav() {
  return (
    <nav className="nav3" aria-label="Primary">
      <Link href="/" className="nav3__brand">
        <BrandWordmark size="md" />
      </Link>
      <Link href="/today" className="nav3__link is-active">
        Today
      </Link>
      <Link href="/" className="nav3__link">
        Plan
      </Link>
      <Link href="/" className="nav3__link">
        Eat
      </Link>
      <Link href="/" className="nav3__link">
        Coach
      </Link>
      <Link href="/review" className="nav3__cta">
        End session
      </Link>
    </nav>
  );
}

/* ─── Session stage (dark hero) ─── */
function SessionStage({
  completedSets,
  totalSets,
  progressPct,
  elapsedMin,
  movements,
  volumeKg,
}: {
  completedSets: number;
  totalSets: number;
  progressPct: number;
  elapsedMin: number;
  movements: number;
  volumeKg: number;
}) {
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
      cursor.style.transform = `translate3d(${x - 190}px, ${y - 190}px, 0)`;
    };
    stage.addEventListener("pointermove", onMove);
    return () => stage.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="stage" ref={stageRef}>
      <div className="stage__grid" aria-hidden />
      <div className="stage__aurora stage__aurora--key" aria-hidden />
      <div className="stage__aurora stage__aurora--rim" aria-hidden />
      <div className="stage__cursor" ref={cursorRef} aria-hidden />

      <div className="container">
        <div className="session-meta">
          <span className="session-meta__rule" />
          <span className="session-meta__dot" />
          <span className="session-meta__text">Tuesday · live session</span>
          <span className="session-meta__rule r" />
        </div>

        <h1 className="session-title">
          Press &amp; <em>pull</em>.
        </h1>

        <div className="session-stats">
          <div className="session-stat">
            <div className="session-stat__value">
              {elapsedMin}
              <span className="unit">min</span>
            </div>
            <div className="session-stat__label">Elapsed</div>
          </div>
          <div className="session-stat">
            <div className="session-stat__value">{movements}</div>
            <div className="session-stat__label">Movements</div>
          </div>
          <div className="session-stat">
            <div className="session-stat__value">
              {volumeKg.toLocaleString()}
              <span className="unit">kg</span>
            </div>
            <div className="session-stat__label">Volume</div>
          </div>
        </div>

        <div className="session-progress">
          <span className="session-progress__label">Progress</span>
          <div className="session-progress__bar">
            <div
              className="session-progress__bar-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="session-progress__count">
            {completedSets} <span>/ {totalSets} sets</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Body section (dark with violet atmosphere + JS-pinned aurora) ─── */
function BodySection({ children }: { children: React.ReactNode }) {
  const bodyRef = useRef<HTMLElement | null>(null);
  const auroraRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const body = bodyRef.current;
    const aurora = auroraRef.current;
    if (!body || !aurora) return;

    const positionAurora = () => {
      const active = body.querySelector<HTMLElement>(".ex--active");
      if (!active) {
        aurora.style.opacity = "0";
        return;
      }
      aurora.style.opacity = "0.7";
      const bodyRect = body.getBoundingClientRect();
      const exRect = active.getBoundingClientRect();
      const top = exRect.top - bodyRect.top + exRect.height / 2 - 520 / 2;
      const left = exRect.left - bodyRect.left + exRect.width / 2 - 720 / 2;
      aurora.style.top = `${top}px`;
      aurora.style.left = `${left}px`;
    };

    positionAurora();
    window.addEventListener("scroll", positionAurora, { passive: true });
    window.addEventListener("resize", positionAurora, { passive: true });
    // Re-position when DOM mutates (active card moves between exercises)
    const obs = new MutationObserver(positionAurora);
    obs.observe(body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", positionAurora);
      window.removeEventListener("resize", positionAurora);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    const cursor = cursorRef.current;
    if (!body || !cursor) return;
    const onMove = (e: PointerEvent) => {
      const rect = body.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.transform = `translate3d(${x - 230}px, ${y - 230}px, 0)`;
    };
    body.addEventListener("pointermove", onMove);
    return () => body.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="body" ref={bodyRef}>
      <div className="body__atmosphere" aria-hidden />
      <div className="body__grid" aria-hidden />
      <div className="body__active-aurora" ref={auroraRef} aria-hidden />
      <div className="body__cursor" ref={cursorRef} aria-hidden />
      <div className="container">{children}</div>
    </section>
  );
}

/* ─── DONE exercise card (dark glass + green summary chips) ─── */
function DoneExerciseCard({ ex, sets, index }: { ex: Exercise; sets: SetState[]; index: number }) {
  const topSet = sets.reduce<SetState | null>((best, s) => {
    if (!s.done) return best;
    const w = parseFloat(s.weight) || 0;
    const bw = best ? parseFloat(best.weight) || 0 : -1;
    return w > bw ? s : best;
  }, null);

  return (
    <li className="ex ex--done">
      <div className="ex__head">
        <div className="ex__title-wrap">
          <div className="ex__num">{pad2(index + 1)} · Done</div>
          <h2 className="ex__title">{ex.name}</h2>
        </div>
        <div className="ex__pill">
          <span className="ex__pill-dot" />
          Complete
        </div>
      </div>
      <div className="ex__meta">
        <span>
          <b>{ex.sets} sets</b> · {ex.reps} reps
        </span>
        {topSet && (
          <>
            <span className="ex__meta-sep">·</span>
            <span>
              Top set <b>{topSet.weight} kg × {topSet.reps}</b>
            </span>
          </>
        )}
      </div>
      <div className="ex__summary">
        {sets.map((s, i) => (
          <div className="ex__summary-cell" key={i}>
            <span className="label">Set {i + 1}</span>
            {s.weight} × {s.reps}
          </div>
        ))}
      </div>
    </li>
  );
}

/* ─── ACTIVE exercise card (dark glass + max violet) ─── */
function ActiveExerciseCard({
  ex,
  sets,
  index,
  activeSetIdx,
  allDone,
  onUpdateSet,
  onAdjust,
  onToggleDone,
  onNextExercise,
}: {
  ex: Exercise;
  sets: SetState[];
  index: number;
  activeSetIdx: number;
  allDone: boolean;
  onUpdateSet: (idx: number, patch: Partial<SetState>) => void;
  onAdjust: (idx: number, field: "weight" | "reps", delta: number) => void;
  onToggleDone: (idx: number) => void;
  onNextExercise: () => void;
}) {
  const completedCount = sets.filter((s) => s.done).length;
  const currentSet = Math.min(completedCount + 1, sets.length);

  return (
    <li className="ex ex--active">
      <div className="ex__head">
        <div className="ex__title-wrap">
          <div className="ex__num">{pad2(index + 1)} · Up now</div>
          <h2 className="ex__title">{ex.name}</h2>
        </div>
        <div className="ex__pill">
          <span className="ex__pill-dot" />
          Set {currentSet} of {sets.length}
        </div>
      </div>
      <div className="ex__meta">
        <span>
          <b>{ex.sets} sets</b> · {ex.reps} reps
        </span>
        <span className="ex__meta-sep">·</span>
        <span>
          Target <b>{ex.weightKg} kg</b>
        </span>
        {ex.lastTime && (
          <>
            <span className="ex__meta-sep">·</span>
            <span>
              Last: <b>{ex.lastTime}</b>
            </span>
          </>
        )}
      </div>

      {ex.note && <p className="ex__note">{ex.note}</p>}

      <div className="sets">
        <div className="sets__head">
          <span>#</span>
          <span>Weight</span>
          <span>Reps</span>
          <span>Done</span>
        </div>

        {sets.map((s, i) => (
          <SetRow
            key={i}
            n={i + 1}
            set={s}
            state={s.done ? "done" : i === activeSetIdx ? "active" : "pending"}
            onWeight={(v) => onUpdateSet(i, { weight: v })}
            onReps={(v) => onUpdateSet(i, { reps: v })}
            onAdjustWeight={(d) => onAdjust(i, "weight", d)}
            onAdjustReps={(d) => onAdjust(i, "reps", d)}
            onToggle={() => onToggleDone(i)}
          />
        ))}
      </div>

      <div className="action-row">
        <RestPill exerciseIndex={index} completedCount={completedCount} nextSet={currentSet} />
        <button className="btn-next" disabled={!allDone} onClick={onNextExercise}>
          Done with movement →
        </button>
      </div>
    </li>
  );
}

/* ─── PENDING exercise card (dark glass, dimmed) ─── */
function PendingExerciseCard({ ex, index }: { ex: Exercise; index: number }) {
  return (
    <li className="ex ex--pending">
      <div className="ex__head">
        <div className="ex__title-wrap">
          <div className="ex__num">{pad2(index + 1)} · {index === 1 ? "Up next" : "Then"}</div>
          <h2 className="ex__title">{ex.name}</h2>
        </div>
        <div className="ex__pill">
          <span className="ex__pill-dot" />
          {ex.sets} × {ex.reps}
        </div>
      </div>
      <div className="ex__meta">
        <span>
          Target <b>{ex.weightKg} kg</b>
        </span>
        {ex.lastTime && (
          <>
            <span className="ex__meta-sep">·</span>
            <span>
              Last: <b>{ex.lastTime}</b>
            </span>
          </>
        )}
      </div>
    </li>
  );
}

/* ─── Set row — manual numeric input with optional ± nudges ─── */
function SetRow({
  n,
  set,
  state,
  onWeight,
  onReps,
  onAdjustWeight,
  onAdjustReps,
  onToggle,
}: {
  n: number;
  set: SetState;
  state: "done" | "active" | "pending";
  onWeight: (v: string) => void;
  onReps: (v: string) => void;
  onAdjustWeight: (d: number) => void;
  onAdjustReps: (d: number) => void;
  onToggle: () => void;
}) {
  const weightRef = useRef<HTMLInputElement | null>(null);
  const repsRef = useRef<HTMLInputElement | null>(null);
  const checkRef = useRef<HTMLButtonElement | null>(null);
  const isActive = state === "active";
  const isDone = state === "done";
  const isPending = state === "pending";

  return (
    <div className={`set-row ${isDone ? "is-done" : ""} ${isActive ? "is-active" : ""} ${isPending ? "is-pending" : ""}`}>
      <span className="set-row__num">{n}</span>

      <div className="input-group">
        <button
          className="nudge-btn"
          type="button"
          disabled={isDone}
          onClick={() => onAdjustWeight(-2.5)}
          aria-label="Decrease weight"
        >
          −
        </button>
        <input
          ref={weightRef}
          className="num-input"
          type="number"
          step="2.5"
          inputMode="decimal"
          value={set.weight}
          disabled={isDone}
          placeholder={isPending ? "—" : "0"}
          aria-label="Weight (kg)"
          onChange={(e) => onWeight(e.target.value)}
          onFocus={(e) => setTimeout(() => e.target.select(), 0)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              repsRef.current?.focus();
              repsRef.current?.select();
            }
          }}
        />
        <span className="input-suffix">kg</span>
        <button
          className="nudge-btn"
          type="button"
          disabled={isDone}
          onClick={() => onAdjustWeight(2.5)}
          aria-label="Increase weight"
        >
          +
        </button>
      </div>

      <div className="input-group">
        <button
          className="nudge-btn"
          type="button"
          disabled={isDone}
          onClick={() => onAdjustReps(-1)}
          aria-label="Decrease reps"
        >
          −
        </button>
        <input
          ref={repsRef}
          className="num-input"
          type="number"
          step="1"
          min="0"
          inputMode="numeric"
          value={set.reps}
          disabled={isDone}
          placeholder={isPending ? "—" : "0"}
          aria-label="Reps"
          onChange={(e) => onReps(e.target.value)}
          onFocus={(e) => setTimeout(() => e.target.select(), 0)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              checkRef.current?.click();
            }
          }}
        />
        <button
          className="nudge-btn"
          type="button"
          disabled={isDone}
          onClick={() => onAdjustReps(1)}
          aria-label="Increase reps"
        >
          +
        </button>
      </div>

      <button
        ref={checkRef}
        className={`check ${isDone ? "is-done" : isActive ? "is-on-pending" : ""}`}
        type="button"
        onClick={onToggle}
        aria-label={`Set ${n} ${isDone ? "incomplete" : "complete"}`}
      >
        ✓
      </button>
    </div>
  );
}

/* ─── Rest timer pill ─── */
function RestPill({
  exerciseIndex,
  completedCount,
  nextSet,
}: {
  exerciseIndex: number;
  completedCount: number;
  nextSet: number;
}) {
  const [seconds, setSeconds] = useState(90);

  useEffect(() => {
    setSeconds(90);
  }, [exerciseIndex, completedCount]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const display = seconds <= 0 ? "Go" : `${m}:${s.toString().padStart(2, "0")}`;

  return (
    <div className="rest">
      <div className="rest__icon" />
      <div className="rest__text">
        <div className="rest__label">Resting · next set {nextSet}</div>
        <div className="rest__time" style={seconds <= 0 ? { color: "#10B981" } : undefined}>
          {display}
        </div>
      </div>
      <button className="rest__skip" type="button" onClick={() => setSeconds(0)}>
        Skip
      </button>
    </div>
  );
}

/* ─── Coach nudge card (dark glass) ─── */
function CoachCard() {
  return (
    <li className="coach">
      <div className="coach__avatar"><BrandMark size="sm" /></div>
      <div className="coach__body">
        <div className="coach__label">Coach · <BrandName /></div>
        <p className="coach__msg">
          Bar speed dropped <strong>18%</strong> on set 2. If set 3 feels grindy, pull{" "}
          <strong>5 kg</strong> off and chase the rep target — we&apos;re banking volume, not max
          effort today.
        </p>
        <div className="coach__row">
          <button className="coach__chip" type="button">Drop to 67.5 kg</button>
          <button className="coach__chip" type="button">Hold 70 kg</button>
          <button className="coach__chip" type="button">Why?</button>
        </div>
      </div>
    </li>
  );
}

/* ─── Done view (session complete) ─── */
function DoneView({
  totalVolume,
  durationMin,
  topSet,
  onBack,
}: {
  totalVolume: number;
  durationMin: number;
  topSet: string;
  onBack: () => void;
}) {
  return (
    <div className="v3-root">
      <SiteNav />

      <SessionStage
        completedSets={0}
        totalSets={1}
        progressPct={100}
        elapsedMin={durationMin}
        movements={SESSION.exercises.length}
        volumeKg={Math.round(totalVolume) || 12400}
      />

      <BodySection>
        <div className="summary-card">
          <h2 className="summary-card__title">Faithful work today.</h2>
          <p className="summary-card__msg">
            A clean session. Bench moved well without breaking form. Two more pushes like that and
            we add another 2.5 kg next week.
          </p>
          <div className="summary-grid">
            <div className="summary-grid__cell">
              <div className="summary-grid__label">Volume</div>
              <div className="summary-grid__value">
                {Math.round(totalVolume).toLocaleString() || "12,400"} kg
              </div>
            </div>
            <div className="summary-grid__cell">
              <div className="summary-grid__label">Time</div>
              <div className="summary-grid__value">{durationMin} min</div>
            </div>
            <div className="summary-grid__cell">
              <div className="summary-grid__label">Top set</div>
              <div className="summary-grid__value">{topSet}</div>
            </div>
          </div>
        </div>

        <div className="finish">
          <div className="finish__inner">
            <Link href="/review" className="btn-finish">
              Read the weekly review →
            </Link>
            <button className="btn-quiet" type="button" onClick={onBack}>
              Back to session
            </button>
          </div>
        </div>

        <div className="end-pad" />
      </BodySection>
    </div>
  );
}

/* ─── Helpers ─── */
function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function topSetLabel(setsByEx: SetState[][]): string {
  let best: { weight: number; reps: number } | null = null;
  for (const arr of setsByEx) {
    for (const s of arr) {
      if (!s.done) continue;
      const w = parseFloat(s.weight) || 0;
      const r = parseFloat(s.reps) || 0;
      if (!best || w > best.weight) best = { weight: w, reps: r };
    }
  }
  if (!best) return "82.5 × 8";
  return `${best.weight} × ${best.reps}`;
}
