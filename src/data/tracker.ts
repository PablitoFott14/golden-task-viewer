export interface WeekEntry {
  /** ISO week identifier, e.g. "2026-W25" */
  week: string;
  /** Human-readable date range */
  range: string;
  best: {
    title: string;
    contributor?: string;
    why: string;
  };
  worst: {
    title: string;
    contributor?: string;
    issues: string[];
  };
  commonErrors: {
    error: string;
    frequency: "Frequent" | "Occasional" | "Rare";
    tip: string;
  }[];
  /** Optional general notes for the week */
  notes?: string;
}

/**
 * Add new weeks at the TOP of this array (most recent first).
 * Each entry shows up as a card in the Pipeline Leaderboards timeline.
 */
export const weeklyEntries: WeekEntry[] = [
  {
    week: "2026-W25",
    range: "Jun 16 – Jun 22, 2026",
    best: {
      title: "Emergency Social Media Recovery",
      why: "Strong persona adherence, natural complexity across 3 platforms, well-planted friction that tests reasoning rather than perception. The 50% failure bar was met cleanly, and every rubric is traceable to a specific prompt requirement.",
    },
    worst: {
      title: "(Placeholder — add when data is available)",
      issues: [
        "Replace this entry with the actual worst-performing task of the week.",
        "Document the specific issues: weak persona fit, forced gotchas, under-threshold failure, etc.",
      ],
    },
    commonErrors: [
      {
        error: "Lumping X posts under Instagram when both appear on the same SSOT page",
        frequency: "Frequent",
        tip: "Always verify the model creates a separate folder for each platform listed in the SSOT — check by name, not by page position.",
      },
      {
        error: "Silently including mismatching content in post folders instead of logging it to MEMORY.md",
        frequency: "Frequent",
        tip: "The prompt defines three buckets (correct, missing, mismatching). Content that doesn't fully match the plan is a mismatch — it goes to MEMORY.md, not into the folder.",
      },
      {
        error: "Missing the Q1 vs Q2 semantic mismatch in the dinner recap caption",
        frequency: "Occasional",
        tip: "Read caption content against the plan's intent, not just keyword-match. A caption that mentions 'Q1' for a 'Q2 dinner' post is a semantic mismatch even though it's topically close.",
      },
    ],
    notes:
      "First tracked week. Focus areas: cross-modal reasoning across handwritten notes + typed captions, and proper use of the missing/mismatching/removable classification system.",
  },
];
