---
title: Industry Metric Rankings
description: Retrieve industries ranked by a market-wide industry metric.
openapi: "openapi.en.yaml GET /v1/fundamentals/industries/rank"
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

- This endpoint queries by `market`, not by stock symbol. The returned `industry_counter_id` can be used with the industry hierarchy endpoint.
- `market` is case-insensitive. This documentation uses uppercase market codes consistently.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | US |
| HK Stocks | HK |
| A-Shares | CN |

## Request Parameters

| Parameter | Required | Description |
|---|:---:|---|
| `market` | Yes | Market code: `US` US stocks, `HK` Hong Kong stocks, or `CN` A-shares |
| `limit` | No | Number of records; default 50, range `1–200` |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/industries/rank?market=US&limit=50"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| market | Queried market. |
| indicator | Ranking metric. |
| sort_type | Sort order. |
| items | Ranked industry metrics. |
| └─ industry_counter_id | Industry node ID. |
| └─ industry_name | Industry name. |
| └─ rank | Rank. |
| └─ value | Total industry market capitalization. |
| └─ change_percent | Percentage change. |

Returns industry IDs, names, ranks, total market capitalizations, and percentage changes. Use an industry ID to query the industry hierarchy.
