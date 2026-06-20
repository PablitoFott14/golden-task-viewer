import { Hash, Check, X, Target, FileSearch } from "lucide-react";
import type { ActualRun } from "../data/types";

/**
 * An expected-vs-actual view of the initial run. Task 2 is not folder-shaped,
 * so instead of diffing a produced tree we line each requirement up against
 * what the model actually did, with a pointer to the supporting evidence in
 * the trajectory/workspace and the rubric it ties back to.
 */
export default function RunComparison({ run }: { run: ActualRun }) {
  const fails = run.observations.filter((o) => o.outcome !== "pass");
  const passes = run.observations.filter((o) => o.outcome === "pass");

  return (
    <div>
      <div className="rounded-2xl border border-ink-200/70 bg-surface p-5 shadow-soft">
        <p className="text-[15px] leading-relaxed text-ink-600">{run.summary}</p>
      </div>

      <div className="mt-6 space-y-3">
        {fails.map((o) => (
          <Finding key={o.id} o={o} tone="fail" />
        ))}
        {passes.map((o) => (
          <Finding key={o.id} o={o} tone="pass" />
        ))}
      </div>
    </div>
  );
}

function Finding({
  o,
  tone,
}: {
  o: ActualRun["observations"][number];
  tone: "fail" | "pass";
}) {
  const fail = tone === "fail";
  return (
    <div
      className={
        "overflow-hidden rounded-xl border bg-surface shadow-soft " +
        (fail
          ? "border-rose-200 dark:border-rose-500/40"
          : "border-emerald-200 dark:border-emerald-500/40")
      }
    >
      <div
        className={
          "flex items-center gap-2.5 px-4 py-3 " +
          (fail
            ? "bg-rose-50/70 dark:bg-rose-500/10"
            : "bg-emerald-50/70 dark:bg-emerald-500/10")
        }
      >
        <span
          className={
            "grid h-6 w-6 shrink-0 place-items-center rounded-full text-white " +
            (fail ? "bg-rose-500" : "bg-emerald-500")
          }
        >
          {fail ? <X size={14} /> : <Check size={14} />}
        </span>
        <h4 className="text-sm font-bold text-ink-900">{o.title}</h4>
        {o.rubrics && o.rubrics.length > 0 && (
          <div className="ml-auto flex items-center gap-1.5">
            <Hash size={12} className="text-ink-400" />
            {o.rubrics.map((n) => (
              <span
                key={n}
                className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-600 dark:bg-ink-200/60"
              >
                #{n}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-px bg-ink-100 sm:grid-cols-2">
        {o.expected && (
          <div className="bg-surface p-3.5">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              <Target size={13} /> Expected
            </div>
            <p className="text-[13px] leading-relaxed text-ink-700">{o.expected}</p>
          </div>
        )}
        <div className="bg-surface p-3.5">
          <div
            className={
              "mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide " +
              (fail ? "text-rose-600 dark:text-rose-300" : "text-emerald-600 dark:text-emerald-300")
            }
          >
            {fail ? <X size={13} /> : <Check size={13} />} What the model did
          </div>
          <p className="text-[13px] leading-relaxed text-ink-700">{o.what}</p>
        </div>
      </div>

      {o.evidence && (
        <div className="flex items-start gap-2 border-t border-ink-100 px-3.5 py-2.5">
          <FileSearch size={13} className="mt-0.5 shrink-0 text-ink-400" />
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wide text-ink-400">Evidence · </span>
            <span className="font-mono text-[12px] text-ink-600">{o.evidence}</span>
          </div>
        </div>
      )}
    </div>
  );
}
