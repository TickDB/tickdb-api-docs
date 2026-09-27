---
title: Industry Hierarchy
description: Retrieve an industry's top-level classification and lower-level industry categories.
openapi: "openapi.en.yaml GET /v1/fundamentals/industries/tree"
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

- Obtain `industry_counter_id` from Industry Metric Rankings. Industry nodes from different markets cannot be mixed.
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
| `industry_counter_id` | Yes | Industry node ID returned by Industry Metric Rankings |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/industries/tree?market=US&industry_counter_id=BK%2FUS%2FIN00260"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| market | Queried market. |
| industry_counter_id | Industry node ID. |
| top | Top-level industry classification. |
| └─ name | Top-level industry name. |
| └─ market | Top-level industry market. |
| chain | Hierarchy containing the current industry and its children. |
| └─ name | Node name. |
| └─ counter_id | Industry node ID. |
| └─ level | Node level. |
| └─ parent_code | Parent node code. |
| └─ market | Market. |
| └─ stock_num | Number of stocks. |
| └─ chg | Change value. |
| └─ ytd_chg | Year-to-date change. |
| └─ symbol | Associated node symbol. |
| └─ sharelist_id | Stock-list ID. |
| └─ next | Child industry categories; each element recursively uses the same node structure. |

Returns the industry's top-level parent, current classification, and child classifications for exploring industry relationships.
