---
title: Shareholder Holding Details
description: Query the holdings and trading details of a shareholder by shareholder object ID.
openapi: "openapi.en.yaml GET /v1/fundamentals/shareholders/detail"
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

- `object_id` should come from a shareholder holdings record with `detail_available=true`; otherwise, the endpoint may return `404`.

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
| `object_id` | Yes | Object ID from a shareholder holdings record with `detail_available=true` |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/shareholders/detail?symbol=AAPL&type=stock&object_id=452583"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| symbol | Stock symbol. |
| object_id | Shareholder object ID. |
| name | Shareholder name. |
| title | Shareholder or institution title. |
| holding_summary | Holdings summary by reporting period. |
| └─ accum_buy | Cumulative number of shares purchased during the period. |
| └─ accum_sell | Cumulative number of shares sold during the period. |
| └─ percent_stock_price_changed | Stock-price percentage change during the period, including the percent sign. |
| └─ period | Reporting period. |
| └─ stock_price | Stock price associated with the reporting period. |
| holding_periods | Available holding reporting periods. |
| holding_details | Holding details by reporting period. |
| └─ filing_date | Original filing-date text, for example `2026/05/07`. |
| └─ name | Shareholder name. |
| └─ object_id | Shareholder object ID. |
| └─ percent_shares_changed | Change in ownership percentage, including the percent sign. |
| └─ percent_shares_held | Ownership percentage, including the percent sign. |
| └─ period | Reporting period. |
| └─ shares_changed | Change in shares. |
| └─ shares_held | Number of shares held. |
| trading_periods | Available trading-statistics periods. |
| tradings | Trading summary by period. |
| └─ accum_buy | Cumulative number of shares purchased during the period. |
| └─ accum_sell | Cumulative number of shares sold during the period. |
| └─ net_buy | Net number of shares purchased during the period. |
| └─ period | Trading-statistics period. |
| └─ trading_details | Trading detail list for the period. |

Returns the holdings summary, holding periods, holding details, trading periods, and trading summaries. A structured `404` may be returned when no details are available.
