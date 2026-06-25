import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  ChevronDown,
  CircleCheck,
  CircleSlash,
  XCircle,
  Scale,
  ListChecks,
  Info,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  GitBranch,
  Network,
  ScrollText,
  FlaskConical,
  Gavel,
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

/* ---- section registry: one entry per nav target ---- */

const groupIcons: Record<string, typeof ClipboardCheck> = {
  Prompt: FileText,
  "Input Artifacts": ImageIcon,
  Verifiers: ShieldCheck,
  "Silver Trajectory": GitBranch,
  Trajectory: Network,
  "Rubric Criteria": ScrollText,
  Tests: FlaskConical,
  "Failed Rubric/Unit Test": Gavel,
};

const slug = (s: string) => s.replace(/[^a-z0-9]/gi, "-").toLowerCase();

interface NavItem {
  id: string;
  label: string;
  icon: typeof ClipboardCheck;
  count?: number;
}

const navItems: NavItem[] = [
  ...specGroups.map((g) => ({
    id: slug(g.group),
    label: g.group,
    icon: groupIcons[g.group] ?? ClipboardCheck,
    count: g.dimensions.length,
  })),
  { id: "weights", label: "Weight Definitions", icon: Scale, count: weightBuckets.length },
  { id: "rubric-quality", label: "Rubric Quality", icon: ListChecks, count: rubricQualityIssues.length },
];

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
  const [active, setActive] = useState<string>(navItems[0].id);
  const dimensionCount = specGroups.reduce((n, g) => n + g.dimensions.length, 0);
  const activeGroup = specGroups.find((g) => slug(g.group) === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Scoring Spec"
          title="How every task gets scored"
          sub={`The L0 review QC rubric, the exact standard a task is graded against across ${dimensionCount} dimensions. Pick a section to jump straight to it.`}
        />
      </Reveal>

      <div className="mt-8 lg:grid lg:grid-cols-[236px_1fr] lg:gap-8">
        {/* Sidebar nav */}
        <nav className="mb-6 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const on = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cx(
                    "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition lg:w-full",
                    on
                      ? "bg-brand-600 text-white shadow-glow"
                      : "text-ink-600 hover:bg-ink-100 dark:hover:bg-ink-200/50"
                  )}
                >
                  <Icon size={16} className={cx("shrink-0", on ? "text-white" : "text-ink-400")} />
                  <span className="whitespace-nowrap lg:whitespace-normal">{item.label}</span>
                  {item.count != null && (
                    <span
                      className={cx(
                        "ml-auto hidden rounded-full px-1.5 text-[11px] font-bold lg:inline",
                        on ? "bg-white/25 text-white" : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Active section */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          {activeGroup && <GroupSection group={activeGroup} />}
          {active === "weights" && <WeightSection />}
          {active === "rubric-quality" && <RubricQualitySection />}
        </motion.div>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, note }: { icon: typeof ClipboardCheck; title: string; note?: string }) {
  return (
    <div className="mb-5 flex items-start gap-3 border-b border-ink-200/70 pb-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
        <Icon size={20} />
      </span>
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900">{title}</h2>
        {note && <p className="mt-0.5 text-[13px] text-ink-500">{note}</p>}
      </div>
    </div>
  );
}

/* compact score legend, shown atop every dimension group */
function Legend() {
  const items = [
    { icon: XCircle, label: "Fail", score: 2, tone: "text-rose-600 dark:text-rose-400" },
    { icon: CircleSlash, label: "Non-Fail", score: 3, tone: "text-amber-600 dark:text-amber-400" },
    { icon: CircleCheck, label: "Pass", score: 5, tone: "text-emerald-600 dark:text-emerald-400" },
  ];
  return (
    <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-ink-200/70 bg-ink-50/50 px-4 py-2.5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <span key={it.label} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-600">
            <Icon size={14} className={it.tone} />
            {it.label}
            <span className="text-ink-400">· {it.score}</span>
          </span>
        );
      })}
    </div>
  );
}

function GroupSection({ group }: { group: { group: string; dimensions: SpecDimension[] } }) {
  const Icon = groupIcons[group.group] ?? ClipboardCheck;
  return (
    <section>
      <SectionHeader
        icon={Icon}
        title={group.group}
        note={`${group.dimensions.length} dimension${group.dimensions.length > 1 ? "s" : ""}`}
      />
      <Legend />
      <div className="space-y-5">
        {group.dimensions.map((dim) => (
          <DimensionCard key={dim.name} dim={dim} />
        ))}
      </div>
    </section>
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

function WeightSection() {
  return (
    <section>
      <SectionHeader
        icon={Scale}
        title="Criteria Weight Definitions"
        note={`Update 06/10 · ${weightBuckets.length} weight buckets and the four difficulty dimensions`}
      />

      <Card>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-600">4 Difficulty Dimensions</div>
        <ul className="space-y-1.5">
          {difficultyDimensions.map((d) => (
            <li key={d} className="flex gap-2 text-[13px] leading-relaxed text-ink-700">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
              {d}
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-4 space-y-3">
        {weightBuckets.map((b) => {
          const positive = b.score > 0;
          return (
            <div
              key={b.level}
              className={cx(
                "card border-l-4 p-4",
                positive ? "border-l-brand-400 dark:border-l-brand-500/60" : "border-l-rose-400 dark:border-l-rose-500/60"
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
              <p className="mt-2.5 whitespace-pre-line text-[13px] leading-relaxed text-ink-600">{b.definition}</p>
              <div className="mt-3 rounded-lg bg-ink-50/70 p-3 dark:bg-ink-100/40">
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">Typical examples</div>
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

function RubricQualitySection() {
  const severities: IssueSeverity[] = ["Major", "Moderate", "Minor"];
  return (
    <section>
      <SectionHeader
        icon={ListChecks}
        title="Rubric Quality Definitions"
        note={`${rubricQualityIssues.length} criterion error types, by severity`}
      />
      <div className="space-y-6">
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
                    <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-ink-600">{iss.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-ink-200/70 bg-surface p-4">{children}</div>;
}
