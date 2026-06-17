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
    playbookLink: "Phase 1: Persona & Universe Research",
    tips: [
      "The category/subcategory must fit the persona's life naturally, not be bolted on.",
      "Treat the persona context as the foundation — everything downstream builds on it.",
    ],
  },
  {
    n: 2,
    key: "brainstorm",
    title: "Brainstorming",
    short: "Generate 2–3 realistic task ideas that fit the persona.",
    detail:
      "Based on the assigned Category, Subcategory, and the persona context, brainstorm realistic task ideas that would naturally arise in this persona's day-to-day. Don't lock onto the first angle.",
    playbookLink: "Phase 1.2 — Fit the category in 2–3 ways",
    tips: [
      "List the angles, then pick the one that fits best and has the richest data in the universe.",
      "Brainstorm 3–4 failure modes upfront — these become the task's center of gravity.",
    ],
  },
  {
    n: 3,
    key: "choose",
    title: "Choose the Idea",
    short: "Pick the scenario with the most room for genuine complexity.",
    detail:
      "Select the idea you can ground most believably in the persona's reality while leaving room to create realistic complexity aligned with the category and subcategory.",
    tips: [
      "Stronger persona adherence makes the user request more believable.",
      "Favor ideas where messy, multi-source context is natural.",
    ],
  },
  {
    n: 4,
    key: "reality",
    title: "Build the Reality First",
    short: "Decide what multimodal context could exist — before writing a prompt.",
    detail:
      "Don't build the prompt yet. Ask: which multimodal context could I gather or create to support this idea, and which of it would realistically increase complexity? Design the world the persona lives in first.",
    playbookLink: "Phase 2: Deep Universe Interaction",
    tips: [
      "Information that exists in only one source forces genuine auditing and reconciliation.",
      "Recovered information should come from multiple locations and formats, not a single clean source.",
    ],
  },
  {
    n: 5,
    key: "mm",
    title: "Final Decision on MM Context",
    short: "Lock the multimodal inputs and the friction you'll plant.",
    detail:
      "Commit to the concrete inputs: handwritten notes as the SSOT, a captions file, and an image set. Introduce controlled mismatches and friction — captions over the limit, mismatched dates, unrelated images — nothing forced, just realistic mess.",
    playbookLink: "Phase 5: Design Multimodal Inputs That Fail Naturally",
    tips: [
      "Vary formats: handwritten + screenshot + typed memo + image set.",
      "Avoid the single-character gotcha as the whole-task failure; spread the load.",
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
    playbookLink: "Phase 4: High Level, Nested Complexity",
    tips: [
      "No role-play scaffolding, no enumerated dev-spec step lists.",
      "Constraints should be implicit — the right behavior emerges from honest interpretation.",
    ],
  },
  {
    n: 7,
    key: "gtfa",
    title: "GTFA Creation",
    short: "Build the one correct answer by hand.",
    detail:
      "Craft the Ground Truth Final Answer that a correct silver trajectory would produce. It doubles as the Desired Outcome and lets you confirm early whether the task can meet the 50% genuine rubric failure threshold.",
    output: "GTFA.md",
    playbookLink: "Phase 3: Build the GTFA First",
    tips: [
      "Document the chain of reasoning: which inputs you consulted and in what order.",
      "Identify major gaps now, before sinking hours into rubrics.",
    ],
  },
  {
    n: 8,
    key: "run",
    title: "Run in OpenClaw",
    short: "One clean, single-turn agent interaction.",
    detail:
      "Run the prompt in the OpenClaw environment as a single prompt-agent interaction — no multi-turn, no follow-ups. If you forget the multimodal context, reset and start fresh rather than patching it in.",
    playbookLink: "Phase 6: Validate the Failure Mode Fires",
    tips: [
      "If you forgot to upload context, reset the agent — never add it in a follow-up.",
      "Compare the response to the GTFA to gauge the failure size.",
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
      "If the model passes too much, go back and tighten Phase 4 or 5.",
      "Confirm the failure is reasoning-shaped, not perception-shaped.",
    ],
  },
  {
    n: 10,
    key: "silver",
    title: "Silver Trajectory",
    short: "Guide the model to the correct answer, restoring to seed.",
    detail:
      "Always restore to seed — do not start fresh. Guide the model toward the correct response with as many follow-up prompts as needed until the correct solution is reached.",
    tips: [
      "Each follow-up should target a specific, observed failure.",
      "The end state is the verified correct solution.",
    ],
  },
  {
    n: 11,
    key: "tests",
    title: "Unit Tests (Reviewers Only)",
    short: "Name the structural checks reviewers will implement.",
    detail:
      "Define reviewer-only unit test references — names and descriptions, not the tests themselves. These cover what is structurally important: required folders exist and contain the expected sub-folders.",
    tips: [
      "Structural checks: platform folders exist; each contains the expected date folders.",
      "These are references for reviewers, not graded rubric items.",
    ],
  },
  {
    n: 12,
    key: "rubrics",
    title: "Rubrics",
    short: "One rubric per explicit/implicit requirement.",
    detail:
      "Every rubric covers an explicit or implicit requirement of the prompt. Bundling happens only when the same level of data entry is being checked. Each rubric is weighted and tied to a grading category.",
    output: "rubrics.md",
    playbookLink: "Pre-submission rubric review",
    tips: [
      "Bundle only same-level checks; keep distinct requirements separate.",
      "Anchor each positive-weight rubric against an observed failure mode.",
    ],
  },
];
