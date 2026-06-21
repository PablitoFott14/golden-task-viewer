#Agent Objective

Brandon, a corporate professional considering leaving his career to launch a premium smart hydration bottle brand, needs an agent to help him assess whether his current financial position can realistically support a $25,000 launch budget. He holds a combination of liquid cash and investment positions and is open to selling any position that appreciates by at least 5% during the agent's run. Beyond the capital question, he also needs a competitive pricing baseline for the Stanley Quencher model and a data-driven estimate of how many units he could manufacture at the production cost his brand would target.

The agent must retrieve Brandon's current liquid cash and investment portfolio, identify which positions he should sell to close the gap to $25,000, search for live Stanley Quencher market prices, and calculate the manufacturing capacity that 80% of his budget would unlock. The final deliverable is a single structured markdown file, final_insights.md, built to the exact layout defined in final_artifact_format.md.

#Core Funcionalities

- Retrieve Brandon's current liquid cash balance and his full investment portfolio from his financial environment. For each position in the portfolio, apply a 5% appreciation to the current total cash value held in that position and treat the result as the estimated sale value.

- Determine which subset of positions must be sold to bridge the gap between current liquid cash and the $25,000 launch budget. Assume all positions will appreciate at least 5% and include every position needed, in order, until the cumulative total meets or exceeds the target. Report the estimated funds generated and confirm whether the combined liquid cash plus proceeds meets the goal.

- Conduct a live web search for current retail prices of the Stanley Quencher model. If multiple variants or sizes are found, retain only the cheapest price for all downstream calculations. Present results in a structured pricing table.

- Using 80% of the $25,000 budget as the production allocation and a per-unit cost equal to 95% of the cheapest identified Stanley Quencher retail price, calculate and report the estimated number of bottles Brandon could manufacture.

- Compose the final artifact, final_insights.md, strictly following the section order, field labels, table structures, and formatting rules defined in final_artifact_format.md. Include no content beyond what that specification requires.

#Desired Outcome

The agent must produce a single file, final_insights.md, that strictly follows the structure defined in final_artifact_format.md and contains, in order:

1. A labeled line stating Brandon's current liquid cash formatted to two decimal places.

2. A labeled line stating the remaining amount needed to reach the $25,000 launch target, derived as $25,000.00 minus current liquid cash.

3. A markdown table listing every investment position Brandon would sell at a 5% appreciation, with columns for Asset, Current Value, Target Value (+5%), Shares/Units, and Estimated Sale Value. Followed by a labeled line for the total estimated funds generated and a confirmation line stating whether the combined liquid cash and proceeds meets or falls short of the $25,000 goal.

4. A markdown table of current Stanley Quencher market prices with columns for Model/Size, Retail Price (USD), and Source/Notes. Only the cheapest variant is carried into the production estimate.

5. Three labeled lines covering the production budget (80% of $25,000), the per-unit production cost (95% of the cheapest Stanley Quencher retail price, with the reference model and price stated), and the estimated number of units manufacturable at that cost.

Every monetary value must be formatted as USD with two decimal places. Unit counts must be whole numbers. No additional commentary, preamble, or closing remarks may appear in the artifact.
