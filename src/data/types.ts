export type AssetRole =
  | "ssot" // source of truth (handwritten plan)
  | "captions" // the mixed caption file
  | "correct" // belongs cleanly to a post
  | "mismatch" // present but does not fully match the plan
  | "missing" // referenced by plan but absent (conceptual, no file)
  | "distractor" // unrelated, should be removed
  | "duplicate"; // duplicate of another asset

export type Platform = "Instagram" | "X" | "LinkedIn";

export interface MMAsset {
  /** Original (messy) filename, kept intentionally to mirror the real task. */
  filename: string;
  /** Path relative to the task asset root (public/tasks/<id>/...). */
  src: string;
  kind: "handwritten" | "image" | "text";
  role: AssetRole;
  /** What the contributor sees in the image. */
  whatItShows: string;
  /** Where it lands in the final deliverable, or why it is excluded. */
  verdict: string;
  /** The "why" — the reasoning a contributor should internalize. */
  rationale: string;
  platform?: Platform;
  date?: string; // MM-DD
  tags?: string[];
  /** For reference-style inputs: what this input contributes (e.g. "Slide 4 returns"). */
  purpose?: string;
}

export interface BrainstormIdea {
  title: string;
  body: string;
  chosen: boolean;
  why?: string;
}

export interface FrictionPoint {
  id: string;
  title: string;
  type: "missing" | "mismatch" | "removable" | "perception";
  where: string;
  description: string;
  whyItWorks: string;
}

export interface FolderNode {
  name: string;
  type: "folder" | "image" | "text" | "doc";
  note?: string;
  role?: AssetRole;
  children?: FolderNode[];
}

export interface MemoryEntry {
  category: "missing" | "mismatch";
  location: string; // Platform > MM-DD
  detail: string;
}

export interface Rubric {
  n: number;
  text: string;
  points: number;
  category: string;
  /** Authored by the viewer: the reasoning behind why this rubric exists. */
  rationale: string;
  /** Three-level justification (from the autorater viewer). Empty when the model satisfied the criterion. */
  whyCorrect?: string;
  whyImportant?: string;
  whatWrong?: string;
  /** Evaluation target: where the criterion is judged (Final answer/artifact, User-facing message, State change…). */
  evalTarget: string;
  /** Which prompt instruction / plan rule this enforces. */
  enforces: string;
  /** Asset filenames or locations this rubric is grounded in. */
  evidence?: string[];
  /**
   * Evaluation result against the model's INITIAL trajectory, taken from
   * rubrics.md (the source of truth). "present" = the criterion was satisfied,
   * "not-present" = it was not. For a negative rubric, "present" is a failure
   * (the model did the undesired thing) and is flagged visually.
   */
  status: "present" | "not-present";
  /** What the model actually did regarding this criterion, grounded in the trajectory/workspace. */
  observed?: string;
}

/** A single grounded observation of what the model actually did in its initial run. */
export interface RunObservation {
  id: string;
  title: string;
  /** A concise, factual recreation of what the model did — no interpretation. */
  what: string;
  /** What the GTFA / prompt required for this point (drives the expected-vs-actual layout). */
  expected?: string;
  /** Where the finding is grounded — a trajectory/workspace pointer (e.g. a file or call). */
  evidence?: string;
  /** Whether the model got this right ("pass") or wrong ("fail"). Defaults to fail when expected is set. */
  outcome?: "pass" | "fail";
  /** Rubric numbers this observation maps to. */
  rubrics?: number[];
}

export interface ActualRun {
  /** Short factual framing of the initial run. */
  summary: string;
  /** How to present the run: "tree" (produced folder tree) or "compare" (expected vs actual). */
  layout?: "tree" | "compare";
  /** The folder tree the model actually produced (for the "tree" layout). */
  producedTree?: FolderNode;
  /** Grounded observations of what happened. */
  observations: RunObservation[];
}

/** A deck-shaped GTFA view: a slide storyboard plus the state changes it drives. */
export interface GtfaDeckView {
  kind: "deck";
  artifactName: string;
  slides: { n: number; title: string; body: string; empty?: boolean }[];
  stateChanges: { kind: "calendar" | "email"; title: string; detail: string }[];
}

export interface RubricDesignNote {
  title: string;
  body: string;
}

export interface SilverStep {
  n: number;
  label: string;
  message: string;
  fixes: string;
}

export interface UnitTest {
  ref: string;
  logic: string;
  group: string;
  /** The pytest code revealed when the test's container is expanded. */
  code: string;
}

export interface CaptionItem {
  n: number;
  excerpt: string;
  belongsTo: string; // human-readable destination
  status: "correct" | "mismatch" | "split";
  note: string;
}

export interface TaskMeta {
  id: string;
  serviceId: string;
  title: string;
  category: string;
  subcategory: string;
  universe: string;
  personaName: string;
  oneLiner: string;
  difficulty: "Medium" | "Hard" | "Very Hard";
  outputType: string;
  modalities: string[];
  status: "Golden" | "Draft";
}

export interface Task {
  meta: TaskMeta;
  assetRoot: string;
  personaHighlights: { label: string; value: string }[];
  personaDocPath: string;
  /** The actual persona-gathering prompt sent to the universe Database agent to generate persona_context.md. */
  personaPrompt?: string;
  brainstorm: BrainstormIdea[];
  realityFirst: string[];
  mmStrategy: string[];
  assets: MMAsset[];
  captions: CaptionItem[];
  prompt: string;
  promptAnnotations: { quote: string; meaning: string }[];
  deliverableTree: FolderNode;
  /** Optional task-native GTFA visualization; when present it replaces the folder tree. */
  gtfaView?: GtfaDeckView;
  memory: MemoryEntry[];
  removed: { item: string; why: string }[];
  email: { to: string[]; points: string[] };
  silver: SilverStep[];
  unitTests: UnitTest[];
  rubricDesign: RubricDesignNote[];
  rubrics: Rubric[];
  friction: FrictionPoint[];
  /** What the model actually did on the first run — grounded in the trajectory + workspace. */
  actualRun: ActualRun;
  /** The raw mixed caption file, exposed for reading inside the viewer. Optional — not every task has one. */
  captionsFile?: { path: string; note: string };
  /** Extra written input files (specs, templates) exposed inline in the MM-inputs section. */
  inputDocs?: { file: string; label: string; note?: string; markdown?: boolean }[];
  /** Shared pytest scaffolding prepended to each unit test's revealed code. */
  unitTestPreamble: string;
  artifactDocs: { label: string; file: string; description: string }[];
  /**
   * Task-specific copy for the walkthrough. Every Golden Task shares the same
   * 12-step methodology, but the wording, structure, and emphasis differ per
   * task — these override the default (task1) narrative where provided.
   */
  narrative?: TaskNarrative;
}

export interface TaskNarrative {
  realitySub?: string;
  inputsSub?: string;
  /** "audit" (default, task1 role chips) or "reference" (task2 purpose-driven inputs). */
  inputsVariant?: "audit" | "reference";
  ssotTitle?: string;
  ssotBlurb?: string;
  galleryTitle?: string;
  frictionTitle?: string;
  frictionBlurb?: string;
  gtfaSub?: string;
  gtfaTreeTitle?: string;
  gtfaBehaviorTitle?: string;
  gtfaBehavior?: string[];
  actualSub?: string;
  silverSub?: string;
  silverSuccessHeadline?: string;
  /** [heading, body] pairs for the "correct solution reached" grid. */
  silverSuccess?: [string, string][];
  testsSub?: string;
  /** Ordered unit-test group names; tests are bucketed by their `group` field. */
  unitTestGroups?: string[];
}

export interface MethodStep {
  n: number;
  key: string;
  title: string;
  short: string;
  detail: string;
  output?: string;
  playbookLink?: string;
  tips: string[];
  /** Prominent highlighted takeaways shown above the Key Moves on the step card. */
  callouts?: { title: string; body: string }[];
}

export interface PlaybookPrinciple {
  title: string;
  body: string;
}

export interface ModelCapabilityReference {
  kind: "reliable" | "lever";
  capability: string;
  summary: string;
  contributorMove: string;
}
