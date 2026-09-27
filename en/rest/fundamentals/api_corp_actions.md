---
title: Corporate Actions
description: Retrieve stock splits, reverse splits, rights issues, symbol changes, and other corporate-action events.
openapi: "openapi.en.yaml GET /v1/fundamentals/corp-actions"
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

- Corporate actions may span multiple historical dates. `is_recent` marks a recent event and does not mean it occurred on the query date.

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
| `from` | No | Start date in `YYYY-MM-DD` format |
| `to` | No | End date in `YYYY-MM-DD` format |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/corp-actions?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| events | Corporate-action events. |
| └─ event_id | Event ID. |
| └─ action_code | Action code. |
| └─ act_type | Action type. |
| └─ act_desc | Action description. |
| └─ event_date | Event date in `YYYY-MM-DD` format. |
| └─ date_type | Date type. |
| └─ date_zone | Time zone. |
| └─ is_recent | Whether this is a recent event. |

Returns event dates, event types, action codes, and descriptions for corporate actions.
