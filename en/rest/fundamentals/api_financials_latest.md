---
title: Recent Financial Statements
description: Retrieve metrics from the income statement, balance sheet, or cash flow statement for the most recent periods.
openapi: "openapi.en.yaml GET /v1/fundamentals/financials/latest"
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

- `rows` contains field-level records. One reporting period normally corresponds to multiple rows; `n` is the number of periods, not the number of rows.

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
| `n` | No | Number of periods, range `1–20` |
| `period_type` | No | Financial period type: `q1` first quarter, `q2` second quarter, `q3` third quarter, `q4` fourth quarter, `saf` semiannual, or `af` annual; separate multiple values with commas |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/latest?symbol=AAPL&type=stock&kind=IS&n=4"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| kind | Statement type: `IS` income statement, `BS` balance sheet, or `CF` cash flow statement. |
| rows | Statement metrics for the most recent periods; a period normally contains multiple rows. |
| └─ kind | Row statement type: `IS`, `BS`, or `CF`. |
| └─ field_name | Financial field code; see the [Financial Field Dictionary](./financial_fields_dictionary). |
| └─ field_display | Display name. |
| └─ indicator_title | Metric title. |
| └─ value | Field value returned as a string. |
| └─ currency | Currency. |
| └─ is_percent | Whether this is a percentage field. |
| └─ fiscal_year | Fiscal year. |
| └─ fiscal_period | Reporting period. |
| └─ period_type | `q1` first quarter, `q2` second quarter, `q3` third quarter, `q4` fourth quarter, `saf` semiannual, or `af` annual. |
| └─ period_end | Period end date in `YYYY-MM-DD` format. |
| └─ yoy | Year-over-year change; may be `null`. |
| └─ ratio | Ratio; may be `null`. |

The endpoint returns metrics for recent reporting periods by statement type. `n` controls the number of periods, not the number of metric rows.
