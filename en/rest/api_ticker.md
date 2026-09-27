---
title: Ticker Snapshot
description: Retrieve real-time market ticker data for one or more trading symbols.
openapi: "openapi.en.yaml GET /v1/market/ticker"
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
- Maximum 50 symbols per request
- `timestamp` is a Unix timestamp in milliseconds
- Results follow the order of valid symbols in the request
- Except for `symbol`, `last_price`, and `timestamp`, market-data fields are returned conditionally based on the product type, trading session, and data availability

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

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Trading symbol codes, comma-separated, max 50 |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures` |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| name | Product name; returned when name information is available |
| type | Product type; returned when the type can be resolved |
| category | A-share product category, such as `sh_stock`, `sz_stock`, `bj_stock`, `etf`, `cn_bond`, or `cn_index`; returned only for A-share products when category information is available |
| last_price | Last traded price |
| open | Open price; returned when the statistic is available. It normally represents the current trading day or session for traditional markets and the applicable statistics window for crypto |
| prev_close | Previous close or reference price; returned when available. It normally represents the previous trading day or session for traditional markets and the applicable statistics window for crypto |
| bid_price | Best bid price; returned when order-book quotes are available |
| ask_price | Best ask price; returned when order-book quotes are available |
| volume_24h | Cumulative traded volume; returned when available. Crypto normally uses a rolling 24-hour window, while traditional markets normally use the current trading day or session |
| quote_volume_24h | Traded value for the same window as `volume_24h`; returned when traded-value data is available |
| high_24h | High price; returned when available, using the same statistics window as `volume_24h` |
| low_24h | Low price; returned when available, using the same statistics window as `volume_24h` |
| price_change_24h | Price change; returned when available, using the same statistics window as `volume_24h` |
| price_change_percent_24h | Percentage price change; returned when available. Non-empty numeric values are formatted to two decimal places |
| timestamp | Unix timestamp in milliseconds |
| pre_market_quote | Pre-market quote object; returned for products with extended-hours trading, such as US stocks, when pre-market data is available |
| ├─ last_done | Latest pre-market trade price |
| ├─ timestamp | Pre-market quote timestamp (milliseconds, UTC) |
| ├─ volume | Pre-market volume |
| ├─ quote_volume | Pre-market traded value; returned when available |
| ├─ high | Pre-market high price |
| ├─ low | Pre-market low price |
| └─ prev_close | Pre-market reference close |
| post_market_quote | Post-market quote object; returned for products with extended-hours trading, such as US stocks, when post-market data is available |
| ├─ last_done | Latest post-market trade price |
| ├─ timestamp | Post-market quote timestamp (milliseconds, UTC) |
| ├─ volume | Post-market volume |
| ├─ quote_volume | Post-market traded value; returned when available |
| ├─ high | Post-market high price |
| ├─ low | Post-market low price |
| └─ prev_close | Post-market reference close |
| overnight_quote | Overnight quote object; returned for products with extended-hours trading, such as US stocks, when overnight data is available |
| ├─ last_done | Latest overnight trade price |
| ├─ timestamp | Overnight quote timestamp (milliseconds, UTC) |
| ├─ volume | Overnight volume |
| ├─ quote_volume | Overnight traded value; returned when available |
| ├─ high | Overnight high price |
| ├─ low | Overnight low price |
| └─ prev_close | Overnight reference close |
