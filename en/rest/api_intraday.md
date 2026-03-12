---
title: Intraday Data
description: Get intraday time-series data for stocks, including minute-by-minute price, volume, and turnover information.
openapi: GET /v1/market/intraday
---

## Notes
- Data covers from market open to current time of the trading day
- Returns empty array during non-trading hours

## Supported Markets

**US Stocks**, **HK Stocks**, **A-Shares**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 000001.SH, 000001.SZ

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Stock symbol codes, comma-separated, max 50 |

## Response Fields

| Field Name | Description |
|------------|-------------|
| symbol | Trading Symbol |
| lines | Intraday Data |
| └─ timestamp | Start Time of Current Minute |
| └─ price | Closing Price of Current Minute |
| └─ volume | Trading Volume |
| └─ turnover | Trading Turnover |
| └─ avg_price | Average Price |
