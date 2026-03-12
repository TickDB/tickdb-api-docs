---
title: Recent Trades
description: Retrieve recent trade executions for a trading symbol.
openapi: GET /v1/market/trades
---

## Notes
- This endpoint does not support US Stocks and A-shares (CN market)
- side: buy / sell
- timestamp in milliseconds (UTC)

## Supported Markets

**HK Stocks**, **Crypto**

Examples:
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
