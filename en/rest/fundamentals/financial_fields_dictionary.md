---
title: Financial Field Dictionary
description: Financial statement field codes, metric names, and value conventions.
---

Use this dictionary to match `rows[].field_name` codes returned by:

- [Recent Financial Statements](./api_financials_latest): recent income statement, balance sheet, or cash flow statement metrics.
- [Annual Financial Statements](./api_financials_annual): annual income statement, balance sheet, or cash flow statement metrics.
- [TTM Financial Data](./api_financials_ttm): trailing-12-month income statement or cash flow metrics; only fields that can be aggregated from the latest four valid standalone quarters are returned.

## Matching Fields

| Response Field | Description |
|---|---|
| `field_name` | Financial field code used to match a metric in the tables below. |
| `indicator_title` | Metric title. |
| `field_display` | Display name, which may include a unit. |
| `value` | Metric value returned as a string. |
| `currency` | Currency for monetary or per-share amounts. |
| `is_percent` | Whether the field is a percentage. |
| `yoy` | Year-over-year change; may be `null`. |
| `ratio` | Ratio; may be `null`. |

- Use each row's `currency` for monetary and per-share amounts.
- Percentage fields have `is_percent=true`; other ratios or multiples are not necessarily expressed as percentages.
- Field presence and value availability depend on the company, market, and reporting period. Missing values are not replaced with `0`.
- “TTM applicable” means the field can appear in a TTM response; actual availability depends on whether aggregatable data exists.

## Income Statement (`IS`)

| Field Code | Metric | Value Convention | TTM Applicable |
|---|---|---|:---:|
| `EPS` | Earnings per share | Per-share amount | Yes |
| `GrossMgn` | Gross margin | Percentage | No |
| `NetProfit` | Net profit | Monetary amount | Yes |
| `NetProfitMargin` | Net profit margin | Percentage | No |
| `NetProfitMarginDf` | Net profit margin | Percentage | No |
| `OperatingIncome` | Operating income | Monetary amount | Yes |
| `OperatingRevenue` | Operating revenue | Monetary amount | Yes |
| `ProfitQuality` | Profit quality | Percentage | No |
| `ROE` | ROE | Percentage | No |
| `ROEDf` | ROE | Percentage | No |

## Balance Sheet (`BS`)

The balance sheet is point-in-time data for a specific date and is not applicable to TTM aggregation.

| Field Code | Metric | Value Convention |
|---|---|---|
| `AssetTurn` | Asset turnover | Multiple |
| `AssetTurnDf` | Asset turnover | Multiple |
| `BPS` | Book value per share | Per-share amount |
| `CashSTInvest` | Cash and short-term investments | Monetary amount |
| `Inventory` | Inventory and receivables | Monetary amount |
| `LTInvest` | Long-term investments | Monetary amount |
| `Leverage` | Equity multiplier | Multiple |
| `NPPE` | Long-term investments | Monetary amount |
| `NetDebt` | Net debt | Monetary amount |
| `TotalAssets` | Assets and liabilities | Monetary amount |
| `TotalLiability` | Assets and liabilities | Monetary amount |
| `TotalReceiv` | Inventory and receivables | Monetary amount |

## Cash Flow Statement (`CF`)

| Field Code | Metric | Value Convention | TTM Applicable |
|---|---|---|:---:|
| `CapEx` | Capital expenditure | Monetary amount | Yes |
| `NetFinanceCashFlow` | Financing cash flow | Monetary amount | Yes |
| `NetFreeCashFlow` | Free cash flow | Monetary amount | Yes |
| `NetInvestCashFlow` | Investing cash flow | Monetary amount | Yes |
| `NetOperateCashFlow` | Operating cash flow | Monetary amount | Yes |
| `OCFCoverage` | Operating cash flow coverage | Percentage | No |
| `TotalDebtIssued` | Debt issued and repaid | Monetary amount | No |
| `TotalDebtRepaid` | Debt issued and repaid | Monetary amount | Yes |
