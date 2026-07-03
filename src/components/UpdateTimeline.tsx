import { Sparkles } from "lucide-react";
import { cx } from "../lib/assets";

/**
 * Shared "dated updates" switcher used by both the Urgent Alignments page and
 * the Spec Doc change log, so the two logs read as one system. Rendered as a slim
 * strip of date pills: supporting navigation, deliberately compact so the
 * content itself stays the focus. The newest entry (index 0 of the source
 * array) always carries the "Latest" badge.
 */

export interface TimelineEntry {
  id: string;
  /** Display date, e.g. "03 Jul 2026". */
  date: string;
  /** Tiny qualifier shown after the date, e.g. "v2" or "6 topics". */
  badge: string;
  /** Used for the tooltip; the full title is shown by the page's content header. */
  title: string;
  summary: string;
}

export function LatestBadge({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
        className
      )}
    >
      <Sparkles size={10} /> Latest
    </span>
  );
}

export function UpdateTimeline({
  entries,
  activeId,
  onSelect,
}: {
  entries: TimelineEntry[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {entries.map((e, i) => {
        const isActive = e.id === activeId;
        return (
          <button
            key={e.id}
            onClick={() => onSelect(e.id)}
            aria-pressed={isActive}
            title={`${e.title} — ${e.summary}`}
            className={cx(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border py-1 pl-2.5 pr-2 text-[12px] font-semibold transition",
              isActive
                ? "border-brand-500 bg-brand-600 text-white shadow-glow"
                : "border-ink-200/80 bg-surface text-ink-600 hover:border-brand-300 hover:text-ink-900"
            )}
          >
            <span className="font-mono text-[11px] font-bold">{e.date}</span>
            <span
              className={cx(
                "rounded-full px-1.5 py-px text-[10px] font-bold",
                isActive ? "bg-white/20 text-white" : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
              )}
            >
              {e.badge}
            </span>
            {i === 0 && <LatestBadge />}
          </button>
        );
      })}
    </div>
  );
}
