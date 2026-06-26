import { Link } from "react-router-dom";
import { ArrowRight, Image, Layers, Gauge, ShieldAlert } from "lucide-react";
import { tasks } from "../data";
import { Reveal, SectionHeading } from "../components/ui";
import { assetUrl, cx } from "../lib/assets";

const difficultyChip: Record<string, string> = {
  Medium: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Hard: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "Very Hard": "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export default function Tasks() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="The library"
          title="Golden Tasks"
          sub="Complete, reconstructed examples: the reasoning, the multimodal inputs, the Ground Truth answer, and the full rubric set."
        />
      </Reveal>

      <Reveal>
        <div className="mt-8 flex items-start gap-4 rounded-2xl border-2 border-rose-400 bg-rose-50 p-5 dark:border-rose-500/60 dark:bg-rose-500/10">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-600 text-white shadow-glow">
            <ShieldAlert size={24} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
              Reference only
            </p>
            <p className="mt-1 text-[15px] font-bold leading-relaxed text-ink-900">
              Use these scenarios only as references to understand the expected level of complexity. Do not copy or
              reuse them. Doing so will result in automatic removal from the project.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {tasks.map((t, i) => {
          const previews = t.assets
            .filter((a) => a.kind !== "text")
            .slice(0, 4);
          const imageCount = t.assets.filter((a) => a.kind !== "text").length;
          return (
            <Reveal key={t.meta.id} delay={i * 0.06}>
              <Link
                to={`/tasks/${t.meta.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-surface shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div
                  className="grid gap-px bg-ink-100"
                  style={{ gridTemplateColumns: `repeat(${Math.min(previews.length, 4)}, minmax(0, 1fr))` }}
                >
                  {previews.map((p) => (
                    <div key={p.filename} className="h-44 overflow-hidden bg-ink-100">
                      <img
                        src={assetUrl(t.assetRoot, p.src)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cx("chip", difficultyChip[t.meta.difficulty] ?? "bg-ink-100 text-ink-600")}>
                      <Gauge size={12} /> {t.meta.difficulty}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600">{t.meta.category}</span>
                    <span className="chip bg-ink-100 text-ink-600">{t.meta.subcategory}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold text-ink-900">
                    {t.meta.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {t.meta.oneLiner}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Image size={14} className="text-brand-500" />
                      {imageCount} visual inputs
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers size={14} className="text-brand-500" />
                      {t.rubrics.length} rubrics
                    </span>
                  </div>

                  <div className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    View task walkthrough
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
