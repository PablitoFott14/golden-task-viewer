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
} from "lucide-react";
import { methodSteps, modelCapabilityReference } from "../data/method";
import type { ModelCapabilityReference } from "../data/types";
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
  const reliable = modelCapabilityReference.filter((c) => c.kind === "reliable");
  const levers = modelCapabilityReference.filter((c) => c.kind === "lever");

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
            <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
              Natural complexity is what drives success
              <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
                {" "}in this project.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-bold uppercase tracking-wide text-brand-600 sm:text-2xl">
              Let your imagination lead the way.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
              Realistic, naturally complex scenarios are the foundation of every successful task —
              not artificial constraints or forced difficulty.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/tasks" className="btn-primary">
                Explore Golden Tasks <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => scrollToId("method")}
                className="btn-ghost"
              >
                <Compass size={16} /> See the method
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-ink-400">Jump straight to:</span>
              <button
                onClick={() => scrollToId("capabilities")}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                <ShieldCheck size={14} /> Model capabilities
              </button>
              <button
                onClick={() => scrollToId("levers")}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[13px] font-bold text-amber-700 transition hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
              >
                <AlertTriangle size={14} /> Task levers
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
            <SectionHeading
              eyebrow="Task-design guide"
              title="What the model can — and can't — reliably do"
              sub="This is the foundation for every design decision. Reliable capabilities are what you build on; the model's limitations are where genuine challenge comes from. A strong task pairs a dependable baseline with one or more natural failure modes — never strengths alone (too easy), never an isolated gotcha (not a real capability test)."
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: <ShieldCheck size={16} />,
                  box: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
                  head: "Capabilities are foundations",
                  body: "Skills the model handles reliably. Anchor the task on them — but a task that only exercises these will be too easy to fail.",
                },
                {
                  icon: <AlertTriangle size={16} />,
                  box: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
                  head: "Limitations are your levers",
                  body: "Where the model struggles. Each weakness is a lever you can pull to create honest difficulty that a careful agent could still get wrong.",
                },
                {
                  icon: <GitBranch size={16} />,
                  box: "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300",
                  head: "Design combines both",
                  body: "Difficulty comes from requiring a reliable skill and a known weakness together — naturally in the scenario, not bolted on.",
                },
              ].map((c) => (
                <div key={c.head} className="rounded-xl border border-ink-200/70 bg-surface p-4 shadow-soft">
                  <div className={cx("grid h-9 w-9 place-items-center rounded-lg", c.box)}>{c.icon}</div>
                  <h3 className="mt-3 text-sm font-bold text-ink-900">{c.head}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 space-y-10">
              <CapabilityGroup
                id="capabilities"
                kind="reliable"
                title="What it can reliably do — your foundations"
                blurb="Assume these work. Use them to anchor a task, then make the task depend on more than just these."
                headWhat="What this means"
                headMove="How to use it in a task"
                items={reliable}
              />
              <CapabilityGroup
                id="levers"
                kind="lever"
                title="What it can't reliably do — your task levers"
                blurb="These are the failure modes that create real challenge. Require one or more, in a way that feels natural to the persona and scenario."
                headWhat="What goes wrong"
                headMove="How to turn it into challenge"
                items={levers}
              />
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-400">
              Grounded in the project reference{" "}
              <a
                href={`${import.meta.env.BASE_URL}method/what_the_model_can_do.md`}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-300"
              >
                what_the_model_can_do.md
              </a>{" "}
              — the source of truth for what the model can and cannot reliably do.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function CapabilityGroup({
  id,
  kind,
  title,
  blurb,
  headWhat,
  headMove,
  items,
}: {
  id: string;
  kind: "reliable" | "lever";
  title: string;
  blurb: string;
  headWhat: string;
  headMove: string;
  items: ModelCapabilityReference[];
}) {
  const tone = capabilityTone[kind];
  const Icon = tone.icon;
  return (
    <div id={id} className="scroll-mt-24">
      <div className="mb-4 flex items-start gap-3">
        <span className={cx("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl", tone.iconBox)}>
          <Icon size={18} />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-ink-900">{title}</h3>
          <p className="mt-0.5 max-w-2xl text-sm leading-relaxed text-ink-500">{blurb}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-surface shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-ink-50">
              <tr className="border-b border-ink-200/70 text-[11px] font-bold uppercase tracking-wide text-ink-400">
                <th className="min-w-52 px-5 py-3">{kind === "reliable" ? "Capability" : "Limitation"}</th>
                <th className="min-w-[20rem] px-5 py-3">{headWhat}</th>
                <th className="min-w-[20rem] px-5 py-3">{headMove}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200/60">
              {items.map((item) => (
                <tr key={item.capability} className="align-top transition hover:bg-ink-50/70">
                  <td className="px-5 py-4 font-semibold text-ink-900">{item.capability}</td>
                  <td className="px-5 py-4 leading-relaxed text-ink-600">{item.summary}</td>
                  <td className="px-5 py-4 leading-relaxed text-ink-700">
                    <div className="flex gap-2.5">
                      <span className={cx("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg", tone.iconBox)}>
                        <Icon size={14} />
                      </span>
                      <span>{item.contributorMove}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
