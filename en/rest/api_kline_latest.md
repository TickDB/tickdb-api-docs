---
title: Real-time K-Line
description: Get real-time K-line data for the current time period that is being formed and updated.
openapi: GET /v1/market/kline/latest
---

## Notes
- This endpoint returns K-line data for the current period being formed, data updates continuously with trades
- Suitable for real-time chart display, current price monitoring, and intraday dynamic updates
- Not recommended for historical backtesting, technical indicator statistics, or fixed data storage
- For completed period data, use Historical K-Line: `/v1/market/kline`

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
| symbols | Yes | Trading symbol codes, comma-separated, e.g., AAPL.US,00700.HK |
| interval | Yes | K-line period, options: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| interval | K-line period |
| klines | K-line data array |
| └─ time | K-line timestamp (milliseconds) |
| └─ open | Opening price |
| └─ high | Highest price |
| └─ low | Lowest price |
| └─ close | Closing price |
| └─ volume | Trading volume |
| └─ quote_volume | Trading amount |
