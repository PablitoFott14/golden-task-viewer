### 1. Persona Understanding

This task rationale starts by interacting with the Universe Creator (after first loading the **Service Universe Artifact ID** — **IMPORTANT**).

Within the **Database** tab, ask the AI agent:

> "Hey, I need to get familiar with Brandon Lewis's background and situation. Could you help me understand the key aspects of his profile, such as his occupation, personal relationships, interests, ongoing projects, and any other relevant context that would help me better understand his day-to-day life, responsibilities, and priorities?"

Use the response to generate a `persona_context.md` file (or similar).

* From this point onward, step into the persona's shoes. You are Brandon Lewis. Think, communicate, and reason as someone living within that universe.


### 2. Brainstorming

Based on the assigned **Category**, **Subcategory**, and the information gathered in `persona_context.md`, brainstorm realistic task ideas that could naturally fit this persona and their day-to-day needs:

#### Idea 1: Fitness Content Accuracy Audit

Auditing personal Instagram posts based on fitness to see which of the trainings are missing information from the actual trainings.

#### Idea 2: Urban Cycling Photo Review

Auditing some photos of the last urban cycling route before posting them out as they are a pretty big set and they are coming from different sources (taken by compañeros, by myself, maybe some of them are mistaken as I'm on a rush).

#### Idea 3: Emergency Social Media Recovery

We lost our social media planning for this month and we need an urgent backup plan. We were able to conduct an emergency meeting with the team and get some context back, but really need to audit such content before posting it.


### 3. Which Idea Would I Feel More Comfortable Following Up With?

**Chosen Idea:**  
**Idea 3: Emergency Social Media Recovery**

We lost our social media planning for this month and we need an urgent backup plan. We were able to conduct an emergency meeting with the team and get some context back, but really need to audit such content before posting it.

**Why am I choosing this idea?**

I feel more comfortable developing this scenario. It gives me more room to create realistic complexity while remaining naturally aligned with the assigned category and subcategory. It also feels easier to ground in Brandon's day-to-day responsibilities and ongoing projects, resulting in stronger persona adherence and a more believable user request.


### 4. Don't Build the Prompt Yet — Build the Reality First

Which MM context could I be gathering or creating to support this idea?

We are expecting the agent to audit a company's full monthly social media planning, which may involve multiple platforms, so I'll need to create a rich multimodal context with plenty of images and supporting materials.

Which multimodal context could realistically increase the complexity?

- The urgent nature of this situation fits well with a handwritten note created in a rush and with messy multimodal context recovered from different sources.
- Since the original planning was lost, the recovered information should come from multiple locations and formats rather than a single clean source of truth.
- Some information can intentionally exist only in one source, forcing the agent to properly audit and reconcile the available materials.
- I need to get rrss context that feels realistic for a fintech company


### 5. Final Decision on MM Context

I'm going to include 2 handwritten notes covering 3 social (Instagram, X, and Linkedin) media platforms and the planned posting dates for each post. These will act as the SSOT (Source of Truth) for the model.

- `1780566865852.jpeg`
- `1780566865892.jpg`

I'm also going to create a text file containing the captions we were able to recover. The captions will be mixed together, but they should still be reasonably matchable to the planning defined in the handwritten notes.

- `text_post.txt`

Additionally, I'm going to introduce a few controlled mismatches and friction points, such as captions exceeding the planned character limits, mismatched dates, and similar inconsistencies. Nothing too forced or artificial—just realistic issues that could naturally arise in the messy environment I'm creating.

Now I got the captions and the planning, let's get some images that match what I already have and I'll keep including some more friction.

- `carousel_1.png`
- `carousel_2.png`
- `carousel_3.png`
- `carousel_5.png`
- `carrsel_4.png`
- `Dash.jpg`
- `final viasual.png`
- `IMG_39852.png`
- `IMG_398573.png`
- `IMG_20260314_173522.png`
- `IMG_33489034.png`
- `phone.jpg`
- `quote_3.png`
- `Screenshot_2026-05-29 091745.png`
- `Screenshot_2026-06-03 234708.png`
- `update.png`
- `visual_3248329.png`
- `visual_5960419.png`
- `visual_8456934.png`
- `visual_20260419.png`

I'm also adding a few more friction points, such as images that do not match the planned content, extra images that are not related to any planned post, and similar inconsistencies that would naturally appear in a messy recovery scenario.


### 6. Time to Materialize the Prompt
I shape my original idea and the direction it has been taking into a final prompt, ensuring it remains natural and fully grounded in the context, reality, and multimodal evidence I've created throughout the process.

I MUST never create 

Final prompt = `prompt.md`

### 7. GTFA Creation

My prompt is expected to have a single GTFA, as I have been carefully defining and materializing the logical rules behind it throughout this process. Therefore, I need to craft it in a way that leads to a correct silver trajectory and enables precise rubric creation.

In other words, I need to know exactly what the correct solution looks like, and what I will ultimately be evaluating. 

I will use this gtfa also for the "Desired Outcome"

GTFA = `gtfa.md`

The GTFA section is useful for more than proving that the prompt has a single deterministic answer and for drafting the Desired Outcome. It also helps confirm early whether the task can meet the 50% genuine rubric failure threshold. This way, I can identify major gaps before reaching the rubric stage, instead of discovering too late that the task needs to be rebuilt after several hours of work.


### 8. Running the Prompt In the Openclaw Enviroment

> Important: This must be a single prompt-agent interaction. There should be no multiple turns and no follow-up messages. If I forget to upload the multimodal context, I should not add it in a follow-up. Instead, I should reset the agent, start a fresh interaction, and send the initial prompt again with the correct multimodal context uploaded.

Once I run the prompt in the OpenClaw environment, I can compare the agent's response against the GTFA. This will help me quickly determine whether the agent is failing big enough to meet the 50% rubrics failure threshold, and weather I can continue with the Silver Trajectory process.


### 9. Cross reference GTFA with model's response

Once we have the model's final response, we'll be able to use the GTFA we created to easily determine whether the model failed badly enough to meet the 50% rubric threshold. Based on the result, we can either increase the task complexity or proceed to the Silver Trajectory.


### 10. Silver Trajectory

IMPORTANT: Always restore to seed. Do not start fresh.

For the Silver Trajectory, we guide the model toward the correct response using as many follow-up prompts as needed:

> Follow-up 1: Hey, you missed the X platform entirely and included its related posts under Instagram. Please double-check `1780566865852.jpeg` and correct this. Additionally, you are not following the prompt's instruction for missing or mismatching content: "For anything missing from a post or any content that does not match it." Make sure the post folders do not include anything that falls under either of those categories.

> Follow-up 2: It looks like you are still mistakenly including the caption in the 11th Instagram folder, even though it represents mismatching content because it references the wrong quarter.

> Follow-up 3....

> Follow-up 4...

> Correct solution reached!!

### 11. Unit Tests (ONLY FOR REVIEWERS)

At this stage, define reviewer-only unit test references. These are not the unit tests themselves; they are only names and descriptions that reviewers can use when creating the actual tests.

What is structurally important for this prompt?

The structural checks should cover two things:

- The required platform folders exist.
- Each platform folder contains the expected date folders.

**Platform Folder Tests**

| Unit test reference | Logic covered |
| --- | --- |
| `test_output_contains_x_platform_folder` | Verifies that the output includes an `X/` folder. |
| `test_output_contains_instagram_platform_folder` | Verifies that the output includes an `Instagram/` folder. |
| `test_output_contains_linkedin_platform_folder` | Verifies that the output includes a `LinkedIn/` folder. |

**Date Folder Tests**

| Unit test reference | Logic covered |
| --- | --- |
| `test_instagram_contains_required_date_folders` | Verifies that `Instagram/` contains `06-05/`, `06-11/`, `06-12/`, `06-19/`, and `06-26/`. |
| `test_linkedin_contains_required_date_folders` | Verifies that `LinkedIn/` contains `06-14/` and `06-17/`. |
| `test_x_contains_required_date_folders` | Verifies that `X/` contains `06-22/` and `06-07/`. |


### 12. Rubrics

### Precision With Negative Rubrics
- Positive rubrics must cover all prompt requirements, whether they are stated positively ("include X") or negatively ("do not include Y").
- Negative rubrics should be written clearly, precisely, and using positive language.
- Negative rubrics are only meant to capture undesired model behaviors, not prompt requirements.
- Negative rubrics may cover genuine behavioral boundaries that should not be crossed, even if those behaviors were not observed in the trajectory.
- Negative rubrics should never outnumber positive rubrics.
- Do not feel forced to include negative rubrics. Only include them when they naturally emerge from the complexity of the task and scenario.


> **Reminder:** The need for negative rubrics genuinely comes from the richness and complexity of the scenario, not from a requirement to include them in every task.


### Rubric Final Checklist
- **Self-contained · atomic · outcome-based · positively phrased.** One criterion \= one checkable outcome.  
- **Grounded in the prompt.** If the prompt never asked for it, it can't be a positive criterion (this is the \#1 customer flag).  
- **Weights \= difficulty to verify**, from `{-5, -3, -1, +1, +3, +5}` only. Any other value \= **invalid weights \= fail**.  
  - **\+5 High** \= cross-modal/multi-source reconciliation (3+ difficulty dimensions).  
  - **\+3 Medium** \= one reasoning/reconciliation step (exactly 2 dimensions).  
  - **\+1 Low** \= mechanical single-source check (0–1 dimensions).  
  - **Negatives** target *attractive wrong paths* the model is tempted to take (`-5` strongly pulled, `-3` plausible, `-1` rare). Rare-but-damaging failures → encode as a **unit test**, not a `-5`. Not overassumption of negative wetghts,
- **Present / Not Present** marked correctly against the **initial** trajectory: positive \+ Not Present \= fail; negative \+ Present \= fail.  
- **No contradictions** with the data or between criteria.  
- **No reliance on illegible media** or undeliverable computations.  
- **Spot checks ≤ 5** per group of similar outcomes (use spot checks for repeated actions — not 20 per-row criteria).

**Visual judge routing note:** \~93% of criteria vendors flag as "needs visual" actually **don't**. The visual VLM judge only scores **pixels of an artifact the agent produces** (an image/video/PDF the agent creates). A criterion that reads an **uploaded input** image and checks a written claim is verified by the **text** judge. Don't route input-perception criteria to the VLM.


Every rubric covers its explicit/implicit requirement of the prompt and boundling happens only when the same level data entry is being checked. 


For the rubrics, I'm not including rationale myself but I need you to 

rubrics = `rubrics.md` 
