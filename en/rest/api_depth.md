---
title: Order Book
description: Retrieve real-time order book depth (bids & asks) for a trading symbol.
openapi: GET /v1/market/depth
---

## Notes
- bids sorted by price descending
- asks sorted by price ascending
- timestamp in milliseconds (UTC)

## Supported Markets

**US Stocks**, **HK Stocks**, **A-Shares**, **Crypto**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 600519.SH, 000001.SZ, 920186.BJ
- Crypto: BTCUSDT, ETHUSDT, ADAUSDT

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbol | Yes | Trading symbol code |
| limit | No | Depth levels, default 10, max 50 |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| timestamp | Data timestamp (milliseconds, UTC) |
| bids | Bid array, each element is [price, quantity] |
| asks | Ask array, each element is [price, quantity] |
