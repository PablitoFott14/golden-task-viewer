/**
 * The recurring errors the customer flags in audit, grouped into the three
 * stages where they are introduced. Many are downstream symptoms of one root
 * cause, a scenario that was never complex enough, tracked via
 * `rootedInComplexity`.
 *
 * `what` describes the underlying mistake in general terms. The concrete,
 * recognizable instances live in `looksLike` (and the fix in `instead`), so the
 * explanation stays high level and the examples stay in the examples area.
 *
 * The full content of this section is mirrored in `viewer/errorsfinal.md` for
 * easy human review and editing; keep the two in sync.
 */

export type ErrorCategory = "scenario" | "rubrics" | "tests";

export interface CommonError {
  /** Short, memorable name for the mistake. */
  title: string;
  /** The underlying mistake, described in general terms (no examples). */
  what: string;
  /** Why it usually happens. */
  why: string;
  /** How to avoid it in practice. */
  fix: string;
  /** A concrete instance so the error is recognizable in a real task. */
  looksLike: string;
  /** The same case done right. */
  instead?: string;
  /** An emphatic, attention-grabbing warning shown above the error body. */
  callout?: string;
  /** True when the error is a downstream symptom of insufficient scenario complexity. */
  rootedInComplexity?: boolean;
}

export interface CategoryMeta {
  id: ErrorCategory;
  label: string;
  blurb: string;
  reviewersOnly?: boolean;
}

export const categoryMeta: Record<ErrorCategory, CategoryMeta> = {
  scenario: {
    id: "scenario",
    label: "Scenario Complexity",
    blurb:
      "Defects baked into the task itself, the prompt, the inputs, the tools, the deliverable, before a single rubric is written. The most expensive bugs to catch late, because they usually mean redoing the whole task.",
  },
  rubrics: {
    id: "rubrics",
    label: "Rubrics",
    blurb:
      "Defects in the criteria themselves: values the inputs don't support, specificity the prompt never set, contradictions, redundancy, and weights gamed to hit the failure threshold.",
  },
  tests: {
    id: "tests",
    label: "Unit Tests",
    blurb:
      "Defects in verifier.py: coverage gaps, checks too loose to mean anything, and tests quietly doing a rubric's job. This stage applies to reviewers only.",
    reviewersOnly: true,
  },
};

export const commonErrors: Record<ErrorCategory, CommonError[]> = {
  scenario: [
    {
      title: "The scenario isn't complex enough to begin with",
      what:
        "The task falls below the complexity bar, with no genuine cross-modal reasoning a capable model could plausibly fail, yet it still ships.",
      why:
        "This is the root cause behind most of the errors on this page. When the scenario is too simple, there is no genuine capability-level failure to evaluate, so contributors often end up forcing one. That usually leads to artificial constraints, brittle rubrics, and, for reviewers, unit tests that no longer reflect the true final state.",
      fix:
        "Build the complexity into the scenario from the start. Genuine difficulty comes from long-horizon workflows that require multiple cross-modal reasoning steps, not from contrived constraints or shortcuts. If you find yourself tightening rubrics or manipulating the inputs just to make the model fail, stop and redesign the scenario to make it genuinely more challenging instead.",
      looksLike:
        "The agent reads one clean value off a screenshot and writes it into a file. Nothing to reconcile, no conflicting sources, nothing a capable model would plausibly get wrong.",
      instead:
        "Do not use shortcuts. Genuine complexity comes from combining multiple cross-modal reasoning steps within long-horizon scenarios, not from getting from point A to point B as quickly as possible by creating contrived scenarios.",
    },
    {
      title: "Illegible handwriting used as the failure mechanism",
      callout: "STOP CREATING SCENARIOS SOLELY RELYING IN HANDWRITTEN NOTES!!!",
      what:
        "The task leans on handwritten or visual inputs that aren't legible to a human, used as a shortcut to guarantee the model fails.",
      why:
        "It is the easiest way to inflate difficulty without designing real complexity, so it gets over-used across a batch. If a human reviewer can't read the input, the model can't be fairly graded on it.",
      fix:
        "Verify legibility before grading on it, and replace illegible artifacts or drop the dependent rubric. Vary the input strategy rather than leaning on handwriting; a few notes per batch is healthy, not most of them.",
      looksLike:
        "A notebook photo so smudged that you, the contributor, cannot read the number the rubric grades against, yet the model is penalized for missing it.",
      instead:
        "Legible handwriting whose challenge is interpreting the content, not deciphering the strokes.",
    },
    {
      title: "Contrived or unrealistic inputs and prompts",
      what:
        "The inputs or scenario are something no real user would plausibly produce, so the task reads as staged rather than authentic.",
      why:
        "When a believable scenario doesn't naturally create difficulty, we can't invent an unrealistic one. The seams show, and the customer flags it as contrived.",
      fix:
        "Anchor the task in a realistic user intent and let the inputs serve that intent. The prompt should read like a request a person would actually send, not a spec sheet describing the attached files.",
      looksLike:
        "A prompt that spends three paragraphs describing each attached file, or a seeded MEMORY.md no real workspace would ever contain.",
      instead:
        "A realistic prompt that is grounded in the persona's universe through natural database queries and AI agent interactions, while remaining original and realistic.",
    },
    {
      title: "Inputs don't contain the information the task needs",
      what:
        "An input the task relies on doesn't actually hold enough information to satisfy the criteria that reference it.",
      why:
        "The deliverable was designed before the inputs were verified, so the gap between what is asked and what is shown surfaces late.",
      fix:
        "Before writing any criterion that depends on an input, open the file yourself and confirm it shows what the criterion checks. If you can't read the value or count the items, the model can't either.",
      looksLike:
        "The prompt asks for a per-listing observation on six saved listings, but the folder holds six stock photos of random houses with no way to map them to the listings.",
      instead:
        "Write criteria only for the listings whose photos are actually present, or reshoot the assets so they depict the right entities.",
    },
    {
      title: "Image extension doesn't match the actual encoding",
      what:
        "An input file's extension claims one format while its actual encoding is another.",
      why:
        "An asset was renamed instead of re-encoded, often to make it look natural after exporting from a browser or screenshot tool.",
      fix:
        "Before zipping inputs, run a format check so every reported type matches its extension. Re-save to the real format rather than renaming.",
      looksLike:
        "A file named alergy.jpg that is actually an AVIF, so the image tool refuses to open it and even a correct model is blocked.",
      instead:
        "Re-encode the file to a real JPEG so the extension matches the bytes on disk.",
    },
    {
      title: "The environment is missing a tool the task needs",
      what:
        "The task grades an action the agent has no provisioned tool, skill, or permission to perform.",
      why:
        "The required action was assumed reachable without checking this task's tool manifest.",
      fix:
        "List every action the task grades and confirm a corresponding tool exists here. When in doubt, prefer artifact-producing deliverables, since files are always reachable and external skills aren't.",
      looksLike:
        "A criterion that grades posting a summary to a Slack channel, in a universe where Slack was never provisioned, so honest behavior fails and a false claim triggers a hallucination penalty.",
      instead:
        "Have the agent write the summary to a file in the workspace, which is always reachable.",
    },
    {
      title: "Deliverable filename or format drifts from the prompt",
      what:
        "The deliverable's name or shape doesn't match what the prompt specifies, and the mismatch is checked mechanically.",
      why:
        "The filename in the prompt and the one in the workspace were never reconciled, and the auditor compares them mechanically.",
      fix:
        "Search the prompt for every filename and extension, then list the deliverable; they must match exactly. Normalize spaced filenames consistently in both the prompt and the workspace.",
      looksLike:
        "The prompt asks for damage.csv but the deliverable lands as damages.csv, or asks for a zip archive and ships a plain folder.",
      instead:
        "Match every filename and extension to the prompt, character for character.",
    },
    {
      title: "The oracle deliverable leaks the answer",
      what:
        "The shipped deliverable already contains values the agent was supposed to derive, turning the task into a copy exercise.",
      why:
        "Working files, narration, or pre-filled derivable fields were left inside the deliverable instead of stripped out.",
      fix:
        "Ship final files only, with no narration scripts, no helper scripts, and no pre-filled fields the agent was meant to compute.",
      looksLike:
        "The final output already contains the totals and labels the agent was supposed to calculate, so a model can pass by copying rather than reasoning.",
      instead:
        "A clean deliverable with every derivable field left empty for the agent to fill in.",
    },
    {
      title: "The prompt is ambiguous or subjective",
      what:
        "The prompt leaves so much open to interpretation that neither the intended outcome nor the grading bar is clear.",
      why:
        "A messy prompt without a strong realistic intent gets written when the underlying scenario itself is underspecified.",
      fix:
        "State one clear, realistic intent. A reader should be able to tell what a correct outcome looks like without guessing at the grading.",
      looksLike:
        "A vague request where it is unclear whether a borderline result should pass, be edited, or be thrown out.",
      instead:
        "A prompt with one clear intent, where a correct outcome is obvious without guessing.",
    },
    {
      title: "No genuine model failure to grade",
      what:
        "The task is scored even though the model never failed for a real reason, leaving nothing legitimate to grade.",
      why:
        "A failure on the scoreboard is treated as enough to keep the task, without confirming the failure was a real capability gap.",
      fix:
        "Before scoring, confirm the model failed for a genuine reason. No real failure means no scoring target, so reject or redo the task rather than keeping it.",
      looksLike:
        "A task kept and scored even though the model never read the photos and failed only because it was blocked from opening them.",
      instead:
        "Confirm the failure came from a real reasoning gap, then score it; otherwise send the task back for a redo.",
    },
  ],
  rubrics: [
    {
      title: "Criterion isn't self-contained",
      what:
        "The criterion can't be graded from the trajectory and output alone, forcing the grader to reopen and reinterpret an input.",
      why:
        "The multimodal extraction was deferred to grading time. Phrases like grounded in, supported by, or matches the visual evidence in are the tell.",
      fix:
        "Do the extraction once while drafting and pin the correct value in the criterion text. Reference the input by name only as a pointer. The rule of thumb: describe what the output file should contain based on the input.",
      looksLike:
        "“Every sprout count in the log is grounded in observable photo evidence,” which forces the grader to reopen the photo and recount.",
      instead:
        "“The row for 2026-05-14 records sprout_count = 7 and watering_marks = 2,” with the value already pinned.",
    },
    {
      title: "Pinned value or claim the inputs don't support",
      what:
        "The criterion asserts a value, label, or fact the inputs and tools can't actually produce or confirm.",
      why:
        "Values were written from intuition or a single rollout rather than traced back to the actual source artifact.",
      fix:
        "For every value, ask whether you can derive it exactly from only the inputs and tools the agent has. Verify it against the source at full zoom for images, recomputing for derived totals. If it isn't there, loosen or drop it.",
      looksLike:
        "A criterion that demands flagging a $4,800 flooring line as missing, when that line never appears in the source document, or one that reads three burners on a stove that clearly has four.",
      instead:
        "Grade only values you can find verbatim in the source at full zoom, or recompute from the raw data.",
    },
    {
      title: "Overfitting on values or format the prompt never set",
      what:
        "The criterion demands a specific value, label, or format the prompt never established and the agent can't deterministically infer.",
      why:
        "Criteria get reverse engineered from whatever one model produced, so private conventions and exact marketplace prices get enshrined as requirements.",
      fix:
        "Search the prompt for every literal in the criterion. If it isn't there and isn't tool derivable, grade the shape of the value or the intent. Swap exact prices for tolerance bands or a check that the agent recorded a price.",
      looksLike:
        "“The power supply row contains the price $129.99,” when the prompt only said to find a price on Amazon and any current listing price is valid.",
      instead:
        "“The power supply row contains the price shown in the listing the agent selected,” grading the behavior, not a frozen number.",
      rootedInComplexity: true,
    },
    {
      title: "Criterion admits multiple interpretations",
      what:
        "The criterion can be read in more than one defensible way, so the same answer scores differently across graders and rollouts.",
      why:
        "Subjective adjectives like professional, appropriate, clear, or demonstrates understanding stand in for a countable property.",
      fix:
        "Operationalize the judgment into verifiable, countable properties. Collapsing adjectives into concrete checks is also the single biggest stability win across rollouts.",
      looksLike:
        "“The reply is professional in tone,” which two graders will read differently and score differently.",
      instead:
        "“The reply opens with a greeting by name, contains no profanity, and ends with the agent's role identifier.”",
    },
    {
      title: "Contradicts the prompt, universe data, or another criterion",
      what:
        "The criterion conflicts with the prompt, the seeded universe state, or another criterion, making the points impossible to earn.",
      why:
        "Criteria are drafted without walking the prompt sentence by sentence or cross-checking the seeded workspace, so a prompt-faithful agent does the right thing and is still penalized.",
      fix:
        "Walk the prompt line by line and confirm each criterion agrees with it, then check every pair: can a single output satisfy both? Cross-check MEMORY.md, USER.md, and the inputs for values that conflict with any criterion.",
      looksLike:
        "The prompt says find an open ticket, but the criterion requires citing three tickets that are actually closed, so a faithful agent that reports none open gets penalized.",
      instead:
        "Align the criterion with the prompt and the seeded data so the correct behavior earns the points.",
    },
    {
      title: "Redundant or rewards-and-penalizes pairs",
      what:
        "The same observable property is graded by more than one criterion, sometimes once as a reward and once as a penalty.",
      why:
        "Every instruction to avoid something gets mirrored with a negative, and similar checks get written twice, so the same pass or fail is counted more than once.",
      fix:
        "For each criterion, ask whether another in the set checks the same fact; if so, consolidate and fold the weight into the survivor. Lead with positives so most polar pairs disappear.",
      looksLike:
        "One criterion rewards excluding a $650 charge while a second penalizes including it, counting the same fact twice.",
      instead:
        "A single criterion for that fact, with the combined weight folded into it.",
    },
    {
      title: "Bundled, non-atomic criteria",
      what:
        "A single criterion checks several independent facts at once, or a long list of items is graded one at a time instead of in aggregate.",
      why:
        "Independent checks get stapled together, or every item in a list gets its own criterion, which distorts the score and makes results noisy.",
      fix:
        "Keep one independent fact per criterion. For lists longer than five, use a single aggregate count plus three or fewer spot checks, and move exact measurements to a unit test where they belong.",
      looksLike:
        "“The Corn Flakes row is 4.19 and the All-Bran row is 5.89” bundled into one criterion, so a half-right answer still earns full credit.",
      instead:
        "One criterion per row, or an aggregate count plus a few spot checks for a long list.",
    },
    {
      title: "Missing coverage of an explicit requirement",
      what:
        "An explicit prompt requirement has no covering criterion or test, or the criteria are too broad to cover anything precisely.",
      why:
        "The prompt's deliverable spec wasn't walked line by line, so requirements slip through uncovered.",
      fix:
        "Read the deliverable spec line by line, covering filenames, field counts, section headers, and ordering, and confirm each has a covering criterion or test. If anything has no check, block submission.",
      looksLike:
        "The prompt requires a specific section and ordering in the deliverable, but no criterion or test ever checks for it.",
      instead:
        "A covering check for every requirement in the deliverable spec, walked line by line.",
    },
    {
      title: "Weights or category gamed around the threshold",
      what:
        "Weights or categories are assigned to engineer the failure rate rather than to reflect the honest severity of each check.",
      why:
        "Weights are tuned to hit the threshold rather than to reflect honest severity.",
      fix:
        "Weight by impact: 5 for three or more dimensions, 3 for one or two, 1 for cosmetic. Never weight same-complexity actions differently by award status, and route hallucinated values to Factuality.",
      looksLike:
        "Two actions of identical difficulty weighted 1 and 5 depending on whether the model happened to get them right, nudging the set to exactly 50%.",
      instead:
        "Weight by real impact and let the failure rate fall wherever it honestly lands.",
      rootedInComplexity: true,
    },
    {
      title: "Missing Evaluation Target tag",
      what:
        "A criterion is submitted without exactly one Evaluation Target tag.",
      why:
        "The tagging step is skipped in the final pass before submission.",
      fix:
        "Tag every criterion with exactly one Evaluation Target before submitting. Even one untagged criterion is a structural fail.",
      looksLike:
        "A criterion shipped with no Evaluation Target at all, or with two of them.",
      instead:
        "Exactly one tag per criterion, chosen from State Change, User-Facing Message, Trajectory, or Final Answer Artifact.",
    },
    {
      title: "Missing or poorly grounded justifications",
      what:
        "Criterion states are left unexplained, or their justifications cite the wrong evidence.",
      why:
        "Justifications are treated as optional paperwork rather than part of the rubric, and silent edits leave states unexplained.",
      fix:
        "Justify every non-trivial criterion state, citing the source, the rule, and a concrete fix. Pair every material edit with actionable feedback, because silent fixes don't teach the attempter.",
      looksLike:
        "A failed criterion marked not met with no explanation, or a justification that points at the wrong piece of evidence.",
      instead:
        "A justification naming the source, the rule it breaks, and the concrete fix.",
    },
  ],
  tests: [
    {
      title: "Coverage gaps in verifier.py",
      what:
        "A mechanically verifiable requirement has no test, or only its existence is checked while its structure and order go unverified.",
      why:
        "Tests are written for the obvious files, and the deliverable spec isn't ticked off requirement by requirement.",
      fix:
        "Walk the deliverable spec and give every mechanically verifiable requirement its own assertion. Order, count, and structure rules each need their own test; existence alone is not enough.",
      looksLike:
        "A suite that checks a file exists but never verifies the required section headings or the order they must appear in.",
      instead:
        "A separate assertion for each rule: names, sections, counts, and ordering.",
    },
    {
      title: "Underfitted tests that pass on garbage",
      what:
        "A test is loose enough to pass without the required behavior ever being performed.",
      why:
        "A loose membership check is quick to write but passes on a lone keyword, which makes it a false-positive generator rather than a test.",
      fix:
        "Parse the output structure, then assert the specific value or relation it must contain. A test that can't fail on a wrong answer isn't testing anything.",
      looksLike:
        "A check that passes whenever the report contains the word card or the word zillow once, with no reconciliation actually verified.",
      instead:
        "Parse the report, then assert the exact value or relation the output must contain.",
    },
    {
      title: "Tests doing a rubric's job",
      what:
        "Unit tests attempt to grade reasoning or qualitative behavior instead of mechanically verifiable facts.",
      why:
        "The line between the two stages is blurred, so judgment-based checks leak into verifier.py where they can't be deterministically evaluated.",
      fix:
        "Keep unit tests to structural, deterministic facts such as folders existing, schema being right, and names matching. Leave reasoning and content judgments to the rubric, and trim any rubric a test already enforces.",
      looksLike:
        "A test that tries to judge whether the agent's reasoning was sound, or that grades the absence of fabricated content.",
      instead:
        "Tests confined to deterministic facts, with all judgment left to the rubric.",
    },
    {
      title: "Existence-only or over-bundled tests",
      what:
        "Tests confirm only that files exist, or pack many independent checks into a single test.",
      why:
        "One broad test feels like enough coverage, but it can't isolate which requirement actually failed.",
      fix:
        "Split file checks into separate, targeted assertions, and verify content and structure rather than just presence.",
      looksLike:
        "A single test that asserts every output file exists at once, so you can't tell which requirement failed.",
      instead:
        "One targeted test per file, checking content and structure, not just presence.",
    },
    {
      title: "Redundant tests or test-to-rubric imbalance",
      what:
        "Tests overlap with each other, or their number is badly out of balance with the rubric set.",
      why:
        "Coverage is padded with overlapping tests instead of balanced against the rubric set.",
      fix:
        "Remove redundant tests and keep the balance between tests and rubrics sensible. The two should complement each other, not compete for the same coverage.",
      looksLike:
        "Twelve unit tests against five rubrics, several of them checking the same thing.",
      instead:
        "A trimmed set with duplicates removed and tests balanced against the rubrics.",
    },
  ],
};
