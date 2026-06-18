import {
  Terminal,
  AlertOctagon,
  AlertTriangle,
  Ghost,
  CheckCircle2,
  Hash,
} from "lucide-react";
import type { ActualRun, RunObservation } from "../data/types";
import { cx } from "../lib/assets";
import FolderTree from "./FolderTree";

const impactStyle: Record<
  RunObservation["impact"],
  { chip: string; ring: string; icon: React.ReactNode; label: string }
> = {
  fail: {
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
    ring: "border-rose-200 dark:border-rose-500/40",
    icon: <AlertOctagon size={15} />,
    label: "Failure",
  },
  partial: {
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
    ring: "border-amber-200 dark:border-amber-500/40",
    icon: <AlertTriangle size={15} />,
    label: "Partial",
  },
  hallucination: {
    chip: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-200",
    ring: "border-fuchsia-200 dark:border-fuchsia-500/40",
    icon: <Ghost size={15} />,
    label: "Hallucination",
  },
  ok: {
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    ring: "border-emerald-200 dark:border-emerald-500/40",
    icon: <CheckCircle2 size={15} />,
    label: "Held up",
  },
};

export default function TrajectoryReport({ run }: { run: ActualRun }) {
  return (
    <div>
      <div className="rounded-2xl border border-ink-200/70 bg-surface p-5 shadow-soft">
        <p className="text-[15px] leading-relaxed text-ink-600">{run.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">
            <Terminal size={13} /> Tool calls
          </span>
          {run.toolStats.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-1.5 rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[11px] text-ink-600"
            >
              {t.label}
              <span className="font-bold text-ink-800">{t.value}</span>
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-100 px-2 py-0.5 font-mono text-[11px] text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">
            email / send
            <span className="font-bold">0</span>
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-bold text-ink-900">
            What it actually produced
          </h3>
          <p className="mb-3 text-[13px] leading-relaxed text-ink-500">
            The real folder tree from the seed run. Compare it against the Ground Truth above —
            the colored chips mark where it diverged.
          </p>
          <FolderTree root={run.producedTree} />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-ink-900">
            What went wrong — and what it teaches
          </h3>
          <div className="space-y-3">
            {run.observations.map((o) => {
              const st = impactStyle[o.impact];
              return (
                <div
                  key={o.id}
                  className={cx(
                    "rounded-xl border bg-surface p-4 shadow-soft",
                    st.ring
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-ink-900">{o.title}</h4>
                    <span className={cx("chip shrink-0", st.chip)}>
                      {st.icon}
                      {st.label}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{o.what}</p>
                  <p className="mt-2 rounded-lg bg-ink-50 px-3 py-2 text-[13px] leading-relaxed text-ink-700">
                    <span className="font-semibold text-brand-700 dark:text-brand-300">
                      Lesson:{" "}
                    </span>
                    {o.lesson}
                  </p>
                  {o.rubrics && o.rubrics.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Hash size={12} className="text-ink-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                        Rubrics hit
                      </span>
                      {o.rubrics.map((n) => (
                        <span
                          key={n}
                          className="rounded bg-rose-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
                        >
                          #{n}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
