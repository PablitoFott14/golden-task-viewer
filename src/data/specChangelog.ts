/**
 * Version history of the CB-facing QC Rubric spec (the source CSVs behind
 * `specDoc.ts`). A new version is appended whenever an updated spec CSV is
 * uploaded — newest first, so `specVersions[0]` is always "Latest".
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
  version: string;
  title: string;
  summary: string;
  changes: SpecChange[];
}

export const specVersions: SpecVersion[] = [
  {
    id: "2026-07-03",
    date: "2026-07-03",
    version: "v2",
    title: "Cross-modal synthesis failure definition expanded",
    summary:
      "The client uploaded a refreshed export of the QC Rubric spec. Comparing it against the previous CSV surfaces one substantive content change: the definition of a failing cross-modal answer now spells out what 'disconnected processing' actually looks like.",
    changes: [
      {
        dimension: "Silver Trajectory — Cross-Modal & Cross-Service Synthesis",
        kind: "updated",
        description:
          "The [Fail - Disconnected Processing] answer option (score 2) previously carried only its bracketed tag with no explanatory text, unlike every other option in this dimension. It now defines the failure explicitly, mirroring the level of detail already present in the Trivial Integration and Pass options.",
        before: "[Fail - Disconnected Processing]",
        after:
          "[Fail - Disconnected Processing]\nThe agent treats inputs as isolated silos. It fails to extract a necessary value from one modality to use in another (e.g., ignores a date in a blurry HEIC photo when searching a database) or provides a response based on only one source while ignoring conflicting evidence in a second source.",
      },
    ],
  },
  {
    id: "2026-06-10",
    date: "2026-06-10",
    version: "v1",
    title: "Baseline spec",
    summary:
      "The original transcribed CB-facing QC Rubric spec — 21 dimensions across 8 groups, plus the Criteria Weight Definitions and Rubric Quality Definitions appendices (last touched 06/10 and 03/25 respectively). This is the version every dimension and appendix entry on this page traces back to before today's update.",
    changes: [],
  },
];
