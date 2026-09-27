---
title: Tick-by-Tick Trades
description: Retrieve tick-by-tick trade executions for a trading symbol.
openapi: "openapi.en.yaml GET /v1/market/trades"
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
- side: buy / sell
- timestamp in milliseconds (UTC)

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | AAPL.US, TSLA.US, MSFT.US |
| HK Stocks | 700.HK, 9988.HK, 3690.HK |
| A-Shares | 600519.SH, 000001.SZ, 920186.BJ |
| China Futures | BU2609, IC2606, AP8888 |
| Hong Kong Futures | HSI8888, MHI8888, HTI8888 |
| Crypto | BTCUSDT, ETHUSDT, ADAUSDT |

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbol | Yes | Trading symbol code |
| limit | No | Number of trades, default 100, max 1000 |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading symbol |
| type | Product type |
| trades | Trade record array |
| └─ id | Trade ID |
| └─ price | Trade execution price |
| └─ quantity | Trade volume |
| └─ side | Trade direction (`buy`, `sell`, or `neutral`) |
| └─ timestamp | Trade execution time (milliseconds, UTC) |
| └─&nbsp;open_interest_change | Change in open interest; futures only |
| └─&nbsp;position_effect | Position effect; futures only; see values below |

### `position_effect` Values

| Category | Values |
|----------|--------|
| Open | `long_open`<br />`short_open`<br />`both_open` |
| Close | `long_close`<br />`short_close`<br />`both_close` |
| Transfer | `long_transfer`<br />`short_transfer` |
