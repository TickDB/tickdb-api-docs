---
title: Historical Valuation
description: Retrieve daily or monthly historical price-to-earnings (`PE`) values.
openapi: "openapi.en.yaml GET /v1/fundamentals/valuation/ts"
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

- Each element in `points` is `[time, metric value]`, not an object with named fields. The time is an RFC 3339 string with a time-zone offset.
- Without a date range, `daily` defaults to the past year and `monthly` to the past five years. If no records match, the endpoint returns HTTP 404 with code `40405`, not a successful empty array.

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
| `granularity` | No | `daily` or `monthly`; default `daily` |
| `from` | No | Start date in `YYYY-MM-DD` format |
| `to` | No | End date in `YYYY-MM-DD` format |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/valuation/ts?symbol=AAPL&type=stock&granularity=monthly"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| metric | Valuation metric; currently `PE` (price-to-earnings ratio). |
| granularity | Daily or monthly time granularity. |
| from | Query range start date in `YYYY-MM-DD` format. |
| to | Query range end date in `YYYY-MM-DD` format. |
| points | Historical valuation records, each represented as `[time, metric value]`. |
| └─ [0] | RFC 3339 date-time string with a time-zone offset. |
| └─ [1] | Metric value as a string, number, or `null`. |

Returns daily or monthly historical `PE` values over the queried date range.
