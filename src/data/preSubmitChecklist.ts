/**
 * The pre-submit checklist, organized to follow the actual task-creation
 * workflow. Mirrored in the repo-root `pre_submit_checklist.md` for easy human
 * review and editing; keep the two in sync.
 *
 * Items are intentionally concise and actionable — no examples or extra context.
 * `reviewerOnly` (on a section or an individual item) hides that content from
 * contributors unless reviewer mode is enabled.
 */

export interface ChecklistItem {
  id: string;
  text: string;
  reviewerOnly?: boolean;
}

export interface ChecklistSection {
  id: string;
  title: string;
  blurb: string;
  reviewerOnly?: boolean;
  items: ChecklistItem[];
}

export const checklistSections: ChecklistSection[] = [
  {
    id: "scenario",
    title: "Scenario",
    blurb: "The foundation of the task: a realistic, complex, user-grounded need.",
    items: [
      {
        id: "scenario-longhorizon",
        text: "Represents a genuine long-horizon user need, not isolated single-step actions.",
      },
      {
        id: "scenario-crossmodal",
        text: "Requires meaningful cross-modal reasoning across multiple modalities.",
      },
      {
        id: "scenario-userperspective",
        text: "Written from the user's perspective, reflecting their context, goals, and constraints.",
      },
      {
        id: "scenario-category",
        text: "Aligns with the assigned category, subcategory, and universe.",
      },
      { id: "scenario-tools", text: "Solvable using only the existing tools." },
      { id: "scenario-complex", text: "Complex enough to genuinely meet the 50% threshold." },
    ],
  },
  {
    id: "prompt",
    title: "Prompt",
    blurb: "Every word the user types is graded. It should read like a real request, not a spec.",
    items: [
      { id: "prompt-filenames", text: "Every required output file is named in the prompt itself." },
      { id: "prompt-persona", text: "Reads like a real person with a real stake." },
      {
        id: "prompt-noleak",
        text: "Describes the shape of success, never the answer key or values the agent must derive.",
      },
      { id: "prompt-feasible", text: "Every request is actually doable with the available tools." },
      {
        id: "prompt-modifycreate",
        text: "No modify-vs-create ambiguity for existing artifacts (e.g., MEMORY.md).",
      },
      {
        id: "prompt-gtfa",
        text: "Contains a single GTFA objectively derivable from the prompt and/or multimodal context.",
      },
    ],
  },
  {
    id: "inputs",
    title: "Multimodal Inputs",
    blurb: "Realistic, solvable, leak-free, and light enough to run.",
    items: [
      { id: "inputs-unavoidable", text: "The task can't be solved without the non-text inputs." },
      { id: "inputs-media-core", text: "At least one core requirement depends on media." },
      { id: "inputs-noleak", text: "No answer leaks in filenames, manifests, notes, or helper docs." },
      { id: "inputs-heavy", text: "Heavy media downsampled or chunked before upload." },
      { id: "inputs-hygiene", text: "No HEIC, no duplicate-format dumps, no system files (.env, .key, .bak)." },
      { id: "inputs-pii", text: "No real PII; sensitive domains use mocked or synthetic data." },
      { id: "inputs-llm", text: "≤20% of artifacts are LLM-generated, and none are LLM-made .xlsx, .docx, or .pdf." },
    ],
  },
  {
    id: "silver",
    title: "Silver Trajectory",
    blurb: "Your model of how a competent agent would solve the task.",
    items: [
      {
        id: "silver-models",
        text: "Reflects how a competent agent would actually solve the task.",
      },
      {
        id: "silver-tests-first",
        reviewerOnly: true,
        text: "If left unedited, all unit tests pass on the first run; if edited, only the affected tests may fail.",
      },
    ],
  },
  {
    id: "rubrics",
    title: "Rubrics",
    blurb: "The biggest source of Fail-band findings. Built against the initial trajectory.",
    items: [
      {
        id: "rubrics-coverage",
        text: "Every critical prompt requirement has a covering criterion, on the right deliverable.",
      },
      {
        id: "rubrics-media",
        text: "Grades media content when the prompt requires it, not just file existence.",
      },
      {
        id: "rubrics-weights",
        text: "All weights are in {-5, -3, -1, +1, +3, +5} and reflect difficulty, not importance.",
      },
      { id: "rubrics-negatives", text: "Negative-weight criteria aren't forced (~≤30%), all positively phrased." },
      {
        id: "rubrics-bundling",
        text: "Bundles actions only when they form a single logical unit.",
      },
      { id: "rubrics-noduplicate", text: "The same model behaviour isn't evaluated in more than one rubric." },
      {
        id: "rubrics-oracle",
        text: "Every hard-coded value matches live tool output, verified by running the call.",
      },
      { id: "rubrics-explicitrefs", text: "Explicit references are only enforced when the prompt states them." },
      { id: "rubrics-evtag", text: "Each criterion is tagged with exactly one Evaluation Target." },
      { id: "rubrics-notforced", text: "Weights are not forced to meet the 50% failing threshold." },
      { id: "rubrics-nooverlap", reviewerOnly: true, text: "Rubrics do not overlap with the unit tests." },
    ],
  },
  {
    id: "tests",
    title: "Unit Tests",
    blurb: "Structural checks that complement the rubric without overlapping it.",
    reviewerOnly: true,
    items: [
      {
        id: "tests-structural",
        text: "Structural, schema, and file-level checks only — no string searches inside files.",
      },
      { id: "tests-overlap", text: "Zero overlap with rubric criteria, and criteria outnumber tests." },
      { id: "tests-single", text: "Every unit test validates a single deterministic requirement." },
      { id: "tests-precise", text: "Precise: not underfitted, not overfitted, no coverage gaps." },
    ],
  },
  {
    id: "justifications",
    title: "Justifications",
    blurb: "Every failed criterion needs a defensible, grounded reason.",
    items: [
      {
        id: "just-complete",
        text: "Every failed criterion explains why it's correct, where the model failed, and why it's necessary.",
      },
      {
        id: "just-manual",
        reviewerOnly: true,
        text: "Manually added any failed cases the taxonomy didn't pull automatically.",
      },
    ],
  },
];
