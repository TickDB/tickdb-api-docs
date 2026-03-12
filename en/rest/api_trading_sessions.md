---
title: Trading Sessions
description: Query trading session information for a specified market, including opening time, closing time, etc.
openapi: GET /v1/market/trading-sessions
---

## Notes
- Market code is case-insensitive
- All returned times are in the **local timezone** of each market

## Supported Markets

- **US** - US Stock Market
- **HK** - Hong Kong Stock Exchange
- **CN** - A-Share Market

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| market | Yes | Market code, options: US, HK, CN |

## Response Fields

| Field | Description |
|-------|-------------|
| market | Market (US - US Stock Market, HK - Hong Kong Stock Exchange, CN - A-Share Market) |
| trading_sessions | Trading sessions array |
| └─ begin_time | Trading start time, format: hhmm, e.g., 900 |
| └─ end_time | Trading end time, format: hhmm, e.g., 1400 |
| └─ trade_session | Trading session type (0 - Normal Trading, 1 - Pre-Market, 2 - After-Hours, 3 - Overnight) |
