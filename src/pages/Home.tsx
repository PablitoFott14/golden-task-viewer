import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  Lightbulb,
  Target,
  GitBranch,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  History,
  ChevronRight,
  ChevronDown,
  Megaphone,
} from "lucide-react";
import { methodSteps, modelCapabilityReference } from "../data/method";
import { changelog } from "../data/changelog";
import { latestAlignmentUpdate } from "../data/alignments";
import { Reveal, SectionHeading } from "../components/ui";
import { cx } from "../lib/assets";

const phaseColors = [
  "from-sky-500 to-brand-500",
  "from-brand-500 to-violet-500",
  "from-violet-500 to-fuchsia-500",
  "from-amber-500 to-gold-500",
  "from-emerald-500 to-teal-500",
];

function phaseOf(n: number) {
  if (n <= 3) return 0;
  if (n <= 5) return 1;
  if (n <= 7) return 2;
  if (n <= 9) return 3;
  return 4;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function StepCard({
  s,
  isActive,
  onSelect,
}: {
  s: (typeof methodSteps)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={isActive}
      className={cx(
        "group flex items-start gap-3 rounded-2xl border p-3.5 text-left transition",
        isActive
          ? "border-brand-400 bg-brand-50 shadow-glow dark:border-brand-500/50 dark:bg-brand-500/10"
          : "border-ink-200/70 bg-surface hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
      )}
    >
      <span
        className={cx(
          "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-soft",
          phaseColors[phaseOf(s.n)]
        )}
      >
        {s.n}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-bold leading-tight text-ink-900">{s.title}</span>
          <ChevronDown
            size={15}
            className={cx(
              "shrink-0 transition-transform",
              isActive ? "rotate-180 text-brand-500" : "text-ink-300 group-hover:text-ink-400"
            )}
          />
        </span>
        <span className="mt-1 line-clamp-2 block text-[11.5px] leading-snug text-ink-500">{s.short}</span>
      </span>
    </button>
  );
}

const mindset = [
  {
    icon: <Target size={16} />,
    title: "Stepping into the user's shoes",
    body: "Build realistic, believable scenarios, not artificial benchmark-style tasks.",
  },
  {
    icon: <Lightbulb size={16} />,
    title: "Originality",
    body: "Go beyond overused scenarios into unique situations that naturally demand complex reasoning.",
  },
  {
    icon: <GitBranch size={16} />,
    title: "Planning before execution",
    body: "Design the task before building it, instead of improvising and hitting issues later.",
  },
];


const capabilityTone = {
  reliable: {
    label: "Build on it",
    icon: ShieldCheck,
    chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
    iconBox: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
  },
  lever: {
    label: "Use as lever",
    icon: AlertTriangle,
    chip: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30",
    iconBox: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
  },
};

function UrgentAlignmentsBanner() {
  const u = latestAlignmentUpdate;
  return (
    <Link
      to="/alignments"
      className="group block border-b border-rose-200/70 bg-gradient-to-r from-rose-50 via-amber-50/50 to-rose-50 transition hover:from-rose-100/80 hover:to-rose-100/80 dark:border-rose-500/25 dark:from-rose-500/10 dark:via-amber-500/5 dark:to-rose-500/10"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-600 text-white shadow-soft">
          <Megaphone size={15} />
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] text-ink-700">
          <span className="font-bold uppercase tracking-wide text-rose-700 dark:text-rose-300">
            Urgent alignments
          </span>
          <span className="mx-2 text-ink-300">·</span>
          <span className="font-semibold text-ink-900">{u.title}</span>
          <span className="ml-2 hidden text-ink-500 sm:inline">
            {u.topics.length} new standards, updated {u.dateLabel}
          </span>
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white transition group-hover:bg-rose-700">
          Review now <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function AppliedAlignmentsBanner() {
  return (
    <Link
      to="/tasks/task4"
      className="group block border-b border-brand-200/70 bg-gradient-to-r from-brand-50 via-violet-50/50 to-brand-50 transition hover:from-brand-100/80 hover:to-brand-100/80 dark:border-brand-500/25 dark:from-brand-500/10 dark:via-violet-500/5 dark:to-brand-500/10"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-white shadow-soft">
          <Sparkles size={15} />
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] text-ink-700">
          See a Golden Task applying these alignments!
          <span className="mx-2 text-ink-300">·</span>
          <span className="font-semibold text-ink-900">Refund Module QA Status Report</span>
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition group-hover:bg-brand-700">
          View task <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const step = methodSteps.find((s) => s.n === activeStep)!;

  return (
    <div>
      <UrgentAlignmentsBanner />
      <AppliedAlignmentsBanner />

      {/* Hero */}
      <section className="border-b border-ink-200/70 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
                Natural complexity is what drives success
                <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
                  {" "}in this project.
                </span>
              </h1>
              <p className="mt-4 text-lg font-bold uppercase tracking-wide text-brand-600 sm:text-2xl">
                Let your imagination lead the way.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
                Realistic, naturally complex scenarios are the foundation of every successful task,
                not artificial constraints or forced difficulty.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/tasks" className="btn-primary">
                  Explore Golden Tasks <ArrowRight size={16} />
                </Link>
                <button onClick={() => scrollToId("method")} className="btn-ghost">
                  <Compass size={16} /> See the method
                </button>
              </div>
              <button
                onClick={() => scrollToId("capabilities")}
                className="group mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300"
              >
                <ShieldCheck size={15} /> Jump to model capabilities &amp; task levers
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>

            {/* Mindset + changelog */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="card p-5">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                  The mindset
                </div>
                <div className="space-y-3.5">
                  {mindset.map((p) => (
                    <div key={p.title} className="flex gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                        {p.icon}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-ink-900">{p.title}</h3>
                        <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-500">{p.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4">
                <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">
                  <History size={13} /> Changelog
                </div>
                <ul className="space-y-2">
                  {changelog.map((c) => (
                    <li key={c.date + c.text} className="flex gap-2.5 text-[12.5px] leading-relaxed">
                      <span className="shrink-0 font-mono text-[11px] font-semibold text-brand-600 dark:text-brand-300">
                        {c.date}
                      </span>
                      <span className="text-ink-600">{c.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive method */}
      <section id="method" className="border-y border-ink-200/70 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The workflow"
              title="The 12-step Golden Task method"
              sub="The whole flow at a glance. Click any step to expand what it does, what it produces, and how it maps to the Complexity Playbook."
            />
          </Reveal>

          {/* Roadmap: 12 steps in a 6×2 grid */}
          <div className="mt-10 space-y-3">
            {Array.from({ length: Math.ceil(methodSteps.length / 2) }).map((_, ri) => {
              const pair = methodSteps.slice(ri * 2, ri * 2 + 2);
              return (
                <div key={ri} className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
                  <StepCard s={pair[0]} isActive={pair[0].n === activeStep} onSelect={() => setActiveStep(pair[0].n)} />
                  <div className="hidden items-center justify-center sm:flex">
                    <ChevronRight size={18} className="text-ink-300" />
                  </div>
                  {pair[1] ? (
                    <StepCard s={pair[1]} isActive={pair[1].n === activeStep} onSelect={() => setActiveStep(pair[1].n)} />
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Detail panel for the selected step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="card mt-8 overflow-hidden"
            >
              <div className={cx("bg-gradient-to-br p-6 text-white", phaseColors[phaseOf(step.n)])}>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80">
                  Step {step.n} of 12
                  {step.output && <span className="rounded-full bg-white/20 px-2 py-0.5">→ {step.output}</span>}
                </div>
                <h3 className="mt-1 text-2xl font-extrabold">{step.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/90">{step.detail}</p>
              </div>
              <div className="grid gap-4 p-6 lg:grid-cols-2">
                <div>
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-400">Key moves</div>
                  <ul className="space-y-2">
                    {step.tips.map((t) => (
                      <li key={t} className="flex gap-2.5 text-sm text-ink-700">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                        <span className="leading-snug">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {step.callouts && step.callouts.length > 0 && (
                  <div className="space-y-2.5">
                    {step.callouts.map((c) => (
                      <div
                        key={c.title}
                        className="rounded-xl border border-gold-300 bg-gold-50/70 p-3.5 dark:border-gold-500/40 dark:bg-gold-500/10"
                      >
                        <div className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wide text-gold-700 dark:text-gold-300">
                          <Sparkles size={13} className="shrink-0" /> {c.title}
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{c.body}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 lg:col-span-2">
                  <button
                    disabled={step.n === 1}
                    onClick={() => setActiveStep((n) => Math.max(1, n - 1))}
                    className="btn-ghost disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={step.n === 12}
                    onClick={() => setActiveStep((n) => Math.min(12, n + 1))}
                    className="btn-primary disabled:opacity-40"
                  >
                    Next step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <Reveal className="mt-14 border-t border-ink-200/70 pt-12">
            <div id="capabilities" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Task-design guide"
                title="What the model can — and can't — reliably do"
                sub="Build on reliable skills, then make realistic limitations the source of difficulty — grounded complexity, not decorative."
              />

              <div className="mt-7 card overflow-hidden">
                <div className="grid gap-4 border-b border-ink-200/70 bg-ink-50 px-5 py-5 md:grid-cols-[1fr_1.4fr] md:items-center">
                  <div>
                    <div className="text-sm font-extrabold text-ink-900">
                      Quick calibration table
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      Do not build tasks from model strengths alone. Combine a reliable baseline with a natural failure lever.
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <span className="font-bold">Build on it:</span> expected to work, so it anchors the task.
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                      <span className="font-bold">Use as lever:</span> where the task can honestly become hard.
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-surface">
                      <tr className="border-b border-ink-200/70 text-[11px] font-bold uppercase tracking-wide text-ink-400">
                        <th className="w-40 px-5 py-3">Role</th>
                        <th className="min-w-56 px-5 py-3">Capability or limitation</th>
                        <th className="min-w-[22rem] px-5 py-3">What contributors should know</th>
                        <th className="min-w-[22rem] px-5 py-3">Design move</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-200/60">
                      {modelCapabilityReference.map((item) => {
                        const tone = capabilityTone[item.kind];
                        const Icon = tone.icon;
                        return (
                          <tr
                            key={`${item.kind}-${item.capability}`}
                            className="align-top transition hover:bg-ink-50/70"
                          >
                            <td className="px-5 py-4">
                              <span
                                className={cx(
                                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                                  tone.chip
                                )}
                              >
                                <Icon size={13} />
                                {tone.label}
                              </span>
                            </td>
                            <td className="px-5 py-4 font-semibold text-ink-900">
                              {item.capability}
                            </td>
                            <td className="px-5 py-4 leading-relaxed text-ink-600">
                              {item.summary}
                            </td>
                            <td className="px-5 py-4 leading-relaxed text-ink-700">
                              <div className="flex gap-2.5">
                                <span
                                  className={cx(
                                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg",
                                    tone.iconBox
                                  )}
                                >
                                  <Icon size={14} />
                                </span>
                                <span>{item.contributorMove}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
