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

**US Stocks**, **HK Stocks**, **A-Shares**, **China Futures**, **Crypto**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 600519.SH, 000001.SZ, 920186.BJ
- China Futures: BU2609, IC2606, AP8888
- Crypto: BTCUSDT, ETHUSDT, ADAUSDT

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbol | Yes | Trading symbol code |
| limit | No | Depth levels, default 10, max 50 |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| type | Product type |
| timestamp | Data timestamp (milliseconds, UTC) |
| bids | Bid array, each element is [price, quantity] |
| asks | Ask array, each element is [price, quantity] |
