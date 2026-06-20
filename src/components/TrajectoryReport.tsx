import { Hash } from "lucide-react";
import type { ActualRun } from "../data/types";
import FolderTree from "./FolderTree";

export default function TrajectoryReport({ run }: { run: ActualRun }) {
  return (
    <div>
      <div className="rounded-2xl border border-ink-200/70 bg-surface p-5 shadow-soft">
        <p className="text-[15px] leading-relaxed text-ink-600">{run.summary}</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {run.producedTree && (
          <div>
            <h3 className="mb-3 text-sm font-bold text-ink-900">
              What it actually produced
            </h3>
            <p className="mb-3 text-[13px] leading-relaxed text-ink-500">
              The folder tree from the seed run. Compare it against the Ground Truth above — the colored
              chips mark where it diverged.
            </p>
            <FolderTree root={run.producedTree} />
          </div>
        )}
        <div>
          <h3 className="mb-3 text-sm font-bold text-ink-900">What the model did</h3>
          <div className="space-y-3">
            {run.observations.map((o) => (
              <div
                key={o.id}
                className="rounded-xl border border-ink-200/70 bg-surface p-4 shadow-soft"
              >
                <h4 className="text-sm font-bold text-ink-900">{o.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{o.what}</p>
                {o.rubrics && o.rubrics.length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Hash size={12} className="text-ink-400" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                      Rubrics
                    </span>
                    {o.rubrics.map((n) => (
                      <span
                        key={n}
                        className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-600"
                      >
                        #{n}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
