import type { Task } from "../types";

const task2: Task = {
  meta: {
    id: "task2",
    serviceId: "6a17cc59ea9a7319a6ca06cd",
    title: "Asset Allocation Case-Study Deck",
    category: "Visual Learning",
    subcategory: "Lab/Fieldwork Documentation",
    universe: "aaliyah_jenkins",
    personaName: "Aaliyah Jenkins",
    oneLiner:
      "Build a self-study asset-allocation case-study deck from a messy note and reference images — with deterministic 20-year compounding — then schedule a mentor review and email the deck.",
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
    { label: "Role", value: "Level 2 Teller @ Scioto Valley Community Bank, Columbus" },
    { label: "Finances", value: "Financially conscious self-learner — Fidelity 401k, house fund, careful budgeter" },
    { label: "Family", value: "Husband Leonard + two kids (Marcus 8, Zoe 5)" },
    { label: "Mentor", value: "Carlton Davis — retired former ops manager at her bank, reviews her work" },
  ],

  brainstorm: [
    {
      title: "Asset Allocation Case-Study Presentation",
      body: "Build an advanced PowerPoint draft for a self-directed asset-allocation study — a realistic case study with correct long-term calculations, strict formatting, and a mentor review workflow.",
      chosen: true,
      why: "It stays naturally aligned with the assigned Visual Learning / Lab/Fieldwork Documentation category — a self-learner using gathered media (a handwritten note, a returns screenshot, charts) to understand a topic and document it into a study artifact. It's grounded in Aaliyah's real profile: she's a financially conscious bank teller who keeps a 401k, budgets carefully, and works inside a bank every day, so studying asset allocation on her own and documenting it is believable without inventing any credential she isn't enrolled in. It also leaves room for genuine complexity: the agent must OCR a messy note, interpret financial diagrams, calculate long-term outcomes, document them into the deck, find the right mentor contact (Carlton Davis, a real universe contact), infer the review time from a calendar pattern, and send it.",
    },
    {
      title: "House-Hunt Field Documentation",
      body: "Document the homes Aaliyah and Leonard toured into a visual comparison study — open-house photos, Zillow screenshots, and her handwritten walkthrough notes organized into a structured deck that documents what she observed at each property.",
      chosen: false,
    },
    {
      title: "Recipe Technique Study Log",
      body: "Turn process photos and handwritten notes from her own cooking sessions into an illustrated technique log — documenting each step's visuals and observations into a reference artifact she can learn from and reuse.",
      chosen: false,
    },
  ],

  realityFirst: [
    "Would a bank teller really self-study asset allocation and document it? Yes — Aaliyah keeps a 401k, budgets carefully, and works inside a bank, so the topic is native to her life and needs no invented credential to be believable.",
    "For the study to feel real, the source material has to look gathered on the fly — a value jotted on paper, a returns screenshot, a couple of charts — rather than a clean spreadsheet someone prepared for the agent.",
    "For the work to be genuine reasoning and not transcription, the data has to live in the visuals: the right rows and columns must be picked out of a busy returns table, and asset classes mapped to risk tiers from a separate diagram.",
    "For the math to be a true test, the horizon has to be one continuous 20-year chain and the contribution version has to build on the prior phase — so a 'two separate decades' shortcut is wrong but tempting.",
    "For the workflow to extend past the file, the universe has to supply a real reviewer (Carlton) and a schedulable pattern (her team meeting), so the review and email are grounded rather than invented.",
  ],

  mmStrategy: [
    "presentation.md is the written specification — exact slide titles, formatting rules, and slide-by-slide requirements act as the structural source of truth.",
    "asset_classes.md is a small table template, so the model must follow a defined output shape for the growth tables instead of inventing one.",
    "A rough handwritten note (1000268298.jpg) carries the investor-profile values — and a stray inflation figure that nothing consumes.",
    "A decade-returns screenshot holds ten decades and six columns; only the 2010s/2020s rows and the Stocks, Bonds, Housing, and Gold columns are load-bearing.",
    "A portfolio pie and an investment risk pyramid must be reconciled — the model maps each asset to a risk tier rather than copying allocation percentages.",
    "Controlled friction is reasoning-shaped, not perceptual: exact titles, a text-only slide, an intentionally empty slide, two compounding assumptions, and a 100-word conclusion that must keep the exact per-asset values.",
  ],

  assets: [
    {
      filename: "1000268298.jpg",
      src: "mm_input/1000268298.jpg",
      kind: "handwritten",
      role: "ssot",
      whatItShows:
        "A rushed handwritten note: Initial amount → $5,000, Monthly contribution → $300, Risk tolerance → Moderate / Medium, and a stray 'Assumed w/ inflation rate → 2.6%' that no slide or calculation uses.",
      verdict: "Source of the Slide 2 investor-profile values — read, do not paste.",
      rationale:
        "The note supplies the profile numbers, but it is deliberately not fully load-bearing: the inflation figure feeds nothing. A correct solution recognizes which values matter and never copies the note image into the deck.",
      tags: ["SSOT", "profile values", "non-load-bearing detail"],
    },
    {
      filename: "Screenshot_2026-05-01 232933.jpg",
      src: "mm_input/Screenshot_2026-05-01 232933.jpg",
      kind: "image",
      role: "correct",
      whatItShows:
        "A decade-by-decade average-annual-return table — ten rows (1930s–2020s) and six columns (Stocks, Cash, Bonds, Housing, Gold, Inflation).",
      verdict: "Source of the 2010s/2020s returns for Stocks, Bonds, Housing, and Gold.",
      purpose: "Slide 4 returns",
      rationale:
        "Most of the table is noise. The model must select only two rows (2010s, 2020s) and four of the six columns — Cash and Inflation are not part of the portfolio. This is where the task is genuinely multimodal.",
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
        "Provides the allocation split that Slide 3 reports and that the portfolio-level reasoning depends on. Read from the chart rather than the prompt text.",
      tags: ["allocation", "Slide 3"],
    },
    {
      filename: "risk.png",
      src: "mm_input/risk.png",
      kind: "image",
      role: "correct",
      whatItShows:
        "An investment risk pyramid with four tiers — Foundation, Secure, Growth, and Speculative — listing the instruments that belong to each.",
      verdict: "Source of each asset's risk tier on Slide 3.",
      purpose: "Slide 3 risk tiers",
      rationale:
        "The model must map each portfolio asset to a tier (Stocks → Growth, Bonds → Secure, Housing → Growth, Gold → Speculative) instead of copying the allocation percentages. It connects asset classes to risk categories — a reconciliation step, not a lookup.",
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
        "The deliverable is a real PowerPoint file with that exact name — the structural rules live in presentation.md, not in the prompt.",
    },
    {
      quote: "a presentation.md file detailing what should be covered",
      meaning:
        "presentation.md is the source of truth for slide titles, formatting, and slide-by-slide content. The prompt stays high-level; the spec carries the detail.",
    },
    {
      quote: "personal notes, images I had stored for reference",
      meaning:
        "The note and images supply values to reason over — they are reference inputs, not slide content to paste in.",
    },
    {
      quote: "starts at age 25 and retires at 45 … a 20-year horizon",
      meaning:
        "The compounding must span one continuous 20-year period (2010–2029), not two isolated 10-year examples.",
    },
    {
      quote: "Set up a 15-minute review with him on Monday right after my regular team meeting and send the deck over",
      meaning:
        "Two state changes: infer the time from the team-meeting pattern, create a 10:00–10:15 calendar event with Carlton, and email him the deck.",
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
          { name: "Slide 1 — Asset Allocation - The Long-Term Power of Diversification", type: "doc", note: "exact title + a relevant topic image" },
          { name: "Slide 2 — Investor Profile", type: "doc", note: "age 25 → 45, $5,000 initial, $300/mo, risk tolerance medium" },
          { name: "Slide 3 — Portfolio & Risk Level", type: "doc", note: "Stocks 50% (Growth), Bonds 30% (Secure), Housing 15% (Growth), Gold 5% (Speculative) — text only" },
          { name: "Slide 4 — Long Term Projections", type: "doc", note: "returns table + initial-only growth: Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33" },
          { name: "Slide 5 — The Power of Consistency - When Everything Changes", type: "doc", note: "disclaimer + $300/mo growth: Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59" },
          { name: "Slide 6 — Risk & Return Analysis", type: "doc", note: "intentionally empty" },
          { name: "Slide 7 — Recommendation & Conclusion", type: "doc", note: "≤100 words, states the four Slide 5 per-asset final values" },
        ],
      },
      {
        name: "Calendar event",
        type: "doc",
        note: "Carlton Davis review — Mon 8 Jun 2026, 10:00–10:15 AM",
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
      { n: 1, title: "Asset Allocation — The Long-Term Power of Diversification", body: "Exact title + a relevant image illustrating the topic." },
      { n: 2, title: "Investor Profile", body: "Age 25 → 45, $5,000 initial, $300/mo, risk tolerance medium — transcribed from the note, not pasted." },
      { n: 3, title: "Portfolio & Risk Level", body: "Stocks 50% (Growth), Bonds 30% (Secure), Housing 15% (Growth), Gold 5% (Speculative). Text only." },
      { n: 4, title: "Long Term Projections", body: "Returns table + initial-only growth chained across the decade: Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33." },
      { n: 5, title: "The Power of Consistency — When Everything Changes", body: "Single-asset disclaimer + $300/mo growth: Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59." },
      { n: 6, title: "Risk & Return Analysis", body: "Intentionally left empty — title only.", empty: true },
      { n: 7, title: "Recommendation & Conclusion", body: "≤100 words, stating the four Slide 5 per-asset final values." },
    ],
    stateChanges: [
      { kind: "calendar", title: "Carlton review event", detail: "Mon 8 Jun 2026, 10:00–10:15 AM — inferred from her regular team-meeting pattern." },
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
      label: "Fix the 20-year compounding (Slide 4)",
      message:
        "The presentation exists, but Slides 4 and 5 are using the wrong compounding logic. Please recalculate the 20-year horizon as two continuous phases: first compound from January 2010 through December 2019, then use that ending balance as the starting balance for January 2020 through December 2029. Slide 4 should report final values of Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, and Housing $14,963.33.",
      fixes:
        "Forces the model to chain the two decades instead of compounding each from $5,000 — the highest-weight failure the task was built to elicit.",
    },
    {
      n: 2,
      label: "Correct the monthly-contribution math (Slide 5)",
      message:
        "Slide 5 also needs to be corrected. The $300 monthly contribution should be compounded monthly within each decade, and the second decade must start from the first decade's ending balance while contributions continue. The required final values are Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, and Housing $157,407.59.",
      fixes:
        "Replaces the nominal monthly rate with the effective monthly rate and carries the annuity across both phases, producing the GTFA values.",
    },
    {
      n: 3,
      label: "Remove source images; keep Slide 3 text-only",
      message:
        "Please remove any reference/source-note images that were included in the deck just because they were uploaded. The handwritten note should be used to extract the investor profile values, not pasted into Slide 2. Also make sure Slide 3 remains text only.",
      fixes:
        "Separates 'use an input' from 'copy an input' — the note and charts inform the slides without appearing in them.",
    },
    {
      n: 4,
      label: "Keep Slide 6 empty",
      message:
        "Confirm Slide 6 (Risk & Return Analysis) stays empty except for the title/empty-slide structure — no placeholder body text such as [Content to be added]. Models are tempted to fill an intentionally blank slide, so this is verified explicitly.",
      fixes:
        "Holds the deliberately empty slide against the model's instinct to add placeholder or explanatory text.",
    },
    {
      n: 5,
      label: "Tighten the conclusion to per-asset values (Slide 7)",
      message:
        "The conclusion on Slide 7 should be no more than 100 words and must explicitly state the Slide 5 per-asset final outcomes: Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, and Housing $157,407.59. Do not replace these with a portfolio-weighted total.",
      fixes:
        "Tests synthesis under a hard length limit without losing numeric fidelity — the exact per-asset figures must survive.",
    },
    {
      n: 6,
      label: "Verify the Carlton review + email",
      message:
        "Verify that the Carlton review event is on Monday, 8 June 2026, from 10:00 AM to 10:15 AM, and that the email to c.davis.columbus@outlook.com includes the deck and asks him to take a look and share any thoughts.",
      fixes:
        "Confirms both state changes landed with the correct time, attendee, attachment, and message.",
    },
    {
      n: 7,
      label: "Correct solution reached",
      message: "Correct solution reached — the deck and both state changes now match the Ground Truth Final Answer.",
      fixes: "End state: verified-correct trajectory, restored from seed (never started fresh).",
    },
  ],

  unitTests: [
    {
      ref: "test_output_contains_asset_allocation_pptx",
      logic: "Verifies the output includes a PowerPoint file named asset_allocation.pptx.",
      group: "Presentation Structure",
      code: `def test_output_contains_asset_allocation_pptx():
    assert _find_pptx() is not None, "Missing asset_allocation.pptx"`,
    },
    {
      ref: "test_presentation_contains_expected_slide_titles",
      logic: "Verifies the deck contains the seven expected slide titles, in order.",
      group: "Presentation Structure",
      code: `def test_presentation_contains_expected_slide_titles():
    slides = _slides_text()
    expected = [
        "Asset Allocation - The Long-Term Power of Diversification",
        "Investor Profile",
        "Portfolio & Risk Level",
        "Long Term Projections",
        "The Power of Consistency - When Everything Changes",
        "Risk & Return Analysis",
        "Recommendation & Conclusion",
    ]
    assert len(slides) >= 7, "Deck has fewer than 7 slides"
    for i, title in enumerate(expected):
        assert title in slides[i], f"Slide {i + 1} missing title: {title}"`,
    },
    {
      ref: "test_slide_6_contains_no_body_content",
      logic: "Verifies Slide 6 is titled Risk & Return Analysis and has no body content beyond the empty slide structure.",
      group: "Presentation Structure",
      code: `def test_slide_6_contains_no_body_content():
    body = _slides_text()[5].replace("Risk & Return Analysis", "").strip()
    assert body == "", f"Slide 6 should be empty, found: {body!r}"`,
    },
    {
      ref: "test_slide_4_contains_initial_only_final_values",
      logic: "Verifies Slide 4 reports the initial-only final values: Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33.",
      group: "Calculation",
      code: `def test_slide_4_contains_initial_only_final_values():
    text = _slides_text()[3]
    for value in ("$70,518.14", "$40,113.73", "$7,036.25", "$14,963.33"):
        assert value in text, f"Slide 4 missing initial-only value: {value}"`,
    },
    {
      ref: "test_slide_5_contains_monthly_contribution_final_values",
      logic: "Verifies Slide 5 reports the monthly-contribution final values: Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59.",
      group: "Calculation",
      code: `def test_slide_5_contains_monthly_contribution_final_values():
    text = _slides_text()[4]
    for value in ("$435,532.09", "$382,237.75", "$83,632.72", "$157,407.59"):
        assert value in text, f"Slide 5 missing contribution value: {value}"`,
    },
    {
      ref: "test_slide_7_conclusion_contains_required_values",
      logic: "Verifies Slide 7 stays within 100 words and includes the initial investment, the monthly contribution, and the four Slide 5 final values.",
      group: "Calculation",
      code: `def test_slide_7_conclusion_contains_required_values():
    text = _slides_text()[6]
    assert len(text.split()) <= 100, "Conclusion exceeds 100 words"
    required = (
        "$5,000.00", "$300.00",
        "$435,532.09", "$382,237.75", "$83,632.72", "$157,407.59",
    )
    for value in required:
        assert value in text, f"Conclusion missing required value: {value}"`,
    },
    {
      ref: "test_carlton_review_calendar_event_created",
      logic: "Verifies a 15-minute calendar event exists for Carlton Davis on Monday, 8 June 2026, 10:00–10:15 AM.",
      group: "State Change",
      code: `def test_carlton_review_calendar_event_created():
    events = _workspace_state().get("calendar", [])
    match = [
        e for e in events
        if e.get("date") == "2026-06-08"
        and e.get("start") == "10:00"
        and e.get("end") == "10:15"
        and "c.davis.columbus@outlook.com" in e.get("attendees", [])
    ]
    assert match, "Missing 15-min Carlton review on Mon 8 Jun 2026, 10:00-10:15"`,
    },
    {
      ref: "test_carlton_email_sent_with_deck",
      logic: "Verifies an email was sent to c.davis.columbus@outlook.com with asset_allocation.pptx attached and a request to review.",
      group: "State Change",
      code: `def test_carlton_email_sent_with_deck():
    outbox = _workspace_state().get("outbox", [])
    match = [
        m for m in outbox
        if "c.davis.columbus@outlook.com" in m.get("to", "")
        and any("asset_allocation.pptx" in a for a in m.get("attachments", []))
    ]
    assert match, "No email to Carlton with asset_allocation.pptx attached"`,
    },
  ],

  rubricDesign: [
    {
      title: "Grounded, Atomic, Outcome-Based",
      body:
        "Every positive rubric maps back to a presentation.md rule or a prompt requirement, and checks one outcome: one slide, one value set, one state change. Nothing is graded that the spec or prompt did not ask for.",
    },
    {
      title: "Weights Follow Verification Difficulty",
      body:
        "+5 goes to the two-phase compounding — the one criterion that reconciles the screenshot returns, the 20-year-horizon rule, and the chained-balance methodology at once. +3 covers single-reasoning-step requirements (the contribution table, the conclusion values, the slide titles, each state change). +1 covers mechanical single-source checks like color, font, and rounding.",
    },
    {
      title: "Deterministic Math Is Objectively Gradable",
      body:
        "Because the GTFA fixes exact final values, the Factuality rubrics check specific numbers rather than 'reasonable' ones. The task has a single defensible answer, so a wrong calculation is unambiguously Not Present.",
    },
    {
      title: "Negatives Target Attractive Wrong Paths",
      body:
        "The negatives encode the tempting failures actually seen in the run: independent decade compounding (-5), annual compounding of lump sum and contributions (-3), pasting source images into the deck (-3), and layout overlap (-1). They penalize specific observed temptations, not hypothetical ones, and stay outnumbered by the positives.",
    },
    {
      title: "Judge Routing Is Text-Oriented",
      body:
        "Reading the note, the returns screenshot, the pie, and the pyramid is input perception — verified by the text judge against the model's written output. Only pixels the agent itself produces would route to the visual judge.",
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
      observed: "The build script set BG #0D1B2A, white body text, and gold #F0A500 titles/headers exactly as specified.",
      rationale:
        "A mechanical single-source formatting check pulled straight from the spec — low weight because it is a direct copy of stated values.",
    },
    {
      n: 3,
      text: "The model correctly applies the font formatting requirements defined in `presentation.md`, using a sans serif font (e.g., `Calibri` or `Arial`), with slide titles sized at 28–32 pt, body text at 16–18 pt, and table text at 13–14 pt.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md: Font — title 28–32pt, body 16–18pt, table 13–14pt.",
      status: "not-present",
      observed: "Font family (Calibri) was correct, but several text boxes fell outside the required size bands, so the criterion was scored Not Present.",
      rationale:
        "Even mechanical formatting has multiple sub-conditions; missing any one (the size bands here) fails the whole check, which keeps the spec enforceable.",
    },
    {
      n: 4,
      text: "The model correctly rounds all monetary values and percentages appearing in `asset_allocation.pptx` to two decimal places (e.g., `13.40%`, ` $17,583.31`).",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md: Numbers — all money and percentages to 2 decimals.",
      status: "present",
      observed: "fmt_money and fmt_pct formatted every value to two decimals.",
      rationale:
        "A single-source presentation rule. Low weight, but cheap to verify and easy for a model to overlook.",
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
        "Exact titles anchor the per-slide rubrics; bundling all seven into one +3 check is justified because they are the same level of data entry against one rule.",
    },
    {
      n: 6,
      text: "`asset_allocation.pptx` contains a Slide 1 with the title `Asset Allocation - The Long-Term Power of Diversification` and a relevant image related to the covered topic.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 1: exact title + a relevant topic image.",
      status: "not-present",
      observed: "Slide 1 carried the correct title but used the risk-pyramid input (risk.png) as its cover image rather than a relevant illustration of the topic.",
      rationale:
        "Pairs the exact title with a content judgment — 'relevant image' — so reusing a reference input as decoration does not satisfy it.",
      whyCorrect:
        "presentation.md asks Slide 1 for the exact title accompanied by a relevant image illustrating the topic of the presentation, so the criterion checks both halves.",
      whyImportant:
        "Slide 1 sets the framing of the case study; a relevant cover image is part of the requested deliverable, not optional decoration.",
      whatWrong:
        "The model placed the risk pyramid (a reasoning input) on Slide 1 as the cover image instead of sourcing or creating an image relevant to the asset-allocation topic.",
    },
    {
      n: 7,
      text: "Slide 2 (`Investor Profile`) presents the investor profile with starting age 25, retirement age 45, initial investment `$5,000`, monthly contribution `$300`, and risk tolerance `medium`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 2 + the handwritten note values.",
      status: "not-present",
      observed: "The values were present, but the model labeled risk tolerance 'Moderate – Medium', added an extra 'Investment Horizon' row, and pasted the note image — so the profile did not match the required form.",
      rationale:
        "Checks that the note's values are transcribed faithfully and cleanly. The 'medium' wording and the absence of extraneous content matter for an exact profile.",
      whyCorrect:
        "The profile values come from the handwritten note and the prompt's 25→45 horizon, and presentation.md asks for exactly those five fields, so the criterion is grounded in the inputs.",
      whyImportant:
        "Slide 2 is the basis for every downstream calculation; if the profile is wrong or padded, the case study no longer reflects the stated investor.",
      whatWrong:
        "The model rendered risk tolerance as 'Moderate – Medium' rather than 'medium' and added content beyond the five requested fields, including the source note image.",
    },
    {
      n: 8,
      text: "Slide 3 (`Portfolio & Risk Level`) lists the portfolio and risk levels as Stocks `50% (Growth)`, Bonds `30% (Secure)`, Housing `15% (Growth)`, and Gold `5% (Speculative)`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "portfolio.jpg (allocation) reconciled with risk.png (tiers).",
      status: "present",
      observed: "Slide 3 mapped each asset to the correct tier — Stocks/Housing → Growth, Bonds → Secure, Gold → Speculative — matching the pyramid.",
      rationale:
        "Rewards the cross-image reconciliation: the allocations come from the pie, the tiers from the pyramid, and the two must be joined rather than copied.",
    },
    {
      n: 9,
      text: "Slide 4 (`Long Term Projections`) includes the annual returns achieved by each asset class during the 2010s and 2020s decades: stocks (13.4%, 14.9%), gold (3.4%, 19.1%), bonds (4.1%, -0.6%), and housing (3.8%, 7.5%).",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Decade-returns screenshot: 2010s/2020s rows × Stocks/Bonds/Housing/Gold.",
      status: "present",
      observed: "The model selected the correct two rows and four columns from the screenshot and reported the returns table accurately.",
      rationale:
        "Confirms the multimodal selection step worked — only the relevant rows and columns were pulled from a ten-row, six-column table.",
    },
    {
      n: 10,
      text: "Slide 4 (`Long Term Projections`) includes a compounded growth table showing final values of $70,518.14 for Stocks, $40,113.73 for Gold, $7,036.25 for Bonds, and $14,963.33 for Housing. The calculations are based solely on the initial investment amount and exclude any monthly contributions.",
      points: 3,
      category: "Factuality and Hallucination — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA Table 1: two-phase compounding of the $5,000 lump sum.",
      status: "not-present",
      observed: "The model compounded each decade independently from $5,000, so its 2020s column never used the 2010s ending balance and the final values did not match the GTFA.",
      rationale:
        "The core factual check. Exact target values make a wrong methodology unambiguous, and this is where the highest-weight negative also fires.",
      whyCorrect:
        "The prompt defines a continuous 20-year horizon, so the only defensible Slide 4 values are the chained results the GTFA specifies to the cent.",
      whyImportant:
        "This is the central reasoning the case study is meant to demonstrate; getting it wrong undermines the entire presentation's claim about long-term compounding.",
      whatWrong:
        "build_presentation.py computed compound_growth($5,000, rate, 10) separately for each decade instead of carrying the 2010s ending balance into the 2020s, producing values far below the required totals.",
    },
    {
      n: 11,
      text: "Slide 5 (`The Power of Consistency - When Everything Changes`) begins with a disclaimer clarifying that the monthly contribution calculations assume all contributions are invested entirely in the corresponding asset class rather than being diversified across the portfolio.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 5: disclaimer at the top of the slide.",
      status: "present",
      observed: "Slide 5 opened with the required single-asset disclaimer.",
      rationale:
        "A low-weight instruction-following check; the disclaimer is a stated requirement that is simple to verify.",
    },
    {
      n: 12,
      text: "Slide 5 (`The Power of Consistency - When Everything Changes`) includes compounded growth table showing final values of $435,532.09 for Stocks, $382,237.75 for Gold, $83,632.72 for Bonds, and $157,407.59 for Housing. The calculations incorporate both the initial investment amount and the recurring monthly contributions.",
      points: 3,
      category: "Factuality and Hallucination — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA Table 2: chained two-phase compounding with $300/mo contributions.",
      status: "not-present",
      observed: "The model compounded the $300 contributions with a nominal monthly rate (r/12) rather than the effective monthly rate, so the contribution totals did not match the GTFA.",
      rationale:
        "The second factual anchor. The wrong-but-plausible monthly rate is exactly the attractive error the deterministic values are designed to catch.",
      whyCorrect:
        "Only the effective monthly rate keeps the annuity consistent with the annual returns the rest of the deck reports, so the GTFA values are the single correct outcome.",
      whyImportant:
        "The contribution table is the slide's headline message about consistency; wrong totals misrepresent the very point the case study makes.",
      whatWrong:
        "The model used monthly_rate = r/12 instead of (1 + r)^(1/12) − 1, producing contribution final values that diverge from the required figures.",
    },
    {
      n: 13,
      text: "The compounded growth tables in Slides 4 (`Long Term Projections`) and 5 (`The Power of Consistency - When Everything Changes`) follow the expected format defined in `asset_classes.md`, consisting of three columns (`Asset`, `Growth of $5,000 (2010s)`, and `Growth of $5,000 (2020s)`) for each portfolio asset.",
      points: 1,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "asset_classes.md: the three-column growth-table template.",
      status: "not-present",
      observed: "The Slide 5 table used four columns (adding 'Value After 2010s/2020s' and a 'Total' column) rather than the three-column template, so the format check failed.",
      rationale:
        "Enforces the supplied table template so the model follows a defined output shape instead of inventing its own.",
      whyCorrect:
        "asset_classes.md provides an explicit three-column template, so a conforming deck must use that exact structure.",
      whyImportant:
        "A shared template keeps the two growth tables comparable and matches what the user asked for; an invented shape breaks that consistency.",
      whatWrong:
        "The model expanded the Slide 5 table to four columns instead of the three columns defined in asset_classes.md.",
    },
    {
      n: 14,
      text: "Slide 6 is titled `Risk & Return Analysis` and contains no body content beyond the empty slide structure.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 6: 'Leave it empty.'",
      status: "present",
      observed: "Slide 6 was scored as having only its title and no body content, satisfying the empty-slide requirement.",
      rationale:
        "Tests whether the model respects a local 'do nothing here' instruction — a tempting one to violate, which is why it is weighted at +3.",
    },
    {
      n: 15,
      text: "Slide 7 contains a conclusion of 100 words or fewer that explains how a 25-year-old investor starting with `$5,000`, contributing `$300` per month, and staying invested for 20 years can reach different outcomes by asset choice, explicitly highlights long-term discipline and compounding, and states the final values `Stocks $435,532.09`, `Gold $382,237.75`, `Bonds $83,632.72`, and `Housing $157,407.59`.",
      points: 3,
      category: "Instruction Following — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "presentation.md Slide 7: ≤100 words + the exact per-asset final values.",
      status: "not-present",
      observed: "The conclusion summarized a single portfolio-weighted total instead of the four required per-asset final values.",
      rationale:
        "Tests synthesis under a length limit without losing numeric fidelity — the exact per-asset figures must survive the compression.",
      whyCorrect:
        "The spec requires the conclusion to restate the four Slide 5 outcomes within 100 words, so a blended figure does not meet the criterion.",
      whyImportant:
        "The closing slide is what a reviewer remembers; collapsing four asset outcomes into one number loses the comparison the case study is built to show.",
      whatWrong:
        "The model reported a portfolio-weighted final value rather than the required Stocks/Gold/Bonds/Housing per-asset values.",
    },
    {
      n: 16,
      text: "A calendar event is created for Monday, 8 June 2026, from `10:00 AM` to `10:15 AM`, with Carlton Davis (`c.davis.columbus@outlook.com`) for the presentation review.",
      points: 3,
      category: "Task Completion — State change",
      evalTarget: "State change",
      enforces: "Prompt: '15-minute review … on Monday right after my regular team meeting.'",
      status: "present",
      observed: "The model created the 15-minute review event at the correct date and time with Carlton.",
      rationale:
        "A real state change that also requires inferring the time from the team-meeting pattern, not just creating any event.",
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
        "The second state change. Requires the right recipient, attachment, and message — verified against the workspace, not the deck.",
    },
    {
      n: 18,
      text: "The model includes across the `asset_allocation.pptx` source images that were expected to be used as reference material for creating the slide content (e.g., handwritten note covering investor profile present in `1000268298.jpg`).",
      points: -3,
      category: "Agent Behavior — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Negative: reference inputs must inform the slides, not appear in them.",
      status: "present",
      observed: "The model pasted the handwritten note (1000268298.jpg) onto Slide 2 as a 'Source: Investor notes' thumbnail.",
      rationale:
        "Targets the attractive 'use vs. copy' confusion: the inputs are there to be read, and embedding them is a specific undesired behavior worth a -3.",
      whyCorrect:
        "The note and charts are reasoning inputs; pasting them into the deck is an undesired behavior the negative rubric is meant to catch.",
      whyImportant:
        "A reference image rendered as slide content makes the deck look like raw working material rather than a finished presentation, and signals the model conflated input with output.",
      whatWrong:
        "The model added the handwritten note image to Slide 2 instead of only extracting its values.",
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
        "The highest-weight negative because it is the most tempting wrong path — the decade-labeled screenshot makes independent compounding feel correct.",
      whyCorrect:
        "A 20-year horizon requires one continuous compounding chain, so treating the decades independently is unambiguously the undesired behavior.",
      whyImportant:
        "This single error invalidates the case study's core claim and would mislead anyone reading the projections.",
      whatWrong:
        "The model's Slide 4 table applied the 2020s rate to the original $5,000 instead of to the 2010s ending balance.",
    },
    {
      n: 20,
      text: "The model annually compounds both the initial lump sum and the recurring monthly contributions when calculating the values reported in Slide 5 (`The Power of Consistency - When Everything Changes`).",
      points: -3,
      category: "Agent Behavior — Trajectory",
      evalTarget: "Trajectory",
      enforces: "Negative: contributions must compound on the correct monthly basis, not annually.",
      status: "present",
      observed: "The Slide 5 contribution math used a coarse monthly basis (nominal r/12) that diverges from the GTFA's effective monthly rate, so the reported totals were wrong.",
      rationale:
        "Captures the plausible-but-wrong contribution methodology distinctly from the per-value Factuality check, so the methodology error is penalized on its own.",
      whyCorrect:
        "The contributions are monthly, so compounding them on the wrong basis is an identifiable methodology error the negative rubric targets.",
      whyImportant:
        "It is a subtle error that still produces confident-looking numbers — exactly the kind of mistake that needs to be penalized explicitly.",
      whatWrong:
        "The Slide 5 annuity used a nominal monthly rate rather than the effective monthly rate consistent with the annual returns.",
    },
    {
      n: 21,
      text: "Visual consistency in any of the slides is altered due to an uneven distribution of content (e.g., the disclaimer in Slide 5 overlaps with the slide title).",
      points: -1,
      category: "Agent Behavior — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Negative: content must be laid out without overlap or crowding.",
      status: "present",
      observed: "Slide 5's stacked disclaimer, table, and summary lines crowded the layout, breaking visual consistency.",
      rationale:
        "A light -1 for a cosmetic-but-real layout defect; small enough that it discourages sloppiness without dominating the score.",
      whyCorrect:
        "Overlapping or crowded content is a genuine layout defect the negative rubric is scoped to flag.",
      whyImportant:
        "A reviewer-facing deck that overlaps its own text reads as unfinished, even when the numbers are right.",
      whatWrong:
        "The model packed the disclaimer, table, and multiple summary lines onto Slide 5 without enough vertical spacing, producing crowding.",
    },
  ],

  friction: [
    {
      id: "two-phase-horizon",
      title: "Decade-labeled returns invite independent compounding",
      type: "perception",
      where: "Returns screenshot → Slide 4",
      description:
        "The screenshot labels returns by decade, so compounding each decade as a fresh $5,000 run looks reasonable. The prompt's 20-year horizon requires chaining: the 2010s ending balance becomes the 2020s starting balance.",
      whyItWorks:
        "The intuitive reading is the wrong one, which is what makes the failure natural rather than forced. It is the task's highest-weight trap.",
    },
    {
      id: "monthly-rate",
      title: "Two plausible definitions of the monthly rate",
      type: "perception",
      where: "$300 contributions → Slide 5",
      description:
        "Monthly contributions can be compounded with a nominal rate (r/12) or the effective rate ((1 + r)^(1/12) − 1). Only the effective rate stays consistent with the annual returns the rest of the deck reports.",
      whyItWorks:
        "Both produce confident-looking totals, so the deterministic GTFA values are what separate the right method from the wrong one.",
    },
    {
      id: "screenshot-subset",
      title: "Ten decades and six columns; only two rows and four columns matter",
      type: "mismatch",
      where: "Screenshot_2026-05-01 232933.jpg",
      description:
        "The returns table spans 1930s–2020s and includes Cash and Inflation columns. Only the 2010s and 2020s rows and the Stocks, Bonds, Housing, and Gold columns are load-bearing.",
      whyItWorks:
        "Forces genuine selection across a multimodal source instead of copying a whole table — difficulty that lives in choosing the right cells.",
    },
    {
      id: "risk-mapping",
      title: "Risk tiers must be mapped, not copied",
      type: "perception",
      where: "risk.png + portfolio.jpg → Slide 3",
      description:
        "The pie gives allocation percentages; the pyramid gives risk tiers. The model must map each asset to a tier (Stocks → Growth, Bonds → Secure, Housing → Growth, Gold → Speculative) rather than reusing the allocation numbers.",
      whyItWorks:
        "Connects two independent visual sources, testing reconciliation instead of a single-image lookup.",
    },
    {
      id: "source-images",
      title: "Reference images are not slide content",
      type: "removable",
      where: "Handwritten note + charts → the deck",
      description:
        "The note and reference charts supply values to reason over. None of them should be pasted into the deck — Slide 3 is explicitly text-only, and Slide 2 should carry transcribed values, not the note image.",
      whyItWorks:
        "Tests the 'use an input' vs. 'copy an input' distinction that models routinely blur when an image is uploaded.",
    },
    {
      id: "stray-inflation",
      title: "A non-load-bearing figure on the note",
      type: "removable",
      where: "1000268298.jpg",
      description:
        "The handwritten note also lists an 'assumed inflation rate → 2.6%' that no slide or calculation consumes. A correct solution recognizes it is not needed rather than forcing it into the deck.",
      whyItWorks:
        "A real jotted note is rarely perfectly load-bearing; the model must judge relevance, not transcribe everything it sees.",
    },
    {
      id: "empty-slide-6",
      title: "An intentionally empty slide",
      type: "perception",
      where: "presentation.md Slide 6",
      description:
        "Slide 6 (Risk & Return Analysis) must be left empty except for its title. Models are tempted to fill it with a placeholder or explanatory text.",
      whyItWorks:
        "Tests whether the model follows a local 'do nothing here' instruction against its instinct to populate every slide.",
    },
    {
      id: "conclusion-100",
      title: "Synthesis under a hard word limit",
      type: "perception",
      where: "presentation.md Slide 7",
      description:
        "The conclusion must stay under 100 words while explicitly stating all four Slide 5 per-asset final values — not a single blended portfolio total.",
      whyItWorks:
        "Pressures the model to compress without dropping numeric fidelity, where a portfolio-weighted summary is the tempting shortcut.",
    },
  ],

  inputDocs: [
    {
      file: "presentation.md",
      label: "The slide-by-slide specification & formatting rules",
      markdown: true,
    },
    {
      file: "asset_classes.md",
      label: "The growth-table template the deck must follow",
      markdown: true,
    },
  ],

  actualRun: {
    summary:
      "Single-turn run from seed. The model wrote a build_presentation.py and produced asset_allocation.pptx with all seven titled slides, and it completed both the Carlton calendar event and the email. The surface looked right — but cross-referencing the workspace script and the trajectory against the GTFA exposes where the deeper reasoning broke. Each finding below pins the expected behavior to what the model actually did and to the evidence for it.",
    layout: "compare",
    observations: [
      {
        id: "independent-decades",
        title: "20-year horizon compounded as two separate decades",
        outcome: "fail",
        rubrics: [10, 19],
        expected: "Chain the horizon: compound $5,000 through the 2010s, then carry that ending balance into the 2020s — final values Stocks $70,518.14, Gold $40,113.73, Bonds $7,036.25, Housing $14,963.33.",
        what: "Slide 4 applied each decade's rate to the original $5,000 separately, so the 2020s column never used the 2010s ending balance and every final value was far below the GTFA.",
        evidence: "build_presentation.py → compound_growth(INITIAL, returns_2020s[asset], 10) called on $5,000, not on the Phase-1 result.",
      },
      {
        id: "monthly-rate",
        title: "Wrong monthly-contribution compounding basis",
        outcome: "fail",
        rubrics: [12, 20],
        expected: "Compound the $300 monthly contributions at the effective monthly rate (1 + r)^(1/12) − 1, chained across both phases, to reach Stocks $435,532.09, Gold $382,237.75, Bonds $83,632.72, Housing $157,407.59.",
        what: "Slide 5 used a nominal monthly rate (r/12), so the contribution totals diverged from the GTFA even though the decade chaining was applied here.",
        evidence: "build_presentation.py → compound_growth_with_contributions(): monthly_rate = r / 12.0.",
      },
      {
        id: "source-image",
        title: "Reference note pasted into the deck as content",
        outcome: "fail",
        rubrics: [18, 7],
        expected: "Read the handwritten note for the profile values only; transcribe them onto Slide 2 (risk tolerance 'medium'), with no source image embedded.",
        what: "The note image was added to Slide 2 as a 'Source: Investor notes' thumbnail, and the profile read 'Moderate – Medium' with an extra horizon row — so Slide 2 was Not Present and the -3 negative fired.",
        evidence: "build_presentation.py → slide2.shapes.add_picture(notes_img, …) + RISK_TOL = 'Moderate – Medium'.",
      },
      {
        id: "conclusion",
        title: "Conclusion collapsed to one blended figure",
        outcome: "fail",
        rubrics: [15],
        expected: "A ≤100-word Slide 7 conclusion stating the four Slide 5 per-asset final values explicitly.",
        what: "Slide 7 reported a single portfolio-weighted final value instead of the four required per-asset numbers.",
        evidence: "build_presentation.py → weighted_total = sum(final_values[a] * portfolio[a] / 100) surfaced as the headline figure.",
      },
      {
        id: "format",
        title: "Table format and font sizes off-spec",
        outcome: "fail",
        rubrics: [3, 13],
        expected: "Follow the three-column asset_classes.md template and the presentation.md font-size bands (title 28–32pt, body 16–18pt, table 13–14pt).",
        what: "The Slide 5 table used four columns, and several text boxes fell outside the required size bands.",
        evidence: "build_presentation.py → tbl5 built with cols5 = 4; assorted Pt() sizes outside the spec bands.",
      },
      {
        id: "slide1-image",
        title: "Slide 1 reused a reference input as its cover",
        outcome: "fail",
        rubrics: [6],
        expected: "Slide 1 carries the exact title plus a relevant image illustrating the asset-allocation topic.",
        what: "Slide 1 had the correct title but used the risk pyramid (a reasoning input) as the cover image.",
        evidence: "build_presentation.py → slide1 add_picture(os.path.join(INPUT_DIR, 'risk.png'), …).",
      },
      {
        id: "layout",
        title: "Slide 5 layout crowding",
        outcome: "fail",
        rubrics: [21],
        expected: "Lay out each slide without overlap or crowding.",
        what: "The stacked disclaimer, table, and multiple summary lines crowded Slide 5, breaking visual consistency.",
        evidence: "build_presentation.py → Slide 5 stacks disclaimer + table + three summary textboxes with tight vertical offsets.",
      },
      {
        id: "state-changes",
        title: "Both state changes completed correctly",
        outcome: "pass",
        rubrics: [16, 17],
        expected: "Create the 15-minute Carlton review (Mon 8 Jun, 10:00–10:15) and email the deck to c.davis.columbus@outlook.com.",
        what: "Both the calendar event and the email with the deck attached were performed as required.",
        evidence: "Trajectory → calendar create + email send tool calls to c.davis.columbus@outlook.com with asset_allocation.pptx.",
      },
    ],
  },

  unitTestPreamble: `from pathlib import Path
import json

from pptx import Presentation


def _bases():
    """Where to look for the agent's output (mirrors verifier.py)."""
    return [Path(__file__).parent, Path(__file__).parent / "workspace"]


def _find_pptx(name="asset_allocation.pptx"):
    """Locate the agent's deck across the known output bases."""
    for base in _bases():
        candidate = base / name
        if candidate.is_file():
            return candidate
    return None


def _slides_text():
    """Return one concatenated text string per slide (titles, text boxes, tables)."""
    pptx_path = _find_pptx()
    if pptx_path is None:
        return []
    slides = []
    for slide in Presentation(pptx_path).slides:
        chunks = []
        for shape in slide.shapes:
            if shape.has_text_frame:
                chunks.append(shape.text_frame.text)
            if shape.has_table:
                for row in shape.table.rows:
                    chunks.append(" ".join(cell.text for cell in row.cells))
        slides.append("\\n".join(chunks))
    return slides


def _workspace_state():
    """Load the recorded environment state (calendar + outbox)."""
    for base in _bases():
        candidate = base / ".openclaw" / "workspace-state.json"
        if candidate.is_file():
            return json.loads(candidate.read_text())
    return {}`,

  artifactDocs: [
    { label: "Persona context", file: "persona_context.md", description: "Full persona profile the contributor built from the universe." },
    { label: "Prompt", file: "prompt.md", description: "The final user-facing prompt." },
    { label: "GTFA", file: "GTFA.md", description: "The Ground Truth Final Answer — methodology, calculations, and exact values." },
    { label: "Rubrics", file: "rubrics.md", description: "The raw 21-criterion rubric set." },
    { label: "Draft history", file: "draft_history.md", description: "Agent objective and desired-outcome notes." },
  ],

  narrative: {
    realitySub:
      "Once the deck idea is chosen, pressure-test it before defining anything: would Aaliyah really study asset allocation this way, and what would have to be true for it to hold? That reasoning decides which messy, gathered inputs to build — then the strategy locks them in.",
    inputsSub:
      "The handwritten note and presentation.md are the source of truth. Four reference inputs and two spec files must be read and reconciled into a seven-slide deck — every input drives a checkable output. Filter by role and click any asset for details.",
    ssotTitle: "The handwritten note + presentation.md — the source of truth",
    ssotBlurb:
      "The investor-profile values live on a rushed handwritten note; the slide structure, exact titles, and formatting rules live in presentation.md (shown below). Together they define what 'correct' means — every other input is read against them.",
    inputsVariant: "reference",
    showFrictionTypes: false,
    galleryTitle: "The reference inputs — and what each one feeds",
    frictionTitle: "The reasoning traps planted across these inputs",
    frictionBlurb:
      "None of these are perception gotchas. Each is an attractive wrong path a careful reader could still take — decade-labeled data that invites independent compounding, a monthly rate with two plausible definitions, reference images that look like slide content. Difficulty lives in the joins between sources, not in any single hard-to-read value.",
    gtfaSub:
      "The one correct deliverable, built by hand before the prompt was written: a seven-slide deck with deterministic compounding, plus the mentor review and email. This is the behavior a correct agent should produce.",
    gtfaTreeTitle: "The deck & state changes",
    gtfaBehaviorTitle: "The expected behavior",
    gtfaBehavior: [
      "Build asset_allocation.pptx with the seven exact slide titles, the navy/white/gold formatting, and 2-decimal rounding from presentation.md.",
      "Compound the full 20-year horizon as two chained phases — carry each 2010s ending balance into the 2020s — for both the initial-only and the $300/month tables.",
      "Read values from the note and images without pasting any source image into the deck; keep Slide 6 empty and Slide 7 under 100 words with the exact per-asset final values.",
      "Schedule a 15-minute Carlton review on Monday 8 June 2026, 10:00–10:15 AM, and email the deck to c.davis.columbus@outlook.com.",
    ],
    actualSub:
      "Reconstructed from the seed trajectory and its workspace (including the model's own build_presentation.py) — a single prompt-agent interaction, compared against the GTFA.",
    silverSub:
      "Targeted follow-ups guide the model to the correct deck, always restoring to seed. Each one targets a specific failure observed in the run above.",
    silverSuccessHeadline: "The deck and both state changes now match the GTFA",
    silverSuccess: [
      ["The deck", "asset_allocation.pptx rebuilt with the chained 20-year compounding and the correct monthly-contribution math on Slides 4 and 5."],
      ["Per-asset fidelity", "Slide 7 states the four exact final values within 100 words — no portfolio-weighted substitute."],
      ["Clean inputs", "Source images removed from the deck; Slide 6 left empty; Slide 3 kept text-only."],
      ["State changes", "The Carlton review event (Mon 8 Jun, 10:00–10:15) and the email with the deck attached are confirmed."],
    ],
    testsSub:
      "Reviewer-only checks across the deck structure, the deterministic calculations, and the calendar/email state changes. Click any test to reveal its code.",
    unitTestGroups: ["Presentation Structure", "Calculation", "State Change"],
  },
};

export default task2;
