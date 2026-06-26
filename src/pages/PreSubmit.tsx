import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  FileText,
  Image as ImageIcon,
  GitBranch,
  ScrollText,
  FlaskConical,
  MessageSquareQuote,
  Check,
  RotateCcw,
  CheckCircle2,
  Send,
  Eye,
} from "lucide-react";
import { checklistSections, type ChecklistItem, type ChecklistSection } from "../data/preSubmitChecklist";
import { Reveal, SectionHeading } from "../components/ui";
import { useScrollSpy } from "../lib/useScrollSpy";
import { cx } from "../lib/assets";

const CHECKS_KEY = "openclaw-presubmit-checks";
const REVIEWER_KEY = "openclaw-presubmit-reviewer";

const sectionIcon: Record<string, typeof FileText> = {
  scenario: Layers,
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

  const visibleItemsOf = (s: ChecklistSection) => s.items.filter((i) => reviewer || !i.reviewerOnly);

  // sections with at least one visible item, respecting reviewer mode
  const visibleSections = useMemo(
    () =>
      checklistSections
        .filter((s) => reviewer || !s.reviewerOnly)
        .map((s) => ({ ...s, items: s.items.filter((i) => reviewer || !i.reviewerOnly) }))
        .filter((s) => s.items.length > 0),
    [reviewer]
  );

  const ids = useMemo(() => visibleSections.map((s) => s.id), [visibleSections]);
  const activeId = useScrollSpy(ids);

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

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading eyebrow="Pre-Submit Checklist" title="One last pass before you ship" />
          <ReviewerToggle on={reviewer} onChange={setReviewer} />
        </div>
      </Reveal>

      <div className="mt-8 lg:grid lg:grid-cols-[270px_1fr] lg:gap-8">
        {/* Sidebar: progress + jump nav */}
        <aside className="mb-6 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">Progress</span>
              <span className="text-sm font-extrabold text-ink-900">
                {done}/{total}
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-200/70">
              <motion.div
                className={cx("h-full rounded-full", allDone ? "bg-emerald-500" : "bg-brand-500")}
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <AnimatePresence>
              {(justReset || allDone) && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 flex items-center gap-1.5 overflow-hidden text-[12px] font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={14} className="shrink-0" />
                  {justReset ? "Reset — ready for the next task." : "All clear. You're good to submit."}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-3 flex gap-2">
              <button onClick={submit} className="btn-primary flex-1 px-3 py-2 text-sm">
                <Send size={15} /> Submit &amp; reset
              </button>
              {done > 0 && (
                <button
                  onClick={() => setChecked(new Set())}
                  className="btn-ghost px-2.5 py-2 text-sm"
                  title="Clear all checks"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Jump nav (scrollspy) */}
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {visibleSections.map((s) => {
              const Icon = sectionIcon[s.id] ?? FileText;
              const sectionDone = s.items.filter((i) => checked.has(i.id)).length;
              const complete = sectionDone === s.items.length;
              const on = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => jump(s.id)}
                  className={cx(
                    "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition lg:w-full",
                    on ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300" : "text-ink-600 hover:bg-ink-100 dark:hover:bg-ink-200/50"
                  )}
                >
                  <Icon size={15} className={cx("shrink-0", on ? "text-brand-600 dark:text-brand-300" : "text-ink-400")} />
                  <span className="flex-1 whitespace-nowrap lg:whitespace-normal">{s.title}</span>
                  {s.reviewerOnly && <Eye size={12} className="shrink-0 text-ink-400" />}
                  <span
                    className={cx(
                      "ml-auto hidden items-center rounded-full px-1.5 text-[11px] font-bold lg:inline-flex",
                      complete
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                        : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
                    )}
                  >
                    {complete ? <Check size={11} /> : `${sectionDone}/${s.items.length}`}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* All sections, always visible */}
        <div className="min-w-0 space-y-5">
          {visibleSections.map((s) => (
            <SectionBlock key={s.id} section={s} checked={checked} onToggle={toggle} />
          ))}
        </div>
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
      <span className={cx("relative h-5 w-9 rounded-full transition", on ? "bg-brand-500" : "bg-ink-300 dark:bg-ink-200/60")}>
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

function SectionBlock({
  section,
  checked,
  onToggle,
}: {
  section: ChecklistSection;
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  const Icon = sectionIcon[section.id] ?? FileText;
  const doneCount = section.items.filter((i) => checked.has(i.id)).length;
  const complete = doneCount === section.items.length;

  return (
    <section id={section.id} className="card scroll-mt-24 overflow-hidden">
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
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-extrabold tracking-tight text-ink-900">{section.title}</h2>
            <span
              className={cx(
                "chip",
                complete
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
              )}
            >
              {doneCount}/{section.items.length}
            </span>
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
        {section.items.map((item) => (
          <ItemRow key={item.id} item={item} on={checked.has(item.id)} onToggle={() => onToggle(item.id)} />
        ))}
      </ul>
    </section>
  );
}

function ItemRow({ item, on, onToggle }: { item: ChecklistItem; on: boolean; onToggle: () => void }) {
  return (
    <li>
      <button
        onClick={onToggle}
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
            {item.reviewerOnly && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                <Eye size={10} /> Reviewer
              </span>
            )}
          </span>
          {item.detail && (
            <span
              className={cx("mt-1 block text-[12px] leading-relaxed transition", on ? "text-ink-300" : "text-ink-500")}
            >
              {item.detail}
            </span>
          )}
        </span>
      </button>
    </li>
  );
}
