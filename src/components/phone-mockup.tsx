import * as React from "react";

/**
 * Phone-frame chrome around any content. Used in the hero + practice
 * sections to anchor visuals. CSS-only — no images, no iframes.
 *
 * The frame mimics a modern phone: rounded outer bezel, dark inner
 * screen border, status bar with time + signal indicators, content
 * area in the brand bone tone.
 */
export function PhoneMockup({
  children,
  label,
  time = "9:41",
  className = "",
}: {
  children: React.ReactNode;
  label?: string;
  time?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Devotion app preview"}
      className={`phone-frame ${className}`}
    >
      <div className="phone-screen">
        <div className="phone-status">
          <span className="phone-time">{time}</span>
          <span className="phone-pill" aria-hidden="true" />
          <span className="phone-icons" aria-hidden="true">
            <svg viewBox="0 0 18 12" width="18" height="12" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="0.5" />
              <rect x="4" y="6" width="3" height="6" rx="0.5" />
              <rect x="8" y="3" width="3" height="9" rx="0.5" />
              <rect x="12" y="0" width="3" height="12" rx="0.5" />
            </svg>
            <svg viewBox="0 0 24 12" width="20" height="10" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="0.7" y="1.4" width="19" height="9" rx="2" />
              <rect x="2.5" y="3.2" width="15" height="5.4" rx="1" fill="currentColor" />
              <line x1="21" y1="4.4" x2="21" y2="7.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <div className="phone-body">{children}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pre-built screen contents — small approximations of the real app
   pages. Used inside <PhoneMockup>. Keep these tight; they're
   marketing visuals, not the real product UI.
───────────────────────────────────────────────────────────────────── */

export function TodayScreen() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-ash font-semibold">
          Tuesday · Week 06
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-oxblood font-semibold">
          Day 12
        </span>
      </div>
      <h3 className="display-3 mt-3 text-base">Press &amp; pull</h3>
      <span className="block w-full h-px bg-line mt-3" />
      <ul className="mt-3 divide-y divide-line">
        {[
          ["Bench press", "82.5kg · 4×6", true],
          ["Pendlay row", "70kg · 4×8", true],
          ["Incline DB press", "30kg · 3×10", false],
          ["Face pull", "—", false],
        ].map(([n, m, done]) => (
          <li key={n as string} className="flex items-center justify-between py-2">
            <span className="flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded-full border ${
                  done ? "bg-oxblood border-oxblood" : "border-line"
                }`}
                aria-hidden="true"
              />
              <span className="text-[11px] font-medium">{n as string}</span>
            </span>
            <span className="text-[11px] tab-num text-ink-2">{m as string}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-2.5 rounded-lg bg-oxblood/10 border border-oxblood/20">
        <p className="text-[10px] leading-snug text-ink-2">
          <span className="text-oxblood font-semibold">+2.5kg on bench.</span> Earn it off the
          chest, no bounce.
        </p>
      </div>
    </>
  );
}

export function ReviewScreen() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-ash font-semibold">
          Sunday review
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-oxblood font-semibold">
          Week 06
        </span>
      </div>
      <h3 className="display-3 mt-3 text-base leading-tight">
        Three of four. Bench up 5 kg.
      </h3>
      <p className="text-[11px] leading-snug text-ink-2 mt-2">
        Friday's leg day was the one that slipped. Bench is up 5 kg in two weeks — that's the
        win to bank.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["75%", "Completed"],
          ["42,800", "Volume kg"],
          ["+5kg", "Top lift"],
        ].map(([v, l]) => (
          <div key={l} className="border-t border-line pt-2">
            <div className="text-base font-semibold tab-num">{v}</div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-ash mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <span className="text-[10px] uppercase tracking-[0.18em] text-ash font-semibold">
          The week
        </span>
        <ul className="mt-2 grid gap-1.5">
          {[
            ["Mon", "Press & pull", "done"],
            ["Tue", "Rest", "rest"],
            ["Wed", "Lower", "done"],
            ["Thu", "Rest", "rest"],
            ["Fri", "Lower (missed)", "missed"],
            ["Sat", "Conditioning", "done"],
            ["Sun", "Review", "done"],
          ].map(([d, n, s]) => (
            <li
              key={d}
              className="flex items-center justify-between text-[10px]"
            >
              <span className="text-ash font-semibold w-7">{d}</span>
              <span className="flex-1">{n}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  s === "done"
                    ? "bg-oxblood"
                    : s === "missed"
                    ? "border border-oxblood"
                    : "border border-line"
                }`}
                aria-label={s as string}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function OnboardingScreen() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-oxblood font-semibold">
          Lesson 1 / Goal
        </span>
        <span className="text-[10px] tab-num text-ash">1 of 6</span>
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1">
        {[1, 0, 0, 0, 0, 0].map((on, i) => (
          <span
            key={i}
            className={`h-1 rounded-full ${on ? "bg-oxblood" : "bg-line"}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <h3 className="display-3 mt-4 text-base leading-tight">
        What do you want from the next twelve weeks?
      </h3>
      <p className="text-[11px] leading-snug text-ink-2 mt-2">
        Pick one. The plan is shaped around it.
      </p>
      <ul className="mt-3 grid gap-2">
        {[
          { name: "Get stronger", sub: "Heavier lifts", on: true },
          { name: "Build muscle", sub: "Hypertrophy", on: false },
          { name: "Lose fat", sub: "Lean down", on: false },
          { name: "Stay healthy", sub: "Move well", on: false },
        ].map((opt) => (
          <li
            key={opt.name}
            className={`px-3 py-2.5 rounded-xl border text-left ${
              opt.on
                ? "border-oxblood bg-oxblood/8"
                : "border-line bg-bone"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold">{opt.name}</span>
              {opt.on && (
                <span
                  className="w-3.5 h-3.5 rounded-full bg-oxblood inline-flex items-center justify-center text-bone text-[8px] font-bold"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </div>
            <div className="text-[10px] text-ash mt-0.5">{opt.sub}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
