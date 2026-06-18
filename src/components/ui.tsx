import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { cx } from "../lib/assets";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx(align === "center" && "text-center mx-auto max-w-2xl")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{sub}</p>}
    </div>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cx("chip", className)}>{children}</span>;
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-surface px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold text-ink-900">{value}</div>
    </div>
  );
}

/**
 * The recurring teaching callout. Every section should answer one of:
 * what was done, why it was done, and how a contributor can apply it.
 */
export function Teach({
  title = "Apply this yourself",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
      <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
        <GraduationCap size={15} /> {title}
      </div>
      <div className="text-[13px] leading-relaxed text-ink-700">{children}</div>
    </div>
  );
}

/** Fetches and renders a plain-text file (monospace, preserved whitespace). */
export function RawText({ url }: { url: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setContent(null);
    setError(false);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((t) => active && setContent(t))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [url]);

  if (error)
    return (
      <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
        Couldn't load this file.
      </div>
    );
  if (content === null)
    return (
      <div className="flex items-center gap-2 px-4 py-8 text-sm text-ink-400">
        <Loader2 size={16} className="animate-spin" /> Loading file…
      </div>
    );
  return (
    <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-ink-50 p-4 font-mono text-[12px] leading-relaxed text-ink-700">
      {content}
    </pre>
  );
}
