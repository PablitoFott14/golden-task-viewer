### 1. Bug-by-bug ground truth

Rebecca's personal Jira notes (`Screenshot 2026-07-03 000152.png`) log 11 bugs, all still sitting in a `TO DO` column — that board is written from memory and known to be stale. The real status of each bug can only be determined by cross-referencing it against the matching RC (release-candidate) screenshot from the shared team folder.

| # | Jira name | RC evidence | Status | Reasoning |
|---|---|---|---|---|
| 1 | Full refund renders complete | `rc-refund-build-01.png` | **Resolved** | `Order total` and `Total refund` show the same amount. |
| 2 | Partial refund timeout | `RC_refund_0712_06.png` | **Unresolved** | Raw `HTTP 500 — Internal Server Error`, Java stack trace, gateway timeout at 30000ms. |
| 3 | Incorrect tax — international funds (VAT 20%) | `rc-refund-build-03.png` | **Resolved** | `€142.90` subtotal correctly refunds `€28.58` (20% VAT). |
| 4 | Partial refund balance update | `RC_refund_0712_02.png` | **Resolved** | Remaining balance correctly recalculated as `$54.25` (`$87.40 − $33.15`). |
| 5 | Refund reason mandatory to proceed | `RC_refund_0712_04.png` | **Resolved** | `Process Refund` is correctly disabled while the reason field is empty. |
| 6 | Confirmation screen (matching destination card number) | `Screenshot 2026-07-03 at 15.58.21.png` | **Resolved** | `$92.86`, card ending `6341`, and status `Completed` all match. |
| 7 | No refund cap | `rc-refund-build-07.png` | **Unresolved** | `$163.45` refunded against a `$92.86` order, producing `-$76.05`. |
| 8 | Dup refund | `IMG_4471.png` | **Resolved** | Transaction already fully refunded (`RFND-20260702-7731`); `Process Refund` correctly disabled. |
| 9 | Refund mobile view misrendered | `RC_refund_0712_09.png` | **Unresolved** | Mobile viewport: top bar overflows, two-column fields clip. |
| 10 | Fake refund success | `RC_refund_0712_10.png` | **Unresolved** | UI reads `Completed` while the gateway reads `DECLINED` / settlement `Failed` — no funds moved. |
| 11 | Login timeout mobile Safari | `rc-refund-build-11.png` | **Resolved** | `Signed in` / `Secure session established` on Safari (iOS); also the one bug the prompt itself says is already solved. |

**Totals: 7 resolved, 4 unresolved.** Two extra images in the input folder — `Screenshot 2026-07-02 at 09.14.06.png` and `IMG_2093.png` — do not correspond to any bug in the personal Jira notes and must be ignored ("Do not address bugs not logged in my jira").

### 2. Issue keys

From the team tracker email notification, only two bugs already carry an official key:
- `NEXB-442` → Partial refund timeout
- `NEXB-443` → Incorrect tax — international funds (VAT 20%)

`NEXB-443` is the latest registered key, so every other bug (9 remaining, including Safari) gets a newly generated key continuing the sequence: `NEXB-444` through `NEXB-452`.

| Jira name | Issue key |
|---|---|
| Partial refund timeout | `NEXB-442` (existing) |
| Incorrect tax — international (VAT 20%) | `NEXB-443` (existing) |
| Full refund renders complete | `NEXB-444` |
| Partial refund balance update | `NEXB-445` |
| Refund reason mandatory to proceed | `NEXB-446` |
| Confirmation screen (matching destination card number) | `NEXB-447` |
| No refund cap | `NEXB-448` |
| Dup refund | `NEXB-449` |
| Refund mobile view misrendered | `NEXB-450` |
| Fake refund success | `NEXB-451` |
| Safari mobile login timeout | `NEXB-452` |

### 3. `refund_mod_QA_results.svg`

Following `svg_format.txt`:
- One rectangle start node, labeled `Refund Module - Nexbridge`.
- One issue rectangle per bug (11 total), each unsolved one labeled with its issue key, in `#ff4733`.
- One diamond decision node per issue, each labeled exactly `Is resolved?`.
- One arrow from each diamond's rightmost vertex to a `Yes` (`#158a52`) or `No` (`#c23b3b`) terminal label — `Yes` for the 7 resolved bugs, `No` for the 4 unresolved ones.
- One rectangular note box, top-right corner, labeled exactly `Some issue tickets may not have been created yet, but they will be created in the next few minutes`.
- Only the six palette colors from `svg_format.txt` are used anywhere in the file.

`svg_format.txt` does not itself say the start node must be centered — nothing in the spec calls out its position. Rubric 32 still penalizes an off-center start node as a negative, because in the actual run it produced a genuine, visually obvious layout defect (the node pinned hard against the left edge of a wide canvas). It is a judgment call scoped to this run's concrete failure, not a restated formatting requirement — a model that centers the node isn't following an instruction it was given, and one that doesn't isn't violating one either, in the abstract. See the Rubrics section for the full framing.

### 4. `MEMORY.md`

```
## SOLVED
- Full refund renders complete [NEXB-444]
- Incorrect tax - international (VAT 20%) [NEXB-443]
- Partial refund balance update [NEXB-445]
- Refund reason mandatory to proceed [NEXB-446]
- Confirmation screen (matching destination card number) [NEXB-447]
- Dup refund [NEXB-449]
- Safari mobile login timeout - Kai tackled [NEXB-452]

## UNSOLVED
- Partial refund timeout [NEXB-442]
- No refund cap [NEXB-448]
- Refund mobile view misrendered [NEXB-450]
- Fake refund success [NEXB-451]
```

### 5. Slack message (`#qa-team`)

States the same 7 solved / 4 unsolved split, by Jira name only (no issue keys), and asks Kai and Amara to help follow up on the 4 unresolved ones.

### 6. Email to Colton

To `colton.park@nexbridge.io`, subject exactly `current refund module QA status`, with `refund_mod_QA_results.svg` attached.
