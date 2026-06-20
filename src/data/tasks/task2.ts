import type { Task } from "../types";

const task2: Task = {
  meta: {
    id: "task2",
    serviceId: "6a17cc59ea9a7319a6ca06cd",
    title: "Asset Allocation Case Study Deck",
    category: "Visual Learning",
    subcategory: "Lab/Fieldwork Documentation",
    universe: "aaliyah_jenkins",
    personaName: "Aaliyah Jenkins",
    oneLiner:
      "Build an asset allocation case study deck from a messy note and reference images, with deterministic 20-year compounding, then schedule a mentor review and email the deck.",
    difficulty: "Very Hard",
    outputType: "asset_allocation.pptx (7 slides) + calendar event + email",
    modalities: ["Handwritten note", "Returns screenshot", "Portfolio chart", "Risk pyramid", "Markdown spec"],
    status: "Golden",
  },
  assetRoot: "tasks/task2",
  personaDocPath: "tasks/task2/artifacts/persona_context.md",
  personaPrompt:
    "Hey, I need to get familiar with Aaliyah Jenkins's background and situation. Could you help me understand the key aspects of her profile, such as her occupation, personal relationships, interests, ongoing projects, and any other relevant context that would help me better understand her day-to-day life, responsibilities, and priorities?",

  personaHighlights: [
    { label: "Role", value: "Level 2 Teller at Scioto Valley Community Bank, Columbus" },
    { label: "Finances", value: "A careful budgeter with a Fidelity 401k and a house fund" },
    { label: "Family", value: "Husband Leonard, plus two kids (Marcus 8, Zoe 5)" },
    { label: "Mentor", value: "Carlton Davis, a retired ops manager at her bank who reviews her work" },
  ],

  brainstorm: [
    {
      title: "Asset Allocation Case Study",
      body: "Build an advanced PowerPoint draft for a self directed asset allocation study: a realistic case study with correct long term calculations, strict formatting, and a mentor review workflow.",
      chosen: true,
      why: "It stays naturally aligned with the assigned Visual Learning, Lab/Fieldwork Documentation category. A self learner gathers media (a handwritten note, a returns screenshot, charts), uses it to understand a topic, and documents it into a study artifact. It is grounded in Aaliyah's real profile: she is a careful budgeter who keeps a 401k and works inside a bank every day, so studying asset allocation on her own and documenting it is believable without inventing any credential she does not have. It also leaves room for genuine complexity. The agent has to read a messy note, interpret financial diagrams, calculate long term outcomes, document them into the deck, find the right mentor contact (Carlton Davis, a real universe contact), infer the review time from a calendar pattern, and send it.",
    },
    {
      title: "Open House Comparison Study",
      body: "Document the homes Aaliyah and Leonard are touring into a visual comparison study. Gather listing screenshots, walkthrough photos, and her handwritten notes from each open house, then organize them into a structured deck that records the condition, layout, and price she observed at every property.",
      chosen: false,
    },
    {
      title: "Recipe Technique Study Log",
      body: "Turn the photos and handwritten notes from one of her weekend recipe shoots into an illustrated technique log. Document each stage of the dish with its visual and her tasting notes, building a reference she can study and reuse for her cooking channel.",
      chosen: false,
    },
  ],

  realityFirst: [
    "Would a bank teller really study asset allocation on her own and document it? Yes. Aaliyah keeps a 401k, budgets carefully, and works inside a bank, so the topic is native to her life and needs no invented credential to be believable.",
    "For the study to feel real, the source material has to look gathered on the fly: a value jotted on paper, a returns screenshot, a couple of charts, rather than a clean spreadsheet someone prepared for the agent.",
    "For the work to be genuine reasoning instead of transcription, the data has to live in the visuals. The right rows and columns must be picked out of a busy returns table, and asset classes mapped to risk tiers from a separate diagram.",
    "For the math to be a true test, the horizon has to be one continuous 20-year chain and the contribution version has to build on the prior phase, so a 'two separate decades' shortcut is wrong but tempting.",
    "For the workflow to extend past the file, the universe has to supply a real reviewer (Carlton) and a schedulable pattern (her team meeting), so the review and email are grounded rather than invented.",
  ],

  mmStrategy: [
    "presentation.md is the written specification. The exact slide titles, formatting rules, and per slide requirements act as the structural source of truth.",
    "asset_classes.md is a small table template, so the model has to follow a defined output shape for the growth tables instead of inventing one.",
    "A rough handwritten note (1000268298.jpg) carries the investor profile values, plus a stray inflation figure that nothing consumes.",
    "A decade returns screenshot holds ten decades and six columns. Only the 2010s and 2020s rows and the Stocks, Bonds, Housing, and Gold columns carry weight.",
    "A portfolio pie and an investment risk pyramid have to be reconciled. The model maps each asset to a risk tier rather than copying allocation percentages.",
    "Controlled friction is reasoning shaped, not perceptual: exact titles, a text only slide, an intentionally empty slide, two compounding assumptions, and a 100 word conclusion that has to keep the exact per asset values.",
  ],

  assets: [
    {
      filename: "1000268298.jpg",
      src: "mm_input/1000268298.jpg",
      kind: "handwritten",
      role: "ssot",
      whatItShows:
        "A rushed handwritten note: Initial amount $5,000, Monthly contribution $300, Risk tolerance with 'Moderate' struck through and 'Medium' left as the valid value, plus a stray 'Assumed w/ inflation rate 2.6%' that no slide or calculation uses.",
      verdict: "Source of the Slide 2 investor profile values. Read it, do not paste it.",
      rationale:
        "The note supplies the profile numbers, but it is deliberately not fully load bearing. The inflation figure feeds nothing, and 'Moderate' is crossed out. A correct solution recognizes which values matter and never copies the note image into the deck.",
      tags: ["SSOT", "profile values", "strike-through", "stray figure"],
    },
    {
      filename: "Screenshot_2026-05-01 232933.jpg",
      src: "mm_input/Screenshot_2026-05-01 232933.jpg",
      kind: "image",
      role: "correct",
      whatItShows:
        "A decade by decade average annual return table: ten rows (1930s to 2020s) and six columns (Stocks, Cash, Bonds, Housing, Gold, Inflation).",
      verdict: "Source of the 2010s and 2020s returns for Stocks, Bonds, Housing, and Gold.",
      purpose: "Slide 4 returns",
      rationale:
        "Most of the table is noise. The model has to select only two rows (2010s, 2020s) and four of the six columns, since Cash and Inflation are not part of the portfolio. This is where the task is genuinely multimodal.",
      tags: ["returns", "row/column selection"],
    },
    {
      filename: "portfolio.jpg",
      src: "mm_input/portfolio.jpg",
      kind: "image",
      role: "correct",
      whatItShows:
        "A 'Diversified Portfolio Allocation' pie chart: Stocks 50%, Bonds 30%, Housing 15%, Gold 5%.",
      verdict: "Source of the Slide 3 allocation percentages.",
      purpose: "Slide 3 allocation",
      rationale:
        "Provides the allocation split that Slide 3 reports and that the portfolio level reasoning depends on. Read it from the chart rather than the prompt text.",
      tags: ["allocation", "Slide 3"],
    },
    {
      filename: "risk.png",
      src: "mm_input/risk.png",
      kind: "image",
      role: "correct",
      whatItShows:
        "An investment risk pyramid with four tiers (Foundation, Secure, Growth, Speculative) listing the instruments that belong to each.",
      verdict: "Source of each asset's risk tier on Slide 3.",
      purpose: "Slide 3 risk tiers",
      rationale:
        "The model has to map each portfolio asset to a tier (Stocks to Growth, Bonds to Secure, Housing to Growth, Gold to Speculative) instead of copying the allocation percentages. It connects asset classes to risk categories, a reconciliation step rather than a lookup.",
      tags: ["risk tiers", "mapping"],
    },
  ],

  captions: [],

  prompt: `Last few weeks have been crazy and I want to finish my asset allocation presentation within the next 10 days. Between work and everything else going on at home, I haven't had the chance to create even the draft. However, I have a solid idea on what I want it to look like.

I need your help materializing all this ideas into a file called asset_allocation.pptx. My idea for this presentation is to document a practical asset allocation case study of an investor who starts at age 25 and retires at 45 with the purpose to illustrate how correct asset allocation decisions can produce meaningful long-term outcomes in a 20-year horizon. I have updated some personal notes, images I had stored for reference and, more importantly, a presentation.md file detailing what should be covered in the presentation. I'm not expecting this to be the final version, but yes a very advanced one.

When you are done with the presentation, I'd like Carlton to take a quick look at it before moving into the final version. Set up a 15-minute review with him on Monday right after my regular team meeting and send the deck over, asking him to please take a look and share any thoughts.`,

  promptAnnotations: [
    {
      quote: "materializing all this ideas into a file called asset_allocation.pptx",
      meaning:
        "The deliverable is a real PowerPoint file with that exact name. The structural rules live in presentation.md, not in the prompt.",
    },
    {
      quote: "a presentation.md file detailing what should be covered",
      meaning:
        "presentation.md is the source of truth for slide titles, formatting, and per slide content. The prompt stays high level and the spec carries the detail.",
    },
    {
      quote: "personal notes, images I had stored for reference",
      meaning:
        "The note and images supply values to reason over. They are reference inputs, not slide content to paste in.",
    },
    {
      quote: "starts at age 25 and retires at 45 … a 20-year horizon",
      meaning:
        "The compounding has to span one continuous 20-year period (2010 to 2029), not two isolated 10-year examples.",
    },
    {
      quote: "Set up a 15-minute review with him on Monday right after my regular team meeting and send the deck over",
      meaning:
        "Two state changes. Infer the time from the team meeting pattern, create a 10:00 to 10:15 calendar event with Carlton, and email him the deck.",
    },
  ],

  deliverableTree: {
    name: "OUTPUT",
    type: "folder",
    children: [
      {
        name: "asset_allocation.pptx",
        type: "folder",
        children: [
          { name: "Slide 1: Asset Allocation - The Long-Term Power of Diversification", type: "doc", note: "exact title plus a relevant topic image" },
          { name: "Slide 2: Investor Profile", type: "doc", note: "age 25 to 45, $5,000 initial, $300/mo, risk tolerance medium" },
          { name: "Slide 3: Portfolio & Risk Level", type: "doc", note: "Stocks 50% (Growth), Bonds 30% (Secure), Housing 15% (Growth), Gold 5% (Speculative); text only" },
          { name: "Slide 4: Long Term Projections", type: "doc", note: "returns table plus initial only growth: Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33" },
          { name: "Slide 5: The Power of Consistency - When Everything Changes", type: "doc", note: "disclaimer plus $300/mo growth: Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59" },
          { name: "Slide 6: Risk & Return Analysis", type: "doc", note: "intentionally empty" },
          { name: "Slide 7: Recommendation & Conclusion", type: "doc", note: "100 words or fewer, states the four Slide 5 per asset final values" },
        ],
      },
      {
        name: "Calendar event",
        type: "doc",
        note: "Carlton Davis review on Mon 8 Jun 2026, 10:00 to 10:15 AM",
      },
      {
        name: "Email",
        type: "doc",
        note: "to c.davis.columbus@outlook.com, asset_allocation.pptx attached, asks him to take a look and share thoughts",
      },
    ],
  },

  gtfaView: {
    kind: "deck",
    artifactName: "asset_allocation.pptx",
    slides: [
      { n: 1, title: "Asset Allocation: The Long-Term Power of Diversification", body: "Exact title plus a relevant image illustrating the topic." },
      { n: 2, title: "Investor Profile", body: "Age 25 to 45, $5,000 initial, $300/mo, risk tolerance medium. Transcribed from the note, not pasted." },
      { n: 3, title: "Portfolio & Risk Level", body: "Stocks 50% (Growth), Bonds 30% (Secure), Housing 15% (Growth), Gold 5% (Speculative). Text only." },
      { n: 4, title: "Long Term Projections", body: "Returns table plus initial only growth chained across the decade: Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33." },
      { n: 5, title: "The Power of Consistency: When Everything Changes", body: "Single asset disclaimer plus $300/mo growth: Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59." },
      { n: 6, title: "Risk & Return Analysis", body: "Intentionally left empty. Title only, no body content of any kind.", empty: true },
      { n: 7, title: "Recommendation & Conclusion", body: "100 words or fewer, stating the four Slide 5 per asset final values." },
    ],
    stateChanges: [
      { kind: "calendar", title: "Carlton review event", detail: "Mon 8 Jun 2026, 10:00 to 10:15 AM, inferred from her regular team meeting pattern." },
      { kind: "email", title: "Email to Carlton", detail: "To c.davis.columbus@outlook.com with asset_allocation.pptx attached, asking him to take a look and share thoughts." },
    ],
  },

  memory: [],
  removed: [],

  email: {
    to: ["c.davis.columbus@outlook.com"],
    points: [
      "Attach asset_allocation.pptx.",
      "Ask Carlton to take a look and share any thoughts before the final version.",
    ],
  },

  silver: [
    {
      n: 1,
      label: "Fix the compounding across the full 20-year horizon",
      message:
        "Slides 4 and 5 are using the wrong compounding logic. Recalculate the 20-year horizon as two continuous phases: compound from January 2010 through December 2019, then use that ending balance as the starting balance from January 2020 through December 2029. On Slide 4 the initial only values should be Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, and Housing $14,963.33. On Slide 5 compound the $300 monthly contributions on a monthly basis within each decade, carrying the first decade's ending balance forward, to reach Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, and Housing $157,407.59.",
      fixes:
        "Chains the two decades instead of compounding each from $5,000, and corrects the contribution math. This is the highest weight failure the task was built to elicit.",
    },
    {
      n: 2,
      label: "Clean up the deck and the conclusion",
      message:
        "Remove the reference images that were pasted in just because they were uploaded. The handwritten note and the risk pyramid are inputs to reason over, not slide content, so Slide 1 needs a relevant topic image and Slide 2 should carry the transcribed profile values only. Then rewrite the Slide 7 conclusion in 100 words or fewer, stating the four per asset final values from Slide 5 instead of a single blended portfolio total.",
      fixes:
        "Separates using an input from copying an input, and restores the per asset numbers the conclusion has to report.",
    },
    {
      n: 3,
      label: "Continue refining",
      message: "Additional follow-ups guide the model through the remaining issues: the asset_classes.md table format, the font sizes, and the Slide 5 layout crowding.",
      fixes: "Each follow-up targets a specific observed gap until the deck matches the GTFA.",
    },
    {
      n: 4,
      label: "Correct solution reached",
      message: "Correct solution reached. The deck and both state changes now match the Ground Truth Final Answer.",
      fixes: "End state: a verified correct trajectory, restored from seed and never started fresh.",
    },
  ],

  unitTests: [
    {
      ref: "test_output_contains_asset_allocation_pptx",
      logic: "Verifies the deck file asset_allocation.pptx exists in the workspace.",
      group: "Presentation structure",
      code: `def test_output_contains_asset_allocation_pptx():
    """The deck file exists in the workspace."""
    assert _find_pptx() is not None, "Missing asset_allocation.pptx"`,
    },
    {
      ref: "test_presentation_has_seven_slides",
      logic: "Verifies the deck has exactly seven slides.",
      group: "Presentation structure",
      code: `def test_presentation_has_seven_slides():
    """The deck has exactly the seven required slides."""
    assert len(_slide_titles()) == 7, "Deck does not have exactly 7 slides"`,
    },
    {
      ref: "test_presentation_slide_titles_match",
      logic: "Verifies each slide carries its expected title, in order.",
      group: "Presentation structure",
      code: `def test_presentation_slide_titles_match():
    """Each slide carries its expected title, in order."""
    expected = [
        "Asset Allocation - The Long-Term Power of Diversification",
        "Investor Profile",
        "Portfolio & Risk Level",
        "Long Term Projections",
        "The Power of Consistency - When Everything Changes",
        "Risk & Return Analysis",
        "Recommendation & Conclusion",
    ]
    titles = _slide_titles()
    for i, want in enumerate(expected):
        assert i < len(titles) and want in titles[i], f"Slide {i + 1} title missing: {want}"`,
    },
    {
      ref: "test_review_event_created_for_carlton",
      logic: "Verifies a review event with Carlton exists in the calendar.",
      group: "State changes",
      code: `def test_review_event_created_for_carlton():
    """A review event with Carlton exists in the calendar."""
    events = _workspace_state().get("calendar", [])
    assert any(
        "c.davis.columbus@outlook.com" in e.get("attendees", []) for e in events
    ), "No review event scheduled with Carlton"`,
    },
    {
      ref: "test_deck_emailed_to_carlton",
      logic: "Verifies the deck was emailed to Carlton.",
      group: "State changes",
      code: `def test_deck_emailed_to_carlton():
    """The deck was emailed to Carlton with the file attached."""
    outbox = _workspace_state().get("outbox", [])
    assert any(
        "c.davis.columbus@outlook.com" in m.get("to", "")
        and any("asset_allocation.pptx" in a for a in m.get("attachments", []))
        for m in outbox
    ), "Deck not emailed to Carlton"`,
    },
  ],

  rubricDesign: [
    {
      title: "Grounded, atomic, outcome based",
      body:
        "Every positive rubric maps back to a presentation.md rule or a prompt requirement, and checks one outcome: one slide, one value set, one state change. Nothing is graded that the spec or prompt did not ask for.",
    },
    {
      title: "Weights follow verification difficulty",
      body:
        "The heaviest weight goes to the two phase compounding, the one criterion that reconciles the screenshot returns, the 20-year horizon rule, and the chained balance methodology at once. A +3 covers single reasoning step requirements such as the contribution table, the conclusion values, the slide titles, and each state change. A +1 covers mechanical single source checks like color, font, and rounding.",
    },
    {
      title: "Deterministic math is objectively gradable",
      body:
        "Because the GTFA fixes exact final values, the Factuality rubrics check specific numbers rather than reasonable ones. The task has a single defensible answer, so a wrong calculation is unambiguously Not Present.",
    },
    {
      title: "Negatives target attractive wrong paths",
      body:
        "The negatives encode the tempting failures actually seen in the run: independent decade compounding, the wrong contribution compounding basis, pasting source images into the deck, and layout overlap. They penalize specific observed temptations rather than hypothetical ones, and stay outnumbered by the positives.",
    },
    {
      title: "Judge routing is text oriented",
      body:
        "Reading the note, the returns screenshot, the pie, and the pyramid is input perception, verified by the text judge against the model's written output. Only pixels the agent itself produces would route to the visual judge.",
    },
  ],

  rubrics: [
    {
      n: 1,
      text: "A PowerPoint file named `asset_allocation.pptx` exists.",
      points: 5,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Prompt: 'materializing all this ideas into a file called asset_allocation.pptx.'",
      status: "present",
      observed: "The model generated build_presentation.py and saved asset_allocation.pptx in the workspace.",
      rationale:
        "The foundational deliverable check. Without the named file, nothing downstream can be evaluated, so it carries the heaviest weight even though it is easy to satisfy.",
    },
    {
      n: 2,
      text: "The model correctly applies the color formatting requirements defined in `presentation.md`, using a dark navy (`#0D1B2A`) background throughout the presentation, white (`#FFFFFF`) text for all body content, and gold/amber (`#F0A500`) for slide titles, table headers, and highlighted values.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md: Formatting Requirements (background, text, accent colors).",
      status: "present",
      observed: "The build script set the navy background, white body text, and gold titles and headers exactly as specified.",
      rationale:
        "A mechanical single source formatting check pulled straight from the spec. Low weight because it is a direct copy of stated values.",
    },
    {
      n: 3,
      text: "The model correctly applies the font formatting requirements defined in `presentation.md`, using a sans serif font (e.g., `Calibri` or `Arial`), with slide titles sized at 28–32 pt, body text at 16–18 pt, and table text at 13–14 pt.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md: Font sizes (title 28 to 32pt, body 16 to 18pt, table 13 to 14pt).",
      status: "not-present",
      observed: "The font family (Calibri) was correct, but several text boxes fell outside the required size bands, so the criterion was scored Not Present.",
      rationale:
        "Even mechanical formatting has multiple conditions. Missing any one of them, the size bands here, fails the whole check and keeps the spec enforceable.",
    },
    {
      n: 4,
      text: "The model correctly rounds all monetary values and percentages appearing in `asset_allocation.pptx` to two decimal places (e.g., `13.40%`, ` $17,583.31`).",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md: all money and percentages to 2 decimals.",
      status: "present",
      observed: "The formatting helpers rendered every monetary value and percentage to two decimal places.",
      rationale:
        "A single source presentation rule. Low weight, but cheap to verify and easy for a model to overlook.",
    },
    {
      n: 5,
      text: "The model correctly titles the slides in `asset_allocation.pptx` as follows: Slide 1 `Asset Allocation - The Long-Term Power of Diversification`, Slide 2 `Investor Profile`, Slide 3 `Portfolio & Risk Level`, Slide 4 `Long Term Projections`, Slide 5 `The Power of Consistency - When Everything Changes`, Slide 6 `Risk & Return Analysis`, and Slide 7 `Recommendation & Conclusion`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md: 'Slide names are expected to be the exact ones provided here.'",
      status: "present",
      observed: "All seven titles matched the spec verbatim and in order.",
      rationale:
        "Exact titles anchor the per slide rubrics. Bundling all seven into one +3 check is justified because they are the same level of data entry against one rule.",
    },
    {
      n: 6,
      text: "`asset_allocation.pptx` contains a Slide 1 with the title `Asset Allocation - The Long-Term Power of Diversification` and a relevant image related to the covered topic.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 1: exact title plus a relevant topic image.",
      status: "not-present",
      observed: "Slide 1 carried the correct title but used the risk pyramid input (risk.png) as its cover image rather than a relevant illustration of the topic.",
      rationale:
        "Pairs the exact title with a content judgment, a relevant image, so reusing a reference input as decoration does not satisfy it.",
      whyCorrect:
        "This rubric is correct because it evaluates the Slide 1 requirements defined in 'presentation.md', including the exact expected title and the inclusion of an appropriate image related to the presentation topic.",
      whyImportant:
        "The user is expecting both the correct title and an appropriate image to be included, making this rubric highly necessary for verifying the correctness of Slide 1.",
      whatWrong:
        "The model included the 'risk.png' image with an unusual resize, even though that image was intended solely as reference material for determining the risk levels presented in Slide 3. Instead, the slide should have included an image selected by the model that was directly related to the overall topic of the presentation.",
    },
    {
      n: 7,
      text: "Slide 2 (`Investor Profile`) presents the investor profile with starting age 25, retirement age 45, initial investment `$5,000`, monthly contribution `$300`, and risk tolerance `medium`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 2 plus the handwritten note values.",
      status: "not-present",
      observed: "The values were present, but the model labeled risk tolerance 'Moderate - Medium', added an extra 'Investment Horizon' row, and pasted the note image, so the profile did not match the required form.",
      rationale:
        "Checks that the note's values are transcribed faithfully and cleanly. The 'medium' wording and the absence of extra content matter for an exact profile.",
      whyCorrect:
        "This rubric is correct because it evaluates whether the complete investor profile extracted from the handwritten notes is correctly translated into the expected presentation content and results.",
      whyImportant:
        "This rubric is necessary because it verifies that the messy handwritten information in '1000268298.jpg' was correctly interpreted and that the resulting investor profile is accurately reflected in Slide 2.",
      whatWrong:
        "The model made a mistake by treating the risk tolerance as 'Moderate - Medium', even though the handwritten note shows 'Moderate' crossed out and leaves 'Medium' as the only valid risk tolerance value.",
    },
    {
      n: 8,
      text: "Slide 3 (`Portfolio & Risk Level`) lists the portfolio and risk levels as Stocks `50% (Growth)`, Bonds `30% (Secure)`, Housing `15% (Growth)`, and Gold `5% (Speculative)`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "portfolio.jpg (allocation) reconciled with risk.png (tiers).",
      status: "present",
      observed: "Slide 3 mapped each asset to the correct tier (Stocks and Housing to Growth, Bonds to Secure, Gold to Speculative), matching the pyramid.",
      rationale:
        "Rewards the reconciliation across images. The allocations come from the pie, the tiers from the pyramid, and the two have to be joined rather than copied.",
    },
    {
      n: 9,
      text: "Slide 4 (`Long Term Projections`) includes the annual returns achieved by each asset class during the 2010s and 2020s decades: stocks (13.4%, 14.9%), gold (3.4%, 19.1%), bonds (4.1%, -0.6%), and housing (3.8%, 7.5%).",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Returns screenshot: 2010s and 2020s rows for Stocks, Bonds, Housing, Gold.",
      status: "present",
      observed: "The model selected the correct two rows and four columns from the screenshot and reported the returns table accurately.",
      rationale:
        "Confirms the multimodal selection step worked, pulling only the relevant rows and columns from a ten row, six column table.",
    },
    {
      n: 10,
      text: "Slide 4 (`Long Term Projections`) includes a compounded growth table showing final values of $70,518.14 for Stocks, $40,113.73 for Gold, $7,036.25 for Bonds, and $14,963.33 for Housing. The calculations are based solely on the initial investment amount and exclude any monthly contributions.",
      points: 3,
      category: "Factuality and Hallucination — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA Table 1: two phase compounding of the $5,000 lump sum.",
      status: "not-present",
      observed: "The model compounded each decade independently from $5,000, so its 2020s column never used the 2010s ending balance and the final values did not match the GTFA.",
      rationale:
        "The core factual check. Exact target values make a wrong methodology unambiguous, and this is where the heaviest negative also fires.",
      whyCorrect:
        "This rubric is correct because it evaluates whether the reported amounts are accurate and correctly account for compound growth across the full 20-year investment horizon use case the presentation is intended to cover.",
      whyImportant:
        "This rubric is necessary to ensure not only that the reported quantities are correct, but also that the overall user intent and the 20 year investment horizon the presentation is intended to represent are preserved.",
      whatWrong:
        "The model made a mistake by splitting the calculation by decade instead of carrying the compounded growth across the full 20-year horizon, which was the expected approach based on the user intent stated in multiple places, including the prompt and 'presentation.md'.",
    },
    {
      n: 11,
      text: "Slide 5 (`The Power of Consistency - When Everything Changes`) begins with a disclaimer clarifying that the monthly contribution calculations assume all contributions are invested entirely in the corresponding asset class rather than being diversified across the portfolio.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 5: disclaimer at the top of the slide.",
      status: "present",
      observed: "Slide 5 opened with the required single asset disclaimer.",
      rationale:
        "A low weight instruction following check. The disclaimer is a stated requirement that is simple to verify.",
    },
    {
      n: 12,
      text: "Slide 5 (`The Power of Consistency - When Everything Changes`) includes compounded growth table showing final values of $435,532.09 for Stocks, $382,237.75 for Gold, $83,632.72 for Bonds, and $157,407.59 for Housing. The calculations incorporate both the initial investment amount and the recurring monthly contributions.",
      points: 3,
      category: "Factuality and Hallucination — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA Table 2: chained two phase compounding with $300/mo contributions.",
      status: "not-present",
      observed: "The model's Slide 5 contribution totals did not match the GTFA values, because the compounding methodology applied to the recurring contributions was wrong.",
      rationale:
        "The second factual anchor. The wrong but plausible contribution math is exactly the attractive error the deterministic values are designed to catch.",
      whyCorrect:
        "This rubric is correct because it covers the exact amounts expected to be reported in Slide 5. Any deviation from those values would indicate either calculation errors or an incorrect application of the investment logic required by the request.",
      whyImportant:
        "This rubric is necessary to ensure that the correct values are reported in a critical section such as Slide 5, where the calculations are more complex and a high degree of accuracy is essential to fulfill user needs.",
      whatWrong:
        "The model reported Slide 5 values that result from compounding the annual return rates rather than monthly rates. As a result, the reported amounts do not reflect the monthly compounding approach implied by the investment scenario and the recurring monthly contribution structure.",
    },
    {
      n: 13,
      text: "The compounded growth tables in Slides 4 (`Long Term Projections`) and 5 (`The Power of Consistency - When Everything Changes`) follow the expected format defined in `asset_classes.md`, consisting of three columns (`Asset`, `Growth of $5,000 (2010s)`, and `Growth of $5,000 (2020s)`) for each portfolio asset.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "asset_classes.md: the three column growth table template.",
      status: "not-present",
      observed: "The Slide 5 table used four columns rather than the three column template, so the format check failed.",
      rationale:
        "Enforces the supplied table template so the model follows a defined output shape instead of inventing its own.",
      whyCorrect:
        "This rubric is correct because it checks whether the explicit guidelines for Slides 4 and 5 are correctly followed and whether the table formats defined in 'asset_classes.md' are properly applied in both slides.",
      whyImportant:
        "This rubric is necessary to ensure that the required table formats specified for Slides 4 and 5 are correctly followed and that the presentation adheres to the expected structure.",
      whatWrong:
        "The model made a mistake in Slide 5 by including an additional, never requested column named 'Total (20-Year)', which is highly redundant as it repeats the same value already represented by the amount after the full 20 year investment horizon.",
    },
    {
      n: 14,
      text: "Slide 6 is titled `Risk & Return Analysis` and contains no body content beyond the empty slide structure.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 6: 'Leave it empty.'",
      status: "present",
      observed: "Slide 6 was scored as satisfying the empty slide requirement. Any leftover placeholder such as '[Content to be added]' is treated as no content at all, the same as a truly empty slide.",
      rationale:
        "Tests whether the model respects a local 'do nothing here' instruction, a tempting one to violate, which is why it is weighted at +3. A placeholder is not meaningful content, so it counts as empty.",
    },
    {
      n: 15,
      text: "Slide 7 contains a conclusion of 100 words or fewer that explains how a 25-year-old investor starting with `$5,000`, contributing `$300` per month, and staying invested for 20 years can reach different outcomes by asset choice, explicitly highlights long-term discipline and compounding, and states the final values `Stocks $435,532.09`, `Gold $382,237.75`, `Bonds $83,632.72`, and `Housing $157,407.59`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 7: 100 words or fewer plus the exact per asset final values.",
      status: "not-present",
      observed: "The conclusion summarized a single portfolio weighted total instead of the four required per asset final values.",
      rationale:
        "Tests synthesis under a length limit without losing numeric fidelity. The exact per asset figures have to survive the compression.",
      whyCorrect:
        "This rubric is correct because it evaluates the expected conclusion for Slide 7, requiring the exact amounts obtained throughout to be reported correctly.",
      whyImportant:
        "This rubric is necessary to evaluate whether the model correctly reports all expected values in the final conclusion slide without introducing unsupported assumptions or additional figures, while also respecting the length requirement and staying under the 100 word limit.",
      whatWrong:
        "The model mistakenly incorporated information from the handwritten notes and the calculated amounts, while also including additional content that was never requested and differed from the expected information (net wealth created, total contributed, a final portfolio value, etc).",
    },
    {
      n: 16,
      text: "A calendar event is created for Monday, 8 June 2026, from `10:00 AM` to `10:15 AM`, with Carlton Davis (`c.davis.columbus@outlook.com`) for the presentation review.",
      points: 3,
      category: "Task Completion — State change",
      evalTarget: "State change",
      enforces: "Prompt: '15-minute review … on Monday right after my regular team meeting.'",
      status: "present",
      observed: "The model created the 15 minute review event at the correct date and time with Carlton.",
      rationale:
        "A real state change that also requires inferring the time from the team meeting pattern, not just creating any event.",
    },
    {
      n: 17,
      text: "An email is sent to `c.davis.columbus@outlook.com` with `asset_allocation.pptx` attached and asks Carlton to take a look and share any thoughts.",
      points: 3,
      category: "Task Completion — State change",
      evalTarget: "State change",
      enforces: "Prompt: 'send the deck over, asking him to please take a look and share any thoughts.'",
      status: "present",
      observed: "The model sent the email to Carlton with the deck attached and the review request.",
      rationale:
        "The second state change. It requires the right recipient, attachment, and message, verified against the workspace rather than the deck.",
    },
    {
      n: 18,
      text: "The model includes across the `asset_allocation.pptx` source images that were expected to be used as reference material for creating the slide content (e.g., handwritten note covering investor profile present in `1000268298.jpg`).",
      points: -3,
      category: "Agent Behavior — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Negative: reference inputs must inform the slides, not appear in them.",
      status: "present",
      observed: "The model pasted the handwritten note (1000268298.jpg) onto Slide 2 as a 'Source: Investor notes' thumbnail, and reused a reference image on Slide 1.",
      rationale:
        "Targets the attractive confusion between using an input and copying it. The inputs are there to be read, and embedding them is a specific undesired behavior worth a -3.",
      whyCorrect:
        "This rubric is correct because it captures an unexpected model behavior that represents a boundary the model should not cross: including images when they were neither requested nor naturally justified by the context of the presentation.",
      whyImportant:
        "This rubric is necessary to ensure that images intended solely for internal reasoning or as source material are not included in a professional presentation such as the one being created.",
      whatWrong:
        "The model included an unexpected image in Slide 1 and, in Slide 2, incorporated the handwritten note itself as presentation content even though it was intended only as a source of information for internal reasoning. While this was not explicitly stated, the user intent was sufficiently clear that the handwritten note was meant to inform the slide content rather than be included directly in the presentation.",
    },
    {
      n: 19,
      text: "The model compounds the 2010s and 2020s periods independently in the required calculations (Slides 4 and 5) within the context of a presentation intended to represent a 20-year investment horizon.",
      points: -5,
      category: "Agent Behavior — Trajectory",
      evalTarget: "Trajectory",
      enforces: "Negative: the two decades must be chained, not treated as separate runs.",
      status: "present",
      observed: "On Slide 4 the model compounded each decade independently from $5,000 rather than carrying the 2010s ending balance into the 2020s.",
      rationale:
        "The heaviest negative, because it is the most tempting wrong path. The decade labeled screenshot makes independent compounding feel correct.",
      whyCorrect:
        "Even if this could be interpreted as being partially covered by the outcome rubric, it is not. This rubric is necessary to capture a reasoning step where the model interpreted the instructions in a way that was never intended. Based on the prompt and the provided context, there was only one reasonable interpretation, making this behavior distinct and worthy of separate evaluation.",
      whyImportant:
        "This rubric is necessary because it validates a fundamental calculation assumption that directly affects all projections reported later in the presentation. Without confirming that the model compounds growth across the full 20-year horizon, the correctness of the reported values cannot be trusted.",
      whatWrong:
        "The model made a mistake by treating the 2010s and 2020s as independent investment periods in its calculations instead of carrying the ending value of the 2010s forward into the 2020s.",
    },
    {
      n: 20,
      text: "The model annually compounds both the initial lump sum and the recurring monthly contributions when calculating the values reported in Slide 5 (`The Power of Consistency - When Everything Changes`).",
      points: -3,
      category: "Agent Behavior — Trajectory",
      evalTarget: "Trajectory",
      enforces: "Negative: contributions must compound on the correct monthly basis, not annually.",
      status: "present",
      observed: "The Slide 5 contribution math did not apply the correct monthly compounding to the recurring contributions, so the reported totals were wrong.",
      rationale:
        "Captures the plausible but wrong contribution methodology distinctly from the per value Factuality check, so the methodology error is penalized on its own.",
      whyCorrect:
        "This rubric is correct because it evaluates a crucial calculation step required to produce reliable Slide 5 values. Even if the final amounts are covered by an outcome rubric, that alone is not enough, because the model must also apply the correct compounding logic to both the initial lump sum and the recurring monthly contributions.",
      whyImportant:
        "This rubric is necessary because the compounding methodology is a fundamental assumption driving all projections reported in Slide 5. Even if the final values are checked separately, a correct answer requires the model to apply the appropriate financial logic to recurring monthly contributions and long term growth calculations. Verifying this reasoning step ensures that the reported amounts are derived from the intended methodology rather than from coincidentally similar calculations or incorrect assumptions.",
      whatWrong:
        "The model made a mistake by using monthly compounding based on annual return rates when calculating the Slide 5 values instead of applying a monthly compounding approach based on monthly return rates. As a result, the calculations do not accurately reflect the recurring monthly contribution structure and long horizon investment scenario defined by the request.",
    },
    {
      n: 21,
      text: "Visual consistency in any of the slides is altered due to an uneven distribution of content (e.g., the disclaimer in Slide 5 overlaps with the slide title).",
      points: -1,
      category: "Agent Behavior — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Negative: content must be laid out without overlap or crowding.",
      status: "present",
      observed: "Slide 5's stacked disclaimer, table, and summary lines crowded the layout, and Slides 1 and 2 embedded images in ways that hurt readability.",
      rationale:
        "A light -1 for a cosmetic but real layout defect. Small enough that it discourages sloppiness without dominating the score.",
      whyCorrect:
        "This rubric is correct because it captures an important implicit expectation of the presentation. Even when the information itself is correct, poor content distribution or overlapping elements can significantly reduce readability and professionalism, impacting UX.",
      whyImportant:
        "This rubric is necessary because the user intent is centered around producing a professional presentation, where basic presentation and formatting standards are expected to be met.",
      whatWrong:
        "The model produced slides with uneven content distribution, resulting in formatting issues. For example, in Slide 5 the disclaimer overlaps with the slide title, creating a layout conflict that affects readability and visual consistency. Slides 1 and 2 also included images in a way that considerably damages UX.",
    },
  ],

  friction: [
    {
      id: "two-phase-horizon",
      title: "Decade labeled returns invite independent compounding",
      type: "perception",
      where: "Returns screenshot to Slide 4",
      description:
        "The screenshot labels returns by decade, so compounding each decade as a fresh $5,000 run looks reasonable. The prompt's 20-year horizon requires chaining, where the 2010s ending balance becomes the 2020s starting balance.",
      whyItWorks:
        "The intuitive reading is the wrong one, which is what makes the failure natural rather than forced. It is the task's highest weight trap.",
    },
    {
      id: "monthly-rate",
      title: "Two plausible ways to compound the contributions",
      type: "perception",
      where: "$300 contributions to Slide 5",
      description:
        "The monthly contributions can be compounded on an annual basis or on a genuine monthly basis. Only the monthly basis stays consistent with the recurring contribution structure and the annual returns the rest of the deck reports.",
      whyItWorks:
        "Both approaches produce confident looking totals, so the deterministic GTFA values are what separate the right method from the wrong one.",
    },
    {
      id: "screenshot-subset",
      title: "Ten decades and six columns, but only two rows and four columns matter",
      type: "mismatch",
      where: "Screenshot_2026-05-01 232933.jpg",
      description:
        "The returns table spans the 1930s to the 2020s and includes Cash and Inflation columns. Only the 2010s and 2020s rows and the Stocks, Bonds, Housing, and Gold columns carry weight.",
      whyItWorks:
        "Forces genuine selection across a multimodal source instead of copying a whole table. The difficulty lives in choosing the right cells.",
    },
    {
      id: "risk-mapping",
      title: "Risk tiers have to be mapped, not copied",
      type: "perception",
      where: "risk.png plus portfolio.jpg to Slide 3",
      description:
        "The pie gives allocation percentages and the pyramid gives risk tiers. The model has to map each asset to a tier (Stocks to Growth, Bonds to Secure, Housing to Growth, Gold to Speculative) rather than reusing the allocation numbers.",
      whyItWorks:
        "Connects two independent visual sources, testing reconciliation instead of a single image lookup.",
    },
    {
      id: "source-images",
      title: "Reference images are not slide content",
      type: "removable",
      where: "Handwritten note and charts versus the deck",
      description:
        "The note and reference charts supply values to reason over. None of them should be pasted into the deck. Slide 3 is explicitly text only, and Slide 2 should carry transcribed values rather than the note image.",
      whyItWorks:
        "Tests the distinction between using an input and copying an input, which models routinely blur when an image is uploaded.",
    },
    {
      id: "strike-through",
      title: "A struck through value on the note",
      type: "mismatch",
      where: "1000268298.jpg",
      description:
        "On the handwritten note the risk tolerance shows 'Moderate' crossed out with 'Medium' left as the valid value. A correct reading honors the strike through and records the tolerance as medium.",
      whyItWorks:
        "Tests whether the model honors an edit on the source rather than transcribing both words it can see.",
    },
    {
      id: "stray-inflation",
      title: "A figure on the note that nothing uses",
      type: "removable",
      where: "1000268298.jpg",
      description:
        "The handwritten note also lists an assumed inflation rate of 2.6% that no slide or calculation consumes. A correct solution recognizes it is not needed rather than forcing it into the deck.",
      whyItWorks:
        "A real jotted note is rarely perfectly load bearing, so the model has to judge relevance rather than transcribe everything it sees.",
    },
    {
      id: "empty-slide-6",
      title: "An intentionally empty slide",
      type: "perception",
      where: "presentation.md Slide 6",
      description:
        "Slide 6 (Risk & Return Analysis) has to be left empty except for its title. Models are tempted to fill it with a placeholder or explanatory text, and a placeholder still counts as a violation of leaving it empty.",
      whyItWorks:
        "Tests whether the model follows a local 'do nothing here' instruction against its instinct to populate every slide.",
    },
    {
      id: "conclusion-100",
      title: "Synthesis under a hard word limit",
      type: "perception",
      where: "presentation.md Slide 7",
      description:
        "The conclusion has to stay under 100 words while explicitly stating all four Slide 5 per asset final values, not a single blended portfolio total.",
      whyItWorks:
        "Pressures the model to compress without dropping numeric fidelity, where a portfolio weighted summary is the tempting shortcut.",
    },
  ],

  inputDocs: [
    {
      file: "presentation.md",
      label: "The per slide specification and formatting rules",
      markdown: true,
    },
    {
      file: "asset_classes.md",
      label: "The growth table template the deck must follow",
      markdown: true,
    },
  ],

  actualRun: {
    summary:
      "Single turn run from seed. The model wrote a build_presentation.py and produced asset_allocation.pptx with all seven titled slides, and it completed both the Carlton calendar event and the email. The surface looked right, but cross referencing the workspace script and the trajectory against the GTFA exposes where the deeper reasoning broke. Each finding below pins the expected behavior to what the model actually did and to the evidence for it.",
    layout: "compare",
    observations: [
      {
        id: "independent-decades",
        title: "20-year horizon compounded as two separate decades",
        outcome: "fail",
        rubrics: [10, 19],
        expected: "Chain the horizon: compound $5,000 through the 2010s, then carry that ending balance into the 2020s, reaching Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33.",
        what: "Slide 4 applied each decade's rate to the original $5,000 separately, so the 2020s column never used the 2010s ending balance and every final value was far below the GTFA.",
        evidence: "build_presentation.py: compound_growth(INITIAL, returns_2020s[asset], 10) called on $5,000, not on the first phase result.",
      },
      {
        id: "monthly-rate",
        title: "Wrong basis for compounding the contributions",
        outcome: "fail",
        rubrics: [12, 20],
        expected: "Compound the $300 monthly contributions on a monthly basis, chained across both phases, to reach Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59.",
        what: "Slide 5's contribution totals diverged from the GTFA because the compounding applied to the recurring contributions used the wrong basis.",
        evidence: "build_presentation.py: compound_growth_with_contributions() built the monthly rate from the annual rate rather than a true monthly rate.",
      },
      {
        id: "source-image",
        title: "Reference note pasted into the deck as content",
        outcome: "fail",
        rubrics: [18, 7],
        expected: "Read the handwritten note for the profile values only, transcribe them onto Slide 2 with risk tolerance 'medium', and embed no source image.",
        what: "The note image was added to Slide 2 as a 'Source: Investor notes' thumbnail, and the profile read 'Moderate - Medium' with an extra horizon row, so Slide 2 was Not Present and the -3 negative fired.",
        evidence: "build_presentation.py: slide2.shapes.add_picture(notes_img, …) and RISK_TOL = 'Moderate - Medium'.",
      },
      {
        id: "conclusion",
        title: "Conclusion collapsed to one blended figure",
        outcome: "fail",
        rubrics: [15],
        expected: "A Slide 7 conclusion of 100 words or fewer stating the four Slide 5 per asset final values explicitly.",
        what: "Slide 7 reported a single portfolio weighted final value instead of the four required per asset numbers.",
        evidence: "build_presentation.py: weighted_total = sum(final_values[a] * portfolio[a] / 100) surfaced as the headline figure.",
      },
      {
        id: "format",
        title: "Table format and font sizes off spec",
        outcome: "fail",
        rubrics: [3, 13],
        expected: "Follow the three column asset_classes.md template and the presentation.md font size bands (title 28 to 32pt, body 16 to 18pt, table 13 to 14pt).",
        what: "The Slide 5 table used four columns, adding a redundant 'Total (20-Year)' column, and several text boxes fell outside the required size bands.",
        evidence: "build_presentation.py: tbl5 built with four columns, and assorted Pt() sizes outside the spec bands.",
      },
      {
        id: "slide1-image",
        title: "Slide 1 reused a reference input as its cover",
        outcome: "fail",
        rubrics: [6],
        expected: "Slide 1 carries the exact title plus a relevant image illustrating the asset allocation topic.",
        what: "Slide 1 had the correct title but used the risk pyramid, a reasoning input, as the cover image.",
        evidence: "build_presentation.py: slide1 add_picture(os.path.join(INPUT_DIR, 'risk.png'), …).",
      },
      {
        id: "layout",
        title: "Slide 5 layout crowding",
        outcome: "fail",
        rubrics: [21],
        expected: "Lay out each slide without overlap or crowding.",
        what: "The stacked disclaimer, table, and multiple summary lines crowded Slide 5, breaking visual consistency.",
        evidence: "build_presentation.py: Slide 5 stacks a disclaimer, a table, and three summary text boxes with tight vertical offsets.",
      },
      {
        id: "state-changes",
        title: "Both state changes completed correctly",
        outcome: "pass",
        rubrics: [16, 17],
        expected: "Create the 15 minute Carlton review (Mon 8 Jun, 10:00 to 10:15) and email the deck to c.davis.columbus@outlook.com.",
        what: "Both the calendar event and the email with the deck attached were performed as required.",
        evidence: "Trajectory: calendar create and email send tool calls to c.davis.columbus@outlook.com with asset_allocation.pptx.",
      },
    ],
  },

  unitTestPreamble: `import sys
import subprocess
import importlib
import json
from pathlib import Path

# --- pytest auto-install ---
try:
    import pytest
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pytest"])
    pytest = importlib.import_module("pytest")

from pptx import Presentation

# --- directory config ---
TASK_DIR = Path(__file__).resolve().parent


def _search_bases():
    """Where to look for the agent's output files."""
    return [TASK_DIR / "workspace", TASK_DIR]


def _find_pptx(name="asset_allocation.pptx"):
    """Locate the agent's deck across the known output bases."""
    for base in _search_bases():
        candidate = base / name
        if candidate.is_file():
            return candidate
    return None


def _slide_titles():
    """Return the first non-empty line of text on each slide, in order."""
    pptx = _find_pptx()
    if pptx is None:
        return []
    titles = []
    for slide in Presentation(pptx).slides:
        title = ""
        for shape in slide.shapes:
            if shape.has_text_frame and shape.text_frame.text.strip():
                title = shape.text_frame.text.strip().splitlines()[0]
                break
        titles.append(title)
    return titles


def _workspace_state():
    """Load the recorded environment state (calendar + outbox)."""
    for base in _search_bases():
        candidate = base / ".openclaw" / "workspace-state.json"
        if candidate.is_file():
            return json.loads(candidate.read_text())
    return {}

# --- tests ---`,

  artifactDocs: [
    { label: "Persona context", file: "persona_context.md", description: "Full persona profile the contributor built from the universe." },
    { label: "Prompt", file: "prompt.md", description: "The final user facing prompt." },
    { label: "GTFA", file: "GTFA.md", description: "The Ground Truth Final Answer: methodology, calculations, and exact values." },
    { label: "Rubrics", file: "rubrics.md", description: "The raw 21 criterion rubric set." },
    { label: "Draft history", file: "draft_history.md", description: "Agent objective and desired outcome notes." },
  ],

  narrative: {
    realitySub:
      "Once the deck idea is chosen, pressure-test it before defining anything: would Aaliyah really study asset allocation this way, and what would have to be true for it to hold? That reasoning decides which messy, gathered inputs to build, and then the strategy locks them in.",
    inputsSub:
      "The handwritten note and presentation.md are the source of truth. Four reference inputs and two spec files have to be read and reconciled into a seven slide deck, and every input drives a checkable output. Filter by role and click any asset for details.",
    ssotTitle: "The handwritten note and presentation.md, the source of truth",
    ssotBlurb:
      "The investor profile values live on a rushed handwritten note. The slide structure, exact titles, and formatting rules live in presentation.md (shown below). Together they define what correct means, and every other input is read against them.",
    inputsVariant: "reference",
    showFrictionTypes: false,
    galleryTitle: "The reference inputs, and what each one feeds",
    frictionTitle: "The reasoning traps planted across these inputs",
    frictionBlurb:
      "None of these are perception gotchas. Each is an attractive wrong path a careful reader could still take: decade labeled data that invites independent compounding, a contribution rate with two plausible bases, reference images that look like slide content. Difficulty lives in the joins between sources, not in any single hard to read value.",
    gtfaSub:
      "The one correct deliverable, built by hand before the prompt was written: a seven slide deck with deterministic compounding, plus the mentor review and email. This is the behavior a correct agent should produce.",
    gtfaTreeTitle: "The deck and state changes",
    gtfaBehaviorTitle: "The expected behavior",
    gtfaBehavior: [
      "Build asset_allocation.pptx with the seven exact slide titles, the navy, white, and gold formatting, and 2 decimal rounding from presentation.md.",
      "Compound the full 20-year horizon as two chained phases, carrying each 2010s ending balance into the 2020s, for both the initial only and the $300 per month tables.",
      "Read values from the note and images without pasting any source image into the deck, keep Slide 6 empty, and keep Slide 7 under 100 words with the exact per asset final values.",
      "Schedule a 15 minute Carlton review on Monday 8 June 2026, 10:00 to 10:15 AM, and email the deck to c.davis.columbus@outlook.com.",
    ],
    actualSub:
      "Reconstructed from the seed trajectory and its workspace, including the model's own build_presentation.py. A single prompt and agent interaction, compared against the GTFA.",
    silverSub:
      "A couple of targeted follow-ups guide the model to the correct deck, always restoring to seed. Each one addresses specific failures observed in the run above.",
    silverSuccessHeadline: "The deck and both state changes now match the GTFA",
    silverSuccess: [
      ["The deck", "asset_allocation.pptx rebuilt with the chained 20-year compounding and the correct monthly contribution math on Slides 4 and 5."],
      ["Per asset fidelity", "Slide 7 states the four exact final values within 100 words, with no portfolio weighted substitute."],
      ["Clean inputs", "Source images removed from the deck, Slide 6 left empty, and Slide 3 kept text only."],
      ["State changes", "The Carlton review event (Mon 8 Jun, 10:00 to 10:15) and the email with the deck attached are confirmed."],
    ],
    testsSub:
      "Reviewer only structural checks on the deck skeleton and the calendar and email state changes. Click any test to reveal its code.",
    unitTestGroups: ["Presentation structure", "State changes"],
  },
};

export default task2;
