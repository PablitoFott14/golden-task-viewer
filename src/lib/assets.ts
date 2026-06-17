import type { AssetRole } from "../data/types";

/** Build a public-folder URL that survives spaces and odd characters. */
export function assetUrl(assetRoot: string, src: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const path = `${assetRoot}/${src}`
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${base}${path}`;
}

export function docUrl(assetRoot: string, file: string): string {
  return assetUrl(assetRoot, `artifacts/${file}`);
}

export interface RoleStyle {
  label: string;
  /** chip classes */
  chip: string;
  /** dot/accent color */
  dot: string;
  ring: string;
  description: string;
}

export const roleStyles: Record<AssetRole, RoleStyle> = {
  ssot: {
    label: "SSOT",
    chip: "bg-gold-100 text-gold-800",
    dot: "bg-gold-500",
    ring: "ring-gold-300",
    description: "Source of truth — the plan everything is graded against.",
  },
  captions: {
    label: "Captions",
    chip: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
    ring: "ring-violet-300",
    description: "Recovered captions, mixed and unattributed.",
  },
  correct: {
    label: "Correct",
    chip: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    ring: "ring-emerald-300",
    description: "Belongs cleanly to a planned post.",
  },
  mismatch: {
    label: "Mismatch",
    chip: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    ring: "ring-amber-300",
    description: "Present but doesn't fully match the plan — log to MEMORY.md.",
  },
  missing: {
    label: "Missing",
    chip: "bg-sky-100 text-sky-700",
    dot: "bg-sky-500",
    ring: "ring-sky-300",
    description: "Planned but absent — report as missing.",
  },
  distractor: {
    label: "Remove",
    chip: "bg-rose-100 text-rose-700",
    dot: "bg-rose-500",
    ring: "ring-rose-300",
    description: "Unrelated noise — remove and report.",
  },
  duplicate: {
    label: "Duplicate",
    chip: "bg-fuchsia-100 text-fuchsia-700",
    dot: "bg-fuchsia-500",
    ring: "ring-fuchsia-300",
    description: "Copy of another asset — keep one, report the rest.",
  },
};

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
