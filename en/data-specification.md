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
- A-Shares: `000001.SZ` (Shenzhen), `600000.SH` (Shanghai), `920186.BJ` (Beijing)
- China Futures: `BU2609` (regular contract), `AP7777` (next continuous), `AP8888` (main continuous), `AP9999` (weighted continuous)
- Hong Kong Futures: `HSI8888` (Hang Seng Index futures), `MHI8888` (Mini Hang Seng Index futures)
- Crypto: `BTCUSDT`

China futures use `market=CN` and `type=futures`. Regular contract codes change with the delivery month. Continuous symbols are intended for market tracking and do not represent deliverable contracts.

## Timestamp

- Follow each endpoint's field description for the time format and unit; do not assume every timestamp is in milliseconds.
- Unix timestamps are usually in milliseconds, but the capital-flow endpoint uses seconds. Dates may use `YYYY-MM-DD`; date-times may follow RFC 3339, for example `2026-09-21T05:30:00Z`.
- Unix timestamps identify UTC instants. Parse date-time strings using their included time-zone offset.
