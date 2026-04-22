---
title: Recent Trades
description: Retrieve recent trade executions for a trading symbol.
openapi: GET /v1/market/trades
---

## Notes
- side: buy / sell
- timestamp in milliseconds (UTC)

## Supported Markets

**US Stocks**, **HK Stocks**, **Crypto**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- Crypto: BTCUSDT, ETHUSDT, ADAUSDT

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbol | Yes | Trading symbol code |
| limit | No | Number of trades, default 50, max 200 |

## Response Fields

| Field | Description |
|-------|-------------|
| id | Trade ID |
| price | Trade execution price |
| quantity | Trade volume |
| side | Trade direction (buy/sell) |
| timestamp | Trade execution time (milliseconds, UTC) |
