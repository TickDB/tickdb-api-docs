---
title: Order Book
description: Retrieve real-time order book depth (bids & asks) for a trading symbol.
openapi: "openapi.en.yaml GET /v1/market/depth"
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
- bids sorted by price descending
- asks sorted by price ascending
- The number of returned levels is determined by the depth supported by each market
- timestamp in milliseconds (UTC)

## Supported Markets

| Market | Examples | Levels per side |
|--------|----------|-----------------|
| US Stocks | AAPL.US, TSLA.US, MSFT.US | 1 |
| HK Stocks | 700.HK, 9988.HK, 3690.HK | 10 |
| A-Shares | 600519.SH, 000001.SZ, 920186.BJ | 5 |
| China Futures | BU2609, RB8888, AP8888 | 1 |
| Hong Kong Futures | HSI8888, MHI8888, HTI8888 | 10 |
| Crypto | BTCUSDT, ETHUSDT, ADAUSDT, OKBUSDT | Up to 1,000 |

The table shows the maximum supported levels per side. Supported depth varies by product, and the actual number may be lower when the market is closed, liquidity is limited, or some levels have no quotes.

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbol | Yes | Trading symbol code |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| type | Product type |
| timestamp | Data timestamp (milliseconds, UTC) |
| bids | Bid array, each element is [price, quantity] |
| asks | Ask array, each element is [price, quantity] |
