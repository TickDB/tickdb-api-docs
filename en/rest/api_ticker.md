---
title: Ticker Snapshot
description: Retrieve real-time market ticker data for one or more trading symbols.
openapi: GET /v1/market/ticker
---

## Notes
- Maximum 50 symbols per request
- Timestamp in milliseconds (UTC)

## Supported Markets

**Forex**, **Metals**, **Indices**, **US Stocks**, **HK Stocks**, **A-Shares**, **China Futures**, **Crypto**

Examples:
- Forex: EURUSD, GBPUSD, USDJPY
- Metals: XAUUSD, XAGUSD
- Indices: SPX, NDX, DJI
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 600519.SH, 000001.SZ, 920186.BJ
- China Futures: BU2609, IC2606, AP8888
- Crypto: BTCUSDT, ETHUSDT, ADAUSDT

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Trading symbol codes, comma-separated, max 50 |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| name | Product name, when available |
| type | Product type |
| last_price | Last traded price |
| bid_price | Best bid price, when available |
| ask_price | Best ask price, when available |
| volume_24h | 24-hour trading volume |
| high_24h | 24-hour highest price |
| low_24h | 24-hour lowest price |
| price_change_24h | 24-hour price change |
| price_change_percent_24h | 24-hour price change percentage |
| timestamp | Data timestamp (milliseconds, UTC) |
