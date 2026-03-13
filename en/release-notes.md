---
title: Changelog
description: TickDB API documentation version history
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
  - Historical klines
  - Latest klines
  - Order book
  - Recent trades
  - Kline intervals

- **WebSocket Channels**
  - ticker channel
  - depth channel
  - trade channel
