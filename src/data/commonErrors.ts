export interface CommonError {
  /** Short, memorable name for the mistake. */
  title: string;
  /** What contributors actually do wrong. */
  problem: string;
  /** How to avoid it. */
  fix: string;
  /** How often it shows up in review. */
  frequency: "Frequent" | "Occasional" | "Rare";
  /** Where in the workflow it happens. */
  phase: string;
}

/**
 * The recurring mistakes that sink a Golden Task in review. Drawn from the
 * Complexity Playbook anti-patterns and the customer's audit flags.
 */
export const commonErrors: CommonError[] = [
  {
    title: "Writing the prompt before the GTFA",
    problem:
      "Drafting the user request first and discovering the answer later. The prompt ends up loosely grounded, the multimodal inputs do not fully support a single solution, and contradictions surface late in the build.",
    fix: "Reverse-engineer from the Ground Truth Final Answer. Build the deliverable by hand first, confirm it is unique, then design the prompt and inputs that lead an agent to it.",
    frequency: "Frequent",
    phase: "GTFA-first",
  },
  {
    title: "Rubrics that aren't grounded in the prompt",
    problem:
      "Grading behavior the prompt never asked for, or reverse-engineering criteria from whatever a model happened to produce. This is the number-one customer audit flag.",
    fix: "Every positive criterion must trace back to an explicit or implicit prompt requirement, the plan, or the GTFA. If the prompt never asked for it, it cannot be a positive rubric.",
    frequency: "Frequent",
    phase: "Rubrics",
  },
  {
    title: "The single-number gotcha as the whole task",
    problem:
      "Hinging the entire failure on whether the model reads a 3 as an 8. That is a perception bug, not a capability test, and the whole task collapses on one misread.",
    fix: "Spread the load across multiple reasoning failure points so a single perception miss does not cascade through everything. Aim for cross-modal reconciliation, not a trick.",
    frequency: "Frequent",
    phase: "MM inputs",
  },
  {
    title: "Forced friction instead of natural failures",
    problem:
      "Making a task hard only by writing deliberately confusing inputs. The customer reads these as gaming the failure rate rather than measuring capability.",
    fix: "Plant friction a real user could plausibly have created (a rushed note, a mismatched caption, a duplicate file). Difficulty should emerge from honest interpretation of a believable scenario.",
    frequency: "Frequent",
    phase: "MM inputs",
  },
  {
    title: "Over-reliance on handwritten notes",
    problem:
      "Leaning on handwritten notes as the primary failure source across most tasks in a batch. It signals a lack of variety and the customer has explicitly flagged it.",
    fix: "Vary the input strategy. A few handwritten notes per batch is healthy; distribute failure modes across screenshots, CSVs, calendar entries, audio, and typed memos.",
    frequency: "Frequent",
    phase: "MM inputs",
  },
  {
    title: "Cramming all complexity into the prompt",
    problem:
      "A prompt that enumerates every constraint inline reads like a developer spec sheet, not a real user request, and removes the cross-modal navigation challenge.",
    fix: "Keep the prompt short and high-level. Nest the structural detail one or two hops away in referenced files, where the genuine reconciliation work lives.",
    frequency: "Occasional",
    phase: "The prompt",
  },
  {
    title: "Invalid or top-heavy rubric weights",
    problem:
      "Using weights outside {-5, -3, -1, +1, +3, +5}, or letting negative rubrics outnumber the positives. Either one is an automatic fail.",
    fix: "Weight by difficulty to verify: +5 for cross-modal reconciliation, +3 for one reasoning step, +1 for a mechanical check. Keep negatives rare and reserved for attractive wrong paths.",
    frequency: "Occasional",
    phase: "Rubrics",
  },
  {
    title: "Confusing unit tests with rubrics",
    problem:
      "Treating the two as interchangeable, or grading the same outcome in both. They check different things, and overlap wastes signal.",
    fix: "Unit tests cover structural shape (folders exist, schema is right). Rubrics grade reasoning and content. When a task is reviewed, trim any rubric that a unit test already enforces.",
    frequency: "Occasional",
    phase: "Unit tests",
  },
  {
    title: "Asking for things the model can't do",
    problem:
      "Writing a prompt that requires an action unreachable from the provisioned tool set, so the task fails for the wrong reason.",
    fix: "Confirm the required actions are reachable before locking the task. Build difficulty on top of reliable capabilities combined with known failure modes, not on impossible steps.",
    frequency: "Occasional",
    phase: "Validation",
  },
  {
    title: "Not validating the failure threshold fires",
    problem:
      "Submitting without running the initial trajectory, so the model quietly passes more than 50% of the positive weight and the task is too easy to differentiate models.",
    fix: "Run the seed trajectory and confirm the model fails the way you predicted, that the failure clears the ≥50% positive-weight bar, and that it is reasoning-shaped, not perception-shaped.",
    frequency: "Frequent",
    phase: "Validation",
  },
];
