import { FileText, ArrowDown } from "lucide-react";
import type { GtfaCalcView } from "../data/types";
import { cx } from "../lib/assets";

/**
 * A calculation-chain GTFA visualization. Task 3's deliverable is a derived
 * financial answer, so showing how each number follows from the one before it
 * teaches the reasoning far better than a folder tree or a slide deck would.
 * Each track is an ordered dependency: a missed step at the top cascades down.
 */
export default function CalcTracks({ view }: { view: GtfaCalcView }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
        <FileText size={16} className="text-brand-500" />
        <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[12px] text-brand-700 dark:bg-ink-200/60 dark:text-brand-300">
          {view.artifactName}
        </code>
        <span className="text-ink-400">— derived in two dependent tracks</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {view.tracks.map((track) => (
          <div key={track.title} className="rounded-2xl border border-ink-200/70 bg-surface p-5 shadow-soft">
            <h4 className="mb-4 text-sm font-bold text-ink-900">{track.title}</h4>
            <div className="space-y-1">
              {track.steps.map((s, i) => (
                <div key={s.label}>
                  <div
                    className={cx(
                      "rounded-xl border p-3",
                      s.highlight
                        ? "border-brand-300 bg-brand-50/60 dark:border-brand-500/40 dark:bg-brand-500/10"
                        : "border-ink-200/70 bg-ink-50/40"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-semibold text-ink-800">{s.label}</span>
                      <span
                        className={cx(
                          "shrink-0 font-mono text-sm font-extrabold tabular-nums",
                          s.highlight ? "text-brand-700 dark:text-brand-300" : "text-ink-900"
                        )}
                      >
                        {s.value}
                      </span>
                    </div>
                    {s.expression && (
                      <div className="mt-1 font-mono text-[11px] text-ink-400">{s.expression}</div>
                    )}
                    {s.note && (
                      <div className="mt-1 text-[12px] leading-relaxed text-ink-500">{s.note}</div>
                    )}
                  </div>
                  {i < track.steps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown size={14} className="text-ink-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
