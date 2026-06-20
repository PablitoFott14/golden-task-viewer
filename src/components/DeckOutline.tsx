import { CalendarClock, Mail, Presentation, Ban } from "lucide-react";
import type { GtfaDeckView } from "../data/types";

/**
 * A deck-shaped GTFA visualization. Task 2's deliverable is a slide deck plus
 * two state changes, so a slide storyboard reads far more naturally than a
 * folder tree — each slide card mirrors what the correct deck should contain.
 */
export default function DeckOutline({ view }: { view: GtfaDeckView }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
          <Presentation size={16} className="text-brand-500" />
          <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[12px] text-brand-700 dark:bg-ink-200/60 dark:text-brand-300">
            {view.artifactName}
          </code>
          <span className="text-ink-400">— {view.slides.length} slides</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {view.slides.map((s) => (
            <div
              key={s.n}
              className={
                "relative flex flex-col rounded-xl border bg-surface p-4 shadow-soft " +
                (s.empty
                  ? "border-dashed border-ink-300"
                  : "border-ink-200/70")
              }
            >
              {/* 16:9 slide-corner accent */}
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-6 w-9 shrink-0 place-items-center rounded bg-ink-900 text-[11px] font-bold text-ink-50">
                  {s.n}
                </span>
                <h4 className="text-[13px] font-bold leading-snug text-ink-900">{s.title}</h4>
              </div>
              {s.empty ? (
                <p className="flex items-center gap-1.5 text-[12px] font-medium italic text-ink-400">
                  <Ban size={13} /> {s.body}
                </p>
              ) : (
                <p className="text-[12px] leading-relaxed text-ink-600">{s.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-ink-900">…and the two state changes</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {view.stateChanges.map((c) => (
            <div
              key={c.title}
              className="flex gap-3 rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-4 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-300">
                {c.kind === "calendar" ? <CalendarClock size={18} /> : <Mail size={18} />}
              </div>
              <div>
                <div className="text-[13px] font-bold text-ink-900">{c.title}</div>
                <div className="mt-0.5 text-[12px] leading-relaxed text-ink-600">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
