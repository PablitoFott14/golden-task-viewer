import { useState } from "react";
import {
  AlertTriangle,
  XCircle,
  HelpCircle,
  Wrench,
  FileSearch,
  ScrollText,
  FlaskConical,
  Layers,
  Lock,
} from "lucide-react";
import {
  commonErrors,
  categoryMeta,
  type ErrorCategory,
  type CommonError,
} from "../data/commonErrors";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

type Filter = "all" | ErrorCategory;

const order: ErrorCategory[] = ["scenario", "rubrics", "tests"];

const catIcon: Record<ErrorCategory, typeof Layers> = {
  scenario: Layers,
  rubrics: ScrollText,
  tests: FlaskConical,
};

const catAccent: Record<ErrorCategory, string> = {
  scenario: "text-violet-600 dark:text-violet-300",
  rubrics: "text-brand-600 dark:text-brand-300",
  tests: "text-emerald-600 dark:text-emerald-300",
};

export default function CommonErrors() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? order : [filter];
  const total = order.reduce((n, c) => n + commonErrors[c].length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Common Errors"
          title="Mistakes that sink a task"
          sub={`The ${total} recurring failures the customer flags in audit, merged from every reviewer playbook, webinar, and P0 memo into one resource. Each one pairs what goes wrong with why it happens and how to avoid it.`}
        />
      </Reveal>

      {/* Call to action */}
      <Reveal>
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-rose-300 bg-rose-50/70 p-5 dark:border-rose-500/40 dark:bg-rose-500/10">
          <AlertTriangle size={22} className="shrink-0 text-rose-600 dark:text-rose-400" />
          <p className="text-lg font-extrabold tracking-tight text-ink-900">
            Avoid these mistakes if you want to succeed in the project!
          </p>
        </div>
      </Reveal>

      {/* The root-cause teaching point */}
      <Reveal>
        <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50/60 p-5 dark:border-amber-500/40 dark:bg-amber-500/10">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            <Lock size={14} /> The one root cause to internalize
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
            Most of the errors below are <strong className="text-ink-900">downstream effects of insufficient
            scenario complexity</strong>. When the scenario isn't hard enough from the start, contributors end
            up forcing the task to meet the bar — and that produces artificial constraints, brittle rubrics,
            over-specific requirements, and unit tests that don't reflect the actual final state. Get the
            complexity right first, and most of the rest stops happening. Errors with the{" "}
            <span className="inline-flex items-center gap-1 align-middle text-[11px] font-bold text-amber-700 dark:text-amber-300">
              <Lock size={11} /> ROOT
            </span>{" "}
            tag trace straight back to it.
          </p>
        </div>
      </Reveal>

      {/* Category filter */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 bg-ink-50/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All" count={total} />
          {order.map((c) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
              label={categoryMeta[c].label}
              count={commonErrors[c].length}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 space-y-14">
        {visible.map((cat) => {
          const meta = categoryMeta[cat];
          const Icon = catIcon[cat];
          return (
            <section key={cat} id={cat} className="scroll-mt-32">
              <Reveal>
                <div className="flex items-start gap-3 border-b border-ink-200/70 pb-4">
                  <span className={cx("mt-0.5 shrink-0", catAccent[cat])}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-extrabold tracking-tight text-ink-900">{meta.label}</h2>
                      <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-200/60">
                        {commonErrors[cat].length} errors
                      </span>
                      {meta.reviewersOnly && (
                        <span className="chip bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                          Reviewers only
                        </span>
                      )}
                    </div>
                    <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-600">{meta.blurb}</p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-6 space-y-4">
                {commonErrors[cat].map((e, i) => (
                  <Reveal key={e.title} delay={i * 0.03}>
                    <ErrorCard error={e} n={i + 1} accent={catAccent[cat]} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
        active
          ? "bg-brand-600 text-white shadow-glow"
          : "border border-ink-200 bg-surface text-ink-600 hover:border-ink-300 hover:text-ink-900"
      )}
    >
      {label}
      <span
        className={cx(
          "rounded-full px-1.5 text-[11px] font-bold",
          active ? "bg-white/25 text-white" : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ErrorCard({ error, n, accent }: { error: CommonError; n: number; accent: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className={cx("mt-0.5 shrink-0", accent)}>
            <XCircle size={18} />
          </span>
          <h3 className="text-base font-bold text-ink-900">
            <span className="mr-1.5 text-ink-400">{n}.</span>
            {error.title}
          </h3>
        </div>
        {error.rootedInComplexity && (
          <span className="chip shrink-0 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
            <Lock size={11} /> ROOT
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

      {error.example && (
        <div className="border-t border-ink-100 bg-ink-50/60 px-5 py-3">
          <p className="text-[12px] leading-relaxed text-ink-500">
            <span className="font-semibold uppercase tracking-wide text-ink-400">From the audits — </span>
            {error.example}
          </p>
        </div>
      )}
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
  children: React.ReactNode;
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
