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
    "Two distractor screenshots — a Payouts & Settlements dashboard and Rebecca's own personal calendar — sit in the same folder without a matching Jira entry, testing whether the agent stays inside 'do not address bugs not logged in my jira.'",
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
      whatItShows: "A Nexbridge Payouts & Settlements dashboard — merchant settlement batches, paid/pending/failed totals. Real payments data, but not a refund-module bug.",
      verdict: "Excluded — not logged in Rebecca's Jira, out of scope.",
      rationale: "Tests restraint: it looks like more of the same kind of RC evidence, so the prompt's explicit scope rule ('do not address bugs not logged in my jira') has to actually be applied, not just assumed to be automatic.",
      tags: ["distractor", "out of scope"],
    },
    {
      filename: "IMG_2093.png",
      src: "mm_input/IMG_2093.png",
      kind: "image",
      role: "distractor",
      whatItShows: "Rebecca's own personal weekly calendar app screenshot (school pickups, dance practice, custody handoff) — entirely unrelated to the refund module.",
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
        "Before finalizing any bug's status, open its matching RC screenshot from the shared team folder and let it decide — the Jira board is known to be outdated, so its TO DO column is not evidence for any bug, including the ones you already have marked unsolved. Re-check all 11 this way. Six of them (Full refund renders complete, Incorrect tax - international funds (VAT 20%), Partial refund balance update, Refund reason mandatory to proceed, Confirmation screen (matching destination card number), and Dup refund) are actually resolved in the RC build, in addition to the Safari login you already correctly marked solved. For the four that really are still broken, state the defect the screenshot shows rather than carrying the board's status forward.",
      fixes:
        "Repairs the root cause. Once every RC screenshot is actually read instead of trusting the Jira column, the split changes from 1 solved / 10 unsolved to the correct 7 solved / 4 unsolved, and each of the four unresolved calls rests on its own evidence instead of coinciding with a stale board.",
    },
    {
      n: 2,
      label: "Regenerate every deliverable to the corrected split",
      message:
        "Regenerate refund_mod_QA_results.svg, MEMORY.md, the Slack message, and the email so all four deliverables consistently report 7 solved / 4 unsolved, keeping the issue-key mapping you already got right (NEXB-398 for Safari, NEXB-442, NEXB-443, and the NEXB-444–451 generated range).",
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
      logic: "The deliverable file exists in the workspace and is non-empty.",
      group: "SVG",
      weight: 1,
      covers:
        "The prompt names one file by name — refund_mod_QA_results.svg. Existence is the most 1:1 check in the whole task: the file is either there or it isn't, and there is exactly one acceptable filename. Nothing about the report's content is asserted here, so there is no wording to overfit to.",
      code: `def test_svg_report_exists():
    """refund_mod_QA_results.svg must exist in the workspace and be non-empty."""
    p = _find_svg()
    assert p is not None, f"{SVG_NAME} not found in workspace"
    assert p.stat().st_size > 0, f"{SVG_NAME} exists but is empty"`,
    },
    {
      ref: "test_svg_colors_used_on_correct_elements",
      logic: "Each palette color is bound to the element role svg_format.txt assigns it, in the ground-truth counts.",
      group: "SVG",
      weight: 3,
      covers:
        "svg_format.txt fixes the palette and ties each hex to one role: #ff4733 on issue nodes, #2c55d4 on the single start node, #158a52 on Yes terminals, #c23b3b on No terminals. Because the spec is given to the model before it acts, the mapping is explicit and structural rather than stylistic — and the counts (11 / 1 / 7 / 4) come straight from the GTFA, not from any wording choice the model gets to make.",
      code: `_EXPECTED_ISSUE_NODES = 11
_EXPECTED_START_NODES = 1
_EXPECTED_YES_TERMINALS = 7
_EXPECTED_NO_TERMINALS = 4


def test_svg_colors_used_on_correct_elements():
    """svg_format.txt ties each palette color to a specific role: #ff4733 on every issue
    node, #2c55d4 on the (single) start node, #158a52 on Yes terminals, #c23b3b on No
    terminals. test_svg_allowed_colors_only only rejects colors outside the palette - it
    doesn't check that the required colors are actually applied to the right elements or
    the right number of times, so this checks the binding directly against the
    ground-truth counts."""
    p = _find_svg()
    assert p is not None, f"{SVG_NAME} not found in workspace"
    raw = p.read_text(encoding="utf-8", errors="replace")

    n_issue_nodes = len(re.findall(r'<rect[^>]*fill="#ff4733"', raw, re.IGNORECASE))
    n_start_nodes = len(re.findall(r'<rect[^>]*fill="#2c55d4"', raw, re.IGNORECASE))
    n_yes = len(re.findall(r'<text[^>]*fill="#158a52"[^>]*>\\s*Yes\\s*<', raw, re.IGNORECASE))
    n_no = len(re.findall(r'<text[^>]*fill="#c23b3b"[^>]*>\\s*No\\s*<', raw, re.IGNORECASE))

    assert n_issue_nodes == _EXPECTED_ISSUE_NODES, (
        f"{SVG_NAME} has {n_issue_nodes} issue node(s) filled #ff4733; "
        f"expected {_EXPECTED_ISSUE_NODES}"
    )
    assert n_start_nodes == _EXPECTED_START_NODES, (
        f"{SVG_NAME} has {n_start_nodes} start node(s) filled #2c55d4; "
        f"expected {_EXPECTED_START_NODES}"
    )
    assert n_yes == _EXPECTED_YES_TERMINALS, (
        f"{SVG_NAME} has {n_yes} 'Yes' terminal(s) filled #158a52; "
        f"expected {_EXPECTED_YES_TERMINALS}"
    )
    assert n_no == _EXPECTED_NO_TERMINALS, (
        f"{SVG_NAME} has {n_no} 'No' terminal(s) filled #c23b3b; "
        f"expected {_EXPECTED_NO_TERMINALS}"
    )`,
    },
    {
      ref: "test_svg_each_issue_node_has_one_terminal",
      logic: "Every individual issue node owns exactly one Yes/No terminal — not just a correct global total.",
      group: "SVG",
      weight: 3,
      covers:
        "The test above only checks totals, so a report could sum to 7 Yes / 4 No while one issue carries two terminals and another none. The spec's rule — one decision path per issue — is per-issue and 1:1, so it is checkable structurally. It deliberately does not assert how the diamond is drawn (no <polygon> requirement), because svg_format.txt requires a diamond shape without prescribing the markup; asserting a tag would be overfitting to one valid implementation.",
      code: `def test_svg_each_issue_node_has_one_terminal():
    """test_svg_colors_used_on_correct_elements only checks GLOBAL totals, so an SVG could
    have the right overall count of Yes/No terminals while some issue node has two
    terminals (or none) and another has none (or two) - a correct sum built from an
    incorrect per-issue assignment. This walks the SVG issue-by-issue (splitting on each
    #ff4733 issue-node rect) and requires every single issue to have exactly one Yes/No
    terminal of its own. It intentionally doesn't check for a specific decision-diamond
    tag (e.g. <polygon>), since svg_format.txt requires a diamond shape but not any
    particular way of drawing one."""
    p = _find_svg()
    assert p is not None, f"{SVG_NAME} not found in workspace"
    raw = p.read_text(encoding="utf-8", errors="replace")

    issue_rect_re = re.compile(r'<rect[^>]*fill="#ff4733"', re.IGNORECASE)
    starts = [m.start() for m in issue_rect_re.finditer(raw)]
    assert starts, f"No issue nodes (fill=#ff4733) found in {SVG_NAME}"

    bounds = starts + [len(raw)]
    blocks = [raw[bounds[i]:bounds[i + 1]] for i in range(len(starts))]

    yes_re = re.compile(r'<text[^>]*fill="#158a52"[^>]*>\\s*Yes\\s*<', re.IGNORECASE)
    no_re = re.compile(r'<text[^>]*fill="#c23b3b"[^>]*>\\s*No\\s*<', re.IGNORECASE)

    bad = []
    for i, block in enumerate(blocks, start=1):
        n_terminals = len(yes_re.findall(block)) + len(no_re.findall(block))
        if n_terminals != 1:
            bad.append(f"issue #{i}: {n_terminals} Yes/No terminal(s)")

    assert not bad, (
        f"{SVG_NAME} has issue node(s) without exactly one Yes/No terminal of "
        f"their own: {bad}"
    )`,
    },
    {
      ref: "test_email_sent_to_colton",
      logic: "A sent email to colton.park@nexbridge.io carries the exact required subject and the SVG attachment.",
      group: "State change",
      weight: 3,
      covers:
        "This is the textbook 1:1 case. The prompt names the recipient (Colton), the subject (`current refund module QA status`), and the attachment (refund_mod_QA_results.svg) before the model acts, so there is exactly one correct value for each. The test asserts only those three facts and the SENT state — it never inspects the body, because 'explain the status' is a 1:n requirement that many different wordings would satisfy, and that part is left to the rubrics.",
      code: `def test_email_sent_to_colton():
    """Verify email sent to Colton with correct subject and attachment."""
    snapshot_path = _find_snapshot()
    assert snapshot_path is not None, "snapshots.json not found"

    with open(snapshot_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert "email" in data, "email service missing from snapshots"
    emails = data["email"].get("emails", [])

    sent_email = None
    for email in emails:
        if (email.get("folder") == "SENT"
                and email.get("subject") == "current refund module QA status"
                and "colton.park@nexbridge.io" in email.get("recipients", [])):
            sent_email = email
            break

    assert sent_email is not None, (
        "No sent email to Colton with subject 'current refund module QA status' found"
    )

    attachments = sent_email.get("attachments", {})
    assert SVG_NAME in attachments, f"{SVG_NAME} not attached to email"`,
    },
    {
      ref: "test_memory_md_has_solved_unsolved_sections",
      logic: "MEMORY.md labels two distinct sections, SOLVED and UNSOLVED, each on its own line.",
      group: "MEMORY.md",
      weight: 1,
      covers:
        "The prompt names both section labels verbatim, so the required structure is 1:1 — there is one SOLVED section and one UNSOLVED section, and no alternative label satisfies the instruction. The regex deliberately accepts any Markdown decoration around the word (#, **, -, :) rather than demanding a heading level, since the prompt asks for sections, not for a particular Markdown style. Which bugs land in each section is not checked here; that is a reasoning outcome and belongs to the rubrics.",
      code: `def test_memory_md_has_solved_unsolved_sections():
    """MEMORY.md must label two distinct sections, SOLVED and UNSOLVED, each as its own
    line. Markdown decoration (#, **, -, :) is accepted but not required."""
    memory_path = _find_memory_md()
    assert memory_path is not None, "MEMORY.md not found"

    with open(memory_path, "r", encoding="utf-8") as f:
        content = f.read()

    assert re.search(r'(?im)^[\\s>#*_\`\\-]*SOLVED[\\s:*_\`]*$', content), (
        "MEMORY.md has no standalone 'SOLVED' section label"
    )
    assert re.search(r'(?im)^[\\s>#*_\`\\-]*UNSOLVED[\\s:*_\`]*$', content), (
        "MEMORY.md has no standalone 'UNSOLVED' section label"
    )`,
    },
    {
      ref: "test_memory_md_entries_have_issue_keys",
      logic: "Every bug entry under SOLVED/UNSOLVED carries a NEXB-XXX key, and no key is reused.",
      group: "MEMORY.md",
      weight: 3,
      covers:
        "The prompt requires each issue to be 'referenced with its matching issue key', and the key format (NEXB-###) is fixed by the tracker email the model reads. The test asserts only the two objective properties: presence of a key on every entry, and uniqueness across entries. It does not assert which key goes with which bug — that mapping is a reasoning result the rubrics grade — and it does not require brackets or any particular decoration around the key, which would overfit to one formatting choice.",
      code: `_MEMORY_HEADER_RE = re.compile(r'(?im)^[\\s>#*_\`\\-]*(SOLVED|UNSOLVED)[\\s:*_\`]*$')
_MEMORY_BULLET_RE = re.compile(r'^\\s*[-*]\\s+\\S')


def _memory_sections():
    """Bullet lines under each of MEMORY.md's SOLVED / UNSOLVED headers (a bullet belongs
    to whichever header was last seen above it)."""
    memory_path = _find_memory_md()
    assert memory_path is not None, "MEMORY.md not found"

    with open(memory_path, "r", encoding="utf-8") as f:
        content = f.read()

    sections = {"solved": [], "unsolved": []}
    current = None
    for line in content.splitlines():
        header = _MEMORY_HEADER_RE.match(line)
        if header:
            current = header.group(1).lower()
            continue
        if current in sections and _MEMORY_BULLET_RE.match(line):
            sections[current].append(line.strip())
    return sections


def test_memory_md_entries_have_issue_keys():
    """Every bug entry (bullet line) under SOLVED/UNSOLVED must reference an issue key in
    NEXB-XXX format, per the prompt's "referenced ... with its matching issue key"
    requirement - and each key must be used for only one entry."""
    sections = _memory_sections()
    bullets = sections["solved"] + sections["unsolved"]
    assert bullets, "MEMORY.md has no bug entries under SOLVED/UNSOLVED"

    missing = [l for l in bullets if not re.search(r'NEXB-\\d+', l)]
    assert not missing, (
        f"{len(missing)} MEMORY.md entr(y/ies) lack a NEXB-XXX issue key: {missing}"
    )

    keys = [re.search(r'NEXB-\\d+', l).group(0) for l in bullets]
    dupes = sorted({k for k in keys if keys.count(k) > 1})
    assert not dupes, f"MEMORY.md reuses the same issue key for multiple entries: {dupes}"`,
    },
  ],

  unitTestRationale: [
    {
      title: "The line this task draws: 1:1 rules to tests, 1:n rules to rubrics",
      body:
        "A requirement belongs in a unit test when the prompt pins it down to exactly one acceptable value before the model acts. Here that is true of the deliverable's filename, the email's recipient, subject and attachment, MEMORY.md's two section labels, the NEXB-### key format, and every shape/color binding in svg_format.txt. Each has one correct answer, so a test can check it without either underfitting (accepting a wrong answer) or overfitting (rejecting a valid one).",
    },
    {
      title: "What is deliberately left out — and why",
      body:
        "No test inspects the email body, the Slack wording, or the phrasing of a MEMORY.md entry. 'Report the resolved and unresolved bugs' is a 1:n requirement: many different wordings communicate the same information equally well, so an exact-content assertion would be an overfit. That does not make the expected result non-deterministic — it means the check belongs to the rubrics, which is where the 11 status determinations and the Slack message are graded.",
    },
    {
      title: "Tests cover state changes and artifact structure",
      body:
        "The set splits cleanly along that line. test_email_sent_to_colton is the state-change check — an email either exists in SENT with that recipient, subject and attachment, or it doesn't. The five remaining tests check the structural requirements of the two final artifacts: the SVG exists, its palette is bound to the right element roles in the right counts, every issue owns exactly one terminal, and MEMORY.md carries both required sections with a unique issue key on every entry.",
    },
    {
      title: "Structure without prescribing implementation",
      body:
        "Where the spec fixes a property but not a way of expressing it, the tests stop at the property. test_svg_each_issue_node_has_one_terminal never asserts a <polygon> tag, because svg_format.txt requires a diamond shape and not a specific markup for drawing one. test_memory_md_has_solved_unsolved_sections accepts any Markdown decoration around SOLVED/UNSOLVED. And no test asserts which bug maps to which key — only that keys are present and unique — because the mapping itself is the reasoning the rubrics exist to grade.",
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
      title: "Membership and issue-key mapping are graded apart",
      body:
        "MEMORY.md is graded as four criteria rather than two. Listing the right bugs under SOLVED/UNSOLVED (+1 each) restates status conclusions already credited upstream, so it stays cheap. Labeling each of them with the correct key is its own reasoning result and gets its own criterion — +3 on the solved side, where two recovered keys must land on the right two bugs across seven entries, and +1 on the unsolved side, where only NEXB-442 is at stake across four. A model can get membership right and mapping wrong, or the reverse, and the score should show which.",
    },
    {
      title: "One negative, aimed at an actual instruction",
      body:
        "The rubric set carries a single negative: treating the two out-of-scope screenshots as bugs (-5). It targets an explicit prompt boundary — 'Do not address bugs not logged in my jira' — and is weighted to match a full status determination, because inventing a twelfth bug corrupts all four deliverables at once. Nothing in the set penalizes choices the prompt and svg_format.txt never constrained; elements the task never asked for aren't in scope for grading, however imperfect they look in a given run.",
    },
  ],

  rubrics: [
    { n: 1, text: "The model identifies that the `Full refund complete` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `rc-refund-build-01.png` shows the same amount for `Order total` and `Total refund`.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 1.", status: "not-present", observed: "The model treated the Jira TO DO entry as current and reported the bug as unresolved; the matching RC screenshot was never used to overturn that assumption.", rationale: "One of eleven independent status determinations, each requiring a distinct read of RC evidence during the run itself — evaluated against the trajectory, since it's about what the agent actually did to reach its conclusion. Weighted +5 as the core reasoning act of the task." },
    { n: 2, text: "The model identifies that the `Partial refund timeout` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `RC_refund_0712_06.png` shows a raw `HTTP 500 - Internal Server Error` with a Java stack trace (gateway read timed out after 30000ms).", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 2.", status: "not-present", observed: "The bug does end up labeled unresolved, but by carrying the stale Jira TO DO column forward — RC_refund_0712_06.png and its HTTP 500 / 30000ms timeout were never used as the grounds for that call, which is what the criterion asks for.", rationale: "Same weight as the other ten status checks; this is the one bug that already carried a company issue key from the tracker email." },
    { n: 3, text: "The model identifies that the `Incorrect tax - international funds (VAT 20%)` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `rc-refund-build-03.png` shows the correct VAT 20% refund for the presented `€142.90` subtotal, which is `€28.58`.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 3.", status: "not-present", observed: "The model reported the bug as unresolved without recomputing the VAT figure against the RC screenshot.", rationale: "Requires an arithmetic check (€142.90 × 20% = €28.58), not just a status label; weighted +5 like the other status determinations." },
    { n: 4, text: "The model identifies that the `Partial refund balance update` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `RC_refund_0712_02.png` shows the remaining balance correctly recalculated as `$54.25`, matching the `$87.40` refund subtotal minus the `$33.15` partial refund amount.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 4.", status: "not-present", observed: "The model reported the bug as unresolved without recomputing the balance shown in the RC screenshot.", rationale: "Requires an arithmetic check ($87.40 − $33.15 = $54.25); weighted +5." },
    { n: 5, text: "The model identifies that the `Refound reason mandatory to proceed` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `RC_refund_0712_04.png` shows the `Process Refund` button correctly disabled while the refund reason field is left empty.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 5.", status: "not-present", observed: "The model reported the bug as unresolved without checking the button's disabled state in the RC screenshot.", rationale: "A UI-state read rather than an arithmetic one; weighted +5 like the rest of the status set." },
    { n: 6, text: "The model identifies that the `Confirmation screen (matching destination card number)` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `Screenshot 2026-07-03 at 15.58.21.png` shows the confirmation screen with the `$92.86` refund amount, destination card ending in `6341`, and status `Completed` all matching.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 6.", status: "not-present", observed: "The model reported the bug as unresolved without checking the three-field match on the confirmation screen.", rationale: "A three-field consistency check (amount, card, status); weighted +5." },
    { n: 7, text: "The model identifies that the `No refund cap` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `rc-refund-build-07.png` shows a `$163.45` refund amount being accepted against an order total of `$92.86`, producing a negative remaining balance of `-$76.05`.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 7.", status: "not-present", observed: "Labeled unresolved, but inherited from the Jira board rather than from rc-refund-build-07.png — the $163.45-against-$92.86 overshoot is never computed.", rationale: "Requires computing the overshoot ($163.45 − $92.86); weighted +5." },
    { n: 8, text: "The model identifies that the `Dup refund` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is resolved because `IMG_4471.png` shows the transaction already fully refunded (`RFND-20260702-7731`) with the `Process Refund` button correctly disabled, preventing a second refund.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 8.", status: "not-present", observed: "The model reported the bug as unresolved without checking the disabled-button evidence in the RC screenshot.", rationale: "A UI-state read; weighted +5." },
    { n: 9, text: "The model identifies that the `Refund mobile view misrendered` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `RC_refund_0712_09.png` shows the refund screen at a mobile viewport with the top bar overflowing and the two-column fields clipping.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 9.", status: "not-present", observed: "Labeled unresolved, but RC_refund_0712_09.png was never read — the overflowing top bar and clipped two-column fields play no part in the call.", rationale: "A visual-layout read; weighted +5." },
    { n: 10, text: "The model identifies that the `Fake refund success` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) is unresolved because `RC_refund_0712_10.png` shows a `Refund Processed / Completed` status of `$92.86` despite the gateway response reading `DECLINED` and settlement `Failed`, meaning no funds actually moved.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 10.", status: "not-present", observed: "Labeled unresolved, but the Completed-vs-DECLINED contradiction in RC_refund_0712_10.png is never surfaced — the label is right for the wrong reason.", rationale: "The one status check requiring two contradictory labels in the same screenshot to be reconciled; weighted +5." },
    { n: 11, text: "The model identifies the `Login timeout mobile Safari` bug shown in the user's Jira notes (`Screenshot 2026-07-03 000152.png`) as resolved, either because `rc-refund-build-11.png` shows a successful `Signed in` state on Safari (iOS) with the session labeled `Secure session established`, or because this is the only issue marked as solved in the prompt context through the email tracks or the user's Jira notes.", points: 5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "GTFA: bug-by-bug ground truth table, row 11.", status: "present", observed: "The model correctly reported Safari login as the one resolved bug.", rationale: "The only status the model got right by default from context, so it's the baseline the other ten status checks are measured against; weighted +5 for consistency." },
    { n: 12, text: "`refund_mod_QA_results.svg` reports the `Full refund renders complete` bug or a semantically equivalent reference to the same issue as solved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 1).", rationale: "A mechanical restatement of a status already determined elsewhere; weighted +1 while the underlying reasoning is credited once in rubric 1." },
    { n: 13, text: "`refund_mod_QA_results.svg` reports the `Partial refund balance update` bug or a semantically equivalent reference to the same issue as resolved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 4).", rationale: "Mechanical restatement; weighted +1." },
    { n: 14, text: "`refund_mod_QA_results.svg` reports the `Incorrect tax - international funds (VAT 20%)` bug or a semantically equivalent reference to the same issue as solved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 3).", rationale: "Mechanical restatement; weighted +1." },
    { n: 15, text: "`refund_mod_QA_results.svg` reports the `Refound reason mandatory to proceed` bug or a semantically equivalent reference to the same issue as solved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 5).", rationale: "Mechanical restatement; weighted +1." },
    { n: 16, text: "`refund_mod_QA_results.svg` reports the `Dup refund` bug or a semantically equivalent reference to the same issue as solved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 8).", rationale: "Mechanical restatement; weighted +1." },
    { n: 17, text: "`refund_mod_QA_results.svg` reports the `Confirmation screen (matching destination card number)` bug or a semantically equivalent reference to the same issue as solved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "not-present", observed: "The SVG marks this bug `No`, propagating the upstream status miss (rubric 6).", rationale: "Mechanical restatement; weighted +1." },
    { n: 18, text: "`refund_mod_QA_results.svg` reports the `Login timeout mobile Safari` bug or a semantically equivalent reference to the same issue as solved (`Is resolved?` -> `Yes`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: Yes/No terminal per decision diamond.", status: "present", observed: "The SVG correctly marks Safari login `Yes`.", rationale: "Mechanical restatement of the one status the model got right; weighted +1." },
    { n: 19, text: "`refund_mod_QA_results.svg` reports the `Partial refund timeout` bug as unsolved under its matching official issue key from the company Jira tracker notification (`NEXB-442` -> `Is resolved?` -> `No`).", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-442` and marks it `No`.", rationale: "Confirms both the status and the recovered issue key landed in the artifact together; weighted +1." },
    { n: 20, text: "`refund_mod_QA_results.svg` reports the `No refund cap` bug, or a semantically equivalent reference to the same issue, as unsolved (`Is resolved?` -> `No`) under a valid unique issue key in the `NEXB-444` to `NEXB-451` range, such as `NEXB-448`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-448` and marks it `No`.", rationale: "Mechanical restatement of a correctly generated key; weighted +1." },
    { n: 21, text: "`refund_mod_QA_results.svg` reports the `Refund mobile view misrendered` bug, or a semantically equivalent reference to the same issue, as unsolved (`Is resolved?` -> `No`) under a valid unique issue key in the `NEXB-444` to `NEXB-451` range, such as `NEXB-450`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-450` and marks it `No`.", rationale: "Mechanical restatement of a correctly generated key; weighted +1." },
    { n: 22, text: "`refund_mod_QA_results.svg` reports the `Fake refund success` bug, or a semantically equivalent reference to the same issue, as unsolved (`Is resolved?` -> `No`) under a valid, non-duplicated issue key in the `NEXB-444` to `NEXB-451` range, such as `NEXB-451`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping.", status: "present", observed: "The SVG labels this issue `NEXB-451` and marks it `No`.", rationale: "Mechanical restatement of a correctly generated key; weighted +1." },
    { n: 23, text: "The model determines from the user's email that `NEXB-398`, `NEXB-442`, and `NEXB-443` are the three existing Jira issue keys, with `NEXB-443` being the latest.", points: 3, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "Prompt: 'generate them continuing the count from the latest registered one' — which requires knowing every key that already exists.", status: "present", observed: "The model searched the inbox for the tracker notifications and recovered all three pre-existing keys — NEXB-398, NEXB-442 and NEXB-443 — correctly taking NEXB-443 as the latest, so the generated sequence starts at NEXB-444.", rationale: "The whole two-ticket-system reconciliation graded as one trajectory act: all three pre-existing keys have to be recovered from the email before the generated sequence can start in the right place. Weighted +3 — a real retrieval-and-reasoning step, well above the +1 restatements that carry its result into the artifacts." },
    { n: 24, text: "`MEMORY.md` reports under the `SOLVED` section the issues `Full refund renders complete`, `Incorrect tax - international (VAT 20%)`, `Partial refund balance update`, `Refund reason mandatory to proceed`, `Confirmation screen (matching destination card number)`, `Dup refund`, and `Safari mobile login timeout - Kai tackled`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "Prompt: MEMORY.md SOLVED section.", status: "not-present", observed: "MEMORY.md's SOLVED section lists only Safari mobile login timeout; the other six resolved bugs are missing entirely.", rationale: "Membership only — does the right set of seven bugs appear under SOLVED. Weighted +1 as a mechanical restatement of status conclusions already credited in rubrics 1–11; the key labeling is graded separately in rubric 25." },
    { n: 25, text: "The `SOLVED` section of `MEMORY.md` labels `Incorrect tax - international (VAT 20%)` with the company Jira tracker key `NEXB-443` and `Safari mobile login timeout - Kai tackled` with `NEXB-398`, while `Full refund renders complete`, `Partial refund balance update`, `Refund reason mandatory to proceed`, `Confirmation screen (matching destination card number)`, and `Dup refund` are each labeled with a unique generated Jira key within the inclusive range `NEXB-444` to `NEXB-451`.", points: 3, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping for the solved set.", status: "not-present", observed: "Six of the seven bugs that belong under SOLVED were filed as unsolved instead, so the section never carries the key mapping this criterion describes.", rationale: "Split out from rubric 24 and weighted +3 rather than +1, because it isn't a restatement: it requires the two recovered keys to land on the correct two bugs while the remaining five draw unique keys from the generated range. Getting the SOLVED membership right and the key mapping wrong is a real, separable failure." },
    { n: 26, text: "`MEMORY.md` reports under the `UNSOLVED` section the issues `Partial refund timeout`, `No refund cap`, `Refund mobile view misrendered`, and `Fake refund success`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "Prompt: MEMORY.md UNSOLVED section.", status: "present", observed: "MEMORY.md's UNSOLVED section lists all four genuinely-unresolved bugs, alongside the six that were mistakenly carried over as unresolved.", rationale: "The membership counterpart to rubric 24, on the unsolved side; weighted +1 for the same reason — a restatement, with key labeling graded separately in rubric 27." },
    { n: 27, text: "The `UNSOLVED` section of `MEMORY.md` labels `Partial refund timeout` with the company Jira tracker key `NEXB-442`, while `No refund cap`, `Refund mobile view misrendered`, and `Fake refund success` are each labeled with a unique generated Jira key within the inclusive range `NEXB-444` to `NEXB-451`.", points: 1, category: "Task Completion — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "GTFA: issue-key mapping for the unsolved set.", status: "present", observed: "Partial refund timeout carries NEXB-442, and the other three unsolved bugs carry unique keys from the generated NEXB-444–451 range.", rationale: "The unsolved-side key mapping. Weighted +1 rather than the +3 of rubric 25 because only one pre-existing key (NEXB-442) has to land correctly here, against two in the solved set, over four entries instead of seven." },
    { n: 28, text: "The model sends a Slack message in the `qa-team` channel stating the solved issues using the user's Jira reference names (`Full refund renders complete`, `Incorrect tax - international (VAT 20%)`, `Partial refund balance update`, `Refund reason mandatory to proceed`, `Confirmation screen (matching destination card number)`, `Dup refund`, and `Safari mobile login timeout - Kai tackled`) and the unsolved issues using the user's Jira reference names (`Partial refund timeout`, `No refund cap`, `Refund mobile view misrendered`, and `Fake refund success`), while asking Kai and Amara to follow up on the unsolved ones.", points: 3, category: "Instruction Following — State change", evalTarget: "State change", enforces: "Prompt: qa-team Slack update, Jira reference names only, ask Kai and Amara for help.", status: "not-present", observed: "The Slack message was posted and correctly tags Kai and Amara, but reports the same wrong 1-solved / 10-unsolved split as the SVG and MEMORY.md.", rationale: "The only state change made to a shared team surface, and the one deliverable that also constrains naming (Rebecca's Jira reference names, not the NEXB keys) and demands a specific follow-up ask. Weighted +3 — irreversible and visible to the whole channel, unlike the +1 file restatements." },
    { n: 29, text: "The start node in `refund_mod_QA_results.svg` is a rectangle exactly labeled `Refund Module - Nexbridge`.", points: 3, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: 'Start node: one rectangle', with its exact label.", status: "present", observed: "The generated SVG renders the start node as a <rect> carrying the exact required label.", rationale: "A fixed spec requirement covering both the shape and the exact string; weighted +3 alongside the other two svg_format.txt rules, since the spec file is handed to the model and leaves no room for interpretation." },
    { n: 30, text: "`refund_mod_QA_results.svg` includes a rectangular note box in the top-right corner labeled exactly `Some issue tickets may not have been created yet, but they will be created in the next few minutes`.", points: 3, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: note box, top-right, exact label.", status: "present", observed: "The generated SVG includes the note box in the top-right corner with the exact required text.", rationale: "Shape, placement, and a verbatim string all fixed by the spec; weighted +3 for parity with the other two format rules." },
    { n: 31, text: "`refund_mod_QA_results.svg` includes one diamond-shaped decision node per issue, each labeled exactly `Is resolved?`.", points: 3, category: "Instruction Following — Final answer/artifact", evalTarget: "Final answer/artifact", enforces: "svg_format.txt: 'Decision nodes: one diamond per issue.'", status: "present", observed: "The generated SVG includes 11 diamond decision nodes, each labeled 'Is resolved?'.", rationale: "A per-issue structural rule graded once across all eleven; weighted +3 for parity with the other two format rules." },
    { n: 32, text: "The model considers `Screenshot 2026-07-02 at 09.14.06.png` and `IMG_2093.png` as bugs to check, even though they are not referenced in the user's personal Jira notes.", points: -5, category: "Agent Behavior — Trajectory", evalTarget: "Trajectory", enforces: "Negative: prompt scope boundary — 'Do not address bugs not logged in my jira.'", status: "not-present", observed: "The model opened both distractor screenshots (a Payouts & Settlements dashboard, and Rebecca's own personal calendar) but correctly excluded both from the bug list — the final 11 issues all trace back to the Jira board.", rationale: "The one negative in the set, and the scope violation the task is designed to tempt. Evaluated against the trajectory since it's about what the agent chose to act on; weighted -5, matching a full status determination, because inventing a twelfth bug corrupts every deliverable at once." },
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
        "Two extra screenshots sit in the same folder without a matching entry in Rebecca's Jira notes: a Payouts & Settlements dashboard (plausible-looking payments evidence) and Rebecca's own personal weekly calendar (obviously unrelated). The prompt explicitly rules both out ('Do not address bugs not logged in my jira'), but the first looks close enough to real evidence to be tempting.",
      whyItWorks:
        "It tests restraint against an explicit scope boundary, separate from and independent of the status-reasoning test — one distractor is an easy skip, the other requires actually noticing it doesn't map to any bug.",
    },
    {
      id: "two-ticket-systems",
      title: "Two ticket systems to reconcile",
      type: "mismatch",
      where: "Personal Jira notes (KAN-###) vs. company tracker email (NEXB-###)",
      description:
        "Only 3 of the 11 bugs already carry a company issue key, and they're referenced separately in the tracker email — two together (NEXB-442, NEXB-443) and Safari's (NEXB-398) apart from them, easy to miss. The other 8 need new keys generated by continuing the sequence from the latest registered one, not invented independently.",
      whyItWorks:
        "It adds a second, independent reasoning thread (numbering) that a model can get fully right even while the status-determination thread fails, and vice versa — and it has its own internal trap: folding an already-keyed bug into the generated range instead of finding its real key, which is exactly what happened to Safari in the initial run.",
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
      "Scored 24 / 87 (28%). The issue-key thread came out clean: the model searched the inbox, recovered all three pre-existing keys (NEXB-398, NEXB-442, NEXB-443), took NEXB-443 as the latest, and generated NEXB-444–451 for the eight bugs that genuinely lacked one. It also opened both distractor screenshots and correctly kept them out of scope, and it produced an SVG that follows every svg_format.txt rule. The status thread failed almost entirely. Rather than letting each RC screenshot decide, the model carried the Jira board's TO DO column straight through, so ten of the eleven determinations went uncredited — the six genuinely-resolved bugs are reported unsolved, and even the four that are correctly labeled unsolved are labeled that way by inheritance rather than from the HTTP 500 trace, the -$76.05 overshoot, the mobile clipping, or the Completed/DECLINED contradiction the criteria name. Only Safari, which the prompt context already flags as solved, is credited. That single root cause reached every deliverable: the SVG, MEMORY.md, the Slack post, and the email to Colton all report the same wrong 1-solved / 10-unsolved split.",
    layout: "compare",
    observations: [
      {
        id: "six-resolved-missed",
        title: "Six resolved bugs never re-checked against their RC screenshot",
        outcome: "fail",
        rubrics: [1, 3, 4, 5, 6, 8],
        expected: "Open each bug's RC screenshot and overturn the stale Jira status where the evidence contradicts it.",
        what: "The model kept the Jira board's TO DO status for Full refund renders complete, Incorrect tax (VAT 20%), Partial refund balance update, Refund reason mandatory, Confirmation screen, and Dup refund — all six are actually resolved in their RC screenshots, none of which were consulted before concluding.",
        evidence: "Trajectory: the model's own status mapping lists all six as unsolved; no RC screenshot analysis for these six overturns the board.",
      },
      {
        id: "svg-propagation",
        title: "SVG marks six resolved bugs as unresolved",
        outcome: "fail",
        rubrics: [12, 13, 14, 15, 16, 17],
        expected: "`Is resolved?` → `Yes` for all seven resolved bugs.",
        what: "refund_mod_QA_results.svg marks only Safari `Yes`; the other six resolved bugs all render `No`.",
        evidence: "Generated SVG (real output, below): 10 of 11 issue rows terminate in a red `No` outcome.",
      },
      {
        id: "memory-solved-incomplete",
        title: "MEMORY.md SOLVED section lists only one bug",
        outcome: "fail",
        rubrics: [24, 25],
        expected: "SOLVED section lists all seven resolved bugs, each carrying its correct issue key.",
        what: "MEMORY.md's SOLVED section carries a single bullet — Safari mobile login timeout — while the other six resolved bugs are filed under UNSOLVED, so the section never expresses the key mapping rubric 25 describes. The failure is inherited wholesale from the status determination; the keys themselves were reconciled correctly (rubrics 23 and 27).",
        evidence: "MEMORY.md (real output, below): SOLVED section contains a single bullet.",
      },
      {
        id: "slack-email-propagation",
        title: "Slack and email both restate the wrong split",
        outcome: "fail",
        rubrics: [28],
        expected: "Both messages report 7 solved / 4 unsolved.",
        what: "The Slack post to #qa-team and the email to Colton both state 1 issue resolved and 10 still open, correctly formatted but carrying the wrong underlying conclusion to the whole team and to Colton.",
        evidence: "Slack post: 'Solved: Safari mobile login timeout... Unsolved (10 remaining): ...'. Email body: '1 issue resolved so far... The remaining 10 are still open.'",
      },
      {
        id: "four-unresolved-ungrounded",
        title: "Four unresolved bugs labeled right, but not read from the evidence",
        outcome: "fail",
        rubrics: [2, 7, 9, 10],
        expected: "Partial refund timeout, No refund cap, Refund mobile view misrendered, and Fake refund success each read as still broken *from* their RC screenshot.",
        what: "All four end up labeled unresolved, which looks correct in the deliverables — but the label is inherited from the Jira board's TO DO column, not derived from the evidence. The HTTP 500 stack trace, the -$76.05 overshoot, the mobile clipping, and the Completed/DECLINED contradiction are never surfaced, so each criterion's stated grounds go unmet.",
        evidence: "Same root cause as the six missed resolutions: the RC screenshots are not consulted before the status mapping is fixed. The four right answers are a by-product of the board happening to agree.",
      },
      {
        id: "safari-correct",
        title: "Safari login correctly marked solved",
        outcome: "pass",
        rubrics: [11, 18],
        expected: "Login timeout mobile Safari reported and rendered as solved.",
        what: "The model correctly carried the one bug the prompt itself flags as already-solved through to both MEMORY.md and the SVG.",
        evidence: "Trajectory: the model's status mapping lists Safari as the one solved bug from the start; SVG and MEMORY.md both agree.",
      },
      {
        id: "distractors-ignored",
        title: "Distractor screenshots opened, then correctly left out of scope",
        outcome: "pass",
        rubrics: [32],
        expected: "Screenshot 2026-07-02 at 09.14.06.png and IMG_2093.png are not treated as bugs.",
        what: "The model opened both images (describing the Payouts & Settlements dashboard and Rebecca's personal calendar in full) but its final bug list stayed at exactly the 11 issues from the Jira board — neither distractor appears in any deliverable.",
        evidence: "Trajectory: an image-analysis call includes both distractor files, but the final status mapping and every deliverable list only the 11 Jira-sourced bugs.",
      },
      {
        id: "issue-keys-correct",
        title: "Issue-key reconciliation and sequential generation correct",
        outcome: "pass",
        rubrics: [19, 20, 21, 22, 23, 26, 27],
expected: "NEXB-398, NEXB-442 and NEXB-443 recovered from the tracker email; NEXB-444–451 generated sequentially for the eight bugs that genuinely lack a key.",
        what: "The model searched the inbox for the tracker notifications, recovered all three pre-existing keys, determined NEXB-443 as the latest registered one, and generated NEXB-444 through NEXB-451 for the eight remaining bugs. This thread is fully correct and independent of the status reasoning that failed.",
        evidence: "Trajectory: 'Matched from email notifications: KAN-3 → NEXB-442, KAN-4 → NEXB-443. Generated (continuing from NEXB-443): KAN-1 → NEXB-444, ...'.",
      },
      {
        id: "svg-format-correct",
        title: "SVG shape/label formatting followed",
        outcome: "pass",
        rubrics: [29, 30, 31],
        expected: "Rectangle start node, top-right note box with exact text, one diamond per issue labeled 'Is resolved?'.",
        what: "The generated SVG correctly implements all three fixed formatting requirements from svg_format.txt.",
        evidence: "Generated refund_mod_QA_results.svg (real output, below): <rect> start node, note box text matches exactly, 11 diamond decision nodes each labeled 'Is resolved?'.",
      },
    ],
    producedFiles: [
      {
        label: "The actual refund_mod_QA_results.svg from the seed run",
        file: "refund_mod_QA_results_actual.svg",
        kind: "image",
        note: "Shape, labels and palette all follow svg_format.txt — but 10 of 11 issues are wrongly marked 'No' (only Safari reads 'Yes').",
      },
      {
        label: "The actual MEMORY.md from the seed run",
        file: "MEMORY_actual.md",
        kind: "text",
        note: "SOLVED lists only Safari; UNSOLVED lists all 10 other bugs, six of which are actually resolved.",
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
SVG_NAME = "refund_mod_QA_results.svg"


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


def _find_svg():
    return _find_workspace_file(SVG_NAME)


def _find_memory_md():
    return _find_workspace_file("MEMORY.md")


def _find_snapshot():
    return _find_workspace_file("snapshots.json")


# --- tests go here ---`,

  artifactDocs: [
    { label: "Prompt", file: "prompt.md", description: "The final user-facing prompt." },
    { label: "GTFA", file: "GTFA.md", description: "The Ground Truth Final Answer: bug-by-bug status table, issue-key mapping, and required deliverable content." },
    { label: "Draft history", file: "draft_history.md", description: "Agent objective and desired outcome notes." },
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
      "Reconcile the two ticket systems: recover NEXB-442, NEXB-443, and Safari's separately-referenced NEXB-398 from the tracker email, then continue the generated sequence (NEXB-444–451) for the remaining eight bugs.",
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
      "6 tests, Σ weight = 14. Reviewer-only checks on state changes and artifact structure — only the elements the prompt and svg_format.txt pin down to exactly one acceptable value. Each test stands alone; shared scaffolding is in the Template dropdown.",
    unitTestGroups: ["SVG", "MEMORY.md", "State change"],
  },
};

export default task4;
