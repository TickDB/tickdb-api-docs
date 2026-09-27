---
title: Dividend Records
description: Retrieve historical and known future dividend events with date, type, and pagination filters.
openapi: "openapi.en.yaml GET /v1/fundamentals/dividends"
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

- `amount` is the per-share cash dividend as a decimal string and may be `null` for non-cash distributions. The pagination cursor is in the outer `page` object.

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
| `dividend_type` | No | `normal`, `special`, `non_cash`, or `unknown` |
| `from` | No | Start date in `YYYY-MM-DD` format |
| `to` | No | End date in `YYYY-MM-DD` format |
| `limit` | No | Page size; default 100, range `1–500` |
| `cursor` | No | Next-page cursor |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/dividends?symbol=AAPL&type=stock&limit=100"
```

## Response Fields

The table below lists fields in `data` and the pagination object; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| events | Dividend events matching the filters. |
| └─ event_id | Event ID. |
| └─ type | Dividend type. |
| └─ distribution_kind | Distribution form. |
| └─ amount | Per-share cash amount; may be `null` for non-cash distributions. |
| └─ stock_distribution_ratio | Bonus-share or capitalization ratio per share; for example, `0.7` means 0.7 additional shares per share, or 7 per 10 shares. |
| └─ currency | Currency. |
| └─ declaration_date | Declaration date in `YYYY-MM-DD` format; may be `null`. |
| └─ record_date | Record date in `YYYY-MM-DD` format; may be `null`. |
| └─ ex_date | Ex-dividend date in `YYYY-MM-DD` format; may be `null`. |
| └─ payment_date | Payment date in `YYYY-MM-DD` format; may be `null`. |
| └─ description | Event description. |
| └─ detail_level | Detail level. |
| page | Pagination information in the outer response. |
| └─ next_cursor | Cursor for the next page; empty on the last page. |
| └─ limit | Current page limit. |

Each record includes the dividend type, per-share amount, currency, and relevant dates. A future date does not mean the dividend has been completed.
