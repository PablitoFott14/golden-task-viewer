import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Search, X, History, Megaphone, ChevronDown } from "lucide-react";
import { alignmentUpdates, type AlignmentTopic, type AlignmentUpdate } from "../data/alignments";
import { Reveal, SectionHeading } from "../components/ui";
import { UpdateTimeline, LatestBadge, type TimelineEntry } from "../components/UpdateTimeline";
import { cx } from "../lib/assets";

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

function TopicNavButton({
  topic,
  active,
  onClick,
}: {
  topic: AlignmentTopic;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "group flex w-64 shrink-0 flex-col gap-1 rounded-xl border p-3 text-left transition lg:w-full",
        active
          ? "border-brand-400 bg-brand-50 shadow-glow dark:border-brand-500/50 dark:bg-brand-500/10"
          : "border-ink-200/70 bg-surface hover:border-brand-300 hover:shadow-soft"
      )}
    >
      <span
        className={cx(
          "w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
          active ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500 dark:bg-ink-200/60"
        )}
      >
        {topic.tag}
      </span>
      <span className="text-[13px] font-bold leading-snug text-ink-900">{topic.title}</span>
      <span className="line-clamp-2 text-[11.5px] leading-snug text-ink-500">{topic.summary}</span>
    </button>
  );
}

function TopicCard({ topic, query, openBody }: { topic: AlignmentTopic; query?: string; openBody?: boolean }) {
  return (
    <div id={topic.id} className="card scroll-mt-24 overflow-hidden">
      <div className="border-b border-ink-100 p-5">
        <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">{topic.tag}</span>
        <h3 className="mt-2 text-lg font-extrabold tracking-tight text-ink-900">
          <Highlight text={topic.title} query={query} />
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
          <Highlight text={topic.summary} query={query} />
        </p>
      </div>
      <details className="group" open={openBody}>
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-ink-400 transition hover:text-ink-700">
          <ChevronDown size={15} className="transition-transform group-open:rotate-180" />
          Full guidance
        </summary>
        <div className="prose-task max-w-none border-t border-ink-100 bg-ink-50/40 px-5 py-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.body}</ReactMarkdown>
        </div>
      </details>
    </div>
  );
}

function TopicBrowser({ update }: { update: AlignmentUpdate }) {
  const [active, setActive] = useState(update.topics[0].id);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searching = query.trim().length > 0;

  useEffect(() => {
    setActive(update.topics[0].id);
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
  const has = (s: string) => s.toLowerCase().includes(q);
  const matches = searching
    ? update.topics.filter((t) => has(t.title) || has(t.summary) || has(t.tag) || has(t.body))
    : [];

  const activeTopic = update.topics.find((t) => t.id === active) ?? update.topics[0];

  return (
    <div>
      <div className="relative">
        <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search this update — topics, examples, guidance…"
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

      {searching ? (
        <div className="mt-6">
          <p className="mb-3 text-sm text-ink-500">
            <span className="font-bold text-ink-900">{matches.length}</span> result{matches.length === 1 ? "" : "s"}{" "}
            for <span className="font-semibold text-ink-700">“{query}”</span>
          </p>
          {matches.length === 0 ? (
            <div className="card flex flex-col items-center gap-2 p-12 text-center">
              <Search size={28} className="text-ink-300" />
              <p className="text-sm font-semibold text-ink-700">No matches in this update</p>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((t) => (
                <TopicCard key={t.id} topic={t} query={query.trim()} openBody />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 lg:grid lg:grid-cols-[236px_1fr] lg:gap-6">
          <nav className="mb-5 lg:mb-0">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
              {update.topics.map((t) => (
                <TopicNavButton key={t.id} topic={t} active={active === t.id} onClick={() => setActive(t.id)} />
              ))}
            </div>
          </nav>
          <motion.div
            key={activeTopic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <TopicCard topic={activeTopic} openBody />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">
      <History size={13} /> {children}
    </div>
  );
}

export default function Alignments() {
  const [activeUpdateId, setActiveUpdateId] = useState(alignmentUpdates[0].id);
  const update = alignmentUpdates.find((u) => u.id === activeUpdateId) ?? alignmentUpdates[0];
  const topicCount = alignmentUpdates.reduce((n, u) => n + u.topics.length, 0);

  const timelineEntries: TimelineEntry[] = alignmentUpdates.map((u) => ({
    id: u.id,
    date: u.date,
    badge: `${u.topics.length} topic${u.topics.length > 1 ? "s" : ""}`,
    title: u.title,
    summary: u.summary,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-2 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
            <Megaphone size={18} />
          </span>
          <LatestBadge />
        </div>
        <SectionHeading
          eyebrow="Latest Alignments"
          title="What the client asked us to align on"
          sub={`Urgent guidance communicated directly by the client, kept as a running log across ${alignmentUpdates.length} update${alignmentUpdates.length > 1 ? "s" : ""} and ${topicCount} topics. Browse the newest update first, then check the log for anything you might have missed.`}
        />
      </Reveal>

      <Reveal className="mt-8">
        <SectionLabel>Updates Log</SectionLabel>
        <UpdateTimeline entries={timelineEntries} activeId={activeUpdateId} onSelect={setActiveUpdateId} />
      </Reveal>

      <Reveal className="mt-8 border-t border-ink-200/70 pt-8">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-extrabold tracking-tight text-ink-900">{update.title}</h2>
          {update.id === alignmentUpdates[0].id && <LatestBadge />}
        </div>
        <p className="mb-5 max-w-3xl text-[13px] leading-relaxed text-ink-500">{update.summary}</p>
        <TopicBrowser update={update} />
      </Reveal>
    </div>
  );
}
