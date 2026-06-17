import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lightbulb, Link2, Tag, Scale } from "lucide-react";
import type { Rubric } from "../data/types";
import { cx } from "../lib/assets";

function categoryColor(cat: string): string {
  if (cat.includes("State change")) return "bg-fuchsia-100 text-fuchsia-700";
  if (cat.includes("User-facing")) return "bg-sky-100 text-sky-700";
  if (cat.includes("Agent Behaviour") || cat.includes("Agent Behavior"))
    return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

export default function RubricExplorer({ rubrics }: { rubrics: Rubric[] }) {
  const [view, setView] = useState<"all" | "positive" | "negative">("all");
  const [open, setOpen] = useState<number | null>(rubrics[0]?.n ?? null);

  const totalPositive = rubrics
    .filter((r) => r.points > 0)
    .reduce((s, r) => s + r.points, 0);
  const totalNegative = rubrics
    .filter((r) => r.points < 0)
    .reduce((s, r) => s + r.points, 0);
  const failThreshold = Math.ceil(totalPositive * 0.5);

  const visible = useMemo(
    () =>
      rubrics.filter((r) =>
        view === "all" ? true : view === "positive" ? r.points > 0 : r.points < 0
      ),
    [rubrics, view]
  );

  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ScoreCard label="Criteria" value={rubrics.length} tone="ink" />
        <ScoreCard label="Positive weight" value={`+${totalPositive}`} tone="emerald" />
        <ScoreCard label="Penalty" value={totalNegative} tone="rose" />
        <ScoreCard
          label="≥50% fail bar"
          value={`${failThreshold} pts`}
          tone="brand"
          hint="Model must drop at least half of the positive weight"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "positive", "negative"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cx(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition",
              view === v
                ? "bg-ink-900 text-white"
                : "bg-white text-ink-600 border border-ink-200 hover:border-ink-300"
            )}
          >
            {v === "all" ? "All criteria" : v + " weight"}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {visible.map((r) => {
          const isOpen = open === r.n;
          const positive = r.points > 0;
          return (
            <div
              key={r.n}
              className={cx(
                "overflow-hidden rounded-xl border bg-white shadow-soft transition",
                isOpen ? "border-brand-300 ring-1 ring-brand-200" : "border-ink-200/70"
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
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  )}
                >
                  {positive ? `+${r.points}` : r.points}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-ink-300">#{r.n}</span>
                    <span className={cx("chip", categoryColor(r.category))}>
                      {r.category.split("—")[0].trim()}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm font-medium leading-snug text-ink-800">
                    {r.text}
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
                      <div className="rounded-lg bg-brand-50/60 p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-600">
                          <Lightbulb size={13} /> Rationale
                        </div>
                        <p className="text-[13px] leading-relaxed text-ink-700">
                          {r.rationale}
                        </p>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Meta icon={<Link2 size={13} />} label="Enforces" value={r.enforces} />
                        <Meta
                          icon={<Tag size={13} />}
                          label="Grading category"
                          value={r.category}
                        />
                      </div>
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

function ScoreCard({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string | number;
  tone: "ink" | "emerald" | "rose" | "brand";
  hint?: string;
}) {
  const tones = {
    ink: "text-ink-900",
    emerald: "text-emerald-600",
    rose: "text-rose-600",
    brand: "text-brand-600",
  };
  return (
    <div className="rounded-xl border border-ink-200/70 bg-white p-3.5 shadow-soft">
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
