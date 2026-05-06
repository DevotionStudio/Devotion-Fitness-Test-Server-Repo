import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Review() {
  const completion = 75;
  const verdict = `Three of four sessions in. Friday's leg day was the one that slipped — same as last week. Bench is up 5 kg in two weeks; that's the win you should bank. Next week we move legs to Tuesday — the data shows you start strong and fade by Friday.`;
  const focus = `Lower-body consistency is the unlock. Same volume, just earlier in the week.`;

  const week = [
    { d: "Mon", state: "done" as const, label: "Press & pull" },
    { d: "Tue", state: "rest" as const, label: "Rest" },
    { d: "Wed", state: "done" as const, label: "Lower" },
    { d: "Thu", state: "rest" as const, label: "Rest" },
    { d: "Fri", state: "missed" as const, label: "Lower (missed)" },
    { d: "Sat", state: "done" as const, label: "Conditioning" },
    { d: "Sun", state: "rest" as const, label: "Rest" },
  ];

  return (
    <main className="phone container-d pt-6">
      <header className="flex items-center justify-between pt-2">
        <Link href="/" className="inline-flex items-center" aria-label="Devotion home">
          <Wordmark size="sm" expandable plateAccent />
        </Link>
        <div className="flex items-center gap-4">
          <span className="roman">VI</span>
          <ThemeToggle />
        </div>
      </header>

      <div className="mt-10">
        <span className="eyebrow eyebrow-ox">Sunday review · Week six</span>
        <h1 className="display-2 mt-4">
          Three of four. Bench up 5 kg.
        </h1>
        <span className="rule mt-7 block" />
      </div>

      {/* Stats row */}
      <dl className="mt-7 grid grid-cols-3 gap-4">
        <Stat l="Completed" v={`${completion}%`} accent />
        <Stat l="Volume" v="42,800" sub="kg · +8% vs prev" />
        <Stat l="Top lift" v="Bench" sub="↑ 5 kg" />
      </dl>

      {/* Week ledger */}
      <div className="mt-9">
        <div className="flex items-baseline justify-between mb-3">
          <span className="eyebrow eyebrow-ink">The week</span>
          <span className="text-xs text-ash">7 days</span>
        </div>
        <ol className="border-y border-line divide-y divide-line2">
          {week.map((row, i) => (
            <li key={i} className="flex items-baseline justify-between py-3">
              <div className="flex items-baseline gap-4">
                <span className="text-xs uppercase tracking-[0.18em] text-ash w-10">{row.d}</span>
                <span
                  className={`text-sm ${
                    row.state === "missed"
                      ? "text-oxblood italic-serif"
                      : row.state === "rest"
                      ? "italic-serif text-ash"
                      : "text-ink"
                  }`}
                >
                  {row.label}
                </span>
              </div>
              <Mark state={row.state} />
            </li>
          ))}
        </ol>
      </div>

      <section className="mt-9">
        <span className="eyebrow eyebrow-ox">Honest verdict</span>
        <p className="quote quote-ox mt-3">{verdict}</p>
      </section>

      <section className="mt-7">
        <span className="eyebrow eyebrow-ink">Next week's focus</span>
        <p className="quote mt-3">{focus}</p>
      </section>

      <div className="mt-auto pt-12 grid gap-3">
        <Link href="/today" className="btn-d-accent block text-center">Begin the new week</Link>
        <Link href="/" className="btn-d-quiet block text-center">Back to the manifesto</Link>
      </div>
    </main>
  );
}

function Stat({ l, v, sub, accent }: { l: string; v: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`border-t pt-3 ${accent ? "border-oxblood" : "border-line"}`}>
      <dt className="eyebrow eyebrow-ink">{l}</dt>
      <dd className={`numeric-md mt-2 tab-num ${accent ? "text-oxblood" : ""}`}>{v}</dd>
      {sub && <p className="text-xs text-ash mt-1">{sub}</p>}
    </div>
  );
}

function Mark({ state }: { state: "done" | "rest" | "missed" }) {
  if (state === "done")
    return <span className="w-3 h-3 rounded-full bg-oxblood inline-block" aria-label="done" />;
  if (state === "missed")
    return <span className="w-3 h-3 rounded-full border border-oxblood inline-block" aria-label="missed" />;
  return <span className="w-3 h-3 rounded-full border border-line inline-block" aria-label="rest" />;
}
