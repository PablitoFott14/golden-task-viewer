### 1. Persona Understanding

This task rationale starts by interacting with the Universe Creator (after first loading the **Service Universe Artifact ID** - **IMPORTANT**).

Within the **Database** tab, ask the AI agent:

> "Hey, I need to get familiar with Rebecca Davis's background and situation. Could you help me understand the key aspects of her profile, such as her occupation, team, personal responsibilities, and any other relevant context that would help me better understand her day-to-day life and priorities?"

Use the response to generate a `persona_context.md` file (or similar).

* From this point onward, step into the persona's shoes. You are Rebecca ("Becca"). Think, communicate, and reason as someone living within that universe.

The detail that matters most for this task is Rebecca's role: she's a QA engineer, not a developer. Her job is to determine the *current* state of a system by comparing evidence, not to fix anything. That framing is the spine of the whole task — the deliverable is a status report, and the only way to get it right is to treat one source (her own Jira notes) as a lead and another (the RC screenshots) as the actual evidence.

### 2. Brainstorming

Based on the assigned **Category** (Operations & QA) and **Subcategory** (UI/UX Screenshot Audit/form-filling), and the information gathered in `persona_context.md`, brainstorm realistic task ideas:

#### Idea 1: Refund Module QA Status Report

Rebecca is up against a deadline and needs to tell her manager, Colton, the current state of every bug logged against the refund module. She has her own personal Jira notes (which she admits are usually outdated) and a folder of release-candidate screenshots from the team's shared testing folder. She needs the agent to determine, bug by bug, whether each one is actually resolved, generate a formatted SVG report, update the team's shared memory file with issue keys, and notify the team.

#### Idea 2: UAT Test-Scenario Runner

Colton forwarded Rebecca a UAT test document from a healthcare client (Meridian Health) and asked her to run through their test scenarios. The agent would need to follow the setup doc step by step and report pass/fail per scenario.

#### Idea 3: Release-Hold Postmortem

Reconstruct why a Friday release was held (referenced in her Slack history with Colton) by cross-referencing the error-state coverage gap against her calendar, and draft a postmortem note.

### 3. Which Idea Would I Feel More Comfortable Following Up With?

**Chosen Idea:**
**Idea 1: Refund Module QA Status Report**

**Why am I choosing this idea?**

It's the most natural fit for a QA engineer's actual day-to-day, and it gives the agent a genuine evidence-reconciliation problem instead of a single lookup. Rebecca's own words set up the core mechanic for free: she says her Jira tracker is "usually outdated" and that she keeps her own personal notes instead. That single admission is the entire task design — it means the model cannot treat the Jira board as ground truth. It has to open every RC screenshot and decide, bug by bug, whether the note's status still holds. Eleven bugs is enough to make a shortcut (trusting the board) statistically costly, and few enough to stay gradable one criterion at a time. On top of the status determination, the task layers a second reasoning thread — reconciling company issue keys from a tracker-notification email against the personal notes and generating new keys for the rest — plus a structured, exact-format SVG deliverable and two outbound state changes (Slack, email). Nothing here is decorative; every input feeds a checkable output.

### 4. Don't Build the Prompt Yet - Build the Reality First

Which MM context could I be gathering or creating to support this idea?

- Rebecca's personal Jira tracker becomes a single screenshot of a Kanban board (`Screenshot 2026-07-03 000152.png`), all 11 bugs sitting in a `TO DO` column with her own shorthand names and ticket numbers — deliberately never updated, because that staleness is the whole point.
- The real status of each bug lives in a separate RC (release-candidate) screenshot, one per issue, pulled straight from the team's shared testing folder. Because that folder collects manual screenshots from three different people (Rebecca, Amara, Kai) plus direct build-export script saves, the filenames are intentionally inconsistent — some look like camera exports (`IMG_4471.png`), some like manual screenshots (`Screenshot 2026-07-03 at 15.58.21.png`), some like build-script saves (`rc-refund-build-01.png`, `RC_refund_0712_02.png`). None of the filenames hint at which bug they resolve; the agent has to actually read each one.
- Two extra images go into the same folder without corresponding to any bug in Rebecca's notes: `Screenshot 2026-07-02 at 09.14.06.png` (a Payouts & Settlements dashboard — plausible-looking payments evidence) and `IMG_2093.png` (her own personal weekly calendar, entirely unrelated). Since the prompt explicitly says not to address anything not logged in her own Jira, a careful agent can open both, recognize neither maps to a logged bug, and leave them out; a rushed one might try to shoehorn the plausible-looking one in as a finding.
- A `svg_format.txt` file pins down the exact shape/color/label spec for the report, so the SVG's structure is fully testable and the reasoning about bug status stays the focus.
- The company's real issue-key system (`NEXB-###`) has to be recovered from a tracker-notification email, separate from Rebecca's personal `KAN-###` numbering, so the agent has to reconcile two different ticket systems rather than just relabeling one.

What would realistically increase the complexity?

- Seven of the eleven bugs are, in truth, already fixed — but the Jira board says otherwise for all of them. That imbalance (7 resolved vs. 4 still open) makes "just trust the board" an unusually costly shortcut instead of a lucky guess.
- The RC evidence itself requires real reading, not pattern matching: an HTTP 500 stack trace, a VAT arithmetic check (`€142.90` → `€28.58` at 20%), a balance recomputation (`$87.40 − $33.15 = $54.25`), a UI-state check on a disabled button, a three-field match on a confirmation screen, a negative-balance overshoot, a prior-refund banner, mobile viewport clipping, and a status/gateway-response mismatch (`Completed` UI vs. `DECLINED` gateway). Each is a different kind of evidence-reading task, so there's no single trick that cracks all eleven.
- Only two of the eleven bugs already have a company issue key in the tracker email. The agent has to determine the latest registered key and continue the sequence correctly for the other nine, rather than inventing keys ad hoc.

### 5. Final Decision on MM Context

I commit to the following inputs and where each one lives.

Rebecca's personal Jira notes: `Screenshot 2026-07-03 000152.png` — 11 bugs, all shown as `TO DO`, each with her own shorthand name and personal ticket number.

The 11 RC evidence screenshots (one per bug), scattered across build-export and manual-capture naming conventions: `rc-refund-build-01.png`, `RC_refund_0712_06.png`, `rc-refund-build-03.png`, `RC_refund_0712_02.png`, `RC_refund_0712_04.png`, `Screenshot 2026-07-03 at 15.58.21.png`, `rc-refund-build-07.png`, `IMG_4471.png`, `RC_refund_0712_09.png`, `RC_refund_0712_10.png`, `rc-refund-build-11.png`.

Two distractor screenshots not tied to any Jira entry: `Screenshot 2026-07-02 at 09.14.06.png`, `IMG_2093.png`.

The output structure is fixed by `svg_format.txt`, which defines the exact shapes, labels, connection rules, and the six-color palette `refund_mod_QA_results.svg` must follow.

The company issue-key system is recovered from a tracker-notification email in Rebecca's inbox, which confirms `NEXB-442` and `NEXB-443` and establishes `NEXB-443` as the latest registered key.

Friction points built in:
- The Jira board is a lead, not ground truth — the agent must verify every single bug against its RC screenshot rather than trusting the board wholesale.
- The two distractor screenshots test restraint: recognizing evidence that simply doesn't belong to this task and leaving it out.
- Two separate ticket systems (personal `KAN-###`, company `NEXB-###`) must be reconciled, with the unmatched majority requiring correctly sequenced generated keys.
- The deliverable has a hard visual spec (shapes, exact labels, a fixed six-color palette, node placement) on top of the status-determination reasoning, so a status mistake and a formatting mistake are graded independently.

### 6. Time to Materialize the Prompt

I shape the idea into a final prompt that stays natural and is fully grounded in the reality and evidence I created. Rebecca explains she's up against a deadline, only has one bug marked solved, and is attaching her personal Jira notes and the RC screenshots (warning that their filenames are inconsistent because they come from different people). She asks for the SVG report following the attached format spec, a `MEMORY.md` update split into `SOLVED`/`UNSOLVED` sections referencing both her personal names and the matching (or newly generated) company issue keys, a Slack update to the team asking Kai and Amara to help follow up on the unresolved bugs, and an email to Colton with the SVG attached under an exact subject line. She also explicitly scopes the task down to bugs in her own Jira notes.

I must never create a prompt where the uploaded materials are decorative only. Here the Jira screenshot sets the bug list and the (misleading) starting assumption, the RC screenshots are the only source of truth for status, the format file drives the SVG's structure, and the tracker email drives the issue-key numbering. Each one affects a checkable output.

Final prompt = `prompt.md`

### 7. GTFA Creation

My prompt is expected to have a single GTFA, since each bug's true status resolves to one defensible answer once its RC screenshot is actually read, and the issue-key sequencing has a single correct continuation. I craft it so it leads a correct silver trajectory and enables precise rubric creation.

The GTFA is a bug-by-bug ground truth table (11 rows: Jira name, RC evidence, true status, and the reasoning that grounds it), followed by the issue-key mapping and the exact required content of the SVG, `MEMORY.md`, the Slack message, and the email.

The bug-by-bug table is what makes the task deterministic and gradable: each status is pinned to one piece of RC evidence that either confirms or contradicts the Jira note, and the 7-resolved / 4-unresolved split only emerges once every screenshot has actually been opened.

GTFA = `GTFA.md`

### 8. Running the Prompt In the Openclaw Environment

> Important: This must be a single prompt-agent interaction. There should be no multiple turns and no follow-up messages. If I forget to upload the multimodal context, I should reset the agent, start a fresh interaction, and send the initial prompt again with the correct context uploaded.

For this task the initial run is a strong failure candidate. The model opened both distractor screenshots and correctly recognized neither maps to a logged bug, correctly matched `NEXB-442`/`NEXB-443` from the issue-key email and generated a correct `NEXB-444`–`NEXB-451` sequence for the remaining unmatched bugs, and correctly read the four genuinely-unresolved bugs' RC screenshots (`No refund cap`, `Refund mobile view misrendered`, `Fake refund success`, and the already-known `Partial refund timeout`). But it never actually opened the other seven RC screenshots to check whether each Jira "TO DO" item still held, and it also missed the email's separate reference to `NEXB-398` for Safari, generating a ninth key (`NEXB-452`) for it instead. It treated the Jira board's column as the final word for every bug it hadn't specifically flagged, and marked 10 of the 11 bugs unsolved — missing all six additional resolved bugs (`Full refund renders complete`, VAT tax, partial balance update, refund-reason validation, the confirmation screen, and duplicate-refund) and reporting only the one bug (Safari login) that the prompt itself had already told it was solved.

### 9. Cross reference GTFA with model's response

Cross-referencing the model's `refund_mod_QA_results.svg`, `MEMORY.md`, Slack message, and email against the GTFA confirms a clean, reasoning-shaped failure rather than a refusal or a formatting slip:

- The SVG correctly used the format spec's shapes, exact labels, and six-color palette, and correctly generated new `NEXB-444`–`NEXB-451` keys for the bugs that lacked one.
- But it marked `Is solved?` → `No` for six bugs that RC evidence shows are actually resolved, and → `Yes` for only Safari.
- It also missed the email's separate reference to `NEXB-398` for Safari and labeled it `NEXB-452` in `MEMORY.md` instead — a second, independent mistake alongside the status misses, since Safari's resolved/unresolved call was itself correct.
- `MEMORY.md`'s `SOLVED` section lists only Safari, missing the other six resolved bugs entirely.
- The Slack message and the email to Colton both propagate the same "1 solved, 10 unsolved" conclusion, so the mistake reaches every downstream deliverable and every teammate who reads them.
- The one place the model showed real judgment — recognizing `No refund cap`, `Refund mobile view misrendered`, and `Fake refund success` as genuinely still broken by actually reading their RC screenshots — makes the miss on the other six more visible: it clearly can read this kind of evidence when it chooses to, it just didn't apply that same check across the whole board.

This gives the task a strong evaluation surface. The failure concentrates in exactly one behavior — treating a stale board as current truth instead of a note to verify — while the parts that only needed careful reading of a single screenshot in isolation (the four correctly-flagged unresolved bugs) succeeded. One root cause, several downstream symptoms, cleanly separable in the rubric set.

### 10. Silver Trajectory

IMPORTANT: Always restore to seed. Do not start fresh.

For the Silver Trajectory I guide the model toward the correct response with a targeted follow-up:

> Follow-up 1: Before finalizing any bug's status, open its matching RC screenshot from the shared team folder and check whether it contradicts the Jira note — the Jira board is known to be outdated. Re-check all 11 bugs this way. Six of them (`Full refund renders complete`, `Incorrect tax - international funds (VAT 20%)`, `Partial refund balance update`, `Refund reason mandatory to proceed`, `Confirmation screen (matching destination card number)`, and `Dup refund`) are actually resolved in the RC build, in addition to the Safari login you already correctly marked solved. Regenerate `refund_mod_QA_results.svg`, `MEMORY.md`, the Slack message, and the email so all four deliverables consistently report 7 solved / 4 unsolved, keeping the issue-key mapping you already got right.

> Correct solution reached!!

### 11. Unit Tests (ONLY FOR REVIEWERS)

At this stage, define reviewer-only unit test references. These are not the unit tests themselves; they are only names and descriptions that reviewers can use when creating the actual tests.

What is structurally important for this prompt?

| Unit test reference | Logic covered |
| --- | --- |
| `test_svg_report_exists` | Verifies `refund_mod_QA_results.svg` exists and is non-empty (not just present). |
| `test_svg_required_labels` | Verifies the start node, note box, and all 11 decision-diamond labels match the format spec exactly. |
| `test_svg_allowed_colors_only` | Verifies every fill/stroke color in the SVG belongs to the six-color palette in `svg_format.txt`. |
| `test_email_sent_to_colton` | Verifies an email was sent to `colton.park@nexbridge.io` with the exact required subject and the SVG attached. |
| `test_slack_message_posted` | Verifies a message was posted to `#qa-team` tagging Kai and Amara. |
| `test_memory_md_has_solved_unsolved_sections` | Verifies `MEMORY.md` contains both a `SOLVED` and an `UNSOLVED` heading. |
| `test_memory_md_entries_have_issue_keys` | Verifies every bug entry in `MEMORY.md` carries a bracketed issue key. |

### 12. Rubrics

For the rubrics I weight by the complexity of the reasoning each criterion takes to get right and to verify, not by how important the criterion feels.

- The heaviest weight (+5 each) goes to the eleven bug-status determinations, since each one requires actually reading a specific RC screenshot and reconciling it against the Jira note — the core reasoning act of the task, evaluated against the trajectory (Agent Behavior), and the exact place the run above failed six times.
- A mid weight (+3) covers the issue-key reasoning step: determining the latest registered key from the email and correctly continuing the sequence for every bug that needs a new one — also an Agent Behavior / Trajectory criterion, since it's a reasoning act, not a restated value.
- Light weights (+1) cover the mechanical restatements of an already-determined status inside the SVG and `MEMORY.md` (Task Completion, since these just carry a conclusion into the right place), plus the SVG's fixed formatting requirements (shapes, exact labels — Instruction Following). One of these, rubric 26, isolates the Safari ticket specifically: unlike the other eight bugs needing a key, Safari's is a second, separate email reference (`NEXB-398`), not part of the generated sequence — so this rubric is checkable independently of whether the model's Safari status call (already correct) or its email-reconciliation reasoning (already correct for the other eight) landed right. It's graded as Agent Behavior / Trajectory, since finding the second reference is itself a reasoning step, not a value carried in from elsewhere.
- The negatives capture the two failure modes actually worth penalizing on this task: addressing bugs outside Rebecca's own Jira notes (a scope violation the agent's own behavior would commit, -5, Agent Behavior / Trajectory) and misplacing the start node off-center in the SVG (-1). The second one is a narrower call than it looks: `svg_format.txt` never states the start node must be centered, so this isn't a restated spec requirement — it's graded because in this specific run the node was rendered hard against the edge of a wide canvas, a plainly-visible layout defect with real impact on how the report reads. Elements the prompt never actually asked for shouldn't normally be in scope for grading; this one earns its place because the failure itself was concrete and severe, not because "centered" is a standing rule for this deliverable.

rubrics = `rubrics.md`
