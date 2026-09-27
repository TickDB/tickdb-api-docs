---
title: Revenue Breakdown
description: Show the latest revenue amounts and percentages by business or region.
openapi: "openapi.en.yaml GET /v1/fundamentals/segments/latest"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ❌ |
| Starter | ❌ |
| Professional | ✅ |
| Full-Market Plans (A-Shares, HK Stocks, US Stocks) | ✅ |
| Enterprise | ✅ |

## Notes

- Use `category=business` for revenue by business and `category=regional` for revenue by region. The number of segments varies by company.

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
| `category` | No | Breakdown dimension: `business` for business segments or `regional` for geographic segments. Omit to return all available dimensions. |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/segments/latest?symbol=AAPL&type=stock&category=business"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| segments | Latest revenue breakdown. |
| └─ segment_name | Business segment or region name. |
| └─ category | Breakdown dimension: `business` by business or `regional` by region. |
| └─ value | Revenue amount for the business segment or region. |
| └─ total_revenue | Total revenue for the reporting period. |
| └─ percent | Percentage of total period revenue, for example `79.74` means 79.74%. |
| └─ currency | Amount currency. |
| └─ report | Reporting period: `qf` quarterly, `saf` semiannual, or `af` annual. |
| └─ period_start | Period start date in `YYYY-MM-DD` format. |
| └─ period_end | Period end date in `YYYY-MM-DD` format. |

Each row represents a business segment or region. `value` is its revenue and `total_revenue` is total revenue for the same reporting period.
