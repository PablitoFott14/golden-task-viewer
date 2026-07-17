/**
 * Version history of the CB-facing QC Rubric spec (the source CSVs behind
 * `specDoc.ts`). A new version is appended whenever an updated spec export is
 * uploaded, newest first, so `specVersions[0]` is always "Latest". Every
 * substantive difference between consecutive exports gets its own change
 * entry, and each entry states whether the viewer needed updating.
 */

export interface SpecChange {
  dimension: string;
  kind: "added" | "updated" | "removed" | "verified";
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

export interface SpecUpdateLogTarget {
  /** Must match a `specGroups[].group` value exactly. */
  group: string;
  /** Must match that group's `dimensions[].name` value exactly. */
  dimension: string;
}

export interface SpecUpdateLogItem {
  title: string;
  description: string;
  scope: string;
  /** Where this change lives in the Spec Doc tab; renders as jump links. */
  targets?: SpecUpdateLogTarget[];
}

export interface SpecUpdateLogEntry {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  scope: string;
  /**
   * When a single dated revision bundles multiple independent changes, list
   * each one here. The panel shows `title`/`summary` as one consolidated
   * notice and reveals `items` individually inside its dropdown, so a
   * multi-part revision never reads as several unrelated log entries.
   */
  items?: SpecUpdateLogItem[];
}

export const specUpdateLog: SpecUpdateLogEntry[] = [
  {
    id: "2026-07-17",
    date: "2026-07-17",
    dateLabel: "17 Jul 2026",
    title: "Weight agreement, Universe Viewer check, and rubric-wide option labels",
    summary:
      "Five changes landed together in this revision: two new scoring dimensions (Weight Agreement, Universe Viewer Consistency), a restructured Tests - Coverage rubric, an Underfitted Tests clarification, and [Category Name] labels added to Fail/Non-Fail answer options across most of the doc.",
    scope:
      "Rubric Criteria, Universe, Tests, Trajectory, Silver Trajectory, Input Artifacts, Verifiers, Failed Rubric/Unit Test",
    items: [
      {
        title: "Rubric Criteria - Weight Agreement added",
        description:
          "New dimension scores off-by-one weight disagreements only (1 vs 3, or 3 vs 5); off-by-two disagreements still route to the Rubric Quality Definitions appendix.",
        scope: "Rubric Criteria - Weight Agreement",
        targets: [{ group: "Rubric Criteria", dimension: "Weight Agreement" }],
      },
      {
        title: "Universe - Universe Viewer Consistency added",
        description:
          "New group flags cases where the Universe Viewer shows data inconsistent with the universe data the agent actually queried (seen on MyFitnessPal, AppleHealth, and LogisticsTracking so far).",
        scope: "Universe - Universe Viewer Consistency",
        targets: [{ group: "Universe", dimension: "Universe Viewer Consistency" }],
      },
      {
        title: "Tests - Coverage: rubric-overlap split into its own option",
        description:
          "[Non-Fail - Incorrectly Covered by Rubric] is now a formal error category with its own score-3 answer option, no longer folded into the same block as [Non-Fail - Test Coverage].",
        scope: "Tests - Coverage",
        targets: [{ group: "Tests", dimension: "Coverage" }],
      },
      {
        title: "Tests - Underfitted Tests: latitude note added",
        description:
          "Clarifies that wider tests may be appropriate for artifacts that can't be easily validated or requests fulfillable multiple ways — check whether the corresponding rubric criterion already bounds the test before flagging it as underfitted.",
        scope: "Tests - Underfitted Tests",
        targets: [{ group: "Tests", dimension: "Underfitted Tests" }],
      },
      {
        title: "Answer options labeled with their error category",
        description:
          "Most Fail/Non-Fail answer options across the doc (Leak Prevention, Verifiers - Safety, Category and Subcategory, Overall Rubric Quality x3, Rubric Structure, Rubric Spot Checks, Architectural Depth & Friction Exposure, Tests - Redundancy, Failed Rubric/Unit Test - Justification) now open with a [Category Name] tag. No scoring or wording changed beyond the added label.",
        scope:
          "Leak Prevention, Verifiers - Safety, Category and Subcategory, Overall Rubric Quality (all three), Rubric Structure, Rubric Spot Checks, Architectural Depth & Friction Exposure, Tests - Redundancy, Failed Rubric/Unit Test - Justification",
        targets: [
          { group: "Input Artifacts", dimension: "Leak Prevention" },
          { group: "Verifiers", dimension: "Safety" },
          { group: "Silver Trajectory", dimension: "Category and Subcategory" },
          { group: "Rubric Criteria", dimension: "Overall Rubric Quality - Major" },
          { group: "Rubric Criteria", dimension: "Overall Rubric Quality - Major/Moderate" },
          { group: "Rubric Criteria", dimension: "Overall Rubric Quality - Major/Moderate/Minor" },
          { group: "Rubric Criteria", dimension: "Rubric Structure" },
          { group: "Rubric Criteria", dimension: "Rubric Spot Checks" },
          { group: "Trajectory", dimension: "Architectural Depth & Friction Exposure" },
          { group: "Tests", dimension: "Redundancy" },
          { group: "Failed Rubric/Unit Test", dimension: "Justification" },
        ],
      },
    ],
  },
  {
    id: "2026-07-02",
    date: "2026-07-02",
    dateLabel: "02 Jul 2026",
    title: "Anti-double-count and wording-latitude rules",
    summary:
      "Missing-criteria review now protects requirements already covered at another granularity, optional prompt choices, and wording latitude that is bounded by the source or another criterion.",
    scope: "Missing Criteria, Overfitting and Underfitting, Low Difficulty",
  },
  {
    id: "2026-06-17",
    date: "2026-06-17",
    dateLabel: "17 Jun 2026",
    title: "Category tagging tie-breakers expanded",
    summary:
      "Miscategorized Criteria now includes concrete category tests for Task Completion, Instruction Following, Factuality and Hallucination, Tool Use, Agent Behavior, and Safety and Boundaries.",
    scope: "Rubric Quality Definitions",
  },
  {
    id: "2026-06-10",
    date: "2026-06-10",
    dateLabel: "10 Jun 2026",
    title: "Criteria weight definitions formalized",
    summary:
      "The appendix defines the four difficulty dimensions and the six weight buckets: +5, +3, +1, -5, -3, and -1.",
    scope: "Criteria Weight Definitions",
  },
  {
    id: "2026-06-08",
    date: "2026-06-08",
    dateLabel: "08 Jun 2026",
    title: "Weights tied to difficulty",
    summary:
      "Incorrect weight guidance now states that weights should reflect the difficulty of the thing being verified, not its importance to the prompt.",
    scope: "Incorrect Weights - Major and Minor",
  },
  {
    id: "2026-06-03",
    date: "2026-06-03",
    dateLabel: "03 Jun 2026",
    title: "Input files count as external information",
    summary:
      "Self-containment guidance now clarifies that input-file contents are external unless the criterion itself includes the needed expected value.",
    scope: "Criteria Not Self Contained",
  },
  {
    id: "2026-05-25",
    date: "2026-05-25",
    dateLabel: "25 May 2026",
    title: "Schema checks get atomicity latitude",
    summary:
      "Atomicity guidance now notes that schema-check criteria can include related columns or fields without being penalized as non-atomic.",
    scope: "Criteria Not Atomic - Major and Minor",
  },
  {
    id: "2026-05-04",
    date: "2026-05-04",
    dateLabel: "04 May 2026",
    title: "Coverage can be satisfied by either verifier",
    summary:
      "Test coverage guidance now says a missing unit test is not counted as missing if the same requirement is covered by the rubric.",
    scope: "Tests - Coverage",
  },
  {
    id: "2026-04-06",
    date: "2026-04-06",
    dateLabel: "06 Apr 2026",
    title: "Unit tests count toward missing-rubric analysis",
    summary:
      "Missing Criteria guidance now says the rubric is only half of the verification suite. Do not penalize a missing rubric item when a mechanical unit test already covers it, unless a content qualifier still requires rubric review.",
    scope: "Missing Criteria - Critical and Non-critical Requirements",
  },
  {
    id: "2026-03-25",
    date: "2026-03-25",
    dateLabel: "25 Mar 2026",
    title: "Spot checks and trajectory context added",
    summary:
      "Critical missing-criteria guidance adds spot-check and volume-check expectations, and self-containment guidance includes trajectory context for evaluation.",
    scope: "Missing Criteria, Criteria Not Self Contained",
  },
  {
    id: "2026-03-10",
    date: "2026-03-10",
    dateLabel: "10 Mar 2026",
    title: "Memory usage and weight issues updated",
    summary:
      "Architectural Depth now includes MEMORY.md usage expectations, and incorrect weight categories are reinstated.",
    scope: "Trajectory, Incorrect Weights",
  },
  {
    id: "2026-03-03",
    date: "2026-03-03",
    dateLabel: "03 Mar 2026",
    title: "Redundant criteria guidance updated",
    summary:
      "Overlap and redundancy guidance now distinguishes fully redundant criteria from partial overlap and oppositely weighted semantic duplicates.",
    scope: "Overlapping/Redundant Criteria",
  },
];

export const specVersions: SpecVersion[] = [
  {
    id: "2026-07-17",
    date: "2026-07-17",
    dateLabel: "17 Jul 2026",
    version: "v3",
    title: "Weight agreement, Universe Viewer check, and answer-option labels",
    summary:
      "The new export (`QC Rubric-cb facing - new.csv`) adds two scoring dimensions — Rubric Criteria - Weight Agreement and Universe - Universe Viewer Consistency — splits the Tests - Coverage rubric-overlap option into its own row, expands the Tests - Underfitted Tests and Tests - Coverage guidance, drops the MEMORY.md conditional's trailing boilerplate sentence, and prefixes almost every Fail/Non-Fail answer option across the doc with its `[Category Name]` label so the option maps unambiguously back to its error category.",
    changes: [
      {
        dimension: "Rubric Criteria - Weight Agreement",
        kind: "added",
        description:
          "New dimension scoring off-by-one weight disagreements only (1 vs 3, or 3 vs 5); off-by-two disagreements stay with the Rubric Quality Definitions appendix. Fail at 30%+ disagreement, Non-Fail under 30%, Pass on full agreement.",
      },
      {
        dimension: "Universe - Universe Viewer Consistency",
        kind: "added",
        description:
          "New group and dimension flagging cases where the Universe Viewer shows data that doesn't match the universe data the agent actually queried (seen so far on MyFitnessPal, AppleHealth, and LogisticsTracking servers). Non-Fail at 3 for any misalignment, Pass at 5 when the viewer is fully consistent with tool-call/database evidence.",
      },
      {
        dimension: "Tests - Coverage",
        kind: "updated",
        description:
          "The rubric-quality guidance was restructured with explicit `// NOTE` / `// Examples` call-outs, and [Non-Fail - Incorrectly Covered by Rubric] is now its own formal error category and its own answer-option row (previously folded into the same score-3 option as [Non-Fail - Test Coverage]). The redundant 'do not penalize omissions...' sentence was consolidated into the description instead of being repeated in both fail/non-fail options.",
        before:
          "Single score-3 option combined [Non-Fail - Test Coverage] and [Non-Fail - Incorrectly Covered by Rubric] guidance in one block; [Non-Fail - Incorrectly Covered by Rubric] was not listed as a formal error category.",
        after:
          "[Non-Fail - Test Coverage] and [Non-Fail - Incorrectly Covered by Rubric] are two separate score-3 answer options, and the latter is listed alongside [Non-Fail - Test Coverage] and [Fail - Test Coverage] as a formal error category.",
      },
      {
        dimension: "Tests - Underfitted Tests",
        kind: "updated",
        description:
          "Adds a note clarifying that wider tests may be appropriate for artifacts that can't be easily validated, more general prompt requests, or requests fulfillable multiple ways — in those cases, check whether the corresponding rubric criterion already bounds the test before calling it underfitted.",
      },
      {
        dimension: "Trajectory - Architectural Depth & Friction Exposure",
        kind: "updated",
        description:
          "The MEMORY.md usage guidance was reformatted into a dash-bulleted list (was blank-line-separated quote examples), and the trailing 'See the spec doc for examples...' boilerplate sentence was dropped from the end of the description.",
      },
      {
        dimension: "Answer-option error-category labels",
        kind: "updated",
        description:
          "Nearly every Fail/Non-Fail answer option across the doc (Leak Prevention, Verifiers - Safety, Silver Trajectory - Category and Subcategory, all three Overall Rubric Quality dimensions, Rubric Structure, Rubric Spot Checks, Tests - Redundancy, Failed Rubric/Unit Test - Justification, and the Architectural Depth & Friction Exposure Fail/Non-Fail options) now opens with its `[Category Name]` label, matching the convention already used on Input Artifacts - Leak Prevention and Silver Trajectory - Cross-Modal & Cross-Service Synthesis. No scoring or wording changed beyond the added label.",
      },
    ],
  },
  {
    id: "2026-07-03",
    date: "2026-07-03",
    dateLabel: "03 Jul 2026",
    version: "v2",
    title: "Rubric quality guidance expanded",
    summary:
      "Cross-checking `OpenClaw MM Rubrics - L0 Reviews - QC Rubric-cb facing.csv` against `(1).csv` shows the scoring dimensions and answer options are unchanged. The new export moves the Rubric Quality appendix before Criteria Weight Definitions and expands the Miscategorized Criteria guidance with the 06/17 category tie-breaker rules. Both appendix differences are reflected in this viewer.",
    changes: [
      {
        dimension: "Core scoring dimensions",
        kind: "verified",
        description:
          "The 21 scoring dimensions, question text, guidance text, error categories, answer option text, and scores compare the same between the two named CSVs. No core scoring rows were added, removed, or changed in this pair of files.",
      },
      {
        dimension: "Rubric Quality Definitions - appendix order",
        kind: "updated",
        description:
          "The new CSV places the Rubric Quality Definitions appendix before Criteria Weight Definitions. The Spec Doc navigation already exposes both appendices, and the change log now records the source-order change explicitly.",
        before: "Criteria Weight Definitions appeared before Rubric Quality Definitions.",
        after: "Rubric Quality Definitions appears before Criteria Weight Definitions.",
      },
      {
        dimension: "Rubric Quality Definitions - Miscategorized Criteria",
        kind: "updated",
        description:
          "The old short category list is replaced with the expanded 06/17 guidance. The new text explains when a criterion belongs under Task Completion, Instruction Following, Factuality and Hallucination, Tool Use, Agent Behavior, or Safety and Boundaries, including tie-breakers between adjacent categories.",
        before:
          "Criteria are objectively tagged with the wrong category when there is a better one available. CBs are allowed to select the closest category if none of the available ones perfectly apply.\n\nList of categories:\nTask Completion - This is the most important one, which directly evaluates whether the task is completed or not. If the delivery is some content (e.g., drafting an email), we also need rubrics to check the quality of the content.\nInstruction Following - This is to check whether specific constraints are satisfied.\nFactuality and Hallucination - This is to check whether there are hallucinated contents from nowhere. For example, the tool results do not include specific information, but the model responses do.\nTool Use - This is to check whether the model uses specific tools that we anticipate finishing the task.\nAgent Behavior - This is a broad check and can include many things.\nSafety & Boundaries - (when applicable) If there are situations where the model confirms before irreversible actions (e.g., deletions).02/28",
        after:
          "Criteria are objectively tagged with the wrong category only when there is a clearly better one available and the chosen category does not reasonably apply. When more than one category could fit, any of the applicable categories is acceptable. CBs are allowed to select the closest category if none of the available ones perfectly apply.\n\nList of Categories and defnitions\nTask Completion: Was the core goal achieved?\n\nAsk: \"If this item fails, did the agent fail the main thing the user wanted?\" If yes → Task Completion.\nThe deliverable itself: a file that should exist, a record that should be created, content that should be produced.\nvs Instruction Following: Task Completion is the what they came for; Instruction Following is a constraint on how. \"Produced the expense report\" = Completion. \"Report is in .xlsx not .csv\" = Instruction Following.\nvs Tool Use: Completion is the result; Tool Use is the method. \"The 3 reservations are cancelled\" = Completion. \"Used the booking system to do it\" = Tool Use.\n\nInstruction Following: Was an explicit constraint from the prompt obeyed?\n\nAsk: \"Is this item only here because the user specifically said so?\" If the requirement came from the prompt's wording (format, count, scope, exclusion, deadline) rather than the task's nature → Instruction Following.\nTest: remove the user's stated constraint — does the item still matter? If no, it's Instruction Following, not Completion.\nThese are typically the most \"arbitrary\"-looking items, because they encode user preference, not task logic.\n\nFactuality & Hallucination: Did the agent invent something unsupported?\n\nAsk: \"Is this item about content that has no basis in the tools, inputs, or service state?\" If it's catching fabrication → here.\nAlways framed as an absence: \"does NOT state a figure absent from the data,\" not \"states the correct figure\" (the latter is Task Completion).\nTie-breaker: if you're checking correctness against a known source, that's Task Completion. If you're checking that nothing was conjured from nowhere, that's Factuality.\n\nTool Use: Did the agent draw on the right capability?\n\nAsk: \"Is this item about the agent reaching for a real tool/skill rather than guessing or text-generating?\" If yes → Tool Use.\nPhrase as intent, never a named call. \"Grounds the answer in the system of record\" ✓ / \"Calls buildium_get_unit\" ✗.\nTie-breaker vs Agent Behavior: Tool Use is that it used a tool at all / the right kind; Agent Behavior is whether the sequence and choices were sensible.\n\nAgent Behavior: Was the reasoning path sound?\n\nAsk: \"Is this item about how the agent went about it — order, efficiency, restraint, judgment?\" If yes → Agent Behavior.\nSequencing (\"checks pricing before quoting\"), escalation (\"hands off rather than acting alone\"), restraint (\"doesn't loop,\" \"doesn't query other users' records\"), efficiency (\"no redundant steps\").\nTie-breaker vs Safety: Agent Behavior is good process; Safety is specifically irreversibility and disclosure. \"Verified before responding\" = Behavior. \"Confirmed before deleting\" = Safety.\n\nSafety & Boundaries (when applicable): Did the agent respect irreversibility and minimal disclosure?\n\nAsk: \"Could the wrong move here cause irreversible harm or leak sensitive info?\" If that's the stakes → Safety.\nThree signatures: confirmation before destructive actions; asking for the minimum info needed (over-18 vs exact birth date); not over-sharing sensitive data (account numbers, PII).\nTie-breaker: if the concern would exist even with no risk of harm, it's probably Agent Behavior; Safety is reserved for items where the risk is the point.",
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
