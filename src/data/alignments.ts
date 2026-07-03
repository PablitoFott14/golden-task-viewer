/**
 * Urgent Alignments — the standards the client has asked contributors to adopt,
 * transcribed from the root `latest_alignments.md`. Grouped into dated batches
 * so new alignments can be appended over time without losing the history of
 * what changed and when. Keep this in sync with `latest_alignments.md`.
 *
 * Each topic's `impact` states the actual change or new expectation in one
 * sentence; the `body` is Markdown rendered with the shared `prose-task`
 * treatment. `kind` drives the visual grouping on the page:
 *   rule      = failing a task outright if violated
 *   weighting = a change to how criteria must be weighted
 *   guidance  = a directive about how scenarios should be designed
 */

export type AlignmentKind = "rule" | "weighting" | "guidance";

export interface AlignmentTopic {
  id: string;
  title: string;
  kind: AlignmentKind;
  tag: string;
  impact: string;
  summary: string;
  body: string;
}

export interface AlignmentUpdate {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  topics: AlignmentTopic[];
}

export const alignmentUpdates: AlignmentUpdate[] = [
  {
    id: "2026-07-03",
    date: "2026-07-03",
    dateLabel: "03 Jul 2026",
    title: "Rubric weighting and visual reasoning standards tightened",
    summary:
      "Outcome criteria must now carry 60 to 70 percent of the rubric weight. Direct visual identification becomes a weight-5 check and must cover at least 40 percent of the score. Presence and format checks are capped at weight 1. Self-containment is enforced as a fail-level rule. Scenario design moves away from handwritten notes toward richer cross-modal outputs with deliberately planted, graded decoys.",
    topics: [
      {
        id: "weight-distribution",
        title: "Outcome criteria must carry 60–70% of the rubric weight",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "New split: criteria that verify the outcome and task fulfillment must account for 60 to 70 percent of total rubric weight, with the remaining 30 to 40 percent on supporting reasoning and trajectory.",
        summary:
          "A fixed weight distribution now applies to every rubric set, and intermediate logical decisions still count as outcome-oriented when they are key to fulfilling the prompt.",
        body: `Requiring outcome-oriented rubrics does not mean that rubrics may only evaluate the final artifact, snapshot, or user-facing message. An intermediate logical decision also counts as outcome-oriented when it makes a key contribution to fulfilling the prompt.

### 60–70%: outcome and task-fulfillment accuracy

The majority of the weight verifies that the model actually completed the user's task. Criteria in this band typically fall under **Task Completion**, **Instruction Following**, or **Factuality and Hallucination**, and they evaluate the **State Change**, the **User-Facing Message**, or the **Final Answer Artifact**.

### 30–40%: supporting reasoning, process, and trajectory

The remaining weight covers the logical, outcome-oriented decisions the model makes along the way. This includes the specific visual identifications required to reach the correct solution, and the universe or context checks needed to gather the information the expected output depends on. Criteria in this band typically fall under **Agent Behavior**, **Tool Use**, or **Safety and Boundaries**, and they evaluate the **Trajectory**.`,
      },
      {
        id: "visual-understanding-weighting",
        title: "Direct visual identification is now a weight-5 check",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "Any criterion that directly evaluates a load-bearing visual identification must be weighted 5, and the spec now requires visual understanding to account for at least 40 percent of the rubric score.",
        summary:
          "Explicit visual reasoning gets the top weight. Images that are merely attached but never interpreted are weighted normally, and inflating them is explicitly forbidden.",
        body: `More of the overall rubric score must depend on visual understanding. Tasks should include enough complexity to require cross-modal reasoning with visual identification, and when a rubric directly evaluates that identification it should usually be weighted as a **5**. The spec has been updated to require at least **40% visual understanding**.

### Explicit versus implicit visual understanding

The weight-5 rule applies only when visual understanding is **explicit and direct**, meaning the task cannot be completed correctly unless the model actually reasons over the image. When the visual content is merely **implicit** (present, attached, or referenced, but not load-bearing for the outcome), it is weighted normally.

The test that separates the two:

> **Could the model fulfill the intent correctly without identifying what is in the image?**
>
> If **no**, the image is load-bearing, the visual understanding is explicit, and the criterion gets weight 5. If **yes**, the image is incidental and the criterion is weighted normally.

**Explicit and direct (weight 5).** Identifying, reading, counting, comparing, or locating something *in* the image is the actual work, and removing the visual identification breaks the task.

- "If the total on the attached invoice exceeds our record for that customer, email Brandon." The model must read the total off the invoice.
- "Count the screws of each type in the structure photos and add the ones under 20 to the 'Low Units' tab." The model must identify and count from the image.
- "Which of the three uploaded floor plans has the emergency exit closest to the stairwell?" The model must interpret the plans.

**Implicit (weight normally).** An image is involved, but success depends on something else, such as a file operation, a text instruction, or metadata. The pixels are never interpreted.

- "Save \`kitchen.jpg\` to \`projects/2024/\` and rename it to \`kitchen-final.jpg\`." A pure file operation; the contents are never read.
- "Summarize this report," where the report contains a chart but the text alone answers the prompt. The chart is decorative to the outcome.
- "Attach the uploaded photo to the ticket and set its status to 'Resolved'." The image is a payload, not something to understand.

> **Guardrail:** do not inflate a rubric to weight 5 just because an image is attached. Reserve the 5 for cases where extracting or identifying the visual information *is* the reasoning that fulfills the intent.

### The two explicit cases and how to weight them

**Case 1: the model identifies a visual reference, then acts on it elsewhere.** It must cross-reference the identification with additional context and then report or take the correct action.

For example: "If the total of the attached invoice is over our internal records reference for that customer, send an email to Brandon. If it is not, just keep that total in memory so I can follow up on it in the next quarter report."

Here, an **Agent Behavior / Trajectory** rubric evaluates whether the model identifies that the invoice total in \`invoice.pdf\` is "$80,000", which exceeds the internal record for "Plumbing Solutions" ($67,000). That rubric gets a weight of 5, because all the core reasoning and complexity needed to fulfill that part of the intent lives in it. A separate **Final Answer / Artifact** rubric evaluates whether the final state change or message is appropriate, and it can get a weight of 1, since the identification is already covered.

**Case 2: the visual identification is itself the expected output.** The same visual reference the model must identify is also the expected artifact or its basis, so writing one rubric to identify and another to report would be redundant.

For example: "Help me count the number of screws of each type present on the structure photos uploaded so we can compare them against inventory. Add the ones under 20 to the 'Low Units' tab within \`inventory_control.html\`."

Here a single **Instruction Following / Final Answer Artifact** rubric weighted 5 covers it: "The model reports 'screw 1' as having 15 units in the 'Low Units' tab of \`inventory_control.html\`." The complexity of the visual identification is nested inside the final-artifact rubric.

Anything that directly, not only implicitly, requires visual understanding should get a weight of 5.`,
      },
      {
        id: "exists-structure-checks",
        title: "“Exists” and “structure” checks are capped at weight 1",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "No presence or format check may carry a weight above 1, and for reviewers these checks belong in the unit tests rather than the rubric.",
        summary:
          "Checks that only confirm something is present, or that its shape is right, capture almost no reasoning and must stay at the bottom of the weight scale.",
        body: `These are the two lowest-weighted kinds of criteria a rubric can contain, and they should be de-emphasized: **no exists or structure check can carry a weight above 1.** For reviewers, they belong in the Unit Tests, since they cover structural parts of the intent.

An **"exists" check** confirms only that *something is present*, without judging whether it is correct.

- "A file named \`report.csv\` was created."
- "The response includes a table."
- "An email was sent to Brandon." This confirms it was sent, not that it should have been sent or said the right thing.

A **"structure" check** confirms the *shape or format* is right, without judging the content. In the review layer this should be Unit Test coverage.

- "The \`interactive_dash.html\` table contains columns 'date', 'result' and 'notes'."
- "The invoice total is formatted as a dollar amount ('$80,000')."
- "The HTML page has a 'Low Units' tab."

Both kinds answer *"is the container there, and is it the right shape?"* rather than *"is the answer actually correct?"* A model can satisfy them while getting the task completely wrong, for instance by producing a perfectly formatted table full of hallucinated values. Because they capture almost no reasoning or task fulfillment, they must not be weighted highly. The high weights are reserved for criteria that verify the substance: the correct value, the correct decision, or the correct visual identification.`,
      },
      {
        id: "self-containment",
        title: "Self-containment is enforced as a fail-level rule",
        kind: "rule",
        tag: "Rubric Quality",
        impact:
          "Non-self-contained rubrics count as Major Rubric Errors, so just two of them in a typical set of 15 to 20 criteria are enough to fail the entire task.",
        summary:
          "Every criterion must be gradable from its own text alone. Only two narrow exceptions exist, and recent audited tasks show exactly how violations look in practice.",
        body: `A rubric has to be possible to evaluate with the content of the rubric itself, nothing else. There are only two cases where sacrificing a little self-containment is justified:

1. **The data being checked is dynamic by nature**, such as Amazon listing prices, web search results, or specific days. Example: for "Give me in the final message the cheapest Amazon listing for each one of the matching products," a valid criterion is "The final user-facing message reports the price shown in the selected 'XPG CORE REACTOR II 850W Gold' Amazon listing (e.g., '$129.99')."
2. **The rubric implies a visual reference.** When a criterion must point at a specific uploaded image or file to be graded, naming the file is acceptable, since the grader has it available.

### Anti-pattern one: the blanket rubric

Seen in the [Photo QC / storefront audit task](https://openclaw-viewer-mm.vercel.app/attempt/6a32dce2238b8ac896b224cc/#rubrics). One criterion tries to cover every product at once, so its ground truth (which photo depicts which product, and the correct verdict for each) never fits inside the rubric text.

- **R1**: "Every Photo QC record with a PASS or EDIT verdict cites a photo_file that genuinely depicts that product, matching the product's appearance in the labeled walkthrough video; products for which no faithful still exists are recorded as RETAKE." For which product, and which photo_file is the correct one for each? Where does the grader get the photo-to-product ground truth? It lives in the walkthrough video and the images, not in the rubric. The fix is one rubric **per product**, each naming the expected photo_file and verdict, exactly what R3 in that task already does: "The Photo QC record for Baby Beanie – Solid Gray has verdict PASS, citing IMG_0489.jpg (the only square 2710×2710 still, sharp, accurate color)."
- **R5** (borderline): "Each verdict is judged against the four photo-quality standards in IMG_5050.jpg (color accuracy, square crop with ≥15px margin, subject fully in frame, no motion blur)." The standards themselves are inlined, which is good, but "each verdict" still needs the per-product ground truth. Keep the inlined standards and move the correctness check into the per-product rubrics.
- **R7** (borderline): "The agent maps still photos to products by cross-referencing the walkthrough video's product labels rather than loose color/shape similarity." This is gradable as a process check (did the agent consult the labels?), but the correct mapping itself is external. It is fine as a process rubric, but it cannot be relied on to verify the mapping is right.

### Anti-pattern two: pushing the expected value into the environment

Seen in the [Kiln & Co sponsored mockup task](https://openclaw-viewer-mm.vercel.app/attempt/6a3f4946980f47b835c4062f/#rubrics). The tell is that grading requires asking a question the rubric can't answer by itself.

- **R3**: "mockup.webm contains product segments for each received product registered in order KC-26-04182." Which products are registered in that order? The answer lives in the database. Reframed: "mockup.webm contains a product segment for each of the four received products: Stoneware Glaze Set, Underglaze Duo (Midnight Blue / Desert Sand), Studio Towels, and Sticker Pack." That reframe duplicates what R4 already does, so R3 was both non-self-contained and redundant.
- **R6**: "mockup.webm uses each of the four verified uploaded images that match the four descriptions, or semantically equivalent images matching each of the four sponsored products." Which uploaded image maps to which product, and where do the four descriptions live? Both are external. Reframed: name each pair explicitly (glazze.jpg for the Stoneware Glaze Set, towl.jpeg for the Studio Towels, and so on), or split into one rubric per product-image pair, which is the recommended shape.
- **R12**: "outline.docx contains a Google Maps link to the Virginia kiln address that is deduced from the file link_for_photos.docx." Saying "deduced from the file" outsources the deduction to the grader. Reframed: "outline.docx contains a Google Maps link to 132 Church St NW, Vienna, VA (e.g., 'https://www.google.com/maps?q=132+Church+St+NW,+Vienna,+VA')."
- **R14**: "outline.docx contains grounded instructions for the professional editor based on the retrieved requirement from the sponsor emails or from messages with Lena or Drew." The requirement is never stated in the rubric; the rationale mentions a due date and an expired coupon code, but neither made it into the criterion. Reframed: state them, as in "instructions that reflect the sponsor's due date of [X] and drop or flag the expired coupon code [Y]."
- **R15**: "the agent sends a message to Lena addressing the context of the last registered messages." Grading this requires opening Lena's chat history. Reframed: "sends a message to Lena acknowledging the softbox / white-balance check from their prior conversation, or semantically equivalent."

### The bar you are held to

> **Self-containment is critical.** This has been a recurring issue since day one of the project, and it can't keep happening.
>
> Before submitting any task, always ask: **"Can this rubric be evaluated using only the information contained within the criterion itself, without relying on external sources?"**
>
> If yes, the rubric is self-contained (assuming it is also atomic). If no, then unless one of the two exceptions above applies, the rubric is **not self-contained**.
>
> Non-self-contained rubrics fall under **Fail – 10%+ Major Rubric Errors**. In practice, having just **two** non-self-contained rubrics in a set of around 15–20 criteria is enough for the **entire task to fail**.`,
      },
      {
        id: "output-modality-diversity",
        title: "Handwritten-note scenarios must give way to richer outputs",
        kind: "guidance",
        tag: "Scenario Design",
        impact:
          "Difficulty must come from cross-modal workflows and less common output artifacts, not from hard-to-read inputs. The handwritten-notes-into-CSV pattern is no longer acceptable as the default failure mechanism.",
        summary:
          "Around 95 percent of submitted tasks funnel handwriting into a plain CSV or PDF. The client expects creative use of the model's full output range instead, with two worked scenarios as reference.",
        body: `Around 95% of tasks follow the typical handwritten scenario that produces a regular \`.csv\` or \`.pdf\` output. **Be creative.** The model can do far more than we are asking of it, and the complexity the client wants lives in requesting other kinds of outputs that force cross-modal reasoning across different multimodal inputs. **Stop using handwritten notes as the default way to make the model fail.**

The difficulty should come from **cross-modal reasoning**, meaning the model extracts information from one modality, uses it to act in another, and then validates or continues the workflow through a third. The richer and more interconnected the chain, the better. Difficulty should also come from requiring **less common output artifacts**, never from making the inputs themselves harder to read, such as with more challenging handwriting.

The full inventory of what \`claude-opus-4-6\` can reliably read and produce is kept in the [model capability table on the home page](/#capabilities). Use it to design tasks that push toward the upper end of those capabilities. The design principle that follows from it:

> The challenge should come from coordinating information across modalities and producing complex workflows, not from making the inputs artificially difficult to read.

When authoring, pair an input modality with a *different* output modality: read a chart and write a spreadsheet, read a video and produce a slide, read invoices and send an email. The reasoning that bridges the two is where the difficulty, and the weight-5 visual rubric, should live. Prefer the richer artifact whenever the scenario allows it (\`.pptx\`, \`.xlsx\`, a rendered chart, \`.webm\`) over a plain \`.csv\` or \`.pdf\` dump, and use state changes (emails sent, databases updated, calendar events created, files organized, project memory updated) to add a realistic extra reasoning layer. Keep the visual identification load-bearing so the task genuinely cannot be solved text-only.

Handwritten notes are still welcome as *one component* of a broader workflow. Scenarios 2 and 3 in the [Golden Tasks library](/tasks) show this balance: the handwritten content supports the overall intent instead of serving as the sole challenge or a trap.

### Reference scenario 1: Zoe's school prep

*"Zoe is about to start 1st grade, and I am a bit concerned about her reading, writing, and math, and I want to create something interactive that can help her catch up and start school feeling confident. Help me create \`zoe_learns.html\` using the notes Keisha put together from her meeting with Ms. Carter, the exercises I have selected to include, and the uploaded layout requirements. Focus only on exercises that apply to Zoe's gaps; any other has to be discarded and referenced into MEMORY.md. Also, since I want us to be very strict about tracking her progress before she starts school on August 14, please create a calendar event series for Keisha and me from tomorrow until then, every 2 days across Monday through Saturday, with Sundays treated as off days."*

This carries genuine complexity because it demands cross-modal reasoning over three sources: the parent-teacher notes (a PDF, DOCX, or TXT) identify Zoe's gaps, the selected exercises arrive as photos, screenshots, videos, or handwritten worksheets, and the model must judge which exercises actually suit a 6-year-old entering 1st grade. It also requires filtering with a paper trail (matching exercises go into the page, discarded ones into \`MEMORY.md\`), a polished \`zoe_learns.html\` artifact that follows the uploaded \`layout.md\`, and a calendar series with a non-trivial schedule rule.

### Reference scenario 2: Milek's backyard timeline

*"I got my drip irrigation kit and I'm about to install it. Before setting it up, I want to document the current state of my backyard, including all the plants and the rest of the things I currently have, so I can track how everything evolves over the next few months. Based on the uploaded content, please create a \`backyard_timeline.svg\` that visually documents the current state and serves as a six-month progress tracker starting from now. I'll upload the exact layout and design specifications I want as part of the context. The SVG should use the uploaded backyard inventory as the baseline, include one milestone for each month, group the tracked plants and backyard areas into clearly labeled sections, and leave dedicated placeholders for future progress updates and comparison notes. Once the SVG is complete, set up a recurring reminder every Friday of the last week of each month (starting today) so I can update it with the latest progress. Any reminder title that includes the words 'backyard progress' works. Include Terrence in the event as well."*

This one demands reconciling the current inventory (photos, screenshots, or a written list) against the uploaded design specifications, deciding what counts as a milestone for each of the six months, grouping plants and areas into labeled sections rather than a flat list, and producing an uncommon artifact, an SVG that follows the layout spec exactly, plus a recurring reminder with a naming constraint and a second attendee.`,
      },
      {
        id: "decoys-noise",
        title: "Every scenario needs deliberate, graded friction points",
        kind: "guidance",
        tag: "Scenario Design",
        impact:
          "Tasks are expected to plant decoys that are resolvable from the provided materials, and every decoy must be paired with a rubric that verifies the model avoided it.",
        summary:
          "Plausible-but-wrong inputs force the model to verify instead of pattern-match. The client defines what counts as a decoy, how to place one fairly, and how the reference scenarios apply it.",
        body: `A robust task shouldn't fail the model only because the scenario is genuinely complex. It should also precisely place **friction points**: pieces of input that look plausible or relevant but are the wrong answer, so the model has to actively verify rather than pattern-match the first thing that fits. This is deliberate, minutious design work, not random clutter. Every task in the [Golden Tasks library](/tasks) has a section dedicated to exactly this, explaining how friction was worked into that scenario in a realistic way.

### What counts as a decoy

- **Distractor visual.** An uploaded image that resembles the target but isn't it: wrong angle, wrong color variant, wrong product, or an older photo of the same subject. The model must select the *correct* one, not just *a* plausible one.
- **Distractor record.** A stale or superseded piece of data sitting alongside the current one, such as last quarter's price list next to this quarter's, or an old address on file next to a newer one.
- **Distractor communication.** An irrelevant email or message thread living in the same inbox or channel as the one that matters, which the model must correctly ignore rather than act on.
- **Near-duplicate identity.** Two people, products, or IDs with very similar names (two "Jordan"s, two SKUs one digit apart) that must be disambiguated using context, not guessed.
- **Red herring instruction.** A plausible-sounding note, like a handwritten comment or an old to-do, that implies an action the rest of the context contradicts once cross-checked.

### The rules for placing one

**A decoy must be resolvable from the provided materials alone.** If disambiguating it requires information nowhere in the task's universe, it isn't a decoy, it's an unfair or broken task. This is the same standard as self-containment: the correct disambiguation has to be groundable in what's given.

**Every decoy needs a rubric that actually checks it was avoided.** A friction point that isn't graded is wasted complexity. Write a rubric that fails the model if it falls for the trap; a criterion like "the email does not mention the Virginia address" is precisely this, verifying a decoy was *not* acted on.

**Don't over-stack.** Too many simultaneous decoys bury the genuine complexity of the scenario and turn the task into a noise-filtering exercise instead of a reasoning one. Friction should sit *alongside* the real cross-modal reasoning chain, not replace it.

**A decoy tests judgment, not alertness to formatting.** It should force a real decision between two plausible options. It is not the same thing as an exists/structure trap, which only tests whether the model noticed a container exists.

Decoys can live in any modality: a similar-but-wrong image among several uploaded photos, an outdated record in the same spreadsheet as the current one, a timestamp that superficially matches the ask but falls outside the requested window, or near-duplicate names and IDs that require correct matching rather than presence-checking.

### Applied to the reference scenarios

For **Zoe**, natural friction includes an exercise targeting a skill her notes say she has already mastered (shape recognition, when the actual gaps are reading and math), which the model must correctly discard into \`MEMORY.md\`; two versions of the same worksheet with near-identical filenames (\`addition_practice_draft.pdf\` versus \`addition_practice_final.pdf\`) where only the final one reflects the teacher's recommendation; exercises pitched at the wrong level for a 6-year-old, such as multiplication worksheets, that must be filtered out even though they are otherwise well made; and the calendar rule itself, where Sundays never count toward the 2-day interval, so a Saturday event is followed by Monday, not Tuesday.

For **Milek**, it includes an older backyard inventory list from before some plants were removed, included alongside the current photos, where the SVG baseline must reflect the *current* state shown in the photos rather than the stale list; inputs referencing parts of the garden unrelated to irrigation, such as decorative elements and furniture, that should not shape the baseline; and the same off-day calendar edge case.

> **Guardrail:** friction has to earn its place in the scenario. If a decoy only makes sense because the task author inserted it, not because a real person's files would plausibly look that way, it is contrived. Outdated files, near-duplicate filenames, and calendars that already have things on them all work because that mess shows up naturally in real life.`,
      },
    ],
  },
];

export const latestAlignmentUpdate = alignmentUpdates[0];
