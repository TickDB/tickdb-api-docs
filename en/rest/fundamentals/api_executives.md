---
title: Executives and Directors
description: Retrieve the company's current executives, directors, and key personnel.
openapi: "openapi.en.yaml GET /v1/fundamentals/executives"
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

- A person's biography may be empty.

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

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/executives?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| total | Total number of people. |
| members | Executives, directors, and key personnel. |
| └─ name | Name. |
| └─ title | Position or title. |
| └─ biography | Biography. |

The response lists current executives, directors, or key personnel and can be used for management and corporate-governance research.
