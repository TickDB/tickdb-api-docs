---
title: Data Specification
description: Symbol naming, timestamps, and K-line interval rules.
---

## Symbol Naming Rules

- Crypto: `BTCUSDT`
- US Stocks: `AAPL.US`
- HK Stocks: `700.HK`
- A-Shares: `000001.SZ` (Shenzhen), `600000.SH` (Shanghai)
- Forex: `EURUSD`
- Metals: `XAUUSD`

## Timestamp

- All timestamps are in **milliseconds (ms)**
- UTC-based

## K-line Intervals

Refer to:
**GET** `/v1/market/intervals/kline`
