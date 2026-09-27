---
title: Dividend TTM
description: TTM means the latest 12 months through the as-of date; retrieve per-share cash dividends aggregated by currency over that period.
openapi: "openapi.en.yaml GET /v1/fundamentals/dividends/ttm"
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

- The window is based on ex-dividend dates: `ex_date > window_start_exclusive` and `ex_date <= as_of_date`. Different currencies are not combined.

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
| `as_of` | No | As-of date in `YYYY-MM-DD` format; defaults to the current date |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/dividends/ttm?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| as_of_date | TTM as-of date in `YYYY-MM-DD` format. |
| window_start_exclusive | Exclusive start of the latest-12-month window in `YYYY-MM-DD` format. |
| currencies | Cash dividends aggregated separately by currency. |
| └─ currency | Dividend currency. |
| └─ normal_cash_dps_ttm | TTM regular cash dividend per share. |
| └─ special_cash_dps_ttm | TTM special cash dividend per share. |
| └─ total_cash_dps_ttm | Total cash dividend per share; this is not dividend yield. |
| └─ normal_event_count | Number of regular cash dividend events. |
| └─ special_event_count | Number of special cash dividend events. |

Returns regular dividends, special dividends, total cash dividend per share, and event counts separately by currency for the latest 12 months through `as_of`.
