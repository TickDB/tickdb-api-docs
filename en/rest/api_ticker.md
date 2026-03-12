---
title: Ticker Snapshot
description: Retrieve real-time market ticker data for one or more trading symbols.
openapi: GET /v1/market/ticker
---

## Notes
- Maximum 50 symbols per request
- Timestamp in milliseconds (UTC)

## Supported Markets

**Forex**, **Metals**, **Indices**, **US Stocks**, **HK Stocks**, **A-Shares**, **Crypto**

Examples:
- Forex: EURUSD, GBPUSD, USDJPY
- Metals: XAUUSD, XAGUSD
- Indices: SPX, NDX, DJI
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 000001.SH, 000001.SZ
- Crypto: BTCUSDT, ETHUSDT, ADAUSDT

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Trading symbol codes, comma-separated, max 50 |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| last_price | Last traded price |
| volume_24h | 24-hour trading volume |
| high_24h | 24-hour highest price |
| low_24h | 24-hour lowest price |
| price_change_24h | 24-hour price change |
| price_change_percent_24h | 24-hour price change percentage |
| timestamp | Data timestamp (milliseconds, UTC) |
