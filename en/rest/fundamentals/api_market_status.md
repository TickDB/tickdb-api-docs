---
title: Market Status
description: Query the current trading phase and market time for each market.
openapi: "openapi.en.yaml GET /v1/fundamentals/market/status"
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

- This is a global endpoint and does not accept `market` or `symbol`; status changes with the trading session.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | US |
| HK Stocks | HK |
| A-Shares | CN |

## Request Parameters

This endpoint does not require query parameters.

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/market/status"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| markets | Trading status list for each market. |
| └─ market | Market code. |
| └─ market_time | Current market time as an RFC 3339 date-time string with a time-zone offset. |
| └─ trade_status | Trading-status code. |

Returns market time and trading status for `CN`, `HK`, and `US`.

### `trade_status` Codes

Each market returns only the statuses that apply to it. Common and special trading-phase codes are listed below:

| Market | Code | Meaning |
|--------|-----:|---------|
| CN, HK | `101` | Pre-open clearing |
| CN, HK | `102` | Opening auction |
| CN, HK | `105` | Regular trading |
| CN, HK | `106` | Midday break |
| CN, HK | `107` | Closing auction |
| CN, HK | `108` | Market closed |
| CN | `120` | After-hours fixed-price trading |
| CN, HK | `121` | Half-day market closed |
| CN, HK | `122` | Not yet opened under special conditions |
| CN, HK | `123` | Temporary intraday break |
| US | `201` | Pre-market trading |
| US | `202` | Regular trading |
| US | `203` | Post-market trading |
| US | `204` | Market closed |
| US | `205` | Trading halted |
| US | `206` | Pre-open clearing and pre-market session |
| US | `207` | Overnight trading |
| US | `209` | Pre-market clearing |
| US | `210` | Post-market clearing |
