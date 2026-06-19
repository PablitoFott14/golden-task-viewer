# Golden Task Viewer

The Golden Task Viewer is a learning resource for contributors building **Golden Tasks** —
the realistic, naturally complex multimodal scenarios at the core of this project. It exists
so that contributors can see, end to end, what separates a strong task from a weak one: not
just the final artifact, but the reasoning, planning, and discipline that produced it.

This is not a showcase. It's a training tool. Every section is built to reinforce a specific
habit or standard that the project expects from every task you create.

---

## Why this exists

Most mistakes in task creation don't come from a single bad step — they come from skipping
the thinking that should happen *before* execution. The viewer walks through one fully
reconstructed Golden Task from persona to rubric, so you can see exactly where good
decisions were made, where friction was deliberately planted, and how every requirement
traces back to something concrete in the scenario.

If you only ever see finished tasks, it's easy to assume the hard parts were obvious in
hindsight. They weren't. The viewer is designed to make that invisible process visible.

---

## How to use it

**Start with the Method.** The home page walks through the 12-step Golden Task workflow and
the three principles that should drive every task you build:

- **Stepping into the user's shoes** — build realistic, believable scenarios, not
  artificial benchmark-style setups.
- **Originality** — avoid overused premises; find situations that *naturally* demand complex
  reasoning instead of forcing difficulty in.
- **Planning before execution** — design the task fully before building it. Discovering a
  critical issue mid-build means you skipped this step.

Click through each step to see what it produces and how it connects to the broader
Complexity Playbook. Each step links to where it's applied in the real example task —
use that link to ground the abstract description in something concrete.

**Then walk a real task end to end.** Open the example Golden Task and follow it in order:

- **Persona** — who the task is for, and why that matters for every decision after it.
- **Brainstorm** — why one idea was chosen over the others, and what made it strong.
- **Build the reality** — the world-building that has to happen before a prompt is written.
- **MM inputs** — how source materials are planned, including where intentional friction
  (a mismatched caption, a missing asset, a duplicate file) is planted on purpose.
- **The prompt** — how a natural-sounding request encodes precise, testable requirements.
- **Ground Truth Final Answer** — what the correct, complete output actually looks like.
- **The Silver Trajectory** — how the task guides a model from a flawed first attempt
  toward the correct one.
- **Unit Tests** — the structural checks that catch whether the output is even shaped right.
- **The Rubric Set** — all 27 criteria, each with the reasoning behind why it exists, why it
  matters, and what the model actually did against it.

**Read the friction, don't skip it.** The points of intentional mismatch, ambiguity, or
missing information are the most instructive part of the task. They show you how to build
in complexity that *feels* real instead of complexity that feels artificial.

---

## What to learn from each section

- A good **persona** and **brainstorm** rule out generic scenarios early — if you can't
  articulate why a specific premise was chosen over alternatives, it's probably not specific
  enough yet.
- **Building the reality before the prompt** is what prevents a task from falling apart
  during review. If you write the prompt first and improvise the world around it, you will
  almost always find contradictions late.
- **MM inputs** should contain deliberate, plausible friction — not random noise. Every
  mismatch needs a reason a real user could have created it.
- The **prompt** should read naturally to a person, while still encoding every requirement a
  grader will check. If a requirement isn't traceable to something in the prompt or the
  planning materials, it shouldn't be a rubric.
- The **GTFA** is the single source of truth for "correct." If you can't write it
  confidently before building the rest of the task, the task isn't ready.
- **Rubrics** must be specific, verifiable, and tied to something concrete in the task —
  never vague, never unfalsifiable, never reverse-engineered from what a model happened to
  produce.

---

## Common mistakes this viewer helps prevent

- Designing a prompt before the underlying scenario is fully thought through.
- Adding friction that feels arbitrary rather than something a real user would plausibly do.
- Writing rubrics that can't be checked objectively, or that test for behavior the prompt
  never actually required.
- Treating unit tests and rubrics as interchangeable — they check different things.
- Skipping the "why" behind a requirement. Every rubric in this viewer is paired with the
  reasoning behind it for exactly this reason: if you can't explain why a check matters, you
  shouldn't be the one deciding whether it passed.

---

## Project expectations reinforced throughout

- Tasks must be **realistic and naturally complex** — complexity should come from the
  scenario, not from artificial constraints bolted on afterward.
- Every requirement should be **traceable**: back to the persona, the planning documents, or
  the prompt itself.
- **Planning precedes execution**, always. The reconstructed task exists specifically to
  demonstrate what that discipline looks like in practice.
- **Rubrics are graded against evidence**, not impressions — every Present / Not Present
  status in this viewer reflects what was actually observed in a real model run.

---

## Accessing the viewer

The viewer is a static site — open the deployed link shared with you, or run it locally if
you're working from a checkout of the repository:

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.
