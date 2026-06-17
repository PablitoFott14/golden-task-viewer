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
  rubrics: Rubric[];
  friction: FrictionPoint[];
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
