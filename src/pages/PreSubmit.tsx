import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  GitBranch,
  ScrollText,
  FlaskConical,
  MessageSquareQuote,
  Check,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Send,
} from "lucide-react";
import { checklistSections, totalChecklistItems, type ChecklistSection } from "../data/preSubmitChecklist";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

const STORAGE_KEY = "openclaw-presubmit-checks";

const sectionIcon: Record<string, typeof FileText> = {
  prompt: FileText,
  inputs: ImageIcon,
  silver: GitBranch,
  rubrics: ScrollText,
  tests: FlaskConical,
  justifications: MessageSquareQuote,
};

export default function PreSubmit() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [justReset, setJustReset] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [checked]);

  const toggle = (id: string) => {
    setJustReset(false);
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const submit = () => {
    setChecked(new Set());
    setJustReset(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => setJustReset(false), 4000);
  };

  const done = checked.size;
  const pct = Math.round((done / totalChecklistItems) * 100);
  const allDone = done === totalChecklistItems;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Pre-Submit Checklist"
          title="One last pass before you ship"
          sub="A fast final gate, not a document to read top to bottom. Tick each item as you confirm it; your progress is saved. When the task is out the door, hit Submit to reset for the next one."
        />
      </Reveal>

      {/* Sticky progress */}
      <div className="sticky top-16 z-30 -mx-4 mt-6 bg-ink-50/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-200/70">
            <motion.div
              className={cx("h-full rounded-full", allDone ? "bg-emerald-500" : "bg-brand-500")}
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="shrink-0 text-sm font-bold text-ink-700">
            {done}/{totalChecklistItems}
          </span>
        </div>
        <AnimatePresence>
          {justReset && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 size={15} /> Checklist reset — ready for the next task.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Sections */}
      <div className="mt-6 space-y-5">
        {checklistSections.map((section, i) => (
          <Reveal key={section.id} delay={i * 0.03}>
            <SectionCard section={section} checked={checked} onToggle={toggle} />
          </Reveal>
        ))}
      </div>

      {/* Submit */}
      <Reveal>
        <div className="mt-8 rounded-2xl border border-ink-200/70 bg-surface p-5 shadow-soft">
          {allDone ? (
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50/70 p-3.5 dark:border-emerald-500/40 dark:bg-emerald-500/10">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-[13px] font-semibold text-ink-800">
                All {totalChecklistItems} checks complete. You're clear to submit the task.
              </p>
            </div>
          ) : (
            <p className="mb-4 text-[13px] text-ink-500">
              <span className="font-bold text-ink-800">{totalChecklistItems - done}</span> item
              {totalChecklistItems - done === 1 ? "" : "s"} still unconfirmed. Submitting will clear every check so the
              list is ready for your next task.
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={submit}
              className={cx("btn-primary flex-1", allDone ? "" : "opacity-95")}
            >
              <Send size={16} /> Submit &amp; reset checklist
            </button>
            {done > 0 && (
              <button onClick={() => setChecked(new Set())} className="btn-ghost">
                <RotateCcw size={15} /> Clear
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function SectionCard({
  section,
  checked,
  onToggle,
}: {
  section: ChecklistSection;
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  const Icon = sectionIcon[section.id] ?? FileText;
  const doneInSection = section.items.filter((it) => checked.has(it.id)).length;
  const complete = doneInSection === section.items.length;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-start gap-3 border-b border-ink-100 p-5">
        <span
          className={cx(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition",
            complete
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
              : "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
          )}
        >
          {complete ? <Check size={20} /> : <Icon size={20} />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold tracking-tight text-ink-900">{section.title}</h2>
            <span
              className={cx(
                "chip",
                complete
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
              )}
            >
              {doneInSection}/{section.items.length}
            </span>
          </div>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-500">{section.blurb}</p>
        </div>
      </div>

      <ul className="divide-y divide-ink-100">
        {section.items.map((item) => {
          const on = checked.has(item.id);
          return (
            <li key={item.id}>
              <button
                onClick={() => onToggle(item.id)}
                aria-pressed={on}
                className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-ink-50/60"
              >
                <span
                  className={cx(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition",
                    on
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-ink-300 bg-surface text-transparent"
                  )}
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="min-w-0">
                  <span
                    className={cx(
                      "flex items-center gap-2 text-[14px] font-semibold leading-snug transition",
                      on ? "text-ink-400 line-through" : "text-ink-800"
                    )}
                  >
                    {item.text}
                    {item.critical && !on && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                        <AlertTriangle size={10} /> Critical
                      </span>
                    )}
                  </span>
                  {item.detail && (
                    <span
                      className={cx(
                        "mt-1 block text-[12px] leading-relaxed transition",
                        on ? "text-ink-300" : "text-ink-500"
                      )}
                    >
                      {item.detail}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
