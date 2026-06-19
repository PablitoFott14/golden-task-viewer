# Asset Class Growth — $5,000 Initial Investment (2010s–2020s)

## Source Data (from screenshot)

| Asset Class | 2010s Avg Annual Return | 2020s Avg Annual Return |
|-------------|------------------------|------------------------|
| Stocks      | 13.4%                  | 14.9%                  |
| Gold        | 3.4%                   | 19.1%                  |
| Bonds       | 4.1%                   | −0.6%                  |
| Housing     | 3.8%                   | 7.5%                   |

---

## Methodology

**Two-phase compounding over 20 years:**
- Phase 1 (2010s): 10 years at the 2010s annual rate
- Phase 2 (2020s): 10 years at the 2020s annual rate, starting from Phase 1's ending balance

**Date range:** January 2010 – December 2029 (20 years)
- Phase 1: Jan 2010 – Dec 2019
- Phase 2: Jan 2020 – Dec 2029
- Note: the 2020s returns are based on data through approximately May 2026 (~6.5 years into the decade) and projected forward at the same annualized rate through December 2029.

**Formulas:**
- Lump sum (Table 1): `FV = PV × (1 + r_annual)^10`
- With contributions (Table 2): `FV = PV × g + PMT × (g − 1) / r_m`
  where `g = (1 + r_annual)^10` and `r_m = (1 + r_annual)^(1/12) − 1`
- Note: `(1 + r_m)^120 = (1 + r_annual)^10` exactly, so the lump sum portion is identical in both tables.
  The difference between tables is entirely in the annuity term: each $300 deposit compounds monthly, producing a higher final value than annual compounding would.

**Growth factors and monthly effective rates:**

| Asset      | Phase | r_annual | g = (1+r)^10 | r_m           |
|------------|-------|----------|--------------|---------------|
| Stocks     | P1    | 13.4%    | 3.516661     | 1.053437%     |
| Stocks     | P2    | 14.9%    | 4.010516     | 1.164158%     |
| Gold       | P1    | 3.4%     | 1.397029     | 0.279012%     |
| Gold       | P2    | 19.1%    | 5.742720     | 1.467271%     |
| Bonds      | P1    | 4.1%     | 1.494539     | 0.335409%     |
| Bonds      | P2    | −0.6%    | 0.941594     | −0.050138%    |
| Housing    | P1    | 3.8%     | 1.452023     | 0.311282%     |
| Housing    | P2    | 7.5%     | 2.061032     | 0.604492%     |

---

## Table 1 — Lump Sum Only (no monthly contribution)

| Asset Class | Risk Profile | End of 2010s  | End of 2020s (Final) |
|-------------|--------------|---------------|----------------------|
| Stocks      | High         | $17,583.31    | $70,518.14           |
| Gold        | High         | $6,985.14     | $40,113.73           |
| Bonds       | Low          | $7,472.70     | $7,036.25            |
| Housing     | Low–Medium   | $7,260.12     | $14,963.33           |

### Calculations — Table 1

**Stocks (13.4% → 14.9%)**
- Phase 1: $5,000 × 3.516661 = **$17,583.31**
- Phase 2: $17,583.31 × 4.010516 = **$70,518.14**

**Gold (3.4% → 19.1%)**
- Phase 1: $5,000 × 1.397029 = **$6,985.14**
- Phase 2: $6,985.14 × 5.742720 = **$40,113.73**

**Bonds (4.1% → −0.6%)**
- Phase 1: $5,000 × 1.494539 = **$7,472.70**
- Phase 2: $7,472.70 × 0.941594 = **$7,036.25**

**Housing (3.8% → 7.5%)**
- Phase 1: $5,000 × 1.452023 = **$7,260.12**
- Phase 2: $7,260.12 × 2.061032 = **$14,963.33**

---

## Table 2 — With $300/Month Contribution (monthly compounding)

| Asset Class | Risk Profile | End of 2010s  | End of 2020s (Final) |
|-------------|--------------|---------------|----------------------|
| Stocks      | High         | $89,253.34    | $435,532.09          |
| Gold        | High         | $49,674.64    | $382,237.75          |
| Bonds       | Low          | $51,705.71    | $83,632.72           |
| Housing     | Low–Medium   | $50,824.18    | $157,407.59          |

### Calculations — Table 2

**Stocks (13.4% → 14.9%)**
- Phase 1 (r_m = 1.053437%):
  - Lump sum: $5,000 × 3.516661 = $17,583.31
  - Contributions: $300 × (3.516661 − 1) / 0.01053437 = $300 × 238.900 = $71,670.03
  - Phase 1 ending balance: **$89,253.34**
- Phase 2 (r_m = 1.164158%):
  - Lump sum: $89,253.34 × 4.010516 = $357,951.96
  - Contributions: $300 × (4.010516 − 1) / 0.01164158 = $300 × 258.600 = $77,580.13
  - **Final: $435,532.09**

**Gold (3.4% → 19.1%)**
- Phase 1 (r_m = 0.279012%):
  - Lump sum: $5,000 × 1.397029 = $6,985.14
  - Contributions: $300 × (1.397029 − 1) / 0.00279012 = $300 × 142.298 = $42,689.50
  - Phase 1 ending balance: **$49,674.64**
- Phase 2 (r_m = 1.467271%):
  - Lump sum: $49,674.64 × 5.742720 = $285,267.53
  - Contributions: $300 × (5.742720 − 1) / 0.01467271 = $300 × 323.234 = $96,970.22
  - **Final: $382,237.75**

**Bonds (4.1% → −0.6%)**
- Phase 1 (r_m = 0.335409%):
  - Lump sum: $5,000 × 1.494539 = $7,472.70
  - Contributions: $300 × (1.494539 − 1) / 0.00335409 = $300 × 147.443 = $44,233.02
  - Phase 1 ending balance: **$51,705.71**
- Phase 2 (r_m = −0.050138%):
  - Lump sum: $51,705.71 × 0.941594 = $48,685.81
  - Contributions: $300 × (0.941594 − 1) / (−0.00050138) = $300 × 116.490 = $34,946.92
  - Note: negative ÷ negative = positive — contributions still accumulate; they just erode slightly each month
  - **Final: $83,632.72**

**Housing (3.8% → 7.5%)**
- Phase 1 (r_m = 0.311282%):
  - Lump sum: $5,000 × 1.452023 = $7,260.12
  - Contributions: $300 × (1.452023 − 1) / 0.00311282 = $300 × 145.214 = $43,564.06
  - Phase 1 ending balance: **$50,824.18**
- Phase 2 (r_m = 0.604492%):
  - Lump sum: $50,824.18 × 2.061032 = $104,750.23
  - Contributions: $300 × (2.061032 − 1) / 0.00604492 = $300 × 175.524 = $52,657.36
  - **Final: $157,407.59**

---

## Risk Profile Notes

- **Stocks — High:** Decade returns range from −1.0% (2000s) to 19.5% (1950s). High volatility with highest long-term upside. Requires tolerance for sharp drawdowns.
- **Gold — High:** Decade returns range from −3.1% (1990s) to 28.6% (1970s). No income generation; performs as inflation and crisis hedge but is highly unpredictable decade-to-decade.
- **Bonds — Low:** Most stable across decades. Negative real return in the 2020s reflects the high-inflation environment. Capital preservation focus; limited growth potential.
- **Housing — Low–Medium:** Returns range from −1.2% (1930s) to 8.7% (1970s). Moderate and relatively steady; inflation hedge. Illiquid compared to financial assets.
