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
} from "lucide-react";
import { methodSteps, modelCapabilityReference } from "../data/method";
import { tasks } from "../data";
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

const changelog = [
  { date: "26-06-2026", text: "Beta checklist launched." },
  { date: "26-06-2026", text: "Scoring Spec & Common Errors tabs added." },
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

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const step = methodSteps.find((s) => s.n === activeStep)!;

  return (
    <div>
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
              sub="Click any step to see what happens, what it produces, and how it maps to the Complexity Playbook. The colored phases group steps into the major stages of task creation."
            />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
            {/* Step rail */}
            <div className="relative">
              <div className="absolute bottom-2 left-[19px] top-2 w-px bg-ink-200" />
              <div className="space-y-1.5">
                {methodSteps.map((s) => {
                  const isActive = s.n === activeStep;
                  const grad = phaseColors[phaseOf(s.n)];
                  return (
                    <button
                      key={s.n}
                      onClick={() => setActiveStep(s.n)}
                      className={cx(
                        "group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition",
                        isActive ? "bg-ink-50" : "hover:bg-ink-50/60"
                      )}
                    >
                      <span
                        className={cx(
                          "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-soft transition",
                          `bg-gradient-to-br ${grad}`,
                          isActive ? "scale-110 ring-4 ring-ink-50" : "opacity-85"
                        )}
                      >
                        {s.n}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cx(
                            "block truncate text-sm font-semibold",
                            isActive ? "text-ink-900" : "text-ink-600"
                          )}
                        >
                          {s.title}
                        </span>
                        <span className="block truncate text-xs text-ink-400">
                          {s.short}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="card overflow-hidden"
                >
                  <div
                    className={cx(
                      "bg-gradient-to-br p-6 text-white",
                      phaseColors[phaseOf(step.n)]
                    )}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80">
                      Step {step.n} of 12
                    </div>
                    <h3 className="mt-1 text-2xl font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                      {step.detail}
                    </p>
                  </div>
                  <div className="space-y-4 p-6">
                    {step.callouts?.map((c) => (
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
                    <div>
                      <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-400">
                        Key moves
                      </div>
                      <ul className="space-y-2">
                        {step.tips.map((t) => (
                          <li key={t} className="flex gap-2.5 text-sm text-ink-700">
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-emerald-500"
                            />
                            <span className="leading-snug">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        disabled={step.n === 1}
                        onClick={() => setActiveStep((n) => Math.max(1, n - 1))}
                        className="btn-ghost flex-1 disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <button
                        disabled={step.n === 12}
                        onClick={() => setActiveStep((n) => Math.min(12, n + 1))}
                        className="btn-primary flex-1 disabled:opacity-40"
                      >
                        Next step <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Link
                to={`/tasks/${tasks[0].meta.id}`}
                className="group mt-4 flex items-center justify-between gap-3 rounded-xl border border-ink-200/80 bg-ink-50/70 p-4 text-ink-800 transition hover:border-brand-300 hover:bg-brand-50/50 dark:bg-ink-100/40"
              >
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-brand-600">
                    Theory into practice
                  </span>
                  <span className="mt-0.5 block text-base font-extrabold leading-snug text-ink-900">
                    See the method applied to a real task
                  </span>
                </span>
                <ArrowRight
                  size={20}
                  className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <Reveal className="mt-14 border-t border-ink-200/70 pt-12">
            <div id="capabilities" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Task-design guide"
                title="What the model can — and can't — reliably do"
                sub="Use reliable skills as building blocks, then choose realistic limitations as the source of task difficulty. This keeps complexity grounded instead of decorative."
              />

              <div className="mt-7 overflow-hidden rounded-2xl border border-ink-200/80 bg-surface shadow-soft">
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
