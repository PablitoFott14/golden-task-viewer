/**
 * The L0 Review QC Rubric (CB-facing spec doc), transcribed verbatim from
 * "OpenClaw MM Rubrics - L0 Reviews - QC Rubric-cb facing (1).csv" (the
 * 03 Jul 2026 export; version differences are tracked in `specChangelog.ts`).
 *
 * Each dimension lists its failing and non-failing error categories and every
 * scored answer option (2 = Fail, 3 = Non-Fail, 5 = Pass). Per that export,
 * selecting any Fail or Non-Fail option requires a written justification;
 * the SpecDoc page renders that marker from the score. The two appendices,
 * the criteria weight definitions and the rubric quality definitions, follow.
 * Keep this in sync with the source CSV.
 */

export interface SpecErrorTag {
  label: string;
  type: "fail" | "non-fail";
}

export interface SpecOption {
  text: string;
  score: number;
}

export interface SpecDimension {
  name: string;
  conditional?: string;
  question: string;
  description: string;
  errorTags: SpecErrorTag[];
  options: SpecOption[];
}

export interface SpecGroup {
  group: string;
  dimensions: SpecDimension[];
}

const F = (label: string): SpecErrorTag => ({ label, type: "fail" });
const N = (label: string): SpecErrorTag => ({ label, type: "non-fail" });

export const specGroups: SpecGroup[] = [
  {
    group: "Prompt",
    dimensions: [
      {
        name: "MM dependence",
        question: "Rate the MM dependence of the Prompt dimension.",
        description:
          'NOTE: This error encompasses cases where a non-text input file can be referenced, but is not necessary to reference. E.g., the prompt requests a summary of an audio file, but a transcript of the audio file is also present in the environment. Since the purpose of this project is to assess the MM reasoning of trajectories, environments/prompts that enable the agent to complete the task without such reasoning are similar to "Leaking the Solution" errors on other projects. See the spec doc for examples. For all options except the last, apply the error category.',
        errorTags: [F("Fail - MM Dependence")],
        options: [
          {
            score: 2,
            text:
              "The prompt does not require the agent to reference non-text input files in the environment; the explicit requests of the prompt can be completely fulfilled without any multimodal reasoning or processing.",
          },
          {
            score: 5,
            text:
              "The prompt, in the context of the environment, cannot be answered without referencing non-text files in the workspace.",
          },
        ],
      },
      {
        name: "Output file(s) name",
        question: "Rate the Output file(s) name of the Prompt dimension.",
        description:
          "The user must specify in the prompt the name that the model should assign to the output file, if the output is expected to be a file. See the spec doc for examples. For all options except the last, apply the error category.",
        errorTags: [F("Fail - Missing output filename")],
        options: [
          { score: 2, text: "The prompt requested a file as output, but the filename was not specified." },
          { score: 5, text: "The prompt requested a file as output and successfully specified the filename." },
        ],
      },
      {
        name: "Feasibility With Tools",
        question: "Rate the Feasibility With Tools of the Prompt dimension.",
        description:
          "The model has access to all tools available in openclaw and is able to create virtual environments and install any python library. So anything that can be solved using a python library running in a linux environment is fair game. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [N("Non-Fail - Feasibility with Tools"), F("Fail - Feasibility with Tools")],
        options: [
          {
            score: 2,
            text:
              "The primary request is impractical or impossible and can't be answered by the tools available or enabled for the task",
          },
          {
            score: 3,
            text:
              "One or more secondary requests are impractical or impossible and can't be answered by the tools available or enabled for the task",
          },
          { score: 5, text: "The requests are completely actionable by the tool framework" },
        ],
      },
    ],
  },
  {
    group: "Input Artifacts",
    dimensions: [
      {
        name: "Realism",
        question: "Rate the Realism of the Input Artifacts dimension.",
        description:
          "Tasks should match real-world use-cases and not look contrived or made up. Real user data is messy — IMG_0427.HEIC, duplicates, missing timestamps, blurry phone shots, scanned-skewed PDFs, mixed orientations. Tasks where input_files/ is a curated set of perfectly-cropped JPGs are contrived. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [F("Fail - Contrived Inputs"), N("Non-Fail - Partially Contrived Inputs")],
        options: [
          {
            score: 2,
            text:
              '>20% of the multimodal inputs for the task (or 1+ xlsx, docx, or pdf inputs) are highly unrealistic in the context of the prompt; They are highly artificial, overly curated, or otherwise "too perfect" to reflect a real-world use-case, and there is no reasonable explanation for this (e.g., curated & standardized MNIST handwriting samples are included alongside a prompt asking the agent to digitize notes)',
          },
          {
            score: 3,
            text:
              "The multimodal inputs for the task are slightly unrealistic in the context of the prompt, but it is possible that a real user may include inputs of similar quality or standardization. A reasonable explanation exists for why the inputs may seem unnatural, but actually are not (e.g., the user mentions they're analyzing a public dataset, and this premade dataset is among the inputs), OR <=20% of the multimodal inputs for the task are highly realistic in the context of the prompt.",
          },
          {
            score: 5,
            text:
              "The multimodal inputs for the task are plausible and realistic in the context of the prompt; A real user could reasonably have attached these same inputs.",
          },
        ],
      },
      {
        name: "Artifact Verification",
        question: "Rate the Artifact Verification of the Input Artifacts dimension.",
        description:
          "The rubric or tests should verify a value, match, mismatch, visual detail, quality judgment, extraction result, or decision that depends on the media. It is not sufficient to only check for existence. See the spec doc for examples. For all options except the last, apply the error category.",
        errorTags: [F("Fail - Missing Artifact Verification")],
        options: [
          {
            score: 2,
            text:
              'Across both forms of verifier (tests and rubric criteria), no test/criterion dependent on the content of a non-text file exists.\n\nNote: Tests/Criteria which only verify existence (e.g., a test asserting that some given file exists in a particular location) do not count as a test/criterion that is "dependent on content."',
          },
          {
            score: 5,
            text:
              "At least one test/criterion exists which is dependent on the contents (rather than just the existence) of a non-text input file.",
          },
        ],
      },
      {
        name: "Leak Prevention",
        question: "Rate the Leak Prevention of the Input Artifacts dimension.",
        description:
          'Evaluates the degree to which the task remains a true "inference" challenge by ensuring no "spoiler" information is present in the administrative or metadata layers. It checks that filenames, asset manifests, contributor notes, and helper documents are completely sanitized of the solutions, values, or conclusions the model is expected to derive solely from the multimodal media. See the spec doc for examples. For all options except the last, apply an error category.',
        errorTags: [N("Non-Fail - Suggestive Metadata"), F("Fail - Direct Answer Leak")],
        options: [
          {
            score: 2,
            text:
              'The solution is explicitly stated in a non-media field. For example, a file is named overdue_balance_500.pdf when the task is to find the balance, or the contributor notes state "The agent should see the crack in the foundation" in a field the model can access.',
          },
          {
            score: 3,
            text:
              'The answer isn\'t explicitly stated, but the labeling provides heavy "leading" hints that narrow the search space unnaturally. For example, naming an image kitchen_sink_damage_closeup.jpg when the user’s prompt was a vague "Find all issues in this house."',
          },
          {
            score: 5,
            text:
              'All non-media identifiers are strictly neutral or randomized. Filenames follow a "messy" real-world convention (e.g., IMG_0427.HEIC, Doc_Scan_v2.pdf) and notes are restricted to process instructions, forcing the agent to rely entirely on its multimodal perception to find the answer.',
          },
        ],
      },
    ],
  },
  {
    group: "Verifiers",
    dimensions: [
      {
        name: "Safety",
        question: "Rate the Safety of the Verifiers dimension.",
        description:
          "Medical images, homework screenshots, tax/financial documents, insurance claims, seller messaging, faces, children, IDs, and private images need explicit limits and should use mocked or synthetic data where appropriate. See the spec doc for examples. For all options except the last, apply the error category.",
        errorTags: [F("Fail - Harmful Inputs")],
        options: [
          {
            score: 2,
            text:
              "One or more input artifacts are harmful and include sensitive private information that can identify a real, existing person. The inputs(s) are of a sensitive nature (see notes for examples) and are not synthetic, fabricated, or mocked.",
          },
          { score: 5, text: "No provided input files contain real PII." },
        ],
      },
    ],
  },
  {
    group: "Silver Trajectory",
    dimensions: [
      {
        name: "Category and Subcategory",
        conditional: "Only evaluate if the silver trajectory is present -- otherwise skip this selection.",
        question: "Rate the Category and Subcategory of the Silver Trajectory dimension.",
        description: `Categories:

Visual Learning
Users leverage academic media like worksheets or slides for content mastery. The agent interprets text and diagrams to generate study artifacts such as notes, lab reports, and guides.

Subcategories: Homework/Problem Solving, Lab/Fieldwork Documentation, Textbook/Lecture Comprehension

Commerce & Product
Shoppers and sellers use marketplace imagery to manage listings. The agent matches items across platforms, audits photo quality, and ensures brand or packaging compliance.

Subcategories: Visual Shopping/Comparison, Product Listing QA, Brand/Packaging Audit

Creative & Media
Creators refine existing visual content through editing and auditing. The agent applies operations like cropping, zooming, or feedback to user-shot footage and designs without generating new assets.

Subcategories: Image/Video Editing, Social Media Content Audit, Design/Portfolio Review

Operations & QA
Acting as a back-office operator, the agent processes visual evidence such as receipts or screenshots. It updates systems of record, manages inventory, and validates claims against visual data.

Subcategories: Document/Receipt Processing, Inventory Visual Audit, UI/UX Screenshot Audit/Form-filling

Health & Wellness
Users track physical health or nutrition through photos of meals and symptoms. The agent analyzes visual changes over time and compares them against nutritional or medical references.

Subcategories: Skin/Symptom Triage, Nutrition/Meal Logging

Property & Space
Homeowners and agents assess physical environments using room or renovation photos. The agent detects progress changes, matches listings to reality, and reviews interior staging.

Subcategories: Real Estate Listing Review, Interior Design/Renovation. See the spec doc for examples. For all options except the last, apply the error category.`,
        errorTags: [N("Non-Fail - Category Relevance")],
        options: [
          {
            score: 3,
            text:
              "The Trajectory is objectively unrelated to the selected category, or contradicts the definition of, the assigned category.\nThe Trajectory is somewhat related to the selected category, but better fits a different category.\n\nNote: subcategories are not defined and misalignments should not be flagged.",
          },
          { score: 5, text: "The Trajectory is clearly related to the selected category." },
        ],
      },
      {
        name: "Cross-Modal & Cross-Service Synthesis",
        conditional: "Only evaluate if the silver trajectory is present -- otherwise skip this selection.",
        question: "Rate the Cross-Modal & Cross-Service Synthesis of the Silver Trajectory dimension.",
        description:
          'Evaluates the agent\'s ability to execute complex reasoning chains where information is not just gathered, but transformed or verified across different modalities (e.g., Image → Text) or services (e.g., PDF → Calendar). It measures whether the agent can successfully use an output from one source as a mandatory predicate for the next step, or if it can identify discrepancies when cross-referencing multiple "messy" real-world artifacts. See the spec doc for examples. For all options except the last, apply the error category.',
        errorTags: [
          F("Fail - Disconnected Processing"),
          F("Fail - Simple Processing"),
          N("Non-Fail - Trivial Integration"),
        ],
        options: [
          {
            score: 2,
            text:
              "[Fail - Disconnected Processing]\nThe agent treats inputs as isolated silos. It fails to extract a necessary value from one modality to use in another (e.g., ignores a date in a blurry HEIC photo when searching a database) or provides a response based on only one source while ignoring conflicting evidence in a second source.",
          },
          {
            score: 2,
            text:
              "[Fail - Simple Processing]\nThe trajectory has no opportunity to extract a necessary value from one modality to use in another. (This means the prompt and modality is too easy and not a good task)",
          },
          {
            score: 3,
            text:
              '[Non-Fail - Trivial Integration]\nThe agent acknowledges both sources but combines them superficially. It may summarize a PDF and describe an image in the same response, but it fails to establish a logical link between them, requiring explicit manual prompting to "connect the dots" that should have been handled autonomously.',
          },
          {
            score: 5,
            text:
              'The agent demonstrates a "seamless handoff" between modalities. It extracts a specific, non-obvious value from a primary source and uses it as the required search parameter or logic filter for a secondary source, successfully flagging any inconsistencies or dependencies between the two.',
          },
        ],
      },
    ],
  },
  {
    group: "Trajectory",
    dimensions: [
      {
        name: "Architectural Depth & Friction Exposure",
        question: "Rate the Architectural Depth & Friction Exposure of the Trajectory dimension.",
        description: `This evaluates whether the task itself meaningfully tests agent-building capability and exposes differences across models. The task must require multi-stage coordination, real tool use, cross-step dependencies, and at least one realistic friction point.

A task requires multi-system coordination when the agent must retrieve, reconcile, or act upon information across two or more distinct systems (apps, data sources, tools, or environments), where outputs from one system meaningfully influence decisions or actions in another system and/or outputs from both systems inform the final result.

MEMORY.md usage: (UPDATED 03/10)
The prompts in multi-turn tasks have to require the model—explicitly or implicitly—to write details to the MEMORY.md file. (This file is used as “long-term” context for future conversations.) This can be done by:
Asking the model to write it to memory directly

“Write this down to your memory”

“Remember this”

Implicitly needing the model to remember the information somehow to use it later:

“track my progress”

“make sure you don’t post duplicates”

“One important thing to know about me is that I have a bad knee”

“I always prefer taking the subway over a cab”. See the spec doc for examples. For all options except the last, apply the error category.`,
        errorTags: [F("Fail - Major Depth Issues"), N("Non-Fail - Minor Depth Issues")],
        options: [
          { score: 2, text: "No meaningful tool dependency." },
          {
            score: 3,
            text:
              "Architectural evolution is possible but not clearly required.\n\nTool use is present but not deeply integrated into reasoning.\n\nTask meets minimum requirements but lacks strong differentiation power.",
          },
          {
            score: 5,
            text:
              "The task clearly forces architectural reasoning.\nRequires modular separation or structured multi-stage planning.\nIncludes real friction (e.g., conflicting data, missing fields, paywalls, normalization issues, constraint negotiation).\nRequires state reuse or refactoring.\nMeaningfully differentiates model capability",
          },
        ],
      },
    ],
  },
  {
    group: "Rubric Criteria",
    dimensions: [
      {
        name: "Overall Rubric Quality - Major",
        question: "Rate the Overall Rubric Quality - Major of the Rubric Criteria dimension.",
        description:
          "Use the number of criteria that the CB wrote as the denominator while calculating % values. See the additional notes section for the numerator. Do NOT double count criteria while tallying even if it has multiple issues.\n\nSee Rubric Quality Definitions in the spec appendix for descriptions and categorization (major/moderate/minor) for rubric criteria errors. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [N("Non-Fail - Up to 10% Major Errors"), F("Fail - 10%+ Major Rubric Errors")],
        options: [
          { score: 2, text: "More than 10% (>10%) of the criteria contain major issues" },
          { score: 3, text: "Up to 10% (<=10%) of the criteria contain major issues" },
          { score: 5, text: "No Major Issues" },
        ],
      },
      {
        name: "Overall Rubric Quality - Major/Moderate",
        question: "Rate the Overall Rubric Quality - Major/Moderate of the Rubric Criteria dimension.",
        description:
          "Use the number of criteria that the CB wrote as the denominator while calculating % values. See the additional notes section for the numerator. Do NOT double count criteria while tallying even if it has multiple issues.\n\nSee Rubric Quality Definitions in the spec appendix for descriptions and categorization (major/moderate/minor) for rubric criteria errors. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [N("Non-Fail - Up to 15% Moderate Errors"), F("Fail - 15%+ Moderate Rubric Errors")],
        options: [
          { score: 2, text: "More than 15% (>15%) of the criteria contain moderate or major issues" },
          {
            score: 3,
            text: "Up to 15% (<=15%) of criteria contain moderate or major issues (with major issues contributing lower than 5%)",
          },
          { score: 5, text: "No major or moderate issues" },
        ],
      },
      {
        name: "Overall Rubric Quality - Major/Moderate/Minor",
        question: "Rate the Overall Rubric Quality - Major/Moderate/Minor of the Rubric Criteria dimension.",
        description:
          "Use the number of criteria that the CB wrote as the denominator while calculating % values. See the additional notes section for the numerator. Do NOT double count criteria while tallying even if it has multiple issues.\n\nSee Rubric Quality Definitions in the spec appendix for descriptions and categorization (major/moderate/minor) for rubric criteria errors. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [N("Non-Fail - 5-20% Minor Errors"), F("Fail - 20%+ Minor Rubric Errors")],
        options: [
          { score: 2, text: "More than 20% (>20%) of the criteria contain minor or moderate or major issues" },
          {
            score: 3,
            text:
              "Between 5 and 20% (>=5% and <=20%) of criteria contain minor or moderate or major issues (with major issues contributing lower than 5% and moderate issues contributing lower than 15%)",
          },
          { score: 5, text: "Less than 5% (<5%) of the rubrics have minor issues\nNo major or moderate issues" },
        ],
      },
      {
        name: "Rubric Structure",
        question: "Rate the Rubric Structure of the Rubric Criteria dimension.",
        description:
          "These errors reflect structural problems within the rubric and are failing if present. Weights should be added according to the difficulty of the thing the verifier is testing, not its importance to responding to the prompt. See the spec doc for examples.",
        errorTags: [F("Fail - Invalid Weights")],
        options: [
          { score: 2, text: "One or more criteria use weights outside of the allowed set {-5, -3, -1, +1, +3, +5}." },
          { score: 5, text: "All rubric criteria have weights within the set {-5, -3, -1, +1, +3, +5}" },
        ],
      },
      {
        name: "Rubric Spot Checks",
        question: "Rate the Rubric Spot Checks of the Rubric Criteria dimension.",
        description:
          "CBs are expected to provide up to 5 spot checks if there are sufficiently similar outcomes as well as add a criterion to check the volume of the outcomes.\nIf there are more than 5 spot checks, use the [Non-Fail - Too Many Spot Checks] category. See the spec doc for examples. For all options except the last, apply the error category.",
        errorTags: [N("Non-Fail - Too Many Spot Checks")],
        options: [
          { score: 3, text: "There are more than 5 spot checks for any group of outcomes." },
          { score: 5, text: "Every group of outcomes has up to 5 spot checks" },
        ],
      },
    ],
  },
  {
    group: "Tests",
    dimensions: [
      {
        name: "Correctness",
        conditional: "Only evaluate if the unit tests are present -- otherwise skip this selection.",
        question: "Rate the Correctness of the Tests dimension.",
        description:
          "Test logic should align with the conversational and environmental context.\n\n(04/09) Overly specific unit tests are also counted as incorrect unit tests. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [F("Fail - Incorrect Tests"), N("Non-Fail - Incorrect Tests")],
        options: [
          { score: 2, text: "At least 10% of the unit tests contain incorrect logic or are misaligned with the task’s context." },
          {
            score: 3,
            text: "At least one of the unit tests (but fewer than 10%) contains incorrect logic or is misaligned with the task’s context.",
          },
          { score: 5, text: "All of the unit tests contain correct logic and are aligned with the task’s context." },
        ],
      },
      {
        name: "Underfitted Tests",
        conditional: "Only evaluate if the unit tests are present -- otherwise skip this selection.",
        question: "Rate the Underfitted Tests of the Tests dimension.",
        description:
          "Underfitted tests are tests that are too loose, overly broad or lenient. These tests accept all the valid solutions, but also accept some incorrect, invalid or arguably undesirable ones. See the spec doc for examples. For all options except the last, apply an error category.",
        errorTags: [N("Non-Fail - Underfitted Tests"), F("Fail - Underfitted Tests")],
        options: [
          { score: 2, text: "More than 30% of the unit tests are underfitted" },
          { score: 3, text: "Up to 30% of the unit tests are underfitted" },
          { score: 5, text: "There are no underfitted tests" },
        ],
      },
      {
        name: "Coverage",
        conditional: "Only evaluate if the unit tests are present -- otherwise skip this selection.",
        question: "Rate the Coverage of the Tests dimension.",
        description: `Tests revolve around generated artifacts and should verify:
Explicit prompt requests

Implicit prerequisites for explicit prompt requests

E.g., Instructions say "respond to all my unread emails". The model must explore and discover the unread emails. There should be test cases to check whether emails were sent to all recipients.Some emails may also contain other requirements that should be tested as well.

Examples:
Prompt asks for a file -> check that file exists

Prompt asks to write to memory -> check that not memory is not empty

Prompt asks to add/remove/edit entities -> check that they were modified

Prompt asks for a verifiable artifact (CSV, JSON, etc.) -> check any applicable constraints (see below for more info)

What should/shouldn’t be covered by unit tests
Keep in mind that the expected coverage of the unit test suite highly depends on the specific requests of the conversation. If a prompt asks for a CSV while providing a pre-defined (and exact) schema, then several factors should be validated: file existence, schema definition, and content correctness. However, if the prompt requests an artifact that isn’t easily validated—such as a PDF—then it’s sufficient for the unit tests to only include structural checks, e.g., file existence.

Examples:
“... create a PDF for my personal calendar”

This file format isn’t easily verifiable/extractable, so the unit tests do not need to include content validation.

“... include a column for average temperature”

Doesn’t specify the exact column name or units, so schema definition and content correctness should not be considered in the unit tests. (This should instead be covered by the rubric, which inherently has more “wiggle room” in response evaluation.)

However, there should still be a unit test to validate file existence (and perhaps the total number of columns/rows, depending on the prompt).

“... include a column called “average temperature (F°)”

Specifies an exact schema and the expected units, so both schema definition and content correctness should be validated by the unit tests. See the spec doc for examples.`,
        errorTags: [N("Non-Fail - Test Coverage"), F("Fail - Test Coverage")],
        options: [
          {
            score: 2,
            text:
              "[Fail - Test Coverage]:\nInsufficient Overall Coverage: >20% of tests are missing (see notes on calculating this proportion)\n\nDo not penalize omissions for things that should not be covered by unit tests (see notes).\n\n05/04: Tests which are covered by the rubric (even if they should be covered by a test) do not count towards this error – see [Non-Fail - Incorrectly Covered by Rubric] instead. Tests should only be counted as missing if they are not covered by a verifier at all.",
          },
          {
            score: 3,
            text:
              "[Non-Fail - Test Coverage]:\nSuboptimal Overall Coverage: 20% or fewer tests are missing (see notes on calculating this proportion and what should/shouldn’t be covered by unit tests)\n\nDo not penalize omissions for things that should not be covered by unit tests (see notes).\n\n[Non-Fail - Incorrectly Covered by Rubric]\nAt least one unit test is missing but is instead covered by the rubric. (See notes for what should/shouldn’t be covered by unit tests.)",
          },
          { score: 5, text: "The unit tests cover all of the task’s expected constraints." },
        ],
      },
      {
        name: "Redundancy",
        conditional: "Only evaluate if the unit tests are present -- otherwise skip this selection.",
        question: "Rate the Redundancy of the Tests dimension.",
        description:
          "Evaluates the structural efficiency of the task’s grading logic. It identifies overlaps where a rubric is redundant because a Unit Test (Pytest) is already covering the same ground. High-quality tasks use Pytests for deterministic, binary checks (file existence, exact string matches, file formats) and reserve Rubrics for nuanced, qualitative analysis (reasoning quality, visual interpretation).\n\nRedundancy could be:\nTwo unit tests check the same thing\nOne unit test and one criterion check the same thing. See the spec doc for examples.",
        errorTags: [F("Fail - Highly redundant tests"), N("Non-Fail - Some redundant tests")],
        options: [
          {
            score: 2,
            text:
              'More than 1 pair of tests or rubric criteria check exactly the same behavior with no difference (e.g., three tests all asserting total_cost == 500).\n\nNOTE: Tests with identical structure but different inputs/expected values are not considered to have "no difference". (These types of “test consolidation” issues can be penalized with a non-failing category.)',
          },
          {
            score: 3,
            text:
              "1 pair of tests or rubric criteria check exactly the same behavior with no difference (e.g., three tests all asserting total_cost == 500).\n\nTests or rubric criteria have some overlap, but no direct 1:1 overlap",
          },
          { score: 5, text: "Tests and criteria are consolidated and non-redundant. Efficient coverage of requirements." },
        ],
      },
    ],
  },
  {
    group: "Failed Rubric/Unit Test",
    dimensions: [
      {
        name: "Justification",
        question: "Rate the Justification of the Failed Rubric/Unit Test dimension.",
        description: `For each rubric or unit test that the Claude model failed on, the CB must answer 3 justification questions:
1. Why is your test/rubric correct?
e.g., "Prompt asks for file.json, rubric checks it's present"

"Prompt asks for a calculation -- explain the calculator logic and how the answer was reached."

2. Why is it necessary for a correct answer from the model?
e.g., "Prompt asks for file.json, rubric makes sure it's present";

"Prompt asks for average spend, rubric makes sure it's present."

3. Where did the model make a mistake?
e.g., "Model missed transaction B and didn't include it in the calculations";

"In turn 23, the model did XYZ which was incorrect because XYZ.". See the spec doc for examples. For all options except the last, apply an error category.`,
        errorTags: [N("Non-Fail - Weak Justification"), N("Non-Fail - Incorrect Justification")],
        options: [
          {
            score: 3,
            text:
              "1 or more justifications set defends an overly specific or unrequested rubric/test that model A (Claude Opus) failed\n\nEx: a rubric penalizes the model for something the prompt never asked for, justification incorrectly argues that it’s a valid rubric",
          },
          {
            score: 3,
            text:
              "All justification sets defend valid, prompt-requested rubrics (none are overly prescriptive or unrequested), but justification sets lack sufficient detail -- e.g., answers are too brief, don't fully explain the logic, or don't pinpoint the exact model error with specifics (turn number, missing data, etc.).",
          },
          {
            score: 5,
            text: "All justification sets defend valid, prompt-requested rubrics and each set provides thorough, specific answers to all 3 questions",
          },
        ],
      },
    ],
  },
];

/* ---------- Appendix: Criteria Weight Definitions (Update 06/10) ---------- */

export const difficultyDimensions = [
  "Tool/source coordination: 3+ sources reconciled OR multiple tools chained",
  "Reasoning depth: multi-step inference, conditional logic, or non-trivial calculation",
  "Modality: cross-modal (e.g., image + structured data + text)",
  "Discovery effort: information requires SQL queries, hidden field lookup, or cross-document tracing",
];

export interface WeightBucket {
  level: string;
  score: number;
  definition: string;
  examples: string[];
}

export const weightBuckets: WeightBucket[] = [
  {
    level: "High Difficulty",
    score: 5,
    definition: `The model cannot satisfy the criterion through direct lookup or single-tool execution — it must integrate evidence across modalities, sources, or reasoning steps.

Heuristic: 3+ dimensions exercised

Applies when:
- Image evidence must be reconciled against tool output AND policy file
- Conditional logic depends on a value derived from one tool call AND a value from an image
- Multi-source reconciliation requires interpretation of mismatches

Does NOT apply when:
- The check requires only direct extraction from a single source (use 1)
- The check requires one dimension only (use 3)`,
    examples: [
      "Reconcile a receipt image against FinTrack transactions AND apply policy rules from a separate PDF",
      "Identify a chart anomaly that requires recognizing both the visual pattern and the contextual numeric thresholds",
      "Apply a conditional based on a value derived from a tool call AND a value from an image",
      "Compute a metric that aggregates evidence from email + calendar + handwritten note",
    ],
  },
  {
    level: "Medium Difficulty",
    score: 3,
    definition: `The model must do MORE than direct extraction but does not need full cross-modal coordination.

Heuristic: exactly 2 dimensions exercised

Applies when:
- Cross-modal interpretation is required from a single image (e.g., reading and reasoning about a chart)
- Multi-step reasoning is required from a single text source
- One reconciliation step between two sources
- One conditional or calculation derived from a single source

Does NOT apply when:
- The check is a direct copy/lookup (use 1)
- The check chains multiple dimensions (use 5)`,
    examples: [
      "Compare two text sources and surface a single mismatch",
      "Extract a value from an image and report it correctly",
      "Apply a single policy rule from an input file",
      "Compute a derived field from one direct source",
      "Identify which tool to use given a single conditional in the prompt",
    ],
  },
  {
    level: "Low Difficulty",
    score: 1,
    definition: `A criterion that verifies a mechanical, single-source check. The model only has to find a piece of information and report it correctly.

Heuristic: 0–1 dimensions exercised

Applies when:
- Direct value copy from the prompt or a single input file
- Literal verification against a source the criterion already references
- Format validation of a single field (e.g., date is YYYY-MM-DD)

Does NOT apply when:
- Any reasoning step is required (use 3)
- Cross-modal or cross-source coordination is required (use 3 or 5)

07/02 Note:
CLARIFICATION — "Literal verification against a source" means:
- The value was AUTHORED verbatim by a human (in the prompt, in a source
  document, in a raw data file) and the model must copy it as-is.
It does NOT mean:
- The value happens to appear in another output file (MEMORY.md, a
  summary artifact, a log) that was ITSELF produced via calc / verdict /
  margin. In that case, the model has to reproduce the underlying
  reasoning to write the value`,
    examples: [
      "Confirm a specific column exists in the output CSV",
      "Report a value that's directly stated in the prompt input",
      "Verify a literal value matches the source it came from",
      "Confirm a specific filename was created",
      "Confirm a tool was called with the correct argument",
    ],
  },
  {
    level: "Common failure mode",
    score: -5,
    definition: `A negative criterion targeting a failure the model is STRONGLY TEMPTED to commit because the task setup naturally pulls toward it. Avoiding the failure requires sustained discipline across multiple steps.

Heuristic: model defaults wrong without explicit guardrails

Applies when:
- A filename strongly suggests content the image does not actually contain — model is tempted to trust the filename
- A 'default' tool exists but the right tool is harder to discover

Does NOT apply when:
- The failure is rare in this universe (use -1)
- The failure is plausible but the model has signal pointing the right way (use -3)`,
    examples: [
      "Drafts the account-support email even when the conditional says don't",
      "Trusts filename 'parking_pothole.jpg' instead of inspecting the actual oil-stain image",
      "Uses the messaging tool when the prompt clearly directs to email but messaging is the default",
      "Repeats hallucinated data from a tool output when the task setup invites it",
    ],
  },
  {
    level: "Moderately Hard to Avoid",
    score: -3,
    definition: `A negative criterion targeting a failure that is a plausible default but the model has some signal pointing the right way. Avoiding the failure requires reading the prompt carefully.

Heuristic: model defaults wrong about half the time

Applies when:
- Wrong behavior is a plausible default given context
- The prompt provides enough signal that a careful model can avoid it
- The failure is common but not inevitable

Does NOT apply when:
- The task setup strongly pulls toward the failure (use -5)
- The failure is rare in this universe (use -1)`,
    examples: [
      "Includes an extra metric not asked for",
      "Over-formats the output beyond what the prompt specifies",
      "Fabricates a column header when the schema is partly underspecified",
      "Adds an unrequested verification step that bloats the output",
      "Mentions a conditional branch that doesn't apply",
    ],
  },
  {
    level: "Rare failure mode",
    score: -1,
    definition: `A negative criterion targeting a failure the model almost never commits unprompted. The difficulty of avoidance is low.

Heuristic: model rarely does this anyway

Applies when:
- The wrong behavior is uncharacteristic for the model
- The failure is theoretically possible but uncommon
- A penalty exists mainly for completeness rather than active avoidance

IMPORTANT: If a failure is RARE but DAMAGING (e.g., the model leaking a password), do NOT inflate to -5. Encode the damaging failure as a unit test (mechanical pass/fail) instead. The negative-weight slot is reserved for ATTRACTIVE wrong paths the model has to resist.

Does NOT apply when:
- The failure is plausibly tempting in this task setup (use -3)
- The task setup strongly invites the failure (use -5)`,
    examples: [
      "Invents a brand-new tool that doesn't exist in the loadout",
      "Writes the output in a completely wrong format (e.g., XML when CSV was asked)",
      "Fabricates a person's name out of thin air",
      "Produces a deliverable in the wrong language entirely",
      "Calls a tool that has no relation to the task",
    ],
  },
];

/* ---------- Appendix: Rubric Quality Definitions ---------- */

export type IssueSeverity = "Major" | "Moderate" | "Minor";

export interface RubricQualityIssue {
  severity: IssueSeverity;
  name: string;
  definition: string;
}

export const rubricQualityIssues: RubricQualityIssue[] = [
  {
    severity: "Major",
    name: "Missing Criteria - Critical Requirements",
    definition: `Definition:
Count each missing rubric that ought to check for an explicit requirement in the prompt or a critical implicit expectation of the prompt as one issue (critical = you cannot imagine a good response without it)


ADDED 03/25
CBs are expected to provide up to 5 spot checks if there are sufficiently similar outcomes as well as add a criterion to check the volume of the outcomes.
- If there are more than 5 spot checks for a group, use the [Non-Fail - Too Many Spot Checks] category.
- Each missing volume check would count as a missing criteria
- Each group’s missing spot checks would count as a singular missing criteria

Example 1:
Output: provides 200 emails
Rubric: Has 3 criteria that check random emails among the list + a criterion that checks that “the model sends at least 200 replies”

04/06 NOTE: Remember that the rubric is one-half of the verification suite—you should also consider unit test coverage when determining whether a requirement is fulfilled. The fundamental concept is that unit tests should cover binary, “mechanical” assertions, while the rubric is intended to capture more nuanced details which cannot easily be verified by unit tests. Do not penalize a “missing criterion” if it is included within the unit tests, unless there is an important qualifier of the request that cannot be assessed mechanically via unit testing.
Example:
Acceptable:
Prompt: “Send a message to my mom.”
Rubric: Has no criteria regarding this message.
Unit test: Checks if a message was sent to the user’s mom.
The rubric should not be penalized for “missing criteria” since this is captured by the unit test.

Penalizable:
Prompt: “Send a message to my mom telling her that I really loved her cookie recipe.”
Rubric: Has no criteria regarding this message.
Unit test: Checks if a message was sent to the user’s mom.
This can be penalized for “missing criteria” since there should be a criterion to check the actual content of the user’s message—the cookie recipe.

Note 07/02:
ANTI-DOUBLE-COUNT RULE:
A requirement is NOT missing if:
- Another criterion in the rubric already checks the same requirement at a different granularity (e.g., section identity pinned by criterion A, section content graded by criterion B — do not flag "missing check for content in section A" separately)
- Wording latitude on an existing criterion covers the correct content; the fix is one tightening pass on that criterion, not N new "missing" entries
- The prompt permits optionality (e.g., "the model may pick any of the flagged issues") — optionality is a valid authoring choice, not a missing check`,
  },
  {
    severity: "Major",
    name: "Criteria Not Self Contained",
    definition: `Definition:
Criterion cannot be evaluated against the model response without access to the prompt, reference text, other criteria, and/or external facts/information

Every rubric must be self-contained. Imagine that you only have access to the model response (including its trajectory 03/25) and are trying to evaluate if it fulfilled the rubric item. Will you be able to evaluate accurately without referencing anything else? Some criteria are self-explanatory but often, this translates to the criteria mentioning the answer to the prompt directly.

Examples of criteria that are not self-contained:
Example 1: “Response identifies the first president of the USA"
Fixed: "Response identifies the first president of the USA as George Washington"

Example 2: “The response addresses the bug mentioned in the prompt"
Fixed: "The response addresses the bug where the submit button doesn't work"

Note 06/03: Contents of input files are considered external information for the purposes of self-containment. I.e., if they must be referenced in order to evaluate a given criterion, that criterion is not self-contained.
Example
Not self-contained: "xyz.csv includes the first non-header row of the table in abc.png"
Self-Contained: "xyz.csv includes the first non-header row of the table in abc.png, "John Smith","123-456-7890","$300""`,
  },
  {
    severity: "Major",
    name: "Criteria Not Atomic - Major",
    definition: `Definition:
Criterion groups two or more constraints that are completely unrelated, which results in a rubric item with no clear focus on what aspect of the response it's trying to evaluate. These constraints cannot be interpreted as part of a single coherent instruction but reads more like a dump of requirements.

Each rubric should evaluate one thing only — no bundling of multiple behaviors. Ask yourself if the criterion is evaluating more than one idea.

NOTE: Rubrics in this project are limited in length and assess large trajectories. Criteria may assess multiple parts of the trajectory, as long as the assessment concerns related components, i.e., could be unified under one general idea.

05/25 NOTE: CBs are recommended to include a "schema check" criterion in their rubrics that may otherwise seem somewhat non-atomic. These criteria should not be penalized for atomicity.
    Example of a Schema Check criterion:
        gabriela_listing_audit.csv parses as a CSV file and contains the columns
        property_address, issue_type, severity, universe_source,
        uploaded_media_source, listing_or_note_claim,
        observed_visual_condition, and recommended_follow_up.`,
  },
  {
    severity: "Major",
    name: "Incorrect Criteria",
    definition: `Definition:
- Criterion checks for something that does not align with prompt requirements
- Criterion contains a factual error or a misleading point
    - Example: "The response implements a sorting algorithm that runs in O(nlogn), such as selection sort"
- Criterion is not an explicit requirement in the prompt and implementing it makes the response worse
- Criterion is not at all related to the requests in the prompt

NOTE: Before classifying any issue as “Incorrect criteria”, see if a different, more specific error category would apply. For example, if a criterion is overly specific, you could argue that it’s “incorrect”, but it should still be counted as “Overfitting and Underfitting”.`,
  },
  {
    severity: "Moderate",
    name: "Missing Criteria — Non-critical Requirements",
    definition: `Definition:
Count each missing rubric that ought to check for a non-critical explicit requirement or implicit expectation of the prompt as one issue (critical = you cannot imagine a good response without it)

Example non-critical requirements: “Use bold text”, “Use bullet points”

04/06 NOTE: Remember that the rubric is one-half of the verification suite—you should also consider unit test coverage when determining whether a requirement is fulfilled. The fundamental concept is that unit tests should cover binary, “mechanical” assertions, while the rubric is intended to capture more nuanced details which cannot easily be verified by unit tests. Do not penalize a “missing criterion” if it is included within the unit tests, unless there is an important qualifier of the request that cannot be assessed mechanically via unit testing.
Example:
Acceptable:
Prompt: “Send a message to my mom.”
Rubric: Has no criteria regarding this message.
Unit test: Checks if a message was sent to the user’s mom.
The rubric should not be penalized for “missing criteria” since this is captured by the unit test.

Penalizable:
Prompt: “Send a message to my mom telling her that I really loved her cookie recipe.”
Rubric: Has no criteria regarding this message.
Unit test: Checks if a message was sent to the user’s mom.
This can be penalized for “missing criteria” since there should be a criterion to check the actual content of the user’s message—the cookie recipe.`,
  },
  {
    severity: "Moderate",
    name: "Overlapping/Redundant Criteria (UPDATED 03/03)",
    definition: `Definition:
Criterion that is either completely redundant because other criteria completely encompass the former or multiple criteria that check for the same thing partly
This can also apply to criteria which have direct semantic overlap with oppositely weighted criteria.
E.g., “The agent only references information obtained from tool calls” (positive) and “The agent references information external to tool call outputs” (negative)
These criteria are essentially evaluating the same aspect—just with different weight polarities.

Count each completely redundant criteria as one moderate issue or count multiple overlapping criteria as one moderate issue

Redundant Scenario:
Criteria 1: Response does a, b, c
Criteria 2: Response does a, b

Overlap Scenario:
Criteria 1: Response does a, b, c
Criteria 2: Response does b, c, d

Note that this applies to cases where two criteria independently assess the same elements, not when a single criterion introduces and specifies related requirements. ("The response follows best code practices by ensuring that each line is under 79 characters" is acceptable.)

NOTE: For criteria pertaining to the Desired Outcome, see “Overlapping or Redundant Criteria - Desired Outcome” (major issue, above) instead. 03/03`,
  },
  {
    severity: "Moderate",
    name: "Overfitting and Underfitting",
    definition: `Definition:
Overfitting: Criteria that are overly specific, inflexible or too rigid - they incorrectly reject a subset of valid implementations
Underfitting: Criteria that are overly broad, permissive or loose - they accept valid implementations, but also incorrectly accept invalid implementations too

Criteria must be flexible enough to accept different valid implementations. Note that criteria can mention specific answers as long as they are provided as examples in any way. i.e. within parentheses, or along with “for example” wording, or any other form of not limiting the answer.

Conversely, criteria must not be too permissive or overly broad, such that they would also accept invalid implementations along with valid implementations.

07/02 Notes:
A criterion is NOT OVERFIT if:
- The prompt / audio / memo explicitly requires the check (verbatim, paraphrased, or by clear implication)
- The check reproduces content already named or quoted in the source (e.g., prompt says "include example wording from the emails" → criterion checks the real flagged phrase, this is not overfitting, it's the standard way to verify the requirement)
- The check is a "one representative per group" pattern where the source requested representatives (e.g., one example quote per section)

A criterion is NOT underfit when:
- The source says "capture the content" / "include the information" / "reflect the section" — semantic space is intentional here.
- The section identity or structural anchor is pinned by ANOTHER criterion in the rubric (e.g., criterion A checks the section title verbatim; criterion B may check the section's content with wording latitude, since A already locks the identity).
- The wording latitude is bounded by other criteria in the set (e.g., a schema-check criterion pins column names; the value-check criterion can allow value latitude).

WHEN FLAGGING AS OVERFITTING:
- Cite the specific line/section of the prompt / audio / memo the criterion goes beyond. If you can't cite it, the flag can't stand.

UNDERFITTING vs. WORDING LATITUDE:
- Wording latitude in a criterion is only underfitting if the source explicitly says "exactly as written" / "verbatim" / "word for word".
- If the source says "capture the content" or "include an example", the criterion may allow semantic space without being underfit.`,
  },
  {
    severity: "Moderate",
    name: "Subjective Criteria",
    definition: `Definition:
Criteria that are subjective, vague or immeasurable (e.g., “the response should have good formatting” or “code must be optimal”)

A criterion should be evaluated based on whether its primary requirement is measurable, even if it includes additional context or reasoning that's less precise
Using vague or subjective qualifiers like “appropriate”, “properly”, “best practices”, “reasonable” etc without attaching explicit definitions makes criteria unmeasurable and should be flagged here.

Subjectivity with certain details should be acceptable when the prompt is intentionally ambiguous and open-ended
For example, for a prompt "Create an artistic website to showcase my sculptures, featuring an animated background that looks like shifting, fluid marble", the following rubric is acceptable: "The website has a refined modern look so it could be launched as a product by a reputable company."`,
  },
  {
    severity: "Moderate",
    name: "Incorrect Weights - Major (REINSTATED 03/10)",
    definition: `Definition:
Criteria that are objectively incorrectly weighted by two levels, e.g., 1 is selected when 5 is appropriate or vice versa

Criteria are categorized into one of 6 weight buckets: 5/3/1/-1/-3/-5, see the table below for descriptions and examples of each weight category.

06/08 NOTE: Weights should reflect the difficulty of the thing the verifier is testing, NOT importance to responding to the prompt.`,
  },
  {
    severity: "Moderate",
    name: "Criteria Not Atomic - Minor",
    definition: `Definition:
Criterion groups two or more constraints that are only partially related. You can think of all of these constraints as part of one coherent instruction.

Each rubric should evaluate one thing only — no bundling of multiple behaviors. Ask yourself if the criterion is evaluating more than one idea.

NOTE: Rubrics in this project are limited in length and assess large trajectories. Criteria may assess multiple parts of the trajectory, as long as the assessment concerns related components, i.e., could be unified under one general idea.

05/25 NOTE: CBs are recommended to include a "schema check" criterion in their rubrics that may otherwise seem somewhat non-atomic. These criteria should not be penalized for atomicity.
    Example of a Schema Check criterion:
        gabriela_listing_audit.csv parses as a CSV file and contains the columns
        property_address, issue_type, severity, universe_source,
        uploaded_media_source, listing_or_note_claim,
        observed_visual_condition, and recommended_follow_up.`,
  },
  {
    severity: "Moderate",
    name: "Double Negative",
    definition: `Definition:
A negative criteria penalizes something absent from the response instead of rewarding an equivalent thing being present

Example: “The response does not do ABC” weighted as -1, -3, or -5.`,
  },
  {
    severity: "Minor",
    name: "Incorrect Weights - Minor (REINSTATED 03/10)",
    definition: `Definition:
Criteria that are objectively incorrectly weighted by one level. e.g, 1v3 or 3v5 scenarios

Criteria are categorized into one of 6 weight buckets: 5/3/1/-1/-3/-5, see the table below for descriptions and examples of each weight category.

06/08 NOTE: Weights should reflect the difficulty of the thing the verifier is testing, NOT importance to responding to the prompt.`,
  },
  {
    severity: "Minor",
    name: "Miscategorized Criteria (Updated 06/17)",
    definition: `Definition:
Criteria are objectively tagged with the wrong category only when there is a clearly better one available and the chosen category does not reasonably apply. When more than one category could fit, any of the applicable categories is acceptable. CBs are allowed to select the closest category if none of the available ones perfectly apply.

List of Categories and defnitions
Task Completion: Was the core goal achieved?

Ask: "If this item fails, did the agent fail the main thing the user wanted?" If yes → Task Completion.
The deliverable itself: a file that should exist, a record that should be created, content that should be produced.
vs Instruction Following: Task Completion is the what they came for; Instruction Following is a constraint on how. "Produced the expense report" = Completion. "Report is in .xlsx not .csv" = Instruction Following.
vs Tool Use: Completion is the result; Tool Use is the method. "The 3 reservations are cancelled" = Completion. "Used the booking system to do it" = Tool Use.

Instruction Following: Was an explicit constraint from the prompt obeyed?

Ask: "Is this item only here because the user specifically said so?" If the requirement came from the prompt's wording (format, count, scope, exclusion, deadline) rather than the task's nature → Instruction Following.
Test: remove the user's stated constraint — does the item still matter? If no, it's Instruction Following, not Completion.
These are typically the most "arbitrary"-looking items, because they encode user preference, not task logic.

Factuality & Hallucination: Did the agent invent something unsupported?

Ask: "Is this item about content that has no basis in the tools, inputs, or service state?" If it's catching fabrication → here.
Always framed as an absence: "does NOT state a figure absent from the data," not "states the correct figure" (the latter is Task Completion).
Tie-breaker: if you're checking correctness against a known source, that's Task Completion. If you're checking that nothing was conjured from nowhere, that's Factuality.

Tool Use: Did the agent draw on the right capability?

Ask: "Is this item about the agent reaching for a real tool/skill rather than guessing or text-generating?" If yes → Tool Use.
Phrase as intent, never a named call. "Grounds the answer in the system of record" ✓ / "Calls buildium_get_unit" ✗.
Tie-breaker vs Agent Behavior: Tool Use is that it used a tool at all / the right kind; Agent Behavior is whether the sequence and choices were sensible.

Agent Behavior: Was the reasoning path sound?

Ask: "Is this item about how the agent went about it — order, efficiency, restraint, judgment?" If yes → Agent Behavior.
Sequencing ("checks pricing before quoting"), escalation ("hands off rather than acting alone"), restraint ("doesn't loop," "doesn't query other users' records"), efficiency ("no redundant steps").
Tie-breaker vs Safety: Agent Behavior is good process; Safety is specifically irreversibility and disclosure. "Verified before responding" = Behavior. "Confirmed before deleting" = Safety.

Safety & Boundaries (when applicable): Did the agent respect irreversibility and minimal disclosure?

Ask: "Could the wrong move here cause irreversible harm or leak sensitive info?" If that's the stakes → Safety.
Three signatures: confirmation before destructive actions; asking for the minimum info needed (over-18 vs exact birth date); not over-sharing sensitive data (account numbers, PII).
Tie-breaker: if the concern would exist even with no risk of harm, it's probably Agent Behavior; Safety is reserved for items where the risk is the point.`,
  },
];
