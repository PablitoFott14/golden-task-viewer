### 1. Persona Understanding

This task rationale starts by interacting with the Universe Creator (after first loading the **Service Universe Artifact ID** - **IMPORTANT**).

Within the **Database** tab, ask the AI agent:

> "Hey, I need to get familiar with Brandon's background and situation. Could you help me understand the key aspects of his profile, such as his occupation, personal relationships, financial accounts and holdings, interests, ongoing projects, and any other relevant context that would help me better understand his day-to-day life, responsibilities, and priorities?"

Use the response to generate a `persona_context.md` file (or similar).

* From this point onward, step into the persona's shoes. You are Brandon. Think, communicate, and reason as someone living within that universe.

The detail that matters most for this task is Brandon's financial environment: he holds a small amount of liquid cash spread across bank accounts (a checking and a savings account that together come to `$6,700`) and a separate set of investment positions. That split between liquid cash and investments is the spine of the whole task, because the agent has to reconcile both before it can answer the question.


### 2. Brainstorming

Based on the assigned **Category**, **Subcategory**, and the information gathered in `persona_context.md`, brainstorm realistic task ideas that would naturally arise in this persona's day-to-day:

#### Idea 1: Launch-Budget Capital Plan

Brandon is burned out on corporate life and wants to fund a premium smart hydration bottle brand. He needs to know which investment positions to liquidate to reach a `$25,000` launch budget without overselling, and he needs a competitor pricing baseline (Stanley Quencher) plus a manufacturing-capacity estimate.

#### Idea 2: Monthly Cash-Flow Audit

Reconcile Brandon's recurring income against his subscriptions, loans, and credit-card balance to find how much he can realistically set aside each month.

#### Idea 3: Debt-Payoff Strategy

Compare paying down the carried credit-card balance versus keeping the cash invested, and recommend a payoff schedule.


### 3. Which Idea Would I Feel More Comfortable Following Up With?

**Chosen Idea:**
**Idea 1: Launch-Budget Capital Plan**

**Why am I choosing this idea?**

It fits Brandon's situation naturally (a professional with modest liquid cash and a handful of investment positions, dreaming about a first venture) and it leaves room for genuine, layered reasoning rather than a single lookup. The agent has to do several things that depend on each other: retrieve the liquid cash from Brandon's accounts, read a handwritten note of investment positions, apply a `5%` appreciation to each, decide which subset to sell so the total just clears `$25,000` without overselling, research live competitor prices, and turn `80%` of the budget into a manufacturing estimate. The deliverable is a single structured file, so the difficulty lives in the reasoning, not in the formatting.


### 4. Don't Build the Prompt Yet - Build the Reality First

Which MM context could I be gathering or creating to support this idea?

Before writing the prompt I decide what evidence has to exist for the question to be answerable, and where each piece naturally lives.

- The liquid cash should **not** be handed to the agent in the prompt. It should live in Brandon's financial accounts inside the universe, so the agent has to actually query them and add the checking and savings balances together (`$3,900 + $2,800 = $6,700`). This is the step most likely to be skipped, and skipping it breaks everything downstream.
- The investment positions fit a **handwritten note** rather than a clean table, because Brandon jotted down what he holds in a hurry. The note lists the current cash value held in each position, not share counts, which is exactly what the prompt asks the agent to grow by `5%`.
- The competitor price should come from a **live web search**, not from the prompt, so the task tests real research. The search should surface more than one Stanley Quencher variant and a sale price next to a regular price, so the agent has to choose deliberately.
- The output format should be pinned down by a separate **format specification** file, so the structural requirements are testable and the reasoning stays the focus.

What would realistically increase the complexity?

- The capital answer is a small **subset-sum**: with the `5%` increase applied, the agent must find the combination of positions that reaches the remaining gap and stays just above it. The note is designed so the only clean three-position combination that lands exactly on the target includes Microsoft.
- The liquid cash and the investments must be **reconciled together**. If the agent forgets the `$6,700` already in the bank, it will try to raise the full `$25,000` from stock sales and oversell.


### 5. Final Decision on MM Context

I commit to the following inputs and where each one lives.

The investment positions come from a rough handwritten note, `IMG_20260519_124220.jpg`:

- Apple `$6,666.67`
- Meta `$7,714.69`
- Microsoft `$5,047.62`
- Nvidia `$5,714.29`
- Rekor Systems `$3,714.29`

These are current cash values held. After a `5%` increase they become Apple `$7,000.00`, Meta `$8,100.42`, Microsoft `$5,300.00`, Nvidia `$6,000.00`, and Rekor Systems `$3,900.00`.

The liquid cash lives in Brandon's accounts inside the universe (`$3,900` checking + `$2,800` savings = `$6,700`), retrievable only by querying them. It is deliberately not in the prompt.

The output structure is fixed by `final_artifact_format.md`, which defines the exact sections, labels, and number formatting for `final_insights.md`.

I'm also adding some controlled friction points:

- The liquid cash has to be discovered, not read. The agent must consult the accounts rather than assume a value.
- The note gives cash values, not share counts, so the `5%` increase applies directly to each value.
- The subset-sum has a single clean answer (Apple + Microsoft + Nvidia = `$18,300`, the exact remaining gap). Any other combination either overshoots by more or only works by ignoring the liquid cash.
- The web search returns both a regular retail price (`$25.00`) and a lower sale price (`$18.75`). The prompt asks for retail pricing, so the agent must use the regular price and treat the sale price as a distractor.
- The manufacturing math chains three steps: `80%` of `$25,000` is `$20,000`, the per-unit cost is `5%` below retail (`$23.75`), and the unit count is the floor of `$20,000 / $23.75 = 842`.


### 6. Time to Materialize the Prompt

I shape the idea into a final prompt that stays natural and is fully grounded in the reality and evidence I created. Brandon explains his situation in his own words, references the note he already sent, asks which positions to sell to reach `$25,000` without overselling, asks for the Stanley Quencher price and the manufacturing estimate, and points at `final_artifact_format.md` for the exact output shape.

I MUST never create a prompt where the uploaded materials are decorative only. Here the note drives the selection, the accounts drive the liquidity, the format file drives the structure, and the web search drives the pricing. Each one affects a checkable output.

Final prompt = `prompt.md`


### 7. GTFA Creation

My prompt is expected to have a single GTFA, since the subset-sum, the liquidity, the pricing rule, and the manufacturing math each resolve to one defensible answer. I craft it so it leads a correct silver trajectory and enables precise rubric creation.

The GTFA has two tracks:

**Capital track**
- Current liquid cash: `$6,700.00`
- Remaining needed: `$25,000.00 − $6,700.00 = $18,300.00`
- Positions to sell (value after `+5%`): Apple `$7,000.00`, Microsoft `$5,300.00`, Nvidia `$6,000.00`
- Estimated funds generated: `$18,300.00`
- Total available after sales: `$25,000.00`, which meets the launch budget exactly

**Manufacturing track**
- Cheapest Stanley Quencher price: `$25.00`
- Production budget (`80%` of `$25,000`): `$20,000.00`
- Production cost per unit (`5%` below retail): `$23.75`
- Estimated units manufacturable: `floor($20,000 / $23.75) = 842 units`

The capital track is what makes the task deterministic and gradable: the only three-position combination that reaches exactly `$18,300` after the `5%` increase is Apple + Microsoft + Nvidia, and it only works when the existing `$6,700` is counted first. The GTFA also doubles as the Desired Outcome and lets me confirm early that the task can clear the `50%` genuine rubric-failure threshold before I sink hours into rubrics.

GTFA = `GTFA.md`


### 8. Running the Prompt In the Openclaw Enviroment

> Important: This must be a single prompt-agent interaction. There should be no multiple turns and no follow-up messages. If I forget to upload the multimodal context, I should reset the agent, start a fresh interaction, and send the initial prompt again with the correct context uploaded.

For this task the initial run is a strong failure candidate. The model read the handwritten note correctly and got the entire competitor and manufacturing track right, but it never consulted Brandon's accounts. It concluded liquid cash was `$0.00`, so the remaining amount became the full `$25,000`, and it oversold: it picked Apple + Meta + Nvidia + Rekor Systems to raise `$25,000.42` from stock sales alone instead of the `$18,300` the task actually needed. One missed retrieval cascaded through the entire capital track.


### 9. Cross reference GTFA with model's response

Cross-referencing the model's `final_insights.md` against the GTFA confirms a clean, reasoning-shaped failure rather than a refusal or a formatting slip:

- The model stated current liquid cash as `$0.00` instead of `$6,700.00`, because it searched memory for a cash value rather than querying the bank accounts.
- The remaining amount became `$25,000.00` instead of `$18,300.00`, a direct consequence of the missing liquidity.
- The recommended combination omitted Microsoft and added Meta and Rekor Systems, totalling `$25,000.42`, which oversells the position the user explicitly asked not to oversell.
- The Stanley Quencher price (`$25.00`, regular over the `$18.75` sale price), the production budget (`$20,000.00`), the per-unit cost (`$23.75`), and the unit count (`842`) were all correct.

This gives the task a strong evaluation surface. The failures concentrate in the part of the task that requires reconciling two sources (accounts plus note) and reasoning over them, while the parts that only need research and arithmetic succeed. One root cause, several downstream symptoms.


### 10. Silver Trajectory

IMPORTANT: Always restore to seed. Do not start fresh.

For the Silver Trajectory I guide the model toward the correct response with a couple of targeted follow-ups:

> Follow-up 1: Before selecting any positions, check Brandon's actual accounts for his liquid cash. His checking and savings together come to `$6,700.00`. Recompute the remaining amount as `$25,000.00 − $6,700.00 = $18,300.00`, and select the combination of positions (after the `5%` increase) that reaches `$18,300.00` as closely as possible without overselling. The correct combination is Apple `$7,000.00`, Microsoft `$5,300.00`, and Nvidia `$6,000.00`, which totals `$18,300.00` and brings the total available to exactly `$25,000.00`.

> Follow-up 2: Regenerate `final_insights.md` so it strictly follows `final_artifact_format.md`, with the corrected liquid cash, remaining amount, recommended positions, estimated funds, and total available, and keep the competitor and manufacturing section as it already is.

> Correct solution reached!!


### 11. Unit Tests (ONLY FOR REVIEWERS)

At this stage, define reviewer-only unit test references. These are not the unit tests themselves; they are only names and descriptions that reviewers can use when creating the actual tests.

What is structurally important for this prompt?

The structural checks should confirm that the deliverable exists with the required sections and heading levels, and that the central computed values are correct.

| Unit test reference | Logic covered |
| --- | --- |
| `test_sections_present` | Verifies all required sections and subsections appear as headings in `final_insights.md`. |
| `test_h3_format` | Verifies the four main sections are labeled as `###` (H3). |
| `test_h4_format` | Verifies the subsections are labeled as `####` (H4). |
| `test_dollar_amount_formats` | Verifies every labeled monetary line carries a properly formatted `$X,XXX.XX` value. |
| `test_section_3a_values_reflect_5pct_increase` | Verifies each recommended position's value is exactly `5%` above its note value. |
| `test_section_3a_stock_names_are_allowed` | Verifies the recommended positions are only Apple, Microsoft, or Nvidia. |


### 12. Rubrics

For the rubrics I weight by the **complexity** of the reasoning each criterion takes to get right and to verify, not by how important the criterion feels. The set is grounded in the prompt, the format specification, and the GTFA.

- The heaviest weight goes to the subset-sum correctness (the recommended combination must be the unique valid one that includes Microsoft), since it reconciles the note values, the liquidity, and the closest-over constraint at once.
- Mid weights cover the genuine reasoning and retrieval steps: consulting the accounts for liquid cash, extracting the five positions from the handwritten note, the dependent computations (remaining amount, funds generated, total available), and choosing the retail price over the sale price.
- Light weights cover the mechanical statements that only restate a known value in the right section, and the file simply existing.
- The negatives capture the attractive wrong path the run actually took: reaching `$25,000` from stock sales alone while ignoring the existing liquidity, which produces a wrong combination.

rubrics = `rubrics.md`
