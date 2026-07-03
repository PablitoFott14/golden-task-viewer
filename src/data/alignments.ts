/**
 * Urgent Alignments - standards the client has asked contributors to adopt,
 * transcribed from the root `latest_alignments.md`. Grouped into dated batches
 * so new alignments can be appended over time without losing the history of
 * what changed and when. Keep this in sync with `latest_alignments.md`.
 */

export type AlignmentKind = "rule" | "weighting" | "guidance";

export interface AlignmentScenario {
  title: string;
  href?: string;
  prompt?: string;
  details: string;
}

export interface AlignmentTopic {
  id: string;
  title: string;
  kind: AlignmentKind;
  tag: string;
  impact: string;
  summary: string;
  body: string;
  scenarios?: AlignmentScenario[];
}

export interface AlignmentUpdate {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  logSummary?: string;
  topics: AlignmentTopic[];
}

export const alignmentUpdates: AlignmentUpdate[] = [
  {
    id: "2026-07-03",
    date: "2026-07-03",
    dateLabel: "03 Jul 2026",
    title: "To emphasize during training sessions",
    summary:
      "Six urgent alignments on rubric weighting, visual understanding, exists/structure/literal-verification checks, self-containment, output modality diversity, and decoys in multimodal inputs.",
    logSummary:
      "Covers rubric weighting, weight-5 visual checks, weight-1 structural checks, self-containment, richer outputs, and graded decoys.",
    topics: [
      {
        id: "weight-distribution",
        title: "Rubric weight distribution",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "Rubrics should put 60 to 70 percent of their weight on outcome and task-fulfillment accuracy, with 30 to 40 percent on supporting reasoning, process, and trajectory.",
        summary:
          "Outcome-oriented rubrics can evaluate intermediate logical decisions when those decisions make a key contribution to fulfilling the prompt.",
        body: `Requiring outcome-oriented rubrics does not mean rubrics should only evaluate the final artifact, snapshot, or user-facing message. Intermediate logical decisions can also be outcome-oriented when they make a key contribution to fulfilling the prompt.

### 60-70%: outcome and task-fulfillment accuracy

Focus this portion on whether the model successfully completes the user's task.

- Relevant categories: **Task Completion**, **Instruction Following**, and **Factuality and Hallucination**.
- Relevant evaluation targets: **State Change**, **User-Facing Message**, and **Final Answer Artifact**.

### 30-40%: supporting reasoning, process, and trajectory

Focus this portion on the logical, outcome-oriented decisions the model makes along the way.

- Include specific visual identifications required to reach the correct solution.
- Include universe or context checks needed to gather the information required for the expected output.
- Relevant categories: **Agent Behavior**, **Tool Use**, and **Safety and Boundaries**.
- Relevant evaluation target: **Trajectory**.`,
      },
      {
        id: "visual-understanding-weighting",
        title: "Visual understanding weighting",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "Any rubric that directly evaluates load-bearing visual identification should usually be weighted as 5, and the spec now requires at least 40 percent visual understanding.",
        summary:
          "The key distinction is explicit versus implicit visual understanding: only visual reasoning that the task truly depends on should receive top weight.",
        body: `Increase how much of the overall rubric score depends on visual understanding. Our tasks should include enough complexity to require cross-modal reasoning with visual identification. When a rubric directly evaluates that visual identification, it should usually be weighted as a **5**.

The spec has been updated to require at least **40% visual understanding**.

### Implicit vs. explicit direct visual understanding

The weight-5 rule applies only when visual understanding is **explicit/direct**: the task cannot be completed correctly unless the model actually reasons over the image. When the visual content is merely **implicit** (present, attached, or referenced, but not load-bearing for the outcome), it should not be weighted as a 5.

Use this test:

> **Could the model fulfill the intent correctly without identifying what is in the image?**
>
> - **No** -> the image is load-bearing -> **explicit/direct** -> weight 5.
> - **Yes** -> the image is incidental -> **implicit** -> weight normally.

### Explicit / direct visual understanding

Identifying, reading, counting, comparing, or locating something *in* the image is the actual work. Removing the visual identification breaks the task.

- "If the total on the attached invoice exceeds our record for that customer, email Brandon." -> must read the total off the invoice.
- "Count the screws of each type in the structure photos and add the ones under 20 to the 'Low Units' tab." -> must identify and count from the image.
- "Which of the three uploaded floor plans has the emergency exit closest to the stairwell?" -> must interpret the plans.

### Implicit visual content

An image is involved, but success depends on something else: a file operation, a text instruction, or metadata. The pixels are never interpreted.

- "Save \`kitchen.jpg\` to \`projects/2024/\` and rename it to \`kitchen-final.jpg\`." -> pure file operation; contents never read.
- "Summarize this report." where the report contains a chart but the text alone answers the prompt -> the chart is decorative to the outcome.
- "Attach the uploaded photo to the ticket and set its status to 'Resolved'." -> the image is a payload, not something to understand.

> **Guardrail:** do not inflate a rubric to weight 5 just because an image is attached. Reserve the 5 for cases where extracting or identifying the visual information *is* the reasoning that fulfills the intent.

### Case 1: identify a visual reference, cross-reference it, then act

Example:

> "If the total of the attached invoice is over our internal records reference for that customer, send an email to Brandon. If it is not, just keep that total in memory so I can follow up on it in the next quarter report."

Use:

- An **Agent Behavior / Trajectory** rubric to evaluate whether the model identifies that the invoice total in \`invoice.pdf\` is "$80,000", which exceeds the internal record for "Plumbing Solutions" ($67,000).
- A **Final Answer / Artifact** rubric to evaluate whether the final state change, final answer, or artifact is appropriate, such as sending the email or keeping the total in memory.

Weighting approach:

- The visual identification rubric should get **weight 5** because all the core reasoning and complexity needed to fulfill that part of the intent lives in that rubric.
- The outcome rubric can get **weight 1** because the core identification process is already covered by the Agent Behavior rubric.

### Case 2: the visual reference is the expected output

Example:

> "I need you to help me count the number of screws of each type present on the structure photos uploaded so we can compare them against inventory and see which ones we need for the next maintenance. Add the ones under 20 to the 'Low Units' tab within the \`inventory_control.html\` page."

In this case, the act of identifying the visual information already represents the outcome, and generating one rubric to identify and another to report would be redundant.

Weighting approach:

- Use one **Instruction Following / Final Answer Artifact** rubric weighted as 5: "The model reports 'screw 1' as having 15 units in the 'Low Units' of the \`inventory_control.html\`."
- This works because the complexity of the visual identification is nested inside the final artifact rubric.

Anything that directly, not only implicitly, requires visual understanding should get a weight of 5.`,
      },
      {
        id: "exists-structure-checks",
        title: "\"Exists\", \"structure\", and literal verification checks",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "No exists, structure, or literal-verification check can carry a weight above 1; values produced through reasoning belong at Medium Difficulty or above.",
        summary:
          "These checks confirm presence, shape, or direct copying from a human-authored source; they do not verify whether the task is actually correct.",
        body: `> For reviewers, these should usually live in Unit Tests because they verify structural parts of the intent.

These are the lowest-weighted kinds of criteria a rubric can contain because they verify mechanical presence, shape, or direct copying from a human-authored source. **No exists, structure, or literal-verification check can carry a weight above 1.**

### What should weight 1 cover

> **Reviewer rule:** "Exists" and "structure" checks **must be Unit Tests, never rubric criteria**. They are weight-1 concepts because they are mechanical checks, but reviewers should place them in the Unit Test layer rather than spending rubric slots on them.

- **"Exists" check** - Confirms only that *something is present*, without judging whether it is correct.
  - "A file named \`report.csv\` was created."
  - "The response includes a table."
  - "An email was sent to Brandon." This confirms it was sent, not that it should have been sent or said the right thing.

- **"Structure" check** - Confirms the *shape or format* is right, without judging the content. This also belongs in Unit Tests, not rubrics.
  - "The \`interactive_dash.html\` table contains columns 'date', 'result' and 'notes'."
  - "The invoice total is formatted as a dollar amount ('$80,000')."
  - "The HTML page has a 'Low Units' tab."

- **Literal verification against a source** - Confirms that the value was **authored verbatim by a human** in the prompt, an audio transcript, a source document, or a raw data file, and the model only has to copy it as-is.
  - This can stay at weight 1 when the model is copying a human-authored value directly.
  - This does **not** apply when the value merely appears in another output file, such as \`MEMORY.md\`, a summary artifact, a log, or another file produced through calculation, a verdict, a margin call, or any other reasoning step.
  - In that case, the model must reproduce the underlying reasoning, so the criterion is **Medium Difficulty / weight 3**, not Low Difficulty / weight 1.

### Why these checks stay low

All three answer *"is the container there / is the shape right / was a human-authored value copied directly?"* They do **not** answer *"is the task actually correct?"*

A model can satisfy them while getting the task completely wrong, such as producing a perfectly formatted table full of hallucinated values.

Because these checks capture almost no reasoning or task fulfillment, they must not be weighted highly. High weights are reserved for criteria that verify the substance:

- The correct value
- The correct decision
- The correct visual identification`,
      },
      {
        id: "self-containment",
        title: "Self Containment",
        kind: "rule",
        tag: "Rubric Quality",
        impact:
          "Non-self-contained rubrics fall under Fail - 10%+ Major Rubric Errors, and two such issues can fail a typical rubric set.",
        summary:
          "A rubric must be possible to evaluate from the criterion text itself, with only narrow exceptions for dynamic data and visual references.",
        body: `A rubric has to be possible to evaluate with the content of the rubric itself, nothing else.

The only two cases where sacrificing a little self-containment would be justified are:

### Dynamic data

This applies to Amazon listing prices, web-search-specific results, specific days, or similar values whose exact content can change.

Example:

- "Give me in the final message the cheapest Amazon listing for each one of the matching products" -> "The final user-facing message reports the price shown in the selected 'XPG CORE REACTOR II 850W Gold' Amazon listing (e.g., '$129.99')."

### Rubrics implying visual references

When a rubric implies a visual reference, naming the file or image may be acceptable because the grader has access to the visual artifact.

### ⚠️ SELF-CONTAINMENT IS CRITICAL

This has been a recurring issue since day one of the project, and we cannot afford to let it keep happening.

Before submitting any task, **always ask yourself**:

> **"Can this rubric be evaluated using only the information contained within the criterion itself, without relying on external sources?"**

- If **yes**, the rubric is self-contained, assuming it is also atomic.
- If **no**, then unless there is a valid exception because the nature of the data makes full self-containment impossible, the rubric is **not self-contained**.

Non-self-contained rubrics fall under **Fail - 10%+ Major Rubric Errors**. In practice, this means that **having just two non-self-contained rubrics in a rubric set of around 15 to 20 criteria is enough for the entire task to fail.**

Open the task-link examples below only when you need the details.`,
        scenarios: [
          {
            title: "https://openclaw-viewer-mm.vercel.app/attempt/6a32dce2238b8ac896b224cc/#rubrics",
            href: "https://openclaw-viewer-mm.vercel.app/attempt/6a32dce2238b8ac896b224cc/#rubrics",
            details: `One criterion tries to cover every product at once, so its ground truth cannot fit inside the rubric text: which photo depicts which product, and what the correct verdict is for each.

**R1** - "Every Photo QC record with a PASS or EDIT verdict cites a photo_file that genuinely depicts that product, matching the product's appearance in the labeled walkthrough video; products for which no faithful still exists are recorded as RETAKE."

- Which product is being checked?
- Which photo_file is correct for that product?
- What verdict should that product receive?
- Where does the grader get the photo-to-product ground truth?

The answer lives in the walkthrough video and images, not in the rubric. The cleaner self-contained shape is one rubric **per product**, each naming the expected photo_file and verdict, exactly what **R3** already does:

> "The Photo QC record for Baby Beanie - Solid Gray has verdict PASS, citing IMG_0489.jpg (the only square 2710 x 2710 still, sharp, accurate color)."

**R5** is borderline because it inlines the four photo-quality standards, but "each verdict" still needs per-product ground truth. Keep the inlined standards and move the correctness check into per-product rubrics.

**R7** can work as a trajectory/process check because it asks whether the agent consulted the walkthrough labels, but it should not be used to verify the mapping itself unless the correct mapping is stated.`,
          },
          {
            title: "https://openclaw-viewer-mm.vercel.app/attempt/6a3f4946980f47b835c4062f/#rubrics",
            href: "https://openclaw-viewer-mm.vercel.app/attempt/6a3f4946980f47b835c4062f/#rubrics",
            details: `Several rubrics push expected values into the environment. The tell is simple: to grade them, you have to ask a question the criterion cannot answer by itself.

**R3** - "mockup.webm contains product segments for each received product registered in order KC-26-04182"

- Which products are registered in order KC-26-04182?
- How does the grader confirm the segments are complete without opening the internal database?

Self-contained reframe:

> "mockup.webm contains a product segment for each of the four received products: Stoneware Glaze Set, Underglaze Duo (Midnight Blue / Desert Sand), Studio Towels, and Sticker Pack."

**R6** needs the image-to-product pairing and "the four descriptions" to be stated directly. Name each pair explicitly, such as \`glazze.jpg\` -> Stoneware Glaze Set and \`towl.jpeg\` -> Studio Towels, or split into one rubric per product-image pair.

**R12** should state the expected address instead of saying it is "deduced from" another file:

> "outline.docx contains a Google Maps link to 132 Church St NW, Vienna, VA (e.g., 'https://www.google.com/maps?q=132+Church+St+NW,+Vienna,+VA')."

**R14** should state the sponsor facts that make the editor instructions grounded, such as the due date and the expired coupon code.

**R15** should state the prior-message context the Lena reply must acknowledge, such as the softbox / white-balance check, or a semantically equivalent reference.`,
          },
        ],
      },
      {
        id: "output-modality-diversity",
        title: "Output modality diversity",
        kind: "guidance",
        tag: "Scenario Design",
        impact:
          "Stop using handwritten notes as the default way to make the model fail; difficulty should come from cross-modal workflows and richer output artifacts.",
        summary:
          "Handwritten notes can still be part of a scenario, but the main complexity should come from coordinating modalities, producing richer artifacts, and taking realistic state-changing actions.",
        body: `Most submitted tasks follow the typical handwritten-note scenario and produce a regular \`.csv\` or \`.pdf\` output. **Be creative.** The model can do much more than we are asking it for, and the complexity is nested in asking for other types of outputs and requiring cross-modal reasoning across different multimodal inputs.

**Stop using handwritten notes as the default way to make the model fail.**

The difficulty should come from:

- **Cross-modal reasoning**, such as extracting information from one modality, using it to perform actions in another, then validating or continuing the workflow using yet another
- Richer and more interconnected reasoning chains
- **Less common output artifacts**

The difficulty should **not** come from making the inputs themselves harder to read, such as using more challenging handwriting.

### What Claude Opus 4.6 can read

- **Text:** plain text (\`.txt\`), Markdown (\`.md\`), source code, logs, configuration files (\`.json\`, \`.yaml\`, \`.toml\`, \`.ini\`), XML, SQL, emails, and long reference documents.
- **Images:** \`.png\`, \`.jpg\`, \`.jpeg\`, \`.webp\`, screenshots, photos, scanned documents, diagrams, charts, graphs, tables, UI mockups, maps, forms, and reasonably legible handwritten notes.
- **Documents:** PDF (\`.pdf\`), Microsoft Word (\`.docx\`), HTML (\`.html\`), Rich Text (\`.rtf\`), Markdown (\`.md\`), and other document formats containing text, tables, images, and structured layouts.
- **Structured data:** CSV (\`.csv\`), Microsoft Excel (\`.xlsx\`, \`.xls\`), JSON (\`.json\`), XML (\`.xml\`), SQLite databases (\`.sqlite\`, \`.db\`), and other structured data files.
- **Video:** video files such as \`.mp4\`, \`.mov\`, \`.avi\`, and \`.webm\` when processed through frame extraction or labeled frames provided by the task environment.
- **Audio:** audio files such as \`.mp3\`, \`.wav\`, and \`.m4a\` when a transcript or supported processing path is available.

### What Claude Opus 4.6 can produce

- Plain text (\`.txt\`)
- Markdown (\`.md\`)
- HTML (\`.html\`)
- CSS (\`.css\`)
- JavaScript (\`.js\`)
- JSON (\`.json\`)
- YAML (\`.yaml\`)
- XML (\`.xml\`)
- CSV (\`.csv\`)
- SQL (\`.sql\`)
- Configuration files
- Source code in virtually any programming language
- Excel workbooks (\`.xlsx\`)
- Word documents (\`.docx\`)
- PowerPoint presentations (\`.pptx\`)
- PDFs (\`.pdf\`)
- Charts and visualizations (\`.png\`, \`.svg\`)
- Generated or edited images
- Multi-file projects and applications
- Other binary artifacts supported by the available libraries

Use **state changes** when the environment supports them, such as sending emails, updating databases, creating calendar events, modifying files, organizing folders, or updating project memory. This complements your scenarios in a realistic way and adds a new cross-modal reasoning layer for the model.

> **Design principle:** The challenge should come from coordinating information across modalities and producing complex workflows, not from making the inputs artificially difficult to read.

### How to use this when authoring

- Pair an input modality with a *different* output modality: read a chart -> write a spreadsheet; read a video -> produce a slide; read invoices -> send an email.
- The reasoning that bridges the two is where the difficulty and the weight-5 visual rubric should live.
- Prefer the richer artifact when the scenario allows it: \`.pptx\`, \`.xlsx\`, a rendered chart, or \`.webm\` over a plain \`.csv\` or \`.pdf\` dump.
- Keep the visual identification load-bearing so the task genuinely cannot be solved text-only.

Examples of scenarios with genuine complexity beyond handwritten notes can be found in the Golden Task Viewer. In particular, Scenarios 2 and 3 use handwritten notes as **just one component of a broader workflow**, rather than making them the primary source of difficulty. The handwritten content supports the overall intent instead of serving as a shortcut or trap to force the model to fail.

The examples below are intentionally reused in **Point 6**. Here in Point 5, read them from the perspective of handwritten notes and scenario design: the note or document can contribute to the scenario, but the real difficulty should come from the workflow, artifact, state change, and cross-modal reasoning. Point 6 uses the same examples from the friction angle.

**Remember:** handwritten notes should contribute naturally to the scenario, not become the sole challenge. The complexity should come from the overall reasoning, workflow, and interactions across multiple modalities.`,
        scenarios: [
          {
            title: "Scenario 1: Zoe's school prep",
            prompt: `Zoe is about to start 1st grade, and I am a bit concerned about her reading, writing, and math, and I want to create something interactive that can help her catch up and start school feeling confident.

Help me create \`zoe_learns.html\` using the notes Keisha put together from her meeting with Ms Carter, the exercises I have selected to include, and the uploaded layout requirements. You have to focus only on exercises that apply to Zoe's gaps; any other has to be discarded and referenced into MEMORY.md.

Also, since I want us to be very strict about tracking her progress before she starts school on August 14, please create a calendar event series for Keisha and me from now, starting tomorrow, until then. The events should be scheduled every 2 days across Monday through Saturday, with Sundays treated as off days.`,
            details: `**Why this represents genuine complexity:**

- Requires cross-modal reasoning across **3 different sources**:
  - Identify Zoe's improvement areas from the parent-teacher notes, which could be provided as a PDF, DOCX, TXT, or similar document.
  - Cross-reference those gaps against the selected set of exercises, which could come from photos, screenshots, videos, handwritten worksheets, or other uploaded materials.
  - Determine which exercises are actually appropriate for a 6-year-old about to start 1st grade.
- Requires filtering and discarding:
  - Exercises that match Zoe's gaps should be included in the final output.
  - Exercises that do not apply should be discarded and documented in \`MEMORY.md\`.
- Requires producing a specific final artifact:
  - A polished \`zoe_learns.html\` page.
  - The page must follow the uploaded \`layout.md\` requirements.
- Requires an additional state/action outcome:
  - Create a calendar event series for Keisha and the parent.
  - Events must run every 2 days from tomorrow until August 14.
  - Scheduling must happen only Monday through Saturday, with Sundays treated as off days.`,
          },
          {
            title: "Scenario 2: Milek's backyard timeline",
            prompt: `Hey, Milek here. I got my drip irrigation kit and I'm about to install it. Before setting it up, I want to document the current state of my backyard, including all the plants and the rest of the things I currently have, so I can track how everything evolves over the next few months with this new irrigation system.

Based on the uploaded content, please create a \`backyard_timeline.svg\` that visually documents the current state of my backyard and serves as a six-month progress tracker starting from now. I'll upload the exact layout and design specifications I want as part of the context. The SVG should use the uploaded backyard inventory as the baseline, include one milestone for each month, group the tracked plants and backyard areas into clearly labeled sections, and leave dedicated placeholders for future progress updates and comparison notes.

Once the SVG is complete, set up a recurring reminder every Friday of the last week of each month, starting today, so I can update it with the latest progress. Any reminder title that includes the words "backyard progress" works. I want you to include Terrence in the event as well since I want him to follow up on the progress with me.`,
            details: `**Why this represents genuine complexity:**

- Requires cross-modal reasoning across **multiple sources**:
  - Identify the current backyard inventory: plants, structures, existing items, from uploaded content that could be photos, screenshots, or a written inventory list.
  - Cross-reference that inventory against the uploaded design specifications to determine how sections should be grouped and labeled.
  - Determine what counts as a "milestone" for each of the six months given the current baseline state.
- Requires filtering and organizing:
  - Tracked plants and backyard areas must be grouped into clearly labeled sections, not dumped as a flat list.
  - Placeholders for future progress updates and comparison notes must be structurally present, not just implied.
- Requires producing a specific final artifact:
  - A polished \`backyard_timeline.svg\` that visually documents the baseline and includes one milestone per month.
  - The SVG must follow the uploaded layout/design specifications exactly.
- Requires an additional state/action outcome:
  - Set up a recurring reminder for every Friday of the last week of each month, for six months, starting today.
  - The reminder title must include the words "backyard progress", or a semantically equivalent variant.
  - Terrence must be included on the reminder/event alongside Milek.`,
          },
        ],
      },
      {
        id: "decoys-noise",
        title: "Decoys/noise in the multimodal input",
        kind: "guidance",
        tag: "Scenario Design",
        impact:
          "A robust task should include realistic friction points that are resolvable from the provided materials and explicitly graded in the rubric.",
        summary:
          "Decoys should force judgment between plausible options, not random noise or formatting awareness.",
        body: `A robust task should not fail the model only because the scenario is genuinely complex. It should also precisely place **friction points**: pieces of input that look plausible or relevant but are the wrong answer, so the model has to actively verify rather than pattern-match the first thing that fits.

This is deliberate, meticulous design work, not random clutter. Every task in the Golden Task Viewer has a section dedicated to explaining how friction was worked into that specific scenario in a realistic way.

### What counts as a decoy

- **Distractor visual** - an uploaded image that resembles the target but is not it: wrong angle, wrong color variant, wrong product, or an older photo of the same subject. The model must select the *correct* one, not just *a* plausible one.
- **Distractor record** - a stale or superseded piece of data sitting alongside the current one, such as last quarter's price list next to this quarter's or an old address on file next to a newer one. In the Kiln & Co task, the environment contains a Virginia address the agent visually encountered and a Portland, OR address on file for the sponsor. The correct answer requires recognizing these are different and using the one on file, not the geographically salient one.
- **Distractor communication** - an irrelevant email/message thread living in the same inbox or channel as the one that matters, which the model must correctly ignore rather than act on.
- **Near-duplicate identity** - two people, products, or IDs with very similar names: two "Jordan"s, two SKUs one digit apart, "Kiln & Co" versus a similarly named but unrelated vendor. The model must disambiguate using context, not guess.
- **Red herring instruction or note** - a plausible-sounding note, such as a handwritten comment or old to-do, that implies an action the rest of the context contradicts once cross-checked.

### Design principles

- **A decoy must be resolvable from the provided materials alone.** If disambiguating it requires information nowhere in the task's universe, it is not a decoy; it is an unfair or broken task. This is the same standard as Self Containment: the correct disambiguation has to be groundable in what is given.
- **Every decoy needs a rubric that actually checks it was avoided.** A friction point that is not graded is wasted complexity. Write a rubric that fails the model if it falls for the trap. For example, "the email does not mention the Virginia address" is precisely a rubric that verifies a decoy was *not* acted on.
- **Do not over-stack.** Too many simultaneous decoys can bury the genuine complexity of the scenario and turn the task into a noise-filtering exercise instead of a reasoning one. Friction should sit alongside the real cross-modal reasoning chain, not replace it.
- **A decoy tests judgment, not alertness to formatting.** It should force a real decision between two plausible options. It is not the same thing as an exists/structure trap, which only tests whether the model noticed a container exists.

### Where to place decoys across modalities

- **Visual** - a similar-but-wrong image mixed in among several uploaded photos or video frames.
- **Textual/data** - an outdated or conflicting record living in the same document, spreadsheet, or database table as the current one.
- **Temporal** - a timestamp or event that superficially matches the ask but falls outside the actually requested window.
- **Identity** - near-duplicate names, emails, or IDs that require correct matching, not just presence-checking.

### Examples of friction

The examples below are the **same examples used in Point 5**, intentionally reused here from a different angle. Point 5 explains why the scenarios should not depend on handwritten notes as the main failure mode. Point 6 explains how the same scenarios can include realistic friction, complexity, and verification pressure without becoming artificial traps.

Open each example when you need the compact friction view.

### Guardrail

Friction has to earn its place in the scenario. If a decoy only makes sense because the task author inserted it, not because a real person's files would plausibly look that way, it is contrived. The examples here work because they are the kind of mess that shows up naturally: outdated files, near-duplicate filenames, and calendars that already have things on them, not artificial traps dropped in just to catch the model.`,
        scenarios: [
          {
            title: "Same example as Point 5: Zoe's school prep",
            details: `Read this as the friction version of the Point 5 example. The scenario should still be difficult because of the workflow, not because the handwriting is hard to read.

- **Skill mismatch:** Include one or two exercises that target a skill Zoe's notes say she has *already* mastered, such as shape recognition when Ms. Carter's notes flag reading and math as the actual gaps. The model must discard them into \`MEMORY.md\`, exactly as the prompt asks.
- **Near-duplicate files:** Include two versions of the same worksheet, such as \`addition_practice_draft.pdf\` versus \`addition_practice_final.pdf\`, where only the final one reflects Ms. Carter's actual recommendation.
- **Age mismatch:** Include exercises that are not appropriate for a 6-year-old about to start 1st grade, such as multiplication worksheets, advanced grammar or syntax analysis, or age-inappropriate reading comprehension.
- **Calendar friction:** The event series must run for **six months starting from now, excluding the current month**, every **2 days**, **Monday through Saturday only**, with **Sundays treated as off days rather than counting toward the 2-day interval**.`,
          },
          {
            title: "Same example as Point 5: Milek's backyard timeline",
            details: `Read this as the friction version of the Point 5 example. The SVG and reminder workflow should carry the complexity; the decoys should force verification, not act like random traps.

- **Stale inventory:** Include an older backyard inventory list from before some plants were removed or replaced. The SVG baseline must reflect the *current* state shown in the photos, not the stale list.
- **Irrelevant garden content:** Include multimodal inputs referencing decorative elements, tables, figures, or other garden content unrelated to the irrigation process. The model must filter those out instead of treating every visible item as relevant.
- **Calendar friction:** The event series must start **tomorrow** and continue **until August 14**, occurring **every 2 days** across **Monday through Saturday only**. **Sundays are off days and should never count toward the 2-day interval**. For example, if the previous event is on Saturday, the next one should be on Monday, not Tuesday.`,
          },
        ],
      },
    ],
  },
];

export const latestAlignmentUpdate = alignmentUpdates[0];
