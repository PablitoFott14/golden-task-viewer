import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  Quote,
  CheckCircle2,
  ScrollText,
  FlaskConical,
  MessageSquare,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { getTask } from "../data";
import type { FrictionPoint } from "../data/types";
import { assetUrl, docUrl, cx } from "../lib/assets";
import { useScrollSpy } from "../lib/useScrollSpy";
import { Pill, Stat, RawText } from "../components/ui";
import ImageGallery from "../components/ImageGallery";
import FolderTree from "../components/FolderTree";
import RubricExplorer from "../components/RubricExplorer";
import TrajectoryReport from "../components/TrajectoryReport";
import MarkdownDoc from "../components/MarkdownDoc";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "persona", label: "Persona" },
  { id: "brainstorm", label: "Brainstorm" },
  { id: "reality", label: "Build reality" },
  { id: "inputs", label: "MM inputs" },
  { id: "prompt", label: "The prompt" },
  { id: "gtfa", label: "Ground Truth" },
  { id: "actual", label: "Initial run" },
  { id: "silver", label: "Silver trajectory" },
  { id: "tests", label: "Unit tests" },
  { id: "rubrics", label: "Rubrics" },
  { id: "artifacts", label: "Raw artifacts" },
];

export default function TaskDetail() {
  const { id } = useParams();
  const task = getTask(id ?? "");
  const active = useScrollSpy(SECTIONS.map((s) => s.id));

  if (!task) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <Link to="/tasks" className="btn-primary mt-6">
          Back to tasks
        </Link>
      </div>
    );
  }

  const m = task.meta;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/tasks"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition hover:text-ink-800"
      >
        <ArrowLeft size={16} /> All Golden Tasks
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-[200px_1fr]">
        {/* Side nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wide text-ink-400">
              Walkthrough
            </div>
            <nav className="space-y-0.5">
              {SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-sm transition",
                    active === s.id
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
                  )}
                >
                  <span
                    className={cx(
                      "grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold",
                      active === s.id
                        ? "bg-brand-600 text-white"
                        : "bg-ink-100 text-ink-400"
                    )}
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 space-y-20">
          {/* ===== Overview ===== */}
          <Section id="overview" n={1} title={m.title} kicker="Golden Task">
            <p className="text-lg leading-relaxed text-ink-600">{m.oneLiner}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Category" value={m.category} />
              <Stat label="Subcategory" value={m.subcategory} />
              <Stat label="Universe" value={m.universe} />
              <Stat label="Output" value={m.outputType} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {m.modalities.map((mod) => (
                <Pill key={mod} className="bg-ink-100 text-ink-600">
                  {mod}
                </Pill>
              ))}
            </div>
          </Section>

          {/* ===== Persona ===== */}
          <Section
            id="persona"
            n={2}
            title="Persona Understanding"
            kicker="Step 1 — Persona"
            sub="The category must fit the persona's life naturally."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {task.personaHighlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-ink-200/70 bg-surface p-4"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                    {h.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-ink-800">{h.value}</div>
                </div>
              ))}
            </div>
            <ExpandableDoc
              label="Read the full persona_context.md"
              url={docUrl(task.assetRoot, "persona_context.md")}
            />
          </Section>

          {/* ===== Brainstorm ===== */}
          <Section
            id="brainstorm"
            n={3}
            title="Brainstorming & Choosing"
            kicker="Steps 2–3 — Brainstorm & choose"
            sub="Three realistic angles were considered. The chosen one leaves the most room for natural complexity."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {task.brainstorm.map((idea) => (
                <div
                  key={idea.title}
                  className={cx(
                    "relative rounded-2xl border p-5 transition",
                    idea.chosen
                      ? "border-emerald-300 bg-emerald-50/40 shadow-glow dark:border-emerald-500/40 dark:bg-emerald-500/10"
                      : "border-ink-200/70 bg-surface opacity-80"
                  )}
                >
                  {idea.chosen && (
                    <span className="absolute -top-2.5 left-4 chip bg-emerald-500 text-white">
                      <CheckCircle2 size={12} /> Chosen
                    </span>
                  )}
                  <h3 className="mt-1 text-sm font-bold text-ink-900">{idea.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
                    {idea.body}
                  </p>
                  {idea.why && (
                    <p className="mt-3 rounded-lg bg-surface/70 p-3 text-[13px] leading-relaxed text-ink-700">
                      <span className="font-semibold text-emerald-700">Why this one: </span>
                      {idea.why}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* ===== Build the reality ===== */}
          <Section
            id="reality"
            n={4}
            title="Build the Reality First"
            kicker="Step 4 — Build the reality"
            sub="Before writing the prompt, decide what multimodal context could realistically exist for this June recovery — then lock the strategy for it."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-bold text-ink-900">
                  What context could exist?
                </h3>
                <ul className="space-y-2.5">
                  {task.realityFirst.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-ink-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      <span className="leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-bold text-ink-900">
                  The locked multimodal strategy
                </h3>
                <ul className="space-y-2.5">
                  {task.mmStrategy.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-ink-600">
                      <span className="mt-0.5 shrink-0 text-gold-500">◆</span>
                      <span className="leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* ===== MM inputs ===== */}
          <Section
            id="inputs"
            n={5}
            title="The Multimodal Inputs"
            kicker="Step 5 — MM inputs"
            sub="Two handwritten notes are the SSOT. A mixed caption file and 23 images must be audited against them. Filter by role and click any asset for details."
          >
            {/* SSOT spotlight */}
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <span className="chip bg-gold-100 text-gold-800">SSOT</span>
                <h3 className="text-sm font-bold text-ink-900">
                  The two handwritten pages — the single source of truth
                </h3>
              </div>
              <p className="mb-4 max-w-2xl text-sm text-ink-500">
                The notes are intentionally messy, but still readable — a rushed two-page draft jotted down
                during the emergency meeting, covering the whole of June. When a line is genuinely hard to
                make out, the GTFA is the tie-breaker for what it says.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {task.assets
                  .filter((a) => a.role === "ssot")
                  .map((a) => (
                    <div
                      key={a.filename}
                      className="overflow-hidden rounded-2xl border border-gold-200 bg-surface shadow-soft"
                    >
                      <div className="bg-[#0b0e16] p-3">
                        <img
                          src={assetUrl(task.assetRoot, a.src)}
                          alt={a.whatItShows}
                          className="mx-auto max-h-[360px] w-auto rounded-lg object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <div className="font-mono text-[11px] text-ink-400">
                          {a.filename}
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
                          {a.whatItShows}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* full gallery */}
            <h3 className="mb-3 text-sm font-bold text-ink-900">
              Every recovered asset, classified
            </h3>
            <ImageGallery
              assets={task.assets.filter((a) => a.role !== "ssot")}
              assetRoot={task.assetRoot}
            />

            {/* Raw caption file, exposed inline */}
            <div className="mt-8">
              <h3 className="mb-1 text-sm font-bold text-ink-900">The mixed caption file</h3>
              <p className="mb-3 max-w-2xl text-sm text-ink-500">
                <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-xs text-brand-700">
                  text_post.txt
                </code>{" "}
                holds every recovered June caption in one file — numbered, but not attributed to any post.
              </p>
              <RawFile
                label="Read the raw text_post.txt"
                file="text_post.txt"
                note={task.captionsFile.note}
                url={assetUrl(task.assetRoot, task.captionsFile.path)}
              />
            </div>

            {/* Controlled friction, integrated here */}
            <div className="mt-10">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-gold-500" />
                <h3 className="text-sm font-bold text-ink-900">
                  The controlled friction planted across these inputs
                </h3>
              </div>
              <p className="mb-4 max-w-2xl text-sm text-ink-500">
                Each friction point below was embedded on purpose, yet every one is the kind of mess a real
                June recovery would contain. It is spread deliberately across the handwritten notes, the
                images, and the mixed caption file — so no single misread decides the task. Together they
                cover mismatches to log, files expected to be removed, and information that is simply
                missing.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {task.friction.map((f) => (
                  <FrictionCard key={f.id} f={f} />
                ))}
              </div>
            </div>
          </Section>

          {/* ===== Prompt ===== */}
          <Section
            id="prompt"
            n={6}
            title="Materialize the Prompt"
            kicker="Step 6 — The prompt"
            sub="The prompt stays high-level and natural. The annotations on the right explain the structural intent behind each key phrase."
          >
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl border border-ink-200/70 bg-surface p-6 shadow-soft">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-ink-400">
                  <Quote size={14} /> prompt.md
                </div>
                <div className="space-y-4 whitespace-pre-line text-[15px] leading-relaxed text-ink-700">
                  {task.prompt}
                </div>
              </div>
              <div>
                <div className="mb-3 text-[11px] font-bold uppercase tracking-wide text-ink-400">
                  Decoding the intent
                </div>
                <div className="space-y-2.5">
                  {task.promptAnnotations.map((a, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-ink-200/70 bg-surface p-3.5"
                    >
                      <div className="text-[13px] font-semibold italic text-brand-700 dark:text-brand-300">
                        "{a.quote}"
                      </div>
                      <div className="mt-1.5 text-[13px] leading-snug text-ink-600">
                        {a.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ===== GTFA ===== */}
          <Section
            id="gtfa"
            n={7}
            title="The Ground Truth Final Answer"
            kicker="Step 7 — GTFA"
            sub="The one correct deliverable, built by hand before the prompt was written. This is the intended solution and the behavior a correct agent should produce."
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                  <ScrollText size={16} className="text-brand-500" /> The output folder tree
                </h3>
                <FolderTree root={task.deliverableTree} />
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                  <CheckCircle2 size={16} className="text-emerald-500" /> The expected behavior
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Organize every piece of content by platform first, then by planned date in MM-DD folders, with each post's media and its split MM-DD.txt caption inside.",
                    "Produce a MEMORY.md that logs anything missing or mismatching, in the Platform > MM-DD > issue format the prompt defines.",
                    "Report any removed content in the final user-facing message.",
                    "Send Trevor and Maya an email summarizing the mismatches to fix.",
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-700">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <ExpandableDoc
                  label="Read the raw GTFA.md"
                  url={docUrl(task.assetRoot, "GTFA.md")}
                />
              </div>
            </div>
          </Section>

          {/* ===== Initial run (what actually happened) ===== */}
          <Section
            id="actual"
            n={8}
            title="What the Model Actually Did"
            kicker="Steps 8–9 — Run & cross-reference"
            sub="Reconstructed directly from the seed trajectory and its workspace — a single prompt-agent interaction, compared against the GTFA."
          >
            <TrajectoryReport run={task.actualRun} />
          </Section>

          {/* ===== Silver ===== */}
          <Section
            id="silver"
            n={9}
            title="The Silver Trajectory"
            kicker="Step 10 — Silver trajectory"
            sub="Targeted follow-ups guide the model to the correct answer, always restoring to seed. Each one targets a specific failure observed in the run above."
          >
            <div className="relative space-y-4 pl-8">
              <div className="absolute bottom-4 left-[11px] top-4 w-px bg-ink-200" />
              {task.silver
                .filter((s) => s.n !== task.silver.length)
                .map((s) => (
                  <div key={s.n} className="relative">
                    <span className="absolute -left-8 grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                      {s.n}
                    </span>
                    <div className="rounded-xl border border-ink-200/70 bg-surface p-4 shadow-soft">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={14} className="text-brand-500" />
                        <span className="text-sm font-bold text-ink-900">{s.label}</span>
                      </div>
                      <p className="mt-2 rounded-lg bg-ink-50 p-3 text-[13px] italic leading-relaxed text-ink-600">
                        {s.message}
                      </p>
                      <p className="mt-2 text-[13px] text-ink-500">
                        <span className="font-semibold text-ink-700">Effect: </span>
                        {s.fixes}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Prominent successful-outcome banner */}
            <div className="mt-6 overflow-hidden rounded-2xl border-2 border-emerald-400 shadow-glow dark:border-emerald-500/60">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 px-6 py-5 text-white">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={28} className="shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                      Correct solution reached
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight">
                      The model completed everything the user asked for
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50/70 p-5 dark:bg-emerald-500/10">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Workspace changes", "All content reorganized into the correct Platform › MM-DD folder tree, including the recovered X channel."],
                    ["State change", "The email to trevor@vaulta.io and maya@vaulta.io was actually sent with the mismatches."],
                    ["Final assistant response", "Every removed distractor and the duplicate were reported back to the user."],
                    ["Final artifacts", "MEMORY.md logs all missing and mismatching items in the required format; captions split into MM-DD.txt files."],
                  ].map(([h, b]) => (
                    <div
                      key={h}
                      className="flex gap-2.5 rounded-xl border border-emerald-200 bg-surface p-3.5 dark:border-emerald-500/30"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <div>
                        <div className="text-[13px] font-bold text-ink-900">{h}</div>
                        <div className="mt-0.5 text-[12px] leading-relaxed text-ink-600">{b}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[13px] font-semibold text-emerald-700 dark:text-emerald-300">
                  End state: the deliverable now matches the Ground Truth Final Answer — restored from
                  seed, never started fresh.
                </p>
              </div>
            </div>
          </Section>

          {/* ===== Unit tests ===== */}
          <Section
            id="tests"
            n={10}
            title="Unit Tests"
            kicker="Step 11 — Unit tests (reviewers only)"
            sub="Reviewer-only checks for the platform folders and the date folders."
          >
            <CodeReveal label="unit_tests.py" code={task.unitTestCode} />
          </Section>

          {/* ===== Rubrics ===== */}
          <Section
            id="rubrics"
            n={11}
            title="The Rubric Set"
            kicker="Step 12 — Rubrics"
            sub="The exact 27 criteria, each marked Present / Not Present against the initial run. Open any criterion to see why it exists, what it checks, and what the model did against it."
          >
            <RubricExplorer rubrics={task.rubrics} designNotes={task.rubricDesign} />
          </Section>

          {/* ===== Artifacts ===== */}
          <Section
            id="artifacts"
            n={12}
            title="Raw Artifacts"
            kicker="Source documents"
            sub="The original files produced for this task, rendered for reference."
          >
            <div className="space-y-2.5">
              {task.artifactDocs.map((d) => (
                <ExpandableDoc
                  key={d.file}
                  label={`${d.label} — ${d.description}`}
                  file={d.file}
                  url={docUrl(task.assetRoot, d.file)}
                />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Section({
  id,
  n,
  title,
  kicker,
  sub,
  children,
}: {
  id: string;
  n: number;
  title: string;
  kicker?: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6 border-b border-ink-200/70 pb-5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-ink-900 text-[11px] font-bold text-ink-50">
            {n}
          </span>
          {kicker && (
            <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
              {kicker}
            </span>
          )}
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-900">
          {title}
        </h2>
        {sub && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

const frictionTone: Record<FrictionPoint["type"], string> = {
  missing: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  mismatch: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  removable: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  perception: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
};

const frictionLabel: Record<FrictionPoint["type"], string> = {
  missing: "Missing",
  mismatch: "Mismatch",
  removable: "Remove",
  perception: "Notes",
};

function FrictionCard({ f }: { f: FrictionPoint }) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-surface p-4 shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <AlertTriangle size={15} className="text-gold-500" />
          {f.title}
        </h3>
        <span className={cx("chip shrink-0", frictionTone[f.type])}>
          {frictionLabel[f.type]}
        </span>
      </div>
      <div className="mt-1.5 font-mono text-[11px] text-ink-400">{f.where}</div>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{f.description}</p>
    </div>
  );
}

function CodeReveal({ label, code }: { label: string; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200/70 bg-surface shadow-soft">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-ink-50"
      >
        <FlaskConical size={16} className="shrink-0 text-brand-500" />
        <span className="mr-auto rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-600">
          {label}
        </span>
        <span className="text-xs font-semibold text-ink-500">{open ? "Hide code" : "View code"}</span>
        {open ? (
          <EyeOff size={16} className="shrink-0 text-ink-400" />
        ) : (
          <Eye size={16} className="shrink-0 text-ink-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <pre className="max-h-[560px] overflow-auto border-t border-ink-100 bg-ink-50 p-4 font-mono text-[12px] leading-relaxed text-ink-700">
              {code}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RawFile({
  label,
  url,
  file,
  note,
}: {
  label: string;
  url: string;
  file: string;
  note?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-violet-200 bg-surface dark:border-violet-500/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-ink-50"
      >
        <FileText size={16} className="shrink-0 text-violet-500" />
        <span className="min-w-0 flex-1">
          <span className="mr-2 rounded bg-violet-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
            {file}
          </span>
          <span className="text-sm font-medium text-ink-700">{label}</span>
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 rounded-md p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
          title="Open raw file"
        >
          <ExternalLink size={14} />
        </a>
        {open ? (
          <EyeOff size={16} className="shrink-0 text-ink-400" />
        ) : (
          <Eye size={16} className="shrink-0 text-ink-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-100 p-4">
              {note && (
                <p className="mb-3 text-[13px] leading-relaxed text-ink-500">{note}</p>
              )}
              <RawText url={url} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExpandableDoc({
  label,
  url,
  file,
}: {
  label: string;
  url: string;
  file?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-ink-200/70 bg-surface">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-ink-50"
      >
        <FileText size={16} className="shrink-0 text-brand-500" />
        <span className="min-w-0 flex-1">
          {file && (
            <span className="mr-2 rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-600">
              {file}
            </span>
          )}
          <span className="text-sm font-medium text-ink-700">{label}</span>
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 rounded-md p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
          title="Open raw file"
        >
          <ExternalLink size={14} />
        </a>
        {open ? (
          <EyeOff size={16} className="shrink-0 text-ink-400" />
        ) : (
          <Eye size={16} className="shrink-0 text-ink-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="max-h-[600px] overflow-y-auto border-t border-ink-100 p-5">
              <MarkdownDoc url={url} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
