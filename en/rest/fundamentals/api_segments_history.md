---
title: Historical Revenue Breakdown
description: Show historical revenue amounts and percentages by business or region.
openapi: "openapi.en.yaml GET /v1/fundamentals/segments/history"
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

- Available historical reporting periods vary by company. A structured `404` may be returned when no records match.

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
| `report` | No | Reporting period: `qf` quarterly, `saf` semiannual, or `af` annual |
| `limit` | No | Number of records; default 200, range `1–1000` |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/segments/history?symbol=AAPL&type=stock&category=business&limit=200"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| report | Requested reporting period: `qf` quarterly, `saf` semiannual, or `af` annual; may be `null` when not specified. |
| segments | Revenue breakdowns for historical reporting periods. |
| └─ segment_name | Business segment or region name. |
| └─ category | Breakdown dimension: `business` by business or `regional` by region. |
| └─ value | Revenue amount for the business segment or region. |
| └─ total_revenue | Total revenue for the reporting period. |
| └─ percent | Percentage of total period revenue, for example `79.74` means 79.74%. |
| └─ currency | Amount currency. |
| └─ report | Row reporting period: `qf` quarterly, `saf` semiannual, or `af` annual. |
| └─ period_start | Period start date in `YYYY-MM-DD` format. |
| └─ period_end | Period end date in `YYYY-MM-DD` format. |

Each row represents a business segment or region in one reporting period. A structured `404` may be returned when no data matches the filters.
