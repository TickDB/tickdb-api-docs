---
title: Stock News
description: Retrieve a stock's news list, publication times, and body-availability status.
openapi: "openapi.en.yaml GET /v1/fundamentals/news"
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

- The news list does not include article bodies; use `news_id` to query details. `from` and `to` must either both be provided or both be omitted.

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
| `limit` | No | Maximum number of records to return; default `50`, range `1–200` |
| `from` | No | Start date in `YYYY-MM-DD` format |
| `to` | No | End date in `YYYY-MM-DD` format |

<Note>`from` and `to` must either both be provided or both be omitted.</Note>

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/news?symbol=AAPL&type=stock&limit=20"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| symbol | Stock symbol. |
| limit | Maximum number of records for this request. |
| news | News list. |
| └─ news_id | News ID, which can be used to query details. |
| └─ title | News title. |
| └─ description | News summary. |
| └─ published_at | Publication time as an RFC 3339 date-time string in UTC. |
| └─ has_body | Whether an article body is available. |

The news list returns `news_id`, title, summary, publication time, and body-availability status without embedding the article body. Use `news_id` to query news details.
