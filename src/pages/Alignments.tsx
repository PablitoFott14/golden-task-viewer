import { useEffect, useMemo, useRef, useState, type ComponentProps } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronLeft, ChevronRight, History, Megaphone, Search, X } from "lucide-react";
import { alignmentUpdates, type AlignmentTopic, type AlignmentUpdate } from "../data/alignments";
import { LatestBadge } from "../components/UpdateTimeline";
import { cx } from "../lib/assets";

/* Internal markdown links go through the router so they survive the hash router
   and sub-path hosting; external ones open in a new tab. */
function MdLink(props: ComponentProps<"a">) {
  const href = props.href ?? "";
  if (href.startsWith("/")) {
    return <Link to={href}>{props.children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
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

function Hero({ update }: { update: AlignmentUpdate }) {
  return (
    <section className="border-b border-ink-200/70 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            <Megaphone size={13} /> Client standards
          </span>
          <LatestBadge />
          <span className="font-mono text-xs font-semibold text-ink-400">Updated {update.dateLabel}</span>
        </div>
        <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-ink-900 sm:text-5xl">
          Urgent Alignments
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-600">
          The expectations below are in force now, and every submission is reviewed against them. The log stays
          compact so the alignments remain the main reading path.
        </p>
      </div>
    </section>
  );
}

function UpdatesLog({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="rounded-xl border border-ink-200/70 bg-surface p-3 shadow-soft">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
        <History size={13} /> Updates
      </div>
      <div className="mt-2 space-y-1">
        {alignmentUpdates.map((u) => {
          const active = u.id === activeId;
          return (
            <button
              key={u.id}
              onClick={() => onSelect(u.id)}
              aria-pressed={active}
              className={cx(
                "flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left transition",
                active
                  ? "border-brand-300 bg-brand-50 text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200"
                  : "border-transparent text-ink-600 hover:border-brand-200 hover:bg-brand-50/60 hover:text-brand-800 dark:hover:bg-brand-500/10"
              )}
            >
              <span className="shrink-0 font-mono text-[11px] font-bold text-brand-600 dark:text-brand-300">
                {u.dateLabel}
              </span>
              <span className="min-w-0 text-[12.5px] leading-snug">
                {u.logSummary ?? u.summary}
              </span>
              {alignmentUpdates[0].id === u.id && <LatestBadge className="ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TopicRail({
  topics,
  activeId,
  onSelect,
  dateLabel,
}: {
  topics: AlignmentTopic[];
  activeId: string;
  onSelect: (id: string) => void;
  dateLabel: string;
}) {
  return (
    <div>
      <div className="mb-2 hidden px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400 lg:block">
        Updates
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
        {topics.map((t, i) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              aria-pressed={active}
              className={cx(
                "group flex w-72 shrink-0 gap-3 rounded-xl border p-3 text-left transition lg:w-full",
                active
                  ? "border-brand-300 bg-brand-50 text-brand-800 shadow-soft dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200"
                  : "border-transparent text-ink-600 hover:border-brand-200 hover:bg-brand-50/60 hover:text-brand-800 dark:hover:bg-brand-500/10"
              )}
            >
              <span
                className={cx(
                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-black",
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10.5px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                  {dateLabel}
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] font-bold leading-tight text-ink-900 lg:whitespace-normal">
                  {t.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScenarioDropdowns({ topic, query }: { topic: AlignmentTopic; query?: string }) {
  if (!topic.scenarios?.length) return null;

  return (
    <div className="mt-5 space-y-2.5">
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-300">
        Reference scenarios
      </div>
      {topic.scenarios.map((scenario) => (
        <details
          key={scenario.title}
          className="group rounded-xl border border-brand-100 bg-brand-50/40 dark:border-brand-500/20 dark:bg-brand-500/10"
        >
          <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-bold text-ink-900">
            <ChevronDown size={15} className="shrink-0 text-brand-500 transition-transform group-open:rotate-180" />
            <span>{scenario.title}</span>
          </summary>
          <div className="border-t border-brand-100 px-4 py-3 dark:border-brand-500/20">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink-400">Prompt pattern</div>
            <p className="rounded-lg bg-surface px-3 py-2 text-[13px] italic leading-relaxed text-ink-700">
              <Highlight text={scenario.prompt} query={query} />
            </p>
            <div className="prose-alignment mt-3 max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MdLink }}>
                {scenario.details}
              </ReactMarkdown>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function TopicArticle({
  topic,
  index,
  dateLabel,
  query,
}: {
  topic: AlignmentTopic;
  index: number;
  dateLabel: string;
  query?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ink-200/70 bg-surface shadow-soft">
      <header className="border-b border-ink-100 bg-ink-50/60 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wide">
          <span className="rounded-full bg-brand-600 px-2.5 py-1 text-white">Alignment {index + 1}</span>
          <span className="font-mono text-brand-600 dark:text-brand-300">{dateLabel}</span>
          <span className="rounded-full bg-surface px-2.5 py-1 text-ink-500">{topic.tag}</span>
        </div>
        <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
          <Highlight text={topic.title} query={query} />
        </h2>
        <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-ink-600">
          <Highlight text={topic.summary} query={query} />
        </p>
      </header>
      <div className="p-5 sm:p-6">
        <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4 dark:border-brand-500/20 dark:bg-brand-500/10">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
            What changed
          </div>
          <p className="text-[13.5px] font-semibold leading-relaxed text-ink-800">
            <Highlight text={topic.impact} query={query} />
          </p>
        </div>
        <div className="prose-alignment mt-5 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MdLink }}>
            {topic.body}
          </ReactMarkdown>
        </div>
        <ScenarioDropdowns topic={topic} query={query} />
      </div>
    </article>
  );
}

function TopicBrowser({ update }: { update: AlignmentUpdate }) {
  const [activeId, setActiveId] = useState(update.topics[0].id);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searching = query.trim().length > 0;

  useEffect(() => {
    setActiveId(update.topics[0].id);
    setQuery("");
  }, [update.id]);

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

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return [];
    const has = (s: string) => s.toLowerCase().includes(q);
    return update.topics.filter((t) => {
      const scenarioHit = t.scenarios?.some((s) => has(s.title) || has(s.prompt) || has(s.details)) ?? false;
      return has(t.title) || has(t.impact) || has(t.summary) || has(t.tag) || has(t.body) || scenarioHit;
    });
  }, [q, update]);

  const activeIndex = Math.max(0, update.topics.findIndex((t) => t.id === activeId));
  const activeTopic = update.topics[activeIndex] ?? update.topics[0];
  const prev = update.topics[activeIndex - 1];
  const next = update.topics[activeIndex + 1];

  return (
    <div>
      <div className="mb-5 flex items-center justify-end">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search these alignments..."
            className="w-full rounded-lg border border-ink-200 bg-surface py-2 pl-9 pr-16 text-[13px] text-ink-800 outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-500/30"
          />
          {searching ? (
            <button
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[10px] font-semibold text-ink-400 sm:block">
              /
            </kbd>
          )}
        </div>
      </div>

      {searching ? (
        <div>
          <p className="mb-4 text-sm text-ink-500">
            <span className="font-bold text-ink-900">{matches.length}</span> alignment
            {matches.length === 1 ? "" : "s"} matching{" "}
            <span className="font-semibold text-ink-700">"{query.trim()}"</span>
          </p>
          {matches.length === 0 ? (
            <div className="card flex flex-col items-center gap-2 p-12 text-center">
              <Search size={26} className="text-ink-300" />
              <p className="text-sm font-semibold text-ink-700">No matches in these alignments</p>
              <p className="text-[13px] text-ink-500">Try a weight, a rule name, or a scenario keyword.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {matches.map((t) => (
                <TopicArticle
                  key={t.id}
                  topic={t}
                  index={update.topics.findIndex((topic) => topic.id === t.id)}
                  dateLabel={update.dateLabel}
                  query={query.trim()}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-6">
          <nav className="mb-5 lg:sticky lg:top-20 lg:mb-0">
            <TopicRail topics={update.topics} activeId={activeTopic.id} onSelect={setActiveId} dateLabel={update.dateLabel} />
          </nav>
          <motion.div
            key={activeTopic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <TopicArticle topic={activeTopic} index={activeIndex} dateLabel={update.dateLabel} />
            <div className="mt-4 flex items-center justify-between gap-3">
              {prev ? (
                <button onClick={() => setActiveId(prev.id)} className="btn-ghost max-w-[48%]">
                  <ChevronLeft size={15} className="shrink-0" />
                  <span className="truncate text-[13px]">{prev.title}</span>
                </button>
              ) : (
                <span />
              )}
              {next && (
                <button onClick={() => setActiveId(next.id)} className="btn-ghost ml-auto max-w-[48%]">
                  <span className="truncate text-[13px]">{next.title}</span>
                  <ChevronRight size={15} className="shrink-0" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function Alignments() {
  const [activeUpdateId, setActiveUpdateId] = useState(alignmentUpdates[0].id);
  const update = alignmentUpdates.find((u) => u.id === activeUpdateId) ?? alignmentUpdates[0];
  const isLatest = update.id === alignmentUpdates[0].id;

  return (
    <div>
      <Hero update={alignmentUpdates[0]} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <UpdatesLog activeId={activeUpdateId} onSelect={setActiveUpdateId} />

        <motion.div
          key={update.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-300">{update.dateLabel}</span>
            {isLatest && <LatestBadge />}
          </div>
          <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[26px]">
            {update.title}
          </h2>
          <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-ink-500">{update.summary}</p>

          <div className="mt-7">
            <TopicBrowser update={update} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
