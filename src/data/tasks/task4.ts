import type { Task } from "../types";

const task4: Task = {
  meta: {
    id: "task4",
    serviceId: "6a457ed4182720ee4794afb6",
    title: "Refund Module QA Status Report",
    category: "Operations & QA",
    subcategory: "UI/UX Screenshot Audit/form-filling",
    universe: "rebecca_davis",
    personaName: "Rebecca",
    oneLiner:
      "Cross-reference 11 bugs in Rebecca's stale personal Jira notes against release-candidate screenshots to determine which are actually resolved, then report the true status across an SVG flowchart, MEMORY.md, Slack, and email.",
    difficulty: "Hard",
    outputType: "refund_mod_QA_results.svg (formatted flowchart) + MEMORY.md + Slack + email",
    modalities: ["Kanban board screenshot", "Release-candidate screenshots", "Tracker email", "SVG format spec"],
    status: "Golden",
  },
  assetRoot: "tasks/task4",
  personaDocPath: "tasks/task4/artifacts/persona_context.md",
  personaPrompt:
    "Hey, I need to get familiar with Rebecca Davis's background and situation. Could you help me understand the key aspects of her profile, such as her occupation, team, personal responsibilities, and any other relevant context that would help me better understand her day-to-day life and priorities?",

  personaHighlights: [
    { label: "Role", value: "QA Engineer at Nexbridge Technologies, owns the refund module regression testing" },
    { label: "Pressure", value: "Deadline today, only 1 of 11 logged bugs marked solved so far" },
    { label: "Known habit", value: "Keeps her own personal Jira notes because the official tracker is usually outdated" },
    { label: "Team", value: "Reports to Colton; peers Kai (international/edge cases) and Amara (fixtures/environment)" },
  ],

  brainstorm: [
    {
      title: "Refund Module QA Status Report",
      body: "Rebecca needs the current, true state of every bug logged against the refund module before a deadline. She provides her own (admittedly stale) Jira notes and a folder of release-candidate screenshots pulled from the shared team testing folder. The agent has to determine each bug's real status, generate a formatted SVG report, update MEMORY.md with reconciled issue keys, and notify the team.",
      chosen: true,
      why: "It's the most natural fit for a QA engineer's actual day-to-day, and Rebecca's own words hand the task design its central mechanic for free: she says her Jira tracker is 'usually outdated.' That single admission means the model cannot treat the Jira board as ground truth — it has to open every RC screenshot and decide, bug by bug, whether the note's status still holds. Eleven bugs is enough to make trusting the board statistically costly, and few enough to stay gradable one criterion at a time. A second reasoning thread (reconciling two different issue-key systems) and a hard-spec SVG deliverable layer on top without ever becoming decorative.",
    },
    {
      title: "UAT Test-Scenario Runner",
      body: "Colton forwarded a UAT test document from a healthcare client (Meridian Health) and asked Rebecca to run through their test scenarios. The agent would follow the setup doc step by step and report pass/fail per scenario.",
      chosen: false,
    },
    {
      title: "Release-Hold Postmortem",
      body: "Reconstruct why a Friday release was held, referenced in Rebecca's Slack history with Colton, by cross-referencing the error-state coverage gap against her calendar, and draft a postmortem note.",
      chosen: false,
    },
  ],

  realityFirst: [
    "Would a QA engineer really keep a personal, stale tracker instead of trusting the official one? Yes — Rebecca says so herself, and it's a completely ordinary habit under deadline pressure. That admission is the whole task design: it means the Jira board is a lead, not evidence.",
    "For the status check to be real, each bug's true state has to live in a separate release-candidate screenshot that the agent must actually open — not be summarized in the prompt.",
    "The RC screenshots need inconsistent, uninformative filenames, because they're pulled from a shared folder fed by three different people (manual screenshots, live-testing records, and direct build-export saves). Nothing in a filename should hint at which bug it resolves.",
    "For the task to test restraint as well as diligence, two extra screenshots go into the same folder without corresponding to any bug in Rebecca's notes — a quiet test of whether the agent stays inside the scope it was actually given.",
    "For the deliverable to be fully checkable, a separate format-spec file has to pin down the SVG's shapes, labels, connections, and palette exactly, so the visual reasoning and the status reasoning can be graded independently.",
  ],

  mmStrategy: [
    "Rebecca's personal Jira notes become a single Kanban screenshot (Screenshot 2026-07-03 000152.png): 11 bugs, all sitting in a TO DO column, never updated.",
    "Eleven RC screenshots, one per bug, scattered across build-export naming (rc-refund-build-01.png), timestamped manual captures (RC_refund_0712_02.png), and camera-style exports (IMG_4471.png) — deliberately no filename hints at which bug it belongs to.",
    "Two distractor screenshots (Screenshot 2026-07-02 at 09.14.06.png, IMG_2093.png) sit in the same folder without a matching Jira entry, testing whether the agent stays inside 'do not address bugs not logged in my jira.'",
    "svg_format.txt pins the exact shapes, labels, connection rules, and six-color palette refund_mod_QA_results.svg must follow.",
    "A tracker-notification email in Rebecca's inbox supplies the company's real NEXB-### issue keys and establishes the latest registered one, forcing the agent to reconcile two separate ticket-numbering systems rather than invent one from scratch.",
  ],

  assets: [
    {
      filename: "Screenshot 2026-07-03 000152.png",
      src: "mm_input/Screenshot 2026-07-03 000152.png",
      kind: "image",
      role: "ssot",
      whatItShows:
        "Rebecca's personal Jira (Kanban) board: all 11 bugs sitting in a TO DO column under her own shorthand names and personal ticket numbers.",
      verdict: "The bug list and starting point — but not the ground truth for status.",
      rationale:
        "The board is explicitly stale ('our official jira tracker is usually outdated'). It tells the agent what to check, not what the answer is — every bug on it still has to be verified against its RC screenshot.",
      tags: ["SSOT", "bug list", "stale"],
    },
    {
      filename: "rc-refund-build-01.png",
      src: "mm_input/rc-refund-build-01.png",
      kind: "image",
      role: "correct",
      whatItShows: "Refund console showing identical Order total and Total refund amounts for a full refund.",
      verdict: "Resolved — Full refund renders complete.",
      rationale: "Direct evidence the totals now reconcile, contradicting the Jira board's TO DO status.",
      tags: ["RC evidence", "resolved"],
    },
    {
      filename: "RC_refund_0712_06.png",
      src: "mm_input/RC_refund_0712_06.png",
      kind: "image",
      role: "mismatch",
      whatItShows: "Raw HTTP 500 — Internal Server Error with a Java stack trace; gateway read timed out after 30000ms.",
      verdict: "Unresolved — Partial refund timeout.",
      rationale: "The one bug that already had a company issue key (NEXB-442) and is confirmed still broken by its own RC evidence.",
      tags: ["RC evidence", "unresolved"],
    },
    {
      filename: "rc-refund-build-03.png",
      src: "mm_input/rc-refund-build-03.png",
      kind: "image",
      role: "correct",
      whatItShows: "A €142.90 international refund correctly computing 20% VAT as €28.58.",
      verdict: "Resolved — Incorrect tax (international, VAT 20%).",
      rationale: "Requires an actual arithmetic check (142.90 × 0.20 = 28.58), not just reading a status label.",
      tags: ["RC evidence", "resolved", "arithmetic"],
    },
    {
      filename: "RC_refund_0712_02.png",
      src: "mm_input/RC_refund_0712_02.png",
      kind: "image",
      role: "correct",
      whatItShows: "Remaining balance correctly recalculated as $54.25 after an $87.40 subtotal minus a $33.15 partial refund.",
      verdict: "Resolved — Partial refund balance update.",
      rationale: "Another arithmetic check ($87.40 − $33.15 = $54.25) that only confirms as resolved if actually computed.",
      tags: ["RC evidence", "resolved", "arithmetic"],
    },
    {
      filename: "RC_refund_0712_04.png",
      src: "mm_input/RC_refund_0712_04.png",
      kind: "image",
      role: "correct",
      whatItShows: "The Process Refund button correctly disabled while the refund reason field is left empty.",
      verdict: "Resolved — Refund reason mandatory to proceed.",
      rationale: "A UI-state check: the validation now blocks submission as required.",
      tags: ["RC evidence", "resolved", "UI state"],
    },
    {
      filename: "Screenshot 2026-07-03 at 15.58.21.png",
      src: "mm_input/Screenshot 2026-07-03 at 15.58.21.png",
      kind: "image",
      role: "correct",
      whatItShows: "Confirmation screen showing $92.86 refund, destination card ending 6341, and status Completed.",
      verdict: "Resolved — Confirmation screen (matching destination card number).",
      rationale: "A three-field match (amount, card, status) all confirming consistency with the original transaction.",
      tags: ["RC evidence", "resolved", "3-field match"],
    },
    {
      filename: "rc-refund-build-07.png",
      src: "mm_input/rc-refund-build-07.png",
      kind: "image",
      role: "mismatch",
      whatItShows: "A $163.45 refund accepted against a $92.86 order total, producing a negative remaining balance of -$76.05.",
      verdict: "Unresolved — No refund cap.",
      rationale: "The overshoot has to be computed ($163.45 − $92.86 = $76.05 over) to see the cap is still missing.",
      tags: ["RC evidence", "unresolved", "arithmetic"],
    },
    {
      filename: "IMG_4471.png",
      src: "mm_input/IMG_4471.png",
      kind: "image",
      role: "correct",
      whatItShows: "A warning banner reading the transaction was already fully refunded (RFND-20260702-7731), with Process Refund correctly disabled.",
      verdict: "Resolved — Dup refund.",
      rationale: "The system now blocks a second refund on an already-refunded transaction.",
      tags: ["RC evidence", "resolved", "UI state"],
    },
    {
      filename: "RC_refund_0712_09.png",
      src: "mm_input/RC_refund_0712_09.png",
      kind: "image",
      role: "mismatch",
      whatItShows: "The refund screen at a mobile viewport, with the top bar overflowing and two-column fields clipping.",
      verdict: "Unresolved — Refund mobile view misrendered.",
      rationale: "A layout/visual defect still visible in the RC build.",
      tags: ["RC evidence", "unresolved", "layout"],
    },
    {
      filename: "RC_refund_0712_10.png",
      src: "mm_input/RC_refund_0712_10.png",
      kind: "image",
      role: "mismatch",
      whatItShows: "UI reads Refund Processed / Completed for $92.86, while the gateway response underneath reads DECLINED and settlement Failed.",
      verdict: "Unresolved — Fake refund success.",
      rationale: "The trap is reading only the friendly status label instead of reconciling it against the gateway response beneath it.",
      tags: ["RC evidence", "unresolved", "status mismatch"],
    },
    {
      filename: "rc-refund-build-11.png",
      src: "mm_input/rc-refund-build-11.png",
      kind: "image",
      role: "correct",
      whatItShows: "A successful Signed in state on Safari (iOS), session labeled Secure session established.",
      verdict: "Resolved — Login timeout mobile Safari.",
      rationale: "The one bug the prompt itself already flags as solved (fixed by Kai); this screenshot is confirming, not the sole source.",
      tags: ["RC evidence", "resolved"],
    },
    {
      filename: "Screenshot 2026-07-02 at 09.14.06.png",
      src: "mm_input/Screenshot 2026-07-02 at 09.14.06.png",
      kind: "image",
      role: "distractor",
      whatItShows: "A screenshot from the shared RC folder with no corresponding entry in Rebecca's personal Jira notes.",
      verdict: "Excluded — not logged in Rebecca's Jira, out of scope.",
      rationale: "Tests restraint: the prompt explicitly says not to address bugs outside her own notes, even when more 'evidence' is sitting right there.",
      tags: ["distractor", "out of scope"],
    },
    {
      filename: "IMG_2093.png",
      src: "mm_input/IMG_2093.png",
      kind: "image",
      role: "distractor",
      whatItShows: "Another shared-folder screenshot with no corresponding entry in Rebecca's personal Jira notes.",
      verdict: "Excluded — not logged in Rebecca's Jira, out of scope.",
      rationale: "A second instance of the same restraint test, so a single lucky skip can't be mistaken for the right habit.",
      tags: ["distractor", "out of scope"],
    },
  ],

  captions: [],

  prompt: `Hey, I need to send a report to Colton about the latest implemented refund module status and I feel like I won't be able to do it on time. The deadline is here, and I only have 1 issue marked as solved. I'm attaching my jira personal notes about the bugs to check and the screenshots from the RC build. This ss come straight from our shared RC team folder (manual ss, Amara and Kai live testing records, and direct build export script saves are usually there), so their filenames may be all over the place.

I am expecting you to generate refund_mod_QA_results.svg as the final report to send Colton. We always follow a specific structure for this type of reports, so I adapted it and uploaded here as well. Make sure to follow all the requirements stated there.

Once you are done with the report, you will append to MEMORY.md the results of the bugs in two sections ("SOLVED" and "UNSOLVED"). Since our official jira tracker is usually outdated I'm already used to keeping my own track, but I always forget to label the ticket for each bug. Because of that, every MEMORY.md entry needs to be referenced using my personal tracker bug name and its matching issue key from the team's tracker email notification. If no matching issue keys are found for any bugs just generate them continuing the count from the latest registered one (follow that same format). Do not address bugs not logged in my jira.

Finally, send an update in our qa team slack channel stating the bugs solved and unsolved (without its issue keys, just my jira names) and ask Kai and Amara for help to follow up on the unresolved ones. Also, send the .svg to Colton via email with the subject "current refund module QA status".`,

  promptAnnotations: [
    {
      quote: "This ss come straight from our shared RC team folder ... so their filenames may be all over the place",
      meaning:
        "Filenames carry no signal about which bug they resolve. Every RC screenshot has to actually be opened and read, not pattern-matched by name.",
    },
    {
      quote: "Since our official jira tracker is usually outdated I'm already used to keeping my own track",
      meaning:
        "The whole task hinges on this line: Rebecca's personal Jira notes are a lead, not evidence. Every bug's status must be re-verified against its RC screenshot before being reported.",
    },
    {
      quote: "every MEMORY.md entry needs to be referenced using my personal tracker bug name and its matching issue key from the team's tracker email notification",
      meaning:
        "Two separate ticket systems (personal KAN-###, company NEXB-###) must be reconciled from the email, not assumed or invented.",
    },
    {
      quote: "If no matching issue keys are found for any bugs just generate them continuing the count from the latest registered one",
      meaning:
        "The agent has to determine the latest registered NEXB key from the email and continue the sequence correctly for every bug that doesn't already have one.",
    },
    {
      quote: "Do not address bugs not logged in my jira",
      meaning:
        "Explicit scope boundary. The two distractor screenshots in the shared folder must be left out even though they look like more evidence.",
    },
    {
      quote: "stating the bugs solved and unsolved (without its issue keys, just my jira names)",
      meaning:
        "The Slack message uses a different presentation than MEMORY.md and the SVG — Jira names only, no issue keys — so the same underlying status has to be reformatted correctly for each audience.",
    },
  ],

  deliverableTree: {
    name: "refund_mod_QA_results.svg",
    type: "doc",
    note: "SVG flowchart + MEMORY.md update + Slack post + email, all reporting the same 11-bug status",
  },

  gtfaIssues: {
    artifactName: "refund_mod_QA_results.svg",
    issues: [
      { key: "NEXB-444", name: "Full refund renders complete", resolved: true, evidence: "rc-refund-build-01.png", reason: "Order total and Total refund match." },
      { key: "NEXB-442", name: "Partial refund timeout", resolved: false, evidence: "RC_refund_0712_06.png", reason: "Raw HTTP 500, 30000ms gateway timeout." },
      { key: "NEXB-443", name: "Incorrect tax — international (VAT 20%)", resolved: true, evidence: "rc-refund-build-03.png", reason: "€142.90 correctly refunds €28.58 at 20%." },
      { key: "NEXB-445", name: "Partial refund balance update", resolved: true, evidence: "RC_refund_0712_02.png", reason: "$87.40 − $33.15 = $54.25, correctly recalculated." },
      { key: "NEXB-446", name: "Refund reason mandatory to proceed", resolved: true, evidence: "RC_refund_0712_04.png", reason: "Process Refund stays disabled with an empty reason." },
      { key: "NEXB-447", name: "Confirmation screen (destination card match)", resolved: true, evidence: "Screenshot 2026-07-03 at 15.58.21.png", reason: "$92.86, card •6341, and Completed all match." },
      { key: "NEXB-448", name: "No refund cap", resolved: false, evidence: "rc-refund-build-07.png", reason: "$163.45 accepted against a $92.86 order (-$76.05)." },
      { key: "NEXB-449", name: "Dup refund", resolved: true, evidence: "IMG_4471.png", reason: "Already refunded; second refund correctly blocked." },
      { key: "NEXB-450", name: "Refund mobile view misrendered", resolved: false, evidence: "RC_refund_0712_09.png", reason: "Top bar overflows, fields clip on mobile." },
      { key: "NEXB-451", name: "Fake refund success", resolved: false, evidence: "RC_refund_0712_10.png", reason: "UI reads Completed; gateway reads DECLINED / Failed." },
      { key: "NEXB-398", name: "Login timeout mobile Safari", resolved: true, evidence: "rc-refund-build-11.png", reason: "Signed in / Secure session established on Safari (iOS)." },
    ],
  },

  memory: [],
  removed: [],
  email: {
    to: ["colton.park@nexbridge.io"],
    points: [
      'Subject exactly "current refund module QA status"',
      "refund_mod_QA_results.svg attached",
      "Reports 7 resolved / 4 unresolved, matching the SVG and MEMORY.md",
    ],
  },

  silver: [
    {
      n: 1,
      label: "Re-check every bug against its RC screenshot",
      message:
        "Before finalizing any bug's status, open its matching RC screenshot from the shared team folder and check whether it contradicts the Jira note — the Jira board is known to be outdated. Re-check all 11 bugs this way. Six of them (Full refund renders complete, Incorrect tax - international funds (VAT 20%), Partial refund balance update, Refund reason mandatory to proceed, Confirmation screen (matching destination card number), and Dup refund) are actually resolved in the RC build, in addition to the Safari login you already correctly marked solved.",
      fixes:
        "Repairs the root cause. Once every RC screenshot is actually read instead of trusting the Jira column, the split changes from 1 solved / 10 unsolved to the correct 7 solved / 4 unsolved.",
    },
    {
      n: 2,
      label: "Regenerate every deliverable to the corrected split",
      message:
        "Regenerate refund_mod_QA_results.svg, MEMORY.md, the Slack message, and the email so all four deliverables consistently report 7 solved / 4 unsolved, keeping the issue-key mapping you already got right (NEXB-442, NEXB-443, and the NEXB-444–451 generated range).",
      fixes:
        "Carries the corrected status determination into every downstream artifact and message, while preserving the issue-key reconciliation, which was already correct.",
    },
    {
      n: 3,
      label: "Correct solution reached",
      message: "Correct solution reached. All four deliverables now match the Ground Truth Final Answer.",
      fixes: "End state: a verified correct trajectory, restored from seed and never started fresh.",
    },
  ],

  unitTests: [
    {
      ref: "test_svg_report_exists",
      logic: "Verifies refund_mod_QA_results.svg exists and is non-empty, not just present.",
      group: "SVG",
      code: `def test_svg_report_exists():
    """refund_mod_QA_results.svg must exist and contain real SVG content, not an empty file."""
    path = _find_workspace_file("refund_mod_QA_results.svg")
    assert path is not None, "refund_mod_QA_results.svg not found in workspace"
    content = path.read_text(encoding="utf-8", errors="replace")
    assert "<svg" in content, "File exists but does not contain an <svg> root element"
    assert len(content.strip()) > 200, "SVG file is suspiciously small / likely empty of real content"`,
    },
    {
      ref: "test_svg_required_labels",
      logic: "Verifies the start node, note box, and all 11 decision-diamond labels match the format spec exactly.",
      group: "SVG",
      code: `def test_svg_required_labels():
    """Start node, note box, and every decision diamond must carry their exact required labels."""
    content = _read_svg()
    assert "Refund Module - Nexbridge" in content, "Start node label missing or altered"
    assert "Some issue tickets may not have been created yet" in content, "Note box label missing or altered"
    diamond_count = content.count("Is") and content.lower().count("resolved?")
    assert diamond_count >= 11, f"Expected 11 'Is resolved?' decision labels, found signal for {diamond_count}"`,
    },
    {
      ref: "test_svg_allowed_colors_only",
      logic: "Verifies every fill/stroke color in the SVG belongs to the six-color palette in svg_format.txt.",
      group: "SVG",
      code: `_ALLOWED_COLORS = {"#ff4733", "#2c55d4", "#158a52", "#c23b3b", "#1b2338", "#ffffff"}

def test_svg_allowed_colors_only():
    """Every hex color used in the SVG must be one of the six allowed palette colors."""
    content = _read_svg()
    used = set(re.findall(r"#[0-9a-fA-F]{6}", content))
    disallowed = {c for c in used if c.lower() not in _ALLOWED_COLORS}
    assert not disallowed, f"SVG uses colors outside the allowed palette: {disallowed}"`,
    },
    {
      ref: "test_email_sent_to_colton",
      logic: "Verifies an email was sent to colton.park@nexbridge.io with the exact required subject and the SVG attached.",
      group: "State change",
      code: `def test_email_sent_to_colton():
    """An email must be sent to Colton with the exact subject and the SVG attached."""
    sent = _load_sent_emails()
    match = [
        e for e in sent
        if "colton.park@nexbridge.io" in e.get("recipients", [])
        and e.get("subject", "").strip() == "current refund module QA status"
    ]
    assert match, "No email to colton.park@nexbridge.io with the exact required subject"
    attachments = match[0].get("attachment_paths", [])
    assert any("refund_mod_QA_results.svg" in a for a in attachments), "SVG not attached to the email"`,
    },
    {
      ref: "test_slack_message_posted",
      logic: "Verifies a message was posted to #qa-team tagging Kai and Amara.",
      group: "State change",
      code: `def test_slack_message_posted():
    """A Slack message must be posted to #qa-team mentioning both Kai and Amara."""
    messages = _load_slack_messages(channel="qa-team")
    assert messages, "No message posted to #qa-team"
    text = messages[-1].get("text", "")
    assert "Kai" in text and "Amara" in text, "Message does not ask both Kai and Amara for follow-up"`,
    },
    {
      ref: "test_memory_md_has_solved_unsolved_sections",
      logic: "Verifies MEMORY.md contains both a SOLVED and an UNSOLVED heading.",
      group: "MEMORY.md",
      code: `def test_memory_md_has_solved_unsolved_sections():
    """MEMORY.md must contain both a SOLVED and an UNSOLVED section heading."""
    content = _read_memory_md()
    assert re.search(r"^#+\\s*SOLVED", content, re.MULTILINE), "SOLVED section heading not found"
    assert re.search(r"^#+\\s*UNSOLVED", content, re.MULTILINE), "UNSOLVED section heading not found"`,
    },
    {
      ref: "test_memory_md_entries_have_issue_keys",
      logic: "Verifies every bug entry in MEMORY.md carries a bracketed issue key.",
      group: "MEMORY.md",
      code: `_ENTRY_RE = re.compile(r"^-\\s+.+\\[(NEXB-\\d{3,4})\\]\\s*$", re.MULTILINE)

def test_memory_md_entries_have_issue_keys():
    """Every bullet entry under SOLVED/UNSOLVED must carry a bracketed NEXB-### issue key."""
    content = _read_memory_md()
    bullets = [l for l in content.splitlines() if l.strip().startswith("-")]
    assert bullets, "No bullet entries found in MEMORY.md"
    tagged = _ENTRY_RE.findall(content)
    assert len(tagged) == len(bullets), (
        f"{len(bullets) - len(tagged)} of {len(bullets)} entries are missing a bracketed issue key"
    )`,
    },
  ],

  rubricDesign: [
    {
      title: "Weight tracks reasoning complexity, not importance",
      body:
        "Every one of the 11 bug-status determinations carries the same +5, because each requires actually opening a specific RC screenshot and reading a different kind of evidence — a stack trace, an arithmetic check, a UI-state check, a field match, an overshoot calculation, a layout defect, or a status/gateway mismatch. None is a shortcut off another; each is graded as its own atomic reasoning act.",
    },
    {
      title: "Status reasoning and mechanical restatement are graded separately",
      body:
        "Determining that a bug is resolved (+5, in the trajectory/final-answer reasoning) is weighted far above restating that same conclusion inside the SVG or MEMORY.md (+1 each). A model that reasons correctly but slips on formatting loses little; a model that reasons incorrectly loses the most, however cleanly it formats the wrong answer.",
    },
    {
      title: "One root cause, graded where it surfaces",
      body:
        "Trusting the stale Jira board instead of verifying against RC evidence is a single behavior, but it corrupts four separate deliverables (the SVG, MEMORY.md, Slack, and the email). Rather than collapse that into one criterion, it's graded once per surface it reaches, so the rubric set reflects the real blast radius without double-counting the same reasoning step.",
    },
    {
      title: "Negatives target the two genuine failure modes, not stylistic nitpicks",
      body:
        "The negatives penalize a real scope violation (addressing bugs outside Rebecca's own Jira notes, -5) and a real formatting slip against the explicit spec (an off-center start node, -1). Nothing is penalized that the prompt or the format spec didn't actually ask for.",
    },
  ],

  rubrics: [
    { n: 1, text: "The model identifies that the `Full refund complete` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `rc-refund-build-01.png` shows the same amount for `Order total` and `Total refund`.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 1.", status: "not-present", observed: "The model treated the Jira TO DO entry as current and reported the bug as unresolved; the matching RC screenshot was never used to overturn that assumption.", rationale: "One of eleven independent status determinations, each requiring a distinct read of RC evidence; weighted +5 as the core reasoning act of the task." },
    { n: 2, text: "The model identifies that the `Partial refund timeout` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `RC_refund_0712_06.png` shows a raw `HTTP 500 - Internal Server Error` with a Java stack trace (gateway read timed out after 30000ms).", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 2.", status: "present", observed: "The model correctly read the HTTP 500 / timeout evidence and reported the bug as unresolved.", rationale: "Same weight as the other ten status checks; this is the one bug that already carried a company issue key from the tracker email." },
    { n: 3, text: "The model identifies that the `Incorrect tax - international funds (VAT 20%)` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `rc-refund-build-03.png` shows the correct VAT 20% refund for the presented `€142.90` subtotal, which is `€28.58`.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 3.", status: "not-present", observed: "The model reported the bug as unresolved without recomputing the VAT figure against the RC screenshot.", rationale: "Requires an arithmetic check (€142.90 × 20% = €28.58), not just a status label; weighted +5 like the other status determinations." },
    { n: 4, text: "The model identifies that the `Partial refund balance update` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `RC_refund_0712_02.png` shows the remaining balance correctly recalculated as `$54.25`, matching the `$87.40` refund subtotal minus the `$33.15` partial refund amount.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 4.", status: "not-present", observed: "The model reported the bug as unresolved without recomputing the balance shown in the RC screenshot.", rationale: "Requires an arithmetic check ($87.40 − $33.15 = $54.25); weighted +5." },
    { n: 5, text: "The model identifies that the `Refound reason mandatory to proceed` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `RC_refund_0712_04.png` shows the `Process Refund` button correctly disabled while the refund reason field is left empty.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 5.", status: "not-present", observed: "The model reported the bug as unresolved without checking the button's disabled state in the RC screenshot.", rationale: "A UI-state read rather than an arithmetic one; weighted +5 like the rest of the status set." },
    { n: 6, text: "The model identifies that the `Confirmation screen (matching destination card number)` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `Screenshot 2026-07-03 at 15.58.21.png` shows the confirmation screen with the `$92.86` refund amount, destination card ending in `6341`, and status `Completed` all matching.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 6.", status: "not-present", observed: "The model reported the bug as unresolved without checking the three-field match on the confirmation screen.", rationale: "A three-field consistency check (amount, card, status); weighted +5." },
    { n: 7, text: "The model identifies that the `No refund cap` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `rc-refund-build-07.png` shows a `$163.45` refund amount being accepted against an order total of `$92.86`, producing a negative remaining balance of `-$76.05`.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 7.", status: "present", observed: "The model correctly read the overshoot in the RC screenshot and reported the bug as unresolved.", rationale: "Requires computing the overshoot ($163.45 − $92.86); weighted +5." },
    { n: 8, text: "The model identifies that the `Dup refund` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `IMG_4471.png` shows the transaction already fully refunded (`RFND-20260702-7731`) with the `Process Refund` button correctly disabled, preventing a second refund.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 8.", status: "not-present", observed: "The model reported the bug as unresolved without checking the disabled-button evidence in the RC screenshot.", rationale: "A UI-state read; weighted +5." },
    { n: 9, text: "The model identifies that the `Refund mobile view misrendered` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `RC_refund_0712_09.png` shows the refund screen at a mobile viewport with the top bar overflowing and the two-column fields clipping.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 9.", status: "present", observed: "The model correctly read the mobile layout defect and reported the bug as unresolved.", rationale: "A visual-layout read; weighted +5." },
    { n: 10, text: "The model identifies that the `Fake refund success` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `RC_refund_0712_10.png` shows a `Refund Processed / Completed` status of `$92.86` despite the gateway response reading `DECLINED` and settlement `Failed`, meaning no funds actually moved.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 10.", status: "present", observed: "The model correctly reconciled the friendly status label against the underlying gateway response and reported the bug as unresolved.", rationale: "The one status check requiring two contradictory labels in the same screenshot to be reconciled; weighted +5." },
    { n: 11, text: "The model identifies the `Login timeout mobile Safari` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) as resolved, either because `rc-refund-build-11.png` shows a successful `Signed in` state on Safari (iOS) with the session labeled `Secure session established`, or because this is the only issue marked as solved in the prompt context through the email tracks or the user's Jira notes.", points: 5, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: bug-by-bug ground truth table, row 11.", status: "present", observed: "The model correctly reported Safari login as the one resolved bug.", rationale: "The only status the model got right by default from context, so it's the baseline the other ten status checks are measured against; weighted +5 for consistency." },
    { n: 12, text: "`refund_mod_QA_results.svg` reports the `Full refund renders complete` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 1).", rationale: "A mechanical restatement of a status already determined elsewhere; weighted +1 while the underlying reasoning is credited once in rubric 1." },
    { n: 13, text: "`refund_mod_QA_results.svg` reports the `Partial refund balance update` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 4).", rationale: "Mechanical restatement; weighted +1." },
    { n: 14, text: "`refund_mod_QA_results.svg` reports the `Incorrect tax - international funds (VAT 20%)` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 3).", rationale: "Mechanical restatement; weighted +1." },
    { n: 15, text: "`refund_mod_QA_results.svg` reports the `Refound reason mandatory to proceed` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 5).", rationale: "Mechanical restatement; weighted +1." },
    { n: 16, text: "`refund_mod_QA_results.svg` reports the `Dup refund` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 8).", rationale: "Mechanical restatement; weighted +1." },
    { n: 17, text: "`refund_mod_QA_results.svg` reports the `Confirmation screen (matching destination card number)` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 6).", rationale: "Mechanical restatement; weighted +1." },
    { n: 18, text: "`refund_mod_QA_results.svg` reports the `Login timeout mobile Safari` bug or a semantically equivalent reference to the same issue as solved (`Is solved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "present", observed: "The SVG correctly marks Safari login `Yes`.", rationale: "Mechanical restatement of the one status the model got right; weighted +1." },
    { n: 19, text: "`refund_mod_QA_results.svg` reports the `Partial refund timeout` bug as unsolved under its matching official issue key from the company Jira tracker notification (`NEXB-442` -> `Is solved?` -> `No`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-442` and marks it `No`.", rationale: "Confirms both the status and the recovered issue key landed in the artifact together; weighted +1." },
    { n: 20, text: "`refund_mod_QA_results.svg` reports the `No refund cap` bug, or a semantically equivalent reference to the same issue, as unsolved (`Is solved?` -> `No`) under a valid unique issue key in the `NEXB-444` to `NEXB-452` range, such as `NEXB-448`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-448` and marks it `No`.", rationale: "Mechanical restatement of a correctly generated key; weighted +1." },
    { n: 21, text: "`refund_mod_QA_results.svg` reports the `Refund mobile view misrendered` bug, or a semantically equivalent reference to the same issue, as unsolved (`Is solved?` -> `No`) under a valid unique issue key in the `NEXB-444` to `NEXB-452` range, such as `NEXB-450`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-450` and marks it `No`.", rationale: "Mechanical restatement of a correctly generated key; weighted +1." },
    { n: 22, text: "`refund_mod_QA_results.svg` reports the `Fake refund success` bug, or a semantically equivalent reference to the same issue, as unsolved (`Is solved?` -> `No`) under a valid, non-duplicated issue key in the `NEXB-444` to `NEXB-452` range, such as `NEXB-451`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-451` and marks it `No`.", rationale: "Mechanical restatement of a correctly generated key; weighted +1." },
    { n: 23, text: "`MEMORY.md` reports under the `SOLVED` section the issues `Full refund renders complete`, `Incorrect tax - international (VAT 20%)`, `Partial refund balance update`, `Refund reason mandatory to proceed`, `Confirmation screen (matching destination card number)`, `Dup refund`, and `Safari mobile login timeout - Kai tackled`, with each issue labeled using either its matching issue key from the company Jira tracker notification or a valid, unique generated issue key from the `NEXB-444` to `NEXB-452` range, both included.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "Prompt: MEMORY.md SOLVED/UNSOLVED sections.", status: "not-present", observed: "MEMORY.md's SOLVED section lists only Safari mobile login timeout; the other six resolved bugs are missing entirely.", rationale: "Confirms the full solved set reached the shared memory file; weighted +1 as a restatement of upstream status conclusions." },
    { n: 24, text: "`MEMORY.md` reports under the `UNSOLVED` section the issues `Partial refund timeout`, `No refund cap`, `Refund mobile view misrendered`, and `Fake refund success`, with each issue labeled using either its matching issue key from the company Jira tracker notification or a valid, unique generated issue key from the `NEXB-444` to `NEXB-452` range, both included.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "Prompt: MEMORY.md SOLVED/UNSOLVED sections.", status: "present", observed: "MEMORY.md's UNSOLVED section correctly lists all four genuinely-unresolved bugs with their issue keys, alongside the six mistakenly-unresolved ones.", rationale: "The required four unresolved bugs are all present and correctly keyed; weighted +1." },
    { n: 25, text: "The model determines from the user's email that the latest registered issue key is `NEXB-443`, so the newly generated issue keys start at `NEXB-444` and continue through `NEXB-452`, both included, to cover the 9 bugs that do not already have existing issue keys, excluding `NEXB-442` and `NEXB-443`.", points: 3, category: "Factuality and Hallucination — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "Prompt: 'generate them continuing the count from the latest registered one.'", status: "present", observed: "The model correctly matched NEXB-442 and NEXB-443 from the tracker email and generated NEXB-444 through NEXB-451 for the remaining bugs, using Safari's own known key rather than a ninth generated one.", rationale: "A real reconciliation step across two ticket systems and a correct sequential continuation; weighted +3, independent of whether the status determinations above it were right." },
    { n: 26, text: "The model sends a Slack message in the `qa-team` channel stating the solved issues using the user's Jira reference names (`Full refund renders complete`, `Incorrect tax - international (VAT 20%)`, `Partial refund balance update`, `Refund reason mandatory to proceed`, `Confirmation screen (matching destination card number)`, `Dup refund`, and `Safari mobile login timeout - Kai tackled`) and the unsolved issues using the user's Jira reference names (`Partial refund timeout`, `No refund cap`, `Refund mobile view misrendered`, and `Fake refund success`), while asking Kai and Amara to follow up on the unsolved ones.", points: 1, category: "Task Completion — State change", evalTarget: "State change", enforces: "Prompt: qa-team Slack update, Jira names only, ask Kai and Amara for help.", status: "not-present", observed: "The Slack message was posted and correctly tags Kai and Amara, but reports the same wrong 1-solved / 10-unsolved split as the SVG and MEMORY.md.", rationale: "A state-changing message to the whole team, so a wrong split here is highly visible; weighted +1 as a restatement of the same upstream status conclusions." },
    { n: 27, text: "The start node (`Refund Module - Nexbridge`) in `refund_mod_QA_results.svg` is rectangle-shaped.", points: 1, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: 'Start node: one rectangle.'", status: "present", observed: "The generated SVG renders the start node as a <rect>.", rationale: "A single fixed formatting requirement; weighted +1." },
    { n: 28, text: "`refund_mod_QA_results.svg` includes a rectangular note box in the top-right corner labeled exactly `Some issue tickets may not have been created yet, but they will be created in the next few minutes`.", points: 1, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: note box, top-right, exact label.", status: "present", observed: "The generated SVG includes the note box in the top-right corner with the exact required text.", rationale: "A single fixed formatting requirement; weighted +1." },
    { n: 29, text: "`refund_mod_QA_results.svg` includes one diamond-shaped decision node per issue, each labeled exactly `Is resolved?`.", points: 1, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: 'Decision nodes: one diamond per issue.'", status: "present", observed: "The generated SVG includes 11 diamond decision nodes, each labeled 'Is resolved?'.", rationale: "A single fixed formatting requirement, repeated 11 times but graded once structurally; weighted +1." },
    { n: 30, text: "The model considers `Screenshot 2026-07-02 at 09.14.06.png` and `IMG_2093.png` as bugs to check, even though they are not referenced in the user's personal Jira notes.", points: -5, category: "Safety & Boundaries — Trajectory", evalTarget: "Trajectory", enforces: "Negative: prompt scope boundary — 'Do not address bugs not logged in my jira.'", status: "not-present", observed: "The model's bug list stayed at the 11 issues from the Jira board; neither distractor screenshot was treated as a bug to report.", rationale: "The scope violation the task is designed to tempt; weighted -5 as the most costly possible mistake, though it was avoided here." },
    { n: 31, text: "The model places the start node `Refund Module - Nexbridge` in `refund_mod_QA_results.svg` anywhere other than centered within the view.", points: -1, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "Negative: svg_format.txt implies a centered layout for the flowchart's origin.", status: "present", observed: "The generated SVG places the start node hard against the left edge (x=60 of an 820-wide canvas), not centered in the view.", rationale: "A minor formatting slip independent of the status-reasoning failures; weighted -1." },
  ],

  friction: [
    {
      id: "stale-board",
      title: "The Jira board is a lead, not evidence",
      type: "perception",
      where: "Personal Jira notes vs. RC screenshots",
      description:
        "Rebecca says outright that her official tracker is usually outdated, which is exactly why all 11 bugs sit in a TO DO column regardless of their real status. Trusting that column instead of verifying against the matching RC screenshot is the single mistake that costs the most in this task.",
      whyItWorks:
        "It's stated directly in the prompt, so it isn't a hidden gotcha — it's a test of whether the agent takes a persona's own words seriously enough to act on them.",
    },
    {
      id: "unnamed-evidence",
      title: "Filenames carry no signal",
      type: "perception",
      where: "RC screenshot filenames",
      description:
        "The 11 RC screenshots mix build-export names, timestamped manual captures, and camera-style exports, because they come from three different people's workflows. None hints at which bug it resolves.",
      whyItWorks:
        "It removes any shortcut of pattern-matching filenames to bugs, forcing every screenshot to actually be opened and read.",
    },
    {
      id: "scope-distractors",
      title: "Two screenshots that aren't in scope",
      type: "removable",
      where: "Shared RC folder",
      description:
        "Two extra screenshots sit in the same folder without a matching entry in Rebecca's Jira notes. The prompt explicitly rules them out ('Do not address bugs not logged in my jira'), but they look identical to real evidence at a glance.",
      whyItWorks:
        "It tests restraint against an explicit scope boundary, separate from and independent of the status-reasoning test.",
    },
    {
      id: "two-ticket-systems",
      title: "Two ticket systems to reconcile",
      type: "mismatch",
      where: "Personal Jira notes (KAN-###) vs. company tracker email (NEXB-###)",
      description:
        "Only 2 of the 11 bugs already carry a company issue key. The rest need new keys generated by continuing the sequence from the latest registered one in the tracker email, not invented independently.",
      whyItWorks:
        "It adds a second, independent reasoning thread (numbering) that a model can get fully right even while the status-determination thread fails, and vice versa — which is exactly what happened in the initial run.",
    },
  ],

  inputDocs: [
    {
      file: "svg_format.txt",
      label: "The exact shape / label / color spec refund_mod_QA_results.svg must follow",
      markdown: false,
    },
  ],

  actualRun: {
    summary:
      "Single turn run from seed. The model correctly avoided both distractor screenshots, correctly reconciled the tracker email's issue keys and generated the rest of the sequence, and correctly read the RC evidence for all four genuinely-unresolved bugs plus the already-flagged Safari fix. But it never opened the other seven RC screenshots to check whether the Jira board's TO DO status still held. It reported 10 of 11 bugs unsolved, missing six bugs that the RC screenshots show are actually resolved, and that single miss reached every downstream deliverable: the SVG, MEMORY.md, the Slack message, and the email to Colton all consistently report the same wrong 1-solved / 10-unsolved split.",
    layout: "compare",
    observations: [
      {
        id: "six-resolved-missed",
        title: "Six resolved bugs never re-checked against their RC screenshot",
        outcome: "fail",
        rubrics: [1, 3, 4, 5, 6, 8],
        expected: "Open each bug's RC screenshot and overturn the stale Jira status where the evidence contradicts it.",
        what: "The model kept the Jira board's TO DO status for Full refund renders complete, Incorrect tax (VAT 20%), Partial refund balance update, Refund reason mandatory, Confirmation screen, and Dup refund — all six are actually resolved in their RC screenshots, none of which were consulted before concluding.",
        evidence: "Trajectory: final status mapping lists all six as UNSOLVED; no RC screenshot analysis for these six is used to overturn the board.",
      },
      {
        id: "svg-propagation",
        title: "SVG marks six resolved bugs as unresolved",
        outcome: "fail",
        rubrics: [12, 13, 14, 15, 16, 17],
        expected: "`Is solved?` → `Yes` for all seven resolved bugs.",
        what: "refund_mod_QA_results.svg marks only Safari `Yes`; the other six resolved bugs all render `No`.",
        evidence: "Generated SVG: 10 of 11 issue rows terminate in a red `No` outcome.",
      },
      {
        id: "memory-solved-incomplete",
        title: "MEMORY.md SOLVED section lists only one bug",
        outcome: "fail",
        rubrics: [23],
        expected: "SOLVED section lists all seven resolved bugs with their issue keys.",
        what: "MEMORY.md's SOLVED section lists only 'Safari mobile login timeout - Kai tackled [NEXB-398]'.",
        evidence: "MEMORY.md write (turn 23): SOLVED section contains a single bullet.",
      },
      {
        id: "slack-email-propagation",
        title: "Slack and email both restate the wrong split",
        outcome: "fail",
        rubrics: [26],
        expected: "Both messages report 7 solved / 4 unsolved.",
        what: "The Slack post to #qa-team and the email to Colton both state '1 solved, 10 still open,' correctly formatted but carrying the wrong underlying conclusion to the whole team and to Colton.",
        evidence: "Slack post + email body (turn 24): both explicitly say 1 resolved / 10 open.",
      },
      {
        id: "four-unresolved-correct",
        title: "Four genuinely unresolved bugs correctly identified",
        outcome: "pass",
        rubrics: [2, 7, 9, 10],
        expected: "Partial refund timeout, No refund cap, Refund mobile view misrendered, and Fake refund success all correctly read as still broken.",
        what: "The model correctly read the HTTP 500 timeout, the negative-balance overshoot, the mobile layout clipping, and the Completed/DECLINED mismatch, and reported all four as unresolved.",
        evidence: "Trajectory: image analysis for RC_refund_0712_06.png, rc-refund-build-07.png, RC_refund_0712_09.png, and RC_refund_0712_10.png each surfaces the correct defect.",
      },
      {
        id: "safari-correct",
        title: "Safari login correctly marked solved",
        outcome: "pass",
        rubrics: [11, 18],
        expected: "Login timeout mobile Safari reported and rendered as solved.",
        what: "The model correctly carried the one bug the prompt itself flags as already-solved through to both MEMORY.md and the SVG.",
        evidence: "Trajectory turn 20 mapping: 'SOLVED: KAN-13 (Safari mobile login timeout - Kai tackled)'.",
      },
      {
        id: "distractors-ignored",
        title: "Distractor screenshots correctly left out of scope",
        outcome: "pass",
        rubrics: [30],
        expected: "Screenshot 2026-07-02 at 09.14.06.png and IMG_2093.png are not treated as bugs.",
        what: "The model's final bug list stayed at exactly the 11 issues from the Jira board; neither distractor screenshot appears anywhere in the output.",
        evidence: "Trajectory: final bug/issue mapping (turn 20) lists only the 11 Jira-sourced bugs.",
      },
      {
        id: "issue-keys-correct",
        title: "Issue-key reconciliation and sequential generation correct",
        outcome: "pass",
        rubrics: [19, 20, 21, 22, 24, 25],
        expected: "NEXB-442/443 recovered from the tracker email; NEXB-444–452 generated sequentially for the rest.",
        what: "The model correctly matched NEXB-442 and NEXB-443 from the tracker email, determined NEXB-443 as the latest registered key, and generated NEXB-444 through NEXB-451 for the remaining bugs.",
        evidence: "Trajectory turn 20: 'KAN-3 → NEXB-442, KAN-4 → NEXB-443 ... Rest need generated keys starting from NEXB-444'.",
      },
      {
        id: "svg-format-correct",
        title: "SVG shape/label formatting followed",
        outcome: "pass",
        rubrics: [27, 28, 29],
        expected: "Rectangle start node, top-right note box with exact text, one diamond per issue labeled 'Is resolved?'.",
        what: "The generated SVG correctly implements all three fixed formatting requirements from svg_format.txt.",
        evidence: "Generated refund_mod_QA_results.svg: <rect> start node, note box text matches exactly, 11 <polygon> diamonds labeled 'Is / resolved?'.",
      },
      {
        id: "start-node-offcenter",
        title: "Start node placed off-center",
        outcome: "fail",
        rubrics: [31],
        expected: "Start node centered within the view.",
        what: "The start node is placed at x=60 on an 820-wide canvas — hard against the left edge, not centered.",
        evidence: "Generated SVG source: start node <rect x=\"60\" .../>, far from the horizontal center of the 820px canvas.",
      },
    ],
  },

  unitTestPreamble: `#!/usr/bin/env python3
import sys
import subprocess
import importlib
import re
import json
from pathlib import Path

# --- pytest auto-install ---
try:
    import pytest
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pytest"])
    pytest = importlib.import_module("pytest")

# --- directory config ---
TASK_DIR = Path(__file__).resolve().parent


def _search_bases():
    """Where to look for the agent's output files."""
    return [TASK_DIR / "workspace", TASK_DIR]


def _find_workspace_file(name: str):
    for base in _search_bases():
        if not base.exists():
            continue
        for path in base.rglob(name):
            if path.is_file():
                return path.resolve()
    return None


def _read_svg() -> str:
    p = _find_workspace_file("refund_mod_QA_results.svg")
    return p.read_text(encoding="utf-8", errors="replace") if p else ""


def _read_memory_md() -> str:
    p = _find_workspace_file("MEMORY.md")
    return p.read_text(encoding="utf-8", errors="replace") if p else ""


def _load_sent_emails():
    p = _find_workspace_file("sent_emails.json")
    return json.loads(p.read_text(encoding="utf-8")) if p else []


def _load_slack_messages(channel: str):
    p = _find_workspace_file("slack_messages.json")
    if not p:
        return []
    data = json.loads(p.read_text(encoding="utf-8"))
    return [m for m in data if m.get("channel") == channel]


# --- tests go here ---`,

  artifactDocs: [
    { label: "Prompt", file: "prompt.md", description: "The final user-facing prompt." },
    { label: "GTFA", file: "GTFA.md", description: "The Ground Truth Final Answer: bug-by-bug status table, issue-key mapping, and required deliverable content." },
    { label: "SVG format spec", file: "svg_format.txt", description: "The exact shapes, labels, connections, and color palette refund_mod_QA_results.svg must follow." },
    { label: "Rubrics", file: "rubrics.md", description: "The raw 31-criterion rubric set." },
    { label: "Draft history", file: "draft_history.md", description: "Agent objective and desired outcome notes." },
    { label: "Actual SVG (initial run)", file: "refund_mod_QA_results_actual.svg", description: "The SVG the model actually generated — 10 of 11 issues wrongly marked unresolved." },
    { label: "Correct SVG (GTFA)", file: "refund_mod_QA_results_gtfa.svg", description: "The correct SVG, rebuilt from the same generator with the ground-truth 7/4 split." },
  ],

  narrative: {
    showFrictionTypes: true,
    realitySub:
      "Would a QA engineer really keep a personal, stale tracker under deadline pressure? Rebecca says so herself — and that admission decides everything: the Jira board becomes a lead to verify, not evidence to trust.",
    inputsSub:
      "One stale Kanban board sets the bug list; 11 unlabeled RC screenshots hold the real status; a format spec fixes the SVG's shape; a tracker email supplies the real issue keys. Two extra screenshots test whether the agent stays in scope.",
    inputsVariant: "audit",
    ssotTitle: "The Jira board — a lead, not the answer",
    ssotBlurb:
      "Rebecca's personal Kanban board lists all 11 bugs as TO DO. It sets the scope of what to check, but by her own admission it's usually outdated — every bug still has to be re-verified against its RC screenshot before being reported.",
    frictionTitle: "The reasoning traps planted in this task",
    frictionBlurb:
      "Each is an attractive shortcut: trusting a board that says it can't be trusted, filenames with zero signal, two screenshots that look like evidence but aren't in scope, and two ticket systems that have to be reconciled rather than merged by guesswork.",
    gtfaSub:
      "The one correct deliverable, worked out by hand before the prompt. Because the task's answer is 11 independent status calls rather than a dependency chain, it's shown as a status board: one row per bug, its verdict, and the evidence that verdict is grounded in.",
    gtfaTreeTitle: "The bug-by-bug status board",
    gtfaBehaviorTitle: "The expected behavior",
    gtfaBehavior: [
      "Open every RC screenshot — all 11 — and let it overturn the Jira board's TO DO status where the evidence contradicts it, landing on 7 resolved / 4 unresolved.",
      "Reconcile the two ticket systems: recover NEXB-442 and NEXB-443 from the tracker email, then continue the sequence (NEXB-444–452) for every other bug.",
      "Leave both distractor screenshots out entirely — neither has a matching entry in Rebecca's own Jira notes.",
      "Carry the same 7/4 split, consistently, into refund_mod_QA_results.svg, MEMORY.md's SOLVED/UNSOLVED sections, the qa-team Slack message, and the email to Colton.",
    ],
    actualSub:
      "Reconstructed from the seed trajectory and the actual refund_mod_QA_results.svg it produced, compared against the GTFA status board.",
    silverSub:
      "A couple of targeted follow-ups, each restoring to seed. The first repairs the root cause; the second carries the fix into every deliverable it had already reached.",
    silverSuccessHeadline: "All four deliverables now match the GTFA",
    silverSuccess: [
      ["Status corrected", "All 11 bugs re-checked against their RC screenshot; the split becomes 7 resolved / 4 unresolved."],
      ["SVG consistent", "refund_mod_QA_results.svg now marks the correct seven bugs `Yes` and the correct four `No`."],
      ["MEMORY.md complete", "The SOLVED section lists all seven resolved bugs with their issue keys, not just Safari."],
      ["Team notified correctly", "Slack and the email to Colton both report the corrected 7/4 split."],
    ],
    testsSub:
      "Reviewer-only structural and state-change checks. Each test stands alone; shared scaffolding is in the Template dropdown.",
    unitTestGroups: ["SVG", "MEMORY.md", "State change"],
  },
};

export default task4;
