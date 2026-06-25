/**
 * The pre-submit checklist, distilled into a tight final-validation pass and
 * organized to follow the actual task-creation workflow. The original reference
 * carried three overlapping checklists (Practical, Final Pass, Red-Flag); this
 * merges them into one deduplicated set grouped by review stage, dropping
 * extraction noise.
 *
 * This is mirrored in the repo-root `pre_submit_checklist.md` for easy human
 * review and editing; keep the two in sync.
 *
 * `critical` marks the items that are the most common Fail-band findings.
 * `reviewerOnly` sections are hidden from contributors unless reviewer mode is on.
 */

export interface ChecklistItem {
  id: string;
  text: string;
  detail?: string;
  critical?: boolean;
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
    id: "prompt",
    title: "Prompt",
    blurb: "Every word the user types is graded. It should read like a real request, not a spec.",
    items: [
      {
        id: "prompt-filenames",
        text: "Every required output file is named in the prompt itself.",
        detail: "Not in input files, the agent objective, or the desired outcome — the model can't see those fields.",
        critical: true,
      },
      {
        id: "prompt-persona",
        text: "Reads like a real person with a real stake.",
        detail: "No “act as X agent”, and no listing of which tools or systems to call.",
      },
      {
        id: "prompt-policies",
        text: "Thresholds and policies live in input files, not hard-coded in the prompt.",
      },
      {
        id: "prompt-noleak",
        text: "Describes the shape of success, never the answer key or values the agent must derive.",
      },
      {
        id: "prompt-feasible",
        text: "Every request is actually doable with the available tools.",
        detail: "No step that's impossible for the loadout — that fails the task for the wrong reason.",
      },
      {
        id: "prompt-modifycreate",
        text: "No modify-vs-create ambiguity for existing artifacts (e.g., MEMORY.md).",
      },
      {
        id: "prompt-cta",
        text: "Closes with a natural call to action, not “Begin.” or “Return the output as…”.",
      },
    ],
  },
  {
    id: "inputs",
    title: "Inputs & Multimodal",
    blurb: "Realistic, solvable, leak-free, and light enough to run.",
    items: [
      {
        id: "inputs-env",
        text: "Environment loads and universe data renders.",
        detail: "All task IDs added before deploy; if data is missing, load the Artifact ID in Settings and refresh.",
      },
      {
        id: "inputs-unavoidable",
        text: "The task can't be solved without the non-text inputs.",
        detail: "No transcript or text shortcut that lets the agent skip the media.",
        critical: true,
      },
      {
        id: "inputs-media-core",
        text: "At least one core requirement depends on media (image, PDF, screenshot, audio, video).",
      },
      {
        id: "inputs-noleak",
        text: "No answer leaks in filenames, manifests, notes, or helper docs.",
        detail: "No suggestive spoilers like doordash_pizzahut_20260323.png when the merchant must be read from the image.",
        critical: true,
      },
      {
        id: "inputs-realistic",
        text: "Inputs look like real, messy user data with neutral names.",
        detail: "IMG_0427.JPG, duplicates, mixed orientations. A perfectly curated set of cropped JPGs reads as contrived.",
      },
      {
        id: "inputs-heavy",
        text: "Heavy media downsampled or chunked before upload.",
        detail: "Raw long video, full-resolution audio, or oversized PDFs trigger runtime timeouts and fail the task.",
        critical: true,
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
        critical: true,
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
        id: "silver-stages",
        text: "Runs at least 3 stages: acquire → reason → generate output.",
      },
      {
        id: "silver-crossmodal",
        text: "Cross-modal reconciliation is required.",
        detail: "A value from source A is needed to query or validate source B. One MM artifact alone is not enough.",
      },
      {
        id: "silver-tools",
        text: "Solvable using only the provisioned tools, verified in the loadout.",
      },
      {
        id: "silver-category",
        text: "Clearly fits the selected category and the uploaded files.",
      },
      {
        id: "silver-tests-first",
        text: "All unit tests pass on the Silver Trajectory first.",
        detail: "If a test fails on Silver, the test is broken, not the model — fix it before running the initial trajectory.",
        critical: true,
      },
    ],
  },
  {
    id: "difficulty",
    title: "Difficulty & Failure",
    blurb: "Proof the task is genuinely hard, measured on the initial trajectory.",
    items: [
      {
        id: "difficulty-failbar",
        text: "The model fails ≥50% of the rubric weight on the initial trajectory.",
        detail: "The core bar. If the agent passes too easily, the task is too simple — rework the scenario.",
        critical: true,
      },
      {
        id: "difficulty-realfailure",
        text: "Each failure is a real capability gap, not an environment crash or a rubric defect.",
      },
      {
        id: "difficulty-friction",
        text: "The task forces multi-stage coordination with at least one realistic friction point.",
        detail: "Conflicting data, missing fields, normalization, or a failed tool call the agent must recover from.",
      },
      {
        id: "difficulty-memory",
        text: "Multi-turn tasks require the model to write to MEMORY.md, explicitly or implicitly.",
      },
      {
        id: "difficulty-differentiates",
        text: "The task meaningfully separates strong and weak models.",
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
        critical: true,
      },
      {
        id: "rubrics-media",
        text: "At least one rubric or test grades media content, not just file existence.",
        detail: "A value, match, visual detail, or decision that depends on the media.",
        critical: true,
      },
      {
        id: "rubrics-weights",
        text: "All weights are in {-5, -3, -1, +1, +3, +5} and reflect difficulty, not importance.",
      },
      {
        id: "rubrics-negatives",
        text: "Negative-weight criteria ≤30% (aim ~25%), all written in positive phrasing.",
      },
      {
        id: "rubrics-atomic",
        text: "Each criterion is self-contained, atomic, and measurable.",
        detail: "No “and” / “;” / “each of”. 3 entities → 3 criteria. Name the exact filename, not “the image”.",
      },
      {
        id: "rubrics-defects",
        text: "No contradictions, redundancy, overfitting, or underfitting.",
        detail: "Check is_positive before flagging a pair as contradictory. Don't pin a format the prompt never stated.",
      },
      {
        id: "rubrics-oracle",
        text: "Every hard-coded value matches live tool output, verified by running the call.",
        detail: "Price, name, ID, dimension. A mismatch is a rubric defect, not a model failure.",
        critical: true,
      },
      {
        id: "rubrics-general",
        text: "Grades the user's general request, not literal format unless the prompt states it.",
      },
      {
        id: "rubrics-evtag",
        text: "Each criterion is tagged with exactly one Evaluation Target.",
        detail: "State change, user-facing message, trajectory, or final answer / artifact.",
      },
      {
        id: "rubrics-spot",
        text: "Groups of similar outcomes use ≤5 spot checks plus a volume criterion.",
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
        detail: "Substring checks like \"$1,500\" in content belong in the rubric.",
      },
      {
        id: "tests-overlap",
        text: "Zero overlap between rubric criteria and pytest tests, and criteria outnumber tests.",
        critical: true,
      },
      {
        id: "tests-coverage",
        text: "Every mechanically verifiable requirement has a test — names, sections, counts, ordering.",
      },
      {
        id: "tests-quality",
        text: "Tests are correct: not >30% underfitted, not >20% coverage gaps.",
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
        detail: "Quote the prompt/input and point to the exact trajectory step. Can't cover all three? Delete the criterion.",
        critical: true,
      },
      {
        id: "just-clean",
        text: "No justification cites other models, pass rates, or pipeline-internal files.",
        detail: "gold_justification.md, plan.json, and similar references are an automatic Justification Fail.",
      },
      {
        id: "just-manual",
        text: "Manually added any failed cases the taxonomy didn't pull automatically.",
      },
    ],
  },
];
