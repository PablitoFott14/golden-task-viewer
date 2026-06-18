import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Lightbulb,
  Target,
  GitBranch,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { methodSteps } from "../data/method";
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

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const step = methodSteps.find((s) => s.n === activeStep)!;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink-200/70 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              Golden Task Viewer
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
              Understand how successful Blue Shell tasks are designed — from persona
              research through rubric creation. Browse the method, then see it applied
              step by step in a real example.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/tasks" className="btn-primary">
                Explore Golden Tasks <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost"
              >
                <Compass size={16} /> See the method
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three principles strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The mindset"
            title="Three principles drive every task"
            sub="Before the steps, internalize the philosophy that shapes the whole methodology. Everything downstream is an expression of these."
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: <Target />,
              title: "Stepping into the user's shoes",
              body: "Create realistic, believable scenarios that resemble real-world situations rather than artificial benchmark-style tasks.",
            },
            {
              icon: <Lightbulb />,
              title: "Originality",
              body: "Go beyond common, overused scenarios and develop unique situations that naturally require complex reasoning.",
            },
            {
              icon: <GitBranch />,
              title: "Planning before execution",
              body: "Design the task before building it. Stay in control of the requirements instead of improvising midway and discovering critical issues later — don't jump into the pool before checking whether there's water in it.",
            },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  {p.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.body}</p>
              </div>
            </Reveal>
          ))}
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
                    {step.output && (
                      <div className="flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2 text-sm">
                        <span className="text-ink-400">Produces</span>
                        <code className="rounded bg-surface px-2 py-0.5 font-mono text-xs font-semibold text-brand-700 shadow-sm">
                          {step.output}
                        </code>
                      </div>
                    )}
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
                    {step.playbookLink && (
                      <div className="flex items-center gap-2 border-t border-ink-100 pt-3 text-xs text-ink-400">
                        <BookOpen size={13} />
                        Playbook: <span className="font-medium text-ink-600">{step.playbookLink}</span>
                      </div>
                    )}
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
            </div>
          </div>
        </div>
      </section>

      {/* Link to first task */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-ink-200/70 bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold text-ink-900">
                  See the method applied to a real task
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Walk through every artifact, friction point, and rubric of{" "}
                  <strong>{tasks[0].meta.title}</strong>.
                </p>
              </div>
              <Link
                to={`/tasks/${tasks[0].meta.id}`}
                className="btn-primary shrink-0"
              >
                Open task <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
