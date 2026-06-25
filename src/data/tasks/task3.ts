import type { Task } from "../types";

const task3: Task = {
  meta: {
    id: "task3",
    serviceId: "6a076b30fb7ee59da499fd30",
    title: "Smart Bottle Launch Budget",
    category: "Data Analysis & Research",
    subcategory: "Financial Decision Support",
    universe: "brandon",
    personaName: "Brandon",
    oneLiner:
      "Decide which investment positions Brandon should liquidate to fund a $25,000 hydration bottle launch without overselling, then size production from live competitor pricing.",
    difficulty: "Hard",
    outputType: "final_insights.md (structured financial brief)",
    modalities: ["Handwritten note", "Financial accounts", "Live web search", "Markdown spec"],
    status: "Golden",
  },
  assetRoot: "tasks/task3",
  personaDocPath: "tasks/task3/artifacts/persona_context.md",
  personaPrompt:
    "Hey, I need to get familiar with Brandon's background and situation. Could you help me understand the key aspects of his profile, such as his occupation, financial accounts and holdings, ongoing projects, and any other relevant context that would help me better understand his day-to-day life, responsibilities, and priorities?",

  personaHighlights: [
    { label: "Situation", value: "Burned out on corporate life, weighing a first real venture" },
    { label: "Venture", value: "A premium smart hydration bottle brand, $25,000 launch budget" },
    { label: "Liquidity", value: "About $6,700 liquid across a checking and a savings account" },
    { label: "Portfolio", value: "Five investment positions he would sell if they rise 5%" },
  ],

  brainstorm: [
    {
      title: "Launch Budget Capital Plan",
      body: "Work out which investment positions Brandon should liquidate to reach a $25,000 launch budget without overselling, plus a competitor pricing baseline (Stanley Quencher) and a manufacturing capacity estimate.",
      chosen: true,
      why: "It fits Brandon's situation naturally, a professional with modest liquid cash and a handful of positions dreaming about a first venture, and it leaves room for layered reasoning rather than a single lookup. The agent has to retrieve the liquid cash from his accounts, read a handwritten note of positions, grow each by 5%, choose the subset that just clears $25,000 without overselling, research live competitor prices, and turn 80% of the budget into a manufacturing estimate. The deliverable is one structured file, so the difficulty lives in the reasoning, not the formatting.",
    },
    {
      title: "Monthly Cash-Flow Audit",
      body: "Reconcile Brandon's recurring income against his subscriptions, loans, and credit-card balance to find how much he can realistically set aside each month.",
      chosen: false,
    },
    {
      title: "Debt-Payoff Strategy",
      body: "Compare paying down his carried credit-card balance against keeping the cash invested, and recommend a payoff schedule.",
      chosen: false,
    },
  ],

  realityFirst: [
    "Would a corporate professional with modest savings really need this? Yes. Brandon has only a few thousand in liquid cash and a handful of investment positions, so funding a $25,000 launch means deciding what to sell, a natural question to bring to an assistant.",
    "For the task to test reasoning, the liquid cash has to live in his accounts and be retrieved, not handed over in the prompt. Forgetting to retrieve it is the one mistake that breaks everything after it.",
    "The positions fit a handwritten note because Brandon jotted them down quickly. The note lists dollar values, not share counts, so the 5% increase applies directly to each value.",
    "For the selection to have a single defensible answer, the note values are chosen so exactly one clean combination reaches the remaining gap without overselling.",
    "The competitor price has to come from a live search that returns both a regular and a sale price, so the agent has to choose deliberately rather than grab the cheapest number it sees.",
  ],

  mmStrategy: [
    "A handwritten note holds the five investment positions and the current cash value in each: Apple, Meta, Microsoft, Nvidia, and Rekor Systems.",
    "The liquid cash lives in Brandon's bank accounts inside the universe and has to be queried, summing the checking ($3,900) and savings ($2,800) balances to $6,700.",
    "A format specification file pins down the exact sections, labels, and number formatting that final_insights.md must follow.",
    "A live web search supplies the Stanley Quencher price, returning a regular retail price and a lower sale price, so the agent has to pick the right one.",
    "The friction is reasoning shaped: retrieve the liquidity, apply 5% to the cash values, solve the subset-sum for the closest combination over the target, and ignore the sale-price distractor.",
  ],

  assets: [
    {
      filename: "IMG_20260519_124220.jpg",
      src: "mm_input/IMG_20260519_124220.jpg",
      kind: "handwritten",
      role: "ssot",
      whatItShows:
        "A rushed handwritten note listing five investment positions and the current cash value held in each: Apple 6,666.67, Meta 7,714.69, Microsoft 5,047.62, Nvidia 5,714.29, and Rekor Systems 3,714.29.",
      verdict: "Source of the five positions, each grown by 5% to estimate its sale value.",
      rationale:
        "The note gives dollar values, not share counts, so the 5% increase applies straight to each number (Apple becomes $7,000, Microsoft $5,300, Nvidia $6,000, and so on). Reading all five correctly is the foundation of the selection.",
      tags: ["SSOT", "positions", "cash values"],
    },
  ],

  captions: [],

  prompt: `Hey, Brandon here. Lately I've been feeling pretty burned out with corporate life, so I've been thinking seriously about finally giving a real shot to an idea I've had for a while: building a premium smart hydration bottle brand.

Currently, this is still at a very early stage, and I need to figure out a few things before moving forward seriously, especially around what my budget can realistically support and getting a better understanding of the competitors already operating in this space.

First things first, let's talk about money. For this initial launch, I'm estimating I'll need somewhere around $25,000 to cover early prototyping, branding, packaging development, and eventually give production some real volume once things start moving.

Right now, my available liquid cash is still quite far from that amount, so I'll probably need to free up some capital from my current investments. I have put together and sent you a quick note with the assets I currently hold and I would be comfortable selling if they increase by a 5% during this AI March run; including the total cash I currently have in each one (regardless of gains or losses). I want you to review those assets together with my current liquid cash and tell me which positions I would need to sell in order to reach the $25,000 launch budget (assuming all of them will go up at least a 5%). I do not want to oversell, so only select the combination that gets as close as possible to the $25,000 but still stays over it.

Finally, to get a better understanding of competitor pricing and potential production scale, I need you to look into the Stanley Quencher model, tell me its current market prices, and estimate how many bottles I could manufacture using 80% of my planned budget, assuming my production cost per unit would be 5% lower than the retail price of those models. In case more than 1 Stanley Quencher model price is found, just stick to the cheapest one.

I've also included a final_artifact_format.md file that defines the exact structure, sections, and formatting I expect for the final deliverable. Your final artifact must be generated as final_insights.md, and it should strictly follow the layout and organizational requirements described in final_artifact_format.md`,

  promptAnnotations: [
    {
      quote: "I have put together and sent you a quick note with the assets I currently hold",
      meaning:
        "The handwritten note is the source of the five positions. Read the dollar value held in each one from the note.",
    },
    {
      quote: "review those assets together with my current liquid cash",
      meaning:
        "The liquid cash is not in the prompt. The agent has to retrieve it from Brandon's bank accounts and count it toward the $25,000 before deciding what to sell.",
    },
    {
      quote: "only select the combination that gets as close as possible to the $25,000 but still stays over it",
      meaning:
        "A subset-sum: after the 5% increase, pick the combination of positions that just clears the remaining gap without overshooting. Do not oversell.",
    },
    {
      quote: "look into the Stanley Quencher model … In case more than 1 … just stick to the cheapest one",
      meaning:
        "Live web research. If several variants appear, use the cheapest, and use the regular retail price rather than a temporary sale.",
    },
    {
      quote: "Your final artifact must be generated as final_insights.md … strictly follow … final_artifact_format.md",
      meaning:
        "The output structure is fixed by the format spec. Sections, labels, and number formatting must match it exactly.",
    },
  ],

  deliverableTree: {
    name: "final_insights.md",
    type: "doc",
    note: "single structured brief following final_artifact_format.md",
  },

  gtfaCalc: {
    artifactName: "final_insights.md",
    tracks: [
      {
        title: "Capital track — which positions to sell",
        steps: [
          { label: "Current liquid cash", expression: "$3,900.00 checking + $2,800.00 savings", value: "$6,700.00", note: "Retrieved from Brandon's bank accounts, not given in the prompt." },
          { label: "Remaining amount needed", expression: "$25,000.00 − $6,700.00", value: "$18,300.00" },
          { label: "Positions to sell (after +5%)", expression: "Apple $7,000 + Microsoft $5,300 + Nvidia $6,000", value: "$18,300.00", note: "The only clean combination that reaches the gap exactly without overselling.", highlight: true },
          { label: "Total available after sales", expression: "$6,700.00 + $18,300.00", value: "$25,000.00", note: "Meets the launch budget exactly.", highlight: true },
        ],
      },
      {
        title: "Manufacturing track — how many bottles",
        steps: [
          { label: "Cheapest Stanley Quencher (retail)", expression: "regular price, not the $18.75 sale", value: "$25.00" },
          { label: "Production budget", expression: "80% × $25,000.00", value: "$20,000.00" },
          { label: "Production cost per unit", expression: "5% below retail → $25.00 × 0.95", value: "$23.75" },
          { label: "Estimated units manufacturable", expression: "floor($20,000.00 / $23.75)", value: "842 units", highlight: true },
        ],
      },
    ],
  },

  memory: [],
  removed: [],
  email: { to: [], points: [] },

  silver: [
    {
      n: 1,
      label: "Retrieve the liquidity, then reselect",
      message:
        "Before selecting any positions, check Brandon's actual accounts for his liquid cash. His checking and savings together come to $6,700.00. Recompute the remaining amount as $25,000.00 − $6,700.00 = $18,300.00, and select the combination of positions (after the 5% increase) that reaches $18,300.00 as closely as possible without overselling. The correct combination is Apple $7,000.00, Microsoft $5,300.00, and Nvidia $6,000.00, which totals $18,300.00 and brings the total available to exactly $25,000.00.",
      fixes:
        "Repairs the root cause. Once the $6,700 liquidity is counted, the target drops to $18,300 and the unique clean combination (Apple, Microsoft, Nvidia) replaces the oversold four-position set.",
    },
    {
      n: 2,
      label: "Regenerate the brief to spec",
      message:
        "Regenerate final_insights.md so it strictly follows final_artifact_format.md, with the corrected liquid cash, remaining amount, recommended positions, estimated funds, and total available. Keep the competitor and manufacturing section as it already is.",
      fixes:
        "Carries the corrected capital track into the artifact while preserving the manufacturing track, which was already right.",
    },
    {
      n: 3,
      label: "Correct solution reached",
      message: "Correct solution reached. final_insights.md now matches the Ground Truth Final Answer.",
      fixes: "End state: a verified correct trajectory, restored from seed and never started fresh.",
    },
  ],

  unitTests: [
    {
      ref: "test_sections_present",
      logic: "Verifies all required sections and subsections appear as headings in final_insights.md.",
      group: "Structure",
      code: `def test_sections_present():
    """All required sections and subsections must be present in some heading."""
    content = _read_insights()
    assert content, "final_insights.md not found or empty"

    all_headings = [
        line.strip() for line in content.splitlines()
        if re.match(r"^#{2,4} ", line.strip())
    ]
    assert all_headings, "No headings found in final_insights.md"

    expected = [
        "Current Liquid Cash",
        "Remaining Amount Needed",
        "Stocks to Liquidate",
        "Competitor Pricing Analysis",
        "Recommended Positions to Sell",
        "Estimated Funds Generated",
        "Stanley Quencher Pricing",
        "Estimated Manufacturing Capacity",
    ]
    for kw in expected:
        idx = next((i for i, t in enumerate(all_headings) if kw.lower() in t.lower()), None)
        assert idx is not None, f"Heading '{kw}' not found. Present headings: {all_headings}"`,
    },
    {
      ref: "test_h3_format",
      logic: "Verifies the four main sections are labeled as ### (H3).",
      group: "Structure",
      code: `def test_h3_format():
    """Main sections must be labeled with ### (H3)."""
    content = _read_insights()
    assert content, "final_insights.md not found or empty"

    h3_titles = [
        line.strip() for line in content.splitlines()
        if line.strip().startswith("### ") and not line.strip().startswith("#### ")
    ]
    expected = [
        "Current Liquid Cash",
        "Remaining Amount Needed",
        "Stocks to Liquidate",
        "Competitor Pricing Analysis",
    ]
    for kw in expected:
        idx = next((i for i, t in enumerate(h3_titles) if kw.lower() in t.lower()), None)
        assert idx is not None, f"Section '{kw}' is not labeled as ### (H3). Present: {h3_titles}"`,
    },
    {
      ref: "test_h4_format",
      logic: "Verifies the subsections are labeled as #### (H4).",
      group: "Structure",
      code: `def test_h4_format():
    """Subsections must be labeled with #### (H4)."""
    content = _read_insights()
    assert content, "final_insights.md not found or empty"

    h4_titles = [
        line.strip() for line in content.splitlines()
        if line.strip().startswith("#### ")
    ]
    expected = [
        "Recommended Positions to Sell",
        "Estimated Funds Generated",
        "Stanley Quencher Pricing",
        "Estimated Manufacturing Capacity",
    ]
    for kw in expected:
        idx = next((i for i, t in enumerate(h4_titles) if kw.lower() in t.lower()), None)
        assert idx is not None, f"Subsection '{kw}' is not labeled as #### (H4). Present: {h4_titles}"`,
    },
    {
      ref: "test_dollar_amount_formats",
      logic: "Verifies every labeled monetary line carries a properly formatted $X,XXX.XX value.",
      group: "Structure",
      code: `def test_dollar_amount_formats():
    """Every bold value line must carry a properly formatted dollar amount: $X,XXX.XX."""
    content = _read_insights()
    assert content, "final_insights.md not found or empty"

    _MONEY_RE = re.compile(r"\\$\\d{1,3}(?:,\\d{3})*\\.\\d{2}")
    value_labels = [
        "**Current Liquid Cash:**",
        "**Remaining Amount Needed:**",
        "**Estimated Funds Generated:**",
        "**Total Available After Sales:**",
        "**Production Budget (80%):**",
        "**Production Cost per Unit:**",
    ]
    for label in value_labels:
        lines = [l for l in content.splitlines() if label in l]
        assert lines, f"Value line not found for label: {label}"
        assert _MONEY_RE.search(lines[0]), f"No $X,XXX.XX amount on line for '{label}': {lines[0]!r}"`,
    },
    {
      ref: "test_section_3a_values_reflect_5pct_increase",
      logic: "Verifies each recommended position's value is exactly 5% above its note value.",
      group: "Values",
      code: `def test_section_3a_values_reflect_5pct_increase():
    """Each value in section 3a must be exactly 5% above the original note value."""
    content = _read_insights()
    assert content, "final_insights.md not found or empty"
    bullets = _parse_section_3a_bullets(content)
    assert bullets, "No section 3a bullet lines found"
    for name, reported in bullets:
        original = next((v for k, v in _ORIGINAL_VALUES.items() if k in name), None)
        assert original is not None, f"No original value on record for '{name}'"
        expected = round(original * 1.05, 2)
        assert abs(reported - expected) < 0.02, (
            f"'{name}': reported \${reported:,.2f} but expected \${expected:,.2f}"
        )`,
    },
    {
      ref: "test_section_3a_stock_names_are_allowed",
      logic: "Verifies the recommended positions are only Apple, Microsoft, or Nvidia.",
      group: "Values",
      code: `def test_section_3a_stock_names_are_allowed():
    """Stock names in section 3a must only be Apple, Microsoft, or Nvidia."""
    content = _read_insights()
    assert content, "final_insights.md not found or empty"
    bullets = _parse_section_3a_bullets(content)
    assert bullets, "No section 3a bullet lines found"
    for name, _ in bullets:
        matched = any(allowed in name for allowed in _ALLOWED_STOCK_NAMES)
        assert matched, f"Stock '{name}' is not one of {sorted(_ALLOWED_STOCK_NAMES)}"`,
    },
  ],

  rubricDesign: [
    {
      title: "Grounded, atomic, outcome based",
      body:
        "Every positive rubric maps back to the prompt, the format specification, or the GTFA, and checks one outcome: one retrieved value, one computed figure, one stated line. Nothing is graded that those sources did not ask for.",
    },
    {
      title: "Weights track complexity, not importance",
      body:
        "Each weight reflects how much reasoning a check takes to get right, not how important it feels. +5 marks the subset-sum that reconciles the note values, the retrieved liquidity, and the closest-over constraint at once; +3 a single reasoning or retrieval step; +1 a mechanical check.",
    },
    {
      title: "One root cause, graded where it surfaces",
      body:
        "The whole capital track depends on retrieving the liquidity. Rather than collapse the failure into one rubric, it is graded where it surfaces: in the trajectory (the account was never consulted) and in each artifact value it corrupted. This keeps every criterion measuring exactly one thing while still reflecting the cascade.",
    },
    {
      title: "Negatives target the attractive wrong path",
      body:
        "The negatives encode the path the run actually took: reaching $25,000 from stock sales alone while ignoring the existing $6,700 liquidity (the strongly pulled trap, -5), which produces a combination other than Apple, Microsoft, and Nvidia (-3).",
    },
  ],

  rubrics: [
    {
      n: 1,
      text: "The file `final_insights.md` exists.",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Prompt: 'Your final artifact must be generated as final_insights.md.'",
      status: "present",
      observed: "The agent wrote final_insights.md to the workspace.",
      rationale: "The foundational deliverable check. Mechanical to satisfy and to verify, so it is weighted at +1.",
    },
    {
      n: 2,
      text: "The trajectory consults Brandon Marcus Jackson's Fincrack accounts and considers `Bank of Hawaii checking $3,900.00` plus `Bank of Hawaii savings $2,800.00` as liquid cash for the recalculation.",
      points: 3,
      category: "Agent Behavior — Trajectory",
      evalTarget: "Trajectory",
      enforces: "Prompt: 'review those assets together with my current liquid cash.'",
      status: "not-present",
      observed: "The agent searched memory for a cash value and concluded liquid cash was $0.00 without ever querying the bank accounts.",
      rationale: "Retrieving the liquidity is a real tool-use and reconciliation step (find the accounts, sum checking and savings), so it carries a +3.",
      whyCorrect: "The model determines the user's existing liquidity amount before identifying the stock positions to sell.",
      whyImportant: "This intermediate step was required for the model to correctly determine the stock positions to sell and the total amount those positions needed to represent to reach the $25,000. A significant part of the decision-making required to fulfill the prompt depended on it.",
      whatWrong: "The model searches memory for Brandon's cash instead of checking the user's account information.",
    },
    {
      n: 3,
      text: "The agent correctly extracts all five stock positions and their current values from the handwritten note image: Apple `$6,666.67`, Meta `$7,714.69`, Microsoft `$5,047.62`, Nvidia `$5,714.29`, and Rekor Systems `$3,714.29`.",
      points: 3,
      category: "Agent Behavior — Trajectory",
      evalTarget: "Trajectory",
      enforces: "Prompt + handwritten note: the five positions and their cash values.",
      status: "present",
      observed: "The agent accurately read all five positions and values from the note image.",
      rationale: "A multimodal extraction step (reading five handwritten values), so it carries a +3.",
    },
    {
      n: 4,
      text: "The `### 1. Current Liquid Cash` section of `final_insights.md` states the current liquid cash as `$6,700.00`.",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "final_artifact_format.md Section 1.",
      status: "not-present",
      observed: "The artifact states the current liquid cash as $0.00 rather than $6,700.00.",
      rationale: "A mechanical statement of a value retrieved upstream, so the +1 sits here while the retrieval complexity is credited in rubric 2.",
      whyCorrect: "This verifies not only that the liquidity quantity was calculated correctly, but also that it was explicitly included as required in final_artifact_format.md.",
      whyImportant: "The format file included in the task multimodal context defined the exact expected format, so the model was expected to fully adhere to it.",
      whatWrong: "The model dragged the mistake caused by overlooking the liquidity check into the final artifact.",
    },
    {
      n: 5,
      text: "The `### 2. Remaining Amount Needed` section of `final_insights.md` states the remaining amount needed as `$18,300.00`.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "final_artifact_format.md Section 2: $25,000.00 − current liquid cash.",
      status: "not-present",
      observed: "The artifact states the remaining amount needed as $25,000.00, not $18,300.00.",
      rationale: "Sets the target for the selection and depends on the retrieved liquidity plus a subtraction, so it carries a +3.",
      whyCorrect: "This amount determines the target quantity that must be obtained from the stock positions after applying the 5% increase.",
      whyImportant: "This amount is directly tied to the core intent of the prompt, so the model was expected to determine it correctly.",
      whatWrong: "By assuming the user's liquidity balance was $0, the model incorrectly determines that the stock positions alone must total $25,000.",
    },
    {
      n: 6,
      text: "The `#### 3a. Recommended Positions to Sell` list in the `final_insights.md` includes the bullet `- APPLE — Value After +5%: $7,000.00`.",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA: Apple is part of the correct combination.",
      status: "present",
      observed: "The artifact lists the exact Apple bullet at $7,000.00.",
      rationale: "A bullet-presence check; Apple appears in many candidate combinations, so it is weak signal on its own and weighted +1.",
    },
    {
      n: 7,
      text: "The `#### 3a. Recommended Positions to Sell` list in the `final_insights.md` includes the bullet `- MICROSOFT — Value After +5%: $5,300.00`.",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA: the unique closest-over combination is Apple + Microsoft + Nvidia.",
      status: "not-present",
      observed: "The artifact does not list Microsoft among the recommended positions; the model chose a different, oversold combination.",
      rationale: "A bullet-presence check, the same mechanical action as the Apple and Nvidia bullets, so it is weighted +1 like them. The selection reasoning it reflects is credited once, in the estimated funds figure. Microsoft is simply the position the model dropped when it oversold.",
      whyCorrect: "The user doesn't want to oversell, and the combination must get as close as possible to the $25,000 while still staying over it. The only three-position combination that meets the target includes Microsoft.",
      whyImportant: "There is a single source of truth defining the stock combination required to reach $18,300, and that combination includes Microsoft.",
      whatWrong: "The model uses a different stock combination after incorrectly assuming the full $25,000 must come from selling stocks and omitting the existing $6,700 liquidity.",
    },
    {
      n: 8,
      text: "The `#### 3a. Recommended Positions to Sell` list in the `final_insights.md` includes the bullet `- NVIDIA — Value After +5%: $6,000.00`.",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA: Nvidia is part of the correct combination.",
      status: "present",
      observed: "The artifact lists the exact Nvidia bullet at $6,000.00.",
      rationale: "A bullet-presence check; Nvidia also appears in the model's wrong combination, so it is weak signal and weighted +1.",
    },
    {
      n: 9,
      text: "The `#### 3b. Estimated Funds Generated` section of `final_insights.md` states the estimated funds generated as `$18,300.00`.",
      points: 5,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA: the sum of the correct combination is $18,300.00.",
      status: "not-present",
      observed: "The artifact states the estimated funds generated as $25,000.42 instead of $18,300.00.",
      rationale: "The estimated funds figure is the direct output of the subset-sum, reconciling the five note values, the retrieved liquidity, and the closest-over constraint at once. It is the most complex criterion in the task, so it carries the +5.",
      whyCorrect: "The prompt required the model to account for the user's existing $6,700 liquidity when determining how much needed to be generated from selling stocks. Since the target was $25,000, the stock sales only needed to generate $18,300.00.",
      whyImportant: "This amount defines the actual target value the recommended positions must cover after the 5% increase. If the model uses a different amount, the selected positions and final recommendation are based on the wrong funding target.",
      whatWrong: "The model incorrectly treated the full $25,000 as needing to come from stock sales, instead of subtracting the existing $6,700 liquidity first.",
    },
    {
      n: 10,
      text: "The `#### 3b. Estimated Funds Generated` section of `final_insights.md` states the total available after sales as `$25,000.00`, indicating that it meets the `$25,000` launch budget.",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "GTFA: liquidity plus proceeds equals exactly $25,000.00.",
      status: "not-present",
      observed: "The artifact states the total available as $25,000.42 rather than exactly $25,000.00.",
      rationale: "Validates the closest-over outcome, which depends on the correct combination, so it carries a +3.",
      whyCorrect: "The originally reported total still meets the prompt intent because it remains above $25,000, but it does not satisfy the requirement to select the closest valid combination above $25,000, since it comes from the wrong stocks. The total available should be $25,000.00.",
      whyImportant: "The final available amount is a core outcome of the task because it validates whether the selected combination correctly fulfills the target budget.",
      whatWrong: "The model reported a total that met the general launch budget intent, but the selected combination did not satisfy the requirement of being the closest possible amount above $25,000.",
    },
    {
      n: 11,
      text: "The model correctly uses the regular retail price rather than the sale price (e.g., `$25.00` instead of `$18.75` for the `Stanley Quencher H2.0 FlowState Tumbler, 14 oz`) as the basis for calculating the production cost based on the cheapest Stanley Quencher model.",
      points: 3,
      category: "Agent Behavior — Trajectory",
      evalTarget: "Trajectory",
      enforces: "Prompt: production cost is 5% below the retail price.",
      status: "present",
      observed: "The agent explicitly decided to use the regular retail price ($25.00) instead of the $18.75 sale price.",
      rationale: "A judgment step: recognize the sale price as a distractor and use retail per the prompt. It carries a +3.",
    },
    {
      n: 12,
      text: "The `#### 4a. Stanley Quencher Pricing` section of `final_insights.md` states the cheapest Stanley Quencher model price (e.g., `$25.00`).",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "final_artifact_format.md Section 4a.",
      status: "present",
      observed: "The artifact states the Stanley Quencher price as $25.00.",
      rationale: "A mechanical statement of the researched price, weighted +1.",
    },
    {
      n: 13,
      text: "The `#### 4b. Estimated Manufacturing Capacity` section of `final_insights.md` states the production budget as `$20,000.00`, which corresponds to 80% of the total `$25,000.00` budget.",
      points: 1,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Prompt: 80% of the $25,000 budget.",
      status: "present",
      observed: "The artifact states the production budget as $20,000.00.",
      rationale: "A single mechanical computation (80% of a fixed budget), weighted +1.",
    },
    {
      n: 14,
      text: "The `#### 4b. Estimated Manufacturing Capacity` section of `final_insights.md` states the `**Production Cost per Unit:**` as 5% lower than the regular retail price of the cheapest Stanley Quencher model found (e.g., `$23.75` based on a retail price of `$25.00`).",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Prompt: 5% below the retail price.",
      status: "present",
      observed: "The artifact states the production cost per unit as $23.75, referencing the 14oz Tumbler retail price of $25.00.",
      rationale: "Deriving the per-unit cost as 5% below the retail price of the cheapest model ties the price choice to a computation, so it carries a +3.",
    },
    {
      n: 15,
      text: "The `#### 4b. Estimated Manufacturing Capacity` section of `final_insights.md` correctly states the estimated number of units manufacturable as the total production budget (`$20,000.00`) divided by the calculated production cost per unit (e.g., `842 units` based on a production cost of `$23.75` per unit).",
      points: 3,
      category: "Task Completion — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Prompt: units = production budget / cost per unit.",
      status: "present",
      observed: "The artifact states the estimated units manufacturable as 842 units.",
      rationale: "Deriving the manufacturable units reconciles the production budget with the per-unit cost, so it carries a +3.",
    },
    {
      n: 16,
      text: "The model includes an asset combination other than Apple, Microsoft, and NVIDIA as the closest valid combination to reach the `$25,000` target amount (starting from the initial `$6,700` liquidity).",
      points: -3,
      category: "Agent Behavior — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Negative: the recommended combination must be the unique closest-over set.",
      status: "present",
      observed: "The model recommended Apple, Meta, Nvidia, and Rekor Systems, a combination other than the correct Apple, Microsoft, Nvidia.",
      rationale: "The wrong-combination symptom of the overselling error. A plausible result of the cascade, weighted -3.",
    },
    {
      n: 17,
      text: "The model reaches the `$25,000` target amount using only asset prices, excluding the initial liquidity balance.",
      points: -5,
      category: "Agent Behavior — Final answer/artifact",
      evalTarget: "Final answer/artifact",
      enforces: "Negative: the existing liquid cash must be counted before selling.",
      status: "present",
      observed: "Treating liquid cash as $0, the model raised the full $25,000.42 from stock sales alone, overselling the position.",
      rationale: "The root attractive wrong path. Skipping the liquidity retrieval and raising everything from sales is the strongly pulled trap, weighted -5.",
    },
  ],

  friction: [
    {
      id: "retrieve-liquidity",
      title: "Liquid cash must be retrieved, not assumed",
      type: "perception",
      where: "Brandon's bank accounts (environment)",
      description:
        "The liquid cash is not in the prompt. The agent has to query Brandon's accounts and add the checking and savings balances ($3,900 + $2,800 = $6,700). Assuming $0 forces the whole target onto stock sales and oversells.",
      whyItWorks:
        "It is the one step that has to be done by reaching into the environment rather than reading the prompt, and skipping it cascades through every capital figure.",
    },
    {
      id: "cash-not-shares",
      title: "Cash values, not share counts",
      type: "perception",
      where: "Handwritten note → 5% increase",
      description:
        "The note lists the dollar value held in each position, not a number of shares, so the 5% appreciation applies directly to each value (Apple $6,666.67 becomes $7,000.00).",
      whyItWorks:
        "It removes any need to look up live share prices and keeps the arithmetic deterministic, so the only way to miss it is to misread the note's meaning.",
    },
    {
      id: "subset-sum",
      title: "One clean combination, no overselling",
      type: "perception",
      where: "Selection → $18,300 target",
      description:
        "After the 5% increase, the only combination that reaches the $18,300 gap exactly without overshooting is Apple + Microsoft + Nvidia. Any other set either oversells or only works by ignoring the liquidity.",
      whyItWorks:
        "It makes the selection a real subset-sum with a single defensible answer, so a wrong combination is unambiguous.",
    },
    {
      id: "retail-vs-sale",
      title: "Retail price versus the sale price",
      type: "perception",
      where: "Live web search → Stanley Quencher",
      description:
        "The search surfaces a regular retail price ($25.00) next to a lower sale price ($18.75). The prompt asks for retail-based production cost, so the sale price is a distractor.",
      whyItWorks:
        "It tests whether the agent reads the user's intent (retail) instead of grabbing the cheapest number on the page.",
    },
  ],

  inputDocs: [
    {
      file: "final_artifact_format.md",
      label: "The exact structure final_insights.md must follow",
      markdown: true,
    },
  ],

  actualRun: {
    summary:
      "Single turn run from seed. The agent read the handwritten note correctly and got the entire competitor and manufacturing track right, but it never consulted Brandon's accounts. It concluded liquid cash was $0.00, so the remaining amount became the full $25,000, and it oversold: it picked Apple, Meta, Nvidia, and Rekor Systems to raise $25,000.42 from stock sales alone instead of the $18,300 the task actually needed. One missed retrieval cascaded through the whole capital track. Each finding below pins the expected behavior to what the model did and to the evidence for it.",
    layout: "compare",
    observations: [
      {
        id: "no-liquidity",
        title: "Liquid cash never retrieved",
        outcome: "fail",
        rubrics: [2, 4],
        expected: "Query Brandon's bank accounts and count the checking ($3,900) plus savings ($2,800) as $6,700 liquid cash.",
        what: "The agent searched memory for a cash value, found none, and concluded liquid cash was $0.00 without ever consulting any account.",
        evidence: "Trajectory: memory search for Brandon's cash, then 'liquid cash not provided ($0.00)'; final_insights.md Section 1 reads $0.00.",
      },
      {
        id: "wrong-remaining",
        title: "Remaining amount inflated to the full budget",
        outcome: "fail",
        rubrics: [5],
        expected: "Remaining = $25,000.00 − $6,700.00 = $18,300.00.",
        what: "With liquidity treated as $0, the agent set the remaining amount to the full $25,000.00.",
        evidence: "final_insights.md Section 2: $25,000.00.",
      },
      {
        id: "oversold",
        title: "Oversold the positions to hit $25,000 from sales alone",
        outcome: "fail",
        rubrics: [7, 9, 10, 16, 17],
        expected: "Sell Apple + Microsoft + Nvidia = $18,300.00, bringing the total available to exactly $25,000.00.",
        what: "The agent selected Apple + Meta + Nvidia + Rekor Systems = $25,000.42, omitting Microsoft and overselling, because it tried to raise the whole budget from stocks.",
        evidence: "final_insights.md 3a: APPLE $7,000 + META $8,100.42 + NVIDIA $6,000 + REKOR $3,900; funds generated $25,000.42.",
      },
      {
        id: "note-read",
        title: "Handwritten note read correctly",
        outcome: "pass",
        rubrics: [3],
        expected: "Extract all five positions and values from the note.",
        what: "The agent read Apple $6,666.67, Meta $7,714.69, Microsoft $5,047.62, Nvidia $5,714.29, and Rekor Systems $3,714.29 accurately.",
        evidence: "Trajectory: image extraction lists all five values.",
      },
      {
        id: "retail-choice",
        title: "Chose retail over the sale price",
        outcome: "pass",
        rubrics: [11],
        expected: "Use the $25.00 regular retail price, not the $18.75 sale price.",
        what: "The agent explicitly chose the regular retail price for the production-cost calculation.",
        evidence: "Trajectory: decision to use $25.00 over the $18.75 sale price.",
      },
      {
        id: "manufacturing",
        title: "Competitor and manufacturing track correct",
        outcome: "pass",
        rubrics: [1, 12, 13, 14, 15],
        expected: "Stanley price $25.00, budget $20,000.00, cost per unit $23.75, units 842, written to final_insights.md.",
        what: "The agent produced the file and got every competitor and manufacturing figure right.",
        evidence: "final_insights.md Section 4: $25.00, $20,000.00, $23.75, 842 units.",
      },
    ],
  },

  unitTestPreamble: `#!/usr/bin/env python3
import sys
import subprocess
import importlib
import re
from pathlib import Path

# --- pytest auto-install ---
try:
    import pytest
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pytest"])
    pytest = importlib.import_module("pytest")

# --- directory config ---
TASK_DIR = Path(__file__).resolve().parent

# Original stock values from the input image (IMG_20260519_124220.jpg)
_ORIGINAL_VALUES = {
    "apple": 6666.67,
    "meta": 7714.69,
    "microsoft": 5047.62,
    "nvidia": 5714.29,
    "rekor": 3714.29,
}
_ALLOWED_STOCK_NAMES = {"apple", "microsoft", "nvidia"}
_BULLET_RE = re.compile(
    r"^-\\s+(.+?)\\s+[—–\\-]+\\s+Value After \\+5%:\\s+\\$([\\d,]+\\.\\d{2})",
    re.IGNORECASE,
)


def _search_bases():
    """Where to look for the agent's output files."""
    return [TASK_DIR / "workspace", TASK_DIR]


def _find_final_insights():
    """Find final_insights.md (case-insensitive stem)."""
    for base in _search_bases():
        if not base.exists():
            continue
        for path in base.rglob("*.md"):
            if path.is_file() and path.stem.lower() == "final_insights":
                return path.resolve()
    return None


def _read_insights() -> str:
    p = _find_final_insights()
    return p.read_text(encoding="utf-8", errors="replace") if p else ""


def _parse_section_3a_bullets(content: str):
    """Return (name_lower, value_float) pairs from section 3a bullet lines."""
    results = []
    for line in content.splitlines():
        m = _BULLET_RE.match(line.strip())
        if m:
            results.append((m.group(1).strip().lower(), float(m.group(2).replace(",", ""))))
    return results


# --- tests go here ---`,

  artifactDocs: [
    { label: "Prompt", file: "prompt.md", description: "The final user-facing prompt." },
    { label: "GTFA", file: "GTFA.md", description: "The Ground Truth Final Answer, both tracks with exact values." },
    { label: "Rubrics", file: "rubrics.md", description: "The raw 17-criterion rubric set." },
    { label: "Draft history", file: "draft_history.md", description: "Agent objective, core functionalities, and desired outcome notes." },
  ],

  narrative: {
    hidePersonaDoc: true,
    showFrictionTypes: false,
    realitySub:
      "After choosing the capital-plan idea, pressure-test it: would Brandon really face this decision, and what would have to be true for it to hold? That reasoning decides which evidence to place where, and which step is the one most likely to be skipped.",
    inputsSub:
      "Three sources have to be reconciled: a handwritten note of positions, the liquid cash held in Brandon's accounts, and a live web price. A format specification fixes the output. The catch is that the liquidity has to be retrieved, not read from the prompt.",
    ssotTitle: "The handwritten note — the five positions",
    ssotBlurb:
      "Brandon jotted down what he holds and the current cash value in each position. The values are dollars, not share counts, so the 5% increase applies directly. This note is one of two sources the selection depends on; the other, his liquid cash, has to be pulled from his accounts.",
    frictionTitle: "The reasoning traps planted in this task",
    frictionBlurb:
      "None of these are perception gotchas. Each is an attractive wrong path a careful reader could still take: liquidity that has to be fetched rather than read, a note of cash values rather than shares, a subset-sum with a single clean answer, and a sale price sitting next to the retail price that the prompt actually asks for.",
    gtfaSub:
      "The one correct deliverable, worked out by hand before the prompt was written. The answer is a derived chain, so it is shown as two dependent tracks: a missed step at the top of a track cascades into every figure below it.",
    gtfaBehaviorTitle: "The expected behavior",
    gtfaBehavior: [
      "Retrieve Brandon's liquid cash from his accounts ($3,900 checking + $2,800 savings = $6,700) before selecting anything.",
      "Apply 5% to each note value, then select the combination that reaches the $18,300 gap exactly without overselling: Apple + Microsoft + Nvidia.",
      "Search live for the Stanley Quencher price, use the regular retail ($25.00) over the $18.75 sale, and ignore the sale as a distractor.",
      "Turn 80% of the budget into a manufacturing estimate ($20,000 / $23.75 = 842 units) and write everything into final_insights.md exactly as final_artifact_format.md requires.",
    ],
    actualSub:
      "Reconstructed from the seed trajectory and its workspace (including the produced final_insights.md). A single prompt and agent interaction, compared against the GTFA.",
    silverSub:
      "A couple of targeted follow-ups guide the model to the correct brief, always restoring to seed. The first repairs the root cause; the second carries the fix into the artifact.",
    silverSuccessHeadline: "The brief now matches the GTFA",
    silverSuccess: [
      ["Liquidity counted", "The $6,700 liquid cash is retrieved and the remaining amount drops to $18,300."],
      ["Correct combination", "Apple + Microsoft + Nvidia totals $18,300, with no overselling."],
      ["Budget met exactly", "Total available after sales is exactly $25,000.00, meeting the launch budget."],
      ["Manufacturing intact", "The Stanley price, budget, per-unit cost, and 842 units carry over unchanged."],
    ],
    testsSub:
      "Reviewer only structural and value checks on final_insights.md. Each test is defined on its own; the shared scaffolding lives in the Template dropdown.",
    unitTestGroups: ["Structure", "Values"],
  },
};

export default task3;
