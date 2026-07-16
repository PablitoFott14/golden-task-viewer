import { FileText, CheckCircle2, XCircle } from "lucide-react";
import type { GtfaIssueView } from "../data/types";

/**
 * An issue-board GTFA visualization. Task 4's deliverable is a status report
 * over 11 independent bugs, not a dependent calc chain or a slide deck, so
 * each row stands alone: a ticket key, a resolved/unresolved verdict, and the
 * one piece of RC evidence that verdict is grounded in. The green/red palette
 * intentionally mirrors the Yes/No outcome colors from the task's own
 * refund_mod_QA_results.svg format spec.
 */
export default function IssueBoard({ view }: { view: GtfaIssueView }) {
  const resolvedCount = view.issues.filter((i) => i.resolved).length;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
        <FileText size={16} className="text-brand-500" />
        <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[12px] text-brand-700 dark:bg-ink-200/60 dark:text-brand-300">
          {view.artifactName}
        </code>
        <span className="text-ink-400">
          — {resolvedCount} resolved / {view.issues.length - resolvedCount} unresolved
        </span>
      </div>

      <div className="space-y-2">
        {view.issues.map((issue) => (
          <div
            key={issue.key}
            className={`flex items-start gap-3 rounded-xl border p-3 ${
              issue.resolved
                ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/5"
                : "border-rose-200 bg-rose-50/50 dark:border-rose-500/30 dark:bg-rose-500/5"
            }`}
          >
            {issue.resolved ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <XCircle size={18} className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-[13px] font-semibold text-ink-800">{issue.name}</span>
                <code className="font-mono text-[11px] text-ink-400">{issue.key}</code>
                <span
                  className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    issue.resolved
                      ? "bg-emerald-600 text-white"
                      : "bg-rose-600 text-white"
                  }`}
                >
                  {issue.resolved ? "Yes" : "No"}
                </span>
              </div>
              <div className="mt-1 text-[12px] leading-relaxed text-ink-500">
                <code className="text-ink-400">{issue.evidence}</code> — {issue.reason}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
