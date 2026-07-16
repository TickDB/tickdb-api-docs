---
title: Data Specification
description: Symbol naming, timestamps, and K-line interval rules.
---

## Symbol Naming Rules

- Forex: `EURUSD`
- Metals: `XAUUSD`
- Indices: `SPX`
- US Stocks: `AAPL.US`
- HK Stocks: `700.HK`
- A-Shares: `000001.SZ` (Shenzhen), `600000.SH` (Shanghai)
- China Futures: `BU2609` (regular contract), `AP7777` (next continuous), `AP8888` (main continuous), `AP9999` (weighted continuous)
- Crypto: `BTCUSDT`

China futures use `market=CN` and `type=futures`. Regular contract codes change with the delivery month. Continuous symbols are intended for market tracking and do not represent deliverable contracts.

## Timestamp

- All timestamps are in **milliseconds (ms)**
- UTC-based
