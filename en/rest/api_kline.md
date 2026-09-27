---
title: Candlestick Data
description: Query candlestick data (OHLC bars) by interval and time range.
openapi: "openapi.en.yaml GET /v1/market/kline"
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
- The Free plan can query candlesticks but cannot specify a time range with `start_time` or `end_time`.
- The last candlestick in the result may still be forming; its price and volume may continue to change.
- Suitable for technical indicator calculations. For stock-data archiving or strategy backtesting, record the query time and adjustment mode; if you store unadjusted candlesticks, use [Adjustment Factors](./api_ex_factors) to generate adjusted prices as needed. Historical adjusted prices may change after corporate actions or data updates.
- To get the latest candlestick for multiple symbols in one request, use [Latest Candlesticks](./api_kline_latest).
- A-shares, HK stocks, and US stocks consistently support unadjusted, forward-adjusted, and backward-adjusted prices

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
| symbol | Yes | Trading symbol code |
| interval | Yes | K-line period, options: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
| limit | No | Number of records; defaults to 100. Values above 1000 are capped at 1000, and non-positive values use the default of 100 |
| start_time | No | Start timestamp (milliseconds) |
| end_time | No | End timestamp (milliseconds) |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |
| adjust | No | Price adjustment for A-shares, HK stocks, and US stocks: `none` (unadjusted), `forward`, or `backward`. If omitted, prices are unadjusted (`none`) |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| type | Product type |
| interval | K-line period |
| adjust | Applied price adjustment mode: `none`, `forward`, or `backward` |
| klines | K-line data array |
| └─ time | K-line timestamp (milliseconds) |
| └─ open | Opening price |
| └─ high | Highest price |
| └─ low | Lowest price |
| └─ close | Closing price |
| └─ volume | Trading volume |
| └─ quote_volume | Trading amount; normally omitted for futures |
| └─ open_interest | Open interest; returned for futures |
