/**
 * The recurring errors the customer flags in audit, materialized from every
 * document in the `common errors/` folder: the Issues Playbook for CBs, the
 * June reviewer-errors webinar, the P0 customer-flags memo, the week-6 flags
 * post, and the Vercel issue inventory.
 *
 * Errors are grouped into the three stages where they are introduced. Many of
 * them are downstream effects of one root cause — a scenario that was never
 * complex enough — which is why `rootedInComplexity` is tracked explicitly.
 */

export type ErrorCategory = "scenario" | "rubrics" | "tests";

export interface CommonError {
  /** Short, memorable name for the mistake. */
  title: string;
  /** What the error actually is. */
  what: string;
  /** Why it usually happens. */
  why: string;
  /** How to avoid it in practice. */
  fix: string;
  /** A concrete case from the audit data, when one is documented. */
  example?: string;
  /** True when the error is a downstream symptom of insufficient scenario complexity. */
  rootedInComplexity?: boolean;
}

export interface CategoryMeta {
  id: ErrorCategory;
  label: string;
  blurb: string;
  /** Flag count for this stage in the 06/22 Vercel issue inventory. */
  flagCount: number;
  reviewersOnly?: boolean;
}

export const categoryMeta: Record<ErrorCategory, CategoryMeta> = {
  scenario: {
    id: "scenario",
    label: "Scenario Complexity",
    blurb:
      "Defects baked into the task itself — the prompt, the inputs, the tools, the deliverable — before a single rubric is written. The most expensive bugs to catch late, because they usually mean redoing the whole task.",
    flagCount: 21,
  },
  rubrics: {
    id: "rubrics",
    label: "Rubrics",
    blurb:
      "Defects in the criteria themselves: values the inputs don't support, specificity the prompt never set, contradictions, redundancy, and weights gamed to hit the failure threshold.",
    flagCount: 20,
  },
  tests: {
    id: "tests",
    label: "Unit Tests",
    blurb:
      "Defects in verifier.py — coverage gaps, checks too loose to mean anything, and tests quietly doing a rubric's job. This stage applies to reviewers only.",
    flagCount: 17,
    reviewersOnly: true,
  },
};

export const commonErrors: Record<ErrorCategory, CommonError[]> = {
  scenario: [
    {
      title: "The scenario isn't complex enough to begin with",
      what:
        "The task is below the complexity bar — too easy, too thin, with no real cross-modal reasoning — yet it still gets shipped, often hidden behind a high score or weak feedback.",
      why:
        "This is the root cause behind most of the errors on this page. When the scenario is too simple, there is no genuine, capability-level failure to grade, so contributors force one later: artificial constraints, brittle over-specific rubrics, and tests that don't reflect the real final state all follow from a scenario that was never hard enough.",
      fix:
        "Build the difficulty into the scenario from the start — genuine cross-modal reconciliation a capable model can plausibly miss. If you find yourself tightening rubrics or rigging inputs to manufacture a failure, stop and make the scenario harder instead.",
      example:
        "Vercel inventory: tasks below the complexity bar still scored 3–5; complexity failures hidden by high scores or weak feedback.",
      rootedInComplexity: true,
    },
    {
      title: "Forcing the failure instead of earning it",
      what:
        "The model is pushed to fail through rubric weights, contrived setup, or deliberately confusing inputs rather than through a real capability gap.",
      why:
        "When the scenario doesn't produce an honest failure, the failure gets manufactured. The customer reads forced friction as gaming the failure rate, not as measuring capability.",
      fix:
        "Plant only friction a real user could plausibly have created. The failure should emerge from honest interpretation of a believable scenario, not from a trap built to defeat the model.",
      example:
        "Webinar: failures forced through rubric weights or task setup rather than a real capability gap; one trajectory failed with only 8 tool calls, raising doubt the failure was genuine.",
      rootedInComplexity: true,
    },
    {
      title: "Illegible handwriting used as the failure mechanism",
      what:
        "Handwritten notes have become the default way to make the model fail, with inputs that aren't legible to a human either.",
      why:
        "It is the easiest way to inflate difficulty without designing real complexity, so it gets over-used across a batch. If a human reviewer can't read the input, the model can't be fairly graded on it.",
      fix:
        "Verify input legibility before grading on it; replace illegible artifacts or drop the dependent rubric. Vary the input strategy instead of leaning on handwriting — a few notes per batch is healthy, not most of them.",
      example:
        "P0 + webinar: field_notes_L4.jpg, IMG_5823.jpeg, notebook_page.jpg flagged as not human-solvable; the customer says the model shouldn't be penalized for content a human can't read.",
      rootedInComplexity: true,
    },
    {
      title: "Contrived or unrealistic inputs and prompts",
      what:
        "Inputs or scenarios that no real user would produce — nonsensical setups, an implausible seeded MEMORY.md, or a prompt that spends its words explaining the inputs instead of stating a real intent.",
      why:
        "When a believable scenario doesn't naturally create difficulty, contributors invent an unrealistic one. The seams show, and the customer flags it as contrived.",
      fix:
        "Anchor the task in a realistic user intent and let the inputs serve that intent. The prompt should read like a request a person would actually send, not a spec sheet describing the attached files.",
      example:
        "Vercel inventory: scenarios described as nonsensically easy or highly contrived; prompts that focus on explaining inputs rather than realistic user intent.",
      rootedInComplexity: true,
    },
    {
      title: "Inputs don't contain the information the task needs",
      what:
        "The prompt references an asset that doesn't actually contain enough information to answer it, so no criterion that depends on it can be satisfied.",
      why:
        "The deliverable was designed before the inputs were verified, so the gap between what's asked and what's shown surfaces late.",
      fix:
        "Before writing any criterion that depends on an input, open the file yourself and confirm it shows what the criterion checks. If you can't read the value or count the items, the model can't either — fix the input or narrow the task to the entities with valid assets.",
      example:
        "Playbook 1.1: a prompt asks for per-listing visual observations on 6 Zillow listings, but inputs/ holds 6 stock house images with no mapping. Honest agents admit the gap; hallucinating agents invent. Nobody passes.",
    },
    {
      title: "Image extension doesn't match the actual encoding",
      what:
        "A file's extension lies about its format — something.jpg is really an AVIF or a PNG.",
      why:
        "An asset was renamed instead of re-encoded, often to 'make it look natural' after exporting from a browser or screenshot tool.",
      fix:
        "Before zipping inputs, run `file inputs/*` (or `identify`); every reported format must match its extension. Re-save to the real format rather than renaming.",
      example:
        "Playbook 1.2: alergy.jpg was actually AVIF; shoe.jpg was actually a PNG — both blocked image_view and signalled a repackaged asset.",
    },
    {
      title: "The environment is missing a tool the task needs",
      what:
        "The task grades an action the agent can't execute because the required tool, skill, or permission isn't provisioned in this environment.",
      why:
        "The required action was assumed reachable without checking this task's tool manifest.",
      fix:
        "List every action the task grades and confirm a corresponding tool exists in this environment. When in doubt, prefer artifact-producing deliverables — files are always reachable, external skills aren't.",
      example:
        "Playbook 1.3: a criterion expects a summary posted to a #ops-updates Slack channel, but slack isn't provisioned for that universe — honest behavior fails and a false claim triggers a hallucination negative.",
    },
    {
      title: "Deliverable filename or format drifts from the prompt",
      what:
        "The deliverable's name or shape doesn't match the prompt byte-for-byte: damage.csv becomes damages.csv, a .zip ships as a folder, a space becomes an underscore.",
      why:
        "The filename in the prompt and the one in the workspace were never reconciled, and the auditor compares them mechanically.",
      fix:
        "Grep the prompt for every filename and extension, then `ls` the deliverable — they must match exactly. Normalize spaced filenames consistently in both the prompt and the workspace.",
      example:
        "Playbook 1.4 / week-6 post: prompt says deliverable is a .zip but the workspace ships a folder; any drift triggers an automatic fail.",
    },
    {
      title: "The oracle deliverable leaks the answer",
      what:
        "The Final Output zip contains the values, enums, or labels the agent was supposed to derive, turning the task into a copy exercise.",
      why:
        "Working files, narration, or pre-filled derivable fields were left inside the deliverable instead of stripped out.",
      fix:
        "Ship final files only — no narration scripts, no solution.sh, no pre-filled fields the agent was meant to compute.",
      example:
        "Week-6 post: oracle zips shipped with the derivable values already filled in, so a model could pass by copying rather than reasoning.",
    },
    {
      title: "The prompt is ambiguous or subjective",
      what:
        "The prompt leaves too much room for interpretation, so the PASS / edit / discard line and the grading expectations are unclear.",
      why:
        "A messy prompt without a strong realistic intent gets written when the underlying scenario itself is underspecified.",
      fix:
        "State one clear, realistic intent. A reader should be able to tell what a correct outcome looks like without guessing at the grading.",
      example:
        "Vercel inventory: prompts described as messy with no strong realistic intent, where ambiguity leads to unclear grading expectations.",
    },
    {
      title: "No genuine model failure to grade",
      what:
        "The task is approved and scored even though the model didn't actually fail for a real reason — often because it never read the inputs or was blocked from accessing them.",
      why:
        "A failure on the scoreboard is treated as enough to keep the task, without confirming the failure was a real capability gap.",
      fix:
        "Before scoring, confirm the model failed for a genuine reason. No real failure means no scoring target — reject or redo the task rather than keeping it.",
      example:
        "Webinar Pattern 9: 'No valid failure — photos were not read by the model — may require full redo.' The most severe pipeline-level finding.",
    },
  ],
  rubrics: [
    {
      title: "Criterion isn't self-contained",
      what:
        "The criterion can only be graded by re-opening and re-interpreting an input — a photo, video, audio clip, or PDF — instead of comparing the output against a value the rubric ships.",
      why:
        "The multimodal extraction was deferred to grading time. Phrases like 'grounded in', 'supported by', or 'matches the visual evidence in' are the tell.",
      fix:
        "Do the extraction once during drafting and pin the correct value in the criterion text. Reference the input by name only as a pointer. The mantra: describe what the output file should contain based on the input.",
      example:
        "Playbook 2.1: 'Every sprout count is grounded in observable photo evidence' → 'the row for 2026-05-14 records sprout_count = 7 and watering_marks = 2.'",
    },
    {
      title: "Pinned value or claim the inputs don't support",
      what:
        "The criterion pins a number, label, or status that the inputs and tools can't produce — including grading the absence of something never in the source, demanding items that already exist, or misreading an image.",
      why:
        "Values were written from intuition or a single rollout rather than traced back to the actual source artifact, verbatim.",
      fix:
        "For every value, ask: can I derive this exactly from only the inputs and tools the agent has? Verify it against the source — at zoom level for images, recomputing for derived totals. If it isn't there, loosen or drop it.",
      example:
        "P0 flags: R24 demands flagging 'Armstrong Alterna … $4,800' as absent, but that string was never in the PDF; R7 reads 'three burners' when the stove shows four.",
    },
    {
      title: "Overfitting — pinning values or format the prompt never set",
      what:
        "The criterion requires a specific number, enum, label, heading, phrasing, or filename the prompt never establishes and the agent can't deterministically infer.",
      why:
        "Criteria get reverse-engineered from whatever one model produced, so private conventions and exact marketplace prices get enshrined as requirements.",
      fix:
        "Grep the prompt for every literal in the criterion. Not there and not tool-derivable? Grade the shape of the value or the intent, not the literal — swap exact prices for tolerance bands or 'agent recorded a price' checks.",
      example:
        "Webinar Pattern 2: criteria requiring fixed prices ($129.99, $799.22) rather than validating the price the agent actually found in the selected listing.",
      rootedInComplexity: true,
    },
    {
      title: "Criterion admits multiple interpretations",
      what:
        "Two or more readings of the criterion are equally defensible, so different judges — and the same judge across rollouts — score the same answer differently.",
      why:
        "Subjective adjectives ('professional', 'appropriate', 'clear', 'demonstrates understanding') stand in for a countable property.",
      fix:
        "Operationalize the judgment into verifiable, countable properties. Collapsing adjectives into concrete checks is also the single biggest Pass@K stability win.",
      example:
        "Playbook 2.5: 'the reply is professional in tone' → 'opens with a greeting addressed by name, contains no profanity, closes with — Stride Support.'",
    },
    {
      title: "Contradicts the prompt, universe data, or another criterion",
      what:
        "A criterion (or a pair) makes the task unwinnable: it disagrees with the prompt's instructions, the seeded universe state, or another criterion.",
      why:
        "Criteria are drafted without walking the prompt sentence by sentence or cross-checking the seeded workspace, so a prompt-faithful agent does the right thing and is still penalized.",
      fix:
        "Walk the prompt line by line and confirm each criterion is consistent with it; then check every pair — can a single output satisfy both? Cross-check MEMORY.md, USER.md, and inputs/ for values that contradict any criterion.",
      example:
        "P0 flags: the prompt says find an open Linear ticket, but R16–R18 require citing tickets that are state_done (closed) — the faithful agent reports 'none open' and is penalized.",
    },
    {
      title: "Redundant or rewards-and-penalizes pairs",
      what:
        "Two criteria grade the same observable property — or a positive and a negative grade the same behavior in opposite directions.",
      why:
        "Every 'don't' gets mirrored with a negative, and similar checks get written twice, so the same pass/fail is counted more than once.",
      fix:
        "For each criterion, ask whether another in the set checks the same fact; if so, consolidate and sum the weight into the survivor. Lead with positives so most polar pairs disappear.",
      example:
        "Webinar Pattern 6: R36 rewards excluding the $650 charge while R37 penalizes including it — the same fact, double-counted.",
    },
    {
      title: "Bundled, non-atomic criteria",
      what:
        "One criterion checks two or more independent facts, or a long list of similar items is graded one-by-one instead of with an aggregate count plus a few spot checks.",
      why:
        "Independent checks get stapled together with 'and' / ';', or every item in a list gets its own criterion, distorting the score and making Pass@K noisy.",
      fix:
        "One independent fact per criterion. For lists longer than five, use a single aggregate-count criterion plus ≤3 spot checks; move exact measurements to a unit test where they belong.",
      example:
        "Webinar Pattern 5: 'Corn Flakes row 4.19 and All-Bran row 5.89' bundles two independent product checks — the agent earns full credit for a half-right answer.",
    },
    {
      title: "Missing coverage of an explicit requirement",
      what:
        "An explicit prompt requirement — a deliverable, field, section, or ordering rule — has no covering criterion or unit test. Or the set is so broad it checks everything and nothing.",
      why:
        "The prompt's deliverable spec wasn't walked line by line, so requirements slip through uncovered.",
      fix:
        "Read the deliverable spec line by line — filenames, field counts, section headers, ordering — and confirm each has a covering criterion or test. If anything has no check, block submission.",
      example:
        "Webinar Pattern 1: triggers the most severe threshold, 'Fail — 10%+ Major Rubric Errors', whenever a required deliverable is left unchecked.",
    },
    {
      title: "Weights or category gamed around the threshold",
      what:
        "Weights are distributed to artificially reach the 50% failure threshold, same-complexity actions are weighted differently, sets go all-weight-5, or hallucinated values are filed as Task Completion instead of Factuality.",
      why:
        "Weights are tuned to hit the threshold rather than to reflect honest severity.",
      fix:
        "Weight by impact: 5 for 3+ dimensions, 3 for 1–2, 1 for cosmetic. Never weight same-complexity actions differently by award status. Route hallucinated values to Factuality.",
      example:
        "Webinar Pattern 8: '50% threshold met artificially — same-complexity actions weighted 1 vs 5 by award status.'",
      rootedInComplexity: true,
    },
    {
      title: "Missing Evaluation Target tag",
      what:
        "A criterion ships without exactly one EV tag — State Change, User-Facing Message, Trajectory, or Final Answer Artifact.",
      why:
        "The tagging step is skipped in the final pass before submission.",
      fix:
        "Tag every criterion with exactly one Evaluation Target before submitting. Even one untagged criterion is a structural fail.",
      example:
        "Week-6 post: sets shipped with criteria missing their rubric type; the customer flagged why the platform let them through.",
    },
    {
      title: "Missing or poorly grounded justifications",
      what:
        "Failed, not-present, or negative-awarded criteria ship without justification, or with justifications grounded in the wrong evidence.",
      why:
        "Justifications are treated as optional paperwork rather than part of the rubric, and silent edits leave states unexplained.",
      fix:
        "Justify every non-trivial criterion state, citing the source, the rule, and a concrete fix. Pair every material edit with actionable feedback — silent fixes don't teach the attempter.",
      example:
        "Vercel inventory: failed criteria left unjustified, justifications incorrectly grounded, and not-present states missing justifications after edits.",
    },
  ],
  tests: [
    {
      title: "Coverage gaps in verifier.py",
      what:
        "A mechanically-verifiable requirement — filename, section presence, exact string, count, or ordering — has no test. Existence is checked, but order and structure aren't.",
      why:
        "Tests are written for the obvious files and the deliverable spec isn't ticked off requirement by requirement.",
      fix:
        "Walk the prompt's deliverable spec and give every mechanically-verifiable requirement its own assertion. Order, count, and structure rules each need their own test — existence alone is not enough.",
      example:
        "Webinar Pattern 4: tests for required MEMORY.md H2 sections and their order were missing; the suite only checked existence.",
    },
    {
      title: "Underfitted tests that pass on garbage",
      what:
        "A test passes on any single token match instead of verifying the prompt's actual required behavior.",
      why:
        "`assert any(token in text ...)` is quick to write but passes on a lone keyword — a false-positive generator, not a test.",
      fix:
        "Parse the output structure, then assert the specific value or relation it must contain. A test that can't fail on a wrong answer isn't testing anything.",
      example:
        "Webinar Pattern 7: a visual-evidence test passed when the report contained 'card' + 'zillow' once, with no reconciliation actually done.",
    },
    {
      title: "Tests doing a rubric's job",
      what:
        "Unit tests grade reasoning or qualitative behavior — or negative behavior like the absence of fabricated content — instead of mechanically verifiable facts.",
      why:
        "The line between the two stages is blurred, so judgment-based checks leak into verifier.py where they can't be deterministically evaluated.",
      fix:
        "Keep unit tests to structural, deterministic facts (folders exist, schema is right, names match). Leave reasoning and content judgments to the rubric. When a task is reviewed, trim any rubric a test already enforces.",
      example:
        "Vercel inventory: tests checking rubric-related behavior, and tests covering negative behavior such as absence of fabricated content or wrong deliverable names.",
    },
    {
      title: "Existence-only or over-bundled tests",
      what:
        "A test only checks that a file exists, or all file-related checks are crammed into a single test.",
      why:
        "One broad test feels like enough coverage, but it can't isolate which requirement actually failed.",
      fix:
        "Split file checks into separate, targeted assertions. Verify content and structure, not just presence.",
      example:
        "Vercel inventory: tests that only check generic file existence, and suites that combine all file-related checks into one test.",
    },
    {
      title: "Redundant tests or test/rubric imbalance",
      what:
        "Tests duplicate each other, or a task carries more unit tests than rubrics — ratios like 8 vs 7 or 12 vs 5 get called out.",
      why:
        "Coverage is padded with overlapping tests instead of balanced against the rubric set.",
      fix:
        "Remove redundant tests and keep the test-to-rubric balance sensible. Tests and rubrics should complement each other, not compete for the same coverage.",
      example:
        "Vercel inventory: unit-test/rubric ratios flagged as excessive (8 vs 7, 4 vs 5, 12 vs 5) and potential test redundancy.",
    },
  ],
};
