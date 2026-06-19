import type { MethodStep, PlaybookPrinciple } from "./types";

export const playbookPrinciples: PlaybookPrinciple[] = [
  {
    title: "Reverse-engineer from the GTFA",
    body: "Don't write the prompt first and discover the answer later. Decide the Ground Truth Final Answer first, then design the prompt that should lead an agent to it. The GTFA grounds the prompt, the multimodal inputs, AND the rubric criteria.",
  },
  {
    title: "Keep the prompt high-level, nest the complexity",
    body: "A prompt that crams every constraint inline reads like a dev spec. Real users say \"hey, take a look at this doc.\" Push structural detail 1–2 hops away into referenced files and multimodal context. That nesting is what creates genuine cross-modal reasoning challenge.",
  },
  {
    title: "Make the failure natural, not forced",
    body: "A task lost because the model misread a 3 as an 8 is a perception gotcha. A task lost because the model failed to cross-reference handwritten notes against captions against dates is a capability test. We want the second kind.",
  },
  {
    title: "Difficulty lives in the joins",
    body: "The model is robust to surface lookups. Genuine difficulty comes from 2–3 independent sources that must agree — a note, a caption file, an image set. Spread failure across multiple points so one perception miss doesn't decide everything.",
  },
  {
    title: "Confirm the GTFA is unique",
    body: "There must be exactly one defensible solution. If two equally valid answers exist, the task is underspecified — tighten the prompt before continuing.",
  },
  {
    title: "Validate the ≥50% failure threshold early",
    body: "Run the initial trajectory and confirm the model fails the way you predicted and crosses the 50% positive-weight threshold. Discovering gaps at the GTFA stage is far cheaper than discovering them after writing rubrics.",
  },
];

export const methodSteps: MethodStep[] = [
  {
    n: 1,
    key: "persona",
    title: "Persona Understanding",
    short: "Load the universe and get fluent in who you are designing for.",
    detail:
      "Load the Service Universe Artifact ID first. In the Database tab, ask the agent for full persona context — occupation, relationships, interests, ongoing projects, communication style. Generate a persona_context.md and, from then on, step into the persona's shoes.",
    output: "persona_context.md",
    tips: [
      "Capture occupation, relationships, projects, and communication style — you reuse all of it downstream.",
      "The category and subcategory must fit the persona's life naturally, not be bolted on.",
    ],
  },
  {
    n: 2,
    key: "brainstorm",
    title: "Brainstorming",
    short: "Generate 2–3 realistic task ideas that fit the persona.",
    detail:
      "Based on the assigned Category, Subcategory, and the persona context, brainstorm realistic task ideas that would naturally arise in this persona's day-to-day. Don't lock onto the first angle.",
    tips: [
      "Generate 2–3 distinct angles before committing — the first idea is rarely the strongest.",
      "Sketch 3–4 failure modes upfront; these become the task's center of gravity.",
    ],
  },
  {
    n: 3,
    key: "choose",
    title: "Choosing the Idea",
    short: "Pick the scenario with the most room for genuine complexity.",
    detail:
      "Select the idea you can ground most believably in the persona's reality while leaving room to create realistic complexity aligned with the category and subcategory.",
    tips: [
      "Pick the idea you can ground most believably in the persona's reality.",
      "Favor ideas where messy, multi-source context is natural rather than forced.",
    ],
  },
  {
    n: 4,
    key: "reality",
    title: "Build the Reality First",
    short: "Decide what multimodal context could exist — before writing a prompt.",
    detail:
      "Don't build the prompt yet. Ask: which multimodal context could I gather or create to support this idea, and which of it would realistically increase complexity? Design the world the persona lives in first.",
    tips: [
      "Information that exists in only one source forces genuine auditing and reconciliation.",
      "Spread recovered information across multiple locations and formats, not one clean source.",
    ],
  },
  {
    n: 5,
    key: "mm",
    title: "The Multimodal Inputs",
    short: "Lock the multimodal inputs and the friction you'll plant.",
    detail:
      "Commit to the concrete inputs: handwritten notes as the SSOT, a captions file, and an image set. Introduce controlled mismatches and friction — captions over the limit, mismatched dates, unrelated images — nothing forced, just realistic mess.",
    tips: [
      "Vary formats: handwritten notes + captions file + image set.",
      "Avoid the single-character gotcha as the whole-task failure; spread the load across sources.",
    ],
    callouts: [
      {
        title: "Vary the multimodal mix across tasks",
        body: "Don't reach for the same input pattern every time. Different tasks should combine different modalities — images, documents, spreadsheets, videos, handwritten notes, screenshots — and let each one carry part of the reasoning. The mix should feel native to the scenario, never mechanically inserted to tick a 'multimodal' box.",
      },
    ],
  },
  {
    n: 6,
    key: "prompt",
    title: "Materialize the Prompt",
    short: "Shape the idea into a natural, high-level user request.",
    detail:
      "Write the final prompt so it stays natural and fully grounded in the reality and evidence you created. Open with something the persona would actually say; let the nested context carry the structural detail.",
    output: "prompt.md",
    tips: [
      "Open with something the persona would actually say — no role-play scaffolding or dev-spec step lists.",
      "Keep constraints implicit; let the referenced files and inputs carry the structural detail.",
    ],
    callouts: [
      {
        title: "Vary the final artifact, too",
        body: "Output variety matters as much as input variety. Avoid requesting the same deliverable structure task after task — different scenarios naturally call for different formats, artifact types, and levels of detail. A folder tree, a slide deck, a spreadsheet, a written report, a state change: let the scenario decide the output, not habit.",
      },
      {
        title: "MEMORY.md is optional — and never created from scratch",
        body: "Only ask for it when a task genuinely benefits from tracking information over time. When you do reference MEMORY.md, assume it already exists and instruct the model to update, append to, or read from it — don't tell the model to create a new MEMORY.md unless the task explicitly requires one.",
      },
    ],
  },
  {
    n: 7,
    key: "gtfa",
    title: "The Ground Truth Final Answer",
    short: "Build the one correct answer by hand.",
    detail:
      "Craft the Ground Truth Final Answer that a correct silver trajectory would produce. It doubles as the Desired Outcome and lets you confirm early whether the task can meet the 50% genuine rubric failure threshold.",
    output: "GTFA.md",
    tips: [
      "Document the chain of reasoning: which inputs you consulted and in what order.",
      "Confirm exactly one defensible answer exists — if two do, the task is underspecified.",
    ],
  },
  {
    n: 8,
    key: "run",
    title: "Run in OpenClaw",
    short: "One clean, single-turn agent interaction.",
    detail:
      "Run the prompt in the OpenClaw environment as a single prompt-agent interaction — no multi-turn, no follow-ups. If you forget the multimodal context, reset and start fresh rather than patching it in.",
    tips: [
      "Run it as a single prompt-agent interaction — no multi-turn, no follow-ups.",
      "If you forgot to upload context, reset the agent — never patch it in afterward.",
    ],
  },
  {
    n: 9,
    key: "crossref",
    title: "Cross-reference GTFA vs Response",
    short: "Measure whether the model failed badly enough.",
    detail:
      "Use the GTFA to determine whether the model failed badly enough to clear the 50% rubric threshold. Based on the result, increase task complexity or proceed to the Silver Trajectory.",
    tips: [
      "If the model passes too much, go back and add complexity to the reality or the inputs.",
      "Confirm the failure is reasoning-shaped, not perception-shaped.",
    ],
  },
  {
    n: 10,
    key: "silver",
    title: "The Silver Trajectory",
    short: "Guide the model to the correct answer, restoring to seed.",
    detail:
      "Always restore to seed — do not start fresh. Guide the model toward the correct response with as many follow-up prompts as needed until the correct solution is reached.",
    tips: [
      "Always restore to seed — never start a fresh conversation.",
      "Target each follow-up at a specific, observed failure; end at the verified correct solution.",
    ],
  },
  {
    n: 11,
    key: "tests",
    title: "Unit Tests",
    short: "Name the structural checks reviewers will implement.",
    detail:
      "Define reviewer-only unit test references — names and descriptions, not the tests themselves. These cover what is structurally important: required folders exist and contain the expected sub-folders.",
    tips: [
      "Structural checks only: platform folders exist and contain the expected date folders.",
      "These are references for reviewers, not graded rubric items.",
    ],
  },
  {
    n: 12,
    key: "rubrics",
    title: "The Rubric Set",
    short: "One rubric per explicit/implicit requirement.",
    detail:
      "Every rubric covers an explicit or implicit requirement of the prompt. Bundling happens only when the same level of data entry is being checked. Each rubric is weighted against the requirement it enforces.",
    output: "rubrics.md",
    tips: [
      "One rubric per explicit or implicit requirement; bundle only same-level checks.",
      "Anchor each positive-weight rubric against an observed failure mode.",
    ],
  },
];
