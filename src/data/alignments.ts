/**
 * Latest Alignments — urgent guidance communicated by the client, transcribed
 * from the root `latest_alignments.md`. Grouped into dated batches so new
 * alignments can be appended over time without losing the history of what
 * changed and when. Keep this in sync with `latest_alignments.md`.
 *
 * Each topic's `body` is Markdown, rendered with the same `prose-task`
 * treatment used for artifact docs elsewhere in the app.
 */

export interface AlignmentTopic {
  id: string;
  title: string;
  tag: string;
  summary: string;
  body: string;
}

export interface AlignmentUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  topics: AlignmentTopic[];
}

export const alignmentUpdates: AlignmentUpdate[] = [
  {
    id: "2026-07-03",
    date: "2026-07-03",
    title: "To emphasize during training sessions",
    summary:
      "Six urgent alignments on rubric weighting, visual-understanding depth, self-containment, and scenario diversity — the points the client asked us to reinforce immediately.",
    topics: [
      {
        id: "weight-distribution",
        title: "Rubric weight distribution",
        tag: "Rubrics",
        summary: "60–70% outcome accuracy, 30–40% supporting reasoning — and intermediate steps can count as outcome-oriented too.",
        body: `Requiring outcome-oriented rubrics does **not** mean rubrics should only evaluate the final artifact, snapshot, or user-facing message. Intermediate logical decisions can also be outcome-oriented when they make a key contribution to fulfilling the prompt.

- **60–70%: Outcome and task-fulfillment accuracy**
  - Focus on whether the model successfully completes the user's task.
  - Relevant categories: Task Completion, Instruction Following, Factuality and Hallucination.
  - Relevant evaluation targets: State Change, User-Facing Message, Final Answer Artifact.

- **30–40%: Supporting reasoning, process, and trajectory**
  - Focus on the logical, outcome-oriented decisions the model makes along the way.
  - Include specific visual identifications required to reach the correct solution.
  - Include universe/context checks needed to gather the information required for the expected output.
  - Relevant categories: Agent Behavior, Tool Use, Safety and Boundaries.
  - Relevant evaluation target: Trajectory.`,
      },
      {
        id: "visual-understanding-weighting",
        title: "Visual understanding weighting",
        tag: "Rubrics",
        summary: "Explicit/direct visual identification is weight 5. Implicit or incidental images are weighted normally — don't inflate them.",
        body: `Increase how much of the overall rubric score depends on visual understanding. Our tasks should include enough complexity to require cross-modal reasoning with visual identification. When a rubric directly evaluates that visual identification, it should usually be weighted as a **5**. The spec now requires at least **40% visual understanding**.

### Implicit vs. explicit (direct) visual understanding

The weight-5 rule applies only when visual understanding is **explicit/direct**: the task cannot be completed correctly unless the model actually reasons over the image. When the visual content is merely **implicit** (present, attached, or referenced, but not load-bearing for the outcome), it should not be weighted as a 5.

The test to differentiate them:

> **Could the model fulfill the intent correctly without identifying what is in the image?**
> - **No** → the image is load-bearing → explicit/direct → weight 5.
> - **Yes** → the image is incidental → implicit → weight normally.

**Explicit / direct (weight 5)** — identifying, reading, counting, comparing, or locating something *in* the image is the actual work. Removing the visual identification breaks the task.
- "If the total on the attached invoice exceeds our record for that customer, email Brandon." → must read the total off the invoice.
- "Count the screws of each type in the structure photos and add the ones under 20 to the 'Low Units' tab." → must identify and count from the image.
- "Which of the three uploaded floor plans has the emergency exit closest to the stairwell?" → must interpret the plans.

**Implicit (weight normally)** — an image is involved, but success depends on something else (a file operation, a text instruction, metadata). The pixels are never interpreted.
- "Save \`kitchen.jpg\` to \`projects/2024/\` and rename it to \`kitchen-final.jpg\`." → pure file operation; contents never read.
- "Summarize this report." where the report contains a chart but the text alone answers the prompt → the chart is decorative to the outcome.
- "Attach the uploaded photo to the ticket and set its status to 'Resolved'." → the image is a payload, not something to understand.

> **Guardrail:** do not inflate a rubric to weight 5 just because an image is attached. Reserve the 5 for cases where extracting or identifying the visual information *is* the reasoning that fulfills the intent.

### Two explicit cases

**Case 1 — identify, then act on it elsewhere.** The model must identify a visual reference, cross-reference it with additional context, and then report or take the correct action.
- *Example:* "If the total of the attached invoice is over our internal records reference for that customer, send an email to Brandon. If it is not, just keep that total in memory so I can follow up on it in the next quarter report."
- Use an **Agent Behavior / Trajectory** rubric (weight 5) to evaluate whether the model identifies that the invoice total in \`invoice.pdf\` is "$80,000", which exceeds the internal record for "Plumbing Solutions" ($67,000) — this is where the core reasoning lives.
- The outcome rubric (sending the email, or recording the memory) can be weight 1, since the identification is already covered above.

**Case 2 — the identification *is* the artifact.** The same visual reference the model must identify is also the expected output or the basis of the expected artifact, so a separate identify + report pair would be redundant.
- *Example:* "Help me count the number of screws of each type present on the structure photos uploaded so we can compare them against inventory... Add the ones under 20 to the 'Low Units' tab within \`inventory_control.html\`."
- Use one **Instruction Following / Final Answer Artifact** rubric weighted as 5: "The model reports 'screw 1' as having 15 units in the 'Low Units' tab of \`inventory_control.html\`." The visual-identification complexity is nested inside the final-artifact rubric.

Anything that directly — not only implicitly — requires visual understanding should get a weight of 5.`,
      },
      {
        id: "exists-structure-checks",
        title: "“Exists” and “structure” checks",
        tag: "Rubrics",
        summary: "The two lowest-weight kinds of criteria: presence and shape checks belong in Unit Tests, and can never carry weight above 1.",
        body: `For reviewers: these should live in the Unit Tests, since they are structural parts of the intent.

These are the two lowest-weighted kinds of criteria a rubric can contain, and they should be de-emphasized: **no exists/structure check can carry a weight above 1.**

**"Exists" check** — confirms only that *something is present*, without judging whether it is correct.
- "A file named \`report.csv\` was created."
- "The response includes a table."
- "An email was sent to Brandon." (confirms it was sent, not that it should have been or said the right thing.)

**"Structure" check** (this should be Unit Test coverage in the review layer) — confirms the *shape or format* is right, without judging the content.
- "The \`interactive_dash.html\` table contains columns 'date', 'result' and 'notes'."
- "The invoice total is formatted as a dollar amount ('$80,000')."
- "The HTML page has a 'Low Units' tab."

Both answer *"is the container there / the right shape?"* — not *"is the answer actually correct?"* A model can satisfy them while getting the task completely wrong (e.g. a perfectly-formatted table full of hallucinated values). Because they capture almost no reasoning or task-fulfillment, they must not be weighted highly; the high weights are reserved for criteria that verify the substance — the correct value, the correct decision, or the correct visual identification.`,
      },
      {
        id: "self-containment",
        title: "Self containment",
        tag: "Rubrics",
        summary: "A rubric must be gradable from its own text alone. Two narrow exceptions exist — everything else is a Major failure.",
        body: `A rubric has to be possible to evaluate with the content of the rubric itself, nothing else. There are only two cases where sacrificing a little self-containment is justified:

- **Dynamic nature of the data being checked** — Amazon listing prices, web-search-specific results, specific days.
  - *"Give me in the final message the cheapest Amazon listing for each one of the matching products"* → The final user-facing message reports the price shown in the selected 'XPG CORE REACTOR II 850W Gold' Amazon listing (e.g., "$129.99").
- **Rubric implying a visual reference** — when a criterion must point at a specific uploaded image or file to be graded (e.g., "the invoice shown in \`invoice_0423.jpg\`"), naming the file is acceptable, since the grader has that file available; the rubric doesn't need to restate its pixel contents in words.

### Anti-pattern: the blanket rubric

From [openclaw-viewer-mm.vercel.app/attempt/6a32dce2238b8ac896b224cc](https://openclaw-viewer-mm.vercel.app/attempt/6a32dce2238b8ac896b224cc/#rubrics) (Photo QC / storefront audit task) — one criterion tries to cover every product at once, so its ground truth (which photo depicts which product, and the correct verdict for each) never fits inside the rubric text.

- **R1** — "Every Photo QC record with a PASS or EDIT verdict cites a photo_file that genuinely depicts that product, matching the product's appearance in the labeled walkthrough video; products for which no faithful still exists are recorded as RETAKE."
  - *For which product, and which photo_file is correct? What verdict does each product deserve — where does the grader get that ground truth?* → it lives in the walkthrough video + the images, not in the rubric. One general rubric "covering all the photos" can't be graded from its own content.
  - **Reframe:** one rubric **per product**, each naming the expected photo_file and verdict — e.g. "The Photo QC record for Baby Beanie – Solid Gray has verdict PASS, citing IMG_0489.jpg (the only square 2710×2710 still, sharp, accurate color)." Repeat per product.
- **R5** (borderline) — "Each verdict is judged against the four photo-quality standards in IMG_5050.jpg…" — the standards are inlined (good), but "each verdict" still needs the per-product ground truth. Keep the inlined standards; move the correctness check into the per-product rubrics.
- **R7** (borderline) — "The agent maps still photos to products by cross-referencing the walkthrough video's product labels rather than loose color/shape similarity." → gradable as a process check (did it consult the labels?), but the correct mapping itself is external. Fine as a process rubric; don't rely on it to verify the mapping is right.

### Anti-pattern: pushing the expected value into the environment

From [openclaw-viewer-mm.vercel.app/attempt/6a3f4946980f47b835c4062f](https://openclaw-viewer-mm.vercel.app/attempt/6a3f4946980f47b835c4062f/#rubrics) (Kiln & Co sponsored mockup task) — the tell: grading requires asking a question the rubric can't answer by itself.

- **R3** — "mockup.webm contains product segments for each received product registered in order KC-26-04182" → which products are registered? That answer lives in the database.
  - **Reframe:** "mockup.webm contains a product segment for each of the four received products: Stoneware Glaze Set, Underglaze Duo (Midnight Blue / Desert Sand), Studio Towels, and Sticker Pack." (This duplicates what R4 already does — so R3 was both non-self-contained *and* redundant.)
- **R6** — "mockup.webm uses each of the four verified uploaded images that match the four descriptions…" → which image maps to which product, and where do the four descriptions live? Both are external.
  - **Reframe:** name each pair explicitly (e.g. glazze.jpg → Stoneware Glaze Set, towl.jpeg → Studio Towels…), or split into one rubric per product–image pair (recommended).
- **R12** — "outline.docx contains a Google Maps link to the Virginia kiln address that is deduced from the file link_for_photos.docx" → "deduced from the file" outsources the deduction to the grader.
  - **Reframe:** "outline.docx contains a Google Maps link to 132 Church St NW, Vienna, VA (e.g., 'https://www.google.com/maps?q=132+Church+St+NW,+Vienna,+VA')."
- **R14** — "outline.docx contains grounded instructions… based on the retrieved requirement from the sponsor emails" → "the retrieved requirement" is never stated in the rubric.
  - **Reframe:** state it, e.g. "…instructions that reflect the sponsor's due date of [X] and drop/flag the expired coupon code [Y]."
- **R15** — "the agent sends a message to Lena addressing the context of the last registered messages" → requires opening Lena's chat history to grade.
  - **Reframe:** "…sends a message to Lena acknowledging the softbox / white-balance check from their prior conversation, or semantically equivalent."

> **⚠️ Self-containment is critical.** This has been a recurring issue since day one, and we can't afford to let it keep happening.
>
> Before submitting any task, always ask: **"Can this rubric be evaluated using only the information contained within the criterion itself, without relying on external sources?"**
>
> If yes, the rubric is self-contained (assuming it's also atomic). If no — unless a valid exception above applies — the rubric is **not self-contained**.
>
> Non-self-contained rubrics fall under **Fail – 10%+ Major Rubric Errors**. In practice, **having just two non-self-contained rubrics in a set of ~15–20 criteria is enough to fail the entire task.**`,
      },
      {
        id: "output-modality-diversity",
        title: "Output modality diversity",
        tag: "Scenario Design",
        summary: "95% of tasks default to handwritten-notes-into-CSV/PDF. Stop. Push cross-modal reasoning and richer output artifacts instead.",
        body: `95% of tasks default to the typical handwritten scenario producing a regular \`.csv\` / \`.pdf\` output. **Be creative.** The model can do far more than we're asking of it, and the complexity we actually want is nested in asking for *other* output types that require cross-modal reasoning across different MM inputs. **Stop using handwritten notes as the default way to make the model fail.**

The difficulty should come from **cross-modal reasoning** (extracting information from one modality, using it to act in another, then validating or continuing the workflow through a third — the richer and more interconnected the chain, the better) and from requiring **less common output artifacts**, **not** from making the inputs themselves harder to read (e.g., worse handwriting).

The full inventory of what \`claude-opus-4-6\` can reliably read and produce lives in the [model capability table on the home page](/#capabilities) — use it as a reference. The design principle that follows from it:

> The challenge should come from coordinating information across modalities and producing complex workflows — not from making the inputs artificially difficult to read.

**How to use this when authoring:**
- Pair an input modality with a *different* output modality (read a chart → write a spreadsheet; read a video → produce a slide; read invoices → send an email). The reasoning that bridges the two is where the difficulty — and the weight-5 visual rubric — should live.
- Prefer the richer artifact when the scenario allows (\`.pptx\` / \`.xlsx\` / rendered chart / \`.webm\`) over a plain \`.csv\` / \`.pdf\` dump.
- Keep the visual identification load-bearing (see **Visual understanding weighting**) so the task genuinely can't be solved text-only.

> Examples of genuine complexity beyond handwritten notes live in the [Golden Task Viewer](/tasks). Scenarios 2 and 3 there use handwritten notes as just one component of a broader workflow, not the primary source of difficulty — the handwriting supports the intent rather than acting as a shortcut or "trap."

### Scenario idea 1 — Zoe's reading, writing, and math

*Zoe is about to start 1st grade, and I am a bit concerned about her reading, writing, and math and I want to create something interactive that can help her catch up and start school feeling confident.*

*Help me create \`zoe_learns.html\` using the notes Keisha put together from her meeting with Ms. Carter, the exercises I have selected to include, and the uploaded layout requirements. Focus only on exercises that apply to Zoe's gaps — any other exercise has to be discarded and referenced into MEMORY.md.*

*Also, since I want us to be strict about tracking her progress before school starts on August 14, please create a calendar event series for Keisha and me from tomorrow until then — every 2 days, Monday through Saturday, with Sundays treated as off days.*

**Why this represents genuine complexity:**
- Cross-modal reasoning across 3 sources: parent-teacher notes (PDF/DOCX/TXT) identifying gaps → the selected exercises (photos, screenshots, videos, handwritten worksheets) → filtering for what's actually appropriate for a 6-year-old entering 1st grade.
- Filtering and discarding: matching exercises go in the output; non-matching ones get documented in \`MEMORY.md\`.
- A specific final artifact: a polished \`zoe_learns.html\` following the uploaded \`layout.md\` requirements.
- An additional state/action outcome: a calendar series for Keisha and the parent, every 2 days, Monday–Saturday only, from tomorrow until August 14, with Sundays as off days.

### Scenario idea 2 — Milek's backyard irrigation timeline

*I got my drip irrigation kit and I'm about to install it. Before setting it up, I want to document the current state of my backyard, including all the plants and everything else I currently have, so I can track how things evolve over the next few months.*

*Based on the uploaded content, create a \`backyard_timeline.svg\` that visually documents the current state and serves as a six-month progress tracker starting now, following the exact layout/design specs I'll upload. Use the uploaded backyard inventory as the baseline, include one milestone per month, group tracked plants and areas into clearly labeled sections, and leave placeholders for future updates and comparison notes.*

*Once the SVG is complete, set up a recurring reminder every Friday of the last week of each month (starting today) with a title including "backyard progress," and include Terrence on the event.*

**Why this represents genuine complexity:**
- Cross-modal reasoning across multiple sources: current inventory (photos/screenshots/list) → design specs determining grouping/labeling → what counts as a "milestone" for each month given the baseline.
- Filtering and organizing: plants/areas grouped into labeled sections, not a flat list; placeholders structurally present, not just implied.
- A specific final artifact: \`backyard_timeline.svg\` following the uploaded layout exactly, with one milestone per month.
- An additional state/action outcome: a recurring reminder for the last Friday of each month, six months, title including "backyard progress" (or equivalent), with Terrence included.`,
      },
      {
        id: "decoys-noise",
        title: "Decoys / noise in the multimodal input",
        tag: "Scenario Design",
        summary: "Friction points must be deliberate, resolvable from the given materials, and always graded — never random clutter.",
        body: `A robust task shouldn't fail the model only because the scenario is genuinely complex — it should also precisely place **friction points**: pieces of input that look plausible or relevant but are the wrong answer, so the model has to actively verify rather than pattern-match the first thing that fits. This is deliberate, minutious design work, not random clutter — every task in the [Golden Task Viewer](/tasks) has a section dedicated to exactly this, explaining how friction was worked into that specific scenario in a realistic way.

### What counts as a decoy

- **Distractor visual** — an uploaded image that resembles the target but isn't it (wrong angle, wrong color variant, wrong product, an older photo of the same subject). The model must select the *correct* one, not just *a* plausible one.
- **Distractor record** — a stale or superseded piece of data sitting alongside the current one (last quarter's price list next to this quarter's, an old address on file next to a newer one).
- **Distractor communication** — an irrelevant email/message thread in the same inbox or channel as the one that matters, which the model must correctly ignore.
- **Near-duplicate identity** — two people, products, or IDs with very similar names (two "Jordan"s, two SKUs one digit apart) that must be disambiguated using context, not guessed.
- **Red herring instruction or note** — a plausible-sounding note (a handwritten comment, an old to-do) that implies an action the rest of the context contradicts once cross-checked.

### Design principles

- **A decoy must be resolvable from the provided materials alone.** If disambiguating it requires information nowhere in the task's universe, it isn't a decoy — it's an unfair or broken task. Same standard as **Self containment**: the correct disambiguation has to be groundable in what's given.
- **Every decoy needs a rubric that actually checks it was avoided.** A friction point that isn't graded is wasted complexity — write a rubric that fails the model if it falls for the trap (e.g., "the email does not mention the Virginia address" is precisely this: it verifies a decoy was *not* acted on).
- **Don't over-stack.** Too many simultaneous decoys can bury the genuine complexity of the scenario and turn the task into a noise-filtering exercise instead of a reasoning one. Friction should sit *alongside* the real cross-modal reasoning chain, not replace it.
- **A decoy tests judgment, not alertness to formatting.** It should force a real decision between two plausible options — it is not the same thing as an "exists/structure" trap, which only tests whether the model noticed a container exists.

### Where to place decoys across modalities

- **Visual** — a similar-but-wrong image mixed among several uploaded photos or video frames.
- **Textual/data** — an outdated or conflicting record living in the same document, spreadsheet, or database table as the current one.
- **Temporal** — a timestamp or event that superficially matches the ask but falls outside the actually-requested window.
- **Identity** — near-duplicate names, emails, or IDs that require correct matching, not just presence-checking.

### Applying this to the Zoe and Milek scenarios

**Zoe:**
- Among the uploaded exercises, include one or two that target a skill Zoe's notes say she's *already* mastered (e.g. shape recognition, when the actual gaps are reading and math) — the model must correctly discard it into \`MEMORY.md\`, exactly as the prompt already asks.
- Two versions of the same worksheet with near-identical filenames (\`addition_practice_draft.pdf\` vs \`addition_practice_final.pdf\`), where only the final one reflects the actual recommendation — the model must use the current one, not just the first match.
- Different-level exercises inappropriate for a 6-year-old (multiplication worksheets, advanced grammar analysis) that must be filtered out even if otherwise well made.
- Calendar edge cases: the series must run six months from now (excluding the current month), every 2 days, Monday–Saturday only, with Sundays treated as off days rather than counting toward the interval.

**Milek:**
- An older backyard inventory list (from before some plants were removed or replaced) included alongside the current photos — the SVG baseline must reflect the *current* state shown in the photos, not the stale list.
- MM inputs referencing parts of the garden unrelated to irrigation (decorative elements, tables, figures) that shouldn't shape the baseline.
- Calendar edge cases: start tomorrow, run until August 14, every 2 days, Monday–Saturday only, Sundays never counting toward the interval (e.g. if the previous event is Saturday, the next is Monday, not Tuesday).

> **Guardrail:** friction has to earn its place in the scenario — if a decoy only makes sense because the task author inserted it, not because a real person's files would plausibly look that way, it's contrived. Every decoy above works because it's the kind of mess that shows up naturally (outdated files, near-duplicate filenames, calendars that already have things on them) — not an artificial trap dropped in just to catch the model.`,
      },
    ],
  },
];
