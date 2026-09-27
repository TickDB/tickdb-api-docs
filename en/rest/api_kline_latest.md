---
title: Latest Candlesticks
description: Get the latest candlestick data (OHLC bars) for multiple symbols; the current bar may still be forming.
openapi: "openapi.en.yaml GET /v1/market/kline/latest"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ✅ |
| Starter | ✅ |
| Professional | ✅ |
| Full-Market Plans (A-Shares, HK Stocks, US Stocks) | ✅ |
| Enterprise | ✅ |

## Notes
- The latest candlestick may still be forming; its values can change as trades occur
- Suitable for real-time chart display, current price monitoring, and intraday dynamic updates
- Not recommended for historical backtesting, technical indicator statistics, or fixed data storage
- To query candlesticks by time range, use [Candlestick Data](./api_kline).
- A-shares, Hong Kong stocks, and US stocks support unadjusted, forward-adjusted, and backward-adjusted prices

## Supported Markets

| Market | Examples |
|---|---|
| Forex | EURUSD, GBPUSD, USDJPY |
| Metals | XAUUSD, XAGUSD |
| Indices | SPX, NDX, DJI |
| US Stocks | AAPL.US, TSLA.US, MSFT.US |
| HK Stocks | 700.HK, 9988.HK, 3690.HK |
| A-Shares | 600519.SH, 000001.SZ, 920186.BJ |
| China Futures | BU2609, IC2606, AP8888 |
| Hong Kong Futures | HSI8888, MHI8888, HTI8888 |
| Crypto | BTCUSDT, ETHUSDT, ADAUSDT |

## Candlestick Intervals

| `interval` | Period |
| --- | --- |
| `1m` | 1 minute |
| `3m` | 3 minutes |
| `5m` | 5 minutes |
| `15m` | 15 minutes |
| `30m` | 30 minutes |
| `1h` | 1 hour |
| `2h` | 2 hours |
| `4h` | 4 hours |
| `1d` | 1 day |
| `1w` | 1 week |
| `1M` | 1 month |

Lowercase `m` in `1m` means minutes, while uppercase `M` in `1M` means months.

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Trading symbol codes, comma-separated, up to 50, e.g., AAPL.US,00700.HK |
| interval | Yes | K-line period, options: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |
| adjust | No | Price adjustment for A-shares, Hong Kong stocks, and US stocks: `none` (unadjusted), `forward`, or `backward`. If omitted, prices are unadjusted (`none`) |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| type | Product type |
| interval | K-line period |
| adjust | Applied price adjustment: `none`, `forward`, or `backward` |
| klines | K-line data array |
| └─ time | K-line timestamp (milliseconds) |
| └─ open | Opening price |
| └─ high | Highest price |
| └─ low | Lowest price |
| └─ close | Closing price |
| └─ volume | Trading volume |
| └─ quote_volume | Trading amount; normally omitted for futures |
| └─ open_interest | Open interest; returned for futures |
