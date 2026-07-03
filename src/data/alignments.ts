/**
 * Urgent Alignments: the standards the client has asked contributors to adopt,
 * transcribed from the root `latest_alignments.md`. Grouped into dated batches
 * so new alignments can be appended over time without losing the history of
 * what changed and when. Keep this in sync with `latest_alignments.md`.
 */

export type AlignmentKind = "rule" | "weighting" | "guidance";

export interface AlignmentScenario {
  title: string;
  prompt: string;
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
    title: "Rubric weighting and visual reasoning standards tightened",
    summary:
      "Outcome criteria must now carry 60 to 70 percent of the rubric weight. Direct visual identification becomes a weight-5 check and must cover at least 40 percent of the score. Presence and format checks are capped at weight 1. Self-containment is enforced as a fail-level rule. Scenario design moves away from handwritten notes toward richer cross-modal outputs with deliberately planted, graded decoys.",
    logSummary:
      "Rubric weights, visual checks, self-containment, richer outputs, and graded decoys.",
    topics: [
      {
        id: "weight-distribution",
        title: "Outcome criteria must carry 60 to 70% of the rubric weight",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "Criteria that verify the outcome and task fulfillment must account for 60 to 70 percent of the total rubric weight, with 30 to 40 percent left for supporting reasoning and trajectory.",
        summary:
          "The rubric should mostly grade whether the task was actually completed, while still leaving room for the reasoning steps that make the outcome possible.",
        body: `Use this split when designing the rubric:

- **60 to 70%: outcome and task-fulfillment accuracy**
- **30 to 40%: supporting reasoning, process, and trajectory**

### What belongs in the 60 to 70% band

This is the majority of the score. It verifies that the model completed the user's task.

Use this band for criteria that check:

- the final state change
- the user-facing message
- the final answer artifact
- the specific outcome the prompt asked for

These criteria usually sit under **Task Completion**, **Instruction Following**, or **Factuality and Hallucination**.

### What belongs in the 30 to 40% band

This part covers reasoning that is necessary for the outcome, even when it happens before the final artifact.

Use this band for criteria that check:

- key logical decisions made along the way
- visual identifications required to reach the answer
- universe or context checks needed to gather the right information
- tool or safety decisions that affect the outcome

These criteria usually sit under **Agent Behavior**, **Tool Use**, or **Safety and Boundaries**.

### Important distinction

Outcome-oriented does not mean "final artifact only." An intermediate decision counts when it materially helps fulfill the prompt.`,
      },
      {
        id: "visual-understanding-weighting",
        title: "Direct visual identification is now a weight-5 check",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "Any criterion that directly evaluates a load-bearing visual identification must be weighted 5, and visual understanding must account for at least 40 percent of the rubric score.",
        summary:
          "When the task cannot be solved without interpreting the image, the visual identification carries top weight. Incidental images should not be inflated.",
        body: `Visual understanding must carry more of the overall rubric score. The current expectation is:

- direct, load-bearing visual identification should usually be **weight 5**
- visual understanding should make up at least **40%** of the rubric score
- an image should not be inflated just because it is attached

### The test

Ask this question:

> Could the model fulfill the intent correctly without identifying what is in the image?

If the answer is **no**, the image is load-bearing. The criterion should be weighted 5.

If the answer is **yes**, the image is incidental. Weight it normally.

### Explicit visual understanding

This is weight 5 because the image is the work.

Examples:

- read the total from an attached invoice before deciding whether to email Brandon
- count screw types in structure photos before updating the "Low Units" tab
- compare uploaded floor plans to find the emergency exit closest to the stairwell

### Implicit visual content

This is weighted normally because the pixels are not load-bearing.

Examples:

- save \`kitchen.jpg\` to a folder and rename it
- summarize a report where the text alone answers the prompt, even if a chart is present
- attach a photo to a ticket without interpreting the image

### Two valid rubric shapes

**1. Identify visually, then act elsewhere.**

Use an **Agent Behavior / Trajectory** rubric weighted 5 for the visual identification. A separate final-action rubric can be lower weight when it only checks that the correct action followed.

Example: the model identifies that \`invoice.pdf\` shows "$80,000", compares it with the internal record for "Plumbing Solutions" at "$67,000", then decides whether to email Brandon.

**2. The visual identification is the expected output.**

Use one **Instruction Following / Final Answer Artifact** rubric weighted 5. Do not split the same visual answer into duplicate rubrics.

Example: the model reports that "screw 1" has 15 units in the "Low Units" tab of \`inventory_control.html\`.

### Guardrail

Reserve weight 5 for cases where extracting or identifying the visual information is part of fulfilling the intent.`,
      },
      {
        id: "exists-structure-checks",
        title: "Exists and structure checks are capped at weight 1",
        kind: "weighting",
        tag: "Rubric Weighting",
        impact:
          "No presence or format check may carry a weight above 1. For reviewers, these checks usually belong in unit tests rather than in the rubric.",
        summary:
          "Presence and shape checks catch whether a container exists, not whether the task was actually solved.",
        body: `These are the lowest-weighted kinds of checks:

- **exists checks**
- **structure checks**

They must not carry weight above 1.

### Exists checks

An exists check only confirms that something is present.

Examples:

- a file named \`report.csv\` was created
- the response includes a table
- an email was sent to Brandon

These do not prove the output is correct. They only prove the container exists.

### Structure checks

A structure check only confirms format or shape.

Examples:

- \`interactive_dash.html\` contains columns named \`date\`, \`result\`, and \`notes\`
- the invoice total is formatted as a dollar amount, such as "$80,000"
- the HTML page has a "Low Units" tab

### Why the cap matters

A model can pass these checks while still getting the task wrong. It might create a valid table full of hallucinated values, or send an email that should not have been sent.

High weights are reserved for criteria that verify substance:

- the correct value
- the correct decision
- the correct visual identification
- the correct task outcome`,
      },
      {
        id: "self-containment",
        title: "Self-containment is enforced as a fail-level rule",
        kind: "rule",
        tag: "Rubric Quality",
        impact:
          "Non-self-contained rubrics count as Major Rubric Errors. In a typical set of 15 to 20 criteria, just two can be enough to fail the entire task.",
        summary:
          "Every criterion must be gradable from its own text alone unless it falls into one of two narrow exceptions.",
        body: `A rubric must be evaluable from the criterion text itself.

Before submitting, ask:

> Can this rubric be evaluated using only the information contained in the criterion itself, without relying on external sources?

If the answer is no, the criterion is not self-contained unless one of the exceptions below applies.

### Allowed exceptions

**1. Dynamic data**

Some values naturally change, such as Amazon listing prices, web search results, or date-sensitive information.

Valid shape:

- "The final user-facing message reports the price shown in the selected 'XPG CORE REACTOR II 850W Gold' Amazon listing, such as '$129.99'."

**2. Visual references**

If a criterion must point to a specific uploaded image or file, naming the file is acceptable because the grader has the file.

### Anti-pattern: one blanket rubric

In the Photo QC / storefront audit task, one rubric tried to cover every product at once. That made the ground truth impossible to grade from the criterion alone.

Problems to avoid:

- **R1:** asks whether every PASS or EDIT verdict cites the correct photo, but does not name the correct photo and verdict for each product
- **R5:** inlines photo-quality standards, but still relies on external per-product ground truth
- **R7:** checks whether the agent used walkthrough labels, but cannot by itself verify that the final mapping is correct

Better shape:

- write one rubric per product
- name the expected \`photo_file\`
- name the expected verdict
- include the expected visual basis when needed

Example:

- "The Photo QC record for Baby Beanie - Solid Gray has verdict PASS, citing IMG_0489.jpg, the only square 2710 x 2710 still that is sharp and color-accurate."

### Anti-pattern: hiding the expected value in the environment

In the Kiln & Co sponsored mockup task, several criteria required the grader to open external context to know the answer.

Fix these by naming the expected value directly:

- **R3:** state the four received products instead of referring only to order \`KC-26-04182\`
- **R6:** name each image-to-product pair instead of saying "verified uploaded images"
- **R12:** state the Virginia kiln address, \`132 Church St NW, Vienna, VA\`
- **R14:** state the sponsor requirement, such as the due date and expired coupon issue
- **R15:** state the prior Lena context, such as the softbox or white-balance check

### The bar

Self-containment is not optional. Non-self-contained rubrics fall under **Fail - 10%+ Major Rubric Errors**.

In practice, two non-self-contained rubrics in a set of around 15 to 20 criteria can fail the whole task.`,
      },
      {
        id: "output-modality-diversity",
        title: "Handwritten Notes should support richer outputs",
        kind: "guidance",
        tag: "Scenario Design",
        impact:
          "Difficulty must come from cross-modal workflows and less common output artifacts, not from hard-to-read inputs. Handwritten-notes-into-CSV should no longer be the default failure mechanism.",
        summary:
          "Handwritten notes can still be useful, but they should be one part of a broader workflow that asks the model to reason across modalities and produce richer artifacts.",
        body: `Around 95% of submitted tasks follow the same pattern: handwriting goes in, then a plain \`.csv\` or \`.pdf\` comes out.

That pattern should no longer be the default.

### What should create difficulty

Use complexity from the workflow, not from making inputs harder to read.

Better sources of difficulty:

- reading one modality and acting in another
- reconciling several inputs before deciding what belongs in the output
- producing less common artifacts such as \`.pptx\`, \`.xlsx\`, \`.webm\`, \`.svg\`, rendered charts, or interactive HTML
- combining artifact creation with state changes like emails, calendar events, database updates, file organization, or memory updates

### What to avoid

Do not make the main challenge:

- harder handwriting
- more cramped notes
- handwriting converted into a plain CSV
- a task that can be solved by transcription alone

### How to design instead

Pair one input modality with a different output modality.

Examples:

- read a chart, then write a spreadsheet
- read a video, then produce a slide
- read invoices, then send the correct email
- read notes and selected exercises, then build an interactive page

Keep the visual identification load-bearing so the task cannot be solved as text-only.

Handwritten notes are still allowed. They should support the scenario instead of being the entire scenario.`,
        scenarios: [
          {
            title: "Scenario 1: Zoe's school prep",
            prompt:
              "Zoe is about to start 1st grade, and I am concerned about her reading, writing, and math. Create `zoe_learns.html` using Keisha's notes from the meeting with Ms. Carter, the selected exercises, and the uploaded layout requirements. Include only exercises that apply to Zoe's gaps, discard the others into MEMORY.md, and create a calendar event series for Keisha and me from tomorrow until August 14, every 2 days across Monday through Saturday, with Sundays treated as off days.",
            details: `This works because the model must coordinate several sources:

- parent-teacher notes identify Zoe's gaps
- exercise files arrive as photos, screenshots, videos, or handwritten worksheets
- the model must judge which exercises fit a 6-year-old entering 1st grade
- matching exercises go into the page
- discarded exercises are recorded in \`MEMORY.md\`
- the final \`zoe_learns.html\` must follow the uploaded layout
- the calendar series has a non-trivial schedule rule`,
          },
          {
            title: "Scenario 2: Milek's backyard timeline",
            prompt:
              "I got my drip irrigation kit and want to document the current state of my backyard before setting it up. Based on the uploaded content, create `backyard_timeline.svg` as a six-month progress tracker starting now. Use the uploaded backyard inventory as the baseline, follow the layout spec, include monthly milestones, group tracked plants and areas, leave placeholders for future updates, and set a recurring reminder every Friday of the last week of each month. Include Terrence in the event.",
            details: `This works because the model must reconcile and transform the inputs:

- current inventory comes from photos, screenshots, or written lists
- layout requirements constrain the SVG structure
- the model must decide what counts as a six-month milestone
- plants and backyard areas must be grouped into clear sections
- the output is an uncommon artifact: \`backyard_timeline.svg\`
- the task also requires a recurring reminder with a naming constraint and an attendee`,
          },
        ],
      },
      {
        id: "decoys-noise",
        title: "Every scenario needs deliberate, graded friction points",
        kind: "guidance",
        tag: "Scenario Design",
        impact:
          "Tasks are expected to include resolvable decoys, and every decoy must be paired with a rubric that verifies the model avoided it.",
        summary:
          "Plausible-but-wrong inputs make the model verify instead of pattern-match. The decoy must be fair, realistic, and graded.",
        body: `A strong task should not rely only on genuine complexity. It should also include deliberate friction points.

A friction point is a plausible but wrong path that the model must actively avoid.

### What counts as a decoy

Use decoys that could realistically appear in a user's files:

- **Distractor visual:** an image that resembles the target but has the wrong angle, color variant, product, or age
- **Distractor record:** stale data sitting next to current data
- **Distractor communication:** an irrelevant email or message in the same inbox or channel
- **Near-duplicate identity:** two people, products, or IDs with similar names
- **Red herring instruction:** an old note or plausible instruction that conflicts with the rest of the context

### Rules for placing decoys

**Make the decoy resolvable.**

The correct answer must be available from the provided materials. If disambiguation requires outside information, the task is unfair.

**Grade the decoy.**

Every decoy needs a rubric that checks whether the model avoided it.

Example:

- "The email does not mention the Virginia address."

**Do not over-stack.**

Too many decoys turn the task into noise filtering. Friction should support the real reasoning chain, not replace it.

**Test judgment, not formatting awareness.**

A good decoy forces a decision between plausible options. It is not the same as checking whether a file, column, or tab exists.

### Applied examples

For **Zoe**, realistic friction includes:

- an exercise for a skill she already mastered
- draft and final versions of the same worksheet
- exercises pitched at the wrong grade level
- the Sunday scheduling rule, where Saturday is followed by Monday, not Tuesday

For **Milek**, realistic friction includes:

- an older backyard inventory list that conflicts with current photos
- garden inputs unrelated to irrigation
- decorative elements that should not shape the baseline
- the same calendar edge case

### Guardrail

Friction has to earn its place. It should feel like something that naturally appears in real files, not something inserted only to trick the model.`,
      },
    ],
  },
];

export const latestAlignmentUpdate = alignmentUpdates[0];
