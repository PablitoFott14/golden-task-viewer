import { Link } from "react-router-dom";
import { ArrowRight, Image, FileText, Layers, Sparkles } from "lucide-react";
import { tasks } from "../data";
import { Reveal, SectionHeading } from "../components/ui";
import { assetUrl, cx } from "../lib/assets";

const difficultyStyle: Record<string, string> = {
  Medium: "bg-emerald-100 text-emerald-700",
  Hard: "bg-amber-100 text-amber-700",
  "Very Hard": "bg-rose-100 text-rose-700",
};

export default function Tasks() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="The library"
          title="Golden Tasks"
          sub="Each task is a complete, reconstructed example — browse the reasoning, the multimodal inputs, the Ground Truth answer, and the full rubric set. More tasks will appear here over time."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {tasks.map((t, i) => {
          const previews = t.assets
            .filter((a) => a.kind === "image")
            .slice(0, 4);
          return (
            <Reveal key={t.meta.id} delay={i * 0.06}>
              <Link
                to={`/tasks/${t.meta.id}`}
                className="group block overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="grid grid-cols-4 gap-px bg-ink-100">
                  {previews.map((p) => (
                    <div key={p.filename} className="aspect-square overflow-hidden bg-ink-100">
                      <img
                        src={assetUrl(t.assetRoot, p.src)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip bg-gold-100 text-gold-800">
                      <Sparkles size={12} /> {t.meta.status}
                    </span>
                    <span className={cx("chip", difficultyStyle[t.meta.difficulty])}>
                      {t.meta.difficulty}
                    </span>
                    <span className="chip bg-ink-100 text-ink-600">{t.meta.category}</span>
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
                      {t.assets.filter((a) => a.kind === "image").length} images
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers size={14} className="text-brand-500" />
                      {t.rubrics.length} rubrics
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FileText size={14} className="text-brand-500" />
                      {t.meta.subcategory}
                    </span>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Reconstruct this task
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

        <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 p-10 text-center">
          <div>
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-ink-100 text-ink-400">
              <Layers size={22} />
            </div>
            <p className="mt-3 text-sm font-semibold text-ink-600">More tasks coming</p>
            <p className="mt-1 text-xs text-ink-400">
              The platform is built to scale — drop a new task into the data layer and it
              appears here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
