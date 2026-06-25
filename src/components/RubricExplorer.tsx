import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Lightbulb,
  Link2,
  Scale,
  ClipboardCheck,
  Check,
  X,
  AlertTriangle,
  Activity,
  Crosshair,
  CheckCircle2,
} from "lucide-react";
import type { Rubric, RubricDesignNote } from "../data/types";
import { cx } from "../lib/assets";

function categoryColor(cat: string): string {
  if (cat.includes("State change")) return "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300";
  if (cat.includes("User-facing")) return "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
  if (cat.includes("Agent Behaviour") || cat.includes("Agent Behavior"))
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
}

/** A rubric "passes" when a positive criterion is Present, or a negative criterion is Not Present. */
function isSatisfied(r: Rubric): boolean {
  return r.points > 0 ? r.status === "present" : r.status === "not-present";
}

/** Render text faithfully, turning `backtick` spans from the source into inline code. */
function renderRubricText(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-ink-100 px-1 py-0.5 font-mono text-[12px] text-brand-700 dark:bg-ink-200/60 dark:text-brand-300"
      >
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

type View = "all" | "missed" | "passed" | "negative";

export default function RubricExplorer({
  rubrics,
  designNotes = [],
}: {
  rubrics: Rubric[];
  designNotes?: RubricDesignNote[];
}) {
  const [view, setView] = useState<View>("all");
  const [open, setOpen] = useState<number | null>(rubrics[0]?.n ?? null);

  const totalPositive = rubrics
    .filter((r) => r.points > 0)
    .reduce((s, r) => s + r.points, 0);
  const failThreshold = Math.ceil(totalPositive * 0.5);
  const earnedPositive = rubrics
    .filter((r) => r.points > 0 && r.status === "present")
    .reduce((s, r) => s + r.points, 0);
  const penaltyIncurred = rubrics
    .filter((r) => r.points < 0 && r.status === "present")
    .reduce((s, r) => s + r.points, 0);
  const netScore = earnedPositive + penaltyIncurred;
  const missedCount = rubrics.filter((r) => r.points > 0 && r.status !== "present").length;
  const negativesTriggered = rubrics.filter((r) => r.points < 0 && r.status === "present").length;
  const belowBar = earnedPositive < failThreshold;

  const visible = useMemo(
    () =>
      rubrics.filter((r) => {
        if (view === "all") return true;
        if (view === "negative") return r.points < 0;
        if (view === "passed") return isSatisfied(r);
        return !isSatisfied(r); // missed
      }),
    [rubrics, view]
  );

  return (
    <div>
      {/* ---- Result of the initial run ---- */}
      <div
        className={cx(
          "mb-5 rounded-xl border p-4",
          belowBar
            ? "border-rose-300 bg-rose-50/60 dark:border-rose-500/40 dark:bg-rose-500/10"
            : "border-emerald-300 bg-emerald-50/60 dark:border-emerald-500/40 dark:bg-emerald-500/10"
        )}
      >
        <div className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
          <Activity size={16} className={belowBar ? "text-rose-600" : "text-emerald-600"} />
          How the initial trajectory scored
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
          Each criterion below is marked <strong>Present</strong> / <strong>Not Present</strong> against the
          model's first (seed) run. The model earned{" "}
          <strong className="text-ink-900">
            {earnedPositive} of {totalPositive}
          </strong>{" "}
          positive points{penaltyIncurred < 0 ? <>, minus a <strong className="text-rose-600">{penaltyIncurred}</strong> negative penalty,</> : <> </>}{" "}
          for a net of <strong className="text-ink-900">{netScore}</strong>.{" "}
          {belowBar ? (
            <>That is below the <strong>{failThreshold}-point</strong> bar, which clears the threshold to
            move on to the Silver Trajectory.</>
          ) : (
            <>That is at or above the <strong>{failThreshold}-point</strong> bar.</>
          )}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <ScoreCard label="Net score" value={`${netScore} / ${totalPositive}`} tone={belowBar ? "rose" : "emerald"} />
          <ScoreCard label="≥50% bar" value={`${failThreshold} pts`} tone="brand" hint="Half of positive weight" />
          <ScoreCard label="Positive · Not Present" value={missedCount} tone="rose" />
          <ScoreCard label="Negative · Present" value={negativesTriggered} tone="amber" />
        </div>
      </div>

      {designNotes.length > 0 && (
        <div className="mb-5 rounded-xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
          <div className="mb-1 flex items-center gap-2 text-sm font-extrabold text-brand-700 dark:text-brand-300">
            <ClipboardCheck size={16} /> Rubric Design Logic
          </div>
          <p className="mb-3 text-[12px] leading-relaxed text-ink-500">
            Before reading individual criteria, internalize the rules that shaped this whole set.
          </p>
          <div className="grid gap-3 lg:grid-cols-2">
            {designNotes.map((note) => (
              <div key={note.title} className="rounded-lg border border-white/80 bg-surface/70 p-3 dark:border-ink-200/60">
                <h3 className="text-[13px] font-bold text-ink-900">{note.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-600">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {([
          ["all", `All ${rubrics.length}`],
          ["missed", `Not satisfied ${missedCount}`],
          ["passed", "Satisfied"],
          ["negative", "Negative"],
        ] as [View, string][]).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cx(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              view === v
                ? "bg-ink-900 text-ink-50 dark:bg-ink-200 dark:text-ink-900"
                : "bg-surface text-ink-600 border border-ink-200 hover:border-ink-300"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {visible.map((r) => {
          const isOpen = open === r.n;
          const positive = r.points > 0;
          const satisfied = isSatisfied(r);
          const negativePresent = !positive && r.status === "present";
          return (
            <div
              key={r.n}
              className={cx(
                "overflow-hidden rounded-xl border bg-surface shadow-soft transition",
                negativePresent
                  ? "border-rose-300 ring-1 ring-rose-200 dark:border-rose-500/50 dark:ring-rose-500/30"
                  : isOpen
                    ? "border-brand-300 ring-1 ring-brand-200 dark:border-brand-500/50 dark:ring-brand-500/30"
                    : "border-ink-200/70"
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : r.n)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span
                  className={cx(
                    "mt-0.5 grid h-8 w-12 shrink-0 place-items-center rounded-lg text-sm font-extrabold tabular-nums",
                    positive
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300"
                  )}
                >
                  {positive ? `+${r.points}` : r.points}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-ink-300">#{r.n}</span>
                    <span className={cx("chip", categoryColor(r.category))}>
                      {r.category.split("—")[0].trim()}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-200/60">
                      <Crosshair size={12} /> {r.evalTarget}
                    </span>
                    <StatusBadge rubric={r} />
                  </span>
                  <span className="mt-1.5 block text-sm font-medium leading-snug text-ink-800">
                    {renderRubricText(r.text)}
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  className={cx(
                    "mt-1 shrink-0 text-ink-400 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 border-t border-ink-100 px-4 pb-4 pt-3">
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Meta icon={<Link2 size={13} />} label="What this check enforces" value={r.enforces} />
                        {r.observed && (
                          <div
                            className={cx(
                              "rounded-lg border p-2.5",
                              satisfied
                                ? "border-emerald-100 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                                : "border-rose-100 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/10"
                            )}
                          >
                            <div
                              className={cx(
                                "mb-0.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide",
                                satisfied ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
                              )}
                            >
                              <Activity size={13} /> In the initial run
                            </div>
                            <p className="text-[13px] leading-snug text-ink-700">{r.observed}</p>
                          </div>
                        )}
                      </div>

                      {(r.whyCorrect || r.whyImportant || r.whatWrong) && (
                        <div className="space-y-2 rounded-lg border border-brand-100 bg-brand-50/40 p-3 dark:border-brand-500/20 dark:bg-brand-500/10">
                          {r.whyCorrect && (
                            <Justification
                              icon={<CheckCircle2 size={13} />}
                              tone="brand"
                              label="Why the rubric is correct"
                              body={r.whyCorrect}
                            />
                          )}
                          {r.whyImportant && (
                            <Justification
                              icon={<Lightbulb size={13} />}
                              tone="brand"
                              label="Why the rubric is important"
                              body={r.whyImportant}
                            />
                          )}
                          {r.whatWrong && (
                            <Justification
                              icon={<X size={13} />}
                              tone="rose"
                              label="What the model did wrong"
                              body={r.whatWrong}
                            />
                          )}
                        </div>
                      )}

                      {r.evidence && r.evidence.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Scale size={13} className="text-ink-400" />
                          <span className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
                            Grounded in
                          </span>
                          {r.evidence.map((e) => (
                            <span
                              key={e}
                              className="rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[11px] text-ink-600"
                            >
                              {e}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Preserves the "Present" / "Not Present" terminology while showing the pass/fail meaning. */
function StatusBadge({ rubric: r }: { rubric: Rubric }) {
  const present = r.status === "present";
  const negativePresent = r.points < 0 && present;
  const satisfied = isSatisfied(r);

  if (negativePresent) {
    return (
      <span className="chip bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">
        <AlertTriangle size={12} /> Present
      </span>
    );
  }
  return (
    <span
      className={cx(
        "chip",
        satisfied
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
          : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
      )}
    >
      {satisfied ? <Check size={12} /> : <X size={12} />}
      {present ? "Present" : "Not Present"}
    </span>
  );
}

function ScoreCard({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string | number;
  tone: "ink" | "emerald" | "rose" | "brand" | "amber";
  hint?: string;
}) {
  const tones = {
    ink: "text-ink-900",
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-600 dark:text-rose-400",
    brand: "text-brand-600 dark:text-brand-400",
    amber: "text-amber-600 dark:text-amber-400",
  };
  return (
    <div className="rounded-xl border border-ink-200/70 bg-surface p-3.5 shadow-soft">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <div className={cx("mt-1 text-xl font-extrabold tabular-nums", tones[tone])}>
        {value}
      </div>
      {hint && <div className="mt-0.5 text-[10px] leading-tight text-ink-400">{hint}</div>}
    </div>
  );
}

function Justification({
  icon,
  label,
  body,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
  tone: "brand" | "rose";
}) {
  const head =
    tone === "rose"
      ? "text-rose-700 dark:text-rose-300"
      : "text-brand-700 dark:text-brand-300";
  return (
    <div>
      <div className={cx("mb-0.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide", head)}>
        {icon} {label}
      </div>
      <p className="text-[13px] leading-relaxed text-ink-700">{body}</p>
    </div>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-2.5">
      <div className="mb-0.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">
        {icon}
        {label}
      </div>
      <p className="text-[13px] leading-snug text-ink-700">{value}</p>
    </div>
  );
}
