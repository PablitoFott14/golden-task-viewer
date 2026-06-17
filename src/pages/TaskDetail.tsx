import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  Mail,
  Trash2,
  AlertTriangle,
  Quote,
  CheckCircle2,
  XCircle,
  SplitSquareHorizontal,
  ScrollText,
  FlaskConical,
  MessageSquare,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { getTask } from "../data";
import type { CaptionItem, FrictionPoint } from "../data/types";
import { assetUrl, docUrl, cx, roleStyles } from "../lib/assets";
import { useScrollSpy } from "../lib/useScrollSpy";
import { Pill, Stat } from "../components/ui";
import ImageGallery from "../components/ImageGallery";
import FolderTree from "../components/FolderTree";
import RubricExplorer from "../components/RubricExplorer";
import MarkdownDoc from "../components/MarkdownDoc";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "persona", label: "Persona" },
  { id: "brainstorm", label: "Brainstorm" },
  { id: "reality", label: "Build reality" },
  { id: "inputs", label: "MM inputs" },
  { id: "prompt", label: "The prompt" },
  { id: "gtfa", label: "Ground Truth" },
  { id: "friction", label: "Friction map" },
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
                  className="rounded-xl border border-ink-200/70 bg-white p-4"
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
                      ? "border-emerald-300 bg-emerald-50/40 shadow-glow"
                      : "border-ink-200/70 bg-white opacity-80"
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
                    <p className="mt-3 rounded-lg bg-white/70 p-3 text-[13px] leading-relaxed text-ink-700">
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
            kicker="Steps 4–5 — Build the reality"
            sub="Decide what multimodal context could exist and where friction points are planted — before writing the prompt."
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
              <div className="mb-3 flex items-center gap-2">
                <span className="chip bg-gold-100 text-gold-800">SSOT</span>
                <h3 className="text-sm font-bold text-ink-900">
                  The two handwritten pages — the single source of truth
                </h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {task.assets
                  .filter((a) => a.role === "ssot")
                  .map((a) => (
                    <div
                      key={a.filename}
                      className="overflow-hidden rounded-2xl border border-gold-200 bg-white shadow-soft"
                    >
                      <div className="bg-ink-950 p-3">
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
                        <p className="mt-2 rounded-lg bg-gold-50 px-3 py-2 text-[13px] leading-relaxed text-ink-700">
                          <span className="font-semibold text-gold-800">Why it works: </span>
                          {a.rationale}
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

            {/* captions breakdown */}
            <div className="mt-10">
              <h3 className="mb-1 text-sm font-bold text-ink-900">
                Untangling the mixed caption file
              </h3>
              <p className="mb-4 text-sm text-ink-500">
                <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-xs text-brand-700">
                  text_post.txt
                </code>{" "}
                holds every caption jumbled together. Each block must be matched to a post —
                and most carry a planted mismatch.
              </p>
              <div className="space-y-2.5">
                {task.captions.map((c) => (
                  <CaptionRow key={c.n} c={c} />
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
              <div className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-soft">
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
                      className="rounded-xl border border-ink-200/70 bg-white p-3.5"
                    >
                      <div className="text-[13px] font-semibold italic text-brand-700">
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
            sub="The Ground Truth Final Answer — the one correct deliverable, built by hand before the prompt was written."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                  <ScrollText size={16} className="text-brand-500" /> The output folder tree
                </h3>
                <FolderTree root={task.deliverableTree} />
              </div>
              <div className="space-y-6">
                {/* MEMORY */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                    <FileText size={16} className="text-amber-500" /> MEMORY.md log
                  </h3>
                  <div className="space-y-1.5">
                    {task.memory.map((e, i) => (
                      <div
                        key={i}
                        className={cx(
                          "rounded-lg border p-2.5 text-[13px]",
                          e.category === "missing"
                            ? "border-sky-200 bg-sky-50/50"
                            : "border-amber-200 bg-amber-50/50"
                        )}
                      >
                        <span
                          className={cx(
                            "chip mr-2 align-middle",
                            e.category === "missing"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-amber-100 text-amber-700"
                          )}
                        >
                          {e.category}
                        </span>
                        <span className="font-mono text-[11px] text-ink-500">
                          {e.location}
                        </span>
                        <div className="mt-1 text-ink-700">{e.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* removed + email */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-rose-700">
                  <Trash2 size={16} /> Reported as removed (final message)
                </h3>
                <ul className="space-y-2">
                  {task.removed.map((r, i) => (
                    <li key={i} className="text-[13px] text-ink-700">
                      <span className="font-mono text-[12px] font-semibold text-rose-700">
                        {r.item}
                      </span>
                      <span className="text-ink-500"> — {r.why}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50/40 p-5">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-fuchsia-700">
                  <Mail size={16} /> Email to the team
                </h3>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {task.email.to.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-fuchsia-700 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {task.email.points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-ink-700">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ExpandableDoc
              label="Read the raw GTFA.md"
              url={docUrl(task.assetRoot, "GTFA.md")}
            />
          </Section>

          {/* ===== Friction map ===== */}
          <Section
            id="friction"
            n={8}
            title="The Friction Map"
            kicker="Friction points"
            sub="Where the model is expected to fail. Difficulty is spread across multiple natural friction points."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {task.friction.map((f) => (
                <FrictionCard key={f.id} f={f} />
              ))}
            </div>
          </Section>

          {/* ===== Silver ===== */}
          <Section
            id="silver"
            n={9}
            title="The Silver Trajectory"
            kicker="Step 10 — Silver trajectory"
            sub="Targeted follow-ups guide the model to the correct answer, always restoring to seed."
          >
            <div className="relative space-y-4 pl-8">
              <div className="absolute bottom-4 left-[11px] top-4 w-px bg-ink-200" />
              {task.silver.map((s) => (
                <div key={s.n} className="relative">
                  <span
                    className={cx(
                      "absolute -left-8 grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white",
                      s.n === task.silver.length ? "bg-emerald-500" : "bg-brand-500"
                    )}
                  >
                    {s.n === task.silver.length ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      s.n
                    )}
                  </span>
                  <div className="rounded-xl border border-ink-200/70 bg-white p-4 shadow-soft">
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
          </Section>

          {/* ===== Unit tests ===== */}
          <Section
            id="tests"
            n={10}
            title="Unit Test References"
            kicker="Step 11 — Unit tests (reviewers only)"
            sub="Names and descriptions for the structural checks reviewers will implement."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {["Platform folders", "Date folders"].map((group) => (
                <div key={group}>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                    <FlaskConical size={15} className="text-brand-500" /> {group}
                  </h3>
                  <div className="space-y-2">
                    {task.unitTests
                      .filter((t) => t.group === group)
                      .map((t) => (
                        <div
                          key={t.ref}
                          className="rounded-xl border border-ink-200/70 bg-white p-3"
                        >
                          <code className="font-mono text-[12px] font-semibold text-brand-700">
                            {t.ref}
                          </code>
                          <p className="mt-1 text-[13px] leading-snug text-ink-600">
                            {t.logic}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ===== Rubrics ===== */}
          <Section
            id="rubrics"
            n={11}
            title="The Rubric Set"
            kicker="Step 12 — Rubrics"
            sub="One rubric per prompt requirement. Each includes rationale, the requirement it enforces, and its weight. Click to expand."
          >
            <RubricExplorer rubrics={task.rubrics} />
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
          <span className="grid h-6 w-6 place-items-center rounded-md bg-ink-900 text-[11px] font-bold text-white">
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

const captionStatus = {
  correct: { icon: <CheckCircle2 size={15} />, cls: "bg-emerald-100 text-emerald-700", label: "Correct" },
  mismatch: { icon: <XCircle size={15} />, cls: "bg-amber-100 text-amber-700", label: "Mismatch" },
  split: {
    icon: <SplitSquareHorizontal size={15} />,
    cls: "bg-violet-100 text-violet-700",
    label: "Split",
  },
};

function CaptionRow({ c }: { c: CaptionItem }) {
  const [open, setOpen] = useState(false);
  const st = captionStatus[c.status];
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200/70 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-100 text-xs font-bold text-ink-500">
          {c.n}
        </span>
        <span className={cx("chip shrink-0", st.cls)}>
          {st.icon}
          {st.label}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] text-ink-600">
          {c.excerpt}
        </span>
        <ChevronDown
          size={16}
          className={cx("shrink-0 text-ink-400 transition", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 border-t border-ink-100 px-3 pb-3 pt-2.5">
              <p className="text-[13px] italic leading-relaxed text-ink-500">
                "{c.excerpt}"
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[13px]">
                <span className="font-semibold text-ink-700">Belongs to:</span>
                <span className="rounded-md bg-brand-50 px-2 py-0.5 font-mono text-[11px] text-brand-700">
                  {c.belongsTo}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-600">{c.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const frictionTone: Record<FrictionPoint["type"], string> = {
  missing: "bg-sky-100 text-sky-700",
  mismatch: "bg-amber-100 text-amber-700",
  removable: "bg-rose-100 text-rose-700",
  perception: "bg-fuchsia-100 text-fuchsia-700",
};

function FrictionCard({ f }: { f: FrictionPoint }) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <AlertTriangle size={15} className="text-gold-500" />
          {f.title}
        </h3>
        <span className={cx("chip shrink-0 capitalize", frictionTone[f.type])}>
          {f.type}
        </span>
      </div>
      <div className="mt-1.5 font-mono text-[11px] text-ink-400">{f.where}</div>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{f.description}</p>
      <p className="mt-2 rounded-lg bg-ink-50 px-3 py-2 text-[13px] leading-relaxed text-ink-700">
        <span className="font-semibold text-brand-700">Why it works: </span>
        {f.whyItWorks}
      </p>
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
    <div className="mt-4 overflow-hidden rounded-xl border border-ink-200/70 bg-white">
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
