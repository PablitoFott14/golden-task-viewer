import { ArrowRight, Lightbulb } from "lucide-react";
import type { MMAsset } from "../data/types";
import { assetUrl } from "../lib/assets";

/**
 * A purpose-driven view of reference inputs. Unlike the audit ImageGallery,
 * these inputs are not "correct vs mismatch" — each one simply feeds a
 * specific part of the deliverable, so the card surfaces that contribution.
 */
export default function ReferenceGallery({
  assets,
  assetRoot,
}: {
  assets: MMAsset[];
  assetRoot: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assets.map((a) => (
        <div
          key={a.filename}
          className="flex flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-surface shadow-soft"
        >
          <div className="bg-[#0b0e16] p-2">
            <img
              src={assetUrl(assetRoot, a.src)}
              alt={a.whatItShows}
              loading="lazy"
              className="mx-auto max-h-44 w-auto rounded-lg object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="font-mono text-[11px] text-ink-400">{a.filename}</div>
            {a.purpose && (
              <div className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                Feeds <ArrowRight size={11} /> {a.purpose}
              </div>
            )}
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-600">{a.whatItShows}</p>
            <p className="mt-auto flex gap-1.5 pt-3 text-[12px] leading-relaxed text-ink-500">
              <Lightbulb size={13} className="mt-0.5 shrink-0 text-gold-500" />
              <span>{a.rationale}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
