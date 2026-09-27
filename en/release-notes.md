---
title: Changelog
description: TickDB API documentation version history
---

## v1.0.3 (2026-09-21)

### New Features

- Added financial and fundamental API documentation covering company overviews, revenue breakdowns, financial statements, valuation and industries, dividends and corporate actions, shareholder and institutional holdings, and market information and calendars.
- Added full-market data for A-shares, Hong Kong stocks, and US stocks: one REST API request retrieves a complete market snapshot, while one WebSocket subscription continuously receives real-time updates for every symbol in that market.
- Added the K-line adjustment factors endpoint with a JavaScript calculation example for dynamically producing forward- or backward-adjusted data from unadjusted K-lines.
- Added support for Hong Kong stock futures and financial futures.

---

## v1.0.2 (2026-07-16)

### New Features

- Added China futures support across symbol query, REST market data, and WebSocket channels using `type=futures`.
- Added futures position fields: K-line `open_interest`, and trade `open_interest_change` and `position_effect`.

---

## v1.0.1 (2026-03-13)

### New Features

- **Stock Market Specific Endpoints**
  - Intraday data endpoint
  - Stock information endpoint
  - Trading sessions endpoint
  - Trade days calendar endpoint
  - Market metrics endpoint
  - Capital flow endpoint

### Major Improvements

- **WebSocket Documentation Restructure**
  - Added ping/pong heartbeat mechanism guidance
  - Updated ticker channel message format (market-specific fields)
  - Fixed trade channel response format (includes trades array)
  - Added A-shares support to depth channel

- **Documentation Content Optimization**
  - Reorganized REST API navigation structure
  - Enhanced all endpoints with request parameters and response field descriptions
  - Updated supported markets annotations and examples
  - Standardized terminology
  - Improved getting started guide and data specification

---

## v1.0.0 (2026-01-15)

### Initial Release

Provided core REST API and WebSocket real-time subscriptions, covering Forex, Metals, Indices, US Stocks, HK Stocks, A-Shares, and Crypto markets.

- **REST API Endpoints**
  - Available symbols
  - Ticker snapshot
  - K-line queries
  - Latest klines
  - Order book
  - Recent trades
  - Kline intervals

- **WebSocket Channels**
  - ticker channel
  - depth channel
  - trade channel
