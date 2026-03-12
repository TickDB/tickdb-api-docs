---
title: Historical K-Line
description: Get historical K-line data for completed time periods.
openapi: GET /v1/market/kline
---

## Notes
- This endpoint returns historical K-line data for completed periods, data is fixed and will not change
- Suitable for strategy backtesting, technical indicator calculation, and data archiving
- For real-time K-line data in the current period, use Real-time K-Line: `/v1/market/kline/latest`

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
| symbol | Yes | Trading symbol code |
| interval | Yes | K-line period, options: 1m, 5m, 15m, 30m, 1h, 4h, 12h, 1d, 1w, 1M |
| limit | No | Number of records, default 100, max 1000 |
| start_time | No | Start timestamp (milliseconds) |
| end_time | No | End timestamp (milliseconds) |

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
