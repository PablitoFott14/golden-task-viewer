import { useState, useRef, useEffect, type ReactNode } from "react";
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
  Search,
  X,
  History,
  PenLine,
  Globe,
} from "lucide-react";
import {
  specGroups,
  weightBuckets,
  difficultyDimensions,
  rubricQualityIssues,
  type SpecDimension,
  type SpecOption,
  type IssueSeverity,
  type WeightBucket,
  type RubricQualityIssue,
} from "../data/specDoc";
import { specUpdateLog } from "../data/specChangelog";
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
  Universe: Globe,
};

const slug = (s: string) => s.replace(/[^a-z0-9]/gi, "-").toLowerCase();

interface NavItem {
  id: string;
  label: string;
  icon: typeof ClipboardCheck;
  count?: number;
}

const dimensionNav: NavItem[] = specGroups.map((g) => ({
  id: slug(g.group),
  label: g.group,
  icon: groupIcons[g.group] ?? ClipboardCheck,
  count: g.dimensions.length,
}));

const appendixNav: NavItem[] = [
  { id: "rubric-quality", label: "Rubric Quality", icon: ListChecks, count: rubricQualityIssues.length },
  { id: "weights", label: "Weight Definitions", icon: Scale, count: weightBuckets.length },
];

/* ---- text highlighting for search ---- */

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-gold-200 px-0.5 text-ink-900 dark:bg-gold-500/40 dark:text-white">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

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
  const [active, setActive] = useState<string>(dimensionNav[0].id);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const dimensionCount = specGroups.reduce((n, g) => n + g.dimensions.length, 0);
  const activeGroup = specGroups.find((g) => slug(g.group) === active);
  const searching = query.trim().length > 0;

  // "/" focuses search, Escape clears it — a Ctrl+F feel scoped to this tab.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && typing && el === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (id: string) => {
    setActive(id);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Spec Doc"
          title="Spec Doc"
          sub={`The exact standard a task is graded against, across ${dimensionCount} dimensions. Search the doc, review the dated log, or jump to a section.`}
        />
      </Reveal>

      {/* Search */}
      <Reveal>
        <div className="relative mt-7">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the Spec Doc - dimensions, weights, rubric quality..."
            className="w-full rounded-xl border border-ink-200 bg-surface py-3 pl-10 pr-24 text-sm text-ink-800 shadow-soft outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/30"
          />
          {searching ? (
            <button
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
              className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-ink-800"
            >
              <X size={14} /> Clear
            </button>
          ) : (
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[11px] font-semibold text-ink-400 sm:block">
              /
            </kbd>
          )}
        </div>
      </Reveal>

      {!searching && (
        <Reveal>
          <SpecUpdateLogPanel />
        </Reveal>
      )}

      {searching ? (
        <SearchResults query={query.trim()} />
      ) : (
        <div className="mt-6 lg:grid lg:grid-cols-[236px_1fr] lg:gap-8">
          {/* Sidebar nav */}
          <nav className="mb-6 lg:mb-0 lg:sticky lg:top-20 lg:self-start">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              <SideLabel>Dimensions</SideLabel>
              {dimensionNav.map((item) => (
                <SideButton key={item.id} item={item} active={active === item.id} onClick={() => goTo(item.id)} />
              ))}
              <SideLabel className="mt-3">Appendix</SideLabel>
              {appendixNav.map((item) => (
                <SideButton key={item.id} item={item} active={active === item.id} onClick={() => goTo(item.id)} />
              ))}
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
      )}
    </div>
  );
}

function SideLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "hidden px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400 lg:block",
        className
      )}
    >
      {children}
    </div>
  );
}

function SideButton({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={cx(
        "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition lg:w-full",
        active ? "bg-brand-600 text-white shadow-glow" : "text-ink-600 hover:bg-ink-100 dark:hover:bg-ink-200/50"
      )}
    >
      <Icon size={16} className={cx("shrink-0", active ? "text-white" : "text-ink-400")} />
      <span className="whitespace-nowrap lg:whitespace-normal">{item.label}</span>
      {item.count != null && (
        <span
          className={cx(
            "ml-auto hidden rounded-full px-1.5 text-[11px] font-bold lg:inline",
            active ? "bg-white/25 text-white" : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
          )}
        >
          {item.count}
        </span>
      )}
    </button>
  );
}

function SpecUpdateLogPanel() {
  const [latest, ...older] = specUpdateLog;
  const totalLoggedChanges = specUpdateLog.reduce((n, e) => n + (e.items?.length ?? 1), 0);
  return (
    <details className="group mt-4 rounded-2xl border border-brand-200/80 bg-brand-50/70 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
      <summary className="flex cursor-pointer list-none flex-wrap items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-glow">
          <History size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-200">
              Update Log
            </span>
            <span className="font-mono text-[11px] font-bold text-ink-400">{totalLoggedChanges} logged changes</span>
            <span className="rounded-md bg-brand-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              {latest.dateLabel}
            </span>
            {latest.items && latest.items.length > 1 && (
              <span className="rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[10px] font-bold text-ink-500 dark:bg-ink-200/60">
                {latest.items.length} requirements updated
              </span>
            )}
          </div>
          <h3 className="mt-1 text-sm font-extrabold text-ink-900">{latest.title}</h3>
          <p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-ink-600">{latest.summary}</p>
        </div>
        <ChevronDown size={18} className="mt-2 shrink-0 text-brand-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 space-y-4 border-t border-brand-200/70 pt-3 dark:border-brand-500/30">
        {latest.items && latest.items.length > 0 && (
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-200">
              Individual changes in this revision
            </div>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {latest.items.map((item, i) => (
                <div key={i} className="rounded-xl border border-brand-200/70 bg-surface/80 p-3 dark:border-brand-500/25">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                    {item.scope}
                  </span>
                  <div className="mt-2 text-[12px] font-bold leading-snug text-ink-900">{item.title}</div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {older.length > 0 && (
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">Earlier updates</div>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {older.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-brand-200/70 bg-surface/80 p-3 dark:border-brand-500/25">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-brand-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                      {entry.dateLabel}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                      {entry.scope}
                    </span>
                  </div>
                  <div className="mt-2 text-[12px] font-bold leading-snug text-ink-900">{entry.title}</div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-500">{entry.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </details>
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
    <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-ink-200/70 bg-ink-50/50 px-4 py-2.5">
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
      <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-400">
        <PenLine size={13} /> Selecting a Fail or Non-Fail option requires a written justification
      </span>
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

function DimensionCard({ dim, query, openGuidance }: { dim: SpecDimension; query?: string; openGuidance?: boolean }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-ink-100 p-5">
        {dim.conditional && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-2.5 py-1 text-[11px] font-semibold text-ink-500 dark:bg-ink-200/50">
            <Info size={12} /> <Highlight text={dim.conditional} query={query} />
          </div>
        )}
        <h3 className="text-base font-bold text-ink-900">
          <Highlight text={dim.name} query={query} />
        </h3>
        <p className="mt-1 text-[13px] font-medium text-ink-500">
          <Highlight text={dim.question} query={query} />
        </p>

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
                <Highlight text={tag.label} query={query} />
              </span>
            ))}
          </div>
        )}
      </div>

      <details className="group" open={openGuidance}>
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-ink-400 transition hover:text-ink-700">
          <ChevronDown size={15} className="transition-transform group-open:rotate-180" />
          Guidance
        </summary>
        <div className="whitespace-pre-line border-t border-ink-100 bg-ink-50/50 px-5 py-4 text-[13px] leading-relaxed text-ink-600">
          <Highlight text={dim.description} query={query} />
        </div>
      </details>

      <div className="space-y-px bg-ink-100">
        {dim.options.map((opt, i) => (
          <OptionRow key={i} opt={opt} query={query} />
        ))}
      </div>
    </div>
  );
}

function OptionRow({ opt, query }: { opt: SpecOption; query?: string }) {
  const s = scoreStyle(opt.score);
  const Icon = s.icon;
  // Per the 03 Jul 2026 export, every Fail / Non-Fail selection requires a
  // written justification; Pass selections do not.
  const requiresJustification = opt.score < 5;
  return (
    <div className={cx("border-l-4 bg-surface p-4", s.border)}>
      <div className="flex items-start gap-3">
        <span className="flex shrink-0 flex-col items-start gap-1">
          <span className={cx("inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold", s.chip)}>
            <Icon size={12} /> {s.label}
          </span>
          {requiresJustification && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink-400"
              title="Selecting this option requires a written justification"
            >
              <PenLine size={11} /> Justify
            </span>
          )}
        </span>
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink-700">
          <Highlight text={opt.text} query={query} />
        </p>
        <span className="ml-auto shrink-0 text-sm font-extrabold text-ink-300">{opt.score}</span>
      </div>
    </div>
  );
}

function WeightBucketCard({ b, query }: { b: WeightBucket; query?: string }) {
  const positive = b.score > 0;
  return (
    <div
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
        <h3 className="text-[15px] font-bold text-ink-900">
          <Highlight text={b.level} query={query} />
        </h3>
      </div>
      <p className="mt-2.5 whitespace-pre-line text-[13px] leading-relaxed text-ink-600">
        <Highlight text={b.definition} query={query} />
      </p>
      <div className="mt-3 rounded-lg bg-ink-50/70 p-3 dark:bg-ink-100/40">
        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">Typical examples</div>
        <ul className="space-y-1">
          {b.examples.map((ex) => (
            <li key={ex} className="flex gap-2 text-[12px] leading-relaxed text-ink-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
              <span>
                <Highlight text={ex} query={query} />
              </span>
            </li>
          ))}
        </ul>
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
        {weightBuckets.map((b) => (
          <WeightBucketCard key={b.level} b={b} />
        ))}
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

function IssueCard({ iss, query }: { iss: RubricQualityIssue; query?: string }) {
  return (
    <div className={cx("card border-l-4 p-4", severityBorder[iss.severity])}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={cx("chip", severityTone[iss.severity])}>{iss.severity}</span>
        <h3 className="text-[15px] font-bold text-ink-900">
          <Highlight text={iss.name} query={query} />
        </h3>
      </div>
      <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-ink-600">
        <Highlight text={iss.definition} query={query} />
      </p>
    </div>
  );
}

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
                  <IssueCard key={iss.name} iss={iss} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---- search across the whole spec ---- */

function ResultLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-center gap-2 first:mt-0">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">{children}</span>
      <span className="h-px flex-1 bg-ink-200/70" />
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  const q = query.toLowerCase();
  const has = (s?: string) => !!s && s.toLowerCase().includes(q);

  const dimMatches = (d: SpecDimension) =>
    has(d.name) ||
    has(d.question) ||
    has(d.conditional) ||
    has(d.description) ||
    d.errorTags.some((t) => has(t.label)) ||
    d.options.some((o) => has(o.text));

  const groupResults = specGroups
    .map((g) => ({ group: g.group, dims: g.dimensions.filter(dimMatches) }))
    .filter((r) => r.dims.length > 0);

  const weightResults = weightBuckets.filter(
    (b) => has(b.level) || has(b.definition) || b.examples.some((e) => has(e)) || has(String(b.score))
  );

  const issueResults = rubricQualityIssues.filter((iss) => has(iss.name) || has(iss.definition) || has(iss.severity));

  const total =
    groupResults.reduce((n, r) => n + r.dims.length, 0) + weightResults.length + issueResults.length;

  return (
    <div className="mt-6">
      <p className="mb-2 text-sm text-ink-500">
        <span className="font-bold text-ink-900">{total}</span> result{total === 1 ? "" : "s"} for{" "}
        <span className="font-semibold text-ink-700">“{query}”</span>
      </p>

      {total === 0 ? (
        <div className="card flex flex-col items-center gap-2 p-12 text-center">
          <Search size={28} className="text-ink-300" />
          <p className="text-sm font-semibold text-ink-700">No matches in the Spec Doc</p>
          <p className="text-[13px] text-ink-500">Try a different term, like a dimension name, a weight, or an error category.</p>
        </div>
      ) : (
        <>
          {groupResults.map((r) => (
            <div key={r.group}>
              <ResultLabel>{r.group}</ResultLabel>
              <div className="space-y-5">
                {r.dims.map((dim) => (
                  <DimensionCard key={dim.name} dim={dim} query={query} openGuidance />
                ))}
              </div>
            </div>
          ))}

          {weightResults.length > 0 && (
            <div>
              <ResultLabel>Weight Definitions</ResultLabel>
              <div className="space-y-3">
                {weightResults.map((b) => (
                  <WeightBucketCard key={b.level} b={b} query={query} />
                ))}
              </div>
            </div>
          )}

          {issueResults.length > 0 && (
            <div>
              <ResultLabel>Rubric Quality</ResultLabel>
              <div className="space-y-3">
                {issueResults.map((iss) => (
                  <IssueCard key={iss.name} iss={iss} query={query} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-ink-200/70 bg-surface p-4">{children}</div>;
}
