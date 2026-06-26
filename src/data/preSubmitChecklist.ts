/**
 * The pre-submit checklist, organized to follow the actual task-creation
 * workflow. Mirrored in the repo-root `pre_submit_checklist.md` for easy human
 * review and editing; keep the two in sync.
 *
 * `reviewerOnly` (on a section or an individual item) hides that content from
 * contributors unless reviewer mode is enabled.
 */

export interface ChecklistItem {
  id: string;
  text: string;
  detail?: string;
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
        text: "Represents a genuine long-horizon user need rather than a collection of isolated or single-step actions.",
      },
      {
        id: "scenario-crossmodal",
        text: "Requires meaningful cross-modal reasoning across multiple modalities.",
        detail: "e.g., universe context, multimodal inputs, and appropriate tool usage.",
      },
      {
        id: "scenario-userperspective",
        text: "Written from the user's perspective, reflecting their context, goals, and constraints rather than a generic or detached scenario.",
        detail: "Universe interaction is needed for this.",
      },
      {
        id: "scenario-category",
        text: "Aligns with the assigned category, subcategory, and universe.",
      },
      {
        id: "scenario-tools",
        text: "Solvable using only the existing tools.",
      },
      {
        id: "scenario-complex",
        text: "Complex enough to genuinely meet the 50% threshold.",
      },
    ],
  },
  {
    id: "prompt",
    title: "Prompt",
    blurb: "Every word the user types is graded. It should read like a real request, not a spec.",
    items: [
      {
        id: "prompt-filenames",
        text: "Every required output file is named in the prompt itself.",
        detail: "For the inputs, it's not needed.",
      },
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
        text: "Contains a single GTFA that can be objectively derived from the prompt and/or multimodal context.",
      },
    ],
  },
  {
    id: "inputs",
    title: "Multimodal Inputs",
    blurb: "Realistic, solvable, leak-free, and light enough to run.",
    items: [
      {
        id: "inputs-unavoidable",
        text: "The task can't be solved without the non-text inputs.",
        detail: "No transcript or text shortcut that lets the agent skip the media.",
      },
      {
        id: "inputs-media-core",
        text: "At least one core requirement depends on media (image, PDF, screenshot, audio, video).",
      },
      {
        id: "inputs-noleak",
        text: "No answer leaks in filenames, manifests, notes, or helper docs.",
        detail: "No suggestive spoilers, just genuine mess in real inputs.",
      },
      {
        id: "inputs-heavy",
        text: "Heavy media downsampled or chunked before upload.",
        detail: "Raw long video, full-resolution audio, or oversized PDFs trigger runtime timeouts and fail the task.",
      },
      {
        id: "inputs-hygiene",
        text: "No HEIC, no duplicate-format dumps, no system files (.env, .key, .bak).",
        detail: "Convert HEIC to JPG/PNG. A real user attaches one format, not the same data five ways.",
      },
      {
        id: "inputs-pii",
        text: "No real PII; sensitive domains use mocked or synthetic data.",
        detail: "Medical, tax, IDs, faces, children, homework, insurance, seller DMs.",
      },
      {
        id: "inputs-llm",
        text: "≤20% of artifacts are LLM-generated, and none are LLM-made .xlsx, .docx, or .pdf.",
      },
    ],
  },
  {
    id: "silver",
    title: "Silver Trajectory",
    blurb: "Your model of how a competent agent would solve the task — what “right” looks like.",
    items: [
      {
        id: "silver-models",
        text: "The Silver Trajectory reflects how a competent agent would actually solve the task.",
      },
      {
        id: "silver-tests-first",
        reviewerOnly: true,
        text: "If the Silver Trajectory was left unedited, all unit tests should pass on the first run.",
        detail: "If the reviewer edited the Silver Trajectory, only the unit tests affected by those edits may fail.",
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
        text: "The rubric set grades media content when the prompt requires it, not just file existence.",
        detail: "A value, match, visual detail, or decision that depends on the media.",
      },
      {
        id: "rubrics-weights",
        text: "All weights are in {-5, -3, -1, +1, +3, +5} and reflect difficulty, not importance.",
      },
      {
        id: "rubrics-negatives",
        text: "Negative-weight criteria aren't forced (~≤30%), all written in positive phrasing.",
      },
      {
        id: "rubrics-bundling",
        text: "Bundles actions only when they form a single logical unit.",
        detail: "Independent actions (e.g., different dates or platforms) stay separate to preserve partial-failure visibility.",
      },
      {
        id: "rubrics-noduplicate",
        text: "The same model behaviour isn't evaluated in more than one rubric.",
      },
      {
        id: "rubrics-oracle",
        text: "Every hard-coded value matches live tool output, verified by running the call.",
      },
      {
        id: "rubrics-explicitrefs",
        text: "Explicit references are only enforced when the prompt states them.",
      },
      {
        id: "rubrics-evtag",
        text: "Each criterion is tagged with exactly one Evaluation Target.",
      },
      {
        id: "rubrics-notforced",
        text: "Weights are not forced to meet the 50% failing threshold.",
      },
      {
        id: "rubrics-nooverlap",
        reviewerOnly: true,
        text: "Rubrics do not overlap with the unit tests.",
      },
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
        text: "Tests do structural, schema, and file-level checks only — no string searches inside files.",
      },
      {
        id: "tests-overlap",
        text: "Zero overlap between rubric criteria and pytest tests, and criteria outnumber tests.",
      },
      { id: "tests-single", text: "Every unit test validates a single deterministic requirement." },
      {
        id: "tests-precise",
        text: "Tests are precise: not underfitted, not overfitted, no coverage gaps (combined with the rubrics).",
      },
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
