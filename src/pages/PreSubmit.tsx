import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  GitBranch,
  Gauge,
  ScrollText,
  FlaskConical,
  MessageSquareQuote,
  Check,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Send,
  Eye,
} from "lucide-react";
import { checklistSections, type ChecklistSection } from "../data/preSubmitChecklist";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

const CHECKS_KEY = "openclaw-presubmit-checks";
const REVIEWER_KEY = "openclaw-presubmit-reviewer";

const sectionIcon: Record<string, typeof FileText> = {
  prompt: FileText,
  inputs: ImageIcon,
  silver: GitBranch,
  difficulty: Gauge,
  rubrics: ScrollText,
  tests: FlaskConical,
  justifications: MessageSquareQuote,
};

export default function PreSubmit() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(CHECKS_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [reviewer, setReviewer] = useState<boolean>(() => {
    try {
      return localStorage.getItem(REVIEWER_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [active, setActive] = useState<string>(checklistSections[0].id);
  const [justReset, setJustReset] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHECKS_KEY, JSON.stringify([...checked]));
    } catch {
      /* ignore */
    }
  }, [checked]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWER_KEY, reviewer ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [reviewer]);

  const visibleSections = useMemo(
    () => checklistSections.filter((s) => reviewer || !s.reviewerOnly),
    [reviewer]
  );

  // keep the active section valid when reviewer mode hides it
  useEffect(() => {
    if (!visibleSections.some((s) => s.id === active)) {
      setActive(visibleSections[0].id);
    }
  }, [visibleSections, active]);

  const activeSection = visibleSections.find((s) => s.id === active) ?? visibleSections[0];

  const { total, done } = useMemo(() => {
    const items = visibleSections.flatMap((s) => s.items);
    return { total: items.length, done: items.filter((i) => checked.has(i.id)).length };
  }, [visibleSections, checked]);

  const pct = total ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done === total;

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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading eyebrow="Pre-Submit Checklist" title="One last pass before you ship" />
          <ReviewerToggle on={reviewer} onChange={setReviewer} />
        </div>
      </Reveal>

      {/* Sticky progress + submit */}
      <div className="sticky top-16 z-30 -mx-4 mt-6 border-b border-ink-200/60 bg-ink-50/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex min-w-[200px] flex-1 items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-200/70">
              <motion.div
                className={cx("h-full rounded-full", allDone ? "bg-emerald-500" : "bg-brand-500")}
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="shrink-0 text-sm font-bold text-ink-700">
              {done}/{total}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {done > 0 && (
              <button onClick={() => setChecked(new Set())} className="btn-ghost px-3 py-2 text-sm">
                <RotateCcw size={15} /> Clear
              </button>
            )}
            <button onClick={submit} className="btn-primary px-4 py-2 text-sm">
              <Send size={15} /> Submit &amp; reset
            </button>
          </div>
        </div>
        <AnimatePresence>
          {(justReset || allDone) && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 size={15} />
              {justReset ? "Checklist reset — ready for the next task." : "All checks complete. You're clear to submit."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[244px_1fr] lg:gap-8">
        {/* Sidebar nav */}
        <nav className="mb-6 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {visibleSections.map((s) => (
              <SideButton
                key={s.id}
                section={s}
                active={active === s.id}
                doneCount={s.items.filter((i) => checked.has(i.id)).length}
                onClick={() => setActive(s.id)}
              />
            ))}
          </div>
        </nav>

        {/* Active section */}
        <motion.div
          key={activeSection.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <SectionPanel section={activeSection} checked={checked} onToggle={toggle} />
        </motion.div>
      </div>
    </div>
  );
}

function ReviewerToggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={cx(
        "inline-flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm font-semibold transition",
        on
          ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300"
          : "border-ink-200 bg-surface text-ink-600 hover:border-ink-300"
      )}
    >
      <Eye size={15} />
      Reviewer mode
      <span
        className={cx(
          "relative h-5 w-9 rounded-full transition",
          on ? "bg-brand-500" : "bg-ink-300 dark:bg-ink-200/60"
        )}
      >
        <span
          className={cx(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
            on ? "left-[18px]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

function SideButton({
  section,
  active,
  doneCount,
  onClick,
}: {
  section: ChecklistSection;
  active: boolean;
  doneCount: number;
  onClick: () => void;
}) {
  const Icon = sectionIcon[section.id] ?? FileText;
  const complete = doneCount === section.items.length;
  return (
    <button
      onClick={onClick}
      className={cx(
        "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition lg:w-full",
        active ? "bg-brand-600 text-white shadow-glow" : "text-ink-600 hover:bg-ink-100 dark:hover:bg-ink-200/50"
      )}
    >
      <Icon size={16} className={cx("shrink-0", active ? "text-white" : "text-ink-400")} />
      <span className="flex-1 whitespace-nowrap lg:whitespace-normal">{section.title}</span>
      {section.reviewerOnly && (
        <Eye size={12} className={cx("shrink-0", active ? "text-white/80" : "text-ink-400")} />
      )}
      <span
        className={cx(
          "ml-auto hidden items-center rounded-full px-1.5 text-[11px] font-bold lg:inline-flex",
          complete
            ? active
              ? "bg-white/25 text-white"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
            : active
              ? "bg-white/25 text-white"
              : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
        )}
      >
        {complete ? <Check size={11} /> : `${doneCount}/${section.items.length}`}
      </span>
    </button>
  );
}

function SectionPanel({
  section,
  checked,
  onToggle,
}: {
  section: ChecklistSection;
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  const Icon = sectionIcon[section.id] ?? FileText;
  return (
    <div className="card overflow-hidden">
      <div className="flex items-start gap-3 border-b border-ink-100 p-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          <Icon size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-extrabold tracking-tight text-ink-900">{section.title}</h2>
            {section.reviewerOnly && (
              <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">
                <Eye size={11} /> Reviewers only
              </span>
            )}
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
                    on ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 bg-surface text-transparent"
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
