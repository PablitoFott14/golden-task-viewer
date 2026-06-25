import { AlertTriangle, Lightbulb, XCircle } from "lucide-react";
import { commonErrors } from "../data/commonErrors";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

const freqColor: Record<string, string> = {
  Frequent: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  Occasional: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  Rare: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
};

export default function CommonErrors() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Common Errors"
          title="Mistakes that sink a task"
          sub="The recurring failures the customer flags in audit, drawn straight from the Complexity Playbook. Each one pairs what goes wrong with how to avoid it."
        />
      </Reveal>

      <Reveal>
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-rose-300 bg-rose-50/70 p-4 dark:border-rose-500/40 dark:bg-rose-500/10">
          <AlertTriangle size={20} className="shrink-0 text-rose-600 dark:text-rose-400" />
          <p className="text-base font-bold text-ink-900">
            Avoid these mistakes if you want to succeed in the project.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 space-y-4">
        {commonErrors.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.04}>
            <div className="overflow-hidden rounded-2xl border border-ink-200/70 bg-surface shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 p-5">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
                    <XCircle size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-ink-900">{e.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-600">{e.problem}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-200/60">{e.phase}</span>
                  <span className={cx("chip", freqColor[e.frequency])}>{e.frequency}</span>
                </div>
              </div>
              <div className="flex gap-2.5 bg-emerald-50/50 p-4 dark:bg-emerald-500/10">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <p className="text-[13px] leading-relaxed text-ink-700">
                  <strong className="text-emerald-700 dark:text-emerald-300">How to avoid it: </strong>
                  {e.fix}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
