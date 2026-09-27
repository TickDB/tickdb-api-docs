---
title: TTM Financial Data
description: Retrieve trailing-12-month income statement or cash flow metrics aggregated from the latest four valid quarters.
openapi: "openapi.en.yaml GET /v1/fundamentals/financials/ttm"
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

- TTM means trailing 12 months and is aggregated from the latest four valid standalone quarters. Only the income statement (`IS`) and cash flow statement (`CF`) are supported.

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
| `kind` | Yes | Statement type: `IS` income statement or `CF` cash flow statement |

<Note>TTM is defined only for the income statement (`IS`) and cash flow statement (`CF`). Passing the balance sheet (`BS`) returns a parameter error.</Note>

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/ttm?symbol=AAPL&type=stock&kind=IS"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| kind | Statement type: `IS` income statement or `CF` cash flow statement. |
| rows | Trailing-12-month financial metric records. |
| └─ kind | Row statement type: `IS` or `CF`. |
| └─ field_name | Financial field code; see the [Financial Field Dictionary](./financial_fields_dictionary). |
| └─ field_display | Display name. |
| └─ indicator_title | Metric title. |
| └─ value | Aggregated trailing-12-month value returned as a string. |
| └─ currency | Currency. |
| └─ is_percent | Whether this is a percentage field. |
| └─ fiscal_year | Corresponding fiscal year. |
| └─ fiscal_period | Corresponding reporting period. |
| └─ period_type | `ttm`, indicating an aggregated trailing-12-month value. |
| └─ period_end | Period end date in `YYYY-MM-DD` format. |
| └─ yoy | Year-over-year change; may be `null`. |
| └─ ratio | Ratio; may be `null`. |

The response contains trailing-12-month metrics aggregated from the latest four valid standalone quarters.
