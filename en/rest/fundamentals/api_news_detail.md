---
title: News Details
description: Query an article body or available excerpt by news ID.
openapi: "openapi.en.yaml GET /v1/fundamentals/news/{news_id}"
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

- Query this endpoint with a `news_id` from the news list. When `detail_status` is `pending`, `blocked`, or `failed`, `body_text` and `body_html` may be `null`. Sanitize `body_html` before displaying it.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | US |
| HK Stocks | HK |
| A-Shares | CN |

## Request Parameters

| Parameter | Location | Required | Description |
|---|---|:---:|---|
| `news_id` | path | Yes | Opaque article ID returned by the news list; pass it as a string |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/news/6288041"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| news_id | News ID. |
| title | News title. |
| description | News summary. |
| published_at | Publication time as an RFC 3339 date-time string in UTC. |
| detail_status | Article-detail retrieval status. |
| content_scope | Available content scope; `excerpt` means an excerpt. |
| body_text | Plain-text body; may be `null` when unavailable. |
| body_html | HTML body; may be `null` when unavailable. |

Returns the title, summary, publication time, body status, content scope, plain-text body, and HTML body.

`content_scope=excerpt` means a summary or excerpt rather than the complete article. `body_html` is external content and should be sanitized before display.
