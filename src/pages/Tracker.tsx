import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trophy,
  AlertTriangle,
  TrendingDown,
  ChevronDown,
  Calendar,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { weeklyEntries, type WeekEntry } from "../data/tracker";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

const freqColor: Record<string, string> = {
  Frequent: "bg-rose-100 text-rose-700",
  Occasional: "bg-amber-100 text-amber-700",
  Rare: "bg-emerald-100 text-emerald-700",
};

export default function Tracker() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="CB Tracker"
          title="Weekly Highlights"
          sub="Track patterns and progress over time. Each week captures the best-performing task, the worst, and the most common errors CBs should watch out for."
        />
      </Reveal>

      {weeklyEntries.length === 0 ? (
        <div className="mt-12 rounded-2xl border-2 border-dashed border-ink-200 p-12 text-center">
          <Calendar size={32} className="mx-auto text-ink-300" />
          <p className="mt-3 text-sm font-semibold text-ink-600">No weeks tracked yet</p>
          <p className="mt-1 text-xs text-ink-400">
            Weekly entries will appear here as they are added.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {weeklyEntries.map((entry, i) => (
            <Reveal key={entry.week} delay={i * 0.05}>
              <WeekCard entry={entry} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <div className="mt-12 rounded-xl border border-ink-200/70 bg-white p-5 text-sm text-ink-600 shadow-soft">
          <p className="font-semibold text-ink-800">How this works</p>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            <li>
              Each week gets one entry with <strong>Best Task</strong>,{" "}
              <strong>Worst Task</strong>, and <strong>Common Errors</strong>.
            </li>
            <li>
              New weeks are added at the top of{" "}
              <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-xs text-brand-700">
                src/data/tracker.ts
              </code>{" "}
              — follow the existing format.
            </li>
            <li>
              Over time, this timeline shows which error patterns persist and
              where CBs are improving.
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

function WeekCard({
  entry,
  defaultOpen,
}: {
  entry: WeekEntry;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cx(
        "overflow-hidden rounded-2xl border bg-white shadow-soft transition",
        open ? "border-brand-200" : "border-ink-200/70"
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-ink-50/50"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Calendar size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-ink-900">{entry.week}</span>
          <span className="block text-sm text-ink-500">{entry.range}</span>
        </span>
        <span className="flex items-center gap-3 text-xs text-ink-400">
          <span>{entry.commonErrors.length} errors tracked</span>
          <ChevronDown
            size={18}
            className={cx("transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-ink-100 p-5">
              {/* Best */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <Trophy size={16} /> Best Task of the Week
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-900">
                  {entry.best.title}
                </p>
                {entry.best.contributor && (
                  <p className="mt-0.5 text-xs text-ink-500">
                    by {entry.best.contributor}
                  </p>
                )}
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
                  {entry.best.why}
                </p>
              </div>

              {/* Worst */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-700">
                  <TrendingDown size={16} /> Worst Task of the Week
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-900">
                  {entry.worst.title}
                </p>
                {entry.worst.contributor && (
                  <p className="mt-0.5 text-xs text-ink-500">
                    by {entry.worst.contributor}
                  </p>
                )}
                <ul className="mt-2 space-y-1">
                  {entry.worst.issues.map((issue, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[13px] leading-relaxed text-ink-600"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common errors */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                  <AlertTriangle size={16} className="text-amber-500" /> Common
                  Errors
                </div>
                <div className="space-y-2.5">
                  {entry.commonErrors.map((e, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-ink-200/70 bg-ink-50/50 p-3.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-ink-800">
                          {e.error}
                        </p>
                        <span
                          className={cx(
                            "chip shrink-0",
                            freqColor[e.frequency]
                          )}
                        >
                          {e.frequency}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-2 rounded-lg bg-white p-2.5 text-[13px] leading-relaxed text-ink-600">
                        <Lightbulb
                          size={14}
                          className="mt-0.5 shrink-0 text-brand-500"
                        />
                        {e.tip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {entry.notes && (
                <div className="flex gap-2.5 rounded-lg border border-ink-100 bg-white p-3 text-[13px] text-ink-600">
                  <MessageSquare
                    size={14}
                    className="mt-0.5 shrink-0 text-ink-400"
                  />
                  <span>{entry.notes}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
