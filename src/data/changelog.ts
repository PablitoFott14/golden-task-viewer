/**
 * Landing-page changelog. Mirrored from the repo-root `changelog.md`, which the
 * maintainer edits by hand — keep this array in sync with that file (newest
 * entry first). Each line in the md is `DD-MM-YYYY — entry text`.
 */

export interface ChangelogEntry {
  date: string;
  text: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: "16-07-2026",
    text: "Added Golden Task 4 (Refund Module QA Status Report), a QA/Operations task on cross-referencing a stale personal tracker against release-candidate evidence, and linked it from the Urgent Alignments section as a real applied example.",
  },
  {
    date: "03-07-2026",
    text: "Added the Urgent Alignments section (with an updates log and home quick access) and a Spec Doc change log.",
  },
  { date: "26-06-2026", text: "Beta version launched." },
];
