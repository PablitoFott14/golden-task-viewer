/**
 * Version history of the CB-facing QC Rubric spec (the source CSVs behind
 * `specDoc.ts`). A new version is appended whenever an updated spec export is
 * uploaded, newest first, so `specVersions[0]` is always "Latest". Every
 * substantive difference between consecutive exports gets its own change
 * entry, and each entry states whether the viewer needed updating.
 */

export interface SpecChange {
  dimension: string;
  kind: "added" | "updated" | "removed";
  description: string;
  before?: string;
  after?: string;
}

export interface SpecVersion {
  id: string;
  date: string;
  dateLabel: string;
  version: string;
  title: string;
  summary: string;
  changes: SpecChange[];
}

export const specVersions: SpecVersion[] = [
  {
    id: "2026-07-03",
    date: "2026-07-03",
    dateLabel: "03 Jul 2026",
    version: "v2",
    title: "Disconnected Processing defined, justification flags added",
    summary:
      "A refreshed export of the QC Rubric spec (its own header stamp reads 'Last updated 6/4/2026'). Compared against the previous CSV it lands three differences: the Disconnected Processing failure finally gets a written definition, the export now records which answer options require a written justification, and a placeholder question text is restored. All three are reflected in this viewer.",
    changes: [
      {
        dimension: "Silver Trajectory — Cross-Modal & Cross-Service Synthesis",
        kind: "updated",
        description:
          "The [Fail - Disconnected Processing] answer option (score 2) previously carried only its bracketed tag with no explanatory text, unlike every other option in this dimension. It now defines the failure explicitly, matching the level of detail of the Trivial Integration and Pass options.",
        before: "[Fail - Disconnected Processing]",
        after:
          "[Fail - Disconnected Processing]\nThe agent treats inputs as isolated silos. It fails to extract a necessary value from one modality to use in another (e.g., ignores a date in a blurry HEIC photo when searching a database) or provides a response based on only one source while ignoring conflicting evidence in a second source.",
      },
      {
        dimension: "All dimensions — answer option metadata",
        kind: "added",
        description:
          "The export now records, for every answer option, whether selecting it requires a written justification. The pattern is uniform: every Fail and Non-Fail option requires one, while Pass options do not. The spec page now shows a 'Justification required' marker on those options.",
      },
      {
        dimension: "Prompt — Feasibility With Tools",
        kind: "updated",
        description:
          "The question text, which appeared as the placeholder 'a' in the previous export, is restored to the full question. The viewer already displayed the intended wording, so no page change was needed for this one.",
        before: "a",
        after: "Rate the Feasibility With Tools of the Prompt dimension.",
      },
    ],
  },
  {
    id: "2026-06-10",
    date: "2026-06-10",
    dateLabel: "10 Jun 2026",
    version: "v1",
    title: "Baseline spec",
    summary:
      "The original transcribed CB-facing QC Rubric spec: 21 scoring dimensions across 8 groups, plus the Criteria Weight Definitions appendix (Update 06/10) and the Rubric Quality Definitions appendix. Every dimension and appendix entry on this page traces back to this version before the July update.",
    changes: [],
  },
];
