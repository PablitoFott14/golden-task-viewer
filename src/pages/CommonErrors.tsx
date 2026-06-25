import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  HelpCircle,
  Wrench,
  FileSearch,
  ScrollText,
  FlaskConical,
  Layers,
  Sprout,
  ChevronDown,
  Lightbulb,
} from "lucide-react";
import {
  commonErrors,
  categoryMeta,
  type ErrorCategory,
  type CommonError,
} from "../data/commonErrors";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

const order: ErrorCategory[] = ["scenario", "rubrics", "tests"];

const catIcon: Record<ErrorCategory, typeof Layers> = {
  scenario: Layers,
  rubrics: ScrollText,
  tests: FlaskConical,
};

interface Theme {
  tile: string;
  border: string;
  num: string;
  ring: string;
}

const theme: Record<ErrorCategory, Theme> = {
  scenario: {
    tile: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    border: "border-l-violet-400 dark:border-l-violet-500/60",
    num: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
    ring: "hover:border-violet-300",
  },
  rubrics: {
    tile: "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
    border: "border-l-brand-400 dark:border-l-brand-500/60",
    num: "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200",
    ring: "hover:border-brand-300",
  },
  tests: {
    tile: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    border: "border-l-emerald-400 dark:border-l-emerald-500/60",
    num: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    ring: "hover:border-emerald-300",
  },
};

export default function CommonErrors() {
  const [open, setOpen] = useState<Record<ErrorCategory, boolean>>({
    scenario: false,
    rubrics: false,
    tests: false,
  });

  const toggle = (c: ErrorCategory) => setOpen((o) => ({ ...o, [c]: !o[c] }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading eyebrow="Common Errors" title="Mistakes that sink a task" />
      </Reveal>

      {/* Call to action */}
      <Reveal>
        <div className="mt-8 flex items-center gap-4 overflow-hidden rounded-2xl border border-rose-300 bg-gradient-to-r from-rose-50 to-amber-50/40 p-5 dark:border-rose-500/40 dark:from-rose-500/10 dark:to-amber-500/5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-rose-600 text-white shadow-glow">
            <AlertTriangle size={24} />
          </span>
          <p className="text-lg font-extrabold tracking-tight text-ink-900 sm:text-xl">
            Avoid these mistakes if you want to succeed in the project!
          </p>
        </div>
      </Reveal>

      {/* The root-cause teaching point */}
      <Reveal>
        <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50/60 p-5 dark:border-amber-500/40 dark:bg-amber-500/10">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            <Lightbulb size={15} /> The one root cause to internalize
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
            Most of the errors below are{" "}
            <strong className="text-ink-900">downstream symptoms of insufficient scenario complexity</strong>.
            When the scenario isn't hard enough from the start, contributors end up forcing the task to meet the
            bar, and that produces artificial constraints, brittle rubrics, over-specific requirements, and unit
            tests that don't reflect the actual final state. Get the complexity right first and most of the rest
            stops happening. Errors carrying the{" "}
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/70 px-1.5 align-middle text-[10px] font-bold text-amber-800 dark:bg-amber-500/25 dark:text-amber-200">
              <Sprout size={10} /> ROOT
            </span>{" "}
            tag trace straight back to it.
          </p>
        </div>
      </Reveal>

      {/* Accordion categories */}
      <div className="mt-8 space-y-4">
        {order.map((cat) => {
          const meta = categoryMeta[cat];
          const Icon = catIcon[cat];
          const t = theme[cat];
          const isOpen = open[cat];
          const errs = commonErrors[cat];
          return (
            <Reveal key={cat}>
              <div className={cx("card overflow-hidden transition", t.ring)}>
                <button
                  onClick={() => toggle(cat)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-xl", t.tile)}>
                    <Icon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-extrabold tracking-tight text-ink-900">{meta.label}</h2>
                      <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-200/60">{errs.length}</span>
                      {meta.reviewersOnly && (
                        <span className="chip bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                          Reviewers only
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 max-w-3xl text-[13px] leading-relaxed text-ink-500">
                      {meta.blurb}
                    </p>
                  </div>
                  <ChevronDown
                    size={22}
                    className={cx(
                      "shrink-0 text-ink-400 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 border-t border-ink-100 bg-ink-50/40 p-4 sm:p-5">
                        {errs.map((e, i) => (
                          <ErrorCard key={e.title} error={e} n={i + 1} t={t} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function ErrorCard({ error, n, t }: { error: CommonError; n: number; t: Theme }) {
  return (
    <div className={cx("card overflow-hidden border-l-4", t.border)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 p-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className={cx("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold", t.num)}>
            {n}
          </span>
          <h3 className="mt-0.5 text-[15px] font-bold text-ink-900">{error.title}</h3>
        </div>
        {error.rootedInComplexity && (
          <span className="chip shrink-0 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
            <Sprout size={11} /> ROOT
          </span>
        )}
      </div>

      <div className="grid gap-px bg-ink-100 sm:grid-cols-3">
        <Block icon={FileSearch} label="What it is" tone="text-ink-500">
          {error.what}
        </Block>
        <Block icon={HelpCircle} label="Why it happens" tone="text-amber-600 dark:text-amber-400">
          {error.why}
        </Block>
        <Block icon={Wrench} label="How to avoid it" tone="text-emerald-600 dark:text-emerald-400">
          {error.fix}
        </Block>
      </div>

      <div className="space-y-2 border-t border-ink-100 p-4">
        <ExampleRow
          icon={XCircle}
          label="Looks like"
          text={error.looksLike}
          className="border-rose-200 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/10"
          labelTone="text-rose-700 dark:text-rose-300"
        />
        {error.instead && (
          <ExampleRow
            icon={CheckCircle2}
            label="Do this instead"
            text={error.instead}
            className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10"
            labelTone="text-emerald-700 dark:text-emerald-300"
          />
        )}
      </div>
    </div>
  );
}

function ExampleRow({
  icon: Icon,
  label,
  text,
  className,
  labelTone,
}: {
  icon: typeof XCircle;
  label: string;
  text: string;
  className: string;
  labelTone: string;
}) {
  return (
    <div className={cx("flex gap-2.5 rounded-xl border p-3", className)}>
      <Icon size={16} className={cx("mt-0.5 shrink-0", labelTone)} />
      <p className="text-[13px] leading-relaxed text-ink-700">
        <span className={cx("font-bold", labelTone)}>{label}: </span>
        {text}
      </p>
    </div>
  );
}

function Block({
  icon: Icon,
  label,
  tone,
  children,
}: {
  icon: typeof FileSearch;
  label: string;
  tone: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-surface p-4">
      <div className={cx("mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide", tone)}>
        <Icon size={13} /> {label}
      </div>
      <p className="text-[13px] leading-relaxed text-ink-700">{children}</p>
    </div>
  );
}
