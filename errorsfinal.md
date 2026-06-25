# Common Errors — Source Content

This file is the single, human-editable source for everything shown in the
**Common Errors** section of the viewer. It mirrors `viewer/src/data/commonErrors.ts`.
Edit here to review or revise the wording, then keep the two in sync.

For each error:

- **Why it happens** — what the mistake is and the root cause behind it, in one place.
- **How to avoid it** — the practical fix.
- **Looks like** — a concrete instance so the mistake is recognizable in a real task.
- **Do this instead** — the same case done right.

---

# Scenario Complexity

Defects baked into the task itself, the prompt, the inputs, the tools, the deliverable,
before a single rubric is written. The most expensive bugs to catch late, because they
usually mean redoing the whole task.

### 1. The scenario isn't complex enough to begin with

- **Why it happens:** The task falls below the complexity bar, with no genuine cross-modal reasoning a capable model could plausibly fail. This is the root cause behind most of the errors on this page: when the scenario is too simple there is no real capability-level failure to evaluate, so contributors force one, which breeds artificial constraints, brittle rubrics, and tests that no longer reflect the true final state.
- **How to avoid it:** Build the complexity into the scenario from the start. Genuine difficulty comes from long-horizon workflows that require multiple cross-modal reasoning steps, not from contrived constraints or shortcuts. If you find yourself tightening rubrics or manipulating the inputs just to make the model fail, stop and redesign the scenario to make it genuinely more challenging instead.
- **Looks like:** The agent reads one clean value off a screenshot and writes it into a file. Nothing to reconcile, no conflicting sources, nothing a capable model would plausibly get wrong.
- **Do this instead:** Do not use shortcuts. Genuine complexity comes from combining multiple cross-modal reasoning steps within long-horizon scenarios, not from getting from point A to point B as quickly as possible by creating contrived scenarios.

### 2. Illegible handwriting used as the failure mechanism

STOP CREATING SCENARIOS SOLELY RELYING IN HANDWRITTEN NOTES!!!

- **Why it happens:** The task leans on handwritten or visual inputs that aren't legible to a human, the easiest way to inflate difficulty without designing real complexity, so it gets over-used across a batch. If a human reviewer can't read the input, the model can't be fairly graded on it.
- **How to avoid it:** Verify legibility before grading on it, and replace illegible artifacts or drop the dependent rubric. Vary the input strategy rather than leaning on handwriting; a few notes per batch is healthy, not most of them.
- **Looks like:** A notebook photo so smudged that you, the contributor, cannot read the number the rubric grades against, yet the model is penalized for missing it.
- **Do this instead:** Legible handwriting whose challenge is interpreting the content, not deciphering the strokes.

### 3. Contrived or unrealistic inputs and prompts

- **Why it happens:** The inputs or scenario are something no real user would plausibly produce, so the task reads as staged. It happens when a believable scenario doesn't naturally create difficulty and an unrealistic one gets invented instead; the seams show, and the customer flags it as contrived.
- **How to avoid it:** Anchor the task in a realistic user intent and let the inputs serve that intent. The prompt should read like a request a person would actually send, not a spec sheet describing the attached files.
- **Looks like:** A prompt that spends three paragraphs describing each attached file, or a seeded MEMORY.md no real workspace would ever contain.
- **Do this instead:** A realistic prompt that is grounded in the persona's universe through natural database queries and AI agent interactions, while remaining original and realistic.

### 4. Inputs don't contain the information the task needs

- **Why it happens:** An input the task relies on doesn't actually hold enough information to satisfy the criteria that reference it, usually because the deliverable was designed before the inputs were verified, so the gap surfaces late.
- **How to avoid it:** Before writing any criterion that depends on an input, open the file yourself and confirm it shows what the criterion checks. If you can't read the value or count the items, the model can't either.
- **Looks like:** The prompt asks for a per-listing observation on six saved listings, but the folder holds six stock photos of random houses with no way to map them to the listings.
- **Do this instead:** Write criteria only for the listings whose photos are actually present, or reshoot the assets so they depict the right entities.

### 5. Image extension doesn't match the actual encoding

- **Why it happens:** An input file's extension claims one format while its actual encoding is another, because an asset was renamed instead of re-encoded, often to make it look natural after exporting from a browser or screenshot tool.
- **How to avoid it:** Before zipping inputs, run a format check so every reported type matches its extension. Re-save to the real format rather than renaming.
- **Looks like:** A file named alergy.jpg that is actually an AVIF, so the image tool refuses to open it and even a correct model is blocked.
- **Do this instead:** Re-encode the file to a real JPEG so the extension matches the bytes on disk.

### 6. The environment is missing a tool the task needs

- **Why it happens:** The task grades an action the agent has no provisioned tool, skill, or permission to perform, because the required action was assumed reachable without checking this task's tool manifest.
- **How to avoid it:** List every action the task grades and confirm a corresponding tool exists here. When in doubt, prefer artifact-producing deliverables, since files are always reachable and external skills aren't.
- **Looks like:** A criterion that grades posting a summary to a Slack channel, in a universe where Slack was never provisioned, so honest behavior fails and a false claim triggers a hallucination penalty.
- **Do this instead:** Have the agent write the summary to a file in the workspace, which is always reachable.

### 7. Deliverable filename or format drifts from the prompt

- **Why it happens:** The deliverable's name or shape doesn't match what the prompt specifies. The filename in the prompt and the one in the workspace were never reconciled, and the auditor compares them mechanically, so any drift fails.
- **How to avoid it:** Search the prompt for every filename and extension, then list the deliverable; they must match exactly. Normalize spaced filenames consistently in both the prompt and the workspace.
- **Looks like:** The prompt asks for damage.csv but the deliverable lands as damages.csv, or asks for a zip archive and ships a plain folder.
- **Do this instead:** Match every filename and extension to the prompt, character for character.

### 8. The oracle deliverable leaks the answer

- **Why it happens:** The shipped deliverable already contains values the agent was supposed to derive, turning the task into a copy exercise, because working files, narration, or pre-filled derivable fields were left inside instead of stripped out.
- **How to avoid it:** Ship final files only, with no narration scripts, no helper scripts, and no pre-filled fields the agent was meant to compute.
- **Looks like:** The final output already contains the totals and labels the agent was supposed to calculate, so a model can pass by copying rather than reasoning.
- **Do this instead:** A clean deliverable with every derivable field left empty for the agent to fill in.

### 9. The prompt is ambiguous or subjective

- **Why it happens:** The prompt leaves so much open to interpretation that neither the intended outcome nor the grading bar is clear, which happens when the underlying scenario itself is underspecified.
- **How to avoid it:** State one clear, realistic intent. A reader should be able to tell what a correct outcome looks like without guessing at the grading.
- **Looks like:** A vague request where it is unclear whether a borderline result should pass, be edited, or be thrown out.
- **Do this instead:** A prompt with one clear intent, where a correct outcome is obvious without guessing.

### 10. No genuine model failure to grade

- **Why it happens:** The task is scored even though the model never failed for a real reason, because a failure on the scoreboard is treated as enough to keep the task without confirming it was a real capability gap.
- **How to avoid it:** Before scoring, confirm the model failed for a genuine reason. No real failure means no scoring target, so reject or redo the task rather than keeping it.
- **Looks like:** A task kept and scored even though the model never read the photos and failed only because it was blocked from opening them.
- **Do this instead:** Confirm the failure came from a real reasoning gap, then score it; otherwise send the task back for a redo.

---

# Rubrics

Defects in the criteria themselves: values the inputs don't support, specificity the prompt
never set, contradictions, redundancy, and weights gamed to hit the failure threshold.

### 1. Criterion isn't self-contained

- **Why it happens:** The criterion can't be graded from the trajectory and output alone, forcing the grader to reopen and reinterpret an input. The multimodal extraction was deferred to grading time; phrases like grounded in, supported by, or matches the visual evidence in are the tell.
- **How to avoid it:** Do the extraction once while drafting and pin the correct value in the criterion text. Reference the input by name only as a pointer. The rule of thumb: describe what the output file should contain based on the input.
- **Looks like:** "Every sprout count in the log is grounded in observable photo evidence," which forces the grader to reopen the photo and recount.
- **Do this instead:** "The row for 2026-05-14 records sprout_count = 7 and watering_marks = 2," with the value already pinned.

### 2. Pinned value or claim the inputs don't support

- **Why it happens:** The criterion asserts a value, label, or fact the inputs and tools can't actually produce or confirm, because values were written from intuition or a single rollout rather than traced back to the actual source artifact.
- **How to avoid it:** For every value, ask whether you can derive it exactly from only the inputs and tools the agent has. Verify it against the source at full zoom for images, recomputing for derived totals. If it isn't there, loosen or drop it.
- **Looks like:** A criterion that demands flagging a $4,800 flooring line as missing, when that line never appears in the source document, or one that reads three burners on a stove that clearly has four.
- **Do this instead:** Grade only values you can find verbatim in the source at full zoom, or recompute from the raw data.

### 3. Overfitting on values or format the prompt never set

- **Why it happens:** The criterion demands a specific value, label, or format the prompt never established and the agent can't deterministically infer. It happens when criteria are reverse engineered from whatever one model produced, so private conventions and exact marketplace prices get enshrined as requirements.
- **How to avoid it:** Search the prompt for every literal in the criterion. If it isn't there and isn't tool derivable, grade the shape of the value or the intent. Swap exact prices for tolerance bands or a check that the agent recorded a price.
- **Looks like:** "The power supply row contains the price $129.99," when the prompt only said to find a price on Amazon and any current listing price is valid.
- **Do this instead:** "The power supply row contains the price shown in the listing the agent selected," grading the behavior, not a frozen number.

### 4. Criterion admits multiple interpretations

- **Why it happens:** The criterion can be read in more than one defensible way, so the same answer scores differently across graders and rollouts, usually because subjective adjectives like professional, appropriate, or demonstrates understanding stand in for a countable property.
- **How to avoid it:** Operationalize the judgment into verifiable, countable properties. Collapsing adjectives into concrete checks is also the single biggest stability win across rollouts.
- **Looks like:** "The reply is professional in tone," which two graders will read differently and score differently.
- **Do this instead:** "The reply opens with a greeting by name, contains no profanity, and ends with the agent's role identifier."

### 5. Contradicts the prompt, universe data, or another criterion

- **Why it happens:** The criterion conflicts with the prompt, the seeded universe state, or another criterion, making the points impossible to earn. It comes from drafting without walking the prompt sentence by sentence or cross-checking the seeded workspace, so a prompt-faithful agent does the right thing and is still penalized.
- **How to avoid it:** Walk the prompt line by line and confirm each criterion agrees with it, then check every pair: can a single output satisfy both? Cross-check MEMORY.md, USER.md, and the inputs for values that conflict with any criterion.
- **Looks like:** The prompt says find an open ticket, but the criterion requires citing three tickets that are actually closed, so a faithful agent that reports none open gets penalized.
- **Do this instead:** Align the criterion with the prompt and the seeded data so the correct behavior earns the points.

### 6. Redundant or rewards-and-penalizes pairs

- **Why it happens:** The same observable property is graded by more than one criterion, sometimes once as a reward and once as a penalty. Every instruction to avoid something gets mirrored with a negative, and similar checks get written twice, so the same pass or fail is counted more than once.
- **How to avoid it:** For each criterion, ask whether another in the set checks the same fact; if so, consolidate and fold the weight into the survivor. Lead with positives so most polar pairs disappear.
- **Looks like:** One criterion rewards excluding a $650 charge while a second penalizes including it, counting the same fact twice.
- **Do this instead:** A single criterion for that fact, with the combined weight folded into it.

### 7. Bundled, non-atomic criteria

- **Why it happens:** A single criterion checks several independent facts at once, or a long list of items is graded one at a time instead of in aggregate. Stapling independent checks together, or giving every list item its own criterion, distorts the score and makes results noisy.
- **How to avoid it:** Keep one independent fact per criterion. For lists longer than five, use a single aggregate count plus three or fewer spot checks, and move exact measurements to a unit test where they belong.
- **Looks like:** "The Corn Flakes row is 4.19 and the All-Bran row is 5.89" bundled into one criterion, so a half-right answer still earns full credit.
- **Do this instead:** One criterion per row, or an aggregate count plus a few spot checks for a long list.

### 8. Missing coverage of an explicit requirement

- **Why it happens:** An explicit prompt requirement has no covering criterion or test, or the criteria are too broad to cover anything precisely, because the deliverable spec wasn't walked line by line and requirements slipped through uncovered.
- **How to avoid it:** Read the deliverable spec line by line, covering filenames, field counts, section headers, and ordering, and confirm each has a covering criterion or test. If anything has no check, block submission.
- **Looks like:** The prompt requires a specific section and ordering in the deliverable, but no criterion or test ever checks for it.
- **Do this instead:** A covering check for every requirement in the deliverable spec, walked line by line.

### 9. Weights or category gamed around the threshold

- **Why it happens:** Weights or categories are assigned to engineer the failure rate rather than to reflect the honest severity of each check, tuned to hit the threshold instead of the real impact.
- **How to avoid it:** Weight by impact: 5 for three or more dimensions, 3 for one or two, 1 for cosmetic. Never weight same-complexity actions differently by award status, and route hallucinated values to Factuality.
- **Looks like:** Two actions of identical difficulty weighted 1 and 5 depending on whether the model happened to get them right, nudging the set to exactly 50%.
- **Do this instead:** Weight by real impact and let the failure rate fall wherever it honestly lands.

### 10. Missing Evaluation Target tag

- **Why it happens:** A criterion is submitted without exactly one Evaluation Target tag, because the tagging step is skipped in the final pass before submission.
- **How to avoid it:** Tag every criterion with exactly one Evaluation Target before submitting. Even one untagged criterion is a structural fail.
- **Looks like:** A criterion shipped with no Evaluation Target at all, or with two of them.
- **Do this instead:** Exactly one tag per criterion, chosen from State Change, User-Facing Message, Trajectory, or Final Answer Artifact.

### 11. Missing or poorly grounded justifications

- **Why it happens:** Criterion states are left unexplained, or their justifications cite the wrong evidence, because justifications are treated as optional paperwork rather than part of the rubric and silent edits leave states unexplained.
- **How to avoid it:** Justify every non-trivial criterion state, citing the source, the rule, and a concrete fix. Pair every material edit with actionable feedback, because silent fixes don't teach the attempter.
- **Looks like:** A failed criterion marked not met with no explanation, or a justification that points at the wrong piece of evidence.
- **Do this instead:** A justification naming the source, the rule it breaks, and the concrete fix.

---

# Unit Tests _(reviewers only)_

Defects in verifier.py: coverage gaps, checks too loose to mean anything, and tests quietly
doing a rubric's job. This stage applies to reviewers only.

### 1. Coverage gaps in verifier.py

- **Why it happens:** A mechanically verifiable requirement has no test, or only its existence is checked while structure and order go unverified, because tests are written for the obvious files and the deliverable spec isn't ticked off requirement by requirement.
- **How to avoid it:** Walk the deliverable spec and give every mechanically verifiable requirement its own assertion. Order, count, and structure rules each need their own test; existence alone is not enough.
- **Looks like:** A suite that checks a file exists but never verifies the required section headings or the order they must appear in.
- **Do this instead:** A separate assertion for each rule: names, sections, counts, and ordering.

### 2. Underfitted tests that pass on garbage

- **Why it happens:** A test is loose enough to pass without the required behavior ever being performed. A loose membership check is quick to write but passes on a lone keyword, making it a false-positive generator rather than a test.
- **How to avoid it:** Parse the output structure, then assert the specific value or relation it must contain. A test that can't fail on a wrong answer isn't testing anything.
- **Looks like:** A check that passes whenever the report contains the word card or the word zillow once, with no reconciliation actually verified.
- **Do this instead:** Parse the report, then assert the exact value or relation the output must contain.

### 3. Tests doing a rubric's job

- **Why it happens:** Unit tests attempt to grade reasoning or qualitative behavior instead of mechanically verifiable facts. The line between the two stages gets blurred, so judgment-based checks leak into verifier.py where they can't be deterministically evaluated.
- **How to avoid it:** Keep unit tests to structural, deterministic facts such as folders existing, schema being right, and names matching. Leave reasoning and content judgments to the rubric, and trim any rubric a test already enforces.
- **Looks like:** A test that tries to judge whether the agent's reasoning was sound, or that grades the absence of fabricated content.
- **Do this instead:** Tests confined to deterministic facts, with all judgment left to the rubric.

### 4. Existence-only or over-bundled tests

- **Why it happens:** Tests confirm only that files exist, or pack many independent checks into a single test. One broad test feels like enough coverage, but it can't isolate which requirement actually failed.
- **How to avoid it:** Split file checks into separate, targeted assertions, and verify content and structure rather than just presence.
- **Looks like:** A single test that asserts every output file exists at once, so you can't tell which requirement failed.
- **Do this instead:** One targeted test per file, checking content and structure, not just presence.

### 5. Redundant tests or test-to-rubric imbalance

- **Why it happens:** Tests overlap with each other, or their number is badly out of balance with the rubric set, because coverage is padded with overlapping tests instead of balanced against the rubric set.
- **How to avoid it:** Remove redundant tests and keep the balance between tests and rubrics sensible. The two should complement each other, not compete for the same coverage.
- **Looks like:** Twelve unit tests against five rubrics, several of them checking the same thing.
- **Do this instead:** A trimmed set with duplicates removed and tests balanced against the rubrics.
