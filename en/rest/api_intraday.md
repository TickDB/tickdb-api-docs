---
title: Intraday Data
description: Get intraday time-series data for stocks, including minute-by-minute price, volume, and turnover information.
openapi: "openapi.en.yaml GET /v1/market/intraday"
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
- Data covers from market open to current time of the trading day
- Outside trading hours, available intraday data may still be returned; the array may also be empty.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | AAPL.US, TSLA.US, MSFT.US |
| HK Stocks | 700.HK, 9988.HK, 3690.HK |
| A-Shares | 600519.SH, 000001.SZ |

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Stock symbol codes, comma-separated, max 50 |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex` |

## Response Fields

| Field Name | Description |
|------------|-------------|
| symbol | Trading Symbol |
| type | Product type, currently `stock` |
| lines | Intraday Data |
| └─ timestamp | Start time of the current minute as a Unix timestamp in milliseconds |
| └─ price | Closing Price of Current Minute |
| └─ volume | Trading Volume |
| └─ turnover | Trading Turnover |
| └─ avg_price | Average Price |
