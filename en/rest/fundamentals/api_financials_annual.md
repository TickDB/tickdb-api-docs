---
title: Annual Financial Statements
description: Retrieve annual income statement, balance sheet, or cash flow statement metrics for recent fiscal years.
openapi: "openapi.en.yaml GET /v1/fundamentals/financials/annual"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ❌ |
| Starter | ✅ |
| Professional | ✅ |
| Full-Market Plans (A-Shares, HK Stocks, US Stocks) | ✅ |
| Enterprise | ✅ |

## Notes

- `rows` contains field-level records; one fiscal year may correspond to multiple financial metrics.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | AAPL.US |
| HK Stocks | 700.HK |
| A-Shares | 600519.SH |

## Request Parameters

| Parameter | Required | Description |
|---|:---:|---|
| `symbol` | Yes | Stock symbol |
| `type` | No | Product type; currently supports `stock` |
| `kind` | Yes | Statement type: `IS` income statement, `BS` balance sheet, or `CF` cash flow statement |
| `n` | No | Number of fiscal years, range `1–20` |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/annual?symbol=AAPL&type=stock&kind=IS&n=5"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| kind | Statement type: `IS` income statement, `BS` balance sheet, or `CF` cash flow statement. |
| rows | Annual statement metric records; a fiscal year normally contains multiple rows. |
| └─ kind | Row statement type: `IS`, `BS`, or `CF`. |
| └─ field_name | Financial field code; see the [Financial Field Dictionary](./financial_fields_dictionary). |
| └─ field_display | Display name. |
| └─ indicator_title | Metric title. |
| └─ value | Field value returned as a string. |
| └─ currency | Currency. |
| └─ is_percent | Whether this is a percentage field. |
| └─ fiscal_year | Fiscal year. |
| └─ fiscal_period | Reporting period. |
| └─ period_type | Financial period type; annual data is normally `af` (annual), but a fiscal year-end period may also be represented as `q4` (fourth quarter). |
| └─ period_end | Period end date in `YYYY-MM-DD` format. |
| └─ yoy | Year-over-year change; may be `null`. |
| └─ ratio | Ratio; may be `null`. |

The endpoint returns annual metrics by statement type for year-over-year comparison. `n` controls the number of fiscal years.
