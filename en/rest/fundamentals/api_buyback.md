---
title: Share Buybacks
description: Retrieve company buyback programs, execution information, and historical metrics.
openapi: "openapi.en.yaml GET /v1/fundamentals/buyback"
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

- Estimated buyback metrics may be `null`.

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
  "https://api.tickdb.ai/v1/fundamentals/buyback?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| currency | Buyback amount currency. |
| ttm | Buyback metrics for the latest 12 months. |
| └─ net_buyback | Net buyback amount. |
| └─ net_buyback_yield | Net buyback yield; may be `null`. |
| └─ buyback_payout_ratio | Buyback payout ratio; may be `null`. |
| └─ buyback_to_cashflow_ratio | Buyback-to-cash-flow ratio; may be `null`. |
| history | Historical annual buyback records. |
| └─ fiscal_year | Fiscal year. |
| └─ fiscal_year_range | Fiscal-year date range text, for example `2024/01/01 - 2024/12/31`. |
| └─ currency | Currency for the year. |
| └─ net_buyback | Net buyback amount. |
| └─ net_buyback_yield | Net buyback yield; may be `null`. |
| └─ net_buyback_growth_rate | Net buyback growth rate; may be `null`. |

Returns TTM buyback metrics and historical annual records.
