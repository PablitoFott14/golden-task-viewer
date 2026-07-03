import { Sparkles } from "lucide-react";
import { cx } from "../lib/assets";

/**
 * Shared "dated updates" navigation strip used by both the Latest Alignments
 * page and the Spec Change Log — keeps the two logs visually and
 * interactively consistent. The newest entry (index 0 of the source array)
 * always gets the "Latest" badge.
 */

export interface TimelineEntry {
  id: string;
  date: string;
  badge: string;
  title: string;
  summary: string;
}

export function LatestBadge({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "chip bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
        className
      )}
    >
      <Sparkles size={11} /> Latest
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
    <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
      {entries.map((e, i) => {
        const isLatest = i === 0;
        const isActive = e.id === activeId;
        return (
          <button
            key={e.id}
            onClick={() => onSelect(e.id)}
            aria-pressed={isActive}
            className={cx(
              "group relative w-64 shrink-0 rounded-xl border p-3.5 text-left transition lg:w-full",
              isActive
                ? "border-brand-400 bg-brand-50 shadow-glow dark:border-brand-500/50 dark:bg-brand-500/10"
                : "border-ink-200/70 bg-surface hover:border-brand-300 hover:shadow-soft"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-bold text-brand-600 dark:text-brand-300">{e.date}</span>
              {isLatest && <LatestBadge />}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className={cx(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  isActive
                    ? "bg-brand-600 text-white"
                    : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
                )}
              >
                {e.badge}
              </span>
            </div>
            <div className="mt-1.5 text-[13px] font-bold leading-snug text-ink-900">{e.title}</div>
            <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-ink-500">{e.summary}</p>
          </button>
        );
      })}
    </div>
  );
}
