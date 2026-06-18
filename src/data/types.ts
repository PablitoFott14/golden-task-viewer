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
  /** What actually happened, taken from the workspace + trajectory. */
  what: string;
  /** Why it matters / what it teaches. */
  lesson: string;
  impact: "fail" | "partial" | "hallucination" | "ok";
  /** Rubric numbers this observation affected. */
  rubrics?: number[];
}

export interface ActualRun {
  /** One-paragraph summary of the initial (failed) trajectory. */
  summary: string;
  /** Tool-usage stats pulled from the trajectory. */
  toolStats: { label: string; value: number }[];
  /** The folder tree the model actually produced. */
  producedTree: FolderNode;
  /** Grounded observations of what happened. */
  observations: RunObservation[];
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
  brainstorm: BrainstormIdea[];
  realityFirst: string[];
  mmStrategy: string[];
  assets: MMAsset[];
  captions: CaptionItem[];
  prompt: string;
  promptAnnotations: { quote: string; meaning: string }[];
  deliverableTree: FolderNode;
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
  /** The raw mixed caption file, exposed for reading inside the viewer. */
  captionsFile: { path: string; note: string };
  artifactDocs: { label: string; file: string; description: string }[];
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
}

export interface PlaybookPrinciple {
  title: string;
  body: string;
}
