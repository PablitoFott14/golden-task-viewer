import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardCheck,
  ChevronDown,
  CircleCheck,
  CircleSlash,
  XCircle,
  Scale,
  ListChecks,
  Info,
} from "lucide-react";
import {
  specGroups,
  weightBuckets,
  difficultyDimensions,
  rubricQualityIssues,
  type SpecDimension,
  type SpecOption,
  type IssueSeverity,
} from "../data/specDoc";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

/* score -> visual treatment for an answer option */
function scoreStyle(score: number) {
  if (score >= 5)
    return {
      label: "Pass",
      chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
      border: "border-l-emerald-400 dark:border-l-emerald-500/60",
      icon: CircleCheck,
    };
  if (score === 3)
    return {
      label: "Non-Fail",
      chip: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
      border: "border-l-amber-400 dark:border-l-amber-500/60",
      icon: CircleSlash,
    };
  return {
    label: "Fail",
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
    border: "border-l-rose-400 dark:border-l-rose-500/60",
    icon: XCircle,
  };
}

export default function SpecDoc() {
  const dimensionCount = specGroups.reduce((n, g) => n + g.dimensions.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Scoring Spec"
          title="How every task gets scored"
          sub={`The L0 review QC rubric, the exact standard a task is graded against across ${dimensionCount} dimensions. Each dimension lists its failing and non-failing error categories and every scored option, plus the weight and rubric-quality appendices.`}
        />
      </Reveal>

      {/* Legend */}
      <Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <LegendCard
            tone="bg-rose-50/70 border-rose-200 dark:border-rose-500/40 dark:bg-rose-500/10"
            icon={XCircle}
            iconTone="text-rose-600 dark:text-rose-400"
            score="2"
            label="Fail"
            note="A failing error category. Crosses a scoring threshold."
          />
          <LegendCard
            tone="bg-amber-50/70 border-amber-200 dark:border-amber-500/40 dark:bg-amber-500/10"
            icon={CircleSlash}
            iconTone="text-amber-600 dark:text-amber-400"
            score="3"
            label="Non-Fail"
            note="A non-failing issue. Logged, but does not fail the task."
          />
          <LegendCard
            tone="bg-emerald-50/70 border-emerald-200 dark:border-emerald-500/40 dark:bg-emerald-500/10"
            icon={CircleCheck}
            iconTone="text-emerald-600 dark:text-emerald-400"
            score="5"
            label="Pass"
            note="Meets the bar for the dimension. No error category applied."
          />
        </div>
      </Reveal>

      {/* Dimensions */}
      <div className="mt-12 space-y-12">
        {specGroups.map((group) => (
          <section key={group.group} id={group.group.replace(/[^a-z]/gi, "").toLowerCase()} className="scroll-mt-24">
            <Reveal>
              <div className="mb-5 flex items-center gap-2.5 border-b border-ink-200/70 pb-3">
                <ClipboardCheck size={20} className="text-brand-600 dark:text-brand-400" />
                <h2 className="text-xl font-extrabold tracking-tight text-ink-900">{group.group}</h2>
                <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-200/60">
                  {group.dimensions.length}
                </span>
              </div>
            </Reveal>
            <div className="space-y-5">
              {group.dimensions.map((dim, i) => (
                <Reveal key={dim.name} delay={i * 0.03}>
                  <DimensionCard dim={dim} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Appendix: weight buckets */}
      <WeightAppendix />

      {/* Appendix: rubric quality definitions */}
      <RubricQualityAppendix />
    </div>
  );
}

function LegendCard({
  tone,
  icon: Icon,
  iconTone,
  score,
  label,
  note,
}: {
  tone: string;
  icon: typeof XCircle;
  iconTone: string;
  score: string;
  label: string;
  note: string;
}) {
  return (
    <div className={cx("rounded-2xl border p-4", tone)}>
      <div className="flex items-center gap-2">
        <Icon size={18} className={iconTone} />
        <span className="text-sm font-extrabold text-ink-900">{label}</span>
        <span className="ml-auto text-xs font-bold text-ink-400">score {score}</span>
      </div>
      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-600">{note}</p>
    </div>
  );
}

function DimensionCard({ dim }: { dim: SpecDimension }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-ink-100 p-5">
        {dim.conditional && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-2.5 py-1 text-[11px] font-semibold text-ink-500 dark:bg-ink-200/50">
            <Info size={12} /> {dim.conditional}
          </div>
        )}
        <h3 className="text-base font-bold text-ink-900">{dim.name}</h3>
        <p className="mt-1 text-[13px] font-medium text-ink-500">{dim.question}</p>

        {dim.errorTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {dim.errorTags.map((tag) => (
              <span
                key={tag.label}
                className={cx(
                  "chip",
                  tag.type === "fail"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
                )}
              >
                {tag.type === "fail" ? <XCircle size={11} /> : <CircleSlash size={11} />}
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-ink-400 transition hover:text-ink-700">
          <ChevronDown size={15} className="transition-transform group-open:rotate-180" />
          Guidance
        </summary>
        <div className="whitespace-pre-line border-t border-ink-100 bg-ink-50/50 px-5 py-4 text-[13px] leading-relaxed text-ink-600">
          {dim.description}
        </div>
      </details>

      <div className="space-y-px bg-ink-100">
        {dim.options.map((opt, i) => (
          <OptionRow key={i} opt={opt} />
        ))}
      </div>
    </div>
  );
}

function OptionRow({ opt }: { opt: SpecOption }) {
  const s = scoreStyle(opt.score);
  const Icon = s.icon;
  return (
    <div className={cx("border-l-4 bg-surface p-4", s.border)}>
      <div className="flex items-start gap-3">
        <span className={cx("inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold", s.chip)}>
          <Icon size={12} /> {s.label}
        </span>
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink-700">{opt.text}</p>
        <span className="ml-auto shrink-0 text-sm font-extrabold text-ink-300">{opt.score}</span>
      </div>
    </div>
  );
}

function WeightAppendix() {
  const [open, setOpen] = useState(false);
  return (
    <section id="weights" className="mt-16 scroll-mt-24">
      <Reveal>
        <div className="card overflow-hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-center gap-4 p-5 text-left"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <Scale size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-extrabold tracking-tight text-ink-900">Criteria Weight Definitions</h2>
              <p className="mt-0.5 text-[13px] text-ink-500">
                Appendix · Update 06/10 · the {weightBuckets.length} weight buckets and the four difficulty dimensions
              </p>
            </div>
            <ChevronDown
              size={22}
              className={cx("shrink-0 text-ink-400 transition-transform duration-300", open && "rotate-180")}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-ink-100 bg-ink-50/40 p-4 sm:p-5">
                  <div className="rounded-xl border border-ink-200/70 bg-surface p-4">
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-600">
                      4 Difficulty Dimensions
                    </div>
                    <ul className="space-y-1.5">
                      {difficultyDimensions.map((d) => (
                        <li key={d} className="flex gap-2 text-[13px] leading-relaxed text-ink-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 space-y-3">
                    {weightBuckets.map((b) => {
                      const positive = b.score > 0;
                      return (
                        <div
                          key={b.level}
                          className={cx(
                            "card border-l-4 p-4",
                            positive
                              ? "border-l-brand-400 dark:border-l-brand-500/60"
                              : "border-l-rose-400 dark:border-l-rose-500/60"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cx(
                                "grid h-8 w-10 shrink-0 place-items-center rounded-lg text-sm font-extrabold",
                                positive
                                  ? "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
                              )}
                            >
                              {b.score > 0 ? `+${b.score}` : b.score}
                            </span>
                            <h3 className="text-[15px] font-bold text-ink-900">{b.level}</h3>
                          </div>
                          <p className="mt-2.5 whitespace-pre-line text-[13px] leading-relaxed text-ink-600">
                            {b.definition}
                          </p>
                          <div className="mt-3 rounded-lg bg-ink-50/70 p-3 dark:bg-ink-100/40">
                            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">
                              Typical examples
                            </div>
                            <ul className="space-y-1">
                              {b.examples.map((ex) => (
                                <li key={ex} className="flex gap-2 text-[12px] leading-relaxed text-ink-600">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
                                  {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

const severityTone: Record<IssueSeverity, string> = {
  Major: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  Moderate: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  Minor: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
};

const severityBorder: Record<IssueSeverity, string> = {
  Major: "border-l-rose-400 dark:border-l-rose-500/60",
  Moderate: "border-l-amber-400 dark:border-l-amber-500/60",
  Minor: "border-l-sky-400 dark:border-l-sky-500/60",
};

function RubricQualityAppendix() {
  const [open, setOpen] = useState(false);
  const severities: IssueSeverity[] = ["Major", "Moderate", "Minor"];
  return (
    <section id="rubricquality" className="mt-6 scroll-mt-24">
      <Reveal>
        <div className="card overflow-hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-center gap-4 p-5 text-left"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <ListChecks size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-extrabold tracking-tight text-ink-900">Rubric Quality Definitions</h2>
              <p className="mt-0.5 text-[13px] text-ink-500">
                Appendix · the {rubricQualityIssues.length} criterion error types, by severity
              </p>
            </div>
            <ChevronDown
              size={22}
              className={cx("shrink-0 text-ink-400 transition-transform duration-300", open && "rotate-180")}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-6 border-t border-ink-100 bg-ink-50/40 p-4 sm:p-5">
                  {severities.map((sev) => {
                    const issues = rubricQualityIssues.filter((iss) => iss.severity === sev);
                    return (
                      <div key={sev}>
                        <div className="mb-3 flex items-center gap-2">
                          <span className={cx("chip", severityTone[sev])}>{sev} Issues</span>
                          <span className="text-xs font-semibold text-ink-400">{issues.length}</span>
                        </div>
                        <div className="space-y-3">
                          {issues.map((iss) => (
                            <div key={iss.name} className={cx("card border-l-4 p-4", severityBorder[sev])}>
                              <h3 className="text-[15px] font-bold text-ink-900">{iss.name}</h3>
                              <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-ink-600">
                                {iss.definition}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
