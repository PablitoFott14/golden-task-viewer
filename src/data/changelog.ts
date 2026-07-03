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
    date: "03-07-2026",
    text: "Added Latest Alignments (with an Updates Log) and a Specification Change Log to the Scoring Spec page.",
  },
  { date: "26-06-2026", text: "Beta version launched." },
];
