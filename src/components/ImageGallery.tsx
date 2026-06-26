import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Lightbulb, Filter } from "lucide-react";
import type { MMAsset, AssetRole } from "../data/types";
import { assetUrl, cx, roleStyles } from "../lib/assets";

const FILTERS: { role: AssetRole | "all"; label: string }[] = [
  { role: "all", label: "All" },
  { role: "ssot", label: "SSOT" },
  { role: "captions", label: "Captions" },
  { role: "correct", label: "Correct" },
  { role: "mismatch", label: "Mismatch" },
  { role: "duplicate", label: "Duplicate" },
  { role: "distractor", label: "Remove" },
];

export default function ImageGallery({
  assets,
  assetRoot,
}: {
  assets: MMAsset[];
  assetRoot: string;
}) {
  const [filter, setFilter] = useState<AssetRole | "all">("all");
  const [active, setActive] = useState<number | null>(null);

  const visible = useMemo(
    () => assets.filter((a) => filter === "all" || a.role === filter),
    [assets, filter]
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    assets.forEach((a) => m.set(a.role, (m.get(a.role) ?? 0) + 1));
    return m;
  }, [assets]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-400">
          <Filter size={13} /> Filter
        </span>
        {FILTERS.map((f) => {
          const n = f.role === "all" ? assets.length : counts.get(f.role) ?? 0;
          if (f.role !== "all" && n === 0) return null;
          const isActive = filter === f.role;
          return (
            <button
              key={f.role}
              onClick={() => setFilter(f.role)}
              className={cx(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                isActive
                  ? "bg-brand-600 text-white shadow-glow"
                  : "bg-surface text-ink-600 border border-ink-200 hover:border-ink-300"
              )}
            >
              {f.label}
              <span className={cx("ml-1.5", isActive ? "text-white/60" : "text-ink-400")}>
                {n}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((a) => {
            const idx = assets.indexOf(a);
            const rs = roleStyles[a.role];
            const isText = a.kind === "text";
            return (
              <motion.button
                key={a.filename}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActive(idx)}
                className={cx(
                  "group relative overflow-hidden rounded-xl border bg-surface text-left shadow-soft ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-glow",
                  "border-ink-200/70 hover:" + rs.ring
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                  {isText ? (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 text-violet-400">
                      <span className="font-mono text-xs">.txt</span>
                    </div>
                  ) : (
                    <img
                      src={assetUrl(assetRoot, a.src)}
                      alt={a.whatItShows}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                    />
                  )}
                  <span
                    className={cx(
                      "absolute left-2 top-2 chip shadow-sm",
                      rs.chip
                    )}
                  >
                    <span className={cx("h-1.5 w-1.5 rounded-full", rs.dot)} />
                    {rs.label}
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <div className="truncate font-mono text-[11px] text-ink-500">
                    {a.filename}
                  </div>
                  {(a.platform || a.date) && (
                    <div className="mt-0.5 truncate text-[11px] font-medium text-ink-400">
                      {a.platform}
                      {a.date ? ` · ${a.date}` : ""}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            assets={assets}
            index={active}
            assetRoot={assetRoot}
            onClose={() => setActive(null)}
            onNav={(d) =>
              setActive((i) =>
                i === null ? i : (i + d + assets.length) % assets.length
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({
  assets,
  index,
  assetRoot,
  onClose,
  onNav,
}: {
  assets: MMAsset[];
  index: number;
  assetRoot: string;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  const a = assets[index];
  const rs = roleStyles[a.role];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <ChevronRight size={22} />
      </button>

      <motion.div
        key={a.filename}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-surface shadow-2xl lg:grid-cols-[1.3fr_1fr]"
      >
        <div className="relative flex items-center justify-center bg-[#0b0e16] p-4">
          {a.kind === "text" ? (
            <div className="p-10 text-center font-mono text-sm text-ink-300">
              {a.filename}
            </div>
          ) : (
            <img
              src={assetUrl(assetRoot, a.src)}
              alt={a.whatItShows}
              className="max-h-[80vh] w-auto object-contain"
            />
          )}
        </div>
        <div className="flex max-h-[90vh] flex-col overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-3">
            <span className={cx("chip", rs.chip)}>
              <span className={cx("h-1.5 w-1.5 rounded-full", rs.dot)} />
              {rs.label}
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-3 font-mono text-xs text-ink-500">{a.filename}</div>
          {(a.platform || a.date) && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600">
              <MapPin size={13} className="text-brand-500" />
              {a.platform}
              {a.date ? ` · ${a.date}` : ""}
            </div>
          )}

          <div className="mt-4 space-y-4 text-sm">
            <Field label="What it shows" body={a.whatItShows} />
            <Field label="Verdict" body={a.verdict} />
            <div>
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                <Lightbulb size={13} /> Why
              </div>
              <p className="rounded-lg bg-brand-50/60 px-3 py-2 leading-relaxed text-ink-700 dark:bg-brand-500/10">
                {a.rationale}
              </p>
            </div>
            {a.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-ink-400">
        {label}
      </div>
      <p className="leading-relaxed text-ink-700">{body}</p>
    </div>
  );
}
